const express = require("express");

const router = express.Router();

router.use("/shares", require("./sharesRouter"));

module.exports = router;
