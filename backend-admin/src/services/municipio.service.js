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

      throw new Error(
        "El municipio ya existe"
      );

    }

    // Crear municipio
    const municipio =
      await createMunicipioModel({
        nombre,
        descripcion,
      });

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

      throw new Error(
        "Municipio no encontrado"
      );

    }

    // Validar nombre duplicado
    const duplicatedMunicipio =
      await findMunicipioByName(nombre);

    if (
      duplicatedMunicipio &&
      duplicatedMunicipio.id_municipio !== id
    ) {

      throw new Error(
        "Ya existe un municipio con ese nombre"
      );

    }

    // Actualizar
    const municipio =
      await updateMunicipioModel(
        id,
        {
          nombre,
          descripcion,
        }
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

      throw new Error(
        "Municipio no encontrado"
      );

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



