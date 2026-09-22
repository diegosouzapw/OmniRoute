# Webhooks (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **सत्यको स्रोत:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **अन्तिम अद्यावधिक:** 2026-06-28 — v3.8.40

OmniRoute ले प्लेटफर्म घटनाहरूमा HTTP वेबहुकहरू ट्रिगर गर्न सक्छ। तिनलाई
Slack, PagerDuty, Datadog, आन्तरिक चेतावनी सेवाहरू, वा कुनै पनि HTTP रिसिभरसँग एकीकृत गर्न प्रयोग गर्नुहोस्।

डिस्प्याचरले प्रत्येक डेलिभरीलाई HMAC-SHA256 मार्फत हस्ताक्षर गर्छ, अस्थायी
विफलताहरूमा पुनः प्रयास गर्छ, प्रत्येक वेबहुकको डेलिभरी स्थिति ट्र्याक गर्छ, र निरन्तर
विफल भइरहने एन्डपोइन्टहरूलाई स्वचालित रूपमा असक्षम गर्छ।

## समर्थित घटनाहरू

`WebhookEvent` प्रकारले (`src/lib/webhooks/eventDescriptions.ts`, जसलाई `src/lib/webhookDispatcher.ts` ले प्रयोग गर्छ) हाल ठ्याक्कै चारवटा घटना मोडेल गर्छ:

| घटना                | कहिले ट्रिगर हुन्छ                                            |
| ------------------- | ------------------------------------------------------------- |
| `request.completed` | प्रोक्सी गरिएको अनुरोध सफलतापूर्वक पूरा हुँदा                 |
| `request.failed`    | सबै पुनः प्रयास/फल्ब्याकपछि प्रोक्सी गरिएको अनुरोध विफल हुँदा |
| `quota.exceeded`    | API कुञ्जीले बजेट/कोटा सीमा पार गर्दा                         |
| `test.ping`         | परीक्षण एन्डपोइन्टद्वारा प्रयोग गरिने कृत्रिम घटना            |

सबै घटनाहरू प्राप्त गर्न सदस्यताहरूले शाब्दिक `"*"` स्वीकार गर्छन्। `events` मा भएका
अज्ञात घटना नामहरू डिस्प्याचको समयमा बेवास्ता गरिन्छन्।

> टिप्पणी: डिस्प्याचर API जडान गरिएको छ, तर केही
> गैर-`test.ping` घटनाहरूका उत्पादन कल साइटहरू अझै थपिँदै छन्। तपाईंको रिलिजमा
> हाल कुन-कुन पाथले डिस्प्याचर आह्वान गर्छन् भनेर हेर्न `grep dispatchEvent` जाँच गर्नुहोस्।

## वास्तुकला

```
कलर (ह्यान्डलर, सेवा, मनिटर)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events अनुसार फिल्टर गर्ने
    -> प्रत्येक मेलका लागि (समानान्तर रूपमा):
       deliverWebhook(url, payload, secret)
         पेलोड { event, timestamp, data } निर्माण गर्ने
         HMAC-SHA256 द्वारा बडीमा हस्ताक्षर गर्ने (secret उपस्थित भएमा)
         10s टाइमआउटसहित POST गर्ने
         5xx / नेटवर्क त्रुटिमा बढीमा 3 पटकसम्म पुनः प्रयास गर्ने
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

कलरका लागि डिस्प्याच फायर-एन्ड-फर्गेट हो: `Promise.allSettled` ले
प्रत्येक वेबहुकका त्रुटिहरू दबाउँछ, जसले गर्दा एउटा खराब रिसिभरले अरूलाई अवरुद्ध गर्न सक्दैन।

## HMAC हस्ताक्षर

वेबहुकमा `secret` हुँदा OmniRoute ले JSON बडीमा हस्ताक्षर गर्छ र निम्न पठाउँछ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> हेडर नामहरूले `X-Webhook-*` उपसर्ग प्रयोग गर्छन् (`X-OmniRoute-*` होइन)। हस्ताक्षरको
> मान `sha256=<hex>` हो — पूर्ण उपसर्ग प्रमाणित गर्नुहोस्।

यदि `createWebhook` लाई secret बिना कल गरियो भने, DB मोड्युलले एउटा
(`whsec_<48 hex>`) उत्पन्न गर्छ, त्यसैले पूर्वनिर्धारित रूपमा सबै वेबहुकहरू हस्ताक्षरित हुन्छन्।

### रिसिभरमा प्रमाणीकरण

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

कुनै पनि JSON पार्सिङ गर्नुअघि, सधैँ **कच्चा** अनुरोध बडीसँग तुलना गरेर प्रमाणीकरण गर्नुहोस्।

## पुनःप्रयास र विफलता नीति

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- प्रत्येक प्रयासको समयसीमा 10 सेकेन्ड (`AbortController`)।
- HTTP 2xx लाई सफल मानिन्छ।
- HTTP 3xx/4xx लाई पुनःप्रयास नगरिने अन्तिम स्थिति मानिन्छ — `success = res.ok`
  सहित डेलिभर भएको रूपमा रेकर्ड गरिन्छ।
- HTTP 5xx र नेटवर्क त्रुटिहरूमा एक्सपोनेन्सियल ब्याकअफसहित पुनःप्रयास गरिन्छ:
  `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries` पछि, डेलिभरीलाई विफल भएको रूपमा रेकर्ड गरिन्छ।
- प्रत्येक डेलिभरीले `last_triggered_at`, `last_status` अद्यावधिक गर्छ र
  `failure_count` लाई या त रिसेट गर्छ वा बढाउँछ।
- प्रत्येक फ्यान-आउटपछि डिस्प्याचरले `disableWebhooksWithHighFailures(10)` कल गर्छ,
  त्यसैले `failure_count >= 10` भएको कुनै पनि वेबहुक स्वतः निष्क्रिय हुन्छ।

## डेटाबेस

तालिका `webhooks` (माइग्रेसन `011_webhooks.sql`):

| स्तम्भ              | प्रकार  | टिप्पणी                                        |
| ------------------- | ------- | ---------------------------------------------- |
| `id`                | TEXT PK | UUID                                           |
| `url`               | TEXT    | गन्तव्य URL                                    |
| `events`            | TEXT    | JSON एरे; पूर्वनिर्धारित `["*"]`               |
| `secret`            | TEXT    | HMAC गोप्य कुञ्जी (नदिइएमा स्वतः उत्पन्न हुने) |
| `enabled`           | INT     | 0/1; पूर्वनिर्धारित रूपमा 1                    |
| `description`       | TEXT    | वैकल्पिक मानव-पठनीय लेबल                       |
| `created_at`        | TEXT    | `datetime('now')`                              |
| `last_triggered_at` | TEXT    | प्रत्येक डेलिभरी प्रयासमा अद्यावधिक हुने       |
| `last_status`       | INT     | अन्तिम प्रयासको HTTP स्थिति (0 = नेटवर्क)      |
| `failure_count`     | INT     | सफलतामा 0 मा रिसेट, विफलतामा +1                |

समग्र काउन्टरहरू `webhooks` पङ्क्तिमा राखिनुका अतिरिक्त, डेलिभरी इतिहास समर्पित
`webhook_deliveries` तालिकामा स्थायी रूपमा भण्डारण गरिन्छ
(माइग्रेसन `069_webhook_deliveries.sql`, प्रत्येक प्रयासमा
`src/lib/db/webhookDeliveries.ts::insertDelivery` मार्फत लेखिने)। किसिमसम्बन्धी मेटाडेटा (Slack / Discord /
Telegram / अनुकूलन पेलोड ट्रान्सफर्मरहरू) `070_webhooks_kind_metadata.sql` द्वारा थपिएको थियो।

## REST API

सबै एन्डपोइन्टहरूमा व्यवस्थापन प्रमाणीकरण (`requireManagementAuth`) आवश्यक हुन्छ।

| एन्डपोइन्ट                      | विधि   | विवरण                                           |
| ------------------------------- | ------ | ----------------------------------------------- |
| `/api/webhooks`                 | GET    | वेबहुकहरूको सूची (गोप्य कुञ्जीहरू मास्क गरिएका) |
| `/api/webhooks`                 | POST   | वेबहुक सिर्जना गर्ने                            |
| `/api/webhooks/[id]`            | GET    | वेबहुक विवरण (पूर्ण गोप्य कुञ्जी)               |
| `/api/webhooks/[id]`            | PUT    | फिल्डहरू अद्यावधिक गर्ने                        |
| `/api/webhooks/[id]`            | DELETE | हटाउने                                          |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` पठाउने (पुनःप्रयासबिना)             |
| `/api/webhooks/[id]/deliveries` | GET    | एउटा वेबहुकका हालैका डेलिभरी प्रयासहरू          |
| `/api/webhooks/validate-url`    | POST   | पूर्व-उडान URL प्रमाणीकरण (SSRF सुरक्षा)        |

`GET /api/webhooks` ले सूचीकरण पृष्ठहरूमा गोप्य कुञ्जी चुहिन नदिन त्यसलाई
`<पहिलो 10 अक्षर>...` का रूपमा मास्क गर्छ। तपाईंलाई वास्तवमै गोप्य कुञ्जी आवश्यक हुँदा
`[id]` GET प्रयोग गर्नुहोस्।

### वेबहुक सिर्जना गर्ने

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

यदि `secret` छुटाइएको छ भने, सर्भरले `whsec_<hex>` गोप्य कुञ्जी उत्पन्न गर्छ र
त्यसलाई प्रतिक्रियामा फर्काउँछ।

### वेबहुक परीक्षण गर्ने

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` फर्काउँछ। पुनःप्रयास गरिँदैन — रिसिभरले पेलोड र हस्ताक्षर
स्वीकार गर्छ कि गर्दैन भनेर छिटो प्रमाणीकरण गर्न उपयोगी हुन्छ।

## ड्यासबोर्ड

`/dashboard/webhooks` मा रहेको ड्यासबोर्ड पृष्ठ (हेर्नुहोस्
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) ले निम्न सुविधाहरू प्रदान गर्छ:

- इभेन्ट चयनकर्तासहित वेबहुक सिर्जना/सम्पादन
- `enabled`, `failure_count`, र `last_status` का आधारमा स्थिति सूचक (सक्रिय / निष्क्रिय / त्रुटियुक्त)
- एक क्लिकमा परीक्षण डेलिभरी
- म्यानुअल रूपमा सक्षम/असक्षम गर्ने टगल

## पेलोडका उदाहरणहरू

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
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` बाहेकका इभेन्टहरूको फिल्ड संरचना तिनलाई उत्सर्जन गर्ने कल साइटहरूद्वारा परिभाषित हुन्छ; `data` वस्तुलाई अग्रगामी-अनुकूल मान्नुहोस् (फिल्डहरू थप्नुहोस्, अनुपस्थितिमा निर्भर नहुनुहोस्)।

## उत्कृष्ट अभ्यासहरू

- **हरेक डेलिभरीमा कच्चा बडीसँग हस्ताक्षर प्रमाणीकरण गर्नुहोस्** — यसले तपाईंको वेबहुक URL अनुमान गर्ने जोसुकैले पठाउन सक्ने नक्कली POST अनुरोधहरू रोक्छ।
- **करिब ५ सेकेन्डभित्र 2xx प्रतिक्रिया दिनुहोस्** — डिस्प्याचर १० सेकेन्डमा टाइम आउट हुन्छ। ढिला रिसिभरहरूले पुनःप्रयासहरू खपत गर्नेछन् र `failure_count` बढाउनेछन्।
- **ह्यान्डलरहरूलाई आइडेम्पोटेन्ट बनाउनुहोस्** — पुनःप्रयास र कम्तीमा-एक-पटक डेलिभरीको अर्थ डुप्लिकेटहरू सम्भव छन्।
- **आवश्यक इभेन्टहरूमा मात्र सदस्यता लिनुहोस्** — तपाईंले वास्तवमै प्रयोग गर्ने इभेन्टहरू मात्र सूचीबद्ध गर्नुहोस्; `"*"` ले तपाईंको नियन्त्रणमा नभएका रिसिभरहरूमा लागत थप्नेछ।
- **`failure_count` निगरानी गर्नुहोस्** — लगातार १० पटक असफल भएपछि एन्डपोइन्टहरू स्वतः असक्षम हुन्छन्; रिसिभर ठीक गरेपछि `enabled: true` सहित `PUT /api/webhooks/[id]` कल गरेर रिसेट गर्नुहोस्।
- **गोप्य मानहरू आवधिक रूपमा परिवर्तन गर्नुहोस्** — नयाँ `secret` लाई `PUT` गर्नुहोस्, नयाँ मान रिसिभरमा डिप्लोय गर्नुहोस्, र परीक्षण एन्डपोइन्टमार्फत पुष्टि गर्नुहोस्।

## थप हेर्नुहोस्

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — पूर्ण व्यवस्थापन API सतह
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` मार्फत देखाइएका प्रदायक विफलताहरू पछाडिको सर्किट ब्रेकर / कूलडाउन
  व्यवहार
- स्रोत: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
