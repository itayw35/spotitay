const express = require("express");
const router = express.Router();
const searchLogic = require("../BL/searchLogic");
const jwtAuth = require("../middleware/auth");

router.get("/:query", jwtAuth, async (req, res) => {
  try {
    const inp = req.params.query;
    const searchResult = await searchLogic.searchYT(inp);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
    res.status(200).send(searchResult);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
