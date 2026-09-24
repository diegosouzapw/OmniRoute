# Repository Map (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Descripción de una línea para cada directorio y archivo raíz.**
> Última actualización: 2026-06-28 — OmniRoute v3.8.40
>
> Usa este mapa para navegar rápidamente por el código base. Para profundizar, sigue los enlaces a la documentación específica.

## Árbol de nivel superior

```
OmniRoute/
├── src/                  # Aplicación Next.js 16 (interfaz + rutas de API + bibliotecas + dominio + servidor)
├── open-sse/             # Espacio de trabajo del motor de streaming (manejadores, ejecutores, traductor, servidor MCP)
├── electron/             # Contenedor de escritorio (Electron 41 + electron-builder 26.10)
├── bin/                  # Punto de entrada de la CLI y manejadores de comandos
├── scripts/              # Scripts de compilación, comprobación, sincronización y tareas puntuales
├── docs/                 # Documentación pública (estás aquí)
├── tests/                # Todos los conjuntos de pruebas (unitarias, integración, e2e, clientes de protocolo)
├── public/               # Recursos estáticos de Next.js, manifiesto PWA, service worker, iconos
├── config/               # Configuración estática + estado de controles de calidad (i18n, payloadRules, quality/)
├── images/               # Recursos gráficos para marketing / README
├── @omniroute/           # Paquetes complementarios publicables (opencode-plugin, opencode-provider)
├── skills/               # Paquetes de habilidades para CLI/agentes (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugins de ejemplo + plantilla inicial omniroute-cmd-hello
├── contrib/              # Contribuciones de la comunidad (podman/)
├── .source/              # Configuración de origen de Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Flujos de trabajo de GitHub Actions + plantillas de incidencias + plantilla de PR
├── .husky/               # Hooks de Git (pre-commit, pre-push)
├── .claude/              # Comandos con barra de Claude Code (específicos del proyecto)
├── .agents/              # Flujos de trabajo y habilidades para Codex / agentes genéricos (réplica de .claude/)
├── .vscode/              # Configuración del espacio de trabajo de VS Code
├── _ideia/               # Notas de planificación (informales; no se distribuyen)
├── _mono_repo/           # Subproyectos históricos (cloud, site, vscode-extension)
├── _references/          # Clones de referencia de solo lectura de proyectos OSS relacionados
├── _tasks/               # Archivos de seguimiento de tareas por versión (informales)
├── .build/ .worktrees/ dist/   # Áreas temporales locales de compilación / worktrees de Git / resultados de compilación (ignoradas por Git)
├── .issues/              # Caché local de incidencias (ignorada por Git)
├── .playwright-mcp/      # Artefactos de pruebas de Playwright MCP
├── coverage/             # Resultados de cobertura de c8 (ignorados por Git)
├── logs/                 # Registros de ejecución (ignorados por Git)
├── node_modules/         # Dependencias (ignoradas por Git)
├── package/              # Área de preparación de npm pack (artefacto de compilación)
├── .next/                # Resultados de compilación de Next.js (ignorados por Git)
└── (archivos raíz — consulta a continuación)
```

---

## Archivos raíz

| Archivo                                     | Propósito                                                                                                         |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Página de inicio de marketing + inicio rápido + matriz de funcionalidades (véase también `llm.txt`)               |
| **CHANGELOG.md**                            | Registro de cambios por versión (generado automáticamente por la habilidad `/version-bump-cc`)                    |
| **LICENSE**                                 | Texto de la licencia MIT                                                                                          |
| **CLAUDE.md**                               | Reglas del proyecto para agentes de Claude Code (reglas estrictas, convenciones, escenarios)                      |
| **AGENTS.md**                               | Igual que CLAUDE.md, pero para agentes de IA que no sean Claude (Codex, Cursor, etc.)                             |
| **GEMINI.md**                               | Reglas concisas para agentes basados en Gemini (subconjunto de CLAUDE.md)                                         |
| **CONTRIBUTING.md**                         | Guía para colaboradores: configuración, commits convencionales, pruebas, flujo de PR                              |
| **SECURITY.md**                             | Política de notificación de vulnerabilidades, versiones compatibles, modelo de amenazas                           |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — expectativas de comportamiento de la comunidad                                             |
| **llm.txt**                                 | Página de inicio en texto sin formato optimizada para rastreadores de LLM (SEO para asistentes de IA)             |
| **package.json**                            | Manifiesto de npm, scripts, dependencias, motores, umbral de cobertura de c8                                      |
| **package-lock.json**                       | Árbol de dependencias bloqueado                                                                                   |
| **tsconfig.json**                           | Configuración raíz de TypeScript                                                                                  |
| **tsconfig.typecheck-core.json**            | Configuración de comprobación de tipos para el núcleo `src/`                                                      |
| **tsconfig.typecheck-noimplicit-core.json** | Comprobación estricta de tipos (`noImplicitAny`)                                                                  |
| **tsconfig.tsbuildinfo**                    | Caché de compilación incremental de TS (ignorada por Git)                                                         |
| **next.config.mjs**                         | Configuración de compilación de Next.js 16 (salida independiente)                                                 |
| **next-env.d.ts**                           | Tipos de entorno generados automáticamente por Next.js                                                            |
| **eslint.config.mjs**                       | Configuración plana de ESLint (reglas por área del proyecto)                                                      |
| **prettier.config.mjs**                     | Reglas de formato de Prettier                                                                                     |
| **postcss.config.mjs**                      | Configuración de PostCSS para el flujo de Tailwind/CSS                                                            |
| **playwright.config.ts**                    | Configuración de pruebas E2E de Playwright                                                                        |
| **vitest.config.ts**                        | Configuración de Vitest (suite predeterminada)                                                                    |
| **vitest.mcp.config.ts**                    | Configuración de Vitest para las suites del servidor MCP / autoCombo / caché                                      |
| **sonar-project.properties**                | Configuración de SonarQube/SonarCloud (calidad del código)                                                        |
| **Dockerfile**                              | Compilación de Docker en varias etapas (builder → runner-base → runner-cli)                                       |
| **docker-compose.yml**                      | Compose de desarrollo con 4 perfiles (base, cli, host, cliproxyapi) + contenedor auxiliar de redis                |
| **docker-compose.prod.yml**                 | Compose de producción (puerto 20130, redis, volúmenes con nombre)                                                 |
| **.dockerignore**                           | Archivos excluidos del contexto de Docker                                                                         |
| **fly.toml**                                | Configuración de despliegue de Fly.io (región `sin`, puerto 20128, volumen /data)                                 |
| **.env.example**                            | Plantilla de archivo de entorno (se copia automáticamente a `.env` en la primera instalación)                     |
| **.gitignore**                              | Patrones de exclusión de Git                                                                                      |
| **.npmignore**                              | Lista de exclusión para la publicación en npm                                                                     |
| **.npmrc**                                  | Configuración de npm (registro, política del archivo de bloqueo)                                                  |
| **.node-version**                           | Versión fijada de Node (utilizada por herramientas compatibles con nvm)                                           |
| **.nvmrc**                                  | Versión fijada de Node para nvm                                                                                   |
| **eslint.complexity.config.mjs**            | Configuración de ESLint para el control progresivo de complejidad (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Configuración de ESLint para las reglas de SonarJS (complejidad cognitiva / duplicación)                          |
| **source.config.ts**                        | Configuración de origen `defineDocs` de Fumadocs (alimenta `.source/`)                                            |
| **knip.json**                               | Configuración de Knip — archivos/exportaciones/dependencias sin usar (alimenta el control de código muerto)       |
| **stryker.conf.json**                       | Configuración de pruebas de mutación de Stryker                                                                   |
| **.size-limit.json**                        | Configuración del límite de tamaño del paquete                                                                    |
| **promptfooconfig.yaml**                    | Configuración de evaluaciones de promptfoo                                                                        |
| **.gitleaks.toml**                          | Conjunto de reglas de análisis de secretos de gitleaks                                                            |
| **.zizmor.yml**                             | Configuración de análisis de seguridad de GitHub Actions con zizmor                                               |
| **socket.yml**                              | Configuración de la cadena de suministro de Socket.dev                                                            |
| **news.json**                               | Fuente localizada de anuncios de v2; el elemento de lanzamiento de Radar se distribuye inactivo                   |
| **flake.nix** / **flake.lock**              | Definición del entorno de desarrollo de Nix + archivo de bloqueo                                                  |
| **.env**                                    | Secretos locales (ignorados por Git — generados a partir de `.env.example`)                                       |

> **Se trasladó fuera de la raíz en v3.8.26 (simplificación):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` y el archivo generado `quality-metrics.json` (ignorado por Git). Consulta [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Aplicación Next.js

```
src/
├── app/                 # App Router (páginas + rutas de API + páginas de estado + página de inicio)
├── lib/                 # Bibliotecas principales / módulos de dominio (80 subdirectorios + ~70 archivos de nivel superior)
├── domain/              # Lógica de dominio pura (motor de políticas, respaldo, coste, bloqueo, comboResolver, evaluación)
├── server/              # Módulos exclusivos del servidor (canalización de autorización, CORS, middleware de autenticación) — no se pueden importar desde el cliente
├── shared/              # Compartido entre el servidor y el cliente cuando es seguro (constantes, tipos, validación, contratos, utilidades)
├── i18n/                # Configuración de next-intl + JSON de mensajes por configuración regional (42 configuraciones regionales)
├── middleware/          # Middleware de Next.js (enriquecimiento de solicitudes, detección de configuración regional)
├── mitm/                # Núcleo del proxy MITM: generación/instalación de certificados, controladores, destinos, inspector, máscaras, paso directo
│   ├── handlers/        # 9 clases de controladores de agentes de IDE que extienden MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Capa de captura de tráfico: búfer (anillo en memoria), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Código de integración de adaptadores de modelos (capa de compatibilidad heredada)
├── scripts/             # Scripts de mantenimiento incluidos en el árbol (p. ej., backfillAggregation)
├── sse/                 # Controladores/servicios SSE heredados (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Almacén en memoria heredado (en proceso de sustitución por src/lib/db)
├── types/               # Archivos de tipos TS compartidos
├── instrumentation.ts   # Punto de integración de telemetría de Next.js (navegador + edge)
├── instrumentation-node.ts  # Instrumentación exclusiva de Node
└── proxy.ts             # Capa de entrada del proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Ruta                                                                         | Propósito                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | API pública compatible con OpenAI (~25 subrutas: chat, finalizaciones, embeddings, archivos, lotes, audio, imágenes, vídeos, música, reclasificación, moderación, búsqueda, ws, agentes, cuentas, proveedores, etc.)                                                                                                             |
| `app/api/v1beta/`                                                            | Endpoints de API al estilo de Gemini                                                                                                                                                                                                                                                                                             |
| `app/api/playground/`                                                        | Rutas de Playground Studio: `improve-prompt/` (POST — reescritor de prompts mediante LLM), `presets/` (GET para listar / POST para crear), `presets/[id]/` (GET / PUT / DELETE); consulta `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                 |
| `app/api/` (no v1)                                                           | Rutas de gestión/administración (~60 directorios: proveedores, combos, configuración, mcp, a2a, evaluaciones, memoria, habilidades, webhooks, cumplimiento, resiliencia, monitorización, túneles, herramientas de CLI, etc.)                                                                                                     |
| `app/api/tools/agent-bridge/`                                                | API REST de AgentBridge — 12 rutas (control del servidor, estado/DNS/asignaciones de agentes, omisión, certificado, CA ascendente). LOCAL_ONLY + SPAWN_CAPABLE. Consulta `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                    |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS de Traffic Inspector — más de 16 rutas (solicitudes, sesiones, hosts, modos de captura, exportación, ws). LOCAL_ONLY + SPAWN_CAPABLE. Consulta `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                          |
| `app/a2a/`                                                                   | Punto de entrada A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                  |
| `app/.well-known/agent.json/`                                                | Tarjeta de agente A2A (descubrimiento)                                                                                                                                                                                                                                                                                           |
| `app/(dashboard)/dashboard/`                                                 | Páginas de la interfaz del panel (~50 secciones, ~118 archivos page.tsx: proveedores, combos, configuración, memoria, habilidades, webhooks, evaluaciones, auditoría, lotes, caché, costes, estado, sistema, actividad, etc.)                                                                                                    |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interfaz de Search Tools Studio (3 pestañas: Buscar/Extraer/Comparar + SearchConceptCard + ProviderCatalog); consulta `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                   |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (contenedor con 3 pestañas), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Página del panel de AgentBridge: tarjeta del servidor, 9 tarjetas de agentes, asistente de configuración, asignación de modelos y lista de omisión. i18n PT-BR + EN. Consulta `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                  |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Página del panel de Traffic Inspector: vista dividida de DevTools, 7 pestañas de detalles, 4 controles de modos de captura, grabador de sesiones y coloración contextual. i18n PT-BR + EN. Consulta `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                      |
| `app/(dashboard)/dashboard/activity/`                                        | Página del registro de actividad (Grupo B): `page.tsx` (servidor) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx`; consulta `docs/architecture/MONITORING_SECTIONS.md`                                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Página de uso compartido de cuotas (Grupo B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Página de configuración de planes de proveedores (Grupo B): `page.tsx` + `ProviderPlanConfigClient.tsx`; sustitución de las dimensiones de cuota por conexión                                                                                                                                                                    |
| `app/docs/`                                                                  | Visor de documentación integrado (renderiza `docs/*.md`)                                                                                                                                                                                                                                                                         |
| `app/landing/`                                                               | Página de destino de marketing                                                                                                                                                                                                                                                                                                   |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Páginas relacionadas con la autenticación                                                                                                                                                                                                                                                                                        |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Páginas de errores HTTP                                                                                                                                                                                                                                                                                                          |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Páginas estáticas/de estado                                                                                                                                                                                                                                                                                                      |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Diseño raíz, página de inicio, manifiesto de PWA y CSS global                                                                                                                                                                                                                                                                    |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Límites de errores                                                                                                                                                                                                                                                                                                               |

### `src/lib/` — Bibliotecas principales (~50 módulos)

| Módulo                                   | Propósito                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Gestor de tareas del protocolo A2A, habilidades (5), streaming                                                                                                                                                                                                                                                                           |
| `acp/`                                   | Registro de agentes CLI (detección de CLI locales — consulta `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                 |
| `api/`                                   | Utilidades compartidas de la API (`requireManagementAuth`, validación)                                                                                                                                                                                                                                                                   |
| `auth/`                                  | Sesiones, hash de contraseñas, validación de tokens                                                                                                                                                                                                                                                                                      |
| `batches/`                               | Manejadores de la API Batches de OpenAI                                                                                                                                                                                                                                                                                                  |
| `catalog/`                               | Validación con Zod del catálogo de proveedores + resolución de capacidades                                                                                                                                                                                                                                                               |
| `cloudAgent/`                            | Agentes en la nube (Codex Cloud, Devin, Jules) — consulta `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                               |
| `combos/`                                | Resolución de combos + utilidades de reordenación                                                                                                                                                                                                                                                                                        |
| `audit/`                                 | Utilidades del registro de actividad: `highLevelActions.ts` (lista de permitidos + `isHighLevelAction()`), `activityIcons.ts` (mapa de acción → icono/verbo), `timeline.ts` (groupByDay/relativeTime) — consulta `docs/architecture/MONITORING_SECTIONS.md`                                                                              |
| `compliance/`                            | Registro de auditoría + auditoría de proveedores — consulta `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                |
| `compression/`                           | Capa de integración del motor de compresión (los motores se encuentran en `open-sse/services/compression/`)                                                                                                                                                                                                                              |
| `config/`                                | Utilidades de configuración en tiempo de ejecución                                                                                                                                                                                                                                                                                       |
| `db/`                                    | Más de 120 módulos de base de datos por dominio + 168 migraciones (usar siempre esta vía para SQLite)                                                                                                                                                                                                                                    |
| `quota/`                                 | Motor de uso compartido de cuotas: `dimensions.ts` (tipos/Zod), `types.ts` (interfaz QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — consulta `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Cliente del catálogo de modelos gratuitos de Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — consulta `docs/frameworks/RADAR.md`                                                                                                                                     |
| `display/`                               | Utilidades de formato de la interfaz de usuario (coste, latencia, etc.)                                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Utilidades del servicio de embeddings                                                                                                                                                                                                                                                                                                    |
| `env/`                                   | Análisis + validación de variables de entorno                                                                                                                                                                                                                                                                                            |
| `evals/`                                 | Framework de evaluación (suites, ejecutor, entorno de ejecución) — consulta `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                   |
| `guardrails/`                            | Enmascarador de información de identificación personal, inyección de prompts, puente de visión — consulta `docs/security/GUARDRAILS.md`                                                                                                                                                                                                  |
| `jobs/`                                  | Trabajos en segundo plano (similares a cron)                                                                                                                                                                                                                                                                                             |
| `memory/`                                | Memoria conversacional (RRF híbrido de SQLite FTS5 + sqlite-vec + Qdrant de nivel 2) — consulta `docs/frameworks/MEMORY.md`                                                                                                                                                                                                              |
| `memory/embedding/`                      | Capa de embeddings de múltiples fuentes: `index.ts` (resolutor), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                                |
| `memory/vectorStore.ts`                  | Envoltorio de sqlite-vec v0.1.9 — KNN por fuerza bruta + RRF híbrido (FTS5 + vector, k=60). Inicialización diferida; se degrada de forma controlada cuando sqlite-vec no está disponible. (plan 21)                                                                                                                                      |
| `memory/reindex.ts`                      | `runReindexBatch()` — procesa en segundo plano las memorias con `needs_reindex=1`; lo invocan `POST /api/memory/reindex` y la ruta de relleno diferido. (plan 21)                                                                                                                                                                        |
| `monitoring/`                            | Comprobaciones de estado, emisión de métricas                                                                                                                                                                                                                                                                                            |
| `oauth/`                                 | Flujos de OAuth/importación para 22 módulos de proveedores (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                   |
| `plugins/`                               | Registro de plugins                                                                                                                                                                                                                                                                                                                      |
| `promptCache/`                           | Puntos de corte de caché de prompts al estilo de Anthropic                                                                                                                                                                                                                                                                               |
| `skills/`                                | Framework de habilidades (integradas + marketplace + SkillsSH) — consulta `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                    |
| `playground/`                            | Utilidades compartidas de Playground Studio: `codeExport.ts` (generador de curl/Python/TS), `promptImprover.ts` (constructor de metaprompts), `streamMetrics.ts` (TTFT/TPS puros), `types.ts` (tabla de precios) — consulta `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                       |
| `webhookDispatcher.ts`                   | Entrega de webhooks con HMAC — consulta `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                    |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Gestores de túneles — consulta `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                               |
| `cloudSync.ts`, `initCloudSync.ts`       | Sincronización opcional del estado con la nube                                                                                                                                                                                                                                                                                           |
| `localDb.ts`                             | Archivo central de reexportación para los módulos de base de datos (sin lógica; solo reexportaciones)                                                                                                                                                                                                                                    |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Caché de solicitudes + idempotencia                                                                                                                                                                                                                                                                                                      |
| (~30 archivos más de nivel superior)     | Utilidades especializadas (logEnv, modelsDevSync, piiSanitizer, etc.)                                                                                                                                                                                                                                                                    |

### `src/lib/db/` — Base de datos (122 módulos + 168 migraciones)

| Subdirectorio             | Propósito                                                                                                                                                                                       |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` con registro WAL                                                                                                                                                    |
| `db/migrations/`          | Archivos SQL versionados (idempotentes y transaccionales). `073_memory_vec.sql` añade `memory_vec_meta` + la columna `needs_reindex` (plan 21).                                                 |
| `db/playgroundPresets.ts` | Módulo CRUD para los preajustes de Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)             |
| `db/memoryVec.ts`         | CRUD para `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, etc. (plan 21)                                    |
| `db/<domain>.ts`          | Un módulo por dominio: proveedores, combinaciones, claves de API, usuarios, sesiones, uso, audit*log, webhooks, habilidades, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, etc. |

### `src/domain/`

| Módulo                 | Propósito                                                         |
| ---------------------- | ----------------------------------------------------------------- |
| `policy.ts`            | Motor de políticas                                                |
| `fallbackPolicy.ts`    | Árbol de decisiones de respaldo                                   |
| `costRules.ts`         | Reglas de cálculo de costes                                       |
| `lockoutPolicy.ts`     | Política de bloqueo de modelos/conexiones                         |
| `tagRouter.ts`         | Enrutamiento basado en etiquetas                                  |
| `comboResolver.ts`     | Resolución de combinaciones (usada por el motor de combinaciones) |
| `modelAvailability.ts` | Comprobación de disponibilidad por modelo                         |
| `assessment/`          | Evaluación de modelos (fase 1 de RFC-AUTO-ASSESSMENT)             |

### `src/server/`

| Módulo   | Propósito                                                                                                       |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| `authz/` | Canalización de autorización: `classify` → `policies` → `enforce` — consulta `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Configuración de CORS                                                                                           |
| `auth/`  | Middleware de sesión                                                                                            |

### `src/shared/`

| Módulo                           | Propósito                                                                       |
| -------------------------------- | ------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 proveedores** con validación de Zod (fuente de referencia)                |
| `constants/cliTools.ts`          | Registro de herramientas CLI externas                                           |
| `constants/routingStrategies.ts` | **19 estrategias de enrutamiento** con prioridades                              |
| `constants/publicApiRoutes.ts`   | Rutas que requieren autenticación Bearer (en lugar de autenticación de gestión) |
| `constants/upstreamHeaders.ts`   | Lista de encabezados denegados para solicitudes ascendentes                     |
| `validation/schemas.ts`          | ~80 esquemas de Zod (fuente de referencia única para los contratos de la API)   |
| `validation/helpers.ts`          | Funciones auxiliares de validación de Zod (`validateBody`, etc.)                |
| `types/`                         | Tipos de TS compartidos                                                         |
| `contracts/`                     | Contratos de API pública (consumidos por `files:` en `package.json`)            |
| `utils/circuitBreaker.ts`        | Disyuntor de proveedores (consulta `docs/architecture/RESILIENCE_GUIDE.md`)     |
| `utils/apiAuth.ts`               | Validación de claves de API y comprobación de ámbitos                           |
| `utils/fetchTimeout.ts`          | Envoltorios de tiempo de espera/cancelación para solicitudes ascendentes        |
| `utils/releaseNotes.ts`          | Analizador de anuncios cerrados de v2/legacy, localización y descarte por ID    |

---

## `open-sse/` — Espacio de trabajo del motor de streaming

Espacio de trabajo npm independiente (`@omniroute/open-sse`). Gestiona el procesamiento de solicitudes y la ejecución de proveedores.

```
open-sse/
├── handlers/            # 16 archivos (12 manejadores + 4 auxiliares): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, etc.
├── executors/           # 67 ejecutores específicos de proveedores (extienden BaseExecutor)
├── translator/          # Conversores de formato (9 de solicitudes, 9 de respuestas, 9 auxiliares)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ módulos de servicio (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, etc.)
├── mcp-server/          # Servidor MCP (110 herramientas, 3 transportes, 33 ámbitos)
├── config/              # Registros de proveedores/modelos, configuración de encabezados, alias de modelos
├── utils/               # Cliente TLS, fetch/dispatcher de proxy, utilidades de red
├── index.ts             # Punto de entrada del espacio de trabajo
├── package.json         # Manifiesto del espacio de trabajo
├── tsconfig.json        # Configuración de TS del espacio de trabajo
└── types.d.ts           # Declaraciones de tipos del espacio de trabajo
```

### `open-sse/mcp-server/`

| Ruta                        | Propósito                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| `server.ts`                 | Ciclo de vida del servidor MCP (transportes stdio + HTTP)                                  |
| `httpTransport.ts`          | Transportes HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                      |
| `audit.ts`                  | Registro de auditoría en la tabla `mcp_tool_audit`                                         |
| `scopeEnforcement.ts`       | Validación del ámbito por herramienta                                                      |
| `runtimeHeartbeat.ts`       | Señal de estado en `DATA_DIR/runtime/mcp-heartbeat.json`                                   |
| `descriptionCompressor.ts`  | Comprime los metadatos de descripción de herramientas para ahorrar contexto                |
| `schemas/tools.ts`          | 36 definiciones de herramientas base + ámbitos                                             |
| `tools/advancedTools.ts`    | Implementaciones avanzadas de herramientas                                                 |
| `tools/memoryTools.ts`      | 3 herramientas de memoria (buscar/añadir/borrar)                                           |
| `tools/skillTools.ts`       | 4 herramientas de habilidades (listar/habilitar/ejecutar/ejecuciones)                      |
| `tools/compressionTools.ts` | 5 herramientas de compresión                                                               |
| `README.md`                 | README interno del servidor MCP (con enlace cruzado desde `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Contenedor de escritorio

| Archivo          | Propósito                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `main.js`        | Proceso principal de Electron (BrowserWindow, servidor Next.js integrado, bandeja del sistema, actualización automática) |
| `preload.js`     | Puente IPC (contextBridge → `window.omniroute`)                                                                          |
| `package.json`   | Configuración de electron-builder + dependencias de Electron 41 + electron-builder 26.10                                 |
| `assets/`        | Iconos de la aplicación (Windows .ico, macOS .icns, Linux .png)                                                          |
| `dist-electron/` | Salida de compilación (ignorada por git)                                                                                 |
| `types.d.ts`     | Declaraciones de tipos para el puente del renderizador                                                                   |
| `README.md`      | README interno de Electron (véase también `docs/guides/ELECTRON_GUIDE.md`)                                               |

---

## `bin/` — CLI

| Archivo                                                                                                     | Propósito                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Entrada principal de la CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, etc. |
| `reset-password.mjs`                                                                                        | CLI independiente para restablecer contraseñas                                                                                          |
| `cli/commands/setup.mjs`                                                                                    | Asistente de configuración interactivo y no interactivo                                                                                 |
| `cli/commands/doctor.mjs`                                                                                   | Diagnóstico del estado del sistema (más de 8 comprobaciones)                                                                            |
| `cli/commands/providers.mjs`                                                                                | Listado/prueba/validación de proveedores                                                                                                |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Módulos auxiliares de la CLI                                                                                                            |
| `cli/tray/tray.ts`                                                                                          | Integración con la bandeja del sistema (multiplataforma: NotifyIcon en Windows, systray2 en macOS/Linux)                                |
| `cli/tray/tray.ps1`                                                                                         | Backend de PowerShell con NotifyIcon (Windows, sin nuevos binarios)                                                                     |
| `cli/tray/autostart.ts`                                                                                     | Inicio automático multiplataforma (LaunchAgent / .desktop / registro)                                                                   |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Cadena de resolución del controlador SQLite en 5 pasos (incluido → entorno de ejecución → instalación diferida → node:sqlite → sql.js)  |
| `cli/runtime/magicBytes.mjs`                                                                                | Validación de bytes mágicos de binarios (ELF / Mach-O / Mach-O fat / PE)                                                                |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — resuelve previamente los controladores durante la posinstalación o el primer inicio                                |
| `nodeRuntimeSupport.mjs`                                                                                    | Validación de la versión compatible de Node.js durante la instalación                                                                   |

---

## `skills/` — Habilidades públicas para agentes

| Archivo                      | Propósito                                                                                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifiestos de habilidades para agentes de IA externos (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Scripts de compilación y comprobación

| Script                              | Propósito                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Ejecutor de desarrollo/inicio con carga de variables de entorno                                                          |
| `build-next-isolated.mjs`           | Compilación autónoma (modo standalone de Next.js 16)                                                                     |
| `prepublish.ts`                     | Preparación del paquete antes de `npm pack`                                                                              |
| `postinstall.mjs`                   | Creación automática de `.env` a partir de `.env.example` en la primera instalación                                       |
| `sync-env.mjs`                      | Resincronización de las claves de `.env` con `.env.example`                                                              |
| `check-cycles.mjs`                  | Detección de dependencias circulares                                                                                     |
| `check-route-validation.mjs`        | Validación de que todas las rutas de la API tengan validación con Zod                                                    |
| `check-t11-any-budget.mjs`          | Aplicación de un límite explícito de `any` por archivo                                                                   |
| `check-docs-sync.mjs`               | Validación de la sincronización de versiones de la documentación (pre-commit existente)                                  |
| **`check-env-doc-sync.mjs`**        | NUEVO: comprobación cruzada de variables de entorno en el código, `.env.example` y `ENVIRONMENT.md`                      |
| **`check-docs-counts-sync.mjs`**    | NUEVO: validación de que los recuentos (ejecutores, estrategias, OAuth y habilidades A2A) coincidan con la documentación |
| **`check-deprecated-versions.mjs`** | NUEVO: señalización de versiones/fechas obsoletas en la documentación                                                    |
| `check-supported-node-runtime.ts`   | Validación de que la versión actual de Node sea compatible                                                               |
| `check-pr-test-policy.mjs`          | Aplicación de la regla de «pruebas obligatorias» para cambios en el código de producción                                 |
| **`gen-provider-reference.ts`**     | NUEVO: generación automática de `docs/reference/PROVIDER_REFERENCE.md` a partir del catálogo                             |
| `i18n/generate-multilang.mjs`       | Traducción de cadenas de la interfaz y documentación mediante Google Translate                                           |
| `i18n_autotranslate.py`             | Canalización de traducción de documentación basada en LLM                                                                |
| `validate_translation.py`           | Validación de traducciones por configuración regional                                                                    |
| `check_translations.py`             | Comprobación de claves i18n en el código                                                                                 |
| `run-playwright-tests.mjs`          | Ejecutor de pruebas E2E de Playwright                                                                                    |
| `run-protocol-clients-tests.mjs`    | Ejecutor de pruebas E2E de MCP/A2A                                                                                       |
| `run-ecosystem-tests.mjs`           | Pruebas del ecosistema (integración de proveedores)                                                                      |
| `test-report-summary.mjs`           | Generación del resumen de cobertura en Markdown                                                                          |
| `smoke-electron-packaged.mjs`       | Prueba de humo de la compilación empaquetada de Electron                                                                 |
| `native-binary-compat.mjs`          | Validación de que las dependencias nativas (`better-sqlite3`) coincidan con la versión de Node de Electron               |
| `validate-pack-artifact.ts`         | Validación de la salida de npm pack                                                                                      |
| `responses-ws-proxy.mjs`            | Puente WebSocket para la API Responses de Codex                                                                          |
| `v1-ws-bridge.mjs`                  | Puente WebSocket para el endpoint `/api/v1/ws`                                                                           |
| `standalone-server-ws.mjs`          | Ejecutor del servidor WS autónomo                                                                                        |
| `system-info.mjs`                   | Impresión de información del sistema/entorno de ejecución para soporte                                                   |
| `healthcheck.mjs`                   | Comprobación de estado de una sola ejecución (utilizada por Docker HEALTHCHECK)                                          |
| `uninstall.mjs`                     | Script de desinstalación limpia                                                                                          |

---

## `docs/` — Documentación pública (7 archivos raíz + 17 subdirectorios)

### Guías principales

| Documento                   | Propósito                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Arquitectura de alto nivel, mapa de subsistemas, superficie del panel                                  |
| `CODEBASE_DOCUMENTATION.md` | Referencia de ingeniería: directorios, módulos, convenciones                                           |
| `FEATURES.md`               | Matriz de funcionalidades con aspectos destacados de v3.8                                              |
| `USER_GUIDE.md`             | Manual del usuario final (configuración, modelos, combos, CLI, audio, etc.)                            |
| `API_REFERENCE.md`          | Referencia de endpoints de la API con modelo de autenticación                                          |
| `openapi.yaml`              | Especificación OpenAPI 3.0 (121 rutas)                                                                 |
| `SETUP_GUIDE.md`            | Métodos de instalación (npm, npx, Docker, Electron, Termux, código fuente)                             |
| `ENVIRONMENT.md`            | Todas las variables de entorno (~800 documentadas, ~3050 líneas en `.env.example`)                     |
| `TROUBLESHOOTING.md`        | Errores comunes + problemas conocidos de v3.8.0                                                        |
| `RELEASE_CHECKLIST.md`      | Flujo completo de publicación (skills, husky, commits convencionales, despliegue)                      |
| `COVERAGE_PLAN.md`          | Objetivos de cobertura y estado actual                                                                 |
| `FREE_TIERS.md`             | Proveedores con niveles gratuitos seleccionados (más de 48 gratuitos + 11 OAuth)                       |
| `CLI-TOOLS.md`              | Integraciones con CLI externas + CLI interna de OmniRoute                                              |
| `I18N.md`                   | Arquitectura de i18n, cómo añadir un idioma, 42 configuraciones regionales                             |
| `UNINSTALL.md`              | Pasos para una desinstalación limpia                                                                   |
| `PROVIDER_REFERENCE.md`     | Catálogo de 355 proveedores **generado automáticamente** (regenerar: `npm run gen:provider-reference`) |

### Análisis detallados de subsistemas

| Documento                                      | Propósito                                                                                                       |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                | Servidor MCP: 110 herramientas, 3 transportes, 33 ámbitos, endpoints REST                                       |
| `A2A-SERVER.md`                                | A2A v0.3: JSON-RPC, 6 skills, asistentes REST, tarjeta de agente                                                |
| `AGENT_PROTOCOLS_GUIDE.md`                     | Guía unificada: A2A frente a ACP frente a agentes en la nube                                                    |
| `CLOUD_AGENT.md`                               | Orquestación de Codex Cloud / Devin / Jules                                                                     |
| `SKILLS.md`                                    | Framework de skills (integradas + marketplace + SkillsSH + sandbox)                                             |
| `RADAR.md`                                     | Capa superpuesta del catálogo Radar de modelos gratuitos (`RADAR_ENABLED`, desactivada de forma predeterminada) |
| `MEMORY.md`                                    | Sistema de memoria (SQLite FTS5 + Qdrant)                                                                       |
| `EVALS.md`                                     | Framework de evaluación (suites, ejecuciones, rúbricas)                                                         |
| `GUARDRAILS.md`                                | Enmascarador de PII, inyección de prompts, puente de visión                                                     |
| `COMPLIANCE.md`                                | Registro de auditoría, retención, exclusión voluntaria con noLog                                                |
| `WEBHOOKS.md`                                  | Entrega de webhooks firmados con HMAC                                                                           |
| `REASONING_REPLAY.md`                          | Caché híbrida de memoria/SQLite para `reasoning_content`                                                        |
| `AUTHZ_GUIDE.md`                               | Canalización de autorización (`classify` → `policies` → `enforce`)                                              |
| `RESILIENCE_GUIDE.md`                          | Disyuntor + periodo de espera + bloqueo de modelos                                                              |
| `docs/security/STEALTH_GUIDE.md` (solo en git) | Huellas TLS (JA3/JA4), CCH de Claude Code, certificado MITM                                                     |
| `AUTO-COMBO.md`                                | Motor Auto Combo (puntuación de 16 factores, 6 paquetes de modos, fábrica virtual)                              |

### Compresión

| Documento                       | Propósito                                                     |
| ------------------------------- | ------------------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Descripción general de los modos de compresión + hoja de ruta |
| `COMPRESSION_ENGINES.md`        | Motores Caveman + RTK, contrato del registro                  |
| `COMPRESSION_RULES_FORMAT.md`   | Esquema JSON de paquetes de reglas de Caveman                 |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventario de paquetes de reglas por idioma                   |
| `RTK_COMPRESSION.md`            | Canalización declarativa RTK (49 filtros)                     |

### Despliegue

| Documento                    | Propósito                                                                     |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Compilación de Docker, perfiles (base/cli/host/cliproxyapi), sidecar de Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Despliegue genérico en VM/VPS (Ubuntu/Debian + nginx + systemd)               |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Despliegue en Fly.io (actualmente solo en chino)                              |
| `TERMUX_GUIDE.md`            | Android sin interfaz gráfica mediante Termux                                  |
| `PWA_GUIDE.md`               | Instalación de aplicación web progresiva + service worker                     |
| `ELECTRON_GUIDE.md`          | Compilación + firma + distribución de la aplicación de escritorio             |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                        |
| `PROXY_GUIDE.md`             | Proxy saliente de 4 niveles + marketplace de 1proxy                           |

### Subdirectorios

| Subdirectorio         | Propósito                                                                                                                                                                                                                                                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Traducciones localizadas de la documentación (41 configuraciones regionales)                                                                                                                                                                                        |
| `docs/screenshots/`   | Recursos de imagen para las guías                                                                                                                                                                                                                                   |
| `_tasks/superpowers/` | Planes/especificaciones de superpowers (`writing-plans`/`brainstorming`) e investigación; repositorio aislado, con control de versiones independiente e ignorado por Git en el árbol principal. Consulte CLAUDE.md → «Artefactos de planificación e investigación». |

---

## `tests/` — Conjuntos de pruebas

| Subdirectorio                        | Tipo                                                 | Ejecutor                                            |
| ------------------------------------ | ---------------------------------------------------- | --------------------------------------------------- |
| `tests/unit/`                        | Pruebas unitarias (~4,800 archivos, las más rápidas) | Ejecutor de pruebas nativo de Node                  |
| `tests/integration/`                 | Pruebas de integración de múltiples módulos + DB     | Ejecutor de pruebas nativo de Node (concurrencia 1) |
| `tests/e2e/`                         | E2E de UI + flujos de trabajo                        | Playwright                                          |
| `tests/e2e/protocol-clients.test.ts` | E2E con clientes reales de MCP + A2A                 | Clientes de protocolo personalizados                |
| `tests/e2e/ecosystem.test.ts`        | Integración con proveedores (con acceso a la red)    | Ejecutor de pruebas nativo de Node                  |

---

## `public/` — Recursos estáticos

| Ruta                | Propósito                                                               |
| ------------------- | ----------------------------------------------------------------------- |
| `public/` (raíz)    | Favicons, robots.txt, manifiesto, service worker, imágenes de marketing |
| `public/providers/` | Logotipos PNG/SVG de proveedores (usados en el panel de control)        |

---

## `config/` — Configuraciones estáticas + estado de los controles de calidad

Plantillas de configuración distribuidas junto con las líneas base de los controles de calidad incluidas en el repositorio
(trasladadas aquí desde la raíz del repositorio en v3.8.26 para mantenerla despejada).

| Ruta                                          | Propósito                                                                                                    |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Lista de configuraciones regionales + metadatos (fuente canónica del total de 42 configuraciones regionales) |
| `config/i18n-schema.json`                     | Esquema JSON que valida `i18n.json`                                                                          |
| `config/payloadRules.json`                    | Reglas de saneamiento de las cargas útiles de origen                                                         |
| `config/quality/quality-baseline.json`        | Línea base de ajuste progresivo con múltiples métricas (`scripts/quality/check-quality-ratchet.mjs`)         |
| `config/quality/complexity-baseline.json`     | Línea base congelada de complejidad de ESLint (`check-complexity.mjs`)                                       |
| `config/quality/duplication-baseline.json`    | Línea base congelada de duplicación de jscpd (`check-duplication.mjs`)                                       |
| `config/quality/file-size-baseline.json`      | Línea base congelada del tamaño por archivo (`check-file-size.mjs`)                                          |
| `config/quality/test-discovery-baseline.json` | Línea base congelada de pruebas huérfanas (`check-test-discovery.mjs`)                                       |
| `config/quality/dependency-allowlist.json`    | Lista de dependencias aprobadas (`check-deps.mjs`)                                                           |
| `config/quality/.license-allowlist.json`      | Lista de licencias SPDX permitidas (`check-licenses.mjs`)                                                    |
| `config/quality/quality-metrics.json`         | Métricas recopiladas efímeras (generadas por `collect-metrics.mjs`; **ignoradas por git**)                   |

---

## `.github/` — Integración con GitHub

| Ruta                               | Propósito                                                                            |
| ---------------------------------- | ------------------------------------------------------------------------------------ |
| `.github/workflows/`               | Flujos de trabajo de CI/CD de GitHub Actions (lint, pruebas, cobertura, publicación) |
| `.github/ISSUE_TEMPLATE/`          | Plantillas de incidencias para errores/funcionalidades                               |
| `.github/pull_request_template.md` | Plantilla de PR                                                                      |
| `.github/dependabot.yml`           | Configuración de actualización de dependencias                                       |

---

## `.husky/` — Hooks de Git

| Archivo      | Propósito                                                                       |
| ------------ | ------------------------------------------------------------------------------- |
| `pre-commit` | Ejecuta `lint-staged + check-docs-sync + check:any-budget:t11`                  |
| `pre-push`   | Actualmente deshabilitado (comentado). Ejecuta `npm run test:unit` manualmente. |
| `_/`         | Componentes internos de Husky                                                   |

---

## `.claude/` — Comandos slash de Claude Code

| Archivo                                             | Propósito                                                         |
| --------------------------------------------------- | ----------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — incrementa la versión + changelog automático |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — flujo de trabajo completo de publicación |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Despliega en VPS                                                  |
| `commands/capture-release-evidences-cc.md`          | Graba en el navegador las nuevas funcionalidades como WebP        |
| `commands/review-{prs,discussions}-cc.md`           | Clasifica PR y debates de GitHub                                  |
| `commands/{review-issues,implement-features}-cc.md` | Flujos de trabajo de incidencias                                  |
| `settings.local.json`                               | Configuración de Claude Code específica del proyecto              |

---

## `.agents/` — Flujos de trabajo genéricos para agentes (Codex / Cursor / etc.)

| Ruta                     | Propósito                                                             |
| ------------------------ | --------------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definiciones de flujos de trabajo (réplica de `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definiciones de habilidades con notas de ejecución de Codex         |

> **Nota:** Actualmente, los flujos de trabajo y los comandos son idénticos byte por byte. Si `.agents/` está destinado a un entorno de ejecución de agentes diferente (Codex), las variantes deben diferenciarse de forma significativa.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Fuera del árbol

Estos directorios con prefijo de guion bajo contienen contenido que no se distribuye:

- **`_ideia/`** — notas de diseño (categorías defer / notfit / viable)
- **`_mono_repo/`** — subproyectos históricos (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — clones de solo lectura de proyectos OSS relacionados (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, etc.) para consulta cruzada durante el desarrollo
- **`_tasks/`** — archivos de seguimiento de tareas por publicación (informales)

No se incluye en la salida de `npm pack`. Consulta `.npmignore`.

---

## Generado / Ignorado por Git

| Ruta                   | Propósito                              |
| ---------------------- | -------------------------------------- |
| `node_modules/`        | Dependencias de npm                    |
| `.next/`               | Salida de compilación de Next.js       |
| `coverage/`            | Informes de cobertura de c8            |
| `logs/`                | Registros de ejecución                 |
| `package/`             | Área de preparación de npm pack        |
| `.playwright-mcp/`     | Artefactos de prueba de Playwright MCP |
| `.issues/`             | Caché local de incidencias             |
| `tsconfig.tsbuildinfo` | Caché incremental de TS                |

---

## Consejos de navegación

- **¿Eres un colaborador nuevo?** Lee `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **¿Vas a añadir un proveedor?** Sigue `docs/architecture/ARCHITECTURE.md § Adding a New Provider` y contrástalo con `docs/reference/PROVIDER_REFERENCE.md`.
- **¿Vas a añadir una ruta?** Consulta `docs/architecture/ARCHITECTURE.md § Adding a New API Route` y `src/shared/validation/schemas.ts`.
- **¿Vas a añadir una herramienta MCP?** Consulta `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **¿Vas a añadir una habilidad A2A?** Consulta `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **¿Quieres ejecutarlo localmente?** Consulta `docs/guides/SETUP_GUIDE.md`.
- **¿Vas a desplegarlo?** Consulta `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **¿Vas a publicar una versión?** Consulta `docs/ops/RELEASE_CHECKLIST.md` (y la habilidad de Claude Code `/generate-release-cc`).
