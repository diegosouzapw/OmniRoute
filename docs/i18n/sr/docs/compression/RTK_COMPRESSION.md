# RTK Compression (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK компресија је OmniRoute механизам за компресију излаза терминала и алата који узима у обзир команде. Дизајнирана је за сесије агената за програмирање, у којима највећи део раста контекста потиче од евиденција тестова, излаза изградње, сувишног излаза менаџера пакета, транскрипата љуске, Docker излаза, git излаза и трагова стека.

RTK може да се покреће директно помоћу `defaultMode: "rtk"` или као први корак у сложеном цевоводу, обично:

```txt
rtk -> caveman
```

Овај редослед најпре компримује бучан машински излаз, а затим омогућава Caveman-у да сажме преосталу прозу.

Изворни RTK наводи уштеду од `60-90%` за излаз команди. Пример сесије из његовог README документа смањује се са
`~118,000` стандардних токена на `~23,900` RTK токена, што представља уштеду од `79.7%` (`~80%`). OmniRoute користи
тај изворни просек за израчунавање сложене уштеде са Caveman компресијом улаза:

```txt
RTK просек:      80% уштеде
Caveman улаз:    46% уштеде
Сложено:         1 - (1 - 0.80) * (1 - 0.46) = 89.2% уштеде
Опсег:           1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Шта компримује

Уграђени каталог тренутно садржи 49 филтера у следећим категоријама:

| Категорија | Примери                                                       |
| ---------- | ------------------------------------------------------------- |
| `git`      | `git status`, `git branch`, `git diff`, `git log`             |
| `test`     | Vitest, Jest, Pytest, Playwright, Go тестови, Cargo тестови   |
| `build`    | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package`  | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`    | `ls`, `find`, `grep`, генеричке евиденције љуске              |
| `docker`   | `docker ps`, Docker евиденције                                |
| `infra`    | Terraform, OpenTofu, `systemctl status`                       |
| `generic`  | JSON излаз, трагови стека, резервна обрада генеричког излаза  |

Детектор у `open-sse/services/compression/engines/rtk/commandDetector.ts` класификује излаз
пре избора филтера. Филтери такође могу да се подударају према обрасцу команде или регуларном изразу излаза када класа
команде није довољна.

## Разрешавање филтера

RTK учитава филтере следећим редоследом:

1. Пројектни филтери из `.rtk/filters.toml` и `.rtk/filters.json`, само када су поуздани.
2. Глобални филтери из `DATA_DIR/rtk/filters.toml` и `DATA_DIR/rtk/filters.json`.
3. Уграђени филтери из `open-sse/services/compression/engines/rtk/filters/`.

У оквиру истог опсега, RTK TOML филтери шеме v1 имају предност у односу на OmniRoute JSON филтере. TOML
`match_command` изрази проверавају се пре подударања према типу команде, тако да увезени филтер специфичан за команду
може да замени шири филтер у том опсегу. Пројектни опсег и даље има предност у односу на глобални
опсег, без обзира на формат датотеке.

Пројектни филтери намерно захтевају проверу поверења јер regex филтери могу да промене начин на који се излаз алата
приказује агентима. Датотека пројектног филтера прихвата се када је испуњен један од следећих услова:

- `rtkConfig.trustProjectFilters` има вредност `true`.
- Подешено је `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` садржи одговарајући SHA-256 хеш датотеке пројектног филтера.

Пример датотеке поверења:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Хешеви су одвојени: `filtersSha256` потврђује поузданост датотеке `.rtk/filters.json`, док `filtersTomlSha256`
потврђује поузданост датотеке `.rtk/filters.toml`. Измена било које од ових датотека поништава само њен сопствени унос поверења. Глобалне датотеке
инсталира администратор и оне користе постојеће понашање поверења за глобалне филтере.

Прилагођени филтери могу бити један објекат филтера или низ објеката филтера. Неважећи прилагођени филтери се
прескачу и пријављују у дијагностици `/api/context/rtk/filters`. Неважећи уграђени филтери одмах изазивају грешку.

## Компатибилност са RTK TOML шемом v1

OmniRoute може да рашчлани, валидира, тестира и инсталира декларативне датотеке филтера које користе RTK TOML шему v1.
Подржана поља су `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` и угнежђени тестови `[[tests.<filter>]]`.
Непозната поља, неисправни или небезбедни регуларни изрази, истовремена правила за уклањање и задржавање, датотеке веће од
1 MiB и референце на непознате филтере се одбацују. Датотека чији угнежђени тестови не успеју може бити
валидирана ради прегледа, али се не може инсталирати нити учитати. Неуспеси при учитавању прилагођених датотека и даље
користе приступ fail-open: неисправна датотека се прескаче, а преостали филтери настављају да раде.

OmniRoute прима излаз алатке након што га је клијент већ забележио, па `filter_stderr = true`
не може да промени начин бележења процеса. Поље се прихвата као операција без дејства, а валидација враћа упозорење.
Ово је намерно описано као **компатибилност са RTK TOML шемом v1**, а не као потпуна компатибилност
са извршном датотеком RTK, hook механизмима љуске, имплементацијама команди у језику Rust или његовим распоредом складишта поверења.

Напредни RTK приказ контролне табле прихвата налепљени или отпремљени TOML. Валидација је само за читање.
Инсталација атомски уписује `DATA_DIR/rtk/filters.toml` са рестриктивним дозволама и освежава
активни каталог филтера без поновног покретања. Замена постојеће датотеке захтева изричиту потврду `overwrite`
и најпре креира `DATA_DIR/rtk/filters.toml.bak`.

## DSL филтера

Филтери користе JSON шему описану у документу [Формат правила компресије](./COMPRESSION_RULES_FORMAT.md).
Окружење за извршавање примењује ове фазе редом:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> одбаци/укључи линије
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Важна поља:

| Поље                         | Намена                                                             |
| ---------------------------- | ------------------------------------------------------------------ |
| `rules.stripAnsi`            | Уклањање терминалских секвенци боја/контроле пре упаривања         |
| `rules.filterStderr`         | Нормализовање уобичајених stderr префикса пре упаривања/филтрирања |
| `rules.replace`              | Примена уређених замена регуларним изразима                        |
| `rules.matchOutput`          | Враћање сажетог резимеа када се излаз подудара са познатим условом |
| `rules.matchOutput[].unless` | Прескакање пречице када је присутан образац грешке/неуспеха        |
| `rules.dropPatterns`         | Уклањање непотребних линија                                        |
| `rules.includePatterns`      | Давање предности линијама које омогућавају предузимање радњи       |
| `rules.collapsePatterns`     | Сажимање поновљених линија које се подударају                      |
| `rules.deduplicate`          | Укључивање по филтеру: сажимање узастопних дуплираних линија       |
| `rules.truncateLineAt`       | Скраћивање сваке линије уз очување Unicode знакова                 |
| `rules.onEmpty`              | Резервна порука ако су све линије филтриране                       |
| `tests[]`                    | Угнежђени примери које користи контролни механизам за верификацију |

Очекује се да уграђени филтери садрже угнежђене `tests[]` примере. Прилагођени филтери би такође требало да их садрже,
нарочито када се деле између пројеката.

## Дедупликација редова (два слоја)

RTK сажима дуплиране редове у два независна слоја:

1. **`deduplicate` по филтеру (опционо, подразумевано `false`).** Филтер може да постави `rules.deduplicate: true`
   како би сажимао узастопне дуплиране редове _унутар излаза који је тај филтер подударио_, пре скраћивања.
   Ово се извршава унутар `lineFilter.ts`. За застареле филтере аутоматски се омогућава када филтер дефинише
   `collapsePatterns`. Шема: `deduplicate: z.boolean().default(false)` у
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` на нивоу механизма (подразумевано `3`).** Након извршавања свих филтера, механизам сажима
   сваки низ од `>= deduplicateThreshold` идентичних узастопних редова у целом резултату
   (`deduplicateRepeatedLines`, примењено у `engines/rtk/index.ts`). Вредност се при
   нормализацији ограничава на 2–100.

Пролаз по филтеру извршава се први (унутар филтера), док се пролаз на нивоу механизма извршава последњи (над спојеним
излазом), тако да се ова два пролаза комбинују без двоструког бројања.

## Груписање редова (`enableGrouping`)

Када је `rtkConfig.enableGrouping` подешено на `true` (подразумевано `false`), RTK извршава додатни пролаз `groupSimilarLines`
над резултатом после дедупликације, који сажима низове _приближно еквивалентних_ (не идентичних на нивоу бајтова)
узастопних редова. `rtkConfig.groupingThreshold` (подразумевано `3`) представља минималну дужину низа која покреће
груписање. Ово је структурни пандан за `deduplicateThreshold`: дедупликација обрађује тачна понављања,
док груписање обрађује „исти облик са малим разликама“. Обе опције су део `rtkConfig` JSON-а
који се чува у табели `key_value` (погледајте одељак Конфигурација изнад), тако да подешавање остаје сачувано након поновних покретања.

## Уклањање коментара из кода (`stripCodeComments` / `preserveDocstrings`)

Када је `rtkConfig.applyToCodeBlocks` омогућено, RTK такође може да уклони коментаре из ограђених блокова кода:

- `stripCodeComments` (подразумевано `false`) — опционо. Када је `true`, RTK уклања коментаре из ограђених JavaScript
  и TypeScript блокова. Ова опција се раније читала, али никада није примењивана, па подразумевана вредност остаје
  „задржи“ како би се избегла неприметна промена у продукцији.
- `preserveDocstrings` (подразумевано `true`) — приликом уклањања коментара задржавају се JSDoc/`/** … */` блоковски коментари
  (они садрже документацију API-ја која вреди више од бајтова које заузима). Подесите на `false` да бисте
  уклонили и њих.

Уклањање коментара имплементирано је у `open-sse/services/compression/engines/rtk/codeStripper.ts`. Користи
**TypeScript парсер** (а не регуларни израз), тако да се литерали ниски, шаблона и регуларних израза никада погрешно
не протумаче као коментари, а поступак се у потпуности прекида када се открије JSX (како коментари у JSX контејнерима израза
никада не би били оштећени). Уклањање коментара тренутно се примењује **само на JavaScript и TypeScript** — други
језици у скупу `CodeLanguage` алатке за уклањање (Python, Rust, Go, Ruby, Java) имају сажимање празних редова и
размака, али без уклањања коментара. Обрађивање блока из којег су уклоњени коментари означава се са `rtk:code-strip` у
`rulesApplied`.

> **Напомена — GCF / табеларно кодирање је засебан механизам.** RTK **не** садржи „GCF“
> (Graph Compact Format) табеларни/колонарни JSON енкодер. Тај енкодер — који је заменио старији
> `omni-tabular` енкодер — налази се у механизму **headroom**
> (`open-sse/services/compression/engines/headroom/`, док је уврштени кодек у
> `headroom/gcf/`). Он није повезан са овде документованим RTK процесом филтрирања.

## Конфигурација

Глобална подешавања су доступна преко `/api/settings/compression`. Подешавања специфична за RTK такође су
доступна преко `/api/context/rtk/config`.

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

`enabledFilters` и `disabledFilters` користе идентификаторе филтера, на пример `test-vitest` или `git-diff`.

Комплетна структура `rtkConfig` дефинисана је помоћу `RtkConfig` / `DEFAULT_RTK_CONFIG` у
`open-sse/services/compression/types.ts`. Цео објекат се чува као једна JSON вредност у
SQLite табели `key_value` под `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) и нормализује се приликом читања помоћу `normalizeRtkConfig`. Стога се свако поље у наставку
— укључујући `enableGrouping`, `groupingThreshold`, `stripCodeComments` и `preserveDocstrings` —
чува у истом складишту и остаје доступно након поновног покретања.

| Кључ                   | Подразумевано | Намена                                                                                            |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`           | На нивоу механизма: минималан број узастопних идентичних редова за сажимање (ограничено на 2–100) |
| `enableGrouping`       | `false`       | Опционо: сажима низове готово еквивалентних узастопних редова                                     |
| `groupingThreshold`    | `3`           | Минималан број узастопних сличних редова који активира груписање                                  |
| `stripCodeComments`    | `false`       | Опционо: уклања коментаре из ограђених блокова кода (захтева `applyToCodeBlocks`)                 |
| `preserveDocstrings`   | `true`        | При уклањању коментара задржава JSDoc/`/** … */` блокове                                          |

## API

| Рута                               | Метод | Намена                                             |
| ---------------------------------- | ----- | -------------------------------------------------- |
| `/api/context/rtk/config`          | GET   | Читање RTK конфигурације                           |
| `/api/context/rtk/config`          | PUT   | Ажурирање RTK конфигурације                        |
| `/api/context/rtk/filters`         | GET   | Навођење каталога филтера и дијагностике учитавања |
| `/api/context/rtk/import`          | POST  | Провера или инсталирање RTK TOML датотека шеме v1  |
| `/api/context/rtk/test`            | POST  | Преглед RTK компресије за један текстуални садржај |
| `/api/context/rtk/raw-output/[id]` | GET   | Читање задржаног редигованог необрађеног излаза    |
| `/api/compression/preview`         | POST  | Преглед било ког режима компресије                 |

Садржај RTK захтева за тестирање:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Садржај захтева за преглед компресије:

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

Руте за управљање захтевају аутентификацију за управљање контролном таблом или одговарајућу политику API кључа.

Садржај захтева за проверу RTK TOML датотеке:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Користите `"action": "install"` да бисте проверену датотеку инсталирали глобално. Додајте `"overwrite": true` тек
након прегледа и потврде замене постојеће глобалне датотеке.

## Опоравак сировог излаза

RTK обично враћа само компримовани текст. За отклањање грешака, `rawOutputRetention` може да задржи редиговани
сирови излаз:

| Вредност   | Понашање                                                              |
| ---------- | --------------------------------------------------------------------- |
| `never`    | Не задржава сирови излаз                                              |
| `failures` | Задржава само излаз који вероватно указује на грешку                  |
| `always`   | Задржава сваки сирови излаз компримован помоћу RTK-а, након редакције |

Задржане датотеке се уписују у:

```txt
DATA_DIR/rtk/raw-output/
```

Тајне се редигују пре чувања, укључујући уобичајене bearer токене, API кључеве, Slack токене,
AWS приступне кључеве и вредности у облику доделе `token=...`, `secret=...`, `password=...`. Аналитика
чува само идентификатор показивача, величину и хеш метаподатке.

## Контролна провера

Циљана контролна провера покреће уграђене инлајн тестове филтера без позивања спољних команди преко љуске:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Шира RTK контролна провера је:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Покрените широку контролну проверу компресије пре издавања:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Проширивање RTK-а

1. Додајте или ажурирајте JSON датотеку филтера.
2. Укључите најмање један `tests[]` пример који доказује важно понашање.
3. Додајте тестни ресурс у `tests/unit/compression/fixtures/rtk/` за нове породице команди.
4. Додајте покривеност откривања команди када уводите нову класу излаза.
5. Покрените циљану и широку RTK контролну проверу.
6. Ако је филтер локалан за пројекат, урежите `.rtk/filters.json` и освежите `.rtk/trust.json` тек након прегледа.

---

## Нивои интензитета (v3.8.16+)

RTK подржава **3 нивоа интензитета** који успостављају равнотежу између **агресивности компресије** и **безбедности**. Ниво се подешава преко `config.intensity` у конфигурацији механизма.

### Три нивоа

| Ниво                       | Праг скраћивања     | Уштеда токена | Ризик       | Најпогодније за                    |
| -------------------------- | ------------------- | ------------- | ----------- | ---------------------------------- |
| `minimal`                  | 24 реда по одељку   | ~20-40%       | Веома низак | Продукцију са критичним контекстом |
| `standard` (подразумевано) | 24 реда по одељку   | ~50-70%       | Низак       | Свакодневне сесије програмирања    |
| `aggressive`               | 16 редова по одељку | ~70-90%       | Средњи      | Дуге сесије, максималну уштеду     |

### Где долази до скраћивања

Праг скраћивања утиче на `lineFilter.ts`:

```ts
// Из open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Чувају се и **почетак** и **крај** сваког одељка; садржај у средини се одбацује када се активира скраћивање.

### Шта остаје, а шта се одсеца

| Садржај                      | minimal     | standard    | aggressive  |
| ---------------------------- | ----------- | ----------- | ----------- |
| Грешке / трагови стека       | ✅ сачувано | ✅ сачувано | ✅ сачувано |
| Неуспешни тестови            | ✅ сачувано | ✅ сачувано | ✅ сачувано |
| Грешке при изградњи          | ✅ сачувано | ✅ сачувано | ✅ сачувано |
| Успешни тестови (опширни)    | ✅ сачувано | 🟡 сажето   | 🟡 сажето   |
| Рутински излаз (инфо записи) | 🟡 сажето   | 🟡 сажето   | ❌ одбачено |
| Траке напретка               | 🟡 сажето   | ❌ одбачено | ❌ одбачено |
| Банер / ASCII графика        | 🟡 сажето   | ❌ одбачено | ❌ одбачено |

### Избор одговарајућег интензитета

```
                  Да ли је губитак контекста катастрофалан?
                  │
      ┌───────────┼───────────┐
      │           │           │
     ДА          НЕ       НИСТЕ СИГУРНИ
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Колико је       Прво испробајте `standard`
      │      проток критичан? (ради у 80% случајева)
      │           │
      │      ┌────┴────┐
      │      │         │
      │    НИЗАК      ВИСОК
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Конфигурисање интензитета

**По комбинацији** (у конфигурацији комбинације):

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

**Програмски**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) је
`CompressionEngine` и нема метод `updateConfig`. Уместо тога, ажурирајте конфигурацију механизма
преко помоћне функције регистра:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Провера ефекта

Користите **контролну проверу** (погледајте испод) да бисте потврдили да је ваш филтер безбедан при изабраном интензитету:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filters failed at aggressive intensity");
}
```

---

## Развој прилагођених филтера (v3.8.16+)

Директоријум `engines/rtk/filters/` садржи **49+ уграђених JSON датотека филтера**. Можете додати сопствене филтере како бисте компресовали излаз прилагођених алата који нису обухваћени подразумеваним филтерима.

### Шема филтера (Zod)

```ts
{
  "id": "string",                      // Обавезно. Идентификатор филтера (kebab-case, нпр. „python-traceback“)
  "label": "string",                   // Обавезно. Назив филтера читљив људима
  "description": "string",             // Опционо (подразумевано: ""). Кратак опис онога што филтер ради
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Опционо (0–100, подразумевано: 50). Редослед извршавања (веће = прво)
  "match": {
    "commands": ["string"],            // Називи команди за подударање (нпр. „python“, „pytest“)
    "patterns": ["string"],            // Regex обрасци за подударање са излазом
    "outputTypes": ["string"]          // Откривене класе излаза (нпр. „test-failure“)
  },
  "rules": {
    "stripAnsi": boolean,              // Опционо (подразумевано: false). Уклања ANSI кодове боја
    "replace": [                       // Правила за проналажење и замену (подразумевано: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Прекида обраду при подударању са обрасцем (подразумевано: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Прескочи ако се овај образац подудара
      }
    ],
    "includePatterns": ["string"],     // Редови које треба задржати (regex обрасци, подразумевано: [])
    "dropPatterns": ["string"],        // Редови које треба уклонити (regex обрасци, подразумевано: [])
    "collapsePatterns": ["string"],    // Редови које треба сажети на једно појављивање (подразумевано: [])
    "deduplicate": boolean,            // Опционо (подразумевано: false). Уклања дуплиране редове
    "truncateLineAt": number,          // Опционо (подразумевано: 0). Скраћује редове на максималан број знакова
    "maxLines": number,                // Опционо (подразумевано: 0). Строго ограничење укупног броја редова
    "headLines": number,               // Опционо (подразумевано: 20). Задржава првих N редова подудареног излаза
    "tailLines": number,               // Опционо (подразумевано: 20). Задржава последњих N редова подудареног излаза
    "onEmpty": "string",               // Опционо (подразумевано: ""). Резервна порука ако су сви редови филтрирани
    "filterStderr": boolean            // Опционо (подразумевано: false). Филтрира и stderr излаз
  },
  "preserve": {
    "errorPatterns": ["string"],       // Обрасци који увек морају бити сачувани (подразумевано: [])
    "summaryPatterns": ["string"]      // Обрасци за завршни ред сажетка (подразумевано: [])
  },
  "tests": [                           // Уграђени тестови за проверу (подразумевано: [])
    {
      "name": "string",               // Обавезно. Назив теста
      "input": "sample output",        // Обавезно. Пример улазног текста
      "expected": "expected output",   // Обавезно. Очекивани компресовани излаз
      "command": "optional command"    // Опционо. Контекст команде
    }
  ]
}
```

### Пример: филтер Python праћења стека

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

### Учитавање прилагођених филтера

Поставите датотеку на неку од препознатих локација:

```
~/.omniroute/rtk/filters/my-filter.json     # На нивоу корисника
<project>/.rtk/filters/my-filter.json      # На нивоу пројекта
```

Филтери се аутоматски учитавају при покретању помоћу `loadRtkFilters()` у `open-sse/services/compression/engines/rtk/filterLoader.ts`. Учитавач проналази филтере из следећих извора:

- Уграђени каталог: `open-sse/services/compression/engines/rtk/filters/`
- Кориснички директоријум: `~/.omniroute/rtk/filters/`
- Директоријум пројекта: `<project>/.rtk/filters/`

Да бисте програмски учитали филтере:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Опције: customFiltersEnabled (учитавање корисничких/пројектних филтера, подразумевано укључено),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Валидација

Филтери се приликом учитавања проверавају у односу на Zod шему. Филтер са неисправном структуром неће бити учитан и биће забележена грешка:

```
RTK_FILTER_LOADER: валидација филтера „my-filter“ није успела:
  - rules.replace.0.pattern: Неважећи regex
  - match.commands: не сме бити празно
```

Да бисте проверили све инсталиране филтере, позовите `runRtkFilterTests()`, који се извози из `open-sse/services/compression/engines/rtk/verify.ts`.

### Најбоље праксе

1. **Увек укључите `tests[]`** — они доказују да ваш филтер ради и спречавају регресије
2. **Користите `matchOutput` за кратке спојеве** — ако један ред преноси целу поруку, замените њиме цео блок
3. **Дајте предност `keep` у односу на `strip`** — експлицитна правила „увек сачувај“ безбеднија су од правила „увек уклони“
4. **Тестирајте на сва 3 нивоа интензитета** — `minimal` не би требало ништа да мења, док `aggressive` и даље треба да сачува грешке
5. **Користите поље `unless`** — заштитите кратке спојеве условом „не активирај ако је X присутно“

---

## Опоравак сировог излаза и контролна капија за верификацију

Када RTK агресивно компресује излаз, можете **опоравити оригинални текст** ради отклањања грешака, ревизије или поновног извршавања.

### Како функционише опоравак сировог излаза

```
Оригинални излаз (10K токена)
        │
        ▼
RTK компресија (са rawOutput.enabled=true)
        │
        ├─▶ Компресовани излаз (2K токена)  ──▶ ка LLM-у
        │
        └─▶ Оригинални излаз (10K токена)   ──▶ чува се у бази података
                                                  (повезан преко request_id)
```

### Омогућавање чувања сировог излаза

**По захтеву** (у комбинованој конфигурацији):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Ограничење од 1MB
    }
  }
}
```

**Подразумевано**: `rawOutput.enabled: false` (штеди простор за складиштење).

### Трошак складиштења

| По захтеву                  | Ограничење од 1MB | Ограничење од 10MB |
| --------------------------- | ----------------- | ------------------ |
| Просечан компресовани излаз | ~5KB              | ~5KB               |
| Сачувани сирови излаз       | ~50-500KB         | ~500KB-5MB         |
| Са 1000 захтева дневно      | 50-500MB/дан      | 500MB-5GB/дан      |

> **Препорука**: Омогућите сирови излаз само за **сесије отклањања грешака** или **ревизију узорковањем**, а не непрекидно.

### Опоравак оригинала

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId из статистике компресије
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` се враћа у `CompressionStats.rtkRawOutputPointers[]` након компресије.
Погледајте `open-sse/services/compression/engines/rtk/rawOutput.ts:102` за потпис функције.

### Контролна капија за верификацију

**Верификација RTK филтера** (`open-sse/services/compression/engines/rtk/verify.ts`) проверава све филтере у односу на њихове `tests[]` и осигурава исправно понашање на сва 3 нивоа интензитета.

**Позовите `runRtkFilterTests()`** да бисте покренули верификацију:

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

**Шта се проверава**:

1. Сваки филтер се учитава и пролази валидацију шеме
2. Свака ставка у `tests[]` производи очекивани излаз
3. Интензитет `minimal` не обавља никакве измене (чува оригинал и примењује само структурне филтере)
4. Интензитет `aggressive` чува грешке, неуспешне тестове и трагове стека
5. Компресовани излаз никада није већи од оригиналног улаза

- Извор: `open-sse/services/compression/engines/rtk/` (63 датотеке, ~70KB)

- **Пре спајања измене филтера** — увек се уверите да тестови пролазе
- **Након надоградње RTK механизма** — шема је можда промењена
- **Периодично током надгледања** — штити од одступања у тестним подацима
- **При додавању нове породице алатки/команди** — доказује да нови филтер функционише

---

## Такође погледајте

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Комплетан преглед процеса компресије
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Регистар механизама и уграђени механизми
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Прилагођени механизми, језички пакети, наслагани процеси
- Извор: `open-sse/services/compression/engines/rtk/` (63 датотеке, ~70KB)
