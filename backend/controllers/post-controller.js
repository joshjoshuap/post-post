const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../middleware/http-error");

const UserModel = require("../models/user-model");
const PostModel = require("../models/post-model");

// Get: /api/post/user/id1
exports.getPostByUserId = async (req, res, next) => {
  const userId = req.params.userId;

  let post;
  try {
    post = await PostModel.find({ creator: userId });
  } catch (err) {
    return next(new HttpError("No Posts for Provided User"), 500);
  }

  res.json({ post: post.map((post) => post.toObject({ getters: true })) });
};

// Post: /api/post/
exports.createPost = async (req, res, next) => {
  const { title, description, creator } = req.body;

  const createPost = new PostModel({
    title: title,
    description: description,
    creator: creator,
  });

  let user;

  try {
    user = await UserModel.findById(creator);
  } catch (err) {
    console.log("Cannot Find user");
    return next(new HttpError("Cannot Find User", 500));
  }

  try {
    await createPost.save();

    user.posts.push(createPost);
    user.save();
    console.log("Posting Success");
  } catch (err) {
    console.log("Posting Failed", err);
    return next(new HttpError("Posting Failed", 500));
  }

  res.status(201).json({ post: createPost });
};
