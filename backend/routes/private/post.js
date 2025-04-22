import { Router } from "express";
import PostMiddlewares from "../../middlewares/post.js";
import PostControllers from "../../controllers/post.js";
import upload from "../../middlewares/upload.js";

const PostPrivateRoute = Router();

// Create post route
PostPrivateRoute.post(
  "/create",
  upload.array("images"),
  PostMiddlewares.createPost,
  PostControllers.createPost
);

PostPrivateRoute.put(
  "/updatePost/:postId",
  upload.array("images"),
  PostMiddlewares.updatePost,
  PostControllers.updatePost
);

PostPrivateRoute.delete(
  "/delete/:postId",
  PostMiddlewares.deletePost,
  PostControllers.deletePost
);

export default PostPrivateRoute;
