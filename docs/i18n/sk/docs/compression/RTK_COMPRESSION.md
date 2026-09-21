# RTK Compression (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Kompresia RTK je komprimačný mechanizmus OmniRoute, ktorý zohľadňuje príkazy a je určený pre výstup terminálu a nástrojov. Je
navrhnutý pre relácie kódovacích agentov, v ktorých väčšina nárastu kontextu pochádza z protokolov testov, výstupu zostavenia,
nadbytočného výstupu správcov balíkov, prepisov shellu, výstupu Dockeru, výstupu gitu a trasovaní zásobníka.

RTK môže fungovať priamo s `defaultMode: "rtk"` alebo ako prvý krok vo viacvrstvovom reťazci, zvyčajne:

```txt
rtk -> caveman
```

Toto poradie najprv komprimuje zahltený strojový výstup a potom umožňuje Cavemanu zhustiť zostávajúci text.

Pôvodný RTK uvádza úsporu `60-90%` pri výstupe príkazov. Ukážková relácia v jeho README sa zmenší z
`~118,000` štandardných tokenov na `~23,900` tokenov RTK, čo predstavuje úsporu `79.7%` (`~80%`). OmniRoute používa
tento pôvodný priemer na výpočet kombinovanej úspory s kompresiou vstupu Caveman:

```txt
Priemer RTK:    úspora 80%
Vstup Caveman: úspora 46%
Kombinované:   1 - (1 - 0.80) * (1 - 0.46) = úspora 89.2%
Rozsah:        1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Čo komprimuje

Vstavaný katalóg v súčasnosti obsahuje 49 filtrov v týchto kategóriách:

| Kategória | Príklady                                                      |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, testy Go, testy Cargo       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, všeobecné protokoly shellu              |
| `docker`  | `docker ps`, protokoly Dockeru                                |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | Výstup JSON, trasovania zásobníka, všeobecný záložný výstup   |

Detektor v `open-sse/services/compression/engines/rtk/commandDetector.ts` klasifikuje výstup
pred výberom filtra. Filtre sa môžu zhodovať aj podľa vzoru príkazu alebo regulárneho výrazu výstupu, keď
trieda príkazu nestačí.

## Rozlíšenie filtrov

RTK načítava filtre v tomto poradí:

1. Projektové filtre z `.rtk/filters.toml` a `.rtk/filters.json`, iba ak sú dôveryhodné.
2. Globálne filtre z `DATA_DIR/rtk/filters.toml` a `DATA_DIR/rtk/filters.json`.
3. Vstavané filtre z `open-sse/services/compression/engines/rtk/filters/`.

V rámci rovnakého rozsahu majú filtre schémy RTK TOML v1 prednosť pred filtrami OmniRoute JSON. Výrazy TOML
`match_command` sa kontrolujú pred porovnávaním typu príkazu, aby importovaný filter špecifický pre príkaz
mohol v danom rozsahu prepísať všeobecnejší filter. Rozsah projektu má stále prednosť pred globálnym
rozsahom bez ohľadu na formát súboru.

Projektové filtre zámerne podliehajú kontrole dôveryhodnosti, pretože filtre s regulárnymi výrazmi môžu zmeniť spôsob,
akým sa výstup nástrojov zobrazuje agentom. Súbor projektových filtrov sa akceptuje, keď platí jedna z týchto podmienok:

- `rtkConfig.trustProjectFilters` je `true`.
- Je nastavené `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` obsahuje zodpovedajúci hash SHA-256 súboru projektových filtrov.

Príklad súboru dôveryhodnosti:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hash hodnoty sú oddelené: `filtersSha256` označuje `.rtk/filters.json` ako dôveryhodný, zatiaľ čo `filtersTomlSha256`
označuje `.rtk/filters.toml` ako dôveryhodný. Úprava ktoréhokoľvek súboru zneplatní iba jeho vlastnú položku dôveryhodnosti. Globálne súbory
inštaluje správca a používajú existujúce správanie dôveryhodnosti globálnych filtrov.

Vlastné filtre môžu byť jedným objektom filtra alebo poľom objektov filtrov. Neplatné vlastné filtre sa
preskočia a nahlásia diagnostikou `/api/context/rtk/filters`. Neplatné vstavané filtre okamžite spôsobia zlyhanie.

## Kompatibilita so schémou RTK TOML v1

OmniRoute dokáže analyzovať, overovať, testovať a inštalovať deklaratívne súbory filtrov používajúce schému RTK TOML v1.
Podporované polia sú `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` a vložené testy `[[tests.<filter>]]`.
Neznáme polia, neplatné alebo nebezpečné regulárne výrazy, súbežné pravidlá odstránenia/zachovania, súbory väčšie ako
1 MiB a odkazy na neznáme filtre sú odmietnuté. Súbor, ktorého vložené testy zlyhajú, možno
overiť na účely kontroly, ale nemožno ho nainštalovať ani načítať. Zlyhania pri načítaní vlastných súborov zostávajú
v režime fail-open: neplatný súbor sa preskočí a zostávajúce filtre naďalej fungujú.

OmniRoute prijíma výstup nástroja až po tom, ako ho klient zachytil, takže `filter_stderr = true`
nemôže zmeniť zachytávanie procesu. Pole je akceptované bez vykonania operácie a overenie vráti upozornenie.
Táto funkcia je zámerne opísaná ako **kompatibilita so schémou RTK TOML v1**, nie ako úplná kompatibilita
so spustiteľným súborom RTK, shellovými hookmi, implementáciami príkazov v jazyku Rust ani s jeho štruktúrou úložiska dôveryhodnosti.

Pokročilé zobrazenie RTK na ovládacom paneli prijíma vložený alebo nahraný obsah TOML. Overenie je iba na čítanie.
Inštalácia atomicky zapíše `DATA_DIR/rtk/filters.toml` s obmedzujúcimi oprávneniami a obnoví
aktívny katalóg filtrov bez reštartu. Nahradenie existujúceho súboru vyžaduje explicitné potvrdenie `overwrite`
a najprv vytvorí `DATA_DIR/rtk/filters.toml.bak`.

## DSL filtrov

Filtre používajú schému JSON opísanú v dokumente [Formát pravidiel kompresie](./COMPRESSION_RULES_FORMAT.md).
Za behu sa tieto fázy aplikujú v uvedenom poradí:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> odstránenie/zahrnutie riadkov
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Dôležité polia:

| Pole                         | Účel                                                               |
| ---------------------------- | ------------------------------------------------------------------ |
| `rules.stripAnsi`            | Odstrániť pred porovnávaním terminálové farebné/riadiace sekvencie |
| `rules.filterStderr`         | Normalizovať pred porovnávaním/filtrovaním bežné predpony stderr   |
| `rules.replace`              | Použiť zoradené náhrady pomocou regulárnych výrazov                |
| `rules.matchOutput`          | Vrátiť kompaktné zhrnutie, keď výstup zodpovedá známej podmienke   |
| `rules.matchOutput[].unless` | Preskočiť skratku, keď je prítomný vzor chyby/zlyhania             |
| `rules.dropPatterns`         | Odstrániť rušivé riadky                                            |
| `rules.includePatterns`      | Uprednostniť riadky vyžadujúce pozornosť                           |
| `rules.collapsePatterns`     | Zbaliť opakované zodpovedajúce riadky                              |
| `rules.deduplicate`          | Voliteľné pre každý filter: zbaliť po sebe idúce duplicitné riadky |
| `rules.truncateLineAt`       | Skrátenie jednotlivých riadkov bezpečné pre Unicode                |
| `rules.onEmpty`              | Náhradná správa, ak sa odfiltrujú všetky riadky                    |
| `tests[]`                    | Vložené vzorky používané overovacou bránou                         |

Očakáva sa, že vstavané filtre budú obsahovať vložené vzorky `tests[]`. Vlastné filtre by ich mali obsahovať
tiež, najmä ak sa zdieľajú medzi projektmi.

## Deduplikácia riadkov (dve vrstvy)

RTK zlučuje duplicitné riadky v dvoch nezávislých vrstvách:

1. **`deduplicate` pre jednotlivé filtre (voliteľné, predvolene `false`).** Filter môže nastaviť `rules.deduplicate: true`,
   čím zlúči po sebe idúce duplicitné riadky _v rámci výstupu zodpovedajúceho danému filtru_, a to pred skrátením.
   Tento proces prebieha v súbore `lineFilter.ts`. Pre staršie filtre sa automaticky aktivuje, keď filter definuje
   `collapsePatterns`. Schéma: `deduplicate: z.boolean().default(false)` v súbore
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` na úrovni celého enginu (predvolene `3`).** Po vykonaní všetkých filtrov engine zlúči
   každú sekvenciu `>= deduplicateThreshold` identických po sebe idúcich riadkov v celom výsledku
   (`deduplicateRepeatedLines`, použité v súbore `engines/rtk/index.ts`). Pri normalizácii je hodnota obmedzená na
   rozsah 2–100.

Spracovanie pre jednotlivé filtre prebieha ako prvé (vnútri filtra) a spracovanie na úrovni celého enginu ako posledné (nad spojeným
výstupom), takže obe vrstvy sa kombinujú bez dvojitého započítania.

## Zoskupovanie riadkov (`enableGrouping`)

Keď má `rtkConfig.enableGrouping` hodnotu `true` (predvolene `false`), RTK nad výsledkom po deduplikácii vykoná dodatočný krok `groupSimilarLines`,
ktorý zlučuje sekvencie po sebe idúcich riadkov, ktoré sú _takmer ekvivalentné_ (nie bajtovo identické).
`rtkConfig.groupingThreshold` (predvolene `3`) určuje minimálnu dĺžku sekvencie, pri ktorej sa aktivuje
zoskupovanie. Ide o štrukturálny náprotivok k `deduplicateThreshold`: deduplikácia spracúva presné opakovania,
kým zoskupovanie spracúva „rovnakú štruktúru s malými rozdielmi“. Oba príznaky sú súčasťou JSON `rtkConfig`
uloženého v tabuľke `key_value` (pozri vyššie uvedenú časť Konfigurácia), takže nastavenie zostane zachované aj po reštartoch.

## Odstraňovanie komentárov z kódu (`stripCodeComments` / `preserveDocstrings`)

Keď je zapnuté `rtkConfig.applyToCodeBlocks`, RTK môže odstraňovať aj komentáre z ohraničených blokov kódu:

- `stripCodeComments` (predvolene `false`) — voliteľné. Keď má hodnotu `true`, RTK odstráni komentáre z ohraničených blokov
  JavaScriptu a TypeScriptu. V minulosti sa tento príznak načítaval, ale nikdy sa nepoužil, preto predvolenou možnosťou zostáva
  „zachovať“, aby sa predišlo tichej zmene v produkčnom prostredí.
- `preserveDocstrings` (predvolene `true`) — pri odstraňovaní komentárov sa zachovajú blokové komentáre JSDoc/`/** … */`
  (obsahujú dokumentáciu API, ktorej hodnota prevyšuje počet bajtov, ktoré zaberá). Ak ich chcete odstrániť
  tiež, nastavte hodnotu `false`.

Odstraňovanie komentárov je implementované v súbore `open-sse/services/compression/engines/rtk/codeStripper.ts`. Používa
**parser TypeScriptu** (nie regulárny výraz), takže reťazcové, šablónové ani regexové literály sa nikdy omylom
nepovažujú za komentáre. Pri zistení JSX sa spracovanie úplne zruší (aby sa komentáre v kontajneroch výrazov JSX
nikdy nepoškodili). Odstraňovanie komentárov sa v súčasnosti vzťahuje **iba na JavaScript a TypeScript** — v ostatných
jazykoch zo súpravy `CodeLanguage` odstraňovača (Python, Rust, Go, Ruby, Java) sa zlučujú prázdne riadky a
biele znaky, ale komentáre sa neodstraňujú. Spracovanie odstráneného bloku je v poli `rulesApplied` označené značkou `rtk:code-strip`.

> **Poznámka — GCF/tabuľkové kódovanie je samostatný engine.** RTK **neobsahuje** tabuľkový/stĺpcový JSON enkóder „GCF“
> (Graph Compact Format). Tento enkóder — ktorý nahradil starší enkóder
> `omni-tabular` — sa nachádza v engine **headroom**
> (`open-sse/services/compression/engines/headroom/`, pričom pribalený kodek sa nachádza v
> `headroom/gcf/`). Nesúvisí s pipeline filtrov RTK zdokumentovanou v tejto časti.

## Konfigurácia

Globálne nastavenia sú dostupné prostredníctvom `/api/settings/compression`. Nastavenia špecifické pre RTK sú tiež
dostupné prostredníctvom `/api/context/rtk/config`.

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

`enabledFilters` a `disabledFilters` používajú identifikátory filtrov, napríklad `test-vitest` alebo `git-diff`.

Úplná štruktúra `rtkConfig` je definovaná pomocou `RtkConfig` / `DEFAULT_RTK_CONFIG` v
`open-sse/services/compression/types.ts`. Celý objekt sa uchováva ako jedna hodnota JSON v
tabuľke SQLite `key_value` pod `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) a pri načítaní ho normalizuje `normalizeRtkConfig`. Každé pole uvedené nižšie
— vrátane `enableGrouping`, `groupingThreshold`, `stripCodeComments` a `preserveDocstrings` —
sa preto načíta a zapíše prostredníctvom rovnakého úložiska a zachová sa aj po reštarte.

| Kľúč                   | Predvolená hodnota | Účel                                                                                       |
| ---------------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| `deduplicateThreshold` | `3`                | Pre celý engine: min. počet po sebe idúcich identických riadkov na zlúčenie (rozsah 2–100) |
| `enableGrouping`       | `false`            | Voliteľné: zlúčiť sekvencie takmer ekvivalentných po sebe idúcich riadkov                  |
| `groupingThreshold`    | `3`                | Min. počet po sebe idúcich podobných riadkov, ktorý spustí zoskupenie                      |
| `stripCodeComments`    | `false`            | Voliteľné: odstrániť komentáre z ohraničených blokov kódu (vyžaduje `applyToCodeBlocks`)   |
| `preserveDocstrings`   | `true`             | Pri odstraňovaní komentárov zachovať bloky JSDoc/`/** … */`                                |

## API

| Trasa                              | Metóda | Účel                                                  |
| ---------------------------------- | ------ | ----------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Načítať konfiguráciu RTK                              |
| `/api/context/rtk/config`          | PUT    | Aktualizovať konfiguráciu RTK                         |
| `/api/context/rtk/filters`         | GET    | Zobraziť katalóg filtrov a diagnostiku načítania      |
| `/api/context/rtk/import`          | POST   | Overiť alebo nainštalovať súbory schémy RTK TOML v1   |
| `/api/context/rtk/test`            | POST   | Zobraziť náhľad kompresie RTK pre jeden textový obsah |
| `/api/context/rtk/raw-output/[id]` | GET    | Načítať uchovaný redigovaný nespracovaný výstup       |
| `/api/compression/preview`         | POST   | Zobraziť náhľad ľubovoľného režimu kompresie          |

Obsah požiadavky na test RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Obsah požiadavky na náhľad kompresie:

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

Trasy správy vyžadujú overenie správy ovládacieho panela alebo zodpovedajúcu politiku kľúča API.

Obsah požiadavky na overenie RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Na globálnu inštaláciu overeného súboru použite `"action": "install"`. Parameter `"overwrite": true` pridajte až
po kontrole a potvrdení nahradenia existujúceho globálneho súboru.

## Obnovenie nespracovaného výstupu

RTK zvyčajne vracia iba komprimovaný text. Na ladenie môže `rawOutputRetention` uchovávať redigovaný
nespracovaný výstup:

| Hodnota    | Správanie                                                        |
| ---------- | ---------------------------------------------------------------- |
| `never`    | Neuchovávať nespracovaný výstup                                  |
| `failures` | Uchovávať iba výstup, ktorý pravdepodobne predstavuje zlyhanie   |
| `always`   | Uchovávať každý komprimovaný nespracovaný výstup RTK po redakcii |

Uchované súbory sa zapisujú do:

```txt
DATA_DIR/rtk/raw-output/
```

Tajné údaje sa pred uložením redigujú vrátane bežných bearer tokenov, API kľúčov, tokenov Slack,
prístupových kľúčov AWS a hodnôt v štýle priradenia `token=...`, `secret=...`, `password=...`. Analytika
ukladá iba identifikátor odkazu, veľkosť a metadáta hašu.

## Overovacia brána

Cielená overovacia brána spúšťa vstavané inline testy filtrov bez volania externých príkazov prostredníctvom shellu:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Širšia brána RTK je:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Pred vydaním spustite širokú bránu kompresie:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Rozšírenie RTK

1. Pridajte alebo aktualizujte súbor JSON s filtrom.
2. Zahrňte aspoň jednu ukážku `tests[]`, ktorá preukazuje dôležité správanie.
3. Pre nové rodiny príkazov pridajte testovací vstup do `tests/unit/compression/fixtures/rtk/`.
4. Pri zavádzaní novej triedy výstupu pridajte pokrytie detekcie príkazov.
5. Spustite overovaciu aj širšiu bránu RTK.
6. Ak je filter lokálny pre projekt, odovzdajte `.rtk/filters.json` do repozitára a obnovte `.rtk/trust.json` až po kontrole.

---

## Úrovne intenzity (v3.8.16+)

RTK podporuje **3 úrovne intenzity**, ktoré vyvažujú **agresivitu kompresie** a **bezpečnosť**. Úroveň sa nastavuje prostredníctvom `config.intensity` v konfigurácii enginu.

### 3 úrovne

| Úroveň                  | Prah skrátenia       | Úspora tokenov | Riziko      | Najvhodnejšie pre                |
| ----------------------- | -------------------- | -------------- | ----------- | -------------------------------- |
| `minimal`               | 24 riadkov na sekciu | ~20-40%        | Veľmi nízke | Produkciu s kritickým kontextom  |
| `standard` (predvolená) | 24 riadkov na sekciu | ~50-70%        | Nízke       | Každodenné programovacie relácie |
| `aggressive`            | 16 riadkov na sekciu | ~70-90%        | Stredné     | Dlhé relácie, maximálnu úsporu   |

### Kde dochádza ku skráteniu

Prah skrátenia ovplyvňuje `lineFilter.ts`:

```ts
// Z open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Zachová sa **začiatok** aj **koniec** každej sekcie; po aktivácii skrátenia sa obsah uprostred odstráni.

### Čo zostáva a čo sa odstráni

| Obsah                               | minimal      | standard      | aggressive    |
| ----------------------------------- | ------------ | ------------- | ------------- |
| Chyby/zásobníky volaní              | ✅ zachované | ✅ zachované  | ✅ zachované  |
| Zlyhania testov                     | ✅ zachované | ✅ zachované  | ✅ zachované  |
| Chyby zostavenia                    | ✅ zachované | ✅ zachované  | ✅ zachované  |
| Úspešné testy (podrobné)            | ✅ zachované | 🟡 zbalené    | 🟡 zbalené    |
| Rutinný výstup (informačné záznamy) | 🟡 zbalené   | 🟡 zbalené    | ❌ odstránené |
| Indikátory priebehu                 | 🟡 zbalené   | ❌ odstránené | ❌ odstránené |
| Banner/grafika ASCII                | 🟡 zbalené   | ❌ odstránené | ❌ odstránené |

### Výber správnej intenzity

```
                  Je strata kontextu katastrofálna?
                  │
      ┌───────────┼───────────┐
      │           │           │
     ÁNO         NIE       NIE SOM SI ISTÝ
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Aká kritická    Najprv skúste `standard`
      │      je priepustnosť? (funguje v 80 %
      │           │          prípadov)
      │      ┌────┴────┐
      │      │         │
      │    NÍZKA     VYSOKÁ
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Konfigurácia intenzity

**Pre jednotlivú kombináciu** (v konfigurácii kombinácie):

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

**Programovo**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) je
`CompressionEngine` a nemá metódu `updateConfig`. Konfiguráciu enginu
aktualizujte prostredníctvom pomocnej funkcie registra:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Overenie účinku

Pomocou **overovacej brány** (pozrite nižšie) potvrďte, že je váš filter pri zvolenej intenzite bezpečný:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtre zlyhali pri agresívnej intenzite");
}
```

---

## Vývoj vlastných filtrov (v3.8.16+)

Adresár `engines/rtk/filters/` obsahuje **viac ako 49 vstavaných súborov filtrov JSON**. Môžete pridať vlastné filtre na komprimovanie výstupu z vlastných nástrojov, ktoré nie sú pokryté predvolenými nastaveniami.

### Schéma filtra (Zod)

```ts
{
  "id": "string",                      // Povinné. Identifikátor filtra (kebab-case, napr. „python-traceback“)
  "label": "string",                   // Povinné. Ľudsky čitateľný názov filtra
  "description": "string",             // Voliteľné (predvolené: „“). Stručný opis funkcie filtra
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Voliteľné (0 – 100, predvolené: 50). Poradie vykonávania (vyššie = skôr)
  "match": {
    "commands": ["string"],            // Názvy príkazov, ktoré sa majú zhodovať (napr. „python“, „pytest“)
    "patterns": ["string"],            // Regulárne výrazy na porovnávanie s výstupom
    "outputTypes": ["string"]          // Zistené triedy výstupu (napr. „test-failure“)
  },
  "rules": {
    "stripAnsi": boolean,              // Voliteľné (predvolené: false). Odstrániť farebné kódy ANSI
    "replace": [                       // Pravidlá vyhľadania a nahradenia (predvolené: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Ukončiť spracovanie pri zhode so vzorom (predvolené: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Preskočiť, ak sa tento vzor zhoduje
      }
    ],
    "includePatterns": ["string"],     // Riadky, ktoré sa majú zachovať (regulárne výrazy, predvolené: [])
    "dropPatterns": ["string"],        // Riadky, ktoré sa majú odstrániť (regulárne výrazy, predvolené: [])
    "collapsePatterns": ["string"],    // Riadky, ktoré sa majú zlúčiť do jedného výskytu (predvolené: [])
    "deduplicate": boolean,            // Voliteľné (predvolené: false). Odstrániť duplicitné riadky
    "truncateLineAt": number,          // Voliteľné (predvolené: 0). Skrátiť riadky na maximálny počet znakov
    "maxLines": number,                // Voliteľné (predvolené: 0). Pevný limit celkového počtu riadkov
    "headLines": number,               // Voliteľné (predvolené: 20). Zachovať prvých N riadkov zhodného výstupu
    "tailLines": number,               // Voliteľné (predvolené: 20). Zachovať posledných N riadkov zhodného výstupu
    "onEmpty": "string",               // Voliteľné (predvolené: „“). Náhradná správa, ak sa odfiltrujú všetky riadky
    "filterStderr": boolean            // Voliteľné (predvolené: false). Filtrovať aj výstup stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Vzory, ktoré sa musia vždy zachovať (predvolené: [])
    "summaryPatterns": ["string"]      // Vzory pre záverečný súhrnný riadok (predvolené: [])
  },
  "tests": [                           // Vnorené testy na overenie (predvolené: [])
    {
      "name": "string",               // Povinné. Názov testu
      "input": "sample output",        // Povinné. Ukážkový vstupný text
      "expected": "expected output",   // Povinné. Očakávaný komprimovaný výstup
      "command": "optional command"    // Voliteľné. Kontext príkazu
    }
  ]
}
```

### Príklad: Filter spätného volania Pythonu

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

### Načítanie vlastných filtrov

Umiestnite súbor do rozpoznávaného umiestnenia:

```
~/.omniroute/rtk/filters/my-filter.json     # Na úrovni používateľa
<project>/.rtk/filters/my-filter.json      # Na úrovni projektu
```

Filtre sa automaticky načítajú pri spustení prostredníctvom `loadRtkFilters()` v `open-sse/services/compression/engines/rtk/filterLoader.ts`. Načítavač vyhľadáva filtre v týchto umiestneniach:

- Vstavaný katalóg: `open-sse/services/compression/engines/rtk/filters/`
- Používateľský adresár: `~/.omniroute/rtk/filters/`
- Projektový adresár: `<project>/.rtk/filters/`

Programové načítanie filtrov:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Možnosti: customFiltersEnabled (načítať používateľské/projektové filtre, predvolene zapnuté),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Overenie

Filtre sa pri načítaní overujú podľa schémy Zod. Filter s nesprávnou štruktúrou sa nenačíta a zaznamená sa chyba:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Ak chcete overiť všetky nainštalované filtre, zavolajte `runRtkFilterTests()`, ktorá sa exportuje z `open-sse/services/compression/engines/rtk/verify.ts`.

### Odporúčané postupy

1. **Vždy zahrňte `tests[]`** — dokazujú, že váš filter funguje, a zabraňujú regresiám
2. **Na skratky používajte `matchOutput`** — ak celý príbeh vystihuje jediný riadok, nahraďte ním celý blok
3. **Uprednostnite `keep` pred `strip`** — explicitné pravidlá „vždy zachovať“ sú bezpečnejšie než „vždy odstrániť“
4. **Testujte na všetkých 3 úrovniach intenzity** — `minimal` by nemala vykonávať žiadnu zmenu, `aggressive` by mala naďalej zachovávať chyby
5. **Používajte pole `unless`** — skratky zabezpečte podmienkou „nespúšťať, ak je prítomné X“

---

## Obnova nespracovaného výstupu a overovacia brána

Keď RTK agresívne komprimuje výstup, môžete **obnoviť pôvodný text** na účely ladenia, auditu alebo opätovného prehratia.

### Ako funguje obnova nespracovaného výstupu

```
Pôvodný výstup (10 tis. tokenov)
        │
        ▼
Kompresia RTK (s rawOutput.enabled=true)
        │
        ├─▶ Komprimovaný výstup (2 tis. tokenov)  ──▶ do LLM
        │
        └─▶ Pôvodný výstup (10 tis. tokenov)       ──▶ uložený v DB
                                                          (prepojený pomocou request_id)
```

### Povolenie ukladania nespracovaného výstupu

**Pre jednotlivú požiadavku** (v kombinovanej konfigurácii):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // limit 1 MB
    }
  }
}
```

**Predvolené nastavenie**: `rawOutput.enabled: false` (šetrí úložný priestor).

### Náklady na úložný priestor

| Na jednu požiadavku           | Limit 1 MB      | Limit 10 MB       |
| ----------------------------- | --------------- | ----------------- |
| Priemerný komprimovaný výstup | ~5 KB           | ~5 KB             |
| Uložený nespracovaný výstup   | ~50 – 500 KB    | ~500 KB – 5 MB    |
| Pri 1 000 požiadavkách denne  | 50 – 500 MB/deň | 500 MB – 5 GB/deň |

> **Odporúčanie**: Nespracovaný výstup povoľujte iba počas **relácií ladenia** alebo pri **výberovom auditovaní**, nie nepretržite.

### Obnovenie pôvodného výstupu

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId zo štatistík kompresie
if (raw) {
  console.log("Original output:", raw);
}
```

Hodnota `pointerId` sa po kompresii vráti v poli `CompressionStats.rtkRawOutputPointers[]`.
Signatúru funkcie nájdete v súbore `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Overovacia brána

**Overovanie filtrov RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) kontroluje všetky filtre voči ich `tests[]` a zaisťuje správne správanie pri všetkých 3 úrovniach intenzity.

**Overenie spustíte volaním `runRtkFilterTests()`**:

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

**Čo overuje**:

1. Každý filter sa načíta a prejde validáciou schémy
2. Každá položka `tests[]` vytvorí očakávaný výstup
3. Intenzita `minimal` nevykonáva žiadne zmeny (zachováva originál a používa iba štrukturálne filtre)
4. Intenzita `aggressive` zachováva chyby, zlyhania testov a trasovania zásobníka
5. Komprimovaný výstup nikdy nie je väčší než pôvodný vstup

- Zdroj: `open-sse/services/compression/engines/rtk/` (63 súborov, ~70 KB)

- **Pred zlúčením zmeny filtra** — vždy skontrolujte, že testy prechádzajú
- **Po aktualizácii jadra RTK** — schéma sa mohla zmeniť
- **Pravidelne v rámci monitorovania** — chráni pred odchýlkami v testovacích dátach
- **Pri pridávaní novej rodiny nástrojov/príkazov** — preukazuje, že nový filter funguje

---

## Pozri tiež

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Úplný prehľad procesu kompresie
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Register kompresných jadier a vstavané jadrá
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Vlastné jadrá, jazykové balíky, zreťazené procesy
- Zdroj: `open-sse/services/compression/engines/rtk/` (63 súborov, ~70KB)
