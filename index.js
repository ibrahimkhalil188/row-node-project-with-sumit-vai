// dependency

const http = require('http');
const { handleReqRes } = require('./helper/handleReqRes');
const data = require('./lib/data');

// scaffolding

const app = {};

// configuration

app.config = {
    prot: 3000,
};

// create a folder

/* data.create('test', 'newFile', { name: 'bangladesh', language: 'bangla' }, (err) => {
    console.log(err);
}); */

// read a folder

/* data.read('test', 'newFile', (err, result) => {
    console.log(err, result);
}); */

// update a folder

data.update('test', 'newFile', { name: 'India', language: 'Hindi' }, (err) => {
    console.log(err);
});

// delete a file

/* data.delete('test', 'newFile', (err) => {
    console.log(err);
}); */

// create a server

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.prot, () => {
        console.log('Listen to port', app.config.prot);
    });
};

// handle req and res
app.handleReqRes = handleReqRes;

// run the server
app.createServer();
