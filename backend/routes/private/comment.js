import { Router } from "express";
import CommentMiddlewares from "../../middlewares/comment.js";
import CommentControllers from "../../controllers/comment.js";

const CommentPrivateRoute = Router();

// Create comment
CommentPrivateRoute.post(
  "/create/:postId",
  CommentMiddlewares.createComment,
  CommentControllers.createComment
);

CommentPrivateRoute.put(
  "/updateComment/:commentId",
  CommentMiddlewares.updateComment,
  CommentControllers.updateComment
);

CommentPrivateRoute.delete(
  "/delete/:commentId",
  CommentMiddlewares.deleteComment,
  CommentControllers.deleteComment
);

export default CommentPrivateRoute;
