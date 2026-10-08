# Management Authentication (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

Το OmniRoute διαθέτει **τέσσερις οικογένειες διαπιστευτηρίων** που μπορούν να εξουσιοδοτήσουν διαδρομές διαχείρισης.
Δεν είναι εναλλάξιμες. Τα κλειδιά Inference API (`sk-…`) **δεν** διαχειρίζονται τον
διακομιστή, εκτός εάν τους έχει εκχωρηθεί ρητά το πεδίο εφαρμογής `manage` ή `admin`.

Κανονική υλοποίηση: `src/lib/api/requireManagementAuth.ts`.

| Διαπιστευτήριο                          | Τυπική μορφή                             | Πού δημιουργείται                                          | Προοριζόμενη χρήση                        | Δυνατότητα διαχείρισης                                                                                  |
| --------------------------------------- | ---------------------------------------- | ---------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Συνεδρία JWT του Dashboard              | cookie `auth_token`                      | Σύνδεση στο Dashboard                                      | Περιβάλλον χρήστη προγράμματος περιήγησης | Πλήρης διαχείριση μέσω Dashboard, υπό τους κανόνες CSRF, τοπικότητας και πάντα προστατευμένων διαδρομών |
| Διακριτικό machine-id του CLI           | εσωτερικό / τοπικό                       | Αρχικοποίηση CLI (`omniroute` στο ίδιο μηχάνημα)           | Τοπικό CLI                                | Μόνο τοπική διαχείριση                                                                                  |
| Διακριτικό πρόσβασης με πεδία εφαρμογής | `oma_live_…`                             | **Ρυθμίσεις → Διακριτικά πρόσβασης** ή `omniroute connect` | Απομακρυσμένο CLI και API διαχείρισης     | Πρέπει να ικανοποιεί το απαιτούμενο πεδίο εφαρμογής `read`, `write` ή `admin` της διαδρομής             |
| Κλειδί Inference API                    | `sk-…` (και άλλα προθέματα κλειδιών API) | **Διαχείριση API / Κλειδιά API**                           | Συμπερασματολογία `/v1/*`                 | **Καμία**, εκτός εάν τα μεταδεδομένα του κλειδιού περιλαμβάνουν `manage` ή `admin`                      |

Τα διαπιστευτήρια `oma_` είναι διαπιστευτήρια διαχείρισης/CLI. **Δεν** είναι κλειδιά Inference API.

Εάν ο έλεγχος ταυτότητας μέσω σύνδεσης/κλειδιού API είναι απενεργοποιημένος για τον διακομιστή, ορισμένες διαδρομές διαχείρισης ενδέχεται να
δέχονται κλήσεις χωρίς έλεγχο ταυτότητας. Οι διαδρομές που είναι μόνο τοπικές και οι πάντα προστατευμένες διαδρομές εξακολουθούν να εφαρμόζουν
τους δικούς τους κανόνες. Επομένως, η παρουσίαση ενός από αυτά τα διαπιστευτήρια δεν είναι καθολικά
υποχρεωτική και η κατοχή του δεν είναι καθολικά επαρκής χωρίς το απαιτούμενο
πεδίο εφαρμογής και την τοπικότητα της διαδρομής.

Σχετικό: [Απομακρυσμένη λειτουργία](./REMOTE-MODE.md) (πώς εκδίδεται το `oma_live_…` για ένα απομακρυσμένο CLI).

---

## Πίνακες αντιστοίχισης scope

Τα scope διαχείρισης κλειδιών API και τα scope διακριτικών πρόσβασης χρησιμοποιούν διαφορετικά λεξιλόγια.
Τα scope εργαλείων MCP αποτελούν ένα τρίτο λεξιλόγιο και ελέγχονται με το `scopeMatches` αντί για
οποιαδήποτε από τις συναρτήσεις στους παρακάτω πίνακες. Παράθεση δίπλα-δίπλα:
[Τρεις χώροι ονομάτων scope](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Scope διακριτικών πρόσβασης (`oma_live_…`)

| Scope   | Τυπικές λειτουργίες                                                                                                     |
| ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `read`  | Αιτήματα GET λίστας/κατάστασης που επιτρέπεται να βλέπει το διακριτικό                                                  |
| `write` | Μεταβολές (δημιουργία/ενημέρωση/διαγραφή) κάτω από το επίπεδο διαχειριστή                                               |
| `admin` | Πλήρες απομακρυσμένο CLI / διακριτικό σύνδεσης (η αρχικοποίηση μέσω κωδικού πρόσβασης χρησιμοποιεί αυτό από προεπιλογή) |

Ένα διακριτικό με `read` δεν μπορεί να καλέσει μια διαδρομή `write`. Μορφή μηνύματος κατά τον χρόνο εκτέλεσης:
`Το scope διακριτικού πρόσβασης '<have>' δεν επαρκεί· απαιτείται '<need>'.`

### Scope διαχείρισης κλειδιών API

| Scope    | Σημασία                                                                                         |
| -------- | ----------------------------------------------------------------------------------------------- |
| (κανένα) | Μόνο εξαγωγή συμπερασμάτων. Οι διαδρομές διαχείρισης επιστρέφουν 403.                           |
| `manage` | API διαχείρισης (ίδιος έλεγχος πρόσβασης με τον κλάδο κλειδιού API του `requireManagementAuth`) |
| `admin`  | Ικανοποιεί επίσης το `hasManageScope` (αντιμετωπίζεται ως ικανό για διαχείριση)                 |

Ενεργοποιήστε το `manage` για το κλειδί στο περιβάλλον εργασίας API Keys / API Manager. Μην επαναχρησιμοποιείτε ένα
κλειδί προγράμματος-πελάτη συνομιλίας για αυτοματοποίηση, εκτός εάν του έχετε εκχωρήσει σκόπιμα αυτό το scope.

---

## Τρόπος δημιουργίας και ανάκλησης

### Συνεδρία JWT του πίνακα ελέγχου

1. Ανοίξτε το `/login` και συνδεθείτε με τον κωδικό πρόσβασης διαχείρισης (`INITIAL_PASSWORD` κατά την πρώτη εκκίνηση).
2. Το cookie `auth_token` είναι HttpOnly. Ο πίνακας ελέγχου στο πρόγραμμα περιήγησης το χρησιμοποιεί αυτόματα.
3. Αποσυνδεθείτε μέσω του `/api/auth/logout`. Δεν υπάρχει μακρόβιο μυστικό για αντιγραφή.

### Token machine-id του CLI

1. Εκτελέστε το `omniroute` στον **ίδιο κεντρικό υπολογιστή** με τον διακομιστή (loopback).
2. Το CLI αρχικοποιεί ένα token machine-id στο `~/.omniroute/` (chmod 600).
3. Αυτό **δεν** λειτουργεί από άλλο μηχάνημα. Χρησιμοποιήστε ένα Access Token για απομακρυσμένο CLI.

### Access Token με scope (`oma_live_…`)

1. Πίνακας ελέγχου: **Ρυθμίσεις → Access Tokens** → δημιουργία (όνομα + scope). **Το μυστικό εμφανίζεται μία φορά.**
2. Ή μέσω CLI: `omniroute connect <host>` (κωδικός πρόσβασης → token). Ανατρέξτε στην [Απομακρυσμένη λειτουργία](./REMOTE-MODE.md).
3. Κεφαλίδα: `Authorization: Bearer oma_live_…`
4. Ανακαλέστε το από την ίδια σελίδα Access Tokens (ή διαγράψτε το περιβάλλον του CLI).
5. Ο διακομιστής αποθηκεύει μόνο ένα hash. Αντιμετωπίστε το απλό κείμενο σαν κωδικό πρόσβασης.

### Κλειδί API με scope διαχείρισης

1. Πίνακας ελέγχου: **Διαχείριση API / Κλειδιά API** → δημιουργήστε ή επεξεργαστείτε ένα κλειδί → ενεργοποιήστε το `manage` (ή το `admin`).
2. Κεφαλίδα: `Authorization: Bearer sk-…` (το πραγματικό πρόθεμα του κλειδιού).
3. Ανακαλέστε το ή αφαιρέστε το `manage` από την ίδια διεπαφή.
4. Ελάχιστο προνόμιο για αυτοματισμούς που δεν χρησιμοποιούν το CLI: προτιμήστε ένα Access Token με `read` για εργασίες μόνο GET· χρησιμοποιήστε το `manage` σε ένα κλειδί API μόνο όταν ο καλών πρέπει να επικοινωνεί τόσο με το `/v1` όσο και με τη διαχείριση.

---

## Μορφή κεφαλίδας

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Μην τοποθετείτε διαπιστευτήρια διαχείρισης στη διαδρομή URL ή στη συμβολοσειρά ερωτήματος. Ο έλεγχος ταυτότητας για τη διαχείριση γίνεται μόνο μέσω κεφαλίδας/cookie.

---

## Παραδείγματα για αντιγραφή και επικόλληση

Μόνο για ανάγνωση (λίστα παρόχων). Χρησιμοποιήστε ένα Access Token με δικαίωμα `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Για τροποποίηση (δημιουργία σύνδεσης παρόχου). Χρησιμοποιήστε Access Token με δικαίωμα `write`/`admin` ή API key με scope `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Για inference (όχι για διαχείριση). Συνήθης API key, χωρίς να απαιτείται `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Τρέχοντα σφάλματα χρόνου εκτέλεσης (μην εμφανίζετε ξανά μυστικά)

| Περίπτωση                                          | Τυπική κατάσταση | Μήνυμα (αποκρύπτονται ευαίσθητα δεδομένα)                                                                |
| -------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| Δεν υπάρχουν διαπιστευτήρια                        | 401              | `Απαιτείται έλεγχος ταυτότητας`                                                                          |
| Μη έγκυρο/ληγμένο `oma_live_…`                     | 401              | `Μη έγκυρο ή ληγμένο διακριτικό πρόσβασης`                                                               |
| Έγκυρο κλειδί API χωρίς `manage`/`admin`           | 403              | `Το κλειδί API δεν διαθέτει το πεδίο εφαρμογής 'manage'. Ενεργοποιήστε το στον πίνακα ελέγχου API Keys.` |
| Μη έγκυρο κοινό κλειδί API σε διαδρομή διαχείρισης | 403              | `Μη έγκυρο διακριτικό διαχείρισης`                                                                       |
| Πολύ περιορισμένο πεδίο εφαρμογής του Access Token | 403              | `Το πεδίο εφαρμογής του διακριτικού πρόσβασης '<have>' δεν επαρκεί· απαιτείται το '<need>'.`             |

Το "Μη έγκυρο διακριτικό διαχείρισης" σημαίνει ότι το διακριτικό bearer **δεν**
έγινε αποδεκτό ως διαπιστευτήριο διαχείρισης. **Δεν** υποδεικνύει ποια οικογένεια
πρέπει να δημιουργήσετε. Χρησιμοποιήστε τον παραπάνω πίνακα: τα κλειδιά inference
χρειάζονται πεδίο εφαρμογής `manage`, το απομακρυσμένο CLI χρειάζεται `oma_live_…`
και ο πίνακας ελέγχου χρησιμοποιεί το cookie συνεδρίας.

---

## Προτεινόμενη επιλογή ελάχιστων προνομίων

| Καλών                                                                | Χρήση                                           |
| -------------------------------------------------------------------- | ----------------------------------------------- |
| Πρόγραμμα περιήγησης                                                 | Συνεδρία του Dashboard                          |
| CLI στον κεντρικό υπολογιστή του διακομιστή                          | Διακριτικό μηχανήματος                          |
| CLI σε φορητό υπολογιστή που επικοινωνεί με απομακρυσμένο διακομιστή | `oma_live_…` από το `omniroute connect`         |
| CI / σενάρια (μόνο για διαχείριση)                                   | `oma_live_…` με το μικρότερο εύρος που επαρκεί  |
| CI που πρέπει να καλεί τόσο το `/v1` όσο και το `/api`               | Κλειδί API με `manage` **ή** δύο διαπιστευτήρια |
