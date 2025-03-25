import mongoose from "mongoose";
import Collections from "../database/collections.js";

const PostSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model(Collections.posts, PostSchema);
export default PostModel;
