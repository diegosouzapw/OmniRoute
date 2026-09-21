# Router Backends & Embedded Services — architecture contract (ADR) (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **ସ୍ଥିତି:** ଗୃହୀତ · **ପ୍ରସଙ୍ଗ:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **ଚୁକ୍ତି:** `domain/routing/routerBackends.ts`
> (ଟାଇପ୍ଯୁକ୍ତ ରେଜିଷ୍ଟ୍ରି — କୋଡ୍ଟି [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ସହିତ ଆସିବ)

ଏହି ADR, `ts` (ନେଟିଭ୍), `bifrost`, `cliproxy`, `9router`, ଏବଂ
VibeProxy-ସୁସଙ୍ଗତ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ ପରସ୍ପର ସହିତ କିପରି ସମ୍ପର୍କିତ ତାହା ସ୍ପଷ୍ଟ କରେ, ଯାହାଦ୍ୱାରା ଅବଦାନକାରୀମାନେ
ସ୍ଥାପତ୍ୟଗତ ଭାବରେ ପୃଥକ ଦୁଇଟି ବିଷୟକୁ ଏକ ବୋଲି ଭୁଲ୍ କରିବେ ନାହିଁ। ଏହା router-backend-registry କାର୍ଯ୍ୟ ଦ୍ୱାରା ପ୍ରବର୍ତ୍ତିତ ଟାଇପ୍ଯୁକ୍ତ
ରେଜିଷ୍ଟ୍ରିକୁ ସେହି ମଡେଲ୍ ପାଇଁ ସତ୍ୟର ଏକମାତ୍ର ଉତ୍ସ ଭାବେ ଦଲିଲଭୁକ୍ତ କରେ।

## ମୂଳ ପାର୍ଥକ୍ୟ — ଦୁଇଟି ପରସ୍ପର ସ୍ୱାଧୀନ ଅକ୍ଷ

ଏକ ଇଞ୍ଜିନ୍ର ଭୂମିକାକୁ **ଦୁଇଟି ସ୍ୱାଧୀନ ଅକ୍ଷ** ଦ୍ୱାରା ବର୍ଣ୍ଣନା କରାଯାଏ, ଯାହାକୁ ରେଜିଷ୍ଟ୍ରିର
`RouterBackendDefinition` ମଧ୍ୟରେ ଏକାଠି ଏନ୍କୋଡ୍ କରାଯାଇଛି:

1. **ଜୀବନଚକ୍ର** (`RouterBackendLifecycle`) — _ଇଞ୍ଜିନ୍ଟି କିପରି ଚାଲେ_:
   - `in-process` — OmniRoute Node ପ୍ରକ୍ରିୟା ଭିତରେ ଚାଲେ (ନେଟିଭ୍ TS ପାଇପ୍ଲାଇନ୍)।
   - `supervised` — ଏକ ସ୍ଥାନୀୟ ଚାଇଲ୍ଡ ପ୍ରକ୍ରିୟା, ଯାହାକୁ OmniRoute
     `ServiceSupervisor` ମାଧ୍ୟମରେ ଇନ୍ଷ୍ଟଲ୍/ଆରମ୍ଭ/ବନ୍ଦ/ସ୍ୱାସ୍ଥ୍ୟ-ଯାଞ୍ଚ କରେ, ଏବଂ ପରେ ଏକ ପ୍ରଦାତା ସଂଯୋଗ ଭାବେ ବ୍ୟବହାର କରେ।
   - `external` — ଏକ HTTP ଏଣ୍ଡପଏଣ୍ଟ ଯାହାକୁ OmniRoute ଡିସ୍ପ୍ୟାଚ୍ କରେ, କିନ୍ତୁ ପରିଚାଳନା କରେ **ନାହିଁ**
     (ଏକ env ବେସ୍ URL ଦ୍ୱାରା ବିନ୍ୟାସିତ)।
   - `disabled` — ପଞ୍ଜୀକୃତ, କିନ୍ତୁ ଚୟନଯୋଗ୍ୟ ନୁହେଁ।
2. **ଚୟନ ଅକ୍ଷ** (ରିଲେ ରାଉଟିଂ ବ୍ୟାକେଣ୍ଡ) — _ରିଲେ ଏହାକୁ ଡିସ୍ପ୍ୟାଚ୍ କରେ କି ନାହିଁ_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` ଏଠାରେ
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`।

ଯେଉଁ ଭୁଲ୍ଟି ଏଡ଼ାଇବା ଆବଶ୍ୟକ: "ଏମ୍ବେଡେଡ୍ ସେବା" ଏବଂ "ରାଉଟିଂ ବ୍ୟାକେଣ୍ଡ"କୁ ଗୋଟିଏ
ତାଲିକା ଭାବେ ବିବେଚନା କରିବା। ସେଗୁଡ଼ିକ ଏକ ନୁହେଁ। ଏକ `supervised` ଇଞ୍ଜିନ୍ (9router/cliproxy) ହେଉଛି **ନେଟିଭ୍ ପାଇପ୍ଲାଇନ୍ ଦ୍ୱାରା
ବ୍ୟବହୃତ ଏକ ପ୍ରଦାତା ସଂଯୋଗ**, କୌଣସି ବିକଳ୍ପ ରିଲେ ଡିସ୍ପ୍ୟାଚ୍
ବ୍ୟାକେଣ୍ଡ ନୁହେଁ। `bifrost` ଏହାର ବିପରୀତ — ଏକ ରିଲେ ଡିସ୍ପ୍ୟାଚ୍ ବ୍ୟାକେଣ୍ଡ, ଯାହା (ଐତିହାସିକ ଭାବେ)
କେବଳ `external` ଥିଲା।

## ରେଜିଷ୍ଟ୍ରି — ସତ୍ୟର ଏକମାତ୍ର ଉତ୍ସ

`domain/routing/routerBackends.ts` ଚୁକ୍ତି (କୋଡ୍ଟି
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) ସହିତ ଆସିବ) ପ୍ରତ୍ୟେକ ଇଞ୍ଜିନ୍କୁ ଏହାର
ଜୀବନଚକ୍ର, କ୍ଷମତା, ସେବା ପରିଚୟ, ଡିଫଲ୍ଟ ପୋର୍ଟ, ସ୍ୱାସ୍ଥ୍ୟ ବିନ୍ୟାସ, ଏବଂ
ଟେଲିମେଟ୍ରି ସମର୍ଥନ ସହିତ କେବଳ ଥରେ ଘୋଷଣା କରେ। ପ୍ରତ୍ୟେକ ସାଇଡ୍କାର୍ ପାଇଁ
ବିଶେଷ-କେସ୍ ଲେଖିବା ପରିବର୍ତ୍ତେ ଉପଭୋକ୍ତାମାନେ `getRouterBackend(id)`,
`listRouterBackends()`, ଏବଂ `listRouterBackendsByCapability(cap)` ମାଧ୍ୟମରେ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକୁ ଖୋଜନ୍ତି।

| ବ୍ୟାକେଣ୍ଡ   | ଜୀବନଚକ୍ର     | ସେବା (ଅକ୍ଷ A) | ରିଲେ ବ୍ୟାକେଣ୍ଡ (ଅକ୍ଷ B) | ସ୍ୱାସ୍ଥ୍ୟ     | ଡିଫଲ୍ଟ ପୋର୍ଟ |
| ----------- | ------------ | ------------- | ----------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —             | `ts` (ନେଟିଭ୍)           | —             | —            |
| `bifrost`   | `external`¹  | —¹            | `bifrost` / `auto`      | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`    | — (ପ୍ରଦାତା)             | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`     | — (ପ୍ରଦାତା)             | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —             | — (ପ୍ରଦାତା ଆଡାପ୍ଟର୍)    | `/v1/models`  | —            |

¹ Bifrostକୁ ଏକ `supervised` ଏମ୍ବେଡେଡ୍ ସେବାକୁ ପଦୋନ୍ନତି କରିବା (ଯାହାକୁ
`/api/services/bifrost/`ରୁ ଇନ୍ଷ୍ଟଲ୍/ଆରମ୍ଭ କରାଯାଇପାରିବ)
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)ରେ ଟ୍ରାକ୍ କରାଯାଉଛି; ଏହା ମର୍ଜ୍ ହେବା ପର୍ଯ୍ୟନ୍ତ,
Bifrost କେବଳ `external` ଅଟେ (କେବଳ `BIFROST_BASE_URL` ମାଧ୍ୟମରେ ପହଞ୍ଚଯୋଗ୍ୟ)।

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) କଲର୍ମାନଙ୍କୁ
ପ୍ରତ୍ୟେକ id ପାଇଁ ଶାଖାଗୁଡ଼ିକୁ ହାର୍ଡ-କୋଡ୍ କରିବା ପରିବର୍ତ୍ତେ, ଏକ ଇଞ୍ଜିନ୍ ବାସ୍ତବରେ କ'ଣ କରିପାରେ ତାହା ଆଧାରରେ
ଫିଲ୍ଟର୍ କରିବାକୁ ଦେଇଥାଏ।

## ଅକ୍ଷ A — ଏମ୍ବେଡେଡ୍ ସେବାଗୁଡ଼ିକ (ପର୍ଯ୍ୟବେକ୍ଷିତ ପ୍ରକ୍ରିୟା ପାର୍ଶ୍ୱ)

- **ପର୍ଯ୍ୟବେକ୍ଷିତ ପ୍ରକ୍ରିୟାଗୁଡ଼ିକର ରେଜିଷ୍ଟ୍ରି:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (ବର୍ତ୍ତମାନ: `9router`, `cliproxy`)।
- **ଲାଇଫସାଇକେଲ୍ ମାଲିକ:** `src/lib/services/ServiceSupervisor.ts` — `start()` ଚାଇଲ୍ଡ
  ପ୍ରକ୍ରିୟାକୁ ସ୍ପନ୍ କରେ, `waitForHealthy()` ଉପରେ ଗେଟ୍ କରେ, stdout/stderrକୁ ଏକ ରିଙ୍ଗ୍ ବଫର୍ରେ ଧରେ;
  `stop()` SIGTERM→SIGKILL; ସବୁକିଛି ଏକ ଲକ୍ ଅଧୀନରେ କ୍ରମିକ ଭାବେ ପରିଚାଳିତ ହୁଏ।
- **ଷ୍ଟେଟ୍ ୟୁନିଅନ୍** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, ଏବଂ ଏହା ସହିତ ଏକ
  ସ୍ୱାଧୀନ `HealthState = healthy | unhealthy | unknown`।
- **ଏକ ପୃଥକ ପ୍ରକ୍ରିୟା କାହିଁକି (ଏକ ଇନ୍-ପ୍ରୋସେସ୍ SDK ନୁହେଁ)?** ପ୍ରକ୍ରିୟା ପୃଥକୀକରଣ ଦ୍ୱାରା
  ପ୍ରତ୍ୟେକ ସାଇଡ୍କାର୍ ପାଇଁ install/start/stop/health/logsକୁ ସ୍ୱାଧୀନ ଭାବେ ନିୟନ୍ତ୍ରଣ କରିବା ସମ୍ଭବ ହୁଏ ଏବଂ
  ଲୁପ୍ବ୍ୟାକ୍ ସ୍ପନ୍-ଗାର୍ଡ ପ୍ରୟୋଗ କରାଯାଇପାରେ। ଏକ ଇନ୍-ପ୍ରୋସେସ୍ ଆଡାପ୍ଟର୍ର ମଡେଲିଂ ଭବିଷ୍ୟତର କାର୍ଯ୍ୟ —
  `native-hot-path` କ୍ଷମତା ଫ୍ଲାଗ୍ରେ ଏହା ପ୍ରକାଶ କରାଯିବ।

### ଲାଇଫସାଇକେଲ୍ ରୁଟ୍ ଚୁକ୍ତି (`/api/services/<tool>/…`)

ସ୍ଥିତି କୋଡ୍ଗୁଡ଼ିକ **ଡିଜାଇନ୍ ଅନୁଯାୟୀ ଷ୍ଟେଟ୍/କ୍ରିୟା/ପଥ-ନିର୍ଦ୍ଦିଷ୍ଟ** — ଏହା ହେଉଛି ଚୁକ୍ତି, କୌଣସି
ଅସଙ୍ଗତି ନୁହେଁ:

| କଲ୍                           | ସର୍ତ୍ତ                              | ସ୍ଥିତି                               |
| ----------------------------- | ----------------------------------- | ------------------------------------ |
| `POST .../start`              | ସେବା `not_installed`                | **409** (ପୂର୍ବସର୍ତ୍ତ)                |
| `POST .../stop`               | ପୂର୍ବରୁ ବନ୍ଦ                        | **200** (ଆଇଡେମ୍ପୋଟେଣ୍ଟ ନୋ-ଅପ୍)       |
| `GET .../status`              | ଠିକ୍                                | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`              | ସ୍ପନ୍ ବିଫଳତା                        | **503** (ଅସ୍ଥାୟୀ)                    |
| `GET .../status`, `.../stop`  | ଧରାପଡ଼ିନଥିବା ତ୍ରୁଟି                 | **500**                              |
| `GET /api/services/<x>/logs`  | ଅଜଣା ଟୁଲ୍ `<x>`                     | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`   | `X-Reveal-Confirm: yes` ଅନୁପସ୍ଥିତ   | **403** (କେବଳ 9router)               |
| **ଯେକୌଣସି** `/api/services/*` | କଲର୍ ଲୁପ୍ବ୍ୟାକ୍/ପ୍ରାଇଭେଟ୍-LAN ନୁହେଁ | **403 LOCAL_ONLY**                   |

ସମସ୍ତ ତ୍ରୁଟି ବଡି `createErrorResponse()` ଦ୍ୱାରା →
`{ error: { message, type }, requestId }` ଆକାରରେ ଗଠିତ ହୁଏ, ଯେଉଁଠାରେ `type` ସ୍ଥିତିରୁ ନିର୍ଣ୍ଣୟ କରାଯାଏ
(`500→server_error`, `404→not_found`, `409→conflict`, ଅନ୍ୟଥା `invalid_request`) ଏବଂ ଏହା
ମେସିନ୍-କାର୍ଯ୍ୟଯୋଗ୍ୟ ପ୍ରଭେଦକ। ବାର୍ତ୍ତାଗୁଡ଼ିକ ପୂର୍ବରୁ ସାନିଟାଇଜ୍ କରାଯାଇଥାଏ
(`sanitizeErrorMessage()`, କଠୋର ନିୟମ #12)।

**ଲୁପ୍ବ୍ୟାକ୍ ଗାର୍ଡ** ହେଉଛି `403`ର ସବୁଠାରୁ ସାଧାରଣ ଉତ୍ସ: `/api/services/`
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`)ରେ ଅଛି ଏବଂ
`src/server/authz/policies/management.ts` ଯେକୌଣସି ନନ୍-ଲୁପ୍ବ୍ୟାକ୍ / ନନ୍-ପ୍ରାଇଭେଟ୍-LAN
କଲର୍କୁ **ପ୍ରମାଣୀକରଣ ପୂର୍ବରୁ** ପ୍ରତ୍ୟାଖ୍ୟାନ କରେ, କାରଣ ଏହି ରୁଟ୍ଗୁଡ଼ିକ ଚାଇଲ୍ଡ ପ୍ରକ୍ରିୟା ସ୍ପନ୍ କରନ୍ତି (କଠୋର ନିୟମ 15
ଏବଂ 17)। ଏକ ସାର୍ବଜନୀନ ଟନେଲ୍ ମାଧ୍ୟମରେ ସେଗୁଡ଼ିକୁ ପହଞ୍ଚିବା ଡିଜାଇନ୍ ଅନୁଯାୟୀ `403` ଦିଏ।

## ଅକ୍ଷ B — ରିଲେ ରାଉଟିଂ ବ୍ୟାକେଣ୍ଡ (ଡିସ୍ପାଚ୍ ପାର୍ଶ୍ୱ)

କେବଳ ରିଲେ ପ୍ରକ୍ସି ପଥ `/api/v1/relay/chat/completions` ଏକ ଡିସ୍ପାଚ୍
ବ୍ୟାକେଣ୍ଡ ବାଛେ; ମୁଖ୍ୟ `/api/v1/chat/completions` ପୃଷ୍ଠ `routingBackend.ts`କୁ
କେବେବି ବିଚାରକୁ ନିଏ ନାହିଁ।

- **ଚୟନ** (`resolveRelayRoutingBackend`): ଏକକ ଗ୍ଲୋବାଲ୍ env ଟଗଲ୍ —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}।
  ସେଟ୍ କରାଯାଇନଥିଲେ, Bifrost ବିନ୍ୟାସିତ+ସକ୍ଷମ ଥିବାବେଳେ `auto`, ନଚେତ୍ `ts`।
- **ଆଚରଣ:**
  - `bifrost` (ବାଧ୍ୟତାମୂଳକ): Bifrost ବିଫଳତା → ସିଧାସଳଖ `502`, କୌଣସି ଫଲ୍ବ୍ୟାକ୍ ନାହିଁ।
  - `auto`: Bifrost ଚେଷ୍ଟା କରେ, ବିଫଳତା/କୁଲ୍ଡାଉନ୍ରେ ନିରବରେ ନେଟିଭ୍କୁ ଫଲ୍ ଥ୍ରୁ କରେ।
  - `ts` / ଫଲ୍ବ୍ୟାକ୍ ପରେ: ନେଟିଭ୍ `open-sse` ଟ୍ରାନ୍ସଲେଟର୍/ଏକ୍ସିକ୍ୟୁଟର୍ ପାଇପ୍ଲାଇନ୍।
- **କୁଲ୍ଡାଉନ୍:** `bifrostCooldown.ts`ରେ ପ୍ରତି-`baseUrl` ବିଫଳତା କୁଲ୍ଡାଉନ୍।

ଆଜି ରିଲେ ସ୍ତରରେ ଚୟନ **ସମ୍ପୂର୍ଣ୍ଣ-କିମ୍ବା-କିଛି-ନୁହେଁ** — `release/v3.8.43`ରେ କୌଣସି ପ୍ରତି-ପ୍ରଦାନକାରୀ
କିମ୍ବା ପ୍ରତି-ଅନୁରୋଧ ଇଞ୍ଜିନ୍ ସ୍ୱାପ୍ ନାହିଁ। ପ୍ରତି-ଅନୁରୋଧ ଗେଟ୍କୁ
ସାଇଡ୍କାର୍-ମାନିଫେଷ୍ଟ କାର୍ଯ୍ୟ ଦ୍ୱାରା ଯୋଡ଼ାଯାଉଛି
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) ମାନିଫେଷ୍ଟ +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
ଯାହା `auto`କୁ କେବଳ ମାନିଫେଷ୍ଟ-ଯୋଗ୍ୟ ପ୍ରଦାନକାରୀମାନଙ୍କୁ Bifrost ମାଧ୍ୟମରେ ରୁଟ୍ କରିବାକୁ ଦିଏ।

## ଡ୍ୟାସବୋର୍ଡ ସମନ୍ୱୟ

ସେବାଗୁଡ଼ିକର ଡ୍ୟାସବୋର୍ଡ
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` ମାଧ୍ୟମରେ ପ୍ରତି 5sରେ `GET /api/services/<tool>/status` ପୋଲ୍ କରେ,
ଏବଂ `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` ଫେରାଏ। କୌଣସି ସହଭାଗୀ ଉପଲବ୍ଧତା-କଣ୍ଟେକ୍ସ୍ଟ ପ୍ରଦାନକାରୀ ନାହିଁ —
ପ୍ରତ୍ୟେକ କମ୍ପୋନେଣ୍ଟ ପ୍ରତ୍ୟେକ ଟୁଲ୍ ପାଇଁ ହୁକ୍କୁ କଲ୍ କରେ। `!res.ok` ହେଲେ, ହୁକ୍ ବର୍ତ୍ତମାନ
କେବଳ `HTTP <status>` ଦେଖାଏ; `error.type` ଫିଲ୍ଡକୁ ମାନବ-ବୋଧଗମ୍ୟ ବ୍ୟାଖ୍ୟା ସହିତ ମ୍ୟାପ୍ କରିବା
ଏକ ଟ୍ରାକ୍ କରାଯାଇଥିବା UX ଉନ୍ନତି, ଚୁକ୍ତିର ପରିବର୍ତ୍ତନ ନୁହେଁ।

## ପରିଣାମ

- ନୂତନ ଇଞ୍ଜିନ୍ଗୁଡ଼ିକ `ROUTER_BACKENDS`ରେ ଥରେ ମାତ୍ର ପଞ୍ଜୀକୃତ ହୁଅନ୍ତି; ଉପଭୋକ୍ତାମାନେ ନୂତନ ପ୍ରତି-id ଶାଖା ବିନା କ୍ଷମତା
  କ୍ୱେରୀ ମାଧ୍ୟମରେ ସେଗୁଡ଼ିକୁ ପାଆନ୍ତି।
- "ଏହା ଏକ ସେବା ନା ଏକ ରାଉଟିଂ ବ୍ୟାକଏଣ୍ଡ?"ର ଉତ୍ତର `lifecycle` ଫିଲ୍ଡ ଦ୍ୱାରା ନିର୍ଦ୍ଧାରିତ ହୁଏ, କୌଣସି
  id କେଉଁ ତାଲିକାରେ ଦେଖାଯାଏ ତାହା ଦ୍ୱାରା ନୁହେଁ।
- Bifrost ପର୍ଯ୍ୟବେକ୍ଷଣ (#5817) ଏବଂ ନେଟିଭ୍ ହଟ୍-ପାଥ୍ ସ୍ଥାନାନ୍ତରଣ (#5670), ପ୍ରତ୍ୟେକ
  ସାଇଡ୍କାର୍କୁ ସ୍ୱତନ୍ତ୍ର ଭାବେ ବିଶେଷ-ନିୟନ୍ତ୍ରଣ କରିବା ପରିବର୍ତ୍ତେ, ଏହି ସହଭାଗୀ ଚୁକ୍ତି ଉପରେ ନିର୍ମିତ ହୁଏ।
