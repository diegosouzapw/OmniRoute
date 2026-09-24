# CLI Integrations (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute levert een reeks `setup-*`-opdrachten waarmee een programmeer-CLI
(Codex, Claude Code, OpenCode, Cline, …) wordt geconfigureerd om OmniRoute als backend te gebruiken — zodat
de tool met **één** endpoint communiceert en OmniRoute met
automatische fallback naar de juiste provider routeert. Elke opdracht leest de **actuele** modelcatalogus van een actieve
OmniRoute-instantie (lokaal of extern) en schrijft het eigen configuratiebestand van de tool naar **jouw**
machine. Waar de tool dit ondersteunt, wordt via een omgevingsvariabele naar de API-sleutel verwezen. Opdrachten die een lokaal omgevingsbestand voor de tool opslaan, worden hieronder vermeld.

Er is ook een generiek startprogramma — `omniroute run <target>` — dat
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` of `gemini` start met de
juiste geïnjecteerde omgevingsvariabelen, zonder enige configuratie te schrijven. Doelen en hun
aliassen zijn afkomstig uit het canonieke manifest `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`) en `omniroute completion` biedt dezelfde
uit het manifest afgeleide doelwoorden. De verouderde afzonderlijke startprogramma's per tool —
`omniroute launch` (Claude Code) en `omniroute launch-codex` (Codex) — blijven
beschikbaar.

Het onboarden van providers is beschikbaar vanuit dezelfde lokale/externe context. De
onderstaande API-first-opdrachten houden beheerauthenticatie gescheiden van providerreferenties
en tonen nooit een referentie in gestructureerde uitvoer:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Gebruik voor scripts bij voorkeur `--credential-stdin` of `--credential-env`; `--credential`
blijft beschikbaar voor gecontroleerd lokaal gebruik. `providers remove` vereist `--yes` in een
niet-interactieve terminal en alle vijf opdrachten respecteren de actieve context of de
globale opties `--base-url`/`--api-key`.

Raadpleeg voor de eenmalige, handgeschreven basisconfiguratie van de twee uitgebreidste integraties de
uitgebreide handleidingen per tool:

- [Claude Code-configuratie](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI-configuratie](./CODEX-CLI-CONFIGURATION.md)
- [Externe modus](./REMOTE-MODE.md) — bedien een externe OmniRoute (VPS / Tailnet) vanaf je laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — de OmniCopilot-extensie; deze kan deze
  `setup-*`-opdrachten ook vanuit de editor voor je uitvoeren

---

## Hoofdtabel

Elke opdracht respecteert de **actieve context** (ingesteld met `omniroute connect`, zie
[Externe modus](./REMOTE-MODE.md)) of expliciete opties `--remote <url> --api-key <key>`.
"Lokaal versus extern" hieronder betekent: zonder opties richt de opdracht zich op `http://localhost:20128`;
met `--remote` (of een actieve externe context) haalt deze de catalogus op van die
server en schrijft deze de configuratie lokaal.

| Opdracht                   | Tool                         | Wat er wordt weggeschreven                                                                                                                                                                   | Belangrijkste opties                                                                                                                       | Lokaal versus extern |
| -------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — één profiel per compatibel tekstmodel (`codex --profile <name>`)                                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Beide                |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — één profiel per overeenkomend model (`CLAUDE_CONFIG_DIR`)                                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Beide                |
| `omniroute setup-opencode` | OpenCode (OpenAI-compatibel) | `~/.config/opencode/opencode.json` — `omniroute`-provider met elk model uit de catalogus (`opencode -m omniroute/<model>`)                                                                   | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Beide                |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI-modus) + geeft instellingen voor de VS Code-extensie weer                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Beide                |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + voegt `kilocode.*` samen met VS Code `settings.json` indien aanwezig                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Beide                |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — modellen met `provider: openai`, sleutel via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Beide                |
| `omniroute setup-cursor`   | Cursor                       | Niets — geeft de stappen in de app weer (de Cursor-configuratie is ondoorzichtige SQLite)                                                                                                    | `--remote` `--api-key` `--only` `--port`                                                                                                   | Beide                |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (importdocument) + stelt `roo-cline.autoImportSettingsPath` in als een VS Code-`settings.json` bestaat                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Beide                |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat`-provider, sleutel via `$OMNIROUTE_API_KEY`                                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Beide                |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + geeft een omgevingsrecept weer                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Beide                |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + geeft een omgevingsrecept weer                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Beide                |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4-`modelProviders.openai`-array + `OMNIROUTE_API_KEY` in `~/.qwen/.env`                                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Beide                |
| `omniroute setup-5dive`    | 5dive (agentvloot)           | Niets onder `$HOME` — schrijft een **auth-profiel** voor 5dive (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set`; alleen voor root, wordt uitgevoerd op de vloothost       | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Beide                |
| `omniroute run <target>`   | Runtime starten (generiek)   | Niets — start `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` met de juiste omgevingsvariabelen en argumenten; Qwen en Gemini gebruiken een tijdelijke geïsoleerde homedirectory | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Beide                |
| `omniroute launch`         | Claude Code                  | Niets — start `claude` met geïnjecteerde `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                         | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Beide                |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Niets — start `codex` met de via `-c`-opties geïnjecteerde `omniroute`-provider                                                                                                              | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Beide                |

Opmerkingen over vlaggen (geverifieerd in de broncode van de opdracht):

- `--remote <url>` — haalt de catalogus op van een externe OmniRoute (overschrijft `--port`
  en de actieve context). `--api-key <key>` geeft de referentie voor die
  server op (standaard de omgevingsvariabele `OMNIROUTE_API_KEY` of het token van de actieve context).
- `--only <patterns>` — door komma's gescheiden substrings; behoud alleen model-ID's die overeenkomen
  (bijv. `--only glm,kimi`). Beschikbaar voor `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — drukt exact af wat zou worden geschreven, zonder het
  bestandssysteem te wijzigen. Beschikbaar voor elke `setup-*`-opdracht, **behalve** `setup-cursor`
  (die nooit een bestand schrijft).
- `--model <id>` — vereist (of interactief gekozen) voor de tools zonder
  automatische modeldetectie: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Die tools
  accepteren ook `--yes` voor niet-interactieve uitvoeringen (waarvoor dan `--model` vereist is).
  `setup-opencode` gebruikt `--model` om het standaardmodel op het hoogste niveau in te stellen.
- `--model <id>` bij `omniroute run` volgt de bedrading per doel uit het manifest
  (`bin/cli/cli-manifest.mjs`): **aider** ontvangt `--model openai/<id>` en
  **opencode** `--model omniroute/<id>` (het voorvoegsel wordt alleen toegevoegd wanneer de ID
  dit nog niet bevat); **qwen** en **gemini** ontvangen de ID ongewijzigd;
  **claude** krijgt deze via `ANTHROPIC_MODEL`, **goose** via `GOOSE_MODEL` en
  **codex** via `-c model_providers.omniroute.*`-argumenten. **Qwen is het enige uitvoeringsdoel
  waarvoor `--model` strikt vereist is** — `omniroute run qwen` zonder deze vlag sluit af
  met `2` en een expliciete foutmelding.
- `--port <port>` — lokale OmniRoute-poort (standaard `20128`, genegeerd wanneer `--remote`
  is ingesteld). Aanwezig voor alle `setup-*`-opdrachten en beide starters.
- Afsluitcodes van `omniroute run`: de eigen afsluitcode van de onderliggende CLI wordt
  ongewijzigd doorgegeven; `2` = ongeldige argumenten (niet-ondersteund doel, ontbrekende vereiste
  `--model`, containerbeveiliging); `127` = het uitvoerbare bestand van het doel staat niet in `PATH`;
  `130`/`143`/`129` wanneer het starten wordt beëindigd door `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = andere runtimefout bij het starten.
- De twee starters (`launch`, `launch-codex`) accepteren `--profile <name>` om
  een profiel te selecteren dat door `setup-claude` / `setup-codex` is geschreven, plus doorgeefargumenten voor
  het onderliggende uitvoerbare bestand `claude` / `codex`.

De interactieve kiezer wordt ook gedeeld door de installatierecepten:

```bash
# Kies uit de actieve lokale of externe modelcatalogus en configureer het doel.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegeert momenteel naar de geteste recepten voor `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` en `5dive`.
Catalogusvermeldingen die alleen voor IDE's,
MITM of handleidingen zijn bedoeld, blijven expliciete `setup-*`-/handmatige procedures en
worden niet als startbare doelen weergegeven.

> `setup-opencode` is de **lichtgewicht, met OpenAI compatibele** OpenCode-integratie.
> Er is ook een uitgebreidere pluginintegratie — `omniroute setup opencode` — die
> `@omniroute/opencode-plugin` installeert. Het zijn verschillende opdrachten; de bovenstaande tabel
> documenteert `setup-opencode`.
>
> De plugin bestaat uit twee pakketten, één per hoofdversie van OpenCode, omdat de twee
> loaders verschillende toegangspunten verwachten:
> `@omniroute/opencode-plugin` voor OpenCode v1 en
> `@omniroute/opencode-plugin-v2` voor OpenCode v2. Het v2-pakket is nieuw
> (`0.1.0`) en volgt een hostcontract dat nog in beweging is, dus leest het
> de structuur die OpenCode in het catalogusconcept invoert in plaats van er één te veronderstellen. Installeer
> het door een `plugins`-vermelding toe te voegen aan `opencode.json`; `omniroute setup opencode`
> installeert nog steeds het v1-pakket. Opties en de opzoekvolgorde voor referenties staan in
> de README van het pakket.

---

## Lokaal gebruik

Als OmniRoute op `localhost:20128` draait, voer je gewoon de installatieopdracht voor je
tool uit. De catalogus wordt opgehaald van de lokale server.

```bash
# Codex: schrijf voor elk overeenkomend model een profiel naar ~/.codex/
omniroute setup-codex
codex --profile glm52            # gebruik een gegenereerd profiel

# Claude Code: schrijf profielen per model en start er vervolgens één
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: schrijf de OpenAI-compatibele provider met alle modellen uit de catalogus
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # benaderd via {env:OMNIROUTE_API_KEY}, nooit op schijf
opencode -m omniroute/glm/glm-5.2 "..."

# Tools zonder automatische detectie vereisen een expliciet model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Voorbeeld bekijken zonder iets te schrijven:
omniroute setup-continue --dry-run
```

Start zonder configuratie te schrijven (alleen injectie via omgevingsvariabelen):

```bash
omniroute launch                 # Claude Code → lokale OmniRoute
omniroute launch-codex           # Codex CLI → lokale OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Expliciet opdrachtpad: geef alles na -- ongewijzigd door
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Gebruik op afstand

Richt een installatieopdracht op een externe OmniRoute met `--remote` + `--api-key`. De
catalogus wordt opgehaald van de externe server; de configuratie wordt op je lokale machine geschreven.

```bash
# OpenCode met een externe VPS; behoud alleen glm/kimi-modellen
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exporteer eerst OMNIROUTE_API_KEY

# Codex-profielen uit een externe catalogus
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Start een CLI rechtstreeks tegen de externe server
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

In plaats van telkens `--remote`/`--api-key` mee te geven, meld je je één keer aan en laat je de
**actieve context** deze automatisch leveren:

```bash
omniroute connect 192.168.0.15        # maakt een token met beperkt bereik aan en slaat de context op
omniroute setup-codex                 # ← gebruikt nu de externe catalogus
omniroute setup-opencode              # ← hetzelfde
omniroute launch                      # ← Claude Code tegen de externe server
```

Zie [Externe modus](./REMOTE-MODE.md) voor contexten, bereiken en tokenbeheer.

---

## 5dive-agentvloten

[5dive](https://5dive.ai) beheert een vloot van langlopende programmeeragents, elk als een
systemd-unit onder een eigen Unix-gebruiker. Het is zelf geen programmeer-CLI, dus er is
niets dat `omniroute run` kan starten — `5dive` is een doel **uitsluitend voor configuratie**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Beide vormen schrijven één 5dive-**authenticatieprofiel**, waarna elke `claude`-seat die aan dat
profiel is gekoppeld met OmniRoute communiceert. Drie zaken zijn specifiek voor dit doel:

- **Het draait op de vloothost, als root.** De opdrachten van 5dive werken op lokale systemd-units
  en een statusmap die eigendom is van root; er is geen externe modus. Het recept start zichzelf opnieuw via
  `sudo` wanneer het nog niet als root draait (`--no-sudo` schakelt dat uit en toont in plaats daarvan de
  opdracht).
- **Het eindpunt moet `https://` gebruiken, tenzij het loopback is.** De API-sleutel van de agent
  wordt bij elk verzoek via die URL verzonden en 5dive weigert een onbeveiligd eindpunt buiten de host.
  Een privé-LAN-adres vormt hierop geen uitzondering.
- **De eigen modelvastlegging van elke seat heeft voorrang op het profiel.** Het profiel bevat
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, maar een seat die nog aan een standaard
  model-id is vastgelegd, faalt bij de eerste beurt met _"There's an issue with the selected model"_.
  Geef `--agent <name>` door (herhaalbaar) om ook de seats vast te leggen; het recept toont de
  opdracht wanneer je dit niet doet.

De API-sleutel wordt via **stdin** aan 5dive doorgegeven (`--api-key=-`), zodat deze nooit in
de uitvoer van `ps` verschijnt.

Door het profiel naar een OmniRoute-**combo** te laten verwijzen in plaats van naar één model,
krijgt de providervloot failover: toen het primaire eindpunt halverwege een beurt volledig uitviel
tijdens de uitvoering die is vastgelegd in
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), voltooide de agent
de resterende stappen via de fallback zonder de storing ooit zichtbaar te maken.

---

## Conventies voor basis-URL's (welke tools `/v1` vereisen)

OmniRoute stelt de OpenAI-interface beschikbaar op `/v1`, de Anthropic-interface op het hoofdpad
en een native Gemini-interface op `/v1beta`. Elke integratie is gekoppeld aan de vorm die de
tool verwacht (geverifieerd in de broncode van de opdracht):

| Integratie                                                                 | Geschreven basis-URL | `/v1`?                                         |
| -------------------------------------------------------------------------- | -------------------- | ---------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | hoofdpad             | Nee — Cline voegt `/v1/chat/completions` toe   |
| `setup-goose` (`OPENAI_HOST`)                                              | hoofdpad             | Nee — Goose voegt het pad toe                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | hoofdpad             | Nee — LiteLLM voegt `/v1/chat/completions` toe |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | met `/v1`            | Ja                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | hoofdpad             | Nee — Claude Code voegt `/v1/messages` toe     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | met `/v1`            | Ja                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | met `/v1`            | Ja                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | hoofdpad             | Nee — de SDK voegt `/v1beta/models/…` toe      |
| `setup-5dive` (`ANTHROPIC_BASE_URL` in het authenticatieprofiel)           | hoofdpad             | Nee — Claude Code voegt `/v1/messages` toe     |

---

## Native afhankelijkheden behouden bij updates: `--include=optional`

Wanneer u bijwerkt met `omniroute update` (na bevestiging of met `--apply`),
voert OmniRoute de installatie standaard uit met `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Dit is **geen** vlag die u aan `omniroute update` doorgeeft — deze wordt altijd door het
updateprogramma toegepast. Dit garandeert dat de `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, de LLMLingua SLM-stack) de update overleven, zelfs als in uw npm-configuratie
`omit=optional` is ingesteld. Anders zouden het native SQLite-stuurprogramma en de
OS-sleutelringkoppeling ongemerkt worden verwijderd. Gebruik het volgende om een voorbeeld van
de exacte opdracht te bekijken zonder deze uit te voeren:

```bash
omniroute update --dry-run
# [PROEFBETREKKING] Zou uitvoeren: npm install -g omniroute@latest --include=optional
```

Andere vlaggen voor `omniroute update` (geverifieerd in de broncode): `--check` (afsluitcode 1 als
de versie verouderd is), `--apply` (installeren zonder om bevestiging te vragen), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Contract geverifieerd aan de hand van `@google/gemini-cli` 0.50.0: de CLI respecteert
`GOOGLE_GEMINI_BASE_URL` en verstuurt `POST /v1beta/models/<model>:generateContent`
(en `:streamGenerateContent?alt=sse`) ernaartoe — exact de native Gemini-interface
van OmniRoute (`/v1beta`). `omniroute run gemini` configureert dit automatisch:

- `GOOGLE_GEMINI_BASE_URL` → de actieve OmniRoute-basis-URL (hoofdpad, zonder `/v1`);
- `GEMINI_API_KEY` → de opgeloste OmniRoute-referentie (optie/omgeving/context);
- een **tijdelijke, geïsoleerde `GEMINI_CLI_HOME`** waarvan `.gemini/settings.json`
  `gemini-api-key`-authenticatie selecteert, zodat een opgeslagen Google OAuth-sessie (Code Assist)
  de op OmniRoute gerichte start nooit overschrijft — verwijderd na afsluiten;
- **omgevingshygiëne**: `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` en
  `GOOGLE_GENAI_USE_GCA` worden uit de onderliggende omgeving verwijderd (omdat deze de
  authenticatie zouden omleiden naar Vertex/Code Assist), en
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` wordt ingesteld als extra voorzorgsmaatregel —
  de andere `run`-doelen krijgen dezelfde behandeling voor hun eigen conflicterende variabelen;
- injectie van `--model <id>` vanuit `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

De controle voor werkruimtevertrouwen van Gemini blijft ook in headless-modus van toepassing — geef zelf
`--skip-trust` door (of vertrouw de map interactief); het startprogramma omzeilt deze controle
bewust niet. Dit startprogramma staat los van de **ACP-registratie**
(`src/lib/acp/registry.ts`, `gemini --acp`), die de
agentprotocolintegratie voor `/dashboard/acp-agents` blijft.

---

## Echte smoke-sweep (opt-in)

Deterministische regressietests voor het opstartplan worden uitgevoerd in CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Om de ECHTE binaire bestanden te valideren tegen een ECHTE
OmniRoute-server, is er een opt-in testharnas beschikbaar op
`tests/integration/upstream-cli-smoke.int.test.ts`. Dit wordt nooit automatisch uitgevoerd
(elke subtest wordt overgeslagen tenzij `RUN_CLI_SMOKE=1`), geeft de referentie via de NAAM van een
omgevingsvariabele door (nooit via de waarde), redigeert sleutelachtige tekenreeksen uit alle
vastgelegde uitvoer, slaat doelen over waarvan het binaire bestand niet is geïnstalleerd en classificeert
fouten als auth / upstream / config in plaats van als een kale booleaanse waarde:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Optioneel: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` beperkt de sweep;
`OMNIROUTE_SMOKE_TIMEOUT_MS` overschrijft de time-out van 120 seconden per doel.

---

## Zie ook

- [Claude Code-configuratie](./CLAUDE-CODE-CONFIGURATION.md) — de uitgebreidere handleiding voor Claude Code
- [Codex CLI-configuratie](./CODEX-CLI-CONFIGURATION.md) — de eenmalige basisconfiguratie voor `[model_providers.omniroute]`
- [Externe modus](./REMOTE-MODE.md) — contexten, toegangstokens met een beperkt bereik en het aansturen van een externe server
- [CLI Tools-referentie](../reference/CLI-TOOLS.md) — de volledige catalogus van ondersteunde tools en dashboardpagina's
- [Installatiehandleiding](./SETUP_GUIDE.md) — installatiemethoden en onboarding bij de eerste uitvoering
