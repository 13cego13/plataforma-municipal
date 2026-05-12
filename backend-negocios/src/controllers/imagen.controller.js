import {
   uploadMainImageService,
  uploadGalleryImagesService,
  getGalleryImagesService,
} from "../services/imagen.service.js";



export const uploadMainImage =
  async (req, res) => {

    try {

      const { id_negocio } =
        req.params;

      if (!req.file) {

        return res.status(400).json({
          ok: false,
          message:
            "Imagen requerida",
        });

      }

      const imagen =
        await uploadMainImageService(
          req.file,
          id_negocio
        );

      return res.status(201).json({
        ok: true,
        message:
          "Imagen subida correctamente",
        imagen,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const uploadGalleryImages =
  async (req, res) => {

    try {

      const { id_negocio } =
        req.params;

      if (
        !req.files ||
        req.files.length === 0
      ) {

        return res.status(400).json({
          ok: false,
          message:
            "Imágenes requeridas",
        });

      }

      const imagenes =
        await uploadGalleryImagesService(
          req.files,
          id_negocio
        );

      return res.status(201).json({
        ok: true,
        message:
          "Galería subida correctamente",
        imagenes,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};

export const getGalleryImages =
  async (req, res) => {

    try {

      const { id_negocio } =
        req.params;

      const imagenes =
        await getGalleryImagesService(
          id_negocio
        );

      return res.status(200).json({
        ok: true,
        imagenes,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};
