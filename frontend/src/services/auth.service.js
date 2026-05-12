import {
  authAPI,
} from "../api/axios";

export const loginRequest =
  async (userData) => {

    const response =
      await authAPI.post(
        "/auth/login",
        userData
      );

    return response.data;

};