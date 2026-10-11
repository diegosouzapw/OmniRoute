# Merge Queue & Manual Merge-Train Runbook (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Mula v3.8.49 (WS3.2/WS3.4 ng quality/velocity plan), ang default na merge path para sa
mga na-review na PR papunta sa `release/vX.Y.Z` ay ang **Mergify merge queue** (`.mergify.yml`);
ang **manual merge-train** na nakadokumento sa ibaba ang FALLBACK — ginagamit sa panahon ng mga insidente,
release freeze, o kung sakaling magbago ang Mergify Open Source plan.

## Default na landas: ang pila ng Mergify

1. Sinusuri/nagiging green ang PR sa pamamagitan ng mga campaign at inaaprubahan ng ⭐
   gate bago mag-merge ng may-ari (ang ulat + desisyon sa bawat item — tingnan ang `/merge-prs` Hakbang 0.75).
2. Inilalapat ng may-ari (o ng session na kumikilos batay sa desisyon ng may-ari) ang label na **`queue`**.
   Ang label MISMO ang pag-apruba sa pag-merge; isinasagawa lamang ito ng Mergify.
3. **Sunud-sunod** na bina-validate ng Mergify ang mga nakapilang PR (paisa-isa) laban sa mga fast-gate
   at mine-merge ang mga ito (squash). Ang batching + awtomatikong bisection ay nasa bayad na tier ng Mergify
   ("Cannot use Merge Queue batch" sa libreng plan, #7220), kaya walang itinatakdang
   `batch_size` ang `.mergify.yml`; nananatiling gawain ng manu-manong merge-train sa ibaba ang batching. Ang PR na
   nakabinbin pa rin ang mga check pagkalipas ng `checks_timeout` (240 min = 2× ng nasukat na p95 ng
   `quality.yml`) ay inaalis sa pila sa halip na patigilin ang pila.
4. Pagkatapos ng pag-merge, bina-validate ng tuloy-tuloy na release-green workflow ang bagong tip sa pag-push
   at nagbubukas ng attribution issue kung nagkaroon ng regression ang kombinasyon (hindi kailanman awtomatikong nagre-revert).

Mga pananggalang (sumasalamin sa Mga Mahigpit na Panuntunan #21/#22 ng `CLAUDE.md`):

- **Bukas ang release freeze** → HUWAG lagyan ng label ang mga PR na nagta-target sa naka-freeze na branch; i-retarget muna sa
  aktibong `release/vX+1`.
- **In-flight na PR ng ibang session** → huwag kailanman itong lagyan ng label; tanging ang nagmamay-aring session lamang ang
  naglalagay sa pila ng sarili nitong gawain.
- Ang mga diff na tests-only at mga PR na may label na `hotfix` ay nagpapatakbo na ng pinababang CI (tingnan ang
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); tinatanggap ng mga kondisyon ng pila ang anumang
  hanay ng mga check na aktuwal na tumakbo (`#check-failure=0` + `#check-pending=0`).

## Fallback: ang manual merge-train

Ginagamit kapag hindi available ang queue. Isinasapormal nito ang praktis na nagproseso ng 33 PR
sa loob ng isang araw noong v3.8.47 cycle:

1. **Buuin ang batch** (~10–30 na na-review+naaprubahang PR). Suriin ang mga banggaan sa `linked:`
   (parehong `tap.testFiles`, parehong CHANGELOG hunks) at isa-isahin ang mga iyon.
2. **Mag-validate NANG ISANG BESES**: sa isang nakahiwalay na worktree mula sa release tip, lokal na i-merge ang lahat ng batch
   head, pagkatapos ay patakbuhin ang suite na katumbas ng release
   (`npm run check:release-green`, idagdag ang `--with-build` bago ang isang release).
   Ino-automate ng `scripts/release/merge-train.sh <base> <PR#>…` ang mga hakbang 1–2 (inaalis ang mga
   sumasalungat na PR, nagpapatuloy ang train). Pinapatakbo ng full mode ang `npm run test:unit` — ang
   runner na naka-tune para sa box (`--test-concurrency=20`), **hindi** ang dalawang sunod-sunod na 4-core CI
   shard, na nagpatakbo sa pangunahing phase sa ~25% ng isang 16-core box (naayos noong
   2026-07-18). Pinananatili ng `--fast` (mga intra-day mega-train drain, inaprubahan ng may-ari noong 2026-07-18)
   ang bawat static gate + vitest ngunit pinapatakbo lamang ang mga node:test file na binago ng
   mga nakasakay na PR; kailangan pa ring tumakbo ang FULL suite nang kahit isang beses bawat araw sa
   naipong tip (isang train na walang `--fast`).
3. **Berde** → i-merge ang mga PR nang sunod-sunod (muling sinusuri ang `state,headRefOid` bago ang bawat isa —
   ang PR na nagbago ang head ay babalik sa review). Patunayang ang net diff ng bawat merge ay
   sariling pagbabago ng PR (walang mga auto-resolve revert: i-audit ang `git diff --stat` para sa
   mga out-of-scope na deletion).
4. **Pula** → i-bisect ang batch sa mga hati (i-validate ang bawat hati) sa halip na muling mag-validate
   nang paisa-isa; ibalik ang may-salang PR sa review queue kasama ang ebidensya.
5. **Huwag kailanman**: mag-merge sa naka-freeze na branch habang may freeze; gumamit ng `git stash` saanman;
   basta muling patakbuhin ang CI sa pag-asang mawawala ang pula (panuntunan: impormasyon ang pula).

## Tiering (kung bakit ligtas ang queue kahit fast-gates lamang)

- **Bawat PR** (quality.yml fast-gates): mga test na apektado ng TIA + buong unit 4-shard +
  vitest + lint bag + typecheck + integridad ng docs/changelog.
- **Bawat batch/tip** (continuous release-green): `--quick` HARD gates sa bawat push sa
  release branch; buong `--with-build --full-ci` sweep nang 3×/araw.
- **Bawat release** (ci.yml sa release PR): ang kumpletong matrix kasama ang E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Walang bina-validate nang mas kaunti kaysa dati — tumatakbo lamang ang mabigat na surface sa bawat batch/tip
sa halip na sa bawat PR, at ito ang nag-aalis sa mga O(N) round-trip.

## Mga prerequisite ng fresh checkout para sa `merge-train.sh`

Nagpapatakbo ang script ng fail-fast na **preflight** sa root checkout (bago ang anumang gawain sa worktree)
upang hindi kailanman mapagkamalang pulang train ang sirang install:

1. `npm ci`, pagkatapos ay patakbuhin ang `bun` postinstall na bina-block ng npm:
   `(cd node_modules/bun && node install.js)` — kung hindi, mabibigo ang `check:provider-consistency`
   at `check:known-symbols` (parehong `bun scripts/…`) sa train AT sa base nang
   walang violation line.
2. Walang ligaw na `node_modules/node_modules` (isang dobleng dependency tree; dalawang beses naglo-load ang React
   at agad na nabibigo ang mga UI vitest suite).
3. Naroon at executable ang `node_modules/.bin/tsc` (wala nito ang isang partial install).

Pinapatakbo ng train ang blocking na `npm run check:cycles:ratchet`; advisory ang simpleng `npm run check:cycles`
(iniilista nito ang mga SCC at nag-e-exit nang non-zero kahit sa isang maayos na base).
