# CLI-INTEGRATIONS (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI Integrations — ituro ang anumang coding CLI sa OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Integrations

Ang OmniRoute ay nagdadala ng isang pamilya ng `setup-*` na mga utos na nagko-configure ng isang coding
CLI (Codex, Claude Code, OpenCode, Cline, …) upang gamitin ang OmniRoute bilang backend nito — kaya
ang tool ay nakikipag-usap sa **isang** endpoint at ang OmniRoute ay nagruruta sa tamang provider na may
auto-fallback. Bawat utos ay nagbabasa ng **live** na model catalog mula sa isang tumatakbong
OmniRoute (lokal o remote) at sumusulat ng sariling config file ng tool sa **iyong**
machine. Ang API key ay tinutukoy ng isang environment variable saan man ito sinusuportahan ng tool.
Ang mga utos na nagpapanatili ng tool-local na environment file ay nakasaad sa ibaba.

Mayroon ding isang generic na launcher — `omniroute run <target>` — na naglalabas
ng `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` o `gemini` na may tamang env na na-inject, nang hindi sumusulat ng anumang config. Ang mga target at kanilang
mga alias ay nagmumula sa canonical manifest `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), at ang `omniroute completion` ay nag-aalok ng
parehong manifest-derived na mga target na salita. Ang legacy per-tool launchers —
`omniroute launch` (Claude Code) at `omniroute launch-codex` (Codex) — ay nananatiling
available.

Ang provider onboarding ay available mula sa parehong lokal/remote na konteksto. Ang
API-first na mga utos sa ibaba ay pinapanatili ang pamamahala ng authentication na hiwalay mula sa mga credential ng provider at hindi kailanman nagpi-print ng credential sa structured output:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Para sa mga script, mas mainam ang `--credential-stdin` o `--credential-env`; ang `--credential`
ay pinanatili para sa kontroladong lokal na paggamit. Ang `providers remove` ay nangangailangan ng `--yes` sa isang
non-interactive terminal, at ang lahat ng limang utos ay iginagalang ang aktibong konteksto o ang
global `--base-url`/`--api-key` na mga opsyon.

Para sa one-time, hand-written na base setup ng dalawang pinakamayamang integrations, tingnan ang
per-tool deep dives:

- [Claude Code configuration](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI configuration](./CODEX-CLI-CONFIGURATION.md)
- [Remote Mode](./REMOTE-MODE.md) — patakbuhin ang isang remote OmniRoute (VPS / Tailnet) mula sa iyong laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — ang OmniCopilot extension; maaari rin nitong patakbuhin ang mga
  `setup-*` na mga utos para sa iyo mula sa loob ng editor

---

## Master table

Bawat utos ay iginagalang ang **aktibong konteksto** (itinakda gamit ang `omniroute connect`, tingnan ang
[Remote Mode](./REMOTE-MODE.md)) o tahasang `--remote <url> --api-key <key>` na mga flag.
"Local vs remote" sa ibaba ay nangangahulugang: walang mga flag na tinatarget nito ang `http://localhost:20128`;
sa `--remote` (o isang aktibong remote na konteksto) ay kinukuha nito ang catalog mula sa server na iyon at sumusulat ng config nang lokal.

| Command                    | Tool                         | What it writes                                                                                                                                                                    | Key flags                                                                                                                                  | Local vs remote |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — isang profile bawat compatible na text model (`codex --profile <name>`)                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Pareho          |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — isang profile bawat matched model (`CLAUDE_CONFIG_DIR`)                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Pareho          |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — `omniroute` provider na may bawat catalog model (`opencode -m omniroute/<model>`)                                                            | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Pareho          |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI mode) + nagpi-print ng mga setting ng VS Code extension                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Pareho          |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + pinagsasama ang `kilocode.*` sa VS Code `settings.json` kung ito ay naroroon                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Pareho          |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` models, key via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Pareho          |
| `omniroute setup-cursor`   | Cursor                       | Wala — nagpi-print ng mga hakbang sa app (ang Cursor config ay opaque SQLite)                                                                                                     | `--remote` `--api-key` `--only` `--port`                                                                                                   | Pareho          |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (import doc) + itinatakda ang `roo-cline.autoImportSettingsPath` kung ang isang VS Code `settings.json` ay umiiral                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Pareho          |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` provider, key via `$OMNIROUTE_API_KEY`                                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Pareho          |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + nagpi-print ng env recipe                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Pareho          |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + nagpi-print ng env recipe                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Pareho          |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` array + `OMNIROUTE_API_KEY` sa `~/.qwen/.env`                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Pareho          |
| `omniroute run <target>`   | Runtime launch (generic)     | Wala — naglalabas ng `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` na may tamang env at args; ang Qwen at Gemini ay gumagamit ng isang pansamantalang isolated home | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Pareho          |
| `omniroute launch`         | Claude Code                  | Wala — naglalabas ng `claude` na may `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` na na-inject                                                                                     | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Pareho          |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Wala — naglalabas ng `codex` na may `omniroute` provider na na-inject sa pamamagitan ng `-c` na mga flag                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Pareho          |

Mga tala sa mga flag (naka-verify sa source ng utos):

- `--remote <url>` — kunin ang catalog mula sa isang remote OmniRoute (pinapalitan ang `--port`
  at ang aktibong konteksto). Ang `--api-key <key>` ay nagbibigay ng credential para sa server na iyon
  (default sa `OMNIROUTE_API_KEY` env var, o ang token ng aktibong konteksto).
- `--only <patterns>` — mga substring na pinaghihiwalay ng kuwit; panatilihin lamang ang mga model ID na tumutugma
  (hal. `--only glm,kimi`). Available sa `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — i-print nang eksakto kung ano ang isusulat nang hindi hinahawakan ang
  filesystem. Available sa bawat `setup-*` na utos **maliban** sa `setup-cursor`
  (na hindi kailanman sumusulat ng file).
- `--model <id>` — kinakailangan (o pinili nang interactive) para sa mga tool na walang
  model auto-discovery: Cline, Kilo, Roo, Goose, Qwen, Aider. Ang mga tool na iyon
  ay tumatanggap din ng `--yes` para sa non-interactive na mga run (na nangangailangan ng `--model`).
  Ang `setup-opencode` ay tumatanggap ng `--model` upang itakda ang default na top-level model.
- `--model <id>` sa `omniroute run` ay sumusunod sa wiring ng manifest per-target
  (`bin/cli/cli-manifest.mjs`): **aider** ay tumatanggap ng `--model openai/<id>` at
  **opencode** `--model omniroute/<id>` (ang prefix ay idinadagdag lamang kapag ang id
  ay hindi na nagdadala nito); **qwen** at **gemini** ay tumatanggap ng id nang buo;
  **claude** ay nakukuha ito sa pamamagitan ng `ANTHROPIC_MODEL`, **goose** sa pamamagitan ng `GOOSE_MODEL`, at
  **codex** sa pamamagitan ng `-c model_providers.omniroute.*` na mga args. **Qwen ang tanging run
  target na mahigpit na nangangailangan ng `--model`** — ang `omniroute run qwen` nang walang ito ay lumalabas
  `2` na may tahasang error.
- `--port <port>` — lokal na OmniRoute port (default `20128`, hindi pinapansin kapag nakaset ang `--remote`).
  Present sa lahat ng `setup-*` at parehong launchers.
- Ang mga exit code ng `omniroute run`: ang sariling exit code ng child CLI ay naipapasa
  nang buo; `2` = invalid arguments (unsupported target, nawawalang kinakailangang
  `--model`, container guard); `127` = ang target binary ay wala sa `PATH`;
  `130`/`143`/`129` kapag ang launch ay natapos ng `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = iba pang runtime launch failure.
- Ang dalawang launchers (`launch`, `launch-codex`) ay tumatanggap ng `--profile <name>` upang pumili
  ng isang profile na isinulat ng `setup-claude` / `setup-codex`, kasama ang pass-through args para sa
  underlying `claude` / `codex` binary.

Ang interactive picker ay ibinabahagi rin ng mga setup recipe:

```bash
# Pumili mula sa aktibong lokal o remote na model catalog at i-configure ang target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Ang `configure` ay kasalukuyang nagde-delegate sa mga nasubok na recipe para sa `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, at `kilo`. Ang mga entry na tanging para sa IDE,
MITM, at guide-only ay nananatiling tahasang `setup-*`/manual flows at hindi ipinapakita bilang mga launchable na target.

> Ang `setup-opencode` ay ang **magaan na openai-compatible** na OpenCode integration.
> Mayroon ding mas mayamang plugin integration — `omniroute setup opencode` — na
> nag-i-install ng `@omniroute/opencode-plugin`. Sila ay magkaibang mga utos; ang talahanayan
> sa itaas ay nagdodokumento ng `setup-opencode`.

---

## Lokal na paggamit

Sa OmniRoute na tumatakbo sa `localhost:20128`, patakbuhin lamang ang setup command para sa iyong tool. Ang katalogo ay kinukuha mula sa lokal na server.

```bash
# Codex: magsulat ng profile para sa bawat tugmang modelo sa ~/.codex/
omniroute setup-codex
codex --profile glm52            # gamitin ang nabuo na profile

# Claude Code: magsulat ng mga profile bawat modelo, pagkatapos ay ilunsad ang isa
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: magsulat ng provider na katugma ng openai na may lahat ng modelo ng katalogo
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # tinutukoy sa pamamagitan ng {env:OMNIROUTE_API_KEY}, hindi kailanman sa disk
opencode -m omniroute/glm/glm-5.2 "..."

# Mga tool na walang auto-discovery ay nangangailangan ng tiyak na modelo:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Preview nang hindi sumusulat ng anuman:
omniroute setup-continue --dry-run
```

Ilunsad nang hindi sumusulat ng anumang config (env-injection lamang):

```bash
omniroute launch                 # Claude Code → lokal na OmniRoute
omniroute launch-codex           # Codex CLI → lokal na OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Tiyak na landas ng command: ipasa ang anumang sumusunod pagkatapos ng --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Malalayong paggamit

Ituro ang anumang setup command sa isang malalayong OmniRoute gamit ang `--remote` + `--api-key`. Ang katalogo ay kinukuha mula sa malayo; ang config ay isinusulat sa iyong lokal na makina.

```bash
# OpenCode laban sa isang malalayong VPS, panatilihin lamang ang mga modelo ng glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # i-export muna ang OMNIROUTE_API_KEY

# Mga profile ng Codex mula sa isang malalayong katalogo
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Ilunsad ang isang CLI nang direkta laban sa malayo
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Sa halip na ipasa ang `--remote`/`--api-key` sa bawat pagkakataon, mag-log in nang isang beses at hayaan ang **aktibong konteksto** na ibigay ang mga ito nang awtomatiko:

```bash
omniroute connect 192.168.0.15        # nagmimina ng isang scoped token, nag-iimbak ng konteksto
omniroute setup-codex                 # ← ngayon ay gumagamit ng malalayong katalogo
omniroute setup-opencode              # ← pareho
omniroute launch                      # ← Claude Code laban sa malayo
```

Tingnan ang [Remote Mode](./REMOTE-MODE.md) para sa mga konteksto, saklaw, at pamamahala ng token.

---

## Mga konbensyon ng Base URL (na nais ng mga tool ang `/v1`)

Ipinapakita ng OmniRoute ang OpenAI surface sa `/v1`, ang Anthropic surface sa root, at isang katutubong Gemini surface sa `/v1beta`. Ang bawat integrasyon ay naka-wire sa anyo na inaasahan ng kanyang tool (naka-verify sa pinagmulan ng command):

| Integrasyon                                                                | Base URL na isinulat | `/v1`?                                                    |
| -------------------------------------------------------------------------- | -------------------- | --------------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | root                 | Hindi — Idinadagdag ng Cline ang `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | root                 | Hindi — Idinadagdag ng Goose ang landas                   |
| `setup-aider` (`OPENAI_API_BASE`)                                          | root                 | Hindi — Idinadagdag ng LiteLLM ang `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | kasama ang `/v1`     | Oo                                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | root                 | Hindi — Idinadagdag ng Claude Code ang `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | kasama ang `/v1`     | Oo                                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | kasama ang `/v1`     | Oo                                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | root                 | Hindi — idinadagdag ng SDK ang `/v1beta/models/…`         |

---

## Panatilihin ang mga katutubong deps sa pag-update: `--include=optional`

Kapag nag-update ka gamit ang `omniroute update` (pagkatapos kumpirmahin, o gamit ang `--apply`),
ang OmniRoute ay nagpapatakbo ng install na may `--include=optional` na nakabake:

```bash
npm install -g omniroute@latest --include=optional
```

Ito ay **hindi** isang flag na ipapasa mo sa `omniroute update` — ito ay palaging inilalapat ng
updater. Tinitiyak nito na ang `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, ang LLMLingua SLM stack) ay makakaligtas sa update kahit na ang iyong npm config
ay may `omit=optional` na nakaset, na kung hindi ay tahimik na aalisin ang katutubong SQLite
driver at OS-keyring binding. Upang i-preview ang eksaktong command nang hindi nag-aaplay:

```bash
omniroute update --dry-run
# [DRY RUN] Gagawin: npm install -g omniroute@latest --include=optional
```

Iba pang mga flag ng `omniroute update` (naka-verify sa source): `--check` (exit 1 kung
luma na), `--apply` (install nang walang prompting), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI sa pamamagitan ng `omniroute run gemini`

Ang kontrata ay na-verify laban sa `@google/gemini-cli` 0.50.0: ang CLI ay iginagalang
`GOOGLE_GEMINI_BASE_URL` at naglalabas ng `POST /v1beta/models/<model>:generateContent`
(at `:streamGenerateContent?alt=sse`) laban dito — eksaktong ibabaw ng Gemini ng OmniRoute
(`/v1beta`). Ang `omniroute run gemini` ay awtomatikong kumokonekta dito:

- `GOOGLE_GEMINI_BASE_URL` → ang aktibong base URL ng OmniRoute (root, walang `/v1`);
- `GEMINI_API_KEY` → ang na-resolve na credential ng OmniRoute (option/env/context);
- isang **panandaliang nakahiwalay na `GEMINI_CLI_HOME`** na ang `.gemini/settings.json`
  ay pumipili ng `gemini-api-key` na auth, kaya ang naka-imbak na Google OAuth session (Code Assist)
  ay hindi kailanman papalitan ang OmniRoute-directed launch — tinanggal pagkatapos ng exit;
- **kalinisan ng env**: ang child env ay nilinis mula sa `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` at `GOOGLE_GENAI_USE_GCA` (na magreredirig
  ng auth sa Vertex/Code Assist), at ang `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` ay
  nakaset bilang fallback — ang iba pang mga target ng `run` ay nakakakuha ng parehong
  paggamot para sa kanilang sariling mga conflicting variables;
- `--model <id>` injection mula sa `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Ang workspace-trust guard ng Gemini ay nananatiling naaangkop sa headless mode — ipasa
`--skip-trust` (o pagkatiwalaan ang direktoryo nang interaktibo) sa iyong sarili; ang launcher
ay sinadyang hindi ito nilalampasan. Ang launcher na ito ay naiiba mula sa **ACP
registration** (`src/lib/acp/registry.ts`, `gemini --acp`), na nananatiling ang
agent-protocol integration para sa `/dashboard/acp-agents`.

---

## Tunay na smoke sweep (opt-in)

Ang deterministic launch-plan regression ay tumatakbo sa CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Upang i-validate ang TUNAY na binaries laban sa isang TUNAY
na OmniRoute server, mayroong opt-in harness sa
`tests/integration/upstream-cli-smoke.int.test.ts`. Hindi ito tumatakbo nang awtomatiko
(bawat sub-test ay lumilipat maliban kung `RUN_CLI_SMOKE=1`), ipinapasa ang credential sa pamamagitan ng env-var
NAME (hindi kailanman sa pamamagitan ng value), itinatago ang mga key-shaped na string mula sa anumang naitalang output, lumilipat
ng mga target na ang binary ay hindi naka-install, at nag-uuri ng mga pagkabigo bilang
auth / upstream / config sa halip na isang bare boolean:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opsyonal: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ay naglilimita sa sweep;
`OMNIROUTE_SMOKE_TIMEOUT_MS` ay nag-ooverride sa 120s per-target timeout.

---

## Tingnan din

- [Claude Code configuration](./CLAUDE-CODE-CONFIGURATION.md) — ang mas malalim na gabay sa Claude Code
- [Codex CLI configuration](./CODEX-CLI-CONFIGURATION.md) — ang isang beses na `[model_providers.omniroute]` base setup
- [Remote Mode](./REMOTE-MODE.md) — mga konteksto, nakatuon na access tokens, pagmamaneho ng isang remote server
- [CLI Tools reference](../reference/CLI-TOOLS.md) — ang buong katalogo ng mga suportadong tool + mga pahina ng dashboard
- [Setup Guide](./SETUP_GUIDE.md) — mga pamamaraan ng pag-install at onboarding sa unang takbo
