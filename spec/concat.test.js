const request = require("supertest");

const { dbConnect, dbDisconnect } = require("./mockDB");
const app = require("../app");

const User = require("../models/User");
const Video = require("../models/Video");
const UserService = require("../services/UserService");
const { mockToken, mockUser } = require("./mockData");

describe("PATCH `/api/videos`", () => {
  beforeEach(async () => {
    await dbDisconnect();
    await dbConnect();
  });

  jest.setTimeout(10000);

  it("토큰이 유효하지 않은 사용자는 동영상을 병합할 수 없어야 한다", (done) => {
    request(app)
      .patch("/api/videos")
      .set("authorization", "wrongToken")
      .send({ originalVideoUrl: "http://originalVideo.com/123" })
      .expect(401)
      .end(async (err, res) => {
        if (err) {
          return done(err);
        }

        expect(res.body).toBeTruthy();
        expect(res.body.result).toBe("ng");
        expect(res.body.errorMessage).toBe("Unauthorized");

        const newVideo = await Video.findOne({ title: "newVideo" });
        expect(newVideo).toBeNull();

        done();
      });
  });

  describe("", () => {
    beforeEach(async () => {
      try {
        await User.create(mockUser);
      } catch (err) {
        console.log(`err: ${err} cannot create mock activity`);
      }
    });

    it("사용자는 동영상을 병합할 수 있어야 한다`", (done) => {
      const spyFindUserByGoogleId = jest.spyOn(
        UserService,
        "findUserByGoogleId",
      );

      request(app)
        .patch("/api/videos")
        .set("authorization", `Bearer ${mockToken}`)
        .set("Content-Type", "multipart/form-data")
        .field({ originVideoUrl: "http://originalVideo.com/123" })
        .attach("video", Buffer.from("videoData"), "newVideo.mp4")
        .expect(200)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }

          expect(spyFindUserByGoogleId).toBeCalledTimes(1);
          expect(spyFindUserByGoogleId).toBeCalledWith({
            userId: mockUser.userId,
          });

          expect(res.body).toBeTruthy();
          expect(res.body.result).toBe("ok");

          const newVideo = await Video.findOne({ title: "newVideo" });
          expect(newVideo).toBeTruthy();

          done();
        });
    });

    it("originalVideoUrl 값이 없다면 동영상을 병합할 수 없어야 한다", (done) => {
      request(app)
        .patch("/api/videos")
        .set("authorization", "Bearer 올바른 토큰")
        .set("Content-Type", "multipart/form-data")
        .field({ originalVideoUrl: "" })
        .attach("video", Buffer.from("videoData"), "newVideo.mp4")
        .expect(400)
        .end(async (err, res) => {
          if (err) {
            return done(err);
          }

          expect(res.body).toBeTruthy();
          expect(res.body.result).toBe("ng");
          expect(res.body.errorMessage).toBe(
            "title or maxCreators value is required. try again.",
          );

          const newVideo = await Video.findOne({ title: "newVideo" });
          expect(newVideo).toBeNull();

          done();
        });
    });
  });
});
