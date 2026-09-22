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

## የፍላጎች ካታሎግ

በ6 ምድቦች የተከፋፈሉ 75 ፍላጎች። **ነባሪ** ማለት የትርጉሙ ነባሪ ነው — የDB መሻርም ሆነ የአካባቢ ተለዋዋጭ በማይኖርበት ጊዜ
ጥቅም ላይ የሚውለው እሴት ነው።

### ደህንነት (10)

| ቁልፍ                                     | ዓይነት    | ነባሪ      | መግለጫ                                                                                                                                                                                         |
| --------------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | ለሁሉም ገቢ ጥያቄዎች API ቁልፍ እንዲኖር ይጠይቃል።                                                                                                                                                           |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | ለሁሉም ጥያቄዎች የግቤት ማጽዳትን ያንቁ።                                                                                                                                                                   |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | የፕሮምፕት መርፌ ጥቃት መከላከያ ሁነታ። እሴቶች፦ `off`፣ `warn`፣ `block`፣ `redact`።                                                                                                                            |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | PIIን ከጥያቄዎች ያውጡ (`INPUT_SANITIZER_MODE` ላይ ጥገኛ አይደለም)።                                                                                                                                       |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | PIIን ከአቅራቢ ምላሾች ያጽዱ።                                                                                                                                                                         |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | የPII ምላሽ ማጽዳት ሁነታ። እሴቶች፦ `redact`፣ `warn`፣ `block`፣ `off`።                                                                                                                                   |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | ወደ የግል/ውስጣዊ IP ክልሎች የሚላኩ ጥያቄዎችን ያግዱ።                                                                                                                                                         |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | የተረጋገጡ የዳሽቦርድ ተጠቃሚዎች የተደበቁ እሴቶችን ብቻ ከማየት ይልቅ የተከማቹ API ቁልፎችን እንዲያሳዩ ይፍቀዱ።                                                                                                                    |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | በAUTH ምዝግብ መስመሮች ውስጥ የመለያ ቅድመ ቅጥያውን ያካትቱ (ለምሳሌ፦ "<provider> መለያን በመጠቀም ላይ፦ abc12345...")። የመለያ መለያዎች ከጋራ/ባለብዙ ተከራይ የሂደት ምዝግቦች እንዲወገዱ በነባሪነት ቦዝኗል። ከማረሚያ ሁነታ ነጻ ነው፤ ማረሚያ ሁነታን መቀየር ይህን አያሳይም። |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | OIDC ሲነቃ ተጠቃሚዎች በOIDC ነጠላ መግቢያ ብቻ ማረጋገጥ እንዲችሉ በይለፍ ቃል መግባትን ያሰናክሉ። ሲሰናከል (ነባሪው)፣ በይለፍ ቃል መግባትም ሆነ OIDC ይገኛሉ።                                                                                 |

### አውታረ መረብ (17)

| ቁልፍ                                             | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------- | ------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓         | የTLS fingerprint ድብቅ ሁነታን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                    |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |           | የ/v1/audio/* መስመሮች localhost ውጭ የተስተናገዱ OpenAI-ተኳኋኝ provider nodesን እንዲጠቀሙ ይፍቀዱ። በነባሪ ጠፍቷል — ኦዲዮን ወደ ሩቅ host ማስተላለፍ የወጪ ትራፊክ ማንነትን ይለውጣል፣ ስለዚህም ግልጽ የoperator ውሳኔ መሆን አለበት። Loopback nodes ሁልጊዜ የተፈቀዱ ሲሆኑ በዚህ አይጎዱም።                                                                                                                                                                              |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |           | POST /v1/rerank (እና የmemory engine loopback rerank ደረጃ) localhost ውጭ የተስተናገዱ OpenAI-ተኳኋኝ provider nodesን እንዲጠቀም ይፍቀዱ። በነባሪ ጠፍቷል — ወደ ሩቅ host ማስተላለፍ የወጪ ትራፊክ ማንነትን ይለውጣል፣ ስለዚህም ግልጽ የoperator ውሳኔ መሆን አለበት። Loopback nodes ሁልጊዜ የተፈቀዱ ናቸው፤ remote nodes በተጨማሪ የprovider outbound URL policyን ማለፍ አለባቸው።                                                                                           |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |           | ለአንድ connection proxy ካልተመደበለት፣ ከregistry ውስጥ የመጀመሪያውን የሚሰራ proxy በራስ-ሰር ይምረጡ። በነባሪ ጠፍቷል (አለበለዚያ በregistry ውስጥ ያለ ማንኛውም proxy ዓለም አቀፍ fallback ይሆናል — #3332)።                                                                                                                                                                                                                                     |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |           | የproxy ተደራሽነት ቅድመ-ምርመራዎች ሲወድቁ፣ OAuth እና provider validation flows የተወሰነላቸውን proxy አልፈው በቀጥታ እንዲገናኙ ይፍቀዱ። ይህ የወጪ ትራፊክ IPን ሊለውጥ ስለሚችል በነባሪ ጠፍቷል።                                                                                                                                                                                                                                                    |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |           | ለmulti-account rotation executor የnetwork exception (timeout፣ connection refused/reset) ሲከሰት፣ ችግሩ ያጋጠመው account የራሱ dedicated proxy ከሌለው፣ እያንዳንዱን በድጋሚ ከመሞከር ይልቅ አጭር cooldown በመተግበር ለቀሪው request proxy የሌላቸውን accounts ይዝለሉ። በነባሪ በርቷል (ደህንነቱ የተጠበቀ፦ የወጪ ትራፊክ IP አይለወጥም፣ shared-egress accounts ላይ የlatency/cooldown አደጋን ብቻ ይቀንሳል)። በመጀመሪያው proxy የሌለው throw ላይ አፋጣኝ propagationን ለመመለስ ያሰናክሉት። |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |           | Proxy pools እና የopencode የper-account rotation በቅርቡ የወደቀ proxyን (ውድቅ የተደረገ TCP probe፣ ወይም በእሱ በኩል የተቀበለ 429) እያንዳንዱ ውድቀት ሲደገም እስከተወሰነ ገደብ ድረስ በእጥፍ ለሚጨምር የper-process ጊዜ እንደገና ማቅረብ ያቆማሉ። ምንም የproxy status አይጻፍም፤ እያንዳንዱ candidate ወደጎን ቢቀመጥም ምርጫው አይለወጥም። በነባሪ ጠፍቷል።                                                                                                                            |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |           | በdashboard ውስጥ ከproxy pool ስር፣ ባለፉት 24 h ለmembers አገልግሎት የሰጡ የታዩ የወጪ ትራፊክ IPዎች ብዛት እና የተጠቀሟቸው connections ብዛት ያሳዩ። Read-only ነው፣ ከproxy log ይሰላል፣ ለrouting ፈጽሞ ጥቅም ላይ አይውልም። በነባሪ ጠፍቷል።                                                                                                                                                                                                           |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |           | ለOpenCode executor፣ የstreamed Responses replyን የመጀመሪያ body byte ይከታተሉ (window፦ `RESPONSES_FIRST_BYTE_TIMEOUT_MS`፣ ነባሪ `15000`)። ከwindowው ጊዜ በላይ ዝም ያለ 2xx Responses stream stalled እንደሆነ ይቆጠራል፦ accountው cooldown ውስጥ ይገባል፣ requestውም አንድ ጊዜ ወደሚቀጥለው account ይዞራል፤ ሁለተኛ stall በፍጥነት ውድቀት ያስከትላል። በነባሪ ጠፍቷል፦ stalled streams እስከstream readiness timeout ድረስ የዛሬውን መጠበቅ ይቀጥላሉ።                     |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |           | OpenCode አስፈጻሚ፦ `user_blocked` የሚል እምቢታ የያዘ 403/451 ሲመጣ (ከጂኦግራፊያዊ እገዳ ወይም ከCloudflare fingerprint ውድቅ ማድረግ ውጭ)፣ ውድቅ የተደረገውን መለያ ለጊዜው አሳርፎ በእያንዳንዱ ጥያቄ ከአንድ ጊዜ ያልበለጠ ወደ ቀጣዩ መለያ ያዞራል፤ ሁለተኛ እምቢታ የስኬት ምልክት ሳይደረግበት እንዳለ ይመለሳል። በነባሪ ጠፍቷል፦ ከupstream የተጠቃሚ እገዳ ለማለፍ ማስተላለፍ እንደ ማምለጥ ሊታይ እና ምልክቱን በመላው የመለያዎች ስብስብ ላይ ሊያሰራጭ ይችላል።                                                                     |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |           | OpenCode ማዞር፦ ሁለት ተከታታይ ጊዜያዊ የupstream ውድቀቶች (5xx ወይም ባዶ 400) ከተከሰቱ በኋላ፣ ወደ ቀጣዩ መለያ ከመሄድ በፊት ለአፍታ ይቆማል — ከ1.5s ጀምሮ በእያንዳንዱ ተጨማሪ ውድቀት በእጥፍ ይጨምራል፣ በእያንዳንዱ ማቆሚያ እስከ 6s እና በእያንዳንዱ ጥያቄ እስከ 10s ይገደባል፣ ደንበኛው ግንኙነቱን ካቋረጠ ይዘለላል፤ ያልተሳካው body ከመጠበቅ በፊት ይለቀቃል። በነባሪ ጠፍቷል፦ failover ወዲያውኑ መከናወኑን ይቀጥላል።                                                                                                  |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |           | OpenCode ማዞር፦ ተደጋጋሚ ጊዜያዊ 429ዎች (ወይም አዲስ የpool ጫና ምልክት) ከተከሰቱ በኋላ ጥያቄውን ከheartbeat ጋር ያቆያል፣ ከዚያም በመላው የመለያዎች ስብስብ ላይ በአንድ ጊዜ ከማሰራጨት ይልቅ እስከ 3 ተከታታይ መለያዎች የተገደበ አንድ ዙር እንደገና ያጫውታል። በነባሪ ጠፍቷል፦ እያንዳንዱ 429 ልክ እንደበፊቱ ወደ ቀጣዩ መለያ ያዞራል።                                                                                                                                                               |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |           | OpenCode ማዞር፦ እንደ እውነተኛ rate limit የተመደበው የመጀመሪያው 429 ላይ የመለያዎችን ተከታታይ ሙከራ ያቆማል (ሊተነተን የሚችል `Retry-After`፣ ወይም የrate/usage limit የሚጠቅስ body) እና ያንን የupstream 429 ሳይቀይር ይመልሳል። ያልተመደቡ 429ዎች ማዞራቸውን ይቀጥላሉ። በነባሪ ጠፍቷል፦ free tier በእያንዳንዱ egress IP የተገደበ ነው (#9611)፣ ስለዚህ እያንዳንዱ 429 ያዞራል እና የመለያዎች ተከታታይ ሙከራ ሲሟጠጥ የመጨረሻውን የupstream 429 ይመልሳል።                                                     |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓         | ለMITM proxy የTLS ሰርተፊኬት ማረጋገጫን ያሰናክላል። **አደገኛ።**                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |           | ወደ የግል/ውስጣዊ አውታረ መረቦች የሚያመለክቱ የprovider URLዎችን ይፈቅዳል።                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |           | በአካባቢያዊ/የግል አድራሻዎች (127.0.0.1, localhost, LAN) ላይ providerዎችን መጨመር/ማረጋገጥ ይፈቅዳል። በነባሪ ክፍት ነው (local-first)፤ በጥብቅ ይፋዊ አድራሻዎችን ብቻ ለመፍቀድ ያሰናክሉት። Cloud-metadata እንደታገደ ይቆያል።                                                                                                                                                                                                                          |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓         | ከClaude Code ጋር ተኳሃኝ የሆነውን provider mode ያነቃል።                                                                                                                                                                                                                                                                                                                                                    |

### ፖሊሲዎች (5)

| ቁልፍ                             | ዓይነት    | ነባሪ        | መግለጫ                                                                                                                                                  |
| ------------------------------- | ------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | የመሣሪያ አጠቃቀም ፖሊሲ ማስፈጸሚያ ሁነታ። እሴቶች፦ `disabled`፣ `warn`፣ `block`።                                                                                        |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | በአጠቃቀም ቅጦች ላይ በመመስረት የፍጥነት ገደብን በራስ-ሰር ያንቁ።                                                                                                           |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | ለቀጥታ ነጠላ-ሞዴል ጥያቄዎች የOmniRouteን አካባቢያዊ የአውድ-መስኮት / ከፍተኛ-የግቤት-ቶከን ፍተሻ ይዝለሉ። የላይኛው ዥረት ገደቦች አሁንም ተፈጻሚ ናቸው።                                               |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | የታለመው ሞዴል አስፈላጊ ችሎታዎች (ራዕይ፣ መሣሪያዎች፣ የተዋቀረ ውጤት፣ የአውድ መስኮት) ከሌሉት ከማስተላለፉ በፊት ጥያቄዎችን ውድቅ ያድርጉ። የጥምር-ንብርብር ተኳኋኝነት ማጣሪያን የሚያልፉ ቀጥተኛ ነጠላ-አቅራቢ ጥያቄዎችን ይጠብቃል። |
| `RADAR_ENABLED`                 | boolean | `false`    | የOmniRoute Radar ሞጁልን (የካታሎግ ምግብ ማያ ገጾች እና ማመሳሰል) ያንቁ። በነባሪ ጠፍቷል፤ ማንቃት የተጠቃሚ በይነገጹን ብቻ ይከፍታል — የውሂብ ማመሳሰል የተለየ በፈቃድ የሚነቃ ሆኖ ይቀራል።                     |

### የአሂድ ጊዜ (33)

| ቁልፍ                                         | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------- | ------- | ------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |           | የጥምር ማዘዋወር ሞዴሎችን ሲቀይር የውይይት ማጠቃለያዎችን ይፍጠሩ እና ያስገቡ። የሞዴል ለውጦችን እርስ በርሳቸው ነጻ አድርጎ ለመያዝ እና ለሁሉም ነባርና ወደፊት ለሚፈጠሩ ጥምሮች የጀርባ ሂደት ርክክብ ጥያቄዎችን ለመከላከል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                                        |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |           | ወደ ደንበኞች ከመላካቸው በፊት የውስጥ አስተያየት-ደረጃ ውጤት ንጥሎችን ከResponses API ቀጥታ-ማሳለፊያ ዥረቶች ያስወግዱ። ከምንጩ የሚመጣውን ያልተቀየረ አስተያየት ለመቀበል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |           | የMCP መሣሪያ መዳረሻ ላይ የወሰን ገደቦችን ያስፈጽሙ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |           | የቶከን አጠቃቀምን ለመቀነስ የMCP መሣሪያ መግለጫዎችን ይጨመቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |           | በሩጫ ጊዜ የጀርባ ተግባር ማስኬድን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓         | ሁሉንም የጀርባ አገልግሎቶች (የኮታ ማደስ፣ ማመሳሰል፣ ወዘተ) ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |           | የፕሮጀክት ደረጃ RTK ማጣሪያዎችን ያለ ማረጋገጫ እመን።                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓         | በማስመጣት ጊዜ የቅጽበታዊ ዳሽቦርድ WebSocket አገልጋይን አስጀምር (በነባሪ ወደብ 20132)።                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |           | Codex የResponses-over-WebSocket ማጓጓዣን እንዲጠቀም ፍቀድ። ሲጠፋ Codex ወደ HTTP Responses ይመለሳል።                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |           | Codex የአካባቢያዊውን app-server WebSocket JSON-RPC ማጓጓዣ (`codexTransport=app-server`) እንዲጠቀም ፍቀድ። ሲጠፋ፣ app-server ለመጠቀም የተመረጡ ግንኙነቶች ወደ ሌሎች የCodex ማጓጓዣዎች ይመለሳሉ።                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |           | በጀታቸው ያለቀባቸውን ጥያቄዎች ወደ ድንገተኛው ነፃ ተተኪ አቅራቢ/ሞዴል ላክ። (ከታች [የድንገተኛ ጊዜ የበጀት ተተኪ](#emergency-budget-fallback)ን ይመልከቱ።)                                                                                                                                                                                                                                                                                                                                                                                                             |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |           | ማንኛውም የምላሽ ባይቶች ወደ ደንበኛው ከመድረሳቸው በፊት፣ ለተቋረጡ የላይኛው ምንጭ SSE ዥረቶች ግልጽ የቅድሚያ ዳግም ሙከራን አንቃ።                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |           | ባይቶች ወደ ደንበኛው ከደረሱ በኋላ የዥረት መልሶ ማግኛው እንደገና እንዲጠይቅና ምላሹን እንዲያገናኝ ፍቀድ።                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |           | የዥረት አጋማሽ ቀጣይነትን ለመሣሪያ ጥሪ ደህንነቱ የተጠበቀ አድርግ፦ አንድ ጊዜ የመሣሪያ ጥሪ ከተላከ (በሂደት ላይ ያለ ወይም በ`finish_reason` `tool_calls` ተጠናቆ የነበረ) የተቋረጠ ዥረትን በፍጹም አትቀጥል፣ እንዲሁም በጀቱን በሙሉ ከማውጣት ይልቅ ከአንድ ባዶ ቀጣይነት በኋላ ዝጋ። ሲጠፋ፦ የልቀት ባህሪ።                                                                                                                                                                                                                                                                                                               |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |           | አንድ SSE ዥረት ምንም ጠቃሚ ፍሬም ሳያወጣ ሲዘጋ እና በተመሳሳዩ ግንኙነት ላይ የተወሰነው ዳግም ሙከራ ሲያልቅ፣ አንድ ጊዜ ወደ ተጓዳኝ ግንኙነት ቀይር፤ ጥቅም ላይ ሊውል የሚችል ተጓዳኝ ግንኙነት ከሌለ የመጀመሪያው `STREAM_EARLY_EOF` 502 ይመለሳል። በነባሪ ጠፍቷል፦ ቀደምት-EOF በተመሳሳዩ ግንኙነት ላይ ከሚደረገው ዳግም ሙከራ በኋላ የመጨረሻ ሁኔታ ሆኖ ይቆያል።                                                                                                                                                                                                                                                                            |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |           | በ`/v1/models` ምላሾች ውስጥ ለማሳያ ምቹ የሆኑ የስም መስኮችን አካትት። የሞዴል መለያዎችን ብቻ ለሚጠብቁ ደንበኞች ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |           | በ/v1/models ውስጥ የሞዴል መለያዎች ቅድመ ቅጥያ እንዴት እንደሚያገኙ ይቆጣጠራል። 'dual' (ነባሪ) ከቀደሙ ስሪቶች ጋር ለተኳኋኝነት የቅጽል ስም እና የመደበኛ provider-id ቅድመ ቅጥያዎችን ሁለቱንም ያወጣል። 'alias' አጭሩን የቅጽል ስም ቅድመ ቅጥያ ብቻ ያወጣል (ለምሳሌ ds-web/model፣ deepseek-web/model ሳይሆን)። 'canonical' ሙሉውን provider-id ቅድመ ቅጥያ ብቻ ያወጣል። እሴቶች፦ `dual`፣ `alias`፣ `canonical`።                                                                                                                                                                                                           |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |           | ለሞዴል ብልህነት ደረጃዎች ወቅታዊ የArena AI የውጤት ሰሌዳ ELO ማመሳሰልን አንቃ።                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |           | የClaude Code ጌትዌይ ሞዴል ፍለጋ Claude ያልሆኑ ሞዴሎችን እንዲዘረዝር፣ የ`claude/<provider>/<model>` አንጸባራቂ መለያዎችን በ`/v1/models` ላይ አስተዋውቅ። የሶስት-ደረጃ በር ዓለም አቀፍ ደረጃ (env ከዳሽቦርድ መሻሪያው ይቀድማል)። [የClaude Code ውቅር](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)ን ይመልከቱ።                                                                                                                                                                                                               |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |           | ለno-think/<provider>/<model> ጌትዌይ ቅጽል ስሞች ዋና ማብሪያ። ሲበራ (ነባሪ)፦ /v1/models ለእያንዳንዱ ብቁ እና የማሰብ ችሎታ ላለው Claude ሞዴል የማያስብ ተለዋጭ ያስተዋውቃል፤ እንዲሁም በጥያቄ ላይ የተላከ no-think/ መለያ ምክንያታዊ አስተሳሰብ ታፍኖ ወደ እውነተኛው ሞዴል ይፈታል። ሲጠፋ፦ ምንም ተለዋጮች አይተዋወቁም፣ እና no-think/ መለያ እንደማንኛውም ሌላ ያልታወቀ የሞዴል መለያ ይቆጠራል። ይህ በርቶ ሳለ የእያንዳንዱ ሞዴል ModelSpec.noThinkingAlias የመርጦ-መግባት/የመርጦ-መውጣት ቅንብር አሁንም ተግባራዊ ይሆናል።                                                                                                                                               |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |           | በ/v1/models ካታሎግ ውስጥ የአስተሳሰብ ደረጃ ተለዋጮችን (ለምሳሌ -low፣ -medium፣ -high) ማመንጨትን አሰናክል።                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓         | ለአቅራቢ መላክ በተከራይ የሚለያዩ እና ራሳቸውን የሚያስተካክሉ ምናባዊ የመግቢያ መስመሮችን አንቃ (#9654)፦ የአንድ ተከራይ ድንገተኛ ጭማሪ ከእንግዲህ ሌላውን 503 እንዲያገኝ አያደርግም። የ`OMNIROUTE_CHAT_VIRTUAL_LANES` env var ከዚህ የዳሽቦርድ መሻሪያ ይቀድማል፤ ለውጦች አገልጋዩ ዳግም ሲጀምር ተግባራዊ ይሆናሉ።                                                                                                                                                                                                                                                                                                     |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |           | መደበኛ ባለቤታቸው ንቁ ማረጋገጫ የሌለው፣ ነገር ግን ንቁ ማረጋገጫ ያለው ቀጥታ-አሳላፊ gateway ወደ እነሱ የሚያዞርባቸው ሞዴሎች፣ የ<gateway-alias>/<model> mirror idsን በ/v1/models ላይ ያስተዋውቁ። ማስጠንቀቂያ፦ በዓለም አቀፍ ደረጃ ሲነቃ ለሁሉም clients የcatalog ግቤቶችን ይጨምራል።                                                                                                                                                                                                                                                                                                               |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |           | ከNew-API / One-API / Sub2API aggregator ጋር ተኳዃኝ ለሆኑ nodes የbalance ማወቅን ያንቁ። ሲነቃ፣ የaggregator flag የተቀናበረላቸው ተኳዃኝ nodes ቀሪ ሂሳባቸውን በdashboard እና quota-preflight routing ውስጥ ሪፖርት ያደርጋሉ።                                                                                                                                                                                                                                                                                                                                      |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |           | ሞዴሉ በclient ጥቅም ላይ ሊውል የሚችል ምላሽ እስኪመልስ ድረስ፣ streaming የማይጠቀሙ በserver ባለቤትነት የሚተዳደሩ tool callsን ይቀጥሉ።                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |           | የፍለጋ ስታቲስቲክስ እና የቅርብ ጊዜ ፍለጋዎች፣ አሁንም ንቁ connection ያላቸውን providers ብቻ ይቆጥራሉ (እንደ duckduckgo-free ያሉ keyless providers ሁልጊዜ ይቆጠራሉ)። ማጥፋት እያንዳንዱን የተያዘ የፍለጋ ረድፍ ከprovider id ጋር ያቆያል።                                                                                                                                                                                                                                                                                                                                           |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |           | የdashboard provider ገጾች፦ Free badgeን providerው በሚያከብራቸው signals ላይ ብቻ ያሳዩ — ሰነድ የተደረገለት free tier በሌላቸው registered providers ላይ የdisplay-name heuristicን፣ boolean ያልሆኑ free fieldsን እና :free suffixesን ያስወግዳል። ማጥፋት ታሪካዊውን የbadge ደንብ ያቆያል።                                                                                                                                                                                                                                                                                  |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |           | በተጠቃለሉ 429/503 unavailable responses ላይ፣ ተጨባጭ የወደፊት retry ጊዜ የማይታወቅ ከሆነ `Retry-After`ን አያካትቱ (ሰው ሠራሽ 1s ከመጠቀም ይልቅ)፣ `error.retry_after_provenance` (`signal` \| `none`)ን ያክሉ፣ እና combo drain paths ከJSON እና plain-text upstream bodies ውስጥ በጽሑፍ የቀረቡ retry hintsን እንዲያነቡ ይፍቀዱ። ይህ field የሚታየው በ`unavailableResponse()` በተፈጠሩ responses ላይ ብቻ ነው፤ ሌሎች 429/503 bodies ሳይቀየሩ ይቆያሉ።                                                                                                                                              |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |           | fallback-only-on-quota-exhaustion የሚል ምልክት የተደረገበት `priority` combo target፣ መንስኤው quota አለመሆኑ በማያጠራጥር ሁኔታ ሊረጋገጥ በሚችልበት ምክንያት (የprovider circuit breaker ክፍት መሆን፣ ትንበያዊ latency skip) comboውን ሲያቆም፣ quotaን ከሚመስለው 503 ይልቅ 502 ይመልሱ። በlockout፣ cooldown፣ unavailable፣ exhaustion እና concurrency-cap ምክንያት የሚከሰቱ ማቆሚያዎች 503ን እንደያዙ ይቆያሉ።                                                                                                                                                                                        |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |           | ተጨማሪ መረጃ የሌለው Mistral 401 (`{"detail":"Unauthorized"}`፣ ግልጽ auth signal የሌለው) ለተሻረ key እና quotaው ላለቀበት ሁኔታ ተመሳሳይ ነው። ሲበራ፣ connectionውን `expired` ብሎ ከማቆም ይልቅ cooldown ውስጥ ያስገባዋል፤ ይህም በሰዓት ለእያንዳንዱ connection ቢበዛ 3 ጊዜ ነው፤ የሚቀጥለው ግን ያቆመዋል፣ ስለዚህ የተሻረ key አሁንም በመጨረሻ ይቆማል። በነባሪነት ጠፍቷል፦ ተጨማሪ መረጃ የሌለው እያንዳንዱ Mistral 401 እንደበፊቱ connectionውን ያቆማል።                                                                                                                                                                           |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |           | የማይለወጥ ስታቲክ seed ከመጠቀም ይልቅ፣ OAuth bearer tokenን በመጠቀም ለ`xai-oauth` ግንኙነቶች የቀጥታውን xAI model catalog ከ`https://api.x.ai/v1/models` ያምጡ። በነባሪነት ጠፍቷል፦ `xai-oauth` የማይለወጠውን ስታቲክ seed እንዳለ ማቅረቡን ይቀጥላል። ማንኛውም የመፍታት ስህተት ሲከሰት፣ discovery ወደ seed ይመለሳል (x.ai በዚህ endpoint ላይ OAuth bearerን ይቀበል እንደሆነ አልተረጋገጠም)።                                                                                                                                                                                                                 |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |           | ራስ-ሰር cleanup sweep ከ`OMNIROUTE_BATCH_RETENTION_DAYS` በላይ የቆዩ terminal (completed/failed/cancelled/expired) Batch API jobsን ከየመስመራቸው checkpoints ጋር እንዲሰርዝ፣ እንዲሁም የራሳቸውን `expires_at` ያለፉ የተሰቀሉ filesን BLOB content እንዲያጸዳ ይፍቀዱ። በነባሪነት ጠፍቷል፦ operator እስኪያነቃው ድረስ እያንዳንዱ ነባር install ይህን ውሂብ ልክ እንደበፊቱ ያቆየዋል። በoperator የሚጀመረው `DELETE /api/v1/batches/delete-completed` route በሁለቱም ሁኔታዎች አይነካም — ይህ የተለየና ቅድመ ሁኔታ የሌለው public API contract ነው።                                                                            |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |           | የመረጠው request በstreaming lifecycle ውስጥ ለተመረጠው Antigravity account ይያዙ፤ ይህም concurrent retry ወይም credential handoff በሂደት ላይ ላለ stream አስቀድሞ የተመደበ accountን ዳግም እንዳይመርጥ ያደርጋል። reservationው በ(connection, callable upstream model) የተወሰነ ስለሆነ፣ አንድ account አሁንም ሁለት የተለያዩ modelsን በአንድ ጊዜ ማቅረብ ይችላል። ሁሉም ብቁ accounts ለዚያ model አስቀድመው leased ሲሆኑ፣ requestው በተጨናነቀ account ላይ ከመከማቸት ይልቅ የተዋቀረ 503 `antigravity_pool_busy`ን ገደብ ካለው `Retry-After` ጋር ይመልሳል። በነባሪነት ጠፍቷል፦ account selection ልክ እንደበፊቱ ይቆያል፣ reservationም አይወሰድም። |

### CLI (5)

| ቁልፍ                                   | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                             |
| ------------------------------------- | ------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓         | ለሁሉም CLI clients compatibility modeን ያንቁ።                                                                                                                                        |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |           | የmodel alias compatibility layerን ያንቁ።                                                                                                                                           |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |           | ራስ-ሰር የpricing data synchronizationን ያንቁ (`PRICING_SYNC_ENABLED` environment variableንም ይፈልጋል)።                                                                                  |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |           | ከprovider model sync በኋላ፣ ~/.codex/*.config.toml profile filesን ከቀጥታ catalog በራስ-ሰር (እንደገና) ይጻፉ። active/default Codex configን በፍጹም አይለውጥም። በነባሪነት ጠፍቷል።                          |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |           | ከprovider model sync በኋላ፣ ~/.claude/profiles/<name>/settings.json Claude Code profilesን ከቀጥታ catalog በራስ-ሰር (እንደገና) ይጻፉ። active/default Claude configን በፍጹም አይለውጥም። በነባሪነት ጠፍቷል። |

### ጤና (5)

| ቁልፍ                                       | ዓይነት | ነባሪ     | መግለጫ                                                                                                                                                                                                            |
| ----------------------------------------- | ---- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | ቡሊያን | `false` | የአካባቢያዊውን ኢንስታንስ የጤና ምርመራ መጨረሻ ነጥብ ያሰናክላል።                                                                                                                                                                      |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | ቡሊያን | `false` | የቶከን ማረጋገጫ የጤና ምርመራን ያሰናክላል።                                                                                                                                                                                    |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | ቡሊያን | `false` | በክህሎቶች ማጠሪያ አካባቢ ውስጥ የአውታረ መረብ መዳረሻን ያነቃል።                                                                                                                                                                      |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | ቡሊያን | `false` | በፕሮክሲ ጤና ቅኝት ውስጥ፣ ዒላማው ያልተቀበለው ምርመራ (401/403/429) የፕሮክሲውን ተከታታይ የውድቀት ብዛት ዳግም ያስጀምራል። በነባሪ ጠፍቷል፦ አለመቀበል ገለልተኛ ሆኖ ይቆያል (#10654)። 5xx በሁለቱም ሁኔታ የማያረጋግጥ ሆኖ ይቆያል፤ አለመቀበል ፕሮክሲን ፈጽሞ አያስወግድም፣ አያሰናክልም ወይም ዳግም አያነቃም። |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | ቡሊያን | `false` | ሲጠናቀቅ ድረስ የአጀማመር ሂደቱን ከመከልከል ይልቅ፣ ሰርቨሩ ጥያቄዎችን መቀበል ከጀመረ በኋላ (በ`setImmediate` በኩል) የአጀማመር DB ትክክለኛነት/ጤና ምርመራን ያስኬዳል (#13717)። በነባሪ ጠፍቷል፦ የአጀማመር ሂደቱ ከዚህ PR በፊት እንደነበረው በትክክል ይታገዳል።                              |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` እና የቀድሞ ተለዋጭ ስሙ
> `INJECTION_GUARD_BLOCK_THRESHOLD` የ`INJECTION_GUARD_MODE`ን `block` ሁነታ
> ያስተካክላሉ፣ ነገር ግን በ
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> የሚነበቡ ተራ የአካባቢ ተለዋዋጮች እንጂ የባህሪ ጥቆማዎች አይደሉም፦ የDB መሻርም ሆነ የዳሽቦርድ መቀያየሪያ የላቸውም።
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)ን ይመልከቱ።

> [!NOTE]
> የ`Restart` ዓምድ `requiresRestart: true` ያላቸውን ጥቆማዎች ያመለክታል — እሴቱ
> ወዲያውኑ ይቀመጣል፣ ነገር ግን ሂደቱ እንደገና ከተጫነ በኋላ ብቻ ተግባራዊ ይሆናል። Enum
> ጥቆማዎች ከተፈቀደላቸው ስብስብ ውጪ ያለን ማንኛውንም እሴት ውድቅ ያደርጋሉ (በሁለቱም
> `setFeatureFlagOverride()` እና በREST `PUT` ተቆጣጣሪ ውስጥ በሰርቨር በኩል የሚረጋገጥ)።

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
