# OmniRoute Agent Skills Catalog (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Zdroj pravdy:** `src/lib/agentSkills/` (katalóg, generátor, parsery) + adresár `skills/` (súbory SKILL.md)
> **Posledná aktualizácia:** 2026-08-02 — v3.8.50

Agent Skills sú štruktúrované súbory SKILL.md, ktoré učia externých agentov, klientov MCP a orchestrátory A2A používať REST API a CLI rozhranie OmniRoute. Na rozdiel od [Omni Skills](./SKILLS.md) (čo sú definície nástrojov LLM vykonávané v rámci OmniRoute) sú Agent Skills _katalógom dokumentácie_ — statickým markdownom, ktorý možno priamo vložiť do kontextu agenta.

---

## Prehľad

Katalóg obsahuje **45 Agent Skills** (23 pre REST API + 21 pre CLI + 1 konfiguračný pracovný postup). Každá zručnosť má:

- **Kanonické ID** (`omni-auth`, `cli-serve` atď.)
- Súbor **SKILL.md** v `skills/{id}/SKILL.md` s YAML frontmatterom (`name`, `description`) + bohatým markdownovým obsahom
- **Koncové body REST** (zručnosti API) alebo **podpríkazy CLI** (zručnosti CLI) odvodené zo špecifikácie OpenAPI a registra CLI
- **Nespracovanú URL adresu GitHubu** na načítanie aktuálnej verzie: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Architektúra

```
src/shared/constants/agentSkills.ts    — Spravovaný zoznam 45 položiek (názov/opis/kategória/oblasť/ikona)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() zapisuje SKILL.md do skills/{id}/
  openapiParser.ts                     — extrahuje koncové body REST z docs/openapi.yaml
  cliRegistryParser.ts                 — extrahuje podpríkazy CLI z bin/cli-registry.ts
  schemas.ts                           — Schémy Zod: AgentSkillSchema, SkillCoverageSchema atď.
  types.ts                             — Rozhrania TypeScript: AgentSkill, SkillCoverage atď.

skills/{id}/SKILL.md                   — Vygenerované + spravované markdownové súbory (celkovo 45)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (vyžaduje sa autentifikácia)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 nástroje MCP (zoznam, získanie, pokrytie)
src/lib/a2a/skills/listCapabilities.ts        — Zručnosť A2A: list-capabilities
```

---

## Formát SKILL.md

```markdown
---
name: omni-providers
description: "Správa pripojení poskytovateľov: pridávanie, testovanie, rotácia a odstraňovanie prihlasovacích údajov."
---

<!-- vygenerované pomocou src/lib/agentSkills/generator.ts; manuálne úpravy budú prepísané -->

## Prehľad

...

## Autentifikácia

...

## Koncové body

...

<!-- skill:custom-start -->

## Vlastná sekcia (zachovaná pri opätovnom generovaní)

...

<!-- skill:custom-end -->
```

Generátor pri opätovnom generovaní zachová obsah medzi `<!-- skill:custom-start -->` a `<!-- skill:custom-end -->`. Desať zručností obsahuje spravované vlastné bloky:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Vyhľadávanie REST API

| Koncový bod                  | Metóda | Popis                                                                | Autorizácia |
| :--------------------------- | :----- | :------------------------------------------------------------------- | :---------- |
| `/api/agent-skills`          | GET    | Zoznam katalógu (voliteľne `?category=api\|cli\|config&area=<area>`) | žiadna      |
| `/api/agent-skills/{id}`     | GET    | Získanie metadát jednej zručnosti                                    | žiadna      |
| `/api/agent-skills/{id}/raw` | GET    | Načítanie súboru SKILL.md vo formáte `text/markdown`                 | žiadna      |
| `/api/agent-skills/coverage` | GET    | Štatistiky pokrytia (počet existujúcich súborov SKILL.md)            | žiadna      |
| `/api/agent-skills/generate` | POST   | Spustenie generátora (dryRun/prune/onlyIds)                          | správa      |

Príklad — zobrazenie všetkých zručností API:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Príklad — načítanie jedného súboru SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Vyhľadávanie MCP

V rámci rozsahu `read:catalog` sú zaregistrované tri nástroje MCP:

| Nástroj                           | Popis                                                          |
| :-------------------------------- | :------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Zoznam zručností (voliteľné filtre `category` / `area`)        |
| `omniroute_agent_skills_get`      | Získanie metadát a súboru SKILL.md jednej zručnosti podľa `id` |
| `omniroute_agent_skills_coverage` | Štatistiky pokrytia (existujúce/celkové API/CLI)               |

Zapojenie rozsahov a autentifikáciu nájdete v dokumente [MCP-SERVER.md](./MCP-SERVER.md).

---

## Vyhľadávanie A2A

Zručnosť A2A `list-capabilities` vracia kompletný katalóg 45 zručností ako artefakt vo forme tabuľky Markdown. Externé orchestrátory ju môžu vyvolať prostredníctvom:

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

Podrobnosti o protokole nájdete v dokumente [A2A-SERVER.md](./A2A-SERVER.md).

---

## Katalóg — 45 ID zručností

### Zručnosti API (23)

| ID                     | Oblasť          | Vstupný bod                                                 |
| :--------------------- | :-------------- | :---------------------------------------------------------- |
| `omni-auth`            | auth            | Správa autentifikácie a relácií                             |
| `omni-providers`       | providers       | Správa pripojení poskytovateľov                             |
| `omni-models`          | models          | Katalóg modelov a ich funkcie                               |
| `omni-combos-routing`  | combos-routing  | Stratégie kombinovaného smerovania                          |
| `omni-api-keys`        | api-keys        | Správa kľúčov API                                           |
| `omni-usage-logs`      | usage-logs      | Záznamy používania a nákladov                               |
| `omni-budget`          | budget          | Rozpočtové obmedzenia                                       |
| `omni-settings`        | settings        | Globálne nastavenia                                         |
| `omni-proxies`         | proxies         | Správa fondu proxy serverov                                 |
| `omni-cache`           | cache           | Sémantická vyrovnávacia pamäť a vyrovnávacia pamäť promptov |
| `omni-compression`     | compression     | Mechanizmy kompresie kontextu                               |
| `omni-context-rtk`     | context-rtk     | Kompresia RTK                                               |
| `omni-resilience`      | resilience      | Ističe a intervaly obnovenia                                |
| `omni-cli-tools`       | cli-tools       | REST proxy pre nástroje CLI                                 |
| `omni-tunnels`         | tunnels         | Správa tunelov                                              |
| `omni-sync-cloud`      | sync-cloud      | Synchronizácia s cloudom                                    |
| `omni-db-backups`      | db-backups      | Zálohy databázy                                             |
| `omni-webhooks`        | webhooks        | Dispečer udalostí webhookov                                 |
| `omni-mcp`             | mcp             | Server MCP (110 nástrojov, 3 prenosy)                       |
| `omni-agents-a2a`      | agents-a2a      | Protokol agenta A2A                                         |
| `omni-version-manager` | version-manager | Správa verzií a aktualizácií                                |
| `omni-inference`       | inference       | Priama inferencia / dokončovanie                            |

### Zručnosti CLI (21)

| ID                    | Oblasť             | Koreňový príkaz CLI     |
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

### Pracovný postup konfigurácie (1)

| ID                 | Oblasť           | Vstupný bod                            |
| :----------------- | :--------------- | :------------------------------------- |
| `config-codex-cli` | config-codex-cli | Pracovný postup konfigurácie Codex CLI |

---

## Ako externí agenti využívajú zručnosti

### 1. Vyhľadávanie prostredníctvom REST

```bash
# Získanie úplného katalógu
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Získanie súboru SKILL.md na vloženie kontextu
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Vyhľadávanie prostredníctvom MCP

```typescript
// V klientovi MCP pre Claude Desktop / Cursor:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → pole objektov AgentSkill, pričom každý obsahuje rawUrl
```

### 3. Vyhľadávanie prostredníctvom A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table je tabuľka vo formáte Markdown so všetkými 45 ID zručností a stĺpcami rawUrl
```

### 4. Priame načítanie nespracovaného obsahu z GitHubu (server nie je potrebný)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generátor

Generátor načíta spravovaný katalóg, špecifikáciu OpenAPI a register CLI a pre každú položku zapíše súbor `skills/{id}/SKILL.md`:

```bash
# Náhľad (skúšobné spustenie bez zápisu)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Úplné opätovné vygenerovanie
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Opätovné vygenerovanie konkrétnych ID
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Odpoveď generátora je objekt `GeneratorReport`:

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

## API pokrytia

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

## Súvisiace zdroje

- [SKILLS.md](./SKILLS.md) — framework Omni Skills (vkladanie nástrojov LLM + trhovisko)
- [MCP-SERVER.md](./MCP-SERVER.md) — katalóg nástrojov MCP (nástroje `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — protokol A2A (zručnosť `list-capabilities`)
- `src/lib/agentSkills/` — katalóg, generátor a syntaktické analyzátory
- `skills/` — vygenerované súbory SKILL.md (45 položiek)
