# Webhooks (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sors awtorevoli:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jista’ jattiva webhooks HTTP meta jseħħu avvenimenti tal-pjattaforma. Użahom biex tintegra ma’
Slack, PagerDuty, Datadog, servizzi interni ta’ twissijiet, jew kwalunkwe riċevitur HTTP.

Id-dispatcher jiffirma kull konsenja b’HMAC-SHA256, jerġa’ jipprova f’każ ta’
fallimenti temporanji, isegwi l-istat tal-konsenji għal kull webhook, u jiddiżattiva awtomatikament endpoints li
jibqgħu jfallu.

## Avvenimenti Appoġġjati

It-tip `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, użat minn `src/lib/webhookDispatcher.ts`) bħalissa jimmudella eżattament erba’ avvenimenti:

| Avveniment          | Jiġi attivat meta                                                               |
| ------------------- | ------------------------------------------------------------------------------- |
| `request.completed` | Talba mibgħuta permezz ta’ proxy titlesta b’suċċess                             |
| `request.failed`    | Talba mibgħuta permezz ta’ proxy tfalli wara l-provi mill-ġdid/fallbacks kollha |
| `quota.exceeded`    | Ċavetta API taqbeż limitu ta’ baġit/kwota                                       |
| `test.ping`         | Avveniment sintetiku użat mill-endpoint tat-test                                |

L-abbonamenti jaċċettaw il-valur litterali `"*"` biex jirċievu kull avveniment. Ismijiet ta’
avvenimenti mhux magħrufa f’`events` jiġu injorati waqt id-dispaċċ.

> Nota: l-API tad-dispatcher hija mqabbda, iżda s-siti tas-sejħiet tal-produzzjoni għal uħud mill-
> avvenimenti li mhumiex `test.ping` għadhom qed jiġu implimentati. Iċċekkja `grep dispatchEvent` biex tara
> liema mogħdijiet bħalissa jsejħu lid-dispatcher fir-rilaxx tiegħek.

## Arkitettura

```
Min isejjaħ (handler, servizz, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> iffiltra skont webhook.events
    -> għal kull qbil (b’mod parallel):
       deliverWebhook(url, payload, secret)
         ibni l-payload { event, timestamp, data }
         iffirma l-body b’HMAC-SHA256 (jekk hemm secret)
         POST b’timeout ta’ 10s
         erġa’ pprova sa 3 darbiet għal 5xx / żball tan-network
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Id-dispaċċ jaħdem mingħajr ma min isejjaħ joqgħod jistenna r-riżultat: `Promise.allSettled` jassorbi
l-iżbalji ta’ kull webhook sabiex riċevitur wieħed difettuż ma jkunx jista’ jimblokka lill-oħrajn.

## Iffirmar HMAC

Meta webhook ikollu `secret`, OmniRoute jiffirma l-body JSON u jibgħat:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> L-ismijiet tal-headers jużaw il-prefiss `X-Webhook-*` (mhux `X-OmniRoute-*`). Il-valur tal-firma
> huwa `sha256=<hex>` — ivverifika l-prefiss sħiħ.

Jekk `createWebhook` jissejjaħ mingħajr secret, il-modulu DB jiġġenera wieħed
(`whsec_<48 hex>`) sabiex il-webhooks kollha jkunu ffirmati awtomatikament.

### Verifika min-naħa tar-riċevitur

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Dejjem ivverifika billi tuża l-body **mhux ipproċessat** tat-talba, qabel kwalunkwe parsing ta’ JSON.

## Politika ta’ Tentattivi Mill-Ġdid u Ħsarat

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Limitu ta’ żmien ta’ 10 sekondi għal kull tentattiv (`AbortController`).
- Status HTTP 2xx jitqies bħala suċċess.
- Status HTTP 3xx/4xx jitqies bħala status finali li ma jistax jerġa’ jiġi ppruvat — jiġi rreġistrat bħala mwassal
  b’`success = res.ok`.
- Żbalji HTTP 5xx u żbalji tan-network jerġgħu jiġu ppruvati b’dewmien esponenzjali:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Wara `maxRetries`, it-twassil jiġi rreġistrat bħala fallut.
- Kull twassil jaġġorna `last_triggered_at`, `last_status`, u jew jirrisettja
  jew iżid `failure_count`.
- Id-dispaċċatur isejjaħ `disableWebhooksWithHighFailures(10)` wara kull fan-out,
  għalhekk kwalunkwe webhook b’`failure_count >= 10` jiġi diżattivat awtomatikament.

## Bażi tad-Data

Tabella `webhooks` (migrazzjoni `011_webhooks.sql`):

| Kolonna             | Tip     | Noti                                                      |
| ------------------- | ------- | --------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                      |
| `url`               | TEXT    | URL tad-destinazzjoni                                     |
| `events`            | TEXT    | Array JSON; valur default `["*"]`                         |
| `secret`            | TEXT    | Sigriet HMAC (iġġenerat awtomatikament jekk ma jingħatax) |
| `enabled`           | INT     | 0/1; valur default 1                                      |
| `description`       | TEXT    | Tikketta umana fakultattiva                               |
| `created_at`        | TEXT    | `datetime('now')`                                         |
| `last_triggered_at` | TEXT    | Aġġornat ma’ kull tentattiv ta’ twassil                   |
| `last_status`       | INT     | Status HTTP tal-aħħar tentattiv (0 = network)             |
| `failure_count`     | INT     | Jirrisettja għal 0 mas-suċċess, +1 mal-falliment          |

L-istorja tat-twassil tinħażen fit-tabella ddedikata `webhook_deliveries`
(migrazzjoni `069_webhook_deliveries.sql`, miktuba permezz ta’
`src/lib/db/webhookDeliveries.ts::insertDelivery` ma’ kull tentattiv), flimkien
mal-counters aggregati fir-ringiela `webhooks`. Il-metadata tat-tip (Slack / Discord /
Telegram / trasformaturi personalizzati tal-payload) ġiet miżjuda minn `070_webhooks_kind_metadata.sql`.

## API REST

L-endpoints kollha jeħtieġu awtentikazzjoni tal-ġestjoni (`requireManagementAuth`).

| Endpoint                        | Metodu | Deskrizzjoni                                        |
| ------------------------------- | ------ | --------------------------------------------------- |
| `/api/webhooks`                 | GET    | Elenka l-webhooks (sigrieti moħbija)                |
| `/api/webhooks`                 | POST   | Oħloq webhook                                       |
| `/api/webhooks/[id]`            | GET    | Dettalji tal-webhook (sigriet sħiħ)                 |
| `/api/webhooks/[id]`            | PUT    | Aġġorna l-oqsma                                     |
| `/api/webhooks/[id]`            | DELETE | Neħħi                                               |
| `/api/webhooks/[id]/test`       | POST   | Skatta `test.ping` (mingħajr tentattivi mill-ġdid)  |
| `/api/webhooks/[id]/deliveries` | GET    | Tentattivi riċenti ta’ twassil għal webhook wieħed  |
| `/api/webhooks/validate-url`    | POST   | Validazzjoni preliminari tal-URL (protezzjoni SSRF) |

`GET /api/webhooks` jaħbi s-sigriet bħala `<first 10 chars>...` sabiex jevita li
jiġi żvelat fil-paġni tal-listi. Uża l-GET ta’ `[id]` meta fil-fatt ikollok bżonn is-sigriet.

### Oħloq webhook

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

Jekk `secret` jitħalla barra, is-server jiġġenera sigriet `whsec_<hex>` u jirritornah
fir-rispons.

### Ittestja l-webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Jirritorna `{ delivered, status, error }`. Ma jsir l-ebda tentattiv mill-ġdid — utli biex
tivvalida malajr li r-riċevitur jaċċetta l-payload u l-firma.

## Dashboard

Il-paġna tad-dashboard f’`/dashboard/webhooks` (ara
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) tipprovdi:

- Il-ħolqien/editjar ta’ webhooks b’selettur tal-avvenimenti
- Indikatur tal-istatus (attiv / inattiv / bi żball) ibbażat fuq `enabled`,
  `failure_count`, u `last_status`
- Twassil tat-test bi klikk waħda
- Swiċċ manwali għall-attivazzjoni/diżattivazzjoni

## Eżempji ta’ Payloads

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
    "message": "Twassil ta’ webhook tat-test minn OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

L-istrutturi tal-kampijiet għal avvenimenti li mhumiex `test.ping` huma definiti mis-siti tas-sejħiet li jemettuhom; ittratta l-oġġett `data` bħala kompatibbli ma’ verżjonijiet futuri (żid kampijiet, tiddependix fuq in-nuqqas tagħhom).

## L-Aħjar Prattiki

- **Ivverifika l-firma ma’ kull twassil** billi tqabbilha mal-korp mhux ipproċessat — dan jipprevjeni POSTs iffalsifikati minn kull min jaqta’ l-URL tal-webhook tiegħek.
- **Irrispondi b’2xx fi żmien ~5 sekondi** — id-distributur jiskadi wara 10 s. Riċevituri bil-mod jikkunsmaw it-tentattivi mill-ġdid u jżidu `failure_count`.
- **Agħmel il-handlers idempotenti** — it-tentattivi mill-ġdid u s-semantika ta’ twassil mill-inqas darba jfissru li huma possibbli duplikati.
- **Abbona biss għal dak li teħtieġ** — elenka biss l-avvenimenti li fil-fatt tuża; `"*"` iżid l-ispiża għar-riċevituri li ma tikkontrollax.
- **Immonitorja `failure_count`** — l-endpoints jiġu diżattivati awtomatikament wara 10 fallimenti konsekuttivi; issettjah mill-ġdid billi ssejjaħ `PUT /api/webhooks/[id]` b’`enabled: true` wara li tirranġa r-riċevitur.
- **Ibdel is-sigrieti perjodikament** — ibgħat `PUT` b’`secret` ġdid, iddistribwixxi l-valur il-ġdid lir-riċevitur, u kkonferma permezz tal-endpoint tat-test.

## Ara Wkoll

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — is-superfiċje sħiħa tal-API tal-ġestjoni
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — is-semantika taċ-circuit breaker / cooldown wara l-fallimenti tal-fornitur esposti permezz ta’ `request.failed`
- Sors: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
