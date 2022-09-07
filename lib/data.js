// dependency

const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file

lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDEscriptor) => {
        if (!err && fileDEscriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);
            fs.writeFile(fileDEscriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDEscriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing the file');
                        }
                    });
                } else {
                    callback('Error writing to new file!');
                }
            });
        } else {
            callback(err);
        }
    });
};

// read data from file

lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data);
    });
};

// update existing file

lib.update = (dir, file, data, callback) => {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err1, fileDEscriptor) => {
        if (!err1 && fileDEscriptor) {
            const stringData = JSON.stringify(data);

            // trunked data
            fs.ftruncate(fileDEscriptor, (err2) => {
                if (!err2) {
                    // write file
                    fs.writeFile(fileDEscriptor, stringData, (err3) => {
                        if (!err3) {
                            fs.close(fileDEscriptor, (err4) => {
                                if (!err4) {
                                    callback(false);
                                } else {
                                    callback("File didn't close");
                                }
                            });
                        } else {
                            callback('file could not write');
                        }
                    });
                } else {
                    callback('may be file could not truncket');
                }
            });
        } else {
            console.log('error file may not update');
        }
    });
};

// delete existing file

lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('file could not delete');
        }
    });
};
module.exports = lib;
