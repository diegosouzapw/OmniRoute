# Webhooks (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Sursa adevărului:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute poate declanșa webhook-uri HTTP la apariția evenimentelor platformei. Folosiți-le pentru integrarea cu
Slack, PagerDuty, Datadog, servicii interne de alertare sau orice receptor HTTP.

Dispecerul semnează fiecare livrare cu HMAC-SHA256, reîncearcă în cazul
erorilor tranzitorii, urmărește starea livrărilor pentru fiecare webhook și dezactivează automat endpoint-urile care
continuă să eșueze.

## Evenimente acceptate

Tipul `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, utilizat de `src/lib/webhookDispatcher.ts`) modelează în prezent exact patru evenimente:

| Eveniment           | Se declanșează când                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------- |
| `request.completed` | O solicitare transmisă prin proxy se finalizează cu succes                                |
| `request.failed`    | O solicitare transmisă prin proxy eșuează după toate reîncercările/mecanismele de rezervă |
| `quota.exceeded`    | O cheie API depășește un prag de buget/cotă                                               |
| `test.ping`         | Eveniment sintetic utilizat de endpoint-ul de testare                                     |

Abonamentele acceptă valoarea literală `"*"` pentru a primi fiecare eveniment. Numele de evenimente
necunoscute din `events` sunt ignorate în momentul distribuirii.

> Notă: API-ul dispecerului este conectat, însă punctele de apel din producție pentru unele dintre
> evenimentele diferite de `test.ping` sunt încă în curs de implementare. Verificați `grep dispatchEvent` pentru a vedea
> ce căi invocă în prezent dispecerul în versiunea dvs.

## Arhitectură

```
Apelant (handler, serviciu, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrare după webhook.events
    -> pentru fiecare potrivire (în paralel):
       deliverWebhook(url, payload, secret)
         construiește payload-ul { event, timestamp, data }
         semnează corpul cu HMAC-SHA256 (dacă există un secret)
         POST cu timeout de 10 s
         reîncearcă de până la 3 ori în caz de eroare 5xx / eroare de rețea
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Distribuirea este de tip „declanșează și continuă” pentru apelant: `Promise.allSettled` absoarbe
erorile fiecărui webhook, astfel încât un receptor defect să nu le poată bloca pe celelalte.

## Semnarea HMAC

Când un webhook are un `secret`, OmniRoute semnează corpul JSON și trimite:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Numele anteturilor folosesc prefixul `X-Webhook-*` (nu `X-OmniRoute-*`). Valoarea semnăturii
> este `sha256=<hex>` — verificați prefixul complet.

Dacă `createWebhook` este apelată fără un secret, modulul DB generează unul
(`whsec_<48 hex>`), astfel încât toate webhook-urile sunt semnate în mod implicit.

### Verificarea la receptor

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Verificați întotdeauna folosind corpul **brut** al solicitării, înainte de orice parsare JSON.

## Politica de reîncercare și eșec

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Expirare după 10 secunde pentru fiecare încercare (`AbortController`).
- Un cod HTTP 2xx este considerat succes.
- Un cod HTTP 3xx/4xx este considerat o stare finală fără reîncercare — înregistrată ca livrată
  cu `success = res.ok`.
- Pentru codurile HTTP 5xx și erorile de rețea se efectuează reîncercări cu întârziere exponențială:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- După `maxRetries`, livrarea este înregistrată ca eșuată.
- Fiecare livrare actualizează `last_triggered_at`, `last_status` și fie resetează,
  fie incrementează `failure_count`.
- Dispecerul apelează `disableWebhooksWithHighFailures(10)` după fiecare distribuire,
  astfel încât orice webhook cu `failure_count >= 10` este dezactivat automat.

## Baza de date

Tabelul `webhooks` (migrarea `011_webhooks.sql`):

| Coloană             | Tip     | Note                                                |
| ------------------- | ------- | --------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                |
| `url`               | TEXT    | URL de destinație                                   |
| `events`            | TEXT    | Matrice JSON; implicit `["*"]`                      |
| `secret`            | TEXT    | Secret HMAC (generat automat dacă nu este furnizat) |
| `enabled`           | INT     | 0/1; valoarea implicită este 1                      |
| `description`       | TEXT    | Etichetă opțională                                  |
| `created_at`        | TEXT    | `datetime('now')`                                   |
| `last_triggered_at` | TEXT    | Actualizat la fiecare încercare de livrare          |
| `last_status`       | INT     | Starea HTTP a ultimei încercări (0 = rețea)         |
| `failure_count`     | INT     | Resetat la 0 la succes, +1 la eșec                  |

Istoricul livrărilor este stocat în tabelul dedicat `webhook_deliveries`
(migrarea `069_webhook_deliveries.sql`, scris prin
`src/lib/db/webhookDeliveries.ts::insertDelivery` la fiecare încercare), pe lângă
contoarele agregate din rândul `webhooks`. Metadatele privind tipul (Slack / Discord /
Telegram / transformatoare de sarcini utile personalizate) au fost adăugate prin `070_webhooks_kind_metadata.sql`.

## API REST

Toate punctele finale necesită autentificare de administrare (`requireManagementAuth`).

| Punct final                     | Metodă | Descriere                                         |
| ------------------------------- | ------ | ------------------------------------------------- |
| `/api/webhooks`                 | GET    | Listează webhookurile (secrete mascate)           |
| `/api/webhooks`                 | POST   | Creează un webhook                                |
| `/api/webhooks/[id]`            | GET    | Detaliile webhookului (secret complet)            |
| `/api/webhooks/[id]`            | PUT    | Actualizează câmpurile                            |
| `/api/webhooks/[id]`            | DELETE | Elimină                                           |
| `/api/webhooks/[id]/test`       | POST   | Declanșează un `test.ping` (fără reîncercări)     |
| `/api/webhooks/[id]/deliveries` | GET    | Încercările recente de livrare pentru un webhook  |
| `/api/webhooks/validate-url`    | POST   | Validarea preliminară a URL-ului (protecție SSRF) |

`GET /api/webhooks` maschează secretul ca `<primele 10 caractere>...` pentru a evita
expunerea acestuia în paginile de listare. Utilizați cererea GET pentru `[id]` atunci când aveți efectiv nevoie de secret.

### Crearea unui webhook

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

Dacă `secret` este omis, serverul generează un secret `whsec_<hex>` și îl returnează
în răspuns.

### Testarea unui webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Returnează `{ delivered, status, error }`. Nu se efectuează reîncercări — util pentru
a valida rapid dacă receptorul acceptă sarcina utilă și semnătura.

## Tablou de bord

Pagina tabloului de bord de la `/dashboard/webhooks` (consultați
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) oferă:

- Crearea/editarea webhook-urilor cu un selector de evenimente
- Indicator de stare (activ / inactiv / cu eroare) bazat pe `enabled`,
  `failure_count` și `last_status`
- Livrare de test cu un singur clic
- Comutare manuală între activat/dezactivat

## Exemple de payload-uri

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
    "message": "Livrare webhook de test de la OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Structurile câmpurilor pentru evenimentele diferite de `test.ping` sunt definite de locurile din cod care le emit; considerați obiectul `data` ca fiind compatibil cu versiuni viitoare (adăugați câmpuri, nu vă bazați pe absența lor).

## Bune practici

- **Verificați semnătura la fiecare livrare** folosind corpul brut — acest lucru previne
  solicitările POST falsificate din partea oricui ghicește URL-ul webhook-ului.
- **Răspundeți cu 2xx în aproximativ 5 secunde** — dispecerul expiră după 10 s. Receptorii
  lenți vor consuma reîncercările și vor crește `failure_count`.
- **Creați gestionari idempotenți** — reîncercările și semantica livrării cel puțin o dată
  înseamnă că pot apărea duplicate.
- **Abonați-vă minimal** — enumerați doar evenimentele pe care le consumați efectiv; `"*"` va
  adăuga costuri pentru receptorii pe care nu îi controlați.
- **Monitorizați `failure_count`** — punctele finale sunt dezactivate automat după 10
  eșecuri consecutive; reactivați-le apelând `PUT /api/webhooks/[id]` cu `enabled: true`
  după remedierea receptorului.
- **Rotiți periodic secretele** — trimiteți prin `PUT` un nou `secret`, implementați noua valoare
  pe receptor și confirmați folosind punctul final de testare.

## Consultați și

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — suprafața completă a API-ului de administrare
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — semantica mecanismului circuit breaker / perioadei de așteptare
  din spatele erorilor furnizorilor expuse prin `request.failed`
- Sursă: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
