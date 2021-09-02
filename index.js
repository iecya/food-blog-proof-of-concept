const http = require('http');

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
  });


  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ - hurray!`);
  });
