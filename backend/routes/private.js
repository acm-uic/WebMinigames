import { Router } from "express";
import UserPrivateRoute from "./private/user.js";
import PostPrivateRoute from "./private/post.js";
import CommentPrivateRoute from "./private/comment.js";
import GamePrivateRoute from "./private/game.js";

const PrivateRoute = Router();

// User route
PrivateRoute.use("/users", UserPrivateRoute);
// Post route
PrivateRoute.use("/posts", PostPrivateRoute);
// Comment route
PrivateRoute.use("/comments", CommentPrivateRoute);
// Game route
PrivateRoute.use("/games", GamePrivateRoute);

export { PrivateRoute };
