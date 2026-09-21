# Guardrails (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **ዋና የእውነት ምንጭ:** `src/lib/guardrails/`
> **መጨረሻ የተዘመነው:** 2026-08-29 — v3.8.51 (የVideo Bridge ትራንስክሪፕት መነሻ በጠሪው የሚገለጽ ነው፣
> እስካሁን በሰርቨሩ አልተረጋገጠም — በ#11661 መሠረት ግልጽ ተደርጓል)

Guardrails በOmniRoute እና በላይኛ ደረጃ አቅራቢዎች መካከል ባለው ወሰን ላይ
ደኅንነትን፣ ፖሊሲን እና የይዘት ለውጦችን ያስፈጽማሉ። እያንዳንዱ guardrail
የጥያቄ payload-ዎችን (`preCall`) እና የላይኛ ደረጃ ምላሾችን (`postCall`)
መመርመር (እንዲሁም እንደአማራጭ ውድቅ ማድረግ፣ መለወጥ ወይም ማብራሪያ መጨመር) ይችላል።

ስርዓቱ **fail-open** ነው፦ guardrail በሚፈጸምበት ጊዜ exception ካስነሳ፣ registryው
ጥያቄውን ከማሳካት ይልቅ ስህተቱን መዝግቦ ወደሚቀጥለው guardrail
ይቀጥላል። ማገድ ግልጽ ውሳኔ (`block: true`) እንጂ በአጋጣሚ የሚከሰት አይደለም።

## አብሮገነብ Guardrails

registryው import ሲደረግ ስድስት guardrailsን በቅድሚያ ተከተል በራስ-ሰር ይጭናል
(`registry.ts` → `registerDefaultGuardrails()` ይመልከቱ)፦

| ቅድሚያ | ስም                  | ደረጃ(ዎች)        | ፋይል                   |
| ---- | ------------------- | -------------- | --------------------- |
| `5`  | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`  | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`  | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10` | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20` | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95` | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

ዝቅተኛ የቅድሚያ ቁጥሮች **መጀመሪያ** ይሰራሉ።

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

ወደ **ምስልን የማይደግፉ ሞዴሎች** የሚያመሩ ምስል የያዙ ጥያቄዎችን ጣልቃ ይገባና
ወይ ሙሉውን ጥያቄ ምስልን መረዳት ወደሚችል ሞዴል እንደገና ያዞራል፣ ወይም
ወደ ላይኛው ደረጃ ጥሪ ከመደረጉ በፊት የምስል ክፍሎቹን በሚዋቀር የምስል ሞዴል
በተፈጠሩ የጽሑፍ መግለጫዎች ይተካል። ይህም ጽሑፍ-ብቻ አቅራቢዎች
multimodal payload-ዎችን ያለችግር እንዲያስተናግዱ ያስችላቸዋል።

ፍሰት፦

1. ዒላማው ሞዴል አስቀድሞ ምስልን የሚደግፍ ከሆነ ዝለል (በግዳጅ-bridge ዝርዝር
   `isVisionBridgeForcedModel` ውስጥ ካልታየ በስተቀር)።
2. የምስል ክፍሎችን በ`extractImageParts(messages)`
   (`visionBridgeHelpers.ts`) አውጣ፤ ይህም በ`open-sse/utils/mediaParts.ts` ውስጥ ላለው
   **ወጥ የሚዲያ ፈላጊ** `detectMediaParts()` ኃላፊነቱን ያስተላልፋል — ይህም
   ከcombo ተኳኋኝነት ማጣሪያው ጋር የሚጋራው ብቸኛ የእውነት ምንጭ ነው።
   ማውጣቱ `replaceImageParts` መልሶ ማስገባት ወደሚችላቸው የከፍተኛ ደረጃ ክፍሎች
   ቅርጾች ብቻ በallowlist የተገደበ ነው (የማውጣት↔የመተካት ውል)፦ OpenAI
   `image_url`፣ Anthropic base64 `source.type:"base64"`፣ Anthropic URL
   `source.type:"url"` እና Responses API `input_image`። ውስጥ ለውስጥ የተገኙ
   ክፍሎች እና አመልካች-ብቻ ቅርጾች የcombo ማጣሪያ ግብዓቶች ስለሆኑ ፈጽሞ አይወጡም።
   ምንም ካልተገኘ ዝለል።
3. የruntime ውቅረትን በ`resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`) ፍታ፦ አዲሶቹ `modalityBridge*`
   የቅንብር ቁልፎች ቅድሚያ ያገኛሉ፤ የቆዩት `visionBridge*` ቁልፎች
   **ለአንድ ዙር የምትክ አማራጭ** (የrollback መስኮት) ሆነው ይቀራሉ።
   bridgeው ከተሰናከለ ከማንኛውም የሚዲያ አሰሳ በፊት ዝለል።
4. የሁነታ መራጩ (`modalityBridgeVisionMode`፣ ከታች ያለውን ሰንጠረዥ ይመልከቱ)
   እንደገና ማዞር ወይስ መግለጽ እንደሚደረግ ይወስናል። እንደገና ማዞር `model`
   ብቻ የተቀየረበትን `modifiedPayload`፣ ከmeta `{ rerouted, fromModel, toModel, imagesKept }`
   ጋር ይመልሳል።
5. የመግለጫ መንገድ፦ ምስሎችን በ`maxImages` ይገድባል፣ ተግባርን ያገናዘበ prompt
   ያቀናብራል፣ የመግለጫ cacheን ይመለከታል፣ የምስል ሞዴሉን **በትይዩ**
   (`Promise.allSettled`) ይጠራል፣ እና በምስሎቹ ቦታ `[Image N]: <description>`
   የጽሑፍ ክፍሎችን ያስገባል። ያልተሳካ መግለጫ `null` ያስገኛል፣ እና ዋናው
   የምስል ክፍል **እንዳለ ይቆያል** (#4012) — ነገር ግን በcombo የመግለጫ መንገድ
   ሁሉም መግለጫዎች ሳይሳኩ ሲቀሩ፣ ምስልን እንደማይደግፍ የተረጋገጠ የላይኛ ደረጃ
   አቅራቢ በምትኩ `(unavailable — no vision-capable provider connected)` stub
   ያገኛል (#8430)።
6. `modifiedPayload`ን ከmeta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`) ጋር መልስ።

#### የሁነታ መራጭ (`modalityBridgeVisionMode`)

| ሁነታ        | ነባሪ | ባህሪ                                                                                                                                                                                                      |
| ---------- | --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔   | የቆየው heuristic፣ ሳይነካ (#6640/#7204)፦ combo ያልሆኑ/`auto/` ሞዴሎች፣ ዋናው ሞዴል ጥቅም ላይ ሊውሉ የሚችሉ credentials ካሉት በስተቀር (ያኔ ይገልጻል)፣ ወደ ምርጡ የምስል ሞዴል እንደገና ይዞራሉ፤ combo ዒላማዎች ሁልጊዜ ይገለጻሉ።                               |
| `describe` |     | ሁልጊዜ ግለጽ — የእንደገና ማዞር ክፍሉ ሙሉ በሙሉ ይዘለላል፤ ተጠቃሚው የመረጠው ሞዴል ሁልጊዜ ይመልሳል።                                                                                                                                      |
| `reroute`  |     | እንደገና ማዞርን አስገድድ፦ የcredentials ያሉትን ሞዴል የማቆየት ጠባቂ ይታለፋል። የእንደገና ማዞሪያ **ዒላማ** credential ጠባቂ ግን አሁንም ተግባራዊ ነው — ጥቅም ላይ ሊውል የሚችል የምስል ዒላማ ከሌለ፣ ጥሬ ምስሎች ጽሑፍ-ብቻ backend እንዳይደርሱ ጥያቄው ወደ መግለጫ ይሸጋገራል (#8430)። |

የግዳጅ ሁነታዎች `auto` heuristic ከመስራቱ **በፊት** አጭር መንገድ ይወስዳሉ፤
የ`auto` ባህሪ ከPR-1 በፊት ከነበረው guardrail ጋር በbyte ደረጃ ተመሳሳይ ነው።

#### ተግባርን ያገናዘበ የመግለጫ prompt (`modalityBridgeVisionTaskAware`)

ነባሪው **true** ነው። `composeVisionPrompt()` (`visionBridgeHelpers.ts`)
የ**መጨረሻውን የተጠቃሚ መልዕክት** ጽሑፍ (እስከ 500 ቁምፊዎች የተቆረጠ)
ወደ መሠረታዊው የመግለጫ prompt ይጨምራል፤ ይህም መግለጫውን ተጠቃሚው በእውነት
ወደጠየቀው ነገር ይመራዋል (codex-vision-proxy ንድፍ)፣ እንዲሁም የምስል ሞዴሉ
የሚታይ ጽሑፍን እንዲገለብጥ ይጠይቃል። flagው ሲጠፋ — ወይም የተጠቃሚ ጽሑፍ
ከሌለ — መሠረታዊው prompt ሳይለወጥ ጥቅም ላይ ይውላል።

የ describe self-loop የራሱ OpenAI-ተኳሃኝ ጥያቄ (`callVisionModelSingle()`
በ `visionBridgeHelpers.ts` ውስጥ) ሁልጊዜ `image_url.detail: "high"` ይጠይቃል —
ያለምንም ቅድመ ሁኔታ፣ ለእያንዳንዱ ጠሪ/አቅራቢ፣ በማንኛውም የደንበኛ ምልክት ሳይገደብ።
ዝቅተኛ-ዝርዝር ናሙና መውሰድ ይህ መጠየቂያ በትክክል ለሚጠይቀው የጽሑፍ-ወደ-ጽሑፍ
ማስተላለፍ ተግባር የ OCR ትክክለኛነትን ያሳንሳል፤ ስለዚህ ዋናው የገቢ ጥያቄ
ምንም ዓይነት የዝርዝር ደረጃ ቢጠቀምም፣ የ describe ጥሪው ራሱ ሁልጊዜ ከፍተኛ
ዝርዝርን ይጠይቃል። ይህ የሚነካው የውስጣዊውን describe ጥያቄ body ብቻ ነው፤
OmniRoute የጠሪውን የራሱን `image_url.detail` በዋናው ጥያቄ ላይ እንዴት እንደሚያስተላልፍ
አይለውጥም — ያ ነባሪ በተናጠል የሚተገበር ሲሆን፣ በ `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`) ውስጥ ለተገኙ OpenCode ደንበኞች
ብቻ ነው። የ describe self-loop የ Anthropic wire-format ቅርንጫፍ `detail` መስክ
የለውም፣ እና በሁለቱም ነባሪዎች አይነካም።

#### የ Describe ውጤት ገደብ (`modalityBridgeVisionMaxChars`)

| ቁልፍ                            | ነባሪ | ክልል               |
| ------------------------------ | --- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0` | `0` ወይም 100–50000 |

`0` (ነባሪ) ማለት **ገደብ የለም** ማለት ነው — በ `callVisionModel()` የተመለሰው
መግለጫ ሳይለወጥ ይተላለፋል፣ ይህም ያለውን ባህሪ ይጠብቃል። በ100–50000 ክልል
ውስጥ ያለ ማንኛውም ዋጋ መግለጫው እንደ `[Image N]: <description>`
እንደገና ከመጨመሩ በፊት በ `…` ቅጥያ ይቆርጠዋል
(`VisionBridgeGuardrail.preCall()` በ `src/lib/guardrails/visionBridge.ts` ውስጥ)።
የታችኛው ሞዴል ሙሉውን የጽሑፍ ቅጂ ለሚፈልግባቸው ብዙ ዝርዝር ያላቸው የ OCR
ተግባራት ይህን ያሳድጉ፤ ብዙ ጽሑፍ በሚያመነጩ የራዕይ ሞዴሎች ላይ የ token
አጠቃቀምን ለመገደብ ደግሞ ይቀንሱት። የ dashboard መስኩ በ Vision ትር Advanced
ፓነል ላይ ይገኛል (`modality-bridge-max-chars` በ `ModalityBridgeVisionTab.tsx` ውስጥ)፣
እና ግልጽ `0` ሳይነካ ከ1 እስከ 99 ያለን ማንኛውንም ዋጋ ወደ 100 ዝቅተኛ ወሰን
ያሳድጋል — `0` በራሱ ትክክለኛ የ Zod ዋጋ ነው
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`)፣ “ያልተዋቀረ”
ነባሪ ብቻ አይደለም።

#### የ Describe መሸጎጫ (`modalityBridge/bridgeCache.ts`)

በሂደቱ ውስጥ በሙሉ የሚጋራ፣ ለ describe ውጤቶች የሚያገለግል በማህደረ ትውስታ ውስጥ
ያለ LRU + TTL መሸጎጫ።
ቁልፍ = `sha256(imageRef + composedPrompt + configuredBridgeModel)`፣ ከርዝመት-ቅድመ ቅጥያ
framing ጋር (የመስክ-ወሰን ግጭቶች የሉም)። የሞዴሉ ክፍል **የተዋቀረው**
bridge ሞዴል ነው፣ በእውነት መልስ የሰጠው ሞዴል አይደለም —
`callVisionModel` በውስጥ ወደ ተለዋጭ ሊመለስ ይችላል፣ እና ለእያንዳንዱ ሙከራ ቁልፍ
መፍጠር መሸጎጫውን ይበታትነዋል። ያልተሳኩ describe ውጤቶች ፈጽሞ
አይሸጎጡም። ቅንብሮች፦

| ቁልፍ                             | ነባሪ    | ክልል     |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### የርቀት ምስል መደበኛ ማድረግ (self-loop describe/base64 fetch)

bridge አንድን **የርቀት** ምስል በራሱ ሲያመጣ — የ Anthropic describe
self-call እና የ claude-wire-format base64 ልወጣ
(`ensureBase64ImagesForClaudeWire`)፣ ሁለቱም በ `visionBridgeHelpers.ts` ውስጥ
ባለው `fetchRemoteImageAsDataUri()` በኩል — የተገኘው data URI በራዕይ-ሞዴል
ጥያቄ ውስጥ ከመካተቱ በፊት በ `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) በኩል ያልፋል። ከመጠን በላይ ትልቅ ምስሎች
ወደ **2048px ረጅም ጠርዝ** ይቀነሳሉ (OpenAI/Anthropic አስቀድመው በserver-side
ከሚተገብሩት የመጠን መቀነሻ ገደብ ጋር የሚመሳሰል)፤ ይህም የራዕይ ሞዴሉ
የሚያየውን ሳይለውጥ የመስቀያ bytes/latency ይቀንሳል። መጠን መቀየር `sharp`ን
ይጠቀማል፣ እሱም በ dynamic import ይጫናል፦ native binaryው መጫን በማይችልበት
መድረክ ላይ `normalizeDataUri()` **ፈጽሞ exception አይጥልም** — የመጀመሪያዎቹን
bytes ሳይለውጥ ወደ ማስተላለፍ ይመለሳል፣ ስለዚህ የ describe/base64-conversion
መንገድ ሁልጊዜ መስራቱን ይቀጥላል። ምስል ያልሆኑ bytes (decode ሊደረግ የሚችል
ምስል ያልመለሰ fetch) እንዲሁ ሳይለወጡ ይተላለፋሉ። ይህ መደበኛ ማድረግ bridge
ለራሱ self-call በሚያመጣቸው ምስሎች ብቻ የተገደበ ነው — በጠሪው ጥሬ
passthrough payload ላይ ፈጽሞ አይተገበርም፣ ይህም opt-in ሲደረግ ብቻ ከሚፈቀደው
የለውጥ መርህ (Hard Rule #20) ጋር ይጣጣማል።

#### የቅንብሮች schema + migration

አዲሶቹ `modalityBridge*` ቁልፎች በ `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`) ውስጥ በ Zod ይረጋገጣሉ፦
`modalityBridgeVisionEnabled`፣ `modalityBridgeVisionMode`፣
`modalityBridgeVisionModel`፣ `modalityBridgeVisionTaskAware`፣
`modalityBridgeVisionPrompt`፣ `modalityBridgeVisionTimeout`፣
`modalityBridgeVisionMaxImages`፣ `modalityBridgeVisionMaxChars`፣ የ
`modalityBridgeCache*` ሶስቱ፣ እና በ Audio Bridge ጥቅም ላይ የሚውለው
የ `modalityBridgeAudio*` ቡድን። Migration
`141_modality_bridge_settings.sql` ያሉትን የቆዩ `visionBridge*` ዋጋዎች
ወደ ተዛማጅ አዲስ ቁልፎች ይቀዳል (idempotent ነው፣ በኦፕሬተር የተዋቀረን
`modalityBridge*` ዋጋ ፈጽሞ አይተካም)፤ የቆዩት ቁልፎች ለአንድ የልቀት ዑደት
እንደ read fallback ተቀባይነታቸውን ይቀጥላሉ።

#### የግልጽነት header + ስታቲስቲክስ

በ describe የተለወጡ ምላሾች
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
ይይዛሉ (በ `modalityBridge/bridgeStats.ts` ውስጥ ባለው
`buildModalityBridgeHeader()` የተገነባ፣ በ `src/sse/handlers/chatHelpers.ts`
ውስጥ ባለው `withModalityBridgeHeader()` የታተመ)። እንደገና መንገድ የተሰጣቸው
ጥያቄዎች **ምንም** header አያገኙም — payloadው አልተነካም፣ እና የሞዴል
መቀየሩ አስቀድሞ በምላሹ body የ `model` መስክ ውስጥ ይታያል።

`GET /api/modality-bridge/stats` (የአስተዳደር ማረጋገጫ፣ ከ
`GET /api/settings` ጋር ተመሳሳይ ደረጃ) ለ `vision`፣ `audio` እና `video`
በማህደረ ትውስታ ውስጥ ያሉ በእያንዳንዱ modality የተከፋፈሉ ቆጣሪዎችን
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` ይመልሳል። `averageLatencyMs`
እንደ መከፋፈያው ሁሉንም attempts ሳይሆን `latencySamples`ን ይጠቀማል፤ የጊዜ
መለኪያ የሌለው ክዋኔ የዜሮ-ሚሊሰከንድ ናሙና አይፈጥርም። `bridged` ለተሳኩ
ልወጣዎች ወደኋላ-ተኳሃኝ alias ሆኖ ይቀጥላል፤ ያልተሳኩ ሙከራዎች
አያሳድጉትም።
ቆጣሪዎች በንድፍ መሠረት ሂደቱ እንደገና ሲጀምር ይዘጋጃሉ
(telemetry እንጂ accounting አይደለም)።

#### የ Dashboard ውቅር

የተወሰነው ዳሽቦርድ ገጽ
`/dashboard/settings/modality-bridge` ነው። በURL ሊደረስባቸው የሚችሉት `Vision`፣ `Audio`፣
እና `Video` ትሮች የ`tab` እሴቱን በሚቀይሩበት ጊዜ የጥያቄ መለኪያዎችን ይጠብቃሉ።
የVision ትሩ ማንቃትን፣ ሁነታን፣ የሞዴል ምርጫን (አውቶማቲክ
ነባሪውን ጨምሮ)፣ ተግባርን የሚያገናዝብ መመሪያ አሰጣጥን፣ የላቁ የጊዜ ማብቂያ/ምስል/የመግለጫ-ርዝመት/መሸጎጫ
ገደቦችን፣ የአሂድ ጊዜ
ቆጣሪዎችን፣ እና በጥበቃ የተከለለ የናሙና ጥያቄን ያቀርባል። የAudio ትሩም በቀጥታ ይሠራል፦
ማንቃትን፣ Autoን የያዘ የSTT-ብቻ ሞዴል መራጭን፣ የጊዜ ማብቂያ/ከፍተኛ-ክሊፕ ገደቦችን፣ የኦዲዮ
ቆጣሪዎችን፣ እና የ`input_audio` ናሙና ሙከራን ያቀርባል። የVideo ትሩ ሙሉ በሙሉ ይሠራል፦
የFFmpeg/ffprobe የአሂድ ጊዜ ሁኔታን — ከአራት ግልጽ የUI ሁኔታዎች አንዱን (`unknown` ምርመራው
በመካሄድ ላይ እያለ ወይም ሊጠናቀቅ ካልቻለ፣ `restricted` ምርመራው በደንበኛ-ወገን
በሚዘለልበት loopback ባልሆነ
የዳሽቦርድ አስተናጋጅ ላይ፣ `unavailable` አንዴ ተመርምሮ
አለመኖሩ ከተረጋገጠ፣ ወይም `available` ከFFmpeg/ffprobe ስሪቶች ጋር) — ያሳውቃል፤
የማንቃት/ሞዴል/ፍሬም/ቪዲዮ/የጊዜ ማብቂያ ገደቦችን ያስቀምጣል፣ የሞዴል መራጩን የምስል ችሎታ ላላቸው
ሞዴሎች ያጣራል፣ እና የቪዲዮ ቆጣሪዎችን ያቀርባል።

በAI ቅንብሮች ስር የነበረው የVision Bridge ካርድ ወደ
አዲሱ ገጽ የሚወስድ የተኳኋኝነት አገናኝ ነው፤ ከአሁን በኋላ ሁለተኛ የቅጹን ቅጂ አይዝም። Media Providersም
ያለውን የSpeech-to-Text መሞከሪያ ሳያስወግድ፣ የImage-to-Text እና Speech-to-Text የሥራ ፍሰቶችን ከሚዛመዱት Modality
Bridge ትሮች ጋር ያገናኛል።

**የራስ-ዙር መግቢያ ማለፊያ፦** የdescribe ጥሪው በOmniRoute በራሱ
`/v1` የራስ-ዙር (መደበኛ ያልሆነ የአቅራቢ ሞዴል) በኩል ሲዘዋወር፣ ንዑስ-ጥያቄው
`x-omniroute-admission-bypass: internal` ይልካል፣ እና የተፈታውን
የራስ-ዙር ማረጋገጫ መረጃ — በአካባቢያዊ ሁነታ ያለውን `sk_omniroute` sentinel፣ ወይም
በኦፕሬተሩ የተዋቀረውን `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` የenv ቁልፍ (#1350) — ተጠቅሞ
ማንነቱ ይረጋገጣል፤ በዚህም `REQUIRE_API_KEY=true` ማሰማሪያዎች የdescribe ጥሪውን አሁንም
ማስኬድ ይችላሉ። ማለፊያው የሚከበረው ለእነዚያ ትክክለኛ የማረጋገጫ መረጃዎች ብቻ ስለሆነ፣ ውጫዊ ደንበኞች
መግቢያን ለመዝለል ራስጌውን መጠቀም አይችሉም።

የቆዩ ነባሪዎች በ`src/shared/constants/visionBridgeDefaults.ts` ውስጥ ይገኛሉ፤
አዲሶቹ የሁነታ/ተግባርን-የሚያገናዝብ/መሸጎጫ ነባሪዎች እና የቅንብሮች መፍቻው
በ`src/shared/constants/modalityBridgeDefaults.ts` ውስጥ ይገኛሉ። የጥበቃ መስመሩ
ሙከራዎች ሐሰተኛ የ`getSettings` እና
`callVisionModel` አተገባበሮችን እንዲያስገቡ የ`deps` constructor አማራጭን ያቀርባል።

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

ኦዲዮ የያዙ የውይይት ጥያቄዎች የኦዲዮ ግብዓትን እንደሚቀበል ወደማይታወቅ
ዒላማ ከመድረሳቸው በፊት ይጠልፋቸዋል። የውይይት ጥያቄውን በፍጹም ወደ ሌላ መስመር አያዞርም፦ የኦዲዮ ክፍሎች
አሁን ባለው ከOpenAI ጋር ተኳኋኝ multipart endpoint በኩል ወደ ጽሑፍ ይቀየራሉ፣ እና
የተመረጠው የውይይት ሞዴል በጽሑፍ ቅጂዎቹ ይቀጥላል።

ፍሰት፦

1. `supportsAudio`ን በ`getResolvedModelCapabilities()` በኩል ይፍቱ። ግልጽ
   የprovider-registry metadata ቅድሚያ ይኖረዋል፣ ከዚያ static model metadata፣ በመጨረሻም የተመሳሰለው
   `modalities_input` ይከተላል። `audio`ን ያላካተተ የተገለጸ የግብዓት ዝርዝር `false` ነው፤ ምንም
   የችሎታ ማስረጃ ከሌለ `null` ይሆናል። `false` እና `null` ሁለቱም
   ጥንቃቄ የሚያደርገውን bridge ያነቃሉ፣ `true` ግን ያልፈዋል።
2. የ`modalityBridgeAudio*` ቅንብሮችን ይፍቱ እና በጋራ የ`detectMediaParts()`
   detector በኩል ከእያንዳንዱ መልዕክት ሊቆረጡና ሊገጠሙ የሚችሉ ከፍተኛ-ደረጃ
   የኦዲዮ ክፍሎችን ያውጡ። የሚደገፉ የwire ቅርጾች OpenAI `input_audio`፣ `audio_url`፣ እና
   `source.media_type: "audio/*"` ናቸው። በውስጥ የተካተተ ኦዲዮ ለማዘዋወር ይለያል፣ ነገር ግን
   በsplice path አይወገድም። ሥራው በ`modalityBridgeAudioMaxClips` ይገደባል፤
   በኋላ ያሉ ክፍሎች ሳይነኩ ይቀራሉ።
3. የተዋቀረ `provider/model`ን ይጠቀሙ፣ ወይም `selectAudioBridgeModel()` በ
   `AUDIO_TRANSCRIPTION_PROVIDERS` ውስጥ በተረጋጋ የcatalog ቅደም ተከተል እንዲያልፍ እና ጥቅም ላይ ሊውል የሚችል
   ንቁ የአቅራቢ ማረጋገጫ መረጃ ያለውን የመጀመሪያ ሞዴል እንዲመርጥ ያድርጉ።
4. `callAudioTranscription()` base64/data-URI ኦዲዮን ወደ multipart
   `file` ይቀይራል፣ ወይም የርቀት `audio_url`ን በpublic-only outbound
   guard፣ DNS pinning፣ እና የ25 MB ገደብ አማካኝነት ያወርዳል። ከዚያ ፋይሉን እና የተመረጠውን
   ሞዴል በ`resolveSelfLoopBearer()` የማንነት ማረጋገጫ ወደሚደረግበት
   የአካባቢው `/v1/audio/transcriptions` የራስ-ዙር POST ያደርጋል። አሁን ያለው የtranscription route መደበኛ
   የማረጋገጫ መረጃ ፍለጋን፣ የcooldown/rate-limit አያያዝን፣ እና የአቅራቢ ማሰራጨትን ያከናውናል።
5. የተሳኩ ጥሪዎች ክፍሎቻቸውን በ`[Audio N]: <transcript>` ይተካሉ። ጥሪዎቹ
   በ`Promise.allSettled` ይካሄዳሉ፦ የአንድ ጥሪ ውድቀት ያንን የመጀመሪያውን
   የኦዲዮ ክፍል ይጠብቃል (#4012 ውል)። ሁሉም ጥሪዎች ካልተሳኩ እና ዒላማው
   `supportsAudio === false` መሆኑ ከተረጋገጠ፣ ክፍሎቹ
   `[Audio N]: (unavailable — no STT provider connected)` ይሆናሉ (#8430 ውል)።
   ለማይታወቅ ዒላማ (`null`)፣ ሁሉም ያልተሳካበት ውጤት ሳይነካ ይቀራል። የተረጋገጠ
   ጽሑፍ-ብቻ የሚቀበል ዒላማ ጥቅም ላይ ሊውል የሚችል የSTT ማረጋገጫ መረጃ ከሌለው፣ የኔትወርክ ጥሪ ሳያደርግ ተመሳሳዩን ግልጽ
   stub ይቀበላል።

የተሳኩ የጽሑፍ ቅጂዎች በprocess-wide Modality Bridge LRU/TTL cache ውስጥ ይቀመጣሉ።
ቁልፉ የኦዲዮ ማጣቀሻውን፣ የተረጋጋውን `audio-transcription` operation
label፣ እና የተመረጠውን STT ሞዴል ያጣምራል፤ ውድቀቶች በፍጹም cache አይደረጉም። የኦዲዮ ሙከራዎች
የጋራ `bridged`፣ `cacheHits`፣ `failures`፣ እና `lastUsedAt` ቆጣሪዎችን ያዘምናሉ።
የተለወጡ ምላሾች
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>` ይይዛሉ፤ ያልተነኩ
ጥያቄዎች የAudio Bridge ክፍል አይቀበሉም።

የአሂድ ጊዜ ቅንብሮች በDB የሚደገፉ እና በZod የተረጋገጡ ናቸው፦

| ቁልፍ                           | ነባሪ     | ክልል             |
| ----------------------------- | ------- | --------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —               |
| `modalityBridgeAudioModel`    | `""`    | Auto ወይም STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10            |

የጋራ cache አሁንም በ`modalityBridgeCacheEnabled`፣
`modalityBridgeCacheTtlMinutes`፣ እና `modalityBridgeCacheMaxEntries` ይቆጣጠራል።

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

የታወቀ ቤተኛ የቪዲዮ ድጋፍ የሌለው ዒላማ ከመጠራቱ በፊት በChat Completions `messages` እና Responses
API `input` ውስጥ ያሉ ከፍተኛ-ደረጃ የቪዲዮ ክፍሎችን ይይዛል።
የሚደገፉ ቅርጾች `input_video`፣ `video_url`፣ `video_source`፣ HTTPS URLs፣
እና `data:video/*;base64,...` data URIs ናቸው። በጽሑፍ ውስጥ ያሉ ተራ የፋይል ስሞች
እንደ ቪዲዮ አይቆጠሩም።

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) የጥያቄውን ሙሉ አሰሳ፣
የችሎታ/ፖሊሲ ማረጋገጫ፣ የእያንዳንዱ ጥያቄ ውህደት እና የምላሽ ውሂብ ይቆጣጠራል።
የእያንዳንዱ ቪዲዮ ሥራ — ማግኘት፣ የሙሉ ውጤት መሸጎጫ፣ የፍሬም
ቅደም ተከተልን መግለጽ (ይህም ጠሪው የገለጸውን የድምፅ ትራንስክሪፕት ያዋህዳል)፣ እና የእያንዳንዱ ሙከራ
ልኬቶች/ማቋረጥ/ማጽዳት — በ
`videoBridgePipeline.ts` ውስጥ ካለው `processVideoPart` ጀርባ ተደብቋል፤ ይህም በ`preCall` ዑደት ውስጥ ለእያንዳንዱ የቪዲዮ ክፍል አንድ ጊዜ ይጠራል።
ያ ሞጁል ግልጽ የፖርት ወሰኖቹንም `VideoMediaBrokerPort`
(ባይቶችን ማግኘት እና ናሙና የተወሰዱ ፍሬሞችን ማውጣት)፣ `VideoAudioTranscriptionPort`
(ጠሪው የገለጸውን የድምፅ ትራንስክሪፕት ከናሙና የፍሬም መግለጫዎች ጋር ማዋሃድ)፣ እና
`VideoDrilldownPort` (የፍሬም ዝርዝር-ማስፋፊያ ዘላቂነት ወሰን፤ እስካሁን ከ`processVideoPart` ጋር አልተገናኘም —
በአሁኑ ጊዜ የዝርዝር-ማስፋፊያ ግቤቶችን የሚጽፈው የተለየው `/api/modality-bridge/video/drilldown`
route ብቻ ነው) ይገልጻል።

ይፋዊው `/v1` የጥያቄ መንገድ subprocess ፈጽሞ አያስመጣም ወይም አይጠራም። የርቀት
ቪዲዮዎች በ50 MiB ገደብ ውስጥ ይወርዳሉ፤ inline base64 ቪዲዮዎች የሞዴል/messages/framing ኤንቨሎፕ
በ50 MiB ይፋዊ የJSON ጥያቄ መቀበያ ገደብ ውስጥ እንዲቆይ፣ ለእያንዳንዱ ቪዲዮ ጥንቃቄ የተሞላበት 36 MiB ዲኮድ የተደረገ ገደብ አላቸው። Inline
ርዝመት እና የዲኮድ መጠን ግምቶች ማህደረ ትውስታ ከመመደቡ በፊት ይፈተሻሉ። በመነሻው የርቀት URL እና በእያንዳንዱ redirect ላይ HTTPS
ያስፈልጋል፤ ይህም DNS pinning ያለውን ነባር
ይፋዊ-ብቻ የወጪ ግንኙነት ጥበቃ ይጠቀማል። ከዚያ ባይቶቹ ትክክለኛውን ውስጣዊ
`POST /api/modality-bridge/video/extract` broker ወሰን ያቋርጣሉ። ያ route
ሁለቱንም `LOCAL_ONLY` እና `SPAWN_CAPABLE` ይዟል፣ በእያንዳንዱ process የተረጋገጠ
የታመነ-loopback ጥያቄን ብቻ ይቀበላል፣ እና URL፣ filesystem path፣ executable
ወይም argument list ፈጽሞ አይቀበልም። የAPI body-size pipeline እና የhandler ተከታታይ body
reader እያንዳንዳቸው ለbroker input የ50 MiB ገደብን በተናጠል ያስፈጽማሉ። ገደብ ያለው queue በአንድ ጊዜ
አንድ extraction ያስኬዳል፣ አራት በመጠባበቅ ላይ ያሉ jobs ይፈቅዳል፣ እና በመጠባበቅ ላይ ያለ input በ
100 MiB ይገድባል።

በbroker ውስጥ `ffprobe` የግል local file ያነባል፤ ቋሚው የformat
allowlist የplaylist እና manifest formatsን አያካትትም። ለተፈቀዱ MOV-family
containers፣ ውጫዊ MOV data references በነባሪነት እንደተሰናከሉ ይቆያሉ፣ እና ቋሚው
command እነሱን ለማንቃት አይመርጥም። `ffprobe` እና `ffmpeg` ሁለቱም
`file`-ብቻ protocol whitelist፣ አንድ thread፣ ቋሚ argument arrays፣ shell አልባ አሠራር፣
እና ከ`PATH` የሚፈቱ executablesን ይጠቀማሉ። እንደ cover የተያያዙ የምስል streams
ሊጫወቱ የሚችሉ candidates አይደሉም። ሊጫወቱ የሚችሉ ሁሉም streams ገደቦቹን ማሟላት አለባቸው፣ እና
ከወሳኙ ዝቅተኛ-index fallback በፊት በግልጽ የተወሰነ default stream ይመረጣል።
ቪዲዮዎች በ600 ሰከንዶች፣ በእያንዳንዱ ልኬት 8,192 ፒክሰሎች፣ እና
33,554,432 የምንጭ ፒክሰሎች ይገደባሉ። FFmpeg 1–16 የመካከለኛ ነጥብ JPEG frames ናሙና ይወስዳል፣
ረጅሙን ጠርዝ ቢበዛ ወደ 1,024 ፒክሰሎች ያሳንሳል፣ አነስተኛ inputsን ግን አያሳድግም፣ እና
URL ፈጽሞ አይቀበልም። Sampling በነባሪነት `uniform` ነው። አማራጭ
`scene_aware` እና ሙከራዊ `segment_aware` ፖሊሲዎች ቀድሞውኑ በተረጋገጠው local stream ላይ አንድ ተጨማሪ
ቋሚ FFmpeg pass ያካሂዳሉ፣ የተገደቡ `showinfo` scene timestampsን ይመርጣሉ፣ እና
detector ሲሳካ፣ timeout ሲከሰት፣ output የተበላሸ ሲሆን ወይም candidate set ባዶ ሲሆን
በወሳኝ ሁኔታ ወደ ተመሳሳዩ uniform midpoints fallback ያደርጋሉ። Segment-aware mode
በተረጋገጡት scene intervals መጠን መሠረት midpoint samplesን በተመጣጣኝ ሁኔታ ይመድባል፤ segment-aware evidence እና fallback ባህሪ
ከዚህ በታች በዝርዝር ተገልጸዋል። ጥብቁ የ16-frame ገደብ
በእያንዳንዱ ፖሊሲ ውስጥ ከምርጫ በኋላ ይተገበራል። scene-aware ጥያቄ የአንድ-frame budget ብቻ ሲኖረው፣
የንቁውን ሙሉ-ቪዲዮ ወይም focus
window uniform midpoint ይጠቀማል እና `policyEffective: uniform` ብሎ ሪፖርት ያደርጋል፤ አንድ የተመረጠ scene frame
ሁለቱንም የጊዜ ጫፎች ማቆየት አይችልም። አንድ ጠሪ እንደ አማራጭ
ውሱን focus window (`start`/`end` ሰከንዶች) ሊያቀርብ ይችላል፤ bounds በmedia
duration ልክ ይደረጋሉ፣ የተገለበጡ ወይም finite ያልሆኑ windows ውድቅ ይደረጋሉ፣ እና ሁሉም sampling
ፖሊሲዎች የሚከናወኑት በnormalized interval ውስጥ ብቻ ነው። የተገኘው
window በsampling metadata እና ባልታመነው description
prefix ውስጥ ይካተታል፣ ስለዚህ downstream models ትኩረት የተደረገበትን excerpt ከሙሉ
timeline መለየት ይችላሉ።

Semantic caption focus የተለየና ግልጽ setting ነው። ነባሪው `full`
analysis mode ነባሩን frame prompt እንዳለ ይጠብቃል፣ እና የጥያቄ ጽሑፍን ወደ
caption model ፈጽሞ አያስተላልፍም። በ`focused` mode ውስጥ፣ bridge ከተመሳሳዩ Chat ወይም Responses
container የቅርብ ጊዜውን ባዶ ያልሆነ፣ በተጠቃሚ የተጻፈ `text`/`input_text` ብቻ ያነባል፣ ወደ NFC መደበኛ ያደርገዋል፣ control characters እና whitespaceን ያጠቃልላል፣
እና በ500 Unicode code points ይገድበዋል። ባዶ ውጤት በትክክል ወደ `full` prompt fallback ያደርጋል። ጥቅም ላይ ሊውል የሚችል hint በተወሰነ
ያልታመነ-user-context block ውስጥ እንደ JSON ይሰራላይዝ ይደረጋል፣ እና ሊታዩ ለሚችሉ ዝርዝሮች ቅድሚያ መስጠት ብቻ ይችላል፤
በmedia ውስጥ የሚታዩ ወይም የሚሰሙ መመሪያዎችን እንዳይከተል የሚከለክለውን የተለየ warning መሻር አይችልም። Textual focus `start`/`end`ን ፈጽሞ አይገምትም ወይም
temporal samplerን አይለውጥም።

#### FU-07 መዋቅራዊ የsegment evidence

`segment_aware` ቀድሞውኑ በተረጋገጠው
local video stream ላይ አንድ የተገደበ የቅድመ-analysis pass ይጠቀማል። ቋሚው filter chain በመጀመሪያ ስፋቱን ቢበዛ ወደ 320 ፒክሰሎች ያሳንሳል፣
የscene ለውጦችን እና የቀዘቀዙ intervalsን ይለያል፣ ከዚያም ለblur፣ average luma፣ እና
spatial/temporal information በሰከንድ 1 frame ናሙና ይወስዳል። passው
በ600 structural samples፣ አንድ FFmpeg/filter thread፣ ተመሳሳዩ
`file`-ብቻ protocol እና container allowlists፣ የ1 MiB process-output ገደብ፣
እና በbroker የጋራ abort/deadline ውስጥ ቢበዛ 30 ሰከንዶች ይገደባል። ከጥያቄው
command፣ filter፣ path ወይም URL ፈጽሞ አይቀበልም።

መዋቅራዊ እሴቶቹ ትርጉማዊ የቪዲዮ ግንዛቤ ሳይሆኑ የወሳኝ ናሙና ምርጫ ማስረጃዎች ናቸው። ርዕሰ ጉዳዮችን፣ ድርጊቶችን፣ መግለጫ ጽሑፎችን፣ ንግግርን ወይም የተጠቃሚ ዓላማን አይገምቱም። የትዕይንት እና የቀዘቀዘ ምስል ወሰኖች ክፍሎችን ይፈጥራሉ፤ የቀዘቀዘ ምስል ሽፋን፣ ብዥታ፣ ብርሃን ተጋላጭነት፣ የቦታ ዝርዝር እና ጊዜያዊ ለውጥ ነባሩ የ1–16 ፍሬም በጀት እንዴት እንደሚመደብ ላይ ብቻ ተጽዕኖ ያሳድራሉ። ሙሉ በሙሉ የቀዘቀዘ ክፍል ቢበዛ አንድ ፍሬም ይመደብለታል፣ ያልቀዘቀዙ ክፍሎች ግን ለቀሪው በጀት ይወዳደራሉ። የወሰኖች ቁጥር ከፍሬሞች ሲበልጥ፣ ፈጣን የመጀመሪያ ቅያሬዎች ረጅም የመጨረሻ ክፍልን እንዳይደብቁ ወጥ የጊዜ መስመር ሽፋን ይጠበቃል። ከቀዘቀዘ ምስል ወሰን የ1 ሰከንድ የትንተና ጥራት ውስጥ ያሉ የትዕይንት ወሰኖች ይዋሃዳሉ።

የጎደሉ ማጣሪያዎች፣ የተበላሸ/ባዶ ማስረጃ፣ የፈላጊ ስህተት ወይም የተገደበው የቅድመ-ትንተና ጊዜ ማብቂያ በትክክል ወደ ወጥ የመካከለኛ ነጥብ ፖሊሲ በመመለስ ክፍት ሆነው ይወድቃሉ። የጠሪ ማቋረጥ ወይም የደላላ የጊዜ ገደብ ግን ክፍት ሆኖ አይወድቅም፤ በሂደት ላይ ያለውን ንዑስ ሂደት ያቋርጣል፣ ቀጣይ የፍሬም ማውጣትን ይከለክላል፣ እና የግል ጊዜያዊ የማውጫ ዛፉ በ`finally` ውስጥ ይወገዳል።

`scripts/perf/video-bridge-fu07-eval.ts` ከድግግሞሽ ማስወገድ በኋላ ለሚገኝ የመግለጫ ጽሑፍ ጥሪ ቁጠባ፣ ለጥቅጥቅ ያለ እንቅስቃሴ በጀት ምደባ፣ ለብዥታ/ብርሃን ተጋላጭነት/SI-TI ማስረጃ፣ ረጅም የመጨረሻ ክፍል ላላቸው ፈጣን ቅያሬዎች እና ለቀስ በቀስ ከመደብዘዝ ለሚመጡ የሐሰት አዎንታዊ ውጤቶች ወሳኝ እውነተኛ የFFmpeg ሙከራ ውሂቦችን ያመነጫል። የቅድመ-ትንተና አጠቃላይ የጊዜ ቆይታን እና፣ `/usr/bin/time` በሚገኝበት ጊዜ፣ የልጅ ሂደት CPU እና ከፍተኛውን RSS ይመዘግባል። የጥራት ፍተሻዎቹ መዋቅራዊ የማጣቀሻ ውጤቶች ብቻ ናቸው። ይህ የሙከራ ማዕቀፍ የተፈቀደ የመገናኛ ጫፍ ወይም ቋሚ ገምጋሚ ስለሌለው የእውነተኛ የመግለጫ ጽሑፍ ሞዴል ጥራት `HOLD` ሆኖ ይቆያል። `--caption-cost-per-call-usd` ግልጽ የሆነ አዎንታዊ የአንድ ጥሪ ወጪ ግምት ካላቀረበ በስተቀር የገንዘብ ቁጠባዎችም `HOLD` ሆነው ይቆያሉ፤ ስክሪፕቱ ከሁለቱም አንዱንም ውጤት በሐሰት አይፈጥርም።

እያንዳንዱ ፍሬም በ4 MiB፣ ሁሉም ጥሬ ፍሬሞች በአጠቃላይ በ23 MiB፣ እና ተከታታይ ቅርጽ የተሰጠው የደላላ ምላሽ በ32 MiB ይገደባሉ። የግል ጊዜያዊ ማውጫ በ`finally` ውስጥ ይወገዳል። OmniRoute FFmpegን አብሮ አያቀርብም፣ እና ብጁ የማስኬጃ ፋይል ዱካን አይቀበልም። መግለጫ ጽሑፍ ከማመንጨቱ በፊት፣ ድልድዩ ጥንቃቄ የተሞላበት የምስል ድግግሞሽ ማስወገጃ ሂደት ይተገብራል፤ እያንዳንዱ JPEG ወደ 16×16 ግራጫ-ደረጃ መያዣ ይቀነሳል እና ከመጨረሻው ከተያዘው ፍሬም ጋር ብቻ ይነጻጸራል። ከአንድ ፍሬም በላይ ለተጠየቀ የመግለጫ ጽሑፍ በጀት፣ የማውጣት ሂደቱ ከዚያ በጀት እስከ ሁለት እጥፍ የሚደርስ እና በፍጹም ከ16 ፍሬሞች የማይበልጥ የተገደበ የእጩዎች ስብስብ ያቀርባል። የተጠየቀው ከፍተኛ ገደብ ድግግሞሽ ከተወገደ በኋላ ብቻ ይተገበራል፤ በጀቱ ቢያንስ ሁለት ሲሆን በመጨረሻው የማቅጠን ሂደት የመጀመሪያው እና የመጨረሻው የተመረጡ እጩዎች ይጠበቃሉ። ስሪት የተሰጠው `grayscale-16x16-mean-cells-v2` ፖሊሲ ከአማካይ የሉማ ልዩነት እና የተደበነ ልዩነታቸው ቢያንስ 0.05 የሆነ የድንክዬ ምስል ህዋሶች ጥምርታ መካከል ትልቁን ይጠቀማል። የድግግሞሽ መለያ ገደቡ ቋሚው 0.04 ሲሆን፣ ይህም እንደ የአሂድ ጊዜ ቅንብር እንዲቀርብ ሳይሆን ለመተንበይ ቀላል እንዲሆን የተመረጠ ነው። ይህ ሁለተኛው ከፍተኛ-ንፅፅር ምልክት፣ በአማካይ ብቻ የሚደረግ ንፅፅር ሊደብቃቸው የሚችላቸውን አነስተኛ እንቅስቃሴ እና የሚታይ ጽሑፍ ለውጦች ይጠብቃል። የአነጻጻሪ ወይም የዲኮደር ስህተቶች ክፍት ሆነው ይወድቃሉ እና ሽፋኑን ይጠብቃሉ። የውጤት ሜታዳታ የወጡ እጩዎችን፣ በተሳካ ሁኔታ ጥቅም ላይ የዋሉ ፍሬሞችን እና የተጣሉ የምስል ድግግሞሾችን ለይቶ ያሳያል።

በግልጽ ምልክት የተደረገበት የቪዲዮ ክፍል የጊዜ ማህተም ያለው የእውቂያ ሉህ ሊጠይቅ ይችላል። ድልድዩ ቢበዛ ባለ4-ዓምድ፣ ባለ16-ፍሬም JPEG ፍርግርግ ይገነባል። እያንዳንዱ ባለ512-ፒክሰል ህዋስ የምንጩን የጊዜ ማህተም ከፍተኛ-ንፅፅር ባለው የታችኛው ክፍል ላይ ያትማል፤ እነዚሁ የጊዜ ማህተሞች ለቀጣይ ማዛመድ እና ኦዲት በጽሑፋዊ ሜታዳታ ውስጥም ይቆያሉ። ሙሉው JPEG በ32 MiB ተገድቦ ይቆያል። `sharp` ፍርግርጉን ዲኮድ ወይም ማቀናበር ካልቻለ፣ ድልድዩ ወደ ተናጠል JPEG ፍሬሞች ይመለሳል፤ የደንበኛ ማቋረጥ ግን አሁንም በሉህ ስራው ውስጥ ይተላለፋል።

የማስተዋወቂያ ማስረጃ ሆን ተብሎ ከሰው ሠራሽ የቅንብር ጥቃቅን መለኪያ ሙከራ ተለይቷል። `scripts/perf/video-bridge-contact-sheet-eval.ts` ለእውነተኛ OpenAI-ተኳሃኝ የምስል ሞዴሎች ስኪማ-ስሪት ያለው A/B የሙከራ ማዕቀፍ ይገልጻል። በአቅራቢው የተዘገቡ ቶከኖችን፣ ከጫፍ እስከ ጫፍ የጊዜ መዘግየትን (የሉህ ቅንብርን ጨምሮ)፣ የሞዴል ጥሪ ብዛትን እና በማኒፌስት የተገለጸ የእውነታ ጥበቃን ይለካል። ጥሬ የሞዴል ምላሾች በሪፖርቱ ውስጥ አይጻፉም፤ SHA-256 ዲጄስቶች እና የተዛመዱ የእውነታ መታወቂያዎች ብቻ ይቀመጣሉ። `--execute-real` ካልተላለፈ እና `--model`፣ `OMNIROUTE_BASE_URL` እና `OMNIROUTE_API_KEY` ካልተዋቀሩ በስተቀር የሙከራ ማዕቀፉ ምንም የአውታረ መረብ ወይም የሚከፈልበት የሞዴል ጥሪ አያደርግም። ያለዚያ ግልጽ እውነተኛ አሂድ፣ በማሽን የሚነበበው ውሳኔው `HOLD` ሆኖ ይቆያል፤ ሰው ሠራሽ የውሂብ ጭነት/የጥሪ-ብዛት መለኪያዎች ብቻቸውን የማስተዋወቂያ ማስረጃ አይደሉም።

ጠሪዎች ቀድሞውኑ ከጊዜ ጋር የተመሳሰለ ጽሑፍ ካላቸው፣ ለሚደገፍ የቪዲዮ ክፍል አማራጭ የ`transcript.cues` ድርድር ማያያዝ ይችላሉ። እያንዳንዱ ፍንጭ `text`፣ በተመረመረው ቆይታ ውስጥ ያለ ውሱን የ`start`/`end` ክልል እና በነጭ ዝርዝር የጸደቀ `source` (`client`፣ `embedded` ወይም `audio-bridge`) መያዝ አለበት፤ `confidence` በነባሪ `1` ሲሆን በ`0` እና `1` መካከል መቆየት አለበት። ፍጹም ተመሳሳይ የሆኑ ፍንጮች ይዋሃዳሉ። OmniRoute ከዚህ ሜታዳታ የንግግር ወደ ጽሑፍ ለውጥን ፈጽሞ አይጀምርም፤ የተረጋገጡ ፍንጮች ከምንጭ፣ ከእርግጠኝነት እና ከክልል ጋር ወደተገለጸው ውጤት ይገለበጣሉ፣ እና ከፍሬም መግለጫ ጽሑፎች ጎን እንደማይታመኑ ምልከታዎች ይቀርባሉ። ልክ ያልሆነ፣ ከክልል ውጭ የሆነ ወይም ምንጭ ማረጋገጫ የሌለው ጽሑፍ ከመግለጫ ጽሑፍ ፍሰቱ ጋር ከመቀላቀል ይልቅ ውድቅ ይደረጋል። በአሁኑ ጊዜ የ`source` መስኩ በጠሪው የሚታወጅ እንጂ በአገልጋዩ የተረጋገጠ አይደለም፤ OmniRoute እሴቱ ከተፈቀዱት ሦስት ሕብረቁምፊዎች አንዱ መሆኑን ያስገድዳል፣ ነገር ግን `embedded` ወይም `audio-bridge` የሚል መለያ በእርግጥ በአገልጋዩ ባለቤትነት ካለው የማውጣት ሂደት መምጣቱን እስካሁን በምስጠራዊ መንገድ አያረጋግጥም። ያ ማረጋገጫ እስኪተገበር ድረስ `source`ን እንደማይታመን ፍንጭ ይያዙት፤ የፈቃድ ውሳኔዎችን በእሱ ላይ አይገንቡ።

የላቀ ጥሪ አድራጊ ለዚያው ቪዲዮ አስቀድሞ ፈቃድ የተሰጠውን `audioTranscript` ትራክ
ሊያቀርብ ይችላል። የውህደት መገናኛው የምስል እና የድምፅ ምልከታዎችን በአንድ
የጊዜ ገደብ እና የማቋረጫ ምልክት ሥር ያስኬዳል፣ በጋራ የጊዜ መስመር ላይ
ያስተካክላቸዋል፣ ፈጽሞ ተመሳሳይ የሆኑትን ያዋህዳል፣ እና ከሁለቱ ወገኖች
አንዱ ብቻ ሲሳካ ከፊል ውጤት ሪፖርት ያደርጋል። ልክ ያልሆነ `audioTranscript`
ወደዚያ ከፊል ውጤት ዝቅ ይላል — የምስል መግለጫው ይቆያል፣ የድምፅ
ቅርንጫፉም የተጣራ የውድቀት ኮድ ይመዘግባል — መላው ቪዲዮ እንዲወድቅ
ከማድረግ ይልቅ። የእያንዳንዱ ቅርንጫፍ ተገኝነት፣ የከፊል ውጤት ምልክት
እና የተጣሩ የውድቀት ኮዶች በተገለጸው ውጤት፣ በመከላከያ ሜታዳታ
(`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`)፣ በውጤት-መሸጎጫ ሜታዳታ እና በድልድዩ
የውህደት ቆጣሪዎች ውስጥ ይጠበቃሉ። ነባሪው የVideo Bridge መንገድ
ንግግርን-ወደ-ጽሑፍ አይጠራም ወይም ሁለተኛ የሚዲያ ቅጂ አያወርድም፤
ያ ግልጽ ትራክ ከሌለ ቪዲዮ-ብቻ ሆኖ ይቀጥላል።

**የግልባጭ ማቆየት (#12150 P1)።** Video Bridge (ራሱ በምርጫ የሚነቃ)
የግልባጭ ምልክት ባቀረበ ቁጥር ይህ በራስ-ሰር ይተገበራል — የተለየ
የማቆያ ምልክት የለም። አንድ ጥያቄ ማንኛውንም የግልባጭ ምልክት
(በጥሪ አድራጊ የተገለጸ `transcript` ወይም የተዋሃደ `audioTranscript`)
ሲያቀርብ፣ መከላከያው `videoBridgeObserved` የሚል ምልክት ያደርግበታል
እና የቪዲዮ መግለጫውን የተደበቀ ጥላ ቅጂ ያመነጫል — የእያንዳንዱ
ምልክት ነጻ-ጽሑፍ አካል በ`[redacted-video-transcript]` የተተካበት
ተመሳሳይ አቀራረብ፤ ይህም ሕብረቁምፊው ከመገጣጠሙ በፊት የተዋቀረውን
የምልክት መስክ በመተካት ይገነባል (ጠፍጣፋውን ጽሑፍ በመተንተን
ፈጽሞ አይደለም፤ ስለዚህ እንደ `[inaudible]`/`[music]` ያሉ `]`
የያዙ አካላትን ጨምሮ ጥቃት-አዘልም ሆነ መደበኛ የምልክት ይዘት
ሊተርፍ አይችልም)። በቋሚነት የሚቀመጠው የጥሪ-ምዝግብ ጥያቄ አካል
እያንዳንዱን ከቪዲዮ የተገኘ የጽሑፍ ክፍል በዚያ የተደበቀ ጥላ ቅጂ
ይተካል፣ ይህም በይዘት እኩልነት ይዛመዳል፤ የ`fullText` መልህቅ
ከተጠናቀቀው የቅድመ-ጥሪ መከላከያ ፔይሎድ እንደገና ይነበባል፣
ስለዚህ በኋላ የሚመጡ የሰንሰለት መከላከያዎች (የPII እና የማረጋገጫ
መረጃ ሸፋኞች፣ ቅድሚያዎች 10/95) የመግለጫውን ጽሑፍ በቦታው ላይ
እንደገና ከጻፉት በኋላ እና የስርዓት-መጠየቂያ/ርክክብ/ማህደረ ትውስታ
ማስገባት የመልዕክት ድርድሩን እንደገና ከቀረጸው በኋላም ማዛመዱ
ይሳካል። ወደ ሞዴሉ ከፍ ብሎ የሚላከው አካል ሳይቀየር ይቆያል።
የታየ ጥያቄ ምንም ዘላቂ Memory አይሞላም (ከጥያቄም ሆነ ከምላሽ
የሚመነጭ ማውጣት ይዘለላል)፣ ስለዚህ የሞዴሉ የራሱ ምላሽ
የግልባጩን ጽሑፍ ወደ Memory አስተጋብቶ ማስገባት አይችልም።

አሁንም ክፍት የሆኑ የማቆያ ገጽታዎች፣ ለቀጣይ ሥራ የሚከታተሉ
(**P2**፣ #12430)፦ በዝርዝር-ምዝግብ ቅርስ ውስጥ ያለው ጥሬ
የቅድመ-መከላከያ የደንበኛ-ጥያቄ ቅጽበተ-ቅጂ፤ የ`previous_response_id`
ቀጣይነት በውድቀት ጊዜ መዘጋት፤ ግልባጩን በተዋቀረ የሕብረቁምፊ
መጠየቂያ ውስጥ የሚክቱ ከመነጩ-መጠየቂያ የውስጥ ማሰራጫዎች
(የፓይፕላይን ደረጃዎች፣ የዐውድ-ርክክብ)፤ እና ግልባጩን የሚጠቅስ
የሞዴል ምላሽ የምላሽ አካል / የትርጉም-መሸጎጫ ቅጂ። እነዚህ ከP1
የቋሚ-ጥያቄ-አካል + Memory ወሰን ውጭ ያሉ ጥሬ/የምላሽ-ምድብ ወይም
በምርጫ የሚነቁ ገጽታዎች ናቸው።

የውስጥ `/api/modality-bridge/video/drilldown` የሕይወት ዑደት የተለየ፣
በሉፕባክ/ቶከን የተረጋገጠ የመሸጎጫ መሠረተ-ልማት ነው። እያንዳንዱ
ክወና ቀኖናዊ ግልጽ-ያልሆነ የዋና ተጠቃሚ መታወቂያም ይፈልጋል።
የምርት አካባቢ ጥሪ አድራጊ ከመንቃቱ በፊት፣ ያንን መታወቂያ
ከተረጋገጠው ተከራይ ማመንጨት አለበት፣ እና በደንበኛ የተመረጠ
እሴት ፈጽሞ ማስተላለፍ የለበትም። የመሸጎጫ ቁልፎች ያንን ዋና
ተጠቃሚ ከቀኖናዊ የክፍለ-ጊዜ እና የቪዲዮ-ማጣቀሻ መታወቂያዎች
ጋር ያስራሉ፣ ከSHA-256 የተመነጩ ቁልፎቻቸውን ብቻ ያከማቻሉ፣
እና ንባብንም ሆነ ስረዛን በዚያው ዋና ተጠቃሚ ይገድባሉ። መሸጎጫው
በእያንዳንዱ ግቤት ቢበዛ 16 የተመነጩ JPEG ፍሬሞችን ያከማቻል፣
ከአሥር ደቂቃዎች በኋላ ጊዜያቸውን ያሳልፋል፣ እና የተገደቡ
`start`/`end` ንባቦችን ወይም ግልጽ የክፍለ-ጊዜ ስረዛን ይደግፋል።

እያንዳንዱ ዋና ተጠቃሚ በ16 ግቤቶች እና 64 MiB ቀኖናዊ JPEG ውሂብ
የተገደበ ነው። እነዚያ ገደቦች ከዓለም አቀፉ የ64-ግቤት/256 MiB
ጣሪያ ነጻ ናቸው፦ የዋና ተጠቃሚ ኮታ ጫና፣ ዓለም አቀፍ LRU ማስወጣት
ከመታሰቡ በፊት፣ የዚያን ዋና ተጠቃሚ በቅርብ ጊዜ በትንሹ ጥቅም ላይ
የዋሉ ግቤቶችን ብቻ ያስወጣል። ጊዜያቸው ያለፈ ግቤቶች በመሸጎጫ
እንቅስቃሴ ወቅት ከዋና ተጠቃሚውም ሆነ ከዓለም አቀፍ ስሌት ይጸዳሉ፣
ማቋረጥ እና የማረጋገጫ ውድቀት ግን ከፊል ምትክ አያስቀምጡም።

መሸጎጫው ቀኖናዊ ያልሆነ Base64ን፣ ከመጠን ያለፈ ማሟያን፣ JPEG
ያልሆነ ሚዲያን፣ የተበላሹ ወይም የተቆረጡ JPEGዎችን፣ እና በተገደበ
የሙሉ-ምስል `sharp` ዲኮድ ወቅት ማስጠንቀቂያ የሚያመጡ JPEGዎችን
ውድቅ ያደርጋል። እያንዳንዱን ተቀባይነት ያገኘ ምስል እንደ
ቀኖናዊ JPEG እንደገና ይቀይራል፣ በጥሪ አድራጊው መስኮች ከመተማመን
ይልቅ ስፋትና ቁመቱን ከተፈቱት ባይቶች ያመነጫል፣ እና ተከታይ
ፖሊግሎት ባይቶችን ከማቆየት ይልቅ ያስወግዳል። የተገደበው ቀኖናዊ
የታመቀ ቋት ብቻ በሁለቱም ኮታዎች ላይ ይቆጠራል። የJSON ሽቦ ገደቡ
ለ32 MiB የተፈታ-ግቤት ጣሪያ የBase64 ተጨማሪ መጠንን ያካትታል።
እያንዳንዱ
የተከማቸ ምንጭ የተረጋገጠውን የJPEG ቅርጸት/ጥራት፣ የናሙና
መመሪያ፣ የመነጫ ስሪት፣ የመፍጠሪያ ጊዜ፣ በአገልጋይ የተሰላ የይዘት
ሃሽ፣ እና ሃሽ የተደረገ የወላጅ ማጣቀሻን ከታመነው ጥሪ አድራጊ
የወላጅ-ይዘት ሃሽ ጋር ይመዘግባል። ከአቶሚክ የመሸጎጫ ማስቀመጥ
በፊት፣ በተመሳሳይ ጊዜ ባልሆኑ የዲኮድ/ሃሽ ደረጃዎች መካከል
መቋረጥ ይፈተሻል።

ይህ ክፍል እስካሁን የምርት አካባቢ አምራችን ከመንገዱ ጋር አያገናኝም
እና የባለብዙ-ጥራት ልዩነት ምርጫ አያቀርብም። ስለዚህ ግልጽነት
ያለው የVideo Bridge ጥያቄ መንገድ ምንም ተጨማሪ ሥራ አያስከትልም፣
በተከራይ-የታሰረ የዋና ተጠቃሚ ማመንጨት እና ሙሉው የFU-08
ባለብዙ-ጥራት የሕይወት ዑደት ግን እንደተጠናቀቀ ባህሪ ከመመዝገብ
ይልቅ ግልጽ የቀጣይ ሥራ ሆነው ይቀጥላሉ።

ፍሬሞች በተዋቀረው Video ሞዴል በቅደም ተከተል መግለጫ ይሰጣቸዋል። ባዶ
የVideo ማሻሻያ የVision ቅንብሩን ይወርሳል፤ ሁለቱም ባዶ ከሆኑ የVision
ራስ-ሰር ራውተር ውጤታማውን ምስል-መረዳት የሚችል ሞዴል ይመርጣል። የተሳኩ መግለጫዎች
ዋናውን ክፍል በቋሚ `[Video description:` ቅድመ ቅጥያ ይተካሉ፤ ይህም
ጽሑፉን ከማይታመን ሚዲያ የተገኘ ምልከታ መሆኑን ያመለክታል፣ እንዲሁም ቀጣይ
ሞዴሎች በሚዲያው ውስጥ የተገኙ መመሪያዎችን እንዳይከተሉ ይነግራቸዋል። የፍሬም-መግለጫ ካሽ ቁልፎች
የJPEG ባይቶችን፣ ፕሮምፕቱን፣ የጊዜ ማህተሙን እና ውጤታማውን ሞዴል ያካትታሉ፤ የተሳኩ
መግለጫዎች ብቻ በካሽ ይቀመጣሉ። የካሽ ግቤቶች በእርግጥ የተሳካውን አምራች ሞዴል፣
የመጠባበቂያ ሞዴልን ጨምሮ፣ ይዘው ይቆያሉ፤ የተለያዩ ፍሬሞች
በተለያዩ ሞዴሎች ሲመረቱ ብሪጁ `mixed` ብሎ ዘገባ ያቀርባል። የካሽ ስኬት ያንን የአምራች ማንነት
እንደ ተጠየቀው የራውቲንግ ዕቅድ ዳግም ሳይሰይመው መልሶ ይጠቀምበታል። የሙሉ-ቪዲዮ ውጤት
ካሽ ውጤቱን በሚቀይሩ በሁሉም ግብዓቶች ላይ ቁልፍ ይመሠረትበታል — ፕሮምፕት፣ ውጤታማ
ሞዴል፣ የናሙና መውሰጃ ፖሊሲ፣ የፍሬም ብዛት፣ የትርጉማዊ ትንተና ሁነታ፣ የተስተካከለው የትኩረት ፍንጭ
SHA-256 አሻራ፣ የትኩረት መስኮት፣ `transcript`፣
`audioTranscript` እና የእውቂያ-ሉህ ጠቋሚ — ስለዚህ ከእነዚህ
ልኬቶች አንዱን መቀየር የካሽ ስህተት እንጂ ያረጀ ውጤትን ዳግም መጠቀም አይደለም። የምስላዊ ተደጋጋሚነት ማስወገጃ ፖሊሲ
ስሪት፣ ገደብ እና የተገደበ የዕጩ-ፍሬም ብዛትም በግልጽ
በውጤት-ካሽ ቁልፍና ሜታዳታ ውስጥ ይካተታሉ፤ ስለዚህ የፖሊሲ ለውጥ ያረጀ
የሙሉ-ቪዲዮ መግለጫን ዳግም መጠቀም አይችልም። የውጤት-ካሽ v4 ሜታዳታ ሁነታውንና
አሻራውን ይይዛል፣ ጥሬውን የተጠቃሚ ተግባር ግን ፈጽሞ አይይዝም። የጥበቃ ሜታዳታ የተጠየቁትንም ሆነ
ውጤታማዎቹን የትንተና ሁነታዎች ያሳውቃል፤ ሊጠቅም የሚችል የተጠቃሚ ጽሑፍ ሳይኖር የተጠየቀ `focused` ሁነታ
በተግባር `full` እንደሆነ ሪፖርት ይደረጋል።

የጥበቃ ስርዓቱ ሁሉንም የሚደገፉ የቪዲዮ ክፍሎች ያወጣል፣ ነገር ግን
ከ`modalityBridgeVideoMaxVideos` በላይ አይገልጽም።
`supportsVideo === false` እንዳለው ለተረጋገጠ ዒላማ፣ ያልተሳኩና ከገደብ ያለፉ ቪዲዮዎች
ምንም ጥሬ ቪዲዮ እንዳይቀር ግልጽ ወደሆኑ ደህንነቱ የተጠበቀ የጽሑፍ ምልክቶች ይቀየራሉ። ችሎታው
በማይታወቅበት ጊዜ እነዚያ ክፍሎች ሳይነኩ ይቀራሉ። `supportsVideo === true` ያላቸው ዒላማዎች
ብሪጁን ያልፋሉ።
የደንበኛው የጥያቄ ማቋረጫ ምልክት በማውረድ፣ በደላላ ወረፋ፣
በንዑስ ሂደቶች እና በመግለጫ ጥሪዎች ውስጥ ይተላለፋል፤ ማቋረጦች በቪዲዮዎች መካከል ያቆማሉ እና ጥሬ ሚዲያን
በክፍት ሁኔታ እንዲያልፍ ፈጽሞ አያደርጉም።

የሩጫ ጊዜ ቅንብሮች በDB የተደገፉ እና በZod የተረጋገጡ ናቸው፦

| ቁልፍ                                 | ነባሪ         | ክልል / ባህሪ                                                                           |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | አማራጭ የሩጫ ጊዜ ባህሪ፣ በፈቃደኝነት የሚነቃ                                                       |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` አጠቃላይ መግለጫዎችን ይጠብቃል፤ `focused` የተገደበ፣ የማይታመን የቅርብ ጊዜ የተጠቃሚ አውድን ይጠቀማል        |
| `modalityBridgeVideoModel`          | `""`        | የVision Bridge ሞዴልን ይወርሳል                                                           |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`፣ `scene_aware` ወይም ተመጣጣኝ `segment_aware`፤ የመለየት አለመሳካት ወደ `uniform` ይመለሳል |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                      |

ከ120 ሰከንድ በላይ የሆኑ ቀድሞ የተቀመጡ የVideo ጊዜ-ገደብ እሴቶች ወደ
የደላላው የጊዜ ገደብ ይገደባሉ፤ ከዚያ ገደብ በላይ የሆኑ አዲስ የቅንብር ጽሑፎች ውድቅ ይደረጋሉ።
`GET /api/modality-bridge/video/runtime` ማረጋገጫ ወይም የሩጫ ጊዜ ምርመራ ከመደረጉ በፊት
የታመነ፣ ማህተም የተደረገበት የloopback አካባቢያዊነትን ይፈልጋል፣ ከዚያም የአስተዳደር
ማረጋገጫ ይጠይቃል። የሚመልሰው `available`፣ የጸዱ የFFmpeg/ffprobe ስሪቶችን እና ሩጫ ጊዜው
በማይገኝበት ጊዜ ቋሚ ምክንያትን ብቻ ነው። ውስጣዊው የማውጫ መዳረሻ ነጥብ
የሕዝብ የሰቀላ API አይደለም፦ የወረፋ ሙሌት `503` ከ`Retry-After` ጋር ይመልሳል፣ የደዋይ
ግንኙነት መቋረጥ `499` ይመልሳል፣ እና ቋሚው የደላላ ጊዜ ገደብ `504` ይመልሳል። የተቀየሩ ምላሾች
የVision ወይም Audio ክፍሎችን ሳያስወግዱ
`video->text;model=<visionModel>;parts=<videos>`ን ወደ ማዕከላዊው
`x-omniroute-modality-bridge` ራስጌ ያክላሉ።

### PII ሸፋኝ (`piiMasker.ts`)

በ**ሁለቱም** ደረጃዎች ላይ ይሰራል።

- **`preCall`** የውሂብ ጭነቱን ይቀዳል፣ `system`፣ `messages`፣ `input` እና
  `prompt`ን (ተራ የሕብረቁምፊ ንጥሎችን ጨምሮ) ይዳስሳል፣ እና በሕብረቁምፊ `content`/`text`
  መስኮች ላይ `processPII()`ን (ከ`@/shared/utils/inputSanitizer`)
  ይተገብራል።
  `PII_REDACTION_ENABLED=true` ሲሆን፣ የተገኘ PII በወጪው
  የውሂብ ጭነት ውስጥ ይሸፈናል። ይህ ከ`INPUT_SANITIZER_MODE` ነጻ ነው (እሱ የሚቆጣጠረው
  የፕሮምፕት-መርፌ ፖሊሲን ብቻ ነው)። መሸፈን ሲጠፋ፣ ጥሪው ይዘቱን
  ሳይጽፍ የመገኘት ብዛቶችን ይመዘግባል።
- **`postCall`** ምላሹን በጥልቅ ይቀዳል፣ `sanitizePIIResponse()`ን እና
  የResponses-API-ቅርጽ ሸፋኙን (`maskResponsesOutput` — `output_text`ን እና
  `output[].content[].text`ን ይሸፍናል) ያስኬዳል። ማንኛውም መሸፈን ከተከሰተ፣
  የተሻሻለው ምላሽ ዋናውን ይተካል።

የጥበቃ ስርዓቱ ፈጽሞ አያግድም፤ ማብራሪያ ብቻ ይጨምራል (`meta.detections`፣
`meta.redacted`) ወይም ዳግም ይጽፋል።

### የፕሮምፕት መርፌ (`promptInjection.ts`)

በተጠቃሚ በቀረበ ይዘት ውስጥ ጠላትነት ያላቸውን መዋቅሮች ይለያል እና የተዋቀረውን
ፖሊሲ ያስፈጽማል። ባህሪው በአካባቢ ተለዋዋጮች እና በconstructor
አማራጮች የሚመራ ነው፦

| ቅንብር     | የአካባቢ ተለዋዋጭ                                                                                           | ነባሪ    | ተጽዕኖ                                                                                                                                                           |
| -------- | ----------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ነቅቷል     | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | `false` ሲሆን መከላከያው ወዲያውኑ ይቋረጣል።                                                                                                                                |
| ሁነታ      | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | የመርፌ ጥቃት ፖሊሲ፦ `block`፣ `warn` ወይም `log`። (`redact` ለኋላ-ተኳኋኝነት ተቀባይነት አለው፣ ነገር ግን የመርፌ ጥቃት ጽሑፍን **አያስወግድም**፤ የጥያቄ PII ዳግም መጻፍ በ`PII_REDACTION_ENABLED` ይቆጣጠራል።) |
| የማገድ ገደብ | `blockThreshold` አማራጭ / `INPUT_SANITIZER_BLOCK_THRESHOLD` (ተለዋጭ ስም `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | ለማገድ የሚያስፈልገው ዝቅተኛው የክብደት ደረጃ። በነባሪው ሁኔታ መካከለኛ ደረጃ ለክትትል ብቻ ነው።                                                                                                |

**የሁነታ ቅድሚያ** (`getMode`)፦ የጠሪው `options.mode` →
የ`INJECTION_GUARD_MODE` **DB ባህሪ-ማመልከቻ ተተኪ ቅንብር** (ዳሽቦርድ → ቅንብሮች →
የባህሪ ማመልከቻዎች) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`። ስለዚህ የዳሽቦርድ ተተኪ ቅንብር ከenv ተለዋዋጮቹ ይቀድማል፤ በዚህም የባህሪ
ማመልከቻዎች UI በሥራ ላይ ያለውን መከላከያ በቀጥታ ይቆጣጠራል (ዳግም ማስጀመር አያስፈልግም)። የDB ንባቡ በችግር ጊዜ ደህንነቱን የጠበቀ ነው፦
ስህተት ካጋጠመው መከላከያው ወደ env-ተኮር ባህሪ ይመለሳል፤ እንዲሁም ምንም
ተተኪ ቅንብር ካልተዘጋጀ ባህሪው ከenv-ብቻ መፍትሔ ጋር ተመሳሳይ ነው።

የማወቂያ ምንጮች፦

1. `sanitizeRequest()` ከ`@/shared/utils/inputSanitizer` (በሌላ የሂደቱ ክፍል
   የሚጠቀሙበት የጋራ የማወቂያ ስብስብ)።
2. አብሮገነብ `DEFAULT_GUARD_PATTERNS` (በአሁኑ ጊዜ `system_override_inline` እና
   `markdown_system_block`፣ ሁለቱም `high` ክብደት ያላቸው)።
3. በገንቢ አማራጮች በኩል የሚተላለፉ አማራጭ `customPatterns` (ሕብረቁምፊዎች፣ regex
   ወይም `{ name, pattern, severity }` መዝገቦች)።

`mode === "block"` **ሲሆን** እና ቢያንስ አንድ ማወቂያ የክብደት
ገደቡን ሲያሟላ፣ `preCall` `{ block: true, message: "Request rejected:
suspicious content detected" }` ይመልሳል። በ`warn`/`log` ሁነታዎች መከላከያው መዝገብ
ያስቀምጣል፣ ነገር ግን ጥሪውን ይፈቅዳል። የጋራ አጋዥ `evaluatePromptInjection()` እንዲሁም
በመዝገብ ውስጥ ሳያልፉ ጥያቄዎችን መገምገም ለሚፈልጉ ጠሪዎች ወደ ውጭ ይላካል።

**የፍተሻ ወሰን (v3.8.20)፦** ማወቂያው ከተጣመረው የጥያቄ ጽሑፍ
**የመጀመሪያዎቹን 16 KB** ብቻ ይመረምራል — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 ባይት)
በ`src/shared/utils/inputSanitizer.ts` ውስጥ። `detectInjection()` እና
`evaluatePromptInjection()` ሁለቱም የስርዓተ ጥለት ዙሩን ከማስኬዳቸው በፊት
`slice(0, MAX_INJECTION_SCAN_BYTES)` ይጠቀማሉ። የመርፌ ጥቃት መመሪያዎች ከግቤት አናት አካባቢ ስለሚገኙ፣ ይህ
ማወቂያውን ሳያዳክም በብዙ-መቶ-KB ጭነቶች ላይ የregex CPU/GCን ይገድባል (ይመልከቱ
#3932፣ #4041)።

### የማረጋገጫ መረጃ ማስክ (`credentialMasker.ts`)

በ**ሁለቱም** ደረጃዎች ላይ፣ በነባሪው ሰንሰለት መጨረሻ (ቅድሚያ `95`) ይሠራል። ታዋቂ
የAPI-ቁልፍ / ሚስጥራዊ-ቶከን ስርዓተ ጥለቶችን ከወጪ ጭነቱ (የመልዕክት
ይዘት፣ የመሣሪያ-ጥሪ ነጋሪ እሴቶች፣ የመሣሪያ ውጤቶች) **እና** ከአቅራቢው ምላሽ ያደበዝዛል፤ ስለዚህ
በጥያቄ ውስጥ የተለጠፈ (ወይም በመሣሪያ ውጤት ተመልሶ የተላከ) የማረጋገጫ መረጃ
ወደ ላይኛው አቅራቢ ወይም ወደ ደንበኛው ተመልሶ እንዳይፈስ ይከላከላል።

- **በግልጽ ማንቃት ብቻ**፣ ከPII ማደብዘዝ ጋር ተመሳሳይ ስምምነት (ከጥብቅ ደንብ #20 ጋር የተያያዘ)፦
  `settings.credentialRedactionEnabled === true` **ወይም**
  `CREDENTIAL_REDACTION_ENABLED=true` ካልሆነ ተሰናክሏል። ሲጠፋ መከላከያው ምንም አያደርግም —
  ፈጽሞ አያግድም እና ፈጽሞ ዳግም አይጽፍም።
- `redactCredentials()` ሙሉውን የጭነት/ምላሽ ዛፍ (`walkValue()`፣
  ከprototype-pollution የተጠበቀ፣ በ`WeakSet` አማካኝነት ከዑደት የተጠበቀ) ያስሳል፣ እና ተዛማጆችን
  በ`[REDACTED:<type>]` ቦታ ያዥ ይተካል፤ በትክክል የተቀየሩትን ቅርንጫፎች ብቻ
  ይቀዳል።
- `CREDENTIAL_PATTERNS` የLLM አቅራቢ ቁልፎችን (OpenAI፣ OpenAI-proj፣
  Anthropic፣ Google፣ Hugging Face፣ Replicate)፣ የVCS/SaaS ቶከኖችን (GitHub፣ Slack፣
  Linear፣ Notion፣ npm፣ Postman፣ Discord)፣ የክፍያ ቁልፎችን (Stripe፣ Square)፣ የደመና
  ቁልፎችን (AWS መዳረሻ ቁልፍ፣ Twilio፣ SendGrid፣ Mailgun)፣ የግል ቁልፎችን / JWTsን፣
  የማረጋገጫ መረጃ የያዙ የግንኙነት ሕብረቁምፊዎችን (`mongodb://user:pass@...`፣ ወዘተ)፣ እና
  አጠቃላይ የ`Authorization`/`x-api-key`/`api-key`/`apikey` ራስጌ-እሴት
  ስርዓተ ጥለትን ይሸፍናል። ራስጌ-ቅርጽ ያላቸው ቁልፎች (`authorization`፣ `x-api-key`፣ `api-key`፣
  `apikey`) በአጠቃላይ የጽሑፍ regex ሳይሆን በመዋቅራዊ መንገድ (እሴቱ ብቻ፣ እንደ
  `Bearer `/`Basic ` ያለው የመርሃግብር ቅድመ ቅጥያ እንደተጠበቀ) ይደበዝዛሉ።
- መከላከያው ፈጽሞ አያግድም፤ ዳግም መጻፍ (`modifiedPayload` /
  `modifiedResponse`) እና ማብራሪያ ማከል (`meta.credentialsRedacted`፣ `meta.count`) ብቻ ያደርጋል።

የድጋሚ ስህተት መከላከያ፦ `tests/unit/credential-masker-guardrail.test.ts`።

## መሠረታዊ ውል (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true ሰንሰለቱን ወዲያውኑ ያቋርጣል
  message?: string; // ሲታገድ ይታያል
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // ጥያቄውን እንደገና ለመጻፍ በ-preCall ይመለሳል
  modifiedResponse?: TValue; // ምላሹን እንደገና ለመጻፍ በ-postCall ይመለሳል
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

አንድ guardrail `void`፣ `{}` ወይም `{ block: false }` በመመለስ "ለውጥ የለም" የሚል ምልክት ይሰጣል። `modifiedPayload`/`modifiedResponse` መመለስ በሰንሰለቱ ውስጥ ወደ ታችኛዎቹ guardrails የሚተላለፈውን እሴት ይተካል።
`signal?: AbortSignal` የጠሪውን የሕይወት ዑደት ወደ guardrails ያስተላልፋል። የጥያቄ ማቋረጥ ሆን ተብሎ የተደረገው ክፍት-በመተው የሚሳካ ልዩ ሁኔታ ነው፦ የሚዲያ ማገናኛዎች ሥራቸውን ያቆማሉ እና ያጸዳሉ፤ ጥሬ ሚዲያን እንደማይደግፈው ወደሚታወቅ ዒላማ ግን አይመልሱም።

## መዝገብ (`registry.ts`)

ብቸኛው `guardrailRegistry` የሚከተሉትን ያቀርባል፦

- `register(guardrail)` — guardrail ያክላል (ወይም በመደበኛ የስም ቅርጹ መሠረት ይተካል)፣ ከዚያም በ`priority` ከዝቅተኛ ወደ ከፍተኛ እንደገና ይደረድራል።
- `clear()` / `list()` — የአስተዳደር ረዳት መሣሪያዎች።
- `runPreCallHooks(payload, context)` — ንቁ guardrailsን በየተራ ያካሂዳል፣ payloadን በ`modifiedPayload` በኩል ያስተላልፋል፣ እና በመጀመሪያው `block: true` ላይ ያቆማል።
- `runPostCallHooks(response, context)` — በምላሹ በኩል ተመሳሳይ ፍሰትን ይከተላል።
- `resetGuardrailsForTests({ registerDefaults })` — ለንጹሕ የሙከራ ማግለል ሁኔታውን ያጸዳል፣ እና እንደ አማራጭ ነባሪዎቹን እንደገና ይመዘግባል።

ሁለቱም አስኪያጆች `{ blocked, payload|response, results, guardrail?, message? }` ይመልሳሉ፤ በዚህ ውስጥ `results` ለእያንዳንዱ guardrail `blocked`፣ `skipped`፣ `modified`፣ `error` እና `meta` መስኮችን የሚያካትቱ የ`GuardrailExecutionResult` መዝገቦች ድርድር ሲሆን፣ ለክትትል ጠቃሚ ነው።

### Guardrailsን በእያንዳንዱ ጥያቄ ማሰናከል

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` ለአሁኑ ጥያቄ መዝለል ያለባቸውን የguardrail ስሞች ድግግሞሽ የተወገደለት ዝርዝር ያሰባስባል። ምንጮቹ (ሁሉም አማራጭ፣ ሁሉም የሚዋሃዱ)፦

- `apiKeyInfo.disabledGuardrails`
- የጥያቄ አካል `disabledGuardrails` (ከፍተኛ ደረጃ)
- የጥያቄ አካል `metadata.disabledGuardrails`
- ራስጌ `x-omniroute-disabled-guardrails` (ወይም የቀድሞው
  `x-disabled-guardrails`)

እሴቶቹ የሕብረቁምፊዎች ድርድር ወይም በኮማ የተለየ ሕብረቁምፊ ሊሆኑ ይችላሉ፤ ስሞች ወደ ትንሽ ፊደል kebab-case (`pii_masker` → `pii-masker`) ይደበኛሉ። ውጤቱ በ`context.disabledGuardrails` በኩል ወደ መዝገቡ ይተላለፋል፤ መዝገቡም ተዛማጅ guardrailsን ይዘላል (`skipped: true` በ`results` ውስጥ)።

## የአፈጻጸም ቅደም ተከተል

በ`src/sse/handlers/chat.ts` እና
`open-sse/handlers/chatCore.ts` በኩል ለሚያልፍ ለእያንዳንዱ ጥያቄ፦

1. `resolveDisabledGuardrails(...)` ከAPI ቁልፍ፣ ከbody እና
   ከheaders የመዝለያ ዝርዝሩን ይገነባል።
2. `guardrailRegistry.runPreCallHooks(body, ctx)` guardrailsን በቅድሚያ
   ደረጃቸው ከዝቅተኛ ወደ ከፍተኛ ቅደም ተከተል ያስኬዳል፦
   - የተሰናከሉ guardrails እንደ `skipped` ይመዘገባሉ።
   - የእያንዳንዱ guardrail `preCall` በ`modifiedPayload` አማካኝነት payloadን እንደገና ሊጽፍ ይችላል።
   - የመጀመሪያው `block: true` ሰንሰለቱን ወዲያውኑ ያቋርጣል፣ እና handlerው
     የguardrail ውድቅ ማድረጊያ ምላሽ ይመልሳል።
3. (ሊሻሻል የሚችለው) payload ወደ combo routing እና upstream
   dispatch ይገባል።
4. ምላሹ ከተዋቀረ በኋላ፣ `guardrailRegistry.runPostCallHooks(...)`
   በምላሹ ላይ ያንኑ ሰንሰለት ያስኬዳል። እዚህ ያለ `block: true` የupstream
   ምላሹን ይጥላል።

ስህተት የሚያስነሱ guardrails በ`error: <message>` ይመዘገባሉ፣ እንዲሁም በ
`logger.warn` በኩል log ይደረጋሉ፤ ነገር ግን ሰንሰለቱ ይቀጥላል — ይህ በንድፍ fail-open ነው።

## ውቅር

አብሮ በተሰሩት guardrails የሚነበቡ የአካባቢ ተለዋዋጮች፦

| ተለዋዋጭ                                 | የሚጠቀምበት                   | ውጤት                                                                                        |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | ማወቂያውን ሙሉ በሙሉ ለማሰናከል `false` ያድርጉ።                                                         |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | የinjection ፖሊሲ፦ `warn`፣ `block` ወይም `log`። የቀድሞው `redact` እሴት የinjection ጽሑፍን እንደገና አይጽፍም። |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | የinjection guard ሁነታ፤ እንዲሁም የenv varsን **የሚሽር** የDB feature flag ነው (DB > ENV)።            |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block` ውድቅ የሚያደርገው ዝቅተኛው የከባድነት ደረጃ፦ `high` (ነባሪ)፣ `medium` ወይም `low`።               |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | የ`INPUT_SANITIZER_BLOCK_THRESHOLD` የቀድሞ alias።                                             |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true` ሲሆን፣ በጥያቄው ውስጥ ያለ PII ይሰወራል (ከinjection ሁነታ ነጻ ነው)።                                 |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | በምላሽ በኩል ያለውን masker ባህሪ ይቆጣጠራል።                                                           |

የModality Bridge guardrails የruntime ውቅርን ከDB-backed settings
store (`getSettings()`) ያነባሉ፣ ከenv vars አይደለም። የVision ዋና ቁልፎች
`modalityBridgeVisionEnabled`፣ `modalityBridgeVisionMode`፣
`modalityBridgeVisionModel`፣ `modalityBridgeVisionTaskAware`፣
`modalityBridgeVisionPrompt`፣ `modalityBridgeVisionTimeout`፣
`modalityBridgeVisionMaxImages`፣ `modalityBridgeVisionMaxChars`፣
`modalityBridgeCacheEnabled`፣ `modalityBridgeCacheTtlMinutes` እና
`modalityBridgeCacheMaxEntries` ናቸው። የቀድሞዎቹ
`visionBridge*` ቁልፎች በሰነድ እንደተገለጸው ለአንድ ዑደት የንባብ
fallback ብቻ ተቀባይነት አላቸው፤ dashboard ጽሁፎች ዋና ቁልፎቹን ይጠቀማሉ። ነባሪዎቹ እና fallback
resolverው በ`src/shared/constants/modalityBridgeDefaults.ts` ውስጥ ይገኛሉ፣ የቀድሞ
constants ደግሞ በ`src/shared/constants/visionBridgeDefaults.ts` ውስጥ ተይዘዋል።

Audio `modalityBridgeAudioEnabled`፣ `modalityBridgeAudioModel`፣
`modalityBridgeAudioTimeout` እና `modalityBridgeAudioMaxClips`ን፣ እንዲሁም የጋራ
`modalityBridgeCache*` settingsን ይጠቀማል። እነዚህ
ቁልፎች ከModality Bridge schema ጋር ስለተዋወቁ፣ Audio የቀድሞ ቁልፍ fallback የለውም።

Video `modalityBridgeVideoEnabled`፣ `modalityBridgeVideoAnalysisMode`፣
`modalityBridgeVideoModel`፣
`modalityBridgeVideoFrameCount`፣ `modalityBridgeVideoSamplingPolicy`፣
`modalityBridgeVideoMaxVideos` እና
`modalityBridgeVideoTimeout`ን፣ እንዲሁም የጋራ `modalityBridgeCache*` settingsን ይጠቀማል።
FFmpeg/ffprobe አማራጭ የክወና
ጥገኞች በመሆናቸው፣ እንዲሁም የframe captioning መዘግየትን እና የmodel ወጪን ስለሚጨምር፣ በነባሪ ተሰናክሏል።

## ብጁ መከላከያዎች

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

ደረጃዎች፦

1. `BaseGuardrail`ን የሚወርስ `src/lib/guardrails/myGuardrail.ts` ይፍጠሩ።
2. `preCall` እና/ወይም `postCall`ን ይተግብሩ።
3. በመጫን ጊዜ ይመዝግቡ (`registerDefaultGuardrails` ውስጥ ያክሉ) ወይም
   በአሂድ ጊዜ `guardrailRegistry.register(...)`ን ይጥሩ — መዝገቡ ተመሳሳይ መደበኛ የተደረገ ስም ያለውን
   ቀደምት መከላከያ ይተካል።
4. ሙከራዎችን በ`tests/unit/` ስር ያክሉ (ያሉ ምሳሌዎች፦
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`)።

## ሙከራ

ከታወቀ ሁኔታ ለመጀመር በሙከራዎች መካከል `resetGuardrailsForTests()`ን ይጠቀሙ።
ባዶ መዝገብ ለመጀመር `{ registerDefaults: false }`ን ያስተላልፉ እና
በሙከራ ላይ ያሉትን መከላከያዎች ብቻ ይመዝግቡ። Vision Bridge የጥገኝነት
ማስገባትን (`deps.getSettings`, `deps.callVisionModel`) ይቀበላል፤ Audio Bridge ደግሞ
ለቅንብሮች፣ ችሎታዎች፣ የSTT ሞዴል ምርጫ፣ የማረጋገጫ መረጃ
ፍተሻዎች እና ወደ ጽሑፍ መቀየር ተመጣጣኝ የማስገቢያ ነጥቦችን ያቀርባል። ስለዚህ ሙከራዎች ያለ DB
ወይም የአውታረ መረብ መዳረሻ ሁለቱንም ፍሰቶች ሊፈትኑ ይችላሉ።

## በተጨማሪ ይመልከቱ

- `src/lib/guardrails/` — ትግበራ
- `src/shared/utils/inputSanitizer.ts` — የprompt-injection እና PII መሸፈኛን የሚያንቀሳቅስ
  የጋራ ማወቂያ
- `src/shared/constants/visionBridgeDefaults.ts` — የVision Bridge ነባሪዎች እና
  የግዳጅ-ድልድይ ሞዴል ዝርዝር
- `src/shared/constants/modalityBridgeDefaults.ts` — የጋራ Vision/Audio የአሂድ ጊዜ ነባሪዎች
- `docs/architecture/RESILIENCE_GUIDE.md` — ራሱን የቻለ ንብርብር (የወረዳ መቋረጫ፣ የማቀዝቀዣ ጊዜያት)
- `docs/reference/ENVIRONMENT.md` — ሙሉ የenv var ማጣቀሻ

## የInjection-guard መስመር ሽፋን እና red-team (Phase 8 · Block D)

injection-guard (`createInjectionGuard` / `withInjectionGuard`) የተጠቃሚ መጠየቂያዎችን የሚቀበሉ ሁሉንም መስመሮች
ይሸፍናል። `INJECTION_GUARD_MODE`ን ያከብራል (ነባሪ `warn` = መዝገብ ላይ ማስፈር ብቻ፤
`block` = HTTP 400 `SECURITY_001`ን ይመልሳል)።

| ዓይነት     | መስመሮች                                                                                                                                                | ነባሪ ሁነታ |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| ጽሑፍ (ያለ) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn    |
| አመንጪ     | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn    |
| ውሂብ      | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn    |

የጽሑፍ ማውጣት (`extractMessageContents`) `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`ን ይሸፍናል።

**Red-team (በየሌሊቱ፣ `nightly-llm-security.yml`)፦** promptfoo እያንዳንዱ መስመር
በ`INJECTION_GUARD_MODE=block` ውስጥ የOWASP-LLM ኮርፐስን እንደሚከለክል ያረጋግጣል፤ garak ምርመራዎችን ያካሂዳል (ሚስጥር ከሌለ ይዘላል)።
`moderations` ለወጥነት ተካትቷል — በblock-mode ያሉ ኦፕሬተሮች
በ`resolveDisabledGuardrails` በኩል ነፃ ሊያደርጉት ይችላሉ።

የሌሊቱ የስራ ፍሰት (`.github/workflows/nightly-llm-security.yml`፣ cron + በእጅ
ማስጀመሪያ) ሁለት ስራዎች አሉት፦

- **`promptfoo-guard` (ከልካይ)** — `promptfoo eval -c promptfooconfig.yaml`ን
  በ`INJECTION_GUARD_MODE=block` ያሂዳል። እያንዳንዱ ተቃዋሚ የሙከራ ሁኔታ (ለምሳሌ፣ "ignore all
  previous instructions…", የDAN ቅጥ ያላቸው jailbreaks) ምላሹ
  `error.code === "SECURITY_001"`ን እንደያዘ ያረጋግጣል፣ ማለትም መከላከያው ጥያቄውን በትክክል ውድቅ አድርጓል።
- **`garak` (አማካሪ)** — garakን ከአካባቢያዊ OmniRoute አጋጣሚ (`http://localhost:20128/v1`) ጋር
  `--probes promptinject,dan,leakreplay` በመጠቀም ያሂዳል። በአቅራቢ ሚስጥር
  (`PROMPTFOO_PROVIDER_KEY`) ላይ የተመሠረተ ነው፤ ሚስጥሩ ከሌለ ያለችግር ይዘላል እና
  `|| true` ይታከልበታል፣ ስለዚህ CIን ሳያሳክት ሪፖርት ያደርጋል።

የመከላከያ ረዳቱ (`createInjectionGuard` / `withInjectionGuard`) ሽፋን
መጠየቂያ የያዙ ሁሉንም `/v1` መስመሮች ያካትታል፤ የመጠየቂያ ጽሑፍ በ
`src/shared/utils/inputSanitizer.ts` ውስጥ ባለው `extractMessageContents()` አማካኝነት ከ
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` ይወጣል።
