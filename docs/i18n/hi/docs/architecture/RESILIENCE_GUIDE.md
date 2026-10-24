# Resilience Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute में तीन अलग-अलग लेकिन संबंधित रेज़िलिएंस मेकैनिज़्म हैं। प्रत्येक का दायरा और उद्देश्य अलग है। रूटिंग व्यवहार को डीबग करते समय इन्हें अलग रखें।

![3-लेयर रेज़िलिएंस मॉडल](../diagrams/exported/resilience-3layers.svg)

> स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. प्रोवाइडर सर्किट ब्रेकर

**दायरा:** पूरा प्रोवाइडर (जैसे, `glm`, `openai`, `anthropic`)।

**उद्देश्य:** ऐसे प्रोवाइडर को ट्रैफ़िक भेजना रोकना जो अपस्ट्रीम/सेवा स्तर पर बार-बार विफल हो रहा है।

**कार्यान्वयन:**

- कोर क्लास: `src/shared/utils/circuitBreaker.ts`
- वायरिंग: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- स्टेटस API: `GET /api/monitoring/health`
- रीसेट API: `POST /api/resilience/reset`
- रैपर: `open-sse/services/accountFallback.ts`
- DB टेबल: `domain_circuit_breakers`

**स्थितियाँ:**

- `CLOSED` — सामान्य ट्रैफ़िक की अनुमति है
- `DEGRADED` — ट्रैफ़िक अभी भी अनुमत है, लेकिन प्रोवाइडर की बढ़ी हुई विफलताएँ ट्रैक की जा रही हैं; पर्याप्त सफलताओं पर, किसी मान्य कनेक्शन टेस्ट पर, या बिना किसी नई विफलता के अंतिम विफलता प्रकार के लिए सबसे लंबे `OPEN` होल्ड के बाद (उसका `cooldownByKind` मान, अन्यथा `resetTimeout`, × `maxBackoffMultiplier`, कम से कम एक कूलडाउन) यह `CLOSED` में लौटता है
- `OPEN` — प्रोवाइडर अस्थायी रूप से अवरुद्ध है; कॉम्बो रूटिंग इसे छोड़ देती है
- `HALF_OPEN` — रीसेट टाइमआउट बीत गया; प्रोब अनुरोध की अनुमति है

**कॉन्फ़िगर करने योग्य डिफ़ॉल्ट (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience में एक्सपोज़ किए गए):**

| क्लास   | डिग्रेडेड कब | खुलता है कब | रीसेट टाइमआउट |
| ------- | ------------ | ----------- | ------------- |
| OAuth   | 5 विफलताएँ   | 8 विफलताएँ  | 60s           |
| API-key | 7 विफलताएँ   | 12 विफलताएँ | 30s           |
| लोकल    | व्युत्पन्न   | 2 विफलताएँ  | 15s           |

`degradationThreshold` नियंत्रित करता है कि कोई प्रोवाइडर कब `DEGRADED` में प्रवेश करता है; `failureThreshold` नियंत्रित करता है कि यह कब खुलता है और छोड़ दिया जाता है। लोकल प्रोवाइडर प्रोफ़ाइल अभी तक Resilience सेटिंग्स पेज पर एक्सपोज़ नहीं किए गए हैं।

**ट्रिप कोड:** केवल प्रोवाइडर-स्तरीय स्टेटस `[408, 500, 502, 503, 504]`। अकाउंट-स्तरीय त्रुटियों के लिए ट्रिप न करें (अधिकांश 401/403/429 — वे कूलडाउन या लॉकआउट के अंतर्गत आते हैं)।

**लेज़ी रिकवरी:** जब `OPEN` समाप्त हो जाता है, तो `getStatus()`, `canExecute()`, `getRetryAfterMs()` स्थिति को `HALF_OPEN` में रीफ़्रेश करते हैं। वही रीड्स (और अगली विफलता) एक पुराने `DEGRADED` को वापस `CLOSED` में ले जाती हैं। किसी बैकग्राउंड टाइमर की आवश्यकता नहीं है।

---

### ऑप्ट-इन ग्लोबल प्रोवाइडर कूलडाउन (विंडो गेट)

एक चौथी, **ऑप्ट-इन** परत (`PROVIDER_COOLDOWN_ENABLED`, डिफ़ॉल्ट **बंद**) विफल प्रोवाइडर्स की
क्रॉस-रिक्वेस्ट मेमोरी
`open-sse/services/providerCooldownTracker.ts` में रखती है, जिसे कॉम्बो टारगेट
रिज़ॉल्यूशन द्वारा देखा जाता है ताकि लगातार कॉम्बो रिक्वेस्ट उस प्रोवाइडर पर दोबारा न जाएँ जो अभी
विफल हुआ है। प्रोवाइडर-स्तरीय एंट्रियाँ `PROVIDER_PROFILES` विंडो गेट का पालन करती हैं:

| प्रोफ़ाइल | कितने बाद ट्रिप (`providerFailureThreshold`) | अंदर (`providerFailureWindowMs`) | कितने समय कूल (`providerCooldownMs`) |
| --------- | -------------------------------------------: | -------------------------------: | -----------------------------------: |
| OAuth     |                                         `10` |                          `15min` |                               `5min` |
| API key   |                                         `15` |                          `30min` |                              `10min` |

सीमा से नीचे प्रोवाइडर को कूलिंग में **नहीं** माना जाता; एक सफलता विंडो को साफ़ कर देती है। कनेक्शन-स्तरीय एंट्रियाँ (`provider:connectionId`) इसके बजाय एक्सपोनेंशियल `minRetryCooldownMs → maxRetryCooldownMs` बैकऑफ़ रखती हैं। ओवरराइड:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`।
रिग्रेशन गार्ड: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. कनेक्शन कूलडाउन

**दायरा:** एकल प्रोवाइडर कनेक्शन/अकाउंट/कुंजी।

**उद्देश्य:** एक खराब कुंजी को छोड़ देना, जबकि उसी प्रोवाइडर के अन्य कनेक्शन सेवा देते रहें।

**कार्यान्वयन:**

- अनुपलब्ध चिह्नित करना: `src/sse/services/auth.ts::markAccountUnavailable()`
- चयन: उसी फ़ाइल में `getProviderCredentials*`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्स: `src/lib/resilience/settings.ts`

**प्रत्येक कनेक्शन के फ़ील्ड:**

- `rateLimitedUntil` — वह टाइमस्टैम्प जिस तक कूलडाउन समाप्त होता है
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — एक्सपोनेंशियल बैकऑफ़ काउंटर

**डिफ़ॉल्ट कूलडाउन:**

- OAuth आधार: 5s
- API-कुंजी आधार: 3s
- API-कुंजी 429: अपस्ट्रीम `Retry-After`/रीसेट हेडर/पार्स-योग्य रीसेट टेक्स्ट को प्राथमिकता देता है
- बैकऑफ़: `baseCooldownMs * 2 ** failureIndex`

**एंटी-थंडरिंग-हर्ड गार्ड:** समवर्ती विफलताओं से कूलडाउन के अत्यधिक लंबा होने या `backoffLevel` के दो बार बढ़ने से बचाता है।

**कंकरेंसी-सीमा वाले 429 बैकऑफ़ सीढ़ी पर नहीं चढ़ते।** ऐसा `429` जिसका बॉडी कंकरेंसी सीमा की
रिपोर्ट करता है ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) का अर्थ है कि अकाउंट स्वस्थ है लेकिन व्यस्त है।
`checkFallbackError()` कारण `concurrency_limited` लौटाता है: तुरंत अगले
कनेक्शन पर फ़ेलओवर करें, इस कनेक्शन को निश्चित `CONCURRENCY_LIMIT_COOLDOWN_MS` (1s) या
अपस्ट्रीम रीट्राई संकेत के लिए कूल करें, `backoffLevel` को अपरिवर्तित रखें, और `skipProviderBreaker`
सेट करें। स्पष्ट कोटा बॉडी अभी भी प्राथमिकता पाती है, इसलिए जो बॉडी कोटा पैटर्न से भी मेल खाती है
वह कोटा निर्णय ही रहती है। पहचान: `src/shared/utils/classify429.ts` में `looksLikeConcurrencyLimit()`;
निर्णय: `open-sse/services/accountFallback/concurrencyLimit429.ts`। `classify429()` (ब्रेकर का
`FailureKind`) अपरिवर्तित है और इन बॉडी के लिए अभी भी `rate_limit` पढ़ता है।

**स्ट्रीम कंटेंट स्टॉल अकाउंट को कूल नहीं करते।** जब कंटेंट-स्टॉल वॉचडॉग
(`open-sse/utils/streamHandler.ts`) किसी ऐसी स्ट्रीम से हार मान लेता है जिसने समय पर कोई मॉडल आउटपुट
नहीं भेजा, तो `markAccountUnavailable()` कनेक्शन पर त्रुटि दर्ज करता है लेकिन कोई
कूलडाउन सेट नहीं करता: स्टॉल उस रिक्वेस्ट से संबंधित है, जो अक्सर एक लंबा रीज़निंग टर्न होता है
जिसमें अभी तक कोई आउटपुट नहीं आया है। ऑपरेटर `resilienceSettings.streamStallCooldown.enabled`
(डिफ़ॉल्ट `false`) के साथ फिर से ऑप्ट-इन कर सकते हैं।

**रीज़निंग फ़्रेम कंटेंट-स्टॉल बजट को पुनः आरंभ करते हैं।** एक रीज़निंग मॉडल अपने पहले दिखाई देने वाले
टोकन से पहले मिनटों तक सोच सकता है: Claude ऐसे `thinking_delta` फ़्रेम स्ट्रीम करता है
जिनका थिंकिंग टेक्स्ट खाली हो सकता है, और Responses API एक के बाद एक रीज़निंग आइटम
स्ट्रीम करता है। `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) इन
फ़्रेमों को पहचानता है, और वॉचडॉग टर्न को रद्द करने के बजाय प्रत्येक पर अपना बजट पुनः आरंभ करता है।
वे फिर भी मॉडल आउटपुट नहीं हैं, इसलिए जो टर्न केवल रीज़निंग के साथ समाप्त होता है वह अभी भी खाली
रिपोर्ट किया जाता है, और जो टर्न रीज़निंग बंद करके केवल हार्टबीट भेजता है वह अभी भी वॉचडॉग
को ट्रिगर करता है।

गैर-खाली सिग्नेचर वाले Kiro के बाइनरी `reasoningContentEvent` फ़्रेम इस रीज़निंग गतिविधि को
एग्जीक्यूटर के माध्यम से एक खाली `reasoning_content` डेल्टा के रूप में संरक्षित करते हैं। सिग्नेचर
अग्रेषित नहीं किया जाता है। मेटाडेटा, अधूरे फ़्रेम और खाली सिग्नेचर कंटेंट बजट को पुनः आरंभ
नहीं करते; स्वतंत्र सक्रिय-स्ट्रीम टाइमआउट और क्लाइंट रद्दीकरण अभी भी लागू होते हैं
(`open-sse/executors/kiro/reasoning.ts`)।

**टर्मिनल अवस्थाएँ (कूलडाउन नहीं):**

- `banned` — प्रतिबंधित-कीवर्ड / अकाउंट-बैन पहचान द्वारा सेट किया जाता है (देखें [BAN_DETECTION](../security/BAN_DETECTION.md)), और लगातार तीन अपस्ट्रीम प्रति-रिक्वेस्ट अस्वीकारों द्वारा (`request_rejected`, जैसे Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); एकल अस्वीकार केवल कनेक्शन को कूल करता है
- `expired` (सीमित पुनःप्रयासों के बाद टर्मिनल में परिवर्तित होता है — एक्सपोनेंशियल बैकऑफ़ के साथ `EXPIRED_RETRY_MAX = 3` — ताकि क्षणिक OAuth त्रुटियाँ अकाउंट के स्थायी रूप से निष्क्रिय होने से पहले स्वयं ठीक हो सकें)
- `credits_exhausted`

ये तब तक बनी रहती हैं जब तक क्रेडेंशियल नहीं बदलते या कोई ऑपरेटर उन्हें रीसेट नहीं करता। टर्मिनल अवस्थाओं को क्षणिक कूलडाउन अवस्था से ओवरराइट न करें।

**आलसी रिकवरी:** जब `rateLimitedUntil` बीत जाता है, तो कनेक्शन फिर से योग्य हो जाता है। सफल उपयोग पर, `clearAccountError()` सभी त्रुटि फ़ील्ड साफ़ करता है।

### Claude OAuth उपयोग सीमा: निम्न-प्राथमिकता लेन + सत्र-सीमा रीसेट

**दायरा:** एक Claude सब्सक्रिप्शन (OAuth) कनेक्शन। दोनों सुविधाएँ **प्रति-कनेक्शन ऑप्ट-इन**
हैं (कनेक्शन संपादित करें → Claude अनुभाग → `providerSpecificData` में `lowPriorityMode` / `autoLimitReset`,
दोनों डिफ़ॉल्ट रूप से बंद) और Claude Code के `/low-priority` और
`/limit-reset` कमांड की नकल करती हैं (वायर कॉन्ट्रैक्ट Claude Code 2.1.263 से कैप्चर किया गया)।

**कार्यान्वयन:**

- स्टेट मशीन + रिस्पॉन्स वर्गीकरण: `open-sse/services/claudeLowPriority.ts`
- रीसेट स्थिति/क्लेम क्लाइंट: `open-sse/services/claudeLimitReset.ts`
- एग्जीक्यूटर हुक (हेडर इंजेक्शन + उसी-अकाउंट रीट्राई): `open-sse/executors/base.ts::execute()`
- ऑप्ट-इन पर्सिस्टेंस: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ट्रिगर:** 5-घंटे की उपयोग सीमा — एक `429` जिसके हेडर में
`anthropic-ratelimit-unified-status: rejected` होता है और, जब अकाउंट योग्य होता है,
`anthropic-ratelimit-unified-slow-offer: treatment`। उस पहली सीमा 429 से पहले कुछ भी नहीं
भेजा जाता; यूनिफ़ाइड हेडर के बिना एक बर्स्ट 429 सामान्य कूलडाउन पथ से गुजरता है।

**निम्न-प्राथमिकता लेन** (`lowPriorityMode`):

- वॉल 429 पर एक्ज़िक्यूटर ऑफ़र स्वीकार करता है और `anthropic-usage-limit: slow` के साथ तुरंत **उसी** अकाउंट को पुनः प्रयास करता है; लेन घोषित `anthropic-ratelimit-unified-reset` (+60s ग्रेस) तक सक्रिय रहती है और उस विंडो की हर रिक्वेस्ट यह हेडर ले जाती है। इंटरसेप्ट किया गया 429 कभी `handleChatCore` तक नहीं पहुंचता, इसलिए कनेक्शन कूलडाउन में **नहीं** डाला जाता और न ही रोटेट करके हटाया जाता है।
- बाद के रिस्पॉन्स पर `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed` लेन को बनाए रखते हैं; `slot_busy` (429) या `529` सर्वर के `anthropic-ratelimit-unified-slow-retry-after` (डिफ़ॉल्ट 20s, क्लैंप 5–600s, ±30% जिटर) का इंतज़ार करके पुनः प्रयास करते हैं, जो `anthropic-ratelimit-unified-slow-max-wait` (डिफ़ॉल्ट 20 मिनट, क्लैंप 1 मिनट–6 घंटे) तक सीमित है — उससे आगे लेन समाप्त हो जाती है और 10-मिनट का कूल-ऑफ़ पुनः-स्वीकृति को ब्लॉक करता है। यह इंतज़ार अतिरिक्त रूप से रिक्वेस्ट के अपने अपस्ट्रीम-स्टार्ट टाइमआउट (`resolveFetchStartTimeout`, डिफ़ॉल्ट 10 मिनट) में शेष समय से 5 s मार्जिन घटाकर कैप किया जाता है: उस कैप के बिना 20-मिनट का डिफ़ॉल्ट max-wait रिक्वेस्ट से ज़्यादा टिकेगा और स्लीप इंतज़ार के बीच में ही एबॉर्ट हो जाएगी, जिससे सुचारु `max_wait` समाप्ति + कूल-ऑफ़ के बजाय `TimeoutError` उभरेगा।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5-घंटे की विंडो का रोलओवर, या `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (जो इसे किसी भी स्टेटस पर `extra_usage` के रूप में समाप्त कर देता है, क्योंकि अब पेड ओवरेज वॉल को कवर करता है) लेन को समाप्त कर देते हैं; फिर रिस्पॉन्स सामान्य कूलडाउन पथ में बह जाता है। `budget_exhausted` घोषित बजट रीसेट (≤ 8 दिन) तक याद रखा जाता है।
- वॉल चेक एक्ज़िक्यूटर के अपने 400-संचालित इंट्रा-अटेम्प्ट पुनः प्रयासों (कॉन्टेक्स्ट एडिटिंग, thinking/effort क्लैंप, param ऑटो-लर्न) के बाद चलता है, इसलिए ऐसा वॉल 429 जो केवल उन पुनः प्रयासों में से किसी एक पर उभरता है, कूलडाउन पथ तक पहुंचने के बजाय फिर भी इंटरसेप्ट किया जाता है।
- स्टेट प्रति कनेक्शन इन-मेमोरी होती है (रीस्टार्ट पर पुनः-स्वीकृति के लिए एक अतिरिक्त वॉल 429 की लागत लगती है)।

**सेशन-लिमिट रीसेट** (`autoLimitReset`, दोनों चालू होने पर लेन से पहले आज़माया जाता है):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ब्लॉक; जब `arm: "reset"` और `available: true` हो, तो
  `{ "program": "juniper_tide" }` के साथ
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  (ऑर्गनाइज़ेशन UUID `providerSpecificData.organizationUUID` से, बूटस्ट्रैप फ़ॉलबैक)।
- `result: reset|not_limited` → रिक्वेस्ट पूरी गति से पुनः प्रयास की जाती है (कोई slow हेडर नहीं)।
  `already_used` / `not_offered` `next_available_at` को मेमोइज़ करते हैं (डिफ़ॉल्ट एक सप्ताह); कोई भी
  विफलता 15 मिनट बैकऑफ़ करती है। रीसेट सप्ताह में एक बार होता है और फिर भी साप्ताहिक सीमा की
  गिनती में शामिल होता है।

रिग्रेशन गार्ड: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`।

### सेशन एफ़िनिटी (#7274)

**दायरा:** एक क्लाइंट सेशन (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` हेडर) एक कनेक्शन पर पिन किया गया, **किसी भी** प्रोवाइडर के लिए।

**उद्देश्य:** मल्टी-टर्न एजेंट (Claude Code, aider, कस्टम एजेंट) को रिक्वेस्टों के बीच एक ही अकाउंट पर बनाए रखना, जिससे क्रॉस-अकाउंट कॉन्टेक्स्ट हानि घटे और प्रति-अकाउंट सेशन स्टेट वाले प्रोवाइडरों पर बार-बार के कोल्ड-स्टार्ट 429 कम हों।

**कार्यान्वयन:**

- TTL रिज़ॉल्यूशन: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- पिन चयन/निर्माण: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- हेडर एक्सट्रैक्शन (जेनेरिक, कोई भी प्रोवाइडर): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- परसिस्टेड पिन टेबल: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- सेटिंग: `sessionAffinityTtlMs` (ms में ग्लोबल TTL, `0` अक्षम करता है) — `src/lib/db/settings.ts`। माइग्रेशन `124_generic_session_affinity_ttl.sql` द्वारा केवल-Codex वाले `codexSessionAffinityTtlMs` से रिनेम किया गया, जो पहले से कॉन्फ़िगर किए गए किसी भी Codex TTL को नए डिफ़ॉल्ट के रूप में आगे ले जाती है।

#7274 से पहले, `resolveSessionAffinityTtlMs()` `codex` के अलावा हर प्रोवाइडर के लिए हार्ड-बेल करके `0` लौटा देता था, इसलिए TTL सेटिंग (और सेशन हेडर) का कहीं और कोई असर नहीं होता था, भले ही पिनिंग मैकेनिज़्म और हेडर एक्सट्रैक्शन पहले से ही प्रोवाइडर-अज्ञेय थे। फ़िक्स ने वह अर्ली-रिटर्न हटा दिया; अब ग्लोबल रूप से `0` से ऊपर सेट करने पर TTL हर प्रोवाइडर पर एकसमान लागू होता है।

तीनों सेशन-एफ़िनिटी हेडर कभी अपस्ट्रीम फ़ॉरवर्ड नहीं किए जाते — एक्ज़िक्यूटर क्लाइंट हेडर को पास-थ्रू करने के बजाय अपने अपस्ट्रीम हेडर शुरुआत से बनाते हैं, इसलिए यह केवल एक आंतरिक कोरिलेशन id बना रहता है।

### एक्सक्लूसिव मैनेज्ड सेशन कनेक्शन लीज़

**दायरा:** एक सक्रिय मैनेज्ड HTTP क्लाइंट/सेशन एक योग्य OmniRoute कनेक्शन का मालिक होता है।

**उद्देश्य:** उन क्लाइंटों के लिए टिकाऊ एक्सक्लूसिव कनेक्शन स्वामित्व प्रदान करना, जिन्हें रिक्वेस्टों के
बीच एक हार्ड रूटिंग फ़ेंस चाहिए। यह सेशन एफ़िनिटी से अलग है, जो एक सॉफ़्ट निरंतरता वरीयता है:
एक्सक्लूसिव लीज़ SQLite में लाइफ़साइकल स्टेट परसिस्ट करती है, ग्लोबल सक्रिय-मालिक और
सक्रिय-कनेक्शन यूनिकनेस लागू करती है, और प्रोवाइडर डिस्पैच से पहले स्टेल जनरेशन को रिजेक्ट करती है।

यह फ़ीचर प्रति API key ऑप्ट-इन है। मैनेज्ड key के पास `lease:exclusive` स्कोप और एक
स्पष्ट, नॉन-एम्प्टी `allowedConnections` सूची होनी चाहिए। कोई भी HTTP क्लाइंट लाइफ़साइकल एंडपॉइंट का उपयोग कर सकता है; कोई
क्लाइंट नाम, user-agent, प्रोवाइडर, OAuth मेथड या मॉडल आवश्यक नहीं है। लीज़ कनेक्शन का मालिक होती है,
मॉडल का नहीं, इसलिए मॉडल बदलने पर भी बाइंडिंग बनी रहती है, जब तक कनेक्शन सामान्य रूप से योग्य बना रहता है।
सामान्य मॉडल, कोटा, हेल्थ, कूलडाउन और अलाउलिस्ट नियम आधिकारिक बने रहते हैं और
वही जनरेशन किसी अन्य खाली योग्य कनेक्शन में ट्रांज़िशन कर सकते हैं।

जीवनचक्र `POST /api/v1/session-leases` पर JSON क्रियाओं `acquire`, `renew` और `release` के साथ होता है।
प्रबंधित इन्फ़रेंस अनुरोध अपारदर्शी `X-OmniRoute-Lease-Owner` मान और सटीक
`X-OmniRoute-Lease-Generation` प्रस्तुत करते हैं। ओनर `vlo_` के बाद 43 base64url अक्षरों से बना होता है; केवल
इसका SHA-256 हैश ही संग्रहीत किया जाता है। प्रत्येक अंतिम डिस्पैच फ़ेंस प्रमाणित API key ID और
सक्रिय कनेक्शन ID को भी बाइंड करता है। लीज़ नियंत्रण हेडर लॉग, रखे गए अनुरोध स्नैपशॉट और
अपस्ट्रीम एक्ज़ीक्यूटर हेडर से हटा दिए जाते हैं।

यदि सामान्य रूटिंग में योग्य प्रबंधित उम्मीदवार मौजूद हैं लेकिन प्रत्येक मुक्त उम्मीदवार किसी
विदेशी सक्रिय लीज़ से अधिभृत है, तो OmniRoute HTTP `429`, lease-capacity-unavailable कोड,
waiting-for-capacity स्थिति, और संबंधित सबसे शीघ्र समाप्ति से प्राप्त एक सीमित `Retry-After` लौटाता है।
सामान्य रिक्त योग्यता लीज़ विवाद नहीं है और यह अपनी मौजूदा रूटिंग त्रुटि शब्दार्थ को बनाए रखती है।

संबंधित तंत्र अलग-अलग रहते हैं:

- OAuth सत्र अधिभोग OAuth खातों के लिए प्रोसेस-लोकल सॉफ़्ट वितरण है।
- खाता सेमाफ़ोर अनुरोध-समवर्तीता अनुमतियाँ प्रदान करते हैं और अनुरोध पूरा होने पर समाप्त हो जाते हैं।
- विशिष्ट प्रबंधित सत्र लीज़ जनरेशन फ़ेंस के साथ टिकाऊ जीवनचक्र स्वामित्व है।

---

## 3. मॉडल लॉकआउट

**दायरा:** provider + connection + model त्रिक।

**स्टेटस के अनुसार कुंजी दायरा:** विफल स्टेटस तय करता है कि लॉकआउट किस कुंजी पर लिखा जाता है (`open-sse/services/accountFallback/exactModelLock.ts` में `resolveLockoutScope()`):

- `429` / `403` / `402` — कोटा या एनटाइटलमेंट संकेत — **कोटा परिवार** को लॉक करें:
  codex के लिए पूरा `codex` / `spark` दायरा (उस कनेक्शन के हर `gpt-5*` मॉडल), अन्य प्रोवाइडर के लिए `getQuotaScopedModelForProvider()`।
- `404` बेयर मॉडल को लॉक करता है (`getModelLockKey()` `not_found` को संकीर्ण करता है)।
- कोई अन्य स्टेटस — `5xx` ट्रांसपोर्ट/सर्वर विफलताएँ और क्वालिटी वैलिडेशन से OmniRoute का अपना संश्लेषित `502` — केवल **सटीक**
  provider/connection/model टपल को लॉक करता है। किसी एक मॉडल पर खराब स्ट्रीम खाते के कोटा के बारे में प्रमाण नहीं है; इस नियम से पहले `codex/gpt-5.6-luna` पर एक खाली रिस्पॉन्स उस कनेक्शन के हर `gpt-5*` मॉडल को 2–30 मिनट (बढ़ते हुए) के लिए रूटिंग से हटा देता था, जबकि उसका कोटा अछूता था।
- कॉलर का स्पष्ट `scope` विकल्प हमेशा जीतता है (Antigravity `"exact"` पास करता है)।

**उद्देश्य:** जब केवल एक मॉडल अनुपलब्ध या कोटा-सीमित हो तो पूरे कनेक्शन को अक्षम करने से बचना।

**उदाहरण:**

- 429 लौटाने वाले प्रति-मॉडल कोटा प्रोवाइडर
- किसी एक गुम मॉडल के लिए 404 लौटाने वाले लोकल प्रोवाइडर
- प्रोवाइडर-विशिष्ट मोड/मॉडल अनुमति विफलताएँ (जैसे Grok मोड्स)

**कार्यान्वयन:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### मॉडल कूलडाउन डैशबोर्ड (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

सक्रिय लॉकआउट को इसके साथ सूचीबद्ध करता है: provider, connection, model, reason, expiresAt। ऑपरेटर कार्ड से मैन्युअल रूप से किसी मॉडल को पुनः सक्षम कर सकते हैं।

**REST API:**

- `GET /api/resilience/model-cooldowns` — सक्रिय लॉकआउट की सूची
- `DELETE /api/resilience/model-cooldowns` — मैन्युअल पुनः सक्षम करना। बॉडी: `{provider, connection, model}`। ऑथ: management।

### कूलडाउन मैनेजर

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)।

हर उस कनेक्शन के लिए एक पेज जो किसी अस्थायी कारण से रूटिंग से बाहर है, बजाय हर प्रोवाइडर पेज खोलने के। यह कनेक्शन कूलडाउन, मॉडल लॉकआउट और टर्मिनल स्टेट्स की सूची देता है, उन्हें प्रति-कनेक्शन, किसी चयन के लिए, या किसी प्रोवाइडर के सभी कनेक्शनों के लिए क्लियर करता है, और सबसे अधिक ट्यून किए गए कूलडाउन नियमों को संपादित करता है: `streamStallCooldown.enabled` और OAuth / API-key `connectionCooldown` बेस कूलडाउन तथा अधिकतम बैकऑफ़ स्टेप्स (`PATCH /api/resilience` के माध्यम से सहेजे जाते हैं)। टर्मिनल स्टेट्स (`banned`, `expired`, `credits_exhausted`) सूचीबद्ध होते हैं लेकिन यहाँ कभी क्लियर नहीं किए जाते।

**REST API** (`src/lib/resilience/cooldownManager.ts`, ऑथ: management):

- `GET /api/resilience/cooldowns[?provider=]` — स्टेटस, शेष कूलडाउन,
  बैकऑफ़ स्तर, अंतिम त्रुटि प्रकार और मॉडल लॉकआउट के साथ कनेक्शन (कोई क्रेडेंशियल नहीं)
- `POST /api/resilience/cooldowns` — बॉडी `{connectionIds: string[]}` या
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` लौटाता है

### लॉकआउट सेटिंग्स UI + सफलता-क्षय रिकवरी (v3.8.23)

मॉडल लॉकआउट हमेशा-चालू हार्डकोडेड व्यवहार से एक पूरी तरह कॉन्फ़िगर करने योग्य, ऑप्ट-इन फ़ीचर बन गया है जिसका अपना सेटिंग्स कार्ड और स्व-उपचार रिकवरी पथ है।

**सेटिंग्स कार्ड:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
यह ऊपर दिए केवल-पठनीय `ModelCooldownsCard` से **अलग** है (जो केवल सक्रिय लॉकआउट _सूचीबद्ध_ करता है) — नया कार्ड _पैरामीटर कॉन्फ़िगर करता है_। डिफ़ॉल्ट
`DEFAULT_MODEL_LOCKOUT_SETTINGS` में रहते हैं
(`src/lib/resilience/modelLockoutSettings.ts`):

| सेटिंग                  | डिफ़ॉल्ट                         | अर्थ                                                              |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | मास्टर टॉगल — मॉडल लॉकआउट **डिफ़ॉल्ट रूप से बंद** है।             |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | अपस्ट्रीम स्टेटस जो मॉडल-स्कोप्ड विफलता के रूप में गिने जाते हैं। |
| `baseCooldownMs`        | `120_000` (120 s)                | पहली विफलता के लिए प्रारंभिक लॉकआउट अवधि।                         |
| `maxCooldownMs`         | `1_800_000` (30 min)             | बढ़ाए गए कूलडाउन की सीमा।                                         |
| `maxBackoffSteps`       | `10`                             | अधिकतम एक्सपोनेन्शियल-बैकऑफ़ एस्केलेशन स्टेप्स।                   |
| `useExponentialBackoff` | `true`                           | क्या दोहराई गई विफलताएँ कूलडाउन को एक्सपोनेन्शियली बढ़ाती हैं।    |

सेटिंग्स सामान्य सेटिंग्स स्टोर के माध्यम से परसिस्ट होती हैं और रेज़िलियन्स सेटिंग्स स्कीमा द्वारा वैलिडेट होती हैं; कार्ड `baseCooldownMs`/`maxCooldownMs` को क्लैम्प करता है
(`maxCooldownMs ≥ baseCooldownMs` के साथ) और `maxBackoffSteps` को।

**सफलता-क्षय रिकवरी:** रिकवरी **केवल** टाइमर समाप्ति नहीं है। एक स्वस्थ रिस्पॉन्स मॉडल की विफलता संख्या को वापस घटाता है ताकि विंडो के बीच में रिकवर हो चुका मॉडल एस्केलेट करना बंद कर दे (और क्लियर हो जाए) इससे पहले कि उसका टाइमर समाप्त हो। सफल कॉम्बो लक्ष्य पर, `open-sse/services/combo.ts` `decayModelFailureCount()` को कॉल करता है
(`open-sse/services/accountFallback.ts`), जो संग्रहीत
`failureCount` को **आधा** कर देता है (`Math.floor(failureCount / 2)`); जब यह `0` पर पहुँचता है तो लॉकआउट एंट्री पूरी तरह हटा दी जाती है। इसका समकक्ष `recordModelLockoutFailure()` एस्केलेशन विंडो के भीतर विफलताओं पर संख्या बढ़ाता है (और कूलडाउन को एस्केलेट करता है)। यह सफलता-क्षय सामान्य टाइमर समाप्ति के अतिरिक्त है —
दोनों में से कोई भी पथ मॉडल को पुनः सक्षम कर सकता है।

**स्टेट:** लॉकआउट **इन-मेमोरी** रखे जाते हैं (प्रति-प्रोसेस `ModelLockoutEntry` के `Map`, `provider:connectionId:model` द्वारा कुंजीबद्ध, एक्ज़ैक्ट-स्कोप लॉक
`provider:connectionId:exact:model` द्वारा), DB में परसिस्ट नहीं किए जाते — वे रीस्टार्ट पर खो जाते हैं। _सेटिंग्स_ परसिस्ट होती हैं; सक्रिय
लॉकआउट _स्टेट_ क्षणिक है।

---

## 4. Quota-Share समवर्तिता नियंत्रण (v3.8.36)

सब्सक्रिप्शन खाते (GLM, MiniMax, आदि) अक्सर केवल ~1–3 समवर्ती अनुरोध ही
स्वीकार करते हैं; इससे अधिक करने पर 429 और कूलडाउन ट्रिगर हो जाते हैं। यह समस्या
**quota-share** (`qtSd/…`) कॉम्बो में विशेष रूप से गंभीर होती है, जहाँ कई API कुंजियाँ
एक ही अपस्ट्रीम खाता साझा करती हैं। तीन परतें साझा खाते को अनुरोधों की बाढ़ से बचाती हैं।

### प्रति-कनेक्शन समवर्तिता सीमा (`max_concurrent`)

प्रत्येक प्रोवाइडर कनेक्शन एक `max_concurrent` अधिकतम सीमा घोषित कर सकता है
(`provider_connections.max_concurrent`, कनेक्शन मोडल / API / DB में सेट करें)।
कोई सीमा न रखने के लिए इसे खाली छोड़ दें। यही एकमात्र नॉब है जो नीचे दी गई
क्रमबद्धता (serialization) परत को चलाता है — इसे खाते की वास्तविक समवर्तिता पर
सेट करें (जैसे GLM ~1, MiniMax ~2)।

### प्रति-मॉडल समवर्तिता सीमाएँ (`modelConcurrency`)

एक कनेक्शन अपने `rateLimitOverrides` मैप के अंदर प्रति-मॉडल सटीक समवर्तिता
सीमाएँ भी घोषित कर सकता है:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

इसे कनेक्शन मोडल में सेट करें (**दर सीमा ओवरराइड → प्रति-मॉडल
समवर्तिता सीमाएँ**, प्रति पंक्ति एक `model=cap`) या उसी JSON संरचना के साथ
`PATCH /api/providers/[id]` के माध्यम से। मुख्य बातें:

- **कनेक्शन-व्यापी बनाम मॉडल-विशिष्ट:** `maxConcurrent` साझा
  कनेक्शन-व्यापी सीमा बना रहता है। जब दोनों लागू हों, तो दोनों गेट एक ही
  सम्मिश्र गेट (`global → provider → account → model`) में परमाणुक रूप से
  (atomically) प्राप्त किए जाते हैं; प्रभावी व्यवहार लागू सीमाओं में से
  अधिक सख्त वाला होता है।
- **सटीक मॉडल-कुंजी मिलान:** कुंजी वह मॉडल स्ट्रिंग है जो रूटिंग रिज़ॉल्यूशन के
  बाद executor को दी जाती है — सामान्यतः नग्न अपस्ट्रीम मॉडल id
  (`glm-5`), न कि क्लाइंट-साइड `provider/model` उपनाम (`zai/glm-5` का
  `glm-5` से मिलान नहीं होता)। मान धनात्मक-पूर्णांक समवर्ती-अनुरोध
  सीमाएँ होते हैं।
- **स्थानीय कतारबद्धता, कोई खोज नहीं:** अतिरिक्त अनुरोध मौजूदा कतार/टाइमआउट
  semantics के साथ स्थानीय रूप से कतार में लगते हैं (टाइप किए गए
  `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` प्रवेश त्रुटियाँ)। OmniRoute
  अपस्ट्रीम नीति की खोज या अनुमान नहीं लगाता — यह ठीक वही सीमाएँ लागू करता
  है जो ऑपरेटर ने कॉन्फ़िगर की हैं। संतृप्त मॉडल गेट कभी भी प्रोवाइडर को अक्षम
  नहीं करता और न ही स्थायी मॉडल लॉकआउट बनाता है; अपस्ट्रीम
  429/कूलडाउन/फ़ॉलबैक व्यवहार ही त्रुटि का अंतिम सहारा (backstop) रहता है।
- **प्रति-कनेक्शन, प्रति-प्रोसेस दायरा:** सीमाएँ प्रति डेटाबेस कनेक्शन होती
  हैं और इन-मेमोरी रखी जाती हैं, इसलिए एक ही अपस्ट्रीम API कुंजी का पुनः
  उपयोग करने वाले दो कनेक्शन आपस में समन्वय नहीं करते।
- **अकॉन्फ़िगर का अर्थ अपरिवर्तित:** मैप को छोड़ने (या डैशबोर्ड फ़ील्ड को
  खाली छोड़ने) पर कोई मॉडल गेट नहीं जुड़ता। बिना किसी सार्वभौमिक प्रोवाइडर
  सीमा के उदाहरण कॉन्फ़िगरेशन:

```text
glm-5=1
glm-4.7=3
```

### Quota-share अनुरोध क्रमबद्धता

जब quota-share डिस्पैच किसी ऐसे कनेक्शन को लक्षित करता है जो धनात्मक
`max_concurrent` घोषित करता है, तो उस **खाते** के समवर्ती अनुरोध
प्रति-कनेक्शन सेमाफोर (कुंजी `qsconn:<connectionId>`) के माध्यम से क्रमबद्ध किए
जाते हैं: अतिरिक्त अनुरोध खाते पर बाढ़ डालने के बजाय **कतार में प्रतीक्षा
करते हैं**। यह **fail-open** है — संतृप्त कतार या टाइमआउट होने पर, डिस्पैच योग्य
अनुरोध को कभी अस्वीकार करने के बजाय बिना स्लॉट के आगे बढ़ाया जाता है।
**सेटिंग्स → लचीलापन → Quota-share प्रति-कनेक्शन समवर्तिता** में टॉगल करें
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, डिफ़ॉल्ट चालू)।
`max_concurrent` सीमा के बिना व्यवहार अपरिवर्तित रहता है।

> quota-share रूटिंग गेट (`selectQuotaShareTarget`, DRR + P2C) स्वयं
> fail-open है और केवल सीमा पर पहुँचे कनेक्शन को _कम प्राथमिकता_ देता है —
> एकल-कनेक्शन पूल के साथ यह कठोर सीमा (hard-limit) नहीं लगा सकता, इसलिए
> यह सेमाफोर ही वास्तव में बाढ़ को रोकता है।

### कूलडाउन-सजग कॉम्बो पुनःप्रयास

प्रत्येक कॉम्बो रणनीति के लिए (चालू होने पर), कोई ऐसा अनुरोध जो SHORT अल्पकालिक
कूलडाउन के कारण 429 देने वाला हो, 429 लौटाने के बजाय उस कूलडाउन की प्रतीक्षा
करके पुनः डिस्पैच करता है — इसमें मल्टी-मॉडल कॉम्बो पर Gemini-श्रेणी की TPM/RPM
विंडो (~60s retry-after) शामिल हैं, उदाहरण के लिए 2-मॉडल कॉम्बो के दोनों लक्ष्यों
का प्रति-मॉडल दर सीमा से टकराना। **सेटिंग्स → लचीलापन** में `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) द्वारा सीमाबद्ध। यह
`quota_exhausted` (आधी रात तक लॉक) या प्रमाणीकरण/नहीं-मिला कारणों पर कभी
प्रतीक्षा नहीं करता।

यही गेट प्री-डिस्पैच स्थिति (#16319) को भी कवर करता है: जब किसी भी प्रयास से
पहले कॉम्बो के प्रत्येक लक्ष्य को छोड़ दिया जाता है क्योंकि उसका मॉडल अल्पकालिक
ट्रांजिएंट लॉकआउट में है, तो शून्य-प्रयास पथ उन्हीं सीमाओं के तहत लॉक समाप्त होने
की प्रतीक्षा करके पुनः डिस्पैच करता है, बजाय संकेत-रहित
`503 ALL_TARGETS_SKIPPED` उत्तर देने के। जब प्रतीक्षा की अनुमति न हो (सीमा,
प्रयास या बजट समाप्त, या सुविधा बंद), तो अंतिम प्रतिक्रिया
`429 rate_limit_error` में अपग्रेड हो जाती है, जो सबसे जल्दी समाप्त होने वाले
ट्रांजिएंट लॉक से `retry_after` / `reset_at` ले जाती है; quota, auth और
not-found लॉक संकेत-रहित 503 ही बनाए रखते हैं।

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. अनुरोध कतार प्रवेश नियंत्रण (v3.8.49 · समस्या #6593)

**दायरा**: स्थानीय प्रति-प्रदाता+कनेक्शन दर-सीमा कतार (`open-sse/services/rateLimitManager.ts`,
Bottleneck द्वारा समर्थित), ऊपर दिए गए तीन तंत्रों से एक स्तर नीचे।

**`maxWaitMs` कतार-प्रतीक्षा को सीमित करता है; `executionMaxWaitMs` निष्पादन को सीमित करता है।**
दोनों जानबूझकर अलग हैं, और इनमें से कोई भी दूसरे के मान को प्रभावित नहीं करता।

`resilienceSettings.requestQueue.maxWaitMs` **कतार-प्रतीक्षा बजट** है: यह
प्रदाता स्लॉट की प्रतीक्षा करने और फिर QUEUED अवस्था में रहने, दोनों को
कवर करता है, और इसका टाइमर उसी क्षण साफ़ हो जाता है जब जॉब QUEUED से बाहर निकलकर निष्पादन शुरू करता है
(`rateLimitManager.ts`, `wrappedFn`)। जो अनुरोध इसे पार कर जाता है, वह कभी अपस्ट्रीम तक नहीं पहुँचता। डिफ़ॉल्ट 30000ms है, जो
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` द्वारा `src/lib/resilience/settings.ts` में दिया जाता है और
`tests/unit/ratelimit-admission-control-6593.test.ts` द्वारा निश्चित किया गया है, इसलिए
इसमें बदलाव करने पर यह परीक्षण लाल हो जाएगा, न कि यह अनुच्छेद चुपचाप पुराना पड़ा रहेगा।

`resilienceSettings.requestQueue.executionMaxWaitMs` वह मान है जो Bottleneck को जॉब के
`expiration` के रूप में मिलता है; इसका टाइमर केवल डिस्पैच के बाद शुरू होता है। यह ऐसे निष्पादकों के लिए
अंतिम सुरक्षा-सीमा है जिनका अपना अपस्ट्रीम टाइमआउट नहीं है, और जब निष्पादक का अपना फ़ेच-आरंभ टाइमआउट अधिक लंबा हो, तो इसे उसी तक बढ़ा दिया जाता है, ताकि यह स्वस्थ रूप से चल रही प्रतिक्रिया को बीच में समाप्त न कर सके। डिफ़ॉल्ट 600000ms (10 min) है।

कतार बजट को `expiration` में देना ही पहले नॉन-इन्क्रिमेंटल गेटवे को बीच में समाप्त कर देता था — वे पहले बाइट मिलने से पहले वैध रूप से कई मिनट तक चलते हैं — और इसी वजह से expiration को
`code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) के रूप में दिखाया जाता है, जबकि कतार बजट कतार-टाइमआउट कोड देता है। दोनों में से किसी को `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) या डैशबोर्ड
(**सेटिंग्स → रेज़िलिएंस**) के ज़रिए ओवरराइड करें। सामान्यीकृत किए जाने पर दोनों को
1ms–24h तक सीमित किया जाता है।

दोनों के लिए प्राथमिकता: पर्यावरण चर केवल _डिफ़ॉल्ट_ प्रदान करता है। `resilienceSettings.requestQueue` में
सहेजा गया मान (डैशबोर्ड / API पैच, `key_value` में संग्रहीत) उस पर प्राथमिकता रखता है, और प्रति-कनेक्शन
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs` उससे भी ऊपर होता है। पहले से सहेजा गया मान रखने वाले
डिप्लॉयमेंट पर पर्यावरण चर सेट करने से इसलिए कुछ नहीं बदलता — इसके बजाय सहेजी गई सेटिंग हटाएँ या अपडेट करें।

कतार में रहने की अवधि `maxWaitMs` से सीमित है; नीचे दिया गया `maxQueueDepth` यह सीमित करता है कि एक बार में कितने कॉलर कतार में रखे जा सकते हैं।

**बॉडी में बताए गए रिट्राई: गति-नियमन बनाम लॉकआउट।** 429 बॉडी अपनी प्रतीक्षा-अवधि बता सकती है
(Gemini `RetryInfo.retryDelay`, "retry after Ns" पाठ), जिसे
`updateFromResponseBody` पढ़ता है। कनेक्शन के `maxWaitMs` में समाने वाली प्रतीक्षा गति-नियमन है: लिमिटर
उतनी अवधि के लिए अपना रिज़र्वॉयर खाली कर देता है और उसके फिर भरने पर कतारबद्ध कॉल डिस्पैच होती हैं। `maxWaitMs`
से लंबी प्रतीक्षा ऐसी नहीं है जिसे कतार में बैठकर काटा जा सके — दैनिक कोटा समाप्त होने पर Gemini
`retryDelay: "86399s"` के साथ जवाब देता है। पुनर्निर्मित 429 (#16528) में रिले किया गया `Retry-After`
पहले ही फ़ॉलबैक इंजन को उस अवधि के लिए मॉडल लॉक कर देता है, लेकिन उसके लिए लिमिटर को भी रोकने पर
कुंजी तक जल्दी पहुँचने वाली कोई भी कॉल (उदाहरण के लिए रेज़िलिएंस रीसेट के बाद) पूरे `maxWaitMs` तक फिर भी अटकी रहेगी। जब ऐसी प्रतीक्षा टाइप किए गए Google `RetryInfo`
विवरण से आती है (`google_rpc_retry_info` स्रोत-सूचना) और कुंजी का लिमिटर पहले से मॉडल तक सीमित है
(`getLimiterKey` देखें), तो 429 इसके बजाय उस कनेक्शन पर मॉडल लॉकआउट बन जाता है
(`lockModelForLongBodyRetry` in `open-sse/services/rateLimitManager/bodyRetryPause.ts`, अधिकतम 24h तक सीमित), और लिमिटर को बिना रोके छोड़ दिया जाता है। खाता चयन
`isModelLocked()` के ज़रिए ऐसे लॉक किए गए मॉडल को छोड़ देता है, और कनेक्शन पर पिन किए गए लक्ष्यों के लिए कॉम्बो प्री-डिस्पैच गेट भी ऐसा ही करता है। antigravity में, जहाँ लिमिटर प्रति कोटा-परिवार है, लॉक ठीक उसी मॉडल पर लगता है, जैसे उसके अन्य कोटा लॉक में। जब कोई अलियास उस मॉडल में resolve हो जाता है, तो क्लाइंट द्वारा माँगा गया नाम भी लॉक हो जाता है, क्योंकि ये जाँचें अनुरोधित नाम का उपयोग करती हैं; इसे सटीक रूप से (`lockExactModel`) लॉक किया जाता है, इसलिए antigravity के किसी कोटा-परिवार या codex scope को पार करने वाला अलियास अपना नाम कभी लॉक नहीं करता। साधारण-पाठ संकेत, अनटाइप्ड `retryDelay`, या पूरे कनेक्शन के साथ साझा किया गया लिमिटर इस विराम को बनाए रखता है। जब 429 पथ द्वारा अभी-अभी पुनर्निर्मित लिमिटर रुकता है, तो जिस कॉलर का शेष कतार-समय उस विराम के समाप्त होने से पहले समाप्त हो जाता है, उसे उस अवधि के समाप्त होने तक प्रतीक्षा कराने के बजाय कतार-टाइमआउट कोड (`checkLimiterPause`) के साथ तुरंत अस्वीकार कर दिया जाता है; दर्ज किया गया समाप्ति-बिंदु लिमिटर बनाए जाने से पहले तय किया जाता है, वहीं जहाँ Bottleneck अपना रिफ्रेश क्लॉक शुरू करता है, और रिज़र्वॉयर में बाद का कोई भी बदलाव उस समाप्ति-बिंदु को भुला देता है। इसका परीक्षण
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` और
`tests/unit/rate-limit-body-retry-pause.test.ts` में किया गया है।

**`maxQueueDepth` — ऑप्ट-इन प्रवेश सीमा (नया)।** `resilienceSettings.requestQueue.maxQueueDepth`
यह सीमा तय करता है कि एक प्रदाता+कनेक्शन के लिए एक समय में कितने अनुरोध कतार में
(अभी डिस्पैच न किए गए) रह सकते हैं। जब कतार में पहले से `maxQueueDepth`
अनुरोध हों, तो नया अनुरोध टाइप की गई
`code: "RATE_LIMIT_QUEUE_FULL"` त्रुटि के साथ तुरंत अस्वीकार कर दिया जाता है **इससे पहले** कि वह कभी `limiter.schedule()` तक पहुँचे
— इसलिए यह अस्वीकृति कम लागत में होती है और उस अनुरोध के लिए होने वाले किसी भी डाउनस्ट्रीम प्रॉम्प्ट-संपीड़न / अनुवाद कार्य से पहले हो जाती है। डिफ़ॉल्ट `0` = अक्षम, जिससे मौजूदा असीमित-कतार व्यवहार बना रहता है; मान
0–100000 तक सीमित है। इसे `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) या
`resilienceSettings.requestQueue.maxQueueDepth` (डैशबोर्ड/API पैच) के ज़रिए ओवरराइड करें।

प्रवेश-जाँच स्वयं एक शुद्ध फ़ंक्शन है
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), इसलिए वास्तविक Bottleneck लिमिटर के बिना भी इसका यूनिट परीक्षण किया जा सकता है।

> #6593 को खोलने वाले RFC ने एक `bypassCompressionOnRateLimit`
> फ़्लैग भी प्रस्तावित किया था। इस रेपो की `open-sse/services/compression/` पाइपलाइन
> आउटबाउंड LLM रिक्वेस्ट (`chatCore.ts`,
> लगभग `resolveCompressionSettings`/`selectCompressionStrategy` ब्लॉक के आसपास) पर
> प्रॉम्प्ट/कॉन्टेक्स्ट कम्प्रेशन है — सिंथेसाइज़ किए गए 429 बॉडी पर HTTP रिस्पॉन्स कम्प्रेशन नहीं —
> इसलिए शाब्दिक बाईपास फ़्लैग के लिए कोई मेल खाता कोड पाथ मौजूद नहीं है। वह प्रॉम्प्ट-कम्प्रेशन चरण
> भी वर्तमान में रिक्वेस्ट पाइपलाइन में `withRateLimit()` से _पहले_ चलता है, इसलिए
> क्यू-फुल अस्वीकार (queue-full rejection) पर इसे छोड़ने के लिए पुनःक्रमित करना
> इस issue के दायरे से अलग, एक बड़ा बदलाव है; इसे जानबूझकर यहाँ लागू **नहीं** किया गया
> और यदि CPU-बचत का लाभ पुनःक्रमण जोखिम के लायक हो, तो इसे फ़ॉलो-अप के रूप में छोड़ दिया गया है।

### रेट-लिमिट ऑटो-एनेबल सेफ़्टी नेट और कनेक्शन सुरक्षा (`rateLimitProtection`)

**ऑटो-एनेबल सेफ़्टी नेट** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, डिफ़ॉल्ट `true`):
डिफ़ॉल्ट रूप से, OmniRoute सभी सक्रिय API-key प्रोवाइडर कनेक्शन (`getProviderCategory(provider) === "apikey"`) के लिए रेट-लिमिट क्यू सुरक्षा को स्वचालित रूप से सक्षम करता है। यह सुनिश्चित करता है कि रेट-संवेदनशील अपस्ट्रीम API keys पर आने वाले अनुरोध अपस्ट्रीम 429 त्रुटियों में बर्स्ट होने के बजाय Bottleneck के माध्यम से कतारबद्ध और थ्रॉटल किए जाएँ। सेफ़्टी नेट को `RATE_LIMIT_AUTO_ENABLE` एनवायरनमेंट वेरिएबल (`false`/`0`/`off` अक्षम करता है, `true`/`1`/`on` चालू करने के लिए बाध्य करता है) के माध्यम से ओवरराइड किया जा सकता है, जो सहेजी गई डैशबोर्ड सेटिंग (**सेटिंग्स → रेज़िलिएंस** / `PATCH /api/resilience`) पर प्राथमिकता लेता है।

**प्रति-कनेक्शन `rateLimitProtection` की सेमेंटिक्स:**
प्रति-कनेक्शन रेट-लिमिट सुरक्षा प्रोवाइडर कनेक्शन पर `rateLimitProtection` बूलियन फ़ील्ड के माध्यम से ट्रैक की जाती है (SQLite में `rate_limit_protection` के रूप में सहेजी जाती है):

- **स्पष्ट रूप से चालू (`rateLimitProtection === true`)**: इस कनेक्शन के लिए रेट-लिमिट सुरक्षा स्पष्ट रूप से सक्षम है, चाहे प्रोवाइडर श्रेणी कुछ भी हो या ऑटो-एनेबल सेफ़्टी नेट चालू हो या न हो।
- **स्पष्ट रूप से बंद (`rateLimitProtection === false`)**: स्पष्ट सुरक्षा को अक्षम करता है, लेकिन किसी सक्रिय API-key कनेक्शन को वैश्विक ऑटो-एनेबल सेफ़्टी नेट से ऑप्ट-आउट **नहीं** कराता। `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`) में, `false` और `undefined` समतुल्य हैं: केवल `rateLimitProtection === true` को ही स्पष्ट ओवरराइड माना जाता है। यदि `rateLimitProtection` `false` है (या सेट नहीं है), तो कोई सक्रिय API-key कनेक्शन फिर भी ऑटो-एनेबल शर्त से मेल खाता है और रेट-लिमिट संरक्षित बना रहता है।
- **प्रति-कनेक्शन ऑप्ट-आउट नहीं**: कोई ऑपरेटर वर्तमान में यह व्यक्त नहीं कर सकता कि "यह एकल सक्रिय API-key कनेक्शन रेट-लिमिट क्यू सुरक्षा के बिना चलना चाहिए", जबकि अन्य कनेक्शनों के लिए ऑटो-एनेबल सक्रिय रखा जाए। API-key कनेक्शनों को पूरी तरह से रेट-लिमिट कतारों के बिना चलाने के लिए, सेफ़्टी नेट को विश्व स्तर पर बंद करना होगा (`RATE_LIMIT_AUTO_ENABLE=false` या `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)।

**समर्थित राइट पाथ:**

- **`POST /api/rate-limits`**: किसी कनेक्शन के लिए `rateLimitProtection` टॉगल करने का समर्थित प्रबंधन राइट पाथ (`{ connectionId: string, enabled: boolean }`)। इसे `enabled: true` के साथ कॉल करने से स्पष्ट सुरक्षा चालू हो जाती है; इसे `enabled: false` के साथ कॉल करने से स्पष्ट सुरक्षा हट जाती है (हालांकि सक्रिय API-key कनेक्शन, यदि ऑटो-एनेबल चालू है, तो वैश्विक सेफ़्टी नेट के अंतर्गत कवर बने रहते हैं)।
- **`PUT /api/providers/[id]`**: जानबूझकर `rateLimitProtection` को स्वीकार या फ़्लिप **नहीं** करता (#11278)। `PUT /api/providers/[id]` के माध्यम से प्रोवाइडर कनेक्शन मेटाडेटा अपडेट करने से सहेजी गई रेट-लिमिट सुरक्षा स्थिति कभी नहीं बदलेगी।

---

## 6. धीमी-स्ट्रीम थ्रूपुट वॉचडॉग (#9709)

वैकल्पिक `resilienceSettings.streamRecovery.throughputWatchdog` गार्ड उस अपस्ट्रीम का पता लगाता है जो अभी भी चंक्स भेज रहा है लेकिन कॉन्फ़िगर किए गए उपयोगी-आउटपुट दर से नीचे असिस्टेंट आउटपुट उत्पन्न कर रहा है। यह जानबूझकर आइडल टाइमआउट से अलग है: हार्टबीट और मेटाडेटा किसी भी टाइमर को रीसेट नहीं करते और प्रगति के रूप में नहीं गिने जाते। यह हार्ड अटेम्प्ट डेडलाइन (#9153) से भी अलग है, जो आउटपुट गुणवत्ता की परवाह किए बिना एक पूर्ण सुरक्षा सीमा बनी रहती है।

वॉचडॉग को निरस्त (abort) करने से पहले एक वार्म-अप अवधि और उसके बाद एक पूर्ण रोलिंग विंडो की आवश्यकता होती है। यह Chat Completions और Responses API आउटपुट इवेंट्स से टेक्स्ट डेल्टा गिनता है (एक रूढ़िवादी UTF-8 बाइट प्रॉक्सी), केवल-usage और खाली इवेंट्स को अनदेखा करता है, और टूल-कॉल या रीज़निंग इवेंट्स के प्रगति में होने के दौरान निर्णय को स्थगित करता है। यह डिफ़ॉल्ट रूप से अक्षम है और इसे `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` से सक्षम किया जा सकता है; विंडो, वार्म-अप, न्यूनतम दर, और न्यूनतम मापन-योग्य आउटपुट सामान्य resilience-settings नॉर्मलाइज़ेशन लेयर द्वारा सीमित हैं।

सक्षम होने पर, वॉचडॉग निरस्तता केवल सक्रिय अपस्ट्रीम प्रयास पर लागू होती है। किसी भी क्लाइंट-दृश्य बाइट्स से पहले, मौजूदा same-account अर्ली-रिकवरी पथ प्रयास को फिर से खोल सकता है। कमिट के बाद, स्ट्रीम को कभी भी अंधाधुंध रीप्ले नहीं किया जाता; केवल मौजूदा सुरक्षित mid-stream continuation कॉन्ट्रैक्ट ही सफ़िक्स को जोड़ सकता है। फ़ाइनलाइज़ेशन single-shot रहता है, इसलिए usage अकाउंटिंग और सेमाफ़ोर रिलीज़ डुप्लिकेट नहीं होते।

---

## 7. अपस्ट्रीम स्टेटस पुनर्कथन (गलत बताई गई कोटा त्रुटियाँ)

**दायरा:** एक अपस्ट्रीम गेटवे जो अस्थायी कोटा समाप्ति को गलत HTTP स्टेटस के साथ रिपोर्ट करता है।

**उद्देश्य:** वर्गीकरण से पहले भ्रामक स्टेटस को सुधारना, ताकि डाउनस्ट्रीम उपभोक्ता (फ़ॉलबैक इंजन, कॉम्बो एग्रीगेशन, क्लाइंट-फ़ेसिंग रिस्पॉन्स) विफलता की वास्तविक पुनःप्रयास योग्य प्रकृति देख सकें।

कुछ गेटवे अस्थायी कोटा समाप्ति को गैर-पुनःप्रयास योग्य HTTP स्टेटस के साथ संकेतित करते हैं। `agentrouter.org` मानक `429` के बजाय चीनी बॉडी (`用户额度不足` / `额度不足`) के साथ `403` (कभी-कभी `400`) लौटाता है। Claude Code जैसे क्लाइंट `403` को स्थायी मानते हैं और सत्र समाप्त कर देते हैं, और बिना सुधार के फ़ॉलबैक इंजन इसे कोटा इवेंट के बजाय `AUTH_ERROR` के रूप में वर्गीकृत करेगा।

**कार्यान्वयन:**

- रजिस्ट्री + मैचर: `open-sse/config/upstreamStatusRestatement.ts` — प्रति-प्रोवाइडर नियमों की सूची (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), जो `applyStatusRestatement()` के माध्यम से मिलान की जाती है।
- कॉल साइट: `open-sse/handlers/chatCore.ts` में `providerFailure:` ब्लॉक (लगभग लाइन 3654), ठीक उस समय जब `parseUpstreamError()` त्रुटि HTTP स्टेटस (`!providerResponse.ok`) वाले अपस्ट्रीम रिस्पॉन्स को पार्स करता है, और किसी भी वर्गीकरण के चलने से पहले, ताकि हर डाउनस्ट्रीम उपभोक्ता सुधरा हुआ स्टेटस देखे। `200` SSE स्ट्रीम के अंदर एम्बेड की गई त्रुटियाँ एक अलग, बाद के स्ट्रीम-पार्सिंग पथ का पालन करती हैं और आज इस हुक द्वारा **कवर नहीं** की जाती हैं — यह एक ज्ञात सीमा है, जो agentrouter के गलत स्टेटस (जो त्रुटि HTTP स्टेटस के रूप में सामने आता है) के लिए अभी आवश्यक नहीं है।
- पुनःप्रयास पात्रता: `429` `RETRY_AFTER_ELIGIBLE_STATUSES` (`open-sse/services/combo/unavailableRetryGate.ts`) में है, इसलिए पुनर्कथित त्रुटि मृत `403` के रूप में सामने आने के बजाय एक वास्तविक पुनःप्रयास विंडो लेकर आती है।
- सिंथेटिक `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) केवल वह है जो पुनर्कथित रिस्पॉन्स **क्लाइंट** को बताता है; यह स्वयं कनेक्शन की आंतरिक कूलडाउन/लॉकआउट अवधि नहीं है — वह अलग से उसी तंत्र द्वारा नियंत्रित होती है जो वास्तव में पुनर्कथित त्रुटि को संभालता है (Connection Cooldown का बढ़ता हुआ backoff, §2, API-key प्रोवाइडर के लिए बेस `3s`; या Model Lockout, §3, agentrouter जैसे per-model-quota प्रोवाइडर के लिए)। राउटर क्लाइंट को बताई गई 60s विंडो से पहले आंतरिक रूप से पुनःप्रयास के लिए पात्र हो सकता है — यह जानबूझकर छोड़ा गया हेडरूम है, कोई बग नहीं।

स्थायी त्रुटियाँ (agentrouter का `无权访问模型` — इस मॉडल तक पहुँच नहीं) कभी भी पुनर्कथित नहीं की जातीं: `excludeMarkers` नियम को तब भी विटो कर देता है जब `textMarkers` मिलान करें, इसलिए त्रुटि अपना मूल स्टेटस बनाए रखती है और कुछ भी इसे बार-बार पुनःप्रयास नहीं करता। मेल खाता प्रोवाइडर वर्गीकरण नियम (`open-sse/config/providerErrorRules.ts` में `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, `6h` घोषित बेस कूलडाउन) `checkFallbackError` (`open-sse/services/accountFallback.ts`) द्वारा सामान्य apikey-श्रेणी `FORBIDDEN` अर्ली-रिटर्न से _पहले_ परामर्श किया जाता है, जो `honorsRuleLockScope(provider)` पर गेटेड है (#10334 — वर्तमान में `providerErrorRules.ts` में `HONORS_RULE_LOCK_SCOPE_PROVIDERS` अनुमति सूची के माध्यम से केवल agentrouter के लिए)। नियम का घोषित 6h कूलडाउन `fallbackResult.baseCooldownMs` के रूप में आगे बढ़ता है, लेकिन यह अभी भी पहले से मौजूद per-model-quota लॉकआउट पथ को फ़ीड करता है (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, कूलडाउन स्रोत को छोड़कर #10334 से अपरिवर्तित): यह हर दूसरे मॉडल लॉकआउट की तरह ऑपरेटर के `mlSettings.maxCooldownMs` (डिफ़ॉल्ट `1_800_000ms` / 30min) तक सीमित कर दिया जाता है, और _पर्सिस्टेड लॉकआउट कारण_ पहले से मौजूद हार्डकोडेड `"forbidden"` ही रहता है, नियम का `"auth_error"` नहीं — केवल कूलडाउन अवधि एंड-टू-एंड मान्य होती है, कारण स्ट्रिंग नहीं। कनेक्शन स्वयं सक्रिय रहता है; उसी कनेक्शन पर सिबलिंग मॉडल अप्रभावित रहते हैं।

पुनर्कथित कोटा त्रुटियाँ (`额度不足`) प्रोडक्शन में एक प्रोवाइडर नियम तक पहुँचती हैं (`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, अपना कोई घोषित कूलडाउन नहीं — पर्सिस्टेंस लेयर का scaled backoff डिफ़ॉल्ट लागू होता है)। #10334 के बाद से, `ProviderErrorRuleMatch` पर `scope` एंड-टू-एंड उपभोग किया जाता है, लेकिन **केवल** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` अनुमति सूची (`providerErrorRules.ts` — आज केवल `"agentrouter"`, `honorsRuleLockScope()` के माध्यम से गेटेड) में शामिल प्रोवाइडर के लिए। बाकी सभी प्रोवाइडर के लिए `scope` सूचनात्मक ही रहता है, बिल्कुल वैसे जैसे #10334 से पहले था। `checkFallbackError` मिलान किए गए नियम के scope को `fallbackResult.ruleScope` के रूप में प्रस्तुत करता है; `isAgentrouterConnectionQuotaScope()` (`src/sse/services/auth.ts`) वह साझा गार्ड है जो पुष्टि करता है कि `ruleScope` को कनेक्शन-व्यापी, स्व-पुनर्प्राप्ति संकेत के रूप में मानना वास्तव में सुरक्षित है (scope `"connection"`, reason `quota_exhausted`, कभी `permanent` नहीं, कभी `creditsExhausted` नहीं — किसी भविष्य के नियम के scope `"connection"` को स्थायी खाता स्थिति के साथ जोड़ने के विरुद्ध सुरक्षा)। दो उपभोक्ता इसे कॉल करते हैं:

- **पर्सिस्टेंस** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-प्रोवाइडर की **प्रति-मॉडल** लॉकआउट ब्रांच में जाने के बजाय
  (agentrouter के लिए `passthroughModels: true` है → `hasPerModelQuota()`
  `true` लौटाता है), यह एक **अस्थायी कनेक्शन कूलडाउन** लागू करता है —
  `testStatus: "unavailable"` + `rateLimitedUntil`, कभी भी कोई टर्मिनल स्टेटस
  नहीं (`credits_exhausted`/`banned`/`expired`) — ताकि कूलडाउन समाप्त होते ही
  कनेक्शन स्वयं ठीक हो जाए, बजाय मैन्युअल क्रेडेंशियल रीसेट की आवश्यकता के।
  `disableCooling: true` वाले कनेक्शनों के लिए इसे स्किप किया जाता है
  (#2997): वह ऑप्ट-आउट इसके बजाय प्रति-मॉडल लॉकआउट में चला जाता है
  (एक दस्तावेज़ित ट्रेड-ऑफ़ — ब्रांच के ऊपर दिया कोड कमेंट देखें)।
- **सेम-रिक्वेस्ट कॉम्बो रूटिंग** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): वही गार्ड कनेक्शन को
  इन-मेमोरी `exhaustedConnections` सेट में मार्क करता है, जिसकी कुंजी
  `${provider}:${connectionId}` होती है। यह केवल उस शेष सेम-रिक्वेस्ट
  टारगेट को स्किप करता है जो _स्वयं अपने टारगेट ऑब्जेक्ट पर पहले से वही सटीक
  `connectionId` लिए हुए हो_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` — `exhaustedConnections` लुकअप से पहले) — एक साधारण
  मॉडल-सूची कॉम्बो, जहाँ सिबलिंग टारगेट अपनी कोई पिन की हुई `connectionId`
  नहीं रखते और एक कनेक्शन केवल प्रति-डिस्पैच रिस्पॉन्स के
  `X-OmniRoute-Selected-Connection-Id` हेडर से रिज़ॉल्व होता है, उस कुंजी
  मैच तक कभी नहीं पहुँचता। उस सामान्य मामले के लिए, किसी शेष लेग द्वारा
  अभी-अभी एक्सहॉस्ट हुए अकाउंट का पुनः उपयोग करने से रोकने वाली असली सुरक्षा
  यह सेट नहीं है — यह ऊपर दी गई पर्सिस्टेंस परत है (कनेक्शन का
  `rateLimitedUntil` अब भविष्य में है), जिसके साथ यही गार्ड उस फेलियर के लिए
  `transientRateLimitedProviders` को सप्रेस करता है (देखें "दो-चरणीय डिज़ाइन"
  और `targetExhaustion.ts` में `isAgentrouterConnectionQuotaScope` ब्रांच पर
  दिया कोड कमेंट): उस सेट को अनमार्क्ड छोड़े जाने पर, `combo.ts` का
  `allowRateLimitedConnection` फ़ोर्स-अलाउ
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) प्रोवाइडर के शेष
  लेग्स के लिए लागू नहीं होता, इसलिए क्रेडेंशियल सिलेक्शन का `rateLimitedUntil`
  फ़िल्टर (`src/sse/services/auth.ts:1238`) सामान्य रूप से मान्य रहता है और
  कोई शेष लेग या तो कोई भिन्न, अभी भी योग्य agentrouter कनेक्शन चुनता है,
  या कोई क्रेडेंशियल उपलब्ध न होने के कारण फेल हो जाता है — यह इस ब्रांच
  द्वारा अभी कूल डाउन किए गए कनेक्शन पर जबरन वापस नहीं आता।

### दो-चरणीय डिज़ाइन: पहले स्टेटस रीस्टेटमेंट, फिर क्लासिफ़िकेशन

स्टेटस रीस्टेटमेंट (`upstreamStatusRestatement.ts`) और प्रोवाइडर
क्लासिफ़िकेशन रूल्स (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) अलग-अलग रजिस्ट्री हैं जो दोनों प्रोवाइडर आईडी और
टेक्स्ट मार्करों पर आधारित हैं, लेकिन वे अलग-अलग जगहों पर चलती हैं और
अलग-अलग उद्देश्य पूरा करती हैं: रीस्टेटमेंट `chatCore.ts` में शुरुआती चरण
में HTTP स्टेटस को रीराइट करती है; क्लासिफ़िकेशन रूल्स `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) के अंदर फ़ॉलबैक `reason` चुनते हैं
और `scope` (`model` / `provider` / `connection`) लॉक करते हैं।

क्लासिफ़िकेशन रूल्स पूरी एरर **टेक्स्ट** केवल उन प्रोवाइडरों के लिए देखते हैं
जो `providerErrorRules.ts` में `FULL_TEXT_RULE_PROVIDERS` अलाउलिस्ट में
सूचीबद्ध हैं (बॉडी मार्करों जैसे `额度不足` से मैच करने के लिए यह आवश्यक है) —
वर्तमान में केवल `"agentrouter"`। हर अन्य **बिल्ट-इन कैटलॉग** प्रोवाइडर के
लिए, `checkFallbackError` `getProviderErrorRuleMatch` को केवल स्ट्रक्चर्ड एरर
(`{code, type}`) देता है, जो हेडर/स्टेटस/कोड-आधारित रूल्स के लिए पर्याप्त है
लेकिन बॉडी-टेक्स्ट मार्करों के प्रति अंधा है। हेल्पर `resolveRuleMatchBody()`
यह चयन करता है: अलाउलिस्टेड प्रोवाइडरों के लिए पूरी एरर टेक्स्ट, अन्यथा
स्ट्रक्चर्ड एरर। `FULL_TEXT_RULE_PROVIDERS` में कोई **बिल्ट-इन** प्रोवाइडर
जोड़ना एक स्पष्ट प्रति-प्रोवाइडर ऑप्ट-इन है — यह इसलिए मौजूद है ताकि सूची में
न होने वाले हर प्रोवाइडर का डिफ़ॉल्ट पाथ बाइट-दर-बाइट अपरिवर्तित रहे।

किसी रूल का `scope` (`model` / `provider` / `connection`)
`FULL_TEXT_RULE_PROVIDERS` से अलग एक ऑप्ट-इन है: `checkFallbackError` इसे
केवल `fallbackResult.ruleScope` के रूप में प्रस्तुत करता है, और डाउनस्ट्रीम
कंज़्यूमर्स इसे केवल उन्हीं प्रोवाइडरों के लिए एक सूचनात्मक लेबल से आगे किसी
अर्थ में मानते हैं जो उसी फ़ाइल में `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
अलाउलिस्ट में हैं (`honorsRuleLockScope()` द्वारा गेटेड — आज केवल
`"agentrouter"`)। किसी प्रोवाइडर के उस अलाउलिस्ट में आने के बाद
`scope: "connection"` मैच वास्तव में क्या करता है, यह जानने के लिए ऊपर
"रीस्टेटेड कोटा एरर्स" देखें।

**#11104 — ऑपरेटर-घोषित रूल्स दोनों अलाउलिस्ट को बायपास करते हैं।** कोई
ऑपरेटर इस फ़ाइल को संपादित किए बिना रनटाइम पर `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) के
माध्यम से प्रति-प्रोवाइडर रूल घोषित कर सकता है। किसी ऑपरेटर रूल को
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` के पीछे गेट
करना — जो अलाउलिस्ट बिल्ट-इन कैटलॉग रूल्स के **डिफ़ॉल्ट** व्यवहार की रक्षा
के लिए बनाई गई हैं — सेटिंग्स मेकैनिज़्म को पहले से सूचीबद्ध प्रोवाइडरों के
अलावा हर प्रोवाइडर के लिए निष्क्रिय बना देगा, क्योंकि रूल घोषित करना स्वयं
ऑपरेटर का स्पष्ट ऑप्ट-इन है। `resolveRuleMatchBody()` और
`honorsRuleLockScope()` दोनों पहले `hasOperatorRuleForProvider()` जाँचते हैं:
जिस प्रोवाइडर के पास ऑपरेटर रूल है, उसे रॉ एरर टेक्स्ट मिलती है और उसका
घोषित `scope` मान्य होता है, चाहे वह किसी भी अलाउलिस्ट में हो या न हो।

**ज्ञात कमी — HTTP 400 के लिए `providerRuleRegistry` से कभी परामर्श नहीं
किया जाता।** `checkFallbackError` की `BAD_REQUEST` ब्रांच स्टेटस 400 को
पूरी तरह अपने स्वयं के पैटर्न ऐरे (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, आदि — `accountFallback.ts` में) के माध्यम से
क्लासिफ़ाई करती है और अपने ऊपर की `configuredRule`/`getProviderErrorRuleMatch`
ब्रांच तक पहुँचने से पहले रिटर्न कर देती है। `status: 400` वाला कोई बिल्ट-इन
कैटलॉग रूल (या ऑपरेटर रूल) सिंटैक्टिक रूप से मान्य है लेकिन कभी फ़ायर नहीं
होगा। आज कोई भी मौजूदा रूल 400 को टारगेट नहीं करता, इसलिए प्रोडक्शन में कुछ
भी प्रभावित नहीं है — लेकिन भविष्य के किसी 400 रूल के लिए पहले इस ब्रांच को
छूना होगा, जो एक रूल जोड़ने से कहीं बड़ा बदलाव है (यह पैटर्न-ऐरे व्यवहार पर
पहले से निर्भर हर प्रोवाइडर के लिए 400 को पुनः क्लासिफ़ाई करता है) और यह
किसी एकल-प्रोवाइडर रूल जोड़ के दायरे से बाहर है।

### एक नया quota-misstating गेटवे जोड़ना

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) में एक रूल ऐरे रजिस्टर करें। `textMarkers`
   को प्रोवाइडर-विशिष्ट रखें; ऐसे सामान्य अंग्रेज़ी वाक्यांश कभी दोबारा इस्तेमाल न करें जो
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) से टकराते हों।
2. सही लॉक स्कोप चुनने के लिए वैकल्पिक रूप से
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) में क्लासिफिकेशन रूल
   रजिस्टर करें (अकाउंट-व्यापी कोटा के लिए `connection`, प्रति-मॉडल एरर के लिए
   `model`)। यह कदम प्रोडक्शन में केवल उन्हीं प्रोवाइडर्स के लिए प्रभावी होता है
   जिनके रूल्स को पूरे एरर टेक्स्ट (बॉडी मार्कर) की ज़रूरत होती है: उसी फ़ाइल में
   प्रोवाइडर id को `FULL_TEXT_RULE_PROVIDERS` में जोड़ें — अन्यथा
   `checkFallbackError` रूल को हमेशा केवल स्ट्रक्चर्ड
   `{code, type}` एरर ही देता है और बॉडी-टेक्स्ट वाला रूल लाइव ट्रैफ़िक से कभी मैच नहीं करेगा।
   जो रूल्स विशुद्ध रूप से `status`/`headers` पर मैच करते हैं (जैसे Opencode या
   Minimax के) उन्हें इस opt-in की ज़रूरत नहीं है। इसके अलावा, यदि रूल
   `scope: "connection"` घोषित करता है और इरादा वास्तविक कनेक्शन-व्यापी कूलडाउन
   और उसी-रिक्वेस्ट कॉम्बो स्किप का है (केवल एक सूचनात्मक लेबल नहीं), तो
   प्रोवाइडर id को उसी फ़ाइल में `HONORS_RULE_LOCK_SCOPE_PROVIDERS` में जोड़ें — यही वह चीज़
   है जो `markAccountUnavailable()` (`src/sse/services/auth.ts`) और
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) में
   `isAgentrouterConnectionQuotaScope()`-शैली के उपभोग को गेट करती है; इसके बिना, `scope`
   अब भी `fallbackResult.ruleScope` से होकर बहता है, लेकिन कोई भी इस पर कार्रवाई नहीं करता।
3. `tests/unit/upstream-status-restatement.test.ts`
   और `tests/unit/agentrouter-error-rules.test.ts` के अनुरूप यूनिट टेस्ट जोड़ें (इनमें
   not-permanent / not-creditsExhausted गार्ड शामिल हैं, और — यदि प्रोवाइडर को
   allowlist की ज़रूरत है — एक टेस्ट जो यह सुनिश्चित करे कि `resolveRuleMatchBody()` पूरा
   टेक्स्ट केवल उसी प्रोवाइडर के लिए लौटाता है)।

`chatCore.ts`, `classifyError` या कॉम्बो में किसी बदलाव की ज़रूरत नहीं है।

#### ईग्रेस-बकेटेड लॉक (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode परिवार) में मौजूद प्रोवाइडर्स को
IP-bucketed अपस्ट्रीम माना जाता है (opencode फ्री टियर IP-bucketed है,
account-bucketed नहीं — #9611 देखें): status-429 द्वारा `quota_exhausted`
**या** `rate_limit_exceeded` के रूप में वर्गीकृत होने पर, रोटेशन उन्हें आज़माने से पहले ही
allowlisted-फ़ैमिली के हर उस कनेक्शन को कूल डाउन कर दिया जाता है जिसका अंतिम ज्ञात
ईग्रेस IP विफल कनेक्शन के IP से मेल खाता हो
— इससे N-1 निश्चित-विफल अपस्ट्रीम कॉल्स से बचा जाता है (वही आकार जैसा #10460/#10525)।
`rate_limit_exceeded` को जानबूझकर शामिल किया गया है: `markAccountUnavailable`
पथ पर opencode-विशिष्ट रूल्स कभी मैच नहीं करते (`checkFallbackError` को कोई
headers/body नहीं दिए जाते, opencode `FULL_TEXT_RULE_PROVIDERS` में नहीं है), इसलिए जिस 429
की बॉडी में सब्सक्रिप्शन-कोटा टेक्स्ट ("monthly usage limit
reached") होता है, वह `status_429` रूल तक पहुँचने से पहले ही कोटा-टेक्स्ट फ़ॉलबैक
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h कूलडाउन) द्वारा
`quota_exhausted` वर्गीकृत हो जाता है — जबकि कोटा-टेक्स्ट-रहित 429 (सादा
रेट लिमिटिंग) `status_429` रूल के माध्यम से `rate_limit_exceeded` के रूप में वर्गीकृत
होता है और फिर भी IP फ़ैमिली को कूल डाउन करता है। किसी allowlisted प्रोवाइडर के लिए
IP-bucketed रेट लिमिट वही सिग्नल है जो समाप्त हो चुका कोटा है। ईमानदार सीमाएँ:

- **बेस्ट-एफ़र्ट**: लॉक कनेक्शन की अंतिम ज्ञात `egress_ip` को `proxy_logs`
  से रिज़ॉल्व करता है (24 घंटे की विंडो, सिंक्रोनस, बिना कैश)। कोल्ड कैश
  (egress IP कभी प्रोब नहीं की गई) या कोई रो न होने पर → विफल कनेक्शन को
  ब्रांच द्वारा फिर भी कूल किया जाता है (आज की तरह रिकॉर्ड किया जाता है),
  बस कोई सिबलिंग लॉक नहीं होता।
- **कभी टर्मिनल नहीं**: कूलडाउन एक नवीनीकरणीय कोटा विंडो है
  (`testStatus: "unavailable"`); IP-स्तरीय सिग्नल से कभी कोई स्थायी स्थिति
  प्राप्त नहीं की जाती। `disableCooling` कनेक्शन इस ब्रांच को पूरी तरह
  छोड़ देते हैं।
- **अनुमतिसूची परिवार के लिए लॉक ग्रैन्युलैरिटी बदलती है**: यह एक स्कोप
  परिवर्तन है, केवल सिबलिंग ऑप्टिमाइज़ेशन नहीं। opencode एक
  `passthroughModels` प्रोवाइडर है, इसलिए इस ब्रांच से पहले 429 प्रति-मॉडल
  (per-MODEL) लॉकआउट उत्पन्न करता था; अब यह कनेक्शन कूलडाउन उत्पन्न करता
  है — उस ऑपरेटर के लिए भी जो बिना किसी सिबलिंग के एकल कनेक्शन चला रहा
  हो। यह वही ग्रैन्युलैरिटी है जिसे opencode रूल टेबल पहले से सही घोषित
  करती है (`scope: "connection"`, `providerErrorRules.ts`), जिसका अभी तक
  कभी पालन नहीं हुआ क्योंकि opencode `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
  में नहीं है। ब्रांच स्वयं विफल कनेक्शन का कूलडाउन + `backoffLevel` लिखता
  है, कनेक्शन-स्कोप्ड agentrouter ब्रांच के समान, और रिटर्न करता है —
  प्रति-मॉडल ब्लॉक और नीचे का जेनेरिक पथ कभी नहीं पहुँचा जाता।
- **कॉम्बो शामिल**: agentrouter ब्रांच की तरह, यह स्कोप जानबूझकर उस
  `persistUnavailableState`/`isCombo` डाउनग्रेड को अनदेखा करता है जो एक
  कॉम्बो कॉलर 429 पर लागू करता है। प्रति-मॉडल लॉकआउट इस स्कोप का कमज़ोर
  रूप नहीं है, यह गलत इकाई है: यह समाप्त हुई IP के बारे में कुछ नहीं
  बताता, इसलिए कॉम्बो रोटेशन प्रति सिबलिंग एक गारंटीड-विफल कॉल जलाता
  रहेगा।
- **सिबलिंग सुरक्षा**: पहले से टर्मिनल (banned/credits_exhausted) या पहले
  से लंबे कूलडाउन में मौजूद सिबलिंग को कभी ओवरराइट नहीं किया जाता।
- **एक्सक्लूसिव अनुमतिसूची**: `EGRESS_BUCKETED_LOCK_PROVIDERS` को चौड़ा
  करना एक स्पष्ट स्वामी निर्णय है; कोई जेनेरिक वायरिंग नहीं (पैटर्न
  #10334/#10419)। सिबलिंग क्वेरी उसी अनुमतिसूची को बाइंड करती है, बजाय
  इसे SQL लिटरल के रूप में दोहराने के, इसलिए इसे चौड़ा करना एक-पंक्ति का
  बदलाव ही रहता है।
- **Egress IP रोटेशन, दोनों दिशाओं में**: लुकअप विंडो (24 घंटे) egress-IP
  कैश TTL (5 मिनट) से काफी चौड़ी है, इसलिए "अंतिम ज्ञात IP" इतिहास है,
  वर्तमान स्थिति नहीं। यदि किसी कनेक्शन का प्रॉक्सी विंडो के भीतर रोटेट
  हुआ है, तो लॉक वास्तव में साझा की गई IP से **चूक सकता है** (रिकॉर्ड की
  गई IP नई, गैर-समाप्त IP है) — और सममित रूप से यह **ऐसे सिबलिंग को कूल
  कर सकता है जो तब से समाप्त IP से हट चुका है**। दूसरा मामला उस सिबलिंग को
  एक कूलडाउन विंडो का खर्च देता है; दोनों इतिहास-आधारित लुकअप की स्वीकृत
  बेस्ट-एफ़र्ट सीमाएँ हैं।
- **लागत**: `proxy_logs` के दो सीमाबद्ध स्कैन (`idx_pl_timestamp` के
  माध्यम से विंडो-फ़िल्टर्ड), केवल 429 आवृत्ति पर। कोई नया इंडेक्स नहीं
  (माइग्रेशन 134 YAGNI)। मध्यम आकार की वास्तविक-ट्रैफ़िक DB कॉपी पर मापा
  गया; उच्च-थ्रूपुट इंस्टेंस उसी विंडो में आनुपातिक रूप से अधिक रो रखता
  है।

---

## अन्य रेज़िलिएन्स सुविधाएँ

- **21 रूटिंग रणनीतियाँ** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — देखें [AUTO-COMBO.md](../routing/AUTO-COMBO.md)।
- **रीसेट-अवेयर रूटिंग** (v3.8.0) — कोटा रीसेट समय के अनुसार कनेक्शनों को प्राथमिकता देता है।
- **बैकग्राउंड मोड डिग्रेडेशन** — Responses API का `background: true` चेतावनी के साथ सिंक मोड में डिग्रेड कर दिया जाता है।
- **डायनामिक टूल लिमिट डिटेक्शन** — टूल संख्या सीमा पूरी होने पर प्रोवाइडर को बैक-ऑफ करता है।
- **इमरजेंसी फ़ॉलबैक** — `OMNIROUTE_EMERGENCY_FALLBACK` द्वारा नियंत्रित; ऑपरेटर इसे बिना रीस्टार्ट किए Feature Flags पेज से ओवरराइड कर सकते हैं।

---

## डिबगिंग

- Weighted combo `503 all_targets_cooling_down` लौटाता है (`Retry-After` सेट, `diagnostics.excluded` हर टारगेट को `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` के साथ सूचीबद्ध करता है) → पूल कॉन्फ़िगर और कनेक्टेड है, हर टारगेट बस किसी रेज़िलिएन्स टाइमर द्वारा बाहर किया गया है; `[COMBO] Weighted selection: every target excluded before dispatch — …` चेतावनी कारणों और शेष सेकंडों को बताती है। उसी combo से `404 no_executable_targets` का मतलब है कि कोई रेज़िलिएन्स टाइमर शामिल नहीं था (चलाने के लिए कुछ नहीं, या हर अकाउंट उपलब्धता जाँच में विफल रहा)। यह `targetResolution.ts` में एकत्रित exclusions से `open-sse/services/combo/pinRecovery.ts` में बनाया गया है।
- किसी प्रोवाइडर की सभी keys स्किप हो जाएँ → सर्किट ब्रेकर स्थिति और प्रत्येक कनेक्शन की `rateLimitedUntil`/`testStatus` दोनों जाँचें।
- रीसेट विंडो के बाद भी प्रोवाइडर स्थायी रूप से बाहर रहे → कोड `getStatus()`/`canExecute()` के बजाय कच्चा `state` पढ़ रहा है।
- एक key विफल हो, बाकी काम करें → सर्किट ब्रेकर के बजाय कनेक्शन कूलडाउन को प्राथमिकता दें।
- केवल एक मॉडल विफल हो → कनेक्शन कूलडाउन के बजाय मॉडल लॉकआउट को प्राथमिकता दें।
- स्थिति को स्वयं ठीक हो जानी चाहिए लेकिन नहीं होती → भविष्य का टाइमस्टैम्प और expired स्थिति को रिफ्रेश करने वाला read path जाँचें। स्थायी स्थितियों के लिए मैन्युअल बदलाव आवश्यक हैं।

---

## रनटाइम स्थिति — एजेंट त्वरित संदर्भ

> `AGENTS.md` → "Resilience Runtime State" (PR #12743) से यथावत स्थानांतरित, ताकि एजेंट
> गाइड 40k कॉन्टेक्स्ट बजट के अंदर रहे। यह ऊपर के सेक्शनों का संक्षिप्त, एजेंट-उन्मुख
> दृश्य है; क्रमांकित सेक्शन ही पूर्ण संदर्भ बने रहते हैं।

OmniRoute में तीन परस्पर संबंधित लेकिन अलग-अलग अस्थायी-विफलता तंत्र हैं। रूटिंग व्यवहार
डिबग करते समय इनके दायरे को अलग रखें। एक नज़र में समझने के लिए
[3-लेयर रेज़िलिएन्स डायग्राम](../diagrams/exported/resilience-3layers.svg)
(स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)) देखें।

### प्रोवाइडर सर्किट ब्रेकर

**दायरा**: पूरा प्रोवाइडर, जैसे `glm`, `openai`, `anthropic`।

**उद्देश्य**: उस प्रोवाइडर को ट्रैफ़िक भेजना रोकना जो अपस्ट्रीम/सेवा स्तर पर बार-बार
विफल हो रहा है, ताकि एक अस्वस्थ प्रोवाइडर हर अनुरोध को धीमा न कर दे।

**कार्यान्वयन**:

- कोर क्लास: `src/shared/utils/circuitBreaker.ts`
- चैट गेट/एक्ज़ीक्यूशन वायरिंग: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- रनटाइम स्थिति API: `src/app/api/monitoring/health/route.ts`
- साझा रैपर: `open-sse/services/accountFallback.ts`
- स्थायी स्थिति तालिका: `domain_circuit_breakers`

**स्थितियाँ** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: सामान्य ट्रैफ़िक की अनुमति है।
- `DEGRADED`: प्रारंभिक चेतावनी क्षेत्र — विफलताएँ डिग्रेडेशन थ्रेशोल्ड पार कर चुकी हैं
  लेकिन अभी ब्रेकर थ्रेशोल्ड नहीं; ट्रैफ़िक अभी भी बहता है, डैशबोर्ड चेतावनी दिखाते हैं।
  एक मान्य कनेक्शन परीक्षण या बिना नई विफलता की शांत विंडो इसे वापस `CLOSED` पर ला देती है
  (`docs/architecture/RESILIENCE_GUIDE.md` में विंडो दी गई है)।
- `OPEN`: प्रोवाइडर अस्थायी रूप से ब्लॉक है; कॉलर को provider-circuit-open प्रतिक्रिया
  मिलती है या कॉम्बो रूटिंग किसी दूसरे टारगेट पर चली जाती है।
- `HALF_OPEN`: रीसेट टाइमआउट बीत चुका है; एक probe अनुरोध की अनुमति दें। सफलता ब्रेकर को
  बंद कर देती है, विफलता इसे फिर से खोल देती है।

**डिफ़ॉल्ट** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, जिसे
`src/lib/resilience/settings.ts` में `DEFAULT_RESILIENCE_SETTINGS.providerBreaker` के माध्यम से →
`src/sse/handlers/chatHelpers.ts` में `getCircuitBreaker(provider, …)` उपभोग करता है)। पूरे-प्रोवाइडर
ब्रेकर `circuitBreakerThreshold` / `circuitBreakerReset` पर चलता है:

| प्रोफ़ाइल | डिग्रेड होता है | खुलता है (`circuitBreakerThreshold`) | रीसेट (`circuitBreakerReset`) |
| --------- | --------------: | -----------------------------------: | ----------------------------: |
| OAuth     |             `5` |                                  `8` |                         `60s` |
| API key   |             `7` |                                 `12` |                         `30s` |
| Local     |    (व्युत्पन्न) |                                  `2` |                         `15s` |

`PROVIDER_PROFILES` `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 मिनट) और `providerCooldownMs` (5/10/1 मिनट) भी परिभाषित करता है:
ये **opt-in ग्लोबल Provider Cooldown के विंडो गेट** को चलाते हैं (`PROVIDER_COOLDOWN_ENABLED`,
डिफ़ॉल्ट रूप से बंद) — `open-sse/services/providerCooldownTracker.ts` में कोई प्रोवाइडर-स्तरीय एंट्री
तभी कूलिंग मानी जाती है जब `providerFailureWindowMs` के भीतर `providerFailureThreshold` विफलताएँ
हों, और फिर वह `providerCooldownMs` के लिए कूल होती है। ये लाइव ब्रेकर के थ्रेशोल्ड नहीं हैं —
इन्हें ब्रेकर व्यवहार की अपेक्षा करते हुए ट्यून न करें। हर डिफ़ॉल्ट को
`OMNIROUTE_PROVIDER_BREAKER_*` और `OMNIROUTE_CIRCUIT_BREAKER_*` env vars से ओवरराइड किया जा सकता है;
रनटाइम-सटीक संदर्भ तालिका `docs/architecture/RESILIENCE_GUIDE.md` में है।

केवल प्रोवाइडर-स्तरीय विफलता स्थितियाँ ही प्रोवाइडर ब्रेकर को ट्रिप करनी चाहिए:

```ts
(408, 500, 502, 503, 504);
```

सामान्य अकाउंट/key/मॉडल त्रुटियों — जैसे अधिकांश `401`, `403`, या `429` मामले — के लिए
पूरे-प्रोवाइडर ब्रेकर को ट्रिप न करें। वे आमतौर पर कनेक्शन कूलडाउन या मॉडल लॉकआउट से
संबंधित होते हैं। किसी सामान्य API-key प्रोवाइडर की `403` तब तक रिकवरेबल होनी चाहिए
जब तक उसे टर्मिनल प्रोवाइडर/अकाउंट त्रुटि के रूप में वर्गीकृत न किया जाए।

ब्रेकर बैकग्राउंड टाइमर के बजाय lazy recovery का उपयोग करता है। जब `OPEN` की अवधि समाप्त हो जाती है, तो `getStatus()`, `canExecute()` और `getRetryAfterMs()` जैसे रीड ऑपरेशन स्टेट को `HALF_OPEN` में रिफ्रेश कर देते हैं, जिससे डैशबोर्ड और कॉम्बो कैंडिडेट बिल्डर किसी समाप्त हो चुके प्रोवाइडर को हमेशा के लिए बाहर नहीं रखते।

### कनेक्शन कूलडाउन

**दायरा**: एक प्रोवाइडर कनेक्शन/अकाउंट/की।

**उद्देश्य**: एक खराब की/अकाउंट को अस्थायी रूप से स्किप करना, जबकि उसी प्रोवाइडर के अन्य कनेक्शन अनुरोधों को संभालते रहें।

**कार्यान्वयन**:

- लिखने/अपडेट करने का पथ: `src/sse/services/auth.ts::markAccountUnavailable()`
- अकाउंट चयन/फ़िल्टरिंग: `src/sse/services/auth.ts::getProviderCredentials...`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्स: `src/lib/resilience/settings.ts`

प्रोवाइडर कनेक्शन पर महत्वपूर्ण फ़ील्ड:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

अकाउंट चयन के दौरान, एक कनेक्शन को तब तक स्किप किया जाता है जब तक:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

कूलडाउन भी lazy होते हैं: जब `rateLimitedUntil` बीते समय में हो जाता है, तो कनेक्शन फिर से योग्य बन जाता है। सफल उपयोग पर, `clearAccountError()` `testStatus`, `rateLimitedUntil`, एरर फ़ील्ड और `backoffLevel` को साफ़ कर देता है।

डिफ़ॉल्ट कनेक्शन कूलडाउन व्यवहार:

- OAuth बेस कूलडाउन: `5s`।
- API-key बेस कूलडाउन: `3s`।
- API-key `429` के लिए, उपलब्ध होने पर अपस्ट्रीम रिट्राई संकेतों (`Retry-After`, रीसेट हेडर, या पार्स किए जा सकने वाले रीसेट टेक्स्ट) को प्राथमिकता दी जानी चाहिए।
- बार-बार होने वाली रिकवरेबल विफलताओं के लिए एक्सपोनेंशियल बैकऑफ़ का उपयोग होता है:

```ts
baseCooldownMs * 2 ** failureIndex;
```

एंटी-थंडरिंग-हर्ड गार्ड एक ही कनेक्शन पर समवर्ती विफलताओं को कूलडाउन को बार-बार बढ़ाने या `backoffLevel` को दोगुना इंक्रीमेंट करने से रोकता है।

टर्मिनल स्टेट कूलडाउन नहीं होते। `banned`, `expired` (जो केवल `EXPIRED_RETRY_MAX` के माध्यम से N सीमित रिट्राई के बाद टर्मिनल बनता है), और `credits_exhausted` तब तक अनुपलब्ध रहने के लिए होते हैं जब तक क्रेडेंशियल/सेटिंग्स न बदलें या कोई ऑपरेटर उन्हें रीसेट न करे। टर्मिनल स्टेट को ट्रांज़िएंट कूलडाउन स्टेट से ओवरराइट न करें।

### मॉडल लॉकआउट

**दायरा**: प्रोवाइडर + कनेक्शन + मॉडल।

**उद्देश्य**: जब किसी कनेक्शन के लिए केवल एक मॉडल अनुपलब्ध या कोटा-सीमित हो, तो पूरे कनेक्शन को अक्षम करने से बचना।

उदाहरण:

- प्रति-मॉडल कोटा वाले प्रोवाइडर जो `429` लौटाते हैं।
- लोकल प्रोवाइडर जो किसी गायब मॉडल के लिए `404` लौटाते हैं।
- प्रोवाइडर-विशिष्ट मोड/मॉडल अनुमति विफलताएँ, जैसे चयनित Grok मोड।

मॉडल लॉकआउट `open-sse/services/accountFallback.ts` में रहता है और उसी कनेक्शन को अन्य मॉडलों की सेवा जारी रखने देता है।

### डिबगिंग दिशानिर्देश

- यदि किसी प्रोवाइडर की सभी की स्किप हो रही हैं, तो प्रोवाइडर ब्रेकर स्टेट और प्रत्येक कनेक्शन के `rateLimitedUntil`/`testStatus` दोनों की जाँच करें।
- यदि रीसेट विंडो के बाद भी कोई प्रोवाइडर स्थायी रूप से बाहर दिखता है, तो जाँचें कि कहीं कोड `getStatus()`/`canExecute()` का उपयोग करने के बजाय कच्चा `state` तो नहीं पढ़ रहा।
- यदि किसी प्रोवाइडर की एक की विफल होती है लेकिन अन्य को काम करना चाहिए, तो प्रोवाइडर ब्रेकर के बजाय कनेक्शन कूलडाउन को प्राथमिकता दें।
- यदि केवल एक मॉडल विफल होता है, तो कनेक्शन कूलडाउन के बजाय मॉडल लॉकआउट को प्राथमिकता दें।
- यदि किसी स्टेट को स्वयं रिकवर होना चाहिए, तो उसमें भविष्य का टाइमस्टैम्प/रीसेट टाइमआउट और एक ऐसा रीड पथ होना चाहिए जो समाप्त हुई स्टेट को रिफ्रेश करे। स्थायी स्टेटस के लिए मैनुअल क्रेडेंशियल या कॉन्फ़िग परिवर्तन आवश्यक होते हैं।

---

## TLS फ़िंगरप्रिंटिंग और स्टील्थ

प्रोवाइडर-विशिष्ट स्टील्थ (JA3/JA4, CCH, ऑब्फस्केशन) अलग से दस्तावेज़ित है — `docs/security/STEALTH_GUIDE.md` देखें (git; `/docs` में कंपाइल नहीं किया गया)।

---

## रेज़िलियंस परीक्षण (Phase 8 · Block C)

रेज़िलियंस लॉजिक के यूनिट टेस्टों के अलावा, तीन टेस्ट वास्तविक स्ट्रेस/विफलता
परिस्थितियों में रनटाइम का प्रयोग करते हैं (सभी इंटीग्रेशन/नाइटली — कोई भी PR को ब्लॉक नहीं करता):

| टेस्ट       | क्या                                                                                                                                                                                                        | चलाएँ                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Chaos       | फेक-अपस्ट्रीम नोड वास्तविक latency/reset/timeout/503 इंजेक्ट करता है; यह सत्यापित करता है कि सर्किट ब्रेकर खुलता/रिकवर होता है और `checkFallbackError` 503 को रिकवरेबल फ़ॉलबैक के रूप में वर्गीकृत करता है। | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| Heap-growth | `--expose-gc` के तहत प्रत्येक `createSSEStream` पर ~500 स्ट्रीम; यदि हीप निर्धारित सीमा से अधिक बढ़ती है तो विफल होता है (OOM गार्ड #3069)।                                                                 | `npm run test:heap`                     |
| k6 soak     | `/api/monitoring/health` के विरुद्ध निरंतर लोड; p95/एरर थ्रेशोल्ड।                                                                                                                                          | `k6 run tests/load/k6-soak.js` (नाइटली) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) द्वारा ऑर्केस्ट्रेटेड।
डिफ़ॉल्ट `test:integration` में, chaos और heap स्वयं-स्किप हो जाते हैं (`RUN_CHAOS_INT`/`--expose-gc` के बिना)।

---

## यह भी देखें

- [आर्किटेक्चर गाइड](./ARCHITECTURE.md) — सिस्टम आर्किटेक्चर और इंटरनल्स
- [उपयोगकर्ता गाइड](../guides/USER_GUIDE.md) — प्रोवाइडर, कॉम्बो, CLI इंटीग्रेशन
- [Auto-Combo इंजन](../routing/AUTO-COMBO.md) — 16-फ़ैक्टर स्कोरिंग, मोड पैक
