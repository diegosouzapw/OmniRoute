# 🐳 Docker Guide — OmniRoute (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Πλήρης οδηγός αναφοράς για ανάπτυξη με Docker. Για γρήγορη εκκίνηση, ανατρέξτε στην [ενότητα Docker του README](../README.md#-docker).

## Πίνακας περιεχομένων

- [Γρήγορη εκτέλεση](#quick-run)
- [Με αρχείο περιβάλλοντος](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Διαθέσιμα προφίλ](#available-profiles)
- [Ρύθμιση εργαλείων CLI του κεντρικού συστήματος όταν το OmniRoute εκτελείται σε Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Βοηθητική υπηρεσία Redis](#redis-sidecar)
- [Compose για παραγωγή](#production-compose)
- [Στάδια Dockerfile](#dockerfile-stages)
- [Κρίσιμες μεταβλητές περιβάλλοντος](#critical-environment-variables)
- [Docker Compose με Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Γρήγορο Cloudflare Tunnel](#cloudflare-quick-tunnel)
- [Ετικέτες εικόνων](#image-tags)
- [Διαθεσιμότητα: το προεπιλεγμένο SQLite υποστηρίζει ένα μόνο αντίγραφο](#availability-default-sqlite-is-single-replica)
- [Σημαντικές σημειώσεις](#important-notes)

---

## Γρήγορη εκτέλεση

> **Αυτοφιλοξενία με μία εντολή;** Δείτε τον
> [Οδηγό αυτοφιλοξενίας](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (δημοσιευμένη εικόνα +
> Redis, μόνο μέσω loopback, χωρίς επιλογή προφίλ). Η παρακάτω Γρήγορη εκτέλεση είναι η
> διαδρομή ενός container για χρήστες που εκτελούν ήδη το Redis αλλού.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Με αρχείο περιβάλλοντος

```bash
# Αντιγράψτε και επεξεργαστείτε πρώτα το .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Βασικό προφίλ (χωρίς εργαλεία CLI)
docker compose --profile base up -d

# Προφίλ CLI (ενσωματωμένα Claude Code, Codex, OpenClaw)
docker compose --profile cli up -d

# Προφίλ κεντρικού συστήματος (κυρίως για Linux· προσαρτά τα εκτελέσιμα CLI του κεντρικού συστήματος μόνο για ανάγνωση)
docker compose --profile host up -d

# Συνδυασμός CLI + βοηθητικής υπηρεσίας CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Διαθέσιμα προφίλ

Το OmniRoute παρέχει τέσσερα προφίλ Compose. Επιλέξτε εκείνο που αντιστοιχεί στο περιβάλλον σας.

| Προφίλ              | Υπηρεσία         | Πότε να χρησιμοποιείται                                                                                                                                                                  | Εντολή                                       |
| ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (προεπιλογή) | `omniroute-base` | Διακομιστής χωρίς γραφικό περιβάλλον / ελάχιστο περιβάλλον εκτέλεσης, χωρίς ενσωματωμένα CLI παρόχων                                                                                     | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | Ροές εργασίας με πράκτορες που καλούν `omniroute providers/setup/doctor` και τα ενσωματωμένα CLI (Codex, Claude Code, Droid, OpenClaw)                                                   | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | Κεντρικά συστήματα Linux που χρειάζονται πρόσβαση τύπου `network_mode` στα CLI του κεντρικού συστήματος, προσαρτώντας τα `~/.local/bin`, `~/.codex`, `~/.claude` κ.λπ. μόνο για ανάγνωση | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Εκτέλεση της βοηθητικής υπηρεσίας [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) στη θύρα `8317` για διαμεσολάβηση προς ανάντη CLI                                          | `docker compose --profile cliproxyapi up -d` |

> Μπορούν να συνδυαστούν πολλαπλά προφίλ: `docker compose --profile cli --profile cliproxyapi up -d`.

## Ρύθμιση εργαλείων CLI του κεντρικού συστήματος όταν το OmniRoute εκτελείται στο Docker

Τα `omniroute setup-codex`, `setup-claude`, `config set <tool>` και το κουμπί
**Αποθήκευση ρυθμίσεων** του πίνακα ελέγχου εγγράφουν αρχεία όπως το `~/.codex/*.config.toml`. Αυτές οι διαδρομές
έχουν νόημα μόνο στο μηχάνημα όπου εκτελείται πραγματικά το CLI. Αν τα εκτελέσετε μέσα
στο container, η εγγραφή καταλήγει στον προσωπικό κατάλογο του ίδιου του container (`/home/node` —
το image εκτελείται με `USER node`), όπου κανένα CLI του κεντρικού συστήματος δεν θα τη διαβάσει ποτέ και από όπου
απορρίπτεται μόλις αναδημιουργηθεί το container.

Το OmniRoute το εντοπίζει αυτό και αρνείται την εγγραφή, παρέχοντας οδηγίες αντί να
αναφέρει μια επιτυχία που δεν μπορείτε να αξιοποιήσετε: το CLI τερματίζεται με `2` και το API απαντά με `422`
και `containerEphemeralTarget: true`.

### Συνιστώμενη επιλογή: εκτελέστε το CLI στο κεντρικό σύστημα και το OmniRoute στο Docker

Το container παρέχει το API· το CLI ρυθμίζει τα εργαλεία του κεντρικού σας συστήματος.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # κατευθύνετε το CLI προς το container
omniroute setup-codex                      # εγγράφει το πραγματικό ~/.codex στο κεντρικό σας σύστημα
```

Αυτή είναι η σωστή επιλογή όταν τα Codex, Claude Code, Cursor ή παρόμοια εργαλεία εκτελούνται στον
φορητό υπολογιστή σας — που είναι και η συνηθισμένη διαμόρφωση.

### Εναλλακτικά: προσαρτήστε με bind mount τους καταλόγους ρυθμίσεων του κεντρικού συστήματος (προφίλ `host`)

Αν θέλετε το ίδιο το container να εγγράφει τις ρυθμίσεις του κεντρικού σας συστήματος, προσαρτήστε
τους καταλόγους και ορίστε το `CLI_CONFIG_HOME` στη ρίζα της προσάρτησης. Το προφίλ `host`
το κάνει ήδη αυτό:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Το bind mount είναι αυτό που καθιστά τη διαδρομή αξιόπιστη: το OmniRoute διαβάζει το
`/proc/self/mountinfo` και επιτρέπει εγγραφές σε προσαρτημένες διαδρομές (καθώς και σε καταλόγους
των οποίων οι υποκατάλογοι αποτελούν σημεία προσάρτησης, όπως ακριβώς συμβαίνει με το `/host-home` παραπάνω), ενώ
εξακολουθεί να αρνείται εγγραφές σε μη προσαρτημένες διαδρομές.

### Διέξοδος ανάγκης: ρυθμίστε τα CLI του ίδιου του container (χρησιμοποιήστε τη με φειδώ)

Όταν τα CLI βρίσκονται πράγματι μέσα στο container (στο προφίλ `cli`), η εγγραφή
είναι σκόπιμη. Περάστε το `--allow-container-write` σε οποιαδήποτε εντολή `setup-*` ή ορίστε
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` για τον server. Η εγγραφή εκτελείται
με μια προειδοποίηση ότι δεν θα διατηρηθεί μετά την κατάργηση του container.

> **Προειδοποίηση ασφαλείας — προφίλ `cli` + προσάρτηση `docker.sock`.**
> Το προφίλ `cli` προσαρτά μέσω bind mount το `/var/run/docker.sock`, ώστε το πρόγραμμα
> αυτόματης ενημέρωσης μέσα στο container να μπορεί να αναδημιουργεί τη στοίβα μέσω του daemon του κεντρικού συστήματος
> (το `src/lib/system/autoUpdate.ts` ελέγχει για αυτό το socket και παραλείπει τη
> διαδρομή Docker όταν αυτό απουσιάζει). Αυτό το socket αποτελεί **όριο εμπιστοσύνης με δικαιώματα root στο
> κεντρικό σύστημα**: οτιδήποτε μπορεί να αποκτήσει πρόσβαση σε αυτό ελέγχει τον Docker daemon του κεντρικού συστήματος ως
> root — μπορεί να δημιουργήσει, να επιθεωρήσει, να σταματήσει και να αφαιρέσει οποιοδήποτε container στο κεντρικό σύστημα.
> Συνέπειες:
>
> 1. **Μην εκθέτετε ποτέ τη θύρα του προφίλ `cli` στο δίκτυο.** Δημοσιεύστε
>    τη στο `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — ένα προφίλ `cli` προσβάσιμο από το LAN μετατρέπει οποιαδήποτε απομακρυσμένη εκτέλεση κώδικα (RCE) σε επίπεδο πίνακα ελέγχου σε
>    πλήρη παραβίαση του κεντρικού συστήματος.
> 2. **Μην προσαρτάτε πρόσθετους καταλόγους του κεντρικού συστήματος στο προφίλ `cli`.**
>    Το Docker socket μαζί με οποιαδήποτε επιπλέον προσάρτηση παρέχει στο container πλήρη
>    πρόσβαση ανάγνωσης/εγγραφής στο σύστημα αρχείων και στις ρυθμίσεις του κεντρικού σας συστήματος. Αν χρειάζεστε ένα εργαλείο για να
>    βλέπει ένα έργο, εκτελέστε το τοπικά με το εκτελέσιμο CLI — μην το προσαρτάτε
>    στο container `cli`.
>
> Αν δεν χρειάζεστε αυτόματη ενημέρωση μέσα στο container, αφήστε το προφίλ `cli` απενεργοποιημένο
> (`COMPOSE_PROFILES=core,redis` ή συντομότερο). Τα άλλα προφίλ δεν
> προσαρτούν το Docker socket.
>
> Ανατρέξτε στο `docs/security/MITM-TPROXY-DECRYPT.md` (git· δεν μεταγλωττίζεται στο `/docs`) για το σχετικό μοντέλο απειλών
> γύρω από το MITM και στο `docs/security/SUPPLY_CHAIN.md` για την
> αλυσίδα προέλευσης των εκτελέσιμων αρχείων `codex`/`claude-code`/`droid`/`openclaw`.

## Βοηθητικό κοντέινερ Redis

Το OmniRoute βασίζεται στο Redis για την υποστήριξη του κατανεμημένου περιοριστή ρυθμού και της κοινόχρηστης κρυφής μνήμης. Η υπηρεσία `redis` ορίζεται **πάντα** στο `docker-compose.yml` (δεν περιορίζεται από κάποιο προφίλ) και εκκινείται μαζί με οποιοδήποτε άλλο προφίλ.

| Λεπτομέρεια                               | Τιμή                                        |
| ----------------------------------------- | ------------------------------------------- |
| Εικόνα                                    | `redis:7-alpine`                            |
| Όνομα κοντέινερ                           | `omniroute-redis`                           |
| Εσωτερική θύρα                            | `6379`                                      |
| Θύρα κεντρικού υπολογιστή (παράκαμψη)     | `REDIS_PORT` (προεπιλογή: `6379`)           |
| Δέσμευση κεντρικού υπολογιστή (παράκαμψη) | `REDIS_BIND_HOST` (προεπιλογή: `127.0.0.1`) |
| Τόμος                                     | `omniroute-redis-data` → `/data`            |
| Έλεγχος υγείας                            | `redis-cli ping` (διάστημα 10s)             |

Σχετικές μεταβλητές περιβάλλοντος:

- `REDIS_URL` — συμβολοσειρά σύνδεσης που εισάγεται στην εφαρμογή (`redis://redis:6379` από προεπιλογή).
- `REDIS_PORT` — αντιστοίχιση θύρας στην πλευρά του κεντρικού υπολογιστή για το κοντέινερ Redis.
- `REDIS_BIND_HOST` — διεπαφή του κεντρικού υπολογιστή στην οποία δημοσιεύεται η θύρα. Η προεπιλογή είναι `127.0.0.1`.

> **Γιατί χρησιμοποιείται από προεπιλογή η διεπαφή loopback:** το βοηθητικό κοντέινερ εκτελείται χωρίς `requirepass` και τα κοντέινερ
> της εφαρμογής συνδέονται σε αυτό μέσω του δικτύου compose (`redis:6379`) — η δημοσιευμένη θύρα
> υπάρχει μόνο για εργαλεία στην πλευρά του κεντρικού υπολογιστή (`redis-cli`, ένα τοπικό `npm run dev`). Η δημοσίευση στο
> `0.0.0.0` θα εξέθετε ένα Redis χωρίς έλεγχο ταυτότητας σε κάθε κεντρικό υπολογιστή του LAN σας. Αν ορίσετε
> `REDIS_BIND_HOST=0.0.0.0`, προσθέστε επίσης το `--requirepass` στο `command:` της υπηρεσίας.

Η **απενεργοποίηση του Redis** δεν συνιστάται (ο περιοριστής ρυθμού θα υποβαθμιστεί σε εναλλακτική λειτουργία εντός μνήμης). Αν είναι απαραίτητο, είτε αφαιρέστε/σχολιάστε το μπλοκ υπηρεσίας `redis:` στο `docker-compose.yml` είτε κλιμακώστε το στο μηδέν:

```bash
docker compose up -d --scale redis=0
```

## Compose παραγωγής

Για ένα απομονωμένο στιγμιότυπο παραγωγής που εκτελείται παράλληλα με το περιβάλλον ανάπτυξης, χρησιμοποιήστε το `docker-compose.prod.yml`.

| Λεπτομέρεια                       | Τιμή                                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| Αρχείο                            | `docker-compose.prod.yml`                                                                          |
| Προεπιλεγμένη θύρα πίνακα ελέγχου | `PROD_DASHBOARD_PORT=20130` (αντιστοιχίζεται στην εσωτερική `${DASHBOARD_PORT:-20128}`)            |
| Προεπιλεγμένη θύρα API            | `PROD_API_PORT=20131`                                                                              |
| Εικόνα                            | `omniroute:prod` (δημιουργείται από τον στόχο `runner-cli`)                                        |
| Κοντέινερ Redis                   | `omniroute-redis-prod` (`redis:8.6.2`, αποκλειστικός τόμος `redis-prod-data`)                      |
| Τόμος δεδομένων                   | `omniroute-prod-data` (ονομαστικός, διατηρείται μεταξύ ανακατασκευών)                              |
| Έλεγχοι υγείας                    | `node healthcheck.mjs` + `redis-cli ping`, με το `depends_on` να εξαρτάται από την υγεία του Redis |

Τρόπος χρήσης:

```bash
# Δημιουργία και εκκίνηση της στοίβας παραγωγής
docker compose -f docker-compose.prod.yml up -d --build

# Συνεχής προβολή των αρχείων καταγραφής
docker compose -f docker-compose.prod.yml logs -f

# Τερματισμός (διατήρηση των τόμων)
docker compose -f docker-compose.prod.yml down
```

Η στοίβα παραγωγής εκτελείται παράλληλα με το compose ανάπτυξης (διαφορετικά ονόματα κοντέινερ, θύρες και τόμοι), ώστε να μπορείτε να συνεχίζετε τις τοπικές επαναλήψεις ανάπτυξης ενώ η παραγωγή παραμένει σε λειτουργία.

## Στάδια Dockerfile

Το αποθετήριο παρέχει ένα Dockerfile πολλαπλών σταδίων (`Dockerfile`). Διατίθενται τρία στάδια· επιλέξτε το κατάλληλο `target` για την περίπτωση χρήσης σας.

| Στάδιο        | Βασική εικόνα         | Σκοπός                                                                                                                                                                           |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Εγκαθιστά τις εξαρτήσεις (`npm ci --legacy-peer-deps`) και εκτελεί το `npm run build` (Turbopack από προεπιλογή — δείτε τους Πόρους κατά τη δημιουργία παρακάτω)                 |
| `runner-base` | `node:26-trixie-slim` | Περιβάλλον εκτέλεσης παραγωγής με την αυτόνομη έξοδο του Next.js. **Δεν περιλαμβάνονται CLI παρόχων.**                                                                           |
| `runner-cli`  | `runner-base`         | Προσθέτει `git`, `docker.io`, `docker-compose` και καθολικά CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Επιλέξτε το για ροές εργασίας με agents.** |

Δημιουργήστε χειροκίνητα ένα συγκεκριμένο target:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Πόροι κατά τη δημιουργία

Τρία ορίσματα δημιουργίας ελέγχουν το κόστος του σταδίου `builder`. Ισχύουν μόνο κατά τη δημιουργία —
το `OMNIROUTE_MEMORY_MB` (παρακάτω) είναι μια ξεχωριστή ρύθμιση για τον χρόνο εκτέλεσης.

| Όρισμα δημιουργίας          | Προεπιλογή | Επίδραση                                                                                          |
| --------------------------- | ---------- | ------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`        | Η τιμή `0` δημιουργεί με webpack αντ' αυτού. Χαμηλότερη μέγιστη χρήση μνήμης, αλλά πιο αργό.      |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | Ανώτατο όριο heap της V8 (`--max-old-space-size`) για τη διεργασία `next build` που εκκινείται.   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | Τροφοδοτεί το `CIRCLE_NODE_TOTAL`· το Next υπολογίζει `workers = N - 1` για τη συλλογή page-data. |

Το `OMNIROUTE_BUILD_WORKERS` είναι αυτό που πρέπει να αυξήσετε σε έναν ισχυρό builder και αυτό που πρέπει να
υποψιαστείτε όταν μια δημιουργία με περιορισμένους πόρους αποτυγχάνει **μετά** το `✓ Compiled successfully`. Κάθε
worker page-data είναι ξεχωριστή διεργασία, όπως και η ίδια η γονική διεργασία `next build`·
μια αναπαραγωγή σε ενεργό VPS (issue #7518) μέτρησε τη μέγιστη RSS κάθε διεργασίας στα
~4.5 GB, ανεξάρτητα από τη σημαία heap `NODE_OPTIONS` (το Turbopack μεταγλωττίζει σε
εγγενή μνήμη/Rust εκτός του heap της V8). Η προεπιλογή `2` (→ 1 worker, 2
διεργασίες συνολικά) έχει διαστασιολογηθεί για τους GitHub-hosted runners με 16 GB / 4 vCPU που
χρησιμοποιεί η διοχέτευση δημοσίευσης. Με `8` (→ 7 workers), αυτός ο runner εξάντλησε τη μνήμη και
το buildkit απέτυχε στο βήμα με `ResourceExhausted: ... cannot allocate memory`·
το `3` (→ 2 workers) εξακολουθούσε να μη χωρά, όταν η RSS ανά διεργασία μετρήθηκε
απευθείας αντί να συναχθεί. Το `tests/unit/docker-build-memory-budget.test.ts`
εκτελεί τους υπολογισμούς βάσει της μετρημένης τιμής και αποτυγχάνει αν οποιαδήποτε από τις δύο ρυθμίσεις
ξεπερνά τη χωρητικότητα του runner.

Το Turbopack μεταγλωττίζει σε εγγενή μνήμη Rust που βρίσκεται **εκτός** του heap της V8, επομένως
το `OMNIROUTE_BUILD_MEMORY_MB` δεν τη θέτει υπό όριο. Σε έναν host με ανώτατο όριο μνήμης, η
δημιουργία τερματίζεται τότε με SIGKILL από τον OOM killer χωρίς κανένα μήνυμα σφάλματος — απλώς
σταματά στη μέση του `Creating an optimized production build`, κάτι που μοιάζει περισσότερο με κόλλημα
παρά με εξάντληση μνήμης. Αν ο host δημιουργίας έχει περιορισμένους πόρους, αλλάξτε bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

Το `webpackBuildWorker` είναι ενεργοποιημένο, επομένως το `next build` εκτελεί μια γονική **και** μια worker
διεργασία, και καθεμία τηρεί ξεχωριστά το `OMNIROUTE_BUILD_MEMORY_MB`. Ορίστε το ανώτατο όριο του container
πάνω από περίπου το διπλάσιο αυτής της τιμής, όχι μόνο πάνω από την ίδια την τιμή.

Μετρήσεις σε αυτό το δέντρο (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Ανώτατο όριο container | Αποτέλεσμα                                 |
| --------- | ---------------------- | ------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB         | Τερματισμός από OOM και στα δύο, αθόρυβα   |
| webpack   | 8 GiB                  | Η worker διεργασία τερματίστηκε με SIGKILL |
| webpack   | 12 GiB                 | Επιτυχία, με μέγιστη χρήση 11.1 GiB        |

### Προεπιλογές χρόνου εκτέλεσης

Προεπιλογές που εξάγονται από το `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Συμπεριφορά μνήμης στο Docker:

- Η εικόνα ορίζει `OMNIROUTE_MEMORY_MB=1024` και παράγει το `NODE_OPTIONS=--max-old-space-size=1024` από αυτό.
- Η πραγματική διεργασία του server εκκινείται από τον αυτόνομο launcher, ο οποίος διαβάζει το `OMNIROUTE_MEMORY_MB` και προσαρτά το `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Το Node χρησιμοποιεί την τελευταία επαναλαμβανόμενη τιμή `--max-old-space-size`, επομένως η ρύθμιση του `OMNIROUTE_MEMORY_MB` ελέγχει το πραγματικό όριο heap του Docker.
- Επειδή η εικόνα το ορίζει πάντα, η εφεδρική ρύθμιση του ίδιου του launcher, η οποία προσαρμόζεται βάσει της RAM, δεν εφαρμόζεται ποτέ στο Docker. Αυξήστε το ρητά για τον φόρτο εργασίας (πίνακας παρακάτω). Η τιμή `2048` εξακολουθεί να είναι πολύ μικρή για το `/v1/responses` ενός coding agent.

### RAM χρόνου εκτέλεσης για coding agents

Η προεπιλογή Docker του 1 GiB αποτελεί ελάχιστη βάση για dashboard/ελαφριά συνομιλία και όχι μέγεθος παραγωγής. Μεγάλα σώματα `POST /v1/responses` (εκατοντάδες μηνύματα, δεκάδες εργαλεία) διατηρούν πολλαπλά γραφήματα στη μνήμη κατά τη συμπίεση. Δύο επικαλυπτόμενα αιτήματα ~3 MiB / ~750k-token έχουν προκαλέσει τερματισμό της V8 με old-space **12 GiB** (`FATAL ERROR: Reached heap limit`) και έχουν επίσης προκαλέσει OOM σε cgroup 16 GiB. Δείτε το [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Ορίστε τη **μνήμη cgroup `--memory` πάνω από το heap** — τα εγγενή buffer, το SQLite και τα ενδιάμεσα δεδομένα συμπίεσης βρίσκονται εκτός της V8.

| Φόρτος εργασίας                                | `OMNIROUTE_MEMORY_MB`             | Container / cgroup             | Σημειώσεις                                                                                                       |
| ---------------------------------------------- | --------------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Πίνακας ελέγχου, μία ελαφριά συνομιλία         | `1024` (προεπιλογή image)         | ≥2 GiB                         |                                                                                                                  |
| Ένας agent προγραμματισμού (Claude/Codex/Grok) | `8192`                            | ≥10 GiB                        | Τυπικό `/v1/responses` μίας συνεδρίας                                                                            |
| Δύο ταυτόχρονα μακρά `/v1/responses`           | `10240`–`12288`                   | ≥12–16 GiB                     | Μετρήθηκε τερματισμός του V8 με heap περίπου 12 GiB                                                              |
| Τρία+ ταυτόχρονα μακρά context                 | μην τα εκτελείτε σε μία διεργασία | σειριοποίηση / περισσότερη RAM | Η προεπιλεγμένη αποδοχή βαριών αιτημάτων είναι 1 σε εξέλιξη· η αύξησή της χωρίς RAM προκαλεί ξανά τον τερματισμό |

Το `omniroute serve` σε bare metal ρυθμίζεται περίπου στο 35% της RAM (με περιορισμό στο `[512, 4096]`) όταν το `OMNIROUTE_MEMORY_MB` **δεν έχει οριστεί**. Το Docker ορίζει πάντα την τιμή `1024`, επομένως αυτή η βαθμονόμηση δεν εκτελείται ποτέ στο επίσημο image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Κρίσιμες μεταβλητές περιβάλλοντος

Πέρα από τις προεπιλογές που τεκμηριώνονται στο [ENVIRONMENT.md](../reference/ENVIRONMENT.md), οι ακόλουθες μεταβλητές είναι οι σημαντικότερες κατά την εκτέλεση μέσω Docker:

| Μεταβλητή                     | Σκοπός                                                                                                                                                                                                                                                                                                                                            | Προεπιλογή                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Κοινόχρηστο μυστικό για τη γέφυρα WebSocket. **Απαιτείται σε περιβάλλον παραγωγής** — ορίστε το σε μια ισχυρή τυχαία συμβολοσειρά.                                                                                                                                                                                                                | δεν έχει οριστεί (πρέπει να παρέχεται) |
| `REDIS_URL`                   | Συμβολοσειρά σύνδεσης για το σύστημα υποστήριξης περιορισμού ρυθμού / προσωρινής μνήμης                                                                                                                                                                                                                                                           | `redis://redis:6379`                   |
| `REDIS_PORT`                  | Θύρα στην πλευρά του κεντρικού υπολογιστή για το παρεχόμενο κοντέινερ Redis                                                                                                                                                                                                                                                                       | `6379`                                 |
| `REDIS_BIND_HOST`             | Διεπαφή κεντρικού υπολογιστή στην οποία δημοσιεύεται η θύρα του παρεχόμενου Redis (loopback, εκτός εάν προσθέσετε AUTH)                                                                                                                                                                                                                           | `127.0.0.1`                            |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Διαδρομή κεντρικού υπολογιστή που προσαρτάται στο προφίλ `cli` στη θέση `/workspace/omniroute` για ροές εργασίας αυτοενημέρωσης                                                                                                                                                                                                                   | `.` (τρέχων κατάλογος)                 |
| `OMNIROUTE_MEMORY_MB`         | Ανώτατο όριο σωρού Node κατά τον χρόνο εκτέλεσης για τον αυτόνομο διακομιστή Docker· παρακάμπτει την παραπάνω προεπιλογή της εικόνας. Πράκτορες προγραμματισμού: `8192`+ (δείτε [RAM χρόνου εκτέλεσης](#runtime-ram-for-coding-agents)).                                                                                                          | `1024`                                 |
| `DASHBOARD_PORT` / `API_PORT` | Παρακάμπτει τις εκτεθειμένες θύρες για τον πίνακα ελέγχου (20128) και το API (20129)                                                                                                                                                                                                                                                              | `20128` / `20129`                      |
| `APP_BIND_HOST`               | Διεπαφή κεντρικού υπολογιστή στην οποία το docker-compose δημοσιεύει τις θύρες του πίνακα ελέγχου/API/live-WS. Με `REQUIRE_API_KEY=false` (η προεπιλογή), το `0.0.0.0` εκθέτει τον ανώνυμο διακομιστή μεσολάβησης `/v1` στο LAN — διευρύνετε την πρόσβαση μόνο με `REQUIRE_API_KEY=true` ή με έναν αντίστροφο διακομιστή μεσολάβησης μπροστά του. | `127.0.0.1`                            |
| `CLIPROXY_BIND_HOST`          | Διεπαφή κεντρικού υπολογιστή στην οποία το docker-compose δημοσιεύει το sidecar `cliproxyapi` — ο τόμος δεδομένων του αποθηκεύει τα διαπιστευτήρια παρόχων.                                                                                                                                                                                       | `127.0.0.1`                            |
| `OMNIROUTE_PLUGINS_DIR`       | Κατάλογος από τον οποίο διαβάζει και στον οποίο εγκαθιστά ο σαρωτής προσθηκών κατά τον χρόνο εκτέλεσης. Ορίστε τον όταν οι προσθήκες προσαρτώνται μέσω bind mount: η προεπιλογή ακολουθεί το `HOME`, το οποίο μια εικόνα ενδέχεται να μην εξάγει.                                                                                                 | `~/.omniroute/plugins`                 |
| `OMNIROUTE_BASE_PATH`         | Υποδιαδρομή URL όταν η εφαρμογή δημοσιεύεται πίσω από έναν αντίστροφο διακομιστή μεσολάβησης (π.χ. `/omniroute`)                                                                                                                                                                                                                                  | _(κενό = ρίζα)_                        |
| `NEXT_PUBLIC_BASE_URL`        | Δημόσια προέλευση του προγράμματος περιήγησης, συμπεριλαμβανομένης της υποδιαδρομής (π.χ. `https://host/omniroute`)                                                                                                                                                                                                                               | δεν έχει οριστεί                       |
| `PROD_DASHBOARD_PORT`         | Θύρα πίνακα ελέγχου στην πλευρά του κεντρικού υπολογιστή για το `docker-compose.prod.yml`                                                                                                                                                                                                                                                         | `20130`                                |
| `CLIPROXYAPI_PORT`            | Θύρα στην πλευρά του κεντρικού υπολογιστή για το sidecar `cliproxyapi`                                                                                                                                                                                                                                                                            | `8317`                                 |

## Αντίστροφος διακομιστής μεσολάβησης σε υποδιαδρομή (Traefik / nginx)

Το `basePath` του Next.js μεταγλωττίζεται μέσα στο αυτόνομο πακέτο. Το OmniRoute καταγράφει την ενσωματωμένη
τιμή σε ένα αρχείο-δείκτη στη ρίζα της εφαρμογής (εγγράφεται κατά την εκτέλεση του `npm run build` και διαβάζεται από το
`scripts/docker/ensure-docker-base-path.mjs`) και τη συγκρίνει με το
`OMNIROUTE_BASE_PATH` κατά την εκκίνηση του container. Όταν διαφέρουν και το image έχει
δημιουργηθεί για τη ρίζα του domain, το entrypoint επανεγγράφει τα manifests του αυτόνομου πακέτου, τις
ενσωματωμένες σταθερές `basePath`/`assetPrefix` (το Next 16 αποδίδει τα URL των SSR assets αποκλειστικά από το
`assetPrefix` — ο μηχανισμός επιδιόρθωσης αντιγράφει την υποδιαδρομή και σε αυτό), τα ενσωματωμένα
URL των assets `/_next/static` (manifests αναφορών client, εισαγωγές πολυμέσων, προαποδομένες
σελίδες σφαλμάτων), καθώς και το shim του `process.env` στον client, πριν εκτελεστεί το
`node dev/run-standalone.mjs`.

### Δημιουργία με Compose (συνιστάται)

Ορίστε και τις δύο μεταβλητές στο `.env` και, στη συνέχεια, εκτελέστε ξανά τη δημιουργία, ώστε το image και το περιβάλλον εκτέλεσης να συμφωνούν:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Το `docker-compose.yml` προωθεί το `OMNIROUTE_BASE_PATH` ως παράμετρο δημιουργίας Docker και ως
μεταβλητή περιβάλλοντος κατά την εκτέλεση.

### Προκατασκευασμένο image ρίζας + υποδιαδρομή κατά την εκτέλεση

Τα δημοσιευμένα images `diegosouzapw/omniroute:*` έχουν δημιουργηθεί για τη ρίζα του domain. Μπορείτε, ωστόσο,
να ορίσετε το `OMNIROUTE_BASE_PATH` κατά την εκτέλεση· το container επιδιορθώνει το πακέτο μία φορά κατά την εκκίνηση.
Συνδυάστε το με την αντίστοιχη δημόσια προέλευση:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ρυθμίστε τον αντίστροφο διακομιστή μεσολάβησης ώστε να προωθεί την **πλήρη** εξωτερική διαδρομή (χωρίς να αφαιρεί το
πρόθεμα). Το Traefik θα πρέπει να δρομολογεί το `PathPrefix(`/omniroute`)` προς το container χωρίς
`StripPrefix`, ώστε το Next.js να λαμβάνει `/omniroute/...` και να παρέχει τα assets από το
`/omniroute/_next/...`.

Ο έλεγχος εύρυθμης λειτουργίας του Docker εξετάζει το ελαφρύ endpoint κύκλου ζωής `/healthz`, με πρόθεμα
το ενεργό `OMNIROUTE_BASE_PATH`. Το `/api/monitoring/health` παραμένει διαθέσιμο για
διαγνωστικούς ελέγχους από ανθρώπους ή πίνακες ελέγχου· για να κατευθύνετε ξανά το HEALTHCHECK του container σε αυτό (για παράδειγμα,
για επιβολή διεξοδικού ελέγχου εύρυθμης λειτουργίας), ορίστε `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Αυτή η διαδρομή εκτελεί έναν **διεξοδικό** έλεγχο (βάση δεδομένων + σύνοψη παρακολούθησης) — κατάλληλο για το αραιό
`HEALTHCHECK` του Docker, εάν επιλέξετε να το ενεργοποιήσετε ξανά, αλλά **όχι** για τα διαστήματα του `livenessProbe`
στο Kubernetes.

Για συστήματα ενορχήστρωσης (Kubernetes, Nomad κ.λπ.):

| Έλεγχος               | Προτιμήστε                                                           | Αποφύγετε                                                                   |
| --------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Ζωντάνια              | HTTP `GET /livez` ή TCP στην κύρια θύρα (`PORT`, προεπιλογή `20128`) | Το `/api/monitoring/health` ως έλεγχο ζωντάνιας                             |
| Ετοιμότητα            | HTTP `GET /healthz`                                                  | Σύντομα χρονικά όρια που θεωρούν έναν απασχολημένο βρόχο συμβάντων ως νεκρό |
| Διεξοδικός / blackbox | `/api/monitoring/health`                                             | —                                                                           |

Το `/healthz` αναφέρει την κατάσταση του κύκλου ζωής της διεργασίας (`ok` / `starting` / `stopping`). Το `/livez`
ελέγχει μόνο εάν η διεργασία είναι ενεργή (επιστρέφει 200 κάθε φορά που μπορεί να εκτελεστεί ο χειριστής· δεν περιμένει την
ετοιμότητα). Και τα δύο εξακολουθούν να εκτελούνται στον ίδιο βρόχο συμβάντων του Node με τον χειρισμό αιτημάτων, επομένως
οι εργασίες καταλόγου ή συμπίεσης που δεσμεύουν τη CPU μπορούν να τα καθυστερήσουν — απασχολημένο ≠ νεκρό. Προτιμήστε έλεγχο ζωντάνιας
μέσω TCP εάν λήγουν τα χρονικά όρια των ελέγχων HTTP. Πλήρεις οδηγίες για τους ελέγχους:
[Οδηγός παρακολούθησης — Συστάσεις για ελέγχους Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose με Caddy (Αυτόματο TLS μέσω HTTPS)

Το OmniRoute μπορεί να εκτεθεί με ασφάλεια χρησιμοποιώντας την αυτόματη παροχή πιστοποιητικών SSL του Caddy. Βεβαιωθείτε ότι η εγγραφή DNS A του domain σας παραπέμπει στη διεύθυνση IP του διακομιστή σας.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origin που είναι προσβάσιμο από το πρόγραμμα περιήγησης για επιστροφές κλήσεων OAuth, συνδέσμους του πίνακα ελέγχου και δημόσια URL που δημιουργούνται.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Εσωτερικό URL μεταξύ διακομιστών για προγραμματισμένες εργασίες / αιτήματα προς τον ίδιο τον διακομιστή.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Το Caddy ορίζει τις τυπικές κεφαλίδες προώθησης για το upstream container. Το OmniRoute χρησιμοποιεί το
`NEXT_PUBLIC_BASE_URL` ως το κανονικό δημόσιο origin για τις επιστροφές κλήσεων OAuth και τους δημόσιους
συνδέσμους που δημιουργούνται· οι πιστοποιημένες εγγραφές του πίνακα ελέγχου χρησιμοποιούν αιτήματα ίδιου origin και προστασία CSRF
δεσμευμένη στη συνεδρία. Ενεργοποιήστε το `OMNIROUTE_TRUST_PROXY` μόνο για προηγμένες αναπτύξεις στις οποίες θέλετε σκόπιμα
το OmniRoute να προσδιορίζει το δημόσιο origin από αξιόπιστες προωθημένες κεφαλίδες αντί από ρητή
διαμόρφωση.

## Γρήγορο Tunnel Cloudflare

Η υποστήριξη του πίνακα ελέγχου για αναπτύξεις Docker περιλαμβάνει ένα **Cloudflare Quick Tunnel** με ένα κλικ στη διαδρομή `Dashboard → Endpoints`. Η πρώτη ενεργοποίηση πραγματοποιεί λήψη του `cloudflared` μόνο όταν χρειάζεται, εκκινεί ένα προσωρινό tunnel προς το τρέχον endpoint `/v1` και εμφανίζει το URL `https://*.trycloudflare.com/v1` που δημιουργήθηκε ακριβώς κάτω από το κανονικό δημόσιο URL σας.

Τα πλαίσια tunnel των endpoint (Cloudflare, Tailscale, ngrok) μπορούν να εμφανίζονται ή να αποκρύπτονται από τη διαδρομή `Settings → Appearance` χωρίς να αλλάζει η κατάσταση του ενεργού tunnel.

### Σημειώσεις για τα Tunnel

- Τα URL των Quick Tunnel είναι προσωρινά και αλλάζουν μετά από κάθε επανεκκίνηση.
- Τα Quick Tunnel δεν επαναφέρονται αυτόματα μετά από επανεκκίνηση του OmniRoute ή του container. Ενεργοποιήστε τα ξανά από τον πίνακα ελέγχου όταν χρειάζεται.
- Η διαχειριζόμενη εγκατάσταση υποστηρίζει επί του παρόντος Linux, macOS και Windows σε `x64` / `arm64`.
- Τα διαχειριζόμενα Quick Tunnel χρησιμοποιούν από προεπιλογή μεταφορά HTTP/2, ώστε να αποφεύγονται οι ενοχλητικές προειδοποιήσεις για το buffer UDP του QUIC σε περιορισμένα περιβάλλοντα container. Ορίστε `CLOUDFLARED_PROTOCOL=quic` ή `auto` εάν θέλετε διαφορετικό τρόπο μεταφοράς.
- Τα Docker image περιλαμβάνουν τα ριζικά πιστοποιητικά CA του συστήματος και τα διαβιβάζουν στο διαχειριζόμενο `cloudflared`, αποτρέποντας έτσι αποτυχίες αξιοπιστίας TLS κατά την αρχικοποίηση του tunnel μέσα στο container.
- Ορίστε `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` εάν θέλετε το OmniRoute να χρησιμοποιεί ένα υπάρχον εκτελέσιμο αρχείο αντί να πραγματοποιήσει λήψη ενός νέου.

## Ετικέτες Image

| Image                    | Ετικέτα  | Μέγεθος | Περιγραφή                                                     |
| ------------------------ | -------- | ------- | ------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Υψηλότερη **δημοσιευμένη** σταθερή SemVer (όχι το git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Καρφιτσώστε αυτήν την κατηγορία ετικέτας για GitOps           |

Manifest πολλαπλών πλατφορμών: εγγενή `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Το Docker επιλέγει αυτόματα την αντίστοιχη αρχιτεκτονική· χρησιμοποιήστε `--platform linux/amd64` εάν πρέπει να επιβάλετε εξομοίωση AMD64 σε κεντρικούς υπολογιστές ARM.

### Κανάλια Εκδόσεων

Το OmniRoute δημοσιεύει ξεχωριστά κανάλια Docker για σταθερές εκδόσεις, δοκιμές του ενεργού κλάδου έκδοσης και εκδόσεις ανάπτυξης.

| Κανάλι                          | Προέλευση                                 | Δυνατότητα μεταβολής          | Συνιστώμενη χρήση                                                                                                                                       |
| ------------------------------- | ----------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Υπογεγραμμένη/εκδομένη κυκλοφορία         | Αμετάβλητο                    | Αναπτύξεις παραγωγής που είναι καρφιτσωμένες σε μια ακριβή έκδοση                                                                                       |
| `:latest` / `:latest-web`       | Υψηλότερη **δημοσιευμένη** σταθερή SemVer | Μεταβλητός σταθερός δείκτης   | Ακολουθεί τις σταθερές εκδόσεις **μετά** από μια εργασία δημοσίευσης SemVer — **δεν** ακολουθεί το `main` ή μη κυκλοφορημένες υποβολές στο `release/v*` |
| `:next` / `:next-web`           | Τρέχων προεπιλεγμένος κλάδος `release/v*` | Μεταβλητός δείκτης προέκδοσης | Δοκιμή διορθώσεων που έχουν ενσωματωθεί στον ενεργό κλάδο έκδοσης, αλλά δεν περιλαμβάνονται ακόμη σε σταθερή έκδοση                                     |
| `:main` / `:main-web`           | Κλάδος `main`                             | Μεταβλητός δείκτης ανάπτυξης  | Μόνο για ανάπτυξη και δοκιμές ενσωμάτωσης                                                                                                               |

#### Χρήση του καναλιού προέκδοσης

Το κανάλι `next` ανακατασκευάζεται με κάθε push στον τρέχοντα προεπιλεγμένο κλάδο `release/v*` και δημοσιεύεται τόσο για AMD64 όσο και για ARM64. Οι παλαιότεροι κλάδοι συντήρησης δεν μπορούν να το αντικαταστήσουν. Το κανάλι παρέχει ένα image που μπορεί να ληφθεί για διορθώσεις οι οποίες έχουν συγχωνευτεί στον ενεργό κλάδο έκδοσης πριν δημιουργηθεί η επόμενη σταθερή ετικέτα.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Για το Docker Compose, παρακάμψτε την ετικέτα image που χρησιμοποιείται από το επιλεγμένο προφίλ και, στη συνέχεια, πραγματοποιήστε λήψη και αναδημιουργήστε την υπηρεσία:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Ασφάλεια και επαναφορά

Το `next` είναι ένα κυλιόμενο κανάλι προέκδοσης. Μπορεί να αλλάξει με οποιοδήποτε push στον ενεργό κλάδο έκδοσης και **δεν υποστηρίζεται για χρήση σε παραγωγή**. Καρφιτσώστε το digest του image κατά την αξιολόγηση μιας συγκεκριμένης έκδοσης:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Πριν από τη δοκιμή, δημιουργήστε αντίγραφο ασφαλείας του τόμου δεδομένων του OmniRoute ή του καταλόγου δεδομένων που έχει προσαρτηθεί μέσω bind mount. Για επαναφορά, χρησιμοποιήστε ξανά την προηγούμενη σταθερή έκδοση ή το digest και αναδημιουργήστε το container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Ένα build από κλάδο release δεν μπορεί ποτέ να μετακινήσει το `latest`· μόνο μια επιλέξιμη σταθερή έκδοση σημασιολογικής εκδόσεως μπορεί να προωθήσει τον δείκτη σταθερής έκδοσης. Τα images `next` διατηρούν τον έλεγχο του release image και την πύλη αποκλεισμού για ευπάθειες επιπέδου CRITICAL.

**Το `latest` δεν αποτελεί εγγύηση επικαιρότητας για το git.** Οι διορθώσεις που έχουν συγχωνευτεί στο `main` ή στον ενεργό κλάδο `release/v*` **δεν** περιλαμβάνονται στο `:latest` έως ότου δημοσιευτεί ένα σταθερό SemVer image και η εργασία δημοσίευσης προωθήσει το `:latest` (με το ίδιο digest με εκείνο το SemVer). Αν το `latest` φαίνεται παγωμένο ενώ το GitHub εμφανίζει ήδη τη διόρθωση, κάντε pull το `:next` για να δοκιμάσετε τον κλάδο release ή περιμένετε το tag SemVer.

| Τι θέλετε                                                                                         | Χρησιμοποιήστε                                  |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| GitOps / περιβάλλον παραγωγής που δεν πρέπει να αποκλίνει                                         | Καρφιτσώστε το `:X.Y.Z` (ή το digest του image) |
| Να ακολουθείτε τις δημοσιευμένες σταθερές εκδόσεις και να αποδέχεστε αναδημιουργία σε κάθε έκδοση | `:latest`                                       |
| Να δοκιμάζετε μη δημοσιευμένα commits του `release/v*`                                            | `:next` (όχι για παραγωγή)                      |
| Να δοκιμάζετε το `main`                                                                           | `:main` (όχι για παραγωγή)                      |

## Διαθεσιμότητα: το προεπιλεγμένο SQLite υποστηρίζει ένα μόνο αντίγραφο

Το τυπικό Docker / Kubernetes OmniRoute είναι **μία διεργασία Node + ένας εγγραφέας SQLite**. Η υψηλή διαθεσιμότητα **δεν υποστηρίζεται** σε αυτήν την τοπολογία.

| Περιορισμός                                                  | Συνέπεια                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ένας εγγραφέας                                               | **Μην** εκτελείτε πολλαπλά αντίγραφα με το ίδιο αρχείο SQLite. Αυτό προκαλεί καταστροφή της βάσης δεδομένων.                                                                                                                                                                                                                                                                |
| Επαναδημιουργία / επανεκκίνηση / τερματισμός από HEALTHCHECK | **Πλήρης διακοπή λειτουργίας** των ενεργών SSE, των συνεδριών του πίνακα ελέγχου και της κατάστασης στη μνήμη. Κάθε συνδεδεμένος πελάτης αποσυνδέεται. Τα νέα αιτήματα κατά το διάστημα χωρίς endpoint λαμβάνουν από τον reverse proxy **`502 Bad Gateway: Unknown error`**, όχι JSON του OmniRoute — οι πελάτες δεν μπορούν να το διακρίνουν από αστοχία παρόχου (#11015). |
| Ίδιο event loop με το `/healthz`                             | Ένας απασχολημένος κύκλος καταλόγου ή συμπίεσης μπορεί να καθυστερήσει τους ελέγχους· ένα σύντομο timeout επανεκκινεί τότε το **μοναδικό** αντίγραφο.                                                                                                                                                                                                                       |

**Πίνακας ελέγχων** (δείτε επίσης τις [συστάσεις για ελέγχους Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Έλεγχος             | Στόχος                                                              | Να μη χρησιμοποιείται                                                   |
| ------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Ζωτικότητα          | TCP στο `PORT` (προεπιλογή `20128`) ή ήπιος HTTP έλεγχος `/healthz` | `/api/monitoring/health`                                                |
| Ετοιμότητα          | HTTP `GET /healthz`                                                 | Αυστηρά timeout που θεωρούν ότι ένα απασχολημένο event loop είναι νεκρό |
| Σε βάθος / άνθρωποι | `/api/monitoring/health`                                            | Αυτοματοποιημένος έλεγχος ζωτικότητας του kubelet                       |

**Αναβαθμίσεις:** αναμένετε ότι κάθε συνεδρία θα διακοπεί. Αποστραγγίστε τους πελάτες, εάν μπορείτε· δεν υπάρχει κυλιόμενη ενημέρωση με το προεπιλεγμένο SQLite. Το Compose `restart: unless-stopped` μαζί με το Docker `HEALTHCHECK` θα αντικαταστήσει επίσης τη μοναδική διεργασία όταν το container είναι Unhealthy — με την ίδια έκταση επιπτώσεων.

Απόσπασμα Kubernetes για **ένα μόνο αντίγραφο** (απαιτείται Recreate· μην αυξήσετε το `replicas` για ένα αρχείο SQLite):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

Η αναμονή `preStop` επιτρέπει στο kube να αφαιρέσει τα endpoint της υπηρεσίας πριν από το SIGTERM, ώστε η **νέα** κίνηση να σταματήσει να κατευθύνεται στη διεργασία που τερματίζεται. Τα ενεργά SSE του `/v1/responses` αποστραγγίζονται για έως και `SHUTDOWN_TIMEOUT_MS` (προεπιλογή 30 δευτερόλεπτα) μέσω heavyweight admission leases (#11015). Τα νέα αιτήματα που εξακολουθούν να φτάνουν στη διεργασία λαμβάνουν `503` + `Retry-After: 5`. Το κενό χωρίς endpoint κατά το Recreate, μέχρι το αντικατασταθέν αντίγραφο να γίνει Ready, παραμένει πλήρης διακοπή λειτουργίας — αυτό οφείλεται στην τοπολογία SQLite και όχι σε εσφαλμένη ρύθμιση ελέγχου.

Η υψηλή διαθεσιμότητα με εξωτερικό Postgres / πολλαπλούς εγγραφείς **δεν** αποτελεί τεκμηριωμένη τυπική διαδρομή. Εάν χρειάζεστε υψηλή διαθεσιμότητα, διατηρήστε ένα μόνο αντίγραφο ή εκτελέστε μια τοπολογία που το έργο έχει δοκιμάσει και τεκμηριώσει ξεχωριστά. Η εργασία για Postgres/MySQL βρίσκεται στο [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Μέχρι να κυκλοφορήσει, ο μόνος υποστηριζόμενος τρόπος αύξησης της χωρητικότητας για **μεγάλα** `/v1/responses` είναι N ανεξάρτητες διεργασίες (επόμενη ενότητα), όχι `replicas > 1` σε έναν τόμο.

## Οριζόντια κλιμάκωση: N ανεξάρτητες διεργασίες

Μία διεργασία Node αντιστοιχεί σε **έναν σωρό V8**. Δύο επικαλυπτόμενα αιτήματα coding-agent `POST /v1/responses` μεγέθους ~3 MiB / ~750k token (RTK + Caveman) προκαλούν τερματισμό αυτού του σωρού στα ~12 Gi (`FATAL ERROR: Reached heap limit`) και μπορούν να προκαλέσουν OOM σε ένα cgroup 16 Gi. Δείτε το [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Αυτή η μέτρηση αποτελεί προειδοποίηση σχετικά με τον **προϋπολογισμό μνήμης** και όχι ένα απόλυτο μέγιστο όριο του προϊόντος για δύο ταυτόχρονα μακροχρόνια `/v1/responses`. Η αποδοχή απαιτητικών συνομιλιών ελέγχεται από έναν αυτόματα υπολογιζόμενο προϋπολογισμό byte εισόδου (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), διαστασιολογημένο βάσει του ίδιου ορίου V8/cgroup — η παράκαμψή του προς τα πάνω (ή ο ορισμός του παλαιού ορίου πλήθους αιτημάτων `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) σε μια ήδη διαστασιολογημένη διεργασία επαναφέρει τον απότομο τερματισμό. Οι μικρές συνομιλίες, τα `/healthz`, `/v1/models` και το MCP **δεν** περιλαμβάνονται σε αυτό το όριο.

### Μία διεργασία: περισσότερα από δύο μακροχρόνια `/v1/responses`

Μια **υγιής** διεργασία (με σωρό κάτω από το `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, προεπιλογή `0.75`) **μπορεί** να εκτελεί περισσότερα από δύο ταυτόχρονα μακροχρόνια `POST /v1/responses`, όταν υπάρχει ακόμη διαθέσιμος χώρος στον προϋπολογισμό byte εν εξελίξει αιτημάτων ολόκληρης της διεργασίας (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Τα σώματα μεγέθους ίσου ή μεγαλύτερου από `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (προεπιλογή 256 KiB) αποκτούν την ίδια βαριά μίσθωση με τα αιτήματα σύνθετης δομής και χρησιμοποιούν την ίδια διέξοδο `tryAcquireHealthyHeadroom` του [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Δεκάδες ταυτόχρονοι μακροχρόνιοι πελάτες SSE (οι διαχειριστές συχνά χρειάζονται 40–50) αποτελούν ζήτημα **προϋπολογισμού μνήμης** — διαστασιολογήστε τον σωρό, τις κύριες/εφεδρικές θέσεις και το `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — και όχι ένα απόλυτο όριο προϊόντος «έως 2». Ένας σωρός υπό πίεση συνεχίζει να απορρίπτει φορτίο με επαναλήψιμο `503`, ώστε να μην επανεμφανιστεί το #7849.

Για να **πολλαπλασιάσετε τους σωρούς** (ανεξάρτητα old-spaces του V8) **σήμερα**:

| Κάντε                                                                                                                                                                                                                         | Μην κάνετε                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Εκτελέστε **N containers/pods**, καθένα με το **δικό του** `DATA_DIR` / volume                                                                                                                                                | Μην ορίσετε `replicas > 1` για ένα κοινό αρχείο SQLite                                    |
| Διαστασιολογήστε τα βαριά εν εξελίξει αιτήματα + το υγιές εφεδρικό περιθώριο βάσει του προϋπολογισμού σωρού / byte εν εξελίξει αιτημάτων· το 1–2 είναι η συντηρητική προεπιλογή του #7849, όχι απόλυτο μέγιστο όριο προϊόντος | Μην εκχωρήσετε σε μία διεργασία 8× RAM και απεριόριστο όριο πλήθους                       |
| Προαιρετικά: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` για **κοινόχρηστους μετρητές ορίων χρήσης**                                                                                                                 | Μην αντιμετωπίζετε το Redis ως κοινόχρηστο SQLite — δεν είναι                             |
| Αντιγράψτε τα μυστικά των παρόχων σε κάθε instance (ή αποδεχτείτε κατακερματισμένους πίνακες ελέγχου)                                                                                                                         | Μην αναμένετε έναν ενιαίο πίνακα ελέγχου / αρχείο καταγραφής κλήσεων για όλα τα instances |
| Τοποθετήστε μπροστά οποιονδήποτε εξισορροπητή φορτίου· η προσκόλληση βάσει API key ή session είναι αρκετή                                                                                                                     | Μην απαιτείτε middleware συγκεκριμένου προμηθευτή που λαμβάνει υπόψη το μέγεθος           |

Υλικό: ο αριθμός ταυτόχρονων μακροχρόνιων `/v1/responses` ανά instance αποτελεί ζήτημα **προϋπολογισμού μνήμης** (σωρός + byte εν εξελίξει αιτημάτων / #10110). Τα `N` ανεξάρτητα `DATA_DIR` εξακολουθούν να πολλαπλασιάζουν τους σωρούς: η RAM του host πρέπει να καλύπτει `N × cgroup`, όχι «ένα pod 16 Gi με N=8». Ποτέ μην ορίζετε `replicas > 1` για ένα κοινό αρχείο SQLite.

Πρόχειρο παράδειγμα Compose (δύο σωροί, δύο volumes — όχι `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Η πυκνότητα εντός της διεργασίας (με τη συμπίεση εκτός του HTTP isolate) παρακολουθείται στο [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ένα λογικό cluster σε κοινόχρηστη μόνιμη κατάσταση παρακολουθείται στο [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Σημαντικές σημειώσεις

- **Λειτουργία WAL του SQLite:** Θα πρέπει να επιτρέπεται στο `docker stop` να ολοκληρωθεί, ώστε το OmniRoute να μπορεί να εγγράψει τις πιο πρόσφατες αλλαγές πίσω στο `storage.sqlite` μέσω checkpoint. Τα παρεχόμενα αρχεία Compose ορίζουν ήδη περίοδο χάριτος 40s για τη διακοπή. Αν εκτελείτε την εικόνα απευθείας, διατηρήστε το `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Ορίστε το σε `true` αν η διαχείριση των τακτικών αντιγράφων ασφαλείας και των αντιγράφων πριν από εγγραφές γίνεται εξωτερικά. Οι μετεγκαταστάσεις υφιστάμενων βάσεων δεδομένων εξακολουθούν να απαιτούν το δικό τους ανθεκτικό στιγμιότυπο ασφαλείας και μηχανισμό προστασίας για μαζικές μετεγκαταστάσεις.
- **Διατήρηση δεδομένων:** Προσαρτάτε πάντα έναν τόμο στο `/app/data`, ώστε η βάση δεδομένων, τα κλειδιά και οι διαμορφώσεις σας να διατηρούνται μεταξύ των επανεκκινήσεων του κοντέινερ.
- **Διαμόρφωση θύρας:** Παρακάμψτε τη μεταβλητή περιβάλλοντος `PORT` για να αλλάξετε την προεπιλεγμένη θύρα `20128`.

## Δείτε επίσης

- [Οδηγός ανάπτυξης σε VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Ρύθμιση VM + nginx + Cloudflare
- [Οδηγός ανάπτυξης στο Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Ανάπτυξη στο Fly.io
- [Διαμόρφωση περιβάλλοντος](../reference/ENVIRONMENT.md) — Πλήρης αναφορά του `.env`
