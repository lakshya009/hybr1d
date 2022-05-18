const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const buyerRoute = require("./routes/buyer");
const sellerRoute = require("./routes/seller");

const app = express();
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(function () {
    console.log("DB connection successfull!");
  })
  .catch(function (err) {
    console.log(err);
  });

app.use("/api/auth", authRoute);
app.use("/api/buyer", buyerRoute);
app.use("/api/seller", sellerRoute);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server successfully started.");
});
