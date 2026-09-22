# Cloud Agents (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Fuente de referencia:** `src/lib/cloudAgent/` y `src/app/api/v1/agents/tasks/`
> **Última actualización:** 2026-06-28 — v3.8.40 (actualización del frontmatter; 4 agentes, incluido cursor-cloud)

OmniRoute orquesta agentes de programación de terceros alojados en la nube (Codex Cloud, Cursor,
Devin, Jules) como tareas de larga duración. Cada agente está encapsulado tras una interfaz uniforme para que
los clientes puedan enviar un prompt + la URL de un repositorio y recibir resultados sin tener que lidiar con
las API específicas de cada proveedor.

Una tarea de Cloud Agent **no** es una finalización de chat convencional. Es una unidad de trabajo
duradera y de varios pasos que puede tardar de minutos a horas, puede generar una Pull Request como
artefacto y admite mensajes de seguimiento y (en algunos proveedores) controles de aprobación del plan.

![Ciclo de vida de una tarea de Cloud Agent](../diagrams/exported/cloud-agent-flow.svg)

> Fuente: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Agentes compatibles

| ID del proveedor | Clase              | Fuente                                | URL base del servicio externo           | Aprobación del plan |
| ---------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------- |
| `jules`          | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Sí                  |
| `devin`          | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Sí                  |
| `codex-cloud`    | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | No (automática)     |
| `cursor-cloud`   | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | No (automática)     |

Registro: `src/lib/cloudAgent/registry.ts` — exporta `getAgent(providerId)`,
`getAvailableAgents()` e `isCloudAgentProvider(providerId)`. El registro es un
`Record<string, CloudAgentBase>` sencillo en memoria que se rellena al cargar el módulo.

## Arquitectura

```
Cliente (panel de control / CLI / API)
  → POST /api/v1/agents/tasks (se requiere autenticación de administración)
    → validación de CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ obtiene los datos de getProviderConnections({ provider, isActive: true })
         (primero apiKey; si no está disponible, usa accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ solicitud HTTP POST a la API del proveedor externo
      └─ devuelve CloudAgentTask con id interno + externalId
    → insertCloudAgentTask(...) en cloud_agent_tasks (SQLite)

Sondeo (sincronización diferida durante la lectura):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // actualiza el estado + las actividades
    → updateCloudAgentTask(...) con el nuevo estado, resultado y completed_at
    → devuelve la tarea serializada

Interacciones:
  POST /api/v1/agents/tasks/[id]  cuerpo: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        para "approve"
    → agent.sendMessage(externalId, message, credentials) para "message"
    → el estado cambia a "cancelled"                    para "cancel" (solo local)
```

La sincronización es **diferida**: el estado se actualiza desde el servicio externo con cada
`GET /tasks/[id]`. No hay ningún proceso de sondeo en segundo plano. Los paneles de control que
necesiten un estado actualizado deben sondear el endpoint GET a intervalos razonables.

## Interfaz `CloudAgentBase`

Fuente: `src/lib/cloudAgent/baseAgent.ts`

```typescript
export interface AgentCredentials {
  apiKey: string;
  baseUrl?: string;
}

export interface CreateTaskParams {
  prompt: string;
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
}

export interface GetStatusResult {
  status: CloudAgentStatus;
  externalId?: string;
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
}

export abstract class CloudAgentBase {
  abstract readonly providerId: string;
  abstract readonly baseUrl: string;

  abstract createTask(p: CreateTaskParams, c: AgentCredentials): Promise<CloudAgentTask>;
  abstract getStatus(externalId: string, c: AgentCredentials): Promise<GetStatusResult>;
  abstract approvePlan(externalId: string, c: AgentCredentials): Promise<void>;
  abstract sendMessage(
    externalId: string,
    message: string,
    c: AgentCredentials
  ): Promise<CloudAgentActivity>;
  abstract listSources(
    c: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]>;

  protected mapStatus(raw: string): CloudAgentStatus; // cadena del proveedor heurística → enumeración
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` lanza una excepción intencionadamente: Codex Cloud genera planes automáticamente y no tiene
ninguna puerta de aprobación. `CodexCloudAgent.listSources` devuelve `[]`.

`CursorCloudAgent` controla los agentes Background / Cloud de Cursor mediante su API REST
oficial (`api.cursor.com/v0`) con una **clave de API de usuario o de cuenta de servicio**: la alternativa propia,
más segura, a reutilizar la sesión OAuth del IDE de Cursor (proveedor `cursor`,
que incluye una advertencia de riesgo de bloqueo). Es un adaptador REST sencillo (sin dependencia nativa
de `@cursor/sdk`). `approvePlan` lanza una excepción (los agentes de Cursor se ejecutan de forma autónoma); `listSources` enumera
los repositorios accesibles mediante la clave. Cursor devuelve enumeraciones de estado en MAYÚSCULAS
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), que se asignan explícitamente al
`CloudAgentStatus` compartido. `baseUrl` se puede sobrescribir para cada credencial, de modo que la versión/ruta de la API pueda
corregirse sin modificar el código.

## Tipos de dominio

Fuente: `src/lib/cloudAgent/types.ts`

```typescript
export const CLOUD_AGENT_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  AWAITING_APPROVAL: "awaiting_approval",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

export interface CloudAgentSource {
  repoName: string;
  repoUrl: string; // debe ser una URL válida
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // segundos, entero positivo
  cost?: number; // número de punto flotante positivo
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // id interno `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // id del proveedor externo
  status: CloudAgentStatus;
  prompt: string; // 1..10000 caracteres
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

Los esquemas de validación (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) se
exportan junto con los tipos y son utilizados por los controladores de rutas.

## Base de datos

Fuente: `src/lib/cloudAgent/db.ts` — la tabla se crea de forma diferida mediante
`createCloudAgentTaskTable()` (también se invoca desde `src/lib/cloudAgent/index.ts` al
importar el módulo).

```sql
CREATE TABLE IF NOT EXISTS cloud_agent_tasks (
  id           TEXT PRIMARY KEY,
  provider_id  TEXT NOT NULL,
  external_id  TEXT,
  status       TEXT NOT NULL DEFAULT 'queued',
  prompt       TEXT NOT NULL,
  source       TEXT NOT NULL,             -- JSON
  options      TEXT DEFAULT '{}',         -- JSON
  result       TEXT,                       -- JSON
  activities   TEXT DEFAULT '[]',          -- JSON
  error        TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_provider ON cloud_agent_tasks(provider_id);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_status   ON cloud_agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_created  ON cloud_agent_tasks(created_at DESC);
```

`updateCloudAgentTask` aplica una **lista blanca de columnas** para evitar la inyección SQL:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Cualquier otra clave incluida en la actualización parcial se descarta silenciosamente.

## API REST — Ciclo de vida de las tareas

**Autenticación:** Todos los endpoints `/api/v1/agents/tasks*` requieren **autenticación de administración**
(`requireCloudAgentManagementAuth` envuelve `requireManagementAuth` de
`src/lib/api/requireManagementAuth`). Esto se aplica desde el commit `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Método  | Ruta                          | Propósito                                                                         |
| ------- | ----------------------------- | --------------------------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | Solicitud preliminar de CORS                                                      |
| GET     | `/api/v1/agents/tasks`        | Enumerar tareas (filtros: `provider`, `status`, `limit≤500`)                      |
| POST    | `/api/v1/agents/tasks`        | Crear una tarea (la envía al proveedor y la guarda)                               |
| DELETE  | `/api/v1/agents/tasks?id=...` | Eliminar una tarea mediante el id de consulta (**no** la cancela en el proveedor) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Solicitud preliminar de CORS                                                      |
| GET     | `/api/v1/agents/tasks/[id]`   | Leer la tarea y sincronizar de forma diferida su estado desde el proveedor        |
| POST    | `/api/v1/agents/tasks/[id]`   | Acción: `approve` / `message` / `cancel`                                          |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Eliminar una tarea mediante el id de la ruta                                      |

### Crear una tarea

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "devin",
    "prompt": "Fix the bug in src/foo.ts where the parser returns null",
    "source": {
      "repoName": "user/repo",
      "repoUrl": "https://github.com/user/repo",
      "branch": "main"
    },
    "options": {
      "autoCreatePr": true,
      "planApprovalRequired": false
    }
  }'
```

Respuesta `201`:

```json
{
  "data": {
    "id": "task_1731512345678_abc123def",
    "providerId": "devin",
    "externalId": "session_xyz",
    "status": "queued",
    "prompt": "...",
    "source": { "repoName": "user/repo", "repoUrl": "...", "branch": "main" },
    "options": { "autoCreatePr": true },
    "createdAt": "2026-05-13T12:34:56.789Z"
  }
}
```

### Aprobar un plan

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Enviar un mensaje de seguimiento

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Cancelar (solo el estado local)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` cambia `status` a `"cancelled"` en la base de datos local, pero **no** llama al
proveedor externo; no existe ninguna RPC de cancelación en `CloudAgentBase`. Para detener la facturación
del proveedor, finalice la tarea en la propia consola del proveedor.

## API REST — Infraestructura de proveedores en la nube

Estos endpoints auxiliares ubicados en `src/app/api/cloud/` son utilizados por clientes remotos
(la CLI, la aplicación Electron o los workers de sincronización) para leer los metadatos de conexión
del proveedor y resolver alias de modelos. Se autentican con una **clave de API normal**
(mediante `validateApiKey`), no con la autenticación de administración utilizada por los endpoints de tareas.

| Método | Ruta                            | Propósito                                                                                    |
| ------ | ------------------------------- | -------------------------------------------------------------------------------------------- |
| POST   | `/api/cloud/auth`               | Validar la clave de API y devolver metadatos de conexión enmascarados + alias de modelos     |
| PUT    | `/api/cloud/credentials/update` | Actualizar `accessToken` / `refreshToken` / `expiresAt`                                      |
| POST   | `/api/cloud/model/resolve`      | Resolver un alias de modelo como `{ provider, model }`                                       |
| GET    | `/api/cloud/models/alias`       | Enumerar todos los alias de modelos                                                          |
| PUT    | `/api/cloud/models/alias`       | Establecer un alias de modelo (y sincronizarlo automáticamente con Cloud si está habilitado) |

`/api/cloud/auth` nunca devuelve `apiKey` / `accessToken` / `refreshToken` sin procesar. Devuelve
`hasApiKey`, `hasAccessToken`, `hasRefreshToken` y una vista previa enmascarada
(`maskedApiKey`: primeros 4 + `****` + últimos 4).

## Resolución de credenciales

`getCloudAgentCredentials(providerId)` en `src/lib/cloudAgent/api.ts`:

1. Carga las conexiones activas de proveedores mediante `getProviderConnections({ provider: providerId, isActive: true })`.
2. Para cada conexión, prioriza `apiKey` (sin espacios al principio ni al final). Si no está disponible, utiliza `accessToken`.
3. Devuelve el primer token no vacío encapsulado como `{ apiKey: token }`.
4. Devuelve `null` si no se encuentra ningún token utilizable; la API responde con `400` y
   `"No hay credenciales activas configuradas para el proveedor de agentes en la nube: <id>"`.

Esto significa que los agentes en la nube reutilizan la misma tabla de conexiones de proveedores que los proveedores
de LLM normales. Para habilitar Jules, cree una conexión activa con `provider: "jules"`
y un `apiKey` con un valor asignado.

## Panel de control

Fuente: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Una página de React con `"use client"` que:

- Enumera las tareas (consultadas periódicamente mediante `GET /api/v1/agents/tasks`).
- Envía nuevas tareas mediante un formulario que se asigna a `CreateCloudAgentTaskSchema`.
- Muestra insignias de estado (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) y renderiza la cronología de `activities[]`.
- Muestra `result.prUrl` / `commitMessage` / `summary` cuando `status === "completed"`.

## Integración con A2A

Los agentes en la nube pueden exponerse como habilidades A2A registrando una habilidad A2A que delegue
su controlador `tasks/send` en `getAgent(...).createTask(...)` y traduzca los eventos de estado de las tareas A2A
al protocolo JSON-RPC 2.0. Consulte [A2A-SERVER.md](./A2A-SERVER.md).

## Añadir un nuevo agente en la nube

1. Cree `src/lib/cloudAgent/agents/<name>.ts` extendiendo `CloudAgentBase`.
2. Implemente `createTask`, `getStatus`, `approvePlan` (o lance una excepción si no corresponde),
   `sendMessage`, `listSources`. Utilice `this.mapStatus(...)` para normalizar el estado.
3. Regístrelo en `src/lib/cloudAgent/registry.ts` con un `providerId` estable.
4. Amplíe la unión de literales de `providerId` en `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` y `CreateCloudAgentTaskSchema`).
5. Añada el proveedor a `src/shared/constants/providers.ts` si necesita un registro de conexión.
   Los proveedores basados en OAuth también necesitan `src/lib/oauth/providers/`.
6. Añada pruebas en `tests/unit/cloud-agent-*.test.ts`.
7. Actualice este documento y la constante `CLOUD_AGENTS` del panel de control.

## Configuración

| Variable de entorno | Propósito                                                                       |
| ------------------- | ------------------------------------------------------------------------------- |
| `DATA_DIR`          | Ubicación de la base de datos SQLite que contiene `cloud_agent_tasks`           |
| `JWT_SECRET`        | Necesaria para la autenticación de administración en los endpoints de tareas    |
| `API_KEY_SECRET`    | Necesaria para cifrar en reposo las credenciales de conexión de los proveedores |

Actualmente no existen variables de entorno específicas de Cloud-Agent: todos los secretos se almacenan en la tabla
`provider_connections`.

## Véase también

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Código fuente: `src/lib/cloudAgent/`
- Rutas: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Panel de control: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
