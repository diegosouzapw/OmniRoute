# CLI-INTEGRATIONS (Ελληνικά)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "Ενσωματώσεις CLI — συνδέστε οποιοδήποτε coding CLI με το OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Ενσωματώσεις CLI

Το OmniRoute παρέχει μια οικογένεια εντολών `setup-*` που διαμορφώνουν ένα coding
CLI (Codex, Claude Code, OpenCode, Cline, …) ώστε να χρησιμοποιεί το OmniRoute ως backend — έτσι
το εργαλείο επικοινωνεί με **ένα** endpoint και το OmniRoute δρομολογεί στον κατάλληλο πάροχο με
αυτόματη εναλλαγή σε εφεδρικό. Κάθε εντολή διαβάζει τον **ενεργό** κατάλογο μοντέλων από ένα τρέχον
OmniRoute (τοπικό ή απομακρυσμένο) και γράφει το δικό του αρχείο ρυθμίσεων του εργαλείου στη **δική σας**
μηχανή. Το κλειδί API αναφέρεται μέσω μεταβλητής περιβάλλοντος παντού όπου το εργαλείο
το υποστηρίζει. Οι εντολές που διατηρούν ένα τοπικό αρχείο περιβάλλοντος για το εργαλείο σημειώνονται παρακάτω.

Υπάρχει επίσης ένας γενικός εκκινητής — `omniroute run <target>` — που εκκινεί
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ή `gemini` με το
κατάλληλο περιβάλλον ενσωματωμένο, χωρίς να γράφει καμία ρύθμιση. Οι στόχοι και τα ψευδώνυμά τους
προέρχονται από το κανονικό manifest `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), και το `omniroute completion` προσφέρει τις
ίδιες λέξεις-στόχους που προέρχονται από το manifest. Οι παλαιοί εκκινητές ανά εργαλείο —
`omniroute launch` (Claude Code) και `omniroute launch-codex` (Codex) — παραμένουν
διαθέσιμοι.

Η ενεργοποίηση παρόχου είναι διαθέσιμη από το ίδιο τοπικό/απομακρυσμένο πλαίσιο. Οι
εντολές με προτεραιότητα στο API παρακάτω διατηρούν τη διαχείριση πιστοποίησης χωριστά από τα
διαπιστευτήρια παρόχου και δεν εκτυπώνουν ποτέ ένα διαπιστευτήριο σε δομημένη έξοδο:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Για scripts, προτιμήστε `--credential-stdin` ή `--credential-env`· το `--credential`
διατηρείται για ελεγχόμενη τοπική χρήση. Το `providers remove` απαιτεί `--yes` σε
μη-διαδραστικό τερματικό, και και οι πέντε εντολές λαμβάνουν υπόψη το ενεργό πλαίσιο ή τις
γενικές επιλογές `--base-url`/`--api-key`.

Για την εφάπαξ, χειροκίνητη βασική ρύθμιση των δύο πλουσιότερων ενσωματώσεων, δείτε τις
λεπτομερείς αναλύσεις ανά εργαλείο:

- [Ρύθμιση Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Ρύθμιση Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Απομακρυσμένη λειτουργία](./REMOTE-MODE.md) — χειριστείτε ένα απομακρυσμένο OmniRoute (VPS / Tailnet) από το laptop σας
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — η επέκταση OmniCopilot· μπορεί επίσης να εκτελέσει αυτές τις
  εντολές `setup-*` για εσάς μέσα από τον επεξεργαστή

---

## Κύριος πίνακας

Κάθε εντολή λαμβάνει υπόψη το **ενεργό πλαίσιο** (ορίζεται με `omniroute connect`, δείτε
[Απομακρυσμένη λειτουργία](./REMOTE-MODE.md)) ή ρητές επισημάνσεις `--remote <url> --api-key <key>`.
Το «Τοπικό έναντι απομακρυσμένου» παρακάτω σημαίνει: χωρίς επισημάνσεις στοχεύει το `http://localhost:20128`·
με `--remote` (ή ενεργό απομακρυσμένο πλαίσιο) ανακτά τον κατάλογο από αυτόν τον
διακομιστή και γράφει τη ρύθμιση τοπικά.

| Εντολή                     | Εργαλείο                           | Τι γράφει                                                                                                                                                                                                | Βασικές επισημάνσεις                                                                                                                       | Τοπικό έναντι απομακρυσμένου |
| -------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                   | `~/.codex/<name>.config.toml` — ένα προφίλ ανά συμβατό μοντέλο κειμένου (`codex --profile <name>`)                                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Και τα δύο                   |
| `omniroute setup-claude`   | Claude Code                        | `~/.claude/profiles/<name>/settings.json` — ένα προφίλ ανά αντιστοιχισμένο μοντέλο (`CLAUDE_CONFIG_DIR`)                                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Και τα δύο                   |
| `omniroute setup-opencode` | OpenCode (openai-compatible)       | `~/.config/opencode/opencode.json` — πάροχος `omniroute` με κάθε μοντέλο καταλόγου (`opencode -m omniroute/<model>`)                                                                                     | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Και τα δύο                   |
| `omniroute setup-cline`    | Cline                              | `~/.cline/data/{globalState,secrets}.json` (λειτουργία CLI) + εκτυπώνει ρυθμίσεις επέκτασης VS Code                                                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Και τα δύο                   |
| `omniroute setup-kilo`     | Kilo Code                          | `~/.local/share/kilo/auth.json` (CLI) + συγχωνεύει το `kilocode.*` στο `settings.json` του VS Code αν υπάρχει                                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Και τα δύο                   |
| `omniroute setup-continue` | Continue / `cn` CLI                | `~/.continue/config.yaml` — μοντέλα `provider: openai`, κλειδί μέσω `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Και τα δύο                   |
| `omniroute setup-cursor`   | Cursor                             | Τίποτα — εκτυπώνει τα βήματα εντός εφαρμογής (η ρύθμιση Cursor είναι αδιαφανές SQLite)                                                                                                                   | `--remote` `--api-key` `--only` `--port`                                                                                                   | Και τα δύο                   |
| `omniroute setup-roo`      | Roo Code                           | `~/.omniroute/roo-settings.json` (έγγραφο εισαγωγής) + ορίζει `roo-cline.autoImportSettingsPath` αν υπάρχει `settings.json` του VS Code                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Και τα δύο                   |
| `omniroute setup-crush`    | Crush                              | `~/.config/crush/crush.json` — πάροχος `openai-compat`, κλειδί μέσω `$OMNIROUTE_API_KEY`                                                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Και τα δύο                   |
| `omniroute setup-goose`    | Goose                              | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + εκτυπώνει συνταγή env                                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Και τα δύο                   |
| `omniroute setup-aider`    | Aider                              | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + εκτυπώνει συνταγή env                                                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Και τα δύο                   |
| `omniroute setup-qwen`     | Qwen Code                          | `~/.qwen/settings.json` — πίνακας V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` στο `~/.qwen/.env`                                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Και τα δύο                   |
| `omniroute setup-5dive`    | 5dive (στόλος πρακτόρων)           | Τίποτα κάτω από `$HOME` — γράφει ένα **προφίλ ελέγχου ταυτότητας** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) μέσω `5dive agent auth set`· μόνο root, εκτελείται στον κεντρικό υπολογιστή του στόλου | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Και τα δύο                   |
| `omniroute run <target>`   | Εκκίνηση χρόνου εκτέλεσης (γενική) | Τίποτα — εκκινεί `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` με το κατάλληλο περιβάλλον και ορίσματα· Qwen και Gemini χρησιμοποιούν προσωρινό απομονωμένο home                           | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Και τα δύο                   |
| `omniroute launch`         | Claude Code                        | Τίποτα — εκκινεί `claude` με `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` ενσωματωμένα                                                                                                                    | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Και τα δύο                   |
| `omniroute launch-codex`   | OpenAI Codex CLI                   | Τίποτα — εκκινεί `codex` με τον πάροχο `omniroute` ενσωματωμένο μέσω επισημάνσεων `-c`                                                                                                                   | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Και τα δύο                   |

Σημειώσεις για τις επισημάνσεις (επαληθευμένες στην πηγή εντολών):

- `--remote <url>` — ανάκτηση του καταλόγου από ένα απομακρυσμένο OmniRoute (παρακάμπτει `--port`
  και το ενεργό πλαίσιο). Το `--api-key <key>` παρέχει το διαπιστευτήριο για αυτόν τον
  διακομιστή (προεπιλογή στη μεταβλητή περιβάλλοντος `OMNIROUTE_API_KEY` ή στο token του ενεργού πλαισίου).
- `--only <patterns>` — υποσυμβολοσειρές διαχωρισμένες με κόμμα· διατηρεί μόνο τα αναγνωριστικά μοντέλων που ταιριάζουν
  (π.χ. `--only glm,kimi`). Διαθέσιμο στα `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — εκτυπώνει ακριβώς αυτό που θα γραφόταν χωρίς να αγγίξει το
  σύστημα αρχείων. Διαθέσιμο σε κάθε εντολή `setup-*` **εκτός** από `setup-cursor`
  (που δεν γράφει ποτέ αρχείο).
- `--model <id>` — απαιτείται (ή επιλέγεται διαδραστικά) για τα εργαλεία που δεν έχουν
  αυτόματη ανακάλυψη μοντέλου: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Αυτά τα εργαλεία
  αποδέχονται επίσης `--yes` για μη-διαδραστικές εκτελέσεις (που τότε απαιτούν `--model`).
  Το `setup-opencode` δέχεται `--model` για να ορίσει το προεπιλεγμένο μοντέλο ανώτατου επιπέδου.
- Το `--model <id>` στο `omniroute run` ακολουθεί την καλωδίωση ανά στόχο του manifest
  (`bin/cli/cli-manifest.mjs`): το **aider** λαμβάνει `--model openai/<id>` και
  το **opencode** `--model omniroute/<id>` (το πρόθεμα προστίθεται μόνο όταν το id
  δεν το φέρει ήδη)· το **qwen** και το **gemini** λαμβάνουν το id αυτούσιο·
  το **claude** το λαμβάνει μέσω `ANTHROPIC_MODEL`, το **goose** μέσω `GOOSE_MODEL`, και
  το **codex** μέσω ορισμάτων `-c model_providers.omniroute.*`. **Το Qwen είναι ο μόνος στόχος εκτέλεσης
  που απαιτεί υποχρεωτικά `--model`** — το `omniroute run qwen` χωρίς αυτό τερματίζει
  με `2` και ρητό μήνυμα σφάλματος.
- `--port <port>` — τοπική θύρα OmniRoute (προεπιλογή `20128`, αγνοείται όταν ορίζεται `--remote`).
  Υπάρχει σε όλες τις εντολές `setup-*` και σε αμφότερους τους εκκινητές.
- Κωδικοί εξόδου `omniroute run`: ο δικός του κωδικός εξόδου του child CLI διαδίδεται
  αυτούσιος· `2` = μη έγκυρα ορίσματα (μη υποστηριζόμενος στόχος, ελλείπον απαιτούμενο
  `--model`, φρουρός container)· `127` = το δυαδικό του στόχου δεν βρίσκεται στο `PATH`·
  `130`/`143`/`129` όταν η εκκίνηση τερματιστεί από `SIGINT`/`SIGTERM`/`SIGHUP`·
  `1` = άλλη αποτυχία εκκίνησης χρόνου εκτέλεσης.
- Οι δύο εκκινητές (`launch`, `launch-codex`) αποδέχονται `--profile <name>` για να επιλέξουν
  ένα προφίλ που έχει γραφεί από `setup-claude` / `setup-codex`, καθώς και ορίσματα διέλευσης για
  το υποκείμενο δυαδικό `claude` / `codex`.

Ο διαδραστικός επιλογέας μοιράζεται επίσης από τις συνταγές ρύθμισης:

```bash
# Επιλογή από τον ενεργό τοπικό ή απομακρυσμένο κατάλογο μοντέλων και ρύθμιση του στόχου.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Το `configure` αναθέτει αυτή τη στιγμή στις δοκιμασμένες συνταγές για `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` και `5dive`.
Καταχωρίσεις καταλόγου μόνο για IDE,
MITM και αποκλειστικά-οδηγών παραμένουν ρητές ροές `setup-*`/χειροκίνητες και
δεν παρουσιάζονται ως εκκινήσιμοι στόχοι.

> Το `setup-opencode` είναι η **ελαφριά openai-compatible** ενσωμάτωση OpenCode.
> Υπάρχει επίσης μια πλουσιότερη ενσωμάτωση plugin — `omniroute setup opencode` — που
> εγκαθιστά το `@omniroute/opencode-plugin`. Είναι διαφορετικές εντολές· ο πίνακας
> παραπάνω τεκμηριώνει το `setup-opencode`.

---

## Τοπική χρήση

Με το OmniRoute να τρέχει στο `localhost:20128`, απλώς εκτελέστε την εντολή ρύθμισης για το εργαλείο σας. Ο κατάλογος ανακτάται από τον τοπικό διακομιστή.

```bash
# Codex: γράψε ένα προφίλ για κάθε αντιστοιχισμένο μοντέλο στο ~/.codex/
omniroute setup-codex
codex --profile glm52            # χρήση ενός παραγόμενου προφίλ

# Claude Code: γράψε προφίλ ανά μοντέλο, έπειτα εκκίνησε ένα
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: γράψε τον πάροχο συμβατό με openai με όλα τα μοντέλα του καταλόγου
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # αναφέρεται μέσω {env:OMNIROUTE_API_KEY}, ποτέ σε δίσκο
opencode -m omniroute/glm/glm-5.2 "..."

# Εργαλεία χωρίς αυτόματη ανακάλυψη χρειάζονται ρητό μοντέλο:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Προεπισκόπηση χωρίς εγγραφή οτιδήποτε:
omniroute setup-continue --dry-run
```

Εκκίνηση χωρίς εγγραφή καμίας ρύθμισης παραμέτρων (μόνο έγχυση μεταβλητών περιβάλλοντος):

```bash
omniroute launch                 # Claude Code → τοπικό OmniRoute
omniroute launch-codex           # Codex CLI → τοπικό OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Ρητή διαδρομή εντολής: διαβίβασε ό,τι ακολουθεί μετά το --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Απομακρυσμένη χρήση

Κατευθύνετε οποιαδήποτε εντολή ρύθμισης σε ένα απομακρυσμένο OmniRoute με `--remote` + `--api-key`. Ο κατάλογος ανακτάται από το απομακρυσμένο σύστημα· η ρύθμιση παραμέτρων εγγράφεται στον τοπικό σας υπολογιστή.

```bash
# OpenCode σε απομακρυσμένο VPS, διατήρησε μόνο μοντέλα glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # εκτελέστε πρώτα export OMNIROUTE_API_KEY

# Προφίλ Codex από απομακρυσμένο κατάλογο
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Εκκίνηση CLI απευθείας έναντι του απομακρυσμένου συστήματος
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Αντί να περνάτε `--remote`/`--api-key` κάθε φορά, συνδεθείτε μία φορά και αφήστε το
**ενεργό πλαίσιο** να τα παρέχει αυτόματα:

```bash
omniroute connect 192.168.0.15        # δημιουργεί διακριτό token, αποθηκεύει το πλαίσιο
omniroute setup-codex                 # ← χρησιμοποιεί πλέον τον απομακρυσμένο κατάλογο
omniroute setup-opencode              # ← το ίδιο
omniroute launch                      # ← Claude Code έναντι του απομακρυσμένου
```

Δείτε το [Remote Mode](./REMOTE-MODE.md) για πλαίσια, εμβέλειες και διαχείριση token.

---

## Στόλοι πρακτόρων 5dive

Το [5dive](https://5dive.ai) εκτελεί έναν στόλο από μακροχρόνιους πράκτορες κωδικοποίησης, ο καθένας σαν μονάδα systemd κάτω από τον δικό του χρήστη Unix. Δεν είναι το ίδιο CLI κωδικοποίησης, οπότε δεν υπάρχει τίποτα για να εκκινήσει το `omniroute run` — το `5dive` είναι στόχος **μόνο ρύθμισης παραμέτρων**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Και οι δύο μορφές γράφουν ένα **προφίλ ταυτοποίησης** 5dive, και κάθε θέση `claude` συνδεδεμένη με αυτό το προφίλ επικοινωνεί στη συνέχεια με το OmniRoute. Τρία πράγματα είναι ειδικά για αυτόν τον στόχο:

- **Εκτελείται στον κεντρικό υπολογιστή του στόλου, ως root.** Τα ρήματα του 5dive ενεργούν σε τοπικές μονάδες systemd και σε έναν κατάλογο κατάστασης ιδιοκτησίας root· δεν υπάρχει απομακρυσμένη λειτουργία. Η συνταγή επανεκτελείται μέσω `sudo` όταν δεν είναι ήδη root (`--no-sudo` το απενεργοποιεί αυτό και εκτυπώνει την εντολή).
- **Το endpoint πρέπει να είναι `https://` εκτός αν είναι loopback.** Το κλειδί API του πράκτορα μεταφέρεται μέσω αυτής της URL σε κάθε αίτημα, και το 5dive αρνείται ένα endpoint εκτός κουτιού σε απλό κείμενο. Μια ιδιωτική διεύθυνση LAN δεν αποτελεί εξαίρεση.
- **Το δικό του καρφίτσωμα μοντέλου κάθε θέσης υπερισχύει του προφίλ.** Το προφίλ φέρει `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, αλλά μια θέση που παραμένει καρφιτσωμένη σε ένα stock αναγνωριστικό μοντέλου αποτυγχάνει στην πρώτη της σειρά με _"There's an issue with the selected model"_. Περάστε `--agent <name>` (επαναλαμβανόμενο) για να καρφιτσώσετε και τις θέσεις· η συνταγή εκτυπώνει την εντολή όταν δεν το κάνετε.

Το κλειδί API παραδίδεται στο 5dive μέσω **stdin** (`--api-key=-`), οπότε δεν εμφανίζεται ποτέ στην έξοδο `ps`.

Η κατεύθυνση του προφίλ σε ένα **combo** OmniRoute αντί για ένα μοναδικό μοντέλο είναι αυτό που παρέχει την εφεδρεία παρόχου στον στόλο: όταν το κύριο endpoint κατέρρευσε πλήρως στη μέση μιας σειράς στην εκτέλεση που καταγράφηκε στο
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), ο πράκτορας ολοκλήρωσε τα υπόλοιπα βήματά του στο εφεδρικό σύστημα και δεν ανέδειξε ποτέ τη διακοπή.

## Συμβάσεις βασικού URL (ποια εργαλεία θέλουν `/v1`)

Το OmniRoute εκθέτει την επιφάνεια OpenAI στο `/v1`, την επιφάνεια Anthropic στη ρίζα,
και μια εγγενή επιφάνεια Gemini στο `/v1beta`. Κάθε ενσωμάτωση είναι συνδεδεμένη με τη μορφή που
αναμένει το αντίστοιχο εργαλείο (επαληθεύτηκε στον πηγαίο κώδικα των εντολών):

| Ενσωμάτωση                                                                 | Βασικό URL που γράφεται | `/v1`?                                            |
| -------------------------------------------------------------------------- | ----------------------- | ------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | ρίζα                    | Όχι — το Cline προσθέτει `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | ρίζα                    | Όχι — το Goose προσθέτει το path                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | ρίζα                    | Όχι — το LiteLLM προσθέτει `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | με `/v1`                | Ναι                                               |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | ρίζα                    | Όχι — το Claude Code προσθέτει `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | με `/v1`                | Ναι                                               |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | με `/v1`                | Ναι                                               |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | ρίζα                    | Όχι — το SDK προσθέτει `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` στο προφίλ ελέγχου ταυτότητας)         | ρίζα                    | Όχι — το Claude Code προσθέτει `/v1/messages`     |

---

## Διατήρηση εγγενών εξαρτήσεων κατά την ενημέρωση: `--include=optional`

Όταν ενημερώνετε με `omniroute update` (αφού επιβεβαιώσετε, ή με `--apply`),
το OmniRoute εκτελεί την εγκατάσταση με το `--include=optional` ενσωματωμένο:

```bash
npm install -g omniroute@latest --include=optional
```

Αυτή **δεν** είναι μια σημαία που περνάτε στο `omniroute update` — εφαρμόζεται πάντα από τον
updater. Εγγυάται ότι τα `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, η στοίβα LLMLingua SLM) επιβιώνουν της ενημέρωσης ακόμα και αν η διαμόρφωση npm
έχει `omit=optional` ορισμένο, κάτι που διαφορετικά θα απέρριπτε αθόρυβα το εγγενές πρόγραμμα
οδήγησης SQLite και τη σύνδεση OS-keyring. Για προεπισκόπηση της ακριβούς εντολής χωρίς εφαρμογή:

```bash
omniroute update --dry-run
# [DRY RUN] Θα εκτελούσε: npm install -g omniroute@latest --include=optional
```

Άλλες σημαίες του `omniroute update` (επαληθεύτηκαν στον πηγαίο κώδικα): `--check` (έξοδος με 1 αν
είναι παρωχημένο), `--apply` (εγκατάσταση χωρίς προτροπή), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI μέσω `omniroute run gemini`

Η σύμβαση επαληθεύτηκε με `@google/gemini-cli` 0.50.0: το CLI τιμά τη μεταβλητή
`GOOGLE_GEMINI_BASE_URL` και εκδίδει `POST /v1beta/models/<model>:generateContent`
(και `:streamGenerateContent?alt=sse`) προς αυτήν — ακριβώς η εγγενής επιφάνεια Gemini του OmniRoute (`/v1beta`). Το `omniroute run gemini` το συνδέει αυτόματα:

- `GOOGLE_GEMINI_BASE_URL` → το ενεργό βασικό URL του OmniRoute (ρίζα, χωρίς `/v1`);
- `GEMINI_API_KEY` → τα επιλυμένα διαπιστευτήρια OmniRoute (option/env/context);
- ένα **προσωρινό απομονωμένο `GEMINI_CLI_HOME`** του οποίου το `.gemini/settings.json`
  επιλέγει ελέγχο ταυτότητας `gemini-api-key`, ώστε μια αποθηκευμένη συνεδρία Google OAuth (Code Assist)
  να μην παρακάμψει ποτέ την κατευθυνόμενη από το OmniRoute εκκίνηση — αφαιρείται μετά την έξοδο;
- **υγιεινή env**: το περιβάλλον του θυγατρικού διεργασίας καθαρίζεται από `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` και `GOOGLE_GENAI_USE_GCA` (που θα ανακατεύθυναν τον έλεγχο ταυτότητας στο Vertex/Code Assist), και το `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` ορίζεται ως εφεδρική ασφάλεια — οι υπόλοιποι στόχοι `run` λαμβάνουν την ίδια μεταχείριση για τις δικές τους αντικρουόμενες μεταβλητές;
- έγχυση `--model <id>` από `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Η προστασία workspace-trust του Gemini ισχύει ακόμα σε headless λειτουργία — περάστε
`--skip-trust` (ή εμπιστευτείτε τον κατάλογο διαδραστικά) μόνοι σας· ο launcher
σκόπιμα δεν την παρακάμπτει. Αυτός ο launcher διαφέρει από την **εγγραφή ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), η οποία παραμένει η ενσωμάτωση πρωτοκόλλου
πράκτορα για το `/dashboard/acp-agents`.

---

## Πραγματικό smoke sweep (κατ' επιλογή)

Οι ντετερμινιστικές εκτελέσεις παλινδρόμησης του πλάνου εκκίνησης γίνονται στο CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Για την επικύρωση των ΠΡΑΓΜΑΤΙΚΩΝ δυαδικών αρχείων έναντι ενός ΠΡΑΓΜΑΤΙΚΟΥ
διακομιστή OmniRoute, υπάρχει ένα κατ' επιλογή harness στο
`tests/integration/upstream-cli-smoke.int.test.ts`. Δεν εκτελείται ποτέ αυτόματα
(κάθε υπο-δοκιμή παραλείπεται εκτός αν `RUN_CLI_SMOKE=1`), διαβιβάζει τα διαπιστευτήρια μέσω ΟΝΟΜΑΤΟΣ
μεταβλητής περιβάλλοντος (ποτέ μέσω τιμής), κρύβει συμβολοσειρές που μοιάζουν με κλειδιά από οποιαδήποτε καταγεγραμμένη έξοδο, παραλείπει
στόχους των οποίων το δυαδικό αρχείο δεν είναι εγκατεστημένο, και κατατάσσει τις αποτυχίες ως
auth / upstream / config αντί για έναν απλό boolean:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Προαιρετικά: το `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` περιορίζει το sweep·
το `OMNIROUTE_SMOKE_TIMEOUT_MS` παρακάμπτει το timeout των 120 δευτερολέπτων ανά στόχο.

---

## Δείτε επίσης

- [Διαμόρφωση Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — ο εκτενέστερος οδηγός Claude Code
- [Διαμόρφωση Codex CLI](./CODEX-CLI-CONFIGURATION.md) — η εφάπαξ βασική ρύθμιση `[model_providers.omniroute]`
- [Απομακρυσμένη Λειτουργία](./REMOTE-MODE.md) — πλαίσια, διακριτικά πρόσβασης περιορισμένου εύρους, οδήγηση απομακρυσμένου διακομιστή
- [Αναφορά Εργαλείων CLI](../reference/CLI-TOOLS.md) — ο πλήρης κατάλογος υποστηριζόμενων εργαλείων και σελίδων πίνακα ελέγχου
- [Οδηγός Εγκατάστασης](./SETUP_GUIDE.md) — μέθοδοι εγκατάστασης και πρώτη εκκίνηση
