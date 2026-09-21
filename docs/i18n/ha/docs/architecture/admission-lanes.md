# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute yana da tsarin layuka na cikin-process guda **biyu** masu iyakoki daban-daban. Suna
cika juna; ya kamata masu gudanarwa su san wanne ne suke dubawa.

## 1. Karɓar bayanai a matakin byte ga ɗaukacin tsari (`chatBodyAdmission.ts`)

- **Iyaka:** hanyar buffered-body/heap don `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, da sauran hanyoyi masu tsarin chat. Tana karewa
  daga ƙaruwar amfani da heap sakamakon manyan bodies na coding-agent (#4380).
- **Mai sarrafawa guda ɗaya na gabaɗayan tsari, ba lanes na kowane key ba (#10110).** Kowane API key
  (wanda aka yi wa hash) ko zaman `anonymous` yana neman izinin shiga daga **kasafin kuɗi ɗaya**
  da kowa ke amfani da shi — ana amfani da hashed session id NE KAWAI a matsayin key na tsara adalci
  (rarraba waiters bi-da-bi), ba a taɓa amfani da shi a matsayin shard na capacity ba. Wata sigar baya ta wannan
  daftari ta bayyana lanes na kowane key masu capacity masu zaman kansu; an cire wannan tsarin
  a #10110 saboda yana ba wa fake credentials marasa authentication damar ninka
  iyakar gabaɗayan tsari.
- **Ƙofa (#503-fanout): kasafin BYTE na ingest da ake samarwa ta atomatik, ba ƙayyadadden adadin requests
  ba.** Tsohon iyakar adadin requests ta `CHAT_MAX_HEAVY_IN_FLIGHT` (default `1`
  kafin wannan gyaran) ta durƙusar da fan-out na coding-agent (subagents/CLIs da yawa,
  bodies masu wuce 256 KB a kai a kai) zuwa effective concurrency na ~1, wanda ke haifar da 503
  ƙarƙashin load na yau da kullum. Yanzu tana aiki ne kawai idan operator ya saita
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` kai tsaye. Idan ba a saita ta ba, maimakon haka
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ce ke sarrafa admission — kasafin da ake samarwa ta atomatik daga
  ainihin iyakar memory ta process (`src/shared/middleware/admissionBudget.ts`):
  25% na mafi ƙanƙanta tsakanin iyakar V8 heap da kowace iyakar cgroup/container,
  a raba da transient-amplification factor na 8x, sannan a taƙaita tsakanin 8 MiB da
  2 GiB. Explicit overrides suna amfani da clamps iri ɗaya. Wannan yana daidaita kansa daga
  container mai 512 MB zuwa desktop mai 32 GB ba tare da env tuning ba. Body da ba zai iya
  shiga cikin effective budget ba zai gaza nan take da `413 body_exceeds_budget`;
  fafatawa tsakanin bodies waɗanda kowannensu za a iya sarrafawa ce kawai ke shiga bounded
  fairness queue. Live multi-signal resource-pressure tracker (V8 heap ratio,
  cgroup, PSI, OOM events — `open-sse/utils/resourcePressurePolicy.ts`) yana rage
  bounded wait a ƙarƙashin matsin `high`, kuma yana watsarwa nan take da
  `503 resource_pressure` a ƙarƙashin matsin `critical`, tun kafin a ingest ko byte ɗaya.
  Ana karanta PSI daga `memory.pressure` na cgroup na wannan unit idan yana nan
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` ya shafi
  duk host kuma fallback ne kawai a bare metal / cgroup v1, don haka host da ke yin swapping
  ba zai iya mayar da 503 ga container da ba ya aiki ba.
- **Daidaitawa:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — override na kasafin byte da ake samarwa ta atomatik
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — tsohon iyakar adadin requests, opt-in kawai
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — lokacin jiran queue kafin 503 (default 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — queued-bytes heap valve (default 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — deprecated
    no-ops tun daga #10110 (ana karɓarsu don config compatibility, amma ana watsi da su)
- **Rahotanni:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — ciki har da
  ƙarin abubuwan #503-fanout: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, da `countCapEnabled`
  (false a default deployment — yana tabbatar da cewa kasafin byte ne, ba tsohon
  count cap ba, ke ƙuntatawa a zahiri).

## 2. Layukan kama-da-wane masu daidaitawa a lokacin aiki (`open-sse/services/admission`)

- **Iyaka:** karɓa bisa maɓallin tenant don aika zuwa provider — kuɗin jerin jira, daidaita
  iyaka bisa latency, sanya buƙatu cikin jerin jiran layi, da ma’aunin layi.
- **Kunnawa:** **sai an zaɓa.** A kashe yake sai idan `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Idan babu shi,
  mai sarrafa daidaitawa zai ci gaba da amfani da halayyar jerin jira na bai ɗaya (sharaɗi na 1 na #9654
  yana aiki ne kawai bayan operator ya kunna layuka).
- **Saitawa:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + saitunan daidaitawa (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Rahotanni:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ID na layuka marasa bayyana, ba
  a taɓa nuna ainihin maɓallan ba), da `virtualLanes` — tutar hukuma da ke nuna cewa
  "an kunna layuka" a cikin snapshot.

## 3. Binciken fan-out — karɓa ga kowane target don combo/fusion (#9654 Wave 2)

Combo (priority / round-robin) da fusion suna rarraba buƙata zuwa target na model guda N a ƙarƙashin
buƙatar parent guda ɗaya. Tun daga #9654 Wave 2, **ana tantance kowane target na fan-out kafin dispatch** ta hanyar
bincike na kowane target (`PerTargetAdmissionHook`, wanda `createPerTargetAdmissionHook` ya gina)
a kan layin tenant na **parent**.

- **Iyaka:** kowane target na fan-out da combo, fusion, da chaos engine suka aika.
  System 1 (matakin byte) bai shafu ba — ba ya taɓa bincikar target na fan-out.
- **Kunnawa:** **sai an zaɓa tare da system 2.** Ba ya yin komai idan ba a saita
  `OMNIROUTE_CHAT_VIRTUAL_LANES` ba — buƙatar parent ta riga ta riƙe izinin jerin jira
  na bai ɗaya a wannan yanayin, don haka yin bincike zai ƙirga sau biyu kuma ya ƙi target na combo.
- **Ma’ana:**
  - **Ba ya jira kwata-kwata — a tsallake, kada a taɓa sa cikin jerin jira.** `maxWaitMs 0`: idan layi
    ya cika, ana tsallake target ɗin sannan tsarin fallback na combo (ko panel na
    survivor na fusion) ya yi hidima a madadinsa. An yi wannan da gangan: target na fan-out
    ƙarin aiki ne da ba dole ba, kuma sanya shi cikin jerin jira yana ƙara nauyi a kan ainihin
    cunkoson da aka ƙirƙiri layukan domin hana shi. Saboda haka `defaultMaxWaitMs` yana aiki ne ga
    **buƙatar parent kawai**; binciken fan-out ba ya taɓa jira, kuma da gangan **babu knob**
    da zai sa ya jira (tarihin issue ya nuna cewa knob na jira sun haifar da nau’in
    mass-502/504 da #9654 ke hanawa — a sake duba wannan ne kawai idan operator ya bayar da
    rahoton cewa tsallake target na fan-out yana rage ingancin amsa).
  - **Saki bayan karɓa.** Binciken da aka karɓa yana sakin izininsa nan take: ƙofar
    capacity ce, ba riƙewa ba. Izinin parent yana rufe fan-out; riƙe ƙarin N
    zai ƙara shared active cost fiye da kima kuma ya ƙi sauran tenant. Ƙoƙarin iya yi ne,
    ba ajiyar capacity ba: layin na iya sake cikewa tsakanin bincike da dispatch, don haka
    idan takara ta yi tsanani ƙofar na iya karɓa zuwa layin da ya sake cika kafin
    lokacin da za a aika target ɗin.
  - **Ana ƙididdige farashi daga ainihin body na fan-out.** Binciken yana kimanta kuɗi daga
    ainihin body na target — gami da ajin buƙata da aka samo daga tutar `stream`,
    daidai kamar hanyar parent — saboda haka ana ƙididdige farashin mambobin panel na fusion
    (`stream: false`) a ajin non-streaming da za su yi amfani da shi a zahiri, yayin da target
    na priority/RR kuma bisa abin da mai amfani ya nema.
- **Rahotanni:** tsallaken bincike bayan target na farko yana ƙara `fallbackCount` na combo
  na kowace buƙata (yana kwaikwayon ma’anar fallback da ake da ita; ana iya ganinsa a cikin log
  na combo); fusion yana mayar da 503 idan an tsallake kowane mamba na panel. A halin yanzu
  **babu jimillar counter** (misali `virtualFanoutSkipped`) a kan snapshot —
  idan operator ya bayar da rahoton cewa ba zai iya gane sau nawa ƙofar layi ke tsallake target
  na fan-out ba, wannan shi ne abin da zai sa a ƙara guda ɗaya.

## Wanne ne yake bayyana a dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptive virtual lanes** (tsari na 2).
- `adaptiveAdmission.virtualLanes === true` → gwaje-gwajen fan-out na sashe na 3 su ma
  suna aiki. Payload wanda babu `virtualLanes` a cikinsa ko yake da `false` yana nufin
  ba a saita `OMNIROUTE_CHAT_VIRTUAL_LANES` ba — lanes na matakin byte (tsari na 1) har
  yanzu suna aiki, amma babu wani abu ƙarƙashin `adaptiveAdmission` (kuma babu toshewar fan-out)
  da yake aiki har sai an kunna shi.

## Dalilin da ya sa duka biyun suke akwai

Lanes na matakin byte suna iyakance hanyar parse/compress mai cin ƙwaƙwalwa sosai; adaptive lanes
kuma suna iyakance kuɗin dispatch ga kowane tenant. Ma'auni na 1 na #9654 ("yawaitar buƙatun session
ɗaya ba ta sa wani ya samu 503") tsarin 1 yana tilasta shi ba tare da wani sharaɗi ba, sannan tsarin 2
yana tilasta shi da zarar an kunna opt-in.

## 4. Dogon `/v1/responses` na process guda (lafiyayyen sarari)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ya ƙara
`tryAcquireHealthyHeadroom` domin a amince da buƙata ta biyu mai nauyin tsari
idan heap yana ƙasa da `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Hanyar BYTE
da `admitChatRequest` ke amfani da ita (bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
tsoho 256 KiB, ciki har da `POST /v1/responses`) tana amfani da **wannan** mafita iri ɗaya.

Wannan ita ce hanyar da ake tallafawa ta **process guda** domin samun dogayen
SSE `/v1/responses` masu aiki a lokaci guda fiye da biyu: ƙara primary + healthy-headroom
gwargwadon abin da heap da kasafin inflight-byte na duk process ɗin
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) suka ba da dama. Samun dogayen SSE clients
masu yawa (40–50) tambaya ce ta wannan kasafin ƙwaƙwalwa, ba ƙayyadadden iyakar samfurin
“max 2” ba. Heap da ke ƙarƙashin matsin lamba har yanzu yana watsar da buƙatu da
`503` mai yiwuwa a sake gwadawa, don kada #7849 ya dawo.

Don **ninka heaps**, gudanar da N masu zaman kansu `DATA_DIR`s (#11024). Kada a taɓa amfani da
`replicas > 1` a kan fayil ɗin SQLite guda ɗaya (#10350). Wannan sashe ba sake buɗe
hanyar scale-out ta DATA_DIR ba ne.
