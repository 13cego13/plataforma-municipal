import { pool } from "../config/db.js";

export const getPublicCategoriasModel =
  async () => {

    const query = `
      SELECT
        id_categoria,
        nombre,
        descripcion,
        imagen_url
      FROM categoria
      WHERE estado = true
      ORDER BY nombre ASC
    `;

    const result =
      await pool.query(query);

    return result.rows;

};