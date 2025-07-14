import { CarritoRepository } from "../repository/carrito.repository";

export class CarritoService {
    constructor(private readonly carritoRepository: CarritoRepository) {}

    async obtenerCarrito(idUsuario: number) {
        let carrito = await this.carritoRepository.obtenerCarritoPorUsuario(idUsuario);

        if (!carrito) {
            await this.carritoRepository.crearCarrito(idUsuario);
            carrito = await this.carritoRepository.obtenerCarritoPorUsuario(idUsuario);
        }

        // No es necesario asignar CarritoProducto = []: Prisma ya lo hace si no hay productos
        return carrito;
    }

    async agregarProducto(idUsuario: number, idProducto: number, cantidad: number = 1) {
        if (!idUsuario || idUsuario <= 0) 
            throw new Error('ID de usuario inválido');
        if (!idProducto || idProducto <= 0) 
            throw new Error('ID de producto inválido');
        if (!cantidad || cantidad <= 0) 
            throw new Error('Cantidad inválida');

        let carrito = await this.carritoRepository.obtenerCarritoPorUsuario(idUsuario);

        if (!carrito) {
            await this.carritoRepository.crearCarrito(idUsuario);
            carrito = await this.carritoRepository.obtenerCarritoPorUsuario(idUsuario);
        }

        const resultado = await this.carritoRepository.agregarProductoAlCarrito(carrito.idCarrito, idProducto, cantidad);

        return resultado;
    }

    async actualizarCantidad(idUsuario: number, idCarritoProducto: number, cantidad: number) {
        if (cantidad <= 0) {
            return await this.carritoRepository.eliminarProductoDelCarrito(idCarritoProducto);
        }
        return await this.carritoRepository.actualizarCantidad(idCarritoProducto, cantidad);
    }

    async eliminarProducto(idUsuario: number, idCarritoProducto: number) {
        return await this.carritoRepository.eliminarProductoDelCarrito(idCarritoProducto);
    }

    async limpiarCarrito(idUsuario: number) {
        const carrito = await this.carritoRepository.obtenerCarritoPorUsuario(idUsuario);
        if (carrito) {
            return await this.carritoRepository.limpiarCarrito(carrito.idCarrito);
        }
        return null;
    }
}