import {
  getPublicCategoriasModel,
} from "../models/categoria.model.js";

export const getPublicCategoriasService =
  async () => {

    return await
      getPublicCategoriasModel();

};