import { Request, Response } from "express";
import { User } from "../../users/entities/user.entity";
import { AppDataSource } from "../../../services/database/app-data-source";
import { Post } from "../entities/post.entity";

class PostController{
    //Criar Post
    async createPost(req: Request, res: Response){
        try {
            const usuarioLogado = res.locals.user as User;
            const {image_url,subtitle} = req.body;

            const post = await AppDataSource.getRepository(Post).save({
                image_url,
                subtitle,
                user_id: +usuarioLogado.id
            });

            return res.status(201).send({ ok: true, post });
            
        } catch (error) {
            console.log(error, "Erro ao publicar Post");
            return res.status(500).send({ ok: false, error: "Erro ao publicar Post" });
        }
    }

}

export default new PostController();