# Quality Gates Reference (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Tento dokument je autoritativním zdrojem informací o všech kontrolních branách kvality CI v OmniRoute.
Popisuje každou bránu, co ověřuje, ve které úloze CI se spouští, zda používá
referenční hodnotu s ráčnovým mechanismem, nebo zásadu úspěch/neúspěch, a zda sestavení blokuje, nebo má pouze informativní charakter.

Stručné shrnutí a zásady seznamu povolených výjimek naleznete v části „Quality Gates & Ratchets“
v souboru `AGENTS.md`. Kritické posouzení, klasifikaci vyspělosti a plán replikace
stejného systému nezávislý na konkrétních nástrojích naleznete v dokumentu
[Průvodce kontrolními branami kvality](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventář bran a profily spouštění

### Přijetí kandidáta

Workflowy CI a Quality Gates poskytují stabilní verdikt: `Gate / CI` a
`Gate / Quality`. Jejich verzovaná politika přijetí označuje každou nadřazenou úlohu
jako povinnou nebo doporučující. Příslušná povinná úloha musí být úspěšná: chybějící,
zrušené, přeskočené, čekající ani neznámé výsledky nemohou stanovit stav PASS. Platná
klasifikace pouze pro dokumentaci nebo pouze pro katalog může způsobit, že větev
pro kód nebude použitelná; koncept PR není přijatelným kandidátem. Štítek `hotfix`
neruší požadavky na důkazy.

Oba workflowy pokrývají PR a pushnutí do hlavních/release větví, ruční spuštění
a události skupin slučování. Pushnutí, ruční spuštění a skupiny slučování spouštějí
úplný výběr. Forky a skupiny slučování používají hostované runnery pro úlohy, které
by jinak vybíraly self-hosted runnery; před zavedením musí být ověřena dostatečná
kapacita hostovaných runnerů.

Každá účtenka JSON identifikuje SHA checkoutu, běh workflow a pokus.
CLI odmítne nesoulad SHA checkoutu a události. Testy workflow vážou členství v politice
na seznam `needs` úlohy s verdiktem, takže nová nebo odebraná větev nemůže nepozorovaně
zmizet. Účtenky pokrývají vlastní workflow, nikoli publikování, nasazení ani interní
fungování existujícího doporučujícího skeneru. Aktivace obou názvů kontrol v pravidlech
větví je samostatnou administrativní změnou; samotné přidání těchto úloh větev nechrání.

### Inventář statických kontrol

Verzovaný inventář aliasů npm a členství ve statických kontrolách se nacházejí v
`config/quality/gate-manifest.json`. Spuštěním `npm run check:gate-manifest` ověřte
názvy skriptů a přesné příkazy vůči `package.json`; přidání, odebrání a změny příkazů
způsobí selhání jak lokálního hooku, tak úloh klasifikace změn v CI.
Alias není úloha workflow, instance matice ani testovací případ: počty těchto položek
nesmějí být prezentovány jako vzájemně zaměnitelné.

Pomocí `npm run quality:scan -- --list` nebo `npm run quality:scan:fast -- --list`
můžete zkontrolovat vybrané aliasy bez jejich spuštění. Runner volá vstupní bod
npm, takže je zachováno jeho běhové prostředí (včetně Bun tam, kde je nakonfigurován).
Manifest zaznamenává aliasy mimo tyto profily jako spouštěné samostatně a
v profilech kontrol pouze pro čtení jsou příkazy údržby zakázány.

Tyto profily pokrývají pouze statické kontroly. Necertifikují produktové testy,
pokrytí, balení, externí kontroly ani úplné přijetí kandidáta k vydání.
Přijetí workflow používá propojené soubory `config/quality/admission-policy.json` a
`scripts/quality/admission-verdict.mjs`. Profily pozorovatele vydání zůstávají oddělené;
jejich příslušné kontroly a účtenky prověřujte nezávisle. Níže uvedený textový
inventář slouží jako reference, nikoli jako důkaz, že byla brána skutečně spuštěna.

Skripty se nacházejí v `scripts/check/` (brány politik) a `scripts/quality/` (ratchet engine).
Zdrojem pravdy pro CI je `.github/workflows/ci.yml`.

### Zrychlená cesta pro release PR (`quality.yml`)

`.github/workflows/quality.yml` doplňuje CI pro PR do hlavních/release větví, pushnutí
do chráněných větví, ruční spuštění a skupiny slučování. PR používají rychlé kontroly
filtrované podle cest. Trvale zakázané duplicitní sestavení bylo odebráno; skutečné
kontroly sestavení, balíčku a spuštění zůstávají v CI.

| Úloha                                            | Rozsah                                                                                                                                                                                                                                       | Blokující         |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `Docs Gates (fast-path)`                         | PR dokumentace/kódu; odkazy na dokumentaci API a veškerá dokumentace                                                                                                                                                                         | Ano               |
| `Fast Quality Gates`                             | PR kódu; statické kontroly, kontrola typů, kontrola typů dashboardu, dotčené jednotkové testy                                                                                                                                                | Ano               |
| `Forgotten sibling tests`                        | PR kódu; změněné moduly vysledované ke statickým konzumentům a kandidátním souvisejícím testům; cesty přes barrel soubory a dynamické importy jsou hlášeny jako doporučující diagnostika s uvedenými výjimkami ze seznamu povolených položek | **Doporučující**  |
| `Vitest (fast-path)`                             | PR kódu; rychlá sada Vitest                                                                                                                                                                                                                  | Ano               |
| `Unit Tests fast-path`                           | PR kódu; jednotková sada rozdělená do 4 shardů                                                                                                                                                                                               | Ano               |
| `No new ESLint warnings`                         | PR kódu; kontrola lintu zohledňující potlačení                                                                                                                                                                                               | Ano, včetně forků |
| `Merge integrity (changelog + generated skills)` | PR, které nejsou koncepty; synchronizace changelogu a generovaných dovedností                                                                                                                                                                | Ano, včetně forků |

#### Report zapomenutých souvisejících testů

`npm run check:forgotten-sibling-tests` znovu používá resolver importů, na kterém je založena mapa dopadu testů.
Pro každý změněný produkční modul hlásí deterministické řetězce
`změněný modul/symbol -> statický konzument -> kandidátní související test`, pokud kandidátní
test chybí v diffu pull requestu. Souhrn ve formátu Markdown a výsledek JSON jsou uchovány jako
artefakt workflow `forgotten-sibling-tests` pro kalibraci před případným zavedením blokující kontroly.

Opětovné exporty ze souborů barrel a dynamické importy slouží pouze jako diagnostika rozlišení; nikdy nevytvářejí
blokující nález. Posouzené výjimky se nacházejí v
`config/quality/forgotten-sibling-allowlist.json`. Každá položka musí uvádět spotřebitele a kandidátní
test, obsahovat konkrétní odůvodnění a odkazovat na issue nebo pull request na GitHubu. Chybně vytvořené položky způsobí
zamítnutí. Výjimky nemohou potlačit smazaný kandidátní test ani změnu, která přidává `.skip`/`.todo`;
oslabování asercí a další maskování nadále spadá pod samostatně blokující
bránu `check:test-masking`.

### Úloha: `lint`

Spouští se při každém PR do `main`. Při selhání blokuje sloučení.

| Skript (`npm run ...`)            | Ověřuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Blokující                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Verze Node.js je v podporovaném rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                          |
| `check:cycles`                    | Cyklické importy napříč celými `src/` + `open-sse/` (založeno na AST, `paths` z tsconfig jsou vyřešeny). Samostatné spuštění = informativní, vypíše cykly. `check:cycles:ratchet` (varianta spouštěná v CI) blokuje, když počet překročí strop `metrics.cycles` v `quality-baseline.json` — aktuálně 14, `direction: down`, takže může pouze klesat (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ano (ratchet)                                |
| `check:route-validation:t06`      | Přítomnost schémat Zod na všech routách (zásada úrovně 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                          |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` nepřekračuje rozpočet (catraca úrovně 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                          |
| `check:provider-consistency`      | Každý poskytovatel v `providers.ts` má odpovídající záznam v `providerRegistry.ts` (a naopak, v rámci seznamu povolených položek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ano                                          |
| `check:model-lifecycle`           | Tři ručně udržované směrovací tabulky zůstávají konzistentní se snapshotem životního cyklu uloženým v repozitáři (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nehodnotí žádné vyřazené id, na které může `REGISTRY` směrovat; každý cíl `BUILT_IN_ALIASES` je přítomen v `REGISTRY` a chybí ve snapshotu vyřazených id; každé vyřazené id, které je stále v `REGISTRY`, je přesměrováno nebo uvedeno v `allowedRetiredInCatalog`; a žádný zdroj ani cíl `DEFAULT_DEGRADATION_MAP` není v tomto snapshotu označen jako vyřazený. Toto nedokazuje, že je model aktuálně poskytován aktivní upstream službou. Offline — porovnává se s `config/quality/model-lifecycle.json`, který se ručně aktualizuje pomocí `npm run quality:refresh-model-lifecycle` (vyžaduje síť; není zapojeno do CI). `allowedRetiredInCatalog` je postupně zpřísňovaná pojistka: záznam přidávejte pouze spolu se sledovacím issue. | Ano                                          |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v klientské části `src/` se překládá na skutečný soubor `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ano                                          |
| `check:deps`                      | Všechny závislosti instalovatelné pomocí `npm install` ze všech souborů `package.json` v repozitáři jsou uvedeny v `dependency-allowlist.json`; nové závislosti bez připnuté verze nebo balíčky podezřelé ze slopsquattingu jsou označeny                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                          |
| `audit:deps`                      | `npm audit` (kořenový adresář) — žádná upozornění s vysokou nebo kritickou závažností (překrývá se s osv `check:vuln-ratchet`; viz backlog racionalizace)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ano                                          |
| `check:lockfile`                  | Integrita souboru `package-lock.json` — registr HTTPS, integritní hashe, žádná přepsání hostitelů                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ano                                          |
| `check:licenses`                  | Seznam povolených licencí SPDX pro produkční závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                          |
| `check:tracked-artifacts`         | Žádné artefakty sestavení / verzované symbolické odkazy na `node_modules` (spouští se také v husky pre-commit; pre-push je záměrně odlehčený — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ano                                          |
| `check:ai-attribution`            | Žádná patička `Co-Authored-By` od AI/bota ani patička o vygenerování pomocí AI v commitech, názvu nebo popisu PR — Pevné pravidlo č. 16 (ve smyčce rychlých kontrol v `quality.yml` pro PR→`release/**` — čte datovou část události, mimo PR nic neprovádí — a krok pouze pro PR v lint kontrole v `ci.yml` pro PR→`main`; také hook husky `commit-msg`; lidští spoluautoři jsou povoleni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Každá výjimka Vitest uvádí sledovaný problém a je uvedena v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ano                                          |
| `check:file-size`                 | Žádný zdrojový soubor nepřekračuje limit pro danou příponu (rohatka: velké soubory zmrazené v seznamu `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ano                                          |
| `check:error-helper`              | Chybové odpovědi v executorech/handlerech používají `buildErrorBody()` / `sanitizeErrorMessage()` (Pevné pravidlo č. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:migration-numbering`       | Migrační SQL soubory jsou číslovány sekvenčně, bez mezer či duplicit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ano                                          |
| `check:public-creds`              | Žádné literály OAuth `client_id`/`client_secret` ani webové klíče Firebase mimo `publicCreds.ts` (Pevné pravidlo č. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ano                                          |
| `check:db-rules`                  | Žádné přímé SQL mimo moduly `src/lib/db/`; žádné hromadné importy z `localDb.ts` (Pevná pravidla č. 2/5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:known-symbols`             | Spouštěče poskytovatelů, strategie směrování a překladače registrované v příslušných dispečerských tabulkách odpovídají souborům na disku — žádné osiřelé ani nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ano                                          |
| `check:route-guard-membership`    | Každá trasa, která spouští podřízený proces, je klasifikována pomocí `isLocalOnlyPath()` (Pevná pravidla č. 15/17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ano                                          |
| `check:test-discovery`            | Každý soubor `*.test.ts` / `*.spec.ts` v repozitáři je zahrnut alespoň jedním nástrojem pro spouštění testů (rohatka: seznam osiřelých souborů v `test-discovery-baseline.json` se může pouze zmenšovat)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ano                                          |
| `check:agent-skills-sync`         | Vygenerované artefakty agent-skills odpovídají svému zdrojovému katalogu (bez odchylek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:provider-asset-provenance` | Loga/assetty poskytovatelů mají zaznamenaný údaj o původu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `lint:json`                       | Konfigurační soubory JSON lze analyzovat a splňují pravidla lintování repozitáře                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `typecheck:core`                  | Kompilace TypeScriptu bez chyb (pouze informativní varování)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ano                                          |
| `typecheck:noimplicit:core`       | Striktní `noImplicitAny` — zaměřeno do budoucna; mnoho již existujících míst volání stále potřebuje anotace                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Informativní** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` omezené na `src/app/(dashboard)/**` (#7033) — kurátorovaný seznam 27 souborů v `typecheck:core` neobsahuje žádný dashboardový TSX a ani `next build` jej nikdy typově nekontroluje (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regrese osiřelých identifikátorů v této oblasti (#6625/#6909) nebyly v CI viditelné. Rozdíly se porovnávají se zmrazenou výchozí hodnotou počtu chyb pro každý soubor a každý kód TS (`config/quality/dashboard-typecheck-baseline.json`, stejný vzor vynucování aktuálnosti jako u `check:known-symbols`) — kontrola selže pouze u NOVÝCH chyb nad rámec výchozího počtu; při opravě již existující chyby výchozí hodnotu snižte pomocí `--update`.                                                                                                                                                                                               | Ano                                          |

### Úloha: `quality-gate`

Spouští se po `test-coverage`. Při selhání blokuje sloučení.

| Skript                       | Ověřuje                                                                                                                                                                    | Blokující                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Vytváří `quality-metrics.json` (počet varování ESLint, pokrytí ze sloučeného reportu dílčích běhů)                                                                         | Ano (předchází ratchetu) |
| `quality:ratchet`            | Žádná metrika v `quality-baseline.json` se nezhoršila (varování ESLint ≤ výchozí hodnota; pokrytí ≥ výchozí hodnota)                                                       | Ano                      |
| `check:duplication`          | Duplikace kódu (jscpd@4) nepřekračuje výchozí hodnotu v `quality-baseline.json`                                                                                            | Ano                      |
| `check:complexity`           | Cyklomatická složitost na úrovni souboru nepřekračuje limit (základní pravidla ESLint `complexity` + `max-lines-per-function`)                                             | Ano                      |
| `check:cognitive-complexity` | Ratchet kognitivní složitosti (`eslint-plugin-sonarjs`) — samostatný průchod ESLint; CI spouští oba společně jako jediný krok `check:complexity-ratchets`                  | Ano                      |
| `check:dead-code`            | Ratchet nepoužitých exportů / souborů (knip) se oproti výchozímu stavu nezhoršil                                                                                           | Ano                      |
| `check:compression-budget`   | Rozpočet benchmarku komprese — minimální úspory tokenů pro jednotlivé enginy se nesmějí zhoršit                                                                            | Ano                      |
| `check:type-coverage`        | Ratchet procenta typovaného kódu (`type-coverage`) se nezhoršil; z velké části nahrazuje `typecheck:noimplicit:core`                                                       | Ano                      |
| `check:codeql-ratchet`       | Počet otevřených výstrah CodeQL se nezhoršil (načítá se přes `gh api`; bez tokenu se korektně přeskočí) — interval aktualizace a ruční spuštění: viz níže „Ratchet CodeQL“ | Ano                      |

### Úloha: `quality-extended`

Celá úloha je pouze informativní (`continue-on-error: true`). Ratchety založené na npm se
spouštějí skutečně; externí skenery se instalují pomocí `gh release download` a samy se přeskočí (ukončení s kódem 0),
pokud binární soubor stále není k dispozici.

| Skript                   | Ověřuje                                                                                                                                                                                                                                     | Blokující                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `check:circular-deps`    | Žádné cyklické závislosti (dpdm)                                                                                                                                                                                                            | **Informativní**                                      |
| `check:bundle-size`      | Velikost balíčku nepřekračuje limit                                                                                                                                                                                                         | **Informativní**                                      |
| `check:secrets`          | Vyhledávání tajných údajů (gitleaks) — přeskočí se, pokud binární soubor není k dispozici                                                                                                                                                   | **Informativní**                                      |
| `check:vuln-ratchet`     | Zranitelnosti závislostí (osv-scanner) se nezhoršily — přeskočí se, pokud binární soubor není k dispozici                                                                                                                                   | **Informativní**                                      |
| `check:workflows`        | Kontrola workflow (actionlint + zizmor); chybějící/nefunkční skenery, neplatné reporty nebo chybějící výchozí stav ratchetu způsobí selhání se stavem INCOMPLETE. Platná zjištění se řídí vybranou přísnou/informativní/ratchetovou zásadou | Spuštění je povinné; ratchet zizmor je v CI blokující |
| `check:openapi-breaking` | Zpětně nekompatibilní změny veřejného kontraktu API (`openapi.yaml`) oproti základní větvi (oasdiff) — vytváří `openapiBreaking=N`; přeskočí se, pokud oasdiff není k dispozici nebo nelze načíst základní specifikaci                      | **Informativní**                                      |

### Úloha: `docs-sync-strict`

Spouští se při každém PR do `main`. Při selhání zablokuje sloučení.

| Skript                         | Ověřuje                                                                                                                                                                                      | Blokující                  |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Metabránu, která postupně spouští 6 níže uvedených dílčích bran                                                                                                                              | Ano                        |
| ↳ `check:docs-sync`            | Konzistenci verzí v CHANGELOGu / OpenAPI / llm.txt                                                                                                                                           | Ano                        |
| ↳ `check:docs-counts`          | Počty v textu (počet poskytovatelů, počet migrací atd.) se nacházejí v tolerančním rozsahu skutečných počtů                                                                                  | Ano                        |
| ↳ `check:env-doc-sync`         | Každá proměnná prostředí v `.env.example` je zdokumentována v tabulce dokumentace a naopak                                                                                                   | Ano                        |
| ↳ `check:deprecated-versions`  | V dokumentaci nejsou žádné řetězce zastaralých verzí                                                                                                                                         | Ano                        |
| ↳ `check:doc-links`            | Interní markdownové odkazy v dokumentaci odkazují na existující soubory (ve formátu `[text]`/`(path)`)                                                                                       | Ano                        |
| ↳ `check:fabricated-docs`      | Trasy, proměnné prostředí, příkazy CLI, názvy hooků a cesty k souborům uvedené v dokumentaci existují v kódové základně. Tvrdá brána přes `--strict`; bez tohoto příznaku nezpůsobí selhání. | Ano (přes `--strict` v CI) |
| `check:cli-i18n`               | Řetězce příkazů CLI jsou přítomny ve všech souborech lokalizací i18n                                                                                                                         | Ano                        |
| `check:openapi-coverage`       | Specifikace OpenAPI pokrývá alespoň postupně zpřísňovanou minimální hranici skutečných tras                                                                                                  | Ano                        |
| `check:openapi-security-tiers` | Anotace úrovní zabezpečení v `openapi.yaml` jsou konzistentní s klasifikacemi v `routeGuard.ts`                                                                                              | **Informativní**           |
| `check:openapi-routes`         | Každá cesta v `openapi.yaml` odpovídá skutečnému souboru `route.ts` (ochrana proti halucinacím)                                                                                              | Ano                        |
| `check:docs-symbols`           | Každý odkaz `/api/...` v `docs/**/*.md` odpovídá skutečnému souboru `route.ts` (ochrana proti halucinacím)                                                                                   | Ano                        |
| `i18n translation drift`       | Nepřeložené klíče v souborech lokalizací i18n — pouze upozornění                                                                                                                             | **Informativní**           |

### Úloha: `i18n-ui-coverage`

| Skript                            | Ověřuje                                                                                                                                                                                                      | Blokující        |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `check-ui-keys-coverage` (inline) | Pokrytí klíčů i18n uživatelského rozhraní je ≥ 65 %                                                                                                                                                          | Ano              |
| `check-ui-value-drift` (inline)   | Po přepsání anglické **hodnoty** nezůstane žádný zastaralý překlad                                                                                                                                           | Ano              |
| `check-new-key-coverage` (inline) | **Nový** anglický klíč je přeložen ve všech lokalizacích — značka `__MISSING__:` je zamítnuta                                                                                                                | Ano              |
| `check-translation-ratio`         | Podíl skutečných překladů v každé lokalizaci (položky mimo seznam výjimek, které jsou shodné s angličtinou, zástupné nebo chybějí) nesmí překročit `config/quality/i18n-translation-baseline.json` + rezervu | **Informativní** |

Vyžaduje `fetch-depth: 0` — brána kontroly změn hodnot porovnává `en.json` se společným předkem.

#### `check-ui-value-drift` — brána proti zastaralým překladům

Zachytává jednu regresi i18n, kterou ostatní brány ze své podstaty nedokážou odhalit: anglická hodnota
je přepsána, ale překlady odvozené od _předchozího_ anglického znění zůstanou beze změny, takže
neanglicky mluvící uživatelé nadále čtou sebejistě formulovaný, avšak nyní nesprávný text.

K tomu skutečně došlo v produkční verzi. `oauthModal.googleOAuthWarning` byl přepsán při přidání
pomocníka pro přihlášení Antigravity (#5203); **39 ze 43 lokalizací** si ponechalo text, který správcům
říkal, aby „zkopírovali celou adresu URL a vložili ji níže“ — postup, který u tohoto poskytovatele nelze
dokončit. Až do #8463 to zůstalo bez povšimnutí, protože:

- `sync-ui-keys` doplňuje pouze klíče, které **chybějí**, nikdy ne ty, které jsou **zastaralé**;
- `check-ui-keys-coverage` počítá _přítomnost_ klíče, takže zastaralý překlad je započítán jako pokrytý;
- `check-translation-drift` sleduje dokumentační zrcadla `docs/i18n/<locale>/**.md` —
  soubory `src/i18n/messages/*.json` nikdy nečte. V úloze `docs-sync-strict` je tato kontrola blokující od
  opětovné synchronizace 2026-09: upravte základní dokument → `npm run i18n:run -- --files=<doc>` (na úrovni sekce, nenáročné).

**Zohledňuje rozdíly, není založeno na výchozím stavu.** Porovnává `en.json` v bodě sloučení
s pracovním stromem; pro každý klíč, jehož anglická hodnota se změnila, je každý jazyk, který
stále obsahuje nezměněný překlad, zastaralý. Tím se záměrně **zmrazí již existující dluh** —
z rozdílu nelze zjistit, ze které staré anglické verze dlouhodobě existující překlad pochází,
takže kontrola posuzuje pouze to, čeho se aktuální změna dotýká. Alternativa (výchozí stav
s hashem pro každý klíč) by vyžadovala přibližně 600KB generovaný soubor, 3× větší než
největší existující výchozí stav, který by se měnil při každém i18n PR.

Kontrolu lze splnit dvěma způsoby:

1. aktualizovat dotčené překlady, nebo
2. nastavit je na `__MISSING__:<nový anglický text>` — běhové prostředí pak poskytne
   opravený anglický text (`src/i18n/request.ts::deepMergeFallback`, #7258) a klíč zařadí
   do fronty k překladu.

Pokud se změnil **význam** řetězce, upřednostněte **přejmenování klíče**: nový klíč nemůže
zdědit zastaralý překlad. Tento postup byl použit v #8463.

```bash
npm run i18n:check-value-drift          # striktní režim (spouštěný v CI)
npm run i18n:check-value-drift:warn     # pouze hlášení
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Ukončí se s kódem 0 a hlášením `SKIP reason=base-unresolved`, pokud nelze načíst základní
katalog (mělký klon bez základní reference), obdobně jako `check-openapi-breaking`.

### Úloha: `i18n`

Úplná matice ověřování i18n (jedna úloha pro každý jazyk). Celá úloha je informativní.

| Skript                          | Ověřuje                          | Blokující                                                    |
| ------------------------------- | -------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Úplnost překladu pro každý jazyk | **Informativní** (`continue-on-error: true` pro celou úlohu) |

### Úloha: `pr-test-policy`

Spouští se pouze pro pull requesty.

| Skript                 | Ověřuje                                                                                                                           | Blokující |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR měnící produkční kód v `src/`, `open-sse/` nebo `bin/` musí obsahovat nové či aktualizované testy (Pevné pravidlo č. 8)        | Ano       |
| `check:test-masking`   | Změněné testovací soubory nesnižují čistý počet asercí ani nepřidávají tautologie `assert.ok(true)`                               | Ano       |
| `check:pr-evidence`    | Tělo PR uvádí doklady o testování/VPS dané změny (automatizuje Pevné pravidlo č. 18 prohledáváním textu PR — křehké, viz Backlog) | Ano       |

### Úloha: `test-vitest`

Spouští se po `build`. Při selhání blokuje sloučení.

| Sada             | Ověřuje                                                  | Blokující                                                                                                             |
| ---------------- | -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 nástrojů), autoCombo, mezipaměť — vitest | Ano                                                                                                                   |
| `test:vitest:ui` | Testy komponent uživatelského rozhraní — vitest          | **Blokující** — již existující selhání jsou v `vitest.config.ts` explicitně vyloučena; nová selhání způsobí pád úlohy |

### Noční pracovní postupy (plánované, informativní)

Spouštějí se podle plánu cron (a pomocí `workflow_dispatch`), nikdy pro PR. Všechny jsou informativní.

| Pracovní postup        | Ověřuje                                                                                                                                                               | Blokující        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | Testy vlastností fast-check s náhodným seedem a vysokým počtem běhů                                                                                                   | **Informativní** |
| `nightly-resilience`   | Kontrolu růstu haldy, chaos fault-injection a zátěžové/dlouhodobé testy k6                                                                                            | **Informativní** |
| `nightly-llm-security` | Ochranu proti injekcím promptfoo (režim blokování) a sondy garak (přeskočeno bez tajného klíče poskytovatele)                                                         | **Informativní** |
| `nightly-schemathesis` | Fuzzing kontraktu OpenAPI (schemathesis) proti běžící službě OmniRoute pomocí `docs/openapi.yaml` — odhaluje porušení specifikace / neošetřené chyby 500 (Fáze 8 B.4) | **Informativní** |
| `nightly-mutation`     | Skóre mutačního testování Stryker pro rychlou větev jednotkových testů — přeživší mutanty odhalují slabé aserce                                                       | **Informativní** |
| `nightly-compat`       | Matici kompatibility enginu Node napříč podporovanými rozsahy `engines.node`                                                                                          | **Informativní** |

---

## Fáze velocity (2026-08-30 → v4.0 LTS): všechny výchozí limity uvolněny o 20 %

Rozhodnutí vlastníka (2026-08-30): až do modularizace ve v4.0 je rychlost vydávání důležitější
než udržování technického dluhu na uzdě. Všechny **číselné** výchozí hodnoty ratchetů byly v jednom
auditovatelném kroku uvolněny o 20 % a fáze je deklarována v `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Co se změnilo                                                                                                                                                                                                        | Kde                                                                                                    |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — počty, kde je nižší hodnota lepší, ×1,2; procenta, kde je vyšší hodnota lepší, ÷1,2 (minimum pokrytí zůstalo 60, `eslintErrors` zůstává 0, `eslintWarnings` 0 → 20 % zmrazeného počtu potlačení) | `quality-baseline.json` (poznámka `_relax_velocity_2026_08_30` uvádí všechny změny před → po)          |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                     | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, každý limit řádků `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                               | `file-size-baseline.json`                                                                              |
| počty pro jednotlivé soubory / jednotlivé soubory kódu TS ×1,2                                                                                                                                                       | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                  | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` má pouze informativní charakter, když `_policy.requireTighten === false`                                                                                                                         | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| noční `bank-ratchet-shrinks` je pozastaven (uložil by naměřené snížení a zrušil tak rezervu)                                                                                                                         | `.github/workflows/nightly-release-green.yml`                                                          |

Seznamy povolených výjimek (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nejsou** rozpočty a nebyly změněny. Kontrolní brány zásad s výsledkem úspěch/neúspěch (tajné údaje, pravidla SQL,
soulad dokumentace s prostředím, shoda i18n, jednotkové testy) zůstávají beze změny — neúspěšný test je stále neúspěšný test.

**Nástroje**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednorázové
  uvolnění (`scripts/quality/relax-baselines.mjs`); odmítne se spustit podruhé se stejnou poznámkou.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  měří každou číselnou bránu stejným způsobem jako CI a vypisuje zbývající rezervu pro jednotlivé brány
  (`scripts/quality/baseline-headroom.mjs`). Noční úloha `baseline-headroom` zveřejňuje
  tabulku v průběžně aktualizovaném issue **📈 Rezerva výchozích limitů (fáze velocity)** a přidá
  štítek `headroom-alert`, pokud je některá brána ve vzdálenosti do 10 % od svého limitu nebo jej již překročila. Toto issue
  slouží jako včasné varování: rozpočet, který se vyčerpá během několika dnů, znamená, že uvolnění spotřebovává
  několik PR, nikoli celý tým — podívejte se na poznámky `_rebaseline_*` příslušné brány.

**Režim nového kódu (Clean-as-You-Code) — od 2026-08-30, pouze rychlá cesta pro PR**

Při událostech `pull_request` předává `quality.yml` parametr `--base-ref <PR base SHA>` kontrolám `check:file-size`,
`check:complexity-ratchets` a `check:dead-code`. V tomto režimu brána porovnává HEAD s
merge-base **pouze u souborů změněných daným PR** (`scripts/check/newCodeMode.mjs`:
merge-base se zhmotní v dočasném `git worktree`, ESLint/knip se spustí v něm i na HEAD a
počty pro jednotlivé soubory se porovnají):

- **blokující** — PR přidal porušení cyklomatické/kognitivní složitosti nebo nepoužité exporty v souborech, které změnil
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` v protokolu);
- **informativní** — globální součet oproti zmrazené výchozí hodnotě. Zděděná odchylka nikdy nezpůsobí
  selhání nevinného PR; odchylka se při sladění vydání znovu zmrazí a sleduje ji úloha kontrolující rezervu.

Spuštění `workflow_dispatch`, kontrola release-green a noční úloha kontrolující rezervu nemají základ PR
a nadále používají absolutní (globální) porovnání. Pokrytí, duplicita a typové pokrytí prozatím zůstávají globální
(jejich nástroje neumějí levně vytvořit rozdíl pro jednotlivé soubory) — jsou kandidáty na stejné zpracování.

**Ukončení fáze ve v4.0 (LTS = přísnější než dříve, nikoli „návrat k normálu“)**

1. Na čisté špičce větve `release/v4.0.0`: pro záznam spusťte `npm run quality:headroom --json` a poté
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` a
   `--update` pro každou kontrolu typů — každá výchozí hodnota se sníží na naměřenou hodnotu.
2. Odstraňte `_policy` ze souboru `quality-baseline.json` (tím se znovu aktivuje `--require-tighten`
   a noční ukládání rezervy), obnovte `THRESHOLD = 36` (nebo vyšší) v souboru
   `check-openapi-coverage.mjs`.
3. Zpřísněte limity nad rámec naměřených hodnot tam, kde se modularizace vyplatila: `cap` velikosti
   souboru zpět na 1000 (nebo 800), minimální pokrytí +5, počet nepoužitých exportů 0 pro
   modularizované balíčky.

## Výchozí stav ráčny (`quality-baseline.json`)

Mechanismus ráčny (`scripts/quality/check-quality-ratchet.mjs`) načítá soubor `quality-baseline.json`
a porovnává jej s nově získaným souborem `quality-metrics.json`. Jakákoli metrika, která se zhorší
o více než příslušná hodnota epsilon, způsobí selhání sestavení.

Aktuálně sledované metriky:

| Metrika               | Směr   | Význam                                |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Počet varování ESLint se nesmí zvýšit |
| `coverage.statements` | `up`   | Pokrytí příkazů se nesmí snížit       |
| `coverage.lines`      | `up`   | Pokrytí řádků se nesmí snížit         |
| `coverage.functions`  | `up`   | Pokrytí funkcí se nesmí snížit        |
| `coverage.branches`   | `up`   | Pokrytí větví se nesmí snížit         |

Aktualizace výchozího stavu po skutečném zlepšení:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Příznak `--update` zapíše aktuálně naměřené hodnoty do souboru `quality-baseline.json`.
Tento soubor commitněte společně se změnou, která metriku zlepšila. PR, který zlepší
metriku bez aktualizace výchozího stavu, bude zachycen pomocí `--require-tighten` (Fáze 6A.5,
implementace se připravuje).

### Ráčna CodeQL: četnost aktualizace a ruční spuštění

`check:codeql-ratchet` načítá **stav repozitáře, který se aktualizuje podle plánu — nikoli pro každý PR.**
Příkaz `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` hlásí
`state: configured`, `schedule: weekly`: jedná se o kontrolu výchozího nastavení GitHubu, nikoli o analýzu
při každém pushi. Důsledek: po sloučení PR, který OPRAVUJE výstrahy, ráčna nadále načítá
starý, vyšší počet až do spuštění následující plánované kontroly — takže hlásí regresi
u každého otevřeného PR, včetně následných změn samotného opravného PR, dokud kontrola stav neaktualizuje.

**Ruční aktualizace**: `gh workflow run codeql.yml --ref release/vX.Y.Z` znovu spustí
analýzu a během několika minut znovu zveřejní výstrahy. Nejprve si přečtěte `.github/workflows/codeql.yml`
— jeho záhlaví vysvětluje, že používá pouze `workflow_dispatch`, **protože je v konfliktu s
„výchozím nastavením“ GitHubu** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Obnovení triggerů `push`/`pull_request`/
`schedule` vyžaduje nejprve **akci vlastníka**: Settings → Code security →
CodeQL: Default → Advanced. Bez tohoto přepnutí trigger `schedule:` nepřidávejte — pouze
způsobí neúspěšná spuštění.

**Po snížení počtu zpřísněte výchozí stav** — příkaz `node scripts/check/check-codeql-ratchet.mjs
--update` zapíše nový naměřený počet do `quality-baseline.json` →
`metrics.codeqlAlerts.value`, takže ráčna nebude tiše povolovat regresi zpět
ke starému limitu. Praktický příklad (2026-09-02/03): PR #12502 opravil 7 skutečných výstrah
(13 → 6 naměřených otevřených); PR #12530 zpřísnil zmrazený výchozí stav z 11 → 6, aby odpovídal skutečnosti;
zbývajících 6 výstrah bylo následně zamítnuto s individuálním odůvodněním pro každou z nich, čímž počet otevřených klesl na 0.

**O zamítnutí rozhoduje operátor (Pevné pravidlo č. 14)** — nikdy nezamítejte výstrahu CodeQL,
aniž byste do komentáře k zamítnutí zaznamenali technické odůvodnění: `won't fix` pro
požadavek nadřazeného protokolu, `used in tests` pro testovací přípravek, `false positive`
pro sanitizaci, kterou CodeQL nedokáže rozpoznat (precedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Zásady opakování testů (WS5.4, v3.8.49)

Opakování se nastavuje pro jednotlivé runnery, nikdy plošně globálně — plošné opakování mění skutečné regrese
na neviditelné nahodilé chyby:

| Runner           | Zásady                                                                                                                                   | Proč                                                                                                                                    |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` pouze v CI, s `trace: on-first-retry`                                                                                       | Časování prohlížeče/sítě je skutečně nedeterministické; jedno opakování se záznamem mění nahodilou chybu na diagnostikovatelný artefakt |
| Vitest           | ŽÁDNÉ globální opakování. Prokazatelně nestabilní test dostane explicitní opakování pro daný test (viditelné v diffu, kontrolované v PR) | Udržuje seznam testů v karanténě v repozitáři, nikdy neprůhledný                                                                        |
| node:test (unit) | NIKDY neopakovat                                                                                                                         | Nestabilní jednotkový test je chyba v testu — opravte jej, nespouštějte jej pouze znovu                                                 |

Cílové SLO po nasazení telemetrie nahodilých chyb (WS5.2/5.3): <1% míra nahodilých chyb na test
(prahová hodnota „opravit ihned“), ≥95% úspěšnost na pipeline. Referenční hodnoty z oboru —
znovu je zkalibrujte podle našich vlastních měření.

## Posun západky na úrovni releasu (WS5.5, v3.8.49)

Když dojde k regresi západky (velikost souboru, složitost, varování eslint) na ČISTÉM vrcholu
releasu — tj. regresi způsobila KOMBINACE mergů a žádný jednotlivý PR ji nereprodukuje
ve své vlastní větvi — náprava náleží **kapitánovi releasu, jednorázově, ve větvi
releasu**: upřednostněte extrakci/refaktoring; novou základní hodnotu nastavte pouze se
zdokumentovaným odůvodněním. Nikdy nepřenášejte kombinovaný posun na PR přispěvatele
a nikdy nenastavujte novou základní hodnotu pro jednotlivé PR (tím by se skryly skutečné regrese).
Nejprve rozlište příčinu: před předpokladem, že ji způsobil váš PR, reprodukujte červený
stav proti čistému vrcholu v průzkumném worktree.

## Ukládání snížení západek — směr dolů (#8584)

Západka je automatická pouze napůl, a navíc jde o nesprávnou polovinu. **Zvýšení** limitu je
ruční úprava JSON, která trvá deset sekund a představuje nejrychlejší způsob, jak odblokovat
červený PR. **Snížení** vyžaduje, aby někdo spustil `--update` a výsledek commitnul — a dokud
nebyla nasazena úloha `bank-ratchet-shrinks`, žádný workflow ji nespouštěl. Naměřený důsledek
(2026-07-25): 18 zmrazených souborů již bylo na úrovni limitu 800 řádků pro nové soubory nebo pod ní,
přičemž nejhorší případ dosahoval 132× (`src/shared/validation/schemas.ts`, 19 řádků s limitem 2,523);
strop složitosti se v průběhu přibližně 37 poznámek o změně základní hodnoty posunul
z `1794 → 2169`, přičemž nastalo právě jedno snížení (−1); a text „zpřísnit pomocí `--update`
v příštím cyklu“ byl zapsán 31krát a dodržen jednou. Limit, který přetrvá kód, jenž byl
důvodem jeho vzniku, tiše mění každý dokončený rozklad na rezervu pro růst pro kohokoli,
kdo soubor upraví jako další.

`nightly-release-green.yml` → úloha **`bank-ratchet-shrinks`** tuto smyčku uzavírá:

|                |                                                                                                                  |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| Spouští se při | `schedule` (3×/den) + `workflow_dispatch` — záměrně **nikoli** při `push`                                        |
| Měří           | nejvyšší `release/vX.Y.Z`, se stejným rozlišením a ochranou proti vložení jako `release-green`                   |
| Zapisuje       | `check:file-size --update` a `check:complexity-ratchets --update` (obojí svou konstrukcí umožňuje pouze snížení) |
| Ověřuje        | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Dodává         | jeden vždy aktuální PR proti větvi releasu — aktualizovaný vynuceně, nikdy nevytvářený opakovaně                 |

Ukládání se provádí dávkově, nikoli při každém pushi, protože nemá žádné požadavky na latenci
(uložení snížení do 8 hodin je v pořádku), zatímco spuštění při každém mergi by během slučovacích
kampaní opakovaně sestavovalo větev PR a pokaždé platilo za úplný průchod ESLintem. Detekce
zůstává navázána na push (`release-green`); dávkově probíhá pouze ukládání.

### Bezpečnostní ověřovač

Úloha zapisuje do základních hodnot bez dozoru, takže přijatelnost tohoto postupu zajišťuje
`verify-ratchet-bank.mjs`. Porovná strom po provedení `--update` se stavem `HEAD` a **ukončí úlohu
předtím, než existuje jakýkoli commit** — bez otevření PR — pokud každá změna není jednou z následujících:

- číselná položka `frozen` / `testFrozen` byla **snížena** nebo **odebrána**
- `complexity-baseline.json` → `count` bylo **sníženo**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` bylo **sníženo**

Cokoli jiného selže: zvýšení čísla, přidání položky, změna `cap`/`testCap` nebo
odstranění/přepsání poznámky `_rebaseline_*` (tyto poznámky tvoří auditní stopu vysvětlující,
proč každý strop existuje, a jsou uloženy uvnitř stejného objektu `frozen` jako položky souborů).
Bot, který by mohl zvýšit limit, by byl jednoznačně horší než současný stav. Ochrana proti regresi:
`tests/unit/verify-ratchet-bank.test.ts`.

Úloha nikdy neprovádí push do `release/*` — PR merguje člověk, takže nesprávné měření
nemůže být začleněno bez kontroly.

## Zásady seznamu povolených výjimek

Každá kontrola, která nemůže selhat kvůli již existujícím porušením, používá zmrazený seznam povolených výjimek
(např. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Platí následující zásada:

**Opravte základní příčinu; seznam povolených výjimek použijte pouze tehdy, když porušení již existovalo
a nelze je opravit ve stejném PR.**

Při přidávání položky do seznamu povolených výjimek:

1. Přidejte komentář s odůvodněním.
2. Uveďte odkaz na sledovací issue (např. `// #3498 — Funkce 2. fáze, dosud neimplementována`).
3. Položku odstraňte ve stejném PR, které porušení opravuje — zastaralá položka, která již
   nepotlačuje aktivní porušení, je sama o sobě vadou (kontrola zastaralého vynucování 6A.3
   po implementaci selže na osiřelé položce seznamu povolených výjimek).

**Nepřidávejte** položky do seznamu povolených výjimek jen proto, aby testy prošly rychleji. Úspěšná kontrola při současném rozšiřování
seznamu povolených výjimek vytváří falešný pocit kvality.

### Když kontrola ve vašem PR selže

1. **Pečlivě si přečtěte výstup kontroly** — přesně vám sdělí, který soubor nebo symbol
   porušil pravidlo.
2. **Opravte porušení** — většina kontrol jsou deterministické kontroly souborového systému, které projdou, jakmile
   je kód správný.
3. **Pokud porušení již existovalo** (tj. nezavedli jste je vy, ale kontrola se na ně nyní
   vztahuje): přidejte položku do seznamu povolených výjimek s komentářem obsahujícím odůvodnění a odkazem na sledovací issue.
4. **Pokud je kontrola západková** (pokrytí, varování ESLint, duplicita, složitost):
   vaše změna metriku zhoršila. Opravte základní problém nebo (ve vzácných případech) spusťte
   `npm run quality:ratchet -- --update`, pokud je změna záměrná a zhoršení metriky
   je přijatelné — v popisu PR však zdokumentujte proč.
5. **Informativní kontroly** (`continue-on-error: true`) slouží pouze pro informaci — neblokují
   sloučení, ale zobrazují se v souhrnu CI. Přesto je opravte.

---

## Přidání nové kontroly

1. Vytvořte `scripts/check/check-<name>.mjs` (nebo `.ts`). Kontroly zásad končí s kódem 0/1.
   Západkové kontroly zapisují metriku do `quality-metrics.json` prostřednictvím `collect-metrics.mjs`.
2. Přidejte `"check:<name>": "node scripts/check/check-<name>.mjs"` do `package.json`.
3. Zapojte ji v `.github/workflows/ci.yml` do příslušné úlohy
   (zásady → `lint` nebo `docs-sync-strict`; západka → `quality-gate`).
4. Pokud používá seznam povolených výjimek, aplikujte `reportStaleEntries()` z
   `scripts/check/lib/allowlist.mjs`, aby byly zastaralé položky automaticky detekovány.
5. Napište test v `tests/unit/build/`, který pokryje detekční logiku kontroly.
6. Aktualizujte tento dokument (přidejte řádek do tabulky příslušné úlohy).

---

## Nástroje pro agenty: LSP-in-the-loop (volitelné)

Kromě kontrol CI obsahuje OmniRoute **volitelnou** kostru `agent-lsp`
(soubor `.mcp.json` na úrovni projektu, Fáze 7, Úloha 15). Vytvořením `.mcp.json`
zpřístupníte programovacím agentům jazykový server TypeScript, aby dokázali vyhledat symboly /
diagnostiku **před** zápisem kódu — jde o doplněk ke `typecheck:core` založený na principu „nejprve zkompilovat, potom tvrdit“,
který omezuje chyby způsobené „vymyšlenými symboly“ přímo u zdroje. Záměrně se
nenačítá automaticky (most MCP↔LSP si vybíráte a ověřujete sami); nefunkční položka pouze zaznamená
chybu připojení a nikdy nenaruší relace.

---

## Seznam racionalizačních úkolů (revize ROI — fáze 9, vlna 3)

Tento inventář byl dne 2026-06-17 porovnán s `ci.yml` (předchozí verze vynechala
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Revize ROI sjednocené sady
identifikovala následující kandidáty na racionalizaci. **Sloučení jsou mechanické změny
CI; změny režimu či odstranění jsou politická rozhodnutí vyhrazená provozovateli.** Nic
z níže uvedeného zatím nebylo aplikováno.

**Výše rovněž nezdokumentováno** (poradní, nízká vypovídací hodnota): úloha `docs-lint`
(markdownlint + Vale, celá úloha s `continue-on-error`) a samostatné workflow skenerů
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Hodnota `semgrepFindings: 0` se nachází
v `quality-baseline.json`, ale není v `ci.yml` napojena na blokující západku — tato metrika
je aktuálně osiřelá.

### Sloučení / odstranění duplicit (mechanické, nižší riziko)

Každý kandidát byl dne 2026-06-17 ověřen vůči aktuálnímu stavu kontrol (důvěřuj, ale
prověřuj); ukázalo se, že několik „zjevných“ sloučení skrývá dluh a **nelze** je čistě
nahradit.

- **`check:docs-sync` se spouští dvakrát** — samostatně v úloze `lint` a znovu v rámci `check:docs-all` (`docs-sync-strict`) a husky pre-commit hooku. ✅ **HOTOVO** — samostatné spuštění v `lint` bylo odstraněno.
- **Skenování CVE** — ❌ **NEJDE o čisté sloučení.** `audit:deps` skončí tvrdou chybou při jakékoli CVE se závažností high/critical; `check:vuln-ratchet` (osv) selže pouze při _regresi_ oproti výchozímu stavu (aktuálně 1 MODERATE). Odlišná sémantika — odstraněním `audit:deps` by se ztratila absolutní kontrola závažností high/critical. Ponechat obě.
- **Detekce cyklů** — ✅ **HOTOVO** (#15159 G-01/G-02). Původní text zde označoval `check:cycles` za „zelenou, pečlivě vybranou“ kontrolu a její blokující režim zdůvodňoval tím, že `check:circular-deps` (dpdm) hlásil 91 cyklů. Tento zelený stav byl **falešně pozitivní**: `check:cycles` kontroloval 5 podadresářů (450 souborů), vyhledával pouze statické `import|export … from` a zahazoval všechny specifikátory `@/` a `@omniroute/open-sse/`, takže nemohl odhalit cykly dynamických importů a aliasů, které v repozitáři převažovaly. Opraveno: kontrola nyní prochází `src` + `open-sse` (5023 souborů), shromažďuje specifikátory z AST TypeScriptu (takže `import("…")` se započítává, zatímco `typeof import("…")` na pozici typu nikoli) a překládá `paths` z tsconfigu. Nachází **14** cyklů, nikoli 0. Protože 14 již existujících cyklů nelze opravit v PR zavádějícím kontrolu, je nyní `check:cycles` **západkou** (`--ratchet`, strop `metrics.cycles.value = 14` v `quality-baseline.json`, `direction: down`) — blokuje každou _regresi_ a počet může pouze klesat. CI spouští `npm run check:cycles:ratchet`. Postupné snižování probíhá společně s **A-01**. `check:circular-deps` (dpdm) zůstává poradní jako širší nezávislá kontrola.
- **Složitost** — ✅ **HOTOVO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jeden průchod ESLintu, počítání podle ruleId, takže výchozí hodnoty cyklomatické složitosti + maximálního počtu řádků a kognitivní složitosti zůstávají nezávislé; jednotlivé kontroly `check:complexity` / `check:cognitive-complexity` zůstávají zachovány pro místní použití s `--update`.
- **Ochrana `/api` proti halucinacím** — ✅ **HOTOVO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden inventář souborového systému pro `src/app/api`; openapi-routes + docs-symbols nadále hlásí výsledky nezávisle; jednotlivé kontroly zůstávají zachovány pro místní spuštění.
- **`check:node-runtime` se spouští v 11 úlohách** — ⚠️ **nízké ROI.** Každá běží na samostatném runneru a kontrola trvá <1 s; celková úspora činí přibližně 10 s za cenu ztráty levné ochrany pro každou úlohu. Nestojí to za související změny.
- **`typecheck:noimplicit:core` v lintování CI** — ✅ **odstraněno z úlohy lint** (dříve poradní s `continue-on-error`); blokující typový povrch tvoří `typecheck:core` + `check:type-coverage`. Místní skript byl zachován.

### Změna režimu / rozhodnutí (politika provozovatele)

- `check:openapi-security-tiers` (poradní) — ❌ **NELZE čistě přepnout.** Končí s kódem 0, ale upozorňuje, že několika trasám `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` chybí anotace `x-loopback-only: true`. Jeho vynucení nejprve vyžaduje přidání těchto anotací do `openapi.yaml`.
- `typecheck:noimplicit:core` (poradní) — z velké části nahrazeno blokující západkou `check:type-coverage`. Přepnout na západku, nebo odstranit redundantní druhý průchod `tsc`.
- `test:vitest:ui` (nyní **blokující**) — již existující selhání jsou explicitně vyloučena ve `vitest.config.ts` pomocí sledovacích komentářů `// #8618`; nová selhání způsobí neúspěch úlohy.
- `check:secrets` (gitleaks, blokující západka zmrazená na 3 zdokumentovaných falešně pozitivních nálezech) — přidat tyto 3 případy na seznam povolených a dosáhnout hodnoty 0, nebo kontrolu degradovat na poradní. Překrývá se s nativním skenováním tajných údajů GitHubu + `check:public-creds`.
- `check:pr-evidence` (blokující, vyhledává vzory v textu těla PR) — vysoké riziko falešně pozitivních výsledků; odstranění by oslabilo vynucování závazného pravidla č. 18, takže jde o skutečné politické rozhodnutí.
- `semgrep` (poradní, samostatný) — u rodin OWASP se překrývá s CodeQL; napojit jeho výchozí hodnotu na západku, nebo jej odstranit.

---

## Související dokumentace

- Dodavatelský řetězec (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrola shody sad klíčů

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, úloha `i18n-ui-coverage`).
Porovnává sadu koncových klíčů každého souboru `src/i18n/messages/<locale>.json` se souborem `en.json` a selže
při jakémkoli chybějícím nebo nadbytečném koncovém klíči bez ohledu na to, kdy byl klíč přidán. Zástupné hodnoty
`__MISSING__:` se počítají jako přítomné (jejich obsah řeší kontrola poměru). Jde o absolutní doplněk
dvou kontrol založených na rozdílech/procentech: `check-ui-keys-coverage` vynucuje minimální pokrytí 80 % pro
každé locale (43 chybějících klíčů z přibližně 13 000 stále znamená 99,7 %) a `check-new-key-coverage` posuzuje
pouze klíče, které PR přidává do `en.json`. Dávka locales se vygeneruje z verze `en.json` platné v den
vytvoření její větve a překlady probíhají několik dní, zatímco základní větev dál získává nové klíče; dávkový PR sám
žádný klíč nepřidává, takže obě související kontroly mlčely, když byla dávka 1 (#13044) začleněna s 43 chybějícími klíči v devíti
locales a dávka 2 (#13660) s 10 chybějícími klíči v osmi (2026-09-15). Neúspěšnou kontrolu opravte pomocí
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; koncový klíč označený jako `extra`
znamená, že jej zdroj odstranil — odstraňte jej tedy i z daného locale. `--warn` problém ohlásí bez ukončení s chybou.
`--catalog=cli` spustí stejné porovnání nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba kroky jsou součástí úlohy `i18n-ui-coverage`.

#### `check-new-key-coverage` — kontrola i18n pro nové klíče

Související kontrola ke `check-ui-value-drift`. Ta zachytí anglickou hodnotu, která byla **přepsána**,
zatímco její překlady zůstaly beze změny; tato kontrola zachytí anglický klíč, který byl **přidán**,
ale některá locales jej nikdy neobdržela.

`check-ui-keys-coverage` tuto třídu problémů nedokáže odhalit: vynucuje minimální procentuální pokrytí pro jednotlivá locales a
jedenáct chybějících klíčů z přibližně 13 000 ponechá pokrytí na 99,9 %. Procentuální hodnota pro jednotlivé jazyky nedokáže
vyjádřit, že „tato funkce byla vydána bez překladu“ — celá funkce může být začleněna do nového locale bez jakéhokoli
textu, aniž by se číslo vůbec změnilo.

Incident, který tato kontrola zachycuje: fáze 3 nástroje Orchestration Canvas přeložila svých jedenáct klíčů ve
42 locales, která v té době existovala. O několik hodin později rozšířila dávka jazyků EU (#13044) repozitář
na 51 locales a devět nových (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) je nikdy
neobdrželo. `deepMergeFallback` nahradí chybějící klíč angličtinou, takže výsledkem bylo
nepřeložené, nikoli prázdné uživatelské rozhraní — skutečný problém, který z principu zůstal bez upozornění.

Stejně jako související kontrola **zohledňuje rozdíly**: porovnává angličtinu v bodě sloučení se
současným pracovním stromem, takže již existující mezery zůstávají beze změny a zapnutí kontroly nevyžadovalo žádnou migraci.

**Značka `__MISSING__:<english>` tuto kontrolu nesplňuje (od 2026-09-17).** Dříve představovala
zdokumentovaný odklad — běhové prostředí použije jako náhradu správnou angličtinu — dokud osm PR s funkcemi
dne 2026-09-16 nepřidalo 61 klíčů a nevložilo tuto značku do všech 65 locales namísto jejich přeložení: tato
kontrola všechny přijala, PR nic nezablokovalo a blokující kontrola poměru skutečných překladů
poté selhala na špičce vydání všem (pt-BR 3,2 % > 2,5 % + 0,5). Značka je nyní posuzována
jako chybějící překlad. Neúspěšnou kontrolu opravte pomocí
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` nebo
pro všechna locales paralelně pomocí `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
bezpečné při odpojení, odmítne se spustit bez proměnných prostředí `OMNIROUTE_TRANSLATION_*`). Klíč, který musí zůstat
v angličtině (pevně daný název produktu, enginu nebo příznaku), patří do `scripts/i18n/untranslatable-keys.json`,
nikdy za značku. `vi` značky zcela zakazuje (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrola odložených testů

Soubor v seznamu `exclude` v `vitest.config.ts` představuje test, který se nespouští, a pro každého, kdo prochází
strom, přesto působí jako pokrytí. Za komentářem se nahromadilo šedesát dva souborů
`// #8618 — již existující selhání; po opravě tuto výjimku odstraňte`. Problém #8618 byl uzavřen
2026-08-11, zatímco seznam, který sledoval, narostl ze 45 položek na 62, přičemž každá nová položka zdědila komentář
odkazující na uzavřený problém. Když byl seznam konečně proměřen soubor po souboru (#13204), **51 z 62
testů prošlo nad aktuálním stromem bez jakékoli změny zdrojového kódu**.

Kontrola vyžaduje, aby každá výjimka odkazující na skutečný soubor (a) uváděla sledovací problém a
(b) byla uvedena v `config/quality/vitest-exclusions.json` se svým naměřeným stavem, takže přidání výjimky představuje
kontrolovatelný rozdíl ve vyhrazeném souboru namísto dalšího řádku v poli s 60 položkami. Záměrně
vyloučené testy znovu nespouští — to trvá přibližně 10 minut a patří do periodické úlohy;
inventář zaznamenává, kdy byla každá položka naposledy změřena.
