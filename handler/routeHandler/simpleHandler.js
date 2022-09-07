const handle = {};

handle.simpleHandler = (requireObject, callback) => {
    callback(200, { message: 'You are in right track' });
};
module.exports = handle;
