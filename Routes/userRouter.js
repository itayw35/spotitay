const express = require("express");
const router = express.Router();
const userLogic = require("../BL/userLogic");

router.post("/login", async (req, res) => {
  try {
    const token = await userLogic.login(req.body);
    res.status(200).send(token);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
router.post("/register", async (req, res) => {
  try {
    const token = await userLogic.register(req.body);
    res.status(200).send(token);
  } catch (err) {
    res.status(err.code).send(err.message);
  }
});
module.exports = router;
