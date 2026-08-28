import pool from "../config/db.js";

export async function obtenerClientes() {
  const result = await pool.query("SELECT * FROM cliente");

  return result.rows;
}
export async function obtenerClientePorId(id: number) {
  const result = await pool.query(
    "SELECT * FROM cliente WHERE id_cliente = $1",
    [id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
export async function insertarCliente(
  nombre: string,
  email: string,
  telefono: string,
) {
  const result = await pool.query(
    `INSERT INTO cliente (nombre, email, telefono)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [nombre, email, telefono],
  );

  return result.rows[0];
}
export async function actualizarCliente(
  id: number,
  nombre: string,
  email: string,
  telefono: string,
) {
  const result = await pool.query(
    `UPDATE cliente
     SET nombre = $1,
         email = $2,
         telefono = $3
     WHERE id_cliente = $4
     RETURNING *`,
    [nombre, email, telefono, id],
  );

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
}
