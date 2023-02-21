const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/authenticateToken");
const { PostModel } = require("../models/Post.model");
const { SavedModel } = require("../models/Saved.model");

const PostRouter = express.Router();

PostRouter.get("/", async (req, res) => {
  try {
    const data = await PostModel.find().populate("author", [
      "name",
      "email",
      "avatar_url",
    ]);

    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ message: "Something went wrong", error: err });
  }
});

// SAVED POSTS
PostRouter.get("/saved/:id", authenticateToken, async (req, res) => {
  const userID = req.body.author;
  const ID = req.params.id;
  try {
    let user = await SavedModel.findOne({ user: userID });
    if (!user) {
      const new_user = new SavedModel({
        user: userID,
        saved_posts: [ID],
      });
      await new_user.save();
    } else {
      let { saved_posts } = user;

      if (!saved_posts.includes(ID)) {
        saved_posts.push(ID);
      } else {
        saved_posts.splice(saved_posts.indexOf(ID), 1);
      }

      await SavedModel.findByIdAndUpdate(
        { _id: user._id },
        { saved_posts: saved_posts }
      );
    }

    res.send({ message: "Saved" });
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

module.exports = { PostRouter };
