import { Router } from "express";
import UserMiddlewares from "../../middlewares/user.js";
import UserControllers from "../../controllers/user.js";
import upload from "../../middlewares/upload.js";

const UserPublicRoute = Router();

// Create user route
UserPublicRoute.post(
  "/create",
  upload.single("avatar"),
  UserMiddlewares.createUser,
  UserControllers.createUser
);

UserPublicRoute.post(
  "/signin",
  UserMiddlewares.signinUser,
  UserControllers.signinUser
);

export default UserPublicRoute;
