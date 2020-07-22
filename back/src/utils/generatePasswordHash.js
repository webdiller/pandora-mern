const bcryptjs = require("bcryptjs");

exports.generatePasswordHash = (password) => {
  return new Promise((resolve, reject) => {
    bcryptjs.hash(password, 10, (err, hash) => {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
};
