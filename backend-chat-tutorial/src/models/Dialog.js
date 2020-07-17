const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const DialogSchema = new Schema(
  {
    partner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const DialogModel = mongoose.model("Dialog", DialogSchema);

module.exports = DialogModel;
