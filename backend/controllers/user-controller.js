const bcrypt = require("bcryptjs");

const UserModel = require("../models/user-model");

// GET: /api/user/
exports.getUsers = (req, res, next) => {
  res.send("Users");
};

// POST: /api/user/login
exports.postLogin = (req, res, next) => {
  res.send("Login");
};

// POST: /api/user/signup
exports.postSignup = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    console.log("Signup Failed", err);
  }

  if (existingUser) {
    console.log("Email Exist");
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log("Hashing Password Filed", err);
  }

  const createUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createUser.save();
    console.log("Signup Success");
  } catch (err) {
    console.log("Signup Failed", err);
  }

  res.status(201).json({ user: createUser.toObject({ getters: true }) });
};
