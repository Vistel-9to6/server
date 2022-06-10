require("dotenv").config();
const mongoDBConnect = require("./models/index");

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");

const authRouter = require("./routes/auth");
const videoRouter = require("./routes/video");

const app = express();

mongoDBConnect();
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/videos", videoRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err);
  return res.status(err.status || 500).json({
    result: "ng",
    errorMessage: "Internal Error",
  });
});

module.exports = app;
