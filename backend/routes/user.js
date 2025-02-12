import { Router } from "express";
import UserMiddlewares from "../middlewares/user.js";
import UserControllers from "../controllers/user.js";

const UserRoute = Router();

// Create user route
UserRoute.post(
  "/create",
  UserMiddlewares.createUser,
  UserControllers.createUser
);

export default UserRoute;
