# Termux Headless Setup (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

Το OmniRoute μπορεί να εκτελείται ως headless διακομιστής σε Android μέσω του Termux. Η εφαρμογή Electron για υπολογιστές δεν υποστηρίζεται στο Termux, αλλά ο πίνακας ελέγχου ιστού και το συμβατό με το OpenAI API λειτουργούν από το τοπικό πρόγραμμα περιήγησης ή από άλλες συσκευές στο ίδιο δίκτυο.

## Προαπαιτούμενα

Εγκαταστήστε το Termux από το F-Droid ή από τις εκδόσεις στο GitHub και, στη συνέχεια, ενημερώστε τα πακέτα και εγκαταστήστε τα εργαλεία μεταγλώττισης που απαιτούνται από εγγενείς εξαρτήσεις όπως το `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Έκδοση Node.js:** Το OmniRoute απαιτεί Node `>=22.22.2 <23 || >=24.0.0 <27` (αντιστοιχεί στο `engines` στο `package.json` / `SUPPORTED_NODE_RANGE`). Το `nodejs-lts` του Termux συνήθως παρέχει το Node 20 LTS, το οποίο **δεν υποστηρίζεται πλέον** — εγκαταστήστε αντ' αυτού το `pkg install nodejs` (τρέχουσα έκδοση) και επαληθεύστε ότι το `node --version` αναφέρει έκδοση της σειράς 22.x/24.x+.

Εάν αποτύχει η μεταγλώττιση εγγενών πακέτων, εκτελέστε ξανά την παραπάνω εντολή `pkg install` και, στη συνέχεια, δοκιμάστε ξανά την εγκατάσταση του OmniRoute.

## Εγκατάσταση

Εκτελέστε απευθείας το πιο πρόσφατο δημοσιευμένο πακέτο:

```bash
npx -y omniroute@latest
```

Μπορείτε επίσης να το εγκαταστήσετε καθολικά:

```bash
npm install -g omniroute
omniroute
```

## Εκτέλεση

Εκκινήστε το OmniRoute σε λειτουργία headless διακομιστή:

```bash
omniroute
```

ή:

```bash
npx omniroute
```

Ο πίνακας ελέγχου είναι διαθέσιμος στη διεύθυνση:

```text
http://localhost:20128
```

Ανοίξτε αυτή τη διεύθυνση URL στο πρόγραμμα περιήγησης του Android. Εάν εκτελείτε προγράμματα-πελάτες μέσα στο Termux, χρησιμοποιήστε τον ίδιο κεντρικό υπολογιστή και την ίδια θύρα ως βασική διεύθυνση URL συμβατή με το OpenAI.

## Εκτέλεση στο παρασκήνιο

Για μια απλή διεργασία παρασκηνίου:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Για να τη διακόψετε:

```bash
pkill -f omniroute
```

Για αυτόματη εκκίνηση μετά την εκκίνηση της συσκευής, εγκαταστήστε το πρόσθετο Termux:Boot και δημιουργήστε ένα script εκκίνησης:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Η βελτιστοποίηση μπαταρίας του Android μπορεί να διακόψει μακροχρόνιες διεργασίες παρασκηνίου. Απενεργοποιήστε τη βελτιστοποίηση μπαταρίας για το Termux, εάν ο διακομιστής πρέπει να παραμένει σε λειτουργία.

## Πρόσβαση από άλλες συσκευές

Βρείτε τη διεύθυνση IP του τηλεφώνου στο δίκτυο WiFi:

```bash
ip addr show wlan0
```

Στη συνέχεια, ανοίξτε τον πίνακα ελέγχου από άλλη συσκευή:

```text
http://PHONE_IP:20128
```

Για παράδειγμα:

```text
http://192.168.1.50:20128
```

Διατηρήστε το τηλέφωνο και το πρόγραμμα-πελάτη στο ίδιο αξιόπιστο δίκτυο. Εάν εκθέσετε το OmniRoute εκτός του τηλεφώνου, ενεργοποιήστε κλειδιά API και έλεγχο ταυτότητας για τον πίνακα ελέγχου.

## Κατάλογος δεδομένων

Από προεπιλογή, το OmniRoute αποθηκεύει δεδομένα στον προσωπικό κατάλογο του Termux, ακολουθώντας την ίδια συμπεριφορά διαδρομής δεδομένων διακομιστή που χρησιμοποιείται στο Linux. Για να τοποθετήσετε τη βάση δεδομένων σε μια συγκεκριμένη θέση:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Περιορισμοί

- Το Electron δεν εκτελείται στο Termux.
- Δεν υπάρχει περιοχή ειδοποιήσεων συστήματος ή ενσωμάτωση με την επιφάνεια εργασίας.
- Αυτή η διαμόρφωση αφορά μόνο τον διακομιστή: χρησιμοποιήστε τον πίνακα ελέγχου μέσω προγράμματος περιήγησης.
- Οι εγγενείς εξαρτήσεις ενδέχεται να χρειάζονται τοπική μεταγλώττιση.
- Οι συσκευές Android με λίγη μνήμη ενδέχεται να χρειάζονται λιγότερα ταυτόχρονα αιτήματα.
- Οι λειτουργίες MITM/πιστοποιητικών συστήματος ενδέχεται να απαιτούν εργασίες στο χώρο αποθήκευσης αξιόπιστων πιστοποιητικών σε επίπεδο Android, εκτός Termux.

## Αντιμετώπιση προβλημάτων

### Μη υποστηριζόμενη πλατφόρμα: android (κάθε αίτημα επιστρέφει HTTP 500)

**Σύμπτωμα:** Το `omniroute` / `omniroute serve` εμφανίζει `✔ OmniRoute is running!`, αλλά κάθε αίτημα προς τον πίνακα ελέγχου ή το API επιστρέφει ένα σκέτο `500 Internal Server Error`. Το `~/.omniroute/logs/application/app.log` παραμένει κενό, το `APP_LOG_LEVEL=debug` δεν εμφανίζει τίποτα χρήσιμο και το σώμα της απόκρισης είναι απλό κείμενο (`Internal Server Error`) χωρίς λεπτομέρειες JSON.

**Αιτία:** Ορισμένες εκδόσεις Termux/Node αναφέρουν `process.platform === "android"`. Η `getCacheDirectory()` του Next.js δεν χειρίζεται αυτή την πλατφόρμα: απαιτεί το `~/.cache` (ή έναν γενικό κατάλογο tmp) να υπάρχει _ήδη_, διαφορετικά αποτυγχάνει κατά τη φόρτωση του instrumentation hook με:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Επειδή το hook δεν φορτώνεται ποτέ, η καταγραφή δεν ξεκινά — το σφάλμα 500 φαίνεται εντελώς αδύνατο να διαγνωστεί. Το OmniRoute δημιουργεί το `~/.cache` (και ορίζει το `XDG_CACHE_HOME` όταν δεν έχει οριστεί) στο σημείο εισόδου του CLI πριν από την εκκίνηση του Next.js, ώστε αυτός ο έλεγχος να ολοκληρωθεί επιτυχώς σε Android/Termux.

**Υποστηριζόμενη λύση (χωρίς τροποποίηση του πακέτου):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Στις τρέχουσες εκδόσεις του OmniRoute, το CLI το κάνει αυτόματα σε Android/Termux — μια νέα εγκατάσταση μέσω `npx -y omniroute@latest` / καθολική εγκατάσταση δεν θα πρέπει να απαιτεί το μη αυτόματο βήμα. Εάν εξακολουθείτε να βλέπετε το σφάλμα μετά την αναβάθμιση, δημιουργήστε το `~/.cache` μία φορά όπως παραπάνω και επανεκκινήστε.

**Μην** τροποποιήσετε το `dist/server.js` για να επιβάλετε το `process.platform = "linux"`. Μια τέτοια τροποποίηση πακέτου αντικαθίσταται σε κάθε επανεγκατάσταση/αναβάθμιση και δεν είναι απαραίτητη όταν υπάρχει ο κατάλογος cache.

### Σφάλματα μεταγλώττισης του better-sqlite3

Εγκαταστήστε την αλυσίδα εργαλείων μεταγλώττισης του Termux:

```bash
pkg install nodejs python build-essential
```

Στη συνέχεια, εκτελέστε ξανά:

```bash
npx -y omniroute@latest
```

### Η θύρα χρησιμοποιείται ήδη

Ελέγξτε τι ακούει στην προεπιλεγμένη θύρα:

```bash
ss -ltnp | grep 20128
```

Τερματίστε την παλιά διεργασία:

```bash
pkill -f omniroute
```

### Ο πίνακας ελέγχου δεν είναι προσβάσιμος από άλλη συσκευή

Επαληθεύστε ότι και οι δύο συσκευές βρίσκονται στο ίδιο δίκτυο WiFi και, στη συνέχεια, πραγματοποιήστε δοκιμή από το Termux:

```bash
curl http://localhost:20128
```

Εάν η τοπική πρόσβαση λειτουργεί αλλά η πρόσβαση μέσω LAN όχι, ελέγξτε την απομόνωση hotspot/WiFi του Android και τυχόν προφίλ τείχους προστασίας ή VPN στο τηλέφωνο.
