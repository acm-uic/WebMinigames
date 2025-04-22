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
      // Authorized user
      const authorized = authorizeUser(user._id, crrComment.author);
      if (!authorized.success) throw new Error(authorized.message);
      // Only updated the fields that needs changing
      const updatedFields = {};
      if (!body && String(body) !== String(crrComment.body)) {
        updatedFields.body = body;
      }
      // Update comment
      const updatedComment = await CommentModel.findByIdAndUpdate(
        commentId,
        { $set: updatedFields },
        { new: true }
      );
      // Return the updatedComment
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
  getAllComment: async (req, res) => {
    try {
      const admin = req.user?.role === "Admin";

      const commentFilter = admin ? {} : { isDelete: false };

      const listComments = await CommentModel.find(commentFilter);
      if (listComments.length === 0) throw new Error("No comments found!");

      res.status(201).send({
        message: "Here is a list of comments!",
        success: true,
        data: listComments,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  getCommentsInAPost: async (req, res) => {
    try {
      const { postId } = req.params;

      const admin = req.user?.role === "Admin";

      const commentFilter = admin
        ? { postId: postId }
        : { postId: postId, isDelete: false };

      const listComments = await CommentModel.find(commentFilter);

      if (listComments.length === 0) {
        throw new Error("No comments in this post!");
      }

      res.status(201).send({
        message: "Here is a list of comments in this post",
        success: true,
        data: listComments,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  deleteComment: async (req, res) => {
    try {
      const { user } = req;
      const { commentId } = req.params;

      // Get the current post
      const crrComment = await CommentModel.findById(commentId);
      if (!crrComment) throw new Error("Cannot find comment!");

      // Check if the user is authorized to delete post
      const owner = authorizeUser(user._id, crrComment.author);
      const admin = user.role === "Admin";

      if (!owner.success && !admin) {
        throw new Error("Unauthorize to delete comment!");
      }
      // Update + Fetch in parallel
      const commentFilter = admin ? {} : { isDelete: false };

      const [_, listComments] = await Promise.all([
        CommentModel.findByIdAndUpdate(commentId, { isDelete: true }),
        CommentModel.find(commentFilter),
      ]);

      res.status(200).send({
        message: "Comment deleted!",
        success: true,
        data: listComments,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
};

export default CommentControllers;
