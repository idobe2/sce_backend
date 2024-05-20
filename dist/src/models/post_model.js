"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    owner: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Post", postSchema);
//# sourceMappingURL=post_model.js.map