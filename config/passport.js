const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const UserService = require("../services/UserService");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserService.findUserById(id);

    done(null, user);
  } catch (err) {
    done(null, false);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "api/auth/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const userId = profile.id;
      const profilePhoto = profile.photos[0].value;

      try {
        const user = await UserService.findUserBygoogleId({ userId });

        if (!user) {
          const newUser = await UserService.creatNewUser({
            userId,
            profilePhoto,
          });

          req.user = newUser;
          return done(null, newUser);
        }

        req.user = user;
        return done(null, user);
      } catch (error) {
        done(error);
      }
    },
  ),
);

module.exports = passport;
