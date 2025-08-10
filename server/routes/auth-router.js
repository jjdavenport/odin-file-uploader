const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/upload-controller");
const authController = require("../controllers/auth-controller");
const multer = require("multer");
const path = require("path");
const upload = multer({ dest: path.join(__dirname, "../uploads") });
const authenticate = require("../middleware/authenticate");

router.post(
  "/upload/",
  authenticate,
  upload.single("file"),
  uploadController.upload
);
router.get("/files/", authenticate, uploadController.files);
router.delete("/delete-file/:id", authenticate, uploadController.deleteFile);
router.delete(
  "/delete-folder/:id",
  authenticate,
  uploadController.deleteFolder
);
router.get("/download-file/:id", authenticate, uploadController.downloadFile);
router.post("/new-folder/", authenticate, uploadController.newFolder);
router.get("/folders/", authenticate, uploadController.folders);
router.get("/file/:id", authenticate, uploadController.file);
router.get("/folder/:id", authenticate, uploadController.folder);
router.delete("/folder/:id", authenticate, uploadController.deleteFolder);
router.delete("/file/:id", authenticate, uploadController.deleteFile);
router.get("/status/", authenticate, authController.status);
router.post("/file/:id/edit/", authenticate, uploadController.editFile);
router.post("/folder/:id/edit/", authenticate, uploadController.editFolder);

module.exports = router;
