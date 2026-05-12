import {
  negociosAPI,
  adminAPI,
} from "../api/axios";

// Categorías públicas
export const getCategorias =
  async () => {

    const response =
      await negociosAPI.get(
        "/categorias"
      );

    return response.data;

};

// Municipios públicos
export const getMunicipios =
  async () => {

    const response =
      await adminAPI.get(
        "/municipios/public"
      );

    return response.data;

};