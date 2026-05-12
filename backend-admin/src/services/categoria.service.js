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

    // Validar duplicado
    const existingCategoria =
      await findCategoriaByName(nombre);

    if (existingCategoria) {

      throw new Error(
        "La categoría ya existe"
      );

    }

    // Crear categoría
    const categoria =
      await createCategoriaModel({
        nombre,
        descripcion,
        imagen_url,
      });

    return categoria;

};
export const getCategoriaByIdService =
  async (id) => {

    const categoria =
      await getCategoriaByIdModel(id);

    if (!categoria) {

      throw new Error(
        "Categoría no encontrada"
      );

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

    // Validar existencia
    const existingCategoria =
      await getCategoriaByIdModel(id);

    if (!existingCategoria) {

      throw new Error(
        "Categoría no encontrada"
      );

    }

    // Validar duplicado
    const duplicatedCategoria =
      await findCategoriaByName(nombre);

    if (
      duplicatedCategoria &&
      duplicatedCategoria.id_categoria !== id
    ) {

      throw new Error(
        "Ya existe una categoría con ese nombre"
      );

    }

    // Actualizar
    const categoria =
      await updateCategoriaModel(
        id,
        {
          nombre,
          descripcion,
          imagen_url,
        }
      );

    return categoria;

};

export const updateCategoriaStatusService =
  async (
    id,
    estado
  ) => {

    // Validar existencia
    const categoria =
      await getCategoriaByIdModel(id);

    if (!categoria) {

      throw new Error(
        "Categoría no encontrada"
      );

    }

    const updatedCategoria =
      await updateCategoriaStatusModel(
        id,
        estado
      );

    return updatedCategoria;

};