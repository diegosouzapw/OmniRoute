# RTK Compression (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK tihendus on OmniRoute'i käsuteadlik tihendusmootor terminali- ja tööriistaväljundi jaoks. See on
mõeldud kodeerimisagentide seanssidele, kus konteksti kasv tuleneb peamiselt testilogidest, järguväljundist,
paketihaldurite mürast, shell'i transkriptidest, Dockeri väljundist, giti väljundist ja pinujälgedest.

RTK-d saab käitada otse seadistusega `defaultMode: "rtk"` või virnastatud konveieri esimese etapina, tavaliselt:

```txt
rtk -> caveman
```

See järjestus tihendab esmalt mürarikka masinväljundi ning võimaldab seejärel Cavemanil ülejäänud proosat kokku võtta.

RTK lähteprojekt teatab käsuväljundi `60-90%` säästust. Selle README näidisseanss väheneb
`~118,000` standardselt tokenilt `~23,900` RTK tokenile, mis tähendab `79.7%` säästu (`~80%`). OmniRoute kasutab
seda lähteprojekti keskmist Cavemani sisendtihendusega virnastatud säästu arvutamiseks:

```txt
RTK keskmine:      80% säästetud
Cavemani sisend:   46% säästetud
Virnastatud:       1 - (1 - 0.80) * (1 - 0.46) = 89.2% säästetud
Vahemik:           1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Mida see tihendab

Sisseehitatud kataloog sisaldab praegu 49 filtrit järgmistes kategooriates:

| Kategooria | Näited                                                        |
| ---------- | ------------------------------------------------------------- |
| `git`      | `git status`, `git branch`, `git diff`, `git log`             |
| `test`     | Vitest, Jest, Pytest, Playwright, Go testid, Cargo testid     |
| `build`    | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package`  | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`    | `ls`, `find`, `grep`, üldised shell'i logid                   |
| `docker`   | `docker ps`, Dockeri logid                                    |
| `infra`    | Terraform, OpenTofu, `systemctl status`                       |
| `generic`  | JSON-väljund, pinujäljed, üldine väljundi varuvariant         |

Failis `open-sse/services/compression/engines/rtk/commandDetector.ts` olev detektor klassifitseerib väljundi
enne filtri valimist. Filtrid võivad sobituda ka käsu mustri või väljundi regulaaravaldise järgi, kui käsu
klassist ei piisa.

## Filtrite lahendamine

RTK laadib filtrid järgmises järjekorras:

1. Projekti filtrid failidest `.rtk/filters.toml` ja `.rtk/filters.json`, ainult siis, kui need on usaldatud.
2. Globaalsed filtrid failidest `DATA_DIR/rtk/filters.toml` ja `DATA_DIR/rtk/filters.json`.
3. Sisseehitatud filtrid kataloogist `open-sse/services/compression/engines/rtk/filters/`.

Samas skoobis on RTK TOML-i skeemi v1 filtritel eelis OmniRoute'i JSON-filtrite ees. TOML-i
`match_command` avaldisi kontrollitakse enne käsutüübi järgi sobitamist, et imporditud käsuspetsiifiline
filter saaks selles skoobis üldisema filtri alistada. Projekti skoop on failivormingust olenemata endiselt
globaalse skoobi ees prioriteetne.

Projektifiltrid vajavad tahtlikult usalduskinnitust, sest regulaaravaldisefiltrid võivad muuta seda, kuidas
tööriistaväljundit agentidele kuvatakse. Projekti filtrifail aktsepteeritakse, kui üks järgmistest tingimustest on täidetud:

- `rtkConfig.trustProjectFilters` on `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` on määratud.
- `.rtk/trust.json` sisaldab projekti filtrifailile vastavat SHA-256 räsi.

Usaldusfaili näide:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Räsid on eraldi: `filtersSha256` usaldab faili `.rtk/filters.json`, samas kui `filtersTomlSha256`
usaldab faili `.rtk/filters.toml`. Kummagi faili muutmine tühistab ainult selle enda usalduskirje. Globaalsed failid
paigaldab administraator ja need kasutavad olemasolevat globaalsete filtrite usalduskäitumist.

Kohandatud filtrid võivad olla üks filtriobjekt või filtriobjektide massiiv. Sobimatud kohandatud filtrid
jäetakse vahele ja neist teatatakse lõpp-punkti `/api/context/rtk/filters` diagnostikas. Sobimatud sisseehitatud filtrid põhjustavad kohese tõrke.

## RTK TOML-i skeemi v1 ühilduvus

OmniRoute suudab RTK TOML-i skeemi v1 kasutavaid deklaratiivseid filtrifaile parsida, valideerida, testida ja installida.
Toetatud väljad on `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` ja `[[tests.<filter>]]` tekstisisesed testid.
Tundmatute väljade, vigaste või ebaturvaliste regulaaravaldiste, samaaegsete eemaldamis-/säilitamisreeglite, üle
1 MiB suuruste failide ja tundmatutele filtritele viitamise korral lükatakse fail tagasi. Faili, mille tekstisisesed testid ebaõnnestuvad, saab
kontrollimiseks valideerida, kuid seda ei saa installida ega laadida. Kohandatud failide laadimistõrked jäävad
avatud tõrkerežiimi: vigane fail jäetakse vahele ja ülejäänud filtrid jätkavad töötamist.

OmniRoute saab tööriista väljundi pärast seda, kui klient on selle juba hõivanud, seega ei saa `filter_stderr = true`
protsessi väljundi hõivamist muuta. Väli aktsepteeritakse toiminguta sättena ja valideerimine tagastab hoiatuse.
Seda kirjeldatakse teadlikult kui **RTK TOML-i skeemi v1 ühilduvust**, mitte täielikku ühilduvust
RTK täitmisfaili, shellihaakide, Rusti käsuteostuste ega selle usaldushoidla struktuuriga.

Töölaua täiustatud RTK-vaade aktsepteerib kleebitud või üles laaditud TOML-i. Valideerimine on kirjutuskaitstud.
Installimisel kirjutatakse `DATA_DIR/rtk/filters.toml` atomaarse toiminguna piiravate õigustega ja värskendatakse
aktiivset filtrikataloogi ilma taaskäivituseta. Olemasoleva faili asendamine nõuab sõnaselget `overwrite`
kinnitust ja loob esmalt faili `DATA_DIR/rtk/filters.toml.bak`.

## Filtri DSL

Filtrid kasutavad JSON-skeemi, mida kirjeldatakse dokumendis [Tihendusreeglite vorming](./COMPRESSION_RULES_FORMAT.md).
Käituskeskkond rakendab järgmisi etappe selles järjekorras:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> ridade eemaldamine/kaasamine
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Olulised väljad:

| Väli                         | Otstarve                                                                   |
| ---------------------------- | -------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Eemaldab enne sobitamist terminali värvi-/juhtjärjendid                    |
| `rules.filterStderr`         | Normaliseerib enne sobitamist/filtreerimist levinud stderr-prefiksid       |
| `rules.replace`              | Rakendab järjestatud regulaaravaldise asendusi                             |
| `rules.matchOutput`          | Tagastab kompaktse kokkuvõtte, kui väljund vastab teadaolevale tingimusele |
| `rules.matchOutput[].unless` | Jätab otsetee vahele, kui esineb vea-/nurjumismuster                       |
| `rules.dropPatterns`         | Eemaldab mürarikkad read                                                   |
| `rules.includePatterns`      | Eelistab tegevust võimaldavaid ridu                                        |
| `rules.collapsePatterns`     | Koondab korduvad sobivad read                                              |
| `rules.deduplicate`          | Filtripõhine valik: koondab järjestikused duplikaatread                    |
| `rules.truncateLineAt`       | Unicode'i-kindel reahaaval kärpimine                                       |
| `rules.onEmpty`              | Varuteade, kui kõik read filtreeritakse välja                              |
| `tests[]`                    | Kontrollväravas kasutatavad tekstisisesed näidised                         |

Sisseehitatud filtrid peaksid sisaldama tekstisiseseid `tests[]` näidiseid. Ka kohandatud filtrid peaksid neid
sisaldama, eriti kui neid jagatakse projektide vahel.

## Ridade dubleerimise eemaldamine (kaks kihti)

RTK koondab dubleerivad read kahel sõltumatul kihil:

1. **Filtripõhine `deduplicate` (valikuline, vaikimisi `false`).** Filter võib määrata `rules.deduplicate: true`,
   et koondada järjestikused dubleerivad read _selle filtri sobitatud väljundis_ enne kärpimist.
   See toimub faili `lineFilter.ts` sees. Pärandfiltrite puhul lubatakse see automaatselt, kui filter määratleb
   `collapsePatterns`. Skeem: `deduplicate: z.boolean().default(false)` failis
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **Kogu mootorit hõlmav `deduplicateThreshold` (vaikimisi `3`).** Pärast kõigi filtrite käivitamist koondab mootor
   kogu tulemuses kõik vähemalt `deduplicateThreshold` identsest järjestikusest reast koosnevad jadad
   (`deduplicateRepeatedLines`, rakendatakse failis `engines/rtk/index.ts`). Normaliseerimisel piiratakse väärtus
   vahemikku 2–100.

Filtripõhine läbimine toimub esimesena (filtri sees) ja kogu mootorit hõlmav läbimine viimasena (ühendatud
väljundil), seega toimivad need koos ilma topeltarvestuseta.

## Ridade rühmitamine (`enableGrouping`)

Kui `rtkConfig.enableGrouping` on `true` (vaikimisi `false`), teeb RTK dubleerimise eemaldamise järgsele
tulemusele täiendava `groupSimilarLines` läbimise, mis koondab _peaaegu samaväärsete_ (mitte baiditasemel identsete)
järjestikuste ridade jadad. `rtkConfig.groupingThreshold` (vaikimisi `3`) on minimaalne jada pikkus, mille korral
rühmitamine käivitub. See on parameetri `deduplicateThreshold` struktuurne vaste: dubleerimise eemaldamine käsitleb
täpseid kordusi, rühmitamine aga „sama kujuga, väikeste erinevustega” ridu. Mõlemad lipud kuuluvad `rtkConfig` JSON-i,
mis talletatakse tabelis `key_value` (vt ülal jaotist Konfiguratsioon), mistõttu säilib seadistus ka pärast taaskäivitamist.

## Koodikommentaaride eemaldamine (`stripCodeComments` / `preserveDocstrings`)

Kui `rtkConfig.applyToCodeBlocks` on lubatud, saab RTK eemaldada kommentaare ka piiritletud koodiplokkidest:

- `stripCodeComments` (vaikimisi `false`) — valikuline. Kui väärtus on `true`, eemaldab RTK kommentaarid JavaScripti
  ja TypeScripti piiritletud plokkidest. Ajalooliselt loeti seda lippu, kuid seda ei rakendatud kunagi, mistõttu jääb
  vaikeväärtuseks „säilita”, et vältida vaikivat muudatust toodangukeskkonnas.
- `preserveDocstrings` (vaikimisi `true`) — kommentaaride eemaldamisel säilitatakse JSDoc-/`/** … */`-plokikommentaarid
  (need sisaldavad API dokumentatsiooni, mille väärtus ületab nende baitide kulu). Ka nende eemaldamiseks määrake
  väärtuseks `false`.

Kommentaaride eemaldamine on teostatud failis `open-sse/services/compression/engines/rtk/codeStripper.ts`. See kasutab
**TypeScripti parserit** (mitte regulaaravaldist), mistõttu ei peeta stringi-, malli- ega regulaaravaldise literaale
kunagi ekslikult kommentaarideks, ning JSX-i tuvastamisel katkestatakse toiming täielikult (nii ei rikuta kunagi JSX-i
avaldisekonteinerite kommentaare). Praegu rakendatakse kommentaaride eemaldamist **ainult JavaScriptile ja TypeScriptile** —
teiste eemaldaja `CodeLanguage` komplekti kuuluvate keelte (Python, Rust, Go, Ruby, Java) puhul eemaldatakse tühje ridu ja
koondatakse tühimärke, kuid kommentaare ei eemaldata. Töödeldud ploki käituskord märgistatakse väljal `rulesApplied`
väärtusega `rtk:code-strip`.

> **Märkus — GCF / tabelkodeering on eraldi mootor.** RTK **ei** sisalda „GCF-i”
> (Graph Compact Format) tabelipõhist/veerupõhist JSON-kodeerijat. See kodeerija — mis asendas vanema
> `omni-tabular` kodeerija — asub **headroom** mootoris
> (`open-sse/services/compression/engines/headroom/`, kaasatud koodek asub kataloogis
> `headroom/gcf/`). See ei ole seotud siin dokumenteeritud RTK filtrikonveieriga.

## Konfiguratsioon

Globaalsed sätted on saadaval `/api/settings/compression` kaudu. RTK-spetsiifilised sätted on samuti
saadaval `/api/context/rtk/config` kaudu.

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

`enabledFilters` ja `disabledFilters` kasutavad filtri ID-sid, näiteks `test-vitest` või `git-diff`.

Täielik `rtkConfig`-i struktuur on määratletud `RtkConfig` / `DEFAULT_RTK_CONFIG` kaudu failis
`open-sse/services/compression/types.ts`. Kogu objekt talletatakse ühe JSON-väärtusena
SQLite'i tabelis `key_value` atribuutidega `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) ning normaliseeritakse lugemisel funktsiooniga `normalizeRtkConfig`. Seega
läbib iga alltoodud väli — sealhulgas `enableGrouping`, `groupingThreshold`, `stripCodeComments` ja `preserveDocstrings` —
sama talletusprotsessi ning säilib taaskäivitamisel.

| Võti                   | Vaikeväärtus | Otstarve                                                                                   |
| ---------------------- | ------------ | ------------------------------------------------------------------------------------------ |
| `deduplicateThreshold` | `3`          | Kogu mootori jaoks: ahendatavate järjestikuste identsete ridade miinimum (vahemikus 2–100) |
| `enableGrouping`       | `false`      | Valikuline: ahendab peaaegu samaväärsete järjestikuste ridade jadad                        |
| `groupingThreshold`    | `3`          | Rühmitamise käivitava järjestikuste sarnaste ridade jada miinimumpikkus                    |
| `stripCodeComments`    | `false`      | Valikuline: eemaldab piirdega koodiplokkidest kommentaarid (vajab `applyToCodeBlocks`-i)   |
| `preserveDocstrings`   | `true`       | Kommentaaride eemaldamisel säilitab JSDoc/`/** … */` plokid                                |

## API

| Marsruut                           | Meetod | Otstarve                                                  |
| ---------------------------------- | ------ | --------------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | RTK konfiguratsiooni lugemine                             |
| `/api/context/rtk/config`          | PUT    | RTK konfiguratsiooni uuendamine                           |
| `/api/context/rtk/filters`         | GET    | Filtrikataloogi ja laadimisdiagnostika loetlemine         |
| `/api/context/rtk/import`          | POST   | RTK TOML skeemi v1 failide valideerimine või paigaldamine |
| `/api/context/rtk/test`            | POST   | RTK tihendamise eelvaade ühe tekstilaadungi jaoks         |
| `/api/context/rtk/raw-output/[id]` | GET    | Säilitatud redigeeritud toorväljundi lugemine             |
| `/api/compression/preview`         | POST   | Mis tahes tihendusrežiimi eelvaade                        |

RTK testlaadung:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Tihendamise eelvaate laadung:

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

Haldusmarsruudid nõuavad juhtpaneeli haldusautentimist või vastavat API-võtme poliitikat.

RTK TOML-i valideerimislaadung:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Valideeritud faili globaalseks paigaldamiseks kasutage `"action": "install"`. Lisage `"overwrite": true` alles
pärast olemasoleva globaalse faili asendamise ülevaatamist ja kinnitamist.

## Töötlemata väljundi taastamine

RTK tagastab tavaliselt ainult tihendatud teksti. Silumiseks saab `rawOutputRetention` säilitada tundlikest andmetest puhastatud töötlemata väljundi:

| Väärtus    | Käitumine                                                             |
| ---------- | --------------------------------------------------------------------- |
| `never`    | Töötlemata väljundit ei säilitata                                     |
| `failures` | Säilitatakse ainult tõenäoliste tõrgete väljund                       |
| `always`   | Pärast puhastamist säilitatakse iga RTK tihendatud töötlemata väljund |

Säilitatud failid kirjutatakse järgmisse asukohta:

```txt
DATA_DIR/rtk/raw-output/
```

Enne salvestamist eemaldatakse saladused, sealhulgas levinud kandjaload, API-võtmed, Slacki load, AWS-i juurdepääsuvõtmed ning omistamisstiilis väärtused `token=...`, `secret=...` ja `password=...`. Analüütika talletab ainult viida ID, suuruse ja räsi metaandmed.

## Kontrollvärav

Sihitud kontrollvärav käivitab sisseehitatud reasiseste filtrite testid väliseid käske käivitamata:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Laiem RTK kontrollvärav on:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Käivitage enne väljalaset lai tihendamise kontrollvärav:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK laiendamine

1. Lisage või värskendage filtri JSON-faili.
2. Lisage vähemalt üks `tests[]` näidis, mis tõendab olulist käitumist.
3. Lisage uute käsuperekondade jaoks fikstuur kataloogi `tests/unit/compression/fixtures/rtk/`.
4. Uue väljundiklassi lisamisel lisage käsu tuvastamise testkate.
5. Käivitage kontrollvärav ja laiem RTK kontrollvärav.
6. Kui filter on projektikohalik, lisage `.rtk/filters.json` versioonihaldusse ja värskendage `.rtk/trust.json` alles pärast ülevaatust.

---

## Intensiivsustasemed (v3.8.16+)

RTK toetab **3 intensiivsustaset**, mis võimaldavad tasakaalustada **tihendamise agressiivsust** ja **ohutust**. Tase määratakse mootori konfiguratsioonis võtmega `config.intensity`.

### 3 taset

| Tase                   | Kärpimislävi          | Lubade kokkuhoid | Risk       | Sobib kõige paremini                   |
| ---------------------- | --------------------- | ---------------- | ---------- | -------------------------------------- |
| `minimal`              | 24 rida jaotise kohta | ~20-40%          | Väga madal | Kriitilise kontekstiga tootmiskeskkond |
| `standard` (vaikimisi) | 24 rida jaotise kohta | ~50-70%          | Madal      | Igapäevased programmeerimisseansid     |
| `aggressive`           | 16 rida jaotise kohta | ~70-90%          | Keskmine   | Pikad seansid, maksimaalne kokkuhoid   |

### Kus kärpimine toimub

Kärpimislävi mõjutab faili `lineFilter.ts`:

```ts
// Failist open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Iga jaotise **algus** ja **lõpp** säilitatakse; kärpimise rakendumisel eemaldatakse keskosa sisu.

### Mis säilib ja mis eemaldatakse

| Sisu                            | minimal         | standard        | aggressive      |
| ------------------------------- | --------------- | --------------- | --------------- |
| Vead / pinujäljed               | ✅ säilitatakse | ✅ säilitatakse | ✅ säilitatakse |
| Testitõrked                     | ✅ säilitatakse | ✅ säilitatakse | ✅ säilitatakse |
| Järguvead                       | ✅ säilitatakse | ✅ säilitatakse | ✅ säilitatakse |
| Läbitud testid (paljusõnalised) | ✅ säilitatakse | 🟡 koondatakse  | 🟡 koondatakse  |
| Tavapärane väljund (teabelogid) | 🟡 koondatakse  | 🟡 koondatakse  | ❌ eemaldatakse |
| Edenemisribad                   | 🟡 koondatakse  | ❌ eemaldatakse | ❌ eemaldatakse |
| Bänner / ASCII-graafika         | 🟡 koondatakse  | ❌ eemaldatakse | ❌ eemaldatakse |

### Õige intensiivsuse valimine

```
                  Kas konteksti kaotamine on katastroofiline?
                  │
      ┌───────────┼───────────┐
      │           │           │
     JAH         EI        POLE KINDEL
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Kui oluline on  Proovige esmalt taset `standard`
      │      läbilaskevõime? (toimib 80% juhtudest)
      │           │
      │      ┌────┴────┐
      │      │         │
      │    MADAL      KÕRGE
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Intensiivsuse seadistamine

**Kombinatsioonipõhiselt** (kombinatsiooni konfiguratsioonis):

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

**Programmiliselt**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) on
`CompressionEngine` ja sellel puudub meetod `updateConfig`. Värskendage mootori konfiguratsiooni
selle asemel registri abifunktsiooni kaudu:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Mõju kontrollimine

Kasutage **kontrollväravat** (vt allpool), et kinnitada filtri ohutust valitud intensiivsusel:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtrid ebaõnnestusid agressiivsel intensiivsusel");
}
```

---

## Kohandatud filtrite arendamine (v3.8.16+)

Kataloog `engines/rtk/filters/` sisaldab **49+ sisseehitatud filtri JSON-faili**. Saate lisada oma filtreid, et tihendada selliste kohandatud tööriistade väljundit, mida vaikefiltrid ei kata.

### Filtri skeem (Zod)

```ts
{
  "id": "string",                      // Kohustuslik. Filtri identifikaator (kebab-case, nt "python-traceback")
  "label": "string",                   // Kohustuslik. Inimloetav filtri nimi
  "description": "string",             // Valikuline (vaikimisi: ""). Filtri tegevuse lühikirjeldus
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Valikuline (0–100, vaikimisi: 50). Käivitamise järjekord (suurem = varem)
  "match": {
    "commands": ["string"],            // Sobitatavad käsunimed (nt "python", "pytest")
    "patterns": ["string"],            // Väljundiga sobitatavad regulaaravaldised
    "outputTypes": ["string"]          // Tuvastatud väljundiklassid (nt "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Valikuline (vaikimisi: false). Eemaldab ANSI-värvikoodid
    "replace": [                       // Otsingu ja asendamise reeglid (vaikimisi: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Lõpetab töötlemise mustri sobivuse korral (vaikimisi: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Jäetakse vahele, kui see muster sobib
      }
    ],
    "includePatterns": ["string"],     // Säilitatavad read (regulaaravaldised, vaikimisi: [])
    "dropPatterns": ["string"],        // Eemaldatavad read (regulaaravaldised, vaikimisi: [])
    "collapsePatterns": ["string"],    // Üheks esinemiskorraks koondatavad read (vaikimisi: [])
    "deduplicate": boolean,            // Valikuline (vaikimisi: false). Eemaldab duplikaatread
    "truncateLineAt": number,          // Valikuline (vaikimisi: 0). Kärbib read maksimaalse märgipikkuseni
    "maxLines": number,                // Valikuline (vaikimisi: 0). Ridade koguarvu range ülempiir
    "headLines": number,               // Valikuline (vaikimisi: 20). Säilitab sobitatud väljundi esimesed N rida
    "tailLines": number,               // Valikuline (vaikimisi: 20). Säilitab sobitatud väljundi viimased N rida
    "onEmpty": "string",               // Valikuline (vaikimisi: ""). Varuteade, kui kõik read filtreeritakse välja
    "filterStderr": boolean            // Valikuline (vaikimisi: false). Filtreerib ka stderr-väljundit
  },
  "preserve": {
    "errorPatterns": ["string"],       // Mustrid, mis tuleb alati säilitada (vaikimisi: [])
    "summaryPatterns": ["string"]      // Lõpliku kokkuvõtterea mustrid (vaikimisi: [])
  },
  "tests": [                           // Reasisesed testid kontrollimiseks (vaikimisi: [])
    {
      "name": "string",               // Kohustuslik. Testi nimi
      "input": "sample output",        // Kohustuslik. Näidis-sisendtekst
      "expected": "expected output",   // Kohustuslik. Oodatav tihendatud väljund
      "command": "optional command"    // Valikuline. Käsu kontekst
    }
  ]
}
```

### Näide: Pythoni tagasijälitusfilter

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

### Kohandatud filtrite laadimine

Paigutage fail tunnustatud asukohta:

```
~/.omniroute/rtk/filters/my-filter.json     # Kasutaja tasemel
<project>/.rtk/filters/my-filter.json      # Projekti tasemel
```

Filtrid laaditakse käivitamisel automaatselt funktsiooni `loadRtkFilters()` kaudu failis `open-sse/services/compression/engines/rtk/filterLoader.ts`. Laadija leiab filtrid järgmistest asukohtadest:

- Sisseehitatud kataloog: `open-sse/services/compression/engines/rtk/filters/`
- Kasutaja kataloog: `~/.omniroute/rtk/filters/`
- Projekti kataloog: `<project>/.rtk/filters/`

Filtrite programmiliseks laadimiseks:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Valikud: customFiltersEnabled (laadib kasutaja/projekti filtrid, vaikimisi sisse lülitatud),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Valideerimine

Filtreid valideeritakse laadimisel Zodi skeemi alusel. Vigase struktuuriga filtri laadimine nurjub ja viga kirjutatakse logisse:

```
RTK_FILTER_LOADER: filtri "my-filter" valideerimine nurjus:
  - rules.replace.0.pattern: Vigane regulaaravaldis
  - match.commands: ei tohi olla tühi
```

Kõigi installitud filtrite valideerimiseks kutsuge välja `runRtkFilterTests()`, mis eksporditakse failist `open-sse/services/compression/engines/rtk/verify.ts`.

### Head tavad

1. **Lisa alati `tests[]`** — need tõendavad, et sinu filter töötab, ja hoiavad ära regressioonid
2. **Kasuta varajaseks lõpetamiseks välja `matchOutput`** — kui üksainus rida annab kogu vajaliku info edasi, asenda sellega terve plokk
3. **Eelista välja `keep` väljale `strip`** — konkreetsed „säilita alati“ reeglid on turvalisemad kui „eemalda alati“ reeglid
4. **Testi kõigil kolmel intensiivsustasemel** — `minimal` ei tohiks midagi muuta, `aggressive` peaks siiski vead säilitama
5. **Kasuta välja `unless`** — kaitse varajast lõpetamist tingimusega „ära käivita, kui X on olemas“

---

## Toorväljundi taastamine ja kontrollvärav

Kui RTK tihendab väljundit agressiivselt, saate **taastada algteksti** silumiseks, auditeerimiseks või taasesitamiseks.

### Kuidas toorväljundi taastamine toimib

```
Algne väljund (10K sõnet)
        │
        ▼
RTK tihendus (rawOutput.enabled=true)
        │
        ├─▶ Tihendatud väljund (2K sõnet)  ──▶ LLM-ile
        │
        └─▶ Algne väljund (10K sõnet)      ──▶ salvestatakse andmebaasi
                                                  (seotud request_id kaudu)
```

### Toorväljundi salvestamise lubamine

**Päringupõhiselt** (kombineeritud konfiguratsioonis):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1MB piirang
    }
  }
}
```

**Vaikimisi**: `rawOutput.enabled: false` (säästab salvestusruumi).

### Salvestusruumi kulu

| Päringu kohta               | 1MB piirang   | 10MB piirang   |
| --------------------------- | ------------- | -------------- |
| Keskmine tihendatud väljund | ~5KB          | ~5KB           |
| Salvestatud toorväljund     | ~50-500KB     | ~500KB-5MB     |
| 1000 päringut päevas        | 50-500MB/päev | 500MB-5GB/päev |

> **Soovitus**: Lubage toorväljund ainult **silumisseanssideks** või **valikuliseks auditeerimiseks**, mitte pidevalt.

### Algse väljundi taastamine

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId tihendusstatistikast
if (raw) {
  console.log("Algne väljund:", raw);
}
```

`pointerId` tagastatakse pärast tihendamist massiivis `CompressionStats.rtkRawOutputPointers[]`.
Funktsiooni signatuuri leiate failist `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Kontrollvärav

**RTK filtrite kontrollimine** (`open-sse/services/compression/engines/rtk/verify.ts`) valideerib kõiki filtreid nende `tests[]` suhtes ja tagab korrektse käitumise kõigil kolmel intensiivsustasemel.

Kutsuge kontrollimise käivitamiseks välja **`runRtkFilterTests()`**:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Läbitud: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Nurjunud: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filtrite kontrollimine nurjus");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: oodati "${o.expected}", saadi "${o.actual}"`
      );
    });
}
```

**Mida see valideerib**:

1. Iga filter laaditakse ja läbib skeemi valideerimise
2. Iga `tests[]` kirje annab oodatud väljundi
3. Intensiivsus `minimal` ei muuda midagi (säilitab algse väljundi ja rakendab ainult struktuurifiltreid)
4. Intensiivsus `aggressive` säilitab vead, nurjunud testid ja pinujäljed
5. Tihendatud väljund pole kunagi algsest sisendist suurem

- Allikas: `open-sse/services/compression/engines/rtk/` (63 faili, ~70KB)

- **Enne filtri muudatuse liitmist** — veenduge alati, et testid läbiksid edukalt
- **Pärast RTK mootori uuendamist** — skeem võib olla muutunud
- **Korrapäraselt seire käigus** — kaitseb testandmete triivi eest
- **Uue tööriista- või käsupere lisamisel** — tõendab, et uus filter töötab

---

## Vaata ka

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Tihendamise konveieri täielik ülevaade
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Mootorite register ja sisseehitatud mootorid
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Kohandatud mootorid, keelepaketid, virnastatud konveierid
- Lähtekood: `open-sse/services/compression/engines/rtk/` (63 faili, ~70KB)
