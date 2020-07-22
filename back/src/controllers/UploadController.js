const cloudinary = require("../services/cloudinary");
const UploadFileModel = require("../models/UploadFile");

class UploadController {
  constructor() {
    this.create = (req, res) => {
      const userId = req.user._id;
      const { file } = req;
      cloudinary.v2.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error || !result) {
            return res.status(500).json({
              status: "error",
              message: error || "upload error",
            });
          }

          const fileData = {
            filename: result.original_filename,
            size: result.bytes,
            ext: result.format,
            url: result.url,
            user: userId,
          };

          const uploadFile = new UploadFileModel(fileData);

          uploadFile
            .save()
            .then((fileObj) => {
              res.json({
                status: "success",
                file: fileObj,
              });
            })
            .catch((err) => {
              res.json({
                status: "error",
                message: err,
              });
            })
            .end(file.buffer);
        }
      );
    };

    this.delete = (req, res) => {
      const fileId = req.user._id;
      UploadFileModel.deleteOne({ _id: fileId }, (err) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            message: err,
          });
        }

        res.json({
          status: "success",
        });
      });
    };
  }
}

module.exports = UploadController;
