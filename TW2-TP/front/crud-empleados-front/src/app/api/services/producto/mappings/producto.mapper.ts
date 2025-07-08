import { ProductoRest } from '../interfaces/producto.interface.rest';
import { Producto } from '../../../../modules/productos/interfaces/producto.interface';

export class ProductoMapper {
    static mapRestProductoToProducto(restProducto: ProductoRest): Producto {
        return {
            idProducto: restProducto.idProducto,
            nombre: restProducto.nombre,
            descripcion: restProducto.Descripcion,
            precio: restProducto.Precio,
            imagen: restProducto.Imagen,
            idTipoProducto: restProducto.IdTipoProducto
        };
    }

    static mapRestProductoArrayToProductoArray(restProductos: ProductoRest[]): Producto[] {
        return restProductos.map(producto => this.mapRestProductoToProducto(producto));
    }
} 