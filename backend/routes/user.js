import { Router } from "express";
import UserMiddlewares from "../middlewares/user.js";
import UserControllers from "../controllers/user.js";
import AuthMiddlewares from "../middlewares/auth.js";

const UserRoute = Router();

// Create user route
UserRoute.post(
  "/create",
  UserMiddlewares.createUser,
  UserControllers.createUser
);

UserRoute.post(
  "/signin",
  UserMiddlewares.signinUser,
  UserControllers.signinUser
);

export default UserRoute;
