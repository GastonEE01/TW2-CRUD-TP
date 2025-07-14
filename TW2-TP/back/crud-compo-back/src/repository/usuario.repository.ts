import { prisma } from "../prisma";

export class UsuarioRepository {
    
    async findByEmail(email: string){
        return await prisma.usuario.findUnique({
            where: {
                email: email
            }
        })
    }

    async create(data: { email: string; contrasenia: string; nombre: string; apellido: string; direccion: string }) {
        return await prisma.usuario.create({ data });
    }
    
}
