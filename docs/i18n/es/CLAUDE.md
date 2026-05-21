# CLAUDE.md (Español)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con código en este repositorio.

## Inicio Rápido

```bash
npm install                    # Instalar dependencias (genera automáticamente .env a partir de .env.example)
npm run dev                    # Servidor de desarrollo en http://localhost:20128
npm run build                  # Construcción de producción (Next.js 16 independiente)
npm run lint                   # ESLint (se esperan 0 errores; las advertencias son preexistentes)
npm run typecheck:core         # Verificación de TypeScript (debería estar limpio)
npm run typecheck:noimplicit:core  # Verificación estricta (sin any implícito)
npm run test:coverage          # Pruebas unitarias + puerta de cobertura (75/75/75/70 — declaraciones/líneas/funciones/ramas)
npm run check                  # lint + test combinados
npm run check:cycles           # Detectar dependencias circulares
```

### Ejecución de Pruebas

```bash
# Archivo de prueba único (ejecutor de pruebas nativo de Node.js — la mayoría de las pruebas)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (servidor MCP, autoCombo, caché)
npm run test:vitest

# Todas las suites
npm run test:all
```

Para la matriz completa de pruebas, consulta `CONTRIBUTING.md` → "Ejecución de Pruebas". Para una arquitectura profunda, consulta `AGENTS.md`.

---

## Proyecto a Simple Vista

**OmniRoute** — proxy/router de IA unificado. Un punto final, más de 160 proveedores de LLM, retroceso automático.

| Capa             | Ubicación               | Propósito                                                                         |
| ---------------- | ----------------------- | --------------------------------------------------------------------------------- |
| Rutas API        | `src/app/api/v1/`       | Enrutador de Aplicaciones Next.js — puntos de entrada                             |
| Manejadores      | `open-sse/handlers/`    | Procesamiento de solicitudes (chat, embeddings, etc)                              |
| Ejecutores       | `open-sse/executors/`   | Despacho HTTP específico del proveedor                                            |
| Traductores      | `open-sse/translator/`  | Conversión de formato (OpenAI↔Claude↔Gemini)                                      |
| Transformador    | `open-sse/transformer/` | API de respuestas ↔ Completaciones de Chat                                        |
| Servicios        | `open-sse/services/`    | Enrutamiento combinado, límites de tasa, caché, etc                               |
| Base de Datos    | `src/lib/db/`           | Módulos de dominio SQLite (más de 45 archivos, 55 migraciones)                    |
| Dominio/Política | `src/domain/`           | Motor de políticas, reglas de costo, lógica de retroceso                          |
| Servidor MCP     | `open-sse/mcp-server/`  | 37 herramientas (30 base + 3 memoria + 4 habilidades), 3 transportes, ~13 ámbitos |
| Servidor A2A     | `src/lib/a2a/`          | Protocolo de agente JSON-RPC 2.0                                                  |
| Habilidades      | `src/lib/skills/`       | Marco de habilidades extensible                                                   |
| Memoria          | `src/lib/memory/`       | Memoria conversacional persistente                                                |

Monorepo: `src/` (aplicación Next.js 16), `open-sse/` (espacio de trabajo del motor de streaming), `electron/` (aplicación de escritorio), `tests/`, `bin/` (punto de entrada CLI).

---

## Pipeline de Solicitudes

```
Cliente → /v1/chat/completions (ruta de Next.js)
  → CORS → validación de Zod → ¿autenticación? → verificación de políticas → guardia de inyección de prompts
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → verificación de caché → límite de tasa → ¿enrutamiento combinado?
      → resolveComboTargets() → handleSingleModel() por objetivo
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → reintentar con retroceso
    → traducción de respuesta → flujo SSE o JSON
    → Si Responses API: responsesTransformer.ts TransformStream
```

Las rutas de la API siguen un patrón consistente: `Ruta → preflight CORS → validación del cuerpo de Zod → Autenticación opcional (extractApiKey/isValidApiKey) → aplicación de políticas de clave API → Delegación de manejadores (open-sse)`. No hay middleware global de Next.js: la interceptación es específica de la ruta.

**Enrutamiento combinado** (`open-sse/services/combo.ts`): 14 estrategias (prioridad, ponderado, llenar primero, round-robin, P2C, aleatorio, menos utilizado, optimizado por costo, consciente del reinicio, aleatorio estricto, automático, lkgp, optimizado por contexto, retransmisión de contexto). Cada objetivo llama a `handleSingleModel()` que envuelve `handleChatCore()` con manejo de errores por objetivo y verificaciones de cortacircuito. Consulte `docs/routing/AUTO-COMBO.md` para la puntuación de Auto-Combo de 9 factores y `docs/architecture/RESILIENCE_GUIDE.md` para las 3 capas de resiliencia.

---

## Estado de Ejecución de Resiliencia

OmniRoute tiene tres mecanismos de falla temporal relacionados pero distintos. Mantenga su
alcance separado al depurar el comportamiento de enrutamiento. Consulte el
[diagrama de resiliencia de 3 capas](./docs/diagrams/exported/resilience-3layers.svg)
(fuente: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
para un mapa de un vistazo.

### Cortacircuito del Proveedor

**Alcance**: todo el proveedor, por ejemplo, `glm`, `openai`, `anthropic`.

**Propósito**: detener el envío de tráfico a un proveedor que está fallando repetidamente a nivel
upstream/servicio, para que un proveedor no saludable no ralentice cada solicitud.

**Implementación**:

- Clase principal: `src/shared/utils/circuitBreaker.ts`
- Cableado de puerta de chat/ejecución: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API de estado en tiempo de ejecución: `src/app/api/monitoring/health/route.ts`
- Envolturas compartidas: `open-sse/services/accountFallback.ts`
- Tabla de estado persistido: `domain_circuit_breakers`

**Estados**:

- `CLOSED`: se permite tráfico normal.
- `OPEN`: el proveedor está temporalmente bloqueado; los llamadores reciben una respuesta de circuito-abierto del proveedor
  o el enrutamiento combinado salta a otro objetivo.
- `HALF_OPEN`: ha transcurrido el tiempo de espera de reinicio; se permite una solicitud de sondeo. El éxito cierra el
  cortacircuito, el fracaso lo abre nuevamente.

**Valores predeterminados** (`open-sse/config/constants.ts`):

- Proveedores de OAuth: umbral `3`, tiempo de espera de reinicio `60s`.
- Proveedores de clave API: umbral `5`, tiempo de espera de reinicio `30s`.
- Proveedores locales: umbral `2`, tiempo de espera de reinicio `15s`.

Solo los estados de falla a nivel de proveedor deben activar el cortacircuito del proveedor:

```ts
(408, 500, 502, 503, 504);
```

No active el cortacircuito de todo el proveedor por errores normales de cuenta/clave/modelo como la mayoría
de los casos `401`, `403` o `429`. Esos generalmente pertenecen a la espera de conexión o bloqueo de modelo. Un proveedor de clave API genérico `403` debería ser recuperable a menos que se clasifique
como un error terminal de proveedor/cuenta.

El cortacircuito utiliza recuperación perezosa, no un temporizador en segundo plano. Cuando `OPEN` expira, lecturas como
`getStatus()`, `canExecute()`, y `getRetryAfterMs()` actualizan el estado a
`HALF_OPEN`, para que los paneles de control y los constructores de candidatos combinados no sigan excluyendo un
proveedor expirado para siempre.

### Enfriamiento de Conexión

**Alcance**: una conexión/cuenta/clave de proveedor.

**Propósito**: omitir temporalmente una clave/cuenta mala mientras permite que otras conexiones para
el mismo proveedor continúen atendiendo solicitudes.

**Implementación**:

- Ruta de escritura/actualización: `src/sse/services/auth.ts::markAccountUnavailable()`
- Selección/filtrado de cuentas: `src/sse/services/auth.ts::getProviderCredentials...`
- Cálculo de enfriamiento: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Configuraciones: `src/lib/resilience/settings.ts`

Campos importantes en conexiones de proveedor:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Durante la selección de cuentas, se omite una conexión mientras:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Los enfriamientos también son perezosos: cuando `rateLimitedUntil` está en el pasado, la conexión se vuelve
elegible nuevamente. Al usar con éxito, `clearAccountError()` borra `testStatus`,
`rateLimitedUntil`, campos de error y `backoffLevel`.

Comportamiento predeterminado de enfriamiento de conexión:

- Enfriamiento base de OAuth: `5s`.
- Enfriamiento base de clave API: `3s`.
- La clave API `429` debería preferir pistas de reintento upstream (`Retry-After`, encabezados de reinicio, o
  texto de reinicio parseable) cuando estén disponibles.
- Fallos recuperables repetidos utilizan retroceso exponencial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

El guardia anti-thundering-herd previene fallos concurrentes en la misma conexión de
extender repetidamente el enfriamiento o incrementar doblemente `backoffLevel`.

Los estados terminales no son enfriamientos. `banned`, `expired`, y `credits_exhausted` están
destinados a permanecer no disponibles hasta que cambien las credenciales/configuraciones o un operador los reinicie.
No sobrescriba estados terminales con estados de enfriamiento transitorios.

### Bloqueo de Modelo

**Alcance**: proveedor + conexión + modelo.

**Propósito**: evitar deshabilitar toda una conexión cuando solo un modelo no está disponible o
tiene un límite de cuota para esa conexión.

Ejemplos:

- Proveedores de cuota por modelo que devuelven `429`.
- Proveedores locales que devuelven `404` para un modelo faltante.
- Fallos de permisos de modo/modelo específicos del proveedor, como modos Grok seleccionados.

El bloqueo de modelo vive en `open-sse/services/accountFallback.ts` y permite que la misma
conexión continúe atendiendo otros modelos.

### Orientación para Depuración

- Si todas las claves para un proveedor son omitidas, inspeccione tanto el estado del cortacircuito del proveedor como cada
  `rateLimitedUntil`/`testStatus` de conexión.
- Si un proveedor parece estar excluido permanentemente después de la ventana de reinicio, verifique si el código
  está leyendo el `state` en bruto en lugar de usar `getStatus()`/`canExecute()`.
- Si una clave de proveedor falla pero otras deberían funcionar, prefiera el enfriamiento de conexión sobre
  el cortacircuito del proveedor.
- Si solo un modelo falla, prefiera el bloqueo de modelo sobre el enfriamiento de conexión.
- Si un estado debería recuperarse por sí mismo, debería tener una marca de tiempo futura/tiempo de espera de reinicio y una
  ruta de lectura que actualice el estado expirado. Los estados permanentes requieren cambios manuales de credenciales
  o configuración.

## Convenciones Clave

### Estilo de Código

- **2 espacios**, punto y coma, comillas dobles, ancho de 100 caracteres, comas finales en es5 (aplicado por lint-staged a través de Prettier)
- **Importaciones**: externo → interno (`@/`, `@omniroute/open-sse`) → relativo
- **Nomenclatura**: archivos=camelCase/kebab, componentes=PascalCase, constantes=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = error en todas partes; `no-explicit-any` = advertencia en `open-sse/` y `tests/`
- **TypeScript**: `strict: false`, objetivo ES2022, módulo esnext, resolución bundler. Preferir tipos explícitos.

### Base de Datos

- **Siempre** pasar por los módulos de dominio en `src/lib/db/` — **nunca** escribir SQL en bruto en rutas o manejadores
- **Nunca** agregar lógica a `src/lib/localDb.ts` (capa de re-exportación solamente)
- **Nunca** importar en bloque desde `localDb.ts` — importar módulos específicos de `db/` en su lugar
- Singleton de DB: `getDbInstance()` desde `src/lib/db/core.ts` (registro WAL)
- Migraciones: `src/lib/db/migrations/` — archivos SQL versionados, idempotentes, ejecutados en transacciones

### Manejo de Errores

- try/catch con tipos de error específicos, registrar con contexto de pino
- Nunca tragar errores en flujos SSE — usar señales de aborto para limpieza
- Devolver códigos de estado HTTP apropiados (4xx/5xx)

### Seguridad

- **Nunca** usar `eval()`, `new Function()`, o eval implícito
- Validar todas las entradas con esquemas Zod
- Cifrar credenciales en reposo (AES-256-GCM)
- Lista de negación de encabezados upstream: `src/shared/constants/upstreamHeaders.ts` — mantener saneados, esquemas Zod y pruebas unitarias alineadas al editar
- **Credenciales públicas upstream** (client_id/secret de OAuth estilo Gemini/Antigravity/Windsurf + claves web de Firebase extraídas de CLIs públicas): **DEBEN** ser incrustadas a través de `resolvePublicCred()` desde `open-sse/utils/publicCreds.ts` — **nunca** como literales de cadena. Ver `docs/security/PUBLIC_CREDS.md` para el patrón obligatorio.
- **Respuestas de error** (HTTP / SSE / ejecutor / manejador MCP): **DEBEN** pasar por `buildErrorBody()` o `sanitizeErrorMessage()` desde `open-sse/utils/error.ts` — **nunca** poner `err.stack` o `err.message` en bruto en el cuerpo de la respuesta. Ver `docs/security/ERROR_SANITIZATION.md`.
- **Comandos de shell construidos a partir de variables**: al llamar a `exec()`/`spawn()` con un script que necesita valores en tiempo de ejecución, pásalos a través de la opción `env` (escapados automáticamente) — **nunca** interpolar cadenas de rutas no confiables/externas en el cuerpo del script. Referencia: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Bibliotecas seguras por defecto** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): preferir Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink sobre implementaciones personalizadas siempre que se agreguen nuevas superficies sensibles a la seguridad.

---

## Escenarios Comunes de Modificación

### Agregar un Nuevo Proveedor

1. Registrar en `src/shared/constants/providers.ts` (validado por Zod al cargar)
2. Agregar ejecutor en `open-sse/executors/` si se necesita lógica personalizada (extender `BaseExecutor`)
3. Agregar traductor en `open-sse/translator/` si no es formato OpenAI
4. Agregar configuración de OAuth en `src/lib/oauth/constants/oauth.ts` si es basado en OAuth — si el CLI upstream envía un client_id/secret público, incrustar a través de `resolvePublicCred()` (ver `docs/security/PUBLIC_CREDS.md`), **nunca** como un literal
5. Registrar modelos en `open-sse/config/providerRegistry.ts`
6. Escribir pruebas en `tests/unit/` (incluir la afirmación de forma publicCreds si agregaste un nuevo predeterminado incrustado)

### Agregar una Nueva Ruta API

1. Crear directorio bajo `src/app/api/v1/your-route/`
2. Crear `route.ts` con manejadores `GET`/`POST`
3. Seguir el patrón: CORS → validación del cuerpo Zod → autenticación opcional → delegación de manejador
4. El manejador va en `open-sse/handlers/` (importar desde allí, no en línea)
5. Las respuestas de error utilizan `buildErrorBody()` / `errorResponse()` desde `open-sse/utils/error.ts` (auto-saneadas — nunca poner `err.stack` o `err.message` en bruto en el cuerpo). Ver `docs/security/ERROR_SANITIZATION.md`.
6. Agregar pruebas — incluyendo al menos una afirmación de que las respuestas de error no filtran trazas de pila (`!body.error.message.includes("at /")`)

### Agregar un Nuevo Módulo DB

1. Crear `src/lib/db/yourModule.ts` — importar `getDbInstance` desde `./core.ts`
2. Exportar funciones CRUD para tu(s) tabla(s) de dominio
3. Agregar migración en `src/lib/db/migrations/` si se necesitan nuevas tablas
4. Re-exportar desde `src/lib/localDb.ts` (agregar a la lista de re-exportación solamente)
5. Escribir pruebas

### Agregar una Nueva Herramienta MCP

1. Agregar definición de herramienta en `open-sse/mcp-server/tools/` con esquema de entrada Zod + manejador asíncrono
2. Registrar en el conjunto de herramientas (conectado por `createMcpServer()`)
3. Asignar a los ámbitos apropiados
4. Escribir pruebas (invocación de herramienta registrada en la tabla `mcp_audit`)

### Agregar una Nueva Habilidad A2A

1. Crear habilidad en `src/lib/a2a/skills/` (ya existen 5: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. La habilidad recibe contexto de tarea (mensajes, metadatos) → devuelve resultado estructurado
3. Registrar en `A2A_SKILL_HANDLERS` en `src/lib/a2a/taskExecution.ts`
4. Exponer en `src/app/.well-known/agent.json/route.ts` (Tarjeta de Agente)
5. Escribir pruebas en `tests/unit/`
6. Documentar en la tabla de habilidades en `docs/frameworks/A2A-SERVER.md`

### Agregar un Nuevo Agente en la Nube

1. Crear clase de agente en `src/lib/cloudAgent/agents/` extendiendo `CloudAgentBase` (ya existen 3: codex-cloud, devin, jules)
2. Implementar `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registrar en `src/lib/cloudAgent/registry.ts`
4. Agregar manejo de OAuth/credenciales si es necesario (`src/lib/oauth/providers/`)
5. Pruebas + documentar en `docs/frameworks/CLOUD_AGENT.md`

### Agregar un Nuevo Guardrail / Eval / Skill / Evento Webhook

- Guardrail: `src/lib/guardrails/` → docs: `docs/security/GUARDRAILS.md`
- Suite de Eval: `src/lib/evals/` → docs: `docs/frameworks/EVALS.md`
- Skill (sandbox): `src/lib/skills/` → docs: `docs/frameworks/SKILLS.md`
- Evento Webhook: `src/lib/webhookDispatcher.ts` → docs: `docs/frameworks/WEBHOOKS.md`

## Documentación de Referencia

Para cualquier cambio no trivial, lee primero el análisis correspondiente:

| Área                                                  | Doc                                                               |
| ----------------------------------------------------- | ----------------------------------------------------------------- |
| Navegación del repositorio                            | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arquitectura                                          | `docs/architecture/ARCHITECTURE.md`                               |
| Referencia de ingeniería                              | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (puntuación de 9 factores, 14 estrategias) | `docs/routing/AUTO-COMBO.md`                                      |
| Resiliencia (3 mecanismos)                            | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Repetición de razonamiento                            | `docs/routing/REASONING_REPLAY.md`                                |
| Marco de habilidades                                  | `docs/frameworks/SKILLS.md`                                       |
| Sistema de memoria (FTS5 + Qdrant)                    | `docs/frameworks/MEMORY.md`                                       |
| Agentes en la nube                                    | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Líneas de protección (PII / inyección / visión)       | `docs/security/GUARDRAILS.md`                                     |
| Credenciales públicas upstream (Gemini/etc.)          | `docs/security/PUBLIC_CREDS.md`                                   |
| Saneamiento de mensajes de error                      | `docs/security/ERROR_SANITIZATION.md`                             |
| Evaluaciones                                          | `docs/frameworks/EVALS.md`                                        |
| Cumplimiento / auditoría                              | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                              | `docs/frameworks/WEBHOOKS.md`                                     |
| Pipeline de autorización                              | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Sigilo (TLS / huella digital)                         | `docs/security/STEALTH_GUIDE.md`                                  |
| Protocolos de agente (A2A / ACP / Nube)               | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Servidor MCP                                          | `docs/frameworks/MCP-SERVER.md`                                   |
| Servidor A2A                                          | `docs/frameworks/A2A-SERVER.md`                                   |
| Referencia de API + OpenAPI                           | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Catálogo de proveedores (generado automáticamente)    | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Flujo de lanzamiento                                  | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Pruebas

| Qué                     | Comando                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| Pruebas unitarias       | `npm run test:unit`                                                          |
| Archivo único           | `node --import tsx/esm --test tests/unit/file.test.ts`                       |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                        |
| E2E (Playwright)        | `npm run test:e2e`                                                           |
| Protocolo E2E (MCP+A2A) | `npm run test:protocols:e2e`                                                 |
| Ecosistema              | `npm run test:ecosystem`                                                     |
| Puerta de cobertura     | `npm run test:coverage` (75/75/75/70 — declaraciones/líneas/funciones/ramas) |
| Informe de cobertura    | `npm run coverage:report`                                                    |

**Regla de PR**: Si cambias el código de producción en `src/`, `open-sse/`, `electron/`, o `bin/`, debes incluir o actualizar pruebas en el mismo PR.

**Preferencia de capa de prueba**: unidad primero → integración (multi-módulo o estado de DB) → e2e (solo UI/workflow). Codifica reproducciones de errores como pruebas automatizadas antes o junto con la solución.

**Política de cobertura de Copilot**: Cuando un PR cambia el código de producción y la cobertura está por debajo del 75% (declaraciones/líneas/funciones) o 70% (ramas), no solo informes — agrega o actualiza pruebas, vuelve a ejecutar la puerta de cobertura, luego pide confirmación. Incluye comandos ejecutados, archivos de prueba cambiados y el resultado final de la cobertura en el informe del PR.

---

## Flujo de trabajo de Git

```bash
# Nunca comites directamente en main
git checkout -b feat/tu-característica
git commit -m "feat: describe tu cambio"
git push -u origin feat/tu-característica
```

**Prefijos de rama**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Formato de commit** (Commits Convencionales): `feat(db): agregar cortacircuito` — ámbitos: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Ganchos de Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Entorno

- **Tiempo de ejecución**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, Módulos ES
- **TypeScript**: 5.9+, objetivo ES2022, módulo esnext, resolución bundler
- **Alias de ruta**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Puerto predeterminado**: 20128 (API + dashboard en el mismo puerto)
- **Directorio de datos**: variable de entorno `DATA_DIR`, por defecto `~/.omniroute/`
- **Variables de entorno clave**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Configuración: `cp .env.example .env` luego genera `JWT_SECRET` (`openssl rand -base64 48`) y `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Reglas estrictas

1. Nunca comites secretos o credenciales
2. Nunca agregues lógica a `localDb.ts`
3. Nunca uses `eval()` / `new Function()` / eval implícito
4. Nunca comites directamente en `main`
5. Nunca escribas SQL en bruto en rutas — usa módulos de `src/lib/db/`
6. Nunca tragues errores silenciosamente en flujos SSE
7. Siempre valida entradas con esquemas Zod
8. Siempre incluye pruebas al cambiar código de producción
9. La cobertura debe mantenerse ≥75% (declaraciones, líneas, funciones) / ≥70% (ramas). Medido actualmente: ~82%.
10. Nunca evadas ganchos de Husky (`--no-verify`, `--no-gpg-sign`) sin aprobación explícita del operador.
11. Nunca incrustes client_id/secret de OAuth público o claves web de Firebase como literales de cadena — siempre pasa por `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Ver `docs/security/PUBLIC_CREDS.md`.
12. Nunca devuelvas `err.stack` / `err.message` en respuestas HTTP / SSE / ejecutores — siempre enruta a través de `buildErrorBody()` o `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Ver `docs/security/ERROR_SANITIZATION.md`.
13. Nunca interpolas cadenas de rutas externas o valores de tiempo de ejecución en scripts de shell pasados a `exec()`/`spawn()` — pasa a través de la opción `env` en su lugar. Referencia: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Nunca desestimes una alerta de CodeQL / Escaneo de Secretos sin (a) primero verificar la documentación del patrón anterior para ver si el helper se aplica, y (b) registrar la justificación técnica en el comentario de desestimación. Precedente: `js/stack-trace-exposure` planteado en sitios de llamada que ya enrutan a través de `sanitizeErrorMessage()` es una limitación conocida de CodeQL (sanitizadores personalizados no reconocidos) — desestima como `falso positivo` haciendo referencia a `docs/security/ERROR_SANITIZATION.md`.
15. Nunca expongas rutas que generan procesos secundarios (`/api/mcp/`, `/api/cli-tools/runtime/`) sin clasificación `isLocalOnlyPath()` en `src/server/authz/routeGuard.ts`. La aplicación de loopback ocurre incondicionalmente antes de cualquier verificación de autenticación — un JWT filtrado a través de un túnel no puede activar la generación de procesos. Ver `docs/security/ROUTE_GUARD_TIERS.md`.
16. Nunca incluyas remolques `Co-Authored-By` en mensajes de commit. Los commits deben aparecer únicamente bajo la identidad de Git del propietario del repositorio (`diegosouzapw`). La línea `Co-Authored-By: Claude …` hace que GitHub atribuya commits a la cuenta `claude` de Anthropic, ocultando al autor real en el historial del PR.
