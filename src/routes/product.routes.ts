import { Router } from "express";

import {
  obtenerMenu,
  obtenerProductoPorId,
  crearProducto,
  actualizarProductoController,
} from "../controllers/product.controller.js";

const router: Router = Router();

router.get("/menu", obtenerMenu);

router.get("/menu/:id", obtenerProductoPorId);

router.post("/menu", crearProducto);

router.put("/menu/:id", actualizarProductoController);

export default router;
