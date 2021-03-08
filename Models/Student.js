const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: Date,
  school: String,
  current_credit: Number,
  joint_date: {
    type: Date,
    required: true,
  },
  class_taken: {
    type: [
      {
        class_date: Date,
        location: String,
        attendance: Number,
        update_date: {
          type: Date,
          default: Date.now(),
          required: true,
        },
      },
    ],
  },
  checkpoint_earn: {
    type: [
      {
        checkpoint_name: String,
        update_date: {
          type: Date,
          default: Date.now(),
          required: true,
        },
        level: Number,
        comment: String,
      },
    ],
  },
  skill_learn: {
    type: [
      {
        skill_name: String,
        update_date: {
          type: Date,
          default: Date.now(),
          required: true,
        },
        level: Number,
        comment: String,
      },
    ],
  },
  quiz_result: {
    type: [
      {
        quiz_date: Date,
        level: Number,
        comment: String,
        update_date: {
          type: Date,
          default: Date.now(),
          required: true,
        },
      },
    ],
  },
  updated_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
