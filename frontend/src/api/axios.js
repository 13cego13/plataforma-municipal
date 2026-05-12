import axios from "axios";

const createInstance =
  (baseURL) => {

    const instance =
      axios.create({
        baseURL,
      });

    instance.interceptors.request.use(
      (config) => {

        const token =
          localStorage.getItem(
            "token"
          );

        if (token) {

          config.headers.Authorization =
            `Bearer ${token}`;

        }

        return config;

      }
    );

    return instance;

};

export const authAPI =
  createInstance(
    import.meta.env
      .VITE_AUTH_API
  );

export const adminAPI =
  createInstance(
    import.meta.env
      .VITE_ADMIN_API
  );

export const negociosAPI =
  createInstance(
    import.meta.env
      .VITE_NEGOCIOS_API
  );