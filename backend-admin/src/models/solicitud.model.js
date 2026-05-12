import { pool } from "../config/db.js";

export const getPendingUsersModel =
  async () => {

    const query = `
      SELECT
        id_usuario,
        nombre,
        correo,
        estado_usuario,
        fecha_registro
      FROM usuario
      WHERE estado_usuario = 'PENDIENTE'
      ORDER BY fecha_registro DESC
    `;

    const result =
      await pool.query(query);

    return result.rows;

};

export const getPendingNegociosModel =
  async () => {

    const query = `
      SELECT
        id_negocio,
        nombre,
        estado_negocio,
        fecha_registro
      FROM negocio
      WHERE estado_negocio = 'PENDIENTE'
      ORDER BY fecha_registro DESC
    `;

    const result =
      await pool.query(query);

    return result.rows;

};