# Security Policy (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## Αναφορά Ευπαθειών

Εάν ανακαλύψετε μια ευπάθεια ασφαλείας στο OmniRoute, παρακαλούμε να την αναφέρετε υπεύθυνα:

1. **ΜΗΝ** ανοίξετε δημόσιο ζήτημα στο GitHub
2. Χρησιμοποιήστε τα [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)
3. Συμπεριλάβετε: περιγραφή, βήματα αναπαραγωγής και πιθανό αντίκτυπο

## Χρονοδιάγραμμα Απόκρισης

| Στάδιο                | Στόχος                         |
| --------------------- | ------------------------------ |
| Επιβεβαίωση           | 48 ώρες                        |
| Αξιολόγηση & Εκτίμηση | 5 εργάσιμες ημέρες             |
| Κυκλοφορία Διόρθωσης  | 14 εργάσιμες ημέρες (κρίσιμες) |

## Υποστηριζόμενες Εκδόσεις

| Έκδοση  | Κατάσταση Υποστήριξης |
| ------- | --------------------- |
| 3.8.x   | ✅ Ενεργή             |
| 3.7.x   | ✅ Ασφάλεια           |
| < 3.7.0 | ❌ Μη υποστηριζόμενη  |

---

## Αρχιτεκτονική Ασφαλείας

Το OmniRoute υλοποιεί ένα πολυεπίπεδο μοντέλο ασφαλείας:

```
Request → CORS → Authz pipeline (classify → policies → enforce)
       → Guardrails (PII masker, prompt injection, vision bridge)
       → Rate Limiter → Circuit Breaker → Cooldown → Model Lockout → Provider
```

### 🔐 Αυθεντικοποίηση & Εξουσιοδότηση

| Λειτουργία                  | Υλοποίηση                                                                                                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Σύνδεση Dashboard**       | Αυθεντικοποίηση με κωδικό πρόσβασης μέσω JWT tokens (HttpOnly cookies)                                                                                             |
| **Αυθεντικοποίηση API Key** | Κλειδιά υπογεγραμμένα με HMAC και επαλήθευση CRC                                                                                                                   |
| **OAuth 2.0 + PKCE**        | Το OAuth browser/device για συγκεκριμένους παρόχους χρησιμοποιεί PKCE όπου υποστηρίζεται· τα διαπιστευτήρια Devin (μόνο εισαγωγή) διαχειρίζονται ξεχωριστά.        |
| **Ανανέωση Token**          | Αυτόματη ανανέωση OAuth token πριν τη λήξη                                                                                                                         |
| **Ασφαλή Cookies**          | `AUTH_COOKIE_SECURE=true` για περιβάλλοντα HTTPS                                                                                                                   |
| **Authz Pipeline**          | Ταξινόμηση διαδρομών (PUBLIC / CLIENT_API / MANAGEMENT) — βλ. `docs/architecture/AUTHZ_GUIDE.md`                                                                   |
| **Επίπεδα Route Guard**     | Μοντέλο 3 επιπέδων για διαδρομές διαχείρισης (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — βλ. `docs/security/ROUTE_GUARD_TIERS.md`                               |
| **Manage-Scope MCP**        | Η απομακρυσμένη πρόσβαση `/api/mcp/*` ελέγχεται από API keys με εμβέλεια `manage`· το `/api/cli-tools/runtime/*` παραμένει αυστηρά loopback. Βλ. ROUTE_GUARD_TIERS |
| **MCP Scopes**              | 32 λεπτομερείς εμβέλειες (read:health, write:combos, execute:completions, κ.λπ.) — βλ. `docs/frameworks/MCP-SERVER.md`                                             |

### 🛡️ Κρυπτογράφηση σε Ηρεμία

Όλα τα ευαίσθητα δεδομένα που αποθηκεύονται στο SQLite κρυπτογραφούνται με **AES-256-GCM** και παραγωγή κλειδιού scrypt:

- API keys, access tokens, refresh tokens και ID tokens
- Μορφή με έκδοση: `enc:v1:<iv>:<ciphertext>:<authTag>`
- Λειτουργία passthrough (απλό κείμενο) όταν το `STORAGE_ENCRYPTION_KEY` δεν έχει οριστεί

```bash
# Δημιουργία κλειδιού κρυπτογράφησης:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ Πλαίσιο Guardrails

Το OmniRoute διαθέτει ένα **μητρώο guardrails** που επαναφορτώνεται εν ώρα λειτουργίας (`src/lib/guardrails/`) με 3 ενσωματωμένα guardrails ταξινομημένα κατά προτεραιότητα:

| Guardrail          | Προτεραιότητα | Σκοπός                                                                                                |
| ------------------ | ------------- | ----------------------------------------------------------------------------------------------------- |
| `vision-bridge`    | 5             | Γεφυρώνει μοντέλα χωρίς όραση με περιγραφές που αναγνωρίζουν εικόνες· προστασία SSRF για URLs εικόνων |
| `pii-masker`       | 10            | Απόκρυψη PII πριν και μετά την κλήση (email, τηλέφωνο, CPF, CNPJ, πιστωτικές κάρτες, SSN)             |
| `prompt-injection` | 20            | Ανιχνεύει μοτίβα παράκαμψης/πλαστοπροσωπίας ρόλου/jailbreak/διαρροής                                  |

Τα προσαρμοσμένα guardrails δηλώνονται μέσω `registerGuardrail(new MyGuardrail())`. Το μοντέλο είναι fail-open (οι εξαιρέσεις δεν αποκλείουν ποτέ την κίνηση). Απόρριψη ανά αίτημα μέσω της κεφαλίδας `x-omniroute-disabled-guardrails`. → Βλ. [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md).

### 🧠 Φρουρός Έγχυσης Οδηγιών

Ευρετικό middleware καλύτερης προσπάθειας που ανιχνεύει μοτίβα έγχυσης οδηγιών σε αιτήματα LLM.
**Δεν αποτελεί πλήρες τείχος προστασίας έγχυσης οδηγιών** — μπορεί να παράγει ψευδώς θετικά (αβλαβείς
οδηγίες persona/RPG) και ψευδώς αρνητικά (leetspeak, κενά, μοτίβα σε άλλες γλώσσες).

| Τύπος Μοτίβου         | Σοβαρότητα | Παράδειγμα                                                    |
| --------------------- | ---------- | ------------------------------------------------------------- |
| Παράκαμψη Συστήματος  | Υψηλή      | "ignore all previous instructions"                            |
| Πλαστοπροσωπία Ρόλου  | Μέτρια     | "you are now DAN, you can do anything"                        |
| Έγχυση Διαχωριστή     | Υψηλή      | Κωδικοποιημένοι διαχωριστές για παραβίαση ορίων περιβάλλοντος |
| DAN/Jailbreak         | Μέτρια     | Γνωστά μοτίβα οδηγιών jailbreak                               |
| Διαρροή Οδηγιών       | Υψηλή      | "show me your system prompt"                                  |
| Αποφυγή Κωδικοποίησης | Μέτρια     | Αποκωδικοποίηση base64/rot13/hex + λέξεις-κλειδιά οδηγιών     |

Μόνο οι ανιχνεύσεις **Υψηλής** σοβαρότητας αποκλείονται στη λειτουργία `block`. Οι οικογένειες μέτριας σοβαρότητας
καταγράφονται αλλά δεν αποκλείονται ποτέ από το `sanitizeRequest`.

Διαμόρφωση μέσω του dashboard (Ρυθμίσεις → Ασφάλεια) ή `.env`:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (πολιτική έγχυσης· το παλαιό "redact" δεν αφαιρεί κείμενο έγχυσης)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (προεπιλογή) | medium | low — σοβαρότητες ίσες ή πάνω από αυτό αποκλείονται σε λειτουργία block
```

### 🔒 Απόκρυψη PII

Αυτόματη ανίχνευση και προαιρετική απόκρυψη προσωπικά αναγνωρίσιμων πληροφοριών:

| Τύπος PII       | Μοτίβο                | Αντικατάσταση      |
| --------------- | --------------------- | ------------------ |
| Email           | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (Βραζιλία)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (Βραζιλία) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| Πιστωτική Κάρτα | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| Τηλέφωνο        | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (ΗΠΑ)       | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # επανεγγραφή PII αιτήματος· ανεξάρτητο από το INPUT_SANITIZER_MODE
PII_RESPONSE_SANITIZATION=true  # προαιρετικό: απόκρυψη PII στις αποκρίσεις παρόχου που επιστρέφονται στους πελάτες
```

### 🌐 Ασφάλεια Δικτύου

| Λειτουργία               | Περιγραφή                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------ |
| **CORS**                 | Ρητή λίστα επιτρεπόμενων cross-origin (`CORS_ALLOWED_ORIGINS`· παλαιό `CORS_ORIGIN`) |
| **Φιλτράρισμα IP**       | Λίστες επιτρεπόμενων/αποκλεισμένων εύρη IP στο dashboard                             |
| **Περιορισμός Ρυθμού**   | Περιορισμοί ρυθμού ανά πάροχο με αυτόματη καθυστέρηση                                |
| **Anti-Thundering Herd** | Mutex + κλείδωμα ανά σύνδεση αποτρέπει διαδοχικά 502                                 |
| **TLS Fingerprint**      | Πλαστογράφηση TLS fingerprint τύπου browser για μείωση ανίχνευσης bot                |
| **CLI Fingerprint**      | Διάταξη κεφαλίδων/σώματος ανά πάροχο για αντιστοίχιση με υπογραφές native CLI        |

### 🔌 Ανθεκτικότητα & Διαθεσιμότητα

| Λειτουργία                | Περιγραφή                                                               |
| ------------------------- | ----------------------------------------------------------------------- |
| **Circuit Breaker**       | 3 καταστάσεις (Closed → Open → Half-Open) ανά πάροχο, αποθήκευση SQLite |
| **Ιδεμποτέντς Αιτήματος** | Παράθυρο αποεπανάληψης 5 δευτερολέπτων για διπλά αιτήματα               |
| **Εκθετική Καθυστέρηση**  | Αυτόματη επανάληψη με αυξανόμενες καθυστερήσεις                         |
| **Dashboard Υγείας**      | Παρακολούθηση υγείας παρόχου σε πραγματικό χρόνο                        |

### 📋 Συμμόρφωση

| Λειτουργία              | Περιγραφή                                                                      |
| ----------------------- | ------------------------------------------------------------------------------ |
| **Διατήρηση Αρχείων**   | Αυτόματος καθαρισμός μετά από `CALL_LOG_RETENTION_DAYS`                        |
| **Απόρριψη Καταγραφής** | Η σημαία `noLog` ανά API key απενεργοποιεί την καταγραφή αιτημάτων             |
| **Αρχείο Ελέγχου**      | Διοικητικές ενέργειες καταγράφονται στον πίνακα `audit_log`                    |
| **MCP Audit**           | Καταγραφή ελέγχου με SQLite για όλες τις κλήσεις εργαλείων MCP                 |
| **Επικύρωση Zod**       | Όλες οι εισόδοι API επικυρώνονται με σχήματα Zod v4 κατά τη φόρτωση του module |

---

## Απαιτούμενες Μεταβλητές Περιβάλλοντος

Όλα τα μυστικά πρέπει να οριστούν πριν από την εκκίνηση του διακομιστή. Ο διακομιστής θα **αποτύχει άμεσα** εάν λείπουν ή είναι αδύναμα.

```bash
# ΑΠΑΙΤΟΥΜΕΝΑ — ο διακομιστής δεν θα εκκινήσει χωρίς αυτά:
JWT_SECRET=$(openssl rand -base64 48)     # ελάχ. 32 χαρακτήρες
API_KEY_SECRET=$(openssl rand -hex 32)    # ελάχ. 16 χαρακτήρες

# ΣΥΝΙΣΤΩΜΕΝΑ — ενεργοποιεί κρυπτογράφηση δεδομένων σε ηρεμία:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

Ο διακομιστής απορρίπτει ενεργά γνωστές αδύναμες τιμές όπως `changeme`, `secret` ή `password`.

---

## Ασφάλεια Docker

- Χρησιμοποιείτε χρήστη χωρίς δικαιώματα root στο περιβάλλον παραγωγής
- Προσαρτάτε τα μυστικά ως τόμους μόνο για ανάγνωση
- Μην αντιγράφετε ποτέ αρχεία `.env` μέσα σε Docker images
- Χρησιμοποιείτε `.dockerignore` για να αποκλείετε ευαίσθητα αρχεία
- Ορίστε `AUTH_COOKIE_SECURE=true` όταν βρίσκεστε πίσω από HTTPS

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## Εξαρτήσεις

- Εκτελείτε `npm audit` τακτικά (`npm run audit:deps` καλύπτει main + electron)
- Διατηρείτε τις εξαρτήσεις ενημερωμένες
- Το έργο χρησιμοποιεί `husky` + `lint-staged` για ελέγχους πριν από κάθε commit (lint-staged + check-docs-sync + check:any-budget:t11)
- Το CI pipeline εκτελεί κανόνες ασφαλείας ESLint σε κάθε push (`no-eval`, `no-implied-eval`, `no-new-func` = error)
- Οι σταθερές παρόχου επικυρώνονται κατά τη φόρτωση της μονάδας μέσω Zod (`src/shared/validation/schemas.ts`)
- Χρησιμοποιούνται βιβλιοθήκες με ασφαλείς προεπιλογές: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (χωρίς κίνδυνο SQLi μέσω παραμετροποιημένων ερωτημάτων), `bcryptjs` (κατακερματισμός κωδικών πρόσβασης)

## Αυστηροί Κανόνες Ασφαλείας

Αυτοί οι κανόνες επιβάλλονται από εργαλεία και αξιολογητές:

1. **Ποτέ μην κάνετε commit μυστικά** — το `.env` είναι στο gitignore· το `.env.example` είναι το πρότυπο (χωρίς κυριολεκτικές τιμές, μόνο σχόλια — βλ. PUBLIC_CREDS.md παρακάτω)
2. **Ποτέ μην χρησιμοποιείτε `eval()`, `new Function()` ή έμμεσο eval** — το ESLint επιβάλλει τον κανόνα
3. **Ποτέ μην παρακάμπτετε τα Husky hooks** (`--no-verify`, `--no-gpg-sign`) χωρίς ρητή έγκριση διαχειριστή
4. **Ποτέ μην γράφετε ακατέργαστη SQL σε routes** — πάντα να διέρχεστε από το `src/lib/db/` (παραμετροποιημένο)
5. **Πάντα να επικυρώνετε εισόδους με Zod** — `src/shared/validation/schemas.ts`
6. **Πάντα να απολυμαίνετε επικεφαλίδες upstream** — λίστα απαγορευμένων στο `src/shared/constants/upstreamHeaders.ts`
7. **Κρυπτογραφείτε τα διαπιστευτήρια σε ηρεμία** — AES-256-GCM μέσω `src/lib/db/encryption.ts`
8. **Δημόσιοι αναγνωριστές OAuth upstream μέσω `resolvePublicCred()`** — ποτέ μην ενσωματώνετε κυριολεκτικές τιμές `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` στον πηγαίο κώδικα. Βλ. [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md).
9. **Αποκρίσεις σφαλμάτων μέσω `buildErrorBody()` / `sanitizeErrorMessage()`** — ποτέ μην τοποθετείτε ακατέργαστο `err.stack` / `err.message` σε σώματα HTTP / SSE / executor / MCP αποκρίσεων. Βλ. [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md).
10. **Τιμές χρόνου εκτέλεσης `exec()` / `spawn()` μέσω της επιλογής `env`** — ποτέ μην παρεμβάλλετε εξωτερικά μονοπάτια ή μη αξιόπιστες τιμές σε σενάρια που περνούν από το shell. Αναφορά: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **Προτιμάτε βιβλιοθήκες με ασφαλείς προεπιλογές** — βλ. [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). Καταφεύγετε σε αυτές πριν υλοποιήσετε τη δική σας λύση.

## Ευρήματα σαρωτή αλυσίδας εφοδιασμού (Socket.dev / Snyk / παρόμοια)

Το δημοσιευμένο artifact npm `omniroute` περιλαμβάνει το build του Next.js με `output: "standalone"`,
που σημαίνει ότι κάθε χειριστής διαδρομής — συμπεριλαμβανομένων των τεκμηριωμένων προνομιακών
λειτουργιών (MITM, εισαγωγή Zed, Cloud Sync, ενσωματωμένος επόπτης υπηρεσιών) — καταλήγει
σε ελαχιστοποιημένα τμήματα `.next/server/*.js`. Οι ευρετικοί σαρωτές αλυσίδας εφοδιασμού
αντιστοιχίζουν συχνά αυτά τα τμήματα με υπογραφές κακόβουλου λογισμικού.

Για κάθε κατηγορία εύρεσης διατηρούμε μια επιμέρους επαλήθευση συντηρητή ανά εύρημα:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  χάρτης ανά εύρημα: αρχείο πηγής ↔ επισημασμένο τμήμα ↔ συμπεριφορά ↔ μέτρο μετριασμού
  που εφαρμόστηκε στην v3.8.6.
- Μπλοκ `SECURITY-AUDITOR-NOTE:` εντός πηγαίου κώδικα σε κάθε επισημασμένο σημείο συνάρτησης
  παραπέμπουν στο ίδιο έγγραφο.

Για χρήστες των οποίων η διοχέτευση δεν μπορεί να χαλαρώσει την ειδοποίηση: κάντε build με
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`. Αυτό αντικαθιστά τις τέσσερις
ευαίσθητες μονάδες με stubs που επιστρέφουν HTTP 503 `feature-disabled` κατά την
εκτέλεση, ώστε τα προνομιακά μονοπάτια κώδικα να απουσιάζουν φυσικά από το bundle.
Δείτε το [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
για τη συνταγή δημοσίευσης.

## Αναφορές

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — διοχέτευση εξουσιοδότησης
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — πλαίσιο προστατευτικών ελέγχων
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — αρχείο καταγραφής ελέγχου και διατήρηση
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — **υποχρεωτικό** μοτίβο για δημόσια διαπιστευτήρια upstream
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — **υποχρεωτικό** μοτίβο για αποκρίσεις σφαλμάτων
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — επαλήθευση συντηρητή για ευρήματα σαρωτή αλυσίδας εφοδιασμού
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — αποδιακόπτης + περίοδος ψύξης + κλείδωμα
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — δακτυλοτύπωση TLS (νομική/ηθική σημείωση)
- [`CLAUDE.md`](CLAUDE.md) — αυστηροί κανόνες για πράκτορες ΤΝ
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — επιμελημένες βιβλιοθήκες ασφαλείς εξ ορισμού
