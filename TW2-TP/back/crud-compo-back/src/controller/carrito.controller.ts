import { Request, Response } from "express";
import { CarritoService } from "../services/carrito.service";
import { CarritoRepository } from "../repository/carrito.repository";
import { prisma } from "../prisma";

const carritoRepository = new CarritoRepository();
const carritoService = new CarritoService(carritoRepository);


export const getUserCart = async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.params;
        const carrito = await carritoService.getCart(Number(idUsuario));
        res.json(carrito);
    } catch (error) {
        console.error('Error al obtener carrito:', error);
        res.status(500).json({ error: "Error al obtener el carrito" });
    }
};

export const addProductToCart = async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.params;
        const { idProducto, cantidad } = req.body;
        
        if (!idProducto) {
            throw new Error('idProducto es requerido');
        }
        
        const usuario = await prisma.usuario.findUnique({
            where: { idUsuario: Number(idUsuario) }
        });
        
        if (!usuario) {
            throw new Error(`Usuario con ID ${idUsuario} no encontrado`);
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
        
        const resultado = await carritoService.addProduct(
            Number(idUsuario), 
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

export const updateQuantity = async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.params;
        const { idCarritoProducto, cantidad } = req.body;
        const resultado = await carritoService.updateQuantity(
            Number(idUsuario),
            Number(idCarritoProducto),
            Number(cantidad)
        );
        
        res.json(resultado);
    } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        res.status(500).json({ error: "Error al actualizar cantidad" });
    }
};

export const deleteProductCart
= async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.params;
        const { idCarritoProducto } = req.query; 
        
        const resultado = await carritoService.removeProduct(
            Number(idUsuario),
            Number(idCarritoProducto)
        );
        
        res.json(resultado);
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: "Error al eliminar producto del carrito" });
    }
};

export const clearCart = async (req: Request, res: Response) => {
    try {
        const { idUsuario } = req.params;
        const resultado = await carritoService.clearCart(Number(idUsuario));
        res.json(resultado);
    } catch (error) {
        console.error('Error al limpiar carrito:', error);
        res.status(500).json({ error: "Error al limpiar el carrito" });
    }
};