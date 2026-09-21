# Compression Engines (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute-komprimering er bygget op omkring engine-kontrakter. En tilstand kan køre én engine direkte
(`caveman` eller `rtk`) eller en deterministisk, stakket pipeline, der kører flere engines i rækkefølge.

## Tilstande

| Tilstand     | Engine-forløb                        | Tilsigtet input                                  |
| ------------ | ------------------------------------ | ------------------------------------------------ |
| `off`        | ingen                                | Nøjagtig bevarelse af prompten                   |
| `lite`       | Caveman lite-hjælpefunktioner        | Altid aktiveret oprydning med lav risiko         |
| `standard`   | Caveman                              | Kondensering af prompts i naturligt sprog        |
| `aggressive` | Caveman + historik-/værktøjsresumeer | Lange chatsessioner                              |
| `ultra`      | Caveman + beskæringsfunktioner       | Genoprettelse ved kontekstgrænsen                |
| `rtk`        | RTK                                  | Output fra terminal, shell, build, test og git   |
| `omniglyph`  | OmniGlyph                            | Kontekst som billede via udbyderens native kanal |
| `stacked`    | Pipeline, standard `rtk -> caveman`  | Blandede værktøjslogs og prosa, maks. besparelse |

### OmniGlyph-komprimeringsprofiler

`omniglyph`-enginen (pakken `omniglyph`, 1.4.0+) accepterer en navngivet semantisk profil, som angives
globalt via `omniglyph.profile` i komprimeringsindstillingerne eller pr. trin via konfigurationen
for et trin i den stakkede pipeline:

| Profil        | Grænse                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Standard. Den politik, som de offentliggjorte målinger målte — omdanner system, værktøjsdokumentation og tæt historik til billeder |
| `balanced`    | Bevarer aktiv tilstand i native format, beskytter de seneste 8 ture og komprimerer ældre, afsluttet historik                       |
| `coding-safe` | Bevarer autoritet, værktøjsskemaer og aktivt værktøjsoutput i native format og beskytter de seneste 12 ture                        |
| `passthrough` | Router uden transformering; enginen springes over                                                                                  |

Profilen er et **loft, ikke et gulv**: `mergeCompressionProfileOptions` i pakken
forhindrer en kalderoverskrivning i at genåbne en tabsgivende kanal, som profilen har lukket, så en `preserveSystemPrompt: false`
pr. trin ikke kan genaktivere systemkomprimering under `coding-safe`.

Målt på denne kodebase hæver `coding-safe` og `balanced` `minCompressChars` til maksimumværdien
og bevarer system, værktøjsskemaer og værktøjsresultater i native format, så en session, der endnu ikke
har akkumuleret historik, stopper ved `below_min_chars`, og enginen transformerer intet. Derfor
er standarden `aggressive` frem for den sikreste profil.

Pakken bestemmer sit eget modelomfang og sin egen profil ud fra sin miljøkonfiguration.
OmniRoute uddelegerer aldrig beslutningen: adapteren fastlåser modelbegrænsningen til pakkens
mest restriktive omfang, så værtsmiljøets indstillinger kun kan indsnævre listen over tilladte modeller, aldrig
udvide den ud over OmniRoutes målte resultater.

## Engineregister

Registeret findes i `open-sse/services/compression/engines/registry.ts`. Engines eksponerer en fælles
kontrakt:

- `id`: stabilt engine-id såsom `caveman` eller `rtk`
- `apply(text, config)`: ældre eksekveringssti, der bruges af stablede pipelines
- `compress(input, config)`: primær eksekveringssti, der returnerer tekst + statistik
- `getConfigSchema()`: returnerer den JSON-Schema-lignende struktur for en gyldig konfiguration
- `validateConfig(config)`: returnerer `{ valid, errors[] }`

Registrering bruger `registerCompressionEngine(engine)` (eller `registerEngine` i avancerede tilfælde),
som kalder `assertValidEngine()` og `validateConfig(defaultConfig)` før godkendelse.
Brug `unregisterCompressionEngine(id)` til at fjerne en engine under kørsel.

`strategySelector.ts` registrerer de indbyggede engines, før komprimeringen kører. Dette gør det muligt for forhåndsvisning,
kørselskomprimering, stablet tilstand, tests og fremtidige engines at bruge den samme eksekveringssti.

### Komprimering af MCP-beskrivelser (relateret)

Et separat register komprimerer beskrivelsesmetadata for MCP-værktøjer på registerniveau — se
`open-sse/mcp-server/descriptionCompressor.ts` og [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Det genbruger
Caveman-regler, men arbejder på værktøjsmetadata og ikke request-payloads.

### Yderligere indbyggede engines

Ud over Caveman, RTK og LLMLingua-2 indeholder registeret flere specialiserede tabsfri /
strukturelle engines (der bruges af stablede pipelines, playgrounden og tests):

| Engine        | Id              | Hvad den gør                                                                                                                                                                  |
| ------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): erstatter store sammenhængende tekstblokke med indholdsadresserede referencer, så gentagne/store blokke sendes én gang og derefter refereres. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): tabsfri tabelbaseret komprimering af homogene JSON-array-payloads til en kolonnebaseret `[N rows]`-form.                                              |
| ionizer       | `ionizer`       | Sampling af rækker fra begyndelsen, midten og slutningen af meget store homogene blokke, hvor den udeladte midte gemmes som en CCR-indholdsadresseret reference.              |
| session-dedup | `session-dedup` | Indholdsadresseret deduplikering på tværs af ture (inspireret af TokenMizer): udelader tekst, der allerede er set i tidligere ture i samme session.                           |

**CCR-instruktion til retrieve-protokollen (#8033):** Første gang CCR erstatter ≥1 blok i en
request, tilføjer enginen en enkelt, idempotent `system`-meddelelse først (som begynder med
`[CCR protocol]`-sentinellen), der lærer kalderen kontrakten mellem markør og værktøj: hvad en
`[CCR retrieve hash=<24hex> chars=N]`-markør betyder, at hashen skal kopieres ordret
(alle 24 hex-tegn — fejl i kopierede hashes er den sandsynlige årsag til fejlmeddelelsen "block not found"),
og at en `[dedup:ref sha=...]`-markør betyder "se tilbage i historikken", ikke "kald
værktøjet". Noten indsættes **kun, når kalderens annoncerede `tools[]` beviser, at den
rent faktisk kan nå `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` i
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — en almindelig
OpenAI-kompatibel kalder uden dette værktøj modtager aldrig en instruktion om at kalde noget,
den ikke kan nå. Idempotens håndhæves ved at scanne meddelelseshistorikken efter sentinellen
før indsættelse, så requests med flere ture (som afspiller tidligere meddelelser igen) ikke ophober
noten én gang pr. tur.

## Caveman

Caveman-tilstand fokuserer på semantisk kondensering af almindelig prosa:

- bevarer kodeblokke, URL'er, JSON, stier og strukturerede data
- fjerner fyldord, forbehold, gentagen kontekst og omstændelige forbindelsesformuleringer
- understøtter sprogspecifikke filregelsæt i `open-sse/services/compression/rules/`
- er fortsat tilgængelig via de ældre tilstande `standard`, `aggressive` og `ultra`

Dashboardplaceringen er `Dashboard -> Kontekst og cache -> Caveman`.

Caveman-projektet rapporterer `~75%` færre outputtokens, `65%` gennemsnitlig outputbesparelse i benchmarks
med et interval på `22-87%` samt et værktøj til inputkomprimering på `~46%`. OmniRoute bruger Cavemans tal for
inputkomprimering ved dokumentation af kombinerede prompt-/kontekstbesparelser; Cavemans outputtilstand er fortsat
en separat funktion til styring af svaradfærd.

## RTK

RTK-tilstand fokuserer på output fra kommandoer og værktøjer:

- registrerer outputklasser såsom `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo-/Go-tests, TypeScript-/Vite-/Webpack-builds, ESLint, npm-audits/-installationer, Docker-logfiler,
  shell-kommandoerne `find`/`grep`, stack traces og generiske logfiler
- anvender 49 JSON-filtre fra `open-sse/services/compression/engines/rtk/filters/`
- understøtter den deklarative pipeline i RTK-stil: fjernelse af ANSI, erstatning, tidlig afslutning ved outputmatch,
  fjernelse/bevarelse af linjer, afkortning pr. linje, afkortning efter start/slutning/maksimalt antal linjer samt fallback ved tomt output
- understøtter tillidsbegrænsede projektfiltre i `.rtk/filters.json` og globale filtre i
  `DATA_DIR/rtk/filters.json`
- fjerner ANSI-sekvenser, fremskridtsstøj, gentagne linjer og unødvendig standardtekst
- bevarer handlingsrelevante fejl, advarsler, oversigter, ændrede filer og afsluttende kontekst
- kan valgfrit bevare redigeret råoutput til gendannelse/fejlfinding via godkendte administrationsruter

Dashboardplaceringen er `Dashboard -> Kontekst og cache -> RTK`.

Driftsoplysninger om brugerdefinerede filtre, tillid, verificering og gendannelse af råoutput findes i
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK-projektet rapporterer besparelser på `60-90%` ved komprimering af kommandooutput. Eksemplet i projektets README viser en
30-minutters Claude Code-session, der reduceres fra `~118,000` tokens til `~23,900`, svarende til en besparelse på `79.7%`.

## LLMLingua-2 (semantisk beskæring)

LLMLingua-2-tilstand udfører **semantisk tokenbeskæring** af prosa ved hjælp af en lille ONNX-tokenklassifikator
som supplement til de regelbaserede Caveman- og RTK-motorer:

- komprimerer kun prosa i ikke-systemmeddelelser; indhegnede kodeblokke og andre bevarede
  konstruktioner ændres aldrig
- kører `@atjsh/llmlingua-2`-backenddelen (ONNX via `@huggingface/transformers`) i en
  worker-tråd, så modelinferens aldrig blokerer anmodningens event loop
- kan **kombineres** (`stackPriority` 35): I en kombineret pipeline kører den efter de
  strukturelle motorer (CCR, session-dedup, headroom, Caveman), men før `ultra`, da
  semantisk beskæring er mest effektiv på tekst, der allerede er strukturelt komprimeret — f.eks.
  `rtk -> caveman -> llmlingua`
- **fortsætter uden fejl ved enhver fejl** (manglende valgfrie afhængigheder, start af worker, modelindlæsning, inferens
  eller timeout) → den oprindelige tekst returneres uændret, aldrig en fejl

Motorplacering: `open-sse/services/compression/engines/llmlingua/`. Dashboardplaceringen
er `Dashboard -> Kontekst og cache -> LLMLingua`.

### Modeller

Standardmodellen er **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
hurtig). En **BERT-base**-model med højere nøjagtighed (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) er tilgængelig via motorens konfigurationsfelt `model`. `@huggingface/transformers`
downloader den valgte model efter behov fra HuggingFace Hub til
`${DATA_DIR}/models/llmlingua` ved det første kald (`modelStore.ts`); en tilsidesættelse med konfigurationsfeltet `modelPath`
peger i stedet på en lokal kopi (offline-/air-gapped-installationer).

### Valgfrie afhængigheder og installation efter behov

LLMLinguas runtime-peer-stack, der kan beskæres, er **valgfri**. To pakker er angivet som
`optionalDependencies` i `package.json` og holdes **eksterne** af produktionsbuildet
(`scripts/build/prepublish.ts` inkluderer dem ikke i bundtet):

| Pakke                | Version (fastlåst) | Bemærkninger                               |
| -------------------- | ------------------ | ------------------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`            | Indgangspakke; angiver de øvrige som peers |
| `js-tiktoken`        | `^1.0.20`          | Tokenizer                                  |

`@huggingface/transformers` er fastlåst til `^4.2.0` (deles med den lokale embeddings-sti og
spores også ind i standalone-bundtet); `@atjsh/llmlingua-2@2.0.5` bruger den som peer med
`"^3.5.2 || ^4.0.0"`, så både Transformers.js v3 og v4 understøttes. Siden 2.0.4
kræver `@atjsh/llmlingua-2` ikke længere `@tensorflow/tfjs`, hvilket fjernede den største enkeltstående
komponent (TensorFlow.js) fra SLM-stakken. Kun de to ovenstående pakker er SLM-peers, der kan beskæres.
En almindelig `npm install` (udvikling) installerer automatisk den valgfrie stack, medmindre valgfrie
afhængigheder udelades.

**Hvorfor efter behov:** Den npm-udgivne pakke, standalone-bundtet og Docker-imaget
leveres **uden** disse afhængigheder for at forblive kompakte. Når de mangler, mislykkes workerens
afhængighedskontrol (en `@atjsh/llmlingua-2`-resolve-test i `worker.ts`), og motoren
**fortsætter lydløst uden fejl** — valg af LLMLingua har ingen effekt (teksten returneres uændret, og ingen
fejl logges). Installér den valgfrie stack for at aktivere den i et beskåret miljø:

```bash
# fastlås til de versioner, der er angivet i package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Fjernelsen af `@tensorflow/tfjs` (2.0.4+) eliminerer den tidligere dominerende komponent på ~800 MB
— det resterende lagerforbrug består af transformers.js- og onnxruntime-node-runtimes
samt TinyBERT-modellen (~57 MB), der downloades ved første brug (ikke via npm).

For hvert miljø:

- **Udvikling / `npm install`** — installeres automatisk, medmindre du angav `--omit=optional`
  (eller `--no-optional`). Ingen handling nødvendig.
- **Global npm (`npm i -g omniroute`) / selvstændig installation** — kør installationskommandoen ovenfor i
  den installerede pakkemappe, eller geninstaller uden at udelade valgfrie afhængigheder.
- **Docker** — tilføj installationskommandoen i et afledt image-lag; det publicerede image
  leveres bevidst i en minimal udgave.
- **VPS (PM2)** — installer i appens `node_modules`, og genstart derefter processen, så
  worker-processen kontrollerer gate-funktionen igen.
- **Ubearbejdet selvstændig Next-installation (`npm run build` → `.build/next/standalone/server.js`)** — det
  selvstændige trace indeholder HVERKEN worker-processen eller de valgfrie afhængigheder, så motoren
  går lydløst over i fail-open-tilstand. `scripts/build/colocate-standalone.mjs` tilføjer begge dele igen (worker-esbuild +
  lukning af valgfrie afhængigheder i det selvstændige træ); det køres automatisk via npm-hooket
  `postbuild` efter hvert build. Idempotent og fejltolerant, når afhængigheder mangler.

**Kontrollér, at den er aktiv:** Når LLMLingua er valgt, reduceres rigtig prosa faktisk (motoren
holder op med at gå i fail-open-tilstand), og den første anmodning udløser download af modellen til
`${DATA_DIR}/models/llmlingua`. Gate-funktionen undersøger med vilje kun `@atjsh/llmlingua-2` —
de øvrige peer-afhængigheder er udelukkende ESM-baserede, og `require.resolve` udløser en fejl for dem, selv når de er til stede — så
worker-processen går stadig i fail-open-tilstand, hvis en peer-afhængighed reelt mangler på `import()`-tidspunktet.

## Stablede pipelines

Stablet tilstand kører pipeline-trinnene i rækkefølge. Standarden er:

```txt
rtk -> caveman
```

Brug dette til sessioner med kodningsagenter, hvor en prompt kombinerer kommandooutput med tekst fra et menneske eller en assistent. RTK reducerer først støjende værktøjslogfiler, hvorefter Caveman komprimerer det resterende naturlige sprog.

Pipeline-trin konfigureres med `stackedPipeline` i komprimeringsindstillingerne eller via komprimeringskombinationer.

Når begge motorer reducerer den samme kvalificerede nyttelast, kombineres besparelserne:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP-filter til tilgængelighedstræer

MCP-smartfilteret til tilgængelighedstræer er et komprimeringslag efter udførelse, som behandler MCP-**værktøjsresultater**, ikke prompts eller kontekst. Det er målrettet de omfattende nyttelaster med tilgængelighedstræer og browser-snapshots, der returneres af værktøjer såsom Playwright, computer-use og MCP-servere til browserautomatisering.

### Hvad det gør

1. **Fjernelse af støj** — fjerner tomme generiske poster og tekstposter (`- generic:`, `- text: ""`)
2. **Sammenfoldning af søskendeelementer** — når ≥ `collapseThreshold` (standardværdien er 30) fortløbende linjer er strukturelle gentagelser, foldes de sammen til de første `collapseKeepHead` (standardværdien er 10) linjer + en optællingsoversigt + de sidste `collapseKeepTail` (standardværdien er 5) linjer
3. **Bevarelse af referencer** — `[ref=eXX]`-ankre, der kræves af Playwright/computer-use, ændres aldrig
4. **Hård afkortning** — hvis teksten efter sammenfoldning stadig overstiger `maxTextChars` (standardværdien er 50.000), afkortes den med et navigationshint, så agenten kan fortsætte arbejdet

### Motorens placering

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← indgangspunkt for smartFilterText()
  collapseRepeated.ts ← algoritme til sammenfoldning af søskendeelementer
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiguration

Styres af `compression.mcpAccessibility` i de globale indstillinger (migrering 056). Standardkonfiguration:

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

Filteret anvendes kun på nyttelaster med værktøjsresultater, hvis `type` er `"text"`, og hvis længde overstiger `minLengthToProcess`. Det påvirker ikke komprimering af prompts eller anmodningsnyttelaster.

### Forventede besparelser

60–80 % på værktøjsresultater med browser-snapshots, afhængigt af sidens kompleksitet. Sammenfoldningsalgoritmen er O(n) i forhold til antallet af linjer og tilføjer ubetydelig latenstid.

### Dette filter sammenlignet med komprimeringsmotorerne ovenfor

| Aspekt         | Caveman / RTK / Stacked      | MCP-filter til tilgængelighed          |
| -------------- | ---------------------------- | -------------------------------------- |
| Mål            | Anmodningsprompts / kontekst | MCP-værktøjsresultater                 |
| Udløser        | Indstilling for komprimering | `compression.mcpAccessibility.enabled` |
| Omfang         | Alle SSE-meddelelser         | Kun værktøjsresultater                 |
| Referenceankre | Ikke relevant                | Bevares ubetinget                      |

---

## Komprimeringskombinationer

Komprimeringskombinationer er navngivne komprimeringsprofiler, der kan tildeles routingkombinationer:

- `compression_combos`: gemmer tilstand, pipeline, RTK-konfiguration, sprogkonfiguration og standardmarkør
- `compression_combo_assignments`: knytter en komprimeringskombination til en routingkombination
- runtime-integrationen finder en tildelt komprimeringskombination før generiske kombinationstilsidesættelser
- analyser inkluderer `compression_combo_id` og `engine`

Placering i dashboardet: `Dashboard -> Kontekst og cache -> Komprimeringskombinationer`.

## API-grænseflade

| Rute                                   | Formål                                                                           |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globale komprimeringsindstillinger (inkluderer `mcpAccessibility`-konfiguration) |
| `/api/compression/preview`             | Forhåndsvis enhver komprimeringstilstand                                         |
| `/api/compression/language-packs`      | Vis tilgængelige Caveman-sprogpakker                                             |
| `/api/context/caveman/config`          | Alias for Caveman-indstillinger                                                  |
| `/api/context/rtk/config`              | RTK-standarder og -indstillinger                                                 |
| `/api/context/rtk/filters`             | RTK-filterkatalog                                                                |
| `/api/context/rtk/test`                | RTK-slutpunkt til forhåndsvisning/test                                           |
| `/api/context/rtk/raw-output/[id]`     | Godkendt gendannelse af redigeret råoutput                                       |
| `/api/context/combos`                  | CRUD for komprimeringskombinationer                                              |
| `/api/context/combos/[id]/assignments` | CRUD for tildeling af routingkombinationer                                       |
| `/api/context/analytics`               | Alias for komprimeringsanalyse                                                   |

Administrationsruter kræver administrationsgodkendelse eller kontrol af API-nøglepolitikken.

## MCP-værktøjer

Komprimering stiller fem MCP-værktøjer til rådighed:

| Værktøj                             | Omfang              | Formål                                    |
| ----------------------------------- | ------------------- | ----------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Indstillinger, analyser og cachestatistik |
| `omniroute_compression_configure`   | `write:compression` | Opdater globale indstillinger             |
| `omniroute_set_compression_engine`  | `write:compression` | Angiv tilstand og valgfri pipeline        |
| `omniroute_list_compression_combos` | `read:compression`  | Vis komprimeringskombinationer            |
| `omniroute_compression_combo_stats` | `read:compression`  | Læs analyser for kombinationer/motorer    |

## Omfang og undtagelser

**Embeddings komprimeres aldrig.** `open-sse/handlers/embeddings.ts` kalder aldrig nogen
komprimeringsmotor — anmodnings-/svarindholdet sendes direkte og uændret til eksekveringskomponenten.
Dette er strukturelt i dag (embeddings og chatfuldførelser har separate handlers), ikke et
runtime-tjek, men det betyder, at bekymringen om vektorforvrængning i #8034 ikke har nogen eksponeringsflade
i embeddings-stien.

**Eksklusionsfilter pr. model/slutpunkt (#8034).** For chatfuldførelser kan en operatør angive
model-id'er / `provider/model`-mål, som aldrig må komprimeres — en sikkerhedsforanstaltning, der er nyttig, hvis
komprimering senere forbindes tættere på en embeddings-relateret sti, og generelt nyttig
for enhver model, hvor den præcise prompt byte for byte er vigtig (deterministiske evalueringer, cachefølsomme
præfikser osv.).

- Indstillingsfelt: `exclusions?: string[]` i den globale komprimeringskonfiguration
  (`GET`/`PUT /api/settings/compression`), gemt via det eksisterende `key_value`-navneområde for komprimering
  (`src/lib/db/compression.ts`) — ingen ny tabel.
- Dashboardfane: **Dashboard → Komprimering → Eksklusioner**
  (`/dashboard/compression/exclusions`).
- Mønstersyntaks: `*` er det eneste jokertegn. Alle andre metategn for regulære udtryk i et mønster
  escapes før matchning, så `gpt-5.6` kun matcher den bogstavelige streng og aldrig `gpt-5x6`
  (ReDoS-sikkert, afgrænset, ingen indlejrede kvantifikatorer). Mønstre matches uden forskel på store og små bogstaver mod
  både det rene model-id og den sammensatte `provider/model`-værdi — `gpt-5-6`, `openai/gpt-5-6`
  og `openai/*` fungerer alle, og `*` alene ekskluderer alle modeller.
- Matchning: `isCompressionExcluded()` / `normalizeCompressionExclusions()` i
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` kontrollerer det ekskluderede mål
  umiddelbart efter, at komprimeringsindstillingerne er fundet, **før nogen motor kører**, og behandler et match
  præcis som globalt deaktiveret komprimering — anmodningsindholdet er beviseligt
  byte-identisk. Springet registreres via `writeCompressionSkip(..., "excluded")` for
  synlighed i analyser.
- Standard (tom/fraværende liste): identisk med adfærden før #8034 — intet ekskluderes.

## Kendte begrænsninger

- **LLMLingua-2 (SLM) kræver samplacerede valgfrie afhængigheder.** Workeren kører kun i et
  produktionsbuild, når `@atjsh/llmlingua-2` + peer-afhængigheder er samplaceret i
  `dist/node_modules` (se `scripts/build/colocateOptionals.mjs`, #4286). Uden dem fejler
  motoren åbent (returnerer den oprindelige tekst). Opløsning af workeren afhænger ikke længere af
  `import.meta.url` (det fungerer ikke i den selvstændige bundle) — den forankres i runtime-miljøets
  cwd / `argv[1]`.
- **Caveman-sprogpakkerne `de` / `fr` / `ja` er delvise.** De indeholder regler for `context` +
  `filler` + `structural`, men ingen `dedup`- / `ultra`-pakker, så intensiteten `ultra` er
  ikke stærkere end `full` for disse sprog (de bruger kun deres egne regler — der er ingen
  skjult fallback til de engelske `dedup`/`ultra`-regler, som ville forvanske fremmedsproget tekst).
  `en` / `es` / `id` / `pt-BR` er komplette. Bidrag med `dedup.json` + `ultra.json`
  til de delvise pakker er velkomne.
- **Stablet telemetri viser kun motorer, der komprimerede.** Et trin i en stablet pipeline, hvis
  motor kørte, men gav 0 % besparelse, returnerer `stats:null` og vises derfor ikke i
  `engineBreakdown` — hvilket ikke kan skelnes fra et trin, der blev sprunget over. At skelne mellem
  "kørte, 0 %" og "sprunget over" ville kræve en ændring af breakdown-modellen og er udskudt.

## Validering

De fokuserede kontrolpunkter for dette område er:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
