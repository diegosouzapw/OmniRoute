# Quality Gates Reference (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Ang dokumentong ito ang awtoritatibong sanggunian para sa lahat ng CI quality gate sa OmniRoute.
Inilalarawan nito ang bawat gate, kung ano ang bine-validate nito, kung saang CI job ito tumatakbo, kung gumagamit ito
ng ratchet baseline o patakarang pass/fail, at kung hinaharangan nito ang build o nagsisilbi lamang bilang abiso.

Para sa maikling buod at patakaran sa allowlist, tingnan ang seksyong "Quality Gates & Ratchets"
sa `AGENTS.md`. Para sa kritikal na pagtatasa, klasipikasyon ng maturity, at tool-agnostic na
plano ng replikasyon ng parehong sistema, tingnan ang
[Playbook ng Quality Gate](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Imbentaryo ng gate at mga profile ng pagpapatupad

### Pagtanggap ng kandidato

Ang mga workflow ng CI at Quality Gates ay parehong naglalabas ng matatag na pasya: `Gate / CI` at
`Gate / Quality`. Inililista ng kanilang may-bersyong patakaran sa pagtanggap ang bawat upstream job
bilang kinakailangan o advisory. Dapat magtagumpay ang isang naaangkop na kinakailangang job: ang mga
resultang nawawala, kinansela, nilaktawan, nakabinbin, at hindi alam ay hindi makapagtatatag ng PASS. Maaaring
gawing hindi naaangkop ang isang code lane ng wastong klasipikasyong docs-only o catalog-only;
ang draft na PR ay hindi tinatanggap na kandidato. Hindi inaalis ng label na `hotfix` ang pangangailangan sa ebidensya.

Saklaw ng parehong workflow ang mga PR at push sa mga main/release branch, manu-manong dispatch, at
mga merge-group event. Isinasagawa ng push, dispatch, at merge-group ang buong seleksyon. Gumagamit ang mga fork
at merge group ng mga hosted runner para sa mga job na kung hindi ay pipili ng mga self-hosted
runner; dapat beripikahin ang sapat na hosted capacity bago ang rollout.

Tinutukoy ng bawat JSON receipt ang na-checkout na SHA, workflow run, at attempt.
Tinatanggihan ng CLI ang hindi pagtutugma ng checkout/event SHA. Iniuugnay ng mga workflow test ang pagiging miyembro ng patakaran
sa listahan ng `needs` ng verdict job upang hindi tahimik na mawala ang isang bago o inalis na lane.
Saklaw ng mga receipt ang sarili nilang workflow, hindi ang publication, deployment, o mga internal
na bahagi ng isang umiiral na advisory scanner. Ang pag-activate sa parehong pangalan ng check sa mga branch rule ay isang
hiwalay na pagbabagong administratibo; hindi awtomatikong napoprotektahan ang isang branch sa pagdaragdag lamang ng mga job na ito.

### Imbentaryo ng static scan

Makikita sa `config/quality/gate-manifest.json` ang may-bersyong imbentaryo ng npm-alias at ang pagiging miyembro ng static-scan.
Patakbuhin ang `npm run check:gate-manifest` upang patunayan
ang mga pangalan ng script at eksaktong command laban sa `package.json`; kapag may idinagdag, inalis, o
nagbago sa command, mabibigo ang lokal na hook at ang mga change-classification job sa CI.
Ang alias ay hindi workflow job, matrix instance, o test case: hindi dapat
ipakita ang mga bilang na ito na para bang mapagpapalit ang mga ito.

Gamitin ang `npm run quality:scan -- --list` o `npm run quality:scan:fast -- --list`
upang suriin ang mga napiling alias nang hindi isinasagawa ang mga ito. Tinatawag ng runner ang
npm entrypoint, kaya napapanatili ang runtime nito (kabilang ang Bun kung saan naka-configure).
Itinatala ng manifest bilang hiwalay na tinatawag ang mga alias na wala sa mga profile na iyon, at
ipinagbabawal ang mga maintenance command sa mga read-only na profile ng scan.

Ang static scan lamang ang saklaw ng mga profile na ito. Hindi nila sinesertipika ang mga product test,
coverage, packaging, external check, o buong pagtanggap sa release ng isang kandidato.
Ginagamit ng workflow admission ang naka-link na `config/quality/admission-policy.json` at
`scripts/quality/admission-verdict.mjs`. Nananatiling hiwalay ang mga release-observer profile;
suriin nang hiwalay ang kanilang mga naaangkop na check at receipt. Ang tekstuwal na
imbentaryo sa ibaba ay sanggunian, hindi patunay na aktuwal na tumakbo ang isang gate.

Matatagpuan ang mga script sa ilalim ng `scripts/check/` (mga policy gate) at `scripts/quality/` (ratchet engine).
Ang pinagmumulan ng katotohanan para sa CI ay `.github/workflows/ci.yml`.

### Mabilis na landas ng release PR (`quality.yml`)

Dinadagdagan ng `.github/workflows/quality.yml` ang CI sa mga main/release PR, push sa protected branch,
dispatch, at merge group. Gumagamit ang mga PR ng mga path-filtered na mabilis na check. Inalis ang permanenteng
naka-disable na dobleng build; nananatili sa CI ang mga tunay na check para sa build/package/boot.

| Job                                              | Saklaw                                                                                                                                                                                                                                     | Humaharang                |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `Docs Gates (fast-path)`                         | Mga docs/code PR; mga sanggunian sa API docs at docs-all                                                                                                                                                                                   | Oo                        |
| `Fast Quality Gates`                             | Mga code PR; mga static check, typecheck, dashboard typecheck, at mga apektadong unit test                                                                                                                                                 | Oo                        |
| `Forgotten sibling tests`                        | Mga code PR; sinusundan ang mga binagong module patungo sa mga static consumer at kandidatong sibling test; iniuulat ang mga barrel at dynamic-import path bilang mga advisory diagnostic, kasama ang mga binanggit na allowlist exception | **Advisory**              |
| `Vitest (fast-path)`                             | Mga code PR; mabilis na vitest suite                                                                                                                                                                                                       | Oo                        |
| `Unit Tests fast-path`                           | Mga code PR; 4-shard na unit suite                                                                                                                                                                                                         | Oo                        |
| `No new ESLint warnings`                         | Mga code PR; suppression-aware na lint guard                                                                                                                                                                                               | Oo, kabilang ang mga fork |
| `Merge integrity (changelog + generated skills)` | Mga hindi draft na PR; pag-sync ng changelog at mga nabuong skill                                                                                                                                                                          | Oo, kabilang ang mga fork |

#### Ulat ng mga nakaligtaang sibling test

Muling ginagamit ng `npm run check:forgotten-sibling-tests` ang import resolver sa likod ng test-impact map.
Para sa bawat binagong production module, nag-uulat ito ng mga deterministikong
`changed module/symbol -> static consumer -> candidate sibling test` chain kapag wala ang kandidatong
test sa diff ng pull request. Pinananatili ang Markdown summary at JSON result bilang
workflow artifact na `forgotten-sibling-tests` para sa pagkakalibrate bago ang anumang blocking rollout.

Ang mga barrel re-export at dynamic import ay para lamang sa mga diagnostic ng resolution; hindi kailanman lumilikha ang mga ito ng
finding na nakakaharang. Ang mga nasuring exception ay nasa
`config/quality/forgotten-sibling-allowlist.json`. Dapat tukuyin ng bawat entry ang consumer at candidate
test, magbigay ng partikular na katwiran, at mag-link sa isang GitHub issue o pull request. Ang mga entry na mali ang pagkakabuo ay
awtomatikong ibinabagsak. Hindi maaaring pigilan ng mga exception ang isang na-delete na candidate test o isang diff na nagdaragdag ng `.skip`/`.todo`;
ang pagpapahina ng assertion at iba pang pagtatakip ay nananatiling saklaw ng hiwalay na nakakaharang na
`check:test-masking` gate.

### Job: `lint`

Tumatakbo sa bawat PR patungong `main`. Hinaharang ang merge kapag nabigo.

| Script (`npm run ...`)            | Bine-validate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Nakakaharang                             |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `check:node-runtime`              | Ang bersyon ng Node.js ay nasa loob ng suportadong saklaw                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Oo                                       |
| `check:cycles`                    | Mga circular import sa buong `src/` + `open-sse/` (nakabatay sa AST, ni-resolve ang `paths` ng tsconfig). Bare = advisory, inililista ang mga cycle. Hinaharang ng `check:cycles:ratchet` (ang pinapatakbo ng CI) kapag lumampas ang bilang sa limitasyong `metrics.cycles` sa `quality-baseline.json` — kasalukuyang 14, `direction: down`, kaya maaari lamang itong bumaba (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo (ratchet)                             |
| `check:route-validation:t06`      | May mga Zod schema sa lahat ng route (patakaran ng Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oo                                       |
| `check:any-budget:t11`            | Ang bilang ng `@ts-expect-error // any` ay hindi lumalampas sa budget (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Oo                                       |
| `check:provider-consistency`      | Ang bawat provider sa `providers.ts` ay may katugmang entry sa `providerRegistry.ts` (at vice-versa, sa loob ng allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Oo                                       |
| `check:model-lifecycle`           | Ang tatlong routing table na mano-manong pinananatili ay nananatiling tugma sa naka-check-in na lifecycle snapshot (#11503): walang retired id na maaaring i-route ng `REGISTRY` ang binibigyan ng score ng `FITNESS_TABLE` (`taskFitness.ts`); ang bawat target ng `BUILT_IN_ALIASES` ay nasa `REGISTRY` at wala sa retired-id snapshot; ang bawat retired id na nasa `REGISTRY` pa rin ay naka-forward o nakalista sa `allowedRetiredInCatalog`; at walang source o target ng `DEFAULT_DEGRADATION_MAP` ang lumilitaw na retired sa snapshot na iyon. Hindi nito pinatutunayan na ang isang modelo ay kasalukuyang sineserbisyuhan ng isang live upstream. Offline — inihahambing sa `config/quality/model-lifecycle.json`, na mano-manong nire-refresh gamit ang `npm run quality:refresh-model-lifecycle` (network; hindi naka-wire sa CI). Ang `allowedRetiredInCatalog` ay isang burn-down ratchet: magdagdag lamang ng entry kung may tracking issue. | Oo                                       |
| `check:fetch-targets`             | Ang bawat `fetch("/api/...")` sa client-side na `src/` ay tumutukoy sa isang tunay na `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Oo                                       |
| `check:deps`                      | Ang lahat ng dependency na maaaring i-`npm install` mula sa bawat `package.json` sa repo ay nasa `dependency-allowlist.json`; mina-flag ang mga bagong package na hindi naka-pin o slopsquatted                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `audit:deps`                      | `npm audit` (root + electron) — walang high/critical na advisory (nag-o-overlap sa osv `check:vuln-ratchet`; tingnan ang Backlog ng Rasyonalisasyon)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oo                                       |
| `check:lockfile`                  | Integridad ng `package-lock.json` — https registry, mga integrity hash, walang host override                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Oo                                       |
| `check:licenses`                  | Allowlist ng lisensyang SPDX para sa mga dependency sa production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `check:tracked-artifacts`         | Walang mga artifact ng build / naka-commit na mga symlink ng `node_modules` (tumatakbo rin sa husky pre-commit; sadyang magaan ang pre-push — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oo                                       |
| `check:ai-attribution`            | Walang trailer na AI/bot `Co-Authored-By` o footer ng pagbuo ng AI sa mga commit, pamagat, o katawan ng PR — Mahigpit na Panuntunan #16 (nasa fast-gates loop ng `quality.yml` para sa PR→`release/**` — binabasa ang event payload, walang ginagawa kapag hindi PR — at isang hakbang na para lamang sa PR sa lint ng `ci.yml` para sa PR→`main`; pati na rin ang husky hook na `commit-msg`; pinapayagan ang mga taong kapwa may-akda; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:vitest-exclusions`         | Ang bawat pagbubukod sa Vitest ay nagbabanggit ng tracking issue at lumilitaw sa `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `check:file-size`                 | Walang source file na lalampas sa limitasyon para sa bawat extension (ratchet: mga naka-freeze na malaking file sa listahang `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oo                                       |
| `check:error-helper`              | Gumagamit ang mga tugon sa error sa mga executor/handler ng `buildErrorBody()` / `sanitizeErrorMessage()` (Mahigpit na Panuntunan #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oo                                       |
| `check:migration-numbering`       | Ang mga Migration SQL file ay sunod-sunod ang pagkakanumero, walang puwang o duplikado                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oo                                       |
| `check:public-creds`              | Walang literal na OAuth `client_id`/`client_secret` o mga Firebase Web key sa labas ng `publicCreds.ts` (Mahigpit na Panuntunan #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oo                                       |
| `check:db-rules`                  | Walang raw SQL sa labas ng mga module ng `src/lib/db/`; walang mga barrel import mula sa `localDb.ts` (Mahihigpit na Panuntunan #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Oo                                       |
| `check:known-symbols`             | Ang mga provider executor, routing strategy, at translator na nakarehistro sa kani-kanilang dispatch table ay tumutugma sa mga file sa disk—walang nakahiwalay o hindi nakadeklarang mga symbol                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Oo                                       |
| `check:route-guard-membership`    | Ang bawat route na lumilikha ng child process ay inuuri ng `isLocalOnlyPath()` (Mahihigpit na Panuntunan #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Oo                                       |
| `check:test-discovery`            | Ang bawat `*.test.ts` / `*.spec.ts` file sa repo ay kinokolekta ng kahit isang test runner (ratchet: maaari lamang umikli ang listahan ng mga nakahiwalay na file sa `test-discovery-baseline.json`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Oo                                       |
| `check:agent-skills-sync`         | Tumutugma ang mga nabuong artifact ng agent-skills sa kanilang source catalog (walang drift)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `check:provider-asset-provenance` | May nakatalang provenance entry ang mga logo/asset ng provider                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `lint:json`                       | Nape-parse ang mga JSON config file at sumusunod ang mga ito sa mga panuntunan sa lint ng repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `typecheck:core`                  | Pag-compile ng TypeScript nang walang mga error (mga advisory warning lamang)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Oo                                       |
| `typecheck:noimplicit:core`       | Mahigpit na `noImplicitAny` — nakatuon sa hinaharap; marami pa ring dati nang call site na nangangailangan ng mga annotation                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **Advisory** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` na limitado sa `src/app/(dashboard)/**` (#7033) — hindi kasama sa piniling 27-file allowlist ng `typecheck:core` ang anumang dashboard TSX, at hindi rin ito kailanman tine-type-check ng `next build` (`next.config.mjs` ay nagtatakda ng `ignoreBuildErrors: true`), kaya hindi nakikita ng CI ang mga regression ng orphaned identifier doon (#6625/#6909). Inihahambing ang mga diff sa isang naka-freeze na baseline ng bilang ayon sa file/TS-code (`config/quality/dashboard-typecheck-baseline.json`, kaparehong pattern ng stale enforcement gaya ng `check:known-symbols`) — mga BAGONG error lamang na lampas sa naka-baseline na bilang ang nagpapabigo sa gate; unti-unting ibaba gamit ang `--update` kapag naayos ang dati nang error.                                                                                                                                                                                                  | Oo                                       |

### Job: `quality-gate`

Tumatakbo pagkatapos ng `test-coverage`. Hinaharangan ang merge kapag nabigo.

| Script                       | Bineberipika                                                                                                                                                                                                                     | Humaharang             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `quality:collect`            | Gumagawa ng `quality-metrics.json` (bilang ng babala ng ESLint, coverage mula sa pinagsamang ulat ng shard)                                                                                                                      | Oo (nauuna sa ratchet) |
| `quality:ratchet`            | Hindi bumaba ang bawat metric sa `quality-baseline.json` (mga babala ng ESLint ≤ baseline; coverage ≥ baseline)                                                                                                                  | Oo                     |
| `check:duplication`          | Hindi lumalampas ang pagdodoble ng code (jscpd@4) sa baseline sa `quality-baseline.json`                                                                                                                                         | Oo                     |
| `check:complexity`           | Hindi lumalampas sa limitasyon ang cyclomatic complexity sa antas ng file (pangunahing ESLint `complexity` + `max-lines-per-function`)                                                                                           | Oo                     |
| `check:cognitive-complexity` | Ratchet ng cognitive complexity (`eslint-plugin-sonarjs`) — hiwalay na pagpapatakbo ng ESLint; parehong pinapatakbo ng CI nang pinagsama bilang iisang hakbang na `check:complexity-ratchets`                                    | Oo                     |
| `check:dead-code`            | Hindi bumaba kumpara sa baseline ang ratchet ng mga hindi ginagamit na export / file (knip)                                                                                                                                      | Oo                     |
| `check:compression-budget`   | Badyet para sa benchmark ng compression — hindi dapat bumaba ang pinakamababang token savings ng bawat engine                                                                                                                    | Oo                     |
| `check:type-coverage`        | Hindi bumaba ang ratchet ng porsiyento ng may type (`type-coverage`); karaniwang sinasaklaw nito ang `typecheck:noimplicit:core`                                                                                                 | Oo                     |
| `check:codeql-ratchet`       | Hindi dumami ang mga bukas na alerto ng CodeQL (binabasa sa pamamagitan ng `gh api`; maayos na nilalaktawan kapag walang token) — para sa dalas ng pag-refresh at manu-manong pag-trigger: tingnan ang "CodeQL ratchet" sa ibaba | Oo                     |

### Trabaho: `quality-extended`

Ang buong trabaho ay nagbibigay-payo lamang (`continue-on-error: true`). Aktuwal na
tumatakbo ang mga ratchet na nakabatay sa npm; nag-i-install ang mga panlabas na scanner
sa pamamagitan ng `gh release download` at kusang lumalaktaw (exit 0) kapag wala pa rin
ang binary.

| Script                   | Bineberipika                                                                                                                                                                                                                                      | Humaharang                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `check:circular-deps`    | Walang mga paikot na dependency (dpdm)                                                                                                                                                                                                            | **Nagbibigay-payo**                                                 |
| `check:bundle-size`      | Hindi lumalampas sa limitasyon ang laki ng bundle                                                                                                                                                                                                 | **Nagbibigay-payo**                                                 |
| `check:secrets`          | Pag-scan ng mga lihim (gitleaks) — nilalaktawan kung wala ang binary                                                                                                                                                                              | **Nagbibigay-payo**                                                 |
| `check:vuln-ratchet`     | Hindi dumami ang mga kahinaan sa dependency (osv-scanner) — nilalaktawan kung wala ang binary                                                                                                                                                     | **Nagbibigay-payo**                                                 |
| `check:workflows`        | Pag-lint ng workflow (actionlint + zizmor); ang mga nawawala/sirang scanner, di-wastong ulat, o nawawalang ratchet baseline ay nabibigo bilang INCOMPLETE. Ang mga wastong natuklasan ay sumusunod sa napiling patakarang strict/advisory/ratchet | Kinakailangan ang pagpapatupad; humaharang sa CI ang zizmor ratchet |
| `check:openapi-breaking` | Mga breaking change sa pampublikong kontrata ng API (`openapi.yaml`) kumpara sa base branch (oasdiff) — gumagawa ng `openapiBreaking=N`; nilalaktawan kung wala ang oasdiff o hindi malutas ang base spec                                         | **Nagbibigay-payo**                                                 |

### Trabaho: `docs-sync-strict`

Tumatakbo sa bawat PR patungo sa `main`. Hinaharang ang pag-merge kapag nabigo.

| Script                         | Bineberipika                                                                                                                                                                                 | Humahadlang                             |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:docs-all`               | Meta-gate na sunud-sunod na nagpapatakbo sa 6 na sub-gate sa ibaba                                                                                                                           | Oo                                      |
| ↳ `check:docs-sync`            | Pagkakatugma ng bersyon ng CHANGELOG / OpenAPI / llm.txt                                                                                                                                     | Oo                                      |
| ↳ `check:docs-counts`          | Ang mga bilang sa teksto (bilang ng provider, bilang ng migration, atbp.) ay nasa loob ng ratchet window ng mga aktuwal na bilang                                                            | Oo                                      |
| ↳ `check:env-doc-sync`         | Nakadokumento sa isang talahanayan ng docs ang bawat env var sa `.env.example`, at gayundin sa kabilang direksyon                                                                            | Oo                                      |
| ↳ `check:deprecated-versions`  | Walang mga string ng hindi na suportadong bersyon sa docs                                                                                                                                    | Oo                                      |
| ↳ `check:doc-links`            | Ang mga internal na markdown link sa docs ay tumutukoy sa mga aktuwal na file (`[text]`/`(path)` na anyo)                                                                                    | Oo                                      |
| ↳ `check:fabricated-docs`      | Umiiral sa codebase ang mga route, env var, CLI command, pangalan ng hook, at path ng file na binanggit sa docs. Mahigpit na gate sa pamamagitan ng `--strict`; soft-fail kapag walang flag. | Oo (sa pamamagitan ng `--strict` sa CI) |
| `check:cli-i18n`               | Makikita ang mga string ng CLI command sa lahat ng i18n locale file                                                                                                                          | Oo                                      |
| `check:openapi-coverage`       | Saklaw ng OpenAPI spec ang hindi bababa sa ratcheted floor ng mga aktuwal na route                                                                                                           | Oo                                      |
| `check:openapi-security-tiers` | Ang mga anotasyon ng security tier sa `openapi.yaml` ay naaayon sa mga klasipikasyon ng `routeGuard.ts`                                                                                      | **Payo lamang**                         |
| `check:openapi-routes`         | Ang bawat path sa `openapi.yaml` ay tumutukoy sa isang aktuwal na `route.ts` (kontra-halusinasyon)                                                                                           | Oo                                      |
| `check:docs-symbols`           | Ang bawat sangguniang `/api/...` sa `docs/**/*.md` ay tumutukoy sa isang aktuwal na `route.ts` (kontra-halusinasyon)                                                                         | Oo                                      |
| `i18n translation drift`       | Mga hindi naisaling key sa mga i18n locale file — babala lamang                                                                                                                              | **Payo lamang**                         |

### Job: `i18n-ui-coverage`

| Script                            | Bineberipika                                                                                                                                                                                                              | Humahadlang     |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check-ui-keys-coverage` (inline) | Ang saklaw ng UI i18n key ay ≥ 65%                                                                                                                                                                                        | Oo              |
| `check-ui-value-drift` (inline)   | Kapag muling isinulat ang isang English na **value**, walang naiiwang lipas na salin                                                                                                                                      | Oo              |
| `check-new-key-coverage` (inline) | Ang isang **bagong** English key ay naisalin sa bawat locale — tinatanggihan ang marker na `__MISSING__:`                                                                                                                 | Oo              |
| `check-translation-ratio`         | Ang ratio ng aktuwal na salin sa bawat locale (mga value na kapareho ng English / placeholder / nawawalang leaf sa labas ng allowlist) ay hindi dapat lumampas sa `config/quality/i18n-translation-baseline.json` + slack | **Payo lamang** |

Kailangan ng `fetch-depth: 0` — dini-diff ng value-drift gate ang `en.json` laban sa merge base.

#### `check-ui-value-drift` — gate para sa lipas na salin

Nahuhuli nito ang isang i18n regression na hindi nakikita ng iba pang gate sa estruktural na paraan: muling
isinulat ang isang English na value at naiwan ang mga saling hinango sa _nakaraang_ English, kaya
patuloy na nagbabasa ang mga hindi English na user ng tekstong may kumpiyansang pananalita ngunit mali na ngayon.

Talagang nailabas ito. Muling isinulat ang `oauthModal.googleOAuthWarning` nang idagdag ang Antigravity
login helper (#5203); **39 sa 43 locale** ang nanatiling may tekstong nagsasabi sa mga operator na "kopyahin ang
buong URL at i-paste ito sa ibaba" — isang flow na hindi makukumpleto para sa provider na iyon. Hindi ito
napansin hanggang #8463 dahil:

- Nagba-backfill lamang ang `sync-ui-keys` ng mga key na **wala**, hindi kailanman ng mga **lipas**;
- Binibilang ng `check-ui-keys-coverage` ang _pagkakaroon_ ng key, kaya itinuturing na sakop ang isang lipas na salin;
- Sinusubaybayan ng `check-translation-drift` ang mga mirror ng dokumentasyong `docs/i18n/<locale>/**.md` —
  hindi nito kailanman binabasa ang `src/i18n/messages/*.json`. Humahadlang sa job na `docs-sync-strict` mula noong
  2026-09 na muling pag-sync: mag-edit ng pangunahing doc → `npm run i18n:run -- --files=<doc>` (antas-seksyon, mabilis).

**Nakabatay sa diff, hindi sa baseline.** Inihahambing nito ang `en.json` sa merge base laban sa
working tree; para sa bawat key na nagbago ang English na value, stale ang anumang locale na mayroon
pa ring hindi nabagong salin. Sadya nitong **pinananatili ang dati nang utang** — hindi maipapakita ng diff
kung sa aling lumang English nagmula ang isang matagal nang salin, kaya ang gate ay humahatol
lamang sa mga naaapektuhan ng kasalukuyang pagbabago. Ang alternatibo (isang per-key hash baseline) ay mangangailangan
ng ~600 KB na generated file, 3× ng pinakamalaking kasalukuyang baseline, na magbabago sa bawat i18n PR.

Dalawang paraan upang matugunan ito:

1. i-update ang mga apektadong salin, o
2. itakda ang mga ito sa `__MISSING__:<new english>` — pagkatapos ay ihahatid ng runtime ang itinamang English
   (`src/i18n/request.ts::deepMergeFallback`, #7258) at ilalagay sa pila ang key para sa pagsasalin.

Kung nagbago ang **kahulugan** ng string, mas mainam na **palitan ang pangalan ng key**: hindi maaaring magmana
ng stale na salin ang isang bagong key. Iyon ang pattern na ginamit ng #8463.

```bash
npm run i18n:check-value-drift          # mahigpit (ito ang pinapatakbo ng CI)
npm run i18n:check-value-drift:warn     # ulat lamang
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Nag-e-exit nang 0 na may `SKIP reason=base-unresolved` kapag hindi mabasa ang base catalog (shallow
clone na walang base ref), katulad ng `check-openapi-breaking`.

### Job: `i18n`

Kumpletong i18n validation matrix (isang job bawat locale). Advisory ang buong job.

| Script                          | Bine-validate                       | Pag-block                                             |
| ------------------------------- | ----------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | Pagkakumpleto ng salin bawat locale | **Advisory** (`continue-on-error: true` sa buong job) |

### Job: `pr-test-policy`

Tumatakbo lamang sa mga pull request.

| Script                 | Bine-validate                                                                                                                                                                                  | Pag-block |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | Ang mga PR na nagbabago ng production code sa `src/`, `open-sse/`, `electron/`, o `bin/` ay dapat magsama o mag-update ng mga test (Mahigpit na Panuntunan #8)                                 | Oo        |
| `check:test-masking`   | Hindi binabawasan ng mga binagong test file ang net assert count o nagdaragdag ng mga tautology na `assert.ok(true)`                                                                           | Oo        |
| `check:pr-evidence`    | Nagbabanggit ang PR body ng test/VPS evidence para sa pagbabago (ginagawang mekanikal ang Mahigpit na Panuntunan #18 sa pamamagitan ng pag-grep sa prose ng PR — marupok, tingnan ang Backlog) | Oo        |

### Job: `test-vitest`

Tumatakbo pagkatapos ng `build`. Hinaharangan ang merge kapag nabigo.

| Suite            | Bine-validate                                           | Pag-block                                                                                                                              |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (110 tool), autoCombo, cache — vitest runner | Oo                                                                                                                                     |
| `test:vitest:ui` | Mga UI component test — vitest runner                   | **Nagba-block** — tahasang hindi isinasama sa `vitest.config.ts` ang mga dati nang failure; pinababagsak ng mga bagong failure ang job |

### Mga nightly workflow (naka-iskedyul, advisory)

Tumatakbo ang mga ito ayon sa cron schedule (at `workflow_dispatch`), hindi kailanman sa mga PR. Advisory ang lahat.

| Workflow               | Bine-validate                                                                                                                                                                    | Pag-block    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | Mga fast-check property test na may random seed + mataas na run count                                                                                                            | **Advisory** |
| `nightly-resilience`   | heap-growth gate, chaos fault-injection, k6 load/soak                                                                                                                            | **Advisory** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + mga garak probe (nilalaktawan kapag walang provider secret)                                                                             | **Advisory** |
| `nightly-schemathesis` | OpenAPI contract fuzzing (schemathesis) laban sa live na OmniRoute gamit ang `docs/openapi.yaml` — inilalantad ang mga paglabag sa spec / mga hindi nahawakang 500 (Yugto 8 B.4) | **Advisory** |
| `nightly-mutation`     | Stryker mutation-testing score sa mabilis na unit lane — inilalantad ng mga nakaligtas na mutant ang mahihinang assert                                                           | **Advisory** |
| `nightly-compat`       | Node engine compatibility matrix sa lahat ng sinusuportahang range ng `engines.node`                                                                                             | **Advisory** |

---

## Yugto ng velocity (2026-08-30 → v4.0 LTS): niluwagan ng 20% ang bawat baseline

Desisyon ng may-ari (2026-08-30): hanggang sa modularization ng v4.0, mas mahalaga ang bilis ng
pag-release kaysa sa pagpigil sa paglaki ng debt. Niluwagan ng 20% ang bawat **numeric** na
ratchet baseline sa iisang nasusuring pass, at idineklara ang yugto sa `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Ano ang nagbago                                                                                                                                                                                                                                            | Saan                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `metrics.*.value` — mga bilang na mas mababa ang mas mahusay ×1.2, mga porsiyentong mas mataas ang mas mahusay ÷1.2 (pinanatili sa 60 ang coverage floor, nananatiling 0 ang `eslintErrors`, `eslintWarnings` 0 → 20% ng naka-freeze na suppression count) | `quality-baseline.json` (inililista ng tala na `_relax_velocity_2026_08_30` ang bawat bago → pagkatapos) |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                           | `complexity-baseline.json`, `duplication-baseline.json`                                                  |
| `cap`, `testCap`, bawat line cap na `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                     | `file-size-baseline.json`                                                                                |
| mga bilang kada file / kada TS code ×1.2                                                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json`   |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                        | `scripts/check/check-openapi-coverage.mjs`                                                               |
| nagiging advisory ang `--require-tighten` habang `_policy.requireTighten === false`                                                                                                                                                                        | `scripts/quality/check-quality-ratchet.mjs`                                                              |
| pansamantalang ititigil ang nightly na `bank-ratchet-shrinks` (ibabanko nito ang nasukat na pagliit at aalisin ang headroom)                                                                                                                               | `.github/workflows/nightly-release-green.yml`                                                            |

Ang mga allowlist (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) ay **hindi** mga budget at hindi ginalaw. Hindi nagbago ang mga pass/fail policy gate (mga secret, panuntunan sa SQL,
kontrata ng docs/env, parity ng i18n, mga unit test) — ang bagsak na test ay bagsak pa rin.

**Tooling**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ang
  isang-beses na relaxation (`scripts/quality/relax-baselines.mjs`); tatanggi itong tumakbo nang dalawang beses gamit ang
  parehong tala.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  sinusukat ang bawat numerikong pagsusuri sa kalidad sa paraang ginagawa ng CI at ipinapakita ang natitirang puwang bago ang limitasyon nito
  (`scripts/quality/baseline-headroom.mjs`). Inilalathala ng gabi-gabing `baseline-headroom` na gawain ang talahanayan
  sa buod ng pagpapatakbo ng workflow at ina-upload ang ulat na JSON/Markdown bilang
  `baseline-headroom-<run_id>`, na itinatago nang 90 araw. Tinutukoy ng mga hanay na babala at kritikal
  ang mga pagsusuring may 10% o mas kaunting puwang bago ang limitasyon, o lumampas na rito.
  Suriin ang mga ulat na ito bilang maagang babala sa pagkaubos ng mga nakalaang badyet; tingnan ang mga tala na
  `_rebaseline_*` ng kaukulang pagsusuri. Hindi na lumilikha o nag-a-update ang gawain ng permanenteng issue;
  pinananatili ng #12149 ang kasaysayan ng mga naunang ulat.

**New-code mode (Clean-as-You-Code) — mula 2026-08-30, para lamang sa mabilis na landas ng PR**

Sa mga event na `pull_request`, ipinapasa ng `quality.yml` ang `--base-ref <PR base SHA>` sa `check:file-size`,
`check:complexity-ratchets` at `check:dead-code`. Sa mode na iyon, inihahambing ng gate ang HEAD sa
merge-base na **nakalaan lamang sa mga file na binago ng PR** (`scripts/check/newCodeMode.mjs`: ang
merge-base ay inilalagay sa isang pansamantalang `git worktree`, pinapatakbo roon at sa HEAD ang ESLint/knip, at
kinukuha ang diff ng mga bilang kada file):

- **blocking** — nagdagdag ang PR ng mga cyclomatic/cognitive violation o dead export sa mga file na binago nito
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` sa log);
- **advisory** — ang kabuuang global kumpara sa naka-freeze na baseline. Ang minanang drift ay hindi kailanman
  magpapabagsak sa isang walang-kasalanang PR; muling ifi-freeze ang drift sa release reconciliation at babantayan ng headroom job.

Walang PR base ang mga pagpapatakbo ng `workflow_dispatch`, ang release-green sweep, at ang nightly headroom job,
kaya pinananatili ng mga ito ang absolute (global) na paghahambing. Nananatiling global sa ngayon ang coverage,
duplication, at type-coverage (hindi madaling makagawa ng per-file diff ang kanilang mga tool) — mga kandidato
ang mga ito para sa parehong paraan.

**Pagsasara ng yugto sa v4.0 (LTS = mas mahigpit kaysa dati, hindi "pagbalik sa normal")**

1. Sa mismong tip ng `release/v4.0.0`: patakbuhin ang `npm run quality:headroom --json` para sa rekord, pagkatapos ay
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, at ang
   `--update` ng bawat typecheck gate — ibababa ang bawat baseline sa nasukat na halaga.
2. Tanggalin ang `_policy` mula sa `quality-baseline.json` (muling pinapagana ang `--require-tighten` at ang gabi-gabing
   pagbabangko), at ibalik ang `THRESHOLD = 36` (o mas mataas) sa `check-openapi-coverage.mjs`.
3. Higpitan nang lampas sa nasukat kung saan naging kapaki-pakinabang ang modularisasyon: ibalik sa 1000
   (o 800) ang file-size `cap`, dagdagan ng 5 ang mga minimum na coverage, at gawing 0 ang mga dead export para sa mga na-modularize na package.

## Ratchet Baseline (`quality-baseline.json`)

Binabasa ng ratchet engine (`scripts/quality/check-quality-ratchet.mjs`) ang `quality-baseline.json`
at inihahambing ito sa bagong nakolektang `quality-metrics.json`. Anumang metric na lumala
nang lampas sa epsilon nito ay magpapabagsak sa build.

Mga kasalukuyang sinusubaybayang metric:

| Metric                | Direksyon | Kahulugan                                   |
| --------------------- | --------- | ------------------------------------------- |
| `eslintWarnings`      | `down`    | Hindi dapat dumami ang mga babala ng ESLint |
| `coverage.statements` | `up`      | Hindi dapat bumaba ang statement coverage   |
| `coverage.lines`      | `up`      | Hindi dapat bumaba ang line coverage        |
| `coverage.functions`  | `up`      | Hindi dapat bumaba ang function coverage    |
| `coverage.branches`   | `up`      | Hindi dapat bumaba ang branch coverage      |

Upang i-update ang baseline pagkatapos ng tunay na pagpapabuti:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Isinusulat ng `--update` flag ang kasalukuyang mga nasukat na value sa `quality-baseline.json`.
I-commit ang file na ito kasama ng pagbabagong nagpahusay sa metric. Ang isang PR na nagpapahusay
sa isang metric nang hindi ina-update ang baseline ay matutukoy ng `--require-tighten` (Yugto 6A.5,
nakabinbin ang implementasyon).

### CodeQL ratchet: dalas ng pag-refresh at manual na pag-trigger

Binabasa ng `check:codeql-ratchet` ang **estado ng repo, na nire-refresh ayon sa iskedyul — hindi sa bawat PR.**
Iniuulat ng `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` ang
`state: configured`, `schedule: weekly`: ang default-setup scan ng GitHub, hindi isang pagsusuri sa bawat push.
Bunga nito: pagkatapos ma-merge ang isang PR na NAG-AAYOS ng mga alert, patuloy na binabasa ng ratchet
ang luma at mas mataas na bilang hanggang sa tumakbo ang susunod na nakaiskedyul na scan — kaya nag-uulat ito
ng regression sa bawat bukas na PR, kabilang ang mga follow-up ng mismong nag-ayos na PR, hanggang makahabol ang scan.

**Manual na pag-refresh**: Muling pinapatakbo ng `gh workflow run codeql.yml --ref release/vX.Y.Z` ang
pagsusuri at muling inilalathala ang mga alert sa loob ng ilang minuto. Basahin muna ang `.github/workflows/codeql.yml`
— ipinapaliwanag ng header nito na `workflow_dispatch`-only ito **dahil sumasalungat ito sa
"default setup" ng GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Ang pagpapanumbalik sa mga trigger na `push`/`pull_request`/
`schedule` ay nangangailangan muna ng **pagkilos ng owner**: Settings → Code security →
CodeQL: Default → Advanced. Huwag magdagdag ng `schedule:` trigger nang hindi ginagawa ang pagbabagong iyon — mga bigong run
lamang ang magiging resulta nito.

**Higpitan ang baseline pagkatapos bumaba ang bilang** — isinusulat ng `node scripts/check/check-codeql-ratchet.mjs
--update` ang bagong nasukat na bilang sa `quality-baseline.json` →
`metrics.codeqlAlerts.value`, upang hindi tahimik na pahintulutan ng ratchet ang regression pabalik
sa lumang pinakamataas na limitasyon. Halimbawang isinagawa (2026-09-02/03): inayos ng PR #12502 ang 7 tunay na alert
(13 → 6 na nasukat na bukas); hinigpitan ng PR #12530 ang naka-freeze na baseline mula 11 → 6 upang tumugma; ang
natitirang 6 ay pagkatapos ay na-dismiss na may hiwalay na katwiran para sa bawat alert hanggang maging 0 ang bukas.

**Ang mga dismissal ay pagpapasya ng operator (Mahigpit na Panuntunan #14)** — huwag kailanman mag-dismiss ng CodeQL alert
nang hindi itinatala ang teknikal na katwiran sa dismissal comment: `won't fix` para sa
isang kinakailangan ng upstream protocol, `used in tests` para sa isang test fixture, `false positive`
para sa isang sanitizer na hindi nakikita ng CodeQL (naunang halimbawa: `docs/security/ERROR_SANITIZATION.md`).

---

## Patakaran sa Muling Pagsubok (WS5.4, v3.8.49)

Ang muling pagsubok ay para sa bawat runner, at hindi kailanman pangkalahatang patakaran — ang pangkalahatang muling pagsubok ay ginagawang
mga hindi nakikitang flake ang mga tunay na regression:

| Runner           | Patakaran                                                                                                                                                            | Bakit                                                                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` sa CI lamang, na may `trace: on-first-retry`                                                                                                            | Talagang hindi deterministiko ang timing ng browser/network; ginagawang masusuring artifact ng isang muling pagsubok na may trace ang isang flake |
| Vitest           | WALANG pangkalahatang muling pagsubok. Ang isang napatunayang flaky na test ay nakakakuha ng tahasang per-test na muling pagsubok (nakikita sa diff, sinusuri sa PR) | Pinananatiling nasa repo at hindi malabo ang listahan ng quarantine                                                                               |
| node:test (unit) | WALANG muling pagsubok, kailanman                                                                                                                                    | Ang flaky na unit test ay bug sa test — ayusin ito, huwag itong muling ipatakbo nang umaasa sa ibang resulta                                      |

Mga target na SLO kapag nailunsad na ang flake telemetry (WS5.2/5.3): <1% flake rate bawat test
(threshold na "ayusin ngayon"), ≥95% pass rate bawat pipeline. Mga pamantayang halaga mula sa industriya —
muling i-calibrate batay sa sarili nating mga sukat.

## Paglihis ng Ratchet sa Antas ng Release (WS5.5, v3.8.49)

Kapag nag-regress ang isang ratchet (laki ng file, complexity, mga babala ng eslint) sa PURONG release
tip — ibig sabihin, ang KOMBINASYON ng mga merge ang nagdulot ng regression, at walang iisang PR na nakakagawa
muli ng regression sa sarili nitong branch — ang pag-aayos ay responsibilidad ng **release captain, nang isang beses, sa
release branch**: unahin ang extraction/refactor; mag-rebaseline lamang kapag may nakatalang
justification entry. Huwag kailanman ipasa ang combination drift sa PR ng isang contributor, at huwag kailanman
mag-rebaseline sa bawat PR (itinatago nito ang mga tunay na regression). Tukuyin muna: gawin muli ang
red na resulta laban sa purong tip sa isang probe worktree bago ipalagay na ang iyong PR ang sanhi nito.

## Pagba-bank ng mga Pagliit ng Ratchet — ang pababang direksyon (#8584)

Kalahati lamang ang awtomatiko sa ratchet, at iyon pa ang maling kalahati. Ang **pagtataas** ng cap ay isang
manu-manong pag-edit sa JSON na tumatagal ng sampung segundo at siyang pinakamabilis na paraan upang ma-unblock ang isang red na PR.
Ang **pagpapababa** nito ay nangangailangan na may magpatakbo ng `--update` at mag-commit ng resulta — at hanggang
sa nailunsad ang job na `bank-ratchet-shrinks`, walang workflow na nagpapatakbo nito. Ang nasukat na resulta
(2026-07-25): 18 frozen na file ang nasa o mas mababa na sa 800-line na cap para sa bagong file, kung saan ang pinakamalala
ay nasa 132× (`src/shared/validation/schemas.ts`, 19 na linyang may cap na 2,523); ang
complexity ceiling ay umakyat mula `1794 → 2169` sa humigit-kumulang 37 rebaseline note na may eksaktong isang
pagbaba (−1); at ang "higpitan sa pamamagitan ng `--update` sa susunod na cycle" ay isinulat nang 31 beses at sinunod
nang isang beses. Ang cap na nananatili kahit wala na ang code na naging dahilan nito ay tahimik na ginagawang
growth allowance ang bawat natapos na decomposition para sa susunod na mag-e-edit ng file.

Isinasara ng `nightly-release-green.yml` → job na **`bank-ratchet-shrinks`** ang loop na iyon:

|              |                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------- |
| Tumatakbo sa | `schedule` (3×/araw) + `workflow_dispatch` — sadyang **hindi** sa `push`                                      |
| Sinusukat    | ang pinakamataas na `release/vX.Y.Z`, na may parehong resolution + injection guard gaya ng `release-green`    |
| Isinusulat   | `check:file-size --update` at `check:complexity-ratchets --update` (parehong shrink-only ayon sa pagkakagawa) |
| Bine-verify  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                      |
| Ipinapadala  | isang palaging kasalukuyang PR laban sa release branch — force-updated, hindi kailanman inuulit bilang spam   |

Ginagawa nang batch ang pagba-bank sa halip na sa bawat push dahil wala itong kinakailangan sa latency (katanggap-tanggap
ang shrink na na-bank sa loob ng 8h), samantalang paulit-ulit na ire-rebuild ng per-merge na pagtakbo ang PR branch
sa panahon ng mga merge campaign at babayaran ang buong ESLint walk sa bawat pagkakataon. Nananatili sa
push (`release-green`) ang detection; ang pagba-bank lamang ang ginagawa nang batch.

### Ang safety verifier

Sumusulat ang job sa mga baseline nang hindi binabantayan, kaya ang `verify-ratchet-bank.mjs` ang dahilan kung bakit
katanggap-tanggap iyon. Dini-diff nito ang tree pagkatapos ng `--update` laban sa `HEAD` at **ina-abort ang job
bago magkaroon ng anumang commit** — nang hindi nagbubukas ng PR — maliban kung ang bawat pagbabago ay isa sa mga sumusunod:

- isang numeric na entry na `frozen` / `testFrozen` na **ibinaba** o **inalis**
- `complexity-baseline.json` → `count` na **ibinaba**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` na **ibinaba**

Nabibigo ang anumang iba pa: pagtataas ng numero, pagdaragdag ng entry, pagbabago sa `cap`/`testCap`, o
pag-delete/pagsulat muli ng `_rebaseline_*` note (ang mga note na iyon ang audit trail kung bakit umiiral ang bawat
ceiling at nakaimbak sa loob ng parehong `frozen` object gaya ng mga entry ng file).
Ang bot na makapagtataas ng cap ay magiging mas masama kaysa sa status quo. Regression
guard: `tests/unit/verify-ratchet-bank.test.ts`.

Hindi kailanman nagpu-push ang job sa `release/*` — isang tao ang nagme-merge ng PR, kaya hindi
maaaring mailunsad nang hindi nasusuri ang maling sukat.

## Patakaran sa Allowlist

Ang bawat gate na hindi maaaring mabigo dahil sa mga dati nang paglabag ay gumagamit ng isang nakapirming allowlist
(hal., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Ang patakaran ay:

**Ayusin ang ugat ng problema; gamitin lamang ang allowlist kapag dati nang umiiral ang paglabag at
hindi ito maaayos sa parehong PR.**

Kapag nagdaragdag ng entry sa isang allowlist:

1. Magsama ng komento na nagpapaliwanag ng dahilan.
2. Tukuyin ang tracking issue (hal., `// #3498 — Feature ng Phase 2, hindi pa naipapatupad`).
3. Alisin ang entry sa parehong PR na nag-aayos sa paglabag — ang stale na entry na hindi na
   pumipigil sa isang aktibong paglabag ay isa ring depekto (ang stale-enforcement ng 6A.3 ay
   magpapabagsak sa gate dahil sa isang naulilang allowlist entry kapag naipatupad na ito).

**Huwag** magdagdag ng mga allowlist entry para lamang mas mabilis pumasa ang mga test. Ang berdeng gate na may lumalaking
allowlist ay nagbibigay ng maling pakiramdam ng kalidad.

### Kapag nabigo ang isang gate sa iyong PR

1. **Basahing mabuti ang output ng gate** — eksakto nitong sinasabi kung aling file o simbolo ang lumabag
   sa panuntunan.
2. **Ayusin ang paglabag** — karamihan sa mga gate ay mga deterministikong pagsusuri sa filesystem na papasa sa sandaling
   tama na ang code.
3. **Kung dati nang umiiral ang paglabag** (ibig sabihin, hindi ikaw ang nagpasok nito ngunit saklaw na ito ngayon
   ng gate): magdagdag ng allowlist entry na may komentong nagpapaliwanag ng dahilan at isang tracking issue.
4. **Kung ratchet ang gate** (coverage, mga babala ng ESLint, duplication, complexity):
   pinalala ng iyong pagbabago ang metric. Ayusin ang pinagbabatayang problema, o (bihira lamang) patakbuhin ang
   `npm run quality:ratchet -- --update` kung sinadya ang pagbabago at katanggap-tanggap ang
   pagbaba ng metric — ngunit idokumento ang dahilan sa paglalarawan ng PR.
5. **Ang mga advisory gate** (`continue-on-error: true`) ay nagbibigay lamang ng impormasyon — hindi nila hinaharangan
   ang merge ngunit lumalabas ang mga ito sa buod ng CI. Ayusin pa rin ang mga ito.

---

## Pagdaragdag ng Bagong Gate

1. Gumawa ng `scripts/check/check-<name>.mjs` (o `.ts`). Ang mga policy gate ay nag-e-exit nang 0/1.
   Ang mga ratchet-style gate ay naglalabas ng metric sa `quality-metrics.json` sa pamamagitan ng `collect-metrics.mjs`.
2. Idagdag ang `"check:<name>": "node scripts/check/check-<name>.mjs"` sa `package.json`.
3. Ikonekta ito sa `.github/workflows/ci.yml` sa ilalim ng naaangkop na job
   (policy → `lint` o `docs-sync-strict`; ratchet → `quality-gate`).
4. Kung mayroon itong allowlist, ilapat ang `reportStaleEntries()` mula sa
   `scripts/check/lib/allowlist.mjs` upang awtomatikong matukoy ang mga stale na entry.
5. Sumulat ng test sa `tests/unit/build/` na sumasaklaw sa detection logic ng gate.
6. I-update ang dokumentong ito (magdagdag ng row sa talahanayan ng nauugnay na job).

---

## Tooling ng agent: LSP-in-the-loop (opt-in)

Bukod sa mga CI gate, kasama sa OmniRoute ang isang **opt-in** na `agent-lsp` scaffold
(isang project-level na `.mcp.json`, Fase 7 Task 15). Gumawa ng `.mcp.json`
upang ilantad ang isang TypeScript language server sa mga coding agent, nang sa gayon ay maresolba nila ang mga simbolo /
diagnostic **bago** magsulat ng code — isang compile-before-claim na katuwang ng
`typecheck:core` na pumipigil sa mga error na "invented symbol" sa pinagmulan pa lamang. Sadyang
hindi ito awtomatikong nilo-load (ikaw ang pipili at magbe-verify ng MCP↔LSP bridge); ang sirang entry ay nagla-log lamang ng
connection error at hindi kailanman nakasisira ng mga session.

---

## Backlog ng Rasyonalisasyon (pagsusuri ng ROI — Fase 9 Onda 3)

Itinugma ang imbentaryong ito sa `ci.yml` noong 2026-06-17 (hindi naisama sa nakaraang bersyon ang
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Natukoy sa pagsusuri ng ROI sa itinugmang hanay
ang mga sumusunod na kandidato para sa rasyonalisasyon. **Ang mga pagsasanib ay mga mekanikal na
pagbabago sa CI; ang mga paglipat/pag-aalis ay mga desisyon sa patakaran na nakalaan para sa operator.** Wala pa
sa mga nasa ibaba ang nailalapat.

**Hindi rin nakadokumento sa itaas** (advisory, mahinang signal): ang `docs-lint` job
(markdownlint + Vale, buong job ay `continue-on-error`) at ang mga nakahiwalay na scanner workflow na
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Nasa
`quality-baseline.json` ang `semgrepFindings: 0` ngunit hindi ito nakakabit sa isang blocking ratchet sa `ci.yml` — ang metric ay
kasalukuyang walang kaugnay na pagpapatupad.

### Pagsasanib / pag-aalis ng duplikasyon (mekanikal, mas mababang panganib)

Bawat kandidato ay pinatunayan laban sa aktuwal na estado ng gate noong 2026-06-17 (magtiwala ngunit magsuri);
lumabas na may nakatagong debt ang ilang "halatang" pagsasanib at ang mga ito ay **hindi** malinis na pamalit.

- **Dalawang beses tumatakbo ang `check:docs-sync`** — nakahiwalay sa `lint` job at muli sa loob ng `check:docs-all` (`docs-sync-strict`) at sa husky pre-commit hook. ✅ **TAPOS NA** — inalis ang nakahiwalay na `lint` invocation.
- **Pag-scan ng CVE** — ❌ **HINDI malinis na pagsasanib.** Agad na nabibigo ang `audit:deps` sa anumang high/critical na CVE; nabibigo lamang ang `check:vuln-ratchet` (osv) kapag may _regression_ kumpara sa baseline (kasalukuyang 1 MODERATE). Magkaiba ang semantics — mawawala ang absolute high/critical gate kapag inalis ang `audit:deps`. Panatilihin ang dalawa.
- **Pagtukoy ng cycle** — ✅ **TAPOS NA** (#15159 G-01/G-02). Tinawag ng lumang teksto rito ang `check:cycles` na "ang green, curated" gate at binigyang-katwiran ang pagpapanatili rito bilang blocking dahil nag-ulat ang `check:circular-deps` (dpdm) ng 91 cycle. Ang pagiging green na iyon ay isang **false green**: nag-scan ang `check:cycles` ng 5 subdirectory (450 file), itinugma lamang ang static na `import|export … from`, at inalis ang bawat `@/` at `@omniroute/open-sse/` specifier, kaya hindi nito makita ang mga dynamic-import + alias cycle na nangingibabaw sa repo. Naayos na: nilalakbay na ngayon ng gate ang `src` + `open-sse` (5023 file), kinokolekta ang mga specifier mula sa TypeScript AST (kaya binibilang ang `import("…")` ngunit hindi ang type-position na `typeof import("…")`), at nire-resolve ang `paths` ng tsconfig. Nakakahanap ito ng **14** na cycle, hindi 0. Dahil hindi maaayos ang 14 na dati nang cycle sa isang gate PR, isa na ngayong **ratchet** ang `check:cycles` (`--ratchet`, ceiling na `metrics.cycles.value = 14` sa `quality-baseline.json`, `direction: down`) — bina-block nito ang anumang _regression_ at maaari lamang bumaba ang bilang. Pinapatakbo ng CI ang `npm run check:cycles:ratchet`. Kasabay ng **A-01** ang burn-down. Nananatiling advisory ang `check:circular-deps` (dpdm) bilang mas malawak na pangalawang opinyon.
- **Complexity** — ✅ **TAPOS NA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): isang ESLint walk, nagbibilang ayon sa ruleId upang manatiling magkahiwalay ang cyclomatic+max-lines at cognitive baseline; nananatili ang indibidwal na `check:complexity` / `check:cognitive-complexity` para sa lokal na `--update`.
- **`/api` anti-hallucination** — ✅ **TAPOS NA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): isang FS inventory ng `src/app/api`, patuloy na magkahiwalay ang pag-uulat ng openapi-routes + docs-symbols; nananatili ang mga indibidwal na check para sa mga lokal na pagpapatakbo.
- **Tumatakbo ang `check:node-runtime` sa 11 job** — ⚠️ **mababang ROI.** Hiwalay na runner ang bawat isa at <1s ang check; kabuuang matitipid ay ~10s, kapalit ng pagkawala ng murang guard sa bawat job. Hindi sulit ang pagbabago.
- **`typecheck:noimplicit:core` sa CI lint** — ✅ **inalis sa lint job** (dating advisory na `continue-on-error`); ang blocking type surface ay `typecheck:core` + `check:type-coverage`. Pinanatili ang lokal na script.

### Ilipat / pagpasiyahan (patakaran ng operator)

- `check:openapi-security-tiers` (advisory) — ❌ **HINDI malinis na maililipat.** Nag-e-exit ito nang 0 ngunit nagbababala na walang `x-loopback-only: true` annotation ang ilang `traffic-inspector` route sa ilalim ng `LOCAL_ONLY_API_PREFIXES`. Kailangang idagdag muna ang mga annotation na iyon sa `openapi.yaml` bago ito ipatupad.
- `typecheck:noimplicit:core` (advisory) — halos saklaw na ng blocking na `check:type-coverage` ratchet. Ilipat sa isang ratchet o alisin ang kalabisan na pangalawang `tsc` pass.
- `test:vitest:ui` (ngayon ay **blocking**) — tahasang ibinukod sa `vitest.config.ts` ang mga dati nang failure gamit ang `// #8618` tracking comment; pinababagsak ng mga bagong failure ang job.
- `check:secrets` (gitleaks, blocking ratchet na naka-freeze sa 3 nakadokumentong false-positive) — i-allowlist ang 3 upang umabot sa 0, o ibaba sa advisory. Nag-o-overlap sa native secret-scanning ng GitHub + `check:public-creds`.
- `check:pr-evidence` (blocking, nagge-grep ng prose sa PR body) — mataas ang panganib ng false-positive; pinahihina ang pagpapatupad ng Hard Rule #18 kapag inalis, kaya isa itong tunay na desisyon sa patakaran.
- `semgrep` (nakahiwalay na advisory) — nag-o-overlap sa CodeQL para sa mga OWASP family; ikabit ang baseline nito sa isang ratchet o alisin.

---

## Kaugnay na Dokumentasyon

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gate para sa pagkakapareho ng key set

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, job na `i18n-ui-coverage`).
Inihahambing nito ang hanay ng mga leaf key ng bawat `src/i18n/messages/<locale>.json` sa `en.json` at nabibigo
kapag may anumang nawawala o ekstrang leaf, anuman ang oras kung kailan idinagdag ang key. Ang mga placeholder na
`__MISSING__:` ay itinuturing na naroroon (ang nilalaman ng mga ito ay saklaw ng ratio gate). Ito ang ganap na katapat
ng dalawang gate na nakabatay sa diff/porsiyento: ipinapatupad ng `check-ui-keys-coverage` ang minimum na 80 % bawat
locale (43 nawawalang key mula sa ~13,000 ay lalabas pa ring 99.7 %) at sinusuri ng `check-new-key-coverage`
ang mga key lamang na idinaragdag ng isang PR sa `en.json`. Binubuo ang isang locale batch mula sa `en.json` sa araw
na ginawa ang branch nito at nagsasalin nang ilang araw habang patuloy na nagdaragdag ng mga key ang base; walang
key na idinaragdag ang batch PR mismo, kaya nanatiling tahimik ang parehong kapatid na gate nang pumasok ang batch 1
(#13044) na kulang ng 43 key sa siyam na locale at ang batch 2 (#13660) na kulang ng 10 key sa walo (2026-09-15).
Ayusin ang pulang status gamit ang
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ang isang `extra` na leaf
ay nangangahulugang inalis ito ng source — tanggalin ito sa locale. Nag-uulat ang `--warn` nang hindi nabibigo.
Pinapatakbo ng `--catalog=cli` ang parehong paghahambing sa `bin/cli/locales` (`npm run i18n:check-keys:cli`);
parehong nasa job na `i18n-ui-coverage` ang mga hakbang.

#### `check-new-key-coverage` — i18n gate para sa bagong key

Kapatid ng `check-ui-value-drift`. Nahuhuli ng huli ang isang English value na **muling isinulat**
habang naiwan ang mga salin nito; nahuhuli naman nito ang isang English key na **idinagdag**
habang hindi ito natanggap ng ilang locale.

Hindi nakikita ng `check-ui-keys-coverage` ang uring ito: ipinapatupad nito ang minimum na porsiyento bawat locale, at
ang labing-isang nawawalang key mula sa ~13,000 ay nag-iiwan sa coverage na 99.9%. Hindi maipapahayag ng isang
porsiyento bawat wika na "inilabas ang feature na ito nang hindi naisalin" — maaaring maidagdag ang isang buong feature
sa isang bagong locale nang walang anumang text at hindi kailanman mabago ang numero.

Ang insidenteng kinakatawan nito: isinalin ng Phase 3 ng Orchestration Canvas ang labing-isang key nito sa
42 locale na umiiral noong panahong iyon. Makalipas ang ilang oras, dinala ng EU-language batch (#13044) ang repo
sa 51 locale, at hindi kailanman natanggap ng siyam na bagong dating (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`)
ang mga iyon. Ipinapalit ng `deepMergeFallback` ang English para sa isang nawawalang key, kaya ang naging anyo ng
pagkabigo ay UI na hindi naisalin sa halip na blangkong UI — tunay, at likas na tahimik.

Tulad ng kapatid nito, **diff-aware** ito, na inihahambing ang English sa merge base laban sa working
tree, kaya nananatiling hindi nagbabago ang mga dati nang puwang at hindi nangailangan ang gate ng migration upang i-on.

**Hindi ito natutugunan ng isang marker na `__MISSING__:<english>` (mula 2026-09-17).** Dati, ito ang
nakadokumentong paraan ng pagpapaliban — bumabalik ang runtime sa tamang English — hanggang sa walong feature PR noong
2026-09-16 ang nagdagdag ng 61 key at naglagay ng marker sa lahat ng 65 locale sa halip na magsalin: tinanggap ng
gate na ito ang bawat isa, walang humarang sa mga PR, at pagkatapos ay nabigo sa release tip para sa lahat ang
naka-block na gate para sa ratio ng tunay na salin (pt-BR 3.2 % > 2.5 % + 0.5). Itinuturing na ngayong nawawalang
salin ang isang marker. Ayusin ang pulang status gamit ang
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, o
ang lahat ng locale nang magkakasabay gamit ang `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ligtas kapag detached, at tumatangging magsimula nang wala ang `OMNIROUTE_TRANSLATION_*` env). Ang isang key na
kailangang manatiling English (isang naka-pin na pangalan ng product/engine/flag) ay dapat ilagay sa
`scripts/i18n/untranslatable-keys.json`, at hindi kailanman sa likod ng marker. Ganap na ipinagbabawal ng `vi` ang
mga marker (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gate para sa mga nakaparadang test

Ang isang file sa listahang `exclude` ng `vitest.config.ts` ay isang test na hindi tumatakbo, at nagmumukha itong
coverage sa sinumang bumabasa sa tree. Animnapu't dalawang file ang naipon sa likod ng komentong
`// #8618 — dati nang pagkabigo; alisin ang exclusion na ito kapag naayos na`. Isinara ang issue #8618 noong
2026-08-11 habang lumaki mula 45 entry hanggang 62 ang listahang sinusubaybayan nito, at minana ng bawat bagong entry
ang isang komentong tumutukoy sa saradong issue. Nang sa wakas ay sinukat ang listahan file bawat file (#13204),
**51 sa 62 ang pumasa laban sa kasalukuyang tree nang walang pagbabago sa source**.

Inaatasan ng gate ang bawat exclusion na tumutukoy sa isang tunay na file na (a) magbanggit ng tracking issue at
(b) lumitaw sa `config/quality/vitest-exclusions.json` kasama ang nasukat na status nito, upang ang pagdaragdag nito ay
maging isang diff na masusuri sa isang nakalaang file sa halip na isa pang linya sa array na may 60 entry. Sadyang
hindi nito muling pinapatakbo ang mga excluded na test — nagkakahalaga iyon ng ~10 minuto at nararapat sa isang
periodic job; itinatala ng inventory kung kailan huling sinukat ang bawat isa.
