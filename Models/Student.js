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
        // schedule: ObjectId,
        // booking_id: ObjectId,
        class_date: Date,
        attendance: Number,
      },
    ],
  },
  // checkpoint_earn: { type: Array, default: [] },
  checkpoint_earn: [{}],

  skill_learn: {
    type: [
      {
        skill_name: String,
        learn_date: Date,
        level: Number,
        comment: String,
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
