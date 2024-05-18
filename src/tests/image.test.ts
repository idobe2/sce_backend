import request from 'supertest';
import appInit from "../App";
import mongoose from 'mongoose';
import fs from 'fs';


beforeAll(async () => {
    console.log("beforeAll");
});

afterAll(async () => {
    console.log("afterAll");
    mongoose.connection.close();
});

jest.setTimeout(30000);

describe("Image Tests", () => {
    test("Upload image", async () => {
        const imagePath = `${__dirname}/avatar.png`;
        const rs = fs.existsSync(imagePath);
        if (rs) {
            const response = await request(appInit)
            .post("/file/file?file=123.jpeg").attach('file', imagePath);
            expect(response.statusCode).toEqual(200);
        }
    })
});