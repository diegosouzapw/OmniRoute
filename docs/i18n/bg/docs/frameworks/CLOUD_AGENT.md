# Cloud Agents (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Източник на достоверна информация:** `src/lib/cloudAgent/` и `src/app/api/v1/agents/tasks/`
> **Последна актуализация:** 2026-06-28 — v3.8.40 (обновяване на frontmatter; 4 агента, включително cursor-cloud)

OmniRoute управлява облачно хоствани агенти за програмиране от трети страни (Codex Cloud, Cursor,
Devin, Jules) като дългосрочни задачи. Всеки агент е обвит зад унифициран интерфейс, така че
клиентите да могат да изпратят подкана + URL адрес на хранилище и да получат резултати, без да работят
директно със специфичните за доставчика API.

Задачата на Cloud Agent **не е** обикновено завършване на чат. Тя е устойчиво, многостъпково
работно звено, чието изпълнение може да отнеме от минути до часове, може да създаде Pull Request като
артефакт и поддържа последващи съобщения и (при някои доставчици) стъпки за одобрение на план.

![Жизнен цикъл на задача на Cloud Agent](../diagrams/exported/cloud-agent-flow.svg)

> Източник: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Поддържани агенти

| Идентификатор на доставчика | Клас               | Изходен файл                          | Базов URL адрес на доставчика           | Одобрение на план |
| --------------------------- | ------------------ | ------------------------------------- | --------------------------------------- | ----------------- |
| `jules`                     | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Да                |
| `devin`                     | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Да                |
| `codex-cloud`               | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Не (автоматично)  |
| `cursor-cloud`              | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Не (автоматично)  |

Регистър: `src/lib/cloudAgent/registry.ts` — експортира `getAgent(providerId)`,
`getAvailableAgents()` и `isCloudAgentProvider(providerId)`. Регистърът представлява
обикновен `Record<string, CloudAgentBase>` в паметта, който се попълва при зареждането на модула.

## Архитектура

```
Клиент (табло / CLI / API)
  → POST /api/v1/agents/tasks (изисква се удостоверяване за управление)
    → валидиране чрез CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ извлича от getProviderConnections({ provider, isActive: true })
         (първо apiKey, с резервен вариант accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST към API на външния доставчик
      └─ връща CloudAgentTask с вътрешен id + externalId
    → insertCloudAgentTask(...) в cloud_agent_tasks (SQLite)

Периодична проверка (отложена синхронизация при четене):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // обновява състоянието + дейностите
    → updateCloudAgentTask(...) с ново състояние, резултат, completed_at
    → връща сериализираната задача

Взаимодействия:
  POST /api/v1/agents/tasks/[id]  тяло: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        за "approve"
    → agent.sendMessage(externalId, message, credentials) за "message"
    → състоянието се променя на "cancelled"             за "cancel" (само локално)
```

Синхронизацията е **отложена**: състоянието се обновява от външния доставчик при всяка заявка към `GET /tasks/[id]`.
Няма фонов механизъм за периодични проверки. Таблата, които се нуждаят от актуално състояние, трябва да проверяват GET
крайната точка през разумен интервал.

## Интерфейс `CloudAgentBase`

Източник: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // евристично преобразуване на низ от външната услуга → enum
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` умишлено хвърля изключение — Codex Cloud създава планове автоматично и
няма стъпка за одобрение. `CodexCloudAgent.listSources` връща `[]`.

`CursorCloudAgent` управлява Background / Cloud Agents на Cursor чрез официалния REST
API (`api.cursor.com/v0`) с **API ключ на потребител или служебен акаунт** — по-безопасната
официална алтернатива на повторното използване на OAuth сесията на Cursor IDE (доставчик `cursor`,
който включва предупреждение за риск от блокиране). Това е обикновен REST адаптер (без собствена
зависимост от `@cursor/sdk`). `approvePlan` хвърля изключение (агентите на Cursor работят автономно);
`listSources` изброява хранилищата, достъпни чрез ключа. Cursor връща enum стойности за състоянието
с ГЛАВНИ БУКВИ (`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), които се преобразуват изрично към споделения
`CloudAgentStatus`. `baseUrl` може да бъде заменен за всяка отделна идентификационна информация, така че
версията/пътят на API да могат да бъдат коригирани без промяна на кода.

## Типове на домейна

Източник: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // трябва да бъде валиден URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // секунди, положително цяло число
  cost?: number; // положително число с плаваща запетая
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // вътрешен идентификатор `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // идентификатор на външния доставчик
  status: CloudAgentStatus;
  prompt: string; // 1..10000 знака
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

Схемите за валидиране (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`) се
експортират заедно с типовете и се използват от обработчиците на маршрути.

## База данни

Източник: `src/lib/cloudAgent/db.ts` — таблицата се създава отложено чрез
`createCloudAgentTaskTable()` (извиква се също от `src/lib/cloudAgent/index.ts` при
импортиране на модула).

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

`updateCloudAgentTask` налага **бял списък с колони**, за да предотврати SQL инжектиране:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Всеки друг ключ в частичната актуализация се отхвърля без предупреждение.

## REST API — Жизнен цикъл на задачите

**Удостоверяване:** Всички крайни точки `/api/v1/agents/tasks*` изискват
**управленско удостоверяване** (`requireCloudAgentManagementAuth` обгръща
`requireManagementAuth` от `src/lib/api/requireManagementAuth`). Това изискване
се налага след commit `588a0333`
(_„fix(auth): изискване на управленско удостоверяване за API интерфейсите на агентите и периода на изчакване“_).

| Метод   | Път                           | Предназначение                                                         |
| ------- | ----------------------------- | ---------------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | Предварителна CORS заявка                                              |
| GET     | `/api/v1/agents/tasks`        | Изброяване на задачи (филтър: `provider`, `status`, `limit≤500`)       |
| POST    | `/api/v1/agents/tasks`        | Създаване на задача (изпраща към външния доставчик и я съхранява)      |
| DELETE  | `/api/v1/agents/tasks?id=...` | Изтриване на задача по id от заявката (**не** я отменя при доставчика) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Предварителна CORS заявка                                              |
| GET     | `/api/v1/agents/tasks/[id]`   | Прочитане на задача + отложено синхронизиране на статуса от доставчика |
| POST    | `/api/v1/agents/tasks/[id]`   | Действие: `approve` / `message` / `cancel`                             |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Изтриване на задача по id от пътя                                      |

### Създаване на задача

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

Отговор `201`:

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

### Одобряване на план

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Изпращане на последващо съобщение

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Отмяна (само на локалния статус)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` променя `status` на `"cancelled"` в локалната база данни, но **не** извиква
външния доставчик — в `CloudAgentBase` няма RPC за прекратяване. За да спрете
таксуването от доставчика, прекратете задачата в собствената конзола на доставчика.

## REST API — Свързване с облачни доставчици

Тези помощни крайни точки в `src/app/api/cloud/` се използват от отдалечени клиенти
(CLI, приложението Electron или работници за синхронизация), за да четат метаданни
за връзката с доставчика и да разрешават псевдоними на модели. Те се удостоверяват с **обикновен API ключ**
(чрез `validateApiKey`), а не чрез административното удостоверяване, използвано от крайните точки за задачи.

| Метод | Път                             | Предназначение                                                                              |
| ----- | ------------------------------- | ------------------------------------------------------------------------------------------- |
| POST  | `/api/cloud/auth`               | Валидиране на API ключа и връщане на маскирани метаданни за връзката + псевдоними на модели |
| PUT   | `/api/cloud/credentials/update` | Обновяване на `accessToken` / `refreshToken` / `expiresAt`                                  |
| POST  | `/api/cloud/model/resolve`      | Разрешаване на псевдоним на модел до `{ provider, model }`                                  |
| GET   | `/api/cloud/models/alias`       | Извеждане на всички псевдоними на модели                                                    |
| PUT   | `/api/cloud/models/alias`       | Задаване на псевдоним на модел (и автоматично синхронизиране с Cloud, ако е активирано)     |

`/api/cloud/auth` никога не връща необработени `apiKey` / `accessToken` / `refreshToken`. Тя
връща `hasApiKey`, `hasAccessToken`, `hasRefreshToken` и маскиран преглед
(`maskedApiKey`: първите 4 + `****` + последните 4).

## Разрешаване на идентификационни данни

`getCloudAgentCredentials(providerId)` в `src/lib/cloudAgent/api.ts`:

1. Зарежда активните връзки с доставчици чрез `getProviderConnections({ provider: providerId, isActive: true })`.
2. За всяка връзка предпочита `apiKey` (с премахнати интервали в началото и края). Ако липсва, използва `accessToken`.
3. Връща първия непразен токен, обвит като `{ apiKey: token }`.
4. Връща `null`, ако не бъде намерен използваем токен — API отговаря с `400` и
   `"Няма конфигурирани активни идентификационни данни за доставчика на облачния агент: <id>"`.

Това означава, че Cloud Agents използват повторно същата таблица Provider Connection като обикновените LLM
доставчици. За да активирате Jules, създайте активна връзка с `provider: "jules"`
и попълнен `apiKey`.

## Табло

Изходен файл: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

React страница с `"use client"`, която:

- Показва списък със задачи (периодично извличани чрез `GET /api/v1/agents/tasks`).
- Изпраща нови задачи чрез формуляр, който съответства на `CreateCloudAgentTaskSchema`.
- Показва значки за състояние (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) и визуализира хронологията `activities[]`.
- Показва `result.prUrl` / `commitMessage` / `summary`, когато `status === "completed"`.

## Интеграция с A2A

Cloud Agents могат да бъдат предоставени като A2A умения чрез регистриране на A2A умение, което делегира
своя обработчик `tasks/send` към `getAgent(...).createTask(...)` и преобразува събитията за състояние на A2A задачите
към протокола JSON-RPC 2.0. Вижте [A2A-SERVER.md](./A2A-SERVER.md).

## Добавяне на нов Cloud Agent

1. Създайте `src/lib/cloudAgent/agents/<name>.ts`, разширяващ `CloudAgentBase`.
2. Имплементирайте `createTask`, `getStatus`, `approvePlan` (или хвърлете изключение, ако не е приложимо),
   `sendMessage`, `listSources`. Използвайте `this.mapStatus(...)` за нормализиране на състоянието.
3. Регистрирайте го в `src/lib/cloudAgent/registry.ts` под стабилен `providerId`.
4. Разширете обединението от литерали `providerId` в `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` и `CreateCloudAgentTaskSchema`).
5. Добавете доставчика към `src/shared/constants/providers.ts`, ако се нуждае от запис за връзка.
   Доставчиците, базирани на OAuth, се нуждаят и от `src/lib/oauth/providers/`.
6. Добавете тестове в `tests/unit/cloud-agent-*.test.ts`.
7. Актуализирайте този документ и константата `CLOUD_AGENTS` на таблото.

## Конфигурация

| Променлива на средата | Предназначение                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------ |
| `DATA_DIR`            | Местоположение на SQLite базата данни, съдържаща `cloud_agent_tasks`                       |
| `JWT_SECRET`          | Изисква се за удостоверяване при управление на крайните точки за задачи                    |
| `API_KEY_SECRET`      | Изисква се за криптиране на идентификационните данни за връзка с доставчика при съхранение |

Понастоящем няма специфични за Cloud-Agent променливи на средата — всяка тайна се съхранява в
таблицата `provider_connections`.

## Вижте също

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Изходен код: `src/lib/cloudAgent/`
- Маршрути: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Табло за управление: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
