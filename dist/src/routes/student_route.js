"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const student_controller_1 = __importDefault(require("../controllers/student_controller"));
router.get("/", student_controller_1.default.getStudent);
// router.get("/:id", studentController.getStudent);
router.post("/", student_controller_1.default.postStudent);
router.get("/:id", student_controller_1.default.getStudentbyId);
// router.post("/:id", studentController.postStudent);
// router.put("/", studentController.putStudent);
router.put("/:id", student_controller_1.default.putStudent);
// router.delete("/", studentController.deleteStudent);
// router.delete("/:id", studentController.deleteStudent);
router.delete("/:id", student_controller_1.default.deleteStudent);
// router.delete("/:id", (req, res) => {
//     res.status(400).send("faild student delete");
// });
exports.default = router;
//# sourceMappingURL=student_route.js.map