const GameMiddlewares = {
  createGame: (req, res, next) => {
    try {
      const { gameName, description } = req.body;

      if (!gameName) throw new Error("Please enter gameName");
      if (!description) throw new Error("Please enter game description");

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
  getGameById: (req, res, next) => {
    try {
      const { gameId } = req.params;

      if (!gameId) throw new Error("Please enter gameId!");

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

export default GameMiddlewares;
