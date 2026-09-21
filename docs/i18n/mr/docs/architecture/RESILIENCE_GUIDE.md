# Resilience Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute मध्ये तीन स्वतंत्र परंतु परस्परसंबंधित लवचिकता यंत्रणा आहेत. प्रत्येकाची व्याप्ती आणि उद्देश वेगळा आहे. रूटिंग वर्तन डीबग करताना त्या स्वतंत्र ठेवा.

![3-स्तरीय लवचिकता मॉडेल](../diagrams/exported/resilience-3layers.svg)

> स्रोत: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. प्रदाता सर्किट ब्रेकर

**व्याप्ती:** संपूर्ण प्रदाता (उदा., `glm`, `openai`, `anthropic`).

**उद्देश:** अपस्ट्रीम/सेवा स्तरावर वारंवार अपयशी ठरणाऱ्या प्रदात्याकडे ट्रॅफिक पाठवणे थांबवणे.

**अंमलबजावणी:**

- मुख्य क्लास: `src/shared/utils/circuitBreaker.ts`
- जोडणी: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- स्थिती API: `GET /api/monitoring/health`
- रीसेट API: `POST /api/resilience/reset`
- रॅपर्स: `open-sse/services/accountFallback.ts`
- DB टेबल: `domain_circuit_breakers`

**स्थिती:**

- `CLOSED` — सामान्य ट्रॅफिकला परवानगी
- `DEGRADED` — ट्रॅफिकला अजूनही परवानगी, परंतु प्रदात्याच्या वाढलेल्या अपयशांचा मागोवा घेतला जातो
- `OPEN` — प्रदाता तात्पुरता अवरोधित; कॉम्बो रूटिंग त्याला वगळते
- `HALF_OPEN` — रीसेट कालमर्यादा संपली; तपासणी विनंतीला परवानगी

**कॉन्फिगर करता येणारी डीफॉल्ट मूल्ये (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience मध्ये उपलब्ध):**

| वर्ग    | डिग्रेड होण्याची मर्यादा | उघडण्याची मर्यादा | रीसेट कालमर्यादा |
| ------- | ------------------------ | ----------------- | ---------------- |
| OAuth   | 5 अपयश                   | 8 अपयश            | 60s              |
| API-key | 7 अपयश                   | 12 अपयश           | 30s              |
| स्थानिक | व्युत्पन्न               | 2 अपयश            | 15s              |

प्रदाता `DEGRADED` स्थितीत कधी प्रवेश करतो हे `degradationThreshold` नियंत्रित करते; तो कधी उघडतो आणि वगळला जातो हे `failureThreshold` नियंत्रित करते. स्थानिक प्रदाता प्रोफाइल्स अद्याप Resilience सेटिंग्ज पृष्ठावर उपलब्ध नाहीत.

**ट्रिप कोड्स:** केवळ प्रदाता-स्तरीय स्थिती `[408, 500, 502, 503, 504]`. खाते-स्तरीय त्रुटींसाठी ट्रिप करू नका (बहुतेक 401/403/429 — त्या कूलडाउन किंवा लॉकआउटशी संबंधित आहेत).

**लेझी पुनर्प्राप्ती:** `OPEN` ची मुदत संपल्यावर, `getStatus()`, `canExecute()`, `getRetryAfterMs()` स्थिती `HALF_OPEN` वर रीफ्रेश करतात. पार्श्वभूमी टाइमरची आवश्यकता नाही.

---

### ऐच्छिक जागतिक प्रदाता कूलडाउन (विंडो गेट)

चौथा, **ऐच्छिक** स्तर (`PROVIDER_COOLDOWN_ENABLED`, डीफॉल्टनुसार **बंद**) अपयशी
प्रदात्यांची क्रॉस-रिक्वेस्ट स्मृती
`open-sse/services/providerCooldownTracker.ts` मध्ये ठेवतो; कॉम्बो लक्ष्य
निश्चित करताना तिचा संदर्भ घेतला जातो, जेणेकरून सलग कॉम्बो विनंत्या नुकत्याच
अपयशी ठरलेल्या प्रदात्याकडे पुन्हा-पुन्हा जात नाहीत. प्रदाता-स्तरीय नोंदी `PROVIDER_PROFILES` विंडो गेटचे पालन करतात:

| प्रोफाइल | इतक्यानंतर ट्रिप होते (`providerFailureThreshold`) | या कालावधीत (`providerFailureWindowMs`) | इतक्या काळासाठी कूल होते (`providerCooldownMs`) |
| -------- | -------------------------------------------------: | --------------------------------------: | ----------------------------------------------: |
| OAuth    |                                               `10` |                                 `15min` |                                          `5min` |
| API key  |                                               `15` |                                 `30min` |                                         `10min` |

मर्यादेपेक्षा कमी असल्यास प्रदाता **कूल होत आहे** असे मानले जात नाही; यशस्वी
विनंती विंडो साफ करते. त्याऐवजी, कनेक्शन-स्तरीय नोंदी (`provider:connectionId`)
घातांकीय `minRetryCooldownMs → maxRetryCooldownMs` बॅकऑफ कायम ठेवतात. ओव्हरराइड्स:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
रिग्रेशन गार्ड: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. कनेक्शन कूलडाउन

**व्याप्ती:** एकच प्रदाता कनेक्शन/खाते/की.

**उद्देश:** त्याच प्रदात्याची इतर कनेक्शन्स सेवा देत असताना एक खराब की वगळणे.

**अंमलबजावणी:**

- अनुपलब्ध म्हणून चिन्हांकित करणे: `src/sse/services/auth.ts::markAccountUnavailable()`
- निवड: त्याच फाइलमधील `getProviderCredentials*`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्ज: `src/lib/resilience/settings.ts`

**प्रत्येक कनेक्शनसाठी फील्ड्स:**

- `rateLimitedUntil` — कूलडाउन संपेपर्यंतचा टाइमस्टॅम्प
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — एक्स्पोनेन्शियल बॅकऑफ काउंटर

**डीफॉल्ट कूलडाउन:**

- OAuth बेस: 5s
- API-key बेस: 3s
- API-key 429: अपस्ट्रीम `Retry-After`/रीसेट हेडर्स/पार्स करता येण्याजोग्या रीसेट मजकुराला प्राधान्य
- बॅकऑफ: `baseCooldownMs * 2 ** failureIndex`

**अँटी-थंडरिंग-हर्ड संरक्षक:** समकालीन अपयशांमुळे कूलडाउन अनावश्यकपणे वाढवला जाणे किंवा `backoffLevel` दोनदा वाढवला जाणे प्रतिबंधित करतो.

**अंतिम स्थिती (कूलडाउन नाहीत):**

- `banned` — प्रतिबंधित कीवर्ड / खाते-प्रतिबंध ओळखीद्वारे सेट केले जाते ([BAN_DETECTION](../security/BAN_DETECTION.md) पाहा), तसेच अपस्ट्रीमकडून प्रत्येक विनंतीसाठी सलग तीन नकार मिळाल्यास (`request_rejected`, उदा. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) सेट केले जाते; एकच नकार फक्त कनेक्शनला कूलडाउनमध्ये ठेवतो
- `expired` (मर्यादित पुनर्प्रयत्नांनंतर अंतिम स्थितीत संक्रमण होते — एक्स्पोनेन्शियल बॅकऑफसह `EXPIRED_RETRY_MAX = 3` — त्यामुळे खाते कायमचे निष्क्रिय करण्यापूर्वी तात्पुरत्या OAuth त्रुटी स्वतःहून दूर होऊ शकतात)
- `credits_exhausted`

क्रेडेन्शियल्स बदलले जात नाहीत किंवा ऑपरेटर त्यांना रीसेट करत नाही तोपर्यंत या स्थिती कायम राहतात. अंतिम स्थितींवर तात्पुरती कूलडाउन स्थिती अधिलिखित करू नका.

**लेझी पुनर्प्राप्ती:** `rateLimitedUntil` ची वेळ उलटल्यानंतर कनेक्शन पुन्हा पात्र होते. यशस्वी वापरानंतर, `clearAccountError()` सर्व त्रुटी फील्ड्स साफ करते.

### सत्र अफिनिटी (#7274)

**व्याप्ती:** **कोणत्याही** प्रदात्यासाठी, एका कनेक्शनला पिन केलेले एक क्लायंट सत्र (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` हेडर).

**उद्देश:** अनेक विनंत्यांमध्ये मल्टी-टर्न एजंटला (Claude Code, aider, कस्टम एजंट्स) त्याच खात्यावर ठेवणे, ज्यामुळे विविध खात्यांमधील संदर्भ गमावणे आणि प्रति-खाते सत्र स्थिती असलेल्या प्रदात्यांवरील वारंवार होणारे कोल्ड-स्टार्ट 429 कमी होतात.

**अंमलबजावणी:**

- TTL निर्धारण: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- पिन निवड/निर्मिती: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- हेडर निष्कर्षण (सर्वसाधारण, कोणताही प्रदाता): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- कायम ठेवलेले पिन टेबल: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- सेटिंग: `sessionAffinityTtlMs` (ms मधील जागतिक TTL, `0` असल्यास अक्षम) — `src/lib/db/settings.ts`. माइग्रेशन `124_generic_session_affinity_ttl.sql` द्वारे फक्त Codex साठी असलेल्या `codexSessionAffinityTtlMs` वरून याचे नाव बदलले गेले; पूर्वी कॉन्फिगर केलेले कोणतेही Codex TTL नवीन डीफॉल्ट म्हणून पुढे नेले जाते.

#7274 पूर्वी, `codex` वगळता प्रत्येक प्रदात्यासाठी `resolveSessionAffinityTtlMs()` थेट `0` परत करत असे, त्यामुळे पिनिंग यंत्रणा आणि हेडर निष्कर्षण आधीपासूनच प्रदाता-अज्ञेय असूनही TTL सेटिंगचा (आणि सत्र हेडर्सचा) इतरत्र कुठेही परिणाम होत नव्हता. सुधारणेमध्ये तो लवकर परतावा काढून टाकला; आता जागतिक स्तरावर `0` पेक्षा जास्त मूल्य सेट केल्यानंतर TTL प्रत्येक प्रदात्याला एकसमानपणे लागू होतो.

तीन सत्र-अफिनिटी हेडर्स कधीही अपस्ट्रीमकडे फॉरवर्ड केले जात नाहीत — क्लायंट हेडर्स पुढे पाठवण्याऐवजी एक्झिक्युटर्स स्वतःचे अपस्ट्रीम हेडर्स नव्याने तयार करतात, त्यामुळे हे केवळ अंतर्गत कोरिलेशन आयडी म्हणूनच राहते.

### एक्सक्लुझिव्ह व्यवस्थापित सत्र कनेक्शन लीझेस

**व्याप्ती:** एक सक्रिय व्यवस्थापित HTTP क्लायंट/सत्र एका पात्र OmniRoute कनेक्शनची मालकी घेतो.

**उद्देश:** विनंत्यांदरम्यान कठोर राउटिंग सीमा आवश्यक असलेल्या क्लायंट्सना टिकाऊ, एक्सक्लुझिव्ह कनेक्शन मालकी प्रदान करणे. हे सत्र अफिनिटीपेक्षा वेगळे आहे, कारण सत्र अफिनिटी ही सातत्यासाठीची सौम्य प्राधान्य व्यवस्था आहे: एक्सक्लुझिव्ह लीझ SQLite मध्ये लाइफसायकल स्थिती कायम ठेवते, जागतिक स्तरावर सक्रिय मालक आणि सक्रिय कनेक्शनचे अद्वितीयत्व लागू करते आणि प्रदात्याकडे डिस्पॅच करण्यापूर्वी जुनी झालेली जनरेशन नाकारते.

हे वैशिष्ट्य प्रत्येक API कीसाठी ऑप्ट-इन आहे. व्यवस्थापित कीकडे `lease:exclusive` स्कोप आणि स्पष्टपणे दिलेली, रिकामी नसलेली `allowedConnections` सूची असणे आवश्यक आहे. कोणताही HTTP क्लायंट लाइफसायकल एंडपॉइंट वापरू शकतो; क्लायंटचे नाव, user-agent, प्रदाता, OAuth पद्धत किंवा मॉडेल आवश्यक नाही. लीझकडे कनेक्शनची मालकी असते, मॉडेलची नाही; त्यामुळे कनेक्शन सामान्यतः पात्र राहिल्यास मॉडेल बदलल्यानंतरही बाइंडिंग कायम राहते. मॉडेल, कोटा, आरोग्य, कूलडाउन आणि अनुमतसूचीचे सामान्य नियम अधिकृत राहतात आणि त्यांमुळे तीच जनरेशन दुसऱ्या मोकळ्या पात्र कनेक्शनकडे संक्रमित होऊ शकते.

लाइफसायकल म्हणजे `acquire`, `renew` आणि `release` या JSON क्रियांसह `POST /api/v1/session-leases`. व्यवस्थापित इन्फरन्स विनंत्यांमध्ये अपारदर्शक `X-OmniRoute-Lease-Owner` मूल्य आणि अचूक `X-OmniRoute-Lease-Generation` सादर केले जाते. मालकासाठी `vlo_` आणि त्यापाठोपाठ 43 base64url वर्ण वापरले जातात; फक्त त्याचा SHA-256 हॅश संग्रहित केला जातो. प्रत्येक अंतिम डिस्पॅच सीमा प्रमाणीकृत API की आयडी आणि सक्रिय कनेक्शन आयडीशीही बांधलेली असते. लीझ नियंत्रण हेडर्स लॉग्स, जतन केलेले विनंती स्नॅपशॉट्स आणि अपस्ट्रीम एक्झिक्युटर हेडर्समधून काढून टाकले जातात.

सामान्य राउटिंगमध्ये पात्र व्यवस्थापित उमेदवार असतील, पण प्रत्येक मोकळा उमेदवार परकीय सक्रिय लीझने व्यापलेला असेल, तर OmniRoute HTTP `429`, lease-capacity-unavailable कोड, क्षमतेची प्रतीक्षा करणारी स्थिती आणि सर्वांत लवकर संबंधित कालबाह्यता वेळेवरून मिळवलेले मर्यादित `Retry-After` परत करते. सामान्य पात्रता रिकामी असणे म्हणजे लीझ स्पर्धा नाही आणि त्यासाठी विद्यमान राउटिंग त्रुटी अर्थविज्ञान कायम राहते.

संबंधित यंत्रणा स्वतंत्र राहतात:

- OAuth सत्र व्याप्ती ही OAuth खात्यांसाठी प्रोसेस-लोकल सौम्य वितरण व्यवस्था आहे.
- खाते सेमाफोर्स विनंती-समवर्तीतेसाठी परवानग्या देतात आणि विनंती पूर्ण झाल्यावर समाप्त होतात.
- एक्सक्लुझिव्ह व्यवस्थापित सत्र लीझेस म्हणजे जनरेशन सीमेसह टिकाऊ लाइफसायकल मालकी.

---

## 3. मॉडेल लॉकआउट

**व्याप्ती:** प्रदाता + कनेक्शन + मॉडेल हे त्रिकूट.

**स्थितीनुसार कीची व्याप्ती:** अपयशी स्थिती कोणत्या कीमध्ये लॉकआउट लिहिला जाईल हे ठरवते
(`open-sse/services/accountFallback/exactModelLock.ts` मधील `resolveLockoutScope()`):

- `429` / `403` / `402` — कोटा किंवा पात्रतेचा संकेत — **कोटा फॅमिली** लॉक करतात:
  codex साठी संपूर्ण `codex` / `spark` व्याप्ती (कनेक्शनचे प्रत्येक `gpt-5*` मॉडेल),
  इतर प्रदात्यांसाठी `getQuotaScopedModelForProvider()`.
- `404` मूळ मॉडेल लॉक करते (`getModelLockKey()` हे `not_found` संकुचित करते).
- इतर कोणतीही स्थिती — `5xx` वाहतूक/सर्व्हर अपयश आणि गुणवत्ता प्रमाणीकरणातून
  OmniRoute ने स्वतः तयार केलेले `502` — केवळ **अचूक**
  प्रदाता/कनेक्शन/मॉडेल त्रिकूट लॉक करते. एका मॉडेलवरील खराब स्ट्रीम हा खात्याच्या
  कोट्याबाबतचा पुरावा नाही; या नियमापूर्वी `codex/gpt-5.6-luna` वरील एका रिकाम्या
  प्रतिसादामुळे त्या कनेक्शनची सर्व `gpt-5*` मॉडेल्स रूटिंगमधून 2–30 मिनिटांसाठी
  (वाढत्या कालावधीसह) काढली जात होती, जरी त्याचा कोटा अस्पर्शित होता.
- कॉलरचा स्पष्ट `scope` पर्याय नेहमीच प्राधान्य घेतो (Antigravity `"exact"` पाठवते).

**उद्देश:** केवळ एक मॉडेल अनुपलब्ध किंवा कोटा-मर्यादित असताना संपूर्ण कनेक्शन अक्षम करणे टाळणे.

**उदाहरणे:**

- प्रति-मॉडेल कोटा असलेले प्रदाते `429` परत करतात
- एका गहाळ मॉडेलसाठी स्थानिक प्रदाते `404` परत करतात
- प्रदाता-विशिष्ट मोड/मॉडेल परवानगी अपयश (उदा., Grok मोड्स)

**अंमलबजावणी:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### मॉडेल कूलडाउन डॅशबोर्ड (v3.8.0)

UI: सेटिंग्ज → मॉडेल कूलडाउन्स (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

सक्रिय लॉकआउट्सची पुढील माहितीसह सूची दाखवते: प्रदाता, कनेक्शन, मॉडेल, कारण, expiresAt. ऑपरेटर्स कार्डमधून एखादे मॉडेल व्यक्तिचलितपणे पुन्हा सक्षम करू शकतात.

**REST API:**

- `GET /api/resilience/model-cooldowns` — सक्रिय लॉकआउट्सची सूची
- `DELETE /api/resilience/model-cooldowns` — व्यक्तिचलितपणे पुन्हा सक्षम करणे. बॉडी: `{provider, connection, model}`. प्रमाणीकरण: व्यवस्थापन.

### लॉकआउट सेटिंग्ज UI + यश-क्षय पुनर्प्राप्ती (v3.8.23)

मॉडेल लॉकआउट हे नेहमी सुरू असलेल्या हार्डकोडेड वर्तनापासून स्वतःचे सेटिंग्ज कार्ड
आणि स्वयंचलितरीत्या दुरुस्त होणारा पुनर्प्राप्ती मार्ग असलेल्या पूर्णपणे कॉन्फिगर करता येणाऱ्या,
निवडून सुरू कराव्या लागणाऱ्या वैशिष्ट्यात रूपांतरित झाले.

**सेटिंग्ज कार्ड:** सेटिंग्ज → मॉडेल लॉकआउट
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
हे वरील केवळ-वाचनीय `ModelCooldownsCard` पेक्षा **वेगळे** आहे (जे फक्त सक्रिय
लॉकआउट्सची _सूची दाखवते_) — नवीन कार्ड _पॅरामीटर्स कॉन्फिगर करते_. डीफॉल्ट्स
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`) मध्ये आहेत:

| सेटिंग                  | डीफॉल्ट                          | अर्थ                                                                          |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------------------- |
| `enabled`               | `false`                          | मुख्य टॉगल — मॉडेल लॉकआउट **डीफॉल्टनुसार बंद** असते.                          |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | मॉडेल-व्याप्तीतील अपयश म्हणून गणल्या जाणाऱ्या अपस्ट्रीम स्थिती.               |
| `baseCooldownMs`        | `120_000` (120 सेकंद)            | पहिल्या अपयशासाठी प्रारंभिक लॉकआउट कालावधी.                                   |
| `maxCooldownMs`         | `1_800_000` (30 मिनिटे)          | वाढवलेल्या कूलडाउनची कमाल मर्यादा.                                            |
| `maxBackoffSteps`       | `10`                             | एक्स्पोनेन्शियल-बॅकऑफ वाढीच्या पायऱ्यांची कमाल संख्या.                        |
| `useExponentialBackoff` | `true`                           | पुनरावृत्ती होणाऱ्या अपयशांमुळे कूलडाउन एक्स्पोनेन्शियल पद्धतीने वाढवायचा का. |

सेटिंग्ज सामान्य सेटिंग्ज स्टोअरद्वारे कायम राखली जातात आणि रेझिलियन्स सेटिंग्ज
स्कीमाद्वारे प्रमाणित केली जातात; कार्ड `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` सह) आणि `maxBackoffSteps` यांना मर्यादेत ठेवते.

**यश-क्षय पुनर्प्राप्ती:** पुनर्प्राप्ती **केवळ** टाइमर कालबाह्य होण्यावर अवलंबून नाही. एक
निरोगी प्रतिसाद मॉडेलच्या अपयशांची संख्या टप्प्याटप्प्याने कमी करतो, ज्यामुळे विंडोच्या
मध्यात पुनर्प्राप्त झालेले मॉडेल त्याचा टाइमर संपण्यापूर्वी वाढणे थांबवते (आणि लॉकआउट
काढून टाकते). यशस्वी कॉम्बो लक्ष्यावर, `open-sse/services/combo.ts`
हे `decayModelFailureCount()` (`open-sse/services/accountFallback.ts`) कॉल करते,
जे साठवलेला `failureCount` **निम्मा** करते (`Math.floor(failureCount / 2)`);
तो `0` वर पोहोचल्यावर लॉकआउट नोंद पूर्णपणे हटवली जाते. त्याचा समकक्ष
`recordModelLockoutFailure()` वाढीच्या विंडोमधील अपयशांवर संख्या वाढवतो
(आणि कूलडाउनचा कालावधी वाढवतो). हा यश-क्षय साध्या टाइमर समाप्तीव्यतिरिक्त आहे —
कोणताही मार्ग मॉडेल पुन्हा सक्षम करू शकतो.

**स्थिती:** लॉकआउट्स **इन-मेमरी** ठेवले जातात (`provider:connectionId:model` द्वारे
की केलेले `ModelLockoutEntry` चे प्रति-प्रक्रिया `Map`s, आणि
`provider:connectionId:exact:model` द्वारे अचूक-व्याप्ती लॉक), DB मध्ये कायमस्वरूपी
साठवले जात नाहीत — रीस्टार्ट केल्यावर ते नष्ट होतात. _सेटिंग्ज_ कायमस्वरूपी साठवल्या
जातात; सक्रिय लॉकआउट _स्थिती_ तात्पुरती असते.

---

## 4. कोटा-शेअर समवर्तीपणा नियंत्रण (v3.8.36)

सबस्क्रिप्शन खाती (GLM, MiniMax इ.) अनेकदा फक्त ~1–3 समवर्ती
विनंत्या स्वीकारतात; ही मर्यादा ओलांडल्यास 429 प्रतिसाद आणि कूलडाउन सक्रिय होतात. ही समस्या
**कोटा-शेअर** (`qtSd/…`) कॉम्बोंमध्ये अधिक तीव्र असते, जिथे अनेक API की एकच अपस्ट्रीम
खाते सामायिक करतात. तीन स्तर सामायिक खात्यावर विनंत्यांचा भडिमार होण्यापासून संरक्षण करतात.

### प्रत्येक कनेक्शनसाठी समवर्तीपणाची कमाल मर्यादा (`max_concurrent`)

प्रत्येक प्रदाता कनेक्शन `max_concurrent` कमाल मर्यादा घोषित करू शकते
(`provider_connections.max_concurrent`, कनेक्शन मोडल / API / DB मध्ये सेट केली जाते).
मर्यादा नको असल्यास ते रिकामे ठेवा. खालील क्रमिकीकरण स्तर नियंत्रित करणारे हे एकमेव सेटिंग आहे
— ते खात्याच्या वास्तविक समवर्तीपणानुसार सेट करा (उदा. GLM ~1, MiniMax ~2).

### कोटा-शेअर विनंती क्रमिकीकरण

जेव्हा कोटा-शेअर डिस्पॅच सकारात्मक `max_concurrent` घोषित करणाऱ्या कनेक्शनला
लक्ष्य करतो, तेव्हा त्या **खात्याकडे** जाणाऱ्या समवर्ती विनंत्या प्रत्येक-कनेक्शन
सेमाफोरद्वारे (की `qsconn:<connectionId>`) क्रमिक केल्या जातात: अतिरिक्त विनंत्या खात्यावर
भडिमार करण्याऐवजी **रांगेत प्रतीक्षा करतात**. हे **फेल-ओपन** आहे — पूर्ण भरलेली
रांग किंवा टाइमआउट झाल्यास डिस्पॅच करता येण्याजोगी विनंती कधीही नाकारण्याऐवजी
स्लॉटशिवाय प्रक्रिया पुढे सुरू राहते. हे **Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, डीफॉल्टनुसार
सुरू) मध्ये टॉगल करा. `max_concurrent` मर्यादा नसल्यास वर्तन बदलत नाही.

> कोटा-शेअर राउटिंग गेट (`selectQuotaShareTarget`, DRR + P2C) स्वतः
> फेल-ओपन आहे आणि कमाल मर्यादेवर असलेल्या कनेक्शनला केवळ _कमी प्राधान्य_ देते —
> एकाच कनेक्शनच्या पूलमध्ये ते कठोर मर्यादा लागू करू शकत नाही, त्यामुळे हा सेमाफोरच
> प्रत्यक्षात विनंत्यांचा भडिमार नियंत्रणात ठेवतो.

### कॉम्बो कूलडाउन-जागरूक पुनःप्रयत्न

प्रत्येक कॉम्बो धोरणासाठी (सक्षम असताना), SHORT क्षणिक कूलडाउनमुळे 429
निश्चित करणारी विनंती 429 परत करण्याऐवजी कूलडाउन संपेपर्यंत प्रतीक्षा करते आणि पुन्हा
डिस्पॅच केली जाते — यात बहु-मॉडेल कॉम्बोंवरील Gemini-वर्गाच्या TPM/RPM विंडो
(~60s retry-after) समाविष्ट होतात, उदा. 2-मॉडेल कॉम्बोची दोन्ही लक्ष्ये प्रत्येक-मॉडेल
दरमर्यादेवर पोहोचणे. हे **Settings → Resilience** मधील `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) द्वारे मर्यादित केले जाते.
ते `quota_exhausted` (मध्यरात्रीपर्यंत लॉक केलेले) किंवा प्रमाणीकरण/न सापडण्याच्या
कारणांसाठी कधीही प्रतीक्षा करत नाही.

---

## 5. विनंती रांग प्रवेश नियंत्रण (v3.8.49 · issue #6593)

**व्याप्ती**: स्थानिक प्रत्येक-प्रदाता+कनेक्शन दरमर्यादा रांग (`open-sse/services/rateLimitManager.ts`,
Bottleneck द्वारे समर्थित), वरील तीन यंत्रणांच्या एक स्तर खाली.

**`maxWaitMs` हे अंमलबजावणी कालबाह्यतेसाठी असलेले जुने कायम-संचयित नाव आहे.**
`resilienceSettings.requestQueue.maxWaitMs` हे जॉब `expiration` म्हणून Bottleneck कडे
पाठवले जाते आणि त्याचा टाइमर डिस्पॅचनंतरच सुरू होतो. त्यामुळे ते स्थानिक रांगेत घालवलेल्या
वेळेवर नव्हे, तर लिमिटरद्वारे व्यवस्थापित अंमलबजावणीवर मर्यादा घालते. कालबाह्यता विश्वसनीय
स्थानिक `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) म्हणून दर्शवली जाते;
पूर्वीचे रांग-टाइमआउट कोड नाव केवळ विश्वसनीय अंतर्गत मागास सुसंगततेसाठी स्वीकारले जाते.
डीफॉल्ट 15000ms आहे; `RATE_LIMIT_MAX_WAIT_MS` (env) किंवा डॅशबोर्डद्वारे
(**Settings → Resilience**, 1–30000ms UI कमाल मर्यादा) ते ओव्हरराइड करा.
रांगेतील वास्तव्याला कोणतीही कालमर्यादा नाही; रांगेतील कॉलर्सची संख्या मर्यादित करण्यासाठी
खालील `maxQueueDepth` वापरा.

**`maxQueueDepth` — ऐच्छिक प्रवेश मर्यादा (नवीन).** `resilienceSettings.requestQueue.maxQueueDepth`
एका provider+connection साठी एकाच वेळी किती विनंत्या रांगेत (अद्याप डिस्पॅच न झालेल्या)
राहू शकतात, यावर मर्यादा घालते. रांगेत आधीच `maxQueueDepth` विनंत्या असल्यास,
नवीन विनंती `limiter.schedule()` पर्यंत पोहोचण्याआधीच टाइप केलेल्या
`code: "RATE_LIMIT_QUEUE_FULL"` त्रुटीसह त्वरित नाकारली जाते
— त्यामुळे नकार देण्याची प्रक्रिया कमी खर्चिक असते आणि त्या विनंतीवरील कोणत्याही
डाउनस्ट्रीम प्रॉम्प्ट-कंप्रेशन / भाषांतर कार्यापूर्वी होते. डीफॉल्ट `0` =
अक्षम, ज्यामुळे विद्यमान अमर्यादित-रांग वर्तन कायम राहते; मर्यादा 0–100000.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) किंवा
`resilienceSettings.requestQueue.maxQueueDepth` (डॅशबोर्ड/API पॅच) द्वारे ओव्हरराइड करा.

प्रवेश तपासणी स्वतः एक प्युअर फंक्शन आहे
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), त्यामुळे
वास्तविक Bottleneck लिमिटरशिवाय तिची युनिट चाचणी करता येते.

> #6593 उघडणाऱ्या RFC ने `bypassCompressionOnRateLimit`
> फ्लॅगचाही प्रस्ताव दिला होता. या रेपोची `open-sse/services/compression/` पाइपलाइन
> ही आउटबाउंड LLM विनंतीवरील प्रॉम्प्ट/कॉन्टेक्स्ट कंप्रेशन आहे (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` ब्लॉकच्या आसपास),
> कृत्रिमरीत्या तयार केलेल्या 429 बॉडींवरील HTTP प्रतिसाद कंप्रेशन नाही — प्रत्यक्ष
> बायपास फ्लॅगशी जुळणारा कोणताही कोड मार्ग नाही. सध्या विनंती पाइपलाइनमध्ये ती
> प्रॉम्प्ट-कंप्रेशन पायरी `withRateLimit()` च्या _आधी_ चालते, त्यामुळे रांग-पूर्ण
> नकाराच्या वेळी ती वगळण्यासाठी क्रम बदलणे हा या समस्येच्या व्याप्तीपेक्षा वेगळा आणि
> मोठा बदल आहे; येथे त्याची अंमलबजावणी जाणीवपूर्वक **केलेली नाही** आणि CPU बचतीचा
> फायदा क्रम बदलण्याच्या जोखमीइतका मोलाचा असल्यास तो पुढील कार्य म्हणून ठेवला आहे.

---

## 6. मंद-स्ट्रीम थ्रूपुट वॉचडॉग (#9709)

पर्यायी `resilienceSettings.streamRecovery.throughputWatchdog` संरक्षक अशा
अपस्ट्रीमचा शोध घेतो, जो अजूनही चंक्स पाठवत असतो पण कॉन्फिगर केलेल्या
उपयुक्त-आउटपुट दरापेक्षा कमी असिस्टंट आउटपुट निर्माण करत असतो. हा मुद्दाम
निष्क्रियता टाइमआउटपेक्षा वेगळा आहे: हार्टबीट्स आणि मेटाडेटा यांपैकी कोणतेही
टायमर रीसेट करत नाहीत आणि त्यांना प्रगती म्हणून मोजले जात नाही. तो कठोर प्रयत्न
डेडलाइनपेक्षाही (#9153) वेगळा आहे; आउटपुटच्या गुणवत्तेची पर्वा न करता ती
निरपेक्ष सुरक्षा कमाल मर्यादा राहते.

वॉचडॉग प्रयत्न रद्द करू शकण्यापूर्वी वॉर्म-अप कालावधी आणि त्यानंतरची संपूर्ण
रोलिंग विंडो आवश्यक असते. तो Chat Completions आणि Responses API आउटपुट
इव्हेंट्समधील मजकूर डेल्टांची गणना करतो (UTF-8 बाइट्सचा सावधगिरीचा प्रॉक्सी),
केवळ वापर-माहिती असलेले आणि रिकामे इव्हेंट्स दुर्लक्षित करतो आणि टूल-कॉल किंवा
रीझनिंग इव्हेंट्स प्रक्रियेत असताना मूल्यमापन स्थगित करतो. तो डीफॉल्टनुसार
अक्षम असतो आणि `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` वापरून सक्षम करता
येतो; विंडो, वॉर्म-अप, किमान दर आणि किमान मोजता येण्याजोगे आउटपुट यांना सामान्य
resilience-settings normalization स्तराद्वारे मर्यादा घातल्या जातात.

सक्षम केल्यावर, वॉचडॉगद्वारे केलेला रद्दबातल परिणाम फक्त सक्रिय अपस्ट्रीम
प्रयत्नावर लागू केला जातो. क्लायंटला दृश्यमान होणारे कोणतेही बाइट्स पाठवण्यापूर्वी,
विद्यमान समान-अकाउंट प्रारंभिक-रिकव्हरी मार्ग तो प्रयत्न पुन्हा उघडू शकतो.
कमिटनंतर, स्ट्रीम कधीही विचार न करता पुन्हा प्ले केला जात नाही; फक्त विद्यमान
सुरक्षित मिड-स्ट्रीम कंटिन्युएशन करार प्रत्यय जोडू शकतो. अंतिमीकरण एकदाच होते,
त्यामुळे वापराचे लेखांकन आणि semaphore मुक्त करणे यांची पुनरावृत्ती होत नाही.

---

## 7. अपस्ट्रीम स्थितीचे पुनर्निर्धारण (चुकीने नमूद केलेल्या कोटा त्रुटी)

**व्याप्ती:** तात्पुरता कोटा संपल्याचे चुकीच्या HTTP स्थितीद्वारे कळवणारा एक अपस्ट्रीम गेटवे.

**उद्देश:** वर्गीकरणापूर्वी दिशाभूल करणारी स्थिती दुरुस्त करणे, जेणेकरून डाउनस्ट्रीम ग्राहकांना (फॉलबॅक इंजिन, कॉम्बो एकत्रीकरण, क्लायंटसमोरील प्रतिसाद) अपयशाचे खरे, पुन्हा प्रयत्न करण्यायोग्य स्वरूप दिसेल.

काही गेटवे तात्पुरता कोटा संपल्याचे पुन्हा प्रयत्न न करण्यायोग्य HTTP
स्थितीद्वारे सूचित करतात. `agentrouter.org` मानक `429` ऐवजी चिनी मजकूरासह
(`用户额度不足` / `额度不足`) `403` (कधीकधी `400`) परत करतो. Claude
Code सारखे क्लायंट `403` ला कायमस्वरूपी मानतात आणि सत्र रद्द करतात; तसेच,
दुरुस्ती न केल्यास फॉलबॅक इंजिन त्याचे कोटा इव्हेंटऐवजी `AUTH_ERROR` म्हणून
वर्गीकरण करेल.

**अंमलबजावणी:**

- रजिस्ट्री + मॅचर: `open-sse/config/upstreamStatusRestatement.ts` — प्रत्येक
  प्रदात्यासाठी नियमांची सूची (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), जी `applyStatusRestatement()` द्वारे जुळवली जाते.
- कॉल स्थळ: `open-sse/handlers/chatCore.ts` मधील `providerFailure:` ब्लॉक
  (ओळ 3654 च्या आसपास), `parseUpstreamError()` ने त्रुटीयुक्त HTTP स्थितीसह
  (`!providerResponse.ok`) अपस्ट्रीम प्रतिसाद पार्स केल्यानंतर लगेच आणि कोणतेही
  वर्गीकरण चालण्यापूर्वी, जेणेकरून प्रत्येक डाउनस्ट्रीम ग्राहकाला दुरुस्त केलेली
  स्थिती दिसेल. `200` SSE स्ट्रीममध्ये अंतर्भूत असलेल्या त्रुटी वेगळ्या,
  नंतरच्या स्ट्रीम-पार्सिंग मार्गाचे अनुसरण करतात आणि त्या आज या हुकच्या
  कक्षेत **येत नाहीत** — ही ज्ञात मर्यादा आहे, पण agentrouter च्या चुकीच्या
  स्थितीसाठी अद्याप तिची गरज नाही (कारण ती त्रुटीयुक्त HTTP स्थिती म्हणून
  समोर येते).
- पुनर्प्रयत्न पात्रता: `429` हे `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`) मध्ये आहे, त्यामुळे
  पुनर्निर्धारित त्रुटी निष्क्रिय `403` म्हणून समोर येण्याऐवजी खरी पुनर्प्रयत्न
  विंडो घेऊन येते.
- कृत्रिम `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) हे
  पुनर्निर्धारित प्रतिसाद **क्लायंटला** काय सांगतो तेवढेच आहे; ते स्वतः
  कनेक्शनच्या अंतर्गत cooldown/lockout चा कालावधी नाही — तो पुनर्निर्धारित
  त्रुटी प्रत्यक्षात हाताळणाऱ्या स्वतंत्र यंत्रणेद्वारे नियंत्रित केला जातो
  (Connection Cooldown चे वाढते backoff, §2, API-key प्रदात्यांसाठी आधार
  `3s`; किंवा agentrouter सारख्या प्रत्येक-मॉडेल-कोटा प्रदात्यांसाठी Model
  Lockout, §3). राउटरने क्लायंटला जाहिरात केलेल्या 60s विंडोपेक्षा अंतर्गत
  पुनर्प्रयत्नासाठी लवकर पात्र होणे शक्य आहे — ही हेतुपुरस्सर अतिरिक्त
  मोकळीक आहे, बग नाही.

कायमस्वरूपी त्रुटी (agentrouter चे `无权访问模型` — या मॉडेलमध्ये प्रवेश नाही)
कधीही पुनर्निर्धारित केल्या जात **नाहीत**: `textMarkers` जुळले तरी
`excludeMarkers` नियमाला नाकारते, त्यामुळे त्रुटी तिची मूळ स्थिती कायम ठेवते
आणि कोणतीही यंत्रणा तिच्यावर अनंतकाळ पुनर्प्रयत्न करत नाही. संबंधित प्रदाता
वर्गीकरण नियम
(`open-sse/config/providerErrorRules.ts` मधील `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, घोषित `6h` आधार cooldown) याचा
`checkFallbackError` (`open-sse/services/accountFallback.ts`) द्वारे सर्वसाधारण
apikey-श्रेणीच्या `FORBIDDEN` प्रारंभिक-परतीच्या _आधी_ विचार केला जातो; यासाठी
`honorsRuleLockScope(provider)` चे गेटिंग लागू होते (#10334 — सध्या
`providerErrorRules.ts` मधील `HONORS_RULE_LOCK_SCOPE_PROVIDERS` अनुमतीसूचीद्वारे
फक्त agentrouter साठी). नियमाचा घोषित 6h cooldown `fallbackResult.baseCooldownMs`
म्हणून पुढे जातो, पण तरीही तो आधीपासून अस्तित्वात असलेल्या
प्रत्येक-मॉडेल-कोटा lockout मार्गालाच पुरवला जातो
(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, cooldown च्या स्रोताव्यतिरिक्त #10334 मुळे
अपरिवर्तित): इतर प्रत्येक मॉडेल lockout प्रमाणे तो ऑपरेटरच्या
`mlSettings.maxCooldownMs` (डीफॉल्ट `1_800_000ms` / 30min) पर्यंत खाली
मर्यादित केला जातो आणि _संचयित lockout कारण_ नियमातील `"auth_error"` नसून
आधीपासून हार्डकोड केलेले `"forbidden"` हेच राहते — सुरुवातीपासून शेवटपर्यंत
फक्त cooldown कालावधीचा आदर केला जातो, कारण स्ट्रिंगचा नाही. कनेक्शन स्वतः
सक्रिय राहते; त्याच कनेक्शनवरील इतर समकक्ष मॉडेल्सवर परिणाम होत नाही.

पुनर्निर्धारित कोटा त्रुटी (`额度不足`) उत्पादनामध्ये provider नियमापर्यंत पोहोचतात
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, स्वतःचा कोणताही घोषित cooldown नाही — persistence layer चा
scaled backoff default लागू होतो). #10334 पासून,
`ProviderErrorRuleMatch` वरील `scope` संपूर्ण प्रवाहात वापरला जातो, पण
**फक्त** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist मधील providers साठी
(`providerErrorRules.ts` — सध्या फक्त `"agentrouter"`, `honorsRuleLockScope()`
द्वारे gated). इतर प्रत्येक provider साठी `scope` हा #10334 पूर्वीप्रमाणेच
केवळ माहितीपर राहतो. `checkFallbackError` जुळलेल्या नियमाचा scope
`fallbackResult.ruleScope` म्हणून उघड करतो; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) हा सामायिक guard आहे, जो
`ruleScope` हा connection-व्यापी, स्वयं-पुनर्प्राप्त होणारा signal म्हणून
मानणे खरोखर सुरक्षित आहे याची पुष्टी करतो (scope `"connection"`, reason
`quota_exhausted`, कधीही `permanent` नाही, कधीही `creditsExhausted` नाही —
भविष्यातील एखादा नियम scope `"connection"` ला कायमस्वरूपी account state
सोबत जोडण्याविरुद्धचा बचाव). दोन consumers त्याला call करतात:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider च्या **per-model** lockout branch मध्ये जाण्याऐवजी
  (agentrouter हा `passthroughModels: true` आहे → `hasPerModelQuota()`
  `true` परत करतो), तो **तात्पुरता connection cooldown** लागू करतो —
  `testStatus: "unavailable"` + `rateLimitedUntil`, कधीही terminal status
  (`credits_exhausted`/`banned`/`expired`) नाही — त्यामुळे cooldown संपल्यानंतर
  connection स्वयं-पुनर्प्राप्त होतो आणि manual credential reset ची गरज पडत
  नाही. `disableCooling: true` असलेल्या connections साठी हे वगळले जाते
  (#2997): त्याऐवजी ते opt-out per-model lockout मध्ये जाते (हा दस्तऐवजीकृत
  trade-off आहे — branch वरील code comment पहा).
- **Same-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): हाच guard connection ला
  in-memory `exhaustedConnections` set मध्ये `${provider}:${connectionId}`
  या key ने चिन्हांकित करतो. यामुळे फक्त उर्वरित SAME-REQUEST target वगळला जातो,
  ज्याच्या स्वतःच्या target object वर _आधीपासूनच तोच अचूक `connectionId`_
  आहे (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` हे `exhaustedConnections` lookup करण्यापूर्वी) — साधा
  model-list combo, ज्यामध्ये sibling targets कडे स्वतःचा pinned
  `connectionId` नसतो आणि प्रत्येक dispatch साठी response च्या
  `X-OmniRoute-Selected-Connection-Id` header मधून एक resolve केला जातो,
  त्या key शी कधीही जुळत नाही. त्या सामान्य बाबतीत, उर्वरित leg ने नुकतेच
  exhausted झालेले account पुन्हा वापरण्यापासूनचे खरे संरक्षण हा Set **नाही**
  — तर वरील persistence layer (connection चा `rateLimitedUntil` आता भविष्यातील
  आहे) आणि failure साठी हाच guard `transientRateLimitedProviders` ला suppress
  करतो, यांचे संयोजन आहे (`targetExhaustion.ts` मधील
  `isAgentrouterConnectionQuotaScope` branch वरील "दोन-टप्प्यांची रचना" आणि
  code comment पहा): तो Set unmarked ठेवल्यामुळे, provider च्या उर्वरित legs
  साठी `combo.ts` चा `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) सक्रिय होत **नाही**,
  त्यामुळे credential selection चा `rateLimitedUntil` filter
  (`src/sse/services/auth.ts:1238`) नेहमीप्रमाणे पाळला जातो आणि उर्वरित leg
  एकतर वेगळा, अजूनही eligible असलेला agentrouter connection निवडतो किंवा
  credentials उपलब्ध नसल्याने अयशस्वी होतो — हा branch ने नुकतेच cooldown
  केलेल्या connection वर तो जबरदस्तीने परत जात नाही.

### दोन-टप्प्यांची रचना: status restatement, त्यानंतर classification

Status restatement (`upstreamStatusRestatement.ts`) आणि provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) या स्वतंत्र registries आहेत. दोन्ही provider id
आणि text markers वर key करतात, परंतु त्या वेगवेगळ्या ठिकाणी चालतात आणि
वेगवेगळे उद्देश साध्य करतात: restatement `chatCore.ts` मध्ये HTTP status
लवकर rewrite करते; classification rules `checkFallbackError()` मध्ये
fallback `reason` आणि lock `scope` (`model` / `provider` / `connection`)
निवडतात (`open-sse/services/accountFallback.ts`).

Classification rules ना संपूर्ण error **text** (उदा. `额度不足` सारख्या body
markers शी जुळवण्यासाठी आवश्यक) फक्त `providerErrorRules.ts` मधील
`FULL_TEXT_RULE_PROVIDERS` allowlist मध्ये सूचीबद्ध providers साठी दिसतो —
सध्या फक्त `"agentrouter"`. इतर प्रत्येक **built-in catalog** provider साठी,
`checkFallbackError` हा `getProviderErrorRuleMatch` ला फक्त structured error
(`{code, type}`) देतो, जो header/status/code-आधारित rules साठी पुरेसा असतो,
परंतु body-text markers पाहू शकत नाही. `resolveRuleMatchBody()` helper ही
निवड करतो: allowlisted providers साठी संपूर्ण error text, अन्यथा structured
error. `FULL_TEXT_RULE_PROVIDERS` मध्ये एखादा **built-in** provider जोडणे हे
स्पष्ट per-provider opt-in आहे — list मध्ये नसलेल्या प्रत्येक provider साठी
default path byte-for-byte अपरिवर्तित राहावा म्हणून ते अस्तित्वात आहे.

एखाद्या नियमाचा `scope` (`model` / `provider` / `connection`) हा
`FULL_TEXT_RULE_PROVIDERS` पासून स्वतंत्र opt-in आहे: `checkFallbackError`
तो फक्त `fallbackResult.ruleScope` म्हणून उघड करतो आणि downstream consumers
त्याला केवळ माहितीपर label पेक्षा वेगळे महत्त्व फक्त त्याच file मधील
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist मध्ये असलेल्या providers साठी
देतात (`honorsRuleLockScope()` द्वारे gated — सध्या फक्त `"agentrouter"`).
एखादा provider त्या allowlist मध्ये आल्यानंतर `scope: "connection"` match
प्रत्यक्षात काय करतो यासाठी वरील "पुनर्निर्धारित कोटा त्रुटी" पहा.

**#11104 — ऑपरेटरने घोषित केलेले नियम दोन्ही अनुमतीसूचींना वळसा घालतात.** ऑपरेटर
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`) द्वारे रनटाइमवर
प्रत्येक प्रदात्यासाठी स्वतंत्र नियम घोषित करू शकतो, त्यासाठी ही फाइल संपादित करण्याची गरज नाही.
बिल्ट-इन कॅटलॉग नियमांच्या **डीफॉल्ट** वर्तनाचे संरक्षण करण्यासाठी असलेल्या
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — अनुमतीसूचींमागे
ऑपरेटर नियमाला गेट केल्यास, आधीच सूचीबद्ध असलेले प्रदाते वगळता इतर प्रत्येक प्रदात्यासाठी
सेटिंग्ज यंत्रणा निष्क्रिय होईल, कारण नियम घोषित करणे हे आधीच ऑपरेटरचे स्पष्ट
निवड-सक्षमकरण आहे. `resolveRuleMatchBody()` आणि `honorsRuleLockScope()` हे दोन्ही प्रथम
`hasOperatorRuleForProvider()` तपासतात: ऑपरेटर नियम असलेल्या प्रदात्याला
मूळ त्रुटी मजकूर मिळतो आणि त्याने घोषित केलेल्या `scope` चा आदर केला जातो, तो
कोणत्याही अनुमतीसूचीत समाविष्ट आहे की नाही याची पर्वा न करता.

**ज्ञात उणीव — HTTP 400 साठी `providerRuleRegistry` चा कधीही सल्ला घेतला जात नाही.**
`checkFallbackError` ची `BAD_REQUEST` शाखा status 400 चे वर्गीकरण पूर्णपणे
तिच्या स्वतःच्या पॅटर्न अॅरेद्वारे (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, इत्यादी `accountFallback.ts` मध्ये) करते आणि
तिच्यावरील `configuredRule`/`getProviderErrorRuleMatch` शाखेपर्यंत पोहोचण्यापूर्वीच
परत येते. `status: 400` असलेला बिल्ट-इन कॅटलॉग नियम (किंवा ऑपरेटर नियम)
वाक्यरचनात्मकदृष्ट्या वैध असतो, पण तो कधीही सक्रिय होणार नाही. सध्या कोणताही
विद्यमान नियम 400 ला लक्ष्य करत नाही, त्यामुळे उत्पादनातील कशावरही परिणाम होत नाही —
परंतु भविष्यातील 400 नियमासाठी प्रथम ही शाखा बदलावी लागेल; हा बदल केवळ नियम
जोडण्यापेक्षा मोठा आहे (तो आधीच पॅटर्न-अॅरे वर्तनावर अवलंबून असलेल्या प्रत्येक
प्रदात्यासाठी 400 चे पुनर्वर्गीकरण करतो) आणि एकाच प्रदात्याचा नियम जोडण्याच्या
व्याप्तीबाहेर आहे.

### कोट्याचे चुकीचे वर्णन करणारा नवीन गेटवे जोडणे

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`) मध्ये एक नियम अॅरे नोंदवा.
   `textMarkers` प्रदाता-विशिष्ट ठेवा; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) शी टक्कर होणारी सर्वसाधारण इंग्रजी
   वाक्ये कधीही पुन्हा वापरू नका.
2. योग्य लॉक व्याप्ती निवडण्यासाठी (`connection` खाते-व्यापी कोट्यासाठी,
   `model` प्रत्येक मॉडेलच्या त्रुट्यांसाठी) पर्यायाने
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) मध्ये
   वर्गीकरण नियम नोंदवा. पूर्ण त्रुटी मजकुराची (बॉडी मार्कर्सची) आवश्यकता असलेल्या
   प्रदात्यांच्या नियमांसाठीच ही पायरी उत्पादनात प्रभावी होते: त्याच फाइलमधील
   `FULL_TEXT_RULE_PROVIDERS` मध्ये प्रदाता id जोडा — अन्यथा
   `checkFallbackError` नियमाला केवळ संरचित `{code, type}` त्रुटीच देते आणि
   बॉडी-मजकुराचा नियम थेट ट्रॅफिकशी कधीही जुळणार नाही. केवळ `status`/`headers`
   वर जुळणाऱ्या नियमांना (जसे Opencode किंवा Minimax चे) या निवड-सक्षमकरणाची
   आवश्यकता नाही. स्वतंत्रपणे, जर नियम `scope: "connection"` घोषित करत असेल
   आणि प्रत्यक्ष connection-व्यापी cooldown तसेच त्याच विनंतीतील combo skip
   (केवळ माहितीपर लेबल नव्हे) हा उद्देश असेल, तर त्याच फाइलमधील
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मध्ये प्रदाता id जोडा — हेच
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) आणि
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) मधील
   `isAgentrouterConnectionQuotaScope()`-शैलीतील वापर गेट करते; त्याशिवाय `scope`
   अजूनही `fallbackResult.ruleScope` मधून पुढे जातो, पण त्यावर कोणतीही कृती होत नाही.
3. `tests/unit/upstream-status-restatement.test.ts` आणि
   `tests/unit/agentrouter-error-rules.test.ts` यांचे प्रतिबिंब असलेल्या युनिट
   चाचण्या जोडा (`not-permanent` / `not-creditsExhausted` गार्ड्ससह, आणि —
   प्रदात्याला अनुमतीसूचीची आवश्यकता असल्यास — `resolveRuleMatchBody()` केवळ
   त्या प्रदात्यासाठी पूर्ण मजकूर परत करते हे सिद्ध करणारी चाचणी).

`chatCore.ts`, `classifyError` किंवा combo मध्ये कोणतेही बदल आवश्यक नाहीत.

#### एग्रेस-बकेटेड लॉक (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS` (opencode फॅमिली) मधील प्रदात्यांना
IP-बकेटेड upstream म्हणून हाताळले जाते (opencode चा फ्री टियर account-बकेटेड नसून
IP-बकेटेड आहे — #9611 पहा): `quota_exhausted` **किंवा**
`rate_limit_exceeded` म्हणून वर्गीकृत केलेला status-429, रोटेशनने त्यांना वापरून
पाहण्यापूर्वी, ज्यांचा शेवटचा ज्ञात एग्रेस IP अयशस्वी connection च्या IP शी जुळतो
अशा अनुमतीसूचीत समाविष्ट फॅमिलीतील प्रत्येक connection ला cooldown मध्ये टाकतो
— त्यामुळे N-1 हमखास अयशस्वी होणारे upstream कॉल्स टाळले जातात
(#10460/#10525 सारखीच रचना).
`rate_limit_exceeded` मुद्दाम समाविष्ट केले आहे: `markAccountUnavailable`
मार्गावर opencode-विशिष्ट नियम कधीही जुळत नाहीत (`checkFallbackError` ला
headers/body दिले जात नाहीत, opencode हा `FULL_TEXT_RULE_PROVIDERS` मध्ये नाही),
त्यामुळे ज्याच्या body मध्ये subscription-quota मजकूर ("monthly usage limit
reached") आहे असा 429, `status_429` नियमापर्यंत पोहोचण्यापूर्वीच quota-text
fallback (`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h cooldown)
द्वारे `quota_exhausted` म्हणून वर्गीकृत होतो — तर quota-text नसलेला 429
(साधे rate limiting) `status_429` नियमाद्वारे `rate_limit_exceeded` म्हणून
वर्गीकृत होतो आणि तरीही IP फॅमिलीला cooldown मध्ये टाकतो. अनुमतीसूचीत असलेल्या
प्रदात्यासाठी IP-बकेटेड rate limit हा संपलेल्या कोट्यासारखाच सिग्नल आहे. वास्तविक मर्यादा:

- **सर्वोत्तम-प्रयत्न**: लॉक `proxy_logs` मधून कनेक्शनचा शेवटचा ज्ञात `egress_ip`
  शोधतो (24h विंडो, समकालिक, कॅश नाही). कोल्ड कॅश (egress
  IP ची कधीही तपासणी झालेली नाही) किंवा कोणतीही रांग नाही → अयशस्वी कनेक्शनला तरीही या
  शाखेद्वारे कूलडाउनमध्ये ठेवले जाते (आजच्याप्रमाणे नोंदवले जाते), फक्त कोणतेही सहोदर कनेक्शन लॉक केले जात नाही.
- **कधीही अंतिम नाही**: कूलडाउन ही नूतनीकरण होणारी कोटा विंडो आहे
  (`testStatus: "unavailable"`); IP-स्तरीय सिग्नलवरून कधीही कायमस्वरूपी स्थिती निर्धारित केली जात नाही.
  `disableCooling` कनेक्शन्स ही शाखा पूर्णपणे वगळतात.
- **अनुमतिसूचीतील फॅमिलीसाठी लॉकची ग्रॅन्युलॅरिटी बदलते**: हा केवळ सहोदर-संबंधित
  ऑप्टिमायझेशन नसून स्कोपमधील बदल आहे. opencode हा `passthroughModels`
  प्रोव्हायडर आहे, त्यामुळे या शाखेपूर्वी 429 मुळे प्रति-MODEL लॉकआउट होत असे; आता त्यामुळे
  कनेक्शन कूलडाउन होते — यात कोणतेही सहोदर कनेक्शन नसताना एकच कनेक्शन चालवणारा ऑपरेटरही
  समाविष्ट आहे. हीच ग्रॅन्युलॅरिटी opencode च्या नियम तक्त्याने आधीच योग्य म्हणून
  घोषित केली आहे (`scope: "connection"`,
  `providerErrorRules.ts`), परंतु opencode हा
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` मध्ये नसल्यामुळे आजवर तिचे पालन झालेले नाही. ही शाखा,
  कनेक्शन-स्कोप असलेल्या agentrouter शाखेचे प्रतिबिंब ठेवत, अयशस्वी
  कनेक्शनचा कूलडाउन + `backoffLevel` स्वतः लिहिते आणि परतते — खालील प्रति-मॉडेल ब्लॉक आणि
  सर्वसाधारण मार्गापर्यंत कधीही पोहोचले जात नाही.
- **कॉम्बो समाविष्ट**: agentrouter शाखेप्रमाणेच, एखादा कॉम्बो कॉलर
  429 वर लागू करत असलेल्या `persistUnavailableState`/`isCombo` डाउनग्रेडकडे हा स्कोप जाणीवपूर्वक
  दुर्लक्ष करतो. प्रति-मॉडेल लॉकआउट हा या स्कोपचा कमकुवत प्रकार नसून ते चुकीचे एकक आहे:
  तो संपलेल्या IP बद्दल काहीही सांगत नाही, त्यामुळे कॉम्बो
  रोटेशन प्रत्येक सहोदर कनेक्शनमागे एक हमखास-अयशस्वी कॉल करत राहील.
- **सहोदर सुरक्षितता**: आधीच अंतिम स्थितीत असलेले (banned/credits_exhausted)
  किंवा आधीच अधिक दीर्घ कूलडाउनमध्ये असलेले सहोदर कनेक्शन कधीही अधिलिखित केले जात नाही.
- **विशिष्ट अनुमतिसूची**: `EGRESS_BUCKETED_LOCK_PROVIDERS` विस्तारणे हा
  मालकाचा स्पष्ट निर्णय आहे; कोणतेही सर्वसाधारण वायरिंग नाही (पॅटर्न #10334/#10419). सहोदर
  क्वेरी तीच अनुमतिसूची SQL
  लिटरल म्हणून पुन्हा लिहिण्याऐवजी बाइंड करते, त्यामुळे ती विस्तारणे हा एकाच ओळीतील बदल राहतो.
- **Egress IP रोटेशन, दोन्ही दिशांनी**: लुकअप विंडो (24h) ही
  egress-IP कॅश TTL (5 min) पेक्षा बरीच मोठी आहे, त्यामुळे "शेवटचा ज्ञात IP" हा इतिहास आहे,
  सद्यस्थिती नाही. एखाद्या कनेक्शनचा प्रॉक्सी या विंडोमध्ये रोटेट झाला असेल, तर लॉककडून
  खरोखर सामायिक असलेला IP **सुटू** शकतो (नोंदवलेला IP हा नवीन,
  न संपलेला IP असतो) — आणि त्याचप्रमाणे, तो संपलेल्या IP पासून त्यानंतर
  दूर रोटेट झालेल्या सहोदर कनेक्शनला **कूलडाउनमध्ये ठेवू** शकतो. दुसऱ्या प्रकरणात त्या सहोदर कनेक्शनला एका
  कूलडाउन विंडोची किंमत मोजावी लागते; इतिहास-आधारित
  लुकअपच्या सर्वोत्तम-प्रयत्न मर्यादा म्हणून दोन्ही स्वीकारल्या आहेत.
- **खर्च**: `proxy_logs` चे दोन मर्यादित स्कॅन (`idx_pl_timestamp` द्वारे
  विंडो-फिल्टर केलेले), फक्त 429 च्या वारंवारतेवर. कोणताही नवीन इंडेक्स नाही (मायग्रेशन 134
  YAGNI). मध्यम आकाराच्या प्रत्यक्ष-ट्रॅफिक DB प्रतीवर मोजलेले; उच्च-थ्रूपुट
  इन्स्टन्समध्ये त्याच विंडोमध्ये प्रमाणानुसार अधिक रांगा असतात.

---

## इतर लवचिकता वैशिष्ट्ये

- **19 रूटिंग धोरणे** (प्राधान्य, भारित, राउंड-रॉबिन, कॉन्टेक्स्ट-रिले, फिल-फर्स्ट, p2c, रँडम, सर्वात-कमी-वापरलेले, खर्च-अनुकूलित, रीसेट-जागरूक, रीसेट-विंडो, हेडरूम, स्ट्रिक्ट-रँडम, ऑटो, lkgp, कॉन्टेक्स्ट-अनुकूलित, कॅश-अनुकूलित, फ्यूजन, पाइपलाइन) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) पहा.
- **रीसेट-जागरूक रूटिंग** (v3.8.0) — कोटा रीसेट वेळेनुसार कनेक्शन्सना प्राधान्य देते.
- **बॅकग्राउंड मोड अवनती** — Responses API `background: true` चेतावणीसह सिंक मोडमध्ये अवनत केले जाते.
- **डायनॅमिक टूल मर्यादा शोध** — टूल संख्येची मर्यादा गाठल्यास प्रदात्यांकडून माघार घेतो.
- **आपत्कालीन फॉलबॅक** — `OMNIROUTE_EMERGENCY_FALLBACK` द्वारे नियंत्रित; ऑपरेटर रीस्टार्ट न करता Feature Flags पृष्ठावरून ते ओव्हरराइड करू शकतात.

---

## डीबगिंग

- भारित कॉम्बोचे उत्तर `503 all_targets_cooling_down` असे असल्यास (`Retry-After` सेट केलेले असते आणि `diagnostics.excluded` मध्ये प्रत्येक लक्ष्याची नोंद `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` यांसह असते) → पूल कॉन्फिगर केलेला आणि कनेक्ट केलेला आहे; प्रत्येक लक्ष्य केवळ लवचिकता टाइमरमुळे वगळलेले आहे. `[COMBO] Weighted selection: every target excluded before dispatch — …` या चेतावणीमध्ये कारणे आणि उर्वरित सेकंद नमूद केलेले असतात. त्याच कॉम्बोकडून मिळणारे `404 no_executable_targets` म्हणजे कोणताही लवचिकता टाइमर संबंधित नव्हता (चालवण्यासाठी काहीही नाही किंवा प्रत्येक खात्याची उपलब्धता तपासणी अयशस्वी झाली). `targetResolution.ts` मध्ये गोळा केलेल्या वगळण्यांच्या आधारे `open-sse/services/combo/pinRecovery.ts` मध्ये अंगभूत केलेले आहे.
- एखाद्या प्रदात्याच्या सर्व की वगळल्या गेल्या → सर्किट ब्रेकरची स्थिती आणि प्रत्येक कनेक्शनचे `rateLimitedUntil`/`testStatus` हे दोन्ही तपासा.
- रीसेट विंडोनंतरही प्रदाता कायमस्वरूपी वगळलेला आहे → कोड `getStatus()`/`canExecute()` ऐवजी थेट `state` वाचत आहे.
- एक की अयशस्वी झाली, तरी इतरांनी कार्य केले पाहिजे → सर्किट ब्रेकरपेक्षा कनेक्शन कूलडाउनला प्राधान्य द्या.
- केवळ एक मॉडेल अयशस्वी होते → कनेक्शन कूलडाउनपेक्षा मॉडेल लॉकआउटला प्राधान्य द्या.
- स्थिती स्वतःहून पूर्ववत व्हायला हवी, पण होत नाही → भविष्यातील टाइमस्टॅम्प आणि कालबाह्य स्थिती रीफ्रेश करणारा रीड पाथ तपासा. कायमस्वरूपी स्थितींसाठी मॅन्युअल बदल आवश्यक असतात.

---

## TLS फिंगरप्रिंटिंग आणि स्टेल्थ

प्रदाता-विशिष्ट स्टेल्थ (JA3/JA4, CCH, ऑब्फस्केशन) स्वतंत्रपणे दस्तऐवजीकृत आहे — `docs/security/STEALTH_GUIDE.md` पहा (git; `/docs` मध्ये कम्पाइल केलेले नाही).

---

## लवचिकता चाचणी (Phase 8 · Block C)

लवचिकता लॉजिकच्या युनिट चाचण्यांव्यतिरिक्त, तीन चाचण्या प्रत्यक्ष
ताण/अपयश परिस्थितींमध्ये रनटाइमची चाचणी करतात (सर्व इंटिग्रेशन/नाइटली — कोणतीही PRs अवरोधित करत नाही):

| चाचणी   | काय                                                                                                                                                                                                          | चालवण्याची पद्धत                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| केऑस    | बनावट-अपस्ट्रीम नोड प्रत्यक्ष विलंब/रीसेट/टाइमआउट/503 इंजेक्ट करतो; सर्किट ब्रेकर उघडतो/पूर्ववत होतो आणि `checkFallbackError` 503 ला पुनर्प्राप्त करण्यायोग्य फॉलबॅक म्हणून वर्गीकृत करतो याची पडताळणी करतो. | `RUN_CHAOS_INT=1 npm run test:chaos`    |
| हीप-वाढ | `--expose-gc` अंतर्गत प्रत्येक `createSSEStream` साठी ~500 स्ट्रीम्स; हीप कमाल मर्यादेपेक्षा वाढल्यास चाचणी अयशस्वी होते (OOM गार्ड #3069).                                                                  | `npm run test:heap`                     |
| k6 सोक  | `/api/monitoring/health` वर सातत्यपूर्ण लोड; p95/त्रुटी थ्रेशोल्ड्स.                                                                                                                                         | `k6 run tests/load/k6-soak.js` (नाइटली) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) द्वारे समन्वयित. डीफॉल्ट
`test:integration` मध्ये, केऑस आणि हीप चाचण्या स्वतःहून वगळल्या जातात (`RUN_CHAOS_INT`/`--expose-gc` शिवाय).

---

## हे देखील पहा

- [आर्किटेक्चर मार्गदर्शक](./ARCHITECTURE.md) — प्रणालीची आर्किटेक्चर आणि अंतर्गत रचना
- [वापरकर्ता मार्गदर्शक](../guides/USER_GUIDE.md) — प्रदाते, कॉम्बो, CLI एकत्रीकरण
- [ऑटो-कॉम्बो इंजिन](../routing/AUTO-COMBO.md) — 16-घटक गुणांकन, मोड पॅक्स
