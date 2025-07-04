import { ProductoRepository } from "../repository/producto.repository";

export class ProductoService {
    constructor(private productRepository:ProductoRepository) {
    } 
    getProductos() {
        return this.productRepository.getProductos();
    
    }
  // Aquí puedes implementar los métodos necesarios para interactuar con la API de productos
  // Por ejemplo, podrías tener métodos para obtener, crear, actualizar y eliminar productos
}