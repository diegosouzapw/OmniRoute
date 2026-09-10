# CLI-INTEGRATIONS (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "Integrări CLI — direcționează orice CLI de codare către OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Integrări CLI

OmniRoute oferă o familie de comenzi `setup-*` care configurează un CLI de codare
(Codex, Claude Code, OpenCode, Cline, …) pentru a folosi OmniRoute ca backend — astfel
încât instrumentul comunică cu **un** endpoint și OmniRoute redirecționează către furnizorul corect cu
fallback automat. Fiecare comandă citește catalogul de modele **live** de la un OmniRoute
funcțional (local sau la distanță) și scrie fișierul de configurare al instrumentului pe **mașina ta**. Cheia API este referită printr-o variabilă de mediu oriunde instrumentul
o suportă. Comenzile care persistă un fișier de mediu local pentru instrument sunt notate mai jos.

Există, de asemenea, un launcher generic — `omniroute run <target>` — care lansează
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` sau `gemini` cu
mediul corect injectat, fără a scrie deloc configurație. Țintele și aliasurile lor provin din manifestul canonic `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), iar `omniroute completion` oferă
aceleași cuvinte țintă derivate din manifest. Launcherele legate de fiecare instrument —
`omniroute launch` (Claude Code) și `omniroute launch-codex` (Codex) — rămân
disponibile.

Onboarding-ul furnizorului este disponibil din același context local/remote. Comenzile
API-first de mai jos mențin autentificarea managementului separată de acreditivele furnizorului
și nu imprimă niciodată o acreditiv în ieșirea structurată:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Pentru scripturi, preferați `--credential-stdin` sau `--credential-env`; `--credential`
este păstrat pentru utilizare locală controlată. `providers remove` necesită `--yes` pe un
terminal non-interactiv, iar toate cele cinci comenzi respectă contextul activ sau opțiunile globale `--base-url`/`--api-key`.

Pentru configurarea inițială, scrisă de mână a celor două cele mai bogate integrări, consultați
analizele detaliate pe instrumente:

- [Configurarea Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configurarea Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modul Remote](./REMOTE-MODE.md) — controlează un OmniRoute la distanță (VPS / Tailnet) de pe laptopul tău
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — extensia OmniCopilot; poate rula de asemenea aceste
  comenzi `setup-*` pentru tine din interiorul editorului

---

## Tabel principal

Fiecare comandă respectă **contextul activ** (setat cu `omniroute connect`, vezi
[Modul Remote](./REMOTE-MODE.md)) sau flag-uri explicite `--remote <url> --api-key <key>`.
"Local vs remote" de mai jos înseamnă: fără flag-uri, vizează `http://localhost:20128`;
cu `--remote` (sau un context remote activ) preia catalogul de la acel
server și scrie configurația local.

| Comandă                    | Instrument                   | Ce scrie                                                                                                                                                       | Flag-uri cheie                                                                                                                             | Local vs remote |
| -------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — un profil pentru fiecare model de text compatibil (`codex --profile <name>`)                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Ambele          |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — un profil pentru fiecare model potrivit (`CLAUDE_CONFIG_DIR`)                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Ambele          |
| `omniroute setup-opencode` | OpenCode (compatibil openai) | `~/.config/opencode/opencode.json` — furnizor `omniroute` cu fiecare model din catalog (`opencode -m omniroute/<model>`)                                       | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Ambele          |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (mod CLI) + imprimă setările extensiei VS Code                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Ambele          |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + îmbină `kilocode.*` în `settings.json` al VS Code, dacă este prezent                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Ambele          |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — modele `provider: openai`, cheie prin `${{ secrets.OMNIROUTE_API_KEY }}`                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambele          |
| `omniroute setup-cursor`   | Cursor                       | Nimic — imprimă pașii în aplicație (configurația Cursor este opacă SQLite)                                                                                     | `--remote` `--api-key` `--only` `--port`                                                                                                   | Ambele          |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (document de import) + setează `roo-cline.autoImportSettingsPath` dacă există un `settings.json` al VS Code                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Ambele          |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — furnizor `openai-compat`, cheie prin `$OMNIROUTE_API_KEY`                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Ambele          |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + imprimă rețeta de mediu                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambele          |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + imprimă rețeta de mediu                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Ambele          |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — array `V4 modelProviders.openai` + `OMNIROUTE_API_KEY` în `~/.qwen/.env`                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Ambele          |
| `omniroute run <target>`   | Lansare runtime (generic)    | Nimic — lansează `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` cu mediul și argumentele corecte; Qwen și Gemini folosesc un home izolat temporar | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Ambele          |
| `omniroute launch`         | Claude Code                  | Nimic — lansează `claude` cu `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injectat                                                                              | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Ambele          |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Nimic — lansează `codex` cu furnizorul `omniroute` injectat prin flag-uri `-c`                                                                                 | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Ambele          |

Note despre flag-uri (verificate în sursa comenzii):

- `--remote <url>` — preia catalogul de la un OmniRoute la distanță (suprascrie `--port`
  și contextul activ). `--api-key <key>` furnizează acreditivul pentru acel
  server (se default-ează la variabila de mediu `OMNIROUTE_API_KEY`, sau token-ul contextului activ).
- `--only <patterns>` — subșiruri separate prin virgulă; păstrează doar ID-urile modelului care se potrivesc
  (de exemplu, `--only glm,kimi`). Disponibil pe `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — imprimă exact ce ar fi scris fără a atinge
  sistemul de fișiere. Disponibil pe fiecare comandă `setup-*` **cu excepția** `setup-cursor`
  (care nu scrie niciodată un fișier).
- `--model <id>` — necesar (sau ales interactiv) pentru instrumentele care nu au
  descoperire automată a modelului: Cline, Kilo, Roo, Goose, Qwen, Aider. Aceste instrumente
  acceptă de asemenea `--yes` pentru execuții non-interactive (care apoi necesită `--model`).
  `setup-opencode` ia `--model` pentru a seta modelul implicit de nivel superior.
- `--model <id>` pe `omniroute run` urmează conectarea per-țintă din manifest
  (`bin/cli/cli-manifest.mjs`): **aider** primește `--model openai/<id>` și
  **opencode** `--model omniroute/<id>` (prefixul este adăugat doar când id-ul
  nu îl poartă deja); **qwen** și **gemini** primesc id-ul exact; **claude** îl primește prin `ANTHROPIC_MODEL`, **goose** prin `GOOSE_MODEL`, și
  **codex** prin argumente `-c model_providers.omniroute.*`. **Qwen este singura țintă de execuție
  care necesită în mod strict `--model`** — `omniroute run qwen` fără el iese
  `2` cu o eroare explicită.
- `--port <port>` — portul local OmniRoute (default `20128`, ignorat când `--remote`
  este setat). Prezent pe toate comenzile `setup-*` și pe ambele launchere.
- Codurile de ieșire ale `omniroute run`: codul de ieșire al CLI-ului copil este propagat
  exact; `2` = argumente invalide (țintă nesuportată, lipsă `--model` necesar, protecție container); `127` = binarul țintă nu este în `PATH`;
  `130`/`143`/`129` când lansarea este încheiată de `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = altă eroare de lansare runtime.
- Cele două launchere (`launch`, `launch-codex`) acceptă `--profile <name>` pentru a selecta
  un profil scris de `setup-claude` / `setup-codex`, plus argumente de trecere pentru
  binarul de bază `claude` / `codex`.

Selectorul interactiv este de asemenea partajat de rețetele de configurare:

```bash
# Alege din catalogul de modele local sau remote activ și configurează ținta.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` deleghează în prezent către rețetele testate pentru `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, și `kilo`. Intrările din catalog
destinate doar IDE-ului, MITM, și ghidului rămân fluxuri explicite `setup-*`/manuale și
nu sunt prezentate ca ținte lansabile.

> `setup-opencode` este integrarea **ușoară compatibilă openai** OpenCode.
> Există de asemenea o integrare mai bogată a plugin-ului — `omniroute setup opencode` — care
> instalează `@omniroute/opencode-plugin`. Acestea sunt comenzi diferite; tabelul
> de mai sus documentează `setup-opencode`.

---

## Utilizare locală

Cu OmniRoute rulând pe `localhost:20128`, pur și simplu rulează comanda de configurare pentru instrumentul tău. Catalogul este obținut de la serverul local.

```bash
# Codex: scrie un profil pentru fiecare model potrivit în ~/.codex/
omniroute setup-codex
codex --profile glm52            # folosește un profil generat

# Claude Code: scrie profile pe model, apoi lansează unul
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: scrie provider-ul compatibil cu openai cu toate modelele din catalog
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referit prin {env:OMNIROUTE_API_KEY}, niciodată pe disc
opencode -m omniroute/glm/glm-5.2 "..."

# Instrumentele fără descoperire automată necesită un model explicit:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Previziune fără a scrie nimic:
omniroute setup-continue --dry-run
```

Lansează fără a scrie vreo configurație (doar injecție de mediu):

```bash
omniroute launch                 # Claude Code → OmniRoute local
omniroute launch-codex           # Codex CLI → OmniRoute local
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Calea comenzii explicite: trece prin orice vine după --
omniroute run claude -- --print-system-prompt "revizuiește acest diff"
```

---

## Utilizare la distanță

Indică orice comandă de configurare către un OmniRoute la distanță cu `--remote` + `--api-key`. Catalogul este obținut de la distanță; configurația este scrisă pe mașina ta locală.

```bash
# OpenCode împotriva unui VPS la distanță, păstrează doar modelele glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exportă mai întâi OMNIROUTE_API_KEY

# Profile Codex dintr-un catalog la distanță
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Lansează un CLI direct împotriva distanței
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

În loc să treci `--remote`/`--api-key` de fiecare dată, conectează-te o dată și lasă **contextul activ** să le furnizeze automat:

```bash
omniroute connect 192.168.0.15        # generează un token scoperit, stochează contextul
omniroute setup-codex                 # ← acum folosește catalogul la distanță
omniroute setup-opencode              # ← același lucru
omniroute launch                      # ← Claude Code împotriva distanței
```

Vezi [Modul la distanță](./REMOTE-MODE.md) pentru contexte, domenii și gestionarea token-urilor.

---

## Convenții URL de bază (ce instrumente doresc `/v1`)

OmniRoute expune suprafața OpenAI la `/v1`, suprafața Anthropic la rădăcină, și o suprafață nativă Gemini la `/v1beta`. Fiecare integrare este conectată la forma pe care instrumentul său o așteaptă (verificat în sursa comenzii):

| Integrare                                                                  | URL de bază scris | `/v1`?                                     |
| -------------------------------------------------------------------------- | ----------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | rădăcină          | Nu — Cline adaugă `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | rădăcină          | Nu — Goose adaugă calea                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | rădăcină          | Nu — LiteLLM adaugă `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | cu `/v1`          | Da                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | rădăcină          | Nu — Claude Code adaugă `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | cu `/v1`          | Da                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | cu `/v1`          | Da                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | rădăcină          | Nu — SDK-ul adaugă `/v1beta/models/…`      |

---

## Menținerea dependențelor native la actualizare: `--include=optional`

Când actualizezi cu `omniroute update` (după confirmare sau cu `--apply`),
OmniRoute rulează instalarea cu `--include=optional` inclus:

```bash
npm install -g omniroute@latest --include=optional
```

Aceasta **nu** este o opțiune pe care o transmiți la `omniroute update` — este întotdeauna aplicată de
actualizator. Aceasta garantează că `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, stiva LLMLingua SLM) supraviețuiesc actualizării chiar dacă configurația ta npm
are `omit=optional` setat, ceea ce altfel ar elimina în tăcere driverul SQLite
nativ și legătura cu OS-keyring. Pentru a previzualiza comanda exactă fără a aplica:

```bash
omniroute update --dry-run
# [DRY RUN] Ar rula: npm install -g omniroute@latest --include=optional
```

Alte opțiuni `omniroute update` (verificate în sursă): `--check` (iese cu 1 dacă
este depășit), `--apply` (instalează fără a solicita), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI prin `omniroute run gemini`

Contract verificat împotriva `@google/gemini-cli` 0.50.0: CLI-ul respectă
`GOOGLE_GEMINI_BASE_URL` și emite `POST /v1beta/models/<model>:generateContent`
(și `:streamGenerateContent?alt=sse`) împotriva acestuia — exact suprafața nativă
Gemini a OmniRoute (`/v1beta`). `omniroute run gemini` conectează asta automat:

- `GOOGLE_GEMINI_BASE_URL` → URL-ul de bază activ OmniRoute (rădăcină, fără `/v1`);
- `GEMINI_API_KEY` → acreditivul rezolvat OmniRoute (opțiune/env/context);
- un **`GEMINI_CLI_HOME`** temporar izolat al cărui `.gemini/settings.json`
  selectează autentificarea `gemini-api-key`, astfel încât o sesiune Google OAuth stocată (Code Assist)
  să nu suprascrie lansarea dirijată de OmniRoute — eliminată după ieșire;
- **igiena mediului**: mediul copil este curățat de `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` și `GOOGLE_GENAI_USE_GCA` (care ar redirecționa
  autentificarea către Vertex/Code Assist), iar `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` este
  setat ca o măsură de siguranță — celelalte ținte `run` primesc același
  tratament pentru variabilele lor conflictuale;
- injecția `--model <id>` din `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gardianul de încredere al spațiului de lucru Gemini se aplică în modul headless — treci
`--skip-trust` (sau încrede-te în director interactiv) tu însuți; lansatorul
nu ocolește deliberat acest lucru. Acest lansator este distinct de **înregistrarea ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), care rămâne integrarea protocolului-agent pentru `/dashboard/acp-agents`.

---

## Verificare reală a fumului (opțional)

Planul de lansare determinist pentru regresie rulează în CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Pentru a valida binarele REALE împotriva unui server REAL
OmniRoute, există un cadru opțional la
`tests/integration/upstream-cli-smoke.int.test.ts`. Acesta nu rulează niciodată automat
(fiecare sub-test sare cu excepția cazului în care `RUN_CLI_SMOKE=1`), transmite acreditivul prin variabila de mediu
NUME (niciodată prin valoare), redactează șirurile în formă de cheie din orice ieșire înregistrată, sare
ținte ale căror binare nu sunt instalate și clasifică eșecurile ca
autentificare / upstream / configurație în loc de un simplu boolean:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opțional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` restricționează verificarea;
`OMNIROUTE_SMOKE_TIMEOUT_MS` suprascrie timeout-ul de 120s pe țintă.

---

## Vezi de asemenea

- [Configurarea Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — ghidul mai detaliat pentru Claude Code
- [Configurarea Codex CLI](./CODEX-CLI-CONFIGURATION.md) — configurarea de bază `[model_providers.omniroute]` unică
- [Modul Remote](./REMOTE-MODE.md) — contexte, token-uri de acces cu domeniu restrâns, controlul unui server remote
- [Referința uneltelor CLI](../reference/CLI-TOOLS.md) — catalogul complet al uneltelor suportate + paginile de tablouri de bord
- [Ghid de configurare](./SETUP_GUIDE.md) — metode de instalare și integrarea la prima rulare
