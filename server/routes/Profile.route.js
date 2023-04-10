const express = require("express");
const { authenticateToken } = require("../middleware/authenticateToken");
const { UserModel } = require("../models/User.model");
const { PostModel } = require("../models/Post.model");

const ProfileRouter = express.Router();

// GET PROFILE  DATA
ProfileRouter.get("/", authenticateToken, async (req, res) => {
  const userID = req.body.author;
  try {
    const user = await UserModel.findById({ _id: userID });
    const posts = await PostModel.find({ author: userID }).sort({
      createdAt: -1,
    });
    res.send({ user, posts });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something went wrong", error });
  }
});

// GET PROFILE LIST DATA
ProfileRouter.get("/list", authenticateToken, async (req, res) => {
  const userID = req.body.author;
  try {
    const user = await UserModel.findById({ _id: userID }).populate({
      path: "saved_posts",
      populate: { path: "author" },
    });

    res.send({
      user: { name: user.name, email: user.email, avatar_url: user.avatar_url },
      saved_posts: user.saved_posts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something went wrong", error });
  }
});

// GET OTHER USER PROFILE
ProfileRouter.get("/:email", async (req, res) => {
  const userEmail = req.params.email;
  try {
    const user = await UserModel.findOne({ email: userEmail });
    const posts = await PostModel.find({ author: user._id }).sort({
      createdAt: -1,
    });
    res.send({ user, posts });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something went wrong", error });
  }
});

// DELETE USER POST
ProfileRouter.delete(
  "/delete-post/:post_id",
  authenticateToken,
  async (req, res) => {
    const userID = req.body.author;
    const postID = req.params.post_id;
    try {
      const post = await PostModel.findById({ _id: postID });
      if (userID == post.author) {
        await PostModel.findByIdAndDelete({ _id: postID });
        const posts = await PostModel.find({ author: userID }).sort({
          createdAt: -1,
        });
        res.send(posts);
      } else {
        res.status(401).send({ message: "Authorization failed" });
      }
    } catch (error) {
      res.status(400).send({ message: "Internal server error", error: error });
    }
  }
);

module.exports = { ProfileRouter };
