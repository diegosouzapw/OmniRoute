# Cloud Agents (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **Источник истины:** `src/lib/cloudAgent/` и `src/app/api/v1/agents/tasks/`
> **Последнее обновление:** 2026-06-28 — v3.8.40 (обновление frontmatter; 4 агента, включая cursor-cloud)

OmniRoute управляет сторонними облачными агентами для написания кода (Codex Cloud, Cursor,
Devin, Jules) как долгосрочными задачами. Каждый агент предоставляет унифицированный интерфейс,
поэтому клиенты могут отправить промпт и URL репозитория и получить результаты без необходимости
работать с API конкретных провайдеров.

Задача Cloud Agent — **не** обычная операция автодополнения чата. Это долговечная, многоэтапная
единица работы, выполнение которой может занимать от нескольких минут до нескольких часов,
которая может создавать Pull Request в качестве артефакта и поддерживает последующие сообщения,
а также (у некоторых провайдеров) этапы утверждения плана.

![Жизненный цикл задачи Cloud Agent](../diagrams/exported/cloud-agent-flow.svg)

> Источник: [diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## Поддерживаемые агенты

| ID провайдера  | Класс              | Исходный файл                         | Базовый URL вышестоящего API            | Утверждение плана   |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ------------------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | Да                  |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | Да                  |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | Нет (автоматически) |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | Нет (автоматически) |

Реестр: `src/lib/cloudAgent/registry.ts` — экспортирует `getAgent(providerId)`,
`getAvailableAgents()` и `isCloudAgentProvider(providerId)`. Реестр представляет собой
обычный хранящийся в памяти `Record<string, CloudAgentBase>`, заполняемый при загрузке модуля.

## Архитектура

```
Клиент (панель управления / CLI / API)
  → POST /api/v1/agents/tasks (требуется авторизация для управления)
    → валидация CreateCloudAgentTaskSchema (Zod)
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ получает данные из getProviderConnections({ provider, isActive: true })
         (сначала apiKey, при отсутствии — accessToken)
    → agent.createTask({ prompt, source, options }, credentials)
      └─ HTTP POST к API вышестоящего провайдера
      └─ возвращает CloudAgentTask с внутренним id и externalId
    → insertCloudAgentTask(...) в cloud_agent_tasks (SQLite)

Опрос (ленивая синхронизация при чтении):
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // обновляет статус и действия
    → updateCloudAgentTask(...) с новыми значениями статуса, результата и completed_at
    → возвращает сериализованную задачу

Взаимодействия:
  POST /api/v1/agents/tasks/[id]  тело: { action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)          для "approve"
    → agent.sendMessage(externalId, message, credentials) для "message"
    → статус изменяется на "cancelled"                    для "cancel" (только локально)
```

Синхронизация выполняется **лениво**: статус обновляется данными от вышестоящего сервиса при каждом
запросе `GET /tasks/[id]`. Фоновый механизм опроса отсутствует. Панели управления, которым требуется
актуальное состояние, должны опрашивать конечную точку GET с разумным интервалом.

## Интерфейс `CloudAgentBase`

Источник: `src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // эвристическое преобразование строки вышестоящего сервиса → перечисление
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` намеренно выбрасывает исключение — Codex Cloud автоматически составляет планы и не имеет
этапа утверждения. `CodexCloudAgent.listSources` возвращает `[]`.

`CursorCloudAgent` управляет фоновыми/облачными агентами Cursor через официальный REST
API (`api.cursor.com/v0`), используя **API-ключ пользователя или сервисной учётной записи**. Это более безопасная
официальная альтернатива повторному использованию OAuth-сессии Cursor IDE (провайдер `cursor`,
для которого отображается предупреждение о риске блокировки). Это обычный REST-адаптер (без нативной
зависимости `@cursor/sdk`). `approvePlan` выбрасывает исключение (агенты Cursor работают автономно); `listSources` выводит список
репозиториев, доступных по ключу. Cursor возвращает перечисления статусов в ВЕРХНЕМ РЕГИСТРЕ
(`CREATING`/`RUNNING`/`FINISHED`/`ERROR`), которые явно сопоставляются с общим
`CloudAgentStatus`. `baseUrl` можно переопределить для отдельных учётных данных, чтобы версию/путь API можно было
исправить без изменения кода.

## Доменные типы

Источник: `src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // должен быть допустимым URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // секунды, положительное целое число
  cost?: number; // положительное число с плавающей точкой
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // внутренний идентификатор `task_...`
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // идентификатор вышестоящего провайдера
  status: CloudAgentStatus;
  prompt: string; // от 1 до 10000 символов
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

Схемы валидации (`CreateCloudAgentTaskSchema`, `UpdateCloudAgentTaskSchema`)
экспортируются вместе с типами и используются обработчиками маршрутов.

## База данных

Источник: `src/lib/cloudAgent/db.ts` — таблица создаётся отложенно через
`createCloudAgentTaskTable()` (также вызывается из `src/lib/cloudAgent/index.ts` при
импорте модуля).

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

`updateCloudAgentTask` применяет **белый список столбцов** для предотвращения SQL-инъекций:
`status`, `prompt`, `source`, `options`, `result`, `activities`, `error`,
`completed_at`. Любой другой ключ в частичном обновлении без уведомления отбрасывается.

## REST API — жизненный цикл задачи

**Аутентификация:** все эндпоинты `/api/v1/agents/tasks*` требуют **управленческой аутентификации**
(`requireCloudAgentManagementAuth` оборачивает `requireManagementAuth` из
`src/lib/api/requireManagementAuth`). Это требование применяется после коммита `588a0333`
(_"fix(auth): require management auth for agent and cooldown APIs"_).

| Метод   | Путь                          | Назначение                                                                    |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | Предварительный CORS-запрос                                                   |
| GET     | `/api/v1/agents/tasks`        | Список задач (фильтры: `provider`, `status`, `limit≤500`)                     |
| POST    | `/api/v1/agents/tasks`        | Создание задачи (отправка внешнему сервису + сохранение)                      |
| DELETE  | `/api/v1/agents/tasks?id=...` | Удаление задачи по query-параметру id (**не** отменяет её во внешнем сервисе) |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | Предварительный CORS-запрос                                                   |
| GET     | `/api/v1/agents/tasks/[id]`   | Чтение задачи + отложенная синхронизация статуса с внешним сервисом           |
| POST    | `/api/v1/agents/tasks/[id]`   | Действие: `approve` / `message` / `cancel`                                    |
| DELETE  | `/api/v1/agents/tasks/[id]`   | Удаление задачи по id из пути                                                 |

### Создание задачи

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

Ответ `201`:

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

### Утверждение плана

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### Отправка дополнительного сообщения

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### Отмена (только локальный статус)

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` изменяет `status` на `"cancelled"` в локальной БД, но **не** вызывает
внешнего провайдера — в `CloudAgentBase` отсутствует RPC для прерывания. Чтобы остановить
списание средств внешним сервисом, завершите задачу в собственной консоли провайдера.

## REST API — интеграция с облачными провайдерами

Эти вспомогательные конечные точки в `src/app/api/cloud/` используются удалёнными клиентами
(CLI, приложением Electron или обработчиками синхронизации) для чтения метаданных подключения
к провайдерам и разрешения псевдонимов моделей. Они аутентифицируются с помощью **обычного API-ключа**
(через `validateApiKey`), а не управленческой аутентификации, используемой конечными точками задач.

| Метод | Путь                            | Назначение                                                                            |
| ----- | ------------------------------- | ------------------------------------------------------------------------------------- |
| POST  | `/api/cloud/auth`               | Проверить API-ключ, вернуть маскированные метаданные подключения и псевдонимы моделей |
| PUT   | `/api/cloud/credentials/update` | Обновить `accessToken` / `refreshToken` / `expiresAt`                                 |
| POST  | `/api/cloud/model/resolve`      | Разрешить псевдоним модели в `{ provider, model }`                                    |
| GET   | `/api/cloud/models/alias`       | Получить список всех псевдонимов моделей                                              |
| PUT   | `/api/cloud/models/alias`       | Задать псевдоним модели (и автоматически синхронизировать с Cloud, если включено)     |

`/api/cloud/auth` никогда не возвращает необработанные значения `apiKey` / `accessToken` / `refreshToken`. Вместо этого
возвращаются `hasApiKey`, `hasAccessToken`, `hasRefreshToken` и маскированное представление
(`maskedApiKey`: первые 4 символа + `****` + последние 4 символа).

## Разрешение учётных данных

`getCloudAgentCredentials(providerId)` в `src/lib/cloudAgent/api.ts`:

1. Загружает активные подключения к провайдеру через `getProviderConnections({ provider: providerId, isActive: true })`.
2. Для каждого подключения в первую очередь использует `apiKey` (без пробелов по краям). Если он отсутствует, используется `accessToken`.
3. Возвращает первый непустой токен в виде `{ apiKey: token }`.
4. Возвращает `null`, если подходящий токен не найден — API отвечает кодом `400` и сообщением
   `"No active credentials configured for cloud agent provider: <id>"`.

Это означает, что Cloud Agents используют ту же таблицу подключений к провайдерам, что и обычные
LLM-провайдеры. Чтобы включить Jules, создайте активное подключение с `provider: "jules"`
и заполненным `apiKey`.

## Панель управления

Исходный код: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

React-страница с директивой `"use client"`, которая:

- Отображает список задач (периодически опрашивая `GET /api/v1/agents/tasks`).
- Отправляет новые задачи через форму, соответствующую `CreateCloudAgentTaskSchema`.
- Показывает значки состояний (`queued`, `running`, `awaiting_approval`, `completed`,
  `failed`, `cancelled`) и временную шкалу `activities[]`.
- Отображает `result.prUrl` / `commitMessage` / `summary`, когда `status === "completed"`.

## Интеграция с A2A

Cloud Agents можно предоставлять как навыки A2A, зарегистрировав навык A2A, который делегирует
обработчик `tasks/send` вызову `getAgent(...).createTask(...)` и преобразует события состояния
задачи A2A в протокол JSON-RPC 2.0. См. [A2A-SERVER.md](./A2A-SERVER.md).

## Добавление нового Cloud Agent

1. Создайте `src/lib/cloudAgent/agents/<name>.ts`, расширяющий `CloudAgentBase`.
2. Реализуйте `createTask`, `getStatus`, `approvePlan` (или выбрасывайте исключение, если неприменимо),
   `sendMessage`, `listSources`. Используйте `this.mapStatus(...)` для нормализации состояния.
3. Зарегистрируйте его в `src/lib/cloudAgent/registry.ts` под стабильным `providerId`.
4. Расширьте объединение литералов `providerId` в `src/lib/cloudAgent/types.ts`
   (`CloudAgentTask.providerId` и `CreateCloudAgentTaskSchema`).
5. Добавьте провайдера в `src/shared/constants/providers.ts`, если ему требуется запись
   подключения. Провайдерам на основе OAuth также требуется `src/lib/oauth/providers/`.
6. Добавьте тесты в `tests/unit/cloud-agent-*.test.ts`.
7. Обновите этот документ и константу `CLOUD_AGENTS` панели управления.

## Конфигурация

| Переменная окружения | Назначение                                                                   |
| -------------------- | ---------------------------------------------------------------------------- |
| `DATA_DIR`           | Расположение базы данных SQLite, содержащей `cloud_agent_tasks`              |
| `JWT_SECRET`         | Требуется для аутентификации управления в конечных точках задач              |
| `API_KEY_SECRET`     | Требуется для шифрования учётных данных подключений провайдеров при хранении |

На сегодняшний день переменных окружения, специфичных для Cloud-Agent, нет — все секреты хранятся в таблице
`provider_connections`.

## См. также

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- Исходный код: `src/lib/cloudAgent/`
- Маршруты: `src/app/api/v1/agents/tasks/`, `src/app/api/cloud/`
- Панель управления: `src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
