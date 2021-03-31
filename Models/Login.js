const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema({
  googleId: {
    type: String,
  },
  twitterId: {
    type: String,
  },
  githubId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  hashPassword: {
    type: String,
  },
  last_login_date: {
    type: Date,
  },
  role_id: String,
  related_id: String,
  updated_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Login", LoginSchema);
