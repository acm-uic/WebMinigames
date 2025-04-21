import { Router } from "express";
import PostMiddlewares from "../../middlewares/post.js";
import PostControllers from "../../controllers/post.js";

const PostPublicRoute = Router();

// Get all posts
PostPublicRoute.get("/get", PostControllers.getAllPosts);

// Get posts by userId
PostPublicRoute.get("/user/get/:userId");

// // Get posts by postId
// PostPublicRoute.get("/post/get/:postId");

export default PostPublicRoute;
