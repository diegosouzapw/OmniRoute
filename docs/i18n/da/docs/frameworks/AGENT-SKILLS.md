# OmniRoute Agent Skills Catalog (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Sandhedskilde:** `src/lib/agentSkills/` (katalog, generator, parsere) + mappen `skills/` (SKILL.md-filer)
> **Senest opdateret:** 2026-08-02 — v3.8.50

Agent Skills er strukturerede SKILL.md-filer, der lærer eksterne agenter, MCP-klienter og A2A-orkestratorer, hvordan de bruger OmniRoutes REST API og CLI. I modsætning til [Omni Skills](./SKILLS.md) (som er LLM-værktøjsdefinitioner, der afvikles inde i OmniRoute), er Agent Skills et _dokumentationskatalog_ — statisk markdown, der kan føres direkte ind i en agents kontekst.

---

## Oversigt

Kataloget indeholder **45 Agent Skills** (23 REST API + 21 CLI + 1 konfigurationsworkflow). Hver skill har:

- Et **kanonisk ID** (`omni-auth`, `cli-serve` osv.)
- En **SKILL.md**-fil i `skills/{id}/SKILL.md` med YAML-frontmatter (`name`, `description`) + omfattende markdown-indhold
- **REST-slutpunkter** (API-skills) eller **CLI-underkommandoer** (CLI-skills), som er afledt af OpenAPI-specifikationen og CLI-registreringsdatabasen
- En **rå GitHub-URL** til direkte hentning: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Arkitektur

```
src/shared/constants/agentSkills.ts    — Kurateret liste med 45 poster (navn/beskrivelse/kategori/område/ikon)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() skriver SKILL.md til skills/{id}/
  openapiParser.ts                     — udtrækker REST-slutpunkter fra docs/openapi.yaml
  cliRegistryParser.ts                 — udtrækker CLI-underkommandoer fra bin/cli-registry.ts
  schemas.ts                           — Zod-skemaer: AgentSkillSchema, SkillCoverageSchema osv.
  types.ts                             — TypeScript-grænseflader: AgentSkill, SkillCoverage osv.

skills/{id}/SKILL.md                   — Genererede + kuraterede markdown-filer (45 i alt)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (godkendelse påkrævet)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 MCP-værktøjer (liste, hent, dækning)
src/lib/a2a/skills/listCapabilities.ts        — A2A-skill: list-capabilities
```

---

## SKILL.md-format

```markdown
---
name: omni-providers
description: "Administrer udbyderforbindelser: tilføj, test, rotér og fjern legitimationsoplysninger."
---

<!-- genereret af src/lib/agentSkills/generator.ts; manuelle ændringer vil blive overskrevet -->

## Oversigt

...

## Godkendelse

...

## Slutpunkter

...

<!-- skill:custom-start -->

## Brugerdefineret afsnit (bevares ved regenerering)

...

<!-- skill:custom-end -->
```

Generatoren bevarer indhold mellem `<!-- skill:custom-start -->` og `<!-- skill:custom-end -->` ved regenerering. Ti skills har kuraterede, brugerdefinerede blokke:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## REST API-opdagelse

| Slutpunkt                    | Metode | Beskrivelse                                                     | Godkendelse    |
| :--------------------------- | :----- | :-------------------------------------------------------------- | :------------- |
| `/api/agent-skills`          | GET    | Vis katalog (valgfrit `?category=api\|cli\|config&area=<area>`) | ingen          |
| `/api/agent-skills/{id}`     | GET    | Hent metadata for en enkelt færdighed                           | ingen          |
| `/api/agent-skills/{id}/raw` | GET    | Hent SKILL.md som `text/markdown`                               | ingen          |
| `/api/agent-skills/coverage` | GET    | Dækningsstatistik (hvor mange SKILL.md-filer der findes)        | ingen          |
| `/api/agent-skills/generate` | POST   | Udløs generatoren (dryRun/prune/onlyIds)                        | administration |

Eksempel — vis alle API-færdigheder:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Eksempel — hent en enkelt SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## MCP-opdagelse

Tre MCP-værktøjer er registreret under omfanget `read:catalog`:

| Værktøj                           | Beskrivelse                                          |
| :-------------------------------- | :--------------------------------------------------- |
| `omniroute_agent_skills_list`     | Vis færdigheder (valgfrie `category`-/`area`-filtre) |
| `omniroute_agent_skills_get`      | Hent metadata + SKILL.md for én færdighed via `id`   |
| `omniroute_agent_skills_coverage` | Dækningsstatistik (API/CLI eksisterende/i alt)       |

Se [MCP-SERVER.md](./MCP-SERVER.md) for konfiguration af omfang og godkendelse.

---

## A2A-opdagelse

A2A-færdigheden `list-capabilities` returnerer hele kataloget med 45 færdigheder som en artefakt i form af en markdown-tabel. Eksterne orkestratorer kan kalde den via:

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

Se [A2A-SERVER.md](./A2A-SERVER.md) for protokoldetaljer.

---

## Katalog — 45 færdigheds-id'er

### API-færdigheder (23)

| ID                     | Område          | Indgangspunkt                             |
| :--------------------- | :-------------- | :---------------------------------------- |
| `omni-auth`            | auth            | Godkendelse + sessionsadministration      |
| `omni-providers`       | providers       | Administration af udbyderforbindelser     |
| `omni-models`          | models          | Modelkatalog og funktioner                |
| `omni-combos-routing`  | combos-routing  | Kombinerede routingstrategier             |
| `omni-api-keys`        | api-keys        | Administration af API-nøgler              |
| `omni-usage-logs`      | usage-logs      | Brugs- og omkostningslogfiler             |
| `omni-budget`          | budget          | Budgetbegrænsninger                       |
| `omni-settings`        | settings        | Globale indstillinger                     |
| `omni-proxies`         | proxies         | Administration af proxypuljer             |
| `omni-cache`           | cache           | Semantisk cache + promptcache             |
| `omni-compression`     | compression     | Motorer til kontekstkomprimering          |
| `omni-context-rtk`     | context-rtk     | RTK-komprimering                          |
| `omni-resilience`      | resilience      | Kredsløbsafbrydere + nedkølingsperioder   |
| `omni-cli-tools`       | cli-tools       | REST-proxy til CLI-værktøjer              |
| `omni-tunnels`         | tunnels         | Tunneladministration                      |
| `omni-sync-cloud`      | sync-cloud      | Skysynkronisering                         |
| `omni-db-backups`      | db-backups      | Databasesikkerhedskopier                  |
| `omni-webhooks`        | webhooks        | Dispatcher til webhookhændelser           |
| `omni-mcp`             | mcp             | MCP-server (110 værktøjer, 3 transporter) |
| `omni-agents-a2a`      | agents-a2a      | A2A-agentprotokol                         |
| `omni-version-manager` | version-manager | Versions- og opdateringsadministration    |
| `omni-inference`       | inference       | Direkte inferens/fuldførelser             |

### CLI-færdigheder (21)

| ID                    | Område             | CLI-kommandorod         |
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

### Konfigurationsarbejdsgang (1)

| ID                 | Område           | Indgangspunkt                      |
| :----------------- | :--------------- | :--------------------------------- |
| `config-codex-cli` | config-codex-cli | Konfigurationsproces for Codex CLI |

---

## Sådan anvender eksterne agenter færdigheder

### 1. Registrering via REST

```bash
# Hent hele kataloget
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Hent SKILL.md til kontekstindsættelse
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Registrering via MCP

```typescript
// I en Claude Desktop-/Cursor-MCP-klient:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → array af AgentSkill med rawUrl for hver
```

### 3. Registrering via A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table er en markdown-tabel med alle 45 færdigheds-id'er + rawUrl-kolonner
```

### 4. Direkte hentning af rådata fra GitHub (kræver ingen server)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generator

Generatoren læser det kuraterede katalog + OpenAPI-specifikationen + CLI-registret og skriver `skills/{id}/SKILL.md` for hver post:

```bash
# Forhåndsvisning (prøvekørsel, ingen skrivninger)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Fuld regenerering
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Regenerer specifikke id'er
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Generatorens svar er en `GeneratorReport`:

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

## Dæknings-API

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

## Relateret

- [SKILLS.md](./SKILLS.md) — Omni Skills-frameworket (LLM-værktøjsindsættelse + markedsplads)
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-værktøjskatalog (`omniroute_agent_skills_*`-værktøjer)
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A-protokol (`list-capabilities`-færdighed)
- `src/lib/agentSkills/` — katalog, generator, parsere
- `skills/` — genererede SKILL.md-filer (45 poster)
