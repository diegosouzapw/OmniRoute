# Contributing to OmniRoute (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Настройка среды разработки

### Предварительные требования

- **Node.js** `>=22.22.3 <23` или `>=24.0.0 <27` (рекомендуется: 24 LTS)
- **npm** 10+

> **Для пользователей npm v11+ (Node 24+):** После `npm install` убедитесь, что нативные модули установлены:
> `node -e "require('better-sqlite3')"`. Если команда завершается с ошибкой `MODULE_NOT_FOUND`,
> выполните `npm approve-scripts better-sqlite3 && npm install`. См.
> [Устранение неполадок](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Клонирование и установка

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Переменные окружения

```bash
# Создайте файл .env из шаблона
cp .env.example .env

# Сгенерируйте необходимые секреты
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Основные переменные для разработки:

| Переменная             | Значение по умолчанию для разработки | Описание                     |
| ---------------------- | ------------------------------------ | ---------------------------- |
| `PORT`                 | `20128`                              | Порт сервера                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`             | Базовый URL для фронтенда    |
| `JWT_SECRET`           | (сгенерируйте выше)                  | Секрет для подписи JWT       |
| `INITIAL_PASSWORD`     | `CHANGEME`                           | Пароль для первого входа     |
| `APP_LOG_LEVEL`        | `info`                               | Уровень подробности журналов |

### Настройки панели управления

Панель управления содержит переключатели функций, которые также можно настроить с помощью переменных окружения:

| Расположение настройки  | Переключатель            | Описание                                      |
| ----------------------- | ------------------------ | --------------------------------------------- |
| Настройки → Расширенные | Режим отладки            | Включить журналы отладки запросов (интерфейс) |
| Настройки → Общие       | Видимость боковой панели | Показать/скрыть разделы боковой панели        |

Эти настройки сохраняются в базе данных и остаются активными после перезапусков, переопределяя значения переменных окружения по умолчанию, если они заданы.

### Локальный запуск

```bash
# Режим разработки (горячая перезагрузка)
npm run dev

# Сборка для рабочей среды
npm run build    # next build → .build/next/, затем assembleStandalone → dist/
npm run start

# Быстрая компиляция только бэкенда/API для проверки изменений от участников
npm run build:contributor

# Релизная сборка (чистая пересборка + контрольный файл HEAD — требуется для развёртывания)
npm run build:release   # rm -rf .build dist, затем сборка + запись dist/BUILD_SHA

# Типовая конфигурация порта
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Сборка для участников выполняет только проверку компиляции: она не формирует автономный
дистрибутив и не собирает необязательные ресурсы для нативных пакетов. Используйте обычную
сборку для рабочей среды, когда требуется проверить готовый к распространению пакет.

### Структура результатов сборки

| Каталог   | Содержимое                                                                               | Отслеживается |
| --------- | ---------------------------------------------------------------------------------------- | ------------- |
| `src/`    | Исходный код приложения (TypeScript / TSX)                                               | Да            |
| `.build/` | Промежуточные файлы — результат `next build` (игнорируется Git, `distDir = .build/next`) | Нет           |
| `dist/`   | Готовый к распространению пакет — формируется `assembleStandalone` (игнорируется Git)    | Нет           |

Конвейер сборки выполняется за один проход:

```
npm run build
  └─ next build → .build/next/standalone  (результат Next.js)
  └─ assembleStandalone()                 (копирует автономную сборку + статические + публичные + нативные ресурсы)
       └─ результат: dist/                (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` дополнительно сначала очищает оба каталога и записывает
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) как контрольный файл целостности развёртывания.

`npm run build:contributor` использует профиль сборки только для бэкенда. Во время сборки он временно заменяет
файлы интерфейса панели управления заглушками, сохраняет обработчики маршрутов API и восстанавливает исходные файлы
после сборки. Используйте `npm run build` для изменений, затрагивающих интерфейс панели управления, или для полной
проверки релиза; профиль для участников не заменяет релизную сборку.

> **Примечание о развёртывании на VPS:** удалённый каталог образа `/usr/lib/node_modules/omniroute/app/`
> не изменился. Инструменты развёртывания синхронизируют содержимое `dist/` с ним с помощью rsync.
> Изменился только путь результатов сборки внутри репозитория (`app/` → `dist/`).

URL-адреса по умолчанию:

- **Панель управления**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Рабочий процесс Git

> ⚠️ **НИКОГДА не выполняйте коммиты напрямую в `main`.** Всегда используйте функциональные ветки.
>
> **Базовая ветка PR:** указывайте в качестве целевой активную ветку `release/vX.Y.Z` (не `main`). Подробнее о
> модели «отдельная ветка для каждого выпуска + тег при выпуске» см. в
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Создайте ветку от последнего коммита активной ветки выпуска (пример: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... внесите изменения ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Откройте Pull Request с базовой веткой release/v3.8.49
```

### Именование веток

| Префикс     | Назначение                    |
| ----------- | ----------------------------- |
| `feat/`     | Новые функции                 |
| `fix/`      | Исправления ошибок            |
| `refactor/` | Реструктуризация кода         |
| `docs/`     | Изменения документации        |
| `test/`     | Добавление/исправление тестов |
| `chore/`    | Инструменты, CI, зависимости  |

### Сообщения коммитов

Следуйте спецификации [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: добавить автоматический выключатель для вызовов провайдера
fix: устранить пограничный случай проверки секрета JWT
docs: обновить SECURITY.md, добавив защиту PII
test: добавить модульные тесты наблюдаемости
refactor(db): консолидировать таблицы ограничения частоты запросов
```

Области (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Запуск тестов

```bash
# Все тесты (модульные + vitest + экосистема + e2e)
npm run test:all

# Один файл тестов (встроенный раннер тестов Node.js — используется для большинства тестов)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Только модульные тесты, затронутые вашим изменением (тот же селектор TIA, что и в проверке CI, #8084)
npm run test:scoped            # изменения в последнем коммите (или рабочем дереве)
npm run test:scoped:staged     # только индексированные изменения — хорошо сочетается с запуском перед коммитом
npm run test:scoped:full       # сначала пересобрать карту графа импортов (после добавления/перемещения файлов)
# Код выхода 1 + "run the full suite" означает, что изменился центральный файл (tsconfig, package.json, …) или
# неотслеживаемый исходный файл — селектор работает безопасно и никогда не пропускает тесты без уведомления.

# Vitest (сервер MCP, autoCombo, кеш)
npm run test:vitest

# Тесты E2E (требуется Playwright)
npm run test:e2e

# E2E для клиентов протоколов (транспорты MCP, A2A)
npm run test:protocols:e2e

# Тесты совместимости с экосистемой
npm run test:ecosystem

# Порог покрытия: 60% инструкций/строк/функций/ветвей
npm run test:coverage
npm run coverage:report

# Проверка линтинга и форматирования
npm run lint
npm run check

# Ограниченный дымовой тест реальных внешних комбинаций (требует доступа к VPS и средств на счетах реальных провайдеров)
# Обращается к РЕАЛЬНЫМ провайдерам — требует небольших затрат. НИКОГДА не запускается в CI. Корректно пропускается без разрешающего флага.
# Требуется: доступ ssh root@192.168.0.15 (загружает с VPS снимок БД только для чтения).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Дымовой тест Phase-3 на рабочем VPS — обычные скрипты Node ESM, обращающиеся напрямую к рабочему серверу .15.
# Требуется: доступ ssh root@192.168.0.15 (комбинации создаются/удаляются через SSH sqlite).
# Обращается к РЕАЛЬНЫМ провайдерам (небольшие затраты). Создаёт/удаляет только комбинации __live_test__*. НИКОГДА не запускается в CI.
# На .15 задано REQUIRE_API_KEY=false, поэтому ключ API не требуется, но при наличии учитываются COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY.
npm run test:combo:live:vps              # 7 HTTP-сценариев (приоритет/циклический/взвешенный/стоимость/объединение/автоматический + состояние)
npm run test:combo:live:vps:failover     # добавляет реальный сценарий переключения между провайдерами (всего 8)
```

Примечания о покрытии:

- `npm run test:coverage` измеряет покрытие исходного кода основным набором модульных тестов, исключает `tests/**` и включает `open-sse/**`
- Запросы на слияние должны сохранять порог покрытия **60%+** для инструкций/строк/функций/ветвей
- Если PR изменяет производственный код в `src/`, `open-sse/`, `electron/` или `bin/`, в том же PR необходимо добавить или обновить автоматизированные тесты
- `npm run coverage:report` выводит подробный отчёт по каждому файлу из последнего запуска проверки покрытия
- `npm run test:coverage:legacy` сохраняет прежнюю метрику для исторического сравнения
- Поэтапный план улучшения покрытия см. в `docs/ops/COVERAGE_PLAN.md`

### Требования к запросу на слияние

Перед открытием PR используйте
[рекомендуемый процесс внесения изменений](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), чтобы выполнить целевой цикл проверок для
внесённых изменений. Полный набор модульных тестов (4 сегмента CI), Vitest, порог покрытия **60%+** и
производственная сборка относятся к ответственности CI — их локальный запуск не даёт дополнительной информации, которой
ещё не предоставят проверки PR, а на менее мощных машинах он может полностью загрузить систему (#8084):

- Запустите файлы тестов, покрывающие ваше изменение: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Запустите `npm run lint`
- При изменении производственного кода добавьте или обновите автоматизированные тесты в том же PR
- Если производственный код был изменён, укажите изменённые или добавленные файлы тестов в описании PR
- Проверьте результат SonarQube для PR, если секреты проекта настроены в CI

Текущее состояние тестов: **122 файла модульных тестов**, охватывающих:

- Трансляторы провайдеров и преобразование форматов
- Ограничение частоты запросов, автоматический выключатель и отказоустойчивость
- Семантический кеш, идемпотентность и отслеживание прогресса
- Операции с базой данных и схему (21 модуль БД)
- Потоки OAuth и аутентификацию
- Валидацию конечных точек API (Zod v4)
- Инструменты сервера MCP и контроль областей доступа
- Системы памяти и навыков

---

## Стиль кода

- **ESLint** — запускайте `npm run lint` перед коммитом
- **Prettier** — автоматическое форматирование через `lint-staged` при коммите (2 пробела, точки с запятой, двойные кавычки, ширина 100 символов, завершающие запятые в стиле es5)
- **TypeScript** — весь код в `src/` использует `.ts`/`.tsx`; `open-sse/` использует `.ts`/`.js`; документируйте с помощью TSDoc (`@param`, `@returns`, `@throws`)
- **Без `eval()`** — ESLint обеспечивает соблюдение правил `no-eval`, `no-implied-eval`, `no-new-func`
- **Валидация с помощью Zod** — используйте схемы Zod v4 для валидации всех входных данных API
- **Именование**: файлы = camelCase/kebab-case, компоненты = PascalCase, константы = UPPER_SNAKE

### Обработка ошибок / пустые блоки catch

Никогда не оставляйте `catch` без объяснения. Относите его к одной из двух категорий (это
практическое применение строгого правила «никогда не игнорировать ошибки в потоках SSE без уведомления»):

- **Преднамеренно (наша собственная очистка/телеметрия по принципу максимальных усилий)** — сбой здесь ожидаем
  и безвреден; добавьте однострочный комментарий с обоснованием, без логирования (это соглашение
  позволяет избежать шума от логирования при каждом запросе).

  ```ts
  } catch {} // закрытие уже закрытого контроллера после отключения клиента ожидаемо
  ```

- **Следует логировать (внешний/предоставленный вызывающей стороной код либо игнорирование изменяет поток управления)** — сохраните
  `catch` (никогда не позволяйте ему нарушить поток), но добавьте контекстный вызов `console.debug`/`warn`, чтобы
  сбой можно было обнаружить.

  ```ts
  } catch (e) {
    console.debug("[STREAM] ошибка обратного вызова onFailure:", e);
  }
  ```

Практические примеры см. в `open-sse/utils/stream.ts` и `open-sse/utils/streamHandler.ts`.

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

## Добавление нового провайдера

### Шаг 1: Зарегистрируйте константы провайдера

Добавьте их в `src/shared/constants/providers.ts` — валидация с помощью Zod выполняется при загрузке модуля.

### Шаг 2: Добавьте исполнитель (если требуется пользовательская логика)

Создайте исполнитель в `open-sse/executors/your-provider.ts`, расширяющий базовый исполнитель.

### Шаг 3: Добавьте преобразователь (если формат не соответствует OpenAI)

Создайте преобразователи запросов и ответов в `open-sse/translator/`.

### Шаг 4: Добавьте конфигурацию OAuth (если используется OAuth)

Добавьте учетные данные OAuth в `src/lib/oauth/constants/oauth.ts`, а сервис — в `src/lib/oauth/services/`.

Если вышестоящий провайдер распространяет публичный OAuth client_id/secret или ключ Firebase Web API в составе своего общедоступного CLI / браузерного пакета, **не** встраивайте его как строковый литерал. Используйте `resolvePublicCred()` из `open-sse/utils/publicCreds.ts` и добавьте запись с маскированными байтами в `EMBEDDED_DEFAULTS`. Полный обязательный рабочий процесс описан в [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

В обработчиках/исполнителях сообщения об ошибках, передаваемые клиенту, должны обрабатываться через `buildErrorBody()` / `sanitizeErrorMessage()` из `open-sse/utils/error.ts` — никогда не помещайте необработанные `err.stack` или `err.message` в тело Response. См. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Шаг 5: Зарегистрируйте модели

Добавьте определения моделей в `open-sse/config/providerRegistry.ts`.

### Шаг 6: Добавьте тесты

Напишите модульные тесты в `tests/unit/`, охватывающие как минимум:

- Регистрацию провайдера
- Преобразование запросов/ответов
- Обработку ошибок

---

## Контрольный список Pull Request

- [ ] Тесты проходят (`npm test`)
- [ ] Линтинг проходит (`npm run lint`)
- [ ] Сборка выполняется успешно (`npm run build`)
- [ ] Для новых публичных функций и интерфейсов добавлены типы TypeScript
- [ ] Нет жёстко заданных секретов или резервных значений
- [ ] Публичные учётные данные вышестоящих сервисов встраиваются через `resolvePublicCred()` (см. [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), но никогда не задаются литералами
- [ ] Ответы с ошибками проходят через `buildErrorBody()` / `sanitizeErrorMessage()` — никаких необработанных трассировок стека в телах ответов (см. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Команды оболочки (`exec` / `spawn`) передают значения времени выполнения через `env`, а не посредством строковой интерполяции
- [ ] Все входные данные проверяются с помощью схем Zod
- [ ] Для изменений, заметных пользователям, добавлен **фрагмент** журнала изменений в `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` (см. [`changelog.d/README.md`](./changelog.d/README.md)) — **не** редактируйте `CHANGELOG.md` напрямую; фрагменты объединяются во время выпуска и никогда не создают конфликтов между PR
- [ ] Документация обновлена (если применимо)
- [ ] Не создано новых предупреждений CodeQL / Secret-Scanning либо каждое из них отклонено с техническим обоснованием и ссылкой на соответствующий документ в `docs/security/`
- [ ] Маршруты, запускающие дочерние процессы (`/api/mcp/`, `/api/cli-tools/runtime/`), классифицированы как `isLocalOnlyPath()` в `src/server/authz/routeGuard.ts` — см. [Жёсткое правило №15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] В сообщениях коммитов отсутствуют завершающие строки `Co-Authored-By` — коммиты должны отображаться исключительно под Git-идентичностью владельца репозитория (Жёсткое правило №16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Получение помощи

- **Архитектура**: см. [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Справочник API**: см. [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Документация по безопасности**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Документация по эксплуатации**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Проблемы**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: записи об архитектурных решениях см. в `docs/adr/`
