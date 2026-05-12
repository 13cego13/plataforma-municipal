import {
  useEffect,
  useState,
} from "react";

import {
  getPendingBusinesses,
  approveBusiness,
  rejectBusiness,
} from "../../services/admin/negocios.service";

function NegociosPendientes() {

  const [businesses, setBusinesses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadBusinesses();

  }, []);

  const loadBusinesses =
    async () => {

      try {

        const data =
          await getPendingBusinesses();

        setBusinesses(
          data.negocios
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };

  const handleApprove =
    async (id_negocio) => {

      try {

        await approveBusiness(
          id_negocio
        );

        loadBusinesses();

      } catch (error) {

        console.log(error);

      }

  };

  const handleReject =
    async (id_negocio) => {

      try {

        await rejectBusiness(
          id_negocio
        );

        loadBusinesses();

      } catch (error) {

        console.log(error);

      }

  };

  const filteredBusinesses =
    businesses.filter(
      (business) => {

        return (
          business.nombre
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );

      }
    );

  if (loading) {

    return (
      <p>
        Cargando...
      </p>
    );

  }

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        overflow-hidden
      "
    >

      {/* HEADER */}
      <div
        className="
          p-6
          border-b
          flex
          flex-col
          lg:flex-row
          justify-between
          items-center
          gap-4
        "
      >

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-800
            "
          >
            Negocios Pendientes
          </h2>

          <p
            className="
              text-slate-500
              mt-1
            "
          >
            Administra solicitudes de negocios
          </p>

        </div>

        <input
          type="text"
          placeholder="Buscar negocio..."
          value={search}
          onChange={
            (e) =>
              setSearch(
                e.target.value
              )
          }
          className="
            border
            border-slate-300
            rounded-2xl
            px-4
            py-3
            w-full
            lg:w-80
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "
        />

      </div>

      {/* TABLE */}
      <div
        className="
          overflow-x-auto
        "
      >

        <table
          className="
            w-full
          "
        >

          <thead
            className="
              bg-slate-50
            "
          >

            <tr>

              <th className="p-5 text-left">
                Negocio
              </th>

              <th className="p-5 text-left">
                Categoría
              </th>

              <th className="p-5 text-left">
                Municipio
              </th>

              <th className="p-5 text-left">
                Estado
              </th>

              <th className="p-5 text-left">
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredBusinesses
                .length === 0
              ? (

                <tr>

                  <td
                    colSpan="5"
                    className="
                      text-center
                      py-12
                      text-slate-500
                    "
                  >
                    No hay negocios pendientes
                  </td>

                </tr>

              )
              : (

                filteredBusinesses.map(
                  (business) => (

                    <tr
                      key={
                        business.id_negocio
                      }
                      className="
                        border-t
                        hover:bg-slate-50
                        transition-all
                      "
                    >

                      <td
                        className="
                          p-5
                          font-semibold
                          text-slate-800
                        "
                      >
                        {business.nombre}
                      </td>

                      <td
                        className="
                          p-5
                        "
                      >
                        {business.categoria}
                      </td>

                      <td
                        className="
                          p-5
                        "
                      >
                        {business.municipio}
                      </td>

                      <td
                        className="
                          p-5
                        "
                      >

                        <span
                          className="
                            bg-yellow-100
                            text-yellow-700
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                          "
                        >
                          PENDIENTE
                        </span>

                      </td>

                      <td
                        className="
                          p-5
                        "
                      >

                        <div
                          className="
                            flex
                            gap-3
                            flex-wrap
                          "
                        >

                          <button
                            onClick={
                              () =>
                                handleApprove(
                                  business.id_negocio
                                )
                            }
                            className="
                              bg-green-600
                              hover:bg-green-700
                              transition-all
                              text-white
                              px-4
                              py-2
                              rounded-xl
                              font-medium
                            "
                          >
                            Aprobar
                          </button>

                          <button
                            onClick={
                              () =>
                                handleReject(
                                  business.id_negocio
                                )
                            }
                            className="
                              bg-red-500
                              hover:bg-red-600
                              transition-all
                              text-white
                              px-4
                              py-2
                              rounded-xl
                              font-medium
                            "
                          >
                            Rechazar
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )
            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default NegociosPendientes;