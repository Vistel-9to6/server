const passport = require("passport");
const UserService = require("../services/UserService");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (user, done) => {
  try {
    const user = await UserService.findUserById(user._id);

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
        const user = await UserService.getUserByEmail({ userId });

        if (!user) {
          const newUser = await UserService.creatNewUser({
            userId,
            profilePhoto,
            lastVisited: new Date(),
          });

          req.user = newUser;
          return done(null, newUser);
        }

        req.user = user;
        return done(null, user);
      } catch (error) {
        done(error, false);
      }
    },
  ),
);

module.exports = passport;
