# Contributing to OmniRoute (Български)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Настройка на средата за разработка

### Предварителни изисквания

- **Node.js** `>=22.22.2 <23` или `>=24.0.0 <27` (препоръчва се: 24 LTS)
- **npm** 10+

> **За потребители на npm v11+ (Node 24+):** След `npm install` проверете дали нативните модули са инсталирани:
> `node -e "require('better-sqlite3')"`. Ако командата завърши неуспешно с `MODULE_NOT_FOUND`,
> изпълнете `npm approve-scripts better-sqlite3 && npm install`. Вижте
> [Отстраняване на неизправности](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Клониране и инсталиране

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Променливи на средата

```bash
# Създайте своя .env от шаблона
cp .env.example .env

# Генерирайте необходимите тайни стойности
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Основни променливи за разработка:

| Променлива             | Стойност по подразбиране за разработка | Описание                            |
| ---------------------- | -------------------------------------- | ----------------------------------- |
| `PORT`                 | `20128`                                | Порт на сървъра                     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`               | Основен URL адрес за интерфейса     |
| `JWT_SECRET`           | (генерирайте по-горе)                  | Тайна стойност за подписване на JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`                             | Парола за първоначално влизане      |
| `APP_LOG_LEVEL`        | `info`                                 | Ниво на подробност на регистрите    |

### Настройки на таблото за управление

Таблото за управление предоставя превключватели в потребителския интерфейс за функции, които могат да бъдат конфигурирани и чрез променливи на средата:

| Местоположение на настройката | Превключвател                   | Описание                                                               |
| ----------------------------- | ------------------------------- | ---------------------------------------------------------------------- |
| Настройки → Разширени         | Режим за отстраняване на грешки | Активиране на регистри за заявки за отстраняване на грешки (интерфейс) |
| Настройки → Общи              | Видимост на страничната лента   | Показване/скриване на секциите на страничната лента                    |

Тези настройки се съхраняват в базата данни и се запазват между рестартиранията, като при задаване заменят стойностите по подразбиране на променливите на средата.

### Локално стартиране

```bash
# Режим за разработка (автоматично презареждане)
npm run dev

# Продукционна компилация
npm run build    # next build → .build/next/, след което assembleStandalone → dist/
npm run start

# Бързо компилиране само на бекенда/API за промени от сътрудници
npm run build:contributor

# Компилация за издание (чиста повторна компилация + HEAD маркер — задължително за внедряване)
npm run build:release   # rm -rf .build dist && компилация + записва dist/BUILD_SHA

# Обичайна конфигурация на порта
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Компилацията за сътрудници извършва проверка само чрез компилиране: тя не сглобява самостоятелната
дистрибуция и не изгражда незадължителните нативни ресурси за пакетиране. Използвайте стандартната
продукционна компилация, когато трябва да проверите пакета, предназначен за разпространение.

### Структура на изходните директории от компилацията

| Директория | Съдържание                                                                             | Проследява се |
| ---------- | -------------------------------------------------------------------------------------- | ------------- |
| `src/`     | Изходен код на приложението (TypeScript / TSX)                                         | Да            |
| `.build/`  | Междинни файлове — изход от `next build` (игнорира се от git, `distDir = .build/next`) | Не            |
| `dist/`    | Пакет за разпространение — сглобен от `assembleStandalone` (игнорира се от git)        | Не            |

Процесът на компилация се изпълнява в един проход:

```
npm run build
  └─ next build → .build/next/standalone  (изход от Next.js)
  └─ assembleStandalone()                 (копира самостоятелния пакет + статичните + публичните + нативните ресурси)
       └─ изход: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` допълнително изчиства първо и двете директории и записва
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) като маркер за целостта при внедряване.

`npm run build:contributor` използва профила за компилация само на бекенда. По време на компилацията той временно замества
файловете на потребителския интерфейс на таблото с временни заместители, запазва обработчиците на API маршрути и възстановява оригиналните файлове
след компилацията. Използвайте `npm run build` за промени, които засягат потребителския интерфейс на таблото, или за пълна
проверка на изданието; профилът за сътрудници не е заместител на компилацията за издание.

> **Бележка за внедряване на VPS:** отдалечената директория на образа `/usr/lib/node_modules/omniroute/app/`
> остава непроменена. Инструментите за внедряване синхронизират чрез rsync съдържанието на `dist/` в нея.
> Променен е само пътят до изходните файлове от компилацията в хранилището (`app/` → `dist/`).

URL адреси по подразбиране:

- **Табло за управление**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Работен процес с Git

> ⚠️ **НИКОГА не правете commit директно в `main`.** Винаги използвайте feature клонове.
>
> **Основа на PR:** насочете го към активния клон `release/vX.Y.Z` (не към `main`). Вижте
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) за модела
> с отделен клон за всяка версия и tag при издаване.

```bash
# Създайте клон от върха на активния release клон (пример: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... направете промените ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Отворете Pull Request с base = release/v3.8.49
```

### Именуване на клонове

| Префикс     | Предназначение               |
| ----------- | ---------------------------- |
| `feat/`     | Нови функционалности         |
| `fix/`      | Корекции на грешки           |
| `refactor/` | Преструктуриране на кода     |
| `docs/`     | Промени в документацията     |
| `test/`     | Добавяне/корекции на тестове |
| `chore/`    | Инструменти, CI, зависимости |

### Съобщения за commit

Следвайте [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Обхвати (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Изпълнение на тестове

```bash
# Всички тестове (модулни + vitest + екосистема + e2e)
npm run test:all

# Един тестов файл (вграденият инструмент за изпълнение на тестове на Node.js — повечето тестове използват него)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Само модулните тестове, засегнати от промяната ви (същият TIA селектор като при проверката в CI, #8084)
npm run test:scoped            # промени в последния commit (или в работното дърво)
npm run test:scoped:staged     # само промените в staging областта — подходящо за изпълнение преди commit
npm run test:scoped:full       # първо пресъздава картата на графа за импортиране (след добавяне/преместване на файлове)
# Изходен код 1 + "run the full suite" означава, че централен файл (tsconfig, package.json, …) или
# некартографиран изходен файл е променен — селекторът прекратява безопасно и никога не пропуска без предупреждение.

# Vitest (MCP сървър, autoCombo, кеш)
npm run test:vitest

# E2E тестове (изисква Playwright)
npm run test:e2e

# E2E тестове на протоколни клиенти (MCP транспорти, A2A)
npm run test:protocols:e2e

# Тестове за съвместимост с екосистемата
npm run test:ecosystem

# Праг за покритие: 60% изрази/редове/функции/разклонения
npm run test:coverage
npm run coverage:report

# Проверка за lint + форматиране
npm run lint
npm run check

# Ограничен реален комбиниран smoke тест с външни услуги (изисква достъп до VPS + реални кредити при доставчиците)
# Използва РЕАЛНИ доставчици — струва малко. НИКОГА не се изпълнява в CI. Пропуска се коректно без активиращата настройка.
# Изисква: достъп чрез ssh root@192.168.0.15 (зарежда snapshot само за четене на базата данни от VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Реален smoke тест от фаза 3 на VPS — обикновени Node ESM скриптове, които използват директно работещия .15 сървър.
# Изисква: достъп чрез ssh root@192.168.0.15 (комбинациите се създават/премахват чрез SSH sqlite).
# Използва РЕАЛНИ доставчици (малък разход). Създава/изтрива само комбинации __live_test__*. НИКОГА не се изпълнява в CI.
# REQUIRE_API_KEY=false на .15, така че не е необходим API ключ, но използва COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, ако са зададени.
npm run test:combo:live:vps              # 7 HTTP сценария (приоритет/циклично/претеглено/цена/обединяване/автоматично + състояние)
npm run test:combo:live:vps:failover     # добавя реален сценарий за превключване между доставчици при отказ (общо 8)
```

Бележки за покритието:

- `npm run test:coverage` измерва покритието на изходния код за основния набор от модулни тестове, изключва `tests/**` и включва `open-sse/**`
- Заявките за сливане трябва да поддържат прага за покритие от **60%+** за изрази/редове/функции/разклонения
- Ако дадена PR променя продукционен код в `src/`, `open-sse/`, `electron/` или `bin/`, тя трябва да добавя или актуализира автоматизирани тестове в същата PR
- `npm run coverage:report` извежда подробен отчет файл по файл от последното изпълнение за покритие
- `npm run test:coverage:legacy` запазва по-старата метрика за историческо сравнение
- Вижте `docs/ops/COVERAGE_PLAN.md` за поетапния план за подобряване на покритието

### Изисквания към заявките за сливане

Преди да отворите PR, използвайте
[Основния процес за принос](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), за да изпълните целевия цикъл за
направените от вас промени. Пълният набор от модулни тестове (4 CI сегмента), Vitest, прагът за покритие от **60%+** и
продукционната компилация са отговорност на CI — локалното им изпълнение не предоставя допълнителна информация извън тази,
която проверките на PR вече ще ви дадат, а при по-слаби машини може да натовари максимално системата (#8084):

- Изпълнете тестовите файлове, които покриват промяната ви: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Изпълнете `npm run lint`
- Добавяйте или актуализирайте автоматизирани тестове в същата PR винаги когато се променя продукционен код
- Включете променените или добавените тестови файлове в описанието на PR, когато е променен продукционен код
- Проверете резултата от SonarQube в PR, когато тайните на проекта са конфигурирани в CI

Текущо състояние на тестовете: **122 файла с модулни тестове**, покриващи:

- Преобразуватели на доставчици и конвертиране на формати
- Ограничаване на честотата, прекъсвач на веригата и устойчивост
- Семантичен кеш, идемпотентност, проследяване на напредъка
- Операции с базата данни и схема (21 DB модула)
- OAuth потоци и удостоверяване
- Валидиране на API крайни точки (Zod v4)
- Инструменти на MCP сървъра и прилагане на обхвати
- Системи за памет и умения

---

## Стил на кода

- **ESLint** — Изпълнете `npm run lint` преди commit
- **Prettier** — Автоматично форматиране чрез `lint-staged` при commit (2 интервала, точки и запетаи, двойни кавички, ширина 100 знака, завършващи запетаи по es5)
- **TypeScript** — Целият код в `src/` използва `.ts`/`.tsx`; `open-sse/` използва `.ts`/`.js`; документирайте с TSDoc (`@param`, `@returns`, `@throws`)
- **Без `eval()`** — ESLint налага `no-eval`, `no-implied-eval`, `no-new-func`
- **Валидиране със Zod** — Използвайте схеми на Zod v4 за валидиране на всички входни данни на API
- **Именуване**: файлове = camelCase/kebab-case, компоненти = PascalCase, константи = UPPER_SNAKE

### Обработка на грешки / празни catch блокове

Никога не оставяйте `catch` без обяснение. Класифицирайте го в една от две категории (това прилага на практика
строгото правило „никога не игнорирайте безмълвно грешки в SSE потоци“):

- **Преднамерено (наше собствено почистване/телеметрия на принципа „полагане на максимални усилия“)** — неуспехът тук е очакван и
  безвреден; добавете едноредов коментар с обосновка, без логване (логването при всяка заявка е
  шумът, който тази конвенция избягва).

  ```ts
  } catch {} // затварянето на вече затворен контролер след прекъсване на връзката от клиента е очаквано
  ```

- **Трябва да се логва (външен/предоставен от извикващия код или игнорирането променя потока на управление)** — запазете
  `catch` (никога не му позволявайте да прекъсне потока), но изведете контекстуално съобщение чрез `console.debug`/`warn`, за да може
  грешката да бъде открита.

  ```ts
  } catch (e) {
    console.debug("[STREAM] грешка в обратното извикване onFailure:", e);
  }
  ```

Вижте `open-sse/utils/stream.ts` и `open-sse/utils/streamHandler.ts` за приложени примери.

---

## Структура на проекта

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Страници на таблото (23 раздела)
│   ├── api/                # API маршрути (51 директории)
│   └── login/              # Страници за удостоверяване (.tsx)
├── domain/                 # Механизъм за политики (policyEngine, comboResolver, costRules и др.)
├── lib/                    # Основна бизнес логика (.ts)
│   ├── a2a/                # Сървър за протокола Agent-to-Agent v0.3
│   ├── acp/                # Регистър на Agent Communication Protocol
│   ├── compliance/         # Механизъм за политики за съответствие
│   ├── db/                 # Домейн модули за SQLite + 130 миграции
│   ├── memory/             # Постоянна памет за разговори
│   ├── oauth/              # OAuth доставчици, услуги и помощни инструменти
│   ├── skills/             # Разширяема рамка за умения
│   ├── usage/              # Проследяване на използването и изчисляване на разходите
│   └── localDb.ts          # Само слой за повторно експортиране — никога не добавяйте логика тук
├── middleware/              # Междинен софтуер за заявки (promptInjectionGuard)
├── mitm/                   # MITM прокси (сертификат, DNS, маршрутизиране към целта)
├── shared/
│   ├── components/         # React компоненти (.tsx)
│   ├── constants/          # Дефиниции на доставчици (329), MCP обхвати, 21 стратегии за маршрутизиране
│   ├── utils/              # Прекъсвач на веригата, филтър, помощни функции за удостоверяване
│   └── validation/         # Zod v4 схеми
└── sse/                    # Конвейер за SSE прокси

open-sse/                   # Работно пространство на @omniroute/open-sse
├── executors/              # 150 модула за изпълнение (класове за изпълнение + помощни функции за всеки доставчик)
├── handlers/               # 11 манипулатора на заявки (чат, отговори, вграждания, изображения и др.)
├── mcp-server/             # MCP сървър (110 уникални инструмента, 3 транспорта, 33 обхвата)
├── services/               # 178 услуги от най-високо ниво (combo, autoCombo, rateLimitManager и др.)
├── translator/             # Преобразуватели на формати (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Преобразувател за Responses API
└── utils/                  # 22 помощни модула (поточно предаване, TLS, прокси, регистриране)

electron/                   # Electron настолно приложение (за множество платформи)

tests/
├── unit/                   # Среда за изпълнение на тестове на Node.js (1 574 тестови файла)
├── integration/            # Интеграционни тестове
├── e2e/                    # Playwright тестове
├── security/               # Тестове за сигурност
├── translator/             # Специализирани тестове за преобразувателя
└── load/                   # Тестове за натоварване

docs/
├── adr/                     # Записи на архитектурни решения
├── architecture/            # Системна архитектура и устойчивост
├── comparison/              # OmniRoute спрямо алтернативите
├── compression/             # Ръководства и правила за компресиране
├── dev/                     # Ръководства за разработка
├── diagrams/                # Архитектурни диаграми
├── frameworks/              # MCP, A2A, OpenCode, памет, умения
├── guides/                  # Ръководство за потребителя, Docker, настройка, отстраняване на неизправности
├── i18n/                    # Интернационализирани преводи на README
├── marketing/               # Маркетингови материали
├── ops/                     # Внедряване, прокси, покритие, издания
├── providers/               # Документация за конкретни доставчици
├── reference/               # Справочник за API, променливи на средата, CLI инструменти, безплатни нива
├── releases/                # Бележки по изданията
├── routing/                 # Механизъм за автоматични комбинации, повторно изпълнение на разсъждения
├── screenshots/             # Екранни снимки на таблото
├── security/                # Защитни механизми, съответствие, прикриване, токени
└── specs/                   # Спецификации на дизайна
```

---

## Добавяне на нов доставчик

### Стъпка 1: Регистриране на константите на доставчика

Добавете ги в `src/shared/constants/providers.ts` — валидират се чрез Zod при зареждане на модула.

### Стъпка 2: Добавяне на изпълнител (ако е необходима персонализирана логика)

Създайте изпълнител в `open-sse/executors/your-provider.ts`, който разширява базовия изпълнител.

### Стъпка 3: Добавяне на преобразувател (ако форматът не е OpenAI)

Създайте преобразуватели за заявки/отговори в `open-sse/translator/`.

### Стъпка 4: Добавяне на OAuth конфигурация (ако се използва OAuth)

Добавете OAuth идентификационните данни в `src/lib/oauth/constants/oauth.ts` и услуга в `src/lib/oauth/services/`.

Ако доставчикът нагоре по веригата разпространява публичен OAuth client_id/secret или Firebase Web API ключ в своя публичен CLI / браузърен пакет, **не** го вграждайте като низов литерал. Използвайте `resolvePublicCred()` от `open-sse/utils/publicCreds.ts` и добавете маскиран запис от байтове към `EMBEDDED_DEFAULTS`. Пълният задължителен работен процес е документиран в [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

В обработващите функции/изпълнителите съобщенията за грешки, които достигат до клиента, трябва да преминават през `buildErrorBody()` / `sanitizeErrorMessage()` от `open-sse/utils/error.ts` — никога не поставяйте необработени `err.stack` или `err.message` в тялото на Response. Вижте [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Стъпка 5: Регистриране на модели

Добавете дефинициите на моделите в `open-sse/config/providerRegistry.ts`.

### Стъпка 6: Добавяне на тестове

Напишете модулни тестове в `tests/unit/`, които покриват най-малко:

- Регистрирането на доставчика
- Преобразуването на заявки/отговори
- Обработката на грешки

---

## Контролен списък за Pull Request

- [ ] Тестовете преминават успешно (`npm test`)
- [ ] Проверката за стил преминава успешно (`npm run lint`)
- [ ] Компилацията е успешна (`npm run build`)
- [ ] Добавени са TypeScript типове за новите публични функции и интерфейси
- [ ] Няма твърдо зададени тайни или резервни стойности
- [ ] Публичните идентификационни данни от upstream са вградени чрез `resolvePublicCred()` (вижте [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), никога като литерали
- [ ] Отговорите при грешки преминават през `buildErrorBody()` / `sanitizeErrorMessage()` — без необработени stack trace данни в телата на отговорите (вижте [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell командите (`exec` / `spawn`) предават стойностите по време на изпълнение чрез `env`, а не чрез интерполация на низове
- [ ] Всички входни данни са валидирани със Zod схеми
- [ ] Добавен е **фрагмент** към регистъра на промените в `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` за промени, видими за потребителите (вижте [`changelog.d/README.md`](./changelog.d/README.md)) — **не** редактирайте директно `CHANGELOG.md`; фрагментите се обединяват при издаване на версия и никога не създават конфликти между PR-и
- [ ] Документацията е актуализирана (ако е приложимо)
- [ ] Няма нови предупреждения от CodeQL / Secret-Scanning или всяко от тях е отхвърлено с техническа обосновка, която препраща към съответния документ в `docs/security/`
- [ ] Маршрутите, които стартират дъщерни процеси (`/api/mcp/`, `/api/cli-tools/runtime/`), са класифицирани като `isLocalOnlyPath()` в `src/server/authz/routeGuard.ts` — вижте [Строго правило №15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Няма AI/bot трейлъри `Co-authored-by` в съобщенията за commit-и (Строго правило №16) — човешките сътрудници, чиято работа е използвана повторно, се посочват със стандартни трейлъри `Co-authored-by: Name <email>`

---

## Публикуване на версии

Версиите се управляват чрез работния процес `/generate-release`. Когато бъде създадена нова версия в GitHub, пакетът се **публикува автоматично в npm** чрез GitHub Actions.

За внедряване на VPS използвайте `npm run build:release` (а не `npm run build`) — командата извършва чисто
повторно компилиране, сглобява пакета в `dist/` и записва контролния файл `dist/BUILD_SHA`.
След това използвайте уменията `/deploy-vps-*-cc`, които синхронизират чрез rsync `dist/` с отдалечената директория `app/`.

---

## Получаване на помощ

- **Архитектура**: Вижте [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Справочник за API**: Вижте [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Документация за сигурността**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Документация за операциите**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Проблеми**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
