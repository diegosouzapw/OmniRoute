# CLI Integrations (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute leverer en familie af `setup-*` kommandoer, der konfigurerer en kodnings-CLI (Codex, Claude Code, OpenCode, Cline, …) til at bruge OmniRoute som sin backend – så værktøjet taler til **ét** endpoint, og OmniRoute router til den rigtige udbyder med automatisk fallback. Hver kommando læser det **live** modelkatalog fra en kørende OmniRoute (lokal eller fjern) og skriver værktøjets egen konfigurationsfil på **din** maskine. API-nøglen refereres af en miljøvariabel, hvor værktøjet understøtter det. Kommandoer, der gemmer en værktøjs-lokal miljøfil, er angivet nedenfor.

Der er også en generisk launcher – `omniroute run <target>` – der starter `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` eller `gemini` med den rigtige env injiceret, uden at skrive nogen konfiguration overhovedet. Targets og deres aliasser kommer fra den kanoniske manifest `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), og `omniroute completion` tilbyder de samme manifest-afledte target-ord. De ældre per-værktøj launchere – `omniroute launch` (Claude Code) og `omniroute launch-codex` (Codex) – forbliver tilgængelige.

Udbyder-onboarding er tilgængelig fra den samme lokale/fjern kontekst. De API-første kommandoer nedenfor holder administrationsautentificering adskilt fra udbyderlegitimation og udskriver aldrig en legitimation i struktureret output:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Til scripts foretrækkes `--credential-stdin` eller `--credential-env`; `--credential` er bevaret til kontrolleret lokal brug. `providers remove` kræver `--yes` på en ikke-interaktiv terminal, og alle fem kommandoer respekterer den aktive kontekst eller de globale `--base-url`/`--api-key` indstillinger.

Udbydervælgere afviser tvetydige ID-præfikser, navne eller udbydernavne; brug et fuldt forbindelses-ID, når flere forbindelser matcher. Opret- og redigeringskommandoer læser den gemte forbindelse tilbage, og fjernelse verificerer, at den ikke længere er læsbar. En import springer et eksisterende udbyder/navn-par over. Importerede poster kan ikke tilsidesætte administrations-endpoint, kontekst eller administrationslegitimation, der leveres til CLI'en.

For den engangs, håndskrevne grundopsætning af de to rigeste integrationer, se de per-værktøj dybdegående gennemgange:

- [Claude Code-konfiguration](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI-konfiguration](./CODEX-CLI-CONFIGURATION.md)
- [Fjern-tilstand](./REMOTE-MODE.md) — styr en fjern OmniRoute (VPS / Tailnet) fra din laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot-udvidelsen; den kan også køre disse
  `setup-*` kommandoer for dig indefra editoren

---

## Hovedtabel

Hver kommando respekterer den **aktive kontekst** (angivet med `omniroute connect`, se
[Ekstern tilstand](./REMOTE-MODE.md)) eller eksplicitte flag som `--remote <url> --api-key <key>`.
"Lokal kontra ekstern" nedenfor betyder: Uden flag er målet `http://localhost:20128`;
med `--remote` (eller en aktiv ekstern kontekst) hentes kataloget fra den pågældende
server, og konfigurationen skrives lokalt.

| Kommando                   | Værktøj                       | Hvad den skriver                                                                                                                                                                        | Vigtige flag                                                                                                                               | Lokal vs. ekstern |
| -------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI              | `~/.codex/<name>.config.toml` — én profil pr. kompatibel tekstmodel (`codex --profile <name>`)                                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Begge             |
| `omniroute setup-claude`   | Claude Code                   | `~/.claude/profiles/<name>/settings.json` — én profil pr. matchende model (`CLAUDE_CONFIG_DIR`)                                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Begge             |
| `omniroute setup-opencode` | OpenCode (openai-kompatibel)  | `~/.config/opencode/opencode.json` — `omniroute`-udbyder med alle modeller i kataloget (`opencode -m omniroute/<model>`)                                                                | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Begge             |
| `omniroute setup-cline`    | Cline                         | `~/.cline/data/{globalState,secrets}.json` (CLI-tilstand) + udskriver indstillinger for VS Code-udvidelsen                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Begge             |
| `omniroute setup-kilo`     | Kilo Code                     | `~/.local/share/kilo/auth.json` (CLI) + fletter `kilocode.*` ind i VS Code-filen `settings.json`, hvis den findes                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Begge             |
| `omniroute setup-continue` | Continue / `cn` CLI           | `~/.continue/config.yaml` — modeller med `provider: openai`, nøgle via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Begge             |
| `omniroute setup-cursor`   | Cursor                        | Intet — udskriver trinnene i appen (Cursors konfiguration er uigennemsigtig SQLite)                                                                                                     | `--remote` `--api-key` `--only` `--port`                                                                                                   | Begge             |
| `omniroute setup-roo`      | Roo Code                      | `~/.omniroute/roo-settings.json` (importdokument) + indstiller `roo-cline.autoImportSettingsPath`, hvis en VS Code-fil med navnet `settings.json` findes                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Begge             |
| `omniroute setup-crush`    | Crush                         | `~/.config/crush/crush.json` — `openai-compat`-udbyder, nøgle via `$OMNIROUTE_API_KEY`                                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Begge             |
| `omniroute setup-goose`    | Goose                         | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + udskriver miljøopskrift                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Begge             |
| `omniroute setup-aider`    | Aider                         | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + udskriver miljøopskrift                                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Begge             |
| `omniroute setup-qwen`     | Qwen Code                     | `~/.qwen/settings.json` — V4-arrayen `modelProviders.openai` + `OMNIROUTE_API_KEY` i `~/.qwen/.env`                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Begge             |
| `omniroute setup-5dive`    | 5dive (agentflåde)            | Intet under `$HOME` — skriver en 5dive-**godkendelsesprofil** (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set`; kræver root og kører på flådeværten                  | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Begge             |
| `omniroute run <target>`   | Kørsel ved runtime (generisk) | Intet — starter `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` med det korrekte miljø og de korrekte argumenter; Qwen og Gemini bruger en midlertidig isoleret hjemmemappe | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Begge             |
| `omniroute launch`         | Claude Code                   | Intet — starter `claude` med de indsatte `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                    | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Begge             |
| `omniroute launch-codex`   | OpenAI Codex CLI              | Intet — starter `codex` med den indsatte `omniroute`-udbyder via `-c`-flag                                                                                                              | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Begge             |

Bemærkninger om flag (verificeret i kommandoens kildekode):

- `--remote <url>` — hent kataloget fra en ekstern OmniRoute (tilsidesætter `--port`
  og den aktive kontekst). `--api-key <key>` angiver legitimationsoplysningerne til den
  pågældende server (bruger som standard miljøvariablen `OMNIROUTE_API_KEY` eller tokenet fra den aktive kontekst).
- `--only <patterns>` — kommaseparerede delstrenge; behold kun model-id'er, der matcher
  (f.eks. `--only glm,kimi`). Tilgængelig på `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — udskriv præcis, hvad der ville blive skrevet, uden at ændre
  filsystemet. Tilgængelig på alle `setup-*`-kommandoer **undtagen** `setup-cursor`
  (som aldrig skriver en fil).
- `--model <id>` — påkrævet (eller vælges interaktivt) for de værktøjer, der ikke har
  automatisk modelregistrering: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Disse værktøjer
  accepterer også `--yes` til ikke-interaktive kørsler (hvilket så kræver `--model`).
  `setup-opencode` tager `--model` for at angive den øverste standardmodel.
- `--model <id>` på `omniroute run` følger manifestets konfiguration for hvert mål
  (`bin/cli/cli-manifest.mjs`): **aider** modtager `--model openai/<id>`, og
  **opencode** modtager `--model omniroute/<id>` (præfikset tilføjes kun, når id'et
  ikke allerede indeholder det); **qwen** og **gemini** modtager id'et ordret;
  **claude** får det via `ANTHROPIC_MODEL`, **goose** via `GOOSE_MODEL` og
  **codex** via `-c model_providers.omniroute.*`-argumenter. **Qwen er det eneste kørselsmål,
  der ubetinget kræver `--model`** — `omniroute run qwen` afsluttes uden dette med
  `2` og en udtrykkelig fejlmeddelelse.
- `--port <port>` — lokal OmniRoute-port (standardværdien er `20128`; ignoreres, når `--remote`
  er angivet). Findes på alle `setup-*`-kommandoer og begge startkommandoer.
- Afslutningskoder for `omniroute run`: Den underordnede CLI's egen afslutningskode videregives
  ordret; `2` = ugyldige argumenter (ikke-understøttet mål, manglende påkrævet
  `--model`, containerbeskyttelse); `127` = den binære målfil findes ikke i `PATH`;
  `130`/`143`/`129`, når starten afsluttes af `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = anden kørselsfejl ved start.
- De to startkommandoer (`launch`, `launch-codex`) accepterer `--profile <name>` for at vælge
  en profil, der er skrevet af `setup-claude` / `setup-codex`, samt argumenter, der
  videresendes til den underliggende binære `claude`- / `codex`-fil.

Den interaktive vælger deles også af opsætningsopskrifterne:

```bash
# Vælg fra det aktive lokale eller eksterne modelkatalog, og konfigurer målet.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegerer i øjeblikket til de testede opskrifter for `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` og `5dive`.
Katalogposter, der kun gælder IDE,
MITM eller vejledninger, forbliver eksplicitte `setup-*`-/manuelle forløb og
præsenteres ikke som mål, der kan startes.

> `setup-opencode` er den **enkle openai-kompatible** OpenCode-integration.
> Der findes også en mere omfattende pluginintegration — `omniroute setup opencode` — som
> installerer `@omniroute/opencode-plugin`. Det er forskellige kommandoer; tabellen
> ovenfor dokumenterer `setup-opencode`.
>
> Pluginet leveres i to pakker, én til hver hovedversion af OpenCode, fordi de to
> indlæsere forventer forskellige indgangspunkter:
> `@omniroute/opencode-plugin` til OpenCode v1 og
> `@omniroute/opencode-plugin-v2` til OpenCode v2. v2-pakken er ny
> (`0.1.0`) og følger en værtskontrakt, der stadig ændrer sig, så den læser den
> struktur, OpenCode indsætter i katalogudkastet, i stedet for at antage en bestemt struktur. Installer
> den ved at tilføje en `plugins`-post i `opencode.json`; `omniroute setup opencode`
> installerer stadig v1-pakken. Indstillingerne og rækkefølgen for opslag af legitimationsoplysninger findes i
> pakkens README.

---

## Lokal brug

Når OmniRoute kører på `localhost:20128`, skal du blot køre opsætningskommandoen for dit
værktøj. Kataloget hentes fra den lokale server.

```bash
# Codex: skriv en profil pr. matchende model i ~/.codex/
omniroute setup-codex
codex --profile glm52            # brug en genereret profil

# Claude Code: skriv profiler pr. model, og start derefter én
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: skriv den OpenAI-kompatible udbyder med alle katalogmodeller
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # refereres via {env:OMNIROUTE_API_KEY}, aldrig på disken
opencode -m omniroute/glm/glm-5.2 "..."

# Værktøjer uden automatisk registrering kræver en eksplicit model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Forhåndsvis uden at skrive noget:
omniroute setup-continue --dry-run
```

Start uden overhovedet at skrive nogen konfiguration (kun miljøinjektion):

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

# Eksplicit kommandosti: videresend alt, der kommer efter --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Fjernbrug

Ret enhver opsætningskommando mod en ekstern OmniRoute med `--remote` + `--api-key`.
Kataloget hentes fra den eksterne instans, og konfigurationen skrives på din lokale maskine.

```bash
# OpenCode mod en ekstern VPS, behold kun glm/kimi-modeller
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # eksportér først OMNIROUTE_API_KEY

# Codex-profiler fra et eksternt katalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Start en CLI direkte mod den eksterne instans
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

I stedet for at angive `--remote`/`--api-key` hver gang kan du logge ind én gang og lade den
**aktive kontekst** angive dem automatisk:

```bash
omniroute connect 192.168.0.15        # opretter et afgrænset token og gemmer konteksten
omniroute setup-codex                 # ← bruger nu det eksterne katalog
omniroute setup-opencode              # ← det samme
omniroute launch                      # ← Claude Code mod den eksterne instans
```

Se [Fjerntilstand](./REMOTE-MODE.md) for kontekster, omfang og tokenadministration.

---

## 5dive-agentflåder

[5dive](https://5dive.ai) kører en flåde af langvarigt kørende kodningsagenter, som hver er en
systemd-enhed under sin egen Unix-bruger. Det er ikke selv en kodnings-CLI, så der er
intet, som `omniroute run` kan starte — `5dive` er et mål **udelukkende til konfiguration**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Begge former skriver én 5dive-**godkendelsesprofil**, hvorefter hvert `claude`-sæde, der er knyttet til den
profil, kommunikerer med OmniRoute. Tre ting er særlige for dette mål:

- **Det kører på flådeværten som root.** 5dives verber fungerer på lokale systemd-enheder
  og en root-ejet tilstandsmappe; der er ingen fjerntilstand. Opskriften genstarter sig selv via
  `sudo`, når den ikke allerede kører som root (`--no-sudo` deaktiverer dette og udskriver
  kommandoen i stedet).
- **Slutpunktet skal bruge `https://`, medmindre det er loopback.** Agentens API-nøgle
  sendes via denne URL ved hver anmodning, og 5dive afviser et ukrypteret slutpunkt uden for værten.
  En privat LAN-adresse er ikke en undtagelse.
- **Hvert sædes egen modelbinding har højere prioritet end profilen.** Profilen indeholder
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, men et sæde, der stadig er bundet til et almindeligt
  model-id, fejler i sin første omgang med _"There's an issue with the selected model"_.
  Angiv `--agent <name>` (kan gentages) for også at binde sæderne; opskriften udskriver
  kommandoen, når du ikke gør det.

API-nøglen overdrages til 5dive via **stdin** (`--api-key=-`), så den aldrig vises i
outputtet fra `ps`.

Ved at rette profilen mod en OmniRoute-**kombination** frem for en enkelt model får
flåden udbyder-failover: Da det primære slutpunkt gik helt ned midt i en omgang
i den kørsel, der er dokumenteret i
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), færdiggjorde agenten
sine resterende trin på reserveløsningen uden nogensinde at vise afbrydelsen.

---

## Konventioner for basis-URL'er (hvilke værktøjer kræver `/v1`)

OmniRoute eksponerer OpenAI-grænsefladen på `/v1`, Anthropic-grænsefladen i roden
og en indbygget Gemini-grænseflade på `/v1beta`. Hver integration er konfigureret til den form, som dens
værktøj forventer (bekræftet i kommandokilden):

| Integration                                                                | Skrevet basis-URL | `/v1`?                                        |
| -------------------------------------------------------------------------- | ----------------- | --------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | rod               | Nej — Cline tilføjer `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | rod               | Nej — Goose tilføjer stien                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | rod               | Nej — LiteLLM tilføjer `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | med `/v1`         | Ja                                            |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | rod               | Nej — Claude Code tilføjer `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | med `/v1`         | Ja                                            |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | med `/v1`         | Ja                                            |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | rod               | Nej — SDK'et tilføjer `/v1beta/models/…`      |
| `setup-5dive` (`ANTHROPIC_BASE_URL` i godkendelsesprofilen)                | rod               | Nej — Claude Code tilføjer `/v1/messages`     |

---

## Bevar indbyggede afhængigheder ved opdatering: `--include=optional`

Når du opdaterer med `omniroute update` (efter bekræftelse eller med `--apply`),
kører OmniRoute installationen med `--include=optional` indbygget:

```bash
npm install -g omniroute@latest --include=optional
```

Dette er **ikke** et flag, som du angiver til `omniroute update` — det anvendes altid af
opdateringsprogrammet. Det garanterer, at `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM-stakken) bevares under opdateringen, selv hvis din npm-konfiguration
har `omit=optional` angivet, hvilket ellers i stilhed ville fjerne den indbyggede SQLite-
driver og bindingen til operativsystemets nøglering. Sådan forhåndsvises den præcise kommando uden at anvende den:

```bash
omniroute update --dry-run
# [TØRKØRSEL] Ville køre: npm install -g omniroute@latest --include=optional
```

Andre flag til `omniroute update` (bekræftet i kilden): `--check` (afslut med 1, hvis
forældet), `--apply` (installer uden at spørge), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Kontrakten er bekræftet mod `@google/gemini-cli` 0.50.0: CLI'en respekterer
`GOOGLE_GEMINI_BASE_URL` og sender `POST /v1beta/models/<model>:generateContent`
(og `:streamGenerateContent?alt=sse`) til den — præcis OmniRoutes indbyggede
Gemini-grænseflade (`/v1beta`). `omniroute run gemini` konfigurerer dette automatisk:

- `GOOGLE_GEMINI_BASE_URL` → den aktive OmniRoute-basis-URL (rod, uden `/v1`);
- `GEMINI_API_KEY` → OmniRoute-legitimationsoplysningerne, der er fundet via indstilling/miljø/kontekst;
- et **midlertidigt isoleret `GEMINI_CLI_HOME`**, hvis `.gemini/settings.json`
  vælger `gemini-api-key`-godkendelse, så en gemt Google OAuth-session (Code Assist)
  aldrig tilsidesætter den OmniRoute-styrede start — fjernes efter afslutning;
- **miljøhygiejne**: underprocessens miljø renses for `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` og `GOOGLE_GENAI_USE_GCA` (som ville omdirigere
  godkendelsen til Vertex/Code Assist), og `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  angives som en ekstra sikkerhedsforanstaltning — de øvrige `run`-mål får samme
  behandling for deres egne modstridende variabler;
- indsættelse af `--model <id>` fra `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminis beskyttelse af tillid til arbejdsområder gælder stadig i headless-tilstand — angiv selv
`--skip-trust` (eller markér mappen som pålidelig interaktivt); startprogrammet
omgår den bevidst ikke. Dette startprogram adskiller sig fra **ACP-
registreringen** (`src/lib/acp/registry.ts`, `gemini --acp`), som fortsat er
agentprotokol-integrationen for `/dashboard/acp-agents`.

---

## Reel smoke-gennemgang (tilvalg)

Deterministiske regressionstests af startplanen kører i CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Til validering af de RIGTIGE binære filer mod en RIGTIG
OmniRoute-server findes der en valgfri testmekanisme i
`tests/integration/upstream-cli-smoke.int.test.ts`. Den kører aldrig automatisk
(hver deltest springes over, medmindre `RUN_CLI_SMOKE=1`), videregiver legitimationsoplysningerne via miljøvariablens
NAVN (aldrig via værdien), bortredigerer nøglelignende strenge fra alt registreret output, springer
mål over, hvis binære fil ikke er installeret, og klassificerer fejl som
auth / upstream / config i stedet for en simpel boolesk værdi:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Valgfrit: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` begrænser gennemgangen;
`OMNIROUTE_SMOKE_TIMEOUT_MS` tilsidesætter timeoutgrænsen på 120 sekunder pr. mål.

---

## Se også

- [Konfiguration af Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — den mere dybdegående vejledning til Claude Code
- [Konfiguration af Codex CLI](./CODEX-CLI-CONFIGURATION.md) — den indledende engangsopsætning af `[model_providers.omniroute]`
- [Fjerntilstand](./REMOTE-MODE.md) — kontekster, adgangstokens med begrænset omfang og styring af en fjernserver
- [Reference til CLI-værktøjer](../reference/CLI-TOOLS.md) — det komplette katalog over understøttede værktøjer og dashboardsider
- [Opsætningsvejledning](./SETUP_GUIDE.md) — installationsmetoder og onboarding ved første kørsel
