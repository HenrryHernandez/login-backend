const { Router } = require("express");

const { validateToken } = require("../middlewares");

const router = Router();

router.get("/", [validateToken], (req, res) => {
  res.status(200).json({ msg: "cool!" });
});

module.exports = router;
