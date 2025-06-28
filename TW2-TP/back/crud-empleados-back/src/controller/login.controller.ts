import { Request, Response } from "express";
import { UsuarioRepository } from "../repository/usuario.repository";
import { UsuarioService } from "../services/usuario.service";

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);

export class loginController {
    public signup = async (req: Request, res: Response) => {
        try {
            const usuario = await usuarioService.crearUsuario(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    public signin = async (req: Request, res: Response) => {
        try {
            const { email, contraseña } = req.body;
            const usuario = await usuarioService.login(email, contraseña);
            res.status(200).json(usuario);
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }
}