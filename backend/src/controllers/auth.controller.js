import { registerService } from "../services/auth.service.js";
import {
  loginService,
} from "../services/auth.service.js";
import {
  getPendingUsersService,
  approveUserService,
  rejectUserService,
} from "../services/auth.service.js";
import { pool }
from "../config/db.js";

export const register = async (req, res) => {
  try {
    const {
      nombre,
      correo,
      contrasena,
      razon_social,
      documento,
      telefono,
    } = req.body;

    // Validaciones básicas
    if (
      !nombre ||
      !correo ||
      !contrasena ||
      !razon_social ||
      !documento ||
      !telefono
    ) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos son obligatorios",
      });
    }

    // Password mínima
    if (contrasena.length < 8) {
      return res.status(400).json({
        ok: false,
        message:
          "La contraseña debe tener mínimo 8 caracteres",
      });
    }

    const result = await registerService(req.body);

    return res.status(201).json({
      ok: true,
      message: result.message,
      data: result.user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {

    const {
      correo,
      contrasena,
    } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({
        ok: false,
        message: "Correo y contraseña son obligatorios",
      });
    }

    const result = await loginService({
      correo,
      contrasena,
    });

    return res.status(200).json({
      ok: true,
      message: "Login exitoso",
      token: result.token,
      user: result.user,
    });

  } catch (error) {

    return res.status(401).json({
      ok: false,
      message: error.message,
    });

  }
};

export const profile = async (req, res) => {

  try {

    return res.status(200).json({
      ok: true,
      message: "Perfil usuario autenticado",
      user: req.user,
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};

export const adminPanel = async (req, res) => {

  try {

    return res.status(200).json({
      ok: true,
      message: "Bienvenido administrador",
      user: req.user,
    });

  } catch (error) {

    return res.status(500).json({
      ok: false,
      message: error.message,
    });

  }

};
export const getPendingUsersController =
  async (req, res) => {

    try {

      const users =
        await getPendingUsersService();

      return res.status(200).json({
        ok: true,
        users,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const approveUserController =
  async (req, res) => {

    try {

      const { id } = req.params;

      const user =
        await approveUserService(id);

      return res.status(200).json({
        ok: true,
        message: "Usuario aprobado",
        user,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const rejectUserController =
  async (req, res) => {

    try {

      const { id } = req.params;

      const user =
        await rejectUserService(id);

      return res.status(200).json({
        ok: true,
        message: "Usuario rechazado",
        user,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const getAllUsersController =
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT
            u.id_usuario,
            u.nombre,
            u.correo,
            u.estado_usuario,
            r.nombre AS rol,

            dn.telefono,
            dn.documento,
            dn.razon_social

          FROM usuario u

          INNER JOIN rol r
            ON u.id_rol = r.id_rol

          LEFT JOIN dueno_negocio dn
            ON u.id_usuario = dn.id_usuario

          ORDER BY
            u.fecha_registro DESC
        `);

      res.json({
        ok: true,
        users: result.rows,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        ok: false,
        message:
          "Error obteniendo usuarios",
      });

    }

};

export const activateUserController =
  async (req, res) => {

    try {

      const {
        id,
      } = req.params;

      await pool.query(`
        UPDATE usuario
        SET estado_usuario = 'APROBADO'
        WHERE id_usuario = $1
      `, [id]);

      res.json({
        ok: true,
        message:
          "Usuario activado",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        ok: false,
        message:
          "Error activando usuario",
      });

    }

};

export const deactivateUserController =
  async (req, res) => {

    try {

      const {
        id,
      } = req.params;

      await pool.query(`
        UPDATE usuario
        SET estado_usuario = 'INACTIVO'
        WHERE id_usuario = $1
      `, [id]);

      res.json({
        ok: true,
        message:
          "Usuario desactivado",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        ok: false,
        message:
          "Error desactivando usuario",
      });

    }

};

export const updateUserController =
  async (req, res) => {

    try {

      const {
        id,
      } = req.params;

      const {
        nombre,
        correo,
        telefono,
        razon_social,
        documento,
        rol,
        estado_usuario,
      } = req.body;

      // Buscar id_rol
      const roleResult =
        await pool.query(`
          SELECT id_rol
          FROM rol
          WHERE nombre = $1
        `, [rol]);

      if (
        roleResult.rows.length === 0
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Rol inválido",
        });

      }

      const id_rol =
        roleResult.rows[0].id_rol;

      // Actualizar usuario
      const userResult =
        await pool.query(`
          UPDATE usuario
          SET
            nombre = $1,
            correo = $2,
            id_rol = $3,
            estado_usuario = $4
          WHERE id_usuario = $5
          RETURNING *
        `, [
          nombre,
          correo,
          id_rol,
          estado_usuario,
          id,
        ]);

      // Actualizar datos de dueño
      await pool.query(`
        UPDATE dueno_negocio
        SET
          telefono = $1,
          razon_social = $2,
          documento = $3
        WHERE id_usuario = $4
      `, [
        telefono,
        razon_social,
        documento,
        id,
      ]);

      res.json({
        ok: true,
        user: userResult.rows[0],
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        ok: false,
        message:
          "Error actualizando usuario",
      });

    }

};