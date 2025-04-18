import { Router } from "express";
import AuthMiddlewares from "../middlewares/auth.js";
import { PublicRoute } from "./public.js";
import { PrivateRoute } from "./private.js";

// Create a root route and then branching to diff routes
const RootRouteV1 = Router();

// Public routes
RootRouteV1.use("/public", PublicRoute);

// For every router after this, need to verify user first
RootRouteV1.use(AuthMiddlewares.verifyAccessToken);

RootRouteV1.use("/private", PrivateRoute);

export { RootRouteV1 };
