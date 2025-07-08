import {ProductoRepository} from "../repository/producto.repository";
import {ProductoService} from "../services/producto.service";
import {Request, Response} from "express";

const productoRepository=new ProductoRepository();
const productoService=new ProductoService(productoRepository);
export class ProductoController {

    constructor() {}    

    public getProductos = async (_req: Request, res: Response) => {
            try {
                const empresas = await productoService.getProductos();
                res.status(200).json(empresas)
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: 'Error al obtener las empresas', error })
            }
        }
       public getProductosPorCategoria = async (req: Request, res: Response) => {
    const nombreCategoria = req.params.nombre;

    try {
        const productos = await productoService.getProductosPorCategoria(nombreCategoria);
        res.status(200).json(productos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al obtener los productos por categoría', error });
    }
}

  
}