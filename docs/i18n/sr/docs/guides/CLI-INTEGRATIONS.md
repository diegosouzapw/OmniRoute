# CLI Integrations (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute испоручује породицу команди `setup-*` које конфигуришу CLI за
програмирање (Codex, Claude Code, OpenCode, Cline, …) тако да користи OmniRoute
као свој позадински систем — алат тако комуницира са **једном** крајњом тачком,
а OmniRoute усмерава захтеве одговарајућем провајдеру уз аутоматски прелазак на
резервну опцију. Свака команда чита **актуелни** каталог модела из покренутог
OmniRoute-а (локалног или удаљеног) и уписује конфигурациону датотеку самог алата
на **вашем** рачунару. На API кључ се упућује путем променљиве окружења где год
алат то подржава. Команде које трајно чувају локалну датотеку окружења алата
наведене су у наставку.

Постоји и генерички покретач — `omniroute run <target>` — који покреће
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` или `gemini` са
убаченим одговарајућим променљивама окружења, без уписивања било какве
конфигурације. Циљеви и њихови псеудоними потичу из канонског манифеста
`bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), а `omniroute completion` нуди исте
циљне речи изведене из манифеста. Наслеђени покретачи за појединачне алате —
`omniroute launch` (Claude Code) и `omniroute launch-codex` (Codex) — и даље су
доступни.

Укључивање провајдера доступно је из истог локалног/удаљеног контекста.
Команде у наставку, које дају предност API-ју, држе аутентификацију за управљање
одвојеном од акредитива провајдера и никада не исписују акредитив у
структурираном излазу:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

За скрипте дајте предност опцијама `--credential-stdin` или
`--credential-env`; опција `--credential` је задржана за контролисану локалну
употребу. `providers remove` захтева `--yes` на неинтерактивном терминалу, а
свих пет команди поштују активни контекст или глобалне опције
`--base-url`/`--api-key`.

За једнократно, ручно основно подешавање две најбогатије интеграције погледајте
детаљна упутства за појединачне алате:

- [Конфигурација за Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Конфигурација за Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Удаљени режим](./REMOTE-MODE.md) — управљајте удаљеним OmniRoute-ом (VPS / Tailnet) са свог лаптопа
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — проширење OmniCopilot; оно такође може уместо вас да покреће ове
  `setup-*` команде из самог уређивача

---

## Главна табела

Свака команда поштује **активни контекст** (подешен помоћу `omniroute connect`, погледајте
[Удаљени режим](./REMOTE-MODE.md)) или експлицитне опције `--remote <url> --api-key <key>`.
„Локално у односу на удаљено“ у наставку значи: без опција циља `http://localhost:20128`;
са `--remote` (или активним удаљеним контекстом) преузима каталог са тог
сервера и локално уписује конфигурацију.

| Команда                    | Алат                                   | Шта уписује                                                                                                                                                                             | Кључне опције                                                                                                                              | Локално или удаљено |
| -------------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                       | `~/.codex/<name>.config.toml` — један профил по компатибилном текстуалном моделу (`codex --profile <name>`)                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Оба                 |
| `omniroute setup-claude`   | Claude Code                            | `~/.claude/profiles/<name>/settings.json` — један профил по подударном моделу (`CLAUDE_CONFIG_DIR`)                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Оба                 |
| `omniroute setup-opencode` | OpenCode (компатибилан са OpenAI-јем)  | `~/.config/opencode/opencode.json` — добављач `omniroute` са сваким моделом из каталога (`opencode -m omniroute/<model>`)                                                               | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Оба                 |
| `omniroute setup-cline`    | Cline                                  | `~/.cline/data/{globalState,secrets}.json` (CLI режим) + исписује подешавања проширења за VS Code                                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Оба                 |
| `omniroute setup-kilo`     | Kilo Code                              | `~/.local/share/kilo/auth.json` (CLI) + обједињује `kilocode.*` са VS Code датотеком `settings.json`, ако постоји                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Оба                 |
| `omniroute setup-continue` | Continue / `cn` CLI                    | `~/.continue/config.yaml` — модели са `provider: openai`, кључ преко `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Оба                 |
| `omniroute setup-cursor`   | Cursor                                 | Ништа — исписује кораке унутар апликације (Cursor конфигурација је непрозирна SQLite база)                                                                                              | `--remote` `--api-key` `--only` `--port`                                                                                                   | Оба                 |
| `omniroute setup-roo`      | Roo Code                               | `~/.omniroute/roo-settings.json` (документ за увоз) + поставља `roo-cline.autoImportSettingsPath` ако постоји VS Code датотека `settings.json`                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Оба                 |
| `omniroute setup-crush`    | Crush                                  | `~/.config/crush/crush.json` — добављач `openai-compat`, кључ преко `$OMNIROUTE_API_KEY`                                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Оба                 |
| `omniroute setup-goose`    | Goose                                  | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + исписује упутство за променљиве окружења                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Оба                 |
| `omniroute setup-aider`    | Aider                                  | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + исписује упутство за променљиве окружења                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Оба                 |
| `omniroute setup-qwen`     | Qwen Code                              | `~/.qwen/settings.json` — V4 низ `modelProviders.openai` + `OMNIROUTE_API_KEY` у `~/.qwen/.env`                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Оба                 |
| `omniroute setup-5dive`    | 5dive (скуп агената)                   | Ништа у `$HOME` — уписује 5dive **профил за аутентификацију** (`/var/lib/5dive/auth-profiles/<name>/`) преко `5dive agent auth set`; само за root корисника, извршава се на хосту скупа | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Оба                 |
| `omniroute run <target>`   | Покретање током извршавања (генеричко) | Ништа — покреће `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` са одговарајућим окружењем и аргументима; Qwen и Gemini користе привремени изоловани матични директоријум   | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Оба                 |
| `omniroute launch`         | Claude Code                            | Ништа — покреће `claude` уз уметнуте `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                        | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Оба                 |
| `omniroute launch-codex`   | OpenAI Codex CLI                       | Ништа — покреће `codex` са добављачем `omniroute` уметнутим преко опција `-c`                                                                                                           | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Оба                 |

Напомене о опцијама (проверено у изворном коду команде):

- `--remote <url>` — преузима каталог са удаљеног OmniRoute сервера (има предност над `--port`
  и активним контекстом). `--api-key <key>` прослеђује акредитив за тај
  сервер (подразумевано се користи env променљива `OMNIROUTE_API_KEY` или токен активног контекста).
- `--only <patterns>` — подниске раздвојене зарезима; задржава само ID-ове модела који се подударају
  (нпр. `--only glm,kimi`). Доступно за `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — исписује тачно оно што би било уписано без измене
  система датотека. Доступно за сваку команду `setup-*` **осим** `setup-cursor`
  (која никада не уписује датотеку).
- `--model <id>` — обавезно (или се бира интерактивно) за алате који немају
  аутоматско откривање модела: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Ти алати
  такође прихватају `--yes` за неинтерактивно покретање (које тада захтева `--model`).
  `setup-opencode` прихвата `--model` ради постављања подразумеваног модела највишег нивоа.
- `--model <id>` са `omniroute run` прати конфигурацију по циљу из манифеста
  (`bin/cli/cli-manifest.mjs`): **aider** прима `--model openai/<id>`, а
  **opencode** `--model omniroute/<id>` (префикс се додаје само када га ID
  већ не садржи); **qwen** и **gemini** примају ID непромењен;
  **claude** га добија преко `ANTHROPIC_MODEL`, **goose** преко `GOOSE_MODEL`, а
  **codex** преко аргумената `-c model_providers.omniroute.*`. **Qwen је једини циљ команде run
  који строго захтева `--model`** — `omniroute run qwen` без њега завршава се
  кодом `2` уз експлицитну грешку.
- `--port <port>` — локални OmniRoute порт (подразумевано `20128`, занемарује се када је
  постављено `--remote`). Присутно у свим командама `setup-*` и оба покретача.
- Излазни кодови команде `omniroute run`: сопствени излазни код подређеног CLI-ја прослеђује се
  непромењен; `2` = неважећи аргументи (неподржан циљ, недостаје обавезни
  `--model`, заштита контејнера); `127` = бинарна датотека циља није у `PATH`;
  `130`/`143`/`129` када се покретање оконча сигналом `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = друга грешка при покретању.
- Два покретача (`launch`, `launch-codex`) прихватају `--profile <name>` за избор
  профила који је креирао `setup-claude` / `setup-codex`, као и аргументе који се
  прослеђују основној бинарној датотеци `claude` / `codex`.

Интерактивни бирач такође користе рецепти за подешавање:

```bash
# Изаберите из активног локалног или удаљеног каталога модела и конфигуришите циљ.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` тренутно делегира провереним рецептима за `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` и `5dive`.
Ставке каталога намењене само за IDE,
MITM и водиче остају експлицитни `setup-*`/ручни токови и
не приказују се као циљеви који се могу покренути.

> `setup-opencode` је **лагана OpenCode интеграција компатибилна са OpenAI-јем**.
> Постоји и богатија интеграција додатка — `omniroute setup opencode` — која
> инсталира `@omniroute/opencode-plugin`. То су различите команде; горња табела
> документује `setup-opencode`.
>
> Додатак долази у два пакета, по један за сваку главну верзију OpenCode-а, јер два
> учитавача очекују различите улазне тачке:
> `@omniroute/opencode-plugin` за OpenCode v1 и
> `@omniroute/opencode-plugin-v2` за OpenCode v2. Пакет за v2 је нов
> (`0.1.0`) и прати уговор са хостом који се још увек мења, па чита
> структуру коју OpenCode поставља у нацрт каталога уместо да претпоставља одређену структуру. Инсталирајте
> га додавањем ставке `plugins` у `opencode.json`; `omniroute setup opencode`
> и даље инсталира пакет за v1. Опције и редослед проналажења акредитива налазе се у
> README-у пакета.

---

## Локална употреба

Са OmniRoute покренутим на `localhost:20128`, само покрените команду за подешавање за
свој алат. Каталог се преузима са локалног сервера.

```bash
# Codex: уписује по један профил за сваки поклопљени модел у ~/.codex/
omniroute setup-codex
codex --profile glm52            # користи генерисани профил

# Claude Code: уписује профиле по моделу, затим покреће један
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: уписује openai-compatible провајдера са свим моделима из каталога
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # референцира се преко {env:OMNIROUTE_API_KEY}, никад на диску
opencode -m omniroute/glm/glm-5.2 "..."

# Алатима без аутоматског откривања потребан је експлицитан модел:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Преглед без уписивања било чега:
omniroute setup-continue --dry-run
```

Покрените без уписивања било какве конфигурације (само убризгавање окружења):

```bash
omniroute launch                 # Claude Code → локални OmniRoute
omniroute launch-codex           # Codex CLI → локални OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Експлицитна путања команде: проследи све што долази после --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Удаљена употреба

Усмерите било коју команду за подешавање на удаљени OmniRoute помоћу `--remote` + `--api-key`. Каталог
се преузима са удаљеног сервера; конфигурација се уписује на вашем локалном рачунару.

```bash
# OpenCode против удаљеног VPS-а, задржи само glm/kimi модели
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # прво извезите OMNIROUTE_API_KEY

# Codex профили из удаљеног каталога
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Покрени CLI директно наспрам удаљеног сервера
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Уместо да прослеђујете `--remote`/`--api-key` сваки пут, пријавите се једном и пустите да
**активни контекст** аутоматски обезбеди те вредности:

```bash
omniroute connect 192.168.0.15        # генерише ограничени токен, чува контекст
omniroute setup-codex                 # ← сада користи удаљени каталог
omniroute setup-opencode              # ← исто
omniroute launch                      # ← Claude Code наспрам удаљеног сервера
```

Погледајте [Remote Mode](./REMOTE-MODE.md) за контексте, опсеге и управљање токенима.

---

## Флоте агената 5dive

[5dive](https://5dive.ai) покреће флоту дуготрајних кодинг агената, сваки као
systemd јединица под сопственим Unix корисником. Није сам по себи CLI за кодирање, тако да нема
ништа за `omniroute run` да покрене — `5dive` је циљ **само за конфигурисање**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Оба облика уписују један 5dive **auth профил**, а свако `claude` место везано за тај
профил онда комуницира са OmniRoute. Три ствари су специфичне за овај циљ:

- **Извршава се на хосту флоте, као root.** 5dive-ови глаголи делују на локалне systemd јединице
  и директоријум стања који поседује root; не постоји удаљени режим. Рецепт се поново извршава преко
  `sudo` када већ није root (`--no-sudo` то искључује и уместо тога исписује
  команду).
- **Крајња тачка мора бити `https://` осим ако је loopback.** API кључ агента
  путује на том URL-у са сваким захтевом, а 5dive одбија текстуалну (plaintext) крајњу тачку изван машине.
  Приватна LAN адреса није изузетак.
- **Сопствена веза модела сваког места надјачава профил.** Профил носи
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, али место које је још везано за уобичајени
  id модела не успева при првом окретању са грешком _"There's an issue with the selected model"_.
  Проследите `--agent <name>` (може се понављати) да бисте везали и места; рецепт исписује
  команду када то не учините.

API кључ се предаје 5dive-у преко **stdin** (`--api-key=-`), тако да се никада не појављује у
изласку `ps` команде.

Усмеравање профила на OmniRoute **комбо** уместо на један модел је оно што
даје флоти опоравак провајдера при отказивању (failover): када је примарна крајња тачка потпуно отказала усред потеза
у покретању снимљеном на
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), агент је завршио
своје преостале кораке на резервној опцији и прекид никада није изашао на површину.

---

## Konvencije baznih URL adresa (koji alati očekuju `/v1`)

OmniRoute izlaže OpenAI površinu na `/v1`, Anthropic površinu na root-u,
i nativnu Gemini površinu na `/v1beta`. Svaka integracija je povezana sa oblikom koji njen
alat očekuje (verifikovano u izvornom kodu komande):

| Integracija                                                                | Upisan bazni URL | `/v1`?                                     |
| -------------------------------------------------------------------------- | ---------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | root             | Ne — Cline dodaje `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | root             | Ne — Goose dodaje putanju                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | root             | Ne — LiteLLM dodaje `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | sa `/v1`         | Da                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | root             | Ne — Claude Code dodaje `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | sa `/v1`         | Da                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | sa `/v1`         | Da                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | root             | Ne — SDK dodaje `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` u auth profilu)                        | root             | Ne — Claude Code dodaje `/v1/messages`     |

---

## Očuvanje nativnih zavisnosti prilikom ažuriranja: `--include=optional`

Kada ažurirate koristeći `omniroute update` (nakon potvrde, ili sa `--apply`),
OmniRoute pokreće instalaciju sa ugrađenim `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Ovo **nije** oznaka koju prosleđujete komandi `omniroute update` — nju uvek primenjuje
alat za ažuriranje. Ona garantuje da `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM stek) opstanu nakon ažuriranja, čak i ako vaša npm konfiguracija
ima podešeno `omit=optional`, što bi inače nečujno izbacilo nativni SQLite
drajver i OS-keyring vezu. Da biste pregledali tačnu komandu bez njenog izvršavanja:

```bash
omniroute update --dry-run
# [DRY RUN] Bi pokrenuo: npm install -g omniroute@latest --include=optional
```

Ostale oznake komande `omniroute update` (verifikovano u izvornom kodu): `--check` (izlazi sa 1 ako je
zastarelo), `--apply` (instalira bez traženja potvrde), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI putem `omniroute run gemini`

Ugovor verifikovan u odnosu na `@google/gemini-cli` 0.50.0: CLI poštuje
`GOOGLE_GEMINI_BASE_URL` i izdaje `POST /v1beta/models/<model>:generateContent`
(i `:streamGenerateContent?alt=sse`) prema njemu — tačno OmniRoute-ovoj nativnoj
Gemini površini (`/v1beta`). `omniroute run gemini` to povezuje automatski:

- `GOOGLE_GEMINI_BASE_URL` → aktivni OmniRoute bazni URL (root, bez `/v1`);
- `GEMINI_API_KEY` → razrešeni OmniRoute kredencijal (opcija/env/kontekst);
- **privremeni izolovani `GEMINI_CLI_HOME`** čiji `.gemini/settings.json`
  bira `gemini-api-key` autentifikaciju, tako da sačuvana Google OAuth sesija (Code Assist)
  nikada ne preglasi pokretanje usmereno kroz OmniRoute — uklanja se nakon izlaska;
- **higijena env promenljivih**: iz env-a podprocesa se čiste `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` i `GOOGLE_GENAI_USE_GCA` (koje bi preusmerile
  autentifikaciju na Vertex/Code Assist), a `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` je
  postavljen kao dodatna rezervna sigurnost — ostale `run` mete dobijaju isti
  tretman za svoje sopstvene konfliktne promenljive;
- ubacivanje `--model <id>` iz `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini-jeva zaštita poverenja radnog prostora (workspace-trust guard) i dalje se primenjuje u headless modu — sami
prosledite `--skip-trust` (ili interaktivno potvrdite poverenje direktorijumu); pokretač
namerno ne zaobilazi ovu proveru. Ovaj pokretač je različit od **ACP
registracije** (`src/lib/acp/registry.ts`, `gemini --acp`), koja i dalje predstavlja
integraciju agent-protokola za `/dashboard/acp-agents`.

---

## Стварни smoke тест (опциони)

Детерминистички regression за launch-план се извршава у CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Да би се проверили СТВАРНИ бинарни фајлови у односу на СТВАРНИ
OmniRoute сервер, постоји опциони harness на путањи
`tests/integration/upstream-cli-smoke.int.test.ts`. Он се никада не извршава аутоматски
(сваки под-тест се прескаче осим ако није постављено `RUN_CLI_SMOKE=1`), пренос акредитива се врши преко NAME
environment-променљиве (никада преко вредности), редактује (маскира) стрингове који личе на кључеве из било ког снимљеног излаза, прескаче
циљеве чији бинарни фајл није инсталиран и класифицира грешке као
auth / upstream / config уместо просте булове вредности:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Опционо: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ограничава обим тестирања;
`OMNIROUTE_SMOKE_TIMEOUT_MS` преписује подразумевани тајм-аут од 120s по циљу.

---

## Погледајте и

- [Конфигурација Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — детаљнији водич за Claude Code
- [Конфигурација Codex CLI](./CODEX-CLI-CONFIGURATION.md) — једнократно почетно подешавање `[model_providers.omniroute]`
- [Удаљени режим (Remote Mode)](./REMOTE-MODE.md) — контексти, ограничени приступни токени, управљање удаљеним сервером
- [Референца CLI алата](../reference/CLI-TOOLS.md) — потпуни каталог подржаних алата + странице контролне табле
- [Водич за подешавање](./SETUP_GUIDE.md) — методе инсталације и почетно упознавање при првом покретању
