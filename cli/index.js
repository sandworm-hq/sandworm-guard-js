#!/usr/bin/env node
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const logger = console;
const port = process.env.SANDWORM_INSPECTOR_PORT || 7071;
const refreshRate = 1000; // in milliseconds
// Each Inspector run gets a sessionId to help us make sense of telemetry data
const sessionId = crypto.randomUUID();

let history = [];
const eventSubscribers = [];

const disableTelemetry = process.argv.includes('--no-telemetry');

const createTelemetryBody = (data) =>
  JSON.stringify(
    data
      .map((event) => {
        let {module} = event;
        try {
          const url = new URL(module);
          if (url.protocol === 'http:' || url.protocol === 'https:') {
            // Truncate this URL so we don't collect private data
            module = url.hostname;
          }
          // eslint-disable-next-line no-empty
        } catch (error) {}
        return {
          module,
          family: event.family,
          method: event.method,
          sessionId,
        };
      })
      // We only care about package activity
      .filter(({module}) => module !== 'root'),
  );

// This sends anonymous data about module activity to our collection service.
// We use this to build an open catalogue of package permission requirements.
// To disable, run the Inspector with `--no-telemetry`
const sendTelemetry = (data) => {
  if (disableTelemetry) {
    return;
  }

  const body = createTelemetryBody(data);
  const req = https.request({
    hostname: 'collect.sandworm.dev',
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length,
    },
  });

  req.on('error', (error) => {
    logger.error('collection failed:', error);
  });
  req.write(body);
  req.end();
};

const serve = (response, filename, mime = 'text/html') => {
  response.writeHead(200, {'Content-Type': mime});
  response.end(fs.readFileSync(path.join(__dirname, 'frontend', 'build', ...filename)));
};

const server = http.createServer((request, response) => {
  switch (request.url) {
    // Serve the frontend React app
    case '/':
      serve(response, ['index.html']);
      break;
    case '/static/js/bundle.js':
      serve(response, ['static', 'js', 'bundle.js']);
      break;
    case '/static/js/bundle.js.map':
      serve(response, ['static', 'js', 'bundle.js.map']);
      break;
    case '/logo.png':
      serve(response, ['logo.png'], 'image/png');
      break;

    // Ingest events tracked by the Sandworm lib
    case '/ingest': {
      // Handle CORS
      if (request.method === 'OPTIONS') {
        response.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        });
        response.end();
        break;
      }

      let stringBody = '';
      request.setEncoding('utf8');
      request.on('data', (chunk) => {
        stringBody += chunk;
      });
      request.on('end', () => {
        try {
          const body = JSON.parse(stringBody);
          sendTelemetry(body);

          // Add a UID to every event
          // React can use this as a unique event key when rendering the UI
          const processedEvents = body.map((entry) => ({
            ...entry,
            uid: new Date().valueOf() + Math.random().toString().slice(5),
          }));

          if (!Array.isArray(body)) {
            throw new Error('Ingest body must be an array');
          }

          history = [...history, ...processedEvents];
          logger.log(`Received ${body.length} events`);
          response.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          response.end('{"status":"ok"}\n');

          // Notify all event subscribers about the new ingested data
          try {
            eventSubscribers.forEach((subscriber) => {
              const message = `retry:${refreshRate}\nid:${Date.now()}\ndata:${JSON.stringify(
                processedEvents,
              )}\n\n`;
              subscriber.write(message);
            });
          } catch (error) {
            logger.error(error);
          }
        } catch (error) {
          logger.error(error);
          response.writeHead(500, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          });
          response.end(`{"status":"error", "error": "${error.message}"}\n`);
        }
      });
      break;
    }
    // Event Stream endpoint to provide tracked events to frontend app in real-time
    case '/events': {
      // Keep the connection alive
      response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        ...(request.httpVersionMajor === 1 && {Connection: 'keep-alive'}),
      });

      // Send the current event history
      try {
        const message = `retry:${refreshRate}\nid:${Date.now()}\ndata:${JSON.stringify(
          history,
        )}\n\n`;
        response.write(message);
      } catch (error) {
        logger.error(error);
      }

      // When the client terminates the connection, remove from subscribers list
      response.on('close', () => {
        const index = eventSubscribers.indexOf(response);
        if (index !== -1) {
          eventSubscribers.splice(index, 1);
        }
      });

      // Add to subscribers list
      eventSubscribers.push(response);
      break;
    }
    default:
      response.writeHead(404);
      response.end();
  }
});

server.listen(port);
server.on('error', (err) => {
  logger.error(err);
  process.exit(1);
});

server.on('listening', () => {
  logger.log(`🪱 Sandworm Inspector`);
  if (!disableTelemetry) {
    logger.log(
      '\x1b[36m%s\x1b[0m',
      'This inspector instance is contributing to the community permission database  - see https://tinyurl.com/52r4u5sy',
    );
    logger.log(
      '\x1b[36m%s\x1b[0m',
      'To disable, run the inspector with the "--no-telemetry" option.',
    );
  }
  logger.log(`Running at http://localhost:${port}/`);
});
