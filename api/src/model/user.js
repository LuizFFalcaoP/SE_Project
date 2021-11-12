const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  monthly_receipt: { type: Number, default: 0 },
});

module.exports = mongoose.model("user", userSchema);