# Pruebas Python

Esta suite usa `unittest`, incluido en Python, para validar contratos importantes del proyecto sin requerir PostgreSQL, Supabase ni servidores Express activos.

Ejecutar desde la raíz del repositorio:

```powershell
python -m unittest discover -s tests
```

Cobertura actual:

- Estructura general de los cuatro subproyectos.
- Dependencias principales por `package.json`.
- Montaje de rutas Express.
- Protección de endpoints por token y rol.
- Validaciones principales de controladores.
- Contratos de consultas SQL parametrizadas.
- Configuración del cliente Axios y rutas protegidas del frontend.

Estas pruebas son una base inicial. Para una segunda fase conviene sumar pruebas dinámicas de Node con mocks de PostgreSQL/Supabase o una base de datos de prueba.
