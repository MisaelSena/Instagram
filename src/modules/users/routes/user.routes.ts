import { Router } from "express";
import { validateCreateUserMiddleware } from "../middlewares/validate-user-creation.middleware";
import UserController from "../controller/user.controller";

export const UserRoutes = (): Router =>{
    const router = Router();
    //Rota user para o Create
    router.post("/",validateCreateUserMiddleware,UserController.createUser);
    //Rota user para listar usuários
    router.get("/", UserController.listUsers);
    //Rota para listar user pelo ID
    router.get("/:user_id", UserController.listOnlyOneUser);
    //Rota para atualizar user
    router.patch("/:user_id", UserController.updateUser);
    //Rota para deletar user
    router.delete("/:user_id", UserController.deleteUser);

    return router;
}