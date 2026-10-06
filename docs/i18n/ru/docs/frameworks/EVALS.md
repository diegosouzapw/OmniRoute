# Evaluations (Evals) (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Источник истины:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute включает универсальный фреймворк оценки, который можно использовать для сравнительного тестирования конфигураций маршрутизации, отдельных провайдеров/моделей или встроенных наборов тестов «golden set».
Используйте его, чтобы проверять изменения маршрутизации, валидировать новых провайдеров и контролировать выпуски перед их развертыванием для производственного трафика.

Фреймворк состоит из следующих компонентов:

- Чистый исполнитель (`src/lib/evals/evalRunner.ts`), который регистрирует встроенные наборы тестов в памяти, оценивает результаты по ожидаемым критериям и агрегирует оценочные карточки.
- Уровень персистентности (`src/lib/db/evals.ts`) для пользовательских наборов тестов и истории запусков в SQLite.
- Уровень оркестрации (`src/lib/evals/runtime.ts`), который выполняет каждый тестовый случай, отправляя реальные вызовы в `POST /v1/chat/completions`, фиксирует задержку и результаты, а затем сохраняет запуск.
- REST-эндпоинты в `/api/evals/*` (доступны только после административной аутентификации).
- Раздел панели управления по адресу `Dashboard → Использование → Оценки` (`EvalsTab.tsx`).

## Понятия

### Набор тестов

Набор тестов — это именованная коллекция тестовых случаев с `description` и одним или несколькими случаями. Наборы поступают из двух источников:

| Источник   | Где определяется                                   | Можно изменять во время выполнения? |
| ---------- | -------------------------------------------------- | ----------------------------------- |
| `built-in` | Регистрируется через `registerSuite()` при запуске | Нет (определяется в коде)           |
| `custom`   | Хранится в SQLite `eval_suites` + `eval_cases`     | Да (через API/UI)                   |

Текущие встроенные наборы тестов (см. `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 базовых тестовых случаев для приветствий, математики, перевода и безопасности
- `coding-proficiency` — Python/JS/SQL/TS и обнаружение ошибок
- `reasoning-logic` — силлогизмы, текстовые задачи и распознавание закономерностей
- `multilingual` — перевод и определение языка
- `safety-guardrails` — персональные данные, джейлбрейк, отказ от ответа и осведомленность о предвзятости
- `instruction-following` — только JSON, нумерованные списки и языковые ограничения
- `codex-comparison` — парные задачи по программированию, предназначенные для режима сравнения

### Тестовый случай

Каждый тестовый случай содержит:

| Поле       | Описание                                                              |
| ---------- | --------------------------------------------------------------------- |
| `id`       | Стабильный идентификатор (используется как ключ результатов и метрик) |
| `name`     | Понятная человеку метка                                               |
| `model`    | Модель по умолчанию, когда запуск использует цель `suite-default`     |
| `input`    | `{ messages, max_tokens? }` — отправляется в `/v1/chat/completions`   |
| `expected` | `{ strategy, value }` — критерий оценивания (см. ниже)                |
| `tags`     | Необязательные метки (например, `safety`, `pii`, `jailbreak`)         |

### Цель

Один и тот же набор тестов можно запускать для разных целей. Схема цели —
`evalTargetSchema` в `src/shared/validation/schemas.ts`:

| Тип цели        | `id`       | Поведение                                                                          |
| --------------- | ---------- | ---------------------------------------------------------------------------------- |
| `suite-default` | `null`     | Каждый случай использует собственное встроенное поле `model`                       |
| `model`         | имя модели | Принудительно направляет каждый случай напрямую в одну модель (например, `gpt-4o`) |
| `combo`         | имя combo  | Запускает каждый случай через один combo (задействует механизм маршрутизации)      |

Для `model` и `combo` поле `id` обязательно (это обеспечивается Zod
`superRefine`). Если указан `compareTarget`, обе цели должны различаться —
исполнитель сохраняет оба запуска с одним и тем же `runGroupId` для A/B-сравнения.

## Критерии оценки

Реализованы в `evaluateCase()` (evalRunner.ts):

| Стратегия  | Условие прохождения…                                                                          |
| ---------- | --------------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                             |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                           |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` возвращает истинное значение                  |
| `custom`   | `expected.fn(actualOutput, evalCase)` возвращает истинное значение (только встроенные наборы) |

**Примечание:** Оценка с помощью пользовательской функции предназначена только для
наборов, определённых в коде (встроенных), поскольку функции нельзя сериализовать
через API. `evalCaseBuilderSchema` принимает только `contains | exact | regex`
для наборов, созданных пользователями.

В настоящее время оценки с помощью LLM в роли судьи или на основе сходства
эмбеддингов нет — её можно было бы удобно добавить в `evaluateCase()`.

## Схема базы данных

Три таблицы (миграции `030_create_eval_runs.sql` и
`031_create_eval_suites.sql`):

| Таблица       | Назначение                                                                                                                    |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Метаданные пользовательского набора (`id`, `name`, `description`)                                                             |
| `eval_cases`  | Случаи для каждого набора — `input_json`, `expected_*`, `tags_json`                                                           |
| `eval_runs`   | История запусков — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Встроенные наборы **не** хранятся в БД. Они находятся в памяти и
регистрируются заново при каждом импорте `evalRunner.ts`.

## REST API

Все конечные точки требуют аутентификации управления (`requireManagementAuth`) —
они не являются частью общедоступного прокси-интерфейса.

| Конечная точка                | Метод    | Описание                                                                      |
| ----------------------------- | -------- | ----------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Получить список наборов, недавних запусков, оценок, целей и ключей            |
| `/api/evals`                  | `POST`   | Запустить набор (одиночный запуск или сравнение) — схема `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Получить один набор (встроенный или пользовательский)                         |
| `/api/evals/suites`           | `POST`   | Создать пользовательский набор — схема `evalSuiteSaveSchema`                  |
| `/api/evals/suites/{suiteId}` | `GET`    | Получить пользовательский набор                                               |
| `/api/evals/suites/{suiteId}` | `PUT`    | Заменить пользовательский набор (случаи вставляются заново)                   |
| `/api/evals/suites/{suiteId}` | `DELETE` | Удалить пользовательский набор и его случаи                                   |

### Запуск набора

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

Необязательные поля:

- `outputs` — `Record<caseId, string>` с предварительно вычисленными результатами.
  Если поле указано, средство запуска **пропускает отправку запросов** и только
  оценивает кэшированные результаты (полезно для автономной оценки).
- `compareTarget` — вторая цель для параллельного запуска; оба запуска используют
  общий сгенерированный `runGroupId` для непосредственного сравнения.
- `apiKeyId` — внутренний API-ключ, используемый для аутентификации отправляемых
  запросов `/v1/chat/completions`. Обязателен, если включён `REQUIRE_API_KEY`.

### Создание пользовательского набора

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

## Конвейер выполнения

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Разрешает набор тестов (встроенный или пользовательский).
2. Для каждого сценария формирует `Request` к `/v1/chat/completions` с полями
   `messages` сценария, разрешённой `model`, `stream: false` и `max_tokens: 512`
   (либо со значением, переопределённым в сценарии).
3. Вызывает обработчик чата напрямую (внутри процесса — без дополнительного HTTP-перехода).
4. Замеряет задержку и извлекает текст либо из `choices[0].message.content`,
   либо из полезной нагрузки Responses API `output[]`.
5. Оценивает все результаты через `runSuite()`, а затем сохраняет их через `saveEvalRun()`.

Сценарии выполняются **последовательно**. В настоящее время флага параллельного выполнения нет.

## Панель управления

Интерфейс расположен в `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). В нём можно:

- Просматривать встроенные и пользовательские наборы тестов с предварительным просмотром каждого сценария.
- Создавать, редактировать и удалять пользовательские наборы тестов с помощью конструктора сценариев.
- Выбирать цель (настройки набора по умолчанию / модель / комбинация), при необходимости вторую
  `compareTarget` и API-ключ, а затем запускать проверку по запросу.
- Просматривать историю запусков, результаты прохождения каждого сценария, задержку и сохранённые выходные данные.
- Просматривать сводную таблицу с накопительными оценками, агрегированными по последнему запуску для каждой области
  `(suite, target)`.

## Связь с RFC автоматической оценки

Отдельная, более узкая подсистема оценки расположена в `src/domain/assessment/`
(см. также [AUTO-COMBO.md](../routing/AUTO-COMBO.md) с описанием действующего механизма оценки).
Эта подсистема предназначена для механизма Auto Combo — автоматической оценки провайдеров и
моделей, позволяющей комбинациям самовосстанавливаться при сбоях внешних сервисов. Она использует собственный механизм запуска,
собственный категоризатор и собственную логику оценки.

Описанный здесь фреймворк Evals — это **более широкая универсальная
среда тестирования**. Используйте её для произвольных наборов регрессионных тестов, A/B-сравнений
и дымовых тестов для каждого выпуска. Используйте подсистему автоматической оценки, когда необходимо,
чтобы состояние провайдера в реальном времени влияло на решения о маршрутизации.

## Интеграция с CI

В настоящее время отдельного npm-скрипта `eval:ci` нет. Если вы хотите
обусловить выпуск результатами оценок, доступны два варианта:

- **Через HTTP**: запустите сервер, отправьте запрос `POST /api/evals` с известными
  `suiteId` и `target`, а затем проверьте выполнение условия `runs[].summary.passRate >= N` в
  ответе.
- **Внутри процесса**: импортируйте `runEvalSuiteAgainstTarget()` из
  `@/lib/evals/runtime` в скрипт, выполните запуск с тестовой БД и проверьте
  возвращённое значение `PersistedEvalRun.summary`.

Тесты маршрута и истории находятся в
`tests/unit/evals-route.test.ts` и `tests/unit/evals-history.test.ts`.

## Точки расширения

Распространённые изменения и места их внесения:

- **Новая стратегия оценки** — расширьте блок `switch (evalCase.expected.strategy)`
  в `evaluateCase()` (`evalRunner.ts`), а также дополните `EvalCaseStrategy` в
  `src/lib/db/evals.ts` и `evalCaseBuilderSchema` в `schemas.ts`.
- **Новый встроенный набор тестов** — определите объект набора и вызовите `registerSuite()` в
  конце `evalRunner.ts`. Он будет автоматически обнаружен функцией `listSuites()`.
- **Параллельное выполнение** — замените последовательный цикл `for` в
  `runEvalSuiteAgainstTarget()` на ограниченный `Promise.all` (в настоящее время
  управление параллелизмом отсутствует).
- **Сценарии с потоковой передачей/вызовом инструментов** — сейчас механизм запуска принудительно устанавливает `stream: false`.
  Для потоковой передачи или оценки с учётом инструментов потребуются изменения в `runtime.ts`
  (сбор и объединение фрагментов SSE перед оценкой).

## См. также

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — общее руководство по продукту
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — справочник по конвейеру обработки запросов
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — механизм оценки Auto Combo (в рабочей среде)
- Исходный код: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Интерфейс: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
