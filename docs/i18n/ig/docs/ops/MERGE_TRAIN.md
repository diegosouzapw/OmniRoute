# Merge Queue & Manual Merge-Train Runbook (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Kemgbe v3.8.49 (WS3.2/WS3.4 nke atụmatụ ogo/ọsọ), ụzọ ndabara e si ejikọta
PR ndị a nyochara n'ime `release/vX.Y.Z` bụ **ahịrị njikọta Mergify** (`.mergify.yml`);
**ụgbọ-njikọta aka** e dere n'okpuru bụ ụzọ NDABERE — a na-eji ya n'oge nsogbu,
mgbochi mwepụta, ma ọ bụ ọ bụrụ na atụmatụ Mergify Open Source agbanwe mgbe ọ bụla.

## Ụzọ ndabara: kwụ Mergify

1. Ndị campaign na-enyocha PR ma mee ka ọ bụrụ akwụkwọ ndụ akwụkwọ ndụ, onye nwe ya na-akwadokwa ya site n'ọnụ ụzọ ⭐ tupu njikọta
   (akụkọ ahụ + mkpebi maka ihe ọ bụla — lee `/merge-prs` Nzọụkwụ 0.75).
2. Onye nwe ya (ma ọ bụ session na-eme ihe dabere na mkpebi onye nwe ya) na-etinye akara **`queue`**.
   Akara ahụ BỤ nkwado njikọta; Mergify na-emezu naanị ya.
3. Mergify na-enyocha PR ndị nọ n'ahịrị **n'otu n'otu** (otu n'otu oge) site na fast-gates
   wee jikọta ha (squash). Ịchịkọta n'ìgwè + nkewa akpaka iji chọpụta nsogbu bụ ọkwa Mergify a na-akwụ ụgwọ
   ("Cannot use Merge Queue batch" na atụmatụ efu, #7220), ya mere `.mergify.yml` anaghị edobe
   `batch_size`; ịchịkọta n'ìgwè ka bụ ọrụ nke manual merge-train dị n'okpuru. A ga-ewepụ PR nke
   nyocha ya ka na-eche mgbe `checks_timeout` gafere (240 min = 2× p95 a tụrụ nke
   `quality.yml`) n'ahịrị kama ikwe ka ọ kwụsị ahịrị ahụ.
4. Mgbe njikọta gasịrị, continuous release-green workflow na-enyocha tip ọhụrụ ahụ mgbe a push
   wee mepee issue attribution ma ọ bụrụ na ngwakọta ahụ laghachiri azụ (ọ dịghị mgbe ọ na-eme auto-revert).

Ihe nchedo (na-egosipụta `CLAUDE.md` Hard Rules #21/#22):

- **Release freeze emeghe** → etinyela akara na PR ndị na-ezube branch a kpọchiri akpọchi; buru ụzọ gbanwee ebumnuche ha gaa na
  `release/vX+1` nke na-arụ ọrụ ugbu a.
- **PR session ọzọ nke ka na-aga n'ihu** → etinyela akara na ya ma ọlị; naanị session nwe ya ga-etinye ọrụ nke ya n'ahịrị.
- Diffs nke naanị tests na PR ndị nwere akara `hotfix` na-agba CI ebelatara (lee
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); ọnọdụ kwụ ahụ na-anabata ụdị checks ọ bụla
  e mere n'ezie (`#check-failure=0` + `#check-pending=0`).

## Ụzọ ndabere: ụgbọ-njikọta aka

A na-eji ya mgbe ahịrị adịghị. Nke a na-eme ka usoro e ji kpochapụ PR 33 n'ime
otu ụbọchị n'oge okirikiri v3.8.47 bụrụ iwu:

1. **Chịkọta batch ahụ** (~PR 10–30 a nyochara+kwadoro). Lelee esemokwu `linked:`
   (otu `tap.testFiles`, otu hunks CHANGELOG) ma hazie ndị ahụ ka ha soro n'usoro.
2. **Nyochaa OTU UGBO**: n'ime worktree dịpụrụ adịpụ sitere na tip mwepụta, jikọta isi batch
   niile na mpaghara, wee gbaa suite kwekọrọ na nke mwepụta
   (`npm run check:release-green`, tinye `--with-build` tupu mwepụta).
   `scripts/release/merge-train.sh <base> <PR#>…` na-eme nzọụkwụ 1–2 na-akpaghị aka (PR ndị
   nwere esemokwu na-apụ, ụgbọ ahụ na-aga n'ihu). Ọnọdụ zuru ezu na-agba `npm run test:unit` — runner
   a haziri maka igwe ahụ (`--test-concurrency=20`), **ọ bụghị** shards CI 4-core abụọ na-agba
   n'otu n'otu, nke mere ka usoro kachasị ukwuu jiri ihe dịka 25% nke igwe 16-core (edoziiri
   2026-07-18). `--fast` (mkpochapụ mega-train n'ime ụbọchị, onye nwe ya kwadoro 2026-07-18)
   na-edobe ọnụ ụzọ static niile + vitest mana na-agba naanị faịlụ node:test ndị PR
   batara gbanwere; suite ZURU EZI ka ga-agba ma ọ dịkarịa ala otu ugboro kwa ụbọchị na
   tip a chịkọtara (otu ụgbọ na-enweghị `--fast`).
3. **Gafere** → jikọta PR ndị ahụ n'usoro (na-enyocha `state,headRefOid` ọzọ tupu nke ọ bụla —
   PR isi ya gbanwere ga-alaghachi na nyocha). Gosipụta na net diff nke njikọta ọ bụla bụ
   mgbanwe nke PR ahụ n'onwe ya (enweghị auto-resolve reverts: nyochaa `git diff --stat` maka
   nhichapụ ndị na-abụghị akụkụ ọrụ ahụ).
4. **Dara** → kewaa batch ahụ ụzọ abụọ (nyochaa ọkara nke ọ bụla) kama imeghachi nyocha
   n'otu n'otu; weghachite PR kpatara nsogbu ahụ n'ahịrị nyocha tinyere ihe akaebe.
5. **Emela ma ọlị**: njikọta n'oge mgbochi n'ime alaka a machibidoro; `git stash` ebe ọ bụla;
   ịgba CI niile ọzọ n'olileanya na ọdịda ga-apụ (iwu: ọdịda bụ ozi).

## Nkewa n'ọkwa (ihe mere ahịrị ahụ ji dị nchebe site naanị na ọnụ ụzọ-ngwa-ngwa)

- **Kwa PR** (quality.yml fast-gates): ule TIA metụtara + unit zuru ezu 4-shard +
  vitest + nchịkọta lint + typecheck + iguzosi ike nke docs/changelog.
- **Kwa batch/tip** (release-green na-aga n'ihu): ọnụ ụzọ siri ike `--quick` na push ọ bụla gaa
  na alaka mwepụta; nyocha zuru ezu `--with-build --full-ci` ugboro 3/ụbọchị.
- **Kwa mwepụta** (ci.yml na PR mwepụta): matrix zuru ezu gụnyere E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Ọ dịghị ihe a na-enyocha obere karịa ka ọ dị na mbụ — naanị na a na-agba akụkụ dị arọ kwa batch/tip
kama kwa PR, nke bụ ihe na-ewepụ njem ugboro O(N).

## Ihe ndị a chọrọ na checkout ọhụrụ maka `merge-train.sh`

Script ahụ na-agba **preflight** nke na-akwụsị ozugbo mgbe e nwere ọdịda na checkout mgbọrọgwụ (tupu ọrụ
worktree ọ bụla) ka nrụnye mebiri emebi ghara iyi ka ụgbọ dara ada:

1. `npm ci`, wee gbaa postinstall `bun` nke npm na-egbochi:
   `(cd node_modules/bun && node install.js)` — ma ọ bụghị ya `check:provider-consistency`
   na `check:known-symbols` (ha abụọ bụ `bun scripts/…`) ga-ada na ụgbọ ahụ NA base n'enweghị
   ahịrị mmebi iwu.
2. Enweghị `node_modules/node_modules` fọdụrụ (osisi dependency oyiri; React na-ebunye ugboro abụọ
   ma suite UI vitest daa ozugbo).
3. `node_modules/.bin/tsc` ga-adị ma nwee ike ịrụ ọrụ (nrụnye ezughị ezu enweghị ya).

Ụgbọ ahụ na-agba `npm run check:cycles:ratchet` nke na-egbochi; `npm run check:cycles`
nkịtị bụ naanị ndụmọdụ (ọ na-edepụta SCC ndị ahụ ma jiri non-zero pụọ ọbụna na base dị mma).
