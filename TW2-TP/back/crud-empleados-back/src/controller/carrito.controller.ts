import { Request, Response } from "express";
import { CarritoService } from "../services/carrito.service";
import { CarritoRepository } from "../repository/carrito.repository";
import { prisma } from "../prisma";

const carritoRepository = new CarritoRepository();
const carritoService = new CarritoService(carritoRepository);


export const obtenerCarritoPorUsuario = async (req: Request, res: Response) => {
    try {
        const { usuarioId } = req.params;
        const carrito = await carritoService.obtenerCarrito(Number(usuarioId));
        res.json(carrito);
    } catch (error) {
        console.error('Error al obtener carrito:', error);
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
};

export const agregarProductoAlCarrito = async (req: Request, res: Response) => {
    try {
        const { usuarioId } = req.params;
        const { idProducto, cantidad } = req.body;
        
        if (!idProducto) {
            throw new Error('idProducto es requerido');
        }
        
        const usuario = await prisma.usuario.findUnique({
            where: { IdUsuario: Number(usuarioId) }
        });
        
        if (!usuario) {
            throw new Error(`Usuario con ID ${usuarioId} no encontrado`);
        }
        
        const producto = await prisma.producto.findUnique({
            where: { idProducto: Number(idProducto) }
        });
        
        if (!producto) {
            throw new Error(`Producto con ID ${idProducto} no encontrado`);
        }
        
        if (!cantidad || cantidad <= 0) {
            throw new Error('Cantidad debe ser mayor a 0');
        }
        
        const resultado = await carritoService.agregarProducto(
            Number(usuarioId), 
            Number(idProducto), 
            Number(cantidad)
        );
        
        res.json({
            success: true,
            message: 'Producto agregado al carrito',
            data: resultado
        });
        
    } catch (error) {
        console.error('Error al agregar producto:', error);
        res.status(500).json({ 
            success: false,
            error: error.message || "Error al agregar producto al carrito" 
        });
    }
};

export const actualizarCantidad = async (req: Request, res: Response) => {
    try {
        const { usuarioId } = req.params;
        const { idCarritoProducto, cantidad } = req.body;
        const resultado = await carritoService.actualizarCantidad(
            Number(usuarioId),
            Number(idCarritoProducto),
            Number(cantidad)
        );
        
        res.json(resultado);
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        res.status(500).json({ error: "Error al actualizar cantidad" });
    }
};

export const eliminarProductoDelCarrito = async (req: Request, res: Response) => {
    try {
        const { usuarioId } = req.params;
        const { idCarritoProducto } = req.query; 
        
        const resultado = await carritoService.eliminarProducto(
            Number(usuarioId),
            Number(idCarritoProducto)
        );
        
        res.json(resultado);
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: "Error al eliminar producto del carrito" });
    }
};

export const limpiarCarrito = async (req: Request, res: Response) => {
    try {
        const { usuarioId } = req.params;
        const resultado = await carritoService.limpiarCarrito(Number(usuarioId));
        res.json(resultado);
    } catch (error) {
        console.error('Error al limpiar carrito:', error);
        res.status(500).json({ error: "Error al limpiar el carrito" });
    }
};