import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import Post from "../models/post_model";
import { Express } from "express";


let app: Express;
beforeAll(async () => {
    app = await appInit();
    console.log("beforeAll");
    await Post.deleteMany();
});

afterAll(async () => {
    console.log("afterAll");
    await mongoose.connection.close();
});

describe("Auth test", () => {

    test("Post /register", async () => {
        const res = await request(app).post("/auth/register").send(
            {
                "username": "test@gmail.com",
                "password": "123456"
            }
        );
        expect(res.statusCode).toBe(200);
    });

    test("Post /login", async () => {
        const res = await request(app).post("/auth/login").send(
            {
                "username": "test@gmail.com",
                "password": "123456"
            }
        );
        expect(res.statusCode).toBe(200);
    });
});