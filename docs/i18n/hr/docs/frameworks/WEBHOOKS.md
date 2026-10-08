# Webhooks (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Izvor istine:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute može slati HTTP webhookove pri događajima na platformi. Upotrijebite ih za integraciju sa
Slackom, PagerDutyjem, Datadogom, internim servisima za upozoravanje ili bilo kojim HTTP primateljem.

Dispečer potpisuje svaku isporuku pomoću HMAC-SHA256, ponavlja pokušaje pri privremenim
pogreškama, prati pouzdanost isporuke za svaki webhook i automatski onemogućuje krajnje točke koje
nastavljaju otkazivati.

## Podržani događaji

Tip `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, koristi ga `src/lib/webhookDispatcher.ts`) trenutačno modelira točno četiri događaja:

| Događaj             | Aktivira se kada                                                            |
| ------------------- | --------------------------------------------------------------------------- |
| `request.completed` | Posredovani zahtjev uspješno završi                                         |
| `request.failed`    | Posredovani zahtjev ne uspije nakon svih ponovnih pokušaja/rezervnih opcija |
| `quota.exceeded`    | API ključ prijeđe prag proračuna/kvote                                      |
| `test.ping`         | Sintetički događaj koji koristi testna krajnja točka                        |

Pretplate prihvaćaju doslovnu vrijednost `"*"` za primanje svakog događaja. Nepoznati nazivi događaja
u `events` zanemaruju se tijekom slanja.

> Napomena: API dispečera je povezan, ali produkcijska mjesta poziva za neke od
> događaja koji nisu `test.ping` još se uvode. Provjerite `grep dispatchEvent` kako biste vidjeli
> koji putovi trenutačno pozivaju dispečer u vašem izdanju.

## Arhitektura

```
Pozivatelj (rukovatelj, servis, nadzornik)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtriranje prema webhook.events
    -> za svako podudaranje (paralelno):
       deliverWebhook(url, payload, secret)
         izradi korisni sadržaj { event, timestamp, data }
         potpiši tijelo s HMAC-SHA256 (ako postoji tajna)
         POST s vremenskim ograničenjem od 10 s
         ponovi do 3 puta pri pogreškama 5xx / mrežnim pogreškama
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Slanje je za pozivatelja tipa „pokreni i zaboravi”: `Promise.allSettled` zanemaruje
pogreške pojedinačnih webhookova kako jedan neispravan primatelj ne bi mogao blokirati ostale.

## Potpisivanje HMAC-om

Kada webhook ima `secret`, OmniRoute potpisuje JSON tijelo i šalje:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <događaj>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<heksadecimalni HMAC-SHA256(tajna, tijelo)>
```

> Nazivi zaglavlja koriste prefiks `X-Webhook-*` (ne `X-OmniRoute-*`). Vrijednost potpisa
> je `sha256=<hex>` — provjerite cijeli prefiks.

Ako se `createWebhook` pozove bez tajne, DB modul generira jednu
(`whsec_<48 hex>`) pa su svi webhookovi prema zadanim postavkama potpisani.

### Provjera na primatelju

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Uvijek provjeravajte prema **sirovom** tijelu zahtjeva, prije bilo kakvog parsiranja JSON-a.

## Pravila ponovnih pokušaja i neuspjeha

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Vremensko ograničenje od 10 sekundi po pokušaju (`AbortController`).
- HTTP 2xx smatra se uspjehom.
- HTTP 3xx/4xx smatra se konačnim statusom bez ponovnog pokušaja — bilježi se kao isporučeno
  uz `success = res.ok`.
- Za HTTP 5xx i mrežne pogreške pokušaj se ponavlja uz eksponencijalno odgađanje:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Nakon `maxRetries`, isporuka se bilježi kao neuspješna.
- Svaka isporuka ažurira `last_triggered_at`, `last_status` te poništava
  ili povećava `failure_count`.
- Dispečer poziva `disableWebhooksWithHighFailures(10)` nakon svakog slanja svim primateljima,
  pa se svaki webhook s `failure_count >= 10` automatski onemogućuje.

## Baza podataka

Tablica `webhooks` (migracija `011_webhooks.sql`):

| Stupac              | Vrsta   | Napomene                                             |
| ------------------- | ------- | ---------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                 |
| `url`               | TEXT    | Odredišni URL                                        |
| `events`            | TEXT    | JSON polje; zadano `["*"]`                           |
| `secret`            | TEXT    | HMAC tajna (automatski generirana ako nije navedena) |
| `enabled`           | INT     | 0/1; zadano 1                                        |
| `description`       | TEXT    | Neobavezna oznaka čitljiva ljudima                   |
| `created_at`        | TEXT    | `datetime('now')`                                    |
| `last_triggered_at` | TEXT    | Ažurira se pri svakom pokušaju isporuke              |
| `last_status`       | INT     | HTTP status posljednjeg pokušaja (0 = mreža)         |
| `failure_count`     | INT     | Vraća se na 0 pri uspjehu, +1 pri neuspjehu          |

Povijest isporuka pohranjuje se u namjenskoj tablici `webhook_deliveries`
(migracija `069_webhook_deliveries.sql`, zapisuje se putem
`src/lib/db/webhookDeliveries.ts::insertDelivery` pri svakom pokušaju), uz
zbirne brojače u retku tablice `webhooks`. Metapodaci o vrsti (Slack / Discord /
Telegram / prilagođeni transformatori korisnog sadržaja) dodani su migracijom `070_webhooks_kind_metadata.sql`.

## REST API

Sve krajnje točke zahtijevaju autentifikaciju za upravljanje (`requireManagementAuth`).

| Krajnja točka                   | Metoda | Opis                                                |
| ------------------------------- | ------ | --------------------------------------------------- |
| `/api/webhooks`                 | GET    | Popis webhookova (tajne su maskirane)               |
| `/api/webhooks`                 | POST   | Stvaranje webhooka                                  |
| `/api/webhooks/[id]`            | GET    | Pojedinosti webhooka (cijela tajna)                 |
| `/api/webhooks/[id]`            | PUT    | Ažuriranje polja                                    |
| `/api/webhooks/[id]`            | DELETE | Uklanjanje                                          |
| `/api/webhooks/[id]/test`       | POST   | Slanje događaja `test.ping` (bez ponovnih pokušaja) |
| `/api/webhooks/[id]/deliveries` | GET    | Nedavni pokušaji isporuke za jedan webhook          |
| `/api/webhooks/validate-url`    | POST   | Prethodna provjera URL-a (zaštita od SSRF-a)        |

`GET /api/webhooks` maskira tajnu u obliku `<prvih 10 znakova>...` kako bi se izbjeglo njezino
otkrivanje na stranicama s popisima. Upotrijebite GET za `[id]` kada vam je tajna doista potrebna.

### Stvaranje webhooka

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

Ako je `secret` izostavljen, poslužitelj generira tajnu `whsec_<hex>` i vraća
je u odgovoru.

### Testiranje webhooka

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vraća `{ delivered, status, error }`. Ne izvode se ponovni pokušaji — korisno za
brzu provjeru prihvaća li primatelj korisni sadržaj i potpis.

## Nadzorna ploča

Stranica nadzorne ploče na `/dashboard/webhooks` (pogledajte
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) omogućuje:

- Stvaranje/uređivanje webhookova s izbornikom događaja
- Pokazatelj statusa (aktivan / neaktivan / s pogreškom) na temelju vrijednosti `enabled`,
  `failure_count` i `last_status`
- Testnu isporuku jednim klikom
- Ručno uključivanje/isključivanje

## Primjeri korisnog sadržaja

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
    "message": "Testna isporuka webhooka iz OmniRoutea",
    "webhookId": "<uuid>"
  }
}
```

Strukture polja za događaje koji nisu `test.ping` definirane su mjestima poziva koja ih
emitiraju; objekt `data` smatrajte kompatibilnim s budućim verzijama (dodajte polja, nemojte se oslanjati na
njihovu odsutnost).

## Najbolje prakse

- **Provjerite potpis pri svakoj isporuci** u odnosu na neobrađeno tijelo — time se sprječavaju
  lažirani POST zahtjevi od bilo koga tko pogodi URL vašeg webhooka.
- **Odgovorite statusom 2xx unutar ~5 sekundi** — dispečer prekida čekanje nakon 10 s. Spori
  primatelji trošit će ponovne pokušaje i povećavati `failure_count`.
- **Učinite rukovatelje idempotentnima** — ponovni pokušaji i semantika isporuke najmanje jednom
  znače da su duplikati mogući.
- **Pretplaćujte se minimalno** — navedite samo događaje koje doista obrađujete; `"*"` će
  povećati troškove na primateljima koje ne kontrolirate.
- **Pratite `failure_count`** — krajnje točke automatski se onemogućuju nakon 10 uzastopnih
  neuspjeha; ponovno ih postavite pozivom `PUT /api/webhooks/[id]` s `enabled: true`
  nakon ispravka primatelja.
- **Povremeno rotirajte tajne** — pošaljite novi `secret` metodom `PUT`, implementirajte novu vrijednost
  na primatelju i potvrdite je putem testne krajnje točke.

## Pogledajte i

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — cjelovito sučelje API-ja za upravljanje
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantika prekidača strujnog kruga / razdoblja čekanja
  iza neuspjeha pružatelja prikazanih putem `request.failed`
- Izvor: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
