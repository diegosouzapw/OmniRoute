# Webhooks (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sannhetskilde:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute kan utløse HTTP-webhooks ved plattformhendelser. Bruk dem til å integrere med
Slack, PagerDuty, Datadog, interne varslingstjenester eller en hvilken som helst HTTP-mottaker.

Dispatcher-komponenten signerer hver levering med HMAC-SHA256, prøver på nytt ved midlertidige
feil, sporer leveringsstatusen for hver webhook og deaktiverer automatisk endepunkter som
fortsetter å feile.

## Støttede hendelser

Typen `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, brukt av `src/lib/webhookDispatcher.ts`) modellerer for øyeblikket nøyaktig fire hendelser:

| Hendelse            | Utløses når                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `request.completed` | En videresendt forespørsel fullføres uten feil                              |
| `request.failed`    | En videresendt forespørsel mislykkes etter alle nye forsøk/reserveløsninger |
| `quota.exceeded`    | En API-nøkkel overskrider en budsjett-/kvoteterskel                         |
| `test.ping`         | Syntetisk hendelse som brukes av testendepunktet                            |

Abonnementer godtar den bokstavelige verdien `"*"` for å motta alle hendelser. Ukjente
hendelsesnavn i `events` ignoreres ved utsendelse.

> Merk: Dispatcher-API-et er koblet opp, men produksjonskallestedene for noen av
> hendelsene som ikke er `test.ping`, er fortsatt under innføring. Sjekk `grep dispatchEvent` for å se
> hvilke kodebaner som for øyeblikket kaller dispatcher-komponenten i din utgivelse.

## Arkitektur

```
Kallende part (håndterer, tjeneste, overvåker)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrer etter webhook.events
    -> for hvert treff (parallelt):
       deliverWebhook(url, payload, secret)
         bygg nyttelast { event, timestamp, data }
         signer brødteksten med HMAC-SHA256 (hvis en hemmelighet finnes)
         POST med 10 s tidsavbrudd
         prøv på nytt opptil 3 ganger ved 5xx-feil / nettverksfeil
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Utsendelsen skjer asynkront uten at den kallende parten venter på resultatet: `Promise.allSettled` absorberer
feil per webhook, slik at én defekt mottaker ikke kan blokkere de andre.

## HMAC-signering

Når en webhook har en `secret`, signerer OmniRoute JSON-brødteksten og sender:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <hendelse>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<heksadesimal HMAC-SHA256(secret, brødtekst)>
```

> Topptekstnavn bruker prefikset `X-Webhook-*` (ikke `X-OmniRoute-*`). Signaturverdien
> er `sha256=<hex>` — verifiser hele prefikset.

Hvis `createWebhook` kalles uten en hemmelighet, genererer databasemodulen en
(`whsec_<48 hex>`), slik at alle webhooks signeres som standard.

### Verifisering hos mottakeren

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifiser alltid mot den **rå** forespørselsbrødteksten før JSON-parsing.

## Retningslinjer for nye forsøk og feil

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Tidsavbrudd på 10 sekunder per forsøk (`AbortController`).
- HTTP 2xx regnes som vellykket.
- HTTP 3xx/4xx regnes som en endelig status uten nye forsøk — registrert som levert
  med `success = res.ok`.
- HTTP 5xx og nettverksfeil prøves på nytt med eksponentiell ventetid:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Etter `maxRetries` registreres leveringen som mislykket.
- Hver levering oppdaterer `last_triggered_at`, `last_status` og enten nullstiller
  eller øker `failure_count`.
- Dispatcher-funksjonen kaller `disableWebhooksWithHighFailures(10)` etter hver fan-out,
  slik at alle webhooks med `failure_count >= 10` deaktiveres automatisk.

## Database

Tabellen `webhooks` (migrering `011_webhooks.sql`):

| Kolonne             | Type    | Merknader                                    |
| ------------------- | ------- | -------------------------------------------- |
| `id`                | TEXT PK | UUID                                         |
| `url`               | TEXT    | Destinasjons-URL                             |
| `events`            | TEXT    | JSON-array; standardverdi `["*"]`            |
| `secret`            | TEXT    | HMAC-hemmelighet (autogenerert hvis utelatt) |
| `enabled`           | INT     | 0/1; standardverdi er 1                      |
| `description`       | TEXT    | Valgfri lesbar etikett                       |
| `created_at`        | TEXT    | `datetime('now')`                            |
| `last_triggered_at` | TEXT    | Oppdateres ved hvert leveringsforsøk         |
| `last_status`       | INT     | HTTP-status for siste forsøk (0 = nettverk)  |
| `failure_count`     | INT     | Nullstilles ved suksess, +1 ved feil         |

Leveringshistorikken lagres i den dedikerte tabellen `webhook_deliveries`
(migrering `069_webhook_deliveries.sql`, skrevet via
`src/lib/db/webhookDeliveries.ts::insertDelivery` ved hvert forsøk), i tillegg
til de aggregerte tellerne i `webhooks`-raden. Metadata om type (Slack / Discord /
Telegram / egendefinerte payload-transformatorer) ble lagt til av `070_webhooks_kind_metadata.sql`.

## REST-API

Alle endepunkter krever administrasjonsautentisering (`requireManagementAuth`).

| Endepunkt                       | Metode | Beskrivelse                                  |
| ------------------------------- | ------ | -------------------------------------------- |
| `/api/webhooks`                 | GET    | Vis webhooks (hemmeligheter maskert)         |
| `/api/webhooks`                 | POST   | Opprett webhook                              |
| `/api/webhooks/[id]`            | GET    | Webhook-detaljer (full hemmelighet)          |
| `/api/webhooks/[id]`            | PUT    | Oppdater felter                              |
| `/api/webhooks/[id]`            | DELETE | Fjern                                        |
| `/api/webhooks/[id]/test`       | POST   | Utløs en `test.ping` (ingen nye forsøk)      |
| `/api/webhooks/[id]/deliveries` | GET    | Nylige leveringsforsøk for én webhook        |
| `/api/webhooks/validate-url`    | POST   | Forhåndsvalidering av URL (SSRF-beskyttelse) |

`GET /api/webhooks` maskerer hemmeligheten som `<første 10 tegn>...` for å unngå lekkasje
på listesider. Bruk GET-forespørselen for `[id]` når du faktisk trenger hemmeligheten.

### Opprett webhook

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

Hvis `secret` utelates, genererer serveren en `whsec_<hex>`-hemmelighet og returnerer
den i responsen.

### Test webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Returnerer `{ delivered, status, error }`. Ingen nye forsøk utføres — nyttig for
raskt å kontrollere at mottakeren godtar payloaden og signaturen.

## Kontrollpanel

Kontrollpanelsiden på `/dashboard/webhooks` (se
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) tilbyr:

- Oppretting/redigering av webhooks med en hendelsesvelger
- Statusindikator (aktiv / inaktiv / feil) basert på `enabled`,
  `failure_count` og `last_status`
- Testlevering med ett klikk
- Manuell aktivering/deaktivering

## Eksempler på nyttelast

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
    "message": "Testlevering av webhook fra OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Feltstrukturene for andre hendelser enn `test.ping` defineres av kallestedene som sender
dem. Behandle `data`-objektet som foroverkompatibelt (legg til felt, ikke vær avhengig av
at felt mangler).

## Anbefalte fremgangsmåter

- **Verifiser signaturen ved hver levering** mot den ubehandlede forespørselskroppen — dette hindrer
  forfalskede POST-forespørsler fra hvem som helst som gjetter webhook-URL-en din.
- **Svar med 2xx innen ~5 sekunder** — dispatcheren får tidsavbrudd etter 10 s. Trege
  mottakere vil bruke opp nye forsøk og øke `failure_count`.
- **Gjør behandlerne idempotente** — nye forsøk og leveringssemantikk med minst én levering
  betyr at duplikater kan forekomme.
- **Abonner minimalt** — oppgi bare hendelsene du faktisk bruker. `"*"` vil
  påføre mottakere du ikke kontrollerer ekstra kostnader.
- **Overvåk `failure_count`** — endepunkter deaktiveres automatisk etter 10 påfølgende
  feil. Tilbakestill ved å kalle `PUT /api/webhooks/[id]` med `enabled: true`
  etter at mottakeren er rettet.
- **Roter hemmeligheter regelmessig** — bruk `PUT` for å angi en ny `secret`, distribuer den nye verdien
  til mottakeren, og bekreft via testendepunktet.

## Se også

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — fullstendig administrasjons-API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantikk for effektbryter / nedkjøling
  ved leverandørfeil som eksponeres via `request.failed`
- Kilde: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
