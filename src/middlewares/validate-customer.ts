import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const customerSchema = z.object({
  nombre: z.string().min(1),
  email: z.string().email(),
  telefono: z.string().min(1),
});

export function validateCustomer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = customerSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: "Datos inválidos",
      details: result.error.issues,
    });
  }

  next();
}
