const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");

router.get("/", studentController.getStudent);

router.get("/:id", studentController.getStudent);

router.post("/", studentController.postStudent);

// router.post("/:id", studentController.postStudent);

// router.put("/", studentController.putStudent);

router.put("/:id", studentController.putStudent);

// router.delete("/", studentController.deleteStudent);

router.delete("/:id", studentController.deleteStudent);

module.exports = router;