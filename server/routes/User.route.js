const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");
const { SavedModel } = require("../models/Saved.model");
const { authenticateToken } = require("../middleware/authenticateToken");
var jwt = require("jsonwebtoken");

const UserRouter = express.Router();

// REGISTER
UserRouter.post("/register", async (req, res) => {
  const { name, avatar_url, email, password } = req.body;
  try {
    bcrypt.hash(password, 3, async (err, hash) => {
      const user_to_add = new UserModel({
        name,
        avatar_url,
        email,
        password: hash,
      });
      await user_to_add.save((err) => {
        // CHECKING IS EMAIL UNIQUE
        if (err) {
          res.status(400).send({ message: "Email already exists" });
        } else {
          res.send({ message: "Account created" });
        }
      });
    });
  } catch (error) {
    res.send({ message: "Something went wrong" });
    console.log(error);
  }
});

// LOGIN
UserRouter.post("/login", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          // CREATING TOKEN
          const token = jwt.sign(
            { userID: user[0]._id },
            process.env.JWT_SECRET_KEY
          );

          const saved_posts = await SavedModel.findOne({ user: user[0]._id });
          res.send({
            name: user[0].name,
            avatar_url: user[0].avatar_url,
            email: user[0].email,
            saved: user[0].saved,
            token: token,
            saved_posts: saved_posts.saved_posts,
          });
        } else {
          res.status(400).send({ message: "Wrong Credntials" });
        }
      });
    } else {
      res.status(400).send({ message: "Email id not registered" });
    }
  } catch (error) {
    res.status(400).send({ message: "Something went wrong" });
    console.log(error);
  }
});

module.exports = { UserRouter };
