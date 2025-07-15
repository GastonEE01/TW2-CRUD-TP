import { CarritoRepository } from "../repository/carrito.repository";

export class CarritoService {
    constructor(private readonly carritoRepository: CarritoRepository) {}

    async getCart(idUsuario: number) {
        let carrito = await this.carritoRepository.getCartUser(idUsuario);

        if (!carrito) {
            await this.carritoRepository.createCart(idUsuario);
            carrito = await this.carritoRepository.getCartUser(idUsuario);
        }
        return carrito;
    }

    async addProduct(idUsuario: number, idProducto: number, cantidad: number = 1) {
        if (!idUsuario || idUsuario <= 0) 
            throw new Error('ID de usuario inválido');
        if (!idProducto || idProducto <= 0) 
            throw new Error('ID de producto inválido');
        if (!cantidad || cantidad <= 0) 
            throw new Error('Cantidad inválida');

        let carrito = await this.carritoRepository.getCartUser(idUsuario);

        if (!carrito) {
            await this.carritoRepository.createCart(idUsuario);
            carrito = await this.carritoRepository.getCartUser(idUsuario);
        }

        const resultado = await this.carritoRepository.addProductoToCarrito(carrito.idCarrito, idProducto, cantidad);

        return resultado;
    }

    async updateQuantity(idUsuario: number, idCarritoProducto: number, cantidad: number) {
        if (cantidad <= 0) {
            return await this.carritoRepository.removeproductCart(idCarritoProducto);
        }
        return await this.carritoRepository.updateQuantity(idCarritoProducto, cantidad);
    }

    async removeProduct(idUsuario: number, idCarritoProducto: number) {
        return await this.carritoRepository.removeproductCart(idCarritoProducto);
    }

    async clearCart(idUsuario: number) {
        const carrito = await this.carritoRepository.getCartUser(idUsuario);
        if (carrito) {
            return await this.carritoRepository.clearCart(carrito.idCarrito);
        }
        return null;
    }
}