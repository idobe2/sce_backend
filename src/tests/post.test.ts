import request from "supertest";
import appInit from "../App";
import mongoose from "mongoose";
import Post from "../models/post_model";
import { Express } from "express";
import User from "../models/user_model";

let app: Express;

const testUser = {
  email: "post@gmail.com",
  password: "123456",
  accessToken: null,
};

beforeAll(async () => {
  app = await appInit();
  console.log("beforeAll");
  await Post.deleteMany();
  await User.deleteMany({ email: testUser.email });
  await request(app).post("/auth/register").send(testUser);
  const res = await request(app).post("/auth/login").send(testUser);
  testUser.accessToken = res.body.accessToken;
});

afterAll(async () => {
  console.log("afterAll");
  await mongoose.connection.close();
});

describe("Post", () => {
  test("Get /post - empty collection", async () => {
    console.log("Test Post get all");
    const res = await request(app).get("/post");
    expect(res.statusCode).toBe(200);
    const data = res.body;
    expect(data).toEqual([]);
    console.log(data);
  });

  const post = {
    title: "this is post title",
    category: "books",
    price: 100,
    message: "this is my post message ..... ",
    owner: "12345",
  };

  test("Post /post - empty collection", async () => {
    const res = await request(app)
      .post("/post")
      .set("Authorization", "Bearer " + testUser.accessToken)
      .send(post);
    expect(res.statusCode).toBe(201);
  });

  test("Update /post", async () => {
    const postRes = await request(app).post("/post")
    .set("Authorization", "Bearer " + testUser.accessToken)
    .send(post);
    const postId = postRes.body._id;
    const updatedPost = { ...post, title: "Updated title" };
    const res = await request(app)
    .put(`/post/${postId}`)
    .set("Authorization", "Bearer " + testUser.accessToken)
    .send(updatedPost);
    expect(res.statusCode).toBe(200);
  });

  test("Delete /post", async () => {
    const postRes = await request(app)
    .post("/post")
    .set("Authorization", "Bearer " + testUser.accessToken)
    .send(post);
    const postId = postRes.body._id;
    const res = await request(app)
    .delete(`/post/delete/${postId}`)
    .set("Authorization", "Bearer " + testUser.accessToken);
    expect(res.statusCode).toBe(200);
    const getRes = await request(app)
    .get(`/post/delete/${postId}`)
    .set("Authorization", "Bearer " + testUser.accessToken);
    expect(getRes.statusCode).toBe(404);
  });
});
