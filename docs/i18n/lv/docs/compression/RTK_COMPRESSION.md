# RTK Compression (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK kompresija ir OmniRoute komandu izprotošs kompresijas dzinis termināļa un rīku izvadei. Tas ir
paredzēts programmēšanas aģentu sesijām, kurās lielāko daļu konteksta pieauguma rada testu žurnāli, būvējumu izvade,
pakotņu pārvaldnieku radītais troksnis, čaulas sesiju pieraksti, Docker izvade, git izvade un steka izsekojumi.

RTK var darboties tieši ar `defaultMode: "rtk"` vai kā pirmais solis secīgā konveijerā, parasti:

```txt
rtk -> caveman
```

Šāda secība vispirms saspiež trokšņaino mašīnu izvadi un pēc tam ļauj Caveman saīsināt atlikušo prozu.

Sākotnējais RTK ziņo par `60-90%` komandu izvades ietaupījumu. Tā README parauga sesijā
`~118,000` standarta marķieru tiek samazināti līdz `~23,900` RTK marķieriem, ietaupot `79.7%` (`~80%`). OmniRoute izmanto
šo sākotnējā projekta vidējo vērtību secīgās kompresijas ietaupījuma aprēķinā kopā ar Caveman ievades kompresiju:

```txt
RTK vidēji:       ietaupīti 80%
Caveman ievade:   ietaupīti 46%
Secīgi:           1 - (1 - 0.80) * (1 - 0.46) = ietaupīti 89.2%
Diapazons:        1 - (1 - 0.60..0.90) * (1 - 0.46) = ietaupīti 78.4-94.6%
```

## Ko tas saspiež

Iebūvētajā katalogā pašlaik ir iekļauti 49 filtri šādās kategorijās:

| Kategorija | Piemēri                                                       |
| ---------- | ------------------------------------------------------------- |
| `git`      | `git status`, `git branch`, `git diff`, `git log`             |
| `test`     | Vitest, Jest, Pytest, Playwright, Go testi, Cargo testi       |
| `build`    | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package`  | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`    | `ls`, `find`, `grep`, vispārīgi čaulas žurnāli                |
| `docker`   | `docker ps`, Docker žurnāli                                   |
| `infra`    | Terraform, OpenTofu, `systemctl status`                       |
| `generic`  | JSON izvade, steka izsekojumi, vispārīga izvades atkāpe       |

Detektors failā `open-sse/services/compression/engines/rtk/commandDetector.ts` klasificē izvadi
pirms filtra izvēles. Filtri var arī nodrošināt atbilstību pēc komandas parauga vai izvades regulārās izteiksmes, ja ar komandas
klasi nepietiek.

## Filtru noteikšana

RTK ielādē filtrus šādā secībā:

1. Projekta filtrus no `.rtk/filters.toml` un `.rtk/filters.json` — tikai tad, ja tie ir uzticami.
2. Globālos filtrus no `DATA_DIR/rtk/filters.toml` un `DATA_DIR/rtk/filters.json`.
3. Iebūvētos filtrus no `open-sse/services/compression/engines/rtk/filters/`.

Vienā un tajā pašā tvērumā RTK TOML shēmas v1 filtriem ir priekšroka pār OmniRoute JSON filtriem. TOML
`match_command` izteiksmes tiek pārbaudītas pirms atbilstības komandas tipam, lai importēts konkrētai komandai paredzēts
filtrs varētu pārrakstīt plašāku filtru šajā tvērumā. Projekta tvērumam joprojām ir priekšroka pār globālo
tvērumu neatkarīgi no faila formāta.

Projekta filtri apzināti ir pakļauti uzticamības pārbaudei, jo regulāro izteiksmju filtri var mainīt to, kā rīku izvade tiek
parādīta aģentiem. Projekta filtru fails tiek pieņemts, ja ir patiess kāds no šiem nosacījumiem:

- `rtkConfig.trustProjectFilters` ir `true`.
- Ir iestatīts `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` satur projekta filtra failam atbilstošu SHA-256 jaucējvērtību.

Uzticamības faila piemērs:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Jaucējvērtības ir atsevišķas: `filtersSha256` uzticas `.rtk/filters.json`, savukārt `filtersTomlSha256`
uzticas `.rtk/filters.toml`. Rediģējot kādu no failiem, tiek padarīts nederīgs tikai tā attiecīgais uzticamības ieraksts. Globālos failus
instalē administrators, un tie izmanto esošo globālo filtru uzticamības darbību.

Pielāgotie filtri var būt viens filtra objekts vai filtru objektu masīvs. Nederīgi pielāgotie filtri tiek
izlaisti un norādīti `/api/context/rtk/filters` diagnostikā. Nederīgu iebūvēto filtru gadījumā darbība nekavējoties tiek pārtraukta.

## Saderība ar RTK TOML shēmu v1

OmniRoute var parsēt, validēt, testēt un instalēt deklaratīvus filtru failus, izmantojot RTK TOML shēmu v1.
Atbalstītie lauki ir `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` un `[[tests.<filter>]]` iekļautie testi.
Nezināmi lauki, nederīgas vai nedrošas regulārās izteiksmes, vienlaicīgi noņemšanas/saglabāšanas noteikumi, faili, kas lielāki par
1 MiB, un atsauces uz nezināmiem filtriem tiek noraidītas. Failu, kura iekļautie testi neizdodas, var
validēt pārbaudes nolūkā, taču to nevar instalēt vai ielādēt. Pielāgotu failu ielādes kļūmju gadījumā
tiek saglabāts kļūmju ignorēšanas režīms: nederīgais fails tiek izlaists, bet pārējie filtri turpina darboties.

OmniRoute saņem rīka izvadi pēc tam, kad klients to jau ir tvēris, tāpēc `filter_stderr = true`
nevar mainīt procesa izvades tveršanu. Lauks tiek pieņemts, bet neveic nekādas darbības, un validācija atgriež brīdinājumu.
Tas ir apzināti aprakstīts kā **saderība ar RTK TOML shēmu v1**, nevis pilnīga saderība
ar RTK izpildāmo failu, čaulas āķiem, Rust komandu implementācijām vai tā uzticamo vienumu krātuves struktūru.

Informācijas paneļa paplašinātais RTK skats pieņem ielīmētu vai augšupielādētu TOML. Validācija ir tikai lasāma.
Instalēšana atomāri ieraksta `DATA_DIR/rtk/filters.toml` ar ierobežojošām atļaujām un atsvaidzina
aktīvo filtru katalogu bez restartēšanas. Esoša faila aizstāšanai ir nepieciešams nepārprotams `overwrite`
apstiprinājums, un vispirms tiek izveidots `DATA_DIR/rtk/filters.toml.bak`.

## Filtru DSL

Filtri izmanto JSON shēmu, kas aprakstīta sadaļā [Saspiešanas noteikumu formāts](./COMPRESSION_RULES_FORMAT.md).
Izpildlaika vide lieto šos posmus norādītajā secībā:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> rindu atmešana/iekļaušana
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Svarīgi lauki:

| Lauks                        | Mērķis                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------ |
| `rules.stripAnsi`            | Noņemt termināļa krāsu/vadības secības pirms atbilstību meklēšanas             |
| `rules.filterStderr`         | Normalizēt izplatītus stderr prefiksus pirms atbilstību meklēšanas/filtrēšanas |
| `rules.replace`              | Lietot secīgas regulāro izteiksmju aizstāšanas                                 |
| `rules.matchOutput`          | Atgriezt kompaktu kopsavilkumu, ja izvade atbilst zināmam nosacījumam          |
| `rules.matchOutput[].unless` | Izlaist saīsni, ja pastāv kļūdas/neveiksmes raksts                             |
| `rules.dropPatterns`         | Noņemt nevajadzīgi informatīvas rindas                                         |
| `rules.includePatterns`      | Dot priekšroku rindām, kurās norādītas veicamās darbības                       |
| `rules.collapsePatterns`     | Sakļaut atkārtotas atbilstošās rindas                                          |
| `rules.deduplicate`          | Iespējojams katram filtram: sakļaut secīgas dublējošās rindas                  |
| `rules.truncateLineAt`       | Unicode droša katras rindas saīsināšana                                        |
| `rules.onEmpty`              | Rezerves ziņojums, ja visas rindas tiek izfiltrētas                            |
| `tests[]`                    | Iekļauti paraugi, ko izmanto verifikācijas kontrole                            |

Iebūvētajos filtros ir jāiekļauj `tests[]` paraugi. Arī pielāgotajos filtros ir ieteicams tos
iekļaut, jo īpaši, ja filtri tiek koplietoti starp projektiem.

## Rindu dublikātu noņemšana (divi slāņi)

RTK apvieno dublētās rindas divos neatkarīgos slāņos:

1. **Katra filtra `deduplicate` (jāiespējo, noklusējums `false`).** Filtrs var iestatīt `rules.deduplicate: true`,
   lai pirms saīsināšanas apvienotu secīgas dublētas rindas _šī filtra atbilstošajā izvadē_.
   Tas tiek izpildīts failā `lineFilter.ts`. Mantotajiem filtriem tas tiek automātiski iespējots, ja filtrā ir definēts
   `collapsePatterns`. Shēma: `deduplicate: z.boolean().default(false)` failā
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Visa dzinēja `deduplicateThreshold` (noklusējums `3`).** Kad visi filtri ir izpildīti, dzinējs visā rezultātā apvieno
   jebkuru identisku secīgu rindu virkni, kuras garums ir `>= deduplicateThreshold`
   (`deduplicateRepeatedLines`, lietots failā `engines/rtk/index.ts`). Normalizācijas laikā vērtība tiek ierobežota
   diapazonā 2–100.

Katra filtra apstrāde tiek izpildīta vispirms (filtra iekšienē), bet visa dzinēja apstrāde — beigās (apvienotajai
izvadei), tāpēc abi slāņi darbojas kopā bez dubultas uzskaites.

## Rindu grupēšana (`enableGrouping`)

Ja `rtkConfig.enableGrouping` ir `true` (noklusējums `false`), RTK pēc dublikātu noņemšanas rezultātam papildus izpilda `groupSimilarLines`
apstrādi, kas apvieno secīgu _gandrīz līdzvērtīgu_ (nevis baitu līmenī identisku)
rindu virknes. `rtkConfig.groupingThreshold` (noklusējums `3`) ir minimālais virknes garums, kas aktivizē
grupēšanu. Tas ir `deduplicateThreshold` strukturālais ekvivalents: dublikātu noņemšana apstrādā precīzus atkārtojumus,
savukārt grupēšana apstrādā „vienādas formas rindas ar nelielām atšķirībām”. Abi karodziņi ir daļa no `rtkConfig` JSON,
kas tiek saglabāts tabulā `key_value` (skatiet iepriekš sadaļu Konfigurācija), tāpēc iestatījums saglabājas pēc restartēšanas.

## Koda komentāru noņemšana (`stripCodeComments` / `preserveDocstrings`)

Ja ir iespējots `rtkConfig.applyToCodeBlocks`, RTK var arī noņemt komentārus no norobežotajiem koda blokiem:

- `stripCodeComments` (noklusējums `false`) — jāiespējo. Ja iestatīts uz `true`, RTK noņem komentārus no JavaScript
  un TypeScript norobežotajiem blokiem. Vēsturiski karodziņš tika nolasīts, bet nekad netika lietots, tāpēc noklusējuma vērtība paliek
  „saglabāt”, lai izvairītos no nepamanītām izmaiņām produkcijas vidē.
- `preserveDocstrings` (noklusējums `true`) — noņemot komentārus, JSDoc/`/** … */` bloka komentāri tiek
  saglabāti (tajos ir API dokumentācija, kuras vērtība pārsniedz tās aizņemto baitu izmaksas). Iestatiet uz `false`, lai noņemtu
  arī tos.

Komentāru noņemšana ir implementēta failā `open-sse/services/compression/engines/rtk/codeStripper.ts`. Tā izmanto
**TypeScript parsētāju** (nevis regulāro izteiksmi), tāpēc virkņu, veidņu un regulāro izteiksmju literāļi nekad netiek kļūdaini
uzskatīti par komentāriem, un, konstatējot JSX, apstrāde tiek pilnībā pārtraukta (lai nekad nesabojātu JSX izteiksmju konteineru komentārus).
Komentāru noņemšana pašlaik attiecas **tikai uz JavaScript un TypeScript** — citām
noņēmēja `CodeLanguage` kopas valodām (Python, Rust, Go, Ruby, Java) tiek apvienotas tukšās rindas un
atstarpes, bet komentāri netiek noņemti. Noņemtā bloka izpilde laukā
`rulesApplied` tiek atzīmēta ar `rtk:code-strip`.

> **Piezīme — GCF/tabulārā kodēšana ir atsevišķs dzinējs.** RTK **neietver** „GCF”
> (Graph Compact Format) tabulāro/kolonnu JSON kodētāju. Šis kodētājs, kas aizstāja vecāku
> `omni-tabular` kodētāju, atrodas **headroom** dzinējā
> (`open-sse/services/compression/engines/headroom/`, bet komplektācijā iekļautais kodeks atrodas
> `headroom/gcf/`). Tas nav saistīts ar šeit dokumentēto RTK filtru konveijeru.

## Konfigurācija

Globālie iestatījumi ir pieejami, izmantojot `/api/settings/compression`. RTK specifiskie iestatījumi ir pieejami arī, izmantojot `/api/context/rtk/config`.

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

`enabledFilters` un `disabledFilters` izmanto filtru identifikatorus, piemēram, `test-vitest` vai `git-diff`.

Pilno `rtkConfig` struktūru definē `RtkConfig` / `DEFAULT_RTK_CONFIG` failā
`open-sse/services/compression/types.ts`. Viss objekts tiek saglabāts kā viena JSON vērtība SQLite tabulā `key_value` ar
`namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) un lasīšanas laikā normalizēts ar `normalizeRtkConfig`. Tādēļ katrs tālāk norādītais lauks
— tostarp `enableGrouping`, `groupingThreshold`, `stripCodeComments` un `preserveDocstrings` —
tiek saglabāts tajā pašā krātuvē un saglabājas pēc restartēšanas.

| Atslēga                | Noklusējums | Nolūks                                                                                    |
| ---------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`         | Visam dzinim: minimālais secīgo identisko rindu skaits sakļaušanai (diapazonā 2–100)      |
| `enableGrouping`       | `false`     | Pēc izvēles: sakļaut gandrīz līdzvērtīgu secīgu rindu virknes                             |
| `groupingThreshold`    | `3`         | Minimālais secīgu līdzīgu rindu skaits, kas aktivizē grupēšanu                            |
| `stripCodeComments`    | `false`     | Pēc izvēles: nožogotajos koda blokos noņemt komentārus (nepieciešams `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`      | Noņemot komentārus, saglabāt JSDoc/`/** … */` blokus                                      |

## API

| Maršruts                           | Metode | Nolūks                                            |
| ---------------------------------- | ------ | ------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Nolasīt RTK konfigurāciju                         |
| `/api/context/rtk/config`          | PUT    | Atjaunināt RTK konfigurāciju                      |
| `/api/context/rtk/filters`         | GET    | Uzskaitīt filtru katalogu un ielādes diagnostiku  |
| `/api/context/rtk/import`          | POST   | Validēt vai instalēt RTK TOML shēmas v1 failus    |
| `/api/context/rtk/test`            | POST   | Priekšskatīt RTK saspiešanu vienai teksta slodzei |
| `/api/context/rtk/raw-output/[id]` | GET    | Nolasīt saglabāto rediģēto neapstrādāto izvadi    |
| `/api/compression/preview`         | POST   | Priekšskatīt jebkuru saspiešanas režīmu           |

RTK testa slodze:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Saspiešanas priekšskatījuma slodze:

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

Pārvaldības maršrutiem ir nepieciešama informācijas paneļa pārvaldības autentifikācija vai atbilstoša API atslēgas politika.

RTK TOML validācijas slodze:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Izmantojiet `"action": "install"`, lai instalētu validēto failu globāli. Pievienojiet `"overwrite": true` tikai
pēc esošā globālā faila aizstāšanas pārskatīšanas un apstiprināšanas.

## Neapstrādātās izvades atkopšana

RTK parasti atgriež tikai saspiestu tekstu. Atkļūdošanas nolūkos `rawOutputRetention` var saglabāt rediģētu neapstrādāto izvadi:

| Vērtība    | Darbība                                                          |
| ---------- | ---------------------------------------------------------------- |
| `never`    | Nesaglabāt neapstrādāto izvadi                                   |
| `failures` | Saglabāt tikai izvadi, kas, visticamāk, saistīta ar kļūmēm       |
| `always`   | Saglabāt katru saspiesto RTK neapstrādāto izvadi pēc rediģēšanas |

Saglabātie faili tiek ierakstīti šeit:

```txt
DATA_DIR/rtk/raw-output/
```

Pirms saglabāšanas noslēpumi tiek rediģēti, tostarp izplatīti nesēja pilnvarmarķieri, API atslēgas, Slack pilnvarmarķieri, AWS piekļuves atslēgas un piešķīruma formāta `token=...`, `secret=...`, `password=...` vērtības. Analītikā tiek glabāts tikai norādes identifikators, izmērs un jaucējvērtības metadati.

## Verifikācijas vārteja

Fokusētā verifikācijas vārteja izpilda iebūvētos iekļautos filtru testus, neizsaucot ārējas komandas čaulā:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Plašākā RTK vārteja ir:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Pirms laidiena izpildiet plašo saspiešanas vārteju:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK paplašināšana

1. Pievienojiet vai atjauniniet filtra JSON failu.
2. Iekļaujiet vismaz vienu `tests[]` paraugu, kas apliecina būtisko darbību.
3. Jaunām komandu saimēm pievienojiet armatūru mapē `tests/unit/compression/fixtures/rtk/`.
4. Ieviešot jaunu izvades klasi, pievienojiet komandu noteikšanas pārklājumu.
5. Izpildiet verifikācijas un plašo RTK vārteju.
6. Ja filtrs ir lokāls projektam, komitējiet `.rtk/filters.json` un atsvaidziniet `.rtk/trust.json` tikai pēc pārskatīšanas.

---

## Intensitātes līmeņi (v3.8.16+)

RTK atbalsta **3 intensitātes līmeņus**, kas nodrošina kompromisu starp **saspiešanas agresivitāti** un **drošību**. Līmenis tiek iestatīts, izmantojot `config.intensity` dzinēja konfigurācijā.

### 3 līmeņi

| Līmenis                  | Saīsināšanas slieksnis | Pilnvarvienību ietaupījums | Risks     | Vispiemērotākais                          |
| ------------------------ | ---------------------- | -------------------------- | --------- | ----------------------------------------- |
| `minimal`                | 24 rindas katrā sadaļā | ~20-40%                    | Ļoti zems | Produkcijai ar kritiski svarīgu kontekstu |
| `standard` (noklusējums) | 24 rindas katrā sadaļā | ~50-70%                    | Zems      | Ikdienas programmēšanas sesijām           |
| `aggressive`             | 16 rindas katrā sadaļā | ~70-90%                    | Vidējs    | Ilgām sesijām, maksimālam ietaupījumam    |

### Kur notiek saīsināšana

Saīsināšanas slieksnis ietekmē `lineFilter.ts`:

```ts
// No open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Tiek saglabāts gan katras sadaļas **sākums**, gan **beigas**; kad tiek aktivizēta saīsināšana, vidusdaļas saturs tiek atmests.

### Kas tiek saglabāts un kas tiek nogriezts

| Saturs                                   | minimal       | standard      | aggressive    |
| ---------------------------------------- | ------------- | ------------- | ------------- |
| Kļūdas / steka trasējumi                 | ✅ saglabāti  | ✅ saglabāti  | ✅ saglabāti  |
| Testu kļūmes                             | ✅ saglabātas | ✅ saglabātas | ✅ saglabātas |
| Būvējuma kļūdas                          | ✅ saglabātas | ✅ saglabātas | ✅ saglabātas |
| Veiksmīgi testi (detalizēti)             | ✅ saglabāti  | 🟡 sakļauti   | 🟡 sakļauti   |
| Ikdienišķa izvade (informācijas žurnāli) | 🟡 sakļauta   | 🟡 sakļauta   | ❌ atmesta    |
| Progresa joslas                          | 🟡 sakļautas  | ❌ atmestas   | ❌ atmestas   |
| Reklāmkarogs / ASCII māksla              | 🟡 sakļauti   | ❌ atmesti    | ❌ atmesti    |

### Piemērotās intensitātes izvēle

```
                  Vai konteksta zaudēšana būtu katastrofāla?
                  │
      ┌───────────┼───────────┐
      │           │           │
     JĀ          NĒ        NAV SKAIDRS
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Cik kritiski    Vispirms izmēģiniet `standard`
      │      svarīga ir      (darbojas 80% gadījumu)
      │      caurlaidspēja?
      │           │
      │      ┌────┴────┐
      │      │         │
      │     ZEMA      AUGSTA
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Intensitātes konfigurēšana

**Katrai kombinācijai** (kombinācijas konfigurācijā):

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

**Programmatiski**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) ir
`CompressionEngine`, un tam nav `updateConfig` metodes. Tā vietā atjauniniet dzinēja konfigurāciju,
izmantojot reģistra palīgfunkciju:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Ietekmes pārbaude

Izmantojiet **verifikācijas vārteju** (skatiet tālāk), lai apstiprinātu, ka filtrs ir drošs izvēlētajā intensitātē:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtri neizturēja pārbaudi agresīvajā intensitātē");
}
```

---

## Pielāgotu filtru izstrāde (v3.8.16+)

Direktorijā `engines/rtk/filters/` atrodas **vairāk nekā 49 iebūvētu filtru JSON faili**. Varat pievienot savus filtrus, lai saspiestu izvadi no pielāgotiem rīkiem, kurus noklusējuma filtri neaptver.

### Filtra shēma (Zod)

```ts
{
  "id": "string",                      // Obligāts. Filtra identifikators (kebab-case, piem., "python-traceback")
  "label": "string",                   // Obligāts. Cilvēklasāms filtra nosaukums
  "description": "string",             // Neobligāts (noklusējums: ""). Īss filtra darbības apraksts
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Neobligāts (0–100, noklusējums: 50). Izpildes secība (lielāks = pirmais)
  "match": {
    "commands": ["string"],            // Atbilstošie komandu nosaukumi (piem., "python", "pytest")
    "patterns": ["string"],            // Regulāro izteiksmju paraugi, ar kuriem salīdzināt izvadi
    "outputTypes": ["string"]          // Noteiktās izvades klases (piem., "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Neobligāts (noklusējums: false). Noņemt ANSI krāsu kodus
    "replace": [                       // Meklēšanas un aizstāšanas kārtulas (noklusējums: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Pārtraukt apstrādi, ja paraugs atbilst (noklusējums: [])
      {
        "pattern": "regex",
        "message": "īss kopsavilkums",
        "unless": "regex"              // Izlaist, ja šis paraugs atbilst
      }
    ],
    "includePatterns": ["string"],     // Saglabājamās rindas (regulāro izteiksmju paraugi, noklusējums: [])
    "dropPatterns": ["string"],        // Atmetamās rindas (regulāro izteiksmju paraugi, noklusējums: [])
    "collapsePatterns": ["string"],    // Rindas, kuru atkārtojumus apvienot vienā eksemplārā (noklusējums: [])
    "deduplicate": boolean,            // Neobligāts (noklusējums: false). Noņemt dublējošās rindas
    "truncateLineAt": number,          // Neobligāts (noklusējums: 0). Saīsināt rindas līdz maksimālajam rakstzīmju skaitam
    "maxLines": number,                // Neobligāts (noklusējums: 0). Stingrs kopējā rindu skaita ierobežojums
    "headLines": number,               // Neobligāts (noklusējums: 20). Saglabāt pirmās N atbilstošās izvades rindas
    "tailLines": number,               // Neobligāts (noklusējums: 20). Saglabāt pēdējās N atbilstošās izvades rindas
    "onEmpty": "string",               // Neobligāts (noklusējums: ""). Rezerves ziņojums, ja visas rindas ir atfiltrētas
    "filterStderr": boolean            // Neobligāts (noklusējums: false). Filtrēt arī stderr izvadi
  },
  "preserve": {
    "errorPatterns": ["string"],       // Paraugi, kas vienmēr jāsaglabā (noklusējums: [])
    "summaryPatterns": ["string"]      // Noslēguma kopsavilkuma rindas paraugi (noklusējums: [])
  },
  "tests": [                           // Iegultie pārbaudes testi (noklusējums: [])
    {
      "name": "string",               // Obligāts. Testa nosaukums
      "input": "sample output",        // Obligāts. Ievades teksta paraugs
      "expected": "expected output",   // Obligāts. Paredzamā saspiestā izvade
      "command": "optional command"    // Neobligāts. Komandas konteksts
    }
  ]
}
```

### Piemērs: Python izsekošanas steka filtrs

```json
{
  "id": "python-traceback",
  "label": "Python izsekošanas steka filtrs",
  "description": "Saspiež Python izsekošanas stekus, saglabājot būtiskās failu/rindu atrašanās vietas un kļūdas tipu",
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

### Pielāgoto filtru ielāde

Ievietojiet failu kādā no atpazītajām atrašanās vietām:

```
~/.omniroute/rtk/filters/my-filter.json     # Lietotāja līmenis
<project>/.rtk/filters/my-filter.json      # Projekta līmenis
```

Filtri tiek automātiski ielādēti palaišanas laikā, izmantojot `loadRtkFilters()` failā `open-sse/services/compression/engines/rtk/filterLoader.ts`. Ielādētājs atrod filtrus šajās vietās:

- Iebūvētais katalogs: `open-sse/services/compression/engines/rtk/filters/`
- Lietotāja direktorijs: `~/.omniroute/rtk/filters/`
- Projekta direktorijs: `<project>/.rtk/filters/`

Lai filtrus ielādētu programmatiski:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opcijas: customFiltersEnabled (ielādēt lietotāja/projekta filtrus, pēc noklusējuma ieslēgts),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validācija

Ielādes laikā filtri tiek validēti atbilstoši Zod shēmai. Filtru ar nepareizu struktūru neizdosies ielādēt, un žurnālā tiks ierakstīta kļūda:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Lai validētu visus instalētos filtrus, izsauciet `runRtkFilterTests()`, kas tiek eksportēta no `open-sse/services/compression/engines/rtk/verify.ts`.

### Labākā prakse

1. **Vienmēr iekļaujiet `tests[]`** — tie pierāda, ka jūsu filtrs darbojas, un novērš regresijas
2. **Īssavienojumiem izmantojiet `matchOutput`** — ja viena rinda izsaka visu būtisko, aizstājiet visu bloku
3. **Dodiet priekšroku `keep`, nevis `strip`** — precīzi definēti noteikumi “vienmēr saglabāt” ir drošāki nekā “vienmēr noņemt”
4. **Testējiet visos 3 intensitātes līmeņos** — `minimal` nevajadzētu veikt nekādas izmaiņas, bet `aggressive` joprojām vajadzētu saglabāt kļūdas
5. **Izmantojiet lauku `unless`** — aizsargājiet īssavienojumus ar nosacījumu “neaktivizēt, ja ir X”

---

## Neapstrādātās izvades atkopšana un verifikācijas vārteja

Kad RTK agresīvi saspiež izvadi, varat **atgūt sākotnējo tekstu**, lai veiktu atkļūdošanu, auditu vai atkārtotu izpildi.

### Kā darbojas neapstrādātās izvades atkopšana

```
Sākotnējā izvade (10K marķieru)
        │
        ▼
RTK saspiešana (ar rawOutput.enabled=true)
        │
        ├─▶ Saspiestā izvade (2K marķieru)  ──▶ uz LLM
        │
        └─▶ Sākotnējā izvade (10K marķieru) ──▶ saglabāta DB
                                                  (saistīta ar request_id)
```

### Neapstrādātās izvades glabāšanas iespējošana

**Katram pieprasījumam atsevišķi** (kombinētajā konfigurācijā):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1 MB ierobežojums
    }
  }
}
```

**Noklusējums**: `rawOutput.enabled: false` (ietaupa krātuves vietu).

### Glabāšanas izmaksas

| Katram pieprasījumam          | 1MB ierobežojums | 10MB ierobežojums |
| ----------------------------- | ---------------- | ----------------- |
| Vidējā saspiestā izvade       | ~5KB             | ~5KB              |
| Saglabātā neapstrādātā izvade | ~50-500KB        | ~500KB-5MB        |
| Ar 1000 pieprasījumiem dienā  | 50-500MB/dienā   | 500MB-5GB/dienā   |

> **Ieteikums**: Iespējojiet neapstrādāto izvadi tikai **atkļūdošanas sesijām** vai **izlases veida auditam**, nevis pastāvīgi.

### Sākotnējās izvades atkopšana

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId no saspiešanas statistikas
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` pēc saspiešanas tiek atgriezts masīvā `CompressionStats.rtkRawOutputPointers[]`.
Funkcijas signatūru skatiet failā `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Verifikācijas vārteja

**RTK filtru verifikācija** (`open-sse/services/compression/engines/rtk/verify.ts`) validē visus filtrus, izmantojot to `tests[]`, un nodrošina pareizu darbību visos 3 intensitātes līmeņos.

**Izsauciet `runRtkFilterTests()`**, lai palaistu verifikāciju:

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

**Ko tā validē**:

1. Katrs filtrs tiek ielādēts un sekmīgi iztur shēmas validāciju
2. Katrs `tests[]` ieraksts rada paredzēto izvadi
3. `minimal` intensitāte neveic nekādas izmaiņas (saglabā oriģinālu un lieto tikai strukturālos filtrus)
4. `aggressive` intensitāte saglabā kļūdas, testu kļūmes un steka trasējumus
5. Saspiestā izvade nekad nav lielāka par sākotnējo ievadi

- Avots: `open-sse/services/compression/engines/rtk/` (63 faili, ~70KB)

- **Pirms filtra izmaiņu sapludināšanas** — vienmēr pārliecinieties, ka testi ir sekmīgi
- **Pēc RTK dzinēja jaunināšanas** — shēma var būt mainījusies
- **Periodiski uzraudzības laikā** — aizsargā pret novirzēm testu datos
- **Pievienojot jaunu rīku vai komandu saimi** — pierāda, ka jaunais filtrs darbojas

---

## Skatiet arī

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pilns saspiešanas konveijera pārskats
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Dzinēju reģistrs un iebūvētie dzinēji
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Pielāgoti dzinēji, valodu pakotnes, secīgi konveijeri
- Avots: `open-sse/services/compression/engines/rtk/` (63 faili, ~70KB)
