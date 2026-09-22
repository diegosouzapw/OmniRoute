# RTK Compression (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK-komprimering er OmniRoutes kommandobevidste komprimeringsmotor til terminal- og værktøjsoutput. Den er
udviklet til coding agent-sessioner, hvor størstedelen af kontekstvæksten kommer fra testlogfiler, build-output,
støj fra pakkehåndteringsværktøjer, shell-transskriptioner, Docker-output, git-output og stack traces.

RTK kan køre direkte med `defaultMode: "rtk"` eller som det første trin i en sammensat pipeline, typisk:

```txt
rtk -> caveman
```

Denne rækkefølge komprimerer først støjende maskinoutput og lader derefter Caveman kondensere den resterende prosa.

Det oprindelige RTK-projekt rapporterer besparelser på `60-90%` for kommandooutput. Eksempelsessionen i dets README går fra
`~118,000` standardtokens til `~23,900` RTK-tokens, hvilket svarer til en besparelse på `79.7%` (`~80%`). OmniRoute bruger
dette oprindelige gennemsnit til beregningen af den samlede besparelse med Caveman-inputkomprimering:

```txt
RTK-gennemsnit:  80% besparelse
Caveman-input:   46% besparelse
Samlet:          1 - (1 - 0.80) * (1 - 0.46) = 89.2% besparelse
Interval:        1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Hvad den komprimerer

Det indbyggede katalog leveres i øjeblikket med 49 filtre fordelt på disse kategorier:

| Kategori  | Eksempler                                                     |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, Go-tests, Cargo-tests       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, generiske shell-logfiler                |
| `docker`  | `docker ps`, Docker-logfiler                                  |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | JSON-output, stack traces, generisk reservefilter til output  |

Detektoren i `open-sse/services/compression/engines/rtk/commandDetector.ts` klassificerer output
før filtervalget. Filtre kan også matche efter kommandomønster eller regulært udtryk for output, når en
kommandoklasse ikke er tilstrækkelig.

## Filterbestemmelse

RTK indlæser filtre i denne rækkefølge:

1. Projektfiltre fra `.rtk/filters.toml` og `.rtk/filters.json`, men kun når de er betroede.
2. Globale filtre fra `DATA_DIR/rtk/filters.toml` og `DATA_DIR/rtk/filters.json`.
3. Indbyggede filtre fra `open-sse/services/compression/engines/rtk/filters/`.

Inden for det samme anvendelsesområde har RTK TOML schema v1-filtre forrang frem for OmniRoute JSON-filtre. TOML-
`match_command`-udtryk kontrolleres før matchning efter kommandotype, så et importeret kommandospecifikt
filter kan tilsidesætte et bredere filter inden for det pågældende anvendelsesområde. Projektets anvendelsesområde har stadig forrang frem for det globale
anvendelsesområde, uanset filformat.

Projektfiltre er bevidst underlagt tillidskontrol, fordi filtre med regulære udtryk kan ændre, hvordan værktøjsoutput
vises for agenter. En projektfilterfil accepteres, når én af disse betingelser er opfyldt:

- `rtkConfig.trustProjectFilters` er `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` er angivet.
- `.rtk/trust.json` indeholder den matchende SHA-256-hash for projektfilterfilen.

Eksempel på en tillidsfil:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hashene er separate: `filtersSha256` godkender `.rtk/filters.json`, mens `filtersTomlSha256`
godkender `.rtk/filters.toml`. Redigering af en af filerne ugyldiggør kun dens egen tillidspost. Globale filer
installeres af administratoren og bruger den eksisterende tillidsadfærd for globale filtre.

Brugerdefinerede filtre kan være ét filterobjekt eller et array af filterobjekter. Ugyldige brugerdefinerede filtre
springes over og rapporteres af diagnosticeringen i `/api/context/rtk/filters`. Ugyldige indbyggede filtre stopper straks med en fejl.

## Kompatibilitet med RTK TOML-skema v1

OmniRoute kan parse, validere, teste og installere deklarative filterfiler ved hjælp af RTK TOML-skema v1.
De understøttede felter er `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` og indlejrede tests i `[[tests.<filter>]]`.
Ukendte felter, ugyldige eller usikre regulære udtryk, samtidige strip-/bevaringsregler, filer på over
1 MiB og referencer til ukendte filtre afvises. En fil, hvis indlejrede tests mislykkes, kan
valideres med henblik på inspektion, men kan ikke installeres eller indlæses. Indlæsningsfejl for
brugerdefinerede filer forbliver fail-open: Den ugyldige fil springes over, og de resterende filtre
fortsætter med at fungere.

OmniRoute modtager værktøjsoutput, efter at klienten allerede har registreret det, så `filter_stderr = true`
kan ikke ændre procesregistreringen. Feltet accepteres som en no-op, og valideringen returnerer en advarsel.
Dette beskrives bevidst som **kompatibilitet med RTK TOML-skema v1**, ikke fuld kompatibilitet
med den eksekverbare RTK-fil, shell-hooks, Rust-kommandoimplementeringer eller dets trust-store-layout.

Dashboardets avancerede RTK-visning accepterer indsat eller uploadet TOML. Valideringen er skrivebeskyttet.
Installationen skriver `DATA_DIR/rtk/filters.toml` atomisk med restriktive tilladelser og opdaterer
det aktive filterkatalog uden en genstart. Erstatning af en eksisterende fil kræver en udtrykkelig
`overwrite`-bekræftelse og opretter først `DATA_DIR/rtk/filters.toml.bak`.

## Filter-DSL

Filtre bruger JSON-skemaet, der er beskrevet i [Format for komprimeringsregler](./COMPRESSION_RULES_FORMAT.md).
Kørselssystemet anvender disse trin i rækkefølge:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> fjern/medtag linjer
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Vigtige felter:

| Felt                         | Formål                                                             |
| ---------------------------- | ------------------------------------------------------------------ |
| `rules.stripAnsi`            | Fjern terminalens farve-/kontrolsekvenser før matchning            |
| `rules.filterStderr`         | Normaliser almindelige stderr-præfikser før matchning/filtrering   |
| `rules.replace`              | Anvend ordnede erstatninger med regulære udtryk                    |
| `rules.matchOutput`          | Returner et kompakt resumé, når output matcher en kendt betingelse |
| `rules.matchOutput[].unless` | Spring genvejen over, når et fejl-/svigtmønster er til stede       |
| `rules.dropPatterns`         | Fjern støjende linjer                                              |
| `rules.includePatterns`      | Prioriter handlingsanvisende linjer                                |
| `rules.collapsePatterns`     | Slå gentagne matchende linjer sammen                               |
| `rules.deduplicate`          | Tilvalg pr. filter: Slå fortløbende identiske linjer sammen        |
| `rules.truncateLineAt`       | Unicode-sikker afkortning pr. linje                                |
| `rules.onEmpty`              | Reservemeddelelse, hvis alle linjer filtreres fra                  |
| `tests[]`                    | Indlejrede eksempler, der bruges af verifikationskontrollen        |

Indbyggede filtre forventes at indeholde indlejrede `tests[]`-eksempler. Brugerdefinerede filtre bør også
indeholde dem, især når de deles på tværs af projekter.

## Linjededuplikering (to lag)

RTK slår duplikerede linjer sammen i to uafhængige lag:

1. **Pr. filter: `deduplicate` (tilvalg, standardværdi `false`).** Et filter kan angive `rules.deduplicate: true`
   for at slå fortløbende duplikerede linjer sammen _i det output, som det pågældende filter matcher_, før afkortning.
   Dette udføres i `lineFilter.ts`. For ældre filtre aktiveres det automatisk, når filteret definerer
   `collapsePatterns`. Skema: `deduplicate: z.boolean().default(false)` i
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **På tværs af motoren: `deduplicateThreshold` (standardværdi `3`).** Når alle filtre er kørt, slår motoren
   enhver sekvens af `>= deduplicateThreshold` identiske, fortløbende linjer sammen på tværs af hele resultatet
   (`deduplicateRepeatedLines`, anvendt i `engines/rtk/index.ts`). Værdien begrænses til 2–100 ved
   normalisering.

Kørslen pr. filter udføres først (inde i filteret), og kørslen på tværs af motoren udføres sidst (på det sammenføjede
output), så de to fungerer sammen uden dobbelttælling.

## Linjegruppering (`enableGrouping`)

Når `rtkConfig.enableGrouping` er `true` (standardværdi `false`), udfører RTK en ekstra `groupSimilarLines`-
kørsel på resultatet efter deduplikering, som slår sekvenser af _næsten ens_ (ikke byte-identiske)
fortløbende linjer sammen. `rtkConfig.groupingThreshold` (standardværdi `3`) er den mindste sekvenslængde, der udløser
gruppering. Dette er den strukturelle pendant til `deduplicateThreshold`: deduplikering håndterer eksakte gentagelser,
mens gruppering håndterer "samme form med små forskelle". Begge flag er en del af den `rtkConfig`-JSON,
der gemmes i tabellen `key_value` (se Konfiguration ovenfor), så indstillingen bevares efter genstarter.

## Fjernelse af kodekommentarer (`stripCodeComments` / `preserveDocstrings`)

Når `rtkConfig.applyToCodeBlocks` er aktiveret, kan RTK også fjerne kommentarer fra indhegnede kodeblokke:

- `stripCodeComments` (standardværdi `false`) — tilvalg. Når værdien er `true`, fjerner RTK kommentarer fra indhegnede
  JavaScript- og TypeScript-blokke. Flaget blev historisk set læst, men aldrig anvendt, så standardværdien forbliver
  "bevar" for at undgå en utilsigtet ændring i produktionen.
- `preserveDocstrings` (standardværdi `true`) — når kommentarer fjernes, bevares JSDoc-/`/** … */`-blokkommentarer
  (de indeholder API-dokumentation, som er mere værd end de bytes, de koster). Angiv `false` for også at fjerne
  dem.

Fjernelse af kommentarer er implementeret i `open-sse/services/compression/engines/rtk/codeStripper.ts`. Den bruger
**TypeScript-parseren** (ikke et regulært udtryk), så streng-, skabelon- og regex-literaler aldrig forveksles
med kommentarer, og den afbryder hele processen, når JSX registreres (så kommentarer i JSX-udtrykscontainere
aldrig beskadiges). Fjernelse af kommentarer gælder i øjeblikket **kun JavaScript og TypeScript** — andre
sprog i fjernerens `CodeLanguage`-sæt (Python, Rust, Go, Ruby, Java) får tomme linjer og
mellemrum slået sammen, men kommentarer fjernes ikke. Kørslen for den rensede blok mærkes `rtk:code-strip` i
`rulesApplied`.

> **Bemærk — GCF/tabellarisk kodning er en separat motor.** RTK indeholder **ikke** den tabellariske/kolonnebaserede
> JSON-koder "GCF" (Graph Compact Format). Denne koder — som erstattede en ældre
> `omni-tabular`-koder — findes i **headroom**-motoren
> (`open-sse/services/compression/engines/headroom/`, med det medfølgende kodebibliotek under
> `headroom/gcf/`). Den er ikke relateret til RTK-filterpipelinen, der dokumenteres her.

## Konfiguration

Globale indstillinger er tilgængelige via `/api/settings/compression`. RTK-specifikke indstillinger er også
tilgængelige via `/api/context/rtk/config`.

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

`enabledFilters` og `disabledFilters` bruger filter-id'er, f.eks. `test-vitest` eller `git-diff`.

Den fulde `rtkConfig`-struktur er defineret af `RtkConfig` / `DEFAULT_RTK_CONFIG` i
`open-sse/services/compression/types.ts`. Hele objektet gemmes som én enkelt JSON-værdi i
SQLite-tabellen `key_value` under `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) og normaliseres ved læsning af `normalizeRtkConfig`. Derfor gennemgår hvert felt nedenfor
— herunder `enableGrouping`, `groupingThreshold`, `stripCodeComments` og `preserveDocstrings` —
den samme lagring og bevares efter en genstart.

| Nøgle                  | Standardværdi | Formål                                                                                              |
| ---------------------- | ------------- | --------------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`           | For hele motoren: mindste antal identiske linjer i træk, der skal slås sammen (begrænset til 2–100) |
| `enableGrouping`       | `false`       | Tilvalg: slå sekvenser af næsten ens linjer i træk sammen                                           |
| `groupingThreshold`    | `3`           | Mindste antal lignende linjer i træk, der udløser gruppering                                        |
| `stripCodeComments`    | `false`       | Tilvalg: fjern kommentarer fra indhegnede kodeblokke (kræver `applyToCodeBlocks`)                   |
| `preserveDocstrings`   | `true`        | Behold JSDoc-/`/** … */`-blokke, når kommentarer fjernes                                            |

## API

| Rute                               | Metode | Formål                                             |
| ---------------------------------- | ------ | -------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Læs RTK-konfiguration                              |
| `/api/context/rtk/config`          | PUT    | Opdater RTK-konfiguration                          |
| `/api/context/rtk/filters`         | GET    | Vis filterkatalog og indlæsningsdiagnostik         |
| `/api/context/rtk/import`          | POST   | Valider eller installer RTK TOML-skema-v1-filer    |
| `/api/context/rtk/test`            | POST   | Forhåndsvis RTK-komprimering for én tekstnyttelast |
| `/api/context/rtk/raw-output/[id]` | GET    | Læs bevaret, redigeret råoutput                    |
| `/api/compression/preview`         | POST   | Forhåndsvis enhver komprimeringstilstand           |

RTK-testnyttelast:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Nyttelast til forhåndsvisning af komprimering:

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

Administrationsruter kræver administrationsgodkendelse til dashboardet eller den tilsvarende API-nøglepolitik.

Nyttelast til RTK TOML-validering:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Brug `"action": "install"` til at installere den validerede fil globalt. Tilføj kun `"overwrite": true`
efter at have gennemgået og bekræftet erstatningen af en eksisterende global fil.

## Gendannelse af råoutput

RTK returnerer normalt kun komprimeret tekst. Til fejlfinding kan `rawOutputRetention` bevare redigeret
råoutput:

| Værdi      | Adfærd                                                    |
| ---------- | --------------------------------------------------------- |
| `never`    | Bevar ikke råoutput                                       |
| `failures` | Bevar kun output, der sandsynligvis repræsenterer en fejl |
| `always`   | Bevar alt komprimeret RTK-råoutput efter redigering       |

Bevarede filer skrives under:

```txt
DATA_DIR/rtk/raw-output/
```

Hemmeligheder redigeres før lagring, herunder almindelige bearer-tokens, API-nøgler, Slack-tokens,
AWS-adgangsnøgler og tildelingsværdier som `token=...`, `secret=...`, `password=...`. Analysefunktionen
gemmer kun reference-id, størrelse og hashmetadata.

## Verificeringsport

Den fokuserede verificeringsport kører indbyggede inline-filtertests uden at kalde eksterne kommandoer via shellen:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Den bredere RTK-port er:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Kør den brede komprimeringsport før udgivelse:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Udvidelse af RTK

1. Tilføj eller opdater en filter-JSON-fil.
2. Medtag mindst ét `tests[]`-eksempel, der dokumenterer den vigtige adfærd.
3. Tilføj en fixture under `tests/unit/compression/fixtures/rtk/` for nye kommandofamilier.
4. Tilføj dækning af kommandodetektion, når du introducerer en ny outputklasse.
5. Kør verificeringsporten og den brede RTK-port.
6. Hvis filteret er projektlokalt, skal du committe `.rtk/filters.json` og først opdatere `.rtk/trust.json` efter gennemgang.

---

## Intensitetsniveauer (v3.8.16+)

RTK understøtter **3 intensitetsniveauer**, der afvejer **komprimeringsaggressivitet** mod **sikkerhed**. Niveauet angives via `config.intensity` i motorkonfigurationen.

### De 3 niveauer

| Niveau                | Afkortningsgrænse     | Tokenbesparelse | Risiko    | Bedst egnet til                   |
| --------------------- | --------------------- | --------------- | --------- | --------------------------------- |
| `minimal`             | 24 linjer pr. sektion | ~20-40%         | Meget lav | Produktion med kritisk kontekst   |
| `standard` (standard) | 24 linjer pr. sektion | ~50-70%         | Lav       | Daglige kodningssessioner         |
| `aggressive`          | 16 linjer pr. sektion | ~70-90%         | Middel    | Lange sessioner, maks. besparelse |

### Hvor afkortningen sker

Afkortningsgrænsen påvirker `lineFilter.ts`:

```ts
// Fra open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Både **begyndelsen** og **slutningen** af hver sektion bevares; indholdet i midten fjernes, når afkortningen træder i kraft.

### Hvad bevares, og hvad fjernes

| Indhold                             | minimal    | standard   | aggressive |
| ----------------------------------- | ---------- | ---------- | ---------- |
| Fejl/stack traces                   | ✅ bevares | ✅ bevares | ✅ bevares |
| Testfejl                            | ✅ bevares | ✅ bevares | ✅ bevares |
| Buildfejl                           | ✅ bevares | ✅ bevares | ✅ bevares |
| Beståede tests (detaljeret)         | ✅ bevares | 🟡 skjules | 🟡 skjules |
| Rutineoutput (informationslogfiler) | 🟡 skjules | 🟡 skjules | ❌ fjernes |
| Statusbjælker                       | 🟡 skjules | ❌ fjernes | ❌ fjernes |
| Banner/ASCII-grafik                 | 🟡 skjules | ❌ fjernes | ❌ fjernes |

### Valg af den rette intensitet

```
                  Er tab af kontekst katastrofalt?
                  │
      ┌───────────┼───────────┐
      │           │           │
     JA          NEJ        IKKE SIKKER
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Hvor kritisk    Prøv `standard` først
      │      er kapaciteten? (virker i 80 % af
      │           │          tilfældene)
      │      ┌────┴────┐
      │      │         │
      │     LAV       HØJ
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Konfiguration af intensitet

**Pr. kombination** (i kombinationskonfigurationen):

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

**Programmatisk**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) er en
`CompressionEngine` og har ingen `updateConfig`-metode. Opdater i stedet en motors konfiguration
via registreringshjælperen:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Verificering af effekten

Brug **verificeringsporten** (se nedenfor) til at bekræfte, at dit filter er sikkert ved den valgte intensitet:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtre mislykkedes ved aggressiv intensitet");
}
```

---

## Udvikling af brugerdefinerede filtre (v3.8.16+)

Mappen `engines/rtk/filters/` indeholder **49+ indbyggede JSON-filterfiler**. Du kan tilføje dine egne for at komprimere output fra brugerdefinerede værktøjer, som ikke er dækket af standardindstillingerne.

### Filterskema (Zod)

```ts
{
  "id": "string",                      // Påkrævet. Filteridentifikator (kebab-case, f.eks. "python-traceback")
  "label": "string",                   // Påkrævet. Menneskeligt læsbart filternavn
  "description": "string",             // Valgfrit (standard: ""). Kort beskrivelse af, hvad filteret gør
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Valgfrit (0-100, standard: 50). Udførelsesrækkefølge (højere = først)
  "match": {
    "commands": ["string"],            // Kommandonavne, der skal matches (f.eks. "python", "pytest")
    "patterns": ["string"],            // Regex-mønstre, der skal matches mod output
    "outputTypes": ["string"]          // Registrerede outputklasser (f.eks. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Valgfrit (standard: false). Fjern ANSI-farvekoder
    "replace": [                       // Søg-og-erstat-regler (standard: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Afbryd tidligt ved mønstermatch (standard: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Spring over, hvis dette mønster matcher
      }
    ],
    "includePatterns": ["string"],     // Linjer, der skal bevares (regex-mønstre, standard: [])
    "dropPatterns": ["string"],        // Linjer, der skal fjernes (regex-mønstre, standard: [])
    "collapsePatterns": ["string"],    // Linjer, der skal samles til én forekomst (standard: [])
    "deduplicate": boolean,            // Valgfrit (standard: false). Fjern dublerede linjer
    "truncateLineAt": number,          // Valgfrit (standard: 0). Afkort linjer til det maksimale antal tegn
    "maxLines": number,                // Valgfrit (standard: 0). Fast grænse for det samlede antal linjer
    "headLines": number,               // Valgfrit (standard: 20). Bevar de første N linjer i matchet output
    "tailLines": number,               // Valgfrit (standard: 20). Bevar de sidste N linjer i matchet output
    "onEmpty": "string",               // Valgfrit (standard: ""). Reservemeddelelse, hvis alle linjer filtreres fra
    "filterStderr": boolean            // Valgfrit (standard: false). Filtrer også stderr-output
  },
  "preserve": {
    "errorPatterns": ["string"],       // Mønstre, der altid skal bevares (standard: [])
    "summaryPatterns": ["string"]      // Mønstre for den afsluttende opsummeringslinje (standard: [])
  },
  "tests": [                           // Indlejrede test til verificering (standard: [])
    {
      "name": "string",               // Påkrævet. Testnavn
      "input": "sample output",        // Påkrævet. Eksempel på inputtekst
      "expected": "expected output",   // Påkrævet. Forventet komprimeret output
      "command": "optional command"    // Valgfrit. Kommandokontekst
    }
  ]
}
```

### Eksempel: Python-traceback-filter

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

### Indlæsning af brugerdefinerede filtre

Placer filen på en genkendt placering:

```
~/.omniroute/rtk/filters/my-filter.json     # Brugerniveau
<project>/.rtk/filters/my-filter.json      # Projektniveau
```

Filtre indlæses automatisk ved opstart via `loadRtkFilters()` i `open-sse/services/compression/engines/rtk/filterLoader.ts`. Indlæseren finder filtre fra:

- Indbygget katalog: `open-sse/services/compression/engines/rtk/filters/`
- Brugermappe: `~/.omniroute/rtk/filters/`
- Projektmappe: `<project>/.rtk/filters/`

Sådan indlæses filtre programmatisk:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Indstillinger: customFiltersEnabled (indlæs bruger-/projektfiltre, aktiveret som standard),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validering

Filtre valideres mod Zod-skemaet ved indlæsning. Et filter med en ugyldig struktur kan ikke indlæses og medfører, at der logges en fejl:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

For at validere alle installerede filtre skal du kalde `runRtkFilterTests()`, som eksporteres fra `open-sse/services/compression/engines/rtk/verify.ts`.

### Bedste praksis

1. **Inkluder altid `tests[]`** — de beviser, at dit filter virker, og forhindrer regressioner
2. **Brug `matchOutput` til kortslutninger** — hvis en enkelt linje fortæller hele historien, skal du erstatte hele blokken
3. **Foretræk `keep` frem for `strip`** — eksplicitte regler om "bevar altid" er sikrere end "fjern altid"
4. **Test på alle 3 intensitetsniveauer** — `minimal` bør ikke gøre noget, og `aggressive` bør stadig bevare fejl
5. **Brug feltet `unless`** — beskyt kortslutninger med "udløs ikke, hvis X er til stede"

---

## Gendannelse af råoutput og verificeringsport

Når RTK komprimerer output aggressivt, kan du **gendanne den oprindelige tekst** med henblik på fejlfinding, revision eller genafspilning.

### Sådan fungerer gendannelse af råoutput

```
Oprindeligt output (10K tokens)
        │
        ▼
RTK-komprimering (med rawOutput.enabled=true)
        │
        ├─▶ Komprimeret output (2K tokens)  ──▶ til LLM
        │
        └─▶ Oprindeligt output (10K tokens) ──▶ gemt i DB
                                                  (sammenkædet via request_id)
```

### Aktivering af lagring af råoutput

**Pr. anmodning** (i kombinationskonfigurationen):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // grænse på 1 MB
    }
  }
}
```

**Standard**: `rawOutput.enabled: false` (sparer lagerplads).

### Lageromkostninger

| Pr. anmodning                     | Grænse på 1 MB | Grænse på 10 MB |
| --------------------------------- | -------------- | --------------- |
| Gennemsnitligt komprimeret output | ~5KB           | ~5KB            |
| Lagret råoutput                   | ~50-500KB      | ~500KB-5MB      |
| Ved 1000 anmodninger/dag          | 50-500MB/dag   | 500MB-5GB/dag   |

> **Anbefaling**: Aktivér kun råoutput under **fejlfindingssessioner** eller til **stikprøvebaseret revision**, ikke permanent.

### Gendannelse af originalen

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId fra komprimeringsstatistikken
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` returneres i `CompressionStats.rtkRawOutputPointers[]` efter komprimering.
Se `open-sse/services/compression/engines/rtk/rawOutput.ts:102` for funktionssignaturen.

### Verificeringsporten

**RTK-filterverificeringen** (`open-sse/services/compression/engines/rtk/verify.ts`) validerer alle filtre mod deres `tests[]` og sikrer, at funktionaliteten er korrekt på alle 3 intensitetsniveauer.

**Kald `runRtkFilterTests()`** for at køre verificeringen:

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

**Dette valideres**:

1. Hvert filter indlæses og består skemavalideringen
2. Hver post i `tests[]` producerer det forventede output
3. Intensiteten `minimal` er en no-op (bevarer originalen og anvender kun strukturelle filtre)
4. Intensiteten `aggressive` bevarer fejl, testfejl og stack traces
5. Komprimeret output er aldrig større end det oprindelige input

- Kilde: `open-sse/services/compression/engines/rtk/` (63 filer, ~70KB)

- **Før en filterændring merges** — sørg altid for, at testene består
- **Efter opgradering af RTK-motoren** — skemaet kan være ændret
- **Regelmæssigt i overvågningen** — beskytter mod afvigelser i testfixtures
- **Når en ny værktøjs-/kommandofamilie tilføjes** — dokumenterer, at det nye filter fungerer

---

## Se også

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Komplet oversigt over komprimeringspipelinen
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motorregister og indbyggede motorer
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Tilpassede motorer, sprogpakker og stablede pipelines
- Kilde: `open-sse/services/compression/engines/rtk/` (63 filer, ~70 KB)
