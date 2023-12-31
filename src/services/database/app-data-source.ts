import {DataSource} from "typeorm";
import dotenv from "dotenv";
import { User } from "../../modules/users/entities/user.entity";
import { Post } from "../../modules/posts/entities/post.entity";
import { Like } from "../../modules/likes/entities/like.entity";
import { Comment } from "../../modules/comments/entities/comment.entity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User, Post, Comment, Like],    
})

export async function startDataBase() {
    try {
        await AppDataSource.initialize();
    } catch (error) {
        console.log('Senha:',process.env.DB_PWD);
        console.error('Erro ao conectar com o Banco de Dados',error);
        throw error;
    }
}