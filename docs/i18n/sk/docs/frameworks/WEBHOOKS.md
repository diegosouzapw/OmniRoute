# Webhooks (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Zdroj pravdy:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute môže pri udalostiach platformy odosielať webhooky HTTP. Použite ich na integráciu so službami Slack, PagerDuty, Datadog, internými službami upozornení alebo ľubovoľným prijímačom HTTP.

Dispečer podpisuje každé doručenie pomocou HMAC-SHA256, opakuje pokusy pri dočasných zlyhaniach, sleduje stav doručovania jednotlivých webhookov a automaticky deaktivuje koncové body, ktoré opakovane zlyhávajú.

## Podporované udalosti

Typ `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, používaný súborom `src/lib/webhookDispatcher.ts`) v súčasnosti modeluje presne štyri udalosti:

| Udalosť             | Spustí sa, keď                                                       |
| ------------------- | -------------------------------------------------------------------- |
| `request.completed` | Proxy požiadavka sa úspešne dokončí                                  |
| `request.failed`    | Proxy požiadavka zlyhá po všetkých opakovaniach/náhradných postupoch |
| `quota.exceeded`    | Kľúč API prekročí prah rozpočtu/kvóty                                |
| `test.ping`         | Syntetická udalosť používaná testovacím koncovým bodom               |

Odbery prijímajú literál `"*"` na prijímanie každej udalosti. Neznáme názvy udalostí v `events` sa počas odosielania ignorujú.

> Poznámka: API dispečera je zapojené, ale produkčné miesta volania pre niektoré
> udalosti iné ako `test.ping` sa ešte stále dopĺňajú. Pomocou `grep dispatchEvent`
> skontrolujte, ktoré cesty vo vašom vydaní aktuálne volajú dispečer.

## Architektúra

```
Volajúci (obslužná rutina, služba, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrovanie podľa webhook.events
    -> pre každú zhodu (paralelne):
       deliverWebhook(url, payload, secret)
         zostavenie dát { event, timestamp, data }
         podpísanie tela pomocou HMAC-SHA256 (ak je prítomný secret)
         POST s časovým limitom 10 s
         až 3 opakované pokusy pri chybe 5xx alebo chybe siete
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Odosielanie je pre volajúceho typu „spusti a zabudni“: `Promise.allSettled` potlačí chyby jednotlivých webhookov, takže jeden nefunkčný prijímač nemôže blokovať ostatné.

## Podpisovanie HMAC

Ak má webhook hodnotu `secret`, OmniRoute podpíše telo JSON a odošle:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Názvy hlavičiek používajú predponu `X-Webhook-*` (nie `X-OmniRoute-*`). Hodnota
> podpisu je `sha256=<hex>` — overujte celú hodnotu vrátane predpony.

Ak sa `createWebhook` zavolá bez tajného kľúča, modul DB ho vygeneruje
(`whsec_<48 hex>`), takže všetky webhooky sú predvolene podpísané.

### Overenie na strane prijímača

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Overenie vždy vykonávajte voči **surovému** telu požiadavky, ešte pred akýmkoľvek spracovaním JSON.

## Zásady opakovania a zlyhania

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Časový limit 10 sekúnd na každý pokus (`AbortController`).
- HTTP 2xx sa považuje za úspech.
- HTTP 3xx/4xx sa považuje za konečný stav bez opakovania — zaznamená sa ako doručený
  s hodnotou `success = res.ok`.
- Pri HTTP 5xx a sieťových chybách sa pokus zopakuje s exponenciálnym oneskorením:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Po `maxRetries` sa doručenie zaznamená ako neúspešné.
- Každé doručenie aktualizuje `last_triggered_at`, `last_status` a buď vynuluje,
  alebo zvýši `failure_count`.
- Dispečer po každom hromadnom rozoslaní zavolá `disableWebhooksWithHighFailures(10)`,
  takže každý webhook s `failure_count >= 10` sa automaticky deaktivuje.

## Databáza

Tabuľka `webhooks` (migrácia `011_webhooks.sql`):

| Stĺpec              | Typ     | Poznámky                                                     |
| ------------------- | ------- | ------------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                         |
| `url`               | TEXT    | Cieľová URL                                                  |
| `events`            | TEXT    | Pole JSON; predvolená hodnota `["*"]`                        |
| `secret`            | TEXT    | Tajný kľúč HMAC (automaticky vygenerovaný, ak nie je zadaný) |
| `enabled`           | INT     | 0/1; predvolená hodnota je 1                                 |
| `description`       | TEXT    | Voliteľný zrozumiteľný názov                                 |
| `created_at`        | TEXT    | `datetime('now')`                                            |
| `last_triggered_at` | TEXT    | Aktualizuje sa pri každom pokuse o doručenie                 |
| `last_status`       | INT     | Stav HTTP posledného pokusu (0 = sieť)                       |
| `failure_count`     | INT     | Pri úspechu sa vynuluje, pri zlyhaní sa zvýši o 1            |

História doručení sa okrem súhrnných počítadiel v riadku tabuľky `webhooks`
ukladá do vyhradenej tabuľky `webhook_deliveries`
(migrácia `069_webhook_deliveries.sql`, pri každom pokuse sa zapisuje prostredníctvom
`src/lib/db/webhookDeliveries.ts::insertDelivery`). Metadáta typu (Slack / Discord /
Telegram / vlastné transformátory dát) boli pridané migráciou `070_webhooks_kind_metadata.sql`.

## REST API

Všetky koncové body vyžadujú overenie pre správu (`requireManagementAuth`).

| Koncový bod                     | Metóda | Popis                                        |
| ------------------------------- | ------ | -------------------------------------------- |
| `/api/webhooks`                 | GET    | Zoznam webhookov (tajné kľúče sú maskované)  |
| `/api/webhooks`                 | POST   | Vytvorenie webhooku                          |
| `/api/webhooks/[id]`            | GET    | Podrobnosti webhooku (úplný tajný kľúč)      |
| `/api/webhooks/[id]`            | PUT    | Aktualizácia polí                            |
| `/api/webhooks/[id]`            | DELETE | Odstránenie                                  |
| `/api/webhooks/[id]/test`       | POST   | Odoslanie `test.ping` (bez opakovaní)        |
| `/api/webhooks/[id]/deliveries` | GET    | Nedávne pokusy o doručenie pre jeden webhook |
| `/api/webhooks/validate-url`    | POST   | Predbežné overenie URL (ochrana proti SSRF)  |

`GET /api/webhooks` maskuje tajný kľúč vo formáte `<prvých 10 znakov>...`, aby sa zabránilo
jeho úniku na stránkach so zoznamom. Keď tajný kľúč skutočne potrebujete, použite
požiadavku GET na `[id]`.

### Vytvorenie webhooku

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

Ak je `secret` vynechaný, server vygeneruje tajný kľúč `whsec_<hex>` a vráti
ho v odpovedi.

### Testovanie webhooku

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vráti `{ delivered, status, error }`. Nevykonávajú sa žiadne opakované pokusy — je to užitočné
na rýchle overenie, či príjemca akceptuje dáta a podpis.

## Ovládací panel

Stránka ovládacieho panela na adrese `/dashboard/webhooks` (pozri
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) poskytuje:

- Vytváranie a úpravu webhookov s výberom udalostí
- Indikátor stavu (aktívny / neaktívny / chybový) založený na `enabled`,
  `failure_count` a `last_status`
- Testovacie doručenie jedným kliknutím
- Manuálne zapnutie/vypnutie

## Príklady dátovej časti

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
    "message": "Testovacie doručenie webhooku zo služby OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Štruktúry polí pre udalosti iné než `test.ping` sú definované miestami volania,
ktoré ich vysielajú; objekt `data` považujte za dopredne kompatibilný (polia
pridávajte, nespoliehajte sa na ich neprítomnosť).

## Osvedčené postupy

- **Overujte podpis pri každom doručení** voči nespracovanému telu požiadavky —
  zabráni sa tým podvrhnutým požiadavkám POST od kohokoľvek, kto uhádne URL
  vášho webhooku.
- **Odpovedzte stavom 2xx približne do 5 sekúnd** — časový limit dispečera je
  10 s. Pomalí príjemcovia vyčerpajú opakované pokusy a zvýšia
  `failure_count`.
- **Zaistite idempotentnosť obslužných funkcií** — opakované pokusy a sémantika
  doručenia aspoň raz znamenajú, že sa môžu vyskytnúť duplikáty.
- **Prihlasujte sa len na nevyhnutné udalosti** — uveďte iba udalosti, ktoré
  skutočne spracúvate; `"*"` zvýši náklady príjemcov, ktorých nemáte pod
  kontrolou.
- **Sledujte `failure_count`** — koncové body sa automaticky vypnú po 10 po sebe
  idúcich zlyhaniach; po oprave príjemcu ich znova aktivujte zavolaním
  `PUT /api/webhooks/[id]` s `enabled: true`.
- **Pravidelne meňte tajné kľúče** — pomocou `PUT` nastavte nový `secret`,
  nasaďte novú hodnotu na strane príjemcu a overte ju prostredníctvom
  testovacieho koncového bodu.

## Pozri tiež

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — úplný rozsah API na správu
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — sémantika ističa / čakacej
  lehoty pri zlyhaniach poskytovateľa, ktoré sa zobrazujú prostredníctvom `request.failed`
- Zdroj: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
