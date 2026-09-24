# CLI Integrations (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute включва семейство от команди `setup-*`, които конфигурират CLI за програмиране
(Codex, Claude Code, OpenCode, Cline, …) да използва OmniRoute като своя бекенд — така
инструментът комуникира с **една** крайна точка, а OmniRoute насочва заявките към правилния доставчик с
автоматично превключване при отказ. Всяка команда прочита **актуалния** каталог с модели от работещ
OmniRoute (локален или отдалечен) и записва собствения конфигурационен файл на инструмента на **вашата**
машина. API ключът се посочва чрез променлива на средата навсякъде, където инструментът
го поддържа. Командите, които записват локален за инструмента файл със среда, са отбелязани по-долу.

Има и универсален стартер — `omniroute run <target>` — който стартира
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` или `gemini` с
правилно подадена среда, без изобщо да записва конфигурация. Целите и техните
псевдоними идват от каноничния манифест `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), а `omniroute completion` предлага
същите думи за цели, извлечени от манифеста. Остарелите стартери за отделните инструменти —
`omniroute launch` (Claude Code) и `omniroute launch-codex` (Codex) — остават
налични.

Първоначалното конфигуриране на доставчици е налично от същия локален/отдалечен контекст.
Командите по-долу, проектирани с приоритет към API, държат удостоверяването за управление отделно от идентификационните
данни на доставчика и никога не извеждат идентификационни данни в структуриран изход:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

За скриптове предпочитайте `--credential-stdin` или `--credential-env`; `--credential`
се запазва за контролирана локална употреба. `providers remove` изисква `--yes` в
неинтерактивен терминал, а и петте команди използват активния контекст или
глобалните опции `--base-url`/`--api-key`.

За еднократната, ръчно написана базова настройка на двете най-богати интеграции вижте
подробните ръководства за отделните инструменти:

- [Конфигуриране на Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Конфигуриране на Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Отдалечен режим](./REMOTE-MODE.md) — управлявайте отдалечен OmniRoute (VPS / Tailnet) от лаптопа си
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — разширението OmniCopilot; то също може да изпълнява тези
  команди `setup-*` вместо вас директно от редактора

---

## Обобщаваща таблица

Всяка команда използва **активния контекст** (зададен с `omniroute connect`, вижте
[Отдалечен режим](./REMOTE-MODE.md)) или изричните флагове `--remote <url> --api-key <key>`.
„Локално спрямо отдалечено“ по-долу означава: без флагове командата използва `http://localhost:20128`;
с `--remote` (или активен отдалечен контекст) тя извлича каталога от този
сървър и записва конфигурацията локално.

| Команда                    | Инструмент                               | Какво записва                                                                                                                                                                             | Основни флагове                                                                                                                            | Локално или отдалечено |
| -------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                         | `~/.codex/<name>.config.toml` — по един профил за всеки съвместим текстов модел (`codex --profile <name>`)                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | И двете                |
| `omniroute setup-claude`   | Claude Code                              | `~/.claude/profiles/<name>/settings.json` — по един профил за всеки съответстващ модел (`CLAUDE_CONFIG_DIR`)                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | И двете                |
| `omniroute setup-opencode` | OpenCode (съвместим с openai)            | `~/.config/opencode/opencode.json` — доставчик `omniroute` с всеки модел от каталога (`opencode -m omniroute/<model>`)                                                                    | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | И двете                |
| `omniroute setup-cline`    | Cline                                    | `~/.cline/data/{globalState,secrets}.json` (CLI режим) + извежда настройките за разширението на VS Code                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | И двете                |
| `omniroute setup-kilo`     | Kilo Code                                | `~/.local/share/kilo/auth.json` (CLI) + обединява `kilocode.*` във VS Code `settings.json`, ако съществува                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | И двете                |
| `omniroute setup-continue` | Continue / `cn` CLI                      | `~/.continue/config.yaml` — модели с `provider: openai`, ключ чрез `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | И двете                |
| `omniroute setup-cursor`   | Cursor                                   | Нищо — извежда стъпките в приложението (конфигурацията на Cursor е непрозрачна SQLite база данни)                                                                                         | `--remote` `--api-key` `--only` `--port`                                                                                                   | И двете                |
| `omniroute setup-roo`      | Roo Code                                 | `~/.omniroute/roo-settings.json` (документ за импортиране) + задава `roo-cline.autoImportSettingsPath`, ако съществува VS Code `settings.json`                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | И двете                |
| `omniroute setup-crush`    | Crush                                    | `~/.config/crush/crush.json` — доставчик `openai-compat`, ключ чрез `$OMNIROUTE_API_KEY`                                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | И двете                |
| `omniroute setup-goose`    | Goose                                    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + извежда инструкции за променливите на средата                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | И двете                |
| `omniroute setup-aider`    | Aider                                    | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + извежда инструкции за променливите на средата                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | И двете                |
| `omniroute setup-qwen`     | Qwen Code                                | `~/.qwen/settings.json` — V4 масив `modelProviders.openai` + `OMNIROUTE_API_KEY` в `~/.qwen/.env`                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | И двете                |
| `omniroute setup-5dive`    | 5dive (група от агенти)                  | Нищо в `$HOME` — записва **профил за удостоверяване** на 5dive (`/var/lib/5dive/auth-profiles/<name>/`) чрез `5dive agent auth set`; само за root, изпълнява се на хоста на групата       | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | И двете                |
| `omniroute run <target>`   | Стартиране по време на изпълнение (общо) | Нищо — стартира `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` с правилните променливи на средата и аргументи; Qwen и Gemini използват временна изолирана домашна директория | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | И двете                |
| `omniroute launch`         | Claude Code                              | Нищо — стартира `claude` с подадени `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                           | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | И двете                |
| `omniroute launch-codex`   | OpenAI Codex CLI                         | Нищо — стартира `codex` с доставчика `omniroute`, подаден чрез флагове `-c`                                                                                                               | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | И двете                |

Бележки за флаговете (проверени в изходния код на командата):

- `--remote <url>` — извлича каталога от отдалечен OmniRoute (има предимство пред `--port`
  и активния контекст). `--api-key <key>` предоставя идентификационните данни за този
  сървър (по подразбиране използва променливата на средата `OMNIROUTE_API_KEY` или токена на активния контекст).
- `--only <patterns>` — поднизове, разделени със запетаи; запазва само съвпадащите
  идентификатори на модели (напр. `--only glm,kimi`). Налично при `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — отпечатва точно какво би било записано, без да променя
  файловата система. Налично при всяка команда `setup-*` **с изключение на** `setup-cursor`
  (която никога не записва файл).
- `--model <id>` — задължително (или се избира интерактивно) за инструментите без
  автоматично откриване на модел: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Тези инструменти
  приемат също `--yes` за неинтерактивно изпълнение (което в този случай изисква `--model`).
  `setup-opencode` приема `--model`, за да зададе модела по подразбиране на най-горно ниво.
- `--model <id>` при `omniroute run` следва специфичното за всяка цел свързване в манифеста
  (`bin/cli/cli-manifest.mjs`): **aider** получава `--model openai/<id>`, а
  **opencode** — `--model omniroute/<id>` (префиксът се добавя само когато идентификаторът
  все още не го съдържа); **qwen** и **gemini** получават идентификатора дословно;
  **claude** го получава чрез `ANTHROPIC_MODEL`, **goose** — чрез `GOOSE_MODEL`, а
  **codex** — чрез аргументи `-c model_providers.omniroute.*`. **Qwen е единствената цел за изпълнение,
  която задължително изисква `--model`** — `omniroute run qwen` без него завършва
  с код `2` и изрично съобщение за грешка.
- `--port <port>` — локален порт на OmniRoute (по подразбиране `20128`, игнорира се, когато е зададен
  `--remote`). Присъства при всички `setup-*` команди и при двете команди за стартиране.
- Кодове за изход на `omniroute run`: собственият код за изход на дъщерния CLI се предава
  дословно; `2` = невалидни аргументи (неподдържана цел, липсващ задължителен
  `--model`, защита за контейнер); `127` = изпълнимият файл на целта не е в `PATH`;
  `130`/`143`/`129`, когато стартираният процес е прекратен от `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = друга грешка при стартиране по време на изпълнение.
- Двете команди за стартиране (`launch`, `launch-codex`) приемат `--profile <name>` за избор
  на профил, записан от `setup-claude` / `setup-codex`, както и аргументи, които се предават
  към съответния изпълним файл `claude` / `codex`.

Интерактивният инструмент за избор се споделя и от процедурите за настройка:

```bash
# Изберете от активния локален или отдалечен каталог с модели и конфигурирайте целта.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

В момента `configure` делегира към тестваните процедури за `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` и `5dive`.
Записите в каталога, предназначени само за IDE,
MITM и ръководства, остават изрични `setup-*`/ръчни процедури и
не се представят като цели, които могат да бъдат стартирани.

> `setup-opencode` е **олекотената, съвместима с openai** интеграция за OpenCode.
> Съществува и по-богата интеграция с приставка — `omniroute setup opencode` — която
> инсталира `@omniroute/opencode-plugin`. Това са различни команди; таблицата
> по-горе документира `setup-opencode`.
>
> Приставката се предлага в два пакета, по един за всяка основна версия на OpenCode, защото двата
> зареждащи механизма очакват различни входни точки:
> `@omniroute/opencode-plugin` за OpenCode v1 и
> `@omniroute/opencode-plugin-v2` за OpenCode v2. Пакетът за v2 е нов
> (`0.1.0`) и следва договор с хоста, който все още се променя, затова прочита
> структурата, която OpenCode задава в черновата на каталога, вместо да предполага конкретна такава. Инсталирайте
> го, като добавите запис `plugins` в `opencode.json`; `omniroute setup opencode`
> все още инсталира пакета за v1. Опциите и редът за търсене на идентификационни данни са описани в
> README на пакета.

---

## Локално използване

Когато OmniRoute работи на `localhost:20128`, просто изпълнете командата за настройка за вашия инструмент. Каталогът се извлича от локалния сървър.

```bash
# Codex: записва отделен профил за всеки съответстващ модел в ~/.codex/
omniroute setup-codex
codex --profile glm52            # използва генериран профил

# Claude Code: записва профили за отделните модели, след което стартира един от тях
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: записва съвместимия с OpenAI доставчик с всички модели от каталога
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # използва се чрез {env:OMNIROUTE_API_KEY}, никога не се записва на диска
opencode -m omniroute/glm/glm-5.2 "..."

# Инструментите без автоматично откриване изискват изрично зададен модел:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Преглед без записване на каквото и да било:
omniroute setup-continue --dry-run
```

Стартиране без записване на каквато и да е конфигурация (само чрез инжектиране на променливи на средата):

```bash
omniroute launch                 # Claude Code → локален OmniRoute
omniroute launch-codex           # Codex CLI → локален OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Изричен път до командата: предава без промени всичко след --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Отдалечено използване

Насочете която и да е команда за настройка към отдалечен OmniRoute чрез `--remote` + `--api-key`. Каталогът се извлича от отдалечения сървър, а конфигурацията се записва на локалната ви машина.

```bash
# OpenCode срещу отдалечен VPS, като се запазват само моделите glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # първо експортирайте OMNIROUTE_API_KEY

# Профили на Codex от отдалечен каталог
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Директно стартиране на CLI срещу отдалечения сървър
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Вместо всеки път да подавате `--remote`/`--api-key`, влезте веднъж и оставете **активния контекст** да ги предоставя автоматично:

```bash
omniroute connect 192.168.0.15        # създава токен с ограничен обхват и съхранява контекста
omniroute setup-codex                 # ← вече използва отдалечения каталог
omniroute setup-opencode              # ← същото
omniroute launch                      # ← Claude Code срещу отдалечения сървър
```

Вижте [Отдалечен режим](./REMOTE-MODE.md) за контексти, обхвати и управление на токени.

---

## Флотове от агенти на 5dive

[5dive](https://5dive.ai) управлява флот от дългосрочно работещи агенти за програмиране, всеки от които е systemd модул под собствен Unix потребител. Самият той не е CLI за програмиране, затова няма какво да бъде стартирано чрез `omniroute run` — `5dive` е цел **само за конфигуриране**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

И двете форми записват един **профил за удостоверяване** на 5dive, след което всяко място на `claude`, свързано с този профил, комуникира с OmniRoute. Три неща са специфични за тази цел:

- **Изпълнява се на хоста на флота като root.** Командите на 5dive действат върху локални systemd модули и директория за състоянието, притежавана от root; няма отдалечен режим. Рецептата се стартира повторно чрез `sudo`, когато още не се изпълнява като root (`--no-sudo` изключва това и вместо него извежда командата).
- **Крайната точка трябва да използва `https://`, освен ако не е loopback.** API ключът на агента се предава чрез този URL при всяка заявка и 5dive отказва некриптирана крайна точка извън машината. Частният LAN адрес не е изключение.
- **Собственото фиксиране на модел за всяко място има предимство пред профила.** Профилът съдържа `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, но място, което все още е фиксирано към стандартен идентификатор на модел, се проваля още при първата си стъпка със съобщението _„Има проблем с избрания модел“_. Подайте `--agent <name>` (може да се повтори), за да фиксирате и местата; ако не го направите, рецептата извежда командата.

API ключът се подава към 5dive чрез **stdin** (`--api-key=-`), така че никога не се появява в изхода на `ps`.

Насочването на профила към **комбинация** на OmniRoute вместо към единичен модел е това, което осигурява резервиране на доставчика за флота: когато основната крайна точка напълно прекъсна по средата на стъпка при изпълнението, документирано в [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), агентът завърши оставащите си стъпки чрез резервната крайна точка, без прекъсването да стане видимо.

---

## Конвенции за базовия URL (кои инструменти изискват `/v1`)

OmniRoute предоставя OpenAI интерфейса на `/v1`, Anthropic интерфейса в корена,
а нативния Gemini интерфейс на `/v1beta`. Всяка интеграция е конфигурирана във
формата, която нейният инструмент очаква (проверено в изходния код на командата):

| Интеграция                                                                 | Записан базов URL | `/v1`?                                     |
| -------------------------------------------------------------------------- | ----------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | корен             | Не — Cline добавя `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | корен             | Не — Goose добавя пътя                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | корен             | Не — LiteLLM добавя `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | с `/v1`           | Да                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | корен             | Не — Claude Code добавя `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | с `/v1`           | Да                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | с `/v1`           | Да                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | корен             | Не — SDK добавя `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` в профила за удостоверяване)           | корен             | Не — Claude Code добавя `/v1/messages`     |

---

## Запазване на нативните зависимости при актуализация: `--include=optional`

Когато актуализирате с `omniroute update` (след потвърждение или с `--apply`),
OmniRoute изпълнява инсталацията с вградено `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Това **не** е флаг, който подавате към `omniroute update` — той винаги се прилага
от модула за актуализация. Това гарантира, че `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM стекът) ще се запазят
при актуализацията дори ако npm конфигурацията ви съдържа `omit=optional`, което
иначе без предупреждение би премахнало нативния SQLite драйвер и свързването с
хранилището за ключове на операционната система. За да прегледате точната команда,
без да я прилагате:

```bash
omniroute update --dry-run
# [СУХО ИЗПЪЛНЕНИЕ] Ще бъде изпълнено: npm install -g omniroute@latest --include=optional
```

Други флагове на `omniroute update` (проверени в изходния код): `--check`
(изход с код 1, ако версията е остаряла), `--apply` (инсталиране без подкана),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI чрез `omniroute run gemini`

Договорът е проверен спрямо `@google/gemini-cli` 0.50.0: CLI зачита
`GOOGLE_GEMINI_BASE_URL` и изпраща `POST /v1beta/models/<model>:generateContent`
(и `:streamGenerateContent?alt=sse`) към него — точно както изисква нативният
Gemini интерфейс на OmniRoute (`/v1beta`). `omniroute run gemini` конфигурира
това автоматично:

- `GOOGLE_GEMINI_BASE_URL` → активният базов URL на OmniRoute (корен, без `/v1`);
- `GEMINI_API_KEY` → определените идентификационни данни за OmniRoute
  (опция/среда/контекст);
- **временен изолиран `GEMINI_CLI_HOME`**, чийто `.gemini/settings.json`
  избира удостоверяване чрез `gemini-api-key`, така че съхранена Google OAuth
  сесия (Code Assist) никога да не замества стартирането, насочено към OmniRoute —
  премахва се след приключване;
- **хигиена на средата**: от средата на дъщерния процес се премахват
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` и `GOOGLE_GENAI_USE_GCA` (които
  биха пренасочили удостоверяването към Vertex/Code Assist), а
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` се задава като допълнителна предпазна
  мярка — останалите цели на `run` получават същото третиране за собствените си
  конфликтни променливи;
- добавяне на `--model <id>` от `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Защитата на Gemini за доверие към работната директория продължава да се прилага
в режим без потребителски интерфейс — подайте сами `--skip-trust` (или се
доверете интерактивно на директорията); стартиращият модул умишлено не я
заобикаля. Този стартиращ модул е различен от **ACP регистрацията**
(`src/lib/acp/registry.ts`, `gemini --acp`), която остава интеграцията с
агентния протокол за `/dashboard/acp-agents`.

---

## Реална smoke проверка (по избор)

Детерминистичните регресионни изпълнения на плана за стартиране се извършват в CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). За валидиране на РЕАЛНИТЕ изпълними файлове спрямо РЕАЛЕН
OmniRoute сървър има тестов механизъм по избор в
`tests/integration/upstream-cli-smoke.int.test.ts`. Той никога не се изпълнява автоматично
(всеки подтест се пропуска, освен ако не е зададено `RUN_CLI_SMOKE=1`), предава идентификационните данни чрез ИМЕТО на променлива на средата
(никога чрез стойността), редактира низове, наподобяващи ключове, от всеки записан изход, пропуска
целите, чиито изпълними файлове не са инсталирани, и класифицира неуспехите като
удостоверяване / услуга нагоре по веригата / конфигурация вместо само като булева стойност:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

По избор: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ограничава проверката;
`OMNIROUTE_SMOKE_TIMEOUT_MS` заменя 120-секундното време за изчакване за всяка цел.

---

## Вижте също

- [Конфигуриране на Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — по-подробното ръководство за Claude Code
- [Конфигуриране на Codex CLI](./CODEX-CLI-CONFIGURATION.md) — еднократната основна настройка на `[model_providers.omniroute]`
- [Отдалечен режим](./REMOTE-MODE.md) — контексти, токени за достъп с ограничен обхват и управление на отдалечен сървър
- [Справочник за CLI инструменти](../reference/CLI-TOOLS.md) — пълният каталог на поддържаните инструменти и страниците на таблото за управление
- [Ръководство за настройване](./SETUP_GUIDE.md) — методи за инсталиране и първоначално въвеждане в работата
