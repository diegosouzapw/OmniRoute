# Webhooks (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Tiesos šaltinis:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

„OmniRoute“ gali siųsti HTTP žiniatinklio kablius įvykus platformos įvykiams. Naudokite juos integracijoms su
„Slack“, „PagerDuty“, „Datadog“, vidinėmis įspėjimų tarnybomis ar bet kuriuo HTTP imtuvu.

Dispečeris kiekvieną pristatymą pasirašo naudodamas HMAC-SHA256, pakartotinai bando įvykus laikinosioms
triktims, stebi kiekvieno žiniatinklio kablio pristatymo būklę ir automatiškai išjungia galinius taškus, kuriems
nuolat nepavyksta pristatyti duomenų.

## Palaikomi įvykiai

Tipas `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, naudojamas `src/lib/webhookDispatcher.ts`) šiuo metu apibrėžia lygiai keturis įvykius:

| Įvykis              | Suaktyvinamas, kai                                                                                |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `request.completed` | Tarpiniu serveriu perduota užklausa sėkmingai baigiama                                            |
| `request.failed`    | Tarpiniu serveriu perduota užklausa nepavyksta po visų pakartotinių bandymų / atsarginių variantų |
| `quota.exceeded`    | API raktas viršija biudžeto / kvotos slenkstį                                                     |
| `test.ping`         | Testavimo galinio taško naudojamas sintetinis įvykis                                              |

Prenumeratose galima nurodyti literalą `"*"`, kad būtų gaunami visi įvykiai. Nežinomi įvykių
pavadinimai, pateikti `events`, išsiuntimo metu ignoruojami.

> Pastaba: dispečerio API yra prijungta, tačiau kai kurios produkcinės ne `test.ping`
> įvykių iškvietimo vietos vis dar diegiamos. Patikrinkite `grep dispatchEvent`, kad sužinotumėte,
> kurie keliai šiuo metu iškviečia jūsų leidimo dispečerį.

## Architektūra

```
Kvietėjas (apdorojimo programa, tarnyba, stebėjimo priemonė)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtruoti pagal webhook.events
    -> kiekvienai atitikčiai (lygiagrečiai):
       deliverWebhook(url, payload, secret)
         sukurti naudingąją apkrovą { event, timestamp, data }
         pasirašyti turinį naudojant HMAC-SHA256 (jei yra secret)
         POST su 10 sek. skirtuoju laiku
         kartoti iki 3 kartų gavus 5xx / tinklo klaidą
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Kvietėjui išsiuntimas vykdomas „paleisti ir pamiršti“ principu: `Promise.allSettled` nuslopina
atskirų žiniatinklio kablių klaidas, todėl vienas netinkamas imtuvas negali blokuoti kitų.

## HMAC pasirašymas

Kai žiniatinklio kablys turi `secret`, „OmniRoute“ pasirašo JSON turinį ir išsiunčia:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <įvykis>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<šešioliktainis HMAC-SHA256(secret, turinys)>
```

> Antraščių pavadinimuose naudojamas prefiksas `X-Webhook-*` (ne `X-OmniRoute-*`). Parašo
> reikšmė yra `sha256=<šešioliktainė reikšmė>` — tikrinkite visą prefiksą.

Jei `createWebhook` iškviečiama be paslapties, DB modulis ją sugeneruoja
(`whsec_<48 šešioliktainiai simboliai>`), todėl pagal numatytuosius nustatymus visi žiniatinklio kabliai yra pasirašomi.

### Tikrinimas imtuve

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Visada tikrinkite pagal **neapdorotą** užklausos turinį, prieš atlikdami bet kokį JSON analizavimą.

## Pakartotinių bandymų ir nesėkmių politika

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Kiekvienam bandymui skiriama 10 sekundžių (`AbortController`).
- HTTP 2xx laikomas sėkmingu rezultatu.
- HTTP 3xx/4xx laikomas galutine būsena, kurios pakartotinai bandyti nereikia, — pristatymas įrašomas
  su `success = res.ok`.
- HTTP 5xx ir tinklo klaidų atvejais bandoma pakartotinai taikant eksponentinį delsos didinimą:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Po `maxRetries` pristatymas įrašomas kaip nesėkmingas.
- Kiekvieno pristatymo metu atnaujinami `last_triggered_at`, `last_status`, o
  `failure_count` nustatomas iš naujo arba padidinamas.
- Po kiekvieno išsiuntimo visiems gavėjams dispečeris iškviečia `disableWebhooksWithHighFailures(10)`,
  todėl bet kuris webhookas, kurio `failure_count >= 10`, automatiškai išjungiamas.

## Duomenų bazė

Lentelė `webhooks` (migracija `011_webhooks.sql`):

| Stulpelis           | Tipas   | Pastabos                                           |
| ------------------- | ------- | -------------------------------------------------- |
| `id`                | TEXT PK | UUID                                               |
| `url`               | TEXT    | Paskirties URL                                     |
| `events`            | TEXT    | JSON masyvas; numatytoji reikšmė `["*"]`           |
| `secret`            | TEXT    | HMAC paslaptis (sugeneruojama, jei nenurodyta)     |
| `enabled`           | INT     | 0/1; numatytoji reikšmė – 1                        |
| `description`       | TEXT    | Neprivaloma žmogui suprantama žyma                 |
| `created_at`        | TEXT    | `datetime('now')`                                  |
| `last_triggered_at` | TEXT    | Atnaujinama per kiekvieną pristatymo bandymą       |
| `last_status`       | INT     | Paskutinio bandymo HTTP būsena (0 = tinklo klaida) |
| `failure_count`     | INT     | Sėkmės atveju nustatoma į 0, nesėkmės atveju +1    |

Pristatymo istorija saugoma specialioje `webhook_deliveries` lentelėje
(migracija `069_webhook_deliveries.sql`, kiekvieno bandymo metu įrašoma per
`src/lib/db/webhookDeliveries.ts::insertDelivery`), kartu su suvestiniais
skaitikliais `webhooks` eilutėje. Tipo metaduomenys (Slack / Discord /
Telegram / pasirinktiniai naudingosios apkrovos transformatoriai) buvo įtraukti migracijoje `070_webhooks_kind_metadata.sql`.

## REST API

Visiems galiniams taškams būtinas valdymo autentifikavimas (`requireManagementAuth`).

| Galinis taškas                  | Metodas | Aprašymas                                        |
| ------------------------------- | ------- | ------------------------------------------------ |
| `/api/webhooks`                 | GET     | Pateikti webhookų sąrašą (paslaptys užmaskuotos) |
| `/api/webhooks`                 | POST    | Sukurti webhooką                                 |
| `/api/webhooks/[id]`            | GET     | Webhooko informacija (visa paslaptis)            |
| `/api/webhooks/[id]`            | PUT     | Atnaujinti laukus                                |
| `/api/webhooks/[id]`            | DELETE  | Pašalinti                                        |
| `/api/webhooks/[id]/test`       | POST    | Išsiųsti `test.ping` (be pakartotinių bandymų)   |
| `/api/webhooks/[id]/deliveries` | GET     | Naujausi vieno webhooko pristatymo bandymai      |
| `/api/webhooks/validate-url`    | POST    | Išankstinis URL tikrinimas (SSRF apsauga)        |

`GET /api/webhooks` užmaskuoja paslaptį kaip `<pirmieji 10 simbolių>...`, kad ji
nebūtų atskleista sąrašų puslapiuose. Kai iš tikrųjų reikia paslapties, naudokite `[id]` GET.

### Webhooko kūrimas

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

Jei `secret` nenurodytas, serveris sugeneruoja `whsec_<hex>` paslaptį ir grąžina
ją atsakyme.

### Webhooko testavimas

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Grąžina `{ delivered, status, error }`. Pakartotinai nebandoma — tai naudinga
norint greitai patikrinti, ar gavėjas priima naudingąją apkrovą ir parašą.

## Valdymo skydelis

Valdymo skydelio puslapyje `/dashboard/webhooks` (žr.
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) galima:

- Kurti ir redaguoti žiniatinklio kablius naudojant įvykių parinkiklį
- Matyti būsenos indikatorių (aktyvus / neaktyvus / su klaida), pagrįstą `enabled`,
  `failure_count` ir `last_status`
- Vienu spustelėjimu atlikti bandomąjį pristatymą
- Rankiniu būdu įjungti arba išjungti

## Naudingosios apkrovos pavyzdžiai

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
    "message": "Bandomasis žiniatinklio kablio pristatymas iš „OmniRoute“",
    "webhookId": "<uuid>"
  }
}
```

Ne `test.ping` įvykių laukų struktūras apibrėžia juos siunčiančios iškvietimo vietos;
`data` objektą laikykite suderinamu su būsimais pakeitimais (pridėkite laukų,
nepasikliaukite jų nebuvimu).

## Geriausios praktikos

- **Tikrinkite kiekvieno pristatymo parašą** pagal neapdorotą užklausos turinį —
  taip išvengsite suklastotų POST užklausų iš asmenų, atspėjusių jūsų žiniatinklio kablio URL.
- **Atsakykite 2xx per maždaug 5 sekundes** — siuntimo mechanizmas nutraukia užklausą
  po 10 s. Lėti gavėjai eikvos pakartotinius bandymus ir didins `failure_count`.
- **Užtikrinkite apdorojimo funkcijų idempotentiškumą** — dėl pakartotinių bandymų ir
  bent vieno pristatymo semantikos galimi dublikatai.
- **Prenumeruokite tik tai, kas būtina** — nurodykite tik tuos įvykius, kuriuos
  iš tikrųjų naudojate; `"*"` didins jūsų nevaldomų gavėjų išlaidas.
- **Stebėkite `failure_count`** — po 10 iš eilės įvykusių klaidų galiniai taškai
  automatiškai išjungiami; pataisę gavėją, nustatykite skaitiklį iš naujo iškviesdami
  `PUT /api/webhooks/[id]` su `enabled: true`.
- **Periodiškai keiskite slaptąsias reikšmes** — naudodami `PUT` nustatykite naują
  `secret`, įdiekite naują reikšmę gavėjo pusėje ir patvirtinkite ją per testavimo galinį tašką.

## Taip pat žr.

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — visa valdymo API sąsaja
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — grandinės pertraukiklio / atvėsimo
  semantika, taikoma teikėjo klaidoms, pateikiamoms per `request.failed`
- Šaltinis: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
