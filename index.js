const http = require('http');
const {google} = require('googleapis');

if (process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}

const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

let oauth2Client = new google.auth.GoogleAuth({
    keyFile: './private/service_account.json',
    scopes: SCOPES
});

const drive = google.drive({
    auth: oauth2Client,
    version: 'v3'
});

const filesRes = drive.files.list();

filesRes.then(val => console.log(val.data.files));

const hostname = process.env.HOST;
const port = process.env.PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(filesRes.then(val => {
        val.data.files;
    }));
  });


  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/ - hurray!`);
  });
