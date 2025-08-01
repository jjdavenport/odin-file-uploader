const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

router.post("/check-username/", authController.checkUsernamesRegister);

module.exports = router;
