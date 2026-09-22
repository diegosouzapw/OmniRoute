# Admission lanes (#9654) — two lane systems, what gates each, where each reports (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute میں مختلف دائروں والے **دو** عمل-مقامی لین نظام ہیں۔ یہ ایک دوسرے کی
تکمیل کرتے ہیں؛ آپریٹرز کو معلوم ہونا چاہیے کہ وہ کس نظام کو دیکھ رہے ہیں۔

## 1. بائٹ کی سطح پر پورے پراسیس کا داخلہ (`chatBodyAdmission.ts`)

- **دائرۂ کار:** `POST /v1/chat/completions`، `/v1/messages`،
  `/v1/responses`، اور دیگر چیٹ طرز کے روٹس کے لیے buffered-body/heap راستہ۔ بڑے
  coding-agent باڈیز سے ہونے والی heap amplification کے خلاف تحفظ دیتا ہے (#4380)۔
- **پورے پراسیس کے لیے ایک عالمی کنٹرولر، نہ کہ ہر کلید کے لیے الگ lanes (#10110)۔** ہر API کلید
  (hashed) یا `anonymous` سیشن **اسی** مشترکہ بجٹ کے مقابل داخل ہوتا ہے —
  hashed session id صرف fairness scheduling key کے طور پر استعمال ہوتی ہے (منتظر درخواستوں
  میں round-robin dispatch)، کبھی بھی capacity shard کے طور پر نہیں۔ اس
  دستاویز کے ایک سابقہ ورژن میں آزاد گنجائش والی per-key lanes بیان کی گئی تھیں؛
  وہ ماڈل #10110 میں ہٹا دیا گیا، کیونکہ اس سے غیر توثیق شدہ جعلی credentials
  پورے پراسیس کی حد کو کئی گنا بڑھا سکتے تھے۔
- **گیٹ (#503-fanout): خودکار طور پر اخذ کردہ ingest BYTE بجٹ، نہ کہ درخواستوں
  کی مقررہ تعداد۔** پرانی `CHAT_MAX_HEAVY_IN_FLIGHT` درخواست-تعداد حد (اس
  اصلاح سے پہلے طے شدہ قدر `1`) نے coding-agent fan-out (متعدد subagents/CLIs،
  باڈیز معمول کے مطابق > 256 KB) کو تقریباً 1 کی مؤثر concurrency تک محدود کر دیا تھا، جس کے باعث
  مکمل طور پر معمول کے لوڈ میں 503 آتا تھا۔ اب یہ صرف اس وقت لاگو ہوتی ہے جب آپریٹر واضح طور پر
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` سیٹ کرے۔ اسے غیر سیٹ چھوڑنے پر، داخلہ اس کے بجائے
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` کے ذریعے محدود ہوتا ہے — ایک ایسا بجٹ جو
  پراسیس کی حقیقی میموری حد (`src/shared/middleware/admissionBudget.ts`) سے خودکار طور پر اخذ ہوتا ہے:
  V8 heap limit اور کسی بھی cgroup/container limit میں سے زیادہ سخت حد کا 25%،
  جسے 8x عارضی amplification factor سے تقسیم کیا جاتا ہے، اور 8 MiB سے
  2 GiB کے درمیان محدود رکھا جاتا ہے۔ واضح overrides پر بھی یہی حدود لاگو ہوتی ہیں۔ یہ کسی
  env tuning کے بغیر خود کو 512 MB container سے 32 GB desktop تک موزوں بنا لیتا ہے۔ ایسی body جو
  مؤثر بجٹ میں سما نہ سکے، فوراً `413 body_exceeds_budget` کے ساتھ ناکام ہو جاتی ہے؛
  صرف ان باڈیز کے درمیان تنازع جو انفرادی طور پر قابلِ خدمت ہوں، محدود
  fairness queue میں داخل ہوتا ہے۔ ایک براہِ راست multi-signal resource-pressure tracker (V8 heap ratio،
  cgroup، PSI، OOM events — `open-sse/utils/resourcePressurePolicy.ts`) `high`
  دباؤ میں محدود انتظار کو مختصر کرتا ہے اور `critical` دباؤ میں
  `503 resource_pressure` کے ساتھ فوراً لوڈ مسترد کر دیتا ہے، حتیٰ کہ کسی بائٹ کے ingest
  ہونے سے بھی پہلے۔ دستیاب ہونے پر PSI اسی unit کے cgroup `memory.pressure` سے پڑھا جاتا ہے
  (`open-sse/utils/resourcePressureSampler.ts`)؛ `/proc/pressure/memory`
  پورے host کے لیے ہے اور صرف bare metal / cgroup v1 پر fallback کے طور پر استعمال ہوتا ہے، تاکہ swapping
  host کسی idle container کو 503 نہ کر سکے۔
- **ٹیوننگ:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — خودکار طور پر اخذ کردہ بائٹ بجٹ کے لیے override
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — پرانی درخواست-تعداد حد، صرف opt-in
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 سے پہلے queue میں انتظار (طے شدہ 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — queued-bytes heap valve (طے شدہ 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 سے متروک
    no-ops (config compatibility کے لیے قبول کیے جاتے ہیں، مگر نظر انداز ہوتے ہیں)
- **رپورٹس:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — جس میں
  #503-fanout کے اضافے `inflightBytes`، `maxInflightBytes`، `budgetSource`
  (`v8_heap` | `cgroup` | `override`)، `pressureSeverity`، اور `countCapEnabled`
  شامل ہیں (طے شدہ deployment پر false — یہ تصدیق کرتا ہے کہ حقیقتاً بائٹ بجٹ لاگو ہے،
  نہ کہ پرانی count cap)۔

## 2. موافق پذیر رن ٹائم ورچوئل لینز (`open-sse/services/admission`)

- **دائرۂ کار:** پرووائیڈر ڈسپیچ کے لیے tenant-key داخلہ — قطار کی لاگت، تاخیر سے رہنمائی یافتہ
  حد کی موافقت، لین کی قطاربندی، اور لین میٹرکس۔
- **گیٹ:** **opt-in۔** جب تک `OMNIROUTE_CHAT_VIRTUAL_LANES=true` نہ ہو، غیر فعال رہتا ہے۔ اس کے بغیر،
  موافق پذیر کنٹرولر مشترکہ قطار کا طرزِ عمل برقرار رکھتا ہے (#9654 کا معیار 1 صرف
  اس وقت پورا ہوتا ہے جب کوئی آپریٹر لینز فعال کرے)۔
- **ٹیوننگ:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + موافق پذیر کنفیگ (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`، …)۔
- **رپورٹس:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (مبہم لین IDs، کبھی بھی خام
  keys نہیں)، اور `virtualLanes` — اسنیپ شاٹ میں "لینز فعال ہیں" کا حتمی مستند فلیگ۔

## 3. فین آؤٹ پروبز — combo/fusion کے لیے فی ہدف داخلہ (#9654 ویو 2)

Combo (ترجیح / راؤنڈ رابن) اور fusion ایک بنیادی درخواست کے تحت N ماڈل اہداف تک
فین آؤٹ کرتے ہیں۔ #9654 ویو 2 کے بعد سے، **ہر فین آؤٹ ہدف کو ڈسپیچ سے پہلے گیٹ کیا جاتا ہے**
ایک فی ہدف پروب (`PerTargetAdmissionHook`، جسے `createPerTargetAdmissionHook` بناتا ہے)
کے ذریعے، **بنیادی درخواست کی** tenant لین کے مقابل۔

- **دائرۂ کار:** combo، fusion، اور chaos انجن کے ذریعے ڈسپیچ کیا جانے والا ہر فین آؤٹ ہدف۔
  سسٹم 1 (بائٹ کی سطح پر) متاثر نہیں ہوتا — یہ کبھی بھی فین آؤٹ اہداف کو پروب نہیں کرتا۔
- **گیٹ:** **سسٹم 2 کے ساتھ opt-in۔** جب `OMNIROUTE_CHAT_VIRTUAL_LANES`
  سیٹ نہ ہو تو یہ no-op ہے — اس موڈ میں بنیادی درخواست پہلے ہی مشترکہ قطار کی lease رکھتی ہے،
  اس لیے پروبنگ دوہری گنتی کرے گی اور combo اہداف کو مسترد کر دے گی۔
- **معنی و طرزِ عمل:**
  - **سختی سے non-blocking — چھوڑ دیں، کبھی قطار میں نہ لگائیں۔** `maxWaitMs 0`: بھری ہوئی لین
    ہدف کو چھوڑ دیتی ہے اور اس کے بجائے combo کا fallback نظام (یا fusion کا survivor
    پینل) کام کرتا ہے۔ یہ دانستہ ہے: فین آؤٹ ہدف اضافی کام ہے،
    اور اسے قطار میں لگانے سے عین اسی ازدحام پر مزید بوجھ پڑتا ہے جسے روکنے کے لیے لینز
    موجود ہیں۔ چنانچہ `defaultMaxWaitMs` صرف **بنیادی درخواست** پر لاگو ہوتا ہے؛
    فین آؤٹ پروبز کبھی انتظار نہیں کرتے، اور دانستہ طور پر انہیں انتظار کروانے کے لیے
    **کوئی knob موجود نہیں** (issue کی تاریخ سے ظاہر ہوتا ہے کہ wait knobs نے بڑے پیمانے پر 502/504 والی
    صورتحال پیدا کی، جسے #9654 روکتا ہے — صرف اسی صورت میں دوبارہ غور کریں جب کوئی آپریٹر اطلاع دے
    کہ چھوڑے گئے فین آؤٹ اہداف response کے معیار کو نقصان پہنچا رہے ہیں)۔
  - **داخلے پر ریلیز۔** داخل شدہ پروب اپنی lease فوراً ریلیز کر دیتا ہے: یہ
    capacity gate ہے، hold نہیں۔ بنیادی درخواست کی lease فین آؤٹ کا احاطہ کرتی ہے؛ مزید N
    کو hold کرنے سے مشترکہ فعال لاگت مصنوعی طور پر بڑھ جائے گی اور دیگر tenants مسترد ہوں گے۔ یہ best-effort ہے،
    reservation نہیں: پروب اور ڈسپیچ کے درمیان لین دوبارہ بھر سکتی ہے، اس لیے
    شدید مسابقت میں گیٹ کسی ہدف کو ایسی لین میں داخل کر سکتا ہے جو ہدف کے
    ڈسپیچ ہونے تک دوبارہ بھر چکی ہو۔
  - **حقیقی فین آؤٹ body سے قیمت بندی۔** پروب ہدف کی اصل body سے لاگت کا
    تخمینہ لگاتا ہے — جس میں اس کے `stream` فلیگ سے اخذ کردہ request class بھی شامل ہے،
    بالکل بنیادی راستے کی طرح — تاکہ fusion پینل کے اراکین (`stream: false`)
    کی قیمت بندی اسی non-streaming class کے مطابق ہو جسے وہ حقیقتاً استعمال کریں گے، اور priority/RR
    اہداف کی قیمت بندی صارف کی درخواست کے مطابق ہو۔
- **رپورٹس:** پہلے ہدف کے بعد کسی پروب کے چھوڑے جانے پر combo کا فی درخواست
  `fallbackCount` بڑھ جاتا ہے (موجودہ fallback طرزِ عمل کی عکاسی کرتے ہوئے؛ combo
  logs میں قابلِ مشاہدہ)؛ جب پینل کے تمام اراکین چھوڑ دیے جائیں تو fusion 503 واپس کرتا ہے۔ فی الحال
  اسنیپ شاٹ میں **کوئی مجموعی counter** (مثلاً `virtualFanoutSkipped`) موجود نہیں —
  اگر کوئی آپریٹر اطلاع دے کہ وہ یہ معلوم نہیں کر سکتا کہ لین گیٹ کتنی مرتبہ فین آؤٹ
  اہداف کو چھوڑتا ہے، تو یہی ایسا counter شامل کرنے کا محرک ہوگا۔

## ڈیش بورڈ میں کون سا دکھائی دے رہا ہے

- `adaptiveAdmission.laneCount` / `laneTenants` → **اڈاپٹیو ورچوئل لینز** (سسٹم 2)۔
- `adaptiveAdmission.virtualLanes === true` → سیکشن 3 کے fan-out probes بھی
  فعال ہیں۔ ایسا payload جس میں `virtualLanes` موجود نہ ہو یا `false` ہو، اس کا مطلب ہے کہ
  `OMNIROUTE_CHAT_VIRTUAL_LANES` سیٹ نہیں ہے — بائٹ لیول لینز (سسٹم 1) اب بھی
  فعال ہیں، لیکن جب تک اسے فعال نہ کیا جائے، `adaptiveAdmission` کے تحت کچھ بھی
  (اور کوئی fan-out gating بھی) مؤثر نہیں ہے۔

## دونوں کیوں موجود ہیں

بائٹ لیول لینز زیادہ میموری استعمال کرنے والے parse/compress پاتھ کو محدود کرتی ہیں؛ اڈاپٹیو لینز
ہر tenant کی dispatch لاگت کو محدود کرتی ہیں۔ #9654 کا معیار 1 ("ایک session کا burst دوسرے کو 503
نہیں کرتا") سسٹم 1 کے ذریعے غیر مشروط طور پر، اور opt-in فعال ہونے کے بعد سسٹم 2 کے ذریعے نافذ کیا جاتا ہے۔

## 4. ایک پراسیس میں طویل `/v1/responses` (صحت مند گنجائش)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) نے
`tryAcquireHealthyHeadroom` شامل کیا تاکہ heap کے
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` سے کم ہونے پر دوسری ساختی طور پر بھاری درخواست کو داخلے کی اجازت دی جا سکے۔ `admitChatRequest` کے زیرِ استعمال BYTE
پاتھ (ایسی bodies جو ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` ہوں،
ڈیفالٹ 256 KiB، بشمول `POST /v1/responses`) **اسی** استثنا کو استعمال کرتا ہے۔

یہ دو سے زیادہ متوازی طویل SSE `/v1/responses` کے لیے معاونت یافتہ **ایک پراسیس** والا
طریقہ ہے: بنیادی + صحت مند گنجائش کو صرف اتنا بڑھائیں جتنی heap
اور پراسیس بھر کے زیرِ عمل بائٹس کا بجٹ (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) اجازت دے۔ دسیوں طویل SSE کلائنٹس (40–50) کا معاملہ اسی میموری بجٹ
سے متعلق ہے، نہ کہ پروڈکٹ کی کسی سخت “زیادہ سے زیادہ 2” حد سے۔ دباؤ کا شکار heap اب بھی
قابلِ تکرار `503` کے ساتھ لوڈ کم کرتی ہے تاکہ #7849 دوبارہ نہ آئے۔

**heaps کو ضرب دینے** کے لیے، N آزاد `DATA_DIR`s چلائیں (#11024)۔ ایک SQLite فائل پر کبھی بھی
`replicas > 1` نہ چلائیں (#10350)۔ یہ سیکشن
DATA_DIR scale-out طریقے کو دوبارہ زیرِ بحث نہیں لاتا۔
