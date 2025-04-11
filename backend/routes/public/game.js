import { Router } from "express";
import GameControllers from "../../controllers/game.js";

const GamePublicRoute = Router();

GamePublicRoute.get("/get", GameControllers.getAllGames);

export default GamePublicRoute;
