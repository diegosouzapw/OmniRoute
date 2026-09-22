# CLI Integrations (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute poskytuje skupinu príkazov `setup-*`, ktoré nakonfigurujú programovacie
CLI (Codex, Claude Code, OpenCode, Cline, …) tak, aby používalo OmniRoute ako svoj backend — vďaka čomu
nástroj komunikuje s **jedným** koncovým bodom a OmniRoute smeruje požiadavky k správnemu poskytovateľovi s
automatickým záložným prepnutím. Každý príkaz načíta **aktuálny** katalóg modelov zo spustenej
inštancie OmniRoute (lokálnej alebo vzdialenej) a zapíše vlastný konfiguračný súbor nástroja vo **vašom**
počítači. Kľúč API sa všade, kde to nástroj podporuje, odkazuje prostredníctvom premennej prostredia.
Príkazy, ktoré trvalo ukladajú lokálny súbor prostredia nástroja, sú uvedené nižšie.

K dispozícii je aj všeobecný spúšťač — `omniroute run <target>` — ktorý spustí
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` alebo `gemini` so
správne vloženými premennými prostredia bez zapisovania akejkoľvek konfigurácie. Ciele a ich
aliasy pochádzajú z kanonického manifestu `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`) a `omniroute completion` ponúka tie isté
názvy cieľov odvodené z manifestu. Pôvodné spúšťače pre jednotlivé nástroje —
`omniroute launch` (Claude Code) a `omniroute launch-codex` (Codex) — zostávajú
k dispozícii.

Pridávanie poskytovateľov je dostupné z rovnakého lokálneho/vzdialeného kontextu. Nižšie uvedené
príkazy orientované na API oddeľujú overenie totožnosti na účely správy od prihlasovacích údajov
poskytovateľa a nikdy nevypisujú prihlasovacie údaje v štruktúrovanom výstupe:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Pre skripty uprednostnite `--credential-stdin` alebo `--credential-env`; možnosť `--credential`
zostáva zachovaná na kontrolované lokálne použitie. Príkaz `providers remove` vyžaduje `--yes` v
neinteraktívnom termináli a všetkých päť príkazov rešpektuje aktívny kontext alebo
globálne možnosti `--base-url`/`--api-key`.

Jednorazové ručné základné nastavenie dvoch najbohatších integrácií nájdete v
podrobných návodoch pre jednotlivé nástroje:

- [Konfigurácia Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfigurácia Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Vzdialený režim](./REMOTE-MODE.md) — ovládajte vzdialenú inštanciu OmniRoute (VPS / Tailnet) zo svojho notebooku
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — rozšírenie OmniCopilot; tieto
  príkazy `setup-*` môže za vás spúšťať aj priamo v editore

---

## Hlavná tabuľka

Každý príkaz rešpektuje **aktívny kontext** (nastavený pomocou `omniroute connect`, pozrite si
[Vzdialený režim](./REMOTE-MODE.md)) alebo explicitné príznaky `--remote <url> --api-key <key>`.
„Lokálne verzus vzdialene“ nižšie znamená: bez príznakov sa používa `http://localhost:20128`;
s príznakom `--remote` (alebo aktívnym vzdialeným kontextom) sa katalóg načíta z daného
servera a konfigurácia sa zapíše lokálne.

| Príkaz                     | Nástroj                          | Čo zapisuje                                                                                                                                                                      | Kľúčové príznaky                                                                                                                           | Lokálne vs. vzdialené |
| -------------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                 | `~/.codex/<name>.config.toml` — jeden profil pre každý kompatibilný textový model (`codex --profile <name>`)                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Oboje                 |
| `omniroute setup-claude`   | Claude Code                      | `~/.claude/profiles/<name>/settings.json` — jeden profil pre každý zodpovedajúci model (`CLAUDE_CONFIG_DIR`)                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Oboje                 |
| `omniroute setup-opencode` | OpenCode (kompatibilný s OpenAI) | `~/.config/opencode/opencode.json` — poskytovateľ `omniroute` so všetkými modelmi katalógu (`opencode -m omniroute/<model>`)                                                     | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Oboje                 |
| `omniroute setup-cline`    | Cline                            | `~/.cline/data/{globalState,secrets}.json` (režim CLI) + vypíše nastavenia rozšírenia VS Code                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Oboje                 |
| `omniroute setup-kilo`     | Kilo Code                        | `~/.local/share/kilo/auth.json` (CLI) + zlúči `kilocode.*` do súboru VS Code `settings.json`, ak existuje                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Oboje                 |
| `omniroute setup-continue` | Continue / `cn` CLI              | `~/.continue/config.yaml` — modely s `provider: openai`, kľúč prostredníctvom `${{ secrets.OMNIROUTE_API_KEY }}`                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oboje                 |
| `omniroute setup-cursor`   | Cursor                           | Nič — vypíše kroky, ktoré treba vykonať v aplikácii (konfigurácia Cursor je v nepriehľadnej databáze SQLite)                                                                     | `--remote` `--api-key` `--only` `--port`                                                                                                   | Oboje                 |
| `omniroute setup-roo`      | Roo Code                         | `~/.omniroute/roo-settings.json` (dokument na import) + nastaví `roo-cline.autoImportSettingsPath`, ak existuje súbor VS Code `settings.json`                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Oboje                 |
| `omniroute setup-crush`    | Crush                            | `~/.config/crush/crush.json` — poskytovateľ `openai-compat`, kľúč prostredníctvom `$OMNIROUTE_API_KEY`                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oboje                 |
| `omniroute setup-goose`    | Goose                            | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + vypíše návod na nastavenie prostredia                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oboje                 |
| `omniroute setup-aider`    | Aider                            | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + vypíše návod na nastavenie prostredia                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oboje                 |
| `omniroute setup-qwen`     | Qwen Code                        | `~/.qwen/settings.json` — pole V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Oboje                 |
| `omniroute setup-5dive`    | 5dive (flotila agentov)          | Nič v `$HOME` — zapíše **profil overenia** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) prostredníctvom `5dive agent auth set`; len pre root, spúšťa sa na hostiteľovi flotily | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Oboje                 |
| `omniroute run <target>`   | Spustenie za behu (všeobecné)    | Nič — spustí `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` so správnym prostredím a argumentmi; Qwen a Gemini používajú dočasný izolovaný domovský adresár         | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Oboje                 |
| `omniroute launch`         | Claude Code                      | Nič — spustí `claude` s vloženými premennými `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                         | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Oboje                 |
| `omniroute launch-codex`   | OpenAI Codex CLI                 | Nič — spustí `codex` s poskytovateľom `omniroute` vloženým prostredníctvom príznakov `-c`                                                                                        | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Oboje                 |

Poznámky k príznakom (overené v zdrojovom kóde príkazu):

- `--remote <url>` — načíta katalóg zo vzdialeného OmniRoute (prepíše `--port`
  a aktívny kontext). `--api-key <key>` poskytne prihlasovací údaj pre daný
  server (predvolene z premennej prostredia `OMNIROUTE_API_KEY` alebo tokenu aktívneho kontextu).
- `--only <patterns>` — podreťazce oddelené čiarkami; ponechá iba ID modelov, ktoré sa zhodujú
  (napr. `--only glm,kimi`). Dostupné pre `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — vypíše presne to, čo by sa zapísalo, bez vykonania zmien v
  súborovom systéme. Dostupné pre každý príkaz `setup-*` **okrem** `setup-cursor`
  (ktorý nikdy nezapisuje súbor).
- `--model <id>` — povinné (alebo zvolené interaktívne) pre nástroje bez
  automatického zisťovania modelu: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Tieto nástroje
  akceptujú aj `--yes` pre neinteraktívne spustenia (ktoré potom vyžadujú `--model`).
  `setup-opencode` používa `--model` na nastavenie predvoleného modelu najvyššej úrovne.
- `--model <id>` pri `omniroute run` sa riadi zapojením jednotlivých cieľov v manifeste
  (`bin/cli/cli-manifest.mjs`): **aider** dostane `--model openai/<id>` a
  **opencode** `--model omniroute/<id>` (predpona sa pridá iba vtedy, ak ju ID
  ešte neobsahuje); **qwen** a **gemini** dostanú ID bez zmien;
  **claude** ho dostane prostredníctvom `ANTHROPIC_MODEL`, **goose** prostredníctvom `GOOSE_MODEL` a
  **codex** prostredníctvom argumentov `-c model_providers.omniroute.*`. **Qwen je jediný cieľ
  príkazu run, ktorý striktne vyžaduje `--model`** — `omniroute run qwen` bez neho skončí
  s kódom `2` a explicitnou chybou.
- `--port <port>` — lokálny port OmniRoute (predvolene `20128`, ignoruje sa, keď je nastavené `--remote`).
  Nachádza sa vo všetkých príkazoch `setup-*` aj v oboch spúšťačoch.
- Návratové kódy `omniroute run`: vlastný návratový kód podradeného CLI sa propaguje
  bez zmien; `2` = neplatné argumenty (nepodporovaný cieľ, chýbajúce povinné
  `--model`, ochrana kontajnera); `127` = cieľový binárny súbor sa nenachádza v `PATH`;
  `130`/`143`/`129`, keď spustenie ukončí `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = iné zlyhanie spustenia za behu.
- Dva spúšťače (`launch`, `launch-codex`) akceptujú `--profile <name>` na výber
  profilu zapísaného pomocou `setup-claude` / `setup-codex` a tiež odovzdávané argumenty pre
  podkladový binárny súbor `claude` / `codex`.

Interaktívny výber sa používa aj v receptoch nastavenia:

```bash
# Vyberte z aktívneho lokálneho alebo vzdialeného katalógu modelov a nakonfigurujte cieľ.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` v súčasnosti deleguje na otestované recepty pre `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` a `5dive`.
Položky katalógu určené iba pre IDE,
MITM a príručky zostávajú explicitnými postupmi `setup-*`/manuálnymi postupmi a
nie sú prezentované ako spustiteľné ciele.

> `setup-opencode` je **odľahčená integrácia OpenCode kompatibilná s openai**.
> Existuje aj bohatšia integrácia prostredníctvom pluginu — `omniroute setup opencode` — ktorá
> inštaluje `@omniroute/opencode-plugin`. Ide o odlišné príkazy; tabuľka
> vyššie dokumentuje `setup-opencode`.
>
> Plugin sa dodáva v dvoch balíkoch, po jednom pre každú hlavnú verziu OpenCode, pretože tieto dva
> načítavače očakávajú odlišné vstupné body:
> `@omniroute/opencode-plugin` pre OpenCode v1 a
> `@omniroute/opencode-plugin-v2` pre OpenCode v2. Balík v2 je nový
> (`0.1.0`) a riadi sa hostiteľským kontraktom, ktorý sa stále mení, preto načítava
> štruktúru, ktorú OpenCode vkladá do konceptu katalógu, namiesto toho, aby nejakú predpokladal. Nainštalujte
> ho pridaním položky `plugins` do `opencode.json`; `omniroute setup opencode`
> naďalej inštaluje balík v1. Možnosti a poradie vyhľadávania prihlasovacích údajov sú uvedené
> v README balíka.

---

## Lokálne použitie

Keď OmniRoute beží na `localhost:20128`, stačí spustiť príkaz na nastavenie vášho
nástroja. Katalóg sa načíta z lokálneho servera.

```bash
# Codex: zapíše profil pre každý zodpovedajúci model do ~/.codex/
omniroute setup-codex
codex --profile glm52            # použije vygenerovaný profil

# Claude Code: zapíše profily pre jednotlivé modely a potom jeden spustí
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: zapíše poskytovateľa kompatibilného s OpenAI so všetkými modelmi z katalógu
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # odkazuje sa naň cez {env:OMNIROUTE_API_KEY}, nikdy nie je uložený na disku
opencode -m omniroute/glm/glm-5.2 "..."

# Nástroje bez automatického zisťovania vyžadujú explicitný model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Náhľad bez zapisovania čohokoľvek:
omniroute setup-continue --dry-run
```

Spustenie bez zapísania akejkoľvek konfigurácie (iba vloženie premenných prostredia):

```bash
omniroute launch                 # Claude Code → lokálny OmniRoute
omniroute launch-codex           # Codex CLI → lokálny OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Explicitná cesta k príkazu: všetko za -- sa odovzdá bez zmeny
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Vzdialené použitie

Nasmerujte ľubovoľný nastavovací príkaz na vzdialený OmniRoute pomocou `--remote` + `--api-key`.
Katalóg sa načíta zo vzdialeného servera a konfigurácia sa zapíše na vašom lokálnom počítači.

```bash
# OpenCode so vzdialeným VPS, ponechá iba modely glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # najskôr exportujte OMNIROUTE_API_KEY

# Profily Codex zo vzdialeného katalógu
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Spustenie CLI priamo voči vzdialenému serveru
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Namiesto opakovaného zadávania `--remote`/`--api-key` sa raz prihláste a nechajte
**aktívny kontext**, aby ich poskytoval automaticky:

```bash
omniroute connect 192.168.0.15        # vytvorí token s obmedzeným rozsahom a uloží kontext
omniroute setup-codex                 # ← teraz používa vzdialený katalóg
omniroute setup-opencode              # ← rovnako
omniroute launch                      # ← Claude Code voči vzdialenému serveru
```

Informácie o kontextoch, rozsahoch a správe tokenov nájdete v časti [Vzdialený režim](./REMOTE-MODE.md).

---

## Flotily agentov 5dive

[5dive](https://5dive.ai) prevádzkuje flotilu dlhodobo bežiacich programovacích agentov, pričom každý z nich je
jednotkou systemd pod vlastným používateľom systému Unix. Sám osebe nie je programovacím CLI, takže
`omniroute run` nemá čo spustiť — `5dive` je cieľ **iba na konfiguráciu**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Obe formy zapíšu jeden **autorizačný profil** 5dive a každé pracovné miesto `claude` naviazané na tento
profil potom komunikuje s OmniRoute. Pre tento cieľ sú špecifické tri veci:

- **Spúšťa sa na hostiteľovi flotily ako root.** Príkazy 5dive pracujú s lokálnymi jednotkami systemd
  a stavovým adresárom vlastneným používateľom root; vzdialený režim nie je k dispozícii. Recept sa opätovne spustí cez
  `sudo`, ak už nebeží ako root (`--no-sudo` to vypne a namiesto toho vypíše
  príkaz).
- **Koncový bod musí používať `https://`, pokiaľ nejde o loopback.** API kľúč agenta
  sa cez túto URL prenáša pri každej požiadavke a 5dive odmieta nešifrovaný koncový bod mimo hostiteľa.
  Súkromná adresa LAN nie je výnimkou.
- **Vlastné pripnutie modelu každého pracovného miesta má prednosť pred profilom.** Profil obsahuje
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ale pracovné miesto, ktoré je stále pripnuté k štandardnému
  identifikátoru modelu, zlyhá pri prvej interakcii s hlásením _"There's an issue with the selected model"_.
  Zadajte `--agent <name>` (možno opakovať), aby ste pripli aj pracovné miesta; ak tak neurobíte, recept
  vypíše príslušný príkaz.

API kľúč sa odovzdáva nástroju 5dive cez **stdin** (`--api-key=-`), takže sa nikdy nezobrazí vo
výstupe `ps`.

Nasmerovanie profilu na **kombináciu** OmniRoute namiesto jedného modelu poskytne
flotile prepnutie pri zlyhaní poskytovateľa: keď primárny koncový bod počas interakcie úplne prestal fungovať
v behu zaznamenanom v
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agent dokončil
zostávajúce kroky cez záložný koncový bod bez toho, aby používateľovi oznámil výpadok.

---

## Konvencie základnej URL (ktoré nástroje vyžadujú `/v1`)

OmniRoute sprístupňuje rozhranie OpenAI na `/v1`, rozhranie Anthropic v koreňovej ceste
a natívne rozhranie Gemini na `/v1beta`. Každá integrácia je nakonfigurovaná vo forme,
ktorú jej nástroj očakáva (overené v zdrojovom kóde príkazu):

| Integrácia                                                                 | Zapísaná základná URL | `/v1`?                                       |
| -------------------------------------------------------------------------- | --------------------- | -------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | koreňová cesta        | Nie — Cline pridáva `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | koreňová cesta        | Nie — Goose pridáva cestu                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | koreňová cesta        | Nie — LiteLLM pridáva `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | s `/v1`               | Áno                                          |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | koreňová cesta        | Nie — Claude Code pridáva `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | s `/v1`               | Áno                                          |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | s `/v1`               | Áno                                          |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | koreňová cesta        | Nie — SDK pridáva `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` v autorizačnom profile)                | koreňová cesta        | Nie — Claude Code pridáva `/v1/messages`     |

---

## Zachovanie natívnych závislostí pri aktualizácii: `--include=optional`

Keď vykonáte aktualizáciu pomocou `omniroute update` (po potvrdení alebo s `--apply`),
OmniRoute spustí inštaláciu so zabudovaným parametrom `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Toto **nie je** parameter, ktorý odovzdávate príkazu `omniroute update` — aktualizačný
nástroj ho použije vždy. Zaručuje, že `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, zásobník SLM LLMLingua) zostanú zachované aj po aktualizácii, a to aj vtedy,
keď je v konfigurácii npm nastavené `omit=optional`, čo by inak bez upozornenia odstránilo
natívny ovládač SQLite a prepojenie na úložisko kľúčov operačného systému. Ak chcete
zobraziť presný príkaz bez jeho vykonania:

```bash
omniroute update --dry-run
# [SKÚŠOBNÉ SPUSTENIE] Spustil by sa príkaz: npm install -g omniroute@latest --include=optional
```

Ďalšie parametre príkazu `omniroute update` (overené v zdrojovom kóde): `--check`
(ukončenie s kódom 1, ak je verzia zastaraná), `--apply` (inštalácia bez výzvy na
potvrdenie), `--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI prostredníctvom `omniroute run gemini`

Kontrakt bol overený voči `@google/gemini-cli` 0.50.0: CLI rešpektuje
`GOOGLE_GEMINI_BASE_URL` a odosiela požiadavky `POST /v1beta/models/<model>:generateContent`
(a `:streamGenerateContent?alt=sse`) na túto adresu — presne na natívne rozhranie
Gemini v OmniRoute (`/v1beta`). Príkaz `omniroute run gemini` to nakonfiguruje automaticky:

- `GOOGLE_GEMINI_BASE_URL` → aktívna základná URL OmniRoute (koreňová cesta, bez `/v1`);
- `GEMINI_API_KEY` → určené prihlasovacie údaje OmniRoute (voľba/prostredie/kontext);
- **dočasný izolovaný adresár `GEMINI_CLI_HOME`**, ktorého `.gemini/settings.json`
  vyberá autentifikáciu `gemini-api-key`, takže uložená relácia Google OAuth (Code Assist)
  nikdy neprepíše spustenie smerované na OmniRoute — po ukončení sa adresár odstráni;
- **hygiena prostredia**: z prostredia podradeného procesu sa odstránia
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` a `GOOGLE_GENAI_USE_GCA` (ktoré by
  presmerovali autentifikáciu na Vertex/Code Assist) a ako dodatočná poistka sa nastaví
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` — s ostatnými cieľmi príkazu `run` sa
  zaobchádza rovnako pri ich vlastných konfliktných premenných;
- vloženie `--model <id>` z `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Ochrana dôveryhodnosti pracovného priestoru v Gemini sa uplatňuje aj v bezobslužnom
režime — parameter `--skip-trust` musíte odovzdať sami (alebo interaktívne označiť
adresár ako dôveryhodný); spúšťací nástroj ju zámerne neobchádza. Tento spúšťací nástroj
sa líši od **registrácie ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), ktorá zostáva
integráciou protokolu agentov pre `/dashboard/acp-agents`.

---

## Reálny smoke test (voliteľný)

Deterministické regresné testy plánu spúšťania sa vykonávajú v CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Na overenie SKUTOČNÝCH binárnych súborov voči SKUTOČNÉMU
serveru OmniRoute je k dispozícii voliteľný testovací nástroj v
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikdy sa nespúšťa automaticky
(každý čiastkový test sa preskočí, pokiaľ nie je nastavené `RUN_CLI_SMOKE=1`), prihlasovací údaj odovzdáva pomocou
NÁZVU premennej prostredia (nikdy nie pomocou jej hodnoty), z každého zaznamenaného výstupu odstraňuje reťazce
vyzerajúce ako kľúče, preskakuje ciele, ktorých binárny súbor nie je nainštalovaný, a zlyhania klasifikuje ako
autentifikačné / upstream / konfiguračné namiesto jednoduchej booleovskej hodnoty:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Voliteľné: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` obmedzuje rozsah testu;
`OMNIROUTE_SMOKE_TIMEOUT_MS` mení 120-sekundový časový limit pre každý cieľ.

---

## Pozrite si tiež

- [Konfigurácia Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — podrobnejšia príručka ku Claude Code
- [Konfigurácia Codex CLI](./CODEX-CLI-CONFIGURATION.md) — jednorazové základné nastavenie `[model_providers.omniroute]`
- [Vzdialený režim](./REMOTE-MODE.md) — kontexty, prístupové tokeny s obmedzeným rozsahom a ovládanie vzdialeného servera
- [Referenčná príručka nástrojov CLI](../reference/CLI-TOOLS.md) — úplný katalóg podporovaných nástrojov a stránok ovládacieho panela
- [Sprievodca nastavením](./SETUP_GUIDE.md) — spôsoby inštalácie a úvodné nastavenie pri prvom spustení
