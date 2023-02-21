const jwt = require("jsonwebtoken");
require("dotenv").config;

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) res.status(401).send({ message: "Authorization failed " });
      req.body.author = decoded.userID;
      next();
    });
  } else {
    res.send({ message: "Please login first" });
  }
};

module.exports = { authenticateToken };
