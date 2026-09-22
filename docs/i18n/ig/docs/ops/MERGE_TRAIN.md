# Merge Queue & Manual Merge-Train Runbook (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Kemgbe v3.8.49 (WS3.2/WS3.4 nke atụmatụ quality/velocity), ụzọ ndabara e si etinye
PR ndị enyochara n'ime `release/vX.Y.Z` bụ **ahịrị-ngwakọta Mergify** (`.mergify.yml`);
**ụgbọ-ngwakọta nke aka** akọwara n'okpuru bụ ỤZỌ NDỌGHACHI — a na-eji ya n'oge nsogbu,
mgbochi ntọhapụ, ma ọ bụ ọ bụrụ na atụmatụ Mergify Open Source agbanwee.

## Ụzọ ndabara: ahịrị Mergify

1. Mgbasa ọrụ ndị ahụ enyochala PR ahụ/mee ka ọ bụrụ akwụkwọ ndụ, onye nwe ya wee kwado ya site na mgbochi ⭐ tupu-ngwakọta
   (akụkọ ahụ + mkpebi maka ihe ọ bụla — lee `/merge-prs` Nzọụkwụ 0.75).
2. Onye nwe ya (ma ọ bụ nnọkọ na-eme ihe dabere na mkpebi onye nwe ya) na-etinye akara **`queue`**.
   Akara ahụ BỤ nkwado ngwakọta ahụ; Mergify na-emezu ya naanị.
3. Mergify na-achịkọta ruo PR 10 dị n'ahịrị, na-enyocha nchịkọta ahụ megide fast-gates,
   wee gwakọta ha (squash). A na-**ekewa nchịkọta uhie na-akpaghị aka** — a na-ekewapụ PR
   na-akpata nsogbu n'ime ihe dịka log2(N) nyocha ọzọ, wepụ ya n'ahịrị; ndị ọzọ na-aga n'ihu.
4. Mgbe ngwakọta gasịrị, usoro ọrụ continuous release-green na-enyocha tip ọhụrụ ahụ mgbe a push
   gasịrị ma mepee issue njirimara ma ọ bụrụ na nchikọta ahụ butere nlọghachi azụ (ọ dịghị mgbe ọ na-eme auto-revert).

Ihe nchebe (na-egosipụta `CLAUDE.md` Iwu Siri Ike #21/#22):

- **Mgbochi ntọhapụ emeghewo** → etinyela akara na PR ndị na-ezube alaka ahụ a kpọchiri; buru ụzọ
  gbanwee ebe ha na-ezube gaa na `release/vX+1` na-arụ ọrụ.
- **PR nke nnọkọ ọzọ ka na-arụ ọrụ** → etinyela akara na ya mgbe ọ bụla; naanị nnọkọ nwe ya
  na-etinye ọrụ nke ya n'ahịrị.
- Diffs nke ule naanị na PR nwere akara `hotfix` na-eme reduced CI ugbua (lee
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); ọnọdụ ahịrị ahụ na-anabata check set ọ bụla
  emere n'ezie (`#check-failure=0` + `#check-pending=0`).

## Ụzọ ndọghachi: ụgbọ-ngwakọta nke aka

A na-eji ya mgbe ahịrị ahụ adịghị. Nke a na-edobe usoro e ji mezue PR 33 n'ime
otu ụbọchị n'oge okirikiri v3.8.47:

1. **Kpọkọta nchịkọta ahụ** (~10–30 PR ndị enyochara+kwadoro). Lelee ndakọrịta `linked:`
   (otu `tap.testFiles`, otu hunks CHANGELOG) ma hazie ndị ahụ ka ha na-aga otu otu.
2. **Nyochaa OTU UGBO**: n'ime worktree pụrụ iche sitere na release tip, gwakọta isi batch niile
   na mpaghara ahụ, wee mee suite kwekọrọ na nke ntọhapụ
   (`npm run check:release-green`, tinye `--with-build` tupu ntọhapụ).
   `scripts/release/merge-train.sh <base> <PR#>…` na-eme nzọụkwụ 1–2 na-akpaghị aka (PR ndị nwere
   esemokwu na-apụ, ụgbọ ahụ na-aga n'ihu). Full mode na-eme `npm run test:unit` — runner
   ahaziri maka box (`--test-concurrency=20`), **ọ bụghị** CI shards 4-core abụọ na-aga n'usoro
   otu otu, bụ ndị mere ka usoro kachasị ibu jiri ihe dịka 25% nke box 16-core (edoziworo
   2026-07-18). `--fast` (iwepụ mega-train n'ime otu ụbọchị, onye nwe ya kwadoro 2026-07-18)
   na-edobe static gate niile + vitest mana na-eme naanị faịlụ node:test ndị PR batara
   gbanwere; suite ZURU EZI ka ga-agba ọsọ opekata mpe otu ugboro kwa ụbọchị na tip
   a chịkọtara (otu train na-enweghị `--fast`).
3. **Akwụkwọ ndụ** → gwakọta PR ndị ahụ n'usoro (na-enyocha `state,headRefOid` ọzọ tupu nke ọ bụla —
   PR isi ya gbanwere ga-alaghachi na nyocha). Gosi na net diff nke ngwakọta ọ bụla bụ
   mgbanwe nke PR ahụ n'onwe ya (enweghị auto-resolve reverts: nyochaa `git diff --stat` maka
   nhichapụ ndị na-abụghị akụkụ ọrụ ahụ).
4. **Uhie** → kee batch ahụ ụzọ abụọ (nyochaa ọkara nke ọ bụla) kama ịtụlegharị
   ha otu otu; weghachite PR na-akpata nsogbu n'ahịrị nyocha ya na ihe akaebe.
5. **Emela mgbe ọ bụla**: ngwakọta n'oge freeze banye n'alaka a kpọchiri; `git stash` n'ebe ọ bụla;
   imegharị CI niile n'olileanya na uhie ga-apụ (iwu: uhie bụ ozi).

## Nkewa ọkwa (ihe mere ahịrị ahụ ji dị nchebe site na iji naanị fast-gates)

- **Kwa PR** (quality.yml fast-gates): ule TIA metụtara + full unit 4-shard +
  vitest + lint bag + typecheck + izi ezi docs/changelog.
- **Kwa batch/tip** (continuous release-green): `--quick` HARD gates na push ọ bụla gaa
  n'alaka ntọhapụ; nyocha `--with-build --full-ci` zuru ezu ugboro 3 kwa ụbọchị.
- **Kwa ntọhapụ** (ci.yml na release PR): matrix zuru ezu gụnyere E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Ọ dịghị ihe a na-enyocha obere karịa ka ọ dị na mbụ — naanị na surface dị arọ na-agba ọsọ kwa batch/tip
kama kwa PR, nke bụ ihe na-ewepụ njem ugboro ugboro O(N).
