# ACP (Agent Client Protocol) (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **Σύνοψη**: Το ACP επιτρέπει στο OmniRoute να εκκινεί agents γραμμής εντολών (όπως τα Claude Code και Codex) ως θυγατρικές διεργασίες αντί να χρησιμοποιεί HTTP APIs. Έτσι σας παρέχει μεταφορά τύπου «CLI ως backend».

---

## Τι είναι το ACP;

Το ACP (Agent Client Protocol) είναι μια μεταφορά **«CLI ως backend»** για το OmniRoute. Αντί να αναχαιτίζει κλήσεις HTTP API προς παρόχους AI, το ACP **εκκινεί agents γραμμής εντολών ως θυγατρικές διεργασίες** και διοχετεύει προτροπές μέσω της εγγενούς διεπαφής τους.

### Γιατί να χρησιμοποιήσετε το ACP;

| Πλεονέκτημα                     | Περιγραφή                                                      |
| ------------------------------- | -------------------------------------------------------------- |
| **Δεν απαιτούνται κλειδιά API** | Χρησιμοποιεί τον υπάρχοντα έλεγχο ταυτότητας του CLI           |
| **Εγγενές πρωτόκολλο**          | Χρησιμοποιεί την εγγενή μορφή εισόδου/εξόδου κάθε CLI          |
| **Αυτόματη ανακάλυψη**          | Εντοπίζει τα εγκατεστημένα CLIs στο σύστημά σας                |
| **15 ενσωματωμένοι agents**     | Προρυθμισμένοι για δημοφιλή εργαλεία CLI                       |
| **Προσαρμοσμένοι agents**       | Προσθέστε τα δικά σας εργαλεία CLI μέσω των ρυθμίσεων          |
| **Διαχείριση διεργασιών**       | Διαχειρίζεται τον κύκλο ζωής (εκκίνηση, αποστολή, τερματισμός) |

---

## Υποστηριζόμενοι agents γραμμής εντολών

Το ACP υποστηρίζει εξαρχής **15 ενσωματωμένους agents γραμμής εντολών**:

| Αναγνωριστικό agent | Εμφανιζόμενο όνομα | Εκτελέσιμο    | Πρωτόκολλο |
| ------------------- | ------------------ | ------------- | ---------- |
| `codex`             | OpenAI Codex CLI   | `codex`       | stdio      |
| `claude`            | Claude Code CLI    | `claude`      | stdio      |
| `goose`             | Goose CLI          | `goose`       | stdio      |
| `openclaw`          | OpenClaw           | `openclaw`    | stdio      |
| `aider`             | Aider              | `aider`       | stdio      |
| `opencode`          | OpenCode           | `opencode`    | stdio      |
| `cline`             | Cline              | `cline`       | stdio      |
| `qwen`              | Qwen Code          | `qwen --acp`  | stdio      |
| `forge`             | ForgeCode          | `forge`       | stdio      |
| `amazon-q`          | Amazon Q Developer | `q`           | stdio      |
| `interpreter`       | Open Interpreter   | `interpreter` | stdio      |
| `cursor-cli`        | Cursor CLI         | `cursor`      | stdio      |
| `warp`              | Warp AI            | `warp`        | stdio      |
| `gemini`            | Gemini CLI         | `gemini`      | stdio      |
| `zcode`             | ZCode              | `zcode`       | stdio      |

### Προσαρμοσμένοι agents

Μπορείτε να προσθέσετε τους δικούς σας agents γραμμής εντολών μέσω των ρυθμίσεων. Οι προσαρμοσμένοι agents υποστηρίζουν τις ίδιες δυνατότητες με τους ενσωματωμένους agents.

---

## Γρήγορη εκκίνηση

### Βήμα 1: Εγκαταστήστε έναν agent γραμμής εντολών

```bash
# Παράδειγμα: Εγκαταστήστε το Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Επαληθεύστε την εγκατάσταση
claude --version
```

### Βήμα 2: Αυτόματος εντοπισμός από το ACP

Το ACP εντοπίζει αυτόματα τους εγκατεστημένους agents γραμμής εντολών στο σύστημά σας. Δεν απαιτείται διαμόρφωση!

### Βήμα 3: Χρησιμοποιήστε τη μεταφορά ACP

Μόλις εντοπιστεί, το ACP μπορεί να χρησιμοποιηθεί ως μεταφορά για οποιονδήποτε υποστηριζόμενο πάροχο. Το OmniRoute θα χρησιμοποιεί αυτόματα το ACP όταν το CLI είναι διαθέσιμο.

---

## Πώς λειτουργεί το ACP

### Αρχιτεκτονική

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Θυγατρική      │
│  διεργασία      │
│  (CLI Agent)    │
│                 │
│  stdin  ◄──────┤  Αποστολή προτροπής
│  stdout ──────►│  Λήψη απόκρισης
│  stderr ──────►│  Λήψη σφαλμάτων
└─────────────────┘
```

### Κύκλος ζωής διεργασίας

1. **Εκκίνηση** — Το ACP δημιουργεί μια θυγατρική διεργασία για τον agent γραμμής εντολών
2. **Αποστολή** — Το ACP γράφει προτροπές στο stdin της διεργασίας
3. **Λήψη** — Το ACP διαβάζει αποκρίσεις από τα stdout/stderr
4. **Ανίχνευση αδράνειας** — Το ACP περιμένει 2 δευτερόλεπτα αδράνειας πριν θεωρήσει ότι η απόκριση έχει ολοκληρωθεί
5. **Τερματισμός** — Το ACP τερματίζει τη διεργασία (SIGTERM και, στη συνέχεια, SIGKILL μετά από 5s)

### Πρωτόκολλο επικοινωνίας

Το ACP χρησιμοποιεί **stdio** (τυπική είσοδο/έξοδο) για την επικοινωνία με agents γραμμής εντολών. Το πρωτόκολλο είναι το εξής:

1. **Αποστολή προτροπής** — Εγγραφή στο stdin με έναν χαρακτήρα νέας γραμμής
2. **Αναμονή απόκρισης** — Ανάγνωση από το stdout έως ότου υπάρξει αδράνεια (2s χωρίς έξοδο)
3. **Χρονικό όριο** — Από προεπιλογή 120 δευτερόλεπτα (με δυνατότητα διαμόρφωσης)

---

## Αναφορά API

### Συναρτήσεις Μητρώου

#### `detectInstalledAgents()`

Εντοπίζει όλους τους εγκατεστημένους CLI agents στο σύστημα. Τα αποτελέσματα αποθηκεύονται στην κρυφή μνήμη για 60 δευτερόλεπτα.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Επιστρέφει: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // π.χ., "codex", "claude"
  name: string; // Εμφανιζόμενο όνομα
  binary: string; // Όνομα εκτελέσιμου αρχείου προς εκκίνηση
  versionCommand: string; // Εντολή εντοπισμού έκδοσης
  version: string | null; // Εντοπισμένη έκδοση (null εάν δεν είναι εγκατεστημένο)
  installed: boolean; // Εάν ο agent είναι εγκατεστημένος
  providerAlias: string; // Αναγνωριστικό παρόχου στο OmniRoute
  spawnArgs: string[]; // Ορίσματα που μεταβιβάζονται κατά την εκκίνηση
  protocol: "stdio" | "http"; // Πρωτόκολλο επικοινωνίας
  isCustom?: boolean; // Εάν πρόκειται για προσαρμοσμένο agent που έχει οριστεί από τον χρήστη
}
```

#### `getAvailableAgents()`

Λαμβάνει μόνο τους agents που είναι εγκατεστημένοι και διαθέσιμοι για το ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Επιστρέφει: CliAgentInfo[] (μόνο εγκατεστημένοι agents)
```

#### `getAgentById(id)`

Λαμβάνει έναν συγκεκριμένο agent βάσει αναγνωριστικού.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Επιστρέφει: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Ορίζει προσαρμοσμένους agents από τις ρυθμίσεις.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### Συναρτήσεις Διαχειριστή

#### `acpManager.spawn(agentId, binary, args, env)`

Εκκινεί μια νέα διεργασία CLI agent.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* προσαρμοσμένες μεταβλητές περιβάλλοντος */
});
// Επιστρέφει: AcpSession
```

**Επιτρεπόμενα αναγνωριστικά agents**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Στέλνει ένα prompt σε έναν CLI agent και συλλέγει την απόκριση.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // χρονικό όριο 2 λεπτών
);
// Επιστρέφει: Promise<string>
```

#### `acpManager.kill(sessionId)`

Τερματίζει μια συνεδρία και εκτελεί εκκαθάριση.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Επιστρέφει: boolean
```

#### `acpManager.getActiveSessions()`

Λαμβάνει όλες τις ενεργές συνεδρίες.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Επιστρέφει: AcpSession[]
```

#### `acpManager.killAll()`

Τερματίζει όλες τις συνεδρίες.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Διεπαφή Συνεδρίας

```typescript
interface AcpSession {
  id: string; // Μοναδικό αναγνωριστικό συνεδρίας
  agentId: string; // Αναγνωριστικό agent (π.χ., "claude")
  process: ChildProcess; // Χειριστήριο θυγατρικής διεργασίας
  alive: boolean; // Εάν η διεργασία είναι ενεργή
  stdoutBuffer: string; // Συσσωρευμένο buffer stdout
  stderrBuffer: string; // Συσσωρευμένο buffer stderr
  createdAt: Date; // Χρονική σήμανση δημιουργίας
}
```

### Συμβάντα

Το `AcpManager` επεκτείνει το `EventEmitter` και εκπέμπει τα ακόλουθα συμβάντα:

#### `stdout`

Εκπέμπεται όταν ο CLI agent γράφει στο stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Εκπέμπεται όταν ο CLI agent γράφει στο stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Εκπέμπεται όταν τερματίζεται η διεργασία του CLI agent.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Εκπέμπεται όταν παρουσιάζεται σφάλμα στη διεργασία του CLI agent.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Ρύθμιση παραμέτρων

### Μεταβλητές περιβάλλοντος

Το ACP κληρονομεί όλες τις μεταβλητές περιβάλλοντος από τη γονική διεργασία και μπορεί να επεκταθεί με προσαρμοσμένες μεταβλητές περιβάλλοντος:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Ορίσματα εκκίνησης

Κάθε agent διαθέτει προεπιλεγμένα ορίσματα εκκίνησης που ορίζονται στο μητρώο. Μπορείτε να τα παρακάμψετε:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Χρονικά όρια

Το προεπιλεγμένο χρονικό όριο για τα prompt είναι **120 δευτερόλεπτα** (2 λεπτά). Μπορείτε να το παρακάμψετε:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 λεπτά
```

### Cache ανίχνευσης

Η ανίχνευση agent αποθηκεύεται στην cache για **60 δευτερόλεπτα**, ώστε να αποφεύγονται δαπανηρές σαρώσεις του συστήματος αρχείων. Για αναγκαστική ανανέωση:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Ασφάλεια

### Αποτροπή εισαγωγής εντολών

Το ACP επικυρώνει τις εντολές έκδοσης για την αποτροπή επιθέσεων εισαγωγής εντολών:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Οι εντολές έκδοσης που περιέχουν αυτούς τους χαρακτήρες απορρίπτονται:

- `;` — Διαχωριστικό εντολών
- `&` — Διεργασία παρασκηνίου
- `|` — Διοχέτευση
- `<`, `>` — Ανακατεύθυνση
- `` ` `` — Αντικατάσταση εντολής
- `$` — Ανάπτυξη μεταβλητής
- `\r`, `\n` — Αλλαγές γραμμής

### Επικύρωση ονόματος εκτελέσιμου αρχείου

Το ACP επικυρώνει ότι το εκτελέσιμο αρχείο της εντολής έκδοσης αντιστοιχεί στο αναμενόμενο όνομα εκτελέσιμου αρχείου (εκτός αν πρόκειται για προσαρμοσμένο agent).

### Απομόνωση διεργασιών

Κάθε συνεδρία ACP εκτελείται στη δική της θυγατρική διεργασία. Η διεργασία τερματίζεται όταν λήξει η συνεδρία ή το χρονικό όριο.

---

## Απόδοση

### Απόδοση ανίχνευσης

- **Πρώτη κλήση**: ~50-200ms (εκτελεί την εντολή `version` για κάθε agent)
- **Κλήσεις από την cache**: <1ms (επιστρέφει από την cache)
- **TTL της cache**: 60 δευτερόλεπτα

### Απόδοση prompt

- **Εκκίνηση**: ~50-100ms
- **Αποστολή prompt**: ~10-50ms
- **Αναμονή για απόκριση**: Εξαρτάται από τον CLI agent (συνήθως 1-30 δευτερόλεπτα)
- **Τερματισμός**: ~5 δευτερόλεπτα (SIGTERM) + άμεσα (SIGKILL)

### Χρήση πόρων

- **Μνήμη ανά συνεδρία**: ~10-50MB (εξαρτάται από τον CLI agent)
- **CPU**: Ελάχιστη χρήση (περιορίζεται από τις λειτουργίες I/O)
- **Δίσκος**: Καμία χρήση

---

## Αντιμετώπιση προβλημάτων

### Σφάλμα "Unknown agent"

**Πρόβλημα**: Η `acpManager.spawn()` προκαλεί το σφάλμα `Unknown agent: <id>`

**Λύση**: Μόνο οι ακόλουθοι agent επιτρέπονται στη `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Οι υπόλοιποι agent πρέπει να εκκινούνται χειροκίνητα ή μέσω προσαρμοσμένων ορισμών agent.

### Σφάλμα "Session not alive"

**Πρόβλημα**: Η `acpManager.sendPrompt()` προκαλεί το σφάλμα `Session ${sessionId} is not alive`

**Λύση**: Η συνεδρία ενδέχεται να έχει τερματιστεί ή να έχει διακοπεί αναγκαστικά. Ελέγξτε την κατάσταση της συνεδρίας:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Επανεκκινήστε τη συνεδρία
  acpManager.spawn("claude", "claude", [], {});
}
```

### Σφάλμα "ACP timeout"

**Πρόβλημα**: Η `acpManager.sendPrompt()` προκαλεί το σφάλμα `ACP timeout after 120000ms`

**Λύση**: Αυξήστε το χρονικό όριο:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 λεπτά
```

### Το CLI δεν ανιχνεύεται

**Πρόβλημα**: Η `detectInstalledAgents()` δεν βρίσκει το CLI σας

**Λύσεις**:

1. **Ελέγξτε το PATH**: Βεβαιωθείτε ότι το CLI βρίσκεται στο PATH του συστήματός σας
2. **Ελέγξτε την εντολή έκδοσης**: Εκτελέστε χειροκίνητα την `claude --version`
3. **Ελέγξτε τα δικαιώματα**: Βεβαιωθείτε ότι το CLI είναι εκτελέσιμο
4. **Προσαρμοσμένος agent**: Προσθέστε έναν προσαρμοσμένο ορισμό agent για μη τυπικά CLI

### Άρνηση πρόσβασης

**Πρόβλημα**: Το ACP δεν μπορεί να εκτελέσει το CLI

**Λύσεις**:

1. **Ελέγξτε τα δικαιώματα αρχείου**: `chmod +x /usr/local/bin/claude`
2. **Ελέγξτε την ιδιοκτησία**: Βεβαιωθείτε ότι το OmniRoute έχει δικαιώματα ανάγνωσης/εκτέλεσης
3. **Ελέγξτε το SELinux/AppArmor**: Ενδέχεται να εμποδίζει την εκκίνηση διεργασιών

---

## Παραδείγματα

### Παράδειγμα 1: Εκκίνηση και χρήση του Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Εντοπισμός εγκατεστημένων agents
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Εκκίνηση νέας συνεδρίας
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Αποστολή προτροπής
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Εκκαθάριση
  acpManager.kill(session.id);
}
```

### Παράδειγμα 2: Αυτόματη ανακάλυψη με εναλλακτική επιλογή

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Δοκιμή πρώτα του Claude και, εναλλακτικά, του Codex
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### Παράδειγμα 3: Προσαρμοσμένος agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Καταχώριση προσαρμοσμένου CLI agent
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// Πλέον, το detectInstalledAgents() θα περιλαμβάνει το "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Τι ακολουθεί;

- **[Αναφορά API](../reference/API_REFERENCE.md)** — Τελικά σημεία REST API
- **[Αναφορά παρόχων](../reference/PROVIDER_REFERENCE.md)** — Και οι 352 πάροχοι
- **[Διακομιστής MCP](./MCP-SERVER.md)** — Ενσωμάτωση του Model Context Protocol
- **[Διακομιστής A2A](./A2A-SERVER.md)** — Πρωτόκολλο Agent-to-Agent
- **[Cloud Agent](./CLOUD_AGENT.md)** — Agents που βασίζονται στο cloud

---

## Αναφορά

- [Έργο AionUi](https://github.com/iOfficeAI/AionUi) — Πηγή έμπνευσης για τον αυτόματο εντοπισμό ACP
- [Πηγαίος κώδικας ACP](../../src/lib/acp/) — Λεπτομέρειες υλοποίησης
  - `manager.ts` — Διαχείριση κύκλου ζωής διεργασιών
  - `registry.ts` — Ανακάλυψη και καταχώριση agents
  - `index.ts` — Δημόσιες εξαγωγές API
