import type { Request, Response } from "express";
import {
  obtenerVentas,
  obtenerVentaPorId,
  crearVenta,
} from "../models/sale.model.js";

export async function obtenerVentasController(req: Request, res: Response) {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Obtener todas las ventas' */

  try {
    const sales = await obtenerVentas();

    res.json(sales);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener las ventas",
    });
  }
}
export async function obtenerVentaPorIdController(req: Request, res: Response) {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Obtener una venta por ID' */

  try {
    const id = Number(req.params.id);

    const sale = await obtenerVentaPorId(id);

    if (sale === null) {
      return res.status(404).json({
        error: "Venta no encontrada",
      });
    }

    res.json(sale);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener la venta",
    });
  }
}
export async function crearVentaController(req: Request, res: Response) {
  /*#swagger.tags = ['Sales']
    #swagger.summary = 'Crear una nueva venta' */

  try {
    const { fecha, total, id_cliente } = req.body;

    const sale = await crearVenta(fecha, total, id_cliente);

    res.status(201).json(sale);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear la venta",
    });
  }
}
