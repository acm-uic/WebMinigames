import PostModel from "../models/post.js";
import CommentModel from "../models/comment.js";
import { authorizeUser } from "../utils/authorize.js";

const CommentControllers = {
  createComment: async (req, res) => {
    try {
      // Get postId, body, and user transferred from req
      const { postId } = req.params;
      const { body } = req.body;
      const { user } = req;
      // Find post from postId
      const crrPost = await PostModel.findById(postId);
      //   If cannot find, throw an error
      if (!crrPost) throw new Error("Cannot not find post!");
      // Create a new comment
      const newComment = await CommentModel.create({
        author: user._id,
        postId,
        body,
      });
      // Send out the new comment and the userName of the author
      res.status(201).send({
        message: "Comment created successfully!",
        success: true,
        data: {
          ...newComment.toObject(),
          userName: user.userName,
        },
      });
    } catch (error) {
      res.status(404).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  updateComment: async (req, res) => {
    try {
      // Get commentId, body, and user transferred from req
      const { commentId } = req.params;
      const { body } = req.body;
      const { user } = req;
      // Find comment from the commentId
      const crrComment = await CommentModel.findById(commentId);
      if (!crrComment) throw new Error("Cannot find comment!");

      const authorized = authorizeUser(user._id, crrComment.author);
      if (!authorized.success) throw new Error(authorized.message);

      const updatedFields = [];

      if (!body && String(body) !== String(crrComment.body)) {
        updatedFields.body = body;
      }

      const updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        { $set: updatedFields },
        { new: true }
      );

      res.status(200).send({
        message: "Comment updated successfully!",
        success: true,
        data: updatedComment,
      });
    } catch (error) {
      res.status(404).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
};

export default CommentControllers;
