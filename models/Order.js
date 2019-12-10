const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  address: String,
  zipcode: Number,
  information: String,
  kitchen: { type: Schema.Types.ObjectId, ref: "Kitchen" },
  customer: { type: Schema.Types.ObjectId, ref: "User" },
  deliverer: { type: Schema.Types.ObjectId, ref: "User" },
  date: {
    type: Date,
    default: Date.now
  },
  details: [
    {
      quantity: Number,
      food: {
        type: Schema.Types.ObjectId,
        ref: "Food"
      }
    }
  ],
  status: {
    type: String,
    enum: ["VALIDATED", "IN DELIVERY", "DELIVERED"],
    default: "VALIDATED"
  }
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
