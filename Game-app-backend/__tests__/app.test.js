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
          expect(response.status).toBe(200);
          expect(response.body.leaderboard.length).toEqual(0);
      })
    });
  });

  // describe("GET /incorrectpath", () => {
  //   test("should return a 404 error",() => {
  //     return request(app)
  //     .get("/incorrectpath").then((response) => {
  //       console.log(response.body.msg)
  //       expect(response.status).toBe(404);
  //       expect(response.body.msg).toBe("404: endpoint not found");
  //     })
  //   });
  // });
});