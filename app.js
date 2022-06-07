require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const connectDB = require("./models/index");
const cors = require("cors");

const authRouter = require("./routes/auth");
const videoRouter = require("./routes/video");

const app = express();

connectDB();
const corsOptions = {
  origin: ["http://localhost:3000", "https://keen-paletas-3d2f76.netlify.app"],
};

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/videos", videoRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  return res.status(err.status || 500).json({
    result: "ng",
    errorMessage: "Internal Error",
  });
});

module.exports = app;
