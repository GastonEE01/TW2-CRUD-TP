import { log } from "console";
import { UsuarioRepository } from "../repository/usuario.repository";
import { Usuario } from "@prisma/client";

const bcrypt = require('bcrypt');
export class UsuarioService {

    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async createUser(usuario: Usuario) {
    
        if(!usuario.nombre || !usuario.apellido || !usuario.direccion || !usuario.email || !usuario.contrasenia){
            throw new Error('Todos los campos son obligatorios');
        }
       
        const validarUsuario = await this.usuarioRepository.findByEmail(usuario.email);
        
        if (validarUsuario) {
            throw new Error('El email ya está registrado');
        }

        if (!usuario.contrasenia || usuario.contrasenia.length < 5) {
        throw new Error('La contraseña debe tener al menos 5 caracteres');  
       }

       const saltRounds = 10; 
       const hashedContrasenia = await bcrypt.hash(usuario.contrasenia, saltRounds);
       
       usuario.contrasenia = hashedContrasenia;
       return await this.usuarioRepository.create(usuario);
    }

   async login(email: string, contrasenia: string) {
    const usuario = await this.usuarioRepository.findByEmail(email);
    if(!usuario){
        throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if(!isPasswordValid){
        throw new Error('Contraseña incorrecta');
    }
 
    return usuario;
   }
}

