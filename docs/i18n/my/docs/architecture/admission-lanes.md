# Admission lanes (#9654) — two lane systems, what gates each, where each reports (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute တွင် နယ်ပယ်အတိုင်းအတာ မတူညီသည့် process-local lane စနစ် **နှစ်ခု** ရှိသည်။ ၎င်းတို့သည်
အပြန်အလှန် ဖြည့်စွက်ပေးသည့် စနစ်များဖြစ်သောကြောင့် operator များအနေဖြင့် မည်သည့်စနစ်ကို ကြည့်နေသည်ကို သိရှိထားသင့်သည်။

## 1. Byte အဆင့် process တစ်ခုလုံးဆိုင်ရာ ဝင်ခွင့်ထိန်းချုပ်မှု (`chatBodyAdmission.ts`)

- **သက်ရောက်မှုနယ်ပယ်:** `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` နှင့် အခြား chat ပုံစံ route များအတွက်
  buffered-body/heap လမ်းကြောင်း ဖြစ်သည်။ ကြီးမားသော coding-agent body များကြောင့်
  ဖြစ်ပေါ်လာသော heap ချဲ့ထွင်မှုမှ ကာကွယ်ပေးသည် (#4380)။
- **Key တစ်ခုချင်းစီအလိုက် lane များမဟုတ်ဘဲ process-global controller တစ်ခုတည်းကို အသုံးပြုသည် (#10110)။**
  API key (hash လုပ်ထားသော) သို့မဟုတ် `anonymous` session တိုင်းသည်
  **တူညီသော** မျှဝေ budget တစ်ခုတည်းဖြင့် ဝင်ခွင့်ရယူသည် — hash လုပ်ထားသော
  session id ကို မျှတသော အစီအစဉ်ချမှတ်မှု key အဖြစ်သာ အသုံးပြုသည်
  (စောင့်ဆိုင်းသူများအကြား round-robin ဖြင့် dispatch လုပ်ခြင်း)၊ capacity shard
  အဖြစ် မည်သည့်အခါမျှ အသုံးမပြုပါ။ ဤစာတမ်း၏ ယခင် version တစ်ခုတွင် သီးခြား
  capacity များရှိသော key တစ်ခုချင်းစီအလိုက် lane များကို ဖော်ပြထားခဲ့သည်။
  အဆိုပါ model သည် authentication မပြုရသေးသော credential အတုများဖြင့်
  process တစ်ခုလုံးဆိုင်ရာ ကန့်သတ်ချက်ကို ဆတိုးချဲ့နိုင်စေသောကြောင့် #10110 တွင်
  ဖယ်ရှားခဲ့သည်။
- **Gate (#503-fanout): ပုံသေ request အရေအတွက်မဟုတ်ဘဲ အလိုအလျောက် တွက်ချက်သတ်မှတ်သော ingest BYTE budget ဖြစ်သည်။**
  ယခင် `CHAT_MAX_HEAVY_IN_FLIGHT` request အရေအတွက် ကန့်သတ်ချက် (ဤပြင်ဆင်မှုမတိုင်မီ
  မူလတန်ဖိုး `1`) သည် coding-agent fan-out (subagent/CLI အများအပြား၊ body များသည်
  ပုံမှန်အားဖြင့် > 256 KB) ကို လက်တွေ့ concurrency ~1 အထိ ကျဆင်းစေခဲ့ပြီး
  လုံးဝပုံမှန်ဖြစ်သော load အောက်တွင်ပင် 503 ဖြစ်စေခဲ့သည်။ ယခုအခါ operator က
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ကို အတိအလင်း သတ်မှတ်ထားမှသာ ၎င်းက
  ကန့်သတ်မည်ဖြစ်သည်။ မသတ်မှတ်ထားပါက ဝင်ခွင့်ကို
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ဖြင့် အစားထိုးထိန်းချုပ်သည် — ယင်းသည်
  process ၏ အမှန်တကယ် memory အမြင့်ဆုံးကန့်သတ်ချက်မှ အလိုအလျောက် တွက်ချက်ထားသော
  budget ဖြစ်သည် (`src/shared/middleware/admissionBudget.ts`)။ V8 heap limit နှင့်
  cgroup/container limit တို့အနက် ပိုမိုတင်းကျပ်သော limit ၏ 25% ကိုယူပြီး
  ယာယီချဲ့ထွင်မှု factor 8x ဖြင့်စားကာ 8 MiB နှင့် 2 GiB ကြားတွင်
  ကန့်သတ်ထားသည်။ အတိအလင်း override လုပ်ထားသော တန်ဖိုးများလည်း အလားတူ
  ကန့်သတ်ချက်များကို အသုံးပြုသည်။ ထို့ကြောင့် env ကို ချိန်ညှိစရာမလိုဘဲ
  512 MB container မှ 32 GB desktop အထိ ကိုယ်တိုင် အရွယ်အစားချိန်ညှိနိုင်သည်။
  ထိရောက်သော budget အတွင်း မဝင်ဆံ့နိုင်သည့် body သည်
  `413 body_exceeds_budget` ဖြင့် ချက်ချင်း မအောင်မြင်ပါ။ တစ်ခုချင်းစီအနေဖြင့်
  လက်ခံဆောင်ရွက်နိုင်သော body များအကြား အရင်းအမြစ်ယှဉ်ပြိုင်မှုသာလျှင်
  ကန့်သတ်ထားသော fairness queue ထဲသို့ ဝင်ရောက်သည်။ Signal မျိုးစုံကို
  အချိန်နှင့်တပြေးညီ စောင့်ကြည့်သည့် resource-pressure tracker (V8 heap ratio,
  cgroup, PSI, OOM event များ — `open-sse/utils/resourcePressurePolicy.ts`) သည်
  `high` pressure အောက်တွင် ကန့်သတ်ထားသော စောင့်ဆိုင်းချိန်ကို လျှော့ချပေးပြီး
  `critical` pressure အောက်တွင် byte တစ်ခုမျှ မထည့်သွင်းမီကပင်
  `503 resource_pressure` ဖြင့် ချက်ချင်း load လျှော့ချသည်။ PSI ကို ရရှိနိုင်ပါက
  ဤ unit ၏ cgroup `memory.pressure` မှ ဖတ်ယူသည်
  (`open-sse/utils/resourcePressureSampler.ts`)။ `/proc/pressure/memory` သည်
  host တစ်ခုလုံးဆိုင်ရာဖြစ်ပြီး bare metal / cgroup v1 တွင်သာ fallback အဖြစ်
  အသုံးပြုသောကြောင့် swap လုပ်နေသော host တစ်ခုက idle ဖြစ်နေသည့် container ကို
  503 ဖြစ်စေနိုင်မည်မဟုတ်ပါ။
- **ချိန်ညှိမှု:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — အလိုအလျောက် တွက်ချက်ထားသော byte budget အတွက် override
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ယခင် request အရေအတွက် ကန့်သတ်ချက်၊ opt-in ဖြင့်သာ အသုံးပြုနိုင်သည်
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 မဖြစ်မီ queue တွင် စောင့်ဆိုင်းချိန် (မူလတန်ဖိုး 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — queue ထဲရှိ byte များအတွက် heap valve (မူလတန်ဖိုး 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 မှစ၍ အသုံးမပြုတော့သော
    no-op များ (config compatibility အတွက် လက်ခံသော်လည်း လျစ်လျူရှုထားသည်)
- **အစီရင်ခံချက်များ:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — #503-fanout တွင်
  ထပ်ထည့်ထားသော `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` နှင့် `countCapEnabled`
  တို့အပါအဝင် ဖြစ်သည် (မူလ deployment တွင် false ဖြစ်သည် — ယခင် count cap
  မဟုတ်ဘဲ byte budget ကသာ အမှန်တကယ် ကန့်သတ်နေကြောင်း အတည်ပြုပေးသည်)။

## 2. လိုက်လျောညီထွေပြောင်းလဲနိုင်သော runtime virtual lane များ (`open-sse/services/admission`)

- **အကျုံးဝင်မှု:** provider dispatch အတွက် tenant-key admission — queue ကုန်ကျစရိတ်၊ latency လမ်းညွှန်ချက်ဖြင့်
  limit ကို လိုက်လျောညီထွေပြောင်းလဲခြင်း၊ lane queueing နှင့် lane metric များ။
- **Gate:** **opt-in ဖြစ်သည်။** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` မဟုတ်ပါက ပိတ်ထားသည်။ ၎င်းမပါလျှင်
  adaptive controller သည် shared queue အပြုအမူကို ဆက်လက်ထိန်းသိမ်းထားမည် (#9654 ၏ စံသတ်မှတ်ချက် 1 သည်
  operator က lane များကို ဖွင့်ပြီးမှသာ ပြည့်မီသည်)။
- **ချိန်ညှိခြင်း:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptive config (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)။
- **အစီရင်ခံမှုများ:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (အဓိပ္ပာယ်ဖော်မရသော lane ID များသာဖြစ်ပြီး raw
  key များ မပါဝင်ပါ) နှင့် `virtualLanes` — snapshot အတွင်းရှိ "lane များ ဖွင့်ထားသည်" ဟု အတည်ပြုပေးသော
  တရားဝင် flag။

## 3. Fan-out probe များ — combo/fusion အတွက် target တစ်ခုချင်း admission (#9654 Wave 2)

Combo (priority / round-robin) နှင့် fusion တို့သည် parent request တစ်ခုအောက်တွင် model target N ခုသို့
fan out လုပ်သည်။ #9654 Wave 2 မှစ၍ **fan-out target တစ်ခုချင်းစီကို dispatch မလုပ်မီ gate လုပ်ထားပြီး**၊
**parent ၏** tenant lane နှင့် ဆန့်ကျင်စစ်ဆေးသည့် target တစ်ခုချင်းစီအလိုက် probe
(`PerTargetAdmissionHook`, `createPerTargetAdmissionHook` ဖြင့် တည်ဆောက်ထားသည်) ကို အသုံးပြုသည်။

- **အကျုံးဝင်မှု:** combo၊ fusion နှင့် chaos engine တို့က dispatch လုပ်သော fan-out target အားလုံး။
  System 1 (byte-level) ကို သက်ရောက်မှုမရှိပါ — ၎င်းသည် fan-out target များကို မည်သည့်အခါမျှ probe မလုပ်ပါ။
- **Gate:** **system 2 နှင့်အတူ opt-in ဖြစ်သည်။** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  မသတ်မှတ်ထားပါက no-op ဖြစ်သည် — ထို mode တွင် parent request က shared-queue lease ကို ရယူထားပြီးဖြစ်သောကြောင့်
  probe လုပ်ပါက နှစ်ကြိမ်ရေတွက်မိပြီး combo target များကို ငြင်းပယ်မည်ဖြစ်သည်။
- **လုပ်ဆောင်ပုံဆိုင်ရာ အဓိပ္ပာယ်များ:**
  - **လုံးဝ မစောင့်ဆိုင်းရ — queue မလုပ်ဘဲ skip လုပ်ပါ။** `maxWaitMs 0`: lane ပြည့်နေပါက
    target ကို skip လုပ်ပြီး combo ၏ fallback လုပ်ငန်းစဉ် (သို့မဟုတ် fusion ၏ ကျန်ရှိသော
    panel) က အစားထိုးဆောင်ရွက်သည်။ ဤသည်မှာ ရည်ရွယ်ချက်ရှိရှိ လုပ်ထားခြင်းဖြစ်သည်—fan-out target သည်
    ထပ်နေသော အလုပ်ဖြစ်ပြီး ၎င်းကို queue လုပ်ခြင်းက lane များဖြင့် တားဆီးရန် ရည်ရွယ်ထားသည့် တိကျသော
    congestion ပေါ်သို့ load ပိုတင်စေသည်။ ထို့ကြောင့် `defaultMaxWaitMs` သည် **parent request အတွက်သာ**
    သက်ရောက်သည်။ fan-out probe များသည် မည်သည့်အခါမျှ မစောင့်ဘဲ ၎င်းတို့ကို စောင့်စေရန်
    **knob လုံးဝမရှိစေရန်** တမင်ရည်ရွယ်ထားသည် (issue history အရ wait knob များက #9654 ဖြင့်
    ကာကွယ်ထားသည့် mass-502/504 အမျိုးအစား ပြဿနာကို ဖြစ်စေခဲ့သည်—skip လုပ်ခံရသော fan-out target များကြောင့်
    response quality ထိခိုက်နေကြောင်း operator တစ်ဦးက အစီရင်ခံမှသာ ပြန်လည်သုံးသပ်ပါ)။
  - **လက်ခံပြီးသည်နှင့် release လုပ်ခြင်း။** လက်ခံထားသော probe သည် ၎င်း၏ lease ကို ချက်ချင်း release လုပ်သည်။
    ၎င်းသည် capacity gate ဖြစ်ပြီး hold မဟုတ်ပါ။ parent ၏ lease က fan-out ကို အကျုံးဝင်ပြီးဖြစ်သည်။ နောက်ထပ် N ခုကို
    hold လုပ်ထားပါက shared active cost ကို ဖောင်းပွစေပြီး အခြား tenant များကို ငြင်းပယ်မည်ဖြစ်သည်။ reservation မဟုတ်ဘဲ
    best-effort သာဖြစ်သည်။ probe နှင့် dispatch ကြားတွင် lane သည် ပြန်ပြည့်သွားနိုင်သောကြောင့် ပြင်းထန်သော
    contention အခြေအနေတွင် target ကို dispatch လုပ်သည့်အချိန်၌ ပြန်ပြည့်နေသော lane အတွင်းသို့ gate က
    လက်ခံလိုက်နိုင်သည်။
  - **အမှန်တကယ် fan-out body မှ ကုန်ကျစရိတ်သတ်မှတ်ခြင်း။** probe သည် target ၏ အမှန်တကယ် body မှ
    ကုန်ကျစရိတ်ကို ခန့်မှန်းသည်—parent path ကဲ့သို့ပင် ၎င်း၏ `stream` flag မှ ဆင်းသက်လာသော request class
    အပါအဝင်ဖြစ်သည်—ထို့ကြောင့် fusion panel member များ (`stream: false`) ကို ၎င်းတို့ အမှန်တကယ်အသုံးပြုမည့်
    non-streaming class အတိုင်း ကုန်ကျစရိတ်သတ်မှတ်ပြီး priority/RR target များကို အသုံးပြုသူ တောင်းဆိုထားသည့်
    အတိုင်း သတ်မှတ်သည်။
- **အစီရင်ခံမှုများ:** ပထမ target နောက်ပိုင်း probe skip ဖြစ်ပါက combo ၏ request တစ်ခုချင်းစီအလိုက်
  `fallbackCount` ကို တိုးစေသည် (လက်ရှိ fallback အဓိပ္ပာယ်များကို ထင်ဟပ်ထားပြီး combo log များတွင်
  မြင်နိုင်သည်)။ panel member အားလုံး skip လုပ်ခံရပါက fusion သည် 503 ကို ပြန်ပေးသည်။ လက်ရှိ snapshot တွင်
  **စုစုပေါင်း counter မရှိပါ** (ဥပမာ `virtualFanoutSkipped`) — lane gate က fan-out
  target များကို မည်မျှမကြာခဏ skip လုပ်ကြောင်း မသိနိုင်ဟု operator တစ်ဦးက အစီရင်ခံပါက counter တစ်ခု
  ထည့်သွင်းရန် လှုံ့ဆော်ချက်ဖြစ်သည်။

## Dashboard တစ်ခုတွင် မည်သည့်စနစ်ကို ပြသနေသနည်း

- `adaptiveAdmission.laneCount` / `laneTenants` → **အလိုက်သင့်ပြောင်းလဲနိုင်သော virtual lane များ** (စနစ် 2)။
- `adaptiveAdmission.virtualLanes === true` → အပိုင်း 3 ရှိ fan-out probe များလည်း
  အသက်ဝင်နေသည်။ `virtualLanes` မပါရှိသော သို့မဟုတ် `false` ဖြစ်သော payload သည်
  `OMNIROUTE_CHAT_VIRTUAL_LANES` ကို သတ်မှတ်မထားကြောင်း ဆိုလိုသည် — byte အဆင့် lane များ (စနစ် 1) သည်
  ဆက်လက်အသက်ဝင်နေသော်လည်း ၎င်းကို ဖွင့်မထားမချင်း `adaptiveAdmission` အောက်ရှိ မည်သည့်အရာမျှ
  (fan-out gating အပါအဝင်) သက်ရောက်မှုရှိမည်မဟုတ်ပါ။

## နှစ်မျိုးစလုံး တည်ရှိရသည့်အကြောင်းရင်း

Byte အဆင့် lane များသည် memory အသုံးများသော parse/compress လမ်းကြောင်းကို ကန့်သတ်ပြီး၊ adaptive lane များသည်
tenant တစ်ခုစီ၏ dispatch ကုန်ကျစရိတ်ကို ကန့်သတ်သည်။ #9654 ၏ စံသတ်မှတ်ချက် 1 ("session တစ်ခု၏ ရုတ်တရက်မြင့်တက်လာသော request များကြောင့်
အခြား session တစ်ခုတွင် 503 မဖြစ်စေရ") ကို စနစ် 1 က အမြဲတမ်း မဖြစ်မနေ ထိန်းသိမ်းပေးပြီး၊ opt-in ကို ဖွင့်ပြီးသည်နှင့် စနစ် 2 ကလည်း ထိန်းသိမ်းပေးသည်။

## 4. Process တစ်ခုတည်းဖြင့် ကြာရှည်လုပ်ဆောင်သော `/v1/responses` (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) တွင်
`tryAcquireHealthyHeadroom` ကို ထည့်သွင်းထားသောကြောင့် heap သည်
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ထက် နိမ့်နေချိန်တွင် ဖွဲ့စည်းပုံအရ resource အသုံးများသော ဒုတိယ request ကို လက်ခံနိုင်သည်။ `admitChatRequest` က အသုံးပြုသော BYTE
လမ်းကြောင်း (body အရွယ်အစား ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
မူလသတ်မှတ်ချက် 256 KiB၊ `POST /v1/responses` အပါအဝင်) သည် **တူညီသော** လွတ်မြောက်ရေးနည်းလမ်းကို အသုံးပြုသည်။

၎င်းသည် တစ်ပြိုင်နက်တည်း လုပ်ဆောင်နေသော ကြာရှည် SSE `/v1/responses` နှစ်ခုထက်ပို၍ ကိုင်တွယ်ရန် ပံ့ပိုးထားသည့် **process တစ်ခုတည်းသုံး** နည်းလမ်းဖြစ်သည်။ Heap
နှင့် process တစ်ခုလုံးအတွက် inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) က ခွင့်ပြုသည့်အတိုင်းအတာအတွင်းသာ primary + healthy-headroom ကို တိုးမြှင့်ပါ။ ကြာရှည် SSE client ဆယ်နှင့်ချီ (40–50) ကို ကိုင်တွယ်နိုင်မှုသည် memory budget
နှင့်ဆိုင်သော မေးခွန်းဖြစ်ပြီး ထုတ်ကုန်၏ “အများဆုံး 2 ခု” ဟူသော ပုံသေကန့်သတ်ချက် မဟုတ်ပါ။ ဖိအားများနေသော heap သည်
ပြန်လည်ကြိုးစားနိုင်သည့် `503` ဖြင့် request များကို ဆက်လက်ဖယ်ရှားပေးသောကြောင့် #7849 ပြန်ဖြစ်လာမည်မဟုတ်ပါ။

Heap အရေအတွက်ကို **မြှောက်ရန်** သီးခြား `DATA_DIR` N ခုဖြင့် လုပ်ဆောင်ပါ (#11024)။ SQLite file တစ်ခုတည်းတွင်
`replicas > 1` ကို မည်သည့်အခါမျှ မသုံးပါနှင့် (#10350)။ ဤအပိုင်းသည်
DATA_DIR scale-out နည်းလမ်းကို ပြန်လည်ဆွေးနွေးခြင်း မဟုတ်ပါ။
