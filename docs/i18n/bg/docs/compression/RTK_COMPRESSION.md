# RTK Compression (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK компресията е съобразена с командите система за компресиране на OmniRoute за изход от терминали и инструменти. Тя е
проектирана за сесии с агенти за програмиране, при които по-голямата част от нарастването на контекста идва от тестови журнали, изход от компилации,
шум от мениджъри на пакети, транскрипти от обвивката, изход от Docker, изход от git и трасировки на стека.

RTK може да работи директно с `defaultMode: "rtk"` или като първа стъпка в комбиниран конвейер, обикновено:

```txt
rtk -> caveman
```

Този ред първо компресира шумния машинен изход, след което позволява на Caveman да съкрати останалата проза.

Основният проект RTK отчита `60-90%` спестяване при изход от команди. Примерната сесия в неговия README намалява
от `~118,000` стандартни токена до `~23,900` RTK токена, което представлява `79.7%` спестяване (`~80%`). OmniRoute използва
тази средна стойност от основния проект за изчисляване на комбинираните спестявания с входната компресия на Caveman:

```txt
Средно за RTK:    80% спестени
Вход за Caveman: 46% спестени
Комбинирано:     1 - (1 - 0.80) * (1 - 0.46) = 89.2% спестени
Диапазон:        1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Какво компресира

Вграденият каталог в момента включва 49 филтъра в следните категории:

| Категория | Примери                                                           |
| --------- | ----------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`                 |
| `test`    | Vitest, Jest, Pytest, Playwright, тестове на Go, тестове на Cargo |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx     |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler     |
| `shell`   | `ls`, `find`, `grep`, общи журнали на обвивката                   |
| `docker`  | `docker ps`, журнали на Docker                                    |
| `infra`   | Terraform, OpenTofu, `systemctl status`                           |
| `generic` | JSON изход, трасировки на стека, общ резервен вариант за изход    |

Детекторът в `open-sse/services/compression/engines/rtk/commandDetector.ts` класифицира изхода
преди избора на филтър. Филтрите могат също да съпоставят по шаблон на команда или регулярен израз за изхода, когато даден клас
команди не е достатъчен.

## Определяне на филтрите

RTK зарежда филтрите в следния ред:

1. Проектни филтри от `.rtk/filters.toml` и `.rtk/filters.json`, само когато са доверени.
2. Глобални филтри от `DATA_DIR/rtk/filters.toml` и `DATA_DIR/rtk/filters.json`.
3. Вградени филтри от `open-sse/services/compression/engines/rtk/filters/`.

В рамките на един и същ обхват филтрите по TOML схемата v1 на RTK имат предимство пред JSON филтрите на OmniRoute. TOML
изразите `match_command` се проверяват преди съпоставянето по тип на командата, така че импортиран филтър за конкретна команда
може да замести по-общ филтър в този обхват. Проектният обхват все пак има предимство пред глобалния
обхват независимо от файловия формат.

Проектните филтри умишлено се активират само при наличие на доверие, тъй като филтрите с регулярни изрази могат да променят начина, по който изходът от инструментите се
показва на агентите. Файл с проектни филтри се приема, когато е изпълнено едно от следните условия:

- `rtkConfig.trustProjectFilters` е `true`.
- Зададено е `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` съдържа съответстващия SHA-256 хеш за файла с проектни филтри.

Примерен файл за доверие:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Хешовете са отделни: `filtersSha256` удостоверява `.rtk/filters.json`, а `filtersTomlSha256`
удостоверява `.rtk/filters.toml`. Редактирането на който и да е от файловете анулира само съответния му запис за доверие. Глобалните файлове
се инсталират от администратор и използват съществуващото поведение за доверие на глобални филтри.

Персонализираните филтри могат да бъдат един филтърен обект или масив от филтърни обекти. Невалидните персонализирани филтри се
пропускат и се отчитат от диагностиката на `/api/context/rtk/filters`. Невалидните вградени филтри предизвикват незабавна грешка.

## Съвместимост с RTK TOML schema v1

OmniRoute може да анализира, валидира, тества и инсталира декларативни файлове с филтри, използващи RTK TOML schema v1.
Поддържаните полета са `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` и вградените тестове `[[tests.<filter>]]`.
Непознати полета, невалидни или опасни регулярни изрази, едновременно зададени правила за премахване и запазване, файлове над
1 MiB и препратки към непознати филтри се отхвърлят. Файл, чиито вградени тестове са неуспешни, може да бъде
валидиран с цел преглед, но не може да бъде инсталиран или зареден. Неуспешното зареждане на персонализиран файл остава
fail-open: невалидният файл се пропуска, а останалите филтри продължават да работят.

OmniRoute получава изхода на инструмента, след като клиентът вече го е прихванал, така че `filter_stderr = true`
не може да промени прихващането на процеса. Полето се приема като no-op, а валидирането връща предупреждение.
Това умишлено е описано като **съвместимост с RTK TOML schema v1**, а не като пълна съвместимост
с изпълнимия файл на RTK, shell hooks, реализациите на команди на Rust или неговата структура на trust-store.

Разширеният RTK изглед на таблото приема поставен или качен TOML. Валидирането е само за четене.
Инсталирането записва `DATA_DIR/rtk/filters.toml` атомарно с ограничителни права за достъп и обновява
активния каталог с филтри без рестартиране. Замяната на съществуващ файл изисква изрично потвърждение чрез `overwrite`
и първо създава `DATA_DIR/rtk/filters.toml.bak`.

## DSL за филтри

Филтрите използват JSON схемата, описана в [Формат на правилата за компресиране](./COMPRESSION_RULES_FORMAT.md).
По време на изпълнение тези етапи се прилагат в следния ред:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> премахване/включване на редове
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Важни полета:

| Поле                         | Предназначение                                                                  |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Премахва цветовите/контролните последователности на терминала преди съпоставяне |
| `rules.filterStderr`         | Нормализира обичайните stderr префикси преди съпоставяне/филтриране             |
| `rules.replace`              | Прилага подредени замени чрез регулярни изрази                                  |
| `rules.matchOutput`          | Връща кратко обобщение, когато изходът съответства на известно условие          |
| `rules.matchOutput[].unless` | Пропуска съкратения резултат, когато има шаблон за грешка/неуспех               |
| `rules.dropPatterns`         | Премахва шумни редове                                                           |
| `rules.includePatterns`      | Дава приоритет на редове, изискващи действие                                    |
| `rules.collapsePatterns`     | Свива повтарящи се съвпадащи редове                                             |
| `rules.deduplicate`          | Активира се за всеки филтър поотделно: свива последователни дублирани редове    |
| `rules.truncateLineAt`       | Unicode-безопасно съкращаване на всеки ред                                      |
| `rules.onEmpty`              | Резервно съобщение, ако всички редове бъдат филтрирани                          |
| `tests[]`                    | Вградени примери, използвани от проверката за верификация                       |

Очаква се вградените филтри да включват вградени примери в `tests[]`. Персонализираните филтри също трябва да ги включват,
особено когато се споделят между проекти.

## Дедупликация на редове (два слоя)

RTK обединява дублиращите се редове на два независими слоя:

1. **`deduplicate` за всеки филтър (по избор, по подразбиране `false`).** Даден филтър може да зададе `rules.deduplicate: true`,
   за да обедини последователните дублиращи се редове _в съвпадащия изход на този филтър_ преди съкращаването.
   Това се изпълнява в `lineFilter.ts`. За наследените филтри се активира автоматично, когато филтърът дефинира
   `collapsePatterns`. Схема: `deduplicate: z.boolean().default(false)` в
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Общо за двигателя `deduplicateThreshold` (по подразбиране `3`).** След изпълнението на всички филтри двигателят обединява
   всяка поредица от `>= deduplicateThreshold` идентични последователни редове в целия резултат
   (`deduplicateRepeatedLines`, приложено в `engines/rtk/index.ts`). При нормализиране стойността се ограничава между 2 и 100.

Обработката за всеки филтър се изпълнява първа (във филтъра), а общата за двигателя обработка се изпълнява последна (върху обединения
изход), така че двете се комбинират без двойно отчитане.

## Групиране на редове (`enableGrouping`)

Когато `rtkConfig.enableGrouping` е `true` (по подразбиране `false`), RTK изпълнява допълнителна обработка с `groupSimilarLines`
върху резултата след дедупликацията, която обединява поредици от _почти еквивалентни_ (не идентични на ниво байтове)
последователни редове. `rtkConfig.groupingThreshold` (по подразбиране `3`) е минималната дължина на поредицата, която задейства
групирането. Това е структурният аналог на `deduplicateThreshold`: дедупликацията обработва точните повторения,
а групирането обработва „една и съща форма с малки разлики“. И двата флага са част от JSON конфигурацията `rtkConfig`,
съхранявана в таблицата `key_value` (вижте „Конфигурация“ по-горе), така че настройката се запазва след рестартиране.

## Премахване на коментари от код (`stripCodeComments` / `preserveDocstrings`)

Когато `rtkConfig.applyToCodeBlocks` е активирано, RTK може също да премахва коментари от оградени кодови блокове:

- `stripCodeComments` (по подразбиране `false`) — по избор. Когато е `true`, RTK премахва коментарите от оградени блокове с JavaScript
  и TypeScript. Исторически флагът е бил прочитан, но никога прилаган, затова стойността по подразбиране остава
  „запазване“, за да се избегне незабелязана промяна в продукционна среда.
- `preserveDocstrings` (по подразбиране `true`) — при премахване на коментари блоковите коментари JSDoc/`/** … */` се
  запазват (те съдържат API документация, чиято стойност надвишава цената на заеманите байтове). Задайте `false`, за да премахнете
  и тях.

Премахването на коментари е реализирано в `open-sse/services/compression/engines/rtk/codeStripper.ts`. То използва
**TypeScript анализатора** (а не регулярен израз), така че низови, шаблонни и regex литерали никога да не бъдат погрешно
разпознати като коментари, и прекратява изцяло обработката при откриване на JSX (така коментарите в контейнерите за JSX изрази
никога не се повреждат). Понастоящем премахването на коментари се прилага **само за JavaScript и TypeScript** — за другите
езици в множеството `CodeLanguage` на механизма за премахване (Python, Rust, Go, Ruby, Java) се извършва премахване на празни редове и
свиване на празното пространство, но не и премахване на коментари. Изпълнението за обработения блок се маркира с `rtk:code-strip` в
`rulesApplied`.

> **Бележка — GCF / табличното кодиране е отделен двигател.** RTK **не** съдържа табличния/колонен JSON енкодер „GCF“
> (Graph Compact Format). Този енкодер — който замени по-стария енкодер `omni-tabular` — се намира в двигателя **headroom**
> (`open-sse/services/compression/engines/headroom/`, като включеният кодек е в
> `headroom/gcf/`). Той не е свързан с конвейера от RTK филтри, документиран тук.

## Конфигурация

Глобалните настройки са достъпни чрез `/api/settings/compression`. Специфичните за RTK настройки са достъпни и чрез `/api/context/rtk/config`.

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

`enabledFilters` и `disabledFilters` използват идентификатори на филтри, например `test-vitest` или `git-diff`.

Пълната структура на `rtkConfig` е дефинирана от `RtkConfig` / `DEFAULT_RTK_CONFIG` в
`open-sse/services/compression/types.ts`. Целият обект се съхранява като единична JSON стойност в
SQLite таблицата `key_value` под `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) и се нормализира при прочитане от `normalizeRtkConfig`. Така всяко поле по-долу
— включително `enableGrouping`, `groupingThreshold`, `stripCodeComments` и `preserveDocstrings` —
се записва и прочита чрез едно и също хранилище и се запазва след рестартиране.

| Ключ                   | По подразбиране | Предназначение                                                                         |
| ---------------------- | --------------- | -------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`             | За цялата машина: мин. брой последователни еднакви редове за свиване (между 2–100)     |
| `enableGrouping`       | `false`         | По избор: свива поредици от почти еквивалентни последователни редове                   |
| `groupingThreshold`    | `3`             | Мин. брой последователни подобни редове, който задейства групиране                     |
| `stripCodeComments`    | `false`         | По избор: премахва коментарите от оградени блокове с код (изисква `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`          | При премахване на коментари запазва JSDoc/`/** … */` блоковете                         |

## API

| Маршрут                            | Метод | Предназначение                                               |
| ---------------------------------- | ----- | ------------------------------------------------------------ |
| `/api/context/rtk/config`          | GET   | Прочитане на RTK конфигурацията                              |
| `/api/context/rtk/config`          | PUT   | Актуализиране на RTK конфигурацията                          |
| `/api/context/rtk/filters`         | GET   | Извеждане на каталога с филтри и диагностиката при зареждане |
| `/api/context/rtk/import`          | POST  | Валидиране или инсталиране на RTK TOML файлове със схема v1  |
| `/api/context/rtk/test`            | POST  | Преглед на RTK компресията за един текстов вход              |
| `/api/context/rtk/raw-output/[id]` | GET   | Прочитане на запазения редактиран необработен изход          |
| `/api/compression/preview`         | POST  | Преглед на произволен режим на компресия                     |

Входни данни за RTK тест:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Входни данни за преглед на компресията:

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

Маршрутите за управление изискват удостоверяване за управление на таблото или съответстващата политика за API ключове.

Входни данни за валидиране на RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Използвайте `"action": "install"`, за да инсталирате валидирания файл глобално. Добавете `"overwrite": true` само
след като прегледате и потвърдите замяната на съществуващ глобален файл.

## Възстановяване на необработения изход

Обикновено RTK връща само компресиран текст. За отстраняване на грешки `rawOutputRetention` може да запазва редактирания
необработен изход:

| Стойност   | Поведение                                                        |
| ---------- | ---------------------------------------------------------------- |
| `never`    | Не запазва необработения изход                                   |
| `failures` | Запазва само изхода, който вероятно показва неуспешно изпълнение |
| `always`   | Запазва всеки компресиран необработен изход от RTK след редакция |

Запазените файлове се записват в:

```txt
DATA_DIR/rtk/raw-output/
```

Тайните се редактират преди записването, включително често срещани bearer токени, API ключове, Slack токени,
ключове за достъп до AWS и стойности във формат за присвояване като `token=...`, `secret=...`, `password=...`. Аналитичните данни
съхраняват само идентификатора на указателя, размера и хеш метаданните.

## Проверка за верификация

Фокусираната проверка за верификация изпълнява вградените тестове на inline филтрите, без да извиква външни команди чрез обвивката:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

По-широката RTK проверка е:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Изпълнете широката проверка на компресията преди издаване на версия:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Разширяване на RTK

1. Добавете или актуализирайте JSON файл с филтри.
2. Включете поне една `tests[]` извадка, която доказва важното поведение.
3. Добавете фикстура в `tests/unit/compression/fixtures/rtk/` за нови семейства команди.
4. Добавете покритие за разпознаване на команди, когато въвеждате нов клас изходни данни.
5. Изпълнете проверката за верификация и широките RTK проверки.
6. Ако филтърът е локален за проекта, включете `.rtk/filters.json` в commit и обновете `.rtk/trust.json` само след преглед.

---

## Нива на интензивност (v3.8.16+)

RTK поддържа **3 нива на интензивност**, които осигуряват различен баланс между **агресивността на компресията** и **безопасността**. Нивото се задава чрез `config.intensity` в конфигурацията на двигателя.

### Трите нива

| Ниво                         | Праг за съкращаване | Спестяване на токени | Риск        | Най-подходящо за                       |
| ---------------------------- | ------------------- | -------------------- | ----------- | -------------------------------------- |
| `minimal`                    | 24 реда на секция   | ~20-40%              | Много нисък | Продукционна среда с критичен контекст |
| `standard` (по подразбиране) | 24 реда на секция   | ~50-70%              | Нисък       | Ежедневни сесии за програмиране        |
| `aggressive`                 | 16 реда на секция   | ~70-90%              | Среден      | Дълги сесии, максимално спестяване     |

### Къде се извършва съкращаването

Прагът за съкращаване влияе върху `lineFilter.ts`:

```ts
// От open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Запазват се както **началото**, така и **краят** на всяка секция; съдържанието по средата се премахва, когато съкращаването се задейства.

### Какво се запазва и какво се премахва

| Съдържание                           | minimal        | standard        | aggressive      |
| ------------------------------------ | -------------- | --------------- | --------------- |
| Грешки / стекови трасировки          | ✅ запазват се | ✅ запазват се  | ✅ запазват се  |
| Неуспешни тестове                    | ✅ запазват се | ✅ запазват се  | ✅ запазват се  |
| Грешки при компилиране               | ✅ запазват се | ✅ запазват се  | ✅ запазват се  |
| Успешни тестове (подробни)           | ✅ запазват се | 🟡 свиват се    | 🟡 свиват се    |
| Рутинен изход (информационни логове) | 🟡 свива се    | 🟡 свива се     | ❌ премахва се  |
| Индикатори за напредък               | 🟡 свиват се   | ❌ премахват се | ❌ премахват се |
| Банер / ASCII графика                | 🟡 свива се    | ❌ премахва се  | ❌ премахва се  |

### Избиране на правилната интензивност

```
                  Катастрофална ли е загубата на контекст?
                  │
      ┌───────────┼───────────┐
      │           │           │
     ДА          НЕ        НЕ Е ЯСНО
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Колко критична   Първо опитайте `standard`
      │      е пропускателната (работи в 80% от
      │      способност?       случаите)
      │           │
      │      ┌────┴────┐
      │      │         │
      │    НИСКА     ВИСОКА
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Конфигуриране на интензивността

**За отделна комбинация** (в конфигурацията на комбинацията):

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

**Програмно**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) е
`CompressionEngine` и няма метод `updateConfig`. Вместо това актуализирайте конфигурацията на двигателя
чрез помощната функция на регистъра:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Проверяване на ефекта

Използвайте **проверката за верификация** (вижте по-долу), за да потвърдите, че филтърът ви е безопасен при избраната интензивност:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filters failed at aggressive intensity");
}
```

---

## Разработка на персонализирани филтри (v3.8.16+)

Директорията `engines/rtk/filters/` съдържа **49+ вградени JSON файла с филтри**. Можете да добавите свои собствени, за да компресирате изхода от персонализирани инструменти, които не се покриват от настройките по подразбиране.

### Схема на филтъра (Zod)

```ts
{
  "id": "string",                      // Задължително. Идентификатор на филтъра (kebab-case, напр. „python-traceback“)
  "label": "string",                   // Задължително. Четимо от хора име на филтъра
  "description": "string",             // Незадължително (по подразбиране: „“). Кратко описание на предназначението на филтъра
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Незадължително (0–100, по подразбиране: 50). Ред на изпълнение (по-висока стойност = по-рано)
  "match": {
    "commands": ["string"],            // Имена на команди за съпоставяне (напр. „python“, „pytest“)
    "patterns": ["string"],            // Шаблони с регулярни изрази за съпоставяне с изхода
    "outputTypes": ["string"]          // Разпознати класове на изхода (напр. „test-failure“)
  },
  "rules": {
    "stripAnsi": boolean,              // Незадължително (по подразбиране: false). Премахва ANSI кодовете за цветове
    "replace": [                       // Правила за търсене и замяна (по подразбиране: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Прекратява обработката при съвпадение с шаблон (по подразбиране: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Пропуска, ако този шаблон съвпада
      }
    ],
    "includePatterns": ["string"],     // Редове, които да бъдат запазени (шаблони с регулярни изрази, по подразбиране: [])
    "dropPatterns": ["string"],        // Редове, които да бъдат премахнати (шаблони с регулярни изрази, по подразбиране: [])
    "collapsePatterns": ["string"],    // Редове, които да бъдат сведени до еднократно срещане (по подразбиране: [])
    "deduplicate": boolean,            // Незадължително (по подразбиране: false). Премахва дублиращите се редове
    "truncateLineAt": number,          // Незадължително (по подразбиране: 0). Съкращава редовете до максимален брой знаци
    "maxLines": number,                // Незадължително (по подразбиране: 0). Твърдо ограничение за общия брой редове
    "headLines": number,               // Незадължително (по подразбиране: 20). Запазва първите N реда от съвпадащия изход
    "tailLines": number,               // Незадължително (по подразбиране: 20). Запазва последните N реда от съвпадащия изход
    "onEmpty": "string",               // Незадължително (по подразбиране: „“). Резервно съобщение, ако всички редове са филтрирани
    "filterStderr": boolean            // Незадължително (по подразбиране: false). Филтрира също изхода към stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Шаблони, които винаги трябва да бъдат запазвани (по подразбиране: [])
    "summaryPatterns": ["string"]      // Шаблони за последния обобщаващ ред (по подразбиране: [])
  },
  "tests": [                           // Вградени тестове за проверка (по подразбиране: [])
    {
      "name": "string",               // Задължително. Име на теста
      "input": "sample output",        // Задължително. Примерен входен текст
      "expected": "expected output",   // Задължително. Очакван компресиран изход
      "command": "optional command"    // Незадължително. Контекст на командата
    }
  ]
}
```

### Пример: филтър за Python traceback

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

### Зареждане на персонализирани филтри

Поставете файла на разпознато местоположение:

```
~/.omniroute/rtk/filters/my-filter.json     # На потребителско ниво
<project>/.rtk/filters/my-filter.json      # На ниво проект
```

Филтрите се зареждат автоматично при стартиране чрез `loadRtkFilters()` в `open-sse/services/compression/engines/rtk/filterLoader.ts`. Зареждащият модул открива филтри от:

- Вградения каталог: `open-sse/services/compression/engines/rtk/filters/`
- Потребителската директория: `~/.omniroute/rtk/filters/`
- Директорията на проекта: `<project>/.rtk/filters/`

За програмно зареждане на филтри:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Опции: customFiltersEnabled (зареждане на потребителски/проектни филтри, включено по подразбиране),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Валидиране

При зареждане филтрите се валидират спрямо Zod схемата. Филтър с неправилна структура няма да бъде зареден и ще бъде записана грешка в регистъра:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

За да валидирате всички инсталирани филтри, извикайте `runRtkFilterTests()`, която се експортира от `open-sse/services/compression/engines/rtk/verify.ts`.

### Добри практики

1. **Винаги включвайте `tests[]`** — те доказват, че филтърът ви работи, и предотвратяват регресии
2. **Използвайте `matchOutput` за ранно прекратяване** — ако един ред разказва цялата история, заменете целия блок
3. **Предпочитайте `keep` пред `strip`** — изричните правила „винаги запазвай“ са по-безопасни от „винаги премахвай“
4. **Тествайте и при трите нива на интензивност** — `minimal` не трябва да извършва промени, а `aggressive` все пак трябва да запазва грешките
5. **Използвайте полето `unless`** — защитете ранните прекратявания с „не се задействай, ако присъства X“

---

## Възстановяване на необработения изход и проверяващ шлюз

Когато RTK компресира изхода агресивно, можете да **възстановите оригиналния текст** за отстраняване на грешки, одит или повторно изпълнение.

### Как работи възстановяването на необработения изход

```
Оригинален изход (10K токена)
        │
        ▼
RTK компресия (с rawOutput.enabled=true)
        │
        ├─▶ Компресиран изход (2K токена)  ──▶ към LLM
        │
        └─▶ Оригинален изход (10K токена)  ──▶ съхранява се в БД
                                                  (свързан чрез request_id)
```

### Активиране на съхранението на необработения изход

**За всяка заявка** (в комбинираната конфигурация):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Ограничение от 1 МБ
    }
  }
}
```

**По подразбиране**: `rawOutput.enabled: false` (спестява място за съхранение).

### Разход за съхранение

| За заявка                  | Ограничение 1 МБ | Ограничение 10 МБ |
| -------------------------- | ---------------- | ----------------- |
| Среден компресиран изход   | ~5 КБ            | ~5 КБ             |
| Съхранен необработен изход | ~50-500 КБ       | ~500 КБ-5 МБ      |
| При 1000 заявки дневно     | 50-500 МБ/ден    | 500 МБ-5 ГБ/ден   |

> **Препоръка**: Активирайте необработения изход само за **сесии за отстраняване на грешки** или **одит чрез извадки**, а не постоянно.

### Възстановяване на оригинала

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId от статистиката за компресията
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` се връща в `CompressionStats.rtkRawOutputPointers[]` след компресията.
Вижте `open-sse/services/compression/engines/rtk/rawOutput.ts:102` за сигнатурата на функцията.

### Проверяващият шлюз

**Проверката на RTK филтрите** (`open-sse/services/compression/engines/rtk/verify.ts`) валидира всички филтри спрямо техните `tests[]` и гарантира правилно поведение и при трите нива на интензивност.

**Извикайте `runRtkFilterTests()`**, за да изпълните проверката:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Какво валидира**:

1. Всеки филтър се зарежда и преминава валидирането спрямо схемата
2. Всеки запис в `tests[]` генерира очаквания изход
3. Интензивността `minimal` не извършва промени (запазва оригинала и прилага само структурни филтри)
4. Интензивността `aggressive` запазва грешките, неуспешните тестове и стековите трасета
5. Компресираният изход никога не е по-голям от оригиналния вход

- Източник: `open-sse/services/compression/engines/rtk/` (63 файла, ~70 КБ)

- **Преди сливане на промяна във филтър** — винаги се уверявайте, че тестовете преминават успешно
- **След надграждане на RTK двигателя** — схемата може да се е променила
- **Периодично при наблюдение** — предпазва от отклонения в тестовите фикстури
- **При добавяне на ново семейство инструменти/команди** — доказва, че новият филтър работи

---

## Вижте също

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Пълен преглед на процеса за компресиране
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Регистър на механизмите и вградени механизми
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Персонализирани механизми, езикови пакети, съставни процеси
- Изходен код: `open-sse/services/compression/engines/rtk/` (63 файла, ~70KB)
