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

    test ("Upload invalid file type", async () => {
        const filePath = `${__dirname}/invalid.txt`;
        const rs = fs.existsSync(filePath);
        if (rs) {
            const response = await request(appInit)
            .post("/file/file?file=123.jpeg").attach('file', filePath);
            expect(response.statusCode).toEqual(400);
        }
    })

    test("Upload large image file", async () => {
        const largeImagePath = `${__dirname}/large_image.jpg`;
        const rs = fs.existsSync(largeImagePath);
        if (rs) {
            const response = await request(appInit)
            .post("/file/file?file=123.jpeg").attach('file', largeImagePath);
            expect(response.statusCode).toEqual(413);
        }
      });
});