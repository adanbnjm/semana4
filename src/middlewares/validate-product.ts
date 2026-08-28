import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const productSchema = z.object({
  nombre: z.string().min(1),
  precio: z.number().positive(),
});

export function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = productSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: result.error.issues,
    });
  }

  next();
}
