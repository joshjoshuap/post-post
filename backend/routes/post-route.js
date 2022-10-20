const express = require("express");
const { check } = require("express-validator");

const postController = require("../controllers/post-controller");

const router = express.Router();

// Get: /api/posts/
router.get("/");

// Get: /api/post/id1
router.get("/:postId");

// Get: /api/post/user/id1
router.get("/user/:userId");

// Post: /api/post/
router.post("/", postController.createPost);

// Patch: /api/post/id1
router.patch("/:postId");

// Delete: /api/post/id1
router.delete("/:postId");

module.exports = router;
