const bcrypt = require("bcryptjs");

const UserModel = require("../models/user-model");

// GET: /api/user/
exports.getUsers = async (req, res, next) => {
  let users;

  try {
    users = await UserModel.find({}, "-password");
  } catch (err) {
    console.log("Fetching User Failed");
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// POST: /api/user/login
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    console.log("Finding User Failed", err);
  }

  if (!existingUser) {
    console.log("Email / User does not exist, Register Now");
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcypt.compare(password, existingUser.password);
  } catch (err) {
    console.log("Login Hashing Failed", err);
  }

  if (!isValidPassword) {
    console.log("Invalid Password");
  }

  res.json({
    message: "Logged In",
    user: existingUser.toObject({ getters: true }),
  });
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
