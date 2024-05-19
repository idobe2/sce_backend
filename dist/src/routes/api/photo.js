"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const photoMiddleware_1 = __importDefault(require("../../middleware/photoMiddleware"));
var upload = (0, multer_1.default)({
    dest: 'uploads/',
    limits: { fileSize: 10 * 1024 * 1024 }
});
router.post('/', [upload.single('image'), photoMiddleware_1.default], (req, res) => {
    const image = res.image;
    if (image) {
        res.status(201).send("Successfully uploaded");
    }
    else {
        res.status(500).send("Server error");
    }
});
module.exports = router;
//# sourceMappingURL=photo.js.map