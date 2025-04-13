import { Router } from "express";
import UserPublicRoute from "./public/user.js";
import GamePublicRoute from "./public/game.js";

const PublicRoute = Router();
// User route
PublicRoute.use("/users", UserPublicRoute);
// Game route
PublicRoute.use("/games", GamePublicRoute);

export { PublicRoute };
