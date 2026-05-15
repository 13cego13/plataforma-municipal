import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read_text(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8")


def compact(relative_path):
    return re.sub(r"\s+", "", read_text(relative_path))


class FrontendContractTests(unittest.TestCase):
    def test_axios_instances_use_environment_base_urls_and_bearer_token(self):
        api = compact("frontend/src/api/axios.js")

        self.assertIn("axios.create({baseURL,})", api)
        self.assertIn('localStorage.getItem("token")', api)
        self.assertIn("config.headers.Authorization=`Bearer${token}`", api)
        self.assertIn("VITE_AUTH_API", api)
        self.assertIn("VITE_ADMIN_API", api)
        self.assertIn("VITE_NEGOCIOS_API", api)

    def test_auth_context_persists_and_clears_session(self):
        context = compact("frontend/src/context/AuthContext.jsx")

        self.assertIn('localStorage.getItem("token")', context)
        self.assertIn('localStorage.getItem("user")', context)
        self.assertIn("JSON.parse(savedUser)", context)
        self.assertIn('localStorage.setItem("token",userToken)', context)
        self.assertIn('localStorage.setItem("user",JSON.stringify(userData))', context)
        self.assertIn('localStorage.removeItem("token")', context)
        self.assertIn('localStorage.removeItem("user")', context)

    def test_protected_route_redirects_unauthenticated_and_wrong_role_users(self):
        protected_route = compact("frontend/src/routes/ProtectedRoute.jsx")

        self.assertIn("if(!user)", protected_route)
        self.assertIn('to="/login"', protected_route)
        self.assertIn("role&&user.rol!==role", protected_route)
        self.assertIn('to="/"', protected_route)
        self.assertIn("returnchildren", protected_route)

    def test_router_declares_public_owner_and_admin_routes(self):
        router = compact("frontend/src/routes/AppRouter.jsx")

        for public_path in ('path="/"', 'path="/login"', 'path="/municipio/:id"', 'path="/negocio/:id_negocio"'):
            with self.subTest(public_path=public_path):
                self.assertIn(public_path, router)

        self.assertIn('path="/owner"', router)
        self.assertIn('role="DUENO_NEGOCIO"', router)
        self.assertIn('path="/admin"', router)
        self.assertIn('role="ADMINISTRADOR"', router)
        self.assertIn('path="usuarios"', router)
        self.assertIn('path="negocios"', router)
        self.assertIn('path="categorias"', router)
        self.assertIn('path="municipios"', router)

    def test_frontend_services_call_expected_backend_paths(self):
        service_expectations = {
            "frontend/src/services/auth.service.js": ('authAPI.post("/auth/login"',),
            "frontend/src/services/admin.service.js": (
                'authAPI.get("/auth/pending-users")',
                'authAPI.put(`/auth/approve-user/${id_usuario}`)',
                'adminAPI.get("/negocios/pending")',
                'adminAPI.put(`/negocios/approve/${id_negocio}`)',
            ),
            "frontend/src/services/catalog.service.js": (
                'negociosAPI.get("/categorias")',
                'adminAPI.get("/municipios/public")',
            ),
            "frontend/src/services/owner.service.js": (
                'negociosAPI.get("/negocios/my-business")',
                'negociosAPI.post("/negocios",businessData)',
                'negociosAPI.post(`/imagenes/main/${id_negocio}`,formData',
                'negociosAPI.post(`/imagenes/gallery/${id_negocio}`,formData',
                'negociosAPI.put(`/negocios/my-business/${id_negocio}`,businessData)',
                'negociosAPI.put(`/negocios/deactivate/${id_negocio}`)',
                'negociosAPI.put(`/negocios/activate/${id_negocio}`)',
            ),
        }

        for service_path, expected_calls in service_expectations.items():
            source = compact(service_path)
            for expected_call in expected_calls:
                with self.subTest(service=service_path, call=expected_call):
                    self.assertIn(expected_call, source)


if __name__ == "__main__":
    unittest.main()
