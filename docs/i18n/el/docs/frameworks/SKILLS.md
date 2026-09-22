# Skills Framework (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Πηγή αλήθειας:** `src/lib/skills/` και `src/app/api/skills/`
> **Τελευταία ενημέρωση:** 2026-06-28 — v3.8.40

Το OmniRoute παρέχει ένα επεκτάσιμο πλαίσιο Skills που επιτρέπει στα γλωσσικά μοντέλα (και στους χειριστές) να συνθέτουν επαναχρησιμοποιήσιμες δυνατότητες — από την ανάγνωση του συστήματος αρχείων και τα αιτήματα HTTP μέχρι την εκτέλεση κώδικα σε απομονωμένο περιβάλλον και επιλεγμένα skills από το marketplace.

Ένα skill είναι μια μονάδα εργασίας με εκδόσεις και ορισμό μέσω σχήματος. Το OmniRoute μπορεί να εισάγει skills ως ορισμούς εργαλείων στα εξερχόμενα αιτήματα, να αναχαιτίζει τις κλήσεις εργαλείων που επιστρέφονται από το μοντέλο, να εκτελεί τον αντίστοιχο χειριστή και να τροφοδοτεί το αποτέλεσμα ξανά στο μοντέλο, ώστε η συνομιλία να μπορεί να συνεχιστεί. Το μοντέλο δεν βλέπει ποτέ την υλοποίηση — μόνο τη διεπαφή του εργαλείου.

---

## Agent Skills έναντι Omni Skills

Το OmniRoute διαθέτει δύο διακριτά αλλά συμπληρωματικά συστήματα skills:

| Διάσταση              | **Omni Skills** (το παρόν έγγραφο)                                              | **Agent Skills**                                                                               |
| :-------------------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| Σκοπός                | Εισαγωγή εργαλείων LLM + εκτέλεση σε απομονωμένο περιβάλλον                     | Κατάλογος SKILL.md για εντοπισμό και χρήση από εξωτερικούς agents                              |
| Πηγή αλήθειας         | `src/lib/skills/` + marketplace                                                 | `src/lib/agentSkills/` + κατάλογος `skills/`                                                   |
| Λειτουργία εκτέλεσης  | Εισάγονται στα εξερχόμενα αιτήματα και εκτελούνται σε συμβάντα κλήσης εργαλείων | Στατικός κατάλογος markdown + endpoints εντοπισμού REST/MCP/A2A                                |
| Ποιος το χρησιμοποιεί | Το ίδιο το OmniRoute (συνδυαστική δρομολόγηση, εισερχόμενες κλήσεις LLM)        | Εξωτερικοί agents, πελάτες MCP, ενορχηστρωτές A2A                                              |
| Πλήθος                | Μεταβλητό (καθορίζεται από το marketplace)                                      | 45 καταχωρίσεις καταλόγου (23 API + 21 CLI + 1 διαμόρφωσης)                                    |
| Μορφή                 | `SkillDefinition` με σχήμα εργαλείου + χειριστή                                 | Frontmatter `SKILL.md` + σώμα markdown                                                         |
| Εντοπισμός            | REST `/api/skills/*` + εργαλεία MCP `omniroute_skills_*`                        | REST `/api/agent-skills/*` + εργαλεία MCP `omniroute_agent_skills_*` + A2A `list-capabilities` |

Τα **Omni Skills** αποτελούν τη μηχανή εκτέλεσης — ορίζουν τι _μπορεί να κάνει_ το OmniRoute όταν ένα LLM καλεί ένα εργαλείο.

Τα **Agent Skills** αποτελούν τον κατάλογο τεκμηρίωσης — εξηγούν σε εξωτερικούς agents _πώς να χρησιμοποιούν_ το REST API και το CLI του OmniRoute, με δομημένα αρχεία SKILL.md που μπορούν να εισαχθούν απευθείας στα prompts των agents.

Για τον κατάλογο Agent Skills, τη γεννήτρια, τα εργαλεία MCP και το skill A2A, ανατρέξτε στο [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Έννοιες

### Πηγές Skills

Τρεις πηγές skills συνυπάρχουν στο ίδιο μητρώο:

1. **Ενσωματωμένα skills** (`src/lib/skills/builtins.ts`) — παρέχονται μαζί με το OmniRoute. Καλύπτουν τις συνήθεις περιπτώσεις:
   - `file_read`, `file_write` — χώρος εργασίας απομονωμένου περιβάλλοντος ανά κλειδί API στο `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — εξερχόμενο HTTP μέσω του `safeOutboundFetch` με `guard: "public-only"`
   - `web_search` — εναλλάξιμος πάροχος αναζήτησης με προσωρινή αποθήκευση (`executeWebSearch`)
   - `eval_code` — εκτέλεση `node` ή `python` σε απομονωμένο περιβάλλον Docker
   - `execute_command` — εντολή κελύφους σε απομονωμένο περιβάλλον Docker
   - `browser` — βασική υποδομή που υποστηρίζεται από το Playwright, απενεργοποιημένη από προεπιλογή (`builtin/browser.ts`)
2. **SkillsMP** (το Marketplace του OmniRoute) — ανακτώνται από το `https://skillsmp.com/api/v1/skills/search`. Απαιτεί `skillsmpApiKey` στις Ρυθμίσεις.
3. **SkillsSH** (κατάλογος κοινότητας `skills.sh`) — ανακτώνται από το `https://skills.sh/api/search`. Δεν απαιτείται έλεγχος ταυτότητας· το περιεχόμενο SKILL.md λαμβάνεται από το GitHub raw.

Ένας μοναδικός «ενεργός πάροχος» ελέγχει από ποιον κατάλογο πραγματοποιεί εγκαταστάσεις ο πίνακας ελέγχου (`src/lib/skills/providerSettings.ts`). Αλλάξτε τον από τις **Ρυθμίσεις → Μνήμη και Skills**. Προεπιλογή: `skillsmp`.

### Ταυτότητα Skill

Τα skills καταχωρίζονται με κλειδί `name@version` στο μητρώο μνήμης (`src/lib/skills/registry.ts`). Η έκδοση πρέπει να είναι semver (`^\d+\.\d+\.\d+$`). Η `resolveVersion()` υποστηρίζει περιορισμούς `^`, `~`, `>`, `>=`, `<`, `<=`, `==` και ακριβούς αντιστοίχισης.

### Λειτουργία Skill

Κάθε skill διαθέτει μια λειτουργία εκτέλεσης που ελέγχει πότε εισάγεται:

| Λειτουργία | Συμπεριφορά                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------ |
| `on`       | Εισάγεται πάντα ως ορισμός εργαλείου                                                                               |
| `off`      | Δεν εισάγεται ποτέ και δεν μπορεί να εκτελεστεί                                                                    |
| `auto`     | Βαθμολογείται σε σχέση με το εισερχόμενο αίτημα· εισάγεται μόνο εάν η βαθμολογία ≥ `AUTO_MIN_SCORE` (προεπιλογή 3) |

Η λειτουργία `auto` είναι η προεπιλογή για skills που εγκαθίστανται από το marketplace. Τα `enabled=true` και `mode="off"` μαζί σημαίνουν «καταχωρισμένο αλλά ανενεργό» — η εναλλαγή του `enabled` μέσω της παλαιού τύπου στήλης ενημερώνει επίσης το `mode`, ώστε οι παλαιότερες διαδρομές κώδικα να παραμένουν συνεπείς (`src/app/api/skills/[id]/route.ts`).

### Κατάσταση (εκτελέσεις)

Οι εκτελέσεις skills παρακολουθούνται στον πίνακα `skill_executions` με τις ακόλουθες καταστάσεις (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Προσωρινή Μνήμη Μητρώου

Το `SkillRegistry` είναι singleton με προσωρινή μνήμη TTL 60 δευτερολέπτων (`registry.ts:14`). Η `loadFromDatabase()` είναι ιδιοδύναμη και καταργεί τις διπλότυπες ταυτόχρονες κλήσεις μέσω του `pendingLoad`. Κάθε εγγραφή (`register`/`unregister`/`unregisterById`) ακυρώνει την προσωρινή μνήμη. Αναζητήστε εκδόσεις μέσω των `getSkillVersions(name)` και `resolveVersion(name, constraint)`.

### Εισαγωγή με Επίγνωση Παρόχου

Η `injectSkills()` στο `src/lib/skills/injection.ts` είναι το σημείο εισόδου που μετατρέπει τα καταχωρισμένα skills σε ορισμούς εργαλείων ειδικούς για κάθε πάροχο:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Το όνομα του εργαλείου κωδικοποιείται ως `name@version`, ώστε ο χειριστής να μπορεί να επιλέξει τη σωστή έκδοση όταν το μοντέλο το καλέσει ξανά.

### Βαθμολόγηση AUTO

Όταν `mode="auto"`, κάθε υποψήφια δεξιότητα βαθμολογείται σε σχέση με το πλαίσιο του αιτήματος (`scoreAutoSkill()` στο `injection.ts`):

| Σήμα                                                                    | Βαθμοί            |
| ----------------------------------------------------------------------- | ----------------- |
| Το όνομα της δεξιότητας εμφανίζεται αυτούσιο στο πλαίσιο                | +6                |
| Κάθε διακριτικό του ονόματος αντιστοιχεί σε διακριτικό του πλαισίου     | +2                |
| Κάθε υποσυμβολοσειρά ετικέτας αντιστοιχεί στο πλαίσιο                   | +3                |
| Κάθε διακριτικό της περιγραφής αντιστοιχεί στο πλαίσιο                  | +1                |
| Ο λόγος εκτέλεσης στο παρασκήνιο αντιστοιχεί σε διακριτικό του ονόματος | +2 ανά διακριτικό |
| Ο λόγος εκτέλεσης στο παρασκήνιο αντιστοιχεί σε ετικέτα                 | +2 ανά διακριτικό |
| Η υπόδειξη παρόχου στις ετικέτες αντιστοιχεί στον πάροχο του αιτήματος  | +2 / −2           |

Οι κορυφαίες `AUTO_MAX_SKILLS = 5` δεξιότητες με `score >= AUTO_MIN_SCORE = 3` εισάγονται. Οι ισοβαθμίες επιλύονται πρώτα βάσει του `installCount` (φθίνουσα σειρά) και έπειτα βάσει του ονόματος αλφαβητικά (`injection.ts:225-235`).

### Αναχαίτιση κλήσεων εργαλείων

Η `handleToolCallExecution()` στο `src/lib/skills/interception.ts` καλείται από τον χειριστή συνομιλίας αφού ο ανάντη πάροχος επιστρέψει μια απόκριση κλήσης εργαλείου:

1. Η `extractToolCalls()` διαβάζει τις μορφές που είναι συγκεκριμένες για κάθε πάροχο (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Τα ενσωματωμένα ψευδώνυμα εργαλείων (π.χ. `omniroute_web_search` → `web_search`) επιλύονται πρώτα. Οι ενσωματωμένοι χειριστές εκτελούνται επιτόπου.
3. Οτιδήποτε άλλο δρομολογείται μέσω της `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Τα αποτελέσματα ενσωματώνονται ξανά στην απόκριση — στοιχεία `tool_results`, `function_call_output` ή μπλοκ `tool_result` του Anthropic, ανάλογα με την περίπτωση.

Η `customSkillExecutionEnabled` στο πλαίσιο εκτέλεσης μπορεί να οριστεί σε `false`, ώστε να επιτρέπεται μόνο η ενσωματωμένη αναχαίτιση (χρησιμοποιείται από διαδρομές αιτημάτων που απενεργοποιούν ρητά τους χειριστές που έχουν οριστεί από τον χρήστη).

---

## Απομονωμένο περιβάλλον Docker

Οι διαδρομές κώδικα που δεν είναι ενσωματωμένες (`eval_code`, `execute_command`) εκτελούνται μέσα στο Docker μέσω του `SandboxRunner` (`src/lib/skills/sandbox.ts`). Κάθε container εκκινείται με:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (όταν readOnly=true)
```

Προεπιλογές (`SandboxRunner.DEFAULT_CONFIG`):

| Πεδίο            | Προεπιλογή      | Σημειώσεις                                                                   |
| ---------------- | --------------- | ---------------------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Διαιρείται με το 1000 πριν μεταβιβαστεί στο `--cpus`                         |
| `memoryLimit`    | 256 MB          | Αυστηρό όριο                                                                 |
| `timeout`        | 30000 ms        | Ομαλός τερματισμός μέσω `SIGTERM` + `docker kill`                            |
| `networkEnabled` | `false`         | Μετατρέπεται σε `--network none`                                             |
| `readOnly`       | `true`          | Το ριζικό FS είναι μόνο για ανάγνωση· τα `/tmp` και `/workspace` είναι tmpfs |

Τα `SandboxRunner.kill(id)` και `killAll()` εκτίθενται για τερματισμό λειτουργίας· τα εκτελούμενα container παρακολουθούνται στο `runningContainers: Map<string, ChildProcess>`.

### Μεταβλητές περιβάλλοντος του απομονωμένου περιβάλλοντος

Ρυθμίζονται μέσω του `process.env` στο `src/lib/skills/builtins.ts`:

| Μεταβλητή περιβάλλοντος           | Προεπιλογή       | Σκοπός                                                                                                     |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Όριο για τα `file_read` και `file_write`                                                                   |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Όριο για το σώμα απόκρισης του `http_request`                                                              |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Όριο για τα stdout/stderr που επιστρέφονται στον καλούντα                                                  |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Προεπιλεγμένο χρονικό όριο για εντολές στο απομονωμένο περιβάλλον· μέγιστο 60 s                            |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Κεντρικός διακόπτης για εξερχόμενη κίνηση. Ορίστε `1` ή `true` για να επιτρέπεται η ενεργοποίηση ανά κλήση |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (δείτε παρακάτω) | Λίστα επιτρεπόμενων εικόνων Docker, διαχωρισμένων με κόμματα                                               |

Προεπιλεγμένες επιτρεπόμενες εικόνες: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Τυχόν προσθήκες μέσω του `SKILLS_ALLOWED_SANDBOX_IMAGES` συγχωνεύονται με τις προεπιλογές· οι άγνωστες εικόνες απορρίπτονται από το `normalizeImage()`.

> Σημείωση: δεν υπάρχει ξεχωριστή μεταβλητή περιβάλλοντος `SKILLS_EXECUTION_TIMEOUT_MS`. Το χρονικό όριο του χειριστή εκτός απομονωμένου περιβάλλοντος είναι κωδικοποιημένο σταθερά στα 30 s στο `SkillExecutor` (`executor.ts:13`), αλλά μπορεί να παρακαμφθεί κατά την εκτέλεση μέσω του `skillExecutor.setTimeout(ms)`.

### Απομόνωση χώρου εργασίας

Τα `file_read` και `file_write` επιλύουν κάθε διαδρομή σε σχέση με έναν χώρο εργασίας ανά κλειδί API στη θέση `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Η διάσχιση διαδρομής (`..`) και τα απαγορευμένα τμήματα (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) απορρίπτονται πριν από οποιαδήποτε είσοδο/έξοδο στον δίσκο.

### Ενίσχυση ασφάλειας HTTP

`http_request` (`builtins.ts:257`):

- Λίστα επιτρεπόμενων μεθόδων: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Αποκλεισμένες εξερχόμενες κεφαλίδες: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Οι ανακατευθύνσεις είναι απενεργοποιημένες (`allowRedirect: false`)
- Δρομολογείται μέσω του `safeOutboundFetch` με `guard: "public-only"` (οι ιδιωτικές περιοχές διευθύνσεων και οι περιοχές loopback αποκλείονται)
- Η απόκριση περικόπτεται στο `SKILLS_MAX_HTTP_RESPONSE_BYTES`· ο client βλέπει `truncated: true`

---

## Υβριδικός εκτελεστής (προεπισκόπηση)

Το `src/lib/skills/hybrid.ts` ορίζει έναν `HybridExecutor` που επιλέγει μεταξύ εκτέλεσης `direct` (εντός διεργασίας) και `sandbox` ανά κλήση, με μια διαδρομή επανάληψης `autoUpgrade` σε περίπτωση σφαλμάτων χρονικού ορίου ή μνήμης. Οι ενσωματωμένες υλοποιήσεις `directExecutor` / `sandboxRunner` είναι προσωρινά υποκατάστατα (οι `executeDirect`, `executeInSandbox` επιστρέφουν προσωρινά αντικείμενα) — θεωρήστε αυτήν τη μονάδα ως ένα συμβόλαιο υπό κατασκευή. Η πραγματική εκτέλεση εξακολουθεί να πραγματοποιείται μέσω των `skillExecutor` + `SandboxRunner`.

---

## Αποθήκευση

Το σχήμα βρίσκεται σε δύο μεταναστεύσεις:

- `src/lib/db/migrations/016_create_skills.sql` — βασικοί πίνακες `skills` και `skill_executions`, με ευρετήρια στα `(api_key_id, name)` και `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — προσθέτει τα `mode`, `source_provider`, `tags` (JSON), `install_count` στον πίνακα `skills`.

Το `skill_executions.status` περιορίζεται σε επίπεδο βάσης δεδομένων: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Όλα τα τελικά σημεία βρίσκονται κάτω από το `src/app/api/skills/`. Τα τελικά σημεία διαχείρισης (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) απαιτούν **έλεγχο ταυτότητας διαχείρισης** μέσω του `requireManagementAuth()`. Οι ροές marketplace/εγκατάστασης χρησιμοποιούν το ελαφρύτερο `isAuthenticated()` (συνεδρία ή κλειδί API).

| Τελικό σημείο | Μέθοδος | Σκοπός |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Παραθέτει τις καταχωρισμένες δεξιότητες. Υποστηρίζει `?q=`, `?mode=on     | off | auto`, `?source=skillsmp | skillssh | local`, σελιδοποίηση |
| `/api/skills/[id]` | PUT | Ενημερώνει το `enabled` ή το `mode` |
| `/api/skills/[id]` | DELETE | Καταργεί την καταχώριση βάσει αναγνωριστικού |
| `/api/skills/install` | POST | Εγκαθιστά μια προσαρμοσμένη δεξιότητα (κώδικας χειριστή + σχήμα) |
| `/api/skills/marketplace` | GET | Αναζητά στον κατάλογο SkillsMP (επιστρέφει δημοφιλείς προεπιλογές όταν το `q` είναι κενό) |
| `/api/skills/marketplace/install` | POST | Εγκαθιστά μια δεξιότητα SkillsMP (απαιτεί ενεργό πάροχο = `skillsmp`) |
| `/api/skills/skillssh` | GET | Αναζητά στον κατάλογο skills.sh (`?q=&limit=`, με ανώτατο όριο 100) |
| `/api/skills/skillssh/install` | POST | Εγκαθιστά μια δεξιότητα skills.sh (απαιτεί ενεργό πάροχο = `skillssh`) |
| `/api/skills/executions` | GET | Σελιδοποιημένο ιστορικό εκτελέσεων (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Εκτελεί μια καταχωρισμένη δεξιότητα ad hoc |

Το τελικό σημείο `POST /api/skills/executions` επιστρέφει HTTP `503` με `{ error: "Skills execution is disabled..." }` όταν `settings.skillsEnabled === false` (`executor.ts:42-45`). Οι διαχειριστές μπορούν να αλλάξουν τον κεντρικό διακόπτη από τις **Ρυθμίσεις → AI**.

### Παράδειγμα: εγκατάσταση προσαρμοσμένης δεξιότητας

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

Η συμβολοσειρά `handlerCode` είναι μια **αναζήτηση ονόματος χειριστή** — όχι εκτελέσιμος κώδικας. Ο εκτελεστής την αντιστοιχίζει μέσω του `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Οι εγκαταστάσεις από το marketplace αποθηκεύουν το κείμενο SKILL.md σε αυτό το πεδίο ως τεκμηρίωση και δρομολογούν την εκτέλεση μέσω κλήσεων εργαλείων που δημιουργούνται από το μοντέλο. Αυθαίρετος πηγαίος κώδικας που παρέχεται από τον χρήστη δεν υποβάλλεται σε eval.

---

## Εργαλεία MCP

Τέσσερα εργαλεία MCP περιβάλλουν την επιφάνεια δεξιοτήτων (`open-sse/mcp-server/tools/skillTools.ts`). Καταχωρίζονται αυτόματα κατά την εκκίνηση του διακομιστή MCP.

| Εργαλείο                      | Περιγραφή                                                                  |
| ----------------------------- | -------------------------------------------------------------------------- |
| `omniroute_skills_list`       | Παραθέτει δεξιότητες, με προαιρετικά φίλτρα: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Ενεργοποιεί/απενεργοποιεί μια δεξιότητα μέσω `skillId`                     |
| `omniroute_skills_execute`    | Εκτελεί μια δεξιότητα με ωφέλιμο φορτίο εισόδου                            |
| `omniroute_skills_executions` | Πρόσφατο ιστορικό εκτελέσεων (προεπιλογή 50, μέγιστο 100)                  |

Δείτε το [MCP-SERVER.md](./MCP-SERVER.md) για τη ρύθμιση μεταφοράς και τις αναθέσεις εύρους.

---

## Ενσωμάτωση A2A

Το `src/lib/skills/a2a.ts` εξάγει τον περιγραφέα δεξιότητας A2A `memory_aware_routing` και μια βοηθητική συνάρτηση `registerA2ASkill(registry)`. Οι προσαρμοσμένες δεξιότητες A2A βρίσκονται στο `src/lib/a2a/skills/` και δρομολογούνται μέσω του `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Δείτε το [A2A-SERVER.md](./A2A-SERVER.md) για τον πλήρη κύκλο ζωής των εργασιών.

---

## Προσθήκη μιας νέας ενσωματωμένης δεξιότητας

1. **Ορίστε τον χειριστή** στο `src/lib/skills/builtins.ts` (ή σε ένα ομοειδές αρχείο κάτω από το `src/lib/skills/builtin/`). Υπογραφή: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Διαδρομή κώδικα σε sandbox;** Καλέστε `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Χρησιμοποιήστε το `normalizeImage()` σε αντιπαραβολή με τη λίστα επιτρεπόμενων.
3. **Διαδρομή συστήματος αρχείων;** Πάντα να τη διοχετεύετε μέσω του `resolveWorkspacePath(input, context)` πριν από οποιαδήποτε πρόσβαση στον δίσκο.
4. **Κλήση δικτύου;** Χρησιμοποιήστε το `safeOutboundFetch` με `guard: "public-only"`· εξυγιάνετε τις κεφαλίδες μέσω του `sanitizeHeaders()`.
5. **Καταχωρίστε** προσθέτοντας την εγγραφή στο `builtinSkills` (ή καλώντας κάτι αντίστοιχο του `registerBrowserSkill(executor)` κατά την εκκίνηση).
6. **Συνδέστε ψευδώνυμα ενσωματωμένων εργαλείων** (προαιρετικό) στο `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), εάν το ανάντη μοντέλο εκπέμπει διαφορετικό όνομα.
7. **Δοκιμές** στο `src/lib/skills/__tests__/` (Vitest).

---

## Προσθήκη μιας προσαρμοσμένης (μη ενσωματωμένης) δεξιότητας

1. Καταχωρίστε τον χειριστή κατά την εκκίνηση της διεργασίας:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Εισαγάγετε τη δεξιότητα μέσω `POST /api/skills/install` (το πεδίο `handlerCode` πρέπει να αντιστοιχεί στο όνομα του καταχωρισμένου χειριστή).
3. Αλλάξτε το `mode` σε `on` ή `auto` μέσω `PUT /api/skills/[id]`.

---

## Συμβουλές λειτουργίας

- **Κεντρικός διακόπτης:** το `settings.skillsEnabled = false` αποκλείει κάθε εκτέλεση και επιστρέφει HTTP `503` στο `/api/skills/executions`. Το μητρώο συνεχίζει να φορτώνεται.
- **Περιορισμός εξερχόμενης κίνησης:** διατηρήστε το `SKILLS_SANDBOX_NETWORK_ENABLED` μη ορισμένο (προεπιλογή) για πλήρως απομονωμένο sandbox χωρίς πρόσβαση σε δίκτυο. Το `networkEnabled: true` ανά κλήση εξακολουθεί να απαιτεί την κεντρική πύλη.
- **Επιτρέψτε συγκεκριμένες εικόνες:** ορίστε `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` για να επεκτείνετε τη λίστα επιτρεπόμενων.
- **Έλεγχος εκτελέσεων:** τόσο το `/dashboard/skills/executions` όσο και το `omniroute_skills_executions` υποβάλλουν ερωτήματα στο `skill_executions`. Οι επιτυχείς εκτελέσεις περιλαμβάνουν `durationMs`· οι αποτυχίες περιλαμβάνουν `errorMessage`.
- **Ακύρωση κρυφής μνήμης:** καλέστε `skillRegistry.invalidateCache()` μετά από χειροκίνητες αλλαγές στη βάση δεδομένων· διαφορετικά, περιμένετε 60 s.
- **Ανώνυμος χώρος εργασίας:** όταν το `apiKeyId` είναι κενό, όλες οι κλήσεις κατακερματίζονται στον ίδιο χώρο εργασίας `"anonymous"` — ο κώδικας που λαμβάνει υπόψη την κοινή χρήση πρέπει πάντα να διαβιβάζει ένα πραγματικό κλειδί.

---

## Κύκλος Ζωής Εκτέλεσης (v3.8.16+)

Ο `SkillExecutor` (`src/lib/skills/executor.ts`) είναι ένα **singleton** που διαχειρίζεται κάθε κλήση δεξιότητας. Η κατανόηση του κύκλου ζωής του είναι κρίσιμη για την αποσφαλμάτωση χρονικών ορίων, επαναλήψεων και της κατάστασης εκτέλεσης.

### Ο Κύκλος Ζωής 5 Σταδίων

```
   κλήση της execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← σε ουρά, δεν έχει ξεκινήσει ακόμη (δημιουργήθηκε εγγραφή στη ΒΔ)
  └──────┬──────┘
         │ έναρξη χειριστή
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← έγινε κλήση του χειριστή με χρονικό όριο
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (καμία άλλη διαδρομή — τερματίστηκε από τη γονική διεργασία)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Η εγγραφή στη ΒΔ ενημερώνεται με status, output, durationMs
```

### Προεπιλεγμένη Διαμόρφωση

| Ρύθμιση      | Προεπιλογή    | Δυνατότητα διαμόρφωσης μέσω          |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Σημαντικό**: Ο executor είναι singleton — η κλήση της `setTimeout()` επηρεάζει καθολικά όλες τις επόμενες κλήσεις. Προς το παρόν, δεν υποστηρίζονται χρονικά όρια ανά δεξιότητα· αν χρειάζεστε διαφορετικά χρονικά όρια ανά δεξιότητα, υποβάλετε ξεχωριστές διεργασίες ή δημιουργήστε παρακλάδι του executor.

### Τιμές Κατάστασης

Από το `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Σε ουρά, δεν έχει ξεκινήσει ακόμη
  RUNNING = "running", // Έγινε κλήση του χειριστή
  SUCCESS = "success", // Ο χειριστής επέστρεψε έγκυρη έξοδο
  ERROR = "error", // Ο χειριστής προκάλεσε εξαίρεση
  TIMEOUT = "timeout", // Υπέρβαση του χρονικού ορίου του executor
}
```

> **Σημείωση**: Η κατάσταση `TIMEOUT` ορίζεται στο enum, αλλά **στην πραγματικότητα δεν εγγράφεται στη ΒΔ** από την τρέχουσα υλοποίηση του executor — τα χρονικά όρια εμφανίζονται ως `ERROR` με το μήνυμα `"Skill execution timed out"`. Το enum κατάστασης προορίζεται για μελλοντική χρήση.

### Επιθεώρηση Εκτελέσεων

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Λήψη συγκεκριμένης εκτέλεσης βάσει ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Παράθεση πρόσφατων εκτελέσεων για ένα κλειδί API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Καταμέτρηση συνολικών εκτελέσεων
const total = skillExecutor.countExecutions("api-key-id");
```

### Συμπεριφορά Επανάληψης

Η ρύθμιση `maxRetries` αποθηκεύεται, αλλά **προς το παρόν δεν χρησιμοποιείται** από τη μέθοδο `execute()` του executor — εκτελεί μόνο μία προσπάθεια. Η τιμή `maxRetries` εκτίθεται για μελλοντική υλοποίηση και για hooks που θέλουν να την αναγνώσουν.

Προς το παρόν, οι επαναλήψεις πρέπει να υλοποιούνται μέσα στον ίδιο τον χειριστή της δεξιότητας. Οι ενσωματωμένες
δεξιότητες καταχωρίζονται στον executor (π.χ. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` στο `src/lib/skills/builtin/`)· οποιοσδήποτε χειριστής
καταχωρίζετε μπορεί να περιλαμβάνει τον δικό του βρόχο επανάληψης:

```ts
// μέσα σε έναν χειριστή δεξιότητας
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## Το SkillMode Αναλυτικά

Το enum `SkillMode` (`src/lib/skills/types.ts`) ελέγχει **πότε και πώς** καλούνται οι δεξιότητες:

```ts
enum SkillMode {
  AUTO = "auto", // Το LLM αποφασίζει πότε θα καλέσει τη δεξιότητα
  MANUAL = "manual", // Καλείται μόνο κατόπιν ρητού αιτήματος του χρήστη
  HYBRID = "hybrid", // Βαθμολόγηση AUTO + χειροκίνητη παράκαμψη
}
```

> **Σημείωση**: Η βάση κώδικα ορίζει το `SkillMode` (AUTO/MANUAL/HYBRID), ενώ το πεδίο `Skill.mode` χρησιμοποιεί διαφορετική μορφή (`"on" | "off" | "auto"`). Σχετίζονται, αλλά δεν είναι πανομοιότυπα — το `SkillMode` αφορά την πολιτική εκτέλεσης, ενώ το `Skill.mode` αφορά την ενεργοποίηση κάθε επιμέρους δεξιότητας.

### Πότε να Χρησιμοποιείτε Κάθε Λειτουργία

| Λειτουργία | Συμπεριφορά του LLM                                                                               | Περίπτωση χρήσης                                              |
| ---------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `AUTO`     | Το LLM μπορεί να καλέσει τη δεξιότητα όταν το κρίνει απαραίτητο                                   | Δεξιότητες γενικού σκοπού (ανάγνωση αρχείων, αιτήματα HTTP)   |
| `MANUAL`   | Το LLM δεν μπορεί να καλέσει τη δεξιότητα· καλείται μόνο μέσω ρητής κλήσης του API `executeSkill` | Ευαίσθητες λειτουργίες (εγγραφές σε βάση δεδομένων, πληρωμές) |
| `HYBRID`   | Το LLM μπορεί να προτείνει τη δεξιότητα· ο χρήστης πρέπει να την επιβεβαιώσει                     | Δεξιότητες που έχουν παρενέργειες αλλά δεν είναι επικίνδυνες  |

### Βαθμολόγηση AUTO

Όταν είναι ενεργή η λειτουργία `AUTO`, κάθε υποψήφια δεξιότητα βαθμολογείται με βάση το
πλαίσιο του αιτήματος από τη `scoreAutoSkill()` στο `src/lib/skills/injection.ts` — ένα προσθετικό
σύστημα ακέραιων βαθμών (αντιστοίχιση ονόματος δεξιότητας, επικάλυψη διακριτικών ονόματος/ετικετών/περιγραφής,
ενδείξεις λόγου παρασκηνίου, μπόνους/ποινή ένδειξης παρόχου). Οι κορυφαίες
`AUTO_MAX_SKILLS = 5` δεξιότητες με `score >= AUTO_MIN_SCORE = 3` εισάγονται ως
εργαλεία που μπορούν να κληθούν, ενώ οι ισοβαθμίες επιλύονται πρώτα βάσει `installCount` και έπειτα βάσει ονόματος. Δείτε τον πλήρη πίνακα βαθμών
στην ενότητα [**Δημιουργία Σχήματος Εργαλείων → Βαθμολόγηση AUTO**](#auto-scoring) νωρίτερα σε αυτό το
έγγραφο· δεν υπάρχει κατώφλι τύπου `0.6` με κινητή υποδιαστολή ούτε βαθμολόγηση στο `registry.ts`.

---

## Κατάλογος Ενσωματωμένων Δεξιοτήτων

Το OmniRoute παρέχεται με ένα επιμελημένο σύνολο ενσωματωμένων δεξιοτήτων στο `src/lib/skills/builtin/`. Οι πιο συνηθισμένες είναι:

### Δεξιότητα Αυτοματοποίησης Προγράμματος Περιήγησης

Η δεξιότητα προγράμματος περιήγησης (`src/lib/skills/builtin/browser.ts`) παρέχει αυτοματοποίηση προγράμματος περιήγησης χωρίς γραφικό περιβάλλον μέσω Playwright/Puppeteer. **Έχει υλοποιηθεί, αλλά δεν περιλαμβάνεται στον προεπιλεγμένο κατάλογο δεξιοτήτων** — για να τη χρησιμοποιήσετε, εγκαταστήστε ξεχωριστά το πρόσθετο επέκτασης προγράμματος περιήγησης.

```ts
// Ενεργοποιήστε τη στη διαμόρφωσή σας
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Να απαιτείται πάντα ρητή κλήση
  allowedSkills: ["browser"],
  timeout: 60000, // 60 δευτ. για τη φόρτωση σελίδων
  maxRetries: 1,
};
```

### Άλλες Κατηγορίες Ενσωματωμένων Δεξιοτήτων

| Κατηγορία              | Δεξιότητες                                                | Λειτουργία |
| ---------------------- | --------------------------------------------------------- | ---------- |
| Είσοδος/Έξοδος Αρχείων | `file_read`, `file_write`                                 | AUTO       |
| HTTP                   | `http_request`                                            | AUTO       |
| Αναζήτηση              | `web_search`                                              | AUTO       |
| Εκτέλεση Κώδικα        | `eval_code` (JavaScript/Python σε περιβάλλον απομόνωσης)  | HYBRID     |
| Σύστημα                | `execute_command` (εκτέλεση CLI σε περιβάλλον απομόνωσης) | MANUAL     |

### Προσθήκη Προσαρμοσμένης Δεξιότητας

Δείτε το [SDK Προσθέτων και Ενσωμάτωση Δεξιοτήτων](./PLUGIN_SDK.md) για πληροφορίες σχετικά με την προσθήκη μιας προσαρμοσμένης δεξιότητας μέσω του συστήματος προσθέτων.

---

## Δείτε επίσης

- [MCP-SERVER.md](./MCP-SERVER.md) — καταχώριση εργαλείων MCP και τρόποι μεταφοράς
- [A2A-SERVER.md](./A2A-SERVER.md) — κύκλος ζωής εργασιών A2A και δρομολόγηση δεξιοτήτων
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — εισαγωγή για τους χρήστες
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — διοχέτευση αιτημάτων και χάρτης στοιχείων
- Πηγαίος κώδικας: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Δοκιμές: `src/lib/skills/__tests__/integration.test.ts`
