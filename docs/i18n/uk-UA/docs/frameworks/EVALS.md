# Evaluations (Evals) (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Джерело істини:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute постачається з універсальним фреймворком оцінювання, який можна використовувати для порівняльного тестування конфігурацій маршрутизації, окремих провайдерів/моделей або вбудованих наборів «golden set».
Використовуйте його, щоб перевіряти зміни маршрутизації, валідувати нових провайдерів і контролювати випуски, перш ніж спрямовувати на них робочий трафік.

Фреймворк реалізовано у вигляді:

- Функціонально чистого засобу запуску (`src/lib/evals/evalRunner.ts`), який реєструє в пам’яті вбудовані набори, оцінює результати за очікуваними критеріями та агрегує картки оцінювання.
- Рівня збереження даних (`src/lib/db/evals.ts`) для користувацьких наборів і історичних запусків у SQLite.
- Рівня оркестрації (`src/lib/evals/runtime.ts`), який виконує кожен випадок, надсилаючи реальні виклики до `POST /v1/chat/completions`, фіксує затримку й результати та зберігає запуск.
- Кінцевих точок REST у `/api/evals/*` (лише з автентифікацією керування).
- Інтерфейсу панелі моніторингу за адресою `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Поняття

### Набір

Набір — це іменована колекція тестових випадків із `description` та одним або кількома випадками. Набори надходять із двох джерел:

| Джерело    | Де визначено                                         | Можна змінювати під час виконання? |
| ---------- | ---------------------------------------------------- | ---------------------------------- |
| `built-in` | Реєструється через `registerSuite()` під час запуску | Ні (визначено в коді)              |
| `custom`   | Зберігається в SQLite у `eval_suites` + `eval_cases` | Так (через API/UI)                 |

Поточні вбудовані набори (див. `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 базових випадків, що охоплюють привітання/математику/переклад/безпеку
- `coding-proficiency` — Python/JS/SQL/TS/виявлення помилок
- `reasoning-logic` — силогізми, текстові задачі, розпізнавання закономірностей
- `multilingual` — переклад і визначення мови
- `safety-guardrails` — персональні дані, джейлбрейки, відмова, усвідомлення упередженості
- `instruction-following` — лише JSON, нумеровані списки, мовні обмеження
- `codex-comparison` — безпосереднє зіставлення завдань із програмування, призначене для режиму порівняння

### Випадок

Кожен випадок містить:

| Поле       | Опис                                                                         |
| ---------- | ---------------------------------------------------------------------------- |
| `id`       | Стабільний ідентифікатор (використовується як ключ для результатів і метрик) |
| `name`     | Зручна для читання назва                                                     |
| `model`    | Модель за замовчуванням, коли запуск використовує ціль `suite-default`       |
| `input`    | `{ messages, max_tokens? }` — надсилається до `/v1/chat/completions`         |
| `expected` | `{ strategy, value }` — критерії оцінювання (див. нижче)                     |
| `tags`     | Необов’язкові мітки (наприклад, `safety`, `pii`, `jailbreak`)                |

### Ціль

Той самий набір можна запускати для різних цілей. Схемою цілі є
`evalTargetSchema` у `src/shared/validation/schemas.ts`:

| Тип цілі        | `id`             | Поведінка                                                                                       |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------- |
| `suite-default` | `null`           | Кожен випадок використовує власне вбудоване поле `model`                                        |
| `model`         | назва моделі     | Примусово спрямовує кожен випадок через одну безпосередньо вибрану модель (наприклад, `gpt-4o`) |
| `combo`         | назва комбінації | Запускає кожен випадок через одну комбінацію (задіює механізм маршрутизації)                    |

Для `model` і `combo` поле `id` є обов’язковим (це забезпечується через Zod
`superRefine`). Якщо вказано `compareTarget`, обидві цілі мають відрізнятися —
засіб запуску зберігає обидва запуски під одним `runGroupId` для порівняння A/B.

## Критерії оцінювання

Реалізовано в `evaluateCase()` (evalRunner.ts):

| Стратегія  | Умова проходження                                                                |
| ---------- | -------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`              |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` має істинне значення             |
| `custom`   | `expected.fn(actualOutput, evalCase)` повертає істинне значення (лише вбудовані) |

**Примітка:** Оцінювання за допомогою користувацької функції зарезервовано для
наборів, визначених у коді (вбудованих), оскільки функції неможливо серіалізувати
через API. `evalCaseBuilderSchema` приймає лише `contains | exact | regex` для
наборів, створених користувачами.

Наразі немає оцінювача на основі LLM або подібності ембедингів — це було б
зручним місцем розширення в `evaluateCase()`.

## Схема бази даних

Три таблиці (міграції `030_create_eval_runs.sql` і
`031_create_eval_suites.sql`):

| Таблиця       | Призначення                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `eval_suites` | Метадані користувацьких наборів (`id`, `name`, `description`)                                                                  |
| `eval_cases`  | Випадки для кожного набору — `input_json`, `expected_*`, `tags_json`                                                           |
| `eval_runs`   | Історичні запуски — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Вбудовані набори **не** зберігаються в БД. Вони зберігаються в пам’яті та
реєструються повторно щоразу, коли імпортується `evalRunner.ts`.

## REST API

Усі кінцеві точки потребують автентифікації керування (`requireManagementAuth`) —
вони не є частиною публічної проксі-поверхні.

| Кінцева точка                 | Метод    | Опис                                                                    |
| ----------------------------- | -------- | ----------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Перелік наборів + останніх запусків + картки оцінок + цілей + ключів    |
| `/api/evals`                  | `POST`   | Запуск набору (одиночний або порівняльний) — схема `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Отримання одного набору (вбудованого або користувацького)               |
| `/api/evals/suites`           | `POST`   | Створення користувацького набору — схема `evalSuiteSaveSchema`          |
| `/api/evals/suites/{suiteId}` | `GET`    | Отримання користувацького набору                                        |
| `/api/evals/suites/{suiteId}` | `PUT`    | Заміна користувацького набору (випадки вставляються повторно)           |
| `/api/evals/suites/{suiteId}` | `DELETE` | Видалення користувацького набору та його випадків                       |

### Запуск набору

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Необов’язкові поля:

- `outputs` — `Record<caseId, string>` із попередньо обчисленими вихідними даними.
  Якщо їх надано, засіб запуску **пропускає надсилання** й лише оцінює кешовані
  вихідні дані (корисно для офлайн-оцінювання).
- `compareTarget` — друга ціль для паралельного запуску; обидва запуски спільно
  використовують згенерований `runGroupId` для безпосереднього порівняння.
- `apiKeyId` — внутрішній ключ API, що використовується для автентифікації
  надісланих викликів `/v1/chat/completions`. Обов’язковий, коли ввімкнено
  `REQUIRE_API_KEY`.

### Створення користувацького набору

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Конвеєр виконання

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Визначає набір тестів (вбудований або користувацький).
2. Для кожного випадку створює `Request` до `/v1/chat/completions` із
   `messages` цього випадку, визначеною `model`, `stream: false` і `max_tokens: 512`
   (або перевизначеним у випадку значенням).
3. Викликає обробник чату безпосередньо (у межах процесу — без додаткового HTTP-переходу).
4. Фіксує затримку та витягує текст із `choices[0].message.content`
   або корисного навантаження Responses API `output[]`.
5. Оцінює всі результати через `runSuite()`, а потім зберігає їх через `saveEvalRun()`.

Випадки виконуються **послідовно**. Наразі прапорця паралельного виконання немає.

## Панель керування

Інтерфейс розташований у `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). У ньому можна:

- Переглядати вбудовані та користувацькі набори з попереднім переглядом кожного випадку.
- Створювати, редагувати й видаляти користувацькі набори за допомогою конструктора випадків.
- Вибирати ціль (налаштування набору за замовчуванням / модель / комбінація), за потреби — другу
  `compareTarget` та API-ключ, а потім запускати оцінювання на вимогу.
- Переглядати історію запусків, статус проходження кожного випадку, затримку та збережені результати.
- Переглядати зведену таблицю показників, агреговану за останнім запуском для кожної області
  `(suite, target)`.

## Зв’язок із RFC автоматичного оцінювання

Окрема, вужча підсистема оцінювання розташована в `src/domain/assessment/`
(щодо рушія оцінювання в реальному часі див. також [AUTO-COMBO.md](../routing/AUTO-COMBO.md)).
Ця підсистема призначена для рушія Auto Combo — автоматичного оцінювання постачальників і
моделей, щоб комбінації могли самовідновлюватися в разі збоїв у зовнішніх системах. Вона використовує власний засіб запуску,
власний категоризатор і власну логіку оцінювання.

Описаний тут фреймворк Evals є **ширшим інструментом тестування
загального призначення**. Надавайте йому перевагу для довільних наборів регресійних тестів, A/B-порівнянь
і димових тестів для кожного випуску. Використовуйте підсистему автоматичного оцінювання, коли потрібно,
щоб стан постачальників у реальному часі впливав на рішення щодо маршрутизації.

## Інтеграція з CI

Наразі окремого npm-скрипту `eval:ci` немає. Якщо потрібно
заблокувати випуск у разі незадовільних результатів оцінювання, є два способи:

- **Через HTTP**: запустіть сервер, надішліть `POST /api/evals` із відомими
  `suiteId` + `target` і перевірте у відповіді, що `runs[].summary.passRate >= N`.
- **У межах процесу**: імпортуйте `runEvalSuiteAgainstTarget()` з
  `@/lib/evals/runtime` у скрипт, виконайте його з тестовою БД і перевірте
  повернене значення `PersistedEvalRun.summary`.

Тести, що охоплюють маршрут та історію, розташовані у
`tests/unit/evals-route.test.ts` і `tests/unit/evals-history.test.ts`.

## Точки розширення

Типові зміни та місця їх внесення:

- **Нова стратегія оцінювання** — розширте блок `switch (evalCase.expected.strategy)`
  у `evaluateCase()` (`evalRunner.ts`) і доповніть `EvalCaseStrategy` у
  `src/lib/db/evals.ts`, а також `evalCaseBuilderSchema` у `schemas.ts`.
- **Новий вбудований набір** — визначте об’єкт набору та викличте `registerSuite()` у
  нижній частині `evalRunner.ts`. Його буде автоматично виявлено функцією `listSuites()`.
- **Паралельне виконання** — замініть послідовний цикл `for` у
  `runEvalSuiteAgainstTarget()` на обмежений `Promise.all` (наразі керування
  паралельністю відсутнє).
- **Випадки з потоковим передаванням або викликами інструментів** — наразі засіб запуску примусово встановлює `stream: false`.
  Оцінювання з урахуванням потокового передавання або інструментів потребуватиме змін у `runtime.ts`
  (перехоплення та агрегації фрагментів SSE перед оцінюванням).

## Див. також

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — загальний огляд продукту
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — довідка щодо конвеєра обробки запитів
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — механізм оцінювання Auto Combo (виконується в реальному часі)
- Вихідний код: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Інтерфейс користувача: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
