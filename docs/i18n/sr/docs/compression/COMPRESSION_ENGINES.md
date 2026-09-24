# Compression Engines (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute компресија је изграђена око уговора механизама. Режим може директно да покрене један механизам
(`caveman` или `rtk`) или детерминистички сложени ток који редом извршава више механизама.

## Režimi

| Režim        | Putanja do mehanizma                                                                              | Predviđeni ulaz                                   |
| ------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `off`        | none                                                                                              | Tačno očuvanje upita                              |
| `lite`       | Caveman lite helpers                                                                              | Niskorizično uvek-uključeno čišćenje              |
| `standard`   | Caveman                                                                                           | Kondenzacija upita prirodnog jezika               |
| `aggressive` | Caveman + history/tool summarizers                                                                | Duge sesije ćaskanja                              |
| `ultra`      | Caveman + pruning helpers                                                                         | Oporavak od ograničenja konteksta                 |
| `rtk`        | RTK                                                                                               | Izlaz terminala, shell-a, build-a, test-a i git-a |
| `omniglyph`  | OmniGlyph                                                                                         | Kontekst kao slika na izvornoj provajderskoj žici |
| `stacked`    | Pipeline. Podrazumevana vrednost zahteva je `session-dedup -> lite`. `rtk -> caveman` je opcioni. | Mešani logovi alata i proza, maksimalna ušteda    |

### OmniGlyph profili kompresije

Mehanizam `omniglyph` (paket `omniglyph`, 1.4.0+) prihvata imenovani semantički profil, postavljen globalno putem `omniglyph.profile` u podešavanjima kompresije ili po koraku kroz konfiguraciju koraka složenog pipeline-a:

| Profil        | Granica                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Podrazumevano. Politika koju su merili objavljeni računi — sistem slika, dokumentacija alata i gusta istorija |
| `balanced`    | Čuva živo stanje nativnim, štiti poslednjih 8 okretaja, sažima stariju zatvorenu istoriju                     |
| `coding-safe` | Čuva autoritet, šeme alata i izlaz alata uživo nativnim, štiti poslednjih 12 okretaja                         |
| `passthrough` | Ruta bez transformacije; mehanizam se preskače                                                                |

Profil je **plafon, a ne pod**: `mergeCompressionProfileOptions` u paketu odbija da dozvoli pozivaocu da premosti ponovno otvaranje gubljenja podataka koje je profil zatvorio, tako da `preserveSystemPrompt: false` po koraku ne može ponovo omogućiti kompresiju sistema pod `coding-safe`.

Mereno na ovoj bazi koda: `coding-safe` i `balanced` podižu `minCompressChars` na svoj maksimum i čuvaju sistem, šeme alata i rezultate alata nativnim, tako da sesija koja još nije akumulirala istoriju staje na `below_min_chars` i mehanizam ne transformiše ništa. Zato je podrazumevani profil `aggressive`, a ne najsigurniji.

Paket rešava sopstveni opseg modela i profil iz svoje konfiguracije okruženja. OmniRoute nikada ne delegira odluku: adapter fiksira model gate na najrestriktivniji opseg paketa, tako da podešavanja host okruženja mogu samo suziti listu dozvoljenih, nikada je ne proširiti izvan OmniRoute-ovih izmerenih računa.

## Регистар механизама

Регистар се налази у `open-sse/services/compression/engines/registry.ts`. Механизми излажу заједнички
уговор:

- `id`: стабилни идентификатор механизма, као што су `caveman` или `rtk`
- `apply(text, config)`: застарела путања извршавања коју користе наслагани токови обраде
- `compress(input, config)`: примарна путања извршавања која враћа текст + статистику
- `getConfigSchema()`: враћа облик важеће конфигурације налик JSON Schema шеми
- `validateConfig(config)`: враћа `{ valid, errors[] }`

Регистрација користи `registerCompressionEngine(engine)` (или `registerEngine` за напредне случајеве),
који пре прихватања позива `assertValidEngine()` и `validateConfig(defaultConfig)`.
Користите `unregisterCompressionEngine(id)` да бисте уклонили механизам током извршавања.

`strategySelector.ts` региструје уграђене механизме пре покретања компресије. То омогућава да преглед,
компресија током извршавања, наслагани режим, тестови и будући механизми користе исту путању извршавања.

### Компресија MCP описа (повезано)

Посебан регистар компресује метаподатке описа MCP алата на нивоу регистра — погледајте
`open-sse/mcp-server/descriptionCompressor.ts` и [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Он поново користи
Caveman правила, али ради над метаподацима алата, а не над садржајем захтева.

### Додатни уграђени механизми

Поред Caveman, RTK и LLMLingua-2, регистар садржи неколико специјализованих механизама без губитака /
структурних механизама (које користе наслагани токови обраде, експериментално окружење и тестови):

| Механизам     | Идентификатор   | Шта ради                                                                                                                                                                             |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): замењује велике непрекидне блокове текста референцама адресираним садржајем, тако да се поновљени/велики блокови шаљу једном, а затим референцирају. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): табеларно сажимање без губитака хомогених садржаја JSON низова у колонски облик `[N rows]`.                                                                  |
| ionizer       | `ionizer`       | Узорковање редова са почетка/средине/краја за веома велике хомогене блокове, при чему се изостављена средина чува као CCR референца адресирана садржајем.                            |
| session-dedup | `session-dedup` | Дедупликација између интеракција адресирана садржајем (инспирисана TokenMizer-ом): изоставља текст који је већ виђен у ранијим интеракцијама исте сесије.                            |

**Упутство за CCR протокол преузимања (#8033):** када CCR први пут замени ≥1 блок у
захтеву, механизам додаје на почетак једну идемпотентну `system` поруку (која почиње
сентинелом `[CCR protocol]`) која позиваоцу објашњава уговор ознака → алат: шта значи
ознака `[CCR retrieve hash=<24hex> chars=N]`, да хеш мора бити копиран дословно
(сва 24 хексадецимална знака — погрешно копирани хешеви су вероватни узрок грешака
„block not found“), као и да ознака `[dedup:ref sha=...]` значи „погледај историју“, а не
„позови алат“. Напомена се убацује **само када оглашени `tools[]` позиваоца доказује да он
заиста може да приступи `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` у
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — обичан
OpenAI-компатибилан позивалац без тог алата никада не добија упутство да позове нешто
чему не може да приступи. Идемпотентност се обезбеђује претраживањем историје порука ради проналажења сентинела
пре убацивања, тако да захтеви са више интеракција (који поново репродукују претходне поруке) не додају
напомену по једном за сваку интеракцију.

## Caveman

Caveman режим се фокусира на семантичко сажимање уобичајеног прозног текста:

- чува блокове кода, URL адресе, JSON, путање и структуриране податке
- уклања сувишан текст, ограђивање, поновљени контекст и опширне везне формулације
- подржава пакете правила за датотеке прилагођене језику у `open-sse/services/compression/rules/`
- остаје доступан преко старијих режима `standard`, `aggressive` и `ultra`

Ова опција се на контролној табли налази под `Dashboard -> Context & Cache -> Caveman`.

Узводни Caveman пројекат наводи `~75%` мање излазних токена, просечну уштеду излаза од `65%` у тестовима
са опсегом од `22-87%`, као и алатку за компресију улаза од `~46%`. OmniRoute користи Caveman број за
улазну страну приликом документовања комбинованих уштеда упита/контекста; Caveman излазни режим остаје
засебна функција понашања одговора.

## RTK

RTK режим се фокусира на излаз команди и алата:

- открива класе излаза као што су `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go тестови, TypeScript/Vite/Webpack изградње, ESLint, npm провере/инсталације, Docker евиденције,
  `find`/`grep` у љусци, стек трагови и генеричке евиденције
- примењује 49 JSON филтера из `open-sse/services/compression/engines/rtk/filters/`
- подржава декларативни цевовод у RTK стилу: уклањање ANSI секвенци, замену, кратко спајање при подударању излаза,
  уклањање/задржавање редова, скраћивање по реду, скраћивање почетка/краја/максималног броја редова и резервни резултат за празан излаз
- подржава пројектне филтере условљене поверењем у `.rtk/filters.json` и глобалне филтере у
  `DATA_DIR/rtk/filters.json`
- уклања ANSI секвенце, шум напретка, поновљене редове и некористан шаблонски текст
- чува грешке које захтевају радњу, упозорења, сажетке, измењене датотеке и завршни контекст
- опционо може да задржи редиговани сирови излаз ради опоравка/отклањања грешака преко аутентификованих управљачких
  рута

Ова опција се на контролној табли налази под `Dashboard -> Context & Cache -> RTK`.

Оперативни детаљи о прилагођеним филтерима, поверењу, верификацији и опоравку сировог излаза налазе се у
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Узводни RTK пројекат наводи уштеду од `60-90%` за компресију излаза команди. Пример из његовог README документа приказује
30-минутну Claude Code сесију која се смањује са `~118,000` токена на `~23,900`, односно уштеду од `79.7%`.

## LLMLingua-2 (Семантичко проређивање)

LLMLingua-2 режим обавља **семантичко проређивање токена** у прозном тексту помоћу малог ONNX
класификатора токена, допуњујући механизме Caveman и RTK засноване на правилима:

- компримује прозни текст само у несистемским порукама; ограђени блокови кода и друге очуване
  конструкције никада се не мењају
- покреће позадински систем `@atjsh/llmlingua-2` (ONNX преко `@huggingface/transformers`) у
  радној нити, тако да закључивање модела никада не блокира петљу догађаја захтева
- може се **комбиновати** (`stackPriority` 35): у комбинованом цевоводу покреће се после
  структурних механизама (CCR, session-dedup, headroom, Caveman), али пре `ultra`, пошто је
  семантичко проређивање најефикасније над текстом који је већ структурно компримован — нпр.
  `rtk -> caveman -> llmlingua`
- **наставља рад без компресије при било којој грешци** (недостајуће опционе зависности, покретање радне нити, учитавање модела, закључивање
  или истек времена) → оригинални текст се враћа непромењен, никада грешка

Локација механизма: `open-sse/services/compression/engines/llmlingua/`. Ова опција се на контролној табли
налази под `Dashboard -> Context & Cache -> LLMLingua`.

### Модели

Подразумевани модел је **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
брз). Прецизнији модел **BERT-base** (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) доступан је преко поља `model` у конфигурацији механизма. `@huggingface/transformers`
лењо преузима изабрани модел са HuggingFace Hub-а у
`${DATA_DIR}/models/llmlingua` при првом позиву (`modelStore.ts`); конфигурационо
поље `modelPath` уместо тога упућује на локалну копију (за офлајн / изоловане инсталације).

### Опционе зависности и инсталација на захтев

Изостављиви стек вршњачких зависности за LLMLingua окружење је **опционалан**. Два пакета су декларисана као
`optionalDependencies` у `package.json` и остављена су **изван** продукционе изградње
(`scripts/build/prepublish.ts` их не пакује):

| Пакет                | Верзија (фиксирана) | Напомене                                           |
| -------------------- | ------------------- | -------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`             | Улазни пакет; декларише остале као вршњачке пакете |
| `js-tiktoken`        | `^1.0.20`           | Токенизатор                                        |

`@huggingface/transformers` је фиксиран на `^4.2.0` (дели се са путањом локалних угнежђивања и
такође се укључује у самостални пакет); `@atjsh/llmlingua-2@2.0.5` га наводи као вршњачку зависност са
`"^3.5.2 || ^4.0.0"`, па су подржани и Transformers.js v3 и v4. Од верзије 2.0.4,
`@atjsh/llmlingua-2` више не захтева `@tensorflow/tfjs`, чиме је из SLM стека уклоњен највећи појединачни
чинилац (TensorFlow.js). Само су два горенаведена пакета изостављиве SLM
вршњачке зависности. Стандардни `npm install` (развојно окружење) аутоматски инсталира опциони стек осим ако су опционе
зависности изостављене.

**Зашто на захтев:** пакет објављен на npm-у, самостални пакет и Docker слика
испоручују се **без** ових зависности како би остали мали. Када оне недостају, провера
зависности радне нити (проба разрешавања `@atjsh/llmlingua-2` у `worker.ts`) не успева и механизам
**тихо наставља рад без компресије** — избор LLMLingua режима не производи ефекат (текст се враћа непромењен, без
евидентиране грешке). Да бисте га активирали у окружењу са изостављеним зависностима, инсталирајте опциони стек:

```bash
# фиксирајте на верзије декларисане у package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Уклањање `@tensorflow/tfjs` (2.0.4+) елиминише раније доминантан чинилац од ~800 MB
— преостали простор заузимају извршна окружења transformers.js + onnxruntime-node,
као и TinyBERT модел (~57 MB) који се преузима при првој употреби (не преко npm-а).

За свако окружење:

- **Развој / `npm install`** — инсталира се аутоматски, осим ако сте проследили `--omit=optional`
  (или `--no-optional`). Није потребна никаква радња.
- **Глобални npm (`npm i -g omniroute`) / самостална инсталација** — покрените горњу команду за инсталацију унутар
  директоријума инсталираног пакета или га поново инсталирајте без изостављања опционих зависности.
- **Docker** — додајте команду за инсталацију у слој изведене слике; објављена слика
  је намерно минимална.
- **VPS (PM2)** — инсталирајте у `node_modules` апликације, а затим поново покрените процес како би
  радник поново проверио услов.
- **Необрађени Next самостални пакет (`npm run build` → `.build/next/standalone/server.js`)** — самостално
  праћење не укључује НИ радника НИ опционе зависности, па механизам неприметно прелази у режим пропуштања.
  `scripts/build/colocate-standalone.mjs` поново примењује оба (esbuild радника +
  затварање опционих зависности у самосталном стаблу); аутоматски се покреће преко
  npm `postbuild` закачке након сваке изградње. Идемпотентан је и наставља без грешке када зависности недостају.

**Проверите да ли је активан:** када је изабран LLMLingua, стварни прозни текст се заиста сажима (механизам
престаје да прелази у режим пропуштања), а први захтев покреће преузимање модела у
`${DATA_DIR}/models/llmlingua`. Услов намерно проверава само `@atjsh/llmlingua-2` —
остали равноправни пакети су искључиво ESM и `require.resolve` за њих изазива грешку чак и када су присутни — па
радник и даље прелази у режим пропуштања ако било који равноправни пакет заиста недостаје у тренутку извршавања `import()`.

## Наслагани цевоводи

Наслагани режим извршава кораке цевовода редом. Подразумевани редослед је:

```txt
rtk -> caveman
```

Користите ово за сесије агента за кодирање у којима упит комбинује излаз команде са текстом који је написао човек или асистент. RTK прво смањује опширне евиденције алата, а затим Caveman компресује преостали природни језик.

Кораци цевовода конфигуришу се помоћу `stackedPipeline` у подешавањима компресије или путем комбинација компресије.

Када оба механизма смањују исти одговарајући садржај, уштеде се комбинују:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP филтер стабла приступачности

MCP паметни филтер стабла приступачности представља слој компресије након извршавања који се примењује на MCP **резултате алата**, а не на упите или контекст. Намењен је опширним садржајима стабла приступачности и снимцима прегледача које враћају алати као што су Playwright, computer-use и MCP сервери за аутоматизацију прегледача.

### Шта ради

1. **Уклањање шума** — уклања празне опште/текстуалне ставке (`- generic:`, `- text: ""`)
2. **Сажимање суседних ставки** — када постоји ≥ `collapseThreshold` (подразумевано 30) узастопних редова са структурним понављањима, сажима их на првих `collapseKeepHead` (подразумевано 10) редова + сажетак броја + последњих `collapseKeepTail` (подразумевано 5) редова
3. **Очување референци** — `[ref=eXX]` сидра која захтевају Playwright/computer-use никада се не мењају
4. **Принудно скраћивање** — ако текст након сажимања и даље премашује `maxTextChars` (подразумевано 50.000), скраћује га уз навигациони савет како би агент могао да настави са радом

### Локација механизма

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← улазна тачка smartFilterText()
  collapseRepeated.ts ← алгоритам сажимања суседних ставки
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Конфигурација

Контролише се помоћу `compression.mcpAccessibility` у глобалним подешавањима (миграција 056). Подразумевана конфигурација:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Филтер се примењује само на садржаје резултата алата чији је `type` једнак `"text"` и чија дужина премашује `minLengthToProcess`. Не утиче на компресију упита нити на садржаје захтева.

### Очекиване уштеде

60–80% за резултате алата који садрже снимке прегледача, у зависности од сложености странице. Алгоритам сажимања има сложеност O(n) у односу на број редова и додаје занемарљиво кашњење.

### Овај филтер у односу на горенаведене механизме компресије

| Аспект           | Caveman / RTK / наслагани режим | MCP филтер приступачности              |
| ---------------- | ------------------------------- | -------------------------------------- |
| Циљ              | Упити захтева / контекст        | MCP резултати алата                    |
| Окидач           | Подешавање режима компресије    | `compression.mcpAccessibility.enabled` |
| Опсег            | Све SSE поруке                  | Само резултати алата                   |
| Референтна сидра | Није применљиво                 | Безусловно се чувају                   |

---

## Комбинације компресије

Комбинације компресије су именовани профили компресије који се могу доделити комбинацијама рутирања:

- `compression_combos`: чува режим, цевовод, RTK конфигурацију, језичку конфигурацију и ознаку подразумеване вредности
- `compression_combo_assignments`: мапира комбинацију компресије на комбинацију рутирања
- интеграција током извршавања разрешава додељену комбинацију компресије пре генеричких замена за комбинације
- аналитика укључује `compression_combo_id` и `engine`

Локација на контролној табли: `Dashboard -> Context & Cache -> Compression Combos`.

## Површина API-ја

| Рута                                   | Намена                                                                     |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `/api/settings/compression`            | Глобална подешавања компресије (укључује `mcpAccessibility` конфигурацију) |
| `/api/compression/preview`             | Преглед било ког режима компресије                                         |
| `/api/compression/language-packs`      | Листа доступних Caveman језичких пакета                                    |
| `/api/context/caveman/config`          | Алијас за Caveman подешавања                                               |
| `/api/context/rtk/config`              | RTK подразумеване вредности и подешавања                                   |
| `/api/context/rtk/filters`             | Каталог RTK филтера                                                        |
| `/api/context/rtk/test`                | RTK крајња тачка за преглед/тестирање                                      |
| `/api/context/rtk/raw-output/[id]`     | Аутентификовани опоравак редигованог сировог излаза                        |
| `/api/context/combos`                  | CRUD за комбинације компресије                                             |
| `/api/context/combos/[id]/assignments` | CRUD за доделе комбинација рутирања                                        |
| `/api/context/analytics`               | Алијас за аналитику компресије                                             |

Руте за управљање захтевају аутентификацију за управљање или провере смерница за API кључеве.

## MCP алати

Компресија пружа пет MCP алата:

| Алат                                | Опсег               | Намена                                  |
| ----------------------------------- | ------------------- | --------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Подешавања, аналитика, статистика кеша  |
| `omniroute_compression_configure`   | `write:compression` | Ажурирање глобалних подешавања          |
| `omniroute_set_compression_engine`  | `write:compression` | Постављање режима и опционог цевовода   |
| `omniroute_list_compression_combos` | `read:compression`  | Листа комбинација компресије            |
| `omniroute_compression_combo_stats` | `read:compression`  | Читање аналитике комбинација/механизама |

## Опсег и изузеци

**Уграђивања се никада не компресују.** `open-sse/handlers/embeddings.ts` никада не позива ниједан
механизам компресије — тела захтева/одговора прослеђују се директно извршиоцу без измена.
То је тренутно структурно својство (уграђивања и довршавања ћаскања имају раздвојене обрађиваче), а не
провера током извршавања, али то значи да ризик од изобличења вектора из #8034 нема површину изложености
на путањи уграђивања.

**Филтер изузетака по моделу/крајњој тачки (#8034).** За довршавања ћаскања, оператер може да наведе
ID-ове модела / `provider/model` циљеве који се никада не смеју компресовати — заштитна мера корисна ако
компресија касније буде повезана ближе путањи сродној уграђивањима, а уопштено је корисна
за сваки модел код ког је битан упит потпуно идентичан бајт по бајт (детерминистичке евалуације, префикси
осетљиви на кеш итд.).

- Поље подешавања: `exclusions?: string[]` у глобалној конфигурацији компресије
  (`GET`/`PUT /api/settings/compression`), трајно сачувано преко постојећег `key_value` простора имена за компресију
  (`src/lib/db/compression.ts`) — без нове табеле.
- Картица контролне табле: **Контролна табла → Компресија → Изузеци**
  (`/dashboard/compression/exclusions`).
- Синтакса шаблона: `*` је једини џокер. Сваки други метакарактер регуларног израза у шаблону
  маскира се пре упаривања, па `gpt-5.6` одговара само дословној ниски, а никада `gpt-5x6`
  (безбедно од ReDoS напада, ограничено, без угнежђених квантификатора). Шаблони се упарују без обзира на величину слова
  и са самим ID-ом модела и са сложеним обликом `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  и `openai/*` сви функционишу, док самостално `*` изузима сваки модел.
- Упаривање: `isCompressionExcluded()` / `normalizeCompressionExclusions()` у
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` проверава изузети циљ
  одмах након разрешавања подешавања компресије, **пре покретања било ког механизма**, и третира подударање
  потпуно исто као да је компресија глобално онемогућена — доказиво је да је тело захтева
  идентично бајт по бајт. Прескакање се бележи преко `writeCompressionSkip(..., "excluded")` ради
  видљивости у аналитици.
- Подразумевано (празна/одсутна листа): идентично понашању пре #8034 — ништа није изузето.

## Позната ограничења

- **LLMLingua-2 (SLM) захтева да опционе зависности буду на истој локацији.** Worker се у
  продукционом издању покреће само када су `@atjsh/llmlingua-2` и peer зависности смештени у
  `dist/node_modules` (погледајте `scripts/build/colocateOptionals.mjs`, #4286). Без њих,
  engine наставља рад без компресије (враћа оригинални текст). Разрешавање worker-а више не зависи од
  `import.meta.url` (не функционише у самосталном bundle-у) — ослања се на runtime
  cwd / `argv[1]`.
- **Caveman језички пакети `de` / `fr` / `ja` су делимични.** Испоручују `context` +
  `filler` + `structural` правила, али не и `dedup` / `ultra` пакете, па интензитет `ultra`
  није јачи од `full` за те језике (користе искључиво сопствена правила — нема
  неприметног враћања на енглеска `dedup`/`ultra` правила, која би унаказила страни текст).
  `en` / `es` / `id` / `pt-BR` су потпуни. Доприноси у виду `dedup.json` + `ultra.json`
  датотека за делимичне пакете су добродошли.
- **Телеметрија сложеног pipeline-а наводи само engine-е који су извршили компресију.** Корак сложеног pipeline-а чији је
  engine покренут, али је остварио уштеду од 0 %, враћа `stats:null` и зато се не појављује у
  `engineBreakdown` — не може се разликовати од прескоченог корака. Разликовање
  „покренут, 0 %“ од „прескочен“ захтевало би измену модела прегледа и одложено је.

## Validacija

Fokusirani testovi za ovu oblast su:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
