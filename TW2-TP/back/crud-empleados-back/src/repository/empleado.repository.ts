import { prisma } from "../prisma";

export class EmpleadoRepository {

    async getEmpleados() {
        return await prisma.empleado.findMany(
            {
                include: { Empresa: true }
            }
        )
    }

    async getEmpleadoById(id: number) {
        return await prisma.empleado.findUnique({
            where: { id },
            include: {
                Empresa: {
                    include: {
                        Empleado: true
                    }
                }
            }
        })
    }

    async create(data: { nombre: string; id_empresa?: number }) {
        return await prisma.empleado.create({
            data
        })
    }

    async update(id: number, data: { nombre?: string; id_empresa?: number }) {
        return await prisma.empleado.update({
            where: { id },
            data
        })
    }

    async delete(id: number) {
        return await prisma.empleado.delete({
            where: {id}
        })
    }
}