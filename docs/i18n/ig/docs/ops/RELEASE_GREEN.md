# Release-Green: keeping the queue and release branch green (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Nsogbu nke nke a na-edozi

**Ọnụ ụzọ nyocha zuru ezu** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) na-agba ọsọ **naanị na release PR** (PR → `main`). PR ndị na-ezubere
`release/**` na-enweta **fast-gates** (`quality.yml`: ule TIA metụtara + typecheck + lint)
yana, maka mgbanwe koodu, **advisory** production build. Ihe nke a na-ebute bụ na ọdịda ndị na-apụta naanị n'oge release ka nwere ike
ịgbakọta na nzuzo na release branch ma **gbawaa n'ọkwa dị ihe dịka nkeji 40** n'oge release,
otu n'otu.

Ezinaụlọ "release-green" dị iji **tụlee tupu oge eruo** ọdịda ndị ahụ — nyochaa ihe kwekọrọ na ọnụ ụzọ nyocha zuru ezu
**na mpaghara / n'èzí release**, n'oge ọ bụla, ka release PR wee bụrụrịrị
green na CI run mbụ ya.

> **Ụkpụrụ a na-apụghị ịgbanwe:** ọ dịghị nke ọ bụla n'ime ihe ndị a na-egbochi onye nyere aka. Anyị anaghị agbakwunye
> check a chọrọ nke na-eme ka PR ha daa. **Drift** (ratchets) bụ maka maintainer ka ọ hazigharịa baseline n'oge release —
> ọ bụghị ihe onye nyere aka kwesịrị ichegbu onwe ya banyere ya. Ọ dịghị akụkụ ọ bụla **na-emechi** PR (izu ohi otuto) ma ọ bụ
> **na-eme ka** ule ghara ịdị ike iji mee ka ọ gafee.

## Ezinaụlọ ahụ (akụkụ 4) — na otu akụkụ ọ bụla si agba ọsọ n'onwe ya

| Akụkụ                                                                    | Ihe ọ bụ                                                                                | Mgbe a ga-agba ya                                                           | Oke                                     |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | --------------------------------------- |
| **`/green-prs`** (Ngwọta A)                                              | Nyocha a na-eme mgbe achọrọ site n'aka maintainer nke **ahịrị PR ndị mepere emepe**     | **N'onwe ya, site n'oge ruo n'oge** — ọkachasị **tupu** `/generate-release` | Ahịrị PR niile → `release/**`           |
| **`/validate-release-green`** (Ngwọta C — `npm run check:release-green`) | Injin nyocha: na-emegharị ọnụ ụzọ nyocha zuru ezu megide branch MA Ọ BỤ merge candidate | N'onwe ya, n'oge ọ bụla                                                     | Otu branch akọwapụtara ma ọ bụ merge-PR |
| **`/babysit <PR#>`**                                                     | Na-eduzi **CI dị ndụ** nke **otu** PR ruo mgbe ọ ghọrọ green                            | N'onwe ya, maka PR nke ọ bụla                                               | Otu PR                                  |
| **`nightly-release-green.yml`** (Ngwọta D)                               | Workflow abalị akpaaka; na-emepe issue mgbe e nwere HARD red                            | Akpaaka (cron)                                                              | Release branch na-arụ ọrụ               |

**Azịza dị mkpirikpi nye "nke a ọ bụ naanị maka releases?":** **mba.** E mere `/green-prs` ka ọ
na-agba ọsọ **site n'oge ruo n'oge, n'etiti releases**. Ịgba ya n'onwe ya bụ ojiji nkịtị — release bụ naanị
oge ịgba ya na-eweta uru kachasị ukwuu.

## Nrụpụta ndụmọdụ site na PR ruo na mwepụta

`quality.yml` etinyela `Build (advisory)` ugbu a maka PR koodu ndị na-abụghị draft na alaka kwụ n’ahịrị Mergify.
Ọ na-eṅomi usoro nrụpụta production sitere na `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime`, na `npm run build` tinyere `OMNIROUTE_USE_TURBOPACK=1`. Ọ kpachaara anya
ghara ibugo artifact nrụpụta n’ihi na o nweghị ọrụ quality na-esote nke na-eji ya na workflow a.
Wepụ `continue-on-error` mgbe otu izu nke release-PR na-agba nke ọma gachara, ka mgbaama ahụ ghọọ
ọnụ ụzọ na-egbochi PR ruo na mwepụta ma ọ bụrụ na ọ dara.

## Ngwọta C — `npm run check:release-green` (engine ahụ)

Ọ na-emegharị validation kwekọrọ na nke mwepụta megide working tree dị ugbu a ma kewaa ọdịda ọ bụla:

- **HARD** (typecheck, njehie lint, unit, vitest, db-rules, public-creds, na
  `package-artifact` nke bụ nhọrọ) → **ezigbo ntụpọ**; `exit 1`. A na-edozi ya n’alaka source (TDD, Iwu #18).
- **DRIFT** (**ịdọ aka ná ntị** eslint, cognitive-complexity, file-size) → ntụgharị ratchet gbakọtara n’ime
  okirikiri ahụ, **ọ bụghị mmejọ onye nyere onyinye**; naanị a na-akọ ya, **onye na-elekọta ya na-emegharị baseline
  n’oge mwepụta**. Drift **anaghị** agbanwe exit code — ya mere ọ dịghị mgbe ọ na-egbochi onye ọ bụla.

```bash
npm run check:release-green                 # alaka dị ugbu a (working tree)
node scripts/quality/validate-release-green.mjs --json   # mmepụta ahaziri ahazi
node scripts/quality/validate-release-green.mjs --quick  # na-amafe unit+vitest (naanị drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # gụnyere package-artifact (ọ na-ewe oge)
```

Ọ na-achọpụta nsogbu ma **na-akọ** naanị (enweghị auto-fix). Nhazi fix-to-green dị na
`/green-prs` na `/review-prs`.

## Ngwọta A — `/green-prs` (nyocha kwụ n’ahịrị)

Usoro (nchịkọta — lee nka `green-prs` maka nkọwa zuru ezu):

1. **Depụta** PR ndị mepere emepe nọ n’ahịrị megide alaka mwepụta na-arụ ọrụ.
2. **Nyochaa ma hazie** PR ọ bụla (viable / reject-worthy / needs-author) — ndị reject/needs-author ka
   **a na-akọ, anaghị emechi ha** (onye dere ya na-ekpebi).
3. Maka PR ọ bụla viable, n’ime **worktree dịpụrụ iche** (Iwu #19), weta PR ahụ n’ọnụ release ma mee
   `npm run check:release-green`:
   - **HARD** → dozie ya **n’alaka onye nyere onyinye** site na co-authorship (nke a na-echekwa ọnọdụ "Merged" nke onye dere ya),
     megharịa ya ruo mgbe ewepụchara HARD niile.
   - **DRIFT** → hapụ ya; a ga-emegharị baseline ya n’oge mwepụta.
4. **Kọọ** tebụl PR × (mkpebi, HARD reds, edoziola?, DRIFT, ọ bụ release-green ugbu a?).

Ọ nwere ike **ịkwadebe** ahịrị ahụ n’emeghị merge; ọ na-eme merge naanị mgbe a rịọrọ ya kpọmkwem — ọ dịghịkwa mgbe ọ na-emechi PR.

## Oge a tụrụ aro

- Na-eme **`/green-prs` kwa oge** (dịka ọmụmaatụ, kwa izu) ma mee ya **mgbe niile tupu
  `/generate-release`**.
- Debe **`nightly-release-green.yml`** (Ngwọta D) dịka mgbaama na-aga n’ihu: mgbe ọ mepere
  issue HARD red, oge eruola ime nyocha.
- Jiri **`/validate-release-green`** mgbe mkpa bilitere iji lelee alaka ma ọ bụ onye a kapịrị ọnụ a chọrọ ime merge.
- Jiri **`/babysit <PR#>`** mgbe PR a kapịrị ọnụ chọrọ ka e duzie ya ruo mgbe ọ ghọrọ green na live CI.

## Mmekọrịta ya na mwepụta

- `/generate-release` na-akpọ validation na **Phase 0 (pre-flight)**: ọ na-emegharị baseline nke DRIFT ma na-edozi
  HARD tupu imepe release PR.
- `/review-prs` na-eji ọnụ ụzọ release-green n’oge mkpebi merge (green-before-merge).

Ebumnuche nke akụkụ niile bụ otu: **release PR na-acha green na agba CI mbụ**, kama ịna-agafe
reds n’usoro nkeji 40 n’ụbọchị mwepụta.
