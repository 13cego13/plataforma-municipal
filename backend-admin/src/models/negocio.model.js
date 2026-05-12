import { pool } from "../config/db.js";

export const getPendingNegocios =
  async () => {

    const query = `
      SELECT *
      FROM negocio
      WHERE estado_negocio = 'PENDIENTE'
      ORDER BY fecha_registro DESC
    `;

    const result =
      await pool.query(query);

    return result.rows;

};

export const approveNegocioModel =
  async (id) => {

    const query = `
      UPDATE negocio
      SET
        estado_negocio = 'APROBADO',
        fecha_actualizacion = NOW()
      WHERE id_negocio = $1
      RETURNING *
    `;

    const result =
      await pool.query(query, [id]);

    return result.rows[0];

};

export const rejectNegocioModel =
  async (id) => {

    const query = `
      UPDATE negocio
      SET
        estado_negocio = 'RECHAZADO',
        fecha_actualizacion = NOW()
      WHERE id_negocio = $1
      RETURNING *
    `;

    const result =
      await pool.query(query, [id]);

    return result.rows[0];

};

export const getNegocioByIdModel =
  async (id) => {

    const query = `
      SELECT *
      FROM negocio
      WHERE id_negocio = $1
    `;

    const result =
      await pool.query(query, [id]);

    return result.rows[0];

};
