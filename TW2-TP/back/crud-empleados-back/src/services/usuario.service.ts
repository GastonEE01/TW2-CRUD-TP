import { UsuarioRepository } from "../repository/usuario.repository";

export class UsuarioService {

    constructor(private readonly usuarioRepository: UsuarioRepository) {}

    async crearUsuario(usuario : any ) {
        const validarUsuario = await this.usuarioRepository.findByEmail(usuario.email);
        if (validarUsuario) {
            throw new Error('El email ya está registrado');
        }
        if(usuario.contraseña.length < 5){
            throw new Error('La contraseña debe tener al menos 5 caracteres');
        }
        if(!usuario.nombre || !usuario.apellido || !usuario.direccion){
            throw new Error('Todos los campos son obligatorios');
        }
        if(!usuario.email || !usuario.contraseña || !usuario.nombre || !usuario.apellido || !usuario.direccion){
            throw new Error('Todos los campos son obligatorios');
        }
        return await this.usuarioRepository.create(usuario);
    }

   async login(email: string, contraseña: string) {
    const usuario = await this.usuarioRepository.findByEmail(email);
    if(!usuario){
        throw new Error('Usuario no encontrado');
    }
    if(usuario.contraseña !== contraseña){
        throw new Error('Contraseña incorrecta');
    }
    return usuario;
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
