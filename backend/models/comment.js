import mongoose from "mongoose";
import Collections from "../database/collections.js";

const CommentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Collections.users,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: Collections.posts,
    },
    body: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
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

const CommentModel = mongoose.model(Collections.comments, CommentSchema);
export default CommentModel;
