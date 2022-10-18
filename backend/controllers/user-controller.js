const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const HttpError = require("../middleware/http-error");
const UserModel = require("../models/user-model");

// GET: /api/user/
exports.getUsers = async (req, res, next) => {
  let users;

  try {
    users = await UserModel.find({}, "-password");
  } catch (err) {
    console.log("Fetching User Failed");
    return next(new HttpError("Fetching User Failed", 422));
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
    return next(new HttpError("Inavalid Input, Please Check", 422));
  }

  if (!existingUser) {
    console.log("Email / User does not exist, Register Now");
    return next(
      new HttpError("Email / User does not exist, Register Now", 422)
    );
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log("Login Hashing Failed", err);
    return next(new HttpError("Input Invalid, Please Check", 422));
  }

  if (!isValidPassword) {
    console.log("Invalid Password");
    return next(new HttpError("Invalid Password", 422));
  }

  res.json({
    message: "Logged In",
    user: existingUser.toObject({ getters: true }),
  });
};

// POST: /api/user/signup
exports.postSignup = async (req, res, next) => {
  // server validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(errors.array()[0].msg, 422));
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    console.log("Finding User Failed", err);
    return next(new HttpError("Invalid Input, Check Inputs", 422));
  }

  if (existingUser) {
    console.log("Email Exist");
    return next(new HttpError("Email Exist", 422));
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log("Hashing Password Failed", err);
    return next(new HttpError("Password Invalid", 422));
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
    return next(new HttpError("Signup Failed", 422));
  }

  res.status(201).json({ user: createUser.toObject({ getters: true }) });
};
