import {
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute
from "./ProtectedRoute";

import HomePage
from "../pages/HomePage";

import LoginPage
from "../pages/LoginPage";

import OwnerDashboard
from "../pages/OwnerDashboard";

import AdminLayout
from "../layouts/AdminLayout";

import DashboardAdmin
from "../pages/admin/DashboardAdmin";

import UsuariosPendientes
from "../pages/admin/UsuariosPendientes";

import CategoriasAdmin
from "../pages/admin/CategoriasAdmin";


import MunicipiosAdmin
from "../pages/admin/MunicipiosAdmin";


import NegociosPendientes
from "../pages/admin/NegociosPendientes";
import MunicipioPage
from "../pages/MunicipioPage";
import CategoriaNegociosPage
from "../pages/CategoriaNegociosPage";

import NegocioDetailPage
from "../pages/NegocioDetailPage";

function AppRouter() {

  return (

    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
  path="/municipio/:id"
  element={<MunicipioPage />}
/>
<Route
  path="/municipio/:id/categoria/:id_categoria"
  element={<CategoriaNegociosPage />}
/>

<Route
  path="/negocio/:id_negocio"
  element={<NegocioDetailPage />}
/>

      {/* OWNER */}
      <Route
        path="/owner"
        element={

          <ProtectedRoute
            role="DUENO_NEGOCIO"
          >

            <OwnerDashboard />

          </ProtectedRoute>

        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={

          <ProtectedRoute
            role="ADMINISTRADOR"
          >

            <AdminLayout />

          </ProtectedRoute>

        }
      >

        
<Route
  path="/admin/negocios"
  element={

    <ProtectedRoute
      role="ADMINISTRADOR"
    >

      <NegociosPendientes />

    </ProtectedRoute>

  }
/>
        <Route
          index
          element={<DashboardAdmin />}
        />

        <Route
          path="usuarios"
          element={<UsuariosPendientes />}
        />

        <Route
          path="negocios"
          element={<NegociosPendientes />}
        />

        <Route
          path="categorias"
          element={<CategoriasAdmin />}
        />

        <Route
          path="municipios"
          element={<MunicipiosAdmin />}
        />

      </Route>

    </Routes>

  );

}

export default AppRouter;