import { Router } from "express";
import UserMiddlewares from "../../middlewares/user.js";
import UserControllers from "../../controllers/user.js";
import AuthMiddlewares from "../../middlewares/auth.js";
import upload from "../../middlewares/upload.js";

const UserPrivateRoute = Router();

UserPrivateRoute.put(
  "/updateProfile",
  upload.single("avatar"),
  AuthMiddlewares.verifyAccessToken,
  UserMiddlewares.updateProfile,
  UserControllers.updateProfile
);

export default UserPrivateRoute;
