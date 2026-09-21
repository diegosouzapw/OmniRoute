# Management Authentication (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

Το OmniRoute διαθέτει **τέσσερις οικογένειες διαπιστευτηρίων** που μπορούν να εξουσιοδοτήσουν διαδρομές διαχείρισης.
Δεν είναι εναλλάξιμες. Τα κλειδιά API συμπερασματολογίας (`sk-…`) **δεν** διαχειρίζονται τον
διακομιστή, εκτός εάν τους έχει εκχωρηθεί ρητά το scope `manage` ή `admin`.

Κανονική υλοποίηση: `src/lib/api/requireManagementAuth.ts`.

| Διαπιστευτήριο                  | Τυπική μορφή                             | Πού δημιουργείται                                   | Προβλεπόμενη χρήση                      | Δυνατότητα διαχείρισης                                                                                                       |
| ------------------------------- | ---------------------------------------- | --------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Συνεδρία JWT του πίνακα ελέγχου | cookie `auth_token`                      | Σύνδεση στον πίνακα ελέγχου                         | Διεπαφή χρήστη στο πρόγραμμα περιήγησης | Πλήρης διαχείριση μέσω του πίνακα ελέγχου, με την επιφύλαξη των κανόνων CSRF, τοπικότητας και πάντα προστατευμένων διαδρομών |
| Token machine-id του CLI        | εσωτερικό / τοπικό                       | Αρχικοποίηση CLI (`omniroute` στο ίδιο μηχάνημα)    | Τοπικό CLI                              | Μόνο τοπική διαχείριση                                                                                                       |
| Access Token με scope           | `oma_live_…`                             | **Ρυθμίσεις → Access Tokens** ή `omniroute connect` | Απομακρυσμένο CLI και API διαχείρισης   | Πρέπει να ικανοποιεί το απαιτούμενο scope `read`, `write` ή `admin` της διαδρομής                                            |
| Κλειδί API συμπερασματολογίας   | `sk-…` (και άλλα προθέματα κλειδιών API) | **Διαχείριση API / Κλειδιά API**                    | Συμπερασματολογία `/v1/*`               | **Καμία** εκτός εάν τα μεταδεδομένα του κλειδιού περιλαμβάνουν `manage` ή `admin`                                            |

Τα διαπιστευτήρια `oma_` είναι διαπιστευτήρια διαχείρισης/CLI. **Δεν** είναι κλειδιά API συμπερασματολογίας.

Εάν ο έλεγχος ταυτότητας μέσω σύνδεσης/κλειδιού API είναι απενεργοποιημένος για τον διακομιστή, ορισμένες διαδρομές διαχείρισης ενδέχεται
να αποδέχονται κλήσεις χωρίς έλεγχο ταυτότητας. Οι διαδρομές που είναι μόνο τοπικές και οι πάντα προστατευμένες διαδρομές εξακολουθούν να εφαρμόζουν
τους δικούς τους κανόνες. Επομένως, η παροχή ενός από αυτά τα διαπιστευτήρια δεν είναι καθολικά
υποχρεωτική και η κατοχή του δεν είναι καθολικά επαρκής χωρίς το απαιτούμενο
scope και την τοπικότητα της διαδρομής.

Σχετικό θέμα: [Απομακρυσμένη λειτουργία](./REMOTE-MODE.md) (πώς δημιουργείται το `oma_live_…` για ένα απομακρυσμένο CLI).

---

## Πίνακες scope

Αυτά τα δύο λεξιλόγια scope είναι **διαφορετικά**. Μην τα συγχέετε.

### Scope των Access Token (`oma_live_…`)

| Scope   | Τυπικές λειτουργίες                                                                                                |
| ------- | ------------------------------------------------------------------------------------------------------------------ |
| `read`  | Αιτήματα GET λίστας/κατάστασης που επιτρέπεται να βλέπει το token                                                  |
| `write` | Μεταβολές (δημιουργία/ενημέρωση/διαγραφή) χαμηλότερου επιπέδου από το admin                                        |
| `admin` | Πλήρες απομακρυσμένο CLI / token σύνδεσης (η αρχικοποίηση μέσω κωδικού πρόσβασης χρησιμοποιεί αυτό από προεπιλογή) |

Ένα token με `read` δεν μπορεί να καλέσει μια διαδρομή `write`. Μορφή μηνύματος κατά την εκτέλεση:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Scope διαχείρισης κλειδιών API

| Scope    | Σημασία                                                                           |
| -------- | --------------------------------------------------------------------------------- |
| (κανένα) | Μόνο συμπερασματολογία. Οι διαδρομές διαχείρισης επιστρέφουν 403.                 |
| `manage` | API διαχείρισης (ίδια πύλη με τον κλάδο κλειδιού API του `requireManagementAuth`) |
| `admin`  | Ικανοποιεί επίσης το `hasManageScope` (αντιμετωπίζεται ως ικανό για διαχείριση)   |

Ενεργοποιήστε το `manage` στο κλειδί από τη διεπαφή Κλειδιά API / Διαχείριση API. Μην επαναχρησιμοποιείτε ένα
κλειδί προγράμματος-πελάτη συνομιλίας για αυτοματοποίηση, εκτός εάν έχετε εκχωρήσει σκόπιμα αυτό το scope.

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

## Τρέχοντα σφάλματα κατά την εκτέλεση (μην εμφανίζετε μυστικά)

| Περίπτωση                                         | Τυπικός κωδικός κατάστασης | Μήνυμα (αποκρύπτονται ευαίσθητα δεδομένα)                            |
| ------------------------------------------------- | -------------------------- | -------------------------------------------------------------------- |
| Χωρίς διαπιστευτήριο                              | 401                        | `Authentication required`                                            |
| Μη έγκυρο/ληγμένο `oma_live_…`                    | 401                        | `Invalid or expired access token`                                    |
| Έγκυρο API key χωρίς `manage`/`admin`             | 403                        | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Μη έγκυρο συνήθες API key σε διαδρομή διαχείρισης | 403                        | `Invalid management token`                                           |
| Ανεπαρκές scope του Access Token                  | 403                        | `Access token scope '<have>' is insufficient; '<need>' required.`    |

Το «Invalid management token» σημαίνει ότι το διακριτικό bearer **δεν** έγινε αποδεκτό ως διαπιστευτήριο διαχείρισης. **Δεν** υποδεικνύει ποιο είδος διαπιστευτηρίου πρέπει να δημιουργήσετε. Χρησιμοποιήστε τον παραπάνω πίνακα: τα κλειδιά inference χρειάζονται scope `manage`, το απομακρυσμένο CLI χρειάζεται `oma_live_…`, ενώ ο πίνακας ελέγχου χρησιμοποιεί το cookie συνεδρίας.

---

## Συνιστώμενη επιλογή ελάχιστων προνομίων

| Καλών                                                                | Χρήση                                          |
| -------------------------------------------------------------------- | ---------------------------------------------- |
| Πρόγραμμα περιήγησης                                                 | Συνεδρία πίνακα ελέγχου                        |
| CLI στον κεντρικό υπολογιστή του διακομιστή                          | Machine token                                  |
| CLI σε φορητό υπολογιστή που επικοινωνεί με απομακρυσμένο διακομιστή | `oma_live_…` από το `omniroute connect`        |
| CI / scripts (μόνο για διαχείριση)                                   | `oma_live_…` με το μικρότερο scope που επαρκεί |
| CI που πρέπει να καλεί τόσο το `/v1` όσο και το `/api`               | API key με `manage` **ή** δύο διαπιστευτήρια   |
