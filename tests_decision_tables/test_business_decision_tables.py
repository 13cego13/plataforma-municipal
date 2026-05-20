import unittest

from tests_decision_tables.helpers import (
    DecisionCase,
    compact,
    decide_approval,
    decide_business_update,
    format_decision_table,
)


BUSINESS_UPDATE_DECISION_TABLE = (
    DecisionCase(
        name="dueno inexistente",
        conditions={
            "owner_exists": False,
            "business_exists": False,
            "belongs_to_owner": False,
        },
        expected="RECHAZAR_DUENO_INEXISTENTE",
    ),
    DecisionCase(
        name="negocio inexistente",
        conditions={
            "owner_exists": True,
            "business_exists": False,
            "belongs_to_owner": False,
        },
        expected="RECHAZAR_NEGOCIO_INEXISTENTE",
    ),
    DecisionCase(
        name="negocio de otro dueno",
        conditions={
            "owner_exists": True,
            "business_exists": True,
            "belongs_to_owner": False,
        },
        expected="RECHAZAR_SIN_PERMISOS",
    ),
    DecisionCase(
        name="dueno correcto",
        conditions={
            "owner_exists": True,
            "business_exists": True,
            "belongs_to_owner": True,
        },
        expected="ACTUALIZAR_NEGOCIO",
    ),
)


APPROVAL_DECISION_TABLE = (
    DecisionCase(
        name="registro inexistente",
        conditions={
            "record_exists": False,
            "action": "approve",
        },
        expected="RECHAZAR_NO_ENCONTRADO",
    ),
    DecisionCase(
        name="aprobar registro existente",
        conditions={
            "record_exists": True,
            "action": "approve",
        },
        expected="APROBAR",
    ),
    DecisionCase(
        name="rechazar registro existente",
        conditions={
            "record_exists": True,
            "action": "reject",
        },
        expected="RECHAZAR",
    ),
    DecisionCase(
        name="accion desconocida",
        conditions={
            "record_exists": True,
            "action": "archive",
        },
        expected="ACCION_INVALIDA",
    ),
)


class BusinessDecisionTableTests(unittest.TestCase):
    def test_business_update_ownership_decision_table(self):
        for case in BUSINESS_UPDATE_DECISION_TABLE:
            with self.subTest(case=case.name):
                decision = decide_business_update(**case.conditions)
                self.assertEqual(
                    decision,
                    case.expected,
                    format_decision_table(BUSINESS_UPDATE_DECISION_TABLE),
                )

    def test_business_update_service_implements_decision_table(self):
        service = compact("backend-negocios/src/services/negocio.service.js")

        self.assertIn("constdueno=awaitgetDuenoByUserIdModel(userId)", service)
        self.assertIn("if(!dueno)", service)
        self.assertIn("constnegocio=awaitgetNegocioByIdModel(id_negocio)", service)
        self.assertIn("if(!negocio)", service)
        self.assertIn("negocio.id_dueno!==dueno.id_dueno", service)
        self.assertIn("returnawaitupdateMyNegocioModel", service)

    def test_approval_decision_table(self):
        for case in APPROVAL_DECISION_TABLE:
            with self.subTest(case=case.name):
                decision = decide_approval(**case.conditions)
                self.assertEqual(
                    decision,
                    case.expected,
                    format_decision_table(APPROVAL_DECISION_TABLE),
                )

    def test_admin_approval_services_implement_decision_table(self):
        user_service = compact("backend/src/services/auth.service.js")
        business_service = compact("backend-admin/src/services/negocio.service.js")

        self.assertIn("awaitapproveUserModel", user_service)
        self.assertIn("awaitrejectUserModel", user_service)
        self.assertIn("if(!user)", user_service)

        self.assertIn("awaitgetNegocioByIdModel(id)", business_service)
        self.assertIn("if(!negocio)", business_service)
        self.assertIn("returnawaitapproveNegocioModel(id)", business_service)
        self.assertIn("returnawaitrejectNegocioModel(id)", business_service)


if __name__ == "__main__":
    unittest.main()
