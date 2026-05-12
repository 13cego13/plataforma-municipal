import {
  authAPI,
  adminAPI,
} from "../api/axios";

// Usuarios pendientes
export const getPendingUsers =
  async () => {

    const response =
      await authAPI.get(
        "/auth/pending-users"
      );

    return response.data;

};

// Aprobar usuario
export const approveUser =
  async (id_usuario) => {

    const response =
      await authAPI.put(
        `/auth/approve-user/${id_usuario}`
      );

    return response.data;

};

// Negocios pendientes
export const getPendingBusinesses =
  async () => {

    const response =
      await adminAPI.get(
        "/negocios/pending"
      );

    return response.data;

};

// Aprobar negocio
export const approveBusiness =
  async (id_negocio) => {

    const response =
      await adminAPI.put(
        `/negocios/approve/${id_negocio}`
      );

    return response.data;

};