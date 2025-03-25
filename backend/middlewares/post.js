const PostMiddlewares = {
  // A middleware for creating a new post
  createUser: (req, res, next) => {
    try {
      const { title, body } = req.body;
      //   Throw error if missing title or body
      if (!title) throw new Error("Please enter post title!");
      if (!body) throw new Error("Please enter post body!");

      return next();
    } catch (error) {
      res.status(403).send({
        message: error.message,
        success: false,
        data: null,
        error,
      });
    }
  },
};
