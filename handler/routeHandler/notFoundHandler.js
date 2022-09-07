const handle = {};

handle.notFoundHandler = (requireObject, callback) => {
    callback('404', { message: 'Url not found' });
};
module.exports = handle;
