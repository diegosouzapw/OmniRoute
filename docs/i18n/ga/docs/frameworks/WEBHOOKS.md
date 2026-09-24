# Webhooks (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Foinse na fírinne:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Nuashonraithe go deireanach:** 2026-06-28 — v3.8.40

Is féidir le OmniRoute glaonna gréasáin HTTP a sheoladh nuair a tharlaíonn teagmhais ardáin. Úsáid iad chun comhtháthú a dhéanamh le
Slack, PagerDuty, Datadog, seirbhísí foláirimh inmheánacha, nó aon ghlacadóir HTTP.

Síníonn an seoltóir gach seachadadh le HMAC-SHA256, déanann sé iarracht eile tar éis
teipeanna sealadacha, rianaíonn sé sláinte seachadta gach glao gréasáin, agus díchumasaíonn sé go huathoibríoch críochphointí
a leanann orthu ag teip.

## Teagmhais a dTacaítear Leo

Samhlaíonn an cineál `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, arna úsáid ag `src/lib/webhookDispatcher.ts`) ceithre theagmhas go díreach faoi láthair:

| Teagmhas            | Seoltar é nuair a                                                    |
| ------------------- | -------------------------------------------------------------------- |
| `request.completed` | A chríochnaíonn iarratas seachfhreastail go rathúil                  |
| `request.failed`    | A theipeann ar iarratas seachfhreastail tar éis gach atriail/cúltaca |
| `quota.exceeded`    | A sháraíonn eochair API tairseach buiséid/cuóta                      |
| `test.ping`         | Teagmhas sintéiseach a úsáideann an críochphointe tástála            |

Glacann síntiúis leis an luach litriúil `"*"` chun gach teagmhas a fháil. Déantar neamhaird d’ainmneacha
teagmhas anaithnid in `events` tráth an tseolta.

> Nóta: tá API an tseoltóra nasctha, ach tá suíomhanna glao táirgthe do chuid de na
> teagmhais nach `test.ping` iad fós á gcur i bhfeidhm. Seiceáil `grep dispatchEvent` chun a fháil amach
> cé na conairí a agraíonn an seoltóir i d’eisiúint faoi láthair.

## Ailtireacht

```
Glaoiteoir (láimhseálaí, seirbhís, monatóir)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> scagadh de réir webhook.events
    -> do gach meaitseáil (go comhthreomhar):
       deliverWebhook(url, payload, secret)
         tóg pálasta { event, timestamp, data }
         sínigh an corp le HMAC-SHA256 (má tá rún ann)
         POST le teorainn ama 10s
         bain triail eile as suas le 3 huaire i gcás 5xx / earráid líonra
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Is próiseas seol-agus-déan-dearmad é an seoladh don ghlaoiteoir: slogann `Promise.allSettled`
earráidí gach glao gréasáin ionas nach féidir le glacadóir lochtach amháin bac a chur ar na cinn eile.

## Síniú HMAC

Nuair a bhíonn `secret` ag glao gréasáin, síníonn OmniRoute an corp JSON agus seolann sé:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Úsáideann ainmneacha na gceanntásca an réimír `X-Webhook-*` (ní `X-OmniRoute-*`). Is é luach
> an tsínithe `sha256=<hex>` — fíoraigh an réimír iomlán.

Má ghlaoitear `createWebhook` gan rún, gineann modúl an bhunachair sonraí ceann
(`whsec_<48 hex>`) ionas go sínítear gach glao gréasáin de réir réamhshocraithe.

### Fíorú ar an nglacadóir

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Fíoraigh i gcónaí in aghaidh chorp **amh** an iarratais, roimh aon pharsáil JSON.

## Polasaí Atrialacha & Teipeanna

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Teorainn ama 10 soicind in aghaidh na hiarrachta (`AbortController`).
- Áirítear HTTP 2xx mar rath.
- Áirítear HTTP 3xx/4xx mar stádas deiridh nach féidir a atriail — déantar é a thaifeadadh mar sheachadadh
  le `success = res.ok`.
- Déantar HTTP 5xx agus earráidí líonra a atriail le cúlscoitheadh easpónantúil:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Tar éis `maxRetries`, déantar an seachadadh a thaifeadadh mar theip.
- Nuashonraíonn gach seachadadh `last_triggered_at`, `last_status`, agus athshocraíonn
  nó incrimintíonn sé `failure_count`.
- Glaonn an seoltóir ar `disableWebhooksWithHighFailures(10)` tar éis gach scaipthe,
  mar sin díchumasaítear go huathoibríoch aon webhook a bhfuil `failure_count >= 10` aige.

## Bunachar Sonraí

Tábla `webhooks` (aistriú `011_webhooks.sql`):

| Colún               | Cineál  | Nótaí                                             |
| ------------------- | ------- | ------------------------------------------------- |
| `id`                | TEXT PK | UUID                                              |
| `url`               | TEXT    | URL ceann scríbe                                  |
| `events`            | TEXT    | Eagar JSON; réamhshocrú `["*"]`                   |
| `secret`            | TEXT    | Rún HMAC (gintar go huathoibríoch mura dtugtar é) |
| `enabled`           | INT     | 0/1; is é 1 an réamhshocrú                        |
| `description`       | TEXT    | Lipéad roghnach inléite ag daoine                 |
| `created_at`        | TEXT    | `datetime('now')`                                 |
| `last_triggered_at` | TEXT    | Nuashonraithe le gach iarracht seachadta          |
| `last_status`       | INT     | Stádas HTTP na hiarrachta deireanaí (0 = líonra)  |
| `failure_count`     | INT     | Athshocraítear go 0 ar rath, +1 ar theip          |

Coinnítear stair na seachadtaí sa tábla tiomnaithe `webhook_deliveries`
(aistriú `069_webhook_deliveries.sql`, scríofa trí
`src/lib/db/webhookDeliveries.ts::insertDelivery` le gach iarracht), chomh maith
leis na cuntair chomhiomlána ar an ró `webhooks`. Cuireadh meiteashonraí cineáil (Slack / Discord /
Telegram / claochladáin pálasta saincheaptha) leis trí `070_webhooks_kind_metadata.sql`.

## API REST

Teastaíonn fíordheimhniú bainistíochta (`requireManagementAuth`) ó gach críochphointe.

| Críochphointe                   | Modh   | Cur Síos                                         |
| ------------------------------- | ------ | ------------------------------------------------ |
| `/api/webhooks`                 | GET    | Liostaigh webhooks (rúin folaithe)               |
| `/api/webhooks`                 | POST   | Cruthaigh webhook                                |
| `/api/webhooks/[id]`            | GET    | Sonraí webhook (rún iomlán)                      |
| `/api/webhooks/[id]`            | PUT    | Nuashonraigh réimsí                              |
| `/api/webhooks/[id]`            | DELETE | Bain                                             |
| `/api/webhooks/[id]/test`       | POST   | Seol `test.ping` (gan atrialacha)                |
| `/api/webhooks/[id]/deliveries` | GET    | Iarrachtaí seachadta le déanaí do webhook amháin |
| `/api/webhooks/validate-url`    | POST   | Bailíochtú URL réamheitilte (cosaint SSRF)       |

Folaíonn `GET /api/webhooks` an rún mar `<first 10 chars>...` chun sceitheadh
ar leathanaigh liostaithe a sheachaint. Úsáid an GET `[id]` nuair a bhíonn an rún de dhíth ort i ndáiríre.

### Cruthaigh webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Foláirimh Slack"
  }'
```

Má fhágtar `secret` ar lár, gineann an freastalaí rún `whsec_<hex>` agus seolann
sé ar ais sa fhreagra é.

### Tástáil webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Seoltar `{ delivered, status, error }` ar ais. Ní dhéantar aon atrialacha — tá sé seo úsáideach chun
a dheimhniú go tapa go nglacann an glacadóir leis an bpálasta agus leis an síniú.

## Painéal

Soláthraíonn leathanach an phainéil ag `/dashboard/webhooks` (féach
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) na gnéithe seo a leanas:

- Crúcaí gréasáin a chruthú/a chur in eagar le roghnóir teagmhas
- Táscaire stádais (gníomhach / neamhghníomhach / earráideach) bunaithe ar `enabled`,
  `failure_count`, agus `last_status`
- Seachadadh tástála le clic amháin
- Scorán láimhe chun cumasú/díchumasú

## Samplaí Pálasta

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

Sainítear cruthanna na réimsí do theagmhais seachas `test.ping` ag na suíomhanna glao a astaíonn
iad; caith leis an réad `data` mar réad atá comhoiriúnach chun cinn (cuir réimsí leis, ná bí ag brath ar
a n-éagmais).

## Dea-Chleachtais

- **Fíoraigh an síniú ar gach seachadadh** i gcoinne an amhchoirp — cuireann sé seo cosc ar
  iarratais POST bréagaithe ó dhuine ar bith a thomhaiseann URL do chrúca gréasáin.
- **Freagair le 2xx laistigh de ~5 shoicind** — téann an seoltóir thar am tar éis 10 s. Ídeoidh
  glacadóirí malla atrialacha agus méadóidh siad `failure_count`.
- **Déan láimhseálaithe idémpatach** — ciallaíonn atrialacha agus séimeantaic seachadta
  uair amháin ar a laghad go bhféadfadh dúblaigh a bheith ann.
- **Liostáil go híosmhéideach** — ná liostaigh ach na teagmhais a úsáideann tú i ndáiríre; cuirfidh `"*"`
  costas le glacadóirí nach bhfuil faoi do smacht.
- **Coinnigh súil ar `failure_count`** — díchumasaítear críochphointí go huathoibríoch tar éis 10
  dteip as a chéile; athshocraigh é trí `PUT /api/webhooks/[id]` a ghlaoch le `enabled: true`
  tar éis an glacadóir a dheisiú.
- **Rothlaigh rúin go tréimhsiúil** — déan `PUT` ar `secret` nua, imlonnaigh an luach nua
  chuig an nglacadóir, agus deimhnigh é tríd an gcríochphointe tástála.

## Féach Freisin

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — dromchla iomlán an API bainistíochta
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — séimeantaic an scoradáin chiorcaid / an fhuaraithe
  taobh thiar de theipeanna soláthraithe a nochtar trí `request.failed`
- Foinse: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
