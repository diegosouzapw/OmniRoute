# Merge Queue & Manual Merge-Train Runbook (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Láti v3.8.49 (WS3.2/WS3.4 ti ètò quality/velocity) ọ̀nà ìdarapọ̀ àìròtẹ́lẹ̀ fún
àwọn PR tí a ti ṣàyẹ̀wò sínú `release/vX.Y.Z` ni **ìlà ìdarapọ̀ Mergify** (`.mergify.yml`);
**ọkọ̀-ìdarapọ̀ afọwọ́ṣe** tí a ṣàkọsílẹ̀ rẹ̀ ní ìsàlẹ̀ ni Ọ̀NÀ ÀFẸ́YÌNTÌ — a máa ń lò ó nígbà ìṣẹ̀lẹ̀,
ìdádúró ìtújáde, tàbí bí ètò Mergify Open Source bá yí padà láéláé.

## Ọ̀nà àìyípadà: ìlà Mergify

1. Àwọn ìpolongo ṣe àyẹ̀wò PR, wọ́n sì jẹ́rìí pé ó kọjá; lẹ́yìn náà, ẹnu-ọ̀nà ⭐
   ṣáájú ìdapọ̀ ti olùní fọwọ́ sí i (ìròyìn náà + ìpinnu lórí ohun kọ̀ọ̀kan — wo `/merge-prs` Ìgbésẹ̀ 0.75).
2. Olùní (tàbí ìpàdé tó ń ṣiṣẹ́ lórí ìpinnu olùní) fi àmì **`queue`**
   sí i. Àmì náà NI ìfọwọ́sí ìdapọ̀; Mergify kàn ń mú un ṣẹ.
3. Mergify ń fìdí àwọn PR tó wà ní ìlà múlẹ̀ **lọ́kọ̀ọ̀kan** (ọ̀kan lẹ́ẹ̀kan) pẹ̀lú àwọn ẹnu-ọ̀nà yíyára,
   ó sì ń darapọ̀ wọn (squash). Ṣíṣe ní àkójọpọ̀ + bisection aládàáṣiṣẹ́ jẹ́ ìpele Mergify tí a ń sanwó fún
   ("Cannot use Merge Queue batch" lórí ètò ọ̀fẹ́, #7220), nítorí náà `.mergify.yml` kò ṣètò
   `batch_size` kankan; ṣíṣe ní àkójọpọ̀ ṣì jẹ́ iṣẹ́ merge-train afọwọ́ṣe tó wà nísàlẹ̀. PR tí
   àwọn àyẹ̀wò rẹ̀ ṣì ń dúró lẹ́yìn `checks_timeout` (240 min = 2× p95 tí a wọ̀n fún
   `quality.yml`) ni a máa yọ kúrò ní ìlà dípò kí ó dí ìlà náà dúró.
4. Lẹ́yìn ìdapọ̀, ìṣàn-iṣẹ́ continuous release-green máa ń fìdí tip tuntun múlẹ̀ nígbà push,
   ó sì máa ń ṣí issue ìtọ́kasí-orísun tí àkójọpọ̀ náà bá fà á padà sẹ́yìn (kì í ṣe auto-revert láé).

Àwọn ìlànà ààbò (tó ṣe àfihàn àwọn Òfin Gíga `CLAUDE.md` #21/#22):

- **Ìdádúró release wà ní ṣiṣi** → má ṣe fi àmì sí àwọn PR tó ń dojú kọ branch tí a ti dá dúró; kọ́kọ́
  yí ibi-afẹ́ wọn padà sí `release/vX+1` tó ń ṣiṣẹ́.
- **PR ìpàdé mìíràn tó ṣì ń lọ lọ́wọ́** → má ṣe fi àmì sí i láé; ìpàdé tó ni í nìkan ló lè fi
  iṣẹ́ tirẹ̀ sínú ìlà.
- Àwọn diff ti ìdánwò-nìkan àti àwọn PR tó ní àmì `hotfix` ti ń ṣiṣẹ́ CI tí a dín kù tẹ́lẹ̀ (wo
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); àwọn ipò ìlà náà máa ń gba èyíkéyìí
  nínú àkójọpọ̀ àyẹ̀wò tó ṣiṣẹ́ ní ti gidi (`#check-failure=0` + `#check-pending=0`).

## Ọ̀nà àfẹ́yìntì: ọkọ̀-ìdarapọ̀ afọwọ́ṣe

A máa ń lò ó nígbà tí ìlà kò bá sí. Èyí sọ ọ̀nà ìṣe tó mú kí PR 33 parí
ní ọjọ́ kan ṣoṣo lákòókò ìyípo v3.8.47 di ìlànà:

1. **Kó batch náà jọ** (~10–30 PR tí a ti ṣàyẹ̀wò+tí a sì ti fọwọ́ sí). Ṣàyẹ̀wò ìkọlù `linked:`
   (`tap.testFiles` kan náà, àwọn hunk CHANGELOG kan náà), kí o sì tò wọ́n láti ṣiṣẹ́ lọ́kọ̀ọ̀kan.
2. **Fìdí rẹ̀ múlẹ̀ LẸ́Ẹ̀KAN ṢOṢO**: nínú worktree àdádó láti tip ìtújáde, darapọ̀ gbogbo
   head batch ní agbègbè ẹrọ náà, lẹ́yìn náà ṣiṣẹ́ suite tó dọ́gba pẹ̀lú ti ìtújáde
   (`npm run check:release-green`, fi `--with-build` kún un ṣáájú ìtújáde).
   `scripts/release/merge-train.sh <base> <PR#>…` ń ṣe àwọn ìgbésẹ̀ 1–2 láìfọwọ́ṣe (àwọn
   PR tó ní ìkọlù máa jáde, ọkọ̀ náà á sì tẹ̀síwájú). Full mode ń ṣiṣẹ́ `npm run test:unit` — runner
   tí a ti ṣètò fún box (`--test-concurrency=20`), **kì í ṣe** CI shard 4-core méjì tó ń ṣiṣẹ́
   lẹ́sẹẹsẹ, èyí tó mú kí ipele tó tóbi jù lọ lo nǹkan bí ~25% ti box 16-core kan (a tún un ṣe
   2026-07-18). `--fast` (fún píparí mega-train láàárín ọjọ́, olówó fọwọ́ sí i 2026-07-18)
   pa gbogbo static gate + vitest mọ́ ṣùgbọ́n ó ń ṣiṣẹ́ kìkì àwọn fáìlì node:test tí àwọn
   PR tó wọ ọkọ̀ yí padà; FULL suite ṣì gbọ́dọ̀ ṣiṣẹ́ ó kéré tán lẹ́ẹ̀kan lójúmọ́ lórí
   tip tí a ti kójọ (ọkọ̀ kan láìsí `--fast`).
3. **Àwọ̀ ewé** → darapọ̀ àwọn PR náà lẹ́sẹẹsẹ (máa tún `state,headRefOid` yẹ̀wò ṣáájú ọ̀kọ̀ọ̀kan —
   PR tí head rẹ̀ ti yí padà gbọ́dọ̀ padà sínú àyẹ̀wò). Ṣe ẹ̀rí pé net diff ti ìdarapọ̀ kọ̀ọ̀kan jẹ́
   àyípadà PR náà fúnra rẹ̀ (má ṣe auto-resolve àwọn revert: ṣàyẹ̀wò `git diff --stat` fún
   àwọn ìparẹ́ tí kò sí láàárín ààlà iṣẹ́).
4. **Pupa** → pín batch náà sí ìdajì (fìdí ìdajì kọ̀ọ̀kan múlẹ̀) dípò ṣíṣe ìfìdímúlẹ̀-àtúnsẹ
   lọ́kọ̀ọ̀kan; da PR tó fa ìṣòro padà sí ìlà àyẹ̀wò pẹ̀lú ẹ̀rí náà.
5. **Má ṣe láéláé**: darapọ̀ sínú branch tí a dá dúró nígbà ìdádúró; lo `git stash` níbikíbi;
   tún CI ṣiṣẹ́ láìyan títí kan ní ìrètí pé pupa yóò pòórá (òfin: pupa jẹ́ ìsọfúnni).

## Pípín sí àwọn ipele (ìdí tí ìlà fi ní ààbò pẹ̀lú fast-gates nìkan)

- **Fún PR kọ̀ọ̀kan** (àwọn fast-gates quality.yml): àwọn ìdánwò tí TIA ní ipa lórí + full unit 4-shard +
  vitest + lint bag + typecheck + ìdúróṣinṣin docs/changelog.
- **Fún batch/tip kọ̀ọ̀kan** (continuous release-green): àwọn HARD gate `--quick` lórí gbogbo push sí
  branch ìtújáde; àwọn ìṣàyẹ̀wò kíkún `--with-build --full-ci` ní ìgbà 3×/ọjọ́.
- **Fún ìtújáde kọ̀ọ̀kan** (ci.yml lórí PR ìtújáde): matrix kíkún pẹ̀lú E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Kò sí ohun tí a fìdí rẹ̀ múlẹ̀ díẹ̀ ju tẹ́lẹ̀ lọ — surface tó wuwo kàn ń ṣiṣẹ́ fún batch/tip kọ̀ọ̀kan
dípò fún PR kọ̀ọ̀kan, èyí sì ni ohun tó mú àwọn ìrìn-àjò padà-bọ̀ O(N) kúrò.

## Àwọn ohun àkọ́kọ́ tí fresh checkout nílò fún `merge-train.sh`

Script náà ń ṣiṣẹ́ **preflight** fail-fast lórí root checkout (ṣáájú iṣẹ́ worktree
èyíkéyìí) kí install tó bàjẹ́ má bàa lè fara hàn bí ọkọ̀ pupa:

1. `npm ci`, lẹ́yìn náà ṣiṣẹ́ postinstall `bun` tí npm dí lọ́wọ́:
   `(cd node_modules/bun && node install.js)` — bí bẹ́ẹ̀ kọ́, `check:provider-consistency`
   àti `check:known-symbols` (méjèèjì jẹ́ `bun scripts/…`) yóò kùnà lórí ọkọ̀ náà ÀTI base láìsí
   ìlà violation.
2. Kò gbọ́dọ̀ sí `node_modules/node_modules` aláìnílé (igi dependency àdáwòkọ; React á load lẹ́ẹ̀mejì
   àwọn suite UI vitest á sì kùnà lẹ́sẹ̀kẹsẹ̀).
3. `node_modules/.bin/tsc` gbọ́dọ̀ wà, kí ó sì ṣeé ṣiṣẹ́ (install tí kò pé kò ní í).

Ọkọ̀ náà ń ṣiṣẹ́ `npm run check:cycles:ratchet` tó ń dí ọ̀nà; `npm run check:cycles`
lásán jẹ́ ìmọ̀ràn (ó ń to àwọn SCC jáde, ó sì ń jáde pẹ̀lú non-zero àní lórí base tó ní ìlera).
