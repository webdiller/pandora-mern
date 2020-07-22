const { verifyJWTToken } = require("../utils/verifyJWTToken");
const UserModel = require("../models/User");

const expressJwt = require("express-jwt");

exports.checkAuth = (req, res, next) => {
  if (
    req.path === "/user/signin" ||
    req.path === "/user/signup" ||
    req.path === "/user/verify"
  ) {
    return next();
  }

  const token = "token" in req.headers ? req.headers.token : null;

  if (token) {
    verifyJWTToken(token)
      .then((user) => {
        if (user) {
          req.user = user.data._doc;
        }

        next();
      })
      .catch(() => {
        res.status(403).json({ message: "Invalid auth token provided." });
      });
  }
};

// exports.requireLogin = expressJwt({
//   secret: process.env.JWT_SECRET,
// });

exports.adminMiddleware = (req, res, next) => {
  const adminUserId = req.user._id;

  UserModel.findById({ _id: adminUserId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== 1) {
      return res.status(400).json({
        error: "Admin resource. Access denied",
      });
    }

    req.profile = user;
    next();
  });
};
