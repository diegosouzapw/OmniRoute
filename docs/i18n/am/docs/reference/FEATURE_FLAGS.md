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

## የFlag ካታሎግ

በ6 ምድቦች የተከፋፈሉ 80 flags። **ነባሪ** ማለት የውሂብ ጎታ ላይ የተደረገ ለውጥም ሆነ የአካባቢ ተለዋዋጭ በማይኖርበት ጊዜ
ጥቅም ላይ የሚውለው በትርጓሜው የተወሰነ ነባሪ እሴት ነው።

### ደህንነት (10)

| ቁልፍ                                     | ዓይነት    | ነባሪ      | መግለጫ                                                                                                                                                                                                            |
| --------------------------------------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | ለሁሉም ገቢ ጥያቄዎች የAPI ቁልፍ እንዲኖር አስገዳጅ ያድርጉ።                                                                                                                                                                        |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | ለሁሉም ጥያቄዎች የግብዓት ማጽዳትን ያንቁ።                                                                                                                                                                                     |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | የPrompt injection መከላከያ ሁነታ። እሴቶች፦ `off`፣ `warn`፣ `block`፣ `redact`።                                                                                                                                            |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | PIIን ከጥያቄዎች ያውጡ (`INPUT_SANITIZER_MODE` ላይ የማይመሠረት)።                                                                                                                                                            |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | PIIን ከአቅራቢ ምላሾች ያጽዱ።                                                                                                                                                                                            |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | የPII ምላሽ ማጽዳት ሁነታ። እሴቶች፦ `redact`፣ `warn`፣ `block`፣ `off`።                                                                                                                                                      |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | ወደ የግል/ውስጣዊ IP ክልሎች የሚላኩ ወጪ ጥያቄዎችን ያግዱ።                                                                                                                                                                         |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | ማንነታቸው የተረጋገጠ የዳሽቦርድ ተጠቃሚዎች የተሸፈኑ እሴቶችን ብቻ ከማየት ይልቅ የተከማቹ API ቁልፎችን እንዲያሳዩ ይፍቀዱ።                                                                                                                                |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | በAUTH ምዝግብ ማስታወሻ መስመሮች ውስጥ የመለያ ቅድመ ቅጥያውን ያካትቱ (ለምሳሌ፦ "<provider> መለያን በመጠቀም ላይ፦ abc12345...")። የመለያ መለያዎች ከጋራ/ባለብዙ-ተከራይ የሂደት ምዝግብ ማስታወሻዎች እንዲወገዱ በነባሪነት ተሰናክሏል። ከDebug Mode ነፃ ነው፤ Debug Modeን መቀየር ይህን አያሳይም። |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | OIDC ሲነቃ፣ ተጠቃሚዎች በOIDC Single Sign-On ብቻ ማንነታቸውን ማረጋገጥ እንዲችሉ በይለፍ ቃል መግባትን ያሰናክሉ። ሲሰናከል (ነባሪ)፣ በይለፍ ቃል መግባትም ሆነ OIDC ይገኛሉ።                                                                                      |

### አውታረ መረብ (22)

| ቁልፍ                                             | አይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------------- | ------- | ------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓         | የTLS fingerprint ስውር ሁነታን አንቃ።                                                                                                                                                                                                                                                                                                                                                                        |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |           | የ/v1/audio/* መስመሮች localhost ውጭ የሚስተናገዱ OpenAI-ተኳሃኝ provider nodesን እንዲጠቀሙ ፍቀድ። በነባሪ ጠፍቷል — audioን ወደ remote host ማስተላለፍ የegress ማንነትን ይቀይራል፣ ስለዚህ ይህ ግልጽ የoperator ውሳኔ መሆን አለበት። Loopback nodes ሁልጊዜ ይፈቀዳሉ እና ተጽዕኖ አይደርስባቸውም።                                                                                                                                                                        |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |           | POST /v1/rerank (እና የmemory engine loopback rerank ደረጃ) localhost ውጭ የሚስተናገዱ OpenAI-ተኳሃኝ provider nodesን እንዲጠቀም ፍቀድ። በነባሪ ጠፍቷል — ወደ remote host ማስተላለፍ የegress ማንነትን ይቀይራል፣ ስለዚህ ይህ ግልጽ የoperator ውሳኔ መሆን አለበት። Loopback nodes ሁልጊዜ ይፈቀዳሉ፤ remote nodes በተጨማሪ የprovider outbound URL policyን ማለፍ አለባቸው።                                                                                               |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |           | ለአንድ connection proxy ሳይመደብለት ሲቀር፣ ከregistry ውስጥ የመጀመሪያውን የሚሰራ proxy በራስ-ሰር ምረጥ። በነባሪ ጠፍቷል (አለበለዚያ ማንኛውም የregistry proxy ዓለም አቀፍ fallback ይሆናል — #3332)።                                                                                                                                                                                                                                              |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |           | የproxy reachability ቅድመ-ማረጋገጫዎች ሲከሽፉ OAuth እና provider validation flows የተወሰነላቸውን proxy አልፈው በቀጥታ እንዲገናኙ ፍቀድ። ይህ የegress IPን ሊቀይር ስለሚችል በነባሪ ጠፍቷል።                                                                                                                                                                                                                                                    |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |           | ለmulti-account rotation executor የnetwork exception (timeout፣ connection refused/reset) ሲከሰት፣ የከሸፈው account የራሱ dedicated proxy ከሌለው፣ እያንዳንዱን እንደገና ከመሞከር ይልቅ አጭር cooldown ተግብር እና በቀሪው request ውስጥ proxy የሌላቸውን ሌሎች accounts ዝለል። በነባሪ በርቷል (ደህንነቱ የተጠበቀ፦ የegress IP ለውጥ የለም፣ በshared-egress accounts ላይ የlatency/cooldown አደጋን ብቻ ይቀንሳል)። በመጀመሪያው proxy የሌለው throw ላይ ፈጣን propagationን ለመመለስ አሰናክል። |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |           | የOpencode rotation የትኛው account እንዳገለገለ ወይም እንደተዘለለ ይመዘግባል (የተሸፈኑ ids ብቻ፣ ሙሉ account ids ፈጽሞ አይመዘገቡም)፣ እንዲሁም operatorው የተዘለሉ accountsን ጥቅም ላይ ካልዋሉት ለይቶ ማወቅ እንዲችል የproxy log entriesን ከrequestያቸው ጋር ያገናኛል። በነባሪ ጠፍቷል።                                                                                                                                                                                |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `true`  |           | Proxy pools እና የopencode per-account rotation አሁን የከሸፈ proxyን (ውድቅ የተደረገ TCP probe፣ ወይም በእሱ በኩል የተቀበለ 429) በእያንዳንዱ መደጋገም በእጥፍ እየጨመረ እስከ ከፍተኛ ገደብ ድረስ ለሚቆይ የper-process ጊዜ ዳግም ማገልገላቸውን ያቆማሉ። ምንም የproxy status አይጻፍም፤ ሁሉም candidates ወደ ጎን ቢቀመጡ ምርጫው አይለወጥም። በነባሪ በርቷል፤ `false` መደበኛ selectionን ይመልሳል።                                                                                                |
| `PROXY_POOL_SHARED_EGRESS_ORDER`                | boolean | `false` |           | quotaቸው በegress address ለሚመደብ providers፣ በቅርቡ ውድቅ ከተደረገ member ጋር ተመሳሳይ የታየ egress address የሚጋራ pool memberን ከጤናማ members በታች ደርድር። ይህ የቅደም ተከተል ብቻ ነው፣ ፈጽሞ አይገለልም። የሚያነበውን refusal signal የሚፈጥረው `PROXY_SKIP_RECENTLY_FAILED` ያስፈልገዋል። በነባሪ ጠፍቷል።                                                                                                                                                    |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |           | በዳሽቦርዱ ውስጥ በፕሮክሲ ፑል ስር፣ ባለፉት 24 ሰዓታት ስንት የታዩ የወጪ IPዎች አባላቱን እንዳገለገሉ እና ስንት ግንኙነቶች እንደተጠቀሙባቸው አሳይ። ለንባብ ብቻ የሚያገለግል፣ ከፕሮክሲ ሎግ የሚሰላ እና ለማዘዋወር ፈጽሞ የማይጠቀሙበት ነው። በነባሪነት ጠፍቷል።                                                                                                                                                                                                                              |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |           | ለOpenCode አስፈጻሚ፣ የሚለቀቅ Responses ምላሽ የመጀመሪያውን የይዘት ባይት ይከታተሉ (መስኮት፦ `RESPONSES_FIRST_BYTE_TIMEOUT_MS`፣ ነባሪ `15000`)። ከመስኮቱ ጊዜ በኋላም ዝም ብሎ የሚቆይ 2xx Responses ዥረት እንደተቋረጠ ይቆጠራል፦ መለያው ለጊዜው እንዲያርፍ ይደረጋል እና ጥያቄው አንድ ጊዜ ወደሚቀጥለው መለያ ይዘዋወራል፤ ሁለተኛ መቋረጥ ወዲያውኑ ያሳንፈዋል። በነባሪነት ጠፍቷል፦ የተቋረጡ ዥረቶች የዥረት ዝግጁነት ጊዜ ገደብ እስኪያልቅ የአሁኑን የመጠበቅ ባህሪ ይቀጥላሉ።                                                              |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |           | OpenCode አስፈጻሚ፦ የ`user_blocked` እምቢታን በያዘ 403/451 ላይ (ከጂኦግራፊ ጋር ያልተያያዘ፣ የCloudflare የጣት አሻራ ውድቅ ማድረግ ያልሆነ)፣ ውድቅ የተደረገው መለያ ለጊዜው እንዲያርፍ ያድርጉ እና በእያንዳንዱ ጥያቄ ከአንድ ጊዜ ያልበለጠ ወደሚቀጥለው መለያ ያዘዋውሩ፤ ሁለተኛ እምቢታ የስኬት ምልክት ሳይደረግበት እንዳለ ይመለሳል። በነባሪነት ጠፍቷል፦ የላይኛውን አቅራቢ የተጠቃሚ እገዳ በመዞር ማለፍ እንደማምለጥ ሊታይ እና ምልክቱን በመላው የመለያ ስብስብ ሊያሰራጭ ይችላል።                                                                       |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |           | OpenCode ማዘዋወር፦ ሁለት ተከታታይ ጊዜያዊ የላይኛው አቅራቢ ውድቀቶች (5xx ወይም ባዶ 400) ከተከሰቱ በኋላ፣ ወደሚቀጥለው መለያ ከመሄድ በፊት ለአፍታ ያቁሙ — ከ1.5s ጀምሮ በእያንዳንዱ ተጨማሪ ውድቀት እጥፍ እየሆነ፣ በእያንዳንዱ ማቆሚያ እስከ 6s እና በእያንዳንዱ ጥያቄ እስከ 10s የተገደበ፣ ደንበኛው ግንኙነቱን ሲያቋርጥ የሚዘለል፤ ከመጠበቅ በፊት ያልተሳካው ይዘት ይለቀቃል። በነባሪነት ጠፍቷል፦ የመጠባበቂያ ሽግግሩ ወዲያውኑ ይከናወናል።                                                                                                     |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |           | OpenCode ማዘዋወር፦ ተደጋጋሚ ጊዜያዊ 429ዎች (ወይም አዲስ የፑል ጫና ምልክት) ከተከሰቱ በኋላ ጥያቄውን ከልብ ምት ጋር በቆይታ ያስቀምጡ፣ ከዚያም መላውን የመለያ ስብስብ በአንድ ጊዜ ከማሰራጨት ይልቅ እስከ 3 ተከታታይ መለያዎች ያሉትን አንድ የተገደበ ዙር እንደገና ያጫውቱ። በነባሪነት ጠፍቷል፦ እያንዳንዱ 429 ልክ እንደበፊቱ ወደሚቀጥለው መለያ ያዘዋውራል።                                                                                                                                                             |
| `STREAM_READINESS_STALL_RETRY`                  | boolean | `false` |           | ዥረታዊ ውይይት፦ የመጀመሪያው የላይኛው አቅራቢ ይዘት ጥቅም ላይ የሚውል ክስተት ከማምረቱ በፊት ሲቋረጥ፣ በተመሳሳይ የማዘዋወሪያ መንገድ፣ ተመሳሳይ የዝግጁነት ጊዜ በጀት እና ያለመለያ ቅጣት አንድ የተገደበ ሁለተኛ ሙከራ ያድርጉ። በነባሪነት ጠፍቷል፦ የተቋረጠ የመጀመሪያ ይዘት ያለዳግም ሙከራ ጥያቄውን ያሳንፋል።                                                                                                                                                                                                |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |           | በተተረጎሙ ዥረታዊ ዙሮች፣ የላይኛው አቅራቢ ዙር ጥቅም ላይ የሚውል ይዘት ካልያዘ (የማመዛዘን-ብቻ ማጠናቀቂያ ወይም ምንም ጠቃሚ ቁርጥራጮች ከሌሉ)፣ ለደንበኛው ምንም ነገር ከመቅረቡ በፊት በመደበኛው የማረጋገጫ መንገድ የተገደቡ ዳግም ሙከራዎችን (እስከ `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`) ያድርጉ። በነባሪነት ጠፍቷል፦ ባዶ ዙሮች የአሁኑን ባህሪ (ባዶ 200 ወይም ባዶ-ይዘት 502) ይቀጥላሉ።                                                                                                                           |
| `OPENCODE_POOL_RESELECT`                        | boolean | `false` |           | OpenCode ማዘዋወር፦ በአካባቢያዊ የፑል አውድ ስር ፕሮክሲ በሌለው መለያ ላይ፣ ከወጪ መደብ-ተኮር አቅራቢ 429 ከተመለሰ በኋላ፣ በተመሳሳይ የወጪ አድራሻ ዳግም ከመሞከር ይልቅ ለሚቀጥለው ሙከራ ሌላ አባል እንዲመርጥ የግንኙነት ፑሉን ይጠይቁ። ቅደም ተከተል ያስቀምጣል፣ ፈጽሞ አያገልም፦ የተሟጠጠ ፑል የአሁኑን ባህሪ ይቀጥላል። በነባሪነት ጠፍቷል፦ እያንዳንዱ 429 ልክ እንደበፊቱ ወደሚቀጥለው መለያ ያዘዋውራል።                                                                                                                              |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |           | OpenCode ማዘዋወር፦ እንደ እውነተኛ የተመን ገደብ በተመደበ የመጀመሪያው 429 ላይ የመለያ ሙከራዎችን ያቁሙ (ሊተነተን የሚችል `Retry-After`፣ ወይም የተመን/የአጠቃቀም ገደብን የሚጠቅስ ይዘት) እና ያንን የላይኛው አቅራቢ 429 ሳይቀየር ይመልሱ። ያልተመደቡ 429ዎች ማዘዋወራቸውን ይቀጥላሉ። በነባሪነት ጠፍቷል፦ ነጻው ደረጃ በእያንዳንዱ የወጪ IP የተገደበ ነው (#9611)፣ ስለዚህ እያንዳንዱ 429 ያዘዋውራል እና የተሟጠጠ ሙከራ የመጨረሻውን የላይኛው አቅራቢ 429 ይመልሳል።                                                                             |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓         | ለMITM ፕሮክሲ የTLS ሰርተፍኬት ማረጋገጫን ያሰናክሉ። **አደገኛ።**                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |           | ወደ የግል/ውስጣዊ አውታረ መረቦች የሚያመለክቱ የአቅራቢ URLዎችን ይፍቀዱ።                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |           | በአካባቢያዊ/የግል አድራሻዎች (127.0.0.1, localhost, LAN) ላይ አቅራቢዎችን ማከል/ማረጋገጥን ፍቀድ። በነባሪነት የነቃ ነው (አካባቢያዊ-ቅድሚያ)፤ የወል አድራሻዎችን ብቻ በጥብቅ ለመፍቀድ ያሰናክሉት። የደመና ሜታዳታ እንደታገደ ይቆያል።                                                                                                                                                                                                                                       |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓         | ከClaude Code ጋር ተኳሃኝ የሆነውን የአቅራቢ ሁነታ አንቃ።                                                                                                                                                                                                                                                                                                                                                             |

### ፖሊሲዎች (5)

| ቁልፍ                             | ዓይነት    | ነባሪ        | መግለጫ                                                                                                                                                     |
| ------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | የመሣሪያ አጠቃቀም ፖሊሲ ማስፈጸሚያ ሁነታ። እሴቶች፦ `disabled`፣ `warn`፣ `block`።                                                                                           |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | በአጠቃቀም ስርዓተ-ጥለቶች ላይ ተመስርቶ የጥያቄ መጠን ገደብን በራስ-ሰር አንቃ።                                                                                                      |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | ለቀጥታ ነጠላ-ሞዴል ጥያቄዎች የOmniRoute አካባቢያዊ የአውድ-መስኮት / ከፍተኛ-የግቤት-ቶከን ማረጋገጫን ዝለል። የላይኛው ዥረት ገደቦች አሁንም ተፈጻሚ ይሆናሉ።                                                |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | ዒላማው ሞዴል አስፈላጊ ችሎታዎች (ምስል እይታ፣ መሣሪያዎች፣ የተዋቀረ ውፅዓት፣ የአውድ መስኮት) ከሌሉት፣ ከመላክ በፊት ጥያቄዎችን ውድቅ አድርግ። የኮምቦ-ንብርብር ተኳኋኝነት ማጣሪያን የሚያልፉ ቀጥተኛ የነጠላ-አቅራቢ ጥያቄዎችን ይጠብቃል። |
| `RADAR_ENABLED`                 | boolean | `false`    | የOmniRoute Radar ሞጁልን (የካታሎግ ምግብ ማያ ገጾችን እና ማመሳሰልን) አንቃ። በነባሪነት የጠፋ ነው፤ ማንቃት የተጠቃሚ በይነገጹን ብቻ ይከፍታል — የውሂብ ማመሳሰል የተለየ በፈቃደኝነት የሚነቃ ሆኖ ይቆያል።               |

### የአሂድ ጊዜ (33)

| ቁልፍ                                         | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------- | ------- | ------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |           | የጥምር ማዘዋወር ሞዴሎችን ሲቀይር የውይይት ማጠቃለያዎችን ያመንጩ እና ያስገቡ። የሞዴል ቅያሬዎችን በተናጥል ለማስተናገድ እና ለሁሉም ነባርና ወደፊት ለሚፈጠሩ ጥምሮች የጀርባ ርክክብ ጥያቄዎችን ለመከላከል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                          |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |           | ወደ ደንበኞች ከመተላለፋቸው በፊት ከResponses API ቀጥታ ማስተላለፊያ ዥረቶች ውስጣዊ የማብራሪያ-ደረጃ የውጤት ንጥሎችን ያስወግዱ። ከላይኛው ምንጭ የሚመጣውን ጥሬ ማብራሪያ ለመቀበል ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `false` |           | በMCP መሣሪያ መዳረሻ ላይ የወሰን ገደቦችን ያስፈጽሙ።                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |           | የቶከን አጠቃቀምን ለመቀነስ የMCP መሣሪያ መግለጫዎችን ይጨምቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |           | በሩጫ ጊዜ የጀርባ ተግባር ሂደትን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓         | ሁሉንም የጀርባ አገልግሎቶች (የኮታ ማደስ፣ ማመሳሰል፣ ወዘተ) ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |           | የፕሮጀክት ደረጃ RTK ማጣሪያዎችን ያለ ማረጋገጫ እመን።                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓         | ወደ ውስጥ ሲገባ የቅጽበታዊ ዳሽቦርድ WebSocket አገልጋይን አስጀምር (በነባሪ ወደብ 20132)።                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |           | Codex የResponses-over-WebSocket ማጓጓዣን እንዲጠቀም ፍቀድ። ሲጠፋ Codex ወደ HTTP Responses ይመለሳል።                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |           | Codex የአካባቢውን app-server WebSocket JSON-RPC ማጓጓዣ (`codexTransport=app-server`) እንዲጠቀም ፍቀድ። ሲጠፋ፣ app-serverን እንዲጠቀሙ የተመረጡ ግንኙነቶች ወደ ሌሎች የCodex ማጓጓዣዎች ይመለሳሉ።                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |           | በጀታቸው ያለቀባቸውን ጥያቄዎች ወደ ድንገተኛው ነፃ አማራጭ አቅራቢ/ሞዴል ላክ። (ከታች [የድንገተኛ ጊዜ የበጀት አማራጭ](#emergency-budget-fallback)ን ይመልከቱ።)                                                                                                                                                                                                                                                                                                                                                                 |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |           | ማንኛውም የምላሽ ባይቶች ወደ ደንበኛው ከመድረሳቸው በፊት፣ ለተቆረጡ የላይኛው ምንጭ SSE ዥረቶች ግልጽ የሆነ ቀደምት ዳግም ሙከራን አንቃ።                                                                                                                                                                                                                                                                                                                                                                                          |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |           | ባይቶች ወደ ደንበኛው ከደረሱ በኋላ የዥረት መልሶ ማግኘት ድጋሚ ጥያቄ እንዲያቀርብ እና ምላሹን እንዲያገናኝ ፍቀድ።                                                                                                                                                                                                                                                                                                                                                                                                          |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |           | በዥረት መካከል የሚደረግ ቀጣይነትን ለመሣሪያ ጥሪ ደህንነቱ የተጠበቀ አድርግ፦ የመሣሪያ ጥሪ አንዴ ከተላከ (በሂደት ላይ ያለ ወይም ቀድሞውኑ በfinish_reason tool_calls የተጠናቀቀ) የተቋረጠ ዥረትን በፍጹም አትቀጥል፣ እንዲሁም በጀቱን በሙሉ ከማጥፋት ይልቅ ከአንድ ባዶ ቀጣይነት በኋላ ዝጋ። ጠፍቶ ሲሆን፦ የልቀት ባህሪ።                                                                                                                                                                                                                                                               |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |           | የSSE ዥረት ምንም ጠቃሚ frame ሳያወጣ ሲዘጋ እና የተገደበው የተመሳሳይ-ግንኙነት ዳግም ሙከራ ሲያልቅ፣ አንድ ጊዜ ወደ sibling ግንኙነት fail over ያድርጉ፤ ጥቅም ላይ የሚውል sibling ከሌለ የመጀመሪያው `STREAM_EARLY_EOF` 502 ይመለሳል። በነባሪ ጠፍቷል፦ early-EOF ከተመሳሳይ-ግንኙነት ዳግም ሙከራ በኋላ የመጨረሻ ሁኔታ ሆኖ ይቆያል።                                                                                                                                                                                                                                        |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |           | በ`/v1/models` ምላሾች ውስጥ ለእይታ ምቹ የሆኑ የስም መስኮችን ያካትቱ። የሞዴል IDዎችን ብቻ ለሚጠብቁ clients ያሰናክሉት።                                                                                                                                                                                                                                                                                                                                                                                             |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |           | በ/v1/models ውስጥ የሞዴል IDዎች እንዴት prefix እንደሚደረጉ ይቆጣጠራል። 'dual' (ነባሪ) ለኋላ-ተኳኋኝነት alias እና canonical provider-id prefixዎችን ሁለቱንም ያወጣል። 'alias' አጭሩን alias prefix ብቻ ያወጣል (ለምሳሌ ds-web/model፣ deepseek-web/model ሳይሆን)። 'canonical' ሙሉውን provider-id prefix ብቻ ያወጣል። እሴቶች፦ `dual`፣ `alias`፣ `canonical`።                                                                                                                                                                                |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |           | ለሞዴል የብልህነት ደረጃዎች ወቅታዊ የArena AI leaderboard ELO ማመሳሰልን ያንቁ።                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |           | የClaude Code gateway ሞዴል ግኝት Claude ያልሆኑ ሞዴሎችን እንዲዘረዝር፣ የ`claude/<provider>/<model>` mirror IDዎችን በ`/v1/models` ላይ ያስተዋውቁ። የሶስት-ደረጃ gate ዓለም አቀፍ ደረጃ (env ከdashboard override ይቀድማል)። [የClaude Code ውቅር](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)ን ይመልከቱ።                                                                                                                                                          |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |           | ለno-think/<provider>/<model> gateway aliases ዋና መቀየሪያ። ሲበራ (ነባሪ)፦ /v1/models ለእያንዳንዱ ብቁ thinking-capable Claude ሞዴል no-thinking variant ያስተዋውቃል፣ እና በጥያቄ ላይ የተላከ no-think/ ID ምክንያታዊ አስተሳሰብ ታግዶ ወደ እውነተኛው ሞዴል ይመለሳል። ሲጠፋ፦ ምንም variants አይተዋወቁም፣ እና no-think/ ID እንደማንኛውም ሌላ ያልታወቀ የሞዴል ID ይቆጠራል። ይህ በርቶ እያለ የየሞዴሉ ModelSpec.noThinkingAlias opt-in/opt-out አሁንም ተፈጻሚ ነው።                                                                                                           |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |           | በ/v1/models catalog ውስጥ የthinking level variants (ለምሳሌ -low፣ -medium፣ -high) መፈጠርን ያሰናክሉ።                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓         | ለprovider dispatch በtenant የሚለያዩ ራሳቸውን የሚያስተካክሉ virtual admission lanes ያንቁ (#9654)፦ የአንድ tenant ድንገተኛ ጭማሪ ከእንግዲህ ሌላውን 503 እንዲመልስ አያደርግም። የOMNIROUTE_CHAT_VIRTUAL_LANES env var ከዚህ dashboard override ይቀድማል፤ ለውጦች server ዳግም ሲጀመር ተግባራዊ ይሆናሉ።                                                                                                                                                                                                                                     |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |           | ቀኖናዊ ባለቤታቸው ንቁ ማረጋገጫ መረጃ ለሌለው፣ ነገር ግን ንቁ ማረጋገጫ መረጃ ያለው ቀጥታ-አሳላፊ gateway ወደ እነሱ ለሚመራቸው ሞዴሎች፣ የ<gateway-alias>/<model> የmirror መታወቂያዎችን በ/v1/models ላይ ያስተዋውቁ። ማስጠንቀቂያ፦ በዓለም አቀፍ ደረጃ ሲነቃ ለሁሉም clients የcatalog ግቤቶችን ይጨምራል።                                                                                                                                                                                                                                                          |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |           | ከNew-API / One-API / Sub2API aggregator ጋር ተኳሃኝ ለሆኑ nodes የሂሳብ ቀሪ ማወቅን ያንቁ። ሲነቃ፣ የaggregator flag የተቀናበረላቸው ተኳሃኝ nodes ቀሪ ሂሳባቸውን በdashboard እና በquota-preflight routing ውስጥ ሪፖርት ያደርጋሉ።                                                                                                                                                                                                                                                                                            |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |           | ሞዴሉ በclient ጥቅም ላይ ሊውል የሚችል ምላሽ እስኪመልስ ድረስ የማይለቀቁ በserver የሚተዳደሩ tool callsን ይቀጥሉ።                                                                                                                                                                                                                                                                                                                                                                                                 |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |           | የፍለጋ ስታቲስቲክስ እና የቅርብ ጊዜ ፍለጋዎች አሁንም ንቁ connection ያላቸውን providers ብቻ ይቆጥራሉ (እንደ duckduckgo-free ያሉ keyless providers ሁልጊዜ ይቆጠራሉ)። ሲጠፋ፣ በprovider id የተያዘውን እያንዳንዱን የፍለጋ ረድፍ ያቆያል።                                                                                                                                                                                                                                                                                                   |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |           | የdashboard provider ገጾች፦ የFree ባጁን providerው በሚያከብራቸው ምልክቶች ላይ ብቻ ያሳዩ — በሰነድ የተረጋገጠ free tier በሌላቸው የተመዘገቡ providers ላይ የdisplay-name ግምትን፣ boolean ያልሆኑ free fieldsን እና የ:free ቅጥያዎችን ያስወግዳል። ሲጠፋ፣ ታሪካዊውን የባጅ ደንብ ያቆያል።                                                                                                                                                                                                                                                           |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |           | በተጠቃለሉ የ429/503 unavailable ምላሾች ላይ፣ ተጨባጭ የወደፊት ዳግም መሞከሪያ ጊዜ በማይታወቅበት ጊዜ `Retry-After`ን ይተዉ (ሰው ሠራሽ 1s ከመጠቀም ይልቅ)፣ `error.retry_after_provenance` (`signal` \| `none`)ን ያክሉ፣ እና የcombo drain paths ከJSON እና ከplain-text upstream bodies ውስጥ በጽሑፍ የቀረቡ የዳግም መሞከሪያ ፍንጮችን እንዲያነቡ ይፍቀዱ። ይህ field በ`unavailableResponse()` በሚገነቡ ምላሾች ላይ ብቻ ይታያል፤ ሌሎች የ429/503 bodies አይቀየሩም።                                                                                                           |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |           | fallback-only-on-quota-exhaustion ተብሎ ምልክት የተደረገበት `priority` combo target፣ quota አለመሆኑ በእርግጠኝነት ሊረጋገጥ በሚችል ምክንያት (የprovider circuit breaker ክፍት መሆን፣ predictive latency skip) comboውን ሲያቆም፣ quota በማለቁ የተፈጠረ ከሚመስለው 503 ይልቅ 502 ይመልሱ። በlockout፣ cooldown፣ unavailable፣ exhaustion እና concurrency-cap ምክንያት የሚፈጠሩ ማቆሚያዎች 503ን እንደያዙ ይቆያሉ።                                                                                                                                          |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |           | ተራ Mistral 401 (`{"detail":"Unauthorized"}`፣ ግልጽ የauth ምልክት የሌለው) ለተሰረዘ key እና quotaው ላለቀ key ተመሳሳይ ነው። ሲበራ፣ connectionኑን `expired` ብሎ ከማቆም ይልቅ cooldown ውስጥ ያስገባዋል፤ ይህም በconnection በሰዓት እስከ 3 ጊዜ ብቻ ነው። ቀጣዩ ሲከሰት ያቆመዋል፣ ስለዚህ የተሰረዘ key በመጨረሻ ይቆማል። በነባሪ ጠፍቷል፦ እያንዳንዱ ተራ Mistral 401 እንደቀድሞው connectionኑን ያቆማል።                                                                                                                                                                   |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `true`  |           | ከቀዘቀዘው የማይለወጥ መነሻ ይልቅ፣ የOAuth bearer tokenን በመጠቀም ከhttps://api.x.ai/v1/models ለxai-oauth ግንኙነቶች የቀጥታውን የxAI ሞዴል ካታሎግ ያምጣ። በነባሪነት ነቅቷል። የማይለወጠውን መነሻ ማቅረብዎን ለመቀጠል ጥቆማውን false ያድርጉ። የHTTP ውድቀቶች በግኝት መስመሩ ውስጥ ወደ መነሻው ይመለሳሉ፤ የጥቆማው getter ራሱ HTTP ጥያቄ አያደርግም።                                                                                                                                                                                                                       |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |           | ራስ-ሰር የማጽዳት ዙሩ ከ`OMNIROUTE_BATCH_RETENTION_DAYS` በላይ የቆዩ የመጨረሻ ሁኔታ ላይ ያሉ (የተጠናቀቁ/ያልተሳኩ/የተሰረዙ/ጊዜያቸው ያለፈ) የBatch API ሥራዎችን፣ ከየመስመራቸው checkpoints ጋር እንዲሰርዝ ይፍቀዱ፤ እንዲሁም የራሳቸው `expires_at` ያለፈባቸው የተሰቀሉ ፋይሎችን BLOB ይዘት ያጽዱ። በነባሪነት ጠፍቷል፦ አስተዳዳሪ ለማንቃት እስኪመርጥ ድረስ እያንዳንዱ ነባር ጭነት ይህን ውሂብ ልክ እንደበፊቱ ያቆየዋል። በአስተዳዳሪው የሚጀመረው `DELETE /api/v1/batches/delete-completed` መስመር በሁለቱም ሁኔታ አይነካም — እሱ የተለየ፣ ቅድመ ሁኔታ የሌለው የወል API ውል ነው።                                                        |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |           | የመረጠው ጥያቄ በstreaming የሕይወት ዑደት ውስጥ ሳለ የተመረጠውን Antigravity መለያ ይያዙ፤ ይህም በተመሳሳይ ጊዜ የሚካሄድ ዳግም ሙከራ ወይም የcredential ርክክብ በሂደት ላይ ላለ stream አስቀድሞ የተመደበ መለያን እንደገና እንዳይመርጥ ያደርጋል። የመያዣው ወሰን (ግንኙነት፣ ሊጠራ የሚችል upstream ሞዴል) ነው፤ ስለዚህ አንድ መለያ አሁንም ሁለት የተለያዩ ሞዴሎችን በአንድ ጊዜ ማገልገል ይችላል። ለዚያ ሞዴል ብቁ የሆኑ መለያዎች በሙሉ አስቀድመው በመያዣ ላይ ሲሆኑ፣ ጥያቄው በተጨናነቀ መለያ ላይ ከመደራረብ ይልቅ የተወሰነ `Retry-After` ያለው የተዋቀረ 503 `antigravity_pool_busy` ይመልሳል። በነባሪነት ጠፍቷል፦ የመለያ ምርጫው ልክ እንደበፊቱ ይቆያል፣ ምንም መያዣም አይደረግም። |

### CLI (5)

| ቁልፍ                                   | ዓይነት    | ነባሪ     | ዳግም ማስጀመር | መግለጫ                                                                                                                                                             |
| ------------------------------------- | ------- | ------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓         | ለሁሉም የCLI ደንበኞች የተኳኋኝነት ሁነታን ያንቁ።                                                                                                                                |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |           | የሞዴል alias ተኳኋኝነት ንብርብርን ያንቁ።                                                                                                                                    |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |           | ራስ-ሰር የዋጋ ውሂብ ማመሳሰልን ያንቁ (`PRICING_SYNC_ENABLED` የአካባቢ ተለዋዋጭንም ይፈልጋል)።                                                                                           |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |           | ከአቅራቢ ሞዴል ማመሳሰል በኋላ፣ ከቀጥታው ካታሎግ የ~/.codex/*.config.toml መገለጫ ፋይሎችን በራስ-ሰር (እንደገና) ይጻፉ። ንቁውን/ነባሪውን የCodex ውቅር ፈጽሞ አይለውጥም። በነባሪነት ጠፍቷል።                            |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |           | ከአቅራቢ ሞዴል ማመሳሰል በኋላ፣ ከቀጥታው ካታሎግ የ~/.claude/profiles/<name>/settings.json Claude Code መገለጫዎችን በራስ-ሰር (እንደገና) ይጻፉ። ንቁውን/ነባሪውን የClaude ውቅር ፈጽሞ አይለውጥም። በነባሪነት ጠፍቷል። |

### ጤና (5)

| ቁልፍ                                       | ዓይነት    | ነባሪ     | መግለጫ                                                                                                                                                                                                                   |
| ----------------------------------------- | ------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | የአካባቢያዊ ኢንስታንስ ጤና ምርመራ መጨረሻ ነጥብን ያሰናክላል።                                                                                                                                                                               |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | የቶከን ማረጋገጫ ጤና ምርመራን ያሰናክላል።                                                                                                                                                                                            |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | በክህሎቶች sandbox አካባቢ ውስጥ የአውታረ መረብ መዳረሻን ያነቃል።                                                                                                                                                                          |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | በproxy ጤና ቅኝት ውስጥ፣ ዒላማው ያልተቀበለው መመርመሪያ (401/403/429) የproxyውን ተከታታይ ውድቀት ብዛት ዳግም ያስጀምራል። በነባሪነት ጠፍቷል፦ ያለመቀበል ገለልተኛ ሆኖ ይቆያል (#10654)። 5xx በሁለቱም ሁኔታ የማያረጋግጥ ሆኖ ይቆያል፤ ያለመቀበል proxyን በፍጹም አያስወግድም፣ አያሰናክልም ወይም ዳግም አያነቃም። |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | የመነሻ DB ታማኝነት/ጤና ምርመራው እስኪጠናቀቅ ድረስ መነሳትን ከማገድ ይልቅ፣ አገልጋዩ ጥያቄዎችን መቀበል ከጀመረ በኋላ (በ`setImmediate` በኩል) እንዲካሄድ ያደርጋል (#13717)። በነባሪነት ጠፍቷል፦ መነሳት ከዚህ PR በፊት እንደነበረው በትክክል ይታገዳል።                                           |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` እና የቆየው ተለዋጭ ስሙ
> `INJECTION_GUARD_BLOCK_THRESHOLD` የ`INJECTION_GUARD_MODE`ን `block` ሁነታ
> ያስተካክላሉ፣ ነገር ግን እነሱ በ
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> የሚነበቡ ተራ የአካባቢ ተለዋዋጮች እንጂ የባህሪ ባንዲራዎች አይደሉም፦ የDB መሻርም ሆነ የdashboard ማብሪያ የላቸውም።
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)ን ይመልከቱ።

> [!NOTE]
> የ`Restart` ዓምድ `requiresRestart: true` ያላቸውን ባንዲራዎች ይጠቁማል — እሴቱ
> ወዲያውኑ ይቀመጣል፣ ነገር ግን ሂደቱ ዳግም ከተጫነ በኋላ ብቻ ተግባራዊ ይሆናል። Enum
> ባንዲራዎች ከተፈቀደላቸው ስብስብ ውጭ የሆነን ማንኛውንም እሴት ውድቅ ያደርጋሉ (በአገልጋይ በኩል
> በ`setFeatureFlagOverride()` እና በREST `PUT` ተቆጣጣሪው ውስጥ ይረጋገጣል)።

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
