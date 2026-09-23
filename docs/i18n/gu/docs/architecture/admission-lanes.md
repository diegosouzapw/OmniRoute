# Admission lanes (#9654) — two lane systems, what gates each, where each reports (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute માં અલગ-અલગ વ્યાપ ધરાવતી **બે** process-local lane સિસ્ટમ્સ છે. તેઓ
એકબીજાની પૂરક છે; ઓપરેટર્સે જાણવું જોઈએ કે તેઓ કઈ સિસ્ટમ જોઈ રહ્યા છે.

## 1. Byte-level process-wide admission (`chatBodyAdmission.ts`)

- **વ્યાપ:** `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` અને અન્ય chat-આકારના routes માટેનો buffered-body/heap પાથ.
  મોટા coding-agent bodies થી થતા heap amplification સામે રક્ષણ આપે છે (#4380).
- **દરેક key માટે અલગ lanes નહીં, પરંતુ એક process-global controller (#10110).** દરેક API key
  (hashed) અથવા `anonymous` session **સમાન** shared budget સામે admission મેળવે છે —
  hashed session id નો ઉપયોગ માત્ર fairness scheduling key તરીકે થાય છે (રાહ જોનારાઓ વચ્ચે
  round-robin dispatch માટે), capacity shard તરીકે ક્યારેય નહીં. આ દસ્તાવેજના અગાઉના સંસ્કરણમાં
  સ્વતંત્ર capacity ધરાવતી per-key lanes નું વર્ણન હતું; તે મોડેલને #10110 માં
  દૂર કરવામાં આવ્યું હતું, કારણ કે તે અનધિકૃત નકલી credentials દ્વારા
  process-wide bound ને ગુણાકારે વધારવાની મંજૂરી આપતું હતું.
- **Gate (#503-fanout): આપમેળે નિર્ધારિત થતું ingest BYTE budget, નિશ્ચિત request
  count નહીં.** લેગસી `CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap (આ સુધારા પહેલાં
  ડિફૉલ્ટ `1`) coding-agent fan-out (એકથી વધુ subagents/CLIs,
  નિયમિત રીતે > 256 KB હોય તેવા bodies) ને ~1 ની અસરકારક concurrency સુધી સીમિત કરતું હતું,
  જેના કારણે સંપૂર્ણપણે સામાન્ય load હેઠળ 503 પ્રતિસાદ મળતો હતો. હવે તે માત્ર ત્યારે જ લાગુ પડે છે
  જ્યારે ઓપરેટર સ્પષ્ટ રીતે `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` સેટ કરે.
  તેને સેટ ન રાખવામાં આવે તો admission ને તેના બદલે
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` દ્વારા નિયંત્રિત કરવામાં આવે છે — આ budget
  process ની વાસ્તવિક memory ceiling (`src/shared/middleware/admissionBudget.ts`) પરથી
  આપમેળે નિર્ધારિત થાય છે: V8 heap limit અને કોઈપણ cgroup/container limit માંથી
  વધુ કડક limit ના 25%, જેને 8x transient-amplification factor વડે ભાગવામાં આવે છે,
  અને 8 MiB થી 2 GiB વચ્ચે મર્યાદિત કરવામાં આવે છે. સ્પષ્ટ overrides માટે પણ
  સમાન મર્યાદાઓ વપરાય છે. આ કોઈ env tuning વિના 512 MB container થી
  32 GB desktop સુધી જાતે scale થાય છે. Effective budget માં સમાવી ન શકાય તેવું
  body તરત જ `413 body_exceeds_budget` સાથે નિષ્ફળ જાય છે; વ્યક્તિગત રીતે
  સેવા આપી શકાય તેવા bodies વચ્ચેની contention જ bounded fairness queue માં પ્રવેશે છે.
  Live multi-signal resource-pressure tracker (V8 heap ratio,
  cgroup, PSI, OOM events — `open-sse/utils/resourcePressurePolicy.ts`) `high`
  pressure હેઠળ bounded wait ઘટાડે છે અને કોઈપણ bytes ingest થાય તે પહેલાં
  `critical` pressure હેઠળ `503 resource_pressure` સાથે તરત જ load ઘટાડે છે.
  PSI ઉપલબ્ધ હોય ત્યારે આ unit ના cgroup `memory.pressure` માંથી વાંચવામાં આવે છે
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory`
  host-wide છે અને bare metal / cgroup v1 પર માત્ર fallback તરીકે વપરાય છે, જેથી swapping
  કરતું host નિષ્ક્રિય container ને 503 કરાવી ન શકે.
- **ટ્યુનિંગ:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — આપમેળે નિર્ધારિત byte budget માટે override
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — લેગસી request-count cap, માત્ર opt-in
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 પહેલાં queue-wait (ડિફૉલ્ટ 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — queued-bytes heap valve (ડિફૉલ્ટ 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 પછીથી deprecated
    no-ops (config compatibility માટે સ્વીકારવામાં આવે છે, અવગણવામાં આવે છે)
- **રિપોર્ટ્સ:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — જેમાં
  #503-fanout ના ઉમેરાઓ `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, અને `countCapEnabled`
  સામેલ છે (ડિફૉલ્ટ deployment પર false — આ પુષ્ટિ કરે છે કે વાસ્તવમાં byte budget
  લાગુ પડે છે, લેગસી count cap નહીં).

## 2. અનુકૂલનશીલ રનટાઇમ વર્ચ્યુઅલ લેન (`open-sse/services/admission`)

- **વ્યાપ:** પ્રોવાઇડર ડિસ્પેચ માટે tenant-key એડમિશન — ક્યૂ ખર્ચ, લેટન્સી-માર્ગદર્શિત
  મર્યાદા અનુકૂલન, લેન ક્યૂઇંગ અને લેન મેટ્રિક્સ.
- **ગેટ:** **ઑપ્ટ-ઇન.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` ન હોય ત્યાં સુધી અક્ષમ. તેના વિના,
  અનુકૂલનશીલ કન્ટ્રોલર શેર્ડ ક્યૂનું વર્તન જાળવી રાખે છે (#9654નું માપદંડ 1 માત્ર
  ઑપરેટર લેન સક્ષમ કરે ત્યાર પછી જ લાગુ પડે છે).
- **ટ્યુનિંગ:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + અનુકૂલનશીલ કૉન્ફિગ (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **રિપોર્ટ્સ:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (અપારદર્શક લેન IDs, ક્યારેય મૂળ
  keys નહીં), અને `virtualLanes` — સ્નૅપશૉટમાં "લેન્સ ચાલુ છે" તે દર્શાવતો અધિકૃત ફ્લૅગ.

## 3. ફૅન-આઉટ પ્રોબ્સ — કૉમ્બો/ફ્યુઝન માટે પ્રતિ-ટાર્ગેટ એડમિશન (#9654 Wave 2)

કૉમ્બો (પ્રાયોરિટી / રાઉન્ડ-રોબિન) અને ફ્યુઝન એક પેરેન્ટ રિક્વેસ્ટ હેઠળ N મૉડલ
ટાર્ગેટ્સ સુધી ફૅન-આઉટ કરે છે. #9654 Wave 2થી, **દરેક ફૅન-આઉટ ટાર્ગેટને ડિસ્પેચ પહેલાં ગેટ કરવામાં આવે છે**
**પેરેન્ટની** tenant lane સામેના પ્રતિ-ટાર્ગેટ પ્રોબ (`PerTargetAdmissionHook`, જેને
`createPerTargetAdmissionHook` દ્વારા બનાવવામાં આવે છે) વડે.

- **વ્યાપ:** કૉમ્બો, ફ્યુઝન અને કેઓસ એન્જિન દ્વારા ડિસ્પેચ કરવામાં આવતો દરેક ફૅન-આઉટ ટાર્ગેટ.
  સિસ્ટમ 1 (બાઇટ-લેવલ) અપ્રભાવિત છે — તે ક્યારેય ફૅન-આઉટ ટાર્ગેટ્સને પ્રોબ કરતું નથી.
- **ગેટ:** **સિસ્ટમ 2 સાથે ઑપ્ટ-ઇન.** જ્યારે `OMNIROUTE_CHAT_VIRTUAL_LANES`
  સેટ ન હોય ત્યારે આ no-op છે — તે મોડમાં પેરેન્ટ રિક્વેસ્ટ પાસે પહેલેથી જ શેર્ડ-ક્યૂ લીઝ હોય છે,
  તેથી પ્રોબિંગ કરવાથી બેવડી ગણતરી થશે અને કૉમ્બો ટાર્ગેટ્સ નકારવામાં આવશે.
- **સિમેન્ટિક્સ:**
  - **સંપૂર્ણપણે નૉન-બ્લૉકિંગ — સ્કિપ કરો, ક્યારેય ક્યૂ ન કરો.** `maxWaitMs 0`: ભરેલી લેન
    ટાર્ગેટને સ્કિપ કરે છે અને તેના બદલે કૉમ્બોની ફૉલબૅક વ્યવસ્થા (અથવા ફ્યુઝનનું સર્વાઇવર
    પૅનલ) સેવા આપે છે. આ ઇરાદાપૂર્વક છે: ફૅન-આઉટ ટાર્ગેટ બિનજરૂરી વધારાનું
    કાર્ય છે અને તેને ક્યૂ કરવાથી એ જ કન્જેશન પર વધુ લોડ ઉમેરાય છે જેને રોકવા માટે લેન
    અસ્તિત્વમાં છે. તેથી `defaultMaxWaitMs` ફક્ત **પેરેન્ટ રિક્વેસ્ટને** લાગુ પડે છે;
    ફૅન-આઉટ પ્રોબ્સ ક્યારેય રાહ જોતા નથી અને તેમને રાહ જોવડાવવા માટે ઇરાદાપૂર્વક
    **કોઈ નૉબ નથી** (ઇશ્યૂ ઇતિહાસ દર્શાવે છે કે વેઇટ નૉબ્સને કારણે #9654 જે
    માસ-502/504 શ્રેણીને અટકાવે છે તે સર્જાઈ હતી — ફક્ત ત્યારે જ પુનર્વિચાર કરો જ્યારે
    કોઈ ઑપરેટર રિપોર્ટ કરે કે સ્કિપ થયેલા ફૅન-આઉટ ટાર્ગેટ્સથી પ્રતિસાદની ગુણવત્તાને નુકસાન થાય છે).
  - **એડમિટ થયા પછી રિલીઝ.** એડમિટ થયેલો પ્રોબ તેની લીઝ તરત જ રિલીઝ કરે છે: તે
    ક્ષમતા ગેટ છે, હોલ્ડ નહીં. પેરેન્ટની લીઝ ફૅન-આઉટને આવરી લે છે; વધુ N લીઝ હોલ્ડ
    કરવાથી શેર્ડ ઍક્ટિવ કૉસ્ટ ફૂલી જશે અને અન્ય tenants નકારવામાં આવશે. આ બેસ્ટ-એફર્ટ છે,
    રિઝર્વેશન નહીં: પ્રોબ અને ડિસ્પેચ વચ્ચે લેન ફરીથી ભરાઈ શકે છે, તેથી ભારે
    સ્પર્ધા હેઠળ ગેટ એવી લેનમાં એડમિટ કરી શકે છે જે ટાર્ગેટ ડિસ્પેચ થાય ત્યાં સુધીમાં
    ફરી ભરાઈ ગઈ હોય.
  - **વાસ્તવિક ફૅન-આઉટ બૉડી પરથી કિંમત નિર્ધારિત.** પ્રોબ ટાર્ગેટની વાસ્તવિક
    બૉડી પરથી ખર્ચનો અંદાજ કરે છે — તેમાં તેના `stream` ફ્લૅગ પરથી મેળવેલો રિક્વેસ્ટ ક્લાસ પણ
    સામેલ છે, બરાબર પેરેન્ટ પાથની જેમ — તેથી ફ્યુઝન પૅનલ સભ્યો (`stream: false`)
    માટે તેઓ ખરેખર જે નૉન-સ્ટ્રીમિંગ ક્લાસ રોકશે તે મુજબ કિંમત નક્કી થાય છે અને પ્રાયોરિટી/RR
    ટાર્ગેટ્સ માટે વપરાશકર્તાએ જે વિનંતી કરી હોય તે મુજબ કિંમત નક્કી થાય છે.
- **રિપોર્ટ્સ:** પ્રથમ ટાર્ગેટ પછીનો પ્રોબ સ્કિપ કૉમ્બોના પ્રતિ-રિક્વેસ્ટ
  `fallbackCount`ને વધારે છે (હાલના ફૉલબૅક સિમેન્ટિક્સને અનુરૂપ; કૉમ્બો
  લૉગ્સમાં દૃશ્યમાન); દરેક પૅનલ સભ્ય સ્કિપ થાય ત્યારે ફ્યુઝન 503 પરત કરે છે. હાલમાં
  સ્નૅપશૉટ પર **કોઈ ઍગ્રિગેટ કાઉન્ટર નથી** (દા.ત. `virtualFanoutSkipped`) —
  જો કોઈ ઑપરેટર રિપોર્ટ કરે કે લેન ગેટ કેટલી વાર ફૅન-આઉટ
  ટાર્ગેટ્સને સ્કિપ કરે છે તે તેઓ જાણી શકતા નથી, તો એવો કાઉન્ટર ઉમેરવા માટે તે ટ્રિગર છે.

## ડૅશબોર્ડમાં કયું દેખાઈ રહ્યું છે

- `adaptiveAdmission.laneCount` / `laneTenants` → **અનુકૂલનશીલ વર્ચ્યુઅલ લેન** (સિસ્ટમ 2).
- `adaptiveAdmission.virtualLanes === true` → વિભાગ 3ના ફૅન-આઉટ પ્રોબ્સ પણ
  સક્રિય છે. `virtualLanes` ગેરહાજર હોય અથવા `false` હોય તેવા પેલોડનો અર્થ છે કે
  `OMNIROUTE_CHAT_VIRTUAL_LANES` સેટ નથી — બાઇટ-સ્તરની લેન (સિસ્ટમ 1) હજુ પણ
  સક્રિય છે, પરંતુ તેને સક્ષમ કરવામાં ન આવે ત્યાં સુધી `adaptiveAdmission` હેઠળનું
  કંઈપણ (અને કોઈ ફૅન-આઉટ ગેટિંગ) અમલમાં હોતું નથી.

## બંને શા માટે અસ્તિત્વમાં છે

બાઇટ-સ્તરની લેન મેમરીનો ભારે ઉપયોગ કરતા પાર્સ/કમ્પ્રેસ પાથને મર્યાદિત કરે છે; અનુકૂલનશીલ લેન
દરેક ટેનન્ટ દીઠ ડિસ્પૅચ ખર્ચને મર્યાદિત કરે છે. #9654નો માપદંડ 1 ("એક સેશનનો અચાનક ધસારો
બીજા માટે 503 સર્જતો નથી") સિસ્ટમ 1 દ્વારા બિનશરતી રીતે અને ઑપ્ટ-ઇન સક્ષમ થયા પછી સિસ્ટમ 2 દ્વારા લાગુ કરવામાં આવે છે.

## 4. એક-પ્રોસેસવાળું લાંબું `/v1/responses` (સ્વસ્થ-હેડરૂમ)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)એ
`tryAcquireHealthyHeadroom` ઉમેર્યું, જેથી હીપ `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`
કરતાં નીચે હોય ત્યારે બીજી માળખાકીય રીતે ભારે વિનંતીને પ્રવેશ આપવામાં આવે.
`admitChatRequest` દ્વારા વપરાતો BYTE પાથ (બૉડી ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
ડિફૉલ્ટ 256 KiB, જેમાં `POST /v1/responses` સામેલ છે) **એ જ** અપવાદનો ઉપયોગ કરે છે.

બે કરતાં વધુ સમકાલીન લાંબા SSE `/v1/responses` માટે આ સમર્થિત **એક-પ્રોસેસ**
રીત છે: પ્રાથમિક + સ્વસ્થ-હેડરૂમને ફક્ત હીપ અને પ્રોસેસ-વ્યાપી ઇનફ્લાઇટ-બાઇટ બજેટ
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) જેટલી મંજૂરી આપે તેટલું જ વધારો.
દસેક લાંબા SSE ક્લાયન્ટ્સ (40–50) એ મેમરી-બજેટનો પ્રશ્ન છે, ઉત્પાદનની સખત
“મહત્તમ 2” મર્યાદા નથી. દબાણ હેઠળનું હીપ હજુ પણ પુનઃપ્રયાસ કરી શકાય તેવા `503`
સાથે લોડ ઘટાડે છે, જેથી #7849 ફરી ન આવે.

**હીપ્સને ગુણાકાર કરવા માટે**, N સ્વતંત્ર `DATA_DIR`s ચલાવો (#11024). એક SQLite
ફાઇલ પર ક્યારેય `replicas > 1` ન ચલાવો (#10350). આ વિભાગ DATA_DIR
સ્કેલ-આઉટ રીતને ફરીથી ચર્ચા માટે ખોલતો નથી.
