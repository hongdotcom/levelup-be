const mongoose = require("mongoose");

const CheckpointSchema = mongoose.Schema({
  checkpoint_name: {
    type: String,
    required: true,
  },
  description: String,
  badge_earn: String,
  updated_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Checkpoint", CheckpointSchema);
