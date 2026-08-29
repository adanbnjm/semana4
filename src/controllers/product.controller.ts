import type { Request, Response } from "express";
import {
  obtenerProducto,
  obtenerProductoPorId as obtenerProductoPorIdModel,
  insertarProducto,
  actualizarProducto,
} from "../models/product.model.js";

export async function obtenerMenu(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Obtener todos los productos' */

  try {
    const maxPrice =
      req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;

    const page = req.query.page !== undefined ? Number(req.query.page) : 1;

    const limit = req.query.limit !== undefined ? Number(req.query.limit) : 10;

    const products = await obtenerProducto(maxPrice, page, limit);

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener los productos",
    });
  }
}

export async function obtenerProductoPorId(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Obtener un producto por ID' */
  try {
    const id = Number(req.params.id);

    const product = await obtenerProductoPorIdModel(id);

    if (product === null) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el producto",
    });
  }
}
export async function crearProducto(req: Request, res: Response) {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Crear un nuevo producto' */

  try {
    const { nombre, precio } = req.body;

    const product = await insertarProducto(nombre, precio);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear el producto",
    });
  }
}
export async function actualizarProductoController(
  req: Request,
  res: Response,
) {
  /*#swagger.tags = ['Products']
    #swagger.summary = 'Actualizar un producto' */

  try {
    const id = Number(req.params.id);
    const { nombre, precio } = req.body;

    const product = await actualizarProducto(id, nombre, precio);

    if (product === null) {
      return res.status(404).json({
        error: "Producto no encontrado",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al actualizar el producto",
    });
  }
}
