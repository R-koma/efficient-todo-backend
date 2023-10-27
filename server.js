const express = require("express");
const app = express();
const todoRoute = require("./routes/todo");
const reviewRoute = require("./routes/review");

const PORT = 5005;
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DBと接続中・・・");
  })
  .catch((err) => {
    console.log(err);
  });

// app.use(express.json());
// app.use("/api/todo", todoRoute);
// app.use("/api/review", reviewRoute);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.listen(PORT, () => console.log("サーバーが起動しました"));
