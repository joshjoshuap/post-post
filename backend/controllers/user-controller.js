const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

// Models
const HttpError = require("../middleware/http-error");
const UserModel = require("../models/user-model");

// GET: /api/user/
exports.getUsers = async (req, res, next) => {
  let users;

  // find list of users
  try {
    users = await UserModel.find({}, "-password");
  } catch (err) {
    console.log("Finding User Failed\n", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

// POST: /api/user/login
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body; // get parse body data
  let existingUser;

  // find existing user
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    console.log("Finding User Failed\n", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  if (!existingUser) {
    console.log("Email Not Exist");
    return next(
      new HttpError("Email / User does not exist, Register Now", 422)
    );
  }

  // check password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    console.log("Password Hashing Failed\n", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  if (!isValidPassword) {
    console.log("Invalid Password");
    return next(new HttpError("Invalid/Incorrect Password", 422));
  } else {
    console.log("Logged In");
  }

  res.status(200).json({
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

  const { name, email, password } = req.body; // get parse body data

  // find exisiting user
  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email: email });
  } catch (err) {
    console.log("Finding User Failed\n", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  if (existingUser) {
    console.log("Email Exist");
    return next(new HttpError("Email/User Exist, Try Different Email", 422));
  }

  // encrypt password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    console.log("Hashing Password Failed\n", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  // creating new user
  const createUser = new UserModel({
    name,
    email,
    password: hashedPassword,
  });

  // saving new user
  try {
    await createUser.save();
    console.log("Signup Success");
  } catch (err) {
    console.log("Signup Failed\n", err);
    return next(new HttpError("Signup Failed, Please Try again", 422));
  }

  res.status(201).json({
    message: "Signup Success",
    user: createUser.toObject({ getters: true }),
  });
};
