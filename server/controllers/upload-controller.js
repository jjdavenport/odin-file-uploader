const { insertUpload } = require("../database/queries");

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
    console.error("Upload Error:", error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
