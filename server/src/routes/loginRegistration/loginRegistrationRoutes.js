const router = require("express").Router();
const controller = require("./loginRegistrationController");

router.post("/register", controller.registration);

module.exports = router;
