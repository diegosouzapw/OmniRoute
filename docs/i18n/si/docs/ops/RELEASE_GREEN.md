# Release-Green: keeping the queue and release branch green (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## මෙය විසඳන ගැටලුව

**සම්පූර්ණ gate එක** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) ක්රියාත්මක වන්නේ **release PR එකේ පමණි** (PR → `main`).
`release/**` ඉලක්ක කරන PR වෙත **fast-gates** (`quality.yml`: TIA මඟින් බලපෑමට ලක් වූ tests + typecheck + lint)
ලැබෙන අතර, code වෙනස්කම් සඳහා **උපදේශාත්මක** production build එකක් ද ලැබේ. එහි ප්රතිඵලය: release සඳහා පමණක්
පැනනඟින අසාර්ථකත්වයන් release branch එක මත නිහඬව එකතු වී, release කරන අවස්ථාවේදී
**වරකට එක බැගින් මිනිත්තු ~40ක ස්තර ලෙස පුපුරා යා හැක**.

"release-green family" පවතින්නේ එම අසාර්ථකත්වයන් **කල්තියා හඳුනාගැනීමටයි** — ඕනෑම වේලාවක, සම්පූර්ණ
gate එකට සමාන පරීක්ෂාවක් **දේශීයව / release ක්රියාවලියෙන් පිටතදී** සිදු කර, release PR එකේ පළමු CI ධාවනයේදීම
එය green තත්ත්වයේ පවතින බව තහවුරු කිරීමටයි.

> **සාකච්ඡා කළ නොහැකි මූලධර්මය:** මෙහි කිසිවක් contributor ව අවහිර නොකරයි. ඔවුන්ගේ PR එක අසමත් කරන
> අනිවාර්ය check එකක් අපි එක් නොකරමු. **drift** (ratchets) යනු release කරන අවස්ථාවේ maintainer විසින් නැවත baseline කිරීමට ඇති දෙයකි —
> එය කිසිවිටෙක contributor ගේ වගකීමක් නොවේ. කිසිදු කොටසක් PR එකක් **වසා නොදමයි** (credit theft)
> හෝ සමත් වීම සඳහා test එකක් **දුර්වල නොකරයි**.

## මෙම family එක (කොටස් 4ක්) — සහ එක් එක් කොටස ස්වාධීනව ක්රියාත්මක වන ආකාරය

| කොටස                                                                       | එය කුමක්ද                                                                                      | ක්රියාත්මක කළ යුත්තේ කවදාද                                             | විෂය පථය                             |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------ |
| **`/green-prs`** (Solution A)                                              | maintainer විසින් **විවෘත PR පෝලිම** ඉල්ලීම මත scan කිරීම                                      | **ස්වාධීනව, කාලානුරූපව** — විශේෂයෙන්ම `/generate-release` එකකට **පෙර** | සම්පූර්ණ PR පෝලිම → `release/**`     |
| **`/validate-release-green`** (Solution C — `npm run check:release-green`) | වලංගුකරණ engine එක: branch එකක් හෝ merge candidate එකක් මත සම්පූර්ණ gate එක ප්රතිනිර්මාණය කරයි | ස්වාධීනව, ඕනෑම වේලාවක                                                  | නිශ්චිත branch එකක් හෝ merge-PR එකක් |
| **`/babysit <PR#>`**                                                       | **එක්** PR එකක **සජීවී CI** green තත්ත්වයට ගෙන යයි                                             | ස්වාධීනව, එක් එක් PR සඳහා                                              | එක් PR එකක්                          |
| **`nightly-release-green.yml`** (Solution D)                               | ස්වයංක්රීය nightly workflow එක; HARD red තත්ත්වයකදී issue එකක් විවෘත කරයි                      | ස්වයංක්රීයව (cron)                                                     | සක්රිය release branch එක             |

**"මෙය releases සඳහා පමණක්ද?" යන්නට කෙටි පිළිතුර:** **නැත.** `/green-prs` නිර්මාණය කර ඇත්තේ
**releases අතරතුර, කාලානුරූපව** ක්රියාත්මක කිරීමටයි. එය ස්වාධීනව ක්රියාත්මක කිරීම සාමාන්ය භාවිතයයි — release එක යනු
එය ක්රියාත්මක කිරීමෙන් වැඩිම වටිනාකමක් ලැබෙන අවස්ථාව පමණි.

## PR සිට release දක්වා උපදේශක build එක

`quality.yml` දැන් draft නොවන code PR සහ Mergify queue branch සඳහා `Build (advisory)` ඇතුළත් කරයි.
එය `ci.yml` හි production build recipe එක පිළිබිඹු කරයි: Node 24, `npm-ci-retry`,
`check:node-runtime`, සහ `OMNIROUTE_USE_TURBOPACK=1` සමඟ `npm run build`. මෙම workflow එක තුළ පහළට ඇති කිසිදු quality job එකක් build artifact එකක් භාවිත නොකරන බැවින්, මෙය හිතාමතාම build artifact එකක් upload නොකරයි.
ස්ථාවර release-PR ධාවන සතියකට පසු `continue-on-error` ඉවත් කරන්න, එවිට මෙම signal එක
PR සිට release දක්වා blocking gate එකක් බවට පත්වේ.

## විසඳුම C — `npm run check:release-green` (engine එක)

වත්මන් working tree එකට එරෙහිව release එකට සමාන validation එක ප්රතිනිෂ්පාදනය කර, එක් එක් red තත්ත්වය වර්ගීකරණය කරයි:

- **HARD** (typecheck, lint errors, unit, vitest, db-rules, public-creds, විකල්ප
  `package-artifact`) → **සැබෑ දෝෂයක්**; `exit 1`. source branch එකේදී නිවැරදි කරයි (TDD, Rule #18).
- **DRIFT** (eslint **warnings**, cognitive-complexity, file-size) → cycle එක තුළ එකතු වූ ratchet drift එකකි,
  **contributorගේ වරදක් නොවේ**; එය report කිරීම පමණක් සිදු කරන අතර **release අවස්ථාවේදී maintainer විසින් rebaseline කරනු ලැබේ**.
  Drift කිසිවිටෙකත් exit code එක වෙනස් නොකරයි — එබැවින් එය කිසිවෙකු block නොකරයි.

```bash
npm run check:release-green                 # වත්මන් branch එක (working tree)
node scripts/quality/validate-release-green.mjs --json   # ව්යුහගත output
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest මඟහරියි (drift+typecheck+lint පමණි)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact ඇතුළත් කරයි (මන්දගාමී)
```

Diagnosis සිදු කර **report** කිරීම පමණක් කරයි (auto-fix නැත). fix-to-green orchestration එක
`/green-prs` සහ `/review-prs` තුළ ඇත.

## විසඳුම A — `/green-prs` (queue scan එක)

ක්රියාපටිපාටිය (සාරාංශය — විස්තර සඳහා `green-prs` skill එක බලන්න):

1. සක්රිය release branch එකට එරෙහිව ඇති විවෘත PR queue එකේ **Inventory** එකක් සාදන්න.
2. එක් එක් PR එක **Triage** කරන්න (viable / reject-worthy / needs-author) — reject/needs-author ඒවා
   **report කරනු ලබන නමුත් close නොකරයි** (තීරණය කරන්නේ author ය).
3. viable එක් එක් PR එක සඳහා, **හුදකලා worktree** එකක් තුළ (Rule #19), PR එක release tip එක වෙත ගෙනැවිත්
   `npm run check:release-green` ධාවනය කරන්න:
   - **HARD** → co-authorship හරහා **contributorගේ branch එක මත** නිවැරදි කරන්න (authorගේ "Merged" status එක රැකේ),
     සියලු HARD ඉවත් වන තෙක් නැවත ධාවනය කරන්න.
   - **DRIFT** → එය එලෙසම තබන්න; release අවස්ථාවේදී එය rebaseline කරනු ලැබේ.
4. PR × (verdict, HARD reds, fixed?, DRIFT, release-green now?) වගුවක් **Report** කරන්න.

Merge කිරීමකින් තොරව queue එක **සූදානම්** කළ හැක; merge කරන්නේ පැහැදිලිව ඉල්ලා සිටි විට පමණි — තවද කිසිවිටෙකත් PR එකක් close නොකරයි.

## නිර්දේශිත කාලසටහන

- **`/green-prs` වරින් වර ධාවනය කරන්න** (උදා., සතිපතා) සහ
  `/generate-release` එකකට පෙර **සෑමවිටම ධාවනය කරන්න**.
- අඛණ්ඩ signal එකක් ලෙස **`nightly-release-green.yml`** (විසඳුම D) තබාගන්න: එය
  HARD red issue එකක් විවෘත කළ විට, scan එකක් කිරීමට කාලය පැමිණ ඇත.
- branch එකක් හෝ නිශ්චිත merge candidate එකක් පරීක්ෂා කිරීමට අවශ්ය විට **`/validate-release-green`** භාවිත කරන්න.
- නිශ්චිත PR එකක් live CI මත green තත්ත්වයට ගෙන ඒමට අවශ්ය විට **`/babysit <PR#>`** භාවිත කරන්න.

## release සමඟ ඇති සම්බන්ධතාව

- `/generate-release` විසින් **Phase 0 (pre-flight)** තුළ validation කැඳවයි: release PR එක විවෘත කිරීමට පෙර DRIFT rebaseline කර
  HARD නිවැරදි කරයි.
- `/review-prs` merge කිරීමේ තීරණ පියවරේදී release-green gate එක භාවිත කරයි (green-before-merge).

සියලුම කොටස්වල අරමුණ එකමය: release දිනයේදී මිනිත්තු 40ක ස්තරවලින් red තත්ත්ව හඹා යනවා වෙනුවට, **පළමු CI ධාවනයේදීම green වන release PR එකක්** ලබා ගැනීමයි.
