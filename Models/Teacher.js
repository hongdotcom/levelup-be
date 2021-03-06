const mongoose = require("mongoose");

const TeacherSchema = mongoose.Schema({
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
  joint_date: {
    type: Date,
    required: true,
  },
  class_taught: {
    type: [
      {
        // class_id: ObjectId,
        class_date: Date,
        attendance: Number,
      },
    ],
  },
  updated_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Teacher", TeacherSchema);
