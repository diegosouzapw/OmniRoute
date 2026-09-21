# OmniRoute Agent Skills Catalog (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Źródło prawdy:** `src/lib/agentSkills/` (katalog, generator, parsery) + katalog `skills/` (pliki SKILL.md)
> **Ostatnia aktualizacja:** 2026-08-02 — v3.8.50

Agent Skills to ustrukturyzowane pliki SKILL.md, które uczą zewnętrznych agentów, klientów MCP oraz orkiestratory A2A, jak korzystać z interfejsu REST API i CLI OmniRoute. W przeciwieństwie do [Omni Skills](./SKILLS.md) (które są definicjami narzędzi LLM wykonywanymi wewnątrz OmniRoute), Agent Skills stanowią _katalog dokumentacji_ — statyczne treści markdown, które można przekazywać bezpośrednio do kontekstu agenta.

---

## Przegląd

Katalog zawiera **45 Agent Skills** (23 dotyczące REST API, 21 dotyczących CLI i 1 przepływ pracy związany z konfiguracją). Każda umiejętność ma:

- **Kanoniczny identyfikator** (`omni-auth`, `cli-serve` itd.)
- Plik **SKILL.md** w `skills/{id}/SKILL.md` z metadanymi YAML (`name`, `description`) i rozbudowaną treścią markdown
- **Endpointy REST** (umiejętności API) lub **podkomendy CLI** (umiejętności CLI) wyprowadzone ze specyfikacji OpenAPI i rejestru CLI
- **Surowy adres URL GitHub** do pobierania na bieżąco: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Architektura

```
src/shared/constants/agentSkills.ts    — starannie dobrana lista 45 pozycji (nazwa/opis/kategoria/obszar/ikona)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() zapisuje SKILL.md w skills/{id}/
  openapiParser.ts                     — wyodrębnia endpointy REST z docs/openapi.yaml
  cliRegistryParser.ts                 — wyodrębnia podkomendy CLI z bin/cli-registry.ts
  schemas.ts                           — schematy Zod: AgentSkillSchema, SkillCoverageSchema itd.
  types.ts                             — interfejsy TypeScript: AgentSkill, SkillCoverage itd.

skills/{id}/SKILL.md                   — wygenerowane i ręcznie opracowane pliki markdown (łącznie 45)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (wymagane uwierzytelnienie)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 narzędzia MCP (lista, pobieranie, pokrycie)
src/lib/a2a/skills/listCapabilities.ts        — umiejętność A2A: list-capabilities
```

---

## Format SKILL.md

```markdown
---
name: omni-providers
description: "Zarządzaj połączeniami z dostawcami: dodawaj, testuj, rotuj i usuwaj dane uwierzytelniające."
---

<!-- wygenerowano przez src/lib/agentSkills/generator.ts; ręczne zmiany zostaną nadpisane -->

## Przegląd

...

## Uwierzytelnianie

...

## Endpointy

...

<!-- skill:custom-start -->

## Sekcja niestandardowa (zachowywana podczas ponownego generowania)

...

<!-- skill:custom-end -->
```

Podczas ponownego generowania generator zachowuje zawartość między `<!-- skill:custom-start -->` a `<!-- skill:custom-end -->`. Dziesięć umiejętności zawiera ręcznie opracowane bloki niestandardowe:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Wykrywanie REST API

| Punkt końcowy                | Metoda | Opis                                                                  | Uwierzytelnianie |
| :--------------------------- | :----- | :-------------------------------------------------------------------- | :--------------- |
| `/api/agent-skills`          | GET    | Lista katalogu (opcjonalnie `?category=api\|cli\|config&area=<area>`) | brak             |
| `/api/agent-skills/{id}`     | GET    | Pobiera metadane pojedynczej umiejętności                             | brak             |
| `/api/agent-skills/{id}/raw` | GET    | Pobiera SKILL.md jako `text/markdown`                                 | brak             |
| `/api/agent-skills/coverage` | GET    | Statystyki pokrycia (liczba istniejących plików SKILL.md)             | brak             |
| `/api/agent-skills/generate` | POST   | Uruchamia generator (dryRun/prune/onlyIds)                            | zarządzanie      |

Przykład — wyświetlenie wszystkich umiejętności API:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Przykład — pobranie pojedynczego pliku SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Wykrywanie MCP

W zakresie `read:catalog` zarejestrowano trzy narzędzia MCP:

| Narzędzie                         | Opis                                                           |
| :-------------------------------- | :------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Wyświetla umiejętności (opcjonalne filtry `category` / `area`) |
| `omniroute_agent_skills_get`      | Pobiera metadane i SKILL.md jednej umiejętności według `id`    |
| `omniroute_agent_skills_coverage` | Statystyki pokrycia (dostępne/łącznie dla API/CLI)             |

Informacje o konfiguracji zakresów i uwierzytelnianiu znajdują się w pliku [MCP-SERVER.md](./MCP-SERVER.md).

---

## Wykrywanie A2A

Umiejętność A2A `list-capabilities` zwraca pełny katalog 45 umiejętności jako artefakt w postaci tabeli markdown. Zewnętrzne orkiestratory mogą ją wywołać za pomocą:

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "method": "message/send",
  "params": {
    "skill": "list-capabilities",
    "messages": [{ "role": "user", "content": "Wyświetl wszystkie możliwości" }]
  }
}
```

Szczegóły protokołu znajdują się w pliku [A2A-SERVER.md](./A2A-SERVER.md).

---

## Katalog — 45 identyfikatorów umiejętności

### Umiejętności API (23)

| ID                     | Obszar          | Punkt wejścia                                  |
| :--------------------- | :-------------- | :--------------------------------------------- |
| `omni-auth`            | auth            | Uwierzytelnianie i zarządzanie sesjami         |
| `omni-providers`       | providers       | Zarządzanie połączeniami z dostawcami          |
| `omni-models`          | models          | Katalog modeli i ich możliwości                |
| `omni-combos-routing`  | combos-routing  | Strategie routingu kombinowanego               |
| `omni-api-keys`        | api-keys        | Zarządzanie kluczami API                       |
| `omni-usage-logs`      | usage-logs      | Dzienniki użycia i kosztów                     |
| `omni-budget`          | budget          | Mechanizmy ochrony budżetu                     |
| `omni-settings`        | settings        | Ustawienia globalne                            |
| `omni-proxies`         | proxies         | Zarządzanie pulą serwerów proxy                |
| `omni-cache`           | cache           | Semantyczna pamięć podręczna i pamięć promptów |
| `omni-compression`     | compression     | Mechanizmy kompresji kontekstu                 |
| `omni-context-rtk`     | context-rtk     | Kompresja RTK                                  |
| `omni-resilience`      | resilience      | Wyłączniki obwodu i okresy karencji            |
| `omni-cli-tools`       | cli-tools       | Proxy REST dla narzędzi CLI                    |
| `omni-tunnels`         | tunnels         | Zarządzanie tunelami                           |
| `omni-sync-cloud`      | sync-cloud      | Synchronizacja z chmurą                        |
| `omni-db-backups`      | db-backups      | Kopie zapasowe bazy danych                     |
| `omni-webhooks`        | webhooks        | Dyspozytor zdarzeń webhook                     |
| `omni-mcp`             | mcp             | Serwer MCP (110 narzędzi, 3 transporty)        |
| `omni-agents-a2a`      | agents-a2a      | Protokół agentów A2A                           |
| `omni-version-manager` | version-manager | Zarządzanie wersjami i aktualizacjami          |
| `omni-inference`       | inference       | Bezpośrednie wnioskowanie / uzupełnienia       |

### Umiejętności CLI (21)

| ID                    | Obszar             | Główne polecenie CLI    |
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

### Przepływ pracy konfiguracji (1)

| ID                 | Obszar           | Punkt wejścia                            |
| :----------------- | :--------------- | :--------------------------------------- |
| `config-codex-cli` | config-codex-cli | Proces konfiguracji interfejsu Codex CLI |

---

## Jak zewnętrzni agenci korzystają z umiejętności

### 1. Wykrywanie za pomocą REST

```bash
# Pobierz pełny katalog
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Pobierz SKILL.md w celu wstrzyknięcia kontekstu
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Wykrywanie za pomocą MCP

```typescript
// W kliencie MCP Claude Desktop / Cursor:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → tablica obiektów AgentSkill, z których każdy zawiera rawUrl
```

### 3. Wykrywanie za pomocą A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table to tabela markdown zawierająca wszystkie 45 identyfikatorów umiejętności oraz kolumny rawUrl
```

### 4. Bezpośrednie pobieranie surowych plików z GitHub (serwer nie jest wymagany)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Generator

Generator odczytuje wyselekcjonowany katalog, specyfikację OpenAPI oraz rejestr CLI i zapisuje plik `skills/{id}/SKILL.md` dla każdego wpisu:

```bash
# Podgląd (przebieg próbny, bez zapisywania)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Pełne ponowne generowanie
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Ponowne generowanie określonych identyfikatorów
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Odpowiedzią generatora jest `GeneratorReport`:

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

## API pokrycia

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

## Powiązane materiały

- [SKILLS.md](./SKILLS.md) — framework Omni Skills (wstrzykiwanie narzędzi LLM + marketplace)
- [MCP-SERVER.md](./MCP-SERVER.md) — katalog narzędzi MCP (narzędzia `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — protokół A2A (umiejętność `list-capabilities`)
- `src/lib/agentSkills/` — katalog, generator, parsery
- `skills/` — wygenerowane pliki SKILL.md (45 wpisów)
