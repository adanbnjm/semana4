import pool from "../config/db.js";

export async function obtenerVentas() {
  const result = await pool.query(`
    SELECT
      venta.id_venta,
      venta.fecha,
      venta.total,
      venta.id_cliente,
      cliente.nombre AS nombre_cliente
    FROM venta
    INNER JOIN cliente
      ON venta.id_cliente = cliente.id_cliente
    ORDER BY venta.id_venta ASC
  `);

  return result.rows;
}
export async function obtenerVentaPorId(id: number) {
  const result = await pool.query(
    `
    SELECT
      venta.id_venta,
      venta.fecha,
      venta.total,
      venta.id_cliente,
      cliente.nombre AS nombre_cliente
    FROM venta
    INNER JOIN cliente
      ON venta.id_cliente = cliente.id_cliente
    WHERE venta.id_venta = $1
    `,
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
export async function crearVenta(
  fecha: string,
  total: number,
  id_cliente: number,
) {
  const result = await pool.query(
    `
    INSERT INTO venta (fecha, total, id_cliente)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [fecha, total, id_cliente],
  );

  return result.rows[0];
}
