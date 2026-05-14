import {
  useEffect,
  useState,
} from "react";

import {
  ArrowLeft,
  Building2,
  UserPlus,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  registerRequest,
} from "../services/auth.service";

import Toast
from "../components/common/Toast";

function RegisterPage() {

  const navigate =
    useNavigate();

  const [formData,
    setFormData] =
      useState({
        nombre: "",
        correo: "",
        contrasena: "",
        razon_social: "",
        documento: "",
        telefono: "",
      });

  const [fieldErrors,
    setFieldErrors] =
      useState({});

  const [notification,
    setNotification] =
      useState(null);

  const [submitting,
    setSubmitting] =
      useState(false);

  useEffect(() => {

    if (!notification) {

      return;

    }

    const timer =
      setTimeout(() => {

        setNotification(null);

      }, 5000);

    return () =>
      clearTimeout(timer);

  }, [notification]);

  const showNotification =
    (type, message, title) => {

      setNotification({
        type,
        message,
        title,
      });

  };

  const handleChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;

      setFormData({
        ...formData,
        [name]:
          value,
      });

      if (fieldErrors[name]) {

        setFieldErrors({
          ...fieldErrors,
          [name]: "",
        });

      }

  };

  const validateForm =
    () => {

      const errors = {};

      Object.entries(formData)
        .forEach(([
          key,
          value,
        ]) => {

          if (!value.trim()) {

            errors[key] =
              "Este campo es obligatorio";

          }

        });

      if (
        formData.contrasena &&
        formData.contrasena.length < 8
      ) {

        errors.contrasena =
          "La contrasena debe tener minimo 8 caracteres";

      }

      setFieldErrors(errors);

      if (
        Object.keys(errors).length > 0
      ) {

        showNotification(
          "error",
          "Completa los campos obligatorios y revisa la contrasena"
        );

        return false;

      }

      return true;

  };

  const getCleanFormData =
    () => ({
      nombre:
        formData.nombre.trim(),
      correo:
        formData.correo.trim(),
      contrasena:
        formData.contrasena,
      razon_social:
        formData.razon_social.trim(),
      documento:
        formData.documento.trim(),
      telefono:
        formData.telefono.trim(),
    });

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (!validateForm()) {

        return;

      }

      try {

        setSubmitting(true);

        await registerRequest(
          getCleanFormData()
        );

        showNotification(
          "success",
          "Solicitud enviada correctamente. Un administrador debe aprobar tu cuenta antes de iniciar sesion.",
          "Registro exitoso"
        );

        setFormData({
          nombre: "",
          correo: "",
          contrasena: "",
          razon_social: "",
          documento: "",
          telefono: "",
        });

      } catch (error) {

        showNotification(
          "error",
          error.response?.data?.message
          || "No se pudo registrar el usuario"
        );

      } finally {

        setSubmitting(false);

      }

  };

  const getInputClass =
    (field) => `
      w-full
      border
      rounded-2xl
      px-5
      py-4
      outline-none
      focus:ring-2

      ${
        fieldErrors[field]
        ? `
          bg-red-50
          border-red-300
          focus:ring-red-200
        `
        : `
          bg-slate-100
          border-slate-200
          focus:ring-slate-300
        `
      }
    `;

  const requiredLabel =
    (label) => (

      <label
        className="
          flex
          items-center
          gap-1
          mb-2
          font-semibold
          text-slate-700
        "
      >
        {label}
        <span
          className="text-red-500"
          aria-hidden="true"
        >
          *
        </span>
      </label>

    );

  return (

    <div
      className="
        min-h-screen
        bg-slate-100
        px-6
        py-10
      "
    >

      <Toast
        notification={notification}
        onClose={
          () =>
            setNotification(null)
        }
      />

      <div
        className="
          max-w-4xl
          mx-auto
        "
      >

        <button
          type="button"
          onClick={
            () =>
              navigate("/login")
          }
          className="
            flex
            items-center
            gap-2
            text-slate-600
            font-semibold
            mb-6
            hover:text-slate-900
          "
        >
          <ArrowLeft size={20} />
          Volver al inicio de sesion
        </button>

        <div
          className="
            bg-white
            border
            border-slate-200
            rounded-[32px]
            shadow-sm
            overflow-hidden
          "
        >

          <div
            className="
              bg-slate-900
              text-white
              p-8
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
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                "
              >
                <Building2 size={28} />
              </div>

              <div>
                <p
                  className="
                    uppercase
                    tracking-[4px]
                    text-slate-300
                    text-xs
                    mb-2
                  "
                >
                  Registro de usuario
                </p>

                <h1
                  className="
                    text-4xl
                    font-black
                  "
                >
                  Solicitud de acceso
                </h1>
              </div>
            </div>

          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="
              p-8
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            <div>
              {requiredLabel("Nombre")}
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={getInputClass("nombre")}
              />
              {
                fieldErrors.nombre
                && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {fieldErrors.nombre}
                  </p>
                )
              }
            </div>

            <div>
              {requiredLabel("Correo")}
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={getInputClass("correo")}
              />
              {
                fieldErrors.correo
                && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {fieldErrors.correo}
                  </p>
                )
              }
            </div>

            <div>
              {requiredLabel("Contrasena")}
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className={getInputClass("contrasena")}
              />
              {
                fieldErrors.contrasena
                && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {fieldErrors.contrasena}
                  </p>
                )
              }
            </div>

            <div>
              {requiredLabel("Telefono")}
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={getInputClass("telefono")}
              />
              {
                fieldErrors.telefono
                && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {fieldErrors.telefono}
                  </p>
                )
              }
            </div>

            <div>
              {requiredLabel("Documento")}
              <input
                type="text"
                name="documento"
                value={formData.documento}
                onChange={handleChange}
                className={getInputClass("documento")}
              />
              {
                fieldErrors.documento
                && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {fieldErrors.documento}
                  </p>
                )
              }
            </div>

            <div>
              {requiredLabel("Razon social")}
              <input
                type="text"
                name="razon_social"
                value={formData.razon_social}
                onChange={handleChange}
                className={getInputClass("razon_social")}
              />
              {
                fieldErrors.razon_social
                && (
                  <p className="mt-2 text-sm font-semibold text-red-600">
                    {fieldErrors.razon_social}
                  </p>
                )
              }
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="
                md:col-span-2
                bg-slate-900
                hover:bg-black
                disabled:bg-slate-400
                text-white
                rounded-2xl
                px-6
                py-4
                font-black
                flex
                items-center
                justify-center
                gap-3
                transition-all
              "
            >
              <UserPlus size={20} />
              {
                submitting
                ? "Enviando solicitud..."
                : "Registrarme"
              }
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default RegisterPage;
