const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload-controller");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname, "../uploads") });

router.post("/upload/", upload.single("file"), uploadController.upload);
router.get("/files/", uploadController.files);
router.delete("/delete-file/", uploadController.deleteFile);
router.get("/download-file/", uploadController.downloadFile);
router.post("/new-folder/", uploadController.newFolder);
router.get("/folders/", uploadController.folders);
router.get("/file/:id", uploadController.file);
router.get("/folder/:id", uploadController.folder);
router.delete("/folder/:id", uploadController.deleteFolder);
router.delete("/file/:id", uploadController.deleteFile);

module.exports = router;
