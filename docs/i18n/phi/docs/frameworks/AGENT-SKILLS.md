# OmniRoute Agent Skills Catalog (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/agentSkills/` (catalog, generator, parsers) + direktoryong `skills/` (mga SKILL.md file)
> **Huling na-update:** 2026-08-02 — v3.8.50

Ang Agent Skills ay mga nakaayos na SKILL.md file na nagtuturo sa mga external agent, MCP client, at A2A orchestrator kung paano gamitin ang REST API at CLI ng OmniRoute. Hindi tulad ng [Omni Skills](./SKILLS.md) (na mga depinisyon ng LLM tool na isinasagawa sa loob ng OmniRoute), ang Agent Skills ay isang _catalog ng dokumentasyon_ — static na markdown na maaaring direktang ilagay sa context ng agent.

---

## Pangkalahatang-ideya

Naglalaman ang catalog ng **45 Agent Skills** (23 REST API + 21 CLI + 1 workflow ng configuration). Ang bawat skill ay may:

- Isang **canonical ID** (`omni-auth`, `cli-serve`, atbp.)
- Isang **SKILL.md** file sa `skills/{id}/SKILL.md` na may YAML frontmatter (`name`, `description`) + detalyadong markdown body
- Mga **REST endpoint** (mga API skill) o **CLI subcommand** (mga CLI skill) na nagmula sa OpenAPI spec at CLI registry
- Isang **GitHub raw URL** para sa live fetch: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Arkitektura

```
src/shared/constants/agentSkills.ts    — 45-entry na piniling listahan (name/desc/category/area/icon)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — isinusulat ng generateAgentSkills() ang SKILL.md sa skills/{id}/
  openapiParser.ts                     — kinukuha ang mga REST endpoint mula sa docs/openapi.yaml
  cliRegistryParser.ts                 — kinukuha ang mga CLI subcommand mula sa bin/cli-registry.ts
  schemas.ts                           — Mga Zod schema: AgentSkillSchema, SkillCoverageSchema, atbp.
  types.ts                             — Mga TypeScript interface: AgentSkill, SkillCoverage, atbp.

skills/{id}/SKILL.md                   — Mga binuo + piniling markdown file (45 sa kabuuan)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (kailangan ng authentication)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 MCP tool (list, get, coverage)
src/lib/a2a/skills/listCapabilities.ts        — A2A skill: list-capabilities
```

---

## Format ng SKILL.md

```markdown
---
name: omni-providers
description: "Pamahalaan ang mga koneksyon sa provider: magdagdag, magsubok, mag-rotate, at mag-alis ng mga credential."
---

<!-- binuo ng src/lib/agentSkills/generator.ts; mao-overwrite ang mga manu-manong pagbabago -->

## Pangkalahatang-ideya

...

## Authentication

...

## Mga Endpoint

...

<!-- skill:custom-start -->

## Custom na Seksyon (pinananatili sa bawat regeneration)

...

<!-- skill:custom-end -->
```

Pinananatili ng generator ang content sa pagitan ng `<!-- skill:custom-start -->` at `<!-- skill:custom-end -->` sa regeneration. Sampung skill ang may mga piniling custom block:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Pagtuklas sa REST API

| Endpoint                     | Pamamaraan | Paglalarawan                                                              | Awtorisasyon |
| :--------------------------- | :--------- | :------------------------------------------------------------------------ | :----------- |
| `/api/agent-skills`          | GET        | Ilista ang catalog (opsyonal na `?category=api\|cli\|config&area=<area>`) | wala         |
| `/api/agent-skills/{id}`     | GET        | Kunin ang metadata ng isang skill                                         | wala         |
| `/api/agent-skills/{id}/raw` | GET        | Kunin ang SKILL.md bilang `text/markdown`                                 | wala         |
| `/api/agent-skills/coverage` | GET        | Mga estadistika ng coverage (kung ilang SKILL.md file ang umiiral)        | wala         |
| `/api/agent-skills/generate` | POST       | I-trigger ang generator (dryRun/prune/onlyIds)                            | pamamahala   |

Halimbawa — ilista ang lahat ng API skill:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Halimbawa — kunin ang isang SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Pagtuklas sa MCP

Tatlong MCP tool ang nakarehistro sa ilalim ng saklaw na `read:catalog`:

| Tool                              | Paglalarawan                                                   |
| :-------------------------------- | :------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Ilista ang mga skill (opsyonal na `category` / `area` filter)  |
| `omniroute_agent_skills_get`      | Kunin ang metadata + SKILL.md para sa isang skill ayon sa `id` |
| `omniroute_agent_skills_coverage` | Mga estadistika ng coverage (mayroon/kabuuan ng API/CLI)       |

Tingnan ang [MCP-SERVER.md](./MCP-SERVER.md) para sa pagkakabit ng saklaw at pagpapatunay.

---

## Pagtuklas sa A2A

Ibinabalik ng A2A skill na `list-capabilities` ang buong catalog ng 45 skill bilang isang markdown table artifact. Maaari itong i-invoke ng mga panlabas na orchestrator sa pamamagitan ng:

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

Tingnan ang [A2A-SERVER.md](./A2A-SERVER.md) para sa mga detalye ng protocol.

---

## Catalog — 45 Skill ID

### Mga API Skill (23)

| ID                     | Area            | Entry Point                          |
| :--------------------- | :-------------- | :----------------------------------- |
| `omni-auth`            | auth            | Pamamahala ng pagpapatunay + session |
| `omni-providers`       | providers       | Pamamahala ng koneksyon sa provider  |
| `omni-models`          | models          | Catalog at mga kakayahan ng model    |
| `omni-combos-routing`  | combos-routing  | Mga estratehiya sa combo routing     |
| `omni-api-keys`        | api-keys        | Pamamahala ng API key                |
| `omni-usage-logs`      | usage-logs      | Mga log ng paggamit at gastos        |
| `omni-budget`          | budget          | Mga pananggalang sa badyet           |
| `omni-settings`        | settings        | Mga pangkalahatang setting           |
| `omni-proxies`         | proxies         | Pamamahala ng proxy pool             |
| `omni-cache`           | cache           | Semantic + prompt cache              |
| `omni-compression`     | compression     | Mga engine ng context compression    |
| `omni-context-rtk`     | context-rtk     | RTK compression                      |
| `omni-resilience`      | resilience      | Mga circuit breaker + cooldown       |
| `omni-cli-tools`       | cli-tools       | REST proxy ng mga CLI tool           |
| `omni-tunnels`         | tunnels         | Pamamahala ng tunnel                 |
| `omni-sync-cloud`      | sync-cloud      | Cloud sync                           |
| `omni-db-backups`      | db-backups      | Mga backup ng database               |
| `omni-webhooks`        | webhooks        | Tagapamahagi ng webhook event        |
| `omni-mcp`             | mcp             | MCP server (110 tool, 3 transport)   |
| `omni-agents-a2a`      | agents-a2a      | A2A agent protocol                   |
| `omni-version-manager` | version-manager | Pamamahala ng bersyon at update      |
| `omni-inference`       | inference       | Direktang inference / mga completion |

### Mga CLI Skill (21)

| ID                    | Area               | Pangunahing CLI Command |
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

### Workflow ng configuration (1)

| ID                 | Saklaw           | Entry Point                       |
| :----------------- | :--------------- | :-------------------------------- |
| `config-codex-cli` | config-codex-cli | Daloy ng pagsasaayos ng Codex CLI |

---

## Paano Ginagamit ng mga External Agent ang Skills

### 1. Pagtuklas sa pamamagitan ng REST

```bash
# Kunin ang buong catalog
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Kunin ang SKILL.md para sa pag-inject ng context
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Pagtuklas sa pamamagitan ng MCP

```typescript
// Sa isang Claude Desktop / Cursor MCP client:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → array ng AgentSkill na may rawUrl para sa bawat isa
```

### 3. Pagtuklas sa pamamagitan ng A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# ang table ay isang markdown table na naglalaman ng lahat ng 45 skill ID + mga column ng rawUrl
```

### 4. Direktang GitHub raw fetch (hindi kailangan ng server)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generator

Binabasa ng generator ang piniling catalog + OpenAPI spec + CLI registry at isinusulat ang `skills/{id}/SKILL.md` para sa bawat entry:

```bash
# I-preview (dry run, walang pagsusulat)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Buong regeneration
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# I-regenerate ang mga partikular na ID
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Ang tugon ng generator ay isang `GeneratorReport`:

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

## Coverage API

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

## Kaugnay

- [SKILLS.md](./SKILLS.md) — Framework ng Omni Skills (LLM tool injection + marketplace)
- [MCP-SERVER.md](./MCP-SERVER.md) — Catalog ng MCP tool (mga tool na `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A protocol (`list-capabilities` skill)
- `src/lib/agentSkills/` — catalog, generator, mga parser
- `skills/` — mga nabuong SKILL.md file (45 entry)
