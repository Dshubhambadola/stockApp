const router = require("express").Router();
const controller = require("./sharesController");

router.get("/", controller.sharesHealthCheck);
router.post("/buyShares", controller.buyShares);
router.get("/userShares", controller.userShares);

module.exports = router;
