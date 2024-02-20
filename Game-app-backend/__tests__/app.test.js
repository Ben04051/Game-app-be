const request = require("supertest");
const app = require("../app");
const connection = require('../connection')

beforeAll(async () => {
  await connection.connect()})

afterAll(async () => {
  await connection.disconnect()})

describe("GET requests", () => {
   
  describe("GET /leaderboard", () => {
    test("should return leaderboard data",() => {
      return request(app)
      .get("/leaderboard").then((response) => {
        console.log(response.body)
          expect(response.status).toBe(200);
          expect(response.body.length).toEqual(0);
      })
    });
  });
});