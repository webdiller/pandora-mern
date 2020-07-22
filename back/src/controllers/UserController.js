const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const mailer = require("../services/mailer");
const UserModel = require("../models/User");
const { createJWToken } = require("../utils/createJWToken");

class UserController {
  constructor(io) {
    this.show = (req, res) => {
      const { id } = req.params;
      UserModel.findById(id, (err, user) => {
        if (err) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        res.json(user);
      });
    };

    this.getMe = (req, res) => {
      const id = req.user && req.user._id;
      UserModel.findById(id, (err, user) => {
        if (err || !user) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        res.json(user);
      });
    };

    this.findUsers = (req, res) => {
      const { query } = req.query;
      UserModel.find()
        .or([
          { fullname: new RegExp(query, "i") },
          { email: new RegExp(query, "i") },
        ])
        .then((users) => res.json(users))
        .catch((err) =>
          res.status(404).json({
            status: "error",
            message: err,
          })
        );
    };

    this.delete = (req, res) => {
      const { id } = req.params;
      UserModel.findOneAndRemove({ _id: id })
        .then((user) => {
          if (user) {
            res.json({
              message: `User ${user.fullname} deleted`,
            });
          } else {
            res.status(404).json({
              status: "error",
            });
          }
        })
        .catch((err) => {
          res.json({
            message: err,
          });
        });
    };

    this.create = (req, res) => {
      const postData = {
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password,
      };

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.sattus(422).json({ errors: errors.array() });
      } else {
        const user = new UserModel(postData);

        user
          .save()
          .then((obj) => {
            res.json(obj);
            mailer.sendMail(
              {
                from: "kolotushins@gmail.com",
                to: postData.email,
                subject: "Подтверждение почты в Pandora",
                html: `Для того, чтобы подтвердить почту, перейдите <a href="http://localhost:3000/signup/verify?hash=${obj.confirm_hash}">по этой ссылке</a>`,
              },
              (err, info) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log(info);
                }
              }
            );
          })
          .catch((reason) => {
            res.status(500).json({
              status: "error",
              message: reason,
            });
          });
      }
    };

    this.verify = (req, res) => {
      const { hash } = req.query;

      if (!hash) {
        res.status(422).json({ errors: "Invalid hash" });
      } else {
        UserModel.findOne({ confirm_hash: hash }, (err, user) => {
          if (err || !user) {
            return res.status(404).json({
              status: "error",
              message: "Hash not found",
            });
          }

          user.confirmed = true;

          user.save((err) => {
            if (err) {
              return res.status(404).json({
                status: "error",
                message: err,
              });
            }

            res.json({
              status: "success",
              message: "Аккаунт успешно подтвержден!",
            });
          });
        });
      }
    };

    this.login = (req, res) => {
      const postData = {
        email: req.body.email,
        password: req.body.password,
      };

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
      } else {
        UserModel.findOne({ email: postData.email }, (err, user) => {
          if (err || !user) {
            return res.status(404).json({
              message: "User not found",
            });
          }

          if (bcryptjs.compareSync(postData.password, user.password)) {
            const token = createJWToken(user);
            res.json({
              status: "success",
              token,
            });
          } else {
            res.status(403).json({
              status: "error",
              message: "Incorrect password or email",
            });
          }
        });
      }
    };

    this.logout = (req, res) => {
      res.clearCookie("token");
      res.json({
        message: "Logout success",
      });
    };

    this.io = io;
  }
}

module.exports = UserController;
