const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload-controller");

router.post("/upload/", uploadController.upload);

module.exports = router;
