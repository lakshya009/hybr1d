//Seller routes

const router = require("express").Router();
const { verifyTokenAndSeller } = require("./verifyToken");
const Catalog = require("../models/Catalog");
const Order = require("../models/Order");
const User = require("../models/User");
const { findOne } = require("../models/Catalog");

//Create
router.post("/create-catalog", verifyTokenAndSeller, async function (req, res) {
  try {
    const oldSeller = await Catalog.findOne({ sellerId: req.user.id });
  } catch (err) {
    req.status(200).json(err);
  }

  if (oldSeller) {
    res.status(200).json("You already have a Catalog. Go update it...");
  } else {
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
  }
});

//Add items to the Catalog
router.put("/catalog/add", verifyTokenAndSeller, async function (req, res) {
  try {
    const updatedCatalog = await Catalog.findOneAndUpdate(
      { sellerId: req.user.id },
      {
        $push: { products: req.body.products },
      },
      { new: true }
    );
    res.status(200).json(updatedCatalog);
  } catch {
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
