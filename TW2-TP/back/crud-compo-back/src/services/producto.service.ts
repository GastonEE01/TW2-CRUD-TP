import { ProductoRepository } from "../repository/producto.repository";

export class ProductoService {
    constructor(private productRepository:ProductoRepository) {
    } 
    getProductsByCategory(nombreCategoria: string) {
    return this.productRepository.getProductsByCategory(nombreCategoria);
}

    getProduct() {
        return this.productRepository.getProduct();
    
    }
  
}