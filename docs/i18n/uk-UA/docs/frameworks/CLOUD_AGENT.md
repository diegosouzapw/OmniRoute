# Cloud Agents (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Джерело істини:** `src/lib/cloudAgent/` і `src/app/api/v1/agents/tasks/`
> **Останнє оновлення:** 2026-06-28 — v3.8.40 (оновлення frontmatter; 4 агенти, включно з cursor-cloud)

OmniRoute оркеструє сторонні хмарні агенти для програмування (Codex Cloud, Cursor,
Devin, Jules) як довготривалі завдання. Кожен агент має уніфікований інтерфейс, завдяки чому
клієнти можуть надіслати запит + URL репозиторію й отримати результати без необхідності
працювати з API, специфічними для постачальника.

Завдання Cloud Agent — це **не** звичайне завершення чату. Це стійка, багатоетапна
одиниця роботи, виконання якої може тривати від кількох хвилин до кількох годин, може створювати Pull Request як
артефакт і підтримує подальші повідомлення та (у деяких постачальників) етапи затвердження плану.

![Життєвий цикл завдання Cloud Agent](../diagrams/exported/cloud-agent-flow.svg)

> Джерело: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Підтримувані агенти

| ID постачальника | Клас               | Джерело                               | Базова URL-адреса зовнішнього API       | Затвердження плану |
| ---------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------ |
| `jules`          | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Так                |
| `devin`          | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Так                |
| `codex-cloud`    | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Ні (автоматично)   |
| `cursor-cloud`   | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Ні (автоматично)   |

Реєстр: `src/lib/cloudAgent/registry.ts` — експортує `getAgent(providerId)`,
`getAvailableAgents()` і `isCloudAgentProvider(providerId)`. Реєстр є
простим внутрішнім `Record<string, CloudAgentBase>`, що заповнюється під час завантаження модуля.

## Архітектура

```
Клієнт (панель керування / CLI / API)
  → POST /api/v1/agents/tasks (потрібна автентифікація для керування)
    → перевірка за допомогою CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ отримує дані з getProviderConnections({ provider, isActive: true })
         (спочатку apiKey, резервний варіант — accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST до API зовнішнього постачальника
      └─ повертає CloudAgentTask із внутрішнім id + externalId
    → insertCloudAgentTask(...) до cloud_agent_tasks (SQLite)

Опитування (відкладена синхронізація під час читання):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // оновлює стан + дії
    → updateCloudAgentTask(...) із новим станом, результатом, completed_at
    → повертає серіалізоване завдання

Взаємодії:
  POST /api/v1/agents/tasks/[id]  тіло: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)          для "approve"
    → agent.sendMessage(externalId, message, credentials) для "message"
    → стан змінюється на "cancelled"                      для "cancel" (лише локально)
```

Синхронізація є **відкладеною**: стан оновлюється із зовнішнього сервісу під час кожного запиту `GET /tasks/[id]`.
Фонове опитування відсутнє. Панелям керування, яким потрібні актуальні дані, слід опитувати кінцеву точку GET
з доцільним інтервалом.

## Інтерфейс `CloudAgentBase`

Джерело: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // евристичне перетворення рядка від зовнішнього постачальника → перелічуваний тип
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` навмисно генерує виняток — Codex Cloud автоматично створює план і
не має етапу затвердження. `CodexCloudAgent.listSources` повертає `[]`.

`CursorCloudAgent` керує фоновими/хмарними агентами Cursor через офіційний REST
API (`api.cursor.com/v0`) за допомогою **ключа API користувача або облікового запису служби** — це безпечніша
альтернатива від розробника замість повторного використання OAuth-сесії Cursor IDE (постачальник `cursor`,
для якого відображається попередження про ризик блокування). Це звичайний REST-адаптер (без нативної
залежності `@cursor/sdk`). `approvePlan` генерує виняток (агенти Cursor працюють автономно); `listSources` повертає список
репозиторіїв, доступних за допомогою ключа. Cursor повертає перелічувані значення стану у ВЕРХНЬОМУ РЕЄСТРІ
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), які явно зіставляються зі спільним
`CloudAgentStatus`. `baseUrl` можна перевизначити для окремих облікових даних, щоб версію/шлях API можна було
виправити без зміни коду.

## Типи предметної області

Джерело: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // має бути дійсною URL-адресою
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // секунди, додатне ціле число
  cost?: number; // додатне число з рухомою комою
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // внутрішній ідентифікатор `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // ідентифікатор зовнішнього постачальника
  status: CloudAgentStatus;
  prompt: string; // 1..10000 символів
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

Схеми валідації (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`)
експортуються разом із типами та використовуються обробниками маршрутів.

## База даних

Джерело: `src/lib/cloudAgent/db.ts` — таблиця створюється відкладено через
`createCloudAgentTaskTable()` (також викликається з `src/lib/cloudAgent/index.ts` під час
імпорту модуля).

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

`updateCloudAgentTask` застосовує **білий список стовпців**, щоб запобігти SQL-інʼєкціям:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Будь-який інший ключ у частковому оновленні непомітно відкидається.

## REST API — життєвий цикл завдання

**Автентифікація:** усі кінцеві точки `/api/v1/agents/tasks*` потребують **автентифікації керування**
(`requireCloudAgentManagementAuth` обгортає `requireManagementAuth` з
`src/lib/api/requireManagementAuth`). Це правило застосовується після коміту `588a0333`
(_"fix(auth): вимагати автентифікацію керування для API агентів і періоду очікування"_).

| Метод   | Шлях                          | Призначення                                                     |
| ------- | ----------------------------- | --------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | Попередній запит CORS                                           |
| GET     | `/api/v1/agents/tasks`        | Список завдань (фільтр: `provider`, `status`, `limit≤500`)      |
| POST    | `/api/v1/agents/tasks`        | Створити завдання (надсилає до зовнішнього сервісу та зберігає) |
| DELETE  | `/api/v1/agents/tasks?id=...` | Видалити завдання за id у запиті (**не** скасовує зовнішнє)     |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Попередній запит CORS                                           |
| GET     | `/api/v1/agents/tasks/[id]`   | Прочитати завдання та відкладено синхронізувати статус          |
| POST    | `/api/v1/agents/tasks/[id]`   | Дія: `approve` / `message` / `cancel`                           |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Видалити завдання за id у шляху                                 |

### Створення завдання

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

Відповідь `201`:

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

### Схвалення плану

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Надсилання додаткового повідомлення

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Скасування (лише локальний статус)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` змінює `status` на `"cancelled"` у локальній БД, але **не** викликає
зовнішнього провайдера — у `CloudAgentBase` немає RPC для переривання. Щоб припинити
нарахування плати зовнішнім провайдером, завершіть завдання у власній консолі провайдера.

## REST API — Інфраструктура хмарних провайдерів

Ці допоміжні кінцеві точки в `src/app/api/cloud/` використовуються віддаленими клієнтами
(CLI, застосунком Electron або працівниками синхронізації) для читання метаданих підключення
до провайдерів і розв’язання псевдонімів моделей. Вони автентифікуються за допомогою **звичайного ключа API**
(через `validateApiKey`), а не керівної автентифікації, що використовується кінцевими точками завдань.

| Метод | Шлях                            | Призначення                                                                         |
| ----- | ------------------------------- | ----------------------------------------------------------------------------------- |
| POST  | `/api/cloud/auth`               | Перевірити ключ API, повернути масковані метадані підключення та псевдоніми моделей |
| PUT   | `/api/cloud/credentials/update` | Оновити `accessToken` / `refreshToken` / `expiresAt`                                |
| POST  | `/api/cloud/model/resolve`      | Розв’язати псевдонім моделі в `{ provider, model }`                                 |
| GET   | `/api/cloud/models/alias`       | Отримати список усіх псевдонімів моделей                                            |
| PUT   | `/api/cloud/models/alias`       | Установити псевдонім моделі (та автоматично синхронізувати з Cloud, якщо ввімкнено) |

`/api/cloud/auth` ніколи не повертає необроблені `apiKey` / `accessToken` / `refreshToken`. Натомість
повертаються `hasApiKey`, `hasAccessToken`, `hasRefreshToken` і маскований попередній перегляд
(`maskedApiKey`: перші 4 + `****` + останні 4).

## Визначення облікових даних

`getCloudAgentCredentials(providerId)` у `src/lib/cloudAgent/api.ts`:

1. Завантажує активні підключення до провайдерів через `getProviderConnections({ provider: providerId, isActive: true })`.
2. Для кожного підключення надає перевагу `apiKey` (з видаленими пробілами на початку та в кінці). Якщо його немає, використовує `accessToken`.
3. Повертає перший непорожній токен, обгорнутий у `{ apiKey: token }`.
4. Повертає `null`, якщо придатний токен не знайдено — API відповідає кодом `400` і повідомленням
   `"Немає налаштованих активних облікових даних для провайдера хмарного агента: <id>"`.

Це означає, що Cloud Agents повторно використовують ту саму таблицю Provider Connection, що й звичайні
провайдери LLM. Щоб увімкнути Jules, створіть активне підключення з `provider: "jules"`
і заповненим `apiKey`.

## Панель керування

Джерело: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

Сторінка React із `"use client"`, яка:

- Виводить список завдань (періодично опитуючи `GET /api/v1/agents/tasks`).
- Надсилає нові завдання через форму, що відповідає `CreateCloudAgentTaskSchema`.
- Показує значки стану (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) і відображає часову шкалу `activities[]`.
- Виводить `result.prUrl` / `commitMessage` / `summary`, коли `status === "completed"`.

## Інтеграція з A2A

Cloud Agents можна надавати як навички A2A, зареєструвавши навичку A2A, яка делегує
свій обробник `tasks/send` методу `getAgent(...).createTask(...)` і перетворює події стану
завдань A2A на протокол JSON-RPC 2.0. Див. [A2A-SERVER.md](./A2A-SERVER.md).

## Додавання нового хмарного агента

1. Створіть `src/lib/cloudAgent/agents/<name>.ts`, що розширює `CloudAgentBase`.
2. Реалізуйте `createTask`, `getStatus`, `approvePlan` (або згенеруйте виняток, якщо не застосовується),
   `sendMessage`, `listSources`. Використовуйте `this.mapStatus(...)` для нормалізації стану.
3. Зареєструйте в `src/lib/cloudAgent/registry.ts` зі стабільним `providerId`.
4. Розширте об’єднання літералів `providerId` у `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` і `CreateCloudAgentTaskSchema`).
5. Додайте провайдера до `src/shared/constants/providers.ts`, якщо для нього потрібен запис
   підключення. Провайдерам на основі OAuth також потрібен `src/lib/oauth/providers/`.
6. Додайте тести в `tests/unit/cloud-agent-*.test.ts`.
7. Оновіть цей документ і константу `CLOUD_AGENTS` панелі керування.

## Конфігурація

| Змінна середовища | Призначення                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- |
| `DATA_DIR`        | Розташування бази даних SQLite, що містить `cloud_agent_tasks`                     |
| `JWT_SECRET`      | Необхідна для авторизації керування в кінцевих точках завдань                      |
| `API_KEY_SECRET`  | Необхідна для шифрування облікових даних підключення провайдера під час зберігання |

Наразі змінних середовища, специфічних для Cloud-Agent, немає — усі секрети зберігаються в
таблиці `provider_connections`.

## Див. також

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Вихідний код: `src/lib/cloudAgent/`
- Маршрути: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Панель керування: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
