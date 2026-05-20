import argparse
import sys
import time
import unittest
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parent
TESTS_DIR = ROOT / "tests"


CATEGORIES = {
    "test_project_structure": (
        "Estructura del proyecto",
        "Verifica apps, manifiestos, dependencias base y entrypoints.",
    ),
    "test_api_route_contracts": (
        "Contratos de rutas API",
        "Verifica montajes Express, endpoints publicos y rutas protegidas.",
    ),
    "test_backend_contracts": (
        "Contratos del backend",
        "Verifica autenticacion, roles, validaciones y queries parametrizadas.",
    ),
    "test_business_domain_contracts": (
        "Dominio de negocios",
        "Verifica reglas de dueno, catalogo publico, imagenes y negocio.",
    ),
    "test_frontend_contracts": (
        "Contratos del frontend",
        "Verifica Axios, sesion, rutas protegidas y servicios del cliente.",
    ),
}


STATUS_LABELS = {
    "success": "OK",
    "failure": "FALLO",
    "error": "ERROR",
    "skip": "OMITIDA",
}


@dataclass
class TestRecord:
    test_id: str
    module_name: str
    class_name: str
    method_name: str
    status: str
    seconds: float
    detail: str = ""

    @property
    def readable_name(self):
        name = self.method_name
        if name.startswith("test_"):
            name = name[5:]
        return name.replace("_", " ")


class FriendlyResult(unittest.TestResult):
    def __init__(self):
        super().__init__()
        self.records = []
        self._started_at = {}
        self._failed_test_ids = set()

    def startTest(self, test):
        super().startTest(test)
        self._started_at[test.id()] = time.perf_counter()

    def addSuccess(self, test):
        super().addSuccess(test)
        if test.id() not in self._failed_test_ids:
            self._add_record(test, "success")

    def addFailure(self, test, err):
        super().addFailure(test, err)
        self._failed_test_ids.add(test.id())
        self._add_record(test, "failure", self._exc_info_to_string(err, test))

    def addError(self, test, err):
        super().addError(test, err)
        self._failed_test_ids.add(test.id())
        self._add_record(test, "error", self._exc_info_to_string(err, test))

    def addSkip(self, test, reason):
        super().addSkip(test, reason)
        self._add_record(test, "skip", reason)

    def addSubTest(self, test, subtest, err):
        super().addSubTest(test, subtest, err)
        if err is not None:
            self._failed_test_ids.add(test.id())
            detail = self._exc_info_to_string(err, test)
            self._add_record(subtest, "failure", detail, parent=test)

    def _add_record(self, test, status, detail="", parent=None):
        base_test = parent or test
        test_id = test.id()
        method_name = getattr(base_test, "_testMethodName", test_id.split(".")[-1])
        parts = base_test.id().split(".")
        module_name = parts[-3] if len(parts) >= 3 else "tests"
        class_name = parts[-2] if len(parts) >= 2 else base_test.__class__.__name__
        started_at = self._started_at.get(base_test.id(), time.perf_counter())

        self.records.append(
            TestRecord(
                test_id=test_id,
                module_name=module_name,
                class_name=class_name,
                method_name=method_name,
                status=status,
                seconds=time.perf_counter() - started_at,
                detail=detail,
            )
        )


def iter_suite_tests(suite):
    for item in suite:
        if isinstance(item, unittest.TestSuite):
            yield from iter_suite_tests(item)
        else:
            yield item


def load_suite():
    loader = unittest.defaultTestLoader
    return loader.discover(start_dir=str(TESTS_DIR), pattern="test*.py")


def print_header(result, elapsed):
    failed = len(result.failures)
    errors = len(result.errors)
    skipped = len(result.skipped)
    total = result.testsRun
    passed = total - failed - errors - skipped
    general = "APROBADO" if result.wasSuccessful() else "REVISAR"

    print("")
    print("=" * 72)
    print("PLATAFORMA MUNICIPAL - REPORTE DE PRUEBAS")
    print("=" * 72)
    print(f"Resultado general : {general}")
    print(f"Total ejecutadas  : {total}")
    print(f"Exitosas          : {passed}")
    print(f"Fallidas          : {failed}")
    print(f"Errores           : {errors}")
    print(f"Omitidas          : {skipped}")
    print(f"Tiempo total      : {elapsed:.3f}s")
    print("=" * 72)


def print_grouped_records(result, verbose=False):
    grouped = defaultdict(list)
    for record in result.records:
        grouped[record.module_name].append(record)

    for module_name, records in grouped.items():
        title, description = CATEGORIES.get(
            module_name,
            (module_name, "Pruebas sin categoria registrada."),
        )
        passed = len([record for record in records if record.status == "success"])
        failed = len([record for record in records if record.status in {"failure", "error"}])
        skipped = len([record for record in records if record.status == "skip"])
        total = len(records)

        print("")
        print(f"[{title}]")
        print(f"  {description}")
        print(f"  Resultado: {passed}/{total} OK, {failed} con problemas, {skipped} omitidas")

        if verbose or failed:
            for record in records:
                label = STATUS_LABELS[record.status]
                print(f"  - [{label}] {record.readable_name} ({record.seconds:.3f}s)")
                if record.detail and record.status in {"failure", "error"}:
                    last_lines = record.detail.strip().splitlines()[-6:]
                    for line in last_lines:
                        print(f"      {line}")


def print_footer(result):
    print("")
    if result.wasSuccessful():
        print("Todo esta en verde. Los contratos actuales del proyecto se mantienen.")
    else:
        print("Hay pruebas con problemas. Revisa los bloques marcados como FALLO o ERROR.")
    print("")
    print("Comandos utiles:")
    print("  python run_tests.py")
    print("  python run_tests.py --verbose")
    print("  python -m unittest discover -s tests")


def main():
    parser = argparse.ArgumentParser(
        description="Ejecuta las pruebas Python con un reporte entendible."
    )
    parser.add_argument(
        "-v",
        "--verbose",
        action="store_true",
        help="Muestra cada caso de prueba dentro de cada categoria.",
    )
    args = parser.parse_args()

    suite = load_suite()
    result = FriendlyResult()
    started = time.perf_counter()
    suite.run(result)
    elapsed = time.perf_counter() - started

    print_header(result, elapsed)
    print_grouped_records(result, verbose=args.verbose)
    print_footer(result)

    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    sys.exit(main())
