# Compliance & Audit (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Πηγή αναφοράς:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Τελευταία ενημέρωση:** 2026-06-28 — v3.8.40

Το OmniRoute καταγράφει διαχειριστικές ενέργειες, συμβάντα ελέγχου ταυτότητας, αλλαγές στον κύκλο ζωής των διαπιστευτηρίων παρόχων και κλήσεις εργαλείων MCP σε πίνακες ελέγχου που υποστηρίζονται από SQLite. Αυτή η σελίδα καλύπτει τι καταγράφεται, πού αποθηκεύεται, για πόσο χρονικό διάστημα διατηρείται, πώς τα κλειδιά API μπορούν να εξαιρεθούν και πώς μπορείτε να υποβάλετε ερωτήματα στα δεδομένα.

Η υλοποίηση βρίσκεται στα `src/lib/compliance/index.ts` (T-43 — «Έλεγχοι συμμόρφωσης») και `src/lib/compliance/providerAudit.ts`. Οι εγγραφές ελέγχου δεν δημιουργούν ποτέ εξαιρέσεις: σε περίπτωση οποιασδήποτε αποτυχίας, η κλήση παραβλέπεται σιωπηρά, ώστε η καταγραφή ελέγχου να μην μπορεί να διακόψει την κύρια ροή του αιτήματος.

## Τι καταγράφεται

### Διαχειριστικά συμβάντα ελέγχου (`audit_log`)

Κάθε κλήση της `logAuditEvent({ action, actor, target, details, ... })` παράγει μία γραμμή. Οι συμβολοσειρές ενεργειών ακολουθούν ένα μοτίβο `domain.verb` (ή `domain.verb.outcome`). Οι επιβεβαιωμένοι τύποι ενεργειών στον πηγαίο κώδικα περιλαμβάνουν:

| Ενέργεια                             | Πηγή                                    |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Κάθε καταχώριση αποτυπώνει τα `action`, `actor` (προεπιλογή: `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` και `timestamp`. Τα ευαίσθητα κλειδιά (`apiKey`, `accessToken`, `refreshToken`, `password`, οτιδήποτε αντιστοιχεί στα `*token`/`*secret`/`*apikey` κ.λπ.) αποκρύπτονται αναδρομικά ως `"[redacted]"` πριν από την εγγραφή της γραμμής.

### Κλήσεις εργαλείων MCP (`mcp_tool_audit`)

Κάθε κλήση εργαλείου MCP γράφει μία γραμμή μέσω του `open-sse/mcp-server/audit.ts`. Σχήμα (από το `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Στήλη            | Σημειώσεις                                       |
| ---------------- | ------------------------------------------------ |
| `id`             | αυτόματη προσαύξηση                              |
| `tool_name`      | αναγνωριστικό εργαλείου MCP                      |
| `input_hash`     | sha256 της εισόδου (δεν αποθηκεύεται φορτίο)     |
| `output_summary` | σύντομη, περικομμένη σύνοψη                      |
| `duration_ms`    | πραγματικός χρόνος                               |
| `api_key_id`     | καλών (με δυνατότητα null)                       |
| `success`        | `1` / `0`                                        |
| `error_code`     | τελικός κωδικός σφάλματος σε περίπτωση αποτυχίας |
| `created_at`     | χρονική σήμανση ISO                              |

### Αρχεία καταγραφής αιτημάτων / χρήσης

Πρόκειται για λειτουργική τηλεμετρία (όχι αυστηρά για διαχειριστικό έλεγχο), αλλά χρησιμοποιούν την ίδια διοχέτευση διατήρησης:

- `usage_history` — συγκεντρωτικά δεδομένα χρήσης ανά αίτημα
- `call_logs` — πλήρες αρχείο καταγραφής ανά αίτημα (υπόκειται σε όριο γραμμών, δείτε παρακάτω)
- `proxy_logs` — αρχείο καταγραφής κίνησης διαμεσολαβητή (υπόκειται σε όριο γραμμών)
- `request_detail_logs` — παλαιού τύπου λεπτομερές αρχείο καταγραφής αιτημάτων (εξακολουθεί να εκκαθαρίζεται, εφόσον υπάρχει)

## Σχήμα αποθήκευσης

Ο πίνακας `audit_log` δημιουργείται με αναβλημένο τρόπο από τη `ensureAuditLogSchema()` κατά την πρώτη χρήση:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Δημιουργούνται ευρετήρια στα `timestamp`, `action`, `actor`, `resource_type`,
`status` και `request_id`. Οι στήλες που λείπουν από παλαιότερες βάσεις δεδομένων προστίθενται μέσω
`ALTER TABLE` κατ’ απαίτηση.

## Διατήρηση & Εκκαθάριση

Τηρούνται δύο ξεχωριστά χρονικά παράθυρα διατήρησης:

| Μεταβλητή περιβάλλοντος     | Προεπιλογή | Ισχύει για                                                        |
| --------------------------- | ---------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`        | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`        | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`   | Περικοπή βάσει ορίου γραμμών για το `call_logs`                   |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`   | Περικοπή βάσει ορίου γραμμών για το `proxy_logs`                  |

Η `cleanupExpiredLogs()` εκτελεί τη διαδικασία διατήρησης. Καλείται κατά την εκκίνηση του διακομιστή
από το `src/instrumentation-node.ts`. Κάθε εκτέλεση καταγράφει ένα συμβάν ελέγχου
`compliance.cleanup` με τον αριθμό διαγραφών ανά πίνακα. Η περικοπή των αρχείων καταγραφής proxy/κλήσεων
εκτελείται σε παρτίδες (`BATCH_SIZE = 5000`) για την αποφυγή παρατεταμένων κλειδωμάτων εγγραφής.

Η μη αυτόματη εκκαθάριση του ιστορικού αιτημάτων είναι ξεχωριστή από τη διατήρηση. Η σελίδα Αρχείων Καταγραφής Αιτημάτων
καλεί το `POST /api/settings/purge-request-history`, το οποίο διαγράφει τα `call_logs`,
τα παλαιού τύπου `request_detail_logs` και τα τοπικά τεχνουργήματα αιτημάτων στον κατάλογο
`${DATA_DIR}/call_logs/`.

Οι προεπιλογές ορίζονται στο `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Εξαίρεση `noLog` (ανά κλειδί API)

Τα κλειδιά API μπορούν να επισημανθούν έτσι ώστε να μην καταγράφεται η μεταγενέστερη κίνηση κλήσεών τους. Η
επισήμανση βρίσκεται στον πίνακα `api_keys` (`no_log INTEGER DEFAULT 0`) και αντικατοπτρίζεται
σε ένα σύνολο στη μνήμη για αναζητήσεις σε διαδρομές υψηλής συχνότητας.

```bash
# Δημιουργία κλειδιού χωρίς καταγραφή (απαιτείται έλεγχος ταυτότητας διαχείρισης)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Βοηθητικές συναρτήσεις (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — ενεργοποιεί ή απενεργοποιεί την καταχώριση στη μνήμη
- `isNoLog(apiKeyId)` — ελέγχεται στη διαδρομή του αιτήματος· εναλλακτικά χρησιμοποιεί μια ανάγνωση από το `api_keys.no_log`
  με προσωρινή αποθήκευση 30 s
- `NO_LOG_API_KEY_IDS` (μεταβλητή περιβάλλοντος, με τιμές διαχωρισμένες με κόμματα) — προφορτώνεται στο σύνολο της μνήμης
  κατά την εκκίνηση· χρήσιμο όταν δεν μπορείτε να αλλάξετε απευθείας τη στήλη

Τα συμβάντα διαχειριστικού ελέγχου (σύνδεση, αλλαγές παρόχου, κλήσεις εργαλείων MCP κ.λπ.)
**δεν** επηρεάζονται από το `noLog` — η εξαίρεση αφορά μόνο την καταγραφή κίνησης ανά αίτημα.

## REST API

| Endpoint                    | Μέθοδος | Περιγραφή                                              | Έλεγχος ταυτότητας |
| --------------------------- | ------- | ------------------------------------------------------ | ------------------ |
| `/api/compliance/audit-log` | `GET`   | Σελιδοποιημένες εγγραφές ελέγχου διαχειριστή με φίλτρα | management         |
| `/api/mcp/audit`            | `GET`   | Σελιδοποιημένες εγγραφές ελέγχου εργαλείων MCP         | (open-sse)         |
| `/api/mcp/audit/stats`      | `GET`   | Συγκεντρωτικά στατιστικά ελέγχου MCP                   | (open-sse)         |

Προς το παρόν δεν παρέχεται endpoint εξαγωγής CSV — πραγματοποιήστε εξαγωγή από τον πίνακα ελέγχου ή υποβάλετε απευθείας ερώτημα
στη βάση δεδομένων SQLite.

### Υποβολή ερωτημάτων στο `/api/compliance/audit-log`

Υποστηριζόμενες παράμετροι ερωτήματος (όλες προαιρετικές, όλες χρησιμοποιούν αντιστοίχιση `LIKE %value%` για
φίλτρα κειμένου):

- `action`, `actor`, `target`, `resourceType` (ή `resource_type`),
  `status`, `requestId` (ή `request_id`)
- `from` / `since`, `to` / `until` — χρονικές σημάνσεις ISO
- `limit` (προεπιλογή `50`, ελάχιστο `1`, μέγιστο `500`)
- `offset` (προεπιλογή `0`, μέγιστο `10_000`)

Η απόκριση είναι ένας πίνακας JSON. Τα μεταδεδομένα σελιδοποίησης επιστρέφονται στις κεφαλίδες:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Πίνακας ελέγχου

Ο πίνακας ελέγχου εμφανίζει τα δεδομένα ελέγχου στη διεύθυνση **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Η σελίδα διαθέτει δύο καρτέλες:

- **Συμμόρφωση** (`ComplianceTab.tsx`) — συμβάντα ελέγχου διαχειριστή από το
  `/api/compliance/audit-log`. Φιλτράρισμα κατά τύπο συμβάντος, σοβαρότητα (ενημερωτικό / προειδοποίηση
  / κρίσιμο, που προκύπτει από την ενέργεια + κατάσταση) και εύρος ημερομηνιών. Η σοβαρότητα
  υπολογίζεται στην πλευρά του προγράμματος-πελάτη από τις συμβολοσειρές ενέργειας/κατάστασης.
- **MCP** (`McpAuditTab.tsx`) — έλεγχος εργαλείων MCP από το `/api/mcp/audit`, με
  φίλτρα κατά όνομα εργαλείου και επιτυχία/αποτυχία.

Και οι δύο καρτέλες χρησιμοποιούν σελιδοποίηση με μεγέθη σελίδας `50` (συμμόρφωση) και `25` (MCP).

## Βοηθητικές συναρτήσεις διαπιστευτηρίων παρόχου

Το `src/lib/compliance/providerAudit.ts` παρέχει βοηθητικές συναρτήσεις διαμόρφωσης που χρησιμοποιούνται από τις
διαδρομές διαχείρισης παρόχων όταν εκπέμπουν συμβάντα διαπιστευτηρίων:

- `summarizeProviderConnectionForAudit(connection)` — αφαιρεί τα `apiKey`,
  `accessToken`, `refreshToken`, `idToken` και
  `providerSpecificData.consoleApiKey` πριν εγγραφεί το στιγμιότυπο της σύνδεσης στο
  `details`.
- `getProviderAuditTarget(connection)` — συνθέτει μια σταθερή συμβολοσειρά
  `"<provider>:<name|id>"` για το πεδίο `target`.
- `extractProviderWarnings(...payloads)` — σαρώνει τις αποκρίσεις παρόχων για
  προειδοποιήσεις πολιτικής/ασφάλειας (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) και
  εμφανίζει έως 5 αποτελέσματα, καθένα περικομμένο στους 400 χαρακτήρες.

## Βέλτιστες πρακτικές

- Επισημάνετε τα κλειδιά API που διαχειρίζονται προσωπικά αναγνωρίσιμα στοιχεία (νομικά, ιατρικά κ.λπ.) με `noLog: true`.
- Προσαρμόστε τα `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` ώστε να ανταποκρίνονται στην
  πολιτική διατήρησής σας. Οι προεπιλεγμένες 7 ημέρες αποτελούν συντηρητική επιλογή.
- Εξαγάγετε τον πίνακα ελέγχου εκτός πλατφόρμας (`sqlite3 dump`) με όποια συχνότητα
  απαιτεί το πρόγραμμα συμμόρφωσής σας — δεν υπάρχει ενσωματωμένη αρχειοθέτηση.
- Παρακολουθείτε τις μετρήσεις `auth.login.failed` και `auth.login.locked` για τον
  εντοπισμό επιθέσεων εξαντλητικής αναζήτησης.
- Κατά την προσθήκη νέων endpoint διαχειριστή, καλέστε το `logAuditEvent({ ... })` με μια σταθερή
  συμβολοσειρά ενέργειας `domain.verb.outcome` και μεταβιβάστε το περιβάλλον του αιτήματος μέσω του
  `getAuditRequestContext(request)`, ώστε η διεύθυνση IP και το `requestId` να καταγράφονται
  αυτόματα.

## Δείτε επίσης

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — απόκρυψη PII, έγχυση προτροπών
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — κατάλογος εργαλείων MCP και πεδία εφαρμογής
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — πλήρης αναφορά μεταβλητών περιβάλλοντος
- Πηγαίος κώδικας: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
