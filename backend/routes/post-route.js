const express = require("express");
const { check } = require("express-validator");

const postController = require("../controllers/post-controller");

const router = express.Router();

const postValidation = [
  check("title")
    .not()
    .isEmpty()
    .isLength({ min: 3 })
    .withMessage("Title must not empty and mimimun of 3 characters"),
  check("description")
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 300 })
    .withMessage(
      "Description must not empty and mimimun of 5 characters and max of 300 characters"
    ),
];

// Get: /api/posts/
router.get("/", postController.getAllPosts);

// Get: /api/post/id1
router.get("/:postId", postController.getPostById);

// Get: /api/post/user/id1
router.get("/user/:userId", postController.getPostByUserId);

// Post: /api/post/
router.post("/", postValidation, postController.createPost);

// Patch: /api/post/id1/edit
router.patch("/:postId/edit", postValidation, postController.updatePost);

// Delete: /api/post/id1
router.delete("/:postId", postController.deletePost);

module.exports = router;
