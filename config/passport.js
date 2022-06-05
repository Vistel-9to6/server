const passport = require("passport");
const UserService = require("../services/UserService");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
      callbackURL: '/auth/callback',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const profilePhoto = profile.photos[0].value;

      try {
        const user = await UserService.getUserByEmail({ email });

        if (!user) {
          const newUser = await UserService.creatNewUser({
            email,
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
  )
);

module.exports = passport;
