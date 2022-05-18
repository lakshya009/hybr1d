const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    buyerId: { type: String, required: true },
    sellerId: { type: String, required: true },
    products: [
      {
        name: { type: String, unique: true, required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
