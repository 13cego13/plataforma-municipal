import {
  getDuenoByUserIdModel,
} from "../models/dueno.model.js";

import {
  createNegocioModel,
} from "../models/negocio.model.js";

import {
  getNegociosByCategoriaModel,
} from "../models/negocio.model.js";

import {
  getNegocioDetailModel,
} from "../models/negocio.model.js";

import {
  getMyNegociosModel,
  updateMyNegocioModel,
  getNegocioByIdModel,
  deactivateNegocioModel,
  activateNegocioModel,
} from "../models/negocio.model.js";

export const createNegocioService =
  async (
    userId,
    negocioData
  ) => {

    // Buscar dueño
    const dueno =
      await getDuenoByUserIdModel(
        userId
      );

    if (!dueno) {

      throw new Error(
        "Dueño de negocio no encontrado"
      );

    }

    // Crear negocio
    const negocio =
      await createNegocioModel({
        id_dueno: dueno.id_dueno,
        ...negocioData,
      });

    return negocio;

};

export const getNegociosByCategoriaService =
  async (id_categoria) => {

    return await
      getNegociosByCategoriaModel(
        id_categoria
      );

};

export const getNegocioDetailService =
  async (id_negocio) => {

    const negocio =
      await getNegocioDetailModel(
        id_negocio
      );

    if (!negocio) {

      throw new Error(
        "Negocio no encontrado"
      );

    }

    return negocio;

};

export const getMyNegociosService =
  async (userId) => {

    const dueno =
      await getDuenoByUserIdModel(
        userId
      );

    if (!dueno) {

      throw new Error(
        "Dueño no encontrado"
      );

    }

    return await getMyNegociosModel(
      dueno.id_dueno
    );

};

export const updateMyNegocioService =
  async (
    userId,
    id_negocio,
    negocioData
  ) => {

    const dueno =
      await getDuenoByUserIdModel(
        userId
      );

    if (!dueno) {

      throw new Error(
        "Dueño no encontrado"
      );

    }

    // Buscar negocio
    const negocio =
      await getNegocioByIdModel(
        id_negocio
      );

    if (!negocio) {

      throw new Error(
        "Negocio no encontrado"
      );

    }

    // Validar propiedad
    if (
      negocio.id_dueno !==
      dueno.id_dueno
    ) {

      throw new Error(
        "No tienes permisos"
      );

    }

    return await updateMyNegocioModel(
      id_negocio,
      negocioData
    );

};

export const deactivateNegocioService =
  async (id_negocio) => {

    return await
      deactivateNegocioModel(
        id_negocio
      );

};

export const activateNegocioService =
  async (id_negocio) => {

    return await
      activateNegocioModel(
        id_negocio
      );

};