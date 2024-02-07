const Student = require('../models/student_model');

const getStudent = async (req, res) => {
    console.log("Student get");
    try {
        let student;
        if (req.query.name) {
            student = await Student.find({name: req.query.name});
        } else {
            student = await Student.find();
        }
        res.status(200).send(student); 
    } catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
};

const getStudentbyId = async (req, res) => {
    console.log(req.params);
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).send("Student not found");
        } else {
            return res.status(200).send(student);
            }
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
};

const postStudent = async (req, res) => {
    console.log("student post");
    try {
        const student = await Student.create(req.body);
        res.status(201).send(student);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
};

const myfunc = () => {
    const rs = new Promise((resolve, reject) => {
        console.log("myfunc");
        resolve("ok");
    });
    return rs;
};

const putStudent = async (req, res) => {
    try {
        const response = await myfunc();
    } catch (err) {
        console.log(err);
    }
    res.send("Student put");
};

const deleteStudent = async (req, res) => {
    console.log("Student delete");
    try {
        await Student.findByIdAndDelete(req.params.id);
        return res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(400).send(err.message);
        }
};

module.exports = {getStudent, getStudentbyId, postStudent, putStudent, deleteStudent}