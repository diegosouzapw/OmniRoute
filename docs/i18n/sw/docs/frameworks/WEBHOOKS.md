# Webhooks (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Chanzo rasmi:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Ilisasishwa mwisho:** 2026-06-28 — v3.8.40

OmniRoute inaweza kutuma webhooks za HTTP wakati matukio ya jukwaa yanapotokea. Zitumie kuunganisha na
Slack, PagerDuty, Datadog, huduma za ndani za arifa, au kipokeaji chochote cha HTTP.

Kisambazaji hutia saini kila uwasilishaji kwa HMAC-SHA256, hujaribu tena baada ya
hitilafu za muda, hufuatilia hali ya uwasilishaji kwa kila webhook, na huzima kiotomatiki
endpoints zinazoendelea kushindwa.

## Matukio Yanayotumika

Aina ya `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, inayotumiwa na `src/lib/webhookDispatcher.ts`) kwa sasa inawakilisha matukio manne pekee:

| Tukio               | Hutokea wakati                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------- |
| `request.completed` | Ombi lililopitishwa kupitia proksi linakamilika kwa mafanikio                            |
| `request.failed`    | Ombi lililopitishwa kupitia proksi linashindwa baada ya majaribio yote/utaratibu mbadala |
| `quota.exceeded`    | Ufunguo wa API unavuka kiwango cha bajeti/kikomo                                         |
| `test.ping`         | Tukio bandia linalotumiwa na endpoint ya majaribio                                       |

Usajili hukubali thamani halisi `"*"` ili kupokea kila tukio. Majina yasiyojulikana ya
matukio katika `events` hupuuzwa wakati wa usambazaji.

> Kumbuka: API ya kisambazaji imeunganishwa, lakini sehemu za kuitisha katika mazingira ya uzalishaji kwa baadhi ya
> matukio yasiyo ya `test.ping` bado zinaongezwa. Angalia `grep dispatchEvent` ili kuona
> ni njia zipi zinazoita kisambazaji kwa sasa katika toleo lako.

## Usanifu

```
Mwitaji (kishughulikiaji, huduma, kifuatiliaji)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> chuja kwa webhook.events
    -> kwa kila inayolingana (kwa sambamba):
       deliverWebhook(url, payload, secret)
         unda payload { event, timestamp, data }
         tia saini body kwa HMAC-SHA256 (ikiwa secret ipo)
         POST kwa muda wa juu wa sekunde 10
         jaribu tena hadi mara 3 kwa 5xx / hitilafu ya mtandao
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Usambazaji hufanyika bila mwitaji kusubiri matokeo: `Promise.allSettled` huficha
hitilafu za kila webhook ili kipokeaji kimoja kibaya kisiweze kuzuia vingine.

## Utiaji Saini wa HMAC

Webhook inapokuwa na `secret`, OmniRoute hutia saini body ya JSON na kutuma:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <tukio>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<HMAC-SHA256 ya heksadesimali(secret, body)>
```

> Majina ya headers hutumia kiambishi awali cha `X-Webhook-*` (si `X-OmniRoute-*`). Thamani ya saini
> ni `sha256=<hex>` — thibitisha kiambishi awali chote.

Ikiwa `createWebhook` itaitwa bila secret, moduli ya DB hutengeneza moja
(`whsec_<48 hex>`) ili webhooks zote zitiwe saini kwa chaguo-msingi.

### Kuthibitisha kwenye kipokeaji

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Daima thibitisha dhidi ya body **ghafi** ya ombi, kabla ya uchanganuzi wowote wa JSON.

## Sera ya Kujaribu Tena na Kushindwa

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Kikomo cha muda cha sekunde 10 kwa kila jaribio (`AbortController`).
- HTTP 2xx huhesabiwa kama mafanikio.
- HTTP 3xx/4xx huhesabiwa kama hali ya mwisho isiyoweza kujaribiwa tena — hurekodiwa kuwa imewasilishwa
  ikiwa na `success = res.ok`.
- HTTP 5xx na hitilafu za mtandao hujaribiwa tena kwa muda wa kusubiri unaoongezeka kwa kasi:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Baada ya `maxRetries`, uwasilishaji hurekodiwa kuwa umeshindwa.
- Kila uwasilishaji husasisha `last_triggered_at`, `last_status`, na ama huweka upya
  au huongeza `failure_count`.
- Kisambazaji huita `disableWebhooksWithHighFailures(10)` baada ya kila usambazaji,
  hivyo webhook yoyote yenye `failure_count >= 10` huzimwa kiotomatiki.

## Hifadhidata

Jedwali `webhooks` (uhamishaji `011_webhooks.sql`):

| Safu                | Aina    | Maelezo                                          |
| ------------------- | ------- | ------------------------------------------------ |
| `id`                | TEXT PK | UUID                                             |
| `url`               | TEXT    | URL lengwa                                       |
| `events`            | TEXT    | Safu ya JSON; chaguo-msingi `["*"]`              |
| `secret`            | TEXT    | Siri ya HMAC (huzalishwa kiotomatiki isipowekwa) |
| `enabled`           | INT     | 0/1; chaguo-msingi ni 1                          |
| `description`       | TEXT    | Lebo ya hiari inayosomeka na binadamu            |
| `created_at`        | TEXT    | `datetime('now')`                                |
| `last_triggered_at` | TEXT    | Husasishwa katika kila jaribio la uwasilishaji   |
| `last_status`       | INT     | Hali ya HTTP ya jaribio la mwisho (0 = mtandao)  |
| `failure_count`     | INT     | Huwekwa upya kuwa 0 ikifaulu, +1 ikishindwa      |

Historia ya uwasilishaji huhifadhiwa katika jedwali maalumu la `webhook_deliveries`
(uhamishaji `069_webhook_deliveries.sql`, ikiandikwa kupitia
`src/lib/db/webhookDeliveries.ts::insertDelivery` katika kila jaribio), pamoja
na vihesabu vya jumla kwenye safu ya `webhooks`. Metadata ya aina (Slack / Discord /
Telegram / vibadilishaji maalumu vya payload) iliongezwa na `070_webhooks_kind_metadata.sql`.

## API ya REST

Vituo vyote vinahitaji uthibitishaji wa usimamizi (`requireManagementAuth`).

| Kituo                           | Mbinu  | Maelezo                                                     |
| ------------------------------- | ------ | ----------------------------------------------------------- |
| `/api/webhooks`                 | GET    | Orodhesha webhook (siri zimefichwa)                         |
| `/api/webhooks`                 | POST   | Unda webhook                                                |
| `/api/webhooks/[id]`            | GET    | Maelezo ya webhook (siri kamili)                            |
| `/api/webhooks/[id]`            | PUT    | Sasisha sehemu                                              |
| `/api/webhooks/[id]`            | DELETE | Ondoa                                                       |
| `/api/webhooks/[id]/test`       | POST   | Tuma `test.ping` (hakuna majaribio ya kurudia)              |
| `/api/webhooks/[id]/deliveries` | GET    | Majaribio ya hivi karibuni ya uwasilishaji kwa webhook moja |
| `/api/webhooks/validate-url`    | POST   | Uthibitishaji wa awali wa URL (ulinzi wa SSRF)              |

`GET /api/webhooks` huficha siri kuwa `<first 10 chars>...` ili kuepuka kuivujisha
kwenye kurasa za orodha. Tumia GET ya `[id]` unapohitaji siri hiyo kwa hakika.

### Unda webhook

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

Ikiwa `secret` imeachwa, seva huzalisha siri ya `whsec_<hex>` na kuirejesha
katika jibu.

### Jaribu webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Hurejesha `{ delivered, status, error }`. Hakuna majaribio ya kurudia yanayofanywa — ni muhimu kwa
kuthibitisha kwa haraka kwamba kipokezi kinakubali payload na sahihi.

## Dashibodi

Ukurasa wa dashibodi katika `/dashboard/webhooks` (angalia
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) hutoa:

- Kuunda/kuhariri webhooks kwa kutumia kiteua tukio
- Kiashiria cha hali (inatumika / haitumiki / ina hitilafu) kulingana na `enabled`,
  `failure_count`, na `last_status`
- Uwasilishaji wa majaribio kwa mbofyo mmoja
- Kitufe cha kuwezesha/kuzima kwa mikono

## Mifano ya Payload

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

Miundo ya sehemu za matukio yasiyo ya `test.ping` hufafanuliwa na sehemu za msimbo zinazoyatoa;
chukulia kipengee cha `data` kuwa kinachooana na matoleo yajayo (ongeza sehemu, usitegemee
kutokuwepo kwake).

## Mbinu Bora

- **Thibitisha sahihi katika kila uwasilishaji** dhidi ya mwili ghafi — hii huzuia
  maombi bandia ya POST kutoka kwa yeyote anayekisia URL ya webhook yako.
- **Jibu kwa 2xx ndani ya takriban sekunde 5** — kisambazaji hukatiza baada ya sekunde 10. Vipokezi
  vya polepole vitatumia majaribio ya kurudia na kuongeza `failure_count`.
- **Fanya vishughulikiaji viwe idempotent** — majaribio ya kurudia na semantiki za uwasilishaji
  wa angalau mara moja humaanisha kuwa nakala rudufu zinaweza kutokea.
- **Jisajili kwa kiwango cha chini** — orodhesha tu matukio unayotumia; `"*"` itaongeza
  gharama kwa vipokezi usivyovidhibiti.
- **Fuatilia `failure_count`** — endpoints huzimwa kiotomatiki baada ya hitilafu 10
  mfululizo; iweke upya kwa kuita `PUT /api/webhooks/[id]` ukiwa na `enabled: true`
  baada ya kurekebisha kipokezi.
- **Badilisha siri mara kwa mara** — tumia `PUT` kuweka `secret` mpya, peleka thamani mpya
  kwa kipokezi, na uthibitishe kupitia endpoint ya majaribio.

## Angalia Pia

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — kiolesura kamili cha API ya usimamizi
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantiki za circuit breaker / cooldown
  zinazosababisha hitilafu za watoa huduma kuonyeshwa kupitia `request.failed`
- Chanzo: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
