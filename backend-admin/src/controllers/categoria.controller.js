import {
  getCategoriasService,
} from "../services/categoria.service.js";
import {
  createCategoriaService,
} from "../services/categoria.service.js";
import {
  getCategoriaByIdService,
} from "../services/categoria.service.js";
import {
  updateCategoriaService,
} from "../services/categoria.service.js";
import {
  updateCategoriaStatusService,
} from "../services/categoria.service.js";

const isValidImageUrl =
  (value) => {

    try {

      const url =
        new URL(value);

      if (
        !["http:", "https:"]
          .includes(url.protocol)
      ) {

        return false;

      }

      return /\.(jpg|jpeg|png|webp|gif|svg|avif)$/i
        .test(url.pathname);

    } catch {

      return false;

    }

};

const getCleanCategoriaData =
  ({
    nombre,
    descripcion,
    imagen_url,
  }) => ({
    nombre:
      nombre?.trim(),
    descripcion:
      descripcion?.trim(),
    imagen_url:
      imagen_url?.trim(),
  });

export const getCategorias =
  async (req, res) => {

    try {

      const categorias =
        await getCategoriasService();

      return res.status(200).json({
        ok: true,
        categorias,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const createCategoria =
  async (req, res) => {

    try {

      const cleanData =
        getCleanCategoriaData(
          req.body
        );

      if (
        !cleanData.nombre ||
        !cleanData.descripcion ||
        !cleanData.imagen_url
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Todos los campos son obligatorios",
        });

      }

      if (
        !isValidImageUrl(
          cleanData.imagen_url
        )
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Ingresa una URL de imagen valida",
        });

      }

      const categoria =
        await createCategoriaService(
          cleanData
        );

      return res.status(201).json({
        ok: true,
        message:
          "Categoria creada correctamente",
        categoria,
      });

    } catch (error) {

      return res.status(
        error.statusCode || 500
      ).json({
        ok: false,
        message: error.message,
      });

    }

};

export const getCategoriaById =
  async (req, res) => {

    try {

      const { id } = req.params;

      const categoria =
        await getCategoriaByIdService(id);

      return res.status(200).json({
        ok: true,
        categoria,
      });

    } catch (error) {

      return res.status(
        error.statusCode || 404
      ).json({
        ok: false,
        message: error.message,
      });

    }

};

export const updateCategoria =
  async (req, res) => {

    try {

      const { id } = req.params;

      const cleanData =
        getCleanCategoriaData(
          req.body
        );

      if (
        !cleanData.nombre ||
        !cleanData.descripcion ||
        !cleanData.imagen_url
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Todos los campos son obligatorios",
        });

      }

      if (
        !isValidImageUrl(
          cleanData.imagen_url
        )
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Ingresa una URL de imagen valida",
        });

      }

      const categoria =
        await updateCategoriaService(
          id,
          cleanData
        );

      return res.status(200).json({
        ok: true,
        message:
          "Categoria actualizada correctamente",
        categoria,
      });

    } catch (error) {

      return res.status(
        error.statusCode || 500
      ).json({
        ok: false,
        message: error.message,
      });

    }

};

export const updateCategoriaStatus =
  async (req, res) => {

    try {

      const { id } = req.params;

      const { estado } = req.body;

      if (
        typeof estado !== "boolean"
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "El estado debe ser true o false",
        });

      }

      const categoria =
        await updateCategoriaStatusService(
          id,
          estado
        );

      return res.status(200).json({
        ok: true,
        message:
          "Estado actualizado correctamente",
        categoria,
      });

    } catch (error) {

      return res.status(
        error.statusCode || 500
      ).json({
        ok: false,
        message: error.message,
      });

    }

};
