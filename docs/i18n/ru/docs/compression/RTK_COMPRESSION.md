# RTK Compression (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK compression — это механизм OmniRoute для сжатия вывода терминала и инструментов с учётом команд. Он предназначен для сеансов с агентами программирования, в которых большая часть контекста формируется из журналов тестирования, вывода сборки, избыточного вывода менеджеров пакетов, стенограмм оболочки, вывода Docker, вывода git и трассировок стека.

RTK может работать напрямую с `defaultMode: "rtk"` или использоваться как первый этап составного конвейера, обычно:

```txt
rtk -> caveman
```

Такой порядок сначала сжимает зашумлённый машинный вывод, а затем позволяет Caveman сократить оставшийся текст.

Согласно данным исходного проекта RTK, экономия для вывода команд составляет `60-90%`. В примере сеанса из его README объём сокращается с `~118,000` стандартных токенов до `~23,900` токенов RTK, что соответствует экономии `79.7%` (`~80%`). OmniRoute использует это среднее значение исходного проекта для расчёта экономии составного конвейера со сжатием входных данных Caveman:

```txt
Среднее RTK:       экономия 80%
Вход Caveman:      экономия 46%
Составной режим:   1 - (1 - 0.80) * (1 - 0.46) = экономия 89.2%
Диапазон:          1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Что сжимается

Встроенный каталог в настоящее время содержит 49 фильтров следующих категорий:

| Категория | Примеры                                                       |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, тесты Go, тесты Cargo       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, универсальные журналы оболочки          |
| `docker`  | `docker ps`, журналы Docker                                   |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | вывод JSON, трассировки стека, универсальный резервный фильтр |

Детектор в `open-sse/services/compression/engines/rtk/commandDetector.ts` классифицирует вывод перед выбором фильтра. Фильтры также могут сопоставляться по шаблону команды или регулярному выражению для вывода, если класса команды недостаточно.

## Разрешение фильтров

RTK загружает фильтры в следующем порядке:

1. Фильтры проекта из `.rtk/filters.toml` и `.rtk/filters.json`, только если они являются доверенными.
2. Глобальные фильтры из `DATA_DIR/rtk/filters.toml` и `DATA_DIR/rtk/filters.json`.
3. Встроенные фильтры из `open-sse/services/compression/engines/rtk/filters/`.

В пределах одной области видимости фильтры схемы RTK TOML v1 имеют приоритет над JSON-фильтрами OmniRoute. Выражения TOML `match_command` проверяются перед сопоставлением по типу команды, поэтому импортированный фильтр для конкретной команды может переопределить более общий фильтр в той же области видимости. Область видимости проекта всё равно имеет приоритет над глобальной областью видимости независимо от формата файла.

Для фильтров проекта намеренно требуется доверие, поскольку фильтры с регулярными выражениями могут изменять способ отображения вывода инструментов для агентов. Файл фильтров проекта принимается, если выполняется одно из следующих условий:

- `rtkConfig.trustProjectFilters` имеет значение `true`.
- Установлена переменная `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` содержит соответствующий SHA-256-хеш файла фильтров проекта.

Пример файла доверия:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Хеши разделены: `filtersSha256` устанавливает доверие к `.rtk/filters.json`, а `filtersTomlSha256` — к `.rtk/filters.toml`. Изменение любого из файлов аннулирует только соответствующую ему запись доверия. Глобальные файлы устанавливаются администратором и используют существующее поведение доверия для глобальных фильтров.

Пользовательские фильтры могут быть представлены одним объектом фильтра или массивом объектов фильтров. Недопустимые пользовательские фильтры пропускаются и указываются в диагностике `/api/context/rtk/filters`. Недопустимые встроенные фильтры приводят к немедленному завершению с ошибкой.

## Совместимость со схемой RTK TOML v1

OmniRoute может разбирать, проверять, тестировать и устанавливать декларативные файлы фильтров, использующие схему RTK TOML v1.
Поддерживаются поля `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` и встроенные тесты `[[tests.<filter>]]`.
Неизвестные поля, недопустимые или небезопасные регулярные выражения, одновременное использование правил удаления и сохранения строк, файлы размером более
1 MiB и ссылки на неизвестные фильтры отклоняются. Файл, встроенные тесты которого завершаются неудачно, можно
проверить для анализа, но нельзя установить или загрузить. Сбои загрузки пользовательских файлов
обрабатываются по принципу fail-open: недопустимый файл пропускается, а остальные фильтры продолжают работать.

OmniRoute получает вывод инструмента после того, как клиент уже захватил его, поэтому `filter_stderr = true`
не может изменить захват процесса. Поле принимается как не выполняющее никаких действий, а при проверке возвращается предупреждение.
Это намеренно описывается как **совместимость со схемой RTK TOML v1**, а не как полная совместимость
с исполняемым файлом RTK, оболочечными хуками, реализациями команд на Rust или структурой его хранилища доверия.

Расширенное представление RTK на панели управления принимает вставленный или загруженный TOML. Проверка выполняется только для чтения.
При установке файл `DATA_DIR/rtk/filters.toml` записывается атомарно с ограничительными разрешениями, а активный
каталог фильтров обновляется без перезапуска. Для замены существующего файла требуется явное подтверждение `overwrite`,
при этом сначала создаётся `DATA_DIR/rtk/filters.toml.bak`.

## DSL фильтров

Фильтры используют схему JSON, описанную в документе [Формат правил сжатия](./COMPRESSION_RULES_FORMAT.md).
Среда выполнения применяет следующие этапы по порядку:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> удаление/включение строк
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Важные поля:

| Поле                         | Назначение                                                                                |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Удаление терминальных цветовых/управляющих последовательностей до сопоставления           |
| `rules.filterStderr`         | Нормализация распространённых префиксов stderr до сопоставления/фильтрации                |
| `rules.replace`              | Применение упорядоченных замен по регулярным выражениям                                   |
| `rules.matchOutput`          | Возврат краткой сводки, когда вывод соответствует известному условию                      |
| `rules.matchOutput[].unless` | Пропуск сокращённого результата при наличии шаблона ошибки/сбоя                           |
| `rules.dropPatterns`         | Удаление малоинформативных строк                                                          |
| `rules.includePatterns`      | Предпочтительное сохранение строк, требующих действий                                     |
| `rules.collapsePatterns`     | Сворачивание повторяющихся совпадающих строк                                              |
| `rules.deduplicate`          | Включаемое отдельно для каждого фильтра сворачивание последовательных дублирующихся строк |
| `rules.truncateLineAt`       | Безопасное для Unicode усечение каждой строки                                             |
| `rules.onEmpty`              | Резервное сообщение, если все строки отфильтрованы                                        |
| `tests[]`                    | Встроенные примеры, используемые проверочным шлюзом                                       |

Ожидается, что встроенные фильтры содержат встроенные примеры `tests[]`. Пользовательским фильтрам также следует
их включать, особенно если они используются совместно в нескольких проектах.

## Удаление дубликатов строк (два уровня)

RTK удаляет повторяющиеся строки на двух независимых уровнях:

1. **Параметр `deduplicate` для отдельного фильтра (включается явно, по умолчанию `false`).** Фильтр может задать `rules.deduplicate: true`,
   чтобы объединять последовательные повторяющиеся строки _в выходных данных, соответствующих этому фильтру_, до усечения.
   Эта обработка выполняется внутри `lineFilter.ts`. Для устаревших фильтров она включается автоматически, если фильтр определяет
   `collapsePatterns`. Схема: `deduplicate: z.boolean().default(false)` в
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Общий для движка параметр `deduplicateThreshold` (по умолчанию `3`).** После выполнения всех фильтров движок объединяет
   любую последовательность из `>= deduplicateThreshold` идентичных строк во всём результате
   (`deduplicateRepeatedLines`, применяется в `engines/rtk/index.ts`). При нормализации значение ограничивается диапазоном 2–100.

Сначала выполняется проход на уровне отдельного фильтра (внутри фильтра), а последним — общий проход на уровне движка (по объединённым
выходным данным), поэтому они применяются совместно без повторного учёта.

## Группировка строк (`enableGrouping`)

Когда `rtkConfig.enableGrouping` имеет значение `true` (по умолчанию `false`), RTK выполняет дополнительный проход `groupSimilarLines`
по результату после удаления дубликатов, объединяя последовательности _почти эквивалентных_ (но не идентичных побайтно)
строк. `rtkConfig.groupingThreshold` (по умолчанию `3`) задаёт минимальную длину последовательности, при которой срабатывает
группировка. Это структурный аналог `deduplicateThreshold`: удаление дубликатов обрабатывает точные повторы,
а группировка — строки «одинаковой формы с небольшими различиями». Оба флага входят в JSON `rtkConfig`,
сохраняемый в таблице `key_value` (см. раздел «Конфигурация» выше), поэтому настройка сохраняется после перезапусков.

## Удаление комментариев из кода (`stripCodeComments` / `preserveDocstrings`)

Когда включён параметр `rtkConfig.applyToCodeBlocks`, RTK также может удалять комментарии из ограждённых блоков кода:

- `stripCodeComments` (по умолчанию `false`) — включается явно. При значении `true` RTK удаляет комментарии
  из ограждённых блоков JavaScript и TypeScript. Исторически этот флаг считывался, но никогда не применялся, поэтому
  значением по умолчанию остаётся «сохранять», чтобы избежать незаметного изменения рабочего поведения.
- `preserveDocstrings` (по умолчанию `true`) — при удалении комментариев блочные комментарии JSDoc/`/** … */`
  сохраняются (они содержат документацию API, ценность которой превышает затраты на занимаемые ими байты). Установите `false`,
  чтобы удалять и их.

Удаление комментариев реализовано в `open-sse/services/compression/engines/rtk/codeStripper.ts`. Используется
**парсер TypeScript** (а не регулярное выражение), поэтому строковые литералы, шаблонные строки и литералы регулярных выражений
никогда не принимаются за комментарии; при обнаружении JSX обработка полностью прекращается (чтобы не повредить комментарии
в контейнерах выражений JSX). В настоящее время удаление комментариев применяется **только к JavaScript и TypeScript** — для других
языков из набора `CodeLanguage` этого обработчика (Python, Rust, Go, Ruby, Java) выполняется удаление пустых строк и
сворачивание пробельных символов, но комментарии не удаляются. Обработанный блок помечается тегом `rtk:code-strip` в
`rulesApplied`.

> **Примечание — GCF / табличное кодирование реализовано в отдельном движке.** RTK **не** содержит табличный/колоночный кодировщик JSON «GCF»
> (Graph Compact Format). Этот кодировщик, заменивший прежний кодировщик `omni-tabular`, находится в движке **headroom**
> (`open-sse/services/compression/engines/headroom/`, а встроенный кодек — в
> `headroom/gcf/`). Он не связан с конвейером фильтрации RTK, описанным здесь.

## Конфигурация

Глобальные настройки доступны через `/api/settings/compression`. Настройки, относящиеся к RTK, также
доступны через `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

В `enabledFilters` и `disabledFilters` используются идентификаторы фильтров, например `test-vitest` или `git-diff`.

Полная структура `rtkConfig` определяется `RtkConfig` / `DEFAULT_RTK_CONFIG` в
`open-sse/services/compression/types.ts`. Весь объект сохраняется как единое значение JSON в
таблице SQLite `key_value` с `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) и нормализуется при чтении с помощью `normalizeRtkConfig`. Поэтому каждое указанное ниже
поле, включая `enableGrouping`, `groupingThreshold`, `stripCodeComments` и `preserveDocstrings`,
проходит полный цикл записи и чтения через одно и то же хранилище и сохраняется после перезапуска.

| Ключ                   | По умолчанию | Назначение                                                                                           |
| ---------------------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`          | Для всего движка: минимальное число последовательных одинаковых строк для сворачивания (от 2 до 100) |
| `enableGrouping`       | `false`      | Опционально: сворачивать последовательности почти эквивалентных строк                                |
| `groupingThreshold`    | `3`          | Минимальное число последовательных похожих строк, запускающее группировку                            |
| `stripCodeComments`    | `false`      | Опционально: удалять комментарии из ограждённых блоков кода (требуется `applyToCodeBlocks`)          |
| `preserveDocstrings`   | `true`       | При удалении комментариев сохранять блоки JSDoc/`/** … */`                                           |

## API

| Маршрут                            | Метод | Назначение                                                                  |
| ---------------------------------- | ----- | --------------------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET   | Получить конфигурацию RTK                                                   |
| `/api/context/rtk/config`          | PUT   | Обновить конфигурацию RTK                                                   |
| `/api/context/rtk/filters`         | GET   | Получить каталог фильтров и диагностику загрузки                            |
| `/api/context/rtk/import`          | POST  | Проверить или установить файлы схемы RTK TOML v1                            |
| `/api/context/rtk/test`            | POST  | Предварительно просмотреть сжатие RTK для одной текстовой полезной нагрузки |
| `/api/context/rtk/raw-output/[id]` | GET   | Получить сохранённый отредактированный необработанный вывод                 |
| `/api/compression/preview`         | POST  | Предварительно просмотреть любой режим сжатия                               |

Полезная нагрузка для тестирования RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Полезная нагрузка для предварительного просмотра сжатия:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Маршруты управления требуют аутентификации управления панели мониторинга или соответствующей политики API-ключа.

Полезная нагрузка для проверки RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Используйте `"action": "install"`, чтобы установить проверенный файл глобально. Добавляйте `"overwrite": true` только
после проверки и подтверждения замены существующего глобального файла.

## Восстановление необработанного вывода

Обычно RTK возвращает только сжатый текст. Для отладки параметр `rawOutputRetention` позволяет сохранять отредактированный
необработанный вывод:

| Значение   | Поведение                                                           |
| ---------- | ------------------------------------------------------------------- |
| `never`    | Не сохранять необработанный вывод                                   |
| `failures` | Сохранять только вывод, вероятно свидетельствующий об ошибке        |
| `always`   | Сохранять весь сжатый RTK необработанный вывод после редактирования |

Сохранённые файлы записываются в:

```txt
DATA_DIR/rtk/raw-output/
```

Перед сохранением секретные данные редактируются, включая распространённые bearer-токены, ключи API, токены Slack,
ключи доступа AWS и значения в формате присваивания `token=...`, `secret=...`, `password=...`. В аналитике
хранятся только идентификатор указателя, размер и метаданные хеша.

## Проверочный шлюз

Целевой проверочный шлюз запускает встроенные тесты встроенных фильтров без обращения к внешним командам оболочки:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Более широкий шлюз RTK:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Перед выпуском запустите широкий шлюз проверки сжатия:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Расширение RTK

1. Добавьте или обновите JSON-файл фильтра.
2. Включите как минимум один пример `tests[]`, подтверждающий важное поведение.
3. Для новых семейств команд добавьте фикстуру в `tests/unit/compression/fixtures/rtk/`.
4. При добавлении нового класса вывода добавьте покрытие распознавания команд.
5. Запустите проверочный и широкий шлюзы RTK.
6. Если фильтр является локальным для проекта, зафиксируйте `.rtk/filters.json` и обновите `.rtk/trust.json` только после проверки.

---

## Уровни интенсивности (v3.8.16+)

RTK поддерживает **3 уровня интенсивности**, обеспечивающих компромисс между **агрессивностью сжатия** и **безопасностью**. Уровень задаётся через `config.intensity` в конфигурации движка.

### 3 уровня

| Уровень                   | Порог усечения      | Экономия токенов | Риск         | Лучше всего подходит для                  |
| ------------------------- | ------------------- | ---------------- | ------------ | ----------------------------------------- |
| `minimal`                 | 24 строки на раздел | ~20-40%          | Очень низкий | Продакшена с критически важным контекстом |
| `standard` (по умолчанию) | 24 строки на раздел | ~50-70%          | Низкий       | Ежедневных сеансов программирования       |
| `aggressive`              | 16 строк на раздел  | ~70-90%          | Средний      | Длительных сеансов, максимальной экономии |

### Где происходит усечение

Порог усечения влияет на `lineFilter.ts`:

```ts
// Из open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Сохраняются как **начало**, так и **конец** каждого раздела; при срабатывании усечения содержимое в середине удаляется.

### Что сохраняется, а что удаляется

| Содержимое                          | minimal          | standard         | aggressive       |
| ----------------------------------- | ---------------- | ---------------- | ---------------- |
| Ошибки / трассировки стека          | ✅ сохраняются   | ✅ сохраняются   | ✅ сохраняются   |
| Неудачные тесты                     | ✅ сохраняются   | ✅ сохраняются   | ✅ сохраняются   |
| Ошибки сборки                       | ✅ сохраняются   | ✅ сохраняются   | ✅ сохраняются   |
| Успешные тесты (подробный вывод)    | ✅ сохраняются   | 🟡 сворачиваются | 🟡 сворачиваются |
| Обычный вывод (информационные логи) | 🟡 сворачивается | 🟡 сворачивается | ❌ удаляется     |
| Индикаторы выполнения               | 🟡 сворачиваются | ❌ удаляются     | ❌ удаляются     |
| Баннеры / ASCII-графика             | 🟡 сворачиваются | ❌ удаляются     | ❌ удаляются     |

### Выбор подходящей интенсивности

```
                  Потеря контекста катастрофична?
                  │
      ┌───────────┼───────────┐
      │           │           │
     ДА          НЕТ       НЕ УВЕРЕНЫ
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Насколько важна  Сначала попробуйте `standard`
      │      пропускная       (подходит для 80%
      │      способность?     случаев)
      │           │
      │      ┌────┴────┐
      │      │         │
      │    НИЗКАЯ    ВЫСОКАЯ
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Настройка интенсивности

**Для отдельной комбинации** (в конфигурации комбинации):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Программно**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) является
`CompressionEngine` и не имеет метода `updateConfig`. Обновляйте конфигурацию движка
с помощью вспомогательной функции реестра:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Проверка эффекта

Используйте **проверочный шлюз** (см. ниже), чтобы убедиться, что ваш фильтр безопасен при выбранной интенсивности:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Сбой фильтров при агрессивной интенсивности");
}
```

---

## Разработка пользовательских фильтров (v3.8.16+)

Каталог `engines/rtk/filters/` содержит **более 49 встроенных JSON-файлов фильтров**. Вы можете добавлять собственные фильтры для сжатия вывода пользовательских инструментов, не поддерживаемых по умолчанию.

### Схема фильтра (Zod)

```ts
{
  "id": "string",                      // Обязательно. Идентификатор фильтра (kebab-case, например, "python-traceback")
  "label": "string",                   // Обязательно. Понятное человеку название фильтра
  "description": "string",             // Необязательно (по умолчанию: ""). Краткое описание назначения фильтра
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Необязательно (0–100, по умолчанию: 50). Порядок выполнения (чем выше, тем раньше)
  "match": {
    "commands": ["string"],            // Имена команд для сопоставления (например, "python", "pytest")
    "patterns": ["string"],            // Регулярные выражения для сопоставления с выводом
    "outputTypes": ["string"]          // Обнаруженные классы вывода (например, "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Необязательно (по умолчанию: false). Удалять цветовые ANSI-коды
    "replace": [                       // Правила поиска и замены (по умолчанию: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Немедленно завершить обработку при совпадении с шаблоном (по умолчанию: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Пропустить, если этот шаблон совпадает
      }
    ],
    "includePatterns": ["string"],     // Строки, которые нужно сохранить (регулярные выражения, по умолчанию: [])
    "dropPatterns": ["string"],        // Строки, которые нужно удалить (регулярные выражения, по умолчанию: [])
    "collapsePatterns": ["string"],    // Строки, которые нужно свернуть до одного вхождения (по умолчанию: [])
    "deduplicate": boolean,            // Необязательно (по умолчанию: false). Удалять повторяющиеся строки
    "truncateLineAt": number,          // Необязательно (по умолчанию: 0). Обрезать строки до максимального количества символов
    "maxLines": number,                // Необязательно (по умолчанию: 0). Жёсткое ограничение общего количества строк
    "headLines": number,               // Необязательно (по умолчанию: 20). Сохранять первые N строк совпавшего вывода
    "tailLines": number,               // Необязательно (по умолчанию: 20). Сохранять последние N строк совпавшего вывода
    "onEmpty": "string",               // Необязательно (по умолчанию: ""). Резервное сообщение, если все строки отфильтрованы
    "filterStderr": boolean            // Необязательно (по умолчанию: false). Также фильтровать вывод stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Шаблоны, которые всегда должны сохраняться (по умолчанию: [])
    "summaryPatterns": ["string"]      // Шаблоны итоговой строки (по умолчанию: [])
  },
  "tests": [                           // Встроенные тесты для проверки (по умолчанию: [])
    {
      "name": "string",               // Обязательно. Название теста
      "input": "sample output",        // Обязательно. Пример входного текста
      "expected": "expected output",   // Обязательно. Ожидаемый сжатый вывод
      "command": "optional command"    // Необязательно. Контекст команды
    }
  ]
}
```

### Пример: фильтр трассировки Python

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Загрузка пользовательских фильтров

Поместите файл в одно из распознаваемых расположений:

```
~/.omniroute/rtk/filters/my-filter.json     # Пользовательский уровень
<project>/.rtk/filters/my-filter.json      # Уровень проекта
```

Фильтры автоматически загружаются при запуске с помощью `loadRtkFilters()` из `open-sse/services/compression/engines/rtk/filterLoader.ts`. Загрузчик обнаруживает фильтры в следующих расположениях:

- Встроенный каталог: `open-sse/services/compression/engines/rtk/filters/`
- Пользовательский каталог: `~/.omniroute/rtk/filters/`
- Каталог проекта: `<project>/.rtk/filters/`

Чтобы загрузить фильтры программно:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Параметры: customFiltersEnabled (загрузка пользовательских фильтров и фильтров проекта, включена по умолчанию),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Проверка

При загрузке фильтры проверяются на соответствие схеме Zod. Фильтр с некорректной структурой не будет загружен, а ошибка будет записана в журнал:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Чтобы проверить все установленные фильтры, вызовите `runRtkFilterTests()`, экспортируемую из `open-sse/services/compression/engines/rtk/verify.ts`.

### Рекомендации

1. **Всегда включайте `tests[]`** — они подтверждают, что ваш фильтр работает, и предотвращают регрессии
2. **Используйте `matchOutput` для коротких замыканий** — если одной строки достаточно, чтобы передать суть, замените ею весь блок
3. **Предпочитайте `keep` вместо `strip`** — явные правила «всегда сохранять» безопаснее, чем «всегда удалять»
4. **Тестируйте на всех 3 уровнях интенсивности** — `minimal` не должен ничего менять, а `aggressive` всё равно должен сохранять ошибки
5. **Используйте поле `unless`** — защищайте короткие замыкания условием «не срабатывать, если присутствует X»

---

## Восстановление необработанного вывода и проверочный шлюз

Когда RTK агрессивно сжимает вывод, вы можете **восстановить исходный текст** для отладки, аудита или повторного воспроизведения.

### Как работает восстановление необработанного вывода

```
Исходный вывод (10K токенов)
        │
        ▼
Сжатие RTK (с rawOutput.enabled=true)
        │
        ├─▶ Сжатый вывод (2K токенов)      ──▶ в LLM
        │
        └─▶ Исходный вывод (10K токенов)   ──▶ сохраняется в БД
                                                  (связан через request_id)
```

### Включение хранения необработанного вывода

**Для отдельного запроса** (в конфигурации combo):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Ограничение в 1 МБ
    }
  }
}
```

**По умолчанию**: `rawOutput.enabled: false` (экономит место в хранилище).

### Затраты на хранение

| На один запрос             | Ограничение 1 МБ | Ограничение 10 МБ |
| -------------------------- | ---------------- | ----------------- |
| Средний сжатый вывод       | ~5 КБ            | ~5 КБ             |
| Сохранённый исходный вывод | ~50–500 КБ       | ~500 КБ–5 МБ      |
| При 1000 запросах в день   | 50–500 МБ/день   | 500 МБ–5 ГБ/день  |

> **Рекомендация**: включайте необработанный вывод только для **сеансов отладки** или **выборочного аудита**, а не на постоянной основе.

### Восстановление исходного вывода

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId из статистики сжатия
if (raw) {
  console.log("Исходный вывод:", raw);
}
```

`pointerId` возвращается в `CompressionStats.rtkRawOutputPointers[]` после сжатия.
Сигнатуру функции см. в `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Проверочный шлюз

**Проверка фильтров RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) проверяет все фильтры на соответствие их `tests[]` и корректность поведения на всех 3 уровнях интенсивности.

**Вызовите `runRtkFilterTests()`**, чтобы запустить проверку:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Пройдено: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Не пройдено: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Фильтры не прошли проверку");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: ожидалось "${o.expected}", получено "${o.actual}"`
      );
    });
}
```

**Что проверяется**:

1. Каждый фильтр загружается и проходит проверку схемы
2. Каждая запись `tests[]` формирует ожидаемый вывод
3. Интенсивность `minimal` ничего не изменяет (сохраняет исходные данные, применяя только структурные фильтры)
4. Интенсивность `aggressive` сохраняет ошибки, сбои тестов и трассировки стека
5. Сжатый вывод никогда не превышает по размеру исходные входные данные

- Исходный код: `open-sse/services/compression/engines/rtk/` (63 файла, ~70 КБ)

- **Перед слиянием изменения фильтра** — всегда проверяйте, что тесты проходят
- **После обновления движка RTK** — схема могла измениться
- **Периодически при мониторинге** — защищает от рассинхронизации тестовых фикстур
- **При добавлении нового семейства инструментов/команд** — подтверждает работоспособность нового фильтра

---

## См. также

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Полный обзор конвейера сжатия
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Реестр движков и встроенные движки
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Пользовательские движки, языковые пакеты, составные конвейеры
- Исходный код: `open-sse/services/compression/engines/rtk/` (63 файла, ~70 КБ)
