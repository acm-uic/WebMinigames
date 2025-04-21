import { Router } from "express";
import PostMiddlewares from "../../middlewares/post.js";
import PostControllers from "../../controllers/post.js";

const PostPublicRoute = Router();

// Get all posts
PostPublicRoute.get("/get", PostControllers.getAllPosts);

export default PostPublicRoute;
