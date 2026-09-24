# Evaluations (Evals) (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Източник на достоверна информация:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute включва универсална рамка за оценяване, която можете да използвате за сравнително тестване на конфигурации за маршрутизиране, отделни доставчици/модели или включените пакети от тестове „golden set“. Използвайте я, за да проверявате промени в маршрутизирането, да валидирате нови доставчици и да контролирате изданията, преди да ги пуснете към производствения трафик.

Рамката е реализирана като:

- Самостоятелен изпълнител (`src/lib/evals/evalRunner.ts`), който регистрира в паметта вградените пакети, оценява резултатите спрямо очакваните критерии и обобщава картите с резултати.
- Слой за съхранение (`src/lib/db/evals.ts`) за персонализирани (дефинирани от потребителя) пакети и хронология на изпълненията в SQLite.
- Слой за оркестрация (`src/lib/evals/runtime.ts`), който изпълнява всеки случай, като изпраща реални заявки към `POST /v1/chat/completions`, отчита латентността и резултатите и съхранява изпълнението.
- REST крайни точки под `/api/evals/*` (само с удостоверяване за управление).
- Интерфейс в таблото за управление на `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Концепции

### Пакет

Пакетът е именувана колекция от тестови случаи с `description` и един или повече случаи. Пакетите идват от два източника:

| Източник   | Къде е дефиниран                                  | Може ли да се променя по време на изпълнение? |
| ---------- | ------------------------------------------------- | --------------------------------------------- |
| `built-in` | Регистриран чрез `registerSuite()` при стартиране | Не (дефиниран в кода)                         |
| `custom`   | Съхраняван в SQLite `eval_suites` + `eval_cases`  | Да (чрез API/UI)                              |

Текущите вградени пакети (вижте `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 базови случая за поздрави/математика/превод/безопасност
- `coding-proficiency` — Python/JS/SQL/TS/откриване на грешки
- `reasoning-logic` — силогизми, текстови задачи, разпознаване на закономерности
- `multilingual` — превод и разпознаване на език
- `safety-guardrails` — лични данни, jailbreak, откази, осъзнаване на пристрастия
- `instruction-following` — само JSON, номерирани списъци, езикови ограничения
- `codex-comparison` — задачи за програмиране с директно сравнение, предназначени за режим на сравнение

### Случай

Всеки случай съдържа:

| Поле       | Описание                                                                 |
| ---------- | ------------------------------------------------------------------------ |
| `id`       | Стабилен идентификатор (използва се като ключ за резултати и показатели) |
| `name`     | Разбираем за хората етикет                                               |
| `model`    | Модел по подразбиране, когато изпълнението използва цел `suite-default`  |
| `input`    | `{ messages, max_tokens? }` — изпраща се към `/v1/chat/completions`      |
| `expected` | `{ strategy, value }` — критерий за оценяване (вижте по-долу)            |
| `tags`     | Незадължителни етикети (напр. `safety`, `pii`, `jailbreak`)              |

### Цел

Един и същ пакет може да бъде изпълняван спрямо различни цели. Схемата на целта е `evalTargetSchema` в `src/shared/validation/schemas.ts`:

| Тип на целта    | `id`              | Поведение                                                                            |
| --------------- | ----------------- | ------------------------------------------------------------------------------------ |
| `suite-default` | `null`            | Всеки случай използва вграденото си поле `model`                                     |
| `model`         | име на модел      | Принудително изпълнение на всеки случай директно чрез един модел (напр. `gpt-4o`)    |
| `combo`         | име на комбинация | Изпълнение на всеки случай чрез една комбинация (тества механизма за маршрутизиране) |

За `model` и `combo` полето `id` е задължително (налага се от Zod `superRefine`). Когато е подадено `compareTarget`, двете цели трябва да се различават — изпълнителят съхранява и двете изпълнения под един и същ `runGroupId` за A/B сравнение.

## Критерии за оценяване

Реализирани в `evaluateCase()` (evalRunner.ts):

| Стратегия  | Успешно, когато…                                                      |
| ---------- | --------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                     |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`   |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` връща истина          |
| `custom`   | `expected.fn(actualOutput, evalCase)` връща истина (само за вградени) |

**Забележка:** Оценяването чрез персонализирана функция е запазено за дефинирани в кода (вградени)
набори, тъй като функциите не могат да бъдат сериализирани през API. Схемата
`evalCaseBuilderSchema` приема само `contains | exact | regex` за
създадени от потребителя набори.

В момента няма оценител с LLM или такъв, базиран на сходство на векторни представяния — това би
било естествена точка за разширение в `evaluateCase()`.

## Схема на базата данни

Три таблици (миграции `030_create_eval_runs.sql` и
`031_create_eval_suites.sql`):

| Таблица       | Предназначение                                                                                                                      |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Метаданни за персонализирани набори (`id`, `name`, `description`)                                                                   |
| `eval_cases`  | Случаи за всеки набор — `input_json`, `expected_*`, `tags_json`                                                                     |
| `eval_runs`   | Исторически изпълнения — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Вградените набори **не** се съхраняват в базата данни. Те се намират в паметта и се
регистрират отново при всяко импортиране на `evalRunner.ts`.

## REST API

Всички крайни точки изискват административно удостоверяване (`requireManagementAuth`) — те не са
част от публичния интерфейс на проксито.

| Крайна точка                  | Метод    | Описание                                                                  |
| ----------------------------- | -------- | ------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Извежда набори + скорошни изпълнения + карта с резултати + цели + ключове |
| `/api/evals`                  | `POST`   | Изпълнява набор (единично или сравнително) — схема `evalRunSuiteSchema`   |
| `/api/evals/{suiteId}`        | `GET`    | Извлича един набор (вграден или персонализиран)                           |
| `/api/evals/suites`           | `POST`   | Създава персонализиран набор — схема `evalSuiteSaveSchema`                |
| `/api/evals/suites/{suiteId}` | `GET`    | Извлича персонализиран набор                                              |
| `/api/evals/suites/{suiteId}` | `PUT`    | Заменя персонализиран набор (случаите се вмъкват повторно)                |
| `/api/evals/suites/{suiteId}` | `DELETE` | Изтрива персонализиран набор и неговите случаи                            |

### Изпълнение на набор

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

Незадължителни полета:

- `outputs` — `Record<caseId, string>` с предварително изчислени изходни данни. Когато е зададено,
  изпълняващият модул **пропуска изпращането** и само оценява кешираните изходни данни (полезно за
  офлайн оценяване).
- `compareTarget` — втора цел, която да се изпълнява паралелно; двете изпълнения споделят
  генериран `runGroupId` за директно сравнение.
- `apiKeyId` — вътрешен API ключ, използван за удостоверяване на изпратените
  извиквания към `/v1/chat/completions`. Задължителен, когато `REQUIRE_API_KEY` е активирано.

### Създаване на персонализиран набор

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

## Конвейер за изпълнение

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Зарежда набора (вграден или персонализиран).
2. За всеки случай създава `Request` към `/v1/chat/completions` със съответните
   `messages`, определения `model`, `stream: false` и `max_tokens: 512`
   (или стойността, зададена за случая).
3. Извиква директно обработчика за чат (в рамките на процеса — без допълнителна HTTP заявка).
4. Измерва латентността и извлича текста или от `choices[0].message.content`,
   или от полезния товар `output[]` на Responses API.
5. Оценява всички резултати чрез `runSuite()`, след което ги записва чрез `saveEvalRun()`.

Случаите се изпълняват **последователно**. В момента няма флаг за паралелно изпълнение.

## Табло

Потребителският интерфейс се намира в `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Оттам можете да:

- Преглеждате вградени и персонализирани набори с визуализация на всеки отделен случай.
- Създавате/редактирате/изтривате персонализирани набори с конструктора на случаи.
- Избирате цел (настройки по подразбиране на набора / модел / комбинация), по желание втора
  `compareTarget`, по желание API ключ, след което стартирате изпълнението при поискване.
- Преглеждате историята на изпълненията, резултата успешно/неуспешно за всеки случай, латентността и записаните изходни данни.
- Виждате обобщената текуща карта с резултати, изчислена въз основа на последното изпълнение за всеки
  обхват `(suite, target)`.

## Връзка с RFC за автоматично оценяване

Отделна, по-тясно специализирана подсистема за оценяване се намира в `src/domain/assessment/`
(вижте също [AUTO-COMBO.md](../routing/AUTO-COMBO.md) за механизма за оценяване в реално време).
Тази подсистема е предназначена за механизма Auto Combo — автоматично оценява доставчици и
модели, така че комбинациите да могат да се самовъзстановяват при отказ на външни услуги. Тя използва собствен механизъм за изпълнение,
собствен категоризатор и собствена логика за оценяване.

Описаната тук рамка Evals е **по-широката среда за тестване с общо предназначение**.
Предпочитайте я за произволни набори от регресионни тестове, A/B сравнения
и бързи тестове при всяка версия. Използвайте подсистемата за автоматично оценяване, когато е необходимо
състоянието на доставчиците в реално време да влияе върху решенията за маршрутизиране.

## Интеграция с CI

В момента няма специализиран npm скрипт `eval:ci`. Има два подхода, ако искате да
обвържете пускането на версии с резултатите от оценяването:

- **HTTP подход**: стартирайте сървъра, изпратете `POST /api/evals` с известни
  `suiteId` + `target` и проверете дали `runs[].summary.passRate >= N` в
  отговора.
- **Подход в рамките на процеса**: импортирайте `runEvalSuiteAgainstTarget()` от
  `@/lib/evals/runtime` в скрипт, изпълнете го с тестова база данни и проверете
  върнатия `PersistedEvalRun.summary`.

Тестовете, обхващащи маршрута и историята, се намират в
`tests/unit/evals-route.test.ts` и `tests/unit/evals-history.test.ts`.

## Точки за разширяване

Често срещани промени и къде да ги направите:

- **Нова стратегия за оценяване** — разширете блока `switch (evalCase.expected.strategy)`
  в `evaluateCase()` (`evalRunner.ts`) и разширете `EvalCaseStrategy` в
  `src/lib/db/evals.ts`, както и `evalCaseBuilderSchema` в `schemas.ts`.
- **Нов вграден набор** — дефинирайте обект за набора и извикайте `registerSuite()` в
  края на `evalRunner.ts`. Той ще бъде автоматично открит от `listSuites()`.
- **Паралелно изпълнение** — заменете последователния цикъл `for` в
  `runEvalSuiteAgainstTarget()` с ограничен `Promise.all` (в момента
  не съществува управление на паралелното изпълнение).
- **Случаи с поточно предаване/извикване на инструменти** — в момента изпълняващият механизъм налага `stream: false`.
  Поточното или съобразеното с инструменти оценяване ще изисква промени в `runtime.ts`
  (прихващане и обединяване на SSE фрагментите преди оценяването).

## Вижте също

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — общ преглед на продукта
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — справочник за конвейера за заявки
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — механизъм за оценяване Auto Combo (в реално време)
- Изходен код: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Потребителски интерфейс: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
