# OmniRoute Agent Skills Catalog (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Totuuden lähde:** `src/lib/agentSkills/` (luettelo, generaattori, jäsentimet) + `skills/`-hakemisto (SKILL.md-tiedostot)
> **Viimeksi päivitetty:** 2026-08-02 — v3.8.50

Agent Skills ovat rakenteisia SKILL.md-tiedostoja, jotka opastavat ulkoisia agentteja, MCP-asiakkaita ja A2A-orkestroijia OmniRouten REST API:n ja CLI:n käytössä. Toisin kuin [Omni Skills](./SKILLS.md) (jotka ovat OmniRouten sisällä suoritettavia LLM-työkalumäärittelyjä), Agent Skills on _dokumentaatioluettelo_ — staattista markdown-sisältöä, joka voidaan syöttää suoraan agentin kontekstiin.

---

## Yleiskatsaus

Luettelo sisältää **45 Agent Skilliä** (23 REST API + 21 CLI + 1 määritystyönkulku). Jokaisella skillillä on:

- **Kanoninen tunniste** (`omni-auth`, `cli-serve` jne.)
- **SKILL.md**-tiedosto polussa `skills/{id}/SKILL.md`, joka sisältää YAML-alkumetadatan (`name`, `description`) ja monipuolisen markdown-rungon
- OpenAPI-määrityksestä ja CLI-rekisteristä johdetut **REST-päätepisteet** (API-skillit) tai **CLI-alikomennot** (CLI-skillit)
- **GitHubin raakasisällön URL-osoite** reaaliaikaista noutoa varten: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Arkkitehtuuri

```
src/shared/constants/agentSkills.ts    — 45 kohdan kuratoitu luettelo (nimi/kuvaus/luokka/alue/kuvake)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() kirjoittaa SKILL.md-tiedoston hakemistoon skills/{id}/
  openapiParser.ts                     — poimii REST-päätepisteet tiedostosta docs/openapi.yaml
  cliRegistryParser.ts                 — poimii CLI-alikomennot tiedostosta bin/cli-registry.ts
  schemas.ts                           — Zod-skeemat: AgentSkillSchema, SkillCoverageSchema jne.
  types.ts                             — TypeScript-rajapinnat: AgentSkill, SkillCoverage jne.

skills/{id}/SKILL.md                   — Generoidut ja kuratoidut markdown-tiedostot (yhteensä 45)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (todennus vaaditaan)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 MCP-työkalua (luettelo, nouto, kattavuus)
src/lib/a2a/skills/listCapabilities.ts        — A2A-skill: list-capabilities
```

---

## SKILL.md-muoto

```markdown
---
name: omni-providers
description: "Hallitse palveluntarjoajayhteyksiä: lisää, testaa, kierrätä ja poista tunnistetietoja."
---

<!-- generoitu tiedostolla src/lib/agentSkills/generator.ts; manuaaliset muokkaukset korvataan -->

## Yleiskatsaus

...

## Todennus

...

## Päätepisteet

...

<!-- skill:custom-start -->

## Mukautettu osio (säilytetään uudelleengeneroinnin yhteydessä)

...

<!-- skill:custom-end -->
```

Generaattori säilyttää tunnisteiden `<!-- skill:custom-start -->` ja `<!-- skill:custom-end -->` välisen sisällön uudelleengeneroinnin yhteydessä. Kymmenellä skillillä on kuratoidut mukautetut lohkot:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## REST API -löytäminen

| Päätepiste                   | Menetelmä | Kuvaus                                                                   | Todennus  |
| :--------------------------- | :-------- | :----------------------------------------------------------------------- | :-------- |
| `/api/agent-skills`          | GET       | Luettele katalogi (valinnainen `?category=api\|cli\|config&area=<area>`) | ei mitään |
| `/api/agent-skills/{id}`     | GET       | Hae yksittäisen taidon metatiedot                                        | ei mitään |
| `/api/agent-skills/{id}/raw` | GET       | Hae SKILL.md muodossa `text/markdown`                                    | ei mitään |
| `/api/agent-skills/coverage` | GET       | Kattavuustilastot (kuinka monta SKILL.md-tiedostoa on olemassa)          | ei mitään |
| `/api/agent-skills/generate` | POST      | Käynnistä generaattori (dryRun/prune/onlyIds)                            | hallinta  |

Esimerkki — luettele kaikki API-taidot:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Esimerkki — hae yksittäinen SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## MCP-löytäminen

Kolme MCP-työkalua on rekisteröity käyttöalueeseen `read:catalog`:

| Työkalu                           | Kuvaus                                                             |
| :-------------------------------- | :----------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Luettele taidot (valinnaiset `category`- / `area`-suodattimet)     |
| `omniroute_agent_skills_get`      | Hae yhden taidon metatiedot + SKILL.md tunnisteen `id` perusteella |
| `omniroute_agent_skills_coverage` | Kattavuustilastot (API/CLI: olemassa/yhteensä)                     |

Katso käyttöalueen kytkennät ja todennus tiedostosta [MCP-SERVER.md](./MCP-SERVER.md).

---

## A2A-löytäminen

A2A-taito `list-capabilities` palauttaa koko 45 taidon katalogin markdown-taulukkoartefaktina. Ulkoiset orkestroijat voivat kutsua sitä seuraavasti:

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

Katso protokollan tiedot tiedostosta [A2A-SERVER.md](./A2A-SERVER.md).

---

## Katalogi — 45 taitotunnistetta

### API-taidot (23)

| ID                     | Alue            | Aloituspiste                               |
| :--------------------- | :-------------- | :----------------------------------------- |
| `omni-auth`            | auth            | Todennuksen ja istuntojen hallinta         |
| `omni-providers`       | providers       | Palveluntarjoajayhteyksien hallinta        |
| `omni-models`          | models          | Mallikatalogi ja ominaisuudet              |
| `omni-combos-routing`  | combos-routing  | Yhdistelmäreititysstrategiat               |
| `omni-api-keys`        | api-keys        | API-avainten hallinta                      |
| `omni-usage-logs`      | usage-logs      | Käyttö- ja kustannuslokit                  |
| `omni-budget`          | budget          | Budjettirajoitukset                        |
| `omni-settings`        | settings        | Yleiset asetukset                          |
| `omni-proxies`         | proxies         | Välityspalvelinpoolin hallinta             |
| `omni-cache`           | cache           | Semanttinen välimuisti + kehotevälimuisti  |
| `omni-compression`     | compression     | Kontekstin pakkausmoottorit                |
| `omni-context-rtk`     | context-rtk     | RTK-pakkaus                                |
| `omni-resilience`      | resilience      | Katkaisijat + jäähdytysajat                |
| `omni-cli-tools`       | cli-tools       | CLI-työkalujen REST-välityspalvelin        |
| `omni-tunnels`         | tunnels         | Tunnelien hallinta                         |
| `omni-sync-cloud`      | sync-cloud      | Pilvisynkronointi                          |
| `omni-db-backups`      | db-backups      | Tietokannan varmuuskopiot                  |
| `omni-webhooks`        | webhooks        | Webhook-tapahtumien välittäjä              |
| `omni-mcp`             | mcp             | MCP-palvelin (110 työkalua, 3 siirtotapaa) |
| `omni-agents-a2a`      | agents-a2a      | A2A-agenttiprotokolla                      |
| `omni-version-manager` | version-manager | Versioiden ja päivitysten hallinta         |
| `omni-inference`       | inference       | Suora päättely / täydennykset              |

### CLI-taidot (21)

| ID                    | Alue               | CLI-komennon juuri      |
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

### Määritystyönkulku (1)

| Tunnus             | Alue             | Aloituskohta                      |
| :----------------- | :--------------- | :-------------------------------- |
| `config-codex-cli` | config-codex-cli | Codex CLI:n määrityksen työnkulku |

---

## Miten ulkoiset agentit käyttävät taitoja

### 1. Haku REST-rajapinnan kautta

```bash
# Hae koko luettelo
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Hae SKILL.md kontekstin lisäämistä varten
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Haku MCP:n kautta

```typescript
// Claude Desktop- / Cursor MCP -asiakasohjelmassa:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → AgentSkill-olioiden taulukko, jossa jokaisella on rawUrl
```

### 3. Haku A2A:n kautta

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table on markdown-taulukko, jossa ovat kaikkien 45 taidon tunnukset ja rawUrl-sarakkeet
```

### 4. Suora haku GitHubin raw-sisällöstä (palvelinta ei tarvita)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generaattori

Generaattori lukee kuratoidun luettelon, OpenAPI-määrityksen ja CLI-rekisterin sekä kirjoittaa kullekin tietueelle tiedoston `skills/{id}/SKILL.md`:

```bash
# Esikatselu (koeajo, ei kirjoituksia)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Täysi uudelleengenerointi
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Generoi tietyt tunnukset uudelleen
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Generaattorin vastaus on `GeneratorReport`:

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

## Kattavuusrajapinta

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

## Aiheeseen liittyvät

- [SKILLS.md](./SKILLS.md) — Omni Skills -kehys (LLM-työkalujen injektointi + markkinapaikka)
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-työkaluluettelo (`omniroute_agent_skills_*`-työkalut)
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A-protokolla (`list-capabilities`-taito)
- `src/lib/agentSkills/` — luettelo, generaattori ja jäsentimet
- `skills/` — generoidut SKILL.md-tiedostot (45 tietuetta)
