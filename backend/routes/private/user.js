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

UserPrivateRoute.post(
  "/likeGame",
  AuthMiddlewares.verifyAccessToken,
  UserMiddlewares.likeGame,
  UserControllers.likeGame
);

UserPrivateRoute.post(
  "/addInterest",
  AuthMiddlewares.verifyAccessToken,
  UserMiddlewares.addInterest,
  UserControllers.addInterest
);

UserPrivateRoute.delete(
  "/unlikeGame",
  AuthMiddlewares.verifyAccessToken,
  UserMiddlewares.unlikeGame,
  UserControllers.unlikeGame
);

UserPrivateRoute.delete(
  "/removeInterest",
  AuthMiddlewares.verifyAccessToken,
  UserMiddlewares.removeInterest,
  UserControllers.removeInterest
);

export default UserPrivateRoute;
