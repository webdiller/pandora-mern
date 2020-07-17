const DialogModel = require("../models/Dialog");
const MessageModel = require("../models/Message");

class DialogController {
  constructor(io) {
    this.index = (req, res) => {
      const userId = req.user._id;

      DialogModel.find()
        .or([{ author: userId }, { partner: userId }])
        .populate(["author", "partner"])
        .populate({
          path: "lastMessage",
          populate: {
            path: "user",
          },
        })
        .exec((err, dialogs) => {
          if (err) {
            return res.status(404).json({
              message: "Dialogs nots found",
            });
          }

          return res.json(dialogs);
        });
    };

    this.create = (req, res) => {
      const postData = {
        author: req.user._id,
        partner: req.body.partner,
      };

      DialogModel.findOne(
        {
          author: req.user._id,
          partner: req.body.partner,
        },
        (err, dialog) => {
          if (err) {
            return res.status(500).json({
              status: "error",
              message: err,
            });
          }

          if (dialog) {
            return res.status(403).json({
              status: "error",
              message: "Такой диалог уже есть",
            });
          } else {
            const dialog = new DialogModel(postData);

            dialog
              .save()
              .then((dialogObj) => {
                const message = new MessageModel({
                  text: req.body.text,
                  user: req.user._id,
                  dialog: dialogObj._id,
                });

                message
                  .save()
                  .then(() => {
                    dialogObj.lastMessage = message._id;
                    dialogObj.save().then(() => {
                      res.json(dialogObj);

                      this.io.emit("SERVER:DIALOG_CREATED", {
                        ...postData,
                        dialog: dialogObj,
                      });
                    });
                  })
                  .catch((reason) => {
                    res.json(reason);
                  });
              })
              .catch((err) => {
                res.json({
                  message: "error",
                  message: err,
                });
              });
          }
        }
      );
    };

    this.delete = (req, res) => {
      const { id } = req.params;

      DialogModel.findOneAndRemove({ _id: id })
        .then((dialog) => {
          if (dialog) {
            res.json({
              message: "Dialog deleted",
            });
          }
        })
        .catch(() => {
          res.json({
            message: "Dialog not found",
          });
        });
    };

    this.io = io;
  }
}

module.exports = DialogController;
