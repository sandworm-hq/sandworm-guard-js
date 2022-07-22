const http = require('http');
const fs = require('fs');
const path = require('path');

const sandwormCode = fs.readFileSync(path.join(__dirname, '..', '..', 'dist', 'index.js'), {
  encoding: 'utf-8',
});

module.exports = async () => {
  const server = http.createServer((request, response) => {
    switch (request.url) {
      case '/':
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end('Hello World\n');
        break;
      case '/sw.js':
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(`
        self.addEventListener('activate', event => {
          console.log('service worker active');
        });
      `);
        break;
      case '/worker.js':
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(`
          ${sandwormCode}
          Sandworm.init({devMode:true});
        `);
        break;
      case '/sandworm.js':
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(sandwormCode);
        break;
      default:
        response.writeHead(404);
        response.end();
    }
  });

  server.on('error', (err) => {
    if (err.code !== 'EADDRINUSE') {
      console.error(err);
    }
  });

  server.listen(7070);
};
