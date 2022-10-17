const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/user-controller");

let loginValidation = [check("password").trim()];

let signupValidation = [
  check("email")
    .not()
    .isEmpty()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please enter a valid email."),
  check("password")
    .trim()
    .isLength({ min: 6 })
    .isAlphanumeric()
    .withMessage("Password must be length of 6 characters, No Spaces"),
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password and Confirm Passoword have to match!");
      }
      return true;
    }),
];

const router = express.Router();

// /api/user/
router.get("/", userController.getUsers);

// /api/user/login
router.post("/login", loginValidation, userController.postLogin);

// /api/user/signup
router.post("/signup", signupValidation, userController.postSignup);

module.exports = router;
