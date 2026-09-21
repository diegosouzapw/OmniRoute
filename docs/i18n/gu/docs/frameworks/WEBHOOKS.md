# Webhooks (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **સત્યનો સ્રોત:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **છેલ્લે અપડેટ કરેલું:** 2026-06-28 — v3.8.40

OmniRoute પ્લેટફોર્મ ઇવેન્ટ્સ પર HTTP વેબહૂક્સ ટ્રિગર કરી શકે છે. Slack, PagerDuty, Datadog, આંતરિક ચેતવણી સેવાઓ અથવા કોઈપણ HTTP રિસીવર સાથે એકીકરણ કરવા માટે તેમનો ઉપયોગ કરો.

ડિસ્પેચર દરેક ડિલિવરીને HMAC-SHA256 વડે સાઇન કરે છે, ક્ષણિક નિષ્ફળતાઓ પર ફરી પ્રયાસ કરે છે, દરેક વેબહૂકની ડિલિવરી સ્થિતિ ટ્રૅક કરે છે અને સતત નિષ્ફળ થતા એન્ડપોઇન્ટ્સને આપમેળે અક્ષમ કરે છે.

## સમર્થિત ઇવેન્ટ્સ

`WebhookEvent` પ્રકાર (`src/lib/webhooks/eventDescriptions.ts`, જેનો ઉપયોગ `src/lib/webhookDispatcher.ts` કરે છે) હાલમાં ચોક્કસ ચાર ઇવેન્ટ્સને મોડેલ કરે છે:

| ઇવેન્ટ              | ક્યારે ટ્રિગર થાય છે                                               |
| ------------------- | ------------------------------------------------------------------ |
| `request.completed` | પ્રૉક્સી કરેલી વિનંતી સફળતાપૂર્વક પૂર્ણ થાય ત્યારે                 |
| `request.failed`    | બધા પુનઃપ્રયાસો/ફૉલબૅક પછી પ્રૉક્સી કરેલી વિનંતી નિષ્ફળ થાય ત્યારે |
| `quota.exceeded`    | API કી બજેટ/ક્વોટાની મર્યાદા વટાવે ત્યારે                          |
| `test.ping`         | ટેસ્ટ એન્ડપોઇન્ટ દ્વારા ઉપયોગમાં લેવાતી કૃત્રિમ ઇવેન્ટ             |

દરેક ઇવેન્ટ મેળવવા માટે સબ્સ્ક્રિપ્શન્સ લિટરલ `"*"` સ્વીકારે છે. `events`માં અજ્ઞાત ઇવેન્ટ નામોને ડિસ્પેચ સમયે અવગણવામાં આવે છે.

> નોંધ: ડિસ્પેચર API જોડાયેલું છે, પરંતુ કેટલીક બિન-`test.ping` ઇવેન્ટ્સ માટેની
> પ્રોડક્શન કૉલ સાઇટ્સ હજી ઉમેરાઈ રહી છે. તમારી રિલીઝમાં કયા પાથ્સ હાલમાં
> ડિસ્પેચરને કૉલ કરે છે તે જોવા માટે `grep dispatchEvent` તપાસો.

## આર્કિટેક્ચર

```
કૉલર (હેન્ડલર, સેવા, મોનિટર)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events દ્વારા ફિલ્ટર કરો
    -> દરેક મેળ માટે (સમાંતરમાં):
       deliverWebhook(url, payload, secret)
         પેલોડ { event, timestamp, data } બનાવો
         HMAC-SHA256 વડે બૉડી સાઇન કરો (જો secret હાજર હોય)
         10s સમયસમાપ્તિ સાથે POST કરો
         5xx / નેટવર્ક ભૂલ પર વધુમાં વધુ 3 વખત ફરી પ્રયાસ કરો
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

કૉલર માટે ડિસ્પેચ ફાયર-એન્ડ-ફૉર્ગેટ છે: `Promise.allSettled` દરેક વેબહૂકની ભૂલોને સમાવી લે છે, જેથી એક ખામીયુક્ત રિસીવર અન્યને અવરોધી ન શકે.

## HMAC સાઇનિંગ

જ્યારે વેબહૂક પાસે `secret` હોય, ત્યારે OmniRoute JSON બૉડીને સાઇન કરે છે અને નીચેનું મોકલે છે:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> હેડર નામો `X-Webhook-*` પ્રીફિક્સનો ઉપયોગ કરે છે (`X-OmniRoute-*`નો નહીં). સિગ્નેચર
> મૂલ્ય `sha256=<hex>` છે — સંપૂર્ણ પ્રીફિક્સની ચકાસણી કરો.

જો `createWebhook`ને secret વિના કૉલ કરવામાં આવે, તો DB મોડ્યુલ એક secret જનરેટ કરે છે
(`whsec_<48 hex>`), જેથી ડિફૉલ્ટ રૂપે બધા વેબહૂક્સ સાઇન થયેલા હોય છે.

### રિસીવર પર ચકાસણી કરવી

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

કોઈપણ JSON પાર્સિંગ પહેલાં હંમેશાં **કાચી** રિક્વેસ્ટ બૉડી સામે ચકાસણી કરો.

## પુનઃપ્રયાસ અને નિષ્ફળતા નીતિ

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- દરેક પ્રયાસ માટે 10 સેકન્ડનો સમયસમાપ્તિ સમય (`AbortController`).
- HTTP 2xx ને સફળતા ગણવામાં આવે છે.
- HTTP 3xx/4xx ને પુનઃપ્રયાસ ન કરી શકાય તેવી અંતિમ સ્થિતિ ગણવામાં આવે છે — તેને ડિલિવર થયેલ તરીકે નોંધવામાં આવે છે, જેમાં `success = res.ok` હોય છે.
- HTTP 5xx અને નેટવર્ક ભૂલો માટે ઘાતાંકીય વિલંબ સાથે પુનઃપ્રયાસ કરવામાં આવે છે:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` પછી, ડિલિવરીને નિષ્ફળ તરીકે નોંધવામાં આવે છે.
- દરેક ડિલિવરી `last_triggered_at`, `last_status` ને અપડેટ કરે છે અને `failure_count` ને કાં તો રીસેટ કરે છે અથવા વધારે છે.
- ડિસ્પેચર દરેક ફેન-આઉટ પછી `disableWebhooksWithHighFailures(10)` ને કૉલ કરે છે, તેથી `failure_count >= 10` ધરાવતો કોઈપણ વેબહૂક આપમેળે અક્ષમ થઈ જાય છે.

## ડેટાબેઝ

કોષ્ટક `webhooks` (માઇગ્રેશન `011_webhooks.sql`):

| કૉલમ                | પ્રકાર  | નોંધો                                         |
| ------------------- | ------- | --------------------------------------------- |
| `id`                | TEXT PK | UUID                                          |
| `url`               | TEXT    | ગંતવ્ય URL                                    |
| `events`            | TEXT    | JSON એરે; ડિફૉલ્ટ `["*"]`                     |
| `secret`            | TEXT    | HMAC સિક્રેટ (આપેલ ન હોય તો આપમેળે જનરેટ થાય) |
| `enabled`           | INT     | 0/1; ડિફૉલ્ટ 1                                |
| `description`       | TEXT    | વૈકલ્પિક માનવ-વાંચનીય લેબલ                    |
| `created_at`        | TEXT    | `datetime('now')`                             |
| `last_triggered_at` | TEXT    | દરેક ડિલિવરી પ્રયાસ પર અપડેટ થાય છે           |
| `last_status`       | INT     | છેલ્લા પ્રયાસની HTTP સ્થિતિ (0 = નેટવર્ક)     |
| `failure_count`     | INT     | સફળતા પર 0 પર રીસેટ, નિષ્ફળતા પર +1           |

ડિલિવરી ઇતિહાસ સમર્પિત `webhook_deliveries` કોષ્ટકમાં સંગ્રહિત કરવામાં આવે છે
(માઇગ્રેશન `069_webhook_deliveries.sql`, દરેક પ્રયાસ પર
`src/lib/db/webhookDeliveries.ts::insertDelivery` દ્વારા લખાય છે), તેમજ
`webhooks` પંક્તિમાં એકંદર કાઉન્ટર્સ પણ જાળવવામાં આવે છે. પ્રકાર મેટાડેટા (Slack / Discord /
Telegram / કસ્ટમ પેલોડ ટ્રાન્સફોર્મર્સ) `070_webhooks_kind_metadata.sql` દ્વારા ઉમેરવામાં આવ્યું હતું.

## REST API

બધા એન્ડપોઇન્ટ્સ માટે મેનેજમેન્ટ પ્રમાણીકરણ (`requireManagementAuth`) જરૂરી છે.

| એન્ડપોઇન્ટ                      | પદ્ધતિ | વર્ણન                                     |
| ------------------------------- | ------ | ----------------------------------------- |
| `/api/webhooks`                 | GET    | વેબહૂક્સની યાદી (સિક્રેટ્સ માસ્ક કરેલા)   |
| `/api/webhooks`                 | POST   | વેબહૂક બનાવો                              |
| `/api/webhooks/[id]`            | GET    | વેબહૂકની વિગતો (સંપૂર્ણ સિક્રેટ)          |
| `/api/webhooks/[id]`            | PUT    | ફીલ્ડ્સ અપડેટ કરો                         |
| `/api/webhooks/[id]`            | DELETE | દૂર કરો                                   |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` ટ્રિગર કરો (પુનઃપ્રયાસ વિના)  |
| `/api/webhooks/[id]/deliveries` | GET    | એક વેબહૂક માટેના તાજેતરના ડિલિવરી પ્રયાસો |
| `/api/webhooks/validate-url`    | POST   | પૂર્વ-પ્રયાસ URL માન્યતા (SSRF સુરક્ષા)   |

`GET /api/webhooks` યાદી પૃષ્ઠો પર સિક્રેટ લીક થતું ટાળવા માટે તેને
`<first 10 chars>...` સ્વરૂપે માસ્ક કરે છે. જ્યારે તમને ખરેખર સિક્રેટની જરૂર હોય ત્યારે
`[id]` GET નો ઉપયોગ કરો.

### વેબહૂક બનાવો

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

જો `secret` છોડવામાં આવે, તો સર્વર `whsec_<hex>` સિક્રેટ જનરેટ કરે છે અને તેને
પ્રતિસાદમાં પરત કરે છે.

### વેબહૂકનું પરીક્ષણ કરો

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` પરત કરે છે. કોઈ પુનઃપ્રયાસ કરવામાં આવતો નથી — રિસીવર
પેલોડ અને હસ્તાક્ષર સ્વીકારે છે કે નહીં તે ઝડપથી ચકાસવા માટે આ ઉપયોગી છે.

## ડેશબોર્ડ

`/dashboard/webhooks` પરનું ડેશબોર્ડ પૃષ્ઠ (જુઓ
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) નીચેની સુવિધાઓ પ્રદાન કરે છે:

- ઇવેન્ટ પિકર સાથે વેબહૂક્સ બનાવો/સંપાદિત કરો
- `enabled`, `failure_count` અને `last_status` પર આધારિત સ્થિતિ સૂચક (સક્રિય / નિષ્ક્રિય / ભૂલગ્રસ્ત)
- એક ક્લિકમાં પરીક્ષણ ડિલિવરી
- મેન્યુઅલ સક્ષમ/અક્ષમ ટૉગલ

## પેલોડનાં ઉદાહરણો

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

`test.ping` સિવાયની ઇવેન્ટ્સ માટેનાં ફીલ્ડ માળખાં તેમને ઉત્સર્જિત કરતી કૉલ સાઇટ્સ દ્વારા નિર્ધારિત થાય છે; `data` ઑબ્જેક્ટને ફોરવર્ડ-કમ્પેટિબલ માનો (ફીલ્ડ્સ ઉમેરો, તેમની ગેરહાજરી પર આધાર રાખશો નહીં).

## શ્રેષ્ઠ પ્રથાઓ

- **દરેક ડિલિવરી પર રૉ બૉડી સામે સહી ચકાસો** — આ તમારા વેબહૂક URL નો અંદાજ લગાવનાર કોઈપણ વ્યક્તિ તરફથી આવતા નકલી POST ને અટકાવે છે.
- **લગભગ 5 સેકન્ડમાં 2xx પ્રતિસાદ આપો** — ડિસ્પેચર 10 s પછી ટાઇમ આઉટ થાય છે. ધીમા રિસીવર્સ પુનઃપ્રયાસો વાપરી નાખશે અને `failure_count` વધારશે.
- **હેન્ડલર્સને આઇડેમ્પોટન્ટ બનાવો** — પુનઃપ્રયાસો અને ઓછામાં ઓછું એક વખત ડિલિવરીના સિમેન્ટિક્સનો અર્થ એ છે કે ડુપ્લિકેટ્સ શક્ય છે.
- **ન્યૂનતમ સબ્સ્ક્રાઇબ કરો** — ફક્ત તમે ખરેખર વાપરો છો તેવી ઇવેન્ટ્સની જ યાદી બનાવો; `"*"` તમારા નિયંત્રણ હેઠળ ન હોય તેવા રિસીવર્સ પર ખર્ચ વધારશે.
- **`failure_count` પર નજર રાખો** — સતત 10 નિષ્ફળતાઓ પછી એન્ડપોઇન્ટ્સ આપમેળે અક્ષમ થાય છે; રિસીવરને ઠીક કર્યા પછી `enabled: true` સાથે `PUT /api/webhooks/[id]` કૉલ કરીને તેને રીસેટ કરો.
- **સમયાંતરે સિક્રેટ્સ રોટેટ કરો** — નવું `secret` `PUT` કરો, નવું મૂલ્ય રિસીવર પર ડિપ્લોય કરો અને ટેસ્ટ એન્ડપોઇન્ટ દ્વારા પુષ્ટિ કરો.

## આ પણ જુઓ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — સંપૂર્ણ મેનેજમેન્ટ API સરફેસ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` દ્વારા દર્શાવાતી પ્રોવાઇડર નિષ્ફળતાઓ પાછળના સર્કિટ બ્રેકર / કૂલડાઉન સિમેન્ટિક્સ
- સ્રોત: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
