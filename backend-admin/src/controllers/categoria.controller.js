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

      const {
        nombre,
        descripcion,
        imagen_url,
      } = req.body;

      // Validar campos
      if (
        !nombre ||
        !descripcion ||
        !imagen_url
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Todos los campos son obligatorios",
        });

      }

      const categoria =
        await createCategoriaService({
          nombre,
          descripcion,
          imagen_url,
        });

      return res.status(201).json({
        ok: true,
        message:
          "Categoría creada correctamente",
        categoria,
      });

    } catch (error) {

      return res.status(500).json({
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

      return res.status(404).json({
        ok: false,
        message: error.message,
      });

    }

};

export const updateCategoria =
  async (req, res) => {

    try {

      const { id } = req.params;

      const {
        nombre,
        descripcion,
        imagen_url,
      } = req.body;

      // Validar campos
      if (
        !nombre ||
        !descripcion ||
        !imagen_url
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Todos los campos son obligatorios",
        });

      }

      const categoria =
        await updateCategoriaService(
          id,
          {
            nombre,
            descripcion,
            imagen_url,
          }
        );

      return res.status(200).json({
        ok: true,
        message:
          "Categoría actualizada correctamente",
        categoria,
      });

    } catch (error) {

      return res.status(500).json({
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

      // Validar boolean
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

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};