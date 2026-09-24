# CLI Integrations (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute nabízí sadu příkazů `setup-*`, které nakonfigurují programátorské
CLI (Codex, Claude Code, OpenCode, Cline, …) tak, aby používalo OmniRoute jako svůj backend —
nástroj tak komunikuje s **jedním** koncovým bodem a OmniRoute směruje požadavky ke správnému
poskytovateli s automatickým přepnutím na záložního poskytovatele. Každý příkaz načte **aktuální**
katalog modelů ze spuštěné instance OmniRoute (místní nebo vzdálené) a zapíše vlastní konfigurační
soubor daného nástroje na **vašem** počítači. Kdekoli to nástroj podporuje, je klíč API odkazován
pomocí proměnné prostředí. Příkazy, které ukládají místní soubor prostředí nástroje, jsou uvedeny níže.

K dispozici je také obecný spouštěč — `omniroute run <target>` — který spustí
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` nebo `gemini` se
správně vloženými proměnnými prostředí, aniž by zapisoval jakoukoli konfiguraci. Cíle a jejich
aliasy pocházejí z kanonického manifestu `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`) a `omniroute completion` nabízí
stejná cílová slova odvozená z manifestu. Původní spouštěče pro jednotlivé nástroje —
`omniroute launch` (Claude Code) a `omniroute launch-codex` (Codex) — zůstávají
k dispozici.

Přidávání poskytovatelů je dostupné ze stejného místního či vzdáleného kontextu. Níže
uvedené příkazy založené primárně na API oddělují ověřování pro správu od přihlašovacích údajů
poskytovatele a nikdy nevypisují přihlašovací údaje ve strukturovaném výstupu:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Ve skriptech upřednostňujte `--credential-stdin` nebo `--credential-env`; volba `--credential`
zůstává zachována pro kontrolované místní použití. `providers remove` vyžaduje `--yes`
v neinteraktivním terminálu a všech pět příkazů respektuje aktivní kontext nebo
globální volby `--base-url`/`--api-key`.

Informace o jednorázovém, ručně zapsaném základním nastavení dvou nejpropracovanějších integrací
najdete v podrobných návodech pro jednotlivé nástroje:

- [Konfigurace Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfigurace Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Vzdálený režim](./REMOTE-MODE.md) — ovládání vzdálené instance OmniRoute (VPS / Tailnet) z vašeho notebooku
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — rozšíření OmniCopilot; může za vás také spouštět tyto
  příkazy `setup-*` přímo z editoru

---

## Souhrnná tabulka

Každý příkaz respektuje **aktivní kontext** (nastavený pomocí `omniroute connect`, viz
[Vzdálený režim](./REMOTE-MODE.md)) nebo explicitní příznaky `--remote <url> --api-key <key>`.
„Místní vs. vzdálené“ níže znamená: bez příznaků cílí na `http://localhost:20128`;
s `--remote` (nebo aktivním vzdáleným kontextem) načte katalog z daného
serveru a zapíše konfiguraci místně.

| Příkaz                     | Nástroj                          | Co zapisuje                                                                                                                                                                                  | Hlavní příznaky                                                                                                                            | Lokální vs. vzdálené |
| -------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                 | `~/.codex/<name>.config.toml` — jeden profil pro každý kompatibilní textový model (`codex --profile <name>`)                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Obojí                |
| `omniroute setup-claude`   | Claude Code                      | `~/.claude/profiles/<name>/settings.json` — jeden profil pro každý odpovídající model (`CLAUDE_CONFIG_DIR`)                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Obojí                |
| `omniroute setup-opencode` | OpenCode (kompatibilní s OpenAI) | `~/.config/opencode/opencode.json` — poskytovatel `omniroute` se všemi modely v katalogu (`opencode -m omniroute/<model>`)                                                                   | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Obojí                |
| `omniroute setup-cline`    | Cline                            | `~/.cline/data/{globalState,secrets}.json` (režim CLI) + vypíše nastavení rozšíření VS Code                                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Obojí                |
| `omniroute setup-kilo`     | Kilo Code                        | `~/.local/share/kilo/auth.json` (CLI) + sloučí `kilocode.*` do souboru `settings.json` VS Code, pokud existuje                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Obojí                |
| `omniroute setup-continue` | Continue / `cn` CLI              | `~/.continue/config.yaml` — modely s `provider: openai`, klíč prostřednictvím `${{ secrets.OMNIROUTE_API_KEY }}`                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Obojí                |
| `omniroute setup-cursor`   | Cursor                           | Nic — vypíše kroky, které je třeba provést v aplikaci (konfigurace Cursoru je uložena v neprůhledné databázi SQLite)                                                                         | `--remote` `--api-key` `--only` `--port`                                                                                                   | Obojí                |
| `omniroute setup-roo`      | Roo Code                         | `~/.omniroute/roo-settings.json` (dokument pro import) + nastaví `roo-cline.autoImportSettingsPath`, pokud existuje soubor `settings.json` VS Code                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Obojí                |
| `omniroute setup-crush`    | Crush                            | `~/.config/crush/crush.json` — poskytovatel `openai-compat`, klíč prostřednictvím `$OMNIROUTE_API_KEY`                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Obojí                |
| `omniroute setup-goose`    | Goose                            | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + vypíše postup nastavení proměnných prostředí                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obojí                |
| `omniroute setup-aider`    | Aider                            | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + vypíše postup nastavení proměnných prostředí                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Obojí                |
| `omniroute setup-qwen`     | Qwen Code                        | `~/.qwen/settings.json` — pole V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Obojí                |
| `omniroute setup-5dive`    | 5dive (flotila agentů)           | Nic v `$HOME` — zapíše **ověřovací profil** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) prostřednictvím `5dive agent auth set`; pouze pro uživatele root, spouští se na hostiteli flotily | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Obojí                |
| `omniroute run <target>`   | Spuštění za běhu (obecné)        | Nic — spustí `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` se správnými proměnnými prostředí a argumenty; Qwen a Gemini používají dočasný izolovaný domovský adresář           | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Obojí                |
| `omniroute launch`         | Claude Code                      | Nic — spustí `claude` s vloženými proměnnými `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                     | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Obojí                |
| `omniroute launch-codex`   | OpenAI Codex CLI                 | Nic — spustí `codex` s poskytovatelem `omniroute` vloženým prostřednictvím příznaků `-c`                                                                                                     | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Obojí                |

Poznámky k příznakům (ověřeno ve zdrojovém kódu příkazu):

- `--remote <url>` — načte katalog ze vzdáleného OmniRoute (má přednost před `--port`
  a aktivním kontextem). `--api-key <key>` poskytne přihlašovací údaj pro tento
  server (výchozí je proměnná prostředí `OMNIROUTE_API_KEY` nebo token aktivního kontextu).
- `--only <patterns>` — podřetězce oddělené čárkami; ponechá pouze ID modelů, která se
  shodují (např. `--only glm,kimi`). K dispozici u `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — vypíše přesně to, co by bylo zapsáno, aniž by změnil souborový
  systém. K dispozici u každého příkazu `setup-*` **kromě** `setup-cursor`
  (který nikdy nezapisuje soubor).
- `--model <id>` — povinné (nebo vybrané interaktivně) pro nástroje, které nemají
  automatické zjišťování modelů: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Tyto nástroje
  také podporují `--yes` pro neinteraktivní spuštění (které pak vyžaduje `--model`).
  `setup-opencode` používá `--model` k nastavení výchozího modelu nejvyšší úrovně.
- `--model <id>` u `omniroute run` se řídí zapojením pro jednotlivé cíle v manifestu
  (`bin/cli/cli-manifest.mjs`): **aider** obdrží `--model openai/<id>` a
  **opencode** `--model omniroute/<id>` (prefix se přidá pouze tehdy, pokud jej ID
  ještě neobsahuje); **qwen** a **gemini** obdrží ID beze změny;
  **claude** jej získá prostřednictvím `ANTHROPIC_MODEL`, **goose** prostřednictvím `GOOSE_MODEL` a
  **codex** prostřednictvím argumentů `-c model_providers.omniroute.*`. **Qwen je jediný
  cíl příkazu run, který striktně vyžaduje `--model`** — `omniroute run qwen` bez něj skončí
  s kódem `2` a explicitní chybou.
- `--port <port>` — místní port OmniRoute (výchozí `20128`, ignoruje se, když je nastaven
  `--remote`). Je přítomen u všech příkazů `setup-*` a obou spouštěčů.
- Návratové kódy `omniroute run`: vlastní návratový kód podřízeného CLI se předá
  beze změny; `2` = neplatné argumenty (nepodporovaný cíl, chybějící povinný
  `--model`, ochrana kontejneru); `127` = cílový binární soubor není v `PATH`;
  `130`/`143`/`129`, když je spuštění ukončeno signálem `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = jiné selhání spuštění za běhu.
- Dva spouštěče (`launch`, `launch-codex`) podporují `--profile <name>` pro výběr
  profilu zapsaného příkazem `setup-claude` / `setup-codex` a také předávání argumentů
  podkladovému binárnímu souboru `claude` / `codex`.

Interaktivní výběr sdílejí také recepty nastavení:

```bash
# Vyberte z aktivního místního nebo vzdáleného katalogu modelů a nakonfigurujte cíl.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` aktuálně deleguje na otestované recepty pro `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` a `5dive`.
Položky katalogu určené pouze pro IDE,
MITM a návody zůstávají explicitními postupy `setup-*`/ručního nastavení a
nejsou prezentovány jako spustitelné cíle.

> `setup-opencode` je **odlehčená integrace OpenCode kompatibilní s openai**.
> Existuje také pokročilejší integrace pomocí pluginu — `omniroute setup opencode` — která
> instaluje `@omniroute/opencode-plugin`. Jde o odlišné příkazy; výše uvedená tabulka
> dokumentuje `setup-opencode`.
>
> Plugin je dostupný ve dvou balíčcích, jeden pro každou hlavní verzi OpenCode, protože oba
> zavaděče očekávají odlišné vstupní body:
> `@omniroute/opencode-plugin` pro OpenCode v1 a
> `@omniroute/opencode-plugin-v2` pro OpenCode v2. Balíček v2 je nový
> (`0.1.0`) a řídí se hostitelským kontraktem, který se stále mění, takže čte
> strukturu, kterou OpenCode vloží do konceptu katalogu, namísto toho, aby nějakou předpokládal. Nainstalujte
> jej přidáním položky `plugins` do `opencode.json`; `omniroute setup opencode`
> nadále instaluje balíček v1. Možnosti a pořadí vyhledávání přihlašovacích údajů jsou uvedeny
> v README balíčku.

---

## Lokální použití

Když OmniRoute běží na `localhost:20128`, stačí spustit příkaz pro nastavení vašeho
nástroje. Katalog se načte z lokálního serveru.

```bash
# Codex: zapsat profil pro každý odpovídající model do ~/.codex/
omniroute setup-codex
codex --profile glm52            # použít vygenerovaný profil

# Claude Code: zapsat profily pro jednotlivé modely a poté jeden spustit
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: zapsat poskytovatele kompatibilního s OpenAI se všemi modely katalogu
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # odkazováno přes {env:OMNIROUTE_API_KEY}, nikdy se neukládá na disk
opencode -m omniroute/glm/glm-5.2 "..."

# Nástroje bez automatického zjišťování vyžadují explicitní model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Náhled bez jakéhokoli zápisu:
omniroute setup-continue --dry-run
```

Spuštění zcela bez zápisu konfigurace (pouze předání přes proměnné prostředí):

```bash
omniroute launch                 # Claude Code → lokální OmniRoute
omniroute launch-codex           # Codex CLI → lokální OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Explicitní cesta k příkazu: vše za -- předejte beze změny
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Vzdálené použití

Nasměrujte libovolný příkaz pro nastavení na vzdálený OmniRoute pomocí `--remote` + `--api-key`.
Katalog se načte ze vzdáleného serveru a konfigurace se zapíše na váš lokální počítač.

```bash
# OpenCode proti vzdálenému VPS, zachovat pouze modely glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # nejprve exportovat OMNIROUTE_API_KEY

# Profily Codex ze vzdáleného katalogu
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Spustit CLI přímo proti vzdálenému serveru
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Místo předávání `--remote`/`--api-key` při každém spuštění se jednou přihlaste a nechte
je automaticky poskytovat prostřednictvím **aktivního kontextu**:

```bash
omniroute connect 192.168.0.15        # vytvoří token s omezeným rozsahem a uloží kontext
omniroute setup-codex                 # ← nyní používá vzdálený katalog
omniroute setup-opencode              # ← totéž
omniroute launch                      # ← Claude Code proti vzdálenému serveru
```

Informace o kontextech, rozsazích a správě tokenů najdete v dokumentu [Vzdálený režim](./REMOTE-MODE.md).

---

## Flotily agentů 5dive

[5dive](https://5dive.ai) provozuje flotilu dlouhodobě běžících programovacích agentů, z nichž každý je
jednotkou systemd pod vlastním uživatelem Unixu. Sám o sobě není programovacím CLI, takže
`omniroute run` nemá co spustit — `5dive` je cíl **pouze pro konfiguraci**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Obě varianty zapíší jeden **ověřovací profil** 5dive a každé místo `claude` svázané s tímto
profilem pak komunikuje s OmniRoute. Pro tento cíl jsou specifické tři věci:

- **Spouští se na hostiteli flotily jako root.** Příkazy 5dive pracují s lokálními jednotkami systemd
  a stavovým adresářem vlastněným uživatelem root; vzdálený režim není k dispozici. Pokud recept
  ještě neběží jako root, spustí se znovu prostřednictvím `sudo` (`--no-sudo` toto chování vypne
  a místo toho příkaz vypíše).
- **Koncový bod musí používat `https://`, pokud nejde o loopback.** Klíč API agenta
  se přes tuto adresu URL odesílá s každým požadavkem a 5dive odmítá nešifrovaný koncový bod
  mimo daný počítač. Privátní adresa LAN není výjimkou.
- **Vlastní připnutí modelu každého místa má přednost před profilem.** Profil obsahuje
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ale místo stále připnuté ke standardnímu
  ID modelu selže při své první interakci s hlášením _"There's an issue with the selected model"_.
  Pomocí `--agent <name>` (lze opakovat) připněte také jednotlivá místa; pokud tak neučiníte,
  recept příkaz vypíše.

Klíč API se nástroji 5dive předává přes **stdin** (`--api-key=-`), takže se nikdy neobjeví ve
výstupu `ps`.

Nasměrování profilu na **kombinaci** OmniRoute namísto jednoho modelu zajistí
pro flotilu přepnutí poskytovatele při selhání: když primární koncový bod během interakce
zaznamenané v
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) zcela přestal fungovat, agent dokončil
zbývající kroky přes záložní koncový bod a výpadek se uživateli vůbec neprojevil.

---

## Konvence základních URL (které nástroje vyžadují `/v1`)

OmniRoute zpřístupňuje rozhraní OpenAI na `/v1`, rozhraní Anthropic v kořeni
a nativní rozhraní Gemini na `/v1beta`. Každá integrace je nakonfigurována ve tvaru,
který její nástroj očekává (ověřeno ve zdrojovém kódu příkazu):

| Integrace                                                                  | Zapsaná základní URL | `/v1`?                                      |
| -------------------------------------------------------------------------- | -------------------- | ------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | kořen                | Ne — Cline připojí `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | kořen                | Ne — Goose připojí cestu                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | kořen                | Ne — LiteLLM připojí `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | s `/v1`              | Ano                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | kořen                | Ne — Claude Code připojí `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | s `/v1`              | Ano                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | s `/v1`              | Ano                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | kořen                | Ne — SDK připojí `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` v profilu ověřování)                   | kořen                | Ne — Claude Code připojí `/v1/messages`     |

---

## Zachování nativních závislostí při aktualizaci: `--include=optional`

Při aktualizaci pomocí `omniroute update` (po potvrzení nebo s `--apply`)
OmniRoute spustí instalaci se zabudovaným parametrem `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Toto **není** parametr, který předáváte příkazu `omniroute update` — aktualizační
nástroj jej použije vždy. Zaručuje, že `optionalDependencies` (`better-sqlite3`,
`keytar`, `tls-client`, zásobník SLM LLMLingua) přežijí aktualizaci, i když je
v konfiguraci npm nastaveno `omit=optional`, což by jinak bez upozornění odstranilo
nativní ovladač SQLite a vazbu na systémové úložiště klíčů. Chcete-li zobrazit
přesný příkaz bez jeho spuštění:

```bash
omniroute update --dry-run
# [ZKUŠEBNÍ BĚH] Spustil by se příkaz: npm install -g omniroute@latest --include=optional
```

Další parametry příkazu `omniroute update` (ověřeno ve zdrojovém kódu): `--check`
(ukončí se s kódem 1, pokud je verze zastaralá), `--apply` (instalace bez dotazu),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI prostřednictvím `omniroute run gemini`

Kontrakt ověřený vůči `@google/gemini-cli` 0.50.0: CLI respektuje
`GOOGLE_GEMINI_BASE_URL` a odesílá na tuto adresu požadavky
`POST /v1beta/models/<model>:generateContent` (a
`:streamGenerateContent?alt=sse`) — přesně na nativní rozhraní Gemini služby
OmniRoute (`/v1beta`). Příkaz `omniroute run gemini` vše nakonfiguruje automaticky:

- `GOOGLE_GEMINI_BASE_URL` → aktivní základní URL služby OmniRoute (kořen, bez `/v1`);
- `GEMINI_API_KEY` → zjištěné přihlašovací údaje OmniRoute (volba/prostředí/kontext);
- **dočasný izolovaný adresář `GEMINI_CLI_HOME`**, jehož soubor
  `.gemini/settings.json` vybírá ověřování `gemini-api-key`, takže uložená relace
  Google OAuth (Code Assist) nikdy nepřepíše spuštění směrované přes OmniRoute —
  po ukončení je adresář odstraněn;
- **hygiena prostředí**: z prostředí podřízeného procesu jsou odstraněny proměnné
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` a `GOOGLE_GENAI_USE_GCA` (které by
  ověřování přesměrovaly na Vertex/Code Assist) a jako dodatečné bezpečnostní
  opatření je nastavena proměnná `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` —
  ostatní cíle příkazu `run` jsou stejně ošetřeny proti vlastním konfliktním
  proměnným;
- vložení `--model <id>` z `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Ochrana důvěryhodnosti pracovního prostoru Gemini se uplatňuje i v bezobslužném
režimu — předejte sami `--skip-trust` (nebo adresáři interaktivně udělte důvěru);
spouštěč ji záměrně neobchází. Tento spouštěč se liší od **registrace ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), která zůstává integrací protokolu
agentů pro `/dashboard/acp-agents`.

---

## Skutečný smoke test (volitelný)

Deterministické regresní testy plánu spuštění běží v CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Pro ověření SKUTEČNÝCH binárních souborů vůči SKUTEČNÉMU
serveru OmniRoute je k dispozici volitelný testovací nástroj v
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikdy se nespouští automaticky
(každý dílčí test je přeskočen, pokud není nastaveno `RUN_CLI_SMOKE=1`), předává přihlašovací údaj prostřednictvím NÁZVU
proměnné prostředí (nikoli její hodnoty), rediguje řetězce připomínající klíče ve všech zaznamenaných výstupech, přeskakuje
cíle, jejichž binární soubor není nainstalován, a klasifikuje selhání jako
ověření / upstream / konfigurace namísto pouhé booleovské hodnoty:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Volitelně: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` omezí testování;
`OMNIROUTE_SMOKE_TIMEOUT_MS` přepíše časový limit 120 s pro každý cíl.

---

## Viz také

- [Konfigurace Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — podrobnější průvodce pro Claude Code
- [Konfigurace Codex CLI](./CODEX-CLI-CONFIGURATION.md) — jednorázové základní nastavení `[model_providers.omniroute]`
- [Vzdálený režim](./REMOTE-MODE.md) — kontexty, přístupové tokeny s omezeným rozsahem a ovládání vzdáleného serveru
- [Referenční příručka nástrojů CLI](../reference/CLI-TOOLS.md) — úplný katalog podporovaných nástrojů a stránek řídicího panelu
- [Průvodce nastavením](./SETUP_GUIDE.md) — způsoby instalace a úvodní nastavení při prvním spuštění
