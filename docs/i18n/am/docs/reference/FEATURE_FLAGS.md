# Feature Flags (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> ያለ **ዳግም ማሰማራት** የOmniRouteን ባህሪ የሚቀይሩ የሩጫ ጊዜ መቀያየሪያዎች።
> እዚህ የተዘረዘረው እያንዳንዱ ጠቋሚ በ
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> ውስጥ ተገልጿል — ይህም ብቸኛው የእውነት ምንጭ ነው። ዳሽቦርዱም ሆነ REST API ከዚያ
> ፋይል ስለሚያነቡ፣ ከታች ያለው ሰንጠረዥ ከእሱ ጋር 1:1 እንዲዛመድ ተፈጥሯል።

---

## የባህሪ ጠቋሚዎች ምንድን ናቸው

የባህሪ ጠቋሚ በስም የተሰየመ መቀያየሪያ (boolean ወይም enum) ሲሆን፣ እሴቱ በሩጫ ጊዜ
ሊቀየር እና ዳግም የሂደት ማሰማራት ሳያስፈልግ በውሂብ ጎታው ውስጥ ሊቀመጥ ይችላል። እያንዳንዱ
ጠቋሚ `key`፣ `label`፣ `description`፣ `category`፣ `defaultValue`፣ `type` እና `requiresRestart`
ፍንጭ ባለው `FeatureFlagDefinition` ይገለጻል።

### የመፍትሔ ቅደም ተከተል

የአንድ ጠቋሚ **ተግባራዊ እሴት** በ
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) በሚከተለው
ቅድሚያ ይወሰናል (ከፍተኛው ያሸንፋል)፦

1. **የDB ተተኪ እሴት** — በ`feature_flags` የስም ክልል ስር ባለው `key_value`
   ሰንጠረዥ ውስጥ የተከማቸ እሴት (በዳሽቦርዱ ወይም በREST API በኩል የሚዋቀር)።
2. **የአካባቢ ተለዋዋጭ** — ከተዋቀረ እና ባዶ ካልሆነ `process.env[<KEY>]`።
3. **የትርጉም ነባሪ** — ከ`featureFlagDefinitions.ts` የሚገኘው `defaultValue`።

የboolean ጠቋሚ ተግባራዊ እሴቱ `"true"`፣ `"1"` ወይም `"yes"` ሲሆን
**እንደነቃ** ይቆጠራል (`isFeatureFlagEnabled()`ን ይመልከቱ)።

> [!NOTE]
> አብዛኞቹ ጠቋሚዎች በ[`ENVIRONMENT.md`](./ENVIRONMENT.md) ውስጥ የተመዘገበ
> **ተመሳሳይ ስም** ያለው ተዛማጅ የአካባቢ ተለዋዋጭም አላቸው። የጠቋሚው የDB ተተኪ እሴት
> ከዚያ የአካባቢ ተለዋዋጭ ቅድሚያ ይኖረዋል። `requiresRestart: true` ያለው ጠቋሚ
> ወዲያውኑ ይቀመጣል፣ ነገር ግን ዳግም የሚነበበው ሂደቱ ሲጀምር ብቻ ነው — እሱን መቀያየር በዳሽቦርዱ ውስጥ
> **"አገልጋዩን ዳግም ያስጀምሩ"** የሚል ሰንደቅ ያሳያል።

---

## የባንዲራዎች ካታሎግ

በ6 ምድቦች የተከፋፈሉ 76 ባንዲራዎች። **ነባሪ** ማለት የትርጉሙ ነባሪ እሴት ነው — ይህም
የDB መተኪያም ሆነ የአካባቢ ተለዋዋጭ በማይኖርበት ጊዜ ጥቅም ላይ የሚውለው እሴት ነው።

### ደህንነት (10)

| ቁልፍ                                     | ዓይነት | ነባሪ      | መግለጫ                                                                                                                                                                                             |
| --------------------------------------- | ---- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REQUIRE_API_KEY`                       | ቡሊያን | `false`  | ለሁሉም ገቢ ጥያቄዎች የAPI ቁልፍ እንዲኖር አስገዳጅ ያድርጉ።                                                                                                                                                         |
| `INPUT_SANITIZER_ENABLED`               | ቡሊያን | `true`   | ለሁሉም ጥያቄዎች የግቤት ማጽዳትን ያንቁ።                                                                                                                                                                       |
| `INJECTION_GUARD_MODE`                  | ዝርዝር | `off`    | የፕሮምፕት ማስገባት መከላከያ ሁነታ። እሴቶች፦ `off`፣ `warn`፣ `block`፣ `redact`።                                                                                                                                  |
| `PII_REDACTION_ENABLED`                 | ቡሊያን | `false`  | PIIን ከጥያቄዎች ያጥፉ (`INPUT_SANITIZER_MODE` ላይ የማይመሠረት)።                                                                                                                                             |
| `PII_RESPONSE_SANITIZATION`             | ቡሊያን | `false`  | PIIን ከአቅራቢ ምላሾች ያጽዱ።                                                                                                                                                                             |
| `PII_RESPONSE_SANITIZATION_MODE`        | ዝርዝር | `redact` | ለPII ምላሽ ማጽዳት የሚያገለግል ሁነታ። እሴቶች፦ `redact`፣ `warn`፣ `block`፣ `off`።                                                                                                                               |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | ቡሊያን | `true`   | ወደ የግል/ውስጣዊ IP ክልሎች የሚላኩ ወጪ ጥያቄዎችን ያግዱ።                                                                                                                                                          |
| `ALLOW_API_KEY_REVEAL`                  | ቡሊያን | `false`  | ማንነታቸው የተረጋገጠ የዳሽቦርድ ተጠቃሚዎች የተሸፈኑ እሴቶችን ብቻ ከማየት ይልቅ የተከማቹ የAPI ቁልፎችን እንዲያሳዩ ይፍቀዱ።                                                                                                                |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | ቡሊያን | `false`  | በAUTH ሎግ መስመሮች ውስጥ የመለያ ቅድመ ቅጥያን ያካትቱ (ለምሳሌ፦ "<provider> መለያ ጥቅም ላይ እየዋለ ነው፦ abc12345...")። የመለያ መለያዎች ከጋራ/ባለብዙ ተከራይ የሂደት ሎጎች እንዲሸፈኑ በነባሪ ተሰናክሏል። ከDebug Mode ነጻ ነው፤ Debug Modeን መቀየር ይህን አያሳይም። |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | ቡሊያን | `false`  | OIDC ሲነቃ ተጠቃሚዎች በOIDC Single Sign-On ብቻ ማንነታቸውን ማረጋገጥ እንዲችሉ በይለፍ ቃል መግባትን ያሰናክሉ። ሲሰናከል (ነባሪ) በይለፍ ቃል መግባትም ሆነ OIDC ይገኛሉ።                                                                         |

### አውታረ መረብ (18)

| ቁልፍ                                             | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------- | ------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓         | የTLS አሻራ ድብቅ ሁነታን አንቃ።                                                                                                                                                                                                                                                                                                                             |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |           | የ /v1/audio/* መስመሮች localhost ውጭ በሚስተናገዱ OpenAI-ተኳሃኝ የአቅራቢ ኖዶችን እንዲጠቀሙ ፍቀድ። በነባሪነት ጠፍቷል — ኦዲዮን ወደ ርቀት አስተናጋጅ ማዞር የመውጫ ማንነትን ይለውጣል፣ ስለዚህም ይህ ግልጽ የኦፕሬተር ውሳኔ መሆን አለበት። የLoopback ኖዶች ሁልጊዜ የተፈቀዱ ሲሆኑ በዚህ አይነኩም።                                                                                                                                       |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |           | POST /v1/rerank (እና የማህደረ ትውስታ ሞተሩ የloopback rerank ደረጃ) localhost ውጭ በሚስተናገዱ OpenAI-ተኳሃኝ የአቅራቢ ኖዶችን እንዲጠቀም ፍቀድ። በነባሪነት ጠፍቷል — ወደ ርቀት አስተናጋጅ ማዞር የመውጫ ማንነትን ይለውጣል፣ ስለዚህም ይህ ግልጽ የኦፕሬተር ውሳኔ መሆን አለበት። የLoopback ኖዶች ሁልጊዜ የተፈቀዱ ናቸው፤ የርቀት ኖዶች የአቅራቢውን የወጪ URL ፖሊሲም ማለፍ አለባቸው።                                                                        |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |           | ለአንድ ግንኙነት ምንም proxy ባልተመደበበት ጊዜ፣ ከመዝገቡ ውስጥ የመጀመሪያውን የሚሰራ proxy በራስ-ሰር ምረጥ። በነባሪነት ጠፍቷል (አለበለዚያ በመዝገቡ ውስጥ ያለ ማንኛውም proxy ዓለም አቀፍ ተተኪ ይሆናል — #3332)።                                                                                                                                                                                                |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |           | የproxy ተደራሽነት ቅድመ-ምርመራዎች ሳይሳኩ ሲቀሩ፣ የOAuth እና የአቅራቢ ማረጋገጫ ፍሰቶች የተወሰነላቸውን proxy አልፈው በቀጥታ እንዲገናኙ ፍቀድ። ይህ የመውጫ IPን ሊለውጥ ስለሚችል በነባሪነት ጠፍቷል።                                                                                                                                                                                                            |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |           | ለባለብዙ-መለያ የማዞሪያ አስፈጻሚ የኔትወርክ ልዩ ሁኔታ (ጊዜው ማለፍ፣ ግንኙነት ውድቅ መደረግ/ዳግም መጀመር) ሲከሰት፣ ያልተሳካው መለያ የተለየ proxy ከሌለው፣ እያንዳንዱን መልሶ ከመሞከር ይልቅ አጭር የማቀዝቀዣ ጊዜ ተግብር እና ለቀሪው ጥያቄ proxy የሌላቸውን ሌሎች መለያዎች ዝለል። በነባሪነት በርቷል (ደህንነቱ የተጠበቀ፦ የመውጫ IP ለውጥ የለም፤ በጋራ-መውጫ መለያዎች ላይ የመዘግየት/የማቀዝቀዣ ጊዜ አደጋን ብቻ ይቀንሳል)። proxy በሌለው የመጀመሪያ ውርወራ ላይ የሚደረገውን ፈጣን ማስተላለፍ ለመመለስ አሰናክል።   |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |           | የProxy ስብስቦች እና የopencode በየመለያው ማዞር ልክ አሁን ያልተሳካን proxy (ውድቅ የተደረገ TCP ምርመራ ወይም በእሱ በኩል የተቀበለ 429) በእያንዳንዱ ድግግሞሽ እስከ ከፍተኛ ገደብ ድረስ በእጥፍ ለሚጨምር በየሂደቱ ጊዜ እንደገና ማቅረብ ያቆማሉ። ምንም የproxy ሁኔታ አይጻፍም፤ እያንዳንዱ እጩ ወደ ጎን ከተቀመጠ ምርጫው አይለወጥም። በነባሪነት ጠፍቷል።                                                                                                      |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |           | በዳሽቦርዱ ውስጥ ከproxy ስብስብ ስር፣ ባለፉት 24 h ስንት የታዩ የመውጫ IPዎች አባላቱን እንዳገለገሉ እና ስንት ግንኙነቶች እንደተጠቀሙባቸው አሳይ። ለንባብ-ብቻ ነው፣ ከproxy መዝገብ የሚሰላ ሲሆን ለማዞሪያ ፈጽሞ ጥቅም ላይ አይውልም። በነባሪነት ጠፍቷል።                                                                                                                                                                           |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |           | ለOpenCode አስፈጻሚ፣ በዥረት የሚተላለፍ Responses ምላሽ የመጀመሪያውን የይዘት ባይት ተከታተል (መስኮት፦ `RESPONSES_FIRST_BYTE_TIMEOUT_MS`፣ ነባሪ `15000`)። ከመስኮቱ በላይ ዝም ብሎ የሚቆይ የ2xx Responses ዥረት እንደተቋረጠ ይቆጠራል፦ መለያው ይቀዘቅዛል እና ጥያቄው አንድ ጊዜ ወደ ቀጣዩ መለያ ይዞራል፤ ሁለተኛ መቋረጥ በፍጥነት እንዲሳካ ያደርገዋል። በነባሪነት ጠፍቷል፦ የተቋረጡ ዥረቶች እስከ ዥረቱ ዝግጁነት የጊዜ ገደብ ድረስ የዛሬውን መጠበቅ ይቀጥላሉ።                    |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |           | OpenCode አስፈጻሚ፦ `user_blocked` እምቢታን የያዘ 403/451 ሲከሰት (የጂኦግራፊ ገደብ ወይም የCloudflare አሻራ ውድቅ ማድረግ ካልሆነ)፣ ውድቅ የተደረገውን መለያ ለጊዜው አቀዝቅዞ በእያንዳንዱ ጥያቄ ቢበዛ አንድ ጊዜ ወደ ቀጣዩ መለያ ይዘዋወራል፤ ሁለተኛ እምቢታ የስኬት ምልክት ሳይደረግበት እንዳለ ይመለሳል። በነባሪ ጠፍቷል፦ ከላይኛው አገልግሎት የተሰጠ የተጠቃሚ እገዳን በሌላ መንገድ ማለፍ እገዳውን እንደመሸሽ ሊታይ እና ምልክቱን በመላው የመለያዎች ስብስብ ሊያሰራጭ ይችላል።                     |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |           | OpenCode ማዘዋወር፦ ሁለት ተከታታይ ጊዜያዊ የላይኛው አገልግሎት ውድቀቶች (5xx ወይም ባዶ 400) ካጋጠሙ በኋላ፣ ወደ ቀጣዩ መለያ ከመሄድ በፊት ባለበት ያቆማል — ከ1.5 ሰከንድ ጀምሮ በእያንዳንዱ ተጨማሪ ውድቀት ጊዜው እጥፍ ይሆናል፣ በእያንዳንዱ ማቆሚያ ከ6 ሰከንድ እና በእያንዳንዱ ጥያቄ ከ10 ሰከንድ እንዳይበልጥ ይገደባል፣ ደንበኛው ግንኙነቱን ሲያቋርጥ ይዘለላል፤ ያልተሳካው የምላሽ አካል ከመጠበቁ በፊት ይለቀቃል። በነባሪ ጠፍቷል፦ ወደ ምትኬ መቀየሩ ወዲያውኑ እንዲከናወን ይቆያል።                       |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |           | OpenCode ማዘዋወር፦ ተደጋጋሚ ጊዜያዊ 429 ምላሾች (ወይም አዲስ የመለያዎች ስብስብ ጫና ምልክት) ከተከሰቱ በኋላ ጥያቄውን በየጊዜው ከሚላክ የሕይወት ምልክት ጋር አቁሞ ያቆየዋል፣ ከዚያም መላውን የመለያዎች ስብስብ በአንድ ጊዜ ከማሰማራት ይልቅ እስከ 3 ተከታታይ መለያዎች የተገደበ አንድ ዙር እንደገና ያስኬዳል። በነባሪ ጠፍቷል፦ እያንዳንዱ 429 እንደቀድሞው በትክክል ወደ ቀጣዩ መለያ ያዘዋውራል።                                                                                  |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |           | በተተረጎሙ የዥረት ዙሮች ላይ፣ የላይኛው አገልግሎት ዙር ጥቅም ላይ የሚውል ይዘት ካልያዘ (የምክንያት ማብራሪያ ብቻ ያለው ማጠናቀቂያ ወይም ዜሮ ጠቃሚ ክፍሎች)፣ ማንኛውም ነገር ለደንበኛው ከመጋለጡ በፊት በመደበኛው የማረጋገጫ መረጃ መንገድ የተገደቡ ድጋሚ ሙከራዎችን (እስከ `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`) ያካሂዳል። በነባሪ ጠፍቷል፦ ባዶ ዙሮች አሁን ያለውን ባህሪ (ባዶ 200 ወይም ባዶ-ይዘት 502) ይይዛሉ።                                                         |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |           | OpenCode ማዘዋወር፦ እንደ እውነተኛ የፍጥነት ገደብ በተመደበው የመጀመሪያው 429 ላይ (ሊተነተን የሚችል `Retry-After` ወይም የፍጥነት/አጠቃቀም ገደብን የሚጠቅስ የምላሽ አካል) የመለያዎችን ተከታታይ ሙከራ አቁሞ ያንን የላይኛው አገልግሎት 429 ሳይቀይር ይመልሳል። ያልተመደቡ 429 ምላሾች ማዘዋወራቸውን ይቀጥላሉ። በነባሪ ጠፍቷል፦ ነፃው ደረጃ በእያንዳንዱ የወጪ IP የተገደበ ነው (#9611)፣ ስለዚህ እያንዳንዱ 429 ያዘዋውራል፣ እና ሁሉም መለያዎች ከተሞከሩ በኋላ የመጨረሻው የላይኛው አገልግሎት 429 ይመለሳል። |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓         | ለMITM ተኪው የTLS ሰርተፍኬት ማረጋገጫን ያሰናክላል። **አደገኛ ነው።**                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |           | ወደ የግል/ውስጣዊ አውታረ መረቦች የሚያመለክቱ የአቅራቢ URL-ዎችን ይፈቅዳል።                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |           | በአካባቢያዊ/የግል አድራሻዎች (127.0.0.1, localhost, LAN) ላይ አቅራቢዎችን ማከል/ማረጋገጥ ይፈቅዳል። በነባሪ በርቷል (አካባቢያዊ-ቅድሚያ)፤ የሕዝብ አድራሻዎችን ብቻ ለመፍቀድ ጥብቅ እገዳ ያሰናክሉት። የደመና ሜታዳታ እንደታገደ ይቆያል።                                                                                                                                                                                   |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓         | ከClaude Code ጋር ተኳሃኝ የሆነ የአቅራቢ ሁነታን ያነቃል።                                                                                                                                                                                                                                                                                                          |

### ፖሊሲዎች (5)

| ቁልፍ                             | ዓይነት    | ነባሪ        | መግለጫ                                                                                                                                                           |
| ------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | የመሣሪያ አጠቃቀም ፖሊሲ ማስፈጸሚያ ሁነታ። እሴቶች፦ `disabled`፣ `warn`፣ `block`።                                                                                                 |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | በአጠቃቀም ቅጦች ላይ በመመስረት የፍጥነት ገደብን በራስ-ሰር አንቃ።                                                                                                                    |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | ለቀጥታ ነጠላ-ሞዴል ጥያቄዎች የOmniRouteን አካባቢያዊ የአውድ-መስኮት / ከፍተኛ-የግቤት-ቶከን ማረጋገጫ ዝለል። የወደላይ ፍሰት ገደቦች አሁንም ተፈጻሚ ናቸው።                                                       |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | ዒላማው ሞዴል የሚያስፈልጉት ችሎታዎች (እይታ፣ መሣሪያዎች፣ የተዋቀረ ውጤት፣ የአውድ መስኮት) ከሌሉት፣ ጥያቄዎችን ከማስተላለፍ በፊት ውድቅ አድርግ። ይህም የኮምቦ-ንብርብር ተኳኋኝነት ማጣሪያን የሚያልፉ ቀጥተኛ የነጠላ-አቅራቢ ጥያቄዎችን ይከላከላል። |
| `RADAR_ENABLED`                 | boolean | `false`    | የOmniRoute Radar ሞጁልን (የካታሎግ ምግብ ማሳያዎችን እና ማመሳሰልን) አንቃ። በነባሪ ጠፍቷል፤ ማንቃት UIን ብቻ ይከፍታል — የውሂብ ማመሳሰል የተለየ የመርጦ-መግባት ሂደት ሆኖ ይቀጥላል።                                 |

### የአሂድ ጊዜ (33)

| ቁልፍ                                         | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------------------- | ------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | ቡሊያን    | `true`  |           | combo routing ሞዴሎችን ሲቀይር የውይይት ማጠቃለያዎችን ይፍጠሩ እና ያስገቡ። የሞዴል ቅያሬዎችን እንደ ተነጣጠሉ ለመቁጠር እና ለሁሉም ነባርና ወደፊት ለሚፈጠሩ combos የጀርባ handoff ጥያቄዎችን ለመከላከል ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                    |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | ቡሊያን    | `true`  |           | ወደ ደንበኞች ከማስተላለፍዎ በፊት የውስጥ commentary-phase የውጤት ንጥሎችን ከResponses API passthrough streams ያስወግዱ። ጥሬ upstream commentary ለመቀበል ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | ቡሊያን    | `true`  |           | የMCP መሣሪያ መዳረሻ ላይ የscope ገደቦችን ተፈጻሚ ያድርጉ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | ቡሊያን    | `false` |           | የtoken አጠቃቀምን ለመቀነስ የMCP መሣሪያ መግለጫዎችን ይጭመቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | ቡሊያን    | `false` |           | በruntime ጊዜ የጀርባ ተግባር ሂደትን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | ቡሊያን    | `false` | ✓         | ሁሉንም የጀርባ አገልግሎቶች (quota refresh፣ sync፣ ወዘተ) ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |           | የፕሮጀክት ደረጃ RTK ማጣሪያዎችን ያለማረጋገጥ እመን።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓         | በማስመጣት ጊዜ የቅጽበታዊ ዳሽቦርድ WebSocket አገልጋይን ጀምር (በነባሪ port 20132)።                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |           | Codex Responses-over-WebSocket ማጓጓዣን እንዲጠቀም ፍቀድ። ሲጠፋ፣ Codex ወደ HTTP Responses ይመለሳል።                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |           | Codex የአካባቢውን app-server WebSocket JSON-RPC ማጓጓዣ (`codexTransport=app-server`) እንዲጠቀም ፍቀድ። ሲጠፋ፣ app-serverን ለመጠቀም የተመረጡ ግንኙነቶች ወደ ሌሎቹ የCodex ማጓጓዣዎች ይመለሳሉ።                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |           | በጀታቸው ያለቀባቸውን ጥያቄዎች ወደ ድንገተኛ ነፃ ተተኪ አቅራቢ/ሞዴል ላክ። (ከታች [የድንገተኛ በጀት ተተኪ](#emergency-budget-fallback)ን ይመልከቱ።)                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |           | ምንም የምላሽ ባይቶች ወደ ደንበኛው ከመድረሳቸው በፊት ለተቋረጡ የላይኛው አገልግሎት SSE ዥረቶች ግልጽ የቅድመ ድጋሚ ሙከራን አንቃ።                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |           | ባይቶች ወደ ደንበኛው ከደረሱ በኋላ የዥረት መልሶ ማግኘት ምላሽን እንደገና እንዲጠይቅና እንዲያዋህድ ፍቀድ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |           | የመካከለኛ ዥረት ቀጣይነትን ለመሣሪያ ጥሪ ደህንነቱ የተጠበቀ አድርግ፦ አንድ ጊዜ የመሣሪያ ጥሪ ከተላከ (በሂደት ላይ ወይም አስቀድሞ በ `finish_reason` `tool_calls` ከተጠናቀቀ) በኋላ የተቋረጠ ዥረትን ፈጽሞ አትቀጥል፣ እንዲሁም ሙሉውን በጀት ከማጥፋት ይልቅ ከአንድ ባዶ ቀጣይነት በኋላ ዝጋ። ሲጠፋ፦ የልቀት ባህሪ።                                                                                                                                                                                                                                                                                                                   |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |           | SSE ዥረት ምንም ጠቃሚ frame ከማውጣቱ በፊት ሲዘጋና የተወሰነው የተመሳሳይ-ግንኙነት ዳግም ሙከራ ሲያልቅ፣ አንድ ጊዜ ወደ sibling ግንኙነት fail over ያድርጉ፤ ጥቅም ላይ የሚውል sibling ከሌለ የመጀመሪያው `STREAM_EARLY_EOF` 502 ይመለሳል። በነባሪ ጠፍቷል፦ early-EOF ከተመሳሳይ-ግንኙነት ዳግም ሙከራ በኋላ እንደ terminal ይቆያል።                                                                                                                                                                                                                                                                                         |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |           | በ`/v1/models` ምላሾች ውስጥ ለእይታ ምቹ የሆኑ የስም መስኮችን ያካትቱ። የmodel IDዎችን ብቻ ለሚጠብቁ clients ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |           | በ/v1/models ውስጥ የmodel IDዎች ቅድመ ቅጥያ እንዴት እንደሚያገኙ ይቆጣጠራል። 'dual' (ነባሪ) ለኋላ-ተኳኋኝነት የalias እና የcanonical provider-id ቅድመ ቅጥያዎችን ሁለቱንም ያወጣል። 'alias' አጭሩን የalias ቅድመ ቅጥያ ብቻ ያወጣል (ለምሳሌ ds-web/model፣ deepseek-web/model ሳይሆን)። 'canonical' ሙሉውን የprovider-id ቅድመ ቅጥያ ብቻ ያወጣል። እሴቶች፦ `dual`፣ `alias`፣ `canonical`።                                                                                                                                                                                                                         |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |           | ለmodel intelligence ደረጃዎች ወቅታዊ የArena AI leaderboard ELO ማመሳሰልን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |           | Claude Code gateway model discovery Claude ያልሆኑ modelsን እንዲዘረዝር፣ በ`/v1/models` ላይ የ`claude/<provider>/<model>` mirror idዎችን ያስተዋውቁ። የሶስት-ደረጃ gate ዓለም አቀፍ ደረጃ (env ከdashboard override ይቀድማል)። [የClaude Code ውቅር](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)ን ይመልከቱ።                                                                                                                                                                                                    |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |           | ለno-think/<provider>/<model> gateway aliases ዋና ማብሪያ። ሲበራ (ነባሪ)፦ /v1/models ለእያንዳንዱ ብቁ thinking-capable Claude model የno-thinking variant ያስተዋውቃል፣ እና በጥያቄ ላይ የተላከ no-think/ id reasoning ታፍኖ ወደ እውነተኛው model ይመለሳል። ሲጠፋ፦ ምንም variants አይተዋወቁም፣ እና no-think/ id እንደማንኛውም ያልታወቀ model id ይቆጠራል። ይህ እስከበራ ድረስ የእያንዳንዱ model ModelSpec.noThinkingAlias opt-in/opt-out አሁንም ተግባራዊ ይሆናል።                                                                                                                                                   |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |           | በ/v1/models catalog ውስጥ የthinking level variantsን (ለምሳሌ -low፣ -medium፣ -high) ማመንጨትን ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓         | ለprovider dispatch (#9654) በtenant የሚለያዩ adaptive virtual admission lanesን ያንቁ፦ የአንድ tenant burst ከእንግዲህ ሌላውን 503 እንዲመልስ አያደርገውም። `OMNIROUTE_CHAT_VIRTUAL_LANES` env var ከዚህ dashboard override ይቀድማል፤ ለውጦች server ዳግም ሲጀምር ተግባራዊ ይሆናሉ።                                                                                                                                                                                                                                                                                               |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |           | ቀኖናዊ ባለቤታቸው ንቁ ማረጋገጫ የሌለው፣ ነገር ግን ንቁ ማረጋገጫ ያለው passthrough gateway የሚያዘዋውራቸው ሞዴሎችን የ<gateway-alias>/<model> mirror ids በ/v1/models ላይ ያስተዋውቃል። ማስጠንቀቂያ፦ በአጠቃላይ ሲነቃ ለሁሉም ደንበኞች የካታሎግ ግቤቶችን ይጨምራል።                                                                                                                                                                                                                                                                                                                                      |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |           | ከNew-API / One-API / Sub2API aggregator ጋር ተኳሃኝ ለሆኑ nodes የሂሳብ ቀሪ ማወቂያን ያንቁ። ሲነቃ፣ aggregator flag የተዘጋጀላቸው ተኳሃኝ nodes የሂሳብ ቀሪያቸውን በdashboard እና በquota-preflight routing ውስጥ ሪፖርት ያደርጋሉ።                                                                                                                                                                                                                                                                                                                                              |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |           | ሞዴሉ ደንበኛው ሊጠቀምበት የሚችል ምላሽ እስኪመልስ ድረስ በserver ባለቤትነት የሚተዳደሩ non-streaming tool calls እንዲቀጥሉ ያድርጉ።                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |           | የፍለጋ ስታቲስቲክስ እና የቅርብ ጊዜ ፍለጋዎች አሁንም ንቁ connection ያላቸውን providers ብቻ ይቆጥራሉ (እንደ duckduckgo-free ያሉ keyless providers ሁልጊዜ ይቆጠራሉ)። ሲጠፋ፣ እያንዳንዱን የተያዘ የፍለጋ ረድፍ ከprovider id ጋር ያቆያል።                                                                                                                                                                                                                                                                                                                                                     |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |           | የdashboard provider ገጾች፦ Free badgeን provider በሚያከብራቸው ምልክቶች ላይ ብቻ ያሳዩ — የdisplay-name ግምታዊ ዘዴን፣ boolean ያልሆኑ free fieldsን እና የተመዘገበ free tier በሌላቸው registered providers ላይ ያሉ :free suffixesን ያስወግዳል። ሲጠፋ፣ ታሪካዊውን የbadge ደንብ ያቆያል።                                                                                                                                                                                                                                                                                                  |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |           | በተዋሃዱ 429/503 unavailable ምላሾች ላይ፣ የተወሰነ የወደፊት ዳግም መሞከሪያ ጊዜ በማይታወቅበት ጊዜ `Retry-After`ን ይተዉ (ሰው ሠራሽ 1s ከመጠቀም ይልቅ)፣ `error.retry_after_provenance` (`signal` \| `none`)ን ይጨምሩ፣ እንዲሁም combo drain paths ከJSON እና plain-text upstream bodies ውስጥ በስድ ንባብ የተጻፉ የዳግም መሞከሪያ ፍንጮችን እንዲያነቡ ይፍቀዱ። ይህ field በ`unavailableResponse()` በተገነቡ ምላሾች ላይ ብቻ ይታያል፤ ሌሎች የ429/503 bodies ሳይለወጡ ይቀራሉ።                                                                                                                                                      |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |           | fallback-only-on-quota-exhaustion ተብሎ ምልክት የተደረገበት `priority` combo target፣ quota አለመሆኑ በእርግጥ ሊረጋገጥ በሚችል ምክንያት (provider circuit breaker open፣ predictive latency skip) comboውን ሲያቆም፣ quota የሚመስለውን 503 ከመመለስ ይልቅ 502 ይመልሱ። Lockout፣ cooldown፣ unavailable፣ exhaustion እና concurrency-cap stops 503ን ይቀጥላሉ።                                                                                                                                                                                                                           |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |           | ባዶ Mistral 401 (`{"detail":"Unauthorized"}`፣ ግልጽ auth signal የሌለው) ለተሻረ key እና quotaው ላለቀ key ተመሳሳይ ነው። ሲበራ፣ connectionን `expired` ብሎ ከማቆም ይልቅ cooldown ውስጥ ያስገባዋል፤ ይህም በእያንዳንዱ connection በሰዓት ቢበዛ 3 ጊዜ ነው። ቀጣዩ ግን ያቆመዋል፣ ስለዚህ የተሻረ key አሁንም ወደ ተገቢው ሁኔታ ይደርሳል። በነባሪ ጠፍቷል፦ እያንዳንዱ ባዶ Mistral 401 እንደበፊቱ connectionን ያቆማል።                                                                                                                                                                                                            |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |           | ከቀዘቀዘው የማይለወጥ seed ይልቅ፣ የOAuth bearer tokenን በመጠቀም ለ`xai-oauth` ግንኙነቶች የቀጥታውን የxAI ሞዴል ካታሎግ ከ`https://api.x.ai/v1/models` ያምጡ። በነባሪ ጠፍቷል፦ `xai-oauth` የማይለወጠውን seed ያለምንም ለውጥ ማቅረቡን ይቀጥላል። ማንኛውም የመፍታት ስህተት ሲከሰት፣ discovery ወደ seed ይመለሳል (x.ai በዚህ endpoint ላይ OAuth bearer ይቀበል እንደሆነ አልተረጋገጠም)።                                                                                                                                                                                                                                    |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |           | ራስ-ሰር የማጽዳት sweep ከ`OMNIROUTE_BATCH_RETENTION_DAYS` በላይ የቆዩ የመጨረሻ ሁኔታ ላይ የደረሱ (completed/failed/cancelled/expired) የBatch API jobsን ከየመስመሩ checkpoints ጋር እንዲሰርዝ፣ እንዲሁም የራሳቸው `expires_at` ያለፈባቸው የተሰቀሉ files የBLOB ይዘትን እንዲያጸዳ ይፍቀዱ። በነባሪ ጠፍቷል፦ አንድ operator በፈቃዱ እስኪያነቃው ድረስ እያንዳንዱ ነባር install ይህን ውሂብ ልክ እንደቀድሞው ያቆያል። በoperator የሚነሳው `DELETE /api/v1/batches/delete-completed` route በሁለቱም ሁኔታ አይነካም — ይህ የተለየ፣ ቅድመ ሁኔታ የሌለው ይፋዊ API contract ነው።                                                                               |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |           | የመረጠውን Antigravity account ለመረጠው request streaming lifecycle ያስይዙ፤ ይህም በተመሳሳይ ጊዜ የሚከናወን retry ወይም credential handoff አስቀድሞ በሂደት ላይ ላለ stream የተመደበ accountን እንደገና እንዳይመርጥ ያደርጋል። reservationኑ በ(connection, callable upstream model) ወሰን ይገደባል፤ ስለዚህ አንድ account አሁንም ሁለት የተለያዩ modelsን በአንድ ጊዜ ማገልገል ይችላል። ለዚያ model ሁሉም ብቁ accounts አስቀድመው leased ሲሆኑ፣ requestኑ በተጨናነቀ account ላይ ከመደራረብ ይልቅ የተዋቀረ 503 `antigravity_pool_busy` ከተገደበ `Retry-After` ጋር ይመልሳል። በነባሪ ጠፍቷል፦ account selection ልክ እንደቀድሞው ይቆያል፣ ምንም reservationም አይደረግም። |

### CLI (5)

| ቁልፍ                                   | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                            |
| ------------------------------------- | ------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓         | ለሁሉም የCLI clients compatibility modeን ያንቁ።                                                                                                                                      |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |           | የmodel alias compatibility layerን ያንቁ።                                                                                                                                          |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |           | ራስ-ሰር የpricing data synchronizationን ያንቁ (`PRICING_SYNC_ENABLED` environment variableንም ይፈልጋል)።                                                                                 |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |           | ከprovider model sync በኋላ፣ ከቀጥታው catalog በመነሳት ~/.codex/*.config.toml profile filesን በራስ-ሰር (እንደገና) ይጻፉ። ንቁውን/ነባሪውን Codex config ፈጽሞ አይለውጥም። በነባሪ ጠፍቷል።                          |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |           | ከprovider model sync በኋላ፣ ከቀጥታው catalog በመነሳት ~/.claude/profiles/<name>/settings.json Claude Code profilesን በራስ-ሰር (እንደገና) ይጻፉ። ንቁውን/ነባሪውን Claude config ፈጽሞ አይለውጥም። በነባሪ ጠፍቷል። |

### ጤና (5)

| ቁልፍ                                       | ዓይነት    | ነባሪ     | መግለጫ                                                                                                                                                                                                                     |
| ----------------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | የአካባቢያዊ instance ጤና ማረጋገጫ endpointን ያሰናክላል።                                                                                                                                                                              |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | የtoken ማረጋገጫ ጤና ፍተሻን ያሰናክላል።                                                                                                                                                                                             |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | በskills sandbox አካባቢ ውስጥ የnetwork መዳረሻን ያነቃል።                                                                                                                                                                            |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | በproxy ጤና ቅኝት ውስጥ፣ targetው ያልተቀበለው probe (401/403/429) የproxyውን ተከታታይ-ውድቀት ቆጠራ ዳግም ያስጀምራል። በነባሪነት ጠፍቷል፦ አለመቀበል ገለልተኛ ሆኖ ይቆያል (#10654)። 5xx በሁለቱም ሁኔታ የማያረጋግጥ ሆኖ ይቆያል፤ አለመቀበል proxyን በፍጹም አያስወግድም፣ አያሰናክልም ወይም ዳግም አያነቃም። |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | የserver መጀመሪያ ማስነሳትን እስኪጠናቀቅ ከማገድ ይልቅ፣ serverው ጥያቄዎችን መቀበል ከጀመረ በኋላ (በ`setImmediate` በኩል) የመነሻ DB integrity/health checkን ያስኬዳል (#13717)። በነባሪነት ጠፍቷል፦ የመጀመሪያ ማስነሳቱ ከዚህ PR በፊት እንደነበረው በትክክል ይታገዳል።                      |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` እና የቆየው alias
> `INJECTION_GUARD_BLOCK_THRESHOLD` የ`INJECTION_GUARD_MODE`ን `block` mode
> ያስተካክላሉ፣ ነገር ግን በ
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> የሚነበቡ መደበኛ environment variables ናቸው፣ feature flags አይደሉም፦ የDB override ወይም dashboard toggle የላቸውም።
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)ን ይመልከቱ።

> [!NOTE]
> `Restart` column `requiresRestart: true` ያላቸውን flags ያመለክታል — እሴቱ
> ወዲያውኑ ይቀመጣል፣ ነገር ግን processው ዳግም ከተጫነ በኋላ ብቻ ተግባራዊ ይሆናል። Enum
> flags ከተፈቀደላቸው set ውጭ ያለን ማንኛውንም እሴት ውድቅ ያደርጋሉ (በserver-side ላይ በ
> `setFeatureFlagOverride()` እና በREST `PUT` handler በሁለቱም ይረጋገጣል)።

---

## ፍላጎችን ማብራትና ማጥፋት

### ዳሽቦርድ

ወደ **ዳሽቦርድ → ቅንብሮች → የባህሪ ፍላጎች**
(`/dashboard/settings/feature-flags`) ይሂዱ። ሰንጠረዡ
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
የሚከተሉትን ይደግፋል፦

- በቁልፍ ወይም በመግለጫ **መፈለግ**፣ እንዲሁም በምድብ **ማጣራት** (በተጨማሪም ሰው ሠራሽ
  **ዳግም ማስጀመር ይፈልጋል** እይታ)።
- ለቡሊያን ፍላጎች **ማብሪያ/ማጥፊያ** እና ለ enum ፍላጎች **ተቆልቋይ ዝርዝር**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)።
- ውጤታማው እሴት ከየት እንደመጣ የሚያሳይ፣ ለእያንዳንዱ ፍላግ **የምንጭ ባጅ** — `DB`፣ `ENV` ወይም `DEF`።
- ተተኪ እሴቱን ለማስወገድ **ዳግም አስጀምር** አዝራር (ከ`DB` ለሚመነጩ ፍላጎች ብቻ የሚታይ)፣
  እንዲሁም ከታች **ሁሉንም ተተኪ እሴቶች ዳግም አስጀምር** አዝራር።
- `requiresRestart` የሆነ ፍላግ ሲቀየር **ሰርቨሩን ዳግም አስጀምር** ባነር።

### REST API

ሁሉም ክዋኔዎች በአንድ መስመር በኩል ያልፋሉ፦
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts)።
እያንዳንዱ ስልት ማንነቱ የተረጋገጠ የዳሽቦርድ ክፍለ ጊዜ ይፈልጋል (አለበለዚያ `401`)።

#### `GET /api/settings/feature-flags`

እያንዳንዱን ፍላግ ከውጤታማ እሴቱ፣ ምንጩ እና ማጠቃለያው ጋር ይመልሳል።

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "የAPI ቁልፍ ይፈለግ",
      "description": "ለሁሉም ገቢ ጥያቄዎች የAPI ቁልፍ ይፈለግ",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... ሁሉም 75 ፍላጎች
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

አንድ ተተኪ እሴት ያዘጋጁ ወይም ያስወግዱ። የጥያቄ አካል፦ `{ key: string; value?: string }`።
`value`ን አለማካተት ተተኪ እሴቱን ያስወግደዋል (ወደ env / ነባሪው ይመልሰዋል)።

```bash
# የDB ተተኪ እሴት ያዘጋጁ
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# ተተኪ እሴቱን ያስወግዱ ("value" የለም)
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

ምላሹ አዲሱን `effectiveValue`/`source`፣ `previousValue`/
`previousSource` እና `requiresRestart` መልሶ ያሳያል። ያልታወቁ ቁልፎች እና ከተፈቀደው ክልል ውጭ ያሉ enum
እሴቶች በ`400` ውድቅ ይደረጋሉ።

#### `DELETE /api/settings/feature-flags`

**ሁሉንም** የDB ተተኪ እሴቶች በአንድ ጊዜ ያጸዳል፣ እያንዳንዱን ፍላግ ወደ env / ነባሪ
እሴቱ ይመልሳል። `{ cleared: <count>, message: "..." }` ይመልሳል።

> [!NOTE]
> `requiresRestart: true` ያላቸው ፍላጎች ሥራ ላይ የሚውሉት ሂደቱ እንደገና ከተጫነ በኋላ ብቻ ነው።
> የዳሽቦርዱ የዳግም ማስጀመር ሂደት `POST /api/restart`ን ይጠራል፣ ከዚያም ሰርቨሩ እስኪመለስ ድረስ
> `GET /api/health/ping`ን በተደጋጋሚ ይፈትሻል።

---

## የአስቸኳይ ጊዜ በጀት አማራጭ

`OMNIROUTE_EMERGENCY_FALLBACK` (ምድብ `runtime`፣ ነባሪ `true`) በ
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts)
ውስጥ ያለውን የአስቸኳይ ጊዜ ነጻ አማራጭ መንገድ ይቆጣጠራል።
ሲነቃ፣ በጀታቸውን ያሟጠጡ ጥያቄዎች ሙሉ በሙሉ ከመክሸፍ ይልቅ ወደ ነጻ አማራጭ
አቅራቢ/ሞዴል ይመራሉ። ይህን ባህሪ ለማሰናከል እና በጀታቸውን ያሟጠጡ ጥያቄዎች
እንዲከሽፉ ለመፍቀድ፣ በዳሽቦርዱ ማብሪያ/ማጥፊያ፣ በDB ተተኪ፣ ወይም በ
`OMNIROUTE_EMERGENCY_FALLBACK` የአካባቢ ተለዋዋጭ በኩል ወደ `false` (ወይም `0`) ያዘጋጁት።
(በPRs #3741 / #3752 ውስጥ እንደ የዳሽቦርድ ማብሪያ/ማጥፊያ ቀርቧል።)

---

## በተጨማሪ ይመልከቱ

- [የአካባቢ ተለዋዋጮች ማጣቀሻ](./ENVIRONMENT.md) — አብዛኛዎቹ ጠቋሚዎች እዚያ የተመዘገበ ተመሳሳይ ስም ያለው የአካባቢ ተለዋዋጭ አላቸው (የDB መሻር ከእሱ ይቀድማል)።
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — ለእያንዳንዱ ጠቋሚ ትክክለኛው የመረጃ ምንጭ።
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — የመፍታት አመክንዮ (`resolveFeatureFlag`፣ `isFeatureFlagEnabled`፣
  `resolveAllFeatureFlags`)።
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — በ`key_value` ሰንጠረዥ
  `feature_flags` namespace ውስጥ የDB መሻርን በቋሚነት ማከማቸት።
