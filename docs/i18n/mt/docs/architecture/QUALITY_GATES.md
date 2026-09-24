# Quality Gates Reference (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dan id-dokument huwa r-referenza awtorevoli għall-gates kollha tal-kwalità tas-CI f’OmniRoute.
Jiddeskrivi kull gate, x’jivvalida, f’liema job tas-CI jitħaddem, jekk jużax
linja bażi ratchet jew politika ta’ suċċess/falliment, u jekk jimblokkax il-build jew huwiex konsultattiv.

Għal sommarju qasir u l-politika tal-allowlist, ara t-taqsima "Quality Gates & Ratchets"
f’`AGENTS.md`. Għall-valutazzjoni kritika, il-klassifikazzjoni tal-maturità, u l-pjan
ta’ replikazzjoni indipendenti mill-għodda tal-istess sistema, ara l-
[Manwal tal-Gates tal-Kwalità](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventarju tal-Gates (~90 script)

L-iskripts jinsabu taħt `scripts/check/` (gates tal-politika) u `scripts/quality/` (magna ratchet).
Is-sors awtorevoli tas-CI huwa `.github/workflows/ci.yml`.

### Fast-path tal-PR tar-rilaxx (`quality.yml`)

`.github/workflows/quality.yml` jitħaddem fuq PRs immirati lejn `release/**`. Dan iżomm il-fergħat
tal-kontributuri mexjin permezz ta’ gates rapidi ffiltrati skont il-path, flimkien ma’ sinjal konsultattiv wieħed tal-build tal-produzzjoni għal
bidliet fil-code:

| Job                                              | Ambitu                                                                                                                                                                                                                                | Imblukkar                                                                                            |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PRs tal-code li mhumiex draft u fergħat tal-kju ta’ Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` b’`OMNIROUTE_USE_TURBOPACK=1`; l-ebda upload ta’ artifact għax l-ebda job tal-kwalità downstream ma jużah | **Konsultattiv** (`continue-on-error: true`; neħħih wara ġimgħa ta’ runs stabbli tal-PRs tar-rilaxx) |
| `Docs Gates (fast-path)`                         | PRs tad-docs/code; referenzi tad-docs tal-API u docs-all                                                                                                                                                                              | Iva                                                                                                  |
| `Fast Quality Gates`                             | PRs tal-code; kontrolli statiċi, typecheck, typecheck tad-dashboard, tests tal-unità affettwati                                                                                                                                       | Iva                                                                                                  |
| `Forgotten sibling tests`                        | PRs tal-code; moduli mibdula traċċati lejn konsumaturi statiċi u tests kandidati relatati; paths tal-barrel u dynamic-import jiġu rrappurtati bħala dijanjostiċi konsultattivi, b’eċċezzjonijiet referenzjati fl-allowlist            | **Konsultattiv**                                                                                     |
| `Vitest (fast-path)`                             | PRs tal-code; suite rapida ta’ vitest                                                                                                                                                                                                 | Iva                                                                                                  |
| `Unit Tests fast-path`                           | PRs tal-code; suite ta’ tests tal-unità b’4 shards                                                                                                                                                                                    | Iva                                                                                                  |
| `No new ESLint warnings`                         | PRs tal-code; guard tal-lint konxju tas-soppressjonijiet                                                                                                                                                                              | Iva għall-istess origin, konsultattiv għall-forks                                                    |
| `Merge integrity (changelog + generated skills)` | PRs li mhumiex draft; sinkronizzazzjoni taċ-changelog u tal-skills iġġenerati                                                                                                                                                         | Iva għall-istess origin, konsultattiv għall-forks                                                    |

#### Rapport tat-tests relatati minsija

`npm run check:forgotten-sibling-tests` jerġa’ juża l-import resolver li hemm wara l-mappa tal-impatt tat-tests.
Għal kull modulu tal-produzzjoni mibdul, dan jirrapporta ktajjen deterministiċi
`changed module/symbol -> static consumer -> candidate sibling test` meta t-test kandidat
ikun nieqes mid-diff tal-pull request. Is-sommarju Markdown u r-riżultat JSON jinżammu bħala
l-artifact tal-workflow `forgotten-sibling-tests` għall-kalibrazzjoni qabel kwalunkwe introduzzjoni bħala rekwiżit ta’ mblukkar.

Ir-re-exports tal-barrel u l-imports dinamiċi huma biss dijanjostiċi tar-riżoluzzjoni; qatt ma joħolqu
sejba li timblokka. L-eċċezzjonijiet riveduti jinsabu f’
`config/quality/forgotten-sibling-allowlist.json`. Kull entrata trid issemmi l-konsumatur u t-test
kandidat, tagħti raġuni speċifika, u tinkludi link għal issue jew pull request ta’ GitHub. Entrati b’format ħażin
ifallu b’mod magħluq. L-eċċezzjonijiet ma jistgħux jissopprimu test kandidat imħassar jew diff li jżid `.skip`/`.todo`;
id-dgħufija tal-assertions u tipi oħra ta’ masking jibqgħu taħt ir-responsabbiltà tal-gate
`check:test-masking`, li jimblokka b’mod indipendenti.

### Job: `lint`

Jitħaddem fuq kull PR lejn `main`. Jimblokka l-merge jekk ifalli.

| Skript (`npm run ...`)            | Jivvalida                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Imblukkar                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `check:node-runtime`              | Il-verżjoni ta’ Node.js tinsab fil-medda appoġġjata                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Iva                                          |
| `check:cycles`                    | Importazzjonijiet ċirkolari — il-moduli kollha ta’ `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Iva                                          |
| `check:route-validation:t06`      | Skemi Zod preżenti fir-rotot kollha (politika tal-Livell 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Iva                                          |
| `check:any-budget:t11`            | L-għadd ta’ `@ts-expect-error // any` ma jaqbiżx il-baġit (catraca tal-Livell 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:provider-consistency`      | Kull fornitur f’`providers.ts` għandu entrata korrispondenti f’`providerRegistry.ts` (u viċi versa, fil-limiti tal-lista ta’ permessi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Iva                                          |
| `check:model-lifecycle`           | It-tliet tabelli tar-routing miżmuma manwalment jibqgħu konsistenti mal-istampa taċ-ċiklu tal-ħajja inkluża fir-repo (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ma tagħti punteġġ lil ebda ID irtirat li `REGISTRY` jista’ jirrotja; kull mira ta’ `BUILT_IN_ALIASES` tinsab f’`REGISTRY` u hija assenti mill-istampa tal-IDs irtirati; kull ID irtirat li għadu f’`REGISTRY` jiġi mgħoddi jew ikun elenkat f’`allowedRetiredInCatalog`; u ebda sors jew mira ta’ `DEFAULT_DEGRADATION_MAP` ma jidher bħala rtirat f’dik l-istampa. Dan ma jagħtix prova li mudell bħalissa qed jiġi pprovdut minn upstream attiv. Offline — iqabbel ma’ `config/quality/model-lifecycle.json`, aġġornat manwalment b’`npm run quality:refresh-model-lifecycle` (netwerk; mhux integrat fis-CI). `allowedRetiredInCatalog` huwa mekkaniżmu ratchet ta’ tnaqqis progressiv: żid entrata biss flimkien ma’ issue ta’ traċċar. | Iva                                          |
| `check:fetch-targets`             | Kull `fetch("/api/...")` f’`src/` fuq in-naħa tal-klijent jirriżolvi għal `route.ts` reali                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Iva                                          |
| `check:deps`                      | Id-dipendenzi kollha li jistgħu jiġu installati b’`npm install` fil-`package.json` kollha fir-repo jinsabu f’`dependency-allowlist.json`; pakketti ġodda mingħajr verżjoni fissa jew slopsquatted jiġu mmarkati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Iva                                          |
| `audit:deps`                      | `npm audit` (root + electron) — ebda avviż ta’ severità għolja/kritika (jikkoinċidi ma’ `check:vuln-ratchet` ta’ osv; ara l-Lista Pendenti tar-Razzjonalizzazzjoni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Iva                                          |
| `check:lockfile`                  | Integrità ta’ `package-lock.json` — reġistru https, hashes tal-integrità, ebda sostituzzjoni tal-host                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Iva                                          |
| `check:licenses`                  | Lista permessa ta’ liċenzji SPDX għad-dipendenzi tal-produzzjoni                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Iva                                          |
| `check:tracked-artifacts`         | Ebda artefatt tal-build / symlink ta’ `node_modules` ikkommittjat (jitħaddem ukoll fil-pre-commit ta’ husky; il-pre-push huwa intenzjonalment ħafif — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:ai-attribution`            | Ebda trailer `Co-Authored-By` tal-AI/bot jew footer ta’ ġenerazzjoni bl-AI fil-commits, fit-titlu jew fil-korp tal-PR — Regola Stretta #16 (fil-loop tal-fast-gates ta’ `quality.yml` għal PR→`release/**` — jaqra l-payload tal-avveniment u ma jagħmel xejn barra mill-PRs — u pass għall-PRs biss fil-lint ta’ `ci.yml` għal PR→`main`; kif ukoll il-hook `commit-msg` ta’ husky; koawturi umani huma permessi; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `check:vitest-exclusions`         | Kull esklużjoni ta’ Vitest issemmi issue ta’ traċċar u tidher f’`config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Iva                                          |
| `check:file-size`                 | Ebda fajl tas-sors ma jaqbeż il-limitu għal kull estensjoni (ratchet: fajls kbar iffriżati fil-lista `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Iva                                          |
| `check:error-helper`              | It-tweġibiet ta’ żball fl-eżekuturi/handlers jużaw `buildErrorBody()` / `sanitizeErrorMessage()` (Regola Stretta #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Iva                                          |
| `check:migration-numbering`       | Il-fajls SQL tal-migrazzjoni huma nnumerati b’mod sekwenzjali, mingħajr lakuni jew duplikati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:public-creds`              | L-ebda `client_id`/`client_secret` OAuth litterali jew ċwievet Firebase Web barra minn `publicCreds.ts` (Regola Stretta #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:db-rules`                  | L-ebda SQL mhux ipproċessat barra mill-moduli `src/lib/db/`; l-ebda importazzjoni barrel minn `localDb.ts` (Regoli Stretti #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:known-symbols`             | L-eżekuturi tal-fornituri, l-istrateġiji tar-routing, u t-tradutturi rreġistrati fit-tabelli tad-dispaċċ tagħhom jaqblu mal-fajls fuq id-diska — mingħajr simboli orfni jew mhux iddikjarati                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:route-guard-membership`    | Kull rotta li tniedi proċess sekondarju hija kklassifikata minn `isLocalOnlyPath()` (Regoli Stretti #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `check:test-discovery`            | Kull fajl `*.test.ts` / `*.spec.ts` fir-repo jinġabar minn mill-inqas test runner wieħed (ratchet: il-lista ta’ fajls orfni f’`test-discovery-baseline.json` tista’ biss tiċkien)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Iva                                          |
| `check:agent-skills-sync`         | L-artifatti ġġenerati ta' agent-skills jaqblu mal-katalgu tas-sors tagħhom (mingħajr diverġenza)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `check:provider-asset-provenance` | Il-logos/assi tal-fornituri għandhom entrata rreġistrata tal-provenjenza                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `lint:json`                       | Il-fajls ta' konfigurazzjoni JSON jiġu analizzati b'suċċess u jissodisfaw ir-regoli tal-lint tar-repożitorju                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `typecheck:core`                  | Kompilazzjoni ta' TypeScript mingħajr żbalji (twissijiet konsultattivi biss)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Iva                                          |
| `typecheck:noimplicit:core`       | `noImplicitAny` strett — b'ħarsa lejn il-futur; ħafna siti ta' sejħiet eżistenti għad għandhom bżonn annotazzjonijiet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | **Konsultattiv** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitat għal `src/app/(dashboard)/**` (#7033) — il-lista ta' permessi kkurata ta' 27 fajl ta' `typecheck:core` ma tinkludi ebda TSX tad-dashboard, u `next build` lanqas qatt ma jagħmel verifika tat-tipi tiegħu (`next.config.mjs` jistabbilixxi `ignoreBuildErrors: true`), għalhekk rigressjonijiet ta' identifikaturi iżolati hemmhekk (#6625/#6909) ma kinux jidhru fis-CI. Isiru differenzi kontra linja bażi ffriżata tal-għadd għal kull fajl/għal kull kodiċi TS (`config/quality/dashboard-typecheck-baseline.json`, bl-istess mudell ta' infurzar kontra data skaduta bħal `check:known-symbols`) — żbalji ĠODDA biss lil hinn mill-għadd fil-linja bażi jfallu l-kontroll; baxxi l-limitu progressivament b'`--update` meta jiġi rranġat żball eżistenti.                                                                                                                                  | Iva                                          |

### Kompitu: `quality-gate`

Jitħaddem wara `test-coverage`. Jibblokka l-merge jekk ifalli.

| Skript                       | Jivvalida                                                                                                                                                                                                      | Imblokkanti            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Jiġġenera `quality-metrics.json` (għadd ta’ twissijiet ta’ ESLint, kopertura mir-rapport ikkombinat tax-shards)                                                                                                | Iva (qabel ir-ratchet) |
| `quality:ratchet`            | Kull metrika f’`quality-baseline.json` ma marritx lura (twissijiet ta’ ESLint ≤ il-linja bażi; kopertura ≥ il-linja bażi)                                                                                      | Iva                    |
| `check:duplication`          | Id-duplikazzjoni tal-kodiċi (jscpd@4) ma taqbiżx il-linja bażi f’`quality-baseline.json`                                                                                                                       | Iva                    |
| `check:complexity`           | Il-kumplessità ċiklomatika fil-livell tal-fajl ma taqbiżx il-limitu (ESLint ewlieni `complexity` + `max-lines-per-function`)                                                                                   | Iva                    |
| `check:cognitive-complexity` | Ratchet tal-kumplessità konjittiva (`eslint-plugin-sonarjs`) — pass separat ta’ ESLint; is-CI jħaddem it-tnejn magħqudin bħala l-pass uniku `check:complexity-ratchets`                                        | Iva                    |
| `check:dead-code`            | Ir-ratchet tal-esportazzjonijiet / fajls mhux użati (knip) ma jmurx lura meta mqabbel mal-linja bażi                                                                                                           | Iva                    |
| `check:compression-budget`   | Baġit tal-parametru referenzjarju tal-kompressjoni — il-limiti minimi tal-iffrankar tat-tokens għal kull magna ma jridux imorru lura                                                                           | Iva                    |
| `check:type-coverage`        | Ir-ratchet tal-perċentwal b’tipi (`type-coverage`) ma jmurx lura; fil-biċċa l-kbira jissostitwixxi `typecheck:noimplicit:core`                                                                                 | Iva                    |
| `check:codeql-ratchet`       | L-għadd ta’ twissijiet CodeQL miftuħa ma jmurx lura (jaqra permezz ta’ `gh api`; jaqbeż b’mod sigur mingħajr token) — għall-frekwenza tal-aġġornament u l-attivazzjoni manwali: ara "CodeQL ratchet" hawn taħt | Iva                    |

### Biċċa xogħol: `quality-extended`

Il-biċċa xogħol kollha hija konsultattiva (`continue-on-error: true`). Ir-ratchets ibbażati fuq npm jitħaddmu
tassew; l-iskanners esterni jiġu installati permezz ta’ `gh release download` u jaqbżu lilhom infushom (exit 0)
meta binarju jkun għadu nieqes.

| Skript                   | Jivvalida                                                                                                                                                                                                                       | Imblokkanti      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check:circular-deps`    | Ebda dipendenza ċirkolari (dpdm)                                                                                                                                                                                                | **Konsultattiv** |
| `check:bundle-size`      | Id-daqs tal-bundle ma jaqbiżx il-limitu                                                                                                                                                                                         | **Konsultattiv** |
| `check:secrets`          | Skennjar tas-sigrieti (gitleaks) — jinqabeż jekk il-binarju jkun nieqes                                                                                                                                                         | **Konsultattiv** |
| `check:vuln-ratchet`     | Il-vulnerabbiltajiet tad-dipendenzi (osv-scanner) ma jmorrux lura — jinqabeż jekk il-binarju jkun nieqes                                                                                                                        | **Konsultattiv** |
| `check:workflows`        | Verifika tal-workflows (actionlint + zizmor) — tinqabeż jekk il-binarji jkunu nieqsa                                                                                                                                            | **Konsultattiv** |
| `check:openapi-breaking` | Bidliet inkompatibbli fil-kuntratt tal-API pubblika (`openapi.yaml`) meta mqabbla mal-fergħa bażi (oasdiff) — jiġġenera `openapiBreaking=N`; jinqabeż jekk oasdiff ikun nieqes jew l-ispeċifikazzjoni bażi ma tkunx riżolvibbli | **Konsultattiv** |

### Biċċa xogħol: `docs-sync-strict`

Titħaddem ma’ kull PR lejn `main`. Timblokka l-merge jekk tfalli.

| Skritt                         | Jivvalida                                                                                                                                                                                                                                | Imblokkanti                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `check:docs-all`               | Meta-kontroll li jħaddem is-6 sottokontrolli ta’ hawn taħt b’mod sekwenzjali                                                                                                                                                             | Iva                                 |
| ↳ `check:docs-sync`            | Konsistenza tal-verżjonijiet bejn CHANGELOG / OpenAPI / llm.txt                                                                                                                                                                          | Iva                                 |
| ↳ `check:docs-counts`          | L-għadd imsemmi fit-test (għadd ta’ fornituri, għadd ta’ migrazzjonijiet, eċċ.) jinsab fil-medda ratcheted tal-għadd reali                                                                                                               | Iva                                 |
| ↳ `check:env-doc-sync`         | Kull varjabbli tal-ambjent f’`.env.example` hija ddokumentata f’tabella tad-dokumentazzjoni, u viċi versa                                                                                                                                | Iva                                 |
| ↳ `check:deprecated-versions`  | Ma hemm l-ebda sekwenza ta’ verżjoni deprekata fid-dokumentazzjoni                                                                                                                                                                       | Iva                                 |
| ↳ `check:doc-links`            | Il-links markdown interni fid-dokumentazzjoni jirriżolvu għal fajls reali (fil-forma `[text]`/`(path)`)                                                                                                                                  | Iva                                 |
| ↳ `check:fabricated-docs`      | Ir-rotot, il-varjabbli tal-ambjent, il-kmandi CLI, l-ismijiet tal-hooks u l-mogħdijiet tal-fajls iċċitati fid-dokumentazzjoni jeżistu fil-codebase. Kontroll strett permezz ta’ `--strict`; falliment mhux imblokkanti mingħajr il-flag. | Iva (permezz ta’ `--strict` fis-CI) |
| `check:cli-i18n`               | Is-sekwenzi tal-kmandi CLI huma preżenti fil-fajls kollha tal-lokalitajiet i18n                                                                                                                                                          | Iva                                 |
| `check:openapi-coverage`       | L-ispeċifikazzjoni OpenAPI tkopri mill-inqas limitu minimu ratcheted tar-rotot reali                                                                                                                                                     | Iva                                 |
| `check:openapi-security-tiers` | L-annotazzjonijiet tal-livelli tas-sigurtà f’`openapi.yaml` huma konsistenti mal-klassifikazzjonijiet f’`routeGuard.ts`                                                                                                                  | **Konsultattiv**                    |
| `check:openapi-routes`         | Kull mogħdija f’`openapi.yaml` tirriżolvi għal `route.ts` reali (kontra l-alluċinazzjoni)                                                                                                                                                | Iva                                 |
| `check:docs-symbols`           | Kull referenza għal `/api/...` f’`docs/**/*.md` tirriżolvi għal `route.ts` reali (kontra l-alluċinazzjoni)                                                                                                                               | Iva                                 |
| `i18n translation drift`       | Ċwievet mhux tradotti fil-fajls tal-lokalitajiet i18n — twissija biss                                                                                                                                                                    | **Konsultattiv**                    |

### Kompitu: `i18n-ui-coverage`

| Skritt                            | Jivvalida                                                                                                                                                                                                         | Imblokkanti      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Il-kopertura taċ-ċwievet i18n tal-UI hija ≥ 65%                                                                                                                                                                   | Iva              |
| `check-ui-value-drift` (inline)   | **Valur** bl-Ingliż miktub mill-ġdid ma jħalli warajh l-ebda traduzzjoni skaduta                                                                                                                                  | Iva              |
| `check-new-key-coverage` (inline) | Ċavetta **ġdida** bl-Ingliż hija tradotta f’kull lokalità — markatur `__MISSING__:` jiġi rrifjutat                                                                                                                | Iva              |
| `check-translation-ratio`         | Il-proporzjon ta’ traduzzjonijiet reali għal kull lokalità (elementi identiċi għall-Ingliż / placeholders / neqsin barra mill-allowlist) ma jridx jaqbeż `config/quality/i18n-translation-baseline.json` + marġni | **Konsultattiv** |

Jeħtieġ `fetch-depth: 0` — il-kontroll tad-differenzi fil-valuri jqabbel `en.json` mal-bażi tal-merge.

#### `check-ui-value-drift` — kontroll għal traduzzjonijiet skaduti

Jaqbad l-unika rigressjoni i18n li l-kontrolli l-oħra strutturalment ma jistgħux jaraw: valur bl-Ingliż
jinkiteb mill-ġdid filwaqt li t-traduzzjonijiet derivati mill-Ingliż _preċedenti_ jibqgħu hemm, biex
b’hekk utenti li ma jużawx l-Ingliż jibqgħu jaqraw test miktub b’ċertezza iżda li issa huwa żbaljat.

Dan fil-fatt ġie rilaxxat. `oauthModal.googleOAuthWarning` inkiteb mill-ġdid meta ġie introdott
l-helper tal-login Antigravity (#5203); **39 minn 43 lokalità** żammew test li kien jgħid lill-operaturi biex “jikkopjaw
il-URL sħiħ u jwaħħluh hawn taħt” — fluss li ma jistax jitlesta għal dak il-fornitur. Dan
ma ġiex innutat qabel #8463 minħabba li:

- `sync-ui-keys` jimla biss ċwievet li huma **neqsin**, u qatt dawk li huma **skaduti**;
- `check-ui-keys-coverage` jgħodd il-_preżenza_ taċ-ċwievet, għalhekk traduzzjoni skaduta titqies bħala koperta;
- `check-translation-drift` isegwi l-mirja tad-dokumentazzjoni `docs/i18n/<locale>/**.md` —
  qatt ma jaqra `src/i18n/messages/*.json`. Imblokkanti fil-kompitu `docs-sync-strict` mir-risinkronizzazzjoni
  ta’ 2026-09: editja dokument ewlieni → `npm run i18n:run -- --files=<doc>` (fil-livell tat-taqsima, irħis).

**Konxju tad-diff, mhux ibbażat fuq baseline.** Huwa jqabbel `en.json` fil-bażi tal-merge mas-siġra
tax-xogħol; għal kull ċavetta li l-valur tagħha bl-Ingliż inbidel, kwalunkwe locale li għadu fih
traduzzjoni mhux mibdula jitqies skadut. Dan intenzjonalment **jiffriża d-dejn preeżistenti** — diff
ma jistax jiżvela minn liema verżjoni antika bl-Ingliż oriġinat traduzzjoni li ilha teżisti, għalhekk il-kontroll
jiġġudika biss dak li tmiss il-bidla attwali. L-alternattiva (baseline b’hash għal kull ċavetta) tkun teħtieġ
fajl iġġenerat ta’ ~600 KB, 3× akbar mill-akbar baseline eżistenti, u jinbidel ma’ kull PR tal-i18n.

Hemm żewġ modi kif tissodisfah:

1. aġġorna t-traduzzjonijiet affettwati, jew
2. issettjahom għal `__MISSING__:<new english>` — waqt l-eżekuzzjoni mbagħad jiġi servut l-Ingliż ikkoreġut
   (`src/i18n/request.ts::deepMergeFallback`, #7258) u ċ-ċavetta tidħol fil-kju għat-traduzzjoni.

Jekk inbidlet it-**tifsira** tas-sekwenza, ippreferi li **tbiddel l-isem taċ-ċavetta**: ċavetta ġdida ma tistax tiret
traduzzjoni skaduta. Dan huwa l-mudell li ntuża f’#8463.

```bash
npm run i18n:check-value-drift          # strett (dak li jħaddem is-CI)
npm run i18n:check-value-drift:warn     # rapport biss
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Joħroġ b’0 u `SKIP reason=base-unresolved` meta l-katalgu bażi ma jkunx jista’ jinqara (clone baxx
mingħajr ir-ref bażi), bħalma jagħmel `check-openapi-breaking`.

### Kompitu: `i18n`

Matriċi sħiħa ta’ validazzjoni tal-i18n (kompitu wieħed għal kull locale). Il-kompitu kollu huwa konsultattiv.

| Skript                          | Jivvalida                                       | Imblukkar                                                         |
| ------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------- |
| `validate_translation.py quick` | Il-kompletezza tat-traduzzjoni għal kull locale | **Konsultattiv** (`continue-on-error: true` fuq il-kompitu kollu) |

### Kompitu: `pr-test-policy`

Jitħaddem fuq pull requests biss.

| Skript                 | Jivvalida                                                                                                                                                | Imblukkar |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PRs li jibdlu l-kodiċi tal-produzzjoni f’`src/`, `open-sse/`, `electron/`, jew `bin/` iridu jinkludu jew jaġġornaw it-testijiet (Regola Stretta #8)      | Iva       |
| `check:test-masking`   | Il-fajls tat-test mibdula ma jnaqqsux l-għadd nett ta’ asserts u ma jżidux tautoloġiji `assert.ok(true)`                                                 | Iva       |
| `check:pr-evidence`    | Il-korp tal-PR jiċċita evidenza tat-testijiet/VPS għall-bidla (jimmekkanizza r-Regola Stretta #18 billi jfittex fit-test tal-PR — fraġli, ara l-Backlog) | Iva       |

### Kompitu: `test-vitest`

Jitħaddem wara `build`. Jimblokka l-merge jekk ifalli.

| Ġabra            | Jivvalida                                                     | Imblukkar                                                                                                                     |
| ---------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Server MCP (110 għodda), autoCombo, cache — runner ta’ vitest | Iva                                                                                                                           |
| `test:vitest:ui` | Testijiet tal-komponenti tal-UI — runner ta’ vitest           | **Jimblokka** — il-fallimenti preeżistenti huma espliċitament esklużi f’`vitest.config.ts`; fallimenti ġodda jfallu l-kompitu |

### Workflows ta’ kull lejl (skedati, konsultattivi)

Dawn jitħaddmu skont skeda cron (u `workflow_dispatch`), u qatt fuq PRs. Kollha huma konsultattivi.

| Workflow               | Jivvalida                                                                                                                                                                        | Imblukkar        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `nightly-property`     | Testijiet tal-proprjetajiet b’fast-check b’seed każwali + għadd għoli ta’ eżekuzzjonijiet                                                                                        | **Konsultattiv** |
| `nightly-resilience`   | Kontroll tat-tkabbir tal-heap, injezzjoni ta’ ħsarat kaotiċi, testijiet ta’ tagħbija/soak b’k6                                                                                   | **Konsultattiv** |
| `nightly-llm-security` | Protezzjoni kontra l-injezzjoni ta’ promptfoo (modalità ta’ mblukkar) + probes ta’ garak (jinqabżu mingħajr sigriet tal-provider)                                                | **Konsultattiv** |
| `nightly-schemathesis` | Fuzzing tal-kuntratt OpenAPI (schemathesis) kontra OmniRoute attiv bl-użu ta’ `docs/openapi.yaml` — jikxef ksur tal-ispeċifikazzjoni / żbalji 500 mhux immaniġġjati (Fażi 8 B.4) | **Konsultattiv** |
| `nightly-mutation`     | Punteġġ tal-ittestjar tal-mutazzjonijiet ta’ Stryker fuq il-passaġġ rapidu tat-testijiet tal-unità — mutanti li jibqgħu ħajjin jikxfu asserts dgħajfa                            | **Konsultattiv** |
| `nightly-compat`       | Matriċi tal-kompatibbiltà tal-engine ta’ Node fil-firxiet appoġġjati ta’ `engines.node`                                                                                          | **Konsultattiv** |

---

## Fażi tal-veloċità (2026-08-30 → v4.0 LTS): kull linja bażi ġiet illaxkata b'20%

Deċiżjoni tas-sid (2026-08-30): sal-modularizzazzjoni ta' v4.0, il-veloċità tal-ħruġ hija aktar importanti
milli jinżamm il-limitu tad-dejn. Kull linja bażi **numerika** tar-ratchet ġiet illaxkata b'20% f'pass wieħed
awditjabbli, u l-fażi hija ddikjarata f'`config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| X'inbidel                                                                                                                                                                                                                              | Fejn                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — għadd fejn inqas huwa aħjar ×1.2, perċentwali fejn aktar huwa aħjar ÷1.2 (il-limitu minimu tal-kopertura ta' 60 inżamm, `eslintErrors` jibqa' 0, `eslintWarnings` 0 → 20% tal-għadd iffriżat tas-soppressjonijiet) | `quality-baseline.json` (in-nota `_relax_velocity_2026_08_30` telenka kull valur ta' qabel → wara)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                       | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, kull limitu ta' linja `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                             | `file-size-baseline.json`                                                                              |
| għadd għal kull fajl / għal kull kodiċi TS ×1.2                                                                                                                                                                                        | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                    | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` isir konsultattiv waqt li `_policy.requireTighten === false`                                                                                                                                                       | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| il-proċess ta' billejl `bank-ratchet-shrinks` jieqaf temporanjament (kieku jirreġistra t-tnaqqis imkejjel u jneħħi l-marġni disponibbli)                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

Il-listi ta' permessi (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **mhumiex** baġits u ma ntmessux. Il-punti ta' kontroll tal-politika għas-suċċess/falliment (sigrieti, regoli SQL,
kuntratt tad-dokumentazzjoni/ambjent, parità i18n, testijiet tal-unitajiet) ma nbidlux — test aħmar għadu test aħmar.

**Għodod**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — l-illaxkar
  ta' darba (`scripts/quality/relax-baselines.mjs`); jirrifjuta li jitħaddem darbtejn bl-istess
  nota.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  ikejjel kull punt ta' kontroll numeriku bl-istess mod bħas-CI u jistampa l-marġni disponibbli li jifdal għal kull punt ta' kontroll
  (`scripts/quality/baseline-headroom.mjs`). Il-job ta' billejl `baseline-headroom` jippubblika t-
  tabella fil-kwistjoni attiva **📈 Marġni disponibbli tal-linja bażi (fażi tal-veloċità)** u jżid it-
  tikketta `headroom-alert` meta xi punt ta' kontroll ikun sa 10% mil-limitu massimu tiegħu jew ikun diġà qabżu. Dik il-kwistjoni
  hija t-twissija bikrija: baġit li jimtela fi ftit jiem ifisser li l-illaxkar qed jiġi kkunsmat minn
  ftit PRs, mhux mit-tim kollu — ara n-noti `_rebaseline_*` tal-punt ta' kontroll li qed jikkawża l-problema.

**Modalità għal kodiċi ġdid (Clean-as-You-Code) — mill-2026-08-30, rotta rapida tal-PR biss**

F'avvenimenti `pull_request`, `quality.yml` jgħaddi `--base-ref <PR base SHA>` lil `check:file-size`,
`check:complexity-ratchets` u `check:dead-code`. F'dik il-modalità, il-punt ta' kontroll iqabbel HEAD mal-
merge-base **ristrett għall-fajls li mess il-PR** (`scripts/check/newCodeMode.mjs`: il-
merge-base jiġi mmaterjalizzat f'`git worktree` temporanju, ESLint/knip jitħaddmu hemmhekk u fuq HEAD, u l-
għadd għal kull fajl jitqabbel permezz tad-differenzi):

- **jimblokka** — il-PR żied ksur tal-kumplessità ċiklomatika/konjittiva jew exports mhux użati fil-fajls li biddel
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` fil-log);
- **konsultattiv** — it-total globali mqabbel mal-linja bażi ffriżata. Devjazzjoni li tintiret qatt ma tagħmel aħmar
  PR innoċenti; id-devjazzjoni terġa' tiġi ffriżata waqt ir-rikonċiljazzjoni tar-rilaxx u tiġi mmonitorjata mill-job tal-marġni disponibbli.

L-eżekuzzjonijiet `workflow_dispatch`, il-verifika komprensiva release-green u l-job ta' billejl tal-marġni disponibbli ma għandhomx bażi tal-PR
u jżommu t-tqabbil assolut (globali). Il-kopertura, id-duplikazzjoni u l-kopertura tat-tipi jibqgħu globali
għalissa (l-għodod tagħhom ma jipproduċux differenza għal kull fajl bi spiża baxxa) — kandidati għall-istess trattament.

**Għeluq tal-fażi f'v4.0 (LTS = aktar strett minn qabel, mhux "lura għan-normal")**

1. Fuq il-ponta nadifa ta’ `release/v4.0.0`: ħaddem `npm run quality:headroom --json` għar-rekord, imbagħad
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, u
   `--update` għal kull xatba tat-typecheck — kull linja bażi tinżel għall-valur imkejjel.
2. Ħassar `_policy` minn `quality-baseline.json` (dan jerġa’ jattiva `--require-tighten` u
   l-akkumulazzjoni ta’ billejl), u rrestawra `THRESHOLD = 36` (jew ogħla) f’`check-openapi-coverage.mjs`.
3. Issikka lil hinn mill-valuri mkejla fejn il-modularizzazzjoni tat il-frott: erġa’ niżżel il-`cap`
   tad-daqs tal-fajl għal 1000 (jew 800), għolli l-limiti minimi tal-kopertura b’5, u stabbilixxi
   l-esportazzjonijiet mhux użati għal 0 għall-pakketti modularizzati.

## Linja bażi tar-ratchet (`quality-baseline.json`)

Il-magna tar-ratchet (`scripts/quality/check-quality-ratchet.mjs`) taqra `quality-baseline.json`
u tqabblu mal-`quality-metrics.json` li jkun għadu kif inġabar. Kwalunkwe metrika li tmur lura
lil hinn mill-epsilon tagħha twassal biex il-build ifalli.

Il-metriki li bħalissa qed jiġu ssorveljati:

| Metrika               | Direzzjoni | Tifsira                                             |
| --------------------- | ---------- | --------------------------------------------------- |
| `eslintWarnings`      | `down`     | L-għadd ta’ twissijiet ta’ ESLint ma jistax jiżdied |
| `coverage.statements` | `up`       | Il-kopertura tal-istqarrijiet ma tistax tonqos      |
| `coverage.lines`      | `up`       | Il-kopertura tal-linji ma tistax tonqos             |
| `coverage.functions`  | `up`       | Il-kopertura tal-funzjonijiet ma tistax tonqos      |
| `coverage.branches`   | `up`       | Il-kopertura tal-fergħat ma tistax tonqos           |

Biex taġġorna l-linja bażi wara titjib ġenwin:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Il-flag `--update` jikteb il-valuri mkejla attwali f’`quality-baseline.json`.
Agħmel commit ta’ dan il-fajl flimkien mal-bidla li tejbet il-metrika. PR li ttejjeb
metrika mingħajr ma taġġorna l-linja bażi tinqabad minn `--require-tighten` (Fażi 6A.5,
l-implimentazzjoni għadha pendenti).

### Ratchet ta’ CodeQL: frekwenza tal-aġġornament u attivazzjoni manwali

`check:codeql-ratchet` jaqra **l-istat tar-repożitorju, aġġornat skont skeda — mhux għal kull PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` jirrapporta
`state: configured`, `schedule: weekly`: l-iskan tad-default setup ta’ GitHub, mhux analiżi
għal kull push. Konsegwenza: wara li jingħaqad PR li JIRRANĠA l-allerti, ir-ratchet jibqa’
jaqra l-għadd l-antik u ogħla sakemm jitħaddem l-iskan skedat li jmiss — għalhekk jirrapporta
rigressjoni fuq kull PR miftuħ, inklużi l-bidliet sussegwenti tal-istess PR li jkun wettaq
it-tiswija, sakemm l-iskan ilaħħaq.

**Aġġornament manwali**: `gh workflow run codeql.yml --ref release/vX.Y.Z` jerġa’ jħaddem
l-analiżi u jerġa’ jippubblika l-allerti fi ftit minuti. L-ewwel aqra `.github/workflows/codeql.yml`
— l-intestatura tiegħu tispjega li huwa għal `workflow_dispatch` biss **għax joħloq kunflitt mad-
"default setup" ta’ GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Ir-restawr tal-attivaturi `push`/`pull_request`/
`schedule` l-ewwel jirrikjedi **azzjoni mis-sid**: Settings → Code security →
CodeQL: Default → Advanced. Iżżidx attivatur `schedule:` mingħajr dik il-bidla — dan
jirriżulta biss f’eżekuzzjonijiet li jfallu.

**Issikka l-linja bażi wara li jonqos l-għadd** — `node scripts/check/check-codeql-ratchet.mjs
--update` jikteb l-għadd il-ġdid imkejjel f’`quality-baseline.json` →
`metrics.codeqlAlerts.value`, sabiex ir-ratchet ma jippermettix b’mod sieket rigressjoni lura
sal-limitu l-antik. Eżempju prattiku (2026-09-02/03): PR #12502 irranġa 7 allerti reali
(13 → 6 miftuħa kif imkejla); PR #12530 issikka l-linja bażi ffriżata minn 11 → 6 biex taqbel;
is-6 li kien fadal imbagħad ġew miċħuda b’ġustifikazzjoni għal kull allert sakemm ma baqa’
ebda wieħed miftuħ.

**Iċ-ċaħdiet huma deċiżjoni tal-operatur (Regola Stretta #14)** — qatt tiċħad allert ta’ CodeQL
mingħajr ma tirreġistra l-ġustifikazzjoni teknika fil-kumment taċ-ċaħda: `won't fix` għal
rekwiżit ta’ protokoll upstream, `used in tests` għal fixture tat-testijiet, `false positive`
għal sanitizer li CodeQL ma jistax jara (preċedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Politika ta' Ripetizzjoni tat-Testijiet (WS5.4, v3.8.49)

Ir-ripetizzjoni hija għal kull runner separatament, qatt politika ġenerali — ripetizzjoni ġenerali tibdel rigressjonijiet reali
fi flakes inviżibbli:

| Runner           | Politika                                                                                                                                        | Għaliex                                                                                                                                  |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` fis-CI biss, bi `trace: on-first-retry`                                                                                            | It-timing tal-browser/netwerk huwa ġenwinament mhux deterministiku; ripetizzjoni waħda bi trace tibdel flake f'artefatt dijanjostikabbli |
| Vitest           | L-EBDA ripetizzjoni globali. Test ippruvat li hu flaky jingħata ripetizzjoni espliċita għal dak it-test (viżibbli fid-diff, rieżaminata fil-PR) | Iżżomm il-lista ta' kwarantina fir-repo, u qatt opaka                                                                                    |
| node:test (unit) | L-EBDA ripetizzjoni, qatt                                                                                                                       | Test tal-unità flaky huwa bug fit-test — irranġah, terġax tippruvah b'mod każwali                                                        |

SLOs fil-mira ladarba tidħol it-telemetrija tal-flakes (WS5.2/5.3): rata ta' flakes <1% għal kull test
(limitu ta' "irranġa issa"), rata ta' suċċess ≥95% għal kull pipeline. Valuri ta' referenza tal-industrija —
ikkalibrahom mill-ġdid skont il-kejl tagħna stess.

## Devjazzjoni tar-Ratchet fil-Livell tar-Release (WS5.5, v3.8.49)

Meta ratchet (daqs tal-fajl, kumplessità, twissijiet tal-eslint) jirrigressa fit-tip PUR tar-release
— jiġifieri l-KOMBINAZZJONI tal-merges ikkawżat ir-rigressjoni, u l-ebda PR waħdu ma jirriproduċi
r-rigressjoni fuq il-branch tiegħu stess — ir-responsabbiltà għat-tiswija hija tal-**kaptan tar-release, darba biss, fuq
il-branch tar-release**: ippreferi estrazzjoni/refactor; erġa' stabbilixxi l-baseline biss b'entrata ta'
ġustifikazzjoni ddokumentata. Qatt titfa' devjazzjoni kkawżata mill-kombinazzjoni fuq PR ta' kontributur, u qatt
terġa' tistabbilixxi l-baseline għal kull PR (dan jaħbi rigressjonijiet reali). L-ewwel iddistingwi: irriproduċi
l-istatus aħmar fuq it-tip pur f'worktree ta' prova qabel tassumi li l-PR tiegħek ikkawżah.

## Kif Jiġu Bankjati t-Tnaqqisiet tar-Ratchet — id-direzzjoni 'l isfel (#8584)

Ir-ratchet huwa awtomatiku biss bin-nofs, u huwa n-nofs il-ħażin. **Li tgħolli** limitu huwa
editjar manwali tal-JSON li jieħu għaxar sekondi u huwa l-aktar mod veloċi biex tiżblokka PR aħmar.
**Li tbaxxi** limitu jeħtieġ li xi ħadd iħaddem `--update` u jagħmel commit tar-riżultat — u sakemm
daħal il-job `bank-ratchet-shrinks`, l-ebda workflow ma kien iħaddmu. Il-konsegwenza mkejla
(2026-07-25): 18-il fajl iffriżat diġà kienu fil-limitu l-ġdid ta' 800 linja għal kull fajl jew taħtu, bl-agħar wieħed
f'132× (`src/shared/validation/schemas.ts`, 19-il linja b'limitu ta' 2,523); il-limitu massimu
tal-kumplessità mexa `1794 → 2169` tul ~37 nota ta' stabbiliment mill-ġdid tal-baseline b'tnaqqis wieħed eżatt
(−1); u "issikka permezz ta' `--update` fiċ-ċiklu li jmiss" inkiteb 31 darba u ġie rrispettat
darba. Limitu li jibqa' jeżisti wara l-kodiċi li ġġustifikah jikkonverti fis-skiet kull
dekompożizzjoni kompluta f'konċessjoni għat-tkabbir għal min imiss li jeditja l-fajl.

`nightly-release-green.yml` → il-job **`bank-ratchet-shrinks`** jagħlaq dak iċ-ċiklu:

|             |                                                                                                                     |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| Jaħdem fuq  | `schedule` (3×/jum) + `workflow_dispatch` — deliberatament **mhux** `push`                                          |
| Ikejjel     | l-ogħla `release/vX.Y.Z`, bl-istess riżoluzzjoni + protezzjoni kontra l-injezzjoni bħal `release-green`             |
| Jikteb      | `check:file-size --update` u `check:complexity-ratchets --update` (it-tnejn inaqqsu biss minħabba d-disinn tagħhom) |
| Jivverifika | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                            |
| Jibgħat     | PR wieħed dejjem aġġornat kontra l-branch tar-release — aġġornat bil-forza, qatt ripetut bħala spam                 |

L-ibbankjar isir f'lottijiet minflok ma' kull push għax m'għandu l-ebda rekwiżit ta' latenza (tnaqqis
ibbankjat fi żmien 8 sigħat huwa aċċettabbli), filwaqt li eżekuzzjoni għal kull merge terġa' tibni l-branch tal-PR ripetutament
waqt kampanji ta' merge u tħallas għal passaġġ sħiħ tal-ESLint kull darba. Id-detezzjoni tibqa' ssir fuq
push (`release-green`); l-ibbankjar biss isir f'lottijiet.

### Il-verifikatur tas-sigurtà

Il-job jikteb fil-baselines mingħajr superviżjoni, għalhekk `verify-ratchet-bank.mjs` huwa dak li jagħmel
dan aċċettabbli. Huwa jqabbel id-differenzi tas-siġra wara `--update` ma' `HEAD` u **jwaqqaf il-job
qabel ma jeżisti kwalunkwe commit** — mingħajr ma jiftaħ PR — sakemm kull bidla ma tkunx waħda minn dawn:

- entrata numerika `frozen` / `testFrozen` **imnaqqsa** jew **imneħħija**
- `complexity-baseline.json` → `count` **imnaqqas**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **imnaqqas**

Kull ħaġa oħra tfalli: li tgħolli numru, iżżid entrata, tibdel `cap`/`testCap`, jew
tħassar/tikteb mill-ġdid nota `_rebaseline_*` (dawk in-noti huma r-rekord tal-awditjar ta' għaliex jeżisti kull
limitu massimu u huma maħżuna fl-istess oġġett `frozen` bħall-entrati tal-fajls).
Bot li jista' jgħolli limitu jkun strettament agħar mill-istatus quo. Protezzjoni kontra r-rigressjoni:
`tests/unit/verify-ratchet-bank.test.ts`.

Il-job qatt ma jagħmel push lejn `release/*` — bniedem jagħmel merge tal-PR, għalhekk kejl ħażin
ma jistax jidħol mingħajr rieżami.

## Politika tal-Lista ta' Permessi

Kull gate li ma jistax ifalli minħabba ksur eżistenti juża lista ta' permessi ffrizzata
(eż., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Il-politika hija:

**Irranġa l-kawża ewlenija; uża l-lista ta' permessi biss meta l-ksur ikun diġà jeżisti u
ma jkunx jista' jiġi rranġat fl-istess PR.**

Meta żżid entrata ma' lista ta' permessi:

1. Inkludi kumment bil-ġustifikazzjoni.
2. Irreferi għall-issue tat-traċċar (eż., `// #3498 — Karatteristika tal-Fażi 2, għadha ma ġietx implimentata`).
3. Neħħi l-entrata fl-istess PR li jirranġa l-ksur — entrata skaduta li ma tibqax
   trażżan ksur attiv hija fiha nnifisha difett (l-infurzar kontra entrati skaduti ta' 6A.3
   se jfalli l-gate fuq entrata orfni fil-lista ta' permessi ladarba jiġi implimentat).

**Iżżidx** entrati fil-lista ta' permessi biex it-testijiet jgħaddu aktar malajr. Gate aħdar b'lista
ta' permessi li dejjem tikber jagħti sens falz ta' kwalità.

### Meta gate ifalli fuq il-PR tiegħek

1. **Aqra bir-reqqa l-output tal-gate** — jgħidlek eżattament liema fajl jew simbolu kiser
   ir-regola.
2. **Irranġa l-ksur** — il-biċċa l-kbira tal-gates huma kontrolli deterministiċi tas-sistema tal-fajls li jgħaddu malli
   l-code jkun korrett.
3. **Jekk il-ksur kien diġà jeżisti** (jiġifieri, ma introduċejtux int iżda l-gate issa
   jkoprih): żid entrata fil-lista ta' permessi b'kumment ta' ġustifikazzjoni u issue tat-traċċar.
4. **Jekk il-gate huwa ratchet** (kopertura, twissijiet ta' ESLint, duplikazzjoni, kumplessità):
   il-bidla tiegħek għamlet il-metrika agħar. Irranġa l-problema sottostanti, jew (rarament) ħaddem
   `npm run quality:ratchet -- --update` jekk il-bidla tkun intenzjonata u d-deterjorament
   tal-metrika jkun aċċettabbli — iżda ddokumenta għaliex fid-deskrizzjoni tal-PR.
5. **Gates konsultattivi** (`continue-on-error: true`) huma informattivi — ma jimblukkawx
   il-merge iżda jidhru fis-sommarju tas-CI. Irranġahom xorta waħda.

---

## Żieda ta' Gate Ġdid

1. Oħloq `scripts/check/check-<name>.mjs` (jew `.ts`). Il-gates tal-politika joħorġu b'0/1.
   Gates tat-tip ratchet joħorġu metrika lejn `quality-metrics.json` permezz ta' `collect-metrics.mjs`.
2. Żid `"check:<name>": "node scripts/check/check-<name>.mjs"` ma' `package.json`.
3. Qabbdu f'`.github/workflows/ci.yml` taħt il-job xieraq
   (politika → `lint` jew `docs-sync-strict`; ratchet → `quality-gate`).
4. Jekk ikollu lista ta' permessi, applika `reportStaleEntries()` minn
   `scripts/check/lib/allowlist.mjs` sabiex l-entrati skaduti jiġu identifikati awtomatikament.
5. Ikteb test f'`tests/unit/build/` li jkopri l-loġika ta' identifikazzjoni tal-gate.
6. Aġġorna dan id-dokument (żid ringiela mat-tabella tal-job rilevanti).

---

## Għodod għall-aġenti: LSP-in-the-loop (opt-in)

Lil hinn mill-gates tas-CI, OmniRoute jipprovdi scaffold **opt-in** `agent-lsp`
(`.mcp.json` fil-livell tal-proġett, Fażi 7 Kompitu 15). Oħloq `.mcp.json`
biex tesponi server tal-lingwa TypeScript lill-aġenti tal-ipprogrammar, sabiex isolvu s-simboli /
id-dijanjostiċi **qabel** jiktbu l-code — għodda komplementari ta' kompilazzjoni qabel dikjarazzjoni għal
`typecheck:core` li tnaqqas l-iżbalji ta' "simboli vvintati" mis-sors tagħhom. Intenzjonalment
ma jitgħabbiex awtomatikament (int tagħżel u tivverifika l-bridge MCP↔LSP); entrata difettuża tirreġistra biss
żball ta' konnessjoni u qatt ma tinterrompi s-sessjonijiet.

---

## Lista Pendenti tar-Razzjonalizzazzjoni (rieżami tal-ROI — Fażi 9 Mewġa 3)

Dan l-inventarju ġie rrikonċiljat ma’ `ci.yml` fis-2026-06-17 (il-verżjoni preċedenti kienet ħalliet barra
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Rieżami tal-ROI tas-sett irrikonċiljat
identifika l-kandidati għar-razzjonalizzazzjoni li ġejjin. **L-għaqdiet huma bidliet mekkaniċi fis-CI;
il-qlib/tneħħijiet huma deċiżjonijiet ta’ politika riżervati għall-operatur.** Għadu ma ġie applikat
xejn minn dan ta’ hawn taħt.

**Mhux dokumentati hawn fuq ukoll** (konsultattivi, sinjal baxx): il-job `docs-lint`
(markdownlint + Vale, il-job kollu b’`continue-on-error`) u l-workflows awtonomi tal-iskanners
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` jinsab f’
`quality-baseline.json` iżda mhuwiex marbut ma’ ratchet li jimblokka f’`ci.yml` — il-metrika
bħalissa hija iżolata.

### Għaqda / deduplikazzjoni (mekkaniċi, riskju aktar baxx)

Kull kandidat ġie vvalidat mal-istat attiv tal-gates fis-2026-06-17 (ivverifika anki jekk tafda);
diversi għaqdiet “ovvji” irriżultaw li jaħbu dejn u **mhumiex** sostituzzjonijiet diretti u nodfa.

- **`check:docs-sync` jitħaddem darbtejn** — waħdu fil-job `lint` u għal darb’oħra fi ħdan `check:docs-all` (`docs-sync-strict`) u l-hook pre-commit ta’ husky. ✅ **LEST** — l-invokazzjoni awtonoma f’`lint` tneħħiet.
- **Skennjar tas-CVE** — ❌ **MHIX għaqda nadifa.** `audit:deps` ifalli b’mod assolut għal kwalunkwe CVE ta’ severità għolja/kritika; `check:vuln-ratchet` (osv) ifalli biss fuq _rigressjoni_ meta mqabbel mal-baseline (bħalissa 1 MODERATE). Semantika differenti — it-tneħħija ta’ `audit:deps` telimina l-gate assolut għal severità għolja/kritika. Żomm it-tnejn.
- **Sejbien taċ-ċikli** — ❌ **MHIX għaqda nadifa.** `check:circular-deps` (dpdm) jirrapporta **91 ċiklu** (għalhekk huwa konsultattiv); ma jistax jiġi promoss għal wieħed li jimblokka qabel ma jiġu solvuti, u għandu kamp ta’ applikazzjoni usa’ minn dak ta’ `check:cycles`, li huwa aħdar u kkurat. Żomm `check:cycles` bħala wieħed li jimblokka; ir-riżoluzzjoni tal-91 ċiklu tad-dpdm hija punt separat fil-lista pendenti.
- **Kumplessità** — ✅ **LEST** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): passaġġ wieħed tal-ESLint, b’għadd skont ruleId sabiex il-baselines ta’ cyclomatic+max-lines u cognitive jibqgħu indipendenti; il-kontrolli individwali `check:complexity` / `check:cognitive-complexity` jibqgħu għal `--update` lokali.
- **Kontra l-alluċinazzjoni ta’ `/api`** — ✅ **LEST** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): inventarju wieħed tas-sistema tal-fajls għal `src/app/api`, filwaqt li openapi-routes + docs-symbols xorta jirrapportaw indipendentement; il-kontrolli individwali jibqgħu għall-eżekuzzjonijiet lokali.
- **`check:node-runtime` jitħaddem fi 11-il job** — ⚠️ **ROI baxx.** Kull wieħed juża runner separat u l-kontroll jieħu <1s; l-iffrankar totali huwa ta’ madwar 10s, bil-konsegwenza li tintilef protezzjoni rħisa għal kull job. Ma jiswiex it-tibdil.
- **`typecheck:noimplicit:core` fil-lint tas-CI** — ✅ **tneħħa mill-job lint** (kien konsultattiv b’`continue-on-error`); is-superfiċje tat-tipi li timblokka hija `typecheck:core` + `check:type-coverage`. L-iskript lokali nżamm.

### Aqleb / iddeċiedi (politika tal-operatur)

- `check:openapi-security-tiers` (konsultattiv) — ❌ **MA JISTAX JINQALEB B’MOD NADIF.** Joħroġ b’0 iżda jwissi li diversi routes ta’ `traffic-inspector` taħt `LOCAL_ONLY_API_PREFIXES` m’għandhomx l-annotazzjoni `x-loopback-only: true`. L-infurzar tiegħu jeħtieġ li l-ewwel jiżdiedu dawk l-annotazzjonijiet ma’ `openapi.yaml`.
- `typecheck:noimplicit:core` (konsultattiv) — fil-biċċa l-kbira huwa kopert mir-ratchet `check:type-coverage` li jimblokka. Aqilbu għal ratchet jew neħħi t-tieni passaġġ `tsc` żejjed.
- `test:vitest:ui` (issa **jimblokka**) — il-fallimenti li kienu jeżistu minn qabel huma esklużi espliċitament f’`vitest.config.ts` b’kummenti ta’ traċċar `// #8618`; fallimenti ġodda jfallu l-job.
- `check:secrets` (gitleaks, ratchet li jimblokka u ffriżat fuq 3 pożittivi foloz dokumentati) — żid it-3 mal-allowlist biex tilħaq 0, jew baxxih għal wieħed konsultattiv. Jikkoinċidi mal-iskannjar nattiv tas-segreti ta’ GitHub + `check:public-creds`.
- `check:pr-evidence` (jimblokka, ifittex b’grep fit-test tal-korp tal-PR) — riskju għoli ta’ pożittivi foloz; jekk jitneħħa jdgħajjef l-infurzar tar-Regola Stretta #18, għalhekk din hija deċiżjoni ta’ politika ġenwina.
- `semgrep` (awtonomu u konsultattiv) — jikkoinċidi ma’ CodeQL għall-familji tal-OWASP; qabbad il-baseline tiegħu ma’ ratchet jew neħħih.

---

## Dokumentazzjoni Relatata

- Katina tal-provvista (provenjenza, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kontroll tal-parità tas-sett taċ-ċwievet

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, xogħol `i18n-ui-coverage`).
Iqabbel is-sett taċ-ċwievet terminali ta’ kull `src/i18n/messages/<locale>.json` ma’ `en.json` u jfalli
jekk ikun hemm xi ċavetta terminali nieqsa jew żejda, irrispettivament minn meta żdiedet iċ-ċavetta. Il-markaturi
`__MISSING__:` jitqiesu bħala preżenti (il-kontenut tagħhom jaqa’ taħt ir-responsabbiltà tal-kontroll tal-proporzjon). Dan huwa l-komplement assolut
taż-żewġ kontrolli bbażati fuq id-differenzi/il-perċentwali: `check-ui-keys-coverage` jinforza minimu ta’ 80 % għal kull
locale (43 ċavetta nieqsa minn ~13,000 xorta jidhru bħala 99.7 %) u `check-new-key-coverage` jevalwa
biss iċ-ċwievet li PR iżid ma’ `en.json`. Lott ta’ locales jiġi ġġenerat mill-`en.json` tal-jum
li fih tinħoloq il-fergħa tiegħu u jibqa’ jiġi tradott għal jiem sħaħ filwaqt li l-bażi tkompli żżid iċ-ċwievet; il-PR tal-lott innifsu ma jżid
l-ebda ċavetta, għalhekk iż-żewġ kontrolli relatati baqgħu siekta meta l-lott 1 (#13044) ġie integrat b’43 ċavetta nieqsa f’disa’
locales u l-lott 2 (#13660) b’10 ċwievet neqsin fi tmienja (2026-09-15). Irranġa falliment b’
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ċavetta terminali `extra`
tfisser li s-sors neħħieha — ħassarha mil-locale. `--warn` jirrapporta mingħajr ma jfalli.
`--catalog=cli` iwettaq l-istess tqabbil fuq `bin/cli/locales` (`npm run i18n:check-keys:cli`);
iż-żewġ passi jinsabu fix-xogħol `i18n-ui-coverage`.

#### `check-new-key-coverage` — kontroll i18n għal ċwievet ġodda

Kontroll relatat ma’ `check-ui-value-drift`. Dak jaqbad valur bl-Ingliż li jkun ġie **miktub mill-ġdid**
filwaqt li t-traduzzjonijiet tiegħu jkunu tħallew kif kienu; dan jaqbad ċavetta bl-Ingliż li tkun ġiet **miżjuda**
filwaqt li xi locales qatt ma jkunu rċevewha.

`check-ui-keys-coverage` ma jistax jinduna b’din il-klassi ta’ problema: huwa jinforza minimu perċentwali għal kull locale, u
ħdax-il ċavetta nieqsa minn ~13,000 iħallu l-kopertura f’99.9%. Perċentwal għal kull lingwa ma jistax
jesprimi “din il-karatteristika ġiet rilaxxata mingħajr traduzzjoni” — karatteristika sħiħa tista’ tasal f’locale ġdid mingħajr
ebda test u qatt ma tbiddel iċ-ċifra.

L-inċident li jirrappreżenta: Fażi 3 tal-Orchestration Canvas ittraduċiet il-ħdax-il ċavetta tagħha fil-
42 locale li kienu jeżistu dak iż-żmien. Sigħat wara, il-lott tal-lingwi tal-UE (#13044) wassal ir-repo
għal 51 locale, u d-disa’ locales ġodda (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) qatt ma
rċevewhom. `deepMergeFallback` jissostitwixxi ċavetta nieqsa bl-Ingliż, għalhekk il-mod tal-falliment kien
UI mhux tradotta minflok UI vojta — problema reali, u siekta skont id-disinn.

Bħall-kontroll relatat miegħu, dan huwa **konxju mid-differenzi**, billi jqabbel l-Ingliż fil-bażi tal-merge mas-siġra
tax-xogħol, għalhekk il-lakuni li kienu jeżistu minn qabel jibqgħu ffriżati u ma kienx hemm bżonn ta’ migrazzjoni biex il-kontroll jiġi attivat.

**Markatur `__MISSING__:<english>` ma jissodisfax dan il-kontroll (mill-2026-09-17).** Qabel kien
il-posponiment dokumentat — waqt l-eżekuzzjoni s-sistema taqa’ lura għall-Ingliż korrett — sakemm tmien PRs ta’ karatteristiċi fl-
2026-09-16 żiedu 61 ċavetta u poġġew il-markatur fis-65 locale kollha minflok ma ttraduċewhom: dan
il-kontroll aċċetta kull waħda minnhom, xejn ma mblokka l-PRs, u l-kontroll imblokkanti tal-proporzjon ta’ traduzzjonijiet reali
mbagħad falla fil-punt tar-rilaxx għal kulħadd (pt-BR 3.2 % > 2.5 % + 0.5). Markatur issa jiġi ġġudikat
bħala traduzzjoni nieqsa. Irranġa falliment b’
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, jew
il-locales kollha b’mod parallel permezz ta’ `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
sikur meta jintuża b’mod detached, u jirrifjuta li jibda mingħajr il-varjabbli tal-ambjent `OMNIROUTE_TRANSLATION_*`). Ċavetta li trid tibqa’
bl-Ingliż (isem fiss ta’ prodott/magna/flag) għandha tkun f’`scripts/i18n/untranslatable-keys.json`,
qatt wara markatur. `vi` jipprojbixxi l-markaturi għalkollox (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kontroll tat-testijiet sospiżi

Fajl fil-lista `exclude` ta’ `vitest.config.ts` huwa test li ma jitħaddimx, u jidher bħala
kopertura għal min jaqra s-siġra. Tnejn u sittin fajl akkumulaw wara l-kumment
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Il-kwistjoni #8618 ingħalqet fil-
2026-08-11 filwaqt li l-lista li kienet issegwi kibret minn 45 entrata għal 62, b’kull waħda ġdida tiret kumment
li jindika kwistjoni magħluqa. Meta l-lista finalment tkejlet fajl b’fajl (#13204), **51 mit-62
għaddew kontra s-siġra attwali mingħajr ebda bidla fis-sors**.

Il-kontroll jirrikjedi li kull esklużjoni li tirriżolvi għal fajl reali (a) issemmi kwistjoni ta’ traċċar u
(b) tidher f’`config/quality/vitest-exclusions.json` bl-istatus imkejjel tagħha, sabiex iż-żieda ta’ waħda tkun
differenza li tista’ tiġi rieżaminata f’fajl apposta minflok sempliċement linja oħra f’array ta’ 60 entrata. Huwa intenzjonalment
ma jerġax iħaddem it-testijiet esklużi — dan jieħu ~10 minuti u għandu jsir f’xogħol perjodiku; l-
inventarju jirreġistra meta kull wieħed tkejjel l-aħħar.
