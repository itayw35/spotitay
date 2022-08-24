const express = require("express");
const router = express.Router();
const searchLogic = require("../BL/searchLogic");
const jwtAuth = require("../middleware/auth");

router.get("/:query", jwtAuth, async (req, res, next) => {
  try {
    const inp = req.params.query;
    const searchResult = await searchLogic.searchYT(inp);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      " Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
    res.status(200).send(searchResult);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
