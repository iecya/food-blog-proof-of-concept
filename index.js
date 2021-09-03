const http = require('http');
const {google} = require('googleapis');

isProduction = process.env.NODE_ENV == 'production';

if (!isProduction) {
    require('dotenv').config();
}

// const SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]


// let oauth2Client = new google.auth.GoogleAuth({
//     keyFile: './private/service_account.json',
//     scopes: SCOPES
// });

// const drive = google.drive({
//     auth: oauth2Client,
//     version: 'v3'
// });



// const filesRes = drive.files.list();

// filesRes.then(val => console.log(val.data.files)).catch(rej => console.log(rej));

const port = process.env.PORT;

const server = http.createServer((req, res) => {
    var content;
    switch(req.url) {
        case '/':
            res.statusCode = 200;
            content = 'this is my homepage'
            break;

        case '/health':
            res.statusCode = 200;
            content = 'healthy page';
            break;

        case '/files':
            res.statusCode = 200;
            content = 'this is the files listing page';
            break;

        default:
            res.statusCode = 404;
            content = 'this page does not exists';   
    }
    res.setHeader('Content-Type', 'text/plain');
    res.end(content);


    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello world');

    // res.end(filesRes.then(val => {
    //     if (val.error) {
    //         console.log(val.error);
    //         return 'Sorry, something went wrong'
    //     } else {
    //         val.data.files;
    //     }
    // }));
  });


  server.listen(port, () => {
    console.log(`Server running at ${port}/ - hurray!`);
  });
