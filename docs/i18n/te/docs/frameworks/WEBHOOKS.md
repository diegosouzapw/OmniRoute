# Webhooks (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ప్రామాణిక మూలం:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **చివరిగా నవీకరించబడింది:** 2026-06-28 — v3.8.40

ప్లాట్ఫారమ్ ఈవెంట్లపై OmniRoute HTTP వెబ్హుక్లను ట్రిగ్గర్ చేయగలదు. Slack, PagerDuty, Datadog, అంతర్గత హెచ్చరిక సేవలు లేదా ఏదైనా HTTP రిసీవర్తో అనుసంధానించడానికి వాటిని ఉపయోగించండి.

డిస్పాచర్ ప్రతి డెలివరీపై HMAC-SHA256తో సంతకం చేస్తుంది, తాత్కాలిక వైఫల్యాలపై మళ్లీ ప్రయత్నిస్తుంది, ప్రతి వెబ్హుక్కు డెలివరీ స్థితిని ట్రాక్ చేస్తుంది మరియు వరుసగా విఫలమయ్యే ఎండ్పాయింట్లను స్వయంచాలకంగా నిలిపివేస్తుంది.

## మద్దతు ఉన్న ఈవెంట్లు

`WebhookEvent` రకం (`src/lib/webhooks/eventDescriptions.ts`, దీనిని `src/lib/webhookDispatcher.ts` ఉపయోగిస్తుంది) ప్రస్తుతం ఖచ్చితంగా నాలుగు ఈవెంట్లను నమూనీకరిస్తుంది:

| ఈవెంట్              | ఎప్పుడు ట్రిగ్గర్ అవుతుంది                                                     |
| ------------------- | ------------------------------------------------------------------------------ |
| `request.completed` | ప్రాక్సీ చేయబడిన అభ్యర్థన విజయవంతంగా పూర్తయినప్పుడు                            |
| `request.failed`    | అన్ని పునఃప్రయత్నాలు/ఫాల్బ్యాక్ తర్వాత ప్రాక్సీ చేయబడిన అభ్యర్థన విఫలమైనప్పుడు |
| `quota.exceeded`    | API కీ బడ్జెట్/కోటా పరిమితిని దాటినప్పుడు                                      |
| `test.ping`         | పరీక్ష ఎండ్పాయింట్ ఉపయోగించే సింథటిక్ ఈవెంట్                                   |

ప్రతి ఈవెంట్ను స్వీకరించడానికి సబ్స్క్రిప్షన్లు లిటరల్ `"*"`ను అంగీకరిస్తాయి. `events`లోని తెలియని ఈవెంట్ పేర్లు డిస్పాచ్ సమయంలో విస్మరించబడతాయి.

> గమనిక: డిస్పాచర్ API అనుసంధానించబడింది, అయితే కొన్ని
> `test.ping` కాని ఈవెంట్లకు సంబంధించిన ప్రొడక్షన్ కాల్ సైట్లు ఇంకా అమలులోకి వస్తున్నాయి. మీ విడుదలలో ప్రస్తుతం
> ఏ పాత్లు డిస్పాచర్ను ఇన్వోక్ చేస్తున్నాయో చూడటానికి `grep dispatchEvent`ని తనిఖీ చేయండి.

## ఆర్కిటెక్చర్

```
కాలర్ (హ్యాండ్లర్, సర్వీస్, మానిటర్)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events ఆధారంగా ఫిల్టర్ చేయండి
    -> సరిపోలే ప్రతి దాని కోసం (సమాంతరంగా):
       deliverWebhook(url, payload, secret)
         పేలోడ్ను రూపొందించండి { event, timestamp, data }
         HMAC-SHA256తో బాడీపై సంతకం చేయండి (secret ఉంటే)
         10s టైమ్అవుట్తో POST చేయండి
         5xx / నెట్వర్క్ లోపంపై గరిష్ఠంగా 3 సార్లు మళ్లీ ప్రయత్నించండి
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

కాలర్కు డిస్పాచ్ అనేది ఫైర్-అండ్-ఫర్గెట్ విధానంలో ఉంటుంది: ఒక లోపభూయిష్ట రిసీవర్ ఇతర వాటిని బ్లాక్ చేయకుండా, `Promise.allSettled` ప్రతి వెబ్హుక్కు సంబంధించిన లోపాలను అణిచివేస్తుంది.

## HMAC సంతకం

వెబ్హుక్కు `secret` ఉన్నప్పుడు, OmniRoute JSON బాడీపై సంతకం చేసి కింది వాటిని పంపుతుంది:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> హెడర్ పేర్లు `X-Webhook-*` ప్రిఫిక్స్ను ఉపయోగిస్తాయి (`X-OmniRoute-*` కాదు). సంతకం
> విలువ `sha256=<hex>` — పూర్తి ప్రిఫిక్స్ను ధృవీకరించండి.

`createWebhook`ను సీక్రెట్ లేకుండా కాల్ చేస్తే, DB మాడ్యూల్ ఒకదాన్ని ఉత్పత్తి చేస్తుంది
(`whsec_<48 hex>`), కాబట్టి డిఫాల్ట్గా అన్ని వెబ్హుక్లు సంతకం చేయబడతాయి.

### రిసీవర్ వద్ద ధృవీకరించడం

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ఏదైనా JSON పార్సింగ్ చేయడానికి ముందు, ఎల్లప్పుడూ **ముడి** రిక్వెస్ట్ బాడీతోనే ధృవీకరించండి.

## పునఃప్రయత్నం & వైఫల్య విధానం

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ప్రతి ప్రయత్నానికి 10 సెకన్ల సమయ పరిమితి (`AbortController`).
- HTTP 2xx విజయంగా పరిగణించబడుతుంది.
- HTTP 3xx/4xx పునఃప్రయత్నం చేయలేని తుది స్థితిగా పరిగణించబడుతుంది — `success = res.ok`తో డెలివరీ అయినట్లు నమోదు చేయబడుతుంది.
- HTTP 5xx మరియు నెట్వర్క్ లోపాల సందర్భంలో ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్తో పునఃప్రయత్నం చేయబడుతుంది:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` తర్వాత, డెలివరీ విఫలమైనట్లు నమోదు చేయబడుతుంది.
- ప్రతి డెలివరీ `last_triggered_at`, `last_status`లను నవీకరిస్తుంది మరియు `failure_count`ను రీసెట్ చేస్తుంది లేదా పెంచుతుంది.
- ప్రతి ఫ్యాన్-అవుట్ తర్వాత డిస్పాచర్ `disableWebhooksWithHighFailures(10)`ను కాల్ చేస్తుంది, కాబట్టి `failure_count >= 10` ఉన్న ఏ webhook అయినా స్వయంచాలకంగా నిలిపివేయబడుతుంది.

## డేటాబేస్

`webhooks` పట్టిక (మైగ్రేషన్ `011_webhooks.sql`):

| కాలమ్               | రకం     | గమనికలు                                                |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | గమ్యస్థాన URL                                          |
| `events`            | TEXT    | JSON శ్రేణి; డిఫాల్ట్ `["*"]`                          |
| `secret`            | TEXT    | HMAC రహస్యం (ఇవ్వకపోతే స్వయంచాలకంగా రూపొందించబడుతుంది) |
| `enabled`           | INT     | 0/1; డిఫాల్ట్ విలువ 1                                  |
| `description`       | TEXT    | ఐచ్ఛికంగా మనుషులు చదవగల లేబుల్                         |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | ప్రతి డెలివరీ ప్రయత్నంలో నవీకరించబడుతుంది              |
| `last_status`       | INT     | చివరి ప్రయత్నపు HTTP స్థితి (0 = నెట్వర్క్)            |
| `failure_count`     | INT     | విజయవంతమైతే 0కు రీసెట్ అవుతుంది, విఫలమైతే +1           |

`webhooks` వరుసలోని సమగ్ర కౌంటర్లతో పాటు, డెలివరీ చరిత్ర ప్రత్యేకమైన `webhook_deliveries` పట్టికలో నిల్వ చేయబడుతుంది
(మైగ్రేషన్ `069_webhook_deliveries.sql`, ప్రతి ప్రయత్నంలో
`src/lib/db/webhookDeliveries.ts::insertDelivery` ద్వారా వ్రాయబడుతుంది).
రకానికి సంబంధించిన మెటాడేటా (Slack / Discord /
Telegram / అనుకూల payload ట్రాన్స్ఫార్మర్లు) `070_webhooks_kind_metadata.sql` ద్వారా జోడించబడింది.

## REST API

అన్ని endpointలకు నిర్వహణ ప్రమాణీకరణ (`requireManagementAuth`) అవసరం.

| Endpoint                        | పద్ధతి | వివరణ                                                |
| ------------------------------- | ------ | ---------------------------------------------------- |
| `/api/webhooks`                 | GET    | webhookలను జాబితా చేయండి (రహస్యాలు మాస్క్ చేయబడతాయి) |
| `/api/webhooks`                 | POST   | webhookను సృష్టించండి                                |
| `/api/webhooks/[id]`            | GET    | webhook వివరాలు (పూర్తి రహస్యం)                      |
| `/api/webhooks/[id]`            | PUT    | ఫీల్డ్లను నవీకరించండి                                |
| `/api/webhooks/[id]`            | DELETE | తొలగించండి                                           |
| `/api/webhooks/[id]/test`       | POST   | `test.ping`ను పంపండి (పునఃప్రయత్నాలు లేవు)           |
| `/api/webhooks/[id]/deliveries` | GET    | ఒక webhookకు సంబంధించిన ఇటీవలి డెలివరీ ప్రయత్నాలు    |
| `/api/webhooks/validate-url`    | POST   | ముందస్తు URL ధ్రువీకరణ (SSRF రక్షణ)                  |

జాబితా పేజీలలో రహస్యం బహిర్గతం కాకుండా ఉండటానికి `GET /api/webhooks` దాన్ని `<మొదటి 10 అక్షరాలు>...` రూపంలో మాస్క్ చేస్తుంది. మీకు నిజంగా రహస్యం అవసరమైనప్పుడు `[id]` GETను ఉపయోగించండి.

### webhookను సృష్టించడం

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

`secret` ఇవ్వకపోతే, సర్వర్ `whsec_<hex>` రహస్యాన్ని రూపొందించి, ప్రతిస్పందనలో దాన్ని తిరిగి ఇస్తుంది.

### webhookను పరీక్షించడం

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }`ను తిరిగి ఇస్తుంది. పునఃప్రయత్నాలు చేయబడవు — స్వీకర్త payload మరియు సంతకాన్ని అంగీకరిస్తున్నారో లేదో త్వరగా ధ్రువీకరించడానికి ఇది ఉపయోగకరంగా ఉంటుంది.

## డ్యాష్బోర్డ్

`/dashboard/webhooks` వద్ద ఉన్న డ్యాష్బోర్డ్ పేజీ (`src/app/(dashboard)/dashboard/webhooks/page.tsx` చూడండి) కింది సదుపాయాలను అందిస్తుంది:

- ఈవెంట్ పికర్తో వెబ్హుక్లను సృష్టించడం/సవరించడం
- `enabled`, `failure_count`, మరియు `last_status` ఆధారంగా స్థితి సూచిక (సక్రియం / నిష్క్రియం / లోపం సంభవించింది)
- ఒకే క్లిక్తో పరీక్ష డెలివరీ
- మాన్యువల్గా ప్రారంభించడం/నిలిపివేయడం కోసం టాగుల్

## పేలోడ్ ఉదాహరణలు

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "OmniRoute నుండి పరీక్ష వెబ్హుక్ డెలివరీ",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` కాని ఈవెంట్ల ఫీల్డ్ నిర్మాణాలు వాటిని విడుదల చేసే కాల్ సైట్ల ద్వారా నిర్వచించబడతాయి; `data` ఆబ్జెక్ట్ను భవిష్యత్-అనుకూలమైనదిగా పరిగణించండి (ఫీల్డ్లను జోడించండి, అవి లేకపోవడంపై ఆధారపడవద్దు).

## ఉత్తమ పద్ధతులు

- **ప్రతి డెలివరీపై సంతకాన్ని ధృవీకరించండి** — ముడి బాడీతో పోల్చి ధృవీకరించడం ద్వారా మీ వెబ్హుక్ URLను ఊహించిన ఎవరైనా పంపే నకిలీ POSTలను నిరోధించవచ్చు.
- **~5 సెకన్లలోపు 2xxతో ప్రతిస్పందించండి** — డిస్పాచర్ 10 s వద్ద టైమ్ అవుట్ అవుతుంది. నెమ్మదైన రిసీవర్లు పునఃప్రయత్నాలను వినియోగించి `failure_count`ను పెంచుతాయి.
- **హ్యాండ్లర్లను ఐడెంపొటెంట్గా రూపొందించండి** — పునఃప్రయత్నాలు మరియు కనీసం-ఒక్కసారైనా డెలివరీ సెమాంటిక్స్ కారణంగా నకళ్లు సంభవించవచ్చు.
- **కనిష్ఠంగా సబ్స్క్రైబ్ చేయండి** — మీరు వాస్తవంగా వినియోగించే ఈవెంట్లను మాత్రమే జాబితా చేయండి; `"*"` మీరు నియంత్రించని రిసీవర్లపై ఖర్చును పెంచుతుంది.
- **`failure_count`ను గమనించండి** — వరుసగా 10 వైఫల్యాలు సంభవించినప్పుడు ఎండ్పాయింట్లు స్వయంచాలకంగా నిలిపివేయబడతాయి; రిసీవర్ను సరిచేసిన తర్వాత `enabled: true`తో `PUT /api/webhooks/[id]`ను కాల్ చేసి రీసెట్ చేయండి.
- **సీక్రెట్లను క్రమానుగతంగా మార్చండి** — కొత్త `secret`ను `PUT` చేయండి, రిసీవర్కు కొత్త విలువను డిప్లాయ్ చేయండి, ఆపై పరీక్ష ఎండ్పాయింట్ ద్వారా నిర్ధారించండి.

## ఇవి కూడా చూడండి

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — పూర్తి నిర్వహణ API పరిధి
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` ద్వారా వెల్లడయ్యే ప్రొవైడర్ వైఫల్యాల వెనుక ఉన్న సర్క్యూట్ బ్రేకర్ / కూల్డౌన్ సెమాంటిక్స్
- మూలం: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
