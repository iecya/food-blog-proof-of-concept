const http = require('http');
const {google} = require('googleapis');

// ======= DEBUGGING JSON FILE START ======= //

const fs = require('fs');
// fs.readFile('./private/service_account.json', (err, jsonString) => {
//     if (err) { console.log('something went wrong')};
//     const parsedData = JSON.parse(jsonString);
//     console.log(parsedData.type, parsedData.client_id);
// });

fs.readFile('./private/test.json', (err, jsonString) => {
    if (err) { console.log('something went wrong')};
    console.log('unparsed data:', jsonString);
    const parsedData = JSON.parse(jsonString);
    console.log('parsed data:', parsedData);
});

// ======= DEBUGGING JSON FILE END ======= //


isProduction = process.env.NODE_ENV == 'production';

if (!isProduction) {
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

const port = process.env.PORT;

const server = http.createServer((req, res) => {
    switch(req.url) {
        case '/':
            res.statusCode = 200;
            res.end('this is my homepage');
            break;

        case '/health':
            res.statusCode = 200;
            res.end('healthy page');
            break;

        case '/files':
            res.statusCode = 200;
            drive.files.list().then((response) => {
                const files = response.data.files;
                if (files.length) {
                    res.end(JSON.stringify(files.filter(el => !el.mimeType.includes('folder')).map(el => el.name).join(' - ')));
                } else {
                    res.end('No Files found');
                }
            });
            break;

        default:
            res.statusCode = 404;
            res.end('this page does not exists');
    }
  });


  server.listen(port, () => {
    console.log(`Server running at ${port}/ - hurray!`);
  });
