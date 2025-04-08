import { Router } from "express";
import AuthMiddlewares from "../middlewares/auth.js";
import CommentMiddlewares from "../middlewares/comment.js";
import CommentControllers from "../controllers/comment.js";

const CommentRoute = Router();

// Create comment
CommentRoute.post(
  "/create/:postId",
  AuthMiddlewares.verifyAccessToken,
  CommentMiddlewares.createComment,
  CommentControllers.createComment
);

export default CommentRoute;
