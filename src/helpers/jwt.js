const jwt = require("jsonwebtoken");

const signAccessToken = () => {
  if (!process.env.JWT_ACCESS_SECRET_SEED) {
    throw new Error("No Access JWT seed - review environment variable");
  }

  return jwt.sign({}, process.env.JWT_ACCESS_SECRET_SEED, { expiresIn: "4s" });
};

const signRefreshToken = () => {
  if (!process.env.JWT_REFRESH_SECRET_SEED) {
    throw new Error("No Refresh JWT seed - review environment variable");
  }

  return jwt.sign({}, process.env.JWT_REFRESH_SECRET_SEED, { expiresIn: "1d" });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
};
