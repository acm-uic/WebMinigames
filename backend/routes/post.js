import { Router } from "express";
import AuthMiddlewares from "../middlewares/auth.js";
import PostMiddlewares from "../middlewares/post.js";
import PostControllers from "../controllers/post.js";
import upload from "../middlewares/upload.js";

const PostRoute = Router();

// Create post route
PostRoute.post(
  "/create",
  upload.array("images"),
  AuthMiddlewares.verifyAccessToken,
  PostMiddlewares.createPost,
  PostControllers.createPost
);

PostRoute.put(
  "/updatePost/:postId",
  upload.array("images"),
  AuthMiddlewares.verifyAccessToken,
  PostMiddlewares.updatePost,
  PostControllers.updatePost
);

export default PostRoute;
