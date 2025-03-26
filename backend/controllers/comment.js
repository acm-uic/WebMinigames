import PostModel from "../models/post.js";
import CommentModel from "../models/comment.js";

const CommentControllers = {
  createComment: async (req, res) => {
    try {
      // Get postId, body, and user transferred from req
      const { postId, body } = req.body;
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
};

export default CommentControllers;
