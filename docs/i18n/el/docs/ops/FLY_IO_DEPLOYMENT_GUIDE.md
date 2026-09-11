# FLY_IO_DEPLOYMENT_GUIDE (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md)

---

---

title: "Οδηγός Ανάπτυξης OmniRoute στο Fly.io"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Οδηγός Ανάπτυξης OmniRoute στο Fly.io

Αυτό το έγγραφο περιγράφει την πραγματική διαδικασία ανάπτυξης του OmniRoute στο Fly.io, καλύπτοντας δύο σενάρια:

- Ανάπτυξη του τρέχοντος έργου στο Fly.io για πρώτη φορά
- Δημοσίευση μεταγενέστερων ενημερώσεων κώδικα
- Νέα έργα που ακολουθούν την ίδια ροή εργασίας ανάπτυξης

Αυτός ο οδηγός βασίζεται σε μια επαληθευμένη λειτουργική διαμόρφωση για το τρέχον έργο. Το όνομα της εφαρμογής είναι `omniroute`.

---

## 1. Στόχοι Ανάπτυξης

- Πλατφόρμα: Fly.io
- Μέθοδος ανάπτυξης: Άμεση δημοσίευση μέσω τοπικού `flyctl`
- Περιβάλλον εκτέλεσης: Χρήση του υπάρχοντος `Dockerfile` και `fly.toml` στο αποθετήριο
- Επιμονή δεδομένων: Fly Volume προσαρτημένο στο `/data`
- URL πρόσβασης: `https://omniroute.fly.dev/`

---

## 2. Βασική Διαμόρφωση Τρέχοντος Έργου

Το `fly.toml` στο τρέχον αποθετήριο έχει επιβεβαιωθεί ότι περιέχει τα ακόλουθα βασικά στοιχεία:

```toml
app = 'omniroute'
primary_region = 'sin'

[[mounts]]
  source = 'data'
  destination = '/data'

[processes]
  app = 'node run-standalone.mjs'

[http_service]
  internal_port = 20128

[env]
  TZ = "Asia/Shanghai"
  HOST = "0.0.0.0"
  HOSTNAME = "0.0.0.0"
  BIND = "0.0.0.0"
```

Σημειώσεις:

- Το `app = 'omniroute'` καθορίζει σε ποια εφαρμογή Fly στοχεύει η ανάπτυξη
- Το `destination = '/data'` καθορίζει τον κατάλογο προσάρτησης του μόνιμου τόμου
- Αυτό το έργο πρέπει να ορίσει `DATA_DIR=/data`, διαφορετικά η βάση δεδομένων και τα κλειδιά θα εγγραφούν στον προσωρινό κατάλογο του container

---

## 3. Προαπαιτούμενα

### 3.1 Εγκατάσταση του Fly CLI

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Εάν το script εγκατάστασης αποτύχει στο περιβάλλον σας, μπορείτε επίσης να κατεβάσετε χειροκίνητα το εκτελέσιμο αρχείο `flyctl` και να το προσθέσετε στο `PATH` σας.

### 3.2 Σύνδεση στον Λογαριασμό Fly

```powershell
flyctl auth login
```

### 3.3 Επαλήθευση Κατάστασης Σύνδεσης

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Πρώτη Ανάπτυξη του Τρέχοντος Έργου

### 4.1 Κλωνοποίηση του Κώδικα και Είσοδος στον Κατάλογο

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Επιβεβαίωση του Ονόματος Εφαρμογής

Ανοίξτε το `fly.toml` και επαληθεύστε την ακόλουθη γραμμή:

```toml
app = 'omniroute'
```

Εάν αναπτύσσετε τη δική σας νέα εφαρμογή, μπορείτε να το αλλάξετε σε ένα παγκοσμίως μοναδικό όνομα, για παράδειγμα:

```toml
app = 'omniroute-yourname'
```

Σημείωση:

- Βεβαιωθείτε ότι η εφαρμογή που βλέπετε στην κονσόλα αντιστοιχεί στην τιμή `app` στο `fly.toml`
- Εάν προηγουμένως χρησιμοποιούσατε διαφορετικό όνομα, όπως `oroute`, μην το συγχέετε με το `omniroute`

### 4.3 Δημιουργία της Εφαρμογής

Εάν η εφαρμογή δεν υπάρχει ακόμα:

```powershell
flyctl apps create omniroute
```

Εάν αλλάξατε το όνομα της εφαρμογής, αντικαταστήστε το `omniroute` με το όνομα που επιλέξατε.

### 4.4 Πρώτη Ανάπτυξη

```powershell
flyctl deploy
```

---

## 5. Απαιτούμενες Παράμετροι

Αυτό το έργο συνιστά τη διαμόρφωση τουλάχιστον των ακόλουθων παραμέτρων στο Fly.io.

### 5.1 Επαληθευμένες Παράμετροι

Αυτές οι παράμετροι έχουν χρησιμοποιηθεί σε πραγματικές αναπτύξεις στην τρέχουσα εφαρμογή `omniroute`:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (απαιτείται στην παραγωγή — χρησιμοποιείται για έλεγχο ταυτότητας γέφυρας WebSocket)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 Σχετικά με το `INITIAL_PASSWORD`

Το τρέχον έργο δεν ορίζει `INITIAL_PASSWORD` επειδή αυτή η ανάπτυξη δεν το απαιτεί.

Εάν δεν οριστεί:

- Το αρχείο καταγραφής εκκίνησης θα υποδεικνύει ότι ο προεπιλεγμένος κωδικός πρόσβασης είναι `CHANGEME`
- Θα πρέπει να αλλάξετε τον κωδικό πρόσβασης σύνδεσης στις ρυθμίσεις συστήματος το συντομότερο δυνατό μετά την ανάπτυξη

Εάν θέλετε να αρχικοποιήσετε τον κωδικό πρόσβασης backend χωρίς παρέμβαση, μπορείτε να τον προσθέσετε αργότερα:

- `INITIAL_PASSWORD`

---

## 6. Προτεινόμενες Παράμετροι

### 6.1 Διαμόρφωση Secrets

Οι παρακάτω μεταβλητές συνιστώνται για τα Fly Secrets:

| Μεταβλητή                         | Σύσταση                 | Περιγραφή                                                         |
| --------------------------------- | ----------------------- | ----------------------------------------------------------------- |
| `API_KEY_SECRET`                  | Απαιτείται              | Χρησιμοποιείται για δημιουργία και επικύρωση κλειδιών API         |
| `JWT_SECRET`                      | Απαιτείται              | Χρησιμοποιείται για συνεδρίες σύνδεσης και υπογραφή JWT           |
| `OMNIROUTE_WS_BRIDGE_SECRET`      | Απαιτείται σε παραγωγή  | Μυστικό αυθεντικοποίησης γέφυρας WebSocket                        |
| `STORAGE_ENCRYPTION_KEY`          | Συνιστάται ανεπιφύλακτα | Κρυπτογραφεί ευαίσθητες πληροφορίες σύνδεσης σε κατάσταση ηρεμίας |
| `MACHINE_ID_SALT`                 | Συνιστάται              | Δημιουργεί ένα σταθερό αναγνωριστικό μηχανής                      |
| `INITIAL_PASSWORD`                | Προαιρετικό             | Ορίζει τον αρχικό κωδικό backend κατά την πρώτη ανάπτυξη          |
| OAuth/API ιδιωτικά διαπιστευτήρια | Ανάλογα με ανάγκες      | Διαμόρφωση αυθεντικοποίησης εξωτερικής πλατφόρμας                 |

### 6.2 Προτεινόμενες Τιμές για το Τρέχον Έργο

| Μεταβλητή              | Προτεινόμενη Τιμή           |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Σημειώσεις:

- Η `DATA_DIR=/data` είναι κρίσιμη και πρέπει να ταιριάζει με το σημείο προσάρτησης του Fly Volume
- Η `NEXT_PUBLIC_BASE_URL` χρησιμοποιείται από τον χρονοπρογραμματιστή, τα callbacks του frontend και παρόμοια σενάρια

### 6.3 Διαμόρφωση URL Callback για OAuth

Εάν χρειάζεται να ενεργοποιήσετε παρόχους βάσει OAuth (π.χ. Antigravity, Gemini, Cursor) στην ανάπτυξη Fly.io, βεβαιωθείτε για τα εξής δύο σημεία:

1. **Ορίστε το `NEXT_PUBLIC_BASE_URL` στο δημόσιο HTTPS domain σας**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Εάν χρησιμοποιείτε προσαρμοσμένο domain, αντικαταστήστε το με το αντίστοιχο domain (π.χ. `https://omniroute.yourdomain.com`).

2. **Διαμορφώστε το URL callback στην κονσόλα του παρόχου**

   Όλοι οι πάροχοι OAuth μοιράζονται ένα ενιαίο μονοπάτι callback `/callback` — ΔΕΝ υπάρχει ξεχωριστό μονοπάτι callback ανά πάροχο:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Για παράδειγμα, ανεξάρτητα από το Gemini, Antigravity, Cursor ή GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   Εάν το `NEXT_PUBLIC_BASE_URL` δεν ταιριάζει με το URL callback που έχει καταχωρηθεί στον πάροχο, η ροή OAuth θα αποτύχει κατά το βήμα ανακατεύθυνσης του προγράμματος περιήγησης.

---

## 7. Ρύθμιση Secrets με Μία Εντολή

Οι παρακάτω εντολές δημιουργούν τυχαίες ασφαλείς τιμές και γράφουν όλες τις απαιτούμενες παραμέτρους για το τρέχον έργο στα Fly Secrets σε ένα βήμα.

Σημειώσεις:

- Δεν περιλαμβάνει το `INITIAL_PASSWORD`
- Προορίζεται για το τρέχον έργο `omniroute`

```powershell
$apiKeySecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$jwtSecret = [Convert]::ToHexString((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$machineIdSalt = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$storageKey = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$wsBridgeSecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()

flyctl secrets set `
  API_KEY_SECRET=$apiKeySecret `
  JWT_SECRET=$jwtSecret `
  MACHINE_ID_SALT=$machineIdSalt `
  STORAGE_ENCRYPTION_KEY=$storageKey `
  OMNIROUTE_WS_BRIDGE_SECRET=$wsBridgeSecret `
  DATA_DIR=/data `
  NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev `
  -a omniroute
```

Σε Linux / macOS, μπορείτε επίσης να χρησιμοποιήσετε το `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Σημειώσεις:

- Το `OMNIROUTE_WS_BRIDGE_SECRET` απαιτείται σε παραγωγή· η απουσία του θα διακόψει τη χειραψία της γέφυρας WebSocket

Εάν θέλετε επίσης να ορίσετε έναν αρχικό κωδικό πρόσβασης:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Προβολή Τρεχόντων Παραμέτρων

```powershell
flyctl secrets list -a omniroute
```

Εάν η σελίδα `Secrets` στην κονσόλα δεν εμφανίζει τις αναμενόμενες μεταβλητές, ελέγξτε:

- Ότι βλέπετε την εφαρμογή `omniroute`
- Ότι η τιμή `app` στο `fly.toml` ταιριάζει με την εφαρμογή στην κονσόλα

---

## 9. Μεταγενέστερες Ενημερώσεις και Εκδόσεις

Μετά από ενημερώσεις κώδικα, η διαδικασία έκδοσης είναι απλή:

```powershell
git pull
flyctl deploy
```

Εάν χρειάζεται μόνο να ενημερώσετε παραμέτρους χωρίς αλλαγή κώδικα:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Το Fly θα εκτελέσει αυτόματα μια κυλιόμενη ενημέρωση των μηχανών.

### 9.1 Παρακολούθηση Ενημερώσεων του Upstream Repository με Διατήρηση του `fly.toml` του Fork σας

Εάν το τρέχον repository είναι ένα fork και θέλετε να συγχρονίσετε ενημερώσεις από το upstream `https://github.com/diegosouzapw/OmniRoute`, ακολουθήστε την παρακάτω ροή εργασίας.

Αρχικά, επαληθεύστε τα remotes σας:

```powershell
git remote -v
```

Θα πρέπει να βλέπετε τουλάχιστον:

- `origin` που δείχνει στο δικό σας fork
- `upstream` που δείχνει στο αρχικό repository

Εάν το `upstream` δεν έχει ρυθμιστεί, προσθέστε το:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Πριν από τον συγχρονισμό με το upstream, ανακτήστε τα τελευταία commits και tags:

```powershell
git fetch upstream --tags
```

Ελέγξτε την τρέχουσα έκδοση και τα upstream tags:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Σημείωση: Η τρέχουσα έκδοση του έργου είναι `v3.8.0`. Οι αναφορές σε `v3.4.7` παρακάτω διατηρούνται μόνο ως ιστορικά παραδείγματα. Για πραγματικές εκδόσεις, χρησιμοποιήστε `:latest` ή το tag της τρέχουσας έκδοσης (π.χ. `:v3.8.0`).

Εάν θέλετε να συγχωνεύσετε το τελευταίο upstream `main` διατηρώντας αναγκαστικά το `fly.toml` του fork σας, ακολουθήστε αυτή τη ροή εργασίας:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Σημειώσεις:

- Το `git merge upstream/main` συγχρονίζει τον τελευταίο κώδικα από το αρχικό repository
- Το `git checkout HEAD~1 -- fly.toml` επαναφέρει το δικό σας `fly.toml` του fork από πριν τη συγχώνευση
- Εάν το upstream δεν τροποποίησε το `fly.toml`, αυτό το βήμα δεν θα εισαγάγει καμία διαφορά
- Εάν το upstream τροποποίησε το `fly.toml`, αυτό το βήμα διασφαλίζει ότι το όνομα της εφαρμογής Fly, η προσάρτηση volume, η περιοχή και άλλες ρυθμίσεις ανάπτυξης ειδικές για το fork δεν θα αντικατασταθούν

Εάν θέλετε να ευθυγραμμιστείτε με ένα συγκεκριμένο tag έκδοσης (π.χ. `v3.4.7`), επαληθεύστε πρώτα ότι το tag περιλαμβάνεται ήδη στο `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Μια επιτυχής επιστροφή σημαίνει ότι το `upstream/main` περιέχει ήδη αυτή την έκδοση· μπορείτε απλά να συγχωνεύσετε το `upstream/main`.

### 9.2 Τυπική Σειρά Έκδοσης Μετά τον Συγχρονισμό με το Upstream

Μετά τον συγχρονισμό με το αρχικό repository, ακολουθήστε αυτή τη συνιστώμενη σειρά έκδοσης:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Επαναφέρετε το `fly.toml` του fork
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

Αυτή είναι η πραγματική ροή εργασίας που χρησιμοποιήθηκε κατά την αναβάθμιση του τρέχοντος έργου στην έκδοση `v3.4.7` (το παράδειγμα αναφέρεται σε ιστορική έκδοση· η τρέχουσα πραγματική έκδοση είναι `v3.8.0`).

---

## 10. Έλεγχοι Μετά την Ανάπτυξη

### 10.1 Έλεγχος Κατάστασης Εφαρμογής

```powershell
flyctl status -a omniroute
```

### 10.2 Προβολή Αρχείων Καταγραφής Εκκίνησης

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Επαλήθευση Προσβασιμότητας Ιστότοπου

```powershell
try {
  (Invoke-WebRequest -Uri "https://omniroute.fly.dev" -MaximumRedirection 5 -UseBasicParsing).StatusCode
} catch {
  if ($_.Exception.Response) {
    $_.Exception.Response.StatusCode.value__
  } else {
    throw
  }
}
```

Τιμή επιστροφής `200` υποδηλώνει ότι ο ιστότοπος αποκρίνεται κανονικά.

---

## 11. Δείκτες Επιτυχίας

Μετά από μια επιτυχή ανάπτυξη, τα αρχεία καταγραφής θα πρέπει να εμφανίζουν περιεχόμενο παρόμοιο με:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Αυτά τα δύο σημεία είναι κρίσιμα:

- Το `/data/server.env` επιβεβαιώνει ότι τα μυστικά χρόνου εκτέλεσης εγγράφονται στον μόνιμο τόμο
- Το `/data/storage.sqlite` επιβεβαιώνει ότι η βάση δεδομένων εγγράφεται στον μόνιμο τόμο

Εάν δείτε `/app/data/...` αντί για αυτό, το `DATA_DIR` είναι εσφαλμένα ρυθμισμένο και πρέπει να διορθωθεί άμεσα.

---

## 12. Συνήθη Προβλήματα

### 12.1 Η Σελίδα `Secrets` Είναι Άδεια

Συνήθως υπάρχουν δύο λόγοι:

- Δεν έχετε εκτελέσει ακόμα `flyctl secrets set`
- Βλέπετε διαφορετική εφαρμογή (π.χ. `oroute` αντί για `omniroute`)

### 12.2 Το `flyctl deploy` Αναφέρει `app not found`

Δημιουργήστε πρώτα την εφαρμογή:

```powershell
flyctl apps create omniroute
```

### 12.3 Η Ανάλυση του `fly.toml` Αποτυγχάνει

Ελέγξτε τα εξής:

- Εάν υπάρχουν κατεστραμμένοι χαρακτήρες στα σχόλια
- Εάν τα εισαγωγικά και η εσοχή TOML είναι σωστά

### 12.4 Τα Δεδομένα Δεν Διατηρούνται

Επαληθεύστε και τα δύο παρακάτω:

- Το `fly.toml` περιέχει `destination = '/data'`
- Το `DATA_DIR` είναι ορισμένο σε `/data`

### 12.5 Μπορεί να Εκτελεστεί Χωρίς `INITIAL_PASSWORD`;

Ναι, μπορεί να εκτελεστεί. Θα χρησιμοποιήσει ως εναλλακτική τον προεπιλεγμένο κωδικό πρόσβασης `CHANGEME`. Συνιστάται να αλλάξετε τον κωδικό πρόσβασης του backend το συντομότερο δυνατό σε περιβάλλον παραγωγής.

---

## 13. Επαναχρησιμοποίηση για Νέα Έργα

Εάν αναπτύσσετε ένα νέο έργο ακολουθώντας αυτό το έγγραφο, χρειάζεται να αλλάξετε μόνο τα εξής:

1. Αλλάξτε την τιμή `app` στο `fly.toml`
2. Αλλάξτε το `NEXT_PUBLIC_BASE_URL`
3. Διατηρήστε `DATA_DIR=/data`
4. Δημιουργήστε εκ νέου τα `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT` και `STORAGE_ENCRYPTION_KEY`
5. Μετά την πρώτη ανάπτυξη, επαληθεύστε ότι τα αρχεία καταγραφής εγγράφονται στο `/data`

Μην επαναχρησιμοποιείτε κλειδιά από προηγούμενο έργο.

---

## 14. Ελάχιστη Λίστα Ελέγχου Έκδοσης για το Τρέχον Έργο

Οι πιο συχνά χρησιμοποιούμενες εντολές για μεταγενέστερες εκδόσεις είναι:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Για μια κανονική έκδοση, η βασική εντολή είναι απλώς:

```powershell
flyctl deploy
```

Για πρώτη φορά ανάπτυξη σε νέο περιβάλλον, τα βασικά βήματα είναι:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
