# RTK Compression (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Stiskanje RTK je OmniRouteov mehanizem za stiskanje izhoda terminala in orodij, ki upošteva ukaze. Zasnovan je za seje kodirnih agentov, pri katerih večina rasti konteksta izvira iz dnevnikov testov, izhoda gradenj, šuma upravljalnikov paketov, prepisov lupine, izhoda Dockerja, izhoda gita in sledi sklada.

RTK se lahko izvaja neposredno z `defaultMode: "rtk"` ali kot prvi korak v sestavljenem cevovodu, običajno:

```txt
rtk -> caveman
```

Ta vrstni red najprej stisne šumni strojni izhod, nato pa omogoči Cavemanu, da zgosti preostalo besedilo.

Izvorni RTK poroča o `60-90%` prihranku pri izhodu ukazov. Vzorčna seja v njegovem README se zmanjša s
`~118,000` standardnih žetonov na `~23,900` žetonov RTK, kar pomeni `79.7%` prihranka (`~80%`). OmniRoute uporablja
to izvorno povprečje za izračun sestavljenega prihranka s Cavemanovim stiskanjem vhoda:

```txt
Povprečje RTK:  80% prihranka
Vhod Caveman:   46% prihranka
Sestavljeno:    1 - (1 - 0.80) * (1 - 0.46) = 89.2% prihranka
Razpon:         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Kaj stiska

Vgrajeni katalog trenutno vključuje 49 filtrov v naslednjih kategorijah:

| Kategorija | Primeri                                                       |
| ---------- | ------------------------------------------------------------- |
| `git`      | `git status`, `git branch`, `git diff`, `git log`             |
| `test`     | Vitest, Jest, Pytest, Playwright, testi Go, testi Cargo       |
| `build`    | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package`  | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`    | `ls`, `find`, `grep`, splošni dnevniki lupine                 |
| `docker`   | `docker ps`, dnevniki Dockerja                                |
| `infra`    | Terraform, OpenTofu, `systemctl status`                       |
| `generic`  | Izhod JSON, sledi sklada, splošna nadomestna obravnava izhoda |

Detektor v `open-sse/services/compression/engines/rtk/commandDetector.ts` razvrsti izhod
pred izbiro filtra. Filtri se lahko ujemajo tudi po vzorcu ukaza ali regularnem izrazu izhoda, kadar razred
ukaza ne zadostuje.

## Razreševanje filtrov

RTK nalaga filtre v tem vrstnem redu:

1. Projektni filtri iz `.rtk/filters.toml` in `.rtk/filters.json`, vendar samo, če so zaupanja vredni.
2. Globalni filtri iz `DATA_DIR/rtk/filters.toml` in `DATA_DIR/rtk/filters.json`.
3. Vgrajeni filtri iz `open-sse/services/compression/engines/rtk/filters/`.

Znotraj istega obsega imajo filtri sheme RTK TOML v1 prednost pred filtri OmniRoute JSON. Izrazi TOML
`match_command` se preverijo pred ujemanjem vrste ukaza, tako da lahko uvoženi filter za določen ukaz
preglasi splošnejši filter v tem obsegu. Projektni obseg ima še vedno prednost pred globalnim
obsegom ne glede na obliko datoteke.

Projektni filtri so namenoma omejeni z zahtevo po zaupanju, ker lahko filtri z regularnimi izrazi spremenijo način prikaza izhoda orodij
agentom. Datoteka s projektnimi filtri je sprejeta, kadar velja eden od teh pogojev:

- `rtkConfig.trustProjectFilters` je `true`.
- Nastavljen je `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` vsebuje ustrezno zgoščeno vrednost SHA-256 za datoteko s projektnimi filtri.

Primer datoteke zaupanja:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Zgoščene vrednosti so ločene: `filtersSha256` označuje `.rtk/filters.json` kot zaupanja vredno, medtem ko `filtersTomlSha256`
označuje `.rtk/filters.toml` kot zaupanja vredno. Urejanje katere koli datoteke razveljavi samo njen vnos zaupanja. Globalne datoteke
namesti skrbnik in uporabljajo obstoječe vedenje zaupanja za globalne filtre.

Filtri po meri so lahko en objekt filtra ali polje objektov filtrov. Neveljavni filtri po meri so
preskočeni in navedeni v diagnostiki `/api/context/rtk/filters`. Neveljavni vgrajeni filtri povzročijo takojšnjo napako.

## Združljivost s shemo RTK TOML v1

OmniRoute lahko razčleni, preveri, preizkusi in namesti deklarativne datoteke filtrov, ki uporabljajo shemo RTK TOML v1.
Podprta polja so `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` in vdelani preizkusi `[[tests.<filter>]]`.
Neznana polja, neveljavni ali nevarni regularni izrazi, sočasna pravila za odstranjevanje in ohranjanje, datoteke, večje od
1 MiB, ter sklici na neznane filtre so zavrnjeni. Datoteko, katere vdelani preizkusi niso uspešni, je mogoče
preveriti za namen pregleda, vendar je ni mogoče namestiti ali naložiti. Napake pri nalaganju datotek po meri še naprej
omogočajo nemoteno delovanje: neveljavna datoteka je preskočena, preostali filtri pa še naprej delujejo.

OmniRoute prejme izhod orodja, potem ko ga je odjemalec že zajel, zato `filter_stderr = true`
ne more spremeniti zajemanja procesa. Polje je sprejeto brez učinka, preverjanje pa vrne opozorilo.
To je namenoma opisano kot **združljivost s shemo RTK TOML v1** in ne kot popolna združljivost
z izvršljivo datoteko RTK, lupinskimi kavlji, implementacijami ukazov v jeziku Rust ali njegovo strukturo shrambe zaupanja.

Napredni pogled RTK na nadzorni plošči sprejema prilepljene ali naložene datoteke TOML. Preverjanje je samo za branje.
Namestitev atomsko zapiše `DATA_DIR/rtk/filters.toml` z omejevalnimi dovoljenji in osveži
aktivni katalog filtrov brez ponovnega zagona. Zamenjava obstoječe datoteke zahteva izrecno potrditev `overwrite`
in najprej ustvari `DATA_DIR/rtk/filters.toml.bak`.

## DSL filtrov

Filtri uporabljajo shemo JSON, opisano v dokumentu [Oblika pravil stiskanja](./COMPRESSION_RULES_FORMAT.md).
Izvajalno okolje uporabi te faze v navedenem vrstnem redu:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> odstrani/vključi vrstice
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Pomembna polja:

| Polje                        | Namen                                                           |
| ---------------------------- | --------------------------------------------------------------- |
| `rules.stripAnsi`            | Pred ujemanjem odstrani terminalna barvna/nadzorna zaporedja    |
| `rules.filterStderr`         | Pred ujemanjem/filtriranjem normalizira pogoste predpone stderr |
| `rules.replace`              | Uporabi urejene zamenjave z regularnimi izrazi                  |
| `rules.matchOutput`          | Vrne strnjen povzetek, ko se izhod ujema z znanim pogojem       |
| `rules.matchOutput[].unless` | Preskoči bližnjico, ko je prisoten vzorec napake/neuspeha       |
| `rules.dropPatterns`         | Odstrani moteče vrstice                                         |
| `rules.includePatterns`      | Daje prednost vrsticam, na podlagi katerih je mogoče ukrepati   |
| `rules.collapsePatterns`     | Strne ponavljajoče se ujemajoče vrstice                         |
| `rules.deduplicate`          | Izbirno za posamezen filter: strne zaporedne podvojene vrstice  |
| `rules.truncateLineAt`       | Varno krajšanje posamezne vrstice glede na Unicode              |
| `rules.onEmpty`              | Nadomestno sporočilo, če so vse vrstice izločene                |
| `tests[]`                    | Vdelani vzorci, ki jih uporablja preverjevalni prehod           |

Vgrajeni filtri naj bi vključevali vdelane vzorce `tests[]`. Vključujejo naj jih tudi filtri po meri,
zlasti kadar so v skupni rabi med projekti.

## Odstranjevanje podvojenih vrstic (dve plasti)

RTK združuje podvojene vrstice na dveh neodvisnih plasteh:

1. **`deduplicate` na ravni filtra (izbirno, privzeto `false`).** Filter lahko nastavi `rules.deduplicate: true`,
   da pred krajšanjem združi zaporedne podvojene vrstice _znotraj ujemajočega se izhoda tega filtra_.
   To se izvaja znotraj `lineFilter.ts`. Za podedovane filtre se samodejno omogoči, ko filter definira
   `collapsePatterns`. Shema: `deduplicate: z.boolean().default(false)` v
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` na ravni celotnega pogona (privzeto `3`).** Ko se izvedejo vsi filtri, pogon združi
   vsako zaporedje `>= deduplicateThreshold` enakih zaporednih vrstic v celotnem rezultatu
   (`deduplicateRepeatedLines`, uporabljeno v `engines/rtk/index.ts`). Pri normalizaciji je vrednost omejena
   na 2–100.

Prehod na ravni filtra se izvede prvi (znotraj filtra), prehod na ravni celotnega pogona pa zadnji (nad združenim
izhodom), zato se oba dopolnjujeta brez dvojnega štetja.

## Združevanje vrstic (`enableGrouping`)

Ko je `rtkConfig.enableGrouping` nastavljen na `true` (privzeto `false`), RTK nad rezultatom po odstranitvi
podvojitev izvede dodaten prehod `groupSimilarLines`, ki združi zaporedja _skoraj enakovrednih_ (ne pa bajtno
identičnih) zaporednih vrstic. `rtkConfig.groupingThreshold` (privzeto `3`) je najmanjša dolžina zaporedja, ki
sproži združevanje. To je strukturna ustreznica nastavitve `deduplicateThreshold`: odstranjevanje podvojitev
obravnava natančne ponovitve, združevanje pa »enako obliko z majhnimi razlikami«. Obe zastavici sta del zapisa
JSON `rtkConfig`, shranjenega v tabeli `key_value` (glejte razdelek Konfiguracija zgoraj), zato se nastavitev
ohrani tudi po ponovnih zagonih.

## Odstranjevanje komentarjev iz kode (`stripCodeComments` / `preserveDocstrings`)

Ko je omogočen `rtkConfig.applyToCodeBlocks`, lahko RTK odstrani tudi komentarje iz ograjenih kodnih blokov:

- `stripCodeComments` (privzeto `false`) — izbirno. Ko je nastavljen na `true`, RTK odstrani komentarje iz
  ograjenih blokov JavaScript in TypeScript. V preteklosti se je zastavica prebrala, vendar nikoli uporabila,
  zato privzeta nastavitev ostaja »ohrani«, da bi se izognili tihi spremembi v produkciji.
- `preserveDocstrings` (privzeto `true`) — pri odstranjevanju komentarjev se ohranijo blokovni komentarji
  JSDoc/`/** … */` (vsebujejo dokumentacijo API-ja, ki je vredna več kot bajti, ki jih zaseda). Nastavite na
  `false`, da odstranite tudi te.

Odstranjevanje komentarjev je implementirano v `open-sse/services/compression/engines/rtk/codeStripper.ts`.
Uporablja **razčlenjevalnik TypeScript** (ne regularnega izraza), zato nizovnih, predložnih in regexnih
literalov nikoli ne zamenja za komentarje; če zazna JSX, pa postopek v celoti prekine (zato komentarji v
vsebnikih izrazov JSX niso nikoli poškodovani). Odstranjevanje komentarjev trenutno velja **samo za JavaScript
in TypeScript** — pri drugih jezikih iz nabora `CodeLanguage` odstranjevalnika (Python, Rust, Go, Ruby, Java)
se združujejo prazne vrstice in presledki, komentarji pa se ne odstranjujejo. Izvajanje nad očiščenim blokom
je v `rulesApplied` označeno z `rtk:code-strip`.

> **Opomba — GCF/tabularno kodiranje je ločen pogon.** RTK **ne** vsebuje tabularnega/stolpčnega kodirnika
> JSON »GCF« (Graph Compact Format). Ta kodirnik — ki je nadomestil starejši kodirnik `omni-tabular` — je v
> pogonu **headroom** (`open-sse/services/compression/engines/headroom/`, priloženi kodek pa je v
> `headroom/gcf/`). Ni povezan s cevovodom filtrov RTK, ki je dokumentiran tukaj.

## Konfiguracija

Globalne nastavitve so na voljo prek `/api/settings/compression`. Nastavitve, specifične za RTK, so prav tako
na voljo prek `/api/context/rtk/config`.

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

`enabledFilters` in `disabledFilters` uporabljata identifikatorje filtrov, na primer `test-vitest` ali `git-diff`.

Celotno strukturo `rtkConfig` določata `RtkConfig` / `DEFAULT_RTK_CONFIG` v
`open-sse/services/compression/types.ts`. Celoten objekt je shranjen kot ena sama vrednost JSON v
tabeli SQLite `key_value` pod `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), ob branju pa ga normalizira `normalizeRtkConfig`. Tako se vsako spodnje
polje — vključno z `enableGrouping`, `groupingThreshold`, `stripCodeComments` in `preserveDocstrings` —
prenese skozi isto shrambo in ohrani po ponovnem zagonu.

| Ključ                  | Privzeto | Namen                                                                                    |
| ---------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`      | Za celoten pogon: najmanjše število zaporednih enakih vrstic za strnitev (omejeno 2–100) |
| `enableGrouping`       | `false`  | Izbirno: strni nize skoraj enakovrednih zaporednih vrstic                                |
| `groupingThreshold`    | `3`      | Najmanjše število zaporednih podobnih vrstic, ki sproži združevanje                      |
| `stripCodeComments`    | `false`  | Izbirno: odstrani komentarje iz ograjenih blokov kode (zahteva `applyToCodeBlocks`)      |
| `preserveDocstrings`   | `true`   | Pri odstranjevanju komentarjev ohrani bloke JSDoc/`/** … */`                             |

## API

| Pot                                | Metoda | Namen                                            |
| ---------------------------------- | ------ | ------------------------------------------------ |
| `/api/context/rtk/config`          | GET    | Preberi konfiguracijo RTK                        |
| `/api/context/rtk/config`          | PUT    | Posodobi konfiguracijo RTK                       |
| `/api/context/rtk/filters`         | GET    | Prikaži katalog filtrov in diagnostiko nalaganja |
| `/api/context/rtk/import`          | POST   | Preveri ali namesti datoteke RTK TOML s shemo v1 |
| `/api/context/rtk/test`            | POST   | Predogled stiskanja RTK za eno besedilno vsebino |
| `/api/context/rtk/raw-output/[id]` | GET    | Preberi shranjen redigiran neobdelan izhod       |
| `/api/compression/preview`         | POST   | Predogled katerega koli načina stiskanja         |

Vsebina zahteve za preizkus RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Vsebina zahteve za predogled stiskanja:

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

Upravljavske poti zahtevajo upravljavsko preverjanje pristnosti nadzorne plošče ali ustrezno politiko ključa API.

Vsebina zahteve za preverjanje RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Za globalno namestitev preverjene datoteke uporabite `"action": "install"`. Dodajte `"overwrite": true` šele
po pregledu in potrditvi zamenjave obstoječe globalne datoteke.

## Obnovitev neobdelanega izhoda

RTK običajno vrne samo stisnjeno besedilo. Za odpravljanje napak lahko `rawOutputRetention` ohrani anonimiziran
neobdelani izhod:

| Vrednost   | Vedenje                                                    |
| ---------- | ---------------------------------------------------------- |
| `never`    | Ne ohrani neobdelanega izhoda                              |
| `failures` | Ohrani samo izhod, ki najverjetneje kaže na napako         |
| `always`   | Po anonimizaciji ohrani vsak stisnjen neobdelani izhod RTK |

Ohranjene datoteke se zapišejo v:

```txt
DATA_DIR/rtk/raw-output/
```

Skrivnosti se anonimizirajo pred trajnim shranjevanjem, vključno z običajnimi žetoni bearer, ključi API, žetoni Slack,
ključi za dostop AWS in vrednostmi v obliki prireditve `token=...`, `secret=...`, `password=...`. Analitika
shrani samo metapodatke o ID-ju kazalca, velikosti in zgoščeni vrednosti.

## Preverjevalna pregrada

Usmerjena preverjevalna pregrada izvaja vgrajene sprotne teste filtrov brez zaganjanja zunanjih ukazov prek lupine:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Širša pregrada RTK je:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Pred izdajo zaženite široko pregrado stiskanja:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Razširjanje RTK-ja

1. Dodajte ali posodobite datoteko JSON s filtri.
2. Vključite vsaj en primer `tests[]`, ki dokazuje pomembno vedenje.
3. Za nove družine ukazov dodajte testni primerek v `tests/unit/compression/fixtures/rtk/`.
4. Ob uvedbi novega razreda izhoda dodajte pokritost zaznavanja ukazov.
5. Zaženite preverjevalno in širšo pregrado RTK.
6. Če je filter lokalen za projekt, uveljavite `.rtk/filters.json` in osvežite `.rtk/trust.json` šele po pregledu.

---

## Ravni intenzivnosti (v3.8.16+)

RTK podpira **3 ravni intenzivnosti**, ki predstavljajo kompromis med **agresivnostjo stiskanja** in **varnostjo**. Raven se nastavi prek `config.intensity` v konfiguraciji mehanizma.

### Tri ravni

| Raven                 | Prag krajšanja        | Prihranek žetonov | Tveganje   | Najprimernejša uporaba            |
| --------------------- | --------------------- | ----------------- | ---------- | --------------------------------- |
| `minimal`             | 24 vrstic na razdelek | ~20-40%           | Zelo nizko | Produkcija s kritičnim kontekstom |
| `standard` (privzeto) | 24 vrstic na razdelek | ~50-70%           | Nizko      | Vsakodnevne seje programiranja    |
| `aggressive`          | 16 vrstic na razdelek | ~70-90%           | Srednje    | Dolge seje, največji prihranek    |

### Kje se izvaja krajšanje

Prag krajšanja vpliva na `lineFilter.ts`:

```ts
// Iz open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Ohranita se tako **začetek** kot **konec** vsakega razdelka; ko se sproži krajšanje, se vmesna vsebina odstrani.

### Kaj ostane in kaj se odstrani

| Vsebina                                 | minimal      | standard       | aggressive     |
| --------------------------------------- | ------------ | -------------- | -------------- |
| Napake/sledi sklada                     | ✅ ohranjeno | ✅ ohranjeno   | ✅ ohranjeno   |
| Neuspešni testi                         | ✅ ohranjeno | ✅ ohranjeno   | ✅ ohranjeno   |
| Napake pri gradnji                      | ✅ ohranjeno | ✅ ohranjeno   | ✅ ohranjeno   |
| Uspešni testi (podrobno)                | ✅ ohranjeno | 🟡 strnjeno    | 🟡 strnjeno    |
| Rutinski izhod (informacijski dnevniki) | 🟡 strnjeno  | 🟡 strnjeno    | ❌ odstranjeno |
| Vrstice napredka                        | 🟡 strnjeno  | ❌ odstranjeno | ❌ odstranjeno |
| Pasice/umetnost ASCII                   | 🟡 strnjeno  | ❌ odstranjeno | ❌ odstranjeno |

### Izbira ustrezne intenzivnosti

```
                  Ali je izguba konteksta katastrofalna?
                  │
      ┌───────────┼───────────┐
      │           │           │
     DA          NE          NISTE PREPRIČANI
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Kako kritična   Najprej poskusite `standard`
      │      je prepustnost? (deluje v 80 %
      │           │          primerov)
      │      ┌────┴────┐
      │      │         │
      │    NIZKA     VISOKA
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Konfiguriranje intenzivnosti

**Za posamezno kombinacijo** (v konfiguraciji kombinacije):

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

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) je
`CompressionEngine` in nima metode `updateConfig`. Konfiguracijo mehanizma
namesto tega posodobite prek pomožne funkcije registra:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Preverjanje učinka

Uporabite **preverjevalno pregrado** (glejte spodaj), da potrdite, da je vaš filter varen pri izbrani intenzivnosti:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtri niso uspešno prestali preverjanja pri agresivni intenzivnosti");
}
```

---

## Razvoj filtrov po meri (v3.8.16+)

Imenik `engines/rtk/filters/` vsebuje **več kot 49 vgrajenih datotek filtrov JSON**. Dodate lahko lastne filtre za stiskanje izhoda orodij po meri, ki jih privzeti filtri ne pokrivajo.

### Shema filtra (Zod)

```ts
{
  "id": "string",                      // Obvezno. Identifikator filtra (kebab-case, npr. "python-traceback")
  "label": "string",                   // Obvezno. Človeku berljivo ime filtra
  "description": "string",             // Izbirno (privzeto: ""). Kratek opis delovanja filtra
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Izbirno (0–100, privzeto: 50). Vrstni red izvajanja (višje = prej)
  "match": {
    "commands": ["string"],            // Imena ukazov za ujemanje (npr. "python", "pytest")
    "patterns": ["string"],            // Vzorci regularnih izrazov za ujemanje z izhodom
    "outputTypes": ["string"]          // Zaznani razredi izhoda (npr. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Izbirno (privzeto: false). Odstrani barvne kode ANSI
    "replace": [                       // Pravila iskanja in zamenjave (privzeto: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Ob ujemanju vzorca predčasno zaključi obdelavo (privzeto: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Preskoči, če se ta vzorec ujema
      }
    ],
    "includePatterns": ["string"],     // Vrstice, ki naj se ohranijo (vzorci regularnih izrazov, privzeto: [])
    "dropPatterns": ["string"],        // Vrstice, ki naj se odstranijo (vzorci regularnih izrazov, privzeto: [])
    "collapsePatterns": ["string"],    // Vrstice, ki naj se združijo v eno pojavitev (privzeto: [])
    "deduplicate": boolean,            // Izbirno (privzeto: false). Odstrani podvojene vrstice
    "truncateLineAt": number,          // Izbirno (privzeto: 0). Skrajša vrstice na največje število znakov
    "maxLines": number,                // Izbirno (privzeto: 0). Stroga omejitev skupnega števila vrstic
    "headLines": number,               // Izbirno (privzeto: 20). Ohrani prvih N vrstic ujemajočega se izhoda
    "tailLines": number,               // Izbirno (privzeto: 20). Ohrani zadnjih N vrstic ujemajočega se izhoda
    "onEmpty": "string",               // Izbirno (privzeto: ""). Nadomestno sporočilo, če so filtrirane vse vrstice
    "filterStderr": boolean            // Izbirno (privzeto: false). Filtrira tudi izhod stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Vzorci, ki morajo biti vedno ohranjeni (privzeto: [])
    "summaryPatterns": ["string"]      // Vzorci za končno vrstico povzetka (privzeto: [])
  },
  "tests": [                           // Vdelani preizkusi za preverjanje (privzeto: [])
    {
      "name": "string",               // Obvezno. Ime preizkusa
      "input": "sample output",        // Obvezno. Vzorčno vhodno besedilo
      "expected": "expected output",   // Obvezno. Pričakovani stisnjeni izhod
      "command": "optional command"    // Izbirno. Kontekst ukaza
    }
  ]
}
```

### Primer: filter povratnih sledi Python

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

### Nalaganje filtrov po meri

Datoteko shranite na eno od prepoznanih mest:

```
~/.omniroute/rtk/filters/my-filter.json     # Na ravni uporabnika
<project>/.rtk/filters/my-filter.json      # Na ravni projekta
```

Filtri se ob zagonu samodejno naložijo prek funkcije `loadRtkFilters()` v `open-sse/services/compression/engines/rtk/filterLoader.ts`. Nalagalnik poišče filtre na naslednjih mestih:

- Vgrajeni katalog: `open-sse/services/compression/engines/rtk/filters/`
- Uporabniški imenik: `~/.omniroute/rtk/filters/`
- Projektni imenik: `<project>/.rtk/filters/`

Za programsko nalaganje filtrov:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Možnosti: customFiltersEnabled (nalaganje uporabniških/projektnih filtrov, privzeto omogočeno),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Preverjanje veljavnosti

Veljavnost filtrov se ob nalaganju preveri glede na shemo Zod. Filter z nepravilno strukturo se ne bo naložil, napaka pa bo zabeležena v dnevnik:

```
RTK_FILTER_LOADER: preverjanje veljavnosti filtra "my-filter" ni uspelo:
  - rules.replace.0.pattern: Neveljaven regularni izraz
  - match.commands: ne sme biti prazno
```

Za preverjanje vseh nameščenih filtrov pokličite `runRtkFilterTests()`, ki je izvožena iz `open-sse/services/compression/engines/rtk/verify.ts`.

### Najboljše prakse

1. **Vedno vključite `tests[]`** — dokazujejo, da vaš filter deluje, in preprečujejo regresije
2. **Za kratkostične pogoje uporabite `matchOutput`** — če ena sama vrstica pove vse, zamenjajte celoten blok
3. **Dajte prednost `keep` pred `strip`** — eksplicitna pravila »vedno ohrani« so varnejša od pravil »vedno odstrani«
4. **Testirajte pri vseh 3 stopnjah intenzivnosti** — `minimal` ne sme povzročiti nobenih sprememb, `aggressive` pa mora še vedno ohraniti napake
5. **Uporabite polje `unless`** — kratkostične pogoje zaščitite s pravilom »ne sproži, če je prisoten X«

---

## Obnovitev neobdelanega izhoda in preveritveni prehod

Ko RTK agresivno stisne izhod, lahko **obnovite izvirno besedilo** za odpravljanje napak, revizijo ali ponovno predvajanje.

### Kako deluje obnovitev neobdelanega izhoda

```
Izvirni izhod (10K žetonov)
        │
        ▼
Stiskanje RTK (z rawOutput.enabled=true)
        │
        ├─▶ Stisnjen izhod (2K žetonov)  ──▶ v LLM
        │
        └─▶ Izvirni izhod (10K žetonov)  ──▶ shranjen v zbirki podatkov
                                                  (povezan prek request_id)
```

### Omogočanje shranjevanja neobdelanega izhoda

**Za posamezno zahtevo** (v kombinirani konfiguraciji):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Omejitev 1 MB
    }
  }
}
```

**Privzeto**: `rawOutput.enabled: false` (prihrani prostor za shranjevanje).

### Stroški shranjevanja

| Na zahtevo                | Omejitev 1 MB | Omejitev 10 MB |
| ------------------------- | ------------- | -------------- |
| Povprečen stisnjen izhod  | ~5KB          | ~5KB           |
| Shranjen neobdelani izhod | ~50-500KB     | ~500KB-5MB     |
| Pri 1000 zahtevah/dan     | 50-500MB/dan  | 500MB-5GB/dan  |

> **Priporočilo**: Neobdelani izhod omogočite samo za **seje odpravljanja napak** ali **vzorčene revizije**, ne pa ves čas.

### Obnovitev izvirnika

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId iz statistike stiskanja
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` se po stiskanju vrne v `CompressionStats.rtkRawOutputPointers[]`.
Za podpis funkcije glejte `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Preveritveni prehod

**Preverjanje filtrov RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) preveri vse filtre glede na njihove `tests[]` in zagotovi pravilno delovanje pri vseh 3 ravneh intenzivnosti.

Za izvedbo preverjanja **pokličite `runRtkFilterTests()`**:

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

**Kaj preverja**:

1. Vsak filter se naloži in uspešno prestane preverjanje sheme
2. Vsak vnos v `tests[]` ustvari pričakovani izhod
3. Intenzivnost `minimal` ne izvede sprememb (ohrani izvirnik in uporabi samo strukturne filtre)
4. Intenzivnost `aggressive` ohrani napake, neuspešne teste in sledi sklada
5. Stisnjen izhod ni nikoli večji od izvirnega vhoda

- Izvor: `open-sse/services/compression/engines/rtk/` (63 datotek, ~70KB)

- **Pred združitvijo spremembe filtra** — vedno zagotovite, da so testi uspešni
- **Po nadgradnji mehanizma RTK** — shema se je morda spremenila
- **Občasno med spremljanjem** — ščiti pred odstopanjem preskusnih podatkov
- **Pri dodajanju nove družine orodij/ukazov** — dokazuje, da novi filter deluje

---

## Glejte tudi

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Celovit pregled cevovoda stiskanja
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Register mehanizmov in vgrajeni mehanizmi
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Mehanizmi po meri, jezikovni paketi in zloženi cevovodi
- Izvorna koda: `open-sse/services/compression/engines/rtk/` (63 datotek, ~70 KB)
