import { prisma } from "../prisma";

export class CarritoRepository {
    
    async obtenerCarritoPorUsuario(idUsuario: number) {    
        const carrito = await prisma.carrito.findUnique({
            where: { idUsuario },
            include: {
                CarritoProducto: {
                    include: {
                        Producto: true
                    }
                }
            }
        });
        
        return carrito;
    }

    async crearCarrito(idUsuario: number) {
        const carrito = await prisma.carrito.create({
            data: {
                idUsuario,
                FechaCreacion: new Date()
            }
        });
        return carrito;
    }

    async agregarProductoAlCarrito(idCarrito: number, idProducto: number, cantidad: number) {
        try {
            const carrito = await prisma.carrito.findUnique({
                where: { id: idCarrito }
            });
            if (!carrito) {
                throw new Error(`Carrito con ID ${idCarrito} no encontrado`);
            }
            const producto = await prisma.producto.findUnique({
                where: { idProducto: idProducto }
            });
            
            if (!producto) {
                throw new Error(`Producto con ID ${idProducto} no existe`);
            }
            
            const productoExistente = await prisma.carritoProducto.findFirst({
                where: {
                    IdCarrito: idCarrito,
                    IdProducto: idProducto
                }
            });

            
            let resultado;

            if (productoExistente) {
                resultado = await prisma.carritoProducto.update({
                    where: { id: productoExistente.id },
                    data: { Cantidad: productoExistente.Cantidad + cantidad }
                });
            } else {
                resultado = await prisma.carritoProducto.create({
                    data: {
                        IdCarrito: idCarrito,
                        IdProducto: idProducto,
                        Cantidad: cantidad
                    }
                });
            }
            return resultado;
        } catch (error) {
            console.error('Error en agregarProductoAlCarrito:', error);
            throw error;
        }
    }

    async eliminarProductoDelCarrito(idCarritoProducto: number) {
        return await prisma.carritoProducto.delete({
            where: { id: idCarritoProducto }
        });
    }

    async actualizarCantidad(idCarritoProducto: number, cantidad: number) {
        return await prisma.carritoProducto.update({
            where: { id: idCarritoProducto },
            data: { Cantidad: cantidad }
        });
    }

    async limpiarCarrito(idCarrito: number) {
        return await prisma.carritoProducto.deleteMany({
            where: { IdCarrito: idCarrito }
        });
    }
}


