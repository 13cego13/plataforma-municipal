import {
  pool,
} from "../config/db.js";

// ========================================
// CATEGORIAS POR MUNICIPIO
// ========================================

export const getCategoriasByMunicipio =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const result =
        await pool.query(`
          SELECT DISTINCT
            c.id_categoria,
            c.nombre,
            c.descripcion,
            c.imagen_url

          FROM negocio n

          INNER JOIN categoria c
          ON n.id_categoria =
             c.id_categoria

          WHERE
            n.id_municipio = $1
            AND n.estado_negocio = 'APROBADO'
            AND c.estado = true

          ORDER BY c.nombre ASC
        `, [id]);

      return res.status(200).json({
        ok: true,
        categorias:
          result.rows,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        ok: false,
        message:
          "Error obteniendo categorías",
      });

    }

};

// ========================================
// NEGOCIOS POR MUNICIPIO + CATEGORIA
// ========================================

export const getNegociosByMunicipioCategoria =
  async (req, res) => {

    try {

      const {
        id,
        id_categoria,
      } = req.params;

      const result =
        await pool.query(`
          SELECT
            n.id_negocio,
            n.nombre,
            n.descripcion,
            n.direccion,
            n.telefono,

            c.nombre AS categoria,

            m.nombre AS municipio,

            img.url_imagen

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
            n.id_municipio = $1
            AND n.id_categoria = $2
            AND n.estado_negocio = 'APROBADO'

          ORDER BY n.nombre ASC
        `,
        [
          id,
          id_categoria,
        ]);

      return res.status(200).json({
        ok: true,
        negocios:
          result.rows,
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