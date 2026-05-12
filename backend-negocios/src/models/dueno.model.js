import { pool } from "../config/db.js";

export const getDuenoByUserIdModel =
  async (id_usuario) => {

    const query = `
      SELECT *
      FROM dueno_negocio
      WHERE id_usuario = $1
    `;

    const result =
      await pool.query(query, [id_usuario]);

    return result.rows[0];

};