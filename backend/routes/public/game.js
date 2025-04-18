import { Router } from "express";
import GameControllers from "../../controllers/game.js";
import GameMiddlewares from "../../middlewares/game.js";

const GamePublicRoute = Router();
// Get all the games
GamePublicRoute.get("/get", GameControllers.getAllGames);
// Get game by its ID
GamePublicRoute.get(
  "/get/:gameId",
  GameMiddlewares.getGameById,
  GameControllers.getGameById
);

export default GamePublicRoute;
