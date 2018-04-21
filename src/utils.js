const fs = require('fs');

module.exports = {
  fromFile(fileName) {
    return new Promise((resolve, reject) => {
      fs.readFile(fileName, 'binary', function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
};
