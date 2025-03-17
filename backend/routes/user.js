import { Router } from "express";
import UserMiddlewares from "../middlewares/user.js";
import UserControllers from "../controllers/user.js";
import AuthMiddlewares from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const UserRoute = Router();

// Create user route
UserRoute.post(
  "/create",
  upload.single("avatar"),
  UserMiddlewares.createUser,
  UserControllers.createUser
);

UserRoute.post(
  "/signin",
  UserMiddlewares.signinUser,
  UserControllers.signinUser
);

UserRoute.put(
  "/updateProfile",
  AuthMiddlewares.validateToken,
  UserControllers.updateProfile
);

export default UserRoute;
