const UserMiddlewares = {
  // A middleware for the create user function
  createUser: (req, res, next) => {
    try {
      // Get the information from the user
      const { userName, email, password } = req.body;

      // Give an error if missing any information
      if (!userName) throw new Error("Please enter userName!");
      if (!email) throw new Error("Please enter email!");
      if (!password) throw new Error("Please enter password!");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  // A middleware for the signing in user function
  signinUser: (req, res, next) => {
    try {
      // Get the information from the user
      const { email, password } = req.body;

      // Give an error if missing any information
      if (!email) throw new Error("Please enter email!");
      if (!password) throw new Error("Please enter password!");

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

export default UserMiddlewares;
