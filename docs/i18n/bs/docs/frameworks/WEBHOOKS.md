# WEBHOOKS (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

# Webhooks

> **Izvor istine:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute može aktivirati HTTP webhooks na događaje platforme. Koristite ih za integraciju sa Slack-om, PagerDuty-jem, Datadog-om, internim servisima za obavještavanje ili bilo kojim HTTP primaocem.

Dispatcher potpisuje svaku isporuku sa HMAC-SHA256, ponovo pokušava u slučaju prolaznih grešaka, prati zdravlje isporuke po webhook-u i automatski onemogućava krajnje tačke koje nastavljaju da ne uspijevaju.

## Podržani događaji

Tip `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, koji koristi `src/lib/webhookDispatcher.ts`) trenutno modelira tačno četiri događaja:

| Događaj             | Aktivira se kada                                          |
| ------------------- | --------------------------------------------------------- |
| `request.completed` | Proksirani zahtjev se uspješno završi                     |
| `request.failed`    | Proksirani zahtjev ne uspije nakon svih pokušaja/povratka |
| `quota.exceeded`    | API ključ pređe prag budžeta/kvote                        |
| `test.ping`         | Sintetički događaj koji koristi testna krajnja tačka      |

Pretplate prihvataju literal `"*"` za primanje svakog događaja. Nepoznata imena događaja u `events` se ignorišu u trenutku slanja.

> Napomena: dispatcher API je povezan, ali produkcijske lokacije poziva za neke od događaja koji nisu `test.ping` još uvijek pristižu. Provjerite `grep dispatchEvent` da vidite koje putanje trenutno pozivaju dispatcher u vašem izdanju.

## Arhitektura

```
Caller (handler, service, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filter by webhook.events
    -> for each match (in parallel):
       deliverWebhook(url, payload, secret)
         build payload { event, timestamp, data }
         sign body with HMAC-SHA256 (if secret present)
         POST with 10s timeout
         retry up to 3 times on 5xx / network error
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Slanje (Dispatch) je tipa fire-and-forget za pozivaoca: `Promise.allSettled` guta greške po webhook-u tako da jedan loš primalac ne može blokirati ostale.

## HMAC potpisivanje

Kada webhook ima `secret`, OmniRoute potpisuje JSON tijelo i šalje:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Nazivi zaglavlja koriste `X-Webhook-*` prefiks (ne `X-OmniRoute-*`). Vrijednost potpisa je `sha256=<hex>` — verifikujte puni prefiks.

Ako se `createWebhook` pozove bez tajne, DB modul generiše jednu (`whsec_<48 hex>`) tako da su svi webhook-ovi podrazumijevano potpisani.

### Verifikacija na primaocu

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Uvijek verifikujte protiv **sirovog** (raw) tijela zahtjeva, prije bilo kakvog JSON parsiranja.

## Politika ponovnih pokušaja i neuspjeha

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Vremensko ograničenje od 10 sekundi po pokušaju (`AbortController`).
- HTTP 2xx se računa kao uspjeh.
- HTTP 3xx/4xx se računa kao konačni status koji se ne ponavlja — zabilježeno kao isporučeno sa `success = res.ok`.
- HTTP 5xx i mrežne greške se ponavljaju uz eksponencijalno čekanje (backoff): `2^attempt * 1000 ms` (1s, 2s, 4s).
- Nakon `maxRetries`, isporuka se bilježi kao neuspjela.
- Svaka isporuka ažurira `last_triggered_at`, `last_status`, i ili resetuje ili povećava `failure_count`.
- Dispečer poziva `disableWebhooksWithHighFailures(10)` nakon svakog fan-out-a, tako da se svaki webhook sa `failure_count >= 10` automatski onemogućava.

## Baza podataka

Tabela `webhooks` (migracija `011_webhooks.sql`):

| Kolona              | Tip     | Napomene                                             |
| ------------------- | ------- | ---------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                 |
| `url`               | TEXT    | Odredišni URL                                        |
| `events`            | TEXT    | JSON niz; podrazumijevano `["*"]`                    |
| `secret`            | TEXT    | HMAC tajna (automatski generisana ako nije navedena) |
| `enabled`           | INT     | 0/1; podrazumijevano 1                               |
| `description`       | TEXT    | Opcionalna ljudska oznaka                            |
| `created_at`        | TEXT    | `datetime('now')`                                    |
| `last_triggered_at` | TEXT    | Ažurirano pri svakom pokušaju isporuke               |
| `last_status`       | INT     | HTTP status posljednjeg pokušaja (0 = mreža)         |
| `failure_count`     | INT     | Resetuje se na 0 pri uspjehu, +1 pri neuspjehu       |

Istorija isporuke se čuva u namjenskoj tabeli `webhook_deliveries`
(migracija `069_webhook_deliveries.sql`, zapisuje se putem
`src/lib/db/webhookDeliveries.ts::insertDelivery` pri svakom pokušaju), pored
zbirnih brojača u redu `webhooks`. Metapodaci o vrsti (Slack / Discord /
Telegram / prilagođeni transformatori payload-a) dodati su migracijom
`070_webhooks_kind_metadata.sql`.

## REST API

Svi endpointi zahtijevaju upravljačku autorizaciju (`requireManagementAuth`).

| Endpoint                        | Metoda | Opis                                        |
| ------------------------------- | ------ | ------------------------------------------- |
| `/api/webhooks`                 | GET    | Lista webhook-ova (tajne maskirane)         |
| `/api/webhooks`                 | POST   | Kreiraj webhook                             |
| `/api/webhooks/[id]`            | GET    | Detalji webhook-a (puna tajna)              |
| `/api/webhooks/[id]`            | PUT    | Ažuriraj polja                              |
| `/api/webhooks/[id]`            | DELETE | Ukloni                                      |
| `/api/webhooks/[id]/test`       | POST   | Pokreni `test.ping` (bez ponovnih pokušaja) |
| `/api/webhooks/[id]/deliveries` | GET    | Nedavni pokušaji isporuke za jedan webhook  |
| `/api/webhooks/validate-url`    | POST   | Pre-flight validacija URL-a (SSRF zaštita)  |

`GET /api/webhooks` maskira tajnu u `<first 10 chars>...` kako bi se izbjeglo
curenje na stranicama sa listama. Koristite `[id]` GET kada vam je zaista
potrebna tajna.

### Kreiranje webhook-a

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

Ako je `secret` izostavljen, server generiše `whsec_<hex>` tajnu i vraća je u
odgovoru.

### Testiranje webhook-a

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vraća `{ delivered, status, error }`. Ne pokušavaju se ponovni pokušaji —
korisno za brzu provjeru da li primalac prihvata payload i potpis.

## Kontrolna ploča

Stranica kontrolne ploče na `/dashboard/webhooks` (pogledajte `src/app/(dashboard)/dashboard/webhooks/page.tsx`) omogućava:

- Kreiranje/uređivanje webhookova pomoću birača događaja
- Indikator statusa (aktivan / neaktivan / greška) na osnovu `enabled`, `failure_count` i `last_status`
- Testna isporuka jednim klikom
- Ručni prekidač za omogućavanje/onemogućavanje

## Primjeri payload-a

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

Strukture polja za događaje koji nisu `test.ping` definirane su pozivnim mjestima koja ih emitiraju; tretirajte `data` objekt kao unaprijed kompatibilan (dodajte polja, ne oslanjajte se na odsustvo).

## Najbolje prakse

- **Provjerite potpis pri svakoj isporuci** u odnosu na neobrađeno tijelo (raw body) — sprječava lažne POST zahtjeve od bilo koga ko pogodi vaš webhook URL.
- **Odgovorite sa 2xx unutar ~5 sekundi** — dispečer prekida vezu nakon 10 s. Spori primaoci će trošiti ponovne pokušaje i povećavati `failure_count`.
- **Učinite rukovaoce idempotentnim** — ponovni pokušaji i semantika isporuke "barem jednom" znače da su duplikati mogući.
- **Pretplatite se minimalno** — navedite samo događaje koje zaista konzumirate; `"*"` će dodati trošak primaocima koje ne kontrolišete.
- **Pratite `failure_count`** — krajnje tačke se automatski onemogućavaju nakon 10 uzastopnih neuspjeha; resetujte pozivom `PUT /api/webhooks/[id]` sa `enabled: true` nakon popravke primaoca.
- **Periodično rotirajte tajne (secrets)** — `PUT`-ujte novu `secret` vrijednost, primijenite novu vrijednost na primaoca i potvrdite putem testne krajnje tačke.

## Pogledajte također

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — puna površina API-ja za upravljanje
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantika circuit breaker-a / hlađenja (cooldown) iza neuspjeha provajdera koji se pojavljuju putem `request.failed`
- Izvor: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
