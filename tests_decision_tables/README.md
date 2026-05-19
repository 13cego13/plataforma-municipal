# Pruebas de tablas de decision

Esta suite esta separada de las pruebas contractuales, de fronteras y de complejidad ciclomatica. Su objetivo es expresar reglas de negocio como matrices de condiciones y resultado esperado.

Ejecutar desde la raiz del repositorio:

```powershell
python -m unittest discover -s tests_decision_tables
```

O usar el reporte amigable:

```powershell
python run_decision_table_tests.py
```

Tablas incluidas:

- Login: usuario existe, password coincide y estado del usuario.
- Registro: campos completos, longitud de password y correo duplicado.
- Acceso por rol: rol del usuario contra roles permitidos por ruta.
- Actualizacion de negocio: dueno existente, negocio existente y propiedad.
- Aprobacion/rechazo: registro existente y accion solicitada.

Cada tabla tiene dos capas: una funcion Python que representa la regla y una verificacion de que el codigo JS conserva las ramas que implementan esa decision.
