import unittest

from tests_boundary_analysis.helpers import (
    category_payload_is_valid,
    compact,
    image_url_is_valid,
    municipio_payload_is_valid,
    status_value_is_valid,
)


VALID_CATEGORY_PAYLOAD = {
    "nombre": "Restaurantes",
    "descripcion": "Lugares para comer",
    "imagen_url": "https://example.com/categoria.webp",
}

VALID_MUNICIPIO_PAYLOAD = {
    "nombre": "Medellin",
    "descripcion": "Municipio activo",
}


class CatalogBoundaryAnalysisTests(unittest.TestCase):
    def test_category_image_url_accepts_supported_extensions_at_boundary(self):
        valid_extensions = ("jpg", "jpeg", "png", "webp", "gif", "svg", "avif")

        for extension in valid_extensions:
            with self.subTest(extension=extension):
                url = f"https://example.com/image.{extension}"
                self.assertTrue(image_url_is_valid(url))

    def test_category_image_url_rejects_invalid_protocol_and_extension_boundaries(self):
        cases = (
            "ftp://example.com/image.jpg",
            "https://example.com/image.txt",
            "https://example.com/image",
            "not-a-url",
        )

        for url in cases:
            with self.subTest(url=url):
                self.assertFalse(image_url_is_valid(url))

    def test_category_controller_uses_same_image_url_boundary_rules(self):
        controller = compact("backend-admin/src/controllers/categoria.controller.js")

        self.assertIn('!["http:","https:"].includes(url.protocol)', controller)
        self.assertIn(r"\.(jpg|jpeg|png|webp|gif|svg|avif)$", controller)
        self.assertIn("!isValidImageUrl(cleanData.imagen_url)", controller)

    def test_category_required_fields_reject_empty_and_whitespace_boundaries(self):
        for field in ("nombre", "descripcion", "imagen_url"):
            for value in ("", "   "):
                with self.subTest(field=field, value=repr(value)):
                    payload = {**VALID_CATEGORY_PAYLOAD, field: value}
                    self.assertFalse(category_payload_is_valid(payload))

    def test_municipio_required_fields_reject_empty_and_whitespace_boundaries(self):
        for field in ("nombre", "descripcion"):
            for value in ("", "   "):
                with self.subTest(field=field, value=repr(value)):
                    payload = {**VALID_MUNICIPIO_PAYLOAD, field: value}
                    self.assertFalse(municipio_payload_is_valid(payload))

    def test_status_update_accepts_only_boolean_boundary_values(self):
        cases = (
            (True, True),
            (False, True),
            (None, False),
            ("true", False),
            ("false", False),
            (1, False),
            (0, False),
        )

        for value, expected in cases:
            with self.subTest(value=repr(value)):
                self.assertEqual(status_value_is_valid(value), expected)

    def test_status_controllers_use_strict_boolean_boundary(self):
        categoria_controller = compact("backend-admin/src/controllers/categoria.controller.js")
        municipio_controller = compact("backend-admin/src/controllers/municipio.controller.js")

        self.assertIn('typeofestado!=="boolean"', categoria_controller)
        self.assertIn('typeofestado!=="boolean"', municipio_controller)


if __name__ == "__main__":
    unittest.main()
