import supertest from "supertest";
import mongoose from "mongoose";

import app from "./../app.js";

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/test-auth",
    { useNewUrlParser: true },
    () => done()
  );
});

describe("test auth", () => {
  const user = {
    firstName: "test",
    lastName: "test",
    email: "test@test.com",
    password: "123456aA",
  };
  describe("test registering", () => {
    it("should create new user successfully", async () => {
      const { status, body } = await supertest(app)
        .post("/api/auth/register")
        .send(user);

      expect(status).toBe(201);
      expect(body.status).toEqual("success");
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("data");
      expect(body).toHaveProperty("message");
      expect(body.message).toEqual("New User created successfully");
    });

    it("should return status 400", async () => {
      await supertest(app).post("/api/auth/register").send(user);
      const { status, body } = await supertest(app)
        .post("/api/auth/register")
        .send(user);

      expect(status).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body.status).toEqual("error");
      expect(body.message).toEqual("User exist");
    });

    it("should return status 400 for validation", async () => {
      const data = {
        firstName: "t",
        lastName: "t",
        email: "test",
        password: "123456",
      };
      const { status, body } = await supertest(app)
        .post("/api/auth/register")
        .send(data);

      expect(status).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body.status).toEqual("error");
    });
  });

  describe("test login", () => {
    it("should login successfully", async () => {
      await supertest(app).post("/api/auth/register").send(user);
      const { status, body } = await supertest(app)
        .post("/api/auth/login")
        .send({ email: user.email, password: user.password });

      expect(status).toBe(200);
      expect(body.status).toEqual("success");
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("access_token");
      expect(body).toHaveProperty("message");
      expect(body.message).toEqual("Login successfully");
    });

    it("should return validation error", async () => {
      const { status, body } = await supertest(app)
        .post("/api/auth/login")
        .send({ email: "wrong", password: "12345" });

      expect(status).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body.status).toEqual("error");
    });

    it("should return invalid credential", async () => {
      const { status, body } = await supertest(app)
        .post("/api/auth/login")
        .send({ email: "wrong@wrong.com", password: "12345aA" });

      expect(status).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message");
      expect(body.status).toEqual("error");
      expect(body.message).toEqual("Invalid credential");
    });
  });
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});
