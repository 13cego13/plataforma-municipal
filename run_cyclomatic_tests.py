import sys
import time
import unittest
from collections import defaultdict
from pathlib import Path

from tests_cyclomatic_complexity.helpers import analyze_paths, format_top_complexities
from tests_cyclomatic_complexity.test_cyclomatic_complexity import (
    BACKEND_ANALYSIS_PATHS,
    FRONTEND_ANALYSIS_PATHS,
)


ROOT = Path(__file__).resolve().parent
TESTS_DIR = ROOT / "tests_cyclomatic_complexity"


class CyclomaticResult(unittest.TestResult):
    def __init__(self):
        super().__init__()
        self.records = []
        self._started_at = {}

    def startTest(self, test):
        super().startTest(test)
        self._started_at[test.id()] = time.perf_counter()

    def addSuccess(self, test):
        super().addSuccess(test)
        self._add_record(test, "OK")

    def addFailure(self, test, err):
        super().addFailure(test, err)
        self._add_record(test, "FALLO", self._exc_info_to_string(err, test))

    def addError(self, test, err):
        super().addError(test, err)
        self._add_record(test, "ERROR", self._exc_info_to_string(err, test))

    def _add_record(self, test, status, detail=""):
        parts = test.id().split(".")
        module_name = parts[-3] if len(parts) >= 3 else "tests_cyclomatic_complexity"
        method_name = parts[-1].replace("test_", "").replace("_", " ")
        seconds = time.perf_counter() - self._started_at.get(test.id(), time.perf_counter())
        self.records.append((module_name, method_name, status, seconds, detail))


def load_suite():
    loader = unittest.defaultTestLoader
    return loader.discover(start_dir=str(TESTS_DIR), pattern="test*.py")


def print_top_complexity_report():
    backend_records = analyze_paths(BACKEND_ANALYSIS_PATHS)
    frontend_records = analyze_paths(FRONTEND_ANALYSIS_PATHS)

    print("")
    print("[Ranking backend]")
    print(format_top_complexities(backend_records, limit=8) or "Sin funciones detectadas.")

    print("")
    print("[Ranking frontend]")
    print(format_top_complexities(frontend_records, limit=8) or "Sin funciones detectadas.")


def main():
    suite = load_suite()
    result = CyclomaticResult()
    started = time.perf_counter()
    suite.run(result)
    elapsed = time.perf_counter() - started

    total = result.testsRun
    failures = len(result.failures)
    errors = len(result.errors)
    passed = total - failures - errors

    grouped = defaultdict(list)
    for record in result.records:
        grouped[record[0]].append(record)

    print("")
    print("=" * 72)
    print("PLATAFORMA MUNICIPAL - COMPLEJIDAD CICLOMATICA")
    print("=" * 72)
    print(f"Resultado general : {'APROBADO' if result.wasSuccessful() else 'REVISAR'}")
    print(f"Total ejecutadas  : {total}")
    print(f"Exitosas          : {passed}")
    print(f"Fallidas          : {failures}")
    print(f"Errores           : {errors}")
    print(f"Tiempo total      : {elapsed:.3f}s")
    print("=" * 72)

    for module_name, records in grouped.items():
        local_passed = len([record for record in records if record[2] == "OK"])
        print("")
        print(f"[{module_name}]")
        print(f"  Resultado: {local_passed}/{len(records)} OK")

        for _, method_name, status, seconds, detail in records:
            print(f"  - [{status}] {method_name} ({seconds:.3f}s)")
            if detail and status != "OK":
                for line in detail.strip().splitlines()[-8:]:
                    print(f"      {line}")

    print_top_complexity_report()

    print("")
    print("Comandos utiles:")
    print("  python run_cyclomatic_tests.py")
    print("  python -m unittest discover -s tests_cyclomatic_complexity")

    return 0 if result.wasSuccessful() else 1


if __name__ == "__main__":
    sys.exit(main())
