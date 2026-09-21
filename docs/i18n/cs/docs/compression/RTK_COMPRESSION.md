# RTK Compression (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Komprese RTK je modul OmniRoute pro kompresi terminálového výstupu a výstupu nástrojů, který zohledňuje příkazy. Je
navržen pro relace programovacích agentů, ve kterých většina nárůstu kontextu pochází z protokolů testů, výstupu sestavení,
nadbytečného výstupu správců balíčků, přepisů shellu, výstupu Dockeru, výstupu gitu a trasování zásobníku.

RTK lze spustit přímo s `defaultMode: "rtk"` nebo jako první krok ve zřetězené pipeline, obvykle:

```txt
rtk -> caveman
```

Toto pořadí nejprve zkomprimuje zahlcený strojový výstup a poté umožní Cavemanu zestručnit zbývající text.

Původní RTK uvádí úsporu `60-90%` u výstupu příkazů. Ukázková relace v jeho souboru README se zmenší z
`~118,000` standardních tokenů na `~23,900` tokenů RTK, což představuje úsporu `79.7%` (`~80%`). OmniRoute používá
tento původní průměr k výpočtu úspory při zřetězení s kompresí vstupu Cavemanu:

```txt
Průměr RTK:     úspora 80%
Vstup Caveman: úspora 46%
Zřetězené:     1 - (1 - 0.80) * (1 - 0.46) = úspora 89.2%
Rozsah:        1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Co komprimuje

Vestavěný katalog v současnosti obsahuje 49 filtrů napříč těmito kategoriemi:

| Kategorie | Příklady                                                         |
| --------- | ---------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`                |
| `test`    | Vitest, Jest, Pytest, Playwright, testy Go, testy Cargo          |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx    |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler    |
| `shell`   | `ls`, `find`, `grep`, obecné protokoly shellu                    |
| `docker`  | `docker ps`, protokoly Dockeru                                   |
| `infra`   | Terraform, OpenTofu, `systemctl status`                          |
| `generic` | Výstup JSON, trasování zásobníku, záložní filtr obecného výstupu |

Detektor v `open-sse/services/compression/engines/rtk/commandDetector.ts` klasifikuje výstup
před výběrem filtru. Filtry mohou také odpovídat podle vzoru příkazu nebo regulárního výrazu výstupu, pokud
samotná třída příkazu nestačí.

## Vyhodnocování filtrů

RTK načítá filtry v tomto pořadí:

1. Projektové filtry z `.rtk/filters.toml` a `.rtk/filters.json`, pouze pokud jsou důvěryhodné.
2. Globální filtry z `DATA_DIR/rtk/filters.toml` a `DATA_DIR/rtk/filters.json`.
3. Vestavěné filtry z `open-sse/services/compression/engines/rtk/filters/`.

V rámci stejného rozsahu mají filtry schématu RTK TOML v1 přednost před filtry OmniRoute JSON. Výrazy TOML
`match_command` se kontrolují před porovnáním typu příkazu, takže importovaný filtr specifický pro příkaz
může v daném rozsahu přepsat obecnější filtr. Rozsah projektu má stále přednost před globálním
rozsahem bez ohledu na formát souboru.

Projektové filtry jsou záměrně podmíněny důvěryhodností, protože filtry s regulárními výrazy mohou změnit způsob, jakým je výstup nástrojů
zobrazován agentům. Soubor projektových filtrů je přijat, pokud platí jedna z následujících podmínek:

- `rtkConfig.trustProjectFilters` je `true`.
- Je nastavena proměnná `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`.
- `.rtk/trust.json` obsahuje odpovídající hash SHA-256 souboru projektových filtrů.

Příklad souboru důvěryhodnosti:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hashe jsou oddělené: `filtersSha256` označuje jako důvěryhodný soubor `.rtk/filters.json`, zatímco `filtersTomlSha256`
označuje jako důvěryhodný soubor `.rtk/filters.toml`. Úprava kteréhokoli souboru zneplatní pouze jeho vlastní záznam důvěryhodnosti. Globální soubory
jsou instalovány správcem a používají stávající mechanismus důvěryhodnosti globálních filtrů.

Vlastní filtry mohou být jeden objekt filtru nebo pole objektů filtrů. Neplatné vlastní filtry jsou
přeskočeny a uvedeny v diagnostice `/api/context/rtk/filters`. Neplatné vestavěné filtry způsobí okamžité selhání.

## Kompatibilita se schématem RTK TOML v1

OmniRoute dokáže analyzovat, ověřovat, testovat a instalovat deklarativní soubory filtrů používající schéma RTK TOML v1.
Podporována jsou pole `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` a vložené testy `[[tests.<filter>]]`.
Neznámá pole, neplatné nebo nebezpečné regulární výrazy, současně použité pravidlo pro odebrání
i zachování, soubory větší než 1 MiB a odkazy na neznámé filtry jsou odmítnuty. Soubor, jehož vložené
testy selžou, lze ověřit za účelem kontroly, ale nelze jej nainstalovat ani načíst. Selhání při načítání
vlastních souborů zůstávají v režimu fail-open: neplatný soubor je přeskočen a zbývající filtry nadále fungují.

OmniRoute přijímá výstup nástroje až poté, co jej klient zachytil, takže `filter_stderr = true`
nemůže změnit zachytávání procesu. Pole je přijato jako operace bez účinku a ověření vrátí varování.
Tato funkce je záměrně popisována jako **kompatibilita se schématem RTK TOML v1**, nikoli jako plná kompatibilita
se spustitelným souborem RTK, shellovými hooky, implementacemi příkazů v jazyce Rust ani jeho strukturou úložiště důvěryhodnosti.

Pokročilé zobrazení RTK na řídicím panelu přijímá vložený nebo nahraný TOML. Ověření je pouze pro čtení.
Instalace atomicky zapíše soubor `DATA_DIR/rtk/filters.toml` s omezenými oprávněními a aktualizuje
aktivní katalog filtrů bez restartu. Nahrazení existujícího souboru vyžaduje výslovné potvrzení `overwrite`
a nejprve vytvoří soubor `DATA_DIR/rtk/filters.toml.bak`.

## DSL filtrů

Filtry používají schéma JSON popsané v dokumentu [Formát pravidel komprese](./COMPRESSION_RULES_FORMAT.md).
Běhové prostředí používá tyto fáze v uvedeném pořadí:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> drop/include lines
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Důležitá pole:

| Pole                         | Účel                                                                       |
| ---------------------------- | -------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Odstranit před porovnáváním terminálové barevné a řídicí sekvence          |
| `rules.filterStderr`         | Normalizovat před porovnáváním a filtrováním běžné předpony stderr         |
| `rules.replace`              | Použít seřazené náhrady pomocí regulárních výrazů                          |
| `rules.matchOutput`          | Vrátit stručné shrnutí, když výstup odpovídá známé podmínce                |
| `rules.matchOutput[].unless` | Přeskočit zkratku, pokud je přítomen vzor chyby nebo selhání               |
| `rules.dropPatterns`         | Odstranit rušivé řádky                                                     |
| `rules.includePatterns`      | Upřednostnit řádky umožňující provedení akce                               |
| `rules.collapsePatterns`     | Sbalit opakující se odpovídající řádky                                     |
| `rules.deduplicate`          | Volitelné nastavení pro jednotlivé filtry: sbalit po sobě jdoucí duplicity |
| `rules.truncateLineAt`       | Zkrátit jednotlivé řádky bezpečně s ohledem na Unicode                     |
| `rules.onEmpty`              | Náhradní zpráva, pokud jsou odfiltrovány všechny řádky                     |
| `tests[]`                    | Vložené vzorky používané ověřovací bránou                                  |

Očekává se, že vestavěné filtry budou obsahovat vložené vzorky `tests[]`. Vlastní filtry by je měly
obsahovat také, zejména pokud jsou sdíleny mezi projekty.

## Deduplikace řádků (dvě vrstvy)

RTK slučuje duplicitní řádky ve dvou nezávislých vrstvách:

1. **`deduplicate` pro jednotlivé filtry (volitelné, výchozí hodnota `false`).** Filtr může nastavit `rules.deduplicate: true`,
   aby sloučil po sobě jdoucí duplicitní řádky _ve výstupu odpovídajícím danému filtru_, a to před zkrácením.
   Tato operace probíhá uvnitř `lineFilter.ts`. U starších filtrů se automaticky aktivuje, pokud filtr definuje
   `collapsePatterns`. Schéma: `deduplicate: z.boolean().default(false)` v
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` pro celý engine (výchozí hodnota `3`).** Po spuštění všech filtrů engine sloučí
   každou sekvenci `>= deduplicateThreshold` identických po sobě jdoucích řádků v celém výsledku
   (`deduplicateRepeatedLines`, použité v `engines/rtk/index.ts`). Při normalizaci je hodnota omezena na 2–100.

Průchod pro jednotlivé filtry probíhá jako první (uvnitř filtru), průchod pro celý engine jako poslední (nad spojeným
výstupem), takže se oba průchody kombinují bez dvojího započítání.

## Seskupování řádků (`enableGrouping`)

Když má `rtkConfig.enableGrouping` hodnotu `true` (výchozí hodnota `false`), RTK spustí nad výsledkem po deduplikaci další průchod `groupSimilarLines`,
který slučuje sekvence _téměř ekvivalentních_ (nikoli bajtově identických)
po sobě jdoucích řádků. `rtkConfig.groupingThreshold` (výchozí hodnota `3`) určuje minimální délku sekvence, která
spustí seskupování. Jde o strukturální protějšek `deduplicateThreshold`: deduplikace zpracovává přesná opakování,
zatímco seskupování zpracovává „stejný tvar s drobnými rozdíly“. Oba příznaky jsou součástí JSON objektu `rtkConfig`
uloženého v tabulce `key_value` (viz Konfigurace výše), takže nastavení přetrvá i po restartu.

## Odstraňování komentářů z kódu (`stripCodeComments` / `preserveDocstrings`)

Když je zapnuto `rtkConfig.applyToCodeBlocks`, může RTK také odstraňovat komentáře z ohraničených bloků kódu:

- `stripCodeComments` (výchozí hodnota `false`) — volitelné. Při hodnotě `true` RTK odstraní komentáře z ohraničených bloků
  JavaScriptu a TypeScriptu. Tento příznak se dříve načítal, ale nikdy se nepoužíval, proto výchozí nastavení zůstává
  „zachovat“, aby se předešlo tiché změně v produkčním prostředí.
- `preserveDocstrings` (výchozí hodnota `true`) — při odstraňování komentářů jsou zachovány blokové komentáře JSDoc/`/** … */`
  (obsahují dokumentaci API, jejíž hodnota převyšuje náklady na bajty). Nastavením na `false`
  odstraníte i je.

Odstraňování komentářů je implementováno v `open-sse/services/compression/engines/rtk/codeStripper.ts`. Používá
**parser TypeScriptu** (nikoli regulární výraz), takže řetězcové, šablonové ani regexové literály nejsou nikdy zaměněny
za komentáře, a při zjištění JSX operaci zcela ukončí (komentáře v kontejnerech výrazů JSX tak nikdy nejsou
poškozeny). Odstraňování komentářů se v současnosti vztahuje **pouze na JavaScript a TypeScript** — u ostatních
jazyků v množině `CodeLanguage` tohoto odstraňovače (Python, Rust, Go, Ruby, Java) se slučují prázdné řádky a
bílé znaky, ale komentáře se neodstraňují. Běh se zpracovaným blokem je v `rulesApplied` označen jako `rtk:code-strip`.

> **Poznámka — GCF / tabulkové kódování je samostatný engine.** RTK **neobsahuje** tabulkový/sloupcový kodér JSON „GCF“
> (Graph Compact Format). Tento kodér — který nahradil starší kodér
> `omni-tabular` — se nachází v enginu **headroom**
> (`open-sse/services/compression/engines/headroom/`, přičemž přibalený kodek je v
> `headroom/gcf/`). Nesouvisí se zde zdokumentovanou pipeline filtrů RTK.

## Konfigurace

Globální nastavení jsou dostupná prostřednictvím `/api/settings/compression`. Nastavení specifická pro RTK jsou také
dostupná prostřednictvím `/api/context/rtk/config`.

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

`enabledFilters` a `disabledFilters` používají ID filtrů, například `test-vitest` nebo `git-diff`.

Úplná struktura `rtkConfig` je definována pomocí `RtkConfig` / `DEFAULT_RTK_CONFIG` v
`open-sse/services/compression/types.ts`. Celý objekt je uložen jako jediná hodnota JSON v
tabulce SQLite `key_value` pod `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`) a při načtení je normalizován pomocí `normalizeRtkConfig`. Každé níže uvedené
pole — včetně `enableGrouping`, `groupingThreshold`, `stripCodeComments` a `preserveDocstrings` —
se tedy ukládá do stejného úložiště, načítá z něj a přetrvá restart.

| Klíč                   | Výchozí hodnota | Účel                                                                                    |
| ---------------------- | --------------- | --------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`             | Pro celý engine: min. počet po sobě jdoucích shodných řádků ke sloučení (2–100)         |
| `enableGrouping`       | `false`         | Volitelné: sloučit sekvence téměř ekvivalentních po sobě jdoucích řádků                 |
| `groupingThreshold`    | `3`             | Min. délka sekvence podobných řádků, která spustí seskupení                             |
| `stripCodeComments`    | `false`         | Volitelné: odstranit komentáře z ohraničených bloků kódu (vyžaduje `applyToCodeBlocks`) |
| `preserveDocstrings`   | `true`          | Při odstraňování komentářů zachovat bloky JSDoc/`/** … */`                              |

## API

| Trasa                              | Metoda | Účel                                                  |
| ---------------------------------- | ------ | ----------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Načíst konfiguraci RTK                                |
| `/api/context/rtk/config`          | PUT    | Aktualizovat konfiguraci RTK                          |
| `/api/context/rtk/filters`         | GET    | Vypsat katalog filtrů a diagnostiku načítání          |
| `/api/context/rtk/import`          | POST   | Ověřit nebo nainstalovat soubory schématu RTK TOML v1 |
| `/api/context/rtk/test`            | POST   | Zobrazit náhled komprese RTK pro jeden textový obsah  |
| `/api/context/rtk/raw-output/[id]` | GET    | Načíst uchovaný redigovaný nezpracovaný výstup        |
| `/api/compression/preview`         | POST   | Zobrazit náhled libovolného režimu komprese           |

Datový obsah testu RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Datový obsah náhledu komprese:

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

Trasy pro správu vyžadují oprávnění ke správě řídicího panelu nebo odpovídající zásady klíče API.

Datový obsah pro ověření RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Chcete-li ověřený soubor nainstalovat globálně, použijte `"action": "install"`. Možnost `"overwrite": true` přidejte až
po kontrole a potvrzení nahrazení existujícího globálního souboru.

## Obnovení nezpracovaného výstupu

RTK běžně vrací pouze komprimovaný text. Pro ladění může `rawOutputRetention` uchovávat redigovaný
nezpracovaný výstup:

| Hodnota    | Chování                                                         |
| ---------- | --------------------------------------------------------------- |
| `never`    | Neuchovávat nezpracovaný výstup                                 |
| `failures` | Uchovávat pouze výstup pravděpodobně související se selháním    |
| `always`   | Uchovávat každý komprimovaný nezpracovaný výstup RTK po redakci |

Uchované soubory se zapisují do:

```txt
DATA_DIR/rtk/raw-output/
```

Před uložením jsou citlivé údaje redigovány, včetně běžných bearer tokenů, API klíčů, tokenů Slacku,
přístupových klíčů AWS a hodnot ve stylu přiřazení `token=...`, `secret=...`, `password=...`. Analytika
ukládá pouze ID ukazatele, velikost a metadata hashe.

## Ověřovací brána

Cílená ověřovací brána spouští vestavěné inline testy filtrů bez volání externích příkazů prostředí:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Širší brána RTK je:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Před vydáním spusťte širokou bránu komprese:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Rozšíření RTK

1. Přidejte nebo aktualizujte soubor JSON s filtrem.
2. Zahrňte alespoň jednu ukázku `tests[]`, která dokládá důležité chování.
3. Pro nové rodiny příkazů přidejte fixture do `tests/unit/compression/fixtures/rtk/`.
4. Při zavádění nové třídy výstupu přidejte pokrytí detekce příkazů.
5. Spusťte ověřovací i širší bránu RTK.
6. Pokud je filtr lokální pro projekt, commitněte `.rtk/filters.json` a aktualizujte `.rtk/trust.json` až po kontrole.

---

## Úrovně intenzity (v3.8.16+)

RTK podporuje **3 úrovně intenzity**, které vyvažují **agresivitu komprese** a **bezpečnost**. Úroveň se nastavuje pomocí `config.intensity` v konfiguraci enginu.

### 3 úrovně

| Úroveň               | Práh zkrácení     | Úspora tokenů | Riziko      | Nejvhodnější použití                    |
| -------------------- | ----------------- | ------------- | ----------- | --------------------------------------- |
| `minimal`            | 24 řádků na sekci | ~20-40%       | Velmi nízké | Produkce s kriticky důležitým kontextem |
| `standard` (výchozí) | 24 řádků na sekci | ~50-70%       | Nízké       | Každodenní programovací relace          |
| `aggressive`         | 16 řádků na sekci | ~70-90%       | Střední     | Dlouhé relace, maximální úspora         |

### Kde dochází ke zkrácení

Práh zkrácení ovlivňuje `lineFilter.ts`:

```ts
// Z open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Zachovává se **začátek** i **konec** každé sekce; při aktivaci zkrácení je prostřední obsah odstraněn.

### Co zůstává a co se odstraňuje

| Obsah                       | minimal      | standard      | aggressive    |
| --------------------------- | ------------ | ------------- | ------------- |
| Chyby / trasování zásobníku | ✅ zachováno | ✅ zachováno  | ✅ zachováno  |
| Selhání testů               | ✅ zachováno | ✅ zachováno  | ✅ zachováno  |
| Chyby sestavení             | ✅ zachováno | ✅ zachováno  | ✅ zachováno  |
| Úspěšné testy (podrobné)    | ✅ zachováno | 🟡 sloučeno   | 🟡 sloučeno   |
| Rutinní výstup (info logy)  | 🟡 sloučeno  | 🟡 sloučeno   | ❌ odstraněno |
| Ukazatele průběhu           | 🟡 sloučeno  | ❌ odstraněno | ❌ odstraněno |
| Banner / ASCII grafika      | 🟡 sloučeno  | ❌ odstraněno | ❌ odstraněno |

### Výběr správné intenzity

```
                  Je ztráta kontextu katastrofická?
                  │
      ┌───────────┼───────────┐
      │           │           │
    ANO          NE         NEVÍTE
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Jak kritická    Nejprve zkuste `standard`
      │      je propustnost? (funguje v 80 %
      │           │          případů)
      │      ┌────┴────┐
      │      │         │
      │    NÍZKÁ     VYSOKÁ
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Konfigurace intenzity

**Pro jednotlivé combo** (v konfiguraci combo):

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

**Programově**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) je
`CompressionEngine` a nemá metodu `updateConfig`. Konfiguraci enginu
místo toho aktualizujte pomocí pomocné funkce registru:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Ověření účinku

Pomocí **ověřovací brány** (viz níže) potvrďte, že je filtr při zvolené intenzitě bezpečný:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filtry selhaly při agresivní intenzitě");
}
```

---

## Vývoj vlastních filtrů (v3.8.16+)

Adresář `engines/rtk/filters/` obsahuje **více než 49 vestavěných souborů JSON s filtry**. Můžete přidat vlastní filtry pro kompresi výstupu z vlastních nástrojů, které výchozí filtry nepokrývají.

### Schéma filtru (Zod)

```ts
{
  "id": "string",                      // Povinné. Identifikátor filtru (kebab-case, např. "python-traceback")
  "label": "string",                   // Povinné. Uživatelsky srozumitelný název filtru
  "description": "string",             // Volitelné (výchozí: ""). Stručný popis funkce filtru
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Volitelné (0–100, výchozí: 50). Pořadí spuštění (vyšší = dříve)
  "match": {
    "commands": ["string"],            // Názvy příkazů, které se mají porovnávat (např. "python", "pytest")
    "patterns": ["string"],            // Regulární výrazy pro porovnání výstupu
    "outputTypes": ["string"]          // Detekované třídy výstupu (např. "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Volitelné (výchozí: false). Odstraní barevné kódy ANSI
    "replace": [                       // Pravidla pro vyhledání a nahrazení (výchozí: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Při shodě se vzorem okamžitě ukončí zpracování (výchozí: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Přeskočí, pokud se tento vzor shoduje
      }
    ],
    "includePatterns": ["string"],     // Řádky, které se mají zachovat (regulární výrazy, výchozí: [])
    "dropPatterns": ["string"],        // Řádky, které se mají odstranit (regulární výrazy, výchozí: [])
    "collapsePatterns": ["string"],    // Řádky, které se mají sloučit do jediného výskytu (výchozí: [])
    "deduplicate": boolean,            // Volitelné (výchozí: false). Odstraní duplicitní řádky
    "truncateLineAt": number,          // Volitelné (výchozí: 0). Zkrátí řádky na maximální počet znaků
    "maxLines": number,                // Volitelné (výchozí: 0). Pevný limit celkového počtu řádků
    "headLines": number,               // Volitelné (výchozí: 20). Zachová prvních N řádků odpovídajícího výstupu
    "tailLines": number,               // Volitelné (výchozí: 20). Zachová posledních N řádků odpovídajícího výstupu
    "onEmpty": "string",               // Volitelné (výchozí: ""). Náhradní zpráva, pokud jsou odfiltrovány všechny řádky
    "filterStderr": boolean            // Volitelné (výchozí: false). Filtruje také výstup stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Vzory, které musí být vždy zachovány (výchozí: [])
    "summaryPatterns": ["string"]      // Vzory pro závěrečný souhrnný řádek (výchozí: [])
  },
  "tests": [                           // Vložené testy pro ověření (výchozí: [])
    {
      "name": "string",               // Povinné. Název testu
      "input": "sample output",        // Povinné. Ukázkový vstupní text
      "expected": "expected output",   // Povinné. Očekávaný komprimovaný výstup
      "command": "optional command"    // Volitelné. Kontext příkazu
    }
  ]
}
```

### Příklad: Filtr tracebacku Pythonu

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

### Načítání vlastních filtrů

Umístěte soubor do některého z rozpoznávaných umístění:

```
~/.omniroute/rtk/filters/my-filter.json     # Uživatelská úroveň
<project>/.rtk/filters/my-filter.json      # Úroveň projektu
```

Filtry se při spuštění automaticky načtou pomocí `loadRtkFilters()` v souboru `open-sse/services/compression/engines/rtk/filterLoader.ts`. Načítací modul vyhledává filtry v následujících umístěních:

- Vestavěný katalog: `open-sse/services/compression/engines/rtk/filters/`
- Uživatelský adresář: `~/.omniroute/rtk/filters/`
- Adresář projektu: `<project>/.rtk/filters/`

Programové načtení filtrů:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Možnosti: customFiltersEnabled (načítání uživatelských/projektových filtrů, ve výchozím nastavení zapnuto),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Ověřování

Filtry jsou při načítání ověřovány vůči schématu Zod. Filtr s nesprávnou strukturou se nenačte a zaznamená se chyba:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Chcete-li ověřit všechny nainstalované filtry, zavolejte `runRtkFilterTests()`, která je exportována ze souboru `open-sse/services/compression/engines/rtk/verify.ts`.

### Doporučené postupy

1. **Vždy zahrňte `tests[]`** — dokazují, že váš filtr funguje, a zabraňují regresím
2. **Pro předčasné ukončení použijte `matchOutput`** — pokud celý význam vystihuje jediný řádek, nahraďte jím celý blok
3. **Upřednostňujte `keep` před `strip`** — explicitní pravidla „vždy zachovat“ jsou bezpečnější než „vždy odstranit“
4. **Testujte na všech 3 úrovních intenzity** — `minimal` by neměla provádět žádné změny, `aggressive` by měla stále zachovávat chyby
5. **Použijte pole `unless`** — chraňte předčasná ukončení podmínkou „nespouštět, pokud je přítomno X“

---

## Obnovení nezpracovaného výstupu a ověřovací brána

Když RTK výstup agresivně komprimuje, můžete **obnovit původní text** pro ladění, audit nebo opětovné přehrání.

### Jak funguje obnovení nezpracovaného výstupu

```
Původní výstup (10K tokenů)
        │
        ▼
Komprese RTK (s rawOutput.enabled=true)
        │
        ├─▶ Komprimovaný výstup (2K tokenů)  ──▶ do LLM
        │
        └─▶ Původní výstup (10K tokenů)       ──▶ uložen v DB
                                                     (propojen pomocí request_id)
```

### Povolení ukládání nezpracovaného výstupu

**Pro jednotlivý požadavek** (v kombinované konfiguraci):

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

**Výchozí nastavení**: `rawOutput.enabled: false` (šetří úložiště).

### Nároky na úložiště

| Na požadavek                 | Limit 1 MB    | Limit 10 MB     |
| ---------------------------- | ------------- | --------------- |
| Průměrný komprimovaný výstup | ~5 KB         | ~5 KB           |
| Uložený nezpracovaný výstup  | ~50–500 KB    | ~500 KB–5 MB    |
| Při 1 000 požadavcích/den    | 50–500 MB/den | 500 MB–5 GB/den |

> **Doporučení**: Nezpracovaný výstup povolujte pouze pro **ladicí relace** nebo **výběrové audity**, nikoli trvale.

### Obnovení původního výstupu

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId ze statistik komprese
if (raw) {
  console.log("Původní výstup:", raw);
}
```

Hodnota `pointerId` je po kompresi vrácena v `CompressionStats.rtkRawOutputPointers[]`.
Signaturu funkce naleznete v `open-sse/services/compression/engines/rtk/rawOutput.ts:102`.

### Ověřovací brána

**Ověření filtrů RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) ověřuje všechny filtry vůči jejich `tests[]` a zajišťuje správné chování na všech 3 úrovních intenzity.

Ověření spustíte voláním **`runRtkFilterTests()`**:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Úspěšné: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Neúspěšné: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Ověření filtrů selhalo");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: očekáváno „${o.expected}“, získáno „${o.actual}“`
      );
    });
}
```

**Co ověřuje**:

1. Každý filtr se načte a projde validací schématu
2. Každá položka `tests[]` vytvoří očekávaný výstup
3. Intenzita `minimal` neprovádí žádnou operaci (zachovává originál a používá pouze strukturální filtry)
4. Intenzita `aggressive` zachovává chyby, selhání testů a trasování zásobníku
5. Komprimovaný výstup není nikdy větší než původní vstup

- Zdroj: `open-sse/services/compression/engines/rtk/` (63 souborů, ~70 KB)

- **Před sloučením změny filtru** — vždy se ujistěte, že testy projdou
- **Po upgradu enginu RTK** — schéma se mohlo změnit
- **Pravidelně v rámci monitorování** — chrání před odchylkami v testovacích datech
- **Při přidání nové rodiny nástrojů/příkazů** — dokládá, že nový filtr funguje

---

## Viz také

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Úplný přehled procesu komprese
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registr enginů a vestavěné enginy
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Vlastní enginy, jazykové balíčky, zřetězené procesy
- Zdroj: `open-sse/services/compression/engines/rtk/` (63 souborů, ~70 KB)
