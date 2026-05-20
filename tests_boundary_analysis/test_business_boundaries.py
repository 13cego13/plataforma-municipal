import unittest

from tests_boundary_analysis.helpers import (
    business_payload_is_valid,
    compact,
    gallery_upload_count_is_valid,
)


VALID_BUSINESS_PAYLOAD = {
    "id_categoria": "cat-1",
    "id_municipio": "mun-1",
    "nombre": "Panaderia Centro",
    "descripcion": "Pan fresco",
    "direccion": "Calle 1 # 2-3",
    "telefono": "3001234567",
}


class BusinessBoundaryAnalysisTests(unittest.TestCase):
    def test_business_required_fields_reject_missing_and_empty_boundaries(self):
        for field in VALID_BUSINESS_PAYLOAD:
            for value in (None, ""):
                with self.subTest(field=field, value=repr(value)):
                    payload = {**VALID_BUSINESS_PAYLOAD, field: value}
                    self.assertFalse(business_payload_is_valid(payload))

    def test_business_controller_checks_all_required_fields(self):
        controller = compact("backend-negocios/src/controllers/negocio.controller.js")

        for field in VALID_BUSINESS_PAYLOAD:
            with self.subTest(field=field):
                self.assertIn(f"!{field}", controller)

    def test_gallery_upload_count_boundary_is_1_to_10_images(self):
        cases = (
            ("sin archivos", 0, False),
            ("primer valor valido", 1, True),
            ("limite superior", 10, True),
            ("justo encima del limite", 11, False),
        )

        for label, file_count, expected in cases:
            with self.subTest(label=label, file_count=file_count):
                self.assertEqual(gallery_upload_count_is_valid(file_count), expected)

    def test_gallery_route_and_controller_use_same_upload_boundaries(self):
        routes = compact("backend-negocios/src/routes/imagen.routes.js")
        controller = compact("backend-negocios/src/controllers/imagen.controller.js")

        self.assertIn('upload.array("imagenes",10)', routes)
        self.assertIn("!req.files||req.files.length===0", controller)
        self.assertIn("res.status(400).json", controller)


if __name__ == "__main__":
    unittest.main()
