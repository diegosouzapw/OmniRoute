# Merge Queue & Manual Merge-Train Runbook (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 සිට (quality/velocity සැලැස්මේ WS3.2/WS3.4), සමාලෝචනය කළ PRs
`release/vX.Y.Z` වෙත ඒකාබද්ධ කිරීමේ පෙරනිමි මාර්ගය වන්නේ **Mergify ඒකාබද්ධ කිරීමේ පෝලිමයි** (`.mergify.yml`);
පහත ලේඛනගත කර ඇති **අතින් ක්රියාත්මක කරන merge-train** එක FALLBACK එකයි — එය සිදුවීම් අතරතුර,
release freezes අතරතුර, හෝ Mergify Open Source සැලැස්ම කවදා හෝ වෙනස් වුවහොත් භාවිතා කරයි.

## පෙරනිමි මාර්ගය: Mergify පෝලිම

1. campaigns මඟින් PR එක සමාලෝචනය කර/හරිත තත්ත්වයට පත් කර ඇති අතර, හිමිකරුගේ ඒකාබද්ධ කිරීමට පෙර ⭐
   gate එක මඟින් අනුමත කර ඇත (වාර්තාව + එක් එක් අයිතමය පිළිබඳ තීරණය — `/merge-prs` හි පියවර 0.75 බලන්න).
2. හිමිකරු (හෝ හිමිකරුගේ තීරණය අනුව ක්රියා කරන session එක) **`queue`**
   label එක යොදයි. එම label එකම ඒකාබද්ධ කිරීමේ අනුමැතියයි; Mergify එය ක්රියාත්මක කිරීම පමණක් කරයි.
3. Mergify පෝලිම්ගත කළ PRs 10ක් දක්වා කාණ්ඩගත කර, එම කාණ්ඩය fast-gates සමඟ වලංගු කර,
   ඒකාබද්ධ කරයි (squash). රතු කාණ්ඩයක් **ස්වයංක්රීයව දෙකට බෙදේ** — ගැටලුව ඇති PR එක
   ~log2(N) නැවත වලංගු කිරීම් තුළ හුදකලා කර පෝලිමෙන් ඉවත් කරයි; අනෙක් ඒවා ඉදිරියට යයි.
4. ඒකාබද්ධ කිරීමෙන් පසු, continuous release-green workflow එක push කිරීමේදී නව tip එක වලංගු කර,
   එම සංයෝජනය නිසා පසුබෑමක් ඇති වී තිබේ නම් attribution issue එකක් විවෘත කරයි (කිසිවිටෙක ස්වයංක්රීයව ප්රතිවර්තනය නොකරයි).

ආරක්ෂක සීමා (`CLAUDE.md` හි Hard Rules #21/#22 පිළිබිඹු කරයි):

- **Release freeze එකක් විවෘතයි** → freeze කළ branch එක ඉලක්ක කරන PRs වලට label යොදන්න එපා; පළමුව
  සක්රිය `release/vX+1` වෙත නැවත ඉලක්ක කරන්න.
- **වෙනත් session එකක දැනට ක්රියාත්මක වෙමින් පවතින PR එකක්** → එයට කිසිවිටෙක label යොදන්න එපා; තමන්ගේ
  කාර්යය පෝලිම්ගත කරන්නේ එය හිමි session එක පමණි.
- පරීක්ෂණ පමණක් අඩංගු diffs සහ `hotfix` label කළ PRs දැනටමත් අඩු කළ CI ක්රියාත්මක කරයි (
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane බලන්න); පෝලිමේ කොන්දේසි සැබවින්ම ක්රියාත්මක වූ ඕනෑම
  check කට්ටලයක් පිළිගනී (`#check-failure=0` + `#check-pending=0`).

## විකල්පය: අතින් ක්රියාත්මක කරන merge-train එක

පෝලිම ලබාගත නොහැකි විට භාවිතා කරයි. මෙය v3.8.47 චක්රය අතරතුර එක් දිනකදී PRs 33ක්
නිම කළ ක්රමවේදය විධිමත් කරයි:

1. **කාණ්ඩය එකලස් කරන්න** (සමාලෝචනය කළ+අනුමත කළ PRs ~10–30ක්). `linked:` ගැටීම්
   (එකම `tap.testFiles`, එකම CHANGELOG කොටස්) පරීක්ෂා කර, ඒවා අනුක්රමිකව සකසන්න.
2. **එක් වරක් වලංගු කරන්න**: release tip එකෙන් වෙන් කළ හුදකලා worktree එකක, සියලු කාණ්ඩ
   heads දේශීයව ඒකාබද්ධ කර, පසුව release එකට සමාන suite එක ක්රියාත්මක කරන්න
   (`npm run check:release-green`, release එකකට පෙර `--with-build` එක් කරන්න).
   `scripts/release/merge-train.sh <base> <PR#>…` පියවර 1–2 ස්වයංක්රීය කරයි (ගැටෙන
   PRs ඉවත් වන අතර train එක දිගටම ක්රියාත්මක වේ). Full mode එක `npm run test:unit` ක්රියාත්මක කරයි —
   එනම් box එකට ගැළපෙන ලෙස සකස් කළ runner එක (`--test-concurrency=20`) මිස, අනුක්රමික 4-core CI
   shards දෙක නොවේ; ඒවා 16-core box එකක ප්රධාන අදියර ~25%කදී ධාවනය වීමට හේතු විය (නිවැරදි කළේ
   2026-07-18). `--fast` (එකම දින තුළ mega-train හිස් කිරීම් සඳහා, 2026-07-18 දින හිමිකරු විසින් අනුමත කළ)
   සෑම static gate එකක්ම + vitest තබාගන්නා නමුත්, train එකට එක් කළ PRs මඟින් වෙනස් කළ node:test files
   පමණක් ක්රියාත්මක කරයි; සමුච්චිත tip එක මත අවම වශයෙන් දිනකට එක් වරක්වත් FULL suite එක
   ක්රියාත්මක කළ යුතුය (`--fast` නොමැති එක් train එකක්).
3. **හරිතයි** → PRs අනුක්රමයෙන් ඒකාබද්ධ කරන්න (එක් එක් ඒකාබද්ධ කිරීමට පෙර `state,headRefOid` නැවත පරීක්ෂා කරමින් —
   head එක වෙනස් වූ PR එකක් නැවත සමාලෝචනයට ඇතුළු වේ). එක් එක් ඒකාබද්ධ කිරීමේ ශුද්ධ diff එක
   එම PR එකේම වෙනස බව තහවුරු කරන්න (ස්වයංක්රීයව විසඳන ප්රතිවර්තන නොකරන්න: විෂය පථයෙන් පිටත
   මකාදැමීම් සඳහා `git diff --stat` විගණනය කරන්න).
4. **රතුයි** → එකින් එක නැවත වලංගු කිරීම වෙනුවට කාණ්ඩය අර්ධවලට බෙදන්න (එක් එක් අර්ධය වලංගු කරන්න);
   ගැටලුව ඇති PR එක සාක්ෂි සමඟ නැවත සමාලෝචන පෝලිමට යවන්න.
5. **කිසිවිටෙක නොකරන්න**: freeze එකක් අතරතුර freeze කළ branch එකට ඒකාබද්ධ කිරීම; ඕනෑම තැනක
   `git stash` කිරීම; රතු තත්ත්වයක් අතුරුදහන් වේ යැයි බලාපොරොත්තුවෙන් CI එක මුළුමනින්ම නැවත ක්රියාත්මක කිරීම
   (රීතිය: රතු තත්ත්වයක් යනු තොරතුරකි).

## ස්තරීකරණය (fast-gates පමණක් සමඟ පෝලිම ආරක්ෂිත වන්නේ ඇයි)

- **එක් PR එකකට** (quality.yml fast-gates): TIA-බලපෑමට ලක් වූ පරීක්ෂණ + සම්පූර්ණ unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog අඛණ්ඩතාව.
- **එක් කාණ්ඩයකට/tip එකකට** (continuous release-green): release branch එකට කරන සෑම push එකකදීම
  `--quick` HARD gates; දිනකට 3×ක් සම්පූර්ණ `--with-build --full-ci` sweeps.
- **එක් release එකකට** (release PR එකේ ci.yml): E2E ×9 ඇතුළු සම්පූර්ණ matrix එක,
  package-artifact + tarball boot-smoke, coverage/ratchets.

පෙරට වඩා අඩුවෙන් කිසිවක් වලංගු නොකෙරේ — බර වැඩි කොටස එක් PR එකකට වෙනුවට එක් කාණ්ඩයකට/tip එකකට
ක්රියාත්මක වන අතර, O(N) වට-ගමන් ඉවත් කරන්නේ එයයි.
