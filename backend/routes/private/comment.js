import { Router } from "express";
import CommentMiddlewares from "../../middlewares/comment.js";
import CommentControllers from "../../controllers/comment.js";
import AuthMiddlewares from "../../middlewares/auth.js";

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

CommentPrivateRoute.get(
  "/admin/getAll",
  AuthMiddlewares.verifyAdmin,
  CommentControllers.getAllComment
);

CommentPrivateRoute.get(
  "/admin/get/postId",
  AuthMiddlewares.verifyAdmin,
  CommentMiddlewares.getCommentsInAPost,
  CommentControllers.getCommentsInAPost
);

export default CommentPrivateRoute;
