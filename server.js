const http = require('http');

const server = http.createServer((request, response) => {
  const { method, url } = request;
  if (method === 'GET' && url === '/api') {
    response.statusCode = 200;
    response.setHeader('content-type', 'application/json');
    response.write(JSON.stringify({ message: 'hello' }));
  }
});

server.listen(9633, () => {
  console.log('listening to the server...');
});
