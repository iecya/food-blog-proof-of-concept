const http = require('http');
const {google} = require('googleapis');

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

function listFiles() {
    drive.files.list().then((res) => {
        const files = res.data.files;
        if (files.length) {
            return files;
        } else {
            return 'No Files found';
        }
    })
    // drive.files.list({}, (err, res) => {
    //     if (err) return 'The API returned an error: ' + err;
    //     const files = res.data.files;
    //     if (files.length) {
    //         return files;
    //     } else {
    //         return 'No files found.';
    //     }
    // });
}

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
                console.log(files);
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
