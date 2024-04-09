import { Router } from "express";
import { UserController } from "../controlles/user.controller.js";
import { auth } from "../middlewares/auth.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = Router();

//localhost:5000/user/register
router.post('/register', UserController.register);

//localhost:5000/user/login
router.post('/login',authAdmin, auth, UserController.login );

//localhost:5000/user/logout
router.get('/logout', UserController.logout );

//localhost:5000/refresh_token
router.get('/refresh_token', UserController.refreshToken );

//localhost:5000/user/infor
router.get('/infor', auth, UserController.getUser );//perfil

export { router as userRouter }


