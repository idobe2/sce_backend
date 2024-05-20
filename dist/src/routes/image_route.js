"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
const base = `http://${process.env.DOMAIN_BASE}:${process.env.PORT}/uploads/`;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
router.post("/upload", upload.single("file"), (req, res) => {
    console.log("uploading file", req.file);
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("check: " + base + req.file.filename);
    res
        .status(200)
        .json({ message: "Uploaded successfully", url: base + req.file.filename });
});
exports.default = router;
//# sourceMappingURL=image_route.js.map