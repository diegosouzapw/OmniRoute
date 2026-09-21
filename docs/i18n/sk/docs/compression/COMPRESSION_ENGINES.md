# Compression Engines (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Kompresia OmniRoute je postavená na kontraktoch enginov. Režim môže priamo spustiť jeden engine
(`caveman` alebo `rtk`) alebo deterministický skladaný pipeline, ktorý vykonáva viacero enginov v danom poradí.

## Režimy

| Režim        | Cesta enginu                              | Určený vstup                                           |
| ------------ | ----------------------------------------- | ------------------------------------------------------ |
| `off`        | žiadny                                    | Presné zachovanie promptu                              |
| `lite`       | Pomocné funkcie Caveman lite              | Vždy aktívne čistenie s nízkym rizikom                 |
| `standard`   | Caveman                                   | Kondenzácia promptov v prirodzenom jazyku              |
| `aggressive` | Caveman + sumarizátory histórie/nástrojov | Dlhé chatové relácie                                   |
| `ultra`      | Caveman + pomocné funkcie na orezávanie   | Obnova pri dosiahnutí limitu kontextu                  |
| `rtk`        | RTK                                       | Výstup terminálu, shellu, zostavenia, testov a gitu    |
| `omniglyph`  | OmniGlyph                                 | Kontext ako obrázok na natívnom rozhraní poskytovateľa |
| `stacked`    | Pipeline, predvolene `rtk -> caveman`     | Zmiešané protokoly nástrojov a próza, maximálna úspora |

### Profily kompresie OmniGlyph

Engine `omniglyph` (balík `omniglyph`, 1.4.0+) prijíma pomenovaný sémantický profil nastavený
globálne prostredníctvom `omniglyph.profile` v nastaveniach kompresie alebo pre každý krok prostredníctvom
konfigurácie kroku skladaného pipeline:

| Profil        | Hranica                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Predvolený. Zásady, podľa ktorých boli merané publikované výsledky — prevádza systém, dokumentáciu nástrojov a hustú históriu na obrázky |
| `balanced`    | Zachováva aktívny stav v natívnej podobe, chráni posledných 8 kôl a zlučuje staršiu uzavretú históriu                                    |
| `coding-safe` | Zachováva autoritu, schémy nástrojov a aktívny výstup nástrojov v natívnej podobe, chráni posledných 12 kôl                              |
| `passthrough` | Smeruje bez transformácie; engine sa preskočí                                                                                            |

Profil je **strop, nie spodná hranica**: `mergeCompressionProfileOptions` v balíku
nedovolí, aby prepísanie volajúcim znovu otvorilo stratovú vetvu, ktorú profil uzavrel, takže nastavenie
`preserveSystemPrompt: false` pre konkrétny krok nemôže opätovne povoliť kompresiu systému v profile `coding-safe`.

Merané na tejto kódovej základni: `coding-safe` a `balanced` zvyšujú `minCompressChars` na
maximum a zachovávajú systém, schémy nástrojov a výsledky nástrojov v natívnej podobe, takže relácia, v ktorej sa ešte
nenahromadila história, skončí pri `below_min_chars` a engine nič netransformuje. Preto
je predvolený profil `aggressive`, a nie najbezpečnejší profil.

Balík určuje vlastný rozsah modelov a profil z konfigurácie svojho prostredia.
OmniRoute toto rozhodnutie nikdy nedeleguje: adaptér obmedzuje bránu modelov na najreštriktívnejší rozsah balíka,
takže nastavenia hostiteľského prostredia môžu zoznam povolených položiek iba zúžiť, nikdy ho nemôžu rozšíriť nad rámec nameraných výsledkov OmniRoute.

## Register enginov

Register sa nachádza v `open-sse/services/compression/engines/registry.ts`. Enginy poskytujú spoločný
kontrakt:

- `id`: stabilný identifikátor enginu, napríklad `caveman` alebo `rtk`
- `apply(text, config)`: pôvodná cesta vykonávania používaná skladanými reťazcami spracovania
- `compress(input, config)`: primárna cesta vykonávania vracajúca text + štatistiky
- `getConfigSchema()`: vracia štruktúru platnej konfigurácie podobnú JSON Schema
- `validateConfig(config)`: vracia `{ valid, errors[] }`

Registrácia používa `registerCompressionEngine(engine)` (alebo `registerEngine` v pokročilých prípadoch),
ktorá pred prijatím volá `assertValidEngine()` a `validateConfig(defaultConfig)`.
Na odstránenie enginu počas behu použite `unregisterCompressionEngine(id)`.

`strategySelector.ts` registruje vstavané enginy pred spustením kompresie. Vďaka tomu môžu náhľad,
kompresia počas behu, skladaný režim, testy a budúce enginy používať rovnakú cestu vykonávania.

### Kompresia opisov MCP (súvisiace)

Samostatný register komprimuje metadáta opisov nástrojov MCP na úrovni registra — pozrite si
`open-sse/mcp-server/descriptionCompressor.ts` a [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Opätovne používa
pravidlá Caveman, ale pracuje s metadátami nástrojov, nie s dátami požiadaviek.

### Ďalšie vstavané enginy

Okrem Caveman, RTK a LLMLingua-2 register obsahuje niekoľko špecializovaných bezstratových /
štrukturálnych enginov (používaných skladanými reťazcami spracovania, interaktívnym prostredím a testami):

| Engine        | Id              | Čo robí                                                                                                                                                                            |
| ------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): nahrádza veľké súvislé bloky textu referenciami adresovanými podľa obsahu, takže opakované/veľké bloky sa odošlú raz a následne sa na ne odkazuje. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): bezstratová tabuľková kompakcia dát homogénnych polí JSON do stĺpcovej formy `[N rows]`.                                                                   |
| ionizer       | `ionizer`       | Vzorkovanie riadkov zo začiatku, stredu a konca veľmi veľkých homogénnych blokov, pričom vynechaný stred sa uloží ako referencia CCR adresovaná podľa obsahu.                      |
| session-dedup | `session-dedup` | Deduplikácia medzi ťahmi adresovaná podľa obsahu (inšpirovaná TokenMizer): vynecháva text, ktorý sa už objavil v predchádzajúcich ťahoch tej istej relácie.                        |

**Inštrukcia protokolu načítania CCR (#8033):** keď CCR prvýkrát nahradí ≥1 blok v
požiadavke, engine pridá na začiatok jednu idempotentnú správu `system` (začínajúcu
sentinelom `[CCR protocol]`), ktorá volajúcemu vysvetľuje kontrakt značka → nástroj: čo znamená
značka `[CCR retrieve hash=<24hex> chars=N]`, že hash sa musí skopírovať doslovne
(všetkých 24 hexadecimálnych znakov — nesprávne skopírované hashe sú pravdepodobnou príčinou
chýb „blok sa nenašiel“) a že značka `[dedup:ref sha=...]` znamená „pozri sa späť do histórie“, nie „zavolaj
nástroj“. Poznámka sa vloží **iba vtedy, keď volajúcim inzerované `tools[]` preukazujú, že sa
skutočne dokáže dostať k `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` v
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — bežný
volajúci kompatibilný s OpenAI bez tohto nástroja nikdy nedostane inštrukciu, aby zavolal niečo,
k čomu nemá prístup. Idempotencia sa zabezpečuje kontrolou histórie správ na prítomnosť sentinelu
pred vložením, takže požiadavky s viacerými ťahmi (ktoré opätovne prehrávajú predchádzajúce správy) nepridávajú
poznámku raz za každý ťah.

## Caveman

Režim Caveman sa zameriava na sémantickú kondenzáciu bežnej prózy:

- zachováva bloky kódu, adresy URL, JSON, cesty a štruktúrované údaje
- odstraňuje výplňové slová, vyhýbavé formulácie, opakovaný kontext a rozvláčne spojovacie frázy
- podporuje jazykovo špecifické balíky pravidiel pre súbory v `open-sse/services/compression/rules/`
- zostáva dostupný prostredníctvom starších režimov `standard`, `aggressive` a `ultra`

V ovládacom paneli sa nachádza v časti `Dashboard -> Context & Cache -> Caveman`.

Projekt Caveman uvádza približne o `~75%` menej výstupných tokenov, priemernú úsporu výstupu `65%` v benchmarkoch
s rozsahom `22-87%` a nástroj na kompresiu vstupu s hodnotou `~46%`. OmniRoute používa hodnotu Caveman pre vstupnú
kompresiu pri dokumentovaní kombinovaných úspor promptov/kontextu; výstupný režim Caveman zostáva samostatnou
funkciou ovplyvňujúcou správanie odpovedí.

## RTK

Režim RTK sa zameriava na výstup príkazov a nástrojov:

- rozpoznáva triedy výstupu, ako sú `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  testy Cargo/Go, zostavenia TypeScript/Vite/Webpack, ESLint, audity/inštalácie npm, protokoly Docker,
  shellové príkazy `find`/`grep`, trasovania zásobníka a všeobecné protokoly
- používa 49 filtrov JSON z `open-sse/services/compression/engines/rtk/filters/`
- podporuje deklaratívny pipeline v štýle RTK: odstraňovanie ANSI, nahrádzanie, predčasné ukončenie pri zhode výstupu,
  odstraňovanie/zachovávanie riadkov, skrátenie jednotlivých riadkov, skrátenie podľa začiatku/konca/maximálneho počtu riadkov a náhradný výstup pri prázdnom výsledku
- podporuje projektové filtre podmienené dôveryhodnosťou v `.rtk/filters.json` a globálne filtre v
  `DATA_DIR/rtk/filters.json`
- odstraňuje sekvencie ANSI, šum indikátorov priebehu, opakované riadky a neužitočný štandardný text
- zachováva chyby vyžadujúce zásah, upozornenia, súhrny, zmenené súbory a kontext na konci
- môže voliteľne uchovávať redigovaný nespracovaný výstup na obnovenie/ladenie prostredníctvom autentifikovaných správcovských
  trás

V ovládacom paneli sa nachádza v časti `Dashboard -> Context & Cache -> RTK`.

Prevádzkové podrobnosti o vlastných filtroch, dôveryhodnosti, overovaní a obnovení nespracovaného výstupu nájdete v
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Projekt RTK uvádza úsporu `60-90%` pri kompresii výstupu príkazov. Príklad v jeho súbore README ukazuje,
že počet tokenov počas 30-minútovej relácie Claude Code klesol z `~118,000` na `~23,900`, čo predstavuje úsporu `79.7%`.

## LLMLingua-2 (Sémantické prerezávanie)

Režim LLMLingua-2 vykonáva **sémantické prerezávanie tokenov** v próze pomocou malého klasifikátora
tokenov ONNX, čím dopĺňa enginy Caveman a RTK založené na pravidlách:

- komprimuje prózu iba v nesystémových správach; ohraničené bloky kódu a ďalšie zachovávané
  konštrukcie sa nikdy nemenia
- spúšťa backend `@atjsh/llmlingua-2` (ONNX prostredníctvom `@huggingface/transformers`) vo
  vlákne workera, takže inferencia modelu nikdy neblokuje slučku udalostí požiadavky
- je **kombinovateľný** (`stackPriority` 35): v kombinovanom pipeline sa spúšťa po
  štrukturálnych enginoch (CCR, session-dedup, headroom, Caveman), ale pred režimom `ultra`, pretože
  sémantické prerezávanie je najúčinnejšie na už štrukturálne komprimovanom texte — napr.
  `rtk -> caveman -> llmlingua`
- pri **akejkoľvek chybe pokračuje bez kompresie** (chýbajúce voliteľné závislosti, spustenie workera, načítanie modelu, inferencia
  alebo časový limit) → pôvodný text sa vráti bez zmeny, nikdy nie chyba

Umiestnenie enginu: `open-sse/services/compression/engines/llmlingua/`. V ovládacom paneli sa nachádza
v časti `Dashboard -> Context & Cache -> LLMLingua`.

### Modely

Predvoleným modelom je **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
rýchly). Presnejší model **BERT-base** (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) je dostupný prostredníctvom poľa `model` v konfigurácii enginu. `@huggingface/transformers`
pri prvom volaní (`modelStore.ts`) podľa potreby stiahne vybraný model z HuggingFace Hub do
`${DATA_DIR}/models/llmlingua`; prepísanie konfigurácie pomocou `modelPath` ho namiesto toho
nasmeruje na lokálnu kópiu (offline / izolované inštalácie).

### Voliteľné závislosti a inštalácia na požiadanie

Odstrániteľná sada peer závislostí behového prostredia LLMLingua je **voliteľná**. Dva balíky sú deklarované ako
`optionalDependencies` v `package.json` a produkčné zostavenie ich ponecháva **externé**
(`scripts/build/prepublish.ts` ich nepribaľuje):

| Balík                | Verzia (pevne stanovená) | Poznámky                                   |
| -------------------- | ------------------------ | ------------------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`                  | Vstupný balík; ostatné deklaruje ako peers |
| `js-tiktoken`        | `^1.0.20`                | Tokenizátor                                |

`@huggingface/transformers` je pevne nastavený na `^4.2.0` (zdieľaný s cestou lokálnych embeddingov a
zahrnutý aj do samostatného balíka); `@atjsh/llmlingua-2@2.0.5` ho deklaruje ako peer s rozsahom
`"^3.5.2 || ^4.0.0"`, takže sú podporované verzie Transformers.js v3 aj v4. Od verzie 2.0.4
už `@atjsh/llmlingua-2` nevyžaduje `@tensorflow/tfjs`, čím sa zo sady SLM odstránila jej najväčšia
samostatná súčasť (TensorFlow.js). Odstrániteľnými peer závislosťami SLM sú iba dva balíky uvedené vyššie.
Štandardný príkaz `npm install` (vývojové prostredie) nainštaluje voliteľnú sadu automaticky, pokiaľ nie sú voliteľné
závislosti vynechané.

**Prečo na požiadanie:** balík publikovaný v npm, samostatný balík a obraz Docker sa
dodávajú **bez** týchto závislostí, aby zostali malé. Ak chýbajú, kontrola závislostí workera
(sonda rozlíšenia `@atjsh/llmlingua-2` v `worker.ts`) zlyhá a engine
**potichu pokračuje bez kompresie** — výber režimu LLMLingua nevykoná žiadnu operáciu (text sa vráti bez zmeny a
nezaznamená sa žiadna chyba). Ak ho chcete aktivovať v prostredí s odstránenými závislosťami, nainštalujte voliteľnú sadu:

```bash
# použite verzie deklarované v package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Odstránenie `@tensorflow/tfjs` (2.0.4+) eliminuje predtým dominantnú súčasť s veľkosťou ~800 MB
— zostávajúcu veľkosť tvoria behové prostredia transformers.js + onnxruntime-node
a model TinyBERT (~57 MB), ktorý sa stiahne pri prvom použití (nie prostredníctvom npm).

Pre jednotlivé prostredia:

- **Vývoj / `npm install`** — nainštaluje sa automaticky, pokiaľ ste nepoužili `--omit=optional`
  (alebo `--no-optional`). Nie je potrebná žiadna akcia.
- **Globálny npm (`npm i -g omniroute`) / samostatná inštalácia** — spustite vyššie uvedený inštalačný príkaz v adresári
  nainštalovaného balíka alebo ho preinštalujte bez vynechania voliteľných závislostí.
- **Docker** — pridajte inštalačný príkaz do vrstvy odvodeného obrazu; publikovaný obraz
  je zámerne odľahčený.
- **VPS (PM2)** — nainštalujte ho do `node_modules` aplikácie a potom reštartujte proces, aby
  worker znova skontroloval bránu.
- **Neupravený samostatný režim Next (`npm run build` → `.build/next/standalone/server.js`)** — samostatný
  trace neobsahuje ANI worker, ANI voliteľné závislosti, takže engine potichu pokračuje v otvorenom režime.
  `scripts/build/colocate-standalone.mjs` znova pridá oboje (worker zostavený cez esbuild +
  úplný strom voliteľných závislostí do samostatného stromu); spúšťa sa automaticky prostredníctvom
  npm hooku `postbuild` po každom zostavení. Je idempotentný a pri chýbajúcich závislostiach zlyhá bezpečne.

**Overenie, že je aktívny:** keď je vybraný LLMLingua, skutočný text sa naozaj skráti (engine
prestane pokračovať v otvorenom režime) a prvá požiadavka spustí stiahnutie modelu do
`${DATA_DIR}/models/llmlingua`. Brána zámerne kontroluje iba `@atjsh/llmlingua-2` —
ostatné peer závislosti sú určené výhradne pre ESM a `require.resolve` pri nich vyhodí výnimku, aj keď sú prítomné — takže
worker naďalej pokračuje v otvorenom režime, ak pri volaní `import()` skutočne chýba ktorákoľvek peer závislosť.

## Zreťazené pipeline

Zreťazený režim spúšťa kroky pipeline v poradí. Predvolené poradie je:

```txt
rtk -> caveman
```

Použite ho pre relácie kódovacích agentov, v ktorých prompt kombinuje výstup príkazov s textom od človeka alebo asistenta. RTK najprv zredukuje zahlcujúce protokoly nástrojov a potom Caveman skomprimuje zostávajúci prirodzený jazyk.

Kroky pipeline sa konfigurujú pomocou `stackedPipeline` v nastaveniach kompresie alebo prostredníctvom kombinácií kompresie.

Keď oba enginy zredukujú rovnaký vhodný obsah, úspory sa násobia:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filter stromu prístupnosti MCP

Inteligentný filter stromu prístupnosti MCP je kompresná vrstva po vykonaní, ktorá sa spúšťa nad **výsledkami nástrojov** MCP, nie nad promptmi ani kontextom. Zameriava sa na objemné dátové obsahy stromu prístupnosti a snímok prehliadača, ktoré vracajú nástroje ako Playwright, computer-use a servery MCP na automatizáciu prehliadača.

### Čo robí

1. **Odstránenie šumu** — odstraňuje prázdne generické/textové položky (`- generic:`, `- text: ""`)
2. **Zbalenie súrodencov** — keď je ≥ `collapseThreshold` (predvolene 30) po sebe idúcich riadkov štrukturálne sa opakujúcich, zbalí ich na prvých `collapseKeepHead` (predvolene 10) riadkov + súhrn počtu + posledných `collapseKeepTail` (predvolene 5) riadkov
3. **Zachovanie referencií** — kotvy `[ref=eXX]` vyžadované nástrojmi Playwright/computer-use zostanú vždy nedotknuté
4. **Pevné skrátenie** — ak text po zbalení stále presahuje `maxTextChars` (predvolene 50 000), skráti ho a pridá navigačnú pomôcku, aby agent mohol pokračovať v práci

### Umiestnenie enginu

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← vstupný bod smartFilterText()
  collapseRepeated.ts ← algoritmus zbalenia súrodencov
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfigurácia

Ovláda sa pomocou `compression.mcpAccessibility` v globálnych nastaveniach (migrácia 056). Predvolená konfigurácia:

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

Filter sa použije iba na dátové obsahy výsledkov nástrojov, ktorých `type` je `"text"` a ktorých dĺžka presahuje `minLengthToProcess`. Neovplyvňuje kompresiu promptov ani dátové obsahy požiadaviek.

### Očakávané úspory

60–80 % pri výsledkoch nástrojov obsahujúcich snímky prehliadača v závislosti od zložitosti stránky. Algoritmus zbalenia má zložitosť O(n) vzhľadom na počet riadkov a pridáva zanedbateľnú latenciu.

### Tento filter v porovnaní s kompresnými enginmi uvedenými vyššie

| Aspekt           | Caveman / RTK / Stacked     | Filter prístupnosti MCP                |
| ---------------- | --------------------------- | -------------------------------------- |
| Cieľ             | Prompty/kontext požiadaviek | Výsledky nástrojov MCP                 |
| Spúšťač          | Nastavenie režimu kompresie | `compression.mcpAccessibility.enabled` |
| Rozsah           | Všetky správy SSE           | Iba výsledky nástrojov                 |
| Kotvy referencií | N/A                         | Vždy zachované                         |

---

## Kombinácie kompresie

Kombinácie kompresie sú pomenované profily kompresie, ktoré možno priradiť ku kombináciám smerovania:

- `compression_combos`: ukladá režim, pipeline, konfiguráciu RTK, konfiguráciu jazyka a označenie predvolenej možnosti
- `compression_combo_assignments`: mapuje kombináciu kompresie na kombináciu smerovania
- integrácia za behu vyrieši priradenú kombináciu kompresie pred všeobecnými prepísaniami kombinácií
- analytika zahŕňa `compression_combo_id` a `engine`

Umiestnenie v ovládacom paneli: `Dashboard -> Context & Cache -> Compression Combos`.

## Rozhranie API

| Trasa                                  | Účel                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------ |
| `/api/settings/compression`            | Globálne nastavenia kompresie (zahŕňajú konfiguráciu `mcpAccessibility`) |
| `/api/compression/preview`             | Náhľad ľubovoľného režimu kompresie                                      |
| `/api/compression/language-packs`      | Zoznam dostupných jazykových balíkov Caveman                             |
| `/api/context/caveman/config`          | Alias nastavení Caveman                                                  |
| `/api/context/rtk/config`              | Predvolené hodnoty a nastavenia RTK                                      |
| `/api/context/rtk/filters`             | Katalóg filtrov RTK                                                      |
| `/api/context/rtk/test`                | Koncový bod na náhľad/testovanie RTK                                     |
| `/api/context/rtk/raw-output/[id]`     | Autentifikované obnovenie redigovaného nespracovaného výstupu            |
| `/api/context/combos`                  | Operácie CRUD pre kombinácie kompresie                                   |
| `/api/context/combos/[id]/assignments` | Operácie CRUD pre priradenia kombinácií smerovania                       |
| `/api/context/analytics`               | Alias analytiky kompresie                                                |

Trasy správy vyžadujú autentifikáciu správy alebo kontroly zásad pre kľúč API.

## Nástroje MCP

Kompresia poskytuje päť nástrojov MCP:

| Nástroj                             | Rozsah              | Účel                                                  |
| ----------------------------------- | ------------------- | ----------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Nastavenia, analytika, štatistiky vyrovnávacej pamäte |
| `omniroute_compression_configure`   | `write:compression` | Aktualizácia globálnych nastavení                     |
| `omniroute_set_compression_engine`  | `write:compression` | Nastavenie režimu a voliteľného pipeline              |
| `omniroute_list_compression_combos` | `read:compression`  | Zoznam kombinácií kompresie                           |
| `omniroute_compression_combo_stats` | `read:compression`  | Čítanie analytiky kombinácií/modulov                  |

## Rozsah a vylúčenia

**Embeddingy sa nikdy nekomprimujú.** `open-sse/handlers/embeddings.ts` nikdy nevolá žiadny
kompresný modul — telá požiadaviek/odpovedí prechádzajú priamo do exekútora bez zmeny.
V súčasnosti je to zabezpečené štruktúrou (embeddingy a dokončenia chatu používajú oddelené obslužné rutiny), nie
kontrolou za behu, znamená to však, že problém skreslenia vektorov uvedený v #8034 nemá
v ceste embeddingov žiadny povrch vystavenia.

**Filter vylúčení podľa modelu/koncového bodu (#8034).** Pri dokončeniach chatu môže operátor zadať
ID modelov/ciele `provider/model`, ktoré sa nikdy nesmú komprimovať — ochranné opatrenie užitočné v prípade,
že sa kompresia neskôr zapojí bližšie k ceste susediacej s embeddingami, a všeobecne užitočné
pre každý model, pri ktorom záleží na presnej bajtovej zhode promptu (deterministické vyhodnotenia, prefixy
citlivé na vyrovnávaciu pamäť atď.).

- Pole nastavení: `exclusions?: string[]` v globálnej konfigurácii kompresie
  (`GET`/`PUT /api/settings/compression`), uchovávané prostredníctvom existujúceho priestoru názvov kompresie `key_value`
  (`src/lib/db/compression.ts`) — bez novej tabuľky.
- Karta ovládacieho panela: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Syntax vzorov: `*` je jediný zástupný znak. Každý ďalší metaznak regulárnych výrazov vo vzore sa
  pred porovnaním escapuje, takže `gpt-5.6` zodpovedá iba doslovnému reťazcu, nikdy nie `gpt-5x6`
  (odolné voči ReDoS, ohraničené, bez vnorených kvantifikátorov). Vzory sa porovnávajú bez ohľadu na veľkosť písmen
  so samotným ID modelu aj so zloženým reťazcom `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  aj `openai/*` fungujú a samotné `*` vylúči každý model.
- Porovnávanie: `isCompressionExcluded()` / `normalizeCompressionExclusions()` v
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` kontroluje vylúčený cieľ
  ihneď po vyriešení nastavení kompresie, **pred spustením akéhokoľvek modulu**, a so zhodou
  zaobchádza presne tak, ako keby bola kompresia globálne zakázaná — telo požiadavky je preukázateľne
  bajtovo identické. Preskočenie sa zaznamenáva prostredníctvom `writeCompressionSkip(..., "excluded")`, aby bolo
  viditeľné v analytike.
- Predvolené nastavenie (prázdny/chýbajúci zoznam): identické so správaním pred #8034 — nič nie je vylúčené.

## Známe obmedzenia

- **LLMLingua-2 (SLM) vyžaduje spoločne umiestnené voliteľné závislosti.** Worker sa v
  produkčnom builde spustí iba vtedy, keď sú `@atjsh/llmlingua-2` a partnerské závislosti spoločne umiestnené v
  `dist/node_modules` (pozrite `scripts/build/colocateOptionals.mjs`, #4286). Bez nich
  engine zlyhá bezpečným spôsobom (vráti pôvodný text). Rozlíšenie workera už nezávisí od
  `import.meta.url` (v samostatnom bundle prestane fungovať) — opiera sa o cwd behového prostredia
  / `argv[1]`.
- **Jazykové balíky Caveman `de` / `fr` / `ja` sú čiastočné.** Obsahujú pravidlá `context` +
  `filler` + `structural`, ale neobsahujú balíky `dedup` / `ultra`, takže intenzita `ultra` nie je
  pre tieto jazyky silnejšia ako `full` (používajú iba vlastné pravidlá — neexistuje žiadny
  tichý návrat k anglickým pravidlám `dedup`/`ultra`, ktoré by skomolili cudzojazyčný text).
  `en` / `es` / `id` / `pt-BR` sú úplné. Príspevky s `dedup.json` + `ultra.json`
  pre čiastočné balíky sú vítané.
- **Telemetria vrstveného spracovania uvádza iba enginy, ktoré vykonali kompresiu.** Krok vrstveného pipeline, ktorého
  engine sa spustil, ale dosiahol úsporu 0 %, vráti `stats:null`, a preto sa nezobrazí v
  `engineBreakdown` — nemožno ho odlíšiť od kroku, ktorý bol preskočený. Rozlíšenie medzi
  „spustené, 0 %“ a „preskočené“ by si vyžadovalo zmenu modelu rozpisu a je odložené.

## Overenie

Cielené kontroly pre túto oblasť sú:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
