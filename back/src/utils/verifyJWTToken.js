const jwt = require("jsonwebtoken");

exports.verifyJWTToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET || "", (err, decodedData) => {
      if (err || !decodedData) {
        return reject(err);
      }

      resolve(decodedData);
    });
  });
