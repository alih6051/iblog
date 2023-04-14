const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const PostSchema = Schema(
  {
    title: String,
    category: String,
    summary: String,
    content: String,
    cover: String,
    author: { type: Schema.Types.ObjectId, ref: "user" },
    likes: [{ type: Schema.Types.ObjectId, ref: "user", default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: "comment", default: [] }],
  },
  { versionKey: false, timestamps: true }
);

const PostModel = model("post", PostSchema);

module.exports = { PostModel };
