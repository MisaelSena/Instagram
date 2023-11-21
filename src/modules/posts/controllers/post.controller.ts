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
    //Listar posts do usuário logado
    async listMyPosts(req: Request, res: Response){
        try {
            const usuarioLogado = res.locals.user as User;
            const myPosts = await AppDataSource.getRepository(Post).find({where:{user_id:+usuarioLogado.id}})

            if(!myPosts){return res.status(200).json({ok:true, myPosts: "Você não possui posts!"});}

            return res.status(200).json({ok:true, myPosts: myPosts});
        } catch (error) {
            console.log(error, "Erro ao Listar Posts do usuário logado");
            return res.status(500).send({ ok: false, error: "Erro ao Listar Posts do usuário logado" });
        }

    }
    //Mostrar as publicações dos usuários que o usuário atual segue
    async listPostsUserFriend(req: Request, res: Response){
        try {            
            const {friend_id} = req.params;
            const userFriend = await AppDataSource.getRepository(User).find({where:{id:+friend_id}});

            if(!userFriend){return res.status(404).json({ok:false, message: "Amigo não encontrado!"});}

            const friendPosts = await AppDataSource.getRepository(Post).find({where:{user_id:+friend_id}})

            if(!friendPosts){return res.status(200).json({ok:true, message: "Seu amigo não possui posts!"});}

            return res.status(200).json({ok:true, Posts: friendPosts});
        } catch (error) {
            console.log(error, "Erro ao Listar Posts do usuário");
            return res.status(500).send({ ok: false, error: "Erro ao Listar Posts do usuário" });
        }    
    }

    //Listagem de todas as publicações
    async listAllPosts(req: Request, res: Response){
        try {
            const allPosts = await AppDataSource.getRepository(Post).find();

            return res.status(200).json({ok:true, Posts: allPosts});
        } catch (error) {
            console.log(error, "Erro ao Listar Posts");
            return res.status(500).send({ ok: false, error: "Erro ao Listar Posts" });
        }
        

    }

}

export default new PostController();