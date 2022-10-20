const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "Post",
    },
  ],
});

userSchema.plugin(uniqueValidator); // intialize unique data
module.exports = mongoose.model("User", userSchema);
