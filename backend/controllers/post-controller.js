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
    console.log("Finding All Posts Failed\n", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  // check existing posts
  if (!posts || posts.length === 0) {
    console.log("No Posts Found");
    return next(new Error("No Posts Found", 422));
  }

  res.json({ posts: posts.map((post) => post.toObject({ getters: true })) });
};

// Get: /api/post/id1
exports.getPostById = async (req, res, next) => {
  const postId = req.params.postId; // get paramsid
  let post;

  // finding exisitng post
  try {
    post = await PostModel.findById(postId);
  } catch (err) {
    console.log("Finding Post ID Failed", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  // check existing post
  if (!post || post.length === 0) {
    console.log("No Posts Found");
    return next(new Error("No Post Found", 422));
  }

  res.json({ post: post.toObject({ getters: true }) });
};

// Get: /api/post/user/id1
exports.getPostByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let post;

  // fetching post by user id
  try {
    post = await PostModel.find({ "user.userId": userId });
  } catch (err) {
    console.log("Finding User Post Failed\n", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  // check existing post
  if (!post || post.length === 0) {
    console.log("No Posts Found");
    return next(new Error("No Post Found", 422));
  }

  res.json({ post: post.map((post) => post.toObject({ getters: true })) });
};

// Post: /api/post/
exports.createPost = async (req, res, next) => {
  // server validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(errors.array()[0].msg, 422));
  }

  const { title, description, userName, userId } = req.body;

  // create post schmea
  const createPost = new PostModel({
    title: title,
    description: description,
    user: {
      name: userName,
      userId: userId,
    },
  });

  let user;

  // find user by id
  try {
    user = await UserModel.findById(userId);
  } catch (err) {
    console.log("Finding User ID Failed\n", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  try {
    await createPost.save(); // saving posts

    user.posts.push(createPost); // pushing new post to user posts array
    user.save(); // saving user posts array
    console.log("Posting Created");
  } catch (err) {
    console.log("Posting Failed\n", err);
    return next(new HttpError("Posting Failed", 422));
  }

  res.status(201).json({ post: createPost });
};

// Patch: /api/post/id1
exports.updatePost = async (req, res, next) => {
  // server validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError(errors.array()[0].msg, 422));
  }

  // get data
  const { title, description, creator } = req.body;
  const postId = req.params.postId;
  let post;

  // finding exisitng post
  try {
    post = await PostModel.findById(postId);
  } catch (err) {
    console.log("No Post Found for Provided ID", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  // get old data and rewrite to new input
  post.title = title;
  post.description = description;
  post.creator = creator;

  try {
    await post.save(); // saving updated post
    console.log("Post Updated");
  } catch (err) {
    console.log("Updating Failed", err);
    return next(new Error("Updating Failed", 422));
  }

  res.status(200).json({ post: post.toObject({ getters: true }) });
};

// Delete: /api/post/id1
exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  let post;

  // finding existing post
  try {
    post = await PostModel.findById(postId).populate(
      "user.userId",
      "-password"
    );
  } catch (err) {
    console.log("No Post for Provided ID", err);
    return next(new HttpError("Server Error, Please Try Again", 500));
  }

  // check existing post
  if (!post) {
    return next(new Error("No Post for Provided ID", 422));
  }

  try {
    await post.remove(); // removing post
    post.user.userId.posts.pull(post); // removing post from creator array
    await post.user.userId.save(); // save removed post
    console.log("Post Deleted");
  } catch (err) {
    console.log("Deleting Failed", err);
    return next(new Error("Deleting Failed", 422));
  }

  res.status(200).json({ post: "Post Delete" });
};
