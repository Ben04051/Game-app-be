const request = require("supertest");
const app = require("../app");
const connection = require('../connection')

beforeAll(async () => {
  await connection.connect()})

afterAll(async () => {
  await connection.disconnect()})

describe("GET requests", () => {
   
  describe("GET /leaderboard", () => {
    test("should return leaderboard data sorted by score in descending order with a default max results of 10",() => {
      return request(app)
      .get("/leaderboard")
      .expect(200)
      .then(({body}) => {
          expect(body.leaderboard.length).toBeGreaterThan(0);
          expect(body.leaderboard.length).toBeLessThan(11)
          const {leaderboard} = body
          expect(leaderboard).toBeSortedBy("score", {descending: true});
      })  
    });
    test("200: tests that the pagination works", () => {
      return request(app)
        .get("/leaderboard?limit=3&p=3")
        .expect(200)
        .then(({ body }) => {
           const {leaderboard} = body
           expect(leaderboard.length).toBe(3)
        });
    });
    test("404: tests that when given a page out of range that a 404 error will be returned ", () => {
      return request(app)
        .get("/leaderboard?limit=100&p=4")
        .expect(404)
        .then(({ body }) => {
         expect(body.msg).toBe("404: results not found")
        });
    });
    test("400: tests that when given a null limit out of range that a 400 error will be returned ", () => {
      return request(app)
        .get("/leaderboard?limit=0&p=1")
        .expect(400)
        .then(({ body }) => {
         expect(body.msg).toBe("Bad request")
        });
    });
    test("400: tests that when given a negative limit out of range that a 400 error will be returned ", () => {
      return request(app)
        .get("/leaderboard?limit=-7&p=1")
        .expect(400)
        .then(({ body }) => {
         expect(body.msg).toBe("Bad request")
        });
    });
    test("400: tests that when given a decimal integer limit that a 400 error will be returned ", () => {
      return request(app)
        .get("/leaderboard?limit=7.5")
        .expect(400)
        .then(({ body }) => {
         expect(body.msg).toBe("Bad request")
        });
    });
    test("400: tests that when given a decimal integer p that a 400 error will be returned ", () => {
      return request(app)
        .get("/leaderboard?p=1.5")
        .expect(400)
        .then(({ body }) => {
         expect(body.msg).toBe("Bad request")
        });
    });
    test("400: tests that when given a none integer limit value that a 400 error will be returned ", () => {
      return request(app)
        .get("/leaderboard?limit=twelve")
        .expect(400)
        .then(({ body }) => {
         expect(body.msg).toBe("Bad request")
        });
    });
    test("400: tests that when given a none integer p value that a 400 error will be returned ", () => {
      return request(app)
        .get("/leaderboard?p=three")
        .expect(400)
        .then(({ body }) => {
         expect(body.msg).toBe("Bad request")
        });
    });
    test("400: tests that when given an empty limit value that a 400 error will be returned ", () => {
      return request(app)
        .get("/leaderboard?limit=")
        .expect(400)
        .then(({ body }) => {
         expect(body.msg).toBe("Bad request")
        });
    });
    test("400: tests that when given an empty p value that a 400 error will be returned ", () => {
      return request(app)
        .get("/leaderboard?p=")
        .expect(400)
        .then(({ body }) => {
         expect(body.msg).toBe("Bad request")
        });
    });
  });

  describe("Get /leaderboard/:username", () => {
    test("should return leaderboard data for a specific username", () => {
      return request(app)
        .get("/leaderboard/Ben")
        .expect(200)
        .then(({ body }) => {
          const { leaderboard } = body;
          expect(leaderboard[0].username).toEqual("Ben");
        });
    });
    test("should 404: not found when no scores are assigned to the player", () => {
      return request(app)
        .get("/leaderboard/Ben2")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("404: results not found")
        });
    });

  });

  describe("GET /users", () => {
    test("should return all users",() => {
      return request(app)
      .get("/users").then((response) => {
          expect(response.status).toBe(200);
          expect(response.body.users.length).toBeGreaterThan(0);
      })
    });
  });

  describe("GET /users/:username", () => {
    test("should return a specific user when passed the username as a parameter", () => {
      return request(app)
      .get("/users/Ben")
      .expect(200)
      .then(({body}) => {
        const {user} = body
        expect(typeof user.username).toBe("string")
        expect(typeof user.password).toBe("string")
      })
    })
    test("should 404: not found when the user doesn't exist", () => {
      return request(app)
        .get("/users/Ben2")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("404: User not found")
        });
    });
  })

  

  describe("GET /incorrectpath", () => {
    test("should return a 404 error",() => {
      return request(app)
      .get("/incorrectpath").then((response) => {
        expect(response.status).toBe(404);
        expect(response.body.msg).toBe("404: endpoint not found");
      })
    });
   
  });
});

describe("POST request", () => {
  describe("POST /leaderboard", () => {
    test("posts a score to the leaderboard when provided a username and score", () => {
      const scoreToAdd = {
        username: "Ben",
        score: 4500
      };
      return request(app)
        .post("/leaderboard")
        .send(scoreToAdd)
        .expect(201)
        .then(({ body }) => {
          const { score } = body;
          expect(typeof score.username).toBe("string");
          expect(typeof score.score).toBe("number");
        });
    });
    test("400: test that when username is missing from the post request that a Bad request error is returned", () => {
      const scoreToAdd = {
        score: 4500
      };   
      return request(app)
      .post("/leaderboard")
      .send(scoreToAdd)
      .expect(400)
      .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        });
    });
    test("400: test that when score is missing from the post request that a Bad request error is returned", () => {
      const scoreToAdd = {
        username: "Ben",
      };  
      return request(app)
      .post("/leaderboard")
      .send(scoreToAdd)
      .expect(400)
      .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        });
    });
    test("400: test that when a variable in the post request is incorrect that a Bad request error is returned", () => {
      const scoreToAdd = {
        username: "Ben",
        score: "4500"
      };
      return request(app)
      .post("/leaderboard")
      .send(scoreToAdd)
      .expect(400)
      .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        });
    });
    test("400: test that when a variable in the post request is incorrect that a Bad request error is returned", () => {
      const scoreToAdd = {
        username: 50,
        score: 4500
      };
      return request(app)
      .post("/leaderboard")
      .send(scoreToAdd)
      .expect(400)
      .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        });
    });
  });
 

  describe("POST /users", () => {
    test("posts a new user to users when provided a username and password", () => {
      const userToAdd = {
        username: "Carl",
        password: "Carl123"
      };
      return request(app)
      .post("/users")
      .send(userToAdd)
      .expect(201)
      .then(({body}) => {
        const {user} = body;
        expect(typeof user.username).toBe("string")
        expect(typeof user.password).toBe("string")
      })
    })
    test("400: test that when username is missing from the post request that a Bad request error is returned", () => {
      const userToAdd = {
        password: "sdflkj"
      };   
      return request(app)
      .post("/users")
      .send(userToAdd)
      .expect(400)
      .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        });
    });
    test("400: test that when password is missing from the post request that a Bad request error is returned", () => {
      const userToAdd = {
        username: "Benhjh",
      };  
      return request(app)
      .post("/users")
      .send(userToAdd)
      .expect(400)
      .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        });
    });
    test("400: test that a passed variable is not a string that bad request is returned", () => {
      const userToAdd = {
        username: "Benhjh",
        password: 4
      };  
      return request(app)
      .post("/users")
      .send(userToAdd)
      .expect(400)
      .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        });
    });
    test("400: test that when passed a username that already exists that bad request is returned", () => {
      const userToAdd = {
        username: "Ben",
        password: "Ben1234"
      };  
      return request(app)
      .post("/users")
      .send(userToAdd)
      .expect(400)
      .then(({body}) => {
            expect(body.msg).toBe("Bad request")
        });
    });
  })

  describe("DELETE /users/:username", () => {
    test("204: deletes a user when provided a username", () => {
      return request(app)
      .delete("/users/Carl")
      .expect(204)
    })
    test("404: returns User not found when passed a username that doesn't exist", () => {
      return request(app)
      .delete("/users/david")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe("404: User not found")
      })
    })
  })


});