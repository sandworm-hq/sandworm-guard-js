#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');

const logger = console;
const port = process.env.SANDWORM_INSPECTOR_PORT || 7071;
const refreshRate = 1000; // in milliseconds

let history = [];
const eventSubscribers = [];

const server = http.createServer((request, response) => {
  switch (request.url) {
    case '/':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(fs.readFileSync(path.join(__dirname, 'frontend', 'build', 'index.html')));
      break;
    case '/static/js/bundle.js':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(
        fs.readFileSync(path.join(__dirname, 'frontend', 'build', 'static', 'js', 'bundle.js')),
      );
      break;
    case '/static/js/bundle.js.map':
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.end(
        fs.readFileSync(path.join(__dirname, 'frontend', 'build', 'static', 'js', 'bundle.js.map')),
      );
      break;
    case '/ingest': {
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
    case '/events': {
      response.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        ...(request.httpVersionMajor === 1 && {Connection: 'keep-alive'}),
      });

      try {
        const message = `retry:${refreshRate}\nid:${Date.now()}\ndata:${JSON.stringify(
          history,
        )}\n\n`;
        response.write(message);
      } catch (error) {
        logger.error(error);
      }

      response.on('close', () => {
        const index = eventSubscribers.indexOf(response);
        if (index !== -1) {
          eventSubscribers.splice(index, 1);
        }
      });
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
  logger.log(`🐛 Sandworm Inspector`);
  logger.log(`Running at http://localhost:${port}/`);
});
