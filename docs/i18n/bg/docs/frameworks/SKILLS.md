# Skills Framework (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Източник на истината:** `src/lib/skills/` и `src/app/api/skills/`
> **Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute предоставя разширяема рамка за умения, която позволява на езикови модели (и оператори) да комбинират многократно използваеми възможности — от четене на файловата система и HTTP заявки до изпълнение на код в изолирана среда и подбрани умения от пазара.

Умението е версионирана, дефинирана чрез схема единица работа. OmniRoute може да вмъква умения като дефиниции на инструменти в изходящи заявки, да прихваща извиквания на инструменти, връщани от модела, да изпълнява съответния обработчик и да подава резултата обратно към модела, така че разговорът да може да продължи. Моделът никога не вижда реализацията — само интерфейса на инструмента.

---

## Агентски умения спрямо Omni умения

OmniRoute има две различни, но взаимно допълващи се системи за умения:

| Измерение            | **Omni умения** (този документ)                                                     | **Агентски умения**                                                                               |
| :------------------- | :---------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Предназначение       | Вмъкване на LLM инструменти + изпълнение в изолирана среда                          | Каталог SKILL.md за откриване и използване от външни агенти                                       |
| Източник на истината | `src/lib/skills/` + пазар                                                           | `src/lib/agentSkills/` + директория `skills/`                                                     |
| Режим на изпълнение  | Вмъкват се в изходящи заявки и се изпълняват при събития за извикване на инструмент | Статичен markdown каталог + крайни точки за откриване чрез REST/MCP/A2A                           |
| Кой ги използва      | Самият OmniRoute (комбинирано маршрутизиране, входящи LLM извиквания)               | Външни агенти, MCP клиенти, A2A оркестратори                                                      |
| Брой                 | Променлив (определя се от пазара)                                                   | 45 записа в каталога (23 API + 21 CLI + 1 конфигурация)                                           |
| Формат               | `SkillDefinition` със схема на инструмент + обработчик                              | Въвеждащи метаданни на `SKILL.md` + markdown съдържание                                           |
| Откриване            | `/api/skills/*` REST + MCP инструменти `omniroute_skills_*`                         | `/api/agent-skills/*` REST + MCP инструменти `omniroute_agent_skills_*` + A2A `list-capabilities` |

**Omni уменията** са механизмът за изпълнение — те определят какво OmniRoute _може да прави_, когато LLM извика инструмент.

**Агентските умения** са каталогът с документация — те обясняват на външни агенти _как да използват_ REST API и CLI на OmniRoute чрез структурирани SKILL.md файлове, които могат да бъдат подавани директно в подканите на агентите.

За каталога с агентски умения, генератора, MCP инструментите и A2A умението вижте [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Концепции

### Източници на умения

В един и същ регистър съществуват едновременно три източника на умения:

1. **Вградени умения** (`src/lib/skills/builtins.ts`) — доставят се с OmniRoute. Покриват често срещаните случаи:
   - `file_read`, `file_write` — изолирано работно пространство за всеки API ключ в `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — изходящ HTTP чрез `safeOutboundFetch` с `guard: "public-only"`
   - `web_search` — сменяем доставчик за търсене с кеширане (`executeWebSearch`)
   - `eval_code` — изпълнение на `node` или `python` в изолирана Docker среда
   - `execute_command` — изпълнение на shell команда в изолирана Docker среда
   - `browser` — базова структура, използваща Playwright, деактивирана по подразбиране (`builtin/browser.ts`)
2. **SkillsMP** (пазарът на OmniRoute) — извличат се от `https://skillsmp.com/api/v1/skills/search`. Изисква `skillsmpApiKey` в настройките.
3. **SkillsSH** (общностният каталог `skills.sh`) — извличат се от `https://skills.sh/api/search`. Не е необходимо удостоверяване; съдържанието на SKILL.md се извлича директно от GitHub raw.

Един „активен доставчик“ управлява от кой каталог таблото за управление инсталира умения (`src/lib/skills/providerSettings.ts`). Променете го от **Настройки → Памет и умения**. По подразбиране: `skillsmp`.

### Идентичност на уменията

Уменията се индексират чрез `name@version` в регистъра в паметта (`src/lib/skills/registry.ts`). Версията трябва да е semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` разпознава ограниченията `^`, `~`, `>`, `>=`, `<`, `<=`, `==` и ограниченията за точно съвпадение.

### Режим на умението

Всяко умение има режим на изпълнение, който определя кога се вмъква:

| Режим  | Поведение                                                                                                |
| ------ | -------------------------------------------------------------------------------------------------------- |
| `on`   | Винаги се вмъква като дефиниция на инструмент                                                            |
| `off`  | Никога не се вмъква и никога не може да бъде изпълнено                                                   |
| `auto` | Оценява се спрямо входящата заявка; вмъква се само ако оценката е ≥ `AUTO_MIN_SCORE` (по подразбиране 3) |

`auto` е режимът по подразбиране за умения, инсталирани от пазара. `enabled=true` и `mode="off"` заедно означават „регистрирано, но неактивно“ — превключването на `enabled` чрез наследената колона също актуализира `mode`, така че по-старите пътища за изпълнение на кода да останат съгласувани (`src/app/api/skills/[id]/route.ts`).

### Състояние (изпълнения)

Изпълненията на умения се проследяват в таблицата `skill_executions` със следните състояния (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Кеш на регистъра

`SkillRegistry` е singleton с кеш с TTL от 60 секунди (`registry.ts:14`). `loadFromDatabase()` е идемпотентен и премахва дублирането на едновременни извиквания чрез `pendingLoad`. Всяка операция за запис (`register`/`unregister`/`unregisterById`) анулира кеша. Търсете версии чрез `getSkillVersions(name)` и `resolveVersion(name, constraint)`.

### Вмъкване според доставчика

`injectSkills()` в `src/lib/skills/injection.ts` е входната точка, която преобразува регистрираните умения в специфични за доставчика дефиниции на инструменти:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Името на инструмента е кодирано като `name@version`, така че обработчикът да може да избере правилната версия, когато моделът го извика обратно.

### AUTO оценяване

Когато `mode="auto"`, всяко кандидат-умение се оценява спрямо контекста на заявката (`scoreAutoSkill()` в `injection.ts`):

| Сигнал                                                                | Точки       |
| --------------------------------------------------------------------- | ----------- |
| Името на умението присъства дословно в контекста                      | +6          |
| Всеки токен от името съвпада с токен от контекста                     | +2          |
| Всеки подниз от етикетите съвпада с контекста                         | +3          |
| Всеки токен от описанието съвпада с контекста                         | +1          |
| Причината от фоновия контекст съвпада с токен от името                | +2 на токен |
| Причината от фоновия контекст съвпада с етикет                        | +2 на токен |
| Подсказката за доставчик в етикетите съвпада с доставчика на заявката | +2 / −2     |

Инжектират се първите `AUTO_MAX_SKILLS = 5` умения с `score >= AUTO_MIN_SCORE = 3`. При равен резултат подреждането се определя първо по `installCount` (низходящо), а след това по име в азбучен ред (`injection.ts:225-235`).

### Прихващане на извиквания на инструменти

`handleToolCallExecution()` в `src/lib/skills/interception.ts` се извиква от обработчика на чата, след като отдалечената услуга върне отговор с извикване на инструмент:

1. `extractToolCalls()` прочита специфичните за доставчика структури (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Първо се разрешават псевдонимите на вградените инструменти (напр. `omniroute_web_search` → `web_search`). Вградените обработчици се изпълняват директно.
3. Всичко останало се насочва през `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Резултатите се вмъкват обратно в отговора — като елементи `tool_results`, `function_call_output` или блокове `tool_result` на Anthropic според случая.

`customSkillExecutionEnabled` в контекста за изпълнение може да бъде зададено на `false`, за да се разреши само прихващането на вградени инструменти (използва се от пътища за заявки, които изрично деактивират дефинираните от потребителя обработчици).

---

## Docker Sandbox

Пътищата за код, който не е вграден (`eval_code`, `execute_command`), се изпълняват в Docker чрез `SandboxRunner` (`src/lib/skills/sandbox.ts`). Всеки контейнер се стартира с:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (когато readOnly=true)
```

Стойности по подразбиране (`SandboxRunner.DEFAULT_CONFIG`):

| Поле             | По подразбиране | Бележки                                                       |
| ---------------- | --------------- | ------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Разделя се на 1000, преди да бъде подадено на `--cpus`        |
| `memoryLimit`    | 256 MB          | Твърдо ограничение                                            |
| `timeout`        | 30000 ms        | Плавно прекратяване чрез `SIGTERM` + `docker kill`            |
| `networkEnabled` | `false`         | Преобразува се в `--network none`                             |
| `readOnly`       | `true`          | Основната ФС е само за четене; `/tmp` и `/workspace` са tmpfs |

`SandboxRunner.kill(id)` и `killAll()` са достъпни за спиране; изпълняващите се контейнери се проследяват в `runningContainers: Map<string, ChildProcess>`.

### Променливи на средата за Sandbox

Конфигурирани чрез `process.env` в `src/lib/skills/builtins.ts`:

| Променлива на средата             | По подразбиране  | Предназначение                                                                                                  |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Ограничение за `file_read` и `file_write`                                                                       |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Ограничение за тялото на отговора от `http_request`                                                             |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Ограничение за stdout/stderr, върнати на извикващата страна                                                     |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Време за изчакване по подразбиране за команди в sandbox; ограничено до 60 s                                     |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Главен превключвател за изходящ трафик. Задайте `1` или `true`, за да разрешите включване за отделни извиквания |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (вижте по-долу)  | Разделен със запетаи списък с разрешени Docker образи                                                           |

Разрешени образи по подразбиране: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Всички допълнения чрез `SKILLS_ALLOWED_SANDBOX_IMAGES` се обединяват със стойностите по подразбиране; непознатите образи се отхвърлят от `normalizeImage()`.

> Бележка: няма отделна променлива на средата `SKILLS_EXECUTION_TIMEOUT_MS`. Времето за изчакване на обработчика извън sandbox е твърдо зададено на 30 s в `SkillExecutor` (`executor.ts:13`), но може да бъде презаписано по време на изпълнение чрез `skillExecutor.setTimeout(ms)`.

### Изолиране на работното пространство

`file_read` и `file_write` разрешават всеки път спрямо отделно за всеки API ключ работно пространство в `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Обхождането на пътища (`..`) и забранените сегменти (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) се отхвърлят преди каквито и да било дискови операции.

### Подсилване на сигурността на HTTP

`http_request` (`builtins.ts:257`):

- Списък с разрешени методи: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Блокирани изходящи заглавки: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Пренасочванията са деактивирани (`allowRedirect: false`)
- Маршрутизира се чрез `safeOutboundFetch` с `guard: "public-only"` (частните диапазони и диапазоните за обратна връзка са блокирани)
- Отговорът се съкращава при `SKILLS_MAX_HTTP_RESPONSE_BYTES`; клиентът получава `truncated: true`

---

## Хибриден изпълнител (предварителна версия)

`src/lib/skills/hybrid.ts` дефинира `HybridExecutor`, който при всяко извикване избира между `direct` (в рамките на процеса) и `sandbox` изпълнение, с механизъм за повторен опит чрез `autoUpgrade` при грешки, свързани с изтичане на времето или паметта. Свързаните реализации `directExecutor` / `sandboxRunner` са заглушки (`executeDirect`, `executeInSandbox` връщат заместващи обекти) — разглеждайте този модул като договор в процес на разработка. Реалното изпълнение все още преминава през `skillExecutor` + `SandboxRunner`.

---

## Съхранение

Схемата се намира в две миграции:

- `src/lib/db/migrations/016_create_skills.sql` — основните таблици `skills` и `skill_executions`, с индекси върху `(api_key_id, name)` и `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — добавя `mode`, `source_provider`, `tags` (JSON), `install_count` към `skills`.

`skill_executions.status` е ограничено на ниво база данни: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Всички крайни точки се намират под `src/app/api/skills/`. Крайните точки за управление (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) изискват **удостоверяване за управление** чрез `requireManagementAuth()`. Процесите за пазара и инсталирането използват по-лекото `isAuthenticated()` (сесия или API ключ).

| Крайна точка | Метод | Предназначение |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Извежда регистрираните умения. Поддържа `?q=`, `?mode=on                 | off | auto`, `?source=skillsmp | skillssh | local`, странициране |
| `/api/skills/[id]` | PUT | Актуализира `enabled` или `mode` |
| `/api/skills/[id]` | DELETE | Премахва регистрацията по идентификатор |
| `/api/skills/install` | POST | Инсталира персонализирано умение (код на обработчик + схема) |
| `/api/skills/marketplace` | GET | Търси в каталога SkillsMP (връща популярни предложения по подразбиране, когато `q` е празно) |
| `/api/skills/marketplace/install` | POST | Инсталира умение от SkillsMP (изисква активен доставчик = `skillsmp`) |
| `/api/skills/skillssh` | GET | Търси в каталога skills.sh (`?q=&limit=`, ограничено до 100) |
| `/api/skills/skillssh/install` | POST | Инсталира умение от skills.sh (изисква активен доставчик = `skillssh`) |
| `/api/skills/executions` | GET | Страницирана история на изпълненията (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Изпълнява регистрирано умение еднократно |

Крайната точка `POST /api/skills/executions` връща HTTP `503` с `{ error: "Skills execution is disabled..." }`, когато `settings.skillsEnabled === false` (`executor.ts:42-45`). Операторите могат да превключат главния ключ от **Настройки → AI**.

### Пример: инсталиране на персонализирано умение

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

Низът `handlerCode` представлява **търсене по име на обработчик** — не изпълним код. Изпълнителят го съпоставя чрез `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Инсталациите от пазара съхраняват текста от SKILL.md в това поле като документация и насочват изпълнението през генерирани от модела извиквания на инструменти. Предоставеният от потребителя произволен изходен код не се изпълнява чрез eval.

---

## MCP инструменти

Четири MCP инструмента обгръщат интерфейса за умения (`open-sse/mcp-server/tools/skillTools.ts`). Те се регистрират автоматично при стартирането на MCP сървъра.

| Инструмент                    | Описание                                                                |
| ----------------------------- | ----------------------------------------------------------------------- |
| `omniroute_skills_list`       | Изброява уменията; незадължителни филтри: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Активира/деактивира умение чрез `skillId`                               |
| `omniroute_skills_execute`    | Изпълнява умение с входни данни                                         |
| `omniroute_skills_executions` | Скорошна хронология на изпълненията (по подразбиране 50, максимум 100)  |

Вижте [MCP-SERVER.md](./MCP-SERVER.md) за настройването на транспорта и присвояването на обхвати.

---

## A2A интеграция

`src/lib/skills/a2a.ts` експортира A2A дескриптора на умението `memory_aware_routing` и помощната функция `registerA2ASkill(registry)`. Персонализираните A2A умения се намират в `src/lib/a2a/skills/` и се насочват чрез `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Вижте [A2A-SERVER.md](./A2A-SERVER.md) за пълния жизнен цикъл на задачите.

---

## Добавяне на ново вградено умение

1. **Дефинирайте обработчика** в `src/lib/skills/builtins.ts` (или в съседен файл под `src/lib/skills/builtin/`). Сигнатура: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Път за изпълнение в пясъчна среда?** Извикайте `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Използвайте `normalizeImage()` спрямо списъка с разрешени образи.
3. **Път във файловата система?** Винаги го подавайте през `resolveWorkspacePath(input, context)`, преди да осъществявате достъп до диска.
4. **Мрежова заявка?** Използвайте `safeOutboundFetch` с `guard: "public-only"`; пречиствайте заглавките чрез `sanitizeHeaders()`.
5. **Регистрирайте** чрез добавяне на записа към `builtinSkills` (или чрез извикване на функция от типа `registerBrowserSkill(executor)` при стартиране).
6. **Свържете псевдонимите на вградените инструменти** (незадължително) в `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), ако моделът нагоре по веригата подава различно име.
7. **Тестове** в `src/lib/skills/__tests__/` (Vitest).

---

## Добавяне на персонализирано (невградено) умение

1. Регистрирайте обработчика при стартиране на процеса:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Добавете умението чрез `POST /api/skills/install` (полето `handlerCode` трябва да съвпада с името на регистрирания обработчик).
3. Превключете `mode` на `on` или `auto` чрез `PUT /api/skills/[id]`.

---

## Съвети за експлоатация

- **Главен превключвател:** `settings.skillsEnabled = false` блокира всички изпълнения и връща HTTP `503` за `/api/skills/executions`. Регистърът продължава да се зарежда.
- **Ограничаване на изходящия трафик:** оставете `SKILLS_SANDBOX_NETWORK_ENABLED` без зададена стойност (по подразбиране) за напълно изолирана от мрежата пясъчна среда. `networkEnabled: true` за отделно извикване все пак изисква главният механизъм за разрешаване да е активиран.
- **Разрешаване на конкретни образи:** задайте `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`, за да разширите списъка с разрешени образи.
- **Одит на изпълненията:** `/dashboard/skills/executions` и `omniroute_skills_executions` изпълняват заявки към `skill_executions`. Успешните изпълнения включват `durationMs`; неуспешните включват `errorMessage`.
- **Инвалидиране на кеша:** извикайте `skillRegistry.invalidateCache()` след ръчни промени в базата данни; в противен случай изчакайте 60 s.
- **Анонимно работно пространство:** когато `apiKeyId` е празно, всички извиквания се хешират към едно и също работно пространство `"anonymous"` — кодът, който отчита споделянето, трябва винаги да подава реален ключ.

---

## Жизнен цикъл на изпълнението (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) е **сингълтон**, който управлява всяко извикване на умение. Разбирането на жизнения му цикъл е от решаващо значение за отстраняването на проблеми с изтичане на времето, повторни опити и състоянието на изпълнението.

### Жизнен цикъл в 5 етапа

```
   извикан execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← поставено на опашка, все още не е стартирано (създаден е ред в БД)
  └──────┬──────┘
         │ стартиране на обработчика
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← обработчикът е извикан с ограничение на времето
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (няма друг път — прекратено от родителския процес)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Редът в БД е актуализиран със състояние, изход и durationMs
```

### Конфигурация по подразбиране

| Настройка    | По подразбиране  | Конфигурира се чрез                  |
| ------------ | ---------------- | ------------------------------------ |
| `timeout`    | `30000` (30 сек) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`              | `skillExecutor.setMaxRetries(count)` |

> **Важно**: Изпълнителят е сингълтон — извикването на `setTimeout()` засяга глобално всички последващи извиквания. Понастоящем не се поддържат отделни ограничения на времето за всяко умение; ако са ви необходими различни ограничения за отделните умения, стартирайте отделни процеси или разклонете изпълнителя.

### Стойности на състоянието

От `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Поставено на опашка, все още не е стартирано
  RUNNING = "running", // Обработчикът е извикан
  SUCCESS = "success", // Обработчикът върна валиден изход
  ERROR = "error", // Обработчикът хвърли изключение
  TIMEOUT = "timeout", // Надвишено е ограничението на времето на изпълнителя
}
```

> **Забележка**: Състоянието `TIMEOUT` е дефинирано в изброяването, но **в действителност не се записва в БД** от текущата имплементация на изпълнителя — изтичанията на времето се представят като `ERROR` със съобщението `"Skill execution timed out"`. Изброяването на състоянията е запазено за бъдеща употреба.

### Преглед на изпълненията

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Получаване на конкретно изпълнение по идентификатор
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Изброяване на последните изпълнения за API ключ
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Преброяване на всички изпълнения
const total = skillExecutor.countExecutions("api-key-id");
```

### Поведение при повторни опити

Настройката `maxRetries` се съхранява, но **понастоящем не се използва** от метода `execute()` на изпълнителя — той извършва само един опит. Стойността `maxRetries` е достъпна за бъдеща имплементация и за hook-ове, които искат да я прочетат.

Засега повторните опити трябва да бъдат имплементирани в самия обработчик на умението. Вградените
умения се регистрират в изпълнителя (напр. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` в `src/lib/skills/builtin/`); всеки регистриран от вас обработчик
може да обвие собствен цикъл за повторни опити:

```ts
// вътре в обработчик на умение
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

## SkillMode в детайли

Изброяването `SkillMode` (`src/lib/skills/types.ts`) определя **кога и как** се извикват уменията:

```ts
enum SkillMode {
  AUTO = "auto", // LLM решава кога да извика умението
  MANUAL = "manual", // Извиква се само при изрична заявка от потребителя
  HYBRID = "hybrid", // AUTO оценяване + ръчно заместване
}
```

> **Забележка**: Кодовата база дефинира `SkillMode` (AUTO/MANUAL/HYBRID), докато полето `Skill.mode` използва различна структура (`"on" | "off" | "auto"`). Те са свързани, но не са идентични — `SkillMode` служи за политиката на изпълнителя, а `Skill.mode` — за активиране на отделните умения.

### Кога да използвате всеки режим

| Режим    | Поведение на LLM                                                                                  | Случай на употреба                                            |
| -------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `AUTO`   | LLM може да извика умението, когато прецени, че е необходимо                                      | Умения с общо предназначение (четене на файлове, HTTP заявки) |
| `MANUAL` | LLM не може да извика умението; то се задейства само чрез изрично API извикване на `executeSkill` | Чувствителни операции (запис в база данни, плащания)          |
| `HYBRID` | LLM може да предложи умението; потребителят трябва да го потвърди                                 | Умения със странични ефекти, които не са опасни               |

### AUTO оценяване

Когато режимът `AUTO` е активен, всяко кандидат-умение се оценява спрямо контекста
на заявката чрез `scoreAutoSkill()` в `src/lib/skills/injection.ts` — адитивна
система с целочислени точки (съвпадение с името на умението, припокриване на токени
в име/етикет/описание, подсказки от причината във фоновия контекст, бонус/наказание
за подсказка за доставчик). Първите `AUTO_MAX_SKILLS = 5` умения с
`score >= AUTO_MIN_SCORE = 3` се добавят като инструменти, които могат да бъдат
извиквани, като равенствата се разрешават първо по `installCount`, а след това по
име. Вижте пълната таблица с точки в [**Генериране на схема за инструменти → AUTO оценяване**](#auto-scoring)
по-рано в този документ; няма праг с плаваща запетая от типа `0.6` и няма
оценяване в `registry.ts`.

---

## Каталог с вградени умения

OmniRoute се предоставя с подбран набор от вградени умения в `src/lib/skills/builtin/`. Най-често използваните са:

### Умение за автоматизация на браузър

Умението за браузър (`src/lib/skills/builtin/browser.ts`) осигурява автоматизация на браузър без графичен интерфейс чрез Playwright/Puppeteer. **То е реализирано, но не е включено в каталога с умения по подразбиране** — за да го използвате, инсталирайте отделно разширението за браузър.

```ts
// Активиране във вашата конфигурация
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Винаги изисква изрично извикване
  allowedSkills: ["browser"],
  timeout: 60000, // 60 сек. за зареждане на страници
  maxRetries: 1,
};
```

### Други категории вградени умения

| Категория         | Умения                                                  | Режим  |
| ----------------- | ------------------------------------------------------- | ------ |
| Файлов вход/изход | `file_read`, `file_write`                               | AUTO   |
| HTTP              | `http_request`                                          | AUTO   |
| Търсене           | `web_search`                                            | AUTO   |
| Изпълнение на код | `eval_code` (JavaScript/Python в изолирана среда)       | HYBRID |
| Система           | `execute_command` (изпълнение на CLI в изолирана среда) | MANUAL |

### Добавяне на персонализирано умение

Вижте [SDK за плъгини и интегриране на умения](./PLUGIN_SDK.md), за да научите как да добавите персонализирано умение чрез системата за плъгини.

---

## Вижте също

- [MCP-SERVER.md](./MCP-SERVER.md) — регистриране на MCP инструменти и транспорти
- [A2A-SERVER.md](./A2A-SERVER.md) — жизнен цикъл на A2A задачите и пренасочване към умения
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — въведение за потребители
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — конвейер за заявки и карта на компонентите
- Изходен код: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Тестове: `src/lib/skills/__tests__/integration.test.ts`
