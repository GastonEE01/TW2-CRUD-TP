import { Producto } from '../../productos/interfaces/producto.interface';

export interface CarritoProducto {
    idCarritoProducto: number;
    idCarrito: number;
    idProducto: number;
    cantidad: number;
    Producto: Producto;
}

export interface Carrito {
    idCarrito: number;
    idUsuario: number;
    fechaCreacion: string;
    CarritoProducto: CarritoProducto[];
} 