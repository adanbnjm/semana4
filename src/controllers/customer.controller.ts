import type { Request, Response } from "express";

import {
  obtenerClientes,
  obtenerClientePorId as obtenerClientePorIdModel,
  insertarCliente,
  actualizarCliente as actualizarClienteModel,
} from "../models/customer.model.js";

// GET /api/customers
export async function obtenerClientesController(
  req: Request,
  res: Response,
) /*#swagger.tags = ['Customers']
  #swagger.summary = 'Obtener todos los clientes' */ {
  try {
    const clientes = await obtenerClientes();

    res.json(clientes);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener los clientes",
    });
  }
}

// GET /api/customers/:id
export async function obtenerClientePorId(
  req: Request,
  res: Response,
) /*#swagger.tags = ['Customers']
  #swagger.summary = 'Obtener un cliente por ID' */ {
  try {
    const id = Number(req.params.id);

    const cliente = await obtenerClientePorIdModel(id);

    if (cliente === null) {
      return res.status(404).json({
        error: "Cliente no encontrado",
      });
    }

    res.json(cliente);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al obtener el cliente",
    });
  }
}

// POST /api/customers
export async function crearCliente(
  req: Request,
  res: Response,
) /*#swagger.tags = ['Customers']
  #swagger.summary = 'Crear un nuevo cliente' */ {
  try {
    const { nombre, email, telefono } = req.body;

    const cliente = await insertarCliente(nombre, email, telefono);

    res.status(201).json(cliente);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al crear el cliente",
    });
  }
}
export async function actualizarCliente(
  req: Request,
  res: Response,
) /*#swagger.tags = ['Customers']
  #swagger.summary = 'Actualizar un cliente' */ {
  try {
    const id = Number(req.params.id);

    const { nombre, email, telefono } = req.body;

    const cliente = await actualizarClienteModel(id, nombre, email, telefono);

    if (cliente === null) {
      return res.status(404).json({
        error: "Cliente no encontrado",
      });
    }

    res.json(cliente);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Error al actualizar el cliente",
    });
  }
}
