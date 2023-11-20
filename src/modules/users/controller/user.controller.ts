import { Request, Response } from "express";
import { AppDataSource } from "../../../services/database/app-data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController{
    //Create
    async  createUser(req: Request, res: Response) {
        const {name, email, password, bio} = req.body;

        try {
            await AppDataSource.getRepository(User).save({
                name,
                email,
                password_hash: bcrypt.hashSync(password,8),
                bio
            });

            return res.status(201).json({ ok: true, message: "Usuário criado com sucesso" });
        } catch (error) {
            console.log(error, "Erro ao criar usuário");
            return res.status(400).json({ message: "Erro ao criar usuário" });
        }
    }

    //Read All Users
    async listUsers(req: Request, res: Response) {
        try {

          const users = await AppDataSource.getRepository(User).find({
            select: ["id", "name", "bio", "count_seguidores", "count_seguindo"],
          });

          return res.status(200).json({ ok: true, users });

        } catch (error) {

          console.log(error, "Erro ao Listar Usuários!");
          return res.status(400).json({ message: "Erro ao Listar Usuários!" });
        }
      }
    //Read Only one User 
    async listOnlyOneUser(req: Request, res: Response) {
        try {
          const user = await AppDataSource.getRepository(User).findOne({
            select: ["id", "name", "bio", "count_seguidores", "count_seguindo"],
            where: { id: +req.params.user_id },
          });

          if(!user){return res.status(404).send({ ok: false, error: "Usuário não encontrado" });}

          return res.status(200).json({ ok: true, user });

        } catch (error) {
          console.log(error, "Erro ao listar usuário");
          res.status(500).send({ ok: false, error: "Erro ao listar usuário" });
        }
      }
    //Update user
    async updateUser(req: Request, res: Response){
      const {name, bio} = req.body;
      try {
        const user = await AppDataSource.getRepository(User).findOne({where:{id: +req.params.user_id}});

        if (!user) {return res.status(404).send({ok: false, error: "Usuário não encontrado" })}

        if (name) {user.name = name}
        if (bio) {user.bio = bio}

        await AppDataSource.getRepository(User).save(user);

        return res.status(200).json({ ok: true,message:"Usuário atualizado", user })
      } catch (error) {
        res.status(500).send({ ok: false, error: "Erro ao atualizar usuário!" });
      }
    }
    //Delete User
    async deleteUser(req: Request, res: Response){
      try {
        const user = await AppDataSource.getRepository(User).findOne({where:{id: +req.params.user_id}});
        
        if (!user) {return res.status(404).send({ok: false, error: "Usuário não encontrado" })}

        await AppDataSource.getRepository(User).softRemove(user);
        console.log(`User ${user.id} deleted`);

        return res.status(200).json({ ok: true,message:"Usuário deletado com sucesso!"});

      } catch (error) {
        res.status(500).send({ ok: false, error: "Erro ao deletar usuário!" });
      }
    }
    //Login de Usuário
    async login(req: Request, res: Response) {
      try {        
        const { email, password } = req.body;
        
        const user = await AppDataSource.getRepository(User).findOne({
          where: { email: email },
          select: ["id", "name", "email", "password_hash"],
        }); 
        
        if (!user) {return res.status(404).json({ ok: false, error: "Usuário ou Senha inválidos!" });}  
        
        if (!bcrypt.compareSync(password, user.password_hash)) {
          return res.status(401).json({ ok: false, error: "Usuário ou Senha inválidos!" });
        } 
        
        const token = jwt.sign({ id: user.id },process.env.JWT_SECRET as string,{ expiresIn: "1m" });  
        
        return res.status(200).json({ ok: true, token });

      } catch (error) {
        console.log(error, "Erro na autenticação de usuário");
        res.status(500).send({ ok: false, error: "Erro na autenticação de usuário" });
      }
    }
    
}

export default new UserController();