# Quality Gates Reference (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Šis dokuments ir autoritatīvā atsauce visām OmniRoute CI kvalitātes kontrolēm.
Tajā ir aprakstīta katra kontrole, ko tā validē, kurā CI uzdevumā tā tiek izpildīta, vai tā izmanto
pakāpeniski paaugstināmu bāzes līmeni vai izpildes/neizpildes politiku un vai tā bloķē būvējumu vai ir tikai informatīva.

Īsu kopsavilkumu un atļauto elementu saraksta politiku skatiet `AGENTS.md` sadaļā
"Quality Gates & Ratchets". Šīs pašas sistēmas kritisko novērtējumu, brieduma klasifikāciju un no rīkiem neatkarīgu
replikācijas plānu skatiet
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Pārbaužu inventārs (~90 skripti)

Skripti atrodas `scripts/check/` (politiku pārbaudes) un `scripts/quality/` (ratchet dzinējs).
CI patiesības avots ir `.github/workflows/ci.yml`.

### Laidiena PR ātrais ceļš (`quality.yml`)

`.github/workflows/quality.yml` tiek izpildīts PR, kuru mērķis ir `release/**`. Tas nodrošina netraucētu darba turpināšanu līdzautoru
zaros, izmantojot pēc ceļiem filtrētas ātrās pārbaudes, kā arī vienu konsultatīvu produkcijas būvējuma signālu koda
izmaiņām:

| Uzdevums                                         | Tvērums                                                                                                                                                                                                                                             | Bloķēšana                                                                                                          |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `Build (advisory)`                               | Koda PR, kas nav melnraksti, un Mergify rindas zari; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` ar `OMNIROUTE_USE_TURBOPACK=1`; artefakts netiek augšupielādēts, jo neviens pakārtotais kvalitātes uzdevums to neizmanto        | **Konsultatīvs** (`continue-on-error: true`; noņemt pēc vienas nedēļas stabiliem laidiena PR izpildes rezultātiem) |
| `Docs Gates (fast-path)`                         | Dokumentācijas/koda PR; API dokumentācijas atsauces un docs-all                                                                                                                                                                                     | Jā                                                                                                                 |
| `Fast Quality Gates`                             | Koda PR; statiskās pārbaudes, tipu pārbaude, informācijas paneļa tipu pārbaude, ietekmētie vienību testi                                                                                                                                            | Jā                                                                                                                 |
| `Forgotten sibling tests`                        | Koda PR; mainītie moduļi tiek izsekoti līdz statiskajiem patērētājiem un iespējamiem saistītajiem testiem; barrel un dinamiskās importēšanas ceļi tiek ziņoti kā konsultatīva diagnostika kopā ar atsauktajiem atļauto izņēmumu saraksta ierakstiem | **Konsultatīvs**                                                                                                   |
| `Vitest (fast-path)`                             | Koda PR; ātrais vitest komplekts                                                                                                                                                                                                                    | Jā                                                                                                                 |
| `Unit Tests fast-path`                           | Koda PR; 4 segmentu vienību testu komplekts                                                                                                                                                                                                         | Jā                                                                                                                 |
| `No new ESLint warnings`                         | Koda PR; uz apspiešanas gadījumiem balstīta lint brīdinājumu pārbaude                                                                                                                                                                               | Jā savas izcelsmes PR, konsultatīvs atzarojumiem                                                                   |
| `Merge integrity (changelog + generated skills)` | PR, kas nav melnraksti; izmaiņu žurnāla un ģenerēto prasmju sinhronizācija                                                                                                                                                                          | Jā savas izcelsmes PR, konsultatīvs atzarojumiem                                                                   |

#### Aizmirsto saistīto testu pārskats

`npm run check:forgotten-sibling-tests` atkārtoti izmanto testu ietekmes kartes pamatā esošo importēšanas atrisinātāju.
Katram mainītajam produkcijas modulim tas ziņo deterministiskas
`mainītais modulis/simbols -> statiskais patērētājs -> iespējamais saistītais tests` ķēdes, ja iespējamais
tests nav iekļauts izmaiņu pieprasījuma diff. Markdown kopsavilkums un JSON rezultāts tiek saglabāti kā
`forgotten-sibling-tests` darbplūsmas artefakts kalibrēšanai pirms jebkādas bloķēšanas ieviešanas.

Barrel atkārtota eksportēšana un dinamiskā importēšana ir tikai atrisināšanas diagnostika; tā nekad nerada
bloķējošu atradni. Pārskatītie izņēmumi atrodas
`config/quality/forgotten-sibling-allowlist.json`. Katram ierakstam jānorāda patērētājs un iespējamais
tests, jāsniedz konkrēts pamatojums un saite uz GitHub problēmu vai izmaiņu pieprasījumu. Nederīgi ieraksti izraisa
bloķēšanu pēc noklusējuma. Izņēmumi nevar apspiest dzēstu iespējamo testu vai diff, kas pievieno `.skip`/`.todo`;
apgalvojumu vājināšana un cita maskēšana joprojām ir neatkarīgi bloķējošās
`check:test-masking` pārbaudes pārziņā.

### Uzdevums: `lint`

Tiek izpildīts katram PR uz `main`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts (`npm run ...`)           | Pārbauda                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Bloķējošs                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Node.js versija ir atbalstītajā diapazonā                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                           |
| `check:cycles`                    | Cikliskos importus — visos `src/` + `open-sse/` moduļos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `check:route-validation:t06`      | Zod shēmu esamību visos maršrutos (6. līmeņa politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jā                                           |
| `check:any-budget:t11`            | `@ts-expect-error // any` skaits nepārsniedz budžetu (11. līmeņa catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Jā                                           |
| `check:provider-consistency`      | Katram nodrošinātājam failā `providers.ts` ir atbilstošs ieraksts failā `providerRegistry.ts` (un otrādi — atļauto vienumu saraksta ietvaros)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                           |
| `check:model-lifecycle`           | Trīs manuāli uzturētās maršrutēšanas tabulas saglabā atbilstību repozitorijā iekļautajam dzīves cikla momentuzņēmumam (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nepiešķir vērtējumu nevienam izņemtam ID, kuru `REGISTRY` var maršrutēt; katrs `BUILT_IN_ALIASES` mērķis ir iekļauts `REGISTRY` un nav iekļauts izņemto ID momentuzņēmumā; katrs izņemtais ID, kas joprojām ir `REGISTRY`, tiek pārsūtīts vai norādīts `allowedRetiredInCatalog`; un neviens `DEFAULT_DEGRADATION_MAP` avots vai mērķis šajā momentuzņēmumā nav atzīmēts kā izņemts. Tas nepierāda, ka modeli pašlaik apkalpo aktīvs augšupējais pakalpojums. Bezsaistē — salīdzina ar `config/quality/model-lifecycle.json`, kas tiek manuāli atsvaidzināts ar `npm run quality:refresh-model-lifecycle` (nepieciešams tīkls; nav integrēts CI). `allowedRetiredInCatalog` ir pakāpeniskas samazināšanas sprūdrata mehānisms: pievienojiet ierakstu tikai kopā ar izsekošanas pieteikumu. | Jā                                           |
| `check:fetch-targets`             | Katrs `fetch("/api/...")` klienta puses direktorijā `src/` norāda uz reālu `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jā                                           |
| `check:deps`                      | Visas ar `npm install` instalējamās atkarības visos repozitorija failos `package.json` ir iekļautas `dependency-allowlist.json`; jaunās atkarības bez fiksētas versijas vai ar iespējami maldinoši līdzīgiem nosaukumiem tiek atzīmētas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `audit:deps`                      | `npm audit` (saknes direktorijs + Electron) — nav augstas/kritiskas pakāpes drošības brīdinājumu (pārklājas ar OSV `check:vuln-ratchet`; skatiet racionalizācijas neizpildīto darbu sarakstu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jā                                           |
| `check:lockfile`                  | `package-lock.json` integritāte — HTTPS reģistrs, integritātes jaucējvērtības, nav resursdatora pārrakstīšanas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                           |
| `check:licenses`                  | SPDX licenču atļauto vērtību saraksts produkcijas atkarībām                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jā                                           |
| `check:tracked-artifacts`         | Nav būvējuma artefaktu / repozitorijā iekļautu `node_modules` simbolisko saišu (tiek izpildīta arī husky pirmsiesniegšanas pārbaudē; pirmsnosūtīšanas pārbaude ir apzināti vienkāršota — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                           |
| `check:ai-attribution`            | PR komitos, virsrakstā vai aprakstā nav MI/robotu `Co-Authored-By` beigu rindiņas vai MI ģenerēšanas kājenes — stingrais noteikums Nr. 16 (`quality.yml` ātro pārbaužu ciklā PR→`release/**` gadījumā — nolasa notikuma lietderīgo slodzi, bet neko nedara ārpus PR — un tikai PR paredzētā `ci.yml` lintēšanas solī PR→`main` gadījumā; arī husky `commit-msg` āķī; cilvēki kā līdzautori ir atļauti; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:vitest-exclusions`         | Katrs Vitest izņēmums norāda uz izsekošanas problēmu un ir iekļauts failā `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                           |
| `check:file-size`                 | Neviens avota fails nepārsniedz attiecīgajam paplašinājumam noteikto ierobežojumu (sprūdratmehānisms: lieli faili ir fiksēti sarakstā `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jā                                           |
| `check:error-helper`              | Kļūdu atbildēs izpildītājos/apstrādātājos tiek izmantots `buildErrorBody()` / `sanitizeErrorMessage()` (stingrais noteikums Nr. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jā                                           |
| `check:migration-numbering`       | Migrāciju SQL faili ir secīgi numurēti, bez iztrūkumiem vai dublikātiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jā                                           |
| `check:public-creds`              | Ārpus `publicCreds.ts` nav literālu OAuth `client_id`/`client_secret` vai Firebase tīmekļa atslēgu (Stingrais noteikums #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Jā                                           |
| `check:db-rules`                  | Ārpus `src/lib/db/` moduļiem nav neapstrādāta SQL; nav apkopojošo importu no `localDb.ts` (Stingrie noteikumi #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jā                                           |
| `check:known-symbols`             | Pakalpojumu sniedzēju izpildītāji, maršrutēšanas stratēģijas un tulkotāji, kas reģistrēti to dispečertabulās, atbilst diskā esošajiem failiem — nav bāreņsimbolu vai nedeklarētu simbolu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jā                                           |
| `check:route-guard-membership`    | Katrs maršruts, kas palaiž bērnprocesu, ir klasificēts ar `isLocalOnlyPath()` (Stingrie noteikumi #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jā                                           |
| `check:test-discovery`            | Katru repozitorijā esošo `*.test.ts` / `*.spec.ts` failu apkopo vismaz viens testu izpildītājs (sprūdrata princips: bāreņfailu saraksts failā `test-discovery-baseline.json` var tikai sarukt)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jā                                           |
| `check:agent-skills-sync`         | Ģenerētie agent-skills artefakti atbilst to avota katalogam (nav noviržu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Pakalpojumu sniedzēju logotipiem/resursiem ir reģistrēts izcelsmes ieraksts                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `lint:json`                       | JSON konfigurācijas faili tiek parsēti un atbilst repozitorija lint noteikumiem                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | TypeScript kompilācija bez kļūdām (tikai konsultatīvi brīdinājumi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jā                                           |
| `typecheck:noimplicit:core`       | Stingrs `noImplicitAny` — uz nākotni vērsta pārbaude; daudzām iepriekš pastāvošām izsaukumu vietām joprojām nepieciešamas anotācijas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **Konsultatīvs** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, kas attiecas tikai uz `src/app/(dashboard)/**` (#7033) — `typecheck:core` rūpīgi atlasītais 27 failu atļauto failu saraksts neietver nevienu dashboard TSX failu, un arī `next build` tos nekad nepārbauda pēc tipiem (`next.config.mjs` iestata `ignoreBuildErrors: true`), tāpēc nesaistītu identifikatoru regresijas šajā vietā (#6625/#6909) CI sistēmai nebija redzamas. Atšķirības tiek salīdzinātas ar fiksētu bāzlīniju, kurā katram failam un TS kodam norādīts kļūdu skaits (`config/quality/dashboard-typecheck-baseline.json`, tāds pats novecojušu ierakstu kontroles modelis kā `check:known-symbols`) — vārtejas pārbaude neizdodas tikai tad, ja kļūdu skaits pārsniedz bāzlīnijā noteikto; kad tiek izlabota iepriekš pastāvoša kļūda, samaziniet bāzlīniju ar `--update`.                                                                                                                                                            | Jā                                           |

### Uzdevums: `quality-gate`

Tiek palaists pēc `test-coverage`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts                      | Pārbauda                                                                                                                                                                                        | Bloķējošs                    |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | Izveido `quality-metrics.json` (ESLint brīdinājumu skaits, pārklājums no apvienotā segmentu pārskata)                                                                                           | Jā (pirms ratchet pārbaudes) |
| `quality:ratchet`            | Neviena `quality-baseline.json` metrika nav pasliktinājusies (ESLint brīdinājumi ≤ bāzes līmenim; pārklājums ≥ bāzes līmenim)                                                                   | Jā                           |
| `check:duplication`          | Koda dublēšanās (jscpd@4) nepārsniedz `quality-baseline.json` noteikto bāzes līmeni                                                                                                             | Jā                           |
| `check:complexity`           | Faila līmeņa ciklomātiskā sarežģītība nepārsniedz ierobežojumu (pamata ESLint `complexity` + `max-lines-per-function`)                                                                          | Jā                           |
| `check:cognitive-complexity` | Kognitīvās sarežģītības ratchet pārbaude (`eslint-plugin-sonarjs`) — atsevišķa ESLint pārbaude; CI izpilda abas apvienotas vienā `check:complexity-ratchets` solī                               | Jā                           |
| `check:dead-code`            | Neizmantoto eksportu/failu ratchet pārbaudes rezultāts nepasliktinās salīdzinājumā ar bāzes līmeni (knip)                                                                                       | Jā                           |
| `check:compression-budget`   | Saspiešanas etalontesta budžets — katra dzinēja minimālais marķieru ietaupījums nedrīkst pasliktināties                                                                                         | Jā                           |
| `check:type-coverage`        | Tipizētā koda procentuālā īpatsvara ratchet pārbaudes (`type-coverage`) rezultāts nepasliktinās; lielā mērā aptver `typecheck:noimplicit:core`                                                  | Jā                           |
| `check:codeql-ratchet`       | Atvērto CodeQL brīdinājumu skaits nepalielinās (nolasa, izmantojot `gh api`; korekti izlaiž bez pilnvaras); atsvaidzināšanas biežumu un manuālo palaišanu skatiet tālāk sadaļā "CodeQL ratchet" | Jā                           |

### Uzdevums: `quality-extended`

Viss uzdevums ir konsultatīvs (`continue-on-error: true`). Uz npm balstītās ratchet pārbaudes tiek izpildītas
pilnībā; ārējie skeneri tiek instalēti, izmantojot `gh release download`, un paši izlaiž pārbaudi (izejas kods 0),
ja binārā datne joprojām nav pieejama.

| Skripts                  | Pārbauda                                                                                                                                                                                                          | Bloķējošs        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check:circular-deps`    | Nav ciklisku atkarību (dpdm)                                                                                                                                                                                      | **Konsultatīvs** |
| `check:bundle-size`      | Pakotnes izmērs nepārsniedz ierobežojumu                                                                                                                                                                          | **Konsultatīvs** |
| `check:secrets`          | Noslēpumu skenēšana (gitleaks) — tiek izlaista, ja binārā datne nav pieejama                                                                                                                                      | **Konsultatīvs** |
| `check:vuln-ratchet`     | Atkarību ievainojamību (osv-scanner) skaits nepalielinās — tiek izlaista, ja binārā datne nav pieejama                                                                                                            | **Konsultatīvs** |
| `check:workflows`        | Darbplūsmu statiskā pārbaude (actionlint + zizmor) — tiek izlaista, ja binārās datnes nav pieejamas                                                                                                               | **Konsultatīvs** |
| `check:openapi-breaking` | Publiskās API līguma (`openapi.yaml`) izmaiņas nav nesaderīgas salīdzinājumā ar bāzes zaru (oasdiff) — izvada `openapiBreaking=N`; tiek izlaista, ja oasdiff nav pieejams vai bāzes specifikāciju nevar atrisināt | **Konsultatīvs** |

### Uzdevums: `docs-sync-strict`

Tiek izpildīts katram PR uz `main`. Kļūmes gadījumā bloķē sapludināšanu.

| Skripts                        | Pārbauda                                                                                                                                                                       | Bloķējošs                  |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `check:docs-all`               | Metavārteja, kas secīgi izpilda 6 tālāk norādītās apakšvārtejas                                                                                                                | Jā                         |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versiju konsekvenci                                                                                                                              | Jā                         |
| ↳ `check:docs-counts`          | Tekstā norādītais skaits (nodrošinātāju skaits, migrāciju skaits utt.) atrodas faktisko vērtību ierobežojošajā diapazonā                                                       | Jā                         |
| ↳ `check:env-doc-sync`         | Katrs `.env.example` vides mainīgais ir dokumentēts dokumentācijas tabulā un otrādi                                                                                            | Jā                         |
| ↳ `check:deprecated-versions`  | Dokumentācijā nav novecojušu versiju virkņu                                                                                                                                    | Jā                         |
| ↳ `check:doc-links`            | Iekšējās markdown saites dokumentācijā norāda uz reāliem failiem (`[text]`/`(path)` formā)                                                                                     | Jā                         |
| ↳ `check:fabricated-docs`      | Dokumentācijā minētie maršruti, vides mainīgie, CLI komandas, āķu nosaukumi un failu ceļi pastāv kodu bāzē. Stingrā pārbaude ar `--strict`; bez karodziņa kļūme nav bloķējoša. | Jā (CI vidē ar `--strict`) |
| `check:cli-i18n`               | CLI komandu virknes ir ietvertas visos i18n lokalizāciju failos                                                                                                                | Jā                         |
| `check:openapi-coverage`       | OpenAPI specifikācija aptver vismaz pakāpeniski paaugstināmu reālo maršrutu minimumu                                                                                           | Jā                         |
| `check:openapi-security-tiers` | Drošības līmeņu anotācijas failā `openapi.yaml` atbilst klasifikācijām failā `routeGuard.ts`                                                                                   | **Ieteikuma**              |
| `check:openapi-routes`         | Katrs ceļš failā `openapi.yaml` atbilst reālam `route.ts` failam (aizsardzība pret halucinācijām)                                                                              | Jā                         |
| `check:docs-symbols`           | Katra `/api/...` atsauce failos `docs/**/*.md` atbilst reālam `route.ts` failam (aizsardzība pret halucinācijām)                                                               | Jā                         |
| `i18n translation drift`       | Netulkotas atslēgas i18n lokalizāciju failos — tikai brīdinājums                                                                                                               | **Ieteikuma**              |

### Uzdevums: `i18n-ui-coverage`

| Skripts                           | Pārbauda                                                                                                                                                                                                                        | Bloķējošs     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check-ui-keys-coverage` (inline) | Lietotāja saskarnes i18n atslēgu pārklājums ir ≥ 65%                                                                                                                                                                            | Jā            |
| `check-ui-value-drift` (inline)   | Pārrakstīta angļu valodas **vērtība** neatstāj novecojušu tulkojumu                                                                                                                                                             | Jā            |
| `check-new-key-coverage` (inline) | **Jauna** angļu valodas atslēga ir iztulkota katrā lokalizācijā — marķieris `__MISSING__:` tiek noraidīts                                                                                                                       | Jā            |
| `check-translation-ratio`         | Reālo tulkojumu īpatsvars katrā lokalizācijā (ārpus atļauto vienumu saraksta esošas ar angļu valodu identiskas, viettura vai trūkstošas vērtības) nedrīkst pārsniegt `config/quality/i18n-translation-baseline.json` + pielaidi | **Ieteikuma** |

Nepieciešams `fetch-depth: 0` — vērtību novirzes vārteja salīdzina `en.json` ar sapludināšanas bāzi.

#### `check-ui-value-drift` — novecojušu tulkojumu vārteja

Atklāj to vienu i18n regresiju, kuru pārējās vārtejas strukturāli nevar pamanīt: angļu valodas vērtība
tiek pārrakstīta, bet no _iepriekšējā_ angļu valodas teksta atvasinātie tulkojumi paliek nemainīti, tādēļ
lietotāji, kuri nelieto angļu valodu, turpina lasīt pārliecinoši formulētu, taču tagad kļūdainu tekstu.

Tas patiešām nonāca laidienā. `oauthModal.googleOAuthWarning` tika pārrakstīts, kad tika ieviests Antigravity
pieteikšanās palīgs (#5203); **39 no 43 lokalizācijām** saglabāja tekstu, kas operatoriem norādīja „kopēt
pilno URL un ielīmēt to zemāk” — šī pakalpojuma sniedzēja gadījumā šādu procesu nav iespējams pabeigt. Tas
palika nepamanīts līdz #8463, jo:

- `sync-ui-keys` aizpilda tikai **trūkstošas** atslēgas, nevis **novecojušas**;
- `check-ui-keys-coverage` uzskaita atslēgu _esamību_, tādēļ novecojis tulkojums tiek uzskatīts par pārklātu;
- `check-translation-drift` izseko `docs/i18n/<locale>/**.md` dokumentācijas spoguļkopijas —
  tas nekad nelasa `src/i18n/messages/*.json`. Kopš 2026-09 atkārtotās sinhronizācijas uzdevumā `docs-sync-strict` tā ir bloķējoša pārbaude: rediģējiet pamatdokumentu → `npm run i18n:run -- --files=<doc>` (sadaļas līmenī, ar nelielām izmaksām).

**Ņem vērā izmaiņas, nevis balstās uz bāzes etalonu.** Tas salīdzina `en.json` sapludināšanas bāzē ar
darba koku; katrai atslēgai, kuras angļu valodas vērtība ir mainījusies, ikviens lokalizācijas fails, kurā joprojām ir
neskarts tulkojums, tiek uzskatīts par novecojušu. Tas apzināti **iesaldē iepriekš pastāvošo parādu** — izmaiņu kopa
nevar atklāt, no kuras vecās angļu valodas versijas ir radies sen pastāvošs tulkojums, tāpēc pārbaude vērtē
tikai to, ko skar pašreizējās izmaiņas. Alternatīvai pieejai (katras atslēgas jaucējvērtību bāzes etalonam) būtu nepieciešams
aptuveni 600 KB liels ģenerēts fails, kas ir 3× lielāks par lielāko esošo bāzes etalonu un tiktu mainīts katrā i18n PR.

Ir divi veidi, kā izpildīt šo prasību:

1. atjaunināt skartos tulkojumus vai
2. iestatīt tiem `__MISSING__:<new english>` — izpildlaikā tad tiek parādīts izlabotais teksts angļu valodā
   (`src/i18n/request.ts::deepMergeFallback`, #7258), un atslēga tiek ievietota tulkošanas rindā.

Ja ir mainījusies virknes **nozīme**, ieteicams **pārdēvēt atslēgu**: jauna atslēga nevar mantot
novecojušu tulkojumu. Šādu pieeju izmantoja #8463.

```bash
npm run i18n:check-value-drift          # stingrā pārbaude (tā tiek palaista CI)
npm run i18n:check-value-drift:warn     # tikai pārskats
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Beidz darbu ar kodu 0 un ziņojumu `SKIP reason=base-unresolved`, ja bāzes katalogu nevar nolasīt (sekls
klons bez bāzes atsauces), tāpat kā `check-openapi-breaking`.

### Darbs: `i18n`

Pilna i18n validācijas matrica (viens darbs katrai lokalizācijai). Viss darbs ir konsultatīvs.

| Skripts                         | Ko validē                                | Bloķējošs                                                 |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------------- |
| `validate_translation.py quick` | Tulkojuma pilnīgumu katrai lokalizācijai | **Konsultatīvs** (`continue-on-error: true` visam darbam) |

### Darbs: `pr-test-policy`

Tiek palaists tikai izmaiņu pieprasījumiem.

| Skripts                | Ko validē                                                                                                                                     | Bloķējošs |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR, kas maina produkcijas kodu mapēs `src/`, `open-sse/`, `electron/` vai `bin/`, ir jāiekļauj vai jāatjaunina testi (stingrais noteikums #8) | Jā        |
| `check:test-masking`   | Mainītie testu faili nesamazina kopējo pārbaudes apgalvojumu skaitu un nepievieno `assert.ok(true)` tautoloģijas                              | Jā        |
| `check:pr-evidence`    | PR aprakstā ir norādīti izmaiņu testu/VPS pierādījumi (automatizē stingro noteikumu #18, meklējot PR tekstā — trausli; skatiet uzkrājumu)     | Jā        |

### Darbs: `test-vitest`

Tiek palaists pēc `build`. Neveiksmes gadījumā bloķē sapludināšanu.

| Testu komplekts  | Ko validē                                                         | Bloķējošs                                                                                                                       |
| ---------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serveri (110 rīki), autoCombo, kešatmiņu — vitest izpildītājs | Jā                                                                                                                              |
| `test:vitest:ui` | UI komponentu testus — vitest izpildītājs                         | **Bloķējošs** — iepriekš pastāvošās kļūmes ir skaidri izslēgtas failā `vitest.config.ts`; jaunas kļūmes izraisa darba neveiksmi |

### Nakts darbplūsmas (ieplānotas, konsultatīvas)

Tās tiek palaistas pēc cron grafika (un ar `workflow_dispatch`), bet nekad PR ietvaros. Tās visas ir konsultatīvas.

| Darbplūsma             | Ko validē                                                                                                                                                                                | Bloķējoša        |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | fast-check īpašību testus ar nejaušu sākumvērtību un lielu izpildes reižu skaitu                                                                                                         | **Konsultatīva** |
| `nightly-resilience`   | atmiņas kaudzes pieauguma pārbaudi, haosa kļūmju ievadīšanu, k6 slodzes/ilgstošas slodzes testus                                                                                         | **Konsultatīva** |
| `nightly-llm-security` | promptfoo injekciju aizsardzību (bloķēšanas režīmā) un garak zondes (tiek izlaistas bez pakalpojuma sniedzēja noslēpuma)                                                                 | **Konsultatīva** |
| `nightly-schemathesis` | OpenAPI līguma izpludināšanas testēšanu (schemathesis) pret aktīvu OmniRoute, izmantojot `docs/openapi.yaml` — atklāj specifikācijas pārkāpumus / neapstrādātas 500 kļūdas (8. fāze B.4) | **Konsultatīva** |
| `nightly-mutation`     | Stryker mutāciju testēšanas rezultātu ātrajā vienībtestu joslā — izdzīvojušās mutācijas atklāj vājus pārbaudes apgalvojumus                                                              | **Konsultatīva** |
| `nightly-compat`       | Node dzinēja saderības matricu visos atbalstītajos `engines.node` diapazonos                                                                                                             | **Konsultatīva** |

---

## Ātruma posms (2026-08-30 → v4.0 LTS): katra bāzes robežvērtība atvieglota par 20%

Īpašnieka lēmums (2026-08-30): līdz v4.0 modularizācijai piegādes ātrums ir svarīgāks
par tehniskā parāda ierobežošanu. Katra **skaitliskā** sprūdrata bāzes robežvērtība vienā
auditējamā piegājienā tika atvieglota par 20%, un posms ir deklarēts failā `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kas mainījās                                                                                                                                                                                                                  | Kur                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — skaitļi, kuriem mazāk ir labāk, ×1.2; procenti, kuriem vairāk ir labāk, ÷1.2 (pārklājuma minimums saglabāts 60, `eslintErrors` paliek 0, `eslintWarnings` 0 → 20% no fiksētā apspiešanas gadījumu skaita) | `quality-baseline.json` (`_relax_velocity_2026_08_30` piezīmē uzskaitītas visas izmaiņas pirms → pēc)  |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, katrs `frozen[*]` / `testFrozen[*]` rindu ierobežojums ×1.2                                                                                                                                                 | `file-size-baseline.json`                                                                              |
| katra faila / katra TS koda skaits ×1.2                                                                                                                                                                                       | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` kļūst informatīvs, kamēr `_policy.requireTighten === false`                                                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| iknakts `bank-ratchet-shrinks` ir apturēts (tas reģistrētu izmērīto samazinājumu un likvidētu rezervi)                                                                                                                        | `.github/workflows/nightly-release-green.yml`                                                          |

Atļauto vienumu saraksti (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nav** budžeti un netika mainīti. Sekmīgas/nesekmīgas izpildes politikas vārtejas (noslēpumi, SQL noteikumi,
dokumentācijas/vides līgums, i18n paritāte, vienībtesti) nav mainītas — nesekmīgs tests joprojām ir nesekmīgs tests.

**Rīki**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — vienreizēja
  atvieglošana (`scripts/quality/relax-baselines.mjs`); atsakās darboties divreiz ar vienu un to pašu
  piezīmi.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mēra katru skaitlisko vārteju tāpat kā CI un izvada katras vārtejas atlikušo rezervi
  (`scripts/quality/baseline-headroom.mjs`). Ik nakti izpildītais `baseline-headroom` uzdevums publicē
  tabulu aktuālajā pieteikumā **📈 Bāzes robežvērtību rezerve (ātruma posms)** un pievieno
  `headroom-alert` etiķeti, ja kāda vārteja ir 10% robežās no sava limita vai jau to pārsniedz. Šis pieteikums
  ir agrīnais brīdinājums: budžets, kas tiek izsmelts dažu dienu laikā, nozīmē, ka atvieglojumu patērē
  daži PR, nevis visa komanda — pārbaudiet attiecīgās vārtejas `_rebaseline_*` piezīmes.

**Jaunā koda režīms (Clean-as-You-Code) — kopš 2026-08-30, tikai PR ātrais ceļš**

`pull_request` notikumiem `quality.yml` nodod `--base-ref <PR bāzes SHA>` komandām `check:file-size`,
`check:complexity-ratchets` un `check:dead-code`. Šajā režīmā vārteja salīdzina HEAD ar
sapludināšanas bāzi, **ierobežojot pārbaudi līdz PR mainītajiem failiem** (`scripts/check/newCodeMode.mjs`:
sapludināšanas bāze tiek materializēta pagaidu `git worktree`, ESLint/knip tiek palaisti tajā un HEAD versijā, un
tiek aprēķinātas katra faila skaitu atšķirības):

- **bloķējošs** — PR pievienoja ciklomātiskās/kognitīvās sarežģītības pārkāpumus vai neizmantotus eksportus tā mainītajos failos
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` žurnālā);
- **informatīvs** — globālais kopskaits pret fiksēto bāzes robežvērtību. Mantota novirze nekad nepadara
  nevainīga PR pārbaudi nesekmīgu; novirze tiek atkārtoti fiksēta laidiena saskaņošanas laikā, un to uzrauga rezerves uzdevums.

`workflow_dispatch` izpildēm, laidiena gatavības pārbaudei un iknakts rezerves uzdevumam nav PR bāzes,
un tie saglabā absolūto (globālo) salīdzinājumu. Pārklājums, dublēšanās un tipu pārklājums pagaidām paliek globāli
(to rīki lēti neģenerē katra faila atšķirības) — tie ir kandidāti tādai pašai pieejai.

**Posma noslēgšana v4.0 versijā (LTS = stingrāk nekā iepriekš, nevis „atpakaļ normālā režīmā”)**

1. Tīrā `release/v4.0.0` zara galotnē: uzskaitei palaidiet `npm run quality:headroom --json`, pēc tam
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` un katras tipu pārbaudes kontroles
   `--update` — katra bāzes vērtība samazinās līdz izmērītajai vērtībai.
2. Dzēsiet `_policy` no `quality-baseline.json` (atkārtoti aktivizē `--require-tighten` un iknakts
   uzkrāšanu), atjaunojiet `THRESHOLD = 36` (vai lielāku) failā `check-openapi-coverage.mjs`.
3. Pastipriniet ierobežojumus zem izmērītajām vērtībām tur, kur modularizācija ir devusi rezultātu: atjaunojiet faila izmēra `cap` uz 1000
   (vai 800), palieliniet pārklājuma minimumus par 5, modularizētajām pakotnēm iestatiet neizmantoto eksportu skaitu uz 0.

## Ratchet bāzes līnija (`quality-baseline.json`)

Ratchet dzinis (`scripts/quality/check-quality-ratchet.mjs`) nolasa `quality-baseline.json`
un salīdzina to ar tikko apkopoto `quality-metrics.json`. Jebkura metrika, kas pasliktinās
vairāk par tai noteikto epsilonu, izraisa būvējuma kļūmi.

Pašlaik izsekotās metrikas:

| Metrika               | Virziens | Nozīme                                     |
| --------------------- | -------- | ------------------------------------------ |
| `eslintWarnings`      | `down`   | ESLint brīdinājumu skaits nedrīkst pieaugt |
| `coverage.statements` | `up`     | Izteikumu pārklājums nedrīkst samazināties |
| `coverage.lines`      | `up`     | Rindu pārklājums nedrīkst samazināties     |
| `coverage.functions`  | `up`     | Funkciju pārklājums nedrīkst samazināties  |
| `coverage.branches`   | `up`     | Zaru pārklājums nedrīkst samazināties      |

Lai pēc reāla uzlabojuma atjauninātu bāzes līniju:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Karodziņš `--update` ieraksta pašreizējās izmērītās vērtības failā `quality-baseline.json`.
Komitojiet šo failu kopā ar izmaiņām, kas uzlaboja metriku. PR, kas uzlabo metriku,
neatjauninot bāzes līniju, tiks konstatēts ar `--require-tighten` (6A.5. fāze,
ieviešana vēl nav pabeigta).

### CodeQL ratchet: atsvaidzināšanas biežums un manuāla palaišana

`check:codeql-ratchet` nolasa **repozitorija stāvokli, kas tiek atsvaidzināts pēc grafika, nevis katram PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ziņo
`state: configured`, `schedule: weekly`: tas ir GitHub noklusējuma iestatījuma skenējums, nevis
analīze pēc katras izmaiņu nosūtīšanas. Sekas: pēc tam, kad tiek sapludināts PR, kas IZLABO
brīdinājumus, ratchet turpina nolasīt veco, lielāko skaitu, līdz tiek izpildīts nākamais
ieplānotais skenējums, tādēļ tas ziņo par regresiju katrā atvērtajā PR, tostarp paša
labojuma PR turpmākajās izmaiņās, līdz skenējums atjaunina datus.

**Manuāla atsvaidzināšana**: `gh workflow run codeql.yml --ref release/vX.Y.Z` atkārtoti palaiž
analīzi un dažu minūšu laikā atkārtoti publicē brīdinājumus. Vispirms izlasiet
`.github/workflows/codeql.yml` — tā galvenē ir paskaidrots, ka tas izmanto tikai
`workflow_dispatch`, **jo tas konfliktē ar GitHub "default setup"**
(`CodeQL analyses from advanced configurations cannot be processed when the default setup is enabled`).
Lai atjaunotu `push`/`pull_request`/`schedule` trigerus, vispirms nepieciešama
**īpašnieka darbība**: Settings → Code security → CodeQL: Default → Advanced.
Nepievienojiet `schedule:` trigeri bez šīs pārslēgšanas — tas radīs tikai nesekmīgas izpildes.

**Samaziniet bāzes līniju pēc skaita krituma** — `node scripts/check/check-codeql-ratchet.mjs
--update` ieraksta jauno izmērīto skaitu faila `quality-baseline.json` laukā
`metrics.codeqlAlerts.value`, lai ratchet klusējot nepieļautu regresiju atpakaļ līdz
vecajai augšējai robežai. Praktisks piemērs (2026-09-02/03): PR #12502 izlaboja 7 reālus
brīdinājumus (izmērītais atvērto brīdinājumu skaits: 13 → 6); PR #12530 samazināja fiksēto
bāzes līniju no 11 līdz 6, lai tā atbilstu faktiskajam skaitam; atlikušie 6 pēc tam tika
noraidīti, katram brīdinājumam norādot pamatojumu, līdz atvērto brīdinājumu skaits sasniedza 0.

**Par noraidīšanu lemj operators (Stingrais noteikums #14)** — nekad nenoraidiet CodeQL
brīdinājumu, noraidīšanas komentārā nenorādot tehnisko pamatojumu: `won't fix`, ja to
pieprasa augšupstraumes protokols, `used in tests` testa fiksatūrai, `false positive`,
ja izmantots sanitizētājs, ko CodeQL nevar konstatēt (precedents:
`docs/security/ERROR_SANITIZATION.md`).

---

## Testu atkārtošanas politika (WS5.4, v3.8.49)

Atkārtošana tiek konfigurēta katram izpildītājam atsevišķi, nekad globāli — vispārēja atkārtošana pārvērš reālas regresijas
neredzamās nestabilitātēs:

| Izpildītājs      | Politika                                                                                                                       | Kāpēc                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` tikai CI vidē ar `trace: on-first-retry`                                                                          | Pārlūkprogrammas/tīkla laika parametri ir patiesi nedeterministiski; viens atkārtojums ar trasējumu pārvērš nestabilitāti diagnosticējamā artefaktā |
| Vitest           | NAV globālas atkārtošanas. Pierādīti nestabilam testam piešķir tiešu katra testa atkārtošanu (redzama izmaiņās, pārskatīta PR) | Nestabilo testu izolācijas saraksts tiek glabāts repozitorijā un nekad nav necaurredzams                                                            |
| node:test (unit) | Atkārtošanas NAV nekad                                                                                                         | Nestabils vienībtests ir testa kļūda — izlabojiet to, nevis mēģiniet izpildīt vēlreiz                                                               |

Mērķa SLO pēc nestabilitātes telemetrijas ieviešanas (WS5.2/5.3): <1% nestabilitātes līmenis katram testam
(“labot nekavējoties” slieksnis), ≥95% sekmīgas izpildes līmenis katram konveijeram. Nozares atsauces vērtības —
jāpārkalibrē atbilstoši mūsu pašu mērījumiem.

## Laidiena līmeņa sprūdrata novirze (WS5.5, v3.8.49)

Ja sprūdrata ierobežojums (faila lielums, sarežģītība, eslint brīdinājumi) regresē TĪRĀ laidiena
galotnē — proti, to izraisījusi apvienojumu KOMBINĀCIJA un neviens atsevišķs PR neatveido
regresiju savā zarā — labojums ir jāveic **laidiena atbildīgajam vienu reizi laidiena
zarā**: dodiet priekšroku koda izdalīšanai/refaktorēšanai; bāzes līmeni mainiet tikai ar dokumentētu
pamatojuma ierakstu. Nekad neuzveliet kombinācijas novirzi līdzstrādnieka PR un nekad
nemainiet bāzes līmeni katram PR atsevišķi (tas slēpj reālas regresijas). Vispirms nošķiriet cēloni: atveidojiet
kļūdu pret tīro galotni pārbaudes darba kokā, pirms pieņemat, ka to izraisīja jūsu PR.

## Sprūdrata samazinājumu uzkrāšana — lejupvērstais virziens (#8584)

Sprūdrats ir automatizēts tikai daļēji, turklāt nepareizajā daļā. Augšējās robežas **paaugstināšana** ir
manuāla JSON rediģēšana, kas aizņem desmit sekundes un ir ātrākais veids, kā atbloķēt nesekmīgu PR.
Tās **pazemināšanai** kādam ir jāpalaiž `--update` un jākomitē rezultāts — un līdz
`bank-ratchet-shrinks` uzdevuma ieviešanai neviena darbplūsma to nedarīja. Izmērītās sekas
(2026-07-25): 18 fiksēti faili jau sasniedza vai nepārsniedza jauno failu 800 rindu ierobežojumu, sliktākais
gadījums — 132× (`src/shared/validation/schemas.ts`, 19 rindām saglabāts 2,523 ierobežojums);
sarežģītības augšējā robeža pieauga `1794 → 2169` aptuveni 37 bāzes līmeņa maiņas piezīmēs ar tieši vienu
samazinājumu (−1); un frāze “pastiprināt ar `--update` nākamajā ciklā” tika ierakstīta 31 reizi, bet izpildīta
vienreiz. Ierobežojums, kas pārdzīvo kodu, kura dēļ tas tika noteikts, nemanāmi pārvērš katru pabeigto
sadalīšanu izaugsmes rezervē tam, kurš nākamais rediģēs failu.

`nightly-release-green.yml` → uzdevums **`bank-ratchet-shrinks`** noslēdz šo ciklu:

|          |                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| Palaiž   | `schedule` (3× dienā) + `workflow_dispatch` — apzināti **ne** `push`                                                 |
| Mēra     | augstāko `release/vX.Y.Z`, izmantojot tādu pašu atrisināšanu un injekcijas aizsardzību kā `release-green`            |
| Raksta   | `check:file-size --update` un `check:complexity-ratchets --update` (abi pēc uzbūves tikai samazina)                  |
| Pārbauda | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                             |
| Piegādā  | vienu vienmēr aktuālu PR pret laidiena zaru — piespiedu kārtā atjauninātu, nekad neradot atkārtotu paziņojumu lavīnu |

Uzkrāšana tiek veikta paketēs, nevis katrā `push`, jo tai nav latentuma prasības (8 stundu laikā
uzkrāts samazinājums ir pieņemams), savukārt palaišana pēc katras apvienošanas atkārtoti pārbūvētu PR zaru
apvienošanas kampaņu laikā un katru reizi prasītu pilnu ESLint caurskati. Noteikšana joprojām notiek pēc
`push` (`release-green`); tikai uzkrāšana tiek veikta paketēs.

### Drošības pārbaudītājs

Uzdevums bez uzraudzības raksta bāzes līmeņos, tāpēc `verify-ratchet-bank.mjs` padara
to pieņemamu. Tas salīdzina koku pēc `--update` ar `HEAD` un **pārtrauc uzdevumu,
pirms ir izveidots jebkāds komits** — neatverot PR — ja vien katra izmaiņa nav viena no šīm:

- `frozen` / `testFrozen` skaitliska ieraksta **samazināšana** vai **noņemšana**
- `complexity-baseline.json` → `count` **samazināšana**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **samazināšana**

Jebkas cits izraisa kļūmi: skaitļa palielināšana, ieraksta pievienošana, `cap`/`testCap` mainīšana vai
`_rebaseline_*` piezīmes dzēšana/pārrakstīšana (šīs piezīmes ir audita pieraksti par katras
augšējās robežas pastāvēšanas iemeslu un tiek glabātas tajā pašā `frozen` objektā, kur failu ieraksti).
Bots, kas varētu paaugstināt ierobežojumu, būtu nepārprotami sliktāks par pašreizējo situāciju. Regresijas
aizsardzība: `tests/unit/verify-ratchet-bank.test.ts`.

Uzdevums nekad neveic `push` uz `release/*` — PR apvieno cilvēks, tādēļ kļūdains mērījums
nevar nonākt zarā bez pārskatīšanas.

## Atļauto vienumu saraksta politika

Katra pārbaude, kas nevar neizdoties jau pastāvošu pārkāpumu dēļ, izmanto fiksētu atļauto vienumu sarakstu
(piemēram, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika ir šāda:

**Novērsiet pamatcēloni; izmantojiet atļauto vienumu sarakstu tikai tad, ja pārkāpums jau pastāvēja un
to nevar novērst tajā pašā PR.**

Pievienojot ierakstu atļauto vienumu sarakstam:

1. Iekļaujiet komentāru ar pamatojumu.
2. Norādiet izsekošanas problēmu (piemēram, `// #3498 — 2. posma funkcionalitāte vēl nav ieviesta`).
3. Noņemiet ierakstu tajā pašā PR, kurā tiek novērsts pārkāpums — novecojis ieraksts, kas vairs
   nenomāc aktīvu pārkāpumu, pats par sevi ir defekts (pēc 6A.3 novecojušo ierakstu kontroles
   ieviešanas pārbaude neizdosies, ja atļauto vienumu sarakstā būs bāreņieraksts).

**Nepievienojiet** atļauto vienumu saraksta ierakstus, lai testi izpildītos ātrāk. Sekmīga pārbaude ar augošu
atļauto vienumu sarakstu rada maldīgu kvalitātes iespaidu.

### Ja pārbaude jūsu PR neizdodas

1. **Rūpīgi izlasiet pārbaudes izvadi** — tajā ir precīzi norādīts, kurš fails vai simbols
   pārkāpa noteikumu.
2. **Novērsiet pārkāpumu** — vairums pārbaužu ir deterministiskas failu sistēmas pārbaudes, kas ir sekmīgas, tiklīdz
   kods ir pareizs.
3. **Ja pārkāpums jau pastāvēja** (t. i., jūs to neieviesāt, bet pārbaude tagad
   to aptver): pievienojiet atļauto vienumu saraksta ierakstu ar pamatojuma komentāru un izsekošanas problēmu.
4. **Ja pārbaude ir sprūdrata tipa** (pārklājums, ESLint brīdinājumi, dublēšanās, sarežģītība):
   jūsu izmaiņas pasliktināja metriku. Novērsiet pamatproblēmu vai (retos gadījumos) izpildiet
   `npm run quality:ratchet -- --update`, ja izmaiņas ir apzinātas un metrikas
   pasliktināšanās ir pieņemama, taču dokumentējiet iemeslu PR aprakstā.
5. **Konsultatīvās pārbaudes** (`continue-on-error: true`) ir informatīvas — tās nebloķē
   sapludināšanu, taču tiek parādītas CI kopsavilkumā. Tik un tā tās novērsiet.

---

## Jaunas pārbaudes pievienošana

1. Izveidojiet `scripts/check/check-<name>.mjs` (vai `.ts`). Politikas pārbaudes beidz darbu ar kodu 0/1.
   Sprūdrata tipa pārbaudes izvada metriku failā `quality-metrics.json`, izmantojot `collect-metrics.mjs`.
2. Pievienojiet `"check:<name>": "node scripts/check/check-<name>.mjs"` failam `package.json`.
3. Pievienojiet to `.github/workflows/ci.yml` atbilstošajā uzdevumā
   (politika → `lint` vai `docs-sync-strict`; sprūdrats → `quality-gate`).
4. Ja pārbaudei ir atļauto vienumu saraksts, izmantojiet `reportStaleEntries()` no
   `scripts/check/lib/allowlist.mjs`, lai novecojušie ieraksti tiktu noteikti automātiski.
5. Uzrakstiet testu direktorijā `tests/unit/build/`, kas aptver pārbaudes noteikšanas loģiku.
6. Atjauniniet šo dokumentu (pievienojiet rindu attiecīgā uzdevuma tabulai).

---

## Aģentu rīki: LSP-in-the-loop (pēc izvēles)

Papildus CI pārbaudēm OmniRoute ietver **pēc izvēles izmantojamu** `agent-lsp` sagatavi
(projekta līmeņa `.mcp.json`, Fase 7 Task 15). Izveidojiet `.mcp.json`,
lai kodēšanas aģentiem nodrošinātu piekļuvi TypeScript valodas serverim un tie atrisinātu simbolus /
diagnostikas problēmas **pirms** koda rakstīšanas — tas ir kompilēšanas pirms apgalvošanas papildinājums
`typecheck:core`, kas novērš „izdomātu simbolu” kļūdas jau to rašanās vietā. Tas apzināti
netiek ielādēts automātiski (jūs izvēlaties un pārbaudāt MCP↔LSP tiltu); bojāts ieraksts tikai reģistrē
savienojuma kļūdu un nekad nepārtrauc sesijas.

---

## Racionalizācijas neizdarīto darbu saraksts (ROI pārskatīšana — 9. fāzes 3. vilnis)

Šis uzskaitījums 2026-06-17 tika salīdzināts ar `ci.yml` (iepriekšējā versijā nebija iekļauti
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Saskaņotās kopas ROI pārskatīšanā
tika identificēti tālāk minētie racionalizācijas kandidāti. **Apvienošana ir mehāniska CI
izmaiņa; statusa maiņa/atmešana ir politikas lēmums, kas atstāts operatora ziņā.** Nekas no tālāk
minētā vēl nav ieviests.

**Iepriekš nav dokumentēti arī** (konsultatīvi, zems signāla līmenis): `docs-lint` darbs
(markdownlint + Vale, visam darbam iestatīts `continue-on-error`) un savrupās skeneru darbplūsmas
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` ir norādīts
`quality-baseline.json`, taču `ci.yml` tas nav piesaistīts bloķējošam sliekšņa mehānismam — šis rādītājs
pašlaik ir bāreņrādītājs.

### Apvienošana / dublikātu novēršana (mehāniska, zemāks risks)

Katrs kandidāts 2026-06-17 tika pārbaudīts pret aktuālo kontroles statusu (uzticies, bet pārbaudi);
vairāki „acīmredzami” apvienošanas gadījumi izrādījās slēpj parādu un **nav** tieši aizstājēji.

- **`check:docs-sync` tiek izpildīts divreiz** — atsevišķi `lint` darbā un vēlreiz `check:docs-all` (`docs-sync-strict`) ietvaros, kā arī husky pirmsiesniegšanas āķī. ✅ **PABEIGTS** — atsevišķā izsaukšana no `lint` ir noņemta.
- **CVE skenēšana** — ❌ **NAV vienkārši apvienojama.** `audit:deps` izraisa kļūmi jebkuras augstas/kritiskas CVE gadījumā; `check:vuln-ratchet` (osv) izraisa kļūmi tikai _regresijas_ gadījumā salīdzinājumā ar bāzes līmeni (pašlaik 1 MODERATE). Atšķirīga semantika — `audit:deps` atmešana likvidētu absolūto augsta/kritiska līmeņa kontroli. Saglabāt abus.
- **Ciklu noteikšana** — ❌ **NAV vienkārši apvienojama.** `check:circular-deps` (dpdm) ziņo par **91 ciklu** (tādēļ tā ir konsultatīva); to nevar padarīt bloķējošu, vispirms šos ciklus nenovēršot, un tās tvērums ir plašāks nekā sekmīgajai, rūpīgi atlasītajai `check:cycles`. Saglabāt `check:cycles` kā bloķējošu pārbaudi; 91 dpdm cikla novēršana ir atsevišķs neizdarīto darbu vienums.
- **Sarežģītība** — ✅ **PABEIGTS** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): viena ESLint caurskate, uzskaite pēc ruleId, lai ciklomātiskās sarežģītības+max-lines un kognitīvās sarežģītības bāzes līmeņi paliktu neatkarīgi; individuālās `check:complexity` / `check:cognitive-complexity` pārbaudes saglabātas lokālai `--update` lietošanai.
- **`/api` pret-halucināciju pārbaude** — ✅ **PABEIGTS** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): viena `src/app/api` failu sistēmas inventarizācija; openapi-routes + docs-symbols joprojām ziņo neatkarīgi; individuālās pārbaudes saglabātas lokālai izpildei.
- **`check:node-runtime` tiek izpildīts 11 darbos** — ⚠️ **zema ROI.** Katram ir atsevišķs izpildītājs, un pārbaude ilgst <1 s; kopējais ietaupījums būtu ~10 s, taču tiktu zaudēta vienkārša katra darba aizsardzība. Nav vērts radīt liekas izmaiņas.
- **`typecheck:noimplicit:core` CI lint pārbaudē** — ✅ **noņemts no lint darba** (bija konsultatīvs `continue-on-error`); bloķējošo tipu tvērumu nodrošina `typecheck:core` + `check:type-coverage`. Lokālais skripts saglabāts.

### Statusa maiņa / lēmums (operatora politika)

- `check:openapi-security-tiers` (konsultatīvs) — ❌ **NAV vienkārši padarāms par bloķējošu.** Tas beidz darbu ar kodu 0, taču brīdina, ka vairākiem `traffic-inspector` maršrutiem zem `LOCAL_ONLY_API_PREFIXES` trūkst anotācijas `x-loopback-only: true`. Lai to ieviestu kā obligātu pārbaudi, vispirms šīs anotācijas jāpievieno failam `openapi.yaml`.
- `typecheck:noimplicit:core` (konsultatīvs) — lielā mērā dublē bloķējošā `check:type-coverage` sliekšņa mehānisma funkcijas. Pārveidot par sliekšņa mehānismu vai atmest redundanto otro `tsc` izpildi.
- `test:vitest:ui` (tagad **bloķējošs**) — iepriekš pastāvošās kļūmes ir skaidri izslēgtas failā `vitest.config.ts`, izmantojot `// #8618` izsekošanas komentārus; jaunas kļūmes izraisa darba kļūmi.
- `check:secrets` (gitleaks, bloķējošs sliekšņa mehānisms, fiksēts pie 3 dokumentētiem kļūdaini pozitīviem rezultātiem) — iekļaut šos 3 atļauto vienumu sarakstā, lai sasniegtu 0, vai pazemināt līdz konsultatīvam statusam. Pārklājas ar GitHub iebūvēto noslēpumu skenēšanu + `check:public-creds`.
- `check:pr-evidence` (bloķējošs, meklē atbilstības PR apraksta tekstā) — augsts kļūdaini pozitīvu rezultātu risks; atmešana vājinātu stingrā noteikuma Nr. 18 izpildi, tādēļ tas ir īsts politikas lēmums.
- `semgrep` (konsultatīvs, savrupa darbplūsma) — OWASP kategorijās pārklājas ar CodeQL; piesaistīt tā bāzes līmeni sliekšņa mehānismam vai atmest.

---

## Saistītā dokumentācija

- Piegādes ķēde (izcelsme, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — atslēgu kopu paritātes pārbaude

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, darbs `i18n-ui-coverage`).
Salīdzina katra `src/i18n/messages/<locale>.json` lapu atslēgu kopu ar `en.json` un izraisa kļūdu,
ja trūkst kādas lapas atslēgas vai ir kāda lieka, neatkarīgi no tā, kad atslēga tika pievienota.
Vietturi `__MISSING__:` tiek uzskatīti par esošiem (to saturs ir attiecības pārbaudes kompetencē).
Šī pārbaude ir absolūts papildinājums abām uz izmaiņām/procentiem balstītajām pārbaudēm:
`check-ui-keys-coverage` katrai lokalizācijai nosaka 80 % minimumu (43 trūkstošas atslēgas no
~13 000 joprojām uzrāda 99,7 %), bet `check-new-key-coverage` vērtē tikai tās atslēgas, ko PR
pievieno failam `en.json`. Lokalizāciju pakete tiek ģenerēta no tās dienas `en.json`, kad tiek
izveidots tās zars, un tulkošana turpinās vairākas dienas, kamēr pamata zarā tiek pievienotas
jaunas atslēgas; pats paketes PR nepievieno nevienu atslēgu, tādēļ abas saistītās pārbaudes
klusēja, kad 1. pakete (#13044) tika sapludināta ar 43 trūkstošām atslēgām deviņās lokalizācijās
un 2. pakete (#13660) — ar 10 trūkstošām atslēgām astoņās lokalizācijās (2026-09-15). Kļūdu
novērsiet ar `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra`
lapas atslēga nozīmē, ka avotā tā ir noņemta — izdzēsiet to no lokalizācijas. `--warn` ziņo,
neizraisot kļūdu. `--catalog=cli` veic tādu pašu salīdzināšanu direktorijā `bin/cli/locales`
(`npm run i18n:check-keys:cli`); abas darbības atrodas darbā `i18n-ui-coverage`.

#### `check-new-key-coverage` — jauno atslēgu i18n pārbaude

`check-ui-value-drift` saistītā pārbaude. Tā konstatē gadījumu, kad angļu valodas vērtība ir
**pārrakstīta**, bet tās tulkojumi nav atjaunināti; šī pārbaude konstatē gadījumu, kad angļu
valodas atslēga ir **pievienota**, bet dažas lokalizācijas to nekad nav saņēmušas.

`check-ui-keys-coverage` nevar konstatēt šīs kategorijas problēmas: tā katrai lokalizācijai nosaka
procentuālu minimumu, un vienpadsmit trūkstošas atslēgas no ~13 000 saglabā pārklājumu 99,9 %
līmenī. Procentuāls rādītājs katrai valodai nevar izteikt, ka „šis līdzeklis tika izlaists
netulkots” — viss līdzeklis var nonākt jaunā lokalizācijā bez jebkāda teksta, nemaz nemainot šo
skaitli.

Notikums, ko tā kodificē: Orchestration Canvas 3. posmā tā vienpadsmit atslēgas tika iztulkotas
visās 42 tobrīd esošajās lokalizācijās. Dažas stundas vēlāk ES valodu pakete (#13044) palielināja
repozitorija lokalizāciju skaitu līdz 51, un deviņas jaunpienācējas (`el`, `et`, `ga`, `hr`, `lt`,
`lv`, `mt`, `sl`, `sr`) tās nekad nesaņēma. `deepMergeFallback` trūkstošas atslēgas vietā izmanto
angļu valodu, tādēļ problēma izpaudās kā netulkota, nevis tukša lietotāja saskarne — reāla un pēc
uzbūves klusa.

Tāpat kā saistītā pārbaude, arī šī **ņem vērā izmaiņas**, salīdzinot angļu valodu sapludināšanas
bāzē ar darba koku, tādēļ iepriekš pastāvējušie iztrūkumi paliek iesaldēti un pārbaudes
ieslēgšanai nebija nepieciešama migrācija.

**Marķieris `__MISSING__:<english>` to neapmierina (kopš 2026-09-17).** Iepriekš tas bija
dokumentētais atlikšanas mehānisms — izpildlaikā tiek izmantota pareizā angļu valodas vērtība —,
līdz astoņi līdzekļu PR 2026-09-16 pievienoja 61 atslēgu un tulkošanas vietā ievietoja marķieri
visās 65 lokalizācijās: šī pārbaude pieņēma ikvienu no tiem, nekas nebloķēja PR, un bloķējošā
īsto tulkojumu attiecības pārbaude pēc tam neizdevās laidiena galotnē visiem (pt-BR 3,2 % >
2,5 % + 0,5). Marķieris tagad tiek vērtēts kā trūkstošs tulkojums. Kļūdu novērsiet ar
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` vai
visās lokalizācijās paralēli ar `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, drošs lietošanai atvienotā režīmā, atsakās sākt darbu bez
vides mainīgajiem `OMNIROUTE_TRANSLATION_*`). Atslēgai, kurai jāpaliek angļu valodā
(fiksētam produkta, dzinēja vai karoga nosaukumam), jāatrodas failā
`scripts/i18n/untranslatable-keys.json`, un tā nekad nav slēpjama aiz marķiera. `vi` marķieri
aizliedz pilnībā (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — atlikto testu pārbaude

Fails `vitest.config.ts` sarakstā `exclude` ir tests, kas netiek izpildīts, lai gan ikvienam,
kurš aplūko koku, tas izskatās pēc pārklājuma. Aiz komentāra
`// #8618 — iepriekš pastāvoša kļūme; pēc izlabošanas noņemiet šo izņēmumu` bija sakrājušies
sešdesmit divi faili. Problēma #8618 tika aizvērta 2026-08-11, kamēr tās izsekotais saraksts
pieauga no 45 līdz 62 ierakstiem un katrs jaunais ieraksts mantoja komentāru ar atsauci uz
slēgtu problēmu. Kad saraksts beidzot tika pārbaudīts failu pa failam (#13204), **51 no 62
testiem pašreizējā kokā izdevās bez avota koda izmaiņām**.

Pārbaude pieprasa, lai katrs izņēmums, kas norāda uz reālu failu, (a) nosauktu izsekošanas
problēmu un (b) būtu iekļauts failā `config/quality/vitest-exclusions.json` kopā ar tā izmērīto
statusu, lai jauna izņēmuma pievienošana būtu pārskatāma izmaiņa īpaši tam paredzētā failā,
nevis vēl viena rinda 60 ierakstu masīvā. Tā apzināti neizpilda izslēgtos testus atkārtoti —
tas aizņem ~10 minūtes un ir periodiska darba uzdevums; uzskaitē tiek reģistrēts, kad katrs
tests pēdējo reizi tika pārbaudīts.
