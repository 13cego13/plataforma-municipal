import {
  useEffect,
  useState,
} from "react";

import {
  Building2,
  MapPin,
  ArrowRight,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

function HomePage() {

  // =====================================
  // STATES
  // =====================================

  const [municipios,
    setMunicipios] =
      useState([]);

  const [loading,
    setLoading] =
      useState(true);

  // =====================================
  // NAVIGATE
  // =====================================

  const navigate =
    useNavigate();

  // =====================================
  // API
  // =====================================

  const ADMIN_API =
    import.meta.env.VITE_ADMIN_API;

  // =====================================
  // LOAD MUNICIPIOS
  // =====================================

  useEffect(() => {

    loadMunicipios();

  }, []);

  const loadMunicipios =
    async () => {

      try {

        const response =
          await fetch(
            `${ADMIN_API}/municipios/public`
          );

        const data =
          await response.json();

        setMunicipios(
          data.municipios || []
        );

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

  };

  // =====================================
  // LOADING
  // =====================================

  if (loading) {

    return (

      <div
        className="
          h-screen
          flex
          items-center
          justify-center
          bg-slate-100
        "
      >

        <div
          className="
            w-16
            h-16
            border-4
            border-slate-200
            border-t-slate-900
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
      "
    >

      {/* NAVBAR */}
      <nav
        className="
          sticky
          top-0
          z-50
          bg-white/80
          backdrop-blur-xl
          border-b
          border-slate-200
        "
      >

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-5
            flex
            items-center
            justify-between
          "
        >

          {/* LOGO */}
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
                rounded-3xl
                bg-slate-900
                text-white
                flex
                items-center
                justify-center
              "
            >

              <Building2 size={28} />

            </div>

            <div>

              <h1
                className="
                  text-2xl
                  font-black
                  text-slate-900
                "
              >
                Plataforma Municipal
              </h1>

              <p
                className="
                  text-slate-500
                "
              >
                Directorio Comercial
              </p>

            </div>

          </div>

          {/* LOGIN */}
          <a
            href="/login"
            className="
              bg-slate-900
              hover:bg-black
              text-white
              px-6
              py-3
              rounded-2xl
              font-bold
              transition-all
            "
          >
            Iniciar Sesión
          </a>

        </div>

      </nav>

      {/* HERO */}
      <section
        className="
          relative
          overflow-hidden
        "
      >

        <div
          className="
            absolute
            top-0
            right-0
            w-[700px]
            h-[700px]
            bg-slate-300/20
            rounded-full
            blur-3xl
          "
        />

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-28
            relative
            z-10
          "
        >

          <div
            className="
              max-w-4xl
            "
          >

            <p
              className="
                uppercase
                tracking-[5px]
                text-slate-500
                font-semibold
                mb-6
              "
            >
              Plataforma Municipal
            </p>

            <h1
              className="
                text-6xl
                md:text-7xl
                font-black
                text-slate-900
                leading-tight
              "
            >
              Encuentra negocios
              y servicios en tu
              municipio
            </h1>

            <p
              className="
                text-xl
                text-slate-600
                mt-8
                max-w-2xl
                leading-relaxed
              "
            >
              Explora comercios,
              emprendimientos,
              restaurantes y servicios
              disponibles dentro de tu
              municipio.
            </p>

          </div>

        </div>

      </section>

      {/* MUNICIPIOS */}
      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          pb-28
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            mb-12
          "
        >

          <div>

            <h2
              className="
                text-5xl
                font-black
                text-slate-900
              "
            >
              Selecciona tu municipio
            </h2>

            <p
              className="
                text-slate-500
                text-xl
                mt-4
              "
            >
              Escoge dónde deseas buscar
              negocios y servicios.
            </p>

          </div>

        </div>

        {/* GRID */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
          "
        >

          {
            municipios.map(
              (municipio) => (

                <button
                  key={
                    municipio.id_municipio
                  }
                  onClick={
                    () =>
                      navigate(
                        `/municipio/${municipio.id_municipio}`
                      )
                  }
                  className="
                    group
                    bg-white
                    border
                    border-slate-200
                    rounded-[36px]
                    p-10
                    text-left
                    hover:bg-slate-900
                    hover:text-white
                    hover:shadow-2xl
                    hover:-translate-y-2
                    transition-all
                    duration-300
                  "
                >

                  <div
                    className="
                      w-20
                      h-20
                      rounded-3xl
                      bg-slate-100
                      group-hover:bg-white/10
                      flex
                      items-center
                      justify-center
                      mb-8
                      transition-all
                    "
                  >

                    <MapPin
                      size={36}
                      className="
                        text-slate-800
                        group-hover:text-white
                      "
                    />

                  </div>

                  <h3
                    className="
                      text-3xl
                      font-black
                    "
                  >
                    {
                      municipio.nombre
                    }
                  </h3>

                  <p
                    className="
                      text-slate-500
                      group-hover:text-slate-300
                      mt-4
                      leading-relaxed
                    "
                  >
                    Explora categorías y
                    negocios disponibles
                    en este municipio.
                  </p>

                  <div
                    className="
                      mt-8
                      flex
                      items-center
                      gap-3
                      font-bold
                    "
                  >

                    Explorar

                    <ArrowRight size={20} />

                  </div>

                </button>

              )
            )
          }

        </div>

      </section>

    </div>

  );

}

export default HomePage;