import { Router } from "express";

import {
  obtenerVentasController,
  obtenerVentaPorIdController,
  crearVentaController,
} from "../controllers/sale.controller.js";

const router: Router = Router();

// Obtener todas las ventas
router.get("/sales", obtenerVentasController);

// Obtener una venta por ID
router.get("/sales/:id", obtenerVentaPorIdController);

// Crear una venta
router.post("/sales", crearVentaController);

export default router;
