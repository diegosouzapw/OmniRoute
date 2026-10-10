# 🐳 Docker Guide — OmniRoute (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Πλήρης αναφορά ανάπτυξης με Docker. Για γρήγορη εκκίνηση, ανατρέξτε στην [ενότητα Docker του README](../README.md#-docker).

## Πίνακας Περιεχομένων

- [Γρήγορη Εκτέλεση](#quick-run)
- [Με Αρχείο Περιβάλλοντος](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Διαθέσιμα Προφίλ](#available-profiles)
- [Ρύθμιση εργαλείων CLI του host όταν το OmniRoute εκτελείται σε Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Compose για Παραγωγή](#production-compose)
- [Στάδια Dockerfile](#dockerfile-stages)
- [Κρίσιμες Μεταβλητές Περιβάλλοντος](#critical-environment-variables)
- [Docker Compose με Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Γρήγορο Tunnel Cloudflare](#cloudflare-quick-tunnel)
- [Ετικέτες Image](#image-tags)
- [Διαθεσιμότητα: το προεπιλεγμένο SQLite είναι μονής replica](#availability-default-sqlite-is-single-replica)
- [Τοπικά σφάλματα Gemini μέσα στο Docker](#gemini-regional-errors-inside-docker)
- [Σημαντικές Σημειώσεις](#important-notes)

---

## Γρήγορη Εκτέλεση

> **Αυτοφιλοξενία με μία εντολή;** Ανατρέξτε στον
> [Οδηγό Αυτοφιλοξενίας](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (δημοσιευμένο image +
> Redis, μόνο μέσω loopback, χωρίς επιλογή προφίλ). Η παρακάτω Γρήγορη Εκτέλεση είναι η
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

## Με Αρχείο Περιβάλλοντος

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

# Προφίλ host (κυρίως για Linux· προσαρτά τα εκτελέσιμα CLI του host μόνο για ανάγνωση)
docker compose --profile host up -d

# Προφίλ web (Chromium/Playwright για παρόχους συνεδριών web)
docker compose --profile web up -d

# Συνδυασμός CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Διαθέσιμα Προφίλ

Το OmniRoute παρέχει προφίλ Compose για τις κύριες μορφές ανάπτυξης. Επιλέξτε εκείνο που ταιριάζει στο περιβάλλον σας.

| Προφίλ              | Υπηρεσία         | Πότε χρησιμοποιείται                                                                                                                                       | Εντολή                                       |
| ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (προεπιλογή) | `omniroute-base` | Headless server / ελάχιστο περιβάλλον εκτέλεσης, χωρίς ενσωματωμένα CLI παρόχων                                                                            | `docker compose --profile base up -d`        |
| `cli`               | `omniroute-cli`  | Ροές εργασίας agentic που καλούν το `omniroute providers/setup/doctor` και τα ενσωματωμένα CLI (Codex, Claude Code, Droid, OpenClaw)                       | `docker compose --profile cli up -d`         |
| `host`              | `omniroute-host` | Host Linux που χρειάζονται πρόσβαση τύπου `network_mode` στα CLI του host, προσαρτώντας τα `~/.local/bin`, `~/.codex`, `~/.claude` κ.λπ. μόνο για ανάγνωση | `docker compose --profile host up -d`        |
| `cliproxyapi`       | `cliproxyapi`    | Εκτέλεση του sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) στη θύρα `8317` για proxying σε upstream CLI                              | `docker compose --profile cliproxyapi up -d` |
| `web`               | `omniroute-web`  | Πάροχοι συνεδριών web που χρειάζονται browser: `gemini-web`, `claude-web`, `claude-turnstile` (δημιουργεί το `runner-web`, περιλαμβάνεται το Chromium)     | `docker compose --profile web up -d`         |

> Μπορούν να συνδυαστούν πολλαπλά προφίλ: `docker compose --profile cli --profile cliproxyapi up -d`.

## Ρύθμιση εργαλείων CLI του host όταν το OmniRoute εκτελείται στο Docker

Οι εντολές `omniroute setup-codex`, `setup-claude`, `config set <tool>` και το κουμπί
**Αποθήκευση ρυθμίσεων** του dashboard εγγράφουν αρχεία όπως το `~/.codex/*.config.toml`. Αυτές οι διαδρομές
έχουν νόημα μόνο στο μηχάνημα όπου εκτελείται πραγματικά το CLI. Αν τις εκτελέσετε μέσα
στο container, η εγγραφή καταλήγει στον προσωπικό κατάλογο του ίδιου του container (`/home/node` —
το image εκτελείται με `USER node`), όπου κανένα CLI του host δεν θα τη διαβάσει ποτέ και από όπου
θα απορριφθεί μόλις δημιουργηθεί ξανά το container.

Το OmniRoute το εντοπίζει αυτό και αρνείται την εγγραφή, παρέχοντας οδηγίες αντί να
αναφέρει μια επιτυχία που δεν μπορείτε να αξιοποιήσετε: το CLI τερματίζεται με κωδικό `2` και το API απαντά με `422`
και `containerEphemeralTarget: true`.

### Συνιστώμενη προσέγγιση: εκτελέστε το CLI στον host και το OmniRoute στο Docker

Το container παρέχει το API· το CLI ρυθμίζει τα εργαλεία του host σας.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # κατευθύνετε το CLI προς το container
omniroute setup-codex                      # εγγράφει το πραγματικό ~/.codex στον host σας
```

Αυτή είναι η σωστή επιλογή όταν το Codex, το Claude Code, το Cursor ή παρόμοια εργαλεία εκτελούνται στον
φορητό υπολογιστή σας — που είναι και η συνήθης διαμόρφωση.

### Εναλλακτική λύση: προσαρτήστε με bind mount τους καταλόγους ρυθμίσεων του host (προφίλ `host`)

Αν θέλετε το ίδιο το container να εγγράφει τις ρυθμίσεις του host σας, προσαρτήστε
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

Το bind mount είναι αυτό που καθιστά αξιόπιστη τη διαδρομή: το OmniRoute διαβάζει το
`/proc/self/mountinfo` και επιτρέπει εγγραφές σε προσαρτημένες διαδρομές (καθώς και σε καταλόγους
των οποίων τα παιδιά είναι σημεία προσάρτησης, κάτι που αντιστοιχεί ακριβώς στη δομή `/host-home` παραπάνω), ενώ
εξακολουθεί να αρνείται τις εγγραφές σε μη προσαρτημένες διαδρομές.

### Λύση ανάγκης: ρυθμίστε τα CLI του ίδιου του container (χρησιμοποιήστε τη με φειδώ)

Όταν τα CLI βρίσκονται πράγματι μέσα στο container (στο προφίλ `cli`), η εγγραφή
είναι σκόπιμη. Περάστε το `--allow-container-write` σε οποιαδήποτε εντολή `setup-*` ή ορίστε
το `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` για τον server. Η εγγραφή εκτελείται
με προειδοποίηση ότι δεν θα διατηρηθεί μετά την κατάργηση του container.

> **Προειδοποίηση ασφαλείας — προφίλ `cli` + προσάρτηση `docker.sock`.**
> Το προφίλ `cli` προσαρτά μέσω bind mount το `/var/run/docker.sock`, ώστε το
> πρόγραμμα αυτόματης ενημέρωσης εντός του container να μπορεί να δημιουργήσει ξανά τη στοίβα μέσω του daemon του host
> (το `src/lib/system/autoUpdate.ts` ελέγχει την παρουσία αυτού του socket και παραλείπει τη
> διαδρομή Docker όταν αυτό απουσιάζει). Αυτό το socket αποτελεί **όριο εμπιστοσύνης με δικαιώματα root
> στον host**: οτιδήποτε μπορεί να αποκτήσει πρόσβαση σε αυτό ελέγχει τον Docker daemon του host ως
> root — μπορεί να δημιουργήσει, να επιθεωρήσει, να σταματήσει και να καταργήσει οποιοδήποτε container στον host.
> Συνέπειες:
>
> 1. **Μην εκθέτετε ποτέ τη θύρα του προφίλ `cli` στο δίκτυο.** Δημοσιεύστε
>    τη στο `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — ένα προφίλ `cli` προσβάσιμο από το LAN μετατρέπει οποιαδήποτε δυνατότητα RCE σε επίπεδο dashboard σε
>    πλήρη παραβίαση του host.
> 2. **Μην προσαρτάτε επιπλέον καταλόγους του host στο προφίλ `cli`.**
>    Το Docker socket μαζί με οποιαδήποτε επιπλέον προσάρτηση παρέχει στο container πλήρη
>    πρόσβαση ανάγνωσης/εγγραφής στο σύστημα αρχείων και στις ρυθμίσεις του host σας. Αν χρειάζεστε ένα εργαλείο για να
>    βλέπει ένα έργο, εκτελέστε το τοπικά με το εκτελέσιμο του CLI — μην το προσαρτάτε
>    στο container `cli`.
>
> Αν δεν χρειάζεστε αυτόματη ενημέρωση εντός του container, αφήστε απενεργοποιημένο το προφίλ `cli`
> (`COMPOSE_PROFILES=core,redis` ή συντομότερο). Τα άλλα προφίλ δεν
> προσαρτούν το Docker socket.
>
> Ανατρέξτε στο `docs/security/MITM-TPROXY-DECRYPT.md` (στο git· δεν μεταγλωττίζεται στο `/docs`) για το σχετικό μοντέλο απειλών
> γύρω από το MITM και στο `docs/security/SUPPLY_CHAIN.md` για την
> αλυσίδα προέλευσης των εκτελέσιμων `codex`/`claude-code`/`droid`/`openclaw`.

## Redis Sidecar

Το OmniRoute βασίζεται στο Redis για την υποστήριξη του κατανεμημένου περιοριστή ρυθμού και της κοινόχρηστης κρυφής μνήμης. Η υπηρεσία `redis` ορίζεται **πάντα** στο `docker-compose.yml` (δεν περιορίζεται από κάποιο προφίλ) και εκκινείται μαζί με οποιοδήποτε άλλο προφίλ.

| Λεπτομέρεια                  | Τιμή                                        |
| ---------------------------- | ------------------------------------------- |
| Image                        | `redis:7-alpine`                            |
| Όνομα container              | `omniroute-redis`                           |
| Εσωτερική θύρα               | `6379`                                      |
| Θύρα host (παράκαμψη)        | `REDIS_PORT` (προεπιλογή: `6379`)           |
| Διεύθυνση host (παράκαμψη)   | `REDIS_BIND_HOST` (προεπιλογή: `127.0.0.1`) |
| Volume                       | `omniroute-redis-data` → `/data`            |
| Έλεγχος εύρυθμης λειτουργίας | `redis-cli ping` (διάστημα 10s)             |

Σχετικές μεταβλητές περιβάλλοντος:

- `REDIS_URL` — συμβολοσειρά σύνδεσης που εισάγεται στην εφαρμογή (`redis://redis:6379` από προεπιλογή).
- `REDIS_PORT` — αντιστοίχιση θύρας στην πλευρά του host για το container του Redis.
- `REDIS_BIND_HOST` — διεπαφή του host στην οποία δημοσιεύεται η θύρα. Η προεπιλεγμένη τιμή είναι `127.0.0.1`.

> **Γιατί χρησιμοποιείται το loopback από προεπιλογή:** το sidecar εκτελείται χωρίς `requirepass` και τα
> containers της εφαρμογής συνδέονται σε αυτό μέσω του δικτύου compose (`redis:6379`) — η δημοσιευμένη θύρα
> υπάρχει μόνο για εργαλεία στην πλευρά του host (`redis-cli`, ένα τοπικό `npm run dev`). Η δημοσίευση στο
> `0.0.0.0` θα εξέθετε ένα Redis χωρίς έλεγχο ταυτότητας σε κάθε host του LAN σας. Αν ορίσετε
> `REDIS_BIND_HOST=0.0.0.0`, προσθέστε επίσης το `--requirepass` στο `command:` της υπηρεσίας.

Η **απενεργοποίηση του Redis** δεν συνιστάται (ο περιοριστής ρυθμού θα υποβαθμιστεί σε εφεδρική λειτουργία εντός μνήμης). Αν είναι απαραίτητο, είτε αφαιρέστε/σχολιάστε το μπλοκ υπηρεσίας `redis:` στο `docker-compose.yml` είτε μειώστε την κλίμακά του στο μηδέν:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

Για ένα απομονωμένο στιγμιότυπο παραγωγής που εκτελείται παράλληλα με το περιβάλλον ανάπτυξης, χρησιμοποιήστε το `docker-compose.prod.yml`.

| Λεπτομέρεια                       | Τιμή                                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| Αρχείο                            | `docker-compose.prod.yml`                                                                          |
| Προεπιλεγμένη θύρα πίνακα ελέγχου | `PROD_DASHBOARD_PORT=20130` (αντιστοιχίζεται στην εσωτερική `${DASHBOARD_PORT:-20128}`)            |
| Προεπιλεγμένη θύρα API            | `PROD_API_PORT=20131`                                                                              |
| Image                             | `omniroute:prod` (δημιουργείται από τον στόχο `runner-cli`)                                        |
| Container του Redis               | `omniroute-redis-prod` (`redis:8.6.2`, αποκλειστικό volume `redis-prod-data`)                      |
| Volume δεδομένων                  | `omniroute-prod-data` (ονομασμένο, διατηρείται μεταξύ επαναδημιουργιών)                            |
| Έλεγχοι εύρυθμης λειτουργίας      | `node healthcheck.mjs` + `redis-cli ping`, με το `depends_on` να εξαρτάται από την υγεία του Redis |

Τρόπος χρήσης:

```bash
# Δημιουργία και εκκίνηση της στοίβας παραγωγής
docker compose -f docker-compose.prod.yml up -d --build

# Συνεχής προβολή αρχείων καταγραφής
docker compose -f docker-compose.prod.yml logs -f

# Τερματισμός (διατήρηση των volumes)
docker compose -f docker-compose.prod.yml down
```

Η στοίβα παραγωγής εκτελείται παράλληλα με το compose ανάπτυξης (διαφορετικά ονόματα containers, θύρες και volumes), ώστε να μπορείτε να συνεχίζετε την τοπική ανάπτυξη ενώ το περιβάλλον παραγωγής παραμένει σε λειτουργία.

## Στάδια Dockerfile

Το αποθετήριο παρέχει ένα Dockerfile πολλαπλών σταδίων (`Dockerfile`). Διατίθενται τέσσερα στάδια· επιλέξτε το κατάλληλο `target` για την περίπτωση χρήσης σας.

| Στάδιο        | Βασική εικόνα         | Σκοπός                                                                                                                                                                                                                                                                                                                                       |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Εγκαθιστά τις εξαρτήσεις (`npm ci --legacy-peer-deps`) και εκτελεί `npm run build` (Turbopack από προεπιλογή — δείτε τους Πόρους χρόνου build παρακάτω)                                                                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Περιβάλλον εκτέλεσης παραγωγής με το αυτόνομο αποτέλεσμα εξόδου του Next.js. **Δεν περιλαμβάνονται CLI παρόχων.**                                                                                                                                                                                                                            |
| `runner-cli`  | `runner-base`         | Προσθέτει `git`, `docker.io`, `docker-compose` και καθολικά CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Επιλέξτε το για ροές εργασίας με πράκτορες.**                                                                                                                                                          |
| `runner-web`  | `runner-base`         | Προσθέτει Playwright και ένα πρόγραμμα περιήγησης Chromium (`--with-deps`) για παρόχους συνεδριών ιστού: `gemini-web`, `claude-web`, `claude-turnstile`. **Επιλέξτε το όταν χρησιμοποιείτε αυτούς τους παρόχους** — η απλή εικόνα αποτυγχάνει κατά την υποβολή αιτήματος χωρίς αυτό (δείτε τη σημείωση `-web` στην ενότητα Κανάλια έκδοσης). |

Δημιουργήστε χειροκίνητα ένα συγκεκριμένο target:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Πόροι χρόνου build

Τρία ορίσματα build ελέγχουν το κόστος του σταδίου `builder`. Ισχύουν μόνο κατά το build —
το `OMNIROUTE_MEMORY_MB` (παρακάτω) είναι μια ξεχωριστή ρύθμιση χρόνου εκτέλεσης.

| Όρισμα build                | Προεπιλογή | Επίδραση                                                                                                          |
| --------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`        | Το `0` εκτελεί build με webpack: χαμηλότερη μέγιστη χρήση μνήμης, αλλά πιο αργά. Το `1` ενεργοποιεί το Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`     | Ανώτατο όριο heap της V8 (`--max-old-space-size`) για το `next build` που εκκινείται.                             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`        | Τροφοδοτεί το `CIRCLE_NODE_TOTAL`· το Next υπολογίζει `workers = N - 1` για τη συλλογή δεδομένων σελίδων.         |

Το `OMNIROUTE_BUILD_WORKERS` είναι αυτό που πρέπει να αυξήσετε σε ένα ισχυρό σύστημα build και αυτό που πρέπει να
υποψιαστείτε όταν ένα build με περιορισμένους πόρους τερματίζεται **μετά** το `✓ Compiled successfully`. Κάθε
worker δεδομένων σελίδων είναι ξεχωριστή διεργασία, όπως και το ίδιο το γονικό `next build`·
μια αναπαραγωγή σε ενεργό VPS (ζήτημα #7518) μέτρησε τη μέγιστη RSS κάθε διεργασίας στα
~4.5 GB, ανεξάρτητα από τη σημαία heap `NODE_OPTIONS` (το Turbopack μεταγλωττίζει σε
εγγενή μνήμη/Rust εκτός του heap της V8). Η προεπιλογή `2` (→ 1 worker, 2
διεργασίες συνολικά) έχει διαστασιολογηθεί για τα GitHub-hosted runners με 16 GB / 4 vCPU που
χρησιμοποιεί η ροή δημοσίευσης. Με `8` (→ 7 workers), εκείνο το runner εξάντλησε τη μνήμη και
το buildkit απέτυχε στο βήμα με `ResourceExhausted: ... cannot allocate memory`·
το `3` (→ 2 workers) εξακολουθούσε να μην επαρκεί όταν η RSS ανά διεργασία μετρήθηκε
απευθείας αντί να συναχθεί. Το `tests/unit/docker-build-memory-budget.test.ts`
εκτελεί τους υπολογισμούς με βάση τη μετρημένη τιμή και αποτυγχάνει αν οποιαδήποτε από τις δύο ρυθμίσεις
ξεπεράσει τις δυνατότητες του runner.

Το Turbopack μεταγλωττίζει σε εγγενή μνήμη Rust που βρίσκεται **εκτός** του heap της V8, επομένως
το `OMNIROUTE_BUILD_MEMORY_MB` δεν τη θέτει υπό όριο. Σε έναν host με ανώτατο όριο μνήμης, το
build τερματίζεται τότε με SIGKILL από τον OOM killer χωρίς κανένα κείμενο σφάλματος — απλώς
σταματά στη μέση του `Creating an optimized production build`, κάτι που μοιάζει με κόλλημα και όχι
με εξάντληση μνήμης. Γι’ αυτό το `Dockerfile` χρησιμοποιεί από προεπιλογή το webpack
(`OMNIROUTE_USE_TURBOPACK=0`), σε αντίθεση με τα `npm run dev` / `npm run build`, όπου
το Turbopack είναι η προεπιλογή του κώδικα: ένα απλό `docker build .` χωρίς ορίσματα build (όπως
εκτελούν το Railway και άλλοι hosts εγκατάστασης με ένα κλικ) δεν πρέπει να τερματίζεται σιωπηρά σε ένα
σύστημα build με περιορισμένη μνήμη. Οι δημοσιευμένες εικόνες ήδη μεταβιβάζουν ρητά το
`OMNIROUTE_USE_TURBOPACK=0` στο `docker-publish.yml`. Σε ένα σύστημα build με άφθονη RAM, ενεργοποιήστε
το Turbopack για ταχύτερο build:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Το `webpackBuildWorker` είναι ενεργοποιημένο, επομένως το `next build` εκτελεί μία γονική διεργασία **και** μία διεργασία worker,
και καθεμία τηρεί ξεχωριστά το `OMNIROUTE_BUILD_MEMORY_MB`. Ορίστε το ανώτατο όριο του container
σε περίπου πάνω από το διπλάσιο αυτής της τιμής, όχι μόνο πάνω από τη μία φορά την τιμή.

Μετρήσεις σε αυτό το δέντρο (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Ανώτατο όριο container | Αποτέλεσμα                                       |
| --------- | ---------------------- | ------------------------------------------------ |
| Turbopack | 8 GiB / 16 GiB         | Τερματίστηκε από OOM και στα δύο, χωρίς μήνυμα   |
| webpack   | 8 GiB                  | Ο worker του build τερματίστηκε με SIGKILL       |
| webpack   | 12 GiB                 | Ολοκληρώθηκε επιτυχώς, με μέγιστη χρήση 11.1 GiB |

### Προεπιλογές χρόνου εκτέλεσης

Προεπιλογές που εξάγονται από το `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Συμπεριφορά μνήμης στο Docker:

- Η εικόνα ορίζει `OMNIROUTE_MEMORY_MB=1024` και εξάγει από αυτό το `NODE_OPTIONS=--max-old-space-size=1024`.
- Η πραγματική διεργασία διακομιστή εκκινείται από τον αυτόνομο εκκινητή, ο οποίος διαβάζει το `OMNIROUTE_MEMORY_MB` και προσθέτει το `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Το Node χρησιμοποιεί την τελευταία επαναλαμβανόμενη τιμή `--max-old-space-size`, επομένως ο ορισμός του `OMNIROUTE_MEMORY_MB` ελέγχει το πραγματικό όριο heap του Docker.
- Επειδή η εικόνα το ορίζει πάντα, η εφεδρική ρύθμιση του εκκινητή που βαθμονομείται βάσει RAM δεν εφαρμόζεται ποτέ στο Docker. Αυξήστε το ρητά ανάλογα με τον φόρτο εργασίας (βλ. πίνακα παρακάτω). Το `2048` εξακολουθεί να είναι πολύ μικρό για το `/v1/responses` ενός πράκτορα προγραμματισμού.

### RAM χρόνου εκτέλεσης για πράκτορες προγραμματισμού

Η προεπιλεγμένη τιμή 1 GiB του Docker αποτελεί την ελάχιστη βάση για τον πίνακα ελέγχου/ελαφριά συνομιλία και όχι μέγεθος κατάλληλο για παραγωγή. Τα μεγάλα σώματα `POST /v1/responses` (εκατοντάδες μηνύματα, δεκάδες εργαλεία) διατηρούν πολλαπλά γραφήματα στη μνήμη κατά τη συμπίεση. Δύο επικαλυπτόμενα αιτήματα μεγέθους ~3 MiB / ~750k token προκάλεσαν τερματισμό του V8 με **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) και επίσης προκάλεσαν OOM σε cgroup 16 GiB. Δείτε το [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Ορίστε το μέγεθος της **cgroup `--memory` υψηλότερα από το heap** — τα εγγενή buffer, το SQLite και τα ενδιάμεσα δεδομένα συμπίεσης βρίσκονται εκτός του V8.

| Φόρτος εργασίας                                    | `OMNIROUTE_MEMORY_MB`       | Container / cgroup             | Σημειώσεις                                                                                                                  |
| -------------------------------------------------- | --------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Πίνακας ελέγχου, μία ελαφριά συνομιλία             | `1024` (προεπιλογή εικόνας) | ≥2 GiB                         |                                                                                                                             |
| Ένας πράκτορας προγραμματισμού (Claude/Codex/Grok) | `8192`                      | ≥10 GiB                        | Τυπική συνεδρία `/v1/responses`                                                                                             |
| Δύο ταυτόχρονα μεγάλα `/v1/responses`              | `10240`–`12288`             | ≥12–16 GiB                     | Μετρήθηκε τερματισμός του V8 σε heap ~12 GiB                                                                                |
| Τρία ή περισσότερα ταυτόχρονα μεγάλα context       | όχι σε μία διεργασία        | σειριοποίηση / περισσότερη RAM | Η προεπιλεγμένη αποδοχή απαιτητικών αιτημάτων είναι 1 σε εξέλιξη· η αύξησή της χωρίς επιπλέον RAM επαναφέρει τον τερματισμό |

Το `omniroute serve` σε φυσικό σύστημα βαθμονομείται περίπου στο 35% της RAM (με περιορισμό στο `[512, 4096]`) όταν το `OMNIROUTE_MEMORY_MB` **δεν έχει οριστεί**. Το Docker ορίζει πάντα την τιμή `1024`, επομένως αυτή η βαθμονόμηση δεν εκτελείται ποτέ στην επίσημη εικόνα.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Κρίσιμες Μεταβλητές Περιβάλλοντος

Πέρα από τις προεπιλογές που τεκμηριώνονται στο [ENVIRONMENT.md](../reference/ENVIRONMENT.md), οι ακόλουθες μεταβλητές είναι οι σημαντικότερες κατά την εκτέλεση σε Docker:

| Μεταβλητή                     | Σκοπός                                                                                                                                                                                                                                                                                                              | Προεπιλογή                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Κοινόχρηστο μυστικό για τη γέφυρα WebSocket. **Απαιτείται στην παραγωγή** — ορίστε το σε μια ισχυρή τυχαία συμβολοσειρά.                                                                                                                                                                                            | μη ορισμένο (πρέπει να παρασχεθεί) |
| `REDIS_URL`                   | Συμβολοσειρά σύνδεσης για το backend περιορισμού ρυθμού / προσωρινής μνήμης                                                                                                                                                                                                                                         | `redis://redis:6379`               |
| `REDIS_PORT`                  | Θύρα στην πλευρά του κεντρικού υπολογιστή για το ενσωματωμένο κοντέινερ Redis                                                                                                                                                                                                                                       | `6379`                             |
| `REDIS_BIND_HOST`             | Διεπαφή του κεντρικού υπολογιστή στην οποία δημοσιεύεται η ενσωματωμένη θύρα Redis (loopback, εκτός εάν προσθέσετε AUTH)                                                                                                                                                                                            | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Διαδρομή στον κεντρικό υπολογιστή που προσαρτάται στο προφίλ `cli` στη θέση `/workspace/omniroute` για ροές εργασίας αυτοενημέρωσης                                                                                                                                                                                 | `.` (τρέχων κατάλογος)             |
| `OMNIROUTE_MEMORY_MB`         | Ανώτατο όριο σωρού Node κατά τον χρόνο εκτέλεσης για τον αυτόνομο διακομιστή Docker· παρακάμπτει την παραπάνω προεπιλογή της εικόνας. Πράκτορες προγραμματισμού: `8192`+ (βλ. [RAM χρόνου εκτέλεσης](#runtime-ram-for-coding-agents)).                                                                              | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Παράκαμψη των εκτεθειμένων θυρών για τον πίνακα ελέγχου (20128) και το API (20129)                                                                                                                                                                                                                                  | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Διεπαφή του κεντρικού υπολογιστή στην οποία το docker-compose δημοσιεύει τις θύρες του πίνακα ελέγχου/API/live-WS. Με `REQUIRE_API_KEY=false` (την προεπιλογή), το `0.0.0.0` εκθέτει τον ανώνυμο διαμεσολαβητή `/v1` στο LAN — διευρύνετέ την μόνο με `REQUIRE_API_KEY=true` ή με αντίστροφο διαμεσολαβητή μπροστά. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Διεπαφή του κεντρικού υπολογιστή στην οποία το docker-compose δημοσιεύει το sidecar `cliproxyapi` — ο τόμος δεδομένων του διατηρεί τα διαπιστευτήρια των παρόχων.                                                                                                                                                   | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Κατάλογος τον οποίο διαβάζει ο σαρωτής προσθέτων κατά τον χρόνο εκτέλεσης και στον οποίο εγκαθιστά. Ορίστε τον όταν τα πρόσθετα προσαρτώνται μέσω bind mount: η προεπιλογή ακολουθεί το `HOME`, το οποίο μια εικόνα ενδέχεται να μην εξάγει.                                                                        | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | Υποδιαδρομή URL όταν η εφαρμογή δημοσιεύεται πίσω από αντίστροφο διαμεσολαβητή (π.χ. `/omniroute`)                                                                                                                                                                                                                  | _(κενό = ριζικός κατάλογος)_       |
| `NEXT_PUBLIC_BASE_URL`        | Δημόσια προέλευση του προγράμματος περιήγησης, συμπεριλαμβανομένης της υποδιαδρομής (π.χ. `https://host/omniroute`)                                                                                                                                                                                                 | μη ορισμένο                        |
| `PROD_DASHBOARD_PORT`         | Θύρα πίνακα ελέγχου στην πλευρά του κεντρικού υπολογιστή για το `docker-compose.prod.yml`                                                                                                                                                                                                                           | `20130`                            |
| `CLIPROXYAPI_PORT`            | Θύρα στην πλευρά του κεντρικού υπολογιστή για το sidecar `cliproxyapi`                                                                                                                                                                                                                                              | `8317`                             |

## Αντίστροφος διακομιστής μεσολάβησης σε υποδιαδρομή (Traefik / nginx)

Το `basePath` του Next.js μεταγλωττίζεται μέσα στο αυτόνομο πακέτο. Το OmniRoute καταγράφει την ενσωματωμένη
τιμή σε ένα αρχείο sentinel στη ρίζα της εφαρμογής (γράφεται κατά την εκτέλεση του `npm run build` και διαβάζεται από το
`scripts/docker/ensure-docker-base-path.mjs`) και τη συγκρίνει με το
`OMNIROUTE_BASE_PATH` κατά την εκκίνηση του container. Όταν διαφέρουν και το image έχει
δημιουργηθεί για τη ρίζα του domain, το entrypoint επανεγγράφει τα αυτόνομα manifests, τις
ενσωματωμένες σταθερές `basePath`/`assetPrefix` (το Next 16 αποδίδει τα URL των SSR assets αποκλειστικά από το
`assetPrefix` — ο patcher αντιγράφει την υποδιαδρομή σε αυτό), τα ενσωματωμένα
URL των assets `/_next/static` (client-reference manifests, εισαγωγές πολυμέσων, προαποδομένες
σελίδες σφαλμάτων), καθώς και το shim `process.env` του client, πριν εκτελεστεί το
`node dev/run-standalone.mjs`.

### Δημιουργία μέσω Compose (συνιστάται)

Ορίστε και τις δύο μεταβλητές στο `.env` και, στη συνέχεια, δημιουργήστε ξανά το image, ώστε το image και το περιβάλλον εκτέλεσης να συμφωνούν:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Το `docker-compose.yml` προωθεί το `OMNIROUTE_BASE_PATH` τόσο ως build argument του Docker όσο και ως
μεταβλητή περιβάλλοντος εκτέλεσης.

### Προκατασκευασμένο root image + υποδιαδρομή κατά την εκτέλεση

Τα δημοσιευμένα images `diegosouzapw/omniroute:*` έχουν δημιουργηθεί για τη ρίζα του domain. Μπορείτε παρ' όλα αυτά
να ορίσετε το `OMNIROUTE_BASE_PATH` κατά την εκτέλεση· το container εφαρμόζει patch στο πακέτο μία φορά κατά την εκκίνηση.
Συνδυάστε το με την αντίστοιχη δημόσια προέλευση:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Ρυθμίστε τον αντίστροφο διακομιστή μεσολάβησης ώστε να προωθεί την **πλήρη** εξωτερική διαδρομή (μην αφαιρείτε το
πρόθεμα). Το Traefik πρέπει να δρομολογεί το `PathPrefix(`/omniroute`)` προς το container χωρίς
`StripPrefix`, ώστε το Next.js να λαμβάνει `/omniroute/...` και να σερβίρει assets από το
`/omniroute/_next/...`.

Το healthcheck του Docker ελέγχει το ελαφρύ endpoint κύκλου ζωής `/healthz`, με πρόθεμα
το ενεργό `OMNIROUTE_BASE_PATH`. Το `/api/monitoring/health` παραμένει διαθέσιμο για
διαγνωστικούς ελέγχους από χρήστες ή dashboards· για να κατευθύνετε ξανά το HEALTHCHECK του container σε αυτό (για παράδειγμα,
για επιβολή ενδελεχούς ελέγχου υγείας), ορίστε `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Αυτή η διαδρομή αποτελεί **ενδελεχή** έλεγχο (DB + σύνοψη παρακολούθησης) — κατάλληλο για το
αραιό `HEALTHCHECK` του Docker, εάν επιλέξετε να το ενεργοποιήσετε ξανά, αλλά **όχι** για τα χρονικά διαστήματα του
`livenessProbe` στο Kubernetes.

Για orchestrators (Kubernetes, Nomad κ.λπ.):

| Έλεγχος              | Προτιμήστε                                                           | Αποφύγετε                                                                   |
| -------------------- | -------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Liveness             | HTTP `GET /livez` ή TCP στην κύρια θύρα (`PORT`, προεπιλογή `20128`) | Το `/api/monitoring/health` ως έλεγχο liveness                              |
| Readiness            | HTTP `GET /healthz`                                                  | Αυστηρά χρονικά όρια που θεωρούν έναν απασχολημένο βρόχο συμβάντων ως νεκρό |
| Ενδελεχής / blackbox | `/api/monitoring/health`                                             | —                                                                           |

Το `/healthz` αναφέρει την κατάσταση του κύκλου ζωής της διεργασίας (`ok` / `starting` / `stopping`). Το `/livez` ελέγχει
μόνο αν η διεργασία είναι ενεργή (200 όποτε μπορεί να εκτελεστεί ο handler· δεν περιμένει την
ετοιμότητα). Και τα δύο εξακολουθούν να εκτελούνται στον ίδιο βρόχο συμβάντων του Node με την επεξεργασία αιτημάτων, επομένως
οι εργασίες καταλόγου ή συμπίεσης που δεσμεύουν τη CPU μπορούν να τα καθυστερήσουν — απασχολημένο ≠ νεκρό. Προτιμήστε TCP
liveness εάν λήγει το χρονικό όριο των ελέγχων HTTP. Πλήρεις οδηγίες για τους ελέγχους:
[Οδηγός παρακολούθησης — προτάσεις ελέγχων Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose με Caddy (Αυτόματο TLS για HTTPS)

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
      # Προέλευση που είναι ορατή από το πρόγραμμα περιήγησης για επανακλήσεις OAuth, συνδέσμους του dashboard και δημόσια URL που δημιουργούνται.
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
`NEXT_PUBLIC_BASE_URL` ως την κανονική δημόσια προέλευση για τις επανακλήσεις OAuth και τους δημόσιους
συνδέσμους που δημιουργούνται· οι πιστοποιημένες εγγραφές του dashboard χρησιμοποιούν αιτήματα ίδιας προέλευσης μαζί με προστασία CSRF
συνδεδεμένη με τη συνεδρία. Ενεργοποιήστε το `OMNIROUTE_TRUST_PROXY` μόνο για προηγμένες εγκαταστάσεις στις οποίες θέλετε σκόπιμα
το OmniRoute να προσδιορίζει τη δημόσια προέλευση από αξιόπιστες προωθημένες κεφαλίδες αντί για ρητή
διαμόρφωση.

## Cloudflare Quick Tunnel

Η υποστήριξη του dashboard για εγκαταστάσεις Docker περιλαμβάνει ένα **Cloudflare Quick Tunnel** με ένα κλικ στη διαδρομή `Dashboard → Endpoints`. Κατά την πρώτη ενεργοποίηση, γίνεται λήψη του `cloudflared` μόνο όταν απαιτείται, εκκινείται ένα προσωρινό tunnel προς το τρέχον endpoint `/v1` και εμφανίζεται το URL `https://*.trycloudflare.com/v1` που δημιουργήθηκε ακριβώς κάτω από το κανονικό δημόσιο URL σας.

Τα πάνελ tunnel των endpoint (Cloudflare, Tailscale, ngrok) μπορούν να εμφανίζονται ή να αποκρύπτονται από τη διαδρομή `Settings → Appearance`, χωρίς να αλλάζει η κατάσταση των ενεργών tunnel.

### Σημειώσεις για τα tunnel

- Τα URL των Quick Tunnel είναι προσωρινά και αλλάζουν έπειτα από κάθε επανεκκίνηση.
- Τα Quick Tunnel δεν επαναφέρονται αυτόματα έπειτα από επανεκκίνηση του OmniRoute ή του container. Ενεργοποιήστε τα ξανά από το dashboard όταν χρειάζεται.
- Η διαχειριζόμενη εγκατάσταση υποστηρίζει επί του παρόντος Linux, macOS και Windows σε `x64` / `arm64`.
- Τα διαχειριζόμενα Quick Tunnel χρησιμοποιούν από προεπιλογή μεταφορά HTTP/2, ώστε να αποφεύγονται οι θορυβώδεις προειδοποιήσεις για την ενδιάμεση μνήμη UDP του QUIC σε περιορισμένα περιβάλλοντα container. Ορίστε `CLOUDFLARED_PROTOCOL=quic` ή `auto` εάν θέλετε διαφορετικό πρωτόκολλο μεταφοράς.
- Τα Docker images περιλαμβάνουν τις ρίζες CA του συστήματος και τις μεταβιβάζουν στο διαχειριζόμενο `cloudflared`, αποφεύγοντας έτσι αποτυχίες εμπιστοσύνης TLS όταν το tunnel αρχικοποιείται μέσα στο container.
- Ορίστε `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` εάν θέλετε το OmniRoute να χρησιμοποιήσει ένα υπάρχον εκτελέσιμο αρχείο αντί να πραγματοποιήσει λήψη του.

## Ετικέτες image

| Image                    | Ετικέτα  | Μέγεθος | Περιγραφή                                                            |
| ------------------------ | -------- | ------- | -------------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Υψηλότερη **δημοσιευμένη** σταθερή έκδοση SemVer (όχι το git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Καρφιτσώστε αυτήν την κατηγορία ετικέτας για GitOps                  |

Manifest πολλαπλών πλατφορμών: εγγενή `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Το Docker επιλέγει αυτόματα την κατάλληλη αρχιτεκτονική· περάστε `--platform linux/amd64` εάν χρειάζεται να επιβάλετε εξομοίωση AMD64 σε host ARM.

### Κανάλια κυκλοφορίας

Το OmniRoute δημοσιεύει ξεχωριστά κανάλια Docker για σταθερές εκδόσεις, δοκιμές στον ενεργό κλάδο κυκλοφορίας και εκδόσεις ανάπτυξης.

| Κανάλι                          | Πηγή                                             | Δυνατότητα μεταβολής                | Συνιστώμενη χρήση                                                                                                                                      |
| ------------------------------- | ------------------------------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Υπογεγραμμένη/εκδοσιοποιημένη κυκλοφορία         | Αμετάβλητο                          | Εγκαταστάσεις παραγωγής που καρφιτσώνουν μια ακριβή έκδοση                                                                                             |
| `:latest` / `:latest-web`       | Υψηλότερη **δημοσιευμένη** σταθερή έκδοση SemVer | Μεταβλητός δείκτης σταθερής έκδοσης | Ακολουθεί τις σταθερές εκδόσεις **μετά** από μια εργασία δημοσίευσης SemVer — **δεν** παρακολουθεί το `main` ή μη δημοσιευμένα commit του `release/v*` |
| `:next` / `:next-web`           | Τρέχων προεπιλεγμένος κλάδος `release/v*`        | Μεταβλητός δείκτης προέκδοσης       | Δοκιμή διορθώσεων που έχουν ενσωματωθεί στον ενεργό κλάδο κυκλοφορίας, αλλά δεν περιλαμβάνονται ακόμη σε σταθερή έκδοση                                |
| `:main` / `:main-web`           | Κλάδος `main`                                    | Μεταβλητός δείκτης ανάπτυξης        | Μόνο για ανάπτυξη και δοκιμές ενσωμάτωσης                                                                                                              |

#### Πάροχοι διαδικτυακών συνεδριών: τα image `-web`

Κάθε παραπάνω κανάλι διατίθεται επίσης ως ετικέτα `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), η οποία δημιουργείται από το στάδιο `runner-web` — το ίδιο image μαζί με το Playwright και ένα πρόγραμμα περιήγησης Chromium. Το απλό image διατίθεται **χωρίς** Chromium· τα `gemini-web`, `claude-web` και `claude-turnstile` το χρειάζονται.

Η αποτυχία αναβάλλεται και δεν συμβαίνει κατά την εκκίνηση: αυτοί οι πάροχοι παραθέτουν τα μοντέλα τους και εμφανίζονται ως συνδεδεμένοι στο dashboard, ενώ μόνο το πρώτο αίτημα αποτυγχάνει με

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Εάν χρησιμοποιείτε αυτούς τους παρόχους, πραγματοποιήστε λήψη της ετικέτας `-web` του καναλιού στο οποίο βρίσκεστε ήδη — τίποτα άλλο δεν αλλάζει. Σε εγκατάσταση npm/CLI (χωρίς Docker image), το αντίστοιχο στοιχείο που λείπει είναι το εκτελέσιμο αρχείο του προγράμματος περιήγησης: εκτελέστε `npx playwright install chromium` στον host.

#### Χρήση του καναλιού προέκδοσης

Το κανάλι `next` ανακατασκευάζεται σε κάθε push στον τρέχοντα προεπιλεγμένο κλάδο `release/v*` και δημοσιεύεται τόσο για AMD64 όσο και για ARM64. Οι παλαιότεροι κλάδοι συντήρησης δεν μπορούν να το αντικαταστήσουν. Το κανάλι παρέχει μια εικόνα που μπορεί να ληφθεί για διορθώσεις που έχουν συγχωνευτεί στον ενεργό κλάδο έκδοσης πριν δημιουργηθεί η επόμενη σταθερή ετικέτα.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Για το Docker Compose, παρακάμψτε την ετικέτα εικόνας που χρησιμοποιείται από το επιλεγμένο προφίλ και, στη συνέχεια, πραγματοποιήστε λήψη και αναδημιουργήστε την υπηρεσία:

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

Το `next` είναι ένα μεταβαλλόμενο κανάλι προέκδοσης. Μπορεί να αλλάξει με οποιοδήποτε push στον ενεργό κλάδο έκδοσης και **δεν υποστηρίζεται για χρήση σε παραγωγή**. Καρφιτσώστε το digest της εικόνας κατά την αξιολόγηση μιας συγκεκριμένης έκδοσης:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Πριν από τη δοκιμή, δημιουργήστε αντίγραφο ασφαλείας του τόμου δεδομένων του OmniRoute ή του προσαρτημένου μέσω bind καταλόγου δεδομένων. Για επαναφορά, επαναφέρετε τη σταθερή έκδοση ή το digest που χρησιμοποιούνταν προηγουμένως και αναδημιουργήστε το container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Μια κατασκευή από κλάδο έκδοσης δεν μπορεί ποτέ να μετακινήσει το `latest`· μόνο μια κατάλληλη σταθερή σημασιολογική έκδοση μπορεί να προωθήσει τον δείκτη της σταθερής έκδοσης. Οι εικόνες `next` διατηρούν τον έλεγχο της εικόνας έκδοσης και την πύλη αποκλεισμού για ευπάθειες CRITICAL.

**Το `latest` δεν αποτελεί εγγύηση επικαιρότητας σε σχέση με το git.** Οι συγχωνευμένες διορθώσεις στο `main` ή στον ενεργό κλάδο `release/v*` **δεν** περιλαμβάνονται στο `:latest` έως ότου δημοσιευτεί μια σταθερή εικόνα SemVer και η εργασία δημοσίευσης προωθήσει το `:latest` (με το ίδιο digest με εκείνη τη SemVer). Αν το `latest` φαίνεται παγωμένο ενώ το GitHub εμφανίζει ήδη τη διόρθωση, κάντε pull το `:next` για να δοκιμάσετε τον κλάδο έκδοσης ή περιμένετε την ετικέτα SemVer.

| Τι θέλετε                                                                               | Χρησιμοποιήστε                                    |
| --------------------------------------------------------------------------------------- | ------------------------------------------------- |
| GitOps / παραγωγή που δεν πρέπει να αποκλίνει                                           | Καρφιτσώστε το `:X.Y.Z` (ή το digest της εικόνας) |
| Παρακολούθηση δημοσιευμένων σταθερών εκδόσεων και αποδοχή αναδημιουργίας σε κάθε έκδοση | `:latest`                                         |
| Δοκιμή μη δημοσιευμένων commits του `release/v*`                                        | `:next` (όχι για παραγωγή)                        |
| Δοκιμή του `main`                                                                       | `:main` (όχι για παραγωγή)                        |

## Διαθεσιμότητα: το προεπιλεγμένο SQLite υποστηρίζει ένα μόνο αντίγραφο

Η τυπική εγκατάσταση Docker / Kubernetes του OmniRoute είναι **μία διεργασία Node + ένας εγγραφέας SQLite**. Η υψηλή διαθεσιμότητα **δεν υποστηρίζεται** σε αυτήν την τοπολογία.

| Περιορισμός                                                     | Συνέπεια                                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ένας εγγραφέας                                                  | **Μην** εκτελείτε πολλαπλά αντίγραφα με το ίδιο αρχείο SQLite. Αυτό προκαλεί καταστροφή της βάσης δεδομένων.                                                                                                                                                                                                                                                                           |
| Επαναδημιουργία / επανεκκίνηση / τερματισμός από το HEALTHCHECK | **Πλήρης διακοπή λειτουργίας** των ενεργών συνδέσεων SSE, των συνεδριών του πίνακα ελέγχου και της κατάστασης στη μνήμη. Κάθε συνδεδεμένος πελάτης αποσυνδέεται. Τα νέα αιτήματα κατά το διάστημα χωρίς endpoint λαμβάνουν από τον reverse proxy **`502 Bad Gateway: Unknown error`**, όχι JSON του OmniRoute — οι πελάτες δεν μπορούν να το διακρίνουν από αποτυχία παρόχου (#11015). |
| Ίδιο event loop με το `/healthz`                                | Ένας απασχολημένος κύκλος καταλόγου ή συμπίεσης μπορεί να καθυστερήσει τα probes· ένα σύντομο timeout επανεκκινεί τότε το **μοναδικό** αντίγραφο.                                                                                                                                                                                                                                      |

**Πίνακας probes** (δείτε επίσης τις [συστάσεις για Kubernetes probes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe                    | Στόχος                                                         | Να μη χρησιμοποιείται                                         |
| ------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------- |
| Liveness                 | TCP στο `PORT` (προεπιλογή `20128`) ή ελαστικό HTTP `/healthz` | `/api/monitoring/health`                                      |
| Readiness                | HTTP `GET /healthz`                                            | Αυστηρά timeout που θεωρούν ένα απασχολημένο event loop νεκρό |
| Βαθύς έλεγχος / άνθρωποι | `/api/monitoring/health`                                       | Αυτοματοποιημένο liveness του kubelet                         |

**Αναβαθμίσεις:** αναμένετε ότι κάθε συνεδρία θα διακοπεί. Αποστραγγίστε τους πελάτες, εάν μπορείτε· δεν υπάρχει rolling update με το προεπιλεγμένο SQLite. Ο συνδυασμός Compose `restart: unless-stopped` και Docker `HEALTHCHECK` θα αντικαταστήσει επίσης τη μοναδική διεργασία όταν το container είναι σε κατάσταση Unhealthy — με την ίδια έκταση επιπτώσεων.

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

Η αναμονή του `preStop` επιτρέπει στο kube να αφαιρέσει τα Service endpoints πριν από το SIGTERM, ώστε η **νέα** κίνηση να σταματήσει να κατευθύνεται στη διεργασία που τερματίζεται. Τα ενεργά SSE του `/v1/responses` αποστραγγίζονται για έως και `SHUTDOWN_TIMEOUT_MS` (προεπιλογή 30s) μέσω βαρέων admission leases (#11015). Τα νέα αιτήματα που εξακολουθούν να φτάνουν στη διεργασία λαμβάνουν `503` + `Retry-After: 5`. Το διάστημα χωρίς endpoint κατά το Recreate, έως ότου το αντικατάστατο είναι Ready, παραμένει πλήρης διακοπή λειτουργίας — αυτό οφείλεται στην τοπολογία SQLite και όχι σε εσφαλμένη ρύθμιση κάποιου probe.

Το εξωτερικό Postgres / HA πολλαπλών εγγραφέων **δεν** αποτελεί τεκμηριωμένη τυπική διαδρομή. Εάν χρειάζεστε HA, διατηρήστε ένα μόνο αντίγραφο ή χρησιμοποιήστε μια τοπολογία την οποία το έργο έχει δοκιμάσει και τεκμηριώσει ξεχωριστά. Η εργασία για Postgres/MySQL βρίσκεται στο [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Μέχρι να κυκλοφορήσει, ο μόνος υποστηριζόμενος τρόπος πολλαπλασιασμού της χωρητικότητας για **μεγάλα** `/v1/responses` είναι N ανεξάρτητες διεργασίες (επόμενη ενότητα), όχι `replicas > 1` σε έναν τόμο.

## Οριζόντια κλιμάκωση: N ανεξάρτητες διεργασίες

Μία διεργασία Node είναι **ένας σωρός V8**. Δύο επικαλυπτόμενα αιτήματα προγραμματιστικού πράκτορα `POST /v1/responses` μεγέθους ~3 MiB / ~750k token (RTK + Caveman) προκαλούν τερματισμό αυτού του σωρού περίπου στα 12 Gi (`FATAL ERROR: Reached heap limit`) και μπορούν να προκαλέσουν OOM σε ένα cgroup 16 Gi. Δείτε το [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Αυτή η μέτρηση αποτελεί προειδοποίηση για τον **προϋπολογισμό μνήμης** και όχι ένα αυστηρό μέγιστο όριο προϊόντος δύο ταυτόχρονων μακρόχρονων `/v1/responses`. Η αποδοχή απαιτητικών συνομιλιών ελέγχεται από έναν αυτόματα υπολογιζόμενο προϋπολογισμό byte εισόδου (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), διαστασιολογημένο με βάση το ίδιο όριο V8/cgroup — η αύξησή του μέσω παράκαμψης (ή ο ορισμός του παλαιού ορίου πλήθους αιτημάτων `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) σε μια ήδη διαστασιολογημένη διεργασία επαναφέρει τον κίνδυνο τερματισμού. Οι μικρές συνομιλίες, τα `/healthz`, `/v1/models` και το MCP **δεν** περιλαμβάνονται σε αυτό το όριο.

### Μία διεργασία: περισσότερα από δύο μακρόχρονα `/v1/responses`

Μια **υγιής** διεργασία (με σωρό κάτω από το `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, προεπιλογή `0.75`) **μπορεί** να εκτελεί περισσότερα από δύο ταυτόχρονα μακρόχρονα `POST /v1/responses`, όταν υπάρχει ακόμη διαθέσιμος χώρος στον προϋπολογισμό byte αιτημάτων σε εξέλιξη για ολόκληρη τη διεργασία (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Τα σώματα αιτημάτων μεγέθους ίσου ή μεγαλύτερου από `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (προεπιλογή 256 KiB) λαμβάνουν την ίδια μίσθωση βαρέος φόρτου με τα αιτήματα σύνθετης δομής και χρησιμοποιούν την ίδια οδό διαφυγής `tryAcquireHealthyHeadroom` του [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Οι δεκάδες ταυτόχρονοι μακρόχρονοι πελάτες SSE (οι διαχειριστές συχνά χρειάζονται 40–50) είναι ζήτημα **προϋπολογισμού μνήμης** — διαστασιολογήστε τον σωρό, τις κύριες/εφεδρικές θέσεις και το `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — και όχι ένα αυστηρό όριο προϊόντος «έως 2». Ένας σωρός υπό πίεση συνεχίζει να απορρίπτει αιτήματα με επαναλήψιμο `503`, ώστε να μην επανεμφανιστεί το #7849.

Για να **πολλαπλασιάσετε τους σωρούς** (ανεξάρτητοι old-spaces του V8) **σήμερα**:

| Κάντε                                                                                                                                                                                                              | Μην κάνετε                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Εκτελέστε **N container/pod**, καθένα με το **δικό του** `DATA_DIR` / volume                                                                                                                                       | Ορίσετε `replicas > 1` για ένα αρχείο SQLite                                                    |
| Διαστασιολογήστε τα βαρέα αιτήματα σε εξέλιξη και τον υγιή εφεδρικό χώρο βάσει του προϋπολογισμού σωρού / byte σε εξέλιξη· το 1–2 είναι η συντηρητική προεπιλογή του #7849, όχι ένα αυστηρό μέγιστο όριο προϊόντος | Δώσετε σε μία διεργασία 8× RAM και απεριόριστο όριο πλήθους                                     |
| Προαιρετικά: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` για **κοινόχρηστους μετρητές ορίων χρήσης**                                                                                                      | Αντιμετωπίσετε το Redis ως κοινόχρηστο SQLite — δεν είναι                                       |
| Αντιγράψτε τα μυστικά των παρόχων σε κάθε instance (ή αποδεχτείτε κατατμημένους πίνακες ελέγχου)                                                                                                                   | Αναμένετε έναν ενιαίο πίνακα ελέγχου / ένα ενιαίο αρχείο καταγραφής κλήσεων για όλα τα instance |
| Τοποθετήστε μπροστά οποιονδήποτε εξισορροπητή φορτίου· η σταθερή δρομολόγηση βάσει κλειδιού API ή περιόδου σύνδεσης αρκεί                                                                                          | Απαιτείτε middleware συγκεκριμένου προμηθευτή με επίγνωση μεγέθους                              |

Υλικό: ο αριθμός των ταυτόχρονων μακρόχρονων `/v1/responses` ανά instance είναι ζήτημα **προϋπολογισμού μνήμης** (σωρός + byte σε εξέλιξη / #10110). Τα `N` ανεξάρτητα `DATA_DIR` εξακολουθούν να πολλαπλασιάζουν τους σωρούς: η RAM του host πρέπει να καλύπτει `N × cgroup`, όχι «ένα pod 16 Gi με N=8». Μην χρησιμοποιείτε ποτέ `replicas > 1` σε ένα αρχείο SQLite.

Ενδεικτική διαμόρφωση Compose (δύο σωροί, δύο volume — όχι `deploy.replicas: 2`):

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

Η πυκνότητα εντός διεργασίας (με τη συμπίεση εκτός του απομονωμένου περιβάλλοντος HTTP) παρακολουθείται στο [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Ένα λογικό cluster σε κοινόχρηστη μόνιμη κατάσταση παρακολουθείται στο [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Περιφερειακά σφάλματα του Gemini μέσα στο Docker

Το Google AI Studio / Gemini API μπορεί να επιστρέψει HTTP 400 με FAILED_PRECONDITION και
`User location is not supported for the API use.` Ένα επιτυχημένο αίτημα στον κεντρικό υπολογιστή
δεν αποδεικνύει ότι το κοντέινερ χρησιμοποιεί την ίδια διαδρομή εξερχόμενης κίνησης. Η σειρά DNS,
η συνδεσιμότητα IPv4/IPv6, η δρομολόγηση VPN και οι διαμορφωμένοι διακομιστές μεσολάβησης μπορεί να διαφέρουν. Ελέγξτε
τις [υποστηριζόμενες περιοχές της Google](https://ai.google.dev/gemini-api/docs/available-regions),
καθώς και την πραγματική διαδρομή σύνδεσης· αυτό το σφάλμα από μόνο του δεν υποδεικνύει μη έγκυρο κλειδί API.

### Προτιμήστε έναν διακομιστή μεσολάβησης ανά σύνδεση

Χρησιμοποιήστε τη [διαμόρφωση διακομιστή μεσολάβησης ανά σύνδεση](../ops/PROXY_GUIDE.md#4-level-proxy-system)
του OmniRoute για την επηρεαζόμενη σύνδεση Gemini και, στη συνέχεια, επαναλάβετε το **Test Connection** και ένα μικρό αίτημα
με το ίδιο μοντέλο. Έτσι, η αλλαγή δρομολόγησης περιορίζεται στη συγκεκριμένη σύνδεση. Επαληθεύστε
ότι ο διακομιστής μεσολάβησης είναι προσβάσιμος από το κοντέινερ και ότι η σύνδεση πράγματι τον επιλέγει.
Η αλλαγή της διαδρομής δεν εγγυάται την περιφερειακή επιλεξιμότητα στην υπηρεσία προέλευσης.

### Συγκρίνετε τη δικτύωση κεντρικού υπολογιστή και κοντέινερ

Διατηρήστε πανομοιότυπα το κλειδί, το μοντέλο και το αίτημα κατά τη σύγκριση αποτελεσμάτων με έλεγχο ταυτότητας· μην
επικολλάτε ποτέ διαπιστευτήρια, κωδικούς πρόσβασης διακομιστών μεσολάβησης ή πλήρεις κεφαλίδες εξουσιοδότησης σε ένα ζήτημα.
Αρχικά, ελέγξτε ποιες οικογένειες διευθύνσεων παρέχει η υπηρεσία επίλυσης του λειτουργικού συστήματος, χρησιμοποιώντας την ίδια εντολή
στον κεντρικό υπολογιστή και μέσα στο κοντέινερ:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Αντικαταστήστε το `omniroute` με την υπηρεσία που εκτελείτε (για παράδειγμα, `omniroute-web`). Αυτές
οι εντολές εμφανίζουν οικογένειες διευθύνσεων χωρίς διαπιστευτήρια ή διευθύνσεις IP. Η επιστροφή του `6`
δείχνει μόνο ένα αποτέλεσμα DNS IPv6: **δεν** αποδεικνύει ότι υπάρχει λειτουργική διαδρομή IPv6 ή πρόσβαση στο API.
Όπου είναι εγκατεστημένο το `curl`, συγκρίνετε το `curl -4 -I https://generativelanguage.googleapis.com`
με το `curl -6 -I https://generativelanguage.googleapis.com` και στα δύο περιβάλλοντα.
Μια απόκριση HTTP αποδεικνύει συνδεσιμότητα για τη συγκεκριμένη δοκιμή, ακόμη και αν πρόκειται για σφάλμα χωρίς έλεγχο ταυτότητας·
μόνο το αίτημα προς το μοντέλο με έλεγχο ταυτότητας ελέγχει την επιλεξιμότητα για το Gemini.

### Εναλλακτική λύση σε επίπεδο κεντρικού υπολογιστή: λειτουργικό IPv6 και πολιτική επίλυσης

Το άτομο που υπέβαλε το [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) επανέφερε
την πρόσβαση στο περιβάλλον του ενεργοποιώντας το IPv6 για τα κοντέινερ και αλλάζοντας την επιλογή
διευθύνσεων του glibc. Αντιμετωπίστε το ως εναλλακτική λύση που εξαρτάται από το συγκεκριμένο περιβάλλον. Επιβεβαιώστε ότι λειτουργούν
το IPv6 του κεντρικού υπολογιστή, η εξερχόμενη κίνηση/δρομολόγηση του κοντέινερ και οι κανόνες του τείχους προστασίας πριν προσαρμόσετε τις προτιμήσεις της υπηρεσίας επίλυσης.
Μια ιδιωτική διεύθυνση ULA από μόνη της δεν αποδεικνύει δημόσια συνδεσιμότητα IPv6.

Για υπηρεσίες που είναι ήδη συνδεδεμένες στο προεπιλεγμένο δίκτυο του Compose, αυτό το απόσπασμα ενεργοποιεί
το IPv6 σε εκείνο το δίκτυο· διατηρήστε τις υπόλοιπες ρυθμίσεις της υπηρεσίας, τις θύρες, τους τόμους και τη διαμόρφωσή σας:

```yaml
networks:
  default:
    enable_ipv6: true
```

Για ένα δίκτυο με όνομα, ενεργοποιήστε το στο δίκτυο στο οποίο συνδέεται πραγματικά η υπηρεσία. Το Docker μπορεί
να εκχωρήσει ένα υποδίκτυο ULA· επιλέξτε ένα ρητά καθορισμένο υποδίκτυο που δεν επικαλύπτεται μόνο όταν το απαιτεί το δίκτυό σας.
Δείτε τις ενότητες [Δικτύωση IPv6 του Docker](https://docs.docker.com/engine/daemon/ipv6/)
και [Επιλογές δικτύου του Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Σε μια **εικόνα βασισμένη στο glibc**, το `/etc/gai.conf` μπορεί να αλλάξει την επιλογή διευθύνσεων. Το Dockerfile
του τρέχοντος αποθετηρίου χρησιμοποιεί Debian· οι προσαρμοσμένες εικόνες που βασίζονται στο musl δεν χρησιμοποιούν αυτόν τον μηχανισμό.
Η προσαρμογή που αναφέρθηκε αλλάζει την ετικέτα ULA από `label fc00::/7 6` σε
`label fc00::/7 1`. Ξεκινήστε από τον πλήρη πίνακα πολιτικής της εικόνας και διατηρήστε τις υπόλοιπες
καταχωρίσεις του: η προσθήκη μιας καταχώρισης `label` ή `precedence` αντικαθιστά αυτόν τον προεπιλεγμένο πίνακα, επομένως ένα αρχείο
που περιέχει μόνο την τροποποιημένη γραμμή δεν επαρκεί. Η
[αναφορά διαμόρφωσης του glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
τεκμηριώνει αυτήν τη συμπεριφορά. Προσαρτήστε με bind mount το ελεγμένο αρχείο ως μόνο για ανάγνωση στη διαδρομή `/etc/gai.conf`
και αναδημιουργήστε την υπηρεσία για να εφαρμοστεί.

Αυτό αλλάζει την επιλογή διευθύνσεων του λειτουργικού συστήματος για **όλη την εξερχόμενη κίνηση σε αυτό το κοντέινερ**.
Δεν αναγκάζει κάθε εφαρμογή να επιλέγει IPv6: η σειρά DNS και η επιλογή
σύνδεσης του Node παίζουν επίσης ρόλο. Ειδικότερα, το `--dns-result-order=ipv4first` προτιμά το IPv4 και
δεν αποτελεί λύση για μια αποτυχία που αφορά μόνο το IPv4. Δείτε τη [σειρά DNS του Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Επαναλάβετε τις δοκιμές του Gemini και των άλλων παρόχων σας μετά από οποιαδήποτε αλλαγή σε επίπεδο κεντρικού υπολογιστή. Για επαναφορά,
καταργήστε την προσαρμοσμένη προσάρτηση του `gai.conf`, επαναφέρετε την προηγούμενη διαμόρφωση δικτύου και
αναδημιουργήστε την επηρεαζόμενη υπηρεσία/το επηρεαζόμενο δίκτυο κατά τη διάρκεια ενός χρονικού παραθύρου συντήρησης. Η αναδημιουργία ενός δικτύου
μπορεί να διακόψει άλλα κοντέινερ που είναι συνδεδεμένα σε αυτό· μη διαγράψετε τον τόμο μόνιμων δεδομένων.

## Σημαντικές Σημειώσεις

- **Λειτουργία WAL του SQLite:** Θα πρέπει να επιτρέπετε στην εντολή `docker stop` να ολοκληρώνεται, ώστε το OmniRoute να μπορεί να καταγράφει τις πιο πρόσφατες αλλαγές πίσω στο `storage.sqlite` μέσω checkpoint. Τα παρεχόμενα αρχεία Compose ορίζουν ήδη περίοδο χάριτος 40s για τη διακοπή. Εάν εκτελείτε απευθείας την εικόνα, διατηρήστε την επιλογή `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Ορίστε το σε `true` εάν η διαχείριση των τακτικών αντιγράφων ασφαλείας και των αντιγράφων πριν από εγγραφές γίνεται εξωτερικά. Οι μετεγκαταστάσεις υφιστάμενων βάσεων δεδομένων εξακολουθούν να απαιτούν το δικό τους ανθεκτικό στιγμιότυπο ασφαλείας και μηχανισμό προστασίας για μαζικές μετεγκαταστάσεις.
- **Μόνιμη Αποθήκευση Δεδομένων:** Προσαρτάτε πάντα έναν τόμο στο `/app/data`, ώστε η βάση δεδομένων, τα κλειδιά και οι διαμορφώσεις σας να διατηρούνται μεταξύ των επανεκκινήσεων του κοντέινερ.
- **Διαμόρφωση Θύρας:** Παρακάμψτε τη μεταβλητή περιβάλλοντος `PORT` για να αλλάξετε την προεπιλεγμένη θύρα `20128`.

## Δείτε Επίσης

- [Οδηγός Ανάπτυξης σε VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Ρύθμιση VM + nginx + Cloudflare
- [Οδηγός Ανάπτυξης στο Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Ανάπτυξη στο Fly.io
- [Διαμόρφωση Περιβάλλοντος](../reference/ENVIRONMENT.md) — Πλήρης αναφορά `.env`
