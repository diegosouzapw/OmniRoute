# Webhooks (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **ആധികാരിക ഉറവിടം:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **അവസാനം അപ്ഡേറ്റ് ചെയ്തത്:** 2026-06-28 — v3.8.40

പ്ലാറ്റ്ഫോം ഇവന്റുകളിൽ OmniRoute-ന് HTTP വെബ്ഹുക്കുകൾ പ്രവർത്തിപ്പിക്കാൻ കഴിയും. Slack, PagerDuty, Datadog, ആഭ്യന്തര അലേർട്ടിംഗ് സേവനങ്ങൾ, അല്ലെങ്കിൽ ഏതെങ്കിലും HTTP റിസീവർ എന്നിവയുമായി സംയോജിപ്പിക്കാൻ അവ ഉപയോഗിക്കുക.

ഡിസ്പാച്ചർ ഓരോ ഡെലിവറിയും HMAC-SHA256 ഉപയോഗിച്ച് സൈൻ ചെയ്യുന്നു, താൽക്കാലിക പരാജയങ്ങളിൽ വീണ്ടും ശ്രമിക്കുന്നു, ഓരോ വെബ്ഹുക്കിന്റെയും ഡെലിവറി നില നിരീക്ഷിക്കുന്നു, തുടർച്ചയായി പരാജയപ്പെടുന്ന എൻഡ്പോയിന്റുകൾ സ്വയമേവ പ്രവർത്തനരഹിതമാക്കുന്നു.

## പിന്തുണയ്ക്കുന്ന ഇവന്റുകൾ

`WebhookEvent` ടൈപ്പ് (`src/lib/webhooks/eventDescriptions.ts`, ഇത് `src/lib/webhookDispatcher.ts` ഉപയോഗിക്കുന്നു) നിലവിൽ കൃത്യമായി നാല് ഇവന്റുകൾ മോഡൽ ചെയ്യുന്നു:

| ഇവന്റ്              | പ്രവർത്തിക്കുന്നത്                                                                      |
| ------------------- | --------------------------------------------------------------------------------------- |
| `request.completed` | പ്രോക്സി ചെയ്ത ഒരു അഭ്യർത്ഥന വിജയകരമായി പൂർത്തിയാകുമ്പോൾ                                |
| `request.failed`    | എല്ലാ പുനഃശ്രമങ്ങൾക്കും/ഫാൾബാക്കിനും ശേഷം പ്രോക്സി ചെയ്ത ഒരു അഭ്യർത്ഥന പരാജയപ്പെടുമ്പോൾ |
| `quota.exceeded`    | ഒരു API കീ ബജറ്റ്/ക്വോട്ട പരിധി കടക്കുമ്പോൾ                                             |
| `test.ping`         | ടെസ്റ്റ് എൻഡ്പോയിന്റ് ഉപയോഗിക്കുന്ന സിന്തറ്റിക് ഇവന്റ്                                  |

എല്ലാ ഇവന്റുകളും സ്വീകരിക്കാൻ സബ്സ്ക്രിപ്ഷനുകൾ ലിറ്ററൽ `"*"` സ്വീകരിക്കുന്നു. `events`-ലെ അജ്ഞാത ഇവന്റ് നാമങ്ങൾ ഡിസ്പാച്ച് സമയത്ത് അവഗണിക്കപ്പെടുന്നു.

> ശ്രദ്ധിക്കുക: ഡിസ്പാച്ചർ API വയർ ചെയ്തിട്ടുണ്ട്, എന്നാൽ ചില
> `test.ping` ഇതര ഇവന്റുകൾക്കായുള്ള പ്രൊഡക്ഷൻ കോൾ സൈറ്റുകൾ ഇപ്പോഴും ചേർത്തുകൊണ്ടിരിക്കുകയാണ്. നിങ്ങളുടെ റിലീസിൽ
> നിലവിൽ ഏതൊക്കെ പാതകളാണ് ഡിസ്പാച്ചറെ വിളിക്കുന്നതെന്ന് കാണാൻ `grep dispatchEvent` പരിശോധിക്കുക.

## ആർക്കിടെക്ചർ

```
കോളർ (ഹാൻഡ്ലർ, സേവനം, മോണിറ്റർ)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക
    -> പൊരുത്തപ്പെടുന്ന ഓരോന്നിനും (സമാന്തരമായി):
       deliverWebhook(url, payload, secret)
         പേലോഡ് നിർമ്മിക്കുക { event, timestamp, data }
         HMAC-SHA256 ഉപയോഗിച്ച് ബോഡി സൈൻ ചെയ്യുക (രഹസ്യം ഉണ്ടെങ്കിൽ)
         10s ടൈംഔട്ടോടെ POST ചെയ്യുക
         5xx / നെറ്റ്വർക്ക് പിശകുകളിൽ പരമാവധി 3 തവണ വീണ്ടും ശ്രമിക്കുക
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

കോളറെ സംബന്ധിച്ച് ഡിസ്പാച്ച് ഫയർ-ആൻഡ്-ഫോർഗെറ്റ് രീതിയിലാണ്: ഒരു തകരാറുള്ള റിസീവർ മറ്റുള്ളവയെ തടയാതിരിക്കാൻ `Promise.allSettled` ഓരോ വെബ്ഹുക്കിലെയും പിശകുകൾ ഉൾക്കൊള്ളുന്നു.

## HMAC സൈനിംഗ്

ഒരു വെബ്ഹുക്കിന് `secret` ഉണ്ടായിരിക്കുമ്പോൾ, OmniRoute JSON ബോഡി സൈൻ ചെയ്ത് ഇനിപ്പറയുന്നവ അയയ്ക്കുന്നു:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <ഇവന്റ്>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<ഹെക്സ് HMAC-SHA256(രഹസ്യം, ബോഡി)>
```

> ഹെഡർ നാമങ്ങൾ `X-Webhook-*` പ്രിഫിക്സ് ഉപയോഗിക്കുന്നു (`X-OmniRoute-*` അല്ല). സിഗ്നേച്ചർ
> മൂല്യം `sha256=<hex>` ആണ് — പൂർണ്ണമായ പ്രിഫിക്സ് പരിശോധിച്ചുറപ്പിക്കുക.

ഒരു രഹസ്യം ഇല്ലാതെ `createWebhook` വിളിക്കുകയാണെങ്കിൽ, DB മൊഡ്യൂൾ ഒരെണ്ണം സൃഷ്ടിക്കുന്നു
(`whsec_<48 hex>`), അതിനാൽ എല്ലാ വെബ്ഹുക്കുകളും ഡിഫോൾട്ടായി സൈൻ ചെയ്യപ്പെടുന്നു.

### റിസീവറിൽ പരിശോധിക്കൽ

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ഏതെങ്കിലും JSON പാഴ്സിങ്ങിന് മുമ്പ്, എല്ലായ്പ്പോഴും **റോ** റിക്വസ്റ്റ് ബോഡിയുമായി ഒത്തുനോക്കി പരിശോധിക്കുക.

## പുനഃശ്രമ, പരാജയ നയം

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- ഓരോ ശ്രമത്തിനും 10 സെക്കൻഡ് സമയപരിധി (`AbortController`).
- HTTP 2xx വിജയമായി കണക്കാക്കുന്നു.
- HTTP 3xx/4xx പുനഃശ്രമിക്കാനാകാത്ത അന്തിമ സ്റ്റാറ്റസായി കണക്കാക്കുന്നു — ഡെലിവർ ചെയ്തതായി രേഖപ്പെടുത്തുകയും
  `success = res.ok` ആയി സജ്ജീകരിക്കുകയും ചെയ്യുന്നു.
- HTTP 5xx-നും നെറ്റ്വർക്ക് പിശകുകൾക്കും എക്സ്പോണൻഷ്യൽ ബാക്ക്ഓഫോടെ പുനഃശ്രമിക്കുന്നു:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries`-ന് ശേഷം, ഡെലിവറി പരാജയപ്പെട്ടതായി രേഖപ്പെടുത്തുന്നു.
- ഓരോ ഡെലിവറിയും `last_triggered_at`, `last_status` എന്നിവ അപ്ഡേറ്റ് ചെയ്യുകയും
  `failure_count` പുനഃസജ്ജീകരിക്കുകയോ വർദ്ധിപ്പിക്കുകയോ ചെയ്യുന്നു.
- ഓരോ ഫാൻ-ഔട്ടിനും ശേഷം ഡിസ്പാച്ചർ `disableWebhooksWithHighFailures(10)` വിളിക്കുന്നു,
  അതിനാൽ `failure_count >= 10` ഉള്ള ഏതൊരു വെബ്ഹുക്കും സ്വയമേവ പ്രവർത്തനരഹിതമാക്കപ്പെടുന്നു.

## ഡാറ്റാബേസ്

`webhooks` പട്ടിക (മൈഗ്രേഷൻ `011_webhooks.sql`):

| കോളം                | തരം     | കുറിപ്പുകൾ                                             |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | ലക്ഷ്യസ്ഥാന URL                                        |
| `events`            | TEXT    | JSON അറേ; ഡിഫോൾട്ട് `["*"]`                            |
| `secret`            | TEXT    | HMAC രഹസ്യം (നൽകിയില്ലെങ്കിൽ സ്വയം സൃഷ്ടിക്കും)        |
| `enabled`           | INT     | 0/1; ഡിഫോൾട്ട് 1                                       |
| `description`       | TEXT    | ഐച്ഛികമായ, മനുഷ്യർക്ക് വായിക്കാവുന്ന ലേബൽ              |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | ഓരോ ഡെലിവറി ശ്രമത്തിലും അപ്ഡേറ്റ് ചെയ്യുന്നു           |
| `last_status`       | INT     | അവസാന ശ്രമത്തിന്റെ HTTP സ്റ്റാറ്റസ് (0 = നെറ്റ്വർക്ക്) |
| `failure_count`     | INT     | വിജയിക്കുമ്പോൾ 0 ആക്കുന്നു, പരാജയപ്പെടുമ്പോൾ +1        |

`webhooks` വരിയിലെ സമാഹൃത കൗണ്ടറുകൾക്ക് പുറമെ, ഡെലിവറി ചരിത്രം സമർപ്പിത
`webhook_deliveries` പട്ടികയിൽ സ്ഥിരമായി സൂക്ഷിക്കുന്നു
(മൈഗ്രേഷൻ `069_webhook_deliveries.sql`, ഓരോ ശ്രമത്തിലും
`src/lib/db/webhookDeliveries.ts::insertDelivery` വഴി എഴുതുന്നു). തരം സംബന്ധിച്ച മെറ്റാഡാറ്റ
(Slack / Discord / Telegram / ഇഷ്ടാനുസൃത പേലോഡ് ട്രാൻസ്ഫോർമറുകൾ)
`070_webhooks_kind_metadata.sql` വഴി ചേർത്തു.

## REST API

എല്ലാ എൻഡ്പോയിന്റുകൾക്കും മാനേജ്മെന്റ് ഓതന്റിക്കേഷൻ (`requireManagementAuth`) ആവശ്യമാണ്.

| എൻഡ്പോയിന്റ്                    | മെത്തഡ് | വിവരണം                                            |
| ------------------------------- | ------- | ------------------------------------------------- |
| `/api/webhooks`                 | GET     | വെബ്ഹുക്കുകൾ ലിസ്റ്റ് ചെയ്യുക (രഹസ്യങ്ങൾ മറച്ചത്) |
| `/api/webhooks`                 | POST    | വെബ്ഹുക്ക് സൃഷ്ടിക്കുക                            |
| `/api/webhooks/[id]`            | GET     | വെബ്ഹുക്ക് വിശദാംശങ്ങൾ (പൂർണ്ണ രഹസ്യം)            |
| `/api/webhooks/[id]`            | PUT     | ഫീൽഡുകൾ അപ്ഡേറ്റ് ചെയ്യുക                         |
| `/api/webhooks/[id]`            | DELETE  | നീക്കം ചെയ്യുക                                    |
| `/api/webhooks/[id]/test`       | POST    | ഒരു `test.ping` അയയ്ക്കുക (പുനഃശ്രമങ്ങളില്ല)      |
| `/api/webhooks/[id]/deliveries` | GET     | ഒരു വെബ്ഹുക്കിന്റെ സമീപകാല ഡെലിവറി ശ്രമങ്ങൾ       |
| `/api/webhooks/validate-url`    | POST    | മുൻകൂർ URL സാധൂകരണം (SSRF സംരക്ഷണം)               |

ലിസ്റ്റിംഗ് പേജുകളിൽ രഹസ്യം ചോരുന്നത് ഒഴിവാക്കാൻ `GET /api/webhooks`, രഹസ്യം
`<first 10 chars>...` എന്ന രീതിയിൽ മറയ്ക്കുന്നു. രഹസ്യം യഥാർത്ഥത്തിൽ ആവശ്യമുള്ളപ്പോൾ
`[id]` GET ഉപയോഗിക്കുക.

### വെബ്ഹുക്ക് സൃഷ്ടിക്കുക

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

`secret` ഒഴിവാക്കിയാൽ, സെർവർ ഒരു `whsec_<hex>` രഹസ്യം സൃഷ്ടിച്ച്
പ്രതികരണത്തിൽ തിരികെ നൽകുന്നു.

### വെബ്ഹുക്ക് പരിശോധിക്കുക

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` തിരികെ നൽകുന്നു. പുനഃശ്രമങ്ങളൊന്നും നടത്തില്ല — റിസീവർ
പേലോഡും സിഗ്നേച്ചറും സ്വീകരിക്കുന്നുണ്ടെന്ന് വേഗത്തിൽ സാധൂകരിക്കാൻ ഇത് ഉപകാരപ്രദമാണ്.

## ഡാഷ്ബോർഡ്

`/dashboard/webhooks` എന്നതിലെ ഡാഷ്ബോർഡ് പേജ് (`src/app/(dashboard)/dashboard/webhooks/page.tsx` കാണുക) ഇനിപ്പറയുന്നവ നൽകുന്നു:

- ഇവന്റ് പിക്കർ ഉപയോഗിച്ച് വെബ്ഹുക്കുകൾ സൃഷ്ടിക്കുക/തിരുത്തുക
- `enabled`, `failure_count`, `last_status` എന്നിവയെ അടിസ്ഥാനമാക്കിയുള്ള സ്റ്റാറ്റസ് സൂചകം (സജീവം / നിഷ്ക്രിയം / പിശക് സംഭവിച്ചത്)
- ഒറ്റ ക്ലിക്കിലൂടെയുള്ള ടെസ്റ്റ് ഡെലിവറി
- മാനുവൽ പ്രവർത്തനക്ഷമമാക്കൽ/പ്രവർത്തനരഹിതമാക്കൽ ടോഗിൾ

## പേലോഡ് ഉദാഹരണങ്ങൾ

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
    "message": "OmniRoute-ൽ നിന്നുള്ള ടെസ്റ്റ് വെബ്ഹുക്ക് ഡെലിവറി",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` അല്ലാത്ത ഇവന്റുകളുടെ ഫീൽഡ് ഘടനകൾ അവ പുറപ്പെടുവിക്കുന്ന കോൾ സൈറ്റുകളാണ് നിർവചിക്കുന്നത്; `data` ഒബ്ജക്റ്റിനെ ഫോർവേഡ്-കംപാറ്റിബിൾ ആയി പരിഗണിക്കുക (ഫീൽഡുകൾ ചേർക്കാം, അവയുടെ അഭാവത്തെ ആശ്രയിക്കരുത്).

## മികച്ച രീതികൾ

- **ഓരോ ഡെലിവറിയിലും റോ ബോഡിയുമായി സിഗ്നേച്ചർ പരിശോധിക്കുക** — നിങ്ങളുടെ വെബ്ഹുക്ക് URL ഊഹിച്ചറിയുന്ന ആരെങ്കിലും വ്യാജ POST-കൾ അയയ്ക്കുന്നത് ഇത് തടയുന്നു.
- **ഏകദേശം 5 സെക്കൻഡിനുള്ളിൽ 2xx ഉപയോഗിച്ച് പ്രതികരിക്കുക** — ഡിസ്പാച്ചർ 10 s-ൽ ടൈംഔട്ട് ചെയ്യും. മന്ദഗതിയിലുള്ള റിസീവറുകൾ റീട്രൈകൾ ഉപയോഗിച്ചുതീർക്കുകയും `failure_count` വർധിപ്പിക്കുകയും ചെയ്യും.
- **ഹാൻഡ്ലറുകൾ ഐഡംപൊട്ടന്റ് ആക്കുക** — റീട്രൈകളും കുറഞ്ഞത് ഒരിക്കലെങ്കിലും ഡെലിവർ ചെയ്യുമെന്ന സെമാന്റിക്സും കാരണം ഡ്യൂപ്ലിക്കേറ്റുകൾ ഉണ്ടാകാം.
- **ആവശ്യമായവയ്ക്ക് മാത്രം സബ്സ്ക്രൈബ് ചെയ്യുക** — നിങ്ങൾ യഥാർത്ഥത്തിൽ ഉപയോഗിക്കുന്ന ഇവന്റുകൾ മാത്രം പട്ടികപ്പെടുത്തുക; `"*"` നിങ്ങൾ നിയന്ത്രിക്കാത്ത റിസീവറുകളിൽ ചെലവ് കൂട്ടും.
- **`failure_count` നിരീക്ഷിക്കുക** — തുടർച്ചയായ 10 പരാജയങ്ങളിൽ എൻഡ്പോയിന്റുകൾ സ്വയമേവ പ്രവർത്തനരഹിതമാക്കപ്പെടും; റിസീവർ പരിഹരിച്ചശേഷം `enabled: true` സഹിതം `PUT /api/webhooks/[id]` വിളിച്ച് ഇത് പുനഃസജ്ജമാക്കുക.
- **സീക്രട്ടുകൾ കാലാകാലങ്ങളിൽ റൊട്ടേറ്റ് ചെയ്യുക** — ഒരു പുതിയ `secret` `PUT` ചെയ്യുക, പുതിയ മൂല്യം റിസീവറിലേക്ക് ഡിപ്ലോയ് ചെയ്യുക, തുടർന്ന് ടെസ്റ്റ് എൻഡ്പോയിന്റ് വഴി സ്ഥിരീകരിക്കുക.

## ഇതും കാണുക

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — സമ്പൂർണ്ണ മാനേജ്മെന്റ് API ഉപരിതലം
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` വഴി ദൃശ്യമാകുന്ന പ്രൊവൈഡർ പരാജയങ്ങൾക്ക് പിന്നിലെ സർക്യൂട്ട് ബ്രേക്കർ / കൂൾഡൗൺ സെമാന്റിക്സ്
- സോഴ്സ്: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
