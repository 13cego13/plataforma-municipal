import {
  getPendingRequestsService,
} from "../services/solicitud.service.js";

export const getPendingRequests =
  async (req, res) => {

    try {

      const data =
        await getPendingRequestsService();

      return res.status(200).json({
        ok: true,
        ...data,
      });

    } catch (error) {

      return res.status(500).json({
        ok: false,
        message: error.message,
      });

    }

};