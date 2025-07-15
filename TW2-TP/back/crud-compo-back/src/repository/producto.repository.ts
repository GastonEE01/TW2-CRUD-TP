import { prisma } from "../prisma";

export class ProductoRepository {
 async getProductsByCategory(nombreCategoria: string) {
    return await prisma.producto.findMany({
        where: {
            TipoProducto: {
                nombre: nombreCategoria
            }
        },
        include: {
            TipoProducto: true
        }
    });
}

    async getProduct() {
        return await prisma.producto.findMany();
    
    }
  
}