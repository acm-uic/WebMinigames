import { Router } from "express";
import UserRoute from "./user.js";
import PostRoute from "./post.js";

// Create a root route and then branching to diff routes
const RootRouteV1 = Router();

// User route
RootRouteV1.use("/users", UserRoute);

// Post route
RootRouteV1.use("/posts", PostRoute);

export { RootRouteV1 };
