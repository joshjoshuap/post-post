const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
