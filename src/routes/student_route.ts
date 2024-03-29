import express from "express";
const router = express.Router();
import studentController from "../controllers/student_controller";
import authMiddleware from "../common/auth_middleware";

router.get("/", authMiddleware, studentController.get.bind(studentController));

router.post("/", authMiddleware, studentController.post.bind(studentController));

router.get("/:id", authMiddleware, studentController.getById.bind(studentController));

router.put("/:id", authMiddleware, studentController.put.bind(studentController));

router.delete("/:id", authMiddleware, studentController.remove.bind(studentController));

export default router;