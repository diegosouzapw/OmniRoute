# CORS Configuration & Security (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ଏକକ, କେନ୍ଦ୍ରୀକୃତ ଅନୁମତି-ତାଲିକାରୁ କେଉଁ **ବ୍ରାଉଜର ଅରିଜିନ୍ଗୁଡ଼ିକ** କ୍ରସ୍-ଅରିଜିନ୍ ପ୍ରତିକ୍ରିୟା ପଢ଼ିପାରିବେ, ତାହା ନିୟନ୍ତ୍ରଣ କରେ।
ଏହି ମଡେଲ୍ **ଡିଫଲ୍ଟ ଭାବେ ଫେଲ୍-କ୍ଲୋଜ୍ଡ**:
ଆପଣ କୌଣସି ଅରିଜିନ୍କୁ ସ୍ପଷ୍ଟ ଭାବେ ଅନୁମତି ନଦେବା ପର୍ଯ୍ୟନ୍ତ କୌଣସି ଅରିଜିନ୍କୁ ଅନୁମତି ମିଳେ ନାହିଁ। ଏହି ପୃଷ୍ଠାରେ ଅନୁମତି-ତାଲିକା କିପରି
ନିର୍ଦ୍ଧାରିତ ହୁଏ, `CORS_ALLOW_ALL=true` ପ୍ରକୃତରେ କ’ଣ ଉନ୍ମୁକ୍ତ କରେ (ଏବଂ, ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ଭାବେ, କ’ଣ
କରେ **ନାହିଁ**), ଡେଭେଲପମେଣ୍ଟ ବନାମ ପ୍ରଡକ୍ସନ୍କୁ କିପରି ସୁରକ୍ଷିତ ଭାବେ ବିନ୍ୟାସ କରିବେ, ଏବଂ ୱାଇଲ୍ଡକାର୍ଡ ସକ୍ରିୟ ଥିବାବେଳେ
ଡ୍ୟାସବୋର୍ଡ ଦେଖାଉଥିବା ରନ୍ଟାଇମ୍ ଚେତାବନୀକୁ ଲିପିବଦ୍ଧ କରାଯାଇଛି।

**ସତ୍ୟର ମୂଳ ଉତ୍ସ:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`)। ଅନୁମତି-ତାଲିକାଟି କେବଳ ଥରେ, ମିଡଲୱେର୍ରେ
(`src/server/authz/pipeline.ts`) ପ୍ରୟୋଗ କରାଯାଏ — ପ୍ରତ୍ୟେକ ରୁଟ୍ର ହ୍ୟାଣ୍ଡଲର୍ ନିଜେ
`Access-Control-Allow-Origin` ସେଟ୍ କରନ୍ତି ନାହିଁ।

## ଏକ ଅରିଜିନ୍ କିପରି ନିର୍ଦ୍ଧାରିତ ହୁଏ

ପ୍ରତ୍ୟେକ ଅନୁରୋଧ ପାଇଁ ମିଡଲୱେର୍ ଏହି କ୍ରମରେ `Access-Control-Allow-Origin` ମୂଲ୍ୟ
ଗଣନା କରେ:

1. **`CORS_ALLOW_ALL=true`** (କିମ୍ବା ପୁରୁଣା `CORS_ORIGIN=*`) → କଲ୍ କରୁଥିବା ପକ୍ଷର
   `Origin`କୁ ପୁଣି ସେହି ପକ୍ଷକୁ ପଠାଏ (କିମ୍ବା `Origin` ହେଡର୍ ନଥିଲେ `*`), ଏବଂ
   କ୍ୟାଶ୍ଗୁଡ଼ିକୁ ସଠିକ୍ ରଖିବା ପାଇଁ `Vary: Origin` ବ୍ୟବହାର କରେ। ସେହି `applyCorsHeaders()` ଚୋକ୍ପଏଣ୍ଟ
   ଟୋକେନ୍-ପ୍ରମାଣିତ ` /v1*`/`/v1beta*` ପୃଷ୍ଠଭାଗର ପ୍ରତ୍ୟେକ 2xx-ସହିତ-ବଡି ପ୍ରତିକ୍ରିୟାରେ
   `Vary: Accept-Encoding` ମଧ୍ୟ ଯୋଡ଼େ (`relaxForTokenAuth`, RFC 9110 §12.5.5, ସମସ୍ୟା #6737), ଯାହାଦ୍ୱାରା
   ଡାଉନ୍ଷ୍ଟ୍ରିମ୍/ସହଭାଗୀ କ୍ୟାଶ୍ଗୁଡ଼ିକ ସଙ୍କୁଚିତ ଏବଂ ଅସଙ୍କୁଚିତ
   ଭାରିଆଣ୍ଟଗୁଡ଼ିକୁ ସଠିକ୍ ଭାବେ ପୃଥକ୍ କରିପାରିବେ।
2. ଅନ୍ୟଥା, ଅନୁରୋଧର `Origin`କୁ ସାମାନ୍ୟୀକୃତ କରାଯାଏ (ଛୋଟ ଅକ୍ଷରକୁ ପରିବର୍ତ୍ତନ କରି, ଶେଷ ସ୍ଲାସ୍
   ହଟାଇ) ଏବଂ **ମିଶ୍ରିତ ଅନୁମତି-ତାଲିକା** ସହିତ ମେଳ କରାଯାଏ:
   - env **`CORS_ALLOWED_ORIGINS`** — କମା-ଦ୍ୱାରା ପୃଥକ୍ ତାଲିକା, ଏବଂ
   - ରନ୍ଟାଇମ୍ **`corsOrigins`** ସେଟିଂ (ଡ୍ୟାସବୋର୍ଡ → ସୁରକ୍ଷା → _CORS ଅନୁମୋଦିତ
     ଅରିଜିନ୍ଗୁଡ଼ିକ_), ଯାହାକୁ `src/lib/config/runtimeSettings.ts`ର
     `setRuntimeAllowedOrigins()` ମାଧ୍ୟମରେ ଇଞ୍ଜେକ୍ଟ କରାଯାଏ।
3. କୌଣସି ମେଳ ନାହିଁ → **କୌଣସି `Access-Control-Allow-Origin` ହେଡର୍ ନିର୍ଗତ ହୁଏ ନାହିଁ**। ବ୍ରାଉଜର୍
   କ୍ରସ୍-ଅରିଜିନ୍ ପଠନକୁ ଅବରୋଧ କରେ। ଏହା ହିଁ ଉଦ୍ଦିଷ୍ଟ ଫେଲ୍-କ୍ଲୋଜ୍ଡ ଡିଫଲ୍ଟ।

| Env var                | ଅର୍ଥ                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ଅନୁମତି ଦେବାକୁ ଥିବା ସଠିକ୍ ଅରିଜିନ୍ଗୁଡ଼ିକର CSV (ସୁପାରିସକୃତ)।                              |
| `CORS_ALLOW_ALL`       | `true`/`1` → ଯେକୌଣସି ଅରିଜିନ୍କୁ ପୁନଃ ପଠାଏ (ୱାଇଲ୍ଡକାର୍ଡ)। କେବଳ ଡେଭେଲପମେଣ୍ଟ ପାଇଁ।         |
| `CORS_ORIGIN`          | ପୁରୁଣା। `*` `CORS_ALLOW_ALL` ପରି ଆଚରଣ କରେ; ଗୋଟିଏ ମାତ୍ର ମୂଲ୍ୟ ଅନୁମତି-ତାଲିକାରେ ଯୋଡ଼ାଯାଏ। |

## ବିପଦ ମଡେଲ୍ — `CORS_ALLOW_ALL=true` ପ୍ରକୃତରେ କ’ଣ ଉନ୍ମୁକ୍ତ କରେ

ସାଧାରଣ OWASP ଚେତାବନୀ ("ୱାଇଲ୍ଡକାର୍ଡ CORS = ଯେକୌଣସି ସାଇଟ୍ ଆପଣଙ୍କ APIକୁ କଲ୍ କରିପାରିବ")କୁ
ଗୁରୁତ୍ୱର ସହ ନେବା ଉଚିତ, କିନ୍ତୁ OmniRouteର ଉନ୍ମୁକ୍ତତା **ସାଧାରଣ ପରିସ୍ଥିତି ଅପେକ୍ଷା ସୀମିତ**,
କାରଣ ଏହାର ଏକ ନିର୍ଦ୍ଦିଷ୍ଟ କାର୍ଯ୍ୟାନ୍ୱୟନ ତଥ୍ୟ ଅଛି:

> **କେନ୍ଦ୍ରୀୟ `applyCorsHeaders()` କେବେ ମଧ୍ୟ
> `Access-Control-Allow-Credentials` ନିର୍ଗତ କରେ ନାହିଁ।** ସର୍ଭର୍
> `Access-Control-Allow-Credentials: true` ପଠାଇ ନଥିଲେ, ବ୍ରାଉଜର୍ ଏକ _ପ୍ରମାଣପତ୍ର-ସହିତ_
> (କୁକି-ବହନକାରୀ) କ୍ରସ୍-ଅରିଜିନ୍ ପ୍ରତିକ୍ରିୟାକୁ ଉନ୍ମୁକ୍ତ କରିବ ନାହିଁ। OmniRouteର ସହଭାଗୀ CORS ପଥ କେବେ
> ଏହା କରେ ନାହିଁ।

`CORS_ALLOW_ALL=true` ଥିଲେ ମଧ୍ୟ, ପ୍ରତ୍ୟେକ ପୃଷ୍ଠଭାଗ ପାଇଁ ଏହାର ଅର୍ଥ:

| ପୃଷ୍ଠଭାଗ                              | ପ୍ରମାଣୀକରଣ ପ୍ରଣାଳୀ          | ୱାଇଲ୍ଡକାର୍ଡ CORSର ପ୍ରଭାବ                                                                                                                                                                                                                               |
| ------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ଡ୍ୟାସବୋର୍ଡ / MANAGEMENT `/api/*`      | କୁକି ସେସନ୍                  | ଅରିଜିନ୍ ପୁନଃ ପଠାଯାଏ, କିନ୍ତୁ **`Allow-Credentials` ବିନା** ବ୍ରାଉଜର୍ **ପ୍ରମାଣପତ୍ର-ସହିତ ପଠନକୁ ଅବରୋଧ କରେ**। ଏକ କ୍ଷତିକାରକ କ୍ରସ୍-ଅରିଜିନ୍ ସାଇଟ୍ ଆପଣଙ୍କ ପ୍ରମାଣିତ ଡ୍ୟାସବୋର୍ଡ ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକୁ **ପଢ଼ିପାରିବ ନାହିଁ**, ଏବଂ ସେସନ୍ କୁକି ଉନ୍ମୁକ୍ତ ହୁଏ ନାହିଁ।          |
| କ୍ଲାଏଣ୍ଟ API `/v1/*`, `/v1beta/*`     | ବେୟାରର୍ / `x-api-key` ହେଡର୍ | **ଡିଜାଇନ୍ ଅନୁସାରେ** ପୂର୍ବରୁ ଅନୁମତିମୂଳକ (`relaxForTokenAuth`): ବ୍ରାଉଜର୍ଗୁଡ଼ିକ କେବେ ମଧ୍ୟ ସ୍ୱୟଂଚାଳିତ ଭାବେ `Authorization`/`x-api-key` ସଂଲଗ୍ନ କରନ୍ତି ନାହିଁ, ତେଣୁ ଆକ୍ରମଣକାରୀଙ୍କ ପୃଷ୍ଠା ଆପଣଙ୍କ କୀ ଯୋଗାଇପାରିବ ନାହିଁ। `CORS_ALLOW_ALL` ଏହାକୁ ବ୍ୟାପକ କରେ ନାହିଁ। |
| ସାର୍ବଜନୀନ କେବଳ-ପଠନ (`/api/health`, …) | କିଛି ନାହିଁ                  | ଅସମ୍ବେଦନଶୀଳ; ୱାଇଲ୍ଡକାର୍ଡ କ୍ଷତିହୀନ।                                                                                                                                                                                                                     |

ତେଣୁ `CORS_ALLOW_ALL=true`ର **ଅବଶିଷ୍ଟ** ଉନ୍ମୁକ୍ତତା ଏତିକିରେ ସୀମିତ: (a)
ପୂର୍ବରୁ ଅପ୍ରମାଣିତ ତଥ୍ୟର ପ୍ରମାଣପତ୍ର-ବିହୀନ କ୍ରସ୍-ଅରିଜିନ୍ **ପଠନ**, ଏବଂ (b)
ପରିଚାଳନା ରୁଟ୍ଗୁଡ଼ିକରେ CORS **ପ୍ରିଫ୍ଲାଇଟ୍କୁ ପାସ୍ ହେବାକୁ ଦେବା** — ଯେଉଁଥିପାଇଁ ତଥାପି ଏମିତି ପ୍ରମାଣୀକରଣ
ଆବଶ୍ୟକ ଯାହା ଏକ କ୍ରସ୍-ଅରିଜିନ୍ ପୃଷ୍ଠା ଯୋଗାଇପାରିବ ନାହିଁ। ସହଭାଗୀ CORS ପଥରେ ଏହା
ସେସନ୍-ହାଇଜ୍ୟାକ୍ କିମ୍ବା ପ୍ରମାଣପତ୍ର-ଚୋରିର ବାହକ **ନୁହେଁ**।

### ଏକ ପ୍ରକୃତ ବ୍ୟତିକ୍ରମ — `/api/v1/agents/`

Cloud-Agent ରୁଟ୍ଗୁଡ଼ିକ (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ସେମାନଙ୍କ
**ନିଜସ୍ୱ** CORS ହେଡର୍ ସେଟ୍ କରନ୍ତି
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ଏବଂ
`Access-Control-Allow-Origin: <origin>|*` ସହିତ
`Access-Control-Allow-Credentials: true` ମଧ୍ୟ **ନିର୍ଗତ କରନ୍ତି**। ଏହା ଏକମାତ୍ର ପୃଷ୍ଠଭାଗ ଯେଉଁଠାରେ
ଅରିଜିନ୍-ପୁନଃପ୍ରେରଣ ଏବଂ ପ୍ରମାଣପତ୍ର ଏକାଠି ରହେ, ଏବଂ ଏହା
`CORS_ALLOW_ALL`ଠାରୁ **ସ୍ୱାଧୀନ**। ଏହି ରୁଟ୍ଗୁଡ଼ିକ ପରିଚାଳନା-ପ୍ରମାଣିତ
(`requireManagementAuth`); ଯେଉଁ ଅପରେଟର୍ମାନେ ଡ୍ୟାସବୋର୍ଡକୁ ହୋଷ୍ଟ ବାହାରେ ଉନ୍ମୁକ୍ତ କରନ୍ତି, ସେମାନେ
ସଚେତନ ରହିବା ଉଚିତ ଯେ ପ୍ରତିକ୍ରିୟା ହେଡର୍ଗୁଡ଼ିକ ଦ୍ୱାରା କ୍ରସ୍-ଅରିଜିନ୍ ପ୍ରମାଣପତ୍ର-ସହିତ ପଠନକୁ ଅନୁମତି ମିଳୁଥିବା ଏହା ହିଁ ଏକମାତ୍ର ସ୍ଥାନ।
ଏହାକୁ ଏକ ସ୍ପଷ୍ଟ ଅନୁମତି-ତାଲିକାରେ ସୀମିତ କରିବା କାର୍ଯ୍ୟ ଏହି CORS ମାର୍ଗଦର୍ଶନଠାରୁ
ପୃଥକ୍ ଭାବେ ଟ୍ରାକ୍ କରାଯାଉଛି।

## ପ୍ରଡକ୍ସନ୍ ଯାଞ୍ଚସୂଚୀ

- **ପ୍ରଡକ୍ସନ୍ରେ କେବେବି `CORS_ALLOW_ALL=true` ସେଟ୍ କରନ୍ତୁ ନାହିଁ।** ଏହାକୁ ସେଟ୍ ନକରି ରଖନ୍ତୁ।
- ଏକ **ସ୍ପଷ୍ଟ** ଅରିଜିନ୍ ତାଲିକା ସେଟ୍ କରନ୍ତୁ — env var କିମ୍ବା Security ଟ୍ୟାବ୍ର ଫିଲ୍ଡ ମଧ୍ୟରୁ ଯେକୌଣସି ଗୋଟିଏ:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- ଯଦି OmniRoute ଏକ ରିଭର୍ସ ପ୍ରକ୍ସି / ଟନେଲ୍ (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) ପଛରେ ଚାଲେ, ତେବେ CORS ଆପଣଙ୍କର **ଏକମାତ୍ର** ନିୟନ୍ତ୍ରଣ ନୁହେଁ — ଲୁପ୍ବ୍ୟାକ୍ ରୁଟ୍
  ଗାର୍ଡ ଏବେ ମଧ୍ୟ spawn-ସକ୍ଷମ ରୁଟ୍ଗୁଡ଼ିକୁ ସୁରକ୍ଷା ଦିଏ (
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ଦେଖନ୍ତୁ)। 403କୁ "ଠିକ୍" କରିବା ପାଇଁ
  `X-Forwarded-For: 127.0.0.1` ଜାଲିଆତି କରନ୍ତୁ ନାହିଁ; ଏହା ରୁଟ୍ ଗାର୍ଡ ବନ୍ଦ କରିଥିବା
  RCE ଶ୍ରେଣୀକୁ ପୁଣି ଖୋଲିଦିଏ।
- ରନ୍ଟାଇମ୍ ସ୍ଥିତି ନିଶ୍ଚିତ କରନ୍ତୁ: `CORS_ALLOW_ALL=true` ସକ୍ରିୟ ଥିବାବେଳେ ଡ୍ୟାସ୍ବୋର୍ଡ
  Dashboard → Security → Authorization Inventory ଅଧୀନରେ ଏକ **ସ୍ଥାୟୀ ଆମ୍ବର୍ ବ୍ୟାନର୍**
  ଦେଖାଏ, ଏବଂ `/api/settings/authz-inventory` ଏକ
  `cors: { allowAll, allowedOrigins }` ଏନ୍ଭେଲପ୍ ଫେରାଏ, ଯାହାକୁ ମନିଟରିଂ ଟୁଲ୍ଗୁଡ଼ିକ ପୋଲ୍ କରିପାରିବେ।

## ଡେଭଲପ୍ମେଣ୍ଟ ସୁବିଧା — ନିର୍ଦ୍ଦିଷ୍ଟ ଲୋକାଲ୍ ଅରିଜିନ୍ଗୁଡ଼ିକୁ ଅନୁମତି ଦିଅନ୍ତୁ

ଡେଭ୍ରେ ମଧ୍ୟ ଆପଣଙ୍କୁ କ୍ୱଚିତ୍ ୱାଇଲ୍ଡକାର୍ଡ ଆବଶ୍ୟକ ହୁଏ। କେବଳ ଆପଣ ବ୍ୟବହାର କରୁଥିବା ଡେଭ୍ ସର୍ଭର୍ଗୁଡ଼ିକୁ ଅନୁମତି ଦିଅନ୍ତୁ:

```bash
# ଏକ ଲୋକାଲ୍ OmniRouteକୁ କଲ୍ କରୁଥିବା Vite (5173) + Next.js (3000) ଡେଭ୍ ସର୍ଭର୍ଗୁଡ଼ିକ
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ଅରିଜିନ୍ଗୁଡ଼ିକୁ କେସ୍ର ପାର୍ଥକ୍ୟ ନକରି ମେଳ କରାଯାଏ ଏବଂ ଶେଷର ସ୍ଲାସ୍କୁ ଅଣଦେଖା କରାଯାଏ, ତେଣୁ
`http://localhost:3000` ଏବଂ `http://localhost:3000/` ସମତୁଲ୍ୟ। ସେହି CSVକୁ
ରିଷ୍ଟାର୍ଟ ବିନା ରନ୍ଟାଇମ୍ରେ **Dashboard → Security → CORS Allowed Origins**ରେ ସେଟ୍ କରାଯାଇପାରିବ।

## API କୀ ବନାମ କୁକି ସେସନ୍

- **Bearer / `x-api-key` (`/v1/*` ଇନ୍ଫରେନ୍ସ ସର୍ଫେସ୍):** ବ୍ରାଉଜର୍ଗୁଡ଼ିକ କେବେବି
  ଏଗୁଡ଼ିକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ସଂଲଗ୍ନ କରନ୍ତି ନାହିଁ। ଏଠାରେ CORS ଏକ ଅର୍ଥପୂର୍ଣ୍ଣ ପ୍ରତିବନ୍ଧକ ନୁହେଁ — API କୀ ହେଉଛି
  ପ୍ରତିବନ୍ଧକ — ଯେଉଁଥିପାଇଁ ଏହି ସର୍ଫେସ୍କୁ ଜାଣିଶୁଣି ଅନୁମତିମୂଳକ ରଖାଯାଇଛି, ଯାହାଦ୍ୱାରା ବ୍ରାଉଜର୍ ଏବଂ
  Electron କ୍ଲାଏଣ୍ଟ୍ଗୁଡ଼ିକ ସେମାନେ ପୂର୍ବରୁ ପାଇବାକୁ ଅଧିକୃତ ଥିବା ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକ ପଢ଼ିପାରିବେ।
- **କୁକି ସେସନ୍ (ଡ୍ୟାସ୍ବୋର୍ଡ):** ଡିଫଲ୍ଟ **ବିଫଳତାରେ-ବନ୍ଦ** ନୀତି **ଏବଂ**
  ସେୟାର୍ଡ ପାଥ୍ରେ `Access-Control-Allow-Credentials` ଅନୁପସ୍ଥିତ ଥିବାରୁ ସୁରକ୍ଷିତ। ପରିଚାଳନା/ଡ୍ୟାସ୍ବୋର୍ଡ
  ଅରିଜିନ୍ଗୁଡ଼ିକୁ କୌଣସି ଅନୁମତିମୂଳକ କନ୍ଫିଗ୍ରୁ ବାହାରେ ରଖନ୍ତୁ; ସେଗୁଡ଼ିକ ନିଶ୍ଚିତ ଭାବରେ
  ବିଫଳତାରେ-ବନ୍ଦ ରହିବା ଆବଶ୍ୟକ।

## ଉଦାହରଣ: OmniRoute ସମ୍ମୁଖରେ ଏକ ରିଭର୍ସ ପ୍ରକ୍ସି

CORSକୁ OmniRoute ନିଜେ ପ୍ରୟୋଗ କରେ, ତେଣୁ ପ୍ରକ୍ସି ସାଧାରଣତଃ `Access-Control-*`
ହେଡର୍ଗୁଡ଼ିକୁ **ଯୋଡ଼ିବା କିମ୍ବା ପୁନଃଲିଖନ କରିବା ଉଚିତ ନୁହେଁ** (ଦୁଇଟି ହେଡର୍ ବ୍ରାଉଜର୍କୁ ବିଗାଡ଼ିଦିଏ)। TLS
ସମାପ୍ତ କରି ଫର୍ୱାର୍ଡ କରନ୍ତୁ — OmniRouteକୁ ପ୍ରିଫ୍ଲାଇଟ୍ର ଉତ୍ତର ଦେବାକୁ ଦିଅନ୍ତୁ:

```nginx
# nginx — OmniRouteକୁ ଫର୍ୱାର୍ଡ କରନ୍ତୁ; ଏଠାରେ Access-Control-* ଇଞ୍ଜେକ୍ଟ କରନ୍ତୁ ନାହିଁ
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-Forକୁ 127.0.0.1 ଭାବେ ସେଟ୍ କରନ୍ତୁ ନାହିଁ — ଏହା ଲୁପ୍ବ୍ୟାକ୍ ରୁଟ୍ ଗାର୍ଡକୁ ନିଷ୍ଫଳ କରେ।
}
```

ଅନୁମୋଦିତ ବ୍ରାଉଜର୍ ଅରିଜିନ୍ଗୁଡ଼ିକୁ ପ୍ରକ୍ସିରେ ନୁହେଁ, OmniRouteରେ (`CORS_ALLOWED_ORIGINS` କିମ୍ବା
Security ଟ୍ୟାବ୍) ସେଟ୍ କରନ୍ତୁ।

## ସୋର୍ସ ଫାଇଲ୍ଗୁଡ଼ିକ

| ବିଷୟ                                      | ଫାଇଲ୍                                                                |
| ----------------------------------------- | -------------------------------------------------------------------- |
| ଆଲାଉଲିଷ୍ଟ ରିଜୋଲ୍ୟୁସନ୍ + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| ମିଡଲ୍ୱେର୍ ପ୍ରୟୋଗ (ଏକମାତ୍ର ସତ୍ୟର ଉତ୍ସ)     | `src/server/authz/pipeline.ts`                                       |
| Settings → ରନ୍ଟାଇମ୍ ଅରିଜିନ୍ ଇଞ୍ଜେକ୍ସନ୍    | `src/lib/config/runtimeSettings.ts`                                  |
| ଡ୍ୟାସ୍ବୋର୍ଡ ପାଇଁ ରନ୍ଟାଇମ୍ ସ୍ଥିତି          | `src/app/api/settings/authz-inventory/route.ts`                      |
| ଡ୍ୟାସ୍ବୋର୍ଡ ଚେତାବନୀ ବ୍ୟାନର୍               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins ଫିଲ୍ଡ                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| ପ୍ରତି-ରୁଟ୍ Cloud-Agent CORS (ବ୍ୟତିକ୍ରମ)   | `src/lib/cloudAgent/api.ts`                                          |

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [ରୁଟ୍ ଗାର୍ଡ ସ୍ତରଗୁଡ଼ିକ](./ROUTE_GUARD_TIERS.md) — spawn-ସକ୍ଷମ ରୁଟ୍ଗୁଡ଼ିକ ପାଇଁ
  loopback ପ୍ରବର୍ତ୍ତନ (ଏକ ପୃଥକ, ପରିପୂରକ ନିୟନ୍ତ୍ରଣ)।
- [ପ୍ରାଧିକରଣ ମାର୍ଗଦର୍ଶିକା](../architecture/AUTHZ_GUIDE.md) — ସମ୍ପୂର୍ଣ୍ଣ auth ପାଇପ୍ଲାଇନ୍।
