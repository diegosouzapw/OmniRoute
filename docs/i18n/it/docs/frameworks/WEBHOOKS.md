# Webhooks (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Fonte autorevole:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute può attivare webhook HTTP in risposta agli eventi della piattaforma. Usali per l'integrazione con
Slack, PagerDuty, Datadog, servizi interni di avviso o qualsiasi endpoint HTTP.

Il dispatcher firma ogni invio con HMAC-SHA256, effettua nuovi tentativi in caso di errori
temporanei, monitora lo stato di ogni webhook e disabilita automaticamente gli endpoint che
continuano a non rispondere correttamente.

## Eventi supportati

Il tipo `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, utilizzato da `src/lib/webhookDispatcher.ts`) attualmente modella esattamente quattro eventi:

| Evento              | Si attiva quando                                                                       |
| ------------------- | -------------------------------------------------------------------------------------- |
| `request.completed` | Una richiesta inoltrata tramite proxy viene completata                                 |
| `request.failed`    | Una richiesta inoltrata tramite proxy non riesce dopo tutti i nuovi tentativi/fallback |
| `quota.exceeded`    | Una chiave API supera una soglia di budget/quota                                       |
| `test.ping`         | Evento sintetico utilizzato dall'endpoint di test                                      |

Le sottoscrizioni accettano il valore letterale `"*"` per ricevere ogni evento. I nomi di eventi
sconosciuti in `events` vengono ignorati al momento del dispatch.

> Nota: l'API del dispatcher è collegata, ma i punti di chiamata in produzione per alcuni degli
> eventi diversi da `test.ping` sono ancora in fase di integrazione. Controlla `grep dispatchEvent` per vedere
> quali percorsi invocano attualmente il dispatcher nella tua release.

## Architettura

```
Chiamante (handler, servizio, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtra per webhook.events
    -> per ogni corrispondenza (in parallelo):
       deliverWebhook(url, payload, secret)
         crea il payload { event, timestamp, data }
         firma il corpo con HMAC-SHA256 (se il secret è presente)
         POST con timeout di 10 s
         effettua fino a 3 tentativi in caso di errore 5xx / di rete
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Per il chiamante, il dispatch avviene in modalità fire-and-forget: `Promise.allSettled` assorbe
gli errori dei singoli webhook, in modo che un destinatario non funzionante non possa bloccare gli altri.

## Firma HMAC

Quando un webhook ha un `secret`, OmniRoute firma il corpo JSON e invia:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <evento>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<HMAC-SHA256 esadecimale(secret, corpo)>
```

> I nomi delle intestazioni utilizzano il prefisso `X-Webhook-*` (non `X-OmniRoute-*`). Il valore
> della firma è `sha256=<hex>` — verifica il prefisso completo.

Se `createWebhook` viene chiamato senza un secret, il modulo DB ne genera uno
(`whsec_<48 hex>`), quindi tutti i webhook sono firmati per impostazione predefinita.

### Verifica sul destinatario

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verifica sempre rispetto al corpo **raw** della richiesta, prima di qualsiasi parsing JSON.

## Criteri per tentativi e fallimenti

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Timeout di 10 secondi per ogni tentativo (`AbortController`).
- Una risposta HTTP 2xx è considerata un successo.
- Una risposta HTTP 3xx/4xx è considerata uno stato finale non ripetibile — viene registrata come consegnata
  con `success = res.ok`.
- Le risposte HTTP 5xx e gli errori di rete vengono ritentati con backoff esponenziale:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Dopo `maxRetries`, la consegna viene registrata come fallita.
- Ogni consegna aggiorna `last_triggered_at`, `last_status` e azzera oppure incrementa
  `failure_count`.
- Il dispatcher chiama `disableWebhooksWithHighFailures(10)` dopo ogni distribuzione,
  quindi qualsiasi webhook con `failure_count >= 10` viene disabilitato automaticamente.

## Database

Tabella `webhooks` (migrazione `011_webhooks.sql`):

| Colonna             | Tipo    | Note                                               |
| ------------------- | ------- | -------------------------------------------------- |
| `id`                | TEXT PK | UUID                                               |
| `url`               | TEXT    | URL di destinazione                                |
| `events`            | TEXT    | Array JSON; valore predefinito `["*"]`             |
| `secret`            | TEXT    | Segreto HMAC (generato automaticamente se omesso)  |
| `enabled`           | INT     | 0/1; valore predefinito 1                          |
| `description`       | TEXT    | Etichetta descrittiva facoltativa                  |
| `created_at`        | TEXT    | `datetime('now')`                                  |
| `last_triggered_at` | TEXT    | Aggiornato a ogni tentativo di consegna            |
| `last_status`       | INT     | Stato HTTP dell'ultimo tentativo (0 = rete)        |
| `failure_count`     | INT     | Azzerato in caso di successo, +1 in caso di errore |

La cronologia delle consegne viene salvata nella tabella dedicata `webhook_deliveries`
(migrazione `069_webhook_deliveries.sql`, scritta tramite
`src/lib/db/webhookDeliveries.ts::insertDelivery` a ogni tentativo), oltre
ai contatori aggregati nella riga di `webhooks`. I metadati relativi al tipo (Slack / Discord /
Telegram / trasformatori di payload personalizzati) sono stati aggiunti da `070_webhooks_kind_metadata.sql`.

## API REST

Tutti gli endpoint richiedono l'autenticazione di gestione (`requireManagementAuth`).

| Endpoint                        | Metodo | Descrizione                                        |
| ------------------------------- | ------ | -------------------------------------------------- |
| `/api/webhooks`                 | GET    | Elenca i webhook (segreti mascherati)              |
| `/api/webhooks`                 | POST   | Crea un webhook                                    |
| `/api/webhooks/[id]`            | GET    | Dettagli del webhook (segreto completo)            |
| `/api/webhooks/[id]`            | PUT    | Aggiorna i campi                                   |
| `/api/webhooks/[id]`            | DELETE | Rimuove                                            |
| `/api/webhooks/[id]/test`       | POST   | Invia un `test.ping` (senza nuovi tentativi)       |
| `/api/webhooks/[id]/deliveries` | GET    | Tentativi di consegna recenti per un webhook       |
| `/api/webhooks/validate-url`    | POST   | Validazione preliminare dell'URL (protezione SSRF) |

`GET /api/webhooks` maschera il segreto come `<primi 10 caratteri>...` per evitarne
la divulgazione nelle pagine di elenco. Usa la richiesta GET a `[id]` quando hai effettivamente bisogno del segreto.

### Creare un webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Avvisi Slack"
  }'
```

Se `secret` viene omesso, il server genera un segreto `whsec_<hex>` e lo restituisce
nella risposta.

### Testare un webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Restituisce `{ delivered, status, error }`. Non viene effettuato alcun nuovo tentativo — utile per
verificare rapidamente che il destinatario accetti il payload e la firma.

## Dashboard

La pagina della dashboard all'indirizzo `/dashboard/webhooks` (vedere
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) consente di:

- Creare/modificare webhook con un selettore di eventi
- Visualizzare l'indicatore di stato (attivo / inattivo / in errore) in base a `enabled`,
  `failure_count` e `last_status`
- Eseguire una consegna di test con un clic
- Attivare/disattivare manualmente i webhook

## Esempi di payload

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
    "message": "Consegna webhook di test da OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

La struttura dei campi per gli eventi diversi da `test.ping` è definita dai punti di chiamata che li emettono; considerare l'oggetto `data` compatibile con evoluzioni future (accettare campi aggiuntivi, senza fare affidamento sulla loro assenza).

## Procedure consigliate

- **Verificare la firma a ogni consegna** rispetto al corpo non elaborato — impedisce
  POST contraffatti da parte di chiunque riesca a indovinare l'URL del webhook.
- **Rispondere con 2xx entro ~5 secondi** — il dispatcher scade dopo 10 s. I
  destinatari lenti consumeranno i tentativi e faranno aumentare `failure_count`.
- **Rendere i gestori idempotenti** — i nuovi tentativi e la semantica di consegna
  almeno una volta implicano la possibilità di duplicati.
- **Sottoscrivere solo gli eventi necessari** — elencare solo gli eventi effettivamente utilizzati; `"*"`
  aumenterà il carico sui destinatari non controllati direttamente.
- **Monitorare `failure_count`** — gli endpoint vengono disabilitati automaticamente dopo 10
  errori consecutivi; reimpostarli chiamando `PUT /api/webhooks/[id]` con `enabled: true`
  dopo aver corretto il destinatario.
- **Ruotare periodicamente i segreti** — inviare tramite `PUT` un nuovo `secret`, distribuire il nuovo valore
  al destinatario e verificarlo tramite l'endpoint di test.

## Vedere anche

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — superficie completa dell'API di gestione
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantica di circuit breaker / cooldown
  relativa agli errori dei provider esposti tramite `request.failed`
- Sorgente: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
