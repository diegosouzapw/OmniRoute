# Webhooks (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Isi mmalite eziokwu:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Emelitere ikpeazụ:** 2026-06-28 — v3.8.40

OmniRoute nwere ike izipu HTTP webhooks mgbe ihe omume dị n'elu ikpo okwu mere. Jiri ha jikọta ya na
Slack, PagerDuty, Datadog, ọrụ ịdọ aka ná ntị dị n'ime, ma ọ bụ ihe nnata HTTP ọ bụla.

Dispatcher ahụ na-eji HMAC-SHA256 abịanye aka na nnyefe ọ bụla, na-anwale ọzọ mgbe
ọdịda nwa oge mere, na-enyocha ọnọdụ nnyefe nke webhook ọ bụla, ma na-agbanyụ endpoints
na-akụ afọ n'ala ugboro ugboro na-akpaghị aka.

## Ihe Omume A Na-akwado

Ụdị `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, nke `src/lib/webhookDispatcher.ts` na-eji) na-anọchi anya kpọmkwem ihe omume anọ ugbu a:

| Ihe omume           | Mgbe ọ na-eme                                                                 |
| ------------------- | ----------------------------------------------------------------------------- |
| `request.completed` | Mgbe arịrịọ e bufere site na proxy mezuru nke ọma                             |
| `request.failed`    | Mgbe arịrịọ e bufere site na proxy dara mgbe nnwale ọzọ/fallback niile gasịrị |
| `quota.exceeded`    | Mgbe API key gafere oke mmefu/quota                                           |
| `test.ping`         | Ihe omume arụrụ aka nke endpoint nnwale na-eji                                |

Ndebanye aha na-anabata literal `"*"` iji nata ihe omume niile. A na-eleghara aha
ihe omume ndị a na-amaghị dị na `events` anya n'oge dispatch.

> Rịba ama: ejikọtala API nke dispatcher ahụ, mana ebe ụfọdụ dị na production na-akpọ
> ihe omume ndị na-abụghị `test.ping` ka na-abata. Lelee `grep dispatchEvent` ka ị hụ
> paths ndị na-akpọ dispatcher ugbu a na release gị.

## Nhazi Sistemụ

```
Onye na-akpọ (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> yọchaa site na webhook.events
    -> maka nke ọ bụla dabara (n'otu oge):
       deliverWebhook(url, payload, secret)
         wuo payload { event, timestamp, data }
         jiri HMAC-SHA256 bịanye aka na body (ọ bụrụ na secret dị)
         POST nwere timeout nke 10s
         nwaa ọzọ ruo ugboro 3 mgbe njehie 5xx / netwọkụ mere
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispatch bụ fire-and-forget nye onye na-akpọ ya: `Promise.allSettled` na-amịkọrọ
njehie nke webhook ọ bụla ka otu receiver ọjọọ ghara igbochi ndị ọzọ.

## Ịbịanye Aka na HMAC

Mgbe webhook nwere `secret`, OmniRoute na-abịanye aka na JSON body ma zipụ:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Aha header na-eji prefix `X-Webhook-*` (ọ bụghị `X-OmniRoute-*`). Uru signature
> bụ `sha256=<hex>` — nyochaa prefix ahụ n'uju.

Ọ bụrụ na a kpọọ `createWebhook` na-enweghị secret, modul DB ahụ na-emepụta otu
(`whsec_<48 hex>`) ka e wee bịanye aka na webhooks niile na ndabara.

### Inyocha ya n'akụkụ receiver

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Na-enyocha mgbe niile site na iji **raw** request body, tupu parsing JSON ọ bụla.

## Iwu Mgbalị Ọzọ & Ọdịda

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Oge njedebe nke sekọnd 10 maka mgbalị ọ bụla (`AbortController`).
- HTTP 2xx ka a na-ewere dị ka ihe ịga nke ọma.
- HTTP 3xx/4xx ka a na-ewere dị ka ọnọdụ ikpeazụ a na-agaghị anwale ọzọ — a na-edekọ ya dị ka ezigara
  yana `success = res.ok`.
- A na-anwale HTTP 5xx na njehie netwọkụ ọzọ site na iji oge nchere na-abawanye okpukpu abụọ:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Mgbe `maxRetries` gasịrị, a na-edekọ nnyefe ahụ dị ka nke dara.
- Nnyefe ọ bụla na-emelite `last_triggered_at`, `last_status`, ma tọgharịa
  ma ọ bụ bawanye `failure_count`.
- Onye nkesa ahụ na-akpọ `disableWebhooksWithHighFailures(10)` mgbe nkesa ọ bụla gasịrị,
  ya mere a na-agbanyụ webhook ọ bụla nwere `failure_count >= 10` na-akpaghị aka.

## Ebe Nchekwa Data

Tebụl `webhooks` (mbugharị `011_webhooks.sql`):

| Kọlụm               | Ụdị     | Nkọwa                                                                   |
| ------------------- | ------- | ----------------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                                    |
| `url`               | TEXT    | URL ebe a na-eziga                                                      |
| `events`            | TEXT    | Ndepụta JSON; ndabara `["*"]`                                           |
| `secret`            | TEXT    | Ihe nzuzo HMAC (a na-emepụta ya na-akpaghị aka ma ọ bụrụ na enyeghị ya) |
| `enabled`           | INT     | 0/1; ndabara ya bụ 1                                                    |
| `description`       | TEXT    | Aha mmadụ nwere ike ịgbakwunye                                          |
| `created_at`        | TEXT    | `datetime('now')`                                                       |
| `last_triggered_at` | TEXT    | A na-emelite ya na mgbalị nnyefe ọ bụla                                 |
| `last_status`       | INT     | Ọnọdụ HTTP nke mgbalị ikpeazụ (0 = netwọkụ)                             |
| `failure_count`     | INT     | Na-alaghachi na 0 mgbe ihe gara nke ọma, +1 mgbe ọ dara                 |

A na-echekwa akụkọ nnyefe na tebụl `webhook_deliveries` e mere kpọmkwem maka ya
(mbugharị `069_webhook_deliveries.sql`, nke a na-ede site na
`src/lib/db/webhookDeliveries.ts::insertDelivery` na mgbalị ọ bụla), tinyere
ọnụọgụ nchịkọta ndị dị n'ahịrị `webhooks`. Mbugharị `070_webhooks_kind_metadata.sql`
gbakwunyere metadata ụdị (Slack / Discord / Telegram / ndị na-agbanwe payload omenala).

## REST API

Endpoint niile chọrọ nkwenye njikwa (`requireManagementAuth`).

| Endpoint                        | Usoro  | Nkọwa                                               |
| ------------------------------- | ------ | --------------------------------------------------- |
| `/api/webhooks`                 | GET    | Depụta webhook (ezoro ihe nzuzo)                    |
| `/api/webhooks`                 | POST   | Mepụta webhook                                      |
| `/api/webhooks/[id]`            | GET    | Nkọwa webhook (ihe nzuzo zuru ezu)                  |
| `/api/webhooks/[id]`            | PUT    | Melite oghere                                       |
| `/api/webhooks/[id]`            | DELETE | Wepụ                                                |
| `/api/webhooks/[id]/test`       | POST   | Zipu `test.ping` (enweghị mgbalị ọzọ)               |
| `/api/webhooks/[id]/deliveries` | GET    | Mgbalị nnyefe ndị na-adịbeghị anya maka otu webhook |
| `/api/webhooks/validate-url`    | POST   | Nkwado URL tupu izipu (ihe nche SSRF)               |

`GET /api/webhooks` na-ezo ihe nzuzo ahụ ka ọ bụrụ `<mkpụrụedemede 10 mbụ>...` iji gbochie
ikpughe ya na peeji ndepụta. Jiri `[id]` GET mgbe ịchọrọ ihe nzuzo ahụ n'ezie.

### Mepụta webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Ọkwa Slack"
  }'
```

Ọ bụrụ na ewepụ `secret`, sava ahụ na-emepụta ihe nzuzo `whsec_<hex>` ma weghachite
ya na nzaghachi ahụ.

### Nwalee webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Na-eweghachite `{ delivered, status, error }`. A naghị anwale ya ọzọ — nke a bara uru maka
ịchọpụta ngwa ngwa na onye nnata na-anabata payload na mbinye aka ahụ.

## Dashboard

Ihu dashboard dị na `/dashboard/webhooks` (lee
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) na-enye:

- Ịmepụta/idezi webhooks site na onye nhọpụta mmemme
- Ihe ngosi ọnọdụ (na-arụ ọrụ / anaghị arụ ọrụ / nwere njehie) dabere na `enabled`,
  `failure_count`, na `last_status`
- Nnyefe nnwale site n’otu ọpịpị
- Mgbanwe aka iji mee ka ọ rụọ ọrụ/kwụsị ịrụ ọrụ

## Ọmụmaatụ Payload

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

Ebe ndị na-akpọ ọrụ ma na-ezipụ mmemme ndị na-abụghị `test.ping` nọ ka a na-akọwa
ọdịdị mpaghara ha; were object `data` dịka nke dakọtara na mgbanwe n’ọdịnihu (tinye mpaghara, adaberekwala na
enweghị ha).

## Omume Kachasị Mma

- **Nyochaa mbinye aka na nnyefe ọ bụla** megide raw body — nke a na-egbochi
  POSTs adịgboroja sitere n’aka onye ọ bụla chọpụtara URL webhook gị.
- **Zaghachi 2xx n’ime ihe dịka sekọnd 5** — dispatcher na-akwụsị ichere mgbe 10 s gachara. Ndị nnata
  dị nwayọ ga-emefusị retries ma bulie `failure_count`.
- **Mee ka handlers bụrụ idempotent** — retries na usoro nnyefe at-least-once
  pụtara na duplicates nwere ike ịdị.
- **Debanye aha naanị n’ihe ndị dị mkpa** — depụta naanị mmemme ndị ị na-eji n’ezie; `"*"` ga-
  agbakwunye ụgwọ n’ebe ndị nnata ị na-adịghị achị nọ.
- **Lezie `failure_count` anya** — a na-akwụsị endpoints na-akpaghị aka mgbe ọdịda 10 mere n’usoro;
  tọgharịa ya site n’ịkpọ `PUT /api/webhooks/[id]` na `enabled: true`
  mgbe ị mezichara onye nnata.
- **Na-agbanwe secrets kwa oge** — jiri `PUT` tinye `secret` ọhụrụ, deploy uru ọhụrụ ahụ
  n’ebe onye nnata nọ, wee jiri test endpoint kwenye na ọ na-arụ ọrụ.

## Hụkwa

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — API njikwa zuru ezu
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — usoro circuit breaker / cooldown
  dị n’azụ ọdịda provider ndị a na-egosi site na `request.failed`
- Isi mmalite: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
