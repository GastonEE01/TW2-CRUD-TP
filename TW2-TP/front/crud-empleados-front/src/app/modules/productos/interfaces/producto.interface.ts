export interface Producto {
    idProducto: number,
    nombre: string,
    descripcion?: string,
    precio?: number,
    imagen?: string,
    idTipoProducto?: number
}