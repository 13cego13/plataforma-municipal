import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../context/AuthContext";

function ProtectedRoute({
  children,
  role,
}) {

  const {
    user,
  } = useAuth();

  // No autenticado
  if (!user) {

    return (
      <Navigate
        to="/login"
      />
    );

  }

  // Rol incorrecto
  if (
    role &&
    user.rol !== role
  ) {

    return (
      <Navigate
        to="/"
      />
    );

  }

  return children;

}

export default ProtectedRoute;