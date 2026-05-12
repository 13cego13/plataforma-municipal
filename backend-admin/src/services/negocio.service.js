import {
  getPendingNegocios,
  approveNegocioModel,
  rejectNegocioModel,
  getNegocioByIdModel,
} from "../models/negocio.model.js";



export const getPendingNegociosService =
  async () => {

    return await getPendingNegocios();

};

export const approveNegocioService =
  async (id) => {

    const negocio =
      await getNegocioByIdModel(id);

    if (!negocio) {

      throw new Error(
        "Negocio no encontrado"
      );

    }

    return await approveNegocioModel(id);

};

export const rejectNegocioService =
  async (id) => {

    const negocio =
      await getNegocioByIdModel(id);

    if (!negocio) {

      throw new Error(
        "Negocio no encontrado"
      );

    }

    return await rejectNegocioModel(id);

};

