import { prisma } from "../prisma";

export class CarritoRepository {
    
    async getCartUser(idUsuario: number) {    
        const carrito = await prisma.carrito.findFirst({
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

    async createCart(idUsuario: number) {
        const carrito = await prisma.carrito.create({
            data: {
                idUsuario,
                fechaCreacion: new Date()
            }
        });
        return carrito;
    }

    async addProductoToCarrito(idCarrito: number, idProducto: number, cantidad: number) {
        try {
            const carrito = await prisma.carrito.findUnique({
                where: { idCarrito: idCarrito }
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
                    idCarrito: idCarrito,
                    idProducto: idProducto
                }
            });

            
            let resultado;

            if (productoExistente) {
                resultado = await prisma.carritoProducto.update({
                    where: { idCarritoProducto: productoExistente.idCarritoProducto },
                    data: { cantidad: productoExistente.cantidad + cantidad }
                });
            } else {
                resultado = await prisma.carritoProducto.create({
                    data: {
                        idCarrito: idCarrito,
                        idProducto: idProducto,
                        cantidad: cantidad
                    }
                });
            }
            return resultado;
        } catch (error) {
            console.error('Error en agregarProductoAlCarrito:', error);
            throw error;
        }
    }

    async removeproductCart(idCarritoProducto: number) {
        return await prisma.carritoProducto.delete({
            where: { idCarritoProducto: idCarritoProducto }
        });
    }

    async updateQuantity(idCarritoProducto: number, cantidad: number) {
        return await prisma.carritoProducto.update({
            where: { idCarritoProducto: idCarritoProducto },
            data: { cantidad: cantidad }
        });
    }

    async clearCart(idCarrito: number) {
        return await prisma.carritoProducto.deleteMany({
            where: { idCarrito: idCarrito }
        });
    }
}


