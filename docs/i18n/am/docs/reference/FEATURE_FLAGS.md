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

በ6 ምድቦች የተከፋፈሉ 82 ፍላጎች። **ነባሪ** ማለት በትርጉሙ የተወሰነው ነባሪ እሴት ነው — ይህም
የDB መሻሪያም ሆነ የአካባቢ ተለዋዋጭ በማይኖርበት ጊዜ ጥቅም ላይ የሚውለው እሴት ነው።

### ደህንነት (10)

| ቁልፍ                                     | ዓይነት    | ነባሪ      | መግለጫ                                                                                                                                                                                           |
| --------------------------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | ለሁሉም ገቢ ጥያቄዎች የAPI ቁልፍ እንዲኖር ያስገድዱ።                                                                                                                                                            |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | ለሁሉም ጥያቄዎች የግቤት ማጽዳትን ያንቁ።                                                                                                                                                                     |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | የፕሮምፕት ኢንጀክሽን መከላከያ ሁነታ። እሴቶች፦ `off`፣ `warn`፣ `block`፣ `redact`።                                                                                                                               |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | PIIን ከጥያቄዎች ውስጥ ይደብቁ (`INPUT_SANITIZER_MODE` ላይ ጥገኛ አይደለም)።                                                                                                                                    |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | PIIን ከአቅራቢ ምላሾች ውስጥ ያጽዱ።                                                                                                                                                                       |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | የPII ምላሽ ማጽዳት ሁነታ። እሴቶች፦ `redact`፣ `warn`፣ `block`፣ `off`።                                                                                                                                     |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | የቆየ ተለዋጭ ስም፦ በዚህ ፍላግ የዳሽቦርድ መቀያየሪያ ላይ የተቀመጠ እሴት ከአካባቢው በፊት ይነበባል፤ በሁለቱም ውስጥ `false`፣ `0`፣ `no` ወይም `off` የወጪ URL መከላከያውን የአስተናጋጅ ፍተሻዎች ልክ እንደ `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS` ያጠፋል።    |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | ማንነታቸው የተረጋገጠ የዳሽቦርድ ተጠቃሚዎች የተደበቁ እሴቶችን ብቻ ከማየት ይልቅ የተከማቹ የAPI ቁልፎችን እንዲያሳዩ ይፍቀዱ።                                                                                                              |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | በAUTH ሎግ መስመሮች ውስጥ የመለያ ቅድመ ቅጥያን ያካትቱ (ለምሳሌ፦ "<provider> መለያን በመጠቀም ላይ፦ abc12345...")። በተጋሩ/ባለብዙ ተከራይ የሂደት ሎጎች ውስጥ የመለያ መለያዎች እንዲደበቁ በነባሪነት ተሰናክሏል። ከማረም ሁነታ ነጻ ነው፤ የማረም ሁነታን መቀየር ይህንን አያሳይም። |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | OIDC ሲነቃ ተጠቃሚዎች በOIDC ነጠላ መግቢያ ብቻ ማንነታቸውን ማረጋገጥ እንዲችሉ በይለፍ ቃል መግባትን ያሰናክሉ። ሲሰናከል (ነባሪው)፣ በይለፍ ቃል መግባትም ሆነ OIDC ሁለቱም ይገኛሉ።                                                                      |

### አውታረ መረብ (23)

| ቁልፍ                                             | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------------- | ------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓         | የTLS fingerprint ድብቅ ሁነታን አንቃ።                                                                                                                                                                                                                                                                                                                                                                            |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |           | የ/v1/audio/* መስመሮች ከlocalhost ውጭ የሚስተናገዱ OpenAI-ተኳኋኝ provider nodes እንዲጠቀሙ ፍቀድ። በነባሪ ጠፍቷል — ድምፅን ወደ ሩቅ አስተናጋጅ ማስተላለፍ የወጪ ትራፊክ ማንነትን ስለሚቀይር ግልጽ የኦፕሬተር ውሳኔ መሆን አለበት። Loopback nodes ሁልጊዜ የተፈቀዱ ሲሆን ተጽዕኖም አይደርስባቸውም።                                                                                                                                                                                        |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |           | POST /v1/rerank (እና የmemory engine loopback rerank ደረጃ) ከlocalhost ውጭ የሚስተናገዱ OpenAI-ተኳኋኝ provider nodes እንዲጠቀም ፍቀድ። በነባሪ ጠፍቷል — ወደ ሩቅ አስተናጋጅ ማስተላለፍ የወጪ ትራፊክ ማንነትን ስለሚቀይር ግልጽ የኦፕሬተር ውሳኔ መሆን አለበት። Loopback nodes ሁልጊዜ የተፈቀዱ ናቸው፤ remote nodes በተጨማሪ የprovider outbound URL policyን ማለፍ አለባቸው።                                                                                                           |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |           | ለግንኙነት proxy ካልተመደበ፣ ከregistryው ውስጥ የመጀመሪያውን የሚሰራ proxy በራስ-ሰር ምረጥ። በነባሪ ጠፍቷል (አለበለዚያ በregistryው ውስጥ ያለ ማንኛውም proxy ዓለም አቀፍ አማራጭ ይሆናል — #3332)።                                                                                                                                                                                                                                                           |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |           | የproxy ተደራሽነት ቅድመ-ማረጋገጫዎች ሲወድቁ፣ OAuth እና የprovider ማረጋገጫ ፍሰቶች በቋሚነት የተወሰነ proxyን አልፈው በቀጥታ እንዲገናኙ ፍቀድ። ይህ የወጪ ትራፊክ IPን ሊቀይር ስለሚችል በነባሪ ጠፍቷል።                                                                                                                                                                                                                                                              |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |           | ለብዙ-መለያ rotation executor የአውታረ መረብ ልዩ ሁኔታ (ጊዜው ማለፍ፣ ግንኙነት ውድቅ መደረግ/ዳግም መጀመር) ሲከሰት፣ ችግር ያጋጠመው መለያ የተወሰነ proxy ከሌለው እያንዳንዱን መለያ እንደገና ከመሞከር ይልቅ አጭር cooldown ተግብር እና ለቀሪው ጥያቄ proxy የሌላቸውን ሌሎች መለያዎች ዝለል። በነባሪ በርቷል (ደህንነቱ የተጠበቀ፦ የወጪ ትራፊክ IP አይቀየርም፣ በshared-egress መለያዎች ላይ የlatency/cooldown አደጋን ብቻ ይቀንሳል)። የመጀመሪያው proxy የሌለው throw ሲከሰት ፈጣን propagationን ለመመለስ አሰናክል።                                |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |           | Opencode rotation የትኛው መለያ እንዳገለገለ ወይም እንደተዘለለ ይመዘግባል (የተሸፈኑ ids ብቻ፣ ሙሉ account ids ፈጽሞ አይመዘገቡም)፣ እንዲሁም የproxy log ግቤቶችን ከጥያቄያቸው ጋር ያገናኛል፤ በዚህም ኦፕሬተሩ የተዘለሉ መለያዎችን ጥቅም ላይ ካልዋሉት ለይቶ ማወቅ ይችላል። በነባሪ ጠፍቷል።                                                                                                                                                                                                  |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `true`  |           | Proxy pools እና የopencode የእያንዳንዱ-መለያ rotation አሁን የወደቀ proxyን (ውድቅ የተደረገ TCP probe፣ ወይም በእሱ በኩል የደረሰ 429) በእያንዳንዱ ድግግሞሽ እስከ ከፍተኛ ገደብ ድረስ ለእጥፍ በሚያድግ የprocess ጊዜ ውስጥ እንደገና ማቅረብ ያቆማሉ። ምንም የproxy ሁኔታ አይጻፍም፤ እያንዳንዱ candidate ወደጎን ቢቀመጥም ምርጫው አይቀየርም። በነባሪ በርቷል፤ `false` መደበኛ ምርጫን ይመልሳል።                                                                                                                   |
| `PROXY_POOL_SHARED_EGRESS_ORDER`                | boolean | `false` |           | ኮታቸው በመውጫ አድራሻ ለሚመደብ አቅራቢዎች፣ በቅርቡ ውድቅ ከተደረገ አባል ጋር ተመሳሳይ የታየ የመውጫ አድራሻ የሚጋራውን የፑል አባል ከጤናማ አባላት በታች ደረጃ ያስቀምጣል። የሚያደርገው ቅደም ተከተል ማስያዝ ብቻ ነው፤ ፈጽሞ አያገልም። የሚያነበውን የውድቅ ምልክት የሚያመነጨውን PROXY_SKIP_RECENTLY_FAILED ይፈልጋል። በነባሪነት ጠፍቷል።                                                                                                                                                                         |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |           | በዳሽቦርዱ ውስጥ ከፕሮክሲ ፑል ሥር፣ ባለፉት 24 h ስንት የታዩ የመውጫ IPዎች አባላቱን እንዳገለገሉ እና ስንት ግንኙነቶች እንደተጠቀሙባቸው ያሳያል። ለንባብ ብቻ ነው፣ ከፕሮክሲ ምዝግብ የሚሰላ ሲሆን ለማስተላለፊያ ፈጽሞ ጥቅም ላይ አይውልም። በነባሪነት ጠፍቷል።                                                                                                                                                                                                                                  |
| `PROXY_OPERATOR_EGRESS_ENABLED`                 | boolean | `false` |           | ኦፕሬተሩ ለእያንዳንዱ የፑል አባል ቀን አስቀምጦ የላካቸውን የታዩ አድራሻዎች ይቀበላል፣ እና ለማሳያና ለፑል ቅደም ተከተል ከጆርናሉ ከተነበቡት ጋር ያዋህዳቸዋል። በነባሪነት ጠፍቷል፦ የመግፊያ መንገዱ 404 ይመልሳል፣ እና የፑል ንባቦች ልክ እንደበፊቱ ይሠራሉ።                                                                                                                                                                                                                                     |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |           | ለOpenCode አስፈጻሚ፣ በዥረት የሚላክ የResponses ምላሽ የመጀመሪያውን የይዘት ባይት ይከታተላል (መስኮት፦ `RESPONSES_FIRST_BYTE_TIMEOUT_MS`፣ ነባሪ `15000`)። ከመስኮቱ በላይ ዝም ብሎ የሚቆይ የ2xx Responses ዥረት እንደተቋረጠ ይቆጠራል፦ መለያው ለጊዜው እንዲቆም ይደረጋል፣ እና ጥያቄው አንድ ጊዜ ወደሚቀጥለው መለያ ይዞራል፤ ሁለተኛ መቋረጥ ወዲያውኑ ያሳክታል። በነባሪነት ጠፍቷል፦ የተቋረጡ ዥረቶች እስከዥረት ዝግጁነት ጊዜ ማብቂያ ድረስ ያለውን የአሁኑን መጠበቅ ይቀጥላሉ።                                                                  |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |           | OpenCode አስፈጻሚ፦ የ`user_blocked` ውድቅ ማድረጊያ ባለው 403/451 ምላሽ ላይ (የመልክዓ ምድር ገደብ ያልሆነ፣ የCloudflare አሻራ ውድቅ ማድረጊያ ያልሆነ)፣ ውድቅ የተደረገውን መለያ ለጊዜው ያቆማል፣ እና በእያንዳንዱ ጥያቄ ቢበዛ አንድ ጊዜ ወደሚቀጥለው መለያ ይዞራል፤ ሁለተኛ ውድቅ ማድረጊያ የስኬት ምልክት ሳይደረግበት እንዳለ ይመለሳል። በነባሪነት ጠፍቷል፦ የላይኛውን አቅራቢ የተጠቃሚ እገዳ በማለፍ መስመር መቀየር እንደማምለጥ ሊታይ እና ምልክቱን በመላው ስብስብ ሊያሰራጭ ይችላል።                                                                       |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |           | የOpenCode ማዞር፦ ሁለት ተከታታይ ጊዜያዊ የላይኛው አቅራቢ ውድቀቶች (5xx ወይም ባዶ 400) ከደረሱ በኋላ፣ ወደሚቀጥለው መለያ ከመሄዱ በፊት ይቆማል — 1.5s ሲሆን በእያንዳንዱ ተጨማሪ ውድቀት እጥፍ ይሆናል፣ በእያንዳንዱ ማቆሚያ እስከ 6s እና በእያንዳንዱ ጥያቄ እስከ 10s ይገደባል፣ የደንበኛ ግንኙነት ሲቋረጥ ይዘለላል፤ ያልተሳካው ይዘት ከመጠበቁ በፊት ይለቀቃል። በነባሪነት ጠፍቷል፦ ወደ ተለዋጭ መሄድ ወዲያውኑ ይቀጥላል።                                                                                                                    |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |           | የOpenCode ማዞር፦ ተደጋጋሚ ጊዜያዊ 429ዎች (ወይም አዲስ የፑል ጫና ምልክት) ከተከሰቱ በኋላ ጥያቄውን ከልብ ምት ጋር ያቆያል፣ ከዚያም መላውን ስብስብ በአንድ ጊዜ ከማሰራጨት ይልቅ እስከ 3 ተከታታይ መለያዎችን የሚያካትት አንድ የተገደበ ዙር እንደገና ያጫውታል። በነባሪነት ጠፍቷል፦ እያንዳንዱ 429 ልክ እንደበፊቱ ወደሚቀጥለው መለያ ያዞራል።                                                                                                                                                                           |
| `STREAM_READINESS_STALL_RETRY`                  | boolean | `false` |           | የዥረት ውይይት፦ የመጀመሪያው የላይኛው አቅራቢ ይዘት ጠቃሚ ክስተት ከማመንጨቱ በፊት ሲቋረጥ፣ በተመሳሳይ የማስተላለፊያ መንገድ በኩል፣ በተመሳሳይ የዝግጁነት በጀት እና ያለመለያ ቅጣት አንድ የተገደበ ሁለተኛ ሙከራ ያደርጋል። በነባሪነት ጠፍቷል፦ የተቋረጠ የመጀመሪያ ይዘት ያለዳግም ሙከራ ጥያቄውን ያሳክታል።                                                                                                                                                                                                       |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |           | በተተረጎሙ የዥረት ዙሮች ላይ፣ የላይኛው አቅራቢ ዙር ምንም ጠቃሚ ይዘት ካልያዘ (በምክንያት ማብራሪያ ብቻ የተጠናቀቀ ወይም ምንም ጠቃሚ ቁራጭ የሌለው)፣ ማንኛውም ነገር ለደንበኛው ከመጋለጡ በፊት በመደበኛው የማረጋገጫ መንገድ በኩል የተገደቡ ዳግም ሙከራዎችን (እስከ `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`) ያደርጋል። በነባሪነት ጠፍቷል፦ ባዶ ዙሮች የአሁኑን ባህሪ (ባዶ 200 ወይም ባዶ-ይዘት 502) እንደያዙ ይቆያሉ።                                                                                                                |
| `OPENCODE_POOL_RESELECT`                        | boolean | `false` |           | የOpenCode ማዞር፦ በድባብ የፑል አውድ ሥር ፕሮክሲ በሌለው መለያ ላይ፣ ኮታውን በመውጫ አድራሻ ከሚመድብ አቅራቢ 429 ከመጣ በኋላ፣ ተመሳሳዩን የመውጫ አድራሻ እንደገና ከመሞከር ይልቅ ለሚቀጥለው ሙከራ ሌላ አባል እንዲሰጥ የግንኙነት ፑሉን ይጠይቃል። ቅደም ተከተል ያስይዛል እንጂ ፈጽሞ አያገልም፦ የተሟጠጠ ፑል የአሁኑን ባህሪ እንደያዘ ይቀጥላል። በነባሪነት ጠፍቷል፦ እያንዳንዱ 429 ልክ እንደበፊቱ ወደሚቀጥለው መለያ ያዞራል።                                                                                                                      |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |           | OpenCode ማዞሪያ፦ እንደ እውነተኛ የፍጥነት ገደብ የተመደበው የመጀመሪያው 429 ሲያጋጥም (ሊተነተን የሚችል `Retry-After`፣ ወይም የፍጥነት/አጠቃቀም ገደብን የሚጠቅስ የምላሽ ይዘት) የመለያዎችን ሞገድ ያቁሙ እና ያንን የ upstream 429 ሳይቀየር ይመልሱ። ያልተመደቡ 429ዎች መዞራቸውን ይቀጥላሉ። በነባሪ ጠፍቷል፦ ነፃው ደረጃ በእያንዳንዱ የ egress IP የተገደበ ስለሆነ (#9611)፣ እያንዳንዱ 429 ማዞርን ያስከትላል፣ እና ሙሉ በሙሉ ያለቀ ሞገድ የመጨረሻውን የ upstream 429 ይመልሳል።                                                               |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓         | ለ MITM ፕሮክሲው የ TLS ሰርቲፊኬት ማረጋገጫን ያሰናክሉ። **አደገኛ።**                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |           | በአቅራቢ URL ማረጋገጫ፣ ሞዴል ፍለጋ፣ የአቅራቢ-ኖድ መሠረታዊ URLዎች እና የፕሮክሲ-አማራጭ ሙከራ ላይ የወጪ URL ጥበቃውን የአስተናጋጅ ፍተሻዎች፣ የደመና-ሜታዳታ እገዳን ጨምሮ፣ ያጠፋል፤ እንዲሁም የግል webhook መዳረሻዎችን ይፈቅዳል። በማረጋገጫ፣ ፍለጋ እና የአቅራቢ-ኖድ መንገዶች ላይ የአካባቢ እና LAN URLዎች በነባሪ አስቀድመው ያልፋሉ (`OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`)፤ የፕሮክሲ-አማራጭ ሙከራው እና የግል webhook መዳረሻዎች `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`ን ብቻ ይመለከታሉ፣ እና ይህ ጠፍቶ ሳለ የአካባቢ/LAN አስተናጋጆችን ያግዳሉ። |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |           | በአካባቢ/የግል አድራሻዎች (127.0.0.1, localhost, LAN) ላይ ያሉ የአቅራቢ URLዎችን ይፍቀዱ። በነባሪ እንዲሠራ ተደርጓል (አካባቢን-ቅድሚያ የሚሰጥ)፦ ከዚያም ጥበቃው የደመና-ሜታዳታ መዳረሻዎችን (ሁሉንም 169.254.0.0/16 እና የታወቁትን የሜታዳታ አስተናጋጅ ስሞች) ያግዳል። ለጥብቅ የሕዝብ-ብቻ እገዳ ያሰናክሉት፦ የግል እና loopback አስተናጋጆችም ይታገዳሉ።                                                                                                                                                     |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓         | ከ Claude Code ጋር ተኳሃኝ የሆነውን የአቅራቢ ሁነታ ያንቁ።                                                                                                                                                                                                                                                                                                                                                                |

### ፖሊሲዎች (5)

| ቁልፍ                             | ዓይነት    | ነባሪ        | መግለጫ                                                                                                                                                          |
| ------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | የመሣሪያ አጠቃቀም ፖሊሲ ማስፈጸሚያ ሁነታ። እሴቶች፦ `disabled`፣ `warn`፣ `block`።                                                                                                |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | በአጠቃቀም ቅጦች ላይ ተመስርቶ የፍጥነት ገደብን በራስ-ሰር ያንቁ።                                                                                                                    |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | ለቀጥታ ነጠላ-ሞዴል ጥያቄዎች የ OmniRouteን አካባቢያዊ የአውድ-መስኮት / ከፍተኛ-የግቤት-token ፍተሻ ዝለሉ። የ upstream ገደቦች አሁንም ተግባራዊ ናቸው።                                                   |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | የታለመው ሞዴል አስፈላጊ ችሎታዎች (ምስል ማየት፣ መሣሪያዎች፣ የተዋቀረ ውፅዓት፣ የአውድ መስኮት) ከሌሉት ጥያቄዎችን ከመላካቸው በፊት ውድቅ ያድርጉ። የ combo-layer ተኳኋኝነት ማጣሪያን የሚያልፉ ቀጥተኛ የነጠላ-አቅራቢ ጥያቄዎችን ይጠብቃል። |
| `RADAR_ENABLED`                 | boolean | `false`    | የ OmniRoute Radar ሞጁሉን (የካታሎግ ምግብ ማያ ገጾች እና ማመሳሰል) ያንቁ። በነባሪ ጠፍቷል፤ ማንቃት UIውን ብቻ ይከፍታል—የውሂብ ማመሳሰል ለብቻው መርጦ መግባትን ይፈልጋል።                                        |

### የአሂድ ጊዜ (34)

| ቁልፍ                                         | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------- | ------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | ቡሊያን    | `true`  |           | የጥምር ማዘዋወር ሞዴሎችን ሲቀይር የውይይት ማጠቃለያዎችን ይፍጠሩ እና ያስገቡ። የሞዴል ቅያሬዎችን ለየብቻ ለማስተናገድ እና ለሁሉም ነባር እና የወደፊት ጥምሮች የበስተጀርባ ርክክብ ጥያቄዎችን ለመከላከል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                   |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | ቡሊያን    | `true`  |           | ወደ ደንበኞች ከማስተላለፍ በፊት የውስጥ የማብራሪያ ደረጃ ውጤት ንጥሎችን ከResponses API ቀጥታ-ማሳለፊያ ዥረቶች ያስወግዱ። ጥሬውን የላይኛው ምንጭ ማብራሪያ ለመቀበል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | ቡሊያን    | `false` |           | በMCP መሣሪያ መዳረሻ ላይ የወሰን ገደቦችን ያስገድዱ።                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | ቡሊያን    | `false` |           | የቶከን አጠቃቀምን ለመቀነስ የMCP መሣሪያ መግለጫዎችን ይጭመቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | ቡሊያን    | `false` |           | በአሂድ ጊዜ የበስተጀርባ ተግባር ማስኬድን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | ቡሊያን    | `false` | ✓         | ሁሉንም የበስተጀርባ አገልግሎቶች (የኮታ ማደስ፣ ማመሳሰል፣ ወዘተ) ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |           | የፕሮጀክት ደረጃ RTK ማጣሪያዎችን ያለ ማረጋገጫ እመን።                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓         | በማስመጣት ጊዜ የቅጽበታዊ ዳሽቦርድ WebSocket አገልጋይን አስጀምር (በነባሪ ወደብ 20132)።                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |           | Codex የResponses-over-WebSocket ማጓጓዣን እንዲጠቀም ፍቀድ። ሲጠፋ Codex ወደ HTTP Responses ይመለሳል።                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |           | Codex የአካባቢውን app-server WebSocket JSON-RPC ማጓጓዣ (`codexTransport=app-server`) እንዲጠቀም ፍቀድ። ሲጠፋ፣ app-serverን ለመጠቀም የተመረጡ ግንኙነቶች ወደ Codex ሌሎች ማጓጓዣዎች ይመለሳሉ።                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |           | በጀታቸው ያለቀባቸውን ጥያቄዎች ወደ ድንገተኛው ነፃ ምትክ አቅራቢ/ሞዴል ላክ። (ከታች [የድንገተኛ ጊዜ የበጀት ምትክ](#emergency-budget-fallback)ን ይመልከቱ።)                                                                                                                                                                                                                                                                                                                                                           |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |           | ማንኛውም የምላሽ ባይቶች ወደ ደንበኛው ከመድረሳቸው በፊት ለተቆረጡ የላይኛ ምንጭ SSE ዥረቶች ግልጽ ያልሆነ ቀደምት ዳግም ሙከራን አንቃ።                                                                                                                                                                                                                                                                                                                                                                                   |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |           | ባይቶች ወደ ደንበኛው ከደረሱ በኋላ የዥረት መልሶ ማግኛው ምላሽን እንደገና እንዲጠይቅና እንዲያገናኝ ፍቀድ።                                                                                                                                                                                                                                                                                                                                                                                                       |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |           | የዥረት መሀል ቀጣይነትን ለመሣሪያ ጥሪ ደህንነቱ የተጠበቀ አድርግ፦ አንድ ጊዜ የመሣሪያ ጥሪ ከተላከ (በሂደት ላይ ያለ ወይም አስቀድሞ በ`finish_reason` `tool_calls` የተጠናቀቀ) የተቆረጠ ዥረትን ፈጽሞ አትቀጥል፤ እንዲሁም መላውን በጀት ከማሟጠጥ ይልቅ ከአንድ ባዶ ቀጣይነት በኋላ ዝጋ። ጠፍቶ ሲሆን፦ የልቀት ባህሪ።                                                                                                                                                                                                                                                        |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |           | SSE ዥረት ምንም ጠቃሚ ፍሬም ከማውጣቱ በፊት ሲዘጋ እና የተገደበው የተመሳሳይ-ግንኙነት ዳግም ሙከራ ሲያልቅ፣ አንድ ጊዜ ወደ ተጓዳኝ ግንኙነት ቀይሮ እንዲሰራ ያድርጉ፤ ጥቅም ላይ ሊውል የሚችል ተጓዳኝ ከሌለ የመጀመሪያው `STREAM_EARLY_EOF` 502 ይመለሳል። በነባሪነት ጠፍቷል፦ ቀደምት-EOF ከተመሳሳይ-ግንኙነት ዳግም ሙከራ በኋላ የመጨረሻ ሁኔታ ሆኖ ይቆያል።                                                                                                                                                                                                                               |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |           | በ`/v1/models` ምላሾች ውስጥ ለእይታ ምቹ የሆኑ የስም መስኮችን ያካትቱ። የሞዴል IDs ብቻ ለሚጠብቁ ደንበኞች ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                                                         |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |           | በ/v1/models ውስጥ የሞዴል IDs ቅድመ ቅጥያ እንዴት እንደሚያገኙ ይቆጣጠራል። 'dual' (ነባሪ) ከቀደሙ ስሪቶች ጋር ለመጣጣም ሁለቱንም የቅጽል ስም እና መደበኛ የprovider-id ቅድመ ቅጥያዎች ያወጣል። 'alias' አጭሩን የቅጽል ስም ቅድመ ቅጥያ ብቻ ያወጣል (ለምሳሌ ds-web/model፣ deepseek-web/model አይደለም)። 'canonical' ሙሉውን የprovider-id ቅድመ ቅጥያ ብቻ ያወጣል። እሴቶች፦ `dual`፣ `alias`፣ `canonical`።                                                                                                                                                            |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |           | ለሞዴል የብልህነት ደረጃዎች ወቅታዊ የArena AI የመሪዎች ሰሌዳ ELO ማመሳሰልን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |           | የClaude Code ጌትዌይ ሞዴል ፍለጋ Claude ያልሆኑ ሞዴሎችን እንዲዘረዝር፣ በ`/v1/models` ላይ የ`claude/<provider>/<model>` መስታወት ids ያስተዋውቁ። የሶስት-ደረጃ መግቢያው ዓለም አቀፍ ደረጃ ነው (env ከዳሽቦርድ መሻር ቅንብር ይቀድማል)። [Claude Code ውቅር](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)ን ይመልከቱ።                                                                                                                                                         |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |           | ለno-think/<provider>/<model> ጌትዌይ ቅጽል ስሞች ዋና ማብሪያ። ሲበራ (ነባሪ)፦ /v1/models ብቁ ለሆነ እያንዳንዱ የማሰብ ችሎታ ያለው Claude ሞዴል ያለማሰብ ተለዋጭ ስሪት ያስተዋውቃል፤ እንዲሁም በጥያቄ ላይ የተላከ no-think/ id ምክንያታዊ ማሰብ ታግዶ ወደ እውነተኛው ሞዴል ተመልሶ ይፈታል። ሲጠፋ፦ ምንም ተለዋጭ ስሪቶች አይተዋወቁም፣ እና no-think/ id እንደማንኛውም ሌላ ያልታወቀ የሞዴል id ይቆጠራል። ይህ ሲበራ የእያንዳንዱ ሞዴል ModelSpec.noThinkingAlias የመሳተፍ/ያለመሳተፍ ቅንብር አሁንም ተግባራዊ ይሆናል።                                                                                                |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |           | በ/v1/models ካታሎግ ውስጥ የማሰብ ደረጃ ተለዋጭ ስሪቶችን (ለምሳሌ -low፣ -medium፣ -high) ማመንጨት ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓         | ለprovider ማሰራጨት በtenant የሚለያዩ እና ከሁኔታው ጋር የሚላመዱ ምናባዊ የመቀበያ መስመሮችን ያንቁ (#9654)፦ የአንድ tenant ድንገተኛ ጭማሪ ከእንግዲህ ለሌላው 503 አያስከትልም። የOMNIROUTE_CHAT_VIRTUAL_LANES env var ከዚህ የዳሽቦርድ መሻር ቅንብር ይቀድማል፤ ለውጦች አገልጋዩ ዳግም ሲጀምር ተግባራዊ ይሆናሉ።                                                                                                                                                                                                                                             |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |           | መደበኛ ባለቤታቸው ንቁ የመግቢያ ማስረጃ ለሌለው፣ ነገር ግን ንቁ የመግቢያ ማስረጃ ያለው passthrough gateway ለሚያስተላልፋቸው ሞዴሎች፣ የ<gateway-alias>/<model> መስተዋት መለያዎችን በ/v1/models ላይ ያስተዋውቁ። ማስጠንቀቂያ፦ በአጠቃላይ ሲነቃ ለሁሉም ደንበኞች የካታሎግ ግቤቶችን ይጨምራል።                                                                                                                                                                                                                                                               |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |           | ከNew-API / One-API / Sub2API ሰብሳቢ ጋር ተኳሃኝ ለሆኑ ኖዶች የሂሳብ ቀሪ ማወቂያን ያንቁ። ሲነቃ፣ የሰብሳቢ ምልክት የተዋቀረላቸው ተኳሃኝ ኖዶች የሂሳብ ቀሪያቸውን በዳሽቦርዱ እና በኮታ-ቅድመ-ማረጋገጫ ማስተላለፊያ ውስጥ ሪፖርት ያደርጋሉ።                                                                                                                                                                                                                                                                                                         |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |           | ሞዴሉ ደንበኛው ሊጠቀምበት የሚችል ምላሽ እስኪመልስ ድረስ በሰርቨሩ የሚተዳደሩ የማይለቀቁ የመሣሪያ ጥሪዎችን ይቀጥሉ።                                                                                                                                                                                                                                                                                                                                                                                                 |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |           | የፍለጋ ስታቲስቲክስ እና የቅርብ ጊዜ ፍለጋዎች አሁንም ንቁ ግንኙነት ያላቸውን አቅራቢዎች ብቻ ይቆጥራሉ (እንደ duckduckgo-free ያሉ ቁልፍ የማይፈልጉ አቅራቢዎች ሁልጊዜ ይቆጠራሉ)። ሲጠፋ፣ የአቅራቢ መለያ ያለውን እያንዳንዱን የተያዘ የፍለጋ ረድፍ ያቆያል።                                                                                                                                                                                                                                                                                                   |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |           | የዳሽቦርድ አቅራቢ ገጾች፦ ነፃ ባጁን አቅራቢው በሚያከብራቸው ምልክቶች ላይ ብቻ ያሳዩ — ሰነድ የቀረበለት ነፃ ደረጃ በሌላቸው የተመዘገቡ አቅራቢዎች ላይ የማሳያ-ስም ግምታዊ ዘዴን፣ boolean ያልሆኑ የነፃነት መስኮችን እና :free ቅጥያዎችን ያስወግዳል። ሲጠፋ፣ ታሪካዊውን የባጅ ደንብ ያቆያል።                                                                                                                                                                                                                                                                             |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |           | በተሰባሰቡ 429/503 የማይገኝ ምላሾች ላይ፣ የተወሰነ የወደፊት ዳግም-ሙከራ ጊዜ ካልታወቀ `Retry-After`ን ይተዉ (ሰው ሠራሽ 1s ከመጠቀም ይልቅ)፣ `error.retry_after_provenance` (`signal` \| `none`) ያክሉ፣ እና የcombo ማስወገጃ መንገዶች ከJSON እና ከቀላል-ጽሑፍ upstream አካሎች ገላጭ የዳግም-ሙከራ ፍንጮችን እንዲያነቡ ይፍቀዱ። መስኩ የሚታየው በ`unavailableResponse()` በተገነቡ ምላሾች ላይ ብቻ ነው፤ ሌሎች 429/503 አካሎች አይለወጡም።                                                                                                                                       |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |           | fallback-only-on-quota-exhaustion ተብሎ ምልክት የተደረገበት የ`priority` combo ዒላማ፣ ምክንያቱ ኮታ እንዳልሆነ በእርግጠኝነት ሊረጋገጥ በሚችልበት ሁኔታ (የአቅራቢ circuit breaker ክፍት መሆን፣ በግምታዊ መዘግየት ምክንያት መዝለል) comboውን ሲያቆም፣ ኮታ የሚመስለውን 503 ከመመለስ ይልቅ 502 ይመልሱ። Lockout፣ cooldown፣ unavailable፣ exhaustion እና concurrency-cap ማቆሚያዎች 503ን ያቆያሉ።                                                                                                                                                               |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |           | ግልጽ ያልሆነ Mistral 401 (`{"detail":"Unauthorized"}`፣ ግልጽ የማረጋገጫ ምልክት የሌለው) ለተሰረዘ ቁልፍም ሆነ ኮታው ላለቀበት ሁኔታ ተመሳሳይ ነው። ሲበራ፣ ግንኙነቱን `expired` ብሎ ከማቆም ይልቅ cooldown ውስጥ ያስገባዋል፤ ይህም ለእያንዳንዱ ግንኙነት በሰዓት እስከ 3 ጊዜ ብቻ ነው። ቀጣዩ ግንኙነቱን ያቆመዋል፣ ስለዚህ የተሰረዘ ቁልፍ አሁንም ወደ ቋሚ ሁኔታ ይደርሳል። በነባሪ ጠፍቷል፦ እያንዳንዱ ግልጽ ያልሆነ Mistral 401 እንደበፊቱ ግንኙነቱን ያቆማል።                                                                                                                                             |
| `GROK_SUBSCRIPTION_IMAGES_ENABLED`          | boolean | `false` |           | የxai-oauth (xao) እና grok-cli ምስል መስመሮችን ይመዝግቡ እና የOpenAI high/hd ጥራትን ወደ xAI medium ያመሳስሉ። በነባሪ ጠፍቷል፦ የAPI ቁልፍ xAI ምስል ዱካ ነባሩን ከOpenAI ጋር ተኳሃኝ የሆነ ጥያቄ መጠቀሙን ይቀጥላል፣ እና የደንበኝነት ምዝገባ መስመሮቹ አይመዘገቡም።                                                                                                                                                                                                                                                                         |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `true`  |           | ከተወሰነው የማይለወጥ መነሻ ይልቅ፣ የOAuth bearer tokenን በመጠቀም ለxai-oauth ግንኙነቶች የቀጥታውን xAI ሞዴል ካታሎግ ከhttps://api.x.ai/v1/models ያምጡ። በነባሪ በርቷል። የማይለወጠውን መነሻ ማቅረብዎን ለመቀጠል ባንዲራውን ወደ false ያዘጋጁ። የHTTP አለመሳካቶች በማግኛ መስመሩ ውስጥ ወደ መነሻው ይመለሳሉ፤ የባንዲራው getter ራሱ HTTP ጥያቄ አያደርግም።                                                                                                                                                                                                           |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |           | ራስ-ሰር የማጽዳት ፍተሻው፣ ከ`OMNIROUTE_BATCH_RETENTION_DAYS` በላይ ዕድሜ ያላቸውን የመጨረሻ ሁኔታ ላይ የደረሱ (የተጠናቀቁ/ያልተሳኩ/የተሰረዙ/ጊዜያቸው ያለፈ) የBatch API ሥራዎችን ከየመስመሩ የማረጋገጫ ነጥቦቻቸው ጋር እንዲሰርዝ፣ እንዲሁም የራሳቸው `expires_at` ካለፈ በኋላ የተሰቀሉ ፋይሎችን BLOB ይዘት እንዲያጸዳ ይፍቀዱ። በነባሪ ጠፍቷል፦ አንድ ከዋኝ እስኪያነቃው ድረስ እያንዳንዱ ነባር ጭነት ይህን ውሂብ ልክ እንደበፊቱ ይይዛል። በከዋኝ የሚነሳው `DELETE /api/v1/batches/delete-completed` መስመር በሁለቱም ሁኔታ አይነካም — እሱ የተለየ፣ ያለቅድመ ሁኔታ የሚሠራ የወል API ውል ነው።                                            |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |           | የመረጠው ጥያቄ በሚለቀቅበት የዥረት የሕይወት ዑደት ጊዜ ሁሉ የተመረጠውን Antigravity መለያ ያስይዙ፤ በዚህም በትይዩ የሚከናወን ድጋሚ ሙከራ ወይም የማረጋገጫ መረጃ ርክክብ፣ በሂደት ላይ ላለ ዥረት አስቀድሞ የተመደበ መለያን እንደገና መምረጥ አይችልም። ማስያዣው በ(ግንኙነት፣ ሊጠራ በሚችል upstream ሞዴል) ወሰን ይገደባል፤ ስለዚህ አንድ መለያ አሁንም ሁለት የተለያዩ ሞዴሎችን በአንድ ጊዜ ማገልገል ይችላል። ለዚያ ሞዴል ብቁ የሆኑ መለያዎች ሁሉ አስቀድመው በሊዝ ሲያዙ፣ ጥያቄው በተጨናነቀ መለያ ላይ ከመደራረብ ይልቅ የተዋቀረ 503 `antigravity_pool_busy`ን ከተወሰነ `Retry-After` ጋር ይመልሳል። በነባሪ ጠፍቷል፦ የመለያ ምርጫ ልክ እንደበፊቱ ይቆያል፣ እና ምንም ማስያዣ አይደረግም። |

### CLI (5)

| ቁልፍ                                   | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                           |
| ------------------------------------- | ------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓         | ለሁሉም የCLI ደንበኞች የተኳኋኝነት ሁነታን ያንቁ።                                                                                                                              |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |           | የሞዴል ቅጽል ስም ተኳኋኝነት ንብርብርን ያንቁ።                                                                                                                                 |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |           | ራስ-ሰር የዋጋ አወጣጥ ውሂብ ማመሳሰልን ያንቁ (`PRICING_SYNC_ENABLED` የአካባቢ ተለዋዋጭም ያስፈልገዋል)።                                                                                   |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |           | ከአቅራቢ ሞዴል ማመሳሰል በኋላ፣ የ~/.codex/*.config.toml መገለጫ ፋይሎችን ከቀጥታው ካታሎግ በራስ-ሰር (እንደገና) ይጻፉ። ንቁውን/ነባሪውን የCodex ውቅር ፈጽሞ አይቀይርም። በነባሪ ጠፍቷል።                            |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |           | ከአቅራቢ ሞዴል ማመሳሰል በኋላ፣ የ~/.claude/profiles/<name>/settings.json Claude Code መገለጫዎችን ከቀጥታው ካታሎግ በራስ-ሰር (እንደገና) ይጻፉ። ንቁውን/ነባሪውን የClaude ውቅር ፈጽሞ አይቀይርም። በነባሪ ጠፍቷል። |

### ጤና (5)

| ቁልፍ                                       | ዓይነት | ነባሪ     | መግለጫ                                                                                                                                                                                                                 |
| ----------------------------------------- | ---- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | ቡሊያን | `false` | የአካባቢያዊ ኢንስታንስ የጤና ምርመራ መጨረሻ ነጥብን ያሰናክሉ።                                                                                                                                                                             |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | ቡሊያን | `false` | የቶከን ማረጋገጫ የጤና ምርመራን ያሰናክሉ።                                                                                                                                                                                          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | ቡሊያን | `false` | በክህሎቶች ማግለያ አካባቢ ውስጥ የአውታረ መረብ መዳረሻን ያንቁ።                                                                                                                                                                            |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | ቡሊያን | `false` | በፕሮክሲ ጤና ቅኝት ውስጥ፣ ዒላማው ያልተቀበለው መፈተሻ (401/403/429) የፕሮክሲውን ተከታታይ-ውድቀት ቆጠራ ዳግም ያስጀምራል። በነባሪነት ጠፍቷል፦ አለመቀበል ገለልተኛ ሆኖ ይቆያል (#10654)። 5xx በሁለቱም ሁኔታዎች የማያስወስን ሆኖ ይቆያል፤ አለመቀበል ፕሮክሲን ፈጽሞ አያስወግድም፣ አያሰናክልም ወይም እንደገና አያነቃም። |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | ቡሊያን | `false` | ጅምርን እስኪጠናቀቅ ከማገድ ይልቅ፣ አገልጋዩ ጥያቄዎችን መቀበል ከጀመረ በኋላ (በ`setImmediate` በኩል) የጅምር DB ሙሉነት/ጤና ምርመራን ያሂዱ (#13717)። በነባሪነት ጠፍቷል፦ ጅምር ከዚህ PR በፊት እንደነበረው በትክክል ይታገዳል።                                                         |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` እና የቀድሞ ተለዋጭ ስሙ
> `INJECTION_GUARD_BLOCK_THRESHOLD` የ`INJECTION_GUARD_MODE`ን `block` ሁነታ
> ያስተካክላሉ፣ ነገር ግን በ
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> የሚነበቡ መደበኛ የአካባቢ ተለዋዋጮች እንጂ የባህሪ ባንዲራዎች አይደሉም፦ የDB መሻሪያም ሆነ የዳሽቦርድ መቀያየሪያ የላቸውም።
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)ን ይመልከቱ።

> [!NOTE]
> የ`Restart` ዓምድ `requiresRestart: true` ያላቸውን ባንዲራዎች ያመለክታል — እሴቱ
> ወዲያውኑ ይቀመጣል፣ ግን ተግባራዊ የሚሆነው ሂደቱ እንደገና ከተጫነ በኋላ ብቻ ነው። የኤነም
> ባንዲራዎች ከተፈቀደላቸው ስብስብ ውጭ ያለን ማንኛውንም እሴት ውድቅ ያደርጋሉ (በአገልጋይ በኩል
> በሁለቱም `setFeatureFlagOverride()` እና በREST `PUT` ተቆጣጣሪ ውስጥ ይረጋገጣል)።

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
