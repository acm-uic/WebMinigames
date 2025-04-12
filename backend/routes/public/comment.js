import { Router } from "express";
import CommentControllers from "../../controllers/comment.js";
import CommentMiddlewares from "../../middlewares/comment.js";

const CommentPublicRoute = Router();
// Get all comments
CommentPublicRoute.get("/getAll", CommentControllers.getAllComment);
// Get all comments in a post
CommentPublicRoute.get(
  "/get/:postId",
  CommentMiddlewares.getCommentsInAPost,
  CommentControllers.getCommentsInAPost
);
export default CommentPublicRoute;
