const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");

router.get("/", studentController.getStudent);

router.post("/", studentController.postStudent);

router.put("/", studentController.putStudent);

router.delete("/", studentController.deleteStudent);

module.exports = router;

// router.get("/student", (req, res) => {
//     res.send("Student get");
// });

// router.post("/student", (req, res) => {
//     res.send("Student post");
// });

// router.put("/student", (req, res) => {
//     res.send("Student put");
// });

// router.delete("/student", (req, res) => {
//     res.send("Student delete");
// });