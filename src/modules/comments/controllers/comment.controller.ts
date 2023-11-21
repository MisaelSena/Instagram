import { Request, Response } from "express";
import { User } from "../../users/entities/user.entity";
import { AppDataSource } from "../../../services/database/app-data-source";
import { Comment } from "../entities/comment.entity";

class CommentController{
    async createComment(req: Request, res: Response){
        try {
            const usuarioLogado = res.locals.user as User;
            const {text, post_id} = req.body;
            
            const comment = await AppDataSource.getRepository(Comment).save({
                text,
                post_id,
                user_id:+usuarioLogado.id
            })
            return res.status(201).json({ ok: true, comentario:comment });
        } catch (error) {
            console.log(error, "Erro ao publicar Comentário");
            return res.status(500).send({ ok: false, error: "Erro ao publicar Comentário" });
        }
    }

}

export default new CommentController();