const jwt = require("jsonwebtoken");
const HttpError = require("./http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
    console.log(req.headers.authorization);

  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      console.log(req.headers.authorization);
      return next(
        new HttpError("Authentication Failed, Please Try Again"),
        401
      );
    }

    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    console.log("JWT Authentication Failed", err);
    return next(new HttpError("Authentication Failed, Please Try Again"), 401);
  }
};
