import { supabase }
from "../config/supabase.js";

import {
  createImagenModel,
} from "../models/imagen.model.js";

import {
  getImagesByNegocioModel,
} from "../models/imagen.model.js";

export const uploadMainImageService =
  async (
    file,
    id_negocio
  ) => {

    // Nombre único
    const safeName =
  file.originalname
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "");

const fileName =
  `${Date.now()}-${safeName}`;

    // Subir a Supabase
    const { error } =
      await supabase.storage
        .from("negocios")
        .upload(
          fileName,
          file.buffer,
          {
            contentType:
              file.mimetype,
          }
        );

    if (error) {
        console.log(error);
      throw new Error(
        "Error subiendo imagen"
      );

    }

    // Obtener URL pública
    const {
      data: publicUrlData,
    } = supabase.storage
      .from("negocios")
      .getPublicUrl(fileName);

    // Guardar en PostgreSQL
    const imagen =
      await createImagenModel({
        id_negocio,
        url_imagen:
          publicUrlData.publicUrl,
        orden: 1,
        es_principal: true,
      });

    return imagen;

};

export const uploadGalleryImagesService =
  async (
    files,
    id_negocio
  ) => {

    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {

      const file = files[i];

      const safeName =
  file.originalname
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9.-]/g, "");

const fileName =
  `${Date.now()}-${safeName}`;

      // Upload Supabase
      const { error } =
        await supabase.storage
          .from("negocios")
          .upload(
            fileName,
            file.buffer,
            {
              contentType:
                file.mimetype,
            }
          );

      if (error) {

        throw new Error(
          error.message
        );

      }

      // Public URL
      const {
        data: publicUrlData,
      } = supabase.storage
        .from("negocios")
        .getPublicUrl(fileName);

      // Guardar BD
      const imagen =
        await createImagenModel({
          id_negocio,
          url_imagen:
            publicUrlData.publicUrl,
          orden: i + 1,
          es_principal: false,
        });

      uploadedImages.push(imagen);

    }

    return uploadedImages;

};

export const getGalleryImagesService =
  async (id_negocio) => {

    return await
      getImagesByNegocioModel(
        id_negocio
      );

};