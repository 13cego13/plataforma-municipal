import {
  negociosAPI,
} from "../api/axios";

// ========================================
// MIS NEGOCIOS
// ========================================

export const getMyBusinesses =
  async () => {

    const response =
      await negociosAPI.get(
        "/negocios/my-business"
      );

    return response.data;

};

// ========================================
// CREAR NEGOCIO
// ========================================

export const createBusiness =
  async (businessData) => {

    const response =
      await negociosAPI.post(
        "/negocios",
        businessData
      );

    return response.data;

};

// ========================================
// SUBIR IMAGEN PRINCIPAL
// ========================================

export const uploadMainImage =
  async (
    id_negocio,
    formData
  ) => {

    const response =
      await negociosAPI.post(
        `/imagenes/main/${id_negocio}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;

};

// ========================================
// SUBIR GALERIA
// ========================================

export const uploadGalleryImages =
  async (
    id_negocio,
    formData
  ) => {

    const response =
      await negociosAPI.post(
        `/imagenes/gallery/${id_negocio}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;

};

// ========================================
// EDITAR NEGOCIO
// ========================================

export const updateBusiness =
  async (
    id_negocio,
    businessData
  ) => {

    const response =
      await negociosAPI.put(
        `/negocios/my-business/${id_negocio}`,
        businessData
      );

    return response.data;

};

// ========================================
// DESACTIVAR
// ========================================

export const deactivateBusiness =
  async (id_negocio) => {

    const response =
      await negociosAPI.put(
        `/negocios/deactivate/${id_negocio}`
      );

    return response.data;

};

// ========================================
// ACTIVAR
// ========================================

export const activateBusiness =
  async (id_negocio) => {

    const response =
      await negociosAPI.put(
        `/negocios/activate/${id_negocio}`
      );

    return response.data;

};