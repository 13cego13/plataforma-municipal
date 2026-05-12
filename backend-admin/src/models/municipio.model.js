import { pool } from "../config/db.js";

export const getAllMunicipios =
  async () => {

    const query = `
      SELECT *
      FROM municipio
      ORDER BY fecha_creacion DESC
    `;

    const result =
      await pool.query(query);

    return result.rows;

};

export const findMunicipioByName =
  async (nombre) => {

    const query = `
      SELECT *
      FROM municipio
      WHERE LOWER(nombre) =
      LOWER($1)
    `;

    const result =
      await pool.query(query, [nombre]);

    return result.rows[0];

};

export const createMunicipioModel =
  async ({
    nombre,
    descripcion,
  }) => {

    const query = `
      INSERT INTO municipio (
        nombre,
        descripcion,
        estado,
        fecha_creacion
      )
      VALUES (
        $1,
        $2,
        true,
        NOW()
      )
      RETURNING *
    `;

    const values = [
      nombre,
      descripcion,
    ];

    const result =
      await pool.query(query, values);

    return result.rows[0];

};

export const getMunicipioByIdModel =
  async (id) => {

    const query = `
      SELECT *
      FROM municipio
      WHERE id_municipio = $1
    `;

    const result =
      await pool.query(query, [id]);

    return result.rows[0];

};

export const updateMunicipioModel =
  async (
    id,
    {
      nombre,
      descripcion,
    }
  ) => {

    const query = `
      UPDATE municipio
      SET
        nombre = $1,
        descripcion = $2
      WHERE id_municipio = $3
      RETURNING *
    `;

    const values = [
      nombre,
      descripcion,
      id,
    ];

    const result =
      await pool.query(query, values);

    return result.rows[0];

};

export const updateMunicipioStatusModel =
  async (
    id,
    estado
  ) => {

    const query = `
      UPDATE municipio
      SET estado = $1
      WHERE id_municipio = $2
      RETURNING *
    `;

    const result =
      await pool.query(query, [
        estado,
        id,
      ]);

    return result.rows[0];

};

export const getPublicMunicipiosModel =
  async () => {

    const query = `
      SELECT
        id_municipio,
        nombre
      FROM municipio
      WHERE estado = true
      ORDER BY nombre ASC
    `;

    const result =
      await pool.query(query);

    return result.rows;

};