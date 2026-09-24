# Quality Gates Reference (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

# Referenca za Quality Gates

Ovaj dokument je mjerodavna referenca za sve CI quality gates u OmniRoute-u.
Opisuje svaku kapiju, šta ona validira, u kojem CI poslu se izvršava, da li koristi
ratchet osnovicu ili politiku prolaza/pada (pass/fail), te da li blokira build ili je samo savjetodavna.

Za kratak sažetak i politiku liste dozvoljenih (allowlist), pogledajte odjeljak „Quality Gates & Ratchets”
u `AGENTS.md`. Za kritičku procjenu, klasifikaciju zrelosti i plan replikacije
istog sistema nezavisan od alata, pogledajte
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventar kontrola (~90 skripti)

Skripte se nalaze u `scripts/check/` (kontrole pravila) i `scripts/quality/` (mehanizam postepenog pooštravanja).
Mjerodavni izvor za CI je `.github/workflows/ci.yml`.

### Brza putanja za PR izdanja (`quality.yml`)

`.github/workflows/quality.yml` se pokreće na PR-ovima usmjerenim na `release/**`. Omogućava nesmetan rad
grana saradnika pomoću brzih kontrola filtriranih prema putanjama, uz jedan savjetodavni signal produkcijskog builda za
izmjene koda:

| Zadatak                                          | Opseg                                                                                                                                                                                                                                  | Blokiranje                                                                                                     |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PR-ovi koda koji nisu skice i grane Mergify reda čekanja; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` sa `OMNIROUTE_USE_TURBOPACK=1`; bez učitavanja artefakta jer ga nijedan naknadni zadatak kvaliteta ne koristi | **Savjetodavno** (`continue-on-error: true`; ukloniti nakon jedne sedmice stabilnih pokretanja PR-ova izdanja) |
| `Docs Gates (fast-path)`                         | PR-ovi dokumentacije/koda; reference API dokumentacije i cjelokupna dokumentacija                                                                                                                                                      | Da                                                                                                             |
| `Fast Quality Gates`                             | PR-ovi koda; statičke provjere, provjera tipova, provjera tipova kontrolne ploče, pogođeni jedinični testovi                                                                                                                           | Da                                                                                                             |
| `Forgotten sibling tests`                        | PR-ovi koda; praćenje izmijenjenih modula do statičkih potrošača i kandidata za srodne testove; putanje barrel modula i dinamičkih importa prijavljuju se kao savjetodavna dijagnostika, uz navedene izuzetke s liste dozvoljenih      | **Savjetodavno**                                                                                               |
| `Vitest (fast-path)`                             | PR-ovi koda; brzi paket vitest testova                                                                                                                                                                                                 | Da                                                                                                             |
| `Unit Tests fast-path`                           | PR-ovi koda; paket jediničnih testova podijeljen u 4 segmenta                                                                                                                                                                          | Da                                                                                                             |
| `No new ESLint warnings`                         | PR-ovi koda; zaštita lint provjere koja uzima u obzir potiskivanja upozorenja                                                                                                                                                          | Da za PR-ove iz vlastitog repozitorija, savjetodavno za forkove                                                |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu skice; sinhronizacija dnevnika izmjena i generisanih vještina                                                                                                                                                         | Da za PR-ove iz vlastitog repozitorija, savjetodavno za forkove                                                |

#### Izvještaj o zaboravljenim srodnim testovima

`npm run check:forgotten-sibling-tests` ponovo koristi razrješivač importa na kojem se zasniva mapa uticaja na testove.
Za svaki izmijenjeni produkcijski modul prijavljuje determinističke lance
`izmijenjeni modul/simbol -> statički potrošač -> kandidat za srodni test` kada kandidat za
test nije prisutan u diffu pull requesta. Markdown sažetak i JSON rezultat čuvaju se kao
artefakt toka rada `forgotten-sibling-tests` radi kalibracije prije bilo kakvog uvođenja blokiranja.

Ponovni izvozi iz barrel modula i dinamički importi služe samo kao dijagnostika razrješavanja; nikada ne stvaraju
blokirajući nalaz. Pregledani izuzeci nalaze se u
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora navesti potrošača i kandidata za
test, dati konkretno obrazloženje i sadržavati poveznicu na GitHub problem ili pull request. Neispravni unosi rezultiraju
odbijanjem. Izuzeci ne mogu potisnuti obrisani kandidat za test niti diff koji dodaje `.skip`/`.todo`;
slabljenje tvrdnji i drugo prikrivanje ostaju u nadležnosti nezavisno blokirajuće
kontrole `check:test-masking`.

### Zadatak: `lint`

Pokreće se na svakom PR-u prema `main`. Blokira spajanje u slučaju neuspjeha.

| Skripta (`npm run ...`)           | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Blokirajuće                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `check:node-runtime`              | Verzija Node.js-a je unutar podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:cycles`                    | Ciklične importe — svi moduli u `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:route-validation:t06`      | Zod šeme prisutne na svim rutama (politika nivoa 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:any-budget:t11`            | Broj pojavljivanja `@ts-expect-error // any` ne premašuje ograničenje (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Da                                           |
| `check:provider-consistency`      | Svaki provider u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar liste dozvoljenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tabele usmjeravanja ostaju usklađene s pohranjenim snimkom životnog ciklusa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne boduje nijedan povučeni id koji `REGISTRY` može usmjeriti; svaki cilj iz `BUILT_IN_ALIASES` prisutan je u `REGISTRY` i nije prisutan u snimku povučenih id-jeva; svaki povučeni id koji je još u `REGISTRY` prosljeđuje se ili je naveden u `allowedRetiredInCatalog`; te se nijedan izvor ili cilj iz `DEFAULT_DEGRADATION_MAP` ne pojavljuje kao povučen u tom snimku. Ovo ne dokazuje da se model trenutno poslužuje putem aktivnog upstream servisa. Vanmrežno — poredi se s `config/quality/model-lifecycle.json`, koji se ručno osvježava pomoću `npm run quality:refresh-model-lifecycle` (mreža; nije uključen u CI). `allowedRetiredInCatalog` je jednosmjerna kontrola postepenog smanjenja: unos dodajte samo uz prateći issue. | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom `src/` razrješava se na stvarni `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Da                                           |
| `check:deps`                      | Sve zavisnosti koje se mogu instalirati pomoću `npm install` u svakom `package.json` u repozitoriju nalaze se u `dependency-allowlist.json`; novi paketi bez fiksirane verzije ili paketi koji imitiraju nazive legitimnih paketa označavaju se                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `audit:deps`                      | `npm audit` (korijenski direktorij + electron) — nema upozorenja visoke/kritične ozbiljnosti (preklapa se s osv `check:vuln-ratchet`; pogledajte Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:lockfile`                  | Integritet datoteke `package-lock.json` — https registar, sažeci integriteta, bez zamjena hostova                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:licenses`                  | Lista dozvoljenih SPDX licenci za produkcijske zavisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:tracked-artifacts`         | Nema artefakata izgradnje / evidentiranih `node_modules` simboličkih veza (pokreće se i u husky pre-commit koraku; pre-push je namjerno jednostavan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:ai-attribution`            | Nema AI/bot `Co-Authored-By` završnog retka niti podnožja o AI generisanju u PR commitovima, naslovu ili tijelu — Strogo pravilo #16 (u `quality.yml` petlji brzih provjera za PR→`release/**` — čita sadržaj događaja i ne radi ništa izvan PR-ova — te kao korak samo za PR u `ci.yml` provjeri koda za PR→`main`; također i husky `commit-msg` hook; ljudski koautori su dozvoljeni; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:vitest-exclusions`         | Svako Vitest izuzimanje navodi prateći problem i nalazi se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:file-size`                 | Nijedna datoteka izvornog koda ne premašuje ograničenje za svoju ekstenziju (postepeno ograničenje: velike datoteke zamrznute na listi `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:error-helper`              | Odgovori o greškama u izvršiteljima/rukovateljima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (Strogo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:migration-numbering`       | Migracijske SQL datoteke su numerisane redom, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth `client_id`/`client_secret` vrijednosti ni Firebase Web ključeva izvan `publicCreds.ts` (Strogo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:db-rules`                  | Nema sirovog SQL-a izvan modula `src/lib/db/`; nema zbirnih uvoza iz `localDb.ts` (Stroga pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                           |
| `check:known-symbols`             | Izvršioci pružalaca usluga, strategije usmjeravanja i prevodioci registrirani u svojim tabelama za otpremu odgovaraju datotekama na disku — nema nepovezanih ni nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasificirana je pomoću `isLocalOnlyPath()` (Stroga pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:test-discovery`            | Svaku datoteku `*.test.ts` / `*.spec.ts` u repozitoriju prikuplja najmanje jedan pokretač testova (mehanizam zapornog točka: lista nepovezanih datoteka u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:agent-skills-sync`         | Generirani agent-skills artefakti odgovaraju svom izvornom katalogu (nema odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Logotipi/resursi pružatelja imaju zabilježen unos o porijeklu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON konfiguracijske datoteke se ispravno parsiraju i zadovoljavaju pravila lintanja repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | TypeScript kompilacija bez grešaka (samo savjetodavna upozorenja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjeren na budućnost; mnogim postojećim mjestima poziva i dalje su potrebne anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Savjetodavno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — pažljivo odabrana lista od 27 datoteka u `typecheck:core` ne uključuje nijedan dashboard TSX, a ni `next build` ga nikada ne provjerava po tipovima (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije napuštenih identifikatora tamo (#6625/#6909) bile nevidljive CI-ju. Razlike se porede sa zamrznutom početnom vrijednošću broja grešaka po datoteci i TS kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac provođenja za zastarjele stavke kao kod `check:known-symbols`) — samo NOVE greške iznad početnog broja uzrokuju pad provjere; postepeno smanjujte početnu vrijednost pomoću `--update` kada se ispravi postojeća greška.                                                                                                                                                 | Da                                           |

### Zadatak: `quality-gate`

Pokreće se nakon `test-coverage`. Blokira spajanje u slučaju neuspjeha.

| Skripta                      | Provjerava                                                                                                                                                                        | Blokirajuće                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `quality:collect`            | Generira `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz objedinjenog izvještaja fragmenata)                                                                       | Da (prethodi mehanizmu ratchet) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ početna vrijednost; pokrivenost ≥ početna vrijednost)                                              | Da                              |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne prelazi početnu vrijednost iz `quality-baseline.json`                                                                                              | Da                              |
| `check:complexity`           | Ciklomatska složenost na nivou datoteke ne prelazi ograničenje (osnovni ESLint `complexity` + `max-lines-per-function`)                                                           | Da                              |
| `check:cognitive-complexity` | Ratchet kognitivne složenosti (`eslint-plugin-sonarjs`) — zasebno ESLint izvršavanje; CI oba objedinjuje u jedan korak `check:complexity-ratchets`                                | Da                              |
| `check:dead-code`            | Ratchet nekorištenih izvoza / datoteka (knip) ne nazaduje u odnosu na početnu vrijednost                                                                                          | Da                              |
| `check:compression-budget`   | Budžet benchmarka kompresije — minimalne uštede tokena po mehanizmu ne smiju nazadovati                                                                                           | Da                              |
| `check:type-coverage`        | Ratchet procenta tipiziranog koda (`type-coverage`) ne nazaduje; uglavnom obuhvata `typecheck:noimplicit:core`                                                                    | Da                              |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne nazaduje (očitava putem `gh api`; uredno preskače bez tokena) — učestalost osvježavanja i ručno pokretanje: pogledajte „CodeQL ratchet“ ispod | Da                              |

### Zadatak: `quality-extended`

Cijeli zadatak je savjetodavan (`continue-on-error: true`). Ratchet provjere zasnovane na npm-u
izvršavaju se stvarno; vanjski skeneri instaliraju se putem `gh release download` i samostalno
preskaču izvršavanje (exit 0) kada binarna datoteka još uvijek nije prisutna.

| Skripta                  | Provjerava                                                                                                                                                                                                             | Blokirajuće      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check:circular-deps`    | Nema kružnih zavisnosti (dpdm)                                                                                                                                                                                         | **Savjetodavno** |
| `check:bundle-size`      | Veličina paketa ne prelazi ograničenje                                                                                                                                                                                 | **Savjetodavno** |
| `check:secrets`          | Skeniranje tajni (gitleaks) — preskače se ako binarna datoteka nije prisutna                                                                                                                                           | **Savjetodavno** |
| `check:vuln-ratchet`     | Ranjivosti zavisnosti (osv-scanner) ne nazaduju — preskače se ako binarna datoteka nije prisutna                                                                                                                       | **Savjetodavno** |
| `check:workflows`        | Provjera radnih tokova (actionlint + zizmor) — preskače se ako binarne datoteke nisu prisutne                                                                                                                          | **Savjetodavno** |
| `check:openapi-breaking` | Nekompatibilne promjene javnog API ugovora (`openapi.yaml`) u odnosu na osnovnu granu (oasdiff) — generira `openapiBreaking=N`; preskače se ako oasdiff nije prisutan ili se osnovna specifikacija ne može razriješiti | **Savjetodavno** |

### Zadatak: `docs-sync-strict`

Izvršava se za svaki PR prema grani `main`. Blokira spajanje u slučaju neuspjeha.

| Skripta                        | Provjerava                                                                                                                                                                               | Blokirajuće                   |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Meta-kontrola koja redom pokreće 6 podkontrola navedenih ispod                                                                                                                           | Da                            |
| ↳ `check:docs-sync`            | Usklađenost verzija u CHANGELOG-u / OpenAPI-ju / llm.txt                                                                                                                                 | Da                            |
| ↳ `check:docs-counts`          | Brojevi u tekstu (broj pružalaca, broj migracija itd.) nalaze se unutar zateznog raspona stvarnih vrijednosti                                                                            | Da                            |
| ↳ `check:env-doc-sync`         | Svaka varijabla okruženja u `.env.example` dokumentovana je u tabeli dokumentacije i obrnuto                                                                                             | Da                            |
| ↳ `check:deprecated-versions`  | U dokumentaciji nema zastarjelih oznaka verzija                                                                                                                                          | Da                            |
| ↳ `check:doc-links`            | Interne markdown poveznice u dokumentaciji upućuju na stvarne datoteke (oblik `[tekst]`/`(putanja)`)                                                                                     | Da                            |
| ↳ `check:fabricated-docs`      | Rute, varijable okruženja, CLI naredbe, nazivi hookova i putanje datoteka navedeni u dokumentaciji postoje u bazi koda. Stroga kontrola putem `--strict`; bez te opcije samo upozorenje. | Da (putem `--strict` u CI-ju) |
| `check:cli-i18n`               | Nizovi CLI naredbi prisutni su u svim i18n datotekama lokalizacije                                                                                                                       | Da                            |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva najmanje postepeno povećavani donji prag stvarnih ruta                                                                                                     | Da                            |
| `check:openapi-security-tiers` | Oznake sigurnosnih nivoa u `openapi.yaml` usklađene su s klasifikacijama u `routeGuard.ts`                                                                                               | **Savjetodavno**              |
| `check:openapi-routes`         | Svaka putanja u `openapi.yaml` upućuje na stvarni `route.ts` (sprečavanje halucinacija)                                                                                                  | Da                            |
| `check:docs-symbols`           | Svaka `/api/...` referenca u `docs/**/*.md` upućuje na stvarni `route.ts` (sprečavanje halucinacija)                                                                                     | Da                            |
| `i18n translation drift`       | Neprevedeni ključevi u i18n datotekama lokalizacije — samo upozorenje                                                                                                                    | **Savjetodavno**              |

### Zadatak: `i18n-ui-coverage`

| Skripta                             | Provjerava                                                                                                                                                                                                               | Blokirajuće      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `check-ui-keys-coverage` (ugrađeno) | Pokrivenost UI i18n ključeva iznosi ≥ 65%                                                                                                                                                                                | Da               |
| `check-ui-value-drift` (ugrađeno)   | Prepravljena engleska **vrijednost** ne ostavlja za sobom nijedan zastarjeli prijevod                                                                                                                                    | Da               |
| `check-new-key-coverage` (ugrađeno) | **Novi** engleski ključ preveden je u svakoj lokalizaciji — oznaka `__MISSING__:` se odbija                                                                                                                              | Da               |
| `check-translation-ratio`           | Omjer stvarnih prijevoda po lokalizaciji (stavke identične engleskom / rezervirana mjesta / nedostajuće stavke izvan liste dozvoljenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + toleranciju | **Savjetodavno** |

Zahtijeva `fetch-depth: 0` — kontrola odstupanja vrijednosti poredi `en.json` s bazom spajanja.

#### `check-ui-value-drift` — kontrola zastarjelih prijevoda

Otkriva onu i18n regresiju koju ostale kontrole strukturno ne mogu uočiti: engleska vrijednost
se prepravi, a prijevodi izvedeni iz _prethodnog_ engleskog teksta ostanu nepromijenjeni, pa
korisnici koji ne koriste engleski nastavljaju čitati samouvjereno formuliran, ali sada netačan tekst.

Ovo se zaista našlo u izdanju. `oauthModal.googleOAuthWarning` je prepravljen kada je uveden Antigravity
pomoćnik za prijavu (#5203); **39 od 43 lokalizacije** zadržalo je tekst koji operaterima govori da „kopiraju
cijeli URL i zalijepe ga ispod” — tok koji se za tog pružaoca ne može dovršiti. To je
ostalo neprimijećeno sve do #8463 jer:

- `sync-ui-keys` dopunjava samo ključeve koji **nedostaju**, nikada one koji su **zastarjeli**;
- `check-ui-keys-coverage` broji _prisutnost_ ključeva, pa se zastarjeli prijevod računa kao pokriven;
- `check-translation-drift` prati dokumentacijske kopije `docs/i18n/<locale>/**.md` —
  nikada ne čita `src/i18n/messages/*.json`. Blokirajuće u zadatku `docs-sync-strict` od
  ponovne sinhronizacije 2026-09: uredite osnovni dokument → `npm run i18n:run -- --files=<doc>` (na nivou odjeljka, jeftino).

**Svjestan razlika, bez oslanjanja na početno stanje.** Poredi `en.json` na bazi spajanja s
radnim stablom; za svaki ključ čija je engleska vrijednost promijenjena, svaki lokalitet koji još uvijek sadrži
neizmijenjen prijevod smatra se zastarjelim. Time se namjerno **zamrzava postojeći dug** — razlika
ne može otkriti iz koje je stare engleske vrijednosti nastao dugotrajni prijevod, pa kontrola procjenjuje
samo ono što trenutna izmjena dotiče. Alternativa (početno stanje hash vrijednosti po ključu) zahtijevala bi
generiranu datoteku od ~600 KB, 3× veću od najvećeg postojećeg početnog stanja, koja bi se mijenjala pri svakom i18n PR-u.

Postoje dva načina da se kontrola zadovolji:

1. ažurirajte zahvaćene prijevode ili
2. postavite ih na `__MISSING__:<novi engleski tekst>` — izvršno okruženje tada poslužuje ispravljeni engleski
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ se stavlja u red za prijevod.

Ako se promijenilo **značenje** niza, poželjno je **preimenovati ključ**: novi ključ ne može naslijediti
zastarjeli prijevod. To je obrazac korišten u #8463.

```bash
npm run i18n:check-value-drift          # strogo (ono što CI pokreće)
npm run i18n:check-value-drift:warn     # samo izvještaj
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Završava s kodom 0 i porukom `SKIP reason=base-unresolved` kada se osnovni katalog ne može pročitati (plitki
klon bez osnovne reference), po uzoru na `check-openapi-breaking`.

### Posao: `i18n`

Potpuna matrica i18n provjere (jedan posao po lokalitetu). Cijeli posao je savjetodavan.

| Skripta                         | Provjerava                        | Blokiranje                                                   |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Potpunost prijevoda po lokalitetu | **Savjetodavno** (`continue-on-error: true` za cijeli posao) |

### Posao: `pr-test-policy`

Pokreće se samo za zahtjeve za povlačenje.

| Skripta                | Provjerava                                                                                                                                        | Blokiranje |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| `check:pr-test-policy` | PR-ovi koji mijenjaju produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključivati ili ažurirati testove (Strogo pravilo #8) | Da         |
| `check:test-masking`   | Izmijenjene testne datoteke ne smanjuju neto broj provjera niti dodaju tautologije `assert.ok(true)`                                              | Da         |
| `check:pr-evidence`    | Tijelo PR-a navodi dokaze testiranja/VPS-a za izmjenu (automatizira Strogo pravilo #18 pretraživanjem teksta PR-a — krhko, pogledajte zaostatke)  | Da         |

### Posao: `test-vitest`

Pokreće se nakon `build`. Blokira spajanje u slučaju neuspjeha.

| Paket testova    | Provjerava                                                        | Blokiranje                                                                                                            |
| ---------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 alata), autoCombo, predmemorija — vitest pokretač | Da                                                                                                                    |
| `test:vitest:ui` | Testovi UI komponenti — vitest pokretač                           | **Blokira** — postojeći neuspjesi izričito su isključeni u `vitest.config.ts`; novi neuspjesi uzrokuju neuspjeh posla |

### Noćni radni tokovi (zakazani, savjetodavni)

Pokreću se prema cron rasporedu (i putem `workflow_dispatch`), nikada za PR-ove. Svi su savjetodavni.

| Radni tok              | Provjerava                                                                                                                                                                 | Blokiranje       |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | fast-check testovi svojstava s nasumičnim početnim brojem + velikim brojem pokretanja                                                                                      | **Savjetodavno** |
| `nightly-resilience`   | kontrola rasta hrpe, haotično ubrizgavanje grešaka, k6 testiranje opterećenja/izdržljivosti                                                                                | **Savjetodavno** |
| `nightly-llm-security` | promptfoo zaštita od ubrizgavanja (režim blokiranja) + garak sonde (preskaču se bez tajne pružatelja usluge)                                                               | **Savjetodavno** |
| `nightly-schemathesis` | Fuzz testiranje OpenAPI ugovora (schemathesis) nad aktivnim OmniRouteom koristeći `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene greške 500 (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Rezultat Stryker mutacijskog testiranja u brzoj traci jediničnih testova — preživjeli mutanti ukazuju na slabe provjere                                                    | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti Node pogona kroz podržane raspone `engines.node`                                                                                                   | **Savjetodavno** |

---

## Faza brzine (2026-08-30 → v4.0 LTS): svaka osnovna vrijednost (baseline) opuštena za 20%

Odluka vlasnika (2026-08-30): do modularizacije v4.0, brzina isporuke je važnija od održavanja granice duga. Svaka **numerička** osnovna vrijednost (ratchet baseline) je opuštena za 20% u jednom revizibilnom prolazu, a faza je deklarisana u `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Šta je promijenjeno                                                                                                                                                                                              | Gdje                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — brojači gdje je manje bolje ×1.2, procenti gdje je više bolje ÷1.2 (donja granica pokrivenosti 60 zadržana, `eslintErrors` ostaje 0, `eslintWarnings` 0 → 20% od zamrznutog broja supresija) | `quality-baseline.json` (`_relax_velocity_2026_08_30` napomena navodi svako prije → poslije)           |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                 | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, svako `frozen[*]` / `testFrozen[*]` ograničenje linija ×1.2                                                                                                                                    | `file-size-baseline.json`                                                                              |
| brojači po datoteci / po TS kodu ×1.2                                                                                                                                                                            | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                              | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` postaje savjetodavno dok je `_policy.requireTighten === false`                                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| noćne `bank-ratchet-shrinks` pauze (to bi deponovalo izmjereno smanjenje i poništilo slobodan prostor)                                                                                                           | `.github/workflows/nightly-release-green.yml`                                                          |

Liste dozvoljenih (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nisu** budžeti i nisu dirane. Kapije politike prolaza/pada (tajne, SQL pravila, ugovor o dokumentaciji/okruženju, i18n paritet, jedinični testovi) su nepromijenjene — crveni test je i dalje crveni test.

**Alati**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednokratno opuštanje (`scripts/quality/relax-baselines.mjs`); odbija da se pokrene dvaput sa istom napomenom.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` — mjeri svaku numeričku kapiju na način na koji to radi CI i ispisuje preostali slobodan prostor (headroom) po kapiji (`scripts/quality/baseline-headroom.mjs`). Noćni `baseline-headroom` posao objavljuje tabelu u aktivnom issue-u **📈 Baseline headroom (velocity phase)** i dodaje oznaku `headroom-alert` kada je bilo koja kapija unutar 10% svog ograničenja ili već preko njega. Taj issue je rano upozorenje: budžet koji se popuni za nekoliko dana znači da opuštanje troši nekoliko PR-ova, a ne cijeli tim — pogledajte `_rebaseline_*` napomene problematične kapije.

**Režim novog koda (Clean-as-You-Code) — od 2026-08-30, samo za brzi put PR-a**

Na `pull_request` događajima `quality.yml` prosljeđuje `--base-ref <PR base SHA>` u `check:file-size`,
`check:complexity-ratchets` i `check:dead-code`. U tom režimu kapija poredi HEAD sa merge-base-om **ograničeno na datoteke koje je PR dotakao** (`scripts/check/newCodeMode.mjs`: merge-base se materijalizuje u privremenom `git worktree`-u, ESLint/knip se pokreću tamo i na HEAD-u, brojači po datoteci se upoređuju):

- **blokiranje** — PR je dodao ciklomatska/kognitivna kršenja ili mrtve izvoze u datotekama koje je promijenio
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` u logu);
- **savjetodavno** — globalni total naspram zamrznute osnovne vrijednosti. Naslijeđeno odstupanje (drift) nikada ne uzrokuje pad (crvenu boju) nevinog PR-a; odstupanje se ponovo zamrzava pri usklađivanju izdanja i prati ga headroom posao.

`workflow_dispatch` pokretanja, release-green provjera i noćni headroom posao nemaju PR bazu i zadržavaju apsolutno (globalno) poređenje. Pokrivenost, duplikacija i pokrivenost tipovima ostaju globalni za sada (njihovi alati ne proizvode diff po datoteci jeftino) — kandidati za isti tretman.

**Zatvaranje faze na v4.0 (LTS = strože nego prije, ne "povratak u normalu")**

1. Na čistom `release/v4.0.0` tipu: `npm run quality:headroom --json` radi evidencije, a zatim
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, za svaku typecheck gate
   `--update` — svaki baseline se spušta na izmjerenu vrijednost.
2. Obrišite `_policy` iz `quality-baseline.json` (ponovo aktivira `--require-tighten` i nightly
   banking), vratite `THRESHOLD = 36` (ili više) u `check-openapi-coverage.mjs`.
3. Pooštrite izvan izmjerene vrijednosti tamo gdje je modularizacija donijela rezultate: `cap` za file-size
   vratite na 1000 (ili 800), coverage podovi +5, 0 dead exports za modularizovane pakete.

## Ratchet osnova (`quality-baseline.json`)

Ratchet mehanizam (`scripts/quality/check-quality-ratchet.mjs`) čita `quality-baseline.json`
i upoređuje ga sa svježe prikupljenim `quality-metrics.json`. Svaka metrika koja regresira
izvan svoje epsilon vrijednosti uzrokuje neuspjeh build-a.

Trenutno praćene metrike:

| Metrika               | Smjer  | Značenje                              |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Broj ESLint upozorenja ne smije rasti |
| `coverage.statements` | `up`   | Pokrivenost naredbi ne smije opasti   |
| `coverage.lines`      | `up`   | Pokrivenost linija ne smije opasti    |
| `coverage.functions`  | `up`   | Pokrivenost funkcija ne smije opasti  |
| `coverage.branches`   | `up`   | Pokrivenost grana ne smije opasti     |

Za ažuriranje osnove nakon stvarnog poboljšanja:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flag `--update` upisuje trenutno izmjerene vrijednosti u `quality-baseline.json`.
Commit-ujte ovu datoteku zajedno sa izmjenom koja je poboljšala metriku. PR koji poboljšava
metriku bez ažuriranja osnove će biti uhvaćen pomoću `--require-tighten` (Faza 6A.5,
implementacija na čekanju).

### CodeQL ratchet: učestalost osvježavanja i ručno pokretanje

`check:codeql-ratchet` čita **stanje repozitorija, osvježeno prema rasporedu — ne po PR-u.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` prijavljuje
`state: configured`, `schedule: weekly`: GitHub-ovo skeniranje putem 'default-setup', a ne
analiza po push-u. Posljedica: nakon što se PR koji POPRAVLJA upozorenja merge-uje,
ratchet nastavlja čitati stari, veći broj sve dok se ne pokrene sljedeće zakazano skeniranje
— tako da prijavljuje regresiju na svakom otvorenom PR-u, uključujući i naknadne izmjene
samog PR-a koji vrši popravku, sve dok skeniranje ne sustigne stanje.

**Ručno osvježavanje**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ponovo pokreće
analizu i ponovo objavljuje upozorenja u roku od nekoliko minuta. Prvo pročitajte
`.github/workflows/codeql.yml` — njegovo zaglavlje objašnjava da je samo za
`workflow_dispatch` **zato što je u sukobu sa GitHub-ovim "default setup-om"**
(`CodeQL analize iz naprednih konfiguracija se ne mogu obraditi kada je omogućen 'default setup'`).
Vraćanje `push`/`pull_request`/`schedule` okidača zahtijeva **prvo akciju vlasnika**:
Settings → Code security → CodeQL: Default → Advanced. Nemojte dodavati `schedule:`
okidač bez tog prekidača — to će samo proizvesti neuspješna pokretanja.

**Postrožite osnovu nakon što broj opadne** — `node scripts/check/check-codeql-ratchet.mjs
--update` upisuje novi izmjereni broj u `quality-baseline.json` →
`metrics.codeqlAlerts.value`, tako da ratchet ne dozvoli tiho regresiju nazad do starog
limita. Primjer iz prakse (2026-09-02/03): PR #12502 popravio 7 stvarnih upozorenja
(13 → 6 izmjerenih otvorenih); PR #12530 postrožio zamrznutu osnovu sa 11 na 6 kako bi se
podudarala; preostalih 6 je zatim odbačeno uz obrazloženje za svako upozorenje, sve do 0 otvorenih.

**Odbacivanja su odluka operatera (Strogo pravilo #14)** — nikada ne odbacujte CodeQL
upozorenje bez bilježenja tehničkog obrazloženja u komentaru odbacivanja: `won't fix` za
zahtjev upstream protokola, `used in tests` za test fixture, `false positive` za
sanitizer koji CodeQL ne može vidjeti (presedan: `docs/security/ERROR_SANITIZATION.md`).

---

## Politika ponovnog pokretanja testova (WS5.4, v3.8.49)

Ponovno pokretanje se vrši po pokretaču (runner), nikada kao globalna mjera — globalno ponovno pokretanje pretvara stvarne regresije u nevidljive nestabilne testove (flakes):

| Pokretač (Runner) | Politika                                                                                                                                           | Zašto                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e)  | `retries: 1` samo u CI, sa `trace: on-first-retry`                                                                                                 | Vrijeme preglednika/mreže je istinski nedeterminističko; jedan ponovni pokušaj sa tragom (trace) pretvara nestabilan test u dijagnostički artefakt |
| Vitest            | NEMA globalnog ponovnog pokretanja. Dokazano nestabilan test dobija eksplicitno ponovno pokretanje po testu (vidljivo u diff-u, pregledano u PR-u) | Čuva listu karantina u repozitorijumu, nikada nije neprozirno                                                                                      |
| node:test (unit)  | NIKADA nema ponovnog pokretanja                                                                                                                    | Nestabilan jedinični test je greška u testu — popravite ga, nemojte ga ponovo pokretati                                                            |

Ciljani SLO-ovi kada se implementira telemetrija nestabilnosti (WS5.2/5.3): <1% stopa nestabilnosti po testu (prag "popravi odmah"), ≥95% stopa prolaznosti po cjevovodu (pipeline). Industrijske referentne vrijednosti — rekalibrirajte prema našim vlastitim mjerenjima.

## Odstupanje mehanizma kontrole (Ratchet Drift) na nivou izdanja (WS5.5, v3.8.49)

Kada mehanizam kontrole (veličina datoteke, složenost, eslint upozorenja) regresira na ČISTOM vrhu izdanja (release tip) — tj. KOMBINACIJA spajanja (merges) ga je dovela do regresije, a nijedan pojedinačni PR ne reproducira regresiju na svojoj grani — popravka pripada kapetanu izdanja (release captain), jednom, na grani izdanja: preferirajte ekstrakciju/refaktorisanje; ponovno baziranje (rebaseline) vršite samo uz dokumentovani unos opravdanja. Nikada ne gurajte kombinovano odstupanje na PR saradnika, i nikada ne vršite ponovno baziranje po PR-u (to skriva stvarne regresije). Prvo napravite razliku: reproducirajte crveno stanje (red) u odnosu na čisti vrh u probnom radnom stablu (probe worktree) prije nego što pretpostavite da ga je vaš PR uzrokovao.

## Grupisanje smanjenja mehanizma kontrole (Banking Ratchet Shrinks) — smjer prema dolje (#8584)

Mehanizam kontrole je samo napola automatski, i to je pogrešna polovina. **Povećanje** ograničenja (cap) je ručna JSON izmjena koja traje deset sekundi i najbrži je način za deblokadu crvenog PR-a. **Smanjenje** zahtijeva da neko pokrene `--update` i commituje rezultat — i sve dok posao `bank-ratchet-shrinks` nije implementiran, nijedan radni tok ga nije pokretao. Izmjerena posljedica (2026-07-25): 18 zamrznutih datoteka već na ili ispod ograničenja od 800 linija za nove datoteke, najgora na 132× (`src/shared/validation/schemas.ts`, 19 linija koje nose ograničenje od 2,523); gornja granica složenosti se pomjerila `1794 → 2169` kroz ~37 bilješki o ponovnom baziranju sa tačno jednim smanjenjem (−1); i "zategni putem `--update` u sljedećem ciklusu" napisano 31 put, a ispoštovano jednom. Ograničenje koje nadživi kod koji ga je zaslužio tiho pretvara svaku završenu dekompoziciju u dozvolu za rast za bilo koga ko sljedeći uređuje datoteku.

`nightly-release-green.yml` → posao **`bank-ratchet-shrinks`** zatvara tu petlju:

|               |                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------ |
| Pokreće se na | `schedule` (3×/dnevno) + `workflow_dispatch` — namjerno **NE** na `push`                                     |
| Mjeri         | najviši `release/vX.Y.Z`, ista rezolucija + zaštita od injekcije kao `release-green`                         |
| Piše          | `check:file-size --update` i `check:complexity-ratchets --update` (oba su samo za smanjenje po konstrukciji) |
| Verifikuje    | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                     |
| Isporučuje    | jedan uvijek aktuelan PR u odnosu na granu izdanja — prisilno ažuriran, nikada spaman                        |

Grupisanje (Banking) se koristi umjesto rada po push-u jer nema zahtjeva za latencijom (smanjenje bankirano unutar 8h je u redu), dok bi pokretanje po spajanju (per-merge) ponovo gradilo PR granu tokom kampanja spajanja i plaćalo puni ESLint prolaz svaki put. Detekcija ostaje na push-u (`release-green`); samo se grupisanje (banking) vrši serijski.

### Sigurnosni verifikator

Posao piše u osnovne vrijednosti (baselines) bez nadzora, pa je `verify-ratchet-bank.mjs` ono što to čini prihvatljivim. On upoređuje (diffs) stablo nakon `--update` sa `HEAD` i **prekida posao prije nego što postoji bilo kakav commit** — ne otvarajući PR — osim ako je svaka promjena jedna od:

- numerički unos `frozen` / `testFrozen` **smanjen** ili **uklonjen**
- `complexity-baseline.json` → `count` **smanjen**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **smanjen**

Sve ostalo ne uspijeva: povećanje broja, dodavanje unosa, promjena `cap`/`testCap`, ili brisanje/prepisivanje `_rebaseline_*` bilješke (te bilješke su revizijski trag zašto svaka gornja granica postoji i pohranjene su unutar istog `frozen` objekta kao i unosi datoteka). Bot koji bi mogao povećati ograničenje bio bi strogo gori od statusa quo. Regresijska zaštita: `tests/unit/verify-ratchet-bank.test.ts`.

Posao nikada ne gura (push) na `release/*` — čovjek spaja PR, tako da loše mjerenje ne može dospjeti bez pregleda.

## Politika liste dozvoljenih (Allowlist Policy)

Svaka kapija koja ne može pasti zbog već postojećih kršenja koristi zamrznutu listu dozvoljenih
(npr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika je:

**Otklonite osnovni uzrok; koristite listu dozvoljenih samo kada je kršenje već postojeće i
ne može se popraviti u istom PR-u.**

Kada dodajete unos na listu dozvoljenih:

1. Uključite komentar sa obrazloženjem.
2. Referencirajte problem praćenja (npr. `// #3498 — Funkcionalnost faze 2, još nije implementirana`).
3. Uklonite unos u istom PR-u koji popravlja kršenje — zastarjeli unos koji više ne
   potiskuje aktivno kršenje je sam po sebi defekt (6A.3 stale-enforcement će oboriti
   kapiju na napuštenom unosu liste dozvoljenih kada se implementira).

Nemojte **dodavati** unose na listu dozvoljenih da bi testovi brže prolazili. Zelena kapija sa rastućom
listom dozvoljenih je lažni osjećaj kvaliteta.

### Kada kapija padne na vašem PR-u

1. **Pažljivo pročitajte izlaz kapije** — on vam tačno govori koji fajl ili simbol je prekršio
   pravilo.
2. **Popravite kršenje** — većina kapija su determinističke provjere sistema datoteka koje prolaze čim je kod ispravan.
3. **Ako je kršenje već postojeće** (tj. niste ga vi uveli, ali ga kapija sada pokriva): dodajte unos na listu dozvoljenih sa komentarom obrazloženja i problemom praćenja.
4. **Ako je kapija ratchet** (pokrivenost, ESLint upozorenja, duplikacija, kompleksnost):
   vaša izmjena je pogoršala metriku. Popravite osnovni problem, ili (rijetko) pokrenite
   `npm run quality:ratchet -- --update` ako je izmjena namjerna i degradacija metrike
   prihvatljiva — ali dokumentujte zašto u opisu PR-a.
5. **Savjetodavne kapije** (`continue-on-error: true`) su informativne — one ne blokiraju
   spajanje (merge), ali se pojavljuju u CI sažetku. Svejedno ih popravite.

---

## Dodavanje nove kapije

1. Kreirajte `scripts/check/check-<name>.mjs` (ili `.ts`). Kapije politike izlaze sa 0/1.
   Kapije tipa ratchet emituju metriku u `quality-metrics.json` putem `collect-metrics.mjs`.
2. Dodajte `"check:<name>": "node scripts/check/check-<name>.mjs"` u `package.json`.
3. Povežite je u `.github/workflows/ci.yml` pod odgovarajućim poslom
   (policy → `lint` ili `docs-sync-strict`; ratchet → `quality-gate`).
4. Ako ima listu dozvoljenih, primijenite `reportStaleEntries()` iz
   `scripts/check/lib/allowlist.mjs` tako da se zastarjeli unosi automatski detektuju.
5. Napišite test u `tests/unit/build/` koji pokriva logiku detekcije kapije.
6. Ažurirajte ovaj dokument (dodajte red u relevantnu tabelu poslova).

---

## Alati za agente: LSP-u-petlji (opciono)

Pored CI kapija, OmniRoute isporučuje **opcionu** `agent-lsp` skelu
(projektnu datoteku `.mcp.json`, Faza 7 Zadatak 15). Kreirajte `.mcp.json`
da izložite TypeScript jezički server agentima za kodiranje, tako da oni razriješe simbole /
dijagnostiku **prije** pisanja koda — pratilac "kompajliraj-prije-zahtjeva" za
`typecheck:core` koji siječe greške "izmišljenih simbola" u korijenu. Namjerno
nije automatski učitan (vi birate i verifikujete MCP↔LSP most); neispravan unos samo bilježi grešku konekcije i nikada ne prekida sesije.

---

## Backlog racionalizacije (ROI pregled — Faza 9 Talas 3)

Ovaj inventar je usklađen sa `ci.yml` dana 17.06.2026. (prethodna verzija je izostavila `audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`, `check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`, `check:codeql-ratchet`, `check:pr-evidence`). ROI pregled usklađenog skupa identifikovao je sljedeće kandidate za racionalizaciju. **Spajanja su mehaničke CI izmjene; promjene/odbacivanja su odluke o politici rezervisane za operatera.** Ništa od navedenog još nije primijenjeno.

**Također, gore nije dokumentovano** (savjetodavno, nizak signal): `docs-lint` posao (markdownlint + Vale, cijeli posao `continue-on-error`) i samostalni radni tokovi skenera `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` se nalazi u `quality-baseline.json`, ali nije povezan sa blokirajućim ratchet-om u `ci.yml` — metrika je trenutno bez vlasnika.

### Spajanje / dedup (mehaničko, manji rizik)

Svaki kandidat je validiran u odnosu na stanje "live gate" na dan 17.06.2026. (povjerenje-ali-provjera); nekoliko "očiglednih" spajanja se ispostavilo da skrivaju dug i **nisu** čiste zamjene.

- **`check:docs-sync` se pokreće dvaput** — samostalno u `lint` poslu i ponovo unutar `check:docs-all` (`docs-sync-strict`) i husky pre-commit hook-a. ✅ **GOTOVO** — samostalna `lint` invokacija uklonjena.
- **CVE skeniranje** — ❌ **NIJE čisto spajanje.** `audit:deps` strogo pada na bilo kojem visokom/kritičnom CVE-u; `check:vuln-ratchet` (osv) pada samo na _regresiji_ u odnosu na osnovnu vrijednost (trenutno 1 MODERATE). Različita semantika — odbacivanje `audit:deps` bi značilo gubitak apsolutne visoke/kritične kapije. Zadržati oba.
- **Detekcija ciklusa** — ❌ **NIJE čisto spajanje.** `check:circular-deps` (dpdm) prijavljuje **91 ciklus** (zato je savjetodavno); ne može se promovisati u blokirajuće bez prethodnog rješavanja, a ima širi obim od zelenog, kuriranog `check:cycles`. Zadržati `check:cycles` kao blokirajući; rješavanje 91 dpdm ciklusa je poseban zaostatak.
- **Kompleksnost** — ✅ **GOTOVO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedan ESLint prolaz, broji po ruleId tako da ciklomatske+max-lines i kognitivne osnovne vrijednosti ostaju nezavisne; pojedinačni `check:complexity` / `check:cognitive-complexity` ostaju za lokalni `--update`.
- **`/api` anti-halucinacija** — ✅ **GOTOVO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jedan FS inventar `src/app/api`, openapi-routes + docs-symbols i dalje izvještavaju nezavisno; pojedinačni ostaju za lokalna pokretanja.
- **`check:node-runtime` se pokreće u 11 poslova** — ⚠️ **nizak ROI.** Svaki je poseban runner i provjera traje <1s; ukupne uštede ~10s, naspram gubitka jeftine zaštite po poslu. Nije vrijedno truda.
- **`typecheck:noimplicit:core` na CI lint-u** — ✅ **uklonjeno iz lint posla** (bilo je savjetodavno `continue-on-error`); blokirajuća površina tipova je `typecheck:core` + `check:type-coverage`. Lokalna skripta zadržana.

### Promjena / odluka (politika operatera)

- `check:openapi-security-tiers` (savjetodavno) — ❌ **NIJE lako promjenjivo.** Izlazi sa 0, ali upozorava da nekoliko `traffic-inspector` ruta pod `LOCAL_ONLY_API_PREFIXES` nema `x-loopback-only: true` anotaciju. Sprovođenje zahtijeva prvo dodavanje tih anotacija u `openapi.yaml`.
- `typecheck:noimplicit:core` (savjetodavno) — uglavnom obuhvaćeno blokirajućim `check:type-coverage` ratchet-om. Promijeniti u ratchet ili odbaciti redundantni drugi `tsc` prolaz.
- `test:vitest:ui` (sada **blokirajuće**) — postojeći kvarovi su eksplicitno isključeni u `vitest.config.ts` sa `// #8618` komentarima za praćenje; novi kvarovi obaraju posao.
- `check:secrets` (gitleaks, blokirajući ratchet zamrznut na 3 dokumentovana lažna pozitivna rezultata) — staviti 3 na listu dozvoljenih da bi se došlo do 0, ili degradirati na savjetodavno. Preklapa se sa GitHub izvornim skeniranjem tajni + `check:public-creds`.
- `check:pr-evidence` (blokirajuće, grepuje prozu u tijelu PR-a) — visok rizik od lažnih pozitivnih rezultata; slabi sprovođenje Hard Rule #18 ako se odbaci, tako da je ovo istinska odluka o politici.
- `semgrep` (savjetodavno samostalno) — preklapa se sa CodeQL za OWASP familije; povezati njegovu osnovnu vrijednost sa ratchet-om ili odbaciti.

---

## Povezana dokumentacija

- Lanac snabdijevanja (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kapija pariteta skupa ključeva

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, posao `i18n-ui-coverage`).
Upoređuje skup listovnih ključeva svakog `src/i18n/messages/<locale>.json` sa `en.json` i ne prolazi ako postoji bilo koji nedostajući ili dodatni list, bez obzira na to kada je ključ dodan. `__MISSING__:` rezervisana mjesta se računaju kao prisutna (njihov sadržaj je stvar kapije omjera). Ovo je apsolutni komplement dvije kapije zasnovane na diff-u/procentima: `check-ui-keys-coverage` nameće prag od 80 % po lokalu (43 nedostajuća ključa od ~13.000 i dalje daju 99,7 %) i `check-new-key-coverage` procjenjuje samo ključeve koje PR dodaje u `en.json`. Lokalna serija (batch) se generiše iz `en.json` na dan kada je njena grana isječena i prevodi se danima dok baza nastavlja dodavati ključeve; batch PR sam po sebi ne dodaje nijedan ključ, tako da su oba srodnika ostala tiha kada je batch 1 (#13044) stigao sa 43 ključa manje u devet lokala, a batch 2 (#13660) sa 10 ključeva manje u osam (15.09.2026.). Popravite crvenu (grešku) sa `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` list znači da ga je izvor odbacio — izbrišite ga iz lokala. `--warn` izvještava bez neuspjeha. `--catalog=cli` pokreće isto poređenje nad `bin/cli/locales` (`npm run i18n:check-keys:cli`); oba koraka žive u poslu `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n kapija za nove ključeve

Srodnik `check-ui-value-drift`. Taj hvata englesku vrijednost koja je **prepisana** dok su njeni prijevodi ostavljeni iza; ovaj hvata engleski ključ koji je **dodan** dok ga neki lokali nikada nisu primili.

`check-ui-keys-coverage` ne može vidjeti ovu klasu: ona nameće procentualni prag po lokalu, a jedanaest nedostajućih ključeva od ~13.000 ostavlja pokrivenost na 99,9%. Procenat po jeziku ne može izraziti "ova funkcija je isporučena neprevedena" — cijela funkcija može sletjeti u novi lokal bez teksta i nikada ne pomjeriti broj.

Incident koji kodira: Faza 3 Orchestration Canvas-a prevela je svojih jedanaest ključeva kroz 42 lokala koji su postojali u to vrijeme. Sati kasnije, EU-jezični batch (#13044) doveo je repo do 51 lokala, a devet pridošlica (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ih nikada nije primilo. `deepMergeFallback` zamjenjuje engleski za nedostajući ključ, tako da je način neuspjeha bio nepreveden UI umjesto praznog UI-a — stvaran, i tih po konstrukciji.

Kao i njegov srodnik, on je **svjestan razlika (diff-aware)**, upoređujući engleski na bazi spajanja (merge base) sa radnim stablom, tako da prethodno postojeće praznine ostaju zamrznute i kapiji nije bila potrebna migracija da bi se uključila.

**Oznaka `__MISSING__:<english>` ga ne zadovoljava (od 17.09.2026.).** To je nekada bilo dokumentovano odlaganje — runtime se vraća na ispravan engleski — sve dok osam PR-ova funkcija 16.09.2026. nije dodalo 61 ključ i utisnulo oznaku u svih 65 lokala umjesto prevođenja: ova kapija je prihvatila svaki, ništa nije blokiralo PR-ove, a blokirajuća kapija omjera stvarnog prijevoda je tada pala na vrhu izdanja za sve (pt-BR 3,2 % > 2,5 % + 0,5). Oznaka se sada procjenjuje kao nedostajući prijevod. Popravite crvenu (grešku) sa `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ili sve lokale paralelno sa `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe, odbija da se pokrene bez `OMNIROUTE_TRANSLATION_*` env). Ključ koji mora ostati na engleskom (fiksirani naziv proizvoda/mašine/fleg-a) pripada `scripts/i18n/untranslatable-keys.json`, nikada iza oznake. `vi` potpuno zabranjuje oznake (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kapija za parkirane testove

Datoteka na listi `exclude` u `vitest.config.ts` je test koji se ne pokriva, i izgleda kao pokrivenost svakome ko čita stablo. Šezdeset dvije datoteke su se akumulirale iza komentara `// #8618 — prethodno postojeći neuspjeh; uklonite ovo isključenje kada se popravi`. Problem #8618 je zatvoren 11.08.2026. dok je lista koju je pratio porasla sa 45 unosa na 62, pri čemu je svaki novi naslijedio komentar koji ukazuje na mrtav problem. Kada je lista konačno izmjerena datoteku po datoteku (#13204), **51 od 62 je prošlo protiv trenutnog stabla bez promjene izvora**.

Kapija zahtijeva da svako isključenje koje se razrješava u stvarnu datoteku (a) imenuje problem praćenja i (b) pojavi se u `config/quality/vitest-exclusions.json` sa svojim izmjerenim statusom, tako da je dodavanje jednog diff koji se može pregledati u namjenskoj datoteci, a ne još jedan red u nizu od 60 unosa. Namjerno ne ponovo pokreće isključene testove — to košta ~10 minuta i pripada periodičnom poslu; inventar bilježi kada je svaki posljednji put izmjeren.
