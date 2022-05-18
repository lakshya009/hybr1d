const mongoose = require("mongoose");

const CatalogSchema = new mongoose.Schema(
  {
    sellerId: { type: String, required: true },
    products: [
      {
        name: { type: String, unique: true, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catalog", CatalogSchema);
