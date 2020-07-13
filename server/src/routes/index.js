const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");

router.use("/api", require("./user"));
router.use("/api", require("./loginRegistration"));
router.use("/api", authMiddleware, require("./shares"));

module.exports = router;
