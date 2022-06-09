const passport = require("passport");
const User = require("./Models/User");
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");

module.exports = (app) => {
  app.use(passport.initialize());

  passport.use(
    new JWTStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        passReqToCallback: true,
      },
      async (req, jwtPayload, done) => {
        try {
          await User.findOne({ id: jwtPayload.userId }).lean();

          req.user = jwtPayload;

          return done(null, jwtPayload);
        } catch (error) {
          done(error, false);
        }
      },
    ),
  );
};
