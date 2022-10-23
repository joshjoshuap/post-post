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
  user: {
    name: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
});

module.exports = mongoose.model("Post", postSchema);
