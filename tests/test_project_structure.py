import json
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read_text(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8")


def read_json(relative_path):
    return json.loads(read_text(relative_path))


class ProjectStructureTests(unittest.TestCase):
    def test_project_is_split_into_expected_apps(self):
        expected_apps = {
            "backend": "backend/package.json",
            "backend-admin": "backend-admin/package.json",
            "backend-negocios": "backend-negocios/package.json",
            "frontend": "frontend/package.json",
        }

        for app_name, manifest_path in expected_apps.items():
            with self.subTest(app=app_name):
                self.assertTrue((ROOT / manifest_path).exists())
                self.assertTrue((ROOT / app_name / "src").exists())

    def test_backend_apps_use_express_and_module_syntax(self):
        for manifest_path in (
            "backend/package.json",
            "backend-admin/package.json",
            "backend-negocios/package.json",
        ):
            with self.subTest(manifest=manifest_path):
                package = read_json(manifest_path)
                self.assertEqual(package["type"], "module")
                self.assertIn("express", package["dependencies"])
                self.assertIn("pg", package["dependencies"])
                self.assertIn("jsonwebtoken", package["dependencies"])

    def test_frontend_uses_react_vite_stack(self):
        package = read_json("frontend/package.json")

        self.assertEqual(package["type"], "module")
        self.assertIn("vite", package["devDependencies"])
        self.assertIn("react", package["dependencies"])
        self.assertIn("react-router-dom", package["dependencies"])
        self.assertIn("axios", package["dependencies"])

    def test_express_apps_export_app_without_listening(self):
        for app_path in (
            "backend/src/app.js",
            "backend-admin/src/app.js",
            "backend-negocios/src/app.js",
        ):
            with self.subTest(app=app_path):
                source = read_text(app_path)
                self.assertIn("export default app", source)
                self.assertNotIn(".listen(", source)

    def test_entrypoints_are_responsible_for_listening(self):
        for index_path in (
            "backend/src/index.js",
            "backend-admin/src/index.js",
            "backend-negocios/src/index.js",
        ):
            with self.subTest(entrypoint=index_path):
                source = read_text(index_path)
                self.assertIn("dotenv.config()", source)
                self.assertIn("app.listen", source)
                self.assertIn("process.env.PORT", source)


if __name__ == "__main__":
    unittest.main()
