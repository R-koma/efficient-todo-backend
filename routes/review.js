const router = require("express").Router();
const Todo = require("../models/Todo");
// const Review = require("../models/Review");

//CRUD
//TodoのstatusにあるreviewをReviewモデルとして新しく作成。
// router.post("/", async (req, res) => {
//   try {
//     const reviews = await Todo.find({ status: "review" });

//     for (let reviewTodo of reviews) {
//       const newReview = new Review({
//         title: reviewTodo.title,
//       });
//       await newReview.save();
//       await reviewTodo.remove();
//     }
//     return res.status(200).json({ message: "status reviewをReviewへ移行" });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

//reviewを取得
router.get("/", async (req, res) => {
  try {
    const review = await Todo.find({ status: "review" });
    return res.status(200).json(review);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//reviewを更新
router.put("/:id/complete", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    const savedTodo = await todo.save();
    return res.status(200).json(savedTodo);
  } catch (err) {
    return res.status(403).json(err);
  }
});

//reviewを削除
router.delete("/:id", async (req, res) => {
  try {
    const deletedReview = await Todo.findByIdAndRemove(req.params.id);
    return res.status(200).json(deletedReview);
  } catch (err) {
    return res.status(403).json(err);
  }
});

module.exports = router;
