import { Router } from "express";
import CommentControllers from "../../controllers/comment.js";

const CommentPublicRoute = Router();

CommentPublicRoute.get("/getAll", CommentControllers.getAllComment);

export default CommentPublicRoute;
