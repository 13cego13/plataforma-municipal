import {
  getPublicCategoriasService,
} from "../services/categoria.service.js";

export const getPublicCategorias =
  async (req, res) => {

    try {

      const categorias =
        await getPublicCategoriasService();

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