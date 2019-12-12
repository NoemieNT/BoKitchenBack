const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: String,
    enum: ["ADMIN", "CUSTOMER", "DELIVERER"],
    default: "CUSTOMER"
  },
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  address: String,
  zipcode: Number,
  credits: Number
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
