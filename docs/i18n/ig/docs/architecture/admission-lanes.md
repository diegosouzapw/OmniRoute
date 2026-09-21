# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute nwere usoro lane abụọ dị n'ime process, nke ọ bụla nwere oke ọrụ dị iche. Ha na-arụkọ ọrụ ọnụ; ndị na-ahụ maka sistemụ kwesịrị ịma nke ha na-ele anya na ya.

## 1. Nnabata n'ogo byte n'ofe process (`chatBodyAdmission.ts`)

- **Oke ọrụ:** ụzọ buffered-body/heap maka `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, na route ndị ọzọ yiri chat. Ọ na-echebe
  megide mmụba heap nke body buru ibu sitere na coding-agent (#4380).
- **Otu controller zuru process niile, ọ bụghị lane dị iche maka key ọ bụla (#10110).** API key
  ọ bụla (nke e mere hash) ma ọ bụ session `anonymous` na-arịọ nnabata site na budget
  **otu** a na-ekekọrịta — a na-eji session id e mere hash NANA dịka key maka ịhazi
  izi ezi (round-robin dispatch n'etiti ndị na-echere), ọ bụghị dịka shard capacity.
  Ụdị doc a gara aga kọwara lane dị iche maka key ọ bụla nwere capacity nke onwe ya;
  e wepụrụ model ahụ na #10110 n'ihi na ọ na-enye ohere ka credential adịgboroja
  ndị na-enweghị authentication mụbaa oke zuru process niile.
- **Gate (#503-fanout): budget BYTE ingest a na-enweta na-akpaghị aka, ọ bụghị ọnụ ọgụgụ request
  edoziri.** Oke ochie nke `CHAT_MAX_HEAVY_IN_FLIGHT` dabere n'ọnụ ọgụgụ request (default `1`
  tupu ndozi a) mere ka fan-out coding-agent (ọtụtụ subagent/CLI,
  body ndị na-abụkarị > 256 KB) daa ruo effective concurrency nke ~1, nke kpatara
  503 n'okpuru load nkịtị kpamkpam. Ugbu a, ọ na-amalite ịchịkwa naanị mgbe operator
  setịpụrụ `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` kpọmkwem. Ọ bụrụ na ahapụghị ya ka e setịpụ,
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ga-abụzi ihe na-achịkwa nnabata — budget a na-enweta
  na-akpaghị aka site na oke memory n'ezie nke process (`src/shared/middleware/admissionBudget.ts`):
  25% nke nke kacha nta n'etiti oke V8 heap na oke cgroup/container ọ bụla,
  kewara ya site na factor mmụba nwa oge nke 8x, ma kpachie ya n'etiti 8 MiB na
  2 GiB. Override akọwapụtara kpọmkwem na-eji otu oke ndị ahụ. Nke a na-agbanwe nha ya
  n'onwe ya site na container 512 MB ruo desktop 32 GB na-enweghị env tuning. Body nke
  na-enweghị ike ịbanye n'ime effective budget ga-ada ozugbo na `413 body_exceeds_budget`;
  naanị esemokwu n'etiti body ndị nke ọ bụla nwere ike ijere ozi na-abanye na queue
  izi ezi nwere oke. Tracker nrụgide resource nwere ọtụtụ signal nke na-arụ ọrụ ozugbo
  (V8 heap ratio, cgroup, PSI, OOM events — `open-sse/utils/resourcePressurePolicy.ts`)
  na-ebelata oge nchere nwere oke mgbe nrụgide bụ `high`, ma na-ewepụ request ozugbo site na
  `503 resource_pressure` mgbe nrụgide bụ `critical`, tupu etinye ọbụna byte ọ bụla.
- **Nhazi:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — override maka byte budget a na-enweta na-akpaghị aka
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — oke ochie dabere n'ọnụ ọgụgụ request, opt-in naanị
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — oge ichere na queue tupu 503 (default 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — valvụ heap maka byte ndị nọ na queue (default 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — anaghịzi akwado ha,
    ha anaghị arụ ọrụ kemgbe #10110 (a na-anabata ha maka ndakọrịta config, mana a na-eleghara ha anya)
- **Akụkọ:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — gụnyere
  mgbakwunye #503-fanout ndị a: `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, na `countCapEnabled`
  (false na deployment default — nke a na-akwado na ọ bụ byte budget, ọ bụghị oke ochie
  dabere n'ọnụ ọgụgụ, bụ ihe na-achịkwa n'ezie).

## 2. Ahịrị ụzọ mebere nke runtime na-emegharị onwe ya (`open-sse/services/admission`)

- **Oke ọrụ:** nnabata dabere na tenant-key maka iziga na provider — ọnụ ahịa kwụ, mmegharị
  limit nke latency na-eduzi, itinye n'ahịrị dịka lane si dị, na metrik lane.
- **Ọnụ ụzọ:** **a ga-ahọrọ iji ya.** A na-agbanyụ ya ma ọ bụrụ na `OMNIROUTE_CHAT_VIRTUAL_LANES=true` adịghị. Na-enweghị ya,
  adaptive controller na-edobe omume nke ahịrị kwụ ejikọtara ọnụ (criterion 1 nke #9654 na-adị irè naanị
  mgbe onye na-ahụ maka sistemụ gbanyere lanes).
- **Nhazi:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptive config (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Akụkọ:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (lane IDs ndị ezoro ọdịdị ha, ọ bụghị raw
  keys), na `virtualLanes` — ọkọlọtọ kachasị nwee ntụkwasị obi na snapshot nke na-egosi na "lanes agbanyere."

## 3. Nnwale fan-out — nnabata kwa target maka combo/fusion (#9654 Wave 2)

Combo (priority / round-robin) na fusion na-ekesa ọrụ gaa na target model N n'okpuru otu parent
request. Kemgbe #9654 Wave 2, **a na-enyocha target fan-out ọ bụla tupu dispatch** site na
nnwale kwa target (`PerTargetAdmissionHook`, nke `createPerTargetAdmissionHook` wuru)
megide lane tenant nke **parent**.

- **Oke ọrụ:** target fan-out ọ bụla combo, fusion, na chaos engine zipụrụ.
  System 1 (byte-level) anaghị emetụta — ọ naghị enyocha target fan-out ma ọlị.
- **Ọnụ ụzọ:** **a ga-ahọrọ iji ya ya na system 2.** Ọ naghị eme ihe mgbe
  `OMNIROUTE_CHAT_VIRTUAL_LANES` edoghị — parent request ejidela lease nke shared-queue
  na mode ahụ, ya mere nyocha ga-agụta ya ugboro abụọ ma jụ target combo.
- **Nkọwa omume:**
  - **Ọ naghị egbochi ma ọlị — mafere ya, etinyekwala ya n'ahịrị.** `maxWaitMs 0`: lane juru
    na-eme ka a mafere target ahụ, combo's fallback machinery (ma ọ bụ fusion's survivor
    panel) wee nye ọrụ kama ya. E mere nke a ụma: target fan-out bụ ọrụ enwere ike
    ịhapụ, na itinye ya n'ahịrị na-agbakwụnye ibu ọzọ n'otu ebe mkpọchi lanes dị
    iji kwụsị. Ya mere, `defaultMaxWaitMs` metụtara naanị **parent request**;
    nnwale fan-out anaghị echere ma ọlị, ma n'ebumnobi, **enweghị knob** iji mee ka
    ha chere (akụkọ issue na-egosi na knobs nchere kpatara ụdị mass-502/504 nke
    #9654 na-egbochi — tụlee ya ọzọ naanị ma ọ bụrụ na onye na-ahụ maka sistemụ ekwuo na ịmafe target fan-out
    na-emebi ogo nzaghachi).
  - **Hapụ ya ozugbo a nabatara ya.** Nnwale a nabatara na-ahapụ lease ya ozugbo: ọ bụ
    ọnụ ụzọ ikike, ọ bụghị njide. Lease nke parent na-ekpuchi fan-out; ijide N
    ọzọ ga-eme ka ọnụ ahịa shared active bawanye n'ụzọ na-abụghị eziokwu ma jụ tenant ndị ọzọ. Ọ bụ mbọ kacha mma,
    ọ bụghị reservation: lane nwere ike iju ọzọ n'etiti probe na dispatch, ya mere n'oge
    asọmpi siri ike, ọnụ ụzọ ahụ nwere ike ikwe ka a banye na lane nke juru ọzọ tupu
    oge a ga-eziga target ahụ eruo.
  - **A na-agbakọ ọnụ ahịa site na body fan-out n'ezie.** Nnwale ahụ na-atụ ọnụ ahịa site na
    body target ahụ n'ezie — tinyere request class ewepụtara site na ọkọlọtọ `stream`
    ya, kpọmkwem dịka parent path — ya mere ndị otu fusion panel (`stream: false`)
    na-enweta ọnụ ahịa nke non-streaming class ha ga-eji n'ezie, ebe priority/RR
    targets na-enweta nke kwekọrọ n'ihe onye ọrụ rịọrọ.
- **Akụkọ:** ịmafe probe mgbe target mbụ gachara na-abawanye combo's per-request
  `fallbackCount` (na-agbaso fallback semantics dị ugbu a; a na-ahụ ya na combo
  logs); fusion na-eweghachi 503 mgbe a mafere onye otu panel ọ bụla. Enweghị
  **aggregate counter** (dịka `virtualFanoutSkipped`) na snapshot ugbu a —
  ọ bụrụ na onye na-ahụ maka sistemụ ekwuo na ha enweghị ike ịmata ugboro ole lane gate na-amafe fan-out
  targets, nke ahụ bụ ihe ga-akpalite itinye otu.

## Kedu nke na-apụta na dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptive virtual lanes** (sistemụ 2).
- `adaptiveAdmission.virtualLanes === true` → probes fan-out ndị dị na ngalaba 3
  na-arụkwa ọrụ. Payload nke `virtualLanes` na-adịghị na ya ma ọ bụ nke ọ bụ `false` pụtara na
  edoghị `OMNIROUTE_CHAT_VIRTUAL_LANES` — lanes ndị dị n'ogo byte (sistemụ 1)
  ka na-arụ ọrụ, mana ọ dịghị ihe dị n'okpuru `adaptiveAdmission` (ma ọ bụ mgbochi fan-out)
  ga-arụ ọrụ ruo mgbe enyere ya aka.

## Ihe mere ha abụọ ji dị

Lanes ndị dị n'ogo byte na-amachi ụzọ parse/compress nke na-eji nnukwu ebe nchekwa;
adaptive lanes na-amachi ọnụ ahịa dispatch maka tenant ọ bụla. Sistemụ 1 na-amanye
usoro njirisi 1 nke #9654 ("mgbawa arịrịọ nke otu session anaghị eme ka nke ọzọ nweta 503")
mgbe niile, sistemụ 2 na-amanyekwa ya ozugbo agbanyere opt-in.

## 4. `/v1/responses` ogologo n'ime otu process (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) gbakwụnyere
`tryAcquireHealthyHeadroom` ka e wee nabata arịrịọ nke abụọ nke dị arọ n'usoro
mgbe heap dị n'okpuru `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Ụzọ BYTE
nke `admitChatRequest` na-eji (bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
ndabara bụ 256 KiB, gụnyere `POST /v1/responses`) na-eji ụzọ mgbapụ **otu ahụ**.

Nke a bụ usoro **otu-process** a na-akwado maka inwe ihe karịrị SSE
`/v1/responses` ogologo abụọ na-arụkọ ọrụ n'otu oge: bulie primary + healthy-headroom
naanị ruo ebe heap na mmefu ego byte ndị na-arụ ọrụ n'ofe process ahụ dum
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) kwere. Inwe ọtụtụ iri clients SSE
ogologo (40–50) bụ ajụjụ gbasara mmefu ego ebe nchekwa ahụ, ọ bụghị oke ngwaahịa
“max 2” siri ike. Heap nọ n'okpuru nrụgide ka na-ewepụ arịrịọ site na iji `503`
nke enwere ike ịnwale ọzọ, ka #7849 ghara ịlaghachi.

Iji **mụbaa heaps**, mee ka N `DATA_DIR`s nọọrọ onwe ha rụọ ọrụ (#11024). Ejila
`replicas > 1` n'otu faịlụ SQLite ma ọlị (#10350). Ngalaba a anaghị emepegharị
usoro scale-out nke DATA_DIR.
