import re
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]


def read_text(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8")


def compact(relative_path):
    return re.sub(r"\s+", "", read_text(relative_path))


def register_payload_is_valid(payload):
    clean_data = {
        "nombre": trim_optional(payload.get("nombre")),
        "correo": trim_optional(payload.get("correo")),
        "contrasena": payload.get("contrasena"),
        "razon_social": trim_optional(payload.get("razon_social")),
        "documento": trim_optional(payload.get("documento")),
        "telefono": trim_optional(payload.get("telefono")),
    }

    if any(not value for value in clean_data.values()):
        return False

    return len(clean_data["contrasena"]) >= 8


def category_payload_is_valid(payload):
    clean_data = {
        "nombre": trim_optional(payload.get("nombre")),
        "descripcion": trim_optional(payload.get("descripcion")),
        "imagen_url": trim_optional(payload.get("imagen_url")),
    }

    if any(not value for value in clean_data.values()):
        return False

    return image_url_is_valid(clean_data["imagen_url"])


def municipio_payload_is_valid(payload):
    return bool(
        trim_optional(payload.get("nombre"))
        and trim_optional(payload.get("descripcion"))
    )


def business_payload_is_valid(payload):
    required_fields = (
        "id_categoria",
        "id_municipio",
        "nombre",
        "descripcion",
        "direccion",
        "telefono",
    )

    return all(bool(payload.get(field)) for field in required_fields)


def status_value_is_valid(value):
    return isinstance(value, bool)


def gallery_upload_count_is_valid(file_count):
    return 1 <= file_count <= 10


def image_url_is_valid(value):
    try:
        parsed_url = urlparse(value)
    except Exception:
        return False

    if parsed_url.scheme not in {"http", "https"}:
        return False

    return bool(
        re.search(
            r"\.(jpg|jpeg|png|webp|gif|svg|avif)$",
            parsed_url.path,
            re.IGNORECASE,
        )
    )


def trim_optional(value):
    if value is None:
        return None
    return value.strip()
