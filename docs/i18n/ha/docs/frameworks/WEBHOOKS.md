# Webhooks (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Tushen gaskiya:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Sabuntawa ta ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute na iya aika HTTP webhooks lokacin da abubuwan da suka faru a dandali suka auku. Yi amfani da su don haɗawa da
Slack, PagerDuty, Datadog, sabis na faɗakarwa na cikin gida, ko duk wani mai karɓar HTTP.

Mai rarrabawa yana sanya wa kowace isarwa sa hannun HMAC-SHA256, yana sake gwadawa idan an sami
gazawa ta wucin gadi, yana bibiyar lafiyar isarwa ga kowane webhook, sannan yana kashe endpoints da
suka ci gaba da gazawa ta atomatik.

## Abubuwan da Ake Tallafawa

Nau'in `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, wanda `src/lib/webhookDispatcher.ts` ke amfani da shi) a halin yanzu yana wakiltar abubuwa huɗu kacal:

| Abu                 | Lokacin da yake faruwa                                               |
| ------------------- | -------------------------------------------------------------------- |
| `request.completed` | Buƙatar da aka tura ta wakili ta kammala cikin nasara                |
| `request.failed`    | Buƙatar da aka tura ta wakili ta gaza bayan duk sake-gwadawa/madadin |
| `quota.exceeded`    | Maɓallin API ya ƙetare iyakar kasafi/quota                           |
| `test.ping`         | Abu na kwaikwayo da endpoint na gwaji ke amfani da shi               |

Rajista suna karɓar ainihin `"*"` don karɓar kowane abu. Ana watsi da sunayen abubuwan da ba a sani ba
a cikin `events` a lokacin rarrabawa.

> Lura: an haɗa API na mai rarrabawa, amma wuraren kiran production na wasu daga cikin
> abubuwan da ba `test.ping` ba har yanzu suna kan shigowa. Duba `grep dispatchEvent` don ganin
> waɗanne hanyoyi ne suke kiran mai rarrabawa a halin yanzu a cikin fitowarku.

## Tsarin Gine-gine

```
Mai kira (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> tace bisa webhook.events
    -> ga kowane wanda ya dace (a layi ɗaya):
       deliverWebhook(url, payload, secret)
         gina payload { event, timestamp, data }
         sanya wa body hannu da HMAC-SHA256 (idan secret yana nan)
         POST tare da iyakar lokaci na 10s
         sake gwadawa har sau 3 kan 5xx / kuskuren network
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Rarrabawa na tafiya ne ba tare da mai kira ya jira ba: `Promise.allSettled` yana danne
kurakuran kowane webhook domin kada mai karɓa mara kyau guda ɗaya ya toshe sauran.

## Sa Hannun HMAC

Lokacin da webhook yake da `secret`, OmniRoute yana sanya wa JSON body hannu sannan ya aika:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Sunayen headers suna amfani da prefix na `X-Webhook-*` (ba `X-OmniRoute-*` ba). Ƙimar sa hannun
> ita ce `sha256=<hex>` — tabbatar da cikakken prefix.

Idan an kira `createWebhook` ba tare da secret ba, module na DB yana ƙirƙirar ɗaya
(`whsec_<48 hex>`) domin haka duk webhooks suna da sa hannu ta tsohuwa.

### Tabbatarwa a kan mai karɓa

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Koyaushe tabbatar ta amfani da **raw** request body, kafin duk wani JSON parsing.

## Manufofin Sake Gwaji & Gazawa

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Lokacin jira na daƙiƙa 10 ga kowane yunƙuri (`AbortController`).
- HTTP 2xx ana ɗaukarsa a matsayin nasara.
- HTTP 3xx/4xx ana ɗaukarsa a matsayin matsayi na ƙarshe wanda ba za a sake gwadawa ba — ana rubuta shi a matsayin an isar
  tare da `success = res.ok`.
- HTTP 5xx da kurakuran hanyar sadarwa ana sake gwada su tare da ƙarin jinkiri mai ninkuwa:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Bayan `maxRetries`, ana rubuta isarwar a matsayin ta gaza.
- Kowace isarwa tana sabunta `last_triggered_at`, `last_status`, sannan ko dai ta sake saita
  ko ta ƙara `failure_count`.
- Mai rarrabawa yana kiran `disableWebhooksWithHighFailures(10)` bayan kowace rarrabawa,
  don haka duk wani webhook mai `failure_count >= 10` za a kashe shi ta atomatik.

## Ma'ajiyar Bayanai

Teburin `webhooks` (ƙaura `011_webhooks.sql`):

| Ginshiƙi            | Nau'i   | Bayanan kula                                             |
| ------------------- | ------- | -------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                     |
| `url`               | TEXT    | URL na inda za a aika                                    |
| `events`            | TEXT    | Jerin JSON; tsoho `["*"]`                                |
| `secret`            | TEXT    | Sirrin HMAC (ana ƙirƙira ta atomatik idan ba a bayar ba) |
| `enabled`           | INT     | 0/1; tsohonsa 1                                          |
| `description`       | TEXT    | Alamar bayanin ɗan adam ta zaɓi                          |
| `created_at`        | TEXT    | `datetime('now')`                                        |
| `last_triggered_at` | TEXT    | Ana sabunta shi a kowane yunƙurin isarwa                 |
| `last_status`       | INT     | Matsayin HTTP na yunƙuri na ƙarshe (0 = hanyar sadarwa)  |
| `failure_count`     | INT     | Yana komawa 0 idan an yi nasara, +1 idan an gaza         |

Ana adana tarihin isarwa a cikin keɓantaccen teburin `webhook_deliveries`
(ƙaura `069_webhook_deliveries.sql`, ana rubuta shi ta hanyar
`src/lib/db/webhookDeliveries.ts::insertDelivery` a kowane yunƙuri), ban da
jimillar ƙididdiga a layin `webhooks`. An ƙara metadata na nau'i (Slack / Discord /
Telegram / masu sauya payload na musamman) ta hanyar `070_webhooks_kind_metadata.sql`.

## REST API

Duk endpoints suna buƙatar tabbatarwar gudanarwa (`requireManagementAuth`).

| Endpoint                        | Hanya  | Bayani                                            |
| ------------------------------- | ------ | ------------------------------------------------- |
| `/api/webhooks`                 | GET    | Jera webhooks (an ɓoye sirrika)                   |
| `/api/webhooks`                 | POST   | Ƙirƙiri webhook                                   |
| `/api/webhooks/[id]`            | GET    | Cikakken bayani na webhook (cikakken sirri)       |
| `/api/webhooks/[id]`            | PUT    | Sabunta filaye                                    |
| `/api/webhooks/[id]`            | DELETE | Cire                                              |
| `/api/webhooks/[id]/test`       | POST   | Aika `test.ping` (ba tare da sake gwadawa ba)     |
| `/api/webhooks/[id]/deliveries` | GET    | Yunƙuran isarwa na baya-bayan nan na webhook ɗaya |
| `/api/webhooks/validate-url`    | POST   | Tabbatar da URL kafin aikawa (kariyar SSRF)       |

`GET /api/webhooks` yana ɓoye sirrin zuwa `<first 10 chars>...` domin hana fallasa shi
a shafukan jeri. Yi amfani da GET na `[id]` lokacin da kake buƙatar sirrin a zahiri.

### Ƙirƙiri webhook

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

Idan ba a saka `secret` ba, sabar tana ƙirƙirar sirrin `whsec_<hex>` sannan ta mayar
da shi a cikin amsar.

### Gwada webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Yana mayar da `{ delivered, status, error }`. Ba a yin sake gwadawa — wannan yana da amfani wajen
tabbatarwa cikin sauri cewa mai karɓa yana amincewa da payload da sa hannun.

## Dashboard

Shafin dashboard da ke `/dashboard/webhooks` (duba
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) yana samar da:

- Ƙirƙira/gyara webhooks tare da mai zaɓen event
- Alamar matsayi (mai aiki / mara aiki / mai kuskure) bisa `enabled`,
  `failure_count`, da `last_status`
- Isarwar gwaji da dannawa sau ɗaya
- Sauya kunna/kashewa da hannu

## Misalan Payload

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
    "message": "Isarwar webhook ta gwaji daga OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Tsarin filaye na events waɗanda ba `test.ping` ba ana bayyana su ne ta wuraren kiran da ke fitar
da su; ɗauki abin `data` a matsayin mai dacewa da nau'ikan gaba (ƙara filaye, kada a dogara da
rashinsu).

## Ingantattun Hanyoyin Aiki

- **Tabbatar da signature a kowace isarwa** ta hanyar kwatanta shi da ainihin body — wannan yana hana
  POSTs na bogi daga duk wanda ya iya hasashen URL na webhook ɗinka.
- **Amsa da 2xx cikin ~daƙiƙa 5** — dispatcher yana dakatar da jira bayan 10 s. Masu karɓa
  masu jinkiri za su cinye retries kuma su ƙara `failure_count`.
- **Sanya handlers su zama idempotent** — retries da tsarin isarwa na aƙalla sau ɗaya
  suna nufin yiwuwar samun kwafi.
- **Yi subscribe kaɗan kawai** — lissafa events da kake amfani da su kawai; `"*"` zai
  ƙara wa masu karɓar da ba ka sarrafa su kuɗin aiki.
- **Sa ido kan `failure_count`** — ana kashe endpoints ta atomatik bayan gazawa 10 a jere;
  sake saita shi ta hanyar kiran `PUT /api/webhooks/[id]` tare da `enabled: true`
  bayan gyara mai karɓar.
- **Sauya secrets lokaci-lokaci** — yi `PUT` na sabon `secret`, tura sabuwar ƙimar
  zuwa mai karɓar, sannan ka tabbatar ta hanyar endpoint na gwaji.

## Duba Kuma

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — cikakken tsarin API na gudanarwa
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ma'anonin circuit breaker / cooldown
  da ke bayan gazawar provider da ake nunawa ta `request.failed`
- Tushe: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
