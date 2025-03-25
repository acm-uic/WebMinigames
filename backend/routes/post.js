import { Router } from "express";
import AuthMiddlewares from "../middlewares/auth.js";
import PostMiddlewares from "../middlewares/post.js";
import PostControllers from "../controllers/post.js";
import upload from "../middlewares/upload.js";

const PostRoute = Router();

// Create post route
PostRoute.post(
  "/create",
  upload.array("files"),
  AuthMiddlewares.verifyAccessToken,
  PostMiddlewares.createUser,
  PostControllers.createPost
);

export default PostRoute;
