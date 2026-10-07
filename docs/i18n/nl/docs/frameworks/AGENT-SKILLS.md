# OmniRoute Agent Skills Catalog (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Bron van waarheid:** `src/lib/agentSkills/` (catalogus, generator, parsers) + de map `skills/` (SKILL.md-bestanden)
> **Laatst bijgewerkt:** 2026-08-02 — v3.8.50

Agent Skills zijn gestructureerde SKILL.md-bestanden die externe agents, MCP-clients en A2A-orchestrators leren hoe ze de REST API en CLI van OmniRoute kunnen gebruiken. In tegenstelling tot [Omni Skills](./SKILLS.md) (dit zijn LLM-tooldefinities die binnen OmniRoute worden uitgevoerd), vormen Agent Skills een _documentatiecatalogus_ — statische markdown die rechtstreeks aan de context van een agent kan worden toegevoegd.

---

## Overzicht

De catalogus bevat **45 Agent Skills** (23 voor de REST API + 21 voor de CLI + 1 configuratieworkflow). Elke skill heeft:

- Een **canonieke ID** (`omni-auth`, `cli-serve`, enz.)
- Een **SKILL.md**-bestand in `skills/{id}/SKILL.md` met YAML-frontmatter (`name`, `description`) + een uitgebreide markdown-inhoud
- **REST-eindpunten** (API-skills) of **CLI-subcommando's** (CLI-skills), afgeleid van de OpenAPI-specificatie en het CLI-register
- Een **onbewerkte GitHub-URL** om de actuele versie op te halen: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Architectuur

```
src/shared/constants/agentSkills.ts    — Samengestelde lijst met 45 items (naam/beschrijving/categorie/gebied/pictogram)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() schrijft SKILL.md naar skills/{id}/
  openapiParser.ts                     — haalt REST-eindpunten op uit docs/openapi.yaml
  cliRegistryParser.ts                 — haalt CLI-subcommando's op uit bin/cli-registry.ts
  schemas.ts                           — Zod-schema's: AgentSkillSchema, SkillCoverageSchema, enz.
  types.ts                             — TypeScript-interfaces: AgentSkill, SkillCoverage, enz.

skills/{id}/SKILL.md                   — Gegenereerde + samengestelde markdown-bestanden (45 in totaal)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (authenticatie vereist)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 MCP-tools (weergeven, ophalen, dekking)
src/lib/a2a/skills/listCapabilities.ts        — A2A-skill: list-capabilities
```

---

## SKILL.md-indeling

```markdown
---
name: omni-providers
description: "Beheer providerverbindingen: voeg referenties toe, test, roteer en verwijder ze."
---

<!-- gegenereerd door src/lib/agentSkills/generator.ts; handmatige wijzigingen worden overschreven -->

## Overzicht

...

## Authenticatie

...

## Eindpunten

...

<!-- skill:custom-start -->

## Aangepaste sectie (blijft behouden bij opnieuw genereren)

...

<!-- skill:custom-end -->
```

Bij het opnieuw genereren behoudt de generator de inhoud tussen `<!-- skill:custom-start -->` en `<!-- skill:custom-end -->`. Tien skills hebben samengestelde aangepaste blokken:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## REST API-detectie

| Endpoint                     | Methode | Beschrijving                                                             | Authenticatie |
| :--------------------------- | :------ | :----------------------------------------------------------------------- | :------------ |
| `/api/agent-skills`          | GET     | Catalogus weergeven (optioneel `?category=api\|cli\|config&area=<area>`) | geen          |
| `/api/agent-skills/{id}`     | GET     | Metadata van één skill ophalen                                           | geen          |
| `/api/agent-skills/{id}/raw` | GET     | SKILL.md ophalen als `text/markdown`                                     | geen          |
| `/api/agent-skills/coverage` | GET     | Dekkingsstatistieken (hoeveel SKILL.md-bestanden er bestaan)             | geen          |
| `/api/agent-skills/generate` | POST    | Generator activeren (dryRun/prune/onlyIds)                               | beheer        |

Voorbeeld — alle API-skills weergeven:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Voorbeeld — één SKILL.md ophalen:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## MCP-detectie

Er zijn drie MCP-tools geregistreerd onder het bereik `read:catalog`:

| Tool                              | Beschrijving                                                 |
| :-------------------------------- | :----------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Skills weergeven (optionele filters `category` / `area`)     |
| `omniroute_agent_skills_get`      | Metadata + SKILL.md voor één skill ophalen op basis van `id` |
| `omniroute_agent_skills_coverage` | Dekkingsstatistieken (API/CLI aanwezig/totaal)               |

Zie [MCP-SERVER.md](./MCP-SERVER.md) voor de configuratie van bereiken en authenticatie.

---

## A2A-detectie

De A2A-skill `list-capabilities` retourneert de volledige catalogus met 45 skills als een artefact in de vorm van een markdowntabel. Externe orchestrators kunnen deze als volgt aanroepen:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "skill": "list-capabilities",
    "messages": [{ "role": "user", "content": "Alle mogelijkheden weergeven" }]
  }
}
```

Zie [A2A-SERVER.md](./A2A-SERVER.md) voor protocoldetails.

---

## Catalogus — 45 skill-ID's

### API-skills (23)

| ID                     | Gebied          | Ingangspunt                           |
| :--------------------- | :-------------- | :------------------------------------ |
| `omni-auth`            | auth            | Authenticatie- en sessiebeheer        |
| `omni-providers`       | providers       | Beheer van providerverbindingen       |
| `omni-models`          | models          | Modelcatalogus en mogelijkheden       |
| `omni-combos-routing`  | combos-routing  | Combinatierouteringsstrategieën       |
| `omni-api-keys`        | api-keys        | Beheer van API-sleutels               |
| `omni-usage-logs`      | usage-logs      | Gebruiks- en kostenlogboeken          |
| `omni-budget`          | budget          | Budgetbewaking                        |
| `omni-settings`        | settings        | Algemene instellingen                 |
| `omni-proxies`         | proxies         | Beheer van proxypools                 |
| `omni-cache`           | cache           | Semantische cache + promptcache       |
| `omni-compression`     | compression     | Engines voor contextcompressie        |
| `omni-context-rtk`     | context-rtk     | RTK-compressie                        |
| `omni-resilience`      | resilience      | Stroomonderbrekers + afkoelperiodes   |
| `omni-cli-tools`       | cli-tools       | REST-proxy voor CLI-tools             |
| `omni-tunnels`         | tunnels         | Tunnelbeheer                          |
| `omni-sync-cloud`      | sync-cloud      | Cloudsynchronisatie                   |
| `omni-db-backups`      | db-backups      | Databaseback-ups                      |
| `omni-webhooks`        | webhooks        | Dispatcher voor webhookgebeurtenissen |
| `omni-mcp`             | mcp             | MCP-server (110 tools, 3 transporten) |
| `omni-agents-a2a`      | agents-a2a      | A2A-agentprotocol                     |
| `omni-version-manager` | version-manager | Versie- en updatebeheer               |
| `omni-inference`       | inference       | Directe inferentie / voltooiingen     |

### CLI-skills (21)

| ID                    | Gebied             | Basis-CLI-opdracht      |
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

### Configuratieworkflow (1)

| ID                 | Gebied           | Toegangspunt                   |
| :----------------- | :--------------- | :----------------------------- |
| `config-codex-cli` | config-codex-cli | Codex CLI-configuratieworkflow |

---

## Hoe externe agents skills gebruiken

### 1. Ontdekking via REST

```bash
# Haal de volledige catalogus op
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Haal SKILL.md op voor contextinjectie
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Ontdekking via MCP

```typescript
// In een Claude Desktop-/Cursor-MCP-client:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → array van AgentSkill, elk met rawUrl
```

### 3. Ontdekking via A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table is een markdown-tabel met alle 45 skill-ID's + rawUrl-kolommen
```

### 4. Rechtstreeks ophalen van onbewerkte GitHub-inhoud (geen server vereist)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generator

De generator leest de gecureerde catalogus + OpenAPI-specificatie + CLI-register en schrijft `skills/{id}/SKILL.md` voor elk item:

```bash
# Voorbeeldweergave (proefuitvoering, niets wegschrijven)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Volledige regeneratie
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Specifieke ID's opnieuw genereren
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Het antwoord van de generator is een `GeneratorReport`:

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

## Dekkings-API

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

## Gerelateerd

- [SKILLS.md](./SKILLS.md) — Omni Skills-framework (LLM-toolinjectie + marketplace)
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-toolcatalogus (`omniroute_agent_skills_*`-tools)
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A-protocol (`list-capabilities`-skill)
- `src/lib/agentSkills/` — catalogus, generator, parsers
- `skills/` — gegenereerde SKILL.md-bestanden (45 items)
