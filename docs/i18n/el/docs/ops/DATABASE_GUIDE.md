# Database Schema & Operations Guide (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Εν συντομία**: Το OmniRoute χρησιμοποιεί το **SQLite με καταγραφή WAL** ως κύριο χώρο αποθήκευσης, με κρυπτογράφηση **AES-256-GCM** για ευαίσθητα πεδία σε κατάσταση αδράνειας. Αυτός ο οδηγός καλύπτει το σχήμα, τις μετεγκαταστάσεις, τη δημιουργία αντιγράφων ασφαλείας/ανάκτηση και τα επιχειρησιακά εγχειρίδια.

**Πηγές:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 βασικοί πίνακες)
- `src/lib/db/migrationRunner.ts` — μετεγκαταστάσεις με εκδόσεις
- `src/lib/db/migrations/` — 167 αρχεία SQL με εκδόσεις
- `src/lib/db/encryption.ts` — βοηθητικές συναρτήσεις κρυπτογράφησης
- `src/lib/db/backup.ts` — εξαγωγή/εισαγωγή αντιγράφων ασφαλείας
- `src/lib/db/healthCheck.ts` — διαγνωστικοί έλεγχοι εύρυθμης λειτουργίας

---

## Γιατί SQLite;

Το OmniRoute επέλεξε το SQLite αντί για PostgreSQL/MySQL για διάφορους λόγους:

| Παράγοντας              | SQLite                                            | PostgreSQL                                      |
| ----------------------- | ------------------------------------------------- | ----------------------------------------------- |
| **Ανάπτυξη**            | Ενσωματωμένο — χωρίς ξεχωριστό διακομιστή         | Απαιτεί ρύθμιση διακομιστή                      |
| **Κρυπτογράφηση**       | Σε επίπεδο εφαρμογής (AES-256-GCM)                | Ενσωματωμένο TDE                                |
| **Απόδοση**             | Ταχύτερο για μικρούς/μεσαίους φόρτους εργασίας    | Καλύτερο για τεράστιο όγκο ταυτόχρονων εγγραφών |
| **Ταυτοχρονισμός**      | Η λειτουργία WAL επιτρέπει ταυτόχρονες αναγνώσεις | Πλήρες MVCC                                     |
| **Αντίγραφα ασφαλείας** | Αντιγραφή ενός αρχείου                            | `pg_dump` ή στιγμιότυπο συστήματος αρχείων      |
| **Περίπτωση χρήσης**    | Εγκατάσταση ανά χρήστη, ενσωματωμένο              | SaaS πολλαπλών μισθωτών                         |

Για αναπτύξεις **ενός χρήστη και μίας παρουσίας** (η κύρια περίπτωση χρήσης του OmniRoute), το SQLite είναι απλούστερο και ταχύτερο.

### Καταγραφή WAL

Το `core.ts` ανοίγει τη βάση δεδομένων σε **λειτουργία WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

Το WAL επιτρέπει **ταυτόχρονες αναγνώσεις** κατά τη διάρκεια εγγραφών — κάτι σημαντικό για τον πίνακα ελέγχου, ο οποίος εκτελεί ερωτήματα ενώ καταγράφονται αιτήματα.

Το προεπιλεγμένο μέγεθος κρυφής μνήμης είναι **65.536 KiB (64 MiB)**. Το SQLite ερμηνεύει ένα αρνητικό
`cache_size` ως κατά προσέγγιση ανώτατο όριο σε KiB και εκχωρεί σελίδες κατ’ απαίτηση.
Η επιλογή **Ρυθμίσεις > Σύστημα & Αποθήκευση > Μέγεθος κρυφής μνήμης** δέχεται ακέραιες τιμές από **1 έως
1.000.000 KiB**· η αποθήκευση της ρύθμισης την εφαρμόζει στην ενεργή σύνδεση της βάσης δεδομένων,
και το OmniRoute επαναφέρει τη διατηρημένη τιμή κατά την εκκίνηση.

---

## Θέση βάσης δεδομένων

Το αρχείο SQLite αποθηκεύεται στη θέση:

| Λειτουργικό σύστημα | Διαδρομή                                                      |
| ------------------- | ------------------------------------------------------------- |
| Linux               | `~/.omniroute/storage.sqlite`                                 |
| macOS               | `~/.omniroute/storage.sqlite`                                 |
| Windows             | `%USERPROFILE%\.omniroute\storage.sqlite`                     |
| Docker              | `/app/data/storage.sqlite` (διαμορφώσιμο μέσω του `DATA_DIR`) |

Συνοδευτικά αρχεία:

- `storage.sqlite-wal` — αρχείο καταγραφής προεγγραφής
- `storage.sqlite-shm` — αρχείο κοινόχρηστης μνήμης
- `call_logs/` — τεχνουργήματα ωφέλιμου φορτίου αιτημάτων (εάν είναι ενεργοποιημένα)

**Παράκαμψη της θέσης:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Αρχιτεκτονική Μονάδων Τομέα

Η βάση δεδομένων του OmniRoute διαθέτει **110 μονάδες TypeScript ανώτατου επιπέδου** στο `src/lib/db/`. Κάθε μονάδα τομέα:

- Διαχειρίζεται έναν ή περισσότερους συγκεκριμένους πίνακες
- Εξάγει συναρτήσεις CRUD με τύπους
- Δεν προσπελαύνει ποτέ τους πίνακες άλλης μονάδας
- Χρησιμοποιεί τη `getDbInstance()` από το `core.ts` για πρόσβαση στη βάση δεδομένων

### Οι 110 Μονάδες Βάσης Δεδομένων Ανώτατου Επιπέδου

Το OmniRoute διαθέτει **110 αρχεία TypeScript ανώτατου επιπέδου** στο `src/lib/db/`. Παρακάτω παρατίθεται ένα δείγμα των βασικών μονάδων· ανατρέξτε στη λίστα του καταλόγου για την πλήρη λίστα:

| Μονάδα                  | Πίνακες                                                        | Αρμοδιότητα                                                                                |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Καταχώριση παρόχων και διαπιστευτήρια μέσω OAuth/κλειδιού API                              |
| `models.ts`             | `key_value` (δεδομένα μοντέλων)                                | Ορισμοί μοντέλων, δυνατότητες, τιμολόγηση                                                  |
| `combos.ts`             | `combos`                                                       | Διαμορφώσεις και σειρά δρομολόγησης συνδυασμών                                             |
| `apiKeys.ts`            | `api_keys`                                                     | Κύκλος ζωής κλειδιών API, πεδία πρόσβασης, παρακολούθηση ποσοστώσεων                       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Διαμόρφωση συστήματος και κοινόχρηστο KV store                                             |
| `backup.ts`             | —                                                              | Λειτουργίες εξαγωγής/εισαγωγής αντιγράφων ασφαλείας                                        |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Διαμορφώσεις proxy και κανόνες δρομολόγησης                                                |
| `prompts.ts`            | `prompt_templates`                                             | Επαναχρησιμοποιήσιμα πρότυπα prompt και διαχείριση εκδόσεων                                |
| `webhooks.ts`           | `webhooks`                                                     | Συνδρομές webhook βάσει συμβάντων και αρχεία καταγραφής                                    |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Καταγραφή ελέγχου ανά αίτημα (προαιρετική, υψηλού όγκου)                                   |
| `domainState.ts`        | `domain_*` (5 πίνακες)                                         | Προϋπολογισμοί τομέων, circuit breakers, αποκλεισμοί, αλυσίδες εφεδρείας, ιστορικό κόστους |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Κλειδιά API σε λίστα επιτρεπόμενων για MCP/A2A                                             |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Ιστορική χρήση ποσοστώσεων                                                                 |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Αντιστοίχιση μοντέλων σε προεπιλεγμένους συνδυασμούς                                       |
| `cliToolState.ts`       | `cli_tool_state`                                               | Μόνιμη κατάσταση ειδική για το CLI                                                         |
| `encryption.ts`         | —                                                              | Βοηθητικά εργαλεία για κρυπτογράφηση/αποκρυπτογράφηση πεδίων                               |
| `readCache.ts`          | —                                                              | Cache στη μνήμη για λειτουργίες με πολλές αναγνώσεις                                       |
| `secrets.ts`            | `key_value` (κρυπτογραφημένες εγγραφές)                        | Κρυπτογραφημένη αποθήκευση μυστικών                                                        |
| `stateReset.ts`         | —                                                              | Διαγραφή/επαναφορά της κατάστασης της βάσης δεδομένων για δοκιμές                          |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Περιβάλλον συνεδρίας για παράδοση σε agent                                                 |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Παρακολούθηση χρήσης                                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Διαμόρφωση συμπίεσης                                                                       |

### Όρια Μονάδων

Ένας βασικός αρχιτεκτονικός κανόνας: **οι μονάδες δεν προσπελαύνουν απευθείας τους πίνακες άλλων μονάδων**. Για να εργαστείτε με τα δεδομένα άλλης μονάδας, εισαγάγετε τη συνάρτηση από εκείνη τη μονάδα.

```ts
// ❌ ΛΑΘΟΣ: απευθείας SQL από άλλη μονάδα
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ΣΩΣΤΟ: χρησιμοποιήστε τη συνάρτηση της μονάδας providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Αυτός ο κανόνας επιβάλλεται μέσω της ανασκόπησης κώδικα — δεν υπάρχει στατικός έλεγχος, αλλά οι παραβιάσεις επισημαίνονται.

---

## Βασικό σχήμα (17 πίνακες)

Το `core.ts` ορίζει τους 17 βασικούς πίνακες στο `SCHEMA_SQL`. Αυτοί δημιουργούνται από τη μετεγκατάσταση `001_initial_schema.sql` και αποτελούν τον πυρήνα του σχήματος.

### Βασικοί πίνακες (δημιουργούνται στην αρχική μετεγκατάσταση)

| Πίνακας                    | Σκοπός                                       | Βασικές στήλες                                                          |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Διαπιστευτήρια παρόχου (κρυπτογραφημένα)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Πληροφορίες δρομολόγησης κόμβων παρόχου      | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Γενικός χώρος αποθήκευσης KV                 | `namespace`, `key`, `value`                                             |
| `combos`                   | Ορισμοί συνδυασμών δρομολόγησης              | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Κλειδιά API για την πύλη                     | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Μεταδεδομένα βάσης δεδομένων                 | `key`, `value`                                                          |
| `usage_history`            | Εγγραφές χρήσης αιτημάτων                    | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Ωφέλιμα φορτία αιτημάτων και αποκρίσεις      | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Αρχεία καταγραφής αιτημάτων διακομιστή proxy | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Αλυσίδες μοντέλων προς παρόχους              | `model`, `chain`                                                        |
| `domain_budgets`           | Προϋπολογισμοί δαπανών ανά τομέα             | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Ιστορικό επαναφορών προϋπολογισμού           | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Παρακολούθηση κόστους ανά τομέα              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Κατάσταση ορίου ρυθμού ανά τομέα             | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Κατάσταση διακόπτη κυκλώματος ανά τομέα      | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Προσωρινή μνήμη αποκρίσεων LLM               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Ιστορικά στιγμιότυπα ποσοστώσεων             | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Πρόσθετοι πίνακες (προστέθηκαν από μεταγενέστερες μετεγκαταστάσεις)

Οι επόμενες μετεγκαταστάσεις προσθέτουν πίνακες όπως:

- `cli_tool_state` (μετεγκατάσταση 011) — κατάσταση εργαλείου CLI
- Πίνακες `mcp_*` — έλεγχος διακομιστή MCP
- Πίνακες `a2a_*` — κατάσταση εργασιών A2A
- Πίνακες `usage_*` — παρακολούθηση χρήσης
- Πίνακες `plugin_*` — σύστημα προσθηκών
- `skill_executions` — ιστορικό εκτέλεσης δεξιοτήτων
- Πίνακες `memory_*` — σύστημα μνήμης
- Πίνακες `compression_*` — σύστημα συμπίεσης
- Πίνακες `webhook_*` — αρχείο καταγραφής παράδοσης webhook
- Πίνακες `acp_*` — Agent Client Protocol
- Πίνακες `oneproxy_*` — αγορά 1proxy
- `proxy_assignments` — συσχετίσεις εμβέλειας proxy
- `detailed_call_artifacts` — μεταδεδομένα τεχνουργημάτων αρχείου καταγραφής κλήσεων
- `quota_alert_history` — έλεγχος ειδοποιήσεων ποσοστώσεων
- `command_code_auth_sessions` — συνεδρίες OAuth του Command Code

Η πλήρης λίστα των ~30+ πινάκων βρίσκεται στο `src/lib/db/migrations/`.

---

## Μετεγκαταστάσεις

Το OmniRoute χρησιμοποιεί **μετεγκαταστάσεις με εκδόσεις και δυνατότητα επανεκτέλεσης χωρίς παρενέργειες** στο `src/lib/db/migrations/`. Κάθε μετεγκατάσταση είναι ένα μεμονωμένο αρχείο SQL με όνομα `NNN_description.sql`.

### Ονοματοδοσία Μετεγκαταστάσεων

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Τρόπος Εκτέλεσης των Μετεγκαταστάσεων

Κατά την εκκίνηση, το `migrationRunner.ts`:

1. Δημιουργεί τον πίνακα `_omniroute_migrations`, εάν δεν υπάρχει
2. Αναζητά τις μετεγκαταστάσεις που έχουν ήδη εφαρμοστεί
3. Εφαρμόζει με τη σειρά τυχόν νέες μετεγκαταστάσεις, καθεμία σε μία συναλλαγή
4. Καταγράφει κάθε εφαρμοσμένη μετεγκατάσταση με χρονική σήμανση

```ts
// src/lib/db/migrationRunner.ts (απλοποιημένο)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Δυνατότητα Επανεκτέλεσης Χωρίς Παρενέργειες

Οι μετεγκαταστάσεις πρέπει να έχουν **δυνατότητα επανεκτέλεσης χωρίς παρενέργειες** — η εκτέλεσή τους δύο φορές δεν θα πρέπει να προκαλεί καμία αλλαγή:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Χρησιμοποιείτε ελεύθερα τις ρήτρες `IF NOT EXISTS`, `IF EXISTS` και `OR IGNORE` / `OR REPLACE`.

### Προσθήκη Νέας Μετεγκατάστασης

1. **Εντοπίστε τον επόμενο αριθμό**: `ls src/lib/db/migrations/ | tail -1`
2. **Δημιουργήστε το αρχείο**: `NNN_my_change.sql`
3. **Χρησιμοποιήστε ασφαλή DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Συμπληρώστε προσεκτικά τα υπάρχοντα δεδομένα**: χρησιμοποιήστε `UPDATE ... WHERE ...` για τη διαχείριση των υπαρχουσών γραμμών
5. **Δοκιμάστε σε ένα αντίγραφο**: μην εκτελείτε ποτέ μη δοκιμασμένες μετεγκαταστάσεις στην παραγωγή

Παράδειγμα:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> Οι **αλλαγές χωρίς συμβατότητα προς τα πίσω** (π.χ. η διαγραφή στηλών) είναι περίπλοκες. Το OmniRoute ΔΕΝ υποστηρίζει υποβάθμιση — μόλις εφαρμοστεί μια μετεγκατάσταση, η αλλαγή του σχήματος είναι μόνιμη. Σχεδιάστε ανάλογα.

---

## Κρυπτογράφηση Αποθηκευμένων Δεδομένων

Τα ευαίσθητα πεδία (κλειδιά API, διακριτικά OAuth, συμβολοσειρές σύνδεσης) κρυπτογραφούνται κατά την αποθήκευση με χρήση **AES-256-GCM**.

### Τρόπος Λειτουργίας

```ts
// src/lib/db/encryption.ts (απλοποιημένο)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Πού Χρησιμοποιείται

- `provider_connections.api_key` — κρυπτογραφείται σε επίπεδο εφαρμογής
- `provider_connections.access_token`, `refresh_token`, `id_token` — κρυπτογραφούνται σε επίπεδο εφαρμογής
- Καταχωρίσεις `key_value` με `namespace = "secrets"` — κρυπτογραφούνται σε επίπεδο εφαρμογής
- `proxy_registry.auth` — κρυπτογραφείται σε επίπεδο εφαρμογής (εάν υπάρχει)

### Κλειδί Κρυπτογράφησης

Το κλειδί κρυπτογράφησης παράγεται από μια **φράση πρόσβασης** (ορίζεται μέσω της μεταβλητής περιβάλλοντος `STORAGE_ENCRYPTION_KEY`) και ένα **salt** (αποθηκεύεται στη βάση δεδομένων). Και τα δύο απαιτούνται για την αποκρυπτογράφηση των δεδομένων.

```bash
# Δημιουργήστε μια ασφαλή φράση πρόσβασης
openssl rand -hex 32

# Ορίστε τη στο .env
STORAGE_ENCRYPTION_KEY=<το-κλειδί-σας>
```

> **Κρίσιμο**: Η απώλεια του κλειδιού κρυπτογράφησης συνεπάγεται την απώλεια πρόσβασης σε όλα τα κρυπτογραφημένα δεδομένα. **Δημιουργήστε αντίγραφο ασφαλείας του κλειδιού ξεχωριστά από τη βάση δεδομένων**.

### Τι ΔΕΝ Κρυπτογραφείται

Για λόγους απόδοσης, τα ακόλουθα αποθηκεύονται ως απλό κείμενο:

- Εμφανιζόμενα ονόματα παρόχων
- Ορισμοί μοντέλων (είναι ήδη δημόσιοι)
- Κανόνες δρομολόγησης
- Εγγραφές χρήσης (χωρίς προσωπικά ταυτοποιήσιμες πληροφορίες)

---

## Επισημάνσεις κρυπτογράφησης (v3.8.16+)

Το OmniRoute χρησιμοποιεί τη **`migrateLegacyEncryptedString()`** για να διαχειρίζεται με διαφανή τρόπο δύο σχήματα κρυπτογράφησης:

- **Παλαιού τύπου** (πριν από την v3.5.0): «κρυπτογράφηση» βασισμένη σε XOR (όχι πραγματική κρυπτογραφία)
- **Τρέχον**: AES-256-GCM με κατάλληλο IV και ετικέτα αυθεντικοποίησης

Ο βοηθός μετεγκατάστασης εντοπίζει την παλαιού τύπου μορφή και επανακρυπτογραφεί με το νέο σχήμα κατά την πρώτη ανάγνωση. Αυτό σημαίνει ότι μπορείτε να αναβαθμίσετε μια παλιά βάση δεδομένων χωρίς να χάσετε διαπιστευτήρια.

---

## Cache ανάγνωσης

Για δεδομένα που διαβάζονται συχνά (μοντέλα, πάροχοι, ρυθμίσεις), το `readCache.ts` παρέχει μια **cache στη μνήμη**:

```ts
// Αποθηκεύεται στην cache κατά την εκκίνηση, ακυρώνεται κατά την εγγραφή
const providers = await getCachedProviders(); // Γρήγορο, στη μνήμη
const fresh = await listProviders(); // Αργό, προσπελαύνει τη ΒΔ
```

| Οντότητα στην cache    | Κλειδί cache   | TTL               |
| ---------------------- | -------------- | ----------------- |
| `models`               | `models:v1`    | Μέχρι την εγγραφή |
| `provider_connections` | `providers:v1` | Μέχρι την εγγραφή |
| `settings`             | `settings:v1`  | Μέχρι την εγγραφή |
| `combos`               | `combos:v1`    | Μέχρι την εγγραφή |

Η cache ακυρώνεται σε κάθε εγγραφή στον αντίστοιχο πίνακα.

---

## Δημιουργία αντιγράφων ασφαλείας και ανάκτηση

### Χειροκίνητη δημιουργία αντιγράφου ασφαλείας

```bash
# Χρησιμοποιήστε το CLI για να δημιουργήσετε ένα τοπικό αντίγραφο ασφαλείας
omniroute backup create --name pre-migration

# Ή μέσω του API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Το αρχείο αντιγράφου ασφαλείας περιλαμβάνει:

- Όλους τους πίνακες της ΒΔ (σειριοποιημένους σε JSON)
- Τεχνουργήματα αρχείων καταγραφής κλήσεων (κωδικοποιημένα σε base64, προαιρετικά)
- Ρυθμίσεις + μυστικά (κρυπτογραφημένα)
- Διαμόρφωση προσθέτων

### Επαναφορά

```bash
# Μέσω CLI
omniroute restore pre-migration

# Μέσω API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Προειδοποίηση**: Η επαναφορά αντικαθιστά ολόκληρη τη ΒΔ. Διακόψτε πρώτα τη λειτουργία όλων των προγραμμάτων-πελατών.

### Αυτοματοποιημένα αντίγραφα ασφαλείας

```bash
# Ενεργοποιήστε τα αυτοματοποιημένα ημερήσια αντίγραφα ασφαλείας μέσω CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Το χρονοδιάγραμμα εκτελείται στην πλευρά του διακομιστή από μια εργασία παρασκηνίου που ενεργοποιείται κάθε 30 δευτερόλεπτα
(προεπιλογή) και αξιολογεί την έκφραση cron με βάση την τοπική ώρα του διακομιστή.

| Μεταβλητή                                   | Προεπιλογή | Περιγραφή                                                                                                                                |
| ------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | Διάστημα ενεργοποίησης σε ms (ελάχιστο `5000`). Πρέπει να είναι μικρότερο από 60 s ώστε να εμπίπτει αξιόπιστα στο αντίστοιχο λεπτό cron. |

### Άμεσο αντίγραφο ασφαλείας SQLite

Για δημιουργία αντιγράφου ασφαλείας χωρίς χρόνο διακοπής μιας ενεργής ΒΔ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Αυτό χρησιμοποιεί το API διαδικτυακής δημιουργίας αντιγράφων ασφαλείας του SQLite — είναι ασφαλές να εκτελείται ενώ το OmniRoute βρίσκεται σε λειτουργία.

---

## Ρύθμιση απόδοσης

### Λειτουργία WAL

Το WAL είναι ενεργοποιημένο από προεπιλογή. Για φόρτους εργασίας με πολλές εγγραφές, εξετάστε τις ακόλουθες ρυθμίσεις:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Σημείο ελέγχου κάθε 1000 σελίδες
PRAGMA journal_size_limit = 67108864;  -- Όριο WAL 64MB
```

### Ευρετήρια

Βασικά ευρετήρια για την απόδοση (δημιουργούνται αυτόματα από τις μετεγκαταστάσεις):

- `idx_models_provider` — αναζητήσεις μοντέλων ανά πάροχο
- `idx_combo_targets_combo_id` — επέκταση προορισμών συνδυασμού
- `idx_usage_history_api_key_timestamp` — ανάλυση χρήσης
- `idx_quota_snapshots_api_key_window` — παρακολούθηση ορίων χρήσης
- `idx_call_logs_timestamp` — ερωτήματα αρχείου καταγραφής κλήσεων

Για να προσθέσετε ένα νέο ευρετήριο, δημιουργήστε μια μετεγκατάσταση:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Είσοδος/έξοδος με αντιστοίχιση μνήμης

Για πολύ μεγάλες βάσεις δεδομένων (>10GB), η αντιστοίχιση μνήμης μπορεί να προσαρμοστεί μέσω pragma του SQLite:

```sql
-- Ορισμός μέσω pragma του SQLite (προσαρμόστε στο core.ts ή κατά την εκτέλεση)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Συμπύκνωση

Οι παρουσίες του OmniRoute που εκτελούνται για μεγάλο χρονικό διάστημα επωφελούνται από την περιστασιακή εκτέλεση του `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Εκτελείτε τη διαδικασία κάθε μήνα, σε χρονικά διαστήματα χαμηλής κίνησης. (Η λειτουργία WAL μειώνει την ανάγκη, αλλά δεν την εξαλείφει.)

---

## Έλεγχος εύρυθμης λειτουργίας

Το `src/lib/db/healthCheck.ts` παρέχει **διαγνωστικά εύρυθμης λειτουργίας σε επίπεδο βάσης δεδομένων**:

Και τα δύο ρήματα απαιτούν έλεγχο ταυτότητας (διαφορετικά επιστρέφεται `401`). Το `GET` εκτελεί μόνο διάγνωση, ενώ το `POST` εκτελεί τον
ίδιο έλεγχο με ενεργοποιημένο το `autoRepair`.

```bash
GET  /api/db/health   # διάγνωση
POST /api/db/health   # διάγνωση + επιδιόρθωση
```

Η απόκριση είναι το `DbHealthCheckResult` που παράγεται από το `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Οι προϋπολογισμοί τομέων αναφέρονταν σε κλειδιά API που δεν υπάρχουν πλέον.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Πεδίο             | Σημασία                                                                                                                                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Είναι `true` όταν το `issues` είναι κενό. Το `driver` δεν το επηρεάζει ποτέ.                                                                                                                            |
| `issues[].type`   | Μία από τις τιμές `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                      |
| `repairedCount`   | Γραμμές που επιδιορθώθηκαν κατά την τρέχουσα εκτέλεση· είναι πάντα `0` όταν το `autoRepair` είναι false.                                                                                                |
| `backupCreated`   | Εάν δημιουργήθηκε αντίγραφο ασφαλείας πριν από την επιδιόρθωση.                                                                                                                                         |
| `checkedAt`       | Χρονική σήμανση ISO που είναι κοινή για την εκτέλεση και για οποιαδήποτε σημείωση επιδιόρθωσης εγγράφεται από αυτήν.                                                                                    |
| `driver.name`     | Πρόγραμμα οδήγησης SQLite που εξυπηρετεί την ελεγχόμενη βάση δεδομένων.                                                                                                                                 |
| `driver.degraded` | Είναι `true` όταν οι εγγραφές δεν υποστηρίζονται με ανθεκτικό τρόπο από το αρχείο της βάσης δεδομένων — η εφεδρική λύση WASM `sql.js` (διατήρηση ολόκληρου του αρχείου) ή μια βάση δεδομένων στη μνήμη. |

Το ίδιο ωφέλιμο φορτίο επιστρέφεται από το εργαλείο MCP `omniroute_db_health_check`.

Εκτελέστε το `PRAGMA integrity_check` για να εντοπίσετε αλλοίωση:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Θα πρέπει να εμφανίσει: ok
```

Εάν επιστρέψει οτιδήποτε άλλο εκτός από `ok`, **σταματήστε αμέσως να χρησιμοποιείτε τη βάση δεδομένων** και πραγματοποιήστε επαναφορά από αντίγραφο ασφαλείας.

---

## Ανάκτηση από Καταστροφή

### Σενάριο 1: Απώλεια Αρχείου WAL

Το αρχείο `-wal` λείπει, αλλά το `-shm` και η κύρια βάση δεδομένων είναι άθικτα:

```bash
# Ανακτάται αυτόματα στο επόμενο άνοιγμα
omniroute
```

Εάν το SQLite δεν μπορεί να πραγματοποιήσει αυτόματη ανάκτηση:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Σενάριο 2: Καταστροφή του Κύριου Αρχείου Βάσης Δεδομένων

Επαναφέρετε από αντίγραφο ασφαλείας:

```bash
omniroute sync pull --merge   # ή: omniroute backup restore <backup-id>
```

### Σενάριο 3: Απώλεια Κλειδιού Κρυπτογράφησης

**Δεν είναι δυνατή η ανάκτηση** χωρίς το κλειδί. Τα κρυπτογραφημένα πεδία δεν είναι αναγνώσιμα. Προσθέστε ξανά χειροκίνητα όλους τους παρόχους με νέα διαπιστευτήρια.

> **Μετριασμός**: Δημιουργείτε πάντα ξεχωριστό αντίγραφο ασφαλείας του κλειδιού κρυπτογράφησης, ιδανικά σε έναν διαχειριστή κωδικών πρόσβασης ή σε KMS.

### Σενάριο 4: Πλήρης Δίσκος

Το SQLite θα επιστρέψει σφάλματα `SQLITE_FULL`. Ελευθερώστε χώρο στον δίσκο και, στη συνέχεια:

```bash
# Δημιουργία σημείου ελέγχου WAL για απελευθέρωση χώρου
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Συνήθεις Λειτουργίες

### Επιθεώρηση Πίνακα

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Καταμέτρηση Γραμμών σε Όλους τους Πίνακες

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Επαναφορά (Διαγραφή) Όλων των Δεδομένων

```bash
# Διακόψτε πρώτα το OmniRoute
omniroute stop

# Διαγράψτε το αρχείο της βάσης δεδομένων
rm ~/.omniroute/storage.sqlite*

# Επανεκκινήστε (θα δημιουργηθεί ξανά μια κενή βάση δεδομένων)
omniroute
```

Για **επιλεκτική** επαναφορά (διατήρηση παρόχων, διαγραφή χρήσης):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Εξαγωγή Μεμονωμένου Πίνακα

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Αντιμετώπιση Προβλημάτων

### "Η βάση δεδομένων είναι κλειδωμένη"

Μια άλλη διεργασία διατηρεί ένα κλείδωμα εγγραφής. Μπορείτε είτε:

- Να περιμένετε να ολοκληρωθεί η άλλη διεργασία (ελέγξτε με `lsof | grep storage.sqlite`)
- Να τερματίσετε την άλλη διεργασία
- Εάν το πρόβλημα επιμένει, να επανεκκινήσετε το OmniRoute

### "Ο περιορισμός ξένου κλειδιού απέτυχε"

Μια λειτουργική μονάδα τομέα παραβιάζει την αναφορική ακεραιότητα. Ελέγξτε για:

- Ορφανές γραμμές σε εξαρτώμενους πίνακες
- Διαδοχικές διαγραφές που δεν μεταδόθηκαν
- Πρόσφατη μετεγκατάσταση που άλλαξε ένα ξένο κλειδί

Εκτελέστε `PRAGMA foreign_key_check;` για να εντοπίσετε παραβιάσεις.

### "Ανεπάρκεια μνήμης"

Η λειτουργία εισόδου/εξόδου με αντιστοίχιση μνήμης του SQLite υπερβαίνει το όριο του λειτουργικού συστήματος. Μειώστε το μέσω pragma του SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB αντί για 256MB
```

Ή απενεργοποιήστε το:

```sql
PRAGMA mmap_size = 0;
```

### "Η μετεγκατάσταση απέτυχε στα μισά της διαδικασίας"

Η μετεγκατάσταση εκτελέστηκε μέσα σε μια συναλλαγή, επομένως οι αλλαγές θα πρέπει να έχουν αναιρεθεί. Εάν όχι:

1. **Διακόψτε το OmniRoute** (αποτρέψτε περαιτέρω προσπάθειες)
2. **Ελέγξτε την κατάσταση της βάσης δεδομένων** με `sqlite3`
3. **Διορθώστε χειροκίνητα** τη μερική μετεγκατάσταση
4. **Εκτελέστε ξανά** το OmniRoute (η μετεγκατάσταση θα επιχειρηθεί ξανά)

Για να το αποτρέψετε, δοκιμάζετε πάντα πρώτα τις μετεγκαταστάσεις σε ένα αντίγραφο.

---

## Δείτε Επίσης

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — πίνακες χρήσης
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — παρακολούθηση εύρυθμης λειτουργίας
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ροή έκδοσης
- Πηγαίος κώδικας: `src/lib/db/` (80+ αρχεία, ~25K γραμμές κώδικα)
