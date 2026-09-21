# ACP (Agent Client Protocol) (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP permite que OmniRoute inicie agentes CLI (como Claude Code, Codex) como procesos secundarios en lugar de usar API HTTP. Esto proporciona un transporte de «CLI como backend».

---

## ¿Qué es ACP?

ACP (Agent Client Protocol) es un transporte de **«CLI como backend»** para OmniRoute. En lugar de interceptar llamadas a las API HTTP de proveedores de IA, ACP **inicia agentes CLI como procesos secundarios** y envía las instrucciones mediante su interfaz nativa.

### ¿Por qué usar ACP?

| Ventaja                       | Descripción                                                  |
| ----------------------------- | ------------------------------------------------------------ |
| **No requiere claves de API** | Usa la autenticación existente de tu CLI                     |
| **Protocolo nativo**          | Usa el formato nativo de entrada/salida de cada CLI          |
| **Detección automática**      | Detecta las CLI instaladas en tu sistema                     |
| **15 agentes integrados**     | Preconfigurados para herramientas CLI populares              |
| **Agentes personalizados**    | Añade tus propias herramientas CLI mediante la configuración |
| **Gestión de procesos**       | Gestiona el ciclo de vida (iniciar, enviar, finalizar)       |

---

## Agentes CLI compatibles

ACP admite **15 agentes CLI integrados** de forma predeterminada:

| ID del agente | Nombre para mostrar | Binario       | Protocolo |
| ------------- | ------------------- | ------------- | --------- |
| `codex`       | OpenAI Codex CLI    | `codex`       | stdio     |
| `claude`      | Claude Code CLI     | `claude`      | stdio     |
| `goose`       | Goose CLI           | `goose`       | stdio     |
| `openclaw`    | OpenClaw            | `openclaw`    | stdio     |
| `aider`       | Aider               | `aider`       | stdio     |
| `opencode`    | OpenCode            | `opencode`    | stdio     |
| `cline`       | Cline               | `cline`       | stdio     |
| `qwen`        | Qwen Code           | `qwen --acp`  | stdio     |
| `forge`       | ForgeCode           | `forge`       | stdio     |
| `amazon-q`    | Amazon Q Developer  | `q`           | stdio     |
| `interpreter` | Open Interpreter    | `interpreter` | stdio     |
| `cursor-cli`  | Cursor CLI          | `cursor`      | stdio     |
| `warp`        | Warp AI             | `warp`        | stdio     |
| `gemini`      | Gemini CLI          | `gemini`      | stdio     |
| `zcode`       | ZCode               | `zcode`       | stdio     |

### Agentes personalizados

Puedes añadir tus propios agentes CLI mediante la configuración. Los agentes personalizados admiten las mismas funciones que los agentes integrados.

---

## Inicio rápido

### Paso 1: Instala un agente CLI

```bash
# Ejemplo: instala Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verifica la instalación
claude --version
```

### Paso 2: Detección automática de ACP

ACP detecta automáticamente los agentes CLI instalados en tu sistema. ¡No se necesita ninguna configuración!

### Paso 3: Usa el transporte ACP

Una vez detectado, ACP puede usarse como transporte para cualquier proveedor compatible. OmniRoute usará ACP automáticamente cuando la CLI esté disponible.

---

## Cómo funciona ACP

### Arquitectura

```
┌─────────────────┐
│  OmniRoute      │
│  (proxy HTTP)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Proceso secund. │
│ (agente CLI)    │
│                 │
│  stdin  ◄──────┤  Enviar instrucción
│  stdout ──────►│  Recibir respuesta
│  stderr ──────►│  Recibir errores
└─────────────────┘
```

### Ciclo de vida del proceso

1. **Inicio** — ACP crea un proceso secundario para el agente CLI
2. **Envío** — ACP escribe las instrucciones en el stdin del proceso
3. **Recepción** — ACP lee las respuestas de stdout/stderr
4. **Detección de inactividad** — ACP espera 2 segundos de inactividad antes de considerar que la respuesta está completa
5. **Finalización** — ACP termina el proceso (SIGTERM y, después de 5 s, SIGKILL)

### Protocolo de comunicación

ACP usa **stdio** (entrada/salida estándar) para comunicarse con los agentes CLI. El protocolo es:

1. **Enviar instrucción** — Escribir en stdin con un salto de línea
2. **Esperar la respuesta** — Leer de stdout hasta que quede inactivo (2 s sin salida)
3. **Tiempo de espera** — 120 segundos de forma predeterminada (configurable)

---

## Referencia de la API

### Funciones del registro

#### `detectInstalledAgents()`

Detecta todos los agentes de CLI instalados en el sistema. Los resultados se almacenan en caché durante 60 segundos.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Devuelve: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // p. ej., "codex", "claude"
  name: string; // Nombre para mostrar
  binary: string; // Nombre del binario que se iniciará
  versionCommand: string; // Comando de detección de versión
  version: string | null; // Versión detectada (null si no está instalado)
  installed: boolean; // Indica si el agente está instalado
  providerAlias: string; // ID del proveedor en OmniRoute
  spawnArgs: string[]; // Argumentos que se pasarán al iniciarlo
  protocol: "stdio" | "http"; // Protocolo de comunicación
  isCustom?: boolean; // Indica si es un agente personalizado definido por el usuario
}
```

#### `getAvailableAgents()`

Obtiene únicamente los agentes que están instalados y disponibles para ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Devuelve: CliAgentInfo[] (solo agentes instalados)
```

#### `getAgentById(id)`

Obtiene un agente específico por su ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Devuelve: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Establece las definiciones de agentes personalizados desde la configuración.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### Funciones del gestor

#### `acpManager.spawn(agentId, binary, args, env)`

Inicia un nuevo proceso de agente de CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* variables de entorno personalizadas */
});
// Devuelve: AcpSession
```

**ID de agente permitidos**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Envía una instrucción a un agente de CLI y recopila la respuesta.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // Tiempo de espera de 2 minutos
);
// Devuelve: Promise<string>
```

#### `acpManager.kill(sessionId)`

Finaliza una sesión y libera sus recursos.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Devuelve: boolean
```

#### `acpManager.getActiveSessions()`

Obtiene todas las sesiones activas.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Devuelve: AcpSession[]
```

#### `acpManager.killAll()`

Finaliza todas las sesiones.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interfaz de sesión

```typescript
interface AcpSession {
  id: string; // ID único de la sesión
  agentId: string; // ID del agente (p. ej., "claude")
  process: ChildProcess; // Identificador del proceso secundario
  alive: boolean; // Indica si el proceso está activo
  stdoutBuffer: string; // Búfer acumulado de stdout
  stderrBuffer: string; // Búfer acumulado de stderr
  createdAt: Date; // Marca de tiempo de creación
}
```

### Eventos

`AcpManager` extiende `EventEmitter` y emite los siguientes eventos:

#### `stdout`

Se emite cuando el agente de CLI escribe en stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Se emite cuando el agente de CLI escribe en stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Se emite cuando finaliza el proceso del agente de CLI.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Se emite cuando se produce un error en el proceso del agente de CLI.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Configuración

### Variables de entorno

ACP hereda todas las variables de entorno del proceso principal y puede ampliarse con variables de entorno personalizadas:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumentos de inicio

Cada agente tiene argumentos de inicio predeterminados definidos en el registro. Puede sobrescribirlos:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Tiempos de espera

El tiempo de espera predeterminado de las solicitudes es de **120 segundos** (2 minutos). Puede sobrescribirlo:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutos
```

### Caché de detección

La detección de agentes se almacena en caché durante **60 segundos** para evitar análisis costosos del sistema de archivos. Para forzar una actualización:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Seguridad

### Prevención de inyección de comandos

ACP valida los comandos de versión para prevenir ataques de inyección de comandos:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Los comandos de versión que contienen estos caracteres se rechazan:

- `;` — Separador de comandos
- `&` — Proceso en segundo plano
- `|` — Tubería
- `<`, `>` — Redirección
- `` ` `` — Sustitución de comandos
- `$` — Expansión de variables
- `\r`, `\n` — Saltos de línea

### Validación del nombre del binario

ACP valida que el binario del comando de versión coincida con el nombre de binario esperado (a menos que sea un agente personalizado).

### Aislamiento de procesos

Cada sesión de ACP se ejecuta en su propio proceso secundario. El proceso finaliza cuando termina la sesión o se agota el tiempo de espera.

---

## Rendimiento

### Rendimiento de la detección

- **Primera llamada**: ~50-200ms (ejecuta el comando `version` para cada agente)
- **Llamadas almacenadas en caché**: <1ms (devuelve el resultado desde la caché)
- **TTL de la caché**: 60 segundos

### Rendimiento de las solicitudes

- **Inicio**: ~50-100ms
- **Envío de la solicitud**: ~10-50ms
- **Espera de la respuesta**: Depende del agente de CLI (normalmente entre 1 y 30 segundos)
- **Finalización**: ~5 segundos (SIGTERM) + inmediata (SIGKILL)

### Uso de recursos

- **Memoria por sesión**: ~10-50MB (depende del agente de CLI)
- **CPU**: Mínimo (limitado por E/S)
- **Disco**: Ninguno

---

## Solución de problemas

### Error "Unknown agent"

**Problema**: `acpManager.spawn()` genera `Unknown agent: <id>`

**Solución**: Solo se permiten estos agentes en `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Los demás agentes deben iniciarse manualmente o mediante definiciones de agentes personalizados.

### Error "Session not alive"

**Problema**: `acpManager.sendPrompt()` genera `Session ${sessionId} is not alive`

**Solución**: Es posible que la sesión haya finalizado o se haya cerrado. Compruebe el estado de la sesión:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Volver a iniciar la sesión
  acpManager.spawn("claude", "claude", [], {});
}
```

### Error "ACP timeout"

**Problema**: `acpManager.sendPrompt()` genera `ACP timeout after 120000ms`

**Solución**: Aumente el tiempo de espera:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutos
```

### CLI no detectada

**Problema**: `detectInstalledAgents()` no encuentra su CLI

**Soluciones**:

1. **Compruebe PATH**: Asegúrese de que la CLI esté en la variable PATH de su sistema
2. **Compruebe el comando de versión**: Ejecute `claude --version` manualmente
3. **Compruebe los permisos**: Asegúrese de que la CLI sea ejecutable
4. **Agente personalizado**: Añada una definición de agente personalizado para las CLI no estándar

### Permiso denegado

**Problema**: ACP no puede ejecutar la CLI

**Soluciones**:

1. **Compruebe los permisos del archivo**: `chmod +x /usr/local/bin/claude`
2. **Compruebe la propiedad**: Asegúrese de que OmniRoute tenga permisos de lectura y ejecución
3. **Compruebe SELinux/AppArmor**: Pueden bloquear el inicio de procesos

---

## Ejemplos

### Ejemplo 1: Iniciar y usar Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Detectar los agentes instalados
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Iniciar una nueva sesión
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Enviar una instrucción
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Limpiar
  acpManager.kill(session.id);
}
```

### Ejemplo 2: Detección automática con alternativa

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Probar primero Claude y, como alternativa, Codex
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### Ejemplo 3: Agente personalizado

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Registrar un agente CLI personalizado
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// Ahora detectInstalledAgents() incluirá "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## ¿Qué sigue?

- **[Referencia de la API](../reference/API_REFERENCE.md)** — Endpoints de la API REST
- **[Referencia de proveedores](../reference/PROVIDER_REFERENCE.md)** — Los 352 proveedores
- **[Servidor MCP](./MCP-SERVER.md)** — Integración con Model Context Protocol
- **[Servidor A2A](./A2A-SERVER.md)** — Protocolo de agente a agente
- **[Agente en la nube](./CLOUD_AGENT.md)** — Agentes basados en la nube

---

## Referencia

- [Proyecto AionUi](https://github.com/iOfficeAI/AionUi) — Inspiración para la detección automática de ACP
- [Código fuente de ACP](../../src/lib/acp/) — Detalles de implementación
  - `manager.ts` — Gestión del ciclo de vida de los procesos
  - `registry.ts` — Detección y registro de agentes
  - `index.ts` — Exportaciones de la API pública
