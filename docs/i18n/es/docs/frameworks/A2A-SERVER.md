# OmniRoute A2A Server Documentation (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute como agente de enrutamiento inteligente

La superficie A2A tiene dos interfaces:

- **JSON-RPC 2.0** en `POST /a2a` (punto de entrada canónico, definido en `src/app/a2a/route.ts`).
- **REST** bajo `/api/a2a/*` para paneles y herramientas (estado, lista de tareas, cancelación).

Las tareas son gestionadas por `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, TTL predeterminado de 5 minutos). Las habilidades se despachan mediante `A2A_SKILL_HANDLERS` en `src/lib/a2a/taskExecution.ts`.

## Descubrimiento del agente

```bash
curl http://localhost:20128/.well-known/agent.json
```

Devuelve la tarjeta del agente que describe las capacidades, habilidades y requisitos de autenticación de OmniRoute.

El campo `version` de la tarjeta del agente se obtiene de `process.env.npm_package_version` (consulte `src/app/.well-known/agent.json/route.ts:13`), por lo que se mantiene sincronizado automáticamente con `package.json` en cada versión.

---

## Autenticación

Todas las solicitudes a `/a2a` requieren una clave de API mediante el encabezado `Authorization`:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

Si no hay ninguna clave de API configurada en el servidor, se omite la autenticación.

## Habilitación

A2A se controla mediante el interruptor **Endpoints → A2A** y está deshabilitado de forma predeterminada. Cuando está deshabilitado,
`GET /api/a2a/status` informa de `status: "disabled"` y `online: false`; las llamadas JSON-RPC a
`POST /a2a` devuelven HTTP 503 con el código de error JSON-RPC `-32000`.

---

## Métodos JSON-RPC 2.0

### `message/send` — Ejecución síncrona

Envía un mensaje a una habilidad y espera la respuesta completa.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**Respuesta:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — Transmisión mediante SSE

Igual que `message/send`, pero devuelve eventos enviados por el servidor para la transmisión en tiempo real.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**Eventos SSE:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Consultar el estado de una tarea

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Cancelar una tarea

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Habilidades disponibles

OmniRoute expone 6 habilidades A2A conectadas en `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Cada módulo de habilidad se encuentra en `src/lib/a2a/skills/`.

| Habilidad                     | ID                   | Descripción                                                                                                                                                                                      | Etiquetas                             | Ejemplos                                      |
| :---------------------------- | :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ | :-------------------------------------------- |
| Enrutamiento inteligente      | `smart-routing`      | Enruta un prompt a través del proveedor/combinación óptimos mediante el motor de combinaciones y el sistema de puntuación de OmniRoute                                                           | enrutamiento, proveedores             | "Enruta este prompt mediante el mejor modelo" |
| Gestión de cuotas             | `quota-management`   | Informa del estado de las cuotas por proveedor y ayuda a quienes realizan llamadas a decidir cuándo limitar el uso o cambiar de proveedor                                                        | cuotas, proveedores                   | "Comprueba la cuota de anthropic"             |
| Descubrimiento de proveedores | `provider-discovery` | Enumera los proveedores instalados junto con sus capacidades, indicadores de nivel gratuito y estado de OAuth                                                                                    | proveedores, descubrimiento           | "¿Qué proveedores están disponibles?"         |
| Análisis de costes            | `cost-analysis`      | Estima el coste de una solicitud o conversación a partir del catálogo y del uso reciente                                                                                                         | costes, uso                           | "Estima el coste de esta conversación"        |
| Informe de estado             | `health-report`      | Agrega el estado del disyuntor, el período de espera y el bloqueo de cada proveedor                                                                                                              | estado, resiliencia                   | "Muestra el estado de todos los proveedores"  |
| Enumeración de capacidades    | `list-capabilities`  | Devuelve el catálogo completo de 45 entradas de Agent Skills (23 de API + 21 de CLI + 1 de configuración) como una tabla markdown con URL de SKILL.md sin procesar para la inyección de contexto | catálogo, descubrimiento, habilidades | "Enumera todas las capacidades de OmniRoute"  |

> La tarjeta del agente debe mantenerse sincronizada con el catálogo activo de 352 proveedores; los recuentos de proveedores y los metadatos de acceso gratuito/sin autenticación proceden del registro en tiempo de ejecución.

### Detalles de la habilidad `list-capabilities`

La habilidad `list-capabilities` resulta especialmente útil para agentes externos que necesitan descubrir qué expone OmniRoute antes de enviar llamadas a la API. Devuelve un artefacto de tabla markdown estructurada:

```
| ID | Nombre | Categoría | Área | Endpoints/Comandos | URL sin procesar |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Autenticación y sesiones | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

Cada fila incluye la columna `rawUrl` para que los agentes puedan obtener inmediatamente el archivo SKILL.md completo. El campo `metadata.totalSkills` refleja el tamaño del catálogo (actualmente 45). Implementación: `src/lib/a2a/skills/listCapabilities.ts`. Véase también [AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## API REST (auxiliar)

El endpoint JSON-RPC `/a2a` es el punto de entrada canónico de A2A. Los siguientes endpoints REST proporcionan acceso auxiliar para paneles y herramientas externas:

| Endpoint                     | Método | Descripción                                                         | Autenticación                                      |
| :--------------------------- | :----- | :------------------------------------------------------------------ | :------------------------------------------------- |
| `/api/a2a/status`            | GET    | Estado del servidor, habilidades registradas                        | (público)                                          |
| `/api/a2a/tasks`             | GET    | Lista de tareas con filtros                                         | administración                                     |
| `/api/a2a/tasks/[id]`        | GET    | Obtener tarea por ID                                                | administración                                     |
| `/api/a2a/tasks/[id]/cancel` | POST   | Cancelar una tarea en ejecución                                     | administración                                     |
| `/.well-known/agent.json`    | GET    | Tarjeta del agente (descubrimiento A2A)                             | (público, almacenado en caché durante 3600s)       |
| `/api/a2a/tasks`             | POST   | Delegación entrante a la flota de OmniConductor (Conductor PRD RF5) | Bearer frente a `OMNIROUTE_API_KEY` + `a2aEnabled` |

**Delegación entrante de Conductor (`POST /api/a2a/tasks`):** los agentes A2A externos delegan trabajo de programación a la flota de OmniConductor a través de OmniRoute. Cuerpo: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — solo se pueden delegar las habilidades de la flota de Conductor (las anunciadas en la tarjeta del agente); `metadata.conductor.repo.url` es obligatorio (la flota trabaja con repositorios git). La ruta se traduce al `POST /v1/tasks` del hub mediante el `CONDUCTOR_ORCHESTRATOR_TOKEN` del lado del servidor (con `CONDUCTOR_HUB_TOKEN` como alternativa) y devuelve `201 { conductor_task_id, state: "submitted" }`; los estados de las tareas se transmiten de vuelta mediante el reflejo SSE→A2A (RF1) y son visibles a través de `GET /api/a2a/tasks?skill=conductor`.

---

## Añadir una nueva habilidad

1. **Cree el archivo de la habilidad:** `src/lib/a2a/skills/<your-skill>.ts`

   Exporte una función asíncrona `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Siga la estructura de habilidades existentes como `smartRouting.ts`.

2. **Registre el controlador:** en `src/lib/a2a/taskExecution.ts`, añada una entrada a `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...habilidades existentes
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Expóngala en la tarjeta del agente:** en `src/app/.well-known/agent.json/route.ts`, añádala al array `skills`:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Escriba pruebas:** `tests/unit/a2a-<your-skill>.test.ts`. Cubra el caso exitoso y el caso de error.

5. **Documente** la nueva habilidad en la tabla `Available Skills` de este archivo.

---

## TTL de las tareas

Las tareas caducan después de `ttlMinutes` (5 min de forma predeterminada), configurado en el constructor de `A2ATaskManager` en `src/lib/a2a/taskManager.ts:82`. Para personalizarlo, bifurque la instanciación de `A2ATaskManager` y pase un valor diferente (p. ej., `new A2ATaskManager(15)` para un TTL de 15 minutos). Un intervalo en segundo plano elimina las tareas caducadas cada 60 segundos.

---

## Ciclo de vida de las tareas

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Las tareas caducan después de 5 minutos de forma predeterminada (consulte [TTL de las tareas](#task-ttl))
- Estados terminales: `completed`, `failed`, `cancelled`
- El registro de eventos realiza un seguimiento de cada transición de estado

---

## Códigos de error

| Código | Significado                         |
| :----- | :---------------------------------- |
| -32700 | Error de análisis (JSON no válido)  |
| -32600 | Solicitud no válida / No autorizado |
| -32601 | Método o skill no encontrado        |
| -32602 | Parámetros no válidos               |
| -32603 | Error interno                       |
| -32000 | El endpoint A2A está deshabilitado  |

---

## Ejemplos de integración

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
