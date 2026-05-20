import unittest

from tests_decision_tables.helpers import (
    DecisionCase,
    compact,
    decide_role_access,
    format_decision_table,
)


ROLE_ACCESS_DECISION_TABLE = (
    DecisionCase(
        name="administrador en ruta admin",
        conditions={
            "user_role": "ADMINISTRADOR",
            "allowed_roles": ("ADMINISTRADOR",),
        },
        expected="PERMITIR",
    ),
    DecisionCase(
        name="dueno en ruta admin",
        conditions={
            "user_role": "DUENO_NEGOCIO",
            "allowed_roles": ("ADMINISTRADOR",),
        },
        expected="DENEGAR",
    ),
    DecisionCase(
        name="dueno en ruta de negocios",
        conditions={
            "user_role": "DUENO_NEGOCIO",
            "allowed_roles": ("DUENO_NEGOCIO",),
        },
        expected="PERMITIR",
    ),
    DecisionCase(
        name="rol desconocido",
        conditions={
            "user_role": "INVITADO",
            "allowed_roles": ("ADMINISTRADOR", "DUENO_NEGOCIO"),
        },
        expected="DENEGAR",
    ),
)


class AccessDecisionTableTests(unittest.TestCase):
    def test_role_access_decision_table(self):
        for case in ROLE_ACCESS_DECISION_TABLE:
            with self.subTest(case=case.name):
                decision = decide_role_access(**case.conditions)
                self.assertEqual(
                    decision,
                    case.expected,
                    format_decision_table(ROLE_ACCESS_DECISION_TABLE),
                )

    def test_role_middleware_implements_decision_table(self):
        middleware = compact("backend/src/middlewares/role.middleware.js")

        self.assertIn("constuserRole=req.user.rol", middleware)
        self.assertIn("!roles.includes(userRole)", middleware)
        self.assertIn("res.status(403).json", middleware)
        self.assertIn("next();", middleware)

    def test_admin_routes_apply_admin_decision_rule(self):
        route_files = (
            "backend/src/routes/auth.routes.js",
            "backend-admin/src/routes/categoria.routes.js",
            "backend-admin/src/routes/municipio.routes.js",
            "backend-admin/src/routes/negocio.routes.js",
            "backend-admin/src/routes/dashboard.routes.js",
        )

        for route_file in route_files:
            with self.subTest(route_file=route_file):
                source = compact(route_file)
                self.assertIn('verifyRole("ADMINISTRADOR")', source)

    def test_owner_routes_apply_owner_decision_rule(self):
        route_files = (
            "backend-negocios/src/routes/negocio.routes.js",
            "backend-negocios/src/routes/imagen.routes.js",
        )

        for route_file in route_files:
            with self.subTest(route_file=route_file):
                source = compact(route_file)
                self.assertIn('verifyRole("DUENO_NEGOCIO")', source)


if __name__ == "__main__":
    unittest.main()
