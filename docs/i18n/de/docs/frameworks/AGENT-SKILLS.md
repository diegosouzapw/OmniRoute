# OmniRoute Agent Skills Catalog (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Maßgebliche Quelle:** `src/lib/agentSkills/` (Katalog, Generator, Parser) + Verzeichnis `skills/` (SKILL.md-Dateien)
> **Zuletzt aktualisiert:** 2026-08-02 — v3.8.50

Agent Skills sind strukturierte SKILL.md-Dateien, die externen Agenten, MCP-Clients und A2A-Orchestratoren vermitteln, wie die REST-API und CLI von OmniRoute verwendet werden. Im Gegensatz zu [Omni Skills](./SKILLS.md) (LLM-Tooldefinitionen, die innerhalb von OmniRoute ausgeführt werden) sind Agent Skills ein _Dokumentationskatalog_ — statisches Markdown, das direkt in den Kontext eines Agenten eingebunden werden kann.

---

## Übersicht

Der Katalog enthält **45 Agent Skills** (23 für die REST-API + 21 für die CLI + 1 Konfigurations-Workflow). Jeder Skill verfügt über:

- Eine **kanonische ID** (`omni-auth`, `cli-serve` usw.)
- Eine **SKILL.md-Datei** unter `skills/{id}/SKILL.md` mit YAML-Frontmatter (`name`, `description`) und einem ausführlichen Markdown-Inhalt
- **REST-Endpunkte** (API-Skills) oder **CLI-Unterbefehle** (CLI-Skills), die aus der OpenAPI-Spezifikation und der CLI-Registry abgeleitet werden
- Eine **GitHub-Raw-URL** zum direkten Abruf: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Architektur

```
src/shared/constants/agentSkills.ts    — Kuratierte Liste mit 45 Einträgen (Name/Beschreibung/Kategorie/Bereich/Symbol)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() schreibt SKILL.md nach skills/{id}/
  openapiParser.ts                     — Extrahiert REST-Endpunkte aus docs/openapi.yaml
  cliRegistryParser.ts                 — Extrahiert CLI-Unterbefehle aus bin/cli-registry.ts
  schemas.ts                           — Zod-Schemas: AgentSkillSchema, SkillCoverageSchema usw.
  types.ts                             — TypeScript-Schnittstellen: AgentSkill, SkillCoverage usw.

skills/{id}/SKILL.md                   — Generierte und kuratierte Markdown-Dateien (insgesamt 45)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (Authentifizierung erforderlich)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 MCP-Tools (Auflisten, Abrufen, Abdeckung)
src/lib/a2a/skills/listCapabilities.ts        — A2A-Skill: list-capabilities
```

---

## SKILL.md-Format

```markdown
---
name: omni-providers
description: "Anbieterverbindungen verwalten: Anmeldedaten hinzufügen, testen, rotieren und entfernen."
---

<!-- generiert von src/lib/agentSkills/generator.ts; manuelle Änderungen werden überschrieben -->

## Übersicht

...

## Authentifizierung

...

## Endpunkte

...

<!-- skill:custom-start -->

## Benutzerdefinierter Abschnitt (bleibt bei der Neugenerierung erhalten)

...

<!-- skill:custom-end -->
```

Der Generator behält bei der Neugenerierung den Inhalt zwischen `<!-- skill:custom-start -->` und `<!-- skill:custom-end -->` bei. Zehn Skills verfügen über kuratierte benutzerdefinierte Blöcke:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## REST-API-Erkennung

| Endpunkt                     | Methode | Beschreibung                                                          | Authentifizierung |
| :--------------------------- | :------ | :-------------------------------------------------------------------- | :---------------- |
| `/api/agent-skills`          | GET     | Katalog auflisten (optional `?category=api\|cli\|config&area=<area>`) | keine             |
| `/api/agent-skills/{id}`     | GET     | Metadaten einer einzelnen Fähigkeit abrufen                           | keine             |
| `/api/agent-skills/{id}/raw` | GET     | SKILL.md als `text/markdown` abrufen                                  | keine             |
| `/api/agent-skills/coverage` | GET     | Abdeckungsstatistiken (Anzahl der vorhandenen SKILL.md-Dateien)       | keine             |
| `/api/agent-skills/generate` | POST    | Generator auslösen (dryRun/prune/onlyIds)                             | Verwaltung        |

Beispiel — alle API-Fähigkeiten auflisten:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Beispiel — eine einzelne SKILL.md abrufen:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## MCP-Erkennung

Drei MCP-Werkzeuge sind unter dem Geltungsbereich `read:catalog` registriert:

| Werkzeug                          | Beschreibung                                                      |
| :-------------------------------- | :---------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Fähigkeiten auflisten (optionale Filter `category` / `area`)      |
| `omniroute_agent_skills_get`      | Metadaten + SKILL.md für eine Fähigkeit anhand ihrer `id` abrufen |
| `omniroute_agent_skills_coverage` | Abdeckungsstatistiken (vorhandene/gesamte API-/CLI-Fähigkeiten)   |

Informationen zur Verknüpfung von Geltungsbereichen und zur Authentifizierung finden Sie unter [MCP-SERVER.md](./MCP-SERVER.md).

---

## A2A-Erkennung

Die A2A-Fähigkeit `list-capabilities` gibt den vollständigen Katalog mit 45 Fähigkeiten als Markdown-Tabellenartefakt zurück. Externe Orchestratoren können sie wie folgt aufrufen:

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

Protokolldetails finden Sie unter [A2A-SERVER.md](./A2A-SERVER.md).

---

## Katalog — 45 Fähigkeits-IDs

### API-Fähigkeiten (23)

| ID                     | Bereich         | Einstiegspunkt                             |
| :--------------------- | :-------------- | :----------------------------------------- |
| `omni-auth`            | auth            | Authentifizierungs- und Sitzungsverwaltung |
| `omni-providers`       | providers       | Verwaltung von Anbieter-Verbindungen       |
| `omni-models`          | models          | Modellkatalog und Funktionen               |
| `omni-combos-routing`  | combos-routing  | Combo-Routing-Strategien                   |
| `omni-api-keys`        | api-keys        | API-Schlüsselverwaltung                    |
| `omni-usage-logs`      | usage-logs      | Nutzungs- und Kostenprotokolle             |
| `omni-budget`          | budget          | Budgetbegrenzungen                         |
| `omni-settings`        | settings        | Globale Einstellungen                      |
| `omni-proxies`         | proxies         | Proxy-Pool-Verwaltung                      |
| `omni-cache`           | cache           | Semantischer Cache + Prompt-Cache          |
| `omni-compression`     | compression     | Engines zur Kontextkomprimierung           |
| `omni-context-rtk`     | context-rtk     | RTK-Komprimierung                          |
| `omni-resilience`      | resilience      | Leistungsschalter + Abkühlzeiten           |
| `omni-cli-tools`       | cli-tools       | REST-Proxy für CLI-Werkzeuge               |
| `omni-tunnels`         | tunnels         | Tunnelverwaltung                           |
| `omni-sync-cloud`      | sync-cloud      | Cloud-Synchronisierung                     |
| `omni-db-backups`      | db-backups      | Datenbanksicherungen                       |
| `omni-webhooks`        | webhooks        | Dispatcher für Webhook-Ereignisse          |
| `omni-mcp`             | mcp             | MCP-Server (110 Werkzeuge, 3 Transporte)   |
| `omni-agents-a2a`      | agents-a2a      | A2A-Agentenprotokoll                       |
| `omni-version-manager` | version-manager | Versions- und Aktualisierungsverwaltung    |
| `omni-inference`       | inference       | Direkte Inferenz / Vervollständigungen     |

### CLI-Fähigkeiten (21)

| ID                    | Bereich            | CLI-Befehlsstamm        |
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

### Konfigurationsworkflow (1)

| ID                 | Bereich          | Einstiegspunkt                       |
| :----------------- | :--------------- | :----------------------------------- |
| `config-codex-cli` | config-codex-cli | Konfigurationsworkflow der Codex CLI |

---

## Wie externe Agenten Skills verwenden

### 1. Ermittlung über REST

```bash
# Den vollständigen Katalog abrufen
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# SKILL.md zur Kontexteinspeisung abrufen
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Ermittlung über MCP

```typescript
// In einem Claude-Desktop-/Cursor-MCP-Client:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → Array von AgentSkill, jeweils mit rawUrl
```

### 3. Ermittlung über A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table ist eine Markdown-Tabelle mit allen 45 Skill-IDs und rawUrl-Spalten
```

### 4. Direkter GitHub-Raw-Abruf (kein Server erforderlich)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generator

Der Generator liest den kuratierten Katalog, die OpenAPI-Spezifikation und die CLI-Registry und schreibt für jeden Eintrag `skills/{id}/SKILL.md`:

```bash
# Vorschau (Testlauf, keine Schreibvorgänge)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Vollständige Neugenerierung
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Bestimmte IDs neu generieren
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Die Antwort des Generators ist ein `GeneratorReport`:

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

## Abdeckungs-API

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

## Verwandte Inhalte

- [SKILLS.md](./SKILLS.md) — Omni-Skills-Framework (LLM-Tool-Injektion + Marktplatz)
- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-Tool-Katalog (`omniroute_agent_skills_*`-Tools)
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A-Protokoll (`list-capabilities`-Skill)
- `src/lib/agentSkills/` — Katalog, Generator, Parser
- `skills/` — generierte SKILL.md-Dateien (45 Einträge)
