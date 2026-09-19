# Admission lanes (#9654) — two lane systems, what gates each, where each reports (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRouteରେ ଭିନ୍ନ ପରିସର ସହିତ **ଦୁଇଟି** ପ୍ରକ୍ରିୟା-ସ୍ଥାନୀୟ ଲେନ୍ ସିଷ୍ଟମ୍ ଅଛି। ସେଗୁଡ଼ିକ
ପରସ୍ପରର ପରିପୂରକ; ଅପରେଟରମାନେ କେଉଁଟିକୁ ଦେଖୁଛନ୍ତି ତାହା ଜାଣିବା ଉଚିତ।

## 1. ବାଇଟ୍-ସ୍ତରୀୟ ପ୍ରକ୍ରିୟା-ବ୍ୟାପୀ ଆଡମିଶନ୍ (`chatBodyAdmission.ts`)

- **ପରିସର:** `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, ଏବଂ ଅନ୍ୟାନ୍ୟ ଚାଟ୍-ଆକୃତିର ରୁଟ୍ଗୁଡ଼ିକ ପାଇଁ ବଫର୍ଡ-ବଡି/ହିପ୍ ପଥ। ବଡ଼ କୋଡିଂ-ଏଜେଣ୍ଟ ବଡିଗୁଡ଼ିକ ଯୋଗୁଁ
  ହେଉଥିବା ହିପ୍ ବିବର୍ଦ୍ଧନରୁ ସୁରକ୍ଷା ଦିଏ (#4380)।
- **ପ୍ରତି-କି ଲେନ୍ ନୁହେଁ, ଗୋଟିଏ ପ୍ରକ୍ରିୟା-ବୈଶ୍ୱିକ କଣ୍ଟ୍ରୋଲର୍ (#10110)।** ପ୍ରତ୍ୟେକ API କି
  (ହ୍ୟାଶ୍କୃତ) କିମ୍ବା `anonymous` ସେସନ୍ **ସମାନ** ଅଂଶୀଦାର ବଜେଟ୍ ବିପକ୍ଷରେ ଆଡମିଶନ୍ ପାଏ —
  ହ୍ୟାଶ୍କୃତ ସେସନ୍ idକୁ କେବଳ ଏକ ନ୍ୟାୟସଙ୍ଗତ ସିଡ୍ୟୁଲିଂ କି ଭାବରେ (ଅପେକ୍ଷାକାରୀଙ୍କ ମଧ୍ୟରେ ରାଉଣ୍ଡ-ରବିନ୍
  ଡିସ୍ପ୍ୟାଚ୍) ବ୍ୟବହାର କରାଯାଏ, କ୍ଷମତା ଶାର୍ଡ ଭାବରେ କେବେ ନୁହେଁ। ଏହି
  ଡକ୍ୟୁମେଣ୍ଟର ଏକ ପୂର୍ବ ସଂସ୍କରଣ ସ୍ୱାଧୀନ କ୍ଷମତା ସହିତ ପ୍ରତି-କି ଲେନ୍ଗୁଡ଼ିକୁ ବର୍ଣ୍ଣନା କରିଥିଲା; ସେହି ମଡେଲ୍କୁ
  #10110ରେ ହଟାଯାଇଥିଲା, କାରଣ ଏହା ଅପ୍ରମାଣିତ ନକଲି କ୍ରେଡେନ୍ସିଆଲ୍ଗୁଡ଼ିକୁ
  ପ୍ରକ୍ରିୟା-ବ୍ୟାପୀ ସୀମାକୁ ଗୁଣିତ କରିବାକୁ ଦେଉଥିଲା।
- **ଗେଟ୍ (#503-fanout): ଏକ ସ୍ୱୟଂ-ବ୍ୟୁତ୍ପନ୍ନ ଇନ୍ଜେଷ୍ଟ BYTE ବଜେଟ୍, ଏକ ସ୍ଥିର ଅନୁରୋଧ
  ସଂଖ୍ୟା ନୁହେଁ।** ପୁରୁଣା `CHAT_MAX_HEAVY_IN_FLIGHT` ଅନୁରୋଧ-ସଂଖ୍ୟା ସୀମା (ଏହି ସମାଧାନ ପୂର୍ବରୁ ଡିଫଲ୍ଟ `1`)
  କୋଡିଂ-ଏଜେଣ୍ଟ ଫ୍ୟାନ୍-ଆଉଟ୍କୁ (ଏକାଧିକ ସବ୍ଏଜେଣ୍ଟ/CLI,
  ନିୟମିତ ଭାବେ > 256 KB ବଡି) ~1ର ଏକ ପ୍ରଭାବୀ ସମକାଳୀନତାକୁ ସଙ୍କୁଚିତ କରିଦେଉଥିଲା, ଯାହା
  ସମ୍ପୂର୍ଣ୍ଣ ସାଧାରଣ ଲୋଡ୍ରେ 503 ସୃଷ୍ଟି କରୁଥିଲା। ବର୍ତ୍ତମାନ ଏହା କେବଳ ସେତେବେଳେ ସୀମାବଦ୍ଧ କରେ, ଯେତେବେଳେ ଜଣେ ଅପରେଟର୍ ସ୍ପଷ୍ଟ ଭାବେ
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` ସେଟ୍ କରନ୍ତି। ଏହାକୁ ସେଟ୍ ନ କଲେ, ଆଡମିଶନ୍ ପରିବର୍ତ୍ତେ
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ଦ୍ୱାରା ଗେଟ୍ କରାଯାଏ — ପ୍ରକ୍ରିୟାର
  ପ୍ରକୃତ ମେମୋରି ସୀମାରୁ (`src/shared/middleware/admissionBudget.ts`) ସ୍ୱୟଂ-ବ୍ୟୁତ୍ପନ୍ନ ଏକ ବଜେଟ୍:
  V8 ହିପ୍ ସୀମା ଏବଂ ଯେକୌଣସି cgroup/କଣ୍ଟେନର୍ ସୀମା ମଧ୍ୟରୁ ଅଧିକ କଠୋରଟିର 25%,
  ଯାହାକୁ ଏକ 8x ଅସ୍ଥାୟୀ-ବିବର୍ଦ୍ଧନ ଗୁଣକ ଦ୍ୱାରା ଭାଗ କରାଯାଏ ଏବଂ 8 MiBରୁ
  2 GiB ମଧ୍ୟରେ ସୀମିତ କରାଯାଏ। ସ୍ପଷ୍ଟ ଓଭର୍ରାଇଡ୍ଗୁଡ଼ିକ ସମାନ ସୀମା ବ୍ୟବହାର କରେ। କୌଣସି env ଟ୍ୟୁନିଂ ବିନା ଏହା ନିଜକୁ
  512 MB କଣ୍ଟେନର୍ରୁ 32 GB ଡେସ୍କଟପ୍ ପର୍ଯ୍ୟନ୍ତ ସ୍କେଲ୍ କରେ। ପ୍ରଭାବୀ ବଜେଟ୍ ମଧ୍ୟରେ
  ଫିଟ୍ ହୋଇପାରୁ ନଥିବା ଏକ ବଡି `413 body_exceeds_budget` ସହିତ ତୁରନ୍ତ ବିଫଳ ହୁଏ;
  କେବଳ ପୃଥକ୍ ଭାବେ ସେବାଯୋଗ୍ୟ ବଡିଗୁଡ଼ିକ ମଧ୍ୟରେ ପ୍ରତିସ୍ପର୍ଦ୍ଧା ହେଲେ ସୀମିତ
  ନ୍ୟାୟସଙ୍ଗତତା କ୍ୟୁରେ ପ୍ରବେଶ କରେ। ଏକ ଲାଇଭ୍ ବହୁ-ସଙ୍କେତ ସମ୍ବଳ-ଚାପ ଟ୍ରାକର୍ (V8 ହିପ୍ ଅନୁପାତ,
  cgroup, PSI, OOM ଇଭେଣ୍ଟ — `open-sse/utils/resourcePressurePolicy.ts`) `high` ଚାପରେ
  ସୀମିତ ଅପେକ୍ଷାକୁ କମାଏ ଏବଂ `critical` ଚାପରେ
  କୌଣସି ବାଇଟ୍ ଇନ୍ଜେଷ୍ଟ ହେବା ପୂର୍ବରୁ `503 resource_pressure` ସହିତ ତୁରନ୍ତ ଲୋଡ୍ ତ୍ୟାଗ କରେ।
- **ଟ୍ୟୁନିଂ:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ସ୍ୱୟଂ-ବ୍ୟୁତ୍ପନ୍ନ ବାଇଟ୍ ବଜେଟ୍ ପାଇଁ ଓଭର୍ରାଇଡ୍
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ପୁରୁଣା ଅନୁରୋଧ-ସଂଖ୍ୟା ସୀମା, କେବଳ ଅପ୍ଟ-ଇନ୍
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 ପୂର୍ବରୁ କ୍ୟୁ-ଅପେକ୍ଷା (ଡିଫଲ୍ଟ 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — କ୍ୟୁବଦ୍ଧ-ବାଇଟ୍ ହିପ୍ ଭାଲ୍ଭ (ଡିଫଲ୍ଟ 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 ପରଠାରୁ ଅବମୂଲ୍ୟାୟିତ
    ନୋ-ଅପ୍ଗୁଡ଼ିକ (କନଫିଗ୍ ସୁସଙ୍ଗତତା ପାଇଁ ଗ୍ରହଣ କରାଯାଏ, ଅଣଦେଖା କରାଯାଏ)
- **ରିପୋର୍ଟଗୁଡ଼ିକ:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — ଯେଉଁଥିରେ
  #503-fanout ଯୋଗଗୁଡ଼ିକ `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, ଏବଂ `countCapEnabled`
  (ଏକ ଡିଫଲ୍ଟ ଡିପ୍ଲୟମେଣ୍ଟରେ false — ନିଶ୍ଚିତ କରେ ଯେ ପୁରୁଣା
  ସଂଖ୍ୟା ସୀମା ନୁହେଁ, ବରଂ ବାଇଟ୍ ବଜେଟ୍ଟି ହିଁ ବାସ୍ତବରେ ସୀମାବଦ୍ଧ କରୁଛି)।

## 2. ଅନୁକୂଳନଶୀଳ ରନ୍ଟାଇମ୍ ଭର୍ଚୁଆଲ୍ ଲେନ୍ଗୁଡ଼ିକ (`open-sse/services/admission`)

- **ପରିସର:** ପ୍ରଦାନକାରୀ ଡିସ୍ପାଚ୍ ପାଇଁ ଟେନାଣ୍ଟ-କି ଆଡମିଶନ୍ — କ୍ୟୁ ଖର୍ଚ୍ଚ, ବିଳମ୍ବତା-ନିର୍ଦ୍ଦେଶିତ
  ସୀମା ଅନୁକୂଳନ, ଲେନ୍ କ୍ୟୁଇଂ, ଏବଂ ଲେନ୍ ମେଟ୍ରିକ୍ସ।
- **ଗେଟ୍:** **ଅପ୍ଟ-ଇନ୍।** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` ନଥିଲେ ଅକ୍ଷମ ରହେ। ଏହା ବିନା,
  ଅନୁକୂଳନଶୀଳ ନିୟନ୍ତ୍ରକ ସହଭାଗୀ କ୍ୟୁ ଆଚରଣକୁ ଜାରି ରଖେ (#9654 ର ମାନଦଣ୍ଡ 1 କେବଳ
  ଜଣେ ଅପରେଟର୍ ଲେନ୍ଗୁଡ଼ିକୁ ସକ୍ଷମ କରିବା ପରେ ପୂରଣ ହୁଏ)।
- **ଟ୍ୟୁନିଂ:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + ଅନୁକୂଳନଶୀଳ ବିନ୍ୟାସ (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)।
- **ରିପୋର୍ଟ:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ଅସ୍ପଷ୍ଟ ଲେନ୍ ID, କଦାପି କଞ୍ଚା
  କି ନୁହେଁ), ଏବଂ `virtualLanes` — ସ୍ନାପ୍ସଟ୍ରେ "ଲେନ୍ଗୁଡ଼ିକ ସକ୍ରିୟ ଅଛି" ବୋଲି ସୂଚାଉଥିବା ପ୍ରାମାଣିକ ଫ୍ଲାଗ୍।

## 3. ଫ୍ୟାନ୍-ଆଉଟ୍ ପ୍ରୋବ୍ଗୁଡ଼ିକ — କମ୍ବୋ/ଫ୍ୟୁଜନ୍ ପାଇଁ ପ୍ରତି-ଟାର୍ଗେଟ୍ ଆଡମିଶନ୍ (#9654 Wave 2)

କମ୍ବୋ (ପ୍ରାଥମିକତା / ରାଉଣ୍ଡ-ରବିନ୍) ଏବଂ ଫ୍ୟୁଜନ୍ ଗୋଟିଏ ପ୍ୟାରେଣ୍ଟ
ଅନୁରୋଧ ଅଧୀନରେ Nଟି ମଡେଲ୍ ଟାର୍ଗେଟ୍କୁ ଫ୍ୟାନ୍-ଆଉଟ୍ କରନ୍ତି। #9654 Wave 2 ଠାରୁ, **ପ୍ରତ୍ୟେକ ଫ୍ୟାନ୍-ଆଉଟ୍ ଟାର୍ଗେଟ୍କୁ ଡିସ୍ପାଚ୍ ପୂର୍ବରୁ ଗେଟ୍ କରାଯାଏ**
**ପ୍ୟାରେଣ୍ଟର** ଟେନାଣ୍ଟ ଲେନ୍ ବିପକ୍ଷରେ ଏକ ପ୍ରତି-ଟାର୍ଗେଟ୍ ପ୍ରୋବ୍ (`PerTargetAdmissionHook`, `createPerTargetAdmissionHook`
ଦ୍ୱାରା ନିର୍ମିତ) ମାଧ୍ୟମରେ।

- **ପରିସର:** କମ୍ବୋ, ଫ୍ୟୁଜନ୍, ଏବଂ କେଅସ୍ ଇଞ୍ଜିନ୍ ଦ୍ୱାରା ଡିସ୍ପାଚ୍ ହୋଇଥିବା ପ୍ରତ୍ୟେକ ଫ୍ୟାନ୍-ଆଉଟ୍ ଟାର୍ଗେଟ୍।
  ସିଷ୍ଟମ୍ 1 (ବାଇଟ୍-ସ୍ତରୀୟ) ପ୍ରଭାବିତ ହୁଏ ନାହିଁ — ଏହା କେବେ ବି ଫ୍ୟାନ୍-ଆଉଟ୍ ଟାର୍ଗେଟ୍ଗୁଡ଼ିକୁ ପ୍ରୋବ୍ କରେ ନାହିଁ।
- **ଗେଟ୍:** **ସିଷ୍ଟମ୍ 2 ସହିତ ଅପ୍ଟ-ଇନ୍।** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  ସେଟ୍ ହୋଇନଥିଲେ ଏହା କୌଣସି କାର୍ଯ୍ୟ କରେ ନାହିଁ — ସେହି ମୋଡ୍ରେ ପ୍ୟାରେଣ୍ଟ ଅନୁରୋଧ ପୂର୍ବରୁ ସହଭାଗୀ-କ୍ୟୁ ଲିଜ୍ ଧାରଣ କରିଥାଏ,
  ତେଣୁ ପ୍ରୋବିଂ କଲେ ଦୁଇଥର ଗଣନା ହୋଇ କମ୍ବୋ ଟାର୍ଗେଟ୍ଗୁଡ଼ିକ ପ୍ରତ୍ୟାଖ୍ୟାନ ହେବ।
- **ଆଚରଣ ବିଧି:**
  - **ସମ୍ପୂର୍ଣ୍ଣ ଅବରୋଧ-ମୁକ୍ତ — ଏଡ଼ାଇ ଯାଆନ୍ତୁ, କେବେ ବି କ୍ୟୁ କରନ୍ତୁ ନାହିଁ।** `maxWaitMs 0`: ଏକ ପୂର୍ଣ୍ଣ ଲେନ୍
    ଟାର୍ଗେଟ୍କୁ ଏଡ଼ାଇ ଦିଏ ଏବଂ ତାହା ପରିବର୍ତ୍ତେ କମ୍ବୋର ଫଲ୍ବ୍ୟାକ୍ ବ୍ୟବସ୍ଥା (କିମ୍ବା ଫ୍ୟୁଜନ୍ର ସର୍ଭାଇଭର୍
    ପ୍ୟାନେଲ୍) ସେବା ପ୍ରଦାନ କରେ। ଏହା ଉଦ୍ଦେଶ୍ୟମୂଳକ: ଏକ ଫ୍ୟାନ୍-ଆଉଟ୍ ଟାର୍ଗେଟ୍ ଅତିରିକ୍ତ
    କାର୍ଯ୍ୟ, ଏବଂ ଏହାକୁ କ୍ୟୁ କରିବା ଦ୍ୱାରା ଯେଉଁ ସଠିକ୍ ଭିଡ଼କୁ ରୋକିବା ପାଇଁ ଲେନ୍ଗୁଡ଼ିକ ରହିଛି, ସେଠାରେ ଅଧିକ ଲୋଡ୍ ଜମା ହୁଏ।
    ତେଣୁ `defaultMaxWaitMs` କେବଳ **ପ୍ୟାରେଣ୍ଟ ଅନୁରୋଧ** ପାଇଁ ପ୍ରଯୁଜ୍ୟ;
    ଫ୍ୟାନ୍-ଆଉଟ୍ ପ୍ରୋବ୍ଗୁଡ଼ିକ କେବେ ଅପେକ୍ଷା କରନ୍ତି ନାହିଁ, ଏବଂ ସେଗୁଡ଼ିକୁ ଅପେକ୍ଷା କରାଇବା ପାଇଁ ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ **କୌଣସି ନବ୍ ନାହିଁ**
    (ଇସ୍ୟୁ ଇତିହାସ ଦର୍ଶାଏ ଯେ ଅପେକ୍ଷା ନବ୍ଗୁଡ଼ିକ ବ୍ୟାପକ-502/504 ଶ୍ରେଣୀ ସୃଷ୍ଟି କରିଥିଲା,
    ଯାହାକୁ #9654 ପ୍ରତିରୋଧ କରେ — କେବଳ ଯଦି ଜଣେ ଅପରେଟର୍ ଏଡ଼ାଇ ଦିଆଯାଇଥିବା ଫ୍ୟାନ୍-ଆଉଟ୍ ଟାର୍ଗେଟ୍ଗୁଡ଼ିକ
    ପ୍ରତିକ୍ରିୟା ଗୁଣବତ୍ତାକୁ କ୍ଷତି କରୁଛନ୍ତି ବୋଲି ରିପୋର୍ଟ କରନ୍ତି, ତେବେ ଏହାକୁ ପୁନର୍ବିଚାର କରନ୍ତୁ)।
  - **ଆଡମିଟ୍ କଲେ ରିଲିଜ୍।** ଏକ ଆଡମିଟ୍ ହୋଇଥିବା ପ୍ରୋବ୍ ତାହାର ଲିଜ୍କୁ ତୁରନ୍ତ ମୁକ୍ତ କରେ: ଏହା
    ଏକ କ୍ଷମତା ଗେଟ୍, ଧାରଣ ବ୍ୟବସ୍ଥା ନୁହେଁ। ପ୍ୟାରେଣ୍ଟର ଲିଜ୍ ଫ୍ୟାନ୍-ଆଉଟ୍କୁ ଆଚ୍ଛାଦନ କରେ; ଅତିରିକ୍ତ Nଟି
    ଧାରଣ କଲେ ସହଭାଗୀ ସକ୍ରିୟ ଖର୍ଚ୍ଚ ବଢ଼ିଯିବ ଏବଂ ଅନ୍ୟ ଟେନାଣ୍ଟମାନେ ପ୍ରତ୍ୟାଖ୍ୟାନ ହେବେ। ଏହା ସର୍ବୋତ୍ତମ-ପ୍ରୟାସ,
    କୌଣସି ସଂରକ୍ଷଣ ନୁହେଁ: ପ୍ରୋବ୍ ଏବଂ ଡିସ୍ପାଚ୍ ମଧ୍ୟରେ ଲେନ୍ ପୁଣି ପୂର୍ଣ୍ଣ ହୋଇପାରେ, ତେଣୁ
    ଭାରି ପ୍ରତିଦ୍ୱନ୍ଦ୍ୱିତା ସମୟରେ ଗେଟ୍ ଏପରି ଏକ ଲେନ୍ରେ ଆଡମିଟ୍ କରିପାରେ ଯାହା
    ଟାର୍ଗେଟ୍ ଡିସ୍ପାଚ୍ ହେବା ବେଳକୁ ପୁଣି ପୂର୍ଣ୍ଣ ହୋଇଯାଇଥାଏ।
  - **ପ୍ରକୃତ ଫ୍ୟାନ୍-ଆଉଟ୍ ବଡି ଆଧାରରେ ମୂଲ୍ୟାୟିତ।** ପ୍ରୋବ୍
    ଟାର୍ଗେଟ୍ର ପ୍ରକୃତ ବଡିରୁ ଖର୍ଚ୍ଚ ଆକଳନ କରେ — ପ୍ୟାରେଣ୍ଟ ପଥ ପରି ଠିକ୍ ସେହିଭଳି, ଏହାର `stream`
    ଫ୍ଲାଗ୍ରୁ ଉତ୍ପନ୍ନ ଅନୁରୋଧ ଶ୍ରେଣୀକୁ ଅନ୍ତର୍ଭୁକ୍ତ କରି — ତେଣୁ ଫ୍ୟୁଜନ୍ ପ୍ୟାନେଲ୍ ସଦସ୍ୟମାନେ (`stream: false`)
    ସେମାନେ ପ୍ରକୃତରେ ଅଧିକାର କରିବାକୁ ଥିବା ନନ୍-ଷ୍ଟ୍ରିମିଂ ଶ୍ରେଣୀ ଅନୁସାରେ ମୂଲ୍ୟାୟିତ ହୁଅନ୍ତି, ଏବଂ ପ୍ରାଥମିକତା/RR
    ଟାର୍ଗେଟ୍ଗୁଡ଼ିକ ବ୍ୟବହାରକାରୀ ଯାହା ଅନୁରୋଧ କରିଛନ୍ତି ସେହି ଅନୁସାରେ ମୂଲ୍ୟାୟିତ ହୁଅନ୍ତି।
- **ରିପୋର୍ଟ:** ପ୍ରଥମ ଟାର୍ଗେଟ୍ ପରେ ଏକ ପ୍ରୋବ୍ ଏଡ଼ାଇ ଦିଆଗଲେ, କମ୍ବୋର ପ୍ରତି-ଅନୁରୋଧ
  `fallbackCount` ବୃଦ୍ଧି ପାଏ (ବିଦ୍ୟମାନ ଫଲ୍ବ୍ୟାକ୍ ଆଚରଣକୁ ଅନୁସରଣ କରି; କମ୍ବୋ
  ଲଗ୍ଗୁଡ଼ିକରେ ଦୃଶ୍ୟମାନ); ପ୍ରତ୍ୟେକ ପ୍ୟାନେଲ୍ ସଦସ୍ୟକୁ ଏଡ଼ାଇ ଦିଆଗଲେ ଫ୍ୟୁଜନ୍ 503 ଫେରାଏ। ବର୍ତ୍ତମାନ ସ୍ନାପ୍ସଟ୍ରେ
  **କୌଣସି ସମଷ୍ଟି କାଉଣ୍ଟର୍ ନାହିଁ** (ଯଥା `virtualFanoutSkipped`) —
  ଯଦି ଜଣେ ଅପରେଟର୍ ରିପୋର୍ଟ କରନ୍ତି ଯେ ଲେନ୍ ଗେଟ୍ କେତେ ଥର ଫ୍ୟାନ୍-ଆଉଟ୍
  ଟାର୍ଗେଟ୍ଗୁଡ଼ିକୁ ଏଡ଼ାଇ ଦେଉଛି ତାହା ସେମାନେ ଜାଣିପାରୁ ନାହାନ୍ତି, ତେବେ ଏହା ଗୋଟିଏ କାଉଣ୍ଟର୍ ଯୋଡ଼ିବାର ଟ୍ରିଗର୍।

## ଡ୍ୟାଶବୋର୍ଡରେ କେଉଁଟି ଦେଖାଯାଉଛି

- `adaptiveAdmission.laneCount` / `laneTenants` → **ଅନୁକୂଳନଶୀଳ ଭର୍ଚୁଆଲ୍ ଲେନ୍ଗୁଡ଼ିକ** (ସିଷ୍ଟମ୍ 2)।
- `adaptiveAdmission.virtualLanes === true` → ବିଭାଗ 3ର ଫ୍ୟାନ୍-ଆଉଟ୍ ପ୍ରୋବ୍ଗୁଡ଼ିକ ମଧ୍ୟ
  ସକ୍ରିୟ ଅଛି। `virtualLanes` ଅନୁପସ୍ଥିତ କିମ୍ବା `false` ଥିବା ପେଲୋଡ୍ର ଅର୍ଥ ହେଉଛି
  `OMNIROUTE_CHAT_VIRTUAL_LANES` ସେଟ୍ ହୋଇନାହିଁ — ବାଇଟ୍-ସ୍ତରୀୟ ଲେନ୍ଗୁଡ଼ିକ (ସିଷ୍ଟମ୍ 1)
  ଏବେ ମଧ୍ୟ ସକ୍ରିୟ ଅଛି, କିନ୍ତୁ ଏହା ସକ୍ଷମ ନହେବା ପର୍ଯ୍ୟନ୍ତ `adaptiveAdmission` ଅଧୀନରେ
  କିଛି ମଧ୍ୟ (ଏବଂ କୌଣସି ଫ୍ୟାନ୍-ଆଉଟ୍ ଗେଟିଂ) କାର୍ଯ୍ୟକାରୀ ହୁଏ ନାହିଁ।

## ଉଭୟ କାହିଁକି ରହିଛି

ବାଇଟ୍-ସ୍ତରୀୟ ଲେନ୍ଗୁଡ଼ିକ ଅଧିକ ମେମୋରି ବ୍ୟବହାରକାରୀ ପାର୍ସ/କମ୍ପ୍ରେସ୍ ପଥକୁ ସୀମିତ କରେ; ଅନୁକୂଳନଶୀଳ ଲେନ୍ଗୁଡ଼ିକ
ପ୍ରତି ଟେନାଣ୍ଟର ଡିସ୍ପାଚ୍ ଖର୍ଚ୍ଚକୁ ସୀମିତ କରେ। #9654ର ମାନଦଣ୍ଡ 1 ("ଗୋଟିଏ ସେସନ୍ର ବର୍ଷ୍ଟ ଅନ୍ୟଟିକୁ 503
କରେ ନାହିଁ") ସିଷ୍ଟମ୍ 1 ଦ୍ୱାରା ବିନା ସର୍ତ୍ତରେ ଏବଂ ଅପ୍ଟ-ଇନ୍ ସକ୍ଷମ ହେବା ପରେ ସିଷ୍ଟମ୍ 2 ଦ୍ୱାରା ପ୍ରବର୍ତ୍ତିତ ହୁଏ।

## 4. ଏକ-ପ୍ରୋସେସ୍ ଦୀର୍ଘ `/v1/responses` (ସୁସ୍ଥ-ହେଡ୍ରୁମ୍)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` ଯୋଡ଼ିଛି,
ଯାହାଦ୍ୱାରା ହିପ୍ `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ତଳେ ଥିଲେ ଦ୍ୱିତୀୟ
ଗଠନାତ୍ମକ ଭାବେ ଭାରୀ ଅନୁରୋଧକୁ ଗ୍ରହଣ କରାଯାଏ। `admitChatRequest` ଦ୍ୱାରା ବ୍ୟବହୃତ BYTE
ପଥ (ବଡି ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
ଡିଫଲ୍ଟ 256 KiB, `POST /v1/responses` ସମେତ) **ସମାନ** ଏସ୍କେପ୍ ବ୍ୟବହାର କରେ।

ଦୁଇଟିରୁ ଅଧିକ ସମକାଳୀନ ଦୀର୍ଘ SSE `/v1/responses` ପାଇଁ ଏହା ହେଉଛି ସମର୍ଥିତ
**ଏକ-ପ୍ରୋସେସ୍** ପ୍ରଣାଳୀ: ହିପ୍ ଏବଂ ପ୍ରୋସେସ୍-ବ୍ୟାପୀ ଇନ୍ଫ୍ଲାଇଟ୍-ବାଇଟ୍ ବଜେଟ୍
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ଯେତିକି ଅନୁମତି ଦିଏ, କେବଳ ସେତିକି ପର୍ଯ୍ୟନ୍ତ
ପ୍ରାଥମିକ + ସୁସ୍ଥ-ହେଡ୍ରୁମ୍ ବଢ଼ାନ୍ତୁ। ଦଶଦଶ ଦୀର୍ଘ SSE କ୍ଲାଏଣ୍ଟ୍ (40–50) ହେଉଛି ସେହି
ମେମୋରି-ବଜେଟ୍ ସମ୍ବନ୍ଧୀୟ ପ୍ରଶ୍ନ, କୌଣସି କଠୋର “ସର୍ବାଧିକ 2” ପ୍ରଡକ୍ଟ ସୀମା ନୁହେଁ। ଚାପଗ୍ରସ୍ତ ହିପ୍
ତଥାପି ପୁନଃଚେଷ୍ଟାଯୋଗ୍ୟ `503` ସହିତ ଲୋଡ୍ ହ୍ରାସ କରେ, ଯାହାଦ୍ୱାରା #7849 ପୁଣି ନ ଫେରେ।

**ହିପ୍ଗୁଡ଼ିକୁ ବହୁଗୁଣିତ କରିବା** ପାଇଁ, Nଟି ସ୍ୱାଧୀନ `DATA_DIR` (#11024) ଚଲାନ୍ତୁ। ଗୋଟିଏ SQLite ଫାଇଲ୍ରେ
କେବେବି `replicas > 1` ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ (#10350)। ଏହି ବିଭାଗ DATA_DIR ସ୍କେଲ୍-ଆଉଟ୍ ପ୍ରଣାଳୀକୁ
ପୁନଃ ଖୋଲୁନାହିଁ।
