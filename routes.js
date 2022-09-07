const { simpleHandler } = require('./handler/routeHandler/simpleHandler');

const routes = {
    sample: simpleHandler,
    // about: aboutHandler;
};
module.exports = routes;
