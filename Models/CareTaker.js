const mongoose = require("mongoose");

const CaretakerSchema = mongoose.Schema({
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
  register_date: {
    type: Date,
    required: true,
  },
  purchase_record: {
    type: [
      {
        credit_purchased: Number,
        nzd_total: Number,
        payment_status: Number,
      },
    ],
  },
  updated_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = mongoose.model("Caretaker", CaretakerSchema);
