# Admission lanes (#9654) — two lane systems, what gates each, where each reports (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

Το OmniRoute διαθέτει **δύο** τοπικά ανά διεργασία συστήματα λωρίδων με διαφορετικά πεδία εφαρμογής. Είναι
συμπληρωματικά· οι διαχειριστές θα πρέπει να γνωρίζουν ποιο από τα δύο εξετάζουν.

## 1. Καθολικός έλεγχος αποδοχής σε επίπεδο διεργασίας βάσει byte (`chatBodyAdmission.ts`)

- **Πεδίο εφαρμογής:** η διαδρομή προσωρινά αποθηκευμένου σώματος/σωρού για `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` και τις άλλες διαδρομές τύπου συνομιλίας. Προστατεύει
  από τη διόγκωση του σωρού εξαιτίας μεγάλων σωμάτων από πράκτορες προγραμματισμού (#4380).
- **Ένας καθολικός ελεγκτής ανά διεργασία, όχι λωρίδες ανά κλειδί (#10110).** Κάθε κλειδί API
  (κατακερματισμένο) ή συνεδρία `anonymous` γίνεται αποδεκτή με βάση τον **ίδιο** κοινόχρηστο
  προϋπολογισμό — το κατακερματισμένο αναγνωριστικό συνεδρίας χρησιμοποιείται ΜΟΝΟ ως κλειδί
  προγραμματισμού δίκαιης κατανομής (κυκλική διεκπεραίωση μεταξύ αιτημάτων σε αναμονή), ποτέ ως
  τμήμα χωρητικότητας. Μια προηγούμενη έκδοση αυτού του εγγράφου περιέγραφε λωρίδες ανά κλειδί
  με ανεξάρτητη χωρητικότητα· αυτό το μοντέλο καταργήθηκε στο #10110, επειδή επέτρεπε σε πλαστά
  διαπιστευτήρια χωρίς έλεγχο ταυτότητας να πολλαπλασιάζουν το όριο ολόκληρης της διεργασίας.
- **Πύλη (#503-fanout): ένας αυτόματα παραγόμενος προϋπολογισμός εισαγωγής σε BYTE, όχι ένα
  σταθερό πλήθος αιτημάτων.** Το παλαιό όριο πλήθους αιτημάτων `CHAT_MAX_HEAVY_IN_FLIGHT`
  (προεπιλογή `1` πριν από αυτήν τη διόρθωση) περιόριζε τη διακλάδωση των πρακτόρων
  προγραμματισμού (πολλαπλοί υποπράκτορες/CLI, σώματα συνήθως > 256 KB) σε πραγματική
  ταυτόχρονη εκτέλεση περίπου 1, με αποτέλεσμα αποκρίσεις 503 υπό απολύτως φυσιολογικό
  φόρτο. Πλέον εφαρμόζεται μόνο όταν ένας διαχειριστής ορίζει ρητά το
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Όταν παραμένει μη ορισμένο, η αποδοχή ελέγχεται
  αντ’ αυτού από το `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — έναν προϋπολογισμό που παράγεται
  αυτόματα από το πραγματικό όριο μνήμης της διεργασίας (`src/shared/middleware/admissionBudget.ts`):
  25% του αυστηρότερου μεταξύ του ορίου σωρού V8 και οποιουδήποτε ορίου cgroup/container,
  διαιρεμένο με συντελεστή παροδικής διόγκωσης 8x και περιορισμένο μεταξύ 8 MiB και
  2 GiB. Οι ρητές παρακάμψεις χρησιμοποιούν τα ίδια όρια. Έτσι, προσαρμόζεται αυτόματα
  από ένα container 512 MB έως έναν επιτραπέζιο υπολογιστή 32 GB χωρίς ρύθμιση μεταβλητών
  περιβάλλοντος. Ένα σώμα που δεν χωρά στον πραγματικό προϋπολογισμό αποτυγχάνει αμέσως
  με `413 body_exceeds_budget`· μόνο η διεκδίκηση πόρων μεταξύ σωμάτων που μπορούν
  μεμονωμένα να εξυπηρετηθούν εισέρχεται στην οριοθετημένη ουρά δίκαιης κατανομής.
  Ένας ενεργός ιχνηλάτης πίεσης πόρων πολλαπλών σημάτων (αναλογία σωρού V8,
  cgroup, PSI, συμβάντα OOM — `open-sse/utils/resourcePressurePolicy.ts`) συντομεύει
  την οριοθετημένη αναμονή υπό πίεση `high` και απορρίπτει αμέσως με
  `503 resource_pressure` υπό πίεση `critical`, πριν καν εισαχθούν byte.
  Το PSI διαβάζεται από το `memory.pressure` του cgroup αυτής της μονάδας, όταν υπάρχει
  (`open-sse/utils/resourcePressureSampler.ts`)· το `/proc/pressure/memory` αφορά
  ολόκληρο τον κεντρικό υπολογιστή και χρησιμοποιείται μόνο ως εναλλακτική λύση σε
  φυσικό υλικό / cgroup v1, ώστε ένας κεντρικός υπολογιστής που χρησιμοποιεί swap να
  μην μπορεί να προκαλέσει απόκριση 503 σε ένα αδρανές container.
- **Ρύθμιση:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — παράκαμψη για τον αυτόματα παραγόμενο προϋπολογισμό byte
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — παλαιό όριο πλήθους αιτημάτων, μόνο κατόπιν ρητής ενεργοποίησης
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — αναμονή στην ουρά πριν από απόκριση 503 (προεπιλογή 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — βαλβίδα σωρού για τα byte στην ουρά (προεπιλογή 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — παρωχημένες
    επιλογές χωρίς λειτουργική επίδραση από το #10110 (γίνονται δεκτές για συμβατότητα ρυθμίσεων, αλλά αγνοούνται)
- **Αναφορές:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — συμπεριλαμβανομένων
  των προσθηκών του #503-fanout `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` και `countCapEnabled`
  (false σε μια προεπιλεγμένη ανάπτυξη — επιβεβαιώνει ότι αυτό που εφαρμόζεται στην
  πράξη είναι ο προϋπολογισμός byte και όχι το παλαιό όριο πλήθους).

## 2. Προσαρμοστικές εικονικές λωρίδες κατά την εκτέλεση (`open-sse/services/admission`)

- **Πεδίο εφαρμογής:** έλεγχος αποδοχής βάσει κλειδιού tenant για τη δρομολόγηση προς provider — κόστος ουράς, προσαρμογή ορίων καθοδηγούμενη από την καθυστέρηση, τοποθέτηση σε ουρές λωρίδων και μετρικές λωρίδων.
- **Ενεργοποίηση:** **προαιρετική.** Είναι απενεργοποιημένη εκτός εάν έχει οριστεί `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Χωρίς αυτήν, ο προσαρμοστικός ελεγκτής διατηρεί τη συμπεριφορά της κοινόχρηστης ουράς (το κριτήριο 1 του #9654 ισχύει μόνο αφού ένας διαχειριστής ενεργοποιήσει τις λωρίδες).
- **Ρύθμιση:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + προσαρμοστική διαμόρφωση (`maxQueueCount`, `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Αναφορές:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`, `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (αδιαφανή αναγνωριστικά λωρίδων, ποτέ ανεπεξέργαστα κλειδιά) και `virtualLanes` — η έγκυρη σημαία «οι λωρίδες είναι ενεργοποιημένες» στο στιγμιότυπο.

## 3. Δοκιμές fan-out — έλεγχος αποδοχής ανά στόχο για combo/fusion (#9654 Κύμα 2)

Τα combo (προτεραιότητα / round-robin) και fusion εκτελούν fan-out σε N στόχους μοντέλων στο πλαίσιο ενός γονικού αιτήματος. Από το #9654 Κύμα 2 και μετά, **κάθε στόχος fan-out περνά από έλεγχο πριν από τη δρομολόγηση** μέσω μιας δοκιμής ανά στόχο (`PerTargetAdmissionHook`, η οποία δημιουργείται από το `createPerTargetAdmissionHook`) έναντι της λωρίδας tenant του **γονικού αιτήματος**.

- **Πεδίο εφαρμογής:** κάθε στόχος fan-out που δρομολογείται από τα combo, fusion και τη μηχανή chaos.
  Το Σύστημα 1 (σε επίπεδο byte) δεν επηρεάζεται — δεν εκτελεί ποτέ δοκιμές σε στόχους fan-out.
- **Ενεργοποίηση:** **προαιρετική μαζί με το σύστημα 2.** Δεν εκτελεί καμία ενέργεια όταν το `OMNIROUTE_CHAT_VIRTUAL_LANES`
  δεν έχει οριστεί — σε αυτήν τη λειτουργία, το γονικό αίτημα κατέχει ήδη τη μίσθωση της κοινόχρηστης ουράς,
  επομένως η εκτέλεση δοκιμών θα προκαλούσε διπλή καταμέτρηση και απόρριψη των στόχων combo.
- **Σημασιολογία:**
  - **Αυστηρά χωρίς αποκλεισμό — παράλειψη, ποτέ αναμονή σε ουρά.** `maxWaitMs 0`: μια πλήρης λωρίδα
    παραλείπει τον στόχο και εξυπηρετεί αντ’ αυτού ο μηχανισμός εναλλακτικής επιλογής του combo (ή το πάνελ επιζώντων του fusion).
    Αυτό είναι σκόπιμο: ένας στόχος fan-out αποτελεί πλεονάζουσα εργασία και η τοποθέτησή του σε ουρά προσθέτει περισσότερο φορτίο
    ακριβώς στη συμφόρηση που οι λωρίδες έχουν σχεδιαστεί να αποτρέπουν. Επομένως, το `defaultMaxWaitMs` εφαρμόζεται
    **μόνο στο γονικό αίτημα**· οι δοκιμές fan-out δεν περιμένουν ποτέ και, σκόπιμα, **δεν υπάρχει παράμετρος ρύθμισης**
    που να τις κάνει να περιμένουν (το ιστορικό του ζητήματος δείχνει ότι οι παράμετροι αναμονής προκαλούσαν τη μαζική
    κατηγορία σφαλμάτων 502/504 την οποία αποτρέπει το #9654 — να επανεξεταστεί μόνο εάν ένας διαχειριστής αναφέρει ότι
    οι παραλειπόμενοι στόχοι fan-out υποβαθμίζουν την ποιότητα των αποκρίσεων).
  - **Αποδέσμευση κατά την αποδοχή.** Μια δοκιμή που γίνεται αποδεκτή αποδεσμεύει αμέσως τη μίσθωσή της: αποτελεί
    πύλη χωρητικότητας, όχι δέσμευση. Η μίσθωση του γονικού αιτήματος καλύπτει το fan-out· η διατήρηση N επιπλέον
    μισθώσεων θα διόγκωνε το κοινόχρηστο ενεργό κόστος και θα προκαλούσε την απόρριψη άλλων tenant. Πρόκειται για
    προσέγγιση βέλτιστης προσπάθειας και όχι για κράτηση: η λωρίδα μπορεί να γεμίσει ξανά μεταξύ της δοκιμής και της
    δρομολόγησης, οπότε, υπό έντονο ανταγωνισμό, η πύλη μπορεί να επιτρέψει την είσοδο σε μια λωρίδα που έχει γεμίσει
    ξανά μέχρι τη στιγμή που δρομολογείται ο στόχος.
  - **Κοστολόγηση από το πραγματικό σώμα του fan-out.** Η δοκιμή εκτιμά το κόστος από το πραγματικό σώμα του στόχου —
    συμπεριλαμβανομένης της κλάσης αιτήματος που προκύπτει από τη σημαία `stream`, ακριβώς όπως στη διαδρομή του γονικού
    αιτήματος — ώστε τα μέλη του πάνελ fusion (`stream: false`) να κοστολογούνται σύμφωνα με την κλάση χωρίς streaming
    που πράγματι θα καταλάβουν και οι στόχοι προτεραιότητας/RR σύμφωνα με ό,τι ζήτησε ο χρήστης.
- **Αναφορές:** η παράλειψη μιας δοκιμής μετά τον πρώτο στόχο αυξάνει το `fallbackCount` του combo ανά αίτημα
  (αντικατοπτρίζοντας την υπάρχουσα σημασιολογία εναλλακτικής επιλογής· είναι ορατό στα αρχεία καταγραφής του combo)·
  το fusion επιστρέφει 503 όταν παραλείπονται όλα τα μέλη του πάνελ. Προς το παρόν, **δεν υπάρχει συγκεντρωτικός μετρητής**
  (π.χ. `virtualFanoutSkipped`) στο στιγμιότυπο — εάν ένας διαχειριστής αναφέρει ότι δεν μπορεί να διαπιστώσει πόσο συχνά
  η πύλη λωρίδας παραλείπει στόχους fan-out, αυτό αποτελεί το έναυσμα για την προσθήκη ενός τέτοιου μετρητή.

## Ποιο εμφανίζεται σε έναν πίνακα ελέγχου

- `adaptiveAdmission.laneCount` / `laneTenants` → **προσαρμοστικές εικονικές λωρίδες** (σύστημα 2).
- `adaptiveAdmission.virtualLanes === true` → οι ανιχνεύσεις fan-out της ενότητας 3 είναι
  επίσης ενεργές. Ένα payload στο οποίο το `virtualLanes` λείπει ή είναι `false` σημαίνει ότι
  το `OMNIROUTE_CHAT_VIRTUAL_LANES` δεν έχει οριστεί — οι λωρίδες σε επίπεδο byte (σύστημα 1)
  εξακολουθούν να είναι ενεργές, αλλά τίποτα κάτω από το `adaptiveAdmission` (ούτε κάποιος
  έλεγχος αποδοχής fan-out) δεν τίθεται σε ισχύ μέχρι να ενεργοποιηθεί.

## Γιατί υπάρχουν και τα δύο

Οι λωρίδες σε επίπεδο byte περιορίζουν τη διαδρομή ανάλυσης/συμπίεσης με υψηλές απαιτήσεις μνήμης· οι προσαρμοστικές λωρίδες
περιορίζουν το κόστος αποστολής ανά μισθωτή. Το κριτήριο 1 του #9654 («η αιχμή μίας συνεδρίας δεν προκαλεί 503
σε άλλη») επιβάλλεται άνευ όρων από το σύστημα 1 και από το σύστημα 2 μόλις ενεργοποιηθεί η προαιρετική συμμετοχή.

## 4. Παρατεταμένα `/v1/responses` σε μία διεργασία (υγιές περιθώριο)

Το [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) πρόσθεσε το
`tryAcquireHealthyHeadroom`, ώστε να γίνεται αποδεκτό ένα δεύτερο αίτημα υψηλής δομικής πολυπλοκότητας
όταν το heap βρίσκεται κάτω από το `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. Η διαδρομή BYTE
που χρησιμοποιείται από το `admitChatRequest` (σώματα ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
προεπιλογή 256 KiB, συμπεριλαμβανομένου του `POST /v1/responses`) χρησιμοποιεί την **ίδια** διέξοδο.

Αυτή είναι η υποστηριζόμενη συνταγή **μίας διεργασίας** για περισσότερα από δύο ταυτόχρονα παρατεταμένα
SSE `/v1/responses`: αυξήστε το κύριο όριο + το υγιές περιθώριο μόνο όσο επιτρέπουν το heap
και το όριο byte αιτημάτων σε εξέλιξη σε επίπεδο διεργασίας (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110). Η υποστήριξη δεκάδων παρατεταμένων πελατών SSE (40–50) είναι ζήτημα αυτού του προϋπολογισμού μνήμης
και όχι ένα ανελαστικό όριο προϊόντος «το πολύ 2». Ένα heap υπό πίεση εξακολουθεί να απορρίπτει αιτήματα με
επαναλήψιμο `503`, ώστε να μην επανεμφανιστεί το #7849.

Για να **πολλαπλασιάσετε τα heap**, εκτελέστε N ανεξάρτητα `DATA_DIR` (#11024). Ποτέ μην ορίζετε
`replicas > 1` για ένα αρχείο SQLite (#10350). Αυτή η ενότητα δεν αποτελεί επανεξέταση της
συνταγής οριζόντιας κλιμάκωσης μέσω DATA_DIR.
