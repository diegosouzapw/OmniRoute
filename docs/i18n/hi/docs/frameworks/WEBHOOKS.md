# Webhooks (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **प्रामाणिक स्रोत:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **अंतिम अपडेट:** 2026-06-28 — v3.8.40

OmniRoute प्लेटफ़ॉर्म इवेंट्स पर HTTP वेबहुक ट्रिगर कर सकता है। इनका उपयोग
Slack, PagerDuty, Datadog, आंतरिक अलर्टिंग सेवाओं या किसी भी HTTP रिसीवर के साथ एकीकरण के लिए करें।

डिस्पैचर प्रत्येक डिलीवरी को HMAC-SHA256 से हस्ताक्षरित करता है, अस्थायी
विफलताओं पर पुनः प्रयास करता है, प्रत्येक वेबहुक की डिलीवरी स्थिति को ट्रैक करता है और लगातार
विफल होने वाले एंडपॉइंट्स को स्वतः अक्षम कर देता है।

## समर्थित इवेंट्स

`WebhookEvent` प्रकार (`src/lib/webhooks/eventDescriptions.ts`, जिसका उपयोग `src/lib/webhookDispatcher.ts` करता है) वर्तमान में ठीक चार इवेंट्स को मॉडल करता है:

| इवेंट               | कब ट्रिगर होता है                                                      |
| ------------------- | ---------------------------------------------------------------------- |
| `request.completed` | प्रॉक्सी किया गया अनुरोध सफलतापूर्वक पूरा होने पर                      |
| `request.failed`    | सभी पुनः प्रयासों/फ़ॉलबैक के बाद प्रॉक्सी किया गया अनुरोध विफल होने पर |
| `quota.exceeded`    | API कुंजी के बजट/कोटा सीमा पार करने पर                                 |
| `test.ping`         | परीक्षण एंडपॉइंट द्वारा उपयोग किया जाने वाला सिंथेटिक इवेंट            |

प्रत्येक इवेंट प्राप्त करने के लिए सब्सक्रिप्शन लिटरल `"*"` स्वीकार करते हैं। `events` में
अज्ञात इवेंट नामों को डिस्पैच के समय अनदेखा कर दिया जाता है।

> नोट: डिस्पैचर API जुड़ा हुआ है, लेकिन कुछ गैर-`test.ping`
> इवेंट्स के लिए प्रोडक्शन कॉल साइट्स अभी भी जोड़ी जा रही हैं। यह देखने के लिए `grep dispatchEvent` जाँचें
> कि आपके रिलीज़ में वर्तमान में कौन-से पाथ डिस्पैचर को इनवोक करते हैं।

## आर्किटेक्चर

```
कॉलर (हैंडलर, सेवा, मॉनिटर)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events के आधार पर फ़िल्टर करें
    -> प्रत्येक मिलान के लिए (समानांतर रूप से):
       deliverWebhook(url, payload, secret)
         पेलोड { event, timestamp, data } बनाएँ
         बॉडी को HMAC-SHA256 से हस्ताक्षरित करें (यदि सीक्रेट मौजूद है)
         10s टाइमआउट के साथ POST करें
         5xx / नेटवर्क त्रुटि पर अधिकतम 3 बार पुनः प्रयास करें
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

कॉलर के लिए डिस्पैच फ़ायर-एंड-फ़ॉरगेट है: `Promise.allSettled` प्रत्येक वेबहुक की
त्रुटियों को दबा देता है, ताकि एक खराब रिसीवर अन्य रिसीवर्स को ब्लॉक न कर सके।

## HMAC हस्ताक्षरण

जब किसी वेबहुक में `secret` होता है, तो OmniRoute JSON बॉडी को हस्ताक्षरित करता है और यह भेजता है:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <इवेंट>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<हेक्स HMAC-SHA256(सीक्रेट, बॉडी)>
```

> हेडर नाम `X-Webhook-*` प्रीफ़िक्स का उपयोग करते हैं (`X-OmniRoute-*` का नहीं)। सिग्नेचर
> मान `sha256=<hex>` है — पूरे प्रीफ़िक्स को सत्यापित करें।

यदि `createWebhook` को बिना सीक्रेट के कॉल किया जाता है, तो DB मॉड्यूल एक सीक्रेट
(`whsec_<48 hex>`) जनरेट करता है, इसलिए डिफ़ॉल्ट रूप से सभी वेबहुक हस्ताक्षरित होते हैं।

### रिसीवर पर सत्यापन

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

किसी भी JSON पार्सिंग से पहले हमेशा **रॉ** अनुरोध बॉडी के विरुद्ध सत्यापन करें।

## पुनः प्रयास और विफलता नीति

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- प्रत्येक प्रयास के लिए 10 सेकंड की समय-सीमा (`AbortController`)।
- HTTP 2xx को सफलता माना जाता है।
- HTTP 3xx/4xx को पुनः प्रयास न करने योग्य अंतिम स्थिति माना जाता है — इसे डिलीवर किया गया दर्ज किया जाता है, जहाँ `success = res.ok` होता है।
- HTTP 5xx और नेटवर्क त्रुटियों पर एक्सपोनेंशियल बैकऑफ़ के साथ पुनः प्रयास किया जाता है:
  `2^attempt * 1000 ms` (1s, 2s, 4s)।
- `maxRetries` के बाद, डिलीवरी को विफल दर्ज किया जाता है।
- प्रत्येक डिलीवरी `last_triggered_at`, `last_status` को अपडेट करती है और `failure_count` को या तो रीसेट करती है या बढ़ाती है।
- डिस्पैचर प्रत्येक फ़ैन-आउट के बाद `disableWebhooksWithHighFailures(10)` को कॉल करता है, इसलिए `failure_count >= 10` वाला कोई भी वेबहुक स्वचालित रूप से अक्षम हो जाता है।

## डेटाबेस

तालिका `webhooks` (माइग्रेशन `011_webhooks.sql`):

| कॉलम                | प्रकार  | टिप्पणियाँ                                       |
| ------------------- | ------- | ------------------------------------------------ |
| `id`                | TEXT PK | UUID                                             |
| `url`               | TEXT    | गंतव्य URL                                       |
| `events`            | TEXT    | JSON सरणी; डिफ़ॉल्ट `["*"]`                      |
| `secret`            | TEXT    | HMAC सीक्रेट (न दिए जाने पर स्वतः जनरेट होता है) |
| `enabled`           | INT     | 0/1; डिफ़ॉल्ट 1                                  |
| `description`       | TEXT    | वैकल्पिक मानव-पठनीय लेबल                         |
| `created_at`        | TEXT    | `datetime('now')`                                |
| `last_triggered_at` | TEXT    | प्रत्येक डिलीवरी प्रयास पर अपडेट होता है         |
| `last_status`       | INT     | अंतिम प्रयास की HTTP स्थिति (0 = नेटवर्क)        |
| `failure_count`     | INT     | सफलता पर 0 पर रीसेट, विफलता पर +1                |

डिलीवरी इतिहास को समर्पित `webhook_deliveries` तालिका में बनाए रखा जाता है
(माइग्रेशन `069_webhook_deliveries.sql`, प्रत्येक प्रयास पर
`src/lib/db/webhookDeliveries.ts::insertDelivery` के माध्यम से लिखा जाता है), साथ ही
`webhooks` पंक्ति पर समेकित काउंटर भी रखे जाते हैं। प्रकार मेटाडेटा (Slack / Discord /
Telegram / कस्टम पेलोड ट्रांसफ़ॉर्मर) को `070_webhooks_kind_metadata.sql` द्वारा जोड़ा गया था।

## REST API

सभी एंडपॉइंट के लिए प्रबंधन प्रमाणीकरण (`requireManagementAuth`) आवश्यक है।

| एंडपॉइंट                        | विधि   | विवरण                                   |
| ------------------------------- | ------ | --------------------------------------- |
| `/api/webhooks`                 | GET    | वेबहुक सूचीबद्ध करें (सीक्रेट छिपाए गए) |
| `/api/webhooks`                 | POST   | वेबहुक बनाएँ                            |
| `/api/webhooks/[id]`            | GET    | वेबहुक विवरण (पूरा सीक्रेट)             |
| `/api/webhooks/[id]`            | PUT    | फ़ील्ड अपडेट करें                       |
| `/api/webhooks/[id]`            | DELETE | हटाएँ                                   |
| `/api/webhooks/[id]/test`       | POST   | एक `test.ping` भेजें (पुनः प्रयास नहीं) |
| `/api/webhooks/[id]/deliveries` | GET    | एक वेबहुक के हालिया डिलीवरी प्रयास      |
| `/api/webhooks/validate-url`    | POST   | प्री-फ़्लाइट URL सत्यापन (SSRF सुरक्षा) |

`GET /api/webhooks` सूचीबद्ध करने वाले पृष्ठों पर सीक्रेट लीक होने से बचाने के लिए उसे
`<first 10 chars>...` के रूप में छिपाता है। जब वास्तव में सीक्रेट की आवश्यकता हो,
तब `[id]` GET का उपयोग करें।

### वेबहुक बनाएँ

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

यदि `secret` छोड़ दिया जाता है, तो सर्वर एक `whsec_<hex>` सीक्रेट जनरेट करता है और
उसे प्रतिक्रिया में लौटाता है।

### वेबहुक का परीक्षण करें

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` लौटाता है। कोई पुनः प्रयास नहीं किया जाता — यह शीघ्रता से
सत्यापित करने के लिए उपयोगी है कि रिसीवर पेलोड और हस्ताक्षर स्वीकार करता है।

## डैशबोर्ड

`/dashboard/webhooks` पर स्थित डैशबोर्ड पृष्ठ (देखें
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) निम्न सुविधाएँ प्रदान करता है:

- इवेंट पिकर के साथ वेबहुक बनाना/संपादित करना
- `enabled`, `failure_count`, और `last_status` के आधार पर स्थिति संकेतक (सक्रिय / निष्क्रिय / त्रुटिपूर्ण)
- एक क्लिक में परीक्षण डिलीवरी
- मैन्युअल रूप से सक्षम/अक्षम करने का टॉगल

## पेलोड के उदाहरण

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
    "message": "OmniRoute से परीक्षण वेबहुक डिलीवरी",
    "webhookId": "<uuid>"
  }
}
```

गैर-`test.ping` इवेंट के फ़ील्ड स्वरूप उन्हें उत्सर्जित करने वाले कॉल साइट द्वारा परिभाषित किए जाते हैं; `data` ऑब्जेक्ट को फ़ॉरवर्ड-कम्पैटिबल मानें (फ़ील्ड जोड़ें, उनकी अनुपस्थिति पर निर्भर न रहें)।

## सर्वोत्तम अभ्यास

- **प्रत्येक डिलीवरी पर रॉ बॉडी के विरुद्ध हस्ताक्षर सत्यापित करें** — यह आपका वेबहुक URL अनुमान लगाने वाले किसी भी व्यक्ति की ओर से भेजे गए नकली POST अनुरोधों को रोकता है।
- **लगभग 5 सेकंड के भीतर 2xx प्रतिक्रिया दें** — डिस्पैचर 10 सेकंड पर टाइम आउट हो जाता है। धीमे रिसीवर पुनः प्रयासों का उपयोग करेंगे और `failure_count` बढ़ाएँगे।
- **हैंडलर को आइडेम्पोटेंट बनाएँ** — पुनः प्रयास और कम-से-कम-एक-बार डिलीवरी सिमेंटिक्स के कारण डुप्लिकेट संभव हैं।
- **न्यूनतम सब्सक्रिप्शन रखें** — केवल उन्हीं इवेंट को सूचीबद्ध करें जिनका आप वास्तव में उपयोग करते हैं; `"*"` उन रिसीवर पर लागत बढ़ाएगा जिन्हें आप नियंत्रित नहीं करते।
- **`failure_count` पर नज़र रखें** — लगातार 10 विफलताओं पर एंडपॉइंट स्वतः अक्षम हो जाते हैं; रिसीवर को ठीक करने के बाद `enabled: true` के साथ `PUT /api/webhooks/[id]` कॉल करके इसे रीसेट करें।
- **सीक्रेट को समय-समय पर रोटेट करें** — नया `secret` `PUT` करें, नई वैल्यू को रिसीवर पर डिप्लॉय करें, और परीक्षण एंडपॉइंट के माध्यम से पुष्टि करें।

## यह भी देखें

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — संपूर्ण प्रबंधन API सतह
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` के माध्यम से दिखाई देने वाली प्रदाता विफलताओं के पीछे के सर्किट ब्रेकर / कूलडाउन सिमेंटिक्स
- स्रोत: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
