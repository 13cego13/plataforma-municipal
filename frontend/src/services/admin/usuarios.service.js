import {
  authAPI,
  adminAPI,
} from "../../api/axios";

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

export const getAllUsers =
  async () => {

    const response =
      await authAPI.get(
        "/auth/users"
      );

    return response.data;

};

export const activateUser =
  async (id_usuario) => {

    const response =
      await authAPI.patch(
        `/auth/activate-user/${id_usuario}`
      );

    return response.data;

};

export const rejectUser =
  async (id_usuario) => {

    const response =
      await authAPI.put(
        `/auth/reject-user/${id_usuario}`
      );

    return response.data;

};

export const deactivateUser =
  async (id_usuario) => {

    const response =
      await authAPI.patch(
        `/auth/deactivate-user/${id_usuario}`
      );

    return response.data;

};

export const createUser =
  async (userData) => {

    const response =
      await authAPI.post(
        "/auth/register",
        userData
      );

    return response.data;

};

export const updateUser =
  async (
    id_usuario,
    userData
  ) => {

    const response =
      await authAPI.put(
        `/auth/users/${id_usuario}`,
        userData
      );

    return response.data;

};