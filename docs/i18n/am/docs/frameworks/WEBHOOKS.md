# Webhooks (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **የእውነት ምንጭ:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **መጨረሻ የተዘመነው:** 2026-06-28 — v3.8.40

OmniRoute በመድረክ ክስተቶች ጊዜ HTTP webhooks ሊያስነሳ ይችላል። ከ
Slack፣ PagerDuty፣ Datadog፣ ውስጣዊ የማንቂያ አገልግሎቶች ወይም ከማንኛውም HTTP ተቀባይ ጋር ለማዋሃድ ይጠቀሙባቸው።

አሰራጩ እያንዳንዱን ርክክብ በHMAC-SHA256 ይፈርማል፣ ጊዜያዊ
ውድቀቶች ሲከሰቱ እንደገና ይሞክራል፣ ለእያንዳንዱ webhook የርክክብ ጤንነትን ይከታተላል፣ እና በተደጋጋሚ
የሚወድቁ endpointsን በራስ-ሰር ያሰናክላል።

## የሚደገፉ ክስተቶች

የ`WebhookEvent` ዓይነት (`src/lib/webhooks/eventDescriptions.ts`፣ በ`src/lib/webhookDispatcher.ts` ጥቅም ላይ የሚውል) በአሁኑ ጊዜ በትክክል አራት ክስተቶችን ይወክላል፦

| ክስተት                | የሚነሳበት ጊዜ                                         |
| ------------------- | ------------------------------------------------- |
| `request.completed` | በproxy የተላለፈ ጥያቄ በተሳካ ሁኔታ ሲጠናቀቅ                   |
| `request.failed`    | በproxy የተላለፈ ጥያቄ ከሁሉም ድጋሚ ሙከራዎች/fallback በኋላ ሲወድቅ |
| `quota.exceeded`    | አንድ API key የበጀት/quota ገደብን ሲያልፍ                  |
| `test.ping`         | በሙከራ endpoint ጥቅም ላይ የሚውል ሰው ሰራሽ ክስተት             |

ምዝገባዎች እያንዳንዱን ክስተት ለመቀበል ቀጥተኛውን `"*"` ይቀበላሉ። በ
`events` ውስጥ ያሉ ያልታወቁ የክስተት ስሞች በስርጭት ጊዜ ችላ ይባላሉ።

> ማስታወሻ፦ የአሰራጩ API ተገናኝቷል፣ ነገር ግን ለአንዳንድ
> `test.ping` ያልሆኑ ክስተቶች የምርት ጥሪ ቦታዎች አሁንም በመጨመር ላይ ናቸው። በርስዎ ልቀት ውስጥ
> የትኞቹ መንገዶች አሰራጩን እንደሚጠሩ ለማየት `grep dispatchEvent`ን ይፈትሹ።

## አርክቴክቸር

```
ጠሪ (handler፣ service፣ monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> በwebhook.events አጣራ
    -> ለእያንዳንዱ ተዛማጅ (በትይዩ):
       deliverWebhook(url, payload, secret)
         payloadን ገንባ { event, timestamp, data }
         bodyን በHMAC-SHA256 ፈርም (secret ካለ)
         በ10s timeout POST አድርግ
         በ5xx / network error ላይ እስከ 3 ጊዜ ድጋሚ ሞክር
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

ስርጭቱ ለጠሪው አስነስቶ-የሚረሳ ነው፦ `Promise.allSettled`
በእያንዳንዱ webhook ላይ የሚከሰቱ ስህተቶችን ስለሚያልፍ፣ አንድ መጥፎ ተቀባይ ሌሎቹን ማገድ አይችልም።

## HMAC ፊርማ

አንድ webhook `secret` ሲኖረው፣ OmniRoute የJSON bodyውን ፈርሞ የሚከተለውን ይልካል፦

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> የheader ስሞች የ`X-Webhook-*` ቅድመ ቅጥያን ይጠቀማሉ (`X-OmniRoute-*` አይደለም)። የፊርማው
> እሴት `sha256=<hex>` ነው — ሙሉውን ቅድመ ቅጥያ ያረጋግጡ።

`createWebhook` ያለ secret ከተጠራ፣ የDB ሞጁሉ አንድ ያመነጫል
(`whsec_<48 hex>`)፣ ስለዚህ ሁሉም webhooks በነባሪነት የተፈረሙ ናቸው።

### በተቀባዩ ላይ ማረጋገጥ

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ማንኛውም የJSON ትንተና ከመደረጉ በፊት ሁልጊዜ **ጥሬውን** የጥያቄ body በመጠቀም ያረጋግጡ።

## የድጋሚ ሙከራ እና የውድቀት ፖሊሲ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ለእያንዳንዱ ሙከራ የ10 ሰከንድ የጊዜ ገደብ (`AbortController`)።
- HTTP 2xx እንደ ስኬት ይቆጠራል።
- HTTP 3xx/4xx ዳግም ሊሞከር የማይችል የመጨረሻ ሁኔታ ሆኖ ይቆጠራል — እንደተላከ ይመዘገባል፣
  `success = res.ok` ይሆናል።
- HTTP 5xx እና የአውታረ መረብ ስህተቶች በጨምሮ በሚሄድ የመጠበቂያ ጊዜ ዳግም ይሞከራሉ፦
  `2^attempt * 1000 ms` (1s, 2s, 4s)።
- ከ`maxRetries` በኋላ ማድረሱ እንደወደቀ ይመዘገባል።
- እያንዳንዱ ማድረስ `last_triggered_at`ን፣ `last_status`ን ያዘምናል፤ እንዲሁም
  `failure_count`ን ዳግም ወደ ዜሮ ይመልሳል ወይም ይጨምራል።
- አሰራጩ ከእያንዳንዱ ሰፊ ስርጭት በኋላ `disableWebhooksWithHighFailures(10)`ን ይጠራል፤
  ስለዚህ `failure_count >= 10` ያለው ማንኛውም webhook በራስ-ሰር ይሰናከላል።

## የውሂብ ጎታ

ሰንጠረዥ `webhooks` (ማዛወሪያ `011_webhooks.sql`)፦

| ዓምድ                 | ዓይነት    | ማስታወሻዎች                            |
| ------------------- | ------- | ---------------------------------- |
| `id`                | TEXT PK | UUID                               |
| `url`               | TEXT    | የመድረሻ URL                          |
| `events`            | TEXT    | JSON ድርድር፤ ነባሪው `["*"]`            |
| `secret`            | TEXT    | HMAC ሚስጥር (ካልተሰጠ በራስ-ሰር የሚፈጠር)     |
| `enabled`           | INT     | 0/1፤ ነባሪው 1                        |
| `description`       | TEXT    | አማራጭ በሰው የሚነበብ መለያ                 |
| `created_at`        | TEXT    | `datetime('now')`                  |
| `last_triggered_at` | TEXT    | በእያንዳንዱ የማድረስ ሙከራ ላይ ይዘምናል         |
| `last_status`       | INT     | የመጨረሻው ሙከራ HTTP ሁኔታ (0 = አውታረ መረብ) |
| `failure_count`     | INT     | ሲሳካ ወደ 0 ይመለሳል፣ ሲወድቅ +1 ይጨምራል      |

የማድረስ ታሪክ በተለየው `webhook_deliveries` ሰንጠረዥ ውስጥ ይቀመጣል
(ማዛወሪያ `069_webhook_deliveries.sql`፣ በእያንዳንዱ ሙከራ
`src/lib/db/webhookDeliveries.ts::insertDelivery` በኩል የሚጻፍ)፤ ይህም
በ`webhooks` ረድፍ ላይ ካሉት ድምር ቆጣሪዎች በተጨማሪ ነው። የዓይነት ሜታዳታ (Slack / Discord /
Telegram / ብጁ የpayload ቀያሪዎች) በ`070_webhooks_kind_metadata.sql` ታክሏል።

## REST API

ሁሉም endpoints የአስተዳደር ማረጋገጫ (`requireManagementAuth`) ይፈልጋሉ።

| Endpoint                        | ዘዴ     | መግለጫ                             |
| ------------------------------- | ------ | -------------------------------- |
| `/api/webhooks`                 | GET    | webhooksን ዘርዝር (ሚስጥሮች የተሸፈኑ)     |
| `/api/webhooks`                 | POST   | webhook ፍጠር                      |
| `/api/webhooks/[id]`            | GET    | የwebhook ዝርዝር መረጃ (ሙሉ ሚስጥር)      |
| `/api/webhooks/[id]`            | PUT    | መስኮችን አዘምን                       |
| `/api/webhooks/[id]`            | DELETE | አስወግድ                            |
| `/api/webhooks/[id]/test`       | POST   | `test.ping`ን ላክ (ያለ ድጋሚ ሙከራዎች)   |
| `/api/webhooks/[id]/deliveries` | GET    | ለአንድ webhook የቅርብ ጊዜ የማድረስ ሙከራዎች |
| `/api/webhooks/validate-url`    | POST   | ቅድመ-በረራ URL ማረጋገጫ (የSSRF መከላከያ)  |

`GET /api/webhooks` በዝርዝር ገጾች ላይ ሚስጥሩ እንዳይጋለጥ ወደ `<የመጀመሪያዎቹ 10 ቁምፊዎች>...` ይሸፍነዋል።
ሚስጥሩን በእርግጥ ሲያስፈልግዎ የ`[id]` GETን ይጠቀሙ።

### webhook መፍጠር

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

`secret` ከተተወ፣ አገልጋዩ `whsec_<hex>` ሚስጥር ያመነጫል እና በምላሹ
ውስጥ ይመልሰዋል።

### webhookን መሞከር

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }`ን ይመልሳል። ምንም ድጋሚ ሙከራዎች አይደረጉም — ተቀባዩ payloadን እና ፊርማውን መቀበሉን
በፍጥነት ለማረጋገጥ ጠቃሚ ነው።

## ዳሽቦርድ

በ `/dashboard/webhooks` የሚገኘው የዳሽቦርድ ገጽ (`src/app/(dashboard)/dashboard/webhooks/page.tsx` ይመልከቱ) የሚከተሉትን ያቀርባል፦

- የክስተት መራጭ በመጠቀም webhooks መፍጠር/ማርትዕ
- በ `enabled`፣ `failure_count` እና `last_status` ላይ የተመሠረተ የሁኔታ አመልካች (ንቁ / ንቁ ያልሆነ / ስህተት ያጋጠመው)
- በአንድ ጠቅታ የሙከራ ማድረስ
- በእጅ የማንቃት/የማሰናከል መቀያየሪያ

## የPayload ምሳሌዎች

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

ከ `test.ping` ውጪ ላሉ ክስተቶች የመስኮች ቅርጽ እነሱን በሚልኩ የጥሪ ቦታዎች ይወሰናል፤ የ `data` ኦብጀክትን ከወደፊት ለሚመጡ ለውጦች ተኳሃኝ አድርገው ይያዙት (መስኮችን ይጨምሩ፣ በአለመኖራቸው ላይ ጥገኛ አይሁኑ)።

## ምርጥ ልምዶች

- **በእያንዳንዱ ማድረስ ላይ ፊርማውን ያረጋግጡ** ከጥሬው body ጋር በማነጻጸር — ይህ የwebhook URLዎን ከሚገምት ማንኛውም ሰው የሚላኩ የተጭበረበሩ POSTsን ይከላከላል።
- **በ~5 ሰከንዶች ውስጥ 2xx ምላሽ ይስጡ** — አሰራጩ በ10 s ጊዜው ያልቃል። ዘገምተኛ ተቀባዮች ድጋሚ ሙከራዎችን ይጨርሳሉ እና `failure_count`ን ያሳድጋሉ።
- **Handlersን idempotent ያድርጉ** — ድጋሚ ሙከራዎች እና ቢያንስ-አንድ-ጊዜ የማድረስ ባህሪ የተባዙ መልዕክቶች ሊኖሩ እንደሚችሉ ያመለክታሉ።
- **በትንሹ ይመዝገቡ** — በትክክል የሚጠቀሙባቸውን ክስተቶች ብቻ ይዘርዝሩ፤ `"*"` እርስዎ በማይቆጣጠሯቸው ተቀባዮች ላይ ወጪ ይጨምራል።
- **`failure_count`ን ይከታተሉ** — endpoints 10 ተከታታይ ውድቀቶች ሲያጋጥሙ በራስ-ሰር ይሰናከላሉ፤ ተቀባዩን ካስተካከሉ በኋላ `PUT /api/webhooks/[id]`ን ከ `enabled: true` ጋር በመጥራት ዳግም ያስጀምሩት።
- **ሚስጥሮችን በየጊዜው ይቀይሩ** — አዲስ `secret` በ `PUT` ይላኩ፣ አዲሱን እሴት ወደ ተቀባዩ ያሰማሩ እና በሙከራ endpoint በኩል ያረጋግጡ።

## በተጨማሪ ይመልከቱ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ሙሉ የአስተዳደር API ወሰን
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — በ `request.failed` በኩል ከሚታዩ የአቅራቢ ውድቀቶች ጀርባ ያሉ የcircuit breaker / cooldown ባህሪያት
- ምንጭ፦ `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
