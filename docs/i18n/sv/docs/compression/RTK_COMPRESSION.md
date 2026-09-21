# RTK Compression (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK-komprimering är OmniRoutes kommandomedvetna komprimeringsmotor för terminal- och verktygsutdata. Den är
utformad för sessioner med kodningsagenter där den största delen av kontexttillväxten kommer från testloggar, byggutdata,
brus från pakethanterare, skalsessioner, Docker-utdata, git-utdata och stackspårningar.

RTK kan köras direkt med `defaultMode: "rtk"` eller som det första steget i en staplad pipeline, vanligtvis:

```txt
rtk -> caveman
```

Den ordningen komprimerar först brusig maskinutdata och låter sedan Caveman kondensera återstående prosa.

RTK:s uppströmsprojekt rapporterar besparingar på `60-90%` för kommandoutdata. Exempelsessionen i dess README går från
`~118,000` standardtoken till `~23,900` RTK-token, vilket innebär en besparing på `79.7%` (`~80%`). OmniRoute använder
det uppströmsgenomsnittet för beräkningen av staplade besparingar med Caveman-indatakomprimering:

```txt
RTK-genomsnitt: 80% besparing
Caveman-indata: 46% besparing
Staplat:        1 - (1 - 0.80) * (1 - 0.46) = 89.2% besparing
Intervall:      1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Vad som komprimeras

Den inbyggda katalogen innehåller för närvarande 49 filter inom dessa kategorier:

| Kategori  | Exempel                                                         |
| --------- | --------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`               |
| `test`    | Vitest, Jest, Pytest, Playwright, Go-tester, Cargo-tester       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx   |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler   |
| `shell`   | `ls`, `find`, `grep`, generiska skalloggar                      |
| `docker`  | `docker ps`, Docker-loggar                                      |
| `infra`   | Terraform, OpenTofu, `systemctl status`                         |
| `generic` | JSON-utdata, stackspårningar, generell reservlösning för utdata |

Detektorn i `open-sse/services/compression/engines/rtk/commandDetector.ts` klassificerar utdata
innan filter väljs. Filter kan också matcha efter kommandomönster eller reguljära uttryck för utdata när en
kommandoklass inte är tillräcklig.

## Filtermatchning

RTK läser in filter i följande ordning:

1. Projektfilter från `.rtk/filters.toml` och `.rtk/filters.json`, endast när de är betrodda.
2. Globala filter från `DATA_DIR/rtk/filters.toml` och `DATA_DIR/rtk/filters.json`.
3. Inbyggda filter från `open-sse/services/compression/engines/rtk/filters/`.

Inom samma omfång har RTK TOML schema v1-filter företräde framför OmniRoute JSON-filter. TOML-
`match_command`-uttryck kontrolleras före matchning av kommandotyp, så att ett importerat kommandospecifikt
filter kan åsidosätta ett bredare filter inom det omfånget. Projektomfånget har fortfarande företräde framför det globala
omfånget, oavsett filformat.

Projektfilter kräver avsiktligt förtroende eftersom regexfilter kan ändra hur verktygsutdata
visas för agenter. En projektfilterfil godtas när något av följande gäller:

- `rtkConfig.trustProjectFilters` är `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` är inställd.
- `.rtk/trust.json` innehåller den matchande SHA-256-hashen för projektfilterfilen.

Exempel på förtroendefil:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hasharna är separata: `filtersSha256` betror `.rtk/filters.json`, medan `filtersTomlSha256`
betror `.rtk/filters.toml`. Om någon av filerna redigeras ogiltigförklaras endast dess egen förtroendepost. Globala filer
installeras av administratörer och använder det befintliga förtroendebeteendet för globala filter.

Anpassade filter kan vara ett filterobjekt eller en array med filterobjekt. Ogiltiga anpassade filter
hoppas över och rapporteras av diagnostiken i `/api/context/rtk/filters`. Ogiltiga inbyggda filter orsakar omedelbart fel.

## Kompatibilitet med RTK TOML-schema v1

OmniRoute kan tolka, validera, testa och installera deklarativa filterfiler som använder RTK TOML-schema v1.
De fält som stöds är `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` och integrerade tester med `[[tests.<filter>]]`.
Okända fält, ogiltiga eller osäkra reguljära uttryck, samtidiga regler för borttagning och bevarande, filer över
1 MiB samt referenser till okända filter avvisas. En fil vars integrerade tester misslyckas kan
valideras för inspektion men kan inte installeras eller läsas in. Fel vid inläsning av anpassade filer
fortsätter att vara fail-open: den ogiltiga filen hoppas över och de återstående filtren fortsätter att fungera.

OmniRoute tar emot verktygsutdata efter att klienten redan har samlat in dem, så `filter_stderr = true`
kan inte påverka processens insamling. Fältet accepteras utan någon effekt och valideringen returnerar en varning.
Detta beskrivs avsiktligt som **kompatibilitet med RTK TOML-schema v1**, inte fullständig kompatibilitet
med den körbara RTK-filen, shell-hookar, Rust-kommandoimplementationer eller dess trust store-layout.

Instrumentpanelens avancerade RTK-vy accepterar inklistrad eller uppladdad TOML. Valideringen är skrivskyddad.
Installationen skriver atomärt till `DATA_DIR/rtk/filters.toml` med restriktiva behörigheter och uppdaterar
den aktiva filterkatalogen utan omstart. För att ersätta en befintlig fil krävs en uttrycklig bekräftelse med `overwrite`,
och `DATA_DIR/rtk/filters.toml.bak` skapas först.

## Filter-DSL

Filter använder JSON-schemat som beskrivs i [Format för komprimeringsregler](./COMPRESSION_RULES_FORMAT.md).
Vid körning tillämpas dessa steg i följande ordning:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Viktiga fält:

| Fält                         | Syfte                                                                   |
| ---------------------------- | ----------------------------------------------------------------------- |
| `rules.stripAnsi`            | Ta bort terminalens färg-/kontrollsekvenser före matchning              |
| `rules.filterStderr`         | Normalisera vanliga stderr-prefix före matchning/filtrering             |
| `rules.replace`              | Tillämpa ordnade ersättningar med reguljära uttryck                     |
| `rules.matchOutput`          | Returnera en kompakt sammanfattning när utdata matchar ett känt villkor |
| `rules.matchOutput[].unless` | Hoppa över genvägen när ett fel-/misslyckandemönster förekommer         |
| `rules.dropPatterns`         | Ta bort brusiga rader                                                   |
| `rules.includePatterns`      | Prioritera åtgärdsbara rader                                            |
| `rules.collapsePatterns`     | Slå samman upprepade matchande rader                                    |
| `rules.deduplicate`          | Valfritt per filter: slå samman på varandra följande dubblettrader      |
| `rules.truncateLineAt`       | Unicode-säker trunkering per rad                                        |
| `rules.onEmpty`              | Reservmeddelande om alla rader filtreras bort                           |
| `tests[]`                    | Integrerade exempel som används av verifieringsspärren                  |

Inbyggda filter förväntas innehålla integrerade `tests[]`-exempel. Anpassade filter bör också innehålla
dem, särskilt när de delas mellan projekt.

## Raddubblettborttagning (två lager)

RTK slår samman dubblettrader i två oberoende lager:

1. **`deduplicate` per filter (valfritt, standardvärde `false`).** Ett filter kan ange `rules.deduplicate: true`
   för att slå samman identiska efterföljande rader _i filtrets matchade utdata_, före trunkering.
   Detta körs i `lineFilter.ts`. För äldre filter aktiveras det automatiskt när filtret definierar
   `collapsePatterns`. Schema: `deduplicate: z.boolean().default(false)` i
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Motoromfattande `deduplicateThreshold` (standardvärde `3`).** När alla filter har körts slår motorn samman
   alla sekvenser med `>= deduplicateThreshold` identiska efterföljande rader i hela resultatet
   (`deduplicateRepeatedLines`, tillämpas i `engines/rtk/index.ts`). Värdet begränsas till 2–100 vid
   normalisering.

Passet per filter körs först (inuti filtret), och det motoromfattande passet körs sist (på den sammanfogade
utdatan), så de kan kombineras utan dubbelräkning.

## Radgruppering (`enableGrouping`)

När `rtkConfig.enableGrouping` är `true` (standardvärde `false`) kör RTK ytterligare ett `groupSimilarLines`-pass
på resultatet efter dubblettborttagningen, vilket slår samman sekvenser av _nästan likvärdiga_ (inte byte-identiska)
efterföljande rader. `rtkConfig.groupingThreshold` (standardvärde `3`) är den minsta sekvenslängd som utlöser
gruppering. Detta är den strukturella motsvarigheten till `deduplicateThreshold`: dubblettborttagning hanterar exakta upprepningar,
medan gruppering hanterar ”samma form med små skillnader”. Båda flaggorna ingår i `rtkConfig`-JSON-data
som lagras beständigt i tabellen `key_value` (se Konfiguration ovan), så inställningen finns kvar efter omstarter.

## Borttagning av kodkommentarer (`stripCodeComments` / `preserveDocstrings`)

När `rtkConfig.applyToCodeBlocks` är aktiverat kan RTK även ta bort kommentarer från inhägnade kodblock:

- `stripCodeComments` (standardvärde `false`) — valfritt. När värdet är `true` tar RTK bort kommentarer från inhägnade
  JavaScript- och TypeScript-block. Historiskt lästes flaggan men tillämpades aldrig, så standardvärdet förblir
  ”bevara” för att undvika en tyst ändring i produktionsmiljön.
- `preserveDocstrings` (standardvärde `true`) — när kommentarer tas bort bevaras JSDoc-/`/** … */`-blockkommentarer
  (de innehåller API-dokumentation som är värd mer än de byte de kostar). Ange `false` för att även ta bort
  dessa.

Kommentarborttagningen är implementerad i `open-sse/services/compression/engines/rtk/codeStripper.ts`. Den använder
**TypeScript-parsern** (inte ett reguljärt uttryck), så att sträng-, mall- och regexliteraler aldrig felaktigt tolkas
som kommentarer, och den avbryter helt när JSX identifieras (så kommentarer i JSX-uttrycksbehållare
aldrig skadas). Kommentarborttagning tillämpas för närvarande **endast på JavaScript och TypeScript** — andra
språk i stripparens `CodeLanguage`-uppsättning (Python, Rust, Go, Ruby, Java) får tomma rader och
blanksteg komprimerade, men kommentarer tas inte bort. Körningen för det bearbetade blocket märks med `rtk:code-strip` i
`rulesApplied`.

> **Obs! — GCF/tabellkodning är en separat motor.** RTK innehåller **inte** den tabell-/kolumnbaserade JSON-kodaren ”GCF”
> (Graph Compact Format). Den kodaren — som ersatte en äldre
> `omni-tabular`-kodare — finns i **headroom**-motorn
> (`open-sse/services/compression/engines/headroom/`, med den medföljande kodeken under
> `headroom/gcf/`). Den är inte relaterad till RTK-filterpipelinen som dokumenteras här.

## Konfiguration

Globala inställningar är tillgängliga via `/api/settings/compression`. RTK-specifika inställningar är också
tillgängliga via `/api/context/rtk/config`.

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

`enabledFilters` och `disabledFilters` använder filter-ID:n, till exempel `test-vitest` eller `git-diff`.

Den fullständiga strukturen för `rtkConfig` definieras av `RtkConfig` / `DEFAULT_RTK_CONFIG` i
`open-sse/services/compression/types.ts`. Hela objektet lagras beständigt som ett enda JSON-värde i
SQLite-tabellen `key_value` under `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) och normaliseras vid läsning av `normalizeRtkConfig`. Därför går varje fält nedan
— inklusive `enableGrouping`, `groupingThreshold`, `stripCodeComments` och `preserveDocstrings` —
en tur och retur genom samma lagring och finns kvar efter en omstart.

| Nyckel                 | Standardvärde | Syfte                                                                              |
| ---------------------- | ------------- | ---------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`           | För hela motorn: minsta antal identiska rader i följd som komprimeras (2–100)      |
| `enableGrouping`       | `false`       | Valfritt: komprimera sekvenser av nästan likvärdiga rader i följd                  |
| `groupingThreshold`    | `3`           | Minsta antal liknande rader i följd som utlöser gruppering                         |
| `stripCodeComments`    | `false`       | Valfritt: ta bort kommentarer från inhägnade kodblock (kräver `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`        | Behåll JSDoc-/`/** … */`-block när kommentarer tas bort                            |

## API

| Rutt                               | Metod | Syfte                                                       |
| ---------------------------------- | ----- | ----------------------------------------------------------- |
| `/api/context/rtk/config`          | GET   | Läs RTK-konfiguration                                       |
| `/api/context/rtk/config`          | PUT   | Uppdatera RTK-konfiguration                                 |
| `/api/context/rtk/filters`         | GET   | Lista filterkatalog och laddningsdiagnostik                 |
| `/api/context/rtk/import`          | POST  | Validera eller installera RTK TOML-schemafiler av version 1 |
| `/api/context/rtk/test`            | POST  | Förhandsgranska RTK-komprimering för en textnyttolast       |
| `/api/context/rtk/raw-output/[id]` | GET   | Läs bevarad, redigerad råutdata                             |
| `/api/compression/preview`         | POST  | Förhandsgranska valfritt komprimeringsläge                  |

RTK-testnyttolast:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Nyttolast för förhandsgranskning av komprimering:

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

Hanteringsrutter kräver hanteringsautentisering för kontrollpanelen eller motsvarande API-nyckelpolicy.

Nyttolast för RTK TOML-validering:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Använd `"action": "install"` för att installera den validerade filen globalt. Lägg endast till `"overwrite": true`
efter att ha granskat och bekräftat ersättningen av en befintlig global fil.

## Återställning av råutdata

RTK returnerar normalt endast komprimerad text. För felsökning kan `rawOutputRetention` behålla redigerad
råutdata:

| Värde      | Beteende                                                   |
| ---------- | ---------------------------------------------------------- |
| `never`    | Behåll inte råutdata                                       |
| `failures` | Behåll endast utdata som sannolikt indikerar ett fel       |
| `always`   | Behåll all komprimerad råutdata från RTK, efter redigering |

Bevarade filer skrivs under:

```txt
DATA_DIR/rtk/raw-output/
```

Hemligheter redigeras innan beständig lagring, inklusive vanliga bearer-token, API-nycklar, Slack-token,
AWS-åtkomstnycklar och värden i tilldelningsformatet `token=...`, `secret=...`, `password=...`. Analysdata
lagrar endast pekar-id, storlek och hashmetadata.

## Verifieringsgrind

Den fokuserade verifieringsgrinden kör inbyggda tester av inline-filter utan att anropa externa kommandon via skalet:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Den bredare RTK-grinden är:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Kör den breda komprimeringsgrinden före en release:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Utöka RTK

1. Lägg till eller uppdatera en JSON-fil för filter.
2. Inkludera minst ett exempel i `tests[]` som bevisar det viktiga beteendet.
3. Lägg till en fixtur under `tests/unit/compression/fixtures/rtk/` för nya kommandofamiljer.
4. Lägg till täckning för kommandodetektering när du introducerar en ny utdataklass.
5. Kör verifieringsgrinden och den breda RTK-grinden.
6. Om filtret är projektspecifikt ska `.rtk/filters.json` checkas in och `.rtk/trust.json` uppdateras först efter granskning.

---

## Intensitetsnivåer (v3.8.16+)

RTK stöder **3 intensitetsnivåer** som balanserar **komprimeringsaggressivitet** mot **säkerhet**. Nivån anges via `config.intensity` i motorkonfigurationen.

### De 3 nivåerna

| Nivå                       | Tröskel för trunkering | Tokenbesparing | Risk       | Bäst för                              |
| -------------------------- | ---------------------- | -------------- | ---------- | ------------------------------------- |
| `minimal`                  | 24 rader per avsnitt   | ~20-40%        | Mycket låg | Produktion med kritisk kontext        |
| `standard` (standardvärde) | 24 rader per avsnitt   | ~50-70%        | Låg        | Dagliga kodningssessioner             |
| `aggressive`               | 16 rader per avsnitt   | ~70-90%        | Medelhög   | Långa sessioner, maximala besparingar |

### Var trunkeringen sker

Trunkeringströskeln påverkar `lineFilter.ts`:

```ts
// Från open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Både **början** och **slutet** av varje avsnitt bevaras; innehåll i mitten tas bort när trunkeringen aktiveras.

### Vad som bevaras respektive tas bort

| Innehåll                         | minimal        | standard       | aggressive     |
| -------------------------------- | -------------- | -------------- | -------------- |
| Fel/stackspårningar              | ✅ bevaras     | ✅ bevaras     | ✅ bevaras     |
| Testfel                          | ✅ bevaras     | ✅ bevaras     | ✅ bevaras     |
| Byggfel                          | ✅ bevaras     | ✅ bevaras     | ✅ bevaras     |
| Godkända tester (utförliga)      | ✅ bevaras     | 🟡 komprimeras | 🟡 komprimeras |
| Rutinutdata (informationsloggar) | 🟡 komprimeras | 🟡 komprimeras | ❌ tas bort    |
| Förloppsindikatorer              | 🟡 komprimeras | ❌ tas bort    | ❌ tas bort    |
| Banderoll/ASCII-konst            | 🟡 komprimeras | ❌ tas bort    | ❌ tas bort    |

### Välja rätt intensitet

```
                  Är förlust av kontext katastrofal?
                  │
      ┌───────────┼───────────┐
      │           │           │
     JA          NEJ        OSÄKER
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Hur kritisk är  Prova `standard` först
      │      genomströmningen? (fungerar i 80 % av
      │           │           fallen)
      │      ┌────┴────┐
      │      │         │
      │     LÅG       HÖG
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Konfigurera intensitet

**Per kombination** (i kombinationskonfigurationen):

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

**Programmatiskt**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) är en
`CompressionEngine` och har ingen `updateConfig`-metod. Uppdatera en motors konfiguration
via registerhjälpfunktionen i stället:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Verifiera effekten

Använd **verifieringsgrinden** (se nedan) för att bekräfta att filtret är säkert vid den valda intensiteten:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtren misslyckades vid aggressiv intensitet");
}
```

---

## Utveckling av anpassade filter (v3.8.16+)

Katalogen `engines/rtk/filters/` innehåller **över 49 inbyggda JSON-filterfiler**. Du kan lägga till egna för att komprimera utdata från anpassade verktyg som inte omfattas av standardfiltren.

### Filterschema (Zod)

```ts
{
  "id": "string",                      // Obligatoriskt. Filteridentifierare (kebab-case, t.ex. "python-traceback")
  "label": "string",                   // Obligatoriskt. Läsbart filternamn
  "description": "string",             // Valfritt (standard: ""). Kort beskrivning av vad filtret gör
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Valfritt (0–100, standard: 50). Körningsordning (högre = först)
  "match": {
    "commands": ["string"],            // Kommandonamn som ska matchas (t.ex. "python", "pytest")
    "patterns": ["string"],            // Reguljära uttryck som ska matcha utdata
    "outputTypes": ["string"]          // Identifierade utdataklasser (t.ex. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Valfritt (standard: false). Ta bort ANSI-färgkoder
    "replace": [                       // Regler för sök och ersätt (standard: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Avsluta direkt vid mönstermatchning (standard: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Hoppa över om detta mönster matchar
      }
    ],
    "includePatterns": ["string"],     // Rader som ska behållas (reguljära uttryck, standard: [])
    "dropPatterns": ["string"],        // Rader som ska tas bort (reguljära uttryck, standard: [])
    "collapsePatterns": ["string"],    // Rader som ska slås ihop till en enda förekomst (standard: [])
    "deduplicate": boolean,            // Valfritt (standard: false). Ta bort duplicerade rader
    "truncateLineAt": number,          // Valfritt (standard: 0). Korta av rader till maximalt antal tecken
    "maxLines": number,                // Valfritt (standard: 0). Absolut gräns för totalt antal rader
    "headLines": number,               // Valfritt (standard: 20). Behåll de första N raderna av matchande utdata
    "tailLines": number,               // Valfritt (standard: 20). Behåll de sista N raderna av matchande utdata
    "onEmpty": "string",               // Valfritt (standard: ""). Reservmeddelande om alla rader filtreras bort
    "filterStderr": boolean            // Valfritt (standard: false). Filtrera även stderr-utdata
  },
  "preserve": {
    "errorPatterns": ["string"],       // Mönster som alltid måste bevaras (standard: [])
    "summaryPatterns": ["string"]      // Mönster för den avslutande sammanfattningsraden (standard: [])
  },
  "tests": [                           // Infogade tester för verifiering (standard: [])
    {
      "name": "string",               // Obligatoriskt. Testnamn
      "input": "sample output",        // Obligatoriskt. Exempel på indatatext
      "expected": "expected output",   // Obligatoriskt. Förväntad komprimerad utdata
      "command": "optional command"    // Valfritt. Kommandokontext
    }
  ]
}
```

### Exempel: filter för Python-spårning

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

### Läsa in anpassade filter

Placera filen på en identifierad plats:

```
~/.omniroute/rtk/filters/my-filter.json     # Användarnivå
<project>/.rtk/filters/my-filter.json      # Projektnivå
```

Filter läses in automatiskt vid start via `loadRtkFilters()` i `open-sse/services/compression/engines/rtk/filterLoader.ts`. Inläsaren hittar filter från:

- Inbyggd katalog: `open-sse/services/compression/engines/rtk/filters/`
- Användarkatalog: `~/.omniroute/rtk/filters/`
- Projektkatalog: `<project>/.rtk/filters/`

Så här läser du in filter programmatiskt:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Alternativ: customFiltersEnabled (läs in användar-/projektfilter, aktiverat som standard),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validering

Filter valideras mot Zod-schemat när de läses in. Ett filter med felaktig struktur kan inte läsas in och ett fel loggas:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

För att validera alla installerade filter anropar du `runRtkFilterTests()`, som exporteras från `open-sse/services/compression/engines/rtk/verify.ts`.

### Bästa praxis

1. **Inkludera alltid `tests[]`** — de bevisar att ditt filter fungerar och förhindrar regressioner
2. **Använd `matchOutput` för tidiga avbrott** — om en enda rad berättar hela historien, ersätt hela blocket
3. **Föredra `keep` framför `strip`** — uttryckliga regler för ”bevara alltid” är säkrare än ”ta alltid bort”
4. **Testa på alla 3 intensitetsnivåer** — `minimal` bör inte göra någonting, och `aggressive` bör fortfarande bevara fel
5. **Använd fältet `unless`** — skydda tidiga avbrott med ”utlös inte om X finns”

---

## Återställning av råutdata och verifieringsspärr

När RTK komprimerar utdata aggressivt kan du **återställa originaltexten** för felsökning, granskning eller återuppspelning.

### Så fungerar återställning av råutdata

```
Ursprungliga utdata (10K token)
        │
        ▼
RTK-komprimering (med rawOutput.enabled=true)
        │
        ├─▶ Komprimerade utdata (2K token)  ──▶ till LLM
        │
        └─▶ Ursprungliga utdata (10K token) ──▶ lagras i DB
                                                   (länkade via request_id)
```

### Aktivera lagring av råutdata

**Per begäran** (i kombinationskonfigurationen):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Gräns på 1 MB
    }
  }
}
```

**Standardvärde**: `rawOutput.enabled: false` (sparar lagringsutrymme).

### Lagringskostnad

| Per begäran                      | Gräns på 1 MB | Gräns på 10 MB |
| -------------------------------- | ------------- | -------------- |
| Genomsnittlig komprimerad utdata | ~5KB          | ~5KB           |
| Lagrade råutdata                 | ~50-500KB     | ~500KB-5MB     |
| Vid 1 000 begäranden/dag         | 50-500MB/dag  | 500MB-5GB/dag  |

> **Rekommendation**: Aktivera endast råutdata för **felsökningssessioner** eller **stickprovsbaserad granskning**, inte permanent.

### Återställa originalet

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId från komprimeringsstatistiken
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` returneras i `CompressionStats.rtkRawOutputPointers[]` efter komprimeringen.
Se `open-sse/services/compression/engines/rtk/rawOutput.ts:102` för funktionssignaturen.

### Verifieringsspärren

**RTK-filterverifieringen** (`open-sse/services/compression/engines/rtk/verify.ts`) validerar alla filter mot deras `tests[]` och säkerställer att beteendet är korrekt på alla tre intensitetsnivåerna.

**Anropa `runRtkFilterTests()`** för att köra verifieringen:

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

**Detta valideras**:

1. Varje filter läses in och godkänns vid schemavalideringen
2. Varje post i `tests[]` producerar förväntade utdata
3. Intensiteten `minimal` är en no-op (bevarar originalet och tillämpar endast strukturella filter)
4. Intensiteten `aggressive` bevarar fel, testfel och stackspårningar
5. Komprimerade utdata är aldrig större än ursprungliga indata

- Källa: `open-sse/services/compression/engines/rtk/` (63 filer, ~70KB)

- **Innan en filterändring slås samman** — säkerställ alltid att testerna godkänns
- **Efter uppgradering av RTK-motorn** — schemat kan ha ändrats
- **Regelbundet i övervakningen** — skyddar mot avvikelser i testfixturer
- **När en ny verktygs-/kommandofamilj läggs till** — bevisar att det nya filtret fungerar

---

## Se även

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Fullständig översikt över komprimeringspipelines
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motorregister och inbyggda motorer
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Anpassade motorer, språkpaket och staplade pipelines
- Källa: `open-sse/services/compression/engines/rtk/` (63 filer, ~70 kB)
