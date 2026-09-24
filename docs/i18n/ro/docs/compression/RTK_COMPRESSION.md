# RTK Compression (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Compresia RTK este motorul OmniRoute de compresie adaptată comenzilor pentru ieșirea terminalului și a instrumentelor. Este
concepută pentru sesiuni cu agenți de programare, în care cea mai mare parte a creșterii contextului provine din jurnalele testelor, ieșirea proceselor de compilare,
mesajele redundante ale managerelor de pachete, transcrierile shell, ieșirea Docker, ieșirea git și urmele de stivă.

RTK poate rula direct cu `defaultMode: "rtk"` sau ca prim pas într-un pipeline compus, de obicei:

```txt
rtk -> caveman
```

Această ordine comprimă mai întâi ieșirea automată redundantă, apoi permite Caveman să condenseze textul rămas.

Proiectul RTK din amonte raportează economii de `60-90%` pentru ieșirea comenzilor. Sesiunea demonstrativă din README-ul său scade de la
`~118,000` de tokenuri standard la `~23,900` de tokenuri RTK, ceea ce înseamnă o economie de `79.7%` (`~80%`). OmniRoute folosește
această medie din amonte pentru calcularea economiilor compuse împreună cu compresia intrării Caveman:

```txt
Media RTK:       80% economisit
Intrare Caveman: 46% economisit
Compus:          1 - (1 - 0.80) * (1 - 0.46) = 89.2% economisit
Interval:        1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Ce comprimă

Catalogul încorporat include în prezent 49 de filtre din următoarele categorii:

| Categorie | Exemple                                                                |
| --------- | ---------------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`                      |
| `test`    | Vitest, Jest, Pytest, Playwright, teste Go, teste Cargo                |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx          |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler          |
| `shell`   | `ls`, `find`, `grep`, jurnale shell generice                           |
| `docker`  | `docker ps`, jurnale Docker                                            |
| `infra`   | Terraform, OpenTofu, `systemctl status`                                |
| `generic` | Ieșire JSON, urme de stivă, soluție de rezervă pentru ieșirea generică |

Detectorul din `open-sse/services/compression/engines/rtk/commandDetector.ts` clasifică ieșirea
înainte de selectarea filtrului. Filtrele se pot potrivi și după modelul comenzii sau după expresia regulată aplicată ieșirii atunci când o clasă
de comenzi nu este suficientă.

## Rezolvarea filtrelor

RTK încarcă filtrele în această ordine:

1. Filtrele proiectului din `.rtk/filters.toml` și `.rtk/filters.json`, numai atunci când sunt de încredere.
2. Filtrele globale din `DATA_DIR/rtk/filters.toml` și `DATA_DIR/rtk/filters.json`.
3. Filtrele încorporate din `open-sse/services/compression/engines/rtk/filters/`.

În cadrul aceluiași domeniu, filtrele RTK cu schema TOML v1 au prioritate față de filtrele JSON OmniRoute. Expresiile TOML
`match_command` sunt verificate înaintea potrivirii după tipul comenzii, astfel încât un filtru importat, specific unei comenzi,
să poată suprascrie un filtru mai general din domeniul respectiv. Domeniul proiectului are în continuare prioritate față de domeniul global,
indiferent de formatul fișierului.

Filtrele proiectului sunt restricționate în mod intenționat în funcție de nivelul de încredere, deoarece filtrele bazate pe expresii regulate pot schimba modul în care ieșirea instrumentelor este
afișată agenților. Un fișier de filtre al proiectului este acceptat atunci când una dintre următoarele condiții este adevărată:

- `rtkConfig.trustProjectFilters` este `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` este setată.
- `.rtk/trust.json` conține hash-ul SHA-256 corespunzător fișierului de filtre al proiectului.

Exemplu de fișier de încredere:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hash-urile sunt separate: `filtersSha256` acordă încredere fișierului `.rtk/filters.json`, iar `filtersTomlSha256`
acordă încredere fișierului `.rtk/filters.toml`. Editarea oricăruia dintre fișiere invalidează numai propria intrare de încredere. Fișierele globale
sunt instalate de administrator și utilizează comportamentul existent privind încrederea în filtrele globale.

Filtrele personalizate pot fi un singur obiect de filtru sau o matrice de obiecte de filtru. Filtrele personalizate nevalide sunt
omise și raportate de diagnosticele `/api/context/rtk/filters`. Filtrele încorporate nevalide provoacă imediat o eroare.

## Compatibilitate cu schema RTK TOML v1

OmniRoute poate analiza, valida, testa și instala fișiere de filtre declarative utilizând schema RTK TOML v1.
Câmpurile acceptate sunt `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` și testele inline `[[tests.<filter>]]`.
Câmpurile necunoscute, expresiile regulate nevalide sau nesigure, regulile simultane de eliminare/păstrare, fișierele de peste
1 MiB și referințele la filtre necunoscute sunt respinse. Un fișier ale cărui teste inline eșuează poate fi
validat pentru examinare, dar nu poate fi instalat sau încărcat. Erorile la încărcarea fișierelor personalizate rămân
de tip fail-open: fișierul nevalid este omis, iar filtrele rămase continuă să funcționeze.

OmniRoute primește rezultatul instrumentului după ce clientul l-a capturat deja, astfel încât `filter_stderr = true`
nu poate modifica procesul de capturare. Câmpul este acceptat ca operație fără efect, iar validarea returnează un avertisment.
Acest lucru este descris în mod intenționat drept **compatibilitate cu schema RTK TOML v1**, nu compatibilitate deplină
cu executabilul RTK, hook-urile shell, implementările comenzilor Rust sau structura depozitului său de încredere.

Vizualizarea RTK avansată din tabloul de bord acceptă conținut TOML lipit sau încărcat. Validarea este doar în citire.
Instalarea scrie atomic `DATA_DIR/rtk/filters.toml`, cu permisiuni restrictive, și actualizează
catalogul activ de filtre fără repornire. Înlocuirea unui fișier existent necesită confirmarea explicită `overwrite`
și creează mai întâi `DATA_DIR/rtk/filters.toml.bak`.

## DSL pentru filtre

Filtrele utilizează schema JSON descrisă în [Formatul regulilor de compresie](./COMPRESSION_RULES_FORMAT.md).
La rulare, aceste etape sunt aplicate în ordine:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> eliminare/includere linii
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Câmpuri importante:

| Câmp                         | Scop                                                                             |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Elimină secvențele de culoare/control ale terminalului înainte de potrivire      |
| `rules.filterStderr`         | Normalizează prefixele stderr uzuale înainte de potrivire/filtrare               |
| `rules.replace`              | Aplică în ordine înlocuirile bazate pe expresii regulate                         |
| `rules.matchOutput`          | Returnează un rezumat compact când rezultatul corespunde unei condiții cunoscute |
| `rules.matchOutput[].unless` | Omite scurtătura când este prezent un tipar de eroare/eșec                       |
| `rules.dropPatterns`         | Elimină liniile redundante                                                       |
| `rules.includePatterns`      | Acordă prioritate liniilor utile                                                 |
| `rules.collapsePatterns`     | Comasează liniile repetate care corespund tiparului                              |
| `rules.deduplicate`          | Activare per filtru: comasează liniile duplicate consecutive                     |
| `rules.truncateLineAt`       | Trunchiere per linie, sigură pentru Unicode                                      |
| `rules.onEmpty`              | Mesaj de rezervă dacă toate liniile sunt eliminate prin filtrare                 |
| `tests[]`                    | Exemple inline utilizate de mecanismul de verificare                             |

Se așteaptă ca filtrele încorporate să includă exemple inline în `tests[]`. Și filtrele personalizate ar trebui să le includă,
mai ales atunci când sunt partajate între proiecte.

## Deduplicarea liniilor (două niveluri)

RTK restrânge liniile duplicate la două niveluri independente:

1. **`deduplicate` per filtru (opțional, implicit `false`).** Un filtru poate seta `rules.deduplicate: true`
   pentru a restrânge liniile duplicate consecutive _din rezultatul corespunzător filtrului respectiv_, înainte de trunchiere.
   Această operație se execută în `lineFilter.ts`. Pentru filtrele vechi, este activată automat atunci când filtrul definește
   `collapsePatterns`. Schemă: `deduplicate: z.boolean().default(false)` în
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` la nivelul motorului (implicit `3`).** După executarea tuturor filtrelor, motorul restrânge
   orice secvență de `>= deduplicateThreshold` linii consecutive identice din întregul rezultat
   (`deduplicateRepeatedLines`, aplicat în `engines/rtk/index.ts`). La normalizare, valoarea este limitată la intervalul 2–100.

Etapa per filtru se execută prima (în interiorul filtrului), iar etapa la nivelul motorului se execută ultima (asupra rezultatului
îmbinat), astfel încât cele două se combină fără numărare dublă.

## Gruparea liniilor (`enableGrouping`)

Când `rtkConfig.enableGrouping` este `true` (implicit `false`), RTK execută o etapă suplimentară `groupSimilarLines`
asupra rezultatului de după deduplicare, care restrânge secvențele de linii consecutive _aproape echivalente_ (nu identice la nivel de octet).
`rtkConfig.groupingThreshold` (implicit `3`) reprezintă lungimea minimă a secvenței care declanșează
gruparea. Aceasta este contrapartea structurală a `deduplicateThreshold`: deduplicarea gestionează repetările exacte,
iar gruparea gestionează „aceeași structură, cu mici diferențe”. Ambele opțiuni fac parte din obiectul JSON `rtkConfig`
stocat în tabelul `key_value` (consultați secțiunea Configurare de mai sus), astfel încât setarea persistă după reporniri.

## Eliminarea comentariilor din cod (`stripCodeComments` / `preserveDocstrings`)

Când `rtkConfig.applyToCodeBlocks` este activat, RTK poate elimina și comentariile din blocurile de cod delimitate:

- `stripCodeComments` (implicit `false`) — opțional. Când este `true`, RTK elimină comentariile din blocurile delimitate
  JavaScript și TypeScript. În trecut, opțiunea era citită, dar nu era aplicată niciodată, astfel încât valoarea implicită rămâne
  „păstrează”, pentru a evita o modificare silențioasă în producție.
- `preserveDocstrings` (implicit `true`) — la eliminarea comentariilor, comentariile de tip bloc JSDoc/`/** … */` sunt
  păstrate (acestea conțin documentație API care valorează mai mult decât octeții pe care îi ocupă). Setați la `false` pentru a le elimina
  și pe acestea.

Eliminarea comentariilor este implementată în `open-sse/services/compression/engines/rtk/codeStripper.ts`. Aceasta utilizează
**parserul TypeScript** (nu o expresie regulată), astfel încât literalii șir, șablon și expresie regulată să nu fie niciodată confundați
cu comentarii, iar procesarea este abandonată complet atunci când este detectat JSX (astfel încât comentariile din containerele de expresii JSX
să nu fie niciodată corupte). În prezent, eliminarea comentariilor se aplică **doar pentru JavaScript și TypeScript** — celelalte
limbaje din setul `CodeLanguage` al procesorului (Python, Rust, Go, Ruby, Java) beneficiază de restrângerea liniilor goale și
a spațiilor albe, dar nu și de eliminarea comentariilor. Procesarea blocului curățat este etichetată cu `rtk:code-strip` în
`rulesApplied`.

> **Notă — codificarea GCF/tabelară este un motor separat.** RTK **nu** conține codificatorul JSON tabelar/pe coloane „GCF”
> (Graph Compact Format). Acel codificator — care a înlocuit un codificator mai vechi,
> `omni-tabular` — se află în motorul **headroom**
> (`open-sse/services/compression/engines/headroom/`, iar codecul inclus se află în
> `headroom/gcf/`). Acesta nu are legătură cu fluxul de filtre RTK documentat aici.

## Configurare

Setările globale sunt disponibile prin `/api/settings/compression`. Setările specifice RTK sunt, de asemenea,
disponibile prin `/api/context/rtk/config`.

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

`enabledFilters` și `disabledFilters` utilizează ID-uri de filtre, de exemplu `test-vitest` sau `git-diff`.

Structura completă `rtkConfig` este definită de `RtkConfig` / `DEFAULT_RTK_CONFIG` în
`open-sse/services/compression/types.ts`. Întregul obiect este stocat ca o singură valoare JSON în
tabelul SQLite `key_value`, sub `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), și este normalizat la citire de `normalizeRtkConfig`. Prin urmare, fiecare câmp de mai jos
— inclusiv `enableGrouping`, `groupingThreshold`, `stripCodeComments` și `preserveDocstrings` —
este stocat și recuperat prin același mecanism și persistă după o repornire.

| Cheie                  | Valoare implicită | Scop                                                                                          |
| ---------------------- | ----------------- | --------------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`               | La nivelul motorului: numărul minim de linii consecutive identice pentru restrângere (2–100)  |
| `enableGrouping`       | `false`           | Opțional: restrânge secvențele de linii consecutive aproape echivalente                       |
| `groupingThreshold`    | `3`               | Numărul minim de linii similare consecutive care declanșează gruparea                         |
| `stripCodeComments`    | `false`           | Opțional: elimină comentariile din blocurile de cod delimitate (necesită `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`            | La eliminarea comentariilor, păstrează blocurile JSDoc/`/** … */`                             |

## API

| Rută                               | Metodă | Scop                                                       |
| ---------------------------------- | ------ | ---------------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Citește configurația RTK                                   |
| `/api/context/rtk/config`          | PUT    | Actualizează configurația RTK                              |
| `/api/context/rtk/filters`         | GET    | Listează catalogul de filtre și diagnosticele de încărcare |
| `/api/context/rtk/import`          | POST   | Validează sau instalează fișiere de schemă RTK TOML v1     |
| `/api/context/rtk/test`            | POST   | Previzualizează compresia RTK pentru un text               |
| `/api/context/rtk/raw-output/[id]` | GET    | Citește rezultatul brut redactat și păstrat                |
| `/api/compression/preview`         | POST   | Previzualizează orice mod de compresie                     |

Sarcină utilă pentru testarea RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Sarcină utilă pentru previzualizarea compresiei:

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

Rutele de administrare necesită autentificare pentru administrarea panoului de control sau politica aferentă cheii API.

Sarcină utilă pentru validarea RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Utilizați `"action": "install"` pentru a instala global fișierul validat. Adăugați `"overwrite": true` numai
după examinarea și confirmarea înlocuirii unui fișier global existent.

## Recuperarea rezultatului brut

În mod normal, RTK returnează doar text comprimat. Pentru depanare, `rawOutputRetention` poate păstra rezultatul brut cu informațiile sensibile eliminate:

| Valoare    | Comportament                                                                              |
| ---------- | ----------------------------------------------------------------------------------------- |
| `never`    | Nu păstrează rezultatul brut                                                              |
| `failures` | Păstrează doar rezultatele care indică probabil un eșec                                   |
| `always`   | Păstrează fiecare rezultat brut comprimat de RTK, după eliminarea informațiilor sensibile |

Fișierele păstrate sunt scrise în:

```txt
DATA_DIR/rtk/raw-output/
```

Informațiile secrete sunt eliminate înainte de stocare, inclusiv tokenurile bearer uzuale, cheile API, tokenurile Slack, cheile de acces AWS și valorile de tip atribuire `token=...`, `secret=...`, `password=...`. Datele analitice stochează doar identificatorul indicatorului, dimensiunea și metadatele hash.

## Poarta de verificare

Poarta de verificare focalizată rulează testele integrate ale filtrelor inline fără a invoca comenzi externe prin shell:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Poarta RTK mai amplă este:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Rulați poarta amplă de compresie înainte de lansare:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Extinderea RTK

1. Adăugați sau actualizați un fișier JSON de filtrare.
2. Includeți cel puțin un exemplu `tests[]` care demonstrează comportamentul important.
3. Adăugați o mostră în `tests/unit/compression/fixtures/rtk/` pentru familiile noi de comenzi.
4. Adăugați acoperire pentru detectarea comenzilor când introduceți o nouă clasă de rezultate.
5. Rulați porțile de verificare și RTK amplă.
6. Dacă filtrul este local proiectului, includeți `.rtk/filters.json` în commit și reîmprospătați `.rtk/trust.json` numai după revizuire.

---

## Niveluri de intensitate (v3.8.16+)

RTK acceptă **3 niveluri de intensitate** care realizează un compromis între **agresivitatea compresiei** și **siguranță**. Nivelul este setat prin `config.intensity` în configurația motorului.

### Cele 3 niveluri

| Nivel                 | Prag de trunchiere      | Economie de tokenuri | Risc          | Recomandat pentru              |
| --------------------- | ----------------------- | -------------------- | ------------- | ------------------------------ |
| `minimal`             | 24 de linii pe secțiune | ~20-40%              | Foarte scăzut | Producție cu un context critic |
| `standard` (implicit) | 24 de linii pe secțiune | ~50-70%              | Scăzut        | Sesiuni zilnice de programare  |
| `aggressive`          | 16 linii pe secțiune    | ~70-90%              | Mediu         | Sesiuni lungi, economii maxime |

### Unde are loc trunchierea

Pragul de trunchiere afectează `lineFilter.ts`:

```ts
// Din open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Atât **începutul**, cât și **sfârșitul** fiecărei secțiuni sunt păstrate; conținutul din mijloc este eliminat atunci când se activează trunchierea.

### Ce se păstrează și ce se elimină

| Conținut                           | minimal      | standard     | aggressive   |
| ---------------------------------- | ------------ | ------------ | ------------ |
| Erori / urme de stivă              | ✅ păstrate  | ✅ păstrate  | ✅ păstrate  |
| Teste eșuate                       | ✅ păstrate  | ✅ păstrate  | ✅ păstrate  |
| Erori de compilare                 | ✅ păstrate  | ✅ păstrate  | ✅ păstrate  |
| Teste reușite (detaliate)          | ✅ păstrate  | 🟡 restrânse | 🟡 restrânse |
| Rezultate de rutină (jurnale info) | 🟡 restrânse | 🟡 restrânse | ❌ eliminate |
| Bare de progres                    | 🟡 restrânse | ❌ eliminate | ❌ eliminate |
| Bannere / artă ASCII               | 🟡 restrânse | ❌ eliminate | ❌ eliminate |

### Alegerea intensității potrivite

```
                  Pierderea contextului este catastrofală?
                  │
      ┌───────────┼───────────┐
      │           │           │
     DA          NU          NESIGUR
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Cât de critică   Încercați mai întâi `standard`
      │      este viteza?     (funcționează pentru 80%
      │           │           din cazuri)
      │      ┌────┴────┐
      │      │         │
      │   SCĂZUTĂ    RIDICATĂ
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Configurarea intensității

**Per combinație** (în configurația combinației):

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

**Programatic**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) este un
`CompressionEngine` și nu are nicio metodă `updateConfig`. Actualizați configurația unui motor
prin intermediul funcției ajutătoare a registrului:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Verificarea efectului

Utilizați **Poarta de verificare** (consultați mai jos) pentru a confirma că filtrul este sigur la intensitatea aleasă:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtrele au eșuat la intensitatea agresivă");
}
```

---

## Dezvoltarea filtrelor personalizate (v3.8.16+)

Directorul `engines/rtk/filters/` conține **peste 49 de fișiere JSON cu filtre încorporate**. Puteți adăuga propriile filtre pentru a comprima rezultatele instrumentelor personalizate care nu sunt acoperite de setările implicite.

### Schema filtrului (Zod)

```ts
{
  "id": "string",                      // Obligatoriu. Identificatorul filtrului (kebab-case, de ex., "python-traceback")
  "label": "string",                   // Obligatoriu. Numele lizibil al filtrului
  "description": "string",             // Opțional (implicit: ""). Scurtă descriere a funcției filtrului
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Opțional (0-100, implicit: 50). Ordinea de execuție (mai mare = primul)
  "match": {
    "commands": ["string"],            // Numele comenzilor care trebuie identificate (de ex., "python", "pytest")
    "patterns": ["string"],            // Expresii regulate pentru identificarea rezultatului
    "outputTypes": ["string"]          // Clase de rezultat detectate (de ex., "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Opțional (implicit: false). Elimină codurile de culoare ANSI
    "replace": [                       // Reguli de căutare și înlocuire (implicit: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Oprește procesarea la identificarea unui șablon (implicit: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Omite dacă acest șablon este identificat
      }
    ],
    "includePatterns": ["string"],     // Liniile care trebuie păstrate (expresii regulate, implicit: [])
    "dropPatterns": ["string"],        // Liniile care trebuie eliminate (expresii regulate, implicit: [])
    "collapsePatterns": ["string"],    // Liniile care trebuie restrânse la o singură apariție (implicit: [])
    "deduplicate": boolean,            // Opțional (implicit: false). Elimină liniile duplicate
    "truncateLineAt": number,          // Opțional (implicit: 0). Trunchiază liniile la numărul maxim de caractere
    "maxLines": number,                // Opțional (implicit: 0). Limită strictă pentru numărul total de linii
    "headLines": number,               // Opțional (implicit: 20). Păstrează primele N linii ale rezultatului identificat
    "tailLines": number,               // Opțional (implicit: 20). Păstrează ultimele N linii ale rezultatului identificat
    "onEmpty": "string",               // Opțional (implicit: ""). Mesaj de rezervă dacă toate liniile sunt filtrate
    "filterStderr": boolean            // Opțional (implicit: false). Filtrează și rezultatul stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Șabloane care trebuie păstrate întotdeauna (implicit: [])
    "summaryPatterns": ["string"]      // Șabloane pentru linia finală de rezumat (implicit: [])
  },
  "tests": [                           // Teste inline pentru verificare (implicit: [])
    {
      "name": "string",               // Obligatoriu. Numele testului
      "input": "sample output",        // Obligatoriu. Exemplu de text de intrare
      "expected": "expected output",   // Obligatoriu. Rezultatul comprimat așteptat
      "command": "optional command"    // Opțional. Contextul comenzii
    }
  ]
}
```

### Exemplu: filtru pentru traceback Python

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

### Încărcarea filtrelor personalizate

Plasați fișierul într-o locație recunoscută:

```
~/.omniroute/rtk/filters/my-filter.json     # La nivel de utilizator
<project>/.rtk/filters/my-filter.json      # La nivel de proiect
```

Filtrele sunt încărcate automat la pornire prin `loadRtkFilters()` din `open-sse/services/compression/engines/rtk/filterLoader.ts`. Modulul de încărcare descoperă filtrele din:

- Catalogul încorporat: `open-sse/services/compression/engines/rtk/filters/`
- Directorul utilizatorului: `~/.omniroute/rtk/filters/`
- Directorul proiectului: `<project>/.rtk/filters/`

Pentru a încărca filtrele programatic:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opțiuni: customFiltersEnabled (încarcă filtrele utilizatorului/proiectului, activat implicit),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validare

Filtrele sunt validate la încărcare pe baza schemei Zod. Un filtru cu o structură incorectă nu va putea fi încărcat și va genera o eroare în jurnal:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Pentru a valida toate filtrele instalate, apelați `runRtkFilterTests()`, care este exportată din `open-sse/services/compression/engines/rtk/verify.ts`.

### Bune practici

1. **Includeți întotdeauna `tests[]`** — acestea demonstrează că filtrul funcționează și previn regresiile
2. **Utilizați `matchOutput` pentru scurtcircuitări** — dacă un singur rând spune întreaga poveste, înlocuiți tot blocul
3. **Preferați `keep` în loc de `strip`** — regulile explicite de tip „păstrează întotdeauna” sunt mai sigure decât cele de tip „elimină întotdeauna”
4. **Testați la toate cele 3 niveluri de intensitate** — `minimal` nu ar trebui să facă nimic, iar `aggressive` ar trebui să păstreze în continuare erorile
5. **Utilizați câmpul `unless`** — protejați scurtcircuitările cu regula „nu declanșa dacă X este prezent”

---

## Recuperarea ieșirii brute și poarta de verificare

Atunci când RTK comprimă agresiv ieșirea, puteți **recupera textul original** pentru depanare, auditare sau reluare.

### Cum funcționează recuperarea ieșirii brute

```
Ieșire originală (10K tokenuri)
        │
        ▼
Comprimare RTK (cu rawOutput.enabled=true)
        │
        ├─▶ Ieșire comprimată (2K tokenuri)  ──▶ către LLM
        │
        └─▶ Ieșire originală (10K tokenuri)  ──▶ stocată în DB
                                                  (asociată prin request_id)
```

### Activarea stocării ieșirii brute

**Pentru fiecare solicitare** (în configurația combo):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // limită de 1MB
    }
  }
}
```

**Valoare implicită**: `rawOutput.enabled: false` (economisește spațiu de stocare).

### Costul stocării

| Per solicitare          | Limită de 1MB | Limită de 10MB |
| ----------------------- | ------------- | -------------- |
| Ieșire comprimată medie | ~5KB          | ~5KB           |
| Ieșire brută stocată    | ~50-500KB     | ~500KB-5MB     |
| Cu 1000 solicitări/zi   | 50-500MB/zi   | 500MB-5GB/zi   |

> **Recomandare**: Activați ieșirea brută numai pentru **sesiuni de depanare** sau **auditare prin eșantionare**, nu în permanență.

### Recuperarea originalului

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId din statisticile de comprimare
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` este returnat în `CompressionStats.rtkRawOutputPointers[]` după comprimare.
Consultați `open-sse/services/compression/engines/rtk/rawOutput.ts:102` pentru semnătura funcției.

### Poarta de verificare

**Verificarea filtrelor RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) validează toate filtrele în raport cu propriile `tests[]` și se asigură că au un comportament corect la toate cele 3 niveluri de intensitate.

**Apelați `runRtkFilterTests()`** pentru a rula verificarea:

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

**Ce validează**:

1. Fiecare filtru se încarcă și trece validarea schemei
2. Fiecare intrare `tests[]` produce rezultatul așteptat
3. Intensitatea `minimal` nu efectuează nicio operațiune (păstrează originalul și aplică numai filtrele structurale)
4. Intensitatea `aggressive` păstrează erorile, testele nereușite și urmele stivei
5. Ieșirea comprimată nu este niciodată mai mare decât intrarea originală

- Sursă: `open-sse/services/compression/engines/rtk/` (63 de fișiere, ~70KB)

- **Înainte de îmbinarea unei modificări de filtru** — asigurați-vă întotdeauna că testele trec
- **După actualizarea motorului RTK** — este posibil ca schema să se fi modificat
- **Periodic, în cadrul monitorizării** — protejează împotriva divergențelor din datele de test
- **La adăugarea unei noi familii de instrumente/comenzi** — demonstrează că noul filtru funcționează

---

## Consultați și

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Prezentare generală completă a fluxului de compresie
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registrul motoarelor și motoarele încorporate
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Motoare personalizate, pachete lingvistice, fluxuri suprapuse
- Sursă: `open-sse/services/compression/engines/rtk/` (63 de fișiere, ~70 KB)
