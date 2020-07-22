const CategoryModel = require("../models/Category");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.createCategory = (req, res) => {
  const { name } = req.body;
  let slug = slugify(name).toLowerCase();

  let categoryModel = CategoryModel({ name, slug });

  categoryModel.save((err, date) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json(data);
  });
};

exports.listCategory = (req, res) => {
  CategoryModel.find({}).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json(data);
  });
};

exports.readCategory = (rerq, res) => {
  const slug = req.params.slug.toLowerCase();

  CategoryModel.findOne({ slug }).exec((err, category) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json(category);
  });
};

exports.removeCategory = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  CategoryModel.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }

    res.json({
      message: "Category deleted successfully",
    });
  });
};
