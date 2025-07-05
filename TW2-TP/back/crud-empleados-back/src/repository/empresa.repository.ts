import { prisma } from "../prisma";

export class EmpresaRepository {

    async getEmpresas() {
        return await prisma.empresa.findMany({ include: { Empleado: true } })
    }

    async getEmpresaById(id: number) {
        return await prisma.empresa.findUnique({
            where: { id: id },
            include: { Empleado: true }
        }
        )
    }

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

    async update(empresa:any) {
        //QUITAMOS LAS EMPRESAS DE LOS EMPLEADOS QUE NO ESTAN EN LA LISTA
        await prisma.empleado.updateMany({
            where : {
                id_empresa : empresa.id,
                id : {notIn: empresa.empleados}
            },
            data : {
                id_empresa : null
            }
        })

        //INSERTAMOS LOS NUEVOS EMPLEADOS

        await prisma.empleado.updateMany({
            where : {
                id : {in : empresa.empleados}
            },
            data : { id_empresa : empresa.id}
        })

        //ACTUALIZAMOS LA EMPRESA Y LA DEVOLVEMOS ACTUALIZADA

        const empresaActualizada = await prisma.empresa.update({
            where : {id : empresa.id},
            data : {nombre : empresa.nombre},
            include : {Empleado : true}
        })

        return empresaActualizada
    }

    async delete(id: number) {
         await prisma.empleado.updateMany({
            where : {id_empresa : id},
            data : {id_empresa : null}
        })

        await prisma.empresa.delete({
            where : {id : id}
        })
    }
}