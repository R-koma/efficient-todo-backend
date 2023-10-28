const router = require("express").Router();
const Todo = require("../models/Todo");

router.get("/", async (req, res) => {
  try {
    const complete = await Todo.find({
      status: "complete",
    });
    return res.status(200).json(complete);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
