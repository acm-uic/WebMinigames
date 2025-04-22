import { Router } from "express";
import PostMiddlewares from "../../middlewares/post.js";
import PostControllers from "../../controllers/post.js";

const PostPublicRoute = Router();

// Get all posts
PostPublicRoute.get("/getAll", PostControllers.getAllPosts);

PostPublicRoute.get("/get", (req, res, next) => {
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
});

export default PostPublicRoute;
