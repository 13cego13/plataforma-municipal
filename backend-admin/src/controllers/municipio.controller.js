import {
  getMunicipiosService,
} from "../services/municipio.service.js";
import {
  createMunicipioService,
} from "../services/municipio.service.js";
import {
  getMunicipioByIdService,
} from "../services/municipio.service.js";
import {
  updateMunicipioService,
} from "../services/municipio.service.js";
import {
  updateMunicipioStatusService,
} from "../services/municipio.service.js";

export const getMunicipios =
  async (req, res) => {

    try {

      const municipios =
        await getMunicipiosService();

      return res.status(200).json({
        ok: true,
        municipios,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const createMunicipio =
  async (req, res) => {

    try {

      const {
        nombre,
        descripcion,
      } = req.body;

      const cleanNombre =
        nombre?.trim();

      const cleanDescripcion =
        descripcion?.trim();

      // Validar campos
      if (
        !cleanNombre ||
        !cleanDescripcion
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Todos los campos son obligatorios",
        });

      }

      const municipio =
        await createMunicipioService({
          nombre:
            cleanNombre,
          descripcion:
            cleanDescripcion,
        });

      return res.status(201).json({
        ok: true,
        message:
          "Municipio creado correctamente",
        municipio,
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

export const getMunicipioById =
  async (req, res) => {

    try {

      const { id } = req.params;

      const municipio =
        await getMunicipioByIdService(id);

      return res.status(200).json({
        ok: true,
        municipio,
      });

    } catch (error) {

      return res.status(404).json({
        ok: false,
        message: error.message,
      });

    }

};

export const updateMunicipio =
  async (req, res) => {

    try {

      const { id } = req.params;

      const {
        nombre,
        descripcion,
      } = req.body;

      const cleanNombre =
        nombre?.trim();

      const cleanDescripcion =
        descripcion?.trim();

      // Validar campos
      if (
        !cleanNombre ||
        !cleanDescripcion
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Todos los campos son obligatorios",
        });

      }

      const municipio =
        await updateMunicipioService(
          id,
          {
            nombre:
              cleanNombre,
            descripcion:
              cleanDescripcion,
          }
        );

      return res.status(200).json({
        ok: true,
        message:
          "Municipio actualizado correctamente",
        municipio,
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

export const updateMunicipioStatus =
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

      const municipio =
        await updateMunicipioStatusService(
          id,
          estado
        );

      return res.status(200).json({
        ok: true,
        message:
          "Estado actualizado correctamente",
        municipio,
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

import {
  getPublicMunicipiosService,
} from "../services/municipio.service.js";

export const getPublicMunicipios =
  async (req, res) => {

    try {

      const municipios =
        await getPublicMunicipiosService();

      return res.status(200).json({
        ok: true,
        municipios,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};
