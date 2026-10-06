# RTK Compression (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK kompresija OmniRouteov je mehanizam za kompresiju izlaza terminala i alata koji prepoznaje naredbe. Namijenjen je sesijama agenata za programiranje, u kojima većina rasta konteksta proizlazi iz zapisnika testova, izlaza izgradnje, suvišnog izlaza upravitelja paketima, transkripata ljuske, Dockerova izlaza, git izlaza i tragova stoga.

RTK se može pokretati izravno uz `defaultMode: "rtk"` ili kao prvi korak u ulančanom cjevovodu, obično:

```txt
rtk -> caveman
```

Tim se redoslijedom najprije komprimira bučan strojni izlaz, nakon čega Caveman sažima preostali tekst.

Izvorni RTK navodi uštedu od `60-90%` za izlaz naredbi. Primjer sesije iz njegova README-a smanjuje se s
`~118,000` standardnih tokena na `~23,900` RTK tokena, što predstavlja uštedu od `79.7%` (`~80%`). OmniRoute koristi taj izvorni prosjek za izračun ulančane uštede s Caveman kompresijom ulaza:

```txt
RTK prosjek:    80% uštede
Caveman ulaz:   46% uštede
Ulančano:       1 - (1 - 0.80) * (1 - 0.46) = 89.2% uštede
Raspon:         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Što komprimira

Ugrađeni katalog trenutačno sadrži 49 filtara raspoređenih u sljedeće kategorije:

| Kategorija | Primjeri                                                      |
| ---------- | ------------------------------------------------------------- |
| `git`      | `git status`, `git branch`, `git diff`, `git log`             |
| `test`     | Vitest, Jest, Pytest, Playwright, Go testovi, Cargo testovi   |
| `build`    | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package`  | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`    | `ls`, `find`, `grep`, generički zapisnici ljuske              |
| `docker`   | `docker ps`, Docker zapisnici                                 |
| `infra`    | Terraform, OpenTofu, `systemctl status`                       |
| `generic`  | JSON izlaz, tragovi stoga, rezervni generički izlaz           |

Detektor u `open-sse/services/compression/engines/rtk/commandDetector.ts` klasificira izlaz
prije odabira filtra. Filtri se mogu podudarati i prema uzorku naredbe ili regularnom izrazu izlaza kada klasa naredbe nije dovoljna.

## Razrješavanje filtara

RTK učitava filtre sljedećim redoslijedom:

1. Projektni filtri iz `.rtk/filters.toml` i `.rtk/filters.json`, samo kada su pouzdani.
2. Globalni filtri iz `DATA_DIR/rtk/filters.toml` i `DATA_DIR/rtk/filters.json`.
3. Ugrađeni filtri iz `open-sse/services/compression/engines/rtk/filters/`.

Unutar istog opsega filtri TOML sheme v1 za RTK imaju prednost pred OmniRoute JSON filtrima. TOML
izrazi `match_command` provjeravaju se prije podudaranja prema vrsti naredbe kako bi uvezeni filtar specifičan za naredbu mogao nadjačati širi filtar u tom opsegu. Projektni opseg i dalje ima prednost pred globalnim opsegom, neovisno o formatu datoteke.

Projektni filtri namjerno zahtijevaju potvrdu pouzdanosti jer filtri s regularnim izrazima mogu promijeniti način na koji se izlaz alata prikazuje agentima. Datoteka projektnog filtra prihvaća se kada vrijedi jedan od sljedećih uvjeta:

- `rtkConfig.trustProjectFilters` je `true`.
- Postavljen je `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` sadrži odgovarajući SHA-256 sažetak datoteke projektnog filtra.

Primjer datoteke pouzdanosti:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Sažeci su odvojeni: `filtersSha256` označava `.rtk/filters.json` kao pouzdan, dok `filtersTomlSha256`
označava `.rtk/filters.toml` kao pouzdan. Uređivanje bilo koje datoteke poništava samo njezin vlastiti unos pouzdanosti. Globalne datoteke instalira administrator i one upotrebljavaju postojeće ponašanje pouzdanosti globalnih filtara.

Prilagođeni filtri mogu biti jedan objekt filtra ili polje objekata filtara. Nevažeći prilagođeni filtri preskaču se i prijavljuju u dijagnostici `/api/context/rtk/filters`. Nevažeći ugrađeni filtri odmah uzrokuju prekid.

## Kompatibilnost s RTK TOML shemom v1

OmniRoute može raščlaniti, validirati, testirati i instalirati deklarativne datoteke filtara koje koriste RTK TOML shemu v1.
Podržana su polja `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` i umetnuti testovi `[[tests.<filter>]]`.
Nepoznata polja, neispravni ili nesigurni regularni izrazi, istodobna pravila uklanjanja/zadržavanja, datoteke veće od
1 MiB i reference na nepoznate filtre odbacuju se. Datoteka čiji umetnuti testovi ne uspiju može se
validirati radi pregleda, ali se ne može instalirati ni učitati. Neuspjesi učitavanja prilagođenih datoteka i dalje
se obrađuju u načinu fail-open: neispravna datoteka preskače se, a preostali filtri nastavljaju raditi.

OmniRoute prima izlaz alata nakon što ga je klijent već zabilježio, pa `filter_stderr = true`
ne može promijeniti način bilježenja procesa. Polje se prihvaća bez učinka, a validacija vraća upozorenje.
To je namjerno opisano kao **kompatibilnost s RTK TOML shemom v1**, a ne kao potpuna kompatibilnost
s izvršnom datotekom RTK, shell hookovima, implementacijama naredbi u Rustu ili njegovom strukturom spremišta pouzdanih stavki.

Napredni RTK prikaz nadzorne ploče prihvaća zalijepljeni ili preneseni TOML. Validacija je samo za čitanje.
Instalacija atomski zapisuje `DATA_DIR/rtk/filters.toml` s restriktivnim dopuštenjima i osvježava
aktivni katalog filtara bez ponovnog pokretanja. Zamjena postojeće datoteke zahtijeva izričitu potvrdu `overwrite`
i najprije stvara `DATA_DIR/rtk/filters.toml.bak`.

## DSL filtara

Filtri koriste JSON shemu opisanu u dokumentu [Format pravila kompresije](./COMPRESSION_RULES_FORMAT.md).
Izvršno okruženje primjenjuje ove faze navedenim redoslijedom:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> odbacivanje/uključivanje redaka
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Važna polja:

| Polje                        | Svrha                                                                |
| ---------------------------- | -------------------------------------------------------------------- |
| `rules.stripAnsi`            | Uklanja terminalne sekvence boja/kontrola prije podudaranja          |
| `rules.filterStderr`         | Normalizira uobičajene stderr prefikse prije podudaranja/filtriranja |
| `rules.replace`              | Primjenjuje uređene zamjene regularnim izrazima                      |
| `rules.matchOutput`          | Vraća sažeti prikaz kada izlaz odgovara poznatom uvjetu              |
| `rules.matchOutput[].unless` | Preskače prečac kada postoji uzorak pogreške/neuspjeha               |
| `rules.dropPatterns`         | Uklanja suvišne retke                                                |
| `rules.includePatterns`      | Daje prednost primjenjivim retcima                                   |
| `rules.collapsePatterns`     | Sažima ponovljene podudarne retke                                    |
| `rules.deduplicate`          | Uključivanje po filtru: sažima uzastopne duplicirane retke           |
| `rules.truncateLineAt`       | Skraćivanje svakog retka uz očuvanje Unicodea                        |
| `rules.onEmpty`              | Rezervna poruka ako su svi retci filtrirani                          |
| `tests[]`                    | Umetnuti primjeri koje koristi provjera                              |

Očekuje se da ugrađeni filtri uključuju umetnute primjere `tests[]`. Prilagođeni filtri također bi ih trebali
uključivati, osobito kada se dijele između projekata.

## Deduplikacija redaka (dva sloja)

RTK sažima duplicirane retke na dva neovisna sloja:

1. **`deduplicate` po filtru (izborno, zadano `false`).** Filtar može postaviti `rules.deduplicate: true`
   kako bi sažeo uzastopne duplicirane retke _unutar rezultata koji je taj filtar pronašao_, prije skraćivanja.
   To se izvršava unutar `lineFilter.ts`. Za naslijeđene filtre automatski se omogućuje kada filtar definira
   `collapsePatterns`. Shema: `deduplicate: z.boolean().default(false)` u
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` na razini cijelog mehanizma (zadano `3`).** Nakon izvršavanja svih filtara mehanizam sažima
   svaki niz od `>= deduplicateThreshold` identičnih uzastopnih redaka u cijelom rezultatu
   (`deduplicateRepeatedLines`, primijenjeno u `engines/rtk/index.ts`). Vrijednost se tijekom
   normalizacije ograničava na 2–100.

Prolaz po pojedinom filtru izvršava se prvi (unutar filtra), a prolaz na razini cijelog mehanizma izvršava se posljednji (nad spojenim
rezultatom), pa se ta dva prolaza kombiniraju bez dvostrukog brojanja.

## Grupiranje redaka (`enableGrouping`)

Kada je `rtkConfig.enableGrouping` postavljen na `true` (zadano `false`), RTK izvršava dodatni prolaz `groupSimilarLines`
nad rezultatom nakon deduplikacije, koji sažima nizove _gotovo jednakih_ (ne nužno identičnih na razini bajtova)
uzastopnih redaka. `rtkConfig.groupingThreshold` (zadano `3`) predstavlja najmanju duljinu niza koja pokreće
grupiranje. To je strukturni pandan opciji `deduplicateThreshold`: deduplikacija obrađuje točna ponavljanja,
dok grupiranje obrađuje „isti oblik s malim razlikama”. Obje su zastavice dio JSON objekta `rtkConfig`
koji se pohranjuje u tablici `key_value` (pogledajte odjeljak Konfiguracija iznad), pa postavka ostaje sačuvana i nakon ponovnog pokretanja.

## Uklanjanje komentara iz koda (`stripCodeComments` / `preserveDocstrings`)

Kada je `rtkConfig.applyToCodeBlocks` omogućen, RTK također može uklanjati komentare iz ograđenih blokova koda:

- `stripCodeComments` (zadano `false`) — izborno. Kada je postavljeno na `true`, RTK uklanja komentare iz ograđenih blokova
  JavaScripta i TypeScripta. Zastavica se u prošlosti čitala, ali nikada nije bila primijenjena, pa zadana vrijednost ostaje
  „sačuvaj” kako bi se izbjegla neprimjetna promjena u produkciji.
- `preserveDocstrings` (zadano `true`) — pri uklanjanju komentara zadržavaju se JSDoc/`/** … */` blokovski komentari
  (sadrže API dokumentaciju koja vrijedi više od bajtova koje zauzima). Postavite na `false` kako biste uklonili
  i njih.

Uklanjanje komentara implementirano je u `open-sse/services/compression/engines/rtk/codeStripper.ts`. Upotrebljava
**TypeScript parser** (a ne regularni izraz), tako da se literali niza znakova, predloška i regularnog izraza nikada pogrešno ne protumače
kao komentari, a postupak se u potpunosti prekida kada se otkrije JSX (kako se komentari u spremnicima JSX izraza
nikada ne bi oštetili). Uklanjanje komentara trenutačno se primjenjuje **samo na JavaScript i TypeScript** — drugi
jezici u skupu `CodeLanguage` alata za uklanjanje (Python, Rust, Go, Ruby, Java) podržavaju sažimanje praznih redaka i
razmaka, ali ne i uklanjanje komentara. Obrada uklonjenog bloka označava se s `rtk:code-strip` u
`rulesApplied`.

> **Napomena — GCF / tablična enkodiranja zaseban su mehanizam.** RTK **ne** sadrži „GCF”
> (Graph Compact Format) tablični/stupčani JSON koder. Taj koder — koji je zamijenio stariji
> `omni-tabular` koder — nalazi se u mehanizmu **headroom**
> (`open-sse/services/compression/engines/headroom/`, s uključenim kodekom u
> `headroom/gcf/`). Nije povezan s ovdje dokumentiranim RTK filtarskim slijedom.

## Konfiguracija

Globalne postavke dostupne su putem `/api/settings/compression`. Postavke specifične za RTK također su
dostupne putem `/api/context/rtk/config`.

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

`enabledFilters` i `disabledFilters` koriste identifikatore filtara, primjerice `test-vitest` ili `git-diff`.

Potpuna struktura `rtkConfig` definirana je pomoću `RtkConfig` / `DEFAULT_RTK_CONFIG` u
`open-sse/services/compression/types.ts`. Cijeli se objekt pohranjuje kao jedna JSON vrijednost u
SQLite tablici `key_value` pod `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), a pri čitanju ga normalizira `normalizeRtkConfig`. Stoga se svako polje u nastavku
— uključujući `enableGrouping`, `groupingThreshold`, `stripCodeComments` i `preserveDocstrings` —
prenosi kroz isto spremište u oba smjera i ostaje sačuvano nakon ponovnog pokretanja.

| Ključ                  | Zadana vrijednost | Svrha                                                                                       |
| ---------------------- | ----------------- | ------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`               | Na razini mehanizma: najmanji broj uzastopnih identičnih redaka za sažimanje (raspon 2–100) |
| `enableGrouping`       | `false`           | Neobavezno: sažimanje nizova gotovo jednakovrijednih uzastopnih redaka                      |
| `groupingThreshold`    | `3`               | Najmanji broj uzastopnih sličnih redaka koji pokreće grupiranje                             |
| `stripCodeComments`    | `false`           | Neobavezno: uklanjanje komentara iz ograđenih blokova koda (zahtijeva `applyToCodeBlocks`)  |
| `preserveDocstrings`   | `true`            | Pri uklanjanju komentara zadrži JSDoc/`/** … */` blokove                                    |

## API

| Ruta                               | Metoda | Svrha                                                          |
| ---------------------------------- | ------ | -------------------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Čitanje konfiguracije RTK-a                                    |
| `/api/context/rtk/config`          | PUT    | Ažuriranje konfiguracije RTK-a                                 |
| `/api/context/rtk/filters`         | GET    | Popis kataloga filtara i dijagnostike učitavanja               |
| `/api/context/rtk/import`          | POST   | Provjera valjanosti ili instalacija datoteka RTK TOML sheme v1 |
| `/api/context/rtk/test`            | POST   | Pretpregled RTK kompresije za jedan tekstualni sadržaj         |
| `/api/context/rtk/raw-output/[id]` | GET    | Čitanje zadržanog redigiranog neobrađenog izlaza               |
| `/api/compression/preview`         | POST   | Pretpregled bilo kojeg načina kompresije                       |

Sadržaj zahtjeva za testiranje RTK-a:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Sadržaj zahtjeva za pretpregled kompresije:

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

Rute za upravljanje zahtijevaju ovlasti za upravljanje nadzornom pločom ili odgovarajuća pravila API ključa.

Sadržaj zahtjeva za provjeru valjanosti RTK TOML-a:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Upotrijebite `"action": "install"` za globalnu instalaciju provjerene datoteke. Dodajte `"overwrite": true` tek
nakon pregleda i potvrde zamjene postojeće globalne datoteke.

## Oporavak neobrađenog izlaza

RTK obično vraća samo komprimirani tekst. Za otklanjanje pogrešaka `rawOutputRetention` može zadržati redigirani
neobrađeni izlaz:

| Vrijednost | Ponašanje                                                        |
| ---------- | ---------------------------------------------------------------- |
| `never`    | Ne zadržavaj neobrađeni izlaz                                    |
| `failures` | Zadrži samo izlaz koji vjerojatno upućuje na neuspjeh            |
| `always`   | Zadrži svaki komprimirani neobrađeni izlaz RTK-a nakon redakcije |

Zadržane datoteke zapisuju se u:

```txt
DATA_DIR/rtk/raw-output/
```

Tajne se redigiraju prije pohrane, uključujući uobičajene nositeljske tokene, API ključeve, Slack tokene,
AWS pristupne ključeve i vrijednosti u obliku dodjele `token=...`, `secret=...`, `password=...`. Analitika
pohranjuje samo identifikator pokazivača, veličinu i metapodatke sažetka.

## Kontrolna provjera

Ciljana kontrolna provjera pokreće ugrađene umetnute testove filtara bez pozivanja vanjskih naredbi putem ljuske:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Šira kontrolna provjera RTK-a glasi:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Prije izdanja pokrenite široku kontrolnu provjeru kompresije:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Proširivanje RTK-a

1. Dodajte ili ažurirajte JSON datoteku filtra.
2. Uključite barem jedan uzorak `tests[]` koji dokazuje važno ponašanje.
3. Dodajte oglednu datoteku u `tests/unit/compression/fixtures/rtk/` za nove porodice naredbi.
4. Pri uvođenju nove klase izlaza dodajte pokrivenost otkrivanja naredbi.
5. Pokrenite ciljanu i širu kontrolnu provjeru RTK-a.
6. Ako je filtar lokalno vezan uz projekt, predajte `.rtk/filters.json` i osvježite `.rtk/trust.json` tek nakon pregleda.

---

## Razine intenziteta (v3.8.16+)

RTK podržava **3 razine intenziteta** koje nude kompromis između **agresivnosti kompresije** i **sigurnosti**. Razina se postavlja putem `config.intensity` u konfiguraciji pogona.

### Tri razine

| Razina              | Prag skraćivanja      | Ušteda tokena | Rizik      | Najprikladnije za                 |
| ------------------- | --------------------- | ------------- | ---------- | --------------------------------- |
| `minimal`           | 24 retka po odjeljku  | ~20-40%       | Vrlo nizak | Produkciju s kritičnim kontekstom |
| `standard` (zadano) | 24 retka po odjeljku  | ~50-70%       | Nizak      | Svakodnevne sesije programiranja  |
| `aggressive`        | 16 redaka po odjeljku | ~70-90%       | Srednji    | Duge sesije, maksimalnu uštedu    |

### Gdje se skraćivanje odvija

Prag skraćivanja utječe na `lineFilter.ts`:

```ts
// Iz open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Čuvaju se i **početak** i **završetak** svakog odjeljka; sadržaj u sredini odbacuje se kada se aktivira skraćivanje.

### Što ostaje, a što se uklanja

| Sadržaj                      | minimal     | standard    | aggressive  |
| ---------------------------- | ----------- | ----------- | ----------- |
| Pogreške / stogovi poziva    | ✅ sačuvano | ✅ sačuvano | ✅ sačuvano |
| Neuspjeli testovi            | ✅ sačuvano | ✅ sačuvano | ✅ sačuvano |
| Pogreške izgradnje           | ✅ sačuvano | ✅ sačuvano | ✅ sačuvano |
| Uspješni testovi (opširno)   | ✅ sačuvano | 🟡 sažeto   | 🟡 sažeto   |
| Rutinski izlaz (info zapisi) | 🟡 sažeto   | 🟡 sažeto   | ❌ odbačeno |
| Trake napretka               | 🟡 sažeto   | ❌ odbačeno | ❌ odbačeno |
| Natpis / ASCII grafika       | 🟡 sažeto   | ❌ odbačeno | ❌ odbačeno |

### Odabir odgovarajućeg intenziteta

```
                  Je li gubitak konteksta katastrofalan?
                  │
      ┌───────────┼───────────┐
      │           │           │
     DA          NE       NISTE SIGURNI
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Koliko je       Najprije pokušajte
      │      propusnost      `standard` (radi u
      │      kritična?       80% slučajeva)
      │           │
      │      ┌────┴────┐
      │      │         │
      │    NISKA     VISOKA
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Konfiguriranje intenziteta

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

**Programsko**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) jest
`CompressionEngine` i nema metodu `updateConfig`. Umjesto toga ažurirajte konfiguraciju pogona
putem pomoćne funkcije registra:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Provjera učinka

Upotrijebite **kontrolnu provjeru** (pogledajte u nastavku) kako biste potvrdili da je vaš filtar siguran pri odabranom intenzitetu:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filters failed at aggressive intensity");
}
```

---

## Razvoj prilagođenih filtara (v3.8.16+)

Direktorij `engines/rtk/filters/` sadrži **više od 49 ugrađenih JSON datoteka filtara**. Možete dodati vlastite filtre kako biste saželi izlaz prilagođenih alata koji nisu obuhvaćeni zadanim postavkama.

### Shema filtra (Zod)

```ts
{
  "id": "string",                      // Obavezno. Identifikator filtra (kebab-case, npr. "python-traceback")
  "label": "string",                   // Obavezno. Čitljiv naziv filtra
  "description": "string",             // Neobavezno (zadano: ""). Kratak opis onoga što filtar radi
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Neobavezno (0-100, zadano: 50). Redoslijed izvršavanja (više = prvo)
  "match": {
    "commands": ["string"],            // Nazivi naredbi za podudaranje (npr. "python", "pytest")
    "patterns": ["string"],            // Regex obrasci za podudaranje izlaza
    "outputTypes": ["string"]          // Otkrivene klase izlaza (npr. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Neobavezno (zadano: false). Ukloni ANSI kodove boja
    "replace": [                       // Pravila za pronalaženje i zamjenu (zadano: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Prekini obradu pri podudaranju obrasca (zadano: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Preskoči ako se ovaj obrazac podudara
      }
    ],
    "includePatterns": ["string"],     // Retci koje treba zadržati (regex obrasci, zadano: [])
    "dropPatterns": ["string"],        // Retci koje treba ukloniti (regex obrasci, zadano: [])
    "collapsePatterns": ["string"],    // Retci koje treba svesti na jedno pojavljivanje (zadano: [])
    "deduplicate": boolean,            // Neobavezno (zadano: false). Ukloni duplicirane retke
    "truncateLineAt": number,          // Neobavezno (zadano: 0). Skrati retke na najveći broj znakova
    "maxLines": number,                // Neobavezno (zadano: 0). Čvrsto ograničenje ukupnog broja redaka
    "headLines": number,               // Neobavezno (zadano: 20). Zadrži prvih N redaka podudarnog izlaza
    "tailLines": number,               // Neobavezno (zadano: 20). Zadrži posljednjih N redaka podudarnog izlaza
    "onEmpty": "string",               // Neobavezno (zadano: ""). Zamjenska poruka ako su svi retci filtrirani
    "filterStderr": boolean            // Neobavezno (zadano: false). Filtriraj i stderr izlaz
  },
  "preserve": {
    "errorPatterns": ["string"],       // Obrasci koji se uvijek moraju sačuvati (zadano: [])
    "summaryPatterns": ["string"]      // Obrasci za završni redak sažetka (zadano: [])
  },
  "tests": [                           // Ugrađeni testovi za provjeru (zadano: [])
    {
      "name": "string",               // Obavezno. Naziv testa
      "input": "sample output",        // Obavezno. Primjer ulaznog teksta
      "expected": "expected output",   // Obavezno. Očekivani sažeti izlaz
      "command": "optional command"    // Neobavezno. Kontekst naredbe
    }
  ]
}
```

### Primjer: filtar Python tracebacka

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

### Učitavanje prilagođenih filtara

Smjestite datoteku na prepoznatu lokaciju:

```
~/.omniroute/rtk/filters/my-filter.json     # Na razini korisnika
<project>/.rtk/filters/my-filter.json      # Na razini projekta
```

Filtri se automatski učitavaju pri pokretanju putem funkcije `loadRtkFilters()` u datoteci `open-sse/services/compression/engines/rtk/filterLoader.ts`. Učitavač pronalazi filtre iz sljedećih izvora:

- Ugrađeni katalog: `open-sse/services/compression/engines/rtk/filters/`
- Korisnički direktorij: `~/.omniroute/rtk/filters/`
- Projektni direktorij: `<project>/.rtk/filters/`

Za programsko učitavanje filtara:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opcije: customFiltersEnabled (učitavanje korisničkih/projektnih filtara, zadano uključeno),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Provjera valjanosti

Pri učitavanju se filtri provjeravaju prema Zod shemi. Filtar s neispravnom strukturom neće se učitati i zabilježit će pogrešku:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Da biste provjerili sve instalirane filtre, pozovite `runRtkFilterTests()`, koji se izvozi iz `open-sse/services/compression/engines/rtk/verify.ts`.

### Najbolje prakse

1. **Uvijek uključite `tests[]`** — oni dokazuju da vaš filtar radi i sprječavaju regresije
2. **Koristite `matchOutput` za prijevremene izlaze** — ako jedan redak govori cijelu priču, zamijenite cijeli blok
3. **Dajte prednost opciji `keep` pred opcijom `strip`** — eksplicitna pravila „uvijek sačuvaj” sigurnija su od pravila „uvijek ukloni”
4. **Testirajte na sve 3 razine intenziteta** — `minimal` ne bi trebao ništa mijenjati, a `aggressive` bi i dalje trebao sačuvati pogreške
5. **Koristite polje `unless`** — zaštitite prijevremene izlaze uvjetom „nemoj aktivirati ako je prisutan X”

---

## Oporavak neobrađenog izlaza i provjera

Kada RTK agresivno sažima izlaz, možete **oporaviti izvorni tekst** radi otklanjanja pogrešaka, revizije ili ponovne reprodukcije.

### Kako funkcionira oporavak neobrađenog izlaza

```
Izvorni izlaz (10K tokena)
        │
        ▼
RTK sažimanje (uz rawOutput.enabled=true)
        │
        ├─▶ Sažeti izlaz (2K tokena)       ──▶ prema LLM-u
        │
        └─▶ Izvorni izlaz (10K tokena)     ──▶ pohranjen u bazi podataka
                                                  (povezan putem request_id)
```

### Omogućavanje pohrane neobrađenog izlaza

**Po zahtjevu** (u kombiniranoj konfiguraciji):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // ograničenje od 1 MB
    }
  }
}
```

**Zadano**: `rawOutput.enabled: false` (štedi prostor za pohranu).

### Trošak pohrane

| Po zahtjevu                 | Ograničenje od 1 MB | Ograničenje od 10 MB |
| --------------------------- | ------------------- | -------------------- |
| Prosječni sažeti izlaz      | ~5KB                | ~5KB                 |
| Pohranjeni neobrađeni izlaz | ~50-500KB           | ~500KB-5MB           |
| Uz 1000 zahtjeva dnevno     | 50-500MB/dan        | 500MB-5GB/dan        |

> **Preporuka**: Omogućite neobrađeni izlaz samo za **sesije otklanjanja pogrešaka** ili **reviziju uzorkovanjem**, a ne trajno.

### Oporavak izvornika

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId iz statistike sažimanja
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` se nakon sažimanja vraća u `CompressionStats.rtkRawOutputPointers[]`.
Potpis funkcije potražite u `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Provjera

**Provjera RTK filtara** (`open-sse/services/compression/engines/rtk/verify.ts`) provjerava sve filtre prema njihovim `tests[]` i osigurava ispravno ponašanje na sve 3 razine intenziteta.

**Pozovite `runRtkFilterTests()`** kako biste pokrenuli provjeru:

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

**Što se provjerava**:

1. Svaki se filtar učitava i prolazi provjeru valjanosti sheme
2. Svaki unos u `tests[]` proizvodi očekivani izlaz
3. Intenzitet `minimal` ne izvodi nikakve promjene (zadržava izvornik i primjenjuje samo strukturne filtre)
4. Intenzitet `aggressive` zadržava pogreške, neuspješne testove i tragove stoga
5. Sažeti izlaz nikada nije veći od izvornog ulaza

- Izvor: `open-sse/services/compression/engines/rtk/` (63 datoteke, ~70KB)

- **Prije spajanja izmjene filtra** — uvijek provjerite prolaze li testovi
- **Nakon nadogradnje RTK mehanizma** — shema se možda promijenila
- **Periodično tijekom nadzora** — štiti od odstupanja u testnim podacima
- **Pri dodavanju nove obitelji alata/naredbi** — dokazuje da novi filtar radi

---

## Vidi također

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Cjelovit pregled tijeka kompresije
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registar mehanizama i ugrađeni mehanizmi
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Prilagođeni mehanizmi, jezični paketi, složeni tijekovi
- Izvor: `open-sse/services/compression/engines/rtk/` (63 datoteke, ~70 KB)
