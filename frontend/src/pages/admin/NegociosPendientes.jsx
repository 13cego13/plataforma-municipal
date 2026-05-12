import {
  useEffect,
  useState,
} from "react";

import {
  Building2,
  Search,
  MapPin,
  Tags,
  Eye,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  User,
} from "lucide-react";

import {
  getAllBusinesses,
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

  const [showModal, setShowModal] =
    useState(false);

  const [selectedBusiness,
    setSelectedBusiness] =
      useState(null);

  useEffect(() => {

    loadBusinesses();

  }, []);

  const loadBusinesses =
    async () => {

      try {

        const data =
          await getAllBusinesses();

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

      <div
        className="
          h-[70vh]
          flex
          items-center
          justify-center
        "
      >

        <div
          className="
            w-14
            h-14
            border-4
            border-slate-200
            border-t-slate-800
            rounded-full
            animate-spin
          "
        />

      </div>

    );

  }

  return (

    <>

      <div
        className="
          min-h-screen
          bg-slate-100
          p-6
          rounded-3xl
        "
      >

        {/* HERO */}
        <div
          className="
            bg-gradient-to-r
            from-slate-900
            via-slate-800
            to-slate-900
            rounded-[32px]
            p-10
            text-white
            shadow-2xl
            relative
            overflow-hidden
            mb-8
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-96
              h-96
              bg-white/5
              rounded-full
              blur-3xl
            "
          />

          <div className="relative z-10">

            <p
              className="
                uppercase
                tracking-[5px]
                text-slate-300
                text-sm
                mb-4
              "
            >
              Administración
            </p>

            <h1
              className="
                text-5xl
                font-black
              "
            >
              Gestión de Negocios
            </h1>

            <p
              className="
                text-slate-300
                mt-4
                text-lg
                max-w-2xl
              "
            >
              Administra, aprueba y
              visualiza todos los
              negocios registrados
              en la plataforma.
            </p>

          </div>

        </div>

        {/* CONTENIDO */}
        <div
          className="
            bg-white
            rounded-[30px]
            shadow-sm
            border
            border-slate-200
            overflow-hidden
          "
        >

          {/* HEADER */}
          <div
            className="
              p-8
              border-b
              border-slate-100
              flex
              flex-col
              lg:flex-row
              justify-between
              items-center
              gap-5
            "
          >

            <div>

              <h2
                className="
                  text-3xl
                  font-black
                  text-slate-800
                "
              >
                Lista de Negocios
              </h2>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >
                Total registrados:
                {" "}
                {
                  businesses.length
                }
              </p>

            </div>

            {/* SEARCH */}
            <div
              className="
                relative
                w-full
                lg:w-96
              "
            >

              <Search
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-slate-400
                "
                size={20}
              />

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
                  w-full
                  bg-slate-100
                  border
                  border-slate-200
                  rounded-2xl
                  pl-12
                  pr-5
                  py-4
                  outline-none
                  focus:ring-2
                  focus:ring-slate-300
                "
              />

            </div>

          </div>

          {/* TABLA */}
          <div className="overflow-x-auto">

            <table className="w-full">

              <thead
                className="
                  bg-slate-50
                "
              >

                <tr>

                  <th className="p-6 text-left">
                    Negocio
                  </th>

                  <th className="p-6 text-left">
                    Categoría
                  </th>

                  <th className="p-6 text-left">
                    Municipio
                  </th>

                  <th className="p-6 text-left">
                    Estado
                  </th>

                  <th className="p-6 text-left">
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
                          py-20
                          text-slate-500
                        "
                      >
                        No hay negocios
                        registrados
                      </td>

                    </tr>

                  )
                  : (

                    filteredBusinesses.map(
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

                          <td className="p-6">

                            <div
                              className="
                                flex
                                items-center
                                gap-4
                              "
                            >

                              <div
                                className="
                                  w-14
                                  h-14
                                  rounded-2xl
                                  bg-slate-100
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <Building2
                                  className="
                                    text-slate-700
                                  "
                                />

                              </div>

                              <div>

                                <p
                                  className="
                                    font-bold
                                    text-slate-800
                                  "
                                >
                                  {
                                    business.nombre
                                  }
                                </p>

                                <p
                                  className="
                                    text-sm
                                    text-slate-500
                                  "
                                >
                                  {
                                    business.propietario
                                  }
                                </p>

                              </div>

                            </div>

                          </td>

                          <td className="p-6">

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-slate-700
                              "
                            >

                              <Tags
                                size={18}
                              />

                              {
                                business.categoria
                              }

                            </div>

                          </td>

                          <td className="p-6">

                            <div
                              className="
                                flex
                                items-center
                                gap-2
                                text-slate-700
                              "
                            >

                              <MapPin
                                size={18}
                              />

                              {
                                business.municipio
                              }

                            </div>

                          </td>

                          <td className="p-6">

                            <span
                              className={`
                                px-4
                                py-2
                                rounded-2xl
                                text-sm
                                font-bold

                                ${
                                  business.estado_negocio ===
                                  "APROBADO"
                                  ? `
                                    bg-green-100
                                    text-green-700
                                  `
                                  : business.estado_negocio ===
                                    "RECHAZADO"
                                  ? `
                                    bg-red-100
                                    text-red-700
                                  `
                                  : `
                                    bg-yellow-100
                                    text-yellow-700
                                  `
                                }
                              `}
                            >

                              {
                                business.estado_negocio
                              }

                            </span>

                          </td>

                          <td className="p-6">

                            <div
                              className="
                                flex
                                gap-3
                                flex-wrap
                              "
                            >

                              <button
                                onClick={
                                  () => {

                                    setSelectedBusiness(
                                      business
                                    );

                                    setShowModal(
                                      true
                                    );

                                  }
                                }
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  bg-slate-800
                                  hover:bg-slate-900
                                  text-white
                                  px-5
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  transition-all
                                "
                              >

                                <Eye
                                  size={18}
                                />

                                Ver

                              </button>

                              <button
                                onClick={
                                  () =>
                                    handleApprove(
                                      business.id_negocio
                                    )
                                }
                                className="
                                  flex
                                  items-center
                                  gap-2
                                  bg-green-600
                                  hover:bg-green-700
                                  text-white
                                  px-5
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  transition-all
                                "
                              >

                                <CheckCircle2
                                  size={18}
                                />

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
                                  flex
                                  items-center
                                  gap-2
                                  bg-red-500
                                  hover:bg-red-600
                                  text-white
                                  px-5
                                  py-3
                                  rounded-2xl
                                  font-semibold
                                  transition-all
                                "
                              >

                                <XCircle
                                  size={18}
                                />

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

      </div>

      {/* MODAL */}
      {
        showModal
        &&
        selectedBusiness
        && (

          <div
            className="
              fixed
              inset-0
              bg-black/60
              backdrop-blur-sm
              flex
              items-center
              justify-center
              z-50
              p-6
            "
          >

            <div
              className="
                bg-white
                rounded-[32px]
                w-full
                max-w-5xl
                overflow-hidden
                shadow-2xl
              "
            >

              {/* HEADER */}
              <div
                className="
                  bg-gradient-to-r
                  from-slate-900
                  to-slate-800
                  text-white
                  p-8
                "
              >

                <div
                  className="
                    flex
                    justify-between
                    items-start
                  "
                >

                  <div>

                    <p
                      className="
                        uppercase
                        tracking-[4px]
                        text-slate-300
                        text-xs
                        mb-3
                      "
                    >
                      Información del Negocio
                    </p>

                    <h2
                      className="
                        text-4xl
                        font-black
                      "
                    >
                      {
                        selectedBusiness.nombre
                      }
                    </h2>

                    <p
                      className="
                        text-slate-300
                        mt-3
                      "
                    >
                      {
                        selectedBusiness.categoria
                      }
                    </p>

                  </div>

                  <button
                    onClick={
                      () => {

                        setShowModal(
                          false
                        );

                        setSelectedBusiness(
                          null
                        );

                      }
                    }
                    className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-white/10
                      hover:bg-white/20
                      transition-all
                      text-xl
                      font-bold
                    "
                  >
                    ×
                  </button>

                </div>

              </div>

              {/* IMAGEN */}
              {
                selectedBusiness.url_imagen
                && (

                  <div
                    className="
                      w-full
                      h-64
                      bg-slate-100
                      flex
                      items-center
                      justify-center
                      border-b
                    "
                  >

                    <img
                      src={
                        selectedBusiness
                          .url_imagen
                      }
                      alt="Negocio"
                      className="
                        max-w-full
                        max-h-full
                        object-contain
                      "
                    />

                  </div>

                )
              }

              {/* CONTENIDO */}
              <div
                className="
                  p-8
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-10
                "
              >

                {/* INFO */}
                <div>

                  <h3
                    className="
                      text-2xl
                      font-black
                      text-slate-800
                      mb-6
                    "
                  >
                    Información General
                  </h3>

                  <div
                    className="
                      flex
                      flex-col
                      gap-5
                    "
                  >

                    <div
                      className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-slate-500
                          mb-2
                        "
                      >
                        Descripción
                      </p>

                      <p
                        className="
                          text-slate-700
                          font-medium
                        "
                      >
                        {
                          selectedBusiness
                            .descripcion
                        }
                      </p>

                    </div>

                    <div
                      className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                        flex
                        items-center
                        gap-4
                      "
                    >

                      <MapPin
                        className="
                          text-slate-500
                        "
                      />

                      <div>

                        <p
                          className="
                            text-sm
                            text-slate-500
                          "
                        >
                          Dirección
                        </p>

                        <p
                          className="
                            font-semibold
                            text-slate-700
                          "
                        >
                          {
                            selectedBusiness
                              .direccion
                          }
                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                        flex
                        items-center
                        gap-4
                      "
                    >

                      <Phone
                        className="
                          text-slate-500
                        "
                      />

                      <div>

                        <p
                          className="
                            text-sm
                            text-slate-500
                          "
                        >
                          Teléfono
                        </p>

                        <p
                          className="
                            font-semibold
                            text-slate-700
                          "
                        >
                          {
                            selectedBusiness
                              .telefono
                          }
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

                {/* ADMIN */}
                <div>

                  <h3
                    className="
                      text-2xl
                      font-black
                      text-slate-800
                      mb-6
                    "
                  >
                    Información Administrativa
                  </h3>

                  <div
                    className="
                      flex
                      flex-col
                      gap-5
                    "
                  >

                    <div
                      className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                        flex
                        items-center
                        gap-4
                      "
                    >

                      <User
                        className="
                          text-slate-500
                        "
                      />

                      <div>

                        <p
                          className="
                            text-sm
                            text-slate-500
                          "
                        >
                          Propietario
                        </p>

                        <p
                          className="
                            font-semibold
                            text-slate-700
                          "
                        >
                          {
                            selectedBusiness
                              .propietario
                          }
                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                        flex
                        items-center
                        gap-4
                      "
                    >

                      <Mail
                        className="
                          text-slate-500
                        "
                      />

                      <div>

                        <p
                          className="
                            text-sm
                            text-slate-500
                          "
                        >
                          Correo
                        </p>

                        <p
                          className="
                            font-semibold
                            text-slate-700
                          "
                        >
                          {
                            selectedBusiness
                              .correo
                          }
                        </p>

                      </div>

                    </div>

                    <div
                      className="
                        bg-slate-50
                        rounded-2xl
                        p-5
                      "
                    >

                      <p
                        className="
                          text-sm
                          text-slate-500
                          mb-2
                        "
                      >
                        Estado
                      </p>

                      <span
                        className={`
                          px-4
                          py-2
                          rounded-2xl
                          text-sm
                          font-bold

                          ${
                            selectedBusiness.estado_negocio ===
                            "APROBADO"
                            ? `
                              bg-green-100
                              text-green-700
                            `
                            : selectedBusiness.estado_negocio ===
                              "RECHAZADO"
                            ? `
                              bg-red-100
                              text-red-700
                            `
                            : `
                              bg-yellow-100
                              text-yellow-700
                            `
                          }
                        `}
                      >

                        {
                          selectedBusiness
                            .estado_negocio
                        }

                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )
      }

    </>

  );

}

export default NegociosPendientes;