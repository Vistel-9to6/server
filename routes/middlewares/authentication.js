exports.checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).json({
      result: "ng",
      errorMessage: "Unauthorized",
    });
  }
};
