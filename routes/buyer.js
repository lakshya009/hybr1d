//All the buyer routes

const router = require("express").Router();
const { verifyToken } = require("./verifyToken");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const User = require("../models/User");

//GET all the sellers
router.get("/list-of-sellers", verifyToken, async function (req, res) {
  try {
    sellers = await User.find({ type: "seller" });

    seller_list = [];

    sellers.forEach(function (seller) {
      seller_list.push({
        name: seller.username,
        id: seller.id,
      });
    });

    res.status(200).json(seller_list);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Create a Order
router.post("/create-order/:seller_id", verifyToken, async function (req, res) {
  const newOrder = new Order({
    buyerId: req.user.id,
    sellerId: req.params.seller_id,
    products: req.body.products,
  });

  try {
    savedOrder = await newOrder.save();

    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET catalog of the seller
router.get(
  "/seller-catalog/:seller_id",
  verifyToken,
  async function (req, res) {
    try {
      sellerCatalog = await Catalog.findOne({ sellerId: req.params.seller_id });

      res.status(200).json(sellerCatalog);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
