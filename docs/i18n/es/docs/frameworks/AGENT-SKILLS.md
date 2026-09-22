# OmniRoute Agent Skills Catalog (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Fuente de referencia:** `src/lib/agentSkills/` (catálogo, generador, analizadores) + directorio `skills/` (archivos SKILL.md)
> **Última actualización:** 2026-08-02 — v3.8.50

Las Agent Skills son archivos SKILL.md estructurados que enseñan a agentes externos, clientes MCP y orquestadores A2A a utilizar la API REST y la CLI de OmniRoute. A diferencia de las [Omni Skills](./SKILLS.md) (que son definiciones de herramientas de LLM ejecutadas dentro de OmniRoute), las Agent Skills son un _catálogo de documentación_: markdown estático que puede incorporarse directamente al contexto de un agente.

---

## Descripción general

El catálogo contiene **45 Agent Skills** (23 de la API REST + 21 de la CLI + 1 flujo de trabajo de configuración). Cada skill tiene:

- Un **ID canónico** (`omni-auth`, `cli-serve`, etc.)
- Un archivo **SKILL.md** en `skills/{id}/SKILL.md` con frontmatter YAML (`name`, `description`) + un cuerpo markdown detallado
- **Endpoints REST** (skills de la API) o **subcomandos de la CLI** (skills de la CLI) derivados de la especificación OpenAPI y del registro de la CLI
- Una **URL sin procesar de GitHub** para obtener el contenido en tiempo real: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Arquitectura

```
src/shared/constants/agentSkills.ts    — Lista seleccionada de 45 entradas (nombre/descripción/categoría/área/icono)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() escribe SKILL.md en skills/{id}/
  openapiParser.ts                     — Extrae endpoints REST de docs/openapi.yaml
  cliRegistryParser.ts                 — Extrae subcomandos de la CLI de bin/cli-registry.ts
  schemas.ts                           — Esquemas de Zod: AgentSkillSchema, SkillCoverageSchema, etc.
  types.ts                             — Interfaces de TypeScript: AgentSkill, SkillCoverage, etc.

skills/{id}/SKILL.md                   — Archivos markdown generados + seleccionados (45 en total)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (requiere autenticación)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 herramientas MCP (listar, obtener, cobertura)
src/lib/a2a/skills/listCapabilities.ts        — Skill A2A: list-capabilities
```

---

## Formato de SKILL.md

```markdown
---
name: omni-providers
description: "Gestiona las conexiones con proveedores: añade, prueba, rota y elimina credenciales."
---

<!-- generado por src/lib/agentSkills/generator.ts; las ediciones manuales se sobrescribirán -->

## Descripción general

...

## Autenticación

...

## Endpoints

...

<!-- skill:custom-start -->

## Sección personalizada (se conserva entre regeneraciones)

...

<!-- skill:custom-end -->
```

El generador conserva el contenido situado entre `<!-- skill:custom-start -->` y `<!-- skill:custom-end -->` durante la regeneración. Diez skills tienen bloques personalizados seleccionados manualmente:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Descubrimiento de la API REST

| Endpoint                     | Método | Descripción                                                           | Autenticación  |
| :--------------------------- | :----- | :-------------------------------------------------------------------- | :------------- |
| `/api/agent-skills`          | GET    | Lista el catálogo (`?category=api\|cli\|config&area=<area>` opcional) | ninguna        |
| `/api/agent-skills/{id}`     | GET    | Obtiene los metadatos de una habilidad                                | ninguna        |
| `/api/agent-skills/{id}/raw` | GET    | Obtiene SKILL.md como `text/markdown`                                 | ninguna        |
| `/api/agent-skills/coverage` | GET    | Estadísticas de cobertura (cuántos archivos SKILL.md existen)         | ninguna        |
| `/api/agent-skills/generate` | POST   | Activa el generador (dryRun/prune/onlyIds)                            | administración |

Ejemplo — listar todas las habilidades de API:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Ejemplo — obtener un único SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Descubrimiento de MCP

Hay tres herramientas MCP registradas en el ámbito `read:catalog`:

| Herramienta                       | Descripción                                                        |
| :-------------------------------- | :----------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Lista las habilidades (filtros `category` / `area` opcionales)     |
| `omniroute_agent_skills_get`      | Obtiene los metadatos y SKILL.md de una habilidad mediante su `id` |
| `omniroute_agent_skills_coverage` | Estadísticas de cobertura (API/CLI disponibles/totales)            |

Consulte [MCP-SERVER.md](./MCP-SERVER.md) para obtener información sobre la configuración de ámbitos y la autenticación.

---

## Descubrimiento de A2A

La habilidad A2A `list-capabilities` devuelve el catálogo completo de 45 habilidades como un artefacto de tabla en markdown. Los orquestadores externos pueden invocarla mediante:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "skill": "list-capabilities",
    "messages": [{ "role": "user", "content": "List all capabilities" }]
  }
}
```

Consulte [A2A-SERVER.md](./A2A-SERVER.md) para obtener información sobre el protocolo.

---

## Catálogo — 45 ID de habilidades

### Habilidades de API (23)

| ID                     | Área            | Punto de entrada                               |
| :--------------------- | :-------------- | :--------------------------------------------- |
| `omni-auth`            | auth            | Gestión de autenticación y sesiones            |
| `omni-providers`       | providers       | Gestión de conexiones de proveedores           |
| `omni-models`          | models          | Catálogo de modelos y capacidades              |
| `omni-combos-routing`  | combos-routing  | Estrategias de enrutamiento de combinaciones   |
| `omni-api-keys`        | api-keys        | Gestión de claves de API                       |
| `omni-usage-logs`      | usage-logs      | Registros de uso y costes                      |
| `omni-budget`          | budget          | Controles de presupuesto                       |
| `omni-settings`        | settings        | Configuración global                           |
| `omni-proxies`         | proxies         | Gestión del conjunto de proxies                |
| `omni-cache`           | cache           | Caché semántica y de prompts                   |
| `omni-compression`     | compression     | Motores de compresión de contexto              |
| `omni-context-rtk`     | context-rtk     | Compresión RTK                                 |
| `omni-resilience`      | resilience      | Disyuntores y tiempos de espera                |
| `omni-cli-tools`       | cli-tools       | Proxy REST para herramientas de CLI            |
| `omni-tunnels`         | tunnels         | Gestión de túneles                             |
| `omni-sync-cloud`      | sync-cloud      | Sincronización con la nube                     |
| `omni-db-backups`      | db-backups      | Copias de seguridad de bases de datos          |
| `omni-webhooks`        | webhooks        | Distribuidor de eventos de webhook             |
| `omni-mcp`             | mcp             | Servidor MCP (110 herramientas, 3 transportes) |
| `omni-agents-a2a`      | agents-a2a      | Protocolo de agentes A2A                       |
| `omni-version-manager` | version-manager | Gestión de versiones y actualizaciones         |
| `omni-inference`       | inference       | Inferencia directa / completados               |

### Habilidades de CLI (21)

| ID                    | Área               | Comando raíz de CLI     |
| :-------------------- | :----------------- | :---------------------- |
| `cli-serve`           | cli-serve          | `omniroute serve`       |
| `cli-health`          | cli-health         | `omniroute health`      |
| `cli-providers`       | cli-providers      | `omniroute providers`   |
| `cli-keys`            | cli-keys           | `omniroute keys`        |
| `cli-models`          | cli-models         | `omniroute models`      |
| `cli-chat`            | cli-chat           | `omniroute chat`        |
| `cli-routing`         | cli-routing        | `omniroute routing`     |
| `cli-resilience`      | cli-resilience     | `omniroute resilience`  |
| `cli-compression`     | cli-compression    | `omniroute compression` |
| `cli-contexts`        | cli-contexts       | `omniroute contexts`    |
| `cli-cost-usage`      | cli-cost-usage     | `omniroute cost`        |
| `cli-mcp`             | cli-mcp            | `omniroute mcp`         |
| `cli-a2a`             | cli-a2a            | `omniroute a2a`         |
| `cli-tunnel`          | cli-tunnel         | `omniroute tunnel`      |
| `cli-backup-sync`     | cli-backup-sync    | `omniroute backup`      |
| `cli-policy-audit`    | cli-policy-audit   | `omniroute policy`      |
| `cli-batches`         | cli-batches        | `omniroute batch`       |
| `cli-eval`            | cli-eval           | `omniroute eval`        |
| `cli-plugins-skills`  | cli-plugins-skills | `omniroute plugins`     |
| `cli-setup`           | cli-setup          | `omniroute setup`       |
| `cli-skill-collector` | cli-setup          | `omniroute skills`      |

### Flujo de trabajo de configuración (1)

| ID                 | Área             | Punto de entrada                       |
| :----------------- | :--------------- | :------------------------------------- |
| `config-codex-cli` | config-codex-cli | Flujo de configuración de la CLI Codex |

---

## Cómo consumen habilidades los agentes externos

### 1. Descubrimiento mediante REST

```bash
# Obtener el catálogo completo
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Obtener SKILL.md para la inyección de contexto
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Descubrimiento mediante MCP

```typescript
// En un cliente MCP de Claude Desktop / Cursor:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → matriz de AgentSkill con rawUrl para cada elemento
```

### 3. Descubrimiento mediante A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table es una tabla de Markdown con los 45 ID de habilidades y las columnas rawUrl
```

### 4. Obtención directa del contenido sin procesar desde GitHub (no requiere servidor)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generador

El generador lee el catálogo seleccionado + la especificación OpenAPI + el registro de la CLI y escribe `skills/{id}/SKILL.md` para cada entrada:

```bash
# Vista previa (ejecución de prueba, sin escritura)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Regeneración completa
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Regenerar ID específicos
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

La respuesta del generador es un `GeneratorReport`:

```json
{
  "generated": ["omni-providers", "cli-serve"],
  "unchanged": [],
  "pruned": [],
  "orphansDetected": [],
  "errors": []
}
```

---

## API de cobertura

```bash
curl "http://localhost:20128/api/agent-skills/coverage"
```

```json
{
  "api": { "have": 23, "total": 23 },
  "cli": { "have": 21, "total": 21 },
  "config": { "have": 1, "total": 1 },
  "totalSkills": 45,
  "generatedAt": "2026-08-02T00:00:00.000Z"
}
```

---

## Recursos relacionados

- [SKILLS.md](./SKILLS.md) — Framework Omni Skills (inyección de herramientas para LLM + marketplace)
- [MCP-SERVER.md](./MCP-SERVER.md) — Catálogo de herramientas MCP (herramientas `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — Protocolo A2A (habilidad `list-capabilities`)
- `src/lib/agentSkills/` — catálogo, generador y analizadores
- `skills/` — archivos SKILL.md generados (45 entradas)
