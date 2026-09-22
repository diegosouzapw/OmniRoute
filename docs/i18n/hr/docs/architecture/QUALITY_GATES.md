# Quality Gates Reference (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ovaj je dokument mjerodavna referenca za sve CI kontrole kvalitete u OmniRouteu.
Opisuje svaku kontrolu, što provjerava, u kojem se CI poslu izvodi, koristi li
referentnu osnovu s postupnim pooštravanjem ili pravilo prolaz/pad te blokira li izgradnju ili je savjetodavna.

Za kratak sažetak i pravila popisa dopuštenih stavki pogledajte odjeljak "Kontrole kvalitete i postupna pooštravanja"
u `AGENTS.md`. Za kritičku procjenu, klasifikaciju zrelosti i plan
replikacije istog sustava neovisan o alatima pogledajte
[Priručnik za kontrole kvalitete](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventar kontrola (~90 skripti)

Skripte se nalaze u `scripts/check/` (kontrole pravila) i `scripts/quality/` (mehanizam postupnog podizanja kriterija).
Mjerodavni izvor za CI jest `.github/workflows/ci.yml`.

### Brzi put za PR-ove izdanja (`quality.yml`)

`.github/workflows/quality.yml` pokreće se za PR-ove usmjerene na `release/**`. Omogućuje nastavak rada
na granama suradnika pomoću brzih kontrola filtriranih prema putanji te jednog savjetodavnog signala produkcijske izgradnje za
promjene kôda:

| Zadatak                                          | Opseg                                                                                                                                                                                                                                   | Blokiranje                                                                                                        |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PR-ovi kôda koji nisu skice i grane reda čekanja Mergifyja; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` uz `OMNIROUTE_USE_TURBOPACK=1`; bez prijenosa artefakta jer ga nijedan naknadni zadatak kvalitete ne koristi | **Savjetodavno** (`continue-on-error: true`; ukloniti nakon jednog tjedna stabilnih pokretanja za PR-ove izdanja) |
| `Docs Gates (fast-path)`                         | PR-ovi dokumentacije/kôda; reference API dokumentacije i docs-all                                                                                                                                                                       | Da                                                                                                                |
| `Fast Quality Gates`                             | PR-ovi kôda; statičke provjere, provjera tipova, provjera tipova nadzorne ploče, zahvaćeni jedinični testovi                                                                                                                            | Da                                                                                                                |
| `Forgotten sibling tests`                        | PR-ovi kôda; promijenjeni moduli prate se do statičkih potrošača i kandidata za srodne testove; putanje barrel modula i dinamičkog uvoza prijavljuju se kao savjetodavna dijagnostika, uz navedene iznimke s popisa dopuštenih stavki   | **Savjetodavno**                                                                                                  |
| `Vitest (fast-path)`                             | PR-ovi kôda; brzi paket vitest testova                                                                                                                                                                                                  | Da                                                                                                                |
| `Unit Tests fast-path`                           | PR-ovi kôda; paket jediničnih testova podijeljen u 4 segmenta                                                                                                                                                                           | Da                                                                                                                |
| `No new ESLint warnings`                         | PR-ovi kôda; kontrola lintanja koja uzima u obzir potiskivanja                                                                                                                                                                          | Da za vlastito podrijetlo, savjetodavno za račvanja                                                               |
| `Merge integrity (changelog + generated skills)` | PR-ovi koji nisu skice; sinkronizacija dnevnika promjena i generiranih vještina                                                                                                                                                         | Da za vlastito podrijetlo, savjetodavno za račvanja                                                               |

#### Izvješće o zaboravljenim srodnim testovima

`npm run check:forgotten-sibling-tests` ponovno koristi razrješivač uvoza na kojem se temelji karta utjecaja testova.
Za svaki promijenjeni produkcijski modul prijavljuje determinističke lance
`changed module/symbol -> static consumer -> candidate sibling test` kada kandidat za
test nije prisutan u razlici zahtjeva za povlačenje. Markdown sažetak i JSON rezultat čuvaju se kao
artefakt tijeka rada `forgotten-sibling-tests` radi kalibracije prije uvođenja blokiranja.

Ponovni izvozi barrel modula i dinamički uvozi služe samo kao dijagnostika razrješavanja; nikada ne stvaraju
blokirajući nalaz. Pregledane iznimke nalaze se u
`config/quality/forgotten-sibling-allowlist.json`. Svaki unos mora navesti potrošača i kandidata za
test, sadržavati konkretno obrazloženje te poveznicu na GitHub problem ili zahtjev za povlačenje. Neispravni unosi uzrokuju
neuspjeh radi sigurnosti. Iznimke ne mogu potisnuti izbrisanog kandidata za test niti razliku koja dodaje `.skip`/`.todo`;
slabljenje tvrdnji i druga prikrivanja ostaju u nadležnosti neovisno blokirajuće
kontrole `check:test-masking`.

### Zadatak: `lint`

Pokreće se za svaki PR prema `main`. Neuspjeh blokira spajanje.

| Skripta (`npm run ...`)           | Provjerava                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Blokirajuće                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Verzija Node.js-a unutar je podržanog raspona                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Da                                           |
| `check:cycles`                    | Kružne uvoze — svi moduli u `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:route-validation:t06`      | Zod sheme prisutne su na svim rutama (pravilo razine 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:any-budget:t11`            | Broj pojavljivanja `@ts-expect-error // any` ne premašuje dopušteni prag (kontrolna točka razine 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:provider-consistency`      | Svaki pružatelj u `providers.ts` ima odgovarajući unos u `providerRegistry.ts` (i obrnuto, unutar popisa dopuštenih)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Da                                           |
| `check:model-lifecycle`           | Tri ručno održavane tablice usmjeravanja ostaju usklađene sa snimkom životnog ciklusa pohranjenom u repozitoriju (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ne boduje nijedan povučeni ID koji `REGISTRY` može usmjeriti; svaki cilj iz `BUILT_IN_ALIASES` prisutan je u `REGISTRY` i odsutan iz snimke povučenih ID-ova; svaki povučeni ID koji se još nalazi u `REGISTRY` prosljeđuje se ili je naveden u `allowedRetiredInCatalog`; te se nijedan izvor ni cilj iz `DEFAULT_DEGRADATION_MAP` ne pojavljuje kao povučen u toj snimci. Time se ne dokazuje da model trenutačno poslužuje aktivni vanjski servis. Izvanmrežno — uspoređuje se s `config/quality/model-lifecycle.json`, koji se ručno osvježava naredbom `npm run quality:refresh-model-lifecycle` (zahtijeva mrežu; nije uključen u CI). `allowedRetiredInCatalog` jednosmjerna je zaporka za postupno smanjivanje: unos dodajte samo uz pripadajući problem za praćenje. | Da                                           |
| `check:fetch-targets`             | Svaki `fetch("/api/...")` u klijentskom dijelu direktorija `src/` razrješava se na stvarni `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:deps`                      | Sve ovisnosti koje je moguće instalirati naredbom `npm install` iz svake datoteke `package.json` u repozitoriju nalaze se u `dependency-allowlist.json`; nove ovisnosti bez prikvačene verzije ili paketi koji oponašaju nazive drugih paketa označavaju se                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `audit:deps`                      | `npm audit` (korijenski direktorij + electron) — nema upozorenja visoke/kritične razine (preklapa se s osv provjerom `check:vuln-ratchet`; pogledajte Popis za racionalizaciju)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:lockfile`                  | Integritet datoteke `package-lock.json` — https registar, sažeci integriteta, bez nadjačavanja poslužitelja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                           |
| `check:licenses`                  | Popis dopuštenih SPDX licenci za produkcijske ovisnosti                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                           |
| `check:tracked-artifacts`         | Nema artefakata izgradnje ni potvrđenih simboličkih poveznica na `node_modules` (također se pokreće u husky pre-commit; pre-push je namjerno jednostavan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                           |
| `check:vitest-exclusions`         | Svako izuzimanje iz Vitesta navodi problem za praćenje i nalazi se u `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:file-size`                 | Nijedna datoteka izvornog koda ne premašuje ograničenje za svoje proširenje (mehanizam postupnog pooštravanja: velike datoteke zamrznute su na popisu `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `check:error-helper`              | Odgovori o pogreškama u izvršiteljima/rukovateljima koriste `buildErrorBody()` / `sanitizeErrorMessage()` (Strogo pravilo #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:migration-numbering`       | SQL datoteke migracija numerirane su uzastopno, bez praznina ili duplikata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:public-creds`              | Nema doslovnih OAuth vrijednosti `client_id`/`client_secret` ni Firebase Web ključeva izvan datoteke `publicCreds.ts` (strogo pravilo #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                           |
| `check:db-rules`                  | Nema neobrađenog SQL-a izvan modula `src/lib/db/`; nema skupnih uvoza iz datoteke `localDb.ts` (stroga pravila #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                           |
| `check:known-symbols`             | Izvršitelji pružatelja, strategije usmjeravanja i prevoditelji registrirani u svojim tablicama otpreme odgovaraju datotekama na disku — nema napuštenih ili nedeklariranih simbola                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Da                                           |
| `check:route-guard-membership`    | Svaka ruta koja pokreće podređeni proces klasificirana je funkcijom `isLocalOnlyPath()` (stroga pravila #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                           |
| `check:test-discovery`            | Svaku datoteku `*.test.ts` / `*.spec.ts` u repozitoriju prikuplja barem jedan pokretač testova (zapinjača: popis napuštenih datoteka u `test-discovery-baseline.json` može se samo smanjivati)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                           |
| `check:agent-skills-sync`         | Generirani artefakti vještina agenata podudaraju se s izvornim katalogom (nema odstupanja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `check:provider-asset-provenance` | Logotipi/resursi pružatelja imaju zabilježen unos o podrijetlu                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | JSON konfiguracijske datoteke mogu se raščlaniti i zadovoljavaju pravila lint provjere repozitorija                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | Kompilacija TypeScripta bez pogrešaka (samo upozorenja informativnog karaktera)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                           |
| `typecheck:noimplicit:core`       | Strogi `noImplicitAny` — usmjereno na budućnost; mnoga postojeća mjesta poziva još uvijek trebaju anotacije                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Informativno** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ograničen na `src/app/(dashboard)/**` (#7033) — pomno odabran popis od 27 datoteka za `typecheck:core` ne uključuje nijednu TSX datoteku nadzorne ploče, a ni `next build` ih nikada ne provjerava (`next.config.mjs` postavlja `ignoreBuildErrors: true`), pa su regresije osirotjelih identifikatora ondje (#6625/#6909) bile nevidljive CI-ju. Razlike se uspoređuju sa zamrznutom osnovnom vrijednošću broja pogrešaka po datoteci i TS kodu (`config/quality/dashboard-typecheck-baseline.json`, isti obrazac provjere zastarjelosti kao za `check:known-symbols`) — samo NOVE pogreške iznad broja iz osnovne vrijednosti uzrokuju neuspjeh kontrolne točke; smanjite prag pomoću `--update` kada se ispravi postojeća pogreška.                                                                                                                                                                                                | Da                                           |

### Zadatak: `quality-gate`

Izvršava se nakon `test-coverage`. U slučaju neuspjeha blokira spajanje.

| Skripta                      | Provjerava                                                                                                                                                                       | Blokira                      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | Stvara `quality-metrics.json` (broj ESLint upozorenja, pokrivenost iz spojenog izvješća segmenata)                                                                               | Da (prethodi provjeri praga) |
| `quality:ratchet`            | Nijedna metrika u `quality-baseline.json` nije nazadovala (ESLint upozorenja ≤ osnovna vrijednost; pokrivenost ≥ osnovna vrijednost)                                             | Da                           |
| `check:duplication`          | Dupliciranje koda (jscpd@4) ne premašuje osnovnu vrijednost u `quality-baseline.json`                                                                                            | Da                           |
| `check:complexity`           | Ciklomatska složenost na razini datoteke ne premašuje ograničenje (osnovna ESLint pravila `complexity` + `max-lines-per-function`)                                               | Da                           |
| `check:cognitive-complexity` | Prag kognitivne složenosti (`eslint-plugin-sonarjs`) — zaseban prolaz ESLinta; CI pokreće obje provjere spojene u jedan korak `check:complexity-ratchets`                        | Da                           |
| `check:dead-code`            | Prag neiskorištenih izvoza / datoteka (knip) ne nazaduje u odnosu na osnovnu vrijednost                                                                                          | Da                           |
| `check:compression-budget`   | Proračun referentne provjere kompresije — minimalne uštede tokena za svaki pogon ne smiju nazadovati                                                                             | Da                           |
| `check:type-coverage`        | Prag postotka tipiziranog koda (`type-coverage`) ne nazaduje; u velikoj mjeri obuhvaća `typecheck:noimplicit:core`                                                               | Da                           |
| `check:codeql-ratchet`       | Broj otvorenih CodeQL upozorenja ne nazaduje (čita putem `gh api`; uredno preskače bez tokena) — učestalost osvježavanja i ručno pokretanje: pogledajte „CodeQL prag” u nastavku | Da                           |

### Zadatak: `quality-extended`

Cijeli je posao savjetodavan (`continue-on-error: true`). Provjere temeljene na npm-u izvršavaju se
u cijelosti; vanjski skeneri instaliraju se putem naredbe `gh release download` i sami se preskaču (izlazni kod 0)
ako binarna datoteka još uvijek nije prisutna.

| Skripta                  | Provjerava                                                                                                                                                                                                                             | Blokira          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check:circular-deps`    | Nema kružnih ovisnosti (dpdm)                                                                                                                                                                                                          | **Savjetodavno** |
| `check:bundle-size`      | Veličina paketa ne prelazi ograničenje                                                                                                                                                                                                 | **Savjetodavno** |
| `check:secrets`          | Skeniranje tajni (gitleaks) — preskače se ako binarna datoteka nije prisutna                                                                                                                                                           | **Savjetodavno** |
| `check:vuln-ratchet`     | Ranjivosti ovisnosti (osv-scanner) ne pogoršavaju se — preskače se ako binarna datoteka nije prisutna                                                                                                                                  | **Savjetodavno** |
| `check:workflows`        | Provjera tijekova rada (actionlint + zizmor) — preskače se ako binarne datoteke nisu prisutne                                                                                                                                          | **Savjetodavno** |
| `check:openapi-breaking` | Promjene javnog API ugovora (`openapi.yaml`) koje narušavaju kompatibilnost u odnosu na osnovnu granu (oasdiff) — ispisuje `openapiBreaking=N`; preskače se ako oasdiff nije prisutan ili se osnovna specifikacija ne može razriješiti | **Savjetodavno** |

### Posao: `docs-sync-strict`

Izvršava se za svaki PR prema grani `main`. U slučaju neuspjeha blokira spajanje.

| Skripta                        | Provjerava                                                                                                                                                                                | Blokira                       |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `check:docs-all`               | Objedinjena kontrola koja redom izvršava 6 kontrola u nastavku                                                                                                                            | Da                            |
| ↳ `check:docs-sync`            | Usklađenost verzija u datotekama CHANGELOG / OpenAPI / llm.txt                                                                                                                            | Da                            |
| ↳ `check:docs-counts`          | Brojevi u tekstu (broj pružatelja usluga, broj migracija itd.) nalaze se unutar dopuštenog raspona u odnosu na stvarne vrijednosti                                                        | Da                            |
| ↳ `check:env-doc-sync`         | Svaka varijabla okruženja iz `.env.example` dokumentirana je u tablici dokumentacije i obratno                                                                                            | Da                            |
| ↳ `check:deprecated-versions`  | U dokumentaciji nema zastarjelih oznaka verzija                                                                                                                                           | Da                            |
| ↳ `check:doc-links`            | Interne markdown poveznice u dokumentaciji upućuju na stvarne datoteke (oblik `[text]`/`(path)`)                                                                                          | Da                            |
| ↳ `check:fabricated-docs`      | Rute, varijable okruženja, CLI naredbe, nazivi hookova i putanje datoteka navedeni u dokumentaciji postoje u bazi koda. Stroga kontrola putem `--strict`; bez zastavice dopušta neuspjeh. | Da (putem `--strict` u CI-ju) |
| `check:cli-i18n`               | Nizovi CLI naredbi prisutni su u svim datotekama lokalizacije i18n                                                                                                                        | Da                            |
| `check:openapi-coverage`       | OpenAPI specifikacija pokriva barem postupno povećavani minimalni prag stvarnih ruta                                                                                                      | Da                            |
| `check:openapi-security-tiers` | Anotacije sigurnosnih razina u datoteci `openapi.yaml` usklađene su s klasifikacijama u `routeGuard.ts`                                                                                   | **Savjetodavno**              |
| `check:openapi-routes`         | Svaka putanja u datoteci `openapi.yaml` odgovara stvarnoj datoteci `route.ts` (sprječavanje halucinacija)                                                                                 | Da                            |
| `check:docs-symbols`           | Svaka referenca `/api/...` u `docs/**/*.md` odgovara stvarnoj datoteci `route.ts` (sprječavanje halucinacija)                                                                             | Da                            |
| `i18n translation drift`       | Neprevedeni ključevi u datotekama lokalizacije i18n — samo upozorenje                                                                                                                     | **Savjetodavno**              |

### Posao: `i18n-ui-coverage`

| Skripta                             | Provjerava                                                                                                                                                                                                                          | Blokira          |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (ugrađeno) | Pokrivenost UI i18n ključeva iznosi ≥ 65%                                                                                                                                                                                           | Da               |
| `check-ui-value-drift` (ugrađeno)   | Prepisana engleska **vrijednost** ne ostavlja zastarjeli prijevod                                                                                                                                                                   | Da               |
| `check-new-key-coverage` (ugrađeno) | **Novi** engleski ključ preveden je u svakom lokalitetu — oznaka `__MISSING__:` se odbija                                                                                                                                           | Da               |
| `check-translation-ratio`           | Omjer stvarnih prijevoda po lokalitetu (stavke identične engleskima / rezervirana mjesta / stavke koje nedostaju izvan popisa dopuštenih) ne smije premašiti `config/quality/i18n-translation-baseline.json` + dopušteno odstupanje | **Savjetodavno** |

Zahtijeva `fetch-depth: 0` — kontrola odstupanja vrijednosti uspoređuje `en.json` s bazom spajanja.

#### `check-ui-value-drift` — kontrola zastarjelih prijevoda

Otkriva jednu i18n regresiju koju ostale kontrole strukturno ne mogu uočiti: engleska je
vrijednost prepisana, a prijevodi izvedeni iz _prethodnog_ engleskog ostaju, pa
korisnici koji ne govore engleski nastavljaju čitati samouvjereno formuliran, ali sada netočan tekst.

To se doista dogodilo u produkciji. `oauthModal.googleOAuthWarning` prepisan je kada je uveden pomoćnik
za prijavu Antigravity (#5203); **39 od 43 lokaliteta** zadržalo je tekst koji operaterima govori da „kopiraju
cijeli URL i zalijepe ga ispod” — tijek koji se za tog pružatelja ne može dovršiti. To je
ostalo nezapaženo sve do #8463 jer:

- `sync-ui-keys` dopunjava samo ključeve koji su **odsutni**, nikada one koji su **zastarjeli**;
- `check-ui-keys-coverage` broji _prisutnost_ ključeva, pa se zastarjeli prijevod smatra pokrivenim;
- `check-translation-drift` prati zrcalne kopije dokumentacije `docs/i18n/<locale>/**.md` —
  nikada ne čita `src/i18n/messages/*.json`. Blokira u poslu `docs-sync-strict` od
  ponovne sinkronizacije 2026-09: uredite temeljni dokument → `npm run i18n:run -- --files=<doc>` (na razini odjeljka, brzo).

**Uzima u obzir razliku, a ne temelji se na referentnoj vrijednosti.** Uspoređuje `en.json` iz baze spajanja s
radnim stablom; za svaki ključ čija se engleska vrijednost promijenila, svaki lokalitet koji još uvijek sadrži
neizmijenjeni prijevod smatra se zastarjelim. Time se namjerno **zamrzava postojeći dug** — razlika
ne može otkriti iz kojeg je starog engleskog teksta nastao dugogodišnji prijevod, pa kontrola procjenjuje
samo ono čega se trenutačna promjena dotiče. Alternativa (referentna vrijednost kontrolnog sažetka za svaki ključ) zahtijevala bi
generiranu datoteku od približno 600 KB, triput veću od najveće postojeće referentne datoteke, koja bi se mijenjala pri svakom i18n PR-u.

Postoje dva načina da se kontrola zadovolji:

1. ažurirajte zahvaćene prijevode ili
2. postavite ih na `__MISSING__:<novi engleski tekst>` — izvršno okruženje tada poslužuje ispravljeni engleski tekst
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a ključ ulazi u red za prevođenje.

Ako se promijenilo **značenje** niza, preporučuje se **preimenovati ključ**: novi ključ ne može naslijediti
zastarjeli prijevod. Taj je obrazac upotrijebljen u #8463.

```bash
npm run i18n:check-value-drift          # strogo (ono što CI pokreće)
npm run i18n:check-value-drift:warn     # samo izvješće
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Završava s kodom 0 i porukom `SKIP reason=base-unresolved` kada se osnovni katalog ne može pročitati (plitki
klon bez osnovne reference), po uzoru na `check-openapi-breaking`.

### Posao: `i18n`

Potpuna matrica provjere i18n-a (jedan posao po lokalitetu). Cijeli je posao savjetodavan.

| Skripta                         | Provjerava                        | Blokira                                                      |
| ------------------------------- | --------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Potpunost prijevoda po lokalitetu | **Savjetodavno** (`continue-on-error: true` za cijeli posao) |

### Posao: `pr-test-policy`

Pokreće se samo za zahtjeve za povlačenje.

| Skripta                | Provjerava                                                                                                                                                | Blokira |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR-ovi koji mijenjaju produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/` moraju uključivati ili ažurirati testove (Strogo pravilo br. 8)      | Da      |
| `check:test-masking`   | Promijenjene testne datoteke ne smanjuju neto broj tvrdnji niti dodaju tautologije `assert.ok(true)`                                                      | Da      |
| `check:pr-evidence`    | Tijelo PR-a navodi dokaze testiranja/VPS-a za promjenu (automatizira Strogo pravilo br. 18 pretraživanjem teksta PR-a — krhko, pogledajte Popis zadataka) | Da      |

### Posao: `test-vitest`

Pokreće se nakon `build`. U slučaju neuspjeha blokira spajanje.

| Paket            | Provjerava                                                             | Blokira                                                                                                              |
| ---------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP poslužitelj (110 alata), autoCombo, predmemorija — vitest pokretač | Da                                                                                                                   |
| `test:vitest:ui` | Testovi UI komponenti — vitest pokretač                                | **Blokira** — postojeći neuspjesi izričito su izuzeti u `vitest.config.ts`; novi neuspjesi uzrokuju neuspjeh zadatka |

### Noćni tijekovi rada (zakazani, savjetodavni)

Pokreću se prema cron rasporedu (i putem `workflow_dispatch`), nikada za PR-ove. Svi su savjetodavni.

| Tijek rada             | Provjerava                                                                                                                                                            | Blokira          |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | fast-check testovi svojstava s nasumičnim početnim brojem + velikim brojem izvođenja                                                                                  | **Savjetodavno** |
| `nightly-resilience`   | prag rasta gomile, ubrizgavanje kvarova radi testiranja kaosa, k6 testiranje opterećenja/dugotrajnog opterećenja                                                      | **Savjetodavno** |
| `nightly-llm-security` | promptfoo zaštita od umetanja (način blokiranja) + garak sonde (preskaču se bez tajne pružatelja usluge)                                                              | **Savjetodavno** |
| `nightly-schemathesis` | Fuzz testiranje OpenAPI ugovora (schemathesis) nad aktivnim OmniRouteom uz `docs/openapi.yaml` — otkriva kršenja specifikacije / neobrađene pogreške 500 (Faza 8 B.4) | **Savjetodavno** |
| `nightly-mutation`     | Rezultat Stryker mutacijskog testiranja nad brzom stazom jediničnih testova — preživjeli mutanti otkrivaju slabe provjere                                             | **Savjetodavno** |
| `nightly-compat`       | Matrica kompatibilnosti Node pokretača za podržane raspone `engines.node`                                                                                             | **Savjetodavno** |

---

## Faza ubrzanog razvoja (2026-08-30 → v4.0 LTS): svaka je početna granica ublažena za 20%

Odluka vlasnika (2026-08-30): do modularizacije u v4.0 brzina isporuke važnija je
od zadržavanja tehničkog duga na istoj razini. Svaka **numerička** početna granica mehanizma postupnog pooštravanja ublažena je za 20% u jednom
provjerljivom prolazu, a faza je deklarirana u `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Što je promijenjeno                                                                                                                                                                                                     | Gdje                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — brojevi kod kojih je niže bolje ×1.2, postotci kod kojih je više bolje ÷1.2 (minimalna pokrivenost 60 zadržana je, `eslintErrors` ostaje 0, `eslintWarnings` 0 → 20% zamrznutog broja potiskivanja) | `quality-baseline.json` (napomena `_relax_velocity_2026_08_30` navodi svaku vrijednost prije → poslije) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                 |
| `cap`, `testCap`, ograničenje broja redaka za svaki `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                  | `file-size-baseline.json`                                                                               |
| broj po datoteci / po TS kodu ×1.2                                                                                                                                                                                      | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`  |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                              |
| `--require-tighten` postaje savjetodavan dok je `_policy.requireTighten === false`                                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                             |
| noćni `bank-ratchet-shrinks` pauzira se (pohranio bi izmjereno smanjenje i poništio rezervu)                                                                                                                            | `.github/workflows/nightly-release-green.yml`                                                           |

Popisi dopuštenih stavki (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nisu** proračuni i nisu mijenjani. Pravila prolaza/pada (tajne, SQL pravila,
ugovor dokumentacije/okruženja, paritet i18n-a, jedinični testovi) nepromijenjena su — pali test i dalje je pali test.

**Alati**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — jednokratno
  ublažavanje (`scripts/quality/relax-baselines.mjs`); odbija se pokrenuti dvaput s istom
  napomenom.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mjeri svaku numeričku kontrolu na isti način kao CI i ispisuje preostalu rezervu za svaku kontrolu
  (`scripts/quality/baseline-headroom.mjs`). Noćni zadatak `baseline-headroom` objavljuje
  tablicu u aktivnom problemu **📈 Rezerva početnih granica (faza ubrzanog razvoja)** i dodaje oznaku
  `headroom-alert` kada je bilo koja kontrola unutar 10% svojeg ograničenja ili ga je već premašila. Taj je problem
  rano upozorenje: proračun koji se popuni u nekoliko dana znači da je ublažavanje potrošilo
  nekoliko PR-ova, a ne cijeli tim — pogledajte napomene `_rebaseline_*` problematične kontrole.

**Način rada za novi kod (Clean-as-You-Code) — od 2026-08-30, samo ubrzani put za PR-ove**

Pri događajima `pull_request` datoteka `quality.yml` prosljeđuje `--base-ref <PR base SHA>` naredbama `check:file-size`,
`check:complexity-ratchets` i `check:dead-code`. U tom načinu rada kontrola uspoređuje HEAD s
bazom spajanja **ograničeno na datoteke koje je PR izmijenio** (`scripts/check/newCodeMode.mjs`:
baza spajanja materijalizira se u privremenom `git worktree`, ESLint/knip pokreću se ondje i na HEAD-u, a
brojevi po datoteci uspoređuju se razlikom):

- **blokirajuće** — PR je dodao kršenja ciklomatske/kognitivne složenosti ili mrtve izvoze u datotekama koje je izmijenio
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` u zapisniku);
- **savjetodavno** — ukupna globalna vrijednost u odnosu na zamrznutu početnu granicu. Naslijeđeno odstupanje nikad ne ruši
  nedužan PR; odstupanje se ponovno zamrzava pri usklađivanju izdanja, a nadzire ga zadatak za praćenje rezerve.

Pokretanja `workflow_dispatch`, provjera release-green i noćni zadatak za praćenje rezerve nemaju bazu PR-a
te zadržavaju apsolutnu (globalnu) usporedbu. Pokrivenost, dupliciranje i pokrivenost tipovima za sada ostaju globalni
(njihovi alati ne mogu jeftino izraditi razliku po datotekama) — kandidati su za isti pristup.

**Zatvaranje faze u v4.0 (LTS = strože nego prije, a ne „povratak na normalno”)**

1. Na čistom vrhu grane `release/v4.0.0`: pokrenite `npm run quality:headroom --json` radi evidencije, zatim
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, te
   `--update` za svaku provjeru tipova — svaka se osnovna vrijednost spušta na izmjerenu vrijednost.
2. Izbrišite `_policy` iz `quality-baseline.json` (ponovno aktivira `--require-tighten` i noćno
   pohranjivanje), vratite `THRESHOLD = 36` (ili više) u `check-openapi-coverage.mjs`.
3. Postrožite vrijednosti iznad izmjerenih ondje gdje se modularizacija isplatila: vratite `cap`
   veličine datoteke na 1000 (ili 800), povećajte minimalne pragove pokrivenosti za 5, postavite broj
   mrtvih izvoza na 0 za modularizirane pakete.

## Referentna vrijednost mehanizma zapinjače (`quality-baseline.json`)

Mehanizam zapinjače (`scripts/quality/check-quality-ratchet.mjs`) čita `quality-baseline.json`
i uspoređuje ga s upravo prikupljenim `quality-metrics.json`. Svaka metrika koja nazaduje
izvan svoje epsilon-vrijednosti uzrokuje neuspjeh izgradnje.

Trenutačno praćene metrike:

| Metrika               | Smjer  | Značenje                              |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | Broj ESLint upozorenja ne smije rasti |
| `coverage.statements` | `up`   | Pokrivenost naredbi ne smije pasti    |
| `coverage.lines`      | `up`   | Pokrivenost redaka ne smije pasti     |
| `coverage.functions`  | `up`   | Pokrivenost funkcija ne smije pasti   |
| `coverage.branches`   | `up`   | Pokrivenost grana ne smije pasti      |

Za ažuriranje referentne vrijednosti nakon stvarnog poboljšanja:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Zastavica `--update` zapisuje trenutačno izmjerene vrijednosti u `quality-baseline.json`.
Predajte ovu datoteku zajedno s promjenom koja je poboljšala metriku. PR koji poboljša
metriku bez ažuriranja referentne vrijednosti otkrit će `--require-tighten` (Faza 6A.5,
implementacija je na čekanju).

### CodeQL zapinjača: učestalost osvježavanja i ručno pokretanje

`check:codeql-ratchet` čita **stanje repozitorija koje se osvježava prema rasporedu — ne za svaki PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` prijavljuje
`state: configured`, `schedule: weekly`: GitHubovo skeniranje prema zadanoj konfiguraciji, a ne analiza
pri svakom slanju promjena. Posljedica: nakon spajanja PR-a koji ISPRAVLJA upozorenja, zapinjača nastavlja očitavati
stari, veći broj sve dok se ne pokrene sljedeće zakazano skeniranje — stoga prijavljuje regresiju
na svakom otvorenom PR-u, uključujući i naknadne PR-ove povezane s onim koji je sadržavao ispravak, sve dok se skeniranje ne uskladi.

**Ručno osvježavanje**: `gh workflow run codeql.yml --ref release/vX.Y.Z` ponovno pokreće
analizu i u roku od nekoliko minuta ponovno objavljuje upozorenja. Najprije pročitajte `.github/workflows/codeql.yml`
— njegovo zaglavlje objašnjava da se pokreće samo putem `workflow_dispatch` **jer je u sukobu sa
GitHubovom „zadanom konfiguracijom”** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Vraćanje okidača `push`/`pull_request`/
`schedule` prvo zahtijeva **radnju vlasnika**: Settings → Code security →
CodeQL: Default → Advanced. Nemojte dodavati okidač `schedule:` bez tog prebacivanja — to
će samo uzrokovati neuspješna izvođenja.

**Postrožite referentnu vrijednost nakon smanjenja broja** — `node scripts/check/check-codeql-ratchet.mjs
--update` zapisuje novi izmjereni broj u `quality-baseline.json` →
`metrics.codeqlAlerts.value`, kako zapinjača ne bi prešutno dopustila regresiju natrag
do starog gornjeg praga. Praktični primjer (2026-09-02/03): PR #12502 ispravio je 7 stvarnih upozorenja
(13 → 6 izmjerenih otvorenih); PR #12530 postrožio je zamrznutu referentnu vrijednost s 11 → 6 kako bi se podudarala; preostalih
6 zatim je odbačeno uz zasebno obrazloženje za svako upozorenje, čime je broj otvorenih upozorenja smanjen na 0.

**Odbacivanje je odluka rukovatelja (Strogo pravilo #14)** — nikada nemojte odbaciti CodeQL upozorenje
bez bilježenja tehničkog obrazloženja u komentaru odbacivanja: `won't fix` za
zahtjev uzvodnog protokola, `used in tests` za testnu fixturu, `false positive`
za pročišćivač koji CodeQL ne može prepoznati (presedan: `docs/security/ERROR_SANITIZATION.md`).

---

## Pravila ponovnog pokretanja testova (WS5.4, v3.8.49)

Ponovno pokretanje određuje se po izvršitelju, nikada kao opće pravilo — opće ponovno pokretanje pretvara stvarne regresije
u nevidljive nestabilnosti:

| Izvršitelj       | Pravilo                                                                                                                                        | Zašto                                                                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` samo u CI-ju, uz `trace: on-first-retry`                                                                                          | Vremenski uvjeti preglednika/mreže doista su nedeterministički; jedno ponovno pokretanje uz trag pretvara nestabilnost u dijagnostički artefakt |
| Vitest           | NEMA globalnog ponovnog pokretanja. Dokazano nestabilan test dobiva izričito ponovno pokretanje po testu (vidljivo u diffu, pregledano u PR-u) | Popis izdvojenih testova ostaje u repozitoriju i nikada nije neproziran                                                                         |
| node:test (unit) | NEMA ponovnog pokretanja, nikada                                                                                                               | Nestabilan jedinični test pogreška je u testu — popravite ga, nemojte ga samo ponovno pokretati                                                 |

Ciljni SLO-ovi nakon uvođenja telemetrije nestabilnosti (WS5.2/5.3): <1% stopa nestabilnosti po testu
(prag „odmah popravi”), ≥95% stopa prolaznosti po cjevovodu. Referentne vrijednosti iz industrije —
ponovno ih kalibrirajte prema našim vlastitim mjerenjima.

## Odstupanje zapinjača na razini izdanja (WS5.5, v3.8.49)

Kada zapinjač (veličina datoteke, složenost, eslint upozorenja) nazaduje na ČISTOM vrhu izdanja
— tj. KOMBINACIJA spajanja uzrokuje regresiju, a nijedan pojedinačni PR ne reproducira
regresiju na vlastitoj grani — popravak je odgovornost **voditelja izdanja, jednom, na
grani izdanja**: prednost dajte izdvajanju/refaktoriranju; ponovno postavite referentnu vrijednost samo uz dokumentirani
zapis obrazloženja. Nikada ne prebacujte kombinirano odstupanje na PR doprinositelja i nikada
ne postavljajte ponovno referentnu vrijednost za svaki PR (time se skrivaju stvarne regresije). Najprije razlučite uzrok: reproducirajte
neuspjeh na čistom vrhu u probnom radnom stablu prije nego što pretpostavite da ga je uzrokovao vaš PR.

## Pohranjivanje smanjenja zapinjača — smjer prema dolje (#8584)

Zapinjač je samo napola automatski, i to pogrešna polovica. **Povećavanje** ograničenja
ručno je uređivanje JSON-a koje traje deset sekundi i najbrži je način deblokiranja neuspješnog PR-a.
**Smanjivanje** zahtijeva da netko pokrene `--update` i zabilježi rezultat — a sve dok
posao `bank-ratchet-shrinks` nije uveden, nijedan tijek rada to nije pokretao. Izmjerena posljedica
(2026-07-25): 18 zamrznutih datoteka već je bilo na ili ispod ograničenja od 800 redaka za nove datoteke, najgora
na 132× (`src/shared/validation/schemas.ts`, 19 redaka uz ograničenje od 2,523); gornja granica
složenosti porasla je `1794 → 2169` kroz ~37 bilješki o ponovnom postavljanju referentne vrijednosti, uz točno jedno
smanjenje (−1); a „pooštri putem `--update` u sljedećem ciklusu” zapisano je 31 put i ispoštovano
jednom. Ograničenje koje nadživi kôd zbog kojeg je uvedeno neprimjetno pretvara svaku dovršenu
dekompoziciju u dopuštenje za rast onome tko sljedeći uređuje datoteku.

`nightly-release-green.yml` → posao **`bank-ratchet-shrinks`** zatvara tu petlju:

|               |                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| Pokreće se na | `schedule` (3×/dan) + `workflow_dispatch` — namjerno **ne** na `push`                                 |
| Mjeri         | najviši `release/vX.Y.Z`, uz isto razrješavanje + zaštitu od ubrizgavanja kao `release-green`         |
| Zapisuje      | `check:file-size --update` i `check:complexity-ratchets --update` (oba po konstrukciji samo smanjuju) |
| Provjerava    | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                              |
| Isporučuje    | jedan uvijek ažuran PR prema grani izdanja — prisilno ažuriran, bez neželjenog umnažanja              |

Pohranjivanje se obavlja skupno, a ne pri svakom slanju, jer nema zahtjeva za latencijom (smanjenje
pohranjeno unutar 8 h sasvim je prihvatljivo), dok bi pokretanje nakon svakog spajanja opetovano ponovno izgrađivalo granu PR-a
tijekom kampanja spajanja i svaki put plaćalo puni prolaz ESLint-a. Otkrivanje ostaje pri
slanju (`release-green`); samo se pohranjivanje obavlja skupno.

### Sigurnosni provjeravatelj

Posao bez nadzora zapisuje u referentne vrijednosti, stoga `verify-ratchet-bank.mjs` to čini
prihvatljivim. Uspoređuje stablo nakon `--update` s `HEAD` i **prekida posao
prije nego što postoji ikakav commit** — bez otvaranja PR-a — osim ako je svaka promjena jedna od sljedećih:

- brojčani unos `frozen` / `testFrozen` **smanjen** je ili **uklonjen**
- `complexity-baseline.json` → `count` **smanjen** je
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **smanjen** je

Sve ostalo uzrokuje neuspjeh: povećavanje broja, dodavanje unosa, mijenjanje `cap`/`testCap` ili
brisanje/prepisivanje bilješke `_rebaseline_*` (te bilješke čine revizijski trag razloga postojanja svake
gornje granice i pohranjene su unutar istog objekta `frozen` kao i unosi datoteka).
Bot koji bi mogao povećati ograničenje bio bi strogo lošiji od postojećeg stanja. Zaštita od regresije:
`tests/unit/verify-ratchet-bank.test.ts`.

Posao nikada ne šalje promjene u `release/*` — čovjek spaja PR, pa pogrešno mjerenje
ne može biti prihvaćeno bez pregleda.

## Pravila popisa dopuštenih stavki

Svaka kontrola koja ne može pasti zbog postojećih kršenja koristi zamrznuti popis dopuštenih stavki
(npr. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Pravilo glasi:

**Ispravite temeljni uzrok; koristite popis dopuštenih stavki samo kada je kršenje već postojalo i
ne može se ispraviti u istom PR-u.**

Pri dodavanju stavke na popis dopuštenih stavki:

1. Dodajte komentar s obrazloženjem.
2. Navedite povezani problem praćenja (npr. `// #3498 — Značajka 2. faze, još nije implementirana`).
3. Uklonite stavku u istom PR-u koji ispravlja kršenje — zastarjela stavka koja više
   ne potiskuje aktivno kršenje i sama je nedostatak (provjera zastarjelog provođenja pravila 6A.3
   uzrokovat će pad kontrole zbog nepovezane stavke na popisu dopuštenih nakon što bude implementirana).

**Nemojte** dodavati stavke na popis dopuštenih kako bi testovi brže prošli. Uspješna kontrola uz rastući
popis dopuštenih stvara lažan osjećaj kvalitete.

### Kada kontrola ne uspije na vašem PR-u

1. **Pažljivo pročitajte izlaz kontrole** — on vam točno govori koja je datoteka ili simbol prekršio
   pravilo.
2. **Ispravite kršenje** — većina kontrola determinističke su provjere datotečnog sustava koje prolaze čim
   je kôd ispravan.
3. **Ako je kršenje već postojalo** (tj. niste ga vi uveli, ali ga kontrola sada
   obuhvaća): dodajte stavku na popis dopuštenih s komentarom obrazloženja i problemom praćenja.
4. **Ako je kontrola zaporna** (pokrivenost, upozorenja ESLint-a, dupliciranje, složenost):
   vaša je promjena pogoršala metriku. Ispravite temeljni problem ili (rijetko) pokrenite
   `npm run quality:ratchet -- --update` ako je promjena namjerna i pogoršanje metrike
   prihvatljivo — ali u opisu PR-a dokumentirajte razlog.
5. **Savjetodavne kontrole** (`continue-on-error: true`) informativne su — ne blokiraju
   spajanje, ali se pojavljuju u sažetku CI-ja. Svejedno ih ispravite.

---

## Dodavanje nove kontrole

1. Izradite `scripts/check/check-<name>.mjs` (ili `.ts`). Kontrole pravila završavaju izlaznim kodom 0/1.
   Zaporne kontrole šalju metriku u `quality-metrics.json` putem `collect-metrics.mjs`.
2. Dodajte `"check:<name>": "node scripts/check/check-<name>.mjs"` u `package.json`.
3. Povežite je u `.github/workflows/ci.yml` pod odgovarajućim zadatkom
   (pravilo → `lint` ili `docs-sync-strict`; zaporna kontrola → `quality-gate`).
4. Ako ima popis dopuštenih stavki, primijenite `reportStaleEntries()` iz
   `scripts/check/lib/allowlist.mjs` kako bi se zastarjele stavke automatski otkrile.
5. Napišite test u `tests/unit/build/` koji pokriva logiku otkrivanja kontrole.
6. Ažurirajte ovaj dokument (dodajte redak u tablicu odgovarajućeg zadatka).

---

## Alati za agente: LSP-in-the-loop (opcionalno)

Osim CI kontrola, OmniRoute isporučuje **opcionalnu** osnovu `agent-lsp`
(projektni `.mcp.json`, Faza 7, zadatak 15). Izradite `.mcp.json`
kako biste agentima za programiranje izložili TypeScript jezični poslužitelj, tako da razriješe simbole /
dijagnostiku **prije** pisanja koda — dopunu za `typecheck:core` koja provjerava kompilaciju prije iznošenja tvrdnji
i uklanja pogreške „izmišljenih simbola” na samom izvoru. Namjerno se
ne učitava automatski (vi birate i provjeravate MCP↔LSP most); neispravna stavka samo bilježi
pogrešku povezivanja i nikada ne prekida sesije.

---

## Zaostatak racionalizacije (pregled ROI-ja — Faza 9 Val 3)

Ovaj je popis usklađen s `ci.yml` 2026-06-17 (u prethodnoj su verziji izostavljeni
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Pregled ROI-ja usklađenog skupa
utvrdio je sljedeće kandidate za racionalizaciju. **Spajanja su mehaničke promjene CI-ja;
promjene statusa/uklanjanja odluke su o pravilima rezervirane za operatera.** Ništa od
navedenog još nije primijenjeno.

**Također prethodno nedokumentirano** (savjetodavno, slab signal): zadatak `docs-lint`
(markdownlint + Vale, cijeli zadatak ima `continue-on-error`) i samostalni tijekovi rada skenera
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` nalazi se u
`quality-baseline.json`, ali nije povezan s blokirajućim zapornim mehanizmom u `ci.yml` — metrika je
trenutačno nepovezana.

### Spajanje / uklanjanje duplikata (mehaničko, manji rizik)

Svaki je kandidat provjeren u odnosu na aktivno stanje kontrolnih točaka 2026-06-17 (vjeruj, ali provjeri);
pokazalo se da nekoliko „očiglednih” spajanja skriva dug i **nisu** izravne zamjene bez poteškoća.

- **`check:docs-sync` izvodi se dvaput** — samostalno u zadatku `lint` i ponovno unutar `check:docs-all` (`docs-sync-strict`) te u husky pre-commit kuki. ✅ **DOVRŠENO** — uklonjeno je samostalno pokretanje iz zadatka `lint`.
- **Skeniranje CVE-ova** — ❌ **NIJE jednostavno spajanje.** `audit:deps` strogo ne prolazi u slučaju bilo kojeg CVE-a visoke/kritične razine; `check:vuln-ratchet` (osv) ne prolazi samo u slučaju _regresije_ u odnosu na osnovnu vrijednost (trenutačno 1 MODERATE). Različita semantika — uklanjanjem `audit:deps` izgubila bi se apsolutna kontrolna točka za visoku/kritičnu razinu. Zadržati oboje.
- **Otkrivanje ciklusa** — ❌ **NIJE jednostavno spajanje.** `check:circular-deps` (dpdm) prijavljuje **91 ciklus** (zbog toga je savjetodavan); ne može postati blokirajući bez njihova prethodnog rješavanja, a ima širi opseg od zelenog, ciljano odabranog `check:cycles`. Zadržati `check:cycles` kao blokirajući; rješavanje 91 dpdm ciklusa zasebna je stavka zaostatka.
- **Složenost** — ✅ **DOVRŠENO** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jedan ESLint prolaz, brojanje po ruleId-u kako bi osnovne vrijednosti za ciklomatsku složenost + najveći broj redaka i kognitivnu složenost ostale neovisne; pojedinačni `check:complexity` / `check:cognitive-complexity` ostaju za lokalni `--update`.
- **Sprječavanje halucinacija za `/api`** — ✅ **DOVRŠENO** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jedan FS popis za `src/app/api`, openapi-routes + docs-symbols i dalje izvještavaju neovisno; pojedinačne provjere ostaju za lokalna pokretanja.
- **`check:node-runtime` izvodi se u 11 zadataka** — ⚠️ **nizak ROI.** Svaki se izvršava na zasebnom izvršitelju, a provjera traje <1 s; ukupna ušteda ~10 s, uz gubitak jeftine zaštite po zadatku. Nije vrijedno promjena.
- **`typecheck:noimplicit:core` u CI zadatku lint** — ✅ **uklonjen iz zadatka lint** (bio je savjetodavan uz `continue-on-error`); blokirajuću tipsku površinu čine `typecheck:core` + `check:type-coverage`. Lokalna je skripta zadržana.

### Promijeniti status / odlučiti (pravila operatera)

- `check:openapi-security-tiers` (savjetodavan) — ❌ **NIJE moguće jednostavno učiniti blokirajućim.** Završava kodom 0, ali upozorava da nekoliko ruta `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` nema oznaku `x-loopback-only: true`. Za njegovo provođenje najprije treba dodati te oznake u `openapi.yaml`.
- `typecheck:noimplicit:core` (savjetodavan) — u velikoj ga mjeri zamjenjuje blokirajući zaporni mehanizam `check:type-coverage`. Pretvoriti ga u zaporni mehanizam ili ukloniti suvišan drugi prolaz `tsc`.
- `test:vitest:ui` (sada **blokirajući**) — postojeći kvarovi izričito su izuzeti u `vitest.config.ts` uz komentare za praćenje `// #8618`; novi kvarovi uzrokuju neuspjeh zadatka.
- `check:secrets` (gitleaks, blokirajući zaporni mehanizam zamrznut na 3 dokumentirana lažno pozitivna nalaza) — dodati ta 3 nalaza na popis dopuštenih kako bi se došlo do 0 ili ga degradirati na savjetodavni. Preklapa se s GitHubovim izvornim skeniranjem tajni + `check:public-creds`.
- `check:pr-evidence` (blokirajući, pretražuje prozni tekst tijela PR-a) — visok rizik od lažno pozitivnih nalaza; uklanjanje slabi provedbu strogog pravila br. 18, pa je ovo stvarna odluka o pravilima.
- `semgrep` (savjetodavni samostalni tijek rada) — preklapa se s CodeQL-om za OWASP obitelji; povezati njegovu osnovnu vrijednost sa zapornim mehanizmom ili ga ukloniti.

---

## Povezana dokumentacija

- Lanac opskrbe (podrijetlo, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontrola podudarnosti skupova ključeva

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, zadatak `i18n-ui-coverage`).
Uspoređuje skup krajnjih ključeva svake datoteke `src/i18n/messages/<locale>.json` s datotekom `en.json` i prijavljuje
neuspjeh za svaki nedostajući ili suvišni krajnji ključ, bez obzira na to kada je ključ dodan. Rezervirana mjesta
`__MISSING__:` smatraju se prisutnima (njihov je sadržaj odgovornost kontrole omjera). To je apsolutna dopuna
dvjema kontrolama temeljenima na razlikama/postocima: `check-ui-keys-coverage` provodi donju granicu od 80 % po
lokalizaciji (43 nedostajuća ključa od približno 13.000 i dalje daju 99,7 %), a `check-new-key-coverage` procjenjuje
samo ključeve koje PR dodaje u `en.json`. Skup lokalizacija generira se iz verzije datoteke `en.json` dostupne na dan
izrade njegove grane te se prevodi danima, dok osnovna grana nastavlja dobivati nove ključeve; PR skupa sam ne dodaje
nijedan ključ, pa su obje srodne kontrole ostale nijeme kada je skup 1 (#13044) spojen s 43 nedostajuća ključa u devet
lokalizacija, a skup 2 (#13660) s 10 nedostajućih ključeva u osam lokalizacija (2026-09-15). Neuspješnu kontrolu popravite naredbom
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; krajnji ključ označen kao `extra`
znači da je uklonjen iz izvora — izbrišite ga iz lokalizacije. `--warn` izvještava bez prijave neuspjeha.
`--catalog=cli` pokreće istu usporedbu nad `bin/cli/locales` (`npm run i18n:check-keys:cli`);
oba se koraka nalaze u zadatku `i18n-ui-coverage`.

#### `check-new-key-coverage` — i18n kontrola novih ključeva

Srodna kontrola kontroli `check-ui-value-drift`. Ona otkriva englesku vrijednost koja je **prepisana**
dok su njezini prijevodi ostali nepromijenjeni; ova otkriva engleski ključ koji je **dodan**
dok ga neke lokalizacije nikada nisu dobile.

`check-ui-keys-coverage` ne može otkriti ovu vrstu problema: provodi donju granicu postotka po lokalizaciji, a
jedanaest nedostajućih ključeva od približno 13.000 ostavlja pokrivenost na 99,9 %. Postotak po jeziku ne može
izraziti „ova je funkcionalnost objavljena neprevedena” — cijela funkcionalnost može stići u novu lokalizaciju bez
ikakvog teksta, a da se broj nikada ne promijeni.

Incident koji ta kontrola kodificira: 3. faza Orchestration Canvasa prevela je svojih jedanaest ključeva u
42 lokalizacije koje su tada postojale. Nekoliko sati poslije skup jezika EU-a (#13044) povećao je broj lokalizacija u repozitoriju
na 51, a devet novih (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nikada
ih nije dobilo. `deepMergeFallback` zamjenjuje nedostajući ključ engleskim tekstom, pa je posljedica bila
neprevedeno, a ne prazno korisničko sučelje — stvaran problem koji je po svojoj prirodi ostao neprimijećen.

Kao i njezina srodna kontrola, i ova je **svjesna razlika** te uspoređuje engleski na zajedničkoj osnovi spajanja s radnim
stablom, pa postojeći nedostaci ostaju zamrznuti i za uključivanje kontrole nije bila potrebna migracija.

**Oznaka `__MISSING__:<english>` ne zadovoljava kontrolu (od 2026-09-17).** Prije je služila kao
dokumentirana odgoda — tijekom izvođenja koristi se ispravan engleski tekst kao pričuvna vrijednost — sve dok osam PR-ova funkcionalnosti
2026-09-16 nije dodalo 61 ključ i postavilo oznaku u svih 65 lokalizacija umjesto prevođenja: ova je
kontrola prihvatila svaki od njih, ništa nije blokiralo PR-ove, a blokirajuća kontrola omjera stvarnih prijevoda
zatim je pala na vrhu grane izdanja za sve (pt-BR 3,2 % > 2,5 % + 0,5). Oznaka se sada smatra
nedostajućim prijevodom. Neuspješnu kontrolu popravite naredbom
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ili
sve lokalizacije paralelno naredbom `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
sigurna za odvojeno izvođenje, odbija se pokrenuti bez varijabli okruženja `OMNIROUTE_TRANSLATION_*`). Ključ koji mora ostati
na engleskom (fiksirani naziv proizvoda/mehanizma/zastavice) pripada u `scripts/i18n/untranslatable-keys.json`,
nikada iza oznake. `vi` u potpunosti zabranjuje oznake (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontrola odloženih testova

Datoteka na popisu `exclude` u `vitest.config.ts` test je koji se ne izvršava, a onome tko pregledava
stablo izgleda kao pokrivenost. Šezdeset dvije datoteke nakupile su se iza komentara
`// #8618 — postojeći neuspjeh; uklonite ovo izuzeće kada bude ispravljen`. Problem #8618 zatvoren je
2026-08-11, dok je popis koji je pratio narastao s 45 na 62 stavke, pri čemu je svaka nova naslijedila komentar
koji je upućivao na zatvoren problem. Kada je popis napokon izmjeren datoteku po datoteku (#13204), **51 od 62
testa prošao je na trenutačnom stablu bez ikakve promjene izvornog koda**.

Kontrola zahtijeva da svako izuzeće koje se razrješava u stvarnu datoteku (a) navodi problem za praćenje i
(b) postoji u `config/quality/vitest-exclusions.json` sa svojim izmjerenim statusom, tako da je dodavanje izuzeća
razlika koja se može pregledati u namjenskoj datoteci, umjesto još jednog retka u polju sa 60 stavki. Kontrola namjerno
ne pokreće ponovno izuzete testove — to traje približno 10 minuta i pripada periodičnom zadatku; inventar
bilježi kada je svaki od njih posljednji put izmjeren.
