# Webhooks (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **உண்மைக்கான ஆதாரம்:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **கடைசியாகப் புதுப்பிக்கப்பட்டது:** 2026-06-28 — v3.8.40

தள நிகழ்வுகளின்போது OmniRoute HTTP வெப்ஹுக்குகளைத் தூண்ட முடியும். Slack, PagerDuty, Datadog, உள் எச்சரிக்கைச் சேவைகள் அல்லது எந்தவொரு HTTP பெறுநருடனும் ஒருங்கிணைக்க அவற்றைப் பயன்படுத்தவும்.

அனுப்பி ஒவ்வொரு விநியோகத்திற்கும் HMAC-SHA256 மூலம் கையொப்பமிடுகிறது, தற்காலிகத் தோல்விகளின்போது மீண்டும் முயற்சிக்கிறது, ஒவ்வொரு வெப்ஹுக்கிற்குமான விநியோக நிலையைத் தடமறிகிறது, மேலும் தொடர்ந்து தோல்வியடையும் முனைப்புள்ளிகளைத் தானாக முடக்குகிறது.

## ஆதரிக்கப்படும் நிகழ்வுகள்

`WebhookEvent` வகை (`src/lib/webhooks/eventDescriptions.ts`, இதை `src/lib/webhookDispatcher.ts` பயன்படுத்துகிறது) தற்போது சரியாக நான்கு நிகழ்வுகளை மாதிரியாக்குகிறது:

| நிகழ்வு             | தூண்டப்படும் சூழல்                                                                                    |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| `request.completed` | பதிலி வழியாக அனுப்பப்பட்ட கோரிக்கை வெற்றிகரமாக நிறைவடையும்போது                                        |
| `request.failed`    | அனைத்து மறுமுயற்சிகள்/மாற்றுவழிகளுக்குப் பிறகும் பதிலி வழியாக அனுப்பப்பட்ட கோரிக்கை தோல்வியடையும்போது |
| `quota.exceeded`    | API விசை ஒரு செலவுத்திட்டம்/ஒதுக்கீட்டு வரம்பைத் தாண்டும்போது                                         |
| `test.ping`         | சோதனை முனைப்புள்ளியால் பயன்படுத்தப்படும் செயற்கை நிகழ்வு                                              |

ஒவ்வொரு நிகழ்வையும் பெற சந்தாக்கள் நேரடி மதிப்பான `"*"`-ஐ ஏற்கின்றன. `events`-இல் உள்ள அறியப்படாத நிகழ்வுப் பெயர்கள் அனுப்பும் நேரத்தில் புறக்கணிக்கப்படுகின்றன.

> குறிப்பு: அனுப்பி API இணைக்கப்பட்டுள்ளது, ஆனால் சில `test.ping` அல்லாத நிகழ்வுகளுக்கான
> உற்பத்தி அழைப்புத் தளங்கள் இன்னும் சேர்க்கப்பட்டு வருகின்றன. உங்கள் வெளியீட்டில் தற்போது எந்தப் பாதைகள்
> அனுப்பியை அழைக்கின்றன என்பதைப் பார்க்க `grep dispatchEvent`-ஐச் சரிபார்க்கவும்.

## கட்டமைப்பு

```
அழைப்பாளர் (கையாளுநர், சேவை, கண்காணிப்பான்)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events அடிப்படையில் வடிகட்டு
    -> பொருந்தும் ஒவ்வொன்றுக்கும் (இணையாக):
       deliverWebhook(url, payload, secret)
         payload { event, timestamp, data }-ஐ உருவாக்கு
         HMAC-SHA256 மூலம் body-க்கு கையொப்பமிடு (secret இருந்தால்)
         10s காலக்கெடுவுடன் POST செய்
         5xx / பிணையப் பிழையின்போது அதிகபட்சம் 3 முறை மீண்டும் முயற்சி செய்
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

அழைப்பாளருக்கு அனுப்புதல் தொடங்கிவிட்டு மறக்கப்படும் முறையில் செயல்படுகிறது: ஒரு மோசமான பெறுநர் மற்றவற்றைத் தடுக்க முடியாதவாறு, ஒவ்வொரு வெப்ஹுக்கிற்குமான பிழைகளையும் `Promise.allSettled` உள்வாங்குகிறது.

## HMAC கையொப்பமிடுதல்

ஒரு வெப்ஹுக்கில் `secret` இருக்கும்போது, OmniRoute JSON உடலுக்குக் கையொப்பமிட்டு பின்வருவனவற்றை அனுப்புகிறது:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> தலைப்புப் பெயர்கள் `X-Webhook-*` முன்னொட்டைப் பயன்படுத்துகின்றன (`X-OmniRoute-*` அல்ல). கையொப்ப
> மதிப்பு `sha256=<hex>` — முழு முன்னொட்டையும் சரிபார்க்கவும்.

ரகசியம் இல்லாமல் `createWebhook` அழைக்கப்பட்டால், DB தொகுதி ஒன்றை உருவாக்குகிறது
(`whsec_<48 hex>`); எனவே இயல்பாக எல்லா வெப்ஹுக்குகளும் கையொப்பமிடப்படுகின்றன.

### பெறுநரில் சரிபார்த்தல்

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

எந்தவொரு JSON பகுப்பாய்வுக்கும் முன், எப்போதும் **மூல** கோரிக்கை உடலைக் கொண்டு சரிபார்க்கவும்.

## மறுமுயற்சி & தோல்விக் கொள்கை

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ஒவ்வொரு முயற்சிக்கும் 10 வினாடி நேர முடிவு (`AbortController`).
- HTTP 2xx வெற்றியாகக் கருதப்படும்.
- HTTP 3xx/4xx மறுமுயற்சி செய்ய முடியாத இறுதி நிலையாகக் கருதப்படும் — `success = res.ok` உடன் வழங்கப்பட்டதாகப் பதிவுசெய்யப்படும்.
- HTTP 5xx மற்றும் பிணையப் பிழைகளுக்கு அதிவேகமாக அதிகரிக்கும் பின்னடைவுடன் மறுமுயற்சி செய்யப்படும்:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries`-க்குப் பிறகு, வழங்கல் தோல்வியடைந்ததாகப் பதிவுசெய்யப்படும்.
- ஒவ்வொரு வழங்கலும் `last_triggered_at`, `last_status` ஆகியவற்றைப் புதுப்பித்து, `failure_count`-ஐ மீட்டமைக்கும் அல்லது அதிகரிக்கும்.
- ஒவ்வொரு fan-out-க்குப் பிறகும் dispatcher `disableWebhooksWithHighFailures(10)`-ஐ அழைக்கும்; எனவே `failure_count >= 10` கொண்ட எந்த webhook-உம் தானாகவே முடக்கப்படும்.

## தரவுத்தளம்

`webhooks` அட்டவணை (இடம்பெயர்வு `011_webhooks.sql`):

| நெடுவரிசை           | வகை     | குறிப்புகள்                                                |
| ------------------- | ------- | ---------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                       |
| `url`               | TEXT    | இலக்கு URL                                                 |
| `events`            | TEXT    | JSON வரிசை; இயல்புநிலை `["*"]`                             |
| `secret`            | TEXT    | HMAC ரகசியம் (வழங்கப்படாவிட்டால் தானாக உருவாக்கப்படும்)    |
| `enabled`           | INT     | 0/1; இயல்புநிலை 1                                          |
| `description`       | TEXT    | விருப்பமான மனிதர் வாசிக்கக்கூடிய அடையாளம்                  |
| `created_at`        | TEXT    | `datetime('now')`                                          |
| `last_triggered_at` | TEXT    | ஒவ்வொரு வழங்கல் முயற்சியிலும் புதுப்பிக்கப்படும்           |
| `last_status`       | INT     | கடைசி முயற்சியின் HTTP நிலை (0 = பிணையம்)                  |
| `failure_count`     | INT     | வெற்றியின்போது 0-க்கு மீட்டமைக்கப்படும், தோல்வியின்போது +1 |

வழங்கல் வரலாறு பிரத்யேகமான `webhook_deliveries` அட்டவணையில் நிலையாகச் சேமிக்கப்படுகிறது
(இடம்பெயர்வு `069_webhook_deliveries.sql`, ஒவ்வொரு முயற்சியிலும்
`src/lib/db/webhookDeliveries.ts::insertDelivery` வழியாக எழுதப்படுகிறது); மேலும்
`webhooks` வரிசையிலுள்ள தொகுப்பு எண்ணிக்கைகளும் பராமரிக்கப்படுகின்றன. வகை மெட்டாதரவு (Slack / Discord /
Telegram / தனிப்பயன் payload மாற்றிகள்) `070_webhooks_kind_metadata.sql` மூலம் சேர்க்கப்பட்டது.

## REST API

அனைத்து endpoint-களுக்கும் நிர்வாக அங்கீகாரம் (`requireManagementAuth`) தேவை.

| Endpoint                        | முறை   | விளக்கம்                                              |
| ------------------------------- | ------ | ----------------------------------------------------- |
| `/api/webhooks`                 | GET    | webhook-களைப் பட்டியலிடும் (ரகசியங்கள் மறைக்கப்படும்) |
| `/api/webhooks`                 | POST   | webhook-ஐ உருவாக்கும்                                 |
| `/api/webhooks/[id]`            | GET    | webhook விவரம் (முழு ரகசியம்)                         |
| `/api/webhooks/[id]`            | PUT    | புலங்களைப் புதுப்பிக்கும்                             |
| `/api/webhooks/[id]`            | DELETE | அகற்றும்                                              |
| `/api/webhooks/[id]/test`       | POST   | `test.ping`-ஐ அனுப்பும் (மறுமுயற்சிகள் இல்லை)         |
| `/api/webhooks/[id]/deliveries` | GET    | ஒரு webhook-க்கான சமீபத்திய வழங்கல் முயற்சிகள்        |
| `/api/webhooks/validate-url`    | POST   | முன்கூட்டிய URL சரிபார்ப்பு (SSRF பாதுகாப்பு)         |

பட்டியல் பக்கங்களில் ரகசியம் கசியாமல் இருக்க, `GET /api/webhooks` ரகசியத்தை
`<முதல் 10 எழுத்துகள்>...` என்ற வடிவில் மறைக்கும். ரகசியம் உண்மையில் தேவைப்படும்போது
`[id]` GET-ஐப் பயன்படுத்தவும்.

### webhook-ஐ உருவாக்குதல்

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

`secret` விடுபட்டிருந்தால், சேவையகம் `whsec_<hex>` ரகசியத்தை உருவாக்கி,
பதிலில் அதைத் திருப்பியளிக்கும்.

### webhook-ஐச் சோதித்தல்

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` என்பதைத் திருப்பியளிக்கும். எந்த மறுமுயற்சியும் மேற்கொள்ளப்படாது — பெறுநர் payload மற்றும் கையொப்பத்தை ஏற்றுக்கொள்கிறாரா என்பதை விரைவாகச் சரிபார்க்க இது பயனுள்ளதாக இருக்கும்.

## டாஷ்போர்டு

`/dashboard/webhooks` இல் உள்ள டாஷ்போர்டு பக்கம் (`src/app/(dashboard)/dashboard/webhooks/page.tsx` ஐப் பார்க்கவும்) பின்வருவனவற்றை வழங்குகிறது:

- நிகழ்வுத் தேர்வியுடன் webhooks-ஐ உருவாக்குதல்/திருத்துதல்
- `enabled`, `failure_count` மற்றும் `last_status` ஆகியவற்றின் அடிப்படையில் நிலைக் காட்டி (செயலில் / செயலற்றது / பிழை ஏற்பட்டது)
- ஒரே கிளிக்கில் சோதனை அனுப்புகை
- கைமுறையாகச் செயல்படுத்தும்/முடக்கும் நிலைமாற்றி

## Payload எடுத்துக்காட்டுகள்

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
    "message": "OmniRoute இலிருந்து சோதனை webhook அனுப்புகை",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` அல்லாத நிகழ்வுகளுக்கான புலங்களின் வடிவங்கள், அவற்றை வெளியிடும் அழைப்பிடங்களால் வரையறுக்கப்படுகின்றன; `data` பொருளை எதிர்கால இணக்கத்தன்மை கொண்டதாகக் கருதவும் (புலங்களைச் சேர்க்கலாம், அவை இல்லாதிருப்பதைச் சார்ந்திருக்க வேண்டாம்).

## சிறந்த நடைமுறைகள்

- **ஒவ்வொரு அனுப்புகையிலும் raw body-க்கு எதிராகக் கையொப்பத்தைச் சரிபார்க்கவும்** — உங்கள் webhook URL-ஐ ஊகிக்கும் எவரிடமிருந்தும் வரும் போலியான POST கோரிக்கைகளை இது தடுக்கிறது.
- **~5 வினாடிகளுக்குள் 2xx பதிலளிக்கவும்** — dispatcher 10 s-இல் காலாவதியாகும். மெதுவான பெறுநர்கள் மறுமுயற்சிகளைப் பயன்படுத்தி `failure_count`-ஐ அதிகரிப்பார்கள்.
- **Handlers-ஐ idempotent ஆக உருவாக்கவும்** — மறுமுயற்சிகளும் குறைந்தது ஒருமுறையாவது அனுப்பப்படும் நடைமுறையும் நகல்கள் ஏற்படக்கூடும் என்பதைக் குறிக்கின்றன.
- **தேவையானவற்றுக்கு மட்டும் subscribe செய்யவும்** — நீங்கள் உண்மையில் பயன்படுத்தும் நிகழ்வுகளை மட்டும் பட்டியலிடவும்; `"*"` நீங்கள் கட்டுப்படுத்தாத பெறுநர்களுக்கான செலவை அதிகரிக்கும்.
- **`failure_count`-ஐக் கண்காணிக்கவும்** — தொடர்ச்சியாக 10 தோல்விகள் ஏற்பட்டால் endpoints தானாக முடக்கப்படும்; பெறுநரைச் சரிசெய்த பிறகு `enabled: true` உடன் `PUT /api/webhooks/[id]`-ஐ அழைப்பதன் மூலம் மீட்டமைக்கவும்.
- **Secrets-ஐ அவ்வப்போது மாற்றவும்** — புதிய `secret`-ஐ `PUT` செய்து, புதிய மதிப்பைப் பெறுநருக்குப் deploy செய்து, சோதனை endpoint வழியாக உறுதிப்படுத்தவும்.

## மேலும் காண்க

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — முழுமையான மேலாண்மை API பரப்பு
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` வழியாக வெளிப்படுத்தப்படும் provider தோல்விகளுக்குப் பின்னுள்ள circuit breaker / cooldown நடைமுறைகள்
- மூலம்: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
