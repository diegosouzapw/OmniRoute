# OmniRoute Agent Skills Catalog (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Izvor istine:** `src/lib/agentSkills/` (katalog, generator, parseri) + direktorij `skills/` (datoteke SKILL.md)
> **Posljednje ažuriranje:** 2026-08-02 — v3.8.50

Agent Skills strukturirane su datoteke SKILL.md koje vanjske agente, MCP klijente i A2A orkestratore podučavaju kako koristiti REST API i CLI sustava OmniRoute. Za razliku od [Omni Skills](./SKILLS.md) (koje su definicije LLM alata koje se izvršavaju unutar sustava OmniRoute), Agent Skills predstavljaju _katalog dokumentacije_ — statični markdown koji se može izravno učitati u kontekst agenta.

---

## Pregled

Katalog sadrži **45 Agent Skills** (23 za REST API + 21 za CLI + 1 tijek rada za konfiguraciju). Svaka vještina ima:

- **Kanonski ID** (`omni-auth`, `cli-serve` itd.)
- Datoteku **SKILL.md** u `skills/{id}/SKILL.md` s YAML zaglavljem (`name`, `description`) i bogatim markdown sadržajem
- **REST krajnje točke** (API vještine) ili **CLI podnaredbe** (CLI vještine) izvedene iz OpenAPI specifikacije i CLI registra
- **GitHub neobrađeni URL** za dohvaćanje uživo: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Arhitektura

```
src/shared/constants/agentSkills.ts    — Ručno odabran popis od 45 stavki (naziv/opis/kategorija/područje/ikona)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() zapisuje SKILL.md u skills/{id}/
  openapiParser.ts                     — izdvaja REST krajnje točke iz docs/openapi.yaml
  cliRegistryParser.ts                 — izdvaja CLI podnaredbe iz bin/cli-registry.ts
  schemas.ts                           — Zod sheme: AgentSkillSchema, SkillCoverageSchema itd.
  types.ts                             — TypeScript sučelja: AgentSkill, SkillCoverage itd.

skills/{id}/SKILL.md                   — Generirane i ručno uređene markdown datoteke (ukupno 45)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (potrebna je autentifikacija)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 MCP alata (popis, dohvaćanje, pokrivenost)
src/lib/a2a/skills/listCapabilities.ts        — A2A vještina: list-capabilities
```

---

## Format SKILL.md

```markdown
---
name: omni-providers
description: "Upravljajte vezama s pružateljima: dodajte, testirajte, rotirajte i uklanjajte vjerodajnice."
---

<!-- generirano pomoću src/lib/agentSkills/generator.ts; ručne izmjene bit će prebrisane -->

## Pregled

...

## Autentifikacija

...

## Krajnje točke

...

<!-- skill:custom-start -->

## Prilagođeni odjeljak (zadržava se pri ponovnom generiranju)

...

<!-- skill:custom-end -->
```

Generator tijekom ponovnog generiranja zadržava sadržaj između `<!-- skill:custom-start -->` i `<!-- skill:custom-end -->`. Deset vještina ima ručno uređene prilagođene blokove:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Otkrivanje REST API-ja

| Krajnja točka                | Metoda | Opis                                                                 | Autorizacija  |
| :--------------------------- | :----- | :------------------------------------------------------------------- | :------------ |
| `/api/agent-skills`          | GET    | Popis kataloga (neobavezno `?category=api\|cli\|config&area=<area>`) | nije potrebna |
| `/api/agent-skills/{id}`     | GET    | Dohvaćanje metapodataka pojedinačne vještine                         | nije potrebna |
| `/api/agent-skills/{id}/raw` | GET    | Dohvaćanje datoteke SKILL.md kao `text/markdown`                     | nije potrebna |
| `/api/agent-skills/coverage` | GET    | Statistika pokrivenosti (koliko datoteka SKILL.md postoji)           | nije potrebna |
| `/api/agent-skills/generate` | POST   | Pokretanje generatora (dryRun/prune/onlyIds)                         | upravljačka   |

Primjer — popis svih API vještina:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Primjer — dohvaćanje pojedinačne datoteke SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Otkrivanje MCP-a

Tri MCP alata registrirana su u opsegu `read:catalog`:

| Alat                              | Opis                                                               |
| :-------------------------------- | :----------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Popis vještina (neobavezni filtri `category` / `area`)             |
| `omniroute_agent_skills_get`      | Dohvaćanje metapodataka i datoteke SKILL.md za vještinu prema `id` |
| `omniroute_agent_skills_coverage` | Statistika pokrivenosti (dostupno/ukupno za API/CLI)               |

Pogledajte [MCP-SERVER.md](./MCP-SERVER.md) za povezivanje opsega i autentifikaciju.

---

## Otkrivanje A2A-a

A2A vještina `list-capabilities` vraća potpuni katalog od 45 vještina kao artefakt u obliku markdown tablice. Vanjski orkestratori mogu je pozvati putem:

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

Pogledajte [A2A-SERVER.md](./A2A-SERVER.md) za pojedinosti o protokolu.

---

## Katalog — 45 ID-jeva vještina

### API vještine (23)

| ID                     | Područje        | Ulazna točka                                  |
| :--------------------- | :-------------- | :-------------------------------------------- |
| `omni-auth`            | auth            | Upravljanje autentifikacijom i sesijama       |
| `omni-providers`       | providers       | Upravljanje vezama s pružateljima             |
| `omni-models`          | models          | Katalog modela i mogućnosti                   |
| `omni-combos-routing`  | combos-routing  | Strategije kombiniranog usmjeravanja          |
| `omni-api-keys`        | api-keys        | Upravljanje API ključevima                    |
| `omni-usage-logs`      | usage-logs      | Zapisi o upotrebi i troškovima                |
| `omni-budget`          | budget          | Ograničenja proračuna                         |
| `omni-settings`        | settings        | Globalne postavke                             |
| `omni-proxies`         | proxies         | Upravljanje skupom proxy poslužitelja         |
| `omni-cache`           | cache           | Semantička predmemorija i predmemorija upita  |
| `omni-compression`     | compression     | Mehanizmi kompresije konteksta                |
| `omni-context-rtk`     | context-rtk     | RTK kompresija                                |
| `omni-resilience`      | resilience      | Prekidači strujnog kruga i razdoblja hlađenja |
| `omni-cli-tools`       | cli-tools       | REST proxy za CLI alate                       |
| `omni-tunnels`         | tunnels         | Upravljanje tunelima                          |
| `omni-sync-cloud`      | sync-cloud      | Sinkronizacija s oblakom                      |
| `omni-db-backups`      | db-backups      | Sigurnosne kopije baze podataka               |
| `omni-webhooks`        | webhooks        | Dispečer webhook događaja                     |
| `omni-mcp`             | mcp             | MCP poslužitelj (110 alata, 3 prijenosa)      |
| `omni-agents-a2a`      | agents-a2a      | Protokol A2A agenata                          |
| `omni-version-manager` | version-manager | Upravljanje verzijama i ažuriranjima          |
| `omni-inference`       | inference       | Izravno zaključivanje / dovršavanja           |

### CLI vještine (21)

| ID                    | Područje           | Korijenska CLI naredba  |
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

### Tijek rada konfiguracije (1)

| ID                 | Područje         | Ulazna točka                     |
| :----------------- | :--------------- | :------------------------------- |
| `config-codex-cli` | config-codex-cli | Tijek konfiguracije Codex CLI-ja |

---

## Kako vanjski agenti koriste vještine

### 1. Otkrivanje putem REST-a

```bash
# Dohvati cijeli katalog
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Dohvati SKILL.md za umetanje konteksta
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Otkrivanje putem MCP-a

```typescript
// U Claude Desktop / Cursor MCP klijentu:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → polje objekata AgentSkill, svaki s rawUrl
```

### 3. Otkrivanje putem A2A-a

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table je Markdown tablica sa svih 45 ID-jeva vještina i stupcima rawUrl
```

### 4. Izravno dohvaćanje sirovog sadržaja s GitHuba (poslužitelj nije potreban)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generator

Generator čita uređeni katalog, OpenAPI specifikaciju i CLI registar te za svaki unos zapisuje `skills/{id}/SKILL.md`:

```bash
# Pretpregled (probno pokretanje, bez zapisivanja)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Potpuna ponovna generacija
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Ponovno generiraj određene ID-jeve
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Odgovor generatora jest `GeneratorReport`:

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

## API pokrivenosti

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

## Povezano

- [SKILLS.md](./SKILLS.md) — okvir Omni Skills (umetanje LLM alata + tržište)
- [MCP-SERVER.md](./MCP-SERVER.md) — katalog MCP alata (alati `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A protokol (vještina `list-capabilities`)
- `src/lib/agentSkills/` — katalog, generator, parseri
- `skills/` — generirane datoteke SKILL.md (45 unosa)
