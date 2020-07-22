const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const validator = require("validator");
const differenceInMinutes = require("date-fns/differenceInMinutes");
const { generatePasswordHash } = require("../utils/generatePasswordHash");

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: "Email address is required",
      validate: [validator.isEmail, "Invalid email"],
      unique: true,
    },
    fullname: {
      type: String,
      required: "Password is required",
    },
    password: {
      type: String,
      required: "Password is required",
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
    avatar: String,
    confirm_hash: String,
    last_seen: {
      type: Date,
      default: new Date(),
    },
    profile: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("isOnline").get(function () {
  return differenceInMinutes(new Date().toISOString, this.last_seen) < 5;
});

UserSchema.set("toJSON", {
  virtuals: true,
});

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  user.password = await generatePasswordHash(user.password);
  user.confirm_hash = await generatePasswordHash(new Date().toString());
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
