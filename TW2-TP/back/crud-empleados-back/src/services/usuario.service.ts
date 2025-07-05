import { UsuarioRepository } from "../repository/usuario.repository";

export class UsuarioService {

    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async crearUsuario(usuario: any) {
        const usuarioMapeado = {
            Email: usuario.email,
            contrase_a: usuario.contraseña,
            Nombre: usuario.nombre,
            Apellido: usuario.apellido,
            Direccion: usuario.direccion
        };

        console.log('Usuario recibido:', usuario); // Debug
        console.log('Usuario mapeado:', usuarioMapeado); // Debug

        const validarUsuario = await this.usuarioRepository.findByEmail(usuarioMapeado.Email);
        if (validarUsuario) {
            throw new Error('El email ya está registrado');
        }
        if(usuarioMapeado.contrase_a.length < 5){
            throw new Error('La contraseña debe tener al menos 5 caracteres');
        }
        if(!usuarioMapeado.Nombre || !usuarioMapeado.Apellido || !usuarioMapeado.Direccion){
            throw new Error('Todos los campos son obligatorios');
        }
        if(!usuarioMapeado.Email || !usuarioMapeado.contrase_a || !usuarioMapeado.Nombre || !usuarioMapeado.Apellido || !usuarioMapeado.Direccion){
            throw new Error('Todos los campos son obligatorios');
        }
        return await this.usuarioRepository.create(usuarioMapeado);
    }

   async login(email: string, contraseña: string) {
    const usuario = await this.usuarioRepository.findByEmail(email);
    if(!usuario){
        throw new Error('Usuario no encontrado');
    }
    if(usuario.contrase_a !== contraseña){
        throw new Error('Contraseña incorrecta');
    }
    
    // Mapear respuesta a minúsculas para el frontend
    return {
        id: usuario.IdUsuario,
        email: usuario.Email,
        contraseña: usuario.contrase_a,
        nombre: usuario.Nombre,
        apellido: usuario.Apellido,
        direccion: usuario.Direccion
    };
   }
}
/*
   async obtenerUsuarioPorId(id: number) {
    return await this.usuarioRepository.findById(id);
   }
    async obtenerUsuarioPorEmail(email: string) {
        return await this.usuarioRepository.findByEmail(email);
    }

    async actualizarUsuario(id: number, data: { email: string; contraseña: string; nombre: string; apellido: string; direccion: string }) {
        return await this.usuarioRepository.update(id, data);
    }*/
