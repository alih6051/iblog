const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/authenticateToken");
const { PostModel } = require("../models/Post.model");

const PostRouter = express.Router();

PostRouter.get("/", async (req, res) => {
  try {
    const data = await PostModel.find()
      .populate("author", ["name", "email", "avatar_url"])
      .sort({ createdAt: -1 });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong", error: err });
  }
});

PostRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const data = await PostModel.findById({ _id: ID }).populate("author", [
      "name",
      "email",
      "avatar_url",
    ]);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Something went wrong", error: err });
  }
});

PostRouter.post("/create", authenticateToken, async (req, res) => {
  try {
    const post_to_add = new PostModel(req.body);
    await post_to_add.save();
    res.send({ message: "Post created Successfully" });
  } catch (error) {
    console.log(err);
    res.send({ message: "Something went wrong", error: err });
  }
});

PostRouter.patch("/update/:id", authenticateToken, async (req, res) => {
  const ID = req.params.id;
  try {
    const post = await PostModel.find({ _id: ID, author: req.body.author });
    if (post.length > 0) {
      await PostModel.findByIdAndUpdate({ _id: ID }, req.body);
      res.send({ message: "Post updated successfully" });
    } else {
      res.status(405).send({ message: "Method Not Allowed by this User" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong", error: err });
  }
});

PostRouter.delete("/delete/:id", authenticateToken, async (req, res) => {
  const ID = req.params.id;
  try {
    const post = await PostModel.find({ _id: ID, author: req.body.author });
    if (post.length > 0) {
      await PostModel.findByIdAndDelete({ _id: ID });
      res.send({ message: "Post deleted successfully" });
    } else {
      res.status(405).send({ message: "Method Not Allowed by this User" });
    }
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong", error: err });
  }
});

// LIKE POST
PostRouter.put("/likes/:id", authenticateToken, async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    const isLiked = post.likes.filter(
      (user) => user.toString() === req.body.author
    );

    if (isLiked.length == 0) {
      post.likes.unshift(req.body.author);
      await post.save();
      res.send({ msg: "Liked successfully", likes: post.likes });
    } else {
      let removeIndex = post.likes
        .map((user) => user.toString())
        .indexOf(req.body.author);

      post.likes.splice(removeIndex, 1);

      await post.save();
      res.send({ msg: "Unliked successfully", likes: post.likes });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Server error");
  }
});

module.exports = { PostRouter };
