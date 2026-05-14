import { pool } from "../config/db.js";

export const getAllCategorias =
  async () => {

    const query = `
      SELECT *
      FROM categoria
      ORDER BY fecha_creacion DESC
    `;

    const result =
      await pool.query(query);

    return result.rows;

};

export const findCategoriaByName =
  async (nombre) => {

    const query = `
      SELECT *
      FROM categoria
      WHERE LOWER(TRIM(nombre)) =
      LOWER(TRIM($1))
    `;

    const result =
      await pool.query(query, [nombre]);

    return result.rows[0];

};

export const createCategoriaModel =
  async ({
    nombre,
    descripcion,
    imagen_url,
  }) => {

    const query = `
      INSERT INTO categoria (
        nombre,
        descripcion,
        imagen_url,
        estado,
        fecha_creacion
      )
      VALUES (
        $1,
        $2,
        $3,
        true,
        NOW()
      )
      RETURNING *
    `;

    const values = [
      nombre,
      descripcion,
      imagen_url,
    ];

    const result =
      await pool.query(query, values);

    return result.rows[0];

};

export const getCategoriaByIdModel =
  async (id) => {

    const query = `
      SELECT *
      FROM categoria
      WHERE id_categoria = $1
    `;

    const result =
      await pool.query(query, [id]);

    return result.rows[0];

};

export const updateCategoriaModel =
  async (
    id,
    {
      nombre,
      descripcion,
      imagen_url,
    }
  ) => {

    const query = `
      UPDATE categoria
      SET
        nombre = $1,
        descripcion = $2,
        imagen_url = $3
      WHERE id_categoria = $4
      RETURNING *
    `;

    const values = [
      nombre,
      descripcion,
      imagen_url,
      id,
    ];

    const result =
      await pool.query(query, values);

    return result.rows[0];

};

export const updateCategoriaStatusModel =
  async (
    id,
    estado
  ) => {

    const query = `
      UPDATE categoria
      SET estado = $1
      WHERE id_categoria = $2
      RETURNING *
    `;

    const result =
      await pool.query(query, [
        estado,
        id,
      ]);

    return result.rows[0];

};
