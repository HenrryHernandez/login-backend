const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  console.log("authHeader = ", authHeader);

  if (!authHeader?.toString().startsWith("Bearer ")) {
    console.log("not a valid token access token 1");
    return res.status(401).json({
      success: false,
      data: null,
      msg: "not a valid token access token 1 " + authHeader,
    });
  }

  const token = authHeader.toString().split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET_SEED || "",
    (err, payload) => {
      if (err) {
        console.log("not a valid token access token 2");
        return res.status(401).json({
          success: false,
          data: null,
          msg: "not a valid token access token 2 " + authHeader,
        });
      }

      next();
    }
  );
};

module.exports = {
  validateToken,
};
