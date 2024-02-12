"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const student_model_1 = __importDefault(require("../models/student_model"));
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Student get");
    try {
        let student;
        if (req.query.name) {
            student = yield student_model_1.default.find({ name: req.query.name });
        }
        else {
            student = yield student_model_1.default.find();
        }
        res.status(200).send(student);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const getStudentbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const student = yield student_model_1.default.findById(req.params.id);
        if (!student) {
            return res.status(404).send("Student not found");
        }
        else {
            return res.status(200).send(student);
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const postStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("student post");
    try {
        const student = yield student_model_1.default.create(req.body);
        res.status(201).send(student);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
const myfunc = () => {
    const rs = new Promise((resolve, reject) => {
        console.log("myfunc");
        resolve("ok");
    });
    return rs;
};
const putStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Student put");
    res.status(400).send("Not implemented");
});
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Student delete");
    try {
        yield student_model_1.default.findByIdAndDelete(req.params.id);
        return res.status(200).send();
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err.message);
    }
});
exports.default = { getStudent, getStudentbyId, postStudent, putStudent, deleteStudent };
//# sourceMappingURL=student_controller.js.map