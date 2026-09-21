# OmniRoute Agent Skills Catalog (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Sannhetskilde:** `src/lib/agentSkills/` (katalog, generator, parsere) + katalogen `skills/` (SKILL.md-filer)
> **Sist oppdatert:** 2026-08-02 — v3.8.50

Agentferdigheter er strukturerte SKILL.md-filer som lærer eksterne agenter, MCP-klienter og A2A-orkestratorer hvordan de bruker OmniRoutes REST-API og CLI. I motsetning til [Omni-ferdigheter](./SKILLS.md) (som er LLM-verktøydefinisjoner som kjøres inne i OmniRoute), er Agentferdigheter en _dokumentasjonskatalog_ — statisk markdown som kan mates direkte inn i agentkonteksten.

---

## Oversikt

Katalogen inneholder **45 Agentferdigheter** (23 for REST-API + 21 for CLI + 1 konfigurasjonsarbeidsflyt). Hver ferdighet har:

- En **kanonisk ID** (`omni-auth`, `cli-serve` osv.)
- En **SKILL.md**-fil i `skills/{id}/SKILL.md` med YAML-frontmatter (`name`, `description`) + omfattende markdown-innhold
- **REST-endepunkter** (API-ferdigheter) eller **CLI-underkommandoer** (CLI-ferdigheter) avledet fra OpenAPI-spesifikasjonen og CLI-registeret
- En **rå GitHub-URL** for direkte henting: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Arkitektur

```
src/shared/constants/agentSkills.ts    — Kuratert liste med 45 oppføringer (navn/beskrivelse/kategori/område/ikon)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() skriver SKILL.md til skills/{id}/
  openapiParser.ts                     — trekker ut REST-endepunkter fra docs/openapi.yaml
  cliRegistryParser.ts                 — trekker ut CLI-underkommandoer fra bin/cli-registry.ts
  schemas.ts                           — Zod-skjemaer: AgentSkillSchema, SkillCoverageSchema osv.
  types.ts                             — TypeScript-grensesnitt: AgentSkill, SkillCoverage osv.

skills/{id}/SKILL.md                   — Genererte + kuraterte markdown-filer (totalt 45)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (autentisering kreves)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 MCP-verktøy (liste, hent, dekning)
src/lib/a2a/skills/listCapabilities.ts        — A2A-ferdighet: list-capabilities
```

---

## SKILL.md-format

```markdown
---
name: omni-providers
description: "Administrer leverandørtilkoblinger: legg til, test, roter og fjern påloggingsopplysninger."
---

<!-- generert av src/lib/agentSkills/generator.ts; manuelle endringer vil bli overskrevet -->

## Oversikt

...

## Autentisering

...

## Endepunkter

...

<!-- skill:custom-start -->

## Egendefinert del (bevares ved ny generering)

...

<!-- skill:custom-end -->
```

Generatoren bevarer innholdet mellom `<!-- skill:custom-start -->` og `<!-- skill:custom-end -->` ved ny generering. Ti ferdigheter har kuraterte egendefinerte blokker:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## REST API-oppdagelse

| Endepunkt                    | Metode | Beskrivelse                                                      | Autentisering  |
| :--------------------------- | :----- | :--------------------------------------------------------------- | :------------- |
| `/api/agent-skills`          | GET    | Vis katalog (valgfritt `?category=api\|cli\|config&area=<area>`) | ingen          |
| `/api/agent-skills/{id}`     | GET    | Hent metadata for én ferdighet                                   | ingen          |
| `/api/agent-skills/{id}/raw` | GET    | Hent SKILL.md som `text/markdown`                                | ingen          |
| `/api/agent-skills/coverage` | GET    | Dekningsstatistikk (hvor mange SKILL.md-filer som finnes)        | ingen          |
| `/api/agent-skills/generate` | POST   | Utløs generatoren (dryRun/prune/onlyIds)                         | administrasjon |

Eksempel — vis alle API-ferdigheter:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Eksempel — hent én SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## MCP-oppdagelse

Tre MCP-verktøy er registrert under omfanget `read:catalog`:

| Verktøy                           | Beskrivelse                                               |
| :-------------------------------- | :-------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Vis ferdigheter (valgfrie filtre for `category` / `area`) |
| `omniroute_agent_skills_get`      | Hent metadata + SKILL.md for én ferdighet etter `id`      |
| `omniroute_agent_skills_coverage` | Dekningsstatistikk (API/CLI tilgjengelig/totalt)          |

Se [MCP-SERVER.md](./MCP-SERVER.md) for oppsett av omfang og autentisering.

---

## A2A-oppdagelse

A2A-ferdigheten `list-capabilities` returnerer hele katalogen med 45 ferdigheter som en artefakt i form av en markdown-tabell. Eksterne orkestratorer kan kalle den via:

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

Se [A2A-SERVER.md](./A2A-SERVER.md) for protokolldetaljer.

---

## Katalog — 45 ferdighets-ID-er

### API-ferdigheter (23)

| ID                     | Område          | Inngangspunkt                            |
| :--------------------- | :-------------- | :--------------------------------------- |
| `omni-auth`            | auth            | Autentisering + øktadministrasjon        |
| `omni-providers`       | providers       | Administrasjon av leverandørtilkoblinger |
| `omni-models`          | models          | Modellkatalog og funksjonalitet          |
| `omni-combos-routing`  | combos-routing  | Kombinerte rutingsstrategier             |
| `omni-api-keys`        | api-keys        | Administrasjon av API-nøkler             |
| `omni-usage-logs`      | usage-logs      | Bruks- og kostnadslogger                 |
| `omni-budget`          | budget          | Budsjettvern                             |
| `omni-settings`        | settings        | Globale innstillinger                    |
| `omni-proxies`         | proxies         | Administrasjon av proxy-pool             |
| `omni-cache`           | cache           | Semantisk hurtigbuffer + ledetekstbuffer |
| `omni-compression`     | compression     | Motorer for kontekstkomprimering         |
| `omni-context-rtk`     | context-rtk     | RTK-komprimering                         |
| `omni-resilience`      | resilience      | Automatsikringer + nedkjølingsperioder   |
| `omni-cli-tools`       | cli-tools       | REST-proxy for CLI-verktøy               |
| `omni-tunnels`         | tunnels         | Tunneladministrasjon                     |
| `omni-sync-cloud`      | sync-cloud      | Skysynkronisering                        |
| `omni-db-backups`      | db-backups      | Sikkerhetskopier av databasen            |
| `omni-webhooks`        | webhooks        | Webhook-hendelsesfordeler                |
| `omni-mcp`             | mcp             | MCP-server (110 verktøy, 3 transporter)  |
| `omni-agents-a2a`      | agents-a2a      | A2A-agentprotokoll                       |
| `omni-version-manager` | version-manager | Versjons- og oppdateringsadministrasjon  |
| `omni-inference`       | inference       | Direkte inferens / fullføringer          |

### CLI-ferdigheter (21)

| ID                    | Område             | Rotkommando for CLI     |
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

### Konfigurasjonsarbeidsflyt (1)

| ID                 | Område           | Startpunkt                        |
| :----------------- | :--------------- | :-------------------------------- |
| `config-codex-cli` | config-codex-cli | Arbeidsflyt for Codex CLI-oppsett |

---

## Hvordan eksterne agenter bruker ferdigheter

### 1. Oppdagelse via REST

```bash
# Hent hele katalogen
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Hent SKILL.md for kontekstinjeksjon
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Oppdagelse via MCP

```typescript
// I en Claude Desktop-/Cursor-MCP-klient:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → matrise med AgentSkill, hver med rawUrl
```

### 3. Oppdagelse via A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table er en markdown-tabell med alle de 45 ferdighets-ID-ene + rawUrl-kolonner
```

### 4. Direkte henting av rådata fra GitHub (ingen server kreves)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generator

Generatoren leser den kuraterte katalogen + OpenAPI-spesifikasjonen + CLI-registeret og skriver `skills/{id}/SKILL.md` for hver oppføring:

```bash
# Forhåndsvisning (prøvekjøring, ingen skriving)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Full regenerering
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Regenerer bestemte ID-er
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Svaret fra generatoren er en `GeneratorReport`:

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

## API for dekning

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

## Relatert

- [SKILLS.md](./SKILLS.md) — Omni Skills-rammeverket (LLM-verktøyinjeksjon + markedsplass)
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-verktøykatalog (`omniroute_agent_skills_*`-verktøy)
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A-protokoll (`list-capabilities`-ferdighet)
- `src/lib/agentSkills/` — katalog, generator, parsere
- `skills/` — genererte SKILL.md-filer (45 oppføringer)
