# Merge Queue & Manual Merge-Train Runbook (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

v3.8.49થી (ગુણવત્તા/વેગ યોજનાના WS3.2/WS3.4) સમીક્ષા કરાયેલા PRsને
`release/vX.Y.Z`માં મર્જ કરવા માટેનો ડિફૉલ્ટ માર્ગ **Mergify merge queue** (`.mergify.yml`) છે;
નીચે દસ્તાવેજીકૃત **મેન્યુઅલ merge-train** એ FALLBACK છે — તેનો ઉપયોગ ઘટનાઓ દરમિયાન,
રિલીઝ ફ્રીઝ વખતે અથવા Mergify Open Source પ્લાન ક્યારેય બદલાય ત્યારે થાય છે.

## ડિફૉલ્ટ પાથ: Mergify કતાર

1. PRની campaigns દ્વારા સમીક્ષા કરવામાં આવી છે/તેને ગ્રીન સિગ્નલ આપવામાં આવ્યું છે અને માલિકના પ્રી-મર્જ ⭐
   ગેટ દ્વારા મંજૂરી આપવામાં આવી છે (રિપોર્ટ + દરેક આઇટમ માટેનો નિર્ણય — `/merge-prs` પગલું 0.75 જુઓ).
2. માલિક (અથવા માલિકના નિર્ણય પર કાર્યરત સત્ર) **`queue`**
   લેબલ લાગુ કરે છે. આ લેબલ જ મર્જની મંજૂરી છે; Mergify માત્ર તેનો અમલ કરે છે.
3. Mergify કતારમાં રહેલા PRને ફાસ્ટ-ગેટ્સ સામે **ક્રમશઃ** (એક સમયે એક) માન્ય કરે છે
   અને મર્જ (squash) કરે છે. બેચિંગ + આપમેળે બાઇસેક્શન એ Mergifyનું પેઇડ ટિયર છે
   (ફ્રી પ્લાન પર "Cannot use Merge Queue batch", #7220), તેથી `.mergify.yml`માં
   `batch_size` સેટ કરેલું નથી; બેચિંગ નીચે આપેલી મેન્યુઅલ મર્જ-ટ્રેનનું કાર્ય રહે છે. જે PRની
   ચકાસણીઓ `checks_timeout` (240 મિનિટ = `quality.yml`ના માપેલા p95 કરતાં 2×) પછી પણ
   બાકી હોય, તેને કતાર અટકાવવાને બદલે કતારમાંથી દૂર કરવામાં આવે છે.
4. મર્જ પછી, સતત release-green વર્કફ્લો push વખતે નવી tipને માન્ય કરે છે
   અને જો સંયોજનમાં રિગ્રેશન થયું હોય તો એટ્રિબ્યુશન ઇશ્યૂ ખોલે છે (ક્યારેય આપમેળે રિવર્ટ કરતું નથી).

સુરક્ષા નિયમો (`CLAUDE.md`ના કડક નિયમો #21/#22ને પ્રતિબિંબિત કરે છે):

- **રિલીઝ ફ્રીઝ ખુલ્લું છે** → ફ્રોઝન બ્રાન્ચને લક્ષ્ય બનાવતા PRને લેબલ કરશો નહીં; પહેલાં
  તેને સક્રિય `release/vX+1` પર ફરીથી લક્ષિત કરો.
- **અન્ય સત્રનો પ્રગતિમાં રહેલો PR** → તેને ક્યારેય લેબલ કરશો નહીં; માત્ર માલિકી ધરાવતું સત્ર
  પોતાના કાર્યને કતારમાં મૂકે છે.
- માત્ર ટેસ્ટવાળા diffs અને `hotfix` લેબલ ધરાવતા PR પહેલેથી જ ઘટાડેલી CI ચલાવે છે
  (`RELEASE_CHECKLIST.md` → Hotfix Fast-Lane જુઓ); કતારની શરતો વાસ્તવમાં ચાલેલા
  કોઈપણ ચેક સેટને સ્વીકારે છે (`#check-failure=0` + `#check-pending=0`).

## ફૉલબૅક: મેન્યુઅલ merge-train

ક્યૂ ઉપલબ્ધ ન હોય ત્યારે તેનો ઉપયોગ થાય છે. આ તે પ્રથાને સંહિતાબદ્ધ કરે છે જેણે v3.8.47 ચક્ર દરમિયાન
એક જ દિવસમાં 33 PRs પૂર્ણ કર્યા હતા:

1. **બૅચ તૈયાર કરો** (~10–30 સમીક્ષિત+મંજૂર PRs). `linked:` અથડામણો
   (સમાન `tap.testFiles`, સમાન CHANGELOG હંક્સ) તપાસો અને તેમને ક્રમશઃ ચલાવો.
2. **માત્ર એક વાર માન્ય કરો**: રિલીઝ ટિપ પરથી બનાવેલા એક અલગ worktreeમાં બૅચના બધા
   હેડ્સ સ્થાનિક રીતે મર્જ કરો, પછી રિલીઝ-સમકક્ષ સ્યુટ ચલાવો
   (`npm run check:release-green`, રિલીઝ પહેલાં `--with-build` ઉમેરો).
   `scripts/release/merge-train.sh <base> <PR#>…` પગલાં 1–2ને સ્વચાલિત કરે છે (અથડાતા
   PRs બહાર થઈ જાય છે, ટ્રેન ચાલુ રહે છે). ફુલ મોડ `npm run test:unit` ચલાવે છે —
   બૉક્સ માટે ટ્યૂન કરેલું રનર (`--test-concurrency=20`), **નહીં કે** બે ક્રમિક 4-કોર CI
   શાર્ડ્સ, જેના કારણે મુખ્ય તબક્કો 16-કોર બૉક્સના ~25% પર ચાલતો હતો (2026-07-18ના રોજ
   સુધારાયું). `--fast` (એક જ દિવસમાં mega-train પૂર્ણ કરવા માટે, માલિક દ્વારા
   2026-07-18ના રોજ મંજૂર) દરેક સ્ટેટિક ગેટ + vitest જાળવે છે પરંતુ માત્ર બોર્ડ થયેલા
   PRs દ્વારા બદલાયેલી node:test ફાઇલો જ ચલાવે છે; સંચિત ટિપ પર FULL સ્યુટ હજી પણ
   દિવસમાં ઓછામાં ઓછું એક વખત ચાલવું આવશ્યક છે (`--fast` વગરની એક ટ્રેન).
3. **ગ્રીન** → PRsને ક્રમમાં મર્જ કરો (દરેક પહેલાં `state,headRefOid` ફરી તપાસીને —
   જે PRનો હેડ બદલાયો હોય તે ફરી સમીક્ષામાં પ્રવેશે છે). સાબિત કરો કે દરેક મર્જનો
   નેટ ડિફ તે PRનો પોતાનો જ ફેરફાર છે (કોઈ auto-resolve રિવર્ટ નહીં: કાર્યક્ષેત્ર બહારના
   કાઢી નાખેલા ભાગો માટે `git diff --stat`નું ઑડિટ કરો).
4. **રેડ** → એક-એક કરીને ફરી માન્ય કરવાને બદલે બૅચને અડધા ભાગોમાં વહેંચો
   (દરેક અડધાને માન્ય કરો); પુરાવા સાથે સમસ્યાજનક PRને ફરી સમીક્ષા ક્યૂમાં મોકલો.
5. **ક્યારેય નહીં**: ફ્રીઝ દરમિયાન ફ્રીઝ કરેલી બ્રાન્ચમાં મર્જ કરવું; ક્યાંય પણ `git stash`
   કરવું; રેડ અદૃશ્ય થઈ જશે એવી આશાએ CIને અંધાધૂંધ ફરી ચલાવવું (નિયમ: રેડ એ માહિતી છે).

## સ્તરીકરણ (માત્ર ફાસ્ટ-ગેટ્સ સાથે ક્યૂ કેમ સુરક્ષિત છે)

- **દરેક PR દીઠ** (quality.yml ફાસ્ટ-ગેટ્સ): TIA-પ્રભાવિત ટેસ્ટ્સ + સંપૂર્ણ યુનિટ 4-શાર્ડ +
  vitest + lint બૅગ + typecheck + docs/changelogની અખંડિતતા.
- **દરેક બૅચ/ટિપ દીઠ** (સતત release-green): રિલીઝ બ્રાન્ચના દરેક પુશ પર `--quick`
  HARD ગેટ્સ; દિવસમાં 3 વખત સંપૂર્ણ `--with-build --full-ci` સ્વીપ્સ.
- **દરેક રિલીઝ દીઠ** (રિલીઝ PR પર ci.yml): E2E ×9 સહિતનું સંપૂર્ણ મેટ્રિક્સ,
  package-artifact + tarball boot-smoke, coverage/ratchets.

પહેલાંની સરખામણીમાં કોઈપણ વસ્તુ ઓછી માન્ય થતી નથી — ભારે સપાટી ફક્ત દરેક PRને બદલે
દરેક બૅચ/ટિપ પર ચાલે છે, અને આ જ O(N) રાઉન્ડ-ટ્રિપ્સ દૂર કરે છે.

## `merge-train.sh` માટે ફ્રેશ-ચેકઆઉટ પૂર્વજરૂરિયાતો

સ્ક્રિપ્ટ રૂટ ચેકઆઉટ પર (કોઈપણ worktree કાર્ય પહેલાં) fail-fast **preflight** ચલાવે છે,
જેથી ખામીયુક્ત ઇન્સ્ટોલ ક્યારેય રેડ ટ્રેન તરીકે ભ્રામક રીતે રજૂ ન થઈ શકે:

1. `npm ci`, ત્યારબાદ npm દ્વારા અવરોધિત `bun` postinstall ચલાવો:
   `(cd node_modules/bun && node install.js)` — અન્યથા `check:provider-consistency`
   અને `check:known-symbols` (બંને `bun scripts/…`) ટ્રેન અને બેઝ બંને પર
   કોઈ ઉલ્લંઘન લાઇન વિના નિષ્ફળ જાય છે.
2. કોઈ અનિચ્છિત `node_modules/node_modules` ન હોવું જોઈએ (ડુપ્લિકેટ dependency tree; React બે વાર
   લોડ થાય છે અને UI vitest સ્યુટ્સ તરત જ નિષ્ફળ જાય છે).
3. `node_modules/.bin/tsc` હાજર અને executable હોવું જોઈએ (આંશિક ઇન્સ્ટોલમાં તે હોતું નથી).

ટ્રેન અવરોધક `npm run check:cycles:ratchet` ચલાવે છે; માત્ર `npm run check:cycles`
સલાહરૂપ છે (તે SCCsની યાદી આપે છે અને સ્વસ્થ બેઝ પર પણ non-zero સાથે બહાર નીકળે છે).
