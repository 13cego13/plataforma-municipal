# Pruebas de analisis de fronteras

Estas pruebas estan separadas de la suite principal para que sea claro que validan limites de entrada y no contratos generales del proyecto.

Ejecutar desde la raiz del repositorio:

```powershell
python -m unittest discover -s tests_boundary_analysis
```

O usar el reporte amigable:

```powershell
python run_boundary_tests.py
```

Cobertura inicial:

- Registro: contrasena de 7, 8 y 9 caracteres.
- Registro: campos obligatorios vacios o con solo espacios.
- Categorias: URL de imagen con protocolos/extensiones permitidas y no permitidas.
- Categorias y municipios: `estado` solo puede ser `true` o `false`.
- Negocios: campos obligatorios faltantes o vacios.
- Imagenes: galeria con 0, 1, 10 y 11 archivos.

Nota: algunas pruebas usan una pequena replica Python de las reglas y ademas verifican que el codigo fuente JS conserve el mismo limite.
