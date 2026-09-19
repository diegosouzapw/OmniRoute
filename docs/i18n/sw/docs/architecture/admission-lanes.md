# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute ina mifumo **miwili** ya njia iliyo ya ndani ya mchakato yenye mawanda tofauti. Mifumo hii
inakamilishana; waendeshaji wanapaswa kujua ni mfumo gani wanaoutazama.

## 1. Udhibiti wa uingiaji wa kiwango cha baiti katika mchakato mzima (`chatBodyAdmission.ts`)

- **Mawanda:** njia ya mwili ulioakibishwa/heap kwa `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, na njia nyingine zenye muundo wa gumzo. Hulinda
  dhidi ya ukuzaji wa heap unaosababishwa na miili mikubwa ya mawakala wa uandishi wa msimbo (#4380).
- **Kidhibiti kimoja cha kimataifa kwa mchakato, si njia tofauti kwa kila ufunguo (#10110).** Kila ufunguo wa API
  (uliofanyiwa hashing) au kipindi cha `anonymous` huomba nafasi dhidi ya bajeti
  **ileile** inayoshirikiwa — kitambulisho cha kipindi kilichofanyiwa hashing hutumiwa TU kama ufunguo wa upangaji wa haki (usambazaji wa
  mzunguko kwa wanaosubiri), kamwe si kama sehemu ya kugawanya uwezo. Toleo la awali la waraka huu
  lilieleza njia tofauti kwa kila ufunguo zenye uwezo huru; muundo huo
  uliondolewa katika #10110 kwa sababu uliruhusu vitambulisho bandia visivyothibitishwa kuzidisha
  kikomo cha mchakato mzima.
- **Lango (#503-fanout): bajeti ya BAITI ya uingizaji inayotokana kiotomatiki, si idadi isiyobadilika ya maombi.**
  Kikomo cha zamani cha idadi ya maombi cha `CHAT_MAX_HEAVY_IN_FLIGHT` (chaguo-msingi `1`
  kabla ya marekebisho haya) kilipunguza usambazaji mpana wa mawakala wa uandishi wa msimbo (mawakala wadogo/CLI nyingi,
  miili ambayo mara kwa mara ni > 256 KB) hadi kiwango halisi cha ushughulikiaji sambamba cha ~1, hali iliyosababisha
  majibu ya 503 chini ya mzigo wa kawaida kabisa. Sasa kikomo hicho hutumika tu mwendeshaji anapoweka
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` waziwazi. Kikiachwa bila kuwekwa, uingiaji badala yake
  hudhibitiwa na `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — bajeti inayotokana kiotomatiki na
  kikomo halisi cha kumbukumbu cha mchakato (`src/shared/middleware/admissionBudget.ts`):
  25% ya kikomo kidogo zaidi kati ya kikomo cha heap cha V8 na kikomo chochote cha cgroup/kontena,
  ikigawanywa kwa kigezo cha ukuzaji wa muda mfupi cha 8x, na kubanwa kati ya 8 MiB na
  2 GiB. Ubatilishaji uliowekwa wazi hutumia mipaka hiyohiyo. Hujirekebisha kutoka
  kontena la 512 MB hadi kompyuta ya mezani ya 32 GB bila urekebishaji wa env. Mwili ambao hauwezi
  kutoshea ndani ya bajeti inayotumika hushindwa mara moja kwa `413 body_exceeds_budget`;
  ushindani kati ya miili inayoweza kuhudumiwa kibinafsi pekee ndio huingia kwenye foleni yenye mipaka
  na ya haki. Kifuatiliaji hai cha shinikizo la rasilimali chenye ishara nyingi (uwiano wa heap wa V8,
  cgroup, PSI, matukio ya OOM — `open-sse/utils/resourcePressurePolicy.ts`) hupunguza
  muda wenye kikomo wa kusubiri chini ya shinikizo la `high` na hukataa mara moja kwa
  `503 resource_pressure` chini ya shinikizo la `critical`, kabla hata ya baiti zozote
  kuingizwa.
- **Urekebishaji:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ubatilishaji wa bajeti ya baiti inayotokana kiotomatiki
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — kikomo cha zamani cha idadi ya maombi, hutumika kwa hiari tu
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — muda wa kusubiri kwenye foleni kabla ya 503 (chaguo-msingi 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — vali ya heap ya baiti zilizo kwenye foleni (chaguo-msingi 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — zimepitwa na wakati
    na hazifanyi chochote tangu #10110 (zinakubaliwa kwa uoanifu wa usanidi, lakini zinapuuzwa)
- **Ripoti:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — ikijumuisha
  nyongeza za #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, na `countCapEnabled`
  (false katika usambazaji wa chaguo-msingi — huthibitisha kuwa bajeti ya baiti, si kikomo cha zamani
  cha idadi, ndiyo inayoweka kikomo kwa hakika).

## 2. Njia pepe zinazobadilika wakati wa utekelezaji (`open-sse/services/admission`)

- **Upeo:** udhibiti wa uingizaji kwa ufunguo wa mpangaji katika usambazaji kwa mtoa huduma — gharama ya foleni, urekebishaji wa vikomo unaoongozwa na ucheleweshaji, upangaji wa foleni kwa njia, na vipimo vya njia.
- **Kiwasho:** **lazima kiwashwe kwa hiari.** Kimezimwa isipokuwa `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Bila hicho,
  kidhibiti kinachobadilika hudumisha tabia ya foleni inayoshirikiwa (kigezo cha 1 cha #9654
  kinatimizwa tu baada ya mwendeshaji kuwasha njia).
- **Urekebishaji:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + usanidi unaobadilika (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Ripoti:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (vitambulisho fiche vya njia, kamwe si funguo
  halisi), na `virtualLanes` — alama yenye mamlaka ya "njia zimewashwa" katika taswira ya hali.

## 3. Majaribio ya usambazaji sambamba — udhibiti wa uingizaji kwa kila lengo kwa combo/fusion (#9654 Wimbi la 2)

Combo (kipaumbele / mzunguko) na fusion husambaza kwa malengo N ya modeli chini ya ombi moja kuu.
Tangu #9654 Wimbi la 2, **kila lengo la usambazaji sambamba hudhibitiwa kabla ya kutumwa** na
jaribio la kila lengo (`PerTargetAdmissionHook`, linaloundwa na `createPerTargetAdmissionHook`)
dhidi ya njia ya mpangaji ya ombi **kuu**.

- **Upeo:** kila lengo la usambazaji sambamba linalotumwa na combo, fusion, na injini ya chaos.
  Mfumo wa 1 (kiwango cha baiti) hauathiriwi — kamwe haujaribu malengo ya usambazaji sambamba.
- **Kiwasho:** **lazima kiwashwe kwa hiari pamoja na mfumo wa 2.** Hakifanyi chochote wakati `OMNIROUTE_CHAT_VIRTUAL_LANES`
  haijawekwa — ombi kuu tayari linashikilia ukodishaji wa foleni inayoshirikiwa katika hali hiyo,
  kwa hivyo kufanya jaribio kungehesabu mara mbili na kukataa malengo ya combo.
- **Semantiki:**
  - **Hakizuii kabisa — ruka, usiweke kamwe kwenye foleni.** `maxWaitMs 0`: njia iliyojaa
    huliruka lengo na utaratibu wa mbadala wa combo (au paneli ya waliosalia ya fusion)
    hutumika badala yake. Hili limekusudiwa: lengo la usambazaji sambamba ni kazi ya ziada
    isiyohitajika, na kuliweka kwenye foleni huongeza mzigo zaidi kwenye msongamano uleule ambao njia
    zimeundwa kuuzuia. Kwa hivyo, `defaultMaxWaitMs` hutumika kwa **ombi kuu pekee**;
    majaribio ya usambazaji sambamba hayasubiri kamwe, na kwa makusudi **hakuna chaguo la usanidi** la kuyafanya
    yasubiri (historia ya suala inaonyesha kuwa chaguo za kusubiri zilisababisha kundi la hitilafu za 502/504
    ambalo #9654 huzuia — zingatia upya tu ikiwa mwendeshaji ataripoti kuwa kurukwa kwa malengo ya usambazaji sambamba
    kunadhuru ubora wa majibu).
  - **Achilia baada ya kukubali.** Jaribio lililokubaliwa huachilia ukodishaji wake mara moja: ni
    lango la uwezo, si ushikiliaji. Ukodishaji wa ombi kuu unashughulikia usambazaji sambamba; kushikilia ukodishaji N
    zaidi kungeongeza isivyo halisi gharama amilifu inayoshirikiwa na kukataa wapangaji wengine. Ni juhudi ya kadiri iwezekanavyo,
    si uwekaji nafasi: njia inaweza kujaa tena kati ya jaribio na utumaji, kwa hivyo chini ya
    ushindani mkubwa, lango linaweza kuruhusu uingizaji kwenye njia ambayo imejaa tena kufikia
    wakati lengo linapotumwa.
  - **Huwekewa gharama kutoka kwenye mwili halisi wa usambazaji sambamba.** Jaribio hukadiria gharama kutoka kwenye
    mwili halisi wa lengo — ikiwa ni pamoja na aina ya ombi inayotokana na alama yake ya `stream`,
    sawa kabisa na njia ya ombi kuu — hivyo washiriki wa paneli ya fusion (`stream: false`)
    huwekewa gharama kulingana na aina isiyotiririsha ambayo kwa kweli watatumia, na malengo ya kipaumbele/RR
    kulingana na chochote ambacho mtumiaji aliomba.
- **Ripoti:** kurukwa kwa jaribio baada ya lengo la kwanza huongeza `fallbackCount` ya combo kwa kila ombi
  (ikiakisi semantiki zilizopo za mbadala; huonekana katika kumbukumbu za combo);
  fusion hurejesha 503 wakati kila mshiriki wa paneli amerukwa. Kwa sasa,
  **hakuna kihesabu cha jumla** (k.m. `virtualFanoutSkipped`) kwenye taswira ya hali —
  ikiwa mwendeshaji ataripoti kuwa hawezi kujua ni mara ngapi lango la njia huruka malengo ya usambazaji sambamba,
  hiyo ndiyo kichocheo cha kuongeza kihesabu hicho.

## Ni ipi inayoonekana kwenye dashibodi

- `adaptiveAdmission.laneCount` / `laneTenants` → **njia pepe zinazobadilika** (mfumo wa 2).
- `adaptiveAdmission.virtualLanes === true` → vipimo vya fan-out vya sehemu ya 3 pia
  vinatumika. Payload ambayo haina `virtualLanes` au yenye thamani `false` inamaanisha
  kuwa `OMNIROUTE_CHAT_VIRTUAL_LANES` haijawekwa — njia za kiwango cha baiti (mfumo wa 1)
  bado zinatumika, lakini hakuna chochote chini ya `adaptiveAdmission` (wala udhibiti wa
  fan-out) kinachotumika hadi kipengele hicho kiwashwe.

## Kwa nini yote miwili ipo

Njia za kiwango cha baiti huwekea kikomo mkondo wa uchanganuzi/ubanaji unaotumia kumbukumbu
nyingi; njia zinazobadilika huwekea kikomo gharama ya usambazaji kwa kila mpangaji. Kigezo
cha 1 cha #9654 ("mlipuko wa kipindi kimoja hausababishi kipindi kingine kupata 503")
kinatekelezwa na mfumo wa 1 bila masharti na na mfumo wa 2 mara tu chaguo la kujiunga
linapowashwa.

## 4. `/v1/responses` ndefu katika mchakato mmoja (nafasi-salama)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) iliongeza
`tryAcquireHealthyHeadroom` ili ombi la pili lenye muundo mzito likubaliwe
wakati heap iko chini ya `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Mkondo wa
BYTE unaotumiwa na `admitChatRequest` (body zenye ukubwa ≥
`OMNIROUTE_CHAT_LARGE_BODY_BYTES`, chaguo-msingi 256 KiB, ikijumuisha
`POST /v1/responses`) hutumia **nafasi ileile**.

Huu ndio utaratibu unaotumika rasmi wa **mchakato mmoja** kwa zaidi ya miunganisho miwili
ya SSE `/v1/responses` inayotumika kwa wakati mmoja: ongeza kiwango cha msingi + nafasi-salama
tu kadiri heap na bajeti ya baiti zinazoendelea kuchakatwa katika mchakato mzima
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) zinavyoruhusu. Makumi ya viteja vya SSE vya
muda mrefu (40–50) ni suala la bajeti hiyo ya kumbukumbu, si kikomo kisichobadilika cha
bidhaa cha “upeo wa 2”. Heap iliyo chini ya shinikizo bado hukataa maombi kwa kutumia
`503` inayoweza kujaribiwa tena ili #7849 isijirudie.

Ili **kuzidisha heap**, endesha `DATA_DIR` N zinazojitegemea (#11024). Kamwe usitumie
`replicas > 1` kwenye faili moja ya SQLite (#10350). Sehemu hii haifungui upya
utaratibu wa kuongeza ukubwa kupitia DATA_DIR.
