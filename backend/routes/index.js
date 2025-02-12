import { Router } from "express";
import UserRoute from "./user.js";

// Create a root route and then branching to diff routes
const RootRouteV1 = Router();

// User route
RootRouteV1.use("/users", UserRoute);

export { RootRouteV1 };
