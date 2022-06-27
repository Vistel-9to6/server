const request = require("supertest");
const { OAuth2Client } = require("google-auth-library");
jest.mock("google-auth-library");

const { dbConnect, dbDisconnect } = require("./mockDB");
const app = require("../app");
const User = require("../models/User");
const { mockUser, mockToken } = require("./mockData");

describe("POST /api/auth/google", () => {
  beforeEach(async () => {
    await dbDisconnect();
    await dbConnect();
  });

  it("토큰으로부터 사용자 정보를 가져와야 한다", async () => {
    const spyVerifyToken = jest.fn().mockReturnValueOnce({
      payload: {
        sub: mockUser.userId,
        picture: mockUser.profilePhoto,
      },
    });

    OAuth2Client.prototype.verifyIdToken = spyVerifyToken;

    await request(app)
      .post("/api/auth/google")
      .set("authorization", "Bearer mockGoogleIdToken")
      .send({ token: "mockGoogleIdToken" })
      .expect(200);

    expect(spyVerifyToken).toBeCalledTimes(1);
    expect(spyVerifyToken).toBeCalledWith({
      idToken: "mockGoogleIdToken",
      audience: process.env.EXPO_CLIENT_ID,
    });
  });

  it("새로운 사용자의 idToken을 받았을 때 사용자를 생성해야 한다", async () => {
    const spyVerifyToken = jest.fn().mockReturnValueOnce({
      payload: {
        sub: mockUser.userId,
        picture: mockUser.profilePhoto,
      },
    });

    OAuth2Client.prototype.verifyIdToken = spyVerifyToken;

    await request(app)
      .post("/api/auth/google")
      .set("authorization", "Bearer mockGoogleIdToken")
      .expect(200)
      .expect("Content-Type", /json/);

    const newUser = await User.findOne({ userId: mockUser.userId });

    expect(newUser).toBeTruthy();
    expect(newUser.profilePhoto).toBe(mockUser.profilePhoto);
  });
});
