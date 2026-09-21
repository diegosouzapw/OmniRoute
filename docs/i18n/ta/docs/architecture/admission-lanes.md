# Admission lanes (#9654) — two lane systems, what gates each, where each reports (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute வெவ்வேறு வரம்புகளைக் கொண்ட, செயல்முறை-உள்ளகமான **இரண்டு** lane அமைப்புகளைக் கொண்டுள்ளது. அவை ஒன்றுக்கொன்று துணைபுரிபவை; இயக்குநர்கள் தாங்கள் எதைப் பார்க்கிறார்கள் என்பதை அறிந்திருக்க வேண்டும்.

## 1. பைட்-நிலை, செயல்முறை முழுவதற்குமான அனுமதி (`chatBodyAdmission.ts`)

- **வரம்பு:** `POST /v1/chat/completions`, `/v1/messages`, `/v1/responses` மற்றும் அரட்டை வடிவிலான பிற வழித்தடங்களுக்கான buffered-body/heap பாதை. பெரிய coding-agent body-களால் ஏற்படும் heap பெருக்கத்திலிருந்து பாதுகாக்கிறது (#4380).
- **ஒவ்வொரு key-க்கும் தனித்தனி lane-கள் அல்ல; செயல்முறை முழுவதற்கும் ஒரே controller (#10110).** ஒவ்வொரு API key-யும் (hash செய்யப்பட்டவை) அல்லது `anonymous` session-உம் **ஒரே** பகிரப்பட்ட budget-க்கு எதிராக அனுமதிக்கப்படுகின்றன — hash செய்யப்பட்ட session id, நியாயமான திட்டமிடலுக்கான key-ஆக மட்டுமே பயன்படுத்தப்படுகிறது (காத்திருப்பவர்களிடையே round-robin dispatch); capacity shard-ஆக ஒருபோதும் பயன்படுத்தப்படுவதில்லை. இந்த ஆவணத்தின் முந்தைய பதிப்பு, சுயாதீனமான capacity கொண்ட ஒவ்வொரு key-க்குமான lane-களை விவரித்தது; அங்கீகரிக்கப்படாத போலி credentials செயல்முறை-முழுவதுமான வரம்பைப் பெருக்க அனுமதித்ததால், அந்த மாதிரி #10110-இல் அகற்றப்பட்டது.
- **Gate (#503-fanout): நிலையான request எண்ணிக்கை அல்ல; தானாகப் பெறப்படும் ingest BYTE budget.** மரபுவழி `CHAT_MAX_HEAVY_IN_FLIGHT` request-எண்ணிக்கை உச்சவரம்பு (இந்தச் சரிசெய்தலுக்கு முன்பு இயல்புநிலை `1`) coding-agent fan-out-ஐ (பல subagent-கள்/CLI-கள், வழக்கமாக > 256 KB அளவுள்ள body-கள்) நடைமுறையில் ~1 என்ற concurrency-க்குச் சுருக்கியது; இதனால் முற்றிலும் இயல்பான சுமையிலும் 503 ஏற்பட்டது. இப்போது இயக்குநர் ஒருவர் `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`-ஐ வெளிப்படையாக அமைத்தால் மட்டுமே அது கட்டுப்படுத்தும். அதை அமைக்காமல் விட்டால், அனுமதி `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` மூலம் கட்டுப்படுத்தப்படும் — இது செயல்முறையின் உண்மையான memory ceiling-இலிருந்து தானாகப் பெறப்படும் budget (`src/shared/middleware/admissionBudget.ts`): V8 heap limit மற்றும் ஏதேனும் cgroup/container limit ஆகியவற்றில் இறுக்கமான வரம்பின் 25%, 8x transient-amplification factor-ஆல் வகுக்கப்பட்டு, 8 MiB முதல் 2 GiB வரை கட்டுப்படுத்தப்படும். வெளிப்படையான override-களும் இதே வரம்புக் கட்டுப்பாடுகளைப் பயன்படுத்துகின்றன. எந்த env tuning-உம் இல்லாமல், இது 512 MB container முதல் 32 GB desktop வரை தானாக அளவிடப்படுகிறது. நடைமுறையிலுள்ள budget-க்குள் பொருந்த முடியாத body உடனடியாக `413 body_exceeds_budget` உடன் தோல்வியடையும்; தனித்தனியாகச் சேவை செய்யக்கூடிய body-களுக்கிடையேயான போட்டி மட்டுமே வரம்பிடப்பட்ட நியாயமான queue-க்குள் நுழையும். நேரடியாக இயங்கும் பல-signal resource-pressure tracker (V8 heap ratio, cgroup, PSI, OOM events — `open-sse/utils/resourcePressurePolicy.ts`) `high` அழுத்தத்தின் கீழ் வரம்பிடப்பட்ட காத்திருப்பு நேரத்தைக் குறைத்து, எந்த byte-களும் ingest செய்யப்படுவதற்கு முன்பே `critical` அழுத்தத்தின் கீழ் `503 resource_pressure` உடன் உடனடியாகச் சுமையைக் கைவிடுகிறது.
- **அமைவுச் சீரமைப்பு:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — தானாகப் பெறப்படும் byte budget-க்கான override
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — மரபுவழி request-எண்ணிக்கை உச்சவரம்பு; தேர்வுசெய்தால் மட்டுமே செயல்படும்
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503-க்கு முன்பான queue காத்திருப்பு (இயல்புநிலை 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — queue செய்யப்பட்ட byte-களுக்கான heap valve (இயல்புநிலை 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 முதல் வழக்கொழிந்த
    no-op-கள் (config இணக்கத்தன்மைக்காக ஏற்கப்படுகின்றன, ஆனால் புறக்கணிக்கப்படுகின்றன)
- **அறிக்கைகள்:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — #503-fanout சேர்க்கைகளான `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` மற்றும் `countCapEnabled`
  ஆகியவை உட்பட (இயல்புநிலை deployment-இல் false — மரபுவழி count cap அல்ல, byte budget-தான் உண்மையில் கட்டுப்படுத்துகிறது என்பதை உறுதிப்படுத்துகிறது).

## 2. தகவமைப்பு இயக்கநேர மெய்நிகர் தடங்கள் (`open-sse/services/admission`)

- **வரம்பு:** வழங்குநர் அனுப்புதலுக்கான tenant-key அனுமதி — வரிசைச் செலவு, தாமதத்தால் வழிநடத்தப்படும்
  வரம்புத் தகவமைப்பு, தட வரிசைப்படுத்தல் மற்றும் தட அளவீடுகள்.
- **கட்டுப்பாடு:** **தேர்வுசார்ந்தது.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` ஆக இல்லாவிட்டால் முடக்கப்பட்டிருக்கும். அது இல்லாமல்,
  தகவமைப்புக் கட்டுப்படுத்தி பகிரப்பட்ட வரிசைச் செயல்பாட்டைத் தொடரும் (#9654-இன் விதிமுறை 1,
  ஓர் இயக்குநர் தடங்களை இயக்கிய பிறகே பொருந்தும்).
- **நுண்சீரமைப்பு:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + தகவமைப்பு உள்ளமைவு (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **அறிக்கைகள்:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ஒளிபுகா தட ID-கள், ஒருபோதும் மூல
  விசைகள் அல்ல), மற்றும் `virtualLanes` — snapshot-இல் "தடங்கள் இயக்கத்தில் உள்ளன" என்பதற்கான அதிகாரபூர்வக் கொடி.

## 3. விசிறல்-வெளியீட்டுச் சோதனைகள் — combo/fusion-க்கான இலக்கு-வாரியான அனுமதி (#9654 Wave 2)

Combo (முன்னுரிமை / round-robin) மற்றும் fusion ஆகியவை ஒரே பெற்றோர் கோரிக்கையின் கீழ் N மாதிரி
இலக்குகளுக்கு விசிறல்-வெளியீடு செய்கின்றன. #9654 Wave 2 முதல், **ஒவ்வொரு விசிறல்-வெளியீட்டு இலக்கும் அனுப்புவதற்கு முன் கட்டுப்படுத்தப்படுகிறது**;
இதற்காக **பெற்றோரின்** tenant தடத்திற்கு எதிராக இலக்கு-வாரியான சோதனை (`PerTargetAdmissionHook`,
`createPerTargetAdmissionHook` மூலம் உருவாக்கப்பட்டது) பயன்படுத்தப்படுகிறது.

- **வரம்பு:** combo, fusion மற்றும் chaos engine ஆகியவற்றால் அனுப்பப்படும் ஒவ்வொரு விசிறல்-வெளியீட்டு இலக்கும்.
  System 1 (byte-level) பாதிக்கப்படாது — அது விசிறல்-வெளியீட்டு இலக்குகளை ஒருபோதும் சோதிப்பதில்லை.
- **கட்டுப்பாடு:** **system 2 உடன் தேர்வுசார்ந்தது.** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  அமைக்கப்படாதபோது இது செயல்பாடற்றதாக இருக்கும் — அந்தப் பயன்முறையில் பெற்றோர் கோரிக்கை ஏற்கனவே பகிரப்பட்ட-வரிசை lease-ஐ
  வைத்திருப்பதால், சோதனை செய்வது இருமுறை கணக்கிட்டு combo இலக்குகளை நிராகரிக்கும்.
- **செயற்பொருள்:**
  - **முற்றிலும் தடுப்பில்லாதது — வரிசைப்படுத்தாமல் தவிர்த்துவிடும்.** `maxWaitMs 0`: ஒரு தடம்
    நிரம்பியிருந்தால் இலக்கு தவிர்க்கப்பட்டு, அதற்குப் பதிலாக combo-வின் fallback இயங்கமைப்பு (அல்லது fusion-இன் எஞ்சியுள்ள
    panel) சேவையளிக்கும். இது திட்டமிட்ட செயல்பாடு: ஒரு விசிறல்-வெளியீட்டு இலக்கு தேவைக்கு அதிகமான
    பணியாகும்; அதை வரிசைப்படுத்துவது, தடங்கள் தடுக்க வேண்டிய அதே நெரிசலின் மீது மேலும் சுமையைக்
    குவிக்கும். எனவே `defaultMaxWaitMs` என்பது **பெற்றோர் கோரிக்கைக்கு மட்டும்** பொருந்தும்;
    விசிறல்-வெளியீட்டுச் சோதனைகள் ஒருபோதும் காத்திருக்காது, மேலும் அவற்றைக் காத்திருக்கச் செய்வதற்காக திட்டமிட்டே
    **எந்த knob-உம் இல்லை** (காத்திருப்புக் knob-கள் பெருமளவிலான-502/504 வகையை உருவாக்கியதாக
    issue வரலாறு காட்டுகிறது; அதைத்தான் #9654 தடுக்கிறது — தவிர்க்கப்பட்ட விசிறல்-வெளியீட்டு இலக்குகள்
    பதிலின் தரத்தைப் பாதிப்பதாக ஓர் இயக்குநர் தெரிவித்தால் மட்டுமே மறுபரிசீலனை செய்யவும்).
  - **அனுமதித்ததும் விடுவித்தல்.** அனுமதிக்கப்பட்ட சோதனை தனது lease-ஐ உடனடியாக விடுவிக்கும்: இது
    ஒரு கொள்ளளவுக் கட்டுப்பாடு, வைத்திருப்பு அல்ல. பெற்றோரின் lease விசிறல்-வெளியீட்டை உள்ளடக்கும்; மேலும் N
    lease-களை வைத்திருப்பது பகிரப்பட்ட செயலில் உள்ள செலவை அதிகரித்து மற்ற tenant-களை நிராகரிக்கும். இது உறுதிப்படுத்தப்பட்ட
    முன்பதிவு அல்ல, இயன்றவரைச் செய்யப்படும் முயற்சி மட்டுமே: சோதனைக்கும் அனுப்புதலுக்கும் இடையில் தடம் மீண்டும் நிரம்பலாம்; எனவே
    கடுமையான போட்டிச் சூழலில், இலக்கு அனுப்பப்படும் நேரத்திற்குள் மீண்டும் நிரம்பிவிட்ட ஒரு தடத்திற்குள்
    கட்டுப்பாடு அனுமதிக்கக்கூடும்.
  - **உண்மையான விசிறல்-வெளியீட்டு body-இலிருந்து விலை நிர்ணயிக்கப்படுகிறது.** இலக்கின்
    உண்மையான body-இலிருந்து சோதனை செலவை மதிப்பிடுகிறது — அதன் `stream` கொடியிலிருந்து பெறப்படும் கோரிக்கை வகையையும்
    உள்ளடக்கி, பெற்றோர் பாதையைப் போலவே துல்லியமாகச் செய்கிறது — எனவே fusion panel உறுப்பினர்கள் (`stream: false`)
    அவர்கள் உண்மையில் பயன்படுத்தவுள்ள non-streaming வகையின்படி விலை நிர்ணயிக்கப்படுகின்றனர்; மேலும் priority/RR
    இலக்குகள் பயனர் கோரிய வகையின்படி விலை நிர்ணயிக்கப்படுகின்றன.
- **அறிக்கைகள்:** முதல் இலக்கிற்குப் பிறகு ஒரு சோதனை தவிர்க்கப்படும்போது, combo-வின் கோரிக்கை-வாரியான
  `fallbackCount` அதிகரிக்கப்படும் (ஏற்கனவே உள்ள fallback செயற்பொருளைப் பிரதிபலிக்கிறது; combo
  பதிவுகளில் காணலாம்); ஒவ்வொரு panel உறுப்பினரும் தவிர்க்கப்பட்டால் fusion 503-ஐ வழங்கும். தற்போது
  snapshot-இல் **திரட்டப்பட்ட counter எதுவும் இல்லை** (எ.கா. `virtualFanoutSkipped`) —
  தடக் கட்டுப்பாடு விசிறல்-வெளியீட்டு இலக்குகளை எவ்வளவு அடிக்கடி தவிர்க்கிறது என்பதைத் தங்களால் அறிய முடியவில்லை என்று
  ஓர் இயக்குநர் தெரிவித்தால், அத்தகைய counter-ஐச் சேர்ப்பதற்கான தூண்டுதல் அதுவாகும்.

## டாஷ்போர்டில் எது காட்டப்படுகிறது

- `adaptiveAdmission.laneCount` / `laneTenants` → **தகவமைப்பு மெய்நிகர் வழித்தடங்கள்** (அமைப்பு 2).
- `adaptiveAdmission.virtualLanes === true` → பிரிவு 3-இன் fan-out சோதனைகளும்
  செயலில் உள்ளன. `virtualLanes` இல்லாத அல்லது `false` ஆக உள்ள payload என்பது
  `OMNIROUTE_CHAT_VIRTUAL_LANES` அமைக்கப்படவில்லை என்பதைக் குறிக்கிறது — byte-நிலை வழித்தடங்கள் (அமைப்பு 1)
  இன்னமும் செயலில் உள்ளன, ஆனால் அதை இயக்கும் வரை `adaptiveAdmission`-இன் கீழ் எதுவும்
  (மேலும் fan-out gating எதுவும்) செயல்பாட்டில் இருக்காது.

## இரண்டும் ஏன் உள்ளன

byte-நிலை வழித்தடங்கள் அதிக நினைவகத்தைப் பயன்படுத்தும் parse/compress பாதையைக் கட்டுப்படுத்துகின்றன; தகவமைப்பு வழித்தடங்கள்
ஒவ்வொரு tenant-க்குமான dispatch செலவைக் கட்டுப்படுத்துகின்றன. #9654-இன் நிபந்தனை 1 ("ஒரு session-இன் திடீர் சுமை மற்றொன்றை 503
செய்யாது") அமைப்பு 1-ஆல் நிபந்தனையின்றியும், opt-in இயக்கப்பட்டதும் அமைப்பு 2-ஆலும் உறுதிசெய்யப்படுகிறது.

## 4. ஒற்றை-process நீண்ட `/v1/responses` (ஆரோக்கியமான-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ஆனது
`tryAcquireHealthyHeadroom`-ஐச் சேர்த்தது; இதனால் heap,
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-ஐ விடக் குறைவாக இருக்கும்போது, கட்டமைப்பு ரீதியாக அதிகச் சுமையுள்ள இரண்டாவது கோரிக்கை அனுமதிக்கப்படுகிறது.
`admitChatRequest` பயன்படுத்தும் BYTE பாதை (`OMNIROUTE_CHAT_LARGE_BODY_BYTES`-க்கு
சமமான அல்லது அதைவிடப் பெரிய bodies, இயல்புநிலை 256 KiB, `POST /v1/responses` உட்பட) **அதே** தப்பிப்புப் பாதையைப் பயன்படுத்துகிறது.

இரண்டுக்கும் மேற்பட்ட ஒரேநேர நீண்ட SSE `/v1/responses`-க்கான ஆதரிக்கப்படும் **ஒற்றை-process**
செய்முறை இதுதான்: heap மற்றும் process முழுவதற்குமான inflight-byte வரவுசெலவுத் திட்டம்
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) அனுமதிக்கும் அளவுக்கு மட்டுமே primary + healthy-headroom-ஐ
உயர்த்தவும். பத்துக்கணக்கான நீண்ட SSE clients (40–50) என்பது அந்த நினைவக வரவுசெலவுத் திட்டம்
சார்ந்த கேள்வியே தவிர, கடினமான “அதிகபட்சம் 2” என்ற தயாரிப்பு வரம்பு அல்ல. அழுத்தத்திலுள்ள heap இன்னமும்
மீண்டும் முயற்சிக்கக்கூடிய `503` மூலம் சுமையைக் குறைக்கிறது; எனவே #7849 மீண்டும் ஏற்படாது.

**heap-களைப் பெருக்க**, N சுயாதீனமான `DATA_DIR`-களை இயக்கவும் (#11024). ஒரே SQLite கோப்பில்
`replicas > 1`-ஐ ஒருபோதும் பயன்படுத்த வேண்டாம் (#10350). இந்தப் பிரிவு
DATA_DIR scale-out செய்முறையை மீண்டும் திறப்பதல்ல.
