# Resilience Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute में तीन अलग-अलग लेकिन परस्पर संबंधित रेज़िलिएंस तंत्र हैं। प्रत्येक का दायरा और उद्देश्य अलग है। रूटिंग व्यवहार को डीबग करते समय इन्हें अलग-अलग रखें।

![3-स्तरीय रेज़िलिएंस मॉडल](../diagrams/exported/resilience-3layers.svg)

> स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. प्रोवाइडर सर्किट ब्रेकर

**दायरा:** संपूर्ण प्रोवाइडर (जैसे, `glm`, `openai`, `anthropic`)।

**उद्देश्य:** ऐसे प्रोवाइडर को ट्रैफ़िक भेजना बंद करना जो अपस्ट्रीम/सेवा स्तर पर बार-बार विफल हो रहा हो।

**कार्यान्वयन:**

- मुख्य क्लास: `src/shared/utils/circuitBreaker.ts`
- वायरिंग: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- स्थिति API: `GET /api/monitoring/health`
- रीसेट API: `POST /api/resilience/reset`
- रैपर: `open-sse/services/accountFallback.ts`
- DB तालिका: `domain_circuit_breakers`

**स्थितियाँ:**

- `CLOSED` — सामान्य ट्रैफ़िक की अनुमति है
- `DEGRADED` — ट्रैफ़िक की अनुमति अभी भी है, लेकिन प्रोवाइडर की बढ़ी हुई विफलताओं को ट्रैक किया जा रहा है
- `OPEN` — प्रोवाइडर अस्थायी रूप से अवरुद्ध है; कॉम्बो रूटिंग इसे छोड़ देती है
- `HALF_OPEN` — रीसेट टाइमआउट समाप्त हो चुका है; प्रोब अनुरोध की अनुमति है

**कॉन्फ़िगर किए जा सकने वाले डिफ़ॉल्ट (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience में उपलब्ध):**

| क्लास   | डिग्रेड होने की सीमा | खुलने की सीमा | रीसेट टाइमआउट |
| ------- | -------------------- | ------------- | ------------- |
| OAuth   | 5 विफलताएँ           | 8 विफलताएँ    | 60s           |
| API-key | 7 विफलताएँ           | 12 विफलताएँ   | 30s           |
| स्थानीय | व्युत्पन्न           | 2 विफलताएँ    | 15s           |

`degradationThreshold` यह नियंत्रित करता है कि कोई प्रोवाइडर कब `DEGRADED` स्थिति में प्रवेश करता है; `failureThreshold` यह नियंत्रित करता है कि वह कब खुलता है और उसे छोड़ दिया जाता है। स्थानीय प्रोवाइडर प्रोफ़ाइल अभी Resilience सेटिंग पेज पर उपलब्ध नहीं हैं।

**ट्रिप कोड:** केवल प्रोवाइडर-स्तरीय स्थितियाँ `[408, 500, 502, 503, 504]`। अकाउंट-स्तरीय त्रुटियों (अधिकांश 401/403/429 — वे कूलडाउन या लॉकआउट के अंतर्गत आती हैं) के लिए ट्रिप **न करें**।

**लेज़ी रिकवरी:** जब `OPEN` की अवधि समाप्त होती है, तो `getStatus()`, `canExecute()`, `getRetryAfterMs()` स्थिति को रीफ़्रेश करके `HALF_OPEN` कर देते हैं। किसी बैकग्राउंड टाइमर की आवश्यकता नहीं है।

---

### ऑप्ट-इन वैश्विक प्रोवाइडर कूलडाउन (विंडो गेट)

एक चौथी, **ऑप्ट-इन** परत (`PROVIDER_COOLDOWN_ENABLED`, डिफ़ॉल्ट रूप से **बंद**) विफल हो रहे प्रोवाइडरों की
क्रॉस-रिक्वेस्ट मेमोरी को
`open-sse/services/providerCooldownTracker.ts` में बनाए रखती है, जिसका उपयोग कॉम्बो टार्गेट
रिज़ॉल्यूशन द्वारा किया जाता है, ताकि लगातार आने वाले कॉम्बो अनुरोध हाल ही में
विफल हुए प्रोवाइडर पर दोबारा प्रयास करना बंद कर दें। प्रोवाइडर-स्तरीय प्रविष्टियाँ `PROVIDER_PROFILES` विंडो गेट का पालन करती हैं:

| प्रोफ़ाइल | इतने के बाद ट्रिप करता है (`providerFailureThreshold`) | इस अवधि में (`providerFailureWindowMs`) | इतने समय तक कूलडाउन (`providerCooldownMs`) |
| --------- | -----------------------------------------------------: | --------------------------------------: | -----------------------------------------: |
| OAuth     |                                                   `10` |                                 `15min` |                                     `5min` |
| API कुंजी |                                                   `15` |                                 `30min` |                                    `10min` |

थ्रेशोल्ड से नीचे प्रोवाइडर को कूलडाउन में **नहीं** माना जाता; सफलता मिलने पर
विंडो साफ़ हो जाती है। इसके बजाय, कनेक्शन-स्तरीय प्रविष्टियाँ (`provider:connectionId`)
एक्सपोनेंशियल `minRetryCooldownMs → maxRetryCooldownMs` बैकऑफ़ बनाए रखती हैं। ओवरराइड:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`।
रिग्रेशन गार्ड: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. कनेक्शन कूलडाउन

**दायरा:** एकल प्रदाता कनेक्शन/खाता/कुंजी।

**उद्देश्य:** एक खराब कुंजी को छोड़ना, जबकि उसी प्रदाता के अन्य कनेक्शन सेवा देना जारी रखें।

**कार्यान्वयन:**

- अनुपलब्ध चिह्नित करना: `src/sse/services/auth.ts::markAccountUnavailable()`
- चयन: उसी फ़ाइल में `getProviderCredentials*`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्स: `src/lib/resilience/settings.ts`

**प्रति कनेक्शन फ़ील्ड:**

- `rateLimitedUntil` — कूलडाउन समाप्त होने तक का टाइमस्टैम्प
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — एक्सपोनेंशियल बैकऑफ़ काउंटर

**डिफ़ॉल्ट कूलडाउन:**

- OAuth आधार: 5s
- API-key आधार: 3s
- API-key 429: अपस्ट्रीम `Retry-After`/रीसेट हेडर/पार्स किए जा सकने वाले रीसेट टेक्स्ट को प्राथमिकता देता है
- बैकऑफ़: `baseCooldownMs * 2 ** failureIndex`

**एंटी-थंडरिंग-हर्ड सुरक्षा:** समवर्ती विफलताओं को कूलडाउन अत्यधिक बढ़ाने या `backoffLevel` को दो बार बढ़ाने से रोकती है।

**टर्मिनल स्थितियाँ (कूलडाउन नहीं):**

- `banned` — प्रतिबंधित-कीवर्ड / खाता-प्रतिबंध पहचान द्वारा सेट किया जाता है ([BAN_DETECTION](../security/BAN_DETECTION.md) देखें), और लगातार तीन अपस्ट्रीम प्रति-अनुरोध अस्वीकृतियों (`request_rejected`, जैसे Anthropic OAuth 403 "अनुरोध की अनुमति नहीं है" — `open-sse/services/requestRejectedStreak.ts`) द्वारा भी; एक अकेली अस्वीकृति केवल कनेक्शन को कूलडाउन में डालती है
- `expired` (सीमित पुनः प्रयासों के बाद टर्मिनल स्थिति में बदलता है — एक्सपोनेंशियल बैकऑफ़ के साथ `EXPIRED_RETRY_MAX = 3` — ताकि अस्थायी OAuth त्रुटियाँ खाते को स्थायी रूप से निष्क्रिय किए जाने से पहले स्वयं ठीक हो सकें)
- `credits_exhausted`

ये तब तक बने रहते हैं, जब तक क्रेडेंशियल नहीं बदलते या कोई ऑपरेटर इन्हें रीसेट नहीं करता। टर्मिनल स्थितियों को अस्थायी कूलडाउन स्थिति से अधिलेखित न करें।

**लेज़ी रिकवरी:** जब `rateLimitedUntil` बीत जाता है, तो कनेक्शन फिर से पात्र हो जाता है। सफल उपयोग पर, `clearAccountError()` सभी त्रुटि फ़ील्ड साफ़ कर देता है।

### Claude OAuth उपयोग सीमा: निम्न-प्राथमिकता लेन + सत्र-सीमा रीसेट

**दायरा:** एक Claude सदस्यता (OAuth) कनेक्शन। दोनों सुविधाएँ **प्रति कनेक्शन
ऑप्ट-इन** हैं (कनेक्शन संपादित करें → Claude अनुभाग → `providerSpecificData` में
`lowPriorityMode` / `autoLimitReset`, दोनों डिफ़ॉल्ट रूप से बंद) और Claude Code के
`/low-priority` और `/limit-reset` कमांड को प्रतिबिंबित करती हैं (वायर अनुबंध Claude Code 2.1.263 से लिया गया है)।

**कार्यान्वयन:**

- स्टेट मशीन + प्रतिक्रिया वर्गीकरण: `open-sse/services/claudeLowPriority.ts`
- रीसेट स्थिति/क्लेम क्लाइंट: `open-sse/services/claudeLimitReset.ts`
- एक्ज़ीक्यूटर हुक (हेडर इंजेक्शन + समान-खाता पुनः प्रयास): `open-sse/executors/base.ts::execute()`
- ऑप्ट-इन स्थायित्व: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ट्रिगर:** 5-घंटे की उपयोग सीमा — एक `429`, जिसके हेडर में
`anthropic-ratelimit-unified-status: rejected` और, जब खाता पात्र हो,
`anthropic-ratelimit-unified-slow-offer: treatment` मौजूद हों। उस पहली सीमा वाली
429 से पहले कुछ भी नहीं भेजा जाता; यूनिफ़ाइड हेडर के बिना बर्स्ट 429 सामान्य कूलडाउन पथ से गुजरता है।

**निम्न-प्राथमिकता लेन** (`lowPriorityMode`):

- सीमा वाली 429 पर एक्ज़ीक्यूटर प्रस्ताव स्वीकार करता है और तुरंत **उसी**
  खाते के साथ `anthropic-usage-limit: slow` का उपयोग करके पुनः प्रयास करता है; लेन घोषित
  `anthropic-ratelimit-unified-reset` (+60s ग्रेस अवधि) तक सक्रिय रहती है और उस अवधि में प्रत्येक अनुरोध में
  यह हेडर होता है। इंटरसेप्ट की गई 429 कभी `handleChatCore` तक नहीं पहुँचती, इसलिए कनेक्शन को
  कूलडाउन में **नहीं** डाला जाता और उससे हटकर रोटेट नहीं किया जाता।
- बाद की प्रतिक्रियाओं पर `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  लेन को बनाए रखते हैं; `slot_busy` (429) या `529`, सर्वर के
  `anthropic-ratelimit-unified-slow-retry-after` (डिफ़ॉल्ट 20s, 5–600s तक सीमित, ±30% जिटर)
  की प्रतीक्षा करके पुनः प्रयास करते हैं, जो `anthropic-ratelimit-unified-slow-max-wait` (डिफ़ॉल्ट 20 मिनट, सीमा
  1 मिनट–6 घंटे) से सीमित होता है — उससे आगे लेन समाप्त हो जाती है और 10-मिनट का कूल-ऑफ़ पुनः स्वीकृति रोकता है।
  प्रतीक्षा को अनुरोध के अपने अपस्ट्रीम-स्टार्ट टाइमआउट में शेष समय
  (`resolveFetchStartTimeout`, डिफ़ॉल्ट रूप से 10 मिनट) में से 5 सेकंड का मार्जिन घटाकर भी सीमित किया जाता है: उस सीमा के बिना
  20-मिनट का डिफ़ॉल्ट अधिकतम-प्रतीक्षा समय अनुरोध से अधिक चलता और प्रतीक्षा के बीच में स्लीप निरस्त हो जाती,
  जिससे सुचारु `max_wait` समाप्ति + कूल-ऑफ़ के बजाय `TimeoutError` दिखाई देता।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-विंडो रोलओवर, या
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (जो किसी भी स्थिति में इसे
  `extra_usage` के रूप में समाप्त करता है, क्योंकि सशुल्क ओवरेज अब सीमा को कवर करता है) लेन समाप्त कर देते हैं; इसके बाद
  प्रतिक्रिया सामान्य कूलडाउन पथ पर जाती है। `budget_exhausted` को घोषित बजट रीसेट (≤ 8 दिन) तक
  याद रखा जाता है।
- सीमा जाँच एक्ज़ीक्यूटर के अपने 400-प्रेरित इंट्रा-अटेम्प्ट पुनः प्रयासों (कॉन्टेक्स्ट
  संपादन, थिंकिंग/एफ़र्ट क्लैम्प, पैरामीटर ऑटो-लर्न) के बाद चलती है, इसलिए केवल उन पुनः प्रयासों में से
  किसी एक पर दिखाई देने वाली सीमा 429 भी कूलडाउन पथ तक पहुँचने के बजाय इंटरसेप्ट की जाती है।
- स्थिति प्रति कनेक्शन इन-मेमोरी होती है (पुनरारंभ करने पर पुनः स्वीकार करने के लिए एक अतिरिक्त सीमा 429 लगती है)।

**सत्र-सीमा रीसेट** (`autoLimitReset`, दोनों चालू होने पर लेन से पहले आज़माया जाता है):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ब्लॉक; जब `arm: "reset"` और `available: true` हों,
  `{ "program": "juniper_tide" }` के साथ
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  (`providerSpecificData.organizationUUID` से संगठन UUID, बूटस्ट्रैप फ़ॉलबैक)।
- `result: reset|not_limited` → अनुरोध पूर्ण गति से पुनः आज़माया जाता है (कोई धीमा हेडर नहीं)।
  `already_used` / `not_offered`, `next_available_at` (डिफ़ॉल्ट एक सप्ताह) को मेमोइज़ करते हैं; कोई भी
  विफलता 15 मिनट का बैकऑफ़ लागू करती है। रीसेट सप्ताह में एक बार होता है और फिर भी
  साप्ताहिक सीमा में गिना जाता है।

रिग्रेशन सुरक्षा: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`।

### सत्र एफ़िनिटी (#7274)

**दायरा:** एक क्लाइंट सत्र (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` हेडर), जो **किसी भी** प्रदाता के लिए एक कनेक्शन से पिन किया गया हो।

**उद्देश्य:** एक बहु-टर्न एजेंट (Claude Code, aider, कस्टम एजेंट) को विभिन्न अनुरोधों में एक ही अकाउंट पर बनाए रखना, जिससे क्रॉस-अकाउंट संदर्भ हानि और प्रति-अकाउंट सेशन स्थिति वाले प्रदाताओं पर बार-बार होने वाली कोल्ड-स्टार्ट 429 त्रुटियाँ कम हों।

**कार्यान्वयन:**

- TTL निर्धारण: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- पिन चयन/निर्माण: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- हेडर निष्कर्षण (सामान्य, किसी भी प्रदाता के लिए): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- स्थायी पिन तालिका: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- सेटिंग: `sessionAffinityTtlMs` (ms में वैश्विक TTL, `0` इसे अक्षम करता है) — `src/lib/db/settings.ts`। माइग्रेशन `124_generic_session_affinity_ttl.sql` द्वारा इसका नाम केवल Codex के लिए प्रयुक्त `codexSessionAffinityTtlMs` से बदला गया, जो पहले कॉन्फ़िगर किए गए किसी भी Codex TTL को नए डिफ़ॉल्ट के रूप में आगे ले जाता है।

#7274 से पहले, `resolveSessionAffinityTtlMs()` प्रत्येक `codex`-रहित प्रदाता के लिए तुरंत `0` लौटाता था, इसलिए TTL सेटिंग (और सेशन हेडर) का अन्य कहीं कोई प्रभाव नहीं पड़ता था, भले ही पिनिंग तंत्र और हेडर निष्कर्षण पहले से ही प्रदाता-निरपेक्ष थे। सुधार में वह प्रारंभिक रिटर्न हटा दिया गया; अब TTL को वैश्विक रूप से `0` से अधिक सेट करने पर यह प्रत्येक प्रदाता पर समान रूप से लागू होता है।

तीनों सेशन-अफिनिटी हेडर कभी भी अपस्ट्रीम अग्रेषित नहीं किए जाते — एक्ज़ीक्यूटर क्लाइंट हेडर को आगे भेजने के बजाय अपने अपस्ट्रीम हेडर शुरू से बनाते हैं, इसलिए यह केवल एक आंतरिक सहसंबंध ID बना रहता है।

### एक्सक्लूसिव मैनेज्ड सेशन कनेक्शन लीज़

**दायरा:** एक सक्रिय मैनेज्ड HTTP क्लाइंट/सेशन एक पात्र OmniRoute कनेक्शन का स्वामी होता है।

**उद्देश्य:** उन क्लाइंट के लिए टिकाऊ एक्सक्लूसिव कनेक्शन स्वामित्व प्रदान करना जिन्हें अनुरोधों के बीच एक सख्त रूटिंग सीमा की आवश्यकता होती है। यह सेशन अफिनिटी से अलग है, जो निरंतरता की एक सॉफ्ट प्राथमिकता है: एक एक्सक्लूसिव लीज़ SQLite में लाइफ़साइकल स्थिति को स्थायी रखती है, वैश्विक सक्रिय-स्वामी और सक्रिय-कनेक्शन विशिष्टता लागू करती है, और प्रदाता को अनुरोध भेजने से पहले किसी पुराने जेनरेशन को अस्वीकार करती है।

यह सुविधा प्रत्येक API कुंजी के लिए ऑप्ट-इन है। किसी मैनेज्ड कुंजी में `lease:exclusive` स्कोप और एक स्पष्ट, गैर-रिक्त `allowedConnections` सूची होनी चाहिए। कोई भी HTTP क्लाइंट लाइफ़साइकल एंडपॉइंट का उपयोग कर सकता है; किसी क्लाइंट नाम, यूज़र-एजेंट, प्रदाता, OAuth विधि या मॉडल की आवश्यकता नहीं है। लीज़ किसी कनेक्शन की स्वामी होती है, मॉडल की नहीं, इसलिए मॉडल बदलने पर भी बाइंडिंग बनी रहती है, बशर्ते कनेक्शन सामान्य रूप से पात्र बना रहे। सामान्य मॉडल, कोटा, स्वास्थ्य, कूलडाउन और अनुमति-सूची नियम प्रामाणिक बने रहते हैं और उसी जेनरेशन को किसी अन्य खाली पात्र कनेक्शन पर स्थानांतरित कर सकते हैं।

लाइफ़साइकल `POST /api/v1/session-leases` है, जिसमें JSON एक्शन `acquire`, `renew`, और `release` हैं। मैनेज्ड इन्फ़रेंस अनुरोध अपारदर्शी `X-OmniRoute-Lease-Owner` मान और सटीक `X-OmniRoute-Lease-Generation` प्रस्तुत करते हैं। स्वामी मान में `vlo_` के बाद 43 base64url वर्ण होते हैं; केवल उसका SHA-256 हैश संग्रहीत किया जाता है। प्रत्येक अंतिम डिस्पैच सीमा प्रमाणित API कुंजी ID और सक्रिय कनेक्शन ID को भी बाँधती है। लीज़ नियंत्रण हेडर लॉग, संरक्षित अनुरोध स्नैपशॉट और अपस्ट्रीम एक्ज़ीक्यूटर हेडर से हटा दिए जाते हैं।

यदि सामान्य रूटिंग के पास पात्र मैनेज्ड उम्मीदवार हैं, लेकिन प्रत्येक खाली उम्मीदवार पर किसी बाहरी सक्रिय लीज़ का अधिकार है, तो OmniRoute HTTP `429`, lease-capacity-unavailable कोड, प्रतीक्षा-के-लिए-क्षमता स्थिति और सबसे पहले होने वाली प्रासंगिक समाप्ति से प्राप्त सीमित `Retry-After` लौटाता है। सामान्य रिक्त पात्रता लीज़-विवाद नहीं है और अपने मौजूदा रूटिंग त्रुटि व्यवहार को बनाए रखती है।

संबंधित तंत्र अलग बने रहते हैं:

- OAuth सेशन ऑक्यूपेंसी, OAuth अकाउंट के लिए प्रोसेस-लोकल सॉफ्ट वितरण है।
- अकाउंट सेमाफ़ोर अनुरोध-संगामिति परमिट प्रदान करते हैं और अनुरोध पूरा होने पर समाप्त हो जाते हैं।
- एक्सक्लूसिव मैनेज्ड सेशन लीज़, जेनरेशन सीमा के साथ टिकाऊ लाइफ़साइकल स्वामित्व हैं।

---

## 3. मॉडल लॉकआउट

**दायरा:** provider + connection + model त्रिक।

**स्थिति के अनुसार कुंजी का दायरा:** विफल स्थिति तय करती है कि लॉकआउट किस कुंजी में लिखा जाएगा
(`open-sse/services/accountFallback/exactModelLock.ts` में `resolveLockoutScope()`):

- `429` / `403` / `402` — quota या entitlement संकेत — **quota family** को लॉक करता है:
  codex के लिए संपूर्ण `codex` / `spark` दायरा (connection का प्रत्येक `gpt-5*` model), अन्य providers के लिए `getQuotaScopedModelForProvider()`।
- `404` मूल model को लॉक करता है (`getModelLockKey()` `not_found` को सीमित करता है)।
- कोई अन्य स्थिति — `5xx` transport/server विफलताएँ और quality validation से OmniRoute द्वारा स्वयं
  बनाया गया `502` — केवल **सटीक**
  provider/connection/model tuple को लॉक करती है। किसी एक model पर खराब stream, account के quota के बारे में प्रमाण नहीं है; इस नियम से पहले
  `codex/gpt-5.6-luna` पर एक खाली response उस connection के प्रत्येक `gpt-5*` model को
  routing से 2–30 मिनट के लिए (क्रमशः बढ़ते हुए) हटा देता था, जबकि उसका quota अप्रभावित रहता था।
- caller का स्पष्ट `scope` विकल्प हमेशा प्राथमिकता लेता है (Antigravity `"exact"` पास करता है)।

**उद्देश्य:** जब केवल एक model अनुपलब्ध हो या quota द्वारा सीमित हो, तब पूरे connection को अक्षम होने से बचाना।

**उदाहरण:**

- 429 लौटाने वाले प्रति-model quota providers
- किसी एक अनुपलब्ध model के लिए 404 लौटाने वाले local providers
- Provider-विशिष्ट mode/model अनुमति विफलताएँ (जैसे, Grok modes)

**कार्यान्वयन:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### मॉडल कूलडाउन डैशबोर्ड (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

सक्रिय lockouts को इन विवरणों के साथ सूचीबद्ध करता है: provider, connection, model, कारण, expiresAt। ऑपरेटर card से किसी model को मैन्युअल रूप से पुनः सक्षम कर सकते हैं।

**REST API:**

- `GET /api/resilience/model-cooldowns` — सक्रिय lockouts की सूची प्राप्त करें
- `DELETE /api/resilience/model-cooldowns` — मैन्युअल रूप से पुनः सक्षम करें। Body: `{provider, connection, model}`। Auth: management।

### लॉकआउट सेटिंग्स UI + सफलता-क्षय पुनर्प्राप्ति (v3.8.23)

Model lockout हमेशा चालू रहने वाले hardcoded व्यवहार से बदलकर, अपने अलग settings card और self-healing recovery path वाली पूरी तरह configurable, opt-in सुविधा बन गया है।

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
यह ऊपर दिए गए read-only `ModelCooldownsCard` से **अलग** है (जो केवल सक्रिय lockouts को
_सूचीबद्ध_ करता है) — नया card _parameters को configure करता है_। Defaults
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) में मौजूद हैं:

| सेटिंग                  | डिफ़ॉल्ट                         | अर्थ                                                                  |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `enabled`               | `false`                          | मुख्य toggle — model lockout **डिफ़ॉल्ट रूप से बंद** है।              |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | वे upstream statuses जिन्हें model-दायरे वाली विफलता माना जाता है।    |
| `baseCooldownMs`        | `120_000` (120 सेकंड)            | पहली विफलता के लिए आरंभिक lockout अवधि।                               |
| `maxCooldownMs`         | `1_800_000` (30 मिनट)            | क्रमशः बढ़े हुए cooldown की अधिकतम सीमा।                              |
| `maxBackoffSteps`       | `10`                             | exponential-backoff वृद्धि के अधिकतम चरण।                             |
| `useExponentialBackoff` | `true`                           | क्या बार-बार होने वाली विफलताएँ cooldown को exponentially बढ़ाती हैं। |

Settings सामान्य settings store के माध्यम से persist होती हैं और
resilience settings schema के माध्यम से validate की जाती हैं; card `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` के साथ) और `maxBackoffSteps` को सीमित करता है।

**सफलता-क्षय पुनर्प्राप्ति:** पुनर्प्राप्ति **केवल** timer की समाप्ति नहीं है। एक स्वस्थ
response model की विफलता-गणना को घटाता है, ताकि बीच की अवधि में ठीक हो चुका model
अपने timer से पहले वृद्धि रोक दे (और साफ़ हो जाए)। किसी सफल
combo target पर, `open-sse/services/combo.ts`, `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) को कॉल करता है, जो संग्रहीत
`failureCount` को **आधा** कर देता है (`Math.floor(failureCount / 2)`); जब यह `0` तक पहुँचता है, तो lockout
entry पूरी तरह delete कर दी जाती है। इसका counterpart `recordModelLockoutFailure()`
escalation window के भीतर विफलताएँ होने पर गणना बढ़ाता है (और cooldown को बढ़ाता है)।
यह सफलता-क्षय सामान्य timer expiry के अतिरिक्त है —
दोनों में से कोई भी मार्ग model को पुनः सक्षम कर सकता है।

**स्थिति:** lockouts को **in-memory** रखा जाता है (प्रति-process `Map`s में
`provider:connectionId:model` द्वारा keyed `ModelLockoutEntry`, और
`provider:connectionId:exact:model` द्वारा exact-scope locks), इन्हें
DB में persist नहीं किया जाता — restart होने पर ये खो जाते हैं। _settings_ persist होती हैं; सक्रिय
lockout _स्थिति_ अस्थायी है।

---

## 4. Quota-Share समवर्ती नियंत्रण (v3.8.36)

सब्सक्रिप्शन खाते (GLM, MiniMax आदि) अक्सर केवल ~1–3 समवर्ती अनुरोध स्वीकार करते हैं; इससे अधिक होने पर 429 त्रुटियाँ और कूलडाउन सक्रिय हो जाते हैं। यह समस्या विशेष रूप से **quota-share** (`qtSd/…`) कॉम्बो में गंभीर होती है, जहाँ कई API कुंजियाँ एक ही अपस्ट्रीम खाते को साझा करती हैं। तीन परतें किसी साझा खाते को अत्यधिक अनुरोधों से भरने से बचाती हैं।

### प्रति-कनेक्शन समवर्ती सीमा (`max_concurrent`)

प्रत्येक प्रोवाइडर कनेक्शन एक `max_concurrent` अधिकतम सीमा घोषित कर सकता है
(`provider_connections.max_concurrent`, जिसे कनेक्शन मोडल / API / DB में सेट किया जाता है)।
कोई सीमा न रखने के लिए इसे खाली छोड़ें। यही एकल सेटिंग नीचे दी गई क्रमबद्ध निष्पादन परत को नियंत्रित करती है — इसे खाते की वास्तविक समवर्ती क्षमता पर सेट करें (उदाहरण के लिए GLM ~1, MiniMax ~2)।

### Quota-share अनुरोध क्रमबद्ध निष्पादन

जब कोई quota-share डिस्पैच ऐसे कनेक्शन को लक्षित करता है जो एक धनात्मक
`max_concurrent` घोषित करता है, तो उस **खाते** के समवर्ती अनुरोधों को प्रति-कनेक्शन सेमाफोर (कुंजी `qsconn:<connectionId>`) के माध्यम से क्रमबद्ध किया जाता है: अतिरिक्त अनुरोध खाते पर अत्यधिक भार डालने के बजाय **कतार में प्रतीक्षा करते हैं**। यह **fail-open** है — संतृप्त कतार या टाइमआउट की स्थिति में, डिस्पैच किए जा सकने वाले अनुरोध को अस्वीकार करने के बजाय स्लॉट के बिना आगे बढ़ा जाता है। इसे **Settings → Resilience → Quota-share per-connection concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, डिफ़ॉल्ट रूप से चालू) में टॉगल करें। `max_concurrent` सीमा के बिना व्यवहार अपरिवर्तित रहता है।

> quota-share रूटिंग गेट (`selectQuotaShareTarget`, DRR + P2C) स्वयं
> fail-open है और सीमा पर पहुँच चुके कनेक्शन को केवल _कम प्राथमिकता_ देता है — एकल-कनेक्शन पूल में यह कठोर सीमा लागू नहीं कर सकता, इसलिए यही सेमाफोर वास्तव में अत्यधिक अनुरोधों को नियंत्रित करता है।

### कॉम्बो कूलडाउन-जागरूक पुनःप्रयास

प्रत्येक कॉम्बो रणनीति के लिए (सक्षम होने पर), ऐसा अनुरोध जो किसी अल्पकालिक अस्थायी कूलडाउन के कारण निश्चित रूप से 429 उत्पन्न करता, कूलडाउन समाप्त होने तक प्रतीक्षा करता है और 429 लौटाने के बजाय पुनः डिस्पैच होता है — यह बहु-मॉडल कॉम्बो पर Gemini-श्रेणी की TPM/RPM समय-सीमाओं (~60s retry-after) को संभालता है, उदाहरण के लिए जब 2-मॉडल कॉम्बो के दोनों लक्ष्य प्रति-मॉडल दर सीमा तक पहुँच जाते हैं। इसे **Settings → Resilience** में `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) द्वारा सीमित किया जाता है। यह `quota_exhausted` (मध्यरात्रि तक लॉक) या प्रमाणीकरण/नहीं-मिला कारणों पर कभी प्रतीक्षा नहीं करता।

---

## 5. अनुरोध कतार प्रवेश नियंत्रण (v3.8.49 · issue #6593)

**दायरा**: स्थानीय प्रति-provider+connection दर-सीमा कतार (`open-sse/services/rateLimitManager.ts`,
जो Bottleneck द्वारा समर्थित है), ऊपर बताए गए तीन तंत्रों से एक स्तर नीचे।

**`maxWaitMs` कतार में प्रतीक्षा को सीमित करता है; `executionMaxWaitMs` निष्पादन को सीमित करता है।**
दोनों को जानबूझकर अलग रखा गया है और कोई भी दूसरे को प्रभावित नहीं करता।

`resilienceSettings.requestQueue.maxWaitMs` **कतार-प्रतीक्षा बजट** है: इसमें
provider स्लॉट की प्रतीक्षा और फिर QUEUED स्थिति में रहना शामिल है, और जैसे ही
जॉब QUEUED से निकलकर निष्पादित होना शुरू करता है, इसका टाइमर साफ़ कर दिया जाता है
(`rateLimitManager.ts`, `wrappedFn`)। इस सीमा से अधिक समय लेने वाला अनुरोध कभी
upstream तक नहीं पहुँचता। डिफ़ॉल्ट 30000ms है, जिसे
`src/lib/resilience/settings.ts` में `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
द्वारा प्रदान किया जाता है और
`tests/unit/ratelimit-admission-control-6593.test.ts` द्वारा निर्धारित किया गया है,
ताकि इसे बदलने पर यह अनुच्छेद चुपचाप पुराना बने रहने के बजाय वह परीक्षण विफल हो जाए।

`resilienceSettings.requestQueue.executionMaxWaitMs` वह मान है जिसे Bottleneck
जॉब के `expiration` के रूप में प्राप्त करता है, जिसका टाइमर केवल dispatch के बाद
शुरू होता है। यह उन executors के लिए सुरक्षा-सीमा है जिनका अपना कोई upstream
timeout नहीं है, और जब executor का अपना fetch-start timeout इससे अधिक होता है,
तो इसे उस timeout तक बढ़ा दिया जाता है, ताकि यह किसी स्वस्थ in-flight response
को बीच में समाप्त न कर सके। डिफ़ॉल्ट 600000ms (10 मिनट) है।

कतार बजट को `expiration` में देना ही वह कारण था जिससे पहले non-incremental
gateways बीच में समाप्त हो जाते थे — वे पहली bytes आने से पहले वैध रूप से कई
मिनट तक चलते हैं — और इसी कारण expiration को `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) के रूप में प्रदर्शित किया जाता है,
जबकि कतार बजट में queue-timeout code होता है। इनमें से किसी को भी
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) या dashboard
(**Settings → Resilience**) के माध्यम से override करें। सामान्यीकरण के दौरान
दोनों को 1ms–24h की सीमा में बाँधा जाता है।

**दोनों के लिए प्राथमिकता क्रम:** env var केवल _डिफ़ॉल्ट_ प्रदान करता है।
`resilienceSettings.requestQueue` में सहेजा गया मान (dashboard / API patch,
`key_value` में संग्रहीत) उस पर प्राथमिकता रखता है, और प्रति-connection
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` उससे भी अधिक प्राथमिकता
रखता है। इसलिए जिस deployment में पहले से कोई मान सहेजा गया है, उसमें env var
सेट करने पर कुछ नहीं बदलता — इसके बजाय सहेजी गई setting को हटाएँ या अपडेट करें।

कतार में रहने की अवधि `maxWaitMs` द्वारा सीमित होती है; नीचे दिया गया
`maxQueueDepth` यह सीमित करता है कि एक समय में कितने callers कतार में हो सकते हैं।

**`maxQueueDepth` — वैकल्पिक प्रवेश सीमा (नई)।** `resilienceSettings.requestQueue.maxQueueDepth`
यह सीमित करता है कि एक provider+connection के लिए एक समय में कितने अनुरोध कतार
में रह सकते हैं (जिन्हें अभी dispatch नहीं किया गया है)। जब कतार में पहले से
`maxQueueDepth` अनुरोध होते हैं, तो नया अनुरोध typed
`code: "RATE_LIMIT_QUEUE_FULL"` error के साथ तेज़ी से अस्वीकार कर दिया जाता है,
**इससे पहले** कि वह कभी `limiter.schedule()` तक पहुँचे — इसलिए यह अस्वीकृति
कम लागत वाली है और उस अनुरोध के लिए किसी भी downstream prompt-compression /
translation कार्य से पहले होती है। डिफ़ॉल्ट `0` = अक्षम, जिससे मौजूदा
असीमित-कतार व्यवहार बना रहता है; सीमा 0–100000 है।
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) या
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) के माध्यम
से override करें।

प्रवेश जाँच स्वयं एक pure function है
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), इसलिए
इसे वास्तविक Bottleneck limiter के बिना unit-test किया जा सकता है।

> #6593 शुरू करने वाले RFC में एक `bypassCompressionOnRateLimit`
> flag का भी प्रस्ताव था। इस repo की `open-sse/services/compression/` pipeline
> outbound LLM अनुरोध पर prompt/context compression करती है (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` block के आसपास),
> synthesized 429 bodies पर HTTP response compression नहीं — किसी शाब्दिक bypass
> flag के लिए कोई मेल खाता code path मौजूद नहीं है। वह prompt-compression चरण
> वर्तमान में request pipeline में `withRateLimit()` से _पहले_ भी चलता है, इसलिए
> queue-full अस्वीकृति पर इसे छोड़ने के लिए क्रम बदलना इस issue के दायरे से अलग
> और अधिक बड़ा परिवर्तन है; इसे यहाँ जानबूझकर लागू **नहीं** किया गया है और यदि
> CPU की बचत reordering के जोखिम के लायक हो, तो इसे follow-up के रूप में छोड़
> दिया गया है।

---

## 6. धीमी-स्ट्रीम थ्रूपुट वॉचडॉग (#9709)

वैकल्पिक `resilienceSettings.streamRecovery.throughputWatchdog` गार्ड ऐसे
अपस्ट्रीम का पता लगाता है जो अभी भी चंक भेज रहा है, लेकिन कॉन्फ़िगर की गई
उपयोगी-आउटपुट दर से कम असिस्टेंट आउटपुट उत्पन्न कर रहा है। इसे जानबूझकर निष्क्रियता
टाइमआउट से अलग रखा गया है: हार्टबीट और मेटाडेटा किसी भी टाइमर को रीसेट नहीं करते
और प्रगति के रूप में नहीं गिने जाते। यह हार्ड प्रयास समय-सीमा (#9153) से भी अलग
है, जो आउटपुट गुणवत्ता की परवाह किए बिना एक पूर्ण सुरक्षा सीमा बनी रहती है।

वॉचडॉग को निरस्त करने से पहले एक वार्म-अप अवधि और उसके बाद एक पूर्ण रोलिंग विंडो
की आवश्यकता होती है। यह Chat Completions और Responses API आउटपुट इवेंट से टेक्स्ट
डेल्टा की गणना करता है (UTF-8 बाइट का एक रूढ़िवादी प्रॉक्सी), केवल उपयोग-संबंधी और
खाली इवेंट को अनदेखा करता है, और टूल-कॉल या रीजनिंग इवेंट के जारी रहने के दौरान
निर्णय को स्थगित रखता है। यह डिफ़ॉल्ट रूप से अक्षम होता है और
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` से सक्षम किया जा सकता है; विंडो, वार्म-अप,
न्यूनतम दर और न्यूनतम मापने योग्य आउटपुट को सामान्य resilience-settings
नॉर्मलाइज़ेशन लेयर द्वारा सीमित किया जाता है।

सक्षम होने पर, वॉचडॉग द्वारा निरस्तीकरण केवल सक्रिय अपस्ट्रीम प्रयास पर लागू होता
है। क्लाइंट को दिखाई देने वाली कोई भी बाइट भेजे जाने से पहले, मौजूदा समान-अकाउंट
प्रारंभिक-रिकवरी पथ प्रयास को फिर से खोल सकता है। कमिट के बाद, स्ट्रीम को कभी भी
बिना सोचे-समझे दोबारा नहीं चलाया जाता; केवल मौजूदा सुरक्षित मध्य-स्ट्रीम
कंटिन्यूएशन अनुबंध किसी प्रत्यय को जोड़ सकता है। अंतिमकरण एकल-क्रियान्वयन वाला
रहता है, इसलिए उपयोग लेखांकन और semaphore रिलीज़ दोहराए नहीं जाते।

---

## 7. अपस्ट्रीम स्थिति का पुनर्कथन (गलत ढंग से बताए गए कोटा त्रुटि-स्टेटस)

**दायरा:** एक ऐसा अपस्ट्रीम गेटवे जो अस्थायी कोटा समाप्ति की रिपोर्ट गलत HTTP स्टेटस के साथ करता है।

**उद्देश्य:** वर्गीकरण से पहले भ्रामक स्टेटस को ठीक करना, ताकि डाउनस्ट्रीम उपभोक्ता (फ़ॉलबैक इंजन, कॉम्बो एग्रीगेशन और क्लाइंट को दिया जाने वाला रिस्पॉन्स) विफलता की वास्तविक पुनः प्रयास-योग्य प्रकृति देख सकें।

कुछ गेटवे अस्थायी कोटा समाप्ति को गैर-पुनः प्रयास-योग्य HTTP स्टेटस के साथ
संकेतित करते हैं। `agentrouter.org` मानक `429` के बजाय चीनी बॉडी
(`用户额度不足` / `额度不足`) के साथ `403` (कभी-कभी `400`) लौटाता है। Claude
Code जैसे क्लाइंट `403` को स्थायी मानते हैं और सेशन निरस्त कर देते हैं, और सुधार
के बिना फ़ॉलबैक इंजन इसे कोटा इवेंट के बजाय `AUTH_ERROR` के रूप में वर्गीकृत
करेगा।

**कार्यान्वयन:**

- रजिस्ट्री + मैचर: `open-sse/config/upstreamStatusRestatement.ts` — नियमों की
  प्रति-प्रोवाइडर सूची (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), जिसका मिलान `applyStatusRestatement()`
  के माध्यम से किया जाता है।
- कॉल साइट: `open-sse/handlers/chatCore.ts` में `providerFailure:` ब्लॉक
  (लगभग पंक्ति 3654), ठीक उस समय जब `parseUpstreamError()` त्रुटिपूर्ण HTTP
  स्टेटस (`!providerResponse.ok`) वाला अपस्ट्रीम रिस्पॉन्स पार्स करता है, और
  किसी भी वर्गीकरण के चलने से पहले, ताकि प्रत्येक डाउनस्ट्रीम उपभोक्ता सुधारा
  गया स्टेटस देख सके। किसी `200` SSE स्ट्रीम के भीतर एम्बेड की गई त्रुटियां एक
  अलग, बाद वाले स्ट्रीम-पार्सिंग पथ का अनुसरण करती हैं और आज इस हुक द्वारा
  **कवर नहीं** की जातीं — यह एक ज्ञात सीमा है, जिसकी अभी agentrouter के गलत
  स्टेटस के लिए आवश्यकता नहीं है (जो त्रुटिपूर्ण HTTP स्टेटस के रूप में सामने
  आता है)।
- पुनः प्रयास पात्रता: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) में है, इसलिए पुनर्कथित
  त्रुटि निष्क्रिय `403` के रूप में सामने आने के बजाय वास्तविक पुनः प्रयास
  विंडो रखती है।
- कृत्रिम `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) केवल वह
  है जो पुनर्कथित रिस्पॉन्स **क्लाइंट** को बताता है; यह स्वयं कनेक्शन की आंतरिक
  कूलडाउन/लॉकआउट अवधि नहीं है — उसे उस तंत्र द्वारा अलग से नियंत्रित किया जाता
  है जो वास्तव में पुनर्कथित त्रुटि को संभालता है (Connection Cooldown का बढ़ता
  हुआ बैकऑफ़, §2, API-key प्रोवाइडर के लिए आधार `3s`; या agentrouter जैसे
  प्रति-मॉडल-कोटा प्रोवाइडर के लिए Model Lockout, §3)। राउटर आंतरिक रूप से
  क्लाइंट को विज्ञापित की गई 60s विंडो से पहले पुनः प्रयास के योग्य हो सकता है
  — यह जानबूझकर रखा गया अतिरिक्त अंतर है, बग नहीं।

स्थायी त्रुटियों (agentrouter का `无权访问模型` — इस मॉडल तक पहुंच नहीं है) का
पुनर्कथन **कभी नहीं** किया जाता: `textMarkers` से मिलान होने पर भी
`excludeMarkers` नियम को वीटो कर देता है, इसलिए त्रुटि अपना मूल स्टेटस बनाए
रखती है और कोई भी इसका अनंत समय तक पुनः प्रयास नहीं करता। संबंधित प्रोवाइडर
वर्गीकरण नियम
(`open-sse/config/providerErrorRules.ts` में `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, घोषित आधार कूलडाउन `6h`) से
`checkFallbackError` (`open-sse/services/accountFallback.ts`) द्वारा सामान्य
apikey-श्रेणी वाले `FORBIDDEN` प्रारंभिक-रिटर्न से _पहले_ परामर्श किया जाता है,
जिसे `honorsRuleLockScope(provider)` द्वारा गेट किया जाता है (#10334 — वर्तमान
में `providerErrorRules.ts` की `HONORS_RULE_LOCK_SCOPE_PROVIDERS` अनुमतिसूची के
माध्यम से केवल agentrouter तक सीमित)। नियम का घोषित 6h कूलडाउन
`fallbackResult.baseCooldownMs` के रूप में आगे प्रवाहित होता है, लेकिन यह फिर
भी पहले से मौजूद प्रति-मॉडल-कोटा लॉकआउट पथ
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, कूलडाउन स्रोत को
छोड़कर #10334 से अपरिवर्तित) में जाता है: हर दूसरे मॉडल लॉकआउट की तरह इसे
ऑपरेटर के `mlSettings.maxCooldownMs` (डिफ़ॉल्ट `1_800_000ms` / 30min) तक नीचे
सीमित कर दिया जाता है, और _स्थायी रूप से संग्रहीत लॉकआउट कारण_ पहले से मौजूद
हार्डकोडेड `"forbidden"` ही रहता है, नियम का `"auth_error"` नहीं — केवल कूलडाउन
अवधि का शुरू से अंत तक सम्मान किया जाता है, कारण स्ट्रिंग का नहीं। कनेक्शन
स्वयं सक्रिय रहता है; उसी कनेक्शन पर मौजूद अन्य मॉडल अप्रभावित रहते हैं।

पुनः निर्धारित कोटा त्रुटियाँ (`额度不足`) प्रोडक्शन में एक प्रोवाइडर नियम तक पहुँचती हैं
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, इसका अपना कोई घोषित कूलडाउन नहीं — पर्सिस्टेंस लेयर का
स्केल्ड बैकऑफ़ डिफ़ॉल्ट लागू होता है)। #10334 के बाद से,
`ProviderErrorRuleMatch` पर मौजूद `scope` का शुरू से अंत तक उपयोग **होता है**, लेकिन
**केवल** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` अलाउलिस्ट में मौजूद प्रोवाइडरों के लिए
(`providerErrorRules.ts` — वर्तमान में केवल `"agentrouter"`, जिसे
`honorsRuleLockScope()` के माध्यम से गेट किया गया है)। हर अन्य प्रोवाइडर के लिए
`scope` केवल सूचनात्मक बना रहता है, ठीक वैसे ही जैसे #10334 से पहले था।
`checkFallbackError` मिलान किए गए नियम के स्कोप को
`fallbackResult.ruleScope` के रूप में उजागर करता है;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) साझा गार्ड है, जो पुष्टि करता है कि कोई
`ruleScope` वास्तव में कनेक्शन-व्यापी, स्वतः रिकवर होने वाले संकेत के रूप में मानने के लिए सुरक्षित है
(स्कोप `"connection"`, कारण `quota_exhausted`, कभी `permanent` नहीं,
कभी `creditsExhausted` नहीं — किसी भावी नियम द्वारा स्कोप
`"connection"` को स्थायी अकाउंट स्थिति के साथ जोड़ने से बचाव)। दो उपभोक्ता इसे कॉल करते हैं:

- **पर्सिस्टेंस** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  पासथ्रू-प्रोवाइडर की **प्रति-मॉडल** लॉकआउट
  शाखा में जाने के बजाय (agentrouter में `passthroughModels: true` है → `hasPerModelQuota()`
  `true` लौटाता है), यह एक **अस्थायी कनेक्शन कूलडाउन** लागू करता है —
  `testStatus: "unavailable"` + `rateLimitedUntil`, कभी भी टर्मिनल स्थिति नहीं
  (`credits_exhausted`/`banned`/`expired`) — ताकि कूलडाउन समाप्त होने पर कनेक्शन
  मैन्युअल क्रेडेंशियल रीसेट की आवश्यकता के बिना स्वतः रिकवर हो जाए।
  `disableCooling: true` वाले कनेक्शनों के लिए इसे छोड़ा जाता है (#2997): वह ऑप्ट-आउट
  इसके बजाय प्रति-मॉडल लॉकआउट पर पहुँचता है (एक प्रलेखित समझौता —
  शाखा के ऊपर दी गई कोड टिप्पणी देखें)।
- **समान-अनुरोध कॉम्बो रूटिंग** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): वही गार्ड कनेक्शन को
  इन-मेमोरी `exhaustedConnections` सेट में चिह्नित करता है, जिसकी कुंजी
  `${provider}:${connectionId}` होती है। यह केवल ऐसे शेष SAME-REQUEST
  लक्ष्य को छोड़ता है, जो अपने लक्ष्य ऑब्जेक्ट पर _स्वयं ठीक वही `connectionId` रखता हो_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` को `exhaustedConnections` लुकअप से पहले जाँचा जाता है) — एक सामान्य
  मॉडल-सूची कॉम्बो, जिसमें सहोदर लक्ष्य अपना कोई पिन किया हुआ `connectionId` नहीं रखते
  और प्रत्येक डिस्पैच पर केवल रिस्पॉन्स के
  `X-OmniRoute-Selected-Connection-Id` हेडर से एक आईडी रिज़ॉल्व होती है, कभी भी उस कुंजी
  मिलान तक नहीं पहुँचता। उस सामान्य स्थिति में, किसी शेष लेग को अभी-अभी समाप्त हुए
  अकाउंट का दोबारा उपयोग करने से रोकने वाली वास्तविक सुरक्षा यह Set **नहीं** है — वह ऊपर दी गई
  पर्सिस्टेंस लेयर है (कनेक्शन का `rateLimitedUntil` अब भविष्य में है), और साथ ही
  यही गार्ड विफलता के लिए `transientRateLimitedProviders` को दबाता है
  ("दो-चरणीय डिज़ाइन" और `targetExhaustion.ts` में
  `isAgentrouterConnectionQuotaScope` शाखा पर दी गई कोड टिप्पणी देखें): उस
  Set को अचिह्नित छोड़ने पर, `combo.ts` का `allowRateLimitedConnection` फ़ोर्स-अलाउ
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) प्रोवाइडर के
  शेष लेगों के लिए सक्रिय **नहीं** होता, इसलिए क्रेडेंशियल चयन का `rateLimitedUntil`
  फ़िल्टर (`src/sse/services/auth.ts:1238`) सामान्य रूप से लागू रहता है और कोई
  शेष लेग या तो कोई अलग, अब भी पात्र agentrouter
  कनेक्शन चुनता है या कोई क्रेडेंशियल उपलब्ध न होने के कारण विफल हो जाता है — वह बलपूर्वक
  उसी कनेक्शन पर वापस नहीं जाता जिसे इस शाखा ने अभी-अभी कूलडाउन में डाला है।

### दो-चरणीय डिज़ाइन: स्थिति का पुनः निर्धारण, फिर वर्गीकरण

स्थिति का पुनः निर्धारण (`upstreamStatusRestatement.ts`) और प्रोवाइडर
वर्गीकरण नियम (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) अलग-अलग रजिस्ट्री हैं, जो दोनों प्रोवाइडर आईडी
और टेक्स्ट मार्कर के आधार पर कुंजीबद्ध होती हैं, लेकिन वे अलग-अलग स्थानों पर चलती हैं और अलग-अलग
उद्देश्यों की पूर्ति करती हैं: पुनः निर्धारण `chatCore.ts` में HTTP स्थिति को आरंभ में फिर से लिखता है;
वर्गीकरण नियम `checkFallbackError()` के अंदर फ़ॉलबैक `reason` और लॉक `scope`
(`model` / `provider` / `connection`) चुनते हैं
(`open-sse/services/accountFallback.ts`)।

वर्गीकरण नियमों को पूर्ण त्रुटि **टेक्स्ट** (जैसे `额度不足` जैसे बॉडी
मार्कर से मिलान के लिए आवश्यक) केवल `providerErrorRules.ts` की
`FULL_TEXT_RULE_PROVIDERS` अलाउलिस्ट में सूचीबद्ध प्रोवाइडरों के लिए दिखाई देता है —
वर्तमान में केवल `"agentrouter"`। हर अन्य **बिल्ट-इन कैटलॉग** प्रोवाइडर के लिए,
`checkFallbackError`, `getProviderErrorRuleMatch` को केवल संरचित त्रुटि
(`{code, type}`) देता है, जो हेडर/स्थिति/कोड-आधारित नियमों के लिए पर्याप्त है, लेकिन
बॉडी-टेक्स्ट मार्करों को नहीं देख सकता। हेल्पर `resolveRuleMatchBody()` यह चयन करता है:
अलाउलिस्ट किए गए प्रोवाइडरों के लिए पूर्ण त्रुटि टेक्स्ट, अन्यथा संरचित त्रुटि। किसी
**बिल्ट-इन** प्रोवाइडर को `FULL_TEXT_RULE_PROVIDERS` में जोड़ना एक स्पष्ट प्रति-प्रोवाइडर
ऑप्ट-इन है — यह इसलिए मौजूद है ताकि सूची में न होने वाले हर प्रोवाइडर का डिफ़ॉल्ट पथ
बाइट-दर-बाइट अपरिवर्तित रहे।

किसी नियम का `scope` (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS` से अलग ऑप्ट-इन है: `checkFallbackError` इसे केवल
`fallbackResult.ruleScope` के रूप में उजागर करता है, और डाउनस्ट्रीम उपभोक्ता इसे
सिर्फ उन्हीं प्रोवाइडरों के लिए सूचनात्मक लेबल से अधिक कुछ मानते हैं, जो उसी फ़ाइल की
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` अलाउलिस्ट में हैं (`gated via
honorsRuleLockScope()` — वर्तमान में केवल `"agentrouter"`)। कोई प्रोवाइडर उस
अलाउलिस्ट में आ जाने के बाद `scope: "connection"` का मिलान वास्तव में क्या करता है,
इसके लिए ऊपर "पुनः निर्धारित कोटा त्रुटियाँ" देखें।

**#11104 — ऑपरेटर द्वारा घोषित नियम दोनों अनुमतिसूचियों को बायपास करते हैं।** कोई ऑपरेटर
`settings.providerErrorRules` के माध्यम से रनटाइम पर प्रति-प्रदाता नियम घोषित कर सकता है
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
और इसके लिए इस फ़ाइल को संपादित करने की आवश्यकता नहीं है। किसी ऑपरेटर नियम को
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` के पीछे गेट करना — ये अनुमतिसूचियाँ
अंतर्निहित कैटलॉग नियमों के **डिफ़ॉल्ट** व्यवहार की सुरक्षा के लिए बनाई गई हैं — सेटिंग्स
तंत्र को पहले से वहाँ सूचीबद्ध प्रदाताओं को छोड़कर हर प्रदाता के लिए निष्क्रिय
बना देगा, क्योंकि नियम घोषित करना पहले से ही ऑपरेटर का स्पष्ट
ऑप्ट-इन है। `resolveRuleMatchBody()` और `honorsRuleLockScope()` दोनों पहले
`hasOperatorRuleForProvider()` की जाँच करते हैं: ऑपरेटर नियम वाला प्रदाता
अपरिष्कृत त्रुटि टेक्स्ट प्राप्त करता है और उसके घोषित `scope` का सम्मान किया जाता है, भले ही
वह किसी भी अनुमतिसूची में दिखाई देता हो या नहीं।

**ज्ञात कमी — HTTP 400 के लिए `providerRuleRegistry` से कभी परामर्श नहीं लिया जाता।**
`checkFallbackError` की `BAD_REQUEST` शाखा स्थिति 400 को पूरी तरह
अपने स्वयं के पैटर्न ऐरे (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, आदि `accountFallback.ts` में) के माध्यम से वर्गीकृत करती है और
उसके ऊपर वाली `configuredRule`/`getProviderErrorRuleMatch` शाखा तक पहुँचने से पहले
वापस लौट जाती है। `status: 400` वाला कोई अंतर्निहित कैटलॉग नियम (या ऑपरेटर नियम)
वाक्य-विन्यास की दृष्टि से मान्य है, लेकिन वह कभी सक्रिय नहीं होगा। आज कोई मौजूदा नियम 400 को लक्षित नहीं करता,
इसलिए उत्पादन में कुछ भी प्रभावित नहीं है — लेकिन भविष्य के किसी 400 नियम के लिए पहले इस
शाखा को बदलना होगा, जो केवल नियम जोड़ने से बड़ा परिवर्तन है (यह उन सभी प्रदाताओं के लिए
400 का पुनर्वर्गीकरण करता है जो पहले से पैटर्न-ऐरे व्यवहार पर निर्भर हैं)
और एकल-प्रदाता नियम जोड़ने के दायरे से बाहर है।

### कोटा को गलत ढंग से बताने वाला नया गेटवे जोड़ना

1. `statusRestatementRegistry` में एक नियम ऐरे पंजीकृत करें
   (`open-sse/config/upstreamStatusRestatement.ts`)। `textMarkers` को
   प्रदाता-विशिष्ट रखें; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) से टकराने वाले सामान्य अंग्रेज़ी वाक्यांशों का कभी पुनः उपयोग न करें।
2. सही लॉक स्कोप (`connection` खाता-व्यापी कोटा के लिए, `model`
   प्रति-मॉडल त्रुटियों के लिए) चुनने हेतु वैकल्पिक रूप से
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) में वर्गीकरण नियम पंजीकृत करें।
   यह चरण उत्पादन में केवल उन प्रदाताओं के लिए प्रभावी होता है जिनके नियमों को पूर्ण त्रुटि टेक्स्ट
   (बॉडी मार्कर) की आवश्यकता होती है: उसी फ़ाइल में प्रदाता आईडी को
   `FULL_TEXT_RULE_PROVIDERS` में जोड़ें — अन्यथा `checkFallbackError` नियम को केवल
   संरचित `{code, type}` त्रुटि ही देता है और बॉडी-टेक्स्ट नियम लाइव ट्रैफ़िक से कभी मेल नहीं खाएगा।
   केवल `status`/`headers` पर मेल खाने वाले नियमों (जैसे Opencode या
   Minimax के नियम) को इस ऑप्ट-इन की आवश्यकता नहीं होती। अलग से, यदि नियम
   `scope: "connection"` घोषित करता है और उद्देश्य वास्तविक कनेक्शन-व्यापी कूलडाउन
   के साथ उसी अनुरोध में कॉम्बो को स्किप करना है (न कि केवल सूचनात्मक लेबल), तो
   उसी फ़ाइल में प्रदाता आईडी को `HONORS_RULE_LOCK_SCOPE_PROVIDERS` में जोड़ें — यही
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) और
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) में
   `isAgentrouterConnectionQuotaScope()`-शैली के उपभोग को गेट करता है; इसके बिना, `scope`
   अब भी `fallbackResult.ruleScope` के माध्यम से प्रवाहित होता है, लेकिन उस पर कोई कार्रवाई नहीं होती।
3. `tests/unit/upstream-status-restatement.test.ts`
   और `tests/unit/agentrouter-error-rules.test.ts` के अनुरूप यूनिट परीक्षण जोड़ें (इनमें
   not-permanent / not-creditsExhausted गार्ड शामिल हों, और — यदि प्रदाता को
   अनुमतिसूची की आवश्यकता है — ऐसा परीक्षण भी हो जो पुष्टि करे कि `resolveRuleMatchBody()` केवल
   उस प्रदाता के लिए पूर्ण टेक्स्ट लौटाता है)।

`chatCore.ts`, `classifyError`, या कॉम्बो में किसी बदलाव की आवश्यकता नहीं है।

#### इग्रेस-बकेटेड लॉक (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode परिवार) में मौजूद प्रदाताओं को
IP-बकेटेड अपस्ट्रीम माना जाता है (opencode फ़्री टियर IP-बकेटेड है, न कि
खाता-बकेटेड — #9611 देखें): `quota_exhausted` **या**
`rate_limit_exceeded` के रूप में वर्गीकृत स्थिति-429, रोटेशन द्वारा उन्हें आज़माए जाने से पहले,
अनुमतिसूचीबद्ध परिवार के हर उस कनेक्शन को कूलडाउन करता है
जिसका अंतिम ज्ञात इग्रेस IP विफल कनेक्शन के IP से मेल खाता है
— इससे N-1 ऐसे अपस्ट्रीम कॉल बचते हैं जिनका विफल होना सुनिश्चित है (#10460/#10525 जैसा ही स्वरूप)।
`rate_limit_exceeded` को जानबूझकर शामिल किया गया है: `markAccountUnavailable`
पथ पर opencode-विशिष्ट नियम कभी मेल नहीं खाते (`checkFallbackError` को कोई हेडर/बॉडी नहीं दिया जाता,
opencode `FULL_TEXT_RULE_PROVIDERS` में नहीं है), इसलिए जिस 429 की
बॉडी में सदस्यता-कोटा टेक्स्ट ("monthly usage limit
reached") होता है, उसे `status_429` नियम तक पहुँचने से पहले ही कोटा-टेक्स्ट फ़ॉलबैक
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 घंटे का कूलडाउन) द्वारा
`quota_exhausted` के रूप में वर्गीकृत कर दिया जाता है — जबकि कोटा-टेक्स्ट-रहित 429 (सामान्य
रेट लिमिटिंग) को `status_429` नियम के माध्यम से `rate_limit_exceeded` के रूप में वर्गीकृत किया जाता है
और फिर भी IP परिवार को कूलडाउन करता है। किसी अनुमतिसूचीबद्ध प्रदाता के लिए IP-बकेटेड
रेट लिमिट, समाप्त हो चुके कोटा के समान संकेत है। वास्तविक सीमाएँ:

- **सर्वोत्तम प्रयास**: लॉक `proxy_logs` से कनेक्शन के अंतिम ज्ञात `egress_ip`
  को निर्धारित करता है (24h विंडो, सिंक्रोनस, कोई कैश नहीं)। कोल्ड कैश (egress
  IP की कभी जाँच नहीं हुई) या कोई पंक्ति नहीं → विफल कनेक्शन को फिर भी इस
  ब्रांच द्वारा कूलडाउन किया जाता है (आज की तरह रिकॉर्ड किया जाता है), केवल
  किसी सिबलिंग को लॉक नहीं किया जाता।
- **कभी टर्मिनल नहीं**: कूलडाउन एक नवीनीकृत होने वाली कोटा विंडो है
  (`testStatus: "unavailable"`); किसी IP-स्तरीय सिग्नल से कभी भी स्थायी स्थिति
  निर्धारित नहीं की जाती। `disableCooling` कनेक्शन इस ब्रांच को पूरी तरह छोड़
  देते हैं।
- **अनुमति-सूचीबद्ध फ़ैमिली के लिए लॉक की ग्रैन्युलैरिटी बदलती है**: यह केवल
  सिबलिंग ऑप्टिमाइज़ेशन नहीं, बल्कि स्कोप में बदलाव है। opencode एक
  `passthroughModels` प्रोवाइडर है, इसलिए इस ब्रांच से पहले 429 प्रति-MODEL
  लॉकआउट उत्पन्न करता था; अब यह कनेक्शन कूलडाउन उत्पन्न करता है — इसमें ऐसा
  ऑपरेटर भी शामिल है जो केवल एक कनेक्शन चला रहा हो और जिसका कोई सिबलिंग ही न
  हो। यही वह ग्रैन्युलैरिटी है जिसे opencode नियम तालिका पहले से सही घोषित
  करती है (`scope: "connection"`, `providerErrorRules.ts`), लेकिन अब तक इसका
  पालन कभी नहीं हुआ क्योंकि opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS` में
  नहीं है। यह ब्रांच कनेक्शन-स्कोप वाले agentrouter ब्रांच की नकल करते हुए,
  विफल कनेक्शन का कूलडाउन + `backoffLevel` स्वयं लिखती है और वापस लौट जाती है
  — नीचे दिए गए प्रति-मॉडल ब्लॉक और जेनेरिक पथ तक कभी पहुँचा ही नहीं जाता।
- **कॉम्बो शामिल है**: agentrouter ब्रांच की तरह, यह स्कोप जानबूझकर उस
  `persistUnavailableState`/`isCombo` डाउनग्रेड को अनदेखा करता है जिसे कोई
  कॉम्बो कॉलर 429 पर लागू करता है। प्रति-मॉडल लॉकआउट इस स्कोप का कमजोर रूप
  नहीं है, बल्कि गलत इकाई है: यह समाप्त हो चुके IP के बारे में कुछ नहीं बताता,
  इसलिए कॉम्बो रोटेशन प्रत्येक सिबलिंग पर एक निश्चित रूप से विफल होने वाली कॉल
  खर्च करता रहेगा।
- **सिबलिंग सुरक्षा**: जो सिबलिंग पहले से टर्मिनल (banned/credits_exhausted)
  है या पहले से अधिक लंबे कूलडाउन में है, उसे कभी ओवरराइट नहीं किया जाता।
- **विशिष्ट अनुमति-सूची**: `EGRESS_BUCKETED_LOCK_PROVIDERS` को विस्तृत करना
  स्वामी का स्पष्ट निर्णय है; कोई जेनेरिक वायरिंग नहीं (पैटर्न
  #10334/#10419)। सिबलिंग क्वेरी उसी अनुमति-सूची को SQL लिटरल के रूप में
  दोहराने के बजाय बाइंड करती है, इसलिए उसे विस्तृत करना एक-पंक्ति का बदलाव
  बना रहता है।
- **Egress IP रोटेशन, दोनों दिशाओं में**: लुकअप विंडो (24h), egress-IP कैश
  TTL (5 min) से बहुत अधिक चौड़ी है, इसलिए "अंतिम ज्ञात IP" इतिहास है, वर्तमान
  स्थिति नहीं। यदि किसी कनेक्शन का प्रॉक्सी इस विंडो के भीतर रोटेट हुआ है, तो
  लॉक वास्तव में साझा किए गए IP को **चूक** सकता है (रिकॉर्ड किया गया IP नया,
  गैर-समाप्त IP है) — और इसी प्रकार यह किसी ऐसे सिबलिंग को **कूलडाउन कर सकता
  है जो उसके बाद समाप्त IP से दूर रोटेट हो चुका है**। दूसरे मामले में उस
  सिबलिंग को एक कूलडाउन विंडो का नुकसान होता है; दोनों को इतिहास-आधारित लुकअप
  की स्वीकृत सर्वोत्तम-प्रयास सीमाएँ माना गया है।
- **लागत**: `proxy_logs` के दो सीमित स्कैन (`idx_pl_timestamp` के माध्यम से
  विंडो-फ़िल्टर किए गए), केवल 429 की आवृत्ति पर। कोई नया इंडेक्स नहीं
  (माइग्रेशन 134 YAGNI)। मध्यम आकार की वास्तविक-ट्रैफ़िक DB प्रति पर मापा गया;
  उच्च-थ्रूपुट इंस्टेंस समान विंडो में आनुपातिक रूप से अधिक पंक्तियाँ रखता है।

---

## अन्य लचीलापन सुविधाएँ

- **19 रूटिंग रणनीतियाँ** (प्राथमिकता, भारित, राउंड-रॉबिन, कॉन्टेक्स्ट-रिले, फिल-फर्स्ट, p2c, रैंडम, सबसे-कम-उपयोग, लागत-अनुकूलित, रीसेट-अवेयर, रीसेट-विंडो, हेडरूम, स्ट्रिक्ट-रैंडम, ऑटो, lkgp, कॉन्टेक्स्ट-अनुकूलित, कैश-अनुकूलित, फ़्यूज़न, पाइपलाइन) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) देखें।
- **रीसेट-अवेयर रूटिंग** (v3.8.0) — कोटा रीसेट समय के आधार पर कनेक्शनों को प्राथमिकता देती है।
- **बैकग्राउंड मोड अवनयन** — Responses API `background: true` को चेतावनी के साथ सिंक मोड में अवनत किया जाता है।
- **डायनेमिक टूल सीमा पहचान** — टूल संख्या की सीमा पूरी होने पर प्रोवाइडरों से पीछे हटती है।
- **आपातकालीन फ़ॉलबैक** — `OMNIROUTE_EMERGENCY_FALLBACK` द्वारा नियंत्रित; ऑपरेटर बिना रीस्टार्ट किए Feature Flags पेज से इसे ओवरराइड कर सकते हैं।

---

## डीबगिंग

- भारित कॉम्बो से `503 all_targets_cooling_down` उत्तर मिलता है (`Retry-After` सेट होता है और `diagnostics.excluded` प्रत्येक लक्ष्य को `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` के साथ सूचीबद्ध करता है) → पूल कॉन्फ़िगर और कनेक्टेड है, लेकिन प्रत्येक लक्ष्य किसी रेज़िलिएंस टाइमर द्वारा बाहर रखा गया है; `[COMBO] Weighted selection: every target excluded before dispatch — …` चेतावनी कारणों और शेष सेकंडों को बताती है। उसी कॉम्बो से `404 no_executable_targets` मिलने का अर्थ है कि कोई रेज़िलिएंस टाइमर शामिल नहीं था (चलाने के लिए कुछ नहीं है या प्रत्येक अकाउंट उपलब्धता जाँच में विफल रहा)। इसे `targetResolution.ts` में एकत्र किए गए एक्सक्लूज़न से `open-sse/services/combo/pinRecovery.ts` में बनाया गया है।
- किसी प्रोवाइडर की सभी कुंजियाँ छोड़ दी गईं → सर्किट ब्रेकर की स्थिति और प्रत्येक कनेक्शन के `rateLimitedUntil`/`testStatus`, दोनों की जाँच करें।
- रीसेट विंडो के बाद प्रोवाइडर स्थायी रूप से बाहर रखा गया है → कोड `getStatus()`/`canExecute()` के बजाय सीधे `state` पढ़ रहा है।
- एक कुंजी विफल होती है, लेकिन अन्य को काम करना चाहिए → सर्किट ब्रेकर के बजाय कनेक्शन कूलडाउन को प्राथमिकता दें।
- केवल एक मॉडल विफल होता है → कनेक्शन कूलडाउन के बजाय मॉडल लॉकआउट को प्राथमिकता दें।
- स्थिति को अपने-आप रिकवर होना चाहिए, लेकिन ऐसा नहीं होता → भविष्य के टाइमस्टैम्प और उस रीड पाथ की जाँच करें जो समाप्त हो चुकी स्थिति को रीफ़्रेश करता है। स्थायी स्थितियों के लिए मैन्युअल बदलाव आवश्यक हैं।

---

## TLS फ़िंगरप्रिंटिंग और स्टेल्थ

प्रोवाइडर-विशिष्ट स्टेल्थ (JA3/JA4, CCH, ऑब्फ़स्केशन) का दस्तावेज़ीकरण अलग से किया गया है — `docs/security/STEALTH_GUIDE.md` देखें (git में; `/docs` में संकलित नहीं)।

---

## लचीलापन परीक्षण (चरण 8 · ब्लॉक C)

लचीलापन लॉजिक के यूनिट टेस्ट के अतिरिक्त, तीन टेस्ट वास्तविक तनाव/विफलता
स्थितियों में रनटाइम का परीक्षण करते हैं (सभी इंटीग्रेशन/नाइटली हैं — कोई भी PR को ब्लॉक नहीं करता):

| टेस्ट      | क्या                                                                                                                                                                                                                            | चलाने का तरीका                          |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| कैओस       | फ़ेक-अपस्ट्रीम नोड वास्तविक विलंबता/रीसेट/टाइमआउट/503 इंजेक्ट करता है; सत्यापित करता है कि सर्किट ब्रेकर खुलता/पुनर्प्राप्त होता है और `checkFallbackError` 503 को पुनर्प्राप्त करने योग्य फ़ॉलबैक के रूप में वर्गीकृत करता है। | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| हीप-वृद्धि | `--expose-gc` के अंतर्गत प्रति `createSSEStream` ~500 स्ट्रीम; यदि हीप निर्धारित सीमा से अधिक बढ़ता है, तो विफल हो जाता है (OOM गार्ड #3069)।                                                                                   | `npm run test:heap`                     |
| k6 सोक     | `/api/monitoring/health` पर निरंतर लोड; p95/त्रुटि थ्रेशोल्ड।                                                                                                                                                                   | `k6 run tests/load/k6-soak.js` (नाइटली) |

इसे `.github/workflows/nightly-resilience.yml` (क्रॉन + डिस्पैच) द्वारा ऑर्केस्ट्रेट किया जाता है।
डिफ़ॉल्ट `test:integration` में, कैओस और हीप स्वयं स्किप हो जाते हैं (`RUN_CHAOS_INT`/`--expose-gc` के बिना)।

---

## यह भी देखें

- [आर्किटेक्चर गाइड](./ARCHITECTURE.md) — सिस्टम आर्किटेक्चर और आंतरिक संरचना
- [उपयोगकर्ता गाइड](../guides/USER_GUIDE.md) — प्रोवाइडर, कॉम्बो, CLI एकीकरण
- [ऑटो-कॉम्बो इंजन](../routing/AUTO-COMBO.md) — 16-कारक स्कोरिंग, मोड पैक
