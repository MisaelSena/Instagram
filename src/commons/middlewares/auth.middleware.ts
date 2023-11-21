import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../services/database/app-data-source";
import { User } from "../../modules/users/entities/user.entity";

export async function validateJwtUser(req: Request, res: Response, next: NextFunction) {
  try {    
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Você não está logado!" });

    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
    };

    const { id } = jwtPayload;

    const user = await AppDataSource.getRepository(User).findOne({
      where: { id },
    });

    if (!user) {
      return res.status(401).json({ message: "Token Inválido!" });
    }

    res.locals.user = user;

    next();
  } catch (error) {
    console.log(error, "Erro ao Validar Usuário!");
    return res.status(401).json({ message: "Erro ao Validar Usuário! Não foi possível autenticar!" });
  }
}