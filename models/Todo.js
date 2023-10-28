const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["todo", "review"],
    default: "todo",
  },
  nextReviewDate: {
    type: Date,
    default: null,
  },
  reviewCount: {
    type: Number,
    default: 0, // 初期値は0
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
