function BusinessTable({
  businesses,
  search,
  setSearch,
  handleEditClick,
  handleActivateBusiness,
  handleDeactivateBusiness,
}) {

  const getStatusStyles =
    (estado) => {

      if (
        estado === "APROBADO"
      ) {

        return `
          bg-blue-100
          text-blue-700
        `;

      }

      if (
        estado === "INACTIVO"
      ) {

        return `
          bg-red-100
          text-red-700
        `;

      }

      if (
        estado === "RECHAZADO"
      ) {

        return `
          bg-slate-200
          text-slate-700
        `;

      }

      return `
        bg-yellow-100
        text-yellow-700
      `;

  };

  return (

    <div
      className="
        bg-white
        rounded-3xl
        shadow-sm
        overflow-hidden
        border
        border-slate-200
      "
    >

      {/* HEADER */}
      <div
        className="
          p-6
          border-b
          border-slate-200
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
              font-black
              text-slate-800
            "
          >
            Mis Negocios
          </h2>

          <p
            className="
              text-slate-500
              mt-1
            "
          >
            Gestiona todos tus negocios
          </p>

        </div>

        <input
          type="text"
          placeholder="Buscar negocio..."
          value={
            search
          }
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

              <th
                className="
                  text-left
                  p-5
                  text-slate-500
                  font-semibold
                "
              >
                Negocio
              </th>

              <th
                className="
                  text-left
                  p-5
                  text-slate-500
                  font-semibold
                "
              >
                Dirección
              </th>

              <th
                className="
                  text-left
                  p-5
                  text-slate-500
                  font-semibold
                "
              >
                Teléfono
              </th>

              <th
                className="
                  text-left
                  p-5
                  text-slate-500
                  font-semibold
                "
              >
                Estado
              </th>

              <th
                className="
                  text-left
                  p-5
                  text-slate-500
                  font-semibold
                "
              >
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {
              businesses.length === 0
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
                    No hay negocios disponibles
                  </td>

                </tr>

              )
              : (

                businesses.map(
                  (
                    business
                  ) => (

                    <tr
                      key={
                        business.id_negocio
                      }
                      className="
                        border-t
                        border-slate-100
                        hover:bg-slate-50
                        transition-all
                      "
                    >

                      {/* NEGOCIO */}
                      <td
                        className="
                          p-5
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-4
                          "
                        >

                          {/* IMAGEN */}
                          {
                            business.imagen_principal
                            ? (

                              <img
                                src={
                                  business.imagen_principal
                                }
                                alt={
                                  business.nombre
                                }
                                className="
                                  w-16
                                  h-16
                                  rounded-2xl
                                  object-cover
                                  shadow-md
                                "
                              />

                            )
                            : (

                              <div
                                className="
                                  w-16
                                  h-16
                                  rounded-2xl
                                  bg-slate-200
                                  flex
                                  items-center
                                  justify-center
                                  text-slate-500
                                  font-bold
                                "
                              >
                                N/A
                              </div>

                            )
                          }

                          <div>

                            <h3
                              className="
                                font-bold
                                text-slate-800
                                text-lg
                              "
                            >
                              {
                                business.nombre
                              }
                            </h3>

                            <p
                              className="
                                text-sm
                                text-slate-500
                                mt-1
                                max-w-xs
                                truncate
                              "
                            >
                              {
                                business.descripcion
                              }
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* DIRECCION */}
                      <td
                        className="
                          p-5
                          text-slate-600
                        "
                      >
                        {
                          business.direccion
                        }
                      </td>

                      {/* TELEFONO */}
                      <td
                        className="
                          p-5
                          text-slate-600
                        "
                      >
                        {
                          business.telefono
                        }
                      </td>

                      {/* ESTADO */}
                      <td
                        className="
                          p-5
                        "
                      >

                        <span
                          className={`
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                            ${getStatusStyles(
                              business.estado_negocio
                            )}
                          `}
                        >
                          {
                            business.estado_negocio
                          }
                        </span>

                      </td>

                      {/* ACCIONES */}
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
                                handleEditClick(
                                  business
                                )
                            }
                            className="
                              bg-yellow-500
                              hover:bg-yellow-600
                              transition-all
                              text-white
                              px-4
                              py-2
                              rounded-xl
                              font-medium
                            "
                          >
                            Editar
                          </button>

                          {
  business.estado_negocio ===
  "PENDIENTE"
  ? (

    <button
      disabled
      className="
        bg-amber-100
        text-amber-700
        px-4
        py-2
        rounded-xl
        font-medium
        cursor-not-allowed
      "
    >
      Esperando aprobación
    </button>

  )

  : business.estado_negocio ===
    "RECHAZADO"
  ? (

    <button
      disabled
      className="
        bg-slate-300
        text-slate-600
        px-4
        py-2
        rounded-xl
        font-medium
        cursor-not-allowed
      "
    >
      Negocio rechazado
    </button>

  )

  : business.estado_negocio ===
    "APROBADO"
  ? (

    <button
      onClick={
        () =>
          handleDeactivateBusiness(
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
      Desactivar
    </button>

  )

  : business.estado_negocio ===
    "INACTIVO"
  ? (

    <button
      onClick={
        () =>
          handleActivateBusiness(
            business.id_negocio
          )
      }
      className="
        bg-emerald-600
        hover:bg-emerald-700
        transition-all
        text-white
        px-4
        py-2
        rounded-xl
        font-medium
      "
    >
      Activar
    </button>

  )

  : (

    <span
      className="
        text-slate-400
        text-sm
      "
    >
      Sin acciones
    </span>

  )
}

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

export default BusinessTable;