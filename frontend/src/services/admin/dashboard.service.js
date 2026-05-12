import {
  adminAPI,
} from "../../api/axios";

export const getDashboardStats =
  async () => {

    const response =
      await adminAPI.get(
        "/dashboard/stats"
      );

    return response.data;

};