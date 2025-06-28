import { prisma } from "../prisma";

export class UsuarioRepository {
    
    async findByEmail(email: string){
        return await prisma.usuario.findUnique({
            where: {
                email: email
            }
        })
    }

    async create(data: { email: string; contraseña: string; nombre: string; apellido: string; direccion: string }) {
        return await prisma.usuario.create({
            data
        });
    }
    
}
/*
 async create(empresa: any) {
       const nueveEmpresa =  await prisma.empresa.create({
            data: { nombre: empresa.nombre }
        });

        await prisma.empleado.updateMany({
            where : {
                id : { in : empresa.empleados}
            },
            data : {
                id_empresa : nueveEmpresa.id
            }
        })
    }
*/