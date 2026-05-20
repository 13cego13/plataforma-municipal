# Pruebas de complejidad ciclomatica

Esta suite esta separada de las pruebas contractuales y de analisis de fronteras. Su objetivo es detectar funciones con demasiadas ramas de decision.

Ejecutar desde la raiz del repositorio:

```powershell
python -m unittest discover -s tests_cyclomatic_complexity
```

O usar el reporte amigable:

```powershell
python run_cyclomatic_tests.py
```

Reglas iniciales:

- Backend: linea base maxima de 15 puntos de complejidad por funcion en controladores, servicios y middlewares.
- Frontend: linea base maxima de 55 puntos de complejidad por funcion en componentes, paginas, rutas, contexto y servicios.

El calculo es estatico y aproximado. Cuenta una base de 1 por funcion y suma decisiones como `if`, `else if`, `for`, `while`, `catch`, `case`, `&&`, `||` y ternarios.

Cuando una funcion supera la linea base, el reporte muestra nombre, archivo, linea y complejidad para priorizar refactorizacion o nuevas pruebas.

La linea base se eligio para que el estado actual del proyecto pase, pero siga protegiendo contra nuevas funciones mas complejas que las existentes. El ranking del runner ayuda a decidir que archivos refactorizar primero.
