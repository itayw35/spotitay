const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true, unique: true, select: false },
  creationDate: { type: Date, default: Date.now },
  gender: { type: String, enum: ["male", "female"] },
  permission: {
    type: String,
    enum: ["admin", "viewer"],
    default: "viewer",
  },
  isActive: { type: Boolean, default: true },
});
const userModel = mongoose.model("user", userSchema);
exports.userModel = userModel;
