import { Producto } from '../../productos/interfaces/producto.interface';

export interface CarritoProducto {
    id: number;
    IdCarrito: number;
    IdProducto: number;
    Cantidad: number;
    Producto: Producto;
}

export interface Carrito {
    id: number;
    idUsuario: number;
    FechaCreacion: string;
    CarritoProducto: CarritoProducto[];
} 