import express from "express";
import multer from "multer";

const router = express.Router();

const base = `http://${process.env.DOMAIN_BASE}:${process.env.PORT}/uploads/`;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/upload", upload.single("file"), (req, res) => {
  console.log("uploading file", req.file);
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  else if (req.file.size > 1024 * 1024) {
    return res.status(413).json({ message: "File too large" });
  }
  console.log("check: " + base + req.file.filename);
  res
    .status(200)
    .json({ message: "Uploaded successfully", url: base + req.file.filename });
});

export default router;