const router = require("express").Router();
const Todo = require("../models/Todo");
// const Review = require("../models/Review");

//CRUD
//reviewを取得
router.get("/", async (req, res) => {
  try {
    const now = new Date();
    const review = await Todo.find({
      status: "review",
      nextReviewDate: { $lt: now },
    });
    return res.status(200).json(review);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//reviewを更新
router.put("/:id/complete", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    //忘却曲線
    const intervals = [
      60 * 60 * 1000, //1時間後
      24 * 60 * 60 * 1000, //1日後
      7 * 24 * 60 * 60 * 1000, //1週間後
      14 * 24 * 60 * 60 * 1000, //2週間後
      30 * 24 * 60 * 60 * 1000, //1ヶ月後
    ];

    //テスト用
    // const intervals = [
    //   0.01 * 60 * 1000,
    //   0.02 * 60 * 1000,
    //   0.03 * 60 * 1000,
    //   0.04 * 60 * 1000,
    //   0.05 * 60 * 1000,
    //   0.06 * 60 * 1000,
    // ];
    if (!todo.reviewCount) {
      todo.reviewCount = 0;
    }

    if (todo.reviewCount < intervals.length) {
      todo.nextReviewDate = new Date(
        new Date().getTime() + intervals[todo.reviewCount]
      );
      todo.reviewCount++;
    } else {
      todo.status = "complete";
      const savedTodo = await todo.save();
      return res.status(200).json(savedTodo);
    }

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
