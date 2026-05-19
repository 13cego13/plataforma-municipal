import unittest

from tests_boundary_analysis.helpers import compact, register_payload_is_valid


VALID_REGISTER_PAYLOAD = {
    "nombre": "Ana Perez",
    "correo": "ana@example.com",
    "contrasena": "12345678",
    "razon_social": "Tienda Ana",
    "documento": "123456789",
    "telefono": "3001234567",
}


class AuthBoundaryAnalysisTests(unittest.TestCase):
    def test_register_password_acceptance_boundary_is_8_characters(self):
        cases = (
            ("justo debajo del limite", "1234567", False),
            ("en el limite", "12345678", True),
            ("justo encima del limite", "123456789", True),
        )

        for label, password, expected in cases:
            with self.subTest(label=label, password_length=len(password)):
                payload = {**VALID_REGISTER_PAYLOAD, "contrasena": password}
                self.assertEqual(register_payload_is_valid(payload), expected)

    def test_register_controller_uses_same_password_boundary(self):
        controller = compact("backend/src/controllers/auth.controller.js")

        self.assertIn("cleanData.contrasena.length<8", controller)
        self.assertIn("res.status(400).json", controller)

    def test_register_required_fields_reject_empty_and_whitespace_boundaries(self):
        required_fields = (
            "nombre",
            "correo",
            "razon_social",
            "documento",
            "telefono",
        )

        for field in required_fields:
            for value in ("", "   "):
                with self.subTest(field=field, value=repr(value)):
                    payload = {**VALID_REGISTER_PAYLOAD, field: value}
                    self.assertFalse(register_payload_is_valid(payload))

    def test_register_controller_trims_required_text_fields(self):
        controller = compact("backend/src/controllers/auth.controller.js")

        for field in (
            "nombre",
            "correo",
            "razon_social",
            "documento",
            "telefono",
        ):
            with self.subTest(field=field):
                self.assertIn(f"{field}:{field}?.trim()", controller)
                self.assertIn(f"!cleanData.{field}", controller)


if __name__ == "__main__":
    unittest.main()
