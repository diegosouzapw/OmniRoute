# Skills Framework (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Fuente de referencia:** `src/lib/skills/` y `src/app/api/skills/`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute ofrece un framework de Skills extensible que permite a los modelos de lenguaje (y a los operadores) combinar capacidades reutilizables, desde lecturas del sistema de archivos y solicitudes HTTP hasta la ejecución de código en entornos aislados y skills seleccionadas del marketplace.

Una skill es una unidad de trabajo versionada y definida mediante un esquema. OmniRoute puede inyectar skills como definiciones de herramientas en las solicitudes salientes, interceptar las llamadas a herramientas devueltas por el modelo, ejecutar el controlador correspondiente y enviar el resultado de vuelta al modelo para que la conversación pueda continuar. El modelo nunca ve la implementación, solo la interfaz de la herramienta.

---

## Agent Skills frente a Omni Skills

OmniRoute tiene dos sistemas de skills distintos pero complementarios:

| Dimensión            | **Omni Skills** (este documento)                                                        | **Agent Skills**                                                                                      |
| :------------------- | :-------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- |
| Propósito            | Inyección de herramientas LLM + ejecución en entorno aislado                            | Catálogo SKILL.md para que agentes externos lo descubran y utilicen                                   |
| Fuente de referencia | `src/lib/skills/` + marketplace                                                         | `src/lib/agentSkills/` + directorio `skills/`                                                         |
| Modo de ejecución    | Se inyectan en solicitudes salientes y se ejecutan en eventos de llamada a herramientas | Catálogo Markdown estático + endpoints de descubrimiento REST/MCP/A2A                                 |
| Quién lo utiliza     | El propio OmniRoute (enrutamiento combinado, llamadas LLM entrantes)                    | Agentes externos, clientes MCP, orquestadores A2A                                                     |
| Cantidad             | Variable (determinada por el marketplace)                                               | 45 entradas de catálogo (23 de API + 21 de CLI + 1 de configuración)                                  |
| Formato              | `SkillDefinition` con esquema de herramienta + controlador                              | Frontmatter de `SKILL.md` + cuerpo en Markdown                                                        |
| Descubrimiento       | REST `/api/skills/*` + herramientas MCP `omniroute_skills_*`                            | REST `/api/agent-skills/*` + herramientas MCP `omniroute_agent_skills_*` + `list-capabilities` de A2A |

Las **Omni Skills** son el motor de ejecución: definen lo que OmniRoute _puede hacer_ cuando un LLM invoca una herramienta.

Las **Agent Skills** son el catálogo de documentación: explican a los agentes externos _cómo utilizar_ la API REST y la CLI de OmniRoute mediante archivos SKILL.md estructurados que pueden incorporarse directamente a los prompts de los agentes.

Para obtener información sobre el catálogo de Agent Skills, el generador, las herramientas MCP y la skill A2A, consulta [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Conceptos

### Fuentes de skills

En el mismo registro coexisten tres fuentes de skills:

1. **Skills integradas** (`src/lib/skills/builtins.ts`) — incluidas con OmniRoute. Cubren los casos habituales:
   - `file_read`, `file_write` — espacio de trabajo aislado por clave de API en `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP saliente mediante `safeOutboundFetch` con `guard: "public-only"`
   - `web_search` — proveedor de búsqueda conectable con almacenamiento en caché (`executeWebSearch`)
   - `eval_code` — ejecución de `node` o `python` en un entorno aislado de Docker
   - `execute_command` — comando de shell ejecutado en un entorno aislado de Docker
   - `browser` — estructura basada en Playwright, deshabilitada de forma predeterminada (`builtin/browser.ts`)
2. **SkillsMP** (el marketplace de OmniRoute) — obtenidas de `https://skillsmp.com/api/v1/skills/search`. Requiere `skillsmpApiKey` en Configuración.
3. **SkillsSH** (catálogo comunitario de `skills.sh`) — obtenidas de `https://skills.sh/api/search`. No requiere autenticación; el contenido de SKILL.md se obtiene directamente desde GitHub raw.

Un único «proveedor activo» controla desde qué catálogo realiza las instalaciones el panel (`src/lib/skills/providerSettings.ts`). Cámbialo en **Configuración → Memoria y skills**. Valor predeterminado: `skillsmp`.

### Identidad de las skills

Las skills se identifican mediante `name@version` en el registro en memoria (`src/lib/skills/registry.ts`). La versión debe seguir semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` reconoce las restricciones `^`, `~`, `>`, `>=`, `<`, `<=`, `==` y de coincidencia exacta.

### Modo de las skills

Cada skill tiene un modo de ejecución que controla cuándo se inyecta:

| Modo   | Comportamiento                                                                                                                |
| ------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `on`   | Siempre se inyecta como definición de herramienta                                                                             |
| `off`  | Nunca se inyecta ni se puede ejecutar                                                                                         |
| `auto` | Se puntúa con respecto a la solicitud entrante; solo se inyecta si la puntuación ≥ `AUTO_MIN_SCORE` (valor predeterminado: 3) |

`auto` es el valor predeterminado para las skills instaladas desde el marketplace. `enabled=true` y `mode="off"` juntos significan «registrada pero inactiva»; cambiar `enabled` mediante la columna heredada también actualiza `mode` para que las rutas de código antiguas sigan siendo coherentes (`src/app/api/skills/[id]/route.ts`).

### Estado (ejecuciones)

Las ejecuciones de skills se registran en la tabla `skill_executions` con los siguientes estados (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Caché del registro

`SkillRegistry` es un singleton con una caché TTL de 60 segundos (`registry.ts:14`). `loadFromDatabase()` es idempotente y elimina las llamadas simultáneas duplicadas mediante `pendingLoad`. Cualquier escritura (`register`/`unregister`/`unregisterById`) invalida la caché. Consulta las versiones mediante `getSkillVersions(name)` y `resolveVersion(name, constraint)`.

### Inyección específica del proveedor

`injectSkills()` en `src/lib/skills/injection.ts` es el punto de entrada que convierte las skills registradas en definiciones de herramientas específicas del proveedor:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

El nombre de la herramienta se codifica como `name@version` para que el controlador pueda seleccionar la versión correcta cuando el modelo vuelva a invocarla.

### Puntuación AUTO

Cuando `mode="auto"`, cada habilidad candidata se puntúa en función del contexto de la solicitud (`scoreAutoSkill()` en `injection.ts`):

| Señal                                                                                 | Puntos       |
| ------------------------------------------------------------------------------------- | ------------ |
| El nombre de la habilidad aparece literalmente en el contexto                         | +6           |
| Cada token del nombre coincide con un token del contexto                              | +2           |
| Cada subcadena de etiqueta coincide con el contexto                                   | +3           |
| Cada token de la descripción coincide con el contexto                                 | +1           |
| El motivo en segundo plano coincide con un token del nombre                           | +2 por token |
| El motivo en segundo plano coincide con una etiqueta                                  | +2 por token |
| La sugerencia de proveedor en las etiquetas coincide con el proveedor de la solicitud | +2 / −2      |

Se inyectan las `AUTO_MAX_SKILLS = 5` habilidades principales con `score >= AUTO_MIN_SCORE = 3`. Los empates se resuelven por `installCount` (descendente) y, después, por el nombre en orden alfabético (`injection.ts:225-235`).

### Interceptación de llamadas a herramientas

El controlador de chat invoca `handleToolCallExecution()` en `src/lib/skills/interception.ts` después de que el proveedor ascendente devuelve una respuesta con una llamada a una herramienta:

1. `extractToolCalls()` lee los formatos específicos de cada proveedor (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Primero se resuelven los alias de herramientas integradas (p. ej., `omniroute_web_search` → `web_search`). Los controladores integrados se ejecutan en línea.
3. Todo lo demás se enruta mediante `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Los resultados se vuelven a insertar en la respuesta: elementos `tool_results`, `function_call_output` o bloques `tool_result` de Anthropic, según corresponda.

`customSkillExecutionEnabled` en el contexto de ejecución puede establecerse en `false` para permitir únicamente la interceptación integrada (se utiliza en rutas de solicitud que deshabilitan explícitamente los controladores definidos por el usuario).

---

## Entorno aislado de Docker

Las rutas de código no integradas (`eval_code`, `execute_command`) se ejecutan dentro de Docker mediante `SandboxRunner` (`src/lib/skills/sandbox.ts`). Cada contenedor se inicia con:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (cuando readOnly=true)
```

Valores predeterminados (`SandboxRunner.DEFAULT_CONFIG`):

| Campo            | Valor predeterminado | Notas                                                    |
| ---------------- | -------------------- | -------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)      | Se divide por 1000 antes de pasarlo a `--cpus`           |
| `memoryLimit`    | 256 MB               | Límite estricto                                          |
| `timeout`        | 30000 ms             | Terminación suave mediante `SIGTERM` + `docker kill`     |
| `networkEnabled` | `false`              | Se convierte en `--network none`                         |
| `readOnly`       | `true`               | FS raíz de solo lectura; `/tmp` y `/workspace` son tmpfs |

`SandboxRunner.kill(id)` y `killAll()` están disponibles para el apagado; los contenedores en ejecución se registran en `runningContainers: Map<string, ChildProcess>`.

### Variables de entorno del entorno aislado

Configuradas mediante `process.env` en `src/lib/skills/builtins.ts`:

| Variable de entorno               | Valor predeterminado | Propósito                                                                                       |
| --------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)     | Límite para `file_read` y `file_write`                                                          |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`             | Límite para el cuerpo de la respuesta de `http_request`                                         |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`             | Límite para stdout/stderr devueltos al invocador                                                |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`              | Tiempo de espera predeterminado para comandos aislados; limitado a 60 s                         |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`              | Control maestro para la salida. Establezca `1` o `true` para permitir la activación por llamada |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (véase abajo)        | Lista separada por comas de imágenes de Docker permitidas                                       |

Imágenes permitidas de forma predeterminada: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Cualquier adición mediante `SKILLS_ALLOWED_SANDBOX_IMAGES` se combina con los valores predeterminados; `normalizeImage()` rechaza las imágenes desconocidas.

> Nota: no existe una variable de entorno `SKILLS_EXECUTION_TIMEOUT_MS` independiente. El tiempo de espera del controlador no aislado está fijado en 30 s en `SkillExecutor` (`executor.ts:13`), pero puede sobrescribirse en tiempo de ejecución mediante `skillExecutor.setTimeout(ms)`.

### Aislamiento del espacio de trabajo

`file_read` y `file_write` resuelven cada ruta con respecto a un espacio de trabajo por clave de API ubicado en `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. El recorrido de rutas (`..`) y los segmentos prohibidos (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) se rechazan antes de cualquier operación de E/S en disco.

### Refuerzo de HTTP

`http_request` (`builtins.ts:257`):

- Lista de métodos permitidos: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Encabezados salientes bloqueados: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Redirecciones deshabilitadas (`allowRedirect: false`)
- Enrutado mediante `safeOutboundFetch` con `guard: "public-only"` (se bloquean los rangos privados/de bucle invertido)
- La respuesta se trunca en `SKILLS_MAX_HTTP_RESPONSE_BYTES`; el cliente ve `truncated: true`

---

## Ejecutor híbrido (vista previa)

`src/lib/skills/hybrid.ts` define un `HybridExecutor` que decide entre la ejecución `direct` (en proceso) y `sandbox` para cada llamada, con una ruta de reintento `autoUpgrade` en caso de errores de tiempo de espera o memoria. Las implementaciones integradas `directExecutor` / `sandboxRunner` son stubs (`executeDirect`, `executeInSandbox` devuelven objetos provisionales); considere este módulo como un contrato en construcción. La ejecución real aún se realiza mediante `skillExecutor` + `SandboxRunner`.

---

## Almacenamiento

El esquema se encuentra en dos migraciones:

- `src/lib/db/migrations/016_create_skills.sql`: tablas base `skills` y `skill_executions`, con índices en `(api_key_id, name)` y `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql`: agrega `mode`, `source_provider`, `tags` (JSON) e `install_count` a `skills`.

`skill_executions.status` está restringido en el nivel de la base de datos: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API REST

Todos los endpoints se encuentran en `src/app/api/skills/`. Los endpoints de administración (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) requieren **autenticación de administración** mediante `requireManagementAuth()`. Los flujos del marketplace y de instalación utilizan el método más ligero `isAuthenticated()` (sesión o clave de API).

| Endpoint | Método | Propósito |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Enumera las skills registradas. Admite `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, paginación |
| `/api/skills/[id]` | PUT | Actualiza `enabled` o `mode` |
| `/api/skills/[id]` | DELETE | Anula el registro por id |
| `/api/skills/install` | POST | Instala una skill personalizada (código del controlador + esquema) |
| `/api/skills/marketplace` | GET | Busca en el catálogo de SkillsMP (devuelve opciones populares predeterminadas cuando `q` está vacío) |
| `/api/skills/marketplace/install` | POST | Instala una skill de SkillsMP (requiere que el proveedor activo sea `skillsmp`) |
| `/api/skills/skillssh` | GET | Busca en el catálogo de skills.sh (`?q=&limit=`, con un máximo de 100) |
| `/api/skills/skillssh/install` | POST | Instala una skill de skills.sh (requiere que el proveedor activo sea `skillssh`) |
| `/api/skills/executions` | GET | Historial de ejecuciones paginado (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Ejecuta una skill registrada de forma ad hoc |

El endpoint `POST /api/skills/executions` devuelve HTTP `503` con `{ error: "Skills execution is disabled..." }` cuando `settings.skillsEnabled === false` (`executor.ts:42-45`). Los operadores pueden cambiar el interruptor maestro desde **Configuración → IA**.

### Ejemplo: instalar una skill personalizada

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

La cadena `handlerCode` es una **búsqueda por nombre del controlador**, no código ejecutable. El ejecutor la asigna mediante `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Las instalaciones desde el marketplace almacenan el texto de SKILL.md en este campo como documentación y dirigen la ejecución mediante llamadas a herramientas generadas por el modelo. El código fuente arbitrario proporcionado por el usuario no se evalúa mediante `eval`.

## Herramientas MCP

Cuatro herramientas MCP encapsulan la interfaz de skills (`open-sse/mcp-server/tools/skillTools.ts`). Se registran automáticamente cuando se inicia el servidor MCP.

| Herramienta                   | Descripción                                                                 |
| ----------------------------- | --------------------------------------------------------------------------- |
| `omniroute_skills_list`       | Enumera skills; filtros opcionales: `apiKeyId`, `name`, `enabled`           |
| `omniroute_skills_enable`     | Habilita o deshabilita una skill mediante `skillId`                         |
| `omniroute_skills_execute`    | Ejecuta una skill con una carga útil de entrada                             |
| `omniroute_skills_executions` | Historial de ejecuciones recientes (50 de forma predeterminada, máximo 100) |

Consulta [MCP-SERVER.md](./MCP-SERVER.md) para obtener información sobre la configuración del transporte y las asignaciones de alcance.

---

## Integración A2A

`src/lib/skills/a2a.ts` exporta el descriptor de la skill A2A `memory_aware_routing` y una función auxiliar `registerA2ASkill(registry)`. Las skills A2A personalizadas se encuentran en `src/lib/a2a/skills/` y se despachan mediante `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Consulta [A2A-SERVER.md](./A2A-SERVER.md) para conocer el ciclo de vida completo de las tareas.

---

## Añadir una nueva skill integrada

1. **Define el manejador** en `src/lib/skills/builtins.ts` (o en un archivo relacionado dentro de `src/lib/skills/builtin/`). Firma: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **¿Ruta de código en entorno aislado?** Llama a `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Usa `normalizeImage()` con la lista de permitidos.
3. **¿Ruta del sistema de archivos?** Pásala siempre por `resolveWorkspacePath(input, context)` antes de acceder al disco.
4. **¿Llamada de red?** Usa `safeOutboundFetch` con `guard: "public-only"`; sanea los encabezados mediante `sanitizeHeaders()`.
5. **Regístrala** añadiendo la entrada a `builtinSkills` (o llamando a algo como `registerBrowserSkill(executor)` durante el arranque).
6. **Configura los alias de herramientas integradas** (opcional) en `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) si el modelo ascendente emite un nombre diferente.
7. **Pruebas** en `src/lib/skills/__tests__/` (Vitest).

---

## Añadir una skill personalizada (no integrada)

1. Registra el manejador al iniciar el proceso:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Inserta la skill mediante `POST /api/skills/install` (el campo `handlerCode` debe coincidir con el nombre del manejador registrado).
3. Cambia `mode` a `on` o `auto` mediante `PUT /api/skills/[id]`.

---

## Consejos operativos

- **Interruptor maestro:** `settings.skillsEnabled = false` bloquea todas las ejecuciones y devuelve HTTP `503` en `/api/skills/executions`. El registro continúa cargándose.
- **Restringe el tráfico saliente:** mantén `SKILLS_SANDBOX_NETWORK_ENABLED` sin definir (valor predeterminado) para que el entorno aislado no tenga ningún acceso a la red. El valor `networkEnabled: true` por llamada sigue requiriendo la habilitación del control maestro.
- **Permite imágenes específicas:** establece `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` para ampliar la lista de permitidos.
- **Audita las ejecuciones:** tanto `/dashboard/skills/executions` como `omniroute_skills_executions` consultan `skill_executions`. Las ejecuciones correctas incluyen `durationMs`; los errores incluyen `errorMessage`.
- **Invalidación de caché:** llama a `skillRegistry.invalidateCache()` después de editar manualmente la base de datos; de lo contrario, espera 60 s.
- **Espacio de trabajo anónimo:** cuando `apiKeyId` está vacío, todas las llamadas generan un hash que apunta al mismo espacio de trabajo `"anonymous"`; el código que gestione recursos compartidos siempre debe proporcionar una clave real.

---

## Ciclo de vida de la ejecución (v3.8.16+)

El `SkillExecutor` (`src/lib/skills/executor.ts`) es un **singleton** que gestiona cada invocación de una habilidad. Comprender su ciclo de vida es fundamental para depurar tiempos de espera, reintentos y el estado de ejecución.

### El ciclo de vida de 5 etapas

```
   execute() llamado
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← en cola, aún no iniciado (fila de la BD creada)
  └──────┬──────┘
         │ iniciar controlador
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← controlador invocado con tiempo de espera
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (ninguna otra ruta — terminado por el proceso padre)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Fila de la BD actualizada con estado, salida y durationMs
```

### Configuración predeterminada

| Ajuste       | Valor predeterminado | Configurable mediante                |
| ------------ | -------------------- | ------------------------------------ |
| `timeout`    | `30000` (30s)        | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                  | `skillExecutor.setMaxRetries(count)` |

> **Importante**: El ejecutor es un singleton; llamar a `setTimeout()` afecta globalmente a todas las invocaciones posteriores. Actualmente no se admiten tiempos de espera por habilidad; si necesita diferentes tiempos de espera para cada habilidad, envíe procesos separados o cree una bifurcación del ejecutor.

### Valores de estado

De `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // En cola, aún no iniciado
  RUNNING = "running", // Controlador invocado
  SUCCESS = "success", // El controlador devolvió una salida válida
  ERROR = "error", // El controlador lanzó una excepción
  TIMEOUT = "timeout", // Se superó el tiempo de espera del ejecutor
}
```

> **Nota**: El estado `TIMEOUT` está definido en el enum, pero la implementación actual del ejecutor **no lo escribe realmente en la BD**; los tiempos de espera se muestran como `ERROR` con el mensaje `"Skill execution timed out"`. El enum de estado está reservado para uso futuro.

### Inspección de ejecuciones

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Obtener una ejecución específica por ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} en ${exec.durationMs}ms`);
}

// Enumerar las ejecuciones recientes de una clave de API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Contar el total de ejecuciones
const total = skillExecutor.countExecutions("api-key-id");
```

### Comportamiento de los reintentos

El ajuste `maxRetries` se almacena, pero el método `execute()` del ejecutor **no lo utiliza actualmente**: solo realiza un único intento. El valor `maxRetries` se expone para una implementación futura y para los hooks que quieran leerlo.

Por ahora, los reintentos deben implementarse dentro del propio controlador de la habilidad. Las habilidades
integradas se registran en el ejecutor (p. ej., `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` en `src/lib/skills/builtin/`); cualquier controlador
que registre puede envolver su propio bucle de reintentos:

```ts
// dentro de un controlador de habilidad
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode en detalle

La enumeración `SkillMode` (`src/lib/skills/types.ts`) controla **cuándo y cómo** se invocan las habilidades:

```ts
enum SkillMode {
  AUTO = "auto", // El LLM decide cuándo llamar a la habilidad
  MANUAL = "manual", // Solo se invoca mediante una solicitud explícita del usuario
  HYBRID = "hybrid", // Puntuación AUTO + anulación manual
}
```

> **Nota**: El código base define `SkillMode` (AUTO/MANUAL/HYBRID), mientras que el campo `Skill.mode` utiliza una forma diferente (`"on" | "off" | "auto"`). Están relacionados, pero no son idénticos: `SkillMode` corresponde a la política del ejecutor, mientras que `Skill.mode` controla la habilitación de cada habilidad.

### Cuándo usar cada modo

| Modo     | Comportamiento del LLM                                                                              | Caso de uso                                                              |
| -------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `AUTO`   | El LLM puede llamar a la habilidad cuando lo considere necesario                                    | Habilidades de propósito general (lectura de archivos, solicitudes HTTP) |
| `MANUAL` | El LLM no puede llamar a la habilidad; solo la invoca una llamada explícita a la API `executeSkill` | Operaciones sensibles (escrituras en bases de datos, pagos)              |
| `HYBRID` | El LLM puede sugerir la habilidad; el usuario debe confirmarlo                                      | Habilidades que tienen efectos secundarios, pero no son peligrosas       |

### Puntuación AUTO

Cuando el modo `AUTO` está activo, cada habilidad candidata se puntúa en función del contexto
de la solicitud mediante `scoreAutoSkill()` en `src/lib/skills/injection.ts`: un sistema aditivo
de puntos enteros (coincidencia con el nombre de la habilidad, solapamiento de tokens de nombre/etiqueta/descripción,
indicios del motivo en segundo plano, bonificación/penalización por indicios del proveedor). Las
`AUTO_MAX_SKILLS = 5` habilidades principales con `score >= AUTO_MIN_SCORE = 3` se inyectan como
herramientas invocables; los empates se resuelven primero por `installCount` y luego por nombre. Consulte la tabla
completa de puntos en [**Generación del esquema de herramientas → Puntuación AUTO**](#auto-scoring), anteriormente en este
documento; no existe ningún umbral decimal al estilo de `0.6` ni puntuación en `registry.ts`.

---

## Catálogo de habilidades integradas

OmniRoute incluye un conjunto seleccionado de habilidades integradas en `src/lib/skills/builtin/`. Las más comunes son:

### Habilidad de automatización del navegador

La habilidad del navegador (`src/lib/skills/builtin/browser.ts`) proporciona automatización de navegador sin interfaz gráfica mediante Playwright/Puppeteer. **Está implementada, pero no se incluye en el catálogo de habilidades predeterminado**; para usarla, instale por separado el complemento de extensión del navegador.

```ts
// Habilitar en la configuración
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Exigir siempre una invocación explícita
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s para la carga de páginas
  maxRetries: 1,
};
```

### Otras categorías integradas

| Categoría           | Habilidades                                             | Modo   |
| ------------------- | ------------------------------------------------------- | ------ |
| E/S de archivos     | `file_read`, `file_write`                               | AUTO   |
| HTTP                | `http_request`                                          | AUTO   |
| Búsqueda            | `web_search`                                            | AUTO   |
| Ejecución de código | `eval_code` (JavaScript/Python en entorno aislado)      | HYBRID |
| Sistema             | `execute_command` (ejecución de CLI en entorno aislado) | MANUAL |

### Añadir una habilidad personalizada

Consulte [SDK de complementos e integración de habilidades](./PLUGIN_SDK.md) para saber cómo añadir una habilidad personalizada mediante el sistema de complementos.

---

## Véase también

- [MCP-SERVER.md](./MCP-SERVER.md) — registro de herramientas MCP y transportes
- [A2A-SERVER.md](./A2A-SERVER.md) — ciclo de vida de tareas A2A y despacho de habilidades
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — introducción para usuarios
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — canalización de solicitudes y mapa de componentes
- Código fuente: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Pruebas: `src/lib/skills/__tests__/integration.test.ts`
