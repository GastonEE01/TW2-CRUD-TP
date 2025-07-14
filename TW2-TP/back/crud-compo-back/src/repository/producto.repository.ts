import { prisma } from "../prisma";

export class ProductoRepository {
 async getProductosPorCategoria(nombreCategoria: string) {
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

    async getProductos() {
        return await prisma.producto.findMany();
    
    }
  
}