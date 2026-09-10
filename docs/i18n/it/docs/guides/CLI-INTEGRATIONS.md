# CLI-INTEGRATIONS (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "Integrazioni CLI — punta qualsiasi CLI di codifica a OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Integrazioni CLI

OmniRoute include una serie di comandi `setup-*` che configurano una CLI di codifica
(Codex, Claude Code, OpenCode, Cline, …) per utilizzare OmniRoute come backend — in modo che
lo strumento comunichi con **un** endpoint e OmniRoute instradi verso il fornitore giusto con
fallback automatico. Ogni comando legge il catalogo del modello **live** da un OmniRoute in esecuzione
(locale o remoto) e scrive il file di configurazione dello strumento sulla **tua**
macchina. La chiave API è referenziata da una variabile d'ambiente ovunque lo strumento
lo supporti. I comandi che persistono un file di ambiente locale per lo strumento sono annotati di seguito.

C'è anche un launcher generico — `omniroute run <target>` — che avvia
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` o `gemini` con
l'ambiente giusto iniettato, senza scrivere alcuna configurazione. I target e i loro
alias provengono dal manifesto canonico `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), e `omniroute completion` offre le
stesse parole chiave derivate dal manifesto. I launcher legacy per strumento —
`omniroute launch` (Claude Code) e `omniroute launch-codex` (Codex) — rimangono
disponibili.

L'onboarding del fornitore è disponibile dallo stesso contesto locale/remoto. I
comandi API-first qui sotto mantengono l'autenticazione di gestione separata dalle credenziali
del fornitore e non stampano mai una credenziale in output strutturato:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Per gli script, preferisci `--credential-stdin` o `--credential-env`; `--credential`
è mantenuto per uso locale controllato. `providers remove` richiede `--yes` su un
terminale non interattivo, e tutti e cinque i comandi rispettano il contesto attivo o le
opzioni globali `--base-url`/`--api-key`.

Per la configurazione iniziale scritta a mano delle due integrazioni più ricche, vedere i
deep dive per strumento:

- [Configurazione di Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configurazione di Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modalità Remota](./REMOTE-MODE.md) — controlla un OmniRoute remoto (VPS / Tailnet) dal tuo laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — l'estensione OmniCopilot; può anche eseguire questi
  comandi `setup-*` per te dall'interno dell'editor

---

## Tabella principale

Ogni comando onora il **contesto attivo** (impostato con `omniroute connect`, vedi
[Modalità Remota](./REMOTE-MODE.md)) o espliciti flag `--remote <url> --api-key <key>`.
"Locale vs remoto" qui sotto significa: senza flag si punta a `http://localhost:20128`;
con `--remote` (o un contesto remoto attivo) si recupera il catalogo da quel
server e si scrive la configurazione localmente.

| Comando                    | Strumento                         | Cosa scrive                                                                                                                                                       | Flag chiave                                                                                                                                | Locale vs remoto |
| -------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                  | `~/.codex/<name>.config.toml` — un profilo per ogni modello di testo compatibile (`codex --profile <name>`)                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Entrambi         |
| `omniroute setup-claude`   | Claude Code                       | `~/.claude/profiles/<name>/settings.json` — un profilo per ogni modello corrispondente (`CLAUDE_CONFIG_DIR`)                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Entrambi         |
| `omniroute setup-opencode` | OpenCode (compatibile con openai) | `~/.config/opencode/opencode.json` — fornitore `omniroute` con ogni modello del catalogo (`opencode -m omniroute/<model>`)                                        | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Entrambi         |
| `omniroute setup-cline`    | Cline                             | `~/.cline/data/{globalState,secrets}.json` (modalità CLI) + stampa le impostazioni dell'estensione VS Code                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Entrambi         |
| `omniroute setup-kilo`     | Kilo Code                         | `~/.local/share/kilo/auth.json` (CLI) + unisce `kilocode.*` in `settings.json` di VS Code se presente                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Entrambi         |
| `omniroute setup-continue` | Continue / `cn` CLI               | `~/.continue/config.yaml` — modelli `provider: openai`, chiave tramite `${{ secrets.OMNIROUTE_API_KEY }}`                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Entrambi         |
| `omniroute setup-cursor`   | Cursor                            | Niente — stampa i passaggi in-app (la configurazione di Cursor è opaca SQLite)                                                                                    | `--remote` `--api-key` `--only` `--port`                                                                                                   | Entrambi         |
| `omniroute setup-roo`      | Roo Code                          | `~/.omniroute/roo-settings.json` (import doc) + imposta `roo-cline.autoImportSettingsPath` se esiste un `settings.json` di VS Code                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Entrambi         |
| `omniroute setup-crush`    | Crush                             | `~/.config/crush/crush.json` — fornitore `openai-compat`, chiave tramite `$OMNIROUTE_API_KEY`                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Entrambi         |
| `omniroute setup-goose`    | Goose                             | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + stampa la ricetta dell'ambiente                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Entrambi         |
| `omniroute setup-aider`    | Aider                             | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + stampa la ricetta dell'ambiente                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Entrambi         |
| `omniroute setup-qwen`     | Qwen Code                         | `~/.qwen/settings.json` — array `V4 modelProviders.openai` + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Entrambi         |
| `omniroute run <target>`   | Lancio runtime (generico)         | Niente — avvia `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` con l'ambiente e gli argomenti giusti; Qwen e Gemini usano una home isolata temporanea | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Entrambi         |
| `omniroute launch`         | Claude Code                       | Niente — avvia `claude` con `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` iniettati                                                                                 | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Entrambi         |
| `omniroute launch-codex`   | OpenAI Codex CLI                  | Niente — avvia `codex` con il fornitore `omniroute` iniettato tramite flag `-c`                                                                                   | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Entrambi         |

Note sui flag (verificati nella sorgente del comando):

- `--remote <url>` — recupera il catalogo da un OmniRoute remoto (sovrascrive `--port`
  e il contesto attivo). `--api-key <key>` fornisce la credenziale per quel
  server (di default alla variabile d'ambiente `OMNIROUTE_API_KEY`, o al token del contesto attivo).
- `--only <patterns>` — sottostringhe separate da virgola; mantiene solo gli ID dei modelli che corrispondono
  (ad esempio `--only glm,kimi`). Disponibile su `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — stampa esattamente ciò che verrebbe scritto senza toccare il
  filesystem. Disponibile su ogni comando `setup-*` **eccetto** `setup-cursor`
  (che non scrive mai un file).
- `--model <id>` — richiesto (o scelto interattivamente) per gli strumenti che non hanno
  auto-scoperta del modello: Cline, Kilo, Roo, Goose, Qwen, Aider. Quegli strumenti
  accettano anche `--yes` per esecuzioni non interattive (che richiedono quindi `--model`).
  `setup-opencode` accetta `--model` per impostare il modello predefinito di alto livello.
- `--model <id>` su `omniroute run` segue il wiring per target del manifesto
  (`bin/cli/cli-manifest.mjs`): **aider** riceve `--model openai/<id>` e
  **opencode** `--model omniroute/<id>` (il prefisso viene aggiunto solo quando l'id
  non lo porta già); **qwen** e **gemini** ricevono l'id letteralmente;
  **claude** lo ottiene tramite `ANTHROPIC_MODEL`, **goose** tramite `GOOSE_MODEL`, e
  **codex** tramite argomenti `-c model_providers.omniroute.*`. **Qwen è l'unico target di esecuzione
  che richiede assolutamente `--model`** — `omniroute run qwen` senza di esso esce
  `2` con un errore esplicito.
- `--port <port>` — porta locale di OmniRoute (default `20128`, ignorato quando `--remote`
  è impostato). Presente su tutti i comandi `setup-*` e su entrambi i launcher.
- Codici di uscita di `omniroute run`: il codice di uscita della CLI figlia è propagato
  letteralmente; `2` = argomenti non validi (target non supportato, `--model` richiesto mancante, guardia del contenitore); `127` = il binario target non è in `PATH`;
  `130`/`143`/`129` quando il lancio è terminato da `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = altro fallimento di lancio runtime.
- I due launcher (`launch`, `launch-codex`) accettano `--profile <name>` per selezionare
  un profilo scritto da `setup-claude` / `setup-codex`, oltre a passare argomenti per
  il binario sottostante `claude` / `codex`.

Il selettore interattivo è condiviso anche dalle ricette di configurazione:

```bash
# Scegli dal catalogo di modelli locale o remoto attivo e configura il target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` attualmente delega alle ricette testate per `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, e `kilo`. Le voci del catalogo solo IDE,
MITM e solo guida rimangono flussi espliciti `setup-*`/manuali e non sono presentate come target lanciabili.

> `setup-opencode` è l'integrazione **leggera compatibile con openai** di OpenCode.
> C'è anche un'integrazione plugin più ricca — `omniroute setup opencode` — che
> installa `@omniroute/opencode-plugin`. Sono comandi diversi; la tabella
> sopra documenta `setup-opencode`.

---

## Utilizzo locale

Con OmniRoute in esecuzione su `localhost:20128`, esegui semplicemente il comando di configurazione per il tuo strumento. Il catalogo viene recuperato dal server locale.

```bash
# Codex: scrivi un profilo per ogni modello corrispondente in ~/.codex/
omniroute setup-codex
codex --profile glm52            # usa un profilo generato

# Claude Code: scrivi profili per modello, poi avvia uno
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: scrivi il provider compatibile con openai con tutti i modelli del catalogo
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referenziato tramite {env:OMNIROUTE_API_KEY}, mai su disco
opencode -m omniroute/glm/glm-5.2 "..."

# Gli strumenti senza auto-scoperta necessitano di un modello esplicito:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Anteprima senza scrivere nulla:
omniroute setup-continue --dry-run
```

Avvia senza scrivere alcuna configurazione (solo iniezione di variabili d'ambiente):

```bash
omniroute launch                 # Claude Code → OmniRoute locale
omniroute launch-codex           # Codex CLI → OmniRoute locale
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Percorso del comando esplicito: passa tutto ciò che viene dopo --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Utilizzo remoto

Punta qualsiasi comando di configurazione a un OmniRoute remoto con `--remote` + `--api-key`. Il catalogo viene recuperato da remoto; la configurazione viene scritta sulla tua macchina locale.

```bash
# OpenCode contro un VPS remoto, mantieni solo i modelli glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # esporta prima OMNIROUTE_API_KEY

# Profili Codex da un catalogo remoto
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Avvia una CLI direttamente contro il remoto
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Invece di passare `--remote`/`--api-key` ogni volta, accedi una volta e lascia che il **contesto attivo** li fornisca automaticamente:

```bash
omniroute connect 192.168.0.15        # genera un token limitato, memorizza il contesto
omniroute setup-codex                 # ← ora utilizza il catalogo remoto
omniroute setup-opencode              # ← stesso
omniroute launch                      # ← Claude Code contro il remoto
```

Vedi [Modalità Remota](./REMOTE-MODE.md) per contesti, ambiti e gestione dei token.

---

## Convenzioni dell'URL di base (quali strumenti vogliono `/v1`)

OmniRoute espone la superficie OpenAI a `/v1`, la superficie Anthropic alla radice, e una superficie nativa Gemini a `/v1beta`. Ogni integrazione è collegata alla forma che il suo strumento si aspetta (verificato nella sorgente del comando):

| Integrazione                                                               | URL di base scritto | `/v1`?                                       |
| -------------------------------------------------------------------------- | ------------------- | -------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | radice              | No — Cline aggiunge `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | radice              | No — Goose aggiunge il percorso              |
| `setup-aider` (`OPENAI_API_BASE`)                                          | radice              | No — LiteLLM aggiunge `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | con `/v1`           | Sì                                           |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | radice              | No — Claude Code aggiunge `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | con `/v1`           | Sì                                           |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | con `/v1`           | Sì                                           |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | radice              | No — l'SDK aggiunge `/v1beta/models/…`       |

---

## Mantenere le dipendenze native all'aggiornamento: `--include=optional`

Quando aggiorni con `omniroute update` (dopo aver confermato, o con `--apply`),
OmniRoute esegue l'installazione con `--include=optional` integrato:

```bash
npm install -g omniroute@latest --include=optional
```

Questo **non** è un flag che passi a `omniroute update` — viene sempre applicato dall'
aggiornamento. Garantisce che le `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, lo stack LLMLingua SLM) sopravvivano all'aggiornamento anche se la tua configurazione npm
ha `omit=optional` impostato, il che altrimenti eliminerebbe silenziosamente il driver SQLite
nativo e il binding del keyring di sistema. Per visualizzare il comando esatto senza applicarlo:

```bash
omniroute update --dry-run
# [DRY RUN] Eseguirebbe: npm install -g omniroute@latest --include=optional
```

Altri flag di `omniroute update` (verificati nel sorgente): `--check` (esci con 1 se
obsoleto), `--apply` (installa senza chiedere), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI tramite `omniroute run gemini`

Contratto verificato contro `@google/gemini-cli` 0.50.0: la CLI rispetta
`GOOGLE_GEMINI_BASE_URL` e invia `POST /v1beta/models/<model>:generateContent`
(e `:streamGenerateContent?alt=sse`) contro di esso — esattamente la superficie nativa di
Gemini di OmniRoute (`/v1beta`). `omniroute run gemini` collega automaticamente:

- `GOOGLE_GEMINI_BASE_URL` → l'URL base attivo di OmniRoute (root, senza `/v1`);
- `GEMINI_API_KEY` → le credenziali risolte di OmniRoute (opzione/env/context);
- un **`GEMINI_CLI_HOME`** isolato temporaneamente il cui `.gemini/settings.json`
  seleziona l'autenticazione `gemini-api-key`, quindi una sessione OAuth di Google memorizzata (Code Assist)
  non sovrascrive mai il lancio diretto da OmniRoute — rimosso dopo l'uscita;
- **igiene dell'ambiente**: l'ambiente figlio è ripulito da `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` e `GOOGLE_GENAI_USE_GCA` (che reindirizzerebbero
  l'autenticazione a Vertex/Code Assist), e `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` è
  impostato come fallback di sicurezza — gli altri target `run` ricevono lo stesso
  trattamento per le loro variabili in conflitto;
- iniezione di `--model <id>` da `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

La guardia di fiducia dello spazio di lavoro di Gemini si applica ancora in modalità headless — passa
`--skip-trust` (o fidati della directory interattivamente) tu stesso; il lanciatore
non lo bypassa deliberatamente. Questo lanciatore è distinto dalla **registrazione ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), che rimane l'integrazione del protocollo agente per `/dashboard/acp-agents`.

---

## Verifica reale del fumo (opt-in)

Le esecuzioni di regressione del piano di lancio deterministico avvengono in CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Per convalidare i binari REALI contro un server REAL
di OmniRoute, esiste un harness opt-in in
`tests/integration/upstream-cli-smoke.int.test.ts`. Non viene mai eseguito automaticamente
(tutti i sottotest saltano a meno che `RUN_CLI_SMOKE=1`), passa la credenziale tramite la variabile d'ambiente
NAME (mai per valore), redige le stringhe a forma di chiave da qualsiasi output registrato, salta
i target il cui binario non è installato e classifica i fallimenti come
auth / upstream / config invece di un semplice booleano:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opzionale: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` restringe la verifica;
`OMNIROUTE_SMOKE_TIMEOUT_MS` sovrascrive il timeout di 120s per target.

---

## Vedi anche

- [Configurazione di Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — la guida approfondita su Claude Code
- [Configurazione di Codex CLI](./CODEX-CLI-CONFIGURATION.md) — la configurazione di base `[model_providers.omniroute]` una tantum
- [Modalità Remota](./REMOTE-MODE.md) — contesti, token di accesso scopi, gestione di un server remoto
- [Riferimento Strumenti CLI](../reference/CLI-TOOLS.md) — il catalogo completo degli strumenti supportati + pagine del dashboard
- [Guida all'Installazione](./SETUP_GUIDE.md) — metodi di installazione e onboarding al primo avvio
