# Feature Flags (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> Mgbanwe runtime ndị na-agbanwe omume OmniRoute **na-enweghị redeploy**.
> A kọwapụtara flag ọ bụla edepụtara ebe a na
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> — ebe naanị ya bụ isi iyi nke eziokwu. Dashboard na REST API na-agụ ha abụọ site na
> faịlụ ahụ, ya mere a na-emepụta tebụl dị n'okpuru ka ọ dakọtara na ya 1:1.

---

## Ihe Feature Flags Bụ

Feature flag bụ toggle nwere aha (boolean ma ọ bụ enum) nke enwere ike ịgbanwe uru ya n'oge
runtime ma chekwaa ya na database, na-enweghị mkpa ịme process redeploy. A na-akọwa
flag ọ bụla site na `FeatureFlagDefinition` nwere `key`, `label`,
`description`, `category`, `defaultValue`, `type`, na ntụnye `requiresRestart`.

### Usoro Mkpebi

[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) na-ekpebi
**uru dị irè** nke flag site n'usoro mkpa a (nke kacha elu na-emeri):

1. **DB override** — uru echekwara na tebụl `key_value` n'okpuru namespace
   `feature_flags` (nke e debere site na dashboard ma ọ bụ REST API).
2. **Environment variable** — `process.env[<KEY>]`, ma ọ bụrụ na e debere ya ma ọ bụghị oghere.
3. **Definition default** — `defaultValue` sitere na `featureFlagDefinitions.ts`.

A na-ewere boolean flag dị ka nke **agbanyere** mgbe uru ya dị irè bụ `"true"`,
`"1"`, ma ọ bụ `"yes"` (lee `isFeatureFlagEnabled()`).

> [!NOTE]
> Ọtụtụ flag nwekwara environment variable kwekọrọ ekwekọ nke nwere **otu aha ahụ**
> nke edepụtara na [`ENVIRONMENT.md`](./ENVIRONMENT.md). DB override nke flag
> na-ebute environment variable ahụ ụzọ. A na-echekwa flag nwere
> `requiresRestart: true` ozugbo, mana a na-agụgharị ya naanị mgbe process
> malitere — ịgbanwe ya na-egosi banner **"Malitegharịa Server"** na dashboard.

---

## Katalọgụ Flag

Flag 72 n'ime category 6. **Default** bụ definition default — uru a na-eji
mgbe DB override ma ọ bụ environment variable adịghị.

### Nchekwa (10)

| Key                                     | Ụdị     | Default  | Nkọwa                                                                                                                                                                                                                                                                         |
| --------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | Chọọ API key maka request niile na-abata.                                                                                                                                                                                                                                     |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | Gbanye nhicha input maka request niile.                                                                                                                                                                                                                                       |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | Ọnọdụ nchedo prompt injection. Uru ndị dị: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                                  |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | Zoo PII n'ime request (ọ naghị adabere na `INPUT_SANITIZER_MODE`).                                                                                                                                                                                                            |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | Hichaa PII na response ndị provider.                                                                                                                                                                                                                                          |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | Ọnọdụ maka nhicha PII na response. Uru ndị dị: `redact`, `warn`, `block`, `off`.                                                                                                                                                                                              |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | Gbochie request na-apụ apụ gaa na range IP nkeonwe/esịtidem.                                                                                                                                                                                                                  |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | Kwe ka ndị ọrụ dashboard enyochala njirimara ha kpughee API key echekwara kama ịhụ naanị uru ezoro akụkụ ya.                                                                                                                                                                  |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | Tinye prefix account na ahịrị log AUTH (dịka "Na-eji account <provider>: abc12345..."). A gbanyụrụ ya na ndabara ka e wee zoo njirimara account na log process ndị a na-ekekọrịta/nwere ọtụtụ tenant. Ọ naghị adabere na Debug Mode; ịgbanwe Debug Mode anaghị ekpughe nke a. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | Mgbe agbanyere OIDC, gbanyụọ nbanye site na password ka ndị ọrụ nwee ike igosipụta njirimara ha naanị site na OIDC Single Sign-On. Mgbe agbanyụrụ ya (ndabara), nbanye site na password na OIDC dịcha.                                                                        |

### Netwọkụ (15)

| Igodo                                           | Ụdị     | Ndabara | Malitegharịa | Nkọwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ----------------------------------------------- | ------- | ------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓            | Mee ka ọnọdụ nzuzo mkpịsịaka TLS rụọ ọrụ.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |              | Kwe ka ụzọ /v1/audio/* jiri ọnụ ndị na-eweta ọrụ dakọtara na OpenAI ndị a na-akwado n'èzí localhost. Agbanyụrụ ya na ndabara — iziga ọdịyo n'aka sava dịpụrụ adịpụ na-agbanwe njirimara ọpụpụ ma ọ ga-abụrịrị mkpebi doro anya nke onye njikwa. A na-ekwe ka ọnụ loopback rụọ ọrụ mgbe niile, nke a anaghịkwa emetụta ha.                                                                                                                                                                                                                    |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |              | Mgbe ekenyeghị proxy na njikọ, họrọ proxy mbụ na-arụ ọrụ na ndekọ ahụ na-akpaghị aka. Agbanyụrụ ya na ndabara (ma ọ bụghị ya, proxy ọ bụla dị na ndekọ ahụ ga-aghọ ụzọ ndabere zuru ụwa ọnụ — #3332).                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |              | Kwe ka usoro OAuth na nkwado onye na-eweta ọrụ gafere proxy a kpọgidere ma jikọọ ozugbo mgbe nyocha mbụ nke nnweta proxy dara. Agbanyụrụ ya na ndabara n'ihi na nke a nwere ike ịgbanwe IP ọpụpụ.                                                                                                                                                                                                                                                                                                                                            |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |              | Mgbe njehie netwọkụ mere (oge agwụla, a jụrụ njikọ/ebidogharịrị njikọ) n'ime onye mmezu ntụgharị akaụntụ ọtụtụ, ọ bụrụ na akaụntụ dara ada enweghị proxy nke ya, tinye obere oge nkwụsịtụ ma wụfee akaụntụ ndị ọzọ na-enweghị proxy ruo mgbe arịrịọ ahụ gwụsịrị kama ịnwale nke ọ bụla ọzọ. Agbanyere ya na ndabara (ọ dị nchebe: enweghị mgbanwe IP ọpụpụ, naanị na-ebelata ihe ize ndụ nke igbu oge/oge nkwụsịtụ n'akaụntụ ndị na-ekekọrịta ọpụpụ). Gbanyụọ ya iji weghachi mgbasa ozugbo na njehie mbụ sitere n'akaụntụ na-enweghị proxy. |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |              | Ọdọ proxy na ntụgharị opencode nke akaụntụ ọ bụla na-akwụsị inyeghachi proxy nke dara ada n'oge na-adịbeghị anya (nyocha TCP a jụrụ, ma ọ bụ 429 e nwetara site na ya) ruo oge nke usoro ọ bụla nke na-amụba okpukpu abụọ n'ọdịda ọ bụla ọzọ, ruo n'ókè kachasị. A naghị ede ọnọdụ proxy ọ bụla; mgbe ewepụrụ onye ndọrọndọrọ ọ bụla, nhọrọ ahụ anaghị agbanwe. Agbanyụrụ ya na ndabara.                                                                                                                                                     |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |              | Gosi, n'okpuru ọdọ proxy dị na dashboard, IP ọpụpụ ole a hụrụ ji ndị otu ya rụọ ọrụ n'ime awa 24 gara aga nakwa njikọ ole jiri ha. Ọ bụ naanị maka ọgụgụ, a na-agbakọ ya site na ndekọ proxy, a naghịkwa eji ya eme nhazi ụzọ. Agbanyụrụ ya na ndabara.                                                                                                                                                                                                                                                                                      |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |              | Maka onye mmezu OpenCode, leba anya na byte mbụ nke body dị na nzaghachi Responses a na-enuba (oghere oge: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, ndabara `15000`). A na-ewere iyi Responses 2xx nke na-anọ jụụ gafee oghere oge ahụ dị ka nke kwụsịrị: a na-etinye akaụntụ ahụ n'oge nkwụsịtụ, arịrịọ ahụ agakwa n'akaụntụ na-esote otu ugboro; nkwụsị nke abụọ na-eme ka ọ daa ozugbo. Agbanyụrụ ya na ndabara: iyi ndị kwụsịrị na-aga n'ihu ichere dị ka taa ruo mgbe oge nchere ịdị njikere nke iyi ahụ gwụsịrị.                             |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |              | Onye mmezu OpenCode: mgbe 403/451 nwere njụ `user_blocked` (ọ bụghị ọnọdụ mpaghara, ọ bụghịkwa njụ mkpịsịaka Cloudflare), tinye akaụntụ a jụrụ n'oge nkwụsịtụ ma tụgharịa gaa n'akaụntụ na-esote naanị otu ugboro kachasị n'arịrịọ ọ bụla; a na-eweghachi njụ nke abụọ otu o siri dị, na-enweghị akara ihe ịga nke ọma. Agbanyụrụ ya na ndabara: ịgafe mgbochi onye ọrụ nke sava elu nwere ike ịdị ka izere mgbochi ma gbasaa akara ahụ n'ofe ìgwè sava ahụ.                                                                                 |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |              | Ntugharị OpenCode: mgbe ọdịda upstream nwa oge mere ugboro abụọ n’usoro (5xx ma ọ bụ 400 efu), kwụsịtụ tupu akaụntụ na-esote — 1.5s nke na-amụba okpukpu abụọ maka ọdịda ọ bụla ọzọ, na njedebe 6s kwa nkwụsịtụ na 10s kwa arịrịọ; a na-awụpụ ya ma ọ bụrụ na njikọ klayentị akwụsị. A na-ahapụ body nke dara tupu ichere. Agbanyụrụ ya na ndabara: failover na-anọgide ozugbo.                                                                                                                                                              |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |              | Ntugharị OpenCode: kwụsị usoro akaụntụ ahụ na 429 mbụ e kewara dị ka ezigbo oke ọnụego (enwere ike ịtụgharị `Retry-After`, ma ọ bụ body nke kpọrọ oke ọnụego/ojiji aha) ma weghachite 429 upstream ahụ n’agbanweghị ya. 429 ndị a na-ekewaghị na-aga n’ihu na ntugharị. Agbanyụrụ ya na ndabara: a na-amachi ọkwa efu kwa IP ọpụpụ (#9611), ya mere 429 ọ bụla na-akpata ntugharị, usoro gwụchara na-eweghachikwa 429 upstream ikpeazụ.                                                                                                      |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓            | Gbanyụọ nkwado asambodo TLS maka proxy MITM. **Ihe ize ndụ.**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |              | Kwe ka URL ndị na-eweta ọrụ na-atụ aka na netwọkụ nzuzo/esịtidem.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |              | Kwe ka a gbakwunye/kwado ndị na-eweta ọrụ nọ na adreesị mpaghara/nzuzo (127.0.0.1, localhost, LAN). Agbanyere ya na ndabara (mpaghara-na-ebute ụzọ); gbanyụọ ya maka mgbochi siri ike nke na-anabata naanị nke ọha. A ka na-egbochi metadata igwe ojii.                                                                                                                                                                                                                                                                                      |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓            | Gbanye ọnọdụ onye na-eweta ọrụ dakọtara na Claude Code.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### Iwu (5)

| Igodo                           | Ụdị     | Ndabara    | Nkọwa                                                                                                                                                                                                                |
| ------------------------------- | ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | Ọnọdụ mmanye iwu ojiji-ngwaọrụ. Uru: `disabled`, `warn`, `block`.                                                                                                                                                    |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | Gbanye mmachi ọnụego na-akpaghị aka dabere n’usoro ojiji.                                                                                                                                                            |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | Mafere nyocha mpaghara OmniRoute maka windo context / token ntinye kachasị n’arịrịọ otu-model ozugbo. Oke upstream ka na-emetụta.                                                                                    |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | Jụ arịrịọ tupu izipụ ya mgbe model ezubere enweghị ike ndị achọrọ (ọhụụ, ngwaọrụ, mmepụta ahaziri, windo context). Ọ na-echebe arịrịọ otu onye na-eweta ọrụ ozugbo ndị na-agafe nzacha ndakọrịta nke oyi akwa combo. |
| `RADAR_ENABLED`                 | boolean | `false`    | Gbanye modul OmniRoute Radar (ihuenyo ndepụta katalog na mmekọrịta). Agbanyụrụ ya na ndabara; ịgbanye ya na-emepe naanị UI — mmekọrịta data ka bụ nhọrọ nnabata dị iche.                                             |

### Oge nrụọrụ (32)

| Igodo                                       | Ụdị     | Ndabara | Malitegharịa | Nkọwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------- | ------- | ------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |              | Mepụta ma tinye nchịkọta mkparịta ụka mgbe ntụgharị combo gbanwere model. Gbanyụọ ya ka a na-emeso mgbanwe model iche iche ma gbochie arịrịọ handoff ndabere maka combo niile dị ugbu a na nke ga-adị n’ọdịnihu.                                                                                                                                                                                                                                                                                                                                                                                  |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |              | Wepụ ihe mmepụta nke usoro nkọwa ime site na iyi passthrough nke Responses API tupu ebufee ha ndị ahịa. Gbanyụọ ya iji nata nkọwa ime upstream na-enweghị nhazi.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |              | Manye mmachi scope na nnweta ngwaọrụ MCP.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |              | Kpokọta nkọwa ngwaọrụ MCP iji belata ojiji token.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |              | Kwado nhazi ọrụ ndabere n'oge runtime.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓            | Gbanyụọ ọrụ ndabere niile (mmelite quota, mmekọrịta sync, wdg.).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |              | Tụkwasị nzacha RTK nke ọkwa project obi na-enweghị nkwado izi ezi.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓            | Malite sava WebSocket dashboard ozugbo mgbe a na-eme import (port 20132 na ndabara).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |              | Kwe ka Codex jiri nnyefe Responses-over-WebSocket. Mgbe agbanyụrụ ya, Codex ga-alaghachi n'iji HTTP Responses.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |              | Kwe ka Codex jiri nnyefe WebSocket JSON-RPC nke app-server mpaghara (codexTransport=app-server). Mgbe agbanyụrụ ya, njikọ ndị ahọpụtara iji app-server ga-alaghachi na nnyefe ndị ọzọ nke Codex.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |              | Ziga arịrịọ ndị mmefu ego ha gwụrụ gaa na provider/model ndabere mberede efu. (Lee [Ndabere Mmefu Ego Mberede](#emergency-budget-fallback) n'okpuru.)                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |              | Kwado nnwale ọzọ mbụ na-apụtaghị ìhè maka iyi SSE sitere n'elu nke kwụsịrị n'etiti, tupu bytes nzaghachi ọ bụla erute onye ahịa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |              | Kwe ka mgbake iyi rịọgharịa ma jikọta nzaghachi mgbe bytes rutegoro onye ahịa.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |              | Mee ka ịga n'ihu n'etiti iyi dị nchebe maka oku ngwá ọrụ: amalitekwala iyi ebipụrụ ozugbo e zipụrụ oku ngwá ọrụ (ma ọ ka na-aga ma ọ bụ ejirila finish_reason tool_calls mechie ya), ma mechie mgbe otu ịga n'ihu efu gasịrị kama imefu mmefu ego niile. Mgbe agbanyụrụ ya: omume nke release.                                                                                                                                                                                                                                                                                                    |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |              | Gbanwee otu ugboro gaa na njikọ ibe mgbe iyi SSE mechiri tupu o zipụ frame ọ bụla bara uru, ma nnwale ọzọ nwere oke n'otu njikọ ahụ agwụla; ọ bụrụ na enweghị njikọ ibe a pụrụ iji, a ga-eweghachi njehie 502 mbụ nke `STREAM_EARLY_EOF`. Agbanyụrụ ya na ndabara: early-EOF ga-anọgide bụrụ njedebe mgbe nnwale ọzọ n'otu njikọ ahụ gasịrị.                                                                                                                                                                                                                                                      |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |              | Tinye field aha ndị dị mfe igosi na nzaghachi `/v1/models`. Gbanyụọ ya maka ndị ahịa na-atụ anya naanị ID nke model.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |              | Na-achịkwa otu esi etinye prefix na ID nke model n'ime /v1/models. 'dual' (ndabara) na-ewepụta ma prefix alias ma prefix canonical provider-id maka ndakọrịta azụ. 'alias' na-ewepụta naanị prefix alias dị mkpụmkpụ (dịka ds-web/model, ọ bụghị deepseek-web/model). 'canonical' na-ewepụta naanị prefix provider-id zuru ezu. Uru: `dual`, `alias`, `canonical`.                                                                                                                                                                                                                                |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |              | Kwado mmekọrịta ELO nke leaderboard Arena AI kwa oge maka nhazi ọkwa ọgụgụ isi nke model.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |              | Kpọsa NJ enyo `claude/<provider>/<model>` na `/v1/models` ka nchọpụta ụdị nke ọnụ ụzọ Claude Code wee depụta ụdị ndị na-abụghị Claude. Ọkwa zuru ụwa ọnụ nke mgbochi nwere ọkwa atọ (env na-emeri ntọala dashboard e ji dochie ya). Lee [Nhazi Claude Code](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker).                                                                                                                                                                                                                             |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |              | Mgbanwe ukwu maka NJ ọnụ ụzọ no-think/<provider>/<model>. Mgbe ọ dị On (ndabara): /v1/models na-akpọsa ụdị na-enweghị iche echiche maka ụdị Claude ọ bụla tozuru oke nke nwere ikike iche echiche, NJ no-think/ ezitere na arịrịọ na-alaghachikwa na ezigbo ụdị ahụ ma gbochie reasoning. Mgbe ọ dị Off: anaghị akpọsa ụdị ndị ahụ, a na-ewerekwa NJ no-think/ dị ka NJ ụdị ọ bụla ọzọ a na-amaghị. Nhọrọ ịbanye/ịpụ nke ModelSpec.noThinkingAlias maka ụdị ọ bụla ka na-emetụta mgbe nke a dị On.                                                                                                |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |              | Gbanyụọ mmepụta ụdị ọkwa iche echiche (dịka -low, -medium, -high) na katalọgụ /v1/models.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓            | Kwado ahịrị nnabata mebere na-agbanwe agbanwe maka tenant ọ bụla maka iziga na provider (#9654): mmụba mberede nke otu tenant agaghịzi eme ka nke ọzọ nweta 503. Mgbanwe env `OMNIROUTE_CHAT_VIRTUAL_LANES` na-emeri ntọala dashboard a e ji dochie ya; mgbanwe na-amalite ịrụ ọrụ mgbe e bidogharịrị server.                                                                                                                                                                                                                                                                                     |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |              | Kpọsa NJ enyo <gateway-alias>/<model> na /v1/models maka ụdị ndị onye nwe ha ziri ezi na-enweghị credential na-arụ ọrụ, mana ọnụ ụzọ passthrough nwere credential na-arụ ọrụ na-eduga ha. Ịdọ aka ná ntị: nke a na-agbakwunye ndenye katalọgụ maka client niile mgbe a kwadoro ya n'ụwa niile.                                                                                                                                                                                                                                                                                                    |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |              | Kwado nchọpụta balance maka node kwekọrọ na aggregator New-API / One-API / Sub2API. Mgbe a kwadoro ya, node kwekọrọ ekwekọ nke edobere ọkọlọtọ aggregator ga-egosi balance ha na dashboard na routing quota-preflight.                                                                                                                                                                                                                                                                                                                                                                            |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |              | Gaa n'ihu na oku tool nke server nwe na-enweghị streaming ruo mgbe ụdị ahụ weghachiri nzaghachi client nwere ike iji.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |              | Ọnụọgụ ọchụchọ na ọchụchọ ndị na-adịbeghị anya na-agụ naanị provider ndị ka nwere njikọ na-arụ ọrụ (a na-agụ provider na-enweghị key dịka duckduckgo-free mgbe niile). Mgbe ọ dị Off, a na-edobe ahịrị ọchụchọ niile echekwara nwere NJ provider.                                                                                                                                                                                                                                                                                                                                                 |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |              | Ibe provider dị na dashboard: gosi baajị Free naanị mgbe akara ndị provider na-akwado dị — nke a na-ewepụ usoro ntule display-name, field free ndị na-abụghị boolean, na suffix :free n'ahụ provider edebanyere aha ndị na-enweghị free tier e dere n'akwụkwọ. Mgbe ọ dị Off, a na-edobe iwu baajị nke mbụ.                                                                                                                                                                                                                                                                                       |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |              | Na nzaghachi unavailable 429/503 agbakọtara ọnụ, ewepụ `Retry-After` mgbe a na-amaghị oge retry doro anya n'ọdịnihu (kama 1s emepụtara), tinye `error.retry_after_provenance` (`signal` \| `none`), ma kwe ka ụzọ combo drain gụọ ntụziaka retry e dere n'okwu site na JSON na body upstream plain-text. Field ahụ na-apụta naanị na nzaghachi `unavailableResponse()` mepụtara; body 429/503 ndị ọzọ anaghị agbanwe.                                                                                                                                                                             |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |              | Mgbe ebumnuche ngwakọta `priority` nke e nyere akara fallback-only-on-quota-exhaustion kwụsịrị ngwakọta ahụ n’ihi ihe a pụrụ igosi na ọ bụghị oke ojiji (onye na-egbochi sekit nke onye na-eweta ọrụ meghere, ma ọ bụ mafere ya n’ihi amụma igbu oge), zaghachi 502 kama 503 nke na-adị ka nke oke ojiji. Nkwụchi, oge nchere, enweghị nnweta, mmecha oke ojiji, na nkwụsị n’ihi oke ọrụ n’otu oge ga-anọgide na-eji 503.                                                                                                                                                                         |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |              | Nzaghachi Mistral 401 nkịtị (`{"detail":"Unauthorized"}`, na-enweghị akara nkwenye njirimara doro anya) bụ otu ihe maka igodo a kagburu na maka oke ojiji gwụchara. Mgbe agbanyere ya, ọ na-etinye njikọ ahụ n’oge nchere kama ịdọba ya dị ka `expired`, ọ kachasị ugboro 3 n’ime otu elekere maka njikọ ọ bụla; nke na-esote ga-adọba ya, ka igodo a kagburu wee ka na-erute ọnọdụ ikpeazụ kwesịrị ekwesị. A gbanyụrụ ya na ndabara: nzaghachi Mistral 401 nkịtị ọ bụla na-adọba njikọ ahụ dịka ọ na-emebu.                                                                                      |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |              | Were token OAuth bearer weta katalọgụ ụdị xAI dị ugbu a maka njikọ `xai-oauth` site na `https://api.x.ai/v1/models`, kama mkpụrụ data static e mere ka ọ ghara ịgbanwe. A gbanyụrụ ya na ndabara: `xai-oauth` ga-anọgide na-enye mkpụrụ data static ahụ na-enweghị mgbanwe. Mgbe njehie mkpebi ọ bụla mere, nchọpụta ahụ ga-alaghachi na mkpụrụ data ahụ (akwadobeghị ma x.ai ọ̀ na-anabata OAuth bearer na endpoint a).                                                                                                                                                                           |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |              | Kwe ka mkpocha akpaaka hichapụ ọrụ Batch API ndị ruru ọnọdụ ikpeazụ (completed/failed/cancelled/expired) ma bụrụ ndị tọrọ karịa `OMNIROUTE_BATCH_RETENTION_DAYS`, tinyere checkpoint nke ahịrị nke ọ bụla, ma kpochapụ ọdịnaya BLOB nke faịlụ e bulitere mgbe `expires_at` nke ha gafere. A gbanyụrụ ya na ndabara: nrụnye ọ bụla dị ugbu a ga-edobe data a otu ọ dịbu ruo mgbe onye nchịkwa họrọ ịgbanye ya. Ụzọ `DELETE /api/v1/batches/delete-completed` nke onye nchịkwa na-akpalite agaghị agbanwe n’agbanyeghị nhọrọ ahụ — ọ bụ nkwekọrịta API ọha dị iche nke na-arụ ọrụ na-enweghị ọnọdụ. |

### CLI (5)

| Igodo                                 | Ụdị     | Ndabara | Malitegharị | Nkọwa                                                                                                                                                                                                                                                     |
| ------------------------------------- | ------- | ------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓           | Gbanye ọnọdụ ndakọrịta maka ndị ahịa CLI niile.                                                                                                                                                                                                           |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |             | Gbanye oyi akwa ndakọrịta aha ọzọ nke model.                                                                                                                                                                                                              |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |             | Gbanye mmekọrịta data ọnụahịa akpaaka (ọ chọkwara environment variable `PRICING_SYNC_ENABLED`).                                                                                                                                                           |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |             | Mgbe mmekọrịta model nke onye na-eweta ọrụ gasịrị, dee (ọzọ) faịlụ profaịlụ ~/.codex/*.config.toml site na katalọgụ dị ugbu a na-akpaghị aka. Ọ dịghị mgbe ọ na-agbanwe nhazi Codex na-arụ ọrụ/ndabara. A gbanyụrụ ya na ndabara.                         |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |             | Mgbe mmekọrịta model nke onye na-eweta ọrụ gasịrị, dee (ọzọ) profaịlụ Claude Code ~/.claude/profiles/<name>/settings.json site na katalọgụ dị ugbu a na-akpaghị aka. Ọ dịghị mgbe ọ na-agbanwe nhazi Claude na-arụ ọrụ/ndabara. A gbanyụrụ ya na ndabara. |

### Ahụike (5)

| Igodo                                     | Ụdị     | Ndabara | Nkọwa                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | Gbanyụọ ebe njedebe nyocha ahụike nke instance mpaghara.                                                                                                                                                                                                                                                          |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | Gbanyụọ nyocha ahụike nkwado token.                                                                                                                                                                                                                                                                               |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | Gbanye ohere netwọk n'ime gburugburu sandbox nke skills.                                                                                                                                                                                                                                                          |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | N'ime nnyocha ahụike proxy, probe nke target jụrụ (401/403/429) na-amaliteghachi usoro ọdịda ndị sochiri onwe ha nke proxy ahụ. A gbanyụrụ ya na ndabara: ọjụjụ ahụ na-anọpụ iche (#10654). 5xx ka na-abụ nke a na-enweghị ike ikpebi n'ụzọ ọ bụla; ọjụjụ anaghị ewepụ, gbanyụọ ma ọ bụ mee ka proxy rụọ ọrụ ọzọ. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | Mee nyocha iguzosi ike n'ezi ihe/ahụike DB nke mmalite mgbe server malitere ịnabata arịrịọ (site na `setImmediate`) kama igbochi mmalite ruo mgbe ọ gwụchara (#13717). A gbanyụrụ ya na ndabara: mmalite na-egbochi kpọmkwem dịka ọ dị tupu PR a.                                                                 |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` na aha ochie ya ọzọ
> `INJECTION_GUARD_BLOCK_THRESHOLD` na-ahazi ọnọdụ `block` nke
> `INJECTION_GUARD_MODE`, mana ha bụ environment variables nkịtị nke
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> na-agụ, ọ bụghị feature flags: ha enweghị ntọgharị DB na enweghị mgba ọkụ dashboard. Lee
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> Kọlụm `Restart` na-akara flags nwere `requiresRestart: true` — a na-echekwa uru ahụ
> ozugbo, mana ọ na-amalite ịrụ ọrụ naanị mgbe process ahụ bulitegharịrị. Enum
> flags na-ajụ uru ọ bụla na-anọghị n'ime set ndị e kwere ka ha jiri (a na-enyocha ya n'akụkụ server n'ime
> ma `setFeatureFlagOverride()` ma REST `PUT` handler).

---

## Ịgbanwe Ọkọlọtọ

### Dashboard

Gaa na **Dashboard → Settings → Feature Flags**
(`/dashboard/settings/feature-flags`). Grid ahụ
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
na-akwado:

- **Ọchụchọ** site na key ma ọ bụ nkọwa, yana **nzacha** site na category (tinyekwara nlele e mepụtara nke
  **Requires Restart**).
- **Toggle** maka ọkọlọtọ boolean na **dropdown** maka ọkọlọtọ enum
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`).
- **Baajị isi mmalite** maka ọkọlọtọ ọ bụla — `DB`, `ENV`, ma ọ bụ `DEF` — nke na-egosi ebe
  uru dị irè si bịa.
- Bọtịnụ **Reset** (nke a na-egosi naanị maka ọkọlọtọ sitere na `DB`) iji wepụ override ahụ,
  yana bọtịnụ **Reset All Overrides** dị n'okpuru.
- Ọkwa mgbasa ozi **Restart Server** mgbe a gbanwere ọkọlọtọ `requiresRestart`.

### REST API

Arụmọrụ niile na-agafe n'otu route:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts).
Method ọ bụla chọrọ session dashboard nke akwadoro (`401` ma ọ bụghị ya).

#### `GET /api/settings/feature-flags`

Na-eweghachi ọkọlọtọ niile tinyere uru ha dị irè, isi mmalite ha, na nchịkọta.

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
    // ... ọkọlọtọ 72 niile
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

Tọọ ma ọ bụ wepụ otu override. Body: `{ key: string; value?: string }`.
Ịhapụ `value` na-ewepụ override ahụ (na-eweghachi env / default).

```bash
# Tọọ override DB
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# Wepụ override ahụ (enweghị "value")
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

Nzaghachi ahụ na-eweghachi `effectiveValue`/`source` ọhụrụ, `previousValue`/
`previousSource`, na `requiresRestart`. A na-ajụ key ndị a na-amaghị na uru enum
ndị karịrị oke site na `400`.

#### `DELETE /api/settings/feature-flags`

Na-ehichapụ override DB **niile** n'otu oge, ma na-eweghachi ọkọlọtọ ọ bụla n'uru env / default
ya. Na-eweghachi `{ cleared: <count>, message: "..." }`.

> [!NOTE]
> Ọkọlọtọ nwere `requiresRestart: true` na-amalite ịrụ ọrụ naanị mgbe e bugharịrị process ahụ.
> Usoro restart nke dashboard na-akpọ `POST /api/restart`, ma mesịa na-enyocha
> `GET /api/health/ping` ugboro ugboro ruo mgbe server ahụ laghachiri n'ọrụ.

---

## Nlaghachi Ndabere Biudjet Maka Ọnọdụ Mberede

`OMNIROUTE_EMERGENCY_FALLBACK` (category `runtime`, default `true`) na-achịkwa
ụzọ nlaghachi ndabere efu maka ọnọdụ mberede dị na
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts).
Mgbe enyere ya aka, a na-eziga request ndị mefusịrị biudjet ha na provider/model
nlaghachi ndabere efu kama ka ha daa kpamkpam. Tọọ ya ka ọ bụrụ `false` (ma ọ bụ `0`) — site na
toggle dashboard, override DB, ma ọ bụ environment variable `OMNIROUTE_EMERGENCY_FALLBACK`
— iji gbanyụọ omume ahụ ma kwe ka request ndị biudjet ha gwụrụ daa.
(E gosipụtara ya dị ka toggle dashboard na PRs #3741 / #3752.)

---

## Hụkwa

- [Ntụaka Mgbanwe Gburugburụ](./ENVIRONMENT.md) — ọtụtụ ọkọlọtọ nwere mgbanwe
  gburugburu ebe obibi nwere otu aha nke edepụtara ebe ahụ (ntọgharị DB na-ebute
  ya ụzọ).
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — isi mmalite eziokwu maka ọkọlọtọ ọ bụla.
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — mgbagha mkpebi (`resolveFeatureFlag`, `isFeatureFlagEnabled`,
  `resolveAllFeatureFlags`).
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — nchekwa na-adịgide
  nke ntọgharị DB n'ime oghere aha `feature_flags` nke tebụl `key_value`.
