# Webhooks (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Zdroj pravdy:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute může při událostech platformy odesílat HTTP webhooky. Použijte je k integraci se
Slackem, PagerDuty, Datadogem, interními službami pro upozornění nebo libovolným HTTP přijímačem.

Dispečer podepisuje každé doručení pomocí HMAC-SHA256, při přechodných
selháních opakuje pokusy, sleduje stav doručování jednotlivých webhooků a automaticky zakazuje koncové body,
které opakovaně selhávají.

## Podporované události

Typ `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, používaný v `src/lib/webhookDispatcher.ts`) aktuálně modeluje přesně čtyři události:

| Událost             | Spustí se, když                                                    |
| ------------------- | ------------------------------------------------------------------ |
| `request.completed` | Proxyovaný požadavek je úspěšně dokončen                           |
| `request.failed`    | Proxyovaný požadavek selže po všech opakováních/záložních pokusech |
| `quota.exceeded`    | Klíč API překročí limit rozpočtu/kvóty                             |
| `test.ping`         | Syntetická událost používaná testovacím koncovým bodem             |

Odběry přijímají literál `"*"` pro příjem všech událostí. Neznámé názvy
událostí v `events` jsou při odesílání ignorovány.

> Poznámka: API dispečeru je zapojeno, ale produkční místa volání pro některé
> události jiné než `test.ping` se stále dokončují. Pomocí `grep dispatchEvent` ověřte,
> které cesty aktuálně ve vaší verzi dispečer volají.

## Architektura

```
Volající (obslužná rutina, služba, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrování podle webhook.events
    -> pro každou shodu (paralelně):
       deliverWebhook(url, payload, secret)
         sestavení datové části { event, timestamp, data }
         podepsání těla pomocí HMAC-SHA256 (pokud je secret přítomen)
         POST s časovým limitem 10 s
         až 3 opakované pokusy při chybě 5xx / chybě sítě
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Odesílání je pro volajícího typu „spusť a zapomeň“: `Promise.allSettled` potlačí
chyby jednotlivých webhooků, takže jeden nefunkční přijímač nemůže blokovat ostatní.

## Podepisování pomocí HMAC

Pokud má webhook nastavený `secret`, OmniRoute podepíše tělo JSON a odešle:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Názvy hlaviček používají předponu `X-Webhook-*` (nikoli `X-OmniRoute-*`). Hodnota
> podpisu má tvar `sha256=<hex>` — ověřujte celou hodnotu včetně předpony.

Pokud je `createWebhook` zavolána bez tajného klíče, databázový modul jej vygeneruje
(`whsec_<48 hex>`), takže všechny webhooky jsou ve výchozím nastavení podepsané.

### Ověření na straně přijímače

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Ověření vždy provádějte nad **nezpracovaným** tělem požadavku před jakýmkoli parsováním JSON.

## Zásady opakování a selhání

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Časový limit 10 sekund na každý pokus (`AbortController`).
- HTTP 2xx se považuje za úspěch.
- HTTP 3xx/4xx se považuje za konečný stav bez možnosti opakování — zaznamená se jako doručený
  s hodnotou `success = res.ok`.
- Při HTTP 5xx a síťových chybách se pokus opakuje s exponenciálním prodlužováním čekání:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Po `maxRetries` se doručení zaznamená jako neúspěšné.
- Každé doručení aktualizuje `last_triggered_at`, `last_status` a buď vynuluje,
  nebo zvýší `failure_count`.
- Dispečer po každém hromadném rozeslání volá `disableWebhooksWithHighFailures(10)`,
  takže každý webhook s `failure_count >= 10` se automaticky deaktivuje.

## Databáze

Tabulka `webhooks` (migrace `011_webhooks.sql`):

| Sloupec             | Typ     | Poznámky                                                   |
| ------------------- | ------- | ---------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                       |
| `url`               | TEXT    | Cílová URL                                                 |
| `events`            | TEXT    | Pole JSON; výchozí hodnota `["*"]`                         |
| `secret`            | TEXT    | Tajný klíč HMAC (automaticky generovaný, pokud není zadán) |
| `enabled`           | INT     | 0/1; výchozí hodnota 1                                     |
| `description`       | TEXT    | Volitelný popisek                                          |
| `created_at`        | TEXT    | `datetime('now')`                                          |
| `last_triggered_at` | TEXT    | Aktualizováno při každém pokusu o doručení                 |
| `last_status`       | INT     | Stav HTTP posledního pokusu (0 = síťová chyba)             |
| `failure_count`     | INT     | Při úspěchu se vynuluje, při selhání se zvýší o 1          |

Historie doručení je ukládána ve vyhrazené tabulce `webhook_deliveries`
(migrace `069_webhook_deliveries.sql`, zapisuje se prostřednictvím
`src/lib/db/webhookDeliveries.ts::insertDelivery` při každém pokusu), vedle
souhrnných čítačů v řádku tabulky `webhooks`. Metadata typu (Slack / Discord /
Telegram / vlastní transformátory datové části) byla přidána migrací `070_webhooks_kind_metadata.sql`.

## REST API

Všechny koncové body vyžadují ověření pro správu (`requireManagementAuth`).

| Koncový bod                     | Metoda | Popis                                         |
| ------------------------------- | ------ | --------------------------------------------- |
| `/api/webhooks`                 | GET    | Výpis webhooků (tajné klíče jsou maskovány)   |
| `/api/webhooks`                 | POST   | Vytvoření webhooku                            |
| `/api/webhooks/[id]`            | GET    | Podrobnosti webhooku (úplný tajný klíč)       |
| `/api/webhooks/[id]`            | PUT    | Aktualizace polí                              |
| `/api/webhooks/[id]`            | DELETE | Odstranění                                    |
| `/api/webhooks/[id]/test`       | POST   | Odeslání události `test.ping` (bez opakování) |
| `/api/webhooks/[id]/deliveries` | GET    | Nedávné pokusy o doručení pro jeden webhook   |
| `/api/webhooks/validate-url`    | POST   | Předběžná validace URL (ochrana proti SSRF)   |

`GET /api/webhooks` maskuje tajný klíč na `<prvních 10 znaků>...`, aby se zabránilo jeho
úniku na stránkách s výpisy. Pokud tajný klíč skutečně potřebujete, použijte požadavek
GET na `[id]`.

### Vytvoření webhooku

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Upozornění Slack"
  }'
```

Pokud je `secret` vynechán, server vygeneruje tajný klíč `whsec_<hex>` a vrátí
jej v odpovědi.

### Test webhooku

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Vrací `{ delivered, status, error }`. Neprovádějí se žádné opakované pokusy — to je užitečné
pro rychlé ověření, že příjemce přijímá datovou část a podpis.

## Řídicí panel

Stránka řídicího panelu na adrese `/dashboard/webhooks` (viz
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) umožňuje:

- Vytvářet a upravovat webhooky s výběrem událostí
- Zobrazovat indikátor stavu (aktivní / neaktivní / chybový) založený na `enabled`,
  `failure_count` a `last_status`
- Provést testovací doručení jedním kliknutím
- Ručně zapnout nebo vypnout webhook

## Příklady datové části

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
    "message": "Testovací doručení webhooku z OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Struktury polí pro události jiné než `test.ping` jsou definovány místy volání, která je
generují; s objektem `data` zacházejte jako s dopředně kompatibilním (pole přidávejte,
nespoléhejte na jejich nepřítomnost).

## Doporučené postupy

- **Ověřujte podpis při každém doručení** vůči nezpracovanému tělu požadavku — zabráníte tak
  podvrženým požadavkům POST od kohokoli, kdo uhodne URL vašeho webhooku.
- **Odpovězte stavem 2xx přibližně do 5 sekund** — dispečer požadavek ukončí po 10 s. Pomalí
  příjemci vyčerpají opakované pokusy a zvýší hodnotu `failure_count`.
- **Zajistěte idempotenci obslužných rutin** — opakované pokusy a sémantika doručení
  alespoň jednou znamenají, že se mohou vyskytnout duplicity.
- **Odebírejte pouze nezbytné události** — uvádějte jen události, které skutečně zpracováváte; `"*"`
  zvýší náklady na straně příjemců, které nemáte pod kontrolou.
- **Sledujte `failure_count`** — koncové body se automaticky deaktivují po 10 po sobě jdoucích
  selháních; po opravě příjemce čítač resetujte voláním `PUT /api/webhooks/[id]` s `enabled: true`.
- **Pravidelně obměňujte tajné klíče** — pomocí `PUT` nastavte nový `secret`, nasaďte novou hodnotu
  u příjemce a ověřte ji prostřednictvím testovacího koncového bodu.

## Viz také

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — kompletní rozhraní API pro správu
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — sémantika jističe / doby obnovení
  pro selhání poskytovatelů signalizovaná prostřednictvím `request.failed`
- Zdroj: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
