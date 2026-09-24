# OmniRoute Agent Skills Catalog (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Sursa adevărului:** `src/lib/agentSkills/` (catalog, generator, parsere) + directorul `skills/` (fișiere SKILL.md)
> **Ultima actualizare:** 2026-08-02 — v3.8.50

Agent Skills sunt fișiere SKILL.md structurate care învață agenții externi, clienții MCP și orchestratoarele A2A cum să utilizeze API-ul REST și CLI-ul OmniRoute. Spre deosebire de [Omni Skills](./SKILLS.md) (care sunt definiții ale instrumentelor LLM executate în cadrul OmniRoute), Agent Skills reprezintă un _catalog de documentație_ — conținut markdown static care poate fi introdus direct în contextul agentului.

---

## Prezentare generală

Catalogul conține **45 de Agent Skills** (23 pentru API-ul REST + 21 pentru CLI + 1 flux de lucru pentru configurare). Fiecare skill are:

- Un **ID canonic** (`omni-auth`, `cli-serve` etc.)
- Un fișier **SKILL.md** în `skills/{id}/SKILL.md`, cu frontmatter YAML (`name`, `description`) + un corp markdown detaliat
- **Endpointuri REST** (skill-uri API) sau **subcomenzi CLI** (skill-uri CLI), derivate din specificația OpenAPI și registrul CLI
- Un **URL GitHub raw** pentru preluare în timp real: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Arhitectură

```
src/shared/constants/agentSkills.ts    — listă curatoriată cu 45 de intrări (nume/descriere/categorie/zonă/pictogramă)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() scrie SKILL.md în skills/{id}/
  openapiParser.ts                     — extrage endpointurile REST din docs/openapi.yaml
  cliRegistryParser.ts                 — extrage subcomenzile CLI din bin/cli-registry.ts
  schemas.ts                           — scheme Zod: AgentSkillSchema, SkillCoverageSchema etc.
  types.ts                             — interfețe TypeScript: AgentSkill, SkillCoverage etc.

skills/{id}/SKILL.md                   — Fișiere markdown generate + curatoriate (45 în total)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (necesită autentificare)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 instrumente MCP (listare, obținere, acoperire)
src/lib/a2a/skills/listCapabilities.ts        — skill A2A: list-capabilities
```

---

## Formatul SKILL.md

```markdown
---
name: omni-providers
description: "Gestionați conexiunile furnizorilor: adăugați, testați, rotiți și eliminați acreditările."
---

<!-- generat de src/lib/agentSkills/generator.ts; modificările manuale vor fi suprascrise -->

## Prezentare generală

...

## Autentificare

...

## Endpointuri

...

<!-- skill:custom-start -->

## Secțiune personalizată (păstrată între regenerări)

...

<!-- skill:custom-end -->
```

Generatorul păstrează la regenerare conținutul dintre `<!-- skill:custom-start -->` și `<!-- skill:custom-end -->`. Zece skill-uri au blocuri personalizate curatoriate:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Descoperirea API-ului REST

| Endpoint                     | Metodă | Descriere                                                              | Autentificare |
| :--------------------------- | :----- | :--------------------------------------------------------------------- | :------------ |
| `/api/agent-skills`          | GET    | Listează catalogul (`?category=api\|cli\|config&area=<area>` opțional) | niciuna       |
| `/api/agent-skills/{id}`     | GET    | Obține metadatele unei singure abilități                               | niciuna       |
| `/api/agent-skills/{id}/raw` | GET    | Preia SKILL.md ca `text/markdown`                                      | niciuna       |
| `/api/agent-skills/coverage` | GET    | Statistici de acoperire (câte fișiere SKILL.md există)                 | niciuna       |
| `/api/agent-skills/generate` | POST   | Declanșează generatorul (dryRun/prune/onlyIds)                         | administrare  |

Exemplu — listează toate abilitățile API:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Exemplu — preia un singur fișier SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Descoperirea MCP

Trei instrumente MCP sunt înregistrate în domeniul `read:catalog`:

| Instrument                        | Descriere                                                   |
| :-------------------------------- | :---------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Listează abilitățile (filtre opționale `category` / `area`) |
| `omniroute_agent_skills_get`      | Obține metadatele + SKILL.md pentru o abilitate după `id`   |
| `omniroute_agent_skills_coverage` | Statistici de acoperire (API/CLI existente/total)           |

Consultați [MCP-SERVER.md](./MCP-SERVER.md) pentru configurarea domeniilor și autentificare.

---

## Descoperirea A2A

Abilitatea A2A `list-capabilities` returnează catalogul complet cu 45 de abilități ca artefact sub forma unui tabel markdown. Orchestratoarele externe o pot invoca prin:

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

Consultați [A2A-SERVER.md](./A2A-SERVER.md) pentru detalii despre protocol.

---

## Catalog — 45 de ID-uri de abilități

### Abilități API (23)

| ID                     | Domeniu         | Punct de intrare                              |
| :--------------------- | :-------------- | :-------------------------------------------- |
| `omni-auth`            | auth            | Autentificare + gestionarea sesiunilor        |
| `omni-providers`       | providers       | Gestionarea conexiunilor la furnizori         |
| `omni-models`          | models          | Catalogul și capabilitățile modelelor         |
| `omni-combos-routing`  | combos-routing  | Strategii combinate de rutare                 |
| `omni-api-keys`        | api-keys        | Gestionarea cheilor API                       |
| `omni-usage-logs`      | usage-logs      | Jurnale de utilizare și costuri               |
| `omni-budget`          | budget          | Mecanisme de protecție a bugetului            |
| `omni-settings`        | settings        | Setări globale                                |
| `omni-proxies`         | proxies         | Gestionarea grupului de servere proxy         |
| `omni-cache`           | cache           | Cache semantic + pentru prompturi             |
| `omni-compression`     | compression     | Motoare de compresie a contextului            |
| `omni-context-rtk`     | context-rtk     | Compresie RTK                                 |
| `omni-resilience`      | resilience      | Întrerupătoare de circuit + perioade de pauză |
| `omni-cli-tools`       | cli-tools       | Proxy REST pentru instrumentele CLI           |
| `omni-tunnels`         | tunnels         | Gestionarea tunelurilor                       |
| `omni-sync-cloud`      | sync-cloud      | Sincronizare în cloud                         |
| `omni-db-backups`      | db-backups      | Copii de rezervă ale bazei de date            |
| `omni-webhooks`        | webhooks        | Dispecer de evenimente webhook                |
| `omni-mcp`             | mcp             | Server MCP (110 instrumente, 3 transporturi)  |
| `omni-agents-a2a`      | agents-a2a      | Protocol pentru agenți A2A                    |
| `omni-version-manager` | version-manager | Gestionarea versiunilor și actualizărilor     |
| `omni-inference`       | inference       | Inferență directă / completări                |

### Abilități CLI (21)

| ID                    | Domeniu            | Comandă CLI principală  |
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

### Flux de lucru pentru configurare (1)

| ID                 | Zonă             | Punct de intrare                     |
| :----------------- | :--------------- | :----------------------------------- |
| `config-codex-cli` | config-codex-cli | Flux de configurare pentru Codex CLI |

---

## Cum consumă agenții externi abilitățile

### 1. Descoperire prin REST

```bash
# Obține catalogul complet
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Obține SKILL.md pentru injectarea contextului
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Descoperire prin MCP

```typescript
// Într-un client MCP Claude Desktop / Cursor:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → matrice de obiecte AgentSkill, fiecare având rawUrl
```

### 3. Descoperire prin A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table este un tabel markdown cu toate cele 45 de ID-uri ale abilităților + coloanele rawUrl
```

### 4. Preluare directă din GitHub raw (nu este necesar un server)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generator

Generatorul citește catalogul gestionat + specificația OpenAPI + registrul CLI și scrie `skills/{id}/SKILL.md` pentru fiecare intrare:

```bash
# Previzualizare (rulare de probă, fără scrieri)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Regenerare completă
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Regenerează anumite ID-uri
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Răspunsul generatorului este un `GeneratorReport`:

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

## API de acoperire

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

## Resurse asociate

- [SKILLS.md](./SKILLS.md) — cadrul Omni Skills (injectarea instrumentelor LLM + marketplace)
- [MCP-SERVER.md](./MCP-SERVER.md) — catalogul de instrumente MCP (instrumentele `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — protocolul A2A (abilitatea `list-capabilities`)
- `src/lib/agentSkills/` — catalog, generator, analizoare
- `skills/` — fișiere SKILL.md generate (45 de intrări)
