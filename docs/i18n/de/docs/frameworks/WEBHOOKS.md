# Webhooks (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Verbindliche Quelle:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute kann bei Plattformereignissen HTTP-Webhooks auslösen. Verwenden Sie diese zur Integration mit Slack, PagerDuty, Datadog, internen Benachrichtigungsdiensten oder beliebigen HTTP-Empfängern.

Der Dispatcher signiert jede Zustellung mit HMAC-SHA256, wiederholt Zustellversuche bei vorübergehenden Fehlern, überwacht den Zustellungsstatus jedes Webhooks und deaktiviert Endpunkte automatisch, wenn diese wiederholt fehlschlagen.

## Unterstützte Ereignisse

Der Typ `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, verwendet von `src/lib/webhookDispatcher.ts`) bildet derzeit genau vier Ereignisse ab:

| Ereignis            | Wird ausgelöst, wenn                                                                  |
| ------------------- | ------------------------------------------------------------------------------------- |
| `request.completed` | Eine weitergeleitete Anfrage erfolgreich abgeschlossen wird                           |
| `request.failed`    | Eine weitergeleitete Anfrage nach allen Wiederholungs-/Fallback-Versuchen fehlschlägt |
| `quota.exceeded`    | Ein API-Schlüssel einen Budget-/Kontingentschwellenwert überschreitet                 |
| `test.ping`         | Ein synthetisches Ereignis vom Testendpunkt verwendet wird                            |

Abonnements akzeptieren das Literal `"*"`, um jedes Ereignis zu empfangen. Unbekannte Ereignisnamen in `events` werden beim Dispatch ignoriert.

> Hinweis: Die Dispatcher-API ist angebunden, aber die Produktionsaufrufe für einige der
> Ereignisse außer `test.ping` werden noch implementiert. Prüfen Sie mit `grep dispatchEvent`,
> welche Pfade den Dispatcher in Ihrer Version derzeit aufrufen.

## Architektur

```
Aufrufer (Handler, Dienst, Monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> nach webhook.events filtern
    -> für jeden Treffer (parallel):
       deliverWebhook(url, payload, secret)
         Nutzlast { event, timestamp, data } erstellen
         Body mit HMAC-SHA256 signieren (falls ein Secret vorhanden ist)
         POST mit 10-s-Zeitüberschreitung
         bei 5xx-/Netzwerkfehlern bis zu 3-mal wiederholen
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Der Dispatch erfolgt aus Sicht des Aufrufers nach dem Fire-and-Forget-Prinzip: `Promise.allSettled` fängt Fehler einzelner Webhooks ab, sodass ein fehlerhafter Empfänger die anderen nicht blockieren kann.

## HMAC-Signierung

Wenn ein Webhook über ein `secret` verfügt, signiert OmniRoute den JSON-Body und sendet:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <Ereignis>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(Secret, Body)>
```

> Die Header-Namen verwenden das Präfix `X-Webhook-*` (nicht `X-OmniRoute-*`). Der Signaturwert
> lautet `sha256=<hex>` — überprüfen Sie das vollständige Präfix.

Wenn `createWebhook` ohne Secret aufgerufen wird, generiert das DB-Modul eines (`whsec_<48 hex>`), sodass standardmäßig alle Webhooks signiert werden.

### Überprüfung auf der Empfängerseite

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Überprüfen Sie die Signatur immer anhand des **unverarbeiteten** Anfrage-Bodys, bevor Sie JSON parsen.

## Richtlinie für Wiederholungsversuche und Fehler

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Zeitüberschreitung von 10 Sekunden pro Versuch (`AbortController`).
- HTTP 2xx gilt als Erfolg.
- HTTP 3xx/4xx gilt als nicht wiederholbarer endgültiger Status — wird als zugestellt aufgezeichnet,
  wobei `success = res.ok` gilt.
- Bei HTTP 5xx und Netzwerkfehlern erfolgen Wiederholungsversuche mit exponentiellem Backoff:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Nach `maxRetries` wird die Zustellung als fehlgeschlagen aufgezeichnet.
- Jede Zustellung aktualisiert `last_triggered_at`, `last_status` und setzt
  `failure_count` entweder zurück oder erhöht den Wert.
- Der Dispatcher ruft nach jedem Fan-out `disableWebhooksWithHighFailures(10)` auf,
  sodass jeder Webhook mit `failure_count >= 10` automatisch deaktiviert wird.

## Datenbank

Tabelle `webhooks` (Migration `011_webhooks.sql`):

| Spalte              | Typ     | Hinweise                                                        |
| ------------------- | ------- | --------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                            |
| `url`               | TEXT    | Ziel-URL                                                        |
| `events`            | TEXT    | JSON-Array; Standardwert `["*"]`                                |
| `secret`            | TEXT    | HMAC-Secret (wird automatisch generiert, falls nicht angegeben) |
| `enabled`           | INT     | 0/1; Standardwert ist 1                                         |
| `description`       | TEXT    | Optionale menschenlesbare Bezeichnung                           |
| `created_at`        | TEXT    | `datetime('now')`                                               |
| `last_triggered_at` | TEXT    | Wird bei jedem Zustellungsversuch aktualisiert                  |
| `last_status`       | INT     | HTTP-Status des letzten Versuchs (0 = Netzwerk)                 |
| `failure_count`     | INT     | Wird bei Erfolg auf 0 zurückgesetzt, bei Fehler um 1 erhöht     |

Der Zustellungsverlauf wird zusätzlich zu den aggregierten Zählern in der
`webhooks`-Zeile in der dedizierten Tabelle `webhook_deliveries` gespeichert
(Migration `069_webhook_deliveries.sql`, bei jedem Versuch über
`src/lib/db/webhookDeliveries.ts::insertDelivery` geschrieben).
Metadaten zum Typ (Slack-/Discord-/Telegram-/benutzerdefinierte Payload-Transformer)
wurden durch `070_webhooks_kind_metadata.sql` hinzugefügt.

## REST-API

Alle Endpunkte erfordern eine Verwaltungs-Authentifizierung (`requireManagementAuth`).

| Endpunkt                        | Methode | Beschreibung                                       |
| ------------------------------- | ------- | -------------------------------------------------- |
| `/api/webhooks`                 | GET     | Webhooks auflisten (Secrets maskiert)              |
| `/api/webhooks`                 | POST    | Webhook erstellen                                  |
| `/api/webhooks/[id]`            | GET     | Webhook-Details (vollständiges Secret)             |
| `/api/webhooks/[id]`            | PUT     | Felder aktualisieren                               |
| `/api/webhooks/[id]`            | DELETE  | Entfernen                                          |
| `/api/webhooks/[id]/test`       | POST    | `test.ping` auslösen (keine Wiederholungsversuche) |
| `/api/webhooks/[id]/deliveries` | GET     | Letzte Zustellungsversuche für einen Webhook       |
| `/api/webhooks/validate-url`    | POST    | Vorabvalidierung der URL (SSRF-Schutz)             |

`GET /api/webhooks` maskiert das Secret als `<erste 10 Zeichen>...`, um eine
Offenlegung auf Übersichtsseiten zu vermeiden. Verwenden Sie den GET-Endpunkt
`[id]`, wenn Sie das Secret tatsächlich benötigen.

### Webhook erstellen

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack-Benachrichtigungen"
  }'
```

Wenn `secret` ausgelassen wird, generiert der Server ein Secret im Format
`whsec_<hex>` und gibt es in der Antwort zurück.

### Webhook testen

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Gibt `{ delivered, status, error }` zurück. Es werden keine Wiederholungsversuche
durchgeführt — dies ist nützlich, um schnell zu prüfen, ob der Empfänger die
Payload und die Signatur akzeptiert.

## Dashboard

Die Dashboard-Seite unter `/dashboard/webhooks` (siehe
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) bietet:

- Erstellen/Bearbeiten von Webhooks mit einer Ereignisauswahl
- Statusanzeige (aktiv / inaktiv / fehlerhaft) basierend auf `enabled`,
  `failure_count` und `last_status`
- Testzustellung mit einem Klick
- Manuelles Aktivieren/Deaktivieren

## Payload-Beispiele

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

Die Feldstrukturen für Ereignisse außer `test.ping` werden durch die Aufrufstellen definiert, die
sie auslösen; behandeln Sie das `data`-Objekt als vorwärtskompatibel (Felder hinzufügen, nicht auf
deren Abwesenheit verlassen).

## Bewährte Vorgehensweisen

- **Überprüfen Sie die Signatur bei jeder Zustellung** anhand des unveränderten Bodys — dies verhindert
  gefälschte POST-Anfragen von Personen, die Ihre Webhook-URL erraten.
- **Antworten Sie innerhalb von ~5 Sekunden mit 2xx** — beim Dispatcher tritt nach 10 s ein Timeout auf. Langsame
  Empfänger verbrauchen Wiederholungsversuche und erhöhen `failure_count`.
- **Gestalten Sie Handler idempotent** — Wiederholungsversuche und die Semantik einer mindestens einmaligen Zustellung
  bedeuten, dass Duplikate möglich sind.
- **Abonnieren Sie nur das Nötigste** — führen Sie nur Ereignisse auf, die Sie tatsächlich verarbeiten; `"*"` verursacht
  zusätzliche Kosten bei Empfängern, die Sie nicht kontrollieren.
- **Überwachen Sie `failure_count`** — Endpunkte werden nach 10 aufeinanderfolgenden
  Fehlern automatisch deaktiviert; setzen Sie den Zähler zurück, indem Sie nach der Fehlerbehebung beim Empfänger
  `PUT /api/webhooks/[id]` mit `enabled: true` aufrufen.
- **Rotieren Sie Secrets regelmäßig** — übertragen Sie ein neues `secret` per `PUT`, stellen Sie den neuen Wert
  beim Empfänger bereit und bestätigen Sie ihn über den Testendpunkt.

## Siehe auch

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — vollständige Verwaltungs-API
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — Semantik von Circuit Breaker / Cooldown
  bei Provider-Fehlern, die über `request.failed` gemeldet werden
- Quelle: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
