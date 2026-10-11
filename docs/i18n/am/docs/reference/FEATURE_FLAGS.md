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

## የፍላጎት ምልክቶች ማውጫ

በ6 ምድቦች የተከፋፈሉ 85 የፍላጎት ምልክቶች። **ነባሪ** ማለት በትርጉሙ የተወሰነው ነባሪ እሴት ነው — ይህም
የDB መተኪያም ሆነ የአካባቢ ተለዋዋጭ በሌለበት ጊዜ ጥቅም ላይ የሚውለው እሴት ነው።

### ደህንነት (10)

| ቁልፍ                                     | ዓይነት    | ነባሪ      | መግለጫ                                                                                                                                                                                             |
| --------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REQUIRE_API_KEY`                       | boolean | `false`  | ለሁሉም ገቢ ጥያቄዎች API ቁልፍ እንዲኖር አስገዳጅ ያድርጉ።                                                                                                                                                          |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | ለሁሉም ጥያቄዎች የግብዓት ማጽዳትን ያንቁ።                                                                                                                                                                      |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | የፕሮምፕት ማስገባት ጥቃት መከላከያ ሁነታ። እሴቶች፦ `off`፣ `warn`፣ `block`፣ `redact`።                                                                                                                              |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | PIIን ከጥያቄዎች ውስጥ ያውጡ (`INPUT_SANITIZER_MODE`ን ሳይመለከት)።                                                                                                                                            |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | PIIን ከአቅራቢ ምላሾች ውስጥ ያጽዱ።                                                                                                                                                                         |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | ለPII ምላሽ ማጽዳት የሚያገለግል ሁነታ። እሴቶች፦ `redact`፣ `warn`፣ `block`፣ `off`።                                                                                                                               |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | የቆየ ተለዋጭ ስም፦ በዚህ ምልክት የዳሽቦርድ መቀያየሪያ ላይ የተቀመጠ እሴት ከአካባቢው በፊት ይነበባል፤ በሁለቱም ውስጥ `false`፣ `0`፣ `no` ወይም `off` የወጪ URL መከላከያውን የአስተናጋጅ ማረጋገጫዎች እንደ `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` ያጠፋሉ።      |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | የተረጋገጡ የዳሽቦርድ ተጠቃሚዎች የተሸፈኑ እሴቶችን ብቻ ከማየት ይልቅ የተከማቹ API ቁልፎችን እንዲያሳዩ ፍቀድ።                                                                                                                         |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | በAUTH ምዝግብ መስመሮች ውስጥ የመለያ ቅድመ ቅጥያውን ያካትቱ (ለምሳሌ፦ "<provider> መለያ በመጠቀም ላይ፦ abc12345...")። የመለያ መለያዎች ከጋራ/ባለብዙ ተከራይ የሂደት ምዝግቦች ውስጥ እንዲወገዱ በነባሪነት ተሰናክሏል። ከማረም ሁነታ ነጻ ነው፤ የማረም ሁነታን መቀየር ይህን አያሳይም። |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | OIDC ሲነቃ፣ ተጠቃሚዎች በOIDC ነጠላ መግቢያ ብቻ ማንነታቸውን ማረጋገጥ እንዲችሉ በይለፍ ቃል መግባትን ያሰናክሉ። ሲሰናከል (ነባሪ)፣ በይለፍ ቃል መግባትም ሆነ OIDC ይገኛሉ።                                                                             |

### አውታረ መረብ (23)

| ቁልፍ                                             | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------- | ------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓         | የTLS fingerprint ስውር ሁነታን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                     |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |           | የ/v1/audio/* መስመሮች localhost ውጭ በሚስተናገዱ OpenAI-compatible አቅራቢ ኖዶች እንዲጠቀሙ ይፍቀዱ። በነባሪ ጠፍቷል — ኦዲዮን ወደ ሩቅ አስተናጋጅ ማስተላለፍ የወጪ ትራፊክ ማንነትን ይቀይራል፣ ስለዚህም ግልጽ የኦፕሬተር ውሳኔ መሆን አለበት። የLoopback ኖዶች ሁልጊዜ የተፈቀዱ ሲሆን በዚህ አይነኩም።                                                                                                                                                                                  |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |           | POST /v1/rerank (እና የማህደረ ትውስታ ሞተሩ የloopback rerank ደረጃ) localhost ውጭ በሚስተናገዱ OpenAI-compatible አቅራቢ ኖዶች እንዲጠቀሙ ይፍቀዱ። በነባሪ ጠፍቷል — ወደ ሩቅ አስተናጋጅ ማስተላለፍ የወጪ ትራፊክ ማንነትን ይቀይራል፣ ስለዚህም ግልጽ የኦፕሬተር ውሳኔ መሆን አለበት። የLoopback ኖዶች ሁልጊዜ የተፈቀዱ ናቸው፤ የሩቅ ኖዶች የአቅራቢውን የወጪ URL ፖሊሲም ማለፍ አለባቸው።                                                                                                                   |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |           | ለአንድ ግንኙነት proxy ካልተመደበ፣ ከመዝገቡ ውስጥ የመጀመሪያውን የሚሰራ proxy በራስ-ሰር ይምረጡ። በነባሪ ጠፍቷል (አለበለዚያ በመዝገቡ ውስጥ ያለ ማንኛውም proxy ዓለም አቀፍ መጠባበቂያ ይሆናል — #3332)።                                                                                                                                                                                                                                                       |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |           | የproxy ተደራሽነት ቅድመ-ምርመራዎች ሳይሳኩ ሲቀሩ፣ OAuth እና የአቅራቢ ማረጋገጫ ፍሰቶች የተወሰነውን proxy አልፈው በቀጥታ እንዲገናኙ ይፍቀዱ። ይህ የወጪ IPን ሊቀይር ስለሚችል በነባሪ ጠፍቷል።                                                                                                                                                                                                                                                                 |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |           | ለብዙ መለያዎች የማዘዋወር አስፈጻሚ ላይ የአውታረ መረብ ልዩ ሁኔታ (ጊዜ ማብቃት፣ ግንኙነት አለመቀበል/ዳግም መጀመር) ሲከሰት፣ ያልተሳካው መለያ የተለየ proxy ከሌለው፣ እያንዳንዱን እንደገና ከመሞከር ይልቅ አጭር የማቀዝቀዣ ጊዜ ይተግብሩ እና ለቀሪው ጥያቄ proxy የሌላቸውን ሌሎች መለያዎች ይዝለሉ። በነባሪ በርቷል (ደህንነቱ የተጠበቀ፦ የወጪ IP ለውጥ የለም፣ በጋራ የወጪ ትራፊክ መለያዎች ላይ የመዘግየት/የማቀዝቀዣ ጊዜ አደጋን ብቻ ይቀንሳል)። proxy በሌለው የመጀመሪያ ስህተት ላይ ወዲያውኑ ማሰራጨትን ለመመለስ ያሰናክሉ።                                              |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |           | Opencode ማዘዋወር የትኛው መለያ እንዳገለገለ ወይም እንደተዘለለ ይመዘግባል (የተሸፈኑ ids ብቻ፣ ሙሉ የመለያ ids በፍጹም አይደሉም) እና የproxy ምዝግብ ግቤቶችን ከጥያቄያቸው ጋር ያገናኛል፣ በዚህም ኦፕሬተሩ የተዘለሉ መለያዎችን ጥቅም ላይ ካልዋሉት ለይቶ ማወቅ ይችላል። በነባሪ ጠፍቷል።                                                                                                                                                                                                     |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `true`  |           | የProxy ጥምረቶች እና የopencode የየመለያው ማዘዋወር በቅርቡ ያልተሳካ proxyን (ውድቅ የተደረገ TCP probe፣ ወይም በእሱ በኩል የተቀበለ 429) በእያንዳንዱ ድግግሞሽ እስከ አንድ ገደብ ድረስ በእጥፍ ለሚጨምር የሂደት-ደረጃ ጊዜ ዳግም ማቅረብ ያቆማሉ። ምንም የproxy ሁኔታ አይጻፍም፤ እያንዳንዱ ዕጩ ወደ ጎን ከተቀመጠ ምርጫው ሳይለወጥ ይቀራል። በነባሪ በርቷል፤ `false` መደበኛ ምርጫን ይመልሳል።                                                                                                                         |
| `PROXY_POOL_SHARED_EGRESS_ORDER`                | boolean | `false` |           | ኮታቸው በመውጫ አድራሻ ለሚከፋፈል አቅራቢዎች፣ በቅርቡ ውድቅ ከተደረገ አባል ጋር ተመሳሳይ የታየ የመውጫ አድራሻ የሚጋራን የፑል አባል ከጤናማ አባላት ቀጥሎ ደረጃ ይስጡት። ለቅደም ተከተል ብቻ ነው፤ በፍጹም አይገለልም። የሚያነበውን የውድቅ ምልክት የሚያመነጨውን PROXY_SKIP_RECENTLY_FAILED ይፈልጋል። በነባሪ ጠፍቷል።                                                                                                                                                                                |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |           | በዳሽቦርዱ ውስጥ ከፕሮክሲ ፑል ሥር፣ ባለፉት 24 h ስንት የታዩ የመውጫ IPዎች አባላቱን እንዳገለገሉ እና ስንት ግንኙነቶች እንደተጠቀሙባቸው ያሳያል። ለንባብ ብቻ ነው፣ ከፕሮክሲ ሎግ የሚሰላ ሲሆን ለማስተላለፊያ በፍጹም አይጠቀምም። በነባሪ ጠፍቷል።                                                                                                                                                                                                                                    |
| `PROXY_OPERATOR_EGRESS_ENABLED`                 | boolean | `false` |           | ኦፕሬተር የላካቸውን፣ ቀን የተያያዘባቸውን የታዩ አድራሻዎች ለእያንዳንዱ የፑል አባል ተቀብሎ፣ ለማሳያ እና ለፑል ቅደም ተከተል ከጆርናሉ ንባብ ጋር ያዋህዳቸዋል። በነባሪ ጠፍቷል፦ የመላኪያ መስመሩ 404 ይመልሳል፣ የፑል ንባቦችም ልክ እንደቀድሞው ይሠራሉ።                                                                                                                                                                                                                                 |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |           | ለOpenCode አስፈጻሚ፣ በዥረት የሚላክ Responses ምላሽ የመጀመሪያውን የይዘት ባይት ይከታተላል (መስኮት፦ `RESPONSES_FIRST_BYTE_TIMEOUT_MS`፣ ነባሪ `15000`)። ከመስኮቱ በላይ ዝም የሚል 2xx Responses ዥረት እንደተቋረጠ ይቆጠራል፦ መለያው ለጊዜው እንዲቀዘቅዝ ይደረጋል እና ጥያቄው አንድ ጊዜ ወደሚቀጥለው መለያ ይሽከረከራል፤ ለሁለተኛ ጊዜ ከተቋረጠ ወዲያውኑ አይሳካም። በነባሪ ጠፍቷል፦ የተቋረጡ ዥረቶች የዥረት ዝግጁነት ጊዜ ገደቡ እስኪያልቅ የዛሬውን መጠበቅ ይቀጥላሉ።                                                               |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |           | OpenCode አስፈጻሚ፦ `user_blocked` ውድቅ ማድረግን በያዘ 403/451 ላይ (ጂኦ አይደለም፣ የCloudflare የጣት አሻራ ውድቅ ማድረግም አይደለም)፣ ውድቅ የተደረገውን መለያ ለጊዜው ያቀዘቅዛል እና በእያንዳንዱ ጥያቄ ከፍተኛው አንድ ጊዜ ወደሚቀጥለው መለያ ያሽከረክራል፤ ሁለተኛ ውድቅ ማድረግ የስኬት ምልክት ሳይደረግበት እንዳለ ይመለሳል። በነባሪ ጠፍቷል፦ የላይኛውን የተጠቃሚ እገዳ አልፎ ማስተላለፍ ማምለጥ ሊመስል እና ምልክቱን በመላው ስብስብ ሊያሰራጭ ይችላል።                                                                                  |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |           | OpenCode ሽክርክር፦ ሁለት ተከታታይ ጊዜያዊ የላይኛው አገልግሎት ውድቀቶች (5xx ወይም ባዶ 400) ከደረሱ በኋላ ወደሚቀጥለው መለያ ከመሄድ በፊት ለአፍታ ያቆማል — 1.5s ሲሆን በእያንዳንዱ ተጨማሪ ውድቀት በእጥፍ ይጨምራል፣ በእያንዳንዱ ማቆሚያ ከፍተኛው 6s እና በእያንዳንዱ ጥያቄ 10s ነው፣ ደንበኛው ከተቋረጠ ይዘለላል፤ ያልተሳካው ይዘት ከመጠበቁ በፊት ይለቀቃል። በነባሪ ጠፍቷል፦ የመጠባበቂያ ሽግግሩ ወዲያውኑ ይቀጥላል።                                                                                                               |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |           | OpenCode ሽክርክር፦ ከተደጋጋሚ ጊዜያዊ 429ዎች (ወይም አዲስ የፑል ጫና ምልክት) በኋላ ጥያቄውን ከልብ ምት ጋር ያቆየዋል፣ ከዚያም መላውን የመለያ ስብስብ በአንድ ጊዜ ከማሰራጨት ይልቅ እስከ 3 ተከታታይ መለያዎች ያለውን አንድ የተገደበ ዙር እንደገና ያስኬዳል። በነባሪ ጠፍቷል፦ እያንዳንዱ 429 ልክ እንደቀድሞው ወደሚቀጥለው መለያ ያሽከረክራል።                                                                                                                                                                   |
| `STREAM_READINESS_STALL_RETRY`                  | boolean | `false` |           | ዥረታዊ ውይይት፦ የመጀመሪያው የላይኛው የይዘት ክፍል ጥቅም ላይ የሚውል ክስተት ከማምረቱ በፊት ሲቋረጥ፣ በተመሳሳይ የማስተላለፊያ መንገድ፣ በተመሳሳይ የዝግጁነት ጊዜ ገደብ እና ያለ መለያ ቅጣት አንድ የተገደበ ሁለተኛ ሙከራ ያደርጋል። በነባሪ ጠፍቷል፦ የተቋረጠ የመጀመሪያ ይዘት ያለ ዳግም ሙከራ ጥያቄውን ያሳንሳል።                                                                                                                                                                                          |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |           | በተተረጎሙ ዥረታዊ ዙሮች ላይ፣ የላይኛው ዙር ጥቅም ላይ የሚውል ይዘት ካልያዘ (የማመዛዘን-ብቻ ማጠናቀቂያ ወይም ምንም ዋጋ ያለው ቁራጭ ከሌለ)፣ ማንኛውም ነገር ለደንበኛው ከመጋለጡ በፊት በመደበኛው የምስክርነት መንገድ በኩል የተገደቡ ዳግም ሙከራዎችን (እስከ `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`) ያደርጋል። በነባሪ ጠፍቷል፦ ባዶ ዙሮች የአሁኑን ባህሪ (ባዶ 200 ወይም ባዶ-ይዘት 502) ይይዛሉ።                                                                                                                     |
| `OPENCODE_POOL_RESELECT`                        | boolean | `false` |           | OpenCode ሽክርክር፦ በአካባቢያዊ የፑል አውድ ውስጥ ፕሮክሲ በሌለው መለያ ላይ ከመውጫ-በባልዲ ከተከፋፈለ አቅራቢ 429 ከተመለሰ በኋላ፣ ተመሳሳይ የመውጫ አድራሻን እንደገና ከመሞከር ይልቅ ለሚቀጥለው ሙከራ ከግንኙነት ፑሉ ሌላ አባል እንዲመርጥ ይጠይቃል። ቅደም ተከተል ብቻ ያስተካክላል፣ በፍጹም አይገለልም፦ የተሟጠጠ ፑል የአሁኑን ባህሪ ይቀጥላል። በነባሪ ጠፍቷል፦ እያንዳንዱ 429 ልክ እንደቀድሞው ወደሚቀጥለው መለያ ያሽከረክራል።                                                                                                             |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | ቡሊያን    | `false` |           | የOpenCode ማዞሪያ፦ እንደ እውነተኛ የፍጥነት ገደብ የተመደበው የመጀመሪያው 429 ሲያጋጥም (ሊተነተን የሚችል `Retry-After`፣ ወይም የፍጥነት/አጠቃቀም ገደብን የሚጠቅስ የምላሽ ይዘት) የመለያዎችን ዙር ያቁምና ያንን የአፕስትሪም 429 ሳይቀይር ይመልስ። ያልተመደቡ 429 ምላሾች ማዞሩን ይቀጥላሉ። በነባሪ ጠፍቷል፦ ነፃው ደረጃ በእያንዳንዱ ወጪ IP የተገደበ ነው (#9611)፣ ስለዚህ እያንዳንዱ 429 ማዞርን ያስከትላል፤ ሁሉም አማራጮች ሲያልቁም የመጨረሻውን የአፕስትሪም 429 ይመልሳል።                                                                    |
| `MITM_DISABLE_TLS_VERIFY`                       | ቡሊያን    | `false` | ✓         | ለMITM ፕሮክሲው የTLS የምስክር ወረቀት ማረጋገጫን ያሰናክሉ። **አደገኛ ነው።**                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | ቡሊያን    | `false` |           | የአቅራቢ URL ማረጋገጫ፣ የሞዴል ፍለጋ፣ የአቅራቢ-ኖድ መሠረታዊ URLዎች እና የፕሮክሲ-ተተኪ ሙከራ ላይ የወጪ URL ጠባቂውን የአስተናጋጅ ፍተሻዎች፣ የደመና ሜታዳታ እገዳን ጨምሮ፣ ያጠፋል፤ የግል webhook መዳረሻዎችንም ይፈቅዳል። የአካባቢ እና LAN URLዎች በማረጋገጫ፣ በፍለጋ እና በአቅራቢ-ኖድ መንገዶች ላይ በነባሪ ያልፋሉ (`OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`)፤ የፕሮክሲ-ተተኪ ሙከራው እና የግል webhook መዳረሻዎች `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`ን ብቻ ይመለከታሉ፣ እና ይህ ቅንብር ጠፍቶ ሳለ የአካባቢ/LAN አስተናጋጆችን ያግዳሉ። |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | ቡሊያን    | `true`  |           | በአካባቢ/የግል አድራሻዎች (127.0.0.1, localhost, LAN) ላይ ያሉ የአቅራቢ URLዎችን ይፍቀዱ። በነባሪ በርቷል (አካባቢን-የሚያስቀድም)፦ ጠባቂው ከዚያ በኋላ የደመና ሜታዳታ መገልገያዎችን (ሁሉንም 169.254.0.0/16 እና የታወቁትን የሜታዳታ አስተናጋጅ ስሞች) ያግዳል። የሕዝብ አድራሻዎችን ብቻ በጥብቅ ለመፍቀድ ያሰናክሉት፦ የግል እና loopback አስተናጋጆችም ይታገዳሉ።                                                                                                                                         |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | ቡሊያን    | `false` | ✓         | ከClaude Code ጋር ተኳሃኝ የሆነውን የአቅራቢ ሁነታ ያንቁ።                                                                                                                                                                                                                                                                                                                                                          |

### ፖሊሲዎች (6)

| ቁልፍ                             | ዓይነት | ነባሪ        | መግለጫ                                                                                                                                                                                     |
| ------------------------------- | ---- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | ዝርዝር | `disabled` | የመሣሪያ አጠቃቀም ፖሊሲ ማስፈጸሚያ ሁነታ። እሴቶች፦ `disabled`፣ `warn`፣ `block`።                                                                                                                           |
| `RATE_LIMIT_AUTO_ENABLE`        | ቡሊያን | `false`    | በenv ተለዋዋጩ አማካኝነት የፍጥነት ገደብ ራስ-ማንቂያ ደህንነት መረቡን እንዲበራ/እንዲጠፋ ያስገድዱ። የአሂድ ጊዜው env ተለዋዋጩን ብቻ ያነባል፦ ካልተዋቀረ ይህን የካታሎግ ነባሪ ሳይሆን የዳሽቦርድ ቅንብሩን (በነባሪ የበራ) ይከተላል።                                  |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | ቡሊያን | `false`    | ቀጥተኛ የነጠላ-ሞዴል ጥያቄዎችን ሲያስተናግድ የOmniRouteን አካባቢያዊ የአውድ-መስኮት / ከፍተኛ-የግቤት-ቶከን ፍተሻ ይዝለሉ። የአፕስትሪም ገደቦች አሁንም ተግባራዊ ናቸው።                                                                         |
| `CAPABILITY_FILTER_ENABLED`     | ቡሊያን | `false`    | የታለመው ሞዴል አስፈላጊ ችሎታዎችን (እይታ፣ መሣሪያዎች፣ የተዋቀረ ውጤት፣ የአውድ መስኮት) ከሌለው ጥያቄዎችን ከመላካቸው በፊት ውድቅ ያድርጉ። ይህ የጥምር-ንብርብር ተኳሃኝነት ማጣሪያን የሚያልፉ ቀጥተኛ የነጠላ-አቅራቢ ጥያቄዎችን ይጠብቃል።                                |
| `USAGE_LIMIT_IGNORE_UNPRICED`   | ቡሊያን | `false`    | የዋጋ መረጃ የሌላቸውን ሞዴሎች አጠቃቀም፣ ገደቡ እንደታለፈ ከመቁጠር ይልቅ፣ በእያንዳንዱ ቁልፍ የUSD አጠቃቀም ኮታ ውስጥ እንደ $0 ይቁጠሩ። በነባሪ ጠፍቷል፦ ዋጋ ያልተመደበለት ሞዴል ወይም የማዘዋወሪያ ቅጽል እውነተኛ ወጪን ሊደብቅ ስለሚችል ኮታው ለደህንነት ሲባል ጥያቄውን ይከለክላል። |
| `RADAR_ENABLED`                 | ቡሊያን | `false`    | የOmniRoute Radar ሞጁሉን (የካታሎግ ፊድ ማያ ገጾች እና ማመሳሰል) ያንቁ። በነባሪ ጠፍቷል፤ ማንቃቱ UIውን ብቻ ይከፍታል — የውሂብ ማመሳሰል አሁንም በተናጠል በፈቃድ የሚነቃ ነው።                                                                |

### የአሂድ ጊዜ (36)

| ቁልፍ                                         | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------- | ------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |           | የጥምር ማዞሪያ ሞዴሎችን ሲቀይር የውይይት ማጠቃለያዎችን ያመነጫል እና ያካትታል። የሞዴል ለውጦችን እያንዳንዳቸውን ለብቻ ለማስተናገድ እና ለሁሉም ነባር እና ወደፊት ለሚፈጠሩ ጥምሮች የበስተጀርባ ርክክብ ጥያቄዎችን ለመከላከል ያሰናክሉት።                                                                                                                                                                                                                                                                                             |
| `REASONING_REPLAY_ENABLED`                  | boolean | `true`  |           | በባለብዙ-ዙር ውይይቶች ውስጥ የሞዴል አመክንዮን ይሸጎጣል እና እንደገና ያጫውታል። አመክንዮን ማከማቸትን እና እንደገና ማካተትን ለማቆም ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                     |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |           | ወደ ደንበኞች ከመተላለፋቸው በፊት የውስጥ አስተያየት-ደረጃ ውፅዓት ንጥሎችን ከResponses API ቀጥታ ማስተላለፊያ ዥረቶች ያስወግዳል። ጥሬ የላይኛው ምንጭ አስተያየትን ለመቀበል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `false` |           | በMCP መሣሪያ መዳረሻ ላይ የወሰን ገደቦችን ያስገድዳል።                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |           | የቶከን አጠቃቀምን ለመቀነስ የMCP መሣሪያ መግለጫዎችን ይጨምቃል።                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |           | በሩጫ ጊዜ የበስተጀርባ ተግባራት ሂደትን ያነቃል።                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓         | ሁሉንም የጀርባ አገልግሎቶች (የኮታ ማደስ፣ ማመሳሰል፣ ወዘተ) አሰናክል።                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |           | የፕሮጀክት ደረጃ RTK ማጣሪያዎችን ያለ ማረጋገጫ እመን።                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓         | በማስመጣት ጊዜ የቅጽበታዊ ዳሽቦርድ WebSocket ሰርቨርን አስጀምር (በነባሪ ወደብ 20132)።                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |           | Codex የResponses-over-WebSocket ማጓጓዣን እንዲጠቀም ፍቀድ። ሲጠፋ፣ Codex ወደ HTTP Responses ይመለሳል።                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |           | Codex የአካባቢውን app-server WebSocket JSON-RPC ማጓጓዣ (`codexTransport=app-server`) እንዲጠቀም ፍቀድ። ሲጠፋ፣ app-serverን እንዲጠቀሙ የተመረጡ ግንኙነቶች ወደ ሌሎች የCodex ማጓጓዣዎች ይመለሳሉ።                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |           | በጀታቸው ያለቀባቸውን ጥያቄዎች ወደ አስቸኳይ ነፃ ምትክ አቅራቢ/ሞዴል አስተላልፍ። (ከታች [የአስቸኳይ ጊዜ የበጀት ምትክ](#emergency-budget-fallback)ን ይመልከቱ።)                                                                                                                                                                                                                                                                                                                                |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |           | ማንኛውም የምላሽ ባይቶች ወደ ደንበኛው ከመድረሳቸው በፊት ለተቋረጡ የላይኛው ዥረት SSE ዥረቶች ግልጽ የቅድመ ዳግም ሙከራን አንቃ።                                                                                                                                                                                                                                                                                                                                                               |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |           | ባይቶች ወደ ደንበኛው ከደረሱ በኋላ የዥረት መልሶ ማግኛው ምላሽን እንደገና እንዲጠይቅና እንዲያቀናጅ ፍቀድ።                                                                                                                                                                                                                                                                                                                                                                               |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |           | በዥረት መካከል የሚደረግ ቀጣይነትን ለመሣሪያ ጥሪ ደህንነቱ የተጠበቀ ያድርጉ፦ የመሣሪያ ጥሪ ከተላከ በኋላ (በሂደት ላይ ያለ ወይም ቀድሞውኑ በ finish_reason tool_calls የተጠናቀቀ) የተቋረጠ ዥረትን በፍጹም አትቀጥሉ፤ እንዲሁም ሙሉ በጀቱን ከማውጣት ይልቅ አንድ ባዶ ቀጣይነት ከተሞከረ በኋላ ዝጉ። ሲጠፋ፦ የልቀት ባህሪ።                                                                                                                                                                                                                              |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |           | አንድ የSSE ዥረት ምንም ጠቃሚ ፍሬም ከመላኩ በፊት ሲዘጋ እና የተገደበው የተመሳሳይ ግንኙነት ዳግም ሙከራ ሲያልቅ፣ አንድ ጊዜ ወደ ተጓዳኝ ግንኙነት መቀየርን ያንቁ፤ ሊጠቀሙበት የሚችል ተጓዳኝ ከሌለ የመጀመሪያው `STREAM_EARLY_EOF` 502 ይመለሳል። በነባሪ ጠፍቷል፦ የተመሳሳይ ግንኙነት ዳግም ሙከራ ካለቀ በኋላ early-EOF ማብቂያ ሆኖ ይቆያል።                                                                                                                                                                                                              |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |           | ለማሳያ አመቺ የሆኑ የስም መስኮችን በ`/v1/models` ምላሾች ውስጥ ያካትቱ። የሞዴል መለያዎችን ብቻ ለሚጠብቁ ደንበኞች ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                             |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |           | በ/v1/models ውስጥ የሞዴል መለያዎች ቅድመ ቅጥያ እንዴት እንደሚኖራቸው ይቆጣጠራል። 'dual' (ነባሪ) ለኋላ ተኳኋኝነት የቅጽል ስም እና መደበኛ የአቅራቢ መለያ ቅድመ ቅጥያዎችን ሁለቱንም ያወጣል። 'alias' አጭሩን የቅጽል ስም ቅድመ ቅጥያ ብቻ ያወጣል (ለምሳሌ ds-web/model እንጂ deepseek-web/model አይደለም)። 'canonical' ሙሉውን የአቅራቢ መለያ ቅድመ ቅጥያ ብቻ ያወጣል። እሴቶች፦ `dual`፣ `alias`፣ `canonical`።                                                                                                                                           |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |           | ለሞዴል የብልህነት ደረጃዎች ወቅታዊ የArena AI የመሪዎች ሰሌዳ ELO ማመሳሰልን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                         |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |           | የClaude Code gateway ሞዴል ፍለጋ Claude ያልሆኑ ሞዴሎችን እንዲዘረዝር፣ የ`claude/<provider>/<model>` መስታወት መለያዎችን በ`/v1/models` ላይ ያስተዋውቁ። የሶስት-ደረጃ መግቢያው ዓለም አቀፍ ደረጃ (env ከdashboard override ይቀድማል)። [Claude Code ውቅር](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)ን ይመልከቱ።                                                                                                                          |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |           | ለno-think/<provider>/<model> የgateway ቅጽል ስሞች ዋና መቀየሪያ። ሲበራ (ነባሪ)፦ /v1/models ለእያንዳንዱ ብቁ እና የማሰብ ችሎታ ላለው Claude ሞዴል የማያስብ ልዩነትን ያስተዋውቃል፤ እንዲሁም በጥያቄ ላይ የተላከ no-think/ መለያ ምክንያታዊ አስተሳሰብ ታፍኖ ወደ እውነተኛው ሞዴል ይፈታል። ሲጠፋ፦ ምንም ልዩነቶች አይተዋወቁም፣ እና no-think/ መለያ እንደማንኛውም ሌላ ያልታወቀ የሞዴል መለያ ይቆጠራል። ይህ በርቶ ሳለ የእያንዳንዱ ሞዴል ModelSpec.noThinkingAlias መርጦ-መግባት/መርጦ-መውጣት አሁንም ተፈጻሚ ነው።                                                                         |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |           | በ/v1/models ካታሎግ ውስጥ የማሰብ ደረጃ ልዩነቶችን (ለምሳሌ -low፣ -medium፣ -high) ማመንጨትን ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓         | ለአቅራቢ ስርጭት በተከራይ የሚለማመዱ ምናባዊ የመግቢያ መስመሮችን አንቃ (#9654)፦ የአንድ ተከራይ ድንገተኛ የጥያቄ ጭማሪ ከእንግዲህ ሌላው 503 እንዲያገኝ አያደርግም። የ`OMNIROUTE_CHAT_VIRTUAL_LANES` የአካባቢ ተለዋዋጭ ከዚህ የዳሽቦርድ መሻሪያ ይቀድማል፤ ለውጦች አገልጋዩ ዳግም ሲጀምር ተግባራዊ ይሆናሉ።                                                                                                                                                                                                                                   |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |           | መደበኛ ባለቤታቸው ንቁ ማረጋገጫ መረጃ ለሌለው፣ ነገር ግን ንቁ ማረጋገጫ መረጃ ያለው ቀጥታ-አሳላፊ ጌትዌይ ለሚያዞራቸው ሞዴሎች፣ የ<gateway-alias>/<model> መስተዋት መለያዎችን በ/v1/models ላይ አስተዋውቅ። ማስጠንቀቂያ፦ በዓለም አቀፍ ደረጃ ሲነቃ ለሁሉም ደንበኞች የካታሎግ ግቤቶችን ይጨምራል።                                                                                                                                                                                                                                            |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |           | ከNew-API / One-API / Sub2API አጠቃላይ አሰባሳቢ ጋር ተኳሃኝ ለሆኑ ኖዶች የሒሳብ ቀሪ ማወቂያን አንቃ። ሲነቃ፣ የአጠቃላይ አሰባሳቢ ምልክት የተዋቀረባቸው ተኳሃኝ ኖዶች የሒሳብ ቀሪያቸውን በዳሽቦርዱ እና በኮታ-ቅድመ-ምርመራ ማዞሪያ ውስጥ ሪፖርት ያደርጋሉ።                                                                                                                                                                                                                                                                       |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |           | ሞዴሉ ደንበኛው ሊጠቀምበት የሚችል ምላሽ እስኪመልስ ድረስ በአገልጋዩ የሚተዳደሩ ዥረት-አልባ የመሣሪያ ጥሪዎችን ቀጥል።                                                                                                                                                                                                                                                                                                                                                                        |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |           | የፍለጋ ስታቲስቲክስ እና የቅርብ ጊዜ ፍለጋዎች አሁንም ንቁ ግንኙነት ያላቸውን አቅራቢዎች ብቻ ይቆጥራሉ (እንደ duckduckgo-free ያሉ ቁልፍ የማይፈልጉ አቅራቢዎች ሁልጊዜ ይቆጠራሉ)። ከጠፋ ሁኔታ ጋር ሲወዳደር፣ የአቅራቢ መለያ ያለውን እያንዳንዱን የተቀመጠ የፍለጋ ረድፍ ያቆያል።                                                                                                                                                                                                                                                             |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |           | የዳሽቦርድ የአቅራቢ ገጾች፦ የነጻ ባጁን አቅራቢው በሚያከብራቸው ምልክቶች ላይ ብቻ አሳይ — የማሳያ-ስም ግምትን፣ boolean ያልሆኑ የነጻ መስኮችን እና የተመዘገበ ነጻ ደረጃ በሌላቸው አቅራቢዎች ላይ ያሉ :free ቅጥያዎችን ያስወግዳል። ከጠፋ ታሪካዊውን የባጅ ደንብ ያቆያል።                                                                                                                                                                                                                                                                  |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |           | በተዋሃዱ የ429/503 አይገኝም ምላሾች ላይ፣ ተጨባጭ የወደፊት የድጋሚ ሙከራ ጊዜ ካልታወቀ `Retry-After`ን አትጨምር (ሰው ሠራሽ 1s ከመጠቀም ይልቅ)፣ `error.retry_after_provenance` (`signal` \| `none`)ን ጨምር፣ እና የcombo ማስወገጃ መንገዶች ከJSON እና ከግልጽ-ጽሑፍ የላይኛው አቅራቢ አካላት ውስጥ በገላጭ ጽሑፍ የቀረቡ የድጋሚ ሙከራ ፍንጮችን እንዲያነቡ ፍቀድ። መስኩ የሚታየው በ`unavailableResponse()` በተገነቡ ምላሾች ላይ ብቻ ነው፤ ሌሎች የ429/503 አካላት አይለወጡም።                                                                                            |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |           | እንደ fallback-only-on-quota-exhaustion ምልክት የተደረገበት የ`priority` combo ዒላማ፣ ምክንያቱ ኮታ አለመሆኑ በማስረጃ ሊረጋገጥ በሚችል ሁኔታ (የአቅራቢ ሰርክዩት ብሬከር ክፍት መሆን፣ ትንበያዊ የመዘግየት መዝለል) comboውን ሲያቆም፣ ኮታ ከሚመስለው 503 ይልቅ 502ን መልስ። መቆለፍ፣ የማቀዝቀዣ ጊዜ፣ አለመገኘት፣ መሟጠጥ እና የበአንድ-ጊዜ ጥያቄ ገደብ ማቆሚያዎች 503ን ይዘው ይቆያሉ።                                                                                                                                                                      |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |           | ግልጽ የሆነ የማረጋገጫ ምልክት የሌለው ቀጥተኛ Mistral 401 (`{"detail":"Unauthorized"}`) ለተሻረ ቁልፍ እና ኮታው ላለቀ ቁልፍ ተመሳሳይ ነው። ሲበራ፣ ግንኙነቱን `expired` ብሎ ከማቆም ይልቅ ለጊዜው ያቀዘቅዘዋል፤ ይህም በእያንዳንዱ ግንኙነት በሰዓት ቢበዛ 3 ጊዜ ይከናወናል። ቀጣዩ ግንኙነቱን ያቆመዋል፣ ስለዚህ የተሻረ ቁልፍ አሁንም በመጨረሻ ወደዚያው ሁኔታ ይደርሳል። በነባሪ ጠፍቷል፦ እያንዳንዱ ቀጥተኛ Mistral 401 እንደቀድሞው ግንኙነቱን ያቆመዋል።                                                                                                                             |
| `GROK_SUBSCRIPTION_IMAGES_ENABLED`          | boolean | `false` |           | የ xai-oauth (xao) እና grok-cli ምስል መስመሮችን ይመዝግቡ፣ እንዲሁም የ OpenAI ጥራት high/hdን ወደ xAI medium ይመድቡ። በነባሪ ጠፍቷል፦ የ API-key xAI ምስል መንገድ ነባሩን ከ OpenAI ጋር ተኳሃኝ የሆነ ጥያቄ መጠቀሙን ይቀጥላል፣ የደንበኝነት ምዝገባ መስመሮቹም አይመዘገቡም።                                                                                                                                                                                                                                          |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `true`  |           | ከቀዘቀዘው የማይለወጥ መነሻ ይልቅ፣ የ OAuth bearer tokenን በመጠቀም ለ xai-oauth ግንኙነቶች የቀጥታ xAI ሞዴል ካታሎግን ከ https://api.x.ai/v1/models ያምጡ። በነባሪ በርቷል። የማይለወጠውን መነሻ ማቅረብዎን ለመቀጠል ጠቋሚውን ወደ false ያዘጋጁ። የ HTTP አለመሳካቶች በፍለጋ መስመሩ ውስጥ ወደ መነሻው ይመለሳሉ፤ የጠቋሚው getter ራሱ HTTP ጥያቄ አያደርግም።                                                                                                                                                                                  |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |           | አውቶማቲክ የማጽዳት ቅኝቱ፣ ከ `OMNIROUTE_BATCH_RETENTION_DAYS` የቆዩ የመጨረሻ ሁኔታ ላይ ያሉ (completed/failed/cancelled/expired) የ Batch API ሥራዎችን ከየመስመሩ checkpoints ጋር እንዲሰርዝ እና የራሳቸው `expires_at` ያለፈባቸው የተሰቀሉ ፋይሎችን የ BLOB ይዘት እንዲያጸዳ ይፍቀዱ። በነባሪ ጠፍቷል፦ ኦፕሬተር እስኪያነቃው ድረስ እያንዳንዱ ነባር ጭነት ይህን ውሂብ ልክ እንደቀድሞው ይይዛል። በኦፕሬተር የሚነሳው `DELETE /api/v1/batches/delete-completed` መስመር በሁለቱም ሁኔታ አይነካም — ይህ የተለየ፣ ቅድመ ሁኔታ የሌለው የሕዝብ API ውል ነው።                             |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |           | በተመሳሳይ ጊዜ የሚከናወን ዳግም ሙከራ ወይም የማረጋገጫ መረጃ ርክክብ፣ አስቀድሞ በሂደት ላይ ላለ ዥረት የተመደበ መለያን እንደገና እንዳይመርጥ፣ የመረጠውን Antigravity መለያ ለጥያቄው የዥረት የሕይወት ዑደት ያስይዙ። ማስያዣው በ (ግንኙነት፣ ሊጠራ የሚችል upstream ሞዴል) የተገደበ ነው፣ ስለዚህ አንድ መለያ አሁንም ሁለት የተለያዩ ሞዴሎችን በአንድ ጊዜ ማገልገል ይችላል። ለዚያ ሞዴል ብቁ የሆኑ መለያዎች በሙሉ አስቀድመው ከተያዙ፣ ጥያቄው በተጨናነቀ መለያ ላይ ከመደራረብ ይልቅ የተዋቀረ 503 `antigravity_pool_busy`ን ከተገደበ `Retry-After` ጋር ይመልሳል። በነባሪ ጠፍቷል፦ የመለያ ምርጫው ልክ እንደቀድሞው ይቆያል፣ ምንም ማስያዣም አይደረግም። |
| `COMBO_AUTO_PRUNE_STALE_STEPS`              | boolean | `false` |           | ከባለሥልጣን የቀጥታ ካታሎግ ጋር የተሳካ የሞዴል ማመሳሰል ከተካሄደ በኋላ፣ ካታሎጉ ከእንግዲህ በማይዘረዝራቸው ሞዴሎች ላይ የተሰኩ combo ደረጃዎችን ያስወግዱ፣ ለእያንዳንዱ የተወገደ ደረጃም አንድ የኦዲት መዝገብ ይፍጠሩ። ያልተሳካ፣ የተዳከመ ወይም free-only ማመሳሰል ላይ ፈጽሞ አያስወግድም፣ comboንም ፈጽሞ ባዶ አያደርግም። በነባሪ ጠፍቷል፦ ጊዜ ያለፈባቸው ደረጃዎች ምልክት ብቻ ይደረግባቸዋል።                                                                                                                                                                                 |

### CLI (5)

| ቁልፍ                                   | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                              |
| ------------------------------------- | ------- | ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓         | ለሁሉም CLI ደንበኞች የተኳኋኝነት ሁነታን ያንቁ።                                                                                                                                  |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |           | የሞዴል ተለዋጭ ስም ተኳኋኝነት ንብርብርን ያንቁ።                                                                                                                                   |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |           | ራስ-ሰር የዋጋ ውሂብ ማመሳሰልን ያንቁ (የ`PRICING_SYNC_ENABLED` አካባቢ ተለዋዋጭንም ይፈልጋል)።                                                                                            |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |           | ከአቅራቢ ሞዴል ማመሳሰል በኋላ፣ የ ~/.codex/*.config.toml መገለጫ ፋይሎችን ከቀጥታው ካታሎግ በራስ-ሰር (እንደገና) ይጻፉ። ገባሪውን/ነባሪውን Codex ውቅር ፈጽሞ አይቀይርም። በነባሪነት ጠፍቷል።                            |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |           | ከአቅራቢ ሞዴል ማመሳሰል በኋላ፣ የ ~/.claude/profiles/<name>/settings.json Claude Code መገለጫዎችን ከቀጥታው ካታሎግ በራስ-ሰር (እንደገና) ይጻፉ። ገባሪውን/ነባሪውን Claude ውቅር ፈጽሞ አይቀይርም። በነባሪነት ጠፍቷል። |

### ጤንነት (5)

| ቁልፍ                                       | ዓይነት    | ነባሪ     | መግለጫ                                                                                                                                                                                                                 |
| ----------------------------------------- | ------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | የአካባቢያዊ አብነት ጤንነት ማረጋገጫ መገናኛ ነጥብን ያሰናክሉ።                                                                                                                                                                             |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | የቶከን ማረጋገጫ ጤንነት ምርመራን ያሰናክሉ።                                                                                                                                                                                         |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | በክህሎቶች sandbox አካባቢ ውስጥ የአውታረ መረብ መዳረሻን ያንቁ።                                                                                                                                                                         |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | በፕሮክሲ ጤንነት ቅኝት ውስጥ፣ ዒላማው ያልተቀበለው ሙከራ (401/403/429) የፕሮክሲውን ተከታታይ ውድቀቶች ቆጠራ ዳግም ያስጀምራል። በነባሪነት ጠፍቷል፦ አለመቀበል ገለልተኛ ሆኖ ይቆያል (#10654)። 5xx በሁለቱም ሁኔታ የማያረጋግጥ ሆኖ ይቆያል፤ አለመቀበል ፕሮክሲን ፈጽሞ አያስወግድም፣ አያሰናክልም ወይም እንደገና አያነቃም። |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | አገልጋዩ ጥያቄዎችን መቀበል ከጀመረ በኋላ (በ`setImmediate` በኩል) የጅምር DB ታማኝነት/ጤንነት ምርመራን ያሂዱ፤ እስኪጠናቀቅ ድረስ ጅምርን ከማገድ ይልቅ (#13717)። በነባሪነት ጠፍቷል፦ ጅምሩ ከዚህ PR በፊት እንደነበረው በትክክል ይታገዳል።                                                  |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` እና የቆየው ተለዋጭ ስሙ
> `INJECTION_GUARD_BLOCK_THRESHOLD` የ`INJECTION_GUARD_MODE`ን `block` ሁነታ
> ያስተካክላሉ፣ ነገር ግን በ
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> የሚነበቡ ተራ የአካባቢ ተለዋዋጮች እንጂ የባህሪ ጠቋሚዎች አይደሉም፦ የDB ተተኪ ቅንብርም ሆነ የዳሽቦርድ መቀያየሪያ የላቸውም።
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)ን ይመልከቱ።

> [!NOTE]
> የ`Restart` ዓምድ `requiresRestart: true` ያላቸውን ጠቋሚዎች ያመለክታል — እሴቱ
> ወዲያውኑ ይቀመጣል፣ ነገር ግን ሂደቱ እንደገና ከተጫነ በኋላ ብቻ ተግባራዊ ይሆናል። Enum
> ጠቋሚዎች ከተፈቀደላቸው ስብስብ ውጭ ያለን ማንኛውንም እሴት ውድቅ ያደርጋሉ (በአገልጋይ በኩል
> በ`setFeatureFlagOverride()` እና በREST `PUT` ተቆጣጣሪው ውስጥ ተረጋግጧል)።

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

## የአደጋ ጊዜ በጀት አማራጭ

`OMNIROUTE_EMERGENCY_FALLBACK` (ምድብ `runtime`፣ ነባሪ `true`) በ
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts)
ውስጥ ያለውን የአደጋ ጊዜ ነፃ አማራጭ መንገድ ይቆጣጠራል።
ሲነቃ፣ በጀታቸውን የጨረሱ ጥያቄዎች ሙሉ በሙሉ ከመክሸፍ ይልቅ ወደ ነፃ አማራጭ
አቅራቢ/ሞዴል ይመራሉ። ይህን ባህሪ ለማሰናከል እና በጀታቸውን የጨረሱ ጥያቄዎች
እንዲከሽፉ ለማድረግ፣ በዳሽቦርድ ማብሪያ/ማጥፊያ፣ በDB መሻር፣ ወይም በ
`OMNIROUTE_EMERGENCY_FALLBACK` የአካባቢ ተለዋዋጭ በኩል — ወደ `false` (ወይም `0`)
ያቀናብሩት። (በPRs #3741 / #3752 ውስጥ እንደ የዳሽቦርድ ማብሪያ/ማጥፊያ ቀርቧል።)

በዚህ አማራጭ የቀረበ ምላሽ
`X-OmniRoute-Emergency-Fallback: from=<provider/model>; to=<provider/model>` ይይዛል፤ በዚህም
ደንበኛው `X-OmniRoute-Provider`ን ከጥያቄው ጋር ሳያነጻጽር ጥያቄው እንደገና መመራቱን
ማወቅ ይችላል። ይህ ራስጌ በሌሎች ምላሾች ሁሉ ላይ አይኖርም።

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
