import { Router } from "express";
import PostMiddlewares from "../../middlewares/post.js";
import PostControllers from "../../controllers/post.js";

const PostPublicRoute = Router();

// Get all posts
PostPublicRoute.get("/getAll", PostControllers.getAllPosts);

// Get posts by userId
PostPublicRoute.get(
  "/get",
  (req, res, next) => {
    if (req.query.userId) return PostMiddlewares.getPostsByUser(req, res, next);
    return next();
  },
  PostControllers.getPostsByUserId
);

// // Get posts by postId
// PostPublicRoute.get("/post/get/:postId");

export default PostPublicRoute;
