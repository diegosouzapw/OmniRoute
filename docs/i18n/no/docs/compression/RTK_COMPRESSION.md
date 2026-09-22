# RTK Compression (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK-komprimering er OmniRoutes kommandobevisste komprimeringsmotor for terminal- og verktøyutdata. Den er
utformet for økter med kodeagenter, der mesteparten av kontekstveksten kommer fra testlogger, byggutdata,
støy fra pakkebehandlere, skalltranskripsjoner, Docker-utdata, git-utdata og stakksporinger.

RTK kan kjøres direkte med `defaultMode: "rtk"` eller som det første trinnet i en stablet behandlingskjede, vanligvis:

```txt
rtk -> caveman
```

Denne rekkefølgen komprimerer først støyende maskinutdata og lar deretter Caveman kondensere den gjenværende teksten.

Oppstrøms rapporterer RTK en besparelse på `60-90%` for kommandoutdata. Eksempeløkten i README-filen går fra
`~118,000` standardtokens til `~23,900` RTK-tokens, som gir en besparelse på `79.7%` (`~80%`). OmniRoute bruker
dette oppstrømsgjennomsnittet til beregningen av stablet besparelse med Caveman-inndatakomprimering:

```txt
RTK-gjennomsnitt: 80% spart
Caveman-inndata:  46% spart
Stablet:          1 - (1 - 0.80) * (1 - 0.46) = 89.2% spart
Intervall:        1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Hva den komprimerer

Den innebygde katalogen leveres for øyeblikket med 49 filtre fordelt på disse kategoriene:

| Kategori  | Eksempler                                                     |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, Go-tester, Cargo-tester     |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, generiske skalllogger                   |
| `docker`  | `docker ps`, Docker-logger                                    |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | JSON-utdata, stakksporinger, generisk reserve for utdata      |

Detektoren i `open-sse/services/compression/engines/rtk/commandDetector.ts` klassifiserer utdata
før filtervalg. Filtre kan også samsvare etter kommandomønster eller regulært uttrykk for utdata når en
kommandoklasse ikke er tilstrekkelig.

## Filteroppløsning

RTK laster inn filtre i denne rekkefølgen:

1. Prosjektfiltre fra `.rtk/filters.toml` og `.rtk/filters.json`, kun når de er klarert.
2. Globale filtre fra `DATA_DIR/rtk/filters.toml` og `DATA_DIR/rtk/filters.json`.
3. Innebygde filtre fra `open-sse/services/compression/engines/rtk/filters/`.

Innenfor samme omfang har RTK TOML schema v1-filtre forrang fremfor OmniRoute JSON-filtre. TOML-
`match_command`-uttrykk kontrolleres før samsvar med kommandotype, slik at et importert kommandospesifikt
filter kan overstyre et bredere filter innenfor dette omfanget. Prosjektomfang har fortsatt forrang fremfor globalt
omfang, uavhengig av filformat.

Prosjektfiltre er med hensikt underlagt en klareringskontroll fordi filtre med regulære uttrykk kan endre hvordan verktøyutdata
vises til agenter. En prosjektfilterfil godtas når ett av disse kriteriene er oppfylt:

- `rtkConfig.trustProjectFilters` er `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` er angitt.
- `.rtk/trust.json` inneholder den samsvarende SHA-256-hashen for prosjektfilterfilen.

Eksempel på klareringsfil:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hashene er separate: `filtersSha256` klarerer `.rtk/filters.json`, mens `filtersTomlSha256`
klarerer `.rtk/filters.toml`. Redigering av en av filene ugyldiggjør bare dens egen klareringsoppføring. Globale filer
installeres av administratoren og bruker den eksisterende klareringsatferden for globale filtre.

Egendefinerte filtre kan være ett filterobjekt eller en matrise med filterobjekter. Ugyldige egendefinerte filtre
hoppes over og rapporteres av diagnostikken i `/api/context/rtk/filters`. Ugyldige innebygde filtre avbryter umiddelbart.

## Kompatibilitet med RTK TOML-skjema v1

OmniRoute kan analysere, validere, teste og installere deklarative filterfiler som bruker RTK TOML-skjema v1.
De støttede feltene er `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` og integrerte tester av typen `[[tests.<filter>]]`.
Ukjente felt, ugyldige eller usikre regulære uttrykk, samtidige fjernings-/bevaringsregler, filer over
1 MiB og referanser til ukjente filtre avvises. En fil der de integrerte testene mislykkes, kan
valideres for inspeksjon, men kan ikke installeres eller lastes inn. Innlastingsfeil for egendefinerte
filer forblir fail-open: Den ugyldige filen hoppes over, og de gjenværende filtrene fortsetter å fungere.

OmniRoute mottar verktøyutdata etter at klienten allerede har registrert dem, så `filter_stderr = true`
kan ikke endre prosessregistreringen. Feltet godtas som en no-op, og valideringen returnerer en advarsel.
Dette beskrives med hensikt som **kompatibilitet med RTK TOML-skjema v1**, ikke full kompatibilitet
med den kjørbare RTK-filen, shell-hooks, Rust-kommandoimplementasjoner eller utformingen av klareringslageret.

Dashbordets avanserte RTK-visning godtar innlimt eller opplastet TOML. Validering er skrivebeskyttet.
Installasjonen skriver `DATA_DIR/rtk/filters.toml` atomisk med restriktive tillatelser og oppdaterer
den aktive filterkatalogen uten omstart. Erstatning av en eksisterende fil krever uttrykkelig `overwrite`-
bekreftelse og oppretter først `DATA_DIR/rtk/filters.toml.bak`.

## Filter-DSL

Filtre bruker JSON-skjemaet som er beskrevet i [Format for komprimeringsregler](./COMPRESSION_RULES_FORMAT.md).
Kjøremiljøet bruker disse trinnene i denne rekkefølgen:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> fjern/inkluder linjer
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Viktige felt:

| Felt                         | Formål                                                                    |
| ---------------------------- | ------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Fjern terminalens farge-/kontrollsekvenser før samsvarskontroll           |
| `rules.filterStderr`         | Normaliser vanlige stderr-prefikser før samsvarskontroll/filtrering       |
| `rules.replace`              | Utfør ordnede erstatninger med regulære uttrykk                           |
| `rules.matchOutput`          | Returner et kompakt sammendrag når utdata samsvarer med en kjent tilstand |
| `rules.matchOutput[].unless` | Hopp over snarveien når et feil-/sviktmønster finnes                      |
| `rules.dropPatterns`         | Fjern støyende linjer                                                     |
| `rules.includePatterns`      | Foretrekk linjer som kan følges opp                                       |
| `rules.collapsePatterns`     | Slå sammen gjentatte samsvarende linjer                                   |
| `rules.deduplicate`          | Valgfritt per filter: Slå sammen identiske etterfølgende linjer           |
| `rules.truncateLineAt`       | Unicode-sikker avkorting per linje                                        |
| `rules.onEmpty`              | Reservemelding hvis alle linjene filtreres bort                           |
| `tests[]`                    | Integrerte eksempler som brukes av verifiseringsporten                    |

Innebygde filtre forventes å inneholde integrerte `tests[]`-eksempler. Egendefinerte filtre bør også
inneholde dem, særlig når de deles mellom prosjekter.

## Linjededuplisering (to lag)

RTK slår sammen dupliserte linjer i to uavhengige lag:

1. **`deduplicate` per filter (valgfritt, standardverdi `false`).** Et filter kan angi `rules.deduplicate: true`
   for å slå sammen etterfølgende dupliserte linjer _i utdataene som samsvarer med dette filteret_, før avkorting.
   Dette kjøres i `lineFilter.ts`. For eldre filtre aktiveres det automatisk når filteret definerer
   `collapsePatterns`. Skjema: `deduplicate: z.boolean().default(false)` i
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Felles `deduplicateThreshold` for hele motoren (standardverdi `3`).** Etter at alle filtrene er kjørt, slår motoren sammen
   alle sekvenser med `>= deduplicateThreshold` identiske etterfølgende linjer i hele resultatet
   (`deduplicateRepeatedLines`, brukt i `engines/rtk/index.ts`). Verdien begrenses til 2–100 under
   normalisering.

Kjøringen per filter utføres først (inne i filteret), mens kjøringen for hele motoren utføres sist (på de sammenføyde
utdataene), slik at de to kan kombineres uten dobbelttelling.

## Linjegruppering (`enableGrouping`)

Når `rtkConfig.enableGrouping` er `true` (standardverdi `false`), kjører RTK en ekstra `groupSimilarLines`-runde
på resultatet etter deduplisering. Denne slår sammen sekvenser med _nesten likeverdige_ (ikke byte-identiske)
etterfølgende linjer. `rtkConfig.groupingThreshold` (standardverdi `3`) er den minste sekvenslengden som utløser
gruppering. Dette er den strukturelle motparten til `deduplicateThreshold`: Deduplisering håndterer identiske gjentakelser,
mens gruppering håndterer «samme form med små forskjeller». Begge innstillingene er en del av `rtkConfig`-JSON-en
som lagres i `key_value`-tabellen (se Konfigurasjon ovenfor), slik at innstillingen beholdes etter omstarter.

## Fjerning av kodekommentarer (`stripCodeComments` / `preserveDocstrings`)

Når `rtkConfig.applyToCodeBlocks` er aktivert, kan RTK også fjerne kommentarer fra inngjerdede kodeblokker:

- `stripCodeComments` (standardverdi `false`) — valgfritt. Når den er `true`, fjerner RTK kommentarer fra inngjerdede
  JavaScript- og TypeScript-blokker. Historisk ble innstillingen lest, men aldri brukt, så standardverdien forblir
  «behold» for å unngå en utilsiktet endring i produksjon.
- `preserveDocstrings` (standardverdi `true`) — ved fjerning av kommentarer beholdes JSDoc-/`/** … */`-blokkommentarer
  (de inneholder API-dokumentasjon som er mer verdifull enn bytekostnaden). Sett den til `false` for å fjerne
  disse også.

Fjerning av kommentarer er implementert i `open-sse/services/compression/engines/rtk/codeStripper.ts`. Den bruker
**TypeScript-parseren** (ikke et regulært uttrykk), slik at streng-, mal- og regex-literaler aldri forveksles
med kommentarer, og den avbryter hele prosessen når JSX oppdages (slik at kommentarer i JSX-uttrykksbeholdere
aldri ødelegges). Fjerning av kommentarer gjelder for øyeblikket **bare JavaScript og TypeScript** — andre
språk i stripperens `CodeLanguage`-sett (Python, Rust, Go, Ruby, Java) får tomme linjer og
mellomrom slått sammen, men kommentarer fjernes ikke. Kjøringen for den renskede blokken merkes med `rtk:code-strip` i
`rulesApplied`.

> **Merk — GCF/tabellarisk koding er en separat motor.** RTK inneholder **ikke** den tabellariske/kolonnebaserte JSON-koderen
> «GCF» (Graph Compact Format). Denne koderen — som erstattet en eldre
> `omni-tabular`-koder — finnes i **headroom**-motoren
> (`open-sse/services/compression/engines/headroom/`, med den inkluderte kodeken under
> `headroom/gcf/`). Den er ikke relatert til RTK-filterprosessen som er dokumentert her.

## Konfigurasjon

Globale innstillinger er tilgjengelige via `/api/settings/compression`. RTK-spesifikke innstillinger er også
tilgjengelige via `/api/context/rtk/config`.

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

`enabledFilters` og `disabledFilters` bruker filter-ID-er, for eksempel `test-vitest` eller `git-diff`.

Den fullstendige strukturen for `rtkConfig` er definert av `RtkConfig` / `DEFAULT_RTK_CONFIG` i
`open-sse/services/compression/types.ts`. Hele objektet lagres som én enkelt JSON-verdi i
SQLite-tabellen `key_value` under `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), og normaliseres ved lesing av `normalizeRtkConfig`. Dermed blir alle feltene nedenfor
— inkludert `enableGrouping`, `groupingThreshold`, `stripCodeComments` og `preserveDocstrings` —
lagret og lest via det samme lageret og bevart etter en omstart.

| Nøkkel                 | Standardverdi | Formål                                                                                |
| ---------------------- | ------------- | ------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`           | For hele motoren: minste antall identiske linjer på rad som skal slås sammen (2–100)  |
| `enableGrouping`       | `false`       | Valgfritt: slå sammen sekvenser av nesten like linjer som følger etter hverandre      |
| `groupingThreshold`    | `3`           | Minste antall lignende linjer på rad som utløser gruppering                           |
| `stripCodeComments`    | `false`       | Valgfritt: fjern kommentarer fra inngjerdede kodeblokker (krever `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`        | Behold JSDoc-/`/** … */`-blokker når kommentarer fjernes                              |

## API

| Rute                               | Metode | Formål                                             |
| ---------------------------------- | ------ | -------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Les RTK-konfigurasjonen                            |
| `/api/context/rtk/config`          | PUT    | Oppdater RTK-konfigurasjonen                       |
| `/api/context/rtk/filters`         | GET    | Vis filterkatalogen og innlastingsdiagnostikk      |
| `/api/context/rtk/import`          | POST   | Valider eller installer RTK TOML schema v1-filer   |
| `/api/context/rtk/test`            | POST   | Forhåndsvis RTK-komprimering for én tekstnyttelast |
| `/api/context/rtk/raw-output/[id]` | GET    | Les bevart, sladdet råutdata                       |
| `/api/compression/preview`         | POST   | Forhåndsvis en valgfri komprimeringsmodus          |

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

Nyttelast for forhåndsvisning av komprimering:

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

Administrasjonsruter krever administrasjonstilgang til kontrollpanelet eller samsvarende API-nøkkelpolicy.

Nyttelast for RTK TOML-validering:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Bruk `"action": "install"` for å installere den validerte filen globalt. Legg bare til `"overwrite": true`
etter å ha gjennomgått og bekreftet erstatning av en eksisterende global fil.

## Gjenoppretting av råutdata

RTK returnerer normalt bare komprimert tekst. For feilsøking kan `rawOutputRetention` beholde sladdede
råutdata:

| Verdi      | Virkemåte                                               |
| ---------- | ------------------------------------------------------- |
| `never`    | Ikke behold råutdata                                    |
| `failures` | Behold bare utdata som sannsynligvis representerer feil |
| `always`   | Behold alle komprimerte RTK-råutdata etter sladding     |

Beholdte filer skrives under:

```txt
DATA_DIR/rtk/raw-output/
```

Hemmeligheter sladdes før lagring, inkludert vanlige bearer-tokener, API-nøkler, Slack-tokener,
AWS-tilgangsnøkler og tilordningsverdier som `token=...`, `secret=...` og `password=...`. Analyse
lagrer bare peker-ID-en, størrelsen og metadata om hashverdien.

## Verifiseringsport

Den fokuserte verifiseringsporten kjører innebygde tester for innebygde filtre uten å starte eksterne kommandoer:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Den bredere RTK-porten er:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Kjør den brede komprimeringsporten før utgivelse:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Utvidelse av RTK

1. Legg til eller oppdater en JSON-fil for filtre.
2. Inkluder minst ett `tests[]`-eksempel som demonstrerer den viktige virkemåten.
3. Legg til en testressurs under `tests/unit/compression/fixtures/rtk/` for nye kommandofamilier.
4. Legg til dekning for kommandodeteksjon når du introduserer en ny utdataklasse.
5. Kjør verifiseringsporten og den brede RTK-porten.
6. Hvis filteret er lokalt for prosjektet, skal `.rtk/filters.json` legges inn i versjonskontrollen og `.rtk/trust.json` oppdateres først etter gjennomgang.

---

## Intensitetsnivåer (v3.8.16+)

RTK støtter **3 intensitetsnivåer** som balanserer **komprimeringsaggressivitet** mot **sikkerhet**. Nivået angis via `config.intensity` i motorkonfigurasjonen.

### De 3 nivåene

| Nivå                       | Terskel for avkorting | Tokenbesparelse | Risiko    | Best egnet for                     |
| -------------------------- | --------------------- | --------------- | --------- | ---------------------------------- |
| `minimal`                  | 24 linjer per seksjon | ~20-40%         | Svært lav | Produksjon med kritisk kontekst    |
| `standard` (standardverdi) | 24 linjer per seksjon | ~50-70%         | Lav       | Daglige kodeøkter                  |
| `aggressive`               | 16 linjer per seksjon | ~70-90%         | Middels   | Lange økter, maksimale besparelser |

### Hvor avkortingen skjer

Terskelen for avkorting påvirker `lineFilter.ts`:

```ts
// Fra open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Både **begynnelsen** og **slutten** av hver seksjon bevares. Innhold i midten fjernes når avkortingen trer i kraft.

### Hva som beholdes kontra hva som fjernes

| Innhold                                   | minimal         | standard        | aggressive      |
| ----------------------------------------- | --------------- | --------------- | --------------- |
| Feil / stakksporinger                     | ✅ bevart       | ✅ bevart       | ✅ bevart       |
| Mislykkede tester                         | ✅ bevart       | ✅ bevart       | ✅ bevart       |
| Byggefeil                                 | ✅ bevart       | ✅ bevart       | ✅ bevart       |
| Beståtte tester (detaljerte)              | ✅ bevart       | 🟡 slått sammen | 🟡 slått sammen |
| Rutinemessige utdata (informasjonslogger) | 🟡 slått sammen | 🟡 slått sammen | ❌ fjernet      |
| Fremdriftsindikatorer                     | 🟡 slått sammen | ❌ fjernet      | ❌ fjernet      |
| Banner / ASCII-grafikk                    | 🟡 slått sammen | ❌ fjernet      | ❌ fjernet      |

### Valg av riktig intensitet

```
                  Er tap av kontekst katastrofalt?
                  │
      ┌───────────┼───────────┐
      │           │           │
     JA          NEI        USIKKER
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Hvor kritisk    Prøv `standard` først
      │      er kapasiteten? (fungerer i 80 % av
      │           │          tilfellene)
      │      ┌────┴────┐
      │      │         │
      │     LAV       HØY
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Konfigurering av intensitet

**Per kombinasjon** (i kombinasjonskonfigurasjonen):

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
`CompressionEngine` og har ingen `updateConfig`-metode. Oppdater konfigurasjonen til en motor
via registerhjelperen i stedet:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Verifisering av effekten

Bruk **verifiseringsporten** (se nedenfor) for å bekrefte at filteret er sikkert ved den valgte intensiteten:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filters failed at aggressive intensity");
}
```

---

## Utvikling av egendefinerte filtre (v3.8.16+)

Katalogen `engines/rtk/filters/` inneholder **49+ innebygde JSON-filterfiler**. Du kan legge til dine egne for å komprimere utdata fra egendefinerte verktøy som ikke dekkes av standardfiltrene.

### Filterskjema (Zod)

```ts
{
  "id": "string",                      // Obligatorisk. Filteridentifikator (kebab-case, f.eks. "python-traceback")
  "label": "string",                   // Obligatorisk. Menneskelesbart filternavn
  "description": "string",             // Valgfritt (standard: ""). Kort beskrivelse av hva filteret gjør
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Valgfritt (0–100, standard: 50). Kjøringsrekkefølge (høyere = først)
  "match": {
    "commands": ["string"],            // Kommandonavn som skal samsvare (f.eks. "python", "pytest")
    "patterns": ["string"],            // Regex-mønstre som utdata skal samsvare med
    "outputTypes": ["string"]          // Oppdagede utdataklasser (f.eks. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Valgfritt (standard: false). Fjern ANSI-fargekoder
    "replace": [                       // Søk-og-erstatt-regler (standard: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Avslutt tidlig ved mønstertreff (standard: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Hopp over hvis dette mønsteret samsvarer
      }
    ],
    "includePatterns": ["string"],     // Linjer som skal beholdes (regex-mønstre, standard: [])
    "dropPatterns": ["string"],        // Linjer som skal fjernes (regex-mønstre, standard: [])
    "collapsePatterns": ["string"],    // Linjer som skal slås sammen til én forekomst (standard: [])
    "deduplicate": boolean,            // Valgfritt (standard: false). Fjern dupliserte linjer
    "truncateLineAt": number,          // Valgfritt (standard: 0). Avkort linjer til maksimalt antall tegn
    "maxLines": number,                // Valgfritt (standard: 0). Absolutt grense for totalt antall linjer
    "headLines": number,               // Valgfritt (standard: 20). Behold de første N linjene i samsvarende utdata
    "tailLines": number,               // Valgfritt (standard: 20). Behold de siste N linjene i samsvarende utdata
    "onEmpty": "string",               // Valgfritt (standard: ""). Reservemelding hvis alle linjer filtreres bort
    "filterStderr": boolean            // Valgfritt (standard: false). Filtrer også stderr-utdata
  },
  "preserve": {
    "errorPatterns": ["string"],       // Mønstre som alltid må bevares (standard: [])
    "summaryPatterns": ["string"]      // Mønstre for den avsluttende oppsummeringslinjen (standard: [])
  },
  "tests": [                           // Innebygde tester for verifisering (standard: [])
    {
      "name": "string",               // Obligatorisk. Testnavn
      "input": "sample output",        // Obligatorisk. Eksempel på inndatatekst
      "expected": "expected output",   // Obligatorisk. Forventet komprimert utdata
      "command": "optional command"    // Valgfritt. Kommandokontekst
    }
  ]
}
```

### Eksempel: Filter for Python-tilbakesporing

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

### Lasting av egendefinerte filtre

Plasser filen på en gjenkjent plassering:

```
~/.omniroute/rtk/filters/my-filter.json     # På brukernivå
<project>/.rtk/filters/my-filter.json      # På prosjektnivå
```

Filtre lastes automatisk ved oppstart via `loadRtkFilters()` i `open-sse/services/compression/engines/rtk/filterLoader.ts`. Lasteren finner filtre fra:

- Innebygd katalog: `open-sse/services/compression/engines/rtk/filters/`
- Brukerkatalog: `~/.omniroute/rtk/filters/`
- Prosjektkatalog: `<project>/.rtk/filters/`

Slik laster du filtre programmatisk:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Alternativer: customFiltersEnabled (last bruker-/prosjektfiltre, aktivert som standard),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validering

Filtre valideres mot Zod-skjemaet ved innlasting. Et filter med ugyldig struktur kan ikke lastes og vil føre til at en feil logges:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

For å validere alle installerte filtre kan du kalle `runRtkFilterTests()`, som eksporteres fra `open-sse/services/compression/engines/rtk/verify.ts`.

### Anbefalte fremgangsmåter

1. **Inkluder alltid `tests[]`** — de beviser at filteret fungerer og forhindrer regresjoner
2. **Bruk `matchOutput` for tidlige avslutninger** — hvis én enkelt linje forteller hele historien, erstatt hele blokken
3. **Foretrekk `keep` fremfor `strip`** — eksplisitte regler for «alltid behold» er tryggere enn «fjern alltid»
4. **Test på alle de tre intensitetsnivåene** — `minimal` skal ikke gjøre noe, mens `aggressive` fortsatt skal bevare feil
5. **Bruk feltet `unless`** — beskytt tidlige avslutninger med «ikke utløs hvis X er til stede»

---

## Gjenoppretting av råutdata og verifiseringsport

Når RTK komprimerer utdata aggressivt, kan du **gjenopprette den opprinnelige teksten** for feilsøking, revisjon eller avspilling.

### Slik fungerer gjenoppretting av råutdata

```
Opprinnelige utdata (10K tokener)
        │
        ▼
RTK-komprimering (med rawOutput.enabled=true)
        │
        ├─▶ Komprimerte utdata (2K tokener) ──▶ til LLM
        │
        └─▶ Opprinnelige utdata (10K tokener) ──▶ lagret i DB
                                                    (koblet via request_id)
```

### Aktivere lagring av råutdata

**Per forespørsel** (i kombinasjonskonfigurasjonen):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Grense på 1 MB
    }
  }
}
```

**Standard**: `rawOutput.enabled: false` (sparer lagringsplass).

### Lagringskostnad

| Per forespørsel                   | Grense på 1 MB | Grense på 10 MB |
| --------------------------------- | -------------- | --------------- |
| Gjennomsnittlig komprimert utdata | ~5KB           | ~5KB            |
| Lagret råutdata                   | ~50-500KB      | ~500KB-5MB      |
| Med 1000 forespørsler/dag         | 50-500MB/dag   | 500MB-5GB/dag   |

> **Anbefaling**: Aktiver råutdata bare for **feilsøkingsøkter** eller **stikkprøvebasert revisjon**, ikke permanent.

### Gjenopprette originalen

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId fra komprimeringsstatistikken
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` returneres i `CompressionStats.rtkRawOutputPointers[]` etter komprimering.
Se `open-sse/services/compression/engines/rtk/rawOutput.ts:102` for funksjonssignaturen.

### Verifiseringsporten

**RTK-filterverifisering** (`open-sse/services/compression/engines/rtk/verify.ts`) validerer alle filtre mot deres `tests[]` og sikrer at virkemåten er korrekt på alle de tre intensitetsnivåene.

**Kall `runRtkFilterTests()`** for å kjøre verifiseringen:

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

1. Hvert filter lastes inn og består skjemavalideringen
2. Hver `tests[]`-oppføring produserer forventede utdata
3. Intensiteten `minimal` er en no-op (bevarer originalen og bruker bare strukturelle filtre)
4. Intensiteten `aggressive` bevarer feil, testfeil og stakksporinger
5. Komprimerte utdata er aldri større enn de opprinnelige inndataene

- Kilde: `open-sse/services/compression/engines/rtk/` (63 filer, ~70KB)

- **Før en filterendring flettes inn** — sørg alltid for at testene består
- **Etter oppgradering av RTK-motoren** — skjemaet kan ha blitt endret
- **Periodisk under overvåking** — beskytter mot avvik i testfiksturer
- **Når en ny verktøy-/kommandofamilie legges til** — beviser at det nye filteret fungerer

---

## Se også

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Fullstendig oversikt over komprimeringspipelinen
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motorregister og innebygde motorer
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Egendefinerte motorer, språkpakker og stablede pipelines
- Kilde: `open-sse/services/compression/engines/rtk/` (63 filer, ~70 KB)
