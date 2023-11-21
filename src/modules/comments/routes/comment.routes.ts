import { Router } from "express";
import { validateJwtUser } from "../../../commons/middlewares/auth.middleware";
import { validateComment } from "../middlewares/comment-validate.middleware";
import CommentController from "../controllers/comment.controller";

export const CommentRouter = ():Router =>{
    const router = Router();
    //Realização de comentário
    router.post('/create',validateJwtUser,validateComment,CommentController.createComment);
    
    return router;
}