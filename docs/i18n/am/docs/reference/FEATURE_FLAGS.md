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

በ6 ምድቦች የተከፋፈሉ 74 ፍላጎች። **ነባሪ** ማለት የትርጉም ነባሪው ነው — የDB መተካትም ሆነ የአካባቢ ተለዋዋጭ በማይኖርበት ጊዜ
ጥቅም ላይ የሚውለው እሴት።

### ደህንነት (10)

| ቁልፍ                                     | ዓይነት | ነባሪ      | መግለጫ                                                                                                                                                                                         |
| --------------------------------------- | ---- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | ቡሊያን | `false`  | ለሁሉም ገቢ ጥያቄዎች የAPI ቁልፍ ያስፈልግ።                                                                                                                                                                |
| `INPUT_SANITIZER_ENABLED`               | ቡሊያን | `true`   | ለሁሉም ጥያቄዎች የግቤት ማጽዳትን አንቃ።                                                                                                                                                                   |
| `INJECTION_GUARD_MODE`                  | ዝርዝር | `off`    | የፕሮምፕት መርፌ ጥቃት መከላከያ ሁነታ። እሴቶች፦ `off`፣ `warn`፣ `block`፣ `redact`።                                                                                                                            |
| `PII_REDACTION_ENABLED`                 | ቡሊያን | `false`  | ከጥያቄዎች ውስጥ PIIን ደብቅ (`INPUT_SANITIZER_MODE` ላይ የማይወሰን)።                                                                                                                                      |
| `PII_RESPONSE_SANITIZATION`             | ቡሊያን | `false`  | ከአቅራቢ ምላሾች PIIን አጽዳ።                                                                                                                                                                         |
| `PII_RESPONSE_SANITIZATION_MODE`        | ዝርዝር | `redact` | የPII ምላሽ ማጽዳት ሁነታ። እሴቶች፦ `redact`፣ `warn`፣ `block`፣ `off`።                                                                                                                                   |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | ቡሊያን | `true`   | ወደ የግል/የውስጥ IP ክልሎች የሚላኩ ወጪ ጥያቄዎችን አግድ።                                                                                                                                                      |
| `ALLOW_API_KEY_REVEAL`                  | ቡሊያን | `false`  | ማረጋገጫ ያለፉ የዳሽቦርድ ተጠቃሚዎች የተሸፈኑ እሴቶችን ብቻ ከማየት ይልቅ የተከማቹ የAPI ቁልፎችን እንዲያሳዩ ፍቀድ።                                                                                                                 |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | ቡሊያን | `false`  | በAUTH ሎግ መስመሮች ውስጥ የመለያ ቅድመ ቅጥያን አካትት (ለምሳሌ፦ "የ<provider> መለያን በመጠቀም ላይ፦ abc12345...")። የመለያ መለያዎች ከጋራ/ባለብዙ ተከራይ የሂደት ሎጎች እንዲደበቁ በነባሪ ተሰናክሏል። ከDebug Mode ነጻ ነው፤ Debug Modeን መቀየር ይህን አያሳይም። |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | ቡሊያን | `false`  | OIDC ሲነቃ፣ ተጠቃሚዎች በOIDC ነጠላ መግቢያ ብቻ ማረጋገጥ እንዲችሉ በይለፍ ቃል መግባትን አሰናክል። ሲሰናከል (ነባሪ)፣ በይለፍ ቃል መግባት እና OIDC ሁለቱም ይገኛሉ።                                                                             |

### አውታረ መረብ (16)

| ቁልፍ                                             | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------- | ------- | ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓         | የTLS fingerprint ድብቅነት ሁነታን አንቃ።                                                                                                                                                                                                                                                                                                          |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |           | የ/v1/audio/* መስመሮች localhost ውጭ የሚስተናገዱ OpenAI-ተኳኋኝ የአቅራቢ ኖዶችን እንዲጠቀሙ ፍቀድ። በነባሪ የተሰናከለ ነው — ኦዲዮን ወደ ሩቅ አስተናጋጅ ማዘዋወር የወጪ ትራፊክ ማንነትን ይለውጣል፣ ስለዚህም የኦፕሬተሩ ግልጽ ውሳኔ መሆን አለበት። Loopback ኖዶች ሁልጊዜ የተፈቀዱ ሲሆኑ በዚህ ቅንብር አይነኩም።                                                                                                                      |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |           | POST /v1/rerank (እና የማህደረ ትውስታ ሞተሩ loopback rerank ደረጃ) localhost ውጭ የሚስተናገዱ OpenAI-ተኳኋኝ የአቅራቢ ኖዶችን እንዲጠቀም ፍቀድ። በነባሪ የተሰናከለ ነው — ወደ ሩቅ አስተናጋጅ ማዘዋወር የወጪ ትራፊክ ማንነትን ይለውጣል፣ ስለዚህም የኦፕሬተሩ ግልጽ ውሳኔ መሆን አለበት። Loopback ኖዶች ሁልጊዜ የተፈቀዱ ናቸው፤ ሩቅ ኖዶች ደግሞ የአቅራቢውን የወጪ URL ፖሊሲ ማለፍ አለባቸው።                                                           |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |           | ለግንኙነት ምንም proxy ባልተመደበበት ጊዜ፣ ከመዝገቡ ውስጥ የመጀመሪያውን የሚሰራ proxy በራስ-ሰር ምረጥ። በነባሪ የተሰናከለ ነው (አለበለዚያ በመዝገቡ ውስጥ ያለ ማንኛውም proxy ዓለም አቀፍ ምትክ ይሆናል — #3332)።                                                                                                                                                                                        |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |           | የproxy ተደራሽነት ቅድመ-ማረጋገጫዎች ሲከሽፉ፣ OAuth እና የአቅራቢ ማረጋገጫ ፍሰቶች የተወሰነላቸውን proxy አልፈው በቀጥታ እንዲገናኙ ፍቀድ። ይህ የወጪ IPን ሊለውጥ ስለሚችል በነባሪ የተሰናከለ ነው።                                                                                                                                                                                                     |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |           | ለብዙ-መለያ ቅያሬ አስፈጻሚ የአውታረ መረብ ልዩ ሁኔታ (ጊዜው ማለፍ፣ ግንኙነት ውድቅ መደረግ/ዳግም መጀመር) ሲከሰት፣ ያልተሳካው መለያ የራሱ proxy ከሌለው፣ እያንዳንዱን ከመሞከር ይልቅ አጭር የማቀዝቀዣ ጊዜ ተግብር እና ለቀሪው ጥያቄ proxy የሌላቸውን ሌሎች መለያዎች ዝለል። በነባሪ የነቃ ነው (ደህንነቱ የተጠበቀ፦ የወጪ IP አይለወጥም፣ በጋራ የወጪ ትራፊክ መለያዎች ላይ የመዘግየት/የማቀዝቀዣ ጊዜ ስጋትን ብቻ ይቀንሳል)። proxy በሌለው የመጀመሪያ ስህተት ላይ ወዲያውኑ ስህተቱን ለማስተላለፍ አሰናክለው። |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |           | የProxy ስብስቦች እና የopencode የእያንዳንዱ-መለያ ቅያሬ አሁን የተሳነውን proxy (ውድቅ የተደረገ TCP probe፣ ወይም በእሱ በኩል የተቀበለ 429) እንደገና ማቅረብ ያቆማሉ፤ ይህም በእያንዳንዱ ድግግሞሽ እስከ ከፍተኛ ገደብ ድረስ በእጥፍ ለሚጨምር የእያንዳንዱ-ሂደት ጊዜ ነው። ምንም የproxy ሁኔታ አይጻፍም፤ እያንዳንዱ እጩ ወደ ጎን ሲቀመጥ ምርጫው አይለወጥም። በነባሪ የተሰናከለ ነው።                                                                         |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |           | በዳሽቦርዱ ውስጥ በproxy ስብስብ ስር፣ ባለፉት 24 h ውስጥ ምን ያህል የታዩ የወጪ IPዎች አባላቱን እንዳገለገሉ እና ምን ያህል ግንኙነቶች እንደተጠቀሙባቸው አሳይ። ለንባብ ብቻ ነው፣ ከproxy ምዝግብ የሚሰላ ሲሆን ለማዘዋወር ፈጽሞ ጥቅም ላይ አይውልም። በነባሪ የተሰናከለ ነው።                                                                                                                                                     |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |           | ለOpenCode አስፈጻሚ፣ በዥረት የሚተላለፍ Responses ምላሽ የመጀመሪያውን የይዘት byte ተከታተል (መስኮት፦ `RESPONSES_FIRST_BYTE_TIMEOUT_MS`፣ ነባሪ `15000`)። ከመስኮቱ በላይ ዝም የሚል የ2xx Responses ዥረት እንደቆመ ይቆጠራል፦ መለያው ለማቀዝቀዣ ጊዜ ይቀመጣል እና ጥያቄው አንድ ጊዜ ወደሚቀጥለው መለያ ይቀየራል፤ ለሁለተኛ ጊዜ ከቆመ ወዲያውኑ ይከሽፋል። በነባሪ የተሰናከለ ነው፦ የቆሙ ዥረቶች የዥረት ዝግጁነት ጊዜው እስኪያልፍ ድረስ የአሁኑን መጠበቅ ይቀጥላሉ።        |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |           | OpenCode አስፈጻሚ፦ `user_blocked` እምቢታን የያዘ 403/451 ሲከሰት (ከጂኦግራፊያዊ እገዳ ወይም ከCloudflare የጣት አሻራ ውድቅ መደረግ የተለየ)፣ ውድቅ የተደረገውን መለያ ለጊዜው ያሳርፍና በእያንዳንዱ ጥያቄ ቢበዛ አንድ ጊዜ ወደ ቀጣዩ መለያ ይቀይር፤ ሁለተኛ እምቢታ የስኬት ምልክት ሳይደረግበት እንዳለ ይመለሳል። በነባሪነት ጠፍቷል፦ የላይኛውን አገልግሎት የተጠቃሚ እገዳ በሌላ መንገድ ማለፍ እንደ ማምለጥ ሊታይና ምልክቱን በመላው የመለያ ስብስብ ሊያሰራጭ ይችላል።                   |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |           | OpenCode ሽክርክር፦ ሁለት ተከታታይ ጊዜያዊ የላይኛው አገልግሎት ውድቀቶች (5xx ወይም ባዶ 400) ከተከሰቱ በኋላ ወደ ቀጣዩ መለያ ከመሸጋገር በፊት ቆም ይበል — ከ1.5 ሰከንድ ጀምሮ በእያንዳንዱ ተጨማሪ ውድቀት በእጥፍ ይጨምራል፣ በእያንዳንዱ ማቆሚያ እስከ 6 ሰከንድ እና በእያንዳንዱ ጥያቄ እስከ 10 ሰከንድ ይገደባል፣ ደንበኛው ግንኙነቱን ካቋረጠ ይዘለላል፤ ከመጠበቁ በፊት ያልተሳካው የመልስ ይዘት ይለቀቃል። በነባሪነት ጠፍቷል፦ ወደ ተለዋጭ መለያ መሸጋገር ወዲያውኑ ይቀጥላል።                   |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |           | OpenCode ሽክርክር፦ እንደ እውነተኛ የፍጥነት ገደብ የተመደበው የመጀመሪያ 429 ሲከሰት (ሊተነተን የሚችል `Retry-After` ወይም የፍጥነት/አጠቃቀም ገደብን የሚጠቅስ የመልስ ይዘት) የመለያዎችን ዙር ያቁምና ያንን የላይኛው አገልግሎት 429 ሳይቀይር ይመልስ። ያልተመደቡ 429ዎች ሽክርክሩን ይቀጥላሉ። በነባሪነት ጠፍቷል፦ ነፃው ደረጃ በእያንዳንዱ ወጪ IP የተገደበ ስለሆነ (#9611)፣ እያንዳንዱ 429 ወደ ቀጣዩ መለያ ያሸጋግራል፣ ዙሩም ሲሟጠጥ የመጨረሻውን የላይኛው አገልግሎት 429 ይመልሳል።       |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓         | ለMITM ፕሮክሲው የTLS ሰርቲፊኬት ማረጋገጫን አሰናክል። **አደገኛ።**                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |           | ወደ የግል/ውስጣዊ አውታረ መረቦች የሚያመለክቱ የአቅራቢ URLዎችን ፍቀድ።                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |           | በአካባቢያዊ/የግል አድራሻዎች (127.0.0.1, localhost, LAN) ላይ አቅራቢዎችን ማከል/ማረጋገጥን ፍቀድ። በነባሪነት ነቅቷል (አካባቢያዊን ቅድሚያ የሚሰጥ)፤ ለጥብቅ የሕዝብ አውታረ መረብ-ብቻ እገዳ አሰናክለው። የCloud ሜታዳታ እንደታገደ ይቆያል።                                                                                                                                                                     |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓         | ከClaude Code ጋር ተኳሃኝ የሆነ የአቅራቢ ሁነታን አንቃ።                                                                                                                                                                                                                                                                                                  |

### ፖሊሲዎች (5)

| ቁልፍ                             | ዓይነት    | ነባሪ        | መግለጫ                                                                                                                                                     |
| ------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | የመሣሪያ አጠቃቀም ፖሊሲ ማስፈጸሚያ ሁነታ። እሴቶች፦ `disabled`፣ `warn`፣ `block`።                                                                                           |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | በአጠቃቀም ንድፎች መሠረት የፍጥነት ገደብን በራስ-ሰር አንቃ።                                                                                                                  |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | ለቀጥታ ነጠላ-ሞዴል ጥያቄዎች የOmniRouteን አካባቢያዊ የአውድ-መስኮት / ከፍተኛ-የግብዓት-ቶከን ፍተሻ ዝለል። የላይኛው አገልግሎት ገደቦች አሁንም ተፈጻሚ ናቸው።                                               |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | ዒላማው ሞዴል አስፈላጊ ችሎታዎች ከሌሉት (ምስል፣ መሣሪያዎች፣ የተዋቀረ ውጤት፣ የአውድ መስኮት) ጥያቄዎችን ከመላካቸው በፊት ውድቅ አድርግ። ይህ የጥምር-ንብርብሩን የተኳኋኝነት ማጣሪያ የሚያልፉ ቀጥተኛ የነጠላ-አቅራቢ ጥያቄዎችን ይጠብቃል። |
| `RADAR_ENABLED`                 | boolean | `false`    | የOmniRoute Radar ሞጁልን (የካታሎግ ምግብ ማያ ገጾችና ማመሳሰል) አንቃ። በነባሪነት ጠፍቷል፤ ማንቃት የተጠቃሚ በይነገጹን ብቻ ይከፍታል — የውሂብ ማመሳሰል የተለየ በምርጫ የሚነቃ ሆኖ ይቆያል።                        |

### የሩጫ ጊዜ (33)

| ቁልፍ                                         | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------- | ------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | ቡሊያን    | `true`  |           | የጥምር ማዘዋወር ሞዴሎችን ሲቀይር የውይይት ማጠቃለያዎችን ያመነጫል እና ያስገባል። የሞዴል ለውጦችን እያንዳንዳቸውን ለብቻ ለማስተናገድ እና ለሁሉም ነባርና ወደፊት ለሚፈጠሩ ጥምሮች የበስተጀርባ ርክክብ ጥያቄዎችን ለመከላከል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                    |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | ቡሊያን    | `true`  |           | ወደ ደንበኞች ከመላካቸው በፊት ከResponses API ቀጥታ-ማሳለፊያ ዥረቶች ውስጣዊ የአስተያየት-ደረጃ ውጤት ንጥሎችን ያስወግዳል። ጥሬ የላይኛው ዥረት አስተያየትን ለመቀበል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | ቡሊያን    | `true`  |           | የMCP መሣሪያ መዳረሻ ላይ የወሰን ገደቦችን ያስፈጽማል።                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | ቡሊያን    | `false` |           | የቶከን አጠቃቀምን ለመቀነስ የMCP መሣሪያ መግለጫዎችን ይጨምቃል።                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | ቡሊያን    | `false` |           | በአሂድ ጊዜ የበስተጀርባ ተግባር ሂደትን ያነቃል።                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | ቡሊያን    | `false` | ✓         | ሁሉንም የበስተጀርባ አገልግሎቶችን (የኮታ ማደስ፣ ማመሳሰል፣ ወዘተ) ያሰናክላል።                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |           | የፕሮጀክት ደረጃ RTK ማጣሪያዎችን ያለ ማረጋገጫ እመን።                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓         | በማስመጣት ጊዜ የእውነተኛ ጊዜ ዳሽቦርድ WebSocket አገልጋይን አስጀምር (በነባሪ port 20132)።                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |           | Codex የResponses-over-WebSocket ማጓጓዣን እንዲጠቀም ፍቀድ። ሲጠፋ Codex ወደ HTTP Responses ይመለሳል።                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |           | Codex የአካባቢውን app-server WebSocket JSON-RPC ማጓጓዣ (`codexTransport=app-server`) እንዲጠቀም ፍቀድ። ሲጠፋ፣ app-serverን ለመጠቀም የተመረጡ ግንኙነቶች ወደ ሌሎች የCodex ማጓጓዣዎች ይመለሳሉ።                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |           | በጀታቸው ያለቀባቸውን ጥያቄዎች ወደ ድንገተኛ ነፃ ተተኪ አቅራቢ/ሞዴል ላክ። (ከታች [የድንገተኛ ጊዜ የበጀት ተተኪ](#emergency-budget-fallback)ን ይመልከቱ።)                                                                                                                                                                                                                                                                                                                                                          |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |           | ማንኛውም የምላሽ ባይቶች ወደ ደንበኛው ከመድረሳቸው በፊት፣ ለተቆራረጡ የላይኛው ምንጭ SSE ዥረቶች ግልጽ ያልሆነ ቀደምት ዳግም ሙከራን አንቃ።                                                                                                                                                                                                                                                                                                                                                                              |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |           | ባይቶች ወደ ደንበኛው ከደረሱ በኋላ የዥረት መልሶ ማግኘት ምላሽን እንደገና እንዲጠይቅና እንዲያገናኝ ፍቀድ።                                                                                                                                                                                                                                                                                                                                                                                                     |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |           | በዥረት መካከል ያለውን ቀጣይነት ለመሣሪያ ጥሪ ደህንነቱ የተጠበቀ አድርግ፦ የመሣሪያ ጥሪ አንዴ ከተላከ (በሂደት ላይ ያለ ወይም በ`finish_reason` `tool_calls` የተጠናቀቀ) የተቋረጠ ዥረትን በፍጹም አትቀጥል፣ እንዲሁም ሙሉውን በጀት ከማውጣት ይልቅ ከአንድ ባዶ ቀጣይነት በኋላ ዝጋ። ሲጠፋ፦ የልቀት ባህሪ።                                                                                                                                                                                                                                                             |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |           | አንድ SSE ዥረት ምንም ጠቃሚ ፍሬም ሳያወጣ ሲዘጋ እና የተገደበው የተመሳሳይ-ግንኙነት ዳግም ሙከራ ሲያልቅ፣ አንድ ጊዜ ወደ ተጓዳኝ ግንኙነት ያዛውሩ፤ ጥቅም ላይ የሚውል ተጓዳኝ ከሌለ የመጀመሪያው `STREAM_EARLY_EOF` 502 ይመለሳል። በነባሪ የተሰናከለ ነው፦ ከተመሳሳይ-ግንኙነት ዳግም ሙከራ በኋላ early-EOF የመጨረሻ ሁኔታ ሆኖ ይቆያል።                                                                                                                                                                                                                                        |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |           | በ`/v1/models` ምላሾች ውስጥ ለእይታ ምቹ የሆኑ የስም መስኮችን ያካትቱ። የሞዴል IDs ብቻ ለሚጠብቁ ደንበኞች ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                                                       |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |           | በ/v1/models ውስጥ የሞዴል IDs ቅድመ ቅጥያ እንዴት እንደሚያገኙ ይቆጣጠራል። 'dual' (ነባሪ) ከቀድሞ ስሪቶች ጋር ለመጣጣም የቅጽል ስም እና መደበኛ የአቅራቢ-id ቅድመ ቅጥያዎችን ሁለቱንም ያወጣል። 'alias' አጭሩን የቅጽል ስም ቅድመ ቅጥያ ብቻ ያወጣል (ለምሳሌ፣ ds-web/model እንጂ deepseek-web/model አይደለም)። 'canonical' ሙሉውን የአቅራቢ-id ቅድመ ቅጥያ ብቻ ያወጣል። እሴቶች፦ `dual`፣ `alias`፣ `canonical`።                                                                                                                                                             |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |           | ለሞዴል ብልህነት ደረጃዎች ወቅታዊ የArena AI የመሪዎች ሰንጠረዥ ELO ማመሳሰልን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                              |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |           | Claude Code gateway የሞዴል ግኝት Claude ያልሆኑ ሞዴሎችን እንዲዘረዝር፣ የ`claude/<provider>/<model>` አንጸባራቂ idsን በ`/v1/models` ላይ ያስተዋውቁ። የሶስት-ደረጃ በር ዓለም-አቀፍ ደረጃ (env ከdashboard override ይቀድማል)። [Claude Code ውቅረት](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)ን ይመልከቱ።                                                                                                                                                   |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |           | ለno-think/<provider>/<model> gateway ቅጽል ስሞች ዋና መቀየሪያ። ሲበራ (ነባሪ)፦ /v1/models ለእያንዳንዱ ብቁ የማሰብ ችሎታ ላለው Claude ሞዴል የማያስብ ተለዋጭ ያስተዋውቃል፤ እንዲሁም በጥያቄ ላይ የተላከ no-think/ id፣ reasoning ታፍኖ ወደ እውነተኛው ሞዴል ይፈታል። ሲጠፋ፦ ምንም ተለዋጮች አይተዋወቁም፣ እና no-think/ id እንደማንኛውም ሌላ ያልታወቀ የሞዴል id ይቆጠራል። ይህ በርቶ ሳለ የእያንዳንዱ ሞዴል ModelSpec.noThinkingAlias opt-in/opt-out አሁንም ተፈጻሚ ይሆናል።                                                                                                           |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |           | በ/v1/models ካታሎግ ውስጥ የማሰብ ደረጃ ተለዋጮችን (ለምሳሌ፣ -low፣ -medium፣ -high) ማመንጨትን ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓         | ለአቅራቢ ማሰማራት በተከራይ የሚለያዩ አስማሚ ምናባዊ የመግቢያ መስመሮችን ያንቁ (#9654)፦ የአንድ ተከራይ ድንገተኛ ጭማሪ ከእንግዲህ ሌላውን 503 አያስመልስበትም። `OMNIROUTE_CHAT_VIRTUAL_LANES` env var ከዚህ dashboard override ይቀድማል፤ ለውጦች ሰርቨሩ ዳግም ሲጀምር ተግባራዊ ይሆናሉ።                                                                                                                                                                                                                                                           |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |           | መደበኛ ባለቤታቸው ንቁ ማረጋገጫ የሌለውን፣ ነገር ግን ንቁ ማረጋገጫ ያለው ቀጥታ ማሳለፊያ gateway ወደእነሱ የሚያዞርባቸውን ሞዴሎች <gateway-alias>/<model> mirror ids በ /v1/models ላይ ያስተዋውቁ። ማስጠንቀቂያ፦ በዓለም አቀፍ ደረጃ ሲነቃ ለሁሉም ደንበኞች የካታሎግ ግቤቶችን ይጨምራል።                                                                                                                                                                                                                                                                |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |           | ከ New-API / One-API / Sub2API aggregator ጋር ተኳሃኝ ለሆኑ nodes የሒሳብ ቀሪ ማወቂያን ያንቁ። ሲነቃ፣ የ aggregator ምልክት የተቀናበረላቸው ተኳሃኝ nodes የሒሳብ ቀሪያቸውን በ dashboard እና በ quota-preflight routing ውስጥ ያሳውቃሉ።                                                                                                                                                                                                                                                                                |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |           | ሞዴሉ ደንበኛው ሊጠቀምበት የሚችል ምላሽ እስኪመልስ ድረስ በ server ባለቤትነት የሚተዳደሩ የማይለቀቁ tool calls እንዲቀጥሉ ያድርጉ።                                                                                                                                                                                                                                                                                                                                                                               |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |           | የፍለጋ ስታቲስቲክስ እና የቅርብ ጊዜ ፍለጋዎች አሁንም ንቁ connection ያላቸውን providers ብቻ ይቆጥራሉ (እንደ duckduckgo-free ያሉ keyless providers ሁልጊዜ ይቆጠራሉ)። ሲጠፋ፣ provider id ያለውን እያንዳንዱን የተያዘ የፍለጋ ረድፍ ያቆያል።                                                                                                                                                                                                                                                                                       |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |           | የ dashboard provider ገጾች፦ Free badgeን provider በሚያከብራቸው ምልክቶች ላይ ብቻ ያሳዩ — የ display-name ግምታዊ ዘዴን፣ boolean ያልሆኑ free fieldsን እና በሰነድ የተገለጸ free tier በሌላቸው የተመዘገቡ providers ላይ ያሉ :free suffixesን ያስወግዳል። ሲጠፋ፣ ታሪካዊውን የ badge ደንብ ያቆያል።                                                                                                                                                                                                                                  |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |           | በተዋሃዱ 429/503 የአገልግሎት አለመኖር ምላሾች ላይ፣ የተወሰነ የወደፊት የድጋሚ ሙከራ ጊዜ በማይታወቅበት ጊዜ `Retry-After`ን ይተዉ (በሰው ሠራሽ 1s ፋንታ)፣ `error.retry_after_provenance` (`signal` \| `none`)ን ያክሉ፣ እንዲሁም combo drain paths ከ JSON እና plain-text upstream bodies ውስጥ በስድ ንባብ የቀረቡ የድጋሚ ሙከራ ፍንጮችን እንዲያነቡ ያድርጉ። ይህ field በ `unavailableResponse()` በተገነቡ ምላሾች ላይ ብቻ ይታያል፤ ሌሎች 429/503 bodies አይለወጡም።                                                                                                   |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |           | fallback-only-on-quota-exhaustion ተብሎ ምልክት የተደረገበት `priority` combo target ከ quota ጋር እንደማይዛመድ በእርግጠኝነት ሊረጋገጥ በሚችል ምክንያት (የ provider circuit breaker መከፈት፣ predictive latency skip) comboውን ሲያቆም፣ quota ያለቀ በሚመስለው 503 ፋንታ 502 ይመልሱ። በ lockout፣ cooldown፣ unavailable፣ exhaustion እና concurrency-cap ምክንያት የሚፈጠሩ ማቆሚያዎች 503ን ይይዛሉ።                                                                                                                                       |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |           | ተጨማሪ ዝርዝር የሌለው Mistral 401 (`{"detail":"Unauthorized"}`፣ ግልጽ የ auth ምልክት የሌለው) ለተሻረ key እና quotaው ላለቀበት key ተመሳሳይ ነው። ሲበራ፣ connectionን `expired` ብሎ ከማቆም ይልቅ cooldown ውስጥ ያስገባዋል፣ ለእያንዳንዱ connection በሰዓት ከፍተኛው 3 ጊዜ፤ ቀጣዩ ያቆመዋል፣ ስለዚህ የተሻረ key በመጨረሻ ወደተገቢው ሁኔታ ይደርሳል። በነባሪ ጠፍቷል፦ እያንዳንዱ ተጨማሪ ዝርዝር የሌለው Mistral 401 እንደቀድሞው connectionን ያቆማል።                                                                                                                            |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |           | ከተወሰነው የማይለወጥ መነሻ ይልቅ፣ የOAuth bearer ቶከንን በመጠቀም ለ`xai-oauth` ግንኙነቶች የቀጥታውን የxAI ሞዴል ካታሎግ ከ`https://api.x.ai/v1/models` ያምጣ። በነባሪ ጠፍቷል፦ `xai-oauth` የማይለወጠውን መነሻ ያለምንም ለውጥ ማቅረቡን ይቀጥላል። በማንኛውም የመፍታት ስህተት ጊዜ፣ ግኝቱ ወደ መነሻው ይመለሳል (x.ai በዚህ የመዳረሻ ነጥብ ላይ የOAuth bearer ቶከንን ይቀበል እንደሆነ አልተረጋገጠም)።                                                                                                                                                                           |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |           | ራስ-ሰር የማጽዳት ሂደቱ ከ`OMNIROUTE_BATCH_RETENTION_DAYS` በላይ የቆዩ የመጨረሻ ሁኔታ ላይ ያሉ (የተጠናቀቁ/ያልተሳኩ/የተሰረዙ/ጊዜያቸው ያለፈ) የBatch API ሥራዎችን ከየመስመራቸው የፍተሻ ነጥቦች ጋር እንዲሰርዝ፣ እንዲሁም የራሳቸው `expires_at` ካለፈ በኋላ የተሰቀሉ ፋይሎችን BLOB ይዘት እንዲያጸዳ ይፍቀዱ። በነባሪ ጠፍቷል፦ ኦፕሬተር እስኪያነቃው ድረስ እያንዳንዱ ነባር ጭነት ይህን ውሂብ ልክ እንደበፊቱ ያቆየዋል። በኦፕሬተር የሚጀመረው `DELETE /api/v1/batches/delete-completed` መስመር በሁለቱም ሁኔታዎች አይነካም — ይህ የተለየ፣ ቅድመ ሁኔታ የሌለው የሕዝብ API ውል ነው።                                                   |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |           | የመረጠው ጥያቄ ለሚያካሂደው የዥረት የሕይወት ዑደት የተመረጠውን Antigravity መለያ ያስይዙ፤ በዚህም በአንድ ጊዜ የሚካሄድ ድጋሚ ሙከራ ወይም የማረጋገጫ መረጃ ርክክብ፣ በሂደት ላይ ላለ ዥረት አስቀድሞ የተመደበ መለያን ዳግም እንዳይመርጥ ያደርጋል። ማስያዣው በ(ግንኙነት፣ ሊጠራ በሚችል የላይኛው አቅራቢ ሞዴል) ወሰን የተገደበ ስለሆነ፣ አንድ መለያ አሁንም ሁለት የተለያዩ ሞዴሎችን በአንድ ጊዜ ማገልገል ይችላል። ለዚያ ሞዴል ሁሉም ብቁ መለያዎች አስቀድመው በማስያዝ ላይ ሲሆኑ፣ ጥያቄው በተጨናነቀ መለያ ላይ ከመከመር ይልቅ ከተገደበ `Retry-After` ጋር የተዋቀረ 503 `antigravity_pool_busy` ይመልሳል። በነባሪ ጠፍቷል፦ የመለያ ምርጫው ልክ እንደበፊቱ ይቆያል፣ ምንም ማስያዣም አይደረግም። |

### CLI (5)

| ቁልፍ                                   | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                            |
| ------------------------------------- | ------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓         | ለሁሉም የCLI ደንበኞች የተኳኋኝነት ሁነታን ያንቁ።                                                                                                                               |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |           | የሞዴል ተለዋጭ ስም ተኳኋኝነት ንብርብርን ያንቁ።                                                                                                                                 |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |           | ራስ-ሰር የዋጋ መረጃ ማመሳሰልን ያንቁ (የ`PRICING_SYNC_ENABLED` የአካባቢ ተለዋዋጭንም ይፈልጋል)።                                                                                         |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |           | የአቅራቢ ሞዴል ከተመሳሰለ በኋላ፣ የ~/.codex/*.config.toml መገለጫ ፋይሎችን ከቀጥታው ካታሎግ በራስ-ሰር (እንደገና) ይጻፉ። ንቁውን/ነባሪውን የCodex ውቅር ፈጽሞ አይለውጥም። በነባሪ ጠፍቷል።                            |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |           | የአቅራቢ ሞዴል ከተመሳሰለ በኋላ፣ የ~/.claude/profiles/<name>/settings.json Claude Code መገለጫዎችን ከቀጥታው ካታሎግ በራስ-ሰር (እንደገና) ይጻፉ። ንቁውን/ነባሪውን የClaude ውቅር ፈጽሞ አይለውጥም። በነባሪ ጠፍቷል። |

### ጤና (5)

| ቁልፍ                                       | ዓይነት | ነባሪ     | መግለጫ                                                                                                                                                                                                               |
| ----------------------------------------- | ---- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | ቡሊያን | `false` | የአካባቢያዊ ኢንስታንሱን የጤና ምርመራ መጨረሻ ነጥብ ያሰናክላል።                                                                                                                                                                          |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | ቡሊያን | `false` | የቶከን ማረጋገጫ የጤና ምርመራን ያሰናክላል።                                                                                                                                                                                       |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | ቡሊያን | `false` | በችሎታዎች sandbox አካባቢ ውስጥ የኔትወርክ መዳረሻን ያነቃል።                                                                                                                                                                         |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | ቡሊያን | `false` | በፕሮክሲ ጤና ፍተሻ ውስጥ ዒላማው ያልተቀበለው መመርመሪያ (401/403/429) የፕሮክሲውን ተከታታይ የውድቀት ቆጠራ ዳግም ያስጀምራል። በነባሪነት ጠፍቷል፦ አለመቀበል ገለልተኛ ሆኖ ይቆያል (#10654)። 5xx በሁለቱም ሁኔታ የማያረጋግጥ ሆኖ ይቆያል፤ አለመቀበል ፕሮክሲን ፈጽሞ አያስወግድም፣ አያሰናክልም ወይም ዳግም አያነቃም። |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | ቡሊያን | `false` | የአገልጋዩን ጅምር እስኪጠናቀቅ ከማገድ ይልቅ አገልጋዩ ጥያቄዎችን መቀበል ከጀመረ በኋላ (በ`setImmediate` አማካኝነት) የጅምር DB ትክክለኛነት/ጤና ምርመራን ያካሂዳል (#13717)። በነባሪነት ጠፍቷል፦ ጅምሩ ከዚህ PR በፊት እንደነበረው በትክክል ይታገዳል።                                         |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` እና የቀድሞ ተለዋጭ ስሙ
> `INJECTION_GUARD_BLOCK_THRESHOLD` የ`INJECTION_GUARD_MODE`ን `block` ሁነታ
> ያስተካክላሉ፣ ነገር ግን እነዚህ በ
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> የሚነበቡ መደበኛ የአካባቢ ተለዋዋጮች እንጂ የባህሪ ባንዲራዎች አይደሉም፦ የDB መሻሪያም ሆነ የዳሽቦርድ መቀያየሪያ የላቸውም።
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)ን ይመልከቱ።

> [!NOTE]
> የ`Restart` ዓምድ `requiresRestart: true` ያላቸውን ባንዲራዎች ያመለክታል — እሴቱ
> ወዲያውኑ ይቀመጣል፣ ነገር ግን ሂደቱ ዳግም ከተጫነ በኋላ ብቻ ተግባራዊ ይሆናል። Enum
> ባንዲራዎች ከተፈቀደው ስብስባቸው ውጭ ያለ ማንኛውንም እሴት ውድቅ ያደርጋሉ (በሁለቱም
> `setFeatureFlagOverride()` እና የREST `PUT` ተቆጣጣሪ ውስጥ በአገልጋይ በኩል የተረጋገጠ)።

---

## ፍላጎችን ማብራትና ማጥፋት

### ዳሽቦርድ

ወደ **Dashboard → Settings → Feature Flags**
(`/dashboard/settings/feature-flags`) ይሂዱ። ፍርግርጉ
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
የሚከተሉትን ይደግፋል፦

- በቁልፍ ወይም በመግለጫ **መፈለግ**፣ እንዲሁም በምድብ **ማጣራት** (በተጨማሪ ሰው ሠራሽ
  **Requires Restart** እይታ)።
- ለቡሊያን ፍላጎች **ማብሪያ/ማጥፊያ** እና ለenum ፍላጎች **ተቆልቋይ ምናሌ**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)።
- ውጤታማው እሴት ከየት እንደመጣ የሚያሳይ፣ ለእያንዳንዱ ፍላግ የሚታይ **የምንጭ ባጅ** — `DB`፣ `ENV` ወይም `DEF`።
- ማሻሻያውን ለማስወገድ **Reset** አዝራር (`DB` ምንጭ ላላቸው ፍላጎች ብቻ የሚታይ)፣
  እና ከታች **Reset All Overrides** አዝራር።
- `requiresRestart` ፍላግ ሲቀየር **Restart Server** ሰንደቅ።

### REST API

ሁሉም ክወናዎች በአንድ መስመር በኩል ያልፋሉ፦
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts)።
እያንዳንዱ ዘዴ የተረጋገጠ የዳሽቦርድ ክፍለ ጊዜ ይፈልጋል (ካልሆነ `401`)።

#### `GET /api/settings/feature-flags`

እያንዳንዱን ፍላግ ከውጤታማ እሴቱ፣ ምንጩ እና ማጠቃለያው ጋር ይመልሳል።

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
    // ... ሁሉም 74 ፍላጎች
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

አንድ ማሻሻያ ያዘጋጁ ወይም ያስወግዱ። የጥያቄ አካል፦ `{ key: string; value?: string }`።
`value`ን አለማካተት ማሻሻያውን ያስወግዳል (env / defaultን ይመልሳል)።

```bash
# የDB ማሻሻያ አዘጋጅ
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# ማሻሻያውን አስወግድ ("value" የለም)
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

ምላሹ አዲሱን `effectiveValue`/`source`፣ `previousValue`/
`previousSource` እና `requiresRestart` መልሶ ያሳያል። ያልታወቁ ቁልፎች እና ከተፈቀደው ክልል ውጭ ያሉ የenum
እሴቶች በ`400` ውድቅ ይደረጋሉ።

#### `DELETE /api/settings/feature-flags`

ሁሉንም የDB ማሻሻያዎች በአንድ ጊዜ ያጸዳል፣ እያንዳንዱን ፍላግ ወደ env / default
እሴቱ ይመልሳል። `{ cleared: <count>, message: "..." }`ን ይመልሳል።

> [!NOTE]
> `requiresRestart: true` ያላቸው ፍላጎች ተግባራዊ የሚሆኑት ሂደቱ እንደገና ከተጫነ በኋላ ብቻ ነው።
> የዳሽቦርዱ እንደገና ማስጀመሪያ ፍሰት `POST /api/restart`ን ይጠራና አገልጋዩ እንደገና እስኪነሳ ድረስ
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
