import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def read_text(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8")


def compact(relative_path):
    return re.sub(r"\s+", "", read_text(relative_path))


class BusinessDomainContractTests(unittest.TestCase):
    def test_business_controller_requires_core_fields_before_creating(self):
        controller = compact("backend-negocios/src/controllers/negocio.controller.js")

        for required_field in (
            "!id_categoria",
            "!id_municipio",
            "!nombre",
            "!descripcion",
            "!direccion",
            "!telefono",
        ):
            with self.subTest(field=required_field):
                self.assertIn(required_field, controller)

        self.assertIn("createNegocioService(req.user.id_usuario", controller)
        self.assertIn("res.status(400).json", controller)
        self.assertIn("res.status(201).json", controller)

    def test_business_service_resolves_owner_and_enforces_ownership_on_update(self):
        service = compact("backend-negocios/src/services/negocio.service.js")

        self.assertIn("awaitgetDuenoByUserIdModel(userId)", service)
        self.assertIn('thrownewError("Dueñodenegocionoencontrado")', service)
        self.assertIn("id_dueno:dueno.id_dueno", service)
        self.assertIn("awaitgetNegocioByIdModel(id_negocio)", service)
        self.assertIn("negocio.id_dueno!==dueno.id_dueno", service)
        self.assertIn('thrownewError("Notienespermisos")', service)

    def test_public_business_queries_only_return_approved_active_catalog_data(self):
        negocio_model = compact("backend-negocios/src/models/negocio.model.js")
        public_controller = compact("backend-negocios/src/controllers/public.controller.js")

        self.assertIn("n.estado_negocio='APROBADO'", negocio_model)
        self.assertIn("c.estado=true", negocio_model)
        self.assertIn("m.estado=true", negocio_model)
        self.assertIn("n.id_categoria=$1", negocio_model)
        self.assertIn("n.id_negocio=$1ANDn.estado_negocio='APROBADO'", negocio_model)

        self.assertIn("n.id_municipio=$1", public_controller)
        self.assertIn("n.id_categoria=$2", public_controller)
        self.assertIn("n.estado_negocio='APROBADO'", public_controller)
        self.assertIn("c.estado=true", public_controller)

    def test_image_controller_requires_uploaded_files(self):
        controller = compact("backend-negocios/src/controllers/imagen.controller.js")

        self.assertIn("!req.file", controller)
        self.assertIn("!req.files||req.files.length===0", controller)
        self.assertIn("res.status(400).json", controller)
        self.assertIn("res.status(201).json", controller)

    def test_image_service_sanitizes_filenames_before_upload(self):
        service = read_text("backend-negocios/src/services/imagen.service.js")

        self.assertIn('.normalize("NFD")', service)
        self.assertIn(r".replace(/[\u0300-\u036f]/g, \"\")".replace(r"\"", '"'), service)
        self.assertIn(r".replace(/\s+/g, \"-\")".replace(r"\"", '"'), service)
        self.assertIn(r".replace(/[^a-zA-Z0-9.-]/g, \"\")".replace(r"\"", '"'), service)
        self.assertIn('supabase.storage\n        .from("negocios")', service)
        self.assertIn("getPublicUrl(fileName)", service)
        self.assertIn("createImagenModel", service)

    def test_business_model_writes_are_parameterized(self):
        model = compact("backend-negocios/src/models/negocio.model.js")

        for fragment in (
            "VALUES($1,$2,$3,$4,$5,$6,$7,'PENDIENTE',NOW(),NOW())",
            "WHEREn.id_dueno=$1",
            "WHEREid_negocio=$7",
            "WHEREid_negocio=$1",
            "SETestado_negocio='INACTIVO'",
            "SETestado_negocio='APROBADO'",
        ):
            with self.subTest(fragment=fragment):
                self.assertIn(fragment, model)

        self.assertNotIn("${", model)


if __name__ == "__main__":
    unittest.main()
