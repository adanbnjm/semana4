import { Router } from "express";

import {
  obtenerMenu,
  obtenerProductoPorId,
  crearProducto,
  actualizarProductoController,
} from "../controllers/product.controller.js";

import { validateProduct } from "../middlewares/validate-product.js";

const router: Router = Router();

router.get("/menu", obtenerMenu);

router.get("/menu/:id", obtenerProductoPorId);

router.post("/menu", validateProduct, crearProducto);

router.put("/menu/:id", actualizarProductoController);

export default router;
