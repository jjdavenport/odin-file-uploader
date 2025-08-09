const {
  insertUpload,
  getFilesByUser,
  deleteFileById,
  insertFolder,
  getFoldersByUser,
  getFolderById,
  deleteFolderById,
  getFileById,
  editFileById,
  editFolderById,
} = require("../database/queries");
const path = require("path");
const fs = require("fs");

exports.upload = async (req, res, next) => {
  if (!req.file) return res.status(400).json({ message: "no files" });
  try {
    await insertUpload(
      req.user.id,
      req.file.filename,
      req.file.originalname,
      req.file.mimetype,
      req.file.size
    );
    return res.status(200).json({ success: true, message: "file uploaded" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.files = async (req, res) => {
  try {
    const files = await getFilesByUser(req.user.id);
    return res
      .status(200)
      .json({ success: true, message: "files returned", files });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await getFileById(id);
    if (!file)
      return res
        .status(404)
        .json({ success: false, message: "file not found" });

    const filePath = path.join(__dirname, "../uploads", file.file_name);
    fs.unlink(filePath, (error) => {
      if (error) {
        console.error(error);
      }
    });
    await deleteFileById(id);
    return res.status(200).json({ success: true, message: "file deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.downloadFile = async (req, res) => {
  try {
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to download" });
  }
};

exports.newFolder = async (req, res) => {
  try {
    const { name } = req.body;
    await insertFolder(req.user.id, name);
    return res.status(200).json({ success: true, message: "new folder added" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to add folder" });
  }
};

exports.folders = async (req, res) => {
  try {
    const folders = await getFoldersByUser(req.user.id);
    return res
      .status(200)
      .json({ success: true, message: "returned folders", folders });
  } catch {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.file = async (req, res) => {
  try {
    const file = await getFileById(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "returned file", file });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.folder = async (req, res) => {
  try {
    const folder = await getFolderById(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "returned folder", folder });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    await deleteFolderById(req.params.id);
    return res.status(200).json({ success: true, message: "folder deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.editFile = async (req, res) => {
  const id = req.params.id;
  const { name, folderId, folderName } = req.body;
  try {
    await editFileById(id, name, folderId, folderName);
    return res.status(200).json({ success: true, message: "message updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.editFolder = async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  try {
    await editFolderById(id, name);
    return res.status(200).json({ success: true, message: "updated folder" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};
