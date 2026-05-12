import {
  adminAPI,
} from "../../api/axios";

export const getAllBusinesses =
  async () => {

    const response =
      await adminAPI.get(
        "/negocios"
      );

    return response.data;

};

export const approveBusiness =
  async (id_negocio) => {

    const response =
      await adminAPI.put(
        `/negocios/approve/${id_negocio}`
      );

    return response.data;

};

export const rejectBusiness =
  async (id_negocio) => {

    const response =
      await adminAPI.put(
        `/negocios/reject/${id_negocio}`
      );

    return response.data;

};