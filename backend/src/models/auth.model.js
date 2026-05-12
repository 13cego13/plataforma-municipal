import { pool } from "../config/db.js";

export const findUserByEmail = async (correo) => {
  const query = `
    SELECT *
    FROM usuario
    WHERE correo = $1
  `;

  const result = await pool.query(query, [correo]);

  return result.rows[0];
};

export const createUser = async ({
  nombre,
  correo,
  contrasena,
  id_rol,
}) => {
  const query = `
    INSERT INTO usuario (
      nombre,
      correo,
      contrasena,
      estado_usuario,
      fecha_registro,
      id_rol
    )
    VALUES (
      $1,
      $2,
      $3,
      'PENDIENTE',
      NOW(),
      $4
    )
    RETURNING *
  `;

  const values = [
    nombre,
    correo,
    contrasena,
    id_rol,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const createBusinessOwner = async ({
  id_usuario,
  razon_social,
  documento,
  telefono,
}) => {
  const query = `
    INSERT INTO dueno_negocio (
      id_usuario,
      razon_social,
      documento,
      telefono
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const values = [
    id_usuario,
    razon_social,
    documento,
    telefono,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const findUserWithRoleByEmail = async (correo) => {
  const query = `
    SELECT
      u.*,
      r.nombre AS rol
    FROM usuario u
    INNER JOIN rol r
      ON u.id_rol = r.id_rol
    WHERE u.correo = $1
  `;

  const result = await pool.query(query, [correo]);

  return result.rows[0];
};

export const getPendingUsers = async () => {

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

  const result = await pool.query(query);

  return result.rows;

};

export const approveUserModel = async (
  id_usuario
) => {

  const query = `
    UPDATE usuario
    SET estado_usuario = 'APROBADO'
    WHERE id_usuario = $1
    RETURNING *
  `;

  const result = await pool.query(query, [
    id_usuario,
  ]);

  return result.rows[0];

};

export const rejectUserModel = async (
  id_usuario
) => {

  const query = `
    UPDATE usuario
    SET estado_usuario = 'RECHAZADO'
    WHERE id_usuario = $1
    RETURNING *
  `;

  const result = await pool.query(query, [
    id_usuario,
  ]);

  return result.rows[0];

};