const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const SavedSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "user" },
    saved_posts: [{ type: Schema.Types.ObjectId, ref: "post", default: [] }],
  },
  { versionKey: false }
);

const SavedModel = model("saved", SavedSchema);

module.exports = { SavedModel };
