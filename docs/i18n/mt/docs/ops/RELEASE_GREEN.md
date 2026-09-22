# Release-Green: keeping the queue and release branch green (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Il-problema li dan isolvi

Il-**full gate** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) jitħaddem **biss fuq il-PR tar-rilaxx** (PR → `main`). Il-PRs immirati lejn
`release/**` jirċievu l-**fast-gates** (`quality.yml`: testijiet affettwati minn TIA + verifika tat-tipi + lint)
u, għal bidliet fil-kodiċi, build tal-produzzjoni **konsultattiv**. Konsegwenza: fallimenti li jidhru biss waqt ir-rilaxx xorta jistgħu
jakkumulaw fis-skiet fuq il-fergħa tar-rilaxx u **jisplodu f’saffi ta’ ~40 minuta** fil-ħin tar-rilaxx,
wieħed wieħed.

Il-"familja release-green" teżisti biex **tantiċipa** dawk il-fallimenti — tivvalida l-ekwivalenti tal-full
gate **lokalment / barra mir-rilaxx**, fi kwalunkwe ħin, sabiex il-PR tar-rilaxx ikun diġà
aħdar mal-ewwel eżekuzzjoni tiegħu fis-CI.

> **Prinċipju mhux negozjabbli:** xejn minn dan ma jimblokka lill-kontributur. Ma nżidux verifika obbligatorja
> li tfalli l-PR tiegħu. Id-**drift** (ratchets) huwa għall-manutenzjonist biex jerġa’ jistabbilixxi l-linja bażi waqt ir-rilaxx —
> qatt ma huwa tħassib tal-kontributur. L-ebda parti ma **tagħlaq** PR (serq tal-kreditu) u lanqas
> **iddgħajjef** test biex jgħaddi.

## Il-familja (4 partijiet) — u kif kull waħda taħdem b’mod indipendenti

| Parti                                                                        | X’inhi                                                                               | Meta titħaddem                                                                      | Ambitu                              |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------- |
| **`/green-prs`** (Soluzzjoni A)                                              | Skennjar fuq talba mill-manutenzjonist tal-**kju ta’ PRs miftuħa**                   | **B’mod indipendenti, perjodikament** — u speċjalment **qabel** `/generate-release` | Il-kju kollu tal-PRs → `release/**` |
| **`/validate-release-green`** (Soluzzjoni C — `npm run check:release-green`) | Magna ta’ validazzjoni: tirriproduċi l-full gate fuq fergħa JEW kandidat għall-merge | B’mod indipendenti, fi kwalunkwe ħin                                                | Fergħa speċifika jew PR tal-merge   |
| **`/babysit <PR#>`**                                                         | Imexxi s-**CI live** ta’ PR **wieħed** sakemm isir aħdar                             | B’mod indipendenti, għal kull PR                                                    | PR wieħed                           |
| **`nightly-release-green.yml`** (Soluzzjoni D)                               | Workflow awtomatizzat ta’ kull lejl; jiftaħ issue meta jkun hemm falliment HARD      | Awtomatikament (cron)                                                               | Il-fergħa tar-rilaxx attiva         |

**Tweġiba qasira għal "dan huwa biss għar-rilaxxi?":** **le.** `/green-prs` ġie ddisinjat biex
jitħaddem **perjodikament, bejn ir-rilaxxi**. It-tħaddim indipendenti huwa l-użu normali — ir-rilaxx huwa biss
il-mument meta t-tħaddim tiegħu jagħti l-akbar valur.

## Build konsultattiv minn PR għal rilaxx

`quality.yml` issa jinkludi `Build (advisory)` għal PRs tal-kodiċi li mhumiex abbozzi u għall-fergħat tal-kju ta’ Mergify.
Dan jirrifletti r-riċetta tal-build tal-produzzjoni minn `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime`, u `npm run build` b’`OMNIROUTE_USE_TURBOPACK=1`. Intenzjonalment
ma jtellax artifact tal-build għax l-ebda job tal-kwalità sussegwenti ma juża wieħed f’dan il-workflow.
Neħħi `continue-on-error` wara ġimgħa ta’ runs stabbli tal-PR tar-rilaxx sabiex is-sinjal isir
gate obbligatorju minn PR għal rilaxx.

## Soluzzjoni C — `npm run check:release-green` (il-magna)

Tirriproduċi validazzjoni ekwivalenti għal dik tar-rilaxx fuq il-working tree attwali u tikklassifika kull riżultat aħmar:

- **HARD** (typecheck, żbalji tal-lint, unit, vitest, db-rules, public-creds, u
  `package-artifact` fakultattiv) → **difett reali**; `exit 1`. Jissewwa fuq il-fergħa tas-sors (TDD, Regola #18).
- **DRIFT** (**twissijiet** ta’ eslint, cognitive-complexity, file-size) → drift tar-ratchet akkumulat matul
  iċ-ċiklu, **mhux tort tal-kontributur**; jiġi rrappurtat biss u **jingħata baseline ġdid mill-mantenitur waqt
  ir-rilaxx**. Id-drift **qatt** ma jibdel il-kodiċi tal-ħruġ — għalhekk qatt ma jimblokka lil ħadd.

```bash
npm run check:release-green                 # il-fergħa attwali (working tree)
node scripts/quality/validate-release-green.mjs --json   # output strutturat
node scripts/quality/validate-release-green.mjs --quick  # jaqbeż unit+vitest (drift+typecheck+lint biss)
node scripts/quality/validate-release-green.mjs --with-build  # jinkludi package-artifact (bil-mod)
```

Jiddijanjostika u **jirrapporta** biss (mingħajr tiswija awtomatika). L-orkestrazzjoni biex kollox isir aħdar tinsab f’
`/green-prs` u `/review-prs`.

## Soluzzjoni A — `/green-prs` (l-iskennjar tal-kju)

Proċedura (sommarju — ara l-ħila `green-prs` għad-dettalji):

1. **Agħmel inventarju** tal-kju ta’ PRs miftuħa mqabbla mal-fergħa attiva tar-rilaxx.
2. **Ikklassifika** kull PR (vijabbli / jistħoqqlu ċaħda / jeħtieġ l-awtur) — dawk li jistħoqqilhom ċaħda jew jeħtieġu lill-awtur jiġu
   **rrappurtati, mhux magħluqa** (jiddeċiedi l-awtur).
3. Għal kull PR vijabbli, f’**worktree iżolat** (Regola #19), aġġorna l-PR sal-ponta tal-fergħa tar-rilaxx u ħaddem
   `npm run check:release-green`:
   - **HARD** → sewwi **fuq il-fergħa tal-kontributur** permezz ta’ koawtorija (dan jippreserva l-istatus “Merged” tal-awtur),
     u erġa’ ħaddem sakemm jitneħħew ir-riżultati HARD kollha.
   - **DRIFT** → ħallih kif inhu; jingħata baseline ġdid waqt ir-rilaxx.
4. **Irrapporta** tabella PR × (verdett, riżultati HARD ħomor, issewwa?, DRIFT, issa release-green?).

Jista’ **jħejji** l-kju mingħajr ma jagħmel merge; jagħmel merge biss meta jintalab b’mod espliċitu — u qatt ma jagħlaq PR.

## Kadenzja rakkomandata

- Ħaddem **`/green-prs` perjodikament** (eż., kull ġimgħa) u **dejjem qabel
  `/generate-release`**.
- Żomm **`nightly-release-green.yml`** (Soluzzjoni D) bħala sinjal kontinwu: meta jiftaħ issue
  għal riżultat HARD aħmar, ikun wasal iż-żmien għal skennjar.
- Uża **`/validate-release-green`** meta jkun meħtieġ biex tiċċekkja fergħa jew kandidat speċifiku għal merge.
- Uża **`/babysit <PR#>`** meta PR speċifiku jkun jeħtieġ li jitwassal għal stat aħdar fuq is-CI live.

## Relazzjoni mar-rilaxx

- `/generate-release` isejjaħ il-validazzjoni fil-**Fażi 0 (pre-flight)**: jagħti baseline ġdid lid-DRIFT u jsewwi
  l-HARD qabel ma jiftaħ il-PR tar-rilaxx.
- `/review-prs` juża l-gate release-green fil-pass tad-deċiżjoni tal-merge (aħdar qabel il-merge).

L-għan tal-partijiet kollha huwa l-istess: **PR tar-rilaxx aħdar mal-ewwel run tas-CI**, minflok ma noqogħdu
nsegwu riżultati ħomor f’saffi ta’ 40 minuta fil-jum tar-rilaxx.
