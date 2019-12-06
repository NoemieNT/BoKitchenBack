const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const kitchenSchema = new Schema({
  name: String,
  zone: [String]
});

const kitchenModel = mongoose.model("Kitchen", kitchenSchema);

module.exports = kitchenModel;
