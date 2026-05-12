import {
  createNegocioService,
} from "../services/negocio.service.js";

import {
  getNegociosByCategoriaService,
} from "../services/negocio.service.js";

import {
  getNegocioDetailService,
} from "../services/negocio.service.js";

import {
  getMyNegociosService,
  updateMyNegocioService,
  deactivateNegocioService,
  activateNegocioService,
} from "../services/negocio.service.js";

export const createNegocio =
  async (req, res) => {

    try {

      const {
        id_categoria,
        id_municipio,
        nombre,
        descripcion,
        direccion,
        telefono,
      } = req.body;

      // Validar campos
      if (
        !id_categoria ||
        !id_municipio ||
        !nombre ||
        !descripcion ||
        !direccion ||
        !telefono
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Todos los campos son obligatorios",
        });

      }

      const negocio =
        await createNegocioService(
          req.user.id_usuario,
          {
            id_categoria,
            id_municipio,
            nombre,
            descripcion,
            direccion,
            telefono,
          }
        );

      return res.status(201).json({
        ok: true,
        message:
          "Negocio registrado correctamente",
        negocio,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const getNegociosByCategoria =
  async (req, res) => {

    try {

      const { id_categoria } =
        req.params;

      const negocios =
        await getNegociosByCategoriaService(
          id_categoria
        );

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

export const getNegocioDetail =
  async (req, res) => {

    try {

      const { id_negocio } =
        req.params;

      const negocio =
        await getNegocioDetailService(
          id_negocio
        );

      return res.status(200).json({
        ok: true,
        negocio,
      });

    } catch (error) {

      return res.status(404).json({
        ok: false,
        message: error.message,
      });

    }

};

export const getMyNegocios =
  async (req, res) => {

    try {

      const negocios =
        await getMyNegociosService(
          req.user.id_usuario
        );

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

export const updateMyNegocio =
  async (req, res) => {

    try {

      const { id_negocio } =
        req.params;

      const negocio =
        await updateMyNegocioService(
          req.user.id_usuario,
          id_negocio,
          req.body
        );

      return res.status(200).json({
        ok: true,
        message:
          "Negocio actualizado correctamente",
        negocio,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const deactivateNegocio =
  async (req, res) => {

    try {

      const { id_negocio } =
        req.params;

      const negocio =
        await deactivateNegocioService(
          id_negocio
        );

      return res.status(200).json({
        ok: true,
        message:
          "Negocio desactivado",
        negocio,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const activateNegocio =
  async (req, res) => {

    try {

      const { id_negocio } =
        req.params;

      const negocio =
        await activateNegocioService(
          id_negocio
        );

      return res.status(200).json({
        ok: true,
        message:
          "Negocio activado",
        negocio,
      });

    } catch (error) {

      console.log(error);

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};