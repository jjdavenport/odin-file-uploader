const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload-controller");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname, "../uploads") });

router.post("/upload/", upload.single("file"), uploadController.upload);

module.exports = router;
