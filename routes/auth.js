const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Register
router.post("/register", async function (req, res) {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    type: req.body.type,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async function (req, res) {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Credentials!!!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const pass = hashedPassword.toString(CryptoJS.enc.Utf8);

    pass !== req.body.password && res.status(401).json("Wrong Credentials!!!");

    const accessToken = jwt.sign(
      { id: user._id, type: user.type },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
