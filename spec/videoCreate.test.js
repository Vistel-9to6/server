const request = require("supertest");

const { dbConnect, dbDisconnect } = require("./mockDB");
const app = require("../app");

const User = require("../models/User");
const Video = require("../models/Video");
const UserService = require("../services/UserService");
const { mockToken, mockUser } = require("./mockData");

describe("POST `/api/videos`", () => {
  beforeEach(async () => {
    await dbDisconnect();
    await dbConnect();
  });

  jest.setTimeout(10000);

  it("토큰이 유효하지 않은 사용자는 동영상을 생성할 수 없어야 한다", (done) => {
    request(app)
      .post("/api/videos")
      .set("authorization", "wrongToken")
      .send({ title: "newVideo", maxCreators: 2 })
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
        console.log(`err: ${err} cannot create mock video`);
      }
    });

    it("사용자는 동영상을 생성할 수 있어야 한다", (done) => {
      const spyFindUserByGoogleId = jest.spyOn(
        UserService,
        "findUserByGoogleId",
      );

      request(app)
        .post("/api/videos")
        .set("authorization", `Bearer ${mockToken}`)
        .set("Content-Type", "multipart/form-data")
        .field({ title: "newVideo", maxCreators: 2 })
        .attach("video", Buffer.from("videoData"), "newVideo.mp4")
        .attach("thumbnail", Buffer.from("thumbnailData"), "newThumbnail.mp4")
        .expect(201)
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

    it("사용자가 title을 입력하지 않았다면 동영상을 생성할 수 없어야 한다", (done) => {
      request(app)
        .post("/api/videos")
        .set("authorization", `Bearer ${mockToken}`)
        .set("Content-Type", "multipart/form-data")
        .field({ title: "newVideo" })
        .attach("thumbnail", Buffer.from("thumbnailData"), "newThumbnail.mp4")
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

    it("사용자가 maxCreators를 입력하지 않았다면 동영상을 생성할 수 없어야 한다", (done) => {
      request(app)
        .post("/api/videos")
        .set("authorization", `Bearer ${mockToken}`)
        .set("Content-Type", "multipart/form-data")
        .field({ maxCreators: 2 })
        .attach("video", Buffer.from("videoData"), "newVideo.mp4")
        .attach("thumbnail", Buffer.from("thumbnailData"), "newThumbnail.mp4")
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
