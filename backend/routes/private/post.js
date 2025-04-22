import { Router } from "express";
import PostMiddlewares from "../../middlewares/post.js";
import PostControllers from "../../controllers/post.js";
import upload from "../../middlewares/upload.js";
import AuthMiddlewares from "../../middlewares/auth.js";

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

// Get all posts
PostPrivateRoute.get(
  "/admin/getAll",
  AuthMiddlewares.verifyAdmin,
  PostControllers.getAllPosts
);

PostPrivateRoute.get(
  "/admin/get",
  AuthMiddlewares.verifyAdmin,
  (req, res, next) => {
    // Get posts by userId
    if (req.query.userId) {
      return PostMiddlewares.getPostsByUser(req, res, () =>
        PostControllers.getPostsByUser(req, res)
      );
    }
    // Get post by postId
    if (req.query.postId) {
      return PostMiddlewares.getPostById(req, res, () =>
        PostControllers.getPostById(req, res)
      );
    }

    res.status(400).json({
      success: false,
      message: "Missing query: please provide either userId or postId",
    });
  }
);

export default PostPrivateRoute;
