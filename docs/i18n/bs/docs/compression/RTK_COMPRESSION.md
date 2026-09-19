# RTK_COMPRESSION (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

# RTK kompresija

RTK kompresija je OmniRoute-ov mehanizam za kompresiju koji prepoznaje komande za izlaz terminala i alata. Dizajniran je za sesije agenata za kodiranje gdje većina rasta konteksta dolazi od testnih logova, izlaza build-a, šuma menadžera paketa, transkripata shell-a, Docker izlaza, git izlaza i stack trace-ova.

RTK se može pokrenuti direktno sa `defaultMode: "rtk"` ili kao prvi korak u složenom cjevovodu (pipeline), obično:

```txt
rtk -> caveman
```

Taj redoslijed prvo komprimuje bučni mašinski izlaz, a zatim omogućava Caveman-u da kondenzuje preostali tekst.

Upstream RTK izvještava o `60-90%` uštede na izlazu komandi. Njegova README probna sesija ide od `~118,000` standardnih tokena do `~23,900` RTK tokena, što je `79.7%` uštede (`~80%`). OmniRoute koristi taj upstream prosjek za proračun složene uštede sa Caveman kompresijom ulaza:

```txt
RTK average:    80% saved
Caveman input: 46% saved
Stacked:       1 - (1 - 0.80) * (1 - 0.46) = 89.2% saved
Range:         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Šta komprimuje

Ugrađeni katalog trenutno isporučuje 49 filtera kroz ove kategorije:

| Kategorija | Primjeri                                                      |
| ---------- | ------------------------------------------------------------- |
| `git`      | `git status`, `git branch`, `git diff`, `git log`             |
| `test`     | Vitest, Jest, Pytest, Playwright, Go tests, Cargo tests       |
| `build`    | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package`  | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`    | `ls`, `find`, `grep`, generički shell logovi                  |
| `docker`   | `docker ps`, Docker logovi                                    |
| `infra`    | Terraform, OpenTofu, `systemctl status`                       |
| `generic`  | JSON izlaz, stack trace-ovi, generički izlazni fallback       |

Detektor u `open-sse/services/compression/engines/rtk/commandDetector.ts` klasifikuje izlaz prije odabira filtera. Filteri se također mogu podudarati prema uzorku komande ili regex-u izlaza kada klasa komande nije dovoljna.

## Rezolucija filtera

RTK učitava filtere ovim redoslijedom:

1. Projektni filteri iz `.rtk/filters.toml` i `.rtk/filters.json`, samo kada su pouzdani.
2. Globalni filteri iz `DATA_DIR/rtk/filters.toml` i `DATA_DIR/rtk/filters.json`.
3. Ugrađeni filteri iz `open-sse/services/compression/engines/rtk/filters/`.

Unutar istog opsega, RTK TOML schema v1 filteri imaju prednost nad OmniRoute JSON filterima. TOML `match_command` izrazi se provjeravaju prije podudaranja tipa komande tako da uvezeni filter specifičan za komandu može nadjačati širi filter u tom opsegu. Projektni opseg i dalje ima prednost nad globalnim opsegom, bez obzira na format datoteke.

Projektni filteri su namjerno zaštićeni provjerom povjerenja jer regex filteri mogu promijeniti način na koji se izlaz alata prikazuje agentima. Datoteka projektnih filtera se prihvata kada je jedno od sljedećeg tačno:

- `rtkConfig.trustProjectFilters` je `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` je postavljeno.
- `.rtk/trust.json` sadrži odgovarajući SHA-256 hash za datoteku projektnih filtera.

Primjer datoteke povjerenja:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hash-evi su odvojeni: `filtersSha256` vjeruje `.rtk/filters.json`, dok `filtersTomlSha256` vjeruje `.rtk/filters.toml`. Uređivanje bilo koje datoteke poništava samo njen vlastiti unos povjerenja. Globalne datoteke instalira administrator i koriste postojeće ponašanje povjerenja globalnih filtera.

Prilagođeni filteri mogu biti jedan objekt filtera ili niz objekata filtera. Neispravni prilagođeni filteri se preskaču i prijavljuju putem `/api/context/rtk/filters` dijagnostike. Neispravni ugrađeni filteri uzrokuju trenutni prekid (fail fast).

## RTK TOML schema v1 kompatibilnost

OmniRoute može parsirati, validirati, testirati i instalirati deklarativne datoteke filtera koristeći RTK TOML shemu v1.
Podržana polja su `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty`, i `[[tests.<filter>]]` inline testovi.
Nepoznata polja, nevažeći ili nesigurni regularni izrazi, istovremena pravila strip/keep, datoteke veće od 1 MiB i reference na nepoznate filtere se odbijaju. Datoteka čiji inline testovi ne uspiju može se validirati radi inspekcije, ali se ne može instalirati ili učitati. Neuspjesi učitavanja prilagođenih datoteka ostaju 'fail-open': nevažeća datoteka se preskače, a preostali filteri nastavljaju raditi.

OmniRoute prima izlaz alata nakon što ga je klijent već uhvatio, tako da `filter_stderr = true` ne može promijeniti hvatanje procesa. Polje se prihvaća kao no-op, a validacija vraća upozorenje.
Ovo je namjerno opisano kao **RTK TOML schema v1 compatibility**, a ne potpuna kompatibilnost sa RTK izvršnom datotekom, shell hookovima, implementacijama Rust naredbi ili njegovim rasporedom trust-store-a.

Napredni RTK prikaz kontrolne ploče prihvaća zalijepljeni ili učitani TOML. Validacija je samo za čitanje.
Instalacija zapisuje `DATA_DIR/rtk/filters.toml` atomski sa restriktivnim dozvolama i osvježava katalog filtera uživo bez ponovnog pokretanja. Zamjena postojeće datoteke zahtijeva eksplicitnu potvrdu `overwrite` i prvo kreira `DATA_DIR/rtk/filters.toml.bak`.

## Filter DSL

Filteri koriste JSON shemu opisanu u [Compression Rules Format](./COMPRESSION_RULES_FORMAT.md).
Runtime primjenjuje ove faze redom:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Važna polja:

| Polje                        | Svrha                                                                 |
| ---------------------------- | --------------------------------------------------------------------- |
| `rules.stripAnsi`            | Ukloni terminalske boje/kontrolne sekvence prije podudaranja          |
| `rules.filterStderr`         | Normaliziraj uobičajene stderr prefikse prije podudaranja/filtriranja |
| `rules.replace`              | Primijeni uređene regex zamjene                                       |
| `rules.matchOutput`          | Vrati sažeti pregled kada izlaz odgovara poznatom uvjetu              |
| `rules.matchOutput[].unless` | Preskoči prečicu kada je prisutan uzorak greške/neuspjeha             |
| `rules.dropPatterns`         | Ukloni bučne linije                                                   |
| `rules.includePatterns`      | Preferiraj linije koje zahtijevaju akciju                             |
| `rules.collapsePatterns`     | Sažmi ponavljajuće podudarajuće linije                                |
| `rules.deduplicate`          | Opt-in po filteru: sažmi uzastopne duplikate linija                   |
| `rules.truncateLineAt`       | Unicode-sigurno skraćivanje po liniji                                 |
| `rules.onEmpty`              | Rezervna poruka ako su sve linije filtrirane                          |
| `tests[]`                    | Inline uzorci koje koristi verify gate                                |

Očekuje se da ugrađeni filteri uključuju inline `tests[]` uzorke. Prilagođeni filteri bi ih također trebali uključivati, posebno kada se dijele između projekata.

## Deduplikacija linija (dva sloja)

RTK sažima duple linije na dva nezavisna sloja:

1. **`deduplicate` po filteru (opcionalno, podrazumijevano `false`).** Filter može postaviti `rules.deduplicate: true`
   da sažme uzastopne duple linije _unutar izlaza koji odgovara tom filteru_, prije skraćivanja.
   Ovo se izvršava unutar `lineFilter.ts`. Za naslijeđene filtere, ovo je automatski omogućeno kada filter definiše
   `collapsePatterns`. Šema: `deduplicate: z.boolean().default(false)` u
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` na nivou engine-a (podrazumijevano `3`).** Nakon što se svi filteri izvrše, engine sažima
   bilo koji niz od `>= deduplicateThreshold` identičnih uzastopnih linija kroz cijeli rezultat
   (`deduplicateRepeatedLines`, primijenjeno u `engines/rtk/index.ts`). Vrijednost je ograničena na 2–100 pri
   normalizaciji.

Prolaz po filteru se izvršava prvi (unutar filtera), prolaz na nivou engine-a se izvršava posljednji (preko spojenog
izlaza), tako da se ovo dvoje kombinuje bez dvostrukog brojanja.

## Grupisanje linija (`enableGrouping`)

Kada je `rtkConfig.enableGrouping` postavljen na `true` (podrazumijevano `false`), RTK pokreće dodatni prolaz
`groupSimilarLines` preko rezultata nakon deduplikacije koji sažima nizove _skoro ekvivalentnih_ (ne bajt-identičnih)
uzastopnih linija. `rtkConfig.groupingThreshold` (podrazumijevano `3`) je minimalna dužina niza koja pokreće
grupisanje. Ovo je strukturni pandan za `deduplicateThreshold`: deduplikacija obrađuje tačna ponavljanja,
grupisanje obrađuje "isti oblik sa malim razlikama". Oba fleg-a su dio `rtkConfig` JSON-a koji se čuva u
`key_value` tabeli (pogledajte Konfiguraciju iznad), tako da postavka preživljava ponovna pokretanja.

## Uklanjanje komentara iz koda (`stripCodeComments` / `preserveDocstrings`)

Kada je `rtkConfig.applyToCodeBlocks` omogućen, RTK takođe može ukloniti komentare iz ograđenih blokova koda:

- `stripCodeComments` (podrazumijevano `false`) — opcionalno. Kada je `true`, RTK uklanja komentare iz JavaScript
  i TypeScript ograđenih blokova. Fleg je istorijski bio čitan, ali nikada primijenjen, pa podrazumijevana vrijednost
  ostaje na "preserve" kako bi se izbjegla tiha promjena u produkciji.
- `preserveDocstrings` (podrazumijevano `true`) — prilikom uklanjanja komentara, JSDoc/`/** … */` blok komentari se
  zadržavaju (oni nose API dokumentaciju koja vrijedi više od bajtova koje zauzimaju). Postavite na `false` da biste
  uklonili i njih.

Uklanjanje komentara je implementirano u `open-sse/services/compression/engines/rtk/codeStripper.ts`. Koristi
**TypeScript parser** (ne regex) tako da se string, šablonski i regex literali nikada ne zamijene za komentare, i
potpuno prekida rad kada se detektuje JSX (tako da se komentari JSX kontejnera izraza nikada ne oštete). Uklanjanje
komentara se trenutno primjenjuje **samo na JavaScript i TypeScript** — ostali jezici u `CodeLanguage` skupu
stripera (Python, Rust, Go, Ruby, Java) imaju sažimanje praznih linija i razmaka, ali ne i uklanjanje komentara.
Izvršenje sažetog bloka je označeno sa `rtk:code-strip` u `rulesApplied`.

> **Napomena — GCF / tabelarno kodiranje je zaseban engine.** RTK **ne** sadrži "GCF"
> (Graph Compact Format) tabelarni/kolumnarni JSON enkoder. Taj enkoder — koji je zamijenio stariji
> `omni-tabular` enkoder — nalazi se u **headroom** engine-u
> (`open-sse/services/compression/engines/headroom/`, sa vendored kodekom pod
> `headroom/gcf/`). On nije povezan sa RTK filter cjevovodom dokumentovanim ovdje.

## Konfiguracija

Globalne postavke su dostupne putem `/api/settings/compression`. Postavke specifične za RTK su također dostupne putem `/api/context/rtk/config`.

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

`enabledFilters` i `disabledFilters` koriste ID-ove filtera, na primjer `test-vitest` ili `git-diff`.

Puni oblik `rtkConfig` je definiran pomoću `RtkConfig` / `DEFAULT_RTK_CONFIG` u `open-sse/services/compression/types.ts`. Cijeli objekt se pohranjuje kao jedna JSON vrijednost u SQLite tablici `key_value` pod `namespace = "compression"`, `key = "rtkConfig"` (`src/lib/db/compression.ts`), i normalizira se pri čitanju pomoću `normalizeRtkConfig`. Dakle, svako polje ispod — uključujući `enableGrouping`, `groupingThreshold`, `stripCodeComments` i `preserveDocstrings` — prolazi kroz istu pohranu i preživljava ponovno pokretanje.

| Ključ                  | Zadano  | Svrha                                                                                 |
| ---------------------- | ------- | ------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`     | Engine-wide: min. uzastopnih identičnih linija za sažimanje (ograničeno na 2–100)     |
| `enableGrouping`       | `false` | Opt-in: sažimanje nizova gotovo ekvivalentnih uzastopnih linija                       |
| `groupingThreshold`    | `3`     | Min. niz uzastopnih sličnih linija koji pokreće grupiranje                            |
| `stripCodeComments`    | `false` | Opt-in: uklanjanje komentara iz ograđenih blokova koda (potrebno `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`  | Prilikom uklanjanja komentara, zadrži JSDoc/`/** … */` blokove                        |

## API

| Ruta                               | Metoda | Svrha                                                           |
| ---------------------------------- | ------ | --------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Čitanje RTK konfiguracije                                       |
| `/api/context/rtk/config`          | PUT    | Ažuriranje RTK konfiguracije                                    |
| `/api/context/rtk/filters`         | GET    | Popis kataloga filtera i učitavanje dijagnostike                |
| `/api/context/rtk/import`          | POST   | Provjera valjanosti ili instalacija RTK TOML schema v1 datoteka |
| `/api/context/rtk/test`            | POST   | Pregled RTK kompresije za jedan tekstualni payload              |
| `/api/context/rtk/raw-output/[id]` | GET    | Čitanje zadržanog redigiranog sirovog izlaza                    |
| `/api/compression/preview`         | POST   | Pregled bilo kojeg načina kompresije                            |

RTK testni payload:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Payload za pregled kompresije:

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

Rute za upravljanje zahtijevaju autentifikaciju upravljanja nadzornom pločom (dashboard) ili odgovarajuću politiku API ključa.

RTK TOML payload za provjeru valjanosti:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Koristite `"action": "install"` za globalnu instalaciju provjerene datoteke. Dodajte `"overwrite": true` samo nakon pregleda i potvrde zamjene postojeće globalne datoteke.

## Oporavak sirovog izlaza

RTK obično vraća samo komprimirani tekst. Za potrebe otklanjanja grešaka (debugging), `rawOutputRetention` može zadržati redigirani sirovi izlaz:

| Vrijednost | Ponašanje                                                     |
| ---------- | ------------------------------------------------------------- |
| `never`    | Ne zadržavaj sirovi izlaz                                     |
| `failures` | Zadrži samo izlaz koji vjerovatno ukazuje na grešku           |
| `always`   | Zadrži svaki komprimirani RTK sirovi izlaz, nakon redigiranja |

Zadržane datoteke se zapisuju pod:

```txt
DATA_DIR/rtk/raw-output/
```

Tajne se redigiraju prije pohrane, uključujući uobičajene bearer tokene, API ključeve, Slack tokene, AWS pristupne ključeve i vrijednosti u stilu dodjele `token=...`, `secret=...`, `password=...`. Analitika pohranjuje samo ID pokazivača, veličinu i metapodatke heša.

## Kapija za verifikaciju

Fokusirana kapija za verifikaciju pokreće ugrađene inline testove filtera bez pozivanja vanjskih naredbi:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Šira RTK kapija je:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Pokrenite široku kapiju kompresije prije izdanja:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Proširivanje RTK-a

1. Dodajte ili ažurirajte JSON datoteku filtera.
2. Uključite barem jedan `tests[]` uzorak koji dokazuje važno ponašanje.
3. Dodajte fixture pod `tests/unit/compression/fixtures/rtk/` za nove porodice naredbi.
4. Dodajte pokrivenost detekcije naredbi prilikom uvođenja nove klase izlaza.
5. Pokrenite kapije za verifikaciju i široku RTK kapiju.
6. Ako je filter lokalan za projekt, commitajte `.rtk/filters.json` i osvježite `.rtk/trust.json` tek nakon pregleda.

---

## Nivoi intenziteta (v3.8.16+)

RTK podržava **3 nivoa intenziteta** koji balansiraju između **agresivnosti kompresije** i **sigurnosti**. Nivo se postavlja putem `config.intensity` u konfiguraciji engine-a.

### 3 nivoa

| Nivo                 | Prag skraćivanja     | Ušteda tokena | Rizik       | Najbolje za                        |
| -------------------- | -------------------- | ------------- | ----------- | ---------------------------------- |
| `minimal`            | 24 linije po sekciji | ~20-40%       | Veoma nizak | Produkcija sa kritičnim kontekstom |
| `standard` (default) | 24 linije po sekciji | ~50-70%       | Nizak       | Dnevne sesije kodiranja            |
| `aggressive`         | 16 linija po sekciji | ~70-90%       | Srednji     | Duge sesije, maksimalna ušteda     |

### Gdje se dešava skraćivanje

Prag skraćivanja utiče na `lineFilter.ts`:

```ts
// Iz open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

I **početak** i **kraj** svake sekcije se čuvaju; srednji sadržaj se odbacuje kada se aktivira skraćivanje.

### Šta ostaje, a šta se reže

| Sadržaj                      | minimal     | standard    | aggressive  |
| ---------------------------- | ----------- | ----------- | ----------- |
| Greške / stack trace-ovi     | ✅ sačuvano | ✅ sačuvano | ✅ sačuvano |
| Padovi testova               | ✅ sačuvano | ✅ sačuvano | ✅ sačuvano |
| Greške pri izgradnji         | ✅ sačuvano | ✅ sačuvano | ✅ sačuvano |
| Prolazi testova (opširno)    | 🟡 sažeto   | 🟡 sažeto   | 🟡 sažeto   |
| Rutinski izlaz (info logovi) | 🟡 sažeto   | 🟡 sažeto   | ❌ odbačeno |
| Trake napretka               | 🟡 sažeto   | ❌ odbačeno | ❌ odbačeno |
| Baner / ASCII umjetnost      | 🟡 sažeto   | ❌ odbačeno | ❌ odbačeno |

### Odabir pravog intenziteta

```
                  Je li gubitak konteksta katastrofalan?
                  │
      ┌───────────┼───────────┐
      │           │           │
     DA          NE        NISAM SIGURAN
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Koliko je       Prvo isprobajte `standard`
      │      kritičan protok? (radi u 80% slučajeva)
      │           │
      │      ┌────┴────┐
      │      │         │
      │    NIZAK     VISOK
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Konfigurisanje intenziteta

**Po kombinaciji** (u konfiguraciji kombinacije):

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

**Programski**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) je `CompressionEngine` i nema `updateConfig` metodu. Umjesto toga, ažurirajte konfiguraciju engine-a putem pomoćnika registra (registry helper):

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Verifikacija efekta

Koristite **Kapiju za verifikaciju** (pogledajte ispod) da potvrdite da je vaš filter siguran pri odabranom intenzitetu:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filteri nisu prošli pri agresivnom intenzitetu");
}
```

---

## Razvoj prilagođenih filtera (v3.8.16+)

Direktorij `engines/rtk/filters/` sadrži **49+ ugrađenih JSON datoteka filtera**. Možete dodati vlastite kako biste komprimirali izlaz iz prilagođenih alata koji nisu pokriveni zadanim postavkama.

### Shema filtera (Zod)

```ts
{
  "id": "string",                      // Obavezno. Identifikator filtera (kebab-case, npr. "python-traceback")
  "label": "string",                   // Obavezno. Čitljiv naziv filtera
  "description": "string",             // Opcionalno (zadano: ""). Kratak opis onoga što filter radi
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Opcionalno (0-100, zadano: 50). Redoslijed izvršavanja (veći broj = prvi)
  "match": {
    "commands": ["string"],            // Nazivi naredbi za podudaranje (npr. "python", "pytest")
    "patterns": ["string"],            // Regex uzorci za podudaranje izlaza
    "outputTypes": ["string"]          // Otkrivene klase izlaza (npr. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Opcionalno (zadano: false). Ukloni ANSI kodove boja
    "replace": [                       // Pravila za pronalaženje i zamjenu (zadano: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Kratki spoj pri podudaranju uzorka (zadano: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Preskoči ako se ovaj uzorak podudara
      }
    ],
    "includePatterns": ["string"],     // Linije za zadržavanje (regex uzorci, zadano: [])
    "dropPatterns": ["string"],        // Linije za odbacivanje (regex uzorci, zadano: [])
    "collapsePatterns": ["string"],    // Linije za sažimanje na jednu pojavu (zadano: [])
    "deduplicate": boolean,            // Opcionalno (zadano: false). Ukloni duple linije
    "truncateLineAt": number,          // Opcionalno (zadano: 0). Skrati linije na maksimalan broj znakova
    "maxLines": number,                // Opcionalno (zadano: 0). Tvrdo ograničenje ukupnog broja linija
    "headLines": number,               // Opcionalno (zadano: 20). Zadrži prvih N linija podudarnog izlaza
    "tailLines": number,               // Opcionalno (zadano: 20). Zadrži zadnjih N linija podudarnog izlaza
    "onEmpty": "string",               // Opcionalno (zadano: ""). Rezervna poruka ako su sve linije filtrirane
    "filterStderr": boolean            // Opcionalno (zadano: false). Također filtriraj stderr izlaz
  },
  "preserve": {
    "errorPatterns": ["string"],       // Uzorci koji se moraju uvijek sačuvati (zadano: [])
    "summaryPatterns": ["string"]      // Uzorci za konačnu liniju sažetka (zadano: [])
  },
  "tests": [                           // Ugrađeni testovi za provjeru (zadano: [])
    {
      "name": "string",               // Obavezno. Naziv testa
      "input": "sample output",        // Obavezno. Primjer ulaznog teksta
      "expected": "expected output",   // Obavezno. Očekivani komprimirani izlaz
      "command": "optional command"    // Opcionalno. Kontekst naredbe
    }
  ]
}
```

### Primjer: Filter za Python Traceback

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

### Učitavanje prilagođenih filtera

Postavite datoteku na prepoznatu lokaciju:

```
~/.omniroute/rtk/filters/my-filter.json     # Korisnički nivo
<project>/.rtk/filters/my-filter.json      # Projektni nivo
```

Filteri se automatski učitavaju pri pokretanju putem `loadRtkFilters()` u `open-sse/services/compression/engines/rtk/filterLoader.ts`. Učitavač otkriva filtere iz:

- Ugrađeni katalog: `open-sse/services/compression/engines/rtk/filters/`
- Korisnički direktorij: `~/.omniroute/rtk/filters/`
- Projektni direktorij: `<project>/.rtk/filters/`

Za programsko učitavanje filtera:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opcije: customFiltersEnabled (učitaj korisničke/projektne filtere, zadano uključeno),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validacija

Filteri se pri učitavanju validiraju prema Zod shemi. Filter s lošom strukturom neće se učitati i zabilježit će grešku:

```
RTK_FILTER_LOADER: filter "my-filter" nije prošao validaciju:
  - rules.replace.0.pattern: Neispravan regex
  - match.commands: ne smije biti prazno
```

Za validaciju svih instaliranih filtera, pozovite `runRtkFilterTests()` koji je eksportovan iz `open-sse/services/compression/engines/rtk/verify.ts`.

### Najbolje prakse

1. **Uvijek uključite `tests[]`** — oni dokazuju da vaš filter radi i sprječavaju regresije
2. **Koristite `matchOutput` za prečice** — ako jedan red govori sve, zamijenite cijeli blok
3. **Preferirajte `keep` umjesto `strip`** — eksplicitna pravila "uvijek sačuvaj" su sigurnija od "uvijek ukloni"
4. **Testirajte na sva 3 nivoa intenziteta** — `minimal` bi trebao biti no-op, `aggressive` bi i dalje trebao sačuvati greške
5. **Koristite polje `unless`** — zaštitite prečice pomoću "ne pokreći ako je X prisutno"

---

## Oporavak sirovog izlaza i Verify Gate

Kada RTK agresivno komprimuje izlaz, možete **vratiti originalni tekst** za otklanjanje grešaka (debugging), reviziju ili ponovnu reprodukciju.

### Kako funkcioniše oporavak sirovog izlaza

```
Originalni izlaz (10K tokena)
        │
        ▼
RTK kompresija (sa rawOutput.enabled=true)
        │
        ├─▶ Komprimovani izlaz (2K tokena)  ──▶ ka LLM
        │
        └─▶ Originalni izlaz (10K tokena)   ──▶ sačuvan u bazi podataka
                                                  (povezano preko request_id)
```

### Omogućavanje skladištenja sirovog izlaza

**Po zahtevu** (u combo konfiguraciji):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // ograničenje od 1MB
    }
  }
}
```

**Podrazumevano**: `rawOutput.enabled: false` (štedi prostor za skladištenje).

### Troškovi skladištenja

| Po zahtevu                  | Ograničenje 1MB | Ograničenje 10MB |
| --------------------------- | --------------- | ---------------- |
| Prosečan komprimovani izlaz | ~5KB            | ~5KB             |
| Sačuvan sirovi izlaz        | ~50-500KB       | ~500KB-5MB       |
| Sa 1000 zahteva/dan         | 50-500MB/dan    | 500MB-5GB/dan    |

> **Preporuka**: Omogućite sirovi izlaz samo za **sesije otklanjanja grešaka** ili **uzorkovanu reviziju**, ne kao stalno uključenu opciju.

### Oporavak originala

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId iz statistike kompresije
if (raw) {
  console.log("Originalni izlaz:", raw);
}
```

`pointerId` se vraća u `CompressionStats.rtkRawOutputPointers[]` nakon kompresije.
Pogledajte `open-sse/services/compression/engines/rtk/rawOutput.ts:102` za potpis funkcije.

### The Verify Gate

**RTK verifikacija filtera** (`open-sse/services/compression/engines/rtk/verify.ts`) validira sve filtere u odnosu na njihove `tests[]` i osigurava da je ponašanje ispravno na sva 3 nivoa intenziteta.

**Pozovite `runRtkFilterTests()`** da pokrenete verifikaciju:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Uspešno: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Neuspešno: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filteri nisu prošli verifikaciju");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: očekivano "${o.expected}", dobijeno "${o.actual}"`
      );
    });
}
```

**Šta validira**:

1. Svaki filter se učitava i prolazi validaciju šeme
2. Svaki unos u `tests[]` proizvodi očekivani izlaz
3. `minimal` intenzitet je no-op (čuva original, primenjuje samo strukturne filtere)
4. `aggressive` intenzitet čuva greške, neuspele testove i stack trace-ove
5. Komprimovani izlaz nikada nije veći od originalnog ulaza

- Izvor: `open-sse/services/compression/engines/rtk/` (63 datoteke, ~70KB)

- **Pre spajanja izmene filtera** — uvek osigurajte da testovi prolaze
- **Nakon nadogradnje RTK engine-a** — šema se možda promenila
- **Periodično u monitoringu** — štiti od odstupanja u test fixture-ima
- **Kada dodajete novu porodicu alata/komandi** — dokazuje da novi filter radi

---

## Također pogledajte

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Potpuni pregled pipeline-a kompresije
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registar engine-a i ugrađeni engine-i
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Prilagođeni engine-i, jezički paketi, složeni pipeline-i
- Izvor: `open-sse/services/compression/engines/rtk/` (63 datoteke, ~70KB)
