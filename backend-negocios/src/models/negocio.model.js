import { pool } from "../config/db.js";

export const createNegocioModel =
  async ({
    id_dueno,
    id_categoria,
    id_municipio,
    nombre,
    descripcion,
    direccion,
    telefono,
  }) => {

    const query = `
      INSERT INTO negocio (
        id_dueno,
        id_categoria,
        id_municipio,
        nombre,
        descripcion,
        direccion,
        telefono,
        estado_negocio,
        fecha_registro,
        fecha_actualizacion
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        $5,
        $6,
        $7,
        'PENDIENTE',
        NOW(),
        NOW()
      )
      RETURNING *
    `;

    const values = [
      id_dueno,
      id_categoria,
      id_municipio,
      nombre,
      descripcion,
      direccion,
      telefono,
    ];

    const result =
      await pool.query(query, values);

    return result.rows[0];

};

export const getNegociosByCategoriaModel =
  async (id_categoria) => {

    const query = `
      SELECT
        n.id_negocio,
        n.nombre,
        n.descripcion,
        n.direccion,
        n.telefono,
        c.nombre AS categoria,
        m.nombre AS municipio
      FROM negocio n
      INNER JOIN categoria c
        ON n.id_categoria =
        c.id_categoria
      INNER JOIN municipio m
        ON n.id_municipio =
        m.id_municipio
      WHERE
        n.estado_negocio = 'APROBADO'
        AND c.estado = true
        AND m.estado = true
        AND n.id_categoria = $1
      ORDER BY n.fecha_registro DESC
    `;

    const result =
      await pool.query(query, [
        id_categoria,
      ]);

    return result.rows;

};

export const getNegocioDetailModel =
  async (id_negocio) => {

    const query = `
      SELECT
        n.id_negocio,
        n.nombre,
        n.descripcion,
        n.direccion,
        n.telefono,
        n.estado_negocio,

        c.nombre AS categoria,

        m.nombre AS municipio,

        img.url_imagen AS imagen_principal

      FROM negocio n

      INNER JOIN categoria c
        ON n.id_categoria =
        c.id_categoria

      INNER JOIN municipio m
        ON n.id_municipio =
        m.id_municipio

      LEFT JOIN imagen_negocio img
        ON n.id_negocio =
        img.id_negocio
        AND img.es_principal = true

      WHERE
        n.id_negocio = $1
        AND n.estado_negocio = 'APROBADO'
    `;

    const result =
      await pool.query(query, [
        id_negocio,
      ]);

    return result.rows[0];

};

export const getMyNegociosModel =
  async (id_dueno) => {

    const query = `
        SELECT
    n.*,
    i.url_imagen AS imagen_principal
  FROM negocio n
  LEFT JOIN imagen_negocio i
    ON n.id_negocio = i.id_negocio
    AND i.es_principal = true
  WHERE n.id_dueno = $1
  ORDER BY n.fecha_registro DESC
    `;

    const result =
      await pool.query(query, [
        id_dueno,
      ]);

    return result.rows;

};

export const updateMyNegocioModel =
  async (
    id_negocio,
    {
      nombre,
      descripcion,
      direccion,
      telefono,
      id_categoria,
      id_municipio,
    }
  ) => {

    const query = `
      UPDATE negocio
      SET
        nombre = $1,
        descripcion = $2,
        direccion = $3,
        telefono = $4,
        id_categoria = $5,
        id_municipio = $6,
        fecha_actualizacion = NOW()
      WHERE id_negocio = $7
      RETURNING *
    `;

    const values = [
      nombre,
      descripcion,
      direccion,
      telefono,
      id_categoria,
      id_municipio,
      id_negocio,
    ];

    const result =
      await pool.query(query, values);

    return result.rows[0];

};

export const getNegocioByIdModel =
  async (id_negocio) => {

    const query = `
      SELECT *
      FROM negocio
      WHERE id_negocio = $1
    `;

    const result =
      await pool.query(query, [
        id_negocio,
      ]);

    return result.rows[0];

};

export const deactivateNegocioModel =
  async (id_negocio) => {

    const query = `
      UPDATE negocio
      SET
        estado_negocio = 'INACTIVO',
        fecha_actualizacion = NOW()
      WHERE id_negocio = $1
      RETURNING *
    `;

    const result =
      await pool.query(query, [
        id_negocio,
      ]);

    return result.rows[0];

};

export const activateNegocioModel =
  async (id_negocio) => {

    const query = `
      UPDATE negocio
      SET
        estado_negocio = 'APROBADO',
        fecha_actualizacion = NOW()
      WHERE id_negocio = $1
      RETURNING *
    `;

    const result =
      await pool.query(query, [
        id_negocio,
      ]);

    return result.rows[0];

};