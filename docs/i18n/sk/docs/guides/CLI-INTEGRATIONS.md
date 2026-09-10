# CLI-INTEGRATIONS (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI Integrácie — nasmerujte akýkoľvek kódovací CLI na OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Integrácie

OmniRoute dodáva rodinu príkazov `setup-*`, ktoré konfigurovanú kódovaciu
CLI (Codex, Claude Code, OpenCode, Cline, …) na používanie OmniRoute ako svojho backendu — takže
nástroj komunikuje s **jedným** koncovým bodom a OmniRoute smeruje k správnemu poskytovateľovi s
automatickým zálohovaním. Každý príkaz číta **živý** modelový katalóg z bežiaceho
OmniRoute (lokálneho alebo vzdialeného) a zapisuje vlastný konfiguračný súbor nástroja na **vašom**
počítači. API kľúč je odkazovaný prostredníctvom premennej prostredia, kdekoľvek to nástroj
podporuje. Príkazy, ktoré uchovávajú lokálny súbor prostredia nástroja, sú uvedené nižšie.

Existuje aj generický spúšťač — `omniroute run <target>` — ktorý spúšťa
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` alebo `gemini` s
príslušným prostredím, bez toho aby zapisoval akúkoľvek konfiguráciu. Ciele a ich
aliasy pochádzajú z kanonického manifestu `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), a `omniroute completion` ponúka
rovnaké slová cieľov odvodené z manifestu. Dedičstvo per-nástrojových spúšťačov —
`omniroute launch` (Claude Code) a `omniroute launch-codex` (Codex) — zostáva
k dispozícii.

Onboarding poskytovateľa je k dispozícii z rovnakého lokálneho/vzdialeného kontextu. Príkazy
s orientáciou na API nižšie udržujú autentifikáciu správy oddelenú od poverení poskytovateľa a nikdy
nevyžadujú zverejnenie poverenia v štruktúrovanom výstupe:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Pre skripty uprednostnite `--credential-stdin` alebo `--credential-env`; `--credential`
je ponechaný pre kontrolované lokálne použitie. `providers remove` vyžaduje `--yes` na
neinteraktívnom termináli a všetky päť príkazov rešpektuje aktívny kontext alebo globálne
možnosti `--base-url`/`--api-key`.

Pre jednorazové, ručne písané základné nastavenie dvoch najbohatších integrácií, pozrite sa na
hlboké ponory pre každý nástroj:

- [Konfigurácia Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfigurácia Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Vzdialený režim](./REMOTE-MODE.md) — ovládajte vzdialený OmniRoute (VPS / Tailnet) zo svojho laptopu
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — rozšírenie OmniCopilot; môže tiež spúšťať tieto
  `setup-*` príkazy za vás priamo z editoru

---

## Hlavná tabuľka

Každý príkaz rešpektuje **aktívny kontext** (nastavený pomocou `omniroute connect`, pozri
[Remote Mode](./REMOTE-MODE.md)) alebo explicitné `--remote <url> --api-key <key>` flagy.
"Lokálne vs vzdialené" nižšie znamená: bez flagov cielené na `http://localhost:20128`;
s `--remote` (alebo aktívnym vzdialeným kontextom) načíta katalóg z toho
servera a zapisuje konfiguráciu lokálne.

| Príkaz                     | Nástroj                        | Čo zapisuje                                                                                                                                                    | Kľúčové flagy                                                                                                                              | Lokálne vs vzdialené |
| -------------------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — jeden profil pre každý kompatibilný textový model (`codex --profile <name>`)                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Obe                  |
| `omniroute setup-claude`   | Claude Code                    | `~/.claude/profiles/<name>/settings.json` — jeden profil pre každý zhodujúci sa model (`CLAUDE_CONFIG_DIR`)                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Obe                  |
| `omniroute setup-opencode` | OpenCode (openai-kompatibilný) | `~/.config/opencode/opencode.json` — `omniroute` poskytovateľ so všetkými modelmi katalógu (`opencode -m omniroute/<model>`)                                   | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Obe                  |
| `omniroute setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (CLI režim) + vytlačí nastavenia rozšírenia VS Code                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Obe                  |
| `omniroute setup-kilo`     | Kilo Code                      | `~/.local/share/kilo/auth.json` (CLI) + zlúči `kilocode.*` do `settings.json` VS Code, ak je prítomné                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Obe                  |
| `omniroute setup-continue` | Continue / `cn` CLI            | `~/.continue/config.yaml` — `provider: openai` modely, kľúč cez `${{ secrets.OMNIROUTE_API_KEY }}`                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Obe                  |
| `omniroute setup-cursor`   | Cursor                         | Nič — vytlačí kroky v aplikácii (konfigurácia Cursor je nepriehľadná SQLite)                                                                                   | `--remote` `--api-key` `--only` `--port`                                                                                                   | Obe                  |
| `omniroute setup-roo`      | Roo Code                       | `~/.omniroute/roo-settings.json` (import dokumentu) + nastaví `roo-cline.autoImportSettingsPath`, ak existuje `settings.json` vo VS Code                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Obe                  |
| `omniroute setup-crush`    | Crush                          | `~/.config/crush/crush.json` — `openai-compat` poskytovateľ, kľúč cez `$OMNIROUTE_API_KEY`                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Obe                  |
| `omniroute setup-goose`    | Goose                          | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + vytlačí recept prostredia                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obe                  |
| `omniroute setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + vytlačí recept prostredia                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obe                  |
| `omniroute setup-qwen`     | Qwen Code                      | `~/.qwen/settings.json` — V4 `modelProviders.openai` pole + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Obe                  |
| `omniroute run <target>`   | Spúšťanie za behu (generické)  | Nič — spúšťa `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` s príslušným prostredím a argumentmi; Qwen a Gemini používajú dočasný izolovaný domov | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Obe                  |
| `omniroute launch`         | Claude Code                    | Nič — spúšťa `claude` s `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injikovaným                                                                                | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Obe                  |
| `omniroute launch-codex`   | OpenAI Codex CLI               | Nič — spúšťa `codex` s poskytovateľom `omniroute` injikovaným cez `-c` flagy                                                                                   | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Obe                  |

Poznámky k flagom (overené v zdroji príkazu):

- `--remote <url>` — načíta katalóg z vzdialeného OmniRoute (prepíše `--port`
  a aktívny kontext). `--api-key <key>` poskytuje poverenie pre ten
  server (predvolene na `OMNIROUTE_API_KEY` env var, alebo token aktívneho kontextu).
- `--only <patterns>` — čiarkou oddelené podreťazce; uchovajte iba ID modelov, ktoré zodpovedajú
  (napr. `--only glm,kimi`). Dostupné na `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — vytlačí presne to, čo by bolo zapísané bez dotyku
  súborového systému. Dostupné na každom príkaze `setup-*` **okrem** `setup-cursor`
  (ktorý nikdy nezapisuje súbor).
- `--model <id>` — povinné (alebo vybrané interaktívne) pre nástroje, ktoré nemajú
  automatické objavovanie modelov: Cline, Kilo, Roo, Goose, Qwen, Aider. Tieto nástroje
  tiež akceptujú `--yes` pre neinteraktívne spúšťania (čo potom vyžaduje `--model`).
  `setup-opencode` berie `--model` na nastavenie predvoleného vrcholového modelu.
- `--model <id>` na `omniroute run` nasleduje wiring per-target z manifestu
  (`bin/cli/cli-manifest.mjs`): **aider** dostáva `--model openai/<id>` a
  **opencode** `--model omniroute/<id>` (prefix sa pridáva iba vtedy, keď id
  ho už nemá); **qwen** a **gemini** dostávajú id verbatim;
  **claude** ho dostáva cez `ANTHROPIC_MODEL`, **goose** cez `GOOSE_MODEL`, a
  **codex** cez `-c model_providers.omniroute.*` args. **Qwen je jediným spúšťacím
  cieľom, ktorý tvrdohlavo vyžaduje `--model`** — `omniroute run qwen` bez neho skončí
  s chybou `2`.
- `--port <port>` — lokálny port OmniRoute (predvolene `20128`, ignorovaný pri nastavení `--remote`).
  Prítomné na všetkých `setup-*` a oboch spúšťačoch.
- `omniroute run` kódy ukončenia: vlastný kód ukončenia dieťaťa CLI je propagovaný
  verbatim; `2` = neplatné argumenty (nepodporovaný cieľ, chýbajúci požadovaný
  `--model`, strážca kontajnera); `127` = cieľový binárny súbor nie je v `PATH`;
  `130`/`143`/`129` keď je spustenie ukončené `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = iné zlyhanie spúšťania.
- Dva spúšťače (`launch`, `launch-codex`) akceptujú `--profile <name>` na výber
  profilu napísaného príkazmi `setup-claude` / `setup-codex`, plus prechádzajúce args pre
  podkladový `claude` / `codex` binárny súbor.

Interaktívny výber je tiež zdieľaný receptami nastavenia:

```bash
# Vyberte z aktívneho lokálneho alebo vzdialeného modelového katalógu a nakonfigurujte cieľ.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` v súčasnosti deleguje na testované recepty pre `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, a `kilo`. Iba pre IDE,
MITM a iba pre sprievodcov zostávajú explicitné záznamy katalógu `setup-*`/manuálne toky a
nie sú prezentované ako spúšťateľné ciele.

> `setup-opencode` je **ľahká openai-kompatibilná** integrácia OpenCode.
> Existuje aj bohatšia pluginová integrácia — `omniroute setup opencode` — ktorá
> inštaluje `@omniroute/opencode-plugin`. Sú to rôzne príkazy; tabuľka
> vyššie dokumentuje `setup-opencode`.

---

## Lokálne používanie

S OmniRoute bežiacim na `localhost:20128`, jednoducho spustite príkaz na nastavenie pre váš nástroj. Katalóg sa načíta z lokálneho servera.

```bash
# Codex: napíšte profil pre zhodovaný model do ~/.codex/
omniroute setup-codex
codex --profile glm52            # použite vygenerovaný profil

# Claude Code: napíšte profily pre každý model, potom spustite jeden
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: napíšte poskytovateľa kompatibilného s openai so všetkými modelmi katalógu
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # odkazované cez {env:OMNIROUTE_API_KEY}, nikdy na disku
opencode -m omniroute/glm/glm-5.2 "..."

# Nástroje bez automatického objavovania potrebujú explicitný model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Náhľad bez písania čohokoľvek:
omniroute setup-continue --dry-run
```

Spustite bez písania akýchkoľvek konfigurácií (iba injekcia prostredia):

```bash
omniroute launch                 # Claude Code → lokálny OmniRoute
omniroute launch-codex           # Codex CLI → lokálny OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "odpoveď OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "odpoveď OK"
omniroute run qwen --model glm/glm-5.2 -- -p "odpoveď OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "odpoveď OK"

# Explicitná cesta príkazu: prejdite cez čokoľvek, čo príde po --
omniroute run claude -- --print-system-prompt "skontrolujte tento diff"
```

---

## Diaľkové používanie

Nasmerujte akýkoľvek príkaz na nastavenie na diaľkový OmniRoute s `--remote` + `--api-key`. Katalóg sa načíta z diaľky; konfigurácia sa zapisuje na vašom lokálnom počítači.

```bash
# OpenCode proti diaľkovému VPS, ponechajte iba glm/kimi modely
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # najprv exportujte OMNIROUTE_API_KEY

# Profily Codex z diaľkového katalógu
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Spustite CLI priamo proti diaľke
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Namiesto toho, aby ste zakaždým zadávali `--remote`/`--api-key`, prihláste sa raz a nechajte **aktívny kontext** ich automaticky poskytovať:

```bash
omniroute connect 192.168.0.15        # vytvorí obmedzený token, uloží kontext
omniroute setup-codex                 # ← teraz používa diaľkový katalóg
omniroute setup-opencode              # ← rovnaké
omniroute launch                      # ← Claude Code proti diaľke
```

Pozrite si [Diaľkový režim](./REMOTE-MODE.md) pre kontexty, rozsahy a správu tokenov.

---

## Konvencie základnej URL (ktoré nástroje chcú `/v1`)

OmniRoute vystavuje OpenAI rozhranie na `/v1`, Anthropic rozhranie na root,
a natívne Gemini rozhranie na `/v1beta`. Každá integrácia je pripojená k forme, ktorú
je jej nástroj očakáva (overené v zdroji príkazu):

| Integrácia                                                                 | Základná URL napísaná | `/v1`?                                       |
| -------------------------------------------------------------------------- | --------------------- | -------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | root                  | Nie — Cline pridáva `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | root                  | Nie — Goose pridáva cestu                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | root                  | Nie — LiteLLM pridáva `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | so `/v1`              | Áno                                          |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | root                  | Nie — Claude Code pridáva `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | so `/v1`              | Áno                                          |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | so `/v1`              | Áno                                          |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | root                  | Nie — SDK pridáva `/v1beta/models/…`         |

---

## Udržovanie natívnych závislostí pri aktualizácii: `--include=optional`

Keď aktualizujete pomocou `omniroute update` (po potvrdení alebo s `--apply`),
OmniRoute spúšťa inštaláciu s `--include=optional` zabudovaným:

```bash
npm install -g omniroute@latest --include=optional
```

Toto **nie je** flag, ktorý prechádzate do `omniroute update` — vždy sa aplikuje
aktualizátorom. Zaručuje, že `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM stack) prežijú aktualizáciu, aj keď vaša npm konfigurácia
má nastavené `omit=optional`, čo by inak potichu odstránilo natívny SQLite
ovládač a OS-keyring väzbu. Ak chcete zobraziť presný príkaz bez aplikovania:

```bash
omniroute update --dry-run
# [DRY RUN] Spustil by: npm install -g omniroute@latest --include=optional
```

Iné flagy `omniroute update` (overené v zdroji): `--check` (výstup 1, ak je
zastaralý), `--apply` (inštalácia bez výzvy), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI cez `omniroute run gemini`

Zmluva overená proti `@google/gemini-cli` 0.50.0: CLI rešpektuje
`GOOGLE_GEMINI_BASE_URL` a vydáva `POST /v1beta/models/<model>:generateContent`
(a `:streamGenerateContent?alt=sse`) proti nemu — presne ako natívny
Gemini povrch OmniRoute (`/v1beta`). `omniroute run gemini` to automaticky
prepojí:

- `GOOGLE_GEMINI_BASE_URL` → aktívna základná URL OmniRoute (root, bez `/v1`);
- `GEMINI_API_KEY` → vyriešené poverenie OmniRoute (možnosť/env/kontекст);
- **dočasný izolovaný `GEMINI_CLI_HOME`**, ktorého `.gemini/settings.json`
  vyberá autentifikáciu `gemini-api-key`, takže uložená relácia Google OAuth (Code Assist)
  nikdy neprepisuje spustenie riadené OmniRoute — odstránené po ukončení;
- **hygiena prostredia**: dieťaťu prostredia sú odstránené `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` a `GOOGLE_GENAI_USE_GCA` (čo by presmerovalo
  autentifikáciu na Vertex/Code Assist), a `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` je
  nastavené ako záložné — ostatné ciele `run` dostanú rovnakú
  liečbu pre svoje vlastné konfliktné premenné;
- injekcia `--model <id>` z `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Strážca dôvery v pracovnom priestore Gemini stále platí v bezhlavom režime — prejdite
`--skip-trust` (alebo dôverujte adresáru interaktívne) sami; spúšťač
úmyselne neobchádza. Tento spúšťač je odlišný od **registrácie ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), ktorá zostáva integráciou
agent-protokolu pre `/dashboard/acp-agents`.

---

## Skutočné dymové testovanie (opt-in)

Deterministické regresné spúšťanie plánov v CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Na overenie SKUTOČNÝCH binárnych súborov
proti SKUTOČNEMU serveru OmniRoute existuje opt-in rámec na
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikdy sa nespúšťa automaticky
(každý podtest preskočí, pokiaľ nie je `RUN_CLI_SMOKE=1`), predáva poverenie cez env-var
NÁZOV (nikdy nie hodnotou), rediguje reťazce tvaru kľúča z akéhokoľvek zaznamenaného výstupu,
preskočí ciele, ktorých binárny súbor nie je nainštalovaný, a klasifikuje zlyhania ako
auth / upstream / config namiesto holého booleana:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Voliteľné: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` obmedzuje testovanie;
`OMNIROUTE_SMOKE_TIMEOUT_MS` prepisuje timeout 120s na cieľ.

## Pozri tiež

- [Claude Code konfigurácia](./CLAUDE-CODE-CONFIGURATION.md) — hlbší sprievodca Claude Code
- [Codex CLI konfigurácia](./CODEX-CLI-CONFIGURATION.md) — jednorazové nastavenie `[model_providers.omniroute]`
- [Diaľkový režim](./REMOTE-MODE.md) — kontexty, prístupové tokeny s obmedzeným rozsahom, ovládanie vzdialeného servera
- [Referenčný materiál pre CLI nástroje](../reference/CLI-TOOLS.md) — kompletný katalóg podporovaných nástrojov + stránky ovládacieho panela
- [Príručka na nastavenie](./SETUP_GUIDE.md) — metódy inštalácie a onboarding pri prvom spustení
