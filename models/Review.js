const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
