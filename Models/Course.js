const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  course_name: {
    type: String,
    required: true,
  },
  description: String,
  duration: String,
  schedule: {
    type: [
      {
        class_date: Date,
        location: String,
      },
    ],
  },
  updated_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
