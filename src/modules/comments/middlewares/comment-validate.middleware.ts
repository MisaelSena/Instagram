import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../../services/database/app-data-source";
import { Post } from "../../posts/entities/post.entity";

export const validateComment = (req: Request, res:Response, next: NextFunction)=>{

        const {text,post_id} = req.body;
        const post = AppDataSource.getRepository(Post).find({where:{id:+post_id}});

        if(!post){return res.status(404).json({ ok: false, error: "Post não Existe!"});}

        if(!text){return res.status(400).json({ ok: false, error: "Comentário não informado!"});}

        next();
}