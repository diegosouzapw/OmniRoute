# CLI-TOOLS (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Herramientas CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Herramientas CLI — OmniRoute

Última actualización: 2026-08-18

OmniRoute se integra con tres categorías de herramientas CLI distribuidas en tres páginas de panel dedicadas:

| Página          | Ruta                    | Concepto                                                                                     | Conteo       |
| --------------- | ----------------------- | -------------------------------------------------------------------------------------------- | ------------ |
| **Código CLI**  | `/dashboard/cli-code`   | Herramientas de codificación que apuntas a OmniRoute (Cliente → CLI → OmniRoute → Proveedor) | 26           |
| **Agentes CLI** | `/dashboard/cli-agents` | Agentes autónomos que apuntas a OmniRoute (mismo flujo, mayor alcance)                       | 8            |
| **Agentes ACP** | `/dashboard/acp-agents` | CLIs que OmniRoute genera como backend a través de stdio/ACP (flujo inverso)                 | ver registro |

Las rutas heredadas redirigen a través de 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Cómo Funciona

```
Código CLI / Agentes CLI (flujo de consumo):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (todos apuntan a OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute enruta al proveedor correcto)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Agentes ACP (flujo de generación inverso):
    Solicitud del cliente → OmniRoute → genera CLI a través de stdio/ACP → respuesta
```

**Beneficios:**

- Una clave API para gestionar todas las herramientas
- Seguimiento de costos a través de todas las CLIs en el panel
- Cambio de modelo sin reconfigurar cada herramienta
- Funciona localmente y en servidores remotos (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Configuración automática con `setup-*`

No tienes que escribir la configuración de cada herramienta a mano. OmniRoute envía un `setup-*`
comando por cada CLI soportada que lee el catálogo de modelos **en vivo** de un OmniRoute en ejecución
(local o remoto) y escribe la configuración propia de la herramienta en tu máquina:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Cada uno acepta `--remote <url> --api-key <key>` (configura una herramienta local contra un
OmniRoute remoto), `--dry-run` (vista previa sin escribir), y `--port`. Las herramientas
sin descubrimiento automático de modelos (Cline, Kilo, Roo, Goose, Aider, Qwen) toman
`--model <id>` (y `--yes` para ejecuciones no interactivas). Para lanzar un CLI con el
entorno correcto inyectado y sin configuración escrita en absoluto, usa el lanzador genérico
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — los objetivos y alias provienen de `bin/cli/cli-manifest.mjs`); los lanzadores
heredados por herramienta `omniroute launch` (Claude Code) y `omniroute launch-codex`
(Codex) siguen disponibles. El CLI de Gemini es solo de lanzamiento: es un objetivo de
`omniroute run` pero no tiene receta `setup-*`/`configure`.

> **Referencia completa:** la tabla maestra — lo que cada comando escribe, cada bandera,
> local vs remoto, y qué herramientas quieren un sufijo `/v1` — vive en
> **[Integraciones CLI](../guides/CLI-INTEGRATIONS.md)**.

### Ejecutando esto dentro de un contenedor

Un comando `setup-*` ejecutado dentro del contenedor de OmniRoute escribe en
el propio hogar del contenedor, que ninguna CLI del host lee y que desaparece con el
contenedor. OmniRoute detecta eso y sale con `2` con instrucciones en lugar de
escribir. Dos formas soportadas para avanzar: instalar la CLI en el host y
`omniroute connect` al contenedor, o montar los directorios de configuración y establecer
`CLI_CONFIG_HOME` (el perfil `host` de compose). Cada comando `setup-*`, además de
`omniroute configure` y `omniroute config set`, acepta
`--allow-container-write` cuando configurar las propias CLIs del contenedor es lo que
realmente querías decir; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` hace lo mismo para
el servidor. Ver
[Guía de Docker → Configurando herramientas CLI del host](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

El **endpoint de aplicación** del panel (`POST /api/cli-tools/apply`) aplica la
misma protección: en un contenedor, una escritura cuyo objetivo no está montado desde el
host responde **`422`** con `containerEphemeralTarget: true`, el texto de error seguro
y — para las herramientas con una receta de host (claude, codex, opencode, cline,
kilo, continue) — un `hostSetupCommand` (por ejemplo, `omniroute setup-opencode`) para ejecutar
en el host en su lugar; nada se escribe. `dryRun: true` sigue funcionando en modo contenedor
y devuelve el contenido generado + la ruta objetivo sin tocar el disco, por lo que puedes
previsualizar desde el panel y aplicar en el host. Este comportamiento es
intencional y está protegido contra regresiones por
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — nunca "arregles" un 422
eliminando la protección.

---

## Fuente de Verdad

El catálogo unificado se encuentra en `src/shared/constants/cliTools.ts` como `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Cada entrada tiene estos campos (definidos en `src/shared/schemas/cliCatalog.ts`):

| Campo                                           | Tipo                                                         | Descripción                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | En qué página aparece la herramienta                                |
| `vendor`                                        | `string`                                                     | Origen de la herramienta ("Anthropic", "OSS (P. Gauthier)")         |
| `acpSpawnable`                                  | `boolean`                                                    | También utilizable como un Agente ACP (insignia mostrada)           |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Nivel de soporte de endpoint personalizado. `"none"` = backlog MITM |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mecanismo de configuración                                          |
| `id`, `name`, `color`, `description`, `docsUrl` | estándar                                                     | Campos de visualización principales                                 |

Las entradas con `baseUrlSupport: "none"` **no se muestran** en las páginas del panel — están registradas en el backlog MITM para el plan 11 (ver `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Niveles de capacidad (catalogado × detectable × configurable × lanzable)

No todas las herramientas catalogadas son detectables, configurables o lanzables. Cada nivel tiene una fuente declarativa, y una prueba de deriva las mantiene alineadas:

| Nivel            | Significado                                                                          | Declarado en                                                                      |
| ---------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| **Catalogado**   | Aparece en el catálogo del panel (nombre, proveedor, docs, tipo de configuración)    | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                                  |
| **Detectable**   | Detección de binarios/configuración, comprobaciones de salud, rutas de configuración | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` catálogo en tiempo de ejecución) |
| **Configurable** | Soportado por `omniroute configure <cli>` (existe receta de configuración)           | `bin/cli/cli-manifest.mjs` (`configure: true`)                                    |
| **Lanzable**     | Soportado por `omniroute run <target>` (inyección de env/args definida)              | `bin/cli/cli-manifest.mjs` (`run: true`)                                          |

`bin/cli/cli-manifest.mjs` es el manifiesto ejecutable canónico para los comandos de CLI: `run`, `configure` y los generadores de autocompletado de shell derivan sus listas de objetivos, resolución de alias (por ejemplo `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) y cableado de la bandera `--model` de él. El guardia de deriva `tests/unit/cli/cli-manifest-drift.test.ts` afirma que el manifiesto, el catálogo en tiempo de ejecución, el catálogo de UI y cada superficie consumidora se mantengan sincronizados — un objetivo agregado a una superficie sin los otros falla la suite en lugar de derivar silenciosamente.

## 1. Catálogo de Código CLI (26 herramientas)

Todas las herramientas que aparecen en `/dashboard/cli-code`. Aquellas con `baseUrlSupport: none` están conectadas a través de MITM o una guía manual en lugar de una URL base personalizada:

| id           | nombre                           | proveedor           | soporteBaseUrl | tipoConfiguración         | acpSpawnable |
| ------------ | -------------------------------- | ------------------- | -------------- | ------------------------- | ------------ |
| claude       | Claude Code                      | Anthropic           | completo       | env                       | true         |
| codex        | OpenAI Codex CLI                 | OpenAI              | completo       | personalizado             | true         |
| zcode        | ZCode (Plan de Codificación GLM) | Z.ai                | ninguno        | personalizado             | false        |
| cline        | Cline                            | OSS (ex-Claude Dev) | completo       | personalizado             | true         |
| kilo         | Kilo Code                        | Kilo-Org            | completo       | personalizado             | false        |
| roo          | Roo Code                         | Roo (OSS)           | completo       | guía                      | false        |
| continue     | Continue                         | continue.dev        | completo       | guía                      | false        |
| aider        | Aider                            | OSS (P. Gauthier)   | completo       | guía                      | true         |
| forge        | ForgeCode                        | Antinomy HQ         | completo       | personalizado             | true         |
| jcode        | jcode                            | 1jehuang (OSS)      | completo       | personalizado             | false        |
| deepseek-tui | DeepSeek TUI                     | Hunter Bown (OSS)   | completo       | personalizado             | false        |
| codewhale    | CodeWhale                        | Hmbown (OSS)        | completo       | personalizado             | false        |
| opencode     | OpenCode                         | Anomaly (ex-SST)    | completo       | guía                      | true         |
| droid        | Factory Droid                    | Factory AI          | parcial        | guía                      | false        |
| copilot      | GitHub Copilot CLI               | GitHub/MS           | completo       | personalizado             | false        |
| cursor-cli   | Cursor CLI                       | Anysphere           | parcial        | guía                      | true         |
| smelt        | Smelt                            | leonardcser (OSS)   | completo       | personalizado             | false        |
| pi           | Pi (agente de codificación pi)   | M. Zechner (OSS)    | completo       | personalizado             | false        |
| grok-build   | Grok Build                       | xAI                 | completo       | personalizado             | false        |
| crush        | Crush                            | OSS (Charm)         | completo       | personalizado             | false        |
| qwen         | Qwen Code                        | Alibaba             | completo       | guía                      | true         |
| cursor       | Cursor                           | Anysphere           | ninguno        | guía                      | false        |
| antigravity  | Antigravity                      | Google              | ninguno        | mitm                      | false        |
| hermes       | Hermes                           | Nous Research       | ninguno        | guía                      | false        |
| kiro         | Kiro AI                          | Amazon              | ninguno        | mitm                      | false        |
| custom       | CLI Personalizado                | —                   | completo       | constructor-personalizado | false        |

Las herramientas con `baseUrlSupport: "parcial"` muestran una insignia "⚠ Base URL parcial" en la tarjeta del panel.

## 2. Catálogo de Agentes CLI (8 herramientas)

Agentes autónomos que aparecen en `/dashboard/cli-agents`:

| id           | nombre           | proveedor                | soporteBaseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Agente Hermes    | Nous Research            | completo       | falso        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | completo       | verdadero    |
| goose        | Goose            | Block / Linux Foundation | completo       | verdadero    |
| interpreter  | Open Interpreter | OSS                      | completo       | verdadero    |
| warp         | Warp AI          | Warp Inc.                | parcial        | verdadero    |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | completo       | falso        |
| omp          | Oh My Pi         | OSS                      | completo       | verdadero    |
| letta        | Letta CLI        | Letta                    | completo       | falso        |

---

## 3. Agentes ACP (/dashboard/acp-agents)

Esta página (renombrada de `/dashboard/agents`) muestra CLIs que OmniRoute puede **generar** como motores de ejecución backend a través del protocolo stdio/ACP. El catálogo se mantiene por separado en `src/lib/acp/registry.ts` y **no** es el mismo que `CLI_TOOLS`.

---

## 4. Pendiente de MITM (no mostrado en el dashboard)

Los siguientes CLIs no soportan URL base personalizadas de forma nativa y **no están listados** en las páginas de Código CLI o Agentes CLI. Son candidatos para la interceptación MITM en el plan 11:

| CLI                 | Razón                                                                 |
| ------------------- | --------------------------------------------------------------------- |
| windsurf            | BYOK limitado a seleccionar modelos de Claude + URL/token corporativo |
| amp                 | Ecosistema cerrado (Sourcegraph)                                      |
| amazon-q / kiro-cli | Autenticación AWS SSO, sin URL personalizada                          |
| cowork              | Anthropic Desktop, sin punto final configurable                       |

Consulta `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` para la referencia cruzada completa.

---

## 5. API de Detección por Lotes

Toda la detección de herramientas se agrega a través de un único punto final:

**`GET /api/cli-tools/all-statuses`**

- Autenticación: `requireCliToolsAuth(request)` (igual que otras rutas de `/api/cli-tools/`)
- Retorna: `Record<toolId, ToolBatchStatus>` (tipo: `src/shared/types/cliBatchStatus.ts`)
- Estrategia: `Promise.all` sobre todas las herramientas, tiempo de espera de 5s por herramienta
- Caché: en memoria LRU indexada por el archivo de configuración `mtime`. Caché invalidada cuando cambia el mtime. Reiniciada al reiniciar el servidor.

Forma de respuesta por herramienta:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // sanitizado, sin trazas de pila
}
```

## 6. Controladores de Configuración para Nuevas Herramientas

Las nuevas herramientas con `configType: "custom"` tienen rutas API de configuración dedicadas:

| Ruta                                        | Herramienta                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                     |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                                     |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legado)                                      |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, sincronización primaria + legado `~/.deepseek`) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                       |
| `POST /api/cli-tools/pi-settings`           | Agente de codificación Pi                                                   |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                       |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + clave dedicada `.env`)                 |

Todas las rutas utilizan `sanitizeErrorMessage()` para respuestas de error (Regla Dura #12).

---

## 7. Arquitectura de Páginas del Dashboard

### Código CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — componente del servidor
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — cuadrícula del cliente
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — página de detalles de la herramienta
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 tarjetas de herramientas especializadas + `ToolDetailClient.tsx`

### Agentes CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — componente del servidor
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — cuadrícula del cliente
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — reutiliza `ToolDetailClient`

### Agentes ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — componente del servidor (movido de `agents/`)

### Componentes de UI Compartidos (`src/shared/components/cli/`)

| Archivo                 | Propósito                                                               |
| ----------------------- | ----------------------------------------------------------------------- |
| `CliToolCard.tsx`       | Tarjeta de estado inteligente (detección + configuración + punto final) |
| `CliConceptCard.tsx`    | Tarjeta de explicación de concepto por página                           |
| `CliComparisonCard.tsx` | Comparación en tres columnas entre tipos de CLI                         |
| `BaseUrlSelect.tsx`     | Desplegable de punto final (Local/Nube/Personalizado)                   |
| `ApiKeySelect.tsx`      | Selector de clave API                                                   |
| `ManualConfigModal.tsx` | Modal de fragmento de configuración copiable                            |

### Hook Compartido (`src/shared/hooks/cli/`)

| Archivo                   | Propósito                                                                        |
| ------------------------- | -------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Obtiene `/api/cli-tools/all-statuses`, gestiona el estado de carga/actualización |

## 8. i18n

Nuevos espacios de nombres añadidos en el plan 14 F9:

| Namespace   | Propósito                                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------ |
| `cliCommon` | Cadenas compartidas (etiquetas de tarjetas, textos de concepto/comparación, etiquetas de página de detalles) |
| `cliCode`   | Cadenas de la página del código CLI                                                                          |
| `cliAgents` | Cadenas de la página de agentes CLI                                                                          |
| `acpAgents` | Cadenas de la página de agentes ACP                                                                          |

Se proporcionan traducciones completas en PT-BR y EN. 39 otros locales recurren automáticamente a EN a través de la fusión a nivel de espacio de nombres en `src/i18n/request.ts`.

---

## 9. Inicio Rápido

### Paso 1 — Obtén una clave de API de OmniRoute

1. Abre `/dashboard/api-manager` → **Crear clave de API**
2. Dale un nombre (por ejemplo, `cli-tools`) y selecciona todos los permisos
3. Copia la clave — la necesitarás para cada CLI a continuación

> Tu clave se ve así: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Paso 2 — Instala las herramientas CLI

Todas las herramientas basadas en npm requieren Node.js 22.22.2+ o 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (lanzable a través de `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Basado en Rust

# Agente de codificación Pi
# ver https://github.com/zechnerj/pi-coding-agent para la instalación

# jcode
# ver https://github.com/1jehuang/jcode para la instalación
```

---

### Paso 3 — Configura a través del Dashboard

1. Ve a `http://localhost:20128/dashboard/cli-code`
2. Encuentra tu herramienta en la cuadrícula
3. Haz clic en la tarjeta para abrir la página de detalles de la herramienta
4. Selecciona tu clave de API y URL base
5. Haz clic en **Aplicar Configuración** o copia el fragmento de configuración manual

---

### Paso 4 — Establecer Variables de Entorno Globales

```bash
# Punto de acceso universal de OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI lee GOOGLE_GEMINI_BASE_URL en la RAÍZ (su SDK agrega /v1beta/... por sí mismo)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Para un **servidor remoto**, reemplaza `localhost:20128` con la IP o dominio del servidor,
> por ejemplo, `http://<tu-ip-del-servidor>:20128`.

---

### Paso 4 — Configura Cada Herramienta

#### Claude Code

```bash
# Crea ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Usa la raíz de la puerta de enlace unificada de Anthropic para Claude Code. No agregues `/v1` aquí.

**Prueba:** `claude "say hello"`

---

#### OpenAI Codex

El Codex moderno (v0.137+) lee `~/.codex/config.toml` solamente — el antiguo
`config.yaml` pertenece al CLI npm legado y se ignora silenciosamente. La clave de API
se mantiene en la variable de entorno `OMNIROUTE_API_KEY` (`env_key`), nunca
dentro del archivo:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Referencia completa (perfiles, `wire_api`, ventanas de contexto): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Prueba:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Prueba:** `opencode`

> Usa `opencode run "tu prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> para enviar variantes de pensamiento.

---

#### Cline (CLI o VS Code)

**Modo CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Modo VS Code:**
Configuraciones de la extensión Cline → Proveedor de API: `OpenAI Compatible` → URL base: `http://localhost:20128/v1`

O usa el dashboard de OmniRoute → **CLI Tools → Cline → Aplicar Configuración**.

---

#### KiloCode (CLI o VS Code)

**Modo CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Configuraciones de VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

O usa el dashboard de OmniRoute → **CLI Tools → KiloCode → Aplicar Configuración**.

---

#### Continue (Extensión de VS Code)

Edita `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Reinicia VS Code después de editar.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Usa esto cuando VS Code Insiders esté configurado para modelos de punto final personalizados y quieras que OmniRoute funcione sin un campo de encabezado personalizado.

**Ubicación recomendada:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Ejemplo usando el alias tokenizado de OmniRoute:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Notas:**

- Reemplaza `sk-your-omniroute-key` con una clave de API creada en OmniRoute.
- El campo `url` debe apuntar a `/api/v1/vscode/{token}/chat/completions`.
- El campo `modelsUrl` debe apuntar a `/api/v1/vscode/{token}/models`.
- Prefiere el flujo normal `/v1` + encabezado Bearer cuando el cliente soporte encabezados personalizados.
- Los tokens incrustados en la URL son una solución de compatibilidad y pueden aparecer en los registros del editor o en el historial del proxy.

---

#### Kiro CLI (Amazon)

```bash
# Inicia sesión en tu cuenta de AWS/Kiro:
kiro-cli login

# El CLI utiliza su propia autenticación — OmniRoute no es necesario como backend para Kiro CLI en sí.
# Usa kiro-cli junto con OmniRoute para otras herramientas.
kiro-cli status
```

Para la aplicación de escritorio **Kiro IDE**, usa el punto final MITM expuesto por OmniRoute
bajo `/dashboard/cli-tools → Kiro`.

---

## 10. CLI Interno de OmniRoute

El binario `omniroute` proporciona comandos para el ciclo de vida del servidor, configuración, diagnóstico y gestión de proveedores. Punto de entrada: `bin/omniroute.mjs`.

```bash
omniroute                              # Iniciar servidor (puerto por defecto 20128)
omniroute setup                        # Asistente de configuración interactivo
omniroute doctor                       # Verificar configuración, DB, puertos, tiempo de ejecución
omniroute providers list               # Conexiones de proveedor configuradas
omniroute providers test-all           # Probar cada conexión activa
omniroute reset-password               # Restablecer la contraseña del administrador
omniroute logs                         # Transmitir registros de solicitudes
omniroute health                       # Salud detallada (interruptores, caché, memoria)
omniroute --version                    # Imprimir versión
omniroute --help                       # Mostrar todos los comandos
```

### Configuración e Inicialización

```bash
omniroute setup                        # Asistente de configuración interactivo
omniroute setup --non-interactive      # Modo CI/automatización (lee vars de entorno + flags)
omniroute setup --password '<value>'   # Establecer la contraseña del administrador directamente
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Agregar y probar un proveedor en un solo paso
```

Variables de entorno reconocidas para configuración no interactiva:

| Var                 | Propósito                                                                        |
| ------------------- | -------------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Clave API del proveedor (vinculada a `--api-key` a través de Commander `.env()`) |
| `DATA_DIR`          | Sobrescribir el directorio de datos de OmniRoute                                 |

Todas las demás entradas no interactivas se pasan como flags, no como variables de entorno:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(ver las opciones de `omniroute setup` arriba).

### Diagnósticos

```bash
omniroute doctor                       # Verificar configuración, DB, puertos, tiempo de ejecución, memoria, disponibilidad
omniroute doctor --json                # JSON legible por máquina
omniroute doctor --no-liveness         # Omitir la prueba de salud HTTP
omniroute doctor --host 0.0.0.0        # Sobrescribir el host de disponibilidad
omniroute doctor --liveness-url <url>  # Sobrescribir la URL del endpoint de salud completo
```

El doctor realiza estas verificaciones: `Configuración`, `Base de datos`, `Almacenamiento/encriptación`,
`Disponibilidad de puertos`, `Tiempo de ejecución de Node`, `Binario nativo` (better-sqlite3),
`Memoria`, y `Disponibilidad del servidor`. Sale con un código distinto de cero si alguna verificación falla.

### Gestión de Proveedores

```bash
omniroute providers available                       # Catálogo de proveedores de OmniRoute
omniroute providers available --search openai       # Filtrar catálogo por id/nombre/alias/categoría
omniroute providers available --category api-key    # Filtrar por categoría (api-key, oauth, free, ...)
omniroute providers available --json                # JSON legible por máquina

omniroute providers list                            # Conexiones de proveedor configuradas
omniroute providers list --json

omniroute providers test <id|name>                  # Probar una conexión configurada
omniroute providers test-all                        # Probar cada conexión activa
omniroute providers validate                        # Validación estructural solo local
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Flujo OAuth existente
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` son API-first y, por lo tanto, funcionan contra
el contexto local o remoto activo. La entrada de credenciales debe usar
`--credential-stdin` o `--credential-env`; `--dry-run --json` informa solo
la presencia/forma redactada. `providers available` lee el catálogo de OmniRoute;
`providers list/test/test-all/validate` mantienen su comportamiento local de SQLite y
no requieren que el servidor esté en funcionamiento.

### Recuperación y Restablecimiento

```bash
omniroute reset-password                # Restablecer la contraseña del administrador (también: omniroute-reset-password)
omniroute reset-encrypted-columns       # Mostrar advertencia + prueba en seco para restablecimiento de credenciales encriptadas
omniroute reset-encrypted-columns --force  # Realmente anular las credenciales encriptadas en SQLite
```

### Exportación de Credenciales (⚠ manejar con cuidado)

```bash
omniroute auth export                                 # Mostrar advertencia + puerta de confirmación — sin acceso a DB
omniroute auth export --force                          # Exportar todas las credenciales DESENCRIPTADAS de las conexiones a stdout como JSON
omniroute auth export --force --id <id>                 # Exportar solo la conexión coincidente
omniroute auth export --force --format env               # Emitir líneas OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Escribir en un archivo (creado con permisos 0600)
```

`auth export` es **solo local** (lectura directa de SQLite, sin ruta HTTP) y deliberadamente imprime/escribe
valores **en texto plano** `apiKey`/`accessToken`/`refreshToken`/`idToken` — esa es la característica, no un
error. No se lee nada de la base de datos, y nada se desencripta, sin `--force`. Un banner de advertencia en stderr
siempre se imprime antes de que se emita cualquier texto plano. Requiere que `STORAGE_ENCRYPTION_KEY` esté
establecido. Un campo que no se puede desencriptar (clave obsoleta, texto cifrado corrupto) se informa como
`<field>DecryptFailed: true` en lugar de abortar toda la exportación o filtrar el error subyacente.

### Otros subcomandos

Estos asumen un servidor OmniRoute en funcionamiento, a menos que se indique lo contrario:

```bash
omniroute status                       # Estado de tiempo de ejecución integral
omniroute logs                         # Transmitir registros de solicitudes (--json, --search, --follow)
omniroute config show                  # Mostrar configuración actual

omniroute provider list                # Listar proveedores disponibles (alias de providers list)
omniroute provider add                 # Registrar OmniRoute como un proveedor en una herramienta
omniroute keys add | list | remove     # Gestionar claves API
omniroute models [provider]            # Listar modelos (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Instantánea de configuración + DB
omniroute restore                      # Restaurar desde una instantánea anterior

omniroute health                       # Salud detallada (interruptores, caché, memoria)
omniroute quota                        # Uso de cuota del proveedor
omniroute cache                        # Estado de la caché
omniroute cache clear                  # Limpiar cachés semánticas + de firma

omniroute mcp status | restart         # Estado del servidor MCP / reiniciar
omniroute a2a status | card            # Estado del servidor A2A / tarjeta de agente

omniroute tunnel list | create | stop  # Gestionar túneles (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Inspeccionar / establecer vars de entorno (temporal)

omniroute test                         # Prueba de conectividad del proveedor
omniroute update                       # Comprobar actualizaciones
omniroute completion                   # Generar finalización de shell
```

### Flags Comunes

| Flag                | Descripción                                               |
| ------------------- | --------------------------------------------------------- |
| `--no-open`         | No abrir automáticamente el navegador al iniciar          |
| `--port <n>`        | Sobrescribir el puerto API (por defecto 20128)            |
| `--mcp`             | Ejecutar como servidor MCP a través de stdio (para IDEs)  |
| `--non-interactive` | Modo CI (sin mensajes; lee de env/flags)                  |
| `--json`            | Salida JSON legible por máquina (doctor, providers, etc.) |
| `--help`, `-h`      | Mostrar ayuda específica del comando                      |
| `--version`, `-v`   | Imprimir la versión instalada                             |

## Puntos finales de API disponibles

| Endpoint                   | Descripción                           | Uso para                                     |
| -------------------------- | ------------------------------------- | -------------------------------------------- |
| `/v1/chat/completions`     | Chat estándar (todos los proveedores) | Todas las herramientas modernas              |
| `/v1/responses`            | API de respuestas (formato OpenAI)    | Codex, flujos de trabajo agenticos           |
| `/v1/completions`          | Completaciones de texto heredadas     | Herramientas más antiguas que usan `prompt:` |
| `/v1/embeddings`           | Embeddings de texto                   | RAG, búsqueda                                |
| `/v1/images/generations`   | Generación de imágenes                | GPT-Image, Flux, etc.                        |
| `/v1/audio/speech`         | Texto a voz                           | ElevenLabs, OpenAI TTS                       |
| `/v1/audio/transcriptions` | Voz a texto                           | Deepgram, AssemblyAI                         |

Ejemplos listos para pegar con una URL de OmniRoute tokenizada:

```txt
Ejemplo de token: sk-a3ab3c080beaee3a-69f4a4-070d71af

Base estándar de OpenAI: http://localhost:20128/v1
Modelos de VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Chat de VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Respuestas de VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Etiquetas de Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Chat de Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Solución de problemas

| Error                                                     | Causa                            | Solución                                                   |
| --------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------- |
| `Connection refused`                                      | OmniRoute no está en ejecución   | `omniroute serve`                                          |
| `401 Unauthorized`                                        | Clave API incorrecta             | Verificar en `/dashboard/api-manager`                      |
| `No combo configured`                                     | Sin combo de enrutamiento activo | Configurar en `/dashboard/combos`                          |
| CLI muestra "not installed"                               | Binario no en PATH               | Verificar `which <command>`                                |
| El panel muestra "not detected" después de la instalación | Caché obsoleta                   | Hacer clic en "⟳ Refresh detection" en el panel            |
| Enlace antiguo `/dashboard/cli-tools`                     | Marcador anterior a v3.8.6       | Redirigido automáticamente a `/dashboard/cli-code` (308)   |
| Enlace antiguo `/dashboard/agents`                        | Marcador anterior a v3.8.6       | Redirigido automáticamente a `/dashboard/acp-agents` (308) |
