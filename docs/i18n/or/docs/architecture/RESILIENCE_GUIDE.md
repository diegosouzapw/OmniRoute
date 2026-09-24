# Resilience Guide (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ରେ ତିନୋଟି ପୃଥକ କିନ୍ତୁ ପରସ୍ପର ସମ୍ବନ୍ଧିତ ସ୍ଥିତିସ୍ଥାପକତା ପ୍ରଣାଳୀ ରହିଛି। ପ୍ରତ୍ୟେକର ପରିସର ଏବଂ ଉଦ୍ଦେଶ୍ୟ ଭିନ୍ନ। ରାଉଟିଂ ଆଚରଣ ଡିବଗ୍ କରିବାବେଳେ ସେଗୁଡ଼ିକୁ ପୃଥକ ରଖନ୍ତୁ।

![3-ସ୍ତରୀୟ ସ୍ଥିତିସ୍ଥାପକତା ମଡେଲ୍](../diagrams/exported/resilience-3layers.svg)

> ଉତ୍ସ: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. ପ୍ରଦାନକାରୀ ସର୍କିଟ୍ ବ୍ରେକର୍

**ପରିସର:** ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରଦାନକାରୀ (ଯଥା, `glm`, `openai`, `anthropic`)।

**ଉଦ୍ଦେଶ୍ୟ:** ଅପ୍ଷ୍ଟ୍ରିମ୍/ସେବା ସ୍ତରରେ ବାରମ୍ବାର ବିଫଳ ହେଉଥିବା ପ୍ରଦାନକାରୀଙ୍କ ନିକଟକୁ ଟ୍ରାଫିକ୍ ପଠାଇବା ବନ୍ଦ କରିବା।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- ମୂଳ କ୍ଲାସ୍: `src/shared/utils/circuitBreaker.ts`
- ୱାୟାରିଂ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- ସ୍ଥିତି API: `GET /api/monitoring/health`
- ରିସେଟ୍ API: `POST /api/resilience/reset`
- ରାପର୍ଗୁଡ଼ିକ: `open-sse/services/accountFallback.ts`
- DB ଟେବୁଲ୍: `domain_circuit_breakers`

**ସ୍ଥିତିଗୁଡ଼ିକ:**

- `CLOSED` — ସାଧାରଣ ଟ୍ରାଫିକ୍ ଅନୁମୋଦିତ
- `DEGRADED` — ଟ୍ରାଫିକ୍ ଏବେ ମଧ୍ୟ ଅନୁମୋଦିତ, କିନ୍ତୁ ପ୍ରଦାନକାରୀଙ୍କ ବର୍ଦ୍ଧିତ ବିଫଳତାଗୁଡ଼ିକୁ ଟ୍ରାକ୍ କରାଯାଉଛି
- `OPEN` — ପ୍ରଦାନକାରୀଙ୍କୁ ଅସ୍ଥାୟୀ ଭାବେ ଅବରୋଧ କରାଯାଇଛି; କମ୍ବୋ ରାଉଟିଂ ଏହାକୁ ଏଡ଼ାଇଯାଏ
- `HALF_OPEN` — ରିସେଟ୍ ସମୟସୀମା ଅତିକ୍ରମ କରିଛି; ପ୍ରୋବ୍ ଅନୁରୋଧ ଅନୁମୋଦିତ

**ବିନ୍ୟାସଯୋଗ୍ୟ ଡିଫଲ୍ଟଗୁଡ଼ିକ (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience ରେ ଉପଲବ୍ଧ):**

| କ୍ଲାସ୍  | ଅବନତି ଆରମ୍ଭ | ଖୋଲିବା ସୀମା | ରିସେଟ୍ ସମୟସୀମା |
| ------- | ----------- | ----------- | -------------- |
| OAuth   | 5ଟି ବିଫଳତା  | 8ଟି ବିଫଳତା  | 60s            |
| API-key | 7ଟି ବିଫଳତା  | 12ଟି ବିଫଳତା | 30s            |
| ସ୍ଥାନୀୟ | ବ୍ୟୁତ୍ପନ୍ନ  | 2ଟି ବିଫଳତା  | 15s            |

`degradationThreshold` ନିୟନ୍ତ୍ରଣ କରେ ଯେ କେବେ ଜଣେ ପ୍ରଦାନକାରୀ `DEGRADED` ସ୍ଥିତିରେ ପ୍ରବେଶ କରିବେ; `failureThreshold` ନିୟନ୍ତ୍ରଣ କରେ ଯେ କେବେ ଏହା ଖୋଲିବ ଏବଂ ଏହାକୁ ଏଡ଼ାଇ ଦିଆଯିବ। ସ୍ଥାନୀୟ ପ୍ରଦାନକାରୀ ପ୍ରୋଫାଇଲ୍ଗୁଡ଼ିକ ଏପର୍ଯ୍ୟନ୍ତ Resilience ସେଟିଂସ୍ ପୃଷ୍ଠାରେ ଉପଲବ୍ଧ ନୁହେଁ।

**ଟ୍ରିପ୍ କୋଡ୍ଗୁଡ଼ିକ:** କେବଳ ପ୍ରଦାନକାରୀ-ସ୍ତରୀୟ ସ୍ଥିତି `[408, 500, 502, 503, 504]`। ଆକାଉଣ୍ଟ-ସ୍ତରୀୟ ତ୍ରୁଟିଗୁଡ଼ିକ ପାଇଁ (ଅଧିକାଂଶ 401/403/429 — ସେଗୁଡ଼ିକ କୁଲ୍ଡାଉନ୍ କିମ୍ବା ଲକ୍ଆଉଟ୍ର ଅଂଶ) ଟ୍ରିପ୍ କରନ୍ତୁ ନାହିଁ।

**ଅଳସ ପୁନରୁଦ୍ଧାର:** `OPEN` ର ସମୟସୀମା ସମାପ୍ତ ହେଲେ, `getStatus()`, `canExecute()`, `getRetryAfterMs()` ସ୍ଥିତିକୁ `HALF_OPEN` ରେ ରିଫ୍ରେଶ୍ କରେ। କୌଣସି ବ୍ୟାକ୍ଗ୍ରାଉଣ୍ଡ ଟାଇମର୍ର ଆବଶ୍ୟକତା ନାହିଁ।

---

### ଇଚ୍ଛାଧୀନ ଗ୍ଲୋବାଲ୍ ପ୍ରଦାନକାରୀ କୁଲ୍ଡାଉନ୍ (ୱିଣ୍ଡୋ ଗେଟ୍)

ଏକ ଚତୁର୍ଥ, **ଇଚ୍ଛାଧୀନ** ସ୍ତର (`PROVIDER_COOLDOWN_ENABLED`, ଡିଫଲ୍ଟ ଭାବେ **ବନ୍ଦ**)
`open-sse/services/providerCooldownTracker.ts` ରେ ବିଫଳ ହେଉଥିବା ପ୍ରଦାନକାରୀମାନଙ୍କର
କ୍ରସ୍-ରିକ୍ୱେଷ୍ଟ ମେମୋରୀ ରଖେ, ଯାହାକୁ କମ୍ବୋ ଟାର୍ଗେଟ୍
ରିଜୋଲ୍ୟୁସନ୍ ପରାମର୍ଶ କରେ, ଯାହାଦ୍ୱାରା କ୍ରମାଗତ କମ୍ବୋ ଅନୁରୋଧଗୁଡ଼ିକ ଏମାତ୍ର
ବିଫଳ ହୋଇଥିବା ପ୍ରଦାନକାରୀଙ୍କୁ ପୁନଃ ଯାଞ୍ଚ କରିବା ବନ୍ଦ କରେ। ପ୍ରଦାନକାରୀ-ସ୍ତରୀୟ ଏଣ୍ଟ୍ରିଗୁଡ଼ିକ `PROVIDER_PROFILES` ୱିଣ୍ଡୋ ଗେଟ୍କୁ ମାନନ୍ତି:

| ପ୍ରୋଫାଇଲ୍ | ଏତିକି ପରେ ଟ୍ରିପ୍ କରେ (`providerFailureThreshold`) | ଏହା ମଧ୍ୟରେ (`providerFailureWindowMs`) | ଏତିକି ସମୟ ପାଇଁ ଥଣ୍ଡା ହୁଏ (`providerCooldownMs`) |
| --------- | ------------------------------------------------: | -------------------------------------: | ----------------------------------------------: |
| OAuth     |                                              `10` |                                `15min` |                                          `5min` |
| API key   |                                              `15` |                                `30min` |                                         `10min` |

ଥ୍ରେସହୋଲ୍ଡଠାରୁ କମ୍ ଥିଲେ ପ୍ରଦାନକାରୀଙ୍କୁ **କୁଲିଂ ଅବସ୍ଥାରେ** ଥିବା ବୋଲି ବିବେଚନା କରାଯାଏ ନାହିଁ; ଏକ ସଫଳତା
ୱିଣ୍ଡୋକୁ ସଫା କରେ। ସଂଯୋଗ-ସ୍ତରୀୟ ଏଣ୍ଟ୍ରିଗୁଡ଼ିକ (`provider:connectionId`) ଏହା ପରିବର୍ତ୍ତେ
ଏକ୍ସପୋନେନ୍ସିଆଲ୍ `minRetryCooldownMs → maxRetryCooldownMs` ବ୍ୟାକ୍ଅଫ୍ ବଜାୟ ରଖନ୍ତି। ଓଭର୍ରାଇଡ୍ଗୁଡ଼ିକ:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`।
ରିଗ୍ରେସନ୍ ଗାର୍ଡ: `tests/unit/provider-cooldown-window-gate.test.ts`।

## 2. ସଂଯୋଗ କୁଲ୍ଡାଉନ୍

**ପରିସର:** ଗୋଟିଏ ପ୍ରଦାନକାରୀ ସଂଯୋଗ/ଆକାଉଣ୍ଟ/କୀ।

**ଉଦ୍ଦେଶ୍ୟ:** ସେହି ପ୍ରଦାନକାରୀଙ୍କ ଅନ୍ୟ ସଂଯୋଗଗୁଡ଼ିକ ସେବା ଜାରି ରଖିଥିବାବେଳେ ଗୋଟିଏ ଖରାପ କୀକୁ ଏଡ଼ାଇବା।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- ଅନୁପଲବ୍ଧ ଭାବେ ଚିହ୍ନିତ କରନ୍ତୁ: `src/sse/services/auth.ts::markAccountUnavailable()`
- ଚୟନ: ସେହି ଫାଇଲ୍ରେ `getProviderCredentials*`
- କୁଲ୍ଡାଉନ୍ ଗଣନା: `open-sse/services/accountFallback.ts::checkFallbackError()`
- ସେଟିଂସ୍: `src/lib/resilience/settings.ts`

**ପ୍ରତ୍ୟେକ ସଂଯୋଗ ପାଇଁ ଫିଲ୍ଡଗୁଡ଼ିକ:**

- `rateLimitedUntil` — କୁଲ୍ଡାଉନ୍ ସମାପ୍ତ ହେବା ପର୍ଯ୍ୟନ୍ତ ଟାଇମ୍ଷ୍ଟାମ୍ପ
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ଏକ୍ସପୋନେନ୍ସିଆଲ୍ ବ୍ୟାକଅଫ୍ କାଉଣ୍ଟର୍

**ଡିଫଲ୍ଟ କୁଲ୍ଡାଉନ୍ଗୁଡ଼ିକ:**

- OAuth ଆଧାର: 5s
- API-key ଆଧାର: 3s
- API-key 429: ଅପ୍ଷ୍ଟ୍ରିମ୍ `Retry-After`/ରିସେଟ୍ ହେଡର୍ଗୁଡ଼ିକ/ପାର୍ସ କରାଯୋଗ୍ୟ ରିସେଟ୍ ଟେକ୍ସଟ୍କୁ ପ୍ରାଧାନ୍ୟ ଦିଏ
- ବ୍ୟାକଅଫ୍: `baseCooldownMs * 2 ** failureIndex`

**ଆଣ୍ଟି-ଥଣ୍ଡରିଂ-ହର୍ଡ ସୁରକ୍ଷା:** ସମସାମୟିକ ବିଫଳତାଗୁଡ଼ିକୁ କୁଲ୍ଡାଉନ୍ ଅତ୍ୟଧିକ ବଢ଼ାଇବା କିମ୍ବା `backoffLevel`କୁ ଦୁଇଥର ବୃଦ୍ଧି କରିବାରୁ ରୋକେ।

**ଟର୍ମିନାଲ୍ ଅବସ୍ଥାଗୁଡ଼ିକ (କୁଲ୍ଡାଉନ୍ ନୁହେଁ):**

- `banned` — ନିଷିଦ୍ଧ-କୀୱାର୍ଡ / ଆକାଉଣ୍ଟ-ବ୍ୟାନ୍ ଚିହ୍ନଟକରଣ ([BAN_DETECTION](../security/BAN_DETECTION.md) ଦେଖନ୍ତୁ), ଏବଂ ଲଗାତାର ତିନୋଟି ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରତି-ଅନୁରୋଧ ପ୍ରତ୍ୟାଖ୍ୟାନ (`request_rejected`, ଯଥା Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`) ଦ୍ୱାରା ସେଟ୍ କରାଯାଏ; ଗୋଟିଏ ପ୍ରତ୍ୟାଖ୍ୟାନ କେବଳ ସଂଯୋଗକୁ କୁଲ୍ଡାଉନ୍ରେ ରଖେ
- `expired` (ସୀମିତ ପୁନଃଚେଷ୍ଟା ପରେ ଟର୍ମିନାଲ୍ ଅବସ୍ଥାକୁ ଯାଏ — ଏକ୍ସପୋନେନ୍ସିଆଲ୍ ବ୍ୟାକଅଫ୍ ସହିତ `EXPIRED_RETRY_MAX = 3` — ଯାହାଦ୍ୱାରା ଆକାଉଣ୍ଟ ସ୍ଥାୟୀ ଭାବେ ନିଷ୍କ୍ରିୟ ହେବା ପୂର୍ବରୁ ଅସ୍ଥାୟୀ OAuth ତ୍ରୁଟିଗୁଡ଼ିକ ସ୍ୱତଃ ସୁଧାରିପାରିବ)
- `credits_exhausted`

ପ୍ରମାଣପତ୍ରଗୁଡ଼ିକ ପରିବର୍ତ୍ତିତ ନହେବା କିମ୍ବା କୌଣସି ଅପରେଟର୍ ସେଗୁଡ଼ିକୁ ରିସେଟ୍ ନକରିବା ପର୍ଯ୍ୟନ୍ତ ଏଗୁଡ଼ିକ ଅବ୍ୟାହତ ରହେ। ଟର୍ମିନାଲ୍ ଅବସ୍ଥାଗୁଡ଼ିକୁ ଅସ୍ଥାୟୀ କୁଲ୍ଡାଉନ୍ ଅବସ୍ଥା ସହିତ ଓଭର୍ରାଇଟ୍ କରନ୍ତୁ ନାହିଁ।

**ବିଳମ୍ବିତ ପୁନରୁଦ୍ଧାର:** `rateLimitedUntil` ଅତିକ୍ରମ ହୋଇଗଲେ, ସଂଯୋଗ ପୁଣି ଯୋଗ୍ୟ ହୁଏ। ସଫଳ ବ୍ୟବହାର ପରେ, `clearAccountError()` ସମସ୍ତ ତ୍ରୁଟି ଫିଲ୍ଡକୁ ସଫା କରେ।

### Claude OAuth ବ୍ୟବହାର ସୀମା: ନିମ୍ନ-ପ୍ରାଥମିକତା ଲେନ୍ + ସେସନ୍-ସୀମା ରିସେଟ୍

**ପରିସର:** ଗୋଟିଏ Claude ସବ୍ସ୍କ୍ରିପ୍ସନ୍ (OAuth) ସଂଯୋଗ। ଉଭୟ ବୈଶିଷ୍ଟ୍ୟ **ପ୍ରତି
ସଂଯୋଗ ପାଇଁ ଇଚ୍ଛାଧୀନ** (ସଂଯୋଗ ସମ୍ପାଦନ କରନ୍ତୁ → Claude ବିଭାଗ → `lowPriorityMode` / `autoLimitReset`
`providerSpecificData`ରେ, ଉଭୟ ଡିଫଲ୍ଟ ଭାବେ ବନ୍ଦ) ଏବଂ Claude Codeର `/low-priority` ଓ
`/limit-reset` କମାଣ୍ଡଗୁଡ଼ିକୁ ଅନୁକରଣ କରେ (Claude Code 2.1.263ରୁ ୱାୟାର୍ ଚୁକ୍ତି କ୍ୟାପ୍ଚର୍ କରାଯାଇଛି)।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- ଷ୍ଟେଟ୍ ମେସିନ୍ + ପ୍ରତିକ୍ରିୟା ବର୍ଗୀକରଣ: `open-sse/services/claudeLowPriority.ts`
- ରିସେଟ୍ ସ୍ଥିତି/କ୍ଲେମ୍ କ୍ଲାଏଣ୍ଟ: `open-sse/services/claudeLimitReset.ts`
- ଏକ୍ସିକ୍ୟୁଟର୍ ହୁକ୍ (ହେଡର୍ ଇଞ୍ଜେକ୍ସନ୍ + ସମାନ-ଆକାଉଣ୍ଟ ପୁନଃଚେଷ୍ଟା): `open-sse/executors/base.ts::execute()`
- ଇଚ୍ଛାଧୀନତା ସ୍ଥାୟୀକରଣ: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**ଟ୍ରିଗର୍:** 5-ଘଣ୍ଟିଆ ବ୍ୟବହାର ସୀମା — ଏକ `429`, ଯାହାର ହେଡର୍ଗୁଡ଼ିକରେ
`anthropic-ratelimit-unified-status: rejected` ଥାଏ ଏବଂ, ଆକାଉଣ୍ଟଟି ଯୋଗ୍ୟ ହେଲେ,
`anthropic-ratelimit-unified-slow-offer: treatment` ଥାଏ। ସେହି ପ୍ରଥମ ସୀମା
429 ପୂର୍ବରୁ କିଛି ପଠାଯାଏ ନାହିଁ; ୟୁନିଫାଇଡ୍ ହେଡର୍ ବିନା ଏକ ବର୍ଷ୍ଟ 429 ସାଧାରଣ କୁଲ୍ଡାଉନ୍ ପଥ ଦେଇ ଯାଏ।

**ନିମ୍ନ-ପ୍ରାଥମିକତା ଲେନ୍** (`lowPriorityMode`):

- ସୀମା 429 ମିଳିଲେ ଏକ୍ସିକ୍ୟୁଟର୍ ଅଫର୍କୁ ଗ୍ରହଣ କରେ ଏବଂ ତୁରନ୍ତ **ସେହି ସମାନ**
  ଆକାଉଣ୍ଟକୁ `anthropic-usage-limit: slow` ସହିତ ପୁନଃଚେଷ୍ଟା କରେ; ଘୋଷିତ
  `anthropic-ratelimit-unified-reset` (+60s ଅନୁଗ୍ରହ ସମୟ) ପର୍ଯ୍ୟନ୍ତ ଲେନ୍ ସକ୍ରିୟ ରହେ ଏବଂ ସେହି ସମୟସୀମା ମଧ୍ୟରେ ପ୍ରତ୍ୟେକ ଅନୁରୋଧ
  ଏହି ହେଡର୍ ବହନ କରେ। ଅଟକାଯାଇଥିବା 429 କେବେବି `handleChatCore` ପର୍ଯ୍ୟନ୍ତ ପହଞ୍ଚେ ନାହିଁ, ତେଣୁ ସଂଯୋଗଟି
  କୁଲ୍ଡାଉନ୍ରେ **ରଖାଯାଏ ନାହିଁ** ଏବଂ ଅନ୍ୟତ୍ର ଘୁରାଇ ଦିଆଯାଏ ନାହିଁ।
- ପରବର୍ତ୍ତୀ ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକରେ `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  ଲେନ୍କୁ ବଜାୟ ରଖେ; `slot_busy` (429) କିମ୍ବା ଏକ `529` ସର୍ଭର୍ର
  `anthropic-ratelimit-unified-slow-retry-after` ଅନୁଯାୟୀ ଅପେକ୍ଷା କରେ (ଡିଫଲ୍ଟ 20s, 5–600sରେ ସୀମିତ, ±30% ଜିଟର୍)
  ଏବଂ ପୁନଃଚେଷ୍ଟା କରେ, ଯାହା `anthropic-ratelimit-unified-slow-max-wait` ଦ୍ୱାରା ସୀମିତ (ଡିଫଲ୍ଟ 20 ମିନିଟ୍, ସୀମା
  1 ମିନିଟ୍–6 ଘଣ୍ଟା) — ଏହା ଅତିକ୍ରମ କଲେ ଲେନ୍ ସମାପ୍ତ ହୁଏ ଏବଂ 10-ମିନିଟ୍ର କୁଲ୍-ଅଫ୍ ପୁନଃଗ୍ରହଣକୁ ଅବରୋଧ କରେ। ଅପେକ୍ଷା
  ସମୟଟି ଅନୁରୋଧର ନିଜସ୍ୱ ଅପ୍ଷ୍ଟ୍ରିମ୍-ଆରମ୍ଭ ଟାଇମ୍ଆଉଟ୍ରେ ଅବଶିଷ୍ଟ ସମୟ
  (`resolveFetchStartTimeout`, ଡିଫଲ୍ଟ ଭାବେ 10 ମିନିଟ୍)ରୁ 5 s ମାର୍ଜିନ୍ କମାଇ ଅତିରିକ୍ତ ଭାବେ ସୀମିତ କରାଯାଏ: ସେହି ସୀମା ବିନା
  ଡିଫଲ୍ଟ 20-ମିନିଟ୍ର ସର୍ବାଧିକ-ଅପେକ୍ଷା ଅନୁରୋଧଠାରୁ ଅଧିକ ସମୟ ଚାଲିଥାନ୍ତା ଏବଂ ଅପେକ୍ଷା ମଝିରେ ସ୍ଲିପ୍ ବାତିଲ୍
  ହୋଇଯାଇଥାନ୍ତା, ଫଳରେ ସୁସଂଗଠିତ `max_wait` ସମାପ୍ତି + କୁଲ୍-ଅଫ୍ ପରିବର୍ତ୍ତେ ଏକ `TimeoutError` ଦୃଶ୍ୟମାନ ହୋଇଥାନ୍ତା।
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, ଏକ 5h-ୱିଣ୍ଡୋ ରୋଲ୍ଓଭର୍, କିମ୍ବା
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (ଯାହା ଯେକୌଣସି ସ୍ଥିତିରେ ଏହାକୁ
  `extra_usage` ଭାବେ ସମାପ୍ତ କରେ, କାରଣ ପେଡ୍ ଓଭରେଜ୍ ଏବେ ସୀମାକୁ କଭର୍ କରେ) ଲେନ୍କୁ ସମାପ୍ତ କରେ; ତା’ପରେ
  ପ୍ରତିକ୍ରିୟାଟି ସାଧାରଣ କୁଲ୍ଡାଉନ୍ ପଥକୁ ଯାଏ। `budget_exhausted` ଘୋଷିତ ବଜେଟ୍ ରିସେଟ୍ ପର୍ଯ୍ୟନ୍ତ
  (≤ 8 ଦିନ) ମନେ ରଖାଯାଏ।
- ସୀମା ଯାଞ୍ଚଟି ଏକ୍ସିକ୍ୟୁଟର୍ର ନିଜସ୍ୱ 400-ଚାଳିତ ଆନ୍ତଃ-ପ୍ରୟାସ ପୁନଃଚେଷ୍ଟାଗୁଡ଼ିକ ପରେ ଚାଲେ (କଣ୍ଟେକ୍ସ୍ଟ
  ସମ୍ପାଦନା, ଥିଙ୍କିଂ/ଏଫର୍ଟ କ୍ଲାମ୍ପ, ପାରାମିଟର୍ ସ୍ୱୟଂ-ଶିକ୍ଷଣ), ତେଣୁ କେବଳ ସେହି ପୁନଃଚେଷ୍ଟାଗୁଡ଼ିକ ମଧ୍ୟରୁ
  ଗୋଟିଏରେ ଦୃଶ୍ୟମାନ ହେଉଥିବା ସୀମା 429 ମଧ୍ୟ କୁଲ୍ଡାଉନ୍ ପଥକୁ ପହଞ୍ଚିବା ପରିବର୍ତ୍ତେ ଅଟକାଯାଏ।
- ପ୍ରତ୍ୟେକ ସଂଯୋଗ ପାଇଁ ସ୍ଥିତି ଇନ୍-ମେମୋରି ରହେ (ପୁନଃଆରମ୍ଭ କଲେ ପୁଣି ଗ୍ରହଣ କରିବା ପାଇଁ ଗୋଟିଏ ଅତିରିକ୍ତ ସୀମା 429 ଲାଗେ)।

**ସେସନ୍-ସୀମା ରିସେଟ୍** (`autoLimitReset`, ଉଭୟ ସକ୍ରିୟ ଥିଲେ ଲେନ୍ ପୂର୍ବରୁ ଚେଷ୍ଟା କରାଯାଏ):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  ବ୍ଲକ୍; `arm: "reset"` ଏବଂ `available: true` ଥିଲେ,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` ସହିତ
  `{ "program": "juniper_tide" }` (`providerSpecificData.organizationUUID`ରୁ ସଂଗଠନ UUID, ବୁଟ୍ଷ୍ଟ୍ରାପ୍ ଫଲ୍ବ୍ୟାକ୍)।
- `result: reset|not_limited` → ଅନୁରୋଧକୁ ପୂର୍ଣ୍ଣ ବେଗରେ ପୁନଃଚେଷ୍ଟା କରାଯାଏ (କୌଣସି ସ୍ଲୋ ହେଡର୍ ନାହିଁ)।
  `already_used` / `not_offered` `next_available_at`କୁ ସ୍ମୃତିବଦ୍ଧ କରେ (ଡିଫଲ୍ଟ ଏକ ସପ୍ତାହ); ଯେକୌଣସି
  ବିଫଳତା 15 ମିନିଟ୍ ପାଇଁ ବ୍ୟାକଅଫ୍ କରେ। ରିସେଟ୍ ସପ୍ତାହକୁ ଥରେ ହୁଏ ଏବଂ ତଥାପି ସାପ୍ତାହିକ ସୀମାରେ ଗଣାଯାଏ।

ରିଗ୍ରେସନ୍ ସୁରକ୍ଷାଗୁଡ଼ିକ: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`।

### ସେସନ୍ ଆଫିନିଟି (#7274)

**ପରିସର:** **ଯେକୌଣସି** ପ୍ରଦାନକାରୀ ପାଇଁ, ଗୋଟିଏ କ୍ଲାଏଣ୍ଟ ସେସନ୍ (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` ହେଡର୍) ଗୋଟିଏ ସଂଯୋଗ ସହିତ ପିନ୍ କରାଯାଏ।

**ଉଦ୍ଦେଶ୍ୟ:** ଅନୁରୋଧଗୁଡ଼ିକ ମଧ୍ୟରେ ଏକ ବହୁ-ଟର୍ନ ଏଜେଣ୍ଟକୁ (Claude Code, aider, କଷ୍ଟମ୍ ଏଜେଣ୍ଟଗୁଡ଼ିକ) ସମାନ ଆକାଉଣ୍ଟରେ ରଖିବା, ଯାହା ଆକାଉଣ୍ଟଗୁଡ଼ିକ ମଧ୍ୟରେ ପ୍ରସଙ୍ଗ ହାନି ଏବଂ ପ୍ରତି-ଆକାଉଣ୍ଟ ସେସନ୍ ସ୍ଥିତି ଥିବା ପ୍ରଦାନକାରୀମାନଙ୍କରେ ବାରମ୍ବାର କୋଲ୍ଡ-ଷ୍ଟାର୍ଟ 429ଗୁଡ଼ିକୁ ହ୍ରାସ କରେ।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- TTL ନିର୍ଦ୍ଧାରଣ: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- ପିନ୍ ଚୟନ/ସୃଷ୍ଟି: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- ହେଡର୍ ନିଷ୍କାସନ (ସାଧାରଣ, ଯେକୌଣସି ପ୍ରଦାନକାରୀ): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- ସ୍ଥାୟୀ ଭାବେ ସଂରକ୍ଷିତ ପିନ୍ ଟେବୁଲ୍: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- ସେଟିଂ: `sessionAffinityTtlMs` (msରେ ଗ୍ଲୋବାଲ୍ TTL, `0` ନିଷ୍କ୍ରିୟ କରେ) — `src/lib/db/settings.ts`। ମାଇଗ୍ରେସନ୍ `124_generic_session_affinity_ttl.sql` ଦ୍ୱାରା କେବଳ Codex ପାଇଁ ଥିବା `codexSessionAffinityTtlMs`ରୁ ଏହାର ନାମ ପରିବର୍ତ୍ତନ କରାଯାଇଛି, ଯାହା ପୂର୍ବରୁ କନଫିଗର୍ କରାଯାଇଥିବା ଯେକୌଣସି Codex TTLକୁ ନୂତନ ଡିଫଲ୍ଟ ଭାବେ ସ୍ଥାନାନ୍ତର କରେ।

#7274 ପୂର୍ବରୁ, `resolveSessionAffinityTtlMs()` `codex` ବ୍ୟତୀତ ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ପାଇଁ ତୁରନ୍ତ `0` ଫେରାଉଥିଲା, ତେଣୁ ପିନିଂ ବ୍ୟବସ୍ଥା ଏବଂ ହେଡର୍ ନିଷ୍କାସନ ପୂର୍ବରୁ ପ୍ରଦାନକାରୀ-ନିରପେକ୍ଷ ହୋଇଥିଲେ ମଧ୍ୟ TTL ସେଟିଂ (ଏବଂ ସେସନ୍ ହେଡର୍ଗୁଡ଼ିକ) ଅନ୍ୟ କୌଣସି ସ୍ଥାନରେ ପ୍ରଭାବ ପକାଉ ନଥିଲା। ସମାଧାନଟି ସେହି ଆଗୁଆ-ରିଟର୍ନକୁ ହଟାଇଛି; TTLକୁ ଗ୍ଲୋବାଲ୍ ଭାବେ `0`ଠାରୁ ଅଧିକ ସେଟ୍ କରାଯିବା ପରେ ଏହା ଏବେ ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ପାଇଁ ସମାନ ଭାବେ ପ୍ରୟୋଗ ହୁଏ।

ତିନୋଟି ସେସନ୍-ଆଫିନିଟି ହେଡର୍ କେବେ ମଧ୍ୟ ଅପଷ୍ଟ୍ରିମ୍କୁ ଫରୱାର୍ଡ କରାଯାଏ ନାହିଁ — ଏକ୍ଜିକ୍ୟୁଟର୍ଗୁଡ଼ିକ କ୍ଲାଏଣ୍ଟ ହେଡର୍ଗୁଡ଼ିକୁ ପାସ୍ କରିବା ପରିବର୍ତ୍ତେ ନିଜ ଅପଷ୍ଟ୍ରିମ୍ ହେଡର୍ଗୁଡ଼ିକୁ ଆରମ୍ଭରୁ ନିର୍ମାଣ କରନ୍ତି, ତେଣୁ ଏହା କେବଳ ଏକ ଆଭ୍ୟନ୍ତରୀଣ ସହସମ୍ବନ୍ଧ ID ଭାବେ ରହେ।

### ଏକାଧିକାରୀ ପରିଚାଳିତ ସେସନ୍ ସଂଯୋଗ ଲିଜ୍

**ପରିସର:** ଗୋଟିଏ ସକ୍ରିୟ ପରିଚାଳିତ HTTP କ୍ଲାଏଣ୍ଟ/ସେସନ୍ ଗୋଟିଏ ଯୋଗ୍ୟ OmniRoute ସଂଯୋଗର ମାଲିକ ହୁଏ।

**ଉଦ୍ଦେଶ୍ୟ:** ଅନୁରୋଧଗୁଡ଼ିକ ମଧ୍ୟରେ ଏକ କଠୋର ରାଉଟିଂ
ସୀମା ଆବଶ୍ୟକ କରୁଥିବା କ୍ଲାଏଣ୍ଟମାନଙ୍କୁ ସ୍ଥାୟୀ ଏକାଧିକାରୀ ସଂଯୋଗ ମାଲିକାନା ପ୍ରଦାନ କରିବା। ଏହା ସେସନ୍ ଆଫିନିଟିଠାରୁ ଭିନ୍ନ, ଯାହା ଏକ ନମନୀୟ ନିରନ୍ତରତା ପସନ୍ଦ:
ଏକ ଏକାଧିକାରୀ ଲିଜ୍ SQLiteରେ ଜୀବନଚକ୍ର ସ୍ଥିତିକୁ ସ୍ଥାୟୀ କରେ, ଗ୍ଲୋବାଲ୍ ସକ୍ରିୟ-ମାଲିକ ଏବଂ
ସକ୍ରିୟ-ସଂଯୋଗର ଅନନ୍ୟତା ବାଧ୍ୟତାମୂଳକ କରେ, ଏବଂ ପ୍ରଦାନକାରୀଙ୍କୁ ଡିସ୍ପାଚ୍ କରିବା ପୂର୍ବରୁ ଏକ ପୁରୁଣା ଜେନେରେସନ୍କୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କରେ।

ଏହି ବୈଶିଷ୍ଟ୍ୟଟି ପ୍ରତ୍ୟେକ API କି ପାଇଁ ଅପ୍ଟ-ଇନ୍ ଅଟେ। ଏକ ପରିଚାଳିତ କି ପାଖରେ `lease:exclusive` ସ୍କୋପ୍ ଏବଂ ଏକ
ସ୍ପଷ୍ଟ ଖାଲି-ନଥିବା `allowedConnections` ତାଲିକା ରହିବା ଆବଶ୍ୟକ। ଯେକୌଣସି HTTP କ୍ଲାଏଣ୍ଟ ଜୀବନଚକ୍ର ଏଣ୍ଡପଏଣ୍ଟ ବ୍ୟବହାର କରିପାରିବ; କୌଣସି
କ୍ଲାଏଣ୍ଟ ନାମ, ୟୁଜର୍-ଏଜେଣ୍ଟ, ପ୍ରଦାନକାରୀ, OAuth ପଦ୍ଧତି କିମ୍ବା ମଡେଲ୍ ଆବଶ୍ୟକ ନୁହେଁ। ଲିଜ୍ ଏକ ସଂଯୋଗର ମାଲିକ ହୁଏ,
କୌଣସି ମଡେଲ୍ର ନୁହେଁ, ତେଣୁ ସଂଯୋଗଟି ସାଧାରଣ ଭାବେ
ଯୋଗ୍ୟ ରହିଥିବା ପର୍ଯ୍ୟନ୍ତ ମଡେଲ୍ ପରିବର୍ତ୍ତନ ବାଇଣ୍ଡିଂକୁ ବଜାୟ ରଖେ। ସାଧାରଣ ମଡେଲ୍, କୋଟା, ସ୍ୱାସ୍ଥ୍ୟ, କୁଲ୍ଡାଉନ୍ ଏବଂ ଅନୁମତି-ତାଲିକା ନିୟମଗୁଡ଼ିକ ପ୍ରାଧିକୃତ ରହନ୍ତି ଏବଂ
ସମାନ ଜେନେରେସନ୍କୁ ଅନ୍ୟ ଏକ ଖାଲି ଯୋଗ୍ୟ ସଂଯୋଗକୁ ସ୍ଥାନାନ୍ତର କରିପାରନ୍ତି।

ଜୀବନଚକ୍ରଟି ହେଉଛି `POST /api/v1/session-leases`, ଯେଉଁଥିରେ JSON କାର୍ଯ୍ୟ `acquire`, `renew`, ଏବଂ `release` ରହିଛି।
ପରିଚାଳିତ ଇନଫରେନ୍ସ ଅନୁରୋଧଗୁଡ଼ିକ ଅସ୍ୱଚ୍ଛ `X-OmniRoute-Lease-Owner` ମୂଲ୍ୟ ଏବଂ ସଠିକ୍
`X-OmniRoute-Lease-Generation` ଉପସ୍ଥାପନ କରନ୍ତି। ମାଲିକ `vlo_` ପରେ 43ଟି base64url ଅକ୍ଷର ବ୍ୟବହାର କରେ; କେବଳ
ଏହାର SHA-256 ହ୍ୟାଶ୍ ସଂରକ୍ଷିତ ହୁଏ। ପ୍ରତ୍ୟେକ ଅନ୍ତିମ ଡିସ୍ପାଚ୍ ସୀମା ପ୍ରମାଣିତ API କି ID ଏବଂ
ସକ୍ରିୟ ସଂଯୋଗ IDକୁ ମଧ୍ୟ ବାଇଣ୍ଡ କରେ। ଲିଜ୍ ନିୟନ୍ତ୍ରଣ ହେଡର୍ଗୁଡ଼ିକୁ ଲଗ୍, ସଂରକ୍ଷିତ ଅନୁରୋଧ ସ୍ନାପ୍ଶଟ୍ ଏବଂ
ଅପଷ୍ଟ୍ରିମ୍ ଏକ୍ଜିକ୍ୟୁଟର୍ ହେଡର୍ଗୁଡ଼ିକରୁ ହଟାଯାଏ।

ଯଦି ସାଧାରଣ ରାଉଟିଂରେ ଯୋଗ୍ୟ ପରିଚାଳିତ ପ୍ରାର୍ଥୀ ଅଛନ୍ତି, କିନ୍ତୁ ପ୍ରତ୍ୟେକ ଖାଲି ପ୍ରାର୍ଥୀ ଏକ
ବିଦେଶୀ ସକ୍ରିୟ ଲିଜ୍ର ଅଧୀନରେ ଅଛନ୍ତି, ତେବେ OmniRoute HTTP `429`, ଲିଜ୍-କ୍ଷମତା-ଅନୁପଲବ୍ଧ କୋଡ୍, ଏକ
କ୍ଷମତା-ପାଇଁ-ଅପେକ୍ଷା ସ୍ଥିତି, ଏବଂ ସବୁଠାରୁ ଶୀଘ୍ର ସମ୍ପର୍କିତ ସମାପ୍ତିରୁ ନିର୍ଦ୍ଧାରିତ ଏକ ସୀମିତ `Retry-After` ଫେରାଏ।
ସାଧାରଣ ଖାଲି ଯୋଗ୍ୟତା ଲିଜ୍ ବିବାଦ ନୁହେଁ ଏବଂ ଏହାର ବିଦ୍ୟମାନ ରାଉଟିଂ ତ୍ରୁଟି ଅର୍ଥବିଜ୍ଞାନକୁ ବଜାୟ ରଖେ।

ସମ୍ପର୍କିତ ବ୍ୟବସ୍ଥାଗୁଡ଼ିକ ପୃଥକ୍ ରହେ:

- OAuth ସେସନ୍ ଅଧିବାସ ହେଉଛି OAuth ଆକାଉଣ୍ଟଗୁଡ଼ିକ ପାଇଁ ପ୍ରକ୍ରିୟା-ସ୍ଥାନୀୟ ନମନୀୟ ବଣ୍ଟନ।
- ଆକାଉଣ୍ଟ ସେମାଫୋର୍ଗୁଡ଼ିକ ଅନୁରୋଧ-ସମସାମୟିକତା ଅନୁମତି ପ୍ରଦାନ କରନ୍ତି ଏବଂ ଏକ ଅନୁରୋଧ ସମ୍ପୂର୍ଣ୍ଣ ହେଲେ ସମାପ୍ତ ହୁଅନ୍ତି।
- ଏକାଧିକାରୀ ପରିଚାଳିତ ସେସନ୍ ଲିଜ୍ଗୁଡ଼ିକ ଏକ ଜେନେରେସନ୍ ସୀମା ସହିତ ସ୍ଥାୟୀ ଜୀବନଚକ୍ର ମାଲିକାନା ଅଟେ।

---

## 3. ମଡେଲ୍ ଲକ୍ଆଉଟ୍

**ପରିସର:** ପ୍ରଦାତା + ସଂଯୋଗ + ମଡେଲ୍ ତ୍ରୟୀ।

**ସ୍ଥିତି ଅନୁଯାୟୀ କୀ ପରିସର:** ବିଫଳ ସ୍ଥିତି ନିର୍ଦ୍ଧାରଣ କରେ ଯେ ଏକ ଲକ୍ଆଉଟ୍ କେଉଁ କୀରେ ଲେଖିବ
(`open-sse/services/accountFallback/exactModel.ts` ଭିତରେ `resolveLockoutScope()`):

- `429` / `403` / `402` — ଏକ କୋଟା କିମ୍ବା ଅଧିକାର ସଙ୍କେତ — **କୋଟା ପରିବାର**କୁ ଲକ୍ କରେ:
  codex ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ `codex` / `spark` ପରିସର (ସଂଯୋଗର ପ୍ରତ୍ୟେକ `gpt-5*` ମଡେଲ୍),
  ଅନ୍ୟ ପ୍ରଦାତାଙ୍କ ପାଇଁ `getQuotaScopedModelForProvider()`।
- `404` କେବଳ ମୂଳ ମଡେଲ୍କୁ ଲକ୍ କରେ (`getModelLockKey()` `not_found`କୁ ସଂକୁଚିତ କରେ)।
- ଅନ୍ୟ ଯେକୌଣସି ସ୍ଥିତି — `5xx` ପରିବହନ/ସର୍ଭର ବିଫଳତା ଏବଂ ଗୁଣବତ୍ତା ଯାଞ୍ଚରୁ
  OmniRoute ନିଜେ ସୃଷ୍ଟି କରିଥିବା `502` — କେବଳ **ସଠିକ୍**
  ପ୍ରଦାତା/ସଂଯୋଗ/ମଡେଲ୍ ଟ୍ୟୁପଲ୍କୁ ଲକ୍ କରେ। ଗୋଟିଏ ମଡେଲ୍ରେ ଏକ ତ୍ରୁଟିପୂର୍ଣ୍ଣ ଷ୍ଟ୍ରିମ୍
  ଆକାଉଣ୍ଟର କୋଟା ବିଷୟରେ ପ୍ରମାଣ ନୁହେଁ; ଏହି ନିୟମ ପୂର୍ବରୁ
  `codex/gpt-5.6-luna`ର ଗୋଟିଏ ଖାଲି ପ୍ରତିକ୍ରିୟା ସେହି ସଂଯୋଗର ପ୍ରତ୍ୟେକ `gpt-5*`
  ମଡେଲ୍କୁ 2–30 ମିନିଟ୍ ପାଇଁ ରାଉଟିଂରୁ ହଟାଇ ଦେଉଥିଲା (କ୍ରମଶଃ ବୃଦ୍ଧି ପାଉଥିଲା),
  ଯେତେବେଳେ ତାହାର କୋଟା ଅକ୍ଷୁଣ୍ଣ ରହୁଥିଲା।
- କଲର୍ର ସ୍ପଷ୍ଟ `scope` ବିକଳ୍ପ ସର୍ବଦା ପ୍ରାଥମ୍ୟ ପାଏ (Antigravity `"exact"` ପଠାଏ)।

**ଉଦ୍ଦେଶ୍ୟ:** କେବଳ ଗୋଟିଏ ମଡେଲ୍ ଅନୁପଲବ୍ଧ କିମ୍ବା କୋଟା-ସୀମିତ ଥିବାବେଳେ ସମ୍ପୂର୍ଣ୍ଣ ସଂଯୋଗକୁ ଅକ୍ଷମ କରିବାରୁ ବଞ୍ଚିବା।

**ଉଦାହରଣ:**

- ପ୍ରତି-ମଡେଲ୍ କୋଟା ପ୍ରଦାତାଙ୍କ ଦ୍ୱାରା ଫେରାଯାଉଥିବା 429
- ଗୋଟିଏ ଅନୁପସ୍ଥିତ ମଡେଲ୍ ପାଇଁ ସ୍ଥାନୀୟ ପ୍ରଦାତାଙ୍କ ଦ୍ୱାରା ଫେରାଯାଉଥିବା 404
- ପ୍ରଦାତା-ନିର୍ଦ୍ଦିଷ୍ଟ ମୋଡ୍/ମଡେଲ୍ ଅନୁମତି ବିଫଳତା (ଯଥା, Grok ମୋଡ୍ଗୁଡ଼ିକ)

**କାର୍ଯ୍ୟାନ୍ୱୟନ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`।

### ମଡେଲ୍ କୁଲ୍ଡାଉନ୍ ଡ୍ୟାସ୍ବୋର୍ଡ (v3.8.0)

UI: ସେଟିଂସ୍ → ମଡେଲ୍ କୁଲ୍ଡାଉନ୍ଗୁଡ଼ିକ (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

ଏହି ବିବରଣୀ ସହ ସକ୍ରିୟ ଲକ୍ଆଉଟ୍ଗୁଡ଼ିକୁ ତାଲିକାଭୁକ୍ତ କରେ: ପ୍ରଦାତା, ସଂଯୋଗ, ମଡେଲ୍, କାରଣ, expiresAt। ଅପରେଟର୍ମାନେ କାର୍ଡରୁ ଏକ ମଡେଲ୍କୁ ହସ୍ତଚାଳିତ ଭାବେ ପୁନଃସକ୍ଷମ କରିପାରିବେ।

**REST API:**

- `GET /api/resilience/model-cooldowns` — ସକ୍ରିୟ ଲକ୍ଆଉଟ୍ଗୁଡ଼ିକୁ ତାଲିକାଭୁକ୍ତ କରେ
- `DELETE /api/resilience/model-cooldowns` — ହସ୍ତଚାଳିତ ପୁନଃସକ୍ଷମକରଣ। ବଡି: `{provider, connection, model}`। ପ୍ରାମାଣିକରଣ: ପରିଚାଳନା।

### ଲକ୍ଆଉଟ୍ ସେଟିଂସ୍ UI + ସଫଳତା-ହ୍ରାସ ପୁନରୁଦ୍ଧାର (v3.8.23)

ମଡେଲ୍ ଲକ୍ଆଉଟ୍ ସର୍ବଦା-ସକ୍ରିୟ ହାର୍ଡକୋଡେଡ୍ ଆଚରଣରୁ ନିଜସ୍ୱ ସେଟିଂସ୍ କାର୍ଡ ଏବଂ
ସ୍ୱୟଂ-ମରାମତିକାରୀ ପୁନରୁଦ୍ଧାର ପଥ ସହିତ ଏକ ସମ୍ପୂର୍ଣ୍ଣ ବିନ୍ୟାସଯୋଗ୍ୟ,
ଇଚ୍ଛାଧୀନ ବୈଶିଷ୍ଟ୍ୟରେ ପରିଣତ ହୋଇଛି।

**ସେଟିଂସ୍ କାର୍ଡ:** ସେଟିଂସ୍ → ମଡେଲ୍ ଲକ୍ଆଉଟ୍
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)।
ଏହା ଉପରୋକ୍ତ କେବଳ-ପଠନୀୟ `ModelCooldownsCard`ଠାରୁ **ଭିନ୍ନ** (ଯାହା କେବଳ
ସକ୍ରିୟ ଲକ୍ଆଉଟ୍ଗୁଡ଼ିକୁ _ତାଲିକାଭୁକ୍ତ_ କରେ) — ନୂଆ କାର୍ଡଟି _ପାରାମିଟର୍ଗୁଡ଼ିକୁ ବିନ୍ୟାସ କରେ_। ଡିଫଲ୍ଟଗୁଡ଼ିକ
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`)ରେ ରହିଛି:

| ସେଟିଂ                   | ଡିଫଲ୍ଟ                           | ଅର୍ଥ                                                                |
| ----------------------- | -------------------------------- | ------------------------------------------------------------------- |
| `enabled`               | `false`                          | ମାଷ୍ଟର୍ ଟଗଲ୍ — ମଡେଲ୍ ଲକ୍ଆଉଟ୍ **ଡିଫଲ୍ଟ ଭାବେ ବନ୍ଦ**।                  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | ମଡେଲ୍-ପରିସର ବିଫଳତା ଭାବେ ଗଣାଯାଉଥିବା ଅପ୍ଷ୍ଟ୍ରିମ୍ ସ୍ଥିତିଗୁଡ଼ିକ।        |
| `baseCooldownMs`        | `120_000` (120 s)                | ପ୍ରଥମ ବିଫଳତା ପାଇଁ ପ୍ରାରମ୍ଭିକ ଲକ୍ଆଉଟ୍ ଅବଧି।                          |
| `maxCooldownMs`         | `1_800_000` (30 min)             | ବୃଦ୍ଧି ପାଇଥିବା କୁଲ୍ଡାଉନ୍ର ସର୍ବୋଚ୍ଚ ସୀମା।                            |
| `maxBackoffSteps`       | `10`                             | ଏକ୍ସପୋନେନ୍ସିଆଲ୍-ବ୍ୟାକ୍ଅଫ୍ ବୃଦ୍ଧିର ସର୍ବାଧିକ ପଦକ୍ଷେପ।                 |
| `useExponentialBackoff` | `true`                           | ପୁନରାବୃତ୍ତ ବିଫଳତା କୁଲ୍ଡାଉନ୍କୁ ଏକ୍ସପୋନେନ୍ସିଆଲ୍ ଭାବେ ବଢ଼ାଇବ କି ନାହିଁ। |

ସେଟିଂସ୍ଗୁଡ଼ିକ ସାଧାରଣ ସେଟିଂସ୍ ଷ୍ଟୋର୍ ମାଧ୍ୟମରେ ସ୍ଥାୟୀ ରହେ ଏବଂ
ସ୍ଥିତିସ୍ଥାପକତା ସେଟିଂସ୍ ସ୍କିମା ମାଧ୍ୟମରେ ଯାଞ୍ଚ ହୁଏ; କାର୍ଡଟି `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` ସହିତ) ଏବଂ `maxBackoffSteps`କୁ ସୀମାବଦ୍ଧ କରେ।

**ସଫଳତା-ହ୍ରାସ ପୁନରୁଦ୍ଧାର:** ପୁନରୁଦ୍ଧାର **କେବଳ** ଟାଇମର୍ର ଅବଧି ସମାପ୍ତି ନୁହେଁ। ଏକ ସୁସ୍ଥ
ପ୍ରତିକ୍ରିୟା ମଡେଲ୍ର ବିଫଳତା ଗଣନାକୁ କ୍ରମଶଃ କମାଏ, ଯାହାଦ୍ୱାରା ୱିଣ୍ଡୋ ମଧ୍ୟରେ ପୁନରୁଦ୍ଧାର ହୋଇଥିବା
ମଡେଲ୍ ଆଉ ବୃଦ୍ଧି ପାଏ ନାହିଁ (ଏବଂ ସଫା ହୋଇଯାଏ), ତାହାର ଟାଇମର୍ ଶେଷ ହେବା ପୂର୍ବରୁ।
ଏକ ସଫଳ କମ୍ବୋ ଟାର୍ଗେଟ୍ରେ, `open-sse/services/combo.ts` `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`)କୁ କଲ୍ କରେ, ଯାହା ସଂରକ୍ଷିତ
`failureCount`କୁ **ଅଧା କରେ** (`Math.floor(failureCount / 2)`); ଏହା `0`ରେ ପହଞ୍ଚିଲେ ଲକ୍ଆଉଟ୍
ଏଣ୍ଟ୍ରି ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ଡିଲିଟ୍ ହୋଇଯାଏ। ପ୍ରତିପକ୍ଷ `recordModelLockoutFailure()`
ବୃଦ୍ଧି ୱିଣ୍ଡୋ ମଧ୍ୟରେ ବିଫଳତା ଘଟିଲେ ଗଣନାକୁ ବଢ଼ାଏ (ଏବଂ କୁଲ୍ଡାଉନ୍କୁ ବୃଦ୍ଧି କରେ)।
ଏହି ସଫଳତା-ହ୍ରାସ ସାଧାରଣ ଟାଇମର୍ ଅବଧି ସମାପ୍ତିର ଅତିରିକ୍ତ — ଯେକୌଣସି ପଥ
ଏକ ମଡେଲ୍କୁ ପୁନଃସକ୍ଷମ କରିପାରେ।

**ସ୍ଥିତି:** ଲକ୍ଆଉଟ୍ଗୁଡ଼ିକ **ଇନ୍-ମେମୋରି**ରେ (`provider:connectionId:model` ଦ୍ୱାରା କୀ ହୋଇଥିବା
`ModelLockoutEntry`ର ପ୍ରତି-ପ୍ରକ୍ରିୟା `Map`ଗୁଡ଼ିକ, ସଠିକ୍-ପରିସର ଲକ୍ଗୁଡ଼ିକ
`provider:connectionId:exact:model` ଦ୍ୱାରା କୀ ହୋଇଥାଏ) ରଖାଯାଏ, DBରେ ସ୍ଥାୟୀ ଭାବେ
ସଂରକ୍ଷିତ ହୁଏ ନାହିଁ — ପୁନଃଆରମ୍ଭ ହେଲେ ସେଗୁଡ଼ିକ ହଜିଯାଏ। _ସେଟିଂସ୍ଗୁଡ଼ିକ_ ସ୍ଥାୟୀ ଭାବେ ସଂରକ୍ଷିତ ହୁଏ;
ସକ୍ରିୟ ଲକ୍ଆଉଟ୍ _ସ୍ଥିତି_ ଅସ୍ଥାୟୀ।

---

## 4. କୋଟା-ସେୟାର ସମସାମୟିକତା ନିୟନ୍ତ୍ରଣ (v3.8.36)

ସବ୍ସକ୍ରିପ୍ସନ୍ ଆକାଉଣ୍ଟଗୁଡ଼ିକ (GLM, MiniMax ଇତ୍ୟାଦି) ପ୍ରାୟତଃ କେବଳ ~1–3ଟି ସମସାମୟିକ
ଅନୁରୋଧ ଗ୍ରହଣ କରନ୍ତି; ଏହି ସୀମା ଅତିକ୍ରମ କଲେ 429 ଏବଂ କୁଲ୍ଡାଉନ୍ ସକ୍ରିୟ ହୁଏ। ଏହି ସମସ୍ୟା
**କୋଟା-ସେୟାର** (`qtSd/…`) କମ୍ବୋଗୁଡ଼ିକରେ ଅଧିକ ତୀବ୍ର, ଯେଉଁଠାରେ ଅନେକ API କି
ଗୋଟିଏ ଅପ୍ଷ୍ଟ୍ରିମ୍ ଆକାଉଣ୍ଟ ସେୟାର କରନ୍ତି। ତିନୋଟି ସ୍ତର ଏକ ସେୟାର୍ଡ ଆକାଉଣ୍ଟକୁ
ଅତ୍ୟଧିକ ଅନୁରୋଧରେ ପ୍ଲାବିତ ହେବାରୁ ରକ୍ଷା କରେ।

### ପ୍ରତି-କନେକ୍ସନ୍ ସମସାମୟିକତା ସୀମା (`max_concurrent`)

ପ୍ରତ୍ୟେକ ପ୍ରଦାତା କନେକ୍ସନ୍ ଗୋଟିଏ `max_concurrent` ସର୍ବୋଚ୍ଚ ସୀମା ଘୋଷଣା କରିପାରେ
(`provider_connections.max_concurrent`, ଯାହା କନେକ୍ସନ୍ ମୋଡାଲ୍ / API / DBରେ ସେଟ୍ କରାଯାଏ)।
କୌଣସି ସୀମା ନ ରଖିବା ପାଇଁ ଏହାକୁ ଖାଲି ଛାଡ଼ନ୍ତୁ। ନିମ୍ନର ସିରିଆଲାଇଜେସନ୍ ସ୍ତରକୁ
ନିୟନ୍ତ୍ରଣ କରୁଥିବା ଏହା ହେଉଛି ଏକମାତ୍ର ସେଟିଂ — ଏହାକୁ ଆକାଉଣ୍ଟର ପ୍ରକୃତ
ସମସାମୟିକତା ଅନୁଯାୟୀ ସେଟ୍ କରନ୍ତୁ (ଯଥା GLM ~1, MiniMax ~2)।

### କୋଟା-ସେୟାର ଅନୁରୋଧ ସିରିଆଲାଇଜେସନ୍

ଯେତେବେଳେ ଗୋଟିଏ କୋଟା-ସେୟାର ଡିସ୍ପ୍ୟାଚ୍ ଧନାତ୍ମକ `max_concurrent` ଘୋଷଣା କରିଥିବା
କୌଣସି କନେକ୍ସନ୍କୁ ଲକ୍ଷ୍ୟ କରେ, ସେହି **ଆକାଉଣ୍ଟ** ପ୍ରତି ଥିବା ସମସାମୟିକ ଅନୁରୋଧଗୁଡ଼ିକୁ
ପ୍ରତି-କନେକ୍ସନ୍ ସେମାଫୋର୍ (କି `qsconn:<connectionId>`) ମାଧ୍ୟମରେ କ୍ରମିକ କରାଯାଏ:
ଅତିରିକ୍ତ ଅନୁରୋଧଗୁଡ଼ିକ ଆକାଉଣ୍ଟକୁ ପ୍ଲାବିତ କରିବା ପରିବର୍ତ୍ତେ **କ୍ୟୁରେ ଅପେକ୍ଷା କରନ୍ତି**।
ଏହା **ଫେଲ୍-ଓପେନ୍** — ସ୍ୟାଚୁରେଟେଡ୍ କ୍ୟୁ କିମ୍ବା ଟାଇମ୍ଆଉଟ୍ ହେଲେ ମଧ୍ୟ, କୌଣସି
ଡିସ୍ପ୍ୟାଚ୍ଯୋଗ୍ୟ ଅନୁରୋଧକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ ନକରି, ସ୍ଲଟ୍ ବିନା ଆଗକୁ ବଢ଼େ।
**ସେଟିଂସ୍ → ରେଜିଲିଏନ୍ସ → କୋଟା-ସେୟାର ପ୍ରତି-କନେକ୍ସନ୍ ସମସାମୟିକତା**ରେ ଏହାକୁ
ଟଗଲ୍ କରନ୍ତୁ (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ଡିଫଲ୍ଟ ଭାବେ
ଚାଲୁ)। `max_concurrent` ସୀମା ବିନା ଆଚରଣ ଅପରିବର୍ତ୍ତିତ ରହେ।

> କୋଟା-ସେୟାର ରାଉଟିଂ ଗେଟ୍ (`selectQuotaShareTarget`, DRR + P2C) ନିଜେ
> ଫେଲ୍-ଓପେନ୍ ଏବଂ ସୀମାରେ ପହଞ୍ଚିଥିବା କନେକ୍ସନ୍କୁ କେବଳ _କମ୍ ପ୍ରାଥମିକତା_ ଦିଏ —
> ଏକକ-କନେକ୍ସନ୍ ପୁଲ୍ରେ ଏହା କଠୋର ସୀମା ଲାଗୁ କରିପାରେ ନାହିଁ, ତେଣୁ ଏହି ସେମାଫୋର୍
> ପ୍ରକୃତରେ ଅନୁରୋଧର ପ୍ଲାବନକୁ ନିୟନ୍ତ୍ରଣ କରେ।

### କମ୍ବୋ କୁଲ୍ଡାଉନ୍-ସଚେତନ ପୁନଃପ୍ରୟାସ

ପ୍ରତ୍ୟେକ କମ୍ବୋ କୌଶଳ ପାଇଁ (ସକ୍ରିୟ ଥିବାବେଳେ), SHORT ଅସ୍ଥାୟୀ କୁଲ୍ଡାଉନ୍ ଯୋଗୁଁ
429 ନିଶ୍ଚିତ କରିବାକୁ ଥିବା ଅନୁରୋଧ 429 ଫେରାଇବା ପରିବର୍ତ୍ତେ ଏହା ସମାପ୍ତ ହେବା ପର୍ଯ୍ୟନ୍ତ
ଅପେକ୍ଷା କରେ ଏବଂ ପୁନଃ ଡିସ୍ପ୍ୟାଚ୍ ହୁଏ — ଏହା ବହୁ-ମଡେଲ୍ କମ୍ବୋଗୁଡ଼ିକରେ
Gemini-ଶ୍ରେଣୀର TPM/RPM ୱିଣ୍ଡୋଗୁଡ଼ିକୁ (~60s retry-after) ସମ୍ଭାଳେ, ଯଥା 2-ମଡେଲ୍
କମ୍ବୋର ଉଭୟ ଲକ୍ଷ୍ୟ ପ୍ରତି-ମଡେଲ୍ ହାର ସୀମାରେ ପହଞ୍ଚିବା। ଏହା
**ସେଟିଂସ୍ → ରେଜିଲିଏନ୍ସ**ର `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) ଦ୍ୱାରା ସୀମିତ। ଏହା `quota_exhausted` (ମଧ୍ୟରାତ୍ରି ପର୍ଯ୍ୟନ୍ତ ଲକ୍)
କିମ୍ବା ପ୍ରମାଣୀକରଣ/ନମିଳିବା କାରଣରେ କେବେ ମଧ୍ୟ ଅପେକ୍ଷା କରେ ନାହିଁ।

---

## 5. ଅନୁରୋଧ କ୍ୟୁ ଭର୍ତ୍ତି ନିୟନ୍ତ୍ରଣ (v3.8.49 · issue #6593)

**ପରିସର**: ସ୍ଥାନୀୟ ପ୍ରତି-provider+connection ହାର-ସୀମା କ୍ୟୁ (`open-sse/services/rateLimitManager.ts`,
Bottleneck ଦ୍ୱାରା ସମର୍ଥିତ), ଉପରୋକ୍ତ ତିନୋଟି ବ୍ୟବସ୍ଥାର ଗୋଟିଏ ସ୍ତର ତଳେ।

**`maxWaitMs` କ୍ୟୁ ଅପେକ୍ଷାକୁ ସୀମିତ କରେ; `executionMaxWaitMs` କାର୍ଯ୍ୟନିଷ୍ପାଦନକୁ ସୀମିତ କରେ।**
ଏହି ଦୁଇଟିକୁ ଜାଣିଶୁଣି ପୃଥକ୍ ରଖାଯାଇଛି, ଏବଂ କୌଣସିଟି ଅନ୍ୟଟିକୁ ପ୍ରଭାବିତ କରେ ନାହିଁ।

`resilienceSettings.requestQueue.maxWaitMs` ହେଉଛି **କ୍ୟୁ-ଅପେକ୍ଷା ବଜେଟ୍**: ଏହା
ଗୋଟିଏ provider ସ୍ଲଟ୍ ପାଇଁ ଅପେକ୍ଷା କରିବା ଏବଂ ତା’ପରେ QUEUED ଅବସ୍ଥାରେ ରହିବାକୁ
ଅନ୍ତର୍ଭୁକ୍ତ କରେ, ଏବଂ job-ଟି QUEUED ଛାଡ଼ି କାର୍ଯ୍ୟନିଷ୍ପାଦନ ଆରମ୍ଭ କରିବା
ମୁହୂର୍ତ୍ତରେ ଏହାର timer ସଫା କରାଯାଏ
(`rateLimitManager.ts`, `wrappedFn`)। ଏହାକୁ ଅତିକ୍ରମ କରୁଥିବା ଅନୁରୋଧ
କେବେବି upstream ପର୍ଯ୍ୟନ୍ତ ପହଞ୍ଚେ ନାହିଁ। ଡିଫଲ୍ଟ 30000ms, ଯାହା
`src/lib/resilience/settings.ts` ରେ `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
ଦ୍ୱାରା ଯୋଗାଇ ଦିଆଯାଏ ଏବଂ
`tests/unit/ratelimit-admission-control-6593.test.ts` ଦ୍ୱାରା ସ୍ଥିର କରାଯାଇଛି,
ତେଣୁ ଏଥିରେ ପରିବର୍ତ୍ତନ ହେଲେ ଏହି ଅନୁଚ୍ଛେଦଟି ନିରବରେ ପୁରୁଣା ହୋଇ ରହିଯିବା
ପରିବର୍ତ୍ତେ ସେହି test ବିଫଳ ହେବ।

`resilienceSettings.requestQueue.executionMaxWaitMs` ହେଉଛି Bottleneck
job `expiration` ଭାବରେ ଯାହା ଗ୍ରହଣ କରେ, ଯାହାର timer କେବଳ dispatch ପରେ
ଆରମ୍ଭ ହୁଏ। ନିଜସ୍ୱ upstream timeout ନଥିବା executor-ମାନଙ୍କ ପାଇଁ ଏହା
ଏକ ଶେଷ ସୁରକ୍ଷା ବ୍ୟବସ୍ଥା, ଏବଂ executor-ର ନିଜ fetch-start timeout ଅଧିକ
ଦୀର୍ଘ ହେଲେ ଏହାକୁ ସେହି ମୂଲ୍ୟ ପର୍ଯ୍ୟନ୍ତ ବଢ଼ାଯାଏ, ଯାହାଦ୍ୱାରା ଏହା ଏକ
ସୁସ୍ଥ in-flight response-କୁ ମଝିରେ ବନ୍ଦ କରିପାରିବ ନାହିଁ। ଡିଫଲ୍ଟ
600000ms (10 ମିନିଟ୍)।

କ୍ୟୁ ବଜେଟ୍କୁ `expiration` ମଧ୍ୟରେ ଦେବା କାରଣରୁ ପୂର୍ବରୁ
non-incremental gateway-ଗୁଡ଼ିକ mid-flight ରେ ବନ୍ଦ ହୋଇଯାଉଥିଲେ — ପ୍ରଥମ
byte ଆସିବା ପୂର୍ବରୁ ସେଗୁଡ଼ିକ ଯଥାର୍ଥ ଭାବେ କିଛି ମିନିଟ୍ ଧରି ଚାଲିଥାଏ —
ଏବଂ ଏହି କାରଣରୁ expiration-କୁ `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) ଭାବରେ ଦେଖାଯାଏ, ଯେତେବେଳେ
କ୍ୟୁ ବଜେଟ୍ କ୍ୟୁ-timeout code ବହନ କରେ। `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) କିମ୍ବା dashboard
(**Settings → Resilience**) ମାଧ୍ୟମରେ ଉଭୟରୁ ଯେକୌଣସିଟି override କରନ୍ତୁ।
normalise କରାଯିବା ସମୟରେ ଉଭୟକୁ 1ms–24h ସୀମା ମଧ୍ୟରେ ରଖାଯାଏ।

**ଉଭୟ ପାଇଁ ପ୍ରାଥମ୍ୟ କ୍ରମ:** env var କେବଳ _ଡିଫଲ୍ଟ_ ଯୋଗାଏ।
`resilienceSettings.requestQueue` ରେ ସ୍ଥାୟୀ ଭାବେ ସଂରକ୍ଷିତ ମୂଲ୍ୟ
(dashboard / API patch, `key_value` ରେ ସଂରକ୍ଷିତ) ଏହାଠାରୁ ପ୍ରାଥମ୍ୟ
ପାଏ, ଏବଂ ପ୍ରତି-connection `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` ତାହାଠାରୁ ମଧ୍ୟ ପ୍ରାଥମ୍ୟ ପାଏ। ତେଣୁ ପୂର୍ବରୁ
ସ୍ଥାୟୀ ଭାବେ ସଂରକ୍ଷିତ ମୂଲ୍ୟ ଥିବା deployment-ରେ env var ସେଟ୍ କଲେ
କିଛି ବଦଳେ ନାହିଁ — ତାହା ପରିବର୍ତ୍ତେ ସ୍ଥାୟୀ ଭାବେ ସଂରକ୍ଷିତ setting-ଟିକୁ
ସଫା କିମ୍ବା ଅଦ୍ୟତନ କରନ୍ତୁ।

କ୍ୟୁରେ ରହିବା ସମୟ `maxWaitMs` ଦ୍ୱାରା ସୀମିତ; ନିମ୍ନର `maxQueueDepth`
ଏକ ସମୟରେ କେତେ caller କ୍ୟୁରେ ରହିପାରିବେ ତାହାକୁ ସୀମିତ କରେ।

**`maxQueueDepth` — ଇଚ୍ଛାଧୀନ ଭର୍ତ୍ତି ସୀମା (ନୂଆ)।** `resilienceSettings.requestQueue.maxQueueDepth`
ଗୋଟିଏ provider+connection ପାଇଁ ଏକ ସମୟରେ କେତେ ଅନୁରୋଧ କ୍ୟୁରେ
(ଏପର୍ଯ୍ୟନ୍ତ dispatch ହୋଇନଥିବା) ରହିପାରିବ, ତାହାକୁ ସୀମିତ କରେ।
କ୍ୟୁରେ ପୂର୍ବରୁ `maxQueueDepth` ସଂଖ୍ୟକ ଅନୁରୋଧ ଥିଲେ, ଏକ ନୂଆ
ଅନୁରୋଧ `code: "RATE_LIMIT_QUEUE_FULL"` ଥିବା typed error ସହ ତୁରନ୍ତ
ପ୍ରତ୍ୟାଖ୍ୟାନ ହୁଏ, ଏହା କେବେବି `limiter.schedule()` ପର୍ଯ୍ୟନ୍ତ ପହଞ୍ଚିବା
**ପୂର୍ବରୁ** — ତେଣୁ ପ୍ରତ୍ୟାଖ୍ୟାନଟି କମ୍ ବ୍ୟୟସାଧ୍ୟ ଏବଂ ସେହି ଅନୁରୋଧ
ପାଇଁ କୌଣସି downstream prompt-compression / translation କାର୍ଯ୍ୟ ପୂର୍ବରୁ
ଘଟେ। ଡିଫଲ୍ଟ `0` = ଅକ୍ଷମ, ଯାହା ବର୍ତ୍ତମାନର ସୀମାହୀନ-କ୍ୟୁ ଆଚରଣକୁ
ବଜାୟ ରଖେ; ସୀମା 0–100000। `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) କିମ୍ବା
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch)
ମାଧ୍ୟମରେ override କରନ୍ତୁ।

ଭର୍ତ୍ତି ଯାଞ୍ଚଟି ନିଜେ ଏକ pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`),
ତେଣୁ ଏକ ବାସ୍ତବ Bottleneck limiter ବିନା ଏହାକୁ unit-test କରାଯାଇପାରିବ।

> #6593 ଆରମ୍ଭ କରିଥିବା RFC ଏକ `bypassCompressionOnRateLimit`
> flag ମଧ୍ୟ ପ୍ରସ୍ତାବ କରିଥିଲା। ଏହି repo-ର `open-sse/services/compression/`
> pipeline ହେଉଛି outbound LLM ଅନୁରୋଧରେ prompt/context compression
> (`chatCore.ts`, `resolveCompressionSettings`/`selectCompressionStrategy`
> block ନିକଟରେ), ସଂଶ୍ଳେଷିତ 429 body-ଗୁଡ଼ିକରେ HTTP response compression
> ନୁହେଁ — ଏକ ଆକ୍ଷରିକ bypass flag ପାଇଁ କୌଣସି ମେଳ ଖାଉଥିବା code path
> ନାହିଁ। ସେହି prompt-compression ପଦକ୍ଷେପଟି ବର୍ତ୍ତମାନ request pipeline-ରେ
> `withRateLimit()` **ପୂର୍ବରୁ** ମଧ୍ୟ ଚାଲେ, ତେଣୁ queue-full ପ୍ରତ୍ୟାଖ୍ୟାନରେ
> ଏହାକୁ ଏଡ଼ାଇବା ପାଇଁ କ୍ରମ ପରିବର୍ତ୍ତନ କରିବା ଏହି issue-ର ପରିସରଠାରୁ
> ପୃଥକ୍ ଏବଂ ବଡ଼ ପରିବର୍ତ୍ତନ; ଏହାକୁ ଏଠାରେ ଜାଣିଶୁଣି କାର୍ଯ୍ୟକାରୀ
> **କରାଯାଇନାହିଁ** ଏବଂ CPU ସଞ୍ଚୟର ଲାଭ କ୍ରମ ପରିବର୍ତ୍ତନର ବିପଦଠାରୁ
> ଅଧିକ ମୂଲ୍ୟବାନ ହେଲେ ଏହାକୁ ଏକ follow-up ଭାବେ ଛାଡ଼ି ଦିଆଯାଇଛି।

---

## 6. ଧୀର-ଷ୍ଟ୍ରିମ୍ ଥ୍ରୁପୁଟ୍ ୱାଚ୍ଡଗ୍ (#9709)

ଇଚ୍ଛାଧୀନ `resilienceSettings.streamRecovery.throughputWatchdog` ଗାର୍ଡ୍ ଏପରି ଏକ ଅପ୍ଷ୍ଟ୍ରିମ୍କୁ ଚିହ୍ନଟ କରେ, ଯାହା ଏବେ ମଧ୍ୟ ଚଙ୍କ୍ ପଠାଉଛି କିନ୍ତୁ କନ୍ଫିଗର୍ କରାଯାଇଥିବା ଉପଯୋଗୀ-ଆଉଟ୍ପୁଟ୍ ହାରଠାରୁ କମ୍ ହାରରେ ଆସିଷ୍ଟାଣ୍ଟ ଆଉଟ୍ପୁଟ୍ ଉତ୍ପାଦନ କରୁଛି। ଏହାକୁ ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ ନିଷ୍କ୍ରିୟତା ଟାଇମ୍ଆଉଟ୍ଠାରୁ ପୃଥକ୍ ରଖାଯାଇଛି: ହାର୍ଟବିଟ୍ ଏବଂ ମେଟାଡାଟା କୌଣସି ଟାଇମର୍କୁ ରିସେଟ୍ କରନ୍ତି ନାହିଁ ଏବଂ ସେଗୁଡ଼ିକୁ ଅଗ୍ରଗତି ଭାବେ ଗଣନା କରାଯାଏ ନାହିଁ। ଏହା ହାର୍ଡ୍ ଆଟେମ୍ପ୍ଟ ଡେଡ୍ଲାଇନ୍ (#9153) ଠାରୁ ମଧ୍ୟ ପୃଥକ୍, ଯାହା ଆଉଟ୍ପୁଟ୍ର ଗୁଣବତ୍ତା ନିର୍ବିଶେଷରେ ଏକ ସର୍ବାତ୍ମକ ସୁରକ୍ଷା ସୀମା ଭାବେ ରହିଥାଏ।

ୱାଚ୍ଡଗ୍ ଅବର୍ଟ୍ କରିପାରିବା ପୂର୍ବରୁ ଏକ ୱାର୍ମ୍-ଅପ୍ ଅବଧି ପରେ ଏକ ସମ୍ପୂର୍ଣ୍ଣ ରୋଲିଂ ୱିଣ୍ଡୋ ଆବଶ୍ୟକ କରେ। ଏହା Chat Completions ଏବଂ Responses API ଆଉଟ୍ପୁଟ୍ ଇଭେଣ୍ଟ୍ରୁ ଟେକ୍ସଟ୍ ଡେଲ୍ଟାଗୁଡ଼ିକୁ ଗଣନା କରେ (ଏକ ସତର୍କତାମୂଳକ UTF-8 ବାଇଟ୍ ପ୍ରକ୍ସି), କେବଳ ବ୍ୟବହାର-ସମ୍ବନ୍ଧୀୟ ଏବଂ ଖାଲି ଇଭେଣ୍ଟ୍ଗୁଡ଼ିକୁ ଅଣଦେଖା କରେ, ଏବଂ ଟୁଲ୍-କଲ୍ କିମ୍ବା ରିଜନିଂ ଇଭେଣ୍ଟ୍ଗୁଡ଼ିକ ଚାଲୁଥିବାବେଳେ ମୂଲ୍ୟାୟନ ସ୍ଥଗିତ ରଖେ। ଏହା ଡିଫଲ୍ଟ ଭାବେ ଅକ୍ଷମ ଥାଏ ଏବଂ `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` ଦ୍ୱାରା ସକ୍ଷମ କରାଯାଇପାରେ; ୱିଣ୍ଡୋ, ୱାର୍ମ୍-ଅପ୍, ସର୍ବନିମ୍ନ ହାର ଏବଂ ସର୍ବନିମ୍ନ ମାପଯୋଗ୍ୟ ଆଉଟ୍ପୁଟ୍ ସାଧାରଣ ରେଜିଲିଏନ୍ସ-ସେଟିଂସ୍ ନର୍ମାଲାଇଜେସନ୍ ସ୍ତର ଦ୍ୱାରା ସୀମିତ ହୋଇଥାଏ।

ସକ୍ଷମ ଥିବାବେଳେ, ୱାଚ୍ଡଗ୍ ଅବର୍ଟ୍ କେବଳ ସକ୍ରିୟ ଅପ୍ଷ୍ଟ୍ରିମ୍ ଆଟେମ୍ପ୍ଟ ଉପରେ ପ୍ରୟୋଗ କରାଯାଏ। କ୍ଲାଏଣ୍ଟ୍କୁ ଦୃଶ୍ୟମାନ କୌଣସି ବାଇଟ୍ ପଠାଯିବା ପୂର୍ବରୁ, ବିଦ୍ୟମାନ ସମାନ-ଆକାଉଣ୍ଟ ପ୍ରାରମ୍ଭିକ-ରିକଭରି ପଥ ଆଟେମ୍ପ୍ଟକୁ ପୁନଃ ଖୋଲିପାରେ। କମିଟ୍ ପରେ, ଷ୍ଟ୍ରିମ୍କୁ କେବେବି ଅନ୍ଧ ଭାବେ ପୁନଃଚାଳନ କରାଯାଏ ନାହିଁ; କେବଳ ବିଦ୍ୟମାନ ସୁରକ୍ଷିତ ମିଡ୍-ଷ୍ଟ୍ରିମ୍ କଣ୍ଟିନ୍ୟୁଏସନ୍ ଚୁକ୍ତି ଏକ ସଫିକ୍ସକୁ ଯୋଡ଼ିପାରେ। ଫାଇନାଲାଇଜେସନ୍ ଏକମାତ୍ର-କାର୍ଯ୍ୟନିଷ୍ପାଦନ ଭାବେ ରହେ, ତେଣୁ ବ୍ୟବହାର ହିସାବ ଏବଂ ସେମାଫୋର୍ ରିଲିଜ୍ର ପୁନରାବୃତ୍ତି ହୁଏ ନାହିଁ।

---

## 7. ଅପ୍ଷ୍ଟ୍ରିମ୍ ସ୍ଥିତିର ପୁନଃବିବୃତି (ଭୁଲ୍ ଭାବେ ଉଲ୍ଲେଖିତ କୋଟା ତ୍ରୁଟି)

**ପରିସର:** ଭୁଲ୍ HTTP ସ୍ଥିତି ସହିତ ଅସ୍ଥାୟୀ କୋଟା ଶେଷ ହୋଇଥିବା ସୂଚନା ଦେଉଥିବା ଗୋଟିଏ ଅପ୍ଷ୍ଟ୍ରିମ୍ ଗେଟ୍ୱେ।

**ଉଦ୍ଦେଶ୍ୟ:** ଶ୍ରେଣୀବିଭାଜନ ପୂର୍ବରୁ ଏକ ବିଭ୍ରାନ୍ତିକର ସ୍ଥିତିକୁ ସଂଶୋଧନ କରିବା, ଯାହାଦ୍ୱାରା ଡାଉନ୍ଷ୍ଟ୍ରିମ୍ ଉପଭୋକ୍ତାମାନେ (ଫଲ୍ବ୍ୟାକ୍ ଇଞ୍ଜିନ୍, କମ୍ବୋ ଏଗ୍ରିଗେସନ୍, କ୍ଲାଏଣ୍ଟ୍-ମୁଖୀ ପ୍ରତିକ୍ରିୟା) ବିଫଳତାର ପ୍ରକୃତ ପୁନଃଚେଷ୍ଟାଯୋଗ୍ୟ ସ୍ୱଭାବ ଦେଖିପାରିବେ।

କିଛି ଗେଟ୍ୱେ ଅସ୍ଥାୟୀ କୋଟା ଶେଷ ହେବାକୁ ଏକ ପୁନଃଚେଷ୍ଟା-ଅଯୋଗ୍ୟ HTTP ସ୍ଥିତି ଦ୍ୱାରା ସୂଚିତ କରନ୍ତି। `agentrouter.org` ମାନକ `429` ପରିବର୍ତ୍ତେ ଏକ ଚାଇନିଜ୍ ବଡି (`用户额度不足` / `额度不足`) ସହିତ `403` (କେବେକେବେ `400`) ଫେରାଏ। Claude Code ପରି କ୍ଲାଏଣ୍ଟ୍ଗୁଡ଼ିକ `403`କୁ ସ୍ଥାୟୀ ଭାବେ ବିବେଚନା କରି ସେସନ୍କୁ ଅବର୍ଟ୍ କରନ୍ତି, ଏବଂ ସଂଶୋଧନ ବିନା ଫଲ୍ବ୍ୟାକ୍ ଇଞ୍ଜିନ୍ ଏହାକୁ କୋଟା ଇଭେଣ୍ଟ୍ ପରିବର୍ତ୍ତେ `AUTH_ERROR` ଭାବେ ଶ୍ରେଣୀବଦ୍ଧ କରିବ।

**କାର୍ଯ୍ୟାନ୍ୱୟନ:**

- ରେଜିଷ୍ଟ୍ରି + ମ୍ୟାଚର୍: `open-sse/config/upstreamStatusRestatement.ts` — ପ୍ରତି ପ୍ରୋଭାଇଡର୍ ପାଇଁ ନିୟମଗୁଡ଼ିକର ଏକ ତାଲିକା (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), ଯାହାକୁ `applyStatusRestatement()` ମାଧ୍ୟମରେ ମେଳ କରାଯାଏ।
- କଲ୍ ସାଇଟ୍: `open-sse/handlers/chatCore.ts`ରେ ଥିବା `providerFailure:` ବ୍ଲକ୍ (ପ୍ରାୟ 3654 ନମ୍ବର ଧାଡ଼ିରେ), `parseUpstreamError()` ଏକ ତ୍ରୁଟି HTTP ସ୍ଥିତି (`!providerResponse.ok`) ସହିତ ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରତିକ୍ରିୟାକୁ ପାର୍ସ କରିବାର ଠିକ୍ ପରେ ଏବଂ କୌଣସି ଶ୍ରେଣୀବିଭାଜନ ଚାଲିବା ପୂର୍ବରୁ, ଯାହାଦ୍ୱାରା ପ୍ରତ୍ୟେକ ଡାଉନ୍ଷ୍ଟ୍ରିମ୍ ଉପଭୋକ୍ତା ସଂଶୋଧିତ ସ୍ଥିତିକୁ ଦେଖନ୍ତି। ଏକ `200` SSE ଷ୍ଟ୍ରିମ୍ରେ ଏମ୍ବେଡ୍ ହୋଇଥିବା ତ୍ରୁଟିଗୁଡ଼ିକ ଏକ ପୃଥକ୍, ପରବର୍ତ୍ତୀ ଷ୍ଟ୍ରିମ୍-ପାର୍ସିଂ ପଥ ଅନୁସରଣ କରନ୍ତି ଏବଂ ଆଜି **ଏହି ହୁକ୍ର ଅନ୍ତର୍ଭୁକ୍ତ ନୁହନ୍ତି** — ଏହା ଏକ ଜଣାଶୁଣା ସୀମାବଦ୍ଧତା, ଯାହା agentrouterର ଭୁଲ୍ ସ୍ଥିତି ପାଇଁ ଏପର୍ଯ୍ୟନ୍ତ ଆବଶ୍ୟକ ହୋଇନାହିଁ (କାରଣ ଏହା ଏକ ତ୍ରୁଟି HTTP ସ୍ଥିତି ଭାବେ ପ୍ରକାଶ ପାଏ)।
- ପୁନଃଚେଷ୍ଟା ଯୋଗ୍ୟତା: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`ରେ ଅଛି (`open-sse/services/combo/unavailableRetryGate.ts`), ତେଣୁ ପୁନଃବିବୃତ ତ୍ରୁଟିଟି ଏକ ନିଷ୍କ୍ରିୟ `403` ଭାବେ ପ୍ରକାଶ ପାଇବା ପରିବର୍ତ୍ତେ ଏକ ପ୍ରକୃତ ପୁନଃଚେଷ୍ଟା ୱିଣ୍ଡୋ ବହନ କରେ।
- ସିନ୍ଥେଟିକ୍ `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) କେବଳ ପୁନଃବିବୃତ ପ୍ରତିକ୍ରିୟାଟି **କ୍ଲାଏଣ୍ଟ୍**କୁ ଯାହା କୁହେ; ଏହା ସ୍ୱୟଂ କନେକ୍ସନ୍ର ଆଭ୍ୟନ୍ତରୀଣ କୁଲ୍ଡାଉନ୍/ଲକ୍ଆଉଟ୍ ଅବଧି ନୁହେଁ — ତାହା ପୁନଃବିବୃତ ତ୍ରୁଟିକୁ ପ୍ରକୃତରେ ପରିଚାଳନା କରୁଥିବା ବ୍ୟବସ୍ଥା ଦ୍ୱାରା ପୃଥକ୍ ଭାବେ ନିୟନ୍ତ୍ରିତ ହୁଏ (Connection Cooldownର କ୍ରମବର୍ଦ୍ଧିଷ୍ଣୁ ବ୍ୟାକ୍ଅଫ୍, §2, API-key ପ୍ରୋଭାଇଡର୍ମାନଙ୍କ ପାଇଁ ମୂଳ `3s`; କିମ୍ବା agentrouter ପରି ପ୍ରତି-ମଡେଲ୍-କୋଟା ପ୍ରୋଭାଇଡର୍ମାନଙ୍କ ପାଇଁ Model Lockout, §3)। କ୍ଲାଏଣ୍ଟ୍କୁ ବିଜ୍ଞାପିତ 60s ୱିଣ୍ଡୋଠାରୁ ପୂର୍ବରୁ ରାଉଟର୍ ଆଭ୍ୟନ୍ତରୀଣ ଭାବେ ପୁନଃଚେଷ୍ଟା ପାଇଁ ଯୋଗ୍ୟ ହୋଇପାରେ — ଏହା ଉଦ୍ଦେଶ୍ୟମୂଳକ ଅତିରିକ୍ତ ସୁଯୋଗ, କୌଣସି ବଗ୍ ନୁହେଁ।

ସ୍ଥାୟୀ ତ୍ରୁଟିଗୁଡ଼ିକ (agentrouterର `无权访问模型` — ଏହି ମଡେଲ୍କୁ ଆକ୍ସେସ୍ ନାହିଁ) କେବେବି ପୁନଃବିବୃତ ହୁଏ ନାହିଁ: `textMarkers` ମେଳ ଖାଇଲେ ମଧ୍ୟ `excludeMarkers` ନିୟମକୁ ଭିଟୋ କରେ, ତେଣୁ ତ୍ରୁଟିଟି ଏହାର ମୂଳ ସ୍ଥିତି ବଜାୟ ରଖେ ଏବଂ କିଛି ମଧ୍ୟ ଏହାକୁ ଅନନ୍ତକାଳ ପର୍ଯ୍ୟନ୍ତ ପୁନଃଚେଷ୍ଟା କରେ ନାହିଁ। ସମ୍ବନ୍ଧିତ ପ୍ରୋଭାଇଡର୍ ଶ୍ରେଣୀବିଭାଜନ ନିୟମ (`open-sse/config/providerErrorRules.ts`ରେ `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, ଘୋଷିତ `6h` ମୂଳ କୁଲ୍ଡାଉନ୍) ସାଧାରଣ apikey-ଶ୍ରେଣୀ `FORBIDDEN` ପ୍ରାରମ୍ଭିକ-ରିଟର୍ନ _ପୂର୍ବରୁ_ `checkFallbackError` (`open-sse/services/accountFallback.ts`) ଦ୍ୱାରା ପରାମର୍ଶ କରାଯାଏ, ଯାହା `honorsRuleLockScope(provider)` ଉପରେ ଗେଟ୍ କରାଯାଇଛି (#10334 — ବର୍ତ୍ତମାନ `providerErrorRules.ts`ରେ ଥିବା `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ଅନୁମୋଦନ ତାଲିକା ମାଧ୍ୟମରେ କେବଳ agentrouter ପାଇଁ)। ନିୟମର ଘୋଷିତ 6h କୁଲ୍ଡାଉନ୍ `fallbackResult.baseCooldownMs` ଭାବେ ପ୍ରବାହିତ ହୁଏ, କିନ୍ତୁ ଏହା ତଥାପି ପୂର୍ବରୁ ଥିବା ପ୍ରତି-ମଡେଲ୍-କୋଟା ଲକ୍ଆଉଟ୍ ପଥକୁ (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, କୁଲ୍ଡାଉନ୍ ଉତ୍ସ ବ୍ୟତୀତ #10334 ଦ୍ୱାରା ଅପରିବର୍ତ୍ତିତ) ଯାଏ: ଅନ୍ୟ ସମସ୍ତ ମଡେଲ୍ ଲକ୍ଆଉଟ୍ ପରି ଏହାକୁ ଅପରେଟର୍ଙ୍କ `mlSettings.maxCooldownMs` (ଡିଫଲ୍ଟ `1_800_000ms` / 30min) ପର୍ଯ୍ୟନ୍ତ ହ୍ରାସ କରି ସୀମିତ କରାଯାଏ, ଏବଂ _ସ୍ଥାୟୀ ଭାବେ ସଂରକ୍ଷିତ ଲକ୍ଆଉଟ୍ କାରଣ_ ନିୟମର `"auth_error"` ନୁହେଁ, ପୂର୍ବରୁ ଥିବା ହାର୍ଡକୋଡ୍ `"forbidden"` ହିଁ ରହେ — କେବଳ କୁଲ୍ଡାଉନ୍ ଅବଧିକୁ ଆରମ୍ଭରୁ ଶେଷ ପର୍ଯ୍ୟନ୍ତ ସମ୍ମାନ କରାଯାଏ, କାରଣ ଷ୍ଟ୍ରିଂକୁ ନୁହେଁ। କନେକ୍ସନ୍ଟି ସ୍ୱୟଂ ସକ୍ରିୟ ରହେ; ସମାନ କନେକ୍ସନ୍ରେ ଥିବା ସହୋଦର ମଡେଲ୍ଗୁଡ଼ିକ ପ୍ରଭାବିତ ହୁଅନ୍ତି ନାହିଁ।

ପୁନଃବ୍ୟକ୍ତ କରାଯାଇଥିବା କୋଟା ତ୍ରୁଟିଗୁଡ଼ିକ (`额度不足`) ପ୍ରଡକ୍ସନ୍ରେ ଏକ ପ୍ରଦାନକାରୀ ନିୟମ ସହ ମେଳ ଖାଏ
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ଏହାର ନିଜସ୍ୱ ଘୋଷିତ cooldown ନାହିଁ — persistence layerର
scaled backoff ଡିଫଲ୍ଟ ପ୍ରୟୋଗ ହୁଏ)। #10334 ପରଠାରୁ,
`ProviderErrorRuleMatch`ର `scope`କୁ ସମ୍ପୂର୍ଣ୍ଣ ପ୍ରବାହରେ ବ୍ୟବହାର କରାଯାଏ, କିନ୍ତୁ **କେବଳ**
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistରେ ଥିବା ପ୍ରଦାନକାରୀମାନଙ୍କ ପାଇଁ
(`providerErrorRules.ts` — ବର୍ତ୍ତମାନ କେବଳ `"agentrouter"`,
`honorsRuleLockScope()` ମାଧ୍ୟମରେ ନିୟନ୍ତ୍ରିତ)। ଅନ୍ୟ ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀ ପାଇଁ
`scope`, #10334 ପୂର୍ବର ପରି ଠିକ୍ ସେହିଭଳି, କେବଳ ସୂଚନାମୂଳକ ହୋଇ ରହେ।
`checkFallbackError`, ମେଳ ଖାଇଥିବା ନିୟମର scopeକୁ
`fallbackResult.ruleScope` ଭାବେ ପ୍ରକାଶ କରେ; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ହେଉଛି ସହଭାଗୀ guard, ଯାହା କୌଣସି
`ruleScope`କୁ ସଂଯୋଗ-ବ୍ୟାପୀ, ସ୍ୱୟଂ-ପୁନରୁଦ୍ଧାରକାରୀ
signal ଭାବେ ମାନିବା ପ୍ରକୃତରେ ସୁରକ୍ଷିତ ବୋଲି ନିଶ୍ଚିତ କରେ (scope `"connection"`,
reason `quota_exhausted`, କେବେବି `permanent` ନୁହେଁ,
କେବେବି `creditsExhausted` ନୁହେଁ — ଭବିଷ୍ୟତର କୌଣସି ନିୟମ scope
`"connection"`କୁ ଏକ ସ୍ଥାୟୀ account state ସହିତ ଯୋଡ଼ିବା ବିରୋଧରେ ଏକ ପ୍ରତିରକ୍ଷା)।
ଦୁଇଟି consumer ଏହାକୁ call କରନ୍ତି:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-providerର **ପ୍ରତି-model** lockout
  branchକୁ ଯିବା ପରିବର୍ତ୍ତେ (agentrouter ହେଉଛି `passthroughModels: true` →
  `hasPerModelQuota()` `true` return କରେ), ଏହା ଏକ **ଅସ୍ଥାୟୀ connection cooldown**
  ପ୍ରୟୋଗ କରେ — `testStatus: "unavailable"` + `rateLimitedUntil`, କେବେବି କୌଣସି
  terminal status (`credits_exhausted`/`banned`/`expired`) ନୁହେଁ — ଯାହା ଫଳରେ
  cooldown ଅବଧି ଶେଷ ହେବା ପରେ connectionଟି ହସ୍ତଚାଳିତ credential reset ଆବଶ୍ୟକ
  ନକରି ସ୍ୱୟଂ-ପୁନରୁଦ୍ଧାର କରେ। `disableCooling: true` ଥିବା connectionଗୁଡ଼ିକ ପାଇଁ
  ଏହାକୁ ଏଡ଼ାଇ ଦିଆଯାଏ (#2997): ସେହି opt-out ପରିବର୍ତ୍ତେ ପ୍ରତି-model lockoutକୁ
  ଯାଏ (ଏକ ଡକ୍ୟୁମେଣ୍ଟ ହୋଇଥିବା trade-off — branchଟିର ଉପରେ ଥିବା code comment ଦେଖନ୍ତୁ)।
- **ସମାନ-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ସେହି guardଟି connectionକୁ
  `${provider}:${connectionId}` key ଦ୍ୱାରା in-memory `exhaustedConnections` setରେ
  ଚିହ୍ନିତ କରେ। ଏହା କେବଳ ଏପରି ଏକ ଅବଶିଷ୍ଟ SAME-REQUEST targetକୁ ଏଡ଼ାଏ, ଯାହା
  _ନିଜ target objectରେ ପୂର୍ବରୁ ଠିକ୍ ସେହି `connectionId` ବହନ କରୁଛି_
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` `exhaustedConnections` lookup ପୂର୍ବରୁ) — ଏକ ସାଧାରଣ
  model-list comboରେ, ଯେଉଁଠାରେ sibling targetଗୁଡ଼ିକ ନିଜସ୍ୱ pinned
  `connectionId` ବହନ କରନ୍ତି ନାହିଁ ଏବଂ ଗୋଟିଏ id କେବଳ responseର
  `X-OmniRoute-Selected-Connection-Id` headerରୁ ପ୍ରତି-dispatch ଆଧାରରେ resolve ହୁଏ,
  ସେହି key match କେବେବି ଘଟେ ନାହିଁ। ସେହି ସାଧାରଣ କ୍ଷେତ୍ରରେ, ଏକ ଅବଶିଷ୍ଟ legକୁ
  ସଦ୍ୟ-exhausted account ପୁନଃବ୍ୟବହାର କରିବାରୁ ରୋକୁଥିବା ପ୍ରକୃତ ସୁରକ୍ଷା ଏହି
  Set **ନୁହେଁ** — ଏହା ହେଉଛି ଉପରୋକ୍ତ persistence layer
  (connectionର `rateLimitedUntil` ବର୍ତ୍ତମାନ ଭବିଷ୍ୟତରେ ଅଛି), ଯାହା failure ପାଇଁ
  `transientRateLimitedProviders`କୁ suppress କରୁଥିବା ଏହି ସମାନ guard ସହିତ ମିଶି
  କାର୍ଯ୍ୟ କରେ ("ଦୁଇ-ପର୍ଯ୍ୟାୟ ଡିଜାଇନ୍" ଏବଂ
  `targetExhaustion.ts`ର `isAgentrouterConnectionQuotaScope` branch ଉପରେ ଥିବା
  code comment ଦେଖନ୍ତୁ): ସେହି Setକୁ ଅଚିହ୍ନିତ ରଖାଗଲେ, `combo.ts`ର
  `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ପ୍ରଦାନକାରୀର ଅବଶିଷ୍ଟ
  legଗୁଡ଼ିକ ପାଇଁ ସକ୍ରିୟ ହୁଏ **ନାହିଁ**, ତେଣୁ credential selectionର
  `rateLimitedUntil` filter (`src/sse/services/auth.ts:1238`) ସାଧାରଣ ଭାବରେ
  ମାନ୍ୟ ହୁଏ ଏବଂ ଏକ ଅବଶିଷ୍ଟ leg ଭିନ୍ନ, ଏପର୍ଯ୍ୟନ୍ତ-ଯୋଗ୍ୟ agentrouter connection
  ବାଛେ କିମ୍ବା କୌଣସି credential ଉପଲବ୍ଧ ନଥିବାରୁ ବିଫଳ ହୁଏ — ଏହି branch ସଦ୍ୟ
  cooldown କରିଥିବା connectionକୁ ଜବରଦସ୍ତି ପୁନଃବ୍ୟବହାର କରେ ନାହିଁ।

### ଦୁଇ-ପର୍ଯ୍ୟାୟ ଡିଜାଇନ୍: statusର ପୁନଃବ୍ୟକ୍ତିକରଣ, ତା’ପରେ classification

Status restatement (`upstreamStatusRestatement.ts`) ଏବଂ provider
classification rules (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ହେଉଛି ପୃଥକ registry, ଯେଉଁ ଦୁଇଟି provider id
ଏବଂ text marker ଆଧାରରେ key କରେ, କିନ୍ତୁ ସେଗୁଡ଼ିକ ଭିନ୍ନ ସ୍ଥାନରେ ଚାଲେ ଏବଂ
ଭିନ୍ନ ଉଦ୍ଦେଶ୍ୟ ପୂରଣ କରେ: restatement, `chatCore.ts`ରେ HTTP statusକୁ ଶୀଘ୍ର
rewrite କରେ; classification rules, `checkFallbackError()` ଭିତରେ fallback
`reason` ଏବଂ lock `scope` (`model` / `provider` / `connection`) ବାଛେ
(`open-sse/services/accountFallback.ts`)।

Classification rules, କେବଳ `providerErrorRules.ts`ର
`FULL_TEXT_RULE_PROVIDERS` allowlistରେ ଥିବା providerମାନଙ୍କ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ
error **text** ଦେଖିପାରେ (`额度不足` ପରି body marker ସହ ମେଳ କରିବା ପାଇଁ
ଆବଶ୍ୟକ) — ବର୍ତ୍ତମାନ କେବଳ `"agentrouter"`। ଅନ୍ୟ ପ୍ରତ୍ୟେକ
**built-in catalog** provider ପାଇଁ, `checkFallbackError`,
`getProviderErrorRuleMatch`କୁ କେବଳ structured error (`{code, type}`) ଦିଏ,
ଯାହା header/status/code-ଆଧାରିତ ruleଗୁଡ଼ିକ ପାଇଁ ପର୍ଯ୍ୟାପ୍ତ, କିନ୍ତୁ body-text
markerଗୁଡ଼ିକୁ ଦେଖିପାରେ ନାହିଁ। `resolveRuleMatchBody()` helper ଏହି ଚୟନ କରେ:
allowlistରେ ଥିବା providerମାନଙ୍କ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ error text, ଅନ୍ୟଥା structured
error। କୌଣସି **built-in** providerକୁ `FULL_TEXT_RULE_PROVIDERS`ରେ ଯୋଡ଼ିବା
ହେଉଛି ଏକ ସ୍ପଷ୍ଟ ପ୍ରତି-provider opt-in — ତାଲିକାରେ ନଥିବା ପ୍ରତ୍ୟେକ provider
ପାଇଁ default pathକୁ byte-for-byte ଅପରିବର୍ତ୍ତିତ ରଖିବା ପାଇଁ ଏହା ରହିଛି।

କୌଣସି ruleର `scope` (`model` / `provider` / `connection`),
`FULL_TEXT_RULE_PROVIDERS`ଠାରୁ ପୃଥକ ଏକ opt-in: `checkFallbackError` କେବଳ ଏହାକୁ
`fallbackResult.ruleScope` ଭାବେ ପ୍ରକାଶ କରେ, ଏବଂ downstream consumerମାନେ
କେବଳ ସେହି fileର `HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlistରେ ଥିବା
providerମାନଙ୍କ ପାଇଁ ଏହାକୁ ସୂଚନାମୂଳକ label ବ୍ୟତୀତ ଅନ୍ୟ କିଛି ଭାବେ ମାନନ୍ତି
(`honorsRuleLockScope()` ମାଧ୍ୟମରେ ନିୟନ୍ତ୍ରିତ — ବର୍ତ୍ତମାନ କେବଳ
`"agentrouter"`)। କୌଣସି provider ସେହି allowlistରେ ଥିଲେ
`scope: "connection"` match ପ୍ରକୃତରେ କ’ଣ କରେ, ତାହା ପାଇଁ ଉପରୋକ୍ତ
"ପୁନଃବ୍ୟକ୍ତ କରାଯାଇଥିବା କୋଟା ତ୍ରୁଟିଗୁଡ଼ିକ" ଦେଖନ୍ତୁ।

**#11104 — ଅପରେଟର୍ ଦ୍ୱାରା ଘୋଷିତ ନିୟମଗୁଡ଼ିକ ଉଭୟ ଅନୁମୋଦନ-ତାଲିକାକୁ ଏଡ଼ାଇଯାଆନ୍ତି।** ଜଣେ ଅପରେଟର୍ ଏହି ଫାଇଲ୍ ସମ୍ପାଦନା ନକରି
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
ମାଧ୍ୟମରେ ରନ୍ଟାଇମ୍ରେ ପ୍ରତି-ପ୍ରଦାତା ନିୟମ ଘୋଷଣା କରିପାରନ୍ତି। ଅପରେଟର୍ ନିୟମକୁ
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` ପଛରେ ଗେଟ୍ କରିବା — ଯେଉଁ ଅନୁମୋଦନ-ତାଲିକାଗୁଡ଼ିକ
ବିଲ୍ଟ-ଇନ୍ କ୍ୟାଟାଲଗ୍ ନିୟମଗୁଡ଼ିକର **ଡିଫଲ୍ଟ** ଆଚରଣକୁ ସୁରକ୍ଷିତ ରଖିବା ପାଇଁ ଉଦ୍ଦିଷ୍ଟ — ପୂର୍ବରୁ
ସେଠାରେ ତାଲିକାଭୁକ୍ତ ପ୍ରଦାତାମାନଙ୍କୁ ଛାଡ଼ି ଅନ୍ୟ ପ୍ରତ୍ୟେକ ପ୍ରଦାତା ପାଇଁ
ସେଟିଂସ୍ ବ୍ୟବସ୍ଥାକୁ ନିଷ୍କ୍ରିୟ କରିଦେବ, କାରଣ ନିୟମ ଘୋଷଣା କରିବା ନିଜେ ହିଁ ଅପରେଟର୍ଙ୍କ ସ୍ପଷ୍ଟ
ଅପ୍ଟ-ଇନ୍। `resolveRuleMatchBody()` ଏବଂ `honorsRuleLockScope()` ଉଭୟ ପ୍ରଥମେ
`hasOperatorRuleForProvider()` ଯାଞ୍ଚ କରନ୍ତି: ଅପରେଟର୍ ନିୟମ ଥିବା ପ୍ରଦାତା କଞ୍ଚା ତ୍ରୁଟି ପାଠ୍ୟ ପାଏ
ଏବଂ ସେହି ପ୍ରଦାତା ଉଭୟ ଅନୁମୋଦନ-ତାଲିକାରୁ କୌଣସିଟିରେ ଥାଉ କି ନଥାଉ, ତାହାର ଘୋଷିତ `scope`କୁ
ସମ୍ମାନ କରାଯାଏ।

**ଜଣାଶୁଣା ଅଭାବ — HTTP 400 ପାଇଁ `providerRuleRegistry`କୁ କେବେବି ପରାମର୍ଶ କରାଯାଏ ନାହିଁ।**
`checkFallbackError`ର `BAD_REQUEST` ଶାଖା ନିଜସ୍ୱ ପ୍ୟାଟର୍ନ ଆରେଗୁଡ଼ିକ
(`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, ଇତ୍ୟାଦି `accountFallback.ts`ରେ) ମାଧ୍ୟମରେ ସ୍ଥିତି 400କୁ ସମ୍ପୂର୍ଣ୍ଣ
ଭାବେ ବର୍ଗୀକୃତ କରେ ଏବଂ ତାହାର ଉପରେ ଥିବା
`configuredRule`/`getProviderErrorRuleMatch` ଶାଖାରେ ପହଞ୍ଚିବା ପୂର୍ବରୁ ଫେରିଯାଏ।
`status: 400` ଥିବା ଏକ ବିଲ୍ଟ-ଇନ୍ କ୍ୟାଟାଲଗ୍ ନିୟମ (କିମ୍ବା ଏକ ଅପରେଟର୍ ନିୟମ)
ସିନ୍ଟାକ୍ସ ଦୃଷ୍ଟିରୁ ବୈଧ, କିନ୍ତୁ ଏହା କେବେବି ସକ୍ରିୟ ହେବ ନାହିଁ। ଆଜି କୌଣସି ବିଦ୍ୟମାନ ନିୟମ 400କୁ ଲକ୍ଷ୍ୟ କରେ ନାହିଁ,
ତେଣୁ ପ୍ରଡକ୍ସନ୍ରେ କିଛି ପ୍ରଭାବିତ ହେଉନାହିଁ — କିନ୍ତୁ ଭବିଷ୍ୟତର କୌଣସି 400 ନିୟମ ପାଇଁ ପ୍ରଥମେ ଏହି
ଶାଖାକୁ ପରିବର୍ତ୍ତନ କରିବାକୁ ପଡ଼ିବ, ଯାହା ଗୋଟିଏ ନିୟମ ଯୋଡ଼ିବାଠାରୁ ଅଧିକ ବଡ଼ ପରିବର୍ତ୍ତନ (ଏହା
ପ୍ୟାଟର୍ନ-ଆରେ ଆଚରଣ ଉପରେ ପୂର୍ବରୁ ନିର୍ଭର କରୁଥିବା ପ୍ରତ୍ୟେକ ପ୍ରଦାତା ପାଇଁ 400କୁ ପୁନଃବର୍ଗୀକୃତ କରେ)
ଏବଂ ଗୋଟିଏ ମାତ୍ର ପ୍ରଦାତା ନିୟମ ଯୋଗ କରିବାର ପରିସର ବାହାରେ।

### ଭୁଲ୍ କୋଟା ଦର୍ଶାଉଥିବା ଏକ ନୂଆ ଗେଟ୍ୱେ ଯୋଡ଼ିବା

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`)ରେ ଗୋଟିଏ ନିୟମ ଆରେ ପଞ୍ଜୀକୃତ କରନ୍ତୁ। `textMarkers`କୁ
   ପ୍ରଦାତା-ନିର୍ଦ୍ଦିଷ୍ଟ ରଖନ୍ତୁ; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) ସହ ଦ୍ୱନ୍ଦ୍ୱ ସୃଷ୍ଟି କରୁଥିବା ସାଧାରଣ ଇଂରାଜୀ ବାକ୍ୟାଂଶଗୁଡ଼ିକୁ କେବେବି ପୁନଃବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।
2. ସଠିକ୍ ଲକ୍ ସ୍କୋପ୍ ବାଛିବା ପାଇଁ ଇଚ୍ଛାଧୀନ ଭାବେ
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`)ରେ ବର୍ଗୀକରଣ ନିୟମଗୁଡ଼ିକ ପଞ୍ଜୀକୃତ କରନ୍ତୁ
   (ଆକାଉଣ୍ଟ-ବ୍ୟାପୀ କୋଟା ପାଇଁ `connection`, ପ୍ରତି-ମଡେଲ୍ ତ୍ରୁଟି ପାଇଁ `model`)। ଯେଉଁ
   ପ୍ରଦାତାଙ୍କ ନିୟମଗୁଡ଼ିକୁ ସମ୍ପୂର୍ଣ୍ଣ ତ୍ରୁଟି ପାଠ୍ୟ (ବଡି ମାର୍କର୍ଗୁଡ଼ିକ) ଆବଶ୍ୟକ, କେବଳ ସେମାନଙ୍କ ପାଇଁ ଏହି ପଦକ୍ଷେପ ପ୍ରଡକ୍ସନ୍ରେ ପ୍ରଭାବୀ ହୁଏ:
   ସେହି ଫାଇଲ୍ର `FULL_TEXT_RULE_PROVIDERS`ରେ ପ୍ରଦାତା id ଯୋଡ଼ନ୍ତୁ — ନଚେତ୍
   `checkFallbackError` ନିୟମକୁ କେବଳ ସଂରଚିତ
   `{code, type}` ତ୍ରୁଟି ହସ୍ତାନ୍ତର କରେ ଏବଂ ବଡି-ପାଠ୍ୟ ନିୟମ କେବେବି ଲାଇଭ୍ ଟ୍ରାଫିକ୍ ସହ ମେଳ ଖାଇବ ନାହିଁ।
   କେବଳ `status`/`headers` ଉପରେ ମେଳ ଖାଉଥିବା ନିୟମଗୁଡ଼ିକୁ (Opencode କିମ୍ବା
   Minimaxର ନିୟମ ପରି) ଏହି ଅପ୍ଟ-ଇନ୍ ଆବଶ୍ୟକ ନାହିଁ। ପୃଥକ୍ ଭାବେ, ଯଦି ନିୟମଟି
   `scope: "connection"` ଘୋଷଣା କରେ ଏବଂ ଉଦ୍ଦେଶ୍ୟ କେବଳ ସୂଚନାତ୍ମକ ଲେବଲ୍ ନୁହେଁ, ବରଂ ଏକ ପ୍ରକୃତ କନେକ୍ସନ୍-ବ୍ୟାପୀ କୁଲ୍ଡାଉନ୍
   ସହିତ ସମାନ-ଅନୁରୋଧ କମ୍ବୋ ସ୍କିପ୍, ତେବେ ସେହି ଫାଇଲ୍ର
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`ରେ ପ୍ରଦାତା id ଯୋଡ଼ନ୍ତୁ — ଏହା ହିଁ
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ଏବଂ
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)ରେ `isAgentrouterConnectionQuotaScope()`-ଶୈଳୀର ଉପଭୋଗକୁ
   ଗେଟ୍ କରେ; ଏହା ବିନା, `scope`
   ତଥାପି `fallbackResult.ruleScope` ମାଧ୍ୟମରେ ପ୍ରବାହିତ ହୁଏ, କିନ୍ତୁ କିଛି ମଧ୍ୟ ଏହା ଉପରେ କାର୍ଯ୍ୟ କରେ ନାହିଁ।
3. `tests/unit/upstream-status-restatement.test.ts`
   ଏବଂ `tests/unit/agentrouter-error-rules.test.ts`କୁ ଅନୁସରଣ କରି ୟୁନିଟ୍ ପରୀକ୍ଷାଗୁଡ଼ିକ ଯୋଡ଼ନ୍ତୁ (`not-permanent` /
   `not-creditsExhausted` ଗାର୍ଡଗୁଡ଼ିକ ସମେତ, ଏବଂ — ଯଦି ପ୍ରଦାତାକୁ
   ଅନୁମୋଦନ-ତାଲିକା ଆବଶ୍ୟକ — କେବଳ ସେହି ପ୍ରଦାତା ପାଇଁ `resolveRuleMatchBody()` ସମ୍ପୂର୍ଣ୍ଣ ପାଠ୍ୟ ଫେରାଉଥିବାକୁ
   ନିଶ୍ଚିତ କରୁଥିବା ଏକ ପରୀକ୍ଷା)।

`chatCore.ts`, `classifyError`, କିମ୍ବା କମ୍ବୋରେ କୌଣସି ପରିବର୍ତ୍ତନ ଆବଶ୍ୟକ ନାହିଁ।

#### ଏଗ୍ରେସ୍-ବକେଟ୍ ଲକ୍ (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`ରେ ଥିବା ପ୍ରଦାତାମାନଙ୍କୁ (opencode ପରିବାର) IP-ବକେଟ୍ ଅପ୍ଷ୍ଟ୍ରିମ୍ ଭାବେ ବିବେଚନା କରାଯାଏ
(opencode ଫ୍ରି ଟିୟର୍ଟି IP-ବକେଟ୍, ଆକାଉଣ୍ଟ-ବକେଟ୍ ନୁହେଁ — #9611 ଦେଖନ୍ତୁ): `quota_exhausted`
**କିମ୍ବା** `rate_limit_exceeded` ଭାବେ ବର୍ଗୀକୃତ status-429, ବିଫଳ କନେକ୍ସନ୍ର ଶେଷ ଜଣାଶୁଣା
ଏଗ୍ରେସ୍ IP ସହ ମେଳ ଖାଉଥିବା ପ୍ରତ୍ୟେକ ଅନୁମୋଦିତ-ପରିବାର କନେକ୍ସନ୍କୁ କୁଲ୍ଡାଉନ୍ କରେ,
ରୋଟେସନ୍ ସେଗୁଡ଼ିକୁ ପରୀକ୍ଷା କରିବା ପୂର୍ବରୁ
— ଏହା N-1ଟି ନିଶ୍ଚିତ-ବିଫଳ ଅପ୍ଷ୍ଟ୍ରିମ୍ କଲ୍କୁ ଏଡ଼ାଏ (#10460/#10525 ସହ ସମାନ ଢାଞ୍ଚା)।
`rate_limit_exceeded`କୁ ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ ସାମିଲ କରାଯାଇଛି: `markAccountUnavailable`
ପଥରେ opencode-ନିର୍ଦ୍ଦିଷ୍ଟ ନିୟମଗୁଡ଼ିକ କେବେବି ମେଳ ଖାଆନ୍ତି ନାହିଁ (`checkFallbackError`କୁ କୌଣସି headers/body ଦିଆଯାଏ ନାହିଁ,
opencode `FULL_TEXT_RULE_PROVIDERS`ରେ ନାହିଁ), ତେଣୁ ଯେଉଁ 429ର bodyରେ ସବ୍ସ୍କ୍ରିପ୍ସନ୍-କୋଟା ପାଠ୍ୟ ("monthly usage limit
reached") ଥାଏ, ତାହା `status_429` ନିୟମରେ ପହଞ୍ଚିବା ପୂର୍ବରୁ କୋଟା-ପାଠ୍ୟ ଫଲ୍ବ୍ୟାକ୍
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h କୁଲ୍ଡାଉନ୍) ଦ୍ୱାରା `quota_exhausted` ଭାବେ
ବର୍ଗୀକୃତ ହୁଏ — ଯେଉଁଠାରେ କୋଟା-ପାଠ୍ୟ-ବିହୀନ 429 (ସାଧାରଣ
ରେଟ୍ ଲିମିଟିଂ) `status_429` ନିୟମ ମାଧ୍ୟମରେ `rate_limit_exceeded` ଭାବେ ବର୍ଗୀକୃତ ହୁଏ
ଏବଂ ତଥାପି IP ପରିବାରକୁ କୁଲ୍ଡାଉନ୍ କରେ। ଅନୁମୋଦନ-ତାଲିକାଭୁକ୍ତ ପ୍ରଦାତା ପାଇଁ IP-ବକେଟ୍
ରେଟ୍ ଲିମିଟ୍ ଏକ ଶେଷ ହୋଇଯାଇଥିବା କୋଟା ସହ ସମାନ ସଙ୍କେତ। ପ୍ରକୃତ ସୀମାବଧତାଗୁଡ଼ିକ:

- **ସର୍ବୋତ୍ତମ ପ୍ରୟାସ**: ଲକ୍ଟି `proxy_logs` ରୁ ସଂଯୋଗର ଶେଷ ଜଣାଶୁଣା `egress_ip`
  ସମାଧାନ କରେ (24h ୱିଣ୍ଡୋ, ସମକାଳୀନ, କୌଣସି କ୍ୟାଶ୍ ନାହିଁ)। କୋଲ୍ଡ କ୍ୟାଶ୍ (egress
  IP କେବେ ପ୍ରୋବ୍ ହୋଇନାହିଁ) କିମ୍ବା କୌଣସି ରୋ ନଥିଲେ → ବିଫଳ ସଂଯୋଗଟି ତଥାପି
  ବ୍ରାଞ୍ଚ ଦ୍ୱାରା କୁଲ୍ଡାଉନ୍ରେ ରଖାଯାଏ (ବର୍ତ୍ତମାନ ପରି ରେକର୍ଡ କରାଯାଏ), କେବଳ
  କୌଣସି ସିବ୍ଲିଂ ଲକ୍ ହୁଏ ନାହିଁ।
- **କେବେବି ଟର୍ମିନାଲ୍ ନୁହେଁ**: କୁଲ୍ଡାଉନ୍ ହେଉଛି ଏକ ନବୀକରଣଶୀଳ କ୍ୱୋଟା ୱିଣ୍ଡୋ
  (`testStatus: "unavailable"`); IP-ସ୍ତରୀୟ ସିଗ୍ନାଲ୍ରୁ କେବେବି ଏକ ସ୍ଥାୟୀ ଅବସ୍ଥା
  ନିର୍ଦ୍ଧାରଣ କରାଯାଏ ନାହିଁ। `disableCooling` ସଂଯୋଗଗୁଡ଼ିକ ବ୍ରାଞ୍ଚଟିକୁ ସମ୍ପୂର୍ଣ୍ଣ
  ଭାବେ ଏଡ଼ାଇଯାଆନ୍ତି।
- **ଆଲାଉଲିଷ୍ଟ୍ କରାଯାଇଥିବା ଫ୍ୟାମିଲି ପାଇଁ ଲକ୍ର ଗ୍ରାନ୍ୟୁଲାରିଟି ବଦଳେ**: ଏହା
  ଏକ ସ୍କୋପ୍ ପରିବର୍ତ୍ତନ, କେବଳ ସିବ୍ଲିଂ ଅପ୍ଟିମାଇଜେସନ୍ ନୁହେଁ। opencode ଏକ
  `passthroughModels` ପ୍ରୋଭାଇଡର୍, ତେଣୁ ଏହି ବ୍ରାଞ୍ଚ ପୂର୍ବରୁ ଏକ 429 ପ୍ରତି-MODEL
  ଲକ୍ଆଉଟ୍ ସୃଷ୍ଟି କରୁଥିଲା; ବର୍ତ୍ତମାନ ଏହା ଏକ ସଂଯୋଗ କୁଲ୍ଡାଉନ୍ ସୃଷ୍ଟି କରେ —
  ଏଥିରେ କୌଣସି ସିବ୍ଲିଂ ନଥିବା ଗୋଟିଏ ମାତ୍ର ସଂଯୋଗ ଚଳାଉଥିବା ଅପରେଟର୍ ମଧ୍ୟ
  ଅନ୍ତର୍ଭୁକ୍ତ। ଏହା ସେହି ଗ୍ରାନ୍ୟୁଲାରିଟି ଯାହାକୁ opencode ନିୟମ ଟେବୁଲ୍ ପୂର୍ବରୁ
  ସଠିକ୍ ବୋଲି ଘୋଷଣା କରିଛି (`scope: "connection"`,
  `providerErrorRules.ts`), କିନ୍ତୁ opencode
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS` ରେ ନଥିବାରୁ ଏପର୍ଯ୍ୟନ୍ତ ତାହା କେବେବି
  ମାନ୍ୟ ହୋଇନଥିଲା। ବ୍ରାଞ୍ଚଟି ସଂଯୋଗ-ସ୍କୋପ୍ଡ୍ agentrouter ବ୍ରାଞ୍ଚକୁ
  ଅନୁକରଣ କରି, ବିଫଳ ସଂଯୋଗର କୁଲ୍ଡାଉନ୍ + `backoffLevel` ନିଜେ ଲେଖେ ଏବଂ
  ଫେରିଯାଏ — ନିମ୍ନରେ ଥିବା ପ୍ରତି-ମଡେଲ୍ ବ୍ଲକ୍ ଓ ଜେନେରିକ୍ ପଥରେ କେବେବି ପହଞ୍ଚେ
  ନାହିଁ।
- **କମ୍ବୋ ଅନ୍ତର୍ଭୁକ୍ତ**: agentrouter ବ୍ରାଞ୍ଚ ପରି, ସ୍କୋପ୍ଟି ଏକ କମ୍ବୋ କଲର୍
  429 ଉପରେ ପ୍ରୟୋଗ କରୁଥିବା `persistUnavailableState`/`isCombo`
  ଡାଉନ୍ଗ୍ରେଡ୍କୁ ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ ଅଣଦେଖା କରେ। ପ୍ରତି-ମଡେଲ୍ ଲକ୍ଆଉଟ୍
  ଏହି ସ୍କୋପ୍ର ଏକ ଦୁର୍ବଳ ରୂପ ନୁହେଁ, ଏହା ଭୁଲ୍ ୟୁନିଟ୍: ଏହା ଶେଷ ହୋଇଯାଇଥିବା
  IP ବିଷୟରେ କିଛି କହେ ନାହିଁ, ତେଣୁ କମ୍ବୋ ରୋଟେସନ୍ ପ୍ରତ୍ୟେକ ସିବ୍ଲିଂ ପାଇଁ
  ଗୋଟିଏ ସୁନିଶ୍ଚିତ-ବିଫଳ କଲ୍ ବ୍ୟର୍ଥ କରିଚାଲିବ।
- **ସିବ୍ଲିଂ ସୁରକ୍ଷା**: ପୂର୍ବରୁ ଟର୍ମିନାଲ୍ ଥିବା (banned/credits_exhausted)
  କିମ୍ବା ପୂର୍ବରୁ ଅଧିକ ଦୀର୍ଘ କୁଲ୍ଡାଉନ୍ରେ ଥିବା ସିବ୍ଲିଂକୁ କେବେବି ଓଭର୍ରାଇଟ୍
  କରାଯାଏ ନାହିଁ।
- **ଏକ୍ସକ୍ଲୁସିଭ୍ ଆଲାଉଲିଷ୍ଟ୍**: `EGRESS_BUCKETED_LOCK_PROVIDERS` କୁ ବିସ୍ତାର
  କରିବା ଏକ ସ୍ପଷ୍ଟ ଓନର୍ ନିଷ୍ପତ୍ତି; କୌଣସି ଜେନେରିକ୍ ୱାୟାରିଂ ନୁହେଁ (ପ୍ୟାଟର୍ନ
  #10334/#10419)। ସିବ୍ଲିଂ କ୍ୱେରୀ ସେହି ଏକା ଆଲାଉଲିଷ୍ଟ୍କୁ SQL ଲିଟେରାଲ୍
  ଭାବେ ପୁନରାବୃତ୍ତି କରିବା ପରିବର୍ତ୍ତେ ବାଇଣ୍ଡ୍ କରେ, ତେଣୁ ଏହାକୁ ବିସ୍ତାର କରିବା
  ଏକ-ଲାଇନ୍ ପରିବର୍ତ୍ତନ ହୋଇ ରହେ।
- **Egress IP ରୋଟେସନ୍, ଉଭୟ ଦିଗରେ**: ଲୁକ୍ଅପ୍ ୱିଣ୍ଡୋ (24h), egress-IP
  କ୍ୟାଶ୍ TTL (5 min) ଠାରୁ ବହୁତ ଅଧିକ ପ୍ରଶସ୍ତ, ତେଣୁ "ଶେଷ ଜଣାଶୁଣା IP" ହେଉଛି
  ଇତିହାସ, ବର୍ତ୍ତମାନର ଅବସ୍ଥା ନୁହେଁ। ୱିଣ୍ଡୋ ମଧ୍ୟରେ ଏକ ସଂଯୋଗର ପ୍ରକ୍ସି
  ରୋଟେଟ୍ ହୋଇଥିଲେ, ଲକ୍ଟି ଏକ ପ୍ରକୃତରେ ସେୟାର୍ କରାଯାଇଥିବା IP କୁ **ମିସ୍**
  କରିପାରେ (ରେକର୍ଡ ହୋଇଥିବା IP ହେଉଛି ନୂତନ, ଶେଷ ହୋଇନଥିବାଟି) — ଏବଂ ସମମିତ
  ଭାବେ ଏହା ଶେଷ ହୋଇଯାଇଥିବା IP ଠାରୁ ପରେ ରୋଟେଟ୍ ହୋଇ ଦୂରେଇଯାଇଥିବା ଏକ
  ସିବ୍ଲିଂକୁ **କୁଲ୍ଡାଉନ୍ରେ ରଖିପାରେ**। ଦ୍ୱିତୀୟ କ୍ଷେତ୍ରରେ ସେହି ସିବ୍ଲିଂକୁ
  ଗୋଟିଏ କୁଲ୍ଡାଉନ୍ ୱିଣ୍ଡୋର ମୂଲ୍ୟ ଦେବାକୁ ପଡ଼େ; ଉଭୟକୁ ଇତିହାସ-ଆଧାରିତ
  ଲୁକ୍ଅପ୍ର ଗ୍ରହଣୀୟ ସର୍ବୋତ୍ତମ-ପ୍ରୟାସ ସୀମା ଭାବେ ମାନି ନିଆଯାଇଛି।
- **ଖର୍ଚ୍ଚ**: `proxy_logs` ର ଦୁଇଟି ସୀମିତ ସ୍କାନ୍ (`idx_pl_timestamp` ମାଧ୍ୟମରେ
  ୱିଣ୍ଡୋ-ଫିଲ୍ଟର୍ କରାଯାଇଛି), କେବଳ 429 ଘଟିବା ହାରରେ। କୌଣସି ନୂତନ ଇଣ୍ଡେକ୍ସ
  ନାହିଁ (migration 134 YAGNI)। ମଧ୍ୟମ ଆକାରର ବାସ୍ତବ-ଟ୍ରାଫିକ୍ DB କପିରେ
  ମାପ କରାଯାଇଛି; ଏକ ଉଚ୍ଚ-ଥ୍ରୁପୁଟ୍ ଇନ୍ଷ୍ଟାନ୍ସ ସେହି ୱିଣ୍ଡୋ ମଧ୍ୟରେ
  ଆନୁପାତିକ ଭାବେ ଅଧିକ ରୋ ଧାରଣ କରେ।

---

## ଅନ୍ୟାନ୍ୟ ସ୍ଥିରତା ବୈଶିଷ୍ଟ୍ୟ

- **19ଟି ରାଉଟିଂ କୌଶଳ** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) ଦେଖନ୍ତୁ।
- **ରିସେଟ୍-ସଚେତନ ରାଉଟିଂ** (v3.8.0) — କୋଟା ରିସେଟ୍ ସମୟ ଆଧାରରେ ସଂଯୋଗଗୁଡ଼ିକୁ ପ୍ରାଥମିକତା ଦିଏ।
- **ପୃଷ୍ଠଭୂମି ମୋଡ୍ ଅବନତି** — Responses API `background: true`କୁ ଚେତାବନୀ ସହିତ ସିଙ୍କ୍ ମୋଡ୍କୁ ଅବନତ କରାଯାଏ।
- **ଡାଇନାମିକ୍ ଟୁଲ୍ ସୀମା ଚିହ୍ନଟ** — ଟୁଲ୍ ସଂଖ୍ୟା ସୀମାରେ ପହଞ୍ଚିଲେ ପ୍ରଦାତାମାନଙ୍କଠାରୁ ପଛକୁ ହଟେ।
- **ଜରୁରୀକାଳୀନ ଫଲ୍ବ୍ୟାକ୍** — `OMNIROUTE_EMERGENCY_FALLBACK` ଦ୍ୱାରା ନିୟନ୍ତ୍ରିତ; ଅପରେଟରମାନେ ପୁନଃଚାଳନ ବିନା Feature Flags ପୃଷ୍ଠାରୁ ଏହାକୁ ଓଭର୍ରାଇଡ୍ କରିପାରିବେ।

---

## ଡିବଗିଂ

- Weighted combo ଉତ୍ତରରେ `503 all_targets_cooling_down` ଆସେ (`Retry-After` ସେଟ୍ ହୋଇଛି, `diagnostics.excluded` ପ୍ରତ୍ୟେକ ଟାର୍ଗେଟ୍କୁ `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` ସହିତ ତାଲିକାଭୁକ୍ତ କରେ) → ପୁଲ୍ଟି କନଫିଗର୍ ଏବଂ ସଂଯୁକ୍ତ ହୋଇଛି, କିନ୍ତୁ ପ୍ରତ୍ୟେକ ଟାର୍ଗେଟ୍ କେବଳ ଏକ resilience timer ଦ୍ୱାରା ବାଦ୍ ଦିଆଯାଇଛି; `[COMBO] Weighted selection: every target excluded before dispatch — …` ଚେତାବନୀଟି କାରଣଗୁଡ଼ିକ ଏବଂ ବଳକା ସେକେଣ୍ଡ ଉଲ୍ଲେଖ କରେ। ସେହି combo ରୁ ଆସୁଥିବା `404 no_executable_targets` ର ଅର୍ଥ ହେଉଛି କୌଣସି resilience timer ସମ୍ପୃକ୍ତ ନଥିଲା (ଚଲାଇବା ପାଇଁ କିଛି ନାହିଁ, କିମ୍ବା ପ୍ରତ୍ୟେକ ଆକାଉଣ୍ଟ availability probe ରେ ବିଫଳ ହୋଇଛି)। ଏହା `targetResolution.ts` ରେ ସଂଗୃହୀତ ବାଦ୍ଗୁଡ଼ିକରୁ `open-sse/services/combo/pinRecovery.ts` ମଧ୍ୟରେ ତିଆରି ହୋଇଛି।
- ଏକ provider ପାଇଁ ସମସ୍ତ key ବାଦ୍ ଦିଆଯାଇଛି → circuit breaker ର ସ୍ଥିତି ଏବଂ ପ୍ରତ୍ୟେକ connection ର `rateLimitedUntil`/`testStatus`, ଉଭୟ ଯାଞ୍ଚ କରନ୍ତୁ।
- reset window ପରେ provider ସ୍ଥାୟୀ ଭାବରେ ବାଦ୍ ପଡ଼ିଛି → କୋଡ୍ଟି `getStatus()`/`canExecute()` ପରିବର୍ତ୍ତେ raw `state` ପଢ଼ୁଛି।
- ଗୋଟିଏ key ବିଫଳ ହେଲେ ଅନ୍ୟଗୁଡ଼ିକ କାମ କରିବା ଉଚିତ → circuit breaker ପରିବର୍ତ୍ତେ connection cooldown କୁ ପ୍ରାଧାନ୍ୟ ଦିଅନ୍ତୁ।
- କେବଳ ଗୋଟିଏ model ବିଫଳ ହେଉଛି → connection cooldown ପରିବର୍ତ୍ତେ model lockout କୁ ପ୍ରାଧାନ୍ୟ ଦିଅନ୍ତୁ।
- ସ୍ଥିତି ସ୍ୱୟଂ-ପୁନରୁଦ୍ଧାର ହେବା ଉଚିତ, କିନ୍ତୁ ହେଉନାହିଁ → ଭବିଷ୍ୟତର timestamp + ମିଆଦ ସମାପ୍ତ ସ୍ଥିତିକୁ refresh କରୁଥିବା read path ଯାଞ୍ଚ କରନ୍ତୁ। ସ୍ଥାୟୀ status ପାଇଁ ମାନୁଆଲ୍ ପରିବର୍ତ୍ତନ ଆବଶ୍ୟକ।

---

## TLS ଫିଙ୍ଗରପ୍ରିଣ୍ଟିଂ ଏବଂ ଗୁପ୍ତତା

ପ୍ରଦାତା-ନିର୍ଦ୍ଦିଷ୍ଟ ଗୁପ୍ତତା (JA3/JA4, CCH, ଅସ୍ପଷ୍ଟୀକରଣ) ପୃଥକ ଭାବେ ଡକ୍ୟୁମେଣ୍ଟ କରାଯାଇଛି — `docs/security/STEALTH_GUIDE.md` ଦେଖନ୍ତୁ (git; `/docs`ରେ କମ୍ପାଇଲ୍ କରାଯାଇନାହିଁ)।

---

## ସ୍ଥିରତା ପରୀକ୍ଷଣ (ପର୍ଯ୍ୟାୟ 8 · ବ୍ଲକ୍ C)

ସ୍ଥିରତା ଲଜିକ୍ ପାଇଁ ୟୁନିଟ୍ ପରୀକ୍ଷା ବ୍ୟତୀତ, ତିନୋଟି ପରୀକ୍ଷା ବାସ୍ତବ
ଚାପ/ବିଫଳତା ପରିସ୍ଥିତିରେ ରନ୍ଟାଇମ୍କୁ ପରୀକ୍ଷା କରେ (ସମସ୍ତେ ଇଣ୍ଟିଗ୍ରେସନ୍/ନାଇଟ୍ଲି — କୌଣସିଟି PRଗୁଡ଼ିକୁ ଅବରୋଧ କରେନାହିଁ):

| ପରୀକ୍ଷା     | କ’ଣ                                                                                                                                                                                                       | ଚାଳନା                                    |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| କ୍ୟାଓସ୍     | ନକଲି ଅପ୍ଷ୍ଟ୍ରିମ୍ ନୋଡ୍ ବାସ୍ତବ ବିଳମ୍ବ/ରିସେଟ୍/ଟାଇମ୍ଆଉଟ୍/503 ଇଞ୍ଜେକ୍ଟ କରେ; ସର୍କିଟ୍ ବ୍ରେକର୍ ଖୋଲୁଛି/ପୁନରୁଦ୍ଧାର ହେଉଛି ଏବଂ `checkFallbackError` 503କୁ ପୁନରୁଦ୍ଧାରଯୋଗ୍ୟ ଫଲ୍ବ୍ୟାକ୍ ଭାବେ ବର୍ଗୀକୃତ କରୁଛି ବୋଲି ବୈଧ କରେ। | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| ହିପ୍-ବୃଦ୍ଧି | `--expose-gc` ଅଧୀନରେ ପ୍ରତ୍ୟେକ `createSSEStream` ପାଇଁ ~500ଟି ଷ୍ଟ୍ରିମ୍; ହିପ୍ ସର୍ବୋଚ୍ଚ ସୀମା ଟପି ବଢ଼ିଲେ ବିଫଳ ହୁଏ (OOM ସୁରକ୍ଷା #3069)।                                                                         | `npm run test:heap`                      |
| k6 ସୋକ୍     | `/api/monitoring/health` ବିରୋଧରେ ନିରନ୍ତର ଲୋଡ୍; p95/ତ୍ରୁଟି ଥ୍ରେସ୍ହୋଲ୍ଡ।                                                                                                                                    | `k6 run tests/load/k6-soak.js` (ନାଇଟ୍ଲି) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) ଦ୍ୱାରା ସମନ୍ୱିତ। ଡିଫଲ୍ଟ
`test:integration`ରେ, କ୍ୟାଓସ୍ ଏବଂ ହିପ୍ ସ୍ୱୟଂ-ଏଡ଼ାଇ ଯାଆନ୍ତି (`RUN_CHAOS_INT`/`--expose-gc` ବିନା)।

---

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [ଆର୍କିଟେକ୍ଚର୍ ମାର୍ଗଦର୍ଶିକା](./ARCHITECTURE.md) — ସିଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଚର୍ ଏବଂ ଆଭ୍ୟନ୍ତରୀଣ ବିବରଣୀ
- [ବ୍ୟବହାରକାରୀ ମାର୍ଗଦର୍ଶିକା](../guides/USER_GUIDE.md) — ପ୍ରଦାନକାରୀ, କମ୍ବୋ, CLI ସମନ୍ୱୟ
- [ଅଟୋ-କମ୍ବୋ ଇଞ୍ଜିନ୍](../routing/AUTO-COMBO.md) — 16ଟି ଉପାଦାନର ସ୍କୋରିଂ, ମୋଡ୍ ପ୍ୟାକ୍
