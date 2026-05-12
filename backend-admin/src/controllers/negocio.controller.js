import {
  getPendingNegociosService,
  approveNegocioService,
  rejectNegocioService,
} from "../services/negocio.service.js";

import {
  pool,
} from "../config/db.js";

export const getPendingNegociosController =
  async (req, res) => {

    try {

      const negocios =
        await getPendingNegociosService();

      return res.status(200).json({
        ok: true,
        negocios,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const approveNegocioController =
  async (req, res) => {

    try {

      const { id } = req.params;

      const negocio =
        await approveNegocioService(id);

      return res.status(200).json({
        ok: true,
        message:
          "Negocio aprobado correctamente",
        negocio,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const rejectNegocioController =
  async (req, res) => {

    try {

      const { id } = req.params;

      const negocio =
        await rejectNegocioService(id);

      return res.status(200).json({
        ok: true,
        message:
          "Negocio rechazado correctamente",
        negocio,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const getAllNegociosController =
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT
            n.id_negocio,
            n.nombre,
            n.descripcion,
            n.estado_negocio,
            n.direccion,
            n.telefono,
            n.fecha_registro,

            c.nombre AS categoria,
            m.nombre AS municipio,

            u.nombre AS propietario,
            u.correo,

            img.url_imagen

          FROM negocio n

          INNER JOIN categoria c
            ON n.id_categoria = c.id_categoria

          INNER JOIN municipio m
            ON n.id_municipio = m.id_municipio

          INNER JOIN dueno_negocio dn
            ON n.id_dueno = dn.id_dueno

          INNER JOIN usuario u
            ON dn.id_usuario = u.id_usuario

          LEFT JOIN imagen_negocio img
            ON n.id_negocio = img.id_negocio
            AND img.es_principal = true

          ORDER BY
            n.id_negocio DESC
        `);

      return res.status(200).json({
        ok: true,
        negocios: result.rows,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        ok: false,
        message:
          "Error obteniendo negocios",
      });

    }

};