# COVERAGE_PLAN (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/COVERAGE_PLAN.md) · 🇸🇦 [ar](../../../ar/docs/ops/COVERAGE_PLAN.md) · 🇦🇿 [az](../../../az/docs/ops/COVERAGE_PLAN.md) · 🇧🇬 [bg](../../../bg/docs/ops/COVERAGE_PLAN.md) · 🇧🇩 [bn](../../../bn/docs/ops/COVERAGE_PLAN.md) · 🇨🇿 [cs](../../../cs/docs/ops/COVERAGE_PLAN.md) · 🇩🇰 [da](../../../da/docs/ops/COVERAGE_PLAN.md) · 🇩🇪 [de](../../../de/docs/ops/COVERAGE_PLAN.md) · 🇪🇸 [es](../../../es/docs/ops/COVERAGE_PLAN.md) · 🇪🇪 [et](../../../et/docs/ops/COVERAGE_PLAN.md) · 🇮🇷 [fa](../../../fa/docs/ops/COVERAGE_PLAN.md) · 🇫🇮 [fi](../../../fi/docs/ops/COVERAGE_PLAN.md) · 🇫🇷 [fr](../../../fr/docs/ops/COVERAGE_PLAN.md) · 🇮🇪 [ga](../../../ga/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [gu](../../../gu/docs/ops/COVERAGE_PLAN.md) · 🇮🇱 [he](../../../he/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [hi](../../../hi/docs/ops/COVERAGE_PLAN.md) · 🇭🇷 [hr](../../../hr/docs/ops/COVERAGE_PLAN.md) · 🇭🇺 [hu](../../../hu/docs/ops/COVERAGE_PLAN.md) · 🇮🇩 [id](../../../id/docs/ops/COVERAGE_PLAN.md) · 🇮🇹 [it](../../../it/docs/ops/COVERAGE_PLAN.md) · 🇯🇵 [ja](../../../ja/docs/ops/COVERAGE_PLAN.md) · 🇰🇷 [ko](../../../ko/docs/ops/COVERAGE_PLAN.md) · 🇱🇹 [lt](../../../lt/docs/ops/COVERAGE_PLAN.md) · 🇱🇻 [lv](../../../lv/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [mr](../../../mr/docs/ops/COVERAGE_PLAN.md) · 🇲🇾 [ms](../../../ms/docs/ops/COVERAGE_PLAN.md) · 🇲🇹 [mt](../../../mt/docs/ops/COVERAGE_PLAN.md) · 🇳🇱 [nl](../../../nl/docs/ops/COVERAGE_PLAN.md) · 🇳🇴 [no](../../../no/docs/ops/COVERAGE_PLAN.md) · 🇵🇭 [phi](../../../phi/docs/ops/COVERAGE_PLAN.md) · 🇵🇱 [pl](../../../pl/docs/ops/COVERAGE_PLAN.md) · 🇵🇹 [pt](../../../pt/docs/ops/COVERAGE_PLAN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/COVERAGE_PLAN.md) · 🇷🇴 [ro](../../../ro/docs/ops/COVERAGE_PLAN.md) · 🇷🇺 [ru](../../../ru/docs/ops/COVERAGE_PLAN.md) · 🇸🇰 [sk](../../../sk/docs/ops/COVERAGE_PLAN.md) · 🇸🇮 [sl](../../../sl/docs/ops/COVERAGE_PLAN.md) · 🇷🇸 [sr](../../../sr/docs/ops/COVERAGE_PLAN.md) · 🇸🇪 [sv](../../../sv/docs/ops/COVERAGE_PLAN.md) · 🇰🇪 [sw](../../../sw/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [ta](../../../ta/docs/ops/COVERAGE_PLAN.md) · 🇮🇳 [te](../../../te/docs/ops/COVERAGE_PLAN.md) · 🇹🇭 [th](../../../th/docs/ops/COVERAGE_PLAN.md) · 🇹🇷 [tr](../../../tr/docs/ops/COVERAGE_PLAN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/COVERAGE_PLAN.md) · 🇵🇰 [ur](../../../ur/docs/ops/COVERAGE_PLAN.md) · 🇻🇳 [vi](../../../vi/docs/ops/COVERAGE_PLAN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/COVERAGE_PLAN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/COVERAGE_PLAN.md)

---

---

title: "Test Coverage Plan"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Σχέδιο Κάλυψης Δοκιμών

Τελευταία ενημέρωση: 2026-06-28

> Κατάσταση μετρημένη στις 2026-05-13: γραμμές 82.58%, δηλώσεις 82.58%, συναρτήσεις 84.23%, κλάδοι 75.22%. Οι Φάσεις 1-5 έχουν ολοκληρωθεί. Τρέχουσα εστίαση στη Φάση 6 (>=85%) και Φάση 7 (>=90%).

## Βασική Γραμμή

Υπάρχουν πολλαπλές τιμές κάλυψης ανάλογα με τον τρόπο υπολογισμού της αναφοράς. Για τον σχεδιασμό, μόνο μία από αυτές είναι χρήσιμη.

| Μετρική          | Εύρος                                                    | Δηλώσεις / Γραμμές | Κλάδοι | Συναρτήσεις | Σημειώσεις                                                   |
| ---------------- | -------------------------------------------------------- | -----------------: | -----: | ----------: | ------------------------------------------------------------ |
| Παλαιά           | Παλιό `npm run test:coverage`                            |             79.42% | 75.15% |      67.94% | Διογκωμένη: μετράει αρχεία δοκιμών και εξαιρεί το `open-sse` |
| Διαγνωστική      | Μόνο πηγαίος κώδικας, χωρίς δοκιμές και χωρίς `open-sse` |             68.16% | 63.55% |      64.06% | Χρήσιμη μόνο για απομόνωση του `src/**`                      |
| Συνιστώμενη βάση | Μόνο πηγαίος κώδικας, χωρίς δοκιμές και με `open-sse`    |             82.58% | 75.22% |      84.23% | Αυτή είναι η βάση σε επίπεδο έργου προς βελτίωση             |

Η συνιστώμενη βάση είναι ο αριθμός που πρέπει να βελτιστοποιηθεί.

## Κανόνες

- Οι στόχοι κάλυψης εφαρμόζονται στα αρχεία πηγαίου κώδικα, όχι στο `tests/**`.
- Το `open-sse/**` αποτελεί μέρος του προϊόντος και πρέπει να παραμένει εντός εύρους.
- Ο νέος κώδικας δεν πρέπει να μειώνει την κάλυψη στις περιοχές που αγγίζει.
- Να προτιμάτε τη δοκιμή συμπεριφοράς και αποτελεσμάτων κλάδων έναντι λεπτομερειών υλοποίησης.
- Να προτιμάτε προσωρινές βάσεις δεδομένων SQLite και μικρά fixtures έναντι εκτεταμένων mocks για το `src/lib/db/**`.

## Τρέχον σύνολο εντολών

- `npm run test:coverage`
  - Κύρια πύλη κάλυψης πηγαίου κώδικα για τη σουίτα δοκιμών μονάδας
  - Δημιουργεί `text-summary`, `html`, `json-summary` και `lcov`
- `npm run coverage:report`
  - Λεπτομερής αναφορά ανά αρχείο από την τελευταία εκτέλεση
- `npm run test:coverage:legacy`
  - Μόνο για ιστορική σύγκριση

## Ορόσημα

| Φάση   |                 Στόχος | Εστίαση                                                               | Κατάσταση     |
| ------ | ---------------------: | --------------------------------------------------------------------- | ------------- |
| Φάση 1 | 60% δηλώσεις / γραμμές | Γρήγορα κέρδη και κάλυψη βοηθητικών εργαλείων χαμηλού ρίσκου          | ✅ Ολοκληρώθη |
| Φάση 2 | 65% δηλώσεις / γραμμές | Θεμέλια βάσης δεδομένων και διαδρομών                                 | ✅ Ολοκληρώθη |
| Φάση 3 | 70% δηλώσεις / γραμμές | Επικύρωση παρόχων και αναλυτικά χρήσης                                | ✅ Ολοκληρώθη |
| Φάση 4 | 75% δηλώσεις / γραμμές | Μεταφραστές και βοηθητικά του `open-sse`                              | ✅ Ολοκληρώθη |
| Φάση 5 | 80% δηλώσεις / γραμμές | Χειριστές `open-sse` και κλάδοι εκτελεστή                             | ✅ Ολοκληρώθη |
| Φάση 6 | 85% δηλώσεις / γραμμές | Δυσκολότερες οριακές περιπτώσεις, χρέος κλάδων, σουίτες παλινδρόμησης | Σε εξέλιξη    |
| Φάση 7 | 90% δηλώσεις / γραμμές | Τελική σάρωση, κάλυψη κενών, αυστηρή ανοδική κλίμακα                  | Εκκρεμεί      |

Οι κλάδοι και οι συναρτήσεις θα πρέπει να ανεβαίνουν σταδιακά με κάθε φάση, αλλά ο κύριος σκληρός στόχος είναι οι δηλώσεις / γραμμές.

## Σημεία προτεραιότητας

Αυτά τα αρχεία έχουν τη χαμηλότερη κάλυψη γραμμών σήμερα (< 60%) και προσφέρουν την καλύτερη απόδοση για τις Φάσεις 6-7. Δημιουργήθηκε από το `coverage/coverage-summary.json` στις 2026-05-13:

| #   | Αρχείο                                                       | Γραμμές % |
| --- | ------------------------------------------------------------ | --------: |
| 1   | `open-sse/services/compression/validation.ts`                |     7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                            |     9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |     9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      |    10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  |    10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    |    10.96% |
| 7   | `open-sse/services/specificityRules.ts`                      |    11.28% |
| 8   | `src/mitm/systemCommands.ts`                                 |    12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                |    12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                |    12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`          |    13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` |    13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  |    13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         |    13.52% |
| 15  | `open-sse/services/compression/lite.ts`                      |    14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                             |    14.94% |
| 17  | `open-sse/services/compression/preservation.ts`              |    15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         |    15.54% |
| 19  | `open-sse/services/tierResolver.ts`                          |    16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                |    16.66% |

Θέματα για τις Φάσεις 6-7:

- Το `open-sse/services/compression/**` αποτελεί την πυκνότερη ομάδα χαμηλής κάλυψης και κυριαρχεί στο εναπομείναν κενό.
- Τα routes του API για batches και rerank (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) χρειάζονται tests σε επίπεδο handler.
- Οι προσαρμογείς cloud agent (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) και το `tierResolver.ts` χρειάζονται tests σεναρίων.
- Τα components UI των Docs και το `src/mitm/systemCommands.ts` έχουν χαμηλότερη προτεραιότητα, αλλά αποτελούν φθηνές κερδοφόρες διακλαδώσεις.

## Λίστα ελέγχου εκτέλεσης

### Φάση 1: 56.95% -> 60%

- [x] Διόρθωση μετρικής κάλυψης ώστε να αντικατοπτρίζει τον πηγαίο κώδικα αντί των αρχείων test
- [x] Διατήρηση ενός legacy script κάλυψης για σύγκριση
- [x] Καταγραφή της αρχικής γραμμής βάσης και των σημείων προτεραιότητας στο αποθετήριο
- [ ] Προσθήκη στοχευμένων tests για βοηθητικά εργαλεία χαμηλού ρίσκου:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Προσθήκη tests route για:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Φάση 2: 60% -> 65%

- [ ] Προσθήκη tests με υποστήριξη DB για:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Κάλυψη της συμπεριφοράς διακλαδώσεων σε:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Φάση 3: 65% -> 70%

- [ ] Προσθήκη tests αναλυτικών χρήσης για:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Επέκταση κάλυψης route για διαχείριση proxy και διακλαδώσεις ρυθμίσεων

### Φάση 4: 70% -> 75%

- [ ] Κάλυψη βοηθητικών translator και κεντρικών μονοπατιών μετάφρασης:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Φάση 5: 75% -> 80%

- [ ] Προσθήκη tests σε επίπεδο handler για:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Προσθήκη κάλυψης διακλαδώσεων executor για έλεγχο ταυτότητας ανά πάροχο, επαναλήψεις και παρακάμψεις endpoint

### Φάση 6: 80% -> 85%

- [ ] Ενσωμάτωση περισσότερων suites οριακών περιπτώσεων στο κύριο μονοπάτι κάλυψης
- [ ] Αύξηση κάλυψης συναρτήσεων για modules DB με αδύναμη κάλυψη constructor/helper
- [ ] Κλείσιμο κενών διακλαδώσεων σε `settings.ts`, `registeredKeys.ts`, `validation.ts` και βοηθητικά translator

### Φάση 7: 85% -> 90%

- [ ] Αντιμετώπιση των εναπομείναντων αρχείων χαμηλής κάλυψης ως εμποδίων
- [ ] Προσθήκη regression tests για κάθε σφάλμα παραγωγής χωρίς κάλυψη που διορθώθηκε κατά τη διάρκεια της προσπάθειας για 90%
- [ ] Ανύψωση του ορίου κάλυψης στο CI μόνο αφού η τοπική γραμμή βάσης είναι σταθερή για τουλάχιστον δύο διαδοχικές εκτελέσεις

## Πολιτική κλιμάκωσης

Ενημερώνετε τα όρια του `npm run test:coverage` μόνο αφού το έργο ξεπεράσει πραγματικά τον επόμενο ορόσημο με ικανοποιητικό περιθώριο.

**Τρέχουσα πύλη:** Το `npm run test:coverage` επιβάλλει **60 δηλώσεις / 60 γραμμές / 60 συναρτήσεις / 60 κλάδους** (η μετρική επαναβαθμολογήθηκε στο Quality-Gates Fase 6A.1 — η παλαιότερη βάση 82,58% ήταν διογκωμένη επειδή μετρούσε αρχεία δοκιμών και εξαιρούσε το `open-sse`). Η εντολή `test:coverage:legacy` διατηρεί την παλαιά μετρική 50/50/50 για ιστορική σύγκριση.

Για εφάπαξ ελέγχους ορίου έναντι της τελευταίας αναφοράς χρησιμοποιήστε:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Συνιστώμενη ακολουθία κλιμάκωσης (η σειρά είναι `δηλώσεις-γραμμές / κλάδοι / συναρτήσεις`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- τρέχουσα πύλη (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Ο επόμενος στόχος κλιμάκωσης είναι το `80/75/78` μόλις η κάλυψη κλάδων παραμείνει πάνω από 78% για δύο διαδοχικές εκτελέσεις.

## Γνωστό κενό

Η τρέχουσα εντολή κάλυψης μετράει την κύρια σουίτα μονάδων Node και συμπεριλαμβάνει τον πηγαίο κώδικα που προσεγγίζεται από αυτήν, συμπεριλαμβανομένου του `open-sse`. Δεν συγχωνεύει ακόμα την κάλυψη Vitest σε μία ενοποιημένη αναφορά. Αυτή η συγχώνευση αξίζει να γίνει αργότερα, αλλά δεν αποτελεί εμπόδιο για την έναρξη της ανόδου από 60% σε 80%.
