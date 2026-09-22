# Compression Engines (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute-komprimering bygger på motorkontrakt. Ett läge kan köra en motor direkt
(`caveman` eller `rtk`) eller en deterministisk staplad pipeline som kör flera motorer i ordningsföljd.

## Lägen

| Läge         | Motorsökväg                               | Avsedd indata                                             |
| ------------ | ----------------------------------------- | --------------------------------------------------------- |
| `off`        | ingen                                     | Exakt bevarande av prompten                               |
| `lite`       | Caveman lite-hjälpfunktioner              | Kontinuerlig rensning med låg risk                        |
| `standard`   | Caveman                                   | Komprimering av promptar med naturligt språk              |
| `aggressive` | Caveman + historik-/verktygssammanfattare | Långa chattsessioner                                      |
| `ultra`      | Caveman + beskärningshjälpare             | Återställning vid kontextgränsen                          |
| `rtk`        | RTK                                       | Utdata från terminal, skal, bygge, test och git           |
| `omniglyph`  | OmniGlyph                                 | Kontext som bild via leverantörens ursprungliga protokoll |
| `stacked`    | Pipeline, standard `rtk -> caveman`       | Blandade verktygsloggar och prosa, maximal besparing      |

### Komprimeringsprofiler för OmniGlyph

Motorn `omniglyph` (paketet `omniglyph`, 1.4.0+) accepterar en namngiven semantisk profil, som anges
globalt via `omniglyph.profile` i komprimeringsinställningarna eller per steg via
stegkonfigurationen för den staplade pipelinen:

| Profil        | Gräns                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Standard. Policyn som de publicerade mätresultaten baserades på — avbildar systemprompt, verktygsdokumentation och tät historik |
| `balanced`    | Behåller aktuellt tillstånd i ursprungligt format, skyddar de senaste 8 turerna och slår ihop äldre avslutad historik           |
| `coding-safe` | Behåller auktoritet, verktygsscheman och aktuella verktygsutdata i ursprungligt format samt skyddar de senaste 12 turerna       |
| `passthrough` | Vidarebefordrar utan omvandling; motorn hoppas över                                                                             |

Profilen är ett **tak, inte ett golv**: `mergeCompressionProfileOptions` i paketet
vägrar låta en anroparåsidosättning återöppna en informationsförlorande kanal som profilen har stängt, så
`preserveSystemPrompt: false` per steg kan inte återaktivera systemkomprimering under `coding-safe`.

Mätt på denna kodbas höjer `coding-safe` och `balanced` `minCompressChars` till dess
maxvärde och behåller systemprompt, verktygsscheman och verktygsresultat i ursprungligt format, så en session som ännu inte har
samlat på sig historik stannar vid `below_min_chars` och motorn omvandlar ingenting. Det
är därför standardvärdet är `aggressive` i stället för den säkraste profilen.

Paketet fastställer självt sitt modellomfång och sin profil från sin miljökonfiguration.
OmniRoute delegerar aldrig beslutet: adaptern låser modellgrinden till paketets
mest restriktiva omfång, så värdmiljöns inställningar kan bara begränsa tillåtelselistan, aldrig
utöka den bortom OmniRoutes uppmätta resultat.

## Motorregister

Registret finns i `open-sse/services/compression/engines/registry.ts`. Motorerna exponerar ett gemensamt
kontrakt:

- `id`: stabilt motor-id, exempelvis `caveman` eller `rtk`
- `apply(text, config)`: äldre exekveringsväg som används av staplade pipelines
- `compress(input, config)`: primär exekveringsväg som returnerar text + statistik
- `getConfigSchema()`: returnerar den JSON-Schema-liknande strukturen för giltig konfiguration
- `validateConfig(config)`: returnerar `{ valid, errors[] }`

Registrering görs med `registerCompressionEngine(engine)` (eller `registerEngine` för avancerade fall),
som anropar `assertValidEngine()` och `validateConfig(defaultConfig)` före godkännande.
Använd `unregisterCompressionEngine(id)` för att ta bort en motor under körning.

`strategySelector.ts` registrerar de inbyggda motorerna innan komprimeringen körs. Det gör att förhandsgranskning,
körtidskomprimering, staplat läge, tester och framtida motorer kan använda samma exekveringsväg.

### Komprimering av MCP-beskrivningar (relaterat)

Ett separat register komprimerar beskrivningsmetadata för MCP-verktyg på registernivå – se
`open-sse/mcp-server/descriptionCompressor.ts` och [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Det återanvänder
Caveman-regler men arbetar med verktygsmetadata, inte nyttolaster i förfrågningar.

### Ytterligare inbyggda motorer

Utöver Caveman, RTK och LLMLingua-2 innehåller registret flera specialiserade förlustfria /
strukturella motorer (som används av staplade pipelines, testmiljön och tester):

| Motor         | Id              | Vad den gör                                                                                                                                                                       |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): ersätter stora sammanhängande textblock med innehållsadresserade referenser, så att upprepade/stora block skickas en gång och därefter refereras. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): förlustfri tabellkomprimering av homogena nyttolaster med JSON-arrayer till ett kolumnbaserat `[N rows]`-format.                                          |
| ionizer       | `ionizer`       | Samplar rader från början, mitten och slutet i mycket stora homogena block och lagrar den utelämnade mitten som en innehållsadresserad CCR-referens.                              |
| session-dedup | `session-dedup` | Innehållsadresserad deduplicering mellan turer (inspirerad av TokenMizer): utelämnar text som redan förekommit i tidigare turer under samma session.                              |

**Instruktion för CCR-hämtningsprotokollet (#8033):** första gången CCR ersätter ≥1 block i en
förfrågan lägger motorn till ett enda idempotent `system`-meddelande först (som inleds med
sentineln `[CCR protocol]`) som lär anroparen kontraktet mellan markör och verktyg: vad en
`[CCR retrieve hash=<24hex> chars=N]`-markör betyder, att hashvärdet måste kopieras ordagrant
(alla 24 hexadecimala tecken – felkopierade hashvärden är den sannolika orsaken till
missar av typen "block not found") och att en `[dedup:ref sha=...]`-markör betyder "titta bakåt i historiken", inte "anropa
verktyget". Informationen infogas **endast när anroparens annonserade `tools[]` bevisar att den
faktiskt kan nå `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` i
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) – en vanlig
OpenAI-kompatibel anropare utan det verktyget får aldrig en instruktion om att anropa något
som den inte kan nå. Idempotens säkerställs genom att meddelandehistoriken genomsöks efter sentineln
före infogning, så att förfrågningar med flera turer (som spelar upp tidigare meddelanden igen) inte staplar
informationen en gång per tur.

## Caveman

Caveman-läget fokuserar på semantisk kondensering av vanlig prosa:

- bevarar kodblock, URL:er, JSON, sökvägar och strukturerade data
- tar bort utfyllnad, garderingar, upprepad kontext och omständliga sambandsfraser
- stöder språkanpassade filregelpaket i `open-sse/services/compression/rules/`
- är fortsatt tillgängligt via de äldre lägena `standard`, `aggressive` och `ultra`

Instrumentpanelsvyn finns under `Dashboard -> Context & Cache -> Caveman`.

Caveman uppströms rapporterar `~75%` färre utdatatokens, `65%` genomsnittlig utdatabesparing i prestandatester
med ett intervall på `22-87%`, samt ett verktyg för indatakomprimering på `~46%`. OmniRoute använder Cavemans siffra för
indatasidan vid dokumentation av kombinerade besparingar för promptar/kontext; Cavemans utdataläge förblir en separat
funktion för svarsbeteende.

## RTK

RTK-läget fokuserar på utdata från kommandon och verktyg:

- identifierar utdataklasser som `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo-/Go-tester, TypeScript-/Vite-/Webpack-byggen, ESLint, npm-granskningar/-installationer, Docker-loggar,
  skalets `find`/`grep`, stackspårningar och generiska loggar
- tillämpar 49 JSON-filter från `open-sse/services/compression/engines/rtk/filters/`
- stöder den deklarativa pipelinen i RTK-stil: borttagning av ANSI, ersättning, kortslutning vid matchande utdata,
  borttagning/bevarande av rader, trunkering per rad, trunkering av början/slutet/maximalt antal rader samt reservvärde vid tomt resultat
- stöder projektfilter som styrs av förtroende i `.rtk/filters.json` och globala filter i
  `DATA_DIR/rtk/filters.json`
- tar bort ANSI-sekvenser, förloppsbrus, upprepade rader och oanvändbar standardtext
- bevarar åtgärdbara fel, varningar, sammanfattningar, ändrade filer och avslutande kontext
- kan valfritt behålla maskerade rådata för återställning/felsökning via autentiserade administrationsrutter

Instrumentpanelsvyn finns under `Dashboard -> Context & Cache -> RTK`.

Driftsinformation om anpassade filter, förtroende, verifiering och återställning av råutdata finns i
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK uppströms rapporterar besparingar på `60-90%` för komprimering av kommandoutdata. Exemplet i dess README visar att en
30 minuter lång Claude Code-session minskar från `~118,000` tokens till `~23,900`, vilket motsvarar en besparing på `79.7%`.

## LLMLingua-2 (semantisk beskärning)

LLMLingua-2-läget utför **semantisk beskärning av tokens** i prosa med hjälp av en liten ONNX-klassificerare för
tokens, som kompletterar de regelbaserade Caveman- och RTK-motorerna:

- komprimerar endast prosa i meddelanden som inte är systemmeddelanden; inhägnade kodblock och andra bevarade
  konstruktioner ändras aldrig
- kör `@atjsh/llmlingua-2`-backenddelen (ONNX via `@huggingface/transformers`) i en
  arbetstråd, så att modellinferens aldrig blockerar begärans händelseloop
- är **staplingsbar** (`stackPriority` 35): i en staplad pipeline körs den efter de
  strukturella motorerna (CCR, session-dedup, headroom, Caveman) men före `ultra`, eftersom
  semantisk beskärning är effektivast på text som redan har komprimerats strukturellt — t.ex.
  `rtk -> caveman -> llmlingua`
- **fortsätter utan fel vid alla typer av fel** (saknade valfria beroenden, start av arbetstråd, modellinläsning, inferens
  eller tidsgräns) → originaltexten returneras oförändrad, aldrig ett fel

Motorns plats: `open-sse/services/compression/engines/llmlingua/`. Instrumentpanelsvyn
finns under `Dashboard -> Context & Cache -> LLMLingua`.

### Modeller

Standardmodellen är **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
snabb). En **BERT-base**-modell med högre noggrannhet (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) är tillgänglig via fältet `model` i motorkonfigurationen. `@huggingface/transformers`
hämtar den valda modellen vid behov från HuggingFace Hub till
`${DATA_DIR}/models/llmlingua` vid det första anropet (`modelStore.ts`); en åsidosättande `modelPath`-konfiguration
pekar i stället på en lokal kopia (för offlineinstallationer/installationer utan nätverksåtkomst).

### Valfria beroenden och installation vid behov

LLMLinguas beskärningsbara stack med körningsberoenden är **valfri**. Två paket deklareras som
`optionalDependencies` i `package.json` och hålls **externa** av produktionsbygget
(`scripts/build/prepublish.ts` paketerar inte dem):

| Paket                | Version (låst) | Anmärkningar                                     |
| -------------------- | -------------- | ------------------------------------------------ |
| `@atjsh/llmlingua-2` | `2.0.5`        | Ingångspaket; deklarerar de andra som peer-paket |
| `js-tiktoken`        | `^1.0.20`      | Tokeniserare                                     |

`@huggingface/transformers` är låst till `^4.2.0` (delas med sökvägen för lokala inbäddningar och
spåras även in i det fristående paketet); `@atjsh/llmlingua-2@2.0.5` använder det som peer med
`"^3.5.2 || ^4.0.0"`, så både Transformers.js v3 och v4 stöds. Sedan 2.0.4
kräver `@atjsh/llmlingua-2` inte längre `@tensorflow/tfjs`, vilket tog bort den största enskilda
bidragande komponenten (TensorFlow.js) från SLM-stacken. Endast de två paketen ovan är beskärningsbara SLM-
peer-paket. En vanlig `npm install` (utveckling) installerar automatiskt den valfria stacken om valfria
beroenden inte utelämnas.

**Varför vid behov:** det npm-publicerade paketet, det fristående paketet och Docker-avbildningen
levereras **utan** dessa beroenden för att förbli kompakta. När de saknas misslyckas arbetstrådens beroendekontroll
(en uppslagningskontroll av `@atjsh/llmlingua-2` i `worker.ts`) och motorn
**fortsätter tyst utan fel** — att välja LLMLingua blir en no-op (texten returneras oförändrad och inget
fel loggas). Installera den valfria stacken för att aktivera den i en beskuren miljö:

```bash
# lås till versionerna som deklareras i package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Borttagningen av `@tensorflow/tfjs` (2.0.4+) eliminerar den tidigare dominerande komponenten på ~800 MB
— det återstående utrymmesbehovet utgörs av transformers.js- och onnxruntime-node-körmiljöerna
samt TinyBERT-modellen (~57 MB), som hämtas vid första användningen (inte via npm).

Per miljö:

- **Utveckling / `npm install`** — installeras automatiskt om du inte angav `--omit=optional`
  (eller `--no-optional`). Ingen åtgärd krävs.
- **Global npm (`npm i -g omniroute`) / fristående installation** — kör installationskommandot ovan i
  den installerade paketkatalogen eller installera om utan att utelämna valfria beroenden.
- **Docker** — lägg till installationskommandot i ett härlett avbildningslager; den publicerade avbildningen
  levereras avsiktligt i ett minimalt utförande.
- **VPS (PM2)** — installera i programmets `node_modules` och starta sedan om processen så att
  workern kontrollerar grinden på nytt.
- **Obehandlad fristående Next-version (`npm run build` → `.build/next/standalone/server.js`)** — den
  fristående spårningen inkluderar VARKEN workern eller de valfria beroendena, så motorn
  går obemärkt över till öppet läge vid fel. `scripts/build/colocate-standalone.mjs` återställer båda (worker-esbuild +
  de valfria beroendenas transitiva beroenden i det fristående katalogträdet); det körs automatiskt via npm-hooken
  `postbuild` efter varje bygge. Idempotent och fortsätter utan fel när beroenden saknas.

**Verifiera att den är aktiv:** när LLMLingua är valt minskar faktisk prosa verkligen i storlek (motorn
slutar gå över till öppet läge vid fel), och den första begäran utlöser modellhämtningen till
`${DATA_DIR}/models/llmlingua`. Grinden söker avsiktligt endast efter `@atjsh/llmlingua-2` —
de andra peer-beroendena är endast ESM-baserade och `require.resolve` genererar ett undantag för dem även när de finns — så
workern går fortfarande över till öppet läge vid fel om något peer-beroende faktiskt saknas vid `import()`-tillfället.

## Staplade pipelines

Staplat läge kör pipeline-stegen i ordningsföljd. Standardinställningen är:

```txt
rtk -> caveman
```

Använd detta för sessioner med kodningsagenter där en prompt kombinerar kommandoutdata med prosa från en människa eller assistent. RTK minskar först brusiga verktygsloggar och därefter komprimerar Caveman återstående naturligt språk.

Pipeline-stegen konfigureras med `stackedPipeline` i komprimeringsinställningarna eller via komprimeringskombinationer.

När båda motorerna minskar samma kvalificerade nyttolast förstärks besparingarna:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP-filter för tillgänglighetsträd

Det smarta MCP-filtret för tillgänglighetsträd är ett komprimeringslager efter körning som tillämpas på MCP-verktygens **verktygsresultat**, inte på prompter eller kontext. Det är inriktat på de utförliga nyttolaster för tillgänglighetsträd och webbläsarögonblicksbilder som returneras av verktyg som Playwright, computer-use och MCP-servrar för webbläsarautomatisering.

### Vad det gör

1. **Borttagning av brus** — tar bort tomma generiska poster och textposter (`- generic:`, `- text: ""`)
2. **Komprimering av syskonelement** — när ≥ `collapseThreshold` (standardvärde 30) efterföljande rader är strukturella upprepningar komprimeras de till de första `collapseKeepHead` (standardvärde 10) raderna + en sammanfattning av antalet + de sista `collapseKeepTail` (standardvärde 5) raderna
3. **Bevarande av referenser** — `[ref=eXX]`-ankare som krävs av Playwright/computer-use ändras aldrig
4. **Hård trunkering** — om texten efter komprimering fortfarande överskrider `maxTextChars` (standardvärde 50 000) trunkeras den med en navigeringsanvisning så att agenten kan fortsätta arbeta

### Motorns plats

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← startpunkt för smartFilterText()
  collapseRepeated.ts ← algoritm för komprimering av syskonelement
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiguration

Styrs av `compression.mcpAccessibility` i de globala inställningarna (migrering 056). Standardkonfiguration:

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

Filtret tillämpas endast på nyttolaster med verktygsresultat vars `type` är `"text"` och vars längd överskrider `minLengthToProcess`. Det påverkar inte promptkomprimering eller nyttolaster i begäranden.

### Förväntade besparingar

60–80 % för verktygsresultat med webbläsarögonblicksbilder, beroende på sidans komplexitet. Komprimeringsalgoritmen har O(n)-komplexitet räknat i antal rader och tillför försumbar latens.

### Det här filtret jämfört med komprimeringsmotorerna ovan

| Aspekt         | Caveman / RTK / Stacked           | MCP-filter för tillgänglighet          |
| -------------- | --------------------------------- | -------------------------------------- |
| Mål            | Prompter/kontext i begäranden     | MCP-verktygsresultat                   |
| Utlösare       | Inställning för komprimeringsläge | `compression.mcpAccessibility.enabled` |
| Omfattning     | Alla SSE-meddelanden              | Endast verktygsresultat                |
| Referensankare | Ej tillämpligt                    | Bevaras ovillkorligen                  |

---

## Komprimeringskombinationer

Komprimeringskombinationer är namngivna komprimeringsprofiler som kan tilldelas routningskombinationer:

- `compression_combos`: lagrar läge, pipeline, RTK-konfiguration, språkkonfiguration och standardmarkör
- `compression_combo_assignments`: mappar en komprimeringskombination till en routningskombination
- körtidsintegrationen löser en tilldelad komprimeringskombination före generiska åsidosättningar av kombinationer
- analysdata inkluderar `compression_combo_id` och `engine`

Plats i kontrollpanelen: `Dashboard -> Context & Cache -> Compression Combos`.

## API-yta

| Rutt                                   | Syfte                                                                            |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globala komprimeringsinställningar (inkluderar `mcpAccessibility`-konfiguration) |
| `/api/compression/preview`             | Förhandsgranska valfritt komprimeringsläge                                       |
| `/api/compression/language-packs`      | Lista tillgängliga Caveman-språkpaket                                            |
| `/api/context/caveman/config`          | Alias för Caveman-inställningar                                                  |
| `/api/context/rtk/config`              | RTK-standardvärden och inställningar                                             |
| `/api/context/rtk/filters`             | RTK-filterkatalog                                                                |
| `/api/context/rtk/test`                | Slutpunkt för RTK-förhandsgranskning/test                                        |
| `/api/context/rtk/raw-output/[id]`     | Autentiserad återställning av maskerad råutdata                                  |
| `/api/context/combos`                  | CRUD för komprimeringskombinationer                                              |
| `/api/context/combos/[id]/assignments` | CRUD för tilldelningar av routningskombinationer                                 |
| `/api/context/analytics`               | Alias för komprimeringsanalys                                                    |

Hanteringsrutter kräver hanteringsautentisering eller policykontroller för API-nycklar.

## MCP-verktyg

Komprimering exponerar fem MCP-verktyg:

| Verktyg                             | Omfattning          | Syfte                                     |
| ----------------------------------- | ------------------- | ----------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Inställningar, analysdata, cachestatistik |
| `omniroute_compression_configure`   | `write:compression` | Uppdatera globala inställningar           |
| `omniroute_set_compression_engine`  | `write:compression` | Ange läge och valfri pipeline             |
| `omniroute_list_compression_combos` | `read:compression`  | Lista komprimeringskombinationer          |
| `omniroute_compression_combo_stats` | `read:compression`  | Läs analysdata för kombinationer/motorer  |

## Omfattning och undantag

**Inbäddningar komprimeras aldrig.** `open-sse/handlers/embeddings.ts` anropar aldrig någon
komprimeringsmotor – innehållet i begäran/svaret skickas direkt till exekveraren utan ändringar.
Detta är strukturellt i dag (inbäddningar och chattkompletteringar har separata hanterare), inte en
körtidskontroll, men det innebär att risken för vektorförvrängning i #8034 inte har någon exponeringsyta
i inbäddningsflödet.

**Undantagsfilter per modell/slutpunkt (#8034).** För chattkompletteringar kan en operatör ange
modell-id:n/`provider/model`-mål som aldrig får komprimeras – en skyddsmekanism som är användbar om
komprimering senare kopplas närmare ett flöde intill inbäddningar, och generellt användbar
för alla modeller där en exakt byte-för-byte-prompt är viktig (deterministiska utvärderingar, cachekänsliga
prefix osv.).

- Inställningsfält: `exclusions?: string[]` i den globala komprimeringskonfigurationen
  (`GET`/`PUT /api/settings/compression`), beständigt lagrad via det befintliga `key_value`-namnområdet för komprimering
  (`src/lib/db/compression.ts`) – ingen ny tabell.
- Flik i kontrollpanelen: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Mönstersyntax: `*` är det enda jokertecknet. Alla andra reguljära uttrycks metatecken i ett mönster
  escapes före matchning, så `gpt-5.6` matchar endast den bokstavliga strängen, aldrig `gpt-5x6`
  (ReDoS-säkert, begränsat, inga nästlade kvantifierare). Mönster matchas skiftlägesokänsligt mot
  både modell-id:t och den sammansatta strängen `provider/model` – `gpt-5-6`, `openai/gpt-5-6`
  och `openai/*` fungerar alla, och enbart `*` undantar varje modell.
- Matchning: `isCompressionExcluded()` / `normalizeCompressionExclusions()` i
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` kontrollerar det undantagna målet
  direkt efter att komprimeringsinställningarna har lösts, **innan någon motor körs**, och behandlar en matchning
  exakt som om komprimering vore globalt inaktiverad – innehållet i begäran är bevisligen
  byte-identiskt. Överhoppningen registreras via `writeCompressionSkip(..., "excluded")` för
  synlighet i analysdata.
- Standardvärde (tom/saknad lista): identiskt med beteendet före #8034 – ingenting undantas.

## Kända begränsningar

- **LLMLingua-2 (SLM) kräver samlokaliserade valfria beroenden.** Workern körs endast i en
  produktionsbuild när `@atjsh/llmlingua-2` + peer-beroenden är samlokaliserade i
  `dist/node_modules` (se `scripts/build/colocateOptionals.mjs`, #4286). Utan dem
  tillämpar motorn en fail-open-strategi (returnerar originaltexten). Worker-upplösningen är inte längre beroende av
  `import.meta.url` (det fungerar inte i det fristående paketet) — den förankras i körningens
  cwd / `argv[1]`.
- **Caveman-språkpaketen `de` / `fr` / `ja` är ofullständiga.** De innehåller regler för `context` +
  `filler` + `structural`, men inga paket för `dedup` / `ultra`, så intensiteten `ultra` är
  inte starkare än `full` för dessa språk (de använder endast sina egna regler — det finns ingen
  tyst återgång till de engelska reglerna för `dedup`/`ultra`, vilket skulle förvanska utländsk text).
  `en` / `es` / `id` / `pt-BR` är kompletta. Bidrag med `dedup.json` + `ultra.json`
  för de ofullständiga paketen välkomnas.
- **Stackad telemetri listar endast motorer som utförde komprimering.** Ett steg i en stackad pipeline vars
  motor kördes men gav 0 % besparing returnerar `stats:null` och visas därför inte i
  `engineBreakdown` — det går inte att skilja från ett steg som hoppades över. Att skilja
  ”kördes, 0 %” från ”hoppades över” skulle kräva en ändring av nedbrytningsmodellen och har skjutits upp.

## Validering

De fokuserade kontrollerna för detta område är:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
