# Merge Queue & Manual Merge-Train Runbook (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 සිට (quality/velocity සැලැස්මේ WS3.2/WS3.4), සමාලෝචනය කළ PR
`release/vX.Y.Z` වෙත ඒකාබද්ධ කිරීමේ පෙරනිමි මාර්ගය වන්නේ **Mergify ඒකාබද්ධ කිරීමේ පෝලිමයි** (`.mergify.yml`);
පහත ලේඛනගත කර ඇති **අතින් ක්රියාත්මක කරන merge-train** එක විකල්ප ක්රමයයි — එය සිදුවීම් අතරතුර,
නිකුතු අත්හිටුවීම්වලදී, හෝ Mergify Open Source සැලැස්ම කවදා හෝ වෙනස් වුවහොත් භාවිත කෙරේ.

## පෙරනිමි මාර්ගය: Mergify පෝලිම

1. PR එක campaigns මඟින් සමාලෝචනය කර/හරිත තත්ත්වයට පත් කර ඇති අතර, හිමිකරුගේ merge කිරීමට පෙර ⭐
   gate එක මඟින් අනුමත කර ඇත (වාර්තාව + එක් එක් අයිතමය සඳහා තීරණය — `/merge-prs` හි පියවර 0.75 බලන්න).
2. හිමිකරු (හෝ හිමිකරුගේ තීරණය අනුව ක්රියා කරන session එක) **`queue`**
   label එක යොදයි. එම label එකම merge අනුමැතියයි; Mergify එය ක්රියාත්මක කිරීම පමණක් සිදු කරයි.
3. Mergify විසින් පෝලිම්ගත කළ PR, fast-gates වලට එරෙහිව **අනුක්රමිකව** (වරකට එක බැගින්)
   වලංගු කර merge කරයි (squash). Batching + ස්වයංක්රීය bisection යනු ගෙවීම් සහිත Mergify tier එකක
   විශේෂාංගයකි (නොමිලේ plan එකේ "Cannot use Merge Queue batch", #7220), එබැවින් `.mergify.yml` තුළ
   `batch_size` සකසා නැත; batching කිරීම පහත සඳහන් අතින් ක්රියාත්මක කරන merge-train එකේ කාර්යයක් ලෙස පවතී. `checks_timeout`
   (මිනිත්තු 240 = `quality.yml` හි මනින ලද p95 අගය මෙන් 2×) ඉක්මවා ගිය පසුවත් checks
   pending තත්ත්වයේ පවතින PR එකක්, පෝලිම නතර කර තැබීම වෙනුවට පෝලිමෙන් ඉවත් කරනු ලැබේ.
4. Merge කිරීමෙන් පසුව, continuous release-green workflow එක push කිරීමේදී නව tip එක වලංගු කර,
   එම සංයෝජනයේ regression එකක් සිදුවී ඇත්නම් attribution issue එකක් විවෘත කරයි (කිසිවිටෙක ස්වයංක්රීයව revert නොකරයි).

ආරක්ෂක සීමා (`CLAUDE.md` හි Hard Rules #21/#22 පිළිබිඹු කරයි):

- **Release freeze එක සක්රියයි** → freeze කළ branch එක ඉලක්ක කරන PR වලට label යොදන්න එපා; පළමුව
  සක්රිය `release/vX+1` වෙත නැවත ඉලක්ක කරන්න.
- **වෙනත් session එකක ක්රියාත්මක වෙමින් පවතින PR එකක්** → කිසිවිටෙක එයට label යොදන්න එපා; තමන්ගේ කාර්යය පෝලිම්ගත කරන්නේ
  එහි හිමිකාර session එක පමණි.
- Tests-only diffs සහ `hotfix` label එක යෙදූ PR දැනටමත් අඩු කළ CI එකක් ධාවනය කරයි (
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane බලන්න); සැබවින්ම ධාවනය වූ check කට්ටලය කුමක් වුවත්
  පෝලිමේ කොන්දේසි එය පිළිගනී (`#check-failure=0` + `#check-pending=0`).

## විකල්ප ක්රමය: අතින් ක්රියාත්මක කරන merge-train

පෝලිම ලබා ගත නොහැකි විට භාවිත කෙරේ. මෙය v3.8.47 චක්රය තුළ
එක් දිනකදී PR 33ක් අවසන් කළ ක්රමවේදය විධිමත් කරයි:

1. **කාණ්ඩය සකසන්න** (සමාලෝචිත+අනුමත PR ~10–30ක්). `linked:` ගැටීම්
   (එකම `tap.testFiles`, එකම CHANGELOG කොටස්) පරීක්ෂා කර ඒවා අනුක්රමික කරන්න.
2. **එක් වරක් වලංගු කරන්න**: release tip එකෙන් වෙන් කළ worktree එකක, සියලු කාණ්ඩ
   heads දේශීයව ඒකාබද්ධ කර, පසුව නිකුතුවට සමාන suite එක ක්රියාත්මක කරන්න
   (`npm run check:release-green`, නිකුතුවකට පෙර `--with-build` එක් කරන්න).
   `scripts/release/merge-train.sh <base> <PR#>…` පියවර 1–2 ස්වයංක්රීය කරයි (ගැටෙන
   PR ඉවත් වන අතර, train එක දිගටම ක්රියාත්මක වේ). සම්පූර්ණ ප්රකාරය `npm run test:unit` ක්රියාත්මක කරයි — එනම්
   පරිගණකයට ගැළපෙන ලෙස සකස් කළ runner එක (`--test-concurrency=20`), **අනුක්රමික 4-core CI
   shards දෙක නොවේ**; ඒවා ප්රමුඛ අදියර 16-core පරිගණකයකින් ~25%ක ධාරිතාවකින් පමණක් ධාවනය වීමට හේතු විය (නිවැරදි කළේ
   2026-07-18). `--fast` (එකම දිනය තුළ mega-train අවසන් කිරීම්, හිමිකරු විසින් 2026-07-18 අනුමත කරන ලදී)
   සෑම static gate එකක්ම + vitest තබා ගන්නා නමුත්, train එකට ඇතුළත් කළ PR මඟින් වෙනස් කළ node:test ගොනු පමණක්
   ක්රියාත්මක කරයි; සමුච්චිත tip එක මත සම්පූර්ණ suite එක තවමත් අවම වශයෙන් දිනකට වරක්
   ක්රියාත්මක කළ යුතුය (`--fast` නොමැති එක් train එකක්).
3. **හරිතයි** → PR අනුක්රමයෙන් ඒකාබද්ධ කරන්න (එක් එක් ඒකාබද්ධ කිරීමට පෙර `state,headRefOid` නැවත පරීක්ෂා කරමින් —
   head එක වෙනස් වූ PR එකක් නැවත සමාලෝචනයට ඇතුළත් වේ). එක් එක් ඒකාබද්ධ කිරීමේ ශුද්ධ diff එක
   එම PR එකේම වෙනස බව තහවුරු කරන්න (ස්වයංක්රීයව විසඳන revert නොකරන්න: විෂය පථයෙන් පිටත මකා දැමීම් සඳහා
   `git diff --stat` විගණනය කරන්න).
4. **රතුයි** → එකින් එක නැවත වලංගු කිරීම වෙනුවට කාණ්ඩය අර්ධ වශයෙන් දෙකඩ කරන්න (එක් එක් අර්ධය වලංගු කරන්න);
   ගැටලුකාරී PR එක සාක්ෂි සමඟ නැවත සමාලෝචන පෝලිමට යවන්න.
5. **කිසි විටෙකත් නොකරන්න**: අත්හිටුවීමක් අතරතුර අත්හිටුවා ඇති branch එකට ඒකාබද්ධ කිරීම; ඕනෑම තැනක
   `git stash` භාවිත කිරීම; රතු තත්ත්වයක් නැති වේ යැයි බලාපොරොත්තුවෙන් CI සමස්තයක් ලෙස නැවත ක්රියාත්මක කිරීම
   (නීතිය: රතු තත්ත්වයක් යනු තොරතුරකි).

## මට්ටම්කරණය (fast-gates පමණක් සමඟ පෝලිම ආරක්ෂිත වන්නේ ඇයි)

- **එක් PR එකකට** (quality.yml fast-gates): TIA-බලපෑමට ලක් වූ පරීක්ෂණ + සම්පූර්ණ unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog අඛණ්ඩතාව.
- **එක් කාණ්ඩයකට/tip එකකට** (අඛණ්ඩ release-green): release branch වෙත කරන සෑම push එකකදීම
  `--quick` HARD gates; දිනකට 3 වරක් සම්පූර්ණ `--with-build --full-ci` පරීක්ෂණ.
- **එක් නිකුතුවකට** (release PR එකෙහි ci.yml): E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets ඇතුළුව සම්පූර්ණ matrix එක.

පෙරට වඩා අඩුවෙන් කිසිවක් වලංගු නොකෙරේ — බර වැඩි පරීක්ෂණ පෘෂ්ඨය එක් එක් PR එකකට වෙනුවට
එක් එක් කාණ්ඩයට/tip එකට ක්රියාත්මක වේ; O(N) වට-ගමන් ඉවත් කරන්නේ එයයි.

## `merge-train.sh` සඳහා නැවුම් checkout පූර්ව අවශ්යතා

බිඳ වැටුණු ස්ථාපනයක් කිසි විටෙක රතු train එකක් ලෙස වැරදි ලෙස පෙනී නොසිටින පරිදි, script එක root checkout මත
(ඕනෑම worktree කාර්යයකට පෙර) දෝෂයක් ඇති වූ වහාම නවත්වන **preflight** එකක් ක්රියාත්මක කරයි:

1. `npm ci`, ඉන්පසු npm අවහිර කරන `bun` postinstall එක ක්රියාත්මක කරන්න:
   `(cd node_modules/bun && node install.js)` — එසේ නොමැති නම් `check:provider-consistency`
   සහ `check:known-symbols` (`bun scripts/…` යන දෙකම) train එකේත් base එකේත්
   උල්ලංඝන පේළියක් නොමැතිව අසමත් වේ.
2. අයාලේ ඇති `node_modules/node_modules` නොතිබිය යුතුය (අනුපිටපත් dependency tree එකක්; React දෙවරක් load වී
   UI vitest suites ක්ෂණිකව අසමත් වේ).
3. `node_modules/.bin/tsc` තිබිය යුතු අතර ක්රියාත්මක කළ හැකි විය යුතුය (අර්ධ ස්ථාපනයක එය නොමැත).

train එක අවහිරකාරී `npm run check:cycles:ratchet` ක්රියාත්මක කරයි; සාමාන්ය `npm run check:cycles`
උපදේශාත්මක පමණි (එය SCC ලැයිස්තුගත කර සෞඛ්ය සම්පන්න base එකකදී පවා non-zero තත්ත්වයකින් පිටවෙයි).
