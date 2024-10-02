import request from "supertest";
import app from "../app.js";

describe("App", () => {
  test("GET / should return 200", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("GET /nonexistent should return 404", async () => {
    const response = await request(app).get("/nonexistent");
    expect(response.statusCode).toBe(404);
  });
});
