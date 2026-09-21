# Monitoring & Observability Guide (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute ଅନ୍ତର୍ନିହିତ ସ୍ୱାସ୍ଥ୍ୟ ନିରୀକ୍ଷଣ, ପ୍ରଦାତା ଅଟୋପାଇଲଟ୍, କୋଟା ଟ୍ରାକିଂ ଏବଂ ପର୍ଯ୍ୟବେକ୍ଷଣୀୟତା ହୁକ୍ ସହିତ ଆସେ। ଏହି ମାର୍ଗଦର୍ଶିକାରେ ଡ୍ୟାସ୍ବୋର୍ଡ, ସତର୍କତା ଏବଂ ସମସ୍ୟା ସମାଧାନ ବିଷୟ ଅନ୍ତର୍ଭୁକ୍ତ।

**ଉତ୍ସଗୁଡ଼ିକ:**

- `src/lib/monitoring/observability.ts` — ପର୍ଯ୍ୟବେକ୍ଷଣୀୟତା ସ୍ନାପ୍ସଟ୍
- `src/lib/monitoring/comboHealthAutopilot.ts` — କମ୍ବୋ ସ୍ୱାସ୍ଥ୍ୟ ଅଟୋପାଇଲଟ୍
- `src/lib/monitoring/providerHealthAutopilot.ts` — ପ୍ରଦାତା ଅଟୋପାଇଲଟ୍
- `src/lib/monitoring/providerHealthMatrix.ts` — ପ୍ରଦାତା ସ୍ୱାସ୍ଥ୍ୟ ମ୍ୟାଟ୍ରିକ୍ସ
- `src/lib/localHealthCheck.ts` — ସ୍ଥାନୀୟ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ
- `src/lib/tokenHealthCheck.ts` — ଟୋକନ୍ ରିଫ୍ରେଶ୍ ସ୍ୱାସ୍ଥ୍ୟ
- `src/lib/proxyHealth.ts` — ପ୍ରକ୍ସି ସ୍ୱାସ୍ଥ୍ୟ କ୍ୟାଶ୍ (PROXY_GUIDE.mdରେ ବର୍ଣ୍ଣିତ)

---

## ସାରାଂଶ

OmniRouteରେ **ନିରୀକ୍ଷଣର 3ଟି ସ୍ତର** ଅଛି:

```
┌──────────────────────────────────────────────────────────────┐
│  ସ୍ତର 1: ସିଷ୍ଟମ୍ ସ୍ୱାସ୍ଥ୍ୟ (ସର୍ଭର୍-ସ୍ତରୀୟ)                 │
│  ├─ localHealthCheck.ts — DB, ପୋର୍ଟ, ନେଟିଭ୍ ନିର୍ଭରଶୀଳତା     │
│  ├─ db/healthCheck.ts — ଅଖଣ୍ଡତା, FK, ଅନାଥ ଆର୍ଟିଫ୍ୟାକ୍ଟ      │
│  └─ ଡ୍ୟାସ୍ବୋର୍ଡ: /dashboard/health                          │
├──────────────────────────────────────────────────────────────┤
│  ସ୍ତର 2: ପ୍ରଦାତା ସ୍ୱାସ୍ଥ୍ୟ (ପ୍ରତି-ପ୍ରଦାତା ସହନଶୀଳତା)        │
│  ├─ providerHealthAutopilot.ts — ସର୍କିଟ୍ ବ୍ରେକର୍, କୁଲ୍ଡାଉନ୍ │
│  ├─ providerHealthMatrix.ts — ପ୍ରଦାତା/ମଡେଲ୍ ଅନୁଯାୟୀ ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର୍ │
│  └─ ଡ୍ୟାସ୍ବୋର୍ଡ: /dashboard/providers                       │
├──────────────────────────────────────────────────────────────┤
│  ସ୍ତର 3: ଲାଇଭ୍ ପର୍ଯ୍ୟବେକ୍ଷଣୀୟତା (ରନ୍ଟାଇମ୍ ସ୍ନାପ୍ସଟ୍)     │
│  ├─ observability.ts — ସର୍କିଟ୍ ବ୍ରେକର୍, ସେସନ୍, କୋଟା          │
│  ├─ tokenHealthCheck.ts — OAuth ଟୋକନ୍ ରିଫ୍ରେଶ୍ ସ୍ୱାସ୍ଥ୍ୟ    │
│  └─ MCP ଟୁଲ୍: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## ଡ୍ୟାସ୍ବୋର୍ଡ ପୃଷ୍ଠାଗୁଡ଼ିକ

### `/dashboard/health` (ସିଷ୍ଟମ୍ ସ୍ୱାସ୍ଥ୍ୟ)

ଶୀର୍ଷ-ସ୍ତରୀୟ ସ୍ୱାସ୍ଥ୍ୟ ଡ୍ୟାସ୍ବୋର୍ଡ ଏଗୁଡ଼ିକ ଦେଖାଏ:

| ବିଭାଗ                 | ଏହା କ’ଣ ଦେଖାଏ                                    |
| --------------------- | ------------------------------------------------ |
| **ସର୍ଭର୍ ସ୍ଥିତି**     | ଅପ୍ଟାଇମ୍, ଭର୍ସନ୍, ପୋର୍ଟ, ସକ୍ରିୟ ସଂଯୋଗ            |
| **ଡାଟାବେସ୍**          | ସଂଯୋଗ, ଅଖଣ୍ଡତା, WAL ଆକାର, ସାମ୍ପ୍ରତିକ ମାଇଗ୍ରେସନ୍  |
| **ପ୍ରଦାତା ସାରାଂଶ**    | ସକ୍ରିୟ ସଂଖ୍ୟା, ସୁସ୍ଥ ସଂଖ୍ୟା, ଖୋଲା ବ୍ରେକର୍ ସଂଖ୍ୟା |
| **କୋଟା ମନିଟର୍**       | ସକ୍ରିୟ ସେସନ୍, ସତର୍କତା ଜାରି, ନିଃଶେଷିତ             |
| **ସାମ୍ପ୍ରତିକ ତ୍ରୁଟି** | ଷ୍ଟାକ୍ ଟ୍ରେସ୍ ସହିତ ଶେଷ 10ଟି ତ୍ରୁଟି               |
| **ସମ୍ବଳ ବ୍ୟବହାର**     | ମେମୋରି, CPU, ହିପ୍ ଚାପ ସୂଚକ                       |

### `/dashboard/providers` (ପ୍ରଦାତା ସ୍ୱାସ୍ଥ୍ୟ)

ପ୍ରତି-ପ୍ରଦାତା ଡ୍ୟାସ୍ବୋର୍ଡ:

| ସ୍ତମ୍ଭ       | ବର୍ଣ୍ଣନା                                   |
| ------------ | ------------------------------------------ |
| ପ୍ରଦାତା      | ପ୍ରଦାତା ID + ପ୍ରଦର୍ଶନ ନାମ                  |
| ସ୍ୱାସ୍ଥ୍ୟ    | ସବୁଜ/ହଳଦିଆ/ଲାଲ୍ ସ୍ଥିତି                     |
| ସର୍କିଟ୍      | ଖୋଲା/ବନ୍ଦ/ଅର୍ଦ୍ଧ-ଖୋଲା ସ୍ଥିତି               |
| ସଂଯୋଗଗୁଡ଼ିକ  | ସଂଯୋଗ ସଂଖ୍ୟା, ଶେଷ ରିଫ୍ରେଶ୍                 |
| ମଡେଲ୍ଗୁଡ଼ିକ  | ଉପଲବ୍ଧ ମଡେଲ୍, ପ୍ରତି ମଡେଲ୍ର ସ୍ୱାସ୍ଥ୍ୟ       |
| ଖର୍ଚ୍ଚ       | ଆଜିର ଖର୍ଚ୍ଚ, 7-ଦିନର ଧାରା                   |
| ତ୍ରୁଟିଗୁଡ଼ିକ | ଗତ 24hର ତ୍ରୁଟି ସଂଖ୍ୟା, ଶୀର୍ଷ ତ୍ରୁଟି ଶ୍ରେଣୀ |

ଏଗୁଡ଼ିକ ଦେଖିବା ପାଇଁ ଜଣେ ପ୍ରଦାତାଙ୍କୁ କ୍ଲିକ୍ କରନ୍ତୁ:

- ବିଳମ୍ବ ବିଭାଜନ ସହିତ ସାମ୍ପ୍ରତିକ ଅନୁରୋଧଗୁଡ଼ିକ
- ପ୍ରତି-ସଂଯୋଗ ସ୍ୱାସ୍ଥ୍ୟ ସ୍କୋର୍
- ପ୍ରତି-ମଡେଲ୍ ଲକ୍ଆଉଟ୍
- ଅଟୋପାଇଲଟ୍ ସୁପାରିସଗୁଡ଼ିକ

### `/dashboard/quota` (କୋଟା ଟ୍ରାକିଂ)

ପ୍ରତ୍ୟେକ API କୀ ପାଇଁ:

- ବର୍ତ୍ତମାନର ବ୍ୟବହାର ବନାମ ସୀମା (ପ୍ରଗତି ବାର୍)
- କୋଟା ଧାରା (30-ଦିନର ଚାର୍ଟ)
- ପରବର୍ତ୍ତୀ ରିସେଟ୍ ସମୟ
- ସତର୍କତା ଇତିହାସ

### `/dashboard/combos` (କମ୍ବୋ ସ୍ୱାସ୍ଥ୍ୟ)

ପ୍ରତି-କମ୍ବୋ:

- କୌଶଳ + ଲକ୍ଷ୍ୟଗୁଡ଼ିକ
- ପ୍ରତି ଲକ୍ଷ୍ୟର ସ୍ୱାସ୍ଥ୍ୟ
- ସାମ୍ପ୍ରତିକ ଫଲ୍ବ୍ୟାକ୍ ଘଟଣାଗୁଡ଼ିକ
- ସଫଳତା ହାର (24h, 7d, 30d)

---

## ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ API

OmniRoute **ଦୁଇଟି** HTTP ସ୍ୱାସ୍ଥ୍ୟ ଇଣ୍ଟରଫେସ୍ ପ୍ରଦାନ କରେ। ଅର୍କେଷ୍ଟ୍ରେଟର୍ଗୁଡ଼ିକ ପାଇଁ ସେଗୁଡ଼ିକ ପରସ୍ପର ବଦଳଯୋଗ୍ୟ ନୁହେଁ।

| ପଥ                           | ଉଦ୍ଦେଶ୍ୟ                                                       | ଭାର                                   | ଏଥିପାଇଁ ବ୍ୟବହାର କରନ୍ତୁ                                                      |
| ---------------------------- | -------------------------------------------------------------- | ------------------------------------- | --------------------------------------------------------------------------- |
| `GET /healthz`               | ଜୀବନଚକ୍ର ସକ୍ରିୟତା/ପ୍ରସ୍ତୁତି (`ok` / `starting` / `stopping`)   | ଅତ୍ୟନ୍ତ ହାଲୁକା (କେବଳ ପର୍ଯ୍ୟାୟ ଫ୍ଲାଗ୍) | Kubernetes **ପ୍ରସ୍ତୁତି**; HTTP ବ୍ୟବହାର କରିବା ଆବଶ୍ୟକ ହେଲେ ନମନୀୟ **ସକ୍ରିୟତା** |
| `GET /api/monitoring/health` | ଗଭୀର ସିଷ୍ଟମ୍ + ପ୍ରଦାନକାରୀ ସାରାଂଶ (DB, heap, କ୍ୟାଟାଲଗ୍ ଗଣନା, …) | ଭାରୀ (ସମକାଳୀନ DB / ନିରୀକ୍ଷଣ କାର୍ଯ୍ୟ)  | ଡ୍ୟାଶବୋର୍ଡ, ବ୍ଲାକ୍ବକ୍ସ ଗଭୀର ଯାଞ୍ଚ, Dockerର ଅନ୍ତର୍ନିହିତ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ      |

> **ଟିପ୍ପଣୀ:** ପ୍ରଦାନକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ମ୍ୟାଟ୍ରିକ୍ସ, ଅଟୋପାଇଲଟ୍ ସମସ୍ୟା, କୋଟା ନିରୀକ୍ଷକ, ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ ଏବଂ `/api/monitoring/health`ର ସୀମା ବାହାରେ ଥିବା ବିଳମ୍ବତା ବିବରଣୀ **MCP ଟୁଲ୍** `observability_snapshot` କିମ୍ବା **ଡ୍ୟାଶବୋର୍ଡ** ପୃଷ୍ଠାଗୁଡ଼ିକ ମାଧ୍ୟମରେ ଉପଲବ୍ଧ — ଏଗୁଡ଼ିକ ପାଇଁ କୌଣସି ଉତ୍ସର୍ଗୀକୃତ REST ରୁଟ୍ ନାହିଁ।

ଉଭୟ ରୁଟ୍ ଅନୁରୋଧ ପରିଚାଳନା ସହିତ **ସମାନ Node event loop**ରେ ଚାଲେ। ଏକ CPU-ନିର୍ଭରଶୀଳ ପଥ (ବଡ଼ `GET /v1/models` କ୍ୟାଟାଲଗ୍ କାର୍ଯ୍ୟ, ଦୀର୍ଘ-ପ୍ରସଙ୍ଗ ସଂକୋଚନ / ଟୋକନ୍ ଗଣନା) `/healthz` ସମେତ **ସମସ୍ତ** HTTP ହ୍ୟାଣ୍ଡଲର୍କୁ ବିଳମ୍ବିତ କରିପାରେ। ବ୍ୟସ୍ତ event-loop ≠ ବନ୍ଦ ପ୍ରକ୍ରିୟା। ସମ୍ବଳ-ଗ୍ରାସୀ କାର୍ଯ୍ୟଟିକୁ ସମାଧାନ କରିବାକୁ ପ୍ରାଥମ୍ୟ ଦିଅନ୍ତୁ; ପ୍ରୋବ୍ ଟ୍ୟୁନିଂ କେବଳ ଭୁଲ୍ରେ ପ୍ରକ୍ରିୟା ବନ୍ଦ ହେବାକୁ କମାଏ।

### ହାଲୁକା ଅର୍କେଷ୍ଟ୍ରେଟର୍ ପ୍ରୋବ୍

```bash
GET /healthz
# କିମ୍ବା HEAD /healthz
```

- ସର୍ଭରର ଜୀବନଚକ୍ର ପର୍ଯ୍ୟାୟ ପ୍ରସ୍ତୁତ ଥିବାବେଳେ **200** + ବଡି `ok`
- ବୁଟ୍ କିମ୍ବା ବନ୍ଦ ହେବା ସମୟରେ **503** + `starting` / `stopping`
- କାର୍ଯ୍ୟାନ୍ୱୟନ: `src/app/healthz/route.ts` (କୌଣସି DB ପିଙ୍ଗ୍ ନାହିଁ)

### ସିଷ୍ଟମ୍ ସ୍ୱାସ୍ଥ୍ୟ (ଗଭୀର)

```bash
GET /api/monitoring/health
```

ପ୍ରତିକ୍ରିୟା:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: ପ୍ରୋବ୍-କ୍ୟାଶ୍ ବନାମ SQLite `test_status`

`GET /api/monitoring/health` → `credentialHealth` ହେଉଛି **ଇନ୍-ମେମୋରି ପ୍ରୋବ୍-କ୍ୟାଶ୍
ଗେଜ୍**, `provider_connections.test_status`ର ଲାଇଭ୍ ଡମ୍ପ୍ ନୁହେଁ। #12532 ପରେ
ଅନୁରୋଧ ପଥ କେବଳ `getCachedCredentialHealthSummary()` ପଢ଼େ; ପୃଷ୍ଠଭୂମି ପ୍ରୋବ୍ଗୁଡ଼ିକ
event loop ବାହାରେ କ୍ୟାଶ୍କୁ ସତେଜ କରନ୍ତି।

| ସ୍ତର                 | କେଉଁଠାରେ                                                              | ଏହାର ଅର୍ଥ                                                                                                                                                                                                            |
| -------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ପ୍ରୋବ୍-କ୍ୟାଶ୍ ଗେଜ୍   | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | ପ୍ରକ୍ରିୟା ମେମୋରିରେ ଏପର୍ଯ୍ୟନ୍ତ ଥିବା ସର୍ବଶେଷ କ୍ରେଡେନ୍ସିଆଲ୍-ସ୍ୱାସ୍ଥ୍ୟ ପ୍ରୋବ୍ ଫଳାଫଳ। `source` ସର୍ବଦା `probe-cache` ଅଟେ।                                                                                                  |
| ବିଫଳ କନେକ୍ସନ୍ ବିବରଣୀ | `credentialHealth.failedConnections`                                  | **କେବଳ `failed > 0` ହେଲେ** ଉପସ୍ଥିତ ରହେ। `status=error` ଥିବା କ୍ୟାଶ୍ ଧାଡ଼ିଗୁଡ଼ିକର ସୀମିତ ତାଲିକା (`connectionId`, `status`, ପରିଷ୍କୃତ `lastError` / `lastErrorType`)। ତାଲିକାଟି ସୀମିତ କରାଯାଇଥିଲେ `failedOmitted` ସେଟ୍ ହୁଏ। |
| SQLite ସ୍ଥାୟୀ ସ୍ଥିତି | `credentialHealth.staleDbNonOkCount`                                  | ଯେଉଁ **ସକ୍ରିୟ** (`is_active=1`) କନେକ୍ସନ୍ ଧାଡ଼ିଗୁଡ଼ିକର ସ୍ଥାୟୀ `test_status` ଏକ ଜଣାଶୁଣା ଅଣ-ok ସ୍ଥିତି (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`), ସେଗୁଡ଼ିକର ସଂଖ୍ୟା।              |

ଦୁଇଟି ସ୍ତର ଉଦ୍ଦେଶ୍ୟମୂଳକ ଭାବେ ଭିନ୍ନ ହୋଇପାରେ:

- ଗେଜ୍ `failed=0`, ଯେତେବେଳେ `staleDbNonOkCount>0` — SQLiteରେ ଏପର୍ଯ୍ୟନ୍ତ ଏକ ସ୍ଥାୟୀ
  `test_status` (ଉଦାହରଣ ସ୍ୱରୂପ `expired` କିମ୍ବା `credits_exhausted`) ରହିଛି, ଯାହାକୁ ସର୍ବଶେଷ
  ପ୍ରୋବ୍-କ୍ୟାଶ୍ ସ୍ନାପ୍ଶଟ୍ `status=error` ଭାବେ ଗଣନା କରେନାହିଁ।
- ଗେଜ୍ `failed>0`, ଯେତେବେଳେ SQLite ସୁସ୍ଥ ଦେଖାଯାଏ — ଏକ ସାମ୍ପ୍ରତିକ ପ୍ରୋବ୍ ବିଫଳ ହୋଇଛି ଏବଂ
  କ୍ୟାଶ୍ରେ ଅଛି; DB ଧାଡ଼ିଟି ଅପଡେଟ୍ ହୋଇନାହିଁ, କିମ୍ବା ପରେ ସଫା କରାଯାଇଛି।

ଏହି ଏଣ୍ଡପଏଣ୍ଟରୁ ତଥ୍ୟ ସଂଗ୍ରହ କରିବାବେଳେ କେବଳ `provider_connections.test_status` ଆଧାରରେ
ସତର୍କବାର୍ତ୍ତା ଦିଅନ୍ତୁ ନାହିଁ। ଲାଇଭ୍ ପ୍ରୋବ୍ ବିଫଳତା ପାଇଁ `failed` + `failedConnections` ବ୍ୟବହାର କରନ୍ତୁ, ଏବଂ
ସ୍ଥାୟୀ ସ୍ଥିତିର ସଂଖ୍ୟା ଆବଶ୍ୟକ ହେଲେ `staleDbNonOkCount` ବ୍ୟବହାର କରନ୍ତୁ।

### Kubernetes ପ୍ରୋବ୍ ସୁପାରିସଗୁଡ଼ିକ

OmniRoute ଏକ **ଏକକ Node ପ୍ରକ୍ରିୟା** (ଗୋଟିଏ event loop)। ମାନକ Docker `HEALTHCHECK` ହାଲୁକା `/healthz`କୁ ଲକ୍ଷ୍ୟ କରେ। kubelet ସକ୍ରିୟତା ଯାଞ୍ଚ ବ୍ୟବଧାନ ପାଇଁ `/api/monitoring/health` **ଅତ୍ୟଧିକ ଭାରୀ**।

| ପ୍ରୋବ୍                   | ସୁପାରିଶ କରାଯାଇଥିବା ଲକ୍ଷ୍ୟ                                                        | ଟିପ୍ପଣୀ                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ଷ୍ଟାର୍ଟଅପ୍**           | ଦୀର୍ଘ `failureThreshold` (କିମ୍ବା ବଡ଼ `startPeriod`) ସହିତ HTTP `GET /healthz`     | କୋଲ୍ଡ ଷ୍ଟାର୍ଟ + SQLite ମାଇଗ୍ରେସନ୍ କିଛି ସେକେଣ୍ଡରୁ ଅଧିକ ସମୟ ନେଇପାରେ                                                                                                                                                                                                                                                                                                                                                  |
| **ପ୍ରସ୍ତୁତି**            | HTTP `GET /healthz`                                                              | ଲାଇଫ୍ସାଇକଲ୍ `ok` / `starting` / `stopping` (200 ବନାମ 503)। ଲୁପ୍ଟି CPU ଦ୍ୱାରା ବ୍ଲକ୍ ହେଲେ ଏହା ତଥାପି ବାରମ୍ବାର ସ୍ଥିତି ବଦଳାଏ। **ଏକାଧିକ ସେକେଣ୍ଡ ପରେ ମିଳୁଥିବା 200 ସୁସ୍ଥତାର ସୂଚକ ନୁହେଁ** (#10303) — ଏହାର ଅର୍ଥ 3-byte ହ୍ୟାଣ୍ଡଲର୍ ଚାଲିବା ପୂର୍ବରୁ ଇଭେଣ୍ଟ ଲୁପ୍ ସମ୍ବଳରୁ ବଞ୍ଚିତ ଥିଲା                                                                                                                                             |
| **ସଜୀବତା**               | HTTP `GET /livez`, **କିମ୍ବା ମୁଖ୍ୟ ସେବା ପୋର୍ଟ (`PORT`, ଡିଫଲ୍ଟ `20128`) ଉପରେ TCP** | `/livez` କେବଳ ପ୍ରୋସେସ୍ଟି ସଜୀବ ଅଛି କି ନାହିଁ ଦର୍ଶାଏ (ହ୍ୟାଣ୍ଡଲର୍ ଚାଲିଲେ ସର୍ବଦା 200)। ଏହା ତଥାପି ସେହି ଇଭେଣ୍ଟ ଲୁପ୍ ସହଭାଗ କରେ — ବ୍ୟସ୍ତ ≠ ମୃତ, ଏବଂ ଏହା TCP ଅପେକ୍ଷା ଇଭେଣ୍ଟ-ଲୁପ୍ ସମ୍ବଳ ଅଭାବକୁ (#10303) ଅଧିକ ଭଲ ଭାବରେ ଚିହ୍ନଟ କରେ ନାହିଁ। କ୍ୟାଟାଲଗ୍/କମ୍ପ୍ରେସନ୍ ଲୋଡ୍ ସମୟରେ HTTP ପ୍ରୋବ୍ଗୁଡ଼ିକର ସମୟସୀମା ଶେଷ ହେଲେ **TCP**କୁ ପ୍ରାଥମିକତା ଦିଅନ୍ତୁ; ଯେକୌଣସି କ୍ଷେତ୍ରରେ ସ୍ୱଳ୍ପକାଳୀନ ଇଭେଣ୍ଟ-ଲୁପ୍ ସ୍ଥଗିତତା ପାଇଁ ପଡ୍କୁ ବନ୍ଦ **କରନ୍ତୁ ନାହିଁ** |
| **ଗଭୀର ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ** | ବାହ୍ୟ ଯାଞ୍ଚକାରୀରୁ `GET /api/monitoring/health`                                   | kubelet `livenessProbe` / କଠୋର `readinessProbe` ପାଇଁ ନୁହେଁ                                                                                                                                                                                                                                                                                                                                                         |

ଉଦାହରଣ ଢାଞ୍ଚା (ଆପଣଙ୍କ କୋଲ୍ଡ-ଷ୍ଟାର୍ଟ ଏବଂ କମ୍ପ୍ରେସନ୍ ଲୋଡ୍ ଅନୁଯାୟୀ ଥ୍ରେସହୋଲ୍ଡଗୁଡ଼ିକୁ ସମନ୍ୱୟ କରନ୍ତୁ):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # ଇଭେଣ୍ଟ-ଲୁପ୍ ସ୍ଥଗିତତା ସମୟରେ HTTP /livezର ସମୟସୀମା ତଥାପି ଶେଷ ହୋଇପାରେ। TCP ହେଉଛି
  # ରକ୍ଷଣଶୀଳ ବିକଳ୍ପ:
  # tcpSocket:
  #   port: http
```

kubelet **ସଜୀବତା**କୁ `/api/monitoring/health` ଆଡ଼କୁ ନିର୍ଦ୍ଦେଶ **କରନ୍ତୁ ନାହିଁ**। ସେହି ପଥ ବାସ୍ତବ DB/ମନିଟରିଂ କାର୍ଯ୍ୟ କରେ ଏବଂ ଲୋଡ୍ ସମୟରେ ଭୁଲ୍-ପଜିଟିଭ୍ ଫଳ ଦେବ।

ସମ୍ବନ୍ଧିତ: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (ଇଭେଣ୍ଟ ଲୁପ୍ ବ୍ୟସ୍ତ ଥିବାବେଳେ ପ୍ରୋବ୍ଗୁଡ଼ିକ), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (କ୍ୟାଟାଲଗ୍ ମୂଲ୍ୟ ନିର୍ଦ୍ଧାରଣର ଅତ୍ୟଧିକ ସମ୍ବଳ ବ୍ୟବହାର), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (କମ୍ପ୍ରେସନ୍ ଟୋକନ୍-ଗଣନାର ଅତ୍ୟଧିକ ସମ୍ବଳ ବ୍ୟବହାର)।

### ଇଚ୍ଛାଧୀନ ଅନୁରୋଧ-ପଥ କାର୍ଯ୍ୟ (ମେମୋରି, ସ୍କିଲ୍, ଟୋକନ୍ ରିଫ୍ରେଶ୍)

ମେମୋରି ଏକ୍ସଟ୍ରାକ୍ସନ୍, ସ୍କିଲ୍ ଇଞ୍ଜେକ୍ସନ୍ ଏବଂ OAuth ଟୋକନ୍ ରିଫ୍ରେଶ୍ `/healthz` ସହିତ **ମୁଖ୍ୟ Node ଇଭେଣ୍ଟ ଲୁପ୍** ସହଭାଗ କରନ୍ତି। ସେଗୁଡ଼ିକ ଡ୍ୟାସବୋର୍ଡ-ଟଗଲ୍ ବୈଶିଷ୍ଟ୍ୟ (`memoryEnabled`, `skillsEnabled`), ୱାର୍କର୍ ପୁଲ୍ ନୁହେଁ। [ପରିବେଶ — ଇଭେଣ୍ଟ-ଲୁପ୍ ଖର୍ଚ୍ଚ](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349) ଦେଖନ୍ତୁ।

### ପ୍ରଦାନକାରୀ ସ୍ୱାସ୍ଥ୍ୟ

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** ପ୍ରଦାନକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ଡାଟା MCP ଟୁଲ୍ `observability_snapshot` କିମ୍ବା ଡ୍ୟାସବୋର୍ଡର `/dashboard/providers` ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଉପଲବ୍ଧ।

### ପ୍ରଦାନକାରୀ ବିବରଣୀ

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀଙ୍କ ବିବରଣୀ ଡ୍ୟାସବୋର୍ଡର `/dashboard/providers` ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଉପଲବ୍ଧ।

---

## ପ୍ରଦାନକାରୀ ସ୍ୱାସ୍ଥ୍ୟ ଅଟୋପାଇଲଟ୍

`providerHealthAutopilot.ts` ମଡ୍ୟୁଲ୍ ହେଉଛି ଏକ **ସ୍ୱୟଂ-ମରାମତି ବ୍ୟବସ୍ଥା**, ଯାହା:

1. ପ୍ରଦାନକାରୀ ସମସ୍ୟାଗୁଡ଼ିକୁ ଚିହ୍ନଟ କରେ (ସର୍କିଟ୍ ଖୋଲା, କୁଲ୍ଡାଉନ୍, ଲକ୍ଆଉଟ୍, କୋଟା ଚେତାବନୀ)
2. ସେଗୁଡ଼ିକର ସମାଧାନ ପାଇଁ **ସୁପାରିସକୃତ କାର୍ଯ୍ୟ** ସୃଷ୍ଟି କରେ
3. ଇଚ୍ଛାଧୀନ ଭାବେ କମ୍-ବିପଦପୂର୍ଣ୍ଣ କାର୍ଯ୍ୟଗୁଡ଼ିକୁ **ସ୍ୱୟଂଚାଳିତ ଭାବେ ନିଷ୍ପାଦନ** କରେ

### ଚିହ୍ନଟ ହୋଇଥିବା ସମସ୍ୟା ପ୍ରକାର

| ସମସ୍ୟା ପ୍ରକାର                | ଗୁରୁତ୍ୱ | ଉଦାହରଣ ସର୍ତ୍ତ                                |
| ---------------------------- | ------- | -------------------------------------------- |
| `provider_circuit_open`      | ଗୁରୁତର  | 5ଟି ବିଫଳତା ପରେ ସର୍କିଟ୍ ବ୍ରେକର୍ ଖୋଲା          |
| `provider_circuit_half_open` | ଚେତାବନୀ | ସର୍କିଟ୍ ପୁନରୁଦ୍ଧାର ପରୀକ୍ଷା କରୁଛି             |
| `connection_cooldown`        | ଚେତାବନୀ | 429 ପରେ ସଂଯୋଗ କୁଲ୍ଡାଉନ୍ରେ ଅଛି                |
| `stale_connection_error`     | ଚେତାବନୀ | ଶେଷ ରିଫ୍ରେଶ୍ 30+ ମିନିଟ୍ ପୂର୍ବରୁ ବିଫଳ ହୋଇଥିଲା |
| `terminal_connection_error`  | ଗୁରୁତର  | OAuth ପ୍ରତ୍ୟାହୃତ, କୀ ଅବୈଧ                    |
| `inactive_connection`        | ସୂଚନା   | ସେଟିଂସ୍ରେ ସଂଯୋଗ ଅକ୍ଷମ କରାଯାଇଛି               |
| `model_lockout`              | ଚେତାବନୀ | ନିର୍ଦ୍ଦିଷ୍ଟ ମଡେଲ୍ କ୍ୱାରେଣ୍ଟାଇନ୍ରେ ଅଛି        |
| `quota_monitor_warning`      | ଚେତାବନୀ | କୋଟା ବ୍ୟବହାର 80%+ ରେ ଅଛି                     |

### ସୃଷ୍ଟି ହୋଇଥିବା କାର୍ଯ୍ୟ ପ୍ରକାର

| କାର୍ଯ୍ୟ                        | ବିପଦ  | ବର୍ଣ୍ଣନା                                      |
| ------------------------------ | ----- | --------------------------------------------- |
| `clear_provider_breaker`       | ମଧ୍ୟମ | ସର୍କିଟ୍ ବ୍ରେକର୍କୁ ବନ୍ଦ ଅବସ୍ଥାକୁ ରିସେଟ୍ କରନ୍ତୁ |
| `clear_connection_cooldown`    | କମ୍   | ଏକ ସଂଯୋଗରୁ କୁଲ୍ଡାଉନ୍ ହଟାନ୍ତୁ                  |
| `clear_stale_connection_error` | କମ୍   | ପୁରୁଣା ତ୍ରୁଟି ଫ୍ଲାଗ୍ ସଫା କରନ୍ତୁ               |
| `clear_model_lockout`          | କମ୍   | କ୍ୱାରେଣ୍ଟାଇନ୍ରେ ଥିବା ମଡେଲ୍କୁ ପୁନଃସକ୍ଷମ କରନ୍ତୁ |
| `reactivate_connection`        | ମଧ୍ୟମ | ନିଷ୍କ୍ରିୟ କରାଯାଇଥିବା ସଂଯୋଗକୁ ପୁନଃସକ୍ଷମ କରନ୍ତୁ |
| `deactivate_connection`        | ଉଚ୍ଚ  | ସମସ୍ୟାପୂର୍ଣ୍ଣ ସଂଯୋଗକୁ ଅକ୍ଷମ କରନ୍ତୁ            |

### API

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** ଅଟୋପାଇଲଟ୍ ସମସ୍ୟାଗୁଡ଼ିକ MCP ଟୁଲ୍ `observability_snapshot` କିମ୍ବା ଡ୍ୟାଶବୋର୍ଡ ମାଧ୍ୟମରେ ଉପଲବ୍ଧ। ଅଟୋପାଇଲଟ୍ ଆଭ୍ୟନ୍ତରୀଣ ଭାବେ ଚାଲେ; ଏହାର ଆଚରଣ ଏନ୍ଭାଇରନ୍ମେଣ୍ଟ ଭେରିଏବଲ୍ ଦ୍ୱାରା ନୁହେଁ, ବରଂ ସେଟିଂସ୍ DB (ପ୍ରତ୍ୟେକ ସଂଯୋଗର `autopilotMode` ଫିଲ୍ଡ) ମାଧ୍ୟମରେ ବିନ୍ୟାସ କରାଯାଏ — ଏକ ଅଟୋପାଇଲଟ୍-ମୋଡ୍ ଏନ୍ଭାଇରନ୍ମେଣ୍ଟ ଭେରିଏବଲ୍ ପାଇଁ `grep -rn` କଲେ କୌଣସି ଫଳାଫଳ ମିଳେ ନାହିଁ।

### ଅଟୋପାଇଲଟ୍ ମୋଡ୍

ଅଟୋପାଇଲଟ୍ ଡିଫଲ୍ଟ ଭାବେ **ମାନୁଆଲ୍ ମୋଡ୍**ରେ କାର୍ଯ୍ୟ କରେ — ଏହା ସମସ୍ୟାଗୁଡ଼ିକୁ ଚିହ୍ନଟ କରି ସୁପାରିସକୃତ କାର୍ଯ୍ୟ ସୃଷ୍ଟି କରେ, କିନ୍ତୁ ସେଗୁଡ଼ିକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ପ୍ରୟୋଗ କରେ ନାହିଁ। କାର୍ଯ୍ୟଗୁଡ଼ିକୁ ଡ୍ୟାଶବୋର୍ଡ ମାଧ୍ୟମରେ ପ୍ରୟୋଗ କରାଯାଇପାରିବ।

---

## କମ୍ବୋ ସ୍ୱାସ୍ଥ୍ୟ ଅଟୋପାଇଲଟ୍

`comboHealthAutopilot.ts` ହେଉଛି ପ୍ରଦାନକାରୀ ଅଟୋପାଇଲଟ୍ର **କମ୍ବୋ-ନିର୍ଦ୍ଦିଷ୍ଟ** ସମକକ୍ଷ। ଏହା:

- ଅସୁସ୍ଥ କମ୍ବୋଗୁଡ଼ିକୁ ଚିହ୍ନଟ କରେ
- ଲକ୍ଷ୍ୟଗୁଡ଼ିକୁ ପୁନଃକ୍ରମବଦ୍ଧ କରିବାକୁ ସୁପାରିସ କରେ
- ଅକାମୀ ଲକ୍ଷ୍ୟଗୁଡ଼ିକୁ ଅକ୍ଷମ କରିବାକୁ ପରାମର୍ଶ ଦିଏ
- Nଟି ବିଫଳତା ପରେ ଅଚଳ ଲକ୍ଷ୍ୟଗୁଡ଼ିକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ହଟାଏ

### କମ୍ବୋ ସମସ୍ୟା ଉଦାହରଣ

```
କମ୍ବୋ "always-on" (ପ୍ରାଥମିକତା କୌଶଳ)
├─ ଲକ୍ଷ୍ୟ 1: openai/gpt-5 (ସୁସ୍ଥ)
├─ ଲକ୍ଷ୍ୟ 2: anthropic/claude-opus-4-6 (⚠️ 14:00 ପର୍ଯ୍ୟନ୍ତ ମଡେଲ୍ ଲକ୍ଆଉଟ୍)
└─ ଲକ୍ଷ୍ୟ 3: kiro/claude-sonnet-4-5 (ସୁସ୍ଥ)

ସୁପାରିସକୃତ କାର୍ଯ୍ୟ: ପୁନଃକ୍ରମବଦ୍ଧ କରନ୍ତୁ — ଲକ୍ଆଉଟ୍ର ସମୟସୀମା ଶେଷ ହେବା ପର୍ଯ୍ୟନ୍ତ kiroକୁ anthropic ଉପରକୁ ଘୁଞ୍ଚାନ୍ତୁ
```

---

## କୋଟା ମନିଟର୍

`observability.ts` ସବ୍ସ୍କ୍ରିପ୍ସନ୍ ପ୍ରଦାନକାରୀମାନଙ୍କ ପାଇଁ (Claude Code, Codex, GitHub Copilot) **ପ୍ରତି-ସେସନ୍ କୋଟା ମନିଟର୍** ପ୍ରକାଶ କରେ:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### ସ୍ଥିତିର ଅର୍ଥ

| ସ୍ଥିତି      | କେବେ                               | UI କାର୍ଯ୍ୟ                                            |
| ----------- | ---------------------------------- | ----------------------------------------------------- |
| `starting`  | ପ୍ରାରମ୍ଭିକ ପୋଲିଂ ଚାଲିଛି            | ସ୍ପିନର୍                                               |
| `idle`      | କୌଣସି ସାମ୍ପ୍ରତିକ କାର୍ଯ୍ୟକଳାପ ନାହିଁ | ଡ୍ୟାଶବୋର୍ଡରୁ ଲୁକ୍କାୟିତ                                |
| `healthy`   | କୋଟାର 50%ରୁ ଅଧିକ ବାକି ଅଛି          | ସବୁଜ ବିନ୍ଦୁ                                           |
| `warning`   | କୋଟାର 50%ରୁ କମ୍ ବାକି ଅଛି           | ହଳଦିଆ ସତର୍କତା                                         |
| `exhausted` | କୋଟା = 0%                          | ଲାଲ୍ ବ୍ଲକ୍, ପରବର୍ତ୍ତୀ ପ୍ରଦାନକାରୀଙ୍କ ପାଖକୁ ରୁଟ୍ କରନ୍ତୁ |
| `error`     | ପୋଲିଂ ବିଫଳ ହୋଇଛି                   | ଲାଲ୍ ବିନ୍ଦୁ, ଶୀଘ୍ର ପୁନଃଚେଷ୍ଟା କରନ୍ତୁ                  |

### API

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** କୋଟା ମନିଟର୍ ଡାଟା MCP ଟୁଲ୍ `observability_snapshot` କିମ୍ବା ଡ୍ୟାଶବୋର୍ଡ ମାଧ୍ୟମରେ ଉପଲବ୍ଧ।

---

## ପର୍ଯ୍ୟବେକ୍ଷଣୀୟତା ସ୍ନାପସଟ୍

MCP ଟୁଲ୍ `observability_snapshot` AI ଏଜେଣ୍ଟମାନଙ୍କ ପାଇଁ ଏକ **ସମ୍ପୂର୍ଣ୍ଣ ସିଷ୍ଟମ୍ ସ୍ନାପସଟ୍** ଫେରାଏ:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* ଉପରେ ଦେଖନ୍ତୁ */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

ଏଜେଣ୍ଟମାନେ **ରାଉଟିଂ ନିଷ୍ପତ୍ତି** ନେବା ପାଇଁ ଏହାକୁ ବ୍ୟବହାର କରନ୍ତି — ଉଦାହରଣ ସ୍ୱରୂପ, "ଯଦି openaiର ସର୍କିଟ୍ ଖୋଲା ଅଛି, ତେବେ ପ୍ରଥମେ anthropicକୁ ରାଉଟ୍ କରନ୍ତୁ"।

---

## ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ

OAuth ପ୍ରଦାନକାରୀଗୁଡ଼ିକ (Claude Code, GitHub Copilot, Cursor) ପାଇଁ **ନିୟମିତ ଟୋକନ୍ ରିଫ୍ରେଶ୍** ଆବଶ୍ୟକ। `src/lib/tokenHealthCheck.ts` ଏକ ବ୍ୟାକଗ୍ରାଉଣ୍ଡ ସ୍କେଡ୍ୟୁଲର୍ ଚଲାଏ:

- **ସ୍ୱିପ୍ ଟିକ୍**: ପ୍ରତି 60 ସେକେଣ୍ଡରେ (`src/lib/tokenHealthCheck.ts:30`ରେ `TICK_MS = 60 * 1000` ଅନୁସାରେ ସ୍ୱିପ୍)
- **ପ୍ରତି-କନେକ୍ସନ୍ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ବ୍ୟବଧାନ**: ଡିଫଲ୍ଟ ଭାବେ 60 ମିନିଟ୍ (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); ସେଟିଂସ୍ DB ମାଧ୍ୟମରେ ବିନ୍ୟାସଯୋଗ୍ୟ
- **401ରେ ପୂର୍ବ-ସକ୍ରିୟ ରିଫ୍ରେଶ୍**: ପ୍ରତି-କନେକ୍ସନ୍ ଇଣ୍ଟରସେପ୍ଟର୍ ଦ୍ୱାରା ପରିଚାଳିତ

### ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ ସ୍ଥିତି

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### ବିନ୍ୟାସ

ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ବିନ୍ୟାସ `tokenHealthCheck.ts` ଦ୍ୱାରା ଆଭ୍ୟନ୍ତରୀଣ ଭାବେ ପରିଚାଳିତ ହୁଏ।

### ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** ଟୋକନ୍ ସ୍ୱାସ୍ଥ୍ୟ ଡାଟା ଡ୍ୟାସବୋର୍ଡ କିମ୍ବା MCP ଟୁଲ୍ `observability_snapshot` ମାଧ୍ୟମରେ ଉପଲବ୍ଧ।

---

## ଆଲର୍ଟିଂ

### ଅନ୍ତର୍ନିର୍ମିତ ଚ୍ୟାନେଲ୍

OmniRoute **3ଟି ଆଲର୍ଟ ଚ୍ୟାନେଲ୍** ସମର୍ଥନ କରେ:

| ଚ୍ୟାନେଲ୍           | ସେଟଅପ୍             | ବ୍ୟବହାର କ୍ଷେତ୍ର           |
| ------------------ | ------------------ | ------------------------- |
| ଡ୍ୟାସବୋର୍ଡ ବ୍ୟାନର୍ | ସର୍ବଦା ସକ୍ରିୟ      | ଆପ୍ ଭିତରେ ବିଜ୍ଞପ୍ତି       |
| Webhook            | URL ବିନ୍ୟାସ କରନ୍ତୁ | Slack, Discord, PagerDuty |
| ଲଗ୍                | ଡିଫଲ୍ଟ             | ବାହ୍ୟ ଲଗ୍ ଏଗ୍ରିଗେସନ୍ ପାଇଁ |

### Webhook ବିନ୍ୟାସ

> **ଟିପ୍ପଣୀ:** Webhook ଆଲର୍ଟିଂ ବିନ୍ୟାସ ଡ୍ୟାସବୋର୍ଡର Settings ପୃଷ୍ଠା ମାଧ୍ୟମରେ ପରିଚାଳିତ ହୁଏ। Webhook URL, ଇଭେଣ୍ଟ ଫିଲ୍ଟରିଂ ଏବଂ ପେଲୋଡ୍ କଷ୍ଟମାଇଜେସନ୍ ପାଇଁ Settings UI ଦେଖନ୍ତୁ।

### ଆଲର୍ଟ ପ୍ରକାର

| ଆଲର୍ଟ                        | କେବେ                                           | ଡିଫଲ୍ଟ ଗୁରୁତ୍ୱ |
| ---------------------------- | ---------------------------------------------- | -------------- |
| `provider_circuit_open`      | ସର୍କିଟ୍ ଖୋଲିଲେ                                 | ଗୁରୁତର         |
| `provider_circuit_half_open` | ସର୍କିଟ୍ ପୁନରୁଦ୍ଧାର ପରୀକ୍ଷା କରୁଥିଲେ             | ସୂଚନା          |
| `quota_warning`              | କୋଟା 80%+ ହେଲେ                                 | ଚେତାବନୀ        |
| `quota_exhausted`            | କୋଟା 100% ହେଲେ                                 | ଗୁରୁତର         |
| `token_refresh_failed`       | କ୍ରମାଗତ 3+ ରିଫ୍ରେଶ୍ ବିଫଳତା ହେଲେ                | ଚେତାବନୀ        |
| `token_expired`              | ଟୋକନ୍ର ମିଆଦ ଶେଷ ହୋଇଗଲେ                         | ଗୁରୁତର         |
| `combo_target_unhealthy`     | କମ୍ବୋ ଟାର୍ଗେଟ୍ 1 ଘଣ୍ଟା+ ପାଇଁ କୁଲ୍ଡାଉନ୍ରେ ରହିଲେ | ଚେତାବନୀ        |
| `db_integrity_warning`       | FK ଉଲ୍ଲଂଘନ > 0 ହେଲେ                            | ଚେତାବନୀ        |
| `heap_pressure`              | ହିପ୍ ବ୍ୟବହାର ଥ୍ରେସହୋଲ୍ଡର 80%ରୁ ଅଧିକ ହେଲେ       | ଚେତାବନୀ        |

---

## କାର୍ଯ୍ୟଦକ୍ଷତା ମେଟ୍ରିକ୍ସ

### ଟ୍ରାକ୍ କରାଯାଉଥିବା ମେଟ୍ରିକ୍ସ

| ମେଟ୍ରିକ୍                | ପ୍ରକାର       | ଉତ୍ସ                            |
| ----------------------- | ------------ | ------------------------------- |
| `request_count`         | କାଉଣ୍ଟର୍     | `services/usage.ts`             |
| `request_latency_ms`    | ହିଷ୍ଟୋଗ୍ରାମ୍ | `services/usage.ts`             |
| `tokens_consumed`       | କାଉଣ୍ଟର୍     | `services/usage.ts`             |
| `cost_usd`              | କାଉଣ୍ଟର୍     | `services/usage.ts`             |
| `provider_errors`       | କାଉଣ୍ଟର୍     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | କାଉଣ୍ଟର୍     | `services/resilience.ts`        |
| `cache_hits`            | କାଉଣ୍ଟର୍     | `services/signatureCache.ts`    |
| `compression_savings`   | ହିଷ୍ଟୋଗ୍ରାମ୍ | `services/compression/stats.ts` |
| `quota_used`            | ଗେଜ୍         | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | ଗେଜ୍         | `observability.ts`              |

### ବିଳମ୍ବ ପ୍ରତିଶତକ (p50/p95/p99)

> **କୌଣସି REST ଏଣ୍ଡପଏଣ୍ଟ ନାହିଁ।** ବିଳମ୍ବ ପ୍ରତିଶତକ ତଥ୍ୟ ଡ୍ୟାସବୋର୍ଡର `/dashboard/health` ପୃଷ୍ଠା ମାଧ୍ୟମରେ ଉପଲବ୍ଧ। Prometheus/OpenTelemetry ଏକ୍ସପୋର୍ଟ v3.9 ପାଇଁ ଯୋଜନା କରାଯାଇଛି।

### Prometheus / OpenTelemetry ଏକ୍ସପୋର୍ଟ (ପର୍ଯ୍ୟାୟ 2)

v3.9 ପାଇଁ ଯୋଜନା କରାଯାଇଛି: Prometheus, OpenTelemetry, Datadogକୁ ନେଟିଭ୍ ଏକ୍ସପୋର୍ଟ।

ବର୍ତ୍ତମାନ ପାଇଁ, ଯେକୌଣସି HTTP-ଆଧାରିତ ମନିଟରିଂ ସିଷ୍ଟମ୍ (Prometheus blackbox exporter, Datadog HTTP check ଇତ୍ୟାଦି) ସହିତ `/api/monitoring/health` ସ୍କ୍ରେପ୍ କରନ୍ତୁ।

---

## ଆଲର୍ଟିଂ ପ୍ରଣାଳୀ

### Slack

> **ଟିପ୍ପଣୀ:** Webhook ଆଲର୍ଟିଂ ଡ୍ୟାସବୋର୍ଡର Settings ପୃଷ୍ଠା ମାଧ୍ୟମରେ କନଫିଗର୍ କରାଯାଏ — କୌଣସି ଉତ୍ସର୍ଗୀକୃତ webhook ପରିବେଶ ଭେରିଏବଲ୍ ନାହିଁ (`grep -rn` ଶୂନ୍ୟ ମେଳ ଫେରାଏ)। webhook URL, ଇଭେଣ୍ଟ ଫିଲ୍ଟରିଂ ଏବଂ payload କଷ୍ଟମାଇଜେସନ୍ ପାଇଁ Settings UI ଦେଖନ୍ତୁ।

### Discord

> Webhook ଆଲର୍ଟିଂ Slack ପରି ସମାନ Settings UI ପ୍ରବାହ ବ୍ୟବହାର କରେ। Discord ସମାନ JSON payload ଆକୃତି ଗ୍ରହଣ କରେ।

### PagerDuty

> Webhook ଆଲର୍ଟିଂ ସମାନ Settings UI ପ୍ରବାହ ବ୍ୟବହାର କରେ। PagerDuty Events API v2 ରାଉଟିଂ କୀଗୁଡ଼ିକ Settings UIରେ କନଫିଗର୍ କରାଯାଏ।

### କଷ୍ଟମ୍ Webhook (JSON)

> JSON ବଡି ସହିତ POST ଗ୍ରହଣ କରୁଥିବା ଯେକୌଣସି HTTP ଏଣ୍ଡପଏଣ୍ଟ କାମ କରିବ। Settings UIରେ URL କନଫିଗର୍ କରନ୍ତୁ।

---

## ଡ୍ୟାସବୋର୍ଡ କନଫିଗରେସନ୍

### ସ୍ୱାସ୍ଥ୍ୟ ଡ୍ୟାସବୋର୍ଡକୁ କଷ୍ଟମାଇଜ୍ କରନ୍ତୁ

ଏକ `~/.omniroute/dashboard.json` ସୃଷ୍ଟି କରନ୍ତୁ:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ଏକ ପ୍ରଦାନକାରୀଙ୍କୁ ଶୀର୍ଷରେ ପିନ୍ କରନ୍ତୁ

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## ସମସ୍ୟା ନିବାରଣ

### "ପ୍ରଦାନକାରୀ ସୁସ୍ଥ ବୋଲି କହୁଛି, କିନ୍ତୁ ଅନୁରୋଧଗୁଡ଼ିକ ବିଫଳ ହେଉଛି"

1. **autopilot ସମସ୍ୟାଗୁଡ଼ିକ** ଯାଞ୍ଚ କରନ୍ତୁ — ହୁଏତ କୌଣସି ମଡେଲ୍ ଲକ୍ ଆଉଟ୍ ହୋଇଛି
2. ନିର୍ଦ୍ଦିଷ୍ଟ ତ୍ରୁଟି ଶ୍ରେଣୀ ପାଇଁ **ସାମ୍ପ୍ରତିକ ତ୍ରୁଟିଗୁଡ଼ିକ** ଦେଖନ୍ତୁ
3. ପ୍ରଦାନକାରୀ କାର୍ଡରେ **ସଂଯୋଗ ପରୀକ୍ଷା** କରି ଦେଖନ୍ତୁ
4. ପ୍ରଦାନକାରୀ **upstreamରେ rate-limited** ଅଛନ୍ତି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ (ସ୍ଥାନୀୟ ଭାବରେ ଦୃଶ୍ୟମାନ ନୁହେଁ)

### "କୋଟା ସୁସ୍ଥ ବୋଲି କହୁଛି, କିନ୍ତୁ ମୁଁ 429 ଦେଖୁଛି"

- 429ର ଅର୍ଥ ହେଉଛି ପ୍ରଦାନକାରୀଙ୍କ ଅନୁସାରେ ଆପଣ ନିଜ କୋଟା ବ୍ୟବହାର କରିସାରିଛନ୍ତି
- OmniRouteର କୋଟା ଟ୍ରାକିଂ **ପୁରୁଣା** ହୋଇପାରେ — ପ୍ରଦାନକାରୀଙ୍କ upstream ତଥ୍ୟ ହିଁ ପ୍ରାମାଣିକ
- ଆଭ୍ୟନ୍ତରୀଣ କୋଟା ମନିଟର୍ ମାଧ୍ୟମରେ କୋଟା ତଥ୍ୟ ସ୍ୱୟଂଚାଳିତ ଭାବେ ରିଫ୍ରେଶ୍ ହୁଏ

### "ସମସ୍ତ ଟାର୍ଗେଟ୍ ସୁସ୍ଥ ଦେଖାଯାଉଥିଲେ ମଧ୍ୟ କମ୍ବୋ ବିଫଳ ହେଉଛି"

- ଟାର୍ଗେଟ୍ କ୍ରମ ସମସ୍ୟା ପାଇଁ **କମ୍ବୋ ସ୍ୱାସ୍ଥ୍ୟ** ଡ୍ୟାସବୋର୍ଡ ଯାଞ୍ଚ କରନ୍ତୁ
- **fallback ଇଭେଣ୍ଟଗୁଡ଼ିକ** ଦେଖନ୍ତୁ — ହୁଏତ କମ୍ବୋଟି ଅତ୍ୟଧିକ ଶୀଘ୍ର ସମସ୍ତ ବିକଳ୍ପ ବ୍ୟବହାର କରିଦେଉଛି
- **କୌଶଳ** ଆପଣଙ୍କ ବ୍ୟବହାର ପରିସ୍ଥିତି ସହିତ ମେଳ ଖାଉଛି କି ନାହିଁ ଯାଞ୍ଚ କରନ୍ତୁ (priority ବନାମ round-robin ବନାମ auto)

### "ଡାଟାବେସ୍ ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ବିଫଳ ହେଉଛି"

- `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` ଚଲାନ୍ତୁ
- ଯଦି "ok" — ଏହା ଏକ ଭୁଲ୍ ସତର୍କତା, ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ ଅତ୍ୟଧିକ କଠୋର ହେଉଛି
- ଅନ୍ୟ କିଛି ହେଲେ — **OmniRoute ବନ୍ଦ କରନ୍ତୁ** ଏବଂ [ବିପର୍ଯ୍ୟୟ ପୁନରୁଦ୍ଧାର ଗାଇଡ୍](./DATABASE_GUIDE.md#disaster-recovery) ଅନୁସରଣ କରନ୍ତୁ

### "ମେମୋରି heap ଚାପ ଗୁରୁତର ଅଟେ"

```bash
# ବର୍ତ୍ତମାନର heap ଯାଞ୍ଚ କରନ୍ତୁ
node -e "console.log(process.memoryUsage())"

# ମାନୁଆଲ୍ GC ଟ୍ରିଗର୍ କରନ୍ତୁ (ଯଦି --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# ସମକାଳୀନ ଅନୁରୋଧ ସଂଖ୍ୟା କମାନ୍ତୁ (ଏକ env var ନୁହେଁ, ଡ୍ୟାସବୋର୍ଡର Settings ପୃଷ୍ଠା ମାଧ୍ୟମରେ ସେଟ୍ କରନ୍ତୁ)
# କୌଣସି `MAX_CONCURRENT_REQUESTS` env var ନାହିଁ — ଏହାକୁ Settings → Concurrencyରେ କନଫିଗର୍ କରନ୍ତୁ।
```

---

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ବ୍ୟବହାର ଏବଂ ଖର୍ଚ୍ଚ ଟ୍ରାକିଂ
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB ସ୍କିମା + ସ୍ୱାସ୍ଥ୍ୟ
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — ପ୍ରକ୍ସି ସ୍ୱାସ୍ଥ୍ୟ (ପୃଥକ କ୍ୟାଶ୍)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ସିଷ୍ଟମ୍ ଆର୍କିଟେକ୍ଚର୍
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ସର୍କିଟ୍ ବ୍ରେକର୍ର ବିବରଣୀ
- ଉତ୍ସ: `src/lib/monitoring/` (4ଟି ଫାଇଲ୍, 2121 LOC)
