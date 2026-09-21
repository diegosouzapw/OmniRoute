# Webhooks (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Bron van waarheid:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute kan HTTP-webhooks activeren bij platformgebeurtenissen. Gebruik ze om te integreren met
Slack, PagerDuty, Datadog, interne waarschuwingsservices of een andere HTTP-ontvanger.

De dispatcher ondertekent elke aflevering met HMAC-SHA256, probeert opnieuw bij tijdelijke
fouten, houdt de afleveringsstatus per webhook bij en schakelt eindpunten die
blijven mislukken automatisch uit.

## Ondersteunde gebeurtenissen

Het type `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, gebruikt door `src/lib/webhookDispatcher.ts`) modelleert momenteel precies vier gebeurtenissen:

| Gebeurtenis         | Wordt geactiveerd wanneer                                        |
| ------------------- | ---------------------------------------------------------------- |
| `request.completed` | Een geproxiede aanvraag met succes wordt voltooid                |
| `request.failed`    | Een geproxiede aanvraag na alle nieuwe pogingen/fallback mislukt |
| `quota.exceeded`    | Een API-sleutel een budget-/quotalimiet overschrijdt             |
| `test.ping`         | Synthetische gebeurtenis gebruikt door het testeindpunt          |

Abonnementen accepteren de letterlijke waarde `"*"` om elke gebeurtenis te ontvangen. Onbekende
gebeurtenisnamen in `events` worden tijdens de dispatch genegeerd.

> Opmerking: de dispatcher-API is aangesloten, maar productie-aanroepen voor sommige
> andere gebeurtenissen dan `test.ping` worden nog toegevoegd. Gebruik `grep dispatchEvent` om te zien
> welke paden de dispatcher momenteel aanroepen in jouw release.

## Architectuur

```
Aanroeper (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filteren op webhook.events
    -> voor elke overeenkomst (parallel):
       deliverWebhook(url, payload, secret)
         payload { event, timestamp, data } opbouwen
         body ondertekenen met HMAC-SHA256 (als een secret aanwezig is)
         POST met een time-out van 10 s
         maximaal 3 keer opnieuw proberen bij 5xx-/netwerkfout
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Dispatch wordt voor de aanroeper op de achtergrond uitgevoerd zonder erop te wachten: `Promise.allSettled` onderdrukt
fouten per webhook, zodat één defecte ontvanger de andere niet kan blokkeren.

## HMAC-ondertekening

Wanneer een webhook een `secret` heeft, ondertekent OmniRoute de JSON-body en verzendt het:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Headernamen gebruiken het voorvoegsel `X-Webhook-*` (niet `X-OmniRoute-*`). De waarde van de
> handtekening is `sha256=<hex>` — verifieer het volledige voorvoegsel.

Als `createWebhook` zonder een secret wordt aangeroepen, genereert de DB-module er een
(`whsec_<48 hex>`), zodat alle webhooks standaard worden ondertekend.

### Verificatie aan de kant van de ontvanger

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifieer altijd aan de hand van de **onbewerkte** requestbody, voordat de JSON wordt geparseerd.

## Beleid voor nieuwe pogingen en fouten

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Time-out van 10 seconden per poging (`AbortController`).
- HTTP 2xx geldt als geslaagd.
- HTTP 3xx/4xx geldt als een definitieve status waarvoor geen nieuwe poging wordt gedaan — geregistreerd als afgeleverd
  met `success = res.ok`.
- Bij HTTP 5xx en netwerkfouten worden nieuwe pogingen gedaan met exponentiële back-off:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Na `maxRetries` wordt de aflevering als mislukt geregistreerd.
- Elke aflevering werkt `last_triggered_at`, `last_status` bij en stelt
  `failure_count` opnieuw in of verhoogt deze.
- De dispatcher roept `disableWebhooksWithHighFailures(10)` aan na elke fan-out,
  zodat elke webhook met `failure_count >= 10` automatisch wordt uitgeschakeld.

## Database

Tabel `webhooks` (migratie `011_webhooks.sql`):

| Kolom               | Type    | Opmerkingen                                                 |
| ------------------- | ------- | ----------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                        |
| `url`               | TEXT    | Bestemmings-URL                                             |
| `events`            | TEXT    | JSON-array; standaard `["*"]`                               |
| `secret`            | TEXT    | HMAC-geheim (automatisch gegenereerd indien niet opgegeven) |
| `enabled`           | INT     | 0/1; standaard 1                                            |
| `description`       | TEXT    | Optioneel, door mensen leesbaar label                       |
| `created_at`        | TEXT    | `datetime('now')`                                           |
| `last_triggered_at` | TEXT    | Bijgewerkt bij elke afleverpoging                           |
| `last_status`       | INT     | HTTP-status van de laatste poging (0 = netwerk)             |
| `failure_count`     | INT     | Opnieuw ingesteld op 0 bij succes, +1 bij mislukking        |

De aflevergeschiedenis wordt opgeslagen in de speciale tabel `webhook_deliveries`
(migratie `069_webhook_deliveries.sql`, bij elke poging geschreven via
`src/lib/db/webhookDeliveries.ts::insertDelivery`), naast de geaggregeerde
tellers in de rij van `webhooks`. Metadata over het type (Slack / Discord /
Telegram / aangepaste payloadtransformaties) is toegevoegd door `070_webhooks_kind_metadata.sql`.

## REST-API

Alle endpoints vereisen beheer-authenticatie (`requireManagementAuth`).

| Endpoint                        | Methode | Beschrijving                                     |
| ------------------------------- | ------- | ------------------------------------------------ |
| `/api/webhooks`                 | GET     | Webhooks weergeven (geheimen gemaskeerd)         |
| `/api/webhooks`                 | POST    | Webhook maken                                    |
| `/api/webhooks/[id]`            | GET     | Webhookdetails (volledig geheim)                 |
| `/api/webhooks/[id]`            | PUT     | Velden bijwerken                                 |
| `/api/webhooks/[id]`            | DELETE  | Verwijderen                                      |
| `/api/webhooks/[id]/test`       | POST    | Een `test.ping` activeren (geen nieuwe pogingen) |
| `/api/webhooks/[id]/deliveries` | GET     | Recente afleverpogingen voor één webhook         |
| `/api/webhooks/validate-url`    | POST    | Voorafgaande URL-validatie (SSRF-beveiliging)    |

`GET /api/webhooks` maskeert het geheim als `<eerste 10 tekens>...` om lekken
op overzichtspagina's te voorkomen. Gebruik de GET-aanvraag voor `[id]` wanneer u het geheim daadwerkelijk nodig hebt.

### Webhook maken

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack-meldingen"
  }'
```

Als `secret` wordt weggelaten, genereert de server een `whsec_<hex>`-geheim en retourneert
dit in het antwoord.

### Webhook testen

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Retourneert `{ delivered, status, error }`. Er worden geen nieuwe pogingen gedaan — handig om
snel te controleren of de ontvanger de payload en handtekening accepteert.

## Dashboard

De dashboardpagina op `/dashboard/webhooks` (zie
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) biedt:

- Webhooks maken/bewerken met een gebeurteniskiezer
- Statusindicator (actief / inactief / fout opgetreden) op basis van `enabled`,
  `failure_count` en `last_status`
- Testlevering met één klik
- Handmatig in-/uitschakelen

## Voorbeelden van payloads

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

De veldstructuren voor andere gebeurtenissen dan `test.ping` worden gedefinieerd door de aanroeplocaties die
ze verzenden; behandel het `data`-object als voorwaarts compatibel (voeg velden toe, ga niet uit van
hun afwezigheid).

## Aanbevolen werkwijzen

- **Verifieer bij elke levering de handtekening** aan de hand van de onbewerkte body — dit voorkomt
  vervalste POST-verzoeken van iedereen die uw webhook-URL raadt.
- **Antwoord binnen circa 5 seconden met 2xx** — de dispatcher krijgt na 10 s een time-out. Trage
  ontvangers verbruiken nieuwe pogingen en verhogen `failure_count`.
- **Maak handlers idempotent** — nieuwe pogingen en leveringssemantiek waarbij minstens één levering wordt gegarandeerd,
  betekenen dat duplicaten mogelijk zijn.
- **Abonneer u zo beperkt mogelijk** — vermeld alleen gebeurtenissen die u daadwerkelijk verwerkt; `"*"` brengt
  kosten met zich mee voor ontvangers waarover u geen controle hebt.
- **Bewaak `failure_count`** — eindpunten worden na 10 opeenvolgende
  fouten automatisch uitgeschakeld; stel dit opnieuw in door `PUT /api/webhooks/[id]` aan te roepen met `enabled: true`
  nadat de ontvanger is hersteld.
- **Roteer geheimen periodiek** — voer een `PUT` uit met een nieuw `secret`, implementeer de nieuwe waarde
  op de ontvanger en bevestig dit via het testeindpunt.

## Zie ook

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — volledig oppervlak van de beheer-API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantiek voor circuitonderbreking / afkoelperiode
  achter providerfouten die via `request.failed` zichtbaar worden gemaakt
- Bron: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
