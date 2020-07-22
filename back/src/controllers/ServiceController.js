const ServiceModel = require("../models/Service");
const CategoryModel = require("../models/Category");
const formidable = require("formidable");
const slugify = require("slugify");
const stripHtml = require("string-strip-html");
const _ = require("lodash");
const { errorHandler } = require("../helpers/dbErrorHandler");
const fs = require("fs");
const { smartTrim } = require("../helpers/Service");

// exports.CreateService = (req, res) => {
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: "Image could not upload",
//       });
//     }

//     const { title, body, categories } = fields;

//     if (!title || !title.length) {
//       return res.status(400).json({
//         error: "Title is required",
//       });
//     }

//     if (!body || body.length < 200) {
//       return res.status(400).json({
//         error: "Content is to short",
//       });
//     }

//     if (!categories || categories.length === 0) {
//       return res.status(400).json({
//         error: "At least one category is required",
//       });
//     }

//     let serviceModel = new ServiceModel();

//     serviceModel.title = title;
//     serviceModel.body = body;
//     serviceModel.excerpt = smartTrim(body, 320, " ", " ...");
//     serviceModel.slug = slugify(title).toLowerCase();
//     serviceModel.mtitle = `${title} | ${process.env.APP_NAME}`;
//     serviceModel.mdesc = stripHtml(body.substring(0, 160));
//     serviceModel.postedBy = req.user._id;

//     // categories
//     let arrayOfCategories = categories && categories.split(",");

//     if (files.photo) {
//       if (files.photo.size > 10000000) {
//         return res.status(400).json({
//           error: "Image should be less then 1mb in size",
//         });
//       }

//       serviceModel.photo.data = fs.readFileSync(files.photo.path);
//       serviceModel.contentType = files.photo.type;

//       serviceModel.save((err, result) => {
//         if (err) {
//           return res.status(400).json({
//             error: errorHandler(err),
//           });
//         }

//         res.json(result);

//         ServiceModel.findByIdAndUpdate(
//           result._id,
//           { $push: { categories: arrayOfCategories } },
//           { new: true }
//         ).exec((err, result) => {
//           if (err) {
//             return res.status(400).json({
//               error: errorHandler(err),
//             });
//           } else {
//             res.json(result);
//           }
//         });
//       });
//     }
//   });
// };

exports.CreateService = (req, res) => {
  const { title, body, categories } = req.body;

  if (!title || !title.length) {
    return res.status(400).json({
      error: "title is required",
    });
  }

  if (!body || body.length < 2) {
    return res.status(400).json({
      error: "Content is too short",
    });
  }

  if (!categories || categories.length === 0) {
    return res.status(400).json({
      error: "At least one category is required",
    });
  }

  let service = new ServiceModel();
  service.title = title;
  service.body = body;
  service.excerpt = smartTrim(body, 320, " ", " ...");
  service.slug = slugify(title).toLowerCase();
  service.mdesc = stripHtml(body.substring(0, 160));
  // service.postedBy = req.user._id;

  let arrayOfCategories = categories && categories.split(",");

  service.save((err, result) => {
    if (err) {
      return res.status(400).send({
        error: errorHandler(err),
      });
    }

    res.send(result);
    // Service.findByIdAndUpdate(
    //   result._id,
    //   { $push: { categories: arrayOfCategories } },
    //   { new: true }
    // ).exec((err, result) => {
    //   if (err) {
    //     return res.status(400).json({
    //       error: errorHandler(err),
    //     });
    //   } else {
    //     res.json(result);
    //   }
    // });
  });
};

exports.listService = (req, res) => {
  ServiceModel.find({})
    .populate("categories", "_id name slug")
    .populate("postedBy", "_id name fullname")
    .select("_id title slug excerpt categories postedBy createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }

      res.json(data);
    });
};

exports.listAllServiceCategories = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 10;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  let services;
  let categories;

  ServiceModel.finf({})
    .populate("categories", "_id name slug")
    .populate("postedBy", "_id fullname profile")
    .sort(skip)
    .limit(limit)
    .select("_id title slug excerpt categories postedBy createdAt updatedAt")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }

      services = data;

      CategoryModel.find({}).exec((err, category) => {
        if (err) {
          return res.json({
            error: errorHandler(err),
          });
        }

        categories = category;

        res.json({ services, categories, size: services.length });
      });
    });
};

exports.readService = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  ServiceModel.findOne({ slug })
    .populate("categories", "_id name slug")
    .populate("postedBy", "_id fullname")
    .select(
      "_id title body slug mtitle mdesc categories postedBy createdAt updatedAt"
    )
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: errorHandler(err),
        });
      }

      res.json(data);
    });
};

exports.removeService = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  ServiceModel.findOneAndRemove({ slug }).exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }

    res.json({
      message: "Service deleted successfully",
    });
  });
};

exports.updateService = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  ServiceModel.findOne({ slug }).exec((err, oldService) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.json({
          error: "Image could not upload",
        });
      }

      let slugBeforeMerge = oldService.slug;
      oldService = _.merge(oldService, fields);
      oldService.slug = slugBeforeMerge;

      const { body, desc, categories } = fields;

      if (body) {
        oldService.excerpt = smartTrim(body, 320, " ", " ...");
        oldService.desc = stripHtml(body.substring(0, 160));
      }

      if (categories) {
        oldService.categories = categories.split(",");
      }

      if (files.photo) {
        if (files.photo.size > 10000000) {
          return res.json({
            error: "Image should be less then 1mb in size",
          });
        }

        oldService.photo.data = fs.readFileSync(files.photo.path);
        oldService.photo.contentType = files.photo.type;
      }

      oldService.save((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }

        res.json(result);
      });
    });
  });
};

exports.photoService = (req, res) => {
  const slug = req.params.slug.toLowerCase();

  ServiceModel.findOne({ slug })
    .select("photo")
    .exec((err, service) => {
      if (err || !service) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      res.set("Content-Type", service.photo.contentType);
      return res.send(service.photo.data);
    });
};
