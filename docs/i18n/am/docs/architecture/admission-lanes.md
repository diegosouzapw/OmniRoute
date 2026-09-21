# Admission lanes (#9654) — two lane systems, what gates each, where each reports (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute የተለያዩ ወሰኖች ያሏቸው በሂደት ውስጥ ብቻ የሚሰሩ **ሁለት** የመስመር ሥርዓቶች አሉት። እነዚህ
እርስ በርሳቸው የሚደጋገፉ ናቸው፤ ኦፕሬተሮች የትኛውን እየተመለከቱ እንደሆነ ማወቅ አለባቸው።

## 1. በባይት ደረጃ በመላው ሂደት የሚሰራ የመግቢያ ቁጥጥር (`chatBodyAdmission.ts`)

- **ወሰን፦** ለ`POST /v1/chat/completions`፣
  `/v1/messages`፣ `/v1/responses` እና ለሌሎች የውይይት ቅርጽ ላላቸው መስመሮች የሚያገለግለው የተከማቸ-ይዘት/heap መንገድ።
  ከትላልቅ የኮዲንግ ወኪል ይዘቶች የሚመጣውን የheap ማባዛት ይከላከላል (#4380)።
- **ለእያንዳንዱ ቁልፍ የተለዩ መስመሮች ሳይሆኑ፣ አንድ በመላው ሂደት የሚጋራ መቆጣጠሪያ (#10110)።** እያንዳንዱ API ቁልፍ
  (hash የተደረገ) ወይም `anonymous` ክፍለ-ጊዜ በ**ተመሳሳዩ** የጋራ በጀት ላይ ተመስርቶ ይገባል —
  hash የተደረገው የክፍለ-ጊዜ መለያ የሚያገለግለው እንደ ፍትሃዊ የጊዜ ሰሌዳ ቁልፍ ብቻ ነው (በተጠባባቂዎች መካከል
  ዙር-በ-ዙር ስርጭት)፤ እንደ አቅም ክፍፍል ፈጽሞ አያገለግልም። የዚህ ሰነድ ቀዳሚ ስሪት
  ነጻ አቅም ያላቸውን ለእያንዳንዱ ቁልፍ የተለዩ መስመሮች ይገልጽ ነበር፤ ያ ሞዴል
  ማረጋገጫ የሌላቸው የሐሰት ምስክርነቶች የመላውን ሂደት ገደብ እንዲያባዙ ስለፈቀደ
  በ#10110 ተወግዷል።
- **መዝጊያ (#503-fanout)፦ በራስ-ሰር የሚወሰን የግብዓት BYTE በጀት እንጂ ቋሚ የጥያቄ
  ብዛት አይደለም።** የቆየው የ`CHAT_MAX_HEAVY_IN_FLIGHT` የጥያቄ-ብዛት ገደብ (ከዚህ ማስተካከያ በፊት ነባሪው `1`)
  የኮዲንግ ወኪል የተስፋፋ ስርጭትን (በርካታ ንዑስ ወኪሎች/CLIs፣
  ዘወትር > 256 KB የሆኑ ይዘቶች) ወደ ~1 ውጤታማ ትይዩነት ያወርደው ነበር፣ ይህም
  ፍጹም መደበኛ በሆነ ጭነት ላይ 503 እንዲመለስ ያደርግ ነበር። አሁን የሚያስገድደው ኦፕሬተሩ
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`ን በግልጽ ሲያዘጋጅ ብቻ ነው። ሳይዘጋጅ ሲቀር፣ መግቢያው በምትኩ
  በ`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ይገደባል — ከሂደቱ እውነተኛ የማህደረ ትውስታ ጣሪያ
  (`src/shared/middleware/admissionBudget.ts`) በራስ-ሰር የሚወሰን በጀት፦
  ከV8 heap ገደብ እና ከማንኛውም cgroup/container ገደብ ውስጥ ይበልጥ ጥብቅ የሆነው 25%፣
  በ8x ጊዜያዊ-ማባዣ መጠን ተካፍሎ፣ በ8 MiB እና
  2 GiB መካከል ተገድቦ። ግልጽ መተኪያዎችም እነዚሁን ገደቦች ይጠቀማሉ። ይህ ያለምንም env ማስተካከያ ከ
  512 MB container እስከ 32 GB desktop ድረስ ራሱን ያመጣጥናል። በውጤታማው በጀት ውስጥ
  ሊገባ የማይችል ይዘት ወዲያውኑ `413 body_exceeds_budget` በሚል ይከሽፋል፤
  በተናጠል ሊስተናገዱ በሚችሉ ይዘቶች መካከል ያለ ፉክክር ብቻ ወደ ውስን
  የፍትሃዊነት ወረፋ ይገባል። ቀጥታ የሚሰራ ባለብዙ-ምልክት የሀብት-ጫና መከታተያ (የV8 heap ሬሾ፣
  cgroup፣ PSI፣ OOM ክስተቶች — `open-sse/utils/resourcePressurePolicy.ts`) በ`high` ጫና ወቅት
  ውስን የጥበቃ ጊዜውን ያሳጥራል፣ በ`critical` ጫና ወቅት ደግሞ ማንኛውም ባይት ከመግባቱ በፊት
  ወዲያውኑ `503 resource_pressure` በሚል ጭነቱን ይቀንሳል። PSI በሚገኝበት ጊዜ ከዚህ አሃድ cgroup `memory.pressure`
  (`open-sse/utils/resourcePressureSampler.ts`) ይነበባል፤ `/proc/pressure/memory`
  የመላው host መረጃ ሲሆን በbare metal / cgroup v1 ላይ ብቻ እንደ መጠባበቂያ ያገለግላል፣ ስለዚህ swapping
  የሚያደርግ host ስራ ፈት የሆነ container 503 እንዲመልስ ማድረግ አይችልም።
- **ማስተካከያ፦**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — በራስ-ሰር ለሚወሰነው የባይት በጀት መተኪያ
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — የቆየ የጥያቄ-ብዛት ገደብ፣ በምርጫ ብቻ የሚነቃ
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 ከመመለሱ በፊት የወረፋ ጥበቃ ጊዜ (ነባሪ 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — የተሰለፉ-ባይቶች heap መቆጣጠሪያ (ነባሪ 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — ከ#10110 ጀምሮ ጥቅም ላይ የማይውሉ
    ምንም-የማያደርጉ ቅንብሮች (ለውቅር ተኳኋኝነት ይቀበላሉ፣ ግን ችላ ይባላሉ)
- **ሪፖርቶች፦** `GET /api/monitoring/health` → `chatAdmission` (#11244) — የ#503-fanout ተጨማሪዎችን
  `inflightBytes`፣ `maxInflightBytes`፣ `budgetSource`
  (`v8_heap` | `cgroup` | `override`)፣ `pressureSeverity` እና `countCapEnabled`ን ጨምሮ
  (በነባሪ ስርጭት ላይ false — በተግባር እየገደበ ያለው የባይት በጀቱ እንጂ የቆየው
  የብዛት ገደብ አለመሆኑን ያረጋግጣል)።

## 2. ተስማሚ የአሂድ ጊዜ ምናባዊ መስመሮች (`open-sse/services/admission`)

- **ወሰን፦** ለአቅራቢ መላክ በተከራይ ቁልፍ የሚደረግ የመቀበያ ቁጥጥር — የወረፋ ወጪ፣ በመዘግየት የሚመራ
  የገደብ ማስተካከያ፣ የመስመር ወረፋ እና የመስመር መለኪያዎች።
- **ማብሪያ፦** **በምርጫ የሚነቃ።** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` ካልሆነ ተሰናክሏል። ያለዚህ፣
  ተስማሚው ተቆጣጣሪ የጋራ ወረፋውን ባህሪ እንደነበረ ያቆያል (የ#9654 መስፈርት 1 የሚሟላው
  ኦፕሬተር መስመሮቹን ካነቃ በኋላ ብቻ ነው)።
- **ማስተካከያ፦** `OMNIROUTE_CHAT_VIRTUAL_LANES` + ተስማሚ ውቅር (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)።
- **ሪፖርቶች፦** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (ይዘታቸው የተደበቀ የመስመር መታወቂያዎች፤ ጥሬ
  ቁልፎች ፈጽሞ አይታዩም)፣ እና `virtualLanes` — በቅጽበታዊ ማጠቃለያው ውስጥ «መስመሮቹ ነቅተዋል» የሚለውን በይፋ የሚያረጋግጥ ጠቋሚ።

## 3. የFan-out መመርመሪያዎች — ለcombo/fusion በዒላማ የመቀበያ ቁጥጥር (#9654 Wave 2)

Combo (ቅድሚያ / ተራ-በ-ተራ) እና fusion በአንድ ዋና
ጥያቄ ሥር N የሞዴል ዒላማዎችን ወደ ብዙ አቅጣጫዎች ያሰራጫሉ። ከ#9654 Wave 2 ጀምሮ፣ **እያንዳንዱ የfan-out ዒላማ ከመላኩ በፊት የመቀበያ ቁጥጥር ይደረግበታል**፤
ይህም በዒላማ መመርመሪያ (`PerTargetAdmissionHook`፣ በ`createPerTargetAdmissionHook` የሚገነባ)
ከ**ዋናው** የተከራይ መስመር አንጻር ይከናወናል።

- **ወሰን፦** በcombo፣ fusion እና chaos engine የሚላክ እያንዳንዱ የfan-out ዒላማ።
  System 1 (በባይት ደረጃ) ተጽዕኖ አይደርስበትም — የfan-out ዒላማዎችን ፈጽሞ አይመረምርም።
- **ማብሪያ፦** **ከsystem 2 ጋር በምርጫ የሚነቃ።** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  ካልተዋቀረ ምንም አያደርግም — በዚያ ሁነታ ዋናው ጥያቄ አስቀድሞ የጋራ ወረፋውን ፈቃድ ይዟል፤
  ስለዚህ መመርመር ወጪውን ሁለት ጊዜ በመቁጠር የcombo ዒላማዎችን ውድቅ ያደርጋል።
- **የአሠራር ትርጉም፦**
  - **በጥብቅ የማያግድ — ይዝለል፣ ፈጽሞ ወረፋ አይጠብቅ።** `maxWaitMs 0`፦ የተሞላ መስመር
    ዒላማውን ይዘላል፣ እናም በምትኩ የcombo ተለዋጭ አሠራር (ወይም የfusion ቀሪ
    ፓነል) ያገለግላል። ይህ ሆን ተብሎ የተደረገ ነው፦ የfan-out ዒላማ ተደጋጋሚ
    ሥራ ነው፣ እና ወረፋ ማስጠበቅ መስመሮቹ ሊያስቆሙት በተዘጋጁት ትክክለኛ የመጨናነቅ ቦታዎች ላይ
    ተጨማሪ ጫና ይከምራል። ስለዚህ `defaultMaxWaitMs` የሚሠራው **በዋናው ጥያቄ ላይ ብቻ** ነው፤
    የfan-out መመርመሪያዎች ፈጽሞ አይጠብቁም፣ እንዲጠብቁም የሚያደርግ **ምንም ማስተካከያ የለም**።
    (የችግሩ ታሪክ የመጠበቂያ ማስተካከያዎች #9654 የሚከላከለውን የጅምላ-502/504 ዓይነት ችግር
    እንደፈጠሩ ያሳያል — ኦፕሬተር የተዘለሉ የfan-out ዒላማዎች የምላሽ ጥራትን
    እየጎዱ መሆኑን ሪፖርት ካደረገ ብቻ እንደገና ይገምገም)።
  - **ሲፈቀድ መልቀቅ።** የተፈቀደለት መመርመሪያ ፈቃዱን ወዲያውኑ ይለቃል፦ ይህ
    የአቅም በር እንጂ የሚቆይ ይዞታ አይደለም። የዋናው ጥያቄ ፈቃድ fan-outን ይሸፍናል፤ ተጨማሪ N
    ፈቃዶችን መያዝ የጋራውን ንቁ ወጪ ከእውነቱ በላይ በማሳየት ሌሎች ተከራዮችን ውድቅ ያደርጋል።
    የተቻለውን ያህል ብቻ የሚሠራ እንጂ ቦታ ማስያዣ አይደለም፦ በመመርመር እና በመላክ መካከል መስመሩ እንደገና ሊሞላ ይችላል፤ ስለዚህ
    ከባድ ፉክክር ሲኖር በሩ፣ ዒላማው በሚላክበት ጊዜ እንደገና ወደተሞላ መስመር
    እንዲገባ ሊፈቅድ ይችላል።
  - **ዋጋው ከእውነተኛው የfan-out አካል ይሰላል።** መመርመሪያው ወጪን ከዒላማው
    እውነተኛ አካል ይገምታል — ልክ እንደ ዋናው መንገድ ከ`stream` ጠቋሚው የሚወሰነውን የጥያቄ ክፍል ጨምሮ — ስለዚህ የfusion ፓነል አባላት (`stream: false`)
    በእውነት በሚጠቀሙበት ያለ-ዥረት ክፍል ዋጋ ይሰጣቸዋል፣ የpriority/RR
    ዒላማዎች ደግሞ ተጠቃሚው በጠየቀው መሠረት ዋጋ ይሰጣቸዋል።
- **ሪፖርቶች፦** ከመጀመሪያው ዒላማ በኋላ የሚከሰት የመመርመሪያ ዝለል የcomboን የእያንዳንዱ-ጥያቄ
  `fallbackCount` ይጨምራል (ያለውን የተለዋጭ አሠራር ትርጉም በመከተል፤ በcombo
  ምዝግቦች ውስጥ ይታያል)፤ ሁሉም የፓነል አባላት ከተዘለሉ fusion 503 ይመልሳል። በአሁኑ ጊዜ
  በቅጽበታዊ ማጠቃለያው ላይ **ምንም የተጠቃለለ ቆጣሪ የለም** (ለምሳሌ `virtualFanoutSkipped`) —
  ኦፕሬተር የመስመር በሩ የfan-out ዒላማዎችን ምን ያህል ጊዜ እንደሚዘል ማወቅ አልቻልኩም ብሎ
  ሪፖርት ካደረገ፣ ይህ ቆጣሪውን ለመጨመር ምክንያት ይሆናል።

## በዳሽቦርድ ላይ የሚታየው የትኛው ነው

- `adaptiveAdmission.laneCount` / `laneTenants` → **አስማሚ ምናባዊ መስመሮች** (ስርዓት 2)።
- `adaptiveAdmission.virtualLanes === true` → የክፍል 3 fan-out probes
  እንዲሁም ንቁ ናቸው። `virtualLanes` የሌለው ወይም `false` የሆነ payload ማለት
  `OMNIROUTE_CHAT_VIRTUAL_LANES` አልተዋቀረም ማለት ነው — የባይት-ደረጃ መስመሮች (ስርዓት 1)
  አሁንም ንቁ ናቸው፣ ነገር ግን እስኪነቃ ድረስ በ`adaptiveAdmission` ስር ያለ ምንም ነገር
  (እንዲሁም ምንም fan-out gating) ተግባራዊ አይሆንም።

## ሁለቱም ለምን እንዳሉ

የባይት-ደረጃ መስመሮች ከፍተኛ ማህደረ ትውስታ የሚጠቀመውን የመተንተን/የማመቅ መንገድ ይገድባሉ፤ አስማሚ መስመሮች ደግሞ
ለእያንዳንዱ tenant የdispatch ወጪን ይገድባሉ። የ#9654 መስፈርት 1 ("የአንድ session ድንገተኛ ጭማሪ ሌላውን 503 እንዲያገኝ
አያደርግም") በስርዓት 1 ያለምንም ቅድመ ሁኔታ፣ እና opt-in ከነቃ በኋላ በስርዓት 2 ይተገበራል።

## 4. ባለአንድ-ሂደት ረጅም `/v1/responses` (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)
heap ከ`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` በታች ሲሆን ሁለተኛ ከባድ መዋቅር ያለው ጥያቄ
እንዲፈቀድ `tryAcquireHealthyHeadroom`ን ጨምሯል። `admitChatRequest` የሚጠቀምበት BYTE
መንገድ (bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`፣
ነባሪው 256 KiB፣ `POST /v1/responses`ን ጨምሮ) **ተመሳሳዩን** ማምለጫ ይጠቀማል።

ይህ ከሁለት በላይ በአንድ ጊዜ የሚሄዱ ረጅም
SSE `/v1/responses` ለማስተናገድ የሚደገፈው **ባለአንድ-ሂደት** አሰራር ነው፦ ዋናውን + healthy-headroomን heap
እና የሂደቱ-አቀፍ inflight-byte በጀት (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) እስከሚፈቅዱት መጠን ብቻ ከፍ ያድርጉ። በአስር የሚቆጠሩ ረጅም SSE clients (40–50) ያንን የማህደረ ትውስታ-በጀት
ጥያቄ የሚመለከት ነው፣ ጠንካራ የ“ከፍተኛው 2” የምርት ገደብ አይደለም። ጫና ያለበት heap አሁንም
#7849 እንዳይመለስ እንደገና ሊሞከር በሚችል `503` ጥያቄዎችን ይቀንሳል።

**heapsን ለማባዛት**፣ N ነጻ `DATA_DIR`s (#11024) ያሂዱ። በአንድ SQLite ፋይል ላይ
`replicas > 1`ን በፍጹም አያሂዱ (#10350)። ይህ ክፍል የDATA_DIR scale-out አሰራርን እንደገና የሚከፍት አይደለም።
