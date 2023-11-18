import express from 'express';
import dotenv from 'dotenv';
import { UserRoutes } from './modules/users/routes/user.routes';

dotenv.config();
const app = express();

app.use(express.json());

//Rota para ações em usuários
app.use("/users",UserRoutes());

export async function startWebServer() {
    return new Promise((resolve)=>{
        app.listen(process.env.PORT_EXPRESS, ()=>{
            console.log("Servidor Express Ativo!");
            resolve(null);
        });
    })
}