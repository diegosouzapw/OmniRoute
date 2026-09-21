# Webhooks (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Tõeallikas:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute saab platvormisündmuste korral käivitada HTTP-veebihaake. Kasutage neid lõimimiseks
Slacki, PagerDuty, Datadogi, sisemiste teavitusteenuste või mis tahes HTTP-vastuvõtjaga.

Dispetšer allkirjastab iga edastuse HMAC-SHA256 abil, proovib ajutiste
tõrgete korral uuesti, jälgib iga veebihaagi edastuste töökindlust ja keelab automaatselt lõpp-punktid,
mille tõrked jätkuvad.

## Toetatud sündmused

Tüüp `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, mida kasutab `src/lib/webhookDispatcher.ts`) modelleerib praegu täpselt nelja sündmust:

| Sündmus             | Käivitub, kui                                               |
| ------------------- | ----------------------------------------------------------- |
| `request.completed` | Proksitud päring lõpetatakse edukalt                        |
| `request.failed`    | Proksitud päring nurjub pärast kõiki korduskatseid/varuteid |
| `quota.exceeded`    | API-võti ületab eelarve-/kvoodipiiri                        |
| `test.ping`         | Testimise lõpp-punkti kasutatav sünteetiline sündmus        |

Tellimused aktsepteerivad literaali `"*"`, et võtta vastu kõik sündmused. Tundmatuid sündmuste
nimesid väljal `events` eiratakse dispetšimise ajal.

> Märkus: dispetšeri API on ühendatud, kuid mõne muu sündmuse kui
> `test.ping` tootmiskeskkonna väljakutsekohad on endiselt lisamisel. Kontrollige käsuga `grep dispatchEvent`,
> millised teed teie väljalaskes praegu dispetšeri välja kutsuvad.

## Arhitektuur

```
Väljakutsuja (töötleja, teenus, seire)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtreeri webhook.events järgi
    -> iga vaste jaoks (paralleelselt):
       deliverWebhook(url, payload, secret)
         koosta last { event, timestamp, data }
         allkirjasta sisu HMAC-SHA256 abil (kui secret on olemas)
         POST 10 s ajalõpuga
         proovi 5xx / võrgutõrke korral kuni 3 korda uuesti
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispetšimine toimub väljakutsuja jaoks käivita-ja-unusta-põhimõttel: `Promise.allSettled` neelab
iga veebihaagi vead, et üks vigane vastuvõtja ei saaks teisi blokeerida.

## HMAC-allkirjastamine

Kui veebihaagil on `secret`, allkirjastab OmniRoute JSON-sisu ja saadab:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <sündmus>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<kuueteistkümnendkujul HMAC-SHA256(secret, sisu)>
```

> Päisenimed kasutavad prefiksit `X-Webhook-*` (mitte `X-OmniRoute-*`). Allkirja
> väärtus on `sha256=<kuueteistkümnendkujul väärtus>` — kontrollige kogu prefiksit.

Kui `createWebhook` kutsutakse välja ilma saladuseta, genereerib andmebaasimoodul selle
(`whsec_<48 kuueteistkümnendmärki>`), mistõttu allkirjastatakse vaikimisi kõik veebihaagid.

### Kontrollimine vastuvõtjas

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Kontrollige alati **töötlemata** päringusisu enne JSON-i sõelumist.

## Korduskatsete ja tõrgete reeglistik

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Iga katse ajalõpp on 10 sekundit (`AbortController`).
- HTTP 2xx loetakse õnnestumiseks.
- HTTP 3xx/4xx loetakse lõplikuks olekuks, mille korral korduskatset ei tehta — tarne registreeritakse väärtusega `success = res.ok`.
- HTTP 5xx vastuste ja võrgutõrgete korral tehakse eksponentsiaalse viivitusega korduskatsed:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Pärast `maxRetries` korduskatset registreeritakse tarne nurjununa.
- Iga tarne uuendab välju `last_triggered_at`, `last_status` ning kas lähtestab või suurendab välja `failure_count`.
- Jaotur kutsub pärast iga levitamist välja `disableWebhooksWithHighFailures(10)`, seega keelatakse automaatselt kõik webhook'id, mille `failure_count >= 10`.

## Andmebaas

Tabel `webhooks` (migratsioon `011_webhooks.sql`):

| Veerg               | Tüüp    | Märkused                                                        |
| ------------------- | ------- | --------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                            |
| `url`               | TEXT    | Sihtkoha URL                                                    |
| `events`            | TEXT    | JSON-massiiv; vaikeväärtus `["*"]`                              |
| `secret`            | TEXT    | HMAC-saladus (genereeritakse automaatselt, kui seda pole antud) |
| `enabled`           | INT     | 0/1; vaikeväärtus on 1                                          |
| `description`       | TEXT    | Valikuline inimloetav silt                                      |
| `created_at`        | TEXT    | `datetime('now')`                                               |
| `last_triggered_at` | TEXT    | Uuendatakse iga tarnekatse korral                               |
| `last_status`       | INT     | Viimase katse HTTP-olek (0 = võrk)                              |
| `failure_count`     | INT     | Õnnestumisel lähtestatakse 0-le, tõrke korral +1                |

Tarnete ajalugu säilitatakse spetsiaalses tabelis `webhook_deliveries`
(migratsioon `069_webhook_deliveries.sql`, kuhu iga katse korral kirjutatakse
funktsiooniga `src/lib/db/webhookDeliveries.ts::insertDelivery`) lisaks rea
`webhooks` koondloenduritele. Liigi metaandmed (Slack / Discord /
Telegram / kohandatud lasti teisendajad) lisati migratsiooniga `070_webhooks_kind_metadata.sql`.

## REST API

Kõik lõpp-punktid nõuavad haldusautentimist (`requireManagementAuth`).

| Lõpp-punkt                      | Meetod | Kirjeldus                                 |
| ------------------------------- | ------ | ----------------------------------------- |
| `/api/webhooks`                 | GET    | Webhook'ide loend (saladused maskitud)    |
| `/api/webhooks`                 | POST   | Webhook'i loomine                         |
| `/api/webhooks/[id]`            | GET    | Webhook'i üksikasjad (täielik saladus)    |
| `/api/webhooks/[id]`            | PUT    | Väljade uuendamine                        |
| `/api/webhooks/[id]`            | DELETE | Eemaldamine                               |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` käivitamine (korduskatseteta) |
| `/api/webhooks/[id]/deliveries` | GET    | Ühe webhook'i hiljutised tarnekatsed      |
| `/api/webhooks/validate-url`    | POST   | URL-i eelkontroll (SSRF-i kaitse)         |

`GET /api/webhooks` maskeerib saladuse kujule `<esimesed 10 märki>...`, et vältida
selle lekkimist loendilehtedel. Kasutage `[id]` GET-päringut siis, kui vajate
tegelikult saladust.

### Webhook'i loomine

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

Kui `secret` puudub, genereerib server saladuse kujul `whsec_<hex>` ja tagastab
selle vastuses.

### Webhook'i testimine

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Tagastab `{ delivered, status, error }`. Korduskatseid ei tehta — see on kasulik,
et kiiresti kontrollida, kas vastuvõtja aktsepteerib lasti ja allkirja.

## Juhtpaneel

Juhtpaneeli leht aadressil `/dashboard/webhooks` (vt
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) võimaldab:

- Luua ja muuta webhook'e sündmuste valijaga
- Kuvada olekuindikaatorit (aktiivne / mitteaktiivne / veaga), mis põhineb väljadel `enabled`,
  `failure_count` ja `last_status`
- Saata testpäringu ühe klõpsuga
- Käsitsi lubada või keelata

## Päringu sisu näited

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

Muude kui `test.ping` sündmuste väljade struktuuri määravad neid väljastavad
väljakutsumiskohad; käsitlege objekti `data` edasiühilduvana (lisage välju, ärge eeldage
nende puudumist).

## Parimad tavad

- **Kontrollige iga edastuse signatuuri** töötlemata sisu põhjal — see takistab
  võltsitud POST-päringuid kõigilt, kes teie webhook'i URL-i ära arvavad.
- **Vastake 2xx-koodiga umbes 5 sekundi jooksul** — dispetšer katkestab päringu 10 sekundi pärast. Aeglased
  vastuvõtjad kulutavad korduskatseid ja suurendavad `failure_count` väärtust.
- **Muutke töötlejad idempotentseks** — korduskatsed ja vähemalt ühe edastuse semantika
  tähendavad, et duplikaadid on võimalikud.
- **Tellige minimaalselt** — loetlege ainult sündmused, mida tegelikult kasutate; `"*"`
  suurendab teie kontrolli alt väljas olevate vastuvõtjate kulusid.
- **Jälgige välja `failure_count`** — lõpp-punktid keelatakse automaatselt pärast 10 järjestikust
  tõrget; pärast vastuvõtja parandamist lähtestage see, kutsudes välja `PUT /api/webhooks/[id]`
  väärtusega `enabled: true`.
- **Vahetage saladusi regulaarselt** — saatke `PUT`-päring uue `secret` väärtusega, juurutage uus väärtus
  vastuvõtjasse ja kontrollige seda testimise lõpp-punkti kaudu.

## Vaadake ka

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — haldus-API täielik liides
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — teenusepakkuja tõrgete taga olevad circuit breaker'i / cooldown'i
  semantikad, mis avalduvad sündmuse `request.failed` kaudu
- Lähtekood: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
