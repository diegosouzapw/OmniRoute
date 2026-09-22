# Merge Queue & Manual Merge-Train Runbook (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Mula v3.8.49 (WS3.2/WS3.4 ng quality/velocity plan), ang default na merge path para sa
mga nasuring PR papunta sa `release/vX.Y.Z` ay ang **Mergify merge queue** (`.mergify.yml`);
ang **manual merge-train** na nakadokumento sa ibaba ang FALLBACK — ginagamit sa panahon ng mga insidente,
release freeze, o kung sakaling magbago ang Mergify Open Source plan.

## Default na path: ang Mergify queue

1. Sinuri/naging green ang PR sa pamamagitan ng mga campaign at inaprubahan ng pre-merge ⭐
   gate ng may-ari (ang ulat + desisyon sa bawat item — tingnan ang `/merge-prs` Hakbang 0.75).
2. Ilalapat ng may-ari (o ng session na kumikilos batay sa desisyon ng may-ari) ang label na **`queue`**.
   Ang label MISMO ang pag-apruba sa merge; isinasagawa lamang ito ng Mergify.
3. Pinapangkat ng Mergify ang hanggang 10 nakapilang PR, bina-validate ang batch laban sa mga fast-gate,
   at mina-merge (squash). Ang red na batch ay **awtomatikong bina-bisect** — ang problematikong PR
   ay naihihiwalay sa humigit-kumulang log2(N) muling pag-validate at inaalis sa queue; nagpapatuloy ang iba.
4. Pagkatapos ng merge, bina-validate ng tuloy-tuloy na release-green workflow ang bagong tip sa pag-push
   at nagbubukas ng attribution issue kung nagkaroon ng regression ang kombinasyon (hindi kailanman awtomatikong nagre-revert).

Mga guardrail (katulad ng `CLAUDE.md` Hard Rules #21/#22):

- **Bukas ang release freeze** → HUWAG lagyan ng label ang mga PR na naka-target sa frozen na branch; i-retarget muna sa
  aktibong `release/vX+1`.
- **In-flight na PR ng ibang session** → huwag itong lagyan ng label; ang nagmamay-aring session lamang ang naglalagay
  sa queue ng sarili nitong gawain.
- Ang mga diff na tests-only at mga PR na may label na `hotfix` ay nagpapatakbo na ng pinaikling CI (tingnan ang
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); tinatanggap ng mga kondisyon ng queue ang anumang
  aktuwal na set ng check na tumakbo (`#check-failure=0` + `#check-pending=0`).

## Fallback: ang manual merge-train

Ginagamit kapag hindi available ang queue. Isinasapormal nito ang pamamaraang nakapag-ubos ng 33 PR sa
loob ng isang araw noong v3.8.47 cycle:

1. **Buuin ang batch** (~10–30 nasuri+naaprubahang PR). Suriin kung may mga banggaan sa `linked:`
   (parehong `tap.testFiles`, parehong CHANGELOG hunks) at isa-isahin ang mga iyon.
2. **Mag-validate NANG ISANG BESES**: sa isang nakahiwalay na worktree mula sa release tip, lokal na i-merge ang lahat ng
   batch head, pagkatapos ay patakbuhin ang suite na katumbas ng para sa release
   (`npm run check:release-green`, idagdag ang `--with-build` bago ang release).
   Ina-automate ng `scripts/release/merge-train.sh <base> <PR#>…` ang mga hakbang 1–2 (inaalis ang mga
   nagkakasalungat na PR, at nagpapatuloy ang train). Pinapatakbo ng full mode ang `npm run test:unit` — ang
   runner na na-tune para sa box (`--test-concurrency=20`), **hindi** ang dalawang sunod-sunod na 4-core CI
   shard, na dahilan kung bakit tumatakbo ang pangunahing phase sa ~25% lamang ng isang 16-core na box (naayos noong
   2026-07-18). Pinananatili ng `--fast` (mga intra-day mega-train drain, inaprubahan ng may-ari noong 2026-07-18)
   ang bawat static gate + vitest ngunit pinapatakbo lamang ang mga node:test file na binago ng
   mga PR na isinama sa train; dapat pa ring patakbuhin ang FULL suite nang hindi bababa sa isang beses bawat araw sa
   naipong tip (isang train na walang `--fast`).
3. **Green** → i-merge nang sunod-sunod ang mga PR (muling sinusuri ang `state,headRefOid` bago ang bawat isa —
   ang PR na nagbago ang head ay muling dadaan sa review). Patunayan na ang net diff ng bawat merge ay
   sariling pagbabago ng PR (walang mga auto-resolve revert: i-audit ang `git diff --stat` para sa
   mga pagtanggal na wala sa saklaw).
4. **Red** → i-bisect ang batch sa mga kalahati (i-validate ang bawat kalahati) sa halip na muling mag-validate
   nang isa-isa; ibalik ang problematikong PR sa review queue kasama ang ebidensya.
5. **Huwag kailanman**: mag-merge sa frozen na branch habang may freeze; gumamit ng `git stash` saanman;
   paulit-ulit na patakbuhin ang buong CI sa pag-asang mawawala ang red (panuntunan: ang red ay impormasyon).

## Tiering (kung bakit ligtas ang queue kahit fast-gates lamang)

- **Bawat PR** (quality.yml fast-gates): mga test na naapektuhan ayon sa TIA + buong unit 4-shard +
  vitest + lint bag + typecheck + integridad ng docs/changelog.
- **Bawat batch/tip** (tuloy-tuloy na release-green): mga HARD gate ng `--quick` sa bawat push sa
  release branch; buong `--with-build --full-ci` sweep nang 3×/araw.
- **Bawat release** (ci.yml sa release PR): ang kumpletong matrix kasama ang E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Walang naba-validate nang mas kaunti kaysa dati — tumatakbo lamang ang mabibigat na saklaw sa bawat batch/tip
sa halip na sa bawat PR, at ito ang nag-aalis sa O(N) na mga round-trip.
