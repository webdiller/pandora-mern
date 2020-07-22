const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const UploadFileSchema = new Schema(
  {
    filename: String,
    size: Number,
    ext: String,
    url: String,
    message: {
      type: Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UploadFileModel = mongoose.model("UploadFile", UploadFileSchema);

module.exports = UploadFileModel;
