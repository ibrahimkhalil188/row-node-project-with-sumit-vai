const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handler/routeHandler/notFoundHandler');

const handleReqRes = {};
handleReqRes.handleReqRes = (req, res) => {
    // handle req
    // get the url and parse it
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const { method } = req;
    const queryString = parsedUrl.query;
    const { headers } = req.headers;
    console.log(trimmedPath, method, queryString, headers);
    const requestProperties = {
        parsedUrl,
        path,
        method,
        queryString,
        headers,
    };

    /* const chosenHandler = routes[trimmedPath] || notFoundHandler;
    chosenHandler(requireObject, (statusCode, payload) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof payload === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);
        res.writeHead(statusCode);
        res.end(payloadString);
    }); */

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    chosenHandler(requestProperties, (statusCode, payload) => {
        statusCode = typeof statusCode === 'number' ? statusCode : 500;
        payload = typeof payload === 'object' ? payload : {};

        const payloadString = JSON.stringify(payload);

        // return the final response
        res.writeHead(statusCode);
        res.end(payloadString);
    });

    // get data from req body
    const decoder = new StringDecoder('utf8');
    let realData = '';
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });
    req.on('end', () => {
        realData += decoder.end();

        console.log(realData);
        res.end('Hello Node js');
    });
};
module.exports = handleReqRes;
