# Quality Gates Reference (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Wannan takarda ita ce madogara mafi inganci ga dukkan ƙofofin ingancin CI a OmniRoute.
Tana bayyana kowace ƙofa, abin da take tantancewa, aikin CI da take gudana a cikinsa, ko tana amfani da
ma’aunin ratchet ko tsarin wucewa/faɗuwa, da kuma ko tana hana ginin ci gaba ko kuwa shawara ce kawai.

Don taƙaitaccen bayani da tsarin allowlist, duba sashen "Quality Gates & Ratchets"
a cikin `AGENTS.md`. Don nazari mai zurfi, rarrabuwar matakin balaga, da tsarin
maimaitawa wanda bai dogara da takamaiman kayan aiki ba na wannan tsarin, duba
[Jagorar Ƙofofin Inganci](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Jerin gate da bayanan martabar aiwatarwa

### Karɓar ɗan takara

Tsarukan aikin CI da Quality Gates kowannensu yana fitar da tabbataccen hukunci: `Gate / CI` da
`Gate / Quality`. Manufar karɓarsu mai sigar da aka ƙayyade tana lissafa kowane aikin upstream
a matsayin wajibi ko na shawarwari. Dole ne aikin wajibi da ya dace ya yi nasara: sakamakon da
babu shi, aka soke, aka tsallake, yake jiran kammalawa ko ba a san shi ba ba zai iya tabbatar da PASS ba. Ingantaccen
rarrabuwar docs-only ko catalog-only na iya sa wani layin code bai dace ba;
draft PR ba ɗan takarar da aka amince da shi ba ne. Alamar `hotfix` ba ta soke buƙatar hujja.

Dukkan tsarukan aikin suna rufe PRs da pushes zuwa rassan main/release, manual dispatch da
merge-group events. Push, dispatch da merge-group suna gudanar da cikakken zaɓi. Forks
da merge groups suna amfani da hosted runners don ayyukan da in ba haka ba za su zaɓi self-hosted
runners; dole ne a tabbatar da isasshen hosted capacity kafin rollout.

Kowane JSON receipt yana tantance SHA da aka checkout, workflow run da attempt.
CLI yana ƙin checkout/event SHA mismatch. Gwaje-gwajen workflow suna ɗaure kasancewa cikin policy
da jerin `needs` na aikin verdict domin sabon lane ko wanda aka cire kada ya ɓace a ɓoye.
Receipts ɗin suna rufe workflow nasu ne kawai, ba publication, deployment, ko internals
na advisory scanner da yake akwai ba. Kunna dukkan check names biyun a cikin branch rules
wani canjin gudanarwa ne na daban; ƙara waɗannan jobs ba ya kare branch da kansa.

### Jerin static scan

Jerin npm-alias mai sigar da aka ƙayyade da kasancewar static-scan suna cikin
`config/quality/gate-manifest.json`. Gudanar da `npm run check:gate-manifest` domin tabbatar da
script names da ainihin commands ta hanyar kwatanta su da `package.json`; additions, removals da
command drift suna sa local hook da change-classification jobs a CI su gaza.
Alias ba workflow job, matrix instance ko test case ba ne: kada a gabatar da waɗannan ƙididdiga
kamar suna musanyawa da juna.

Yi amfani da `npm run quality:scan -- --list` ko `npm run quality:scan:fast -- --list`
domin duba aliases da aka zaɓa ba tare da aiwatar da su ba. Runner yana kiran
npm entrypoint, don haka runtime ɗinsa (har da Bun inda aka saita shi) yana nan yadda yake.
Manifest yana rubuta aliases da ke wajen waɗannan profiles a matsayin waɗanda ake kira daban, kuma
an hana maintenance commands a cikin read-only scan profiles.

Waɗannan profiles suna rufe static scan ne kawai. Ba sa tabbatar da product tests,
coverage, packaging, external checks ko cikakken release acceptance na ɗan takara.
Workflow admission yana amfani da `config/quality/admission-policy.json` da aka haɗa da
`scripts/quality/admission-verdict.mjs`. Release-observer profiles suna ci gaba da kasancewa daban;
a duba applicable checks da receipts nasu da kansu. Bayanin rubutu
da ke ƙasa madogara ce, ba hujjar cewa an gudanar da gate a zahiri ba.

Scripts suna ƙarƙashin `scripts/check/` (policy gates) da `scripts/quality/` (ratchet engine).
Madogarar gaskiya ta CI ita ce `.github/workflows/ci.yml`.

### Hanya mai sauri ta Release PR (`quality.yml`)

`.github/workflows/quality.yml` yana cika CI a kan main/release PRs, protected-branch
pushes, dispatch da merge groups. PRs suna amfani da fast checks da aka tace bisa path. An cire
duplicate build da aka kashe na dindindin; ainihin build/package/boot checks suna nan a CI.

| Aiki                                             | Iyaka                                                                                                                                                                                                                | Mai hana ci gaba  |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `Docs Gates (fast-path)`                         | Docs/code PRs; API docs refs da docs-all                                                                                                                                                                             | Ee                |
| `Fast Quality Gates`                             | Code PRs; static checks, typecheck, dashboard typecheck, impacted unit tests                                                                                                                                         | Ee                |
| `Forgotten sibling tests`                        | Code PRs; changed modules da aka bi zuwa static consumers da candidate sibling tests; barrel da dynamic-import paths ana bayar da rahotonsu a matsayin advisory diagnostics, tare da referenced allowlist exceptions | **Na shawarwari** |
| `Vitest (fast-path)`                             | Code PRs; fast vitest suite                                                                                                                                                                                          | Ee                |
| `Unit Tests fast-path`                           | Code PRs; 4-shard unit suite                                                                                                                                                                                         | Ee                |
| `No new ESLint warnings`                         | Code PRs; suppressions-aware lint guard                                                                                                                                                                              | Ee, har da forks  |
| `Merge integrity (changelog + generated skills)` | Non-draft PRs; changelog da generated skill sync                                                                                                                                                                     | Ee, har da forks  |

#### Rahoton forgotten sibling tests

`npm run check:forgotten-sibling-tests` yana sake amfani da import resolver da ke bayan test-impact map.
Ga kowane changed production module, yana bayar da deterministic
`changed module/symbol -> static consumer -> candidate sibling test` chains idan candidate
test ba ya cikin pull-request diff. Ana adana Markdown summary da JSON result a matsayin
`forgotten-sibling-tests` workflow artifact domin calibration kafin kowane blocking rollout.

Sake-fitarwa ta barrel da shigo da kayayyaki masu sauyawa binciken warwarewa ne kawai; ba sa taɓa haifar da
wani sakamakon da zai hana ci gaba. Keɓance-keɓancen da aka duba suna cikin
`config/quality/forgotten-sibling-allowlist.json`. Dole ne kowace shigarwa ta ambaci mabukaci da gwajin
ɗan takara, ta bayar da takamaiman dalili, sannan ta haɗa da hanyar haɗin wata matsalar GitHub ko buƙatar haɗa canji. Shigarwar da ba ta da ingantaccen tsari tana haifar da
ƙin amincewa ta tsohuwa. Keɓance-keɓance ba za su iya danne gwajin ɗan takara da aka goge ko diff da ke ƙara `.skip`/`.todo` ba;
raunana assertion da sauran hanyoyin ɓoye matsala suna ci gaba da kasancewa ƙarƙashin shingen
`check:test-masking` mai zaman kansa wanda ke hana ci gaba.

### Aiki: `lint`

Yana gudana a kan kowace PR zuwa `main`. Yana hana haɗawa idan an samu gazawa.

| Skrif (`npm run ...`)             | Abin da yake tabbatarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Mai hana ci gaba                           |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Sigar Node.js tana cikin kewayon da ake tallafawa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | E                                          |
| `check:cycles`                    | Shigo da kayayyaki masu zagaye a duk faɗin `src/` + `open-sse/` (wanda ya dogara da AST, an warware `paths` na tsconfig). Bare = shawara kawai, yana jera zagayen. `check:cycles:ratchet` (abin da CI ke gudanarwa) yana hana ci gaba idan adadin ya wuce iyakar `metrics.cycles` a cikin `quality-baseline.json` — a halin yanzu 14, `direction: down`, don haka zai iya raguwa kawai (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | E (ratchet)                                |
| `check:route-validation:t06`      | Akwai schemas na Zod a kan dukkan routes (manufar Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | E                                          |
| `check:any-budget:t11`            | Adadin `@ts-expect-error // any` bai wuce kasafin da aka ware ba (catraca na Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | E                                          |
| `check:provider-consistency`      | Kowane mai samarwa a cikin `providers.ts` yana da shigarwar da ta dace a cikin `providerRegistry.ts` (haka kuma akasin haka, a cikin jerin izini)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ee                                         |
| `check:model-lifecycle`           | Teburan sarrafa hanya guda uku da ake kula da su da hannu suna ci gaba da dacewa da hoton yanayin rayuwa da aka ajiye (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ba ya ba wa wani id da aka yi ritaya wanda `REGISTRY` zai iya tura masa hanya maki; kowace manufa ta `BUILT_IN_ALIASES` tana cikin `REGISTRY` kuma ba ta cikin hoton id ɗin da aka yi wa ritaya; kowane id da aka yi wa ritaya amma har yanzu yana cikin `REGISTRY` ana tura shi gaba ko an jera shi a cikin `allowedRetiredInCatalog`; kuma babu tushen ko manufar `DEFAULT_DEGRADATION_MAP` da ta bayyana a matsayin wadda aka yi wa ritaya a cikin wannan hoton. Wannan ba ya tabbatar da cewa a halin yanzu wani tsarin yana samun sabis daga tushen sama mai aiki. Ba tare da intanet ba — yana kwatantawa da `config/quality/model-lifecycle.json`, wanda ake sabunta shi da hannu ta amfani da `npm run quality:refresh-model-lifecycle` (yana buƙatar hanyar sadarwa; ba a haɗa shi da CI ba). `allowedRetiredInCatalog` mataki ne na ragewa a hankali: ƙara shigarwa kawai tare da batun bin diddigi. | Ee                                         |
| `check:fetch-targets`             | Kowane `fetch("/api/...")` a cikin `src/` na ɓangaren abokin ciniki yana kaiwa ga ainihin `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                         |
| `check:deps`                      | Duk abubuwan dogaro da za a iya sakawa ta `npm install` a duk `package.json` da ke cikin ma'ajiyar lambar suna cikin `dependency-allowlist.json`; ana nuna sabbin fakitoci marasa ƙayyadadden siga ko waɗanda aka yi wa slopsquatting                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ee                                         |
| `audit:deps`                      | `npm audit` (tushen aiki + electron) — babu sanarwar haɗari mai tsanani/matukar tsanani (yana yin ruɓanya da osv `check:vuln-ratchet`; duba Jerin Ayyukan Daidaita Dalilai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ee                                         |
| `check:lockfile`                  | Ingancin `package-lock.json` — wurin rajista na https, hashes na inganci, babu sauya rundunar mai masauki                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ee                                         |
| `check:licenses`                  | Jerin amincewar lasisin SPDX don abubuwan dogaro na samarwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ee                                         |
| `check:tracked-artifacts`         | Babu kayan aikin gini / mahaɗan alama na `node_modules` da aka tura (ana kuma gudanar da shi a husky pre-commit; da gangan aka sauƙaƙa pre-push — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ee                                         |
| `check:ai-attribution`            | Babu ƙarshen `Co-Authored-By` na AI/bot ko bayanin ƙasa na samarwa ta AI a cikin commits, take, ko jikin PR — Ƙa'ida Mai Tsauri #16 (a cikin madaukin ƙofofin sauri na `quality.yml` don PR→`release/**` — yana karanta bayanan event, ba ya yin komai idan ba PR ba ne — da kuma matakin PR-kawai a lint na `ci.yml` don PR→`main`; haka kuma hook ɗin husky na `commit-msg`; an yarda da marubuta-'yan-adam na haɗin gwiwa; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Kowane keɓancewar Vitest yana ambaton batun sa ido kuma yana bayyana a cikin `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ee                                         |
| `check:file-size`                 | Babu fayil ɗin tushe da ya wuce iyakar da aka sa wa kowace extension (ratchet: manyan fayilolin da aka daskarar a jerin `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ee                                         |
| `check:error-helper`              | Amsoshin kuskure a cikin executors/handlers suna amfani da `buildErrorBody()` / `sanitizeErrorMessage()` (Ƙa'ida Mai Tsauri #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                         |
| `check:migration-numbering`       | Fayilolin SQL na migration suna da lambobi a jere, ba tare da gibi ko maimaitawa ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ee                                         |
| `check:public-creds`              | Babu OAuth `client_id`/`client_secret` ko maɓallan Firebase Web na zahiri a wajen `publicCreds.ts` (Ƙa'ida Mai Tsauri #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ee                                         |
| `check:db-rules`                  | Babu ɗanyen SQL a wajen modules na `src/lib/db/`; babu barrel-imports daga `localDb.ts` (Ƙa'idoji Masu Tsauri #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ee                                         |
| `check:known-symbols`             | Masu aiwatar da provider, dabarun routing, da translators da aka yi wa rajista a cikin dispatch tables ɗinsu sun dace da fayilolin da ke kan disk — babu symbols marasa alaƙa ko waɗanda ba a ayyana ba                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ee                                         |
| `check:route-guard-membership`    | Kowace route da ke ƙaddamar da child process an rarraba ta da `isLocalOnlyPath()` (Ƙa'idoji Masu Tsauri #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ee                                         |
| `check:test-discovery`            | Kowane fayil na `*.test.ts` / `*.spec.ts` a cikin repo yana tattaruwa ta aƙalla test runner guda ɗaya (ratchet: jerin marasa alaƙa a cikin `test-discovery-baseline.json` zai iya raguwa kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ee                                         |
| `check:agent-skills-sync`         | Abubuwan agent-skills da aka samar sun yi daidai da kundin tushensu (babu sauyi marar izini)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | Tambura/kadarorin masu samarwa suna ɗauke da shigarwar bayanin asalinsu da aka rubuta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | Fayilolin saitin JSON suna iya parse kuma suna bin ƙa'idodin lint na repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | Harhada TypeScript ba tare da kurakurai ba (gargaɗin shawarwari kawai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ee                                         |
| `typecheck:noimplicit:core`       | Tsauraran `noImplicitAny` — don ci gaba ne; wuraren kira da yawa da suka riga suka kasance har yanzu suna buƙatar annotations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Na shawara** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` da aka taƙaita zuwa `src/app/(dashboard)/**` (#7033) — jerin fayiloli 27 da `typecheck:core` ya ware bai haɗa da kowane dashboard TSX ba, sannan `next build` ma ba ya yin type-check ɗinsa (`next.config.mjs` yana saita `ignoreBuildErrors: true`), don haka koma-bayan orphaned-identifier a wurin (#6625/#6909) ba su bayyana ga CI ba. Ana kwatanta bambance-bambancen da baseline daskararre na adadin kurakurai na kowane fayil/kowane lambar TS (`config/quality/dashboard-typecheck-baseline.json`, irin tsarin tilasta sabunta bayanai na `check:known-symbols`) — sabbin kurakurai KAWAI da suka zarce adadin da ke cikin baseline ne ke sa matakin ya gaza; rage baseline ɗin a hankali da `--update` idan an gyara kuskuren da ya riga ya kasance.                                                                                                                                                                                                                                                                                                             | Ee                                         |

### Aiki: `quality-gate`

Yana gudana bayan `test-coverage`. Yana hana merge idan ya gaza.

| Script                       | Abin da yake tantancewa                                                                                                                                                                                      | Toshewa            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `quality:collect`            | Yana fitar da `quality-metrics.json` (adadin gargadin ESLint, coverage daga rahoton shard da aka haɗe)                                                                                                       | Eh (kafin ratchet) |
| `quality:ratchet`            | Kowace metric a cikin `quality-baseline.json` ba ta taɓarɓare ba (gargadin ESLint ≤ baseline; coverage ≥ baseline)                                                                                           | Eh                 |
| `check:duplication`          | Maimaita lamba (jscpd@4) bai wuce baseline da ke cikin `quality-baseline.json` ba                                                                                                                            | Eh                 |
| `check:complexity`           | Cyclomatic complexity na matakin fayil bai wuce iyaka ba (ainihin ESLint `complexity` + `max-lines-per-function`)                                                                                            | Eh                 |
| `check:cognitive-complexity` | Ratchet na cognitive complexity (`eslint-plugin-sonarjs`) — gwajin ESLint na daban; CI yana gudanar da duka biyun a haɗe a matsayin mataki guda na `check:complexity-ratchets`                               | Eh                 |
| `check:dead-code`            | Ratchet na exports / fayilolin da ba a amfani da su (knip) bai taɓarɓare idan aka kwatanta da baseline ba                                                                                                    | Eh                 |
| `check:compression-budget`   | Kasafin benchmark na matsewa — mafi ƙarancin adana tokens na kowane engine kada ya taɓarɓare                                                                                                                 | Eh                 |
| `check:type-coverage`        | Ratchet na yawan kaso mai type (`type-coverage`) bai taɓarɓare ba; galibi yana maye gurbin `typecheck:noimplicit:core`                                                                                       | Eh                 |
| `check:codeql-ratchet`       | Adadin faɗakarwar CodeQL da suke buɗe bai taɓarɓare ba (yana karantawa ta `gh api`; yana tsallakewa cikin sauƙi idan babu token) — don jadawalin sabuntawa da kunnawa da hannu: duba "CodeQL ratchet" a ƙasa | Eh                 |

### Aiki: `quality-extended`

Dukkan aikin na shawarwari ne (`continue-on-error: true`). Ratchets masu amfani da npm suna gudana
da gaske; external scanners suna shigarwa ta `gh release download` kuma suna tsallake kansu (exit 0)
idan har yanzu babu binary.

| Script                   | Abin da yake tantancewa                                                                                                                                                                                                                               | Toshewa                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `check:circular-deps`    | Babu circular dependencies (dpdm)                                                                                                                                                                                                                     | **Na shawarwari**                                       |
| `check:bundle-size`      | Girman bundle bai wuce iyaka ba                                                                                                                                                                                                                       | **Na shawarwari**                                       |
| `check:secrets`          | Binciken sirrika (gitleaks) — yana tsallakewa idan babu binary                                                                                                                                                                                        | **Na shawarwari**                                       |
| `check:vuln-ratchet`     | Raunin tsaro na dependencies (osv-scanner) bai taɓarɓare ba — yana tsallakewa idan babu binary                                                                                                                                                        | **Na shawarwari**                                       |
| `check:workflows`        | Lint na workflow (actionlint + zizmor); scanners da suka ɓace/lalace, rahotanni marasa inganci ko rashin ratchet baseline suna sa gazawa a matsayin INCOMPLETE. Sakamakon bincike masu inganci suna bin manufofin strict/advisory/ratchet da aka zaɓa | Ana buƙatar aiwatarwa; zizmor ratchet yana toshewa a CI |
| `check:openapi-breaking` | Sauye-sauyen da ke karya public API contract (`openapi.yaml`) idan aka kwatanta da base branch (oasdiff) — yana fitar da `openapiBreaking=N`; yana tsallakewa idan babu oasdiff ko ba za a iya warware base spec ba                                   | **Na shawarwari**                                       |

### Aiki: `docs-sync-strict`

Yana gudana a kan kowane PR zuwa `main`. Yana hana haɗawa idan an samu gazawa.

| Script                         | Abin da yake tantancewa                                                                                                                                                         | Mai hana ci gaba        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `check:docs-all`               | Babban ƙofa da ke gudanar da ƙananan ƙofofi 6 da ke ƙasa ɗaya bayan ɗaya                                                                                                        | Ee                      |
| ↳ `check:docs-sync`            | Daidaiton sigar CHANGELOG / OpenAPI / llm.txt                                                                                                                                   | Ee                      |
| ↳ `check:docs-counts`          | Ƙididdiga a cikin rubutu (yawan masu samarwa, yawan ƙaura, da sauransu) suna cikin iyakar ratchet ta ainihin ƙididdiga                                                          | Ee                      |
| ↳ `check:env-doc-sync`         | Kowace env var a cikin `.env.example` an rubuta bayaninta a teburin takardu, kuma haka ma akasin haka                                                                           | Ee                      |
| ↳ `check:deprecated-versions`  | Babu tsofaffin kirtanin siga da aka daina amfani da su a cikin takardu                                                                                                          | Ee                      |
| ↳ `check:doc-links`            | Mahaɗan markdown na cikin gida a takardu suna kaiwa ga fayiloli na ainihi (tsarin `[text]`/`(path)`)                                                                            | Ee                      |
| ↳ `check:fabricated-docs`      | Routes, env vars, umarnin CLI, sunayen hook, da hanyoyin fayil da aka ambata a takardu suna cikin codebase. Ƙofa mai tsauri ta `--strict`; gazawa mai sauƙi ba tare da flag ba. | Ee (ta `--strict` a CI) |
| `check:cli-i18n`               | Kirtanin umarnin CLI suna cikin duk fayilolin locale na i18n                                                                                                                    | Ee                      |
| `check:openapi-coverage`       | Bayanin OpenAPI ya ƙunshi aƙalla mafi ƙarancin adadin routes na ainihi da aka ƙayyade ta ratchet                                                                                | Ee                      |
| `check:openapi-security-tiers` | Bayanan matakan tsaro a cikin `openapi.yaml` sun yi daidai da rabe-raben `routeGuard.ts`                                                                                        | **Na shawara**          |
| `check:openapi-routes`         | Kowace path a cikin `openapi.yaml` tana kaiwa ga ainihin `route.ts` (hana ƙirƙirar bayanan bogi)                                                                                | Ee                      |
| `check:docs-symbols`           | Kowace maƙalar `/api/...` a cikin `docs/**/*.md` tana kaiwa ga ainihin `route.ts` (hana ƙirƙirar bayanan bogi)                                                                  | Ee                      |
| `i18n translation drift`       | Keys da ba a fassara ba a cikin fayilolin locale na i18n — gargadi kawai                                                                                                        | **Na shawara**          |

### Aiki: `i18n-ui-coverage`

| Script                            | Abin da yake tantancewa                                                                                                                                                                               | Mai hana ci gaba |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (inline) | Rufin key na i18n na UI ya kai ≥ 65%                                                                                                                                                                  | Ee               |
| `check-ui-value-drift` (inline)   | Sake rubuta **value** na Turanci ba ya barin wani tsohon fassara a baya                                                                                                                               | Ee               |
| `check-new-key-coverage` (inline) | An fassara **sabon** key na Turanci a kowane locale — ana ƙin alamar `__MISSING__:`                                                                                                                   | Ee               |
| `check-translation-ratio`         | Rabon fassara na ainihi ga kowane locale (daidai da Turanci / placeholder / abubuwan da suka ɓace waɗanda ba sa cikin allowlist) kada ya wuce `config/quality/i18n-translation-baseline.json` + slack | **Na shawara**   |

Yana buƙatar `fetch-depth: 0` — ƙofar value-drift tana kwatanta bambancin `en.json` da merge base.

#### `check-ui-value-drift` — ƙofar tsohuwar fassara

Tana gano matsalar koma-bayan i18n guda ɗaya da sauran ƙofofi ba za su iya gani ta fuskar tsari ba: ana sake rubuta value na Turanci,
amma fassarorin da aka samo daga Turancin _da ya gabata_ suna nan, don haka
masu amfani da ba sa amfani da Turanci suna ci gaba da karanta rubutu mai cike da tabbaci amma wanda yanzu ba daidai ba ne.

Wannan ya taɓa fitowa a zahiri. An sake rubuta `oauthModal.googleOAuthWarning` lokacin da aka ƙara
mataimakin shiga na Antigravity (#5203); **39 daga cikin locales 43** sun ci gaba da riƙe rubutun da ke gaya wa masu gudanarwa su "kwafi
cikakken URL su liƙa shi a ƙasa" — tsarin da ba zai iya kammaluwa ga wannan provider ba. Ba a
lura da shi ba har sai #8463 saboda:

- `sync-ui-keys` yana cike keys ne kawai idan **ba su nan**, ba waɗanda suka zama **tsofaffi** ba;
- `check-ui-keys-coverage` yana ƙirga _kasancewar_ key, don haka ana ɗaukar tsohuwar fassara a matsayin wadda aka rufe;
- `check-translation-drift` yana bibiyar madubin takardu na `docs/i18n/<locale>/**.md` —
  ba ya taɓa karanta `src/i18n/messages/*.json`. Yana hana ci gaba a aikin `docs-sync-strict` tun bayan
  sake daidaitawar 2026-09: gyara babban takarda → `npm run i18n:run -- --files=<doc>` (a matakin sashe, mai sauƙin aiwatarwa).

**Mai lura da diff, ba mai dogaro da baseline ba.** Yana kwatanta `en.json` a merge base da working tree; ga kowane key da ƙimar Turancinsa ta canza, duk locale da har yanzu yake riƙe da fassarar da ba a taɓa ba ya zama tsohon yayi. Wannan da gangan yana **daskarar da bashin da ya riga ya kasance** — diff ba zai iya bayyana daga wane tsohon rubutun Turanci wata fassara da ta daɗe ta fito ba, don haka gate ɗin yana tantance abin da canjin yanzu ya taɓa ne kawai. Madadin (baseline na hash ga kowane key) zai buƙaci generated file mai girman kusan 600 KB, wanda ya ninka baseline mafi girma da ake da shi sau 3, kuma yana canzawa a kowane i18n PR.

Akwai hanyoyi biyu na cika wannan:

1. sabunta fassarorin da abin ya shafa, ko
2. saita su zuwa `__MISSING__:<new english>` — daga nan runtime zai nuna ingantaccen Turancin
   (`src/i18n/request.ts::deepMergeFallback`, #7258), sannan key ɗin ya shiga jerin jiran fassara.

Idan **ma’anar** string ɗin ta canza, ya fi kyau a **sake wa key suna**: sabon key ba zai iya gado tsohuwar fassara ba. Wannan shi ne tsarin da #8463 ya yi amfani da shi.

```bash
npm run i18n:check-value-drift          # mai tsauri (abin da CI ke gudanarwa)
npm run i18n:check-value-drift:warn     # rahoto kawai
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Yana fita da 0 tare da `SKIP reason=base-unresolved` idan ba za a iya karanta base catalog ba (shallow clone ba tare da base ref ba), daidai da halayen `check-openapi-breaking`.

### Aiki: `i18n`

Cikakken matrix na tantance i18n (aiki ɗaya ga kowane locale). Dukkan aikin na ba da shawara ne kawai.

| Script                          | Abin da yake tantancewa        | Toshewa                                                |
| ------------------------------- | ------------------------------ | ------------------------------------------------------ |
| `validate_translation.py quick` | Cikar fassara ga kowane locale | **Na shawara** (`continue-on-error: true` a duk aikin) |

### Aiki: `pr-test-policy`

Yana gudana a kan pull requests kawai.

| Script                 | Abin da yake tantancewa                                                                                                                        | Toshewa |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PRs da suka canza production code a `src/`, `open-sse/`, `electron/`, ko `bin/` dole ne su haɗa ko su sabunta gwaje-gwaje (Doka Mai Tsauri #8) | Eh      |
| `check:test-masking`   | Test files da aka canza ba sa rage jimillar adadin assert ko ƙara tautologies na `assert.ok(true)`                                             | Eh      |
| `check:pr-evidence`    | Jikin PR yana ambaton shaidar test/VPS ta canjin (yana sarrafa Doka Mai Tsauri #18 ta hanyar binciken rubutun PR — mai rauni, duba Backlog)    | Eh      |

### Aiki: `test-vitest`

Yana gudana bayan `build`. Yana hana merge idan ya gaza.

| Suite            | Abin da yake tantancewa                                  | Toshewa                                                                                                                  |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (tools 110), autoCombo, cache — vitest runner | Eh                                                                                                                       |
| `test:vitest:ui` | Gwaje-gwajen UI component — vitest runner                | **Mai toshewa** — an cire gazawar da ta riga ta kasance a fili a `vitest.config.ts`; sabbin gazawa suna sa aikin ya gaza |

### Nightly workflows (masu jadawali, na shawara)

Waɗannan suna gudana bisa cron schedule (da `workflow_dispatch`), ba sa taɓa gudana a kan PRs. Dukkansu na shawara ne kawai.

| Workflow               | Abin da yake tantancewa                                                                                                                                                   | Toshewa        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | fast-check property tests tare da random seed + adadin runs mai yawa                                                                                                      | **Na shawara** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                     | **Na shawara** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + garak probes (ana tsallake su idan babu provider secret)                                                                         | **Na shawara** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) a kan OmniRoute mai aiki ta amfani da `docs/openapi.yaml` — yana fito da take-taken spec / 500s da ba a sarrafa ba (Mataki 8 B.4) | **Na shawara** |
| `nightly-mutation`     | Stryker mutation-testing score a kan fast unit lane — mutants da suka tsira suna bayyana assert marasa ƙarfi                                                              | **Na shawara** |
| `nightly-compat`       | Matrix na dacewar Node engine a duk ranges na `engines.node` da ake tallafawa                                                                                             | **Na shawara** |

---

## Matakin saurin aiwatarwa (2026-08-30 → v4.0 LTS): an sassauta kowane ma'aunin tushe da 20%

Shawarar mai tsarin (2026-08-30): har zuwa rarraba v4.0 zuwa sassa, saurin fitar da aiki ya fi
muhimmanci fiye da hana bashin fasaha ƙaruwa. An sassauta kowane ma'aunin tushe na **lamba** da 20% a
aiki guda mai yiwuwa a bincika, kuma an ayyana matakin a cikin `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Abin da ya canza                                                                                                                                                                                                              | Inda yake                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ƙididdigar da ƙaranci ya fi kyau ×1.2, kaso da yawa ya fi kyau ÷1.2 (an bar mafi ƙarancin coverage a 60, `eslintErrors` ya ci gaba da zama 0, `eslintWarnings` 0 → 20% na daskararren adadin suppression) | `quality-baseline.json` (bayanin `_relax_velocity_2026_08_30` ya lissafa kowane kafin → bayan)         |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                              | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, kowane iyakar layi na `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                    | `file-size-baseline.json`                                                                              |
| ƙididdiga na kowane fayil / kowace lambar TS ×1.2                                                                                                                                                                             | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                           | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` ya zama shawara yayin da `_policy.requireTighten === false`                                                                                                                                               | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| aikin dare na `bank-ratchet-shrinks` ya dakata (domin zai adana raguwar da aka auna kuma ya kawar da sararin da aka tanada)                                                                                                   | `.github/workflows/nightly-release-green.yml`                                                          |

Jerin abubuwan da aka yarda da su (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ba kasafin iyaka ba ne kuma ba a taɓa su ba. Ƙofofin manufofin wucewa/rashin wucewa (sirrika, dokokin SQL,
yarjejeniyar docs/env, daidaiton i18n, gwaje-gwajen unit) ba su canza ba — gwajin da ya gaza har yanzu gwajin da ya gaza ne.

**Kayan aiki**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — aikin
  sassautawa na sau ɗaya (`scripts/quality/relax-baselines.mjs`); yana ƙin sake gudana sau biyu da
  wannan note ɗin.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  yana auna kowane binciken inganci na lambobi kamar yadda CI yake yi, kuma yana nuna tazarar da ta rage ga kowane bincike
  (`scripts/quality/baseline-headroom.mjs`). Aikin dare na `baseline-headroom` yana wallafa teburin
  a taƙaitaccen sakamakon gudanar da tsarin aiki, yana kuma loda rahoton JSON/Markdown da sunan
  `baseline-headroom-<run_id>`, wanda ake adanawa na kwanaki 90. Layukan gargaɗi da na yanayi mai tsanani suna nuna
  binciken da ya rage masa 10% ko ƙasa da haka kafin iyakarsa, ko wanda ya riga ya wuce iyakar.
  Duba waɗannan rahotanni a matsayin gargaɗin farko cewa ana amfani da kasafin da aka ware; karanta bayanan
  `_rebaseline_*` na binciken da abin ya shafa. Aikin ba ya ƙirƙira ko sabunta batun dindindin kuma;
  #12149 yana adana tarihin rahotannin da suka gabata.

**Yanayin sabon code (Clean-as-You-Code) — tun daga 2026-08-30, hanya mai sauri ta PR kaɗai**

A kan abubuwan `pull_request`, `quality.yml` yana miƙa `--base-ref <PR base SHA>` zuwa `check:file-size`,
`check:complexity-ratchets` da `check:dead-code`. A wannan yanayin ƙofar tana kwatanta HEAD da
merge-base **kawai a cikin fayilolin da PR ya taɓa** (`scripts/check/newCodeMode.mjs`: ana samar da
merge-base a cikin `git worktree` na wucin gadi, ana gudanar da ESLint/knip a can da kuma a HEAD, sannan
ana kwatanta ƙididdigar kowane fayil):

- **mai toshewa** — PR ya ƙara saɓawar cyclomatic/cognitive ko dead exports a fayilolin da ya canza
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` a cikin log);
- **na shawara** — jimillar duniya baki ɗaya idan aka kwatanta da daskararren ma'aunin tushe. Karkacewar da aka gada ba ta taɓa sa
  PR marar laifi ya gaza; ana sake daskarar da karkacewar yayin daidaitawar release kuma aikin headroom yana sa ido a kanta.

Gudanarwar `workflow_dispatch`, cikakken binciken release-green da aikin headroom na dare ba su da tushen PR
kuma suna ci gaba da kwatantawa ta cikakke (duniya baki ɗaya). Coverage, duplication da type-coverage suna ci gaba da kasancewa na duniya baki ɗaya
a yanzu (kayan aikinsu ba sa samar da bambancin kowane fayil cikin sauƙi) — su ma 'yan takarar samun irin wannan tsarin ne.

**Rufe matakin a v4.0 (LTS = ya fi na baya tsauri, ba “komawa yadda aka saba” ba)**

1. A kan tsantsar ƙarshen `release/v4.0.0`: gudanar da `npm run quality:headroom --json` domin rikodi, sannan
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, da `--update` na kowace ƙofar typecheck
   — kowane baseline zai sauka zuwa ƙimar da aka auna.
2. Goge `_policy` daga `quality-baseline.json` (wannan zai sake kunna `--require-tighten` da tanadin dare),
   mayar da `THRESHOLD = 36` (ko sama da haka) a cikin `check-openapi-coverage.mjs`.
3. Ƙara tsaurara fiye da abin da aka auna inda rarrabawa zuwa modules ta yi amfani: mayar da `cap` na girman fayil zuwa 1000
   (ko 800), ƙara mafi ƙarancin coverage da +5, sannan sa dead exports su zama 0 ga packages da aka rarraba zuwa modules.

## Ma'aunin Ratchet (`quality-baseline.json`)

Injin ratchet (`scripts/quality/check-quality-ratchet.mjs`) yana karanta `quality-baseline.json`
kuma yana kwatanta shi da sabon `quality-metrics.json` da aka tattara. Duk wani ma'auni da ya koma
baya fiye da epsilon ɗinsa zai sa ginin ya gaza.

Ma'aunan da ake bibiyarsu a halin yanzu:

| Ma'auni               | Alkibla | Ma'ana                              |
| --------------------- | ------- | ----------------------------------- |
| `eslintWarnings`      | `down`  | Kada adadin gargaɗin ESLint ya ƙaru |
| `coverage.statements` | `up`    | Kada ɗaukar bayanai ya ragu         |
| `coverage.lines`      | `up`    | Kada ɗaukar layuka ya ragu          |
| `coverage.functions`  | `up`    | Kada ɗaukar ayyuka ya ragu          |
| `coverage.branches`   | `up`    | Kada ɗaukar rassa ya ragu           |

Don sabunta ma'aunin bayan ingantawa ta gaskiya:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Tutocin `--update` yana rubuta ƙimomin da aka auna a yanzu cikin `quality-baseline.json`.
Yi commit na wannan fayil tare da canjin da ya inganta ma'aunin. PR da ya inganta wani
ma'auni ba tare da sabunta ma'aunin ba, `--require-tighten` zai gano shi (Mataki 6A.5,
ana jiran aiwatarwa).

### Ratchet na CodeQL: lokacin sabuntawa da kunnawa da hannu

`check:codeql-ratchet` yana karanta **yanayin repo, wanda ake sabuntawa bisa jadawali — ba a kowane PR ba.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` yana bayar da rahoton
`state: configured`, `schedule: weekly`: binciken default-setup na GitHub ne, ba bincike
a kowane push ba. Sakamako: bayan an haɗa PR da ya GYARA faɗakarwa, ratchet zai ci gaba da karanta
tsohon adadi mafi girma har sai an gudanar da bincike na gaba da aka tsara — don haka yana bayar da rahoton koma-baya
a kan kowane buɗaɗɗen PR, har da PR na bin diddigin gyaran kansa, har sai binciken ya sabunta.

**Sabuntawa da hannu**: `gh workflow run codeql.yml --ref release/vX.Y.Z` yana sake gudanar da
binciken kuma yana sake wallafa faɗakarwa cikin mintuna. Fara da karanta `.github/workflows/codeql.yml`
— taken kansa yana bayyana cewa `workflow_dispatch` kaɗai ne **saboda yana cin karo da
"default setup" na GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Maido da masu kunnawa na `push`/`pull_request`/
`schedule` yana buƙatar **matakin mai repo da farko**: Settings → Code security →
CodeQL: Default → Advanced. Kada a ƙara mai kunnawa na `schedule:` ba tare da wannan sauyin ba — zai
samar da ayyukan da ke gazawa ne kawai.

**Tsaurara ma'aunin bayan adadin ya ragu** — `node scripts/check/check-codeql-ratchet.mjs
--update` yana rubuta sabon adadin da aka auna cikin `quality-baseline.json` →
`metrics.codeqlAlerts.value`, domin ratchet kada ya amince da koma-baya zuwa tsohon
iyaka ba tare da bayyana ba. Misalin da aka aiwatar (2026-09-02/03): PR #12502 ya gyara faɗakarwa na gaske guda 7
(13 → 6 da aka auna a buɗe); PR #12530 ya tsaurara daskararren ma'aunin daga 11 → 6 don su dace; sannan
aka yi watsi da sauran 6 tare da hujjar kowace faɗakarwa har suka koma 0 a buɗe.

**Yin watsi da faɗakarwa shawarar mai gudanarwa ce (Doka Mai Tsauri #14)** — kada a taɓa yin watsi da faɗakarwar CodeQL
ba tare da rubuta hujjar fasaha a sharhin yin watsi ba: `won't fix` don
wani buƙatar yarjejeniyar upstream, `used in tests` don wani test fixture, `false positive`
don sanitizer da CodeQL ba zai iya gani ba (misalin da ya gabata: `docs/security/ERROR_SANITIZATION.md`).

---

## Manufar Sake Gwaji (WS5.4, v3.8.49)

Sake gwaji yana keɓanta ga kowane runner, ba ya zama ƙa’ida gama-gari — sake gwaji gama-gari yana mayar da ainihin koma-baya
zuwa matsalolin bazata da ba a iya gani:

| Runner           | Manufa                                                                                                                                                                  | Dalili                                                                                                                                                        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` a CI kawai, tare da `trace: on-first-retry`                                                                                                                | Lokacin burauza/cibiyar sadarwa ba ya da tabbas a zahiri; sake gwaji sau ɗaya tare da trace yana mayar da matsalar bazata zuwa artifact da za a iya bincikowa |
| Vitest           | BABU sake gwaji na gama-gari. Gwajin da aka tabbatar yana samun matsalar bazata zai samu sake gwaji takamaimai ga gwajin (a bayyane a cikin diff, kuma a duba shi a PR) | Yana adana jerin keɓewar a cikin repo, ba tare da ɓoye shi ba                                                                                                 |
| node:test (unit) | BABU sake gwaji, har abada                                                                                                                                              | Gwajin unit mai matsalar bazata kwaro ne a cikin gwajin — a gyara shi, kada a sake gwada sa’a                                                                 |

SLOs da ake hari da zarar telemetry na matsalolin bazata ya fara aiki (WS5.2/5.3): ƙasa da 1% na yawan matsalar bazata ga kowane gwaji
(ma’aunin “gyara yanzu”), da yawan nasarar aƙalla 95% ga kowane pipeline. Waɗannan ƙimomin manuniya ne na masana’antu —
a sake daidaita su da ma’aunanmu.

## Kaucewar Ratchet a Matakin Release (WS5.5, v3.8.49)

Lokacin da ratchet (girman fayil, sarƙaƙiya, gargadin eslint) ya koma baya a kan TSANTSAR tip na release
— wato, HAƊIN merges ne ya jawo koma-bayan, kuma babu wani PR guda da zai iya sake haifar da
koma-bayan a branch ɗinsa shi kaɗai — gyaran yana wuyan **release captain, sau ɗaya, a kan
release branch**: a fifita cirewa/refactor; a sake saita baseline ne kawai tare da rubutacciyar
shigar bayanin dalili. Kada a taɓa ɗora kaucewar haɗin kan PR na mai ba da gudummawa, kuma kada a taɓa
sake saita baseline ga kowane PR (hakan yana ɓoye ainihin koma-baya). Da farko a bambance: a sake haifar da
ja a kan tsantsar tip cikin probe worktree kafin a ɗauka cewa PR ɗinka ne ya jawo shi.

## Adana Raguwar Ratchet — alkiblar ƙasa (#8584)

Ratchet ɗin rabinsa kawai yake aiki ta atomatik, kuma wannan rabin ne mara dacewa. **Ɗaga** cap
gyaran JSON ne da hannu wanda ke ɗaukar daƙiƙa goma, kuma shi ne hanya mafi sauri ta warware toshewar jan PR.
**Rage** cap yana buƙatar wani ya gudanar da `--update` sannan ya commit sakamakon — kuma har sai
job ɗin `bank-ratchet-shrinks` ya fara aiki, babu workflow da ke gudanar da shi. Sakamakon da aka auna
(2026-07-25): frozen files guda 18 sun riga sun kai ko sun gaza cap na layi 800 na sabon fayil, mafi muni
yana da 132× (`src/shared/validation/schemas.ts`, layi 19 suna ɗauke da cap na 2,523); iyakar
sarƙaƙiya ta tashi daga `1794 → 2169` ta cikin bayanan sake saita baseline kusan 37 tare da raguwa
guda ɗaya tak (−1); sannan an rubuta “ƙara tsaurara ta `--update` a zagaye na gaba” sau 31 amma an aiwatar
sau ɗaya. Cap da ya daɗe fiye da lambar da ta jawo kafa shi yana mayar da duk wani kammalallen
rarrabawa a ɓoye zuwa izinin faɗaɗawa ga duk wanda zai gyara fayil ɗin a gaba.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** yana rufe wannan zagayen:

|                 |                                                                                                                                     |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Yana gudana a   | `schedule` (sau 3/rana) + `workflow_dispatch` — da gangan **ba** `push` ba                                                          |
| Yana aunawa     | `release/vX.Y.Z` mafi girma, daidai da resolution + injection guard na `release-green`                                              |
| Yana rubutawa   | `check:file-size --update` da `check:complexity-ratchets --update` (dukansu an gina su don ragewa kawai)                            |
| Yana tabbatarwa | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                            |
| Yana aikawa     | PR guda ɗaya mai kasancewa na zamani koyaushe zuwa release branch — ana force-update ɗinsa, ba a taɓa cika shi da saƙonnin banza ba |

Ana tara aikin adanawa a rukuni maimakon yin sa ga kowane push saboda ba shi da buƙatar ƙarancin jinkiri (idan an adana raguwa
cikin awa 8 babu matsala), alhali gudanarwa ga kowane merge zai sake gina PR branch akai-akai
a lokacin kamfen na merge kuma ya biya cikakken zagayen ESLint kowane lokaci. Ganowa yana ci gaba a kan
push (`release-green`); adanawa kawai ake tarawa rukuni-rukuni.

### Mai tabbatar da aminci

Job ɗin yana rubuta zuwa baselines ba tare da kulawa ba, don haka `verify-ratchet-bank.mjs` ne yake sa
hakan ya zama abin karɓa. Yana yin diff na tree bayan `--update` da `HEAD` sannan ya **dakatar da job
kafin wani commit ya wanzu** — ba tare da buɗe PR ba — sai dai idan kowane canji yana ɗaya daga cikin:

- shigar lamba ta `frozen` / `testFrozen` da aka **rage** ko aka **cire**
- `complexity-baseline.json` → `count` da aka **rage**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` da aka **rage**

Duk wani abu dabam zai gaza: ɗaga lamba, ƙara shigarwa, canza `cap`/`testCap`, ko
share/sake rubuta bayanin `_rebaseline_*` (waɗannan bayanan su ne tarihin binciken dalilin da ya sa kowace
iyaka take wanzu, kuma ana adana su cikin object ɗin `frozen` guda ɗaya da shigarwar fayilolin).
Bot da zai iya ɗaga cap zai fi halin da ake ciki muni ƙwarai. Kariyar koma-baya:
`tests/unit/verify-ratchet-bank.test.ts`.

Job ɗin ba ya taɓa yin push zuwa `release/*` — mutum ne yake merge na PR, don haka mummunan ma’auni
ba zai iya shiga ba tare da an duba shi ba.

## Manufar Allowlist

Duk wata ƙofa da ba za ta iya gazawa saboda keta dokoki da suka riga suka kasance ba tana amfani da daskararren allowlist
(misali, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Manufar ita ce:

**Gyara tushen matsalar; yi amfani da allowlist ne kawai idan ketawar ta riga ta kasance kuma
ba za a iya gyara ta a cikin PR ɗin nan ba.**

Lokacin ƙara wani shigarwa zuwa allowlist:

1. Haɗa tsokaci mai bayyana dalilin.
2. Nuna batun bin diddigi (misali, `// #3498 — Fasalin Phase 2 ne, ba a aiwatar da shi ba tukuna`).
3. Cire shigarwar a cikin PR ɗin da ya gyara ketawar — tsohuwar shigarwar da ba ta ƙara
   danne wata keta doka mai aiki ba ita ma matsala ce (tilasta-dokar tsofaffin shigarwa ta 6A.3 za ta
   sa ƙofar ta gaza saboda shigarwar allowlist marar alaƙa da zarar an aiwatar da ita).

**Kada** a ƙara shigarwar allowlist don kawai a sa gwaje-gwaje su wuce da sauri. Korewar ƙofa tare da allowlist
mai ci gaba da ƙaruwa yana ba da ruɗin inganci ne kawai.

### Lokacin da wata ƙofa ta gaza a kan PR ɗinka

1. **Karanta sakamakon ƙofar da kyau** — yana gaya maka takamaiman fayil ko alamar da ta karya
   dokar.
2. **Gyara ketawar** — yawancin ƙofofi binciken tsarin fayil ne mai ƙayyadadden sakamako waɗanda ke wucewa da zarar
   lambar ta zama daidai.
3. **Idan ketawar ta riga ta kasance** (wato, ba kai ne ka shigar da ita ba amma yanzu ƙofar
   tana rufe ta): ƙara shigarwar allowlist tare da tsokacin dalili da batun bin diddigi.
4. **Idan ƙofar ratchet ce** (coverage, gargaɗin ESLint, maimaitawa, sarƙaƙiya):
   canjinka ya ƙara munana ma'aunin. Gyara ainihin matsalar, ko kuma (da wuya) gudanar da
   `npm run quality:ratchet -- --update` idan canjin da gangan aka yi shi kuma ana iya amincewa da
   tabarbarewar ma'aunin — amma bayyana dalilin a bayanin PR.
5. **Ƙofofin shawarwari** (`continue-on-error: true`) na bayar da bayanai ne — ba sa hana
   haɗawa amma suna bayyana a taƙaitaccen bayanin CI. Duk da haka, a gyara su.

---

## Ƙara Sabuwar Ƙofa

1. Ƙirƙiri `scripts/check/check-<name>.mjs` (ko `.ts`). Ƙofofin manufofi suna fita da 0/1.
   Ƙofofi irin na ratchet suna fitar da ma'auni zuwa `quality-metrics.json` ta hanyar `collect-metrics.mjs`.
2. Ƙara `"check:<name>": "node scripts/check/check-<name>.mjs"` zuwa `package.json`.
3. Haɗa ta a cikin `.github/workflows/ci.yml` ƙarƙashin aikin da ya dace
   (manufa → `lint` ko `docs-sync-strict`; ratchet → `quality-gate`).
4. Idan tana da allowlist, yi amfani da `reportStaleEntries()` daga
   `scripts/check/lib/allowlist.mjs` domin a gano tsofaffin shigarwa ta atomatik.
5. Rubuta gwaji a cikin `tests/unit/build/` wanda ya ƙunshi dabarar gano ketawar ta ƙofar.
6. Sabunta wannan takarda (ƙara layi zuwa jadawalin aikin da ya dace).

---

## Kayan aikin wakili: LSP-in-the-loop (na zaɓi)

Baya ga ƙofofin CI, OmniRoute yana zuwa da tsarin farawa na **zaɓi** na `agent-lsp`
(`.mcp.json` na matakin aikin, Fase 7 Task 15). Ƙirƙiri `.mcp.json`
don samar wa wakilan rubuta lamba damar amfani da uwar garken harshen TypeScript, domin su tantance alamomi /
binciken kurakurai **kafin** rubuta lamba — abokin `typecheck:core` na tantancewa-kafin-da'awa
wanda ke rage kurakuran "alamar da aka ƙirƙira" tun daga tushe. Da gangan ba a
loda shi ta atomatik (kai ne za ka zaɓa kuma ka tabbatar da gadar MCP↔LSP); gurɓatacciyar shigarwa tana rubuta
kuskuren haɗi ne kawai kuma ba ta taɓa karya zaman aiki ba.

---

## Jerin Ayyukan Da Aka Jira Don Daidaitawa (bitar ROI — Mataki 9 Zagaye 3)

An daidaita wannan kundin da `ci.yml` a ranar 2026-06-17 (sigar da ta gabata ba ta haɗa da
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` ba). Bitar ROI kan jerin da aka daidaita
ta gano waɗannan ayyukan da za a iya sauƙaƙawa. **Haɗe-haɗen sauye-sauyen CI ne na
inji kawai; sauya matsayi/cirewa kuwa shawarwarin manufofi ne da aka keɓe wa mai gudanarwa.** Babu wani abu a ƙasa
da aka fara aiwatarwa tukuna.

**Haka kuma ba a rubuta bayaninsu a sama ba** (na shawara, alama mai rauni): aikin `docs-lint`
(markdownlint + Vale, dukan aikin yana da `continue-on-error`) da kuma workflows na na'urorin dubawa masu zaman kansu
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` yana cikin
`quality-baseline.json` amma ba a haɗa shi da ratchet mai toshewa a `ci.yml` ba — a halin yanzu
ma'aunin ba shi da abin da yake sarrafawa.

### Haɗewa / cire maimaituwa (na inji, haɗari kaɗan)

An tabbatar da kowane zaɓi bisa halin gate na ainihi a ranar 2026-06-17 (amince amma a tabbatar);
haɗe-haɗe da dama da suka yi kama da “bayyane” sun ɓoye bashi, don haka **ba** za a iya maye gurbinsu kai tsaye cikin sauƙi ba.

- **`check:docs-sync` yana gudana sau biyu** — shi kaɗai a aikin `lint`, sannan kuma a cikin `check:docs-all` (`docs-sync-strict`) da husky pre-commit hook. ✅ **AN KAMMALA** — an cire kiran da ke gudana shi kaɗai daga `lint`.
- **Binciken CVE** — ❌ **BA haɗewa ce mai sauƙi ba.** `audit:deps` yana gaza kai tsaye idan ya ga kowane CVE mai haɗari/babban haɗari; `check:vuln-ratchet` (osv) kuwa yana gaza ne kawai idan an samu _taɓarɓarewa_ idan aka kwatanta da baseline (a halin yanzu 1 MODERATE). Ma'anoninsu sun bambanta — cire `audit:deps` zai kawar da cikakken gate na haɗari/babban haɗari. A bar su duka.
- **Gano madauwari** — ✅ **AN KAMMALA** (#15159 G-01/G-02). Tsohon rubutun nan ya kira `check:cycles` gate “mai kore, da aka zaɓa a tsanake” kuma ya ba da hujjar ci gaba da sanya shi mai toshewa saboda `check:circular-deps` (dpdm) ya bayar da rahoton madauwari 91. Wannan koren sakamakon **koren ƙarya ne**: `check:cycles` ya binciki ƙananan kundin adireshi 5 (fayiloli 450), ya dace da static `import|export … from` kawai, sannan ya yi watsi da duk wani specifier na `@/` da `@omniroute/open-sse/`, don haka bai iya ganin madauwuran dynamic-import + alias da suka mamaye repo ba. An gyara: yanzu gate ɗin yana ratsa `src` + `open-sse` (fayiloli 5023), yana tattara specifiers daga TypeScript AST (don haka `import("…")` yana ƙidayuwa amma `typeof import("…")` da ke matsayin type ba ya ƙidayuwa), kuma yana warware tsconfig `paths`. Yana gano madauwari **14**, ba 0 ba. Saboda ba za a iya gyara madauwari 14 da suka riga suka kasance a cikin gate PR ba, yanzu `check:cycles` ya zama **ratchet** (`--ratchet`, iyaka `metrics.cycles.value = 14` a cikin `quality-baseline.json`, `direction: down`) — yana toshe duk wata _taɓarɓarewa_ kuma adadin zai iya raguwa ne kawai. CI yana gudanar da `npm run check:cycles:ratchet`. Rage adadin a hankali yana tafiya tare da **A-01**. `check:circular-deps` (dpdm) zai ci gaba da zama na shawara a matsayin ra'ayi na biyu mai faɗi.
- **Sarƙaƙiya** — ✅ **AN KAMMALA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): zagayen ESLint guda ɗaya, yana ƙirga bisa ruleId domin cyclomatic+max-lines da cognitive baselines su ci gaba da kasancewa masu zaman kansu; `check:complexity` / `check:cognitive-complexity` na ɗaiɗaiku suna nan don `--update` na gida.
- **Hana ruɗin `/api`** — ✅ **AN KAMMALA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): lissafin FS guda ɗaya na `src/app/api`, openapi-routes + docs-symbols har yanzu suna bayar da rahoto daban-daban; na ɗaiɗaiku suna nan don gudanarwa ta gida.
- **`check:node-runtime` yana gudana a ayyuka 11** — ⚠️ **ROI kaɗan.** Kowanne yana da runner daban kuma binciken bai kai sakan 1 ba; jimillar abin da za a adana kusan sakan 10 ne, amma hakan zai sa a rasa kariyar kowane aiki mai arha. Bai cancanci rikicin sauyin ba.
- **`typecheck:noimplicit:core` a CI lint** — ✅ **an cire daga aikin lint** (a baya na shawara ne da `continue-on-error`); ɓangaren type mai toshewa shi ne `typecheck:core` + `check:type-coverage`. An riƙe script na gida.

### Sauya matsayi / yanke shawara (manufar mai gudanarwa)

- `check:openapi-security-tiers` (na shawara) — ❌ **BA za a iya sauya matsayinsa kai tsaye cikin sauƙi ba.** Yana fita da 0 amma yana gargadin cewa routes na `traffic-inspector` da dama a ƙarƙashin `LOCAL_ONLY_API_PREFIXES` ba su da annotation na `x-loopback-only: true`. Tilasta shi yana buƙatar fara ƙara waɗannan annotations zuwa `openapi.yaml`.
- `typecheck:noimplicit:core` (na shawara) — ratchet mai toshewa na `check:type-coverage` ya riga ya rufe yawancin aikinsa. A sauya shi zuwa ratchet ko a cire zagayen `tsc` na biyu mai maimaituwa.
- `test:vitest:ui` (yanzu **mai toshewa**) — an ware gazawar da ta riga ta kasance a sarari cikin `vitest.config.ts` tare da sharhin bin diddigi na `// #8618`; sababbin gazawa za su sa aikin ya gaza.
- `check:secrets` (gitleaks, ratchet mai toshewa da aka daskarar a sakamakon ƙarya 3 da aka rubuta bayaninsu) — a saka ukun cikin allowlist domin a kai 0, ko a saukar da shi zuwa na shawara. Yana maimaita wani ɓangare na aikin GitHub native secret-scanning + `check:public-creds`.
- `check:pr-evidence` (mai toshewa, yana grep rubutun PR-body) — haɗarin sakamakon ƙarya yana da yawa; cire shi zai raunana aiwatar da Hard Rule #18, don haka wannan shawarar manufa ce ta gaske.
- `semgrep` (na shawara mai zaman kansa) — yana maimaita aikin CodeQL ga rukunin OWASP; a haɗa baseline ɗinsa da ratchet ko a cire shi.

---

## Takardun da Suka Shafi Wannan

- Sarkar samarwa (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — ƙofar daidaiton tarin maɓallai

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, aikin `i18n-ui-coverage`).
Yana kwatanta tarin maɓallan ƙarshe na kowane `src/i18n/messages/<locale>.json` da `en.json`, kuma yana kasa
idan akwai wani maɓallin ƙarshe da ya ɓace ko ya yi ƙari, ba tare da la’akari da lokacin da aka ƙara maɓallin ba. Alamomin wucin-gadi na `__MISSING__:`
ana ƙirga su a matsayin suna nan (abin da ke cikinsu aikin ƙofar rabo ne). Wannan shi ne cikakken abin da ke cike gibin
ƙofofin nan biyu masu dogaro da diff/kashi: `check-ui-keys-coverage` yana tilasta mafi ƙarancin 80 % ga kowane
locale (maɓallai 43 da suka ɓace cikin ~13,000 har yanzu suna nuna 99.7 %), sannan `check-new-key-coverage` yana tantance
maɓallan da PR ya ƙara wa `en.json` kawai. Ana samar da rukunin locale daga `en.json` na ranar
da aka ƙirƙiri branch ɗinsa, sannan yana ci gaba da fassara na kwanaki yayin da base ke ƙara sabbin maɓallai; PR ɗin rukunin ba ya ƙara
wani maɓalli da kansa, don haka dukkan ƙofofin biyu ba su yi ƙararrawa ba lokacin da rukuni na 1 (#13044) ya shiga yana da ƙarancin maɓallai 43 a
locale tara, haka kuma rukuni na 2 (#13660) yana da ƙarancin maɓallai 10 a locale takwas (2026-09-15). Gyara gazawa da
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; maɓallin ƙarshe na `extra`
yana nufin tushen ya cire shi — share shi daga locale ɗin. `--warn` yana bayar da rahoto ba tare da sa gazawa ba.
`--catalog=cli` yana gudanar da kwatancin iri ɗaya a kan `bin/cli/locales` (`npm run i18n:check-keys:cli`);
duk matakan biyu suna cikin aikin `i18n-ui-coverage`.

#### `check-new-key-coverage` — ƙofar i18n ta sabon maɓalli

Abokin `check-ui-value-drift`. Wancan yana gano lokacin da aka **sake rubuta** ƙimar Turanci
amma aka bar fassarorinta a baya; wannan kuma yana gano maɓallin Turanci da aka **ƙara**
amma wasu locale ba su taɓa samunsa ba.

`check-ui-keys-coverage` ba zai iya ganin wannan nau’in ba: yana tilasta mafi ƙarancin kashi ga kowane locale, kuma
maɓallai goma sha ɗaya da suka ɓace cikin ~13,000 suna barin coverage a 99.9%. Kashi ga kowane harshe ba zai iya
bayyana cewa "an fitar da wannan fasalin ba tare da fassara ba" — cikakken fasali zai iya shiga sabon locale ba tare da
wani rubutu ba, kuma lambar ba za ta taɓa motsawa ba.

Lamarin da yake wakilta: Mataki na 3 na Orchestration Canvas ya fassara maɓallansa goma sha ɗaya a duk
locale 42 da suke akwai a lokacin. Bayan sa’o’i kaɗan, rukunin harsunan EU (#13044) ya kai repo ɗin
zuwa locale 51, kuma sabbin locale tara (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ba su taɓa
samun su ba. `deepMergeFallback` yana maye gurbin maɓallin da ya ɓace da Turanci, don haka yanayin gazawar ya kasance
UI da ba a fassara ba maimakon UI marar rubutu — matsala ta gaske, kuma wadda tsarin ya sa ta kasance shiru.

Kamar abokin nasa, yana **la’akari da diff**, yana kwatanta Turanci a merge base da working
tree, don haka tsoffin giɓi suna ci gaba da kasancewa daskararru, kuma ƙofar ba ta buƙaci migration kafin a kunna ta.

**Alamar `__MISSING__:<english>` ba ta cika sharadin ba (tun daga 2026-09-17).** A baya ita ce hanyar jinkirtawa
da aka rubuta a takardu — runtime yana komawa ga ingantaccen Turanci — har sai PR na fasali takwas a
2026-09-16 suka ƙara maɓallai 61 kuma suka sanya alamar a duk locale 65 maimakon fassara: wannan
ƙofa ta amince da kowannensu, babu abin da ya toshe PR ɗin, sannan ƙofar rabo ta ainihin fassara mai toshewa
ta kasa a release tip ga kowa (pt-BR 3.2 % > 2.5 % + 0.5). Yanzu ana ɗaukar alama
a matsayin fassarar da ta ɓace. Gyara gazawa da
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, ko kuma
duk locale a lokaci guda da `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
yana aiki lafiya a detached state, kuma ya ƙi farawa ba tare da env na `OMNIROUTE_TRANSLATION_*` ba). Maɓallin da dole ya ci gaba da kasancewa
da Turanci (sunan samfur/engine/flag da aka kafe) ya kamata ya kasance a `scripts/i18n/untranslatable-keys.json`,
ba a ɓoye shi a bayan alama ba. `vi` yana haramta alamomin gaba ɗaya (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — ƙofar gwaje-gwajen da aka ajiye gefe

Fayil da ke cikin jerin `exclude` na `vitest.config.ts` gwaji ne da ba ya gudana, kuma ga duk wanda ya karanta
tree ɗin, yana bayyana kamar coverage ne. Fayil sittin da biyu sun taru a bayan sharhin
`// #8618 — pre-existing failure; remove this exclusion when fixed`. An rufe issue #8618 a
2026-08-11 yayin da jerin da yake bi ya ƙaru daga shigarwar 45 zuwa 62, kowace sabuwa tana gadon sharhin
da ke nuna issue da ya riga ya mutu. Lokacin da a ƙarshe aka auna jerin fayil bayan fayil (#13204), **51 daga cikin 62
sun yi nasara a kan tree na yanzu ba tare da wani canji ga source ba**.

Ƙofar tana buƙatar kowane exclusion da ya warware zuwa ainihin fayil ya (a) ambaci tracking issue, kuma
(b) bayyana a `config/quality/vitest-exclusions.json` tare da matsayin da aka auna, don haka ƙara ɗaya zai zama
diff da za a iya bitarwa a cikin keɓantaccen fayil maimakon ƙara wani layi guda a cikin array mai shigarwa 60. Da gangan,
ba ta sake gudanar da gwaje-gwajen da aka ware ba — hakan yana ɗaukar ~10 minutes kuma ya dace da periodic job;
inventory ɗin yana rubuta lokacin da aka auna kowannensu a karo na ƙarshe.
