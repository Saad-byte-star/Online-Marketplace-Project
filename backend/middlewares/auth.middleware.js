const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async function (req, res, next) {
  try {
    const token = req.header(process.env.JWT_TOKEN_HEADER);

    const tokenData =  jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(tokenData.userId).populate("Role");

    if (user) {
      req.user = user;
      return next();
    }
    return res.status(401).json({ message: "user is not authenticated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "user is not authenticated" });
  }
};

const authorize = function (roleName) {
  return function (req, res, next) {
    if (req.user.Role.Name === roleName) {
      return next();
    }
    return res.status(401).json({ message: "user is not authorized" });
  };
};

module.exports = {
  authenticate,
  authorize,
};
