import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import Student from "../models/student_model";
import { Express } from "express";
import User from "../models/user_model";


const testUser = {
email: "teststudent@gmail.com",
password: "123456",
accessToken: null
}

let app: Express;
beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await Student.deleteMany();
    await User.deleteMany({ email: testUser.email });
    await request(app).post("/auth/register").send(testUser);
    const res = await request(app).post("/auth/login").send(testUser);
    testUser.accessToken = res.body.accessToken;
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

const students =  [
{
    name: "John",
    _id: "12345",
    age: 22
},

{   name: "John 2", 
    _id: "12346", 
    age: 23 
}
]

describe("Student", () => {

    test("Get /student - empty collection", async () => {
        console.log("Test Student get all");
        const res = await request(app).get("/student").set('Authorization', `Bearer ${testUser.accessToken}`);
        expect(res.statusCode).toBe(200);
        const data = res.body;
        expect(data).toEqual([]);
        console.log(data);
    });

    test("POST /student", async () => {
        const res = await request(app)
            .post("/student")
            .send(students[0])
            .set('Authorization', `Bearer ${testUser.accessToken}`);
            expect(res.statusCode).toEqual(201);
            expect(res.body.name).toEqual("John");
            // studentId = res.body._id;
            const res2 = await request(app).get("/student")
            .set('Authorization', `Bearer ${testUser.accessToken}`);
            expect(res2.statusCode).toBe(200);
            const data = res2.body;
            expect(data[0].name).toBe(students[0].name);
            expect(data[0]._id).toBe(students[0]._id);
            expect(data[0].age).toBe(students[0].age);
        });

    test("GET /student/:id", async () => {
        const res = await request(app).get("/student/get/" + students[0]._id)
        .set('Authorization', `Bearer ${testUser.accessToken}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(students[0].name);
        expect(res.body._id).toBe(students[0]._id);
        expect(res.body.age).toBe(students[0].age);
       });

    test("Fail GET /student/get/:id", async () => {
        const res = await request(app).get('/student/get/00000')
        .set('Authorization', `Bearer ${testUser.accessToken}`);
        expect(res.statusCode).toBe(404);
    });

    test("Get /student without token", async () => {
        const res = await request(app).get("/student/");
        expect(res.statusCode).toBe(401);
      });

      test("PUT /student/:id", async () => {
        const res = await request(app).post("/student")
        .send(students[0])
        .set('Authorization', `Bearer ${testUser.accessToken}`);
        const studentId = res.body._id;
        const updatedStudent = { ...students[0], age: 24 };
        const res2 = await request(app)
        .put(`/student/${studentId}`)
        .set('Authorization', `Bearer ${testUser.accessToken}`)
        .send(updatedStudent);
        expect(res2.statusCode).toEqual(200);
        expect(res2.body.age).toEqual(24);
      });

    test("DELETE /student/delete/:id", async () => {
        const res = await request(app).delete("/student/delete/" + students[0]._id)
        .set('Authorization', `Bearer ${testUser.accessToken}`);
        expect(res.statusCode).toBe(200);

        const res2 = await request(app).get("/student/delete/" + students[0]._id)
        .set('Authorization', `Bearer ${testUser.accessToken}`);
        expect(res2.statusCode).toBe(404);
    });
});