const router = require("express").Router();

router.use("/api", require("./user"));
router.use("/api", require("./loginRegistration"));
router.use("/api", require("./shares"));

module.exports = router;
