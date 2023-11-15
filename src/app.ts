import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

export async function startWebServer() {
    return new Promise((resolve)=>{
        app.listen(process.env.PORT_EXPRESS, ()=>{
            console.log("Servidor Express Ativo!");
            resolve(null);
        });
    })
}