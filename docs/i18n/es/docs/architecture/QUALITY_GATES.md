# Quality Gates Reference (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Este documento es la referencia oficial para todos los controles de calidad de CI en OmniRoute.
Describe cada control, qué valida, en qué trabajo de CI se ejecuta, si utiliza
una línea base de ratchet o una política de aprobado/reprobado, y si bloquea la compilación o es consultivo.

Para consultar un breve resumen y la política de lista de permitidos, consulta la sección "Controles de calidad y ratchets"
en `AGENTS.md`. Para consultar la evaluación crítica, la clasificación de madurez y el plan de
replicación independiente de herramientas del mismo sistema, consulta el
[Manual de controles de calidad](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventario de gates (~90 scripts)

Los scripts se encuentran en `scripts/check/` (gates de políticas) y `scripts/quality/` (motor de ratchet).
La fuente de verdad de CI es `.github/workflows/ci.yml`.

### Vía rápida para PRs de release (`quality.yml`)

`.github/workflows/quality.yml` se ejecuta en los PRs dirigidos a `release/**`. Mantiene en movimiento las ramas de los colaboradores mediante gates rápidos filtrados por rutas, además de una señal consultiva de compilación de producción para los cambios de código:

| Job                                              | Alcance                                                                                                                                                                                                                                                                  | Bloqueante                                                                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PRs de código que no sean borradores y ramas de la cola de Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` con `OMNIROUTE_USE_TURBOPACK=1`; sin carga de artefactos porque ningún job de calidad posterior los consume                           | **Consultivo** (`continue-on-error: true`; eliminar tras una semana de ejecuciones estables de PRs de release) |
| `Docs Gates (fast-path)`                         | PRs de documentación/código; referencias de documentación de la API y docs-all                                                                                                                                                                                           | Sí                                                                                                             |
| `Fast Quality Gates`                             | PRs de código; comprobaciones estáticas, verificación de tipos, verificación de tipos del dashboard y pruebas unitarias afectadas                                                                                                                                        | Sí                                                                                                             |
| `Forgotten sibling tests`                        | PRs de código; seguimiento de módulos modificados hasta consumidores estáticos y posibles pruebas hermanas; las rutas de barrels e importaciones dinámicas se notifican como diagnósticos consultivos, junto con las excepciones referenciadas de la lista de permitidos | **Consultivo**                                                                                                 |
| `Vitest (fast-path)`                             | PRs de código; suite rápida de Vitest                                                                                                                                                                                                                                    | Sí                                                                                                             |
| `Unit Tests fast-path`                           | PRs de código; suite de pruebas unitarias de 4 shards                                                                                                                                                                                                                    | Sí                                                                                                             |
| `No new ESLint warnings`                         | PRs de código; gate de lint que tiene en cuenta las supresiones                                                                                                                                                                                                          | Sí para el repositorio de origen, consultivo para forks                                                        |
| `Merge integrity (changelog + generated skills)` | PRs que no sean borradores; sincronización del registro de cambios y de las skills generadas                                                                                                                                                                             | Sí para el repositorio de origen, consultivo para forks                                                        |

#### Informe de pruebas hermanas olvidadas

`npm run check:forgotten-sibling-tests` reutiliza el resolutor de importaciones en el que se basa el mapa de impacto de las pruebas.
Para cada módulo de producción modificado, informa de forma determinista sobre las cadenas
`módulo/símbolo modificado -> consumidor estático -> posible prueba hermana` cuando la prueba candidata
no está presente en el diff del pull request. El resumen en Markdown y el resultado JSON se conservan como
artefacto `forgotten-sibling-tests` del workflow para su calibración antes de cualquier despliegue bloqueante.

Las reexportaciones mediante barrels y las importaciones dinámicas son únicamente diagnósticos de resolución; nunca generan un
hallazgo bloqueante. Las excepciones revisadas se encuentran en
`config/quality/forgotten-sibling-allowlist.json`. Cada entrada debe indicar el consumidor y la prueba
candidata, proporcionar una justificación específica y enlazar un issue o pull request de GitHub. Las entradas con formato incorrecto
provocan un fallo preventivo. Las excepciones no pueden suprimir una prueba candidata eliminada ni un diff que añada `.skip`/`.todo`;
el debilitamiento de aserciones y otros tipos de enmascaramiento siguen siendo responsabilidad del gate bloqueante independiente
`check:test-masking`.

### Job: `lint`

Se ejecuta en cada PR dirigido a `main`. Bloquea la fusión en caso de fallo.

| Script (`npm run ...`)            | Valida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Bloqueante                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `check:node-runtime`              | La versión de Node.js está dentro del rango compatible                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sí                                          |
| `check:cycles`                    | Importaciones circulares — todos los módulos de `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sí                                          |
| `check:route-validation:t06`      | Hay esquemas de Zod en todas las rutas (política de nivel 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Sí                                          |
| `check:any-budget:t11`            | El número de `@ts-expect-error // any` no supera el límite (catraca de nivel 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Sí                                          |
| `check:provider-consistency`      | Cada proveedor de `providers.ts` tiene una entrada correspondiente en `providerRegistry.ts` (y viceversa, dentro de la lista de permitidos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sí                                          |
| `check:model-lifecycle`           | Las tres tablas de enrutamiento mantenidas manualmente permanecen coherentes con la instantánea del ciclo de vida incluida en el repositorio (#11503): `FITNESS_TABLE` (`taskFitness.ts`) no puntúa ningún id retirado que `REGISTRY` pueda enrutar; cada destino de `BUILT_IN_ALIASES` está presente en `REGISTRY` y ausente de la instantánea de ids retirados; cada id retirado que aún esté en `REGISTRY` se reenvía o figura en `allowedRetiredInCatalog`; y ningún origen o destino de `DEFAULT_DEGRADATION_MAP` aparece como retirado en esa instantánea. Esto no demuestra que un modelo esté siendo servido actualmente por un proveedor ascendente activo. Sin conexión: compara con `config/quality/model-lifecycle.json`, que se actualiza manualmente con `npm run quality:refresh-model-lifecycle` (requiere red; no está integrado en CI). `allowedRetiredInCatalog` es un mecanismo de reducción progresiva: añade una entrada únicamente con una incidencia de seguimiento. | Sí                                          |
| `check:fetch-targets`             | Cada `fetch("/api/...")` en `src/` del lado del cliente se resuelve a un `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Sí                                          |
| `check:deps`                      | Todas las dependencias instalables mediante `npm install` de cada `package.json` del repositorio están en `dependency-allowlist.json`; se marcan los paquetes nuevos sin versión fijada o con nombres susceptibles de _slopsquatting_                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sí                                          |
| `audit:deps`                      | `npm audit` (raíz + electron): sin avisos de gravedad alta/crítica (se solapa con `check:vuln-ratchet` de osv; consulta la Lista de racionalización pendiente)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sí                                          |
| `check:lockfile`                  | Integridad de `package-lock.json`: registro https, hashes de integridad y sin anulaciones de host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Sí                                          |
| `check:licenses`                  | Lista de licencias SPDX permitidas para las dependencias de producción                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sí                                          |
| `check:tracked-artifacts`         | Sin artefactos de compilación ni enlaces simbólicos de `node_modules` incluidos en el control de versiones (también se ejecuta en el pre-commit de husky; el pre-push es intencionadamente ligero — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sí                                          |
| `check:vitest-exclusions`         | Cada exclusión de Vitest indica una incidencia de seguimiento y aparece en `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Sí                                          |
| `check:file-size`                 | Ningún archivo fuente supera el límite por extensión (ratchet: archivos grandes inmovilizados en la lista `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Sí                                          |
| `check:error-helper`              | Las respuestas de error en ejecutores/controladores usan `buildErrorBody()` / `sanitizeErrorMessage()` (Regla estricta n.º 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sí                                          |
| `check:migration-numbering`       | Los archivos SQL de migración están numerados secuencialmente, sin omisiones ni duplicados                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Sí                                          |
| `check:public-creds`              | Ningún `client_id`/`client_secret` literal de OAuth ni claves web de Firebase fuera de `publicCreds.ts` (Regla estricta n.º 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Sí                                          |
| `check:db-rules`                  | Ningún SQL sin procesar fuera de los módulos de `src/lib/db/`; ninguna importación de barril desde `localDb.ts` (Reglas estrictas n.º 2/n.º 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Sí                                          |
| `check:known-symbols`             | Los ejecutores de proveedores, las estrategias de enrutamiento y los traductores registrados en sus tablas de despacho coinciden con los archivos del disco; no hay símbolos huérfanos ni sin declarar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sí                                          |
| `check:route-guard-membership`    | Cada ruta que inicia un proceso secundario está clasificada por `isLocalOnlyPath()` (Reglas estrictas n.º 15/n.º 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Sí                                          |
| `check:test-discovery`            | Cada archivo `*.test.ts` / `*.spec.ts` del repositorio es recopilado por al menos un ejecutor de pruebas (control incremental: la lista de archivos huérfanos de `test-discovery-baseline.json` solo puede reducirse)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Sí                                          |
| `check:agent-skills-sync`         | Los artefactos generados de habilidades de agentes coinciden con su catálogo de origen (sin divergencias)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Los logotipos/recursos de los proveedores cuentan con una entrada de procedencia registrada                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | Los archivos de configuración JSON se analizan correctamente y cumplen las reglas de lint del repositorio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | Compilación de TypeScript sin errores (solo advertencias informativas)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Sí                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` estricto, con vistas al futuro; muchos sitios de llamada preexistentes aún necesitan anotaciones                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Informativo** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitado a `src/app/(dashboard)/**` (#7033): la lista de permitidos seleccionada de 27 archivos de `typecheck:core` no incluye ningún TSX del panel, y `next build` tampoco realiza nunca la comprobación de tipos (`next.config.mjs` establece `ignoreBuildErrors: true`), por lo que las regresiones de identificadores huérfanos allí (#6625/#6909) eran invisibles para CI. Compara con una línea base congelada del recuento por archivo y por código TS (`config/quality/dashboard-typecheck-baseline.json`, el mismo patrón de aplicación ante obsolescencia que `check:known-symbols`): solo los errores NUEVOS que superen el recuento de la línea base hacen que la puerta de control falle; reduzca progresivamente la línea base con `--update` cuando se corrija un error preexistente.                                                                                                                                                                                   | Sí                                          |

### Tarea: `quality-gate`

Se ejecuta después de `test-coverage`. Bloquea la fusión en caso de fallo.

| Script                       | Valida                                                                                                                                                                                                                                      | Bloqueante                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Genera `quality-metrics.json` (recuento de advertencias de ESLint, cobertura del informe combinado de fragmentos)                                                                                                                           | Sí (precede al trinquete) |
| `quality:ratchet`            | Ninguna métrica de `quality-baseline.json` ha empeorado (advertencias de ESLint ≤ línea base; cobertura ≥ línea base)                                                                                                                       | Sí                        |
| `check:duplication`          | La duplicación de código (jscpd@4) no supera la línea base de `quality-baseline.json`                                                                                                                                                       | Sí                        |
| `check:complexity`           | La complejidad ciclomática por archivo no supera el límite (`complexity` de ESLint principal + `max-lines-per-function`)                                                                                                                    | Sí                        |
| `check:cognitive-complexity` | Trinquete de complejidad cognitiva (`eslint-plugin-sonarjs`): pasada independiente de ESLint; CI ejecuta ambas combinadas en el único paso `check:complexity-ratchets`                                                                      | Sí                        |
| `check:dead-code`            | El trinquete de exportaciones/archivos sin usar (knip) no empeora con respecto a la línea base                                                                                                                                              | Sí                        |
| `check:compression-budget`   | Presupuesto de referencia de compresión: los mínimos de ahorro de tokens por motor no deben empeorar                                                                                                                                        | Sí                        |
| `check:type-coverage`        | El trinquete del porcentaje tipado (`type-coverage`) no empeora; sustituye en gran medida a `typecheck:noimplicit:core`                                                                                                                     | Sí                        |
| `check:codeql-ratchet`       | El recuento de alertas abiertas de CodeQL no empeora (se consulta mediante `gh api`; se omite de forma controlada sin token): para consultar la cadencia de actualización y el desencadenador manual, véase «Trinquete de CodeQL» más abajo | Sí                        |

### Tarea: `quality-extended`

Todo el trabajo es consultivo (`continue-on-error: true`). Los controles progresivos basados en npm se ejecutan
realmente; los escáneres externos se instalan mediante `gh release download` y se omiten automáticamente (exit 0)
cuando un binario sigue sin estar presente.

| Script                   | Valida                                                                                                                                                                                                                    | Bloqueante     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check:circular-deps`    | No hay dependencias circulares (dpdm)                                                                                                                                                                                     | **Consultivo** |
| `check:bundle-size`      | El tamaño del paquete no supera el límite                                                                                                                                                                                 | **Consultivo** |
| `check:secrets`          | Detección de secretos (gitleaks) — se omite si el binario no está presente                                                                                                                                                | **Consultivo** |
| `check:vuln-ratchet`     | Las vulnerabilidades de las dependencias (osv-scanner) no empeoran — se omite si el binario no está presente                                                                                                              | **Consultivo** |
| `check:workflows`        | Análisis de workflows (actionlint + zizmor) — se omite si los binarios no están presentes                                                                                                                                 | **Consultivo** |
| `check:openapi-breaking` | Cambios incompatibles en el contrato de la API pública (`openapi.yaml`) respecto a la rama base (oasdiff) — emite `openapiBreaking=N`; se omite si oasdiff no está presente o no se puede resolver la especificación base | **Consultivo** |

### Trabajo: `docs-sync-strict`

Se ejecuta en cada PR a `main`. Bloquea la fusión si falla.

| Script                         | Valida                                                                                                                                                                                                                | Bloqueante                     |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `check:docs-all`               | Puerta de control principal que ejecuta secuencialmente las 6 puertas secundarias indicadas a continuación                                                                                                            | Sí                             |
| ↳ `check:docs-sync`            | Coherencia de versiones entre CHANGELOG / OpenAPI / llm.txt                                                                                                                                                           | Sí                             |
| ↳ `check:docs-counts`          | Los recuentos en el texto (número de proveedores, número de migraciones, etc.) están dentro de la ventana de control progresivo de los recuentos reales                                                               | Sí                             |
| ↳ `check:env-doc-sync`         | Cada variable de entorno de `.env.example` está documentada en una tabla de documentación y viceversa                                                                                                                 | Sí                             |
| ↳ `check:deprecated-versions`  | No hay cadenas de versiones obsoletas en la documentación                                                                                                                                                             | Sí                             |
| ↳ `check:doc-links`            | Los enlaces markdown internos de la documentación apuntan a archivos reales (formato `[text]`/`(path)`)                                                                                                               | Sí                             |
| ↳ `check:fabricated-docs`      | Las rutas, variables de entorno, comandos de CLI, nombres de hooks y rutas de archivos citados en la documentación existen en el código base. Puerta estricta mediante `--strict`; fallo no bloqueante sin la opción. | Sí (mediante `--strict` en CI) |
| `check:cli-i18n`               | Las cadenas de comandos de CLI están presentes en todos los archivos de configuración regional de i18n                                                                                                                | Sí                             |
| `check:openapi-coverage`       | La especificación OpenAPI cubre al menos un umbral mínimo ajustado progresivamente de las rutas reales                                                                                                                | Sí                             |
| `check:openapi-security-tiers` | Las anotaciones de niveles de seguridad de `openapi.yaml` son coherentes con las clasificaciones de `routeGuard.ts`                                                                                                   | **Consultivo**                 |
| `check:openapi-routes`         | Cada ruta de `openapi.yaml` corresponde a un `route.ts` real (antialucinación)                                                                                                                                        | Sí                             |
| `check:docs-symbols`           | Cada referencia `/api/...` de `docs/**/*.md` corresponde a un `route.ts` real (antialucinación)                                                                                                                       | Sí                             |
| `i18n translation drift`       | Claves sin traducir en los archivos de configuración regional de i18n — solo advertencia                                                                                                                              | **Consultivo**                 |

### Trabajo: `i18n-ui-coverage`

| Script                            | Valida                                                                                                                                                                                                                  | Bloqueante      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | La cobertura de claves i18n de la interfaz es ≥ 65 %                                                                                                                                                                    | Sí              |
| `check-ui-value-drift` (inline)   | Un **valor** en inglés reescrito no deja ninguna traducción obsoleta                                                                                                                                                    | Sí              |
| `check-new-key-coverage` (inline) | Una clave en inglés **nueva** está traducida en todos los locales; se rechaza un marcador `__MISSING__:`                                                                                                                | Sí              |
| `check-translation-ratio`         | La proporción de traducciones reales por locale (hojas idénticas al inglés, marcadores de posición o ausentes fuera de la lista de permitidos) no debe superar `config/quality/i18n-translation-baseline.json` + margen | **Informativo** |

Necesita `fetch-depth: 0`, ya que la comprobación de desviación de valores compara `en.json` con la base de fusión.

#### `check-ui-value-drift` — comprobación de traducciones obsoletas

Detecta la única regresión de i18n que las demás comprobaciones no pueden detectar estructuralmente: se reescribe un valor en inglés y las traducciones derivadas del inglés _anterior_ permanecen, por lo que los usuarios que no usan inglés siguen leyendo un texto redactado con seguridad, pero que ahora es incorrecto.

Esto llegó a producción. `oauthModal.googleOAuthWarning` se reescribió cuando se incorporó el asistente de inicio de sesión Antigravity (#5203); **39 de 43 locales** conservaron el texto que indicaba a los operadores que debían «copiar la URL completa y pegarla abajo», un flujo que no puede completarse con ese proveedor. Pasó inadvertido hasta #8463 porque:

- `sync-ui-keys` solo rellena claves que están **ausentes**, nunca las que están **obsoletas**;
- `check-ui-keys-coverage` cuenta la _presencia_ de claves, por lo que una traducción obsoleta se considera cubierta;
- `check-translation-drift` supervisa los espejos de documentación `docs/i18n/<locale>/**.md`; nunca lee `src/i18n/messages/*.json`. Es bloqueante en el job `docs-sync-strict` desde la resincronización de 2026-09: edite un documento principal → `npm run i18n:run -- --files=<doc>` (por sección, económico).

**Sensible a diferencias, no basado en una línea base.** Compara `en.json` en la base de fusión con el árbol de trabajo; por cada clave cuyo valor en inglés haya cambiado, cualquier locale que aún conserve una traducción intacta se considera obsoleto. Esto **congela deliberadamente la deuda preexistente**: una diferencia no puede revelar de qué versión antigua en inglés procede una traducción existente desde hace tiempo, por lo que la comprobación solo evalúa lo que modifica el cambio actual. La alternativa (una línea base de hashes por clave) requeriría un archivo generado de ~600 KB, tres veces mayor que la línea base existente más grande, y cambiaría en cada PR de i18n.

Hay dos formas de cumplirla:

1. actualizar las traducciones afectadas, o
2. establecerlas en `__MISSING__:<new english>`; en ese caso, el entorno de ejecución sirve el inglés corregido (`src/i18n/request.ts::deepMergeFallback`, #7258) y la clave queda en cola para su traducción.

Si cambió el **significado** de la cadena, es preferible **cambiar el nombre de la clave**: una clave nueva no puede heredar una traducción obsoleta. Ese es el patrón que utilizó #8463.

```bash
npm run i18n:check-value-drift          # estricto (lo que ejecuta CI)
npm run i18n:check-value-drift:warn     # solo informar
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Finaliza con código 0 y `SKIP reason=base-unresolved` cuando no se puede leer el catálogo base (clon superficial sin la referencia base), igual que `check-openapi-breaking`.

### Job: `i18n`

Matriz completa de validación de i18n (un job por locale). Todo el job es informativo.

| Script                          | Valida                                 | Bloqueante                                                 |
| ------------------------------- | -------------------------------------- | ---------------------------------------------------------- |
| `validate_translation.py quick` | Integridad de la traducción por locale | **Informativo** (`continue-on-error: true` en todo el job) |

### Job: `pr-test-policy`

Se ejecuta únicamente en solicitudes de incorporación de cambios.

| Script                 | Valida                                                                                                                                                           | Bloqueante |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | Las PR que modifican código de producción en `src/`, `open-sse/`, `electron/` o `bin/` deben incluir o actualizar pruebas (Regla estricta n.º 8)                 | Sí         |
| `check:test-masking`   | Los archivos de prueba modificados no reducen el número neto de aserciones ni añaden tautologías `assert.ok(true)`                                               | Sí         |
| `check:pr-evidence`    | El cuerpo de la PR cita pruebas o evidencia de VPS para el cambio (mecaniza la Regla estricta n.º 18 buscando en el texto de la PR; es frágil, consulte Backlog) | Sí         |

### Job: `test-vitest`

Se ejecuta después de `build`. Bloquea la fusión si falla.

| Suite            | Valida                                                              | Bloqueante                                                                                                                               |
| ---------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Servidor MCP (110 herramientas), autoCombo, caché — ejecutor vitest | Sí                                                                                                                                       |
| `test:vitest:ui` | Pruebas de componentes de la UI — ejecutor vitest                   | **Bloqueante** — los fallos preexistentes se excluyen explícitamente en `vitest.config.ts`; los fallos nuevos hacen que el trabajo falle |

### Flujos de trabajo nocturnos (programados, informativos)

Se ejecutan según una programación cron (y mediante `workflow_dispatch`), nunca en PR. Todos son informativos.

| Flujo de trabajo       | Valida                                                                                                                                                                                                | Bloqueante      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | Pruebas de propiedades con fast-check, con una semilla aleatoria y un número elevado de ejecuciones                                                                                                   | **Informativo** |
| `nightly-resilience`   | Control del crecimiento del heap, inyección caótica de fallos y pruebas de carga/resistencia con k6                                                                                                   | **Informativo** |
| `nightly-llm-security` | Protección contra inyección con promptfoo (modo de bloqueo) + sondas de garak (se omiten sin el secreto de un proveedor)                                                                              | **Informativo** |
| `nightly-schemathesis` | Fuzzing de contratos OpenAPI (schemathesis) contra una instancia activa de OmniRoute usando `docs/openapi.yaml` — detecta infracciones de la especificación / errores 500 no controlados (Fase 8 B.4) | **Informativo** |
| `nightly-mutation`     | Puntuación de pruebas de mutación de Stryker sobre la vía rápida de pruebas unitarias — los mutantes supervivientes revelan aserciones débiles                                                        | **Informativo** |
| `nightly-compat`       | Matriz de compatibilidad del motor de Node en los intervalos compatibles de `engines.node`                                                                                                            | **Informativo** |

---

## Fase de velocidad (2026-08-30 → v4.0 LTS): todos los valores de referencia se flexibilizaron un 20%

Decisión del responsable (2026-08-30): hasta la modularización de v4.0, la velocidad de entrega importa más
que contener la deuda. Todos los valores de referencia **numéricos** del mecanismo de ajuste progresivo se flexibilizaron un 20% en una
única operación auditable, y la fase se declara en `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Qué cambió                                                                                                                                                                                                                                                 | Dónde                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — recuentos donde un valor menor es mejor ×1.2, porcentajes donde un valor mayor es mejor ÷1.2 (se mantiene el mínimo de cobertura de 60, `eslintErrors` permanece en 0, `eslintWarnings` 0 → 20% del recuento congelado de supresiones) | `quality-baseline.json` (la nota `_relax_velocity_2026_08_30` enumera cada valor anterior → posterior) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, cada límite de líneas de `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                              | `file-size-baseline.json`                                                                              |
| recuentos por archivo / por código TS ×1.2                                                                                                                                                                                                                 | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` pasa a ser informativo mientras `_policy.requireTighten === false`                                                                                                                                                                     | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| el proceso nocturno `bank-ratchet-shrinks` se pausa (registraría la reducción medida y eliminaría el margen disponible)                                                                                                                                    | `.github/workflows/nightly-release-green.yml`                                                          |

Las listas de elementos permitidos (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **no** son presupuestos y no se modificaron. Las puertas de política de aprobación/rechazo (secretos, reglas SQL,
contrato de documentación/entorno, paridad de i18n, pruebas unitarias) no cambian: una prueba en rojo sigue siendo una prueba en rojo.

**Herramientas**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — la
  flexibilización de una sola ejecución (`scripts/quality/relax-baselines.mjs`); se niega a ejecutarse dos veces con la
  misma nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mide cada puerta numérica del mismo modo que CI y muestra el margen restante por puerta
  (`scripts/quality/baseline-headroom.mjs`). El trabajo nocturno `baseline-headroom` publica la
  tabla en la incidencia activa **📈 Margen de los valores de referencia (fase de velocidad)** y añade la
  etiqueta `headroom-alert` cuando alguna puerta está a menos del 10% de su límite o ya lo ha superado. Esa incidencia
  sirve como alerta temprana: un presupuesto que se agota en cuestión de días significa que la flexibilización está siendo consumida por
  unos pocos PR, no por todo el equipo; consulte las notas `_rebaseline_*` de la puerta infractora.

**Modo de código nuevo (Clean-as-You-Code): desde 2026-08-30, solo para la ruta rápida de PR**

En eventos `pull_request`, `quality.yml` pasa `--base-ref <PR base SHA>` a `check:file-size`,
`check:complexity-ratchets` y `check:dead-code`. En ese modo, la puerta compara HEAD con la
base de fusión **restringida a los archivos modificados por el PR** (`scripts/check/newCodeMode.mjs`: la
base de fusión se materializa en un `git worktree` desechable; ESLint/knip se ejecutan allí y en HEAD, y se
calculan las diferencias de los recuentos por archivo):

- **bloqueante** — el PR añadió infracciones de complejidad ciclomática/cognitiva o exportaciones sin usar en los archivos que modificó
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` en el registro);
- **informativo** — el total global frente al valor de referencia congelado. La desviación heredada nunca pone en rojo un
  PR que no la causó; la desviación se vuelve a congelar durante la conciliación de la versión y queda supervisada por el trabajo de margen.

Las ejecuciones de `workflow_dispatch`, la comprobación integral de release-green y el trabajo nocturno de margen no tienen una base de PR
y mantienen la comparación absoluta (global). La cobertura, la duplicación y la cobertura de tipos siguen siendo globales
por ahora (sus herramientas no generan de forma económica una diferencia por archivo); son candidatas para recibir el mismo tratamiento.

**Cierre de la fase en v4.0 (LTS = más estricto que antes, no «volver a la normalidad»)**

1. En la punta limpia de `release/v4.0.0`: ejecutar `npm run quality:headroom --json` para dejar constancia y, a continuación,
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` y el
   `--update` de cada puerta de verificación de tipos; cada línea base se reduce al valor medido.
2. Eliminar `_policy` de `quality-baseline.json` (reactiva `--require-tighten` y la acumulación
   nocturna) y restaurar `THRESHOLD = 36` (o un valor superior) en `check-openapi-coverage.mjs`.
3. Endurecer los límites más allá de lo medido donde la modularización haya dado resultado: restablecer el `cap` de tamaño de archivo a 1000
   (u 800), aumentar en 5 los mínimos de cobertura y fijar en 0 las exportaciones sin usar para los paquetes modularizados.

## Línea base del ratchet (`quality-baseline.json`)

El motor del ratchet (`scripts/quality/check-quality-ratchet.mjs`) lee `quality-baseline.json`
y lo compara con el archivo `quality-metrics.json` recién generado. Cualquier métrica que empeore
más allá de su épsilon hace que la compilación falle.

Métricas supervisadas actualmente:

| Métrica               | Dirección | Significado                                          |
| --------------------- | --------- | ---------------------------------------------------- |
| `eslintWarnings`      | `down`    | El número de advertencias de ESLint no debe aumentar |
| `coverage.statements` | `up`      | La cobertura de sentencias no debe disminuir         |
| `coverage.lines`      | `up`      | La cobertura de líneas no debe disminuir             |
| `coverage.functions`  | `up`      | La cobertura de funciones no debe disminuir          |
| `coverage.branches`   | `up`      | La cobertura de ramas no debe disminuir              |

Para actualizar la línea base después de una mejora real:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

La opción `--update` escribe los valores medidos actuales en `quality-baseline.json`.
Confirma este archivo junto con el cambio que mejoró la métrica. Un PR que mejore una
métrica sin actualizar la línea base será detectado por `--require-tighten` (Fase 6A.5,
implementación pendiente).

### Ratchet de CodeQL: frecuencia de actualización y activación manual

`check:codeql-ratchet` lee **el estado del repositorio, actualizado según una programación, no en cada PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` informa
`state: configured`, `schedule: weekly`: es el análisis de configuración predeterminada de GitHub, no un
análisis por cada push. Consecuencia: después de que se fusiona un PR que CORRIGE alertas, el ratchet sigue leyendo
el recuento anterior, más alto, hasta que se ejecuta el siguiente análisis programado, por lo que informa de una regresión
en cada PR abierto, incluidos los PR de seguimiento del propio PR correctivo, hasta que el análisis se actualiza.

**Actualización manual**: `gh workflow run codeql.yml --ref release/vX.Y.Z` vuelve a ejecutar el
análisis y republica las alertas en cuestión de minutos. Lee `.github/workflows/codeql.yml`
primero: su encabezado explica que solo usa `workflow_dispatch` **porque entra en conflicto con
la "configuración predeterminada" de GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Restaurar los activadores `push`/`pull_request`/
`schedule` requiere primero una **acción del propietario**: Settings → Code security →
CodeQL: Default → Advanced. No añadas un activador `schedule:` sin realizar ese cambio, ya que
solo producirá ejecuciones fallidas.

**Ajusta la línea base después de que disminuya el recuento**: `node scripts/check/check-codeql-ratchet.mjs
--update` escribe el nuevo recuento medido en `quality-baseline.json` →
`metrics.codeqlAlerts.value`, para que el ratchet no permita silenciosamente una regresión hasta
el límite anterior. Ejemplo práctico (2026-09-02/03): el PR #12502 corrigió 7 alertas reales
(13 → 6 abiertas según la medición); el PR #12530 ajustó la línea base congelada de 11 → 6 para que coincidiera; las
6 restantes se descartaron después con una justificación individual para cada alerta, hasta llegar a 0 abiertas.

**Los descartes son decisión del operador (Regla estricta #14)**: nunca descartes una alerta de CodeQL
sin registrar la justificación técnica en el comentario de descarte: `won't fix` para
un requisito de un protocolo externo, `used in tests` para un fixture de prueba, `false positive`
para un sanitizador que CodeQL no puede detectar (precedente: `docs/security/ERROR_SANITIZATION.md`).

---

## Política de reintentos de pruebas (WS5.4, v3.8.49)

Los reintentos se configuran por runner, nunca como una política global indiscriminada, ya que un reintento indiscriminado convierte regresiones reales
en fallos intermitentes invisibles:

| Runner           | Política                                                                                                                                           | Motivo                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` solo en CI, con `trace: on-first-retry`                                                                                               | Los tiempos del navegador y de la red son realmente no deterministas; un reintento con una traza convierte un fallo intermitente en un artefacto diagnosticable |
| Vitest           | SIN reintentos globales. Una prueba con intermitencia demostrada recibe un reintento explícito por prueba (visible en el diff y revisado en el PR) | Mantiene la lista de cuarentena en el repositorio, nunca opaca                                                                                                  |
| node:test (unit) | SIN reintentos, nunca                                                                                                                              | Una prueba unitaria intermitente es un error en la prueba: hay que corregirla, no volver a ejecutarla al azar                                                   |

SLO objetivo una vez que esté disponible la telemetría de intermitencias (WS5.2/5.3): tasa de intermitencia <1% por prueba
(umbral de «corregir ahora»), tasa de éxito ≥95% por pipeline. Valores de referencia del sector:
deben recalibrarse con nuestras propias mediciones.

## Deriva del ratchet en el nivel de release (WS5.5, v3.8.49)

Cuando un ratchet (tamaño de archivo, complejidad, advertencias de eslint) sufre una regresión en la punta PURA de la release,
es decir, la COMBINACIÓN de merges provoca la regresión y ningún PR individual la reproduce en su
propia rama, la corrección corresponde al **capitán de la release, una sola vez, en la
rama de release**: debe preferirse la extracción o refactorización; solo se debe reajustar la línea base con la entrada de
justificación documentada. Nunca se debe trasladar la deriva combinada al PR de un colaborador ni
reajustar la línea base por PR (eso oculta regresiones reales). Primero hay que distinguir el origen: se debe reproducir el
estado rojo contra la punta pura en un worktree de prueba antes de asumir que el PR lo causó.

## Consolidación de reducciones del ratchet: la dirección descendente (#8584)

El ratchet solo está automatizado a medias, y precisamente en la mitad equivocada. **Elevar** un límite es una
edición manual de JSON que tarda diez segundos y constituye la forma más rápida de desbloquear un PR en rojo.
**Reducirlo** exige que alguien ejecute `--update` y confirme el resultado; y hasta que
se incorporó el job `bank-ratchet-shrinks`, ningún workflow lo ejecutaba. La consecuencia medida
(2026-07-25): 18 archivos congelados ya estaban en el límite de 800 líneas para archivos nuevos o por debajo de él; el peor
estaba en 132× (`src/shared/validation/schemas.ts`, 19 líneas con un límite de 2,523); el
techo de complejidad pasó de `1794 → 2169` a lo largo de ~37 notas de reajuste de línea base, con exactamente una
reducción (−1); y «ajustar mediante `--update` en el próximo ciclo» se escribió 31 veces y se cumplió
una sola vez. Un límite que sobrevive al código que lo justificó convierte silenciosamente cada
descomposición completada en un margen de crecimiento para quien edite el archivo a continuación.

`nightly-release-green.yml` → el job **`bank-ratchet-shrinks`** cierra ese ciclo:

|               |                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------- |
| Se ejecuta en | `schedule` (3×/día) + `workflow_dispatch`; deliberadamente **no** en `push`                                      |
| Mide          | la `release/vX.Y.Z` más alta, con la misma resolución y protección contra inyección que `release-green`          |
| Escribe       | `check:file-size --update` y `check:complexity-ratchets --update` (ambos solo reducen por diseño)                |
| Verifica      | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Entrega       | un único PR siempre actualizado contra la rama de release: se actualiza de forma forzada, sin generar nunca spam |

La consolidación se realiza por lotes en vez de por cada push porque no tiene requisitos de latencia (una reducción
consolidada en un plazo de 8 h es suficiente), mientras que una ejecución por merge reconstruiría repetidamente la rama del PR
durante las campañas de merge y pagaría el coste de un recorrido completo de ESLint cada vez. La detección permanece en
push (`release-green`); solo la consolidación se procesa por lotes.

### El verificador de seguridad

El job escribe en las líneas base sin supervisión, por lo que `verify-ratchet-bank.mjs` es lo que hace
que esto sea aceptable. Compara mediante diff el árbol posterior a `--update` con `HEAD` y **cancela el job
antes de que exista ningún commit**, sin abrir ningún PR, salvo que cada cambio sea uno de los siguientes:

- una entrada numérica `frozen` / `testFrozen` **reducida** o **eliminada**
- `complexity-baseline.json` → `count` **reducido**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **reducido**

Cualquier otra cosa falla: elevar un número, añadir una entrada, cambiar `cap`/`testCap` o
eliminar/reescribir una nota `_rebaseline_*` (esas notas constituyen el registro de auditoría que explica por qué existe cada
techo y se almacenan dentro del mismo objeto `frozen` que las entradas de archivo).
Un bot capaz de elevar un límite sería estrictamente peor que la situación actual. Protección contra regresiones:
`tests/unit/verify-ratchet-bank.test.ts`.

El job nunca hace push a `release/*`: un humano fusiona el PR, por lo que una medición errónea
no puede incorporarse sin revisión.

## Política de lista de permitidos

Cada control que no puede fallar por infracciones preexistentes utiliza una lista de permitidos congelada
(p. ej., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). La política es:

**Corrija la causa raíz; use la lista de permitidos solo cuando la infracción sea preexistente y
no pueda corregirse en el mismo PR.**

Al añadir una entrada a una lista de permitidos:

1. Incluya un comentario con la justificación.
2. Haga referencia a la incidencia de seguimiento (p. ej., `// #3498 — Funcionalidad de la fase 2, aún no implementada`).
3. Elimine la entrada en el mismo PR que corrige la infracción; una entrada obsoleta que ya no
   suprima una infracción activa constituye en sí misma un defecto (la comprobación de entradas obsoletas de 6A.3
   hará que el control falle por una entrada huérfana en la lista de permitidos una vez implementada).

**No** añada entradas a la lista de permitidos para hacer que las pruebas pasen más rápido. Un control en verde con una
lista de permitidos creciente genera una falsa sensación de calidad.

### Cuando un control falla en su PR

1. **Lea detenidamente la salida del control**: le indica exactamente qué archivo o símbolo infringió
   la regla.
2. **Corrija la infracción**: la mayoría de los controles son comprobaciones deterministas del sistema de archivos que pasan en cuanto
   el código es correcto.
3. **Si la infracción es preexistente** (es decir, usted no la introdujo, pero el control ahora
   la abarca): añada una entrada a la lista de permitidos con un comentario justificativo y una incidencia de seguimiento.
4. **Si el control es incremental** (cobertura, advertencias de ESLint, duplicación, complejidad):
   su cambio empeoró la métrica. Corrija el problema subyacente o, en casos excepcionales, ejecute
   `npm run quality:ratchet -- --update` si el cambio es intencionado y la degradación de la métrica
   es aceptable, pero documente el motivo en la descripción del PR.
5. **Los controles informativos** (`continue-on-error: true`) son meramente informativos: no bloquean
   la fusión, pero aparecen en el resumen de CI. Corríjalos de todos modos.

---

## Añadir un nuevo control

1. Cree `scripts/check/check-<name>.mjs` (o `.ts`). Los controles de políticas terminan con el código 0/1.
   Los controles de tipo incremental emiten una métrica a `quality-metrics.json` mediante `collect-metrics.mjs`.
2. Añada `"check:<name>": "node scripts/check/check-<name>.mjs"` a `package.json`.
3. Intégrelo en `.github/workflows/ci.yml` dentro del trabajo correspondiente
   (política → `lint` o `docs-sync-strict`; incremental → `quality-gate`).
4. Si tiene una lista de permitidos, aplique `reportStaleEntries()` desde
   `scripts/check/lib/allowlist.mjs` para que las entradas obsoletas se detecten automáticamente.
5. Escriba una prueba en `tests/unit/build/` que cubra la lógica de detección del control.
6. Actualice este documento (añada una fila a la tabla del trabajo correspondiente).

---

## Herramientas para agentes: LSP integrado en el proceso (opcional)

Además de los controles de CI, OmniRoute incluye una estructura base **opcional** de `agent-lsp`
(un archivo `.mcp.json` a nivel de proyecto, Fase 7 Tarea 15). Cree `.mcp.json`
para exponer un servidor de lenguaje TypeScript a los agentes de programación, de modo que resuelvan símbolos /
diagnósticos **antes** de escribir código: un complemento de compilación antes de afirmar que funciona para
`typecheck:core`, que reduce de raíz los errores de «símbolos inventados». Intencionadamente,
no se carga de forma automática (usted elige y verifica el puente MCP↔LSP); una entrada defectuosa solo registra un
error de conexión y nunca interrumpe las sesiones.

---

## Backlog de racionalización (revisión de ROI — Fase 9 Onda 3)

Este inventario se concilió con `ci.yml` el 2026-06-17 (la versión anterior omitía
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Una revisión de ROI del conjunto conciliado
identificó los siguientes candidatos para racionalización. **Las fusiones son cambios
mecánicos de CI; las activaciones/eliminaciones son decisiones de política reservadas
para el operador.** Nada de lo indicado a continuación se ha aplicado todavía.

**También sin documentar anteriormente** (consultivo, señal débil): el trabajo `docs-lint`
(markdownlint + Vale, todo el trabajo con `continue-on-error`) y los flujos de trabajo
independientes de análisis `semgrep.yml` / `codeql.yml` / `scorecard.yml`.
`semgrepFindings: 0` está en `quality-baseline.json`, pero no está conectado a un ratchet
bloqueante en `ci.yml`; actualmente la métrica está huérfana.

### Fusión / deduplicación (mecánico, menor riesgo)

Cada candidato se validó respecto al estado real de los controles el 2026-06-17
(confiar, pero verificar); varias fusiones «obvias» resultaron ocultar deuda y **no** son
sustituciones directas sin complicaciones.

- **`check:docs-sync` se ejecuta dos veces** — de forma independiente en el trabajo `lint` y de nuevo dentro de `check:docs-all` (`docs-sync-strict`) y del hook de pre-commit de husky. ✅ **HECHO** — se eliminó la invocación independiente de `lint`.
- **Análisis de CVE** — ❌ **NO es una fusión limpia.** `audit:deps` falla de forma estricta ante cualquier CVE alta/crítica; `check:vuln-ratchet` (osv) solo falla ante una _regresión_ respecto a la línea base (actualmente 1 MODERATE). Semánticas diferentes: eliminar `audit:deps` supondría perder el control absoluto de vulnerabilidades altas/críticas. Mantener ambos.
- **Detección de ciclos** — ❌ **NO es una fusión limpia.** `check:circular-deps` (dpdm) informa de **91 ciclos** (por eso es consultivo); no puede convertirse en bloqueante sin resolverlos primero y tiene un alcance más amplio que el control verde y seleccionado `check:cycles`. Mantener `check:cycles` como bloqueante; resolver los 91 ciclos de dpdm constituye su propio backlog.
- **Complejidad** — ✅ **HECHO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): un recorrido de ESLint, con recuentos por ruleId para que las líneas base de complejidad ciclomática+máximo de líneas y complejidad cognitiva sigan siendo independientes; los controles individuales `check:complexity` / `check:cognitive-complexity` se mantienen para ejecutar `--update` localmente.
- **Antialucinación de `/api`** — ✅ **HECHO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un inventario del sistema de archivos de `src/app/api`; openapi-routes + docs-symbols siguen informando de forma independiente; los controles individuales se mantienen para las ejecuciones locales.
- **`check:node-runtime` se ejecuta en 11 trabajos** — ⚠️ **ROI bajo.** Cada uno utiliza un ejecutor independiente y la comprobación tarda <1 s; el ahorro total sería de ~10 s, a cambio de perder una protección económica por trabajo. No merece la agitación.
- **`typecheck:noimplicit:core` en el lint de CI** — ✅ **eliminado del trabajo lint** (era consultivo con `continue-on-error`); la superficie de tipos bloqueante es `typecheck:core` + `check:type-coverage`. Se conserva el script local.

### Activar / decidir (política del operador)

- `check:openapi-security-tiers` (consultivo) — ❌ **NO se puede activar limpiamente.** Termina con 0, pero advierte que varias rutas de `traffic-inspector` bajo `LOCAL_ONLY_API_PREFIXES` carecen de la anotación `x-loopback-only: true`. Aplicarlo de forma obligatoria requiere añadir primero esas anotaciones a `openapi.yaml`.
- `typecheck:noimplicit:core` (consultivo) — sustituido en gran medida por el ratchet bloqueante `check:type-coverage`. Convertirlo en ratchet o eliminar la segunda pasada redundante de `tsc`.
- `test:vitest:ui` (ahora **bloqueante**) — los fallos preexistentes están excluidos explícitamente en `vitest.config.ts` mediante comentarios de seguimiento `// #8618`; los fallos nuevos hacen que el trabajo falle.
- `check:secrets` (gitleaks, ratchet bloqueante fijado en 3 falsos positivos documentados) — añadir los 3 a la lista de permitidos para llegar a 0, o degradarlo a consultivo. Se solapa con el análisis de secretos nativo de GitHub + `check:public-creds`.
- `check:pr-evidence` (bloqueante, busca patrones en el texto del cuerpo del PR) — alto riesgo de falsos positivos; eliminarlo debilita la aplicación de la Regla estricta n.º 18, por lo que se trata de una auténtica decisión de política.
- `semgrep` (independiente y consultivo) — se solapa con CodeQL en las familias de OWASP; conectar su línea base a un ratchet o eliminarlo.

---

## Documentación relacionada

- Cadena de suministro (procedencia, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — control de paridad del conjunto de claves

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, trabajo `i18n-ui-coverage`).
Compara el conjunto de claves hoja de cada `src/i18n/messages/<locale>.json` con `en.json` y falla
ante cualquier clave hoja ausente o adicional, independientemente de cuándo se añadió. Los marcadores
`__MISSING__:` cuentan como presentes (su contenido es responsabilidad del control de proporción). Es el
complemento absoluto de los dos controles basados en diferencias/porcentajes: `check-ui-keys-coverage`
impone un mínimo del 80 % por configuración regional (43 claves ausentes de unas ~13,000 siguen dando
un 99.7 %) y `check-new-key-coverage` evalúa únicamente las claves que un PR añade a `en.json`. Un lote
de configuraciones regionales se genera a partir del `en.json` del día en que se crea su rama y se
traduce durante días mientras la base sigue añadiendo claves; el PR del lote no añade ninguna clave por
sí mismo, por lo que ambos controles relacionados permanecieron en silencio cuando el lote 1 (#13044)
se incorporó con 43 claves menos en nueve configuraciones regionales y el lote 2 (#13660), con 10 claves
menos en ocho (2026-09-15). Corrija un fallo con
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; una clave hoja `extra`
significa que el origen la eliminó: elimínela de la configuración regional. `--warn` informa sin
provocar un fallo. `--catalog=cli` ejecuta la misma comparación sobre `bin/cli/locales`
(`npm run i18n:check-keys:cli`); ambos pasos se encuentran en el trabajo `i18n-ui-coverage`.

#### `check-new-key-coverage` — control de i18n para claves nuevas

Control relacionado con `check-ui-value-drift`. Este último detecta un valor en inglés que fue
**reescrito** mientras sus traducciones quedaron desactualizadas; este detecta una clave en inglés que
fue **añadida** sin que algunas configuraciones regionales llegaran a recibirla.

`check-ui-keys-coverage` no puede detectar esta clase de problema: impone un porcentaje mínimo por
configuración regional, y once claves ausentes de unas ~13,000 mantienen la cobertura en el 99.9 %. Un
porcentaje por idioma no puede expresar «esta funcionalidad se publicó sin traducir»: una funcionalidad
completa puede incorporarse a una nueva configuración regional sin texto alguno y no alterar nunca la
cifra.

El incidente que codifica: la fase 3 del Lienzo de orquestación tradujo sus once claves en las 42
configuraciones regionales que existían en ese momento. Horas después, el lote de idiomas de la UE
(#13044) elevó el repositorio a 51 configuraciones regionales, y las nueve nuevas (`el`, `et`, `ga`,
`hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nunca las recibieron. `deepMergeFallback` sustituye una clave
ausente por el inglés, por lo que el modo de fallo fue una interfaz de usuario sin traducir en lugar de
una interfaz en blanco: real y silencioso por diseño.

Al igual que su control relacionado, **tiene en cuenta las diferencias** y compara el inglés en la base
de fusión con el árbol de trabajo, por lo que las carencias preexistentes permanecen congeladas y el
control no necesitó ninguna migración para activarse.

**Un marcador `__MISSING__:<english>` no lo satisface (desde 2026-09-17).** Antes era el aplazamiento
documentado —el entorno de ejecución recurre al inglés correcto—, hasta que ocho PR de funcionalidades
del 2026-09-16 añadieron 61 claves e insertaron el marcador en las 65 configuraciones regionales en vez
de traducirlas: este control aceptó todos los casos, nada bloqueó los PR y el control bloqueante de
proporción de traducciones reales falló después en la punta de la versión para todo el mundo (pt-BR
3.2 % > 2.5 % + 0.5). Ahora un marcador se considera una traducción ausente. Corrija un fallo con
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, o procese
todas las configuraciones regionales en paralelo con `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, seguro en modo desacoplado, se niega a iniciarse sin las
variables de entorno `OMNIROUTE_TRANSLATION_*`). Una clave que deba permanecer en inglés (el nombre
fijado de un producto, motor o indicador) debe incluirse en `scripts/i18n/untranslatable-keys.json`,
nunca ocultarse tras un marcador. `vi` prohíbe por completo los marcadores
(`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — control de pruebas aparcadas

Un archivo incluido en la lista `exclude` de `vitest.config.ts` es una prueba que no se ejecuta, y para
quien examina el árbol parece cobertura. Sesenta y dos archivos se acumularon tras el comentario
`// #8618 — fallo preexistente; elimine esta exclusión cuando se corrija`. La incidencia #8618 se cerró
el 2026-08-11 mientras la lista que supervisaba aumentó de 45 entradas a 62, y cada nueva entrada
heredaba un comentario que apuntaba a una incidencia cerrada. Cuando finalmente se midió la lista
archivo por archivo (#13204), **51 de los 62 pasaron con el árbol actual sin ningún cambio en el código
fuente**.

El control exige que toda exclusión que se resuelva en un archivo real (a) indique una incidencia de
seguimiento y (b) aparezca en `config/quality/vitest-exclusions.json` con su estado medido, de modo que
añadir una sea una diferencia revisable en un archivo específico, en vez de otra línea más en un array
de 60 entradas. Deliberadamente, no vuelve a ejecutar las pruebas excluidas: eso cuesta unos 10 minutos
y corresponde a un trabajo periódico; el inventario registra cuándo se midió cada una por última vez.
