// GET: /api/user/
exports.getUsers = (req, res, next) => {
  res.send("Users");
};

// POST: /api/user/login
exports.postLogin = (req, res, next) => {
  res.send("Login");
};

// POST: /api/user/signup
exports.postSignup = (req, res, next) => {
  res.send("Signup");
};
