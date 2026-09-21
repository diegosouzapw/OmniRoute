# CLI Integrations (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute levereras med en familj av `setup-*`-kommandon som konfigurerar ett
kodnings-CLI (Codex, Claude Code, OpenCode, Cline, …) för att använda OmniRoute som backend — så att
verktyget kommunicerar med **en** slutpunkt och OmniRoute dirigerar till rätt leverantör med
automatisk reservväxling. Varje kommando läser den **aktuella** modellkatalogen från en körande
OmniRoute-instans (lokal eller fjärransluten) och skriver verktygets egen konfigurationsfil på **din**
dator. API-nyckeln refereras via en miljövariabel där verktyget
stöder det. Kommandon som sparar en verktygslokal miljöfil anges nedan.

Det finns också en allmän startfunktion — `omniroute run <target>` — som startar
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` eller `gemini` med rätt
miljö injicerad, utan att skriva någon konfiguration alls. Mål och deras
alias hämtas från det kanoniska manifestet `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), och `omniroute completion` erbjuder samma
manifestbaserade målord. De äldre verktygsspecifika startfunktionerna —
`omniroute launch` (Claude Code) och `omniroute launch-codex` (Codex) — är fortfarande
tillgängliga.

Introduktion av leverantörer är tillgänglig från samma lokala eller fjärranslutna kontext. De
API-fokuserade kommandona nedan håller autentisering för administration åtskild från leverantörernas
autentiseringsuppgifter och skriver aldrig ut en autentiseringsuppgift i strukturerade utdata:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

För skript bör du föredra `--credential-stdin` eller `--credential-env`; `--credential`
finns kvar för kontrollerad lokal användning. `providers remove` kräver `--yes` i en
icke-interaktiv terminal, och alla fem kommandona respekterar den aktiva kontexten eller de
globala alternativen `--base-url`/`--api-key`.

För den inledande, manuella grundkonfigurationen av de två mest omfattande integrationerna, se de
verktygsspecifika fördjupningarna:

- [Konfiguration av Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfiguration av Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Fjärrläge](./REMOTE-MODE.md) — styr en fjärransluten OmniRoute-instans (VPS/Tailnet) från din bärbara dator
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — tillägget OmniCopilot; det kan också köra dessa
  `setup-*`-kommandon åt dig inifrån redigeraren

---

## Huvudtabell

Varje kommando respekterar den **aktiva kontexten** (som anges med `omniroute connect`, se
[Fjärrläge](./REMOTE-MODE.md)) eller explicita flaggor av typen `--remote <url> --api-key <key>`.
”Lokalt kontra fjärranslutet” nedan innebär att utan flaggor används `http://localhost:20128`;
med `--remote` (eller en aktiv fjärrkontext) hämtas katalogen från den
servern och konfigurationen skrivs lokalt.

| Kommando                   | Verktyg                       | Vad det skriver                                                                                                                                                               | Viktiga flaggor                                                                                                                            | Lokalt kontra fjärranslutet |
| -------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI              | `~/.codex/<name>.config.toml` — en profil per kompatibel textmodell (`codex --profile <name>`)                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Båda                        |
| `omniroute setup-claude`   | Claude Code                   | `~/.claude/profiles/<name>/settings.json` — en profil per matchande modell (`CLAUDE_CONFIG_DIR`)                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Båda                        |
| `omniroute setup-opencode` | OpenCode (OpenAI-kompatibelt) | `~/.config/opencode/opencode.json` — leverantören `omniroute` med alla katalogmodeller (`opencode -m omniroute/<model>`)                                                      | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Båda                        |
| `omniroute setup-cline`    | Cline                         | `~/.cline/data/{globalState,secrets}.json` (CLI-läge) + skriver ut inställningar för VS Code-tillägget                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Båda                        |
| `omniroute setup-kilo`     | Kilo Code                     | `~/.local/share/kilo/auth.json` (CLI) + sammanfogar `kilocode.*` med VS Codes `settings.json` om den finns                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Båda                        |
| `omniroute setup-continue` | Continue / `cn` CLI           | `~/.continue/config.yaml` — modeller med `provider: openai`, nyckel via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Båda                        |
| `omniroute setup-cursor`   | Cursor                        | Ingenting — skriver ut stegen i appen (Cursors konfiguration är ogenomskinlig SQLite)                                                                                         | `--remote` `--api-key` `--only` `--port`                                                                                                   | Båda                        |
| `omniroute setup-roo`      | Roo Code                      | `~/.omniroute/roo-settings.json` (importdokument) + anger `roo-cline.autoImportSettingsPath` om en `settings.json` för VS Code finns                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Båda                        |
| `omniroute setup-crush`    | Crush                         | `~/.config/crush/crush.json` — leverantören `openai-compat`, nyckel via `$OMNIROUTE_API_KEY`                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Båda                        |
| `omniroute setup-goose`    | Goose                         | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + skriver ut instruktioner för miljövariabler                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Båda                        |
| `omniroute setup-aider`    | Aider                         | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + skriver ut instruktioner för miljövariabler                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Båda                        |
| `omniroute setup-qwen`     | Qwen Code                     | `~/.qwen/settings.json` — V4-matrisen `modelProviders.openai` + `OMNIROUTE_API_KEY` i `~/.qwen/.env`                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Båda                        |
| `omniroute setup-5dive`    | 5dive (agentflotta)           | Ingenting under `$HOME` — skriver en **autentiseringsprofil** för 5dive (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set`; endast root, körs på flottvärden | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Båda                        |
| `omniroute run <target>`   | Runtime-start (generisk)      | Ingenting — startar `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` med rätt miljö och argument; Qwen och Gemini använder en tillfällig isolerad hemkatalog       | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Båda                        |
| `omniroute launch`         | Claude Code                   | Ingenting — startar `claude` med `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injicerade                                                                                       | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Båda                        |
| `omniroute launch-codex`   | OpenAI Codex CLI              | Ingenting — startar `codex` med leverantören `omniroute` injicerad via `-c`-flaggor                                                                                           | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Båda                        |

Anmärkningar om flaggor (verifierade i kommandots källkod):

- `--remote <url>` — hämta katalogen från en fjärransluten OmniRoute (åsidosätter `--port`
  och den aktiva kontexten). `--api-key <key>` anger autentiseringsuppgiften för den
  servern (standardvärdet är miljövariabeln `OMNIROUTE_API_KEY` eller den aktiva kontextens token).
- `--only <patterns>` — kommaseparerade delsträngar; behåll endast modell-ID:n som matchar
  (t.ex. `--only glm,kimi`). Tillgänglig för `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — skriv ut exakt vad som skulle skrivas utan att ändra
  filsystemet. Tillgänglig för alla `setup-*`-kommandon **utom** `setup-cursor`
  (som aldrig skriver någon fil).
- `--model <id>` — krävs (eller väljs interaktivt) för verktyg som saknar
  automatisk modellidentifiering: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Dessa verktyg
  accepterar även `--yes` för icke-interaktiva körningar (vilket då kräver `--model`).
  `setup-opencode` tar emot `--model` för att ange den överordnade standardmodellen.
- `--model <id>` för `omniroute run` följer manifestets koppling per mål
  (`bin/cli/cli-manifest.mjs`): **aider** tar emot `--model openai/<id>` och
  **opencode** `--model omniroute/<id>` (prefixet läggs bara till när ID:t
  inte redan har det); **qwen** och **gemini** tar emot ID:t ordagrant;
  **claude** får det via `ANTHROPIC_MODEL`, **goose** via `GOOSE_MODEL` och
  **codex** via argument av typen `-c model_providers.omniroute.*`. **Qwen är det enda körmålet
  som ovillkorligen kräver `--model`** — `omniroute run qwen` utan flaggan avslutas
  med koden `2` och ett uttryckligt felmeddelande.
- `--port <port>` — lokal OmniRoute-port (standardvärde `20128`, ignoreras när `--remote`
  har angetts). Finns för alla `setup-*` och båda startkommandona.
- Avslutningskoder för `omniroute run`: det underordnade CLI-verktygets egen avslutningskod vidarebefordras
  oförändrad; `2` = ogiltiga argument (mål som inte stöds, obligatorisk
  `--model` saknas, containerblockering); `127` = målbinärfilen finns inte i `PATH`;
  `130`/`143`/`129` när starten avslutas av `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = annat körningsfel vid start.
- De två startkommandona (`launch`, `launch-codex`) accepterar `--profile <name>` för att välja
  en profil som skapats av `setup-claude` / `setup-codex`, samt vidarebefordrade argument för
  den underliggande binärfilen `claude` / `codex`.

Den interaktiva väljaren delas även av konfigurationsrecepten:

```bash
# Välj från den aktiva lokala eller fjärranslutna modellkatalogen och konfigurera målet.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegerar för närvarande till de testade recepten för `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` och `5dive`.
Katalogposter som endast gäller IDE,
MITM eller guider förblir uttryckliga `setup-*`-/manuella flöden och
presenteras inte som startbara mål.

> `setup-opencode` är den **lättviktiga openai-kompatibla** OpenCode-integrationen.
> Det finns även en mer funktionsrik pluginintegration — `omniroute setup opencode` — som
> installerar `@omniroute/opencode-plugin`. Det är olika kommandon; tabellen
> ovan dokumenterar `setup-opencode`.
>
> Pluginprogrammet finns i två paket, ett per huvudversion av OpenCode, eftersom de två
> inläsarna förväntar sig olika startpunkter:
> `@omniroute/opencode-plugin` för OpenCode v1 och
> `@omniroute/opencode-plugin-v2` för OpenCode v2. v2-paketet är nytt
> (`0.1.0`) och följer ett värdkontrakt som fortfarande förändras, så det läser den
> struktur som OpenCode infogar i katalogutkastet i stället för att förutsätta en viss struktur. Installera
> det genom att lägga till en `plugins`-post i `opencode.json`; `omniroute setup opencode`
> installerar fortfarande v1-paketet. Alternativen och uppslagsordningen för autentiseringsuppgifter finns i
> paketets README.

---

## Lokal användning

När OmniRoute körs på `localhost:20128` behöver du bara köra installationskommandot för ditt
verktyg. Katalogen hämtas från den lokala servern.

```bash
# Codex: skriv en profil per matchad modell till ~/.codex/
omniroute setup-codex
codex --profile glm52            # använd en genererad profil

# Claude Code: skriv profiler per modell och starta sedan en
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: skriv den OpenAI-kompatibla providern med alla katalogmodeller
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # refereras via {env:OMNIROUTE_API_KEY}, aldrig på disk
opencode -m omniroute/glm/glm-5.2 "..."

# Verktyg utan automatisk identifiering behöver en explicit modell:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Förhandsgranska utan att skriva något:
omniroute setup-continue --dry-run
```

Starta utan att skriva någon konfiguration alls (endast miljövariabelinjektion):

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

# Explicit kommandosökväg: vidarebefordra allt som kommer efter --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Fjärranvändning

Rikta valfritt installationskommando mot en fjärransluten OmniRoute med `--remote` + `--api-key`. Katalogen
hämtas från fjärrservern och konfigurationen skrivs på din lokala dator.

```bash
# OpenCode mot en fjärr-VPS, behåll endast glm/kimi-modeller
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # exportera OMNIROUTE_API_KEY först

# Codex-profiler från en fjärrkatalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Starta ett CLI direkt mot fjärrservern
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

I stället för att ange `--remote`/`--api-key` varje gång kan du logga in en gång och låta den
**aktiva kontexten** tillhandahålla dem automatiskt:

```bash
omniroute connect 192.168.0.15        # skapar en avgränsad token och lagrar kontexten
omniroute setup-codex                 # ← använder nu fjärrkatalogen
omniroute setup-opencode              # ← samma sak
omniroute launch                      # ← Claude Code mot fjärrservern
```

Se [Fjärrläge](./REMOTE-MODE.md) för kontexter, behörighetsomfång och tokenhantering.

---

## 5dive-agentflottor

[5dive](https://5dive.ai) kör en flotta av långlivade kodningsagenter, där var och en är en
systemd-enhet under en egen Unix-användare. Det är inte självt ett kodnings-CLI, så det finns
inget som `omniroute run` kan starta — `5dive` är ett mål **endast för konfiguration**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Båda formerna skriver en **autentiseringsprofil** för 5dive, och varje `claude`-plats som är bunden till den
profilen kommunicerar därefter med OmniRoute. Tre saker är specifika för detta mål:

- **Det körs på flottvärden som root.** 5dives verb arbetar med lokala systemd-enheter
  och en root-ägd tillståndskatalog; det finns inget fjärrläge. Receptet kör om sig via
  `sudo` när det inte redan körs som root (`--no-sudo` stänger av detta och skriver ut
  kommandot i stället).
- **Ändpunkten måste vara `https://` om den inte är loopback.** Agentens API-nyckel
  skickas via den URL:en i varje begäran, och 5dive vägrar använda en okrypterad ändpunkt utanför värden.
  En privat LAN-adress är inget undantag.
- **Varje plats egen modellåsning har högre prioritet än profilen.** Profilen innehåller
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, men en plats som fortfarande är låst till ett standardmodell-id
  misslyckas vid sin första tur med _"Det finns ett problem med den valda modellen"_.
  Ange `--agent <name>` (kan upprepas) för att även låsa platserna; receptet skriver ut
  kommandot när du inte gör det.

API-nyckeln överlämnas till 5dive via **stdin** (`--api-key=-`), så den visas aldrig i
utdata från `ps`.

Genom att rikta profilen mot en OmniRoute-**kombination** i stället för en enskild modell får
flottan redundansväxling mellan providers: när den primära ändpunkten slutade fungera helt mitt under en tur
i körningen som dokumenterades i
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), slutförde agenten
sina återstående steg via reservlösningen utan att avbrottet någonsin blev synligt.

---

## Konventioner för bas-URL (vilka verktyg kräver `/v1`)

OmniRoute exponerar OpenAI-gränssnittet på `/v1`, Anthropic-gränssnittet i roten
och ett inbyggt Gemini-gränssnitt på `/v1beta`. Varje integration är kopplad till den form
som dess verktyg förväntar sig (verifierat i kommandots källkod):

| Integration                                                                | Skriven bas-URL | `/v1`?                                           |
| -------------------------------------------------------------------------- | --------------- | ------------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | rot             | Nej — Cline lägger till `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | rot             | Nej — Goose lägger till sökvägen                 |
| `setup-aider` (`OPENAI_API_BASE`)                                          | rot             | Nej — LiteLLM lägger till `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | med `/v1`       | Ja                                               |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | rot             | Nej — Claude Code lägger till `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | med `/v1`       | Ja                                               |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | med `/v1`       | Ja                                               |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | rot             | Nej — SDK:n lägger till `/v1beta/models/…`       |
| `setup-5dive` (`ANTHROPIC_BASE_URL` i autentiseringsprofilen)              | rot             | Nej — Claude Code lägger till `/v1/messages`     |

---

## Behåll inbyggda beroenden vid uppdatering: `--include=optional`

När du uppdaterar med `omniroute update` (efter bekräftelse eller med `--apply`)
kör OmniRoute installationen med `--include=optional` inbyggt:

```bash
npm install -g omniroute@latest --include=optional
```

Detta är **inte** en flagga som du skickar till `omniroute update` — den tillämpas alltid av
uppdateringsprogrammet. Det garanterar att `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM-stacken) finns kvar efter uppdateringen även om din npm-konfiguration
har `omit=optional` inställt, vilket annars utan förvarning skulle ta bort den inbyggda SQLite-
drivrutinen och kopplingen till operativsystemets nyckelring. För att förhandsgranska det exakta kommandot utan att tillämpa det:

```bash
omniroute update --dry-run
# [TORRKÖRNING] Skulle köra: npm install -g omniroute@latest --include=optional
```

Andra flaggor för `omniroute update` (verifierade i källkoden): `--check` (avsluta med 1 om
versionen är inaktuell), `--apply` (installera utan att fråga), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Kontraktet har verifierats mot `@google/gemini-cli` 0.50.0: CLI:n respekterar
`GOOGLE_GEMINI_BASE_URL` och skickar `POST /v1beta/models/<model>:generateContent`
(och `:streamGenerateContent?alt=sse`) till den — exakt OmniRoutes inbyggda
Gemini-gränssnitt (`/v1beta`). `omniroute run gemini` konfigurerar detta automatiskt:

- `GOOGLE_GEMINI_BASE_URL` → den aktiva OmniRoute-bas-URL:en (rot, inget `/v1`);
- `GEMINI_API_KEY` → den fastställda OmniRoute-autentiseringsuppgiften (alternativ/miljö/kontext);
- en **tillfällig isolerad `GEMINI_CLI_HOME`** vars `.gemini/settings.json`
  väljer autentisering med `gemini-api-key`, så att en lagrad Google OAuth-session (Code Assist)
  aldrig åsidosätter den OmniRoute-styrda starten — tas bort efter avslut;
- **miljöhygien**: den underordnade processens miljö rensas från `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` och `GOOGLE_GENAI_USE_GCA` (som annars skulle styra om
  autentiseringen till Vertex/Code Assist), och `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  ställs in som en extra säkerhetsåtgärd — de andra `run`-målen får samma
  behandling för sina egna motstridiga variabler;
- injicering av `--model <id>` från `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminis skydd för betrodda arbetsytor gäller fortfarande i huvudlöst läge — skicka
`--skip-trust` (eller markera katalogen som betrodd interaktivt) själv; startprogrammet
kringgår det avsiktligt inte. Detta startprogram skiljer sig från **ACP-
registreringen** (`src/lib/acp/registry.ts`, `gemini --acp`), som fortfarande är
agentprotokollsintegrationen för `/dashboard/acp-agents`.

---

## Verklig smoke-testsvit (valfri)

Deterministiska regressionstester av startplanen körs i CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). För att validera de VERKLIGA binärfilerna mot en VERKLIG
OmniRoute-server finns en valfri testsvit i
`tests/integration/upstream-cli-smoke.int.test.ts`. Den körs aldrig automatiskt
(varje deltest hoppas över om inte `RUN_CLI_SMOKE=1`), skickar autentiseringsuppgiften via miljövariabelns
NAMN (aldrig via värdet), maskerar nyckelliknande strängar i all loggad utdata, hoppar över
mål vars binärfil inte är installerad och klassificerar fel som
autentisering/uppströms/konfiguration i stället för ett enkelt booleskt värde:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Valfritt: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` begränsar testsviten;
`OMNIROUTE_SMOKE_TIMEOUT_MS` åsidosätter tidsgränsen på 120 s per mål.

---

## Se även

- [Konfiguration av Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — den mer djupgående guiden till Claude Code
- [Konfiguration av Codex CLI](./CODEX-CLI-CONFIGURATION.md) — den inledande grundkonfigurationen av `[model_providers.omniroute]`
- [Fjärrläge](./REMOTE-MODE.md) — kontexter, åtkomsttoken med begränsad omfattning och styrning av en fjärrserver
- [Referens för CLI-verktyg](../reference/CLI-TOOLS.md) — den fullständiga katalogen över verktyg som stöds samt dashboardsidor
- [Installationsguide](./SETUP_GUIDE.md) — installationsmetoder och introduktion vid första körningen
