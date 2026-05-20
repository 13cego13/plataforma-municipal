# Pruebas Python

Esta suite usa `unittest`, incluido en Python, para validar contratos importantes del proyecto sin requerir PostgreSQL, Supabase ni servidores Express activos.

## Ejecucion recomendada

Desde la raiz del repositorio:

```powershell
python run_tests.py
```

Para ver cada caso de prueba dentro de su categoria:

```powershell
python run_tests.py --verbose
```

## Ejecucion estandar con unittest

```powershell
python -m unittest discover -s tests
```

Cobertura actual:

- Estructura general de los cuatro subproyectos.
- Dependencias principales por `package.json`.
- Montaje de rutas Express.
- Proteccion de endpoints por token y rol.
- Validaciones principales de controladores.
- Contratos de consultas SQL parametrizadas.
- Configuracion del cliente Axios y rutas protegidas del frontend.

Estas pruebas son una base inicial. Para una segunda fase conviene sumar pruebas dinamicas de Node con mocks de PostgreSQL/Supabase o una base de datos de prueba.

## Siguientes tipos de prueba sugeridos

- Analisis de fronteras: valores minimos, maximos y justo fuera del rango para validaciones como contrasena, campos requeridos, estados booleanos y limites de carga de imagenes.
- Complejidad ciclomatica: conteo de ramas por controladores, servicios y middlewares para detectar funciones que ya conviene dividir o cubrir con mas casos.
- Tablas de decision: matrices para reglas como login, aprobacion/rechazo, permisos por rol y propiedad del negocio.
