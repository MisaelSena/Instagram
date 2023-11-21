import { Request, Response } from "express";
import { User } from "../../users/entities/user.entity";
import { AppDataSource } from "../../../services/database/app-data-source";
import { Like } from "../../likes/entities/like.entity";

class LikeController{
    async createLike(req: Request, res: Response){
        try {
            const usuarioLogado = res.locals.user as User;

            const {post_id} = req.body;

            const validacaoLike = await AppDataSource.getRepository(Like).findOne({
                    where:{
                        post_id,
                        user_id:+usuarioLogado.id
                    }
            })

            if(validacaoLike){
                if (validacaoLike.like) {
                    validacaoLike.like = false;
                    await AppDataSource.getRepository(Like).save(validacaoLike);
                    return res.status(201).json({ ok: true, message:"Você descurtiu a publicação!" });
                } else {
                    validacaoLike.like = true;
                    await AppDataSource.getRepository(Like).save(validacaoLike);
                    return res.status(201).json({ ok: true, message:"Você curtiu a publicação!" });
                }               
                
            }

            const like = await AppDataSource.getRepository(Like).save({
                user_id:usuarioLogado.id,
                post_id,
                like:true
            })
            return res.status(201).json({ ok: true, message:"Você curtiu o a publicação!" });
        } catch (error) {
            console.log(error, "Erro ao curtir post");
            return res.status(500).send({ ok: false, error: "Erro ao curtir post" });
        }
    }    
}

export default new LikeController();