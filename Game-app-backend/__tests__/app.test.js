const request = require("supertest");
const app = require("../connection");

describe("GET requests", () => {
  describe("GET /leaderboard", () => {
    test("should return leaderboard data",() => {
      return request(app)
      .get("/leaderboard").then((response) => {
        console.log(response.body)
          expect(response.status).toBe(200);
          expect(response.body.length).toEqual(4);
      })
    });
  });
});