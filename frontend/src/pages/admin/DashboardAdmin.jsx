import {
  useEffect,
  useState,
} from "react";

import {
  Users,
  Building2,
  CheckCircle2,
  Clock3,
  Activity,
  BarChart3,
} from "lucide-react";

import {
  getDashboardStats,
} from "../../services/admin/dashboard.service";

function DashboardAdmin() {

  const [stats, setStats] =
    useState({

      totalUsuarios: 0,
      totalNegocios: 0,
      negociosAprobados: 0,
      negociosPendientes: 0,

    });

  const [recentActivity,
    setRecentActivity] =
      useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadStats();

  }, []);

  const loadStats =
    async () => {

      try {

        const data =
          await getDashboardStats();

        setStats(
          data.stats
        );

        setRecentActivity(
          data.recientes
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };

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
            Panel Administrativo
          </p>

          <h1
            className="
              text-5xl
              font-black
              leading-tight
            "
          >
            Dashboard General
          </h1>

          <p
            className="
              text-slate-300
              mt-4
              text-lg
              max-w-2xl
            "
          >
            Administra usuarios,
            negocios y monitorea
            el estado general de
            la plataforma en
            tiempo real.
          </p>

        </div>

      </div>

      {/* MÉTRICAS */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
          mt-8
        "
      >

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-[28px]
            p-7
            shadow-sm
            border
            border-slate-200
            relative
            overflow-hidden
            hover:-translate-y-1
            transition-all
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-32
              h-32
              bg-blue-100
              rounded-full
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-blue-100
                flex
                items-center
                justify-center
                mb-6
              "
            >

              <Users
                size={28}
                className="
                  text-blue-600
                "
              />

            </div>

            <p
              className="
                text-slate-500
                font-medium
              "
            >
              Usuarios
            </p>

            <h2
              className="
                text-5xl
                font-black
                text-slate-800
                mt-3
              "
            >
              {
                stats.totalUsuarios
              }
            </h2>

          </div>

        </div>

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-[28px]
            p-7
            shadow-sm
            border
            border-slate-200
            relative
            overflow-hidden
            hover:-translate-y-1
            transition-all
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-32
              h-32
              bg-purple-100
              rounded-full
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-purple-100
                flex
                items-center
                justify-center
                mb-6
              "
            >

              <Building2
                size={28}
                className="
                  text-purple-600
                "
              />

            </div>

            <p
              className="
                text-slate-500
                font-medium
              "
            >
              Negocios
            </p>

            <h2
              className="
                text-5xl
                font-black
                text-slate-800
                mt-3
              "
            >
              {
                stats.totalNegocios
              }
            </h2>

          </div>

        </div>

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-[28px]
            p-7
            shadow-sm
            border
            border-slate-200
            relative
            overflow-hidden
            hover:-translate-y-1
            transition-all
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-32
              h-32
              bg-green-100
              rounded-full
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-green-100
                flex
                items-center
                justify-center
                mb-6
              "
            >

              <CheckCircle2
                size={28}
                className="
                  text-green-600
                "
              />

            </div>

            <p
              className="
                text-slate-500
                font-medium
              "
            >
              Aprobados
            </p>

            <h2
              className="
                text-5xl
                font-black
                text-slate-800
                mt-3
              "
            >
              {
                stats.negociosAprobados
              }
            </h2>

          </div>

        </div>

        {/* CARD */}
        <div
          className="
            bg-white
            rounded-[28px]
            p-7
            shadow-sm
            border
            border-slate-200
            relative
            overflow-hidden
            hover:-translate-y-1
            transition-all
          "
        >

          <div
            className="
              absolute
              top-0
              right-0
              w-32
              h-32
              bg-yellow-100
              rounded-full
              blur-3xl
            "
          />

          <div className="relative z-10">

            <div
              className="
                w-14
                h-14
                rounded-2xl
                bg-yellow-100
                flex
                items-center
                justify-center
                mb-6
              "
            >

              <Clock3
                size={28}
                className="
                  text-yellow-600
                "
              />

            </div>

            <p
              className="
                text-slate-500
                font-medium
              "
            >
              Pendientes
            </p>

            <h2
              className="
                text-5xl
                font-black
                text-slate-800
                mt-3
              "
            >
              {
                stats.negociosPendientes
              }
            </h2>

          </div>

        </div>

      </div>

      {/* CONTENIDO */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-8
          mt-8
        "
      >

        {/* ACTIVIDAD */}
        <div
          className="
            bg-white
            rounded-[30px]
            p-8
            shadow-sm
            border
            border-slate-200
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-8
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-slate-100
                flex
                items-center
                justify-center
              "
            >

              <Activity
                className="
                  text-slate-700
                "
              />

            </div>

            <div>

              <h3
                className="
                  text-2xl
                  font-black
                  text-slate-800
                "
              >
                Actividad Reciente
              </h3>

              <p
                className="
                  text-slate-500
                  text-sm
                "
              >
                Últimos movimientos
                del sistema
              </p>

            </div>

          </div>

          <div className="flex flex-col gap-4">

            {
              recentActivity.map(
                (
                  activity,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      flex
                      items-center
                      justify-between
                      bg-slate-50
                      border
                      border-slate-100
                      rounded-2xl
                      p-5
                      hover:bg-slate-100
                      transition-all
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        gap-4
                      "
                    >

                      <div
                        className={`
                          w-12
                          h-12
                          rounded-2xl
                          flex
                          items-center
                          justify-center

                          ${
                            activity.tipo ===
                            "negocio"
                            ? `
                              bg-purple-100
                            `
                            : `
                              bg-blue-100
                            `
                          }
                        `}
                      >

                        {
                          activity.tipo ===
                          "negocio"
                          ? (

                            <Building2
                              className="
                                text-purple-600
                              "
                            />

                          )
                          : (

                            <Users
                              className="
                                text-blue-600
                              "
                            />

                          )
                        }

                      </div>

                      <div>

                        <p
                          className="
                            font-bold
                            text-slate-800
                          "
                        >

                          {
                            activity.tipo ===
                            "negocio"
                            ? "Nuevo negocio registrado"
                            : "Nuevo usuario registrado"
                          }

                        </p>

                        <p
                          className="
                            text-sm
                            text-slate-500
                            mt-1
                          "
                        >
                          {
                            activity.nombre
                          }
                        </p>

                      </div>

                    </div>

                    <span
                      className="
                        text-xs
                        bg-slate-200
                        text-slate-600
                        px-3
                        py-2
                        rounded-xl
                        font-semibold
                      "
                    >

                      {
                        new Date(
                          activity.fecha_creacion
                        ).toLocaleDateString()
                      }

                    </span>

                  </div>

                )
              )
            }

          </div>

        </div>

        {/* ESTADO */}
        <div
          className="
            bg-white
            rounded-[30px]
            p-8
            shadow-sm
            border
            border-slate-200
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              mb-8
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-slate-100
                flex
                items-center
                justify-center
              "
            >

              <BarChart3
                className="
                  text-slate-700
                "
              />

            </div>

            <div>

              <h3
                className="
                  text-2xl
                  font-black
                  text-slate-800
                "
              >
                Estado del Sistema
              </h3>

              <p
                className="
                  text-slate-500
                  text-sm
                "
              >
                Métricas generales
                de aprobación
              </p>

            </div>

          </div>

          <div className="flex flex-col gap-8">

            {/* APROBADOS */}
            <div>

              <div
                className="
                  flex
                  justify-between
                  mb-3
                "
              >

                <span
                  className="
                    font-semibold
                    text-slate-700
                  "
                >
                  Negocios Aprobados
                </span>

                <span
                  className="
                    font-black
                    text-green-600
                  "
                >

                  {
                    stats.totalNegocios > 0
                    ? Math.round(
                        (
                          stats.negociosAprobados
                          /
                          stats.totalNegocios
                        ) * 100
                      )
                    : 0
                  }%

                </span>

              </div>

              <div
                className="
                  w-full
                  h-4
                  bg-slate-200
                  rounded-full
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    bg-green-500
                    rounded-full
                  "
                  style={{
                    width: `${
                      stats.totalNegocios > 0
                      ? (
                          stats.negociosAprobados
                          /
                          stats.totalNegocios
                        ) * 100
                      : 0
                    }%`,
                  }}
                />

              </div>

            </div>

            {/* PENDIENTES */}
            <div>

              <div
                className="
                  flex
                  justify-between
                  mb-3
                "
              >

                <span
                  className="
                    font-semibold
                    text-slate-700
                  "
                >
                  Negocios Pendientes
                </span>

                <span
                  className="
                    font-black
                    text-yellow-600
                  "
                >

                  {
                    stats.totalNegocios > 0
                    ? Math.round(
                        (
                          stats.negociosPendientes
                          /
                          stats.totalNegocios
                        ) * 100
                      )
                    : 0
                  }%

                </span>

              </div>

              <div
                className="
                  w-full
                  h-4
                  bg-slate-200
                  rounded-full
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    bg-yellow-500
                    rounded-full
                  "
                  style={{
                    width: `${
                      stats.totalNegocios > 0
                      ? (
                          stats.negociosPendientes
                          /
                          stats.totalNegocios
                        ) * 100
                      : 0
                    }%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DashboardAdmin;