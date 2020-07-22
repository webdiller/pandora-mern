const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { ObjectId } = mongoose.Schema;

const ServiceSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      min: 3,
      max: 160,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: true,
    },
    body: {
      type: {},
      required: true,
      min: 200,
      max: 2000000,
    },
    excerpt: {
      type: String,
    },
    mtitle: {
      type: String,
    },
    mdesc: {
      type: String,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    categories: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const ServiceModel = mongoose.model("Service", ServiceSchema);

module.exports = ServiceModel;
