//Seller routes

const router = require("express").Router();
const { verifyTokenAndSeller } = require("./verifyToken");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const User = require("../models/User");

//Create
router.post("/create-catalog", verifyTokenAndSeller, async function (req, res) {
  const newCatalog = new Catalog({
    sellerId: req.user.id,
    products: req.body.products,
  });

  try {
    const savedCatalog = await newCatalog.save();
    res.status(200).json(savedCatalog);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET all orders
router.get("/orders", verifyTokenAndSeller, async function (req, res) {
  try {
    const orders = await Order.find({ sellerId: req.user.id });
    !orders && res.status(401).json("No orders found.");

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
