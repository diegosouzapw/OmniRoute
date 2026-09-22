# Tunnels Guide (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Πηγή αλήθειας:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Τελευταία ενημέρωση:** 2026-06-28 — v3.8.40

Το OmniRoute μπορεί να εκθέσει τον τοπικό διακομιστή του (`http://localhost:20128`) στο δημόσιο
διαδίκτυο μέσω τριών backend σηράγγων. Αυτό είναι χρήσιμο για:

- Επανακλήσεις OAuth από παρόχους cloud (Antigravity, Gemini, Cursor) που χρειάζζονται μια
  δημόσια προσβάσιμη διεύθυνση URL ανακατεύθυνσης.
- Κοινή χρήση της τοπικής εγκατάστασής σας με συνεργάτες χωρίς ανάπτυξη VM.
- Δοκιμές από κινητές συσκευές, απομακρυσμένα ή μεταξύ διαφορετικών δικτύων.

Η διαχείριση και των τριών backend γίνεται εντός της διεργασίας — το OmniRoute εκκινεί/διακόπτει το υποκείμενο
εκτελέσιμο αρχείο ή SDK από τον πίνακα ελέγχου ή το REST API. Δεν απαιτείται ρύθμιση
reverse proxy ή systemd.

## Συνοπτική παρουσίαση των backend

| Backend                     | Διατήρηση                                                             | Κόστος                       | Ρύθμιση                                              |
| --------------------------- | --------------------------------------------------------------------- | ---------------------------- | ---------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Προσωρινό (η διεύθυνση URL αλλάζει σε κάθε επανεκκίνηση)              | Δωρεάν                       | Καμία — εγκαθιστά αυτόματα το `cloudflared`          |
| **ngrok**                   | Σταθερό όταν έχει διαμορφωθεί πρόγραμμα επί πληρωμή ή σταθερός τομέας | Δωρεάν βαθμίδα + επί πληρωμή | Απαιτεί λογαριασμό ngrok + authtoken                 |
| **Tailscale Funnel**        | Σταθερό ανά κόμβο εντός του tailnet σας                               | Δωρεάν για προσωπική χρήση   | Απαιτεί εγκατάσταση Tailscale + σύνδεση + Funnel ACL |

Οι υλοποιήσεις βρίσκονται στα `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` και `src/lib/tailscaleTunnel.ts`. Και οι τρεις επιστρέφουν ένα
αντικείμενο `status` κοινής μορφής με πεδία `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` και `lastError`, ώστε ο πίνακας ελέγχου να μπορεί να τις εμφανίζει ομοιόμορφα.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

Το `src/lib/cloudflaredTunnel.ts` εκτελεί το `cloudflared` ως θυγατρική διεργασία. Υποστηρίζει
δύο λειτουργίες, οι οποίες επιλέγονται ανάλογα με το αν παρέχεται διαμόρφωση επώνυμης σήραγγας:

- **Γρήγορη σήραγγα (προεπιλογή).** Εκτελεί το `cloudflared tunnel --url
http://localhost:<apiPort>` και αναλύει την εκχωρημένη διεύθυνση URL `*.trycloudflare.com`
  από το stdout. Οι διευθύνσεις URL είναι προσωρινές και αλλάζουν σε κάθε επανεκκίνηση.
- **Επώνυμη σήραγγα (προαιρετική).** Όταν το `CLOUDFLARED_CONFIG` παραπέμπει σε ένα τοπικά διαχειριζόμενο
  αρχείο `config.yml` του cloudflared, το OmniRoute εκτελεί `cloudflared tunnel --no-autoupdate
--config <path> run`, παρέχοντάς σας ένα **σταθερό, επώνυμο hostname**. Η διαμόρφωση
  παρέχει το UUID της σήραγγας, το `credentials-file` και τη δρομολόγηση `ingress`, επομένως δεν
  μεταβιβάζεται `--url` και δεν απαιτείται token του πίνακα ελέγχου Zero Trust. Η εντολή `run` διαβάζει
  τα διαπιστευτήρια από την απόλυτη διαδρομή `credentials-file` της διαμόρφωσης — δεν απαιτείται
  `cert.pem` (αυτό χρησιμοποιείται μόνο για τη διαχείριση του κύκλου ζωής της σήραγγας).

Βασικές συμπεριφορές:

- **Αυτόματη εγκατάσταση.** Κατά την πρώτη χρήση, το OmniRoute πραγματοποιεί λήψη του πιο πρόσφατου εκτελέσιμου αρχείου
  `cloudflared` από τις επίσημες εκδόσεις στο GitHub (η διαχειριζόμενη εγκατάσταση βρίσκεται στο
  `DATA_DIR/cloudflared/`). Το SHA256 του ληφθέντος στοιχείου επαληθεύεται έναντι του
  manifest της έκδοσης πριν από την εκτέλεση.
- **Εποπτεία διεργασίας.** Το PID του cloudflared και η επιλυμένη διεύθυνση URL αποθηκεύονται μόνιμα στο
  `quick-tunnel-state.json`, ώστε ο πίνακας ελέγχου να μπορεί να επαναφέρει την κατάσταση μεταξύ επαναφορτώσεων.

### Ρύθμιση επώνυμης σήραγγας (σταθερό hostname)

1. Δημιουργήστε μια τοπικά διαχειριζόμενη σήραγγα με το CLI του cloudflared (μία φορά):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Δημιουργήστε ένα `~/.cloudflared/config.yml` που δρομολογεί το hostname σας στην τοπική
   θύρα API του OmniRoute (προεπιλογή 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Υποδείξτε στο OmniRoute τη διαμόρφωση και (επαν)εκκινήστε τη σήραγγα:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # προαιρετικό — παρακάμπτει το hostname που αναφέρει το OmniRoute· διαφορετικά διαβάζεται από τον
   # πρώτο κανόνα ingress της διαμόρφωσης:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Ενεργοποιήστε τη σήραγγα με τον ίδιο τρόπο όπως μια γρήγορη σήραγγα (REST / πίνακας ελέγχου / CLI
   παρακάτω). Μια επώνυμη σήραγγα δεν εκπέμπει δημόσια διεύθυνση URL προς εξαγωγή, επομένως η ετοιμότητα εντοπίζεται
   από την καταχωρισμένη σύνδεση edge του cloudflared, ενώ τα `publicUrl`/`apiUrl`
   αναφέρονται από το `CLOUDFLARED_HOSTNAME` (ή από το πρώτο hostname ingress της διαμόρφωσης).

### Ενεργοποίηση / απενεργοποίηση μέσω REST

Το endpoint χρησιμοποιεί σώμα `{action: "enable" | "disable"}` και όχι ξεχωριστές διαδρομές
`start`/`stop`. Απαιτείται έλεγχος ταυτότητας διαχείρισης (συνεδρία διαχειριστή ή κλειδί API διαχειριστή).

```bash
# Ενεργοποίηση
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Κατάσταση
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Απενεργοποίηση
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Ή μέσω του πίνακα ελέγχου: **Ρυθμίσεις → Σήραγγες → Cloudflare**.

### Προαιρετικές μεταβλητές περιβάλλοντος

| Μεταβλητή                                            | Σκοπός                                                                                                                                                                                                            |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Παρακάμπτει τη διαδρομή του εκτελέσιμου αρχείου. Εάν έχει οριστεί και είναι έγκυρη, το OmniRoute τη χρησιμοποιεί αντί να πραγματοποιήσει λήψη.                                                                    |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Πρωτόκολλο μεταφοράς (προεπιλογή `http2`· επίσης `quic`, `auto`).                                                                                                                                                 |
| `CLOUDFLARED_CONFIG`                                 | Διαδρομή προς ένα τοπικά διαχειριζόμενο αρχείο `config.yml` του cloudflared. Όταν οριστεί, το OmniRoute εκτελεί μια **επώνυμη/μόνιμη** σήραγγα (`tunnel --config <path> run`) αντί για μια γρήγορη σήραγγα.       |
| `CLOUDFLARED_HOSTNAME`                               | Παρακάμπτει το αναφερόμενο δημόσιο όνομα κεντρικού υπολογιστή της επώνυμης σήραγγας (π.χ. `ai.example.com`). Όταν δεν έχει οριστεί, διαβάζεται από το πρώτο όνομα κεντρικού υπολογιστή `ingress` της διαμόρφωσης. |

## 2. ngrok

Το `src/lib/ngrokTunnel.ts` χρησιμοποιεί το **SDK `@ngrok/ngrok`** (εντός διεργασίας, χωρίς υποδιεργασία CLI). Η εγγενής μονάδα εισάγεται με οκνηρό τρόπο κατά την πρώτη εκκίνηση, ώστε οι πλατφόρμες χωρίς προκατασκευασμένα δυαδικά αρχεία να μην προκαλούν διακοπή της εφαρμογής κατά την εκκίνησή της.

### Προαπαιτούμενα

1. Εγγραφείτε στο <https://ngrok.com>.
2. Αντιγράψτε το authtoken σας από τον πίνακα ελέγχου του ngrok.
3. Παρέχετέ το με έναν από τους εξής τρόπους:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, ή
   - Πίνακας ελέγχου: **Ρυθμίσεις → Σήραγγες → ngrok**, ή
   - Σώμα REST (για μία μόνο χρήση): `{"action":"enable","authToken":"<token>"}`.

Εάν δεν έχει ρυθμιστεί κανένα από τα δύο, η κατάσταση επιστρέφει `phase: "needs_auth"`.

### Ενεργοποίηση / απενεργοποίηση μέσω REST

```bash
# Ενεργοποίηση (χρησιμοποιεί το NGROK_AUTHTOKEN από το περιβάλλον)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Ενεργοποίηση με ενσωματωμένο token
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Κατάσταση
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Απενεργοποίηση
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Η απόκριση περιλαμβάνει το εκχωρημένο `publicUrl` (π.χ. `https://abcd-1234.ngrok-free.app`). Οι προσαρμοσμένοι τομείς, οι περιοχές και οι κανόνες πολιτικής πρέπει να διαμορφώνονται στον πίνακα ελέγχου του ngrok — το ίδιο το OmniRoute προωθεί μόνο το URL του τοπικού προορισμού στο SDK.

## 3. Tailscale Funnel

Το `src/lib/tailscaleTunnel.ts` ενορχηστρώνει το CLI συστήματος `tailscale` για να εκθέσει την τοπική θύρα API μέσω του **Funnel** (της εξόδου δημόσιου διαδικτύου του Tailscale για τη λειτουργία serve). Υποστηρίζει ολόκληρο τον κύκλο ζωής: εγκατάσταση, σύνδεση, εκκίνηση δαίμονα, ενεργοποίηση και απενεργοποίηση.

Η υλοποίηση εκτελεί `tailscale funnel --bg <port>` (λειτουργία παρασκηνίου). Το δημόσιο URL έχει τη μορφή `https://<machine>.<tailnet>.ts.net/`.

### Προαπαιτούμενα

1. Εγκαταστήστε το Tailscale (ή αφήστε το OmniRoute να το κάνει — δείτε το endpoint `install` παρακάτω).
2. Συνδεθείτε (`tailscale login` ή μέσω του endpoint `login` του OmniRoute).
3. Ενεργοποιήστε το Funnel για το tailnet σας στην κονσόλα διαχείρισης του Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Στο Linux και στο macOS, ο δαίμονας (`tailscaled`) απαιτεί `sudo` για τον έλεγχο. Τα endpoint POST δέχονται ένα προαιρετικό πεδίο `sudoPassword`, το οποίο προωθείται στην κρυφή μνήμη κωδικών πρόσβασης MITM του OmniRoute (`getCachedPassword` / `setCachedPassword`) για τη διάρκεια της κλήσης. Τα Windows χρησιμοποιούν την προεπιλεγμένη εγκατάσταση υπηρεσίας στο `C:\Program Files\Tailscale\tailscale.exe`.

### Endpoint REST

Το Tailscale διαθέτει πλουσιότερη επιφάνεια διεπαφής από τα άλλα backend, επειδή η εγκατάσταση, η σύνδεση, ο δαίμονας και η σήραγγα αποτελούν ξεχωριστά ζητήματα.

| Endpoint                              | Μέθοδος | Σκοπός                                                                           |
| ------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`   | Συγκεντρωτική κατάσταση σήραγγας (`phase`, `tunnelUrl`, `apiUrl` κ.λπ.)          |
| `/api/tunnels/tailscale/check`        | `GET`   | Έλεγχος χαμηλότερου επιπέδου: εγκατεστημένο; συνδεδεμένο; εκτελείται ο δαίμονας; |
| `/api/tunnels/tailscale/install`      | `POST`  | Εγκατάσταση του Tailscale (συμβάντα προόδου μέσω ροής SSE) — Linux/macOS         |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | Εκκίνηση του `tailscaled` σε Linux/macOS                                         |
| `/api/tunnels/tailscale/login`        | `POST`  | Έναρξη ροής σύνδεσης· επιστρέφει `authUrl` για άνοιγμα σε πρόγραμμα περιήγησης   |
| `/api/tunnels/tailscale/enable`       | `POST`  | Εκκίνηση του Funnel για τη θύρα API                                              |
| `/api/tunnels/tailscale/disable`      | `POST`  | Διακοπή του Funnel                                                               |

Όλα τα endpoint του Tailscale απαιτούν έλεγχο ταυτότητας διαχείρισης (δείτε `routeUtils.ts :: requireTailscaleAuth`).

Παράδειγμα ενεργοποίησης:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Εάν το Funnel δεν είναι ενεργοποιημένο στην κονσόλα διαχείρισης, η απόκριση περιλαμβάνει `funnelNotEnabled: true` μαζί με ένα `enableUrl` για άνοιγμα σε πρόγραμμα περιήγησης.

### Προαιρετικές μεταβλητές περιβάλλοντος

| Μεταβλητή       | Σκοπός                                                   |
| --------------- | -------------------------------------------------------- |
| `TAILSCALE_BIN` | Παράκαμψη της διαδρομής του δυαδικού αρχείου `tailscale` |

## Σύνοψη endpoint

| Endpoint                              | Μέθοδος | Σώμα                                | Έλεγχος ταυτότητας |
| ------------------------------------- | ------- | ----------------------------------- | ------------------ |
| `/api/tunnels/cloudflared`            | `GET`   | —                                   | διαχείριση         |
| `/api/tunnels/cloudflared`            | `POST`  | `{action: "enable" \| "disable"}`   | διαχείριση         |
| `/api/tunnels/ngrok`                  | `GET`   | —                                   | διαχείριση         |
| `/api/tunnels/ngrok`                  | `POST`  | `{action, authToken?}`              | διαχείριση         |
| `/api/tunnels/tailscale`              | `GET`   | —                                   | διαχείριση         |
| `/api/tunnels/tailscale/check`        | `GET`   | —                                   | διαχείριση         |
| `/api/tunnels/tailscale/install`      | `POST`  | `{sudoPassword?}` (SSE)             | διαχείριση         |
| `/api/tunnels/tailscale/start-daemon` | `POST`  | `{sudoPassword?}`                   | διαχείριση         |
| `/api/tunnels/tailscale/login`        | `POST`  | `{hostname?}`                       | διαχείριση         |
| `/api/tunnels/tailscale/enable`       | `POST`  | `{sudoPassword?, hostname?, port?}` | διαχείριση         |
| `/api/tunnels/tailscale/disable`      | `POST`  | `{sudoPassword?}`                   | διαχείριση         |

Δεν υπάρχει κεντρικό endpoint `/api/settings/tunnels` — κάθε backend είναι
ανεξάρτητο.

## Παράμετροι για την επιστροφή κλήσης OAuth

Όταν εκθέτετε το OmniRoute μέσω tunnel, ο πίνακας ελέγχου και οι ροές OAuth πρέπει
να δημιουργούν URL επιστροφής κλήσης με βάση το **δημόσιο** hostname και όχι το `localhost`. Διαφορετικά,
ο πάροχος OAuth ανακατευθύνει τον χρήστη σε ένα URL στο οποίο δεν μπορούν να έχουν πρόσβαση οι διακομιστές του
και η χειραψία αποτυγχάνει.

Οι αλλαγές στον πίνακα ελέγχου και η αποθήκευση ρυθμίσεων δεν απαιτούν τον καθορισμό του hostname του tunnel στο
`NEXT_PUBLIC_BASE_URL`. Ο πιστοποιημένος πίνακας ελέγχου στέλνει μη ασφαλή αιτήματα ίδιας προέλευσης
με ένα CSRF token συνδεδεμένο με τη συνεδρία, επομένως τα προσωρινά host του Cloudflare Quick Tunnel
μπορούν να χρησιμοποιηθούν για κανονική διαχείριση μέσω UI μετά τη σύνδεση.

Ορίστε:

```bash
NEXT_PUBLIC_BASE_URL=https://<το-host-του-tunnel-σας>
```

και επανεκκινήστε το OmniRoute πριν ξεκινήσετε το OAuth. Για προσωρινά Cloudflare Quick
Tunnels, το URL αλλάζει μετά από κάθε επανεκκίνηση, επομένως για χρήση OAuth σε περιβάλλον παραγωγής προτιμήστε το ngrok με δεσμευμένο
domain ή το Tailscale Funnel.

## Υγεία και παρακολούθηση

Ο πίνακας ελέγχου εμφανίζει την κατάσταση του tunnel στην ενότητα **Ρυθμίσεις → Tunnels**:

- Ενεργά backend και τρέχον `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Το τρέχον δημόσιο URL και το παραγόμενο URL του API (`<publicUrl>/v1`).
- Το τοπικό URL προορισμού στο οποίο προωθεί το tunnel.
- Το τελευταίο μήνυμα σφάλματος, εάν υπάρχει.

Για προγραμματιστική παρακολούθηση, κάντε poll στα endpoint `GET` κάθε backend. Επιτρέπεται η ταυτόχρονη εκτέλεση
περισσότερων από ενός backend· το OmniRoute θα παρακολουθεί το καθένα
ανεξάρτητα.

## Αντιμετώπιση προβλημάτων

### "Δεν βρέθηκε το εκτελέσιμο cloudflared"

Το OmniRoute επιχειρεί να πραγματοποιήσει αυτόματη εγκατάσταση κατά την πρώτη χρήση. Εάν η εγκατάσταση έχει αποκλειστεί
(περιορισμένο δίκτυο, χωρίς πρόσβαση στο GitHub), κάντε μη αυτόματη λήψη του `cloudflared` από τη διεύθυνση
<https://github.com/cloudflare/cloudflared/releases> και ορίστε
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: απαιτείται authtoken"

Το `phase: "needs_auth"` σημαίνει ότι δεν βρέθηκε authtoken. Ορίστε το `NGROK_AUTHTOKEN` στο
`.env`, διαμορφώστε το μέσω του πίνακα ελέγχου ή περάστε το `authToken` στο σώμα του POST
ενεργοποίησης.

### "tailscale: το funnel δεν είναι ενεργοποιημένο"

Όταν η απόκριση ενεργοποίησης περιλαμβάνει `funnelNotEnabled: true`, το Funnel είναι απενεργοποιημένο
για το tailnet σας. Ανοίξτε το επιστρεφόμενο `enableUrl` (ή τη σελίδα λειτουργιών της κονσόλας
διαχείρισης) και ενεργοποιήστε το Funnel.

### Οι αλλαγές του URL του tunnel διακόπτουν το OAuth

Χρησιμοποιήστε το ngrok με δεσμευμένο domain ή το Tailscale Funnel (και τα δύο είναι σταθερά ανά κόμβο).
Τα Cloudflare Quick Tunnels είναι προσωρινά εκ σχεδιασμού και δεν συνιστώνται για
μακροχρόνιες επιστροφές κλήσης OAuth.

### Άρνηση άδειας στο Linux/macOS για το Tailscale

Το `tailscaled` χρειάζεται δικαιώματα root. Παρέχετε το `sudoPassword` στο σχετικό endpoint POST
ή εκτελέστε μόνοι σας τον daemon (`sudo systemctl start tailscaled`).

## Δείτε επίσης

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — εξερχόμενος διακομιστής μεσολάβησης (1proxy, SOCKS5, HTTP) για
  εξερχόμενη κίνηση.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — πλήρης λίστα μεταβλητών περιβάλλοντος, συμπεριλαμβανομένης της
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — εναλλακτικές λύσεις αντί της διοχέτευσης για σταθερή
  δημόσια φιλοξενία.
- Πηγαίος κώδικας: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
