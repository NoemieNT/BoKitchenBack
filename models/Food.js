const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  picture: String,
  name: String,
  description: String,
  category: {
    type: String,
    enum: ["STARTER", "MAIN", "DESSERT", "DRINK"]
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag"
    }
  ],
  price: Number,
  Stock: Number,
  menu: Boolean
});

const foodModel = mongoose.model("Food", foodSchema);

module.exports = foodModel;
