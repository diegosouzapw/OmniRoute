# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute yana da tsarin layi na cikin tsari guda **biyu** masu iyakoki daban-daban. Suna
cika juna; ya kamata masu gudanarwa su san wanne ne suke dubawa.

## 1. Karɓar bayanai a matakin byte a faɗin tsari (`chatBodyAdmission.ts`)

- **Iyaka:** hanyar buffered-body/heap don `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, da sauran hanyoyi masu tsarin chat. Yana karewa
  daga ƙaruwa mai yawa ta heap sakamakon manyan bodies na coding-agent (#4380).
- **Mai sarrafawa guda ɗaya na tsari gaba ɗaya, ba layuka na kowane maɓalli ba (#10110).** Kowane API key
  (wanda aka yi wa hash) ko zaman `anonymous` yana neman izini daga **kasafin kuɗi guda ɗaya** da aka raba —
  ana amfani da hashed session id ne KAWAI a matsayin maɓallin tsara adalci (rarrabawa ta round-robin
  tsakanin masu jira), ba a taɓa amfani da shi a matsayin rabon ƙarfin aiki ba. Wata tsohuwar sigar wannan
  takarda ta bayyana layukan kowane maɓalli masu ƙarfin aiki masu zaman kansu; an
  cire wannan tsarin a #10110 saboda yana bai wa bayanan shaidar bogi marasa tantancewa damar ninka
  iyakar tsari gaba ɗaya.
- **Ƙofar shiga (#503-fanout): kasafin BYTE na shigarwa da ake ƙirƙira ta atomatik, ba ƙayyadadden adadin buƙatu
  ba.** Tsohon iyakar adadin buƙatu na `CHAT_MAX_HEAVY_IN_FLIGHT` (tsoho `1`
  kafin wannan gyara) ya durƙusar da fan-out na coding-agent (subagents/CLIs da yawa,
  bodies da kan kai > 256 KB akai-akai) zuwa ingantaccen concurrency na ~1, wanda ya haifar da 503
  a ƙarƙashin cikakken nauyin aiki na yau da kullum. Yanzu yana aiki ne kawai idan mai gudanarwa ya saita
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` kai tsaye. Idan ba a saita shi ba, maimakon haka ana
  sarrafa karɓar bayanai ta `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — kasafin kuɗi da ake ƙirƙira ta atomatik daga
  ainihin iyakar ƙwaƙwalwar tsari (`src/shared/middleware/admissionBudget.ts`):
  25% na mafi ƙarancin iyaka tsakanin iyakar V8 heap da kowace iyakar cgroup/container,
  a raba da ma'aunin ƙaruwa na wucin gadi na 8x, sannan a iyakance tsakanin 8 MiB da
  2 GiB. Sauye-sauyen da aka saita kai tsaye suna amfani da iyakokin iri ɗaya. Wannan yana daidaita kansa daga
  container mai 512 MB zuwa desktop mai 32 GB ba tare da daidaita env ba. Body da ba zai iya
  shiga cikin ingantaccen kasafin ba zai gaza nan take da `413 body_exceeds_budget`;
  fafatawa tsakanin bodies waɗanda za a iya sarrafa kowannensu ce kaɗai ke shiga iyakantaccen
  layin adalci. Mai bibiyar matsin albarkatu na kai-tsaye mai sigina da yawa (rabon V8 heap,
  cgroup, PSI, al'amuran OOM — `open-sse/utils/resourcePressurePolicy.ts`) yana rage
  iyakantaccen lokacin jira a ƙarƙashin matsin `high`, kuma yana watsar da buƙata nan take da
  `503 resource_pressure` a ƙarƙashin matsin `critical`, tun kafin ma a shigar da wani byte.
  Ana karanta PSI daga `memory.pressure` na cgroup na wannan unit idan yana nan
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` ya shafi
  host gaba ɗaya kuma madadi ne kawai a bare metal / cgroup v1, don haka host da ke
  yin swapping ba zai iya sa container marar aiki ya mayar da 503 ba.
- **Daidaitawa:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — sauya kasafin byte da ake ƙirƙira ta atomatik
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — tsohon iyakar adadin buƙatu, sai an zaɓa a kunna shi
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — jiran layi kafin 503 (tsoho 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — bawul ɗin heap na queued-bytes (tsoho 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — an daina amfani da su,
    ba sa yin komai tun daga #10110 (ana karɓarsu don dacewa da config, amma ana yin watsi da su)
- **Rahotanni:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — ciki har da
  ƙarin abubuwan #503-fanout na `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, da `countCapEnabled`
  (false ne a deployment na tsoho — yana tabbatar da cewa kasafin byte ne, ba tsohon
  iyakar adadi ba, yake aiki a zahiri).

## 2. Layukan kama-da-wane masu daidaitawa a lokacin aiki (`open-sse/services/admission`)

- **Iyaka:** karɓa bisa maɓallin tenant don aikawa zuwa provider — kuɗin layin jira, daidaita
  iyaka bisa jinkiri, sanya buƙatu cikin layukan jira, da ma'aunin layuka.
- **Ƙofa:** **ana kunna shi da gangan.** Yana kashe sai idan `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Idan babu shi,
  mai sarrafa daidaitawa yana ci gaba da amfani da halayen layin jira na bai ɗaya (sharadi na 1 na #9654 yana
  aiki ne kawai bayan mai gudanarwa ya kunna layukan).
- **Saitawa:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + saitunan daidaitawa (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Rahotanni:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ID ɗin layuka marasa bayyana ainihi, ba a taɓa nuna ainihin
  maɓallan ba), da `virtualLanes` — tabbatacciyar alamar "an kunna layuka" a cikin snapshot.

## 3. Binciken fan-out — karɓa ga kowace manufa don combo/fusion (#9654 Wave 2)

Combo (fifiko / round-robin) da fusion suna yaɗa aiki zuwa manufofin model guda N a ƙarƙashin buƙatar
uwa guda. Tun daga #9654 Wave 2, **ana tantance kowace manufa ta fan-out kafin aikawa** ta hanyar
binciken kowace manufa (`PerTargetAdmissionHook`, wanda `createPerTargetAdmissionHook` ya gina)
a kan layin tenant na **buƙatar uwa**.

- **Iyaka:** kowace manufa ta fan-out da combo, fusion, da injin chaos suke aikawa.
  System 1 (matakin byte) bai shafa ba — ba ya taɓa bincika manufofin fan-out.
- **Ƙofa:** **ana kunna shi da gangan tare da system 2.** Ba ya yin komai idan ba a saita `OMNIROUTE_CHAT_VIRTUAL_LANES`
  ba — buƙatar uwa ta riga ta riƙe lease na layin jira na bai ɗaya a wannan yanayin,
  don haka binciken zai ƙirga sau biyu kuma ya ƙi manufofin combo.
- **Ma'ana:**
  - **Ba ya toshewa sam — tsallake, kada a taɓa sanya shi cikin layin jira.** `maxWaitMs 0`: idan layi ya cika,
    ana tsallake manufar, sannan tsarin fallback na combo (ko rukunin waɗanda suka tsira na fusion)
    ya yi aiki a madadinsa. Wannan ganganci ne: manufar fan-out aiki ne mai maimaituwa,
    kuma sanya ta cikin layin jira yana ƙara nauyi a kan ainihin cunkoson da aka ƙirƙiri layuka
    don dakatarwa. Saboda haka `defaultMaxWaitMs` yana aiki ne ga **buƙatar uwa kawai**;
    binciken fan-out ba ya taɓa jira, kuma da gangan **babu knob** da zai sa
    ya jira (tarihin issue ya nuna cewa knob na jira ya haifar da nau'in yawaitar-502/504
    da #9654 ke hanawa — a sake dubawa ne kawai idan mai gudanarwa ya bayar da rahoton cewa manufofin fan-out
    da aka tsallake suna rage ingancin amsa).
  - **Saki-bayan-karɓa.** Binciken da aka karɓa yana sakin lease ɗinsa nan take: ƙofar
    iya aiki ce, ba riƙewa ba. Lease na buƙatar uwa yana rufe fan-out; riƙe ƙarin N
    zai ƙara kuɗin aiki na bai ɗaya fiye da kima kuma ya ƙi sauran tenants. Ƙoƙari ne gwargwadon hali,
    ba tanadin wuri ba ne: layin na iya sake cikewa tsakanin bincike da aikawa, don haka a ƙarƙashin
    gasa mai tsanani ƙofar na iya karɓar aiki zuwa layin da ya sake cika kafin
    lokacin da za a aika manufar.
  - **Ana ƙididdige kuɗinsa daga ainihin jikin fan-out.** Binciken yana kimanta kuɗi daga
    ainihin jikin manufar — ciki har da ajin buƙatar da aka samo daga alamar `stream`
    ɗinsa, daidai kamar hanyar buƙatar uwa — saboda haka ana ƙididdige mambobin rukunin fusion (`stream: false`)
    a ajin non-streaming da za su mamaye da gaske, yayin da manufofin priority/RR
    suke amfani da duk abin da mai amfani ya nema.
- **Rahotanni:** tsallakewar bincike bayan manufa ta farko yana ƙara `fallbackCount` na kowace buƙatar
  combo (daidai da ma'anar fallback da ake da ita; ana iya gani a cikin logs na combo);
  fusion yana mayar da 503 idan an tsallake kowane mamban rukuni. A yau
  **babu jimillar counter** (misali `virtualFanoutSkipped`) a kan snapshot —
  idan mai gudanarwa ya bayar da rahoton cewa ba zai iya sanin sau nawa ƙofar layi take tsallake manufofin fan-out
  ba, wannan shi ne abin da zai sa a ƙara guda.

## Wanne ne yake bayyana a allon sarrafawa

- `adaptiveAdmission.laneCount` / `laneTenants` → **layukan kama-da-wane masu daidaitawa** (tsari na 2).
- `adaptiveAdmission.virtualLanes === true` → gwaje-gwajen fan-out na sashe na 3 su ma
  suna aiki. Payload da `virtualLanes` ba ya ciki ko yake `false` yana nufin
  ba a saita `OMNIROUTE_CHAT_VIRTUAL_LANES` ba — layukan matakin-byte (tsari na 1)
  har yanzu suna aiki, amma babu wani abu a ƙarƙashin `adaptiveAdmission` (kuma babu
  shingen fan-out) da zai fara aiki har sai an kunna shi.

## Dalilin da ya sa dukansu suke wanzuwa

Layukan matakin-byte suna iyakance hanyar parse/compress mai cin ƙwaƙwalwa sosai;
layukan masu daidaitawa kuma suna iyakance kuɗin dispatch ga kowane tenant. Sharadi na 1
na #9654 ("yawaitar buƙatun zaman guda ɗaya ba ta jawo wa wani kuskuren 503") ana
tilasta shi ta tsarin 1 ba tare da wani sharadi ba, sannan ta tsarin 2 bayan an kunna opt-in.

## 4. `/v1/responses` mai tsawo a process guda (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ya ƙara
`tryAcquireHealthyHeadroom` domin a karɓi buƙata ta biyu mai nauyin tsari
idan heap yana ƙasa da `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Hanyar BYTE
da `admitChatRequest` ke amfani da ita (bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
tsoho 256 KiB, ciki har da `POST /v1/responses`) tana amfani da hanyar tserewa
**iri ɗaya**.

Wannan ita ce ingantacciyar dabarar **process guda** don samun fiye da
`/v1/responses` na SSE dogaye guda biyu da ke gudana lokaci guda: ƙara primary +
healthy-headroom gwargwadon abin da heap da kasafin inflight-byte na dukkan process
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) suka bari kawai. Dubunnan clients
na SSE dogaye (40–50) batu ne na wannan kasafin ƙwaƙwalwa, ba ƙaƙƙarfan iyakar
samfuri ta “max 2” ba. Heap da ke ƙarƙashin matsin lamba har yanzu yana zubar da
buƙatu tare da `503` da za a iya sake gwadawa, don kada #7849 ya dawo.

Don **ninka heaps**, gudanar da `DATA_DIR`s masu zaman kansu guda N (#11024). Kada
a taɓa amfani da `replicas > 1` a kan fayil ɗin SQLite guda ɗaya (#10350). Wannan
sashen ba sake buɗe dabarar scale-out ta DATA_DIR ba ne.
