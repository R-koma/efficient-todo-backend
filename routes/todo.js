const router = require("express").Router();
const Todo = require("../models/Todo");

//CRUD
//todoを作成する。
router.post("/", async (req, res) => {
  const newTodo = new Todo({
    title: req.body.title,
  });
  try {
    const savedTodo = await newTodo.save();
    return res.status(200).json(savedTodo);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//todoを取得する。
router.get("/", async (req, res) => {
  try {
    const todo = await Todo.find({ status: "todo" });
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(403).json(err);
  }
});

//status todo情報をreviewに更新する。
router.put("/:id/complete", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    todo.status = "review";
    const savedTodo = await todo.save();
    return res.status(200).json(savedTodo);
  } catch (err) {
    return res.status(403).json(err);
  }
});

//todoを削除する。
router.delete("/:id", async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndRemove(req.params.id);
    return res.status(200).json(deletedTodo);
  } catch (err) {
    return res.status(403).json(err);
  }
});

module.exports = router;
