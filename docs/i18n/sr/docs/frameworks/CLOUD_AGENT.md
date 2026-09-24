# Cloud Agents (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Извор истине:** `src/lib/cloudAgent/` и `src/app/api/v1/agents/tasks/`
> **Последње ажурирање:** 2026-06-28 — v3.8.40 (освежен frontmatter; 4 агента, укључујући cursor-cloud)

OmniRoute оркестрира агенте за програмирање које у облаку хостују независни добављачи (Codex Cloud, Cursor,
Devin, Jules) као дуготрајне задатке. Сваки агент је обухваћен јединственим интерфејсом како би
клијенти могли да пошаљу упит + URL репозиторијума и добију резултате без рада са
API-јима специфичним за добављача.

Задатак Cloud Agent-а **није** уобичајено довршавање разговора. То је трајна јединица рада
са више корака која може трајати од неколико минута до неколико сати, може произвести Pull Request као
артефакт и подржава накнадне поруке и (код неких добављача) контролне тачке за одобравање плана.

![Животни циклус задатка Cloud Agent-а](../diagrams/exported/cloud-agent-flow.svg)

> Извор: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Подржани агенти

| ID добављача   | Класа              | Извор                                 | Основни URL узводног сервиса            | Одобравање плана |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Да               |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Да               |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Не (аутоматски)  |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Не (аутоматски)  |

Регистар: `src/lib/cloudAgent/registry.ts` — извози `getAgent(providerId)`,
`getAvailableAgents()` и `isCloudAgentProvider(providerId)`. Регистар је обичан
`Record<string, CloudAgentBase>` у меморији, попуњен при учитавању модула.

## Архитектура

```
Клијент (контролна табла / CLI / API)
  → POST /api/v1/agents/tasks (потребна је аутентификација за управљање)
    → валидација помоћу CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ преузима из getProviderConnections({ provider, isActive: true })
         (прво apiKey, а као резервна опција accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST ка API-ју узводног добављача
      └─ враћа CloudAgentTask са интерним id + externalId
    → insertCloudAgentTask(...) у cloud_agent_tasks (SQLite)

Проверавање (лења синхронизација при читању):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // освежава статус + активности
    → updateCloudAgentTask(...) новим статусом, резултатом и completed_at
    → враћа серијализовани задатак

Интеракције:
  POST /api/v1/agents/tasks/[id]  body: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        за "approve"
    → agent.sendMessage(externalId, message, credentials) за "message"
    → статус се мења у "cancelled"                      за "cancel" (само локално)
```

Синхронизација је **лења**: статус се освежава из узводног сервиса при сваком захтеву `GET /tasks/[id]`.
Не постоји позадински механизам за периодично проверавање. Контролне табле којима је потребно ажурно стање треба да периодично позивају GET
крајњу тачку у разумним интервалима.

## Интерфејс `CloudAgentBase`

Извор: `src/lib/cloudAgent/baseAgent.ts`

```typescript
export interface AgentCredentials {
  apiKey: string;
  baseUrl?: string;
}

export interface CreateTaskParams {
  prompt: string;
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
}

export interface GetStatusResult {
  status: CloudAgentStatus;
  externalId?: string;
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
}

export abstract class CloudAgentBase {
  abstract readonly providerId: string;
  abstract readonly baseUrl: string;

  abstract createTask(p: CreateTaskParams, c: AgentCredentials): Promise<CloudAgentTask>;
  abstract getStatus(externalId: string, c: AgentCredentials): Promise<GetStatusResult>;
  abstract approvePlan(externalId: string, c: AgentCredentials): Promise<void>;
  abstract sendMessage(
    externalId: string,
    message: string,
    c: AgentCredentials
  ): Promise<CloudAgentActivity>;
  abstract listSources(
    c: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]>;

  protected mapStatus(raw: string): CloudAgentStatus; // хеуристичко мапирање изворног стринга → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` намерно изазива изузетак — Codex Cloud аутоматски прави планове и
нема корак за одобравање. `CodexCloudAgent.listSources` враћа `[]`.

`CursorCloudAgent` управља Cursor-овим Background / Cloud агентима преко његовог званичног REST
API-ја (`api.cursor.com/v0`) помоћу **API кључа корисника или сервисног налога** — безбедније,
званично решење уместо поновног коришћења OAuth сесије Cursor IDE-а (провајдер `cursor`,
за који постоји упозорење о ризику од забране). То је обичан REST адаптер (без изворне
зависности `@cursor/sdk`). `approvePlan` изазива изузетак (Cursor агенти раде аутономно);
`listSources` наводи репозиторијуме доступне помоћу кључа. Cursor враћа enum вредности статуса
великим словима (`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), које се експлицитно мапирају на заједнички
`CloudAgentStatus`. `baseUrl` се може заменити за сваки скуп акредитива, тако да се верзија/путања API-ја
може исправити без измене кода.

## Доменски типови

Извор: `src/lib/cloudAgent/types.ts`

```typescript
export const CLOUD_AGENT_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  AWAITING_APPROVAL: "awaiting_approval",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

export interface CloudAgentSource {
  repoName: string;
  repoUrl: string; // мора бити важећи URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // секунде, позитиван цео број
  cost?: number; // позитиван број са покретним зарезом
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // интерни `task_...` идентификатор
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // идентификатор спољног провајдера
  status: CloudAgentStatus;
  prompt: string; // 1..10000 знакова
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

Шеме за валидацију (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) извозе се
заједно са типовима и користе их обрађивачи рута.

## База података

Извор: `src/lib/cloudAgent/db.ts` — табела се креира лењо путем
`createCloudAgentTaskTable()` (такође се позива из `src/lib/cloudAgent/index.ts` при
увозу модула).

```sql
CREATE TABLE IF NOT EXISTS cloud_agent_tasks (
  id           TEXT PRIMARY KEY,
  provider_id  TEXT NOT NULL,
  external_id  TEXT,
  status       TEXT NOT NULL DEFAULT 'queued',
  prompt       TEXT NOT NULL,
  source       TEXT NOT NULL,             -- JSON
  options      TEXT DEFAULT '{}',         -- JSON
  result       TEXT,                       -- JSON
  activities   TEXT DEFAULT '[]',          -- JSON
  error        TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_provider ON cloud_agent_tasks(provider_id);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_status   ON cloud_agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_created  ON cloud_agent_tasks(created_at DESC);
```

`updateCloudAgentTask` примењује **листу дозвољених колона** ради спречавања SQL инјекције:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Сваки други кључ у делимичном ажурирању тихо се одбацује.

## REST API — животни циклус задатка

**Аутентификација:** Све крајње тачке `/api/v1/agents/tasks*` захтевају **управљачку аутентификацију**
(`requireCloudAgentManagementAuth` обавија `requireManagementAuth` из
`src/lib/api/requireManagementAuth`). Ово се примењује након commit-а `588a0333`
(_„fix(auth): захтевај управљачку аутентификацију за API-је агента и периода чекања“_).

| Метод   | Путања                        | Намена                                                            |
| ------- | ----------------------------- | ----------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS прелиминарни захтев                                          |
| GET     | `/api/v1/agents/tasks`        | Листа задатака (филтер: `provider`, `status`, `limit≤500`)        |
| POST    | `/api/v1/agents/tasks`        | Креирање задатка (прослеђује узводно + трајно чува)               |
| DELETE  | `/api/v1/agents/tasks?id=...` | Брисање задатка према ID-у упита (**не** отказује га узводно)     |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS прелиминарни захтев                                          |
| GET     | `/api/v1/agents/tasks/[id]`   | Читање задатка + лења синхронизација статуса са узводним системом |
| POST    | `/api/v1/agents/tasks/[id]`   | Радња: `approve` / `message` / `cancel`                           |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Брисање задатка према ID-у из путање                              |

### Креирање задатка

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "devin",
    "prompt": "Fix the bug in src/foo.ts where the parser returns null",
    "source": {
      "repoName": "user/repo",
      "repoUrl": "https://github.com/user/repo",
      "branch": "main"
    },
    "options": {
      "autoCreatePr": true,
      "planApprovalRequired": false
    }
  }'
```

Одговор `201`:

```json
{
  "data": {
    "id": "task_1731512345678_abc123def",
    "providerId": "devin",
    "externalId": "session_xyz",
    "status": "queued",
    "prompt": "...",
    "source": { "repoName": "user/repo", "repoUrl": "...", "branch": "main" },
    "options": { "autoCreatePr": true },
    "createdAt": "2026-05-13T12:34:56.789Z"
  }
}
```

### Одобравање плана

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Слање накнадне поруке

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Отказивање (само локални статус)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` мења `status` у `"cancelled"` у локалној бази података, али **не** позива
узводног добављача — у `CloudAgentBase` не постоји RPC за прекид. Да бисте зауставили
узводну наплату, прекините задатак у конзоли самог добављача.

## REST API — Интеграциона инфраструктура добављача услуга у облаку

Ове помоћне крајње тачке у `src/app/api/cloud/` користе удаљени клијенти
(CLI, Electron апликација или радници за синхронизацију) за читање метаподатака о вези са добављачем
и разрешавање алијаса модела. Аутентификују се помоћу **регуларног API кључа**
(преко `validateApiKey`), а не помоћу управљачке аутентификације коју користе крајње тачке за задатке.

| Метод | Путања                          | Намена                                                                               |
| ----- | ------------------------------- | ------------------------------------------------------------------------------------ |
| POST  | `/api/cloud/auth`               | Провера API кључа и враћање маскираних метаподатака о вези + алијаса модела          |
| PUT   | `/api/cloud/credentials/update` | Освежавање `accessToken` / `refreshToken` / `expiresAt`                              |
| POST  | `/api/cloud/model/resolve`      | Разрешавање алијаса модела у `{ provider, model }`                                   |
| GET   | `/api/cloud/models/alias`       | Приказ свих алијаса модела                                                           |
| PUT   | `/api/cloud/models/alias`       | Постављање алијаса модела (и аутоматска синхронизација са Cloud-ом ако је омогућена) |

`/api/cloud/auth` никада не враћа сирове вредности `apiKey` / `accessToken` / `refreshToken`. Она
враћа `hasApiKey`, `hasAccessToken`, `hasRefreshToken` и маскирани приказ
(`maskedApiKey`: прва 4 знака + `****` + последња 4 знака).

## Разрешавање акредитива

`getCloudAgentCredentials(providerId)` у `src/lib/cloudAgent/api.ts`:

1. Учитава активне везе са добављачем преко `getProviderConnections({ provider: providerId, isActive: true })`.
2. За сваку везу даје предност вредности `apiKey` (без околних размака). Ако она не постоји, користи `accessToken`.
3. Враћа први токен који није празан, упакован као `{ apiKey: token }`.
4. Враћа `null` ако није пронађен ниједан употребљив токен — API одговара статусом `400` и поруком
   `"No active credentials configured for cloud agent provider: <id>"`.

То значи да агенти у облаку поново користе исту табелу Provider Connection као и уобичајени LLM
добављачи. Да бисте омогућили Jules, направите активну везу са `provider: "jules"`
и попуњеном вредношћу `apiKey`.

## Контролна табла

Извор: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

React страница са директивом `"use client"` која:

- Приказује задатке (периодично их преузима преко `GET /api/v1/agents/tasks`).
- Шаље нове задатке помоћу обрасца који се мапира на `CreateCloudAgentTaskSchema`.
- Приказује ознаке статуса (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) и визуелизује временску линију `activities[]`.
- Приказује `result.prUrl` / `commitMessage` / `summary` када је `status === "completed"`.

## Интеграција са A2A

Агенти у облаку могу да се изложе као A2A вештине регистровањем A2A вештине која делегира
свој `tasks/send` обрађивач позиву `getAgent(...).createTask(...)` и преводи догађаје статуса A2A задатка
у протокол JSON-RPC 2.0. Погледајте [A2A-SERVER.md](./A2A-SERVER.md).

## Додавање новог агента у облаку

1. Направите `src/lib/cloudAgent/agents/<name>.ts` који проширује `CloudAgentBase`.
2. Имплементирајте `createTask`, `getStatus`, `approvePlan` (или баците изузетак ако није применљиво),
   `sendMessage`, `listSources`. Користите `this.mapStatus(...)` за нормализацију статуса.
3. Региструјте га у `src/lib/cloudAgent/registry.ts` под стабилним `providerId`.
4. Проширите унију литерала `providerId` у `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` и `CreateCloudAgentTaskSchema`).
5. Додајте добављача у `src/shared/constants/providers.ts` ако му је потребан запис
   везе. Добављачима заснованим на OAuth-у такође је потребан `src/lib/oauth/providers/`.
6. Додајте тестове у `tests/unit/cloud-agent-*.test.ts`.
7. Ажурирајте овај документ и константу `CLOUD_AGENTS` контролне табле.

## Конфигурација

| Променљива окружења | Намена                                                                   |
| ------------------- | ------------------------------------------------------------------------ |
| `DATA_DIR`          | Локација SQLite базе података која садржи `cloud_agent_tasks`            |
| `JWT_SECRET`        | Неопходна за управљачку аутентификацију на крајњим тачкама задатака      |
| `API_KEY_SECRET`    | Неопходна за шифровање приступних података везе са добављачем у мировању |

Тренутно не постоје променљиве окружења специфичне за Cloud-Agent — све тајне се налазе у табели
`provider_connections`.

## Погледајте и

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Изворни кôд: `src/lib/cloudAgent/`
- Руте: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Контролна табла: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
