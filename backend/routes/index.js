import { Router } from "express";
import UserRoute from "./user.js";
import PostRoute from "./post.js";
import CommentRoute from "./comment.js";
import GameRoute from "./game.js";

// Create a root route and then branching to diff routes
const RootRouteV1 = Router();

// User routes
RootRouteV1.use("/users", UserRoute);

// Post route
RootRouteV1.use("/posts", PostRoute);

// Comment route
RootRouteV1.use("/comments", CommentRoute);

// Game route
RootRouteV1.use("/games", GameRoute);

export { RootRouteV1 };
