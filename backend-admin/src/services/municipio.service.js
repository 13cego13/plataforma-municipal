import {
  getAllMunicipios,
} from "../models/municipio.model.js";
import {
  findMunicipioByName,
  createMunicipioModel,
} from "../models/municipio.model.js";
import {
  getMunicipioByIdModel,
} from "../models/municipio.model.js";
import {
  updateMunicipioModel,
} from "../models/municipio.model.js";
import {
  updateMunicipioStatusModel,
} from "../models/municipio.model.js";

export const getMunicipiosService =
  async () => {

    return await getAllMunicipios();

};

export const createMunicipioService =
  async ({
    nombre,
    descripcion,
  }) => {

    // Validar duplicado
    const existingMunicipio =
      await findMunicipioByName(nombre);

    if (existingMunicipio) {

      const error =
        new Error(
          "No se puede registrar un municipio que ya existe"
        );

      error.statusCode = 409;

      throw error;

    }

    const cleanData = {
      nombre:
        nombre.trim(),
      descripcion:
        descripcion.trim(),
    };

    // Crear municipio
    const municipio =
      await createMunicipioModel(
        cleanData
      );

    return municipio;

};

export const getMunicipioByIdService =
  async (id) => {

    const municipio =
      await getMunicipioByIdModel(id);

    if (!municipio) {

      throw new Error(
        "Municipio no encontrado"
      );

    }

    return municipio;

};

export const updateMunicipioService =
  async (
    id,
    {
      nombre,
      descripcion,
    }
  ) => {

    // Buscar municipio actual
    const existingMunicipio =
      await getMunicipioByIdModel(id);

    if (!existingMunicipio) {

      const error =
        new Error(
          "Municipio no encontrado"
        );

      error.statusCode = 404;

      throw error;

    }

    const cleanData = {
      nombre:
        nombre.trim(),
      descripcion:
        descripcion.trim(),
    };

    // Validar nombre duplicado
    const duplicatedMunicipio =
      await findMunicipioByName(
        cleanData.nombre
      );

    if (
      duplicatedMunicipio &&
      duplicatedMunicipio.id_municipio !== id
    ) {

      const error =
        new Error(
          "No se puede registrar un municipio que ya existe"
        );

      error.statusCode = 409;

      throw error;

    }

    // Actualizar
    const municipio =
      await updateMunicipioModel(
        id,
        cleanData
      );

    return municipio;

};

export const updateMunicipioStatusService =
  async (
    id,
    estado
  ) => {

    // Validar existencia
    const municipio =
      await getMunicipioByIdModel(id);

    if (!municipio) {

      const error =
        new Error(
          "Municipio no encontrado"
        );

      error.statusCode = 404;

      throw error;

    }

    const updatedMunicipio =
      await updateMunicipioStatusModel(
        id,
        estado
      );

    return updatedMunicipio;

};

import {
  getPublicMunicipiosModel,
} from "../models/municipio.model.js";

export const getPublicMunicipiosService =
  async () => {

    return await
      getPublicMunicipiosModel();

};



