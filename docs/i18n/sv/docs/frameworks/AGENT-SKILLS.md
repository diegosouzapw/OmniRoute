# OmniRoute Agent Skills Catalog (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Sanningskälla:** `src/lib/agentSkills/` (katalog, generator, parsrar) + katalogen `skills/` (SKILL.md-filer)
> **Senast uppdaterad:** 2026-08-02 — v3.8.50

Agent Skills är strukturerade SKILL.md-filer som lär externa agenter, MCP-klienter och A2A-orkestrerare hur OmniRoutes REST API och CLI används. Till skillnad från [Omni Skills](./SKILLS.md) (som är LLM-verktygsdefinitioner som körs inuti OmniRoute) är Agent Skills en _dokumentationskatalog_ — statisk markdown som kan matas direkt till agentkontexten.

---

## Översikt

Katalogen innehåller **45 Agent Skills** (23 för REST API + 21 för CLI + 1 konfigurationsarbetsflöde). Varje färdighet har:

- Ett **kanoniskt ID** (`omni-auth`, `cli-serve` osv.)
- En **SKILL.md-fil** i `skills/{id}/SKILL.md` med YAML-frontmatter (`name`, `description`) + ett innehållsrikt markdown-dokument
- **REST-endpoints** (API-färdigheter) eller **CLI-underkommandon** (CLI-färdigheter) som härleds från OpenAPI-specifikationen och CLI-registret
- En **rå GitHub-URL** för direkt hämtning: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Arkitektur

```
src/shared/constants/agentSkills.ts    — Kurerad lista med 45 poster (namn/beskrivning/kategori/område/ikon)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() skriver SKILL.md till skills/{id}/
  openapiParser.ts                     — extraherar REST-endpoints från docs/openapi.yaml
  cliRegistryParser.ts                 — extraherar CLI-underkommandon från bin/cli-registry.ts
  schemas.ts                           — Zod-scheman: AgentSkillSchema, SkillCoverageSchema osv.
  types.ts                             — TypeScript-gränssnitt: AgentSkill, SkillCoverage osv.

skills/{id}/SKILL.md                   — Genererade + kurerade markdown-filer (totalt 45)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (autentisering krävs)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 MCP-verktyg (lista, hämta, täckning)
src/lib/a2a/skills/listCapabilities.ts        — A2A-färdighet: list-capabilities
```

---

## SKILL.md-format

```markdown
---
name: omni-providers
description: "Hantera leverantörsanslutningar: lägg till, testa, rotera och ta bort autentiseringsuppgifter."
---

<!-- genererad av src/lib/agentSkills/generator.ts; manuella ändringar kommer att skrivas över -->

## Översikt

...

## Autentisering

...

## Endpoints

...

<!-- skill:custom-start -->

## Anpassat avsnitt (bevaras vid omgenerering)

...

<!-- skill:custom-end -->
```

Generatorn bevarar innehåll mellan `<!-- skill:custom-start -->` och `<!-- skill:custom-end -->` vid omgenerering. Tio färdigheter har kurerade anpassade block:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## REST API-identifiering

| Slutpunkt                    | Metod | Beskrivning                                                         | Autentisering  |
| :--------------------------- | :---- | :------------------------------------------------------------------ | :------------- |
| `/api/agent-skills`          | GET   | Lista katalogen (valfritt `?category=api\|cli\|config&area=<area>`) | ingen          |
| `/api/agent-skills/{id}`     | GET   | Hämta metadata för en enskild färdighet                             | ingen          |
| `/api/agent-skills/{id}/raw` | GET   | Hämta SKILL.md som `text/markdown`                                  | ingen          |
| `/api/agent-skills/coverage` | GET   | Täckningsstatistik (hur många SKILL.md-filer som finns)             | ingen          |
| `/api/agent-skills/generate` | POST  | Starta generatorn (dryRun/prune/onlyIds)                            | administration |

Exempel — lista alla API-färdigheter:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Exempel — hämta en enskild SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## MCP-identifiering

Tre MCP-verktyg är registrerade under omfånget `read:catalog`:

| Verktyg                           | Beskrivning                                                |
| :-------------------------------- | :--------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Lista färdigheter (valfria filter för `category` / `area`) |
| `omniroute_agent_skills_get`      | Hämta metadata + SKILL.md för en färdighet via `id`        |
| `omniroute_agent_skills_coverage` | Täckningsstatistik (API/CLI befintliga/totalt)             |

Se [MCP-SERVER.md](./MCP-SERVER.md) för konfigurering av omfång och autentisering.

---

## A2A-identifiering

A2A-färdigheten `list-capabilities` returnerar hela katalogen med 45 färdigheter som en artefakt i form av en markdown-tabell. Externa orkestrerare kan anropa den via:

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

Se [A2A-SERVER.md](./A2A-SERVER.md) för protokollinformation.

---

## Katalog — 45 färdighets-ID:n

### API-färdigheter (23)

| ID                     | Område          | Startpunkt                              |
| :--------------------- | :-------------- | :-------------------------------------- |
| `omni-auth`            | auth            | Autentisering + sessionshantering       |
| `omni-providers`       | providers       | Hantering av leverantörsanslutningar    |
| `omni-models`          | models          | Modellkatalog och funktioner            |
| `omni-combos-routing`  | combos-routing  | Strategier för kombinerad routning      |
| `omni-api-keys`        | api-keys        | Hantering av API-nycklar                |
| `omni-usage-logs`      | usage-logs      | Användnings- och kostnadsloggar         |
| `omni-budget`          | budget          | Budgetspärrar                           |
| `omni-settings`        | settings        | Globala inställningar                   |
| `omni-proxies`         | proxies         | Hantering av proxypooler                |
| `omni-cache`           | cache           | Semantisk cache + promptcache           |
| `omni-compression`     | compression     | Motorer för kontextkomprimering         |
| `omni-context-rtk`     | context-rtk     | RTK-komprimering                        |
| `omni-resilience`      | resilience      | Kretsbrytare + nedkylningsperioder      |
| `omni-cli-tools`       | cli-tools       | REST-proxy för CLI-verktyg              |
| `omni-tunnels`         | tunnels         | Tunnelhantering                         |
| `omni-sync-cloud`      | sync-cloud      | Molnsynkronisering                      |
| `omni-db-backups`      | db-backups      | Databassäkerhetskopior                  |
| `omni-webhooks`        | webhooks        | Händelsedispatcher för webhooks         |
| `omni-mcp`             | mcp             | MCP-server (110 verktyg, 3 transporter) |
| `omni-agents-a2a`      | agents-a2a      | A2A-agentprotokoll                      |
| `omni-version-manager` | version-manager | Versions- och uppdateringshantering     |
| `omni-inference`       | inference       | Direkt inferens/slutföranden            |

### CLI-färdigheter (21)

| ID                    | Område             | Rotkommando för CLI     |
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

### Konfigurationsarbetsflöde (1)

| ID                 | Område           | Startpunkt                              |
| :----------------- | :--------------- | :-------------------------------------- |
| `config-codex-cli` | config-codex-cli | Konfigurationsarbetsflöde för Codex CLI |

---

## Hur externa agenter använder färdigheter

### 1. Identifiering via REST

```bash
# Hämta hela katalogen
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Hämta SKILL.md för kontextinjektion
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Identifiering via MCP

```typescript
// I en Claude Desktop-/Cursor-MCP-klient:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → matris med AgentSkill och rawUrl för var och en
```

### 3. Identifiering via A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table är en markdown-tabell med alla 45 färdighets-ID:n samt rawUrl-kolumner
```

### 4. Direkt hämtning av rådata från GitHub (ingen server krävs)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generator

Generatorn läser den handplockade katalogen + OpenAPI-specifikationen + CLI-registret och skriver `skills/{id}/SKILL.md` för varje post:

```bash
# Förhandsgranska (testkörning, inga skrivningar)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Fullständig omgenerering
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Generera om specifika ID:n
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Generatorns svar är en `GeneratorReport`:

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

## API för täckning

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

## Relaterat

- [SKILLS.md](./SKILLS.md) — Omni Skills-ramverket (LLM-verktygsinjektion + marknadsplats)
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-verktygskatalog (`omniroute_agent_skills_*`-verktyg)
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A-protokoll (`list-capabilities`-färdighet)
- `src/lib/agentSkills/` — katalog, generator, parsrar
- `skills/` — genererade SKILL.md-filer (45 poster)
