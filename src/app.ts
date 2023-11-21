import express from 'express';
import dotenv from 'dotenv';
import { UserRoutes } from './modules/users/routes/user.routes';
import { PostRoutes } from './modules/posts/routes/post.routes';
import { CommentRouter } from './modules/comments/routes/comment.routes';

dotenv.config();
const app = express();

app.use(express.json());

//Rota para ações em usuários
app.use("/users",UserRoutes());
//Rota para ações em Posts
app.use("/posts",PostRoutes());
//Rota para ações em comentários
app.use("/comment",CommentRouter());

export async function startWebServer() {
    return new Promise((resolve)=>{
        app.listen(process.env.PORT_EXPRESS, ()=>{
            console.log("Servidor Express Ativo!");
            resolve(null);
        });
    })
}