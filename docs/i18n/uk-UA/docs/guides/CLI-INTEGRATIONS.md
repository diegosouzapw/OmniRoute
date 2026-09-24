# CLI Integrations (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute постачає сімейство команд `setup-*`, які налаштовують CLI для кодування (Codex, Claude Code, OpenCode, Cline, …) на використання OmniRoute як свого бекенду — таким чином інструмент звертається до **однієї** кінцевої точки, а OmniRoute маршрутизує до потрібного провайдера з автоматичним резервуванням. Кожна команда зчитує **актуальний** каталог моделей з запущеного OmniRoute (локального або віддаленого) і записує власний файл конфігурації інструменту на **вашій** машині. Ключ API посилається на змінну середовища там, де це підтримується інструментом. Команди, які зберігають локальний файл середовища інструменту, зазначені нижче.

Також існує універсальний запускник — `omniroute run <target>` — який запускає `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` або `gemini` з правильно введеним середовищем, без запису будь-якої конфігурації взагалі. Цілі та їхні псевдоніми походять з канонічного маніфесту `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), а `omniroute completion` пропонує ті ж слова-цілі, отримані з маніфесту. Застарілі запускники для кожного інструменту — `omniroute launch` (Claude Code) та `omniroute launch-codex` (Codex) — залишаються доступними.

Підключення провайдерів доступне з того ж локального/віддаленого контексту. Наведені нижче команди, орієнтовані на API, відокремлюють автентифікацію управління від облікових даних провайдера і ніколи не виводять облікові дані у структурованому виводі:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Для скриптів віддавайте перевагу `--credential-stdin` або `--credential-env`; `--credential` зберігається для контрольованого локального використання. `providers remove` вимагає `--yes` у неінтерактивному терміналі, і всі п'ять команд враховують активний контекст або глобальні опції `--base-url`/`--api-key`.

Селектори провайдерів відхиляють неоднозначні префікси ID, імена або імена провайдерів; використовуйте повний ID з'єднання, коли збігається кілька з'єднань. Команди створення та редагування зчитують збережене з'єднання, а видалення перевіряє, що воно більше не читається. Імпорт пропускає існуючу пару провайдер/ім'я. Імпортовані записи не можуть перевизначати кінцеву точку управління, контекст або облікові дані управління, надані CLI.

Для одноразового, написаного вручну базового налаштування двох найбагатших інтеграцій дивіться детальні описи для кожного інструменту:

- [Конфігурація Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Конфігурація Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Віддалений режим](./REMOTE-MODE.md) — керуйте віддаленим OmniRoute (VPS / Tailnet) зі свого ноутбука
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — розширення OmniCopilot; воно також може запускати ці команди `setup-*` для вас зсередини редактора

---

## Зведена таблиця

Кожна команда враховує **активний контекст** (заданий за допомогою `omniroute connect`, див.
[Віддалений режим](./REMOTE-MODE.md)) або явні параметри `--remote <url> --api-key <key>`.
«Локальний чи віддалений» нижче означає: без параметрів ціллю є `http://localhost:20128`;
з `--remote` (або активним віддаленим контекстом) команда отримує каталог із цього
сервера й записує конфігурацію локально.

| Команда                    | Інструмент                           | Що записує                                                                                                                                                                                         | Ключові прапорці                                                                                                                           | Локально чи віддалено |
| -------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                     | `~/.codex/<name>.config.toml` — один профіль для кожної сумісної текстової моделі (`codex --profile <name>`)                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Обидва варіанти       |
| `omniroute setup-claude`   | Claude Code                          | `~/.claude/profiles/<name>/settings.json` — один профіль для кожної відповідної моделі (`CLAUDE_CONFIG_DIR`)                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Обидва варіанти       |
| `omniroute setup-opencode` | OpenCode (сумісний з OpenAI)         | `~/.config/opencode/opencode.json` — провайдер `omniroute` з усіма моделями каталогу (`opencode -m omniroute/<model>`)                                                                             | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Обидва варіанти       |
| `omniroute setup-cline`    | Cline                                | `~/.cline/data/{globalState,secrets}.json` (режим CLI) + виводить налаштування розширення VS Code                                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Обидва варіанти       |
| `omniroute setup-kilo`     | Kilo Code                            | `~/.local/share/kilo/auth.json` (CLI) + об’єднує `kilocode.*` з `settings.json` VS Code, якщо файл існує                                                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Обидва варіанти       |
| `omniroute setup-continue` | Continue / `cn` CLI                  | `~/.continue/config.yaml` — моделі `provider: openai`, ключ через `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Обидва варіанти       |
| `omniroute setup-cursor`   | Cursor                               | Нічого — виводить кроки для виконання в застосунку (конфігурація Cursor зберігається в непрозорій SQLite)                                                                                          | `--remote` `--api-key` `--only` `--port`                                                                                                   | Обидва варіанти       |
| `omniroute setup-roo`      | Roo Code                             | `~/.omniroute/roo-settings.json` (документ для імпорту) + задає `roo-cline.autoImportSettingsPath`, якщо існує `settings.json` VS Code                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Обидва варіанти       |
| `omniroute setup-crush`    | Crush                                | `~/.config/crush/crush.json` — провайдер `openai-compat`, ключ через `$OMNIROUTE_API_KEY`                                                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Обидва варіанти       |
| `omniroute setup-goose`    | Goose                                | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + виводить інструкцію для змінних середовища                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Обидва варіанти       |
| `omniroute setup-aider`    | Aider                                | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + виводить інструкцію для змінних середовища                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Обидва варіанти       |
| `omniroute setup-qwen`     | Qwen Code                            | `~/.qwen/settings.json` — масив V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` у `~/.qwen/.env`                                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Обидва варіанти       |
| `omniroute setup-5dive`    | 5dive (парк агентів)                 | Нічого в `$HOME` — записує **профіль автентифікації** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) через `5dive agent auth set`; лише для root, виконується на хості парку                       | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Обидва варіанти       |
| `omniroute run <target>`   | Запуск під час виконання (загальний) | Нічого — запускає `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` з потрібними змінними середовища й аргументами; Qwen і Gemini використовують тимчасову ізольовану домашню директорію | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Обидва варіанти       |
| `omniroute launch`         | Claude Code                          | Нічого — запускає `claude` з переданими `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                                | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Обидва варіанти       |
| `omniroute launch-codex`   | OpenAI Codex CLI                     | Нічого — запускає `codex` із провайдером `omniroute`, переданим через прапорці `-c`                                                                                                                | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Обидва варіанти       |

Примітки щодо прапорців (перевірено у вихідному коді команди):

- `--remote <url>` — отримує каталог із віддаленого OmniRoute (має пріоритет над `--port`
  і активним контекстом). `--api-key <key>` надає облікові дані для цього
  сервера (за замовчуванням використовується змінна середовища `OMNIROUTE_API_KEY` або токен активного контексту).
- `--only <patterns>` — розділені комами підрядки; залишає лише ті ідентифікатори моделей, які збігаються
  (наприклад, `--only glm,kimi`). Доступний для `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — виводить саме те, що було б записано, не змінюючи
  файлову систему. Доступний для кожної команди `setup-*`, **крім** `setup-cursor`
  (яка ніколи не записує файл).
- `--model <id>` — обов’язковий (або вибирається інтерактивно) для інструментів, які не мають
  автоматичного виявлення моделі: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Ці інструменти
  також приймають `--yes` для неінтерактивних запусків (у такому разі потрібен `--model`).
  `setup-opencode` приймає `--model`, щоб установити типову модель верхнього рівня.
- `--model <id>` для `omniroute run` відповідає визначеному маніфестом підключенню для кожної цілі
  (`bin/cli/cli-manifest.mjs`): **aider** отримує `--model openai/<id>`, а
  **opencode** — `--model omniroute/<id>` (префікс додається лише тоді, коли ідентифікатор
  його ще не містить); **qwen** і **gemini** отримують ідентифікатор без змін;
  **claude** отримує його через `ANTHROPIC_MODEL`, **goose** — через `GOOSE_MODEL`, а
  **codex** — через аргументи `-c model_providers.omniroute.*`. **Qwen — єдина ціль запуску,
  для якої `--model` є суворо обов’язковим**: `omniroute run qwen` без нього завершується
  з кодом `2` і явним повідомленням про помилку.
- `--port <port>` — локальний порт OmniRoute (за замовчуванням `20128`, ігнорується, якщо задано `--remote`).
  Присутній у всіх командах `setup-*` і в обох командах запуску.
- Коди завершення `omniroute run`: власний код завершення дочірнього CLI передається
  без змін; `2` = некоректні аргументи (непідтримувана ціль, відсутній обов’язковий
  `--model`, обмеження контейнера); `127` = виконуваний файл цілі відсутній у `PATH`;
  `130`/`143`/`129`, якщо запуск завершено сигналом `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = інша помилка запуску під час виконання.
- Дві команди запуску (`launch`, `launch-codex`) приймають `--profile <name>` для вибору
  профілю, записаного `setup-claude` / `setup-codex`, а також передають наскрізні аргументи
  базовому виконуваному файлу `claude` / `codex`.

Інтерактивний засіб вибору також спільно використовується сценаріями налаштування:

```bash
# Виберіть модель з активного локального або віддаленого каталогу й налаштуйте ціль.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Наразі `configure` делегує роботу перевіреним сценаріям для `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` і `5dive`.
Записи каталогу, призначені лише для IDE,
MITM і посібників, залишаються явними сценаріями `setup-*`/ручного налаштування та
не пропонуються як доступні для запуску цілі.

> `setup-opencode` — це **полегшена OpenAI-сумісна** інтеграція OpenCode.
> Також існує функціональніша інтеграція через плагін — `omniroute setup opencode`, — яка
> встановлює `@omniroute/opencode-plugin`. Це різні команди; таблиця
> вище документує `setup-opencode`.
>
> Плагін постачається у двох пакетах, по одному для кожної основної версії OpenCode, оскільки два
> завантажувачі очікують різні точки входу:
> `@omniroute/opencode-plugin` для OpenCode v1 і
> `@omniroute/opencode-plugin-v2` для OpenCode v2. Пакет v2 є новим
> (`0.1.0`) і дотримується контракту хоста, який усе ще змінюється, тому зчитує
> структуру, яку OpenCode додає до чернетки каталогу, а не припускає певну структуру. Установіть
> його, додавши запис `plugins` до `opencode.json`; `omniroute setup opencode`
> усе ще встановлює пакет v1. Параметри та порядок пошуку облікових даних наведено
> в README пакета.

---

## Локальне використання

Коли OmniRoute працює на `localhost:20128`, просто виконайте команду налаштування для свого
інструмента. Каталог отримується з локального сервера.

```bash
# Codex: записати профіль для кожної відповідної моделі в ~/.codex/
omniroute setup-codex
codex --profile glm52            # використати згенерований профіль

# Claude Code: записати профілі для кожної моделі, а потім запустити один із них
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: записати сумісний з openai провайдер з усіма моделями каталогу
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # використовується через {env:OMNIROUTE_API_KEY}, ніколи не зберігається на диску
opencode -m omniroute/glm/glm-5.2 "..."

# Для інструментів без автоматичного виявлення потрібно явно вказати модель:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Попередній перегляд без запису будь-яких даних:
omniroute setup-continue --dry-run
```

Запуск узагалі без запису конфігурації (лише через передавання змінних середовища):

```bash
omniroute launch                 # Claude Code → локальний OmniRoute
omniroute launch-codex           # Codex CLI → локальний OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Явний шлях до команди: передати далі все, що йде після --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Віддалене використання

Спрямуйте будь-яку команду налаштування на віддалений OmniRoute за допомогою `--remote` + `--api-key`.
Каталог отримується з віддаленого сервера, а конфігурація записується на вашому локальному комп’ютері.

```bash
# OpenCode із віддаленим VPS, залишити лише моделі glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # спочатку експортуйте OMNIROUTE_API_KEY

# Профілі Codex із віддаленого каталогу
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Запустити CLI безпосередньо з підключенням до віддаленого сервера
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Замість того щоб щоразу передавати `--remote`/`--api-key`, увійдіть один раз і дозвольте
**активному контексту** надавати їх автоматично:

```bash
omniroute connect 192.168.0.15        # створює токен з обмеженою областю дії та зберігає контекст
omniroute setup-codex                 # ← тепер використовує віддалений каталог
omniroute setup-opencode              # ← так само
omniroute launch                      # ← Claude Code із підключенням до віддаленого сервера
```

Відомості про контексти, області дії та керування токенами дивіться в розділі [Віддалений режим](./REMOTE-MODE.md).

---

## Парки агентів 5dive

[5dive](https://5dive.ai) запускає парк довготривалих агентів для програмування, кожен із яких є
модулем systemd під окремим користувачем Unix. Сам 5dive не є CLI для програмування, тому
`omniroute run` нічого запускати — `5dive` є ціллю **лише для конфігурації**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Обидві форми записують один **профіль автентифікації** 5dive, після чого кожне місце `claude`, прив’язане до цього
профілю, взаємодіє з OmniRoute. Ця ціль має три особливості:

- **Команда виконується на хості парку від імені root.** Команди 5dive працюють із локальними модулями systemd
  та каталогом стану, що належить root; віддалений режим відсутній. Сценарій повторно запускає себе через
  `sudo`, якщо його ще не запущено від імені root (`--no-sudo` вимикає це й натомість виводить
  команду).
- **Кінцева точка повинна використовувати `https://`, якщо вона не є loopback-адресою.** Ключ API агента
  передається через цю URL-адресу з кожним запитом, а 5dive не дозволяє використовувати незашифровану зовнішню кінцеву точку.
  Приватна адреса LAN не є винятком.
- **Власне закріплення моделі для кожного місця має вищий пріоритет за профіль.** Профіль містить
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, але місце, усе ще закріплене за стандартним
  ідентифікатором моделі, завершує перший запит помилкою _"Виникла проблема з вибраною моделлю"_.
  Передайте `--agent <name>` (можна повторювати), щоб також закріпити моделі для місць; якщо цього не зробити,
  сценарій виведе відповідну команду.

Ключ API передається до 5dive через **stdin** (`--api-key=-`), тому він ніколи не з’являється
у виводі `ps`.

Спрямування профілю на **комбінацію** OmniRoute замість окремої моделі забезпечує для парку
аварійне перемикання між провайдерами: коли основна кінцева точка повністю відмовила посеред виконання запиту
під час запуску, описаного в
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), агент завершив
решту кроків через резервну кінцеву точку, не повідомивши про збій.

---

## Умовні правила для базових URL (яким інструментам потрібен `/v1`)

OmniRoute надає інтерфейс OpenAI за адресою `/v1`, інтерфейс Anthropic — у корені,
а нативний інтерфейс Gemini — за адресою `/v1beta`. Кожну інтеграцію налаштовано у формі,
якої очікує відповідний інструмент (перевірено у вихідному коді команди):

| Інтеграція                                                                 | Записаний базовий URL | `/v1`?                                    |
| -------------------------------------------------------------------------- | --------------------- | ----------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | корінь                | Ні — Cline додає `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | корінь                | Ні — Goose додає шлях                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | корінь                | Ні — LiteLLM додає `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | з `/v1`               | Так                                       |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | корінь                | Ні — Claude Code додає `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | з `/v1`               | Так                                       |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | з `/v1`               | Так                                       |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | корінь                | Ні — SDK додає `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` у профілі автентифікації)              | корінь                | Ні — Claude Code додає `/v1/messages`     |

---

## Збереження нативних залежностей під час оновлення: `--include=optional`

Коли ви виконуєте оновлення за допомогою `omniroute update` (після підтвердження або з `--apply`),
OmniRoute запускає встановлення з уже вбудованим параметром `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Це **не** прапорець, який потрібно передавати команді `omniroute update`, — засіб
оновлення завжди застосовує його автоматично. Це гарантує, що `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, стек SLM LLMLingua) збережуться після
оновлення, навіть якщо у вашій конфігурації npm встановлено `omit=optional`, через
що інакше без жодного попередження було б видалено нативний драйвер SQLite і прив’язку
до сховища ключів ОС. Щоб переглянути точну команду без її виконання:

```bash
omniroute update --dry-run
# [ПРОБНИЙ ЗАПУСК] Буде виконано: npm install -g omniroute@latest --include=optional
```

Інші прапорці `omniroute update` (перевірено у вихідному коді): `--check` (код виходу 1,
якщо версія застаріла), `--apply` (встановити без запиту підтвердження), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI через `omniroute run gemini`

Контракт перевірено з `@google/gemini-cli` 0.50.0: CLI враховує
`GOOGLE_GEMINI_BASE_URL` і надсилає `POST /v1beta/models/<model>:generateContent`
(і `:streamGenerateContent?alt=sse`) на цю адресу — саме так працює нативний
інтерфейс Gemini в OmniRoute (`/v1beta`). `omniroute run gemini` налаштовує це автоматично:

- `GOOGLE_GEMINI_BASE_URL` → активний базовий URL OmniRoute (корінь, без `/v1`);
- `GEMINI_API_KEY` → визначені облікові дані OmniRoute (параметр/середовище/контекст);
- **тимчасовий ізольований `GEMINI_CLI_HOME`**, у якому `.gemini/settings.json`
  вибирає автентифікацію `gemini-api-key`, щоб збережений сеанс Google OAuth (Code Assist)
  ніколи не перевизначав запуск, спрямований через OmniRoute, — видаляється після завершення;
- **гігієна середовища**: із середовища дочірнього процесу видаляються `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` і `GOOGLE_GENAI_USE_GCA` (які переспрямували б
  автентифікацію до Vertex/Code Assist), а `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  встановлюється як додатковий запобіжний механізм — інші цілі `run` отримують таке саме
  опрацювання власних конфліктних змінних;
- додавання `--model <id>` із `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Захист довіри до робочого простору Gemini продовжує діяти в безінтерфейсному режимі —
самостійно передайте `--skip-trust` (або інтерактивно позначте каталог як довірений);
засіб запуску навмисно не обходить цей захист. Цей засіб запуску відрізняється від
**реєстрації ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), яка залишається
інтеграцією протоколу агентів для `/dashboard/acp-agents`.

---

## Реальна димова перевірка (за бажанням)

Детерміновані регресійні запуски плану запуску виконуються в CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Для перевірки РЕАЛЬНИХ бінарних файлів із РЕАЛЬНИМ
сервером OmniRoute доступний опціональний тестовий модуль за адресою
`tests/integration/upstream-cli-smoke.int.test.ts`. Він ніколи не запускається автоматично
(кожен підтест пропускається, якщо не встановлено `RUN_CLI_SMOKE=1`), передає облікові дані за НАЗВОЮ
змінної середовища (ніколи не за значенням), маскує рядки, схожі на ключі, у всіх записаних вихідних даних, пропускає
цілі, бінарні файли яких не встановлено, і класифікує помилки як
автентифікаційні / висхідного сервера / конфігураційні замість простого булевого значення:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Необов’язково: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` обмежує перевірку;
`OMNIROUTE_SMOKE_TIMEOUT_MS` перевизначає 120-секундний тайм-аут для кожної цілі.

---

## Дивіться також

- [Конфігурація Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — докладніший посібник із Claude Code
- [Конфігурація Codex CLI](./CODEX-CLI-CONFIGURATION.md) — одноразове базове налаштування `[model_providers.omniroute]`
- [Віддалений режим](./REMOTE-MODE.md) — контексти, токени доступу з обмеженою областю дії та керування віддаленим сервером
- [Довідник інструментів CLI](../reference/CLI-TOOLS.md) — повний каталог підтримуваних інструментів і сторінок панелі керування
- [Посібник із налаштування](./SETUP_GUIDE.md) — способи встановлення та початкове налаштування під час першого запуску
