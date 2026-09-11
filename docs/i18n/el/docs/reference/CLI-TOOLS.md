# CLI-TOOLS (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇪🇪 [et](../../../et/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇪 [ga](../../../ga/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇷 [hr](../../../hr/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇱🇹 [lt](../../../lt/docs/reference/CLI-TOOLS.md) · 🇱🇻 [lv](../../../lv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇲🇹 [mt](../../../mt/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇮 [sl](../../../sl/docs/reference/CLI-TOOLS.md) · 🇷🇸 [sr](../../../sr/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Εργαλεία CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Εργαλεία CLI — OmniRoute

Τελευταία ενημέρωση: 2026-08-23

Το OmniRoute ενσωματώνεται με τρεις κατηγορίες εργαλείων CLI που κατανέμονται σε τρεις αφιερωμένες σελίδες του dashboard:

| Σελίδα         | Διαδρομή                | Έννοια                                                                              | Πλήθος       |
| -------------- | ----------------------- | ----------------------------------------------------------------------------------- | ------------ |
| **CLI Code's** | `/dashboard/cli-code`   | Εργαλεία κώδικα που κατευθύνετε στο OmniRoute (Client → CLI → OmniRoute → Provider) | 26           |
| **CLI Agents** | `/dashboard/cli-agents` | Αυτόνομοι πράκτορες που κατευθύνετε στο OmniRoute (ίδια ροή, ευρύτερο εύρος)        | 10           |
| **ACP Agents** | `/dashboard/acp-agents` | CLIs που το OmniRoute εκκινεί ως backend μέσω stdio/ACP (αντίστροφη ροή)            | βλ. registry |

Οι παλαιές διαδρομές ανακατευθύνονται μέσω 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Πώς Λειτουργεί

```
CLI Code's / CLI Agents (ροή κατανάλωσης):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (όλα κατευθύνονται στο OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (το OmniRoute δρομολογεί στον κατάλληλο provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (αντίστροφη ροή εκκίνησης):
    Αίτημα client → OmniRoute → εκκινεί CLI μέσω stdio/ACP → απόκριση
```

**Πλεονεκτήματα:**

- Ένα API key για τη διαχείριση όλων των εργαλείων
- Παρακολούθηση κόστους για όλα τα CLIs στο dashboard
- Εναλλαγή μοντέλου χωρίς επαναδιαμόρφωση κάθε εργαλείου
- Λειτουργεί τοπικά και σε απομακρυσμένους διακομιστές (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Αυτόματη διαμόρφωση με `setup-*`

Δεν χρειάζεται να γράψετε χειροκίνητα τη διαμόρφωση κάθε εργαλείου. Το OmniRoute διαθέτει μια εντολή `setup-*`
ανά υποστηριζόμενο CLI που διαβάζει τον **ενεργό** κατάλογο μοντέλων από ένα τρέχον
OmniRoute (τοπικό ή απομακρυσμένο) και γράφει τη δική του διαμόρφωση στον υπολογιστή σας:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
omniroute setup-5dive
```

Κάθε εντολή δέχεται `--remote <url> --api-key <key>` (διαμόρφωση τοπικού εργαλείου έναντι
απομακρυσμένου OmniRoute), `--dry-run` (προεπισκόπηση χωρίς εγγραφή) και `--port`. Τα εργαλεία
χωρίς αυτόματη ανακάλυψη μοντέλων (Cline, Kilo, Roo, Goose, Aider, Qwen, 5dive) δέχονται
`--model <id>` (και `--yes` για μη διαδραστικές εκτελέσεις). Η `setup-5dive` είναι η μόνη
συνταγή που δεν γράφει κάτω από το `$HOME`: διαμορφώνει μια fleet πρακτόρων 5dive
γράφοντας ένα προφίλ πιστοποίησης που ανήκει στον root στον κεντρικό υπολογιστή fleet, οπότε επανεκτελείται μέσω `sudo`
και δεν έχει δική της απομακρυσμένη λειτουργία. Για να εκκινήσετε ένα CLI με
το σωστό env injected χωρίς καμία εγγραφή διαμόρφωσης, χρησιμοποιήστε τον γενικό
εκκινητή `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — οι στόχοι και τα ψευδώνυμα προέρχονται από το `bin/cli/cli-manifest.mjs`). Οι παλαιοί
εκκινητές ανά εργαλείο `omniroute launch` (Claude Code) και `omniroute launch-codex`
(Codex) παραμένουν διαθέσιμοι. Το Gemini CLI είναι μόνο για εκκίνηση: είναι στόχος `omniroute run`
αλλά δεν έχει συνταγή `setup-*`/`configure`.

> **Πλήρης αναφορά:** ο κύριος πίνακας — τι γράφει κάθε εντολή, κάθε flag,
> τοπική vs απομακρυσμένη λειτουργία, και ποια εργαλεία χρειάζονται πρόθεμα `/v1` — βρίσκεται στο
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)**.

### Εκτέλεση εντός container

Μια εντολή `setup-*` που εκτελείται εντός του container του OmniRoute γράφει στο
home directory του container, το οποίο κανένα CLI του κεντρικού υπολογιστή δεν διαβάζει και εξαφανίζεται μαζί με
το container. Το OmniRoute το ανιχνεύει και τερματίζει με κωδικό `2` παρέχοντας οδηγίες αντί να
γράψει. Δύο υποστηριζόμενοι τρόποι αντιμετώπισης — εγκατάσταση του CLI στον κεντρικό υπολογιστή και
`omniroute connect` στο container, ή bind-mount των φακέλων διαμόρφωσης και ορισμός
`CLI_CONFIG_HOME` (το προφίλ `host` του compose). Κάθε εντολή `setup-*`, καθώς και
η `omniroute configure` και η `omniroute config set`, δέχονται
`--allow-container-write` όταν αυτό που πραγματικά θέλετε είναι η διαμόρφωση των CLIs του ίδιου του container. Το `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` επιτυγχάνει το ίδιο για
τον διακομιστή. Δείτε
[Docker Guide → Configuring host CLI tools](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

Το **apply endpoint** του dashboard (`POST /api/cli-tools/apply`) εφαρμόζει την
ίδια προστασία: σε container, μια εγγραφή της οποίας ο στόχος δεν είναι bind-mounted από τον
κεντρικό υπολογιστή απαντά με **`422`** και `containerEphemeralTarget: true`, το ασφαλές κείμενο σφάλματος
και — για τα εργαλεία με συνταγή κεντρικού υπολογιστή (claude, codex, opencode, cline,
kilo, continue) — ένα `hostSetupCommand` (π.χ. `omniroute setup-opencode`) για εκτέλεση
στον κεντρικό υπολογιστή. Δεν γράφεται τίποτα. Το `dryRun: true` συνεχίζει να λειτουργεί σε
λειτουργία container και επιστρέφει το παραγόμενο περιεχόμενο + διαδρομή στόχου χωρίς να αγγίζει τον δίσκο, ώστε
να μπορείτε να κάνετε προεπισκόπηση από το dashboard και να εφαρμόσετε στον κεντρικό υπολογιστή. Αυτή η συμπεριφορά είναι
σκόπιμη και προστατεύεται από παλινδρόμηση μέσω
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — μην «διορθώσετε» ποτέ ένα 422
αφαιρώντας την προστασία.

---

## Πηγή Αλήθειας

Ο ενοποιημένος κατάλογος βρίσκεται στο `src/shared/constants/cliTools.ts` ως `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Κάθε εγγραφή έχει τα παρακάτω πεδία (ορισμένα στο `src/shared/schemas/cliCatalog.ts`):

| Πεδίο                                           | Τύπος                                                        | Περιγραφή                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Σε ποια σελίδα εμφανίζεται το εργαλείο                            |
| `vendor`                                        | `string`                                                     | Προέλευση εργαλείου ("Anthropic", "OSS (P. Gauthier)")            |
| `acpSpawnable`                                  | `boolean`                                                    | Μπορεί επίσης να χρησιμοποιηθεί ως ACP Agent (εμφανίζεται badge)  |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Επίπεδο υποστήριξης προσαρμοσμένου endpoint. `"none"` = ουρά MITM |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Μηχανισμός διαμόρφωσης                                            |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Βασικά πεδία εμφάνισης                                            |

Εγγραφές με `baseUrlSupport: "none"` **δεν εμφανίζονται** στις σελίδες του dashboard — καταχωρούνται στην ουρά MITM για το plan 11 (βλ. `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Επίπεδα δυνατοτήτων (καταλογογραφημένο × ανιχνεύσιμο × ρυθμιζόμενο × εκτελέσιμο)

Δεν είναι κάθε καταλογογραφημένο εργαλείο ανιχνεύσιμο, ρυθμιζόμενο ή εκτελέσιμο. Κάθε επίπεδο έχει μία
δηλώνουσα πηγή, και ένα drift test τα διατηρεί ευθυγραμμισμένα:

| Επίπεδο               | Σημασία                                                                     | Δηλώνεται στο                                                     |
| --------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Καταλογογραφημένο** | Εμφανίζεται στον κατάλογο του dashboard (όνομα, vendor, docs, τύπος config) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Ανιχνεύσιμο**       | Ανίχνευση binary/config, health checks, config paths                        | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Ρυθμιζόμενο**       | Υποστηρίζεται από το `omniroute configure <cli>` (υπάρχει setup recipe)     | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Εκτελέσιμο**        | Υποστηρίζεται από το `omniroute run <target>` (ορισμένη έγχυση env/args)    | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

Το `bin/cli/cli-manifest.mjs` είναι το κανονικό εκτελέσιμο manifest για τις επιφάνειες εντολών CLI:
`run`, `configure` και οι γεννήτριες shell-completion αντλούν τις λίστες στόχων τους, την επίλυση alias (για παράδειγμα `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
και τη σύνδεση flag `--model` από αυτό. Η φρουρά drift
`tests/unit/cli/cli-manifest-drift.test.ts` βεβαιώνει ότι το manifest, ο runtime
κατάλογος, ο κατάλογος UI και κάθε επιφάνεια καταναλωτή παραμένουν συγχρονισμένα — ένας στόχος που προστίθεται σε
μία επιφάνεια χωρίς τις υπόλοιπες αποτυγχάνει στη σουίτα αντί να ξεφύγει σιωπηλά.

---

## 1. Κατάλογος CLI Code (26 εργαλεία)

Όλα τα εργαλεία που εμφανίζονται στο `/dashboard/cli-code`. Αυτά με `baseUrlSupport: none` συνδέονται μέσω MITM ή ενός χειροκίνητου οδηγού αντί για προσαρμοσμένη βασική URL:

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder | false        |

Τα εργαλεία με `baseUrlSupport: "partial"` εμφανίζουν ένα σήμα "⚠ Μερική Base URL" στην κάρτα του dashboard.

## 2. Κατάλογος CLI Agents (10 εργαλεία)

Αυτόνομοι agents που εμφανίζονται στο `/dashboard/cli-agents`:

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |
| prime-agent  | Prime Agent      | Prime Intellect (OSS)    | full           | false        |
| 5dive        | 5dive            | OSS (5dive-ai)           | full           | false        |

---

## 3. ACP Agents (/dashboard/acp-agents)

Αυτή η σελίδα (μετονομάστηκε από `/dashboard/agents`) εμφανίζει CLIs που το OmniRoute μπορεί να **εκκινήσει** ως μηχανές εκτέλεσης backend μέσω πρωτοκόλλου stdio/ACP. Ο κατάλογος διατηρείται ξεχωριστά στο `src/lib/acp/registry.ts` και **δεν** είναι ίδιος με το `CLI_TOOLS`.

---

## 4. Εκκρεμότητες MITM (δεν εμφανίζονται στο dashboard)

Τα παρακάτω CLIs δεν υποστηρίζουν εγγενώς προσαρμοσμένη base URL και **δεν περιλαμβάνονται** στις σελίδες CLI Code ή CLI Agents. Αποτελούν υποψήφια για υποκλοπή MITM στο πλάνο 11:

| CLI                 | Αιτία                                                                  |
| ------------------- | ---------------------------------------------------------------------- |
| windsurf            | Το BYOK περιορίζεται σε επιλεγμένα μοντέλα Claude + εταιρικό URL/token |
| amp                 | Κλειστό οικοσύστημα (Sourcegraph)                                      |
| amazon-q / kiro-cli | AWS SSO auth, χωρίς προσαρμοσμένο URL                                  |
| cowork              | Anthropic Desktop, χωρίς ρυθμιζόμενο endpoint                          |

Δείτε το `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` για την πλήρη διασταυρούμενη αναφορά.

---

## 5. API Μαζικής Ανίχνευσης

Όλη η ανίχνευση εργαλείων συγκεντρώνεται μέσω ενός μοναδικού endpoint:

**`GET /api/cli-tools/all-statuses`**

- Έλεγχος ταυτότητας: `requireCliToolsAuth(request)` (ίδιος με τις υπόλοιπες διαδρομές `/api/cli-tools/`)
- Επιστρέφει: `Record<toolId, ToolBatchStatus>` (τύπος: `src/shared/types/cliBatchStatus.ts`)
- Στρατηγική: `Promise.all` σε όλα τα εργαλεία, χρονικό όριο 5 δευτερολέπτων ανά εργαλείο
- Cache: εντός μνήμης LRU με ευρετήριο βάσει `mtime` του αρχείου ρυθμίσεων. Ακυρώνεται όταν αλλάζει το mtime. Επαναφέρεται κατά την επανεκκίνηση του server.

Μορφή απόκρισης ανά εργαλείο:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // εξυγιανσμένο, χωρίς stack traces
}
```

---

## 6. Χειριστές Ρυθμίσεων για Νέα Εργαλεία

Τα νέα εργαλεία με `configType: "custom"` διαθέτουν αποκλειστικά routes API ρυθμίσεων:

| Route                                       | Εργαλείο                                                         |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

Όλα τα routes χρησιμοποιούν `sanitizeErrorMessage()` για αποκρίσεις σφάλματος (Κανόνας #12).

---

## 7. Αρχιτεκτονική Σελίδων Dashboard

### CLI Code (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — server component
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — client grid
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — σελίδα λεπτομερειών εργαλείου
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 εξειδικευμένες κάρτες εργαλείων + `ToolDetailClient.tsx`

### CLI Agents (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — server component
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — client grid
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — επαναχρησιμοποιεί το `ToolDetailClient`

### ACP Agents (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — server component (μετακινήθηκε από `agents/`)

### Κοινά Στοιχεία UI (`src/shared/components/cli/`)

| Αρχείο                  | Σκοπός                                                      |
| ----------------------- | ----------------------------------------------------------- |
| `CliToolCard.tsx`       | Έξυπνη κάρτα κατάστασης (ανίχνευση + διαμόρφωση + endpoint) |
| `CliConceptCard.tsx`    | Κάρτα επεξήγησης έννοιας ανά σελίδα                         |
| `CliComparisonCard.tsx` | Σύγκριση τριών στηλών μεταξύ τύπων CLI                      |
| `BaseUrlSelect.tsx`     | Αναπτυσσόμενο endpoint (Τοπικό/Cloud/Προσαρμοσμένο)         |
| `ApiKeySelect.tsx`      | Επιλογέας κλειδιού API                                      |
| `ManualConfigModal.tsx` | Modal με αντιγράψιμο απόσπασμα διαμόρφωσης                  |

### Κοινό Hook (`src/shared/hooks/cli/`)

| Αρχείο                    | Σκοπός                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Ανακτά το `/api/cli-tools/all-statuses`, διαχειρίζεται την κατάσταση φόρτωσης/ανανέωσης |

---

## 8. i18n

Νέα namespaces που προστέθηκαν στο plan 14 F9:

| Namespace   | Σκοπός                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------- |
| `cliCommon` | Κοινές συμβολοσειρές (ετικέτες καρτών, κείμενα εννοιών/συγκρίσεων, ετικέτες σελίδας λεπτομερειών) |
| `cliCode`   | Συμβολοσειρές σελίδας CLI Code                                                                    |
| `cliAgents` | Συμβολοσειρές σελίδας CLI Agents                                                                  |
| `acpAgents` | Συμβολοσειρές σελίδας ACP Agents                                                                  |

Παρέχονται πλήρεις μεταφράσεις PT-BR και EN. 39 άλλες τοπικές ρυθμίσεις επιστρέφουν αυτόματα στα EN μέσω συγχώνευσης σε επίπεδο namespace στο `src/i18n/request.ts`.

---

## 9. Γρήγορη Εκκίνηση

### Βήμα 1 — Απόκτηση Κλειδιού API OmniRoute

1. Ανοίξτε το `/dashboard/api-manager` → **Δημιουργία Κλειδιού API**
2. Δώστε του ένα όνομα (π.χ. `cli-tools`) και επιλέξτε όλα τα δικαιώματα
3. Αντιγράψτε το κλειδί — θα το χρειαστείτε για κάθε CLI παρακάτω

> Το κλειδί σας μοιάζει με: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Βήμα 2 — Εγκατάσταση Εργαλείων CLI

Όλα τα εργαλεία βασισμένα σε npm απαιτούν Node.js 22.22.2+ ή 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (εκκινείται μέσω `omniroute run gemini` → /v1beta επιφάνεια)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Βασισμένο σε Rust

# Pi coding agent
# δείτε https://github.com/zechnerj/pi-coding-agent για εγκατάσταση

# jcode
# δείτε https://github.com/1jehuang/jcode για εγκατάσταση
```

---

### Βήμα 3 — Διαμόρφωση μέσω Dashboard

1. Μεταβείτε στο `http://localhost:20128/dashboard/cli-code`
2. Βρείτε το εργαλείο σας στο πλέγμα
3. Κάντε κλικ στην κάρτα για να ανοίξετε τη σελίδα λεπτομερειών του εργαλείου
4. Επιλέξτε το κλειδί API και τη βασική URL σας
5. Κάντε κλικ στο **Apply Config** ή αντιγράψτε το τμήμα χειροκίνητης διαμόρφωσης

---

### Βήμα 4 — Ορισμός Καθολικών Μεταβλητών Περιβάλλοντος

```bash
# Καθολικό Τερματικό Σημείο OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Το Gemini CLI διαβάζει το GOOGLE_GEMINI_BASE_URL στη ΡΙΖΑ (το SDK του προσαρτά /v1beta/... μόνο του)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Για **απομακρυσμένο διακομιστή** αντικαταστήστε το `localhost:20128` με την IP ή τον τομέα του διακομιστή,
> π.χ. `http://<your-server-ip>:20128`.

---

### Βήμα 4 — Διαμόρφωση Κάθε Εργαλείου

#### Claude Code

```bash
# Δημιουργία ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Χρησιμοποιήστε την ενοποιημένη ρίζα πύλης Anthropic για το Claude Code. Μην προσαρτήσετε `/v1` εδώ.

**Δοκιμή:** `claude "say hello"`

---

#### OpenAI Codex

Το σύγχρονο Codex (v0.137+) διαβάζει μόνο το `~/.codex/config.toml` — το παλιό
`config.yaml` ανήκει στο παλαιό npm CLI και αγνοείται σιωπηλά. Το κλειδί API
παραμένει στη μεταβλητή περιβάλλοντος `OMNIROUTE_API_KEY` (`env_key`), ποτέ
μέσα στο αρχείο:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Πλήρης αναφορά (προφίλ, `wire_api`, παράθυρα περιβάλλοντος): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Δοκιμή:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Δοκιμή:** `opencode`

> Χρησιμοποιήστε `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> για αποστολή παραλλαγών thinking.

---

#### Cline (CLI ή VS Code)

**Λειτουργία CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Λειτουργία VS Code:**
Ρυθμίσεις επέκτασης Cline → Πάροχος API: `OpenAI Compatible` → Βασική URL: `http://localhost:20128/v1`

Ή χρησιμοποιήστε το dashboard OmniRoute → **CLI Tools → Cline → Apply Config**.

---

#### KiloCode (CLI ή VS Code)

**Λειτουργία CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Ρυθμίσεις VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Ή χρησιμοποιήστε το dashboard OmniRoute → **CLI Tools → KiloCode → Apply Config**.

---

#### Continue (Επέκταση VS Code)

Επεξεργαστείτε το `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Επανεκκινήστε το VS Code μετά την επεξεργασία.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Χρησιμοποιήστε αυτό όταν το VS Code Insiders είναι διαμορφωμένο για μοντέλα προσαρμοσμένου τερματικού σημείου και θέλετε το OmniRoute να λειτουργεί χωρίς προσαρμοσμένο πεδίο κεφαλίδας.

**Προτεινόμενη τοποθεσία:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Παράδειγμα με χρήση του διακριτικού ψευδωνύμου OmniRoute:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Σημειώσεις:**

- Αντικαταστήστε το `sk-your-omniroute-key` με ένα κλειδί API που δημιουργήθηκε στο OmniRoute.
- Το πεδίο `url` πρέπει να δείχνει στο `/api/v1/vscode/{token}/chat/completions`.
- Το πεδίο `modelsUrl` πρέπει να δείχνει στο `/api/v1/vscode/{token}/models`.
- Προτιμήστε την κανονική ροή `/v1` + κεφαλίδα Bearer όταν ο client υποστηρίζει προσαρμοσμένες κεφαλίδες.
- Τα διακριτικά ενσωματωμένα σε URL αποτελούν εναλλακτική συμβατότητας και ενδέχεται να εμφανιστούν σε αρχεία καταγραφής επεξεργαστή ή ιστορικό διακομιστή μεσολάβησης.

---

#### Kiro CLI (Amazon)

```bash
# Σύνδεση στον λογαριασμό σας AWS/Kiro:
kiro-cli login

# Το CLI χρησιμοποιεί τη δική του αυθεντικοποίηση — το OmniRoute δεν απαιτείται ως backend για το ίδιο το Kiro CLI.
# Χρησιμοποιήστε το kiro-cli παράλληλα με το OmniRoute για άλλα εργαλεία.
kiro-cli status
```

Για την επιτραπέζια εφαρμογή **Kiro IDE**, χρησιμοποιήστε το τερματικό σημείο MITM που εκθέτει το OmniRoute
στο `/dashboard/cli-tools → Kiro`.

---

## 10. Εσωτερικό CLI του OmniRoute

Το δυαδικό αρχείο `omniroute` παρέχει εντολές για τον κύκλο ζωής του διακομιστή, τη ρύθμιση, τη διαγνωστική ανάλυση και τη διαχείριση παρόχων. Σημείο εισόδου: `bin/omniroute.mjs`.

```bash
omniroute                              # Εκκίνηση διακομιστή (προεπιλεγμένη θύρα 20128)
omniroute setup                        # Διαδραστικός οδηγός ρύθμισης
omniroute doctor                       # Έλεγχος διαμόρφωσης, βάσης δεδομένων, θυρών, χρόνου εκτέλεσης
omniroute providers list               # Διαμορφωμένες συνδέσεις παρόχων
omniroute providers test-all           # Δοκιμή κάθε ενεργής σύνδεσης
omniroute reset-password               # Επαναφορά του κωδικού πρόσβασης διαχειριστή
omniroute logs                         # Ροή αρχείων καταγραφής αιτημάτων
omniroute health                       # Λεπτομερής κατάσταση υγείας (breakers, cache, μνήμη)
omniroute --version                    # Εκτύπωση έκδοσης
omniroute --help                       # Εμφάνιση όλων των εντολών
```

### Ρύθμιση & Αρχικοποίηση

```bash
omniroute setup                        # Διαδραστικός οδηγός ρύθμισης
omniroute setup --non-interactive      # Λειτουργία CI/αυτοματισμού (διαβάζει μεταβλητές περιβάλλοντος + flags)
omniroute setup --password '<value>'   # Άμεση ορισμός κωδικού πρόσβασης διαχειριστή
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Προσθήκη και δοκιμή παρόχου σε ένα βήμα
```

Αναγνωρισμένες μεταβλητές περιβάλλοντος για μη διαδραστική ρύθμιση:

| Μεταβλητή           | Σκοπός                                                                  |
| ------------------- | ----------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Κλειδί API παρόχου (συνδεδεμένο με `--api-key` μέσω Commander `.env()`) |
| `DATA_DIR`          | Παράκαμψη του καταλόγου δεδομένων του OmniRoute                         |

Όλες οι άλλες μη διαδραστικές εισόδοι μεταβιβάζονται ως flags, όχι ως μεταβλητές περιβάλλοντος:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(βλέπε τις επιλογές `omniroute setup` παραπάνω).

### Διαγνωστική Ανάλυση

```bash
omniroute doctor                       # Έλεγχος διαμόρφωσης, βάσης δεδομένων, θυρών, χρόνου εκτέλεσης, μνήμης, liveness
omniroute doctor --json                # Αναγνώσιμο από μηχανή JSON
omniroute doctor --no-liveness         # Παράλειψη του HTTP health probe
omniroute doctor --host 0.0.0.0        # Παράκαμψη host liveness
omniroute doctor --liveness-url <url>  # Πλήρης παράκαμψη URL τελικού σημείου υγείας
```

Το doctor εκτελεί τους εξής ελέγχους: `Config`, `Database`, `Storage/encryption`,
`Port availability`, `Node runtime`, `Native binary` (better-sqlite3),
`Memory` και `Server liveness`. Τερματίζει με μη μηδενική τιμή αν οποιοσδήποτε έλεγχος αποτύχει (`fail`).

### Διαχείριση Παρόχων

```bash
omniroute providers available                       # Κατάλογος παρόχων OmniRoute
omniroute providers available --search openai       # Φιλτράρισμα καταλόγου κατά id/name/alias/category
omniroute providers available --category api-key    # Φιλτράρισμα κατά κατηγορία (api-key, oauth, free, ...)
omniroute providers available --json                # Αναγνώσιμο από μηχανή JSON

omniroute providers list                            # Διαμορφωμένες συνδέσεις παρόχων
omniroute providers list --json

omniroute providers test <id|name>                  # Δοκιμή μίας διαμορφωμένης σύνδεσης
omniroute providers test-all                        # Δοκιμή κάθε ενεργής σύνδεσης
omniroute providers validate                        # Τοπική μόνο δομική επικύρωση
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Υπάρχουσα ροή OAuth
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

Τα `providers add/import/auth/edit/remove` είναι API-first και επομένως λειτουργούν έναντι
του ενεργού τοπικού ή απομακρυσμένου context. Η εισαγωγή διαπιστευτηρίων πρέπει να χρησιμοποιεί
`--credential-stdin` ή `--credential-env`· το `--dry-run --json` αναφέρει μόνο
τη συγκαλυμμένη παρουσία/μορφή. Το `providers available` διαβάζει τον κατάλογο OmniRoute·
τα `providers list/test/test-all/validate` διατηρούν την τοπική τους συμπεριφορά SQLite και
δεν απαιτούν τον διακομιστή να εκτελείται.

### Ανάκτηση & Επαναφορά

```bash
omniroute reset-password                # Επαναφορά του κωδικού πρόσβασης διαχειριστή (επίσης: omniroute-reset-password)
omniroute reset-encrypted-columns       # Εμφάνιση προειδοποίησης + dry-run για επαναφορά κρυπτογραφημένων διαπιστευτηρίων
omniroute reset-encrypted-columns --force  # Πραγματική μηδένιση κρυπτογραφημένων διαπιστευτηρίων στο SQLite
```

### Εξαγωγή Διαπιστευτηρίων (⚠ χειριστείτε με προσοχή)

```bash
omniroute auth export                                 # Εμφάνιση προειδοποίησης + gate επιβεβαίωσης — χωρίς πρόσβαση στη βάση δεδομένων
omniroute auth export --force                          # Εξαγωγή ΑΠΟΚΡΥΠΤΟΓΡΑΦΗΜΕΝΩΝ διαπιστευτηρίων ΟΛΩΝ των συνδέσεων στο stdout ως JSON
omniroute auth export --force --id <id>                 # Εξαγωγή μόνο της αντίστοιχης σύνδεσης
omniroute auth export --force --format env               # Εκπομπή γραμμών OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Εγγραφή σε αρχείο (δημιουργείται με δικαιώματα 0600)
```

Το `auth export` είναι **τοπικό μόνο** (άμεση ανάγνωση SQLite, χωρίς HTTP route) και σκόπιμα εκτυπώνει/γράφει
**απλό κείμενο** για τιμές `apiKey`/`accessToken`/`refreshToken`/`idToken` — αυτό είναι το χαρακτηριστικό, όχι
σφάλμα. Τίποτα δεν διαβάζεται από τη βάση δεδομένων και τίποτα δεν αποκρυπτογραφείται χωρίς `--force`. Ένα προειδοποιητικό banner στο stderr εκτυπώνεται πάντα πριν εκπεμφθεί οποιοδήποτε απλό κείμενο. Απαιτεί τη ρύθμιση του `STORAGE_ENCRYPTION_KEY`. Ένα πεδίο που αποτυγχάνει να αποκρυπτογραφηθεί (παλιό κλειδί, κατεστραμμένο ciphertext) αναφέρεται ως
`<field>DecryptFailed: true` αντί να ακυρώσει ολόκληρη την εξαγωγή ή να αποκαλύψει το υποκείμενο σφάλμα.

### Άλλες υποεντολές

Αυτές προϋποθέτουν έναν διακομιστή OmniRoute σε λειτουργία, εκτός αν αναφέρεται διαφορετικά:

```bash
omniroute status                       # Ολοκληρωμένη κατάσταση χρόνου εκτέλεσης
omniroute logs                         # Ροή αρχείων καταγραφής αιτημάτων (--json, --search, --follow)
omniroute config show                  # Εμφάνιση τρέχουσας διαμόρφωσης

omniroute provider list                # Λίστα διαθέσιμων παρόχων (ψευδώνυμο του providers list)
omniroute provider add                 # Καταχώριση OmniRoute ως παρόχου σε ένα εργαλείο
omniroute keys add | list | remove     # Διαχείριση κλειδιών API
omniroute models [provider]            # Λίστα μοντέλων (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Στιγμιότυπο διαμόρφωσης + βάσης δεδομένων
omniroute restore                      # Επαναφορά από προηγούμενο στιγμιότυπο

omniroute health                       # Λεπτομερής κατάσταση υγείας (breakers, cache, μνήμη)
omniroute quota                        # Χρήση ορίου παρόχου
omniroute cache                        # Κατάσταση cache
omniroute cache clear                  # Εκκαθάριση semantic + signature caches

omniroute mcp status | restart         # Κατάσταση / επανεκκίνηση διακομιστή MCP
omniroute a2a status | card            # Κατάσταση διακομιστή A2A / agent card

omniroute tunnel list | create | stop  # Διαχείριση tunnels (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Επιθεώρηση / ορισμός μεταβλητών περιβάλλοντος (προσωρινά)

omniroute test                         # Δοκιμή σύνδεσης παρόχου (smoke test)
omniroute update                       # Έλεγχος για ενημερώσεις
omniroute completion                   # Δημιουργία συμπλήρωσης shell
```

### Κοινά flags

| Flag                | Περιγραφή                                                            |
| ------------------- | -------------------------------------------------------------------- |
| `--no-open`         | Χωρίς αυτόματο άνοιγμα του προγράμματος περιήγησης κατά την εκκίνηση |
| `--port <n>`        | Παράκαμψη της θύρας API (προεπιλογή 20128)                           |
| `--mcp`             | Εκτέλεση ως διακομιστής MCP μέσω stdio (για IDE)                     |
| `--non-interactive` | Λειτουργία CI (χωρίς prompts· διαβάζει από env/flags)                |
| `--json`            | Αναγνώσιμη από μηχανή JSON έξοδος (doctor, providers κ.λπ.)          |
| `--help`, `-h`      | Εμφάνιση βοήθειας για συγκεκριμένη εντολή                            |
| `--version`, `-v`   | Εκτύπωση της εγκατεστημένης έκδοσης                                  |

---

## Διαθέσιμα Endpoints API

| Endpoint                   | Περιγραφή                           | Χρήση για                        |
| -------------------------- | ----------------------------------- | -------------------------------- |
| `/v1/chat/completions`     | Τυπική συνομιλία (όλοι οι πάροχοι)  | Όλα τα σύγχρονα εργαλεία         |
| `/v1/responses`            | Responses API (μορφή OpenAI)        | Codex, agentic workflows         |
| `/v1/completions`          | Παλαιού τύπου ολοκληρώσεις κειμένου | Παλαιότερα εργαλεία με `prompt:` |
| `/v1/embeddings`           | Ενσωματώσεις κειμένου               | RAG, αναζήτηση                   |
| `/v1/images/generations`   | Δημιουργία εικόνας                  | GPT-Image, Flux, κ.λπ.           |
| `/v1/audio/speech`         | Κείμενο σε ομιλία                   | ElevenLabs, OpenAI TTS           |
| `/v1/audio/transcriptions` | Ομιλία σε κείμενο                   | Deepgram, AssemblyAI             |

Έτοιμα παραδείγματα για επικόλληση με tokenized URL OmniRoute:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standard OpenAI base: http://localhost:20128/v1
VS Code models: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tags: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Αντιμετώπιση προβλημάτων

| Σφάλμα                                                     | Αιτία                                       | Επίλυση                                                    |
| ---------------------------------------------------------- | ------------------------------------------- | ---------------------------------------------------------- |
| `Connection refused`                                       | Το OmniRoute δεν εκτελείται                 | `omniroute serve`                                          |
| `401 Unauthorized`                                         | Λανθασμένο κλειδί API                       | Ελέγξτε στο `/dashboard/api-manager`                       |
| `No combo configured`                                      | Δεν υπάρχει ενεργός συνδυασμός δρομολόγησης | Ρυθμίστε στο `/dashboard/combos`                           |
| Το CLI εμφανίζει "not installed"                           | Το εκτελέσιμο δεν βρίσκεται στο PATH        | Ελέγξτε με `which <command>`                               |
| Το Dashboard εμφανίζει "not detected" μετά την εγκατάσταση | Η κρυφή μνήμη είναι παλιά                   | Κάντε κλικ στο "⟳ Refresh detection" στο dashboard         |
| Παλιός σύνδεσμος `/dashboard/cli-tools`                    | Σελιδοδείκτης προ v3.8.6                    | Ανακατευθύνεται αυτόματα στο `/dashboard/cli-code` (308)   |
| Παλιός σύνδεσμος `/dashboard/agents`                       | Σελιδοδείκτης προ v3.8.6                    | Ανακατευθύνεται αυτόματα στο `/dashboard/acp-agents` (308) |
