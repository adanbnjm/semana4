import pool from "../config/db.js";

export async function obtenerProducto(
  maxPrice?: number,
  page: number = 1,
  limit: number = 10,
) {
  const values: number[] = [];
  let query = "SELECT * FROM producto";

  if (maxPrice !== undefined) {
    query += ` WHERE precio <= $${values.length + 1}`;
    values.push(maxPrice);
  }

  const offset = (page - 1) * limit;

  query += ` ORDER BY id_producto ASC`;
  query += ` LIMIT $${values.length + 1}`;
  values.push(limit);

  query += ` OFFSET $${values.length + 1}`;
  values.push(offset);

  const result = await pool.query(query, values);

  return result.rows;
}
export async function obtenerProductoPorId(id: number) {
  const result = await pool.query(
    "SELECT * FROM producto WHERE id_producto = $1",
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
export async function insertarProducto(nombre: string, precio: number) {
  const result = await pool.query(
    `INSERT INTO producto (nombre, precio)
     VALUES ($1, $2)
     RETURNING *`,
    [nombre, precio],
  );

  return result.rows[0];
}
export async function actualizarProducto(
  id: number,
  nombre: string,
  precio: number,
) {
  const result = await pool.query(
    `UPDATE producto
     SET nombre = $1, precio = $2
     WHERE id_producto = $3
     RETURNING *`,
    [nombre, precio, id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
