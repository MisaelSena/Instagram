import { startWebServer } from "./app";
import { startDataBase } from "./services/database/app-data-source";

async function main() {
    try {
        await startDataBase();
        console.log('Conectado ao banco de dados!');
        await startWebServer();
    } catch (error) {
        console.log(error,'Erro ao inicializar app!')
    }
}

main();