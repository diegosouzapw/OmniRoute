# Cursor Provider in Docker Environments (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Όταν το OmniRoute εκτελείται μέσα σε Docker, οι παλαιότερες ροές **Εισαγωγή από το Cursor IDE** /
`cursor-agent` αποτυγχάνουν, επειδή το container δεν μπορεί να δει την εγκατάσταση του Cursor
στον host. Χρησιμοποιήστε αντ’ αυτού τη **Σύνδεση με Cursor** (deep-control PKCE).

## Γιατί αποτυγχάνει η εισαγωγή IDE / CLI στο Docker

1. **Απομόνωση συστήματος αρχείων** — Η αυτόματη εισαγωγή αναζητά διαδρομές Linux όπως
   `~/.config/Cursor/User/globalStorage/state.vscdb` _μέσα_ στο container.
   Στο Docker Desktop για macOS, η βάση δεδομένων του IDE στον host δεν προσαρτάται από προεπιλογή, ενώ
   το λειτουργικό σύστημα του container είναι Linux ακόμη και όταν ο host είναι Darwin.
2. **Απουσία του εκτελέσιμου `cursor-agent`** — Οι επίσημες εικόνες του OmniRoute δεν περιλαμβάνουν
   το `cursor-agent`. Προηγουμένως, τα Διαθέσιμα μοντέλα εκτελούσαν μέσω shell το
   `cursor-agent --list-models` και, σε περίπτωση αποτυχίας, χρησιμοποιούσαν έναν στατικό κατάλογο.
3. **Λανθασμένο εκτελέσιμο** — **Μην** προσαρτάτε μέσω bind-mount ένα `cursor-agent` για macOS σε ένα
   container Linux. Δεν θα εκτελεστεί.

## Συνιστώμενη μέθοδος: Σύνδεση με Cursor

1. Ανοίξτε **Πίνακας ελέγχου → Πάροχοι → Cursor**.
2. Επιλέξτε την καρτέλα **Σύνδεση με Cursor**.
3. Κάντε κλικ στη **Σύνδεση με Cursor** — το OmniRoute ανοίγει το
   `https://cursor.com/loginDeepControl?…` στο πρόγραμμα περιήγησης του **host** σας.
4. Εγκρίνετε τη σύνδεση στο πρόγραμμα περιήγησης και, στη συνέχεια, επιστρέψτε στον πίνακα ελέγχου. Το OmniRoute
   πραγματοποιεί επαναλαμβανόμενα αιτήματα στο `api2.cursor.sh/auth/poll` μέχρι να ληφθούν τα token.
5. Το OmniRoute αποθηκεύει τα token **πρόσβασης + ανανέωσης** και τα ανανεώνει μέσω του
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Αυτή η μέθοδος δεν απαιτεί το Cursor IDE ή το `cursor-agent` μέσα στο container.

## Εντοπισμός μοντέλων

Με μια συνδεδεμένη σύνδεση, τα **Διαθέσιμα μοντέλα / Αυτόματος συγχρονισμός** προτιμούν τον κατάλογο HTTP
`AiService/AvailableModels` του Cursor, χρησιμοποιώντας το bearer token της σύνδεσης.
Αν αυτό αποτύχει, το OmniRoute εξακολουθεί να δοκιμάζει το `cursor-agent` του host (όταν υπάρχει) και, στη συνέχεια,
το αρχικό περιεχόμενο του στατικού μητρώου.

Το OmniRoute εμφανίζει πάντα το **`auto`** στον κατάλογο (εμφανίζεται ως «Αυτόματο»), μαζί με
τις λειτουργίες δρομολόγησης τύπου OpenCodex **`auto-cost`**, **`auto-balance`** και
**`auto-intelligence`**. Κατά τη μετάδοση, αυτές αντιστοιχίζονται στο μοντέλο `default` του Cursor
(με μια παράμετρο `optimization` ModelParameter για τις τρεις παραλλαγές). Προτιμήστε το
`cu/auto` όταν έχει εξαντληθεί η χρήση των premium μοντέλων — το Αυτόματο συχνά εξακολουθεί να διαθέτει όριο χρήσης.

### Ο ενεργός κατάλογος είναι αποκλειστικός όταν έχει συγχρονιστεί

Μετά από έναν επιτυχημένο συγχρονισμό μοντέλων Cursor (`cursor-agent --list-models` → αποθηκευμένος
συγχρονισμένος κατάλογος ή η παραπάνω ανάκτηση `AvailableModels` με έλεγχο ταυτότητας bearer), ο
**πίνακας ελέγχου**, το **`/v1/models`** και η **Δοκιμή όλων** παραθέτουν:

1. Τα μοντέλα που επιστράφηκαν από τον ενεργό συγχρονισμό
2. Τα αναγνωριστικά αυτόματου δρομολογητή που προστέθηκαν: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Προσαρμοσμένα** μοντέλα του διαχειριστή (Εισαγωγή / μη αυτόματη προσθήκη) — δεν αφαιρούνται ποτέ από τον συγχρονισμό

Το μεγάλο στατικό μητρώο στη διαδρομή
`open-sse/config/providers/registry/cursor/` χρησιμοποιείται **μόνο ως εναλλακτική λύση εκτός σύνδεσης**. Όταν
ο συγχρονισμένος κατάλογος είναι κενός (ή ο εντοπισμός αποτυγχάνει), η καταχώριση επιστρέφει σε αυτό το μητρώο.

Τα αναγνωριστικά με επίθημα προσπάθειας (για παράδειγμα `claude-4.6-sonnet-high`) μπορούν ακόμη να
**ζητηθούν** κατά την εκτέλεση: το `resolveRequestedModel` αφαιρεί το επίθημα και το μετατρέπει σε
`ModelParameter` για μετάδοση. Η αποκλειστική καταχώριση αποκρύπτει σκόπιμα αυτές τις στατικές παραλλαγές
από τη Δοκιμή όλων, ώστε οι δοκιμές να αντιστοιχούν σε όσα επιστρέφει πραγματικά το Cursor ως διαθέσιμα.

### Βοηθητικά στοιχεία

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — συγχώνευση στον πίνακα ελέγχου
- `ensureCursorAutoCatalogEntry` — προσθήκη του auto* κατά τον εντοπισμό + την καταχώριση
- `shouldSuppressStaticModelForExclusiveListing` — στατικός βρόχος του `/v1/models`

## Όρια παρόχου (ποσόστωση)

Η ενότητα **Χρήση → Όρια παρόχου** για το Cursor χρησιμοποιεί API Bearer στο `api2.cursor.sh`
(`GetCurrentPeriodUsage` → σύνοψη χρήσης → auth/usage) μετά από PKCE ή εισαγωγή
token. Η παλαιότερη διαδρομή του πίνακα ελέγχου cookie/`cursor.com` παραμένει η έσχατη εναλλακτική λύση
για παλαιότερες συνεδρίες που εισήχθησαν από το IDE.

Τα παράθυρα συνήθως περιλαμβάνουν **Σύνολο**, **Auto + Composer** και **API**. Αν
τα όρια εμφανίζονται κενά, εκτελέστε ξανά τη **Σύνδεση με Cursor** ή εισαγάγετε ξανά τα token (η εισαγωγή από το IDE
δεν απαιτείται πλέον από μόνη της).

## Κενές αποκρίσεις / εξάντληση χρήσης

Όταν το Cursor αποδέχεται μια εκτέλεση αλλά δεν επιστρέφει κείμενο βοηθού (κάτι σύνηθες όταν έχει εξαντληθεί
η χρήση premium), το OmniRoute εμφανίζει ένα αξιοποιήσιμο σφάλμα **429** (ενδείξεις ποσόστωσης) ή
**502** με καθοδήγηση — όχι ένα σκέτο «Ο πάροχος επέστρεψε κενό περιεχόμενο». Οι αποτυχίες ροής
όπως `not_found: AI Model Not Found` (εξαντλημένο παράθυρο χρήσης) ταξινομούνται ως
**υπέρβαση ορίου ρυθμού / χρήσης του Cursor** και διατηρούν αυτό το μήνυμα
σε ολόκληρη τη διοχέτευση SSE (ο κοινόχρηστος μηχανισμός προστασίας από κενή ροή δεν αντικαθιστά ένα
σφάλμα που έχει ήδη εκπεμφθεί). Ελέγξτε τα Όρια παρόχου, δοκιμάστε το μοντέλο **`auto`** ή αυξήστε
τα όρια του προγράμματος Cursor.

## Έκδοση client (headless)

Χωρίς τοπική εγκατάσταση του `cursor-agent`, το OmniRoute επιλύει την τιμή
`x-cursor-client-version` μέσω της μεταβλητής περιβάλλοντος `CURSOR_AGENT_CLI_VERSION`, έπειτα μέσω μιας αποθηκευμένης
στον δίσκο συλλογής δεδομένων από το script εγκατάστασης του Cursor και, τέλος, μέσω ενός καρφιτσωμένου αναγνωριστικού build. Αντικαταστήστε την
τιμή μέσω του `CURSOR_AGENT_CLI_VERSION`, όταν χρειάζεται.

## Εναλλακτική λύση: Μη αυτόματη εισαγωγή token

Αν δεν μπορείτε να ολοκληρώσετε τη σύνδεση μέσω προγράμματος περιήγησης:

1. Στον host, εξαγάγετε τα token από το `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Ανοίξτε την **Εισαγωγή token** στο παράθυρο ελέγχου ταυτότητας του Cursor.
3. Επικολλήστε το **Token πρόσβασης** και, όταν είναι διαθέσιμο, το **Token ανανέωσης** (απαιτείται για
   αυτόματη ανανέωση). Το αναγνωριστικό μηχανήματος είναι προαιρετικό.

Οι εισαγωγές μόνο με token πρόσβασης εξακολουθούν να λειτουργούν, αλλά θα λήξουν χωρίς token ανανέωσης —
εκτελέστε ξανά την εισαγωγή όταν η συνομιλία αρχίσει να επιστρέφει σφάλματα ελέγχου ταυτότητας.

## Σχετικά

- Οδηγίες Docker για το Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Αναφορά σύνδεσης Cursor του OpenCodex (εξωτερική):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
