import { Router } from "express";
import AuthMiddlewares from "../../middlewares/auth.js";
import GameMiddlewares from "../../middlewares/game.js";
import GameControllers from "../../controllers/game.js";
import upload from "../../middlewares/upload.js";

const GamePrivateRoute = Router();

GamePrivateRoute.post(
  "/create",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "media", maxCount: 10 },
  ]),
  AuthMiddlewares.verifyAdmin,
  GameMiddlewares.createGame,
  GameControllers.createGame
);

export default GamePrivateRoute;
