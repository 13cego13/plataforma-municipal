import unittest

from tests_decision_tables.helpers import (
    DecisionCase,
    compact,
    decide_login,
    decide_register,
    format_decision_table,
)


LOGIN_DECISION_TABLE = (
    DecisionCase(
        name="usuario inexistente",
        conditions={
            "user_exists": False,
            "password_matches": False,
            "user_status": None,
        },
        expected="RECHAZAR_CREDENCIALES",
    ),
    DecisionCase(
        name="password incorrecta",
        conditions={
            "user_exists": True,
            "password_matches": False,
            "user_status": "APROBADO",
        },
        expected="RECHAZAR_CREDENCIALES",
    ),
    DecisionCase(
        name="usuario pendiente",
        conditions={
            "user_exists": True,
            "password_matches": True,
            "user_status": "PENDIENTE",
        },
        expected="RECHAZAR_NO_APROBADO",
    ),
    DecisionCase(
        name="usuario aprobado",
        conditions={
            "user_exists": True,
            "password_matches": True,
            "user_status": "APROBADO",
        },
        expected="LOGIN_EXITOSO",
    ),
)


REGISTER_DECISION_TABLE = (
    DecisionCase(
        name="campos incompletos",
        conditions={
            "required_fields_complete": False,
            "password_length": 8,
            "email_already_exists": False,
        },
        expected="RECHAZAR_CAMPOS_OBLIGATORIOS",
    ),
    DecisionCase(
        name="password corta",
        conditions={
            "required_fields_complete": True,
            "password_length": 7,
            "email_already_exists": False,
        },
        expected="RECHAZAR_PASSWORD_CORTA",
    ),
    DecisionCase(
        name="correo duplicado",
        conditions={
            "required_fields_complete": True,
            "password_length": 8,
            "email_already_exists": True,
        },
        expected="RECHAZAR_CORREO_DUPLICADO",
    ),
    DecisionCase(
        name="registro valido",
        conditions={
            "required_fields_complete": True,
            "password_length": 8,
            "email_already_exists": False,
        },
        expected="REGISTRO_EXITOSO",
    ),
)


class AuthDecisionTableTests(unittest.TestCase):
    def test_login_decision_table(self):
        for case in LOGIN_DECISION_TABLE:
            with self.subTest(case=case.name):
                decision = decide_login(**case.conditions)
                self.assertEqual(
                    decision,
                    case.expected,
                    format_decision_table(LOGIN_DECISION_TABLE),
                )

    def test_login_service_implements_decision_table_branches(self):
        service = compact("backend/src/services/auth.service.js")

        self.assertIn("if(!user)", service)
        self.assertIn("if(!validPassword)", service)
        self.assertIn('user.estado_usuario!=="APROBADO"', service)
        self.assertIn("consttoken=generateToken(user)", service)

    def test_register_decision_table(self):
        for case in REGISTER_DECISION_TABLE:
            with self.subTest(case=case.name):
                decision = decide_register(**case.conditions)
                self.assertEqual(
                    decision,
                    case.expected,
                    format_decision_table(REGISTER_DECISION_TABLE),
                )

    def test_register_code_implements_decision_table_branches(self):
        controller = compact("backend/src/controllers/auth.controller.js")
        service = compact("backend/src/services/auth.service.js")

        self.assertIn("!cleanData.nombre", controller)
        self.assertIn("cleanData.contrasena.length<8", controller)
        self.assertIn("if(existingUser)", service)
        self.assertIn("error.statusCode=409", service)
        self.assertIn("awaitcreateUser", service)
        self.assertIn("awaitcreateBusinessOwner", service)


if __name__ == "__main__":
    unittest.main()
