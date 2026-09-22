# Evaluations (Evals) (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Πηγή αλήθειας:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Τελευταία ενημέρωση:** 2026-06-28 — v3.8.40

Το OmniRoute παρέχει ένα γενικό πλαίσιο αξιολόγησης που μπορείτε να χρησιμοποιήσετε για τη συγκριτική αξιολόγηση διαμορφώσεων δρομολόγησης, μεμονωμένων παρόχων/μοντέλων ή των ενσωματωμένων σουιτών "golden set".
Χρησιμοποιήστε το για να επαληθεύετε αλλαγές στη δρομολόγηση, να επικυρώνετε νέους παρόχους και να θέτετε κριτήρια αποδοχής για τις εκδόσεις πριν τις προωθήσετε στην κίνηση παραγωγής.

Το πλαίσιο υλοποιείται ως εξής:

- Ένας αμιγής εκτελεστής (`src/lib/evals/evalRunner.ts`) που καταχωρίζει στη μνήμη
  τις ενσωματωμένες σουίτες, αξιολογεί τα αποτελέσματα βάσει των αναμενόμενων κριτηρίων και συγκεντρώνει
  πίνακες βαθμολογίας.
- Ένα επίπεδο διατήρησης δεδομένων (`src/lib/db/evals.ts`) για προσαρμοσμένες (καθορισμένες από τον χρήστη) σουίτες
  και ιστορικές εκτελέσεις στο SQLite.
- Ένα επίπεδο ενορχήστρωσης (`src/lib/evals/runtime.ts`) που εκτελεί κάθε περίπτωση
  αποστέλλοντας πραγματικές κλήσεις στο `POST /v1/chat/completions`, καταγράφει την καθυστέρηση
  και τα αποτελέσματα και αποθηκεύει την εκτέλεση.
- Τελικά σημεία REST στη διαδρομή `/api/evals/*` (μόνο με έλεγχο ταυτότητας διαχείρισης).
- Μια επιφάνεια στον πίνακα ελέγχου στη διαδρομή `Πίνακας ελέγχου → Χρήση → Αξιολογήσεις` (`EvalsTab.tsx`).

## Έννοιες

### Σουίτα

Μια σουίτα είναι μια επώνυμη συλλογή περιπτώσεων δοκιμής με μια `description` και μία ή
περισσότερες περιπτώσεις. Οι σουίτες προέρχονται από δύο πηγές:

| Πηγή       | Πού ορίζεται                                             | Μεταβλητή κατά τον χρόνο εκτέλεσης; |
| ---------- | -------------------------------------------------------- | ----------------------------------- |
| `built-in` | Καταχωρίζεται μέσω `registerSuite()` κατά την εκκίνηση   | Όχι (ορίζεται στον κώδικα)          |
| `custom`   | Αποθηκεύεται στα `eval_suites` + `eval_cases` του SQLite | Ναι (μέσω API/UI)                   |

Οι τρέχουσες ενσωματωμένες σουίτες (βλ. `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 βασικές περιπτώσεις που καλύπτουν χαιρετισμούς/μαθηματικά/μετάφραση/ασφάλεια
- `coding-proficiency` — Python/JS/SQL/TS/εντοπισμός σφαλμάτων
- `reasoning-logic` — συλλογισμοί, λεκτικά προβλήματα, αναγνώριση μοτίβων
- `multilingual` — μετάφραση και αναγνώριση γλώσσας
- `safety-guardrails` — PII, jailbreak, άρνηση, επίγνωση μεροληψίας
- `instruction-following` — αποκλειστικά JSON, αριθμημένες λίστες, γλωσσικοί περιορισμοί
- `codex-comparison` — άμεσες συγκριτικές εργασίες προγραμματισμού που προορίζονται για τη λειτουργία σύγκρισης

### Περίπτωση

Κάθε περίπτωση περιλαμβάνει:

| Πεδίο      | Περιγραφή                                                                       |
| ---------- | ------------------------------------------------------------------------------- |
| `id`       | Σταθερό αναγνωριστικό (χρησιμοποιείται ως κλειδί για αποτελέσματα και μετρικές) |
| `name`     | Ετικέτα αναγνώσιμη από τον άνθρωπο                                              |
| `model`    | Προεπιλεγμένο μοντέλο όταν η εκτέλεση χρησιμοποιεί στόχευση `suite-default`     |
| `input`    | `{ messages, max_tokens? }` — αποστέλλεται στο `/v1/chat/completions`           |
| `expected` | `{ strategy, value }` — κριτήριο βαθμολόγησης (βλ. παρακάτω)                    |
| `tags`     | Προαιρετικές ετικέτες (π.χ. `safety`, `pii`, `jailbreak`)                       |

### Στόχος

Η ίδια σουίτα μπορεί να εκτελεστεί έναντι διαφορετικών στόχων. Το σχήμα στόχου είναι το
`evalTargetSchema` στο `src/shared/validation/schemas.ts`:

| Τύπος στόχου    | `id`           | Συμπεριφορά                                                                 |
| --------------- | -------------- | --------------------------------------------------------------------------- |
| `suite-default` | `null`         | Κάθε περίπτωση χρησιμοποιεί το ενσωματωμένο πεδίο `model` της               |
| `model`         | όνομα μοντέλου | Επιβάλλει τη διέλευση κάθε περίπτωσης από ένα άμεσο μοντέλο (π.χ. `gpt-4o`) |
| `combo`         | όνομα combo    | Εκτελεί κάθε περίπτωση μέσω ενός combo (δοκιμάζει τη μηχανή δρομολόγησης)   |

Για τα `model` και `combo`, το πεδίο `id` είναι υποχρεωτικό (επιβάλλεται από το Zod
`superRefine`). Όταν παρέχεται το `compareTarget`, οι δύο στόχοι πρέπει να διαφέρουν —
ο εκτελεστής αποθηκεύει και τις δύο εκτελέσεις κάτω από το ίδιο `runGroupId` για σύγκριση A/B.

## Κριτήρια βαθμολόγησης

Υλοποιούνται στη `evaluateCase()` (evalRunner.ts):

| Στρατηγική | Επιτυχία όταν…                                                              |
| ---------- | --------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                           |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`         |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` είναι αληθές                |
| `custom`   | `expected.fn(actualOutput, evalCase)` επιστρέφει αληθές (μόνο ενσωματωμένη) |

**Σημείωση:** Η βαθμολόγηση με προσαρμοσμένη συνάρτηση προορίζεται αποκλειστικά για σουίτες που ορίζονται στον κώδικα (ενσωματωμένες),
επειδή οι συναρτήσεις δεν μπορούν να σειριοποιηθούν μέσω του API. Το
`evalCaseBuilderSchema` δέχεται μόνο `contains | exact | regex` για
σουίτες που δημιουργούνται από χρήστες.

Προς το παρόν, δεν υπάρχει βαθμολογητής LLM-as-judge ή ομοιότητας βάσει embeddings — η προσθήκη του
θα μπορούσε να γίνει εύκολα ως σημείο επέκτασης στη `evaluateCase()`.

## Σχήμα βάσης δεδομένων

Τρεις πίνακες (μετεγκαταστάσεις `030_create_eval_runs.sql` και
`031_create_eval_suites.sql`):

| Πίνακας       | Σκοπός                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Μεταδεδομένα προσαρμοσμένων σουιτών (`id`, `name`, `description`)                                                                 |
| `eval_cases`  | Περιπτώσεις ανά σουίτα — `input_json`, `expected_*`, `tags_json`                                                                  |
| `eval_runs`   | Ιστορικές εκτελέσεις — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Οι ενσωματωμένες σουίτες **δεν** αποθηκεύονται στη βάση δεδομένων. Παραμένουν στη μνήμη και
καταχωρίζονται ξανά κάθε φορά που εισάγεται το `evalRunner.ts`.

## REST API

Όλα τα endpoints απαιτούν έλεγχο ταυτότητας διαχείρισης (`requireManagementAuth`) — δεν
αποτελούν μέρος της δημόσιας επιφάνειας proxy.

| Endpoint                      | Μέθοδος  | Περιγραφή                                                                         |
| ----------------------------- | -------- | --------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Παραθέτει σουίτες + πρόσφατες εκτελέσεις + πίνακα βαθμολογίας + στόχους + κλειδιά |
| `/api/evals`                  | `POST`   | Εκτελεί μια σουίτα (μεμονωμένα ή συγκριτικά) — σχήμα `evalRunSuiteSchema`         |
| `/api/evals/{suiteId}`        | `GET`    | Ανακτά μία σουίτα (ενσωματωμένη ή προσαρμοσμένη)                                  |
| `/api/evals/suites`           | `POST`   | Δημιουργεί μια προσαρμοσμένη σουίτα — σχήμα `evalSuiteSaveSchema`                 |
| `/api/evals/suites/{suiteId}` | `GET`    | Ανακτά μια προσαρμοσμένη σουίτα                                                   |
| `/api/evals/suites/{suiteId}` | `PUT`    | Αντικαθιστά μια προσαρμοσμένη σουίτα (οι περιπτώσεις εισάγονται ξανά)             |
| `/api/evals/suites/{suiteId}` | `DELETE` | Διαγράφει μια προσαρμοσμένη σουίτα και τις περιπτώσεις της                        |

### Εκτέλεση μιας σουίτας

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Προαιρετικά πεδία:

- `outputs` — `Record<caseId, string>` με προϋπολογισμένες εξόδους. Όταν παρέχεται,
  το πρόγραμμα εκτέλεσης **παραλείπει την αποστολή** και βαθμολογεί μόνο τις αποθηκευμένες εξόδους (χρήσιμο για
  αξιολόγηση εκτός σύνδεσης).
- `compareTarget` — δεύτερος στόχος για παράλληλη εκτέλεση· και οι δύο εκτελέσεις μοιράζονται ένα
  παραγόμενο `runGroupId` για προβολή άμεσης σύγκρισης.
- `apiKeyId` — εσωτερικό κλειδί API που χρησιμοποιείται για τον έλεγχο ταυτότητας των απεσταλμένων
  κλήσεων `/v1/chat/completions`. Απαιτείται όταν είναι ενεργοποιημένο το `REQUIRE_API_KEY`.

### Δημιουργία μιας προσαρμοσμένης σουίτας

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Διοχέτευση εκτέλεσης

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Επιλύει τη σουίτα (ενσωματωμένη ή προσαρμοσμένη).
2. Για κάθε περίπτωση, δημιουργεί ένα `Request` προς το `/v1/chat/completions` με τα
   `messages` της περίπτωσης, το επιλυμένο `model`, `stream: false` και `max_tokens: 512`
   (ή την παράκαμψη που ορίζεται στην περίπτωση).
3. Καλεί απευθείας τον χειριστή συνομιλίας (εντός της διεργασίας — χωρίς επιπλέον μετάβαση HTTP).
4. Καταγράφει την καθυστέρηση και εξάγει κείμενο είτε από το `choices[0].message.content`
   είτε από το ωφέλιμο φορτίο `output[]` του Responses API.
5. Βαθμολογεί όλες τις εξόδους μέσω του `runSuite()` και κατόπιν τις αποθηκεύει μέσω του `saveEvalRun()`.

Οι περιπτώσεις εκτελούνται **διαδοχικά**. Προς το παρόν δεν υπάρχει σημαία ταυτόχρονης εκτέλεσης.

## Πίνακας ελέγχου

Το περιβάλλον εργασίας βρίσκεται στο `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Από εκεί μπορείτε:

- Να περιηγηθείτε σε ενσωματωμένες και προσαρμοσμένες σουίτες, με προεπισκόπηση κάθε περίπτωσης.
- Να δημιουργήσετε/επεξεργαστείτε/διαγράψετε προσαρμοσμένες σουίτες μέσω του εργαλείου δημιουργίας περιπτώσεων.
- Να επιλέξετε έναν στόχο (προεπιλογές σουίτας / μοντέλο / συνδυασμός), προαιρετικά έναν δεύτερο
  `compareTarget`, προαιρετικά ένα κλειδί API, και έπειτα να εκτελέσετε τη σουίτα κατ’ απαίτηση.
- Να επιθεωρήσετε το ιστορικό εκτελέσεων, την επιτυχία/αποτυχία ανά περίπτωση, την καθυστέρηση και τις καταγεγραμμένες εξόδους.
- Να δείτε τον κυλιόμενο πίνακα αποτελεσμάτων που συγκεντρώνεται από την πιο πρόσφατη εκτέλεση ανά
  πεδίο `(suite, target)`.

## Σχέση με το RFC αυτόματης αξιολόγησης

Ένα ξεχωριστό, πιο περιορισμένο υποσύστημα αξιολόγησης βρίσκεται στο `src/domain/assessment/`
(δείτε επίσης το [AUTO-COMBO.md](../routing/AUTO-COMBO.md) για τη μηχανή βαθμολόγησης σε πραγματικό χρόνο).
Αυτό το υποσύστημα στοχεύει τη μηχανή Auto Combo — βαθμολογεί αυτόματα παρόχους και
μοντέλα, ώστε οι συνδυασμοί να μπορούν να αυτοεπιδιορθώνονται όταν αποτυγχάνουν συστήματα ανωτέρου επιπέδου. Χρησιμοποιεί το δικό του πρόγραμμα εκτέλεσης,
τη δική του κατηγοριοποίηση και τη δική του λογική βαθμολόγησης.

Το πλαίσιο Evals που τεκμηριώνεται εδώ είναι η **ευρύτερη επιφάνεια δοκιμών γενικού σκοπού**.
Προτιμήστε το για αυθαίρετες σουίτες δοκιμών παλινδρόμησης, συγκρίσεις A/B
και δοκιμές καπνού ανά έκδοση. Χρησιμοποιήστε το υποσύστημα αυτόματης αξιολόγησης όταν χρειάζεστε
η κατάσταση των παρόχων σε πραγματικό χρόνο να επηρεάζει τις αποφάσεις δρομολόγησης.

## Ενσωμάτωση CI

Προς το παρόν δεν υπάρχει ειδικό npm script `eval:ci`. Υπάρχουν δύο διαδρομές, εάν θέλετε να
εξαρτάτε τις εκδόσεις από τα αποτελέσματα αξιολόγησης:

- **Διαδρομή HTTP**: εκκινήστε τον διακομιστή, καλέστε το `POST /api/evals` με γνωστά
  `suiteId` + `target` και επαληθεύστε ότι ισχύει `runs[].summary.passRate >= N` στην
  απόκριση.
- **Διαδρομή εντός διεργασίας**: εισαγάγετε το `runEvalSuiteAgainstTarget()` από το
  `@/lib/evals/runtime` σε ένα script, εκτελέστε το σε μια δοκιμαστική βάση δεδομένων και ελέγξτε το
  επιστρεφόμενο `PersistedEvalRun.summary`.

Οι δοκιμές που καλύπτουν τη διαδρομή και το ιστορικό βρίσκονται στα
`tests/unit/evals-route.test.ts` και `tests/unit/evals-history.test.ts`.

## Σημεία επέκτασης

Συνήθεις αλλαγές και πού πρέπει να γίνουν:

- **Νέα στρατηγική βαθμολόγησης** — επεκτείνετε το μπλοκ `switch (evalCase.expected.strategy)`
  στο `evaluateCase()` (`evalRunner.ts`) και διευρύνετε το `EvalCaseStrategy` στο
  `src/lib/db/evals.ts`, καθώς και το `evalCaseBuilderSchema` στο `schemas.ts`.
- **Νέα ενσωματωμένη σουίτα** — ορίστε ένα αντικείμενο σουίτας και καλέστε το `registerSuite()` στο
  τέλος του `evalRunner.ts`. Θα εντοπιστεί αυτόματα από το `listSuites()`.
- **Εκτέλεση με ταυτόχρονη επεξεργασία** — αλλάξτε τον διαδοχικό βρόχο `for` στο
  `runEvalSuiteAgainstTarget()` σε ένα οριοθετημένο `Promise.all` (προς το παρόν δεν
  υπάρχει έλεγχος ταυτόχρονης εκτέλεσης).
- **Περιπτώσεις ροής/κλήσης εργαλείων** — αυτή τη στιγμή το πρόγραμμα εκτέλεσης επιβάλλει `stream: false`.
  Η αξιολόγηση με επίγνωση ροής ή εργαλείων θα απαιτούσε αλλαγές στο `runtime.ts`
  (καταγραφή και συγκέντρωση των τμημάτων SSE πριν από τη βαθμολόγηση).

## Δείτε επίσης

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — γενική περιήγηση στο προϊόν
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — αναφορά για τη διοχέτευση αιτημάτων
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — μηχανή βαθμολόγησης Auto Combo (σε πραγματικό χρόνο εκτέλεσης)
- Πηγαίος κώδικας: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Διεπαφή χρήστη: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
