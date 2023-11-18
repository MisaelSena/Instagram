import { Request, Response } from "express";
import { AppDataSource } from "../../../services/database/app-data-source";
import { User } from "../entities/user.entity";
import bcrypt from "bcrypt";

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

}

export default new UserController();