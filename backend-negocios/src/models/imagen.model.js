import { pool } from "../config/db.js";

export const createImagenModel =
  async ({
    id_negocio,
    url_imagen,
    orden,
    es_principal,
  }) => {

    const query = `
      INSERT INTO imagen_negocio (
        id_negocio,
        url_imagen,
        orden,
        es_principal,
        fecha_creacion
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        NOW()
      )
      RETURNING *
    `;

    const values = [
      id_negocio,
      url_imagen,
      orden,
      es_principal,
    ];

    const result =
      await pool.query(query, values);

    return result.rows[0];

};

export const getImagesByNegocioModel =
  async (id_negocio) => {

    const query = `
      SELECT *
      FROM imagen_negocio
      WHERE id_negocio = $1
      ORDER BY orden ASC
    `;

    const result =
      await pool.query(query, [
        id_negocio,
      ]);

    return result.rows;

};