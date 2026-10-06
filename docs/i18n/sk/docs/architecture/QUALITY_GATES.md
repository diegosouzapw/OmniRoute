# Quality Gates Reference (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Tento dokument je autoritatívnou referenciou pre všetky kvalitatívne brány CI v OmniRoute.
Opisuje každú bránu, čo overuje, v ktorej úlohe CI sa spúšťa, či používa
sprísňujúcu referenčnú hodnotu alebo politiku úspechu/neúspechu a či zostavenie blokuje, alebo má iba poradný charakter.

Stručné zhrnutie a politiku zoznamu povolených výnimiek nájdete v časti „Quality Gates & Ratchets“
v súbore `AGENTS.md`. Kritické posúdenie, klasifikáciu vyspelosti a plán replikácie
rovnakého systému nezávislý od nástrojov nájdete v dokumente
[Príručka ku kvalitatívnym bránam](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventár brán a profily vykonávania

### Prijatie kandidáta

Pracovné postupy CI a Quality Gates poskytujú stabilné verdikty: `Gate / CI` a
`Gate / Quality`. Ich verzovaná politika prijímania uvádza každú nadradenú úlohu
ako povinnú alebo odporúčanú. Každá relevantná povinná úloha musí uspieť: chýbajúce,
zrušené, preskočené, čakajúce a neznáme výsledky nemôžu stanoviť stav PASS. Platná
klasifikácia iba pre dokumentáciu alebo iba pre katalóg môže spôsobiť, že vetva pre
kód nebude relevantná; koncept PR nie je akceptovaným kandidátom. Označenie `hotfix`
neruší požiadavku na dôkazy.

Oba pracovné postupy pokrývajú PR a odoslania do vetiev main/release, manuálne
spustenie a udalosti merge-group. Odoslanie, spustenie a merge-group vykonávajú
úplný výber. Forky a skupiny zlúčenia používajú hostované runnery pre úlohy, ktoré
by inak vybrali samostatne hostované runnery; pred nasadením treba overiť dostatočnú
hostovanú kapacitu.

Každé potvrdenie JSON identifikuje checkout SHA, spustenie pracovného postupu a pokus.
CLI odmietne nezhodu SHA medzi checkoutom a udalosťou. Testy pracovných postupov viažu
členstvo v politike na zoznam `needs` úlohy verdiktu, takže nová alebo odstránená vetva
nemôže nepozorovane zmiznúť. Potvrdenia pokrývajú vlastný pracovný postup, nie
publikovanie, nasadenie ani interné fungovanie existujúceho odporúčacieho skenera.
Aktivácia oboch názvov kontrol v pravidlách vetvy je samostatnou administratívnou
zmenou; pridanie týchto úloh samo osebe vetvu nechráni.

### Inventár statických kontrol

Verzovaný inventár aliasov npm a členstvo v statických kontrolách sa nachádzajú v
`config/quality/gate-manifest.json`. Spustením `npm run check:gate-manifest` overíte
názvy skriptov a presné príkazy voči súboru `package.json`; pridania, odstránenia
a odchýlky príkazov spôsobia zlyhanie lokálneho hooku aj úloh klasifikácie zmien
v CI. Alias nie je úloha pracovného postupu, inštancia matice ani testovací prípad:
tieto počty sa nesmú prezentovať ako vzájomne zameniteľné.

Použite `npm run quality:scan -- --list` alebo `npm run quality:scan:fast -- --list`
na kontrolu vybraných aliasov bez ich vykonania. Runner vyvoláva vstupný bod npm,
takže jeho runtime (vrátane Bun tam, kde je nakonfigurovaný) zostáva zachovaný.
Manifest zaznamenáva aliasy mimo týchto profilov ako vyvolávané samostatne a
príkazy údržby sú v profiloch kontroly iba na čítanie zakázané.

Tieto profily pokrývajú iba statické kontroly. Necertifikujú testy produktu,
pokrytie, balenie, externé kontroly ani úplné prijatie kandidáta na vydanie.
Prijímanie v pracovnom postupe používa prepojené súbory
`config/quality/admission-policy.json` a `scripts/quality/admission-verdict.mjs`.
Profily pozorovateľa vydania zostávajú oddelené; ich relevantné kontroly a
potvrdenia overujte nezávisle. Textový inventár uvedený nižšie slúži ako referencia,
nie ako dôkaz, že sa brána skutočne spustila.

Skripty sa nachádzajú v `scripts/check/` (brány politík) a `scripts/quality/`
(ratchet mechanizmus). Zdrojom pravdy pre CI je `.github/workflows/ci.yml`.

### Zrýchlená cesta PR vydania (`quality.yml`)

`.github/workflows/quality.yml` dopĺňa CI pre PR do vetiev main/release, odoslania
do chránených vetiev, manuálne spustenia a skupiny zlúčenia. PR používajú rýchle
kontroly filtrované podľa ciest. Trvalo zakázaná duplicitná zostava bola odstránená;
skutočné kontroly zostavenia, balíka a spustenia zostávajú v CI.

| Úloha                                            | Rozsah                                                                                                                                                                                                                 | Blokovanie          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `Docs Gates (fast-path)`                         | PR dokumentácie/kódu; odkazy na dokumentáciu API a docs-all                                                                                                                                                            | Áno                 |
| `Fast Quality Gates`                             | PR kódu; statické kontroly, kontrola typov, kontrola typov dashboardu, ovplyvnené jednotkové testy                                                                                                                     | Áno                 |
| `Forgotten sibling tests`                        | PR kódu; zmenené moduly vysledované k statickým konzumentom a kandidátskym súrodeneckým testom; cesty cez barrel a dynamický import sa hlásia ako odporúčacie diagnostiky s odkazovanými výnimkami zo zoznamu povolení | **Odporúčacie**     |
| `Vitest (fast-path)`                             | PR kódu; rýchly balík testov vitest                                                                                                                                                                                    | Áno                 |
| `Unit Tests fast-path`                           | PR kódu; jednotkové testy rozdelené do 4 shardov                                                                                                                                                                       | Áno                 |
| `No new ESLint warnings`                         | PR kódu; kontrola lintu zohľadňujúca potlačenia                                                                                                                                                                        | Áno, vrátane forkov |
| `Merge integrity (changelog + generated skills)` | PR, ktoré nie sú konceptmi; synchronizácia changelogu a generovaných zručností                                                                                                                                         | Áno, vrátane forkov |

#### Hlásenie zabudnutých súrodeneckých testov

`npm run check:forgotten-sibling-tests` opätovne používa resolver importov, na ktorom
je založená mapa vplyvu testov. Pre každý zmenený produkčný modul hlási deterministické
reťazce `changed module/symbol -> static consumer -> candidate sibling test`, keď
kandidátsky test chýba v diff-e pull requestu. Súhrn Markdown a výsledok JSON sa
uchovávajú ako artefakt pracovného postupu `forgotten-sibling-tests` na kalibráciu
pred prípadným zavedením blokovania.

Re-exporty barrelov a dynamické importy slúžia iba na diagnostiku rozlíšenia; nikdy nevytvárajú
blokujúce zistenie. Skontrolované výnimky sa nachádzajú v
`config/quality/forgotten-sibling-allowlist.json`. Každá položka musí uvádzať konzumenta a kandidátsky
test, obsahovať konkrétne odôvodnenie a odkazovať na issue alebo pull request na GitHube. Chybne vytvorené položky spôsobia
zlyhanie. Výnimky nemôžu potlačiť odstránený kandidátsky test ani diff, ktorý pridáva `.skip`/`.todo`;
oslabovanie asercií a ďalšie maskovanie naďalej spadajú pod nezávisle blokujúcu
bránu `check:test-masking`.

### Úloha: `lint`

Spúšťa sa pri každom PR do `main`. Pri zlyhaní blokuje zlúčenie.

| Skript (`npm run ...`)            | Overuje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Blokujúce                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Verzia Node.js je v podporovanom rozsahu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Áno                                          |
| `check:cycles`                    | Cyklické importy — všetky moduly v `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Áno                                          |
| `check:route-validation:t06`      | Schémy Zod sú prítomné na všetkých trasách (pravidlá úrovne 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                          |
| `check:any-budget:t11`            | Počet `@ts-expect-error // any` neprekračuje limit (kontrolný mechanizmus úrovne 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Áno                                          |
| `check:provider-consistency`      | Každý poskytovateľ v `providers.ts` má zodpovedajúcu položku v `providerRegistry.ts` (a naopak, v rámci zoznamu povolených položiek)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Áno                                          |
| `check:model-lifecycle`           | Tri ručne udržiavané smerovacie tabuľky zostávajú konzistentné so snapshotom životného cyklu uloženým v repozitári (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nehodnotí žiadne vyradené id, ktoré dokáže `REGISTRY` smerovať; každý cieľ `BUILT_IN_ALIASES` sa nachádza v `REGISTRY` a nenachádza sa v snapshote vyradených id; každé vyradené id, ktoré je stále v `REGISTRY`, je presmerované alebo uvedené v `allowedRetiredInCatalog`; a žiadny zdroj ani cieľ `DEFAULT_DEGRADATION_MAP` sa v tomto snapshote nenachádza medzi vyradenými. Toto nedokazuje, že model momentálne poskytuje aktívna upstreamová služba. Offline — porovnáva sa s `config/quality/model-lifecycle.json`, ktorý sa ručne obnovuje pomocou `npm run quality:refresh-model-lifecycle` (vyžaduje sieť; nie je zapojené do CI). `allowedRetiredInCatalog` je postupne sprísňovaná západka: položku pridajte iba spolu so sledovacím problémom. | Áno                                          |
| `check:fetch-targets`             | Každé `fetch("/api/...")` v klientskom `src/` smeruje na skutočný `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                          |
| `check:deps`                      | Všetky závislosti inštalovateľné pomocou `npm install` vo všetkých súboroch `package.json` v repozitári sa nachádzajú v `dependency-allowlist.json`; nové závislosti bez pevne určenej verzie alebo balíky s názvami napodobňujúcimi iné balíky sú označené                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Áno                                          |
| `audit:deps`                      | `npm audit` (koreňový adresár + electron) — žiadne upozornenia s vysokou/kritickou závažnosťou (prekrýva sa s osv `check:vuln-ratchet`; pozrite si zoznam úloh na racionalizáciu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno                                          |
| `check:lockfile`                  | Integrita `package-lock.json` — register https, hashe integrity, žiadne prepísania hostiteľa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Áno                                          |
| `check:licenses`                  | Zoznam povolených licencií SPDX pre produkčné závislosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Áno                                          |
| `check:tracked-artifacts`         | Žiadne artefakty zostavenia ani potvrdené symbolické odkazy na `node_modules` (spúšťa sa aj v husky pre-commit; pre-push je zámerne nenáročný — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                          |
| `check:ai-attribution`            | Žiadna pätička `Co-Authored-By` od AI/bota ani pätička o generovaní pomocou AI v commitoch, názve alebo tele PR — pevné pravidlo č. 16 (v slučke rýchlych kontrol v `quality.yml` pre PR→`release/**` — číta údaje udalosti, mimo PR nevykonáva žiadnu operáciu — a krok iba pre PR v lintovaní v `ci.yml` pre PR→`main`; takisto hook `commit-msg` v husky; ľudskí spoluautori sú povolení; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Každé vylúčenie Vitest uvádza sledovaný problém a nachádza sa v `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Áno                                          |
| `check:file-size`                 | Žiadny zdrojový súbor neprekračuje limit pre príslušnú príponu (západka: zmrazené veľké súbory v zozname `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Áno                                          |
| `check:error-helper`              | Chybové odpovede v exekútoroch/obslužných rutinách používajú `buildErrorBody()` / `sanitizeErrorMessage()` (pevné pravidlo č. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Áno                                          |
| `check:migration-numbering`       | Migračné SQL súbory sú číslované postupne, bez medzier alebo duplicít                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Áno                                          |
| `check:public-creds`              | Žiadne explicitné OAuth `client_id`/`client_secret` ani webové kľúče Firebase mimo `publicCreds.ts` (Pevné pravidlo č. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Áno                                          |
| `check:db-rules`                  | Žiadne nespracované SQL mimo modulov `src/lib/db/`; žiadne hromadné importy z `localDb.ts` (Pevné pravidlá č. 2/č. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Áno                                          |
| `check:known-symbols`             | Vykonávacie moduly poskytovateľov, stratégie smerovania a prekladače zaregistrované vo svojich dispečerských tabuľkách zodpovedajú súborom na disku — žiadne osirotené ani nedeklarované symboly                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Áno                                          |
| `check:route-guard-membership`    | Každá trasa, ktorá vytvára podradený proces, je klasifikovaná pomocou `isLocalOnlyPath()` (Pevné pravidlá č. 15/č. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                          |
| `check:test-discovery`            | Každý súbor `*.test.ts` / `*.spec.ts` v repozitári je zahrnutý aspoň jedným nástrojom na spúšťanie testov (západka: zoznam osirotených súborov v `test-discovery-baseline.json` sa môže iba zmenšovať)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Áno                                          |
| `check:agent-skills-sync`         | Vygenerované artefakty agent-skills sa zhodujú so zdrojovým katalógom (bez odchýlok)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:provider-asset-provenance` | Logá a aktíva poskytovateľov majú zaznamenaný pôvod                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | Konfiguračné súbory JSON je možné analyzovať a spĺňajú pravidlá lintovania repozitára                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | Kompilácia TypeScriptu bez chýb (iba informatívne upozornenia)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Áno                                          |
| `typecheck:noimplicit:core`       | Striktné `noImplicitAny` — zamerané do budúcnosti; mnohé existujúce miesta volania stále potrebujú anotácie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | **Informatívne** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` obmedzené na `src/app/(dashboard)/**` (#7033) — starostlivo vybraný zoznam 27 súborov v `typecheck:core` neobsahuje žiadny dashboardový súbor TSX a ani `next build` ich nikdy typovo nekontroluje (`next.config.mjs` nastavuje `ignoreBuildErrors: true`), takže regresie osirelých identifikátorov v tejto oblasti (#6625/#6909) boli pre CI neviditeľné. Rozdiely sa porovnávajú so zmrazenou východiskovou hodnotou počtu chýb podľa jednotlivých súborov a kódov TS (`config/quality/dashboard-typecheck-baseline.json`, rovnaký vzor vynucovania neaktuálnosti ako pri `check:known-symbols`) — kontrola zlyhá iba pri NOVÝCH chybách nad rámec východiskového počtu; keď sa opraví existujúca chyba, znížte východiskovú hodnotu pomocou `--update`.                                                                                                                                                            | Áno                                          |

### Úloha: `quality-gate`

Spúšťa sa po `test-coverage`. Pri zlyhaní zablokuje zlúčenie.

| Skript                       | Overuje                                                                                                                                                                                             | Blokujúce                           |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `quality:collect`            | Vytvorí `quality-metrics.json` (počet upozornení ESLint, pokrytie zo zlúčenej správy segmentov)                                                                                                     | Áno (predchádza mechanizmu ratchet) |
| `quality:ratchet`            | Žiadna metrika v `quality-baseline.json` sa nezhoršila (upozornenia ESLint ≤ základná hodnota; pokrytie ≥ základná hodnota)                                                                         | Áno                                 |
| `check:duplication`          | Duplikácia kódu (jscpd@4) neprekračuje základnú hodnotu v `quality-baseline.json`                                                                                                                   | Áno                                 |
| `check:complexity`           | Cyklomatická zložitosť na úrovni súboru neprekračuje limit (základné pravidlá ESLint `complexity` + `max-lines-per-function`)                                                                       | Áno                                 |
| `check:cognitive-complexity` | Ratchet kognitívnej zložitosti (`eslint-plugin-sonarjs`) — samostatný priechod ESLint; CI spúšťa oba zlúčené do jediného kroku `check:complexity-ratchets`                                          | Áno                                 |
| `check:dead-code`            | Ratchet nepoužitých exportov/súborov (knip) sa v porovnaní so základnou hodnotou nezhoršil                                                                                                          | Áno                                 |
| `check:compression-budget`   | Rozpočet benchmarku kompresie — minimálne úspory tokenov pre jednotlivé enginy sa nesmú zhoršiť                                                                                                     | Áno                                 |
| `check:type-coverage`        | Ratchet percentuálneho podielu typovaného kódu (`type-coverage`) sa nezhoršil; do značnej miery nahrádza `typecheck:noimplicit:core`                                                                | Áno                                 |
| `check:codeql-ratchet`       | Počet otvorených upozornení CodeQL sa nezhoršil (načítava sa cez `gh api`; bez tokenu sa kontrola korektne preskočí) — frekvencia obnovovania a manuálne spustenie: pozrite nižšie „CodeQL ratchet“ | Áno                                 |

### Úloha: `quality-extended`

Celá úloha má poradný charakter (`continue-on-error: true`). Ratchety založené na npm sa
spúšťajú reálne; externé skenery sa inštalujú pomocou `gh release download` a samy sa
preskočia (exit 0), keď binárny súbor stále chýba.

| Skript                   | Overuje                                                                                                                                                                                                                                       | Blokujúce                                              |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `check:circular-deps`    | Žiadne cyklické závislosti (dpdm)                                                                                                                                                                                                             | **Poradné**                                            |
| `check:bundle-size`      | Veľkosť balíka neprekračuje limit                                                                                                                                                                                                             | **Poradné**                                            |
| `check:secrets`          | Skenovanie tajných údajov (gitleaks) — preskočí sa, ak binárny súbor chýba                                                                                                                                                                    | **Poradné**                                            |
| `check:vuln-ratchet`     | Zraniteľnosti závislostí (osv-scanner) sa nezhoršili — preskočí sa, ak binárny súbor chýba                                                                                                                                                    | **Poradné**                                            |
| `check:workflows`        | Kontrola workflowov (actionlint + zizmor); chýbajúce/nefunkčné skenery, neplatné správy alebo chýbajúca základná hodnota ratchetu spôsobia zlyhanie so stavom INCOMPLETE. Platné nálezy sa riadia vybranou prísnou/poradnou/ratchet politikou | Vykonanie je povinné; ratchet zizmor je v CI blokujúci |
| `check:openapi-breaking` | Nekompatibilné zmeny verejného kontraktu API (`openapi.yaml`) oproti základnej vetve (oasdiff) — vytvorí `openapiBreaking=N`; preskočí sa, ak oasdiff chýba alebo základnú špecifikáciu nemožno načítať                                       | **Poradné**                                            |

### Úloha: `docs-sync-strict`

Spúšťa sa pri každom PR do `main`. Pri zlyhaní blokuje zlúčenie.

| Skript                         | Overuje                                                                                                                                                                                  | Blokujúce                 |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `check:docs-all`               | Metakontrola, ktorá postupne spúšťa 6 čiastkových kontrol uvedených nižšie                                                                                                               | Áno                       |
| ↳ `check:docs-sync`            | Konzistentnosť verzií v CHANGELOG-u / OpenAPI / llm.txt                                                                                                                                  | Áno                       |
| ↳ `check:docs-counts`          | Počty v texte (počet poskytovateľov, počet migrácií atď.) sú v rámci sprísňujúceho sa tolerančného rozsahu skutočných počtov                                                             | Áno                       |
| ↳ `check:env-doc-sync`         | Každá premenná prostredia v `.env.example` je zdokumentovaná v tabuľke dokumentácie a naopak                                                                                             | Áno                       |
| ↳ `check:deprecated-versions`  | V dokumentácii sa nenachádzajú žiadne reťazce zastaraných verzií                                                                                                                         | Áno                       |
| ↳ `check:doc-links`            | Interné markdownové odkazy v dokumentácii odkazujú na existujúce súbory (formát `[text]`/`(path)`)                                                                                       | Áno                       |
| ↳ `check:fabricated-docs`      | Trasy, premenné prostredia, príkazy CLI, názvy hookov a cesty k súborom uvedené v dokumentácii existujú v kódovej základni. Tvrdá kontrola cez `--strict`; bez príznaku iba upozornenie. | Áno (cez `--strict` v CI) |
| `check:cli-i18n`               | Reťazce príkazov CLI sa nachádzajú vo všetkých lokalizačných súboroch i18n                                                                                                               | Áno                       |
| `check:openapi-coverage`       | Špecifikácia OpenAPI pokrýva aspoň postupne zvyšované minimum skutočných trás                                                                                                            | Áno                       |
| `check:openapi-security-tiers` | Anotácie úrovní zabezpečenia v `openapi.yaml` sú konzistentné s klasifikáciami v `routeGuard.ts`                                                                                         | **Odporúčacie**           |
| `check:openapi-routes`         | Každá cesta v `openapi.yaml` odkazuje na skutočný súbor `route.ts` (ochrana proti halucináciám)                                                                                          | Áno                       |
| `check:docs-symbols`           | Každý odkaz `/api/...` v `docs/**/*.md` odkazuje na skutočný súbor `route.ts` (ochrana proti halucináciám)                                                                               | Áno                       |
| `i18n translation drift`       | Nepreložené kľúče v lokalizačných súboroch i18n — iba upozornenie                                                                                                                        | **Odporúčacie**           |

### Úloha: `i18n-ui-coverage`

| Skript                             | Overuje                                                                                                                                                                                                           | Blokujúce       |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (vložený) | Pokrytie kľúčov i18n používateľského rozhrania je ≥ 65 %                                                                                                                                                          | Áno             |
| `check-ui-value-drift` (vložený)   | Prepísaná anglická **hodnota** po sebe nezanechá žiadny zastaraný preklad                                                                                                                                         | Áno             |
| `check-new-key-coverage` (vložený) | **Nový** anglický kľúč je preložený v každej lokalizácii — značka `__MISSING__:` je odmietnutá                                                                                                                    | Áno             |
| `check-translation-ratio`          | Pomer skutočných prekladov podľa lokalizácie (položky zhodné s angličtinou / zástupné / chýbajúce mimo zoznamu povolených výnimiek) nesmie prekročiť `config/quality/i18n-translation-baseline.json` + toleranciu | **Odporúčacie** |

Vyžaduje `fetch-depth: 0` — kontrola odchýlok hodnôt porovnáva `en.json` voči spoločnému predkovi vetiev.

#### `check-ui-value-drift` — kontrola zastaraných prekladov

Zachytáva jedinú regresiu i18n, ktorú ostatné kontroly zo svojej podstaty nedokážu odhaliť: anglická hodnota
sa prepíše, ale preklady odvodené od _predchádzajúcej_ anglickej verzie zostanú nezmenené, takže
používatelia iných jazykov naďalej čítajú sebavedomo formulovaný, no už nesprávny text.

Tento problém sa skutočne dostal do vydanej verzie. `oauthModal.googleOAuthWarning` bol prepísaný pri pridaní
pomocníka na prihlásenie Antigravity (#5203); **39 zo 43 lokalizácií** si ponechalo text, ktorý operátorom
prikazoval „skopírovať celú URL adresu a vložiť ju nižšie“ — postup, ktorý pri tomto poskytovateľovi nemožno
dokončiť. Problém zostal nepovšimnutý až do #8463, pretože:

- `sync-ui-keys` dopĺňa iba kľúče, ktoré **chýbajú**, nikdy nie tie, ktoré sú **zastarané**;
- `check-ui-keys-coverage` počíta _prítomnosť_ kľúčov, takže zastaraný preklad sa započíta ako pokrytý;
- `check-translation-drift` sleduje zrkadlá dokumentácie `docs/i18n/<locale>/**.md` —
  nikdy nečíta `src/i18n/messages/*.json`. Blokujúce v úlohe `docs-sync-strict` od opätovnej synchronizácie
  2026-09: upravte hlavný dokument → `npm run i18n:run -- --files=<doc>` (na úrovni sekcie, nenáročné).

**Zohľadňuje rozdiely, nie je založená na východiskovom stave.** Porovnáva `en.json` v spoločnom predkovi s
pracovným stromom; pre každý kľúč, ktorého anglická hodnota sa zmenila, je každý jazyk, ktorý stále obsahuje
nezmenený preklad, zastaraný. Týmto sa zámerne **zmrazí už existujúci dlh** — z rozdielu
nemožno zistiť, z ktorej starej anglickej verzie dlhodobý preklad pochádza, takže kontrola posudzuje
iba to, čoho sa aktuálna zmena týka. Alternatíva (východiskový hash pre každý kľúč) by si vyžadovala
~600 KB generovaný súbor, 3× väčší než najväčší existujúci východiskový súbor, ktorý by sa menil pri každom i18n PR.

Kontrolu možno splniť dvoma spôsobmi:

1. aktualizovať dotknuté preklady alebo
2. nastaviť ich na `__MISSING__:<new english>` — za behu sa potom zobrazí opravená angličtina
   (`src/i18n/request.ts::deepMergeFallback`, #7258) a kľúč sa zaradí do frontu na preklad.

Ak sa zmenil **význam** reťazca, uprednostnite **premenovanie kľúča**: nový kľúč nemôže zdediť
zastaraný preklad. Tento postup bol použitý v #8463.

```bash
npm run i18n:check-value-drift          # striktné (spúšťa sa v CI)
npm run i18n:check-value-drift:warn     # iba hlásenie
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Skončí s kódom 0 a hlásením `SKIP reason=base-unresolved`, keď sa východiskový katalóg nedá načítať (plytký
klon bez východiskovej referencie), rovnako ako `check-openapi-breaking`.

### Úloha: `i18n`

Úplná matica validácie i18n (jedna úloha pre každý jazyk). Celá úloha je informačná.

| Skript                          | Overuje                          | Blokovanie                                                |
| ------------------------------- | -------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Úplnosť prekladu pre každý jazyk | **Informačné** (`continue-on-error: true` pre celú úlohu) |

### Úloha: `pr-test-policy`

Spúšťa sa iba pri pull requestoch.

| Skript                 | Overuje                                                                                                                                        | Blokovanie |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR, ktoré menia produkčný kód v `src/`, `open-sse/`, `electron/` alebo `bin/`, musia obsahovať alebo aktualizovať testy (Prísne pravidlo č. 8) | Áno        |
| `check:test-masking`   | Zmenené testovacie súbory neznižujú celkový počet asertov ani nepridávajú tautológie `assert.ok(true)`                                         | Áno        |
| `check:pr-evidence`    | Telo PR uvádza dôkazy z testov/VPS pre danú zmenu (automatizuje Prísne pravidlo č. 18 prehľadávaním textu PR — krehké, pozri Backlog)          | Áno        |

### Úloha: `test-vitest`

Spúšťa sa po `build`. Pri zlyhaní blokuje zlúčenie.

| Sada             | Overuje                                                       | Blokovanie                                                                                                                |
| ---------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 nástrojov), autoCombo, cache — spúšťač vitest | Áno                                                                                                                       |
| `test:vitest:ui` | Testy komponentov používateľského rozhrania — spúšťač vitest  | **Blokujúce** — už existujúce zlyhania sú explicitne vylúčené v `vitest.config.ts`; nové zlyhania spôsobia zlyhanie úlohy |

### Nočné pracovné postupy (plánované, informačné)

Spúšťajú sa podľa plánu cron (a pomocou `workflow_dispatch`), nikdy nie pri PR. Všetky sú informačné.

| Pracovný postup        | Overuje                                                                                                                                                                        | Blokovanie     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `nightly-property`     | Testy vlastností fast-check s náhodným počiatočným číslom + vysokým počtom behov                                                                                               | **Informačné** |
| `nightly-resilience`   | Kontrola rastu haldy, vkladanie chaotických porúch, záťažové/dlhotrvajúce testovanie k6                                                                                        | **Informačné** |
| `nightly-llm-security` | Ochrana promptfoo proti injekciám (režim blokovania) + sondy garak (preskočené bez tajného kľúča poskytovateľa)                                                                | **Informačné** |
| `nightly-schemathesis` | Fuzzovanie kontraktu OpenAPI (schemathesis) proti spustenej službe OmniRoute pomocou `docs/openapi.yaml` — odhaľuje porušenia špecifikácie / neošetrené chyby 500 (Fáza 8 B.4) | **Informačné** |
| `nightly-mutation`     | Skóre mutačného testovania Stryker v rýchlej vetve jednotkových testov — prežívajúce mutanty odhaľujú slabé aserty                                                             | **Informačné** |
| `nightly-compat`       | Matica kompatibility enginu Node naprieč podporovanými rozsahmi `engines.node`                                                                                                 | **Informačné** |

---

## Fáza velocity (2026-08-30 → v4.0 LTS): každá základná hodnota uvoľnená o 20 %

Rozhodnutie vlastníka (2026-08-30): až do modularizácie vo v4.0 je rýchlosť vydávania dôležitejšia
než udržiavanie technického dlhu na uzde. Každá **číselná** základná hodnota ratchetu bola v jednom
auditovateľnom kroku uvoľnená o 20 % a fáza je deklarovaná v `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Čo sa zmenilo                                                                                                                                                                                                                             | Kde                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — počty, pri ktorých je nižšia hodnota lepšia, ×1,2; percentá, pri ktorých je vyššia hodnota lepšia, ÷1,2 (minimum pokrytia zostáva 60, `eslintErrors` zostáva 0, `eslintWarnings` 0 → 20 % zmrazeného počtu potlačení) | `quality-baseline.json` (poznámka `_relax_velocity_2026_08_30` uvádza každú hodnotu pred → po)         |
| `count` ×1,2 / `percentage` ×1,2                                                                                                                                                                                                          | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, limit riadkov každej položky `frozen[*]` / `testFrozen[*]` ×1,2                                                                                                                                                         | `file-size-baseline.json`                                                                              |
| počty pre jednotlivé súbory / kód TS ×1,2                                                                                                                                                                                                 | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                       | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` má iba informatívny charakter, keď `_policy.requireTighten === false`                                                                                                                                                 | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| nočné `bank-ratchet-shrinks` je pozastavené (zaznamenalo by namerané zníženie a zrušilo rezervu)                                                                                                                                          | `.github/workflows/nightly-release-green.yml`                                                          |

Zoznamy povolených výnimiek (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nie sú** rozpočty a neboli zmenené. Politické brány typu úspech/neúspech (tajné údaje, pravidlá SQL,
kontrakt dokumentácie/premenných prostredia, zhoda i18n, jednotkové testy) zostávajú nezmenené — neúspešný test je stále neúspešný test.

**Nástroje**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednorazové
  uvoľnenie (`scripts/quality/relax-baselines.mjs`); odmietne sa spustiť dvakrát s rovnakou
  poznámkou.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  meria každú číselnú bránu rovnakým spôsobom ako CI a vypíše zostávajúcu rezervu pre každú bránu
  (`scripts/quality/baseline-headroom.mjs`). Nočná úloha `baseline-headroom` pridáva tabuľku
  do priebežne aktualizovaného problému **📈 Rezerva základných hodnôt (fáza velocity)** a pridá
  označenie `headroom-alert`, keď je ktorákoľvek brána do 10 % od svojho limitu alebo ho už prekročila. Tento problém
  slúži ako včasné varovanie: rozpočet, ktorý sa vyčerpá za niekoľko dní, znamená, že uvoľnenie spotrebovalo
  niekoľko PR, nie celý tím — pozrite si poznámky `_rebaseline_*` príslušnej brány.

**Režim nového kódu (Clean-as-You-Code) — od 2026-08-30, iba zrýchlená cesta pre PR**

Pri udalostiach `pull_request` odovzdáva `quality.yml` parameter `--base-ref <PR base SHA>` príkazom `check:file-size`,
`check:complexity-ratchets` a `check:dead-code`. V tomto režime brána porovnáva HEAD so
spoločným predkom **iba pre súbory zmenené daným PR** (`scripts/check/newCodeMode.mjs`:
spoločný predok sa zhmotní v dočasnom `git worktree`, ESLint/knip sa spustia v ňom aj nad HEAD a potom sa
porovnajú počty pre jednotlivé súbory):

- **blokujúce** — PR pridalo porušenia cyklomatickej/kognitívnej zložitosti alebo nepoužité exporty v súboroch, ktoré zmenilo
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` v protokole);
- **informatívne** — globálny súčet oproti zmrazenej základnej hodnote. Zdedený posun nikdy nespôsobí zlyhanie
  nevinného PR; posun sa pri zosúladení vydania znova zmrazí a sleduje ho úloha na monitorovanie rezervy.

Spustenia `workflow_dispatch`, kontrola release-green a nočná úloha na monitorovanie rezervy nemajú základ PR
a naďalej používajú absolútne (globálne) porovnanie. Pokrytie, duplicita a pokrytie typmi zatiaľ zostávajú globálne
(ich nástroje nedokážu lacno vytvoriť rozdiel pre jednotlivé súbory) — sú kandidátmi na rovnaké spracovanie.

**Ukončenie fázy vo v4.0 (LTS = prísnejšie než predtým, nie „späť do normálu“)**

1. Na čistom vrchole vetvy `release/v4.0.0`: pre záznam spustite `npm run quality:headroom --json`, potom
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` a
   `--update` pre každú bránu kontroly typov — každá východisková hodnota klesne na nameranú hodnotu.
2. Odstráňte `_policy` zo súboru `quality-baseline.json` (znova aktivuje `--require-tighten` a nočné
   ukladanie rezervy), obnovte `THRESHOLD = 36` (alebo vyššiu hodnotu) v súbore `check-openapi-coverage.mjs`.
3. Sprísnite limity nad rámec nameraných hodnôt tam, kde sa modularizácia vyplatila: `cap` veľkosti súboru späť na 1000
   (alebo 800), minimálne pokrytie +5, počet nepoužívaných exportov 0 pre modularizované balíky.

## Základná línia ratchetu (`quality-baseline.json`)

Mechanizmus ratchetu (`scripts/quality/check-quality-ratchet.mjs`) načíta súbor `quality-baseline.json`
a porovná ho s čerstvo zozbieraným súborom `quality-metrics.json`. Každá metrika, ktorá sa zhorší
nad rámec svojej hodnoty epsilon, spôsobí zlyhanie zostavenia.

Aktuálne sledované metriky:

| Metrika               | Smer   | Význam                                |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Počet upozornení ESLint nesmie narásť |
| `coverage.statements` | `up`   | Pokrytie príkazov nesmie klesnúť      |
| `coverage.lines`      | `up`   | Pokrytie riadkov nesmie klesnúť       |
| `coverage.functions`  | `up`   | Pokrytie funkcií nesmie klesnúť       |
| `coverage.branches`   | `up`   | Pokrytie vetiev nesmie klesnúť        |

Ak chcete po skutočnom zlepšení aktualizovať základnú líniu:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Príznak `--update` zapíše aktuálne namerané hodnoty do súboru `quality-baseline.json`.
Tento súbor potvrďte spolu so zmenou, ktorá metriku zlepšila. PR, ktorý zlepší
metriku bez aktualizácie základnej línie, zachytí `--require-tighten` (Fáza 6A.5,
implementácia sa pripravuje).

### Ratchet CodeQL: frekvencia obnovenia a manuálne spustenie

`check:codeql-ratchet` načítava **stav repozitára, obnovovaný podľa plánu — nie pri každom PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` hlási
`state: configured`, `schedule: weekly`: ide o kontrolu prostredníctvom predvoleného nastavenia GitHubu, nie o analýzu
pri každom odoslaní zmien. Dôsledok: po zlúčení PR, ktorý OPRAVUJE upozornenia, ratchet naďalej načítava
starý, vyšší počet až do spustenia ďalšej naplánovanej kontroly — preto hlási regresiu
pri každom otvorenom PR vrátane nadväzujúcich PR k opravnému PR, až kým sa kontrola neaktualizuje.

**Manuálne obnovenie**: `gh workflow run codeql.yml --ref release/vX.Y.Z` znova spustí
analýzu a v priebehu niekoľkých minút opätovne zverejní upozornenia. Najprv si prečítajte `.github/workflows/codeql.yml`
— jeho hlavička vysvetľuje, že je určený **iba pre `workflow_dispatch`**, **pretože je v konflikte s
„predvoleným nastavením“ GitHubu** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Obnovenie spúšťačov `push`/`pull_request`/
`schedule` najskôr vyžaduje **zásah vlastníka**: Nastavenia → Zabezpečenie kódu →
CodeQL: Predvolené → Rozšírené. Bez tohto prepnutia nepridávajte spúšťač `schedule:` — spôsobí
iba neúspešné spustenia.

**Po poklese počtu sprísnite základnú líniu** — `node scripts/check/check-codeql-ratchet.mjs
--update` zapíše nový nameraný počet do `quality-baseline.json` →
`metrics.codeqlAlerts.value`, takže ratchet nebude potichu povoľovať regresiu späť
k pôvodnému limitu. Praktický príklad (2026-09-02/03): PR #12502 opravil 7 skutočných upozornení
(13 → 6 nameraných otvorených); PR #12530 sprísnil zmrazenú základnú líniu z 11 → 6, aby sa zhodovala; zostávajúcich
6 upozornení bolo následne zamietnutých s individuálnym odôvodnením pre každé upozornenie, čím sa počet otvorených upozornení znížil na 0.

**O zamietnutiach rozhoduje operátor (Prísne pravidlo č. 14)** — nikdy nezamietajte upozornenie CodeQL
bez zaznamenania technického odôvodnenia v komentári k zamietnutiu: `won't fix` pre
požiadavku nadradeného protokolu, `used in tests` pre testovaciu pomôcku, `false positive`
pre sanitizér, ktorý CodeQL nedokáže rozpoznať (precedens: `docs/security/ERROR_SANITIZATION.md`).

---

## Zásady opakovania testov (WS5.4, v3.8.49)

Opakovanie sa nastavuje pre každý runner samostatne, nikdy nie globálne — plošné opakovanie mení skutočné regresie
na neviditeľné nestability:

| Runner           | Zásady                                                                                                                                             | Dôvod                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` iba v CI, s `trace: on-first-retry`                                                                                                   | Časovanie prehliadača/siete je skutočne nedeterministické; jedno opakovanie so záznamom zmení nestabilitu na diagnostikovateľný artefakt |
| Vitest           | ŽIADNE globálne opakovanie. Preukázateľne nestabilný test dostane explicitné opakovanie pre konkrétny test (viditeľné v diffe, skontrolované v PR) | Udržiava zoznam testov v karanténe v repozitári, nikdy nie skrytý                                                                        |
| node:test (unit) | ŽIADNE opakovanie, nikdy                                                                                                                           | Nestabilný jednotkový test je chyba v teste — opravte ho, nespúšťajte ho jednoducho znova                                                |

Cieľové SLO po zavedení telemetrie nestabilít (WS5.2/5.3): <1 % miera nestability na test
(prah „opraviť teraz“), ≥95 % úspešnosť na pipeline. Referenčné hodnoty z odvetvia —
prekalibrujte ich podľa našich vlastných meraní.

## Odchýlka západiek na úrovni vydania (WS5.5, v3.8.49)

Keď sa západka (veľkosť súboru, zložitosť, upozornenia eslint) zhorší na ČISTOM vrchole
vydania — t. j. zhoršila ju KOMBINÁCIA zlúčení a žiadny jednotlivý PR nereprodukuje
regresiu vo svojej vlastnej vetve — oprava patrí **kapitánovi vydania, jednorazovo, vo
vetve vydania**: uprednostnite extrakciu/refaktoring; základnú hodnotu aktualizujte iba so zdokumentovaným
odôvodnením. Nikdy neprenášajte kombinovanú odchýlku na PR prispievateľa a nikdy
neaktualizujte základnú hodnotu pre každý PR samostatne (to skrýva skutočné regresie). Najprv rozlíšte príčinu: reprodukujte
neúspešný stav na čistom vrchole v skúšobnom worktree skôr, než predpokladáte, že ho spôsobil váš PR.

## Ukladanie sprísnení západiek — smerom nadol (#8584)

Západka je automatická iba napoly, a práve v nesprávnej polovici. **Zvýšenie** limitu je
manuálna úprava JSON, ktorá trvá desať sekúnd a predstavuje najrýchlejší spôsob, ako odblokovať neúspešný PR.
**Zníženie** limitu vyžaduje, aby niekto spustil `--update` a commitol výsledok — a kým
nebola nasadená úloha `bank-ratchet-shrinks`, žiadny workflow ju nespúšťal. Nameraný dôsledok
(2026-07-25): 18 zmrazených súborov už malo najviac 800 riadkov, teda limit pre nové súbory, pričom najhorší
prípad dosahoval 132× (`src/shared/validation/schemas.ts`, 19 riadkov s limitom 2 523); strop
zložitosti sa posunul z `1794 → 2169` počas približne 37 poznámok o aktualizácii základnej hodnoty s presne jedným
znížením (−1); a fráza „sprísniť pomocou `--update` v ďalšom cykle“ bola napísaná 31-krát a dodržaná
raz. Limit, ktorý pretrvá dlhšie než kód, pre ktorý vznikol, potichu mení každý dokončený
rozklad na povolenie rastu pre kohokoľvek, kto súbor upraví nabudúce.

`nightly-release-green.yml` → úloha **`bank-ratchet-shrinks`** uzatvára túto slučku:

|               |                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Spúšťa sa pri | `schedule` (3× denne) + `workflow_dispatch` — zámerne **nie** pri `push`                                                  |
| Meria         | najvyššiu vetvu `release/vX.Y.Z`, s rovnakým rozlíšením a ochranou pred injektovaním ako `release-green`                  |
| Zapisuje      | `check:file-size --update` a `check:complexity-ratchets --update` (obe sú svojou konštrukciou určené iba na sprísňovanie) |
| Overuje       | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                  |
| Dodáva        | jeden vždy aktuálny PR proti vetve vydania — vynútene aktualizovaný, nikdy nevytvára spam                                 |

Ukladanie sa vykonáva dávkovo namiesto každého pushu, pretože nemá požiadavku na latenciu (sprísnenie
uložené do 8 hodín je v poriadku), zatiaľ čo spustenie po každom zlúčení by počas kampaní
zlučovania opakovane zostavovalo vetvu PR a zakaždým by platilo náklady na úplný prechod ESLint. Detekcia zostáva naviazaná na
push (`release-green`); iba ukladanie prebieha dávkovo.

### Bezpečnostný overovač

Úloha zapisuje do základných hodnôt bez dozoru, takže prijateľnosť tohto postupu zabezpečuje
`verify-ratchet-bank.mjs`. Porovná strom po vykonaní `--update` so stavom `HEAD` a **preruší úlohu
pred vytvorením akéhokoľvek commitu** — bez otvorenia PR — pokiaľ každá zmena nie je jednou z nasledujúcich:

- číselná položka `frozen` / `testFrozen` bola **znížená** alebo **odstránená**
- `complexity-baseline.json` → `count` bolo **znížené**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` bolo **znížené**

Čokoľvek iné zlyhá: zvýšenie čísla, pridanie položky, zmena `cap`/`testCap` alebo
odstránenie/prepísanie poznámky `_rebaseline_*` (tieto poznámky predstavujú auditnú stopu dôvodu existencie
každého stropu a sú uložené v rovnakom objekte `frozen` ako položky súborov).
Bot, ktorý by mohol zvýšiť limit, by bol jednoznačne horší než súčasný stav. Ochrana pred regresiou:
`tests/unit/verify-ratchet-bank.test.ts`.

Úloha nikdy nevykonáva push do `release/*` — PR zlučuje človek, takže nesprávne meranie
sa nemôže dostať do vetvy bez kontroly.

## Zásady zoznamu povolených položiek

Každá brána, ktorá nemôže zlyhať pri už existujúcich porušeniach, používa nemenný zoznam povolených položiek
(napr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Platí táto zásada:

**Odstráňte základnú príčinu; zoznam povolených položiek použite iba vtedy, keď porušenie už existovalo a
nemožno ho opraviť v rámci rovnakého PR.**

Pri pridávaní položky do zoznamu povolených položiek:

1. Pridajte komentár s odôvodnením.
2. Uveďte odkaz na sledovaný problém (napr. `// #3498 — Funkcia fázy 2, zatiaľ neimplementovaná`).
3. Odstráňte položku v tom istom PR, ktoré opravuje porušenie — zastaraná položka, ktorá už
   nepotláča aktívne porušenie, je sama osebe chybou (kontrola zastaraného vynucovania 6A.3
   po implementácii spôsobí zlyhanie brány pri osamotenej položke zoznamu povolených položiek).

**Nepridávajte** položky do zoznamu povolených položiek, aby testy prešli rýchlejšie. Zelená brána s rastúcim
zoznamom povolených položiek vytvára falošný pocit kvality.

### Keď brána vo vašom PR zlyhá

1. **Pozorne si prečítajte výstup brány** — presne uvádza, ktorý súbor alebo symbol
   porušil pravidlo.
2. **Opravte porušenie** — väčšina brán vykonáva deterministické kontroly súborového systému, ktoré prejdú hneď,
   ako je kód správny.
3. **Ak porušenie už existovalo** (t. j. nezaviedli ste ho vy, ale brána ho teraz
   pokrýva): pridajte položku do zoznamu povolených položiek spolu s komentárom obsahujúcim odôvodnenie a odkazom na sledovaný problém.
4. **Ak je brána západková** (pokrytie, upozornenia ESLint, duplicita, zložitosť):
   vaša zmena metriku zhoršila. Opravte základný problém alebo (výnimočne) spustite
   `npm run quality:ratchet -- --update`, ak je zmena zámerná a zhoršenie metriky
   prijateľné — v popise PR však zdokumentujte dôvod.
5. **Poradné brány** (`continue-on-error: true`) sú informačné — neblokujú
   zlúčenie, ale zobrazujú sa v súhrne CI. Napriek tomu ich opravte.

---

## Pridanie novej brány

1. Vytvorte `scripts/check/check-<name>.mjs` (alebo `.ts`). Brány zásad sa ukončujú s kódom 0/1.
   Brány západkového typu zapisujú metriku do `quality-metrics.json` prostredníctvom `collect-metrics.mjs`.
2. Pridajte `"check:<name>": "node scripts/check/check-<name>.mjs"` do `package.json`.
3. Zapojte ju v `.github/workflows/ci.yml` do príslušnej úlohy
   (zásada → `lint` alebo `docs-sync-strict`; západka → `quality-gate`).
4. Ak používa zoznam povolených položiek, aplikujte `reportStaleEntries()` zo súboru
   `scripts/check/lib/allowlist.mjs`, aby sa zastarané položky zisťovali automaticky.
5. Napíšte test v `tests/unit/build/`, ktorý pokrýva detekčnú logiku brány.
6. Aktualizujte tento dokument (pridajte riadok do tabuľky príslušnej úlohy).

---

## Nástroje pre agentov: LSP-in-the-loop (voliteľné)

Okrem brán CI obsahuje OmniRoute aj **voliteľnú** kostru `agent-lsp`
(projektový súbor `.mcp.json`, fáza 7, úloha 15). Vytvorte `.mcp.json`,
aby ste sprístupnili jazykový server TypeScript programovacím agentom, vďaka čomu budú riešiť symboly /
diagnostiku **pred** písaním kódu — ide o doplnok ku `typecheck:core` založený na princípe kompilácie pred tvrdením,
ktorý odstraňuje chyby „vymyslených symbolov“ už pri zdroji. Zámerne sa
nenačítava automaticky (most MCP↔LSP si vyberáte a overujete sami); nefunkčná položka iba zaznamená
chybu pripojenia a nikdy nepreruší relácie.

---

## Zoznam racionalizácie (preskúmanie ROI — Fáza 9 Vlna 3)

Tento inventár bol 2026-06-17 zosúladený s `ci.yml` (predchádzajúca verzia vynechala
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Preskúmanie ROI zosúladenej množiny
identifikovalo nasledujúcich kandidátov na racionalizáciu. **Zlúčenia sú mechanické zmeny
CI; prepnutia/odstránenia sú politické rozhodnutia vyhradené pre operátora.** Nič z nižšie
uvedeného zatiaľ nebolo aplikované.

**Vyššie takisto nezdokumentované** (informatívne, nízka výpovedná hodnota): úloha `docs-lint`
(markdownlint + Vale, celá úloha s `continue-on-error`) a samostatné pracovné postupy skenerov
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Hodnota `semgrepFindings: 0` sa nachádza v
`quality-baseline.json`, ale nie je prepojená s blokujúcou západkou v `ci.yml` — metrika je
momentálne osirelá.

### Zlúčenie / deduplikácia (mechanické, nižšie riziko)

Každý kandidát bol 2026-06-17 overený voči aktuálnemu stavu kontrolných brán (dôveruj, ale preveruj);
ukázalo sa, že viacero „zrejmých“ zlúčení skrýva technický dlh a **nie sú** priamočiarymi náhradami.

- **`check:docs-sync` sa spúšťa dvakrát** — samostatne v úlohe `lint` a znova v rámci `check:docs-all` (`docs-sync-strict`) aj v pre-commit hooku husky. ✅ **HOTOVO** — samostatné spustenie v úlohe `lint` bolo odstránené.
- **Skenovanie CVE** — ❌ **NIE JE to čisté zlúčenie.** `audit:deps` bezpodmienečne zlyhá pri akejkoľvek CVE s vysokou/kritickou závažnosťou; `check:vuln-ratchet` (osv) zlyhá iba pri _regresii_ oproti východiskovému stavu (aktuálne 1 MODERATE). Odlišná sémantika — odstránením `audit:deps` by sa stratila absolútna kontrolná brána pre vysokú/kritickú závažnosť. Ponechať obe.
- **Detekcia cyklov** — ❌ **NIE JE to čisté zlúčenie.** `check:circular-deps` (dpdm) hlási **91 cyklov** (preto má informatívny charakter); nemožno ho zmeniť na blokujúci bez ich predchádzajúceho vyriešenia a má širší rozsah než úspešná, cielene zostavená kontrola `check:cycles`. Ponechať `check:cycles` ako blokujúcu; vyriešenie 91 cyklov dpdm je samostatnou položkou zoznamu úloh.
- **Zložitosť** — ✅ **HOTOVO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jeden prechod ESLint, počítanie podľa ruleId, takže východiskové hodnoty cyklomatickej zložitosti + maximálneho počtu riadkov a kognitívnej zložitosti zostávajú nezávislé; samostatné `check:complexity` / `check:cognitive-complexity` zostávajú zachované na lokálne použitie s `--update`.
- **Ochrana `/api` proti halucináciám** — ✅ **HOTOVO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden inventár FS pre `src/app/api`, openapi-routes + docs-symbols naďalej hlásia výsledky nezávisle; samostatné kontroly zostávajú zachované na lokálne spustenia.
- **`check:node-runtime` sa spúšťa v 11 úlohách** — ⚠️ **nízke ROI.** Každá používa samostatný runner a kontrola trvá <1 s; celková úspora je približne 10 s za cenu straty lacnej ochrany v každej úlohe. Nestojí to za tieto zmeny.
- **`typecheck:noimplicit:core` v kontrole lint CI** — ✅ **odstránené z úlohy lint** (bolo informatívne s `continue-on-error`); blokujúci typový povrch tvoria `typecheck:core` + `check:type-coverage`. Lokálny skript zostal zachovaný.

### Prepnúť / rozhodnúť (politika operátora)

- `check:openapi-security-tiers` (informatívne) — ❌ **NEDÁ SA čisto prepnúť.** Končí s kódom 0, ale upozorňuje, že viacerým trasám `traffic-inspector` v rámci `LOCAL_ONLY_API_PREFIXES` chýba anotácia `x-loopback-only: true`. Jeho vynútenie najskôr vyžaduje pridanie týchto anotácií do `openapi.yaml`.
- `typecheck:noimplicit:core` (informatívne) — z veľkej časti ho nahrádza blokujúca západka `check:type-coverage`. Zmeniť na západku alebo odstrániť redundantný druhý prechod `tsc`.
- `test:vitest:ui` (teraz **blokujúce**) — už existujúce zlyhania sú explicitne vylúčené v `vitest.config.ts` pomocou sledovacích komentárov `// #8618`; nové zlyhania spôsobia zlyhanie úlohy.
- `check:secrets` (gitleaks, blokujúca západka zmrazená na 3 zdokumentovaných falošne pozitívnych nálezoch) — pridať tieto 3 nálezy do zoznamu povolených a dosiahnuť tak 0 alebo zmeniť kontrolu na informatívnu. Prekrýva sa s natívnym skenovaním tajomstiev GitHubu + `check:public-creds`.
- `check:pr-evidence` (blokujúce, prehľadáva text tela PR pomocou grep) — vysoké riziko falošne pozitívnych nálezov; jeho odstránenie oslabí vynucovanie pevného pravidla č. 18, takže ide o skutočné politické rozhodnutie.
- `semgrep` (samostatné informatívne) — pri rodinách OWASP sa prekrýva s CodeQL; prepojiť jeho východiskový stav so západkou alebo ho odstrániť.

---

## Súvisiaca dokumentácia

- Dodávateľský reťazec (pôvod, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrola zhody množín kľúčov

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, úloha `i18n-ui-coverage`).
Porovnáva množinu koncových kľúčov každého súboru `src/i18n/messages/<locale>.json` so súborom `en.json` a zlyhá
pri každom chýbajúcom alebo nadbytočnom koncovom kľúči bez ohľadu na to, kedy bol kľúč pridaný. Zástupné hodnoty
`__MISSING__:` sa počítajú ako prítomné (ich obsah rieši kontrola pomeru). Ide o absolútny doplnok
dvoch kontrol založených na rozdieloch/percentách: `check-ui-keys-coverage` vynucuje minimálne 80 % pokrytie pre
každé miestne nastavenie (43 chýbajúcich kľúčov z približne 13 000 sa stále javí ako 99,7 %) a `check-new-key-coverage` posudzuje
iba kľúče, ktoré PR pridáva do `en.json`. Dávka miestnych nastavení sa vygeneruje zo súboru `en.json` v deň,
keď sa vytvorí jej vetva, a prekladá sa niekoľko dní, zatiaľ čo základná vetva naďalej pridáva kľúče; dávkový PR sám
nepridáva žiadny kľúč, takže obe príbuzné kontroly zostali ticho, keď bola dávka 1 (#13044) zlúčená s 43 chýbajúcimi kľúčmi v deviatich
miestnych nastaveniach a dávka 2 (#13660) s 10 chýbajúcimi kľúčmi v ôsmich (2026-09-15). Neúspešnú kontrolu opravte pomocou
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; koncový kľúč označený ako `extra`
znamená, že ho zdroj odstránil — odstráňte ho aj z miestneho nastavenia. `--warn` podá hlásenie bez zlyhania.
`--catalog=cli` spustí rovnaké porovnanie nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba kroky sú súčasťou úlohy `i18n-ui-coverage`.

#### `check-new-key-coverage` — kontrola i18n nových kľúčov

Príbuzná kontrola k `check-ui-value-drift`. Tá zachytáva anglickú hodnotu, ktorá bola **prepísaná**,
zatiaľ čo jej preklady zostali nezmenené; táto zachytáva anglický kľúč, ktorý bol **pridaný**,
ale niektoré miestne nastavenia ho nikdy nedostali.

`check-ui-keys-coverage` nedokáže zachytiť tento prípad: vynucuje minimálne percentuálne pokrytie pre každé miestne nastavenie a
jedenásť chýbajúcich kľúčov z približne 13 000 ponechá pokrytie na úrovni 99,9 %. Percentuálna hodnota pre jednotlivé jazyky nedokáže
vyjadriť „táto funkcia bola vydaná bez prekladu“ — celá funkcia sa môže dostať do nového miestneho nastavenia bez
akéhokoľvek textu a hodnota sa vôbec nezmení.

Incident, ktorý táto kontrola zachytáva: 3. fáza Orchestration Canvas preložila svojich jedenásť kľúčov do
42 miestnych nastavení, ktoré v tom čase existovali. O niekoľko hodín neskôr zvýšila dávka jazykov EÚ (#13044) počet miestnych nastavení
v repozitári na 51 a deväť nových (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ich nikdy
nedostalo. `deepMergeFallback` nahradí chýbajúci kľúč angličtinou, takže výsledkom bolo
nepreložené používateľské rozhranie namiesto prázdneho používateľského rozhrania — skutočný problém, ktorý bol zo svojej podstaty tichý.

Rovnako ako príbuzná kontrola si aj táto **uvedomuje rozdiely**: porovnáva angličtinu v základe zlúčenia s pracovným
stromom, takže už existujúce medzery zostávajú zmrazené a zapnutie kontroly nevyžadovalo žiadnu migráciu.

**Značka `__MISSING__:<english>` tejto kontrole nevyhovie (od 2026-09-17).** Predtým predstavovala
zdokumentovaný odklad — behové prostredie použije ako náhradu správnu angličtinu — až kým osem PR s funkciami
dňa 2026-09-16 nepridalo 61 kľúčov a nevložilo značku do všetkých 65 miestnych nastavení namiesto prekladu: táto
kontrola prijala každý z nich, PR nič nezablokovalo a blokujúca kontrola pomeru skutočných prekladov
následne zlyhala na konci vydania všetkým (pt-BR 3,2 % > 2,5 % + 0,5). Značka sa teraz posudzuje
ako chýbajúci preklad. Neúspešnú kontrolu opravte pomocou
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` alebo
všetky miestne nastavenia paralelne pomocou `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
bezpečný pri odpojení, odmietne sa spustiť bez premenných prostredia `OMNIROUTE_TRANSLATION_*`). Kľúč, ktorý musí zostať
v angličtine (pevne stanovený názov produktu/modulu/príznaku), patrí do `scripts/i18n/untranslatable-keys.json`,
nikdy za značku. `vi` úplne zakazuje značky (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrola odložených testov

Súbor v zozname `exclude` súboru `vitest.config.ts` je test, ktorý sa nespúšťa, no každému, kto číta
strom, sa javí ako pokrytie. Za komentárom sa nahromadilo šesťdesiatdva súborov
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Problém #8618 bol uzavretý
2026-08-11, zatiaľ čo zoznam, ktorý sledoval, narástol zo 45 položiek na 62, pričom každá nová položka zdedila komentár
odkazujúci na už uzavretý problém. Keď sa zoznam napokon zmeral súbor po súbore (#13204), **51 zo 62
prešlo v aktuálnom strome bez akejkoľvek zmeny zdrojového kódu**.

Kontrola vyžaduje, aby každá výnimka odkazujúca na skutočný súbor (a) uvádzala sledovaný problém a
(b) bola uvedená v `config/quality/vitest-exclusions.json` so svojím nameraným stavom, takže jej pridanie predstavuje
kontrolovateľný rozdiel vo vyhradenom súbore namiesto ďalšieho riadka v poli so 60 položkami. Zámerne
opätovne nespúšťa vylúčené testy — trvá to približne 10 minút a patrí to do periodickej úlohy;
inventár zaznamenáva, kedy bol každý z nich naposledy zmeraný.
