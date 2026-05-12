import {
  pool,
} from "../config/db.js";

export const getDashboardStatsController =
  async (req, res) => {

    try {

      const totalUsuarios =
        await pool.query(`
          SELECT COUNT(*)
          FROM usuario
        `);

      const totalNegocios =
        await pool.query(`
          SELECT COUNT(*)
          FROM negocio
        `);

      const negociosAprobados =
        await pool.query(`
          SELECT COUNT(*)
          FROM negocio
          WHERE estado_negocio =
          'APROBADO'
        `);

      const negociosPendientes =
        await pool.query(`
          SELECT COUNT(*)
          FROM negocio
          WHERE estado_negocio =
          'PENDIENTE'
        `);

      const recientes =
        await pool.query(`

          (
            SELECT
  'usuario' AS tipo,
  nombre,
  fecha_registro
  AS fecha_creacion
FROM usuario
          )

          UNION ALL

          (

            SELECT
              'negocio' AS tipo,
              nombre,
              fecha_registro
              AS fecha_creacion

            FROM negocio

          )

          ORDER BY
            fecha_creacion DESC

          LIMIT 5

        `);

      res.json({

        ok: true,

        stats: {

          totalUsuarios:
            Number(
              totalUsuarios
                .rows[0].count
            ),

          totalNegocios:
            Number(
              totalNegocios
                .rows[0].count
            ),

          negociosAprobados:
            Number(
              negociosAprobados
                .rows[0].count
            ),

          negociosPendientes:
            Number(
              negociosPendientes
                .rows[0].count
            ),

        },

        recientes:
          recientes.rows,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        ok: false,
        message:
          "Error dashboard",
      });

    }

};