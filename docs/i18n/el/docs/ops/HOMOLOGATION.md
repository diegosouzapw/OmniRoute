# Homologation Suite (`npm run homolog`) (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Επικύρωση E2E σε πραγματικό περιβάλλον της εγκατάστασης του OmniRoute που εκτελείται στο VPS homologation
(`HOMOLOG_BASE_URL`, π.χ. `http://192.168.0.15:20128`). Μία εντολή αντικαθιστά τη χειροκίνητη
λίστα ελέγχου STOP #2 της έκδοσης με μια αυτοματοποιημένη εκτέλεση που παράγει αποδεικτικά στοιχεία.

## Τι καλύπτει

| Επίπεδο                     | Τι ελέγχει                                                                                                                                                                                                                                | Υλοποίηση                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — υγεία/ισοτιμία         | Το `/api/monitoring/health` αποκρίνεται με `200`, με `status: "healthy"` και την αναμενόμενη έκδοση                                                                                                                                       | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — προσωρινό κλειδί      | Σύνδεση διαχειριστή → το `POST /api/keys` δημιουργεί ένα API key περιορισμένης εμβέλειας για την εκτέλεση, το οποίο ανακαλείται (`DELETE /api/keys/:id`) σε ένα μπλοκ `finally` ανεξάρτητα από το αποτέλεσμα                              | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — επιφάνεια API         | Κατάλογος `/v1/models`, μια πραγματική μη συνεχούς ροής ολοκλήρωση συνομιλίας (μοντέλο κρίσιμης βαθμίδας, `max_tokens: 5`), ένα `401` για μη έγκυρο κλειδί και το δημόσιο `/api/monitoring/health`                                        | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — ροή SSE               | Πραγματική ολοκλήρωση συνομιλίας με ροή· επιβεβαιώνει `text/event-stream`, τουλάχιστον μία μεταβολή περιεχομένου και έναν τερματιστή `[DONE]`                                                                                             | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — πραγματικοί πάροχοι    | Ένα αίτημα συνομιλίας ελάχιστου κόστους ανά κρίσιμο πάροχο που υπάρχει στον ενεργό κατάλογο `/v1/models`, δημιουργούμενο δυναμικά μέσω του promptfoo                                                                                      | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — έλεγχος ταυτότητας UI | Συνδέεται μία φορά μέσω της πραγματικής φόρμας σύνδεσης και επαναχρησιμοποιεί τη συνεδρία (`storageState`) σε ολόκληρο το επίπεδο UI                                                                                                      | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — διαδρομές UI          | Κάθε στατικό `page.tsx` κάτω από το `src/app/(dashboard)/dashboard` (εντοπίζεται από το σύστημα αρχείων, ενώ οι δυναμικές διαδρομές `[param]` παραλείπονται) φορτώνεται χωρίς σφάλμα HTTP, σφάλμα σελίδας ή το όριο σφάλματος του Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — κρίσιμη ροή UI        | Δημιουργεί ένα API key μέσω του UI του dashboard και το ανακαλεί ξανά (δεν αφήνει υπολείμματα στο VPS)                                                                                                                                    | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — ενοποιημένη αναφορά    | Συγχωνεύει το httpYac (μέσω `junit-to-ctrf`), τον προσαρμογέα promptfoo→CTRF και το CTRF reporter του Playwright σε ένα `homolog-ctrf.json`, μαζί με ένα αναγνώσιμο από ανθρώπους `homolog-report/summary.md`                             | `scripts/homolog/run.mjs`                                                     |

Καμία εμπλοκή LLM στην ίδια την επανάληψη — πρόκειται για μια ντετερμινιστική συστοιχία δοκιμών παλινδρόμησης,
όχι για αξιολόγηση. Η AI εμπλέκεται μόνο σε μελλοντικές εργασίες συντήρησης (δείτε τον Οδικό Χάρτη παρακάτω).

## Προαπαιτούμενα

1. Αντιγράψτε το `.env.homolog.example` στο `.env.homolog` (αγνοείται από το git — μην το κάνετε ποτέ commit) και συμπληρώστε:
   - `HOMOLOG_BASE_URL` — το περιβάλλον ανάπτυξης-στόχος, π.χ. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — ο κωδικός πρόσβασης διαχείρισης του dashboard για το συγκεκριμένο περιβάλλον.
   - `HOMOLOG_CRITICAL_PROVIDERS` — προθέματα παρόχων, διαχωρισμένα με κόμματα, για τα οποία εκτελείται ένα πραγματικό
     δοκιμαστικό αίτημα συνομιλίας smoke (π.χ. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — αφήστε το κενό στις κανονικές εκτελέσεις· η σουίτα δημιουργεί και ανακαλεί το
     δικό της προσωρινό κλειδί. Ορίστε το μόνο για την αποσφαλμάτωση ενός μεμονωμένου επιπέδου μεμονωμένα.
2. Εκτελέστε `npm install` στο αποθετήριο (οι εξαρτήσεις της σουίτας — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — είναι κανονικές devDependencies).
3. Εκτελέστε `npx playwright install` αν τα εκτελέσιμα αρχεία του προγράμματος περιήγησης δεν υπάρχουν ήδη.

## Τρόπος εκτέλεσης

```bash
npm run homolog
```

Για επικύρωση σε ένα περιβάλλον ανάπτυξης του οποίου η έκδοση δεν αντιστοιχεί στο τοπικό `package.json`
(π.χ. ένα περιβάλλον homologation που βρίσκεται ακόμη σε προηγούμενη έκδοση patch), παρακάμψτε ρητά την
αναμενόμενη έκδοση:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Η εκτέλεση τερματίζεται με μη μηδενικό κωδικό αν αποτύχει οποιοδήποτε επίπεδο και επιχειρεί πάντα να ανακαλέσει το προσωρινό
κλειδί API που δημιούργησε, ακόμη και σε περίπτωση αποτυχίας (μπλοκ `finally` στο `scripts/homolog/run.mjs`).

## Ανάγνωση της αναφοράς

Όλα τα αποτελέσματα αποθηκεύονται στο `homolog-report/` (αγνοείται από το git):

- `summary.md` — ο ίδιος πίνακας που εκτυπώνεται στο stdout, με μία γραμμή ανά επίπεδο (✅/❌ + λεπτομέρειες).
- `homolog-ctrf.json` — η ενοποιημένη αναφορά CTRF (συγχώνευση αποτελεσμάτων API/SSE, δοκιμών smoke παρόχων και
  UI) — αυτό είναι το τεχνούργημα που πρέπει να επισυνάπτεται στη λίστα ελέγχου STOP #2 μιας έκδοσης.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — οι
  ανεπεξέργαστες/ενδιάμεσες αναφορές ανά επίπεδο.
- `promptfooconfig.yaml`, `provider-misses.json` — η παραγόμενη ρύθμιση παραμέτρων του promptfoo για
  την τρέχουσα εκτέλεση και τυχόν κρίσιμοι πάροχοι που απουσίαζαν από τον ενεργό κατάλογο.

Μια αποτυχία στο L0 διακόπτει αμέσως την εκτέλεση (δεν δημιουργείται προσωρινό κλειδί), καθώς μια ασυμφωνία έκδοσης/κατάστασης
σημαίνει ότι κάθε επόμενο επίπεδο θα επικύρωνε το λάθος περιβάλλον ανάπτυξης.

## Επανακαθορισμός της γραμμής βάσης όταν το UI αλλάζει έγκυρα

Τα L4b (δοκιμή smoke διαδρομών) και L4c (ροή UI κλειδιού API) καθοδηγούνται από πραγματικούς εντοπιστές DOM και όχι από
στιγμιότυπα, επομένως οι περισσότερες έγκυρες αλλαγές στο UI δεν απαιτούν ενημέρωση της σουίτας. Όταν μια αλλαγή
καταστήσει έναν εντοπιστή μη λειτουργικό (π.χ. μετονομασία της ετικέτας ενός κουμπιού ή μετακίνηση μιας σελίδας ρυθμίσεων):

1. Επιβεβαιώστε ξανά τον εντοπιστή με βάση τον τρέχοντα πηγαίο κώδικα (οι προδιαγραφές τεκμηριώνουν ήδη σε ποιο
   αρχείο/γραμμή επιβεβαιώθηκε κάθε εντοπιστής — ακολουθήστε το ίδιο μοτίβο, μην κάνετε εικασίες).
2. Ενημερώστε την προδιαγραφή στο `tests/homolog/ui/`.
3. Εκτελέστε ξανά το `npm run homolog` (ή μόνο την επηρεαζόμενη προδιαγραφή Playwright) στο VPS για να
   επιβεβαιώσετε τη διόρθωση και, στη συνέχεια, κάντε commit.

Δεν υπάρχει γραμμή βάσης οπτικής σύγκρισης/σύγκρισης pixel σε αυτήν τη σουίτα (F1) — ανατρέξτε στον Οδικό χάρτη για αυτό.

## Οδικός χάρτης (F2 / F3)

Ο σχεδιασμός και η σταδιακή διάθεση βρίσκονται στην εσωτερική προδιαγραφή σχεδιασμού
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (χωρίς σύνδεσμο — εσωτερικό
τεχνούργημα του `_tasks/`, δεν αποτελεί μέρος της τεκμηρίωσης που παρακολουθείται σε αυτό το αποθετήριο). Σύνοψη:

- **F2** — πλήρης καταγραφή περιήγησης → οι Playwright Test Agents (`planner`/`generator`)
  τη μετατρέπουν σε προδιαγραφές ροών (δημιουργία combo, δοκιμή παρόχου, επεξεργασία ρυθμίσεων, εργαλεία MCP) +
  γραμμή βάσης οπτικού ελέγχου παλινδρόμησης (Lost Pixel) με μάσκες πάνω από δυναμικά δεδομένα (μετρικές,
  χρονικές σημάνσεις, αρχεία καταγραφής) + μια ρουτίνα συντήρησης `healer` ανά έκδοση.
- **F3** — κάλυψη ανθεκτικότητας/συμβάσεων/διασυνδέσεων: toxiproxy + ένας ψεύτικος πάροχος συμβατός με OpenAI
  στο devbox, ένα combo `homolog-resilience` στο VPS που παραπέμπει σε αυτό
  (εισαγωγή timeout → επιβεβαίωση εναλλακτικής διαδρομής + άνοιγμα/κλείσιμο circuit breaker μέσω
  `/api/monitoring/health`)· ελεγχόμενες δοκιμές συμβάσεων Schemathesis με βάση το
  `docs/openapi.yaml` (χαμηλό `--max-examples`, σταθερά seeds, μόνο endpoints που δεν αφορούν LLM)· και
  ενσωμάτωση του `npm run homolog` + του `summary.md` του στη φάση STOP #2 του `/generate-release`.
