# Skills Framework (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Источник истины:** `src/lib/skills/` и `src/app/api/skills/`
> **Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute предоставляет расширяемый фреймворк Skills, позволяющий языковым моделям (и операторам) компоновать многократно используемые возможности — от чтения файловой системы и HTTP-запросов до изолированного выполнения кода и отобранных навыков из маркетплейса.

Навык — это версионируемая, определяемая схемой единица работы. OmniRoute может внедрять навыки в виде определений инструментов в исходящие запросы, перехватывать вызовы инструментов, возвращаемые моделью, запускать соответствующий обработчик и передавать результат обратно модели, чтобы диалог мог продолжиться. Модель никогда не видит реализацию — только интерфейс инструмента.

---

## Agent Skills и Omni Skills

В OmniRoute существуют две отдельные, но взаимодополняющие системы навыков:

| Аспект           | **Omni Skills** (этот документ)                                              | **Agent Skills**                                                                                  |
| :--------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Назначение       | Внедрение инструментов LLM + изолированное выполнение                        | Каталог SKILL.md для обнаружения и использования внешними агентами                                |
| Источник истины  | `src/lib/skills/` + маркетплейс                                              | `src/lib/agentSkills/` + каталог `skills/`                                                        |
| Режим выполнения | Внедряются в исходящие запросы, выполняются при событиях вызова инструментов | Статический каталог markdown + конечные точки обнаружения REST/MCP/A2A                            |
| Кто использует   | Сам OmniRoute (комбинированная маршрутизация, входящие вызовы LLM)           | Внешние агенты, клиенты MCP, оркестраторы A2A                                                     |
| Количество       | Переменное (определяется маркетплейсом)                                      | 45 записей каталога (23 API + 21 CLI + 1 конфигурация)                                            |
| Формат           | `SkillDefinition` со схемой инструмента + обработчик                         | Метаданные frontmatter в `SKILL.md` + содержимое markdown                                         |
| Обнаружение      | REST `/api/skills/*` + инструменты MCP `omniroute_skills_*`                  | REST `/api/agent-skills/*` + инструменты MCP `omniroute_agent_skills_*` + A2A `list-capabilities` |

**Omni Skills** — это механизм выполнения: они определяют, что OmniRoute _может делать_, когда LLM вызывает инструмент.

**Agent Skills** — это каталог документации: они объясняют внешним агентам, _как использовать_ REST API и CLI OmniRoute, с помощью структурированных файлов SKILL.md, которые можно напрямую передавать в промпты агентов.

Сведения о каталоге Agent Skills, генераторе, инструментах MCP и навыке A2A см. в [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Концепции

### Источники навыков

В одном реестре сосуществуют навыки из трёх источников:

1. **Встроенные навыки** (`src/lib/skills/builtins.ts`) — поставляются вместе с OmniRoute. Охватывают распространённые сценарии:
   - `file_read`, `file_write` — изолированное рабочее пространство для каждого API-ключа в `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — исходящий HTTP-запрос через `safeOutboundFetch` с `guard: "public-only"`
   - `web_search` — подключаемый поисковый провайдер с кэшированием (`executeWebSearch`)
   - `eval_code` — изолированное с помощью Docker выполнение `node` или `python`
   - `execute_command` — изолированное с помощью Docker выполнение команды оболочки
   - `browser` — заготовка на базе Playwright, по умолчанию отключена (`builtin/browser.ts`)
2. **SkillsMP** (маркетплейс OmniRoute) — загружаются с `https://skillsmp.com/api/v1/skills/search`. Требуется `skillsmpApiKey` в настройках.
3. **SkillsSH** (каталог сообщества `skills.sh`) — загружаются с `https://skills.sh/api/search`. Аутентификация не требуется; содержимое SKILL.md загружается напрямую из GitHub raw.

Единый «активный провайдер» определяет, из какого каталога панель управления устанавливает навыки (`src/lib/skills/providerSettings.ts`). Переключить его можно в разделе **Настройки → Память и навыки**. Значение по умолчанию: `skillsmp`.

### Идентификатор навыка

Навыки индексируются по `name@version` в реестре в памяти (`src/lib/skills/registry.ts`). Версия должна соответствовать semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` поддерживает ограничения `^`, `~`, `>`, `>=`, `<`, `<=`, `==` и точное совпадение.

### Режим навыка

У каждого навыка есть режим выполнения, определяющий, когда он внедряется:

| Режим  | Поведение                                                                                                      |
| ------ | -------------------------------------------------------------------------------------------------------------- |
| `on`   | Всегда внедряется как определение инструмента                                                                  |
| `off`  | Никогда не внедряется и не может быть выполнен                                                                 |
| `auto` | Оценивается относительно входящего запроса; внедряется, только если оценка ≥ `AUTO_MIN_SCORE` (по умолчанию 3) |

`auto` — режим по умолчанию для навыков, установленных из маркетплейса. Сочетание `enabled=true` и `mode="off"` означает «зарегистрирован, но неактивен» — переключение `enabled` через устаревший столбец также обновляет `mode`, чтобы сохранить согласованность со старыми путями выполнения кода (`src/app/api/skills/[id]/route.ts`).

### Статус (выполнения)

Выполнения навыков отслеживаются в таблице `skill_executions` со следующими статусами (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Кэш реестра

`SkillRegistry` — это синглтон с кэшем TTL на 60 секунд (`registry.ts:14`). `loadFromDatabase()` идемпотентен и устраняет дублирующиеся параллельные вызовы с помощью `pendingLoad`. Любая операция записи (`register`/`unregister`/`unregisterById`) делает кэш недействительным. Для поиска версий используйте `getSkillVersions(name)` и `resolveVersion(name, constraint)`.

### Внедрение с учётом провайдера

`injectSkills()` в `src/lib/skills/injection.ts` — это точка входа, которая преобразует зарегистрированные навыки в определения инструментов, специфичные для провайдера:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Имя инструмента кодируется в формате `name@version`, чтобы обработчик мог выбрать правильную версию, когда модель вызывает его.

### Оценка в режиме AUTO

Когда задано `mode="auto"`, каждый навык-кандидат оценивается на соответствие контексту запроса (`scoreAutoSkill()` в `injection.ts`):

| Сигнал                                                       | Баллы       |
| ------------------------------------------------------------ | ----------- |
| Имя навыка дословно встречается в контексте                  | +6          |
| Каждый токен имени совпадает с токеном контекста             | +2          |
| Каждая подстрока тега совпадает с контекстом                 | +3          |
| Каждый токен описания совпадает с контекстом                 | +1          |
| Причина фонового запуска совпадает с токеном имени           | +2 за токен |
| Причина фонового запуска совпадает с тегом                   | +2 за токен |
| Подсказка провайдера в тегах совпадает с провайдером запроса | +2 / −2     |

Внедряются до `AUTO_MAX_SKILLS = 5` навыков с наивысшими оценками, для которых `score >= AUTO_MIN_SCORE = 3`. При равенстве оценок приоритет определяется по `installCount` (по убыванию), а затем по имени в алфавитном порядке (`injection.ts:225-235`).

### Перехват вызовов инструментов

`handleToolCallExecution()` в `src/lib/skills/interception.ts` вызывается обработчиком чата после того, как вышестоящий сервис возвращает ответ с вызовом инструмента:

1. `extractToolCalls()` считывает специфичные для провайдера структуры (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Сначала разрешаются псевдонимы встроенных инструментов (например, `omniroute_web_search` → `web_search`). Встроенные обработчики выполняются непосредственно.
3. Всё остальное направляется через `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Результаты вставляются обратно в ответ — в элементы `tool_results`, `function_call_output` или, в зависимости от ситуации, в блоки Anthropic `tool_result`.

В контексте выполнения параметру `customSkillExecutionEnabled` можно присвоить значение `false`, чтобы разрешить только перехват встроенных инструментов (это используется в маршрутах обработки запросов, которые явно отключают пользовательские обработчики).

---

## Песочница Docker

Пути выполнения невстроенного кода (`eval_code`, `execute_command`) запускаются внутри Docker через `SandboxRunner` (`src/lib/skills/sandbox.ts`). Каждый контейнер запускается со следующими параметрами:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (когда readOnly=true)
```

Значения по умолчанию (`SandboxRunner.DEFAULT_CONFIG`):

| Поле             | Значение по умолчанию | Примечания                                                            |
| ---------------- | --------------------- | --------------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)       | Делится на 1000 перед передачей в `--cpus`                            |
| `memoryLimit`    | 256 MB                | Жёсткое ограничение                                                   |
| `timeout`        | 30000 ms              | Мягкое завершение через `SIGTERM` + `docker kill`                     |
| `networkEnabled` | `false`               | Преобразуется в `--network none`                                      |
| `readOnly`       | `true`                | Корневая ФС доступна только для чтения; `/tmp` и `/workspace` — tmpfs |

`SandboxRunner.kill(id)` и `killAll()` доступны для завершения работы; запущенные контейнеры отслеживаются в `runningContainers: Map<string, ChildProcess>`.

### Переменные окружения песочницы

Настраиваются через `process.env` в `src/lib/skills/builtins.ts`:

| Переменная окружения              | Значение по умолчанию | Назначение                                                                                                           |
| --------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)      | Ограничение для `file_read` и `file_write`                                                                           |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`              | Ограничение размера тела ответа `http_request`                                                                       |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`              | Ограничение объёма stdout/stderr, возвращаемого вызывающей стороне                                                   |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`               | Тайм-аут по умолчанию для команд в песочнице; ограничен максимумом в 60 s                                            |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`               | Главный переключатель исходящего трафика. Установите `1` или `true`, чтобы разрешить включение для отдельных вызовов |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (см. ниже)            | Разделённый запятыми список разрешённых образов Docker                                                               |

Образы, разрешённые по умолчанию: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Все дополнения через `SKILLS_ALLOWED_SANDBOX_IMAGES` объединяются со значениями по умолчанию; неизвестные образы отклоняются функцией `normalizeImage()`.

> Примечание: отдельной переменной окружения `SKILLS_EXECUTION_TIMEOUT_MS` нет. Тайм-аут обработчика вне песочницы жёстко задан как 30 s в `SkillExecutor` (`executor.ts:13`), но может быть переопределён во время выполнения через `skillExecutor.setTimeout(ms)`.

### Изоляция рабочей области

`file_read` и `file_write` разрешают каждый путь относительно отдельной рабочей области для каждого API-ключа по адресу `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Обход каталогов (`..`) и запрещённые сегменты (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) отклоняются до выполнения любых операций ввода-вывода на диске.

### Усиление защиты HTTP

`http_request` (`builtins.ts:257`):

- Список разрешённых методов: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Заблокированные исходящие заголовки: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Перенаправления отключены (`allowRedirect: false`)
- Запросы маршрутизируются через `safeOutboundFetch` с `guard: "public-only"` (частные диапазоны и диапазоны loopback блокируются)
- Ответ обрезается до `SKILLS_MAX_HTTP_RESPONSE_BYTES`; клиент получает `truncated: true`

---

## Гибридный исполнитель (предварительная версия)

`src/lib/skills/hybrid.ts` определяет `HybridExecutor`, который для каждого вызова выбирает между выполнением `direct` (внутри процесса) и `sandbox`, а при ошибках тайм-аута или нехватки памяти использует повторную попытку через `autoUpgrade`. Подключённые реализации `directExecutor` / `sandboxRunner` являются заглушками (`executeDirect`, `executeInSandbox` возвращают объекты-заполнители) — рассматривайте этот модуль как находящийся в процессе разработки контракт. Реальное выполнение по-прежнему осуществляется через `skillExecutor` + `SandboxRunner`.

---

## Хранение данных

Схема определена в двух миграциях:

- `src/lib/db/migrations/016_create_skills.sql` — базовые таблицы `skills` и `skill_executions` с индексами по `(api_key_id, name)` и `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — добавляет в `skills` поля `mode`, `source_provider`, `tags` (JSON), `install_count`.

На `skill_executions.status` наложено ограничение на уровне базы данных: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Все конечные точки находятся в `src/app/api/skills/`. Конечные точки управления (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) требуют **аутентификацию управления** через `requireManagementAuth()`. Сценарии маркетплейса и установки используют более простую проверку `isAuthenticated()` (сеанс или API-ключ).

| Конечная точка | Метод | Назначение |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Список зарегистрированных навыков. Поддерживает `?q=`, `?mode=on         | off | auto`, `?source=skillsmp | skillssh | local`, пагинацию |
| `/api/skills/[id]` | PUT | Обновление `enabled` или `mode` |
| `/api/skills/[id]` | DELETE | Отмена регистрации по идентификатору |
| `/api/skills/install` | POST | Установка пользовательского навыка (код обработчика + схема) |
| `/api/skills/marketplace` | GET | Поиск в каталоге SkillsMP (если `q` пуст, возвращает популярные варианты по умолчанию) |
| `/api/skills/marketplace/install` | POST | Установка навыка SkillsMP (требуется активный провайдер = `skillsmp`) |
| `/api/skills/skillssh` | GET | Поиск в каталоге skills.sh (`?q=&limit=`, максимум 100) |
| `/api/skills/skillssh/install` | POST | Установка навыка skills.sh (требуется активный провайдер = `skillssh`) |
| `/api/skills/executions` | GET | История выполнений с пагинацией (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Разовое выполнение зарегистрированного навыка |

Конечная точка `POST /api/skills/executions` возвращает HTTP `503` с `{ error: "Skills execution is disabled..." }`, когда `settings.skillsEnabled === false` (`executor.ts:42-45`). Операторы могут переключить главный выключатель в разделе **Настройки → ИИ**.

### Пример: установка пользовательского навыка

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

Строка `handlerCode` используется для **поиска имени обработчика**, а не как исполняемый код. Исполнитель сопоставляет её через `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). При установке из маркетплейса текст SKILL.md сохраняется в этом поле в качестве документации, а выполнение направляется через сгенерированные моделью вызовы инструментов. Произвольный исходный код, предоставленный пользователем, не выполняется через eval.

## Инструменты MCP

Четыре инструмента MCP предоставляют доступ к возможностям навыков (`open-sse/mcp-server/tools/skillTools.ts`). Они автоматически регистрируются при запуске сервера MCP.

| Инструмент                    | Описание                                                                    |
| ----------------------------- | --------------------------------------------------------------------------- |
| `omniroute_skills_list`       | Вывод списка навыков; необязательные фильтры: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Включение или отключение навыка по `skillId`                                |
| `omniroute_skills_execute`    | Выполнение навыка с входной полезной нагрузкой                              |
| `omniroute_skills_executions` | История последних выполнений (по умолчанию — 50, максимум — 100)            |

Настройка транспорта и назначение областей доступа описаны в [MCP-SERVER.md](./MCP-SERVER.md).

---

## Интеграция A2A

`src/lib/skills/a2a.ts` экспортирует дескриптор навыка A2A `memory_aware_routing` и вспомогательную функцию `registerA2ASkill(registry)`. Пользовательские навыки A2A находятся в `src/lib/a2a/skills/` и диспетчеризуются через `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Полный жизненный цикл задачи описан в [A2A-SERVER.md](./A2A-SERVER.md).

---

## Добавление нового встроенного навыка

1. **Определите обработчик** в `src/lib/skills/builtins.ts` (или в соседнем файле в каталоге `src/lib/skills/builtin/`). Сигнатура: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Изолированный путь выполнения кода?** Вызовите `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Используйте `normalizeImage()` для проверки по списку разрешённых образов.
3. **Путь файловой системы?** Перед обращением к диску всегда пропускайте его через `resolveWorkspacePath(input, context)`.
4. **Сетевой вызов?** Используйте `safeOutboundFetch` с `guard: "public-only"`; очищайте заголовки с помощью `sanitizeHeaders()`.
5. **Зарегистрируйте** навык, добавив запись в `builtinSkills` (либо вызвав при запуске функцию в стиле `registerBrowserSkill(executor)`).
6. **Настройте псевдонимы встроенных инструментов** (необязательно) в `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), если вышестоящая модель использует другое имя.
7. **Тесты** размещайте в `src/lib/skills/__tests__/` (Vitest).

---

## Добавление пользовательского (не встроенного) навыка

1. Зарегистрируйте обработчик при запуске процесса:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Добавьте навык через `POST /api/skills/install` (поле `handlerCode` должно соответствовать имени зарегистрированного обработчика).
3. Переключите `mode` в `on` или `auto` через `PUT /api/skills/[id]`.

---

## Рекомендации по эксплуатации

- **Главный переключатель:** `settings.skillsEnabled = false` блокирует все выполнения и возвращает HTTP `503` для `/api/skills/executions`. Реестр продолжает загружаться.
- **Ограничение исходящего трафика:** не задавайте `SKILLS_SANDBOX_NETWORK_ENABLED` (по умолчанию переменная не установлена), чтобы обеспечить полностью изолированное выполнение в песочнице. Значение `networkEnabled: true` для отдельного вызова всё равно требует включения главного переключателя.
- **Разрешение определённых образов:** задайте `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`, чтобы расширить список разрешённых образов.
- **Аудит выполнений:** `/dashboard/skills/executions` и `omniroute_skills_executions` выполняют запросы к `skill_executions`. Успешные запуски содержат `durationMs`, а неудачные — `errorMessage`.
- **Инвалидация кеша:** вызывайте `skillRegistry.invalidateCache()` после ручного редактирования БД; в противном случае подождите 60 с.
- **Анонимное рабочее пространство:** когда `apiKeyId` пуст, все вызовы хешируются в одно и то же рабочее пространство `"anonymous"` — код, учитывающий совместное использование, всегда должен передавать реальный ключ.

---

## Жизненный цикл выполнения (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) — это **синглтон**, управляющий каждым вызовом навыка. Понимание его жизненного цикла критически важно для отладки тайм-аутов, повторных попыток и состояния выполнения.

### Жизненный цикл из 5 этапов

```
   вызван execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← в очереди, ещё не запущено (запись в БД создана)
  └──────┬──────┘
         │ запуск обработчика
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← обработчик вызван с тайм-аутом
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (другого пути нет — завершено родительским процессом)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Запись в БД обновлена: статус, результат, durationMs
```

### Конфигурация по умолчанию

| Параметр     | По умолчанию   | Настраивается через                  |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 с) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Важно**: Исполнитель является синглтоном — вызов `setTimeout()` глобально влияет на все последующие вызовы. Тайм-ауты для отдельных навыков в настоящее время не поддерживаются; если для разных навыков нужны разные тайм-ауты, запускайте отдельные процессы или создайте ответвление исполнителя.

### Значения статуса

Из `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // В очереди, ещё не запущено
  RUNNING = "running", // Обработчик вызван
  SUCCESS = "success", // Обработчик вернул корректный результат
  ERROR = "error", // Обработчик выбросил исключение
  TIMEOUT = "timeout", // Превышен тайм-аут исполнителя
}
```

> **Примечание**: Статус `TIMEOUT` определён в перечислении, но текущая реализация исполнителя **фактически не записывает его в БД** — тайм-ауты отображаются как `ERROR` с сообщением `"Skill execution timed out"`. Этот статус перечисления зарезервирован для будущего использования.

### Просмотр выполнений

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Получить конкретное выполнение по ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Вывести недавние выполнения для ключа API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Подсчитать общее количество выполнений
const total = skillExecutor.countExecutions("api-key-id");
```

### Поведение повторных попыток

Значение параметра `maxRetries` сохраняется, но **в настоящее время не используется** методом `execute()` исполнителя — он выполняет только одну попытку. Значение `maxRetries` предоставляется для будущей реализации и для хуков, которым необходимо его считывать.

На данный момент повторные попытки необходимо реализовывать внутри самого обработчика навыка. Встроенные
навыки регистрируются в исполнителе (например, `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` в `src/lib/skills/builtin/`); любой зарегистрированный вами обработчик
может включать собственный цикл повторных попыток:

```ts
// внутри обработчика навыка
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## Подробное описание SkillMode

Перечисление `SkillMode` (`src/lib/skills/types.ts`) определяет, **когда и как** вызываются навыки:

```ts
enum SkillMode {
  AUTO = "auto", // LLM решает, когда вызывать навык
  MANUAL = "manual", // Вызывается только по явному запросу пользователя
  HYBRID = "hybrid", // Оценка AUTO + ручное переопределение
}
```

> **Примечание**: В кодовой базе определён `SkillMode` (AUTO/MANUAL/HYBRID), а поле `Skill.mode` использует другую структуру (`"on" | "off" | "auto"`). Они связаны, но не идентичны: `SkillMode` задаёт политику исполнителя, а `Skill.mode` управляет включением отдельного навыка.

### Когда использовать каждый режим

| Режим    | Поведение LLM                                                                      | Сценарий использования                                     |
| -------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `AUTO`   | LLM может вызвать навык, когда сочтёт это необходимым                              | Навыки общего назначения (чтение файлов, HTTP-запросы)     |
| `MANUAL` | LLM не может вызвать навык; он запускается только явным вызовом API `executeSkill` | Критичные операции (запись в базу данных, платежи)         |
| `HYBRID` | LLM может предложить навык; пользователь должен подтвердить его вызов              | Навыки с побочными эффектами, которые не являются опасными |

### Оценка AUTO

Когда активен режим `AUTO`, каждый потенциальный навык оценивается относительно контекста запроса функцией `scoreAutoSkill()` из `src/lib/skills/injection.ts` — используется аддитивная целочисленная система баллов (совпадение имени навыка, пересечение токенов имени/тегов/описания, подсказки фоновой причины, бонус/штраф за подсказку провайдера). В качестве вызываемых инструментов внедряются первые `AUTO_MAX_SKILLS = 5` навыков с `score >= AUTO_MIN_SCORE = 3`; при равенстве баллов приоритет определяется сначала по `installCount`, затем по имени. Полную таблицу баллов см. выше в этом документе в разделе [**Генерация схемы инструментов → Оценка AUTO**](#auto-scoring); порогового значения с плавающей точкой в стиле `0.6` не существует, как и оценки в `registry.ts`.

---

## Каталог встроенных навыков

OmniRoute поставляется с тщательно отобранным набором встроенных навыков в `src/lib/skills/builtin/`. Наиболее распространённые из них:

### Навык автоматизации браузера

Навык браузера (`src/lib/skills/builtin/browser.ts`) обеспечивает автоматизацию браузера без графического интерфейса через Playwright/Puppeteer. **Он реализован, но не входит в каталог навыков по умолчанию** — чтобы использовать его, отдельно установите плагин расширения браузера.

```ts
// Включите в своей конфигурации
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Всегда требовать явного вызова
  allowedSkills: ["browser"],
  timeout: 60000, // 60 с на загрузку страниц
  maxRetries: 1,
};
```

### Другие категории встроенных навыков

| Категория           | Навыки                                         | Режим  |
| ------------------- | ---------------------------------------------- | ------ |
| Файловый ввод-вывод | `file_read`, `file_write`                      | AUTO   |
| HTTP                | `http_request`                                 | AUTO   |
| Поиск               | `web_search`                                   | AUTO   |
| Выполнение кода     | `eval_code` (JavaScript/Python в песочнице)    | HYBRID |
| Система             | `execute_command` (выполнение CLI в песочнице) | MANUAL |

### Добавление пользовательского навыка

Инструкции по добавлению пользовательского навыка через систему плагинов см. в разделе [SDK плагинов и интеграция навыков](./PLUGIN_SDK.md).

---

## См. также

- [MCP-SERVER.md](./MCP-SERVER.md) — регистрация инструментов MCP и транспорты
- [A2A-SERVER.md](./A2A-SERVER.md) — жизненный цикл задач A2A и диспетчеризация навыков
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — введение для пользователей
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — конвейер обработки запросов и карта компонентов
- Исходный код: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Тесты: `src/lib/skills/__tests__/integration.test.ts`
