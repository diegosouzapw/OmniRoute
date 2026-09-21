# Account-Ban / Banned-Keyword Detection (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

Το OmniRoute σαρώνει τις αποκρίσεις σφαλμάτων των upstream παρόχων για ενδείξεις ότι ένας
**λογαριασμός παρόχου είναι οριστικά ανενεργός** (σε αναστολή / απενεργοποιημένος / αποκλεισμένος λόγω Όρων Παροχής Υπηρεσιών) και, όταν
εντοπίζεται αντιστοιχία, μεταφέρει αυτήν τη σύνδεση σε μια **τερματική κατάσταση `banned`**, ώστε να μην
επιλέγεται πλέον για αιτήματα. Αυτό ρυθμίζει η κάρτα ρυθμίσεων **Ασφάλεια → Απαγορευμένες λέξεις-κλειδιά**
("Πρόσθετες λέξεις-κλειδιά που ενεργοποιούν τον εντοπισμό οριστικού αποκλεισμού
λογαριασμού. Οι ενσωματωμένες λέξεις-κλειδιά εφαρμόζονται πάντα.").

Αυτή η σελίδα τεκμηριώνει την ενσωματωμένη λίστα, τη ροή εντοπισμού, το πεδίο εφαρμογής της, τον τρόπο ασφαλούς
προσθήκης προσαρμοσμένων λέξεων-κλειδιών και τον τρόπο επαναφοράς μιας σύνδεσης που έχει επισημανθεί. Η ίδια η τερματική
κατάσταση αποτελεί μέρος του μοντέλου ανθεκτικότητας — δείτε το
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Τερματικές καταστάσεις").

**Πηγή αλήθειας:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Ενσωματωμένες λέξεις-κλειδιά

Αυτές οι 8 υποσυμβολοσειρές εφαρμόζονται πάντα (χωρίς διάκριση πεζών-κεφαλαίων), ανεξάρτητα από οποιαδήποτε προσαρμοσμένη λίστα:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Αυτή η λίστα εξελίσσεται καθώς οι πάροχοι αλλάζουν τη διατύπωση των μηνυμάτων αποκλεισμού τους. Το έγκυρο
> αντίγραφο είναι το `ACCOUNT_DEACTIVATED_SIGNALS` στο `open-sse/services/accountFallback.ts`·
> θεωρήστε το παραπάνω τμήμα ως στιγμιότυπο.

Δύο γειτονικοί, **ξεχωριστοί** πίνακες σημάτων βρίσκονται στο ίδιο αρχείο και _δεν_ αποτελούν μέρος
του εντοπισμού απαγορευμένων λέξεων-κλειδιών:

- `CREDITS_EXHAUSTED_SIGNALS` — εξαντλημένο υπόλοιπο χρέωσης/όριο χρήσης (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → τερματική κατάσταση `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **μη τερματική κατάσταση**· η ανανέωση του token μπορεί να αποκαταστήσει τη λειτουργία.

Σημείωση: συνήθεις προσωρινές φράσεις όπως **`rate limit`** / `429` αντιμετωπίζονται από τη
διαδρομή περιορισμού ρυθμού / περιόδου αναμονής σύνδεσης και **δεν** αποτελούν σήματα αποκλεισμού.

## Ροή εντοπισμού

```
απόκριση σφάλματος από upstream πάροχο
  → το σώμα μετατρέπεται σε συμβολοσειρά + σε πεζά
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [αντιστοίχιση υποσυμβολοσειράς]
  → αντιστοιχία;
      → testStatus σύνδεσης = "banned"      (μόνιμο — περίοδος αναμονής 1 έτους, χωρίς αυτόματη επαναφορά)
      → αν η ρύθμιση `autoDisableBannedAccounts` είναι ενεργοποιημένη και το `autoDisableBannedScope`
        περιλαμβάνει αυτήν τη σύνδεση (`all` ή `subscription` για OAuth/cookie/session)
        → τότε επίσης isActive = false. Τα προπληρωμένα κλειδιά API παραμένουν ενεργά όταν το πεδίο εφαρμογής είναι
        `subscription`.
      → η σύνδεση παραλείπεται κατά την επιλογή λογαριασμού (συνδυασμένες καταστάσεις QUOTA_BLOCKING)
```

- Η αντιστοίχιση είναι αναζήτηση **υποσυμβολοσειράς χωρίς διάκριση πεζών-κεφαλαίων** στο **σώμα** της απόκρισης
  (`isAccountDeactivated`, `accountFallback.ts`).
- Η μόνιμη μετάβαση στην τερματική κατάσταση `banned` ενεργοποιείται όταν το σώμα περιέχει σήμα αποκλεισμού, σε **οποιαδήποτε
  κατάσταση HTTP** (μέσω `markAccountUnavailable` → `checkFallbackError`). Η
  πιο περιορισμένη ετικέτα **`deactivated`** (`isActive=false` όταν η σύνδεση δεν διαθέτει
  εφεδρικά κλειδιά API) καταγράφεται από την ενσωματωμένη διαδρομή του `chatCore.ts` για **HTTP 401 / 403**
  (ταξινομημένη μέσω `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Σημειώστε ότι η
  διαδρομή `markAccountUnavailable()` καταγράφει μια _διαφορετική_ τερματική κατάσταση —
  **`expired`** — για το ίδιο σήμα `ACCOUNT_DEACTIVATED` (μέσω
  `resolveTerminalConnectionStatus`), επομένως ο ίδιος αποκλεισμός μπορεί να εμφανιστεί είτε ως
  `deactivated` είτε ως `expired`, ανάλογα με το ποια διαδρομή χειρίστηκε την απόκριση. (Το
  παλαιότερο σχόλιο κώδικα αναφέρει "όταν ένα σώμα 401 περιέχει αυτές τις συμβολοσειρές" — αυτό
  υποβαθμίζει την έκταση της τρέχουσας συμπεριφοράς.)
- Μια σύνδεση `banned` εξαιρείται από την επιλογή παντού όπου φιλτράρονται οι τερματικές καταστάσεις
  (`isTerminalConnectionStatus`, συνδυασμένες `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Πεδίο εφαρμογής — ποιοι πάροχοι σαρώνονται

**Όλοι οι πάροχοι.** Ο έλεγχος εκτελείται στη γενική ροή διαχείρισης σφαλμάτων, από την οποία
διέρχεται κάθε αποτυχημένο αίτημα προς upstream υπηρεσία — **δεν** περιορίζεται σε
scrapers OAuth/συνδρομών. Η τελική κατάσταση που προκύπτει αφορά κάθε **σύνδεση**,
όχι κάθε πάροχο.

Ωστόσο, οι ενσωματωμένες _συμβολοσειρές_ είναι προσανατολισμένες σε παρόχους
συνδρομών/OAuth με πραγματικό κίνδυνο αποκλεισμού (ChatGPT Web Codex, Claude Web,
Codex, Muse Spark, Antigravity). Ένας πάροχος με κλειδί API θα ενεργοποιήσει τον
ανιχνευτή μόνο αν το σώμα του σφάλματός του περιέχει κυριολεκτικά μία από τις
υποσυμβολοσειρές.

Το `autoDisableBannedScope` (`all` | `subscription`, προεπιλογή `all`) ελέγχει αν
μια αντιστοίχιση θέτει επίσης `isActive=false`. Το `subscription` σημαίνει θέσεις
χρήσης τύπου σύνδεσης (συνδρομές επί πληρωμή και δωρεάν λογαριασμοί,
συμπεριλαμβανομένων συνεδριών με web cookies). Εξακολουθεί να καταγράφει
`testStatus=banned` για προπληρωμένα κλειδιά API, αλλά τα διατηρεί στη δεξαμενή
δρομολόγησης. Ο ανθεκτικός σχεδιασμός είναι μια παράκαμψη ανά πάροχο και ανά
λογαριασμό· το καθολικό enum είναι η πρώτη υλοποίηση.

## Προσαρμοσμένες λέξεις-κλειδιά αποκλεισμού

Προσθέστε ή αφαιρέστε λέξεις-κλειδιά στην ενότητα **Ασφάλεια → Λέξεις-κλειδιά αποκλεισμού**
(αποθηκεύονται μόνιμα ως η καθολική ρύθμιση `customBannedSignals` μέσω
`PATCH /api/settings`). **Προστίθενται** στην ενσωματωμένη λίστα — δεν την
αντικαθιστούν ποτέ — και επαναφορτώνονται δυναμικά κατά την αποθήκευση (και κατά
την εκκίνηση) μέσω της `setCustomBannedSignals()`. Κάθε λέξη-κλειδί περιορίζεται
στους 200 χαρακτήρες· δεν υπάρχει όριο μήκους για τον πίνακα.

**⚠ Κίνδυνος ψευδώς θετικών αποτελεσμάτων — επιλέξτε συγκεκριμένες φράσεις.**
Η ανίχνευση βασίζεται σε απλή αντιστοίχιση υποσυμβολοσειράς σε ολόκληρο το σώμα
της απόκρισης και μια αντιστοίχιση είναι **μόνιμη** (περίοδος αναμονής 1 έτους,
μη αυτόματη ανάκτηση). Μια γενική λέξη-κλειδί μπορεί να αποκλείσει μια απολύτως
υγιή σύνδεση:

- **Κακές επιλογές:** `quota`, `limit`, `error`, `denied` — εμφανίζονται σε πολλά παροδικά σφάλματα.
- **Καλές επιλογές:** πλήρεις προτάσεις αποκλεισμού, π.χ. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Προτιμήστε τη μεγαλύτερη σαφή φράση που επιστρέφει ο πάροχος σε έναν πραγματικό
αποκλεισμό. Σε περίπτωση αμφιβολίας, παρακολουθήστε πρώτα το `lastError` της
σύνδεσης και κατόπιν προσθέστε την ακριβή διατύπωση.

## Ανάκτηση μιας επισημασμένης σύνδεσης

Οι τελικές καταστάσεις `banned` / `deactivated` **δεν ανακτώνται ποτέ αυτόματα**
(εξαιρούνται από τον κύκλο προληπτικής ανάκτησης — μόνο οι περίοδοι αναμονής
`unavailable` ανακτώνται αυτόματα). Ένας χειριστής πρέπει να τις εκκαθαρίσει ρητά:

1. **Επανελέγξτε τη σύνδεση** — η ενέργεια **Δοκιμή** του πίνακα ελέγχου
   (`POST /api/providers/{id}/test`)· ένας επιτυχής έλεγχος επαναφέρει το
   `testStatus` σε `active` και εκκαθαρίζει τα πεδία σφάλματος.
2. **Επαναλάβετε τον έλεγχο ταυτότητας / επεξεργαστείτε τα διαπιστευτήρια** —
   για παρόχους OAuth, εκτελέστε ξανά τη ροή σύνδεσης / ανανέωσης· οι διαδρομές
   δημιουργίας/εισαγωγής παρόχων ορίζουν `isActive = true`.
3. **Ενεργοποιήστε ξανά τη σύνδεση** — αν η αυτόματη απενεργοποίηση έθεσε
   `isActive = false` (πεδίο εφαρμογής `all` ή `subscription` για σύνδεση
   OAuth/cookie/session), ενεργοποιήστε την ξανά αφού διορθώσετε τον λογαριασμό.

Δεν υπάρχει ξεχωριστό κουμπί «εκκαθάρισης σημαίας αποκλεισμού» — η ανάκτηση
πραγματοποιείται με επανέλεγχο, νέο έλεγχο ταυτότητας ή επανενεργοποίηση,
σύμφωνα με τον γενικό κανόνα τελικής κατάστασης στο
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Απομόνωση ελέγχων (έλεγχος όλων των μοντέλων)

Μια **αποτυχία που προέρχεται από έλεγχο** (αποστολές ελέγχου όλων των μοντέλων /
ελέγχου υγείας που εκτελούνται μέσα στη `runAsProbe`) δεν αφαιρεί ποτέ μια
σύνδεση από τη δεξαμενή (#9817): **καταγράφεται για λόγους ορατότητας**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`), αλλά παραλείπει
**κάθε** μεταβολή δρομολόγησης — περιόδους αναμονής, τελική κατάσταση
(`banned` / `deactivated` / `credits_exhausted`), αποκλεισμούς ανά μοντέλο,
τον διακόπτη κυκλώματος του παρόχου, την πεντάλεπτη κρυφή μνήμη quota,
την ανανέωση token OAuth και την αυτόματη απενεργοποίηση. Μόνο μια αποτυχία
στην πραγματική διαδρομή αιτήματος προκαλεί απενεργοποίηση. Το καταγεγραμμένο
σφάλμα είναι αυτό που καθιστά έναν επισημασμένο λογαριασμό ορατό στον πίνακα
ελέγχου, ενώ συνεχίζει να εξυπηρετεί κίνηση.

Το μοναδικό σημείο λήψης απόφασης είναι η `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), την οποία συμβουλεύεται **κάθε** σημείο που
θα μπορούσε να μεταβάλει την κατάσταση δρομολόγησης λόγω αποτυχίας προερχόμενης
από έλεγχο:

- `markAccountUnavailable` (`auth.ts`) — μόνο καταγραφή (το ακατέργαστο κείμενο
  στο `lastError`, `lastErrorType`, `errorCode`, `lastErrorAt`· σκοπίμως **χωρίς**
  `backoffLevel`, το οποίο θα ενεργοποιούσε την αυτόματη εξασθένηση κατά την
  επιλογή και θα διέγραφε την καταγραφή)
- `maybeAutoDisableBannedAccount` — χωρίς αυτόματη απενεργοποίηση
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (μόνο καταγραφή,
  χωρίς τελική κατάσταση `credits_exhausted`), GEO_BLOCKED (χωρίς αποκλεισμό
  24 ωρών), MODEL_NOT_FOUND (χωρίς `lockModel`), η εναλλαγή λογαριασμού κατά
  την ανακατεύθυνση λόγω codex 429 (χωρίς `markCodexScopeRateLimited`, χωρίς
  μόνιμη αποθήκευση του `rate_limited_until`, χωρίς εκκαθάριση συσχέτισης
  συνεδρίας), `persistCodexQuotaState` (χωρίς εγγραφή κατάστασης quota,
  χωρίς ακύρωση κρυφής μνήμης), `recordKeyHealthStatus` (ο μηχανισμός εναλλαγής
  κατάστασης υγείας κλειδιών παραμένει ανέπαφος)
- Ανανέωση OAuth — τόσο η προληπτική ανανέωση στη βασική κλάση του executor
  (`base.ts` `execute()`, χωρίς κατανάλωση εναλλαγής refresh token) όσο και η
  αντιδραστική διαδρομή 401/403 στο `chatCore` (χωρίς απενεργοποίηση `expired`)
- `chat.ts` — ο διακόπτης κυκλώματος του παρόχου και η πεντάλεπτη κρυφή μνήμη
  quota (`markAccountExhaustedFrom429`) δεν υποβαθμίζονται ποτέ

Το καταγεγραμμένο σφάλμα είναι αυτό που καθιστά έναν επισημασμένο λογαριασμό
ορατό στον πίνακα ελέγχου, ενώ συνεχίζει να εξυπηρετεί κίνηση. Σημείωση: η
καταγραφή του ελέγχου αποθηκεύει το **ακατέργαστο** (μη περικομμένο) κείμενο
σφάλματος, σε αντίθεση με την περικοπή `slice(0,100)` της πραγματικής διαδρομής.

Οι χειριστές που χρησιμοποιούν τον έλεγχο όλων ως εργαλείο συντήρησης μπορούν
να επαναφέρουν την ιστορική συμπεριφορά (ο έλεγχος υπολογίζεται ως πραγματική
δημιουργία) με έναν από τους εξής τρόπους:

- τη ρύθμιση `probeCanDisable` (`POST /api/settings` με
  `{"probeCanDisable": true}` ή απευθείας επεξεργασία της βάσης δεδομένων
  `key_value`), ή
- τη σημαία δυνατότητας **`PROBE_CAN_DISABLE=true`** (παράκαμψη μέσω env ή βάσης
  δεδομένων· υπερισχύει της ρύθμισης).

Μηχανισμός ασφαλούς αστοχίας: αν η αναζήτηση της σημαίας ή των ρυθμίσεων
προκαλέσει εξαίρεση, η απομόνωση παραμένει ΕΝΕΡΓΗ.

## Αρχεία προέλευσης

| Αντικείμενο                                              | Αρχείο                                                                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Πίνακες σημάτων + αντιστοίχιση                           | `open-sse/services/accountFallback.ts`                                                                        |
| Τερματισμός / αποθήκευση                                 | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Εμβέλεια αυτόματης απενεργοποίησης                       | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Ενσωματωμένη ταξινόμηση                                  | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Εξαίρεση ανάκτησης κατάστασης τερματισμού                | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Φόρτωση προσαρμοσμένων λέξεων-κλειδιών κατά την εκτέλεση | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Περιβάλλον χρήστη ρυθμίσεων                              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
