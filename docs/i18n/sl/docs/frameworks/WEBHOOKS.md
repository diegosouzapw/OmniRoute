# Webhooks (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Vir resnice:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Zadnja posodobitev:** 2026-06-28 — v3.8.40

OmniRoute lahko ob dogodkih platforme sproži spletne kavlje HTTP. Uporabite jih za integracijo s storitvami Slack, PagerDuty, Datadog, internimi storitvami za opozarjanje ali katerim koli prejemnikom HTTP.

Razpošiljevalnik vsakokratno dostavo podpiše s HMAC-SHA256, jo ob prehodnih napakah poskusi znova, spremlja uspešnost dostave za vsak spletni kavelj in samodejno onemogoči končne točke, pri katerih se napake ponavljajo.

## Podprti dogodki

Tip `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, ki ga uporablja `src/lib/webhookDispatcher.ts`) trenutno opredeljuje natanko štiri dogodke:

| Dogodek             | Kdaj se sproži                                                               |
| ------------------- | ---------------------------------------------------------------------------- |
| `request.completed` | Posredovana zahteva se uspešno zaključi                                      |
| `request.failed`    | Posredovana zahteva po vseh ponovnih poskusih/nadomestnih možnostih spodleti |
| `quota.exceeded`    | Ključ API preseže prag proračuna/kvote                                       |
| `test.ping`         | Sintetični dogodek, ki ga uporablja preskusna končna točka                   |

Naročnine sprejemajo dobesedno vrednost `"*"` za prejemanje vseh dogodkov. Neznana imena dogodkov v `events` so med razpošiljanjem prezrta.

> Opomba: API razpošiljevalnika je povezan, vendar se produkcijska mesta klicev za nekatere dogodke, ki niso `test.ping`, še vedno uvajajo. Z ukazom `grep dispatchEvent` preverite, katere poti v vaši izdaji trenutno prikličejo razpošiljevalnik.

## Arhitektura

```
Klicatelj (obravnavalnik, storitev, nadzornik)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtriranje po webhook.events
    -> za vsako ujemanje (vzporedno):
       deliverWebhook(url, payload, secret)
         sestavi koristno vsebino { event, timestamp, data }
         podpiši telo s HMAC-SHA256 (če je skrivnost prisotna)
         POST z 10-sekundno časovno omejitvijo
         ob napaki 5xx / omrežni napaki poskusi znova največ 3-krat
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Razpošiljanje je za klicatelja izvedeno po načelu »sproži in pozabi«: `Promise.allSettled` prestreže napake posameznih spletnih kavljev, zato en nedelujoč prejemnik ne more blokirati drugih.

## Podpisovanje HMAC

Ko ima spletni kavelj vrednost `secret`, OmniRoute podpiše telo JSON in pošlje:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <dogodek>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<šestnajstiški HMAC-SHA256(skrivnost, telo)>
```

> Imena glav uporabljajo predpono `X-Webhook-*` (ne `X-OmniRoute-*`). Vrednost podpisa je `sha256=<hex>` — preverite celotno predpono.

Če je `createWebhook` poklican brez skrivnosti, jo modul DB ustvari (`whsec_<48 hex>`), zato so vsi spletni kavlji privzeto podpisani.

### Preverjanje pri prejemniku

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Vedno preverjajte glede na **neobdelano** telo zahteve, preden se izvede kakršno koli razčlenjevanje JSON.

## Pravilnik ponovnih poskusov in napak

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Časovna omejitev 10 sekund za vsak poskus (`AbortController`).
- Odziv HTTP 2xx šteje kot uspeh.
- Odziv HTTP 3xx/4xx šteje kot končno stanje brez ponovnega poskusa — zabeleži se kot dostavljeno
  z `success = res.ok`.
- Pri odzivih HTTP 5xx in omrežnih napakah se poskus ponovi z eksponentnim zakasnjevanjem:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Po `maxRetries` se dostava zabeleži kot neuspešna.
- Vsaka dostava posodobi `last_triggered_at`, `last_status` in bodisi ponastavi
  bodisi poveča `failure_count`.
- Razpošiljevalnik po vsakem razpošiljanju pokliče `disableWebhooksWithHighFailures(10)`,
  zato je vsak webhook z `failure_count >= 10` samodejno onemogočen.

## Podatkovna zbirka

Tabela `webhooks` (migracija `011_webhooks.sql`):

| Stolpec             | Vrsta   | Opombe                                              |
| ------------------- | ------- | --------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                |
| `url`               | TEXT    | Ciljni URL                                          |
| `events`            | TEXT    | Polje JSON; privzeto `["*"]`                        |
| `secret`            | TEXT    | Skrivnost HMAC (samodejno ustvarjena, če ni podana) |
| `enabled`           | INT     | 0/1; privzeto 1                                     |
| `description`       | TEXT    | Neobvezna človeku berljiva oznaka                   |
| `created_at`        | TEXT    | `datetime('now')`                                   |
| `last_triggered_at` | TEXT    | Posodobljeno ob vsakem poskusu dostave              |
| `last_status`       | INT     | Stanje HTTP zadnjega poskusa (0 = omrežje)          |
| `failure_count`     | INT     | Ob uspehu se ponastavi na 0, ob napaki +1           |

Zgodovina dostav se hrani v namenski tabeli `webhook_deliveries`
(migracija `069_webhook_deliveries.sql`, ob vsakem poskusu se zapiše prek
`src/lib/db/webhookDeliveries.ts::insertDelivery`) poleg zbirnih števcev v vrstici
`webhooks`. Metapodatki vrste (Slack / Discord / Telegram / pretvorniki koristne
vsebine po meri) so bili dodani z `070_webhooks_kind_metadata.sql`.

## REST API

Vse končne točke zahtevajo skrbniško avtentikacijo (`requireManagementAuth`).

| Končna točka                    | Metoda | Opis                                             |
| ------------------------------- | ------ | ------------------------------------------------ |
| `/api/webhooks`                 | GET    | Seznam webhookov (skrivnosti so prikrite)        |
| `/api/webhooks`                 | POST   | Ustvari webhook                                  |
| `/api/webhooks/[id]`            | GET    | Podrobnosti webhooka (celotna skrivnost)         |
| `/api/webhooks/[id]`            | PUT    | Posodobi polja                                   |
| `/api/webhooks/[id]`            | DELETE | Odstrani                                         |
| `/api/webhooks/[id]/test`       | POST   | Sproži `test.ping` (brez ponovnih poskusov)      |
| `/api/webhooks/[id]/deliveries` | GET    | Nedavni poskusi dostave za en webhook            |
| `/api/webhooks/validate-url`    | POST   | Predhodno preverjanje URL-ja (zaščita pred SSRF) |

`GET /api/webhooks` prikrije skrivnost v obliki `<prvih 10 znakov>...`, da prepreči
njeno razkritje na straneh s seznami. Ko dejansko potrebujete skrivnost, uporabite
zahtevo GET za `[id]`.

### Ustvarjanje webhooka

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

Če je `secret` izpuščen, strežnik ustvari skrivnost `whsec_<hex>` in jo vrne
v odgovoru.

### Preizkus webhooka

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vrne `{ delivered, status, error }`. Ponovni poskusi se ne izvedejo — uporabno za
hitro preverjanje, ali prejemnik sprejema koristno vsebino in podpis.

## Nadzorna plošča

Stran nadzorne plošče na naslovu `/dashboard/webhooks` (glejte
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) omogoča:

- Ustvarjanje/urejanje webhookov z izbirnikom dogodkov
- Kazalnik stanja (aktivno / neaktivno / napaka) na podlagi `enabled`,
  `failure_count` in `last_status`
- Preskusno dostavo z enim klikom
- Ročni preklop med omogočenim/onemogočenim stanjem

## Primeri koristne vsebine

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
    "message": "Preskusna dostava webhooka iz OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Oblike polj za dogodke, ki niso `test.ping`, določajo mesta klicev, ki jih
oddajajo; objekt `data` obravnavajte kot združljiv za naprej (dodajajte polja in se ne zanašajte na
njihovo odsotnost).

## Najboljše prakse

- **Preverite podpis pri vsaki dostavi** glede na neobdelano telo — s tem preprečite
  ponarejene zahteve POST kogar koli, ki ugane URL vašega webhooka.
- **Odgovorite s stanjem 2xx v približno 5 sekundah** — časovna omejitev razpošiljevalnika je 10 s. Počasni
  prejemniki bodo porabili ponovne poskuse in povečali `failure_count`.
- **Poskrbite, da so obdelovalniki idempotentni** — ponovni poskusi in semantika dostave
  »vsaj enkrat« pomenijo, da so dvojniki mogoči.
- **Naročite se minimalno** — navedite samo dogodke, ki jih dejansko uporabljate; `"*"` bo
  povečal stroške za prejemnike, ki jih ne nadzorujete.
- **Spremljajte `failure_count`** — končne točke se samodejno onemogočijo po 10 zaporednih
  napakah; po odpravi težave s prejemnikom ga ponastavite tako, da pokličete `PUT /api/webhooks/[id]` z `enabled: true`.
- **Redno menjajte skrivnosti** — z zahtevo `PUT` nastavite nov `secret`, uvedite novo vrednost
  pri prejemniku in jo potrdite prek preskusne končne točke.

## Glejte tudi

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — celoten nabor upravljalnega API-ja
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantika odklopnika / obdobja ohlajanja
  za napake ponudnika, prikazane prek `request.failed`
- Izvorna koda: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
