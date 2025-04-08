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
      const listFile = req.files;
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
};

export default PostMiddlewares;
