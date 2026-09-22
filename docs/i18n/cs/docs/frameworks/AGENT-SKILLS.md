# OmniRoute Agent Skills Catalog (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Zdroj pravdy:** `src/lib/agentSkills/` (katalog, generátor, parsery) + adresář `skills/` (soubory SKILL.md)
> **Poslední aktualizace:** 2026-08-02 — v3.8.50

Agent Skills jsou strukturované soubory SKILL.md, které učí externí agenty, klienty MCP a orchestrátory A2A, jak používat REST API a CLI systému OmniRoute. Na rozdíl od [Omni Skills](./SKILLS.md) (což jsou definice nástrojů LLM spouštěné uvnitř OmniRoute) představují Agent Skills _katalog dokumentace_ — statický markdown, který lze vložit přímo do kontextu agenta.

---

## Přehled

Katalog obsahuje **45 Agent Skills** (23 pro REST API + 21 pro CLI + 1 konfigurační pracovní postup). Každá dovednost má:

- **Kanonické ID** (`omni-auth`, `cli-serve` atd.)
- Soubor **SKILL.md** v `skills/{id}/SKILL.md` s YAML frontmatterem (`name`, `description`) + obsáhlým tělem ve formátu markdown
- **Koncové body REST** (dovednosti API) nebo **dílčí příkazy CLI** (dovednosti CLI) odvozené ze specifikace OpenAPI a registru CLI
- **Nezpracovanou adresu URL GitHubu** pro načtení aktuální verze: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Architektura

```
src/shared/constants/agentSkills.ts    — Ručně sestavený seznam 45 položek (název/popis/kategorie/oblast/ikona)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() zapisuje SKILL.md do skills/{id}/
  openapiParser.ts                     — Extrahuje koncové body REST z docs/openapi.yaml
  cliRegistryParser.ts                 — Extrahuje dílčí příkazy CLI z bin/cli-registry.ts
  schemas.ts                           — Schémata Zod: AgentSkillSchema, SkillCoverageSchema atd.
  types.ts                             — Rozhraní TypeScriptu: AgentSkill, SkillCoverage atd.

skills/{id}/SKILL.md                   — Vygenerované + ručně upravené soubory markdown (celkem 45)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (vyžaduje ověření)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 nástroje MCP (seznam, získání, pokrytí)
src/lib/a2a/skills/listCapabilities.ts        — Dovednost A2A: list-capabilities
```

---

## Formát SKILL.md

```markdown
---
name: omni-providers
description: "Spravujte připojení poskytovatelů: přidávejte, testujte, obměňujte a odebírejte přihlašovací údaje."
---

<!-- vygenerováno pomocí src/lib/agentSkills/generator.ts; ruční úpravy budou přepsány -->

## Přehled

...

## Ověřování

...

## Koncové body

...

<!-- skill:custom-start -->

## Vlastní sekce (zachována při opětovném generování)

...

<!-- skill:custom-end -->
```

Generátor při opětovném generování zachovává obsah mezi `<!-- skill:custom-start -->` a `<!-- skill:custom-end -->`. Deset dovedností obsahuje ručně upravené vlastní bloky:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Zjišťování REST API

| Koncový bod                  | Metoda | Popis                                                               | Autorizace |
| :--------------------------- | :----- | :------------------------------------------------------------------ | :--------- |
| `/api/agent-skills`          | GET    | Výpis katalogu (volitelně `?category=api\|cli\|config&area=<area>`) | žádná      |
| `/api/agent-skills/{id}`     | GET    | Získání metadat jedné dovednosti                                    | žádná      |
| `/api/agent-skills/{id}/raw` | GET    | Načtení SKILL.md jako `text/markdown`                               | žádná      |
| `/api/agent-skills/coverage` | GET    | Statistiky pokrytí (kolik souborů SKILL.md existuje)                | žádná      |
| `/api/agent-skills/generate` | POST   | Spuštění generátoru (dryRun/prune/onlyIds)                          | správa     |

Příklad — výpis všech dovedností API:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Příklad — načtení jednoho souboru SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Zjišťování MCP

V rámci rozsahu `read:catalog` jsou registrovány tři nástroje MCP:

| Nástroj                           | Popis                                                   |
| :-------------------------------- | :------------------------------------------------------ |
| `omniroute_agent_skills_list`     | Výpis dovedností (volitelné filtry `category` / `area`) |
| `omniroute_agent_skills_get`      | Získání metadat + SKILL.md jedné dovednosti podle `id`  |
| `omniroute_agent_skills_coverage` | Statistiky pokrytí (API/CLI dostupné/celkem)            |

Informace o zapojení rozsahů a ověřování najdete v souboru [MCP-SERVER.md](./MCP-SERVER.md).

---

## Zjišťování A2A

Dovednost A2A `list-capabilities` vrací úplný katalog 45 dovedností jako artefakt v podobě tabulky Markdown. Externí orchestrátory ji mohou vyvolat prostřednictvím:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "skill": "list-capabilities",
    "messages": [{ "role": "user", "content": "Vypsat všechny funkce" }]
  }
}
```

Podrobnosti o protokolu najdete v souboru [A2A-SERVER.md](./A2A-SERVER.md).

---

## Katalog — 45 ID dovedností

### Dovednosti API (23)

| ID                     | Oblast          | Vstupní bod                            |
| :--------------------- | :-------------- | :------------------------------------- |
| `omni-auth`            | auth            | Správa ověřování + relací              |
| `omni-providers`       | providers       | Správa připojení poskytovatelů         |
| `omni-models`          | models          | Katalog modelů a jejich funkce         |
| `omni-combos-routing`  | combos-routing  | Strategie kombinovaného směrování      |
| `omni-api-keys`        | api-keys        | Správa klíčů API                       |
| `omni-usage-logs`      | usage-logs      | Protokoly využití a nákladů            |
| `omni-budget`          | budget          | Ochranné limity rozpočtu               |
| `omni-settings`        | settings        | Globální nastavení                     |
| `omni-proxies`         | proxies         | Správa fondu proxy serverů             |
| `omni-cache`           | cache           | Sémantická mezipaměť + mezipaměť výzev |
| `omni-compression`     | compression     | Moduly komprese kontextu               |
| `omni-context-rtk`     | context-rtk     | Komprese RTK                           |
| `omni-resilience`      | resilience      | Jističe + doby čekání                  |
| `omni-cli-tools`       | cli-tools       | REST proxy nástrojů CLI                |
| `omni-tunnels`         | tunnels         | Správa tunelů                          |
| `omni-sync-cloud`      | sync-cloud      | Synchronizace s cloudem                |
| `omni-db-backups`      | db-backups      | Zálohy databáze                        |
| `omni-webhooks`        | webhooks        | Dispečer událostí webhooků             |
| `omni-mcp`             | mcp             | Server MCP (110 nástrojů, 3 přenosy)   |
| `omni-agents-a2a`      | agents-a2a      | Protokol agentů A2A                    |
| `omni-version-manager` | version-manager | Správa verzí a aktualizací             |
| `omni-inference`       | inference       | Přímé odvozování / dokončování         |

### Dovednosti CLI (21)

| ID                    | Oblast             | Kořenový příkaz CLI     |
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

### Pracovní postup konfigurace (1)

| ID                 | Oblast           | Vstupní bod                           |
| :----------------- | :--------------- | :------------------------------------ |
| `config-codex-cli` | config-codex-cli | Pracovní postup konfigurace Codex CLI |

---

## Jak externí agenti využívají dovednosti

### 1. Zjišťování prostřednictvím REST

```bash
# Získání kompletního katalogu
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Získání SKILL.md pro vložení kontextu
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Zjišťování prostřednictvím MCP

```typescript
// V klientovi MCP pro Claude Desktop / Cursor:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → pole objektů AgentSkill, z nichž každý obsahuje rawUrl
```

### 3. Zjišťování prostřednictvím A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table je markdownová tabulka se všemi 45 ID dovedností a sloupci rawUrl
```

### 4. Přímé načtení nezpracovaného souboru z GitHubu (bez nutnosti serveru)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generátor

Generátor načte spravovaný katalog, specifikaci OpenAPI a registr CLI a pro každou položku zapíše `skills/{id}/SKILL.md`:

```bash
# Náhled (zkušební běh bez zápisu)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Úplné opětovné vygenerování
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Opětovné vygenerování konkrétních ID
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Odpovědí generátoru je objekt `GeneratorReport`:

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

## API pokrytí

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

## Související

- [SKILLS.md](./SKILLS.md) — framework Omni Skills (vkládání nástrojů LLM + tržiště)
- [MCP-SERVER.md](./MCP-SERVER.md) — katalog nástrojů MCP (nástroje `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — protokol A2A (dovednost `list-capabilities`)
- `src/lib/agentSkills/` — katalog, generátor, analyzátory
- `skills/` — vygenerované soubory SKILL.md (45 položek)
