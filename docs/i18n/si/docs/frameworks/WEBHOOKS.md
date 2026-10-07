# Webhooks (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **සත්යයේ මූලාශ්රය:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **අවසන් වරට යාවත්කාලීන කළේ:** 2026-06-28 — v3.8.40

OmniRoute හට වේදිකා සිදුවීම් මත HTTP webhooks ක්රියාත්මක කළ හැක. Slack, PagerDuty, Datadog, අභ්යන්තර අනතුරු ඇඟවීමේ සේවා, හෝ ඕනෑම HTTP ප්රතිග්රාහකයක් සමඟ ඒකාබද්ධ වීමට ඒවා භාවිත කරන්න.

dispatcher එක සෑම බෙදාහැරීමක්ම HMAC-SHA256 සමඟ අත්සන් කරයි, තාවකාලික අසාර්ථකවීම්වලදී නැවත උත්සාහ කරයි, එක් එක් webhook එක අනුව බෙදාහැරීමේ සෞඛ්ය තත්ත්වය නිරීක්ෂණය කරයි, සහ දිගින් දිගටම අසාර්ථක වන endpoints ස්වයංක්රීයව අක්රිය කරයි.

## සහාය දක්වන සිදුවීම්

`WebhookEvent` වර්ගය (`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts` මඟින් භාවිත කරයි) දැනට නිශ්චිතව සිදුවීම් හතරක් නිරූපණය කරයි:

| සිදුවීම             | ක්රියාත්මක වන්නේ                                                   |
| ------------------- | ------------------------------------------------------------------ |
| `request.completed` | proxy කළ ඉල්ලීමක් සාර්ථකව සම්පූර්ණ වූ විට                          |
| `request.failed`    | සියලු නැවත උත්සාහ/විකල්පවලින් පසු proxy කළ ඉල්ලීමක් අසාර්ථක වූ විට |
| `quota.exceeded`    | API යතුරක් අයවැය/quota සීමාවක් ඉක්මවා ගිය විට                      |
| `test.ping`         | පරීක්ෂණ endpoint එක භාවිත කරන කෘත්රිම සිදුවීමක්                    |

සෑම සිදුවීමක්ම ලබා ගැනීමට subscriptions විසින් නියමිත `"*"` අගය පිළිගනී. `events` තුළ ඇති නොදන්නා සිදුවීම් නම් dispatch කරන අවස්ථාවේ නොසලකා හරිනු ලැබේ.

> සටහන: dispatcher API එක සම්බන්ධ කර ඇත, නමුත් `test.ping` නොවන සමහර
> සිදුවීම් සඳහා production call sites තවමත් එක් කෙරෙමින් පවතී. ඔබේ නිකුතුවේ
> දැනට dispatcher එක කැඳවන paths මොනවාදැයි බැලීමට `grep dispatchEvent` පරීක්ෂා කරන්න.

## ගෘහනිර්මාණය

```
කැඳවුම්කරු (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events අනුව පෙරහන් කරන්න
    -> ගැළපෙන සෑම එකක් සඳහාම (සමාන්තරව):
       deliverWebhook(url, payload, secret)
         payload එක සාදන්න { event, timestamp, data }
         HMAC-SHA256 සමඟ body එක අත්සන් කරන්න (secret තිබේ නම්)
         තත්පර 10ක කාල සීමාවක් සහිතව POST කරන්න
         5xx / ජාල දෝෂයකදී උපරිම වාර 3ක් නැවත උත්සාහ කරන්න
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispatch කිරීම කැඳවුම්කරු සඳහා ප්රතිඵලය බලා නොසිට ඉදිරියට යන ආකාරයෙන් සිදු වේ: එක් දෝෂ සහිත ප්රතිග්රාහකයකට අනෙක් ඒවා අවහිර කළ නොහැකි වන පරිදි `Promise.allSettled` විසින් එක් එක් webhook එකේ දෝෂ යටපත් කරයි.

## HMAC අත්සන් කිරීම

webhook එකකට `secret` එකක් ඇති විට, OmniRoute විසින් JSON body එක අත්සන් කර පහත දෑ යවයි:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Header නම් `X-OmniRoute-*` වෙනුවට `X-Webhook-*` උපසර්ගය භාවිත කරයි. signature
> අගය `sha256=<hex>` වේ — සම්පූර්ණ උපසර්ගය සත්යාපනය කරන්න.

secret එකක් නොමැතිව `createWebhook` කැඳවනු ලැබුවහොත්, සියලු webhooks පෙරනිමියෙන් අත්සන් වන පරිදි DB module එක විසින් එකක් (`whsec_<48 hex>`) ජනනය කරයි.

### ප්රතිග්රාහකයේදී සත්යාපනය කිරීම

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

කිසියම් JSON parsing කිරීමකට පෙර, සෑම විටම **අමු** request body එකට එරෙහිව සත්යාපනය කරන්න.

## නැවත උත්සාහ කිරීමේ සහ අසාර්ථක වීමේ ප්රතිපත්තිය

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- සෑම උත්සාහයකටම තත්පර 10ක කාල සීමාවක් ඇත (`AbortController`).
- HTTP 2xx සාර්ථක ලෙස සැලකේ.
- HTTP 3xx/4xx නැවත උත්සාහ නොකරන අවසාන තත්ත්වයක් ලෙස සැලකේ — `success = res.ok` සමඟ බෙදාහැර ඇති බවට සටහන් කෙරේ.
- HTTP 5xx සහ ජාල දෝෂ සඳහා ඝාතීය ප්රමාදයක් සමඟ නැවත උත්සාහ කෙරේ:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- `maxRetries` පසු, බෙදාහැරීම අසාර්ථක වූ බවට සටහන් කෙරේ.
- සෑම බෙදාහැරීමකදීම `last_triggered_at`, `last_status` යාවත්කාලීන කෙරෙන අතර `failure_count` යළි සකසනු හෝ වැඩි කරනු ලැබේ.
- සෑම fan-out එකකටම පසු dispatcher එක `disableWebhooksWithHighFailures(10)` අමතන බැවින්, `failure_count >= 10` වන ඕනෑම webhook එකක් ස්වයංක්රීයව අක්රිය කෙරේ.

## දත්ත සමුදාය

`webhooks` වගුව (migration `011_webhooks.sql`):

| තීරුව               | වර්ගය   | සටහන්                                             |
| ------------------- | ------- | ------------------------------------------------- |
| `id`                | TEXT PK | UUID                                              |
| `url`               | TEXT    | ගමනාන්ත URL එක                                    |
| `events`            | TEXT    | JSON අරාව; පෙරනිමිය `["*"]`                       |
| `secret`            | TEXT    | HMAC රහස (ලබා නොදුන්නේ නම් ස්වයංක්රීයව ජනනය කෙරේ) |
| `enabled`           | INT     | 0/1; පෙරනිමිය 1 වේ                                |
| `description`       | TEXT    | විකල්ප, මිනිසුන්ට කියවිය හැකි ලේබලය               |
| `created_at`        | TEXT    | `datetime('now')`                                 |
| `last_triggered_at` | TEXT    | සෑම බෙදාහැරීමේ උත්සාහයකදීම යාවත්කාලීන කෙරේ        |
| `last_status`       | INT     | අවසන් උත්සාහයේ HTTP තත්ත්වය (0 = ජාලය)            |
| `failure_count`     | INT     | සාර්ථක වූ විට 0 වෙත යළි සකසයි, අසාර්ථක වූ විට +1  |

සමස්ත කවුන්ටර `webhooks` පේළියේ තබාගැනීමට අමතරව, බෙදාහැරීම් ඉතිහාසය වෙන් කළ `webhook_deliveries` වගුවෙහි ස්ථිරව ගබඩා කෙරේ
(migration `069_webhook_deliveries.sql`, සෑම උත්සාහයකදීම
`src/lib/db/webhookDeliveries.ts::insertDelivery` හරහා ලියනු ලැබේ).
වර්ගයට අදාළ metadata (Slack / Discord / Telegram / අභිරුචි payload පරිවර්තක)
`070_webhooks_kind_metadata.sql` මඟින් එක් කරන ලදී.

## REST API

සියලු endpoint සඳහා කළමනාකරණ සත්යාපනය (`requireManagementAuth`) අවශ්ය වේ.

| Endpoint                        | ක්රමය  | විස්තරය                                     |
| ------------------------------- | ------ | ------------------------------------------- |
| `/api/webhooks`                 | GET    | webhook ලැයිස්තුගත කරන්න (රහස් ආවරණය කර ඇත) |
| `/api/webhooks`                 | POST   | webhook එකක් සාදන්න                         |
| `/api/webhooks/[id]`            | GET    | webhook විස්තර (සම්පූර්ණ රහස)               |
| `/api/webhooks/[id]`            | PUT    | ක්ෂේත්ර යාවත්කාලීන කරන්න                    |
| `/api/webhooks/[id]`            | DELETE | ඉවත් කරන්න                                  |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` එකක් යවන්න (නැවත උත්සාහ නොකරයි) |
| `/api/webhooks/[id]/deliveries` | GET    | එක් webhook එකක මෑත බෙදාහැරීමේ උත්සාහ       |
| `/api/webhooks/validate-url`    | POST   | පෙර-පරීක්ෂණ URL වලංගුකරණය (SSRF ආරක්ෂාව)    |

ලැයිස්තුගත කිරීමේ පිටු හරහා රහස හෙළිවීම වැළැක්වීමට `GET /api/webhooks` එය
`<first 10 chars>...` ලෙස ආවරණය කරයි. ඔබට සැබවින්ම රහස අවශ්ය වූ විට `[id]` GET භාවිත කරන්න.

### webhook එකක් සාදන්න

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

`secret` අත්හැර තිබේ නම්, සේවාදායකය `whsec_<hex>` රහසක් ජනනය කර එය ප්රතිචාරය තුළ ආපසු ලබා දෙයි.

### webhook එකක් පරීක්ෂා කරන්න

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }` ආපසු ලබා දෙයි. නැවත උත්සාහ නොකෙරේ — ග්රාහකයා payload එක සහ අත්සන පිළිගන්නේදැයි ඉක්මනින් තහවුරු කිරීමට මෙය ප්රයෝජනවත් වේ.

## උපකරණ පුවරුව

`/dashboard/webhooks` හි ඇති උපකරණ පුවරු පිටුව (`src/app/(dashboard)/dashboard/webhooks/page.tsx` බලන්න) පහත පහසුකම් සපයයි:

- සිදුවීම් තේරීම්කාරකයක් සමඟ webhooks සෑදීම/සංස්කරණය කිරීම
- `enabled`, `failure_count`, සහ `last_status` මත පදනම් වූ තත්ත්ව දර්ශකය (සක්රිය / අක්රිය / දෝෂ සහිත)
- එක් ක්ලික් කිරීමකින් පරීක්ෂණ බෙදාහැරීම
- අතින් සක්රිය/අක්රිය කිරීමේ ටොගලය

## Payload උදාහරණ

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
    "message": "OmniRoute වෙතින් පරීක්ෂණ webhook බෙදාහැරීම",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` නොවන සිදුවීම් සඳහා ක්ෂේත්රවල හැඩයන් ඒවා නිකුත් කරන ඇමතුම් ස්ථාන මඟින් නිර්වචනය වේ; `data` වස්තුව ඉදිරි අනුවාද සමඟ ගැළපෙන ලෙස සලකන්න (ක්ෂේත්ර එක් කරන්න, ඒවා නොමැති වීම මත රඳා නොපවතින්න).

## හොඳම භාවිතයන්

- **සෑම බෙදාහැරීමකදීම අත්සන සත්යාපනය කරන්න** — raw body එකට එරෙහිව සත්යාපනය කිරීම, ඔබේ webhook URL එක අනුමාන කරන ඕනෑම අයෙකුගෙන් ලැබෙන ව්යාජ POST ඉල්ලීම් වළක්වයි.
- **තත්පර ~5ක් ඇතුළත 2xx ප්රතිචාරයක් ලබා දෙන්න** — dispatcher එක තත්පර 10කදී කල් ඉකුත් වේ. මන්දගාමී receivers නැවත උත්සාහ වැය කර `failure_count` වැඩි කරයි.
- **Handlers idempotent ලෙස සකසන්න** — නැවත උත්සාහ කිරීම් සහ අවම වශයෙන් එක් වරක්වත් බෙදාහැරීමේ semantics නිසා අනුපිටපත් ඇති විය හැක.
- **අවම වශයෙන් දායක වන්න** — ඔබ සැබවින්ම භාවිත කරන සිදුවීම් පමණක් ලැයිස්තුගත කරන්න; `"*"` මඟින් ඔබ පාලනය නොකරන receivers මත පිරිවැය එක් වේ.
- **`failure_count` නිරීක්ෂණය කරන්න** — අඛණ්ඩ අසාර්ථකවීම් 10කදී endpoints ස්වයංක්රීයව අක්රිය කෙරේ; receiver එක නිවැරදි කිරීමෙන් පසු `enabled: true` සමඟ `PUT /api/webhooks/[id]` ඇමතීමෙන් යළි සකසන්න.
- **Secrets වරින් වර මාරු කරන්න** — නව `secret` එකක් `PUT` කරන්න, නව අගය receiver වෙත deploy කරන්න, සහ test endpoint එක හරහා තහවුරු කරන්න.

## මෙයද බලන්න

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — සම්පූර්ණ කළමනාකරණ API පරාසය
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed` හරහා නිරාවරණය වන provider අසාර්ථකවීම් පිටුපස ඇති circuit breaker / cooldown semantics
- මූලාශ්රය: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
