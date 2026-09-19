# Admission lanes (#9654) — two lane systems, what gates each, where each reports (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇧🇦 [bs](../../../bs/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute-ൽ വ്യത്യസ്ത വ്യാപ്തികളുള്ള **രണ്ട്** പ്രോസസ്-ലോക്കൽ ലെയിൻ സിസ്റ്റങ്ങളുണ്ട്. അവ
പരസ്പരപൂരകമാണ്; ഓപ്പറേറ്റർമാർ തങ്ങൾ ഏതാണ് പരിശോധിക്കുന്നതെന്ന് അറിഞ്ഞിരിക്കണം.

## 1. ബൈറ്റ്-ലെവൽ പ്രോസസ്-വൈഡ് അഡ്മിഷൻ (`chatBodyAdmission.ts`)

- **വ്യാപ്തി:** `POST /v1/chat/completions`, `/v1/messages`, `/v1/responses`,
  എന്നിവയ്ക്കും മറ്റ് ചാറ്റ്-രൂപത്തിലുള്ള റൂട്ടുകൾക്കുമുള്ള ബഫർ ചെയ്ത ബോഡി/ഹീപ്പ് പാത.
  വലിയ കോഡിംഗ്-ഏജന്റ് ബോഡികൾ മൂലമുള്ള ഹീപ്പ് ആംപ്ലിഫിക്കേഷനിൽ നിന്ന് സംരക്ഷിക്കുന്നു
  (#4380).
- **ഓരോ കീയ്ക്കും പ്രത്യേകം ലെയിനുകളല്ല, ഒരൊറ്റ പ്രോസസ്-ഗ്ലോബൽ കൺട്രോളർ
  (#10110).** എല്ലാ API കീകളും (ഹാഷ് ചെയ്തവ) അല്ലെങ്കിൽ `anonymous` സെഷനും
  **ഒരേ** പങ്കിട്ട ബജറ്റിനെതിരെയാണ് അഡ്മിഷൻ നടത്തുന്നത് — ഹാഷ് ചെയ്ത സെഷൻ ഐഡി
  ഫെയർനെസ് ഷെഡ്യൂളിംഗ് കീ ആയി മാത്രം ഉപയോഗിക്കുന്നു (കാത്തിരിക്കുന്നവർക്കിടയിലെ
  റൗണ്ട്-റോബിൻ ഡിസ്പാച്ച്); ഒരിക്കലും കപ്പാസിറ്റി ഷാർഡായി ഉപയോഗിക്കുന്നില്ല. ഈ
  ഡോക്യുമെന്റിന്റെ മുൻ പതിപ്പ് സ്വതന്ത്ര കപ്പാസിറ്റിയുള്ള ഓരോ കീയ്ക്കുമുള്ള ലെയിനുകൾ
  വിവരിച്ചിരുന്നു; ആ മോഡൽ പ്രാമാണീകരിക്കാത്ത വ്യാജ ക്രെഡൻഷ്യലുകൾ ഉപയോഗിച്ച്
  പ്രോസസ്-വൈഡ് പരിധി ഗുണിക്കാൻ അനുവദിച്ചതിനാൽ #10110-ൽ അത് നീക്കം ചെയ്തു.
- **ഗേറ്റ് (#503-fanout): സ്ഥിരമായ റിക്വസ്റ്റ് എണ്ണമല്ല, സ്വയമേവ നിർണ്ണയിക്കുന്ന
  ഇൻജെസ്റ്റ് BYTE ബജറ്റ്.** ലെഗസി `CHAT_MAX_HEAVY_IN_FLIGHT` റിക്വസ്റ്റ്-കൗണ്ട്
  പരിധി (ഈ പരിഹാരത്തിനു മുമ്പുള്ള ഡിഫോൾട്ട് `1`) കോഡിംഗ്-ഏജന്റ് ഫാൻ-ഔട്ടിനെ
  (ഒന്നിലധികം സബ്ഏജന്റുകൾ/CLI-കൾ, പതിവായി > 256 KB വലുപ്പമുള്ള ബോഡികൾ)
  ഫലപ്രദമായ ~1 കൺകറൻസിയിലേക്ക് ചുരുക്കിയിരുന്നു; അതിനാൽ പൂർണ്ണമായും സാധാരണ
  ലോഡിലും 503 സംഭവിച്ചിരുന്നു. ഇപ്പോൾ ഒരു ഓപ്പറേറ്റർ
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` വ്യക്തമായി സജ്ജീകരിക്കുമ്പോൾ മാത്രമാണ്
  അത് പരിധി നിർണ്ണയിക്കുന്നത്. ഇത് സജ്ജീകരിക്കാതെ വിട്ടാൽ, അഡ്മിഷനെ പകരം
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ആണ് നിയന്ത്രിക്കുന്നത് — പ്രോസസിന്റെ
  യഥാർത്ഥ മെമ്മറി പരിധിയിൽ നിന്ന് സ്വയമേവ നിർണ്ണയിക്കുന്ന ഒരു ബജറ്റ്
  (`src/shared/middleware/admissionBudget.ts`): V8 ഹീപ്പ് പരിധിയിലും ഏതെങ്കിലും
  cgroup/container പരിധിയിലും കൂടുതൽ കർശനമായതിന്റെ 25%, 8x താൽക്കാലിക
  ആംപ്ലിഫിക്കേഷൻ ഘടകം കൊണ്ട് ഹരിച്ച്, 8 MiB-നും 2 GiB-നും ഇടയിൽ പരിമിതപ്പെടുത്തിയത്.
  വ്യക്തമായ ഓവർറൈഡുകളും ഇതേ പരിധികൾ ഉപയോഗിക്കുന്നു. env ട്യൂണിംഗ് ഒന്നുമില്ലാതെ
  ഇത് 512 MB കണ്ടെയ്നർ മുതൽ 32 GB ഡെസ്ക്ടോപ്പ് വരെ സ്വയം സ്കെയിൽ ചെയ്യുന്നു.
  ഫലപ്രദമായ ബജറ്റിനുള്ളിൽ ഉൾക്കൊള്ളാൻ കഴിയാത്ത ഒരു ബോഡി ഉടൻതന്നെ
  `413 body_exceeds_budget` നൽകി പരാജയപ്പെടും; വ്യക്തിഗതമായി കൈകാര്യം ചെയ്യാവുന്ന
  ബോഡികൾ തമ്മിലുള്ള മത്സരാവസ്ഥ മാത്രമാണ് പരിധിയുള്ള ഫെയർനെസ് ക്യൂവിൽ പ്രവേശിക്കുന്നത്.
  സജീവമായ ഒരു മൾട്ടി-സിഗ്നൽ റിസോഴ്സ്-പ്രഷർ ട്രാക്കർ (V8 ഹീപ്പ് അനുപാതം,
  cgroup, PSI, OOM ഇവന്റുകൾ — `open-sse/utils/resourcePressurePolicy.ts`)
  `high` പ്രഷറിൽ പരിധിയുള്ള കാത്തിരിപ്പ് ചുരുക്കുകയും, ഏതെങ്കിലും ബൈറ്റുകൾ
  ഇൻജെസ്റ്റ് ചെയ്യുന്നതിനു മുമ്പുതന്നെ `critical` പ്രഷറിൽ
  `503 resource_pressure` നൽകി ഉടൻ ലോഡ് ഒഴിവാക്കുകയും ചെയ്യുന്നു.
- **ട്യൂണിംഗ്:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — സ്വയമേവ നിർണ്ണയിക്കുന്ന ബൈറ്റ് ബജറ്റിനുള്ള ഓവർറൈഡ്
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — ലെഗസി റിക്വസ്റ്റ്-കൗണ്ട് പരിധി, ഓപ്റ്റ്-ഇൻ മാത്രം
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503-ന് മുമ്പുള്ള ക്യൂ കാത്തിരിപ്പ് (ഡിഫോൾട്ട് 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — ക്യൂ ചെയ്ത ബൈറ്റുകൾക്കുള്ള ഹീപ്പ് വാൽവ് (ഡിഫോൾട്ട് 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 മുതൽ ഒഴിവാക്കപ്പെട്ട
    ഫലമില്ലാത്ത ഓപ്ഷനുകൾ (കോൺഫിഗ് പൊരുത്തത്തിനായി സ്വീകരിക്കുന്നു, അവഗണിക്കുന്നു)
- **റിപ്പോർട്ടുകൾ:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — ഇതിൽ
  #503-fanout കൂട്ടിച്ചേർക്കലുകളായ `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, `countCapEnabled`
  എന്നിവയും ഉൾപ്പെടുന്നു (ഒരു ഡിഫോൾട്ട് ഡിപ്ലോയ്മെന്റിൽ false — ലെഗസി
  കൗണ്ട് പരിധിയല്ല, ബൈറ്റ് ബജറ്റാണ് യഥാർത്ഥത്തിൽ പരിധി നിർണ്ണയിക്കുന്നതെന്ന്
  സ്ഥിരീകരിക്കുന്നു).

## 2. അഡാപ്റ്റീവ് റൺടൈം വെർച്വൽ ലെയിനുകൾ (`open-sse/services/admission`)

- **പരിധി:** പ്രൊവൈഡർ ഡിസ്പാച്ചിനായുള്ള tenant-key അഡ്മിഷൻ — ക്യൂ ചെലവ്, ലേറ്റൻസി-നിർദ്ദേശിത
  പരിധി ക്രമീകരണം, ലെയിൻ ക്യൂയിംഗ്, ലെയിൻ മെട്രിക്കുകൾ.
- **ഗേറ്റ്:** **opt-in.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` അല്ലെങ്കിൽ പ്രവർത്തനരഹിതമാണ്. അതില്ലെങ്കിൽ,
  അഡാപ്റ്റീവ് കൺട്രോളർ പങ്കിട്ട ക്യൂ സ്വഭാവം നിലനിർത്തുന്നു (#9654-ലെ മാനദണ്ഡം 1
  ഒരു ഓപ്പറേറ്റർ ലെയിനുകൾ പ്രവർത്തനക്ഷമമാക്കിയാൽ മാത്രമേ പാലിക്കപ്പെടൂ).
- **ട്യൂണിംഗ്:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + അഡാപ്റ്റീവ് കോൺഫിഗ് (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **റിപ്പോർട്ടുകൾ:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (അവ്യക്തമായ ലെയിൻ ID-കൾ, അസംസ്കൃത
  കീകൾ ഒരിക്കലുമല്ല), കൂടാതെ `virtualLanes` — സ്നാപ്പ്ഷോട്ടിൽ "ലെയിനുകൾ പ്രവർത്തനക്ഷമമാണ്" എന്ന് ആധികാരികമായി സൂചിപ്പിക്കുന്ന ഫ്ലാഗ്.

## 3. ഫാൻ-ഔട്ട് പ്രോബുകൾ — കോംബോ/ഫ്യൂഷനുള്ള ഓരോ ടാർഗറ്റിനുമുള്ള അഡ്മിഷൻ (#9654 Wave 2)

കോംബോ (മുൻഗണന / റൗണ്ട്-റോബിൻ), ഫ്യൂഷൻ എന്നിവ ഒരു പാരന്റ്
റിക്വസ്റ്റിന് കീഴിൽ N മോഡൽ ടാർഗറ്റുകളിലേക്ക് ഫാൻ-ഔട്ട് ചെയ്യുന്നു. #9654 Wave 2 മുതൽ, **ഓരോ ഫാൻ-ഔട്ട് ടാർഗറ്റും ഡിസ്പാച്ചിന് മുമ്പ് ഗേറ്റ് ചെയ്യപ്പെടുന്നു**,
**പാരന്റിന്റെ** tenant ലെയിനിനെതിരെ ഓരോ ടാർഗറ്റിനുമുള്ള പ്രോബ് (`PerTargetAdmissionHook`, `createPerTargetAdmissionHook`
നിർമ്മിക്കുന്നത്) ഉപയോഗിച്ചാണ് ഇത് ചെയ്യുന്നത്.

- **പരിധി:** കോംബോ, ഫ്യൂഷൻ, കെയോസ് എഞ്ചിൻ എന്നിവ ഡിസ്പാച്ച് ചെയ്യുന്ന ഓരോ ഫാൻ-ഔട്ട് ടാർഗറ്റും.
  സിസ്റ്റം 1 (ബൈറ്റ്-ലെവൽ) ബാധിക്കപ്പെടുന്നില്ല — അത് ഒരിക്കലും ഫാൻ-ഔട്ട് ടാർഗറ്റുകൾ പ്രോബ് ചെയ്യുന്നില്ല.
- **ഗേറ്റ്:** **സിസ്റ്റം 2-നൊപ്പം opt-in.** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  സജ്ജീകരിച്ചിട്ടില്ലെങ്കിൽ ഇത് no-op ആണ് — ആ മോഡിൽ പാരന്റ് റിക്വസ്റ്റിന് ഇതിനകം പങ്കിട്ട-ക്യൂ ലീസ് ഉണ്ട്,
  അതിനാൽ പ്രോബ് ചെയ്യുന്നത് ഇരട്ടിയായി എണ്ണുകയും കോംബോ ടാർഗറ്റുകൾ നിരസിക്കുകയും ചെയ്യും.
- **സെമാന്റിക്സ്:**
  - **കർശനമായി നോൺ-ബ്ലോക്കിംഗ് — ക്യൂ ചെയ്യാതെ ഒഴിവാക്കുക.** `maxWaitMs 0`: നിറഞ്ഞ ലെയിൻ
    ടാർഗറ്റ് ഒഴിവാക്കുന്നു; പകരം കോംബോയുടെ ഫാൾബാക്ക് സംവിധാനം (അല്ലെങ്കിൽ ഫ്യൂഷന്റെ സർവൈവർ
    പാനൽ) സേവനം നൽകുന്നു. ഇത് മനഃപൂർവമാണ്: ഫാൻ-ഔട്ട് ടാർഗറ്റ് അനാവശ്യമായി ആവർത്തിക്കുന്ന
    ജോലിയാണ്; അത് ക്യൂ ചെയ്യുന്നത്, തടയാനാണ് ലെയിനുകൾ നിലനിൽക്കുന്നത് എന്ന അതേ കൺജഷനിലേക്ക് കൂടുതൽ ലോഡ്
    കൂട്ടുന്നു. അതിനാൽ `defaultMaxWaitMs` **പാരന്റ് റിക്വസ്റ്റിന് മാത്രം** ബാധകമാണ്;
    ഫാൻ-ഔട്ട് പ്രോബുകൾ ഒരിക്കലും കാത്തിരിക്കില്ല, അവയെ കാത്തിരിപ്പിക്കാൻ മനഃപൂർവം
    **ഒരു നോബും ഇല്ല** (വെയിറ്റ് നോബുകൾ #9654 തടയുന്ന കൂട്ട-502/504 വിഭാഗം
    സൃഷ്ടിച്ചതായി ഇഷ്യൂ ചരിത്രം കാണിക്കുന്നു — ഒഴിവാക്കപ്പെട്ട ഫാൻ-ഔട്ട് ടാർഗറ്റുകൾ
    പ്രതികരണ നിലവാരത്തെ ബാധിക്കുന്നതായി ഒരു ഓപ്പറേറ്റർ റിപ്പോർട്ട് ചെയ്താൽ മാത്രം പുനഃപരിശോധിക്കുക).
  - **അഡ്മിറ്റ് ചെയ്യുമ്പോൾ റിലീസ് ചെയ്യുക.** അഡ്മിറ്റ് ചെയ്ത പ്രോബ് അതിന്റെ ലീസ് ഉടൻ റിലീസ് ചെയ്യുന്നു: അത്
    ശേഷിക്കുള്ള ഒരു ഗേറ്റാണ്, ഹോൾഡ് അല്ല. പാരന്റിന്റെ ലീസ് ഫാൻ-ഔട്ടിനെ ഉൾക്കൊള്ളുന്നു; N
    ലീസുകൾ കൂടി കൈവശം വയ്ക്കുന്നത് പങ്കിട്ട ആക്റ്റീവ് ചെലവ് പെരുപ്പിക്കുകയും മറ്റ് tenant-കളെ നിരസിക്കുകയും ചെയ്യും. ഇത് ഒരു റിസർവേഷൻ അല്ല,
    സാധ്യമാകുന്നത്ര മികച്ച രീതിയിലുള്ളതാണ്: പ്രോബിനും ഡിസ്പാച്ചിനുമിടയിൽ ലെയിൻ വീണ്ടും നിറയാം, അതിനാൽ
    കടുത്ത മത്സരാവസ്ഥയിൽ, ടാർഗറ്റ് ഡിസ്പാച്ച് ചെയ്യപ്പെടുന്ന സമയത്ത് വീണ്ടും നിറഞ്ഞിരിക്കുന്ന
    ലെയിനിലേക്കും ഗേറ്റ് അഡ്മിറ്റ് ചെയ്തേക്കാം.
  - **യഥാർഥ ഫാൻ-ഔട്ട് ബോഡിയിൽനിന്ന് ചെലവ് നിശ്ചയിക്കുന്നു.** പ്രോബ് ടാർഗറ്റിന്റെ
    യഥാർഥ ബോഡിയിൽനിന്ന് ചെലവ് കണക്കാക്കുന്നു — അതിന്റെ `stream` ഫ്ലാഗിൽനിന്ന് ലഭിക്കുന്ന റിക്വസ്റ്റ് ക്ലാസ് ഉൾപ്പെടെ,
    പാരന്റ് പാത്തിലേതുപോലെ തന്നെ — അതിനാൽ ഫ്യൂഷൻ പാനൽ അംഗങ്ങൾക്ക് (`stream: false`)
    അവർ യഥാർഥത്തിൽ ഉപയോഗിക്കുന്ന നോൺ-സ്ട്രീമിംഗ് ക്ലാസിന്റെ നിരക്കാണ് കണക്കാക്കുന്നത്; മുൻഗണന/RR
    ടാർഗറ്റുകൾക്ക് ഉപയോക്താവ് അഭ്യർത്ഥിച്ചതനുസരിച്ചും നിരക്ക് കണക്കാക്കുന്നു.
- **റിപ്പോർട്ടുകൾ:** ആദ്യ ടാർഗറ്റിന് ശേഷമുള്ള ഒരു പ്രോബ് ഒഴിവാക്കൽ കോംബോയുടെ ഓരോ റിക്വസ്റ്റിനുമുള്ള
  `fallbackCount` വർധിപ്പിക്കുന്നു (നിലവിലുള്ള ഫാൾബാക്ക് സെമാന്റിക്സ് പ്രതിഫലിപ്പിക്കുന്നു; കോംബോ
  ലോഗുകളിൽ ദൃശ്യമാകും); എല്ലാ പാനൽ അംഗങ്ങളും ഒഴിവാക്കപ്പെട്ടാൽ ഫ്യൂഷൻ 503 തിരികെ നൽകുന്നു. നിലവിൽ
  സ്നാപ്പ്ഷോട്ടിൽ **ആകെ കണക്കാക്കുന്ന കൗണ്ടർ ഇല്ല** (ഉദാ. `virtualFanoutSkipped`) —
  ലെയിൻ ഗേറ്റ് ഫാൻ-ഔട്ട് ടാർഗറ്റുകൾ എത്ര തവണ ഒഴിവാക്കുന്നുവെന്ന് കണ്ടെത്താനാകുന്നില്ലെന്ന് ഒരു ഓപ്പറേറ്റർ
  റിപ്പോർട്ട് ചെയ്താൽ, അത്തരമൊരു കൗണ്ടർ ചേർക്കാനുള്ള പ്രേരകം അതായിരിക്കും.

## ഡാഷ്ബോർഡിൽ ഏതാണ് കാണിക്കുന്നത്

- `adaptiveAdmission.laneCount` / `laneTenants` → **അഡാപ്റ്റീവ് വെർച്വൽ ലെയ്നുകൾ** (സിസ്റ്റം 2).
- `adaptiveAdmission.virtualLanes === true` → സെക്ഷൻ 3-ലെ ഫാൻ-ഔട്ട് പ്രോബുകളും
  സജീവമാണ്. `virtualLanes` ഇല്ലാത്തതോ `false` ആയതോ ആയ ഒരു പേലോഡ് അർത്ഥമാക്കുന്നത്
  `OMNIROUTE_CHAT_VIRTUAL_LANES` സജ്ജീകരിച്ചിട്ടില്ല എന്നാണ് — ബൈറ്റ്-ലെവൽ ലെയ്നുകൾ (സിസ്റ്റം 1)
  ഇപ്പോഴും സജീവമാണ്, എന്നാൽ ഇത് പ്രവർത്തനക്ഷമമാക്കുന്നതുവരെ `adaptiveAdmission`-ന് കീഴിലുള്ള
  ഒന്നും (ഫാൻ-ഔട്ട് ഗേറ്റിംഗും) പ്രാബല്യത്തിലുണ്ടാകില്ല.

## രണ്ടും നിലനിൽക്കുന്നത് എന്തുകൊണ്ട്

ബൈറ്റ്-ലെവൽ ലെയ്നുകൾ മെമ്മറി കൂടുതലായി ഉപയോഗിക്കുന്ന പാർസ്/കംപ്രസ് പാതയെ പരിമിതപ്പെടുത്തുന്നു; അഡാപ്റ്റീവ് ലെയ്നുകൾ
ഓരോ ടെനന്റിന്റെയും ഡിസ്പാച്ച് ചെലവ് പരിമിതപ്പെടുത്തുന്നു. #9654-ന്റെ മാനദണ്ഡം 1 ("ഒരു സെഷന്റെ ബർസ്റ്റ് മറ്റൊന്നിന് 503
ഉണ്ടാക്കുന്നില്ല") സിസ്റ്റം 1 നിരുപാധികമായും, ഓപ്റ്റ്-ഇൻ പ്രവർത്തനക്ഷമമാക്കിയ ശേഷം സിസ്റ്റം 2-ഉം നടപ്പാക്കുന്നു.

## 4. ഒറ്റ-പ്രോസസിലുള്ള ദീർഘ `/v1/responses` (ആരോഗ്യകരമായ-ഹെഡ്റൂം)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)
`tryAcquireHealthyHeadroom` ചേർത്തു; അതുവഴി ഹീപ്പ്
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-നു താഴെയായിരിക്കുമ്പോൾ ഘടനാപരമായി ഭാരമേറിയ രണ്ടാമത്തെ അഭ്യർത്ഥന അനുവദിക്കുന്നു.
`admitChatRequest` ഉപയോഗിക്കുന്ന BYTE പാതയും (ബോഡികൾ ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
സ്ഥിരസ്ഥിതി 256 KiB, `POST /v1/responses` ഉൾപ്പെടെ) **അതേ** ഇളവ് ഉപയോഗിക്കുന്നു.

ഒരേസമയം രണ്ടിലധികം ദീർഘകാല SSE `/v1/responses`-കൾക്കായി പിന്തുണയ്ക്കുന്ന **ഒറ്റ-പ്രോസസ്**
ക്രമീകരണം ഇതാണ്: ഹീപ്പും പ്രോസസ്-വ്യാപകമായ ഇൻഫ്ലൈറ്റ്-ബൈറ്റ് ബജറ്റും
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) അനുവദിക്കുന്ന പരിധിവരെ മാത്രം പ്രൈമറി +
ആരോഗ്യകരമായ-ഹെഡ്റൂം ഉയർത്തുക. പതിനുകണക്കിന് ദീർഘകാല SSE ക്ലയന്റുകൾ (40–50) എന്നത്
ആ മെമ്മറി-ബജറ്റുമായി ബന്ധപ്പെട്ട ചോദ്യമാണ്; അത് കർശനമായ “പരമാവധി 2” എന്ന ഉൽപ്പന്നപരിധിയല്ല.
സമ്മർദ്ദത്തിലുള്ള ഹീപ്പ് ഇപ്പോഴും വീണ്ടും ശ്രമിക്കാവുന്ന `503` ഉപയോഗിച്ച് അഭ്യർത്ഥനകൾ ഒഴിവാക്കുന്നതിനാൽ
#7849 വീണ്ടും സംഭവിക്കില്ല.

**ഹീപ്പുകളുടെ എണ്ണം വർധിപ്പിക്കാൻ**, N സ്വതന്ത്ര `DATA_DIR`-കൾ പ്രവർത്തിപ്പിക്കുക (#11024). ഒരു SQLite ഫയലിൽ
ഒരിക്കലും `replicas > 1` ഉപയോഗിക്കരുത് (#10350). ഈ വിഭാഗം
DATA_DIR സ്കെയിൽ-ഔട്ട് ക്രമീകരണം വീണ്ടും തുറക്കുന്നതല്ല.
