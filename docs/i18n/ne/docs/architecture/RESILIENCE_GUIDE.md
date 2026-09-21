# Resilience Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute मा तीनवटा फरक तर परस्पर सम्बन्धित लचिलोपन संयन्त्रहरू छन्। प्रत्येकको कार्यक्षेत्र र उद्देश्य फरक छ। राउटिङ व्यवहार डिबग गर्दा तिनलाई अलग-अलग राख्नुहोस्।

![३-तहको लचिलोपन मोडेल](../diagrams/exported/resilience-3layers.svg)

> स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## १. प्रदायक सर्किट ब्रेकर

**कार्यक्षेत्र:** सम्पूर्ण प्रदायक (जस्तै, `glm`, `openai`, `anthropic`)।

**उद्देश्य:** अपस्ट्रिम/सेवा तहमा बारम्बार असफल भइरहेको प्रदायकमा ट्राफिक पठाउन रोक्नु।

**कार्यान्वयन:**

- मुख्य क्लास: `src/shared/utils/circuitBreaker.ts`
- वायरिङ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- स्थिति API: `GET /api/monitoring/health`
- रिसेट API: `POST /api/resilience/reset`
- र्यापरहरू: `open-sse/services/accountFallback.ts`
- DB तालिका: `domain_circuit_breakers`

**अवस्थाहरू:**

- `CLOSED` — सामान्य ट्राफिकलाई अनुमति
- `DEGRADED` — ट्राफिकलाई अझै अनुमति छ, तर प्रदायकका बढेका विफलताहरू ट्र्याक गरिँदै छन्
- `OPEN` — प्रदायक अस्थायी रूपमा रोकिएको छ; कम्बो राउटिङले यसलाई छोड्छ
- `HALF_OPEN` — रिसेट टाइमआउट समाप्त भएको छ; परीक्षण अनुरोधलाई अनुमति

**कन्फिगर गर्न मिल्ने पूर्वनिर्धारित मानहरू (`open-sse/config/constants.ts`, ड्यासबोर्ड → सेटिङहरू → लचिलोपनमा उपलब्ध):**

| वर्ग       | डिग्रेड हुने बिन्दु | खुल्ने बिन्दु | रिसेट टाइमआउट |
| ---------- | ------------------- | ------------- | ------------- |
| OAuth      | ५ विफलता            | ८ विफलता      | ६० सेकेन्ड    |
| API-कुञ्जी | ७ विफलता            | १२ विफलता     | ३० सेकेन्ड    |
| स्थानीय    | व्युत्पन्न          | २ विफलता      | १५ सेकेन्ड    |

`degradationThreshold` ले प्रदायक कहिले `DEGRADED` मा प्रवेश गर्छ भन्ने नियन्त्रण गर्छ; `failureThreshold` ले त्यो कहिले खुल्छ र छोडिन्छ भन्ने नियन्त्रण गर्छ। स्थानीय प्रदायक प्रोफाइलहरू हालसम्म लचिलोपन सेटिङ पृष्ठमा उपलब्ध छैनन्।

**ट्रिप कोडहरू:** प्रदायक-तहका स्थिति `[408, 500, 502, 503, 504]` मात्र। खाता-तहका त्रुटिहरूका लागि ट्रिप **नगर्नुहोस्** (अधिकांश 401/403/429 — ती कुलडाउन वा लकआउटअन्तर्गत पर्छन्)।

**लेजी रिकभरी:** `OPEN` को अवधि सकिएपछि, `getStatus()`, `canExecute()`, `getRetryAfterMs()` ले अवस्थालाई `HALF_OPEN` मा रिफ्रेस गर्छन्। पृष्ठभूमि टाइमर आवश्यक पर्दैन।

---

### अप्ट-इन विश्वव्यापी प्रदायक कुलडाउन (विन्डो गेट)

चौथो, **अप्ट-इन** तह (`PROVIDER_COOLDOWN_ENABLED`, पूर्वनिर्धारित रूपमा **बन्द**) ले
`open-sse/services/providerCooldownTracker.ts` मा असफल प्रदायकहरूको क्रस-अनुरोध
स्मृति राख्छ, जसलाई कम्बो लक्ष्य रिजोल्युसनले प्रयोग गर्छ, ताकि लगातार आउने
कम्बो अनुरोधहरूले भर्खरै असफल भएको प्रदायकलाई पुनः-पुनः नजाँचून्। प्रदायक-तहका
प्रविष्टिहरूले `PROVIDER_PROFILES` विन्डो गेट पालना गर्छन्:

| प्रोफाइल   | यति पछि ट्रिप हुन्छ (`providerFailureThreshold`) | यसभित्र (`providerFailureWindowMs`) | यति समय कुलडाउन हुन्छ (`providerCooldownMs`) |
| ---------- | -----------------------------------------------: | ----------------------------------: | -------------------------------------------: |
| OAuth      |                                             `10` |                             `15min` |                                       `5min` |
| API कुञ्जी |                                             `15` |                             `30min` |                                      `10min` |

थ्रेसहोल्डभन्दा तल प्रदायकलाई **कुलडाउनमा रहेको** मानिँदैन; सफलताले विन्डो
खाली गर्छ। यसको सट्टा, जडान-तहका प्रविष्टिहरू (`provider:connectionId`) ले
घाताङ्कीय `minRetryCooldownMs → maxRetryCooldownMs` ब्याकअफ कायम राख्छन्। ओभरराइडहरू:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`।
रिग्रेसन गार्ड: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. जडान कूलडाउन

**दायरा:** एकल प्रदायक जडान/खाता/कुञ्जी।

**उद्देश्य:** एउटै प्रदायकका अन्य जडानहरूले सेवा दिइरहँदा एउटा खराब कुञ्जीलाई छोड्ने।

**कार्यान्वयन:**

- अनुपलब्ध चिन्ह लगाउने: `src/sse/services/auth.ts::markAccountUnavailable()`
- चयन: सोही फाइलमा रहेको `getProviderCredentials*`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिङहरू: `src/lib/resilience/settings.ts`

**प्रत्येक जडानका फिल्डहरू:**

- `rateLimitedUntil` — कूलडाउन समाप्त हुने समयसम्मको टाइमस्ट्याम्प
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — एक्स्पोनेन्सियल ब्याकअफ काउन्टर

**पूर्वनिर्धारित कूलडाउनहरू:**

- OAuth आधार: 5s
- API-key आधार: 3s
- API-key 429: अपस्ट्रिम `Retry-After`/रिसेट हेडरहरू/पार्स गर्न सकिने रिसेट पाठलाई प्राथमिकता दिन्छ
- ब्याकअफ: `baseCooldownMs * 2 ** failureIndex`

**थन्डरिङ-हर्ड-विरोधी सुरक्षा:** समवर्ती विफलताहरूले कूलडाउनलाई अत्यधिक लम्ब्याउन वा `backoffLevel` लाई दोहोरो रूपमा बढाउनबाट रोक्छ।

**टर्मिनल अवस्थाहरू (कूलडाउनहरू होइनन्):**

- `banned` — प्रतिबन्धित कुञ्जीशब्द / खाता-प्रतिबन्ध पहिचानद्वारा सेट गरिन्छ ([BAN_DETECTION](../security/BAN_DETECTION.md) हेर्नुहोस्), र लगातार तीनवटा अपस्ट्रिम प्रति-अनुरोध अस्वीकार (`request_rejected`, जस्तै Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) द्वारा पनि सेट गरिन्छ; एउटै अस्वीकारले जडानलाई कूलडाउनमा मात्र राख्छ
- `expired` (सीमित पुनःप्रयासपछि टर्मिनल अवस्थामा रूपान्तरण हुन्छ — एक्स्पोनेन्सियल ब्याकअफसहित `EXPIRED_RETRY_MAX = 3` — ताकि क्षणिक OAuth त्रुटिहरूले खाता स्थायी रूपमा निष्क्रिय हुनुअघि आफैँ सुधारिन सकून्)
- `credits_exhausted`

प्रमाणपत्रहरू परिवर्तन नभएसम्म वा अपरेटरले तिनलाई रिसेट नगरेसम्म यी कायम रहन्छन्। टर्मिनल अवस्थाहरूलाई क्षणिक कूलडाउन अवस्थाले अधिलेखन नगर्नुहोस्।

**लेजी रिकभरी:** `rateLimitedUntil` बितिसकेपछि जडान फेरि योग्य हुन्छ। सफल प्रयोगपछि, `clearAccountError()` ले सबै त्रुटि फिल्डहरू खाली गर्छ।

### सत्र आत्मीयता (#7274)

**दायरा:** एउटा जडानमा पिन गरिएको एक क्लाइन्ट सत्र (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` हेडर), **कुनै पनि** प्रदायकका लागि।

**उद्देश्य:** बहु-टर्न एजेन्ट (Claude Code, aider, अनुकूलित एजेन्टहरू) लाई अनुरोधहरूभरि एउटै खातामा राख्ने, जसले खाताबीचको सन्दर्भ क्षति र प्रति-खाता सत्र अवस्था भएका प्रदायकहरूमा दोहोरिने कोल्ड-स्टार्ट 429 हरू घटाउँछ।

**कार्यान्वयन:**

- TTL निर्धारण: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- पिन चयन/सिर्जना: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- हेडर निष्कर्षण (सामान्य, कुनै पनि प्रदायक): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- स्थायी पिन तालिका: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- सेटिङ: `sessionAffinityTtlMs` (ms मा ग्लोबल TTL, `0` ले निष्क्रिय गर्छ) — `src/lib/db/settings.ts`। माइग्रेसन `124_generic_session_affinity_ttl.sql` द्वारा Codex-मात्र `codexSessionAffinityTtlMs` बाट नाम परिवर्तन गरिएको हो, जसले पहिले कन्फिगर गरिएको कुनै पनि Codex TTL लाई नयाँ पूर्वनिर्धारित मानका रूपमा सार्छ।

#7274 अघि, `resolveSessionAffinityTtlMs()` ले `codex` बाहेक प्रत्येक प्रदायकका लागि तत्काल `0` फर्काउँथ्यो, त्यसैले पिनिङ संयन्त्र र हेडर निष्कर्षण पहिले नै प्रदायक-निरपेक्ष भए तापनि TTL सेटिङ (र सत्र हेडरहरू) को अन्यत्र कुनै प्रभाव थिएन। सुधारले त्यो प्रारम्भिक रिटर्न हटायो; अब TTL विश्वव्यापी रूपमा `0` भन्दा माथि सेट गरिएपछि प्रत्येक प्रदायकमा समान रूपमा लागू हुन्छ।

तीनवटा सत्र-आत्मीयता हेडरहरू कहिल्यै अपस्ट्रिममा फर्वार्ड गरिँदैनन् — क्लाइन्ट हेडरहरू पास गर्नुको सट्टा एक्जिक्युटरहरूले आफ्नै अपस्ट्रिम हेडरहरू सुरुदेखि निर्माण गर्छन्, त्यसैले यो आन्तरिक सहसम्बन्ध ID का रूपमा मात्र रहन्छ।

### विशिष्ट व्यवस्थापित सत्र जडान लिजहरू

**दायरा:** एउटा सक्रिय व्यवस्थापित HTTP क्लाइन्ट/सत्रले एउटा योग्य OmniRoute जडानको स्वामित्व लिन्छ।

**उद्देश्य:** अनुरोधहरूभरि कडा राउटिङ
सीमा आवश्यक पर्ने क्लाइन्टहरूका लागि टिकाउ विशिष्ट जडान स्वामित्व प्रदान गर्ने। यो सत्र आत्मीयताभन्दा फरक छ, जुन नरम निरन्तरता प्राथमिकता हो:
विशिष्ट लिजले SQLite मा जीवनचक्र अवस्था कायम राख्छ, विश्वव्यापी सक्रिय-स्वामी र
सक्रिय-जडान अद्वितीयता लागू गर्छ, र प्रदायक डिस्प्याचअघि पुरानो जेनेरेसन अस्वीकार गर्छ।

यो सुविधा प्रत्येक API कुञ्जीका लागि अप्ट-इन हो। व्यवस्थापित कुञ्जीसँग `lease:exclusive` स्कोप र
स्पष्ट रूपमा खाली नभएको `allowedConnections` सूची हुनैपर्छ। कुनै पनि HTTP क्लाइन्टले जीवनचक्र एन्डपोइन्ट प्रयोग गर्न सक्छ; कुनै
क्लाइन्ट नाम, user-agent, प्रदायक, OAuth विधि वा मोडेल आवश्यक पर्दैन। लिजले जडानको स्वामित्व लिन्छ,
मोडेलको होइन, त्यसैले जडान सामान्य रूपमा
योग्य रहुञ्जेल मोडेल परिवर्तनले बाइन्डिङ कायम राख्छ। सामान्य मोडेल, कोटा, स्वास्थ्य, कूलडाउन र अनुमति-सूची नियमहरू नै
आधिकारिक रहन्छन् र तिनले उही जेनेरेसनलाई अर्को खाली योग्य जडानमा सार्न सक्छन्।

जीवनचक्र JSON कार्यहरू `acquire`, `renew`, र `release` सहितको `POST /api/v1/session-leases` हो।
व्यवस्थापित इन्फरेन्स अनुरोधहरूले अपारदर्शी `X-OmniRoute-Lease-Owner` मान र ठ्याक्कै
`X-OmniRoute-Lease-Generation` प्रस्तुत गर्छन्। स्वामीले `vlo_` पछि 43 वटा base64url वर्ण प्रयोग गर्छ; यसको
SHA-256 ह्यास मात्र भण्डारण गरिन्छ। प्रत्येक अन्तिम डिस्प्याच सीमाले प्रमाणीकरण गरिएको API कुञ्जी ID र
सक्रिय जडान ID लाई पनि बाँध्छ। लिज नियन्त्रण हेडरहरू लगहरू, कायम राखिएका अनुरोध स्न्यापसटहरू, र
अपस्ट्रिम एक्जिक्युटर हेडरहरूबाट हटाइन्छन्।

यदि सामान्य राउटिङसँग योग्य व्यवस्थापित उम्मेदवारहरू छन् तर प्रत्येक खाली उम्मेदवार कुनै
विदेशी सक्रिय लिजद्वारा ओगटिएको छ भने, OmniRoute ले HTTP `429`, lease-capacity-unavailable कोड,
waiting-for-capacity अवस्था, र सबैभन्दा चाँडो हुने सान्दर्भिक म्याद समाप्तिबाट निकालिएको सीमित `Retry-After` फर्काउँछ।
सामान्य खाली योग्यता लिज प्रतिस्पर्धा होइन र यसले आफ्नो विद्यमान राउटिङ त्रुटि अर्थविज्ञान कायम राख्छ।

सम्बन्धित संयन्त्रहरू अलग रहन्छन्:

- OAuth सत्र ओगटाइ OAuth खाताहरूका लागि प्रोसेस-लोकल नरम वितरण हो।
- खाता सेमाफोरहरूले अनुरोध-समवर्तीता अनुमतिहरू दिन्छन् र अनुरोध पूरा हुँदा समाप्त हुन्छन्।
- विशिष्ट व्यवस्थापित सत्र लिजहरू जेनेरेसन सीमासहितको टिकाउ जीवनचक्र स्वामित्व हुन्।

---

## 3. मोडेल लकआउट

**दायरा:** provider + connection + model त्रय।

**स्थितिअनुसार कुञ्जीको दायरा:** असफल स्थिति कोडले लकआउट कुन कुञ्जीमा लेख्ने भन्ने निर्धारण गर्छ
(`open-sse/services/accountFallback/exactModelLock.ts` मा रहेको `resolveLockoutScope()`):

- `429` / `403` / `402` — quota वा entitlement संकेत — ले **quota family** लक गर्छ:
  codex का लागि connection को सम्पूर्ण `codex` / `spark` दायरा (हरेक `gpt-5*` model), अन्य provider हरूका लागि `getQuotaScopedModelForProvider()`।
- `404` ले मूल model लाई लक गर्छ (`getModelLockKey()` ले `not_found` लाई साँघुरो बनाउँछ)।
- अन्य कुनै पनि स्थिति — `5xx` transport/server विफलता र गुणस्तर प्रमाणीकरणबाट OmniRoute ले आफैँ सिर्जना गरेको
  `502` — ले ठ्याक्कै सोही provider/connection/model tuple मात्र लक गर्छ। एउटा model मा खराब stream आउनु account को quota सम्बन्धी प्रमाण होइन;
  यो नियम आउनुअघि `codex/gpt-5.6-luna` मा आएको एउटा खाली response ले त्यस connection का हरेक `gpt-5*` model लाई routing बाट 2–30 min (क्रमशः बढ्दै जाने गरी) हटाउँथ्यो, जबकि यसको quota मा कुनै असर परेको हुँदैनथ्यो।
- caller ले स्पष्ट रूपमा दिएको `scope` विकल्प सधैँ प्राथमिक हुन्छ (Antigravity ले `"exact"` पठाउँछ)।

**उद्देश्य:** एउटा मात्र model अनुपलब्ध वा quota-सीमित हुँदा सम्पूर्ण connection निष्क्रिय हुनबाट जोगाउनु।

**उदाहरणहरू:**

- 429 फर्काउने प्रति-model quota भएका provider हरू
- एउटा हराइरहेको model का लागि 404 फर्काउने local provider हरू
- provider-विशिष्ट mode/model permission विफलताहरू (जस्तै, Grok modes)

**कार्यान्वयन:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### मोडेल कुलडाउन ड्यासबोर्ड (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

सक्रिय lockout हरूलाई provider, connection, model, कारण र expiresAt सहित सूचीबद्ध गर्छ। अपरेटरहरूले card बाट model लाई म्यानुअल रूपमा पुनः सक्षम गर्न सक्छन्।

**REST API:**

- `GET /api/resilience/model-cooldowns` — सक्रिय lockout हरू सूचीबद्ध गर्नुहोस्
- `DELETE /api/resilience/model-cooldowns` — म्यानुअल रूपमा पुनः सक्षम गर्नुहोस्। Body: `{provider, connection, model}`। Auth: management।

### लकआउट सेटिङ UI + सफलता-क्षय पुनःप्राप्ति (v3.8.23)

Model lockout सधैँ सक्रिय रहने hardcoded व्यवहारबाट आफ्नै settings card र स्वचालित रूपमा सुधार हुने recovery path सहितको पूर्ण रूपमा कन्फिगर गर्न मिल्ने, opt-in सुविधामा परिवर्तन भएको छ।

**Settings card:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
यो माथिको read-only `ModelCooldownsCard` भन्दा **फरक** छ (जसले सक्रिय lockout हरू मात्र
_सूचीबद्ध गर्छ_) — नयाँ card ले _parameter हरू कन्फिगर गर्छ_। पूर्वनिर्धारित मानहरू
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) मा छन्:

| सेटिङ                   | पूर्वनिर्धारित                   | अर्थ                                                                |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `enabled`               | `false`                          | मुख्य toggle — model lockout **पूर्वनिर्धारित रूपमा बन्द हुन्छ**।   |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | model-दायराको विफलताका रूपमा गणना हुने upstream status हरू।         |
| `baseCooldownMs`        | `120_000` (120 s)                | पहिलो विफलताका लागि प्रारम्भिक lockout अवधि।                        |
| `maxCooldownMs`         | `1_800_000` (30 min)             | क्रमशः बढाइएको cooldown को अधिकतम सीमा।                             |
| `maxBackoffSteps`       | `10`                             | अधिकतम exponential-backoff वृद्धि चरणहरू।                           |
| `useExponentialBackoff` | `true`                           | दोहोरिएका विफलताहरूले cooldown लाई exponentially बढाउने वा नबढाउने। |

Settings सामान्य settings store मार्फत सुरक्षित रहन्छन् र resilience settings schema मार्फत validate हुन्छन्; card ले `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` सहित) र `maxBackoffSteps` लाई सीमाभित्र राख्छ।

**सफलता-क्षय पुनःप्राप्ति:** recovery पूर्ण रूपमा timer को अवधि समाप्तिमा मात्र निर्भर हुँदैन। स्वस्थ response ले model को failure count क्रमशः घटाउँछ, जसले recovery window कै बीचमा निको भएको model लाई यसको timer सकिनुअघि नै escalation रोक्न (र lockout हटाउन) दिन्छ। combo target सफल हुँदा `open-sse/services/combo.ts` ले `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`) लाई call गर्छ, जसले भण्डारण गरिएको
`failureCount` लाई **आधा** बनाउँछ (`Math.floor(failureCount / 2)`); यो `0` पुगेपछि lockout entry पूर्ण रूपमा मेटाइन्छ। यसको counterpart `recordModelLockoutFailure()` ले escalation window भित्रका विफलताहरूमा count बढाउँछ (र cooldown लाई escalate गर्छ)। यो सफलता-क्षय सामान्य timer expiry को अतिरिक्त हो —
दुवैमध्ये कुनै पनि path ले model लाई पुनः सक्षम गर्न सक्छ।

**स्थिति:** lockout हरू DB मा persist नभई **in-memory** (प्रत्येक process का `Map` हरूमा
`provider:connectionId:model` द्वारा key गरिएको `ModelLockoutEntry`, र
`provider:connectionId:exact:model` द्वारा exact-scope lock हरू) राखिन्छन् —
restart हुँदा ती हराउँछन्। _Settings_ persist हुन्छन्; सक्रिय
lockout _state_ अस्थायी हुन्छ।

---

## 4. कोटा-सेयर समवर्तीता नियन्त्रण (v3.8.36)

सदस्यता खाताहरूले (GLM, MiniMax, आदि) प्रायः केवल ~1–3 वटा समवर्ती
अनुरोध स्वीकार गर्छन्; त्यो सीमा नाघ्दा 429 त्रुटि र कूलडाउन सुरु हुन्छन्। यो समस्या
**quota-share** (`qtSd/…`) कम्बोहरूमा विशेष रूपमा गम्भीर हुन्छ, जहाँ धेरै API कुञ्जीहरूले एउटै अपस्ट्रिम
खाता साझा गर्छन्। तीनवटा तहले साझा खातामा अनुरोधको बाढी आउनबाट रोक्छन्।

### प्रति-कनेक्सन समवर्तीता सीमा (`max_concurrent`)

प्रत्येक प्रदायक कनेक्सनले `max_concurrent` उच्चतम सीमा
(`provider_connections.max_concurrent`, कनेक्सन मोडल / API / DB मा सेट गरिने) घोषणा गर्न सक्छ।
कुनै सीमा नराख्न यसलाई खाली छोड्नुहोस्। तलको सिरियलाइजेसन तहलाई सञ्चालन गर्ने यो एकल सेटिङ हो —
यसलाई खाताको वास्तविक समवर्तीता अनुसार सेट गर्नुहोस् (जस्तै GLM ~1, MiniMax ~2)।

### कोटा-सेयर अनुरोध सिरियलाइजेसन

जब कोटा-सेयर डिस्प्याचले सकारात्मक `max_concurrent` घोषणा गरेको कनेक्सनलाई लक्षित गर्छ,
त्यस **खाता** मा जाने समवर्ती अनुरोधहरू प्रति-कनेक्सन सेमाफोर
(कुञ्जी `qsconn:<connectionId>`) मार्फत क्रमबद्ध गरिन्छ: अतिरिक्त अनुरोधहरूले खातामा बाढी ल्याउनुको सट्टा
**पङ्क्तिमा प्रतीक्षा गर्छन्**। यो **fail-open** हो — संतृप्त पङ्क्ति वा टाइमआउट हुँदा
डिस्प्याच गर्न मिल्ने अनुरोधलाई अस्वीकार गर्नुको सट्टा स्लटबिनै प्रक्रिया अगाडि बढ्छ।
यसलाई **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, पूर्वनिर्धारित रूपमा
सक्रिय) मा टगल गर्नुहोस्। `max_concurrent` सीमा नभएमा व्यवहार अपरिवर्तित रहन्छ।

> कोटा-सेयर राउटिङ गेट (`selectQuotaShareTarget`, DRR + P2C) आफैँमा
> fail-open छ र सीमा पुगेको कनेक्सनलाई केवल _कम प्राथमिकता_ दिन्छ — एकल-कनेक्सन
> पुलमा यसले कडा सीमा लगाउन सक्दैन, त्यसैले अनुरोधको बाढीलाई वास्तवमै नियन्त्रण गर्ने संयन्त्र यही
> सेमाफोर हो।

### कम्बो कूलडाउन-सचेत पुनःप्रयास

हरेक कम्बो रणनीतिका लागि (सक्रिय हुँदा), छोटो अस्थायी कूलडाउनका कारण 429
निश्चित हुने अनुरोधले 429 फर्काउनुको सट्टा कूलडाउन समाप्त हुन प्रतीक्षा गर्छ र पुनःडिस्प्याच हुन्छ
— यसले बहु-मोडेल कम्बोहरूमा Gemini-वर्गका TPM/RPM विन्डोहरू
(~60s retry-after) समेट्छ, जस्तै 2-मोडेल कम्बोका दुवै लक्ष्यले प्रति-मोडेल
दर सीमा पार गर्दा। यो **Settings → Resilience** अन्तर्गतको `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) द्वारा सीमित हुन्छ। यसले
`quota_exhausted` (मध्यरातसम्म लक गरिएको) वा प्रमाणीकरण/फेला नपरेका कारणहरूमा कहिल्यै प्रतीक्षा गर्दैन।

---

## 5. अनुरोध पङ्क्ति प्रवेश नियन्त्रण (v3.8.49 · issue #6593)

**कार्यक्षेत्र**: स्थानीय प्रति-प्रदायक+कनेक्सन दर-सीमा पङ्क्ति (`open-sse/services/rateLimitManager.ts`,
Bottleneck द्वारा समर्थित), माथिका तीन संयन्त्रभन्दा एक तह तल।

**`maxWaitMs` कार्यान्वयन समाप्तिका लागि प्रयोग हुने पुरानो स्थायी नाम हो।**
`resilienceSettings.requestQueue.maxWaitMs` लाई Bottleneck मा कार्यको
`expiration` का रूपमा पठाइन्छ, जसको टाइमर डिस्प्याचपछि मात्र सुरु हुन्छ। त्यसकारण यसले
स्थानीय पङ्क्तिमा बिताएको समयलाई होइन, लिमिटरद्वारा व्यवस्थित कार्यान्वयनलाई सीमित गर्छ। समाप्तिलाई
विश्वसनीय स्थानीय `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) का रूपमा प्रस्तुत गरिन्छ;
पुरानो पङ्क्ति-टाइमआउट कोड नाम विश्वसनीय आन्तरिक पछाडि-सङ्गतताका लागि मात्र
स्वीकार गरिन्छ। पूर्वनिर्धारित मान 15000ms हो; यसलाई `RATE_LIMIT_MAX_WAIT_MS` (env)
वा ड्यासबोर्ड (**Settings → Resilience**, 1–30000ms UI उच्चतम सीमा) मार्फत
ओभरराइड गर्नुहोस्। पङ्क्तिमा रहने समयको कुनै समयसीमा छैन; पङ्क्तिबद्ध कलरहरूको सङ्ख्या सीमित गर्न
तलको `maxQueueDepth` प्रयोग गर्नुहोस्।

**`maxQueueDepth` — ऐच्छिक प्रवेश सीमा (नयाँ)।** `resilienceSettings.requestQueue.maxQueueDepth`
ले एउटै प्रदायक+कनेक्सनका लागि एकै समयमा पङ्क्तिमा बस्न सक्ने (अझै डिस्प्याच नभएका)
अनुरोधहरूको सङ्ख्या सीमित गर्छ। पङ्क्तिमा पहिले नै `maxQueueDepth`
अनुरोधहरू हुँदा, नयाँ अनुरोध `limiter.schedule()` सम्म पुग्नुअघि नै टाइप गरिएको
`code: "RATE_LIMIT_QUEUE_FULL"` त्रुटिसहित तुरुन्त अस्वीकार गरिन्छ
— त्यसैले अस्वीकार प्रक्रिया कम खर्चिलो हुन्छ र त्यस अनुरोधका लागि कुनै पनि डाउनस्ट्रिम
प्रम्प्ट-कम्प्रेसन / अनुवाद कार्य हुनुअघि नै हुन्छ। पूर्वनिर्धारित `0` =
निष्क्रिय, जसले विद्यमान असीमित-पङ्क्ति व्यवहार कायम राख्छ; सीमा 0–100000।
यसलाई `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) वा
`resilienceSettings.requestQueue.maxQueueDepth` (ड्यासबोर्ड/API प्याच) मार्फत ओभरराइड गर्नुहोस्।

प्रवेश जाँच आफैँमा एउटा शुद्ध फङ्सन
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) हो, त्यसैले
वास्तविक Bottleneck लिमिटरबिना पनि यसको एकाइ परीक्षण गर्न सकिन्छ।

> #6593 खोल्ने RFC ले `bypassCompressionOnRateLimit`
> फ्ल्याग पनि प्रस्ताव गरेको थियो। यस रिपोको `open-sse/services/compression/` पाइपलाइन
> आउटबाउन्ड LLM अनुरोधमा गरिने प्रम्प्ट/कन्टेक्स्ट कम्प्रेसन हो (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ब्लक वरिपरि),
> संश्लेषित 429 बडीहरूमा गरिने HTTP प्रतिक्रिया कम्प्रेसन होइन — शाब्दिक बाइपास फ्ल्यागसँग
> मिल्ने कुनै कोड पथ छैन। त्यो प्रम्प्ट-कम्प्रेसन चरण पनि हाल अनुरोध पाइपलाइनमा
> `withRateLimit()` भन्दा _अघि_ चल्छ, त्यसैले पङ्क्ति-पूर्ण अस्वीकार हुँदा त्यसलाई छोड्न
> क्रम परिवर्तन गर्नु यस मुद्दाको कार्यक्षेत्रभन्दा छुट्टै र ठूलो परिवर्तन हो; यहाँ यसलाई जानाजानी
> **कार्यान्वयन गरिएको छैन** र CPU बचतबाट हुने लाभ क्रम परिवर्तनको जोखिम उठाउन लायक भएमा
> फलो-अपका रूपमा छोडिएको छ।

---

## 6. ढिलो-स्ट्रिम थ्रुपुट वाचडग (#9709)

वैकल्पिक `resilienceSettings.streamRecovery.throughputWatchdog` गार्डले
अझै पनि चङ्कहरू पठाइरहेको तर कन्फिगर गरिएको उपयोगी-आउटपुट दरभन्दा कम सहायक
आउटपुट उत्पादन गरिरहेको अपस्ट्रिम पत्ता लगाउँछ। यसलाई जानाजानी निष्क्रियता टाइमआउटभन्दा
फरक राखिएको छ: हार्टबिट र मेटाडेटाले कुनै पनि टाइमर रिसेट गर्दैनन् र तिनलाई प्रगति
मानिँदैन। यो कडा प्रयास समयसीमा (#9153) भन्दा पनि फरक छ, जुन आउटपुटको गुणस्तर
जस्तो भए पनि पूर्ण सुरक्षा सीमा रहन्छ।

वाचडगले रद्द गर्न सक्नुअघि वार्म-अप अवधि र त्यसपछि एउटा पूर्ण रोलिङ विन्डो आवश्यक
पर्छ। यसले Chat Completions र Responses API का आउटपुट इभेन्टहरूबाट टेक्स्ट डेल्टा
गणना गर्छ (UTF-8 बाइटको सावधानीपूर्ण प्रोक्सी), प्रयोगसम्बन्धी मात्र भएका र खाली इभेन्टहरू
बेवास्ता गर्छ, र टुल-कल वा रिजनिङ इभेन्टहरू प्रक्रियामा रहँदा मूल्याङ्कन स्थगित गर्छ। यो
पूर्वनिर्धारित रूपमा अक्षम हुन्छ र `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` मार्फत
सक्षम गर्न सकिन्छ; विन्डो, वार्म-अप, न्यूनतम दर र न्यूनतम मापनयोग्य आउटपुटलाई
सामान्य रेजिलियन्स-सेटिङ्स नर्मलाइजेसन तहले सीमित गर्छ।

सक्षम हुँदा, वाचडगद्वारा गरिने रद्द कार्य सक्रिय अपस्ट्रिम प्रयासमा मात्र लागू हुन्छ। कुनै
क्लाइन्टले देख्ने बाइट पठाइनुअघि, विद्यमान उही-अकाउन्टको प्रारम्भिक-रिकभरी पथले
प्रयास पुनः खोल्न सक्छ। कमिटपछि स्ट्रिमलाई कहिल्यै अन्धाधुन्ध रिप्ले गरिँदैन; विद्यमान
सुरक्षित मध्य-स्ट्रिम निरन्तरता कन्ट्र्याक्टले मात्र सफिक्स जोड्न सक्छ। अन्तिमीकरण
एकपटक मात्र हुन्छ, त्यसैले प्रयोग हिसाब र सेमाफोर रिलिज दोहोरिँदैनन्।

---

## 7. अपस्ट्रिम स्टेटस पुनर्कथन (गलत रूपमा उल्लेख गरिएका कोटा त्रुटिहरू)

**दायरा:** अस्थायी कोटा समाप्तिलाई गलत HTTP स्टेटससहित रिपोर्ट गर्ने एउटा अपस्ट्रिम गेटवे।

**उद्देश्य:** वर्गीकरण हुनुअघि भ्रामक स्टेटस सच्याउनु, ताकि डाउनस्ट्रिम उपभोक्ताहरू (फल्ब्याक इन्जिन, कम्बो एग्रिगेसन, क्लाइन्टतर्फको प्रतिक्रिया) ले विफलताको वास्तविक पुनःप्रयासयोग्य प्रकृति देखून्।

केही गेटवेहरूले अस्थायी कोटा समाप्तिलाई पुनःप्रयास गर्न नमिल्ने HTTP
स्टेटसद्वारा सङ्केत गर्छन्। `agentrouter.org` ले मानक `429` को सट्टा चिनियाँ बडी
(`用户额度不足` / `额度不足`) सहित `403` (कहिलेकाहीँ `400`) फर्काउँछ। Claude
Code जस्ता क्लाइन्टहरूले `403` लाई स्थायी ठानेर सेसन रद्द गर्छन्, र नसच्याइएमा
फल्ब्याक इन्जिनले यसलाई कोटा इभेन्टको सट्टा `AUTH_ERROR` का रूपमा
वर्गीकरण गर्नेछ।

**कार्यान्वयन:**

- रजिस्ट्री + म्याचर: `open-sse/config/upstreamStatusRestatement.ts` — नियमहरूको
  प्रति-प्रोभाइडर सूची (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), जसलाई `applyStatusRestatement()` मार्फत मिलान गरिन्छ।
- कल साइट: `open-sse/handlers/chatCore.ts` मा रहेको `providerFailure:` ब्लक
  (करिब लाइन 3654), `parseUpstreamError()` ले त्रुटिपूर्ण HTTP स्टेटस
  (`!providerResponse.ok`) सहितको अपस्ट्रिम प्रतिक्रिया पार्स गरेलगत्तै, र कुनै पनि
  वर्गीकरण चल्नुअघि, ताकि प्रत्येक डाउनस्ट्रिम उपभोक्ताले सच्याइएको
  स्टेटस देखोस्। `200` SSE स्ट्रिमभित्र समावेश गरिएका त्रुटिहरूले छुट्टै,
  पछिल्लो स्ट्रिम-पार्सिङ पथ पछ्याउँछन् र आज यो हुकले तिनलाई **समेट्दैन** — यो
  ज्ञात सीमा हो, जुन agentrouter को गलत स्टेटसका लागि अझै आवश्यक छैन (किनभने त्यो
  त्रुटिपूर्ण HTTP स्टेटसका रूपमा देखा पर्छ)।
- पुनःप्रयास योग्यता: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES` मा छ
  (`open-sse/services/combo/unavailableRetryGate.ts`), त्यसैले पुनर्कथित त्रुटिले
  निष्क्रिय `403` का रूपमा देखा पर्नुको सट्टा वास्तविक पुनःप्रयास विन्डो बोक्छ।
- कृत्रिम `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  पुनर्कथित प्रतिक्रियाले **क्लाइन्ट** लाई बताउने कुरा मात्र हो; यो आफैँमा
  कनेक्सनको आन्तरिक कूलडाउन/लकआउट अवधि होइन — त्यसलाई पुनर्कथित त्रुटि वास्तवमै
  ह्यान्डल गर्ने संयन्त्रले छुट्टै नियन्त्रित गर्छ (Connection Cooldown को बढ्दो ब्याकअफ,
  §2, API-key प्रोभाइडरहरूका लागि आधार `3s`; वा agentrouter जस्ता
  प्रति-मोडेल-कोटा प्रोभाइडरहरूका लागि Model Lockout, §3)। राउटर आन्तरिक रूपमा
  क्लाइन्टलाई विज्ञापन गरिएको 60s विन्डोभन्दा चाँडै पुनःप्रयासका लागि योग्य हुन सक्छ —
  यो जानाजानी राखिएको अतिरिक्त गुन्जायस हो, बग होइन।

स्थायी त्रुटिहरू (agentrouter को `无权访问模型` — यो मोडेलमा पहुँच छैन) कहिल्यै
पुनर्कथन गरिँदैनन्: `textMarkers` मिल्दा पनि `excludeMarkers` ले नियम निषेध गर्छ,
त्यसैले त्रुटिले आफ्नो मूल स्टेटस कायम राख्छ र कुनै पनि कुराले यसलाई अनन्तकालसम्म
पुनःप्रयास गर्दैन। मिल्दो प्रोभाइडर वर्गीकरण नियम
(`open-sse/config/providerErrorRules.ts` मा रहेको `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, घोषित आधार कूलडाउन `6h`) लाई
`checkFallbackError` (`open-sse/services/accountFallback.ts`) ले जेनेरिक
apikey-श्रेणीको `FORBIDDEN` प्रारम्भिक-रिटर्नभन्दा _अघि_ हेर्छ, र यसलाई
`honorsRuleLockScope(provider)` द्वारा गेट गरिएको छ (#10334 — हाल
`providerErrorRules.ts` मा रहेको `HONORS_RULE_LOCK_SCOPE_PROVIDERS` अनुमतिसूचीमार्फत
agentrouter मा मात्र लागू)। नियमले घोषणा गरेको 6h कूलडाउन
`fallbackResult.baseCooldownMs` का रूपमा प्रवाहित हुन्छ, तर यसले अझै पनि पहिल्यैदेखि
विद्यमान प्रति-मोडेल-कोटा लकआउट पथ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, कूलडाउन स्रोतबाहेक #10334 ले अपरिवर्तित) लाई नै
प्रयोग गर्छ: प्रत्येक अन्य मोडेल लकआउटजस्तै यसलाई अपरेटरको
`mlSettings.maxCooldownMs` (पूर्वनिर्धारित `1_800_000ms` / 30min) सम्म घटाएर
सीमित गरिन्छ, र _स्थायी रूपमा भण्डारित लकआउट कारण_ नियमको `"auth_error"` नभई
पहिल्यैदेखि हार्डकोड गरिएको `"forbidden"` नै रहन्छ — कारण स्ट्रिङ होइन, केवल
कूलडाउन अवधि मात्र सुरुदेखि अन्त्यसम्म सम्मान गरिन्छ। कनेक्सन स्वयं सक्रिय रहन्छ;
उही कनेक्सनका अन्य मोडेलहरू अप्रभावित रहन्छन्।

पुनः अभिव्यक्त गरिएका कोटा त्रुटिहरू (`额度不足`) उत्पादनमा एउटा प्रदायक नियमसम्म पुग्छन्
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, यसको आफ्नै कुनै घोषित cooldown छैन — persistence तहको
scaled backoff पूर्वनिर्धारित मान लागू हुन्छ)। #10334 देखि,
`ProviderErrorRuleMatch` मा रहेको `scope` लाई सुरुदेखि अन्त्यसम्म प्रयोग गरिन्छ, तर
**केवल** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist मा भएका प्रदायकहरूका लागि
(`providerErrorRules.ts` — हाल केवल `"agentrouter"`, `honorsRuleLockScope()`
मार्फत नियन्त्रित)। अन्य प्रत्येक प्रदायकका लागि `scope`, #10334 अघिकै जस्तै,
सूचनामूलक मात्र रहन्छ। `checkFallbackError` ले मिलेको नियमको scope लाई
`fallbackResult.ruleScope` का रूपमा उजागर गर्छ; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) एउटा साझा guard हो, जसले कुनै
`ruleScope` लाई connection-व्यापी, आफैँ पुनःस्थापित हुने संकेतका रूपमा मान्न वास्तवमै
सुरक्षित छ भनी पुष्टि गर्छ (scope `"connection"`, reason `quota_exhausted`, कहिल्यै
`permanent` होइन, कहिल्यै `creditsExhausted` होइन — भविष्यको कुनै नियमले scope
`"connection"` लाई स्थायी account अवस्थासँग जोड्न सक्ने सम्भावनाविरुद्धको सुरक्षा)।
दुई consumer ले यसलाई call गर्छन्:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider को **प्रति-model** lockout
  branch मा पर्नुको सट्टा (agentrouter मा `passthroughModels: true` छ → `hasPerModelQuota()`
  ले `true` फर्काउँछ), यसले **अस्थायी connection cooldown** लागू गर्छ —
  `testStatus: "unavailable"` + `rateLimitedUntil`, कहिल्यै terminal status
  (`credits_exhausted`/`banned`/`expired`) होइन — त्यसैले cooldown सकिएपछि
  connection आफैँ पुनःस्थापित हुन्छ र manual credential reset आवश्यक पर्दैन।
  `disableCooling: true` भएका connection हरूका लागि यसलाई छाडिन्छ (#2997): त्यो opt-out
  बरु per-model lockout मा जान्छ (दस्तावेजीकृत trade-off —
  branch माथिको code comment हेर्नुहोस्)।
- **उही-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): उही guard ले connection लाई
  `${provider}:${connectionId}` द्वारा key गरिएको in-memory `exhaustedConnections` set मा
  चिन्ह लगाउँछ। यसले केवल त्यस्तो बाँकी SAME-REQUEST target लाई छाड्छ, जसले आफ्नो
  target object मै ठ्याक्कै त्यही `connectionId` बोकेको हुन्छ
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` लाई `exhaustedConnections` lookup भन्दा अगाडि) — सामान्य
  model-list combo मा sibling target हरूले आफ्नै pinned `connectionId` बोक्दैनन्
  र response को `X-OmniRoute-Selected-Connection-Id` header बाट प्रति-dispatch
  एउटा मात्र resolve गरिन्छ, त्यसैले त्यो key match कहिल्यै हुँदैन। यस्तो
  सामान्य अवस्थामा, बाँकी leg ले भर्खरै समाप्त भएको account पुनः प्रयोग गर्नबाट रोक्ने
  वास्तविक सुरक्षा यो Set होइन — यो माथिको persistence तह
  (connection को `rateLimitedUntil` अब भविष्यमा छ) र यही guard ले failure का लागि
  `transientRateLimitedProviders` लाई suppress गर्ने कार्यको संयोजन हो
  ("दुई-चरणीय डिजाइन" र `targetExhaustion.ts` को
  `isAgentrouterConnectionQuotaScope` branch मा रहेको code comment हेर्नुहोस्): त्यो
  Set लाई unmarked छोड्दा, `combo.ts` को `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) प्रदायकका बाँकी leg हरूका लागि
  सक्रिय हुँदैन, त्यसैले credential selection को `rateLimitedUntil`
  filter (`src/sse/services/auth.ts:1238`) सामान्य रूपमा पालना हुन्छ र
  बाँकी leg ले या त फरक, अझै योग्य agentrouter
  connection छान्छ वा उपलब्ध credentials नभएर असफल हुन्छ — यो branch ले भर्खरै
  cooldown मा राखेको connection मा जबरजस्ती फर्किँदैन।

### दुई-चरणीय डिजाइन: status पुनः अभिव्यक्ति, त्यसपछि classification

Status पुनः अभिव्यक्ति (`upstreamStatusRestatement.ts`) र प्रदायक
classification नियमहरू (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) अलग registry हरू हुन्, जसले दुवैले provider id
र text marker का आधारमा key गर्छन्, तर तिनीहरू फरक ठाउँमा चल्छन् र फरक
उद्देश्य पूरा गर्छन्: restatement ले `chatCore.ts` मा HTTP status चाँडै पुनर्लेखन गर्छ;
classification नियमहरूले `checkFallbackError()` भित्र fallback `reason` र lock `scope`
(`model` / `provider` / `connection`) छान्छन्
(`open-sse/services/accountFallback.ts`)।

Classification नियमहरूले पूर्ण error **text** (जस्तै `额度不足` जस्ता body
marker सँग match गर्न आवश्यक) केवल `providerErrorRules.ts` को
`FULL_TEXT_RULE_PROVIDERS` allowlist मा सूचीकृत प्रदायकहरूका लागि मात्र देख्छन् —
हाल केवल `"agentrouter"`। अन्य प्रत्येक **built-in catalog** प्रदायकका लागि,
`checkFallbackError` ले `getProviderErrorRuleMatch` लाई structured error
(`{code, type}`) मात्र दिन्छ, जुन header/status/code-आधारित नियमहरूका लागि पर्याप्त
हुन्छ तर body-text marker हरू देख्न सक्दैन। `resolveRuleMatchBody()` helper ले
यो छनोट गर्छ: allowlist मा भएका प्रदायकका लागि पूर्ण error text, अन्यथा
structured error। कुनै **built-in** प्रदायकलाई `FULL_TEXT_RULE_PROVIDERS` मा थप्नु
स्पष्ट प्रति-प्रदायक opt-in हो — सूचीमा नभएका प्रत्येक प्रदायकको default path
byte-for-byte अपरिवर्तित रहोस् भनेर यो व्यवस्था गरिएको हो।

नियमको `scope` (`model` / `provider` / `connection`) `FULL_TEXT_RULE_PROVIDERS`
बाट अलग opt-in हो: `checkFallbackError` ले यसलाई केवल
`fallbackResult.ruleScope` का रूपमा उजागर गर्छ, र downstream consumer हरूले
उही file को `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist मा भएका प्रदायकहरूका लागि
मात्र यसलाई सूचनामूलक label बाहेक अरू कुनै रूपमा मान्छन् (`honorsRuleLockScope()`
मार्फत नियन्त्रित — हाल केवल `"agentrouter"`)। कुनै प्रदायक त्यो allowlist मा
परेपछि `scope: "connection"` match ले वास्तवमा के गर्छ भन्ने जान्न माथिको
"पुनः अभिव्यक्त गरिएका कोटा त्रुटिहरू" हेर्नुहोस्।

**#11104 — अपरेटरले घोषणा गरेका नियमहरूले दुवै allowlist लाई बाइपास गर्छन्।** अपरेटरले
यो फाइल सम्पादन नगरी `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
मार्फत runtime मा प्रति-provider नियम घोषणा गर्न सक्छ। अपरेटर नियमलाई
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` पछाडि gate गर्दा — built-in catalog नियमहरूको
**पूर्वनिर्धारित** व्यवहार सुरक्षित गर्न बनाइएका allowlist हरू —
त्यहाँ पहिल्यै सूचीकृत provider हरूबाहेक प्रत्येक provider का लागि
settings संयन्त्र निष्क्रिय हुन्थ्यो, किनकि नियम घोषणा गर्नु आफैंमा अपरेटरको
स्पष्ट opt-in हो। `resolveRuleMatchBody()` र `honorsRuleLockScope()` दुवैले
पहिले `hasOperatorRuleForProvider()` जाँच गर्छन्: अपरेटर नियम भएको provider ले
raw error text प्राप्त गर्छ र त्यसले घोषणा गरेको `scope` लाई सम्मान गरिन्छ,
त्यो कुनै पनि allowlist मा देखापरेको छ वा छैन भन्ने कुराले फरक पार्दैन।

**ज्ञात कमी — HTTP 400 का लागि `providerRuleRegistry` कहिल्यै परामर्श गरिँदैन।**
`checkFallbackError` को `BAD_REQUEST` branch ले status 400 लाई पूर्ण रूपमा
आफ्नै pattern array हरू (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, आदि `accountFallback.ts` मा) मार्फत वर्गीकरण गर्छ र
त्यसभन्दा माथिको `configuredRule`/`getProviderErrorRuleMatch` branch मा पुग्नुअघि नै
फर्किन्छ। `status: 400` भएको built-in catalog नियम (वा अपरेटर नियम)
syntax का हिसाबले मान्य हुन्छ, तर कहिल्यै सक्रिय हुँदैन। आज कुनै विद्यमान नियमले 400 लाई
लक्षित गर्दैन, त्यसैले production मा केही पनि प्रभावित भएको छैन — तर भविष्यको 400 नियमका लागि
पहिले यो branch परिवर्तन गर्नुपर्ने हुन्छ, जुन एउटा नियम थप्नुभन्दा ठूलो परिवर्तन हो (यसले
pattern-array व्यवहारमा पहिल्यै निर्भर प्रत्येक provider का लागि 400 लाई पुनःवर्गीकरण गर्छ)
र एकल-provider नियम थप्ने कार्यक्षेत्रभन्दा बाहिर पर्छ।

### quota लाई गलत रूपमा प्रस्तुत गर्ने नयाँ gateway थप्ने

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) मा एउटा नियम array दर्ता गर्नुहोस्। `textMarkers` लाई
   provider-specific राख्नुहोस्; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) सँग जुध्ने generic अङ्ग्रेजी वाक्यांशहरू कहिल्यै पुनःप्रयोग नगर्नुहोस्।
2. सही lock scope (`connection` account-wide quota का लागि, `model`
   per-model error हरूका लागि) छान्न वैकल्पिक रूपमा
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) मा classification नियमहरू दर्ता गर्नुहोस्।
   यो चरण full error text (body marker हरू) आवश्यक पर्ने नियम भएका provider हरूका लागि मात्र
   production मा प्रभावकारी हुन्छ: सोही फाइलको `FULL_TEXT_RULE_PROVIDERS` मा
   provider id थप्नुहोस् — अन्यथा `checkFallbackError` ले नियमलाई structured
   `{code, type}` error मात्र दिन्छ र body-text नियमले live traffic सँग कहिल्यै match गर्दैन।
   केवल `status`/`headers` मा match हुने नियमहरूलाई (जस्तै Opencode वा
   Minimax का) यो opt-in आवश्यक पर्दैन। छुट्टै रूपमा, यदि नियमले
   `scope: "connection"` घोषणा गर्छ र उद्देश्य वास्तविक connection-wide cooldown
   तथा same-request combo skip हो (केवल सूचनामूलक label होइन) भने,
   सोही फाइलको `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मा provider id थप्नुहोस् — यसैले
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) र
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) मा
   `isAgentrouterConnectionQuotaScope()`-शैलीको consumption लाई gate गर्छ; यसबिना `scope`
   अझै पनि `fallbackResult.ruleScope` मार्फत प्रवाहित हुन्छ, तर त्यसअनुसार कुनै कार्य हुँदैन।
3. `tests/unit/upstream-status-restatement.test.ts`
   र `tests/unit/agentrouter-error-rules.test.ts` लाई प्रतिबिम्बित गर्ने unit test हरू थप्नुहोस् (
   not-permanent / not-creditsExhausted guard हरूसहित, र — provider लाई
   allowlist आवश्यक भएमा — `resolveRuleMatchBody()` ले सो provider का लागि मात्र
   full text फर्काउँछ भनी पुष्टि गर्ने test समेत)।

`chatCore.ts`, `classifyError`, वा combo मा कुनै परिवर्तन आवश्यक छैन।

#### Egress-bucketed lock (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode family) मा रहेका provider हरूलाई
IP-bucketed upstream का रूपमा व्यवहार गरिन्छ (opencode free tier
account-bucketed होइन, IP-bucketed हो — #9611 हेर्नुहोस्): `quota_exhausted`
**वा** `rate_limit_exceeded` का रूपमा वर्गीकृत status-429 ले rotation ले तिनलाई
प्रयास गर्नुअघि, अन्तिम ज्ञात egress IP असफल connection को IP सँग मिल्ने
प्रत्येक allowlisted-family connection लाई cooldown गर्छ
— यसरी N-1 वटा निश्चित रूपमा असफल हुने upstream call हरूबाट बचिन्छ (#10460/#10525 कै स्वरूप)।
`rate_limit_exceeded` जानाजानी समावेश गरिएको हो: `markAccountUnavailable`
path मा opencode-specific नियमहरू कहिल्यै match हुँदैनन् (`checkFallbackError` लाई
headers/body दिइँदैन, opencode `FULL_TEXT_RULE_PROVIDERS` मा छैन), त्यसैले body मा
subscription-quota text ("monthly usage limit
reached") भएको 429 लाई `status_429` नियमसम्म पुग्नुअघि नै
quota-text fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown)
ले `quota_exhausted` का रूपमा वर्गीकरण गर्छ — जबकि quota-text नभएको 429 (सामान्य
rate limiting) लाई `status_429` नियममार्फत `rate_limit_exceeded` का रूपमा वर्गीकरण गरिन्छ
र त्यसले अझै पनि IP family लाई cooldown गर्छ। allowlisted provider का लागि IP-bucketed
rate limit भनेको exhausted quota सरहकै signal हो। वास्तविक सीमाहरू:

- **सकेसम्म उत्तम प्रयास**: लकले `proxy_logs` बाट कनेक्सनको पछिल्लो ज्ञात `egress_ip`
  पत्ता लगाउँछ (24h विन्डो, synchronous, cache छैन)। Cold cache (egress
  IP कहिल्यै probe नगरिएको) वा कुनै row नभएमा → असफल भइरहेको कनेक्सनलाई अझै पनि
  branch ले cooldown मा राख्छ (आजकै जस्तो गरी record गरिन्छ), तर कुनै sibling लाई लक गरिँदैन।
- **कहिल्यै terminal हुँदैन**: cooldown नवीकरण हुने quota window हो
  (`testStatus: "unavailable"`); IP-स्तरको signal बाट कहिल्यै permanent state
  निकालिँदैन। `disableCooling` कनेक्सनहरूले branch लाई पूर्ण रूपमा skip गर्छन्।
- **Allowlist गरिएको family का लागि लकको granularity परिवर्तन हुन्छ**: यो scope
  परिवर्तन हो, sibling optimization मात्र होइन। opencode एउटा `passthroughModels`
  provider हो, त्यसैले यो branch अघि 429 ले per-MODEL lockout उत्पन्न गर्थ्यो; अब यसले
  connection cooldown उत्पन्न गर्छ — कुनै sibling नै नभएको एउटै connection
  चलाइरहेको operator का लागि समेत। opencode rule
  table ले पहिल्यै सही भनेर घोषणा गरेको granularity यही हो (`scope: "connection"`,
  `providerErrorRules.ts`), तर opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मा नभएकाले हालसम्म कहिल्यै पालना गरिएको थिएन। branch ले
  connection-scoped agentrouter branch कै शैली पछ्याउँदै असफल भइरहेको
  connection को cooldown + `backoffLevel` आफैं लेख्छ, अनि return गर्छ — per-model block र
  तलको generic path सम्म कहिल्यै पुगिँदैन।
- **Combo समावेश छ**: agentrouter branch जस्तै, scope ले combo caller ले
  429 मा लागू गर्ने `persistUnavailableState`/`isCombo` downgrade लाई जानाजानी
  बेवास्ता गर्छ। per-model lockout यो scope को कमजोर रूप होइन, यो गलत unit
  हो: यसले सकिएको IP बारे केही पनि बताउँदैन, त्यसैले combo
  rotation ले प्रत्येक sibling मा निश्चित रूपमा असफल हुने एउटा call खर्च गरिरहन्छ।
- **Sibling सुरक्षा**: पहिल्यै terminal (banned/credits_exhausted) भएको
  वा पहिल्यै अझ लामो cooldown मा रहेको sibling लाई कहिल्यै overwrite गरिँदैन।
- **Exclusive allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS` विस्तार गर्नु
  स्पष्ट owner decision हो; कुनै generic wiring होइन (pattern #10334/#10419)। sibling
  query ले त्यसै allowlist लाई SQL
  literal का रूपमा दोहोर्याउनुको सट्टा bind गर्छ, त्यसैले यसलाई विस्तार गर्दा एक-line परिवर्तनमै सीमित रहन्छ।
- **Egress IP rotation, दुवै दिशामा**: lookup window (24h)
  egress-IP cache TTL (5 min) भन्दा धेरै फराकिलो छ, त्यसैले "पछिल्लो ज्ञात IP" history हो,
  current state होइन। यदि कुनै connection को proxy उक्त window भित्र rotate भएको छ भने
  लकले वास्तवमै shared IP लाई **छुटाउन** सक्छ (record गरिएको IP नयाँ,
  नसकिएको IP हो) — र त्यसैगरी यसले सकिएको IP बाट त्यसपछि
  rotate भएर हटिसकेको sibling लाई **cooldown मा राख्न** सक्छ। दोस्रो अवस्थाले उक्त sibling को एउटा
  cooldown window खर्च गर्छ; दुवैलाई history-based
  lookup का स्वीकार्य best-effort सीमाहरू मानिएको छ।
- **लागत**: `proxy_logs` का दुई bounded scan (window-filtered via
  `idx_pl_timestamp`), 429 को frequency मा मात्र। कुनै नयाँ index छैन (migration 134
  YAGNI)। मध्यम आकारको वास्तविक traffic भएको DB copy मा मापन गरिएको; एउटा
  high-throughput instance ले सोही window मा अनुपातिक रूपमा बढी rows राख्छ।

---

## अन्य लचिलोपन सुविधाहरू

- **19 राउटिङ रणनीतिहरू** (प्राथमिकता, भारित, राउन्ड-रोबिन, कन्टेक्स्ट-रिले, फिल-फर्स्ट, p2c, र्यान्डम, सबैभन्दा कम प्रयोग गरिएको, लागत-अनुकूलित, रिसेट-सचेत, रिसेट-विन्डो, हेडरुम, स्ट्रिक्ट-र्यान्डम, अटो, lkgp, कन्टेक्स्ट-अनुकूलित, क्यास-अनुकूलित, फ्युजन, पाइपलाइन) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) हेर्नुहोस्।
- **रिसेट-सचेत राउटिङ** (v3.8.0) — कोटा रिसेट समयका आधारमा जडानहरूलाई प्राथमिकता दिन्छ।
- **पृष्ठभूमि मोडको अवनति** — Responses API `background: true` लाई चेतावनीसहित सिंक मोडमा अवनत गरिन्छ।
- **गतिशील उपकरण सीमा पहिचान** — उपकरण सङ्ख्याको सीमा पुगेमा प्रदायकहरूबाट पछि हट्छ।
- **आपत्कालीन फलब्याक** — `OMNIROUTE_EMERGENCY_FALLBACK` द्वारा नियन्त्रित; सञ्चालकहरूले पुनः सुरु नगरी Feature Flags पृष्ठबाट यसलाई ओभरराइड गर्न सक्छन्।

---

## डिबगिङ

- Weighted combo ले `503 all_targets_cooling_down` प्रतिक्रिया दिन्छ (`Retry-After` सेट गरिएको हुन्छ, `diagnostics.excluded` ले प्रत्येक target लाई `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` सहित सूचीबद्ध गर्छ) → pool कन्फिगर गरिएको र जडान भएको छ, तर प्रत्येक target लाई resilience timer ले बहिष्कार गरेको छ; `[COMBO] Weighted selection: every target excluded before dispatch — …` चेतावनीले कारणहरू र बाँकी सेकेन्डहरू जनाउँछ। सोही combo बाट आएको `404 no_executable_targets` को अर्थ कुनै resilience timer संलग्न थिएन (चलाउन केही पनि छैन, वा प्रत्येक account availability probe मा असफल भयो) भन्ने हो। `targetResolution.ts` मा सङ्कलन गरिएका exclusions बाट `open-sse/services/combo/pinRecovery.ts` मा निर्माण गरिएको छ।
- कुनै provider का सबै keys छोडिए → circuit breaker को state र प्रत्येक connection को `rateLimitedUntil`/`testStatus` दुवै जाँच गर्नुहोस्।
- reset window पछि पनि provider स्थायी रूपमा बहिष्कृत छ → code ले `getStatus()`/`canExecute()` को सट्टा raw `state` पढिरहेको छ।
- एउटा key असफल हुन्छ, अरूले काम गर्नुपर्छ → circuit breaker भन्दा connection cooldown लाई प्राथमिकता दिनुहोस्।
- एउटा model मात्र असफल हुन्छ → connection cooldown भन्दा model lockout लाई प्राथमिकता दिनुहोस्।
- State आफैँ पुनःस्थापित हुनुपर्ने हो तर हुँदैन → भविष्यको timestamp र म्याद सकिएको state लाई refresh गर्ने read path जाँच गर्नुहोस्। स्थायी statuses का लागि manual changes आवश्यक हुन्छन्।

---

## TLS फिङ्गरप्रिन्टिङ र स्टेल्थ

प्रदायक-विशिष्ट स्टेल्थ (JA3/JA4, CCH, अस्पष्टीकरण) छुट्टै दस्तावेजीकृत छ — `docs/security/STEALTH_GUIDE.md` हेर्नुहोस् (git; `/docs` मा कम्पाइल गरिएको छैन)।

---

## लचिलोपन परीक्षण (चरण 8 · ब्लक C)

लचिलोपन तर्कका युनिट परीक्षणहरूबाहेक, तीन परीक्षणले वास्तविक तनाव/विफलता अवस्थाहरूमा
रनटाइम परीक्षण गर्छन् (सबै इन्टिग्रेसन/नाइट्ली हुन् — कुनैले पनि PR हरू रोक्दैनन्):

| परीक्षण    | के                                                                                                                                                                                                                          | चलाउने तरिका                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| क्याओस     | नक्कली-अपस्ट्रिम नोडले वास्तविक विलम्बता/रिसेट/टाइमआउट/503 इन्जेक्ट गर्छ; सर्किट ब्रेकर खुल्ने/पुनःस्थापित हुने र `checkFallbackError` ले 503 लाई पुनःप्राप्त गर्न सकिने फलब्याकका रूपमा वर्गीकरण गर्ने कुरा प्रमाणित गर्छ। | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| हिप-वृद्धि | `--expose-gc` अन्तर्गत प्रति `createSSEStream` ~500 स्ट्रिमहरू; हिप तोकिएको अधिकतम सीमाभन्दा बढेमा असफल हुन्छ (OOM गार्ड #3069)।                                                                                            | `npm run test:heap`                      |
| k6 सोक     | `/api/monitoring/health` विरुद्ध निरन्तर लोड; p95/त्रुटि थ्रेसहोल्डहरू।                                                                                                                                                     | `k6 run tests/load/k6-soak.js` (नाइट्ली) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) द्वारा सञ्चालन गरिन्छ। पूर्वनिर्धारित
`test:integration` मा, क्याओस र हिप आफैँ छोडिन्छन् (`RUN_CHAOS_INT`/`--expose-gc` बिना)।

---

## यो पनि हेर्नुहोस्

- [आर्किटेक्चर मार्गदर्शिका](./ARCHITECTURE.md) — प्रणाली आर्किटेक्चर र आन्तरिक संरचना
- [प्रयोगकर्ता मार्गदर्शिका](../guides/USER_GUIDE.md) — प्रदायकहरू, कम्बोहरू, CLI एकीकरण
- [स्वतः-कम्बो इन्जिन](../routing/AUTO-COMBO.md) — १६-कारक स्कोरिङ, मोड प्याकहरू
