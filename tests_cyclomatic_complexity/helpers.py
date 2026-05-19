import re
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE_EXTENSIONS = {".js", ".jsx"}


@dataclass(frozen=True)
class FunctionComplexity:
    name: str
    relative_path: str
    line: int
    complexity: int

    @property
    def location(self):
        return f"{self.relative_path}:{self.line}"


FUNCTION_PATTERNS = (
    re.compile(
        r"(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{",
        re.MULTILINE,
    ),
    re.compile(
        r"(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)\s*\{",
        re.MULTILINE,
    ),
)


DECISION_PATTERNS = (
    re.compile(r"\bif\s*\("),
    re.compile(r"\belse\s+if\s*\("),
    re.compile(r"\bfor\s*\("),
    re.compile(r"\bwhile\s*\("),
    re.compile(r"\bcatch\s*\("),
    re.compile(r"\bcase\b"),
    re.compile(r"&&"),
    re.compile(r"\|\|"),
    re.compile(r"\?"),
)


def iter_source_files(paths):
    for path in paths:
        absolute = ROOT / path
        if absolute.is_file() and absolute.suffix in SOURCE_EXTENSIONS:
            yield absolute
            continue

        if absolute.is_dir():
            for source_file in sorted(absolute.rglob("*")):
                if source_file.suffix in SOURCE_EXTENSIONS:
                    yield source_file


def analyze_paths(paths):
    records = []

    for source_file in iter_source_files(paths):
        records.extend(analyze_file(source_file))

    return sorted(records, key=lambda item: item.complexity, reverse=True)


def analyze_file(source_file):
    source = strip_comments_and_strings(source_file.read_text(encoding="utf-8"))
    records = []
    occupied_starts = set()

    for pattern in FUNCTION_PATTERNS:
        for match in pattern.finditer(source):
            if match.start() in occupied_starts:
                continue

            occupied_starts.add(match.start())
            body = extract_braced_block(source, match.end() - 1)
            if body is None:
                continue

            try:
                relative_path = source_file.relative_to(ROOT).as_posix()
            except ValueError:
                relative_path = source_file.name
            line = source.count("\n", 0, match.start()) + 1
            records.append(
                FunctionComplexity(
                    name=match.group(1),
                    relative_path=relative_path,
                    line=line,
                    complexity=calculate_complexity(body),
                )
            )

    return records


def calculate_complexity(source):
    complexity = 1

    for pattern in DECISION_PATTERNS:
        complexity += len(pattern.findall(source))

    return complexity


def strip_comments_and_strings(source):
    source = re.sub(r"/\*.*?\*/", "", source, flags=re.DOTALL)
    source = re.sub(r"//.*", "", source)
    source = re.sub(r"`(?:\\.|[^`])*`", "``", source, flags=re.DOTALL)
    source = re.sub(r'"(?:\\.|[^"])*"', '""', source)
    source = re.sub(r"'(?:\\.|[^'])*'", "''", source)
    return source


def extract_braced_block(source, opening_brace_index):
    depth = 0

    for index in range(opening_brace_index, len(source)):
        character = source[index]

        if character == "{":
            depth += 1
        elif character == "}":
            depth -= 1
            if depth == 0:
                return source[opening_brace_index : index + 1]

    return None


def format_top_complexities(records, limit=10):
    lines = []

    for record in records[:limit]:
        lines.append(
            f"{record.complexity:>2}  {record.name}  {record.location}"
        )

    return "\n".join(lines)
