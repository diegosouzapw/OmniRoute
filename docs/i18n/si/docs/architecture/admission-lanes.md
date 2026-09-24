# Admission lanes (#9654) — two lane systems, what gates each, where each reports (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute සතුව විවිධ පරාසයන් සහිත process-local lane පද්ධති **දෙකක්** ඇත. ඒවා
එකිනෙකට අනුපූරක වේ; ක්රියාකරුවන් තමන් නිරීක්ෂණය කරන්නේ කුමන එකදැයි දැන සිටිය යුතුය.

## 1. බයිට් මට්ටමේ ක්රියාවලි-ව්යාප්ත ඇතුළත් කිරීම (`chatBodyAdmission.ts`)

- **විෂය පථය:** `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, සහ අනෙකුත් chat-ආකාරයේ මාර්ග සඳහා වන buffered-body/heap මාර්ගය. විශාල coding-agent body හේතුවෙන් ඇති වන heap විස්තාරණයෙන් ආරක්ෂා කරයි (#4380).
- **එක් එක් key සඳහා වෙන වෙනම lanes නොව, සමස්ත ක්රියාවලියටම එක් controller එකක් (#10110).** සෑම API key එකක්ම
  (hash කළ) හෝ `anonymous` session එකක්ම ඇතුළත් වන්නේ **එකම** හවුල් budget එකට එරෙහිවය —
  hash කළ session id එක භාවිත කරන්නේ සාධාරණත්ව scheduling key එකක් ලෙස පමණි (රැඳී සිටින්නන් අතර round-robin
  dispatch කිරීම සඳහා), capacity shard එකක් ලෙස කිසිවිටෙකත් නොවේ. මෙම ලේඛනයේ පෙර අනුවාදයක
  ස්වාධීන capacity සහිත එක් එක් key සඳහා lanes විස්තර කර තිබුණි; සත්යාපනය නොකළ ව්යාජ credentials මඟින්
  ක්රියාවලි-ව්යාප්ත සීමාව ගුණ කිරීමට එම ආකෘතිය ඉඩ ලබා දුන් බැවින්, එය #10110 තුළ ඉවත් කරන ලදී.
- **Gate (#503-fanout): ස්වයංක්රීයව ව්යුත්පන්න කරන ingest BYTE budget එකක් මිස ස්ථාවර request
  ගණනක් නොවේ.** පැරණි `CHAT_MAX_HEAVY_IN_FLIGHT` request-count සීමාව (මෙම නිවැරදි කිරීමට පෙර පෙරනිමිය `1`)
  coding-agent fan-out (subagents/CLI කිහිපයක්,
  සාමාන්යයෙන් 256 KB ඉක්මවන body) ~1ක ඵලදායී concurrency එකකට පහත හෙළූ අතර, සම්පූර්ණයෙන්ම සාමාන්ය load යටතේ
  503 ප්රතිචාර ඇති කළේය. දැන් එය බලපැවැත්වෙන්නේ operator කෙනෙකු විසින්
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` පැහැදිලිව සකසන විට පමණි. එය සකසා නොතැබූ විට, ඇතුළත් කිරීම
  වෙනුවට `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` මඟින් පාලනය වේ — ක්රියාවලියේ සැබෑ memory ceiling එකෙන්
  (`src/shared/middleware/admissionBudget.ts`) ස්වයංක්රීයව ව්යුත්පන්න කරන budget එකකි:
  V8 heap සීමාව සහ ඕනෑම cgroup/container සීමාව යන දෙකෙන් වඩා දැඩි සීමාවේ 25%ක්,
  8x තාවකාලික විස්තාරණ සාධකයකින් බෙදා, 8 MiB සහ
  2 GiB අතර සීමා කරයි. පැහැදිලි overrides සඳහාද එම සීමාම භාවිත වේ. මෙය env සැකසීමකින් තොරව
  512 MB container එකක සිට 32 GB desktop එකක් දක්වා ස්වයංක්රීයව පරිමාණය වේ. ඵලදායී budget එක තුළ
  ගැළපිය නොහැකි body එකක් `413 body_exceeds_budget` සමඟ වහාම අසාර්ථක වේ;
  තනි තනිව සේවා සැපයිය හැකි body අතර ඇති තරගකාරීත්වය පමණක් සීමා කළ
  සාධාරණත්ව queue එකට ඇතුළු වේ. සජීවී බහු-signal resource-pressure tracker එකක් (V8 heap අනුපාතය,
  cgroup, PSI, OOM සිදුවීම් — `open-sse/utils/resourcePressurePolicy.ts`) `high` පීඩනය යටතේ
  සීමා කළ බලා සිටීම කෙටි කරන අතර, bytes කිසිවක් ingest කිරීමටත් පෙර
  `critical` පීඩනය යටතේ `503 resource_pressure` සමඟ වහාම load ඉවත් කරයි.
  PSI ලබා ගත හැකි විට මෙම unit එකේ cgroup `memory.pressure` වෙතින් කියවනු ලැබේ
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory` යනු
  host-ව්යාප්ත වන අතර bare metal / cgroup v1 මත fallback එක ලෙස පමණක් භාවිත වේ. එබැවින් swapping සිදු කරන
  host එකකට idle container එකකින් 503 ප්රතිචාරයක් ඇති කළ නොහැක.
- **සැකසීම්:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — ස්වයංක්රීයව ව්යුත්පන්න කළ byte budget එක සඳහා override එක
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — පැරණි request-count සීමාව, opt-in පමණි
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503ට පෙර queue-wait කාලය (පෙරනිමිය 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — queued-bytes heap valve එක (පෙරනිමිය 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 සිට අත්හැර දැමූ
    no-op වේ (config compatibility සඳහා පිළිගන්නා නමුත් නොසලකා හරිනු ලැබේ)
- **වාර්තා:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — #503-fanout එකෙන් එක් කළ
  `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, සහ `countCapEnabled`
  ද ඇතුළුව (පෙරනිමි deployment එකකදී false — සැබවින්ම බලපැවැත්වෙන්නේ පැරණි
  count සීමාව නොව byte budget එක බව තහවුරු කරයි).

## 2. අනුවර්තී ධාවනකාල අතථ්ය මංතීරු (`open-sse/services/admission`)

- **විෂය පථය:** සපයන්නා වෙත යොමු කිරීම සඳහා tenant-key ඇතුළත් කරගැනීම — පෝලිම් පිරිවැය, ප්රමාදය මඟින් මඟපෙන්වන
  සීමා අනුවර්තනය, මංතීරු පෝලිම්ගත කිරීම සහ මංතීරු ප්රමිතික.
- **සක්රියකරණ කොන්දේසිය:** **තෝරා සක්රිය කළ යුතුය.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` නොමැති නම් අක්රියයි. එය නොමැතිව,
  අනුවර්තී පාලකය හවුල් පෝලිම් හැසිරීම පවත්වා ගනී (#9654 හි නිර්ණායක 1
  අදාළ වන්නේ ක්රියාකරු මංතීරු සක්රිය කළ පසුව පමණි).
- **සුසර කිරීම:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + අනුවර්තී වින්යාසය (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **වාර්තා:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (නිරාවරණය නොවන මංතීරු ID, කිසිවිටෙකත් අමු
  යතුරු නොවේ), සහ `virtualLanes` — ස්නැප්ෂොට් එක තුළ "මංතීරු සක්රියයි" යන්න තහවුරු කරන ප්රධාන ධජය.

## 3. Fan-out පරීක්ෂණ — combo/fusion සඳහා එක් එක් ඉලක්කයට ඇතුළත් කරගැනීම (#9654 Wave 2)

Combo (ප්රමුඛතාව / round-robin) සහ fusion එක් මව්
ඉල්ලීමක් යටතේ N මාදිලි ඉලක්ක වෙත fan-out කරයි. #9654 Wave 2 සිට, **සෑම fan-out ඉලක්කයක්ම යොමු කිරීමට පෙර පාලනය කෙරේ**,
ඒ සඳහා **මව් ඉල්ලීමේ** tenant මංතීරුවට එරෙහිව එක් එක් ඉලක්කයට අදාළ පරීක්ෂණයක් (`PerTargetAdmissionHook`, `createPerTargetAdmissionHook`
මඟින් ගොඩනඟන ලද) භාවිත වේ.

- **විෂය පථය:** combo, fusion සහ chaos engine මඟින් යොමු කරන සෑම fan-out ඉලක්කයක්ම.
  පද්ධතිය 1 (බයිට්-මට්ටම) බලපෑමට ලක් නොවේ — එය කිසිවිටෙකත් fan-out ඉලක්ක පරීක්ෂා නොකරයි.
- **සක්රියකරණ කොන්දේසිය:** **පද්ධතිය 2 සමඟ තෝරා සක්රිය කළ යුතුය.** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  සකසා නොමැති විට මෙය කිසිදු ක්රියාවක් නොකරයි — එම ප්රකාරයේදී මව් ඉල්ලීම දැනටමත් හවුල් පෝලිමේ lease එක දරන බැවින්,
  පරීක්ෂා කිරීම ද්විත්ව ගණනයකට සහ combo ඉලක්ක ප්රතික්ෂේප කිරීමට හේතු වනු ඇත.
- **අර්ථවිධිය:**
  - **දැඩි ලෙස අවහිර නොකරයි — පෝලිම්ගත නොකර, මඟහරින්න.** `maxWaitMs 0`: පිරුණු මංතීරුවක්
    ඉලක්කය මඟහරින අතර ඒ වෙනුවට combo හි පසුබැසීමේ යාන්ත්රණය (හෝ fusion හි ඉතිරිවූ
    පැනලය) සේවය සපයයි. මෙය හිතාමතා කළ දෙයකි: fan-out ඉලක්කයක් යනු අතිරික්ත
    කාර්යයක් වන අතර එය පෝලිම්ගත කිරීම, මංතීරු මඟින් නැවැත්වීමට අදහස් කරන එම තදබදය මතම
    තවත් භාරයක් ගොඩගසයි. එබැවින් `defaultMaxWaitMs` අදාළ වන්නේ **මව් ඉල්ලීමට පමණි**;
    fan-out පරීක්ෂණ කිසිවිටෙකත් රැඳී නොසිටින අතර ඒවා රැඳී සිටීමට සැලැස්වීම සඳහා හිතාමතාම
    **කිසිදු සැකසුම් විකල්පයක් නොමැත** (ගැටලු ඉතිහාසයෙන් පෙනෙන්නේ රැඳී සිටීමේ සැකසුම් විකල්ප,
    #9654 මඟින් වළක්වන මහා පරිමාණ 502/504 වර්ගයේ දෝෂ ඇති කළ බවයි — මඟහරින ලද fan-out ඉලක්ක
    ප්රතිචාරයේ ගුණාත්මකභාවයට හානි කරන බව ක්රියාකරුවෙකු වාර්තා කළහොත් පමණක් මෙය නැවත සලකා බලන්න).
  - **ඇතුළත් කළ විට මුදා හැරීම.** ඇතුළත් කළ පරීක්ෂණයක් එහි lease එක වහාම මුදාහරියි: එය
    ධාරිතා ද්වාරයක් මිස රඳවාගැනීමක් නොවේ. මව් ඉල්ලීමේ lease එක fan-out එක ආවරණය කරයි; තවත් N
    ක් රඳවාගැනීම හවුල් සක්රිය පිරිවැය වැඩිකර වෙනත් tenants ප්රතික්ෂේප කරනු ඇත. මෙය උපරිම උත්සාහයක්
    මිස වෙන්කර තැබීමක් නොවේ: පරීක්ෂණය සහ යොමු කිරීම අතරතුර මංතීරුව නැවත පිරිය හැකි බැවින්,
    දැඩි තරගකාරී තත්ත්වයකදී ඉලක්කය යොමු කරන අවස්ථාව වන විට නැවතත් පිරී ඇති මංතීරුවකට
    ද්වාරය ඇතුළත් වීමට ඉඩ දිය හැක.
  - **සැබෑ fan-out body එකෙන් මිල නියම කෙරේ.** පරීක්ෂණය ඉලක්කයේ සැබෑ body එකෙන් පිරිවැය
    ඇස්තමේන්තු කරයි — මව් මාර්ගයේදී මෙන්ම, එහි `stream` ධජයෙන් ව්යුත්පන්න කළ ඉල්ලීම් පන්තියද
    ඇතුළුව — එම නිසා fusion පැනල සාමාජිකයන් (`stream: false`) ඔවුන් සැබවින්ම භාවිත කරන
    non-streaming පන්තියට අනුවත්, priority/RR ඉලක්ක පරිශීලකයා ඉල්ලා ඇති ආකාරයටත් මිල කෙරේ.
- **වාර්තා:** පළමු ඉලක්කයෙන් පසු සිදුවන පරීක්ෂණ මඟහැරීමක් combo හි එක් ඉල්ලීමකට අදාළ
  `fallbackCount` වැඩි කරයි (පවතින පසුබැසීමේ අර්ථවිධිය පිළිබිඹු කරමින්; combo
  ලොග්වල දෘශ්යමාන වේ); සෑම පැනල සාමාජිකයෙකුම මඟහරිනු ලැබුවහොත් fusion 503 ලබා දෙයි. අද ස්නැප්ෂොට් එකේ
  **සමස්ත කවුන්ටරයක් නොමැත** (උදා. `virtualFanoutSkipped`) —
  මංතීරු ද්වාරය කොපමණ වාරයක් fan-out ඉලක්ක මඟහරිනවාදැයි හඳුනාගත නොහැකි බව ක්රියාකරුවෙකු වාර්තා කළහොත්,
  එවැන්නක් එක් කිරීමට හේතුව එයයි.

## උපකරණ පුවරුවක පෙන්වන්නේ කුමක්ද

- `adaptiveAdmission.laneCount` / `laneTenants` → **අනුවර්තී අතථ්ය මංතීරු** (පද්ධතිය 2).
- `adaptiveAdmission.virtualLanes === true` → 3 වන කොටසේ fan-out පරීක්ෂණ ද
  සක්රිය වේ. `virtualLanes` නොමැති හෝ `false` වන payload එකකින් අදහස් වන්නේ
  `OMNIROUTE_CHAT_VIRTUAL_LANES` සකසා නොමැති බවයි — byte-මට්ටමේ මංතීරු (පද්ධතිය 1)
  තවමත් සක්රිය නමුත්, එය සක්රිය කරන තෙක් `adaptiveAdmission` යටතේ කිසිවක්
  (සහ fan-out gating කිසිවක්) ක්රියාත්මක නොවේ.

## දෙකම පවතින්නේ ඇයි

byte-මට්ටමේ මංතීරු මතකය අධික ලෙස භාවිත කරන parse/compress මාර්ගය සීමා කරයි;
අනුවර්තී මංතීරු tenant එකකට dispatch පිරිවැය සීමා කරයි. #9654 හි නිර්ණායකය 1
("එක් session එකක burst එකක් නිසා තවත් එකකට 503 නොලැබේ") පද්ධතිය 1 මඟින්
කොන්දේසි විරහිතව ද, opt-in සක්රිය කළ පසු පද්ධතිය 2 මඟින් ද බලාත්මක කෙරේ.

## 4. එක්-process දිගු `/v1/responses` (සෞඛ්ය සම්පන්න-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) මඟින්
`tryAcquireHealthyHeadroom` එක් කරන ලද්දේ heap එක
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` ට වඩා පහළින් ඇති විට ව්යුහාත්මකව
බර දෙවන request එකක් පිළිගැනීමටයි. `admitChatRequest` භාවිත කරන BYTE
මාර්ගය (`OMNIROUTE_CHAT_LARGE_BODY_BYTES` ට සමාන හෝ වැඩි bodies,
පෙරනිමිය 256 KiB, `POST /v1/responses` ද ඇතුළුව) **එම** විකල්ප මාර්ගයම භාවිත කරයි.

සමගාමී දිගු SSE `/v1/responses` දෙකකට වඩා වැඩි සංඛ්යාවක් සඳහා සහාය දක්වන
**එක්-process** ක්රමවේදය මෙයයි: heap එක සහ process-පුරා inflight-byte අයවැය
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ඉඩ දෙන ප්රමාණයට පමණක් primary +
healthy-headroom ඉහළ නංවන්න. දිගු SSE clients දස ගණනක් (40–50) යනු එම
මතක-අයවැය පිළිබඳ ප්රශ්නයක් මිස, නිෂ්පාදනයේ දැඩි “උපරිමය 2” සීමාවක් නොවේ.
පීඩනයට ලක් වූ heap එකක් තවමත් නැවත උත්සාහ කළ හැකි `503` සමඟ requests ඉවත්
කරන බැවින් #7849 නැවත ඇති නොවේ.

**heap ගණන වැඩි කිරීමට**, ස්වාධීන `DATA_DIR` N ක් ධාවනය කරන්න (#11024).
එක් SQLite ගොනුවක් මත කිසිවිටෙකත් `replicas > 1` භාවිත නොකරන්න (#10350).
මෙම කොටස DATA_DIR scale-out ක්රමවේදය නැවත විවෘත කිරීමක් නොවේ.
