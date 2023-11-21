import { Router } from "express";
import PostController from "../controllers/post.controller";
import { validateJwtUser } from "../../../commons/middlewares/auth.middleware";
import { validateCreatePost } from "../middleware/validate-create-post.middleware";

export const PostRoutes = ():Router =>{
    const router = Router();
    
    //Publicação de Post
    router.post('/create',validateJwtUser,validateCreatePost,PostController.createPost);
    //Lista Posts do Usuário Logado
    router.get('/myposts',validateJwtUser,PostController.listMyPosts);
    //Lista Posts de Amigo
    router.get('/:friend_id',validateJwtUser,PostController.listPostsUserFriend);

    return router;
}