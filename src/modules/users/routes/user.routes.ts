import { Router } from "express";
import { validateCreateUserMiddleware } from "../middlewares/validate-user-creation.middleware";
import userController from "../controller/user.controller";

export const UserRoutes = (): Router =>{
    const router = Router();
    //Rota user para o Create
    router.post("/",validateCreateUserMiddleware,userController.createUser);
    //Rota user para listar usuários
    router.get("/", userController.listUsers);
    //Rota para listar user pelo ID
    router.get("/:user_id", userController.listOnlyOneUser);

    return router;
}