# Developer environment notes (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Αυτή η σελίδα εξηγεί τη συμπεριφορά του τοπικού αρχείου `.env` του έργου και τον τρόπο διαχείρισης αρχείων περιβάλλοντος και μυστικών κατά την ανάπτυξη του OmniRoute.

## Συμπεριφορά του .env κατά το postinstall

Το έργο ενδέχεται να δημιουργήσει ένα τοπικό αρχείο `.env` κατά την εκτέλεση του `npm install` / `postinstall` για τη διευκόλυνση των προγραμματιστών. Αυτό το αρχείο προορίζεται αποκλειστικά για τοπική ανάπτυξη και δοκιμές και δεν πρέπει ποτέ να υποβάλλεται στο σύστημα ελέγχου εκδόσεων.

Βασικά σημεία:

- Το `.gitignore` του αποθετηρίου αγνοεί ήδη τα αρχεία `.env*` (δείτε την καταχώριση στο `.gitignore`). Μην καταργήσετε ή τροποποιήσετε αυτόν τον κανόνα, εκτός εάν σκοπεύετε συνειδητά να υποβάλετε ένα συγκεκριμένο αρχείο παραδείγματος και διαθέτετε τεκμηριωμένη διαδικασία για αυτό.
- Εάν ένα πραγματικό μυστικό υποβληθεί κατά λάθος στο αποθετήριο, αλλάξτε/ανακαλέστε αμέσως το διαπιστευτήριο και αφαιρέστε το από το ιστορικό του αποθετηρίου (για παράδειγμα, χρησιμοποιώντας το `git filter-repo` ή μια αντίστοιχη διαδικασία αποκατάστασης). Επικοινωνήστε με τον υπεύθυνο ασφάλειας/επικοινωνίας εάν χρειάζεστε βοήθεια.
- Για το CI και την παραγωγή, χρησιμοποιήστε τα μυστικά του CI ή ένα σύστημα διαχείρισης μυστικών (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault κ.λπ.), αντί να υποβάλλετε μυστικά σε αρχεία.

## Συνιστώμενη τοπική ροή εργασίας

- Διατηρείτε το `.env` μόνο στον τοπικό χώρο εργασίας σας. Χρησιμοποιήστε το `.env.example` (το οποίο παρακολουθείται ήδη) για να τεκμηριώσετε τις απαιτούμενες μεταβλητές και τις αποδεκτές τιμές παραδείγματος.
- Όταν εκτελείτε τοπικά δοκιμές που απαιτούν τιμές παρόμοιες με μυστικά, προτιμήστε συνθετικά σύμβολα κράτησης θέσης ή προσωρινά κλειδιά που δημιουργούνται κατά την εκτέλεση, αντί για πραγματικά διαπιστευτήρια.
- Προσθέστε ένα σύντομο σχόλιο στις δοκιμές που χρησιμοποιούν σύμβολα κράτησης θέσης, ώστε οι αξιολογητές να κατανοούν ότι τα δεδομένα δοκιμής είναι συνθετικά.

## Σημειώσεις για σαρωτές

- Ορισμένοι μεταγλωττισμένοι ή δυαδικοί πόροι (π.χ. ενσωματωμένα blob WASM σε base64) μπορεί να περιέχουν υποσυμβολοσειρές ASCII που μοιάζουν με διαπιστευτήρια και ενδέχεται να ενεργοποιήσουν σαρωτές μυστικών που βασίζονται σε κείμενο. Εάν αυτοί οι πόροι είναι νόμιμοι, είτε προσθέστε τους στη λίστα επιτρεπόμενων του σαρωτή είτε εξαιρέστε τους αντίστοιχους καταλόγους στη ρύθμιση παραμέτρων του σαρωτή.

## Εάν εντοπίσετε διαρροή

1. Αλλάξτε/ανακαλέστε αμέσως το κλειδί.
2. Αφαιρέστε το μυστικό από το ιστορικό και, εάν είναι απαραίτητο, πραγματοποιήστε αναγκαστική προώθηση ενός καθαρισμένου κλάδου.
3. Ειδοποιήστε τους συντηρητές και ακολουθήστε τη λίστα ελέγχου απόκρισης σε περιστατικά του οργανισμού σας.
