# Compression Engines (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Komprese OmniRoute je postavena na kontraktech enginů. Režim může přímo spouštět jeden engine
(`caveman` nebo `rtk`) nebo deterministický zřetězený pipeline, který spouští více enginů v daném pořadí.

## Režimy

| Režim        | Cesta enginu                             | Zamýšlený vstup                                        |
| ------------ | ---------------------------------------- | ------------------------------------------------------ |
| `off`        | žádný                                    | Přesné zachování promptu                               |
| `lite`       | Pomocné funkce Caveman lite              | Nízkorizikové průběžné čištění                         |
| `standard`   | Caveman                                  | Kondenzace promptů v přirozeném jazyce                 |
| `aggressive` | Caveman + sumarizátory historie/nástrojů | Dlouhé chatovací relace                                |
| `ultra`      | Caveman + pomocné funkce pro prořezávání | Obnovení po dosažení limitu kontextu                   |
| `rtk`        | RTK                                      | Výstup terminálu, shellu, sestavení, testů a gitu      |
| `omniglyph`  | OmniGlyph                                | Kontext jako obrázek v nativním rozhraní poskytovatele |
| `stacked`    | Pipeline, výchozí `rtk -> caveman`       | Smíšené logy nástrojů a próza, maximální úspora        |

### Profily komprese OmniGlyph

Engine `omniglyph` (balíček `omniglyph`, 1.4.0+) přijímá pojmenovaný sémantický profil, nastavený
globálně prostřednictvím `omniglyph.profile` v nastavení komprese nebo pro jednotlivé kroky prostřednictvím
konfigurace kroku ve zřetězeném pipeline:

| Profil        | Hranice                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Výchozí. Zásady, podle kterých byla měřena publikovaná potvrzení — obrazový systém, dokumentace nástrojů a hustá historie |
| `balanced`    | Zachovává aktivní stav v nativní podobě, chrání posledních 8 kol, slučuje starší uzavřenou historii                       |
| `coding-safe` | Zachovává autoritu, schémata nástrojů a aktivní výstup nástrojů v nativní podobě, chrání posledních 12 kol                |
| `passthrough` | Směruje bez transformace; engine je přeskočen                                                                             |

Profil je **strop, nikoli podlaha**: `mergeCompressionProfileOptions` v balíčku
nedovolí, aby přepsání volajícím znovu otevřelo ztrátovou větev, kterou profil uzavřel, takže hodnota
`preserveSystemPrompt: false` nastavená pro jednotlivý krok nemůže pod profilem `coding-safe` znovu povolit kompresi systémového promptu.

Naměřeno na tomto kódu: `coding-safe` a `balanced` zvyšují `minCompressChars` na jeho
maximum a zachovávají systém, schémata nástrojů a výsledky nástrojů v nativní podobě, takže relace, která dosud
nenahromadila historii, skončí na `below_min_chars` a engine nic netransformuje. Proto
je výchozím profilem `aggressive`, nikoli nejbezpečnější profil.

Balíček určuje vlastní rozsah modelů a profil ze své konfigurace prostředí.
OmniRoute toto rozhodnutí nikdy nedeleguje: adaptér omezuje bránu modelů na nejrestriktivnější rozsah balíčku,
takže nastavení hostitelského prostředí může seznam povolených položek pouze zúžit, nikdy jej nerozšíří nad rámec
naměřených potvrzení OmniRoute.

## Registr enginů

Registr se nachází v `open-sse/services/compression/engines/registry.ts`. Enginy poskytují společný
kontrakt:

- `id`: stabilní ID enginu, například `caveman` nebo `rtk`
- `apply(text, config)`: původní cesta spuštění používaná skládanými pipeline
- `compress(input, config)`: primární cesta spuštění vracející text + statistiky
- `getConfigSchema()`: vrací strukturu platné konfigurace podobnou JSON Schema
- `validateConfig(config)`: vrací `{ valid, errors[] }`

Registrace používá `registerCompressionEngine(engine)` (nebo `registerEngine` pro pokročilé případy),
která před přijetím volá `assertValidEngine()` a `validateConfig(defaultConfig)`.
K odebrání enginu za běhu použijte `unregisterCompressionEngine(id)`.

`strategySelector.ts` registruje vestavěné enginy před spuštěním komprese. Díky tomu mohou náhled,
komprese za běhu, skládaný režim, testy i budoucí enginy používat stejnou cestu spuštění.

### Komprese popisů MCP (související)

Samostatný registr komprimuje metadata popisů nástrojů MCP na úrovni registru — viz
`open-sse/mcp-server/descriptionCompressor.ts` a [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Opakovaně používá
pravidla Caveman, ale pracuje s metadaty nástrojů, nikoli s datovými částmi požadavků.

### Další vestavěné enginy

Kromě enginů Caveman, RTK a LLMLingua-2 registr obsahuje několik specializovaných bezeztrátových /
strukturálních enginů (používaných skládanými pipeline, playgroundem a testy):

| Engine        | Id              | Co dělá                                                                                                                                                                                |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): nahrazuje velké souvislé textové bloky odkazy adresovanými podle obsahu, takže se opakované/velké bloky odešlou jednou a poté se na ně pouze odkazuje. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): bezeztrátová tabulková kompakce datových částí obsahujících homogenní pole JSON do sloupcové podoby `[N rows]`.                                                |
| ionizer       | `ionizer`       | Vzorkování řádků ze začátku, středu a konce velmi velkých homogenních bloků, přičemž vynechaný střed se uloží jako odkaz CCR adresovaný podle obsahu.                                  |
| session-dedup | `session-dedup` | Deduplikace mezi tahy adresovaná podle obsahu (inspirovaná TokenMizerem): vynechává text, který se již objevil v předchozích tazích stejné relace.                                     |

**Instrukce protokolu načítání CCR (#8033):** když CCR poprvé nahradí v
požadavku ≥1 blok, engine vloží na začátek jedinou idempotentní zprávu `system` (začínající
sentinelem `[CCR protocol]`), která volajícímu vysvětluje kontrakt mezi značkou a nástrojem: co znamená
značka `[CCR retrieve hash=<24hex> chars=N]`, že hash musí být zkopírován doslova
(všech 24 hexadecimálních znaků — chybně zkopírované hashe jsou pravděpodobnou příčinou
selhání „blok nenalezen“) a že značka `[dedup:ref sha=...]` znamená „vyhledej v historii“, nikoli „zavolej
nástroj“. Poznámka je vložena **pouze tehdy, když inzerované `tools[]` volajícího prokazuje, že má
skutečně přístup k `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` v
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — běžný
volající kompatibilní s OpenAI bez tohoto nástroje nikdy neobdrží instrukci, aby volal něco,
k čemu nemá přístup. Idempotence je zajištěna prohledáním historie zpráv na přítomnost sentinelu
před vložením, takže požadavky s více tahy (které znovu přehrávají předchozí zprávy) nepřidávají
poznámku při každém tahu.

## Caveman

Režim Caveman se zaměřuje na sémantickou kondenzaci běžné prózy:

- zachovává bloky kódu, adresy URL, JSON, cesty a strukturovaná data
- odstraňuje výplňová slova, váhavé formulace, opakovaný kontext a rozvláčné spojovací fráze
- podporuje jazykově specifické balíčky pravidel pro soubory v `open-sse/services/compression/rules/`
- zůstává dostupný prostřednictvím starších režimů `standard`, `aggressive` a `ultra`

V řídicím panelu jej najdete v `Dashboard -> Context & Cache -> Caveman`.

Upstream projektu Caveman uvádí přibližně o `~75%` méně výstupních tokenů a průměrnou úsporu výstupu `65%` v benchmarcích
s rozsahem `22-87%`; nástroj pro kompresi vstupu dosahuje přibližně `~46%`. OmniRoute při dokumentování kombinovaných úspor
promptu a kontextu používá hodnotu komprese vstupu Caveman; výstupní režim Caveman zůstává samostatnou funkcí
ovlivňující chování odpovědí.

## RTK

Režim RTK se zaměřuje na výstup příkazů a nástrojů:

- rozpoznává třídy výstupu, jako jsou `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  testy Cargo/Go, sestavení TypeScript/Vite/Webpack, ESLint, audity/instalace npm, protokoly Dockeru,
  shellové příkazy `find`/`grep`, trasování zásobníku a obecné protokoly
- používá 49 filtrů JSON z `open-sse/services/compression/engines/rtk/filters/`
- podporuje deklarativní pipeline ve stylu RTK: odstraňování ANSI sekvencí, nahrazování, zkrat při shodě výstupu,
  odstraňování/zachovávání řádků, zkracování jednotlivých řádků, zkracování podle začátku/konce/maximálního počtu řádků a záložní hodnotu při prázdném výstupu
- podporuje důvěrou řízené projektové filtry v `.rtk/filters.json` a globální filtry v
  `DATA_DIR/rtk/filters.json`
- odstraňuje ANSI sekvence, šum průběhu, opakované řádky a neužitečný standardní text
- zachovává selhání vyžadující zásah, varování, souhrny, změněné soubory a kontext na konci
- může volitelně uchovávat redigovaný nezpracovaný výstup pro obnovení a ladění prostřednictvím ověřených tras správy

V řídicím panelu jej najdete v `Dashboard -> Context & Cache -> RTK`.

Provozní podrobnosti o vlastních filtrech, důvěře, ověřování a obnovení nezpracovaného výstupu jsou uvedeny v
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Upstream projektu RTK uvádí úsporu `60-90%` při kompresi výstupu příkazů. Příklad v jeho souboru README ukazuje
30minutovou relaci Claude Code, která se zmenšila z `~118,000` tokenů na `~23,900`, tedy o `79.7%`.

## LLMLingua-2 (sémantické prořezávání)

Režim LLMLingua-2 provádí **sémantické prořezávání tokenů** v próze pomocí malého tokenového
klasifikátoru ONNX, a doplňuje tak pravidlové enginy Caveman a RTK:

- komprimuje prózu pouze v nesystémových zprávách; ohraničené bloky kódu a další zachovávané
  konstrukce nikdy nemění
- spouští backend `@atjsh/llmlingua-2` (ONNX prostřednictvím `@huggingface/transformers`) v
  pracovním vlákně, takže inference modelu nikdy neblokuje smyčku událostí požadavku
- lze jej **kombinovat** (`stackPriority` 35): v kombinované pipeline se spouští po
  strukturálních enginech (CCR, session-dedup, headroom, Caveman), ale před `ultra`, protože
  sémantické prořezávání je nejúčinnější u textu, který již prošel strukturální kompresí — např.
  `rtk -> caveman -> llmlingua`
- při **jakékoli chybě bezpečně pokračuje bez komprese** (chybějící volitelné závislosti, spuštění pracovního procesu, načtení modelu, inference
  nebo vypršení časového limitu) → původní text se vrátí beze změny, nikdy se nevrátí chyba

Umístění enginu: `open-sse/services/compression/engines/llmlingua/`. V řídicím panelu jej najdete
v `Dashboard -> Context & Cache -> LLMLingua`.

### Modely

Výchozím modelem je **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
rychlý). Přesnější model **BERT-base** (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) je dostupný prostřednictvím pole `model` v konfiguraci enginu. `@huggingface/transformers`
při prvním volání líně stáhne vybraný model z HuggingFace Hub do
`${DATA_DIR}/models/llmlingua` (`modelStore.ts`); přepsání konfigurace pomocí `modelPath`
jej místo toho nasměruje na místní kopii (pro offline / fyzicky izolované instalace).

### Volitelné závislosti a instalace na vyžádání

Odstranitelná sada běhových peer závislostí LLMLingua je **volitelná**. Dva balíčky jsou v
`package.json` deklarovány jako `optionalDependencies` a produkční sestavení je ponechává
jako **externí** (`scripts/build/prepublish.ts` je nespojuje do balíčku):

| Balíček              | Verze (pevně daná) | Poznámky                                                |
| -------------------- | ------------------ | ------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`            | Vstupní balíček; ostatní deklaruje jako peer závislosti |
| `js-tiktoken`        | `^1.0.20`          | Tokenizátor                                             |

`@huggingface/transformers` je připnutý na `^4.2.0` (sdílí se s cestou místních embeddingů a
je také zahrnut do trasování pro samostatný balíček); `@atjsh/llmlingua-2@2.0.5` na něm závisí
jako na peer závislosti s verzí `"^3.5.2 || ^4.0.0"`, takže jsou podporovány Transformers.js v3 i v4. Od verze 2.0.4
již `@atjsh/llmlingua-2` nevyžaduje `@tensorflow/tfjs`, čímž byl ze sady SLM odstraněn její
největší jednotlivý přispěvatel (TensorFlow.js). Odstranitelné peer závislosti SLM tvoří pouze
dva výše uvedené balíčky. Standardní `npm install` (vývojové prostředí) nainstaluje volitelnou sadu automaticky, pokud nejsou volitelné
závislosti vynechány.

**Proč na vyžádání:** balíček publikovaný na npm, samostatný balíček a obraz Dockeru se
dodávají **bez** těchto závislostí, aby zůstaly malé. Pokud chybějí, kontrola závislostí
pracovního procesu (pokus o vyřešení `@atjsh/llmlingua-2` v `worker.ts`) selže a engine
**tiše pokračuje bez komprese** — výběr LLMLingua neprovede žádnou operaci (text se vrátí beze změny a nezaznamená se
žádná chyba). Chcete-li jej aktivovat v prostředí s odstraněnými závislostmi, nainstalujte volitelnou sadu:

```bash
# připnutí k verzím deklarovaným v package.json v optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Odstranění `@tensorflow/tfjs` (2.0.4+) eliminuje dříve dominantního přispěvatele o velikosti ~800 MB
— zbývající prostor zabírají běhová prostředí transformers.js + onnxruntime-node
a model TinyBERT (~57 MB), který se stáhne při prvním použití (nikoli prostřednictvím npm).

Pro jednotlivá prostředí:

- **Vývoj / `npm install`** — nainstaluje se automaticky, pokud jste nepoužili `--omit=optional`
  (nebo `--no-optional`). Není třeba nic dělat.
- **Globální npm (`npm i -g omniroute`) / samostatná instalace** — spusťte výše uvedený instalační příkaz
  v adresáři nainstalovaného balíčku nebo proveďte přeinstalaci bez vynechání volitelných závislostí.
- **Docker** — přidejte instalační příkaz do vrstvy odvozeného obrazu; publikovaný obraz
  je záměrně minimalistický.
- **VPS (PM2)** — nainstalujte balíček do `node_modules` aplikace a poté restartujte proces, aby
  worker znovu zkontroloval bránu.
- **Nezabalený samostatný Next (`npm run build` → `.build/next/standalone/server.js`)** — trasování
  samostatného sestavení neobsahuje ANI worker, ANI volitelné závislosti, takže se engine při selhání
  bez upozornění přepne do otevřeného režimu. `scripts/build/colocate-standalone.mjs` znovu přidá obojí (sestavení workeru pomocí esbuild +
  uzávěr volitelných závislostí do stromu samostatného sestavení); po každém sestavení se spustí automaticky prostřednictvím
  npm hooku `postbuild`. Je idempotentní a při chybějících závislostech ukončí běh bez fatální chyby.

**Ověření aktivity:** při vybraném LLMLingua se skutečný souvislý text opravdu zkrátí (engine
se přestane při selhání přepínat do otevřeného režimu) a první požadavek spustí stažení modelu do
`${DATA_DIR}/models/llmlingua`. Brána záměrně kontroluje pouze `@atjsh/llmlingua-2` —
ostatní peer závislosti podporují pouze ESM a `require.resolve` u nich vyvolá výjimku, i když jsou přítomné — takže
se worker nadále při selhání přepne do otevřeného režimu, pokud při volání `import()` skutečně chybí některá peer závislost.

## Zřetězené pipeline

Zřetězený režim spouští kroky pipeline v daném pořadí. Výchozí nastavení je:

```txt
rtk -> caveman
```

Tento režim použijte pro relace programovacích agentů, ve kterých prompt kombinuje výstup příkazů s textem od člověka nebo asistenta. RTK nejprve redukuje zahlcující protokoly nástrojů a poté Caveman komprimuje zbývající přirozený jazyk.

Kroky pipeline se konfigurují pomocí `stackedPipeline` v nastavení komprese nebo prostřednictvím kombinací komprese.

Když oba enginy redukují stejný způsobilý obsah, úspory se násobí:

```txt
kombinovaná = 1 - (1 - úspora RTK) * (1 - úspora vstupu Caveman)
průměr      = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
rozsah      = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtr stromu přístupnosti MCP

Inteligentní filtr stromu přístupnosti MCP je kompresní vrstva po provedení, která pracuje s **výsledky nástrojů** MCP, nikoli s prompty nebo kontextem. Zaměřuje se na objemné datové struktury stromu přístupnosti a snímků prohlížeče vracených nástroji, jako jsou Playwright, computer-use a servery MCP pro automatizaci prohlížeče.

### Co provádí

1. **Odstranění šumu** — odstraňuje prázdné obecné/textové položky (`- generic:`, `- text: ""`)
2. **Sbalení sousedních položek** — pokud je ≥ `collapseThreshold` (výchozí hodnota 30) po sobě jdoucích řádků strukturálně opakovaných, sbalí je na prvních `collapseKeepHead` (výchozí hodnota 10) řádků + souhrn počtu + posledních `collapseKeepTail` (výchozí hodnota 5) řádků
3. **Zachování referencí** — kotvy `[ref=eXX]` vyžadované nástroji Playwright/computer-use zůstávají vždy nedotčené
4. **Pevné zkrácení** — pokud text po sbalení stále překračuje `maxTextChars` (výchozí hodnota 50 000), zkrátí jej a přidá navigační nápovědu, aby agent mohl pokračovat v práci

### Umístění enginu

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← vstupní bod smartFilterText()
  collapseRepeated.ts ← algoritmus sbalení sousedních položek
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigurace

Řídí se pomocí `compression.mcpAccessibility` v globálním nastavení (migrace 056). Výchozí konfigurace:

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

Filtr se použije pouze na obsah výsledků nástrojů, jejichž `type` je `"text"` a jejichž délka překračuje `minLengthToProcess`. Nemá vliv na kompresi promptů ani na obsah požadavků.

### Očekávané úspory

60–80 % u výsledků nástrojů obsahujících snímky prohlížeče v závislosti na složitosti stránky. Algoritmus sbalení má složitost O(n) vzhledem k počtu řádků a přidává zanedbatelnou latenci.

### Tento filtr oproti výše uvedeným kompresním enginům

| Aspekt           | Caveman / RTK / Stacked     | Filtr přístupnosti MCP                 |
| ---------------- | --------------------------- | -------------------------------------- |
| Cíl              | Prompty požadavků / kontext | Výsledky nástrojů MCP                  |
| Spouštěč         | Nastavení režimu komprese   | `compression.mcpAccessibility.enabled` |
| Rozsah           | Všechny zprávy SSE          | Pouze výsledky nástrojů                |
| Referenční kotvy | N/A                         | Bezpodmínečně zachovány                |

---

## Kombinace komprese

Kombinace komprese jsou pojmenované profily komprese, které lze přiřadit kombinacím směrování:

- `compression_combos`: ukládá režim, pipeline, konfiguraci RTK, konfiguraci jazyka a příznak výchozího nastavení
- `compression_combo_assignments`: mapuje kombinaci komprese na kombinaci směrování
- integrace za běhu vyhodnotí přiřazenou kombinaci komprese před obecnými přepsáními kombinace
- analytická data zahrnují `compression_combo_id` a `engine`

Umístění v řídicím panelu: `Dashboard -> Context & Cache -> Compression Combos`.

## Rozhraní API

| Trasa                                  | Účel                                                                |
| -------------------------------------- | ------------------------------------------------------------------- |
| `/api/settings/compression`            | Globální nastavení komprese (včetně konfigurace `mcpAccessibility`) |
| `/api/compression/preview`             | Náhled libovolného režimu komprese                                  |
| `/api/compression/language-packs`      | Seznam dostupných jazykových balíčků Caveman                        |
| `/api/context/caveman/config`          | Alias nastavení Caveman                                             |
| `/api/context/rtk/config`              | Výchozí hodnoty a nastavení RTK                                     |
| `/api/context/rtk/filters`             | Katalog filtrů RTK                                                  |
| `/api/context/rtk/test`                | Koncový bod pro náhled/test RTK                                     |
| `/api/context/rtk/raw-output/[id]`     | Autentizované obnovení redigovaného nezpracovaného výstupu          |
| `/api/context/combos`                  | Operace CRUD s kombinacemi komprese                                 |
| `/api/context/combos/[id]/assignments` | Operace CRUD s přiřazeními ke kombinacím směrování                  |
| `/api/context/analytics`               | Alias analytických dat komprese                                     |

Trasy pro správu vyžadují autentizaci pro správu nebo kontroly zásad klíče API.

## Nástroje MCP

Komprese zpřístupňuje pět nástrojů MCP:

| Nástroj                             | Rozsah              | Účel                                              |
| ----------------------------------- | ------------------- | ------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Nastavení, analytická data, statistiky mezipaměti |
| `omniroute_compression_configure`   | `write:compression` | Aktualizace globálních nastavení                  |
| `omniroute_set_compression_engine`  | `write:compression` | Nastavení režimu a volitelné pipeline             |
| `omniroute_list_compression_combos` | `read:compression`  | Výpis kombinací komprese                          |
| `omniroute_compression_combo_stats` | `read:compression`  | Načtení analytických dat kombinací/enginu         |

## Rozsah a výjimky

**Embeddingy nejsou nikdy komprimovány.** `open-sse/handlers/embeddings.ts` nikdy nevolá žádný
kompresní engine — těla požadavků/odpovědí jsou předána přímo executoru beze změny.
V současnosti je to dáno strukturou (embeddingy a dokončování chatu mají oddělené handlery),
nikoli kontrolou za běhu, znamená to však, že obava z deformace vektorů uvedená v #8034
nemá v cestě embeddingů žádnou oblast působnosti.

**Filtr výjimek pro jednotlivé modely/koncové body (#8034).** U dokončování chatu může operátor
uvést ID modelů / cíle `provider/model`, které nikdy nesmějí být komprimovány — ochranné
opatření užitečné pro případ, že by komprese byla později zapojena blíže k cestě související
s embeddingy, a obecně užitečné pro jakýkoli model, u něhož záleží na přesné bajtové podobě
promptu (deterministická vyhodnocení, prefixy citlivé na mezipaměť atd.).

- Pole nastavení: `exclusions?: string[]` v globální konfiguraci komprese
  (`GET`/`PUT /api/settings/compression`), ukládané prostřednictvím existujícího jmenného
  prostoru komprese `key_value` (`src/lib/db/compression.ts`) — bez nové tabulky.
- Karta řídicího panelu: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Syntaxe vzorů: `*` je jediný zástupný znak. Každý další metaznak regulárních výrazů ve vzoru
  je před porovnáním escapován, takže `gpt-5.6` odpovídá pouze doslovnému řetězci, nikdy
  `gpt-5x6` (odolné vůči ReDoS, omezené, bez vnořených kvantifikátorů). Vzory jsou bez ohledu
  na velikost písmen porovnávány jak se samotným ID modelu, tak s kombinací `provider/model` —
  `gpt-5-6`, `openai/gpt-5-6` a `openai/*` tedy fungují a samotné `*` vyloučí všechny modely.
- Porovnávání: `isCompressionExcluded()` / `normalizeCompressionExclusions()` v
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` kontroluje vyloučený cíl
  ihned po vyhodnocení nastavení komprese, **před spuštěním jakéhokoli enginu**, a shodu
  zpracuje přesně tak, jako kdyby byla komprese globálně zakázána — tělo požadavku je
  prokazatelně bajtově identické. Přeskočení je zaznamenáno pomocí
  `writeCompressionSkip(..., "excluded")`, aby bylo viditelné v analytických datech.
- Výchozí stav (prázdný/chybějící seznam): shodný s chováním před #8034 — nic není vyloučeno.

## Známá omezení

- **LLMLingua-2 (SLM) vyžaduje společné umístění volitelných závislostí.** Worker se v
  produkčním sestavení spustí pouze tehdy, když jsou `@atjsh/llmlingua-2` a jeho peer závislosti společně umístěny v
  `dist/node_modules` (viz `scripts/build/colocateOptionals.mjs`, #4286). Bez nich
  engine při selhání vrátí původní text. Vyhledání workeru již nezávisí na
  `import.meta.url` (v samostatném balíčku selže) — vychází z runtime hodnoty
  cwd / `argv[1]`.
- **Jazykové balíčky Caveman `de` / `fr` / `ja` jsou neúplné.** Obsahují pravidla `context` +
  `filler` + `structural`, ale nikoli balíčky `dedup` / `ultra`, takže intenzita `ultra` není
  pro tyto jazyky silnější než `full` (používají pouze vlastní pravidla — nedochází k žádnému
  skrytému návratu k anglickým pravidlům `dedup`/`ultra`, která by cizojazyčný text poškodila).
  Balíčky `en` / `es` / `id` / `pt-BR` jsou kompletní. Příspěvky s `dedup.json` + `ultra.json`
  pro neúplné balíčky jsou vítány.
- **Skládaná telemetrie uvádí pouze enginy, které provedly kompresi.** Krok skládané pipeline, jehož
  engine se spustil, ale dosáhl úspory 0 %, vrátí `stats:null`, a proto se neobjeví v
  `engineBreakdown` — nelze jej odlišit od kroku, který byl přeskočen. Rozlišení mezi
  „spuštěno, 0 %“ a „přeskočeno“ by vyžadovalo změnu modelu rozpisu a je odloženo.

## Ověření

Cílené kontroly pro tuto oblast jsou:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
