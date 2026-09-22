# Webhooks (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **सत्याचा अधिकृत स्रोत:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **शेवटचे अद्यतन:** 2026-06-28 — v3.8.40

OmniRoute प्लॅटफॉर्मवरील इव्हेंट्सवर HTTP वेबहुक ट्रिगर करू शकते. Slack,
PagerDuty, Datadog, अंतर्गत सूचना सेवा किंवा कोणत्याही HTTP रिसीव्हरसह एकत्रीकरण
करण्यासाठी त्यांचा वापर करा.

डिस्पॅचर प्रत्येक डिलिव्हरीवर HMAC-SHA256 वापरून स्वाक्षरी करतो, तात्पुरत्या
अपयशांनंतर पुन्हा प्रयत्न करतो, प्रत्येक वेबहुकच्या डिलिव्हरीच्या स्थितीचा मागोवा
घेतो आणि वारंवार अपयशी होणारे एंडपॉइंट्स आपोआप अक्षम करतो.

## समर्थित इव्हेंट्स

`WebhookEvent` प्रकार (`src/lib/webhooks/eventDescriptions.ts`, जो `src/lib/webhookDispatcher.ts` द्वारे वापरला जातो) सध्या नेमक्या चार इव्हेंट्सचे मॉडेल करतो:

| इव्हेंट             | कधी ट्रिगर होतो                                                       |
| ------------------- | --------------------------------------------------------------------- |
| `request.completed` | प्रॉक्सी केलेली विनंती यशस्वीरीत्या पूर्ण होते तेव्हा                 |
| `request.failed`    | सर्व पुनर्प्रयत्न/फॉलबॅकनंतर प्रॉक्सी केलेली विनंती अपयशी ठरते तेव्हा |
| `quota.exceeded`    | API की बजेट/कोटा मर्यादा ओलांडते तेव्हा                               |
| `test.ping`         | चाचणी एंडपॉइंटद्वारे वापरला जाणारा कृत्रिम इव्हेंट                    |

प्रत्येक इव्हेंट प्राप्त करण्यासाठी सदस्यत्वे लिटरल `"*"` स्वीकारतात. `events`
मधील अज्ञात इव्हेंटची नावे डिस्पॅचच्या वेळी दुर्लक्षित केली जातात.

> टीप: डिस्पॅचर API जोडलेला आहे, परंतु काही non-`test.ping` इव्हेंट्ससाठीची
> प्रॉडक्शन कॉल साइट्स अद्याप जोडली जात आहेत. तुमच्या रिलीझमध्ये सध्या कोणते
> मार्ग डिस्पॅचरला कॉल करतात हे पाहण्यासाठी `grep dispatchEvent` तपासा.

## आर्किटेक्चर

```
कॉलर (हँडलर, सेवा, मॉनिटर)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events नुसार फिल्टर करा
    -> प्रत्येक जुळणीसाठी (समांतरपणे):
       deliverWebhook(url, payload, secret)
         पेलोड तयार करा { event, timestamp, data }
         HMAC-SHA256 वापरून बॉडीवर स्वाक्षरी करा (secret असल्यास)
         10s टाइमआउटसह POST करा
         5xx / नेटवर्क त्रुटीवर जास्तीत जास्त 3 वेळा पुन्हा प्रयत्न करा
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

कॉलरसाठी डिस्पॅच हा फायर-अँड-फर्गेट पद्धतीचा आहे: `Promise.allSettled` प्रत्येक
वेबहुकच्या त्रुटी दडपतो, त्यामुळे एक खराब रिसीव्हर इतरांना ब्लॉक करू शकत नाही.

## HMAC स्वाक्षरी

जेव्हा वेबहुकमध्ये `secret` असतो, तेव्हा OmniRoute JSON बॉडीवर स्वाक्षरी करून
पुढील गोष्टी पाठवते:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> हेडरची नावे `X-Webhook-*` उपसर्ग वापरतात (`X-OmniRoute-*` नाही). स्वाक्षरीचे
> मूल्य `sha256=<hex>` आहे — संपूर्ण उपसर्गाची पडताळणी करा.

`createWebhook` ला secret शिवाय कॉल केल्यास, DB मॉड्यूल एक secret
(`whsec_<48 hex>`) व्युत्पन्न करते, त्यामुळे डीफॉल्टनुसार सर्व वेबहुक्सवर स्वाक्षरी केली जाते.

### रिसीव्हरवर पडताळणी करणे

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

कोणतेही JSON पार्सिंग करण्यापूर्वी नेहमी **मूळ** विनंती बॉडी वापरून पडताळणी करा.

## पुनर्प्रयत्न आणि अपयश धोरण

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- प्रत्येक प्रयत्नासाठी 10 सेकंदांची कालबाह्यता (`AbortController`).
- HTTP 2xx हे यश मानले जाते.
- HTTP 3xx/4xx ही पुनर्प्रयत्न न करता येणारी अंतिम स्थिती मानली जाते — `success = res.ok` सह वितरित म्हणून नोंदवली जाते.
- HTTP 5xx आणि नेटवर्क त्रुटींसाठी घातांकीय विलंबासह पुनर्प्रयत्न केले जातात:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` नंतर, वितरण अयशस्वी म्हणून नोंदवले जाते.
- प्रत्येक वितरण `last_triggered_at`, `last_status` अद्ययावत करते आणि `failure_count` एकतर रीसेट करते किंवा वाढवते.
- प्रत्येक फॅन-आउटनंतर डिस्पॅचर `disableWebhooksWithHighFailures(10)` कॉल करतो, त्यामुळे `failure_count >= 10` असलेला कोणताही webhook आपोआप अक्षम केला जातो.

## डेटाबेस

`webhooks` तक्ता (मायग्रेशन `011_webhooks.sql`):

| स्तंभ               | प्रकार  | नोंदी                                         |
| ------------------- | ------- | --------------------------------------------- |
| `id`                | TEXT PK | UUID                                          |
| `url`               | TEXT    | गंतव्य URL                                    |
| `events`            | TEXT    | JSON अॅरे; डीफॉल्ट `["*"]`                    |
| `secret`            | TEXT    | HMAC गुपित (न दिल्यास स्वयं-निर्मित)          |
| `enabled`           | INT     | 0/1; डीफॉल्ट 1                                |
| `description`       | TEXT    | पर्यायी मानवी-वाचनीय लेबल                     |
| `created_at`        | TEXT    | `datetime('now')`                             |
| `last_triggered_at` | TEXT    | प्रत्येक वितरण प्रयत्नाच्या वेळी अद्ययावत     |
| `last_status`       | INT     | शेवटच्या प्रयत्नाची HTTP स्थिती (0 = नेटवर्क) |
| `failure_count`     | INT     | यशस्वी झाल्यास 0 वर रीसेट, अपयश आल्यास +1     |

`webhooks` पंक्तीवरील एकत्रित काउंटरव्यतिरिक्त, वितरण इतिहास समर्पित `webhook_deliveries` तक्त्यात कायमस्वरूपी साठवला जातो
(मायग्रेशन `069_webhook_deliveries.sql`, प्रत्येक प्रयत्नावर
`src/lib/db/webhookDeliveries.ts::insertDelivery` द्वारे लिहिला जातो).
प्रकाराचा मेटाडेटा (Slack / Discord /
Telegram / सानुकूल पेलोड ट्रान्सफॉर्मर) `070_webhooks_kind_metadata.sql` द्वारे जोडला गेला.

## REST API

सर्व एंडपॉइंट्सना व्यवस्थापन प्रमाणीकरण (`requireManagementAuth`) आवश्यक आहे.

| एंडपॉइंट                        | पद्धत  | वर्णन                                       |
| ------------------------------- | ------ | ------------------------------------------- |
| `/api/webhooks`                 | GET    | webhooks ची यादी (गुपिते लपवलेली)           |
| `/api/webhooks`                 | POST   | webhook तयार करा                            |
| `/api/webhooks/[id]`            | GET    | webhook तपशील (संपूर्ण गुपित)               |
| `/api/webhooks/[id]`            | PUT    | फील्ड्स अद्ययावत करा                        |
| `/api/webhooks/[id]`            | DELETE | काढून टाका                                  |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ट्रिगर करा (पुनर्प्रयत्न नाहीत) |
| `/api/webhooks/[id]/deliveries` | GET    | एका webhook साठी अलीकडील वितरण प्रयत्न      |
| `/api/webhooks/validate-url`    | POST   | पूर्व-विनंती URL प्रमाणीकरण (SSRF सुरक्षा)  |

सूची पृष्ठांवर गुपित उघड होऊ नये म्हणून `GET /api/webhooks` गुपिताला
`<first 10 chars>...` या स्वरूपात लपवते. तुम्हाला खरोखर गुपित आवश्यक असेल तेव्हा `[id]` GET वापरा.

### webhook तयार करा

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

`secret` वगळल्यास, सर्व्हर `whsec_<hex>` गुपित तयार करतो आणि ते प्रतिसादात परत करतो.

### webhook ची चाचणी करा

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` परत करते. कोणतेही पुनर्प्रयत्न केले जात नाहीत — प्राप्तकर्ता पेलोड आणि स्वाक्षरी स्वीकारतो की नाही हे त्वरीत पडताळण्यासाठी हे उपयुक्त आहे.

## डॅशबोर्ड

`/dashboard/webhooks` वरील डॅशबोर्ड पृष्ठ (पहा
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) पुढील सुविधा प्रदान करते:

- इव्हेंट पिकरसह वेबहुक तयार करणे/संपादित करणे
- `enabled`, `failure_count`, आणि `last_status` यांवर आधारित स्थिती निर्देशक (सक्रिय / निष्क्रिय / त्रुटीयुक्त)
- एका क्लिकने चाचणी डिलिव्हरी
- मॅन्युअल सक्षम/अक्षम टॉगल

## पेलोडची उदाहरणे

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
    "message": "OmniRoute कडून चाचणी वेबहुक डिलिव्हरी",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` व्यतिरिक्त इतर इव्हेंटसाठी फील्डची रचना त्यांना उत्सर्जित करणाऱ्या कॉल साइट्सद्वारे परिभाषित केली जाते; `data` ऑब्जेक्टला पुढील आवृत्त्यांशी सुसंगत माना (फील्ड जोडा, त्यांच्या अनुपस्थितीवर अवलंबून राहू नका).

## सर्वोत्तम पद्धती

- **प्रत्येक डिलिव्हरीवरील स्वाक्षरी कच्च्या बॉडीच्या आधारे सत्यापित करा** — यामुळे तुमच्या वेबहुक URL चा अंदाज लावणाऱ्या कोणाकडूनही होणारे बनावट POST टाळले जातात.
- **सुमारे 5 सेकंदांच्या आत 2xx प्रतिसाद द्या** — डिस्पॅचर 10 s नंतर टाइम आउट होतो. धीमे रिसीव्हर्स पुनर्प्रयत्न वापरून टाकतील आणि `failure_count` वाढवतील.
- **हँडलर्स आयडेम्पोटंट बनवा** — पुनर्प्रयत्न आणि किमान-एकदा डिलिव्हरीची अर्थवत्ता यांमुळे डुप्लिकेट्स शक्य आहेत.
- **कमीत कमी सदस्यता घ्या** — फक्त तुम्ही प्रत्यक्षात वापरत असलेले इव्हेंट सूचीबद्ध करा; `"*"` मुळे तुमच्या नियंत्रणात नसलेल्या रिसीव्हर्सवरील खर्च वाढेल.
- **`failure_count` वर लक्ष ठेवा** — सलग 10 अपयशांनंतर एंडपॉइंट्स आपोआप अक्षम होतात; रिसीव्हर दुरुस्त केल्यानंतर `enabled: true` सह `PUT /api/webhooks/[id]` कॉल करून ते रीसेट करा.
- **सिक्रेट्स वेळोवेळी रोटेट करा** — नवीन `secret` `PUT` करा, नवीन मूल्य रिसीव्हरवर डिप्लॉय करा आणि चाचणी एंडपॉइंटद्वारे पुष्टी करा.

## हे देखील पहा

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — संपूर्ण व्यवस्थापन API पृष्ठभाग
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` द्वारे दर्शविलेल्या प्रोव्हायडर अपयशांमागील सर्किट ब्रेकर / कूलडाउन अर्थवत्ता
- स्रोत: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
