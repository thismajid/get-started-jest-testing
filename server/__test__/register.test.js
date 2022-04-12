import supertest from "supertest";
import mongoose from "mongoose";

import createServer from "../utils/server";

const app = createServer();

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/test-auth",
    { useNewUrlParser: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

describe("test registering", () => {
  const newUser = {
    firstName: "test",
    lastName: "test",
    email: "test@test.com",
    password: "123456aA",
  };

  it("should create new user successfully", async () => {
    const { status, body } = await supertest(app)
      .post("/api/auth/register")
      .send(newUser);

    expect(status).toBe(201);
    expect(body.status).toEqual("success");
    expect(body).toHaveProperty("status");
    expect(body).toHaveProperty("data");
    expect(body).toHaveProperty("message");
    expect(body.message).toEqual("New User created successfully");
  });

  it("should return status 400", async () => {
    await supertest(app).post("/api/auth/register").send(newUser);
    const { status, body } = await supertest(app)
      .post("/api/auth/register")
      .send(newUser);

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
