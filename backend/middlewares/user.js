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
  updateProfile: (req, res, next) => {
    try {
      const { userName, email, bio, role } = req.body;
      const avatar = req.file;

      // If the user doesn't update anything
      if (!(userName || email || avatar || bio || role)) {
        throw new Error("Please enter an updated field!");
      }

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  getUserInfo: (req, res, next) => {
    try {
      const { userId } = req.params;
      if (!userId) throw new Error("Please enter userId!");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  likeGame: (req, res, next) => {
    try {
      // Get the game name
      const { game } = req.body;
      // Give an error if missing any information
      if (!game) throw new Error("Please enter game!");

      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        success: false,
        data: null,
      });
    }
  },
  addInterest: (req, res, next) => {
    try {
      // Get the interest
      const { interest } = req.body;
      // Give an error if missing any information
      if (!interest) throw new Error("Please enter interest!");

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
