# CLI Integrations (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute leverer en familie med `setup-*`-kommandoer som konfigurerer en kode-
CLI (Codex, Claude Code, OpenCode, Cline, …) til å bruke OmniRoute som bakserver — slik at
verktøyet kommuniserer med **ett** endepunkt, mens OmniRoute ruter til riktig leverandør med
automatisk reservevalg. Hver kommando leser den **aktive** modellkatalogen fra en kjørende
OmniRoute-instans (lokal eller ekstern) og skriver verktøyets egen konfigurasjonsfil på **din**
maskin. API-nøkkelen refereres via en miljøvariabel der verktøyet
støtter dette. Kommandoer som lagrer en lokal miljøfil for verktøyet, er angitt nedenfor.

Det finnes også en generell oppstarter — `omniroute run <target>` — som starter
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` eller `gemini` med de
riktige miljøvariablene satt, uten å skrive noen konfigurasjon. Mål og tilhørende
aliaser kommer fra det kanoniske manifestet `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), og `omniroute completion` tilbyr de
samme manifestavledede målbetegnelsene. De eldre verktøyspesifikke oppstarterne —
`omniroute launch` (Claude Code) og `omniroute launch-codex` (Codex) — er fortsatt
tilgjengelige.

Leverandøroppsett er tilgjengelig fra den samme lokale eller eksterne konteksten. De
API-fokuserte kommandoene nedenfor holder administrasjonsautentisering adskilt fra leverandørens
legitimasjon og skriver aldri ut legitimasjon i strukturert utdata:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

For skript bør du foretrekke `--credential-stdin` eller `--credential-env`; `--credential`
beholdes for kontrollert lokal bruk. `providers remove` krever `--yes` i en
ikke-interaktiv terminal, og alle fem kommandoene respekterer den aktive konteksten eller de
globale alternativene `--base-url`/`--api-key`.

For det manuelle engangsgrunnoppsettet av de to mest omfattende integrasjonene, se de
verktøyspesifikke detaljveiledningene:

- [Konfigurasjon av Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfigurasjon av Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Ekstern modus](./REMOTE-MODE.md) — styr en ekstern OmniRoute (VPS / Tailnet) fra den bærbare datamaskinen din
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot-utvidelsen; den kan også kjøre disse
  `setup-*`-kommandoene for deg fra redigeringsprogrammet

---

## Hovedtabell

Hver kommando respekterer den **aktive konteksten** (angitt med `omniroute connect`, se
[Ekstern modus](./REMOTE-MODE.md)) eller eksplisitte flagg av typen `--remote <url> --api-key <key>`.
«Lokal kontra ekstern» nedenfor betyr: Uten flagg retter den seg mot `http://localhost:20128`;
med `--remote` (eller en aktiv ekstern kontekst) henter den katalogen fra den aktuelle
serveren og skriver konfigurasjonen lokalt.

| Kommando                   | Verktøy                      | Hva den skriver                                                                                                                                                                       | Viktige flagg                                                                                                                              | Lokal kontra ekstern |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — én profil per kompatibel tekstmodell (`codex --profile <name>`)                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Begge                |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — én profil per samsvarende modell (`CLAUDE_CONFIG_DIR`)                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Begge                |
| `omniroute setup-opencode` | OpenCode (OpenAI-kompatibel) | `~/.config/opencode/opencode.json` — `omniroute`-leverandør med alle katalogmodeller (`opencode -m omniroute/<model>`)                                                                | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Begge                |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI-modus) + skriver ut innstillinger for VS Code-utvidelsen                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Begge                |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + fletter `kilocode.*` inn i VS Code-filen `settings.json` hvis den finnes                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Begge                |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — modeller med `provider: openai`, nøkkel via `${{ secrets.OMNIROUTE_API_KEY }}`                                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Begge                |
| `omniroute setup-cursor`   | Cursor                       | Ingenting — skriver ut trinnene som skal utføres i appen (Cursor-konfigurasjonen er en ugjennomsiktig SQLite-database)                                                                | `--remote` `--api-key` `--only` `--port`                                                                                                   | Begge                |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (importdokument) + angir `roo-cline.autoImportSettingsPath` hvis en VS Code-fil med navnet `settings.json` finnes                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Begge                |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat`-leverandør, nøkkel via `$OMNIROUTE_API_KEY`                                                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Begge                |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + skriver ut oppskrift for miljøvariabler                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Begge                |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + skriver ut oppskrift for miljøvariabler                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Begge                |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4-arrayen `modelProviders.openai` + `OMNIROUTE_API_KEY` i `~/.qwen/.env`                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Begge                |
| `omniroute setup-5dive`    | 5dive (agentflåte)           | Ingenting under `$HOME` — skriver en 5dive-**autentiseringsprofil** (`/var/lib/5dive/auth-profiles/<name>/`) via `5dive agent auth set`; krever root og kjører på flåteverten         | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Begge                |
| `omniroute run <target>`   | Kjøringsstart (generisk)     | Ingenting — starter `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` med riktige miljøvariabler og argumenter; Qwen og Gemini bruker en midlertidig, isolert hjemmekatalog | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Begge                |
| `omniroute launch`         | Claude Code                  | Ingenting — starter `claude` med injiserte `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Begge                |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Ingenting — starter `codex` med `omniroute`-leverandøren injisert via `-c`-flagg                                                                                                      | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Begge                |

Merknader om flagg (verifisert i kommandokilden):

- `--remote <url>` — hent katalogen fra en ekstern OmniRoute (overstyrer `--port`
  og den aktive konteksten). `--api-key <key>` angir legitimasjonen for den
  serveren (standard er miljøvariabelen `OMNIROUTE_API_KEY` eller tokenet til den aktive konteksten).
- `--only <patterns>` — kommaseparerte delstrenger; behold bare modell-ID-er som samsvarer
  (f.eks. `--only glm,kimi`). Tilgjengelig for `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — skriv ut nøyaktig hva som ville blitt skrevet, uten å endre
  filsystemet. Tilgjengelig for alle `setup-*`-kommandoer **unntatt** `setup-cursor`
  (som aldri skriver en fil).
- `--model <id>` — påkrevd (eller valgt interaktivt) for verktøyene som ikke har
  automatisk modelloppdagelse: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Disse verktøyene
  godtar også `--yes` for ikke-interaktive kjøringer (som da krever `--model`).
  `setup-opencode` bruker `--model` til å angi standardmodellen på toppnivå.
- `--model <id>` på `omniroute run` følger manifestets oppsett per mål
  (`bin/cli/cli-manifest.mjs`): **aider** mottar `--model openai/<id>` og
  **opencode** `--model omniroute/<id>` (prefikset legges bare til når ID-en
  ikke allerede har det); **qwen** og **gemini** mottar ID-en ordrett;
  **claude** får den via `ANTHROPIC_MODEL`, **goose** via `GOOSE_MODEL` og
  **codex** via `-c model_providers.omniroute.*`-argumenter. **Qwen er det eneste kjøremålet
  som alltid krever `--model`** — `omniroute run qwen` uten dette avsluttes
  med `2` og en uttrykkelig feilmelding.
- `--port <port>` — lokal OmniRoute-port (standard `20128`, ignoreres når `--remote`
  er angitt). Finnes for alle `setup-*`-kommandoer og begge startkommandoene.
- Avslutningskoder for `omniroute run`: den underordnede CLI-ens egen avslutningskode videreformidles
  ordrett; `2` = ugyldige argumenter (mål som ikke støttes, manglende påkrevd
  `--model`, containerbeskyttelse); `127` = målbinærfilen finnes ikke i `PATH`;
  `130`/`143`/`129` når oppstarten avsluttes av `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = annen kjøretidsfeil under oppstart.
- De to startkommandoene (`launch`, `launch-codex`) godtar `--profile <name>` for å velge
  en profil skrevet av `setup-claude` / `setup-codex`, samt argumenter som sendes videre til
  den underliggende `claude`- / `codex`-binærfilen.

Den interaktive velgeren deles også av oppsettsoppskriftene:

```bash
# Velg fra den aktive lokale eller eksterne modellkatalogen, og konfigurer målet.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` delegerer for øyeblikket til de testede oppskriftene for `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` og `5dive`.
Katalogoppføringer som bare gjelder IDE,
MITM eller veiledninger, forblir eksplisitte `setup-*`-/manuelle arbeidsflyter og
presenteres ikke som startbare mål.

> `setup-opencode` er den **lettvektige openai-kompatible** OpenCode-integrasjonen.
> Det finnes også en mer omfattende plugin-integrasjon — `omniroute setup opencode` — som
> installerer `@omniroute/opencode-plugin`. Dette er forskjellige kommandoer; tabellen
> ovenfor dokumenterer `setup-opencode`.
>
> Plugin-modulen leveres i to pakker, én per hovedversjon av OpenCode, fordi de to
> lasterne forventer forskjellige inngangspunkter:
> `@omniroute/opencode-plugin` for OpenCode v1 og
> `@omniroute/opencode-plugin-v2` for OpenCode v2. v2-pakken er ny
> (`0.1.0`) og følger en vertskontrakt som fortsatt er i endring, så den leser
> strukturen OpenCode legger inn i katalogutkastet, i stedet for å anta en bestemt struktur. Installer
> den ved å legge til en `plugins`-oppføring i `opencode.json`; `omniroute setup opencode`
> installerer fortsatt v1-pakken. Alternativer og oppslagsrekkefølgen for legitimasjon finnes i
> pakkens README.

---

## Lokal bruk

Når OmniRoute kjører på `localhost:20128`, trenger du bare å kjøre konfigurasjonskommandoen for verktøyet ditt. Katalogen hentes fra den lokale serveren.

```bash
# Codex: skriv én profil per samsvarende modell til ~/.codex/
omniroute setup-codex
codex --profile glm52            # bruk en generert profil

# Claude Code: skriv profiler per modell, og start deretter én av dem
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: skriv den OpenAI-kompatible leverandøren med alle katalogmodellene
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # refereres via {env:OMNIROUTE_API_KEY}, aldri på disk
opencode -m omniroute/glm/glm-5.2 "..."

# Verktøy uten automatisk oppdagelse krever en eksplisitt modell:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Forhåndsvis uten å skrive noe:
omniroute setup-continue --dry-run
```

Start uten å skrive noen konfigurasjon i det hele tatt (kun miljøvariabelinjeksjon):

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

# Eksplisitt kommandobane: videresend alt som kommer etter --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Ekstern bruk

Pek en hvilken som helst konfigurasjonskommando mot en ekstern OmniRoute med `--remote` + `--api-key`. Katalogen hentes fra den eksterne serveren, og konfigurasjonen skrives på den lokale maskinen din.

```bash
# OpenCode mot en ekstern VPS, behold bare glm/kimi-modeller
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # eksporter OMNIROUTE_API_KEY først

# Codex-profiler fra en ekstern katalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Start et CLI direkte mot den eksterne serveren
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

I stedet for å angi `--remote`/`--api-key` hver gang kan du logge inn én gang og la den **aktive konteksten** oppgi dem automatisk:

```bash
omniroute connect 192.168.0.15        # oppretter et token med begrenset omfang og lagrer konteksten
omniroute setup-codex                 # ← bruker nå den eksterne katalogen
omniroute setup-opencode              # ← det samme
omniroute launch                      # ← Claude Code mot den eksterne serveren
```

Se [Ekstern modus](./REMOTE-MODE.md) for kontekster, omfang og tokenadministrasjon.

---

## 5dive-agentflåter

[5dive](https://5dive.ai) kjører en flåte med langvarige kodeagenter, der hver agent er en systemd-enhet under sin egen Unix-bruker. Det er ikke selv et CLI for koding, så det finnes ikke noe `omniroute run` kan starte — `5dive` er et mål **kun for konfigurering**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Begge formene skriver én 5dive-**autentiseringsprofil**, og hvert `claude`-sete som er knyttet til denne profilen, kommuniserer deretter med OmniRoute. Tre ting er spesifikke for dette målet:

- **Det kjører på flåteverten som root.** Verbene til 5dive opererer på lokale systemd-enheter og en root-eid tilstandskatalog. Det finnes ingen ekstern modus. Oppskriften kjører seg selv på nytt gjennom `sudo` når den ikke allerede kjører som root (`--no-sudo` deaktiverer dette og skriver ut kommandoen i stedet).
- **Endepunktet må bruke `https://`, med mindre det er loopback.** Agentens API-nøkkel følger denne URL-en i hver forespørsel, og 5dive avviser et ukryptert endepunkt utenfor verten. En privat LAN-adresse er ikke et unntak.
- **Hvert setes egen modellfesting har høyere prioritet enn profilen.** Profilen inneholder `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, men et sete som fortsatt er festet til en standard modell-ID, mislykkes i sin første runde med _"Det er et problem med den valgte modellen"_. Angi `--agent <name>` (kan gjentas) for å feste setene også. Oppskriften skriver ut kommandoen når du ikke gjør det.

API-nøkkelen sendes til 5dive via **stdin** (`--api-key=-`), slik at den aldri vises i utdataene fra `ps`.

Ved å peke profilen mot en OmniRoute-**kombinasjon** i stedet for én enkelt modell får flåten failover mellom leverandører: Da det primære endepunktet gikk helt ned midt i en runde under kjøringen som er dokumentert i [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), fullførte agenten de gjenværende trinnene via reserveløsningen uten noen gang å synliggjøre driftsavbruddet.

---

## Konvensjoner for basis-URL (hvilke verktøy som forventer `/v1`)

OmniRoute eksponerer OpenAI-grensesnittet på `/v1`, Anthropic-grensesnittet på roten
og et eget Gemini-grensesnitt på `/v1beta`. Hver integrasjon er konfigurert med formen
verktøyet forventer (verifisert i kommandokilden):

| Integrasjon                                                                | Angitt basis-URL | `/v1`?                                          |
| -------------------------------------------------------------------------- | ---------------- | ----------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | rot              | Nei — Cline legger til `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | rot              | Nei — Goose legger til banen                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | rot              | Nei — LiteLLM legger til `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | med `/v1`        | Ja                                              |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | rot              | Nei — Claude Code legger til `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | med `/v1`        | Ja                                              |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | med `/v1`        | Ja                                              |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | rot              | Nei — SDK-en legger til `/v1beta/models/…`      |
| `setup-5dive` (`ANTHROPIC_BASE_URL` i autentiseringsprofilen)              | rot              | Nei — Claude Code legger til `/v1/messages`     |

---

## Beholde native avhengigheter ved oppdatering: `--include=optional`

Når du oppdaterer med `omniroute update` (etter bekreftelse eller med `--apply`),
kjører OmniRoute installasjonen med `--include=optional` innebygd:

```bash
npm install -g omniroute@latest --include=optional
```

Dette er **ikke** et flagg du sender til `omniroute update` — det brukes alltid av
oppdateringsprogrammet. Det sikrer at `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM-stakken) beholdes gjennom oppdateringen, selv om npm-konfigurasjonen
din har `omit=optional` angitt, noe som ellers i stillhet ville fjernet den native SQLite-driveren
og OS-nøkkelringbindingen. Slik forhåndsviser du den nøyaktige kommandoen uten å utføre den:

```bash
omniroute update --dry-run
# [TØRRKJØRING] Ville kjørt: npm install -g omniroute@latest --include=optional
```

Andre flagg for `omniroute update` (verifisert i kilden): `--check` (avslutt med 1 hvis
utdatert), `--apply` (installer uten å spørre), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI via `omniroute run gemini`

Kontrakten er verifisert mot `@google/gemini-cli` 0.50.0: CLI-en respekterer
`GOOGLE_GEMINI_BASE_URL` og sender `POST /v1beta/models/<model>:generateContent`
(og `:streamGenerateContent?alt=sse`) til den — nøyaktig OmniRoutes native
Gemini-grensesnitt (`/v1beta`). `omniroute run gemini` konfigurerer dette automatisk:

- `GOOGLE_GEMINI_BASE_URL` → den aktive basis-URL-en for OmniRoute (rot, uten `/v1`);
- `GEMINI_API_KEY` → den utledede OmniRoute-legitimasjonen (alternativ/miljø/kontekst);
- en **midlertidig, isolert `GEMINI_CLI_HOME`** der `.gemini/settings.json`
  velger `gemini-api-key`-autentisering, slik at en lagret Google OAuth-økt (Code Assist)
  aldri overstyrer den OmniRoute-styrte oppstarten — fjernes etter avslutning;
- **miljøhygiene**: underprosessens miljø tømmes for `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` og `GOOGLE_GENAI_USE_GCA` (som ville omdirigert
  autentiseringen til Vertex/Code Assist), og `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  angis som en ekstra sikkerhetsmekanisme — de andre `run`-målene får samme
  behandling for sine egne motstridende variabler;
- injisering av `--model <id>` fra `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminis vern for godkjenning av arbeidsområdet gjelder fortsatt i hodeløs modus — oppgi
`--skip-trust` (eller godkjenn katalogen interaktivt) selv; oppstartsprogrammet
omgår det bevisst ikke. Dette oppstartsprogrammet er atskilt fra **ACP-registreringen**
(`src/lib/acp/registry.ts`, `gemini --acp`), som fortsatt er
agentprotokollintegrasjonen for `/dashboard/acp-agents`.

---

## Reell smoke-testkjøring (valgfri)

Deterministiske regresjonstester av oppstartsplanen kjøres i CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). For å validere de REELLE kjørbare filene mot en REELL
OmniRoute-server finnes det et valgfritt testrammeverk i
`tests/integration/upstream-cli-smoke.int.test.ts`. Det kjøres aldri automatisk
(hver deltest hoppes over med mindre `RUN_CLI_SMOKE=1`), sender akkreditivets miljøvariabel-NAVN
(aldri verdien), sladder nøkkelformede strenger fra alle registrerte utdata, hopper over
mål der den kjørbare filen ikke er installert, og klassifiserer feil som
autentisering / oppstrøms / konfigurasjon i stedet for en enkel boolsk verdi:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Valgfritt: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` begrenser testkjøringen;
`OMNIROUTE_SMOKE_TIMEOUT_MS` overstyrer tidsavbruddet på 120 sekunder per mål.

---

## Se også

- [Konfigurasjon av Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — den mer inngående veiledningen for Claude Code
- [Konfigurasjon av Codex CLI](./CODEX-CLI-CONFIGURATION.md) — engangsoppsettet av `[model_providers.omniroute]`
- [Ekstern modus](./REMOTE-MODE.md) — kontekster, avgrensede tilgangstokener og styring av en ekstern server
- [Referanse for CLI-verktøy](../reference/CLI-TOOLS.md) — den komplette katalogen over støttede verktøy og dashboardsider
- [Installasjonsveiledning](./SETUP_GUIDE.md) — installasjonsmetoder og førstegangsoppsett
