# Quality Gates Reference (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Το παρόν έγγραφο αποτελεί την επίσημη αναφορά για όλες τις πύλες ποιότητας CI στο OmniRoute.
Περιγράφει κάθε πύλη, τι επικυρώνει, σε ποια εργασία CI εκτελείται, αν χρησιμοποιεί
γραμμή βάσης ratchet ή πολιτική επιτυχίας/αποτυχίας, καθώς και αν εμποδίζει το build ή είναι συμβουλευτική.

Για μια σύντομη σύνοψη και την πολιτική της λίστας επιτρεπόμενων, ανατρέξτε στην ενότητα "Πύλες ποιότητας και ratchets"
στο `AGENTS.md`. Για την κριτική αξιολόγηση, την ταξινόμηση ωριμότητας και το ανεξάρτητο από εργαλεία
σχέδιο αναπαραγωγής του ίδιου συστήματος, ανατρέξτε στο
[Εγχειρίδιο Πυλών Ποιότητας](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Απογραφή Πυλών (~90 scripts)

Τα scripts βρίσκονται στους καταλόγους `scripts/check/` (πύλες πολιτικής) και `scripts/quality/` (μηχανισμός ratchet).
Η πηγή αλήθειας του CI είναι το `.github/workflows/ci.yml`.

### Γρήγορη διαδρομή για PR έκδοσης (`quality.yml`)

Το `.github/workflows/quality.yml` εκτελείται σε PRs που στοχεύουν το `release/**`. Διατηρεί την απρόσκοπτη ροή των
branches των συνεισφερόντων με γρήγορες πύλες φιλτραρισμένες βάσει διαδρομών, καθώς και ένα συμβουλευτικό σήμα production build για αλλαγές
κώδικα:

| Job                                              | Πεδίο εφαρμογής                                                                                                                                                                                                                                | Δεσμευτικό                                                                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Μη πρόχειρα PRs κώδικα και branches ουράς του Mergify· Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` με `OMNIROUTE_USE_TURBOPACK=1`· χωρίς μεταφόρτωση artifact, επειδή κανένα μεταγενέστερο job ποιότητας δεν το καταναλώνει | **Συμβουλευτικό** (`continue-on-error: true`· καταργήστε το έπειτα από μία εβδομάδα σταθερών εκτελέσεων PR έκδοσης) |
| `Docs Gates (fast-path)`                         | PRs τεκμηρίωσης/κώδικα· αναφορές τεκμηρίωσης API και docs-all                                                                                                                                                                                  | Ναι                                                                                                                 |
| `Fast Quality Gates`                             | PRs κώδικα· στατικοί έλεγχοι, typecheck, typecheck του dashboard, επηρεαζόμενα unit tests                                                                                                                                                      | Ναι                                                                                                                 |
| `Forgotten sibling tests`                        | PRs κώδικα· ιχνηλάτηση αλλαγμένων modules προς στατικούς consumers και υποψήφια συγγενικά tests· οι διαδρομές barrel και dynamic-import αναφέρονται ως συμβουλευτικά διαγνωστικά, μαζί με τις αναφερόμενες εξαιρέσεις της allowlist            | **Συμβουλευτικό**                                                                                                   |
| `Vitest (fast-path)`                             | PRs κώδικα· γρήγορη σουίτα vitest                                                                                                                                                                                                              | Ναι                                                                                                                 |
| `Unit Tests fast-path`                           | PRs κώδικα· σουίτα unit tests 4 shards                                                                                                                                                                                                         | Ναι                                                                                                                 |
| `No new ESLint warnings`                         | PRs κώδικα· έλεγχος lint που λαμβάνει υπόψη τις καταστολές                                                                                                                                                                                     | Ναι για PRs ίδιας προέλευσης, συμβουλευτικό για forks                                                               |
| `Merge integrity (changelog + generated skills)` | Μη πρόχειρα PRs· συγχρονισμός changelog και παραγόμενων skills                                                                                                                                                                                 | Ναι για PRs ίδιας προέλευσης, συμβουλευτικό για forks                                                               |

#### Αναφορά ξεχασμένων συγγενικών tests

Το `npm run check:forgotten-sibling-tests` επαναχρησιμοποιεί τον resolver εισαγωγών πίσω από τον χάρτη επιπτώσεων των tests.
Για κάθε αλλαγμένο production module, αναφέρει ντετερμινιστικές αλυσίδες
`changed module/symbol -> static consumer -> candidate sibling test` όταν το υποψήφιο
test απουσιάζει από το diff του pull request. Η σύνοψη Markdown και το αποτέλεσμα JSON διατηρούνται ως
το workflow artifact `forgotten-sibling-tests` για βαθμονόμηση πριν από οποιαδήποτε μετάβαση σε δεσμευτική εφαρμογή.

Τα barrel re-exports και τα dynamic imports αποτελούν μόνο διαγνωστικά επίλυσης· δεν δημιουργούν ποτέ
δεσμευτικό εύρημα. Οι ελεγμένες εξαιρέσεις βρίσκονται στο
`config/quality/forgotten-sibling-allowlist.json`. Κάθε καταχώριση πρέπει να κατονομάζει τον consumer και το υποψήφιο
test, να παρέχει συγκεκριμένη αιτιολόγηση και να παραπέμπει σε ένα GitHub issue ή pull request. Οι μη έγκυρες καταχωρίσεις προκαλούν
αποτυχία εκ προοιμίου. Οι εξαιρέσεις δεν μπορούν να αποκρύψουν ένα διαγραμμένο υποψήφιο test ή ένα diff που προσθέτει `.skip`/`.todo`·
η αποδυνάμωση assertions και άλλες μορφές συγκάλυψης εξακολουθούν να καλύπτονται από την ανεξάρτητα δεσμευτική
πύλη `check:test-masking`.

### Job: `lint`

Εκτελείται σε κάθε PR προς το `main`. Αποκλείει τη συγχώνευση σε περίπτωση αποτυχίας.

| Σενάριο (`npm run ...`)           | Επαληθεύει                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Αποκλειστικό                                  |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `check:node-runtime`              | Η έκδοση του Node.js βρίσκεται εντός του υποστηριζόμενου εύρους                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ναι                                           |
| `check:cycles`                    | Κυκλικές εισαγωγές — όλες οι μονάδες των `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ναι                                           |
| `check:route-validation:t06`      | Υπάρχουν σχήματα Zod σε όλες τις διαδρομές (πολιτική Βαθμίδας 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ναι                                           |
| `check:any-budget:t11`            | Το πλήθος των `@ts-expect-error // any` δεν υπερβαίνει το όριο (catraca Βαθμίδας 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ναι                                           |
| `check:provider-consistency`      | Κάθε πάροχος στο `providers.ts` έχει μια αντίστοιχη καταχώριση στο `providerRegistry.ts` (και αντίστροφα, εντός της λίστας επιτρεπόμενων)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ναι                                           |
| `check:model-lifecycle`           | Οι τρεις πίνακες δρομολόγησης που συντηρούνται χειροκίνητα παραμένουν συνεπείς με το στιγμιότυπο κύκλου ζωής που είναι καταχωρισμένο στο αποθετήριο (#11503): το `FITNESS_TABLE` (`taskFitness.ts`) δεν βαθμολογεί κανένα καταργημένο id που μπορεί να δρομολογήσει το `REGISTRY`· κάθε στόχος του `BUILT_IN_ALIASES` υπάρχει στο `REGISTRY` και απουσιάζει από το στιγμιότυπο καταργημένων id· κάθε καταργημένο id που εξακολουθεί να βρίσκεται στο `REGISTRY` προωθείται ή παρατίθεται στο `allowedRetiredInCatalog`· και καμία πηγή ή κανένας στόχος του `DEFAULT_DEGRADATION_MAP` δεν εμφανίζεται ως καταργημένος σε αυτό το στιγμιότυπο. Αυτό δεν αποδεικνύει ότι ένα μοντέλο εξυπηρετείται επί του παρόντος από ενεργό upstream. Εκτός σύνδεσης — συγκρίνει με το `config/quality/model-lifecycle.json`, το οποίο ανανεώνεται χειροκίνητα με `npm run quality:refresh-model-lifecycle` (δίκτυο· δεν είναι ενσωματωμένο στο CI). Το `allowedRetiredInCatalog` είναι ένας μηχανισμός σταδιακής μείωσης: προσθέστε μια καταχώριση μόνο μαζί με ένα ζήτημα παρακολούθησης. | Ναι                                           |
| `check:fetch-targets`             | Κάθε `fetch("/api/...")` στο `src/` της πλευράς πελάτη επιλύεται σε ένα πραγματικό `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ναι                                           |
| `check:deps`                      | Όλες οι εξαρτήσεις που μπορούν να εγκατασταθούν με `npm install` σε κάθε `package.json` του αποθετηρίου βρίσκονται στο `dependency-allowlist.json`· επισημαίνονται νέα πακέτα χωρίς καρφιτσωμένη έκδοση ή με ονόματα που παραπέμπουν σε slopsquatting                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ναι                                           |
| `audit:deps`                      | `npm audit` (ριζικός κατάλογος + electron) — χωρίς συμβουλευτικές ειδοποιήσεις υψηλής/κρίσιμης σοβαρότητας (επικαλύπτεται με το osv `check:vuln-ratchet`· δείτε το Ανεκτέλεστο Εξορθολογισμού)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ναι                                           |
| `check:lockfile`                  | Ακεραιότητα του `package-lock.json` — μητρώο https, κατακερματισμοί ακεραιότητας, χωρίς παρακάμψεις κεντρικού υπολογιστή                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ναι                                           |
| `check:licenses`                  | Λίστα επιτρεπόμενων αδειών SPDX για εξαρτήσεις παραγωγής                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ναι                                           |
| `check:tracked-artifacts`         | Χωρίς παραγόμενα τεχνουργήματα / καταχωρισμένους συμβολικούς συνδέσμους `node_modules` (εκτελείται επίσης στο husky pre-commit· το pre-push είναι σκόπιμα ελαφρύ — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ναι                                           |
| `check:ai-attribution`            | Χωρίς καταληκτική γραμμή `Co-Authored-By` από AI/bot ή υποσέλιδο δημιουργίας από AI στα commits, στον τίτλο ή στο σώμα του PR — Αυστηρός Κανόνας #16 (στον βρόχο γρήγορων ελέγχων του `quality.yml` για PR→`release/**` — διαβάζει το ωφέλιμο φορτίο του συμβάντος και δεν εκτελεί καμία ενέργεια εκτός PR — και σε ένα βήμα μόνο για PR στο lint του `ci.yml` για PR→`main`· επίσης στο hook `commit-msg` του husky· επιτρέπονται ανθρώπινοι συν-συγγραφείς· #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `check:vitest-exclusions`         | Κάθε εξαίρεση του Vitest αναφέρει ένα ζήτημα παρακολούθησης και εμφανίζεται στο `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ναι                                           |
| `check:file-size`                 | Κανένα αρχείο πηγαίου κώδικα δεν υπερβαίνει το όριο ανά επέκταση (καστάνια: παγιωμένα μεγάλα αρχεία στη λίστα `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ναι                                           |
| `check:error-helper`              | Οι αποκρίσεις σφάλματος σε executors/handlers χρησιμοποιούν `buildErrorBody()` / `sanitizeErrorMessage()` (Αυστηρός Κανόνας #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ναι                                           |
| `check:migration-numbering`       | Τα αρχεία SQL μεταβάσεων είναι αριθμημένα διαδοχικά, χωρίς κενά ή διπλότυπα                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ναι                                           |
| `check:public-creds`              | Δεν υπάρχουν κυριολεκτικές τιμές OAuth `client_id`/`client_secret` ή κλειδιά Firebase Web εκτός του `publicCreds.ts` (Αυστηρός Κανόνας #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ναι                                           |
| `check:db-rules`                  | Δεν υπάρχει ανεπεξέργαστη SQL εκτός των modules του `src/lib/db/`· δεν υπάρχουν barrel imports από το `localDb.ts` (Αυστηροί Κανόνες #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ναι                                           |
| `check:known-symbols`             | Οι εκτελεστές παρόχων, οι στρατηγικές δρομολόγησης και οι μεταφραστές που είναι καταχωρισμένοι στους πίνακες αποστολής τους αντιστοιχούν στα αρχεία στον δίσκο — χωρίς ορφανά ή μη δηλωμένα σύμβολα                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ναι                                           |
| `check:route-guard-membership`    | Κάθε διαδρομή που εκκινεί μια θυγατρική διεργασία ταξινομείται από τη `isLocalOnlyPath()` (Αυστηροί Κανόνες #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Ναι                                           |
| `check:test-discovery`            | Κάθε αρχείο `*.test.ts` / `*.spec.ts` στο αποθετήριο συλλέγεται από τουλάχιστον έναν εκτελεστή δοκιμών (μηχανισμός καστάνιας: η λίστα ορφανών στο `test-discovery-baseline.json` μπορεί μόνο να συρρικνώνεται)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ναι                                           |
| `check:agent-skills-sync`         | Τα παραγόμενα τεχνουργήματα agent-skills αντιστοιχούν στον κατάλογο προέλευσής τους (χωρίς αποκλίσεις)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `check:provider-asset-provenance` | Τα λογότυπα/τεχνουργήματα των παρόχων διαθέτουν καταγεγραμμένη εγγραφή προέλευσης                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `lint:json`                       | Τα αρχεία ρυθμίσεων JSON αναλύονται επιτυχώς και πληρούν τους κανόνες lint του αποθετηρίου                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `typecheck:core`                  | Μεταγλώττιση TypeScript χωρίς σφάλματα (μόνο συμβουλευτικές προειδοποιήσεις)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ναι                                           |
| `typecheck:noimplicit:core`       | Αυστηρό `noImplicitAny` — μελλοντικός στόχος· πολλά προϋπάρχοντα σημεία κλήσης εξακολουθούν να χρειάζονται επισημειώσεις                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | **Συμβουλευτικό** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | Το `tsc` περιορίζεται στο `src/app/(dashboard)/**` (#7033) — η επιμελημένη λίστα επιτρεπόμενων 27 αρχείων του `typecheck:core` δεν περιλαμβάνει κανένα TSX του dashboard, ενώ ούτε το `next build` εκτελεί ποτέ έλεγχο τύπων σε αυτό (`next.config.mjs` ορίζει `ignoreBuildErrors: true`), επομένως οι παλινδρομήσεις ορφανών αναγνωριστικών εκεί (#6625/#6909) ήταν αόρατες στο CI. Οι διαφορές συγκρίνονται με μια παγιωμένη γραμμή βάσης του πλήθους ανά αρχείο/ανά κωδικό TS (`config/quality/dashboard-typecheck-baseline.json`, με το ίδιο μοτίβο επιβολής παλαιότητας όπως το `check:known-symbols`) — μόνο ΝΕΑ σφάλματα πέρα από το πλήθος της γραμμής βάσης προκαλούν αποτυχία της πύλης· μειώστε σταδιακά τη γραμμή βάσης με `--update` όταν διορθώνεται ένα προϋπάρχον σφάλμα.                                                                                                                                                                                                                                                                                    | Ναι                                           |

### Εργασία: `quality-gate`

Εκτελείται μετά το `test-coverage`. Αποκλείει τη συγχώνευση σε περίπτωση αποτυχίας.

| Script                       | Επαληθεύει                                                                                                                                                                                               | Αποκλεισμός                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | Παράγει το `quality-metrics.json` (πλήθος προειδοποιήσεων ESLint, κάλυψη από τη συγχωνευμένη αναφορά shard)                                                                                              | Ναι (προηγείται του ratchet) |
| `quality:ratchet`            | Καμία μέτρηση στο `quality-baseline.json` δεν έχει υποχωρήσει (προειδοποιήσεις ESLint ≤ γραμμή βάσης· κάλυψη ≥ γραμμή βάσης)                                                                             | Ναι                          |
| `check:duplication`          | Η επανάληψη κώδικα (jscpd@4) δεν υπερβαίνει τη γραμμή βάσης στο `quality-baseline.json`                                                                                                                  | Ναι                          |
| `check:complexity`           | Η κυκλωματική πολυπλοκότητα σε επίπεδο αρχείου δεν υπερβαίνει το όριο (βασικοί κανόνες ESLint `complexity` + `max-lines-per-function`)                                                                   | Ναι                          |
| `check:cognitive-complexity` | Ratchet γνωστικής πολυπλοκότητας (`eslint-plugin-sonarjs`) — ξεχωριστή εκτέλεση ESLint· το CI εκτελεί και τα δύο συγχωνευμένα στο ενιαίο βήμα `check:complexity-ratchets`                                | Ναι                          |
| `check:dead-code`            | Το ratchet μη χρησιμοποιούμενων exports / αρχείων (knip) δεν υποχωρεί σε σχέση με τη γραμμή βάσης                                                                                                        | Ναι                          |
| `check:compression-budget`   | Προϋπολογισμός benchmark συμπίεσης — τα κατώτατα όρια εξοικονόμησης token ανά μηχανή δεν πρέπει να υποχωρούν                                                                                             | Ναι                          |
| `check:type-coverage`        | Το ratchet ποσοστού τυποποιημένου κώδικα (`type-coverage`) δεν υποχωρεί· αντικαθιστά σε μεγάλο βαθμό το `typecheck:noimplicit:core`                                                                      | Ναι                          |
| `check:codeql-ratchet`       | Το πλήθος ανοικτών ειδοποιήσεων CodeQL δεν αυξάνεται (ανάγνωση μέσω `gh api`· ομαλή παράλειψη χωρίς token) — για τη συχνότητα ανανέωσης και τη μη αυτόματη ενεργοποίηση: δείτε «CodeQL ratchet» παρακάτω | Ναι                          |

### Εργασία: `quality-extended`

Ολόκληρη η εργασία είναι συμβουλευτική (`continue-on-error: true`). Τα ratchets που βασίζονται στο npm εκτελούνται
κανονικά· οι εξωτερικοί σαρωτές εγκαθίστανται μέσω `gh release download` και παραλείπονται αυτόματα (exit 0)
όταν εξακολουθεί να απουσιάζει κάποιο εκτελέσιμο αρχείο.

| Script                   | Επαληθεύει                                                                                                                                                                                                                            | Αποκλεισμός       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `check:circular-deps`    | Δεν υπάρχουν κυκλικές εξαρτήσεις (dpdm)                                                                                                                                                                                               | **Συμβουλευτικό** |
| `check:bundle-size`      | Το μέγεθος του bundle δεν υπερβαίνει το όριο                                                                                                                                                                                          | **Συμβουλευτικό** |
| `check:secrets`          | Σάρωση για μυστικά (gitleaks) — παραλείπεται αν απουσιάζει το εκτελέσιμο αρχείο                                                                                                                                                       | **Συμβουλευτικό** |
| `check:vuln-ratchet`     | Οι ευπάθειες εξαρτήσεων (osv-scanner) δεν αυξάνονται — παραλείπεται αν απουσιάζει το εκτελέσιμο αρχείο                                                                                                                                | **Συμβουλευτικό** |
| `check:workflows`        | Έλεγχος lint των workflow (actionlint + zizmor) — παραλείπεται αν απουσιάζουν τα εκτελέσιμα αρχεία                                                                                                                                    | **Συμβουλευτικό** |
| `check:openapi-breaking` | Αλλαγές που προκαλούν ασυμβατότητα στη δημόσια σύμβαση API (`openapi.yaml`) σε σχέση με τον βασικό κλάδο (oasdiff) — παράγει `openapiBreaking=N`· παραλείπεται αν απουσιάζει το oasdiff ή δεν μπορεί να επιλυθεί η βασική προδιαγραφή | **Συμβουλευτικό** |

### Εργασία: `docs-sync-strict`

Εκτελείται σε κάθε PR προς το `main`. Αποκλείει τη συγχώνευση σε περίπτωση αποτυχίας.

| Script                         | Ελέγχει                                                                                                                                                                                                                        | Αποκλείει                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `check:docs-all`               | Μετα-έλεγχος που εκτελεί διαδοχικά τους 6 επιμέρους ελέγχους παρακάτω                                                                                                                                                          | Ναι                          |
| ↳ `check:docs-sync`            | Συνέπεια εκδόσεων μεταξύ CHANGELOG / OpenAPI / llm.txt                                                                                                                                                                         | Ναι                          |
| ↳ `check:docs-counts`          | Οι αριθμοί στο κείμενο (πλήθος παρόχων, πλήθος μεταβάσεων κ.λπ.) βρίσκονται εντός του προσαρμοζόμενου ορίου των πραγματικών αριθμών                                                                                            | Ναι                          |
| ↳ `check:env-doc-sync`         | Κάθε μεταβλητή περιβάλλοντος στο `.env.example` τεκμηριώνεται σε πίνακα της τεκμηρίωσης και αντιστρόφως                                                                                                                        | Ναι                          |
| ↳ `check:deprecated-versions`  | Δεν υπάρχουν παρωχημένες συμβολοσειρές εκδόσεων στην τεκμηρίωση                                                                                                                                                                | Ναι                          |
| ↳ `check:doc-links`            | Οι εσωτερικοί σύνδεσμοι markdown στην τεκμηρίωση αντιστοιχούν σε πραγματικά αρχεία (μορφή `[text]`/`(path)`)                                                                                                                   | Ναι                          |
| ↳ `check:fabricated-docs`      | Οι διαδρομές, οι μεταβλητές περιβάλλοντος, οι εντολές CLI, τα ονόματα hook και οι διαδρομές αρχείων που αναφέρονται στην τεκμηρίωση υπάρχουν στη βάση κώδικα. Αυστηρός έλεγχος μέσω `--strict`· ήπια αποτυχία χωρίς τη σημαία. | Ναι (μέσω `--strict` στο CI) |
| `check:cli-i18n`               | Οι συμβολοσειρές εντολών CLI υπάρχουν σε όλα τα αρχεία τοπικοποίησης i18n                                                                                                                                                      | Ναι                          |
| `check:openapi-coverage`       | Η προδιαγραφή OpenAPI καλύπτει τουλάχιστον ένα προσαρμοζόμενο κατώτατο όριο πραγματικών διαδρομών                                                                                                                              | Ναι                          |
| `check:openapi-security-tiers` | Οι επισημάνσεις επιπέδων ασφαλείας στο `openapi.yaml` είναι συνεπείς με τις ταξινομήσεις του `routeGuard.ts`                                                                                                                   | **Συμβουλευτικό**            |
| `check:openapi-routes`         | Κάθε διαδρομή στο `openapi.yaml` αντιστοιχεί σε πραγματικό `route.ts` (προστασία από επινοήσεις)                                                                                                                               | Ναι                          |
| `check:docs-symbols`           | Κάθε αναφορά `/api/...` στο `docs/**/*.md` αντιστοιχεί σε πραγματικό `route.ts` (προστασία από επινοήσεις)                                                                                                                     | Ναι                          |
| `i18n translation drift`       | Μη μεταφρασμένα κλειδιά στα αρχεία τοπικοποίησης i18n — μόνο προειδοποίηση                                                                                                                                                     | **Συμβουλευτικό**            |

### Εργασία: `i18n-ui-coverage`

| Script                                  | Ελέγχει                                                                                                                                                                                                                                         | Αποκλείει         |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `check-ui-keys-coverage` (ενσωματωμένο) | Η κάλυψη κλειδιών i18n του UI είναι ≥ 65%                                                                                                                                                                                                       | Ναι               |
| `check-ui-value-drift` (ενσωματωμένο)   | Η επανεγγραφή μιας αγγλικής **τιμής** δεν αφήνει πίσω καμία παρωχημένη μετάφραση                                                                                                                                                                | Ναι               |
| `check-new-key-coverage` (ενσωματωμένο) | Ένα **νέο** αγγλικό κλειδί μεταφράζεται σε κάθε τοπικοποίηση — ένας δείκτης `__MISSING__:` απορρίπτεται                                                                                                                                         | Ναι               |
| `check-translation-ratio`               | Η αναλογία πραγματικών μεταφράσεων ανά τοπικοποίηση (τιμές ίδιες με τα αγγλικά / σύμβολα κράτησης θέσης / ελλείποντα φύλλα εκτός της λίστας εξαιρέσεων) δεν πρέπει να υπερβαίνει το `config/quality/i18n-translation-baseline.json` + περιθώριο | **Συμβουλευτικό** |

Απαιτεί `fetch-depth: 0` — ο έλεγχος απόκλισης τιμών συγκρίνει με diff το `en.json` ως προς τη βάση συγχώνευσης.

#### `check-ui-value-drift` — έλεγχος παρωχημένων μεταφράσεων

Εντοπίζει τη μία παλινδρόμηση i18n που οι άλλοι έλεγχοι δεν μπορούν από τη δομή τους να δουν: μια αγγλική τιμή
επανεγγράφεται και οι μεταφράσεις που προέκυψαν από την _προηγούμενη_ αγγλική παραμένουν, με αποτέλεσμα
οι μη αγγλόφωνοι χρήστες να συνεχίζουν να διαβάζουν κείμενο με βέβαιη διατύπωση, το οποίο πλέον είναι λανθασμένο.

Αυτό κυκλοφόρησε πράγματι. Το `oauthModal.googleOAuthWarning` επανεγγράφηκε όταν προστέθηκε το βοηθητικό πρόγραμμα
σύνδεσης Antigravity (#5203)· **39 από τις 43 τοπικοποιήσεις** διατήρησαν κείμενο που έλεγε στους διαχειριστές να «αντιγράψουν
ολόκληρο το URL και να το επικολλήσουν παρακάτω» — μια ροή που δεν μπορεί να ολοκληρωθεί για τον συγκεκριμένο πάροχο. Παρέμεινε
απαρατήρητο έως το #8463 επειδή:

- το `sync-ui-keys` συμπληρώνει μόνο κλειδιά που **απουσιάζουν**, ποτέ κλειδιά που είναι **παρωχημένα**·
- το `check-ui-keys-coverage` μετρά την _παρουσία_ κλειδιών, επομένως μια παρωχημένη μετάφραση θεωρείται καλυμμένη·
- το `check-translation-drift` παρακολουθεί τα αντίγραφα τεκμηρίωσης `docs/i18n/<locale>/**.md` —
  δεν διαβάζει ποτέ το `src/i18n/messages/*.json`. Αποτελεί αποκλειστικό έλεγχο στην εργασία `docs-sync-strict` μετά τον
  επανασυγχρονισμό του 2026-09: επεξεργασία βασικού εγγράφου → `npm run i18n:run -- --files=<doc>` (ανά ενότητα, χαμηλού κόστους).

**Με επίγνωση των διαφορών, όχι βασισμένο σε baseline.** Συγκρίνει το `en.json` στη βάση συγχώνευσης με το
δέντρο εργασίας· για κάθε κλειδί του οποίου άλλαξε η αγγλική τιμή, οποιαδήποτε γλωσσική έκδοση εξακολουθεί να περιέχει μια
ανέγγιχτη μετάφραση θεωρείται παρωχημένη. Αυτό σκόπιμα **παγώνει το προϋπάρχον χρέος** — μια διαφορά
δεν μπορεί να αποκαλύψει από ποιο παλιό αγγλικό κείμενο προήλθε μια μακροχρόνια μετάφραση, επομένως η πύλη αξιολογεί
μόνο ό,τι επηρεάζει η τρέχουσα αλλαγή. Η εναλλακτική λύση (ένα baseline hash ανά κλειδί) θα απαιτούσε
ένα παραγόμενο αρχείο ~600 KB, 3× μεγαλύτερο από το μεγαλύτερο υπάρχον baseline, το οποίο θα άλλαζε σε κάθε PR διεθνοποίησης.

Υπάρχουν δύο τρόποι για να ικανοποιηθεί:

1. ενημερώστε τις επηρεαζόμενες μεταφράσεις ή
2. ορίστε τις σε `__MISSING__:<new english>` — κατά την εκτέλεση παρέχεται τότε το διορθωμένο αγγλικό κείμενο
   (`src/i18n/request.ts::deepMergeFallback`, #7258) και το κλειδί μπαίνει στην ουρά για μετάφραση.

Αν άλλαξε το **νόημα** της συμβολοσειράς, προτιμήστε τη **μετονομασία του κλειδιού**: ένα νέο κλειδί δεν μπορεί να κληρονομήσει
μια παρωχημένη μετάφραση. Αυτό είναι το μοτίβο που χρησιμοποιήθηκε στο #8463.

```bash
npm run i18n:check-value-drift          # αυστηρός έλεγχος (όπως εκτελείται στο CI)
npm run i18n:check-value-drift:warn     # μόνο αναφορά
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Τερματίζει με κωδικό 0 και `SKIP reason=base-unresolved` όταν δεν είναι δυνατή η ανάγνωση του βασικού καταλόγου (ρηχός
κλώνος χωρίς το base ref), ακολουθώντας τη συμπεριφορά του `check-openapi-breaking`.

### Εργασία: `i18n`

Πλήρης πίνακας επικύρωσης διεθνοποίησης (μία εργασία ανά γλωσσική έκδοση). Ολόκληρη η εργασία είναι συμβουλευτική.

| Script                          | Επικυρώνει                               | Αποκλεισμός συγχώνευσης                                               |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------------------------- |
| `validate_translation.py quick` | Πληρότητα μετάφρασης ανά γλωσσική έκδοση | **Συμβουλευτικό** (`continue-on-error: true` σε ολόκληρη την εργασία) |

### Εργασία: `pr-test-policy`

Εκτελείται μόνο σε pull requests.

| Script                 | Επικυρώνει                                                                                                                                                       | Αποκλεισμός συγχώνευσης |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `check:pr-test-policy` | Τα PR που αλλάζουν κώδικα παραγωγής στα `src/`, `open-sse/`, `electron/` ή `bin/` πρέπει να περιλαμβάνουν ή να ενημερώνουν δοκιμές (Αυστηρός Κανόνας #8)         | Ναι                     |
| `check:test-masking`   | Τα τροποποιημένα αρχεία δοκιμών δεν μειώνουν το καθαρό πλήθος assertions ούτε προσθέτουν ταυτολογίες `assert.ok(true)`                                           | Ναι                     |
| `check:pr-evidence`    | Το σώμα του PR παραθέτει στοιχεία δοκιμών/VPS για την αλλαγή (μηχανοποιεί τον Αυστηρό Κανόνα #18 αναζητώντας μοτίβα στο κείμενο του PR — εύθραυστο, βλ. Backlog) | Ναι                     |

### Εργασία: `test-vitest`

Εκτελείται μετά το `build`. Αποκλείει τη συγχώνευση σε περίπτωση αποτυχίας.

| Σουίτα           | Επικυρώνει                                                          | Αποκλεισμός συγχώνευσης                                                                                                          |
| ---------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Διακομιστή MCP (110 εργαλεία), autoCombo, cache — εκτελεστής vitest | Ναι                                                                                                                              |
| `test:vitest:ui` | Δοκιμές στοιχείων UI — εκτελεστής vitest                            | **Αποκλεισμός** — οι προϋπάρχουσες αποτυχίες εξαιρούνται ρητά στο `vitest.config.ts`· οι νέες αποτυχίες αποτυγχάνουν την εργασία |

### Νυχτερινές ροές εργασίας (προγραμματισμένες, συμβουλευτικές)

Αυτές εκτελούνται βάσει χρονοπρογράμματος cron (και μέσω `workflow_dispatch`), ποτέ σε PR. Όλες είναι συμβουλευτικές.

| Ροή εργασίας           | Επικυρώνει                                                                                                                                                                           | Αποκλεισμός συγχώνευσης |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `nightly-property`     | Δοκιμές ιδιοτήτων fast-check με τυχαίο seed + μεγάλο πλήθος εκτελέσεων                                                                                                               | **Συμβουλευτικό**       |
| `nightly-resilience`   | Πύλη αύξησης heap, εισαγωγή σφαλμάτων chaos, δοκιμές φόρτου/παρατεταμένου φόρτου k6                                                                                                  | **Συμβουλευτικό**       |
| `nightly-llm-security` | Προστασία από injection του promptfoo (λειτουργία αποκλεισμού) + ανιχνεύσεις garak (παραλείπονται χωρίς provider secret)                                                             | **Συμβουλευτικό**       |
| `nightly-schemathesis` | Fuzzing συμβολαίου OpenAPI (schemathesis) σε ζωντανό OmniRoute με χρήση του `docs/openapi.yaml` — αναδεικνύει παραβιάσεις προδιαγραφών / μη διαχειριζόμενα σφάλματα 500 (Φάση 8 B.4) | **Συμβουλευτικό**       |
| `nightly-mutation`     | Βαθμολογία δοκιμών μετάλλαξης Stryker στη γρήγορη λωρίδα μονάδων — οι μεταλλάξεις που επιβιώνουν αναδεικνύουν αδύναμα assertions                                                     | **Συμβουλευτικό**       |
| `nightly-compat`       | Πίνακας συμβατότητας μηχανής Node σε όλα τα υποστηριζόμενα εύρη `engines.node`                                                                                                       | **Συμβουλευτικό**       |

---

## Φάση ταχύτητας (2026-08-30 → v4.0 LTS): κάθε γραμμή βάσης χαλάρωσε κατά 20%

Απόφαση υπευθύνου (2026-08-30): μέχρι την αρθρωτοποίηση της v4.0, η ταχύτητα παράδοσης έχει μεγαλύτερη
σημασία από τη συγκράτηση του τεχνικού χρέους. Κάθε **αριθμητική** γραμμή βάσης του μηχανισμού σταδιακής αυστηροποίησης χαλάρωσε κατά 20% σε ένα
ελέγξιμο πέρασμα, και η φάση δηλώνεται στο `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Τι άλλαξε                                                                                                                                                                                                                                               | Πού                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — πλήθη όπου το χαμηλότερο είναι καλύτερο ×1.2, ποσοστά όπου το υψηλότερο είναι καλύτερο ÷1.2 (το κατώτατο όριο κάλυψης 60 διατηρήθηκε, το `eslintErrors` παραμένει 0, το `eslintWarnings` 0 → 20% του παγιωμένου πλήθους καταστολών) | `quality-baseline.json` (η σημείωση `_relax_velocity_2026_08_30` παραθέτει κάθε τιμή πριν → μετά)      |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, κάθε όριο γραμμών `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                  | `file-size-baseline.json`                                                                              |
| πλήθη ανά αρχείο / ανά κώδικα TS ×1.2                                                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                             |
| το `--require-tighten` γίνεται συμβουλευτικό όταν `_policy.requireTighten === false`                                                                                                                                                                    | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| η νυχτερινή εργασία `bank-ratchet-shrinks` τίθεται σε παύση (θα κατοχύρωνε τη μετρημένη μείωση και θα αναιρούσε το περιθώριο)                                                                                                                           | `.github/workflows/nightly-release-green.yml`                                                          |

Οι λίστες επιτρεπόμενων εξαιρέσεων (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **δεν** αποτελούν προϋπολογισμούς και δεν τροποποιήθηκαν. Οι πύλες πολιτικής επιτυχίας/αποτυχίας (μυστικά, κανόνες SQL,
σύμβαση τεκμηρίωσης/περιβάλλοντος, ισοτιμία i18n, μοναδιαίες δοκιμές) παραμένουν αμετάβλητες — μια αποτυχημένη δοκιμή εξακολουθεί να είναι αποτυχημένη δοκιμή.

**Εργαλεία**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — η
  εφάπαξ χαλάρωση (`scripts/quality/relax-baselines.mjs`)· αρνείται να εκτελεστεί δύο φορές με την
  ίδια σημείωση.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  μετρά κάθε αριθμητική πύλη με τον ίδιο τρόπο που το κάνει το CI και εμφανίζει το εναπομένον περιθώριο ανά πύλη
  (`scripts/quality/baseline-headroom.mjs`). Η νυχτερινή εργασία `baseline-headroom` δημοσιεύει τον
  πίνακα στο ενεργό ζήτημα **📈 Περιθώριο γραμμών βάσης (φάση ταχύτητας)** και προσθέτει την
  ετικέτα `headroom-alert` όταν οποιαδήποτε πύλη βρίσκεται εντός του 10% του ορίου της ή το έχει ήδη υπερβεί. Αυτό το ζήτημα
  αποτελεί την έγκαιρη προειδοποίηση: ένας προϋπολογισμός που εξαντλείται σε λίγες ημέρες σημαίνει ότι η χαλάρωση καταναλώνεται από
  λίγα PR και όχι από ολόκληρη την ομάδα — εξετάστε τις σημειώσεις `_rebaseline_*` της προβληματικής πύλης.

**Λειτουργία νέου κώδικα (Clean-as-You-Code) — από 2026-08-30, μόνο για τη γρήγορη διαδρομή PR**

Στα συμβάντα `pull_request`, το `quality.yml` μεταβιβάζει το `--base-ref <PR base SHA>` στα `check:file-size`,
`check:complexity-ratchets` και `check:dead-code`. Σε αυτήν τη λειτουργία, η πύλη συγκρίνει το HEAD με τη
βάση συγχώνευσης **περιορισμένη στα αρχεία που τροποποίησε το PR** (`scripts/check/newCodeMode.mjs`: η
βάση συγχώνευσης υλοποιείται σε ένα προσωρινό `git worktree`, τα ESLint/knip εκτελούνται εκεί και στο HEAD και
υπολογίζονται οι διαφορές των μετρήσεων ανά αρχείο):

- **ανασταλτικό** — το PR πρόσθεσε παραβιάσεις κυκλωματικής/γνωστικής πολυπλοκότητας ή νεκρές εξαγωγές σε αρχεία που τροποποίησε
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` στο αρχείο καταγραφής)·
- **συμβουλευτικό** — το καθολικό σύνολο έναντι της παγιωμένης γραμμής βάσης. Η κληρονομημένη απόκλιση δεν προκαλεί ποτέ αποτυχία σε ένα
  αθώο PR· η απόκλιση παγιώνεται εκ νέου κατά τη συμφωνία της έκδοσης και παρακολουθείται από την εργασία περιθωρίου.

Οι εκτελέσεις `workflow_dispatch`, ο σαρωτικός έλεγχος release-green και η νυχτερινή εργασία περιθωρίου δεν διαθέτουν βάση PR
και διατηρούν την απόλυτη (καθολική) σύγκριση. Η κάλυψη, η επανάληψη κώδικα και η κάλυψη τύπων παραμένουν καθολικές
προς το παρόν (τα εργαλεία τους δεν παράγουν οικονομικά μια διαφορά ανά αρχείο) — είναι υποψήφιες για την ίδια αντιμετώπιση.

**Κλείσιμο της φάσης στη v4.0 (LTS = αυστηρότερο από πριν, όχι «επιστροφή στην κανονικότητα»)**

1. Στο καθαρό tip του `release/v4.0.0`: εκτελέστε `npm run quality:headroom --json` για καταγραφή και, στη συνέχεια,
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, καθώς και το
   `--update` κάθε πύλης typecheck — κάθε γραμμή βάσης μειώνεται στη μετρημένη τιμή.
2. Διαγράψτε το `_policy` από το `quality-baseline.json` (ενεργοποιεί ξανά το `--require-tighten` και τη νυχτερινή
   αποταμίευση), επαναφέρετε το `THRESHOLD = 36` (ή υψηλότερο) στο `check-openapi-coverage.mjs`.
3. Αυστηροποιήστε πέρα από τις μετρημένες τιμές όπου η αρθρωτοποίηση απέδωσε: επαναφέρετε το `cap` μεγέθους αρχείου στα 1000
   (ή 800), αυξήστε τα κατώτατα όρια κάλυψης κατά 5 και ορίστε τις νεκρές εξαγωγές σε 0 για τα αρθρωτοποιημένα πακέτα.

## Βασική γραμμή καστάνιας (`quality-baseline.json`)

Ο μηχανισμός καστάνιας (`scripts/quality/check-quality-ratchet.mjs`) διαβάζει το `quality-baseline.json`
και το συγκρίνει με το `quality-metrics.json` που μόλις συλλέχθηκε. Οποιαδήποτε μετρική υποχωρεί
πέρα από το έψιλόν της προκαλεί αποτυχία της μεταγλώττισης.

Τρέχουσες μετρικές που παρακολουθούνται:

| Μετρική               | Κατεύθυνση | Σημασία                                                  |
| --------------------- | ---------- | -------------------------------------------------------- |
| `eslintWarnings`      | `down`     | Ο αριθμός προειδοποιήσεων ESLint δεν πρέπει να αυξάνεται |
| `coverage.statements` | `up`       | Η κάλυψη εντολών δεν πρέπει να μειώνεται                 |
| `coverage.lines`      | `up`       | Η κάλυψη γραμμών δεν πρέπει να μειώνεται                 |
| `coverage.functions`  | `up`       | Η κάλυψη συναρτήσεων δεν πρέπει να μειώνεται             |
| `coverage.branches`   | `up`       | Η κάλυψη διακλαδώσεων δεν πρέπει να μειώνεται            |

Για να ενημερώσετε τη βασική γραμμή μετά από μια πραγματική βελτίωση:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Η σημαία `--update` γράφει τις τρέχουσες μετρημένες τιμές στο `quality-baseline.json`.
Κάντε commit αυτό το αρχείο μαζί με την αλλαγή που βελτίωσε τη μετρική. Ένα PR που βελτιώνει μια
μετρική χωρίς να ενημερώνει τη βασική γραμμή θα εντοπιστεί από το `--require-tighten` (Φάση 6A.5,
σε αναμονή υλοποίησης).

### Καστάνια CodeQL: συχνότητα ανανέωσης και χειροκίνητη ενεργοποίηση

Το `check:codeql-ratchet` διαβάζει **την κατάσταση του αποθετηρίου, η οποία ανανεώνεται βάσει χρονοδιαγράμματος — όχι ανά PR.**
Το `gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` αναφέρει
`state: configured`, `schedule: weekly`: πρόκειται για τη σάρωση προεπιλεγμένης διαμόρφωσης του GitHub και όχι για
ανάλυση ανά push. Συνέπεια: αφού συγχωνευτεί ένα PR που ΔΙΟΡΘΩΝΕΙ ειδοποιήσεις, η καστάνια συνεχίζει να διαβάζει
τον παλιό, υψηλότερο αριθμό μέχρι να εκτελεστεί η επόμενη προγραμματισμένη σάρωση — επομένως αναφέρει υποχώρηση
σε κάθε ανοιχτό PR, συμπεριλαμβανομένων των επακόλουθων PR του ίδιου του διορθωτικού PR, μέχρι να ενημερωθεί η σάρωση.

**Χειροκίνητη ανανέωση**: το `gh workflow run codeql.yml --ref release/vX.Y.Z` εκτελεί ξανά την
ανάλυση και αναδημοσιεύει τις ειδοποιήσεις μέσα σε λίγα λεπτά. Διαβάστε πρώτα το `.github/workflows/codeql.yml`
— η κεφαλίδα του εξηγεί ότι χρησιμοποιεί μόνο `workflow_dispatch` **επειδή συγκρούεται με
την «προεπιλεγμένη διαμόρφωση» του GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Η επαναφορά των εναυσμάτων `push`/`pull_request`/
`schedule` απαιτεί πρώτα μια **ενέργεια από τον κάτοχο**: Settings → Code security →
CodeQL: Default → Advanced. Μην προσθέσετε ένα έναυσμα `schedule:` χωρίς αυτήν την αλλαγή — θα
παράγει μόνο αποτυχημένες εκτελέσεις.

**Περιορίστε τη βασική γραμμή αφού μειωθεί ο αριθμός** — το `node scripts/check/check-codeql-ratchet.mjs
--update` γράφει τον νέο μετρημένο αριθμό στο `quality-baseline.json` →
`metrics.codeqlAlerts.value`, ώστε η καστάνια να μην επιτρέπει σιωπηρά μια υποχώρηση προς
το παλιό ανώτατο όριο. Παράδειγμα εφαρμογής (2026-09-02/03): το PR #12502 διόρθωσε 7 πραγματικές ειδοποιήσεις
(13 → 6 μετρημένες ανοιχτές ειδοποιήσεις)· το PR #12530 περιόρισε την παγιωμένη βασική γραμμή από 11 → 6 ώστε να αντιστοιχεί· οι
υπόλοιπες 6 απορρίφθηκαν έπειτα με αιτιολόγηση ανά ειδοποίηση, μειώνοντας τις ανοιχτές ειδοποιήσεις σε 0.

**Οι απορρίψεις αποτελούν απόφαση του χειριστή (Αυστηρός Κανόνας #14)** — μην απορρίπτετε ποτέ μια ειδοποίηση CodeQL
χωρίς να καταγράψετε την τεχνική αιτιολόγηση στο σχόλιο απόρριψης: `won't fix` για
απαίτηση πρωτοκόλλου εξωτερικής εξάρτησης, `used in tests` για ένα fixture δοκιμών, `false positive`
για έναν μηχανισμό εξυγίανσης που το CodeQL δεν μπορεί να εντοπίσει (προηγούμενο: `docs/security/ERROR_SANITIZATION.md`).

---

## Πολιτική επανάληψης δοκιμών (WS5.4, v3.8.49)

Η επανάληψη ορίζεται ανά runner, ποτέ ως καθολική γενική ρύθμιση — μια καθολική επανάληψη μετατρέπει πραγματικές παλινδρομήσεις
σε αόρατες αστάθειες:

| Runner           | Πολιτική                                                                                                                        | Γιατί                                                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` μόνο στο CI, με `trace: on-first-retry`                                                                            | Ο χρονισμός του browser/δικτύου είναι πραγματικά μη ντετερμινιστικός· μία επανάληψη με trace μετατρέπει μια αστάθεια σε διαγνωστικό τεχνούργημα |
| Vitest           | ΚΑΜΙΑ καθολική επανάληψη. Μια αποδεδειγμένα ασταθής δοκιμή λαμβάνει ρητή επανάληψη ανά δοκιμή (ορατή στο diff, ελεγμένη στο PR) | Διατηρεί τη λίστα καραντίνας μέσα στο repo, ποτέ αδιαφανή                                                                                       |
| node:test (unit) | ΚΑΜΙΑ επανάληψη, ποτέ                                                                                                           | Μια ασταθής δοκιμή μονάδας αποτελεί σφάλμα στη δοκιμή — διορθώστε τη, μην την επανεκτελείτε ελπίζοντας σε διαφορετικό αποτέλεσμα                |

SLO-στόχοι μόλις ενεργοποιηθεί η τηλεμετρία ασταθειών (WS5.2/5.3): ποσοστό αστάθειας <1% ανά δοκιμή
(όριο «άμεσης διόρθωσης»), ποσοστό επιτυχίας ≥95% ανά pipeline. Τιμές αναφοράς του κλάδου —
επαναβαθμονομήστε τις βάσει των δικών μας μετρήσεων.

## Απόκλιση του ratchet σε επίπεδο release (WS5.5, v3.8.49)

Όταν ένα ratchet (μέγεθος αρχείου, πολυπλοκότητα, προειδοποιήσεις eslint) παρουσιάζει παλινδρόμηση στο ΚΑΘΑΡΟ tip του release
— δηλαδή ο ΣΥΝΔΥΑΣΜΟΣ των merges προκάλεσε την παλινδρόμηση και κανένα μεμονωμένο PR δεν την αναπαράγει
στο δικό του branch — η διόρθωση ανήκει στον **release captain, μία φορά, στο
release branch**: προτιμήστε εξαγωγή/refactor· επανακαθορίστε το baseline μόνο με την τεκμηριωμένη
καταχώριση αιτιολόγησης. Μην επιρρίπτετε ποτέ την απόκλιση του συνδυασμού σε PR κάποιου contributor και μην
επανακαθορίζετε ποτέ το baseline ανά PR (αυτό αποκρύπτει πραγματικές παλινδρομήσεις). Πρώτα κάντε τη διάκριση: αναπαραγάγετε
την αποτυχία στο καθαρό tip μέσα σε ένα probe worktree, προτού υποθέσετε ότι την προκάλεσε το PR σας.

## Αποθήκευση των μειώσεων του ratchet — η καθοδική κατεύθυνση (#8584)

Το ratchet είναι αυτοματοποιημένο μόνο κατά το ήμισυ, και μάλιστα στο λάθος μισό. Η **αύξηση** ενός ορίου είναι μια
χειροκίνητη επεξεργασία JSON που διαρκεί δέκα δευτερόλεπτα και αποτελεί τον ταχύτερο τρόπο για να ξεμπλοκάρει ένα αποτυχημένο PR.
Η **μείωση** ενός ορίου απαιτεί από κάποιον να εκτελέσει το `--update` και να κάνει commit το αποτέλεσμα — και μέχρι
να προστεθεί το job `bank-ratchet-shrinks`, κανένα workflow δεν το εκτελούσε. Η μετρημένη συνέπεια
(2026-07-25): 18 παγωμένα αρχεία βρίσκονται ήδη στο όριο των 800 γραμμών για νέα αρχεία ή κάτω από αυτό, με τη χειρότερη
περίπτωση στο 132× (`src/shared/validation/schemas.ts`, 19 γραμμές με όριο 2,523)· το
ανώτατο όριο πολυπλοκότητας μετακινήθηκε από `1794 → 2169` μέσα από ~37 σημειώσεις επανακαθορισμού baseline, με ακριβώς μία
μείωση (−1)· και η φράση «σύσφιξη μέσω `--update` στον επόμενο κύκλο» γράφτηκε 31 φορές και
τηρήθηκε μία φορά. Ένα όριο που επιβιώνει περισσότερο από τον κώδικα που το δικαιολόγησε μετατρέπει σιωπηρά κάθε ολοκληρωμένη
αποσύνθεση σε περιθώριο ανάπτυξης για όποιον επεξεργαστεί το αρχείο στη συνέχεια.

Το `nightly-release-green.yml` → job **`bank-ratchet-shrinks`** κλείνει αυτόν τον κύκλο:

|               |                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| Εκτελείται σε | `schedule` (3×/ημέρα) + `workflow_dispatch` — σκόπιμα **όχι** σε `push`                                             |
| Μετρά         | το υψηλότερο `release/vX.Y.Z`, με την ίδια επίλυση + προστασία από injection όπως το `release-green`                |
| Γράφει        | `check:file-size --update` και `check:complexity-ratchets --update` (και τα δύο μόνο προς μείωση εκ κατασκευής)     |
| Επαληθεύει    | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                            |
| Παραδίδει     | ένα μοναδικό, πάντα ενημερωμένο PR προς το release branch — ενημερώνεται αναγκαστικά, χωρίς ποτέ να δημιουργεί spam |

Η αποθήκευση γίνεται σε παρτίδες αντί ανά push, επειδή δεν έχει απαίτηση χαμηλού latency (μια μείωση που
αποθηκεύεται εντός 8 ωρών είναι αποδεκτή), ενώ μια εκτέλεση ανά merge θα ανακατασκεύαζε επανειλημμένα το PR branch
κατά τη διάρκεια εκστρατειών συγχωνεύσεων και θα επιβάρυνε κάθε φορά το κόστος μιας πλήρους σάρωσης ESLint. Η ανίχνευση παραμένει στο
push (`release-green`)· μόνο η αποθήκευση γίνεται σε παρτίδες.

### Ο επαληθευτής ασφάλειας

Το job γράφει στα baselines χωρίς επίβλεψη, επομένως το `verify-ratchet-bank.mjs` είναι αυτό που καθιστά
αποδεκτή αυτή τη διαδικασία. Συγκρίνει μέσω diff το δέντρο μετά το `--update` με το `HEAD` και **διακόπτει το job
προτού υπάρξει οποιοδήποτε commit** — χωρίς να ανοίξει PR — εκτός εάν κάθε αλλαγή είναι μία από τις εξής:

- μια αριθμητική καταχώριση `frozen` / `testFrozen` που **μειώθηκε** ή **αφαιρέθηκε**
- `complexity-baseline.json` → `count` που **μειώθηκε**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` που **μειώθηκε**

Οτιδήποτε άλλο αποτυγχάνει: αύξηση ενός αριθμού, προσθήκη καταχώρισης, αλλαγή των `cap`/`testCap` ή
διαγραφή/επανεγγραφή μιας σημείωσης `_rebaseline_*` (αυτές οι σημειώσεις αποτελούν το ίχνος ελέγχου που εξηγεί γιατί υπάρχει κάθε
ανώτατο όριο και αποθηκεύονται μέσα στο ίδιο αντικείμενο `frozen` με τις καταχωρίσεις αρχείων).
Ένα bot που θα μπορούσε να αυξήσει ένα όριο θα ήταν σαφώς χειρότερο από την υφιστάμενη κατάσταση. Προστασία από
παλινδρόμηση: `tests/unit/verify-ratchet-bank.test.ts`.

Το job δεν κάνει ποτέ push στο `release/*` — ένας άνθρωπος συγχωνεύει το PR, ώστε μια λανθασμένη μέτρηση
να μην μπορεί να ενσωματωθεί χωρίς έλεγχο.

## Πολιτική λίστας επιτρεπόμενων

Κάθε έλεγχος που δεν μπορεί να αποτύχει λόγω προϋπαρχουσών παραβάσεων χρησιμοποιεί μια παγιωμένη λίστα επιτρεπόμενων
(π.χ. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Η πολιτική είναι:

**Διορθώστε τη βασική αιτία· χρησιμοποιήστε τη λίστα επιτρεπόμενων μόνο όταν η παράβαση προϋπάρχει και
δεν μπορεί να διορθωθεί στο ίδιο PR.**

Όταν προσθέτετε μια καταχώριση σε λίστα επιτρεπόμενων:

1. Συμπεριλάβετε ένα σχόλιο με την αιτιολόγηση.
2. Αναφέρετε το σχετικό issue παρακολούθησης (π.χ. `// #3498 — Δυνατότητα Φάσης 2, δεν έχει υλοποιηθεί ακόμη`).
3. Αφαιρέστε την καταχώριση στο ίδιο PR που διορθώνει την παράβαση — μια παρωχημένη καταχώριση που δεν
   καταστέλλει πλέον μια ενεργή παράβαση αποτελεί και η ίδια ελάττωμα (ο έλεγχος παρωχημένης επιβολής 6A.3 θα
   προκαλεί αποτυχία του ελέγχου για ορφανή καταχώριση λίστας επιτρεπόμενων μόλις υλοποιηθεί).

**Μην** προσθέτετε καταχωρίσεις στη λίστα επιτρεπόμενων για να περνούν οι δοκιμές γρηγορότερα. Ένας επιτυχής έλεγχος με μια διαρκώς αυξανόμενη
λίστα επιτρεπόμενων δημιουργεί μια ψευδή αίσθηση ποιότητας.

### Όταν ένας έλεγχος αποτυγχάνει στο PR σας

1. **Διαβάστε προσεκτικά την έξοδο του ελέγχου** — σας υποδεικνύει ακριβώς ποιο αρχείο ή σύμβολο παραβίασε
   τον κανόνα.
2. **Διορθώστε την παράβαση** — οι περισσότεροι έλεγχοι είναι ντετερμινιστικοί έλεγχοι του συστήματος αρχείων που περνούν μόλις
   ο κώδικας γίνει σωστός.
3. **Αν η παράβαση προϋπάρχει** (δηλαδή δεν την εισαγάγατε εσείς, αλλά πλέον καλύπτεται
   από τον έλεγχο): προσθέστε μια καταχώριση στη λίστα επιτρεπόμενων με σχόλιο αιτιολόγησης και ένα issue παρακολούθησης.
4. **Αν ο έλεγχος είναι τύπου ratchet** (κάλυψη, προειδοποιήσεις ESLint, διπλότυπος κώδικας, πολυπλοκότητα):
   η αλλαγή σας επιδείνωσε τη μετρική. Διορθώστε το υποκείμενο ζήτημα ή (σπάνια) εκτελέστε
   `npm run quality:ratchet -- --update` αν η αλλαγή είναι σκόπιμη και η υποβάθμιση της μετρικής
   είναι αποδεκτή — αλλά τεκμηριώστε τον λόγο στην περιγραφή του PR.
5. **Συμβουλευτικοί έλεγχοι** (`continue-on-error: true`) παρέχουν πληροφορίες — δεν εμποδίζουν
   τη συγχώνευση, αλλά εμφανίζονται στη σύνοψη του CI. Διορθώστε τους ούτως ή άλλως.

---

## Προσθήκη νέου ελέγχου

1. Δημιουργήστε το `scripts/check/check-<name>.mjs` (ή `.ts`). Οι έλεγχοι πολιτικής τερματίζονται με 0/1.
   Οι έλεγχοι τύπου ratchet εκπέμπουν μια μετρική στο `quality-metrics.json` μέσω του `collect-metrics.mjs`.
2. Προσθέστε το `"check:<name>": "node scripts/check/check-<name>.mjs"` στο `package.json`.
3. Συνδέστε το στο `.github/workflows/ci.yml` κάτω από την κατάλληλη εργασία
   (πολιτική → `lint` ή `docs-sync-strict`· ratchet → `quality-gate`).
4. Αν διαθέτει λίστα επιτρεπόμενων, εφαρμόστε το `reportStaleEntries()` από το
   `scripts/check/lib/allowlist.mjs`, ώστε οι παρωχημένες καταχωρίσεις να εντοπίζονται αυτόματα.
5. Γράψτε μια δοκιμή στο `tests/unit/build/` που να καλύπτει τη λογική εντοπισμού του ελέγχου.
6. Ενημερώστε αυτό το έγγραφο (προσθέστε μια γραμμή στον σχετικό πίνακα εργασιών).

---

## Εργαλεία agent: LSP-in-the-loop (προαιρετικό)

Πέρα από τους ελέγχους CI, το OmniRoute παρέχει μια **προαιρετική** υποδομή `agent-lsp`
(ένα `.mcp.json` σε επίπεδο έργου, Φάση 7 Εργασία 15). Δημιουργήστε το `.mcp.json`
για να εκθέσετε έναν διακομιστή γλώσσας TypeScript σε agents προγραμματισμού, ώστε να επιλύουν σύμβολα /
διαγνωστικά **πριν** γράψουν κώδικα — ένα συμπλήρωμα του `typecheck:core` που εφαρμόζει μεταγλώττιση πριν από κάθε ισχυρισμό
και περιορίζει τα σφάλματα «επινοημένων συμβόλων» στην πηγή τους. Σκόπιμα δεν φορτώνεται
αυτόματα (εσείς επιλέγετε και επαληθεύετε τη γέφυρα MCP↔LSP)· μια εσφαλμένη καταχώριση απλώς καταγράφει ένα
σφάλμα σύνδεσης και δεν διακόπτει ποτέ τις συνεδρίες.

---

## Εκκρεμότητες εξορθολογισμού (αξιολόγηση ROI — Φάση 9 Κύμα 3)

Αυτή η απογραφή διασταυρώθηκε με το `ci.yml` στις 2026-06-17 (η προηγούμενη έκδοση παρέλειπε τα
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Μια αξιολόγηση ROI του ενοποιημένου συνόλου
εντόπισε τους ακόλουθους υποψηφίους για εξορθολογισμό. **Οι συγχωνεύσεις είναι μηχανικές αλλαγές
CI· οι ενεργοποιήσεις/καταργήσεις είναι αποφάσεις πολιτικής που προορίζονται για τον χειριστή.** Τίποτα από τα παρακάτω
δεν έχει εφαρμοστεί ακόμη.

**Επίσης δεν τεκμηριώνονται παραπάνω** (συμβουλευτικά, χαμηλό σήμα): η εργασία `docs-lint`
(markdownlint + Vale, ολόκληρη η εργασία με `continue-on-error`) και οι αυτόνομες ροές εργασίας σάρωσης
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. Το `semgrepFindings: 0` βρίσκεται στο
`quality-baseline.json`, αλλά δεν είναι συνδεδεμένο με μηχανισμό αποκλεισμού βάσει ορίου στο `ci.yml` — η μετρική είναι
προς το παρόν ορφανή.

### Συγχώνευση / αποδιπλοποίηση (μηχανική, χαμηλότερου κινδύνου)

Κάθε υποψήφιος επικυρώθηκε έναντι της ενεργής κατάστασης των πυλών στις 2026-06-17 (εμπιστοσύνη με επαλήθευση)·
αρκετές «προφανείς» συγχωνεύσεις αποδείχθηκε ότι έκρυβαν τεχνικό χρέος και **δεν** αποτελούν άμεσες, ασφαλείς αντικαταστάσεις.

- **Το `check:docs-sync` εκτελείται δύο φορές** — αυτόνομα στην εργασία `lint` και ξανά μέσα στο `check:docs-all` (`docs-sync-strict`) και στο hook pre-commit του husky. ✅ **ΟΛΟΚΛΗΡΩΘΗΚΕ** — αφαιρέθηκε η αυτόνομη κλήση από το `lint`.
- **Σάρωση CVE** — ❌ **ΔΕΝ είναι καθαρή συγχώνευση.** Το `audit:deps` αποτυγχάνει υποχρεωτικά για οποιοδήποτε CVE υψηλής/κρίσιμης σοβαρότητας· το `check:vuln-ratchet` (osv) αποτυγχάνει μόνο σε περίπτωση _επιδείνωσης_ σε σχέση με τη γραμμή βάσης (επί του παρόντος 1 MODERATE). Διαφορετική σημασιολογία — η κατάργηση του `audit:deps` θα αφαιρούσε την απόλυτη πύλη υψηλής/κρίσιμης σοβαρότητας. Διατηρήστε και τα δύο.
- **Εντοπισμός κύκλων** — ❌ **ΔΕΝ είναι καθαρή συγχώνευση.** Το `check:circular-deps` (dpdm) αναφέρει **91 κύκλους** (γι' αυτό είναι συμβουλευτικό)· δεν μπορεί να προαχθεί σε αποκλειστικό χωρίς να επιλυθούν πρώτα, ενώ έχει ευρύτερο πεδίο εφαρμογής από το επιτυχές, επιμελημένο `check:cycles`. Διατηρήστε το `check:cycles` ως αποκλειστικό· η επίλυση των 91 κύκλων του dpdm αποτελεί ξεχωριστή εκκρεμότητα.
- **Πολυπλοκότητα** — ✅ **ΟΛΟΚΛΗΡΩΘΗΚΕ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): μία διέλευση ESLint, με καταμέτρηση βάσει ruleId ώστε οι γραμμές βάσης για κυκλωματική πολυπλοκότητα+max-lines και γνωστική πολυπλοκότητα να παραμένουν ανεξάρτητες· τα μεμονωμένα `check:complexity` / `check:cognitive-complexity` διατηρούνται για τοπική εκτέλεση με `--update`.
- **Αποτροπή ψευδών αναφορών `/api`** — ✅ **ΟΛΟΚΛΗΡΩΘΗΚΕ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): μία απογραφή FS του `src/app/api`, ενώ τα openapi-routes + docs-symbols εξακολουθούν να αναφέρουν αποτελέσματα ανεξάρτητα· τα μεμονωμένα εργαλεία διατηρούνται για τοπικές εκτελέσεις.
- **Το `check:node-runtime` εκτελείται σε 11 εργασίες** — ⚠️ **χαμηλό ROI.** Κάθε εργασία χρησιμοποιεί ξεχωριστό runner και ο έλεγχος διαρκεί <1s· η συνολική εξοικονόμηση είναι ~10s, με αντίτιμο την απώλεια μιας οικονομικής δικλίδας ανά εργασία. Δεν αξίζει την αναστάτωση.
- **Το `typecheck:noimplicit:core` στο lint του CI** — ✅ **αφαιρέθηκε από την εργασία lint** (ήταν συμβουλευτικό με `continue-on-error`)· η αποκλειστική επιφάνεια τύπων είναι `typecheck:core` + `check:type-coverage`. Το τοπικό script διατηρήθηκε.

### Ενεργοποίηση / απόφαση (πολιτική χειριστή)

- `check:openapi-security-tiers` (συμβουλευτικό) — ❌ **ΔΕΝ μπορεί να γίνει καθαρά αποκλειστικό.** Τερματίζει με κωδικό 0, αλλά προειδοποιεί ότι αρκετές διαδρομές `traffic-inspector` κάτω από το `LOCAL_ONLY_API_PREFIXES` δεν διαθέτουν τη σημείωση `x-loopback-only: true`. Η επιβολή του απαιτεί πρώτα την προσθήκη αυτών των σημειώσεων στο `openapi.yaml`.
- `typecheck:noimplicit:core` (συμβουλευτικό) — καλύπτεται σε μεγάλο βαθμό από τον αποκλειστικό μηχανισμό ορίου `check:type-coverage`. Μετατρέψτε το σε μηχανισμό ορίου ή καταργήστε το περιττό δεύτερο πέρασμα `tsc`.
- `test:vitest:ui` (πλέον **αποκλειστικό**) — οι προϋπάρχουσες αποτυχίες εξαιρούνται ρητά στο `vitest.config.ts` με σχόλια παρακολούθησης `// #8618`· οι νέες αποτυχίες προκαλούν αποτυχία της εργασίας.
- `check:secrets` (gitleaks, αποκλειστικός μηχανισμός ορίου παγωμένος σε 3 τεκμηριωμένα ψευδώς θετικά) — προσθέστε τα 3 στη λίστα επιτρεπόμενων ώστε να φτάσουν στο 0 ή υποβιβάστε τον έλεγχο σε συμβουλευτικό. Επικαλύπτεται με την εγγενή σάρωση μυστικών του GitHub + το `check:public-creds`.
- `check:pr-evidence` (αποκλειστικό, αναζητά μοτίβα στο κείμενο του σώματος του PR) — υψηλός κίνδυνος ψευδώς θετικών· η κατάργησή του αποδυναμώνει την επιβολή του Αυστηρού Κανόνα #18, επομένως πρόκειται για ουσιαστική απόφαση πολιτικής.
- `semgrep` (συμβουλευτικό και αυτόνομο) — επικαλύπτεται με το CodeQL για τις οικογένειες OWASP· συνδέστε τη γραμμή βάσης του με μηχανισμό ορίου ή καταργήστε το.

---

## Σχετική τεκμηρίωση

- Εφοδιαστική αλυσίδα (προέλευση, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — πύλη ισοτιμίας συνόλου κλειδιών

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, εργασία `i18n-ui-coverage`).
Συγκρίνει το σύνολο των τερματικών κλειδιών κάθε `src/i18n/messages/<locale>.json` με το `en.json` και αποτυγχάνει
για κάθε απόν ή επιπλέον τερματικό κλειδί, ανεξάρτητα από το πότε προστέθηκε το κλειδί. Τα σύμβολα κράτησης θέσης
`__MISSING__:` υπολογίζονται ως παρόντα (το περιεχόμενό τους αφορά την πύλη αναλογίας). Είναι το απόλυτο συμπλήρωμα
των δύο πυλών που βασίζονται σε diff/ποσοστό: το `check-ui-keys-coverage` επιβάλλει κατώτατο όριο 80 % ανά
locale (43 απόντα κλειδιά σε σύνολο ~13.000 εξακολουθούν να δίνουν 99,7 %) και το `check-new-key-coverage` αξιολογεί
μόνο τα κλειδιά που ένα PR προσθέτει στο `en.json`. Μια παρτίδα locale δημιουργείται από το `en.json` της ημέρας
κατά την οποία δημιουργείται ο κλάδος της και μεταφράζεται επί ημέρες, ενώ η βάση συνεχίζει να προσθέτει κλειδιά· το PR
της παρτίδας δεν προσθέτει το ίδιο κανένα κλειδί, οπότε και οι δύο συγγενικές πύλες παρέμειναν σιωπηλές όταν η παρτίδα 1
(#13044) ενσωματώθηκε με έλλειψη 43 κλειδιών σε εννέα locale και η παρτίδα 2 (#13660) με έλλειψη 10 κλειδιών σε οκτώ
(2026-09-15). Διορθώστε μια αποτυχία με
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`· ένα επιπλέον (`extra`) τερματικό κλειδί
σημαίνει ότι η πηγή το αφαίρεσε — διαγράψτε το από το locale. Το `--warn` αναφέρει το πρόβλημα χωρίς να προκαλεί αποτυχία.
Το `--catalog=cli` εκτελεί την ίδια σύγκριση στο `bin/cli/locales` (`npm run i18n:check-keys:cli`)·
και τα δύο βήματα βρίσκονται στην εργασία `i18n-ui-coverage`.

#### `check-new-key-coverage` — πύλη i18n νέων κλειδιών

Συγγενική πύλη του `check-ui-value-drift`. Εκείνη εντοπίζει μια αγγλική τιμή που **ξαναγράφηκε**
ενώ οι μεταφράσεις της έμειναν πίσω· αυτή εντοπίζει ένα αγγλικό κλειδί που **προστέθηκε**
ενώ ορισμένα locale δεν το έλαβαν ποτέ.

Το `check-ui-keys-coverage` δεν μπορεί να εντοπίσει αυτήν την κατηγορία: επιβάλλει ένα ποσοστιαίο κατώτατο όριο ανά locale και
έντεκα απόντα κλειδιά σε σύνολο ~13.000 αφήνουν την κάλυψη στο 99,9%. Ένα ποσοστό ανά γλώσσα δεν μπορεί
να εκφράσει ότι «αυτή η λειτουργία κυκλοφόρησε αμετάφραστη» — μια ολόκληρη λειτουργία μπορεί να προστεθεί σε ένα νέο locale χωρίς
καθόλου κείμενο και ο αριθμός να μη μετακινηθεί ποτέ.

Το περιστατικό που κωδικοποιεί: η Φάση 3 του Orchestration Canvas μετέφρασε τα έντεκα κλειδιά της στα
42 locale που υπήρχαν τότε. Ώρες αργότερα, η παρτίδα γλωσσών της ΕΕ (#13044) αύξησε τα locale του αποθετηρίου
σε 51 και τα εννέα νέα (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) δεν
τα έλαβαν ποτέ. Το `deepMergeFallback` αντικαθιστά ένα απόν κλειδί με τα αγγλικά, επομένως η μορφή της αστοχίας ήταν
ένα αμετάφραστο περιβάλλον εργασίας χρήστη αντί για ένα κενό περιβάλλον εργασίας χρήστη — πραγματική και εκ σχεδιασμού σιωπηλή.

Όπως και η συγγενική της πύλη, λαμβάνει υπόψη το **diff**, συγκρίνοντας τα αγγλικά στη βάση συγχώνευσης με το λειτουργικό
δέντρο, ώστε τα προϋπάρχοντα κενά να παραμένουν παγωμένα και να μην απαιτείται μετάπτωση για την ενεργοποίηση της πύλης.

**Ένας δείκτης `__MISSING__:<english>` δεν την ικανοποιεί (από 2026-09-17).** Προηγουμένως αποτελούσε την
τεκμηριωμένη αναβολή — κατά την εκτέλεση χρησιμοποιούνται εφεδρικά τα σωστά αγγλικά — έως ότου οκτώ PR λειτουργιών στις
2026-09-16 πρόσθεσαν 61 κλειδιά και έβαλαν τον δείκτη και στα 65 locale αντί να τα μεταφράσουν: αυτή
η πύλη τα αποδέχθηκε όλα, τίποτα δεν εμπόδισε τα PR και η πύλη αναλογίας πραγματικών μεταφράσεων που προκαλεί αποκλεισμό
απέτυχε κατόπιν στην κορυφή της έκδοσης για όλους (pt-BR 3,2 % > 2,5 % + 0,5). Ένας δείκτης πλέον αξιολογείται
ως απούσα μετάφραση. Διορθώστε μια αποτυχία με
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ή
όλα τα locale παράλληλα με `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ασφαλές σε αποσυνδεδεμένη εκτέλεση, αρνείται να ξεκινήσει χωρίς τις μεταβλητές περιβάλλοντος `OMNIROUTE_TRANSLATION_*`). Ένα κλειδί που πρέπει να παραμείνει
στα αγγλικά (ένα δεσμευμένο όνομα προϊόντος/μηχανής/σημαίας) ανήκει στο `scripts/i18n/untranslatable-keys.json`,
ποτέ πίσω από έναν δείκτη. Το `vi` απαγορεύει πλήρως τους δείκτες (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — πύλη σταθμευμένων δοκιμών

Ένα αρχείο στη λίστα `exclude` του `vitest.config.ts` είναι μια δοκιμή που δεν εκτελείται, αλλά μοιάζει
με κάλυψη σε όποιον διαβάζει το δέντρο. Εξήντα δύο αρχεία συσσωρεύτηκαν πίσω από το σχόλιο
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Το ζήτημα #8618 έκλεισε στις
2026-08-11, ενώ η λίστα που παρακολουθούσε αυξήθηκε από 45 καταχωρίσεις σε 62, με καθεμία από τις νέες να κληρονομεί ένα σχόλιο
που παρέπεμπε σε ένα ανενεργό ζήτημα. Όταν η λίστα τελικά μετρήθηκε αρχείο προς αρχείο (#13204), **51 από τα 62
περνούσαν στο τρέχον δέντρο χωρίς καμία αλλαγή στον πηγαίο κώδικα**.

Η πύλη απαιτεί κάθε εξαίρεση που αντιστοιχεί σε πραγματικό αρχείο (α) να κατονομάζει ένα ζήτημα παρακολούθησης και
(β) να εμφανίζεται στο `config/quality/vitest-exclusions.json` με τη μετρημένη κατάστασή της, ώστε η προσθήκη μιας εξαίρεσης να αποτελεί
ένα diff που μπορεί να αναθεωρηθεί σε ειδικό αρχείο, αντί για μία ακόμη γραμμή σε έναν πίνακα 60 καταχωρίσεων. Σκόπιμα
δεν επανεκτελεί τις εξαιρούμενες δοκιμές — αυτό κοστίζει ~10 λεπτά και ανήκει σε μια περιοδική εργασία· η
καταγραφή αποθηκεύει το πότε μετρήθηκε τελευταία φορά καθεμία.
