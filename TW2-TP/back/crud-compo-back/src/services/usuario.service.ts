import { log } from "console";
import { UsuarioRepository } from "../repository/usuario.repository";

export class UsuarioService {

    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async crearUsuario(usuario: any) {
        const usuarioMapeado = {
            email: usuario.email,
            contrasenia: usuario.contrasenia, // <- SOLO usar contrasenia (sin ñ)
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            direccion: usuario.direccion
        };

        console.log('Usuario recibido:', usuario); // Debug
        console.log('Usuario mapeado:', usuarioMapeado); // Debug

        const validarUsuario = await this.usuarioRepository.findByEmail(usuarioMapeado.email);
        if (validarUsuario) {
            throw new Error('El email ya está registrado');
        }
        
    if (!usuarioMapeado.contrasenia || usuarioMapeado.contrasenia.length < 5) {
        console.log(usuarioMapeado);
        console.log(2);
        
        
        throw new Error('La contraseña debe tener al menos 5 caracteres');
        
    }
        if(!usuarioMapeado.nombre || !usuarioMapeado.apellido || !usuarioMapeado.direccion){
            throw new Error('Todos los campos son obligatorios');
        }
        if(!usuarioMapeado.email || !usuarioMapeado.contrasenia || !usuarioMapeado.nombre || !usuarioMapeado.apellido || !usuarioMapeado.direccion){
            throw new Error('Todos los campos son obligatorios');
        }
        return await this.usuarioRepository.create(usuarioMapeado);
    }

   async login(email: string, contrasenia: string) {
    const usuario = await this.usuarioRepository.findByEmail(email);
    if(!usuario){
        throw new Error('Usuario no encontrado');
    }
    if(usuario.contrasenia !== contrasenia){
        throw new Error('Contraseña incorrecta');
    }
    
    // Mapear respuesta para el frontend
    return {
        idUsuario: usuario.idUsuario,  
        email: usuario.email,
        contrasenia: usuario.contrasenia,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        direccion: usuario.direccion
    };
   }
}

