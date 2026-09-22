# Contributing to OmniRoute (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Налаштування середовища розробки

### Передумови

- **Node.js** `>=22.22.3 <23` або `>=24.0.0 <27` (рекомендовано: 24 LTS)
- **npm** 10+

> **Користувачам npm v11+ (Node 24+):** після `npm install` перевірте, чи встановлено нативні модулі:
> `node -e "require('better-sqlite3')"`. Якщо команда завершується помилкою `MODULE_NOT_FOUND`,
> виконайте `npm approve-scripts better-sqlite3 && npm install`. Див.
> [Усунення несправностей](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Клонування та встановлення

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Змінні середовища

```bash
# Створіть файл .env із шаблону
cp .env.example .env

# Згенеруйте необхідні секрети
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Основні змінні для розробки:

| Змінна                 | Значення за замовчуванням для розробки | Опис                            |
| ---------------------- | -------------------------------------- | ------------------------------- |
| `PORT`                 | `20128`                                | Порт сервера                    |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`               | Базова URL-адреса для фронтенду |
| `JWT_SECRET`           | (згенеруйте вище)                      | Секрет для підписування JWT     |
| `INITIAL_PASSWORD`     | `CHANGEME`                             | Пароль для першого входу        |
| `APP_LOG_LEVEL`        | `info`                                 | Рівень деталізації журналювання |

### Налаштування панелі керування

Панель керування надає перемикачі інтерфейсу для функцій, які також можна налаштувати за допомогою змінних середовища:

| Розташування налаштування | Перемикач               | Опис                                        |
| ------------------------- | ----------------------- | ------------------------------------------- |
| Налаштування → Розширені  | Режим налагодження      | Увімкнути журнали запитів налагодження (UI) |
| Налаштування → Загальні   | Видимість бічної панелі | Показати/приховати розділи бічної панелі    |

Ці налаштування зберігаються в базі даних і не втрачаються після перезапусків, замінюючи встановлені значення змінних середовища за замовчуванням.

### Локальний запуск

```bash
# Режим розробки (гаряче перезавантаження)
npm run dev

# Виробнича збірка
npm run build    # next build → .build/next/, потім assembleStandalone → dist/
npm run start

# Швидка компіляція лише бекенду/API для перевірки змін від учасників
npm run build:contributor

# Релізна збірка (чиста повторна збірка + контрольний файл HEAD — обов’язково для розгортання)
npm run build:release   # rm -rf .build dist, потім збірка + запис dist/BUILD_SHA

# Типова конфігурація порту
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Збірка для учасників виконує лише перевірку компіляції: вона не формує автономний
дистрибутив і не збирає необов’язкові ресурси нативного пакування. Використовуйте звичайну виробничу збірку, коли
потрібно перевірити готовий до розповсюдження пакет.

### Структура результатів збірки

| Каталог   | Вміст                                                                                | Відстежується |
| --------- | ------------------------------------------------------------------------------------ | ------------- |
| `src/`    | Вихідний код застосунку (TypeScript / TSX)                                           | Так           |
| `.build/` | Проміжні файли — результат `next build` (ігнорується Git, `distDir = .build/next`)   | Ні            |
| `dist/`   | Готовий до розповсюдження пакет — сформований `assembleStandalone` (ігнорується Git) | Ні            |

Конвеєр збірки виконується за один прохід:

```
npm run build
  └─ next build → .build/next/standalone  (результат Next.js)
  └─ assembleStandalone()                 (копіює автономну збірку + статичні + публічні + нативні ресурси)
       └─ результат: dist/                (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` додатково спочатку очищає обидва каталоги та записує
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) як контрольний маркер цілісності розгортання.

`npm run build:contributor` використовує профіль збірки лише для бекенду. Під час збірки він тимчасово замінює
файли інтерфейсу панелі керування заглушками, зберігає обробники маршрутів API та відновлює початкові файли
після збірки. Використовуйте `npm run build` для змін, які впливають на інтерфейс панелі керування, або для повної
перевірки релізу; профіль для учасників не замінює релізну збірку.

> **Примітка щодо розгортання на VPS:** віддалений каталог образу `/usr/lib/node_modules/omniroute/app/`
> не змінився. Засоби розгортання синхронізують вміст `dist/` із ним за допомогою rsync.
> Змінився лише шлях до результату збірки в репозиторії (`app/` → `dist/`).

URL-адреси за замовчуванням:

- **Панель керування**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Робочий процес Git

> ⚠️ **НІКОЛИ не виконуйте коміти безпосередньо в `main`.** Завжди використовуйте гілки функціональності.
>
> **Базова гілка PR:** вибирайте активну гілку `release/vX.Y.Z` (а не `main`). Див.
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md), щоб дізнатися про
> модель з окремою гілкою для кожного випуску та створенням тегу під час випуску.

```bash
# Створіть гілку від останнього коміту активної гілки випуску (приклад: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... внесіть зміни ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Відкрийте Pull Request із базовою гілкою release/v3.8.49
```

### Іменування гілок

| Префікс     | Призначення                  |
| ----------- | ---------------------------- |
| `feat/`     | Нові функції                 |
| `fix/`      | Виправлення помилок          |
| `refactor/` | Реструктуризація коду        |
| `docs/`     | Зміни в документації         |
| `test/`     | Додавання/виправлення тестів |
| `chore/`    | Інструменти, CI, залежності  |

### Повідомлення комітів

Дотримуйтеся специфікації [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Області (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Запуск тестів

```bash
# Усі тести (модульні + vitest + екосистемні + e2e)
npm run test:all

# Окремий файл тестів (вбудований засіб запуску тестів Node.js — використовується для більшості тестів)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Лише модульні тести, на які впливають ваші зміни (той самий селектор TIA, що й у шлюзі CI, #8084)
npm run test:scoped            # зміни в останньому коміті (або в робочому дереві)
npm run test:scoped:staged     # лише індексовані зміни — добре поєднується із запуском перед комітом
npm run test:scoped:full       # спочатку перебудувати мапу графа імпортів (після додавання/переміщення файлів)
# Код завершення 1 + "run the full suite" означає, що змінився центральний файл (tsconfig, package.json, …) або
# невідображене джерело — селектор безпечно завершується помилкою й ніколи не пропускає тести без повідомлення.

# Vitest (сервер MCP, autoCombo, кеш)
npm run test:vitest

# Тести E2E (потребують Playwright)
npm run test:e2e

# E2E для клієнтів протоколів (транспортні механізми MCP, A2A)
npm run test:protocols:e2e

# Тести сумісності з екосистемою
npm run test:ecosystem

# Поріг покриття: 60% інструкцій/рядків/функцій/гілок
npm run test:coverage
npm run coverage:report

# Перевірка лінтингу та форматування
npm run lint
npm run check

# Контрольний тест комбінацій із реальними зовнішніми сервісами (потребує доступу до VPS і коштів у реальних провайдерів)
# Звертається до РЕАЛЬНИХ провайдерів — це трохи коштує. НІКОЛИ не запускається в CI. Коректно пропускається без прапорця.
# Потрібно: доступ ssh root@192.168.0.15 (завантажує з VPS доступний лише для читання знімок БД).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Оперативний тест фази 3 на VPS — звичайні скрипти Node ESM, які безпосередньо звертаються до активного сервера .15.
# Потрібно: доступ ssh root@192.168.0.15 (комбінації створюються/видаляються через SSH sqlite).
# Звертається до РЕАЛЬНИХ провайдерів (невелика вартість). Створює/видаляє лише комбінації __live_test__*. НІКОЛИ не запускається в CI.
# На .15 встановлено REQUIRE_API_KEY=false, тому ключ API не потрібен, але враховуються COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, якщо їх задано.
npm run test:combo:live:vps              # 7 сценаріїв HTTP (пріоритет/циклічний розподіл/зважений розподіл/вартість/об'єднання/автоматичний режим + працездатність)
npm run test:combo:live:vps:failover     # додає реальний сценарій перемикання між провайдерами (загалом 8)
```

Примітки щодо покриття:

- `npm run test:coverage` вимірює покриття вихідного коду основним набором модульних тестів, виключає `tests/**` і включає `open-sse/**`
- Запити на злиття мають зберігати поріг покриття на рівні **60%+** інструкцій/рядків/функцій/гілок
- Якщо PR змінює робочий код у `src/`, `open-sse/`, `electron/` або `bin/`, у тому самому PR потрібно додати або оновити автоматизовані тести
- `npm run coverage:report` виводить докладний звіт за кожним файлом з останнього запуску перевірки покриття
- `npm run test:coverage:legacy` зберігає старішу метрику для історичного порівняння
- Поетапний план покращення покриття див. у `docs/ops/COVERAGE_PLAN.md`

### Вимоги до запиту на злиття

Перш ніж відкривати PR, скористайтеся
[рекомендованим процесом внесення змін](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), щоб виконати цільовий цикл перевірок для
внесених змін. Повний набір модульних тестів (4 сегменти CI), Vitest, поріг покриття **60%+** і
робоча збірка належать до відповідальності CI — їх локальний запуск не надає жодної додаткової інформації, якої
ще не нададуть перевірки PR, а на менш потужних машинах він може перевантажити систему (#8084):

- Запустіть файли тестів, які охоплюють ваші зміни: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Запустіть `npm run lint`
- Щоразу, коли змінюється робочий код, додайте або оновіть автоматизовані тести в тому самому PR
- Якщо робочий код змінено, зазначте змінені або додані файли тестів в описі PR
- Перевірте результат SonarQube для PR, якщо секрети проєкту налаштовано в CI

Поточний стан тестів: **122 файли модульних тестів**, що охоплюють:

- Транслятори провайдерів і перетворення форматів
- Обмеження частоти запитів, автоматичний вимикач і відмовостійкість
- Семантичний кеш, ідемпотентність, відстеження прогресу
- Операції з базою даних і схему (21 модуль БД)
- Потоки OAuth та автентифікацію
- Валідацію кінцевих точок API (Zod v4)
- Інструменти сервера MCP і контроль областей доступу
- Системи пам'яті та навичок

---

## Стиль коду

- **ESLint** — запускайте `npm run lint` перед комітом
- **Prettier** — автоматичне форматування через `lint-staged` під час коміту (2 пробіли, крапки з комою, подвійні лапки, ширина 100 символів, кінцеві коми в стилі es5)
- **TypeScript** — увесь код у `src/` використовує `.ts`/`.tsx`; `open-sse/` використовує `.ts`/`.js`; документуйте за допомогою TSDoc (`@param`, `@returns`, `@throws`)
- **Без `eval()`** — ESLint застосовує правила `no-eval`, `no-implied-eval`, `no-new-func`
- **Валідація Zod** — використовуйте схеми Zod v4 для валідації всіх вхідних даних API
- **Іменування**: файли = camelCase/kebab-case, компоненти = PascalCase, константи = UPPER_SNAKE

### Обробка помилок / порожні блоки catch

Ніколи не залишайте `catch` без пояснення. Віднесіть його до однієї з двох категорій (це практичне втілення суворого правила «ніколи мовчки не ігнорувати помилки в потоках SSE»):

- **Навмисно (наше власне очищення/телеметрія за принципом best-effort)** — помилка тут очікувана й нешкідлива; додайте однорядковий коментар із поясненням, без журналювання (ця домовленість дає змогу уникнути шуму від журналювання кожного запиту).

  ```ts
  } catch {} // закриття вже закритого контролера після від’єднання клієнта є очікуваним
  ```

- **Слід журналювати (зовнішній/наданий викликачем код або ігнорування змінює потік керування)** — залиште `catch` (ніколи не дозволяйте йому перервати потік), але виведіть контекстне повідомлення через `console.debug`/`warn`, щоб помилку можна було виявити.

  ```ts
  } catch (e) {
    console.debug("[STREAM] помилка зворотного виклику onFailure:", e);
  }
  ```

Приклади застосування див. у `open-sse/utils/stream.ts` і `open-sse/utils/streamHandler.ts`.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Додавання нового провайдера

### Крок 1: Зареєструйте константи провайдера

Додайте їх до `src/shared/constants/providers.ts` — валідація за допомогою Zod виконується під час завантаження модуля.

### Крок 2: Додайте виконавець (якщо потрібна власна логіка)

Створіть виконавець у `open-sse/executors/your-provider.ts`, успадкувавши його від базового виконавця.

### Крок 3: Додайте транслятор (якщо формат відрізняється від OpenAI)

Створіть транслятори запитів і відповідей у `open-sse/translator/`.

### Крок 4: Додайте конфігурацію OAuth (якщо використовується OAuth)

Додайте облікові дані OAuth до `src/lib/oauth/constants/oauth.ts`, а сервіс — до `src/lib/oauth/services/`.

Якщо upstream-провайдер поширює публічний OAuth client_id/secret або ключ Firebase Web API у своєму публічному CLI / браузерному пакеті, **не** вбудовуйте його як рядковий літерал. Використовуйте `resolvePublicCred()` з `open-sse/utils/publicCreds.ts` і додайте запис із замаскованими байтами до `EMBEDDED_DEFAULTS`. Повний обов’язковий робочий процес задокументовано в [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Усередині обробників/виконавців повідомлення про помилки, що надходять клієнту, мають проходити через `buildErrorBody()` / `sanitizeErrorMessage()` з `open-sse/utils/error.ts` — ніколи не додавайте необроблені `err.stack` або `err.message` до тіла Response. Див. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Крок 5: Зареєструйте моделі

Додайте визначення моделей до `open-sse/config/providerRegistry.ts`.

### Крок 6: Додайте тести

Напишіть модульні тести в `tests/unit/`, які щонайменше охоплюють:

- Реєстрацію провайдера
- Трансляцію запитів і відповідей
- Обробку помилок

---

## Контрольний список Pull Request

- [ ] Тести проходять (`npm test`)
- [ ] Перевірка лінтером проходить (`npm run lint`)
- [ ] Збірка виконується успішно (`npm run build`)
- [ ] Додано типи TypeScript для нових публічних функцій та інтерфейсів
- [ ] Немає жорстко закодованих секретів або резервних значень
- [ ] Публічні облікові дані вбудовано через `resolvePublicCred()` (див. [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), а не задано як літерали
- [ ] Відповіді з помилками проходять через `buildErrorBody()` / `sanitizeErrorMessage()` — у тілах відповідей немає необроблених трасувань стека (див. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Команди оболонки (`exec` / `spawn`) передають значення середовища виконання через `env`, а не через інтерполяцію рядків
- [ ] Усі вхідні дані перевіряються за допомогою схем Zod
- [ ] Для змін, видимих користувачам, додано **фрагмент** журналу змін у `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` (див. [`changelog.d/README.md`](./changelog.d/README.md)) — **не** редагуйте `CHANGELOG.md` безпосередньо; фрагменти об’єднуються під час випуску й ніколи не спричиняють конфліктів між PR
- [ ] Документацію оновлено (якщо застосовно)
- [ ] Не створено нових сповіщень CodeQL / Secret-Scanning або кожне з них відхилено з технічним обґрунтуванням і посиланням на відповідний документ у `docs/security/`
- [ ] Маршрути, які запускають дочірні процеси (`/api/mcp/`, `/api/cli-tools/runtime/`), класифіковано як `isLocalOnlyPath()` у `src/server/authz/routeGuard.ts` — див. [жорстке правило №15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] У повідомленнях комітів немає завершальних рядків `Co-Authored-By` — коміти мають відображатися виключно під Git-ідентичністю власника репозиторію (жорстке правило №16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Отримання допомоги

- **Архітектура**: Див. [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Довідник API**: Див. [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Документація з безпеки**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Документація з експлуатації**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Проблеми**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: Записи архітектурних рішень див. у `docs/adr/`
