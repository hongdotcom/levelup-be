const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
