import { Router } from "express";
import { validateJwtUser } from "../../../commons/middlewares/auth.middleware";
import LikeController from "../controller/like.controller";

export const LikeRouter = ():Router =>{
    const router = Router();
    //Realização de Like
    router.post('/',validateJwtUser,LikeController.createLike);    
    return router;
}