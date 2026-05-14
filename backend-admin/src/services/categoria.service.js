import {
  getAllCategorias,
} from "../models/categoria.model.js";
import {
  findCategoriaByName,
  createCategoriaModel,
} from "../models/categoria.model.js";
import {
  getCategoriaByIdModel,
} from "../models/categoria.model.js";
import {
  updateCategoriaModel,
} from "../models/categoria.model.js";
import {
  updateCategoriaStatusModel,
} from "../models/categoria.model.js";

export const getCategoriasService =
  async () => {

    return await getAllCategorias();

};

export const createCategoriaService =
  async ({
    nombre,
    descripcion,
    imagen_url,
  }) => {

    const existingCategoria =
      await findCategoriaByName(nombre);

    if (existingCategoria) {

      const error =
        new Error(
          "No se puede registrar una categoria que ya existe"
        );

      error.statusCode = 409;

      throw error;

    }

    const cleanData = {
      nombre:
        nombre.trim(),
      descripcion:
        descripcion.trim(),
      imagen_url:
        imagen_url.trim(),
    };

    const categoria =
      await createCategoriaModel(
        cleanData
      );

    return categoria;

};

export const getCategoriaByIdService =
  async (id) => {

    const categoria =
      await getCategoriaByIdModel(id);

    if (!categoria) {

      const error =
        new Error(
          "Categoria no encontrada"
        );

      error.statusCode = 404;

      throw error;

    }

    return categoria;

};

export const updateCategoriaService =
  async (
    id,
    {
      nombre,
      descripcion,
      imagen_url,
    }
  ) => {

    const existingCategoria =
      await getCategoriaByIdModel(id);

    if (!existingCategoria) {

      const error =
        new Error(
          "Categoria no encontrada"
        );

      error.statusCode = 404;

      throw error;

    }

    const cleanData = {
      nombre:
        nombre.trim(),
      descripcion:
        descripcion.trim(),
      imagen_url:
        imagen_url.trim(),
    };

    const duplicatedCategoria =
      await findCategoriaByName(
        cleanData.nombre
      );

    if (
      duplicatedCategoria &&
      duplicatedCategoria.id_categoria !== id
    ) {

      const error =
        new Error(
          "No se puede registrar una categoria que ya existe"
        );

      error.statusCode = 409;

      throw error;

    }

    const categoria =
      await updateCategoriaModel(
        id,
        cleanData
      );

    return categoria;

};

export const updateCategoriaStatusService =
  async (
    id,
    estado
  ) => {

    const categoria =
      await getCategoriaByIdModel(id);

    if (!categoria) {

      const error =
        new Error(
          "Categoria no encontrada"
        );

      error.statusCode = 404;

      throw error;

    }

    const updatedCategoria =
      await updateCategoriaStatusModel(
        id,
        estado
      );

    return updatedCategoria;

};
