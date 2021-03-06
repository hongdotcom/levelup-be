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
        // schedule_id: ObjectId,
        class_date: Date,
        Location: String,
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
