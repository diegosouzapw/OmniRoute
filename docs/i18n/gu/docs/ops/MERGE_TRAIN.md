# Merge Queue & Manual Merge-Train Runbook (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49 (ગુણવત્તા/વેગ યોજનાનું WS3.2/WS3.4)થી સમીક્ષા કરાયેલા PRsને
`release/vX.Y.Z`માં મર્જ કરવા માટેનો ડિફૉલ્ટ માર્ગ **Mergify merge queue** (`.mergify.yml`) છે;
નીચે દસ્તાવેજિત **manual merge-train** એ FALLBACK છે — જેનો ઉપયોગ ઘટનાઓ દરમિયાન,
રિલીઝ ફ્રીઝ વખતે અથવા Mergify Open Source યોજના ક્યારેય બદલાય તો કરવામાં આવે છે.

## ડિફૉલ્ટ માર્ગ: Mergify ક્યૂ

1. અભિયાનો દ્વારા PRની સમીક્ષા થઈ છે/તે ગ્રીન છે અને માલિકના પ્રી-મર્જ ⭐
   ગેટ દ્વારા મંજૂર થયો છે (રિપોર્ટ + આઇટમ-દીઠ નિર્ણય — `/merge-prs`નું પગલું 0.75 જુઓ).
2. માલિક (અથવા માલિકના નિર્ણય અનુસાર કાર્ય કરતું સત્ર) **`queue`**
   લેબલ લાગુ કરે છે. આ લેબલ જ મર્જ મંજૂરી છે; Mergify માત્ર તેને અમલમાં મૂકે છે.
3. Mergify ક્યૂમાં રહેલા વધુમાં વધુ 10 PRsને બૅચ કરે છે, ફાસ્ટ-ગેટ્સ સામે બૅચને માન્ય કરે છે
   અને મર્જ (squash) કરે છે. રેડ બૅચનું **આપમેળે દ્વિભાજન થાય છે** — સમસ્યાકારક PRને
   ~log2(N) પુનઃમાન્યતાઓમાં અલગ કરીને ક્યૂમાંથી કાઢવામાં આવે છે; બાકીના આગળ વધે છે.
4. મર્જ પછી, continuous release-green વર્કફ્લો push પર નવી tipને માન્ય કરે છે
   અને સંયોજનમાં રિગ્રેશન થયું હોય તો attribution issue ખોલે છે (ક્યારેય auto-revert કરતું નથી).

સુરક્ષા નિયમો (`CLAUDE.md`ના Hard Rules #21/#22ને પ્રતિબિંબિત કરે છે):

- **રિલીઝ ફ્રીઝ ચાલુ હોય** → ફ્રીઝ કરેલી બ્રાન્ચને લક્ષ્ય કરતા PRsને લેબલ કરશો નહીં; પહેલાં
  સક્રિય `release/vX+1` તરફ ફરીથી લક્ષિત કરો.
- **બીજા સત્રનો પ્રક્રિયામાં રહેલો PR** → તેને ક્યારેય લેબલ કરશો નહીં; માત્ર માલિકી ધરાવતું સત્ર
  પોતાનું કાર્ય ક્યૂમાં મૂકે છે.
- માત્ર-ટેસ્ટ્સ ડિફ્સ અને `hotfix` લેબલવાળા PRs પહેલેથી જ ઘટાડેલું CI ચલાવે છે
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane જુઓ); ક્યૂની શરતો વાસ્તવમાં ચાલેલા
  કોઈપણ ચેક સેટને સ્વીકારે છે (`#check-failure=0` + `#check-pending=0`).

## ફૉલબૅક: manual merge-train

ક્યૂ ઉપલબ્ધ ન હોય ત્યારે તેનો ઉપયોગ થાય છે. આ એ પ્રથાને નિયમબદ્ધ કરે છે જેણે v3.8.47 ચક્ર દરમિયાન
એક દિવસમાં 33 PRsનો નિકાલ કર્યો હતો:

1. **બૅચ તૈયાર કરો** (~10–30 સમીક્ષિત+મંજૂર PRs). `linked:` અથડામણો
   (સમાન `tap.testFiles`, સમાન CHANGELOG hunks) તપાસો અને તેમને ક્રમશઃ ચલાવો.
2. **માત્ર એક વાર માન્ય કરો**: રિલીઝ tip પરથી અલગ કરેલી worktreeમાં બૅચના તમામ
   headsને સ્થાનિક રીતે મર્જ કરો, ત્યારબાદ રિલીઝ-સમકક્ષ સ્યુટ ચલાવો
   (`npm run check:release-green`, રિલીઝ પહેલાં `--with-build` ઉમેરો).
   `scripts/release/merge-train.sh <base> <PR#>…` પગલાં 1–2ને સ્વચાલિત કરે છે (અથડાતા
   PRs બહાર નીકળી જાય છે અને ટ્રેન ચાલુ રહે છે). સંપૂર્ણ મોડ `npm run test:unit` ચલાવે છે —
   બૉક્સ માટે ટ્યુન કરેલો રનર (`--test-concurrency=20`), **નહીં કે** બે અનુક્રમિક 4-core CI
   shards, જેણે 16-core બૉક્સ પર મુખ્ય તબક્કો ~25% પર ચલાવ્યો હતો (2026-07-18ના રોજ
   સુધારવામાં આવ્યું). `--fast` (એક જ દિવસમાં mega-train નિકાલ, 2026-07-18ના રોજ માલિક દ્વારા મંજૂર)
   દરેક static gate + vitest જાળવે છે, પરંતુ માત્ર બોર્ડ થયેલા PRs દ્વારા બદલાયેલી node:test ફાઇલો
   ચલાવે છે; એકત્રિત tip પર FULL સ્યુટ હજી પણ દિવસમાં ઓછામાં ઓછો એક વખત ચાલવો જ જોઈએ
   (`--fast` વિનાની એક ટ્રેન).
3. **ગ્રીન** → PRsને ક્રમમાં મર્જ કરો (દરેક પહેલાં `state,headRefOid` ફરી તપાસીને —
   જે PRનું head બદલાયું હોય તે ફરીથી સમીક્ષામાં જાય છે). સાબિત કરો કે દરેક મર્જનો net diff
   PRનો પોતાનો ફેરફાર જ છે (કોઈ auto-resolve reverts નહીં: વ્યાપની બહારના કાઢી નાખેલા ભાગો માટે
   `git diff --stat`નું ઑડિટ કરો).
4. **રેડ** → એક પછી એક ફરીથી માન્ય કરવાને બદલે બૅચને અડધા ભાગોમાં દ્વિભાજિત કરો
   (દરેક અડધા ભાગને માન્ય કરો); પુરાવા સાથે સમસ્યાકારક PRને ફરી review queueમાં મૂકો.
5. **ક્યારેય નહીં**: ફ્રીઝ દરમિયાન ફ્રીઝ કરેલી બ્રાન્ચમાં મર્જ કરવું; ક્યાંય પણ `git stash`;
   રેડ દૂર થઈ જશે એવી આશામાં સમગ્ર CI ફરી ચલાવવું (નિયમ: રેડ એ માહિતી છે).

## સ્તરીકરણ (માત્ર fast-gates સાથે ક્યૂ શા માટે સુરક્ષિત છે)

- **PR દીઠ** (quality.yml fast-gates): TIAથી પ્રભાવિત ટેસ્ટ્સ + સંપૂર્ણ unit 4-shard +
  vitest + lint bag + typecheck + docs/changelog integrity.
- **બૅચ/tip દીઠ** (continuous release-green): રિલીઝ બ્રાન્ચ પરના દરેક push માટે `--quick`
  HARD gates; દિવસમાં 3 વખત સંપૂર્ણ `--with-build --full-ci` sweeps.
- **રિલીઝ દીઠ** (રિલીઝ PR પર ci.yml): E2E ×9 સહિત સંપૂર્ણ matrix,
  package-artifact + tarball boot-smoke, coverage/ratchets.

પહેલાં કરતાં કંઈપણ ઓછું માન્ય કરવામાં આવતું નથી — ભારે સપાટી માત્ર દરેક PRને બદલે
દરેક બૅચ/tip માટે ચાલે છે, અને આ જ O(N) round-trips દૂર કરે છે.
