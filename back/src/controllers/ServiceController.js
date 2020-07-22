const ServiceModel = require("../models/Service");
const CategoryModel = require("../models/Category");
const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
const fs = require("fs");
const { smartTrim } = require("../helpers/Service");

exports.CreateService = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }

    const { title, body, categories } = fields;

    if (!title || !title.length) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Content is to short",
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        error: "At least one category is required",
      });
    }

    let serviceModel = new ServiceModel();

    serviceModel.title = title;
    serviceModel.body = body;
    serviceModel.excerpt = smartTrim(body, 320, " ", " ...");
    serviceModel.slug = slugify(title).toLowerCase();
    serviceModel.mtitle = `${title} | ${process.env.APP_NAME}`;
    serviceModel.mdesc = stripHtml(body.substring(0, 160));
    serviceModel.postedBy = req.user._id;

    // categories
    let arrayOfCategories = categories && categories.split(",");

    if (files.photo) {
      if (files.photo.size > 10000000) {
        return res.status(400).json({
          error: "Image should be less then 1mb in size",
        });
      }

      serviceModel.photo.data = fs.readFileSync(files.photo.path);
      serviceModel.contentType = files.photo.type;

      serviceModel.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        res.json(result);

        ServiceModel.findByIdAndUpdate(
          result._id,
          { $push: { categories: arrayOfCategories } },
          { new: true }
        ).exec((err, result) => {
          if (err) {
            return res.status(400).json({
              error: errorHandler(err),
            });
          } else {
            res.json(result);
          }
        });
      });
    }
  });
};
