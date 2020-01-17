const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  const { method, url } = request;
  if (method === 'GET' && url === '/api') {
    response.statusCode = 200;
    response.setHeader('content-type', 'application/json');
    response.write(JSON.stringify({ message: 'hello' }));
  }

  if (method === 'GET' && url === '/api/northcoders') {
    fs.readFile('./data/northcoders.json', 'utf8', (err, northcoders) => {
      response.statusCode = 200;
      response.setHeader('content-type', 'application/json');
      const parsedNorthcoders = JSON.parse(northcoders);
      const responseBody = JSON.stringify(
        { northcoders: parsedNorthcoders },
        null,
        2
      );
      response.write(responseBody);
      response.end();
    });
  }

  if (method === 'GET' && /\/api\/northcoders\//.test(url)) {
    const username = url.replace(/\/api\/northcoders\//, '');
    fs.readFile('./data/northcoders.json', 'utf8', (err, northcoders) => {
      response.statusCode = 200;
      response.setHeader('content-type', 'application/json');
      const parsedNorthcoders = JSON.parse(northcoders);
      const userInfo = parsedNorthcoders.filter(
        northcoder => northcoder.username === username
      );
      console.log(userInfo);
      const responseBody = JSON.stringify({ northcoders: userInfo }, null, 2);
      response.write(responseBody);
      response.end();
    });
  }

  if (method === 'GET' && /\/api\/pets\//.test(url)) {
    const usernameURL = url.replace(/\/api\/pets\//, '');
    fs.readFile('./data/pets.json', 'utf8', (err, pets) => {
      response.statusCode = 200;
      response.setHeader('content-type', 'application/json');
      const parsedPets = JSON.parse(pets);
      const userPets = parsedPets.filter(northcoder => northcoder.person).filter(northcoder => northcoder.person.username === usernameURL);
      console.log(userPets);
      const responseBody = JSON.stringify({ northcoders: userPets }, null, 2);
      response.write(responseBody);
      response.end();
    });
  }

  if (method === 'GET' && /\/api\/interests\//.test(url)) {
    const usernameURL = url.replace(/\/api\/interests\//, '');
    fs.readFile('./data/interests.json', 'utf8', (err, interests) => {
      response.statusCode = 200;
      response.setHeader('content-type', 'application/json');
      const parsedInterests = JSON.parse(interests);
      const userInterests = parsedInterests.filter(northcoder => northcoder.person).filter(northcoder => northcoder.person.username === usernameURL);
      const responseBody = JSON.stringify({ northcoders: userInterests }, null, 2);
      response.write(responseBody);
      response.end();
    });
  }
});

server.listen(9633, () => {
  console.log('listening to the server...');
});
