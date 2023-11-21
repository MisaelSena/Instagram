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
    async removeComment(req: Request, res: Response){
            try {
                const usuarioLogado = res.locals.user as User;
                const {comment_id} = req.body;
                const comment = await AppDataSource.getRepository(Comment).findOne({where:{id:+comment_id}});
                                
                if(usuarioLogado.id != comment?.user_id){                    
                    return res.status(403).json({ok:false,message:"Você não tem permissão para remover este comentário!"})
                }
                
                await AppDataSource.getRepository(Comment).softRemove(comment);

                return res.status(200).json({ ok: true,message:"Comentário deletado com sucesso!"});
            } catch (error) {
                res.status(500).send({ ok: false, error: "Erro ao deletar comentário!" });
            }
    }

}

export default new CommentController();