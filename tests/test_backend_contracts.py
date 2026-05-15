import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read_text(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8")


def compact(relative_path):
    return re.sub(r"\s+", "", read_text(relative_path))


class BackendContractTests(unittest.TestCase):
    def test_auth_controller_validates_register_and_login_payloads(self):
        controller = compact("backend/src/controllers/auth.controller.js")

        for required_field in (
            "!nombre",
            "!correo",
            "!contrasena",
            "!razon_social",
            "!documento",
            "!telefono",
        ):
            with self.subTest(field=required_field):
                self.assertIn(required_field, controller)

        self.assertIn("contrasena.length<8", controller)
        self.assertIn("res.status(400).json", controller)
        self.assertIn("res.status(201).json", controller)
        self.assertIn("res.status(401).json", controller)

    def test_auth_service_blocks_duplicate_users_and_inactive_logins(self):
        service = compact("backend/src/services/auth.service.js")

        self.assertIn("awaitfindUserByEmail(correo)", service)
        self.assertIn('thrownewError("Elcorreoyaestáregistrado")', service)
        self.assertIn("awaithashPassword(contrasena)", service)
        self.assertIn("awaitcreateBusinessOwner", service)
        self.assertIn('user.estado_usuario!=="APROBADO"', service)
        self.assertIn("consttoken=generateToken(user)", service)

    def test_jwt_middleware_requires_bearer_token_and_sets_user(self):
        middleware = compact("backend/src/middlewares/auth.middleware.js")

        self.assertIn("constauthHeader=req.headers.authorization", middleware)
        self.assertIn("!authHeader", middleware)
        self.assertIn('!authHeader.startsWith("Bearer")', middleware)
        self.assertIn("jwt.verify(token,process.env.JWT_SECRET)", middleware)
        self.assertIn("req.user=decoded", middleware)
        self.assertIn("next();", middleware)
        self.assertIn("res.status(401).json", middleware)

    def test_role_middleware_rejects_roles_not_allowed(self):
        middleware = compact("backend/src/middlewares/role.middleware.js")

        self.assertIn("constuserRole=req.user.rol", middleware)
        self.assertIn("!roles.includes(userRole)", middleware)
        self.assertIn("res.status(403).json", middleware)
        self.assertIn('message:"Notienespermisos"', middleware)
        self.assertIn("next();", middleware)

    def test_auth_model_queries_are_parameterized_for_user_inputs(self):
        model = compact("backend/src/models/auth.model.js")

        expected_fragments = (
            "WHEREcorreo=$1",
            "VALUES($1,$2,$3,'PENDIENTE',NOW(),$4)",
            "VALUES($1,$2,$3,$4)",
            "WHEREu.correo=$1",
            "WHEREid_usuario=$1",
        )

        for fragment in expected_fragments:
            with self.subTest(fragment=fragment):
                self.assertIn(fragment, model)

        self.assertNotIn("${", model)

    def test_admin_catalog_services_check_duplicates_and_missing_records(self):
        categoria_service = compact("backend-admin/src/services/categoria.service.js")
        municipio_service = compact("backend-admin/src/services/municipio.service.js")

        self.assertIn("awaitfindCategoriaByName(nombre)", categoria_service)
        self.assertIn("!categoria", categoria_service)
        self.assertIn('thrownewError("Categoríanoencontrada")', categoria_service)
        self.assertIn("duplicatedCategoria&&duplicatedCategoria.id_categoria!==id", categoria_service)

        self.assertIn("awaitfindMunicipioByName(nombre)", municipio_service)
        self.assertIn("!municipio", municipio_service)
        self.assertIn('thrownewError("Municipionoencontrado")', municipio_service)
        self.assertIn("duplicatedMunicipio&&duplicatedMunicipio.id_municipio!==id", municipio_service)

    def test_admin_models_use_parameterized_writes(self):
        for model_path, expected_fragments in {
            "backend-admin/src/models/categoria.model.js": (
                "WHERELOWER(nombre)=LOWER($1)",
                "VALUES($1,$2,$3,true,NOW())",
                "WHEREid_categoria=$4",
                "SETestado=$1WHEREid_categoria=$2",
            ),
            "backend-admin/src/models/municipio.model.js": (
                "WHERELOWER(nombre)=LOWER($1)",
                "VALUES($1,$2,true,NOW())",
                "WHEREid_municipio=$3",
                "SETestado=$1WHEREid_municipio=$2",
            ),
            "backend-admin/src/models/negocio.model.js": (
                "WHEREid_negocio=$1",
                "SETestado_negocio='APROBADO'",
                "SETestado_negocio='RECHAZADO'",
            ),
        }.items():
            model = compact(model_path)
            self.assertNotIn("${", model)
            for fragment in expected_fragments:
                with self.subTest(model=model_path, fragment=fragment):
                    self.assertIn(fragment, model)


if __name__ == "__main__":
    unittest.main()
