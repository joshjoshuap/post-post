const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();

// /api/user/
router.get("/", userController.getUsers);

// /api/user/login
router.post("/login", userController.postLogin);

// /api/user/signup
router.post("/signup", userController.postSignup);

module.exports = router;
