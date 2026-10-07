# Compression Rules Format (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

Правила сжатия представляют собой JSON-файлы, загружаемые во время выполнения. Они намеренно содержат только данные, чтобы новые
языковые пакеты и фильтры команд RTK можно было проверять без изменения кода движка.

> **Каноническая схема (источник истины):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> Приведённые ниже примеры предназначены для иллюстрации — при возникновении сомнений проверяйте свой пакет по `_schema.json`.

## Пакеты правил Caveman

Пакеты правил Caveman находятся в каталоге:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Каждый пакет содержит замены, применяемые к обычному тексту после изоляции защищённых областей.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Поля Caveman

| Поле                     | Обязательно | Описание                                                                          |
| ------------------------ | ----------- | --------------------------------------------------------------------------------- |
| `language`               | да          | Ключ языка в формате, подобном BCP-47, например `en`, `pt-BR`, `es`               |
| `category`               | да          | Имя файла/категория пакета, например `filler` или `dedup`                         |
| `rules`                  | да          | Массив правил замены на основе регулярных выражений                               |
| `rules[].name`           | да          | Стабильное имя правила                                                            |
| `rules[].pattern`        | да          | Исходный текст регулярного выражения JavaScript                                   |
| `rules[].flags`          | нет         | Флаги регулярного выражения JavaScript; по умолчанию `gi`                         |
| `rules[].replacement`    | нет         | Строка замены или резервное значение при отсутствии совпадения в `replacementMap` |
| `rules[].replacementMap` | нет         | Замены для конкретных совпадений, ключами служит нормализованный совпавший текст  |
| `rules[].context`        | нет         | `all`, `user`, `assistant` или `system`; по умолчанию `all`                       |
| `rules[].category`       | нет         | `filler`, `context`, `structural`, `dedup`, `terse` или `ultra`                   |
| `rules[].minIntensity`   | нет         | `lite`, `full` или `ultra`; по умолчанию `lite`                                   |
| `rules[].description`    | нет         | Понятное человеку краткое описание правила                                        |

Используйте `flags`, когда важен регистр символов, например при удалении артикля перед текстом в нижнем регистре
без удаления `the OpenAI API`. Используйте `replacementMap`, когда одно регулярное выражение содержит несколько альтернатив,
для которых требуются разные результаты; это позволяет пакетам правил JSON содержать только данные, сохраняя при этом поведение
более функциональных встроенных функций замены TypeScript.

## Наборы фильтров RTK

Фильтры RTK находятся в:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Каждый фильтр описывает, как распознать и сжать семейство результатов выполнения команд.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### Поля RTK

| Поле                       | Обязательно | Описание                                                                                    |
| -------------------------- | ----------- | ------------------------------------------------------------------------------------------- |
| `id`                       | да          | Стабильный идентификатор фильтра                                                            |
| `label`                    | да          | Название, отображаемое на панели мониторинга                                                |
| `category`                 | да          | Семейство фильтра: git, test, build, shell, docker, package, infra, cloud, generic          |
| `priority`                 | нет         | При совпадении нескольких фильтров выбирается фильтр с более высоким приоритетом            |
| `match.outputTypes`        | нет         | Идентификаторы результатов детектора, выбирающие этот фильтр                                |
| `match.commands`           | нет         | Токены команд, выбирающие этот фильтр                                                       |
| `match.patterns`           | нет         | Регулярные выражения, выбирающие этот фильтр по тексту вывода                               |
| `rules.stripAnsi`          | нет         | Удаляет управляющие последовательности ANSI перед этапами обработки регулярными выражениями |
| `rules.replace`            | нет         | Упорядоченные подстановки по регулярным выражениям, применяемые построчно                   |
| `rules.matchOutput`        | нет         | Правила немедленного формирования вывода с необязательным условием `unless`                 |
| `rules.includePatterns`    | нет         | Строки, которым следует отдавать предпочтение при сохранении                                |
| `rules.dropPatterns`       | нет         | Строки, удаляемые как шум                                                                   |
| `rules.collapsePatterns`   | нет         | Повторяющиеся совпадающие строки, которые можно свернуть                                    |
| `rules.deduplicate`        | нет         | Сворачивает дублирующиеся нормализованные строки                                            |
| `rules.truncateLineAt`     | нет         | Безопасное для Unicode ограничение количества символов в строке                             |
| `rules.maxLines`           | нет         | Максимальное количество сохраняемых строк до сохранения хвостовой части                     |
| `rules.headLines`          | нет         | Начальные строки, сохраняемые при усечении                                                  |
| `rules.tailLines`          | нет         | Конечные строки, сохраняемые для актуального контекста                                      |
| `rules.onEmpty`            | нет         | Резервное сообщение, если фильтрация удаляет всё содержимое                                 |
| `rules.filterStderr`       | нет         | Нормализует распространённые префиксы stderr перед последующими этапами фильтрации          |
| `preserve.errorPatterns`   | нет         | Строки с ошибками, которые должны сохраняться при усечении                                  |
| `preserve.summaryPatterns` | нет         | Строки со сводкой, которые должны сохраняться при усечении                                  |
| `tests[]`                  | нет         | Встроенные проверочные примеры, используемые этапом проверки RTK                            |

RTK применяет декларативные этапы в следующем порядке: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` и `onEmpty`.

Пользовательские фильтры могут загружаться из следующих источников:

1. Файлы проекта `.rtk/filters.json` — только при наличии соответствующего хеша в `.rtk/trust.json` или
   если включён параметр `trustProjectFilters`.
2. Глобальный файл `DATA_DIR/rtk/filters.json`.
3. Встроенные фильтры.

Пользовательские файлы проекта и глобальные файлы могут содержать один объект фильтра или массив объектов фильтров. Недопустимые
пользовательские фильтры пропускаются с диагностическими сообщениями; недопустимые встроенные фильтры приводят к ошибке проверки.

Файл доверия проекта:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Переопределение окружения `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` позволяет доверять фильтрам проекта без
хеша и должно использоваться только при контролируемой локальной разработке.

## Правила безопасности

- Правила должны быть идемпотентными: повторное применение одного и того же фильтра не должно повреждать вывод.
- По возможности сохраняйте точный текст ошибок, пути к файлам, номера строк и сводки команд.
- Избегайте правил, изменяющих блоки кода, данные JSON, URL-адреса или секреты.
- Добавляйте модульные тесты для новых семейств команд в тесты детекторов и фильтров.
- Добавляйте образцы `tests[]` в каждый встроенный фильтр и в общие пользовательские фильтры.

## Валидация

Наборы правил проверяются перед использованием. Встроенные наборы Caveman и встроенные фильтры RTK немедленно завершают работу с ошибкой
при сбое валидации, чтобы неисправные ресурсы релиза были обнаружены до поставки. Пользовательские фильтры RTK
пропускаются с диагностическими сообщениями, если синтаксический анализ или проверка доверия завершаются неудачно.

Целевая валидация:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
