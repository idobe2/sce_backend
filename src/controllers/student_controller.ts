import { Request, Response } from "express";
import Student from "../models/student_model";
import baseController from "./base_controller";
import { IStudent } from "../models/student_model";


class StudentController extends baseController<IStudent> {
    constructor() {
        super(Student);
    }

    async edit(req: Request, res: Response) {
        console.log("student: ", req.params);
        try {
            const student = await Student.findOne({'id': req.params._id});
            if (!student) {
                return res.status(404).send("Student not found");
            }
            student.name = req.body.name;
            student.age = req.body.age;
            student.image = req.body.image;
            await student.save();
            return res.status(200).send(student);
        }
        catch (error) {
            console.log(error);
            res.status(400).send(error.message);
        }
    }
}

export default new StudentController();