import re
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


@dataclass(frozen=True)
class DecisionCase:
    name: str
    conditions: dict
    expected: str
    message: str = ""


def read_text(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8")


def compact(relative_path):
    return re.sub(r"\s+", "", read_text(relative_path))


def decide_login(user_exists, password_matches, user_status):
    if not user_exists:
        return "RECHAZAR_CREDENCIALES"

    if not password_matches:
        return "RECHAZAR_CREDENCIALES"

    if user_status != "APROBADO":
        return "RECHAZAR_NO_APROBADO"

    return "LOGIN_EXITOSO"


def decide_register(required_fields_complete, password_length, email_already_exists):
    if not required_fields_complete:
        return "RECHAZAR_CAMPOS_OBLIGATORIOS"

    if password_length < 8:
        return "RECHAZAR_PASSWORD_CORTA"

    if email_already_exists:
        return "RECHAZAR_CORREO_DUPLICADO"

    return "REGISTRO_EXITOSO"


def decide_role_access(user_role, allowed_roles):
    if user_role in allowed_roles:
        return "PERMITIR"

    return "DENEGAR"


def decide_business_update(owner_exists, business_exists, belongs_to_owner):
    if not owner_exists:
        return "RECHAZAR_DUENO_INEXISTENTE"

    if not business_exists:
        return "RECHAZAR_NEGOCIO_INEXISTENTE"

    if not belongs_to_owner:
        return "RECHAZAR_SIN_PERMISOS"

    return "ACTUALIZAR_NEGOCIO"


def decide_approval(record_exists, action):
    if not record_exists:
        return "RECHAZAR_NO_ENCONTRADO"

    if action == "approve":
        return "APROBAR"

    if action == "reject":
        return "RECHAZAR"

    return "ACCION_INVALIDA"


def format_decision_table(cases):
    lines = ["caso | condiciones | esperado"]

    for case in cases:
        conditions = ", ".join(
            f"{key}={value}" for key, value in case.conditions.items()
        )
        lines.append(f"{case.name} | {conditions} | {case.expected}")

    return "\n".join(lines)
