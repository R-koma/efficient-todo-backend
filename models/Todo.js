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
});

module.exports = mongoose.model("Todo", TodoSchema);
