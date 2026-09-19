# Admission lanes (#9654) — two lane systems, what gates each, where each reports (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRouteમાં અલગ-અલગ વ્યાપ ધરાવતી **બે** પ્રોસેસ-લોકલ લેન સિસ્ટમ્સ છે. તે
એકબીજાની પૂરક છે; ઑપરેટર્સને જાણ હોવી જોઈએ કે તેઓ કઈ સિસ્ટમ જોઈ રહ્યા છે.

## 1. બાઇટ-સ્તરની સમગ્ર-પ્રક્રિયા પ્રવેશ-મર્યાદા (`chatBodyAdmission.ts`)

- **વ્યાપ:** `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` અને અન્ય ચેટ-આકારના રૂટ્સ માટેનો બફર કરેલ-બોડી/હીપ પાથ. મોટા કોડિંગ-એજન્ટ બોડીઝથી થતા હીપ એમ્પ્લિફિકેશન સામે રક્ષણ આપે છે (#4380).
- **દરેક કી માટે અલગ લેન નહીં, પરંતુ એક પ્રક્રિયા-વ્યાપી વૈશ્વિક કંટ્રોલર (#10110).** દરેક API કી
  (હેશ કરેલી) અથવા `anonymous` સેશન **સમાન** સહિયારા બજેટ સામે પ્રવેશ મેળવે છે —
  હેશ કરેલી સેશન id નો ઉપયોગ ફક્ત નિષ્પક્ષતા શેડ્યૂલિંગ કી તરીકે થાય છે (પ્રતીક્ષારત વિનંતીઓમાં
  રાઉન્ડ-રોબિન ડિસ્પેચ), ક્ષમતાના શાર્ડ તરીકે ક્યારેય નહીં. આ દસ્તાવેજના અગાઉના સંસ્કરણમાં
  સ્વતંત્ર ક્ષમતા ધરાવતી દરેક કી માટે અલગ લેનનું વર્ણન હતું; તે મોડેલને
  #10110 માં દૂર કરવામાં આવ્યું, કારણ કે તે બિનપ્રમાણિત નકલી ક્રેડેન્શિયલ્સને
  પ્રક્રિયા-વ્યાપી મર્યાદાને ગુણાકારે વધારવા દેતું હતું.
- **ગેટ (#503-fanout): આપમેળે નિર્ધારિત થતું ઇનજેસ્ટ BYTE બજેટ, નિશ્ચિત વિનંતી
  સંખ્યા નહીં.** જૂની `CHAT_MAX_HEAVY_IN_FLIGHT` વિનંતી-સંખ્યા મર્યાદા (આ સુધારા
  પહેલાં ડિફૉલ્ટ `1`) કોડિંગ-એજન્ટ ફૅન-આઉટ (બહુવિધ સબએજન્ટ્સ/CLIs,
  સામાન્ય રીતે > 256 KB બોડીઝ)ને ~1 ની અસરકારક સમકાલીનતા સુધી સીમિત કરતી હતી, જેના કારણે
  સંપૂર્ણપણે સામાન્ય લોડ હેઠળ 503 મળતું હતું. હવે તે માત્ર ત્યારે જ લાગુ પડે છે જ્યારે ઑપરેટર સ્પષ્ટપણે
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` સેટ કરે. તેને અનસેટ રાખવામાં આવે ત્યારે, પ્રવેશને તેના બદલે
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` દ્વારા નિયંત્રિત કરવામાં આવે છે — પ્રક્રિયાની વાસ્તવિક
  મેમરી મર્યાદામાંથી આપમેળે નિર્ધારિત થતું બજેટ (`src/shared/middleware/admissionBudget.ts`):
  V8 હીપ મર્યાદા અને કોઈપણ cgroup/container મર્યાદામાંથી વધુ કડક મર્યાદાના 25%ને,
  8x ક્ષણિક-એમ્પ્લિફિકેશન પરિબળથી ભાગીને, 8 MiB અને
  2 GiB વચ્ચે ક્લેમ્પ કરવામાં આવે છે. સ્પષ્ટ ઓવરરાઇડ્સ સમાન ક્લેમ્પ્સનો ઉપયોગ કરે છે. આ કોઈ env ટ્યુનિંગ વિના
  512 MB container થી 32 GB desktop સુધી પોતાને સ્કેલ કરે છે. અસરકારક બજેટમાં
  સમાઈ ન શકે તેવી બોડી `413 body_exceeds_budget` સાથે તરત નિષ્ફળ જાય છે;
  વ્યક્તિગત રીતે સેવા આપી શકાય તેવી બોડીઝ વચ્ચેનો વિવાદ જ મર્યાદિત
  નિષ્પક્ષતા કતારમાં પ્રવેશે છે. જીવંત બહુ-સિગ્નલ સંસાધન-દબાણ ટ્રૅકર (V8 હીપ ગુણોત્તર,
  cgroup, PSI, OOM ઘટનાઓ — `open-sse/utils/resourcePressurePolicy.ts`) `high`
  દબાણ હેઠળ મર્યાદિત પ્રતીક્ષા ઘટાડે છે અને કોઈપણ બાઇટ્સ ઇનજેસ્ટ થાય તે પહેલાં
  `critical` દબાણ હેઠળ `503 resource_pressure` સાથે તરત જ લોડ ઘટાડે છે.
  PSI ઉપલબ્ધ હોય ત્યારે આ યુનિટના cgroup `memory.pressure` માંથી વાંચવામાં આવે છે
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory`
  સમગ્ર હોસ્ટ માટે છે અને માત્ર બેર મેટલ / cgroup v1 પર ફૉલબૅક તરીકે વપરાય છે, જેથી સ્વૅપિંગ
  હોસ્ટ નિષ્ક્રિય containerને 503 ન કરાવી શકે.
- **ટ્યુનિંગ:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — આપમેળે નિર્ધારિત બાઇટ બજેટ માટેનો ઓવરરાઇડ
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — જૂની વિનંતી-સંખ્યા મર્યાદા, માત્ર સ્પષ્ટ પસંદગીથી સક્રિય
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 પહેલાં કતાર-પ્રતીક્ષા (ડિફૉલ્ટ 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — કતારબદ્ધ-બાઇટ્સ માટેનો હીપ વાલ્વ (ડિફૉલ્ટ 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 થી અપ્રચલિત
    no-ops (કૉન્ફિગ સુસંગતતા માટે સ્વીકારવામાં આવે છે, અવગણવામાં આવે છે)
- **રિપોર્ટ્સ:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — જેમાં
  #503-fanout ના વધારાઓ `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, અને `countCapEnabled`
  સામેલ છે (ડિફૉલ્ટ ડિપ્લોયમેન્ટ પર false — આ પુષ્ટિ કરે છે કે વાસ્તવમાં બાઇટ બજેટ જ
  મર્યાદા લાગુ કરે છે, જૂની સંખ્યા મર્યાદા નહીં).

## 2. અનુકૂલનશીલ રનટાઇમ વર્ચ્યુઅલ લેન (`open-sse/services/admission`)

- **વ્યાપ:** પ્રદાતા ડિસ્પેચ માટે tenant-key એડમિશન — ક્યૂ ખર્ચ, લેટન્સી-માર્ગદર્શિત
  મર્યાદા અનુકૂલન, લેન ક્યૂઇંગ અને લેન મેટ્રિક્સ.
- **ગેટ:** **ઑપ્ટ-ઇન.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` ન હોય ત્યાં સુધી અક્ષમ રહે છે. તેના વિના,
  અનુકૂલનશીલ કંટ્રોલર શેર કરેલી ક્યૂનું વર્તન જાળવી રાખે છે (#9654નો માપદંડ 1 માત્ર
  ઑપરેટર લેન સક્ષમ કરે ત્યાર પછી જ પૂર્ણ થાય છે).
- **ટ્યુનિંગ:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + અનુકૂલનશીલ કૉન્ફિગ (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **રિપોર્ટ્સ:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (અપારદર્શક લેન IDs, ક્યારેય મૂળ
  કી નહીં), અને `virtualLanes` — સ્નેપશૉટમાં "લેન્સ ચાલુ છે" દર્શાવતો અધિકૃત ફ્લૅગ.

## 3. ફૅન-આઉટ પ્રોબ્સ — કૉમ્બો/ફ્યુઝન માટે પ્રતિ-ટાર્ગેટ એડમિશન (#9654 Wave 2)

કૉમ્બો (પ્રાથમિકતા / રાઉન્ડ-રોબિન) અને ફ્યુઝન એક પેરન્ટ વિનંતી હેઠળ N મૉડલ ટાર્ગેટ્સને
ફૅન-આઉટ કરે છે. #9654 Wave 2થી, **દરેક ફૅન-આઉટ ટાર્ગેટને ડિસ્પેચ પહેલાં ગેટ કરવામાં આવે છે**
**પેરન્ટની** tenant લેન સામેના પ્રતિ-ટાર્ગેટ પ્રોબ (`PerTargetAdmissionHook`, જેને
`createPerTargetAdmissionHook` દ્વારા બનાવવામાં આવે છે) વડે.

- **વ્યાપ:** કૉમ્બો, ફ્યુઝન અને કેઓસ એન્જિન દ્વારા ડિસ્પેચ કરાયેલો દરેક ફૅન-આઉટ ટાર્ગેટ.
  સિસ્ટમ 1 (બાઇટ-સ્તરીય) અપ્રભાવિત છે — તે ક્યારેય ફૅન-આઉટ ટાર્ગેટ્સને પ્રોબ કરતી નથી.
- **ગેટ:** **સિસ્ટમ 2 સાથે ઑપ્ટ-ઇન.** જ્યારે `OMNIROUTE_CHAT_VIRTUAL_LANES`
  સેટ ન હોય ત્યારે તે કોઈ ક્રિયા કરતું નથી — તે મોડમાં પેરન્ટ વિનંતી પહેલેથી જ શેર કરેલી ક્યૂની લીઝ
  ધરાવે છે, તેથી પ્રોબિંગ કરવાથી બેવડી ગણતરી થશે અને કૉમ્બો ટાર્ગેટ્સ નકારવામાં આવશે.
- **સિમેન્ટિક્સ:**
  - **સંપૂર્ણપણે નૉન-બ્લૉકિંગ — સ્કિપ કરો, ક્યારેય ક્યૂમાં ન મૂકો.** `maxWaitMs 0`: ભરેલી લેન
    ટાર્ગેટને સ્કિપ કરે છે અને તેના બદલે કૉમ્બોની ફૉલબૅક વ્યવસ્થા (અથવા ફ્યુઝનનું સર્વાઇવર
    પૅનલ) સેવા આપે છે. આ ઇરાદાપૂર્વક છે: ફૅન-આઉટ ટાર્ગેટ વધારાનું
    કાર્ય છે, અને તેને ક્યૂમાં મૂકવાથી એ જ કન્જેશન પર વધુ લોડ ઉમેરાય છે જેને રોકવા માટે લેન
    અસ્તિત્વમાં છે. તેથી `defaultMaxWaitMs` માત્ર **પેરન્ટ વિનંતી** પર લાગુ થાય છે;
    ફૅન-આઉટ પ્રોબ્સ ક્યારેય રાહ જોતા નથી અને તેમને રાહ જોવડાવવા માટે ઇરાદાપૂર્વક **કોઈ નૉબ નથી**
    (ઇશ્યૂ ઇતિહાસ દર્શાવે છે કે રાહ જોવાના નૉબ્સે મોટા પાયે 502/504 ભૂલોનો તે પ્રકાર સર્જ્યો હતો
    જેને #9654 અટકાવે છે — કોઈ ઑપરેટર સ્કિપ થયેલા ફૅન-આઉટ ટાર્ગેટ્સથી
    પ્રતિભાવની ગુણવત્તાને નુકસાન થતું હોવાની જાણ કરે તો જ પુનર્વિચાર કરો).
  - **એડમિટ થતાં જ રિલીઝ.** એડમિટ થયેલો પ્રોબ તરત જ તેની લીઝ રિલીઝ કરે છે: તે
    ક્ષમતાનો ગેટ છે, હોલ્ડ નથી. પેરન્ટની લીઝ ફૅન-આઉટને આવરી લે છે; વધુ N લીઝ હોલ્ડ કરવાથી
    શેર કરેલો સક્રિય ખર્ચ કૃત્રિમ રીતે વધશે અને અન્ય tenants નકારવામાં આવશે. આ બેસ્ટ-એફર્ટ છે,
    રિઝર્વેશન નહીં: પ્રોબ અને ડિસ્પેચ વચ્ચે લેન ફરી ભરાઈ શકે છે, તેથી ભારે
    સ્પર્ધા હેઠળ ગેટ એવી લેનમાં એડમિટ કરી શકે છે જે ટાર્ગેટ ડિસ્પેચ થાય
    ત્યાં સુધીમાં ફરી ભરાઈ ગઈ હોય.
  - **વાસ્તવિક ફૅન-આઉટ બૉડી પરથી મૂલ્યનિર્ધારણ.** પ્રોબ ટાર્ગેટની વાસ્તવિક
    બૉડી પરથી ખર્ચનો અંદાજ લગાવે છે — જેમાં તેના `stream` ફ્લૅગમાંથી મેળવેલો રિક્વેસ્ટ ક્લાસ પણ
    સામેલ છે, બરાબર પેરન્ટ પાથની જેમ — તેથી ફ્યુઝન પૅનલના સભ્યો (`stream: false`)
    તેઓ ખરેખર જે નૉન-સ્ટ્રીમિંગ ક્લાસ વાપરશે તે મુજબ મૂલ્યિત થાય છે, અને પ્રાથમિકતા/RR
    ટાર્ગેટ્સ વપરાશકર્તાએ જે વિનંતી કરી હોય તે મુજબ મૂલ્યિત થાય છે.
- **રિપોર્ટ્સ:** પ્રથમ ટાર્ગેટ પછી પ્રોબ સ્કિપ થવાથી કૉમ્બોની પ્રતિ-વિનંતી
  `fallbackCount` વધે છે (હાલની ફૉલબૅક સિમેન્ટિક્સને પ્રતિબિંબિત કરતાં; કૉમ્બો
  લૉગ્સમાં દૃશ્યમાન); દરેક પૅનલ સભ્ય સ્કિપ થાય ત્યારે ફ્યુઝન 503 પરત કરે છે. હાલમાં
  સ્નેપશૉટ પર **કોઈ એકંદર કાઉન્ટર નથી** (દા.ત. `virtualFanoutSkipped`) —
  જો કોઈ ઑપરેટર જાણ કરે કે લેન ગેટ ફૅન-આઉટ ટાર્ગેટ્સને કેટલી વાર સ્કિપ કરે છે તે જાણી શકાતું
  નથી, તો તે આવો કાઉન્ટર ઉમેરવા માટેનો ટ્રિગર છે.

## ડૅશબોર્ડમાં કયું દેખાઈ રહ્યું છે

- `adaptiveAdmission.laneCount` / `laneTenants` → **અનુકૂલનશીલ વર્ચ્યુઅલ લેન** (સિસ્ટમ 2).
- `adaptiveAdmission.virtualLanes === true` → વિભાગ 3ના ફૅન-આઉટ પ્રોબ્સ પણ
  સક્રિય છે. `virtualLanes` ગેરહાજર હોય અથવા `false` હોય તેવો પેલોડ દર્શાવે છે કે
  `OMNIROUTE_CHAT_VIRTUAL_LANES` સેટ કરેલું નથી — બાઇટ-સ્તરની લેન (સિસ્ટમ 1)
  હજુ પણ સક્રિય છે, પરંતુ તેને સક્ષમ ન કરવામાં આવે ત્યાં સુધી `adaptiveAdmission`
  હેઠળનું કંઈપણ (અને કોઈ ફૅન-આઉટ ગેટિંગ) અમલમાં આવતું નથી.

## બંને શા માટે અસ્તિત્વમાં છે

બાઇટ-સ્તરની લેન વધુ મેમરી વાપરતા પાર્સ/કમ્પ્રેસ પાથને મર્યાદિત કરે છે; અનુકૂલનશીલ લેન
દર ટેનન્ટના ડિસ્પૅચ ખર્ચને મર્યાદિત કરે છે. #9654નો માપદંડ 1 ("એક સેશનનો બર્સ્ટ બીજા
સેશન માટે 503 સર્જતો નથી") સિસ્ટમ 1 દ્વારા બિનશરતી રીતે અને ઑપ્ટ-ઇન સક્ષમ થયા પછી
સિસ્ટમ 2 દ્વારા લાગુ કરવામાં આવે છે.

## 4. એક-પ્રોસેસવાળા લાંબા `/v1/responses` (સ્વસ્થ-હેડરૂમ)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)એ
`tryAcquireHealthyHeadroom` ઉમેર્યું, જેથી હીપ
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`થી નીચે હોય ત્યારે બીજી માળખાકીય રીતે
ભારે વિનંતીને પ્રવેશ આપવામાં આવે. `admitChatRequest` દ્વારા વપરાતો BYTE
પાથ (બૉડી ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`, ડિફૉલ્ટ 256 KiB, જેમાં
`POST /v1/responses` પણ સામેલ છે) **સમાન** છૂટનો ઉપયોગ કરે છે.

બેથી વધુ સમકાલીન લાંબા SSE `/v1/responses` માટે આ સમર્થિત **એક-પ્રોસેસ**
રીત છે: પ્રાથમિક + સ્વસ્થ-હેડરૂમને માત્ર હીપ અને પ્રોસેસ-વ્યાપી ઇનફ્લાઇટ-બાઇટ
બજેટ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) જેટલી પરવાનગી આપે
તેટલું જ વધારો. દસેક લાંબા SSE ક્લાયન્ટ્સ (40–50)નો મુદ્દો મેમરી-બજેટનો છે,
ઉત્પાદનની કોઈ કઠોર “મહત્તમ 2” મર્યાદાનો નહીં. દબાણ હેઠળનો હીપ હજુ પણ ફરી પ્રયાસ
કરી શકાય તેવા `503` સાથે લોડ ઘટાડે છે, જેથી #7849 પાછું ન આવે.

**હીપ્સની સંખ્યા વધારવા** માટે, N સ્વતંત્ર `DATA_DIR`s ચલાવો (#11024).
એક SQLite ફાઇલ પર ક્યારેય `replicas > 1` ન રાખો (#10350). આ વિભાગ
DATA_DIR સ્કેલ-આઉટ રીતને ફરીથી ખોલતો નથી.
