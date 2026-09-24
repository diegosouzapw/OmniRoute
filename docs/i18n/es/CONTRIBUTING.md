# Contributing to OmniRoute (Español)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Configuración del entorno de desarrollo

### Requisitos previos

- **Node.js** `>=22.22.3 <23`, o `>=24.0.0 <27` (recomendado: 24 LTS)
- **npm** 10+

> **Usuarios de npm v11+ (Node 24+):** Después de ejecutar `npm install`, verifica que se hayan instalado los módulos nativos:
> `node -e "require('better-sqlite3')"`. Si falla con `MODULE_NOT_FOUND`,
> ejecuta `npm approve-scripts better-sqlite3 && npm install`. Consulta
> [Solución de problemas](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clonación e instalación

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variables de entorno

```bash
# Crea tu archivo .env a partir de la plantilla
cp .env.example .env

# Genera los secretos necesarios
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variables clave para el desarrollo:

| Variable               | Valor predeterminado de desarrollo | Descripción                            |
| ---------------------- | ---------------------------------- | -------------------------------------- |
| `PORT`                 | `20128`                            | Puerto del servidor                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`           | URL base para el frontend              |
| `JWT_SECRET`           | (generar arriba)                   | Secreto para firmar los JWT            |
| `INITIAL_PASSWORD`     | `CHANGEME`                         | Contraseña del primer inicio de sesión |
| `APP_LOG_LEVEL`        | `info`                             | Nivel de detalle de los registros      |

### Configuración del panel

El panel proporciona controles de interfaz para funciones que también pueden configurarse mediante variables de entorno:

| Ubicación de la configuración | Control                         | Descripción                                                    |
| ----------------------------- | ------------------------------- | -------------------------------------------------------------- |
| Configuración → Avanzado      | Modo de depuración              | Habilita los registros de solicitudes de depuración (interfaz) |
| Configuración → General       | Visibilidad de la barra lateral | Muestra/oculta secciones de la barra lateral                   |

Esta configuración se almacena en la base de datos y persiste entre reinicios; cuando se establece, prevalece sobre los valores predeterminados de las variables de entorno.

### Ejecución local

```bash
# Modo de desarrollo (recarga automática)
npm run dev

# Compilación de producción
npm run build    # next build → .build/next/ y luego assembleStandalone → dist/
npm run start

# Compilación rápida solo del backend/API para cambios de colaboradores
npm run build:contributor

# Compilación de lanzamiento (recompilación limpia + centinela HEAD — obligatoria para el despliegue)
npm run build:release   # rm -rf .build dist && build + escribe dist/BUILD_SHA

# Configuración común del puerto
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

La compilación para colaboradores realiza una validación únicamente mediante compilación: no ensambla la
distribución independiente ni compila los recursos opcionales del empaquetado nativo. Usa la compilación normal de producción cuando
necesites validar el paquete distribuible.

### Estructura de la salida de compilación

| Directorio | Contenido                                                                                 | Con seguimiento |
| ---------- | ----------------------------------------------------------------------------------------- | --------------- |
| `src/`     | Código fuente de la aplicación (TypeScript / TSX)                                         | Sí              |
| `.build/`  | Archivos intermedios — salida de `next build` (ignorada por git, `distDir = .build/next`) | No              |
| `dist/`    | Paquete distribuible — ensamblado por `assembleStandalone` (ignorado por git)             | No              |

El proceso de compilación se realiza en una sola pasada:

```
npm run build
  └─ next build → .build/next/standalone  (salida de Next.js)
  └─ assembleStandalone()                 (copia los archivos independientes + estáticos + públicos + recursos nativos)
       └─ salida: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` también limpia primero ambos directorios y escribe
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) como centinela de integridad del despliegue.

`npm run build:contributor` usa el perfil de compilación exclusivo para el backend. Sustituye temporalmente por archivos provisionales
los archivos de la interfaz del panel durante la compilación, conserva los controladores de rutas de la API y restaura los archivos originales
después de la compilación. Usa `npm run build` para los cambios que afecten a la interfaz del panel o para realizar una
validación completa del lanzamiento; el perfil para colaboradores no sustituye la compilación de lanzamiento.

> **Nota sobre el despliegue en VPS:** el directorio remoto de la imagen `/usr/lib/node_modules/omniroute/app/`
> no cambia. Las herramientas de despliegue sincronizan mediante rsync el contenido de `dist/` en él.
> Solo cambió la ruta de salida de compilación dentro del repositorio (`app/` → `dist/`).

URL predeterminadas:

- **Panel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Flujo de trabajo de Git

> ⚠️ **NUNCA hagas commits directamente en `main`.** Usa siempre ramas de funcionalidades.
>
> **Base del PR:** selecciona como destino la rama `release/vX.Y.Z` activa (no `main`). Consulta
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) para conocer el
> modelo de una rama por versión y etiquetado al publicar.

```bash
# Crea una rama desde el extremo de la versión activa (ejemplo: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... realiza los cambios ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Abre una solicitud de incorporación de cambios con base = release/v3.8.49
```

### Nomenclatura de ramas

| Prefijo     | Propósito                         |
| ----------- | --------------------------------- |
| `feat/`     | Nuevas funcionalidades            |
| `fix/`      | Correcciones de errores           |
| `refactor/` | Reestructuración del código       |
| `docs/`     | Cambios en la documentación       |
| `test/`     | Adiciones/correcciones de pruebas |
| `chore/`    | Herramientas, CI, dependencias    |

### Mensajes de commit

Sigue [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Ámbitos (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Ejecución de pruebas

```bash
# Todas las pruebas (unitarias + vitest + ecosistema + e2e)
npm run test:all

# Un solo archivo de pruebas (ejecutor de pruebas nativo de Node.js; la mayoría de las pruebas usan este)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Solo las pruebas unitarias afectadas por tu cambio (el mismo selector TIA que en la comprobación de CI, #8084)
npm run test:scoped            # cambios en el último commit (o en el árbol de trabajo)
npm run test:scoped:staged     # solo cambios en staging; combina bien con una ejecución previa al commit
npm run test:scoped:full       # primero reconstruye el mapa del grafo de importaciones (tras añadir/mover archivos)
# El código de salida 1 + «ejecuta la suite completa» significa que ha cambiado un archivo central (tsconfig, package.json, …) o
# un archivo fuente no mapeado; el selector falla de forma segura, nunca omite pruebas silenciosamente.

# Vitest (servidor MCP, autoCombo, caché)
npm run test:vitest

# Pruebas E2E (requieren Playwright)
npm run test:e2e

# Pruebas E2E de clientes de protocolo (transportes MCP, A2A)
npm run test:protocols:e2e

# Pruebas de compatibilidad del ecosistema
npm run test:ecosystem

# Umbral de cobertura: 60 % de sentencias/líneas/funciones/ramas
npm run test:coverage
npm run coverage:report

# Comprobación de lint y formato
npm run lint
npm run check

# Prueba de humo combinada y controlada con servicios upstream reales (requiere acceso al VPS y créditos reales del proveedor)
# Accede a proveedores REALES; tiene un pequeño coste. NUNCA se ejecuta en CI. Se omite correctamente sin la activación.
# Requiere: acceso mediante ssh root@192.168.0.15 (obtiene del VPS una instantánea de la base de datos de solo lectura).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Prueba de humo en vivo del VPS de la fase 3: scripts ESM de Node sin formato adicional que acceden directamente al servidor .15 en vivo.
# Requiere: acceso mediante ssh root@192.168.0.15 (los combos se crean/eliminan mediante SQLite por SSH).
# Accede a proveedores REALES (coste reducido). Crea/elimina únicamente combos __live_test__*. NUNCA se ejecuta en CI.
# REQUIRE_API_KEY=false en .15, por lo que no se necesita ninguna clave de API, pero respeta COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY si están definidos.
npm run test:combo:live:vps              # 7 escenarios HTTP (prioridad/round-robin/ponderado/coste/fusión/automático + estado)
npm run test:combo:live:vps:failover     # añade un escenario real de conmutación por error entre proveedores (8 en total)
```

Notas sobre la cobertura:

- `npm run test:coverage` mide la cobertura del código fuente para la suite principal de pruebas unitarias, excluye `tests/**` e incluye `open-sse/**`
- Las solicitudes de incorporación de cambios deben mantener el umbral de cobertura en **60 % o más** de sentencias/líneas/funciones/ramas
- Si un PR cambia código de producción en `src/`, `open-sse/`, `electron/` o `bin/`, debe añadir o actualizar pruebas automatizadas en el mismo PR
- `npm run coverage:report` muestra el informe detallado archivo por archivo de la última ejecución de cobertura
- `npm run test:coverage:legacy` conserva la métrica anterior para realizar comparaciones históricas
- Consulta `docs/ops/COVERAGE_PLAN.md` para ver la hoja de ruta por fases destinada a mejorar la cobertura

### Requisitos de las solicitudes de incorporación de cambios

Antes de abrir un PR, usa la
[Ruta recomendada para contribuir](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) para ejecutar el ciclo específico correspondiente a
lo que hayas cambiado. La suite unitaria completa (4 particiones de CI), Vitest, el umbral de cobertura de **60 % o más** y
la compilación de producción son responsabilidad de CI; ejecutarlos localmente no aporta ninguna señal que las
comprobaciones del PR no vayan a proporcionar ya y, en máquinas más pequeñas, puede saturar el host (#8084):

- Ejecuta los archivos de pruebas que cubren tu cambio: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Ejecuta `npm run lint`
- Incluye o actualiza pruebas automatizadas en el mismo PR siempre que cambie el código de producción
- Incluye en la descripción del PR los archivos de pruebas modificados o añadidos cuando haya cambiado el código de producción
- Comprueba el resultado de SonarQube en el PR cuando los secretos del proyecto estén configurados en CI

Estado actual de las pruebas: **122 archivos de pruebas unitarias** que cubren:

- Traductores de proveedores y conversión de formatos
- Limitación de velocidad, disyuntor y resiliencia
- Caché semántica, idempotencia y seguimiento del progreso
- Operaciones de base de datos y esquema (21 módulos de base de datos)
- Flujos de OAuth y autenticación
- Validación de endpoints de API (Zod v4)
- Herramientas del servidor MCP y aplicación de ámbitos
- Sistemas de memoria y habilidades

---

## Estilo del código

- **ESLint** — Ejecuta `npm run lint` antes de confirmar cambios
- **Prettier** — Formateado automáticamente mediante `lint-staged` al confirmar cambios (2 espacios, punto y coma, comillas dobles, ancho de 100 caracteres, comas finales es5)
- **TypeScript** — Todo el código de `src/` usa `.ts`/`.tsx`; `open-sse/` usa `.ts`/`.js`; documenta con TSDoc (`@param`, `@returns`, `@throws`)
- **Sin `eval()`** — ESLint aplica `no-eval`, `no-implied-eval`, `no-new-func`
- **Validación con Zod** — Usa esquemas de Zod v4 para validar todas las entradas de la API
- **Nomenclatura**: archivos = camelCase/kebab-case, componentes = PascalCase, constantes = UPPER_SNAKE

### Gestión de errores / bloques catch vacíos

Nunca dejes un `catch` sin explicación. Clasifícalo en una de estas dos categorías (esto hace
operativa la regla estricta «nunca ignorar silenciosamente errores en flujos SSE»):

- **Intencional (nuestra propia limpieza/telemetría de mejor esfuerzo)** — un fallo aquí es esperado e
  inofensivo; añade un comentario de una línea que explique el motivo, sin registros (registrar cada solicitud es el
  ruido que esta convención evita).

  ```ts
  } catch {} // es normal cerrar un controlador ya cerrado después de que el cliente se desconecte
  ```

- **Debe registrarse (código externo/proporcionado por quien realiza la llamada, o si ignorarlo cambia el flujo de control)** — conserva
  el catch (nunca permitas que interrumpa el flujo), pero emite un `console.debug`/`warn` contextual para que el
  fallo pueda detectarse.

  ```ts
  } catch (e) {
    console.debug("[STREAM] error en el callback onFailure:", e);
  }
  ```

Consulta `open-sse/utils/stream.ts` y `open-sse/utils/streamHandler.ts` para ver ejemplos aplicados.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Añadir un nuevo proveedor

### Paso 1: Registrar las constantes del proveedor

Añádelas a `src/shared/constants/providers.ts`; se validan con Zod al cargar el módulo.

### Paso 2: Añadir un ejecutor (si se necesita lógica personalizada)

Crea un ejecutor en `open-sse/executors/your-provider.ts` que extienda el ejecutor base.

### Paso 3: Añadir un traductor (si el formato no es OpenAI)

Crea traductores de solicitudes/respuestas en `open-sse/translator/`.

### Paso 4: Añadir la configuración de OAuth (si se basa en OAuth)

Añade las credenciales de OAuth en `src/lib/oauth/constants/oauth.ts` y el servicio en `src/lib/oauth/services/`.

Si el proveedor de origen distribuye un `client_id`/secreto de OAuth público o una clave de API web de Firebase dentro de su CLI pública o paquete para navegador, **no** lo insertes como un literal de cadena. Usa `resolvePublicCred()` de `open-sse/utils/publicCreds.ts` y añade una entrada de bytes enmascarados a `EMBEDDED_DEFAULTS`. El flujo de trabajo completo y obligatorio está documentado en [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Dentro de los controladores/ejecutores, los mensajes de error que lleguen al cliente deben pasar por `buildErrorBody()` / `sanitizeErrorMessage()` de `open-sse/utils/error.ts`; nunca incluyas `err.stack` ni `err.message` sin procesar en el cuerpo de una respuesta. Consulta [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Paso 5: Registrar los modelos

Añade las definiciones de los modelos en `open-sse/config/providerRegistry.ts`.

### Paso 6: Añadir pruebas

Escribe pruebas unitarias en `tests/unit/` que cubran, como mínimo:

- Registro del proveedor
- Traducción de solicitudes/respuestas
- Gestión de errores

---

## Lista de verificación de la solicitud de incorporación de cambios

- [ ] Las pruebas pasan (`npm test`)
- [ ] El linting pasa (`npm run lint`)
- [ ] La compilación se completa correctamente (`npm run build`)
- [ ] Se añadieron tipos de TypeScript para las nuevas funciones e interfaces públicas
- [ ] No hay secretos ni valores de respaldo codificados de forma fija
- [ ] Las credenciales públicas de upstream están integradas mediante `resolvePublicCred()` (consulta [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nunca como literales
- [ ] Las respuestas de error pasan por `buildErrorBody()` / `sanitizeErrorMessage()`; no hay trazas de pila sin procesar en los cuerpos de las respuestas (consulta [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Los comandos de shell (`exec` / `spawn`) pasan los valores en tiempo de ejecución mediante `env`, no mediante interpolación de cadenas
- [ ] Todas las entradas se validan con esquemas de Zod
- [ ] Se añadió un **fragmento** del registro de cambios en `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` para los cambios visibles para el usuario (consulta [`changelog.d/README.md`](./changelog.d/README.md)); **no** edites `CHANGELOG.md` directamente; los fragmentos se agregan en el momento de la publicación y nunca generan conflictos entre solicitudes de incorporación de cambios
- [ ] Se actualizó la documentación (si corresponde)
- [ ] No se abrieron nuevas alertas de CodeQL / Secret-Scanning, o cada una se descartó con una justificación técnica que hace referencia al documento pertinente de `docs/security/`
- [ ] Las rutas que generan procesos secundarios (`/api/mcp/`, `/api/cli-tools/runtime/`) están clasificadas como `isLocalOnlyPath()` en `src/server/authz/routeGuard.ts`; consulta la [Regla estricta n.º 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] No hay pies `Co-Authored-By` en los mensajes de commit; los commits deben aparecer únicamente bajo la identidad de Git del propietario del repositorio (Regla estricta n.º 16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Obtener ayuda

- **Arquitectura**: Consulta [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referencia de la API**: Consulta [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Documentación de seguridad**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Documentación de operaciones**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Incidencias**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: Consulta `docs/adr/` para ver los registros de decisiones arquitectónicas
