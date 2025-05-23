import { Router } from "express";
import UserPublicRoute from "./public/user.js";
import GamePublicRoute from "./public/game.js";
import CommentPublicRoute from "./public/comment.js";
import PostPublicRoute from "./public/post.js";

const PublicRoute = Router();
// User route
PublicRoute.use("/users", UserPublicRoute);
// Post route
PublicRoute.use("/posts", PostPublicRoute);
// Comment route
PublicRoute.use("/comments", CommentPublicRoute);
// Game route
PublicRoute.use("/games", GamePublicRoute);

export { PublicRoute };
