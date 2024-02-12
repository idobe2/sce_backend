"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.send("post get");
});
router.get("/:id", (req, res) => {
    res.send("post get by id");
});
router.post("/", (req, res) => {
    res.send("post post" + req.body);
});
router.put("/:id", (req, res) => {
    res.send("post put");
});
router.delete("/:id", (req, res) => {
    res.send("post delete");
});
exports.default = router;
//# sourceMappingURL=post_route.js.map