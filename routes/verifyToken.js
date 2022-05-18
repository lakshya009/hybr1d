//This route is to verify the token generated during login

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, function (err, user) {
      if (err) res.status(403).json("Token is not valid!!!");

      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndSeller = (req, res, next) => {
  verifyToken(req, res, function () {
    if (req.user.type === "seller") {
      next();
    } else {
      res.status(403).json("You are not allowed to do that!!!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndSeller,
};
