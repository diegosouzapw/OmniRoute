# CLI-INTEGRATIONS (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI Integrasjoner — pek hvilken som helst kode-CLI mot OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Integrasjoner

OmniRoute leverer en familie av `setup-*` kommandoer som konfigurerer en kode-CLI (Codex, Claude Code, OpenCode, Cline, …) til å bruke OmniRoute som sin backend — slik at verktøyet snakker med **én** endepunkt og OmniRoute ruter til den riktige leverandøren med automatisk fallback. Hver kommando leser den **live** modellkatalogen fra en kjørende OmniRoute (lokal eller fjern) og skriver verktøyets egen konfigurasjonsfil på **din** maskin. API-nøkkelen refereres av en miljøvariabel der verktøyet støtter det. Kommandoer som vedvarer en verktøy-lokal miljøfil er notert nedenfor.

Det finnes også en generell launcher — `omniroute run <target>` — som starter `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` eller `gemini` med riktig miljø injisert, uten å skrive noen konfigurasjon i det hele tatt. Mål og deres aliaser kommer fra den kanoniske manifestfilen `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), og `omniroute completion` tilbyr de samme manifest-avledede målordene. De eldre per-verktøy launcherene —
`omniroute launch` (Claude Code) og `omniroute launch-codex` (Codex) — forblir tilgjengelige.

Leverandør onboarding er tilgjengelig fra den samme lokale/fjern konteksten. De API-første kommandoene nedenfor holder administrasjonsautentisering adskilt fra leverandørlegitimasjon og skriver aldri ut en legitimasjon i strukturert utdata:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

For skript, foretrekk `--credential-stdin` eller `--credential-env`; `--credential`
bevares for kontrollert lokal bruk. `providers remove` krever `--yes` på en
ikke-interaktiv terminal, og alle fem kommandoene respekterer den aktive konteksten eller de globale `--base-url`/`--api-key` alternativene.

For engangs, håndskrevet basisoppsett av de to rikeste integrasjonene, se
per-verktøy dypdykk:

- [Claude Code konfigurasjon](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfigurasjon](./CODEX-CLI-CONFIGURATION.md)
- [Fjernmodus](./REMOTE-MODE.md) — kjør en fjern OmniRoute (VPS / Tailnet) fra din bærbare datamaskin
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot-utvidelsen; den kan også kjøre disse
  `setup-*` kommandoene for deg fra inne i editoren

---

## Hovedtabell

Hver kommando respekterer den **aktive konteksten** (satt med `omniroute connect`, se
[Remote Mode](./REMOTE-MODE.md)) eller eksplisitte `--remote <url> --api-key <key>` flagg.
"Lokal vs fjern" nedenfor betyr: uten flagg retter den seg mot `http://localhost:20128`;
med `--remote` (eller en aktiv fjern kontekst) henter den katalogen fra den
serveren og skriver konfigurasjonen lokalt.

| Kommando                   | Verktøy                        | Hva den skriver                                                                                                                                                 | Nøkkel flagg                                                                                                                               | Lokal vs fjern |
| -------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — én profil per kompatibel tekstmodell (`codex --profile <name>`)                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Begge          |
| `omniroute setup-claude`   | Claude Code                    | `~/.claude/profiles/<name>/settings.json` — én profil per matchet modell (`CLAUDE_CONFIG_DIR`)                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Begge          |
| `omniroute setup-opencode` | OpenCode (openai-kompatibel)   | `~/.config/opencode/opencode.json` — `omniroute` leverandør med hver katalogmodell (`opencode -m omniroute/<model>`)                                            | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Begge          |
| `omniroute setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (CLI-modus) + skriver VS Code utvidelsesinnstillinger                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Begge          |
| `omniroute setup-kilo`     | Kilo Code                      | `~/.local/share/kilo/auth.json` (CLI) + slår sammen `kilocode.*` inn i VS Code `settings.json` hvis tilstede                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Begge          |
| `omniroute setup-continue` | Continue / `cn` CLI            | `~/.continue/config.yaml` — `provider: openai` modeller, nøkkel via `${{ secrets.OMNIROUTE_API_KEY }}`                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Begge          |
| `omniroute setup-cursor`   | Cursor                         | Ingenting — skriver trinnene i appen (Cursor-konfigurasjon er ugjennomsiktig SQLite)                                                                            | `--remote` `--api-key` `--only` `--port`                                                                                                   | Begge          |
| `omniroute setup-roo`      | Roo Code                       | `~/.omniroute/roo-settings.json` (importdokument) + setter `roo-cline.autoImportSettingsPath` hvis en VS Code `settings.json` eksisterer                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Begge          |
| `omniroute setup-crush`    | Crush                          | `~/.config/crush/crush.json` — `openai-kompat` leverandør, nøkkel via `$OMNIROUTE_API_KEY`                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Begge          |
| `omniroute setup-goose`    | Goose                          | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + skriver miljøoppskrift                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Begge          |
| `omniroute setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + skriver miljøoppskrift                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Begge          |
| `omniroute setup-qwen`     | Qwen Code                      | `~/.qwen/settings.json` — V4 `modelProviders.openai` array + `OMNIROUTE_API_KEY` i `~/.qwen/.env`                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Begge          |
| `omniroute run <target>`   | Kjøring av launcher (generisk) | Ingenting — start `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` med riktig miljø og argumenter; Qwen og Gemini bruker et midlertidig isolert hjem | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Begge          |
| `omniroute launch`         | Claude Code                    | Ingenting — starter `claude` med `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injisert                                                                           | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Begge          |
| `omniroute launch-codex`   | OpenAI Codex CLI               | Ingenting — starter `codex` med `omniroute` leverandøren injisert via `-c` flagg                                                                                | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Begge          |

Notater om flagg (verifisert i kommandoens kilde):

- `--remote <url>` — hent katalogen fra en fjern OmniRoute (overstyrer `--port`
  og den aktive konteksten). `--api-key <key>` gir legitimasjonen for den
  serveren (standard til `OMNIROUTE_API_KEY` miljøvariabelen, eller den aktive kontekstens token).
- `--only <patterns>` — komma-separerte substrenger; behold kun modell-ID-er som matcher
  (f.eks. `--only glm,kimi`). Tilgjengelig på `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — skriv ut nøyaktig hva som ville blitt skrevet uten å berøre
  filsystemet. Tilgjengelig på hver `setup-*` kommando **unntatt** `setup-cursor`
  (som aldri skriver en fil).
- `--model <id>` — påkrevd (eller valgt interaktivt) for verktøyene som ikke har
  modell auto-discovery: Cline, Kilo, Roo, Goose, Qwen, Aider. Disse verktøyene
  aksepterer også `--yes` for ikke-interaktive kjøringer (som da krever `--model`).
  `setup-opencode` tar `--model` for å sette standard toppnivåmodell.
- `--model <id>` på `omniroute run` følger manifestets per-mål kabling
  (`bin/cli/cli-manifest.mjs`): **aider** mottar `--model openai/<id>` og
  **opencode** `--model omniroute/<id>` (prefikset legges til kun når id-en
  ikke allerede bærer det); **qwen** og **gemini** mottar id-en ordrett;
  **claude** får det via `ANTHROPIC_MODEL`, **goose** via `GOOSE_MODEL`, og
  **codex** via `-c model_providers.omniroute.*` argumenter. **Qwen er det eneste kjøre
  målet som hard-krever `--model`** — `omniroute run qwen` uten det avslutter
  med `2` med en eksplisitt feil.
- `--port <port>` — lokal OmniRoute port (standard `20128`, ignorert når `--remote`
  er satt). Tilstede på alle `setup-*` og begge launcherene.
- `omniroute run` exit-koder: barn-CLI-ens egen exit-kode blir videreformidlet
  ordrett; `2` = ugyldige argumenter (støttet mål, manglende påkrevd
  `--model`, containerbeskyttelse); `127` = mål-binæren er ikke i `PATH`;
  `130`/`143`/`129` når lanseringen avsluttes av `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = annen kjøre-lanseringsfeil.
- De to launcherene (`launch`, `launch-codex`) aksepterer `--profile <name>` for å velge
  en profil skrevet av `setup-claude` / `setup-codex`, pluss pass-through argumenter for
  den underliggende `claude` / `codex` binæren.

Den interaktive velgeren deles også av oppsettsoppskriftene:

```bash
# Velg fra den aktive lokale eller fjern modellkatalogen og konfigurer målet.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegerer for øyeblikket til de testede oppskriftene for `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, og `kilo`. IDE-only,
MITM, og guide-only katalogoppføringer forblir eksplisitte `setup-*`/manuelle flyter og
blir ikke presentert som lanserbare mål.

> `setup-opencode` er den **lette openai-kompatible** OpenCode-integrasjonen.
> Det finnes også en rikere plugin-integrasjon — `omniroute setup opencode` — som
> installerer `@omniroute/opencode-plugin`. De er forskjellige kommandoer; tabellen
> ovenfor dokumenterer `setup-opencode`.

---

## Lokal bruk

Med OmniRoute som kjører på `localhost:20128`, kjør bare oppsettskommandoen for verktøyet ditt. Katalogen hentes fra den lokale serveren.

```bash
# Codex: skriv en profil per matchet modell inn i ~/.codex/
omniroute setup-codex
codex --profile glm52            # bruk en generert profil

# Claude Code: skriv per-modell profiler, og start deretter en
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: skriv den openai-kompatible leverandøren med alle katalogmodeller
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referert via {env:OMNIROUTE_API_KEY}, aldri på disk
opencode -m omniroute/glm/glm-5.2 "..."

# Verktøy uten automatisk oppdagelse trenger en eksplisitt modell:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Forhåndsvisning uten å skrive noe som helst:
omniroute setup-continue --dry-run
```

Start uten å skrive noen konfigurasjoner i det hele tatt (bare miljøinjeksjon):

```bash
omniroute launch                 # Claude Code → lokal OmniRoute
omniroute launch-codex           # Codex CLI → lokal OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Eksplisitt kommandosti: send gjennom hva som helst som kommer etter --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Fjernbruk

Pek hvilken som helst oppsettskommando mot en fjern OmniRoute med `--remote` + `--api-key`. Katalogen hentes fra den fjerne; konfigurasjonen skrives på din lokale maskin.

```bash
# OpenCode mot en fjern VPS, behold kun glm/kimi modeller
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # eksporter OMNIROUTE_API_KEY først

# Codex profiler fra en fjern katalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Start en CLI direkte mot den fjerne
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

I stedet for å sende `--remote`/`--api-key` hver gang, logg inn én gang og la den **aktive konteksten** levere dem automatisk:

```bash
omniroute connect 192.168.0.15        # lager en avgrenset token, lagrer konteksten
omniroute setup-codex                 # ← bruker nå den fjerne katalogen
omniroute setup-opencode              # ← samme
omniroute launch                      # ← Claude Code mot den fjerne
```

Se [Fjernmodus](./REMOTE-MODE.md) for kontekster, omfang og tokenhåndtering.

---

## Base URL-konvensjoner (hvilke verktøy ønsker `/v1`)

OmniRoute eksponerer OpenAI-overflaten på `/v1`, Anthropic-overflaten på roten, og en native Gemini-overflate på `/v1beta`. Hver integrasjon er koblet til formen verktøyet forventer (verifisert i kommandokilden):

| Integrasjon                                                                | Base URL skrevet | `/v1`?                                          |
| -------------------------------------------------------------------------- | ---------------- | ----------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | rot              | Nei — Cline legger til `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | rot              | Nei — Goose legger til stien                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | rot              | Nei — LiteLLM legger til `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | med `/v1`        | Ja                                              |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | rot              | Nei — Claude Code legger til `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | med `/v1`        | Ja                                              |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | med `/v1`        | Ja                                              |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | rot              | Nei — SDK legger til `/v1beta/models/…`         |

---

## Holde native avhengigheter oppdatert: `--include=optional`

Når du oppdaterer med `omniroute update` (etter å ha bekreftet, eller med `--apply`),
kjører OmniRoute installasjonen med `--include=optional` innebygd:

```bash
npm install -g omniroute@latest --include=optional
```

Dette er **ikke** et flagg du sender til `omniroute update` — det blir alltid brukt av
oppdatereren. Det garanterer at `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM-stakken) overlever oppdateringen selv om npm-konfigurasjonen din
har `omit=optional` satt, noe som ellers stille ville fjernet den native SQLite
driveren og OS-keyring bindingen. For å forhåndsvise den eksakte kommandoen uten å bruke den:

```bash
omniroute update --dry-run
# [DRY RUN] Ville kjørt: npm install -g omniroute@latest --include=optional
```

Andre `omniroute update` flagg (verifisert i kildekoden): `--check` (exit 1 hvis
utdatert), `--apply` (installer uten å spørre), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Kontrakten er verifisert mot `@google/gemini-cli` 0.50.0: CLI-en respekterer
`GOOGLE_GEMINI_BASE_URL` og sender `POST /v1beta/models/<model>:generateContent`
(og `:streamGenerateContent?alt=sse`) mot den — nøyaktig OmniRoute sin native
Gemini-overflate (`/v1beta`). `omniroute run gemini` kobler dette automatisk:

- `GOOGLE_GEMINI_BASE_URL` → den aktive OmniRoute base-URL-en (rot, ingen `/v1`);
- `GEMINI_API_KEY` → den løste OmniRoute-legitimasjonen (alternativ/miljø/kontekst);
- en **midlertidig isolert `GEMINI_CLI_HOME`** hvis `.gemini/settings.json`
  velger `gemini-api-key` autentisering, slik at en lagret Google OAuth-økt (Code Assist)
  aldri overskriver den OmniRoute-styrte lanseringen — fjernet etter avslutning;
- **miljøhygiene**: barne-miljøet er renset for `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` og `GOOGLE_GENAI_USE_GCA` (som ville omdirigere
  autentisering til Vertex/Code Assist), og `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` er
  satt som en belte-og-seler fallback — de andre `run` målene får samme
  behandling for sine egne konfliktfylte variabler;
- `--model <id>` injeksjon fra `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminis arbeidsområde-trustbeskyttelse gjelder fortsatt i hodeløs modus — send
`--skip-trust` (eller stol på katalogen interaktivt) selv; lansereren
omgår bevisst ikke dette. Denne lansereren er forskjellig fra **ACP
registreringen** (`src/lib/acp/registry.ts`, `gemini --acp`), som forblir
agent-protokollintegrasjonen for `/dashboard/acp-agents`.

---

## Ekte røykfjerning (opt-in)

Deterministiske lanseringsplan regresjonskjøringer i CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). For å validere de EKTTE binærene mot en EKTTE
OmniRoute-server, finnes det en opt-in ramme på
`tests/integration/upstream-cli-smoke.int.test.ts`. Den kjører aldri automatisk
(alle under-testene hopper over med mindre `RUN_CLI_SMOKE=1`), sender legitimasjonen via miljøvariabel
NAVN (aldri ved verdi), redigerer nøkkel-formede strenger fra all registrert utdata, hopper over
mål hvis binæren ikke er installert, og klassifiserer feil som
autentisering / upstream / konfigurasjon i stedet for en ren boolsk:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Valgfritt: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` begrenser feiingen;
`OMNIROUTE_SMOKE_TIMEOUT_MS` overstyrer 120s per-mål tidsgrense.

---

## Se også

- [Claude Code-konfigurasjon](./CLAUDE-CODE-CONFIGURATION.md) — den dypere Claude Code-guiden
- [Codex CLI-konfigurasjon](./CODEX-CLI-CONFIGURATION.md) — den engangs `[model_providers.omniroute]` grunnoppsettet
- [Fjernmodus](./REMOTE-MODE.md) — kontekster, avgrensede tilgangstokener, kjøring av en fjernserver
- [CLI-verktøyreferanse](../reference/CLI-TOOLS.md) — den komplette katalogen over støttede verktøy + dashbord-sider
- [Installasjonsveiledning](./SETUP_GUIDE.md) — installasjonsmetoder og onboarding ved første kjøring
