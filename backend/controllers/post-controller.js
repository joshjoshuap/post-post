const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const HttpError = require("../middleware/http-error");

// Models
const UserModel = require("../models/user-model");
const PostModel = require("../models/post-model");

// Get: /api/posts/
exports.getAllPosts = async (req, res, next) => {
  let posts;

  // fetching list of posts
  try {
    posts = await PostModel.find();
  } catch (err) {
    console.log("Fetching Posts Failed");
    return next(new HttpError("Fetching Posts Failed", 422));
  }

  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

// Get: /api/post/id1
exports.getPostById = async (req, res, next) => {
  const postId = req.params.postId; // get paramsid
  let post;

  // findinf exisitng post
  try {
    post = await PostModel.findById(postId);
  } catch (err) {
    console.log("No Place Found", err);
    return next(new Error("No Place for Provided ID", 500));
  }

  // check post existing
  if (!post || post.length === 0) {
    console.log("No Place Found");
    return next(new Error("No Place for Provided ID", 500));
  }

  res.json({ post: post.toObject({ getters: true }) });
};

// Get: /api/post/user/id1
exports.getPostByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let post;

  // fetching post by user id
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

  // create post schmea
  const createPost = new PostModel({
    title: title,
    description: description,
    creator: creator,
  });

  let user;

  // feind user by id
  try {
    user = await UserModel.findById(creator);
  } catch (err) {
    console.log("Cannot Find user");
    return next(new HttpError("Cannot Find User", 500));
  }

  try {
    await createPost.save(); // saving posts

    user.posts.push(createPost); // pushing new post to user posts array
    user.save(); // saving user posts array
    console.log("Posting Success");
  } catch (err) {
    console.log("Posting Failed", err);
    return next(new HttpError("Posting Failed", 500));
  }

  res.status(201).json({ post: createPost });
};
