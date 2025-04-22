const PostMiddlewares = {
  // A middleware for creating a new post
  createPost: (req, res, next) => {
    try {
      const { title, body } = req.body;
      //   Throw error if missing title or body
      if (!title) throw new Error("Please enter post title!");
      if (!body) throw new Error("Please enter post body!");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
        error,
      });
    }
  },
  // A middleware for update post
  updatePost: (req, res, next) => {
    try {
      const { title, body } = req.body;
      const { postId } = req.params;
      const listFile = req.files;

      if (!postId) throw new Error("Please enter postId!");
      // Throw error if the user doesn't update anything
      if (!title && !body && !listFile) {
        throw new Error("Please enter an updated field!");
      }

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
        error,
      });
    }
  },
  getPostsByUser: (req, res, next) => {
    try {
      const { userId } = req.query;
      if (!userId) throw new Error("Please enter userId");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
        error,
      });
    }
  },
  getPostById: (req, res, next) => {
    try {
      const { postId } = req.query;
      if (!postId) throw new Error("Please enter postId");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
        error,
      });
    }
  },
  deletePost: (req, res, next) => {
    try {
      const { postId } = req.query;
      if (!postId) throw new Error("Please enter postId");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
        error,
      });
    }
  },
};

export default PostMiddlewares;
