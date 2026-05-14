import {
  AlertTriangle,
  CheckCircle2,
  X,
} from "lucide-react";

function Toast({
  notification,
  onClose,
}) {

  if (!notification) {

    return null;

  }

  const isSuccess =
    notification.type === "success";

  return (

    <div
      role="alert"
      className={`
        fixed
        top-6
        right-6
        z-[70]
        w-[min(420px,calc(100vw-3rem))]
        rounded-2xl
        border
        p-4
        shadow-2xl
        flex
        items-start
        gap-3

        ${
          isSuccess
          ? `
            bg-green-50
            border-green-200
            text-green-800
          `
          : `
            bg-red-50
            border-red-200
            text-red-800
          `
        }
      `}
    >

      <div className="mt-0.5 shrink-0">

        {
          isSuccess
          ? <CheckCircle2 size={22} />
          : <AlertTriangle size={22} />
        }

      </div>

      <div className="flex-1">

        <p className="font-black">
          {
            notification.title
            || (
              isSuccess
              ? "Operacion exitosa"
              : "Atencion"
            )
          }
        </p>

        <p
          className="
            text-sm
            mt-1
            leading-relaxed
          "
        >
          {
            notification.message
          }
        </p>

      </div>

      <button
        type="button"
        onClick={onClose}
        className="
          shrink-0
          rounded-xl
          p-1.5
          hover:bg-black/5
          transition-all
        "
        aria-label="Cerrar alerta"
      >
        <X size={18} />
      </button>

    </div>

  );

}

export default Toast;
