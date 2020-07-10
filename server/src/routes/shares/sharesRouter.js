const router = require("express").Router();
const controller = require("./sharesController");

router.get("/", controller.userHealthCheck);
// router.post("/create", controller.createUser);

module.exports = router;
