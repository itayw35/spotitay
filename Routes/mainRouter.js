const express = require("express");
const router = express.Router();

router.use("/users", require("./userRouter"));
router.use("/search", require("./searchRouter"));
router.use("/playlist", require("./playlistRouter"));
module.exports = router;
