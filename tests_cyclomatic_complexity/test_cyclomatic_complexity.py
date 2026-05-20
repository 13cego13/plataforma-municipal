import tempfile
import unittest
from pathlib import Path

from tests_cyclomatic_complexity.helpers import (
    ROOT,
    analyze_file,
    analyze_paths,
    calculate_complexity,
    format_top_complexities,
)


BACKEND_ANALYSIS_PATHS = (
    "backend/src/controllers",
    "backend/src/services",
    "backend/src/middlewares",
    "backend-admin/src/controllers",
    "backend-admin/src/services",
    "backend-admin/src/middlewares",
    "backend-negocios/src/controllers",
    "backend-negocios/src/services",
    "backend-negocios/src/middlewares",
)

FRONTEND_ANALYSIS_PATHS = (
    "frontend/src/components",
    "frontend/src/context",
    "frontend/src/pages",
    "frontend/src/routes",
    "frontend/src/services",
)


class CyclomaticComplexityTests(unittest.TestCase):
    def test_complexity_counter_detects_common_decision_points(self):
        source = """
        {
          if (user && token) {
            return true;
          }

          for (const item of items) {
            if (item.active || item.pending) {
              return item.value ? 1 : 0;
            }
          }

          try {
            work();
          } catch (error) {
            return false;
          }
        }
        """

        self.assertEqual(calculate_complexity(source), 8)

    def test_function_extractor_finds_arrow_and_classic_functions(self):
        with tempfile.NamedTemporaryFile(
            suffix=".js",
            mode="w",
            encoding="utf-8",
            delete=False,
        ) as temporary:
            temporary.write(
                """
                export const arrowFunction = async () => {
                  if (true) {
                    return 1;
                  }
                };

                export function classicFunction() {
                  return 2;
                }
                """
            )
            temporary_path = Path(temporary.name)

        try:
            records = analyze_file(temporary_path)
        finally:
            temporary_path.unlink(missing_ok=True)

        names = {record.name for record in records}
        self.assertIn("arrowFunction", names)
        self.assertIn("classicFunction", names)

    def test_backend_functions_stay_under_cyclomatic_complexity_limit(self):
        records = analyze_paths(BACKEND_ANALYSIS_PATHS)
        self.assertGreater(len(records), 0)

        max_allowed = 15
        offenders = [
            record for record in records
            if record.complexity > max_allowed
        ]

        self.assertEqual(
            offenders,
            [],
            "Funciones backend que superan la linea base de complejidad:\n"
            + format_top_complexities(offenders),
        )

    def test_frontend_functions_stay_under_cyclomatic_complexity_limit(self):
        records = analyze_paths(FRONTEND_ANALYSIS_PATHS)
        self.assertGreater(len(records), 0)

        max_allowed = 55
        offenders = [
            record for record in records
            if record.complexity > max_allowed
        ]

        self.assertEqual(
            offenders,
            [],
            "Funciones frontend que superan la linea base de complejidad:\n"
            + format_top_complexities(offenders),
        )

    def test_complexity_report_includes_locations_for_prioritization(self):
        records = analyze_paths(BACKEND_ANALYSIS_PATHS + FRONTEND_ANALYSIS_PATHS)
        report = format_top_complexities(records, limit=5)

        self.assertGreater(len(records), 0)
        self.assertIn(":", report)
        self.assertIn("/", report)
        self.assertTrue(any(record.relative_path.startswith("backend") for record in records))
        self.assertTrue(any(record.relative_path.startswith("frontend") for record in records))

    def test_analysis_paths_exist(self):
        for relative_path in BACKEND_ANALYSIS_PATHS + FRONTEND_ANALYSIS_PATHS:
            with self.subTest(path=relative_path):
                self.assertTrue((ROOT / relative_path).exists())


if __name__ == "__main__":
    unittest.main()
