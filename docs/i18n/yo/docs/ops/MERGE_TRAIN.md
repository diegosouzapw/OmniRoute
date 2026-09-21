# Merge Queue & Manual Merge-Train Runbook (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Láti v3.8.49 (WS3.2/WS3.4 ti ètò quality/velocity), ọ̀nà ìdapọ̀ àìyípadà fún
àwọn PR tí a ti ṣàyẹ̀wò sínú `release/vX.Y.Z` ni **ìlà ìdapọ̀ Mergify** (`.mergify.yml`);
**ọkọ̀-ìdapọ̀ afọwọ́ṣe** tí a ṣàkọsílẹ̀ rẹ̀ nísàlẹ̀ ni Ọ̀NÀ ÀFẸ́YINTÌ — a máa ń lò ó nígbà ìṣẹ̀lẹ̀,
ìdádúró ìtújáde, tàbí bí ètò Mergify Open Source bá yí padà láéláé.

## Ọ̀nà àìyípadà: ìlà Mergify

1. Àwọn campaigns ti ṣàyẹ̀wò PR náà/tan ìmọ́lẹ̀ ewé fún un, ẹni tó ni í sì ti fọwọ́ sí i nípasẹ̀ ibodè ⭐
   ṣáájú-ìdapọ̀ (ìròyìn náà + ìpinnu fún ohun kọ̀ọ̀kan — wo `/merge-prs` Ìgbésẹ̀ 0.75).
2. Ẹni tó ni í (tàbí session tó ń ṣiṣẹ́ lórí ìpinnu ẹni tó ni í) fi àmì **`queue`**
   sí i. Àmì náà NI ìfọwọ́sí ìdapọ̀ náà; Mergify kàn ń mú un ṣẹ.
3. Mergify kó tó àwọn PR 10 tí ó wà ní ìlà pọ̀, ó fìdí batch náà múlẹ̀ pẹ̀lú àwọn fast-gates,
   ó sì dapọ̀ wọn (squash). Batch pupa kan ni a máa **pín sí méjì láìfọwọ́ṣe** — PR tó fa ìṣòro
   ni a máa ya sọ́tọ̀ ní nǹkan bí àtúṣàyẹ̀wò log2(N), a ó sì yọ ọ́ kúrò ní ìlà; àwọn yòókù á tẹ̀síwájú.
4. Lẹ́yìn ìdapọ̀, workflow release-green aláìdáwọ́dúró yóò fìdí tip tuntun múlẹ̀ nígbà push
   yóò sì ṣí issue ìtọ́kasí ẹni tó fà á bí àpapọ̀ náà bá fa ìfàsẹ́yìn (kò ní ṣe auto-revert láé).

Àwọn ìlànà ààbò (àwòkọ `CLAUDE.md` Àwọn Òfin Líle #21/#22):

- **Ìdádúró ìtújáde wà ní ṣíṣí** → MÁ ṢE fi àmì sí àwọn PR tó ń tọ́ka sí branch tí a dá dúró; kọ́kọ́ tún wọn tọ́ka sí
  `release/vX+1` tó ń ṣiṣẹ́.
- **PR session mìíràn tó ń lọ lọ́wọ́** → má ṣe fi àmì sí i láé; session tó ni í nìkan ló lè fi iṣẹ́ tirẹ̀
  sínú ìlà.
- Àwọn diff ìdánwò-nìkan àti àwọn PR tó ní àmì `hotfix` ti ń ṣiṣẹ́ CI tí a dín kù tẹ́lẹ̀ (wo
  `RELEASE_CHECKLIST.md` → Ọ̀nà Kíákíá Hotfix); àwọn ipò ìlà náà gba èyíkéyìí
  nínú àkójọpọ̀ check tó ṣiṣẹ́ ní ti gidi (`#check-failure=0` + `#check-pending=0`).

## Ọ̀nà àfẹ́yìntì: ọkọ̀-ìdapọ̀ afọwọ́ṣe

A máa ń lò ó nígbà tí ìlà kò bá sí lárọwọ́tó. Èyí sọ ìṣe tó parí àwọn PR 33 ní
ọjọ́ kan ṣoṣo nígbà cycle v3.8.47 di ìlànà:

1. **Kó batch náà jọ** (~àwọn PR 10–30 tí a ti ṣàyẹ̀wò+tẹ́wọ́ gbà). Ṣàyẹ̀wò àwọn ìkọlù `linked:`
   (`tap.testFiles` kan náà, àwọn hunk CHANGELOG kan náà), kí o sì tò àwọn wọ̀nyẹn lẹ́sẹẹsẹ.
2. **Fìdí rẹ̀ múlẹ̀ LẸ́Ẹ̀KAN ṢOṢO**: nínú worktree àdádó láti tip ìtújáde, dapọ̀ gbogbo head
   batch náà ní local, lẹ́yìn náà ṣiṣẹ́ suite tó bá ti ìtújáde mu
   (`npm run check:release-green`, fi `--with-build` kún un ṣáájú ìtújáde).
   `scripts/release/merge-train.sh <base> <PR#>…` ń ṣe àwọn ìgbésẹ̀ 1–2 láìfọwọ́ṣe (àwọn
   PR tó ní ìkọlù á jáde, ọkọ̀ náà á tẹ̀síwájú). Full mode ń ṣiṣẹ́ `npm run test:unit` — runner
   tí a ṣètò fún ẹ̀rọ náà (`--test-concurrency=20`), **kì í ṣe** CI shard 4-core méjì tó ń ṣiṣẹ́
   lẹ́sẹẹsẹ, èyí tó mú kí ipele tó ga jù lo ~25% ti ẹ̀rọ 16-core kan (a tún un ṣe
   2026-07-18). `--fast` (fífọ mega-train òní-kanna tán, ẹni tó ni í fọwọ́ sí i 2026-07-18)
   pa gbogbo static gate + vitest mọ́ ṣùgbọ́n ó ṣiṣẹ́ kìkì àwọn fáìlì node:test tí àwọn
   PR tó wọ ọkọ̀ yí padà; suite FULL gbọ́dọ̀ ṣì ṣiṣẹ́ ó kéré tán lẹ́ẹ̀kan lójoojúmọ́ lórí
   tip tí a ti kójọ (ọkọ̀ kan láìsí `--fast`).
3. **Ewé** → dapọ̀ àwọn PR náà lẹ́sẹẹsẹ (máa tún `state,headRefOid` ṣàyẹ̀wò ṣáájú ọ̀kọ̀ọ̀kan —
   PR tí head rẹ̀ ti yí padà yóò padà sínú ìlà àyẹ̀wò). Ṣàrídájú pé net diff ti ìdapọ̀ kọ̀ọ̀kan ni
   àyípadà PR náà fúnra rẹ̀ (kò sí auto-resolve revert: ṣàyẹ̀wò `git diff --stat` fún
   àwọn ìparẹ́ tí kò sí nínú scope).
4. **Pupa** → pín batch náà sí ìdajì méjì (fìdí ìdajì kọ̀ọ̀kan múlẹ̀) dípò ṣíṣe àtúṣàyẹ̀wò
   lọ́kọ̀ọ̀kan; dá PR tó fa ìṣòro padà sínú ìlà àyẹ̀wò pẹ̀lú ẹ̀rí náà.
5. **Má ṣe láé**: dapọ̀ sínú branch tí a dá dúró nígbà ìdádúró; lo `git stash` ní ibikíbi;
   tún CI ṣiṣẹ́ lápapọ̀ pẹ̀lú ìrètí pé pupa yóò pòórá (òfin: pupa jẹ́ ìwífún).

## Ìpín sí ìpele (ìdí tí ìlà náà fi ní ààbò pẹ̀lú fast-gates nìkan)

- **Fún PR kọ̀ọ̀kan** (quality.yml fast-gates): àwọn ìdánwò tí TIA ní ipa lórí + full unit 4-shard +
  vitest + lint bag + typecheck + ìdúróṣinṣin docs/changelog.
- **Fún batch/tip kọ̀ọ̀kan** (continuous release-green): àwọn ibodè LÍLE `--quick` lórí gbogbo push sí
  branch ìtújáde; àyẹ̀wò kíkún `--with-build --full-ci` ní ìgbà 3/lọ́jọ́.
- **Fún ìtújáde kọ̀ọ̀kan** (ci.yml lórí PR ìtújáde): matrix pípé tó ní E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets.

Kò sí ohun tí a ń fìdí múlẹ̀ díẹ̀ ju ti tẹ́lẹ̀ lọ — surface tó wuwo náà kàn ń ṣiṣẹ́ fún batch/tip kọ̀ọ̀kan
dípò fún PR kọ̀ọ̀kan, èyí sì ni ohun tó yọ àwọn ìlọ-pàdépadà O(N) kúrò.
