const UserModel = require("../models/User");

exports.updateLastSeen = (req, _, next) => {
  if (req.user) {
    UserModel.findOneAndUpdate(
      { _id: req.user.id },
      {
        last_seen: new Date(),
      },
      { new: true }
    );
  }

  next();
};
