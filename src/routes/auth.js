const { Router } = require("express");

const { signAccessToken, signRefreshToken } = require("../helpers");

const router = Router();

router.post("/login", (req, res) => {
  const accessToken = signAccessToken();
  const refreshToken = signRefreshToken();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    id: "abc123",
    username: "user",
    email: "user@gmail.com",
    accessToken,
    // refreshToken,
  });
});

router.get("/refresh-token", (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  // console.log("refreshToken = ", refreshToken);
  const accessToken = signAccessToken();

  return res.status(200).json({ accessToken });
});

module.exports = router;
