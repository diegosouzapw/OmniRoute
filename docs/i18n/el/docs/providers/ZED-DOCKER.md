# Zed IDE Integration in Docker Environments (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Όταν το OmniRoute εκτελείται μέσα στο Docker, η τυπική ροή «Εισαγωγή από την κλειδοθήκη του Zed» αποτυγχάνει
επειδή το κοντέινερ δεν μπορεί να αποκτήσει πρόσβαση στην υπηρεσία κλειδοθήκης του λειτουργικού συστήματος του host (libsecret στο Linux,
Keychain στο macOS, Credential Manager στα Windows) και οι κατάλογοι ρυθμίσεων του Zed στο
σύστημα αρχείων του host δεν είναι ορατοί μέσα στο κοντέινερ από προεπιλογή.

## Γιατί αποτυγχάνει η εισαγωγή από την κλειδοθήκη στο Docker

Μέσα σε ένα κοντέινερ προκύπτουν δύο ζητήματα που εμποδίζουν τη λειτουργία:

1. **Απομόνωση συστήματος αρχείων** — Η `isZedInstalled()` αναζητά το `~/.config/zed` (Linux),
   το `~/Library/Application Support/Zed` (macOS) ή το αντίστοιχο των Windows. Αυτές οι διαδρομές
   βρίσκονται στον host και δεν είναι διαθέσιμες, εκτός αν προσαρτηθούν ρητά ως τόμοι.
2. **Απομόνωση IPC** — Ακόμη και όταν ο κατάλογος ρυθμίσεων είναι προσαρτημένος, η εγγενής
   λειτουργική μονάδα `keytar` επικοινωνεί με την υπηρεσία κλειδοθήκης του λειτουργικού συστήματος μέσω μιας υποδοχής Unix ή μιας συνεδρίας D-Bus.
   Καμία από τις δύο δεν γεφυρώνεται από προεπιλογή με το κοντέινερ, επομένως οι αναγνώσεις διαπιστευτηρίων αποτυγχάνουν πάντα.

Το OmniRoute ανιχνεύει το περιβάλλον Docker μέσω δύο ευρετικών μεθόδων:

- Παρουσία του `/.dockerenv` (δημιουργείται από την υπηρεσία Docker κατά την εκκίνηση του κοντέινερ).
- Εμφάνιση της συμβολοσειράς `docker` στο `/proc/1/cgroup` (Linux cgroup v1).

Όταν ενεργοποιείται οποιαδήποτε από τις δύο ευρετικές μεθόδους, η διαδρομή εισαγωγής επιστρέφει HTTP 422 με
`zedDockerEnvironment: true` και ένα μήνυμα που σας κατευθύνει στην καρτέλα Χειροκίνητης εισαγωγής token.

## Χρήση της καρτέλας Χειροκίνητης εισαγωγής token

1. Ανοίξτε το **Dashboard → Providers → Zed**.
2. Ο πίνακας **Manual Token Import** εμφανίζεται κάτω από την κάρτα εισαγωγής από την κλειδοθήκη. Όταν
   το OmniRoute ανιχνεύσει το Docker, αυτός ο πίνακας επεκτείνεται αυτόματα μετά την πρώτη αποτυχημένη
   προσπάθεια εισαγωγής από την κλειδοθήκη.
3. Επιλέξτε τον πάροχο από την αναπτυσσόμενη λίστα (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter ή DeepSeek).
4. Επικολλήστε το κλειδί API στο πεδίο κωδικού πρόσβασης.
5. Κάντε κλικ στο **Import**.

Το κλειδί αποθηκεύεται ως νέα σύνδεση παρόχου με το όνομα
`Zed Manual Import (<provider>)`.

## Πού αποθηκεύει το Zed τα κλειδιά API στον host

Το Zed αποθηκεύει τα κλειδιά των παρόχων AI στην κλειδοθήκη του λειτουργικού συστήματος με ονόματα υπηρεσιών όπως
`zed-openai`, `ai.zed.openai`, `zed-anthropic` κ.λπ. Για να τα ανακτήσετε για χειροκίνητη
εισαγωγή, αναζητήστε τα στα εξής σημεία:

**Linux**

```
~/.config/zed/settings.json
```

Η ενότητα `language_models` περιέχει τις ρυθμίσεις των παρόχων. Τα κλειδιά που αποθηκεύονται στην
κλειδοθήκη μέσω του περιβάλλοντος χρήστη του Zed δεν βρίσκονται ως απλό κείμενο στο `settings.json`· ανακτήστε τα μέσω
ενός προγράμματος προβολής κλειδοθήκης, όπως το GNOME Keyring / Seahorse, ή εκτελώντας:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Οι καταχωρίσεις της κλειδοθήκης μπορούν να βρεθούν στο **Keychain Access.app** αναζητώντας το `zed`.

## Επιλογή προσάρτησης τόμου (Για προχωρημένους)

Μπορείτε προαιρετικά να προσαρτήσετε τον κατάλογο ρυθμίσεων του Zed στο κοντέινερ ως μόνο για ανάγνωση.
Αυτό δεν επιλύει το πρόβλημα της κλειδοθήκης, αλλά μπορεί να είναι χρήσιμο για μελλοντικές λειτουργίες που διαβάζουν
μη απόρρητες τιμές ρυθμίσεων του Zed (π.χ. προτιμήσεις μοντέλων).

```yaml
# Απόσπασμα docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Host Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Host macOS (καταργήστε το σχόλιο για να χρησιμοποιήσετε αυτή την επιλογή)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Μελλοντικά: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Σημείωση: η παράκαμψη μέσω μιας μεταβλητής περιβάλλοντος `ZED_CONFIG_PATH` δεν έχει υλοποιηθεί ακόμη. Αυτό το
απόσπασμα παρέχεται ως αναφορά για όταν προστεθεί αυτή η λειτουργία.

## API χειροκίνητης εισαγωγής

Το endpoint χειροκίνητης εισαγωγής μπορεί επίσης να κληθεί απευθείας:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // προαιρετικό
}
```

Σε περίπτωση επιτυχίας, επιστρέφει:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Αντιμετώπιση προβλημάτων

| Σύμπτωμα                                | Αιτία                                                        | Διόρθωση                                                  |
| --------------------------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`      | Εκτέλεση μέσα στο Docker                                     | Χρησιμοποιήστε την καρτέλα Manual Token Import            |
| 404 + `zedInstalled: false`             | Το Zed δεν είναι εγκατεστημένο στον host                     | Εγκαταστήστε το Zed ή χρησιμοποιήστε χειροκίνητη εισαγωγή |
| 403 + άρνηση πρόσβασης στην κλειδοθήκη  | Το λειτουργικό σύστημα αρνήθηκε την πρόσβαση στην κλειδοθήκη | Εκχωρήστε άδεια στην προτροπή του λειτουργικού συστήματος |
| 404 + μη διαθέσιμη υπηρεσία κλειδοθήκης | Το `libsecret` απουσιάζει από το Linux                       | Εγκαταστήστε το `libsecret-1-dev`                         |
