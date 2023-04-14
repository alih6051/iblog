const express = require("express");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../middleware/authenticateToken");
const { PostModel } = require("../models/Post.model");
const { UserModel } = require("../models/User.model");
const { CommentModel } = require("../models/Comment.model");

const PostRouter = express.Router();

// @route    GET posts/
// @desc     Get all posts
// @access   Public
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

// @route    GET posts/:id
// @desc     Get single post by id
// @access   Public
PostRouter.get("/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    const data = await PostModel.findById({ _id: ID })
      .populate("author", ["name", "email", "avatar_url"])
      .populate("comments");
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(400).send({ message: "Something went wrong", error: err });
  }
});

// @route    POST posts/create/
// @desc     Create a post
// @access   Private
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

// @route    PATCH posts/update/:id
// @desc     Update a post
// @access   Private
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

// @route    DELETE posts/delete/:id
// @desc     Delete a post
// @access   Private
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

// @route    PUT posts/likes/:id
// @desc     Like a post
// @access   Private
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

// @route    POST posts/comments/:id
// @desc     Comment a post
// @access   Private
PostRouter.post("/comments/:id", authenticateToken, async (req, res) => {
  try {
    // GET POST AND USER
    const post = await PostModel.findById(req.params.id).populate("comments");
    const user = await UserModel.findById(req.body.author);

    // CHECK IF POST ID IS VAILD
    if (!post) return res.status(404).send("Post not found");

    // CREATE COMMENT
    const comment = new CommentModel({
      user: user._id,
      text: req.body.text,
      name: user.name,
      avatar_url: user.avatar_url,
    });

    // SAVE COMMENT
    await comment.save();

    // ADD COMMENT TO POST
    post.comments.unshift(comment);
    await post.save();

    res.send({ msg: "Comment added successfully", comments: post.comments });
  } catch (error) {
    console.log(error);
    res.status(400).send("Internal Server error");
  }
});

// @route    DELETE posts/comments/:id
// @desc     Delete a comment from post
// @access   Private
PostRouter.delete(
  "/comments/:id/:comment_id",
  authenticateToken,

  async (req, res) => {
    try {
      // GET POST AND USER
      const post = await PostModel.findById(req.params.id).populate("comments");
      const comment = await CommentModel.findById(req.params.comment_id);

      // CHECKING IF COMMENT ID IS CORRECT
      if (!comment) return res.status(404).send("Invaild comment id.");

      // CHECKING IF USER IS SAME
      if (req.body.author != comment.user.toString())
        return res.status(401).send("Authorization failed.");

      // REMOVE COMMENT FROM POST
      await CommentModel.findByIdAndDelete(req.params.comment_id);

      const removeIndex = post.comments
        .map((comment) => comment._id.toString())
        .indexOf(req.params.comment_id);

      if (removeIndex < 0) return res.status(404).send("Invaild comment id.");
      post.comments.splice(removeIndex, 1);

      // SAVE POST
      await post.save();

      res.send({
        msg: "Comment deleted successfully.",
        comments: post.comments,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send("Internal Server error.");
    }
  }
);

// @route    POST posts/comments/replies/:id
// @desc     Reply to a comment
// @access   Private
PostRouter.post(
  "/comments/replies/:id",
  authenticateToken,
  async (req, res) => {
    try {
      // GET COMMENT AND USER
      const comment = await CommentModel.findById(req.params.id).populate(
        "replies"
      );
      const user = await UserModel.findById(req.body.author);

      if (!comment) return res.status(404).send("Invaild comment id.");

      // CREATE REPLY
      let newReply = {
        user: user._id,
        text: req.body.text,
        name: user.name,
        avatar_url: user.avatar_url,
      };

      comment.replies.unshift(newReply);

      // SAVE COMMENT
      await comment.save();

      res.send({
        msg: "Reply added successfully",
        replies: comment.replies,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send("Internal Server error");
    }
  }
);

// @route    DELETE posts/comments/replies/:id
// @desc     Delete a reply from a comment
// @access   Private
PostRouter.delete(
  "/comments/replies/:id/:reply_id",
  authenticateToken,

  async (req, res) => {
    try {
      // GET COMMENT AND USER
      const comment = await CommentModel.findById(req.params.id);

      // CHECKING IF COMMENT ID IS CORRECT
      if (!comment) return res.status(404).send("Invaild comment id.");

      // REMOVE REPLY FROM COMMENT
      const removeIndex = comment.replies
        .map((reply) => reply._id.toString())
        .indexOf(req.params.reply_id);

      // CHECKING IF REPLY EXISTS
      if (removeIndex < 0) return res.status(404).send("Invaild reply id.");

      // CHECKING IF USER IS SAME
      if (comment.replies[removeIndex].user != req.body.author)
        return res.status(401).send("Authorization failed.");

      comment.replies.splice(removeIndex, 1);

      // SAVE COMMENT
      await comment.save();

      res.send({
        msg: "Reply deleted successfully.",
        replies: comment.replies,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send("Internal Server error.");
    }
  }
);

module.exports = { PostRouter };
