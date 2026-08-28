import { Router } from "express";

import {
  obtenerClientesController,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
} from "../controllers/customer.controller.js";

import { validateCustomer } from "../middlewares/validate-customer.js";

const router: Router = Router();
console.log("CUSTOMER ROUTES CARGADAS");

router.get("/customers", obtenerClientesController);

router.get("/customers/:id", obtenerClientePorId);

router.post("/customers", validateCustomer, crearCliente);

router.put("/customers/:id", validateCustomer, actualizarCliente);

export default router;
