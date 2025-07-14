import { Router } from "express";
import { loginController } from "../../controller/login.controller";

const router = Router();
const loginControllerInstance = new loginController();

router.post('/signup', loginControllerInstance.signup);
router.post('/signin', loginControllerInstance.signin);

export const usuariosRoutes = router; 