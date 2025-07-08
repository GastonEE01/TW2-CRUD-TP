import { prisma } from "../prisma";

export class ProductoRepository {
 async getProductosPorCategoria(nombreCategoria: string) {
    return await prisma.producto.findMany({
        where: {
            TipoProducto: {
                Nombre: nombreCategoria
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
  // Aquí puedes implementar los métodos necesarios para interactuar con la API de productos
  // Por ejemplo, podrías tener métodos para obtener, crear, actualizar y eliminar productos
}