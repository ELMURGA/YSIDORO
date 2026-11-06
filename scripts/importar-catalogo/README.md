# Importación del catálogo de la web antigua (ipapel.es/isidoro/cpweb)

Orden: `crawl_list.py` (listados de las 321 secciones) → `crawl_detail.py` (ficha y descripción de cada artículo, reanudable) → `build.py` (genera `src/data/catalog.json`).
Los JSON intermedios se escriben en el directorio de trabajo. Necesita `tree.json` (árbol de menús, sacado de la home) para `build.py`.
La web antigua exige cookie de sesión para las fichas y usa HTTP (su TLS es demasiado antiguo para Python/navegadores).
