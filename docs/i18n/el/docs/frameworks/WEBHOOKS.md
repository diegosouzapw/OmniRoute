# Webhooks (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Πηγή αλήθειας:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Τελευταία ενημέρωση:** 2026-06-28 — v3.8.40

Το OmniRoute μπορεί να ενεργοποιεί HTTP webhooks σε συμβάντα της πλατφόρμας. Χρησιμοποιήστε τα για ενσωμάτωση με
το Slack, το PagerDuty, το Datadog, εσωτερικές υπηρεσίες ειδοποιήσεων ή οποιονδήποτε δέκτη HTTP.

Ο dispatcher υπογράφει κάθε παράδοση με HMAC-SHA256, επαναλαμβάνει τις προσπάθειες σε παροδικές
αποτυχίες, παρακολουθεί την κατάσταση των παραδόσεων ανά webhook και απενεργοποιεί αυτόματα τα endpoints που
εξακολουθούν να αποτυγχάνουν.

## Υποστηριζόμενα συμβάντα

Ο τύπος `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, ο οποίος χρησιμοποιείται από το `src/lib/webhookDispatcher.ts`) μοντελοποιεί επί του παρόντος ακριβώς τέσσερα συμβάντα:

| Συμβάν              | Ενεργοποιείται όταν                                                          |
| ------------------- | ---------------------------------------------------------------------------- |
| `request.completed` | Ένα αίτημα μέσω proxy ολοκληρώνεται επιτυχώς                                 |
| `request.failed`    | Ένα αίτημα μέσω proxy αποτυγχάνει μετά από όλες τις επαναλήψεις/εναλλακτικές |
| `quota.exceeded`    | Ένα κλειδί API υπερβαίνει ένα όριο προϋπολογισμού/ποσόστωσης                 |
| `test.ping`         | Συνθετικό συμβάν που χρησιμοποιείται από το endpoint δοκιμών                 |

Οι συνδρομές δέχονται τη λεκτική τιμή `"*"` για να λαμβάνουν κάθε συμβάν. Άγνωστα ονόματα συμβάντων
στο `events` αγνοούνται κατά την αποστολή.

> Σημείωση: το API του dispatcher είναι συνδεδεμένο, αλλά τα σημεία κλήσης παραγωγής για ορισμένα από τα
> συμβάντα εκτός του `test.ping` εξακολουθούν να προστίθενται. Ελέγξτε το `grep dispatchEvent` για να δείτε
> ποιες διαδρομές καλούν επί του παρόντος τον dispatcher στην έκδοσή σας.

## Αρχιτεκτονική

```
Καλών (handler, υπηρεσία, monitor)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> φιλτράρισμα βάσει webhook.events
    -> για κάθε αντιστοίχιση (παράλληλα):
       deliverWebhook(url, payload, secret)
         δημιουργία payload { event, timestamp, data }
         υπογραφή body με HMAC-SHA256 (εάν υπάρχει secret)
         POST με χρονικό όριο 10s
         έως 3 επαναλήψεις σε 5xx / σφάλμα δικτύου
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Η αποστολή εκτελείται χωρίς αναμονή για τον καλούντα: το `Promise.allSettled` απορροφά
τα σφάλματα ανά webhook, ώστε ένας προβληματικός δέκτης να μην μπορεί να μπλοκάρει τους υπόλοιπους.

## Υπογραφή HMAC

Όταν ένα webhook διαθέτει `secret`, το OmniRoute υπογράφει το σώμα JSON και αποστέλλει:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Τα ονόματα των headers χρησιμοποιούν το πρόθεμα `X-Webhook-*` (όχι `X-OmniRoute-*`). Η τιμή της υπογραφής
> είναι `sha256=<hex>` — επαληθεύστε ολόκληρο το πρόθεμα.

Εάν η `createWebhook` κληθεί χωρίς secret, το module της βάσης δεδομένων δημιουργεί ένα
(`whsec_<48 hex>`), επομένως όλα τα webhooks υπογράφονται από προεπιλογή.

### Επαλήθευση στον δέκτη

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Να επαληθεύετε πάντα με βάση το **ακατέργαστο** σώμα του αιτήματος, πριν από οποιαδήποτε ανάλυση JSON.

## Πολιτική επαναλήψεων & αποτυχιών

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Χρονικό όριο 10 δευτερολέπτων ανά προσπάθεια (`AbortController`).
- Οι αποκρίσεις HTTP 2xx θεωρούνται επιτυχείς.
- Οι αποκρίσεις HTTP 3xx/4xx θεωρούνται τελικές καταστάσεις χωρίς δυνατότητα επανάληψης — καταγράφονται ως παραδοθείσες
  με `success = res.ok`.
- Οι αποκρίσεις HTTP 5xx και τα σφάλματα δικτύου επαναλαμβάνονται με εκθετική καθυστέρηση:
  `2^attempt * 1000 ms` (1s, 2s, 4s).
- Μετά από `maxRetries`, η παράδοση καταγράφεται ως αποτυχημένη.
- Κάθε παράδοση ενημερώνει τα `last_triggered_at`, `last_status` και είτε μηδενίζει
  είτε αυξάνει το `failure_count`.
- Ο διεκπεραιωτής καλεί το `disableWebhooksWithHighFailures(10)` μετά από κάθε διανομή,
  επομένως οποιοδήποτε webhook με `failure_count >= 10` απενεργοποιείται αυτόματα.

## Βάση δεδομένων

Πίνακας `webhooks` (μετεγκατάσταση `011_webhooks.sql`):

| Στήλη               | Τύπος   | Σημειώσεις                                             |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | URL προορισμού                                         |
| `events`            | TEXT    | Πίνακας JSON· προεπιλογή `["*"]`                       |
| `secret`            | TEXT    | Μυστικό HMAC (δημιουργείται αυτόματα αν δεν δοθεί)     |
| `enabled`           | INT     | 0/1· προεπιλογή το 1                                   |
| `description`       | TEXT    | Προαιρετική αναγνώσιμη ετικέτα                         |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | Ενημερώνεται σε κάθε προσπάθεια παράδοσης              |
| `last_status`       | INT     | Κατάσταση HTTP της τελευταίας προσπάθειας (0 = δίκτυο) |
| `failure_count`     | INT     | Μηδενίζεται σε επιτυχία, +1 σε αποτυχία                |

Το ιστορικό παραδόσεων αποθηκεύεται στον ειδικό πίνακα `webhook_deliveries`
(μετεγκατάσταση `069_webhook_deliveries.sql`, εγγραφή μέσω του
`src/lib/db/webhookDeliveries.ts::insertDelivery` σε κάθε προσπάθεια), επιπλέον
των συγκεντρωτικών μετρητών στη γραμμή του `webhooks`. Τα μεταδεδομένα τύπου (Slack / Discord /
Telegram / προσαρμοσμένοι μετασχηματιστές ωφέλιμου φορτίου) προστέθηκαν από το `070_webhooks_kind_metadata.sql`.

## REST API

Όλα τα τελικά σημεία απαιτούν έλεγχο ταυτότητας διαχείρισης (`requireManagementAuth`).

| Τελικό σημείο                   | Μέθοδος | Περιγραφή                                       |
| ------------------------------- | ------- | ----------------------------------------------- |
| `/api/webhooks`                 | GET     | Παράθεση webhooks (με καλυμμένα μυστικά)        |
| `/api/webhooks`                 | POST    | Δημιουργία webhook                              |
| `/api/webhooks/[id]`            | GET     | Λεπτομέρειες webhook (πλήρες μυστικό)           |
| `/api/webhooks/[id]`            | PUT     | Ενημέρωση πεδίων                                |
| `/api/webhooks/[id]`            | DELETE  | Αφαίρεση                                        |
| `/api/webhooks/[id]/test`       | POST    | Αποστολή ενός `test.ping` (χωρίς επαναλήψεις)   |
| `/api/webhooks/[id]/deliveries` | GET     | Πρόσφατες προσπάθειες παράδοσης για ένα webhook |
| `/api/webhooks/validate-url`    | POST    | Προκαταρκτική επικύρωση URL (προστασία SSRF)    |

Το `GET /api/webhooks` καλύπτει το μυστικό ως `<first 10 chars>...` για την αποφυγή διαρροής
στις σελίδες παράθεσης. Χρησιμοποιήστε το GET του `[id]` όταν χρειάζεστε πραγματικά το μυστικό.

### Δημιουργία webhook

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

Αν το `secret` παραλειφθεί, ο διακομιστής δημιουργεί ένα μυστικό `whsec_<hex>` και το επιστρέφει
στην απόκριση.

### Δοκιμή webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Επιστρέφει `{ delivered, status, error }`. Δεν εκτελούνται επαναλήψεις — χρήσιμο για
τη γρήγορη επαλήθευση ότι ο παραλήπτης αποδέχεται το ωφέλιμο φορτίο και την υπογραφή.

## Πίνακας ελέγχου

Η σελίδα του πίνακα ελέγχου στη διαδρομή `/dashboard/webhooks` (βλ.
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) παρέχει:

- Δημιουργία/επεξεργασία webhooks με επιλογέα συμβάντων
- Ένδειξη κατάστασης (ενεργό / ανενεργό / με σφάλμα) βάσει των `enabled`,
  `failure_count` και `last_status`
- Δοκιμαστική παράδοση με ένα κλικ
- Χειροκίνητη εναλλαγή ενεργοποίησης/απενεργοποίησης

## Παραδείγματα ωφέλιμου φορτίου

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

Η δομή των πεδίων για συμβάντα εκτός του `test.ping` καθορίζεται από τα σημεία κλήσης που τα εκπέμπουν· αντιμετωπίστε το αντικείμενο `data` ως συμβατό προς τα εμπρός (προσθέτετε πεδία, μην βασίζεστε στην απουσία τους).

## Βέλτιστες πρακτικές

- **Επαληθεύετε την υπογραφή σε κάθε παράδοση** έναντι του ανεπεξέργαστου σώματος — αποτρέπει πλαστογραφημένα POST από οποιονδήποτε μαντέψει το URL του webhook σας.
- **Απαντάτε με 2xx εντός ~5 δευτερολέπτων** — ο μηχανισμός αποστολής λήγει μετά από 10 s. Οι αργοί παραλήπτες θα εξαντλούν τις επαναλήψεις και θα αυξάνουν το `failure_count`.
- **Κάντε τους χειριστές ταυτοδύναμους** — οι επαναλήψεις και η σημασιολογία παράδοσης τουλάχιστον μία φορά σημαίνουν ότι ενδέχεται να προκύψουν διπλότυπα.
- **Εγγράφεστε μόνο στα απαραίτητα συμβάντα** — παραθέστε μόνο τα συμβάντα που πράγματι καταναλώνετε· το `"*"` θα προσθέσει κόστος σε παραλήπτες που δεν ελέγχετε.
- **Παρακολουθείτε το `failure_count`** — τα τελικά σημεία απενεργοποιούνται αυτόματα μετά από 10 διαδοχικές αποτυχίες· επαναφέρετέ τα καλώντας `PUT /api/webhooks/[id]` με `enabled: true` αφού διορθώσετε τον παραλήπτη.
- **Εναλλάσσετε τα μυστικά περιοδικά** — εκτελέστε `PUT` με ένα νέο `secret`, αναπτύξτε τη νέα τιμή στον παραλήπτη και επιβεβαιώστε μέσω του δοκιμαστικού τελικού σημείου.

## Δείτε επίσης

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — πλήρης επιφάνεια του API διαχείρισης
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — σημασιολογία διακόπτη κυκλώματος / περιόδου αναμονής
  πίσω από τις αποτυχίες παρόχων που εμφανίζονται μέσω του `request.failed`
- Πηγαίος κώδικας: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
