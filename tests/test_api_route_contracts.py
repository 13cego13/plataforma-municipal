import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read_text(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8")


def compact(relative_path):
    return re.sub(r"\s+", "", read_text(relative_path))


class ApiRouteContractTests(unittest.TestCase):
    def test_backend_auth_app_mounts_auth_routes(self):
        app = compact("backend/src/app.js")

        self.assertIn('app.use("/api/auth",authRoutes);', app)

    def test_backend_admin_app_mounts_expected_domains(self):
        app = compact("backend-admin/src/app.js")

        for mount in (
            'app.use("/api/municipios",municipioRoutes);',
            'app.use("/api/categorias",categoriaRoutes);',
            'app.use("/api/solicitudes",solicitudRoutes);',
            'app.use("/api/negocios",negocioRoutes);',
            'app.use("/api/dashboard",dashboardRoutes);',
            'app.use("/api/test",testRoutes);',
        ):
            with self.subTest(mount=mount):
                self.assertIn(mount, app)

    def test_backend_negocios_app_mounts_expected_domains(self):
        app = compact("backend-negocios/src/app.js")

        for mount in (
            'app.use("/api/test",testRoutes);',
            'app.use("/api/negocios",negocioRoutes);',
            'app.use("/api/categorias",categoriaRoutes);',
            'app.use("/api/imagenes",imagenRoutes);',
            'app.use("/api/public",publicRoutes);',
        ):
            with self.subTest(mount=mount):
                self.assertIn(mount, app)

    def test_auth_routes_have_public_login_register_and_protected_admin_actions(self):
        routes = compact("backend/src/routes/auth.routes.js")

        self.assertIn('router.post("/register",register);', routes)
        self.assertIn('router.post("/login",login);', routes)
        self.assertIn('router.get("/profile",verifyToken,profile);', routes)
        self.assertIn(
            'router.get("/admin",verifyToken,verifyRole("ADMINISTRADOR"),adminPanel);',
            routes,
        )

        for route in (
            'router.get("/pending-users",verifyToken,verifyRole("ADMINISTRADOR"),getPendingUsersController);',
            'router.put("/approve-user/:id",verifyToken,verifyRole("ADMINISTRADOR"),approveUserController);',
            'router.put("/reject-user/:id",verifyToken,verifyRole("ADMINISTRADOR"),rejectUserController);',
            'router.get("/users",verifyToken,verifyRole("ADMINISTRADOR"),getAllUsersController);',
            'router.patch("/activate-user/:id",verifyToken,verifyRole("ADMINISTRADOR"),activateUserController);',
            'router.patch("/deactivate-user/:id",verifyToken,verifyRole("ADMINISTRADOR"),deactivateUserController);',
            'router.put("/users/:id",verifyToken,verifyRole("ADMINISTRADOR"),updateUserController);',
        ):
            with self.subTest(route=route):
                self.assertIn(route, routes)

    def test_admin_mutating_routes_require_admin_role(self):
        route_files = {
            "backend-admin/src/routes/categoria.routes.js": (
                'router.post("/",verifyToken,verifyRole("ADMINISTRADOR"),createCategoria);',
                'router.put("/:id",verifyToken,verifyRole("ADMINISTRADOR"),updateCategoria);',
                'router.patch("/:id/status",verifyToken,verifyRole("ADMINISTRADOR"),updateCategoriaStatus);',
            ),
            "backend-admin/src/routes/municipio.routes.js": (
                'router.post("/",verifyToken,verifyRole("ADMINISTRADOR"),createMunicipio);',
                'router.put("/:id",verifyToken,verifyRole("ADMINISTRADOR"),updateMunicipio);',
                'router.patch("/:id/status",verifyToken,verifyRole("ADMINISTRADOR"),updateMunicipioStatus);',
            ),
            "backend-admin/src/routes/negocio.routes.js": (
                'router.get("/pending",verifyToken,verifyRole("ADMINISTRADOR"),getPendingNegociosController);',
                'router.put("/approve/:id",verifyToken,verifyRole("ADMINISTRADOR"),approveNegocioController);',
                'router.put("/reject/:id",verifyToken,verifyRole("ADMINISTRADOR"),rejectNegocioController);',
                'router.get("/",verifyToken,verifyRole("ADMINISTRADOR"),getAllNegociosController);',
            ),
            "backend-admin/src/routes/dashboard.routes.js": (
                'router.get("/stats",verifyToken,verifyRole("ADMINISTRADOR"),getDashboardStatsController);',
            ),
        }

        for route_file, protected_routes in route_files.items():
            routes = compact(route_file)
            for route in protected_routes:
                with self.subTest(route_file=route_file, route=route):
                    self.assertIn(route, routes)

    def test_business_owner_routes_require_owner_role(self):
        routes = compact("backend-negocios/src/routes/negocio.routes.js")

        for route in (
            'router.post("/",verifyToken,verifyRole("DUENO_NEGOCIO"),createNegocio);',
            'router.get("/my-business",verifyToken,verifyRole("DUENO_NEGOCIO"),getMyNegocios);',
            'router.put("/my-business/:id_negocio",verifyToken,verifyRole("DUENO_NEGOCIO"),updateMyNegocio);',
            'router.put("/deactivate/:id_negocio",verifyToken,verifyRole("DUENO_NEGOCIO"),deactivateNegocio);',
            'router.put("/activate/:id_negocio",verifyToken,verifyRole("DUENO_NEGOCIO"),activateNegocio);',
        ):
            with self.subTest(route=route):
                self.assertIn(route, routes)

    def test_public_catalog_routes_remain_public(self):
        negocios_routes = compact("backend-negocios/src/routes/negocio.routes.js")
        categorias_routes = compact("backend-negocios/src/routes/categoria.routes.js")
        public_routes = compact("backend-negocios/src/routes/public.routes.js")

        self.assertIn('router.get("/categoria/:id_categoria",getNegociosByCategoria);', negocios_routes)
        self.assertIn('router.get("/detail/:id_negocio",getNegocioDetail);', negocios_routes)
        self.assertIn('router.get("/",getPublicCategorias);', categorias_routes)
        self.assertIn('router.get("/municipio/:id/categorias",getCategoriasByMunicipio);', public_routes)
        self.assertIn(
            'router.get("/municipio/:id/categoria/:id_categoria",getNegociosByMunicipioCategoria);',
            public_routes,
        )

    def test_image_upload_routes_use_multer_and_owner_role(self):
        routes = compact("backend-negocios/src/routes/imagen.routes.js")

        self.assertIn(
            'router.post("/main/:id_negocio",verifyToken,verifyRole("DUENO_NEGOCIO"),upload.single("imagen"),uploadMainImage);',
            routes,
        )
        self.assertIn(
            'router.post("/gallery/:id_negocio",verifyToken,verifyRole("DUENO_NEGOCIO"),upload.array("imagenes",10),uploadGalleryImages);',
            routes,
        )
        self.assertIn('router.get("/gallery/:id_negocio",getGalleryImages);', routes)


if __name__ == "__main__":
    unittest.main()
