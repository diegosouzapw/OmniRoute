# OmniRoute Agent Skills Catalog (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/AGENT-SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/AGENT-SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/AGENT-SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/AGENT-SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/AGENT-SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/AGENT-SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/AGENT-SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/AGENT-SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/AGENT-SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/AGENT-SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/AGENT-SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/AGENT-SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/AGENT-SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/AGENT-SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/AGENT-SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/AGENT-SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/AGENT-SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/AGENT-SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/AGENT-SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/AGENT-SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/AGENT-SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/AGENT-SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/AGENT-SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/AGENT-SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/AGENT-SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/AGENT-SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/AGENT-SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/AGENT-SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/AGENT-SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/AGENT-SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/AGENT-SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/AGENT-SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/AGENT-SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/AGENT-SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/AGENT-SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/AGENT-SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/AGENT-SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/AGENT-SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/AGENT-SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/AGENT-SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/AGENT-SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/AGENT-SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/AGENT-SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/AGENT-SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/AGENT-SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/AGENT-SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/AGENT-SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/AGENT-SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/AGENT-SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/AGENT-SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/AGENT-SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/AGENT-SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/AGENT-SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/AGENT-SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/AGENT-SKILLS.md)

---

> **Източник на истината:** `src/lib/agentSkills/` (каталог, генератор, анализатори) + директорията `skills/` (файлове SKILL.md)
> **Последна актуализация:** 2026-08-02 — v3.8.50

Agent Skills представляват структурирани файлове SKILL.md, които обучават външни агенти, MCP клиенти и A2A оркестратори как да използват REST API и CLI на OmniRoute. За разлика от [Omni Skills](./SKILLS.md) (които са дефиниции на LLM инструменти, изпълнявани в OmniRoute), Agent Skills са _каталог с документация_ — статичен markdown, който може да бъде подаден директно в контекста на агент.

---

## Общ преглед

Каталогът съдържа **45 Agent Skills** (23 за REST API + 21 за CLI + 1 работен процес за конфигуриране). Всяко умение има:

- **Каноничен идентификатор** (`omni-auth`, `cli-serve` и т.н.)
- Файл **SKILL.md** в `skills/{id}/SKILL.md` с YAML метаданни (`name`, `description`) + богато markdown съдържание
- **REST крайни точки** (API умения) или **CLI подкоманди** (CLI умения), извлечени от OpenAPI спецификацията и CLI регистъра
- **Необработен GitHub URL адрес** за извличане в реално време: `https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills/{id}/SKILL.md`

---

## Архитектура

```
src/shared/constants/agentSkills.ts    — Подбран списък с 45 записа (име/описание/категория/област/икона)
src/lib/agentSkills/
  catalog.ts                           — getCatalog(), getSkillById(), filterCatalog(), computeCoverage()
  generator.ts                         — generateAgentSkills() записва SKILL.md в skills/{id}/
  openapiParser.ts                     — извлича REST крайни точки от docs/openapi.yaml
  cliRegistryParser.ts                 — извлича CLI подкоманди от bin/cli-registry.ts
  schemas.ts                           — Zod схеми: AgentSkillSchema, SkillCoverageSchema и т.н.
  types.ts                             — TypeScript интерфейси: AgentSkill, SkillCoverage и т.н.

skills/{id}/SKILL.md                   — Генерирани + ръчно редактирани markdown файлове (общо 45)

src/app/api/agent-skills/
  route.ts                             — GET /api/agent-skills
  [id]/route.ts                        — GET /api/agent-skills/{id}
  [id]/raw/route.ts                    — GET /api/agent-skills/{id}/raw (text/markdown)
  coverage/route.ts                    — GET /api/agent-skills/coverage
  generate/route.ts                    — POST /api/agent-skills/generate (изисква удостоверяване)

open-sse/mcp-server/tools/agentSkillTools.ts  — 3 MCP инструмента (списък, извличане, покритие)
src/lib/a2a/skills/listCapabilities.ts        — A2A умение: list-capabilities
```

---

## Формат на SKILL.md

```markdown
---
name: omni-providers
description: "Управлявайте връзките с доставчици: добавяйте, тествайте, подменяйте и премахвайте идентификационни данни."
---

<!-- генерирано от src/lib/agentSkills/generator.ts; ръчните редакции ще бъдат презаписани -->

## Общ преглед

...

## Удостоверяване

...

## Крайни точки

...

<!-- skill:custom-start -->

## Персонализиран раздел (запазва се при повторно генериране)

...

<!-- skill:custom-end -->
```

При повторно генериране генераторът запазва съдържанието между `<!-- skill:custom-start -->` и `<!-- skill:custom-end -->`. Десет умения имат ръчно редактирани персонализирани блокове:

`omni-mcp`, `omni-compression`, `cli-providers`, `cli-eval`, `omni-agents-a2a`, `omni-combos-routing`, `omni-auth`, `omni-resilience`, `omni-inference`, `cli-serve`.

---

## Откриване чрез REST API

| Крайна точка                 | Метод | Описание                                                                     | Удостоверяване |
| :--------------------------- | :---- | :--------------------------------------------------------------------------- | :------------- |
| `/api/agent-skills`          | GET   | Списък на каталога (незадължително `?category=api\|cli\|config&area=<area>`) | няма           |
| `/api/agent-skills/{id}`     | GET   | Получаване на метаданните за отделно умение                                  | няма           |
| `/api/agent-skills/{id}/raw` | GET   | Извличане на SKILL.md като `text/markdown`                                   | няма           |
| `/api/agent-skills/coverage` | GET   | Статистика за покритието (колко файла SKILL.md съществуват)                  | няма           |
| `/api/agent-skills/generate` | POST  | Задействане на генератора (dryRun/prune/onlyIds)                             | управление     |

Пример — показване на всички API умения:

```bash
curl "http://localhost:20128/api/agent-skills?category=api"
```

Пример — извличане на отделен SKILL.md:

```bash
curl -H "Accept: text/markdown" "http://localhost:20128/api/agent-skills/omni-providers/raw"
```

---

## Откриване чрез MCP

Три MCP инструмента са регистрирани в обхвата `read:catalog`:

| Инструмент                        | Описание                                                    |
| :-------------------------------- | :---------------------------------------------------------- |
| `omniroute_agent_skills_list`     | Списък с умения (незадължителни филтри `category` / `area`) |
| `omniroute_agent_skills_get`      | Получаване на метаданни + SKILL.md за едно умение по `id`   |
| `omniroute_agent_skills_coverage` | Статистика за покритието (налични/общо за API/CLI)          |

Вижте [MCP-SERVER.md](./MCP-SERVER.md) за свързването на обхвата и удостоверяването.

---

## Откриване чрез A2A

A2A умението `list-capabilities` връща пълния каталог от 45 умения като артефакт с markdown таблица. Външните оркестратори могат да го извикат чрез:

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

Вижте [A2A-SERVER.md](./A2A-SERVER.md) за подробности относно протокола.

---

## Каталог — 45 идентификатора на умения

### API умения (23)

| ID                     | Област          | Входна точка                                |
| :--------------------- | :-------------- | :------------------------------------------ |
| `omni-auth`            | auth            | Удостоверяване + управление на сесии        |
| `omni-providers`       | providers       | Управление на връзките с доставчици         |
| `omni-models`          | models          | Каталог и възможности на моделите           |
| `omni-combos-routing`  | combos-routing  | Стратегии за комбинирано маршрутизиране     |
| `omni-api-keys`        | api-keys        | Управление на API ключове                   |
| `omni-usage-logs`      | usage-logs      | Дневници за употреба и разходи              |
| `omni-budget`          | budget          | Ограничения на бюджета                      |
| `omni-settings`        | settings        | Глобални настройки                          |
| `omni-proxies`         | proxies         | Управление на пул от прокси сървъри         |
| `omni-cache`           | cache           | Семантичен кеш + кеш на подкани             |
| `omni-compression`     | compression     | Механизми за компресиране на контекста      |
| `omni-context-rtk`     | context-rtk     | RTK компресиране                            |
| `omni-resilience`      | resilience      | Прекъсвачи на вериги + периоди на изчакване |
| `omni-cli-tools`       | cli-tools       | REST прокси за CLI инструменти              |
| `omni-tunnels`         | tunnels         | Управление на тунели                        |
| `omni-sync-cloud`      | sync-cloud      | Синхронизиране с облака                     |
| `omni-db-backups`      | db-backups      | Резервни копия на базата данни              |
| `omni-webhooks`        | webhooks        | Диспечер на webhook събития                 |
| `omni-mcp`             | mcp             | MCP сървър (110 инструмента, 3 транспорта)  |
| `omni-agents-a2a`      | agents-a2a      | A2A протокол за агенти                      |
| `omni-version-manager` | version-manager | Управление на версии и актуализации         |
| `omni-inference`       | inference       | Директен извод / довършвания                |

### CLI умения (21)

| ID                    | Област             | Основна CLI команда     |
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

### Работен процес за конфигуриране (1)

| ID                 | Област           | Входна точка                                 |
| :----------------- | :--------------- | :------------------------------------------- |
| `config-codex-cli` | config-codex-cli | Работен процес за конфигуриране на Codex CLI |

---

## Как външните агенти използват умения

### 1. Откриване чрез REST

```bash
# Получаване на пълния каталог
curl "http://your-omniroute/api/agent-skills" | jq '.skills[] | {id, name, category}'

# Получаване на SKILL.md за добавяне към контекста
curl "http://your-omniroute/api/agent-skills/omni-providers/raw" > omni-providers.md
```

### 2. Откриване чрез MCP

```typescript
// В MCP клиент на Claude Desktop / Cursor:
const result = await client.callTool("omniroute_agent_skills_list", {
  category: "api",
});
// result.skills → масив от AgentSkill с rawUrl за всеки елемент
```

### 3. Откриване чрез A2A

```python
import requests

resp = requests.post("http://your-omniroute/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {"skill": "list-capabilities", "messages": [{"role": "user", "content": "list"}]}
})
table = resp.json()["result"]["artifacts"][0]["content"]
# table е markdown таблица с идентификаторите на всички 45 умения и колоните rawUrl
```

### 4. Директно извличане на необработен файл от GitHub (не се изисква сървър)

```bash
BASE="https://raw.githubusercontent.com/diegosouzapw/OmniRoute/refs/heads/main/skills"
curl "${BASE}/omni-providers/SKILL.md"
```

---

## Генератор

Генераторът прочита ръчно подбрания каталог, OpenAPI спецификацията и регистъра на CLI и записва `skills/{id}/SKILL.md` за всеки запис:

```bash
# Преглед (пробно изпълнение без записване)
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":true}'

# Пълно повторно генериране
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"prune":false}'

# Повторно генериране на конкретни идентификатори
curl -X POST http://localhost:20128/api/agent-skills/generate \
  -H "Authorization: Bearer <admin-key>" \
  -H "Content-Type: application/json" \
  -d '{"dryRun":false,"onlyIds":["omni-providers","cli-serve"]}'
```

Отговорът на генератора е `GeneratorReport`:

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

## API за покритие

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

## Свързани ресурси

- [SKILLS.md](./SKILLS.md) — рамка Omni Skills (добавяне на инструменти към LLM + пазар)
- [MCP-SERVER.md](./MCP-SERVER.md) — каталог с MCP инструменти (инструментите `omniroute_agent_skills_*`)
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A протокол (умението `list-capabilities`)
- `src/lib/agentSkills/` — каталог, генератор, анализатори
- `skills/` — генерирани файлове SKILL.md (45 записа)
