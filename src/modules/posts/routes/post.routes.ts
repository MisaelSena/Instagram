import { Router } from "express";
import { validateCreateUserMiddleware } from "../../users/middlewares/validate-user-creation.middleware";
import PostController from "../controllers/post.controller";
import { validateJwtUser } from "../../../commons/middlewares/auth.middleware";

export const PostRoutes = ():Router =>{
    const router = Router();
    
    //Publicação de Post
    router.post('/create',validateJwtUser,validateCreateUserMiddleware,PostController.createPost);

    return router;
}