# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute għandu **żewġ** sistemi ta’ korsiji lokali għall-proċess b’ambiti differenti. Dawn huma
komplementari; l-operaturi għandhom ikunu jafu liema waħda qed jaraw.

## 1. Ammissjoni għall-proċess kollu fil-livell tal-bytes (`chatBodyAdmission.ts`)

- **Ambitu:** il-perkors tal-body ibbufferjat/heap għal `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, u r-rotot l-oħra bi struttura taċ-chat. Jipproteġi
  kontra l-amplifikazzjoni tal-heap minn bodies kbar ta’ coding agents (#4380).
- **Kontrollur globali wieħed għal kull proċess, mhux korsiji għal kull key (#10110).** Kull API key
  (hashed) jew sessjoni `anonymous` tiġi ammessa mal-**istess** baġit kondiviż —
  l-id tas-sessjoni hashed tintuża BISS bħala key għall-iskedar ġust (distribuzzjoni
  round-robin bejn dawk li qed jistennew), u qatt bħala shard tal-kapaċità. Verżjoni preċedenti ta’
  dan id-dokument iddeskriviet korsiji għal kull key b’kapaċità indipendenti; dak il-mudell
  tneħħa f’#10110 għax kien jippermetti li kredenzjali foloz mhux awtentikati jimmultiplikaw
  il-limitu għall-proċess kollu.
- **Gate (#503-fanout): baġit ta’ BYTE għall-ingest idderivat awtomatikament, mhux għadd fiss ta’
  requests.** Il-limitu l-antik `CHAT_MAX_HEAVY_IN_FLIGHT` ibbażat fuq l-għadd ta’ requests (default `1`
  qabel din it-tiswija) kien inaqqas il-fan-out tal-coding agents (diversi subagents/CLIs,
  b’bodies li normalment ikunu > 256 KB) għal konkorrenza effettiva ta’ madwar 1, li kienet
  twassal għal 503 taħt tagħbija kompletament normali. Issa japplika biss meta operatur
  jistabbilixxi espliċitament `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Jekk ma jiġix issettjat, l-ammissjoni minflok
  tkun ikkontrollata minn `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — baġit idderivat awtomatikament mil-
  limitu reali tal-memorja tal-proċess (`src/shared/middleware/admissionBudget.ts`):
  25% tal-iżgħar limitu bejn dak tal-heap ta’ V8 u kwalunkwe limitu ta’ cgroup/container,
  diviż b’fattur ta’ amplifikazzjoni tranżitorja ta’ 8x, u ristrett bejn 8 MiB u
  2 GiB. Overrides espliċiti jużaw l-istess limiti. Dan jadatta ruħu minn
  container ta’ 512 MB sa desktop ta’ 32 GB mingħajr konfigurazzjoni tal-env. Body li ma jistax
  joqgħod fil-baġit effettiv ifalli immedjatament b’`413 body_exceeds_budget`;
  il-kju limitat u ġust jintuża biss meta jkun hemm kompetizzjoni bejn bodies li kull wieħed minnhom
  jista’ jiġi pproċessat. Tracker attiv tal-pressjoni fuq ir-riżorsi b’diversi sinjali (proporzjon tal-heap ta’ V8,
  cgroup, PSI, avvenimenti OOM — `open-sse/utils/resourcePressurePolicy.ts`) iqassar
  l-istennija limitata taħt pressjoni `high` u jirrifjuta immedjatament b’
  `503 resource_pressure` taħt pressjoni `critical`, qabel ma jiġu inġeriti xi bytes.
  PSI jinqara mill-`memory.pressure` tas-cgroup ta’ din l-unità meta jkun preżenti
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` japplika
  għall-host kollu u jintuża biss bħala fallback fuq bare metal / cgroup v1, sabiex host
  li qed jagħmel swapping ma jkunx jista’ jagħti 503 lil container inattiv.
- **Konfigurazzjoni:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — override għall-baġit tal-bytes idderivat awtomatikament
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — limitu antik tal-għadd ta’ requests, opt-in biss
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — ħin ta’ stennija fil-kju qabel 503 (default 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — valv tal-heap għall-bytes fil-kju (default 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — deprekati
    u bla effett minn #10110 ’l hawn (aċċettati għall-kompatibbiltà tal-konfigurazzjoni, iżda injorati)
- **Rapporti:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — inklużi
  ż-żidiet ta’ #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, u `countCapEnabled`
  (false f’deployment default — jikkonferma li huwa l-baġit tal-bytes, mhux il-limitu
  antik tal-għadd, li fil-fatt qed jillimita).

## 2. Korsiji virtwali adattivi waqt it-tħaddim (`open-sse/services/admission`)

- **Ambitu:** ammissjoni skont iċ-ċavetta tal-inkwilin għad-dispaċċ tal-fornitur — kost tal-kju, adattament tal-limitu ggwidat mil-latenza, tqegħid fil-kju tal-korsiji, u metriċi tal-korsiji.
- **Attivazzjoni:** **opt-in.** Diżattivat sakemm `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Mingħajru, il-kontrollur adattiv iżomm l-imġiba tal-kju kondiviż (il-kriterju 1 ta’ #9654 japplika biss ladarba operatur jattiva l-korsiji).
- **Irfinar:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + konfigurazzjoni adattiva (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Rapporti:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (IDs opaki tal-korsiji, qatt ċwievet mhux ipproċessati), u `virtualLanes` — il-bandiera awtorevoli “il-korsiji huma attivi” fl-istampa istantanja.

## 3. Sondi fan-out — ammissjoni għal kull mira għal combo/fusion (#9654 Mewġa 2)

Combo (prijorità / round-robin) u fusion ixerrdu N miri tal-mudell taħt talba prinċipali waħda. Minn #9654 Mewġa 2 ’l hawn, **kull mira fan-out tiġi kkontrollata qabel id-dispaċċ** permezz ta’ sonda għal kull mira (`PerTargetAdmissionHook`, mibnija minn `createPerTargetAdmissionHook`) kontra l-korsija tal-inkwilin tat-talba **prinċipali**.

- **Ambitu:** kull mira fan-out mibgħuta minn combo, fusion, u l-magna tal-kaos.
  Is-sistema 1 (fil-livell tal-bytes) mhijiex affettwata — qatt ma tittestja miri fan-out.
- **Attivazzjoni:** **opt-in mas-sistema 2.** Ma tagħmel xejn meta `OMNIROUTE_CHAT_VIRTUAL_LANES`
  ma jkunx issettjat — f’dik il-modalità, it-talba prinċipali diġà żżomm il-kirja tal-kju kondiviż,
  għalhekk l-ittestjar jgħodd doppju u jirrifjuta l-miri combo.
- **Semantika:**
  - **Strettament mingħajr imblukkar — aqbeż, qatt tqiegħed fil-kju.** `maxWaitMs 0`: korsija mimlija
    taqbeż il-mira u minflok jintuża l-mekkaniżmu ta’ riżerva tal-combo (jew il-pannell tas-superstiti
    ta’ fusion). Dan huwa intenzjonat: mira fan-out hija xogħol żejjed,
    u t-tqegħid tagħha fil-kju jakkumula aktar tagħbija preċiżament fuq il-konġestjoni li l-korsiji jeżistu
    biex iwaqqfu. Għalhekk, `defaultMaxWaitMs` japplika għat-**talba prinċipali biss**;
    is-sondi fan-out qatt ma jistennew, u intenzjonalment **ma hemm ebda kontroll** biex
    iġegħelhom jistennew (l-istorja tal-kwistjoni turi li l-kontrolli tal-istennija pproduċew il-kategorija ta’ 502/504 tal-massa
    li #9654 jipprevjeni — ikkunsidra dan mill-ġdid biss jekk operatur jirrapporta li miri fan-out maqbuża
    qed jagħmlu ħsara lill-kwalità tar-rispons).
  - **Rilaxx mal-ammissjoni.** Sonda ammessa tirrilaxxa l-kirja tagħha immedjatament: hija
    kontroll tal-kapaċità, mhux żamma. Il-kirja tat-talba prinċipali tkopri l-fan-out; iż-żamma ta’ N
    oħrajn iżżid artifiċjalment il-kost attiv kondiviż u tirrifjuta inkwilini oħra. Hija tal-aħjar sforz,
    mhux riżervazzjoni: il-korsija tista’ terġa’ timtela bejn is-sonda u d-dispaċċ, għalhekk taħt
    kompetizzjoni qawwija l-kontroll jista’ jammetti f’korsija li terġa’ tkun mimlija sa meta
    tintbagħat il-mira.
  - **Ipprezzata mill-korp fan-out reali.** Is-sonda tistma l-kost mill-korp
    reali tal-mira — inkluża l-klassi tat-talba derivata mill-bandiera `stream`
    tagħha, eżatt bħall-mogħdija prinċipali — sabiex il-membri tal-pannell fusion (`stream: false`)
    jiġu pprezzati skont il-klassi mhux streaming li tassew se jokkupaw, u l-miri priority/RR
    skont dak li talab l-utent.
- **Rapporti:** sonda maqbuża wara l-ewwel mira żżid il-`fallbackCount` għal kull talba
  tal-combo (b’mod li jirrifletti s-semantika eżistenti tar-riżerva; viżibbli fir-reġistri tal-combo);
  fusion tirritorna 503 meta kull membru tal-pannell jinqabeż. Bħalissa **ma hemm
  ebda kontatur aggregat** (eż. `virtualFanoutSkipped`) fl-istampa istantanja —
  jekk operatur jirrapporta li ma jistax jiddetermina kemm-il darba l-kontroll tal-korsija jaqbeż miri fan-out,
  dan ikun l-iskattatur biex jiżdied wieħed.

## Liema waħda tidher f’dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **korsiji virtwali adattivi** (sistema 2).
- `adaptiveAdmission.virtualLanes === true` → il-probes fan-out tat-taqsima 3 huma
  attivi wkoll. Payload fejn `virtualLanes` tkun nieqsa jew `false` ifisser li
  `OMNIROUTE_CHAT_VIRTUAL_LANES` mhix issettjata — il-korsiji fil-livell tal-bytes (sistema 1)
  jibqgħu attivi, iżda xejn taħt `adaptiveAdmission` (u ebda gating fan-out) ma jkun
  fis-seħħ sakemm din tiġi attivata.

## Għaliex jeżistu t-tnejn

Il-korsiji fil-livell tal-bytes jillimitaw il-passaġġ ta’ parse/compress li juża ħafna memorja;
il-korsiji adattivi jillimitaw l-ispiża tad-dispatch għal kull tenant. Il-kriterju 1 ta’ #9654
(“żieda f’daqqa minn sessjoni waħda ma tikkawżax 503 għal oħra”) jiġi infurzat
mingħajr kundizzjonijiet mis-sistema 1 u mis-sistema 2 ladarba l-opt-in jiġi attivat.

## 4. `/v1/responses` twal fi proċess wieħed (marġni b’saħħtu)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) żiedet
`tryAcquireHealthyHeadroom` sabiex it-tieni request strutturalment tqila tiġi aċċettata
meta l-heap tkun taħt `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Il-passaġġ BYTE
użat minn `admitChatRequest` (bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
default ta’ 256 KiB, inkluż `POST /v1/responses`) juża l-**istess** mekkaniżmu ta’ ħelsien.

Din hija r-riċetta appoġġjata għal **proċess wieħed** biex ikun hemm aktar minn żewġ
SSE `/v1/responses` twal konkorrenti: għolli l-kapaċità primarja + il-marġni b’saħħtu
biss sal-limitu permess mill-heap u mill-baġit tal-bytes inflight għall-proċess kollu
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Għexieren ta’ klijenti SSE fit-tul
(40–50) huma kwistjoni ta’ dak il-baġit tal-memorja, mhux limitu riġidu tal-prodott ta’
“massimu ta’ 2”. Heap taħt pressjoni xorta twaqqa’ requests b’`503` li jista’ jerġa’
jiġi ppruvat, sabiex #7849 ma terġax isseħħ.

Biex **timmultiplika l-heaps**, ħaddem N `DATA_DIR`s indipendenti (#11024). Qatt tuża
`replicas > 1` fuq fajl SQLite wieħed (#10350). Din it-taqsima mhijiex ftuħ mill-ġdid
tar-riċetta ta’ scale-out b’DATA_DIR.
