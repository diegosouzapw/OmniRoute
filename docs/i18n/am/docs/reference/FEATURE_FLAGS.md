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

## የፍላግ ካታሎግ

በ6 ምድቦች የተከፋፈሉ 77 ፍላጎች። **Default** ማለት የፍቺው ነባሪ እሴት ነው — የDB መተኪያም ሆነ የአካባቢ ተለዋዋጭ በማይኖርበት ጊዜ
ጥቅም ላይ የሚውለው እሴት ነው።

### ደህንነት (10)

| ቁልፍ                                     | ዓይነት    | ነባሪ      | መግለጫ                                                                                                                                                                                                 |
| --------------------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | ለሁሉም ገቢ ጥያቄዎች API ቁልፍ እንዲያስፈልግ ያድርጉ።                                                                                                                                                                 |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | ለሁሉም ጥያቄዎች የግቤት ማጽዳትን ያንቁ።                                                                                                                                                                           |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | የፕሮምፕት ኢንጀክሽን መከላከያ ሁነታ። እሴቶች፦ `off`፣ `warn`፣ `block`፣ `redact`።                                                                                                                                     |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | PIIን ከጥያቄዎች ያድበስብሱ (`INPUT_SANITIZER_MODE` ላይ ጥገኛ አይደለም)።                                                                                                                                            |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | PIIን ከአቅራቢ ምላሾች ያጽዱ።                                                                                                                                                                                 |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | ለPII ምላሽ ማጽዳት የሚያገለግል ሁነታ። እሴቶች፦ `redact`፣ `warn`፣ `block`፣ `off`።                                                                                                                                   |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | ወደ የግል/ውስጣዊ IP ክልሎች የሚላኩ ወጪ ጥያቄዎችን ያግዱ።                                                                                                                                                              |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | ማንነታቸው የተረጋገጠ የዳሽቦርድ ተጠቃሚዎች የተሸፈኑ እሴቶችን ብቻ ከማየት ይልቅ የተከማቹ API ቁልፎችን እንዲገልጡ ይፍቀዱ።                                                                                                                     |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | በAUTH ሎግ መስመሮች ውስጥ የመለያ ቅድመ ቅጥያውን ያካትቱ (ለምሳሌ፦ "<provider> መለያን በመጠቀም ላይ፦ abc12345...")። በተጋሩ/ባለብዙ ተከራይ የሂደት ሎጎች ውስጥ የመለያ መለያዎች እንዲድበሰበሱ በነባሪ ተሰናክሏል። ከDebug Mode ነጻ ነው፤ Debug Modeን መቀየር ይህን አይገልጥም። |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | OIDC ሲነቃ፣ ተጠቃሚዎች በOIDC Single Sign-On ብቻ ማንነታቸውን ማረጋገጥ እንዲችሉ በይለፍ ቃል መግባትን ያሰናክሉ። ሲሰናከል (ነባሪው)፣ በይለፍ ቃል መግባትም ሆነ OIDC ይገኛሉ።                                                                          |

### አውታረ መረብ (19)

| ቁልፍ                                             | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------- | ------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓         | የTLS አሻራ ስውር ሁነታን አንቃ።                                                                                                                                                                                                                                                                                                                                    |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |           | የ/v1/audio/* መስመሮች localhost-ን ውጭ በሚስተናገዱ OpenAI-ተኳኋኝ የአቅራቢ ኖዶች እንዲጠቀሙ ፍቀድ። በነባሪነት ጠፍቷል — ኦዲዮን ወደ ርቀት አስተናጋጅ ማስተላለፍ የወጪ ትራፊክ ማንነትን ይለውጣል፣ ስለዚህ ይህ የኦፕሬተሩ ግልጽ ውሳኔ መሆን አለበት። የloopback ኖዶች ሁልጊዜ የተፈቀዱ ሲሆን ተጽዕኖ አይደርስባቸውም።                                                                                                                                   |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |           | POST /v1/rerank (እና የማህደረ ትውስታ ሞተሩ loopback rerank ደረጃ) localhost-ን ውጭ በሚስተናገዱ OpenAI-ተኳኋኝ የአቅራቢ ኖዶች እንዲጠቀም ፍቀድ። በነባሪነት ጠፍቷል — ወደ ርቀት አስተናጋጅ ማስተላለፍ የወጪ ትራፊክ ማንነትን ይለውጣል፣ ስለዚህ ይህ የኦፕሬተሩ ግልጽ ውሳኔ መሆን አለበት። የloopback ኖዶች ሁልጊዜ የተፈቀዱ ናቸው፤ የርቀት ኖዶች ደግሞ የአቅራቢውን የወጪ URL ፖሊሲ ማለፍ አለባቸው።                                                                      |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |           | ለግንኙነት proxy ካልተመደበ፣ ከመዝገቡ ውስጥ የመጀመሪያውን የሚሠራ proxy በራስ-ሰር ምረጥ። በነባሪነት ጠፍቷል (አለበለዚያ በመዝገቡ ውስጥ ያለ ማንኛውም proxy ዓለም አቀፍ አማራጭ ይሆናል — #3332)።                                                                                                                                                                                                                   |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |           | የproxy ተደራሽነት ቅድመ-ምርመራዎች ሲወድቁ፣ OAuth እና የአቅራቢ ማረጋገጫ ፍሰቶች የተወሰነላቸውን proxy አልፈው በቀጥታ እንዲገናኙ ፍቀድ። ይህ የወጪ ትራፊክ IPን ሊለውጥ ስለሚችል በነባሪነት ጠፍቷል።                                                                                                                                                                                                                    |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |           | ለባለብዙ-መለያ rotation executor የአውታረ መረብ ልዩ ሁኔታ (ጊዜው ማለፍ፣ ግንኙነት አለመቀበል/ዳግም መጀመር) ሲከሰት፣ የወደቀው መለያ የራሱ proxy ከሌለው፣ እያንዳንዱን እንደገና ከመሞከር ይልቅ አጭር cooldown ተግብር እና ለቀሪው ጥያቄ proxy የሌላቸውን ሌሎች መለያዎች ዝለል። በነባሪነት በርቷል (ደህንነቱ የተጠበቀ፦ የወጪ ትራፊክ IP ለውጥ የለም፣ በጋራ የወጪ ትራፊክ መለያዎች ላይ የመዘግየት/cooldown አደጋን ብቻ ይቀንሳል)። proxy በሌለው የመጀመሪያ ስህተት ላይ ወዲያውኑ ማስተላለፍን ለመመለስ አሰናክል። |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |           | የOpencode rotation የትኛው መለያ እንዳገለገለ ወይም እንደተዘለለ ይመዘግባል (የተሸፈኑ ids ብቻ፣ ሙሉ የመለያ ids ፈጽሞ አይደሉም) እና የproxy ምዝግብ ግቤቶችን ከጥያቄያቸው ጋር ያገናኛል፤ በዚህም ኦፕሬተሩ የተዘለሉ መለያዎችን ጥቅም ላይ ካልዋሉት መለየት ይችላል። በነባሪነት ጠፍቷል።                                                                                                                                                          |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |           | የProxy ጥርቅሞች እና የopencode በመለያ rotation በቅርቡ የወደቀን proxy (ውድቅ የተደረገ TCP probe፣ ወይም በእሱ በኩል የደረሰ 429) በእያንዳንዱ መደጋገም እስከ ገደቡ ድረስ በእጥፍ ለሚጨምር በሂደት-ደረጃ ጊዜ ውስጥ ዳግም ማቅረብ ያቆማሉ። ምንም የproxy ሁኔታ አይጻፍም፤ እያንዳንዱ እጩ ወደ ጎን ሲቀመጥ ምርጫው ሳይለወጥ ይቆያል። በነባሪነት ጠፍቷል።                                                                                                         |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |           | በdashboard ውስጥ ከproxy ጥርቅም ሥር፣ ባለፉት 24 h ምን ያህል የታዩ የወጪ ትራፊክ IPዎች አባላቱን እንዳገለገሉ እና ምን ያህል ግንኙነቶች እንደተጠቀሙባቸው አሳይ። ለንባብ ብቻ ነው፣ ከproxy ምዝግብ የሚሰላ ሲሆን ለማስተላለፍ ፈጽሞ አይውልም። በነባሪነት ጠፍቷል።                                                                                                                                                                         |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |           | ለOpenCode አስፈጻሚ፣ የሚለቀቅ Responses ምላሽ የመጀመሪያውን የይዘት ባይት ይከታተሉ (ጊዜ መስኮት፦ `RESPONSES_FIRST_BYTE_TIMEOUT_MS`፣ ነባሪ `15000`)። ከጊዜ መስኮቱ በላይ ዝም የሚል የ2xx Responses ዥረት እንደተቋረጠ ይቆጠራል፦ መለያው ለጊዜው እንዲቆይ ይደረጋል እና ጥያቄው አንድ ጊዜ ወደሚቀጥለው መለያ ይዞራል፤ ሁለተኛ መቋረጥ ወዲያውኑ ያሳንፋል። በነባሪ ጠፍቷል፦ የተቋረጡ ዥረቶች የዥረቱ ዝግጁነት ጊዜ እስኪያልፍ ድረስ የአሁኑን የመጠበቅ ባህሪ ይቀጥላሉ።                         |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |           | የOpenCode አስፈጻሚ፦ `user_blocked` እምቢታን በያዘ 403/451 ላይ (የመልክዓ ምድር ገደብ ያልሆነ እና የCloudflare አሻራ ውድቅ መደረግ ያልሆነ)፣ ውድቅ የተደረገውን መለያ ለጊዜው እንዲቆይ ያድርጉ እና በአንድ ጥያቄ ከአንድ ጊዜ ያልበለጠ ወደሚቀጥለው መለያ ያዙሩ፤ ሁለተኛ እምቢታ የስኬት ምልክት ሳይደረግበት እንዳለ ይመለሳል። በነባሪ ጠፍቷል፦ ከላይኛው አገልግሎት የተደረገን የተጠቃሚ እገዳ በማለፍ ማስተላለፍ እንደ ማምለጥ ሊታይ እና ምልክቱን በመላው የመለያዎች ስብስብ ላይ ሊያሰራጭ ይችላል።                 |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |           | የOpenCode ማዞር፦ ሁለት ተከታታይ ጊዜያዊ የላይኛው አገልግሎት ውድቀቶች (5xx ወይም ባዶ 400) ካጋጠሙ በኋላ፣ ከሚቀጥለው መለያ በፊት ቆም ይበሉ — 1.5 ሰከንድ ሲሆን በእያንዳንዱ ተጨማሪ ውድቀት በእጥፍ ይጨምራል፣ ለእያንዳንዱ ማቆም እስከ 6 ሰከንድ እና ለእያንዳንዱ ጥያቄ እስከ 10 ሰከንድ ይገደባል፣ ደንበኛው ሲቋረጥ ግን ይዘለላል፤ ያልተሳካው ይዘት ከመጠበቅ በፊት ይለቀቃል። በነባሪ ጠፍቷል፦ ወደ ተለዋጭ መሄድ ወዲያውኑ ይቀጥላል።                                                              |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |           | የOpenCode ማዞር፦ ከተደጋጋሚ ጊዜያዊ 429ዎች (ወይም አዲስ የስብስብ ጫና ምልክት) በኋላ ጥያቄውን ከልብ ምት ምልክት ጋር ያቁሙ፣ ከዚያም መላውን የመለያዎች ስብስብ በአንድ ጊዜ ከማሰማራት ይልቅ እስከ 3 ተከታታይ መለያዎች የተገደበ አንድ ዙር እንደገና ያጫውቱ። በነባሪ ጠፍቷል፦ እያንዳንዱ 429 ልክ እንደበፊቱ ወደሚቀጥለው መለያ ያዞራል።                                                                                                                              |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |           | በተተረጎሙ የዥረት ዙሮች ላይ፣ የላይኛው አገልግሎት ዙር ጥቅም ላይ የሚውል ይዘት ከሌለው (የማመዛዘን ብቻ ማጠናቀቂያ ወይም ምንም ጠቃሚ ቁራጭ ከሌለ)፣ ምንም ነገር ለደንበኛው ከመጋለጡ በፊት በመደበኛው የማረጋገጫ መረጃ መንገድ የተገደቡ ድጋሚ ሙከራዎችን (እስከ `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`) ያድርጉ። በነባሪ ጠፍቷል፦ ባዶ ዙሮች የአሁኑን ባህሪ (ባዶ 200 ወይም ባዶ-ይዘት 502) ይቀጥላሉ።                                                                           |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |           | የOpenCode ማዞር፦ እንደ እውነተኛ የጥያቄ መጠን ገደብ በተመደበው የመጀመሪያ 429 ላይ (ሊተነተን የሚችል `Retry-After`፣ ወይም የጥያቄ መጠን/አጠቃቀም ገደብን የሚጠቅስ ይዘት) የመለያዎችን ሙከራ ያቁሙ እና ያንን የላይኛው አገልግሎት 429 ሳይቀየር ይመልሱ። ያልተመደቡ 429ዎች ማዞርን ይቀጥላሉ። በነባሪ ጠፍቷል፦ ነጻው ደረጃ በእያንዳንዱ ወጪ IP የተገደበ ነው (#9611)፣ ስለዚህ እያንዳንዱ 429 ያዞራል እና ሁሉም መለያዎች ሲሞከሩ የመጨረሻው የላይኛው አገልግሎት 429 ይመለሳል።                            |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓         | ለMITM ተኪው የTLS ምስክር ወረቀት ማረጋገጫን ያሰናክሉ። **አደገኛ ነው።**                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |           | ወደ የግል/ውስጣዊ አውታረ መረቦች የሚያመለክቱ የአቅራቢ URLዎችን ይፍቀዱ።                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |           | በአካባቢያዊ/የግል አድራሻዎች (127.0.0.1, localhost, LAN) ላይ አቅራቢዎችን ማከል/ማረጋገጥ ይፍቀዱ። በነባሪ በርቷል (አካባቢያዊ-ቅድሚያ)፤ ለጥብቅ የይፋ አድራሻዎች-ብቻ እገዳ ያሰናክሉት። የCloud ሜታዳታ እንደታገደ ይቆያል።                                                                                                                                                                                                |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓         | ከClaude Code ጋር ተኳሃኝ የሆነ የአቅራቢ ሁነታን ያንቁ።                                                                                                                                                                                                                                                                                                                  |

### ፖሊሲዎች (5)

| ቁልፍ                             | ዓይነት    | ነባሪ        | መግለጫ                                                                                                                                                       |
| ------------------------------- | ------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | የመሣሪያ አጠቃቀም ፖሊሲ ማስፈጸሚያ ሁነታ። እሴቶች፦ `disabled`፣ `warn`፣ `block`።                                                                                             |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | በአጠቃቀም ስርዓተ ጥለቶች ላይ ተመስርቶ የፍጥነት ገደብን በራስ-ሰር ያንቁ።                                                                                                           |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | ለቀጥታ ነጠላ-ሞዴል ጥያቄዎች የOmniRouteን አካባቢያዊ የዐውድ መስኮት / ከፍተኛ የግቤት ቶከን ማረጋገጫ ዝለል። የላይኛው አገልግሎት ገደቦች አሁንም ተፈጻሚ ናቸው።                                                |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | የታለመው ሞዴል አስፈላጊ ችሎታዎች (ምስል፣ መሣሪያዎች፣ የተዋቀረ ውጤት፣ የዐውድ መስኮት) ከሌሉት፣ ከማሰራጨት በፊት ጥያቄዎችን ውድቅ ያድርጉ። ይህ የጥምር-ንብርብር ተኳኋኝነት ማጣሪያን የሚያልፉ ቀጥተኛ የነጠላ-አቅራቢ ጥያቄዎችን ይከላከላል። |
| `RADAR_ENABLED`                 | boolean | `false`    | የOmniRoute Radar ሞጁልን (የካታሎግ ምንጭ ማያ ገጾችን እና ማመሳሰልን) ያንቁ። በነባሪ ጠፍቷል፤ ማንቃቱ UIን ብቻ ይከፍታል — የውሂብ ማመሳሰል የተለየ የመርጦ መግቢያ ሆኖ ይቀጥላል።                                |

### የአሂድ ጊዜ (33)

| ቁልፍ                                         | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------------------------- | ------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |           | የጥምር ማዞሪያ ሞዴሎችን ሲቀይር የውይይት ማጠቃለያዎችን ያመንጩ እና ያስገቡ። የሞዴል ቅያሬዎችን እንደ ተናጠል ለማስተናገድ እና ለሁሉም ነባርና ወደፊት ለሚፈጠሩ ጥምሮች የጀርባ ርክክብ ጥያቄዎችን ለመከላከል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                          |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |           | ወደ ደንበኞች ከመተላለፋቸው በፊት ከResponses API ቀጥታ ማስተላለፊያ ዥረቶች ውስጥ የውስጥ አስተያየት-ደረጃ ውጤት ንጥሎችን ያስወግዱ። ጥሬ የላይኛው ምንጭ አስተያየትን ለመቀበል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |           | የMCP መሣሪያ መዳረሻ ላይ የወሰን ገደቦችን ያስፈጽሙ።                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |           | የቶከን አጠቃቀምን ለመቀነስ የMCP መሣሪያ መግለጫዎችን ያጭቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |           | በአሂድ ጊዜ የጀርባ ተግባራትን ማስኬድ ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓         | ሁሉንም የጀርባ አገልግሎቶች (የኮታ ማደስ፣ ማመሳሰል፣ ወዘተ) ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |           | የፕሮጀክት ደረጃ RTK ማጣሪያዎችን ያለ ማረጋገጫ ይመኑ።                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓         | በማስመጣት ጊዜ የቅጽበታዊ ዳሽቦርድ WebSocket አገልጋይን ያስጀምሩ (በነባሪ ወደብ 20132)።                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |           | Codex የResponses-over-WebSocket ማጓጓዣን እንዲጠቀም ይፍቀዱ። ሲጠፋ Codex ወደ HTTP Responses ይመለሳል።                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |           | Codex የአካባቢ app-server WebSocket JSON-RPC ማጓጓዣን (codexTransport=app-server) እንዲጠቀም ይፍቀዱ። ሲጠፋ app-serverን ለመጠቀም የተዋቀሩ ግንኙነቶች ወደ ሌሎች የCodex ማጓጓዣዎች ይመለሳሉ።                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |           | በጀታቸው ያለቀ ጥያቄዎችን ወደ አስቸኳይ ነፃ ምትኬ አቅራቢ/ሞዴል ይምሩ። (ከታች [የአስቸኳይ ጊዜ የበጀት ምትኬ](#emergency-budget-fallback)ን ይመልከቱ።)                                                                                                                                                                                                                                                                                                                                                                        |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |           | ማንኛውም የምላሽ ባይቶች ደንበኛው ጋር ከመድረሳቸው በፊት፣ ለተቋረጡ የላይኛው ምንጭ SSE ዥረቶች ግልጽ የሆነ ቀደምት ዳግም ሙከራን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                            |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |           | ባይቶች ደንበኛው ጋር ከደረሱ በኋላ የዥረት መልሶ ማግኛው ምላሽን እንደገና እንዲጠይቅና እንዲያገናኝ ይፍቀዱ።                                                                                                                                                                                                                                                                                                                                                                                                                |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |           | በዥረት መካከል የሚደረግ ቀጣይነትን ለመሣሪያ ጥሪ አስተማማኝ ያድርጉ፦ የመሣሪያ ጥሪ ከተላከ በኋላ (በሂደት ላይ ያለ ወይም በfinish_reason tool_calls አስቀድሞ የተጠናቀቀ) የተቋረጠ ዥረትን ፈጽሞ አይቀጥሉ፤ እንዲሁም መላውን በጀት ከማውጣት ይልቅ ከአንድ ባዶ ቀጣይነት በኋላ ይዝጉ። ሲጠፋ፦ የልቀት ባህሪ።                                                                                                                                                                                                                                                                          |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |           | አንድ SSE ዥረት ምንም ጠቃሚ frame ሳያወጣ ሲዘጋ እና የተገደበው የተመሳሳይ-ግንኙነት ድጋሚ ሙከራ ሲያልቅ፣ አንድ ጊዜ ወደ sibling connection fail over ያድርጉ፤ ጥቅም ላይ ሊውል የሚችል sibling ከሌለ የመጀመሪያው `STREAM_EARLY_EOF` 502 ይመለሳል። በነባሪ ጠፍቷል፦ early-EOF ከተመሳሳይ-ግንኙነት ድጋሚ ሙከራ በኋላ የመጨረሻ ሁኔታ ሆኖ ይቆያል።                                                                                                                                                                                                                              |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |           | ለእይታ ምቹ የሆኑ የስም መስኮችን በ`/v1/models` ምላሾች ውስጥ ያካትቱ። የሞዴል IDs ብቻ ለሚጠብቁ clients ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                                                                 |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |           | የሞዴል IDs በ/v1/models ውስጥ እንዴት prefix እንደሚደረጉባቸው ይቆጣጠራል። 'dual' (ነባሪ) ወደኋላ ተኳኋኝነትን ለመጠበቅ alias እና canonical provider-id prefixes ሁለቱንም ያወጣል። 'alias' አጭሩን alias prefix ብቻ ያወጣል (ለምሳሌ ds-web/model፣ deepseek-web/model ሳይሆን)። 'canonical' ሙሉውን provider-id prefix ብቻ ያወጣል። እሴቶች፦ `dual`፣ `alias`፣ `canonical`።                                                                                                                                                                         |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |           | ለሞዴል የብልህነት ደረጃዎች ወቅታዊ የArena AI leaderboard ELO syncን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |           | Claude Code gateway model discovery Claude ያልሆኑ ሞዴሎችን እንዲዘረዝር፣ የ`claude/<provider>/<model>` mirror idsን በ`/v1/models` ላይ ያስተዋውቁ። የሶስት-ደረጃ gate ዓለም አቀፍ ደረጃ (env ከdashboard override ይቀድማል)። [የClaude Code ውቅር](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)ን ይመልከቱ።                                                                                                                                                      |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |           | ለno-think/<provider>/<model> gateway aliases ዋና ማብሪያ/ማጥፊያ። ሲበራ (ነባሪ)፦ /v1/models ብቁ ለሆነ እያንዳንዱ thinking-capable Claude model የno-thinking variant ያስተዋውቃል፣ እና በጥያቄ ላይ የተላከ no-think/ id reasoning ታፍኖ ወደ እውነተኛው ሞዴል ይፈታል። ሲጠፋ፦ ምንም variants አይተዋወቁም፣ እና no-think/ id እንደማንኛውም ያልታወቀ model id ይታያል። ይህ በርቶ ሳለ የእያንዳንዱ-ሞዴል ModelSpec.noThinkingAlias opt-in/opt-out አሁንም ተግባራዊ ይሆናል።                                                                                                   |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |           | በ/v1/models catalog ውስጥ የthinking level variants (ለምሳሌ -low፣ -medium፣ -high) መፍጠርን ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓         | ለprovider dispatch (#9654) በtenant የሚለያዩ adaptive virtual admission lanesን ያንቁ፦ የአንድ tenant burst ከአሁን በኋላ ሌላውን 503 እንዲመልስ አያደርግም። `OMNIROUTE_CHAT_VIRTUAL_LANES` env var ከዚህ dashboard override ይቀድማል፤ ለውጦች server ዳግም ሲጀምር ተግባራዊ ይሆናሉ።                                                                                                                                                                                                                                             |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |           | መደበኛ ባለቤታቸው ንቁ ምስክርነት የሌለው፣ ነገር ግን ንቁ ምስክርነት ያለው passthrough gateway የሚያስተላልፋቸው ሞዴሎች የ<gateway-alias>/<model> mirror idsን በ/v1/models ላይ ያስተዋውቁ። ማስጠንቀቂያ፦ በዓለም አቀፍ ደረጃ ሲነቃ ለሁሉም clients የcatalog ግቤቶችን ይጨምራል።                                                                                                                                                                                                                                                                        |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |           | ከNew-API / One-API / Sub2API aggregator ጋር ተኳሃኝ ለሆኑ nodes የbalance ማወቂያን ያንቁ። ሲነቃ፣ aggregator flag የተዘጋጀላቸው ተኳሃኝ nodes ቀሪ ሂሳባቸውን በdashboard እና በquota-preflight routing ውስጥ ሪፖርት ያደርጋሉ።                                                                                                                                                                                                                                                                                              |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |           | ሞዴሉ በclient ጥቅም ላይ ሊውል የሚችል ምላሽ እስኪመልስ ድረስ non-streaming server-owned tool callsን ይቀጥሉ።                                                                                                                                                                                                                                                                                                                                                                                              |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |           | የፍለጋ ስታቲስቲክስ እና የቅርብ ጊዜ ፍለጋዎች አሁንም live connection ያላቸውን providers ብቻ ይቆጥራሉ (እንደ duckduckgo-free ያሉ keyless providers ሁልጊዜ ይቆጠራሉ)። ሲጠፋ፣ ተይዞ የቆየውን እያንዳንዱን የፍለጋ ረድፍ ከprovider id ጋር ያቆያል።                                                                                                                                                                                                                                                                                             |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |           | የdashboard provider ገጾች፦ Free badgeን provider በሚያከብራቸው signals ላይ ብቻ ያሳዩ — ሰነድ የተደረገለት free tier በሌላቸው የተመዘገቡ providers ላይ ያለውን display-name heuristic፣ non-boolean free fields እና :free suffixes ያስወግዳል። ሲጠፋ፣ ታሪካዊውን የbadge ደንብ ያቆያል።                                                                                                                                                                                                                                               |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |           | በተዋሃዱ 429/503 unavailable ምላሾች ላይ፣ የተወሰነ የወደፊት የድጋሚ ሙከራ ጊዜ በማይታወቅበት ጊዜ `Retry-After`ን ይተዉ (ከተፈጠረ 1s ይልቅ)፣ `error.retry_after_provenance` (`signal` \| `none`)ን ይጨምሩ፣ እንዲሁም combo drain paths ከJSON እና plain-text upstream bodies ውስጥ በጽሑፍ የተገለጹ የድጋሚ ሙከራ ፍንጮችን እንዲያነቡ ይፍቀዱ። ይህ field በ`unavailableResponse()` በተፈጠሩ ምላሾች ላይ ብቻ ይታያል፤ ሌሎች 429/503 bodies አይለወጡም።                                                                                                                      |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |           | fallback-only-on-quota-exhaustion ተብሎ ምልክት የተደረገበት `priority` combo target፣ ምክንያቱ quota እንዳልሆነ በማስረጃ ሊረጋገጥ በሚችልበት ሁኔታ (provider circuit breaker ክፍት መሆን፣ predictive latency skip) comboውን ሲያቆም፣ quota ከሚመስለው 503 ይልቅ 502 ይመልሱ። Lockout፣ cooldown፣ unavailable፣ exhaustion እና concurrency-cap stops 503ን ያቆያሉ።                                                                                                                                                                        |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |           | ግልጽ የauth signal የሌለው ቀላል Mistral 401 (`{"detail":"Unauthorized"}`) ለተሻረ key እና quotaው ላለቀበት key ተመሳሳይ ነው። ሲበራ፣ connectionን `expired` ብሎ ከማቆም ይልቅ cooldown ውስጥ ያስገባዋል፤ ይህም በconnection በሰዓት ከ3 ጊዜ ያልበለጠ ነው። ቀጣዩ ግን ያቆመዋል፣ ስለዚህ የተሻረ key አሁንም በመጨረሻ ይቆማል። በነባሪ ጠፍቷል፦ እያንዳንዱ ቀላል Mistral 401 እንደበፊቱ connectionን ያቆማል።                                                                                                                                                                  |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |           | ከቀዘቀዘው የማይለወጥ seed ይልቅ፣ የOAuth bearer tokenን በመጠቀም ለ`xai-oauth` ግንኙነቶች ቀጥታ የxAI ሞዴል ካታሎግን ከ`https://api.x.ai/v1/models` ያምጣ። በነባሪነት ጠፍቷል፦ `xai-oauth` የማይለወጠውን seed ያለምንም ለውጥ ማቅረቡን ይቀጥላል። ማንኛውም የመፍታት ስህተት ሲከሰት፣ ማግኘቱ ወደ seed ይመለሳል (x.ai በዚህ endpoint ላይ የOAuth bearerን ይቀበል እንደሆነ አልተረጋገጠም)።                                                                                                                                                                                      |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |           | ራስ-ሰር የማጽዳት ሂደቱ ከ`OMNIROUTE_BATCH_RETENTION_DAYS` በላይ የቆዩ የተጠናቀቁ (completed/failed/cancelled/expired) የBatch API ሥራዎችን ከየመስመሩ checkpoints ጋር እንዲሰርዝ፣ እንዲሁም የራሳቸው `expires_at` ካለፈ በኋላ የተሰቀሉ ፋይሎችን BLOB ይዘት እንዲያጸዳ ይፍቀዱ። በነባሪነት ጠፍቷል፦ አንድ ኦፕሬተር እስኪያነቃው ድረስ እያንዳንዱ ነባር ጭነት ይህን ውሂብ ልክ እንደበፊቱ ያቆየዋል። በኦፕሬተር የሚጀመረው `DELETE /api/v1/batches/delete-completed` route በሁለቱም ሁኔታ አይነካም — ይህ የተለየ፣ ቅድመ ሁኔታ የሌለው ይፋዊ የAPI ውል ነው።                                                             |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |           | የመረጠው ጥያቄ በstreaming የሕይወት ዑደቱ ውስጥ ሳለ የተመረጠውን Antigravity መለያ ይያዙ፤ ይህም በተመሳሳይ ጊዜ የሚከናወን retry ወይም የcredential ርክክብ አስቀድሞ ሥራ ላይ ላለ stream የተመደበ መለያን ዳግም እንዳይመርጥ ያደርጋል። ይያዙ በ(connection, callable upstream model) ወሰን ውስጥ ነው፤ ስለዚህ አንድ መለያ አሁንም ሁለት የተለያዩ ሞዴሎችን በአንድ ጊዜ ማገልገል ይችላል። ሁሉም ብቁ መለያዎች ለዚያ ሞዴል አስቀድመው ተይዘው ከሆነ፣ ጥያቄው በተጨናነቀ መለያ ላይ ከመከመር ይልቅ ወሰን ያለው `Retry-After` የያዘ የተዋቀረ 503 `antigravity_pool_busy` ይመልሳል። በነባሪነት ጠፍቷል፦ የመለያ ምርጫው ልክ እንደበፊቱ ይቆያል፣ እና ምንም ይያዙ አይከናወንም። |

### CLI (5)

| ቁልፍ                                   | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                  |
| ------------------------------------- | ------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓         | ለሁሉም የCLI ደንበኞች የተኳኋኝነት ሁነታን አንቃ።                                                                                                                                     |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |           | የሞዴል alias ተኳኋኝነት ንብርብርን አንቃ።                                                                                                                                         |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |           | ራስ-ሰር የዋጋ መረጃ ማመሳሰልን አንቃ (`PRICING_SYNC_ENABLED` environment variableም ያስፈልጋል)።                                                                                       |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |           | ከprovider ሞዴል ማመሳሰል በኋላ፣ የ~/.codex/*.config.toml profile ፋይሎችን ከቀጥታው ካታሎግ ራስ-ሰር (ዳግም) ይጻፉ። ንቁውን/ነባሪውን Codex config ፈጽሞ አይለውጥም። በነባሪነት ጠፍቷል።                           |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |           | ከprovider ሞዴል ማመሳሰል በኋላ፣ የ~/.claude/profiles/<name>/settings.json Claude Code profilesን ከቀጥታው ካታሎግ ራስ-ሰር (ዳግም) ይጻፉ። ንቁውን/ነባሪውን Claude config ፈጽሞ አይለውጥም። በነባሪነት ጠፍቷል። |

### ጤና (5)

| ቁልፍ                                       | ዓይነት    | ነባሪ     | መግለጫ                                                                                                                                                                                                          |
| ----------------------------------------- | ------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | የአካባቢያዊ ኢንስታንስ ጤና ምርመራ መዳረሻን ያሰናክሉ።                                                                                                                                                                           |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | የቶከን ማረጋገጫ ጤና ምርመራን ያሰናክሉ።                                                                                                                                                                                    |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | በችሎታዎች sandbox አካባቢ ውስጥ የአውታረ መረብ መዳረሻን ያንቁ።                                                                                                                                                                  |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | በፕሮክሲ ጤና ቅኝት ውስጥ፣ ዒላማው ያልተቀበለው ሙከራ (401/403/429) የፕሮክሲውን ተከታታይ-ውድቀት ቆጠራ ዳግም ያስጀምራል። በነባሪ ጠፍቷል፦ ያለመቀበል ገለልተኛ ሆኖ ይቆያል (#10654)። 5xx በሁለቱም ሁኔታ የማያስረግጥ ሆኖ ይቆያል፤ ያለመቀበል ፕሮክሲን ፈጽሞ አያስወግድም፣ አያሰናክልም ወይም ዳግም አያነቃም። |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | የአገልጋዩን መጀመር እስኪጠናቀቅ ከማገድ ይልቅ፣ አገልጋዩ ጥያቄዎችን መቀበል ከጀመረ በኋላ (በ`setImmediate` በኩል) የመነሻ DB አቋም/ጤና ምርመራን ያሂዱ (#13717)። በነባሪ ጠፍቷል፦ መነሳት ከዚህ PR በፊት እንደነበረው በትክክል ይታገዳል።                                            |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` እና የቀድሞ ቅጽል ስሙ
> `INJECTION_GUARD_BLOCK_THRESHOLD` የ`INJECTION_GUARD_MODE`ን `block` ሁነታ
> ያስተካክላሉ፣ ነገር ግን እነዚህ
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts) የሚያነባቸው መደበኛ የአካባቢ ተለዋዋጮች እንጂ
> የባህሪ ባንዲራዎች አይደሉም፦ የDB መሻሪያም ሆነ የዳሽቦርድ ማብሪያ/ማጥፊያ የላቸውም።
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)ን ይመልከቱ።

> [!NOTE]
> የ`Restart` ዓምድ `requiresRestart: true` ያላቸውን ባንዲራዎች ያመለክታል — እሴቱ
> ወዲያውኑ ይቀመጣል፣ ነገር ግን ሂደቱ ዳግም ከተጫነ በኋላ ብቻ ተግባራዊ ይሆናል። Enum
> ባንዲራዎች ከተፈቀደላቸው ስብስብ ውጭ ያለን ማንኛውንም እሴት ውድቅ ያደርጋሉ (በአገልጋይ በኩል
> በ`setFeatureFlagOverride()` እና በREST `PUT` አስተናጋጅ ውስጥ ተረጋግጧል)።

---

## ጠቋሚዎችን ማብራትና ማጥፋት

### ዳሽቦርድ

ወደ **ዳሽቦርድ → ቅንብሮች → የባህሪ ጠቋሚዎች**
(`/dashboard/settings/feature-flags`) ይሂዱ። ሰንጠረዡ
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
የሚከተሉትን ይደግፋል፦

- በቁልፍ ወይም በመግለጫ **መፈለግ**፣ እና በምድብ **ማጣራት** (በተጨማሪም የተፈጠረ
  **ዳግም ማስጀመር ያስፈልገዋል** እይታ)።
- ለቡሊያን ጠቋሚዎች **ማብሪያ/ማጥፊያ** እና ለenum ጠቋሚዎች **ተቆልቋይ ምናሌ**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)።
- በእያንዳንዱ ጠቋሚ ላይ ውጤታማው እሴት ከየት እንደመጣ የሚያሳይ **የምንጭ ባጅ** — `DB`፣ `ENV`፣ ወይም `DEF`።
- ልዩ ቅንብሩን ለማስወገድ **ዳግም አስጀምር** አዝራር (`DB` ምንጭ ላላቸው ጠቋሚዎች ብቻ የሚታይ)፣
  እና ከታች **ሁሉንም ልዩ ቅንብሮች ዳግም አስጀምር** አዝራር።
- `requiresRestart` ያለው ጠቋሚ ሲቀየር **ሰርቨሩን ዳግም አስጀምር** ባነር።

### REST API

ሁሉም ክወናዎች በአንድ መስመር ብቻ ያልፋሉ፦
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts)።
እያንዳንዱ ዘዴ የተረጋገጠ የዳሽቦርድ ክፍለ ጊዜ ይፈልጋል (ካልሆነ `401`)።

#### `GET /api/settings/feature-flags`

እያንዳንዱን ጠቋሚ ከውጤታማ እሴቱ፣ ምንጩ እና ማጠቃለያው ጋር ይመልሳል።

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... ሁሉም 77 ጠቋሚዎች
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

አንድ ልዩ ቅንብር ያዘጋጁ ወይም ያስወግዱ። የጥያቄ አካል፦ `{ key: string; value?: string }`።
`value`ን አለማካተት ልዩ ቅንብሩን ያስወግዳል (የenv / default እሴቱን ይመልሳል)።

```bash
# የDB ልዩ ቅንብር አዘጋጅ
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# ልዩ ቅንብሩን አስወግድ ("value" የለም)
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

ምላሹ አዲሱን `effectiveValue`/`source`፣ `previousValue`/
`previousSource` እና `requiresRestart` መልሶ ያሳያል። ያልታወቁ ቁልፎች እና ከተፈቀደው ክልል ውጭ ያሉ የenum
እሴቶች በ`400` ውድቅ ይደረጋሉ።

#### `DELETE /api/settings/feature-flags`

**ሁሉንም** የDB ልዩ ቅንብሮች በአንድ ጊዜ ያጸዳል፣ እያንዳንዱን ጠቋሚ ወደ env / default
እሴቱ ይመልሳል። `{ cleared: <count>, message: "..." }`ን ይመልሳል።

> [!NOTE]
> `requiresRestart: true` ያላቸው ጠቋሚዎች ሥራ ላይ የሚውሉት ፕሮሰሱ ዳግም ከተጫነ በኋላ ብቻ ነው።
> የዳሽቦርዱ ዳግም ማስጀመሪያ ፍሰት `POST /api/restart`ን ይጠራል፣ ከዚያም ሰርቨሩ ዳግም እስኪነሳ ድረስ
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
