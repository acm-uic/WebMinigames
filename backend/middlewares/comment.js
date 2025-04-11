const CommentMiddlewares = {
  // Middleware for creating a comment
  createComment: (req, res, next) => {
    try {
      // Ask for postId and comment body
      const { postId } = req.params;
      const { body } = req.body;
      // If lack either, throw an error
      if (!postId) throw new Error("Please enter postId!");
      if (!body) throw new Error("Please enter your comment!");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  updateComment: (req, res, next) => {
    try {
      const { body } = req.body;
      const { commentId } = req.params;

      if (!commentId) throw new Error("Please enter commentId on the params!");
      if (!body) throw new Error("Please enter your comment!");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
};

export default CommentMiddlewares;
