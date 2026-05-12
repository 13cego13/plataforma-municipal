import {
  getPendingUsersModel,
  getPendingNegociosModel,
} from "../models/solicitud.model.js";

export const getPendingRequestsService =
  async () => {

    const usuarios_pendientes =
      await getPendingUsersModel();

    const negocios_pendientes =
      await getPendingNegociosModel();

    return {
      usuarios_pendientes,
      negocios_pendientes,
    };

};