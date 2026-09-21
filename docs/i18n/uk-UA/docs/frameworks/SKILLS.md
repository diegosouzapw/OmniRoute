# Skills Framework (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Джерело істини:** `src/lib/skills/` і `src/app/api/skills/`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute надає розширюваний фреймворк навичок, який дає змогу мовним моделям (і операторам) компонувати багаторазово використовувані можливості — від читання файлової системи та HTTP-запитів до ізольованого виконання коду й перевірених навичок із маркетплейсу.

Навичка — це версіонована, визначена схемою одиниця роботи. OmniRoute може додавати навички як визначення інструментів до вихідних запитів, перехоплювати виклики інструментів, що повертаються від моделі, запускати відповідний обробник і передавати результат назад моделі, щоб розмова могла продовжуватися. Модель ніколи не бачить реалізацію — лише інтерфейс інструмента.

---

## Agent Skills і Omni Skills

OmniRoute має дві окремі, але взаємодоповнювальні системи навичок:

| Вимір            | **Omni Skills** (цей документ)                                                | **Agent Skills**                                                                                  |
| :--------------- | :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Призначення      | Впровадження інструментів LLM + ізольоване виконання                          | Каталог SKILL.md для виявлення та використання зовнішніми агентами                                |
| Джерело істини   | `src/lib/skills/` + маркетплейс                                               | `src/lib/agentSkills/` + каталог `skills/`                                                        |
| Режим виконання  | Додаються до вихідних запитів, виконуються під час подій виклику інструментів | Статичний каталог markdown + кінцеві точки виявлення REST/MCP/A2A                                 |
| Хто використовує | Сам OmniRoute (комбінована маршрутизація, вхідні виклики LLM)                 | Зовнішні агенти, клієнти MCP, оркестратори A2A                                                    |
| Кількість        | Змінна (залежить від маркетплейсу)                                            | 45 записів каталогу (23 API + 21 CLI + 1 конфігурація)                                            |
| Формат           | `SkillDefinition` зі схемою інструмента + обробником                          | Метадані frontmatter у `SKILL.md` + тіло markdown                                                 |
| Виявлення        | REST `/api/skills/*` + інструменти MCP `omniroute_skills_*`                   | REST `/api/agent-skills/*` + інструменти MCP `omniroute_agent_skills_*` + A2A `list-capabilities` |

**Omni Skills** — це рушій виконання: вони визначають, що OmniRoute _може робити_, коли LLM викликає інструмент.

**Agent Skills** — це каталог документації: вони пояснюють зовнішнім агентам, _як використовувати_ REST API та CLI OmniRoute, за допомогою структурованих файлів SKILL.md, які можна безпосередньо додавати до запитів агентів.

Відомості про каталог Agent Skills, генератор, інструменти MCP і навичку A2A див. у [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Основні поняття

### Джерела навичок

В одному реєстрі співіснують навички з трьох джерел:

1. **Вбудовані навички** (`src/lib/skills/builtins.ts`) — постачаються разом з OmniRoute. Охоплюють поширені випадки:
   - `file_read`, `file_write` — ізольований робочий простір для кожного API-ключа в `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — вихідний HTTP через `safeOutboundFetch` із `guard: "public-only"`
   - `web_search` — змінний постачальник пошуку з кешуванням (`executeWebSearch`)
   - `eval_code` — ізольоване в Docker виконання `node` або `python`
   - `execute_command` — ізольована в Docker команда оболонки
   - `browser` — каркас на базі Playwright, вимкнений за замовчуванням (`builtin/browser.ts`)
2. **SkillsMP** (маркетплейс OmniRoute) — отримуються з `https://skillsmp.com/api/v1/skills/search`. Потребує `skillsmpApiKey` у налаштуваннях.
3. **SkillsSH** (каталог спільноти `skills.sh`) — отримуються з `https://skills.sh/api/search`. Автентифікація не потрібна; вміст SKILL.md завантажується безпосередньо з GitHub raw.

Єдиний «активний постачальник» визначає, з якого каталогу панель керування встановлює навички (`src/lib/skills/providerSettings.ts`). Змінити його можна в розділі **Налаштування → Пам’ять і навички**. Значення за замовчуванням: `skillsmp`.

### Ідентичність навички

Ключем навичок у реєстрі в пам’яті (`src/lib/skills/registry.ts`) є `name@version`. Версія має відповідати semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` розпізнає обмеження `^`, `~`, `>`, `>=`, `<`, `<=`, `==` і точний збіг.

### Режим навички

Кожна навичка має режим виконання, який визначає, коли її буде додано:

| Режим  | Поведінка                                                                                                |
| ------ | -------------------------------------------------------------------------------------------------------- |
| `on`   | Завжди додається як визначення інструмента                                                               |
| `off`  | Ніколи не додається й не може виконуватися                                                               |
| `auto` | Оцінюється відносно вхідного запиту; додається, лише якщо оцінка ≥ `AUTO_MIN_SCORE` (за замовчуванням 3) |

`auto` — режим за замовчуванням для навичок, установлених із маркетплейсу. Поєднання `enabled=true` і `mode="off"` означає «зареєстрована, але неактивна» — перемикання `enabled` через застарілий стовпець також оновлює `mode`, щоб старі шляхи виконання коду залишалися узгодженими (`src/app/api/skills/[id]/route.ts`).

### Статус (виконання)

Виконання навичок відстежуються в таблиці `skill_executions` із такими статусами (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Кеш реєстру

`SkillRegistry` — це singleton із 60-секундним TTL-кешем (`registry.ts:14`). `loadFromDatabase()` є ідемпотентним і усуває дублювання одночасних викликів через `pendingLoad`. Будь-який запис (`register`/`unregister`/`unregisterById`) анулює кеш. Шукайте версії за допомогою `getSkillVersions(name)` і `resolveVersion(name, constraint)`.

### Додавання з урахуванням постачальника

`injectSkills()` у `src/lib/skills/injection.ts` — це точка входу, яка перетворює зареєстровані навички на визначення інструментів для конкретного постачальника:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Назва інструмента кодується як `name@version`, щоб обробник міг вибрати правильну версію, коли модель викликає його у відповіді.

### Оцінювання AUTO

Коли `mode="auto"`, кожна потенційна навичка оцінюється відповідно до контексту запиту (`scoreAutoSkill()` у `injection.ts`):

| Сигнал                                                           | Бали        |
| ---------------------------------------------------------------- | ----------- |
| Назва навички дослівно присутня в контексті                      | +6          |
| Кожен токен назви збігається з токеном контексту                 | +2          |
| Кожен підрядок тегу збігається з контекстом                      | +3          |
| Кожен токен опису збігається з контекстом                        | +1          |
| Причина фонового виконання збігається з токеном назви            | +2 за токен |
| Причина фонового виконання збігається з тегом                    | +2 за токен |
| Підказка щодо провайдера в тегах збігається з провайдером запиту | +2 / −2     |

До запиту додаються 5 найкращих навичок (`AUTO_MAX_SKILLS = 5`) з `score >= AUTO_MIN_SCORE = 3`. У разі однакових оцінок перевага надається спочатку за `installCount` (за спаданням), а потім за назвою в алфавітному порядку (`injection.ts:225-235`).

### Перехоплення викликів інструментів

`handleToolCallExecution()` у `src/lib/skills/interception.ts` викликається обробником чату після того, як вищестоящий сервіс повертає відповідь із викликом інструмента:

1. `extractToolCalls()` зчитує специфічні для провайдера структури (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Спочатку зіставляються псевдоніми вбудованих інструментів (наприклад, `omniroute_web_search` → `web_search`). Вбудовані обробники виконуються безпосередньо.
3. Усе інше спрямовується через `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Результати вставляються назад у відповідь — у `tool_results`, елементи `function_call_output` або блоки Anthropic `tool_result`, залежно від ситуації.

У контексті виконання `customSkillExecutionEnabled` можна встановити значення `false`, щоб дозволити перехоплення лише вбудованих інструментів (використовується шляхами обробки запитів, які явно вимикають користувацькі обробники).

---

## Пісочниця Docker

Шляхи виконання невбудованого коду (`eval_code`, `execute_command`) запускаються всередині Docker через `SandboxRunner` (`src/lib/skills/sandbox.ts`). Кожен контейнер запускається з такими параметрами:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (коли readOnly=true)
```

Значення за замовчуванням (`SandboxRunner.DEFAULT_CONFIG`):

| Поле             | Значення за замовчуванням | Примітки                                                    |
| ---------------- | ------------------------- | ----------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)           | Ділиться на 1000 перед передаванням до `--cpus`             |
| `memoryLimit`    | 256 MB                    | Жорстке обмеження                                           |
| `timeout`        | 30000 ms                  | М’яке завершення через `SIGTERM` + `docker kill`            |
| `networkEnabled` | `false`                   | Перетворюється на `--network none`                          |
| `readOnly`       | `true`                    | Коренева ФС лише для читання; `/tmp` і `/workspace` — tmpfs |

`SandboxRunner.kill(id)` і `killAll()` доступні для завершення роботи; запущені контейнери відстежуються в `runningContainers: Map<string, ChildProcess>`.

### Змінні середовища пісочниці

Налаштовуються через `process.env` у `src/lib/skills/builtins.ts`:

| Змінна середовища                 | Значення за замовчуванням | Призначення                                                                                                    |
| --------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)          | Обмеження для `file_read` і `file_write`                                                                       |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`                  | Обмеження розміру тіла відповіді `http_request`                                                                |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`                  | Обмеження stdout/stderr, що повертаються виклику                                                               |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`                   | Стандартний тайм-аут для команд у пісочниці; обмежений до 60 s                                                 |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`                   | Головний перемикач вихідного трафіку. Установіть `1` або `true`, щоб дозволити ввімкнення для окремого виклику |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (див. нижче)              | Розділений комами список дозволених образів Docker                                                             |

Дозволені за замовчуванням образи: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Будь-які доповнення через `SKILLS_ALLOWED_SANDBOX_IMAGES` об’єднуються зі стандартними значеннями; невідомі образи відхиляються функцією `normalizeImage()`.

> Примітка: окремої змінної середовища `SKILLS_EXECUTION_TIMEOUT_MS` немає. Тайм-аут обробника поза пісочницею жорстко задано як 30 s у `SkillExecutor` (`executor.ts:13`), але його можна перевизначити під час виконання через `skillExecutor.setTimeout(ms)`.

### Ізоляція робочого простору

`file_read` і `file_write` визначають кожен шлях відносно окремого для кожного ключа API робочого простору в `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Обхід шляху (`..`) і заборонені сегменти (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) відхиляються до виконання будь-яких операцій введення-виведення на диску.

### Посилений захист HTTP

`http_request` (`builtins.ts:257`):

- Список дозволених методів: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Заблоковані вихідні заголовки: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Перенаправлення вимкнено (`allowRedirect: false`)
- Маршрутизація через `safeOutboundFetch` із `guard: "public-only"` (приватні діапазони й діапазони зворотного зв’язку заблоковано)
- Відповідь обрізається на рівні `SKILLS_MAX_HTTP_RESPONSE_BYTES`; клієнт отримує `truncated: true`

---

## Гібридний виконавець (попередня версія)

`src/lib/skills/hybrid.ts` визначає `HybridExecutor`, який для кожного виклику вибирає між виконанням `direct` (у межах процесу) і `sandbox`, із повторною спробою через `autoUpgrade` у разі перевищення часу очікування або помилок пам’яті. Підключені реалізації `directExecutor` / `sandboxRunner` є заглушками (`executeDirect`, `executeInSandbox` повертають об’єкти-заповнювачі) — розглядайте цей модуль як контракт, що перебуває в розробці. Фактичне виконання все ще відбувається через `skillExecutor` + `SandboxRunner`.

---

## Сховище

Схема міститься у двох міграціях:

- `src/lib/db/migrations/016_create_skills.sql` — базові таблиці `skills` і `skill_executions` з індексами для `(api_key_id, name)` та `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — додає до `skills` поля `mode`, `source_provider`, `tags` (JSON), `install_count`.

Значення `skill_executions.status` обмежується на рівні бази даних: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Усі кінцеві точки розташовані в `src/app/api/skills/`. Кінцеві точки керування (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) вимагають **автентифікації керування** через `requireManagementAuth()`. Потоки маркетплейсу та встановлення використовують спрощену `isAuthenticated()` (сеанс або API-ключ).

| Кінцева точка | Метод | Призначення |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Перелік зареєстрованих навичок. Підтримує `?q=`, `?mode=on              | off | auto`, `?source=skillsmp | skillssh | local`, пагінацію |
| `/api/skills/[id]` | PUT | Оновити `enabled` або `mode` |
| `/api/skills/[id]` | DELETE | Скасувати реєстрацію за id |
| `/api/skills/install` | POST | Встановити власну навичку (код обробника + схема) |
| `/api/skills/marketplace` | GET | Шукати в каталозі SkillsMP (повертає популярні типові варіанти, коли `q` порожній) |
| `/api/skills/marketplace/install` | POST | Встановити навичку SkillsMP (потрібен активний постачальник = `skillsmp`) |
| `/api/skills/skillssh` | GET | Шукати в каталозі skills.sh (`?q=&limit=`, максимум 100) |
| `/api/skills/skillssh/install` | POST | Встановити навичку skills.sh (потрібен активний постачальник = `skillssh`) |
| `/api/skills/executions` | GET | Історія виконань із пагінацією (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Виконати зареєстровану навичку за спеціальним запитом |

Кінцева точка `POST /api/skills/executions` повертає HTTP `503` із `{ error: "Skills execution is disabled..." }`, коли `settings.skillsEnabled === false` (`executor.ts:42-45`). Оператори можуть перемкнути головний перемикач у **Налаштування → ШІ**.

### Приклад: встановлення власної навички

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

Рядок `handlerCode` — це **ім’я для пошуку обробника**, а не виконуваний код. Виконавець зіставляє його через `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Під час установлення з маркетплейсу текст SKILL.md зберігається в цьому полі як документація, а виконання спрямовується через згенеровані моделлю виклики інструментів. Довільний наданий користувачем вихідний код не виконується через eval.

---

## Інструменти MCP

Чотири інструменти MCP надають доступ до функціоналу навичок (`open-sse/mcp-server/tools/skillTools.ts`). Вони автоматично реєструються під час запуску сервера MCP.

| Інструмент                    | Опис                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `omniroute_skills_list`       | Виводить список навичок; необов’язкові фільтри: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Вмикає/вимикає навичку за `skillId`                                           |
| `omniroute_skills_execute`    | Виконує навичку з вхідними даними                                             |
| `omniroute_skills_executions` | Історія останніх виконань (типово 50, максимум 100)                           |

Налаштування транспортного протоколу та призначення областей доступу див. у [MCP-SERVER.md](./MCP-SERVER.md).

---

## Інтеграція A2A

`src/lib/skills/a2a.ts` експортує дескриптор навички A2A `memory_aware_routing` і допоміжну функцію `registerA2ASkill(registry)`. Користувацькі навички A2A містяться в `src/lib/a2a/skills/` і передаються на виконання через `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Повний життєвий цикл завдання див. у [A2A-SERVER.md](./A2A-SERVER.md).

---

## Додавання нової вбудованої навички

1. **Визначте обробник** у `src/lib/skills/builtins.ts` (або в сусідньому файлі в каталозі `src/lib/skills/builtin/`). Сигнатура: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Потрібен ізольований шлях виконання коду?** Викличте `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Використовуйте `normalizeImage()` для перевірки за списком дозволених образів.
3. **Потрібен шлях файлової системи?** Завжди передавайте його через `resolveWorkspacePath(input, context)`, перш ніж звертатися до диска.
4. **Потрібен мережевий виклик?** Використовуйте `safeOutboundFetch` із `guard: "public-only"`; очищуйте заголовки за допомогою `sanitizeHeaders()`.
5. **Зареєструйте навичку**, додавши запис до `builtinSkills` (або викликавши під час запуску функцію на кшталт `registerBrowserSkill(executor)`).
6. **Налаштуйте псевдоніми вбудованих інструментів** (необов’язково) у `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), якщо зовнішня модель повертає іншу назву.
7. **Тести** розміщуйте в `src/lib/skills/__tests__/` (Vitest).

---

## Додавання користувацької (невбудованої) навички

1. Зареєструйте обробник під час запуску процесу:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Додайте навичку через `POST /api/skills/install` (поле `handlerCode` має відповідати назві зареєстрованого обробника).
3. Перемкніть `mode` на `on` або `auto` через `PUT /api/skills/[id]`.

---

## Поради з експлуатації

- **Головний перемикач:** `settings.skillsEnabled = false` блокує всі виконання та повертає HTTP `503` для `/api/skills/executions`. Реєстр продовжує завантажуватися.
- **Обмеження вихідного мережевого доступу:** не задавайте `SKILLS_SANDBOX_NETWORK_ENABLED` (типове налаштування), щоб забезпечити повністю ізольоване від мережі середовище виконання. Значення `networkEnabled: true` для окремого виклику все одно потребує ввімкнення головного дозволу.
- **Дозвіл конкретних образів:** задайте `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`, щоб розширити список дозволених образів.
- **Аудит виконань:** `/dashboard/skills/executions` і `omniroute_skills_executions` виконують запити до `skill_executions`. Успішні запуски містять `durationMs`, а невдалі — `errorMessage`.
- **Інвалідація кешу:** викличте `skillRegistry.invalidateCache()` після внесення змін до БД вручну; інакше зачекайте 60 с.
- **Анонімний робочий простір:** коли `apiKeyId` порожній, усі виклики хешуються в один робочий простір `"anonymous"` — код, що враховує спільний доступ, завжди має передавати справжній ключ.

---

## Життєвий цикл виконання (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) — це **синглтон**, який керує кожним викликом навички. Розуміння його життєвого циклу є критично важливим для налагодження тайм-аутів, повторних спроб і стану виконання.

### 5 етапів життєвого циклу

```
   викликано execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← у черзі, ще не розпочато (створено рядок у БД)
  └──────┬──────┘
         │ запуск обробника
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← обробник викликано з тайм-аутом
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (інших шляхів немає — завершено батьківським процесом)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Рядок у БД оновлено: статус, результат, durationMs
```

### Конфігурація за замовчуванням

| Налаштування | Значення за замовчуванням | Налаштовується через                 |
| ------------ | ------------------------- | ------------------------------------ |
| `timeout`    | `30000` (30 с)            | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                       | `skillExecutor.setMaxRetries(count)` |

> **Важливо**: Виконавець є синглтоном — виклик `setTimeout()` глобально впливає на всі наступні виклики. Тайм-аути для окремих навичок наразі не підтримуються; якщо для різних навичок потрібні різні тайм-аути, запускайте окремі процеси або створіть форк виконавця.

### Значення статусів

З `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // У черзі, ще не розпочато
  RUNNING = "running", // Обробник викликано
  SUCCESS = "success", // Обробник повернув коректний результат
  ERROR = "error", // Обробник згенерував виняток
  TIMEOUT = "timeout", // Перевищено тайм-аут виконавця
}
```

> **Примітка**: Статус `TIMEOUT` визначено в переліку, але поточна реалізація виконавця **насправді не записує його до БД** — тайм-аути відображаються як `ERROR` з повідомленням `"Skill execution timed out"`. Значення статусу зарезервовано для майбутнього використання.

### Перегляд виконань

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Отримати конкретне виконання за ідентифікатором
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Перелічити останні виконання для ключа API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Підрахувати загальну кількість виконань
const total = skillExecutor.countExecutions("api-key-id");
```

### Поведінка повторних спроб

Налаштування `maxRetries` зберігається, але **наразі не використовується** методом `execute()` виконавця — він виконує лише одну спробу. Значення `maxRetries` доступне для майбутньої реалізації та для хуків, яким потрібно його зчитувати.

Наразі повторні спроби потрібно реалізовувати безпосередньо в обробнику навички. Вбудовані
навички реєструються у виконавці (наприклад, `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` у `src/lib/skills/builtin/`); будь-який зареєстрований
обробник може містити власний цикл повторних спроб:

```ts
// усередині обробника навички
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

## Докладно про SkillMode

Перелік `SkillMode` (`src/lib/skills/types.ts`) визначає, **коли та як** викликаються навички:

```ts
enum SkillMode {
  AUTO = "auto", // LLM вирішує, коли викликати навичку
  MANUAL = "manual", // Викликається лише за явним запитом користувача
  HYBRID = "hybrid", // Оцінювання AUTO + ручне перевизначення
}
```

> **Примітка**: У кодовій базі визначено `SkillMode` (AUTO/MANUAL/HYBRID), тоді як поле `Skill.mode` використовує інший формат (`"on" | "off" | "auto"`). Вони пов’язані, але не ідентичні — `SkillMode` призначений для політики виконавця, а `Skill.mode` — для ввімкнення окремих навичок.

### Коли використовувати кожен режим

| Режим    | Поведінка LLM                                                                   | Сценарій використання                                        |
| -------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `AUTO`   | LLM може викликати навичку, коли вважає це за потрібне                          | Навички загального призначення (читання файлів, HTTP-запити) |
| `MANUAL` | LLM не може викликати навичку; її запускає лише явний виклик API `executeSkill` | Чутливі операції (запис у базу даних, платежі)               |
| `HYBRID` | LLM може запропонувати навичку; користувач має підтвердити                      | Навички, що мають побічні ефекти, але не є небезпечними      |

### Оцінювання AUTO

Коли активний режим `AUTO`, кожна навичка-кандидат оцінюється відносно контексту
запиту функцією `scoreAutoSkill()` у `src/lib/skills/injection.ts` — за адитивною
цілочисельною системою балів (збіг назви навички, перетин токенів назви/тегів/опису,
підказки щодо фонової причини, бонус/штраф за підказку провайдера). Найкращі
`AUTO_MAX_SKILLS = 5` навичок з `score >= AUTO_MIN_SCORE = 3` додаються як
інструменти, доступні для виклику; у разі однакових оцінок перевага визначається
спочатку за `installCount`, а потім за назвою. Повну таблицю балів наведено вище
в цьому документі в розділі [**Генерування схеми інструментів → Оцінювання AUTO**](#auto-scoring);
порогового значення з рухомою комою на кшталт `0.6` немає, як і оцінювання в `registry.ts`.

---

## Каталог вбудованих навичок

OmniRoute постачається з упорядкованим набором вбудованих навичок у `src/lib/skills/builtin/`. Найпоширеніші з них:

### Навичка автоматизації браузера

Навичка браузера (`src/lib/skills/builtin/browser.ts`) забезпечує автоматизацію безголового браузера через Playwright/Puppeteer. **Її реалізовано, але не включено до стандартного каталогу навичок** — щоб використовувати її, окремо встановіть плагін розширення браузера.

```ts
// Увімкніть у своїй конфігурації
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Завжди вимагати явного виклику
  allowedSkills: ["browser"],
  timeout: 60000, // 60 с для завантаження сторінок
  maxRetries: 1,
};
```

### Інші категорії вбудованих навичок

| Категорія                  | Навички                                      | Режим  |
| -------------------------- | -------------------------------------------- | ------ |
| Файлове введення/виведення | `file_read`, `file_write`                    | AUTO   |
| HTTP                       | `http_request`                               | AUTO   |
| Пошук                      | `web_search`                                 | AUTO   |
| Виконання коду             | `eval_code` (ізольований JavaScript/Python)  | HYBRID |
| Система                    | `execute_command` (ізольоване виконання CLI) | MANUAL |

### Додавання власної навички

Інструкції щодо додавання власної навички через систему плагінів див. у розділі [SDK плагінів та інтеграція навичок](./PLUGIN_SDK.md).

---

## Див. також

- [MCP-SERVER.md](./MCP-SERVER.md) — реєстрація інструментів MCP і транспорти
- [A2A-SERVER.md](./A2A-SERVER.md) — життєвий цикл завдань A2A та диспетчеризація навичок
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — вступ для користувачів
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — конвеєр обробки запитів і карта компонентів
- Вихідний код: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Тести: `src/lib/skills/__tests__/integration.test.ts`
