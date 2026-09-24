# CLI Integrations (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute предоставляет семейство команд `setup-*`, которые настраивают CLI для
работы с кодом (Codex, Claude Code, OpenCode, Cline, …) на использование OmniRoute
в качестве бэкенда — благодаря этому инструмент обращается к **одной** конечной
точке, а OmniRoute направляет запросы нужному провайдеру с автоматическим
переключением при сбое. Каждая команда считывает **актуальный** каталог моделей
из запущенного экземпляра OmniRoute (локального или удалённого) и записывает
собственный файл конфигурации инструмента на **вашем** компьютере. Там, где
инструмент это поддерживает, ключ API указывается через переменную окружения.
Команды, сохраняющие локальный файл окружения инструмента, отмечены ниже.

Также доступна универсальная команда запуска — `omniroute run <target>`, —
которая запускает `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` или
`gemini` с передачей необходимых переменных окружения, не записывая никакой
конфигурации. Целевые инструменты и их псевдонимы берутся из канонического
манифеста `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), а `omniroute completion` предлагает
тот же набор целевых значений, полученный из манифеста. Устаревшие команды
запуска для отдельных инструментов — `omniroute launch` (Claude Code) и
`omniroute launch-codex` (Codex) — остаются доступными.

Подключение провайдеров доступно в том же локальном или удалённом контексте.
Приведённые ниже команды, ориентированные на API, отделяют аутентификацию для
управления от учётных данных провайдера и никогда не выводят учётные данные
в структурированных результатах:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

В скриптах рекомендуется использовать `--credential-stdin` или
`--credential-env`; параметр `--credential` сохранён для контролируемого
локального использования. В неинтерактивном терминале команда
`providers remove` требует параметр `--yes`, а все пять команд учитывают
активный контекст или глобальные параметры `--base-url`/`--api-key`.

Однократная базовая настройка вручную двух наиболее функциональных интеграций
подробно описана в руководствах для соответствующих инструментов:

- [Настройка Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Настройка Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Удалённый режим](./REMOTE-MODE.md) — управляйте удалённым экземпляром OmniRoute (VPS / Tailnet) со своего ноутбука
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — расширение OmniCopilot; оно также может выполнять эти
  команды `setup-*` за вас прямо из редактора

---

## Сводная таблица

Каждая команда учитывает **активный контекст** (задаваемый с помощью
`omniroute connect`, см. [Удалённый режим](./REMOTE-MODE.md)) или явные параметры
`--remote <url> --api-key <key>`. Выражение «локальный или удалённый» ниже
означает следующее: без параметров команда обращается к
`http://localhost:20128`; с параметром `--remote` (или при активном удалённом
контексте) она получает каталог с указанного сервера и записывает конфигурацию
локально.

| Команда                    | Инструмент                      | Что записывает                                                                                                                                                                                  | Основные флаги                                                                                                                             | Локально или удалённо |
| -------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                | `~/.codex/<name>.config.toml` — отдельный профиль для каждой совместимой текстовой модели (`codex --profile <name>`)                                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Оба варианта          |
| `omniroute setup-claude`   | Claude Code                     | `~/.claude/profiles/<name>/settings.json` — отдельный профиль для каждой соответствующей модели (`CLAUDE_CONFIG_DIR`)                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Оба варианта          |
| `omniroute setup-opencode` | OpenCode (совместимый с OpenAI) | `~/.config/opencode/opencode.json` — провайдер `omniroute` со всеми моделями из каталога (`opencode -m omniroute/<model>`)                                                                      | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Оба варианта          |
| `omniroute setup-cline`    | Cline                           | `~/.cline/data/{globalState,secrets}.json` (режим CLI) + выводит настройки расширения VS Code                                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Оба варианта          |
| `omniroute setup-kilo`     | Kilo Code                       | `~/.local/share/kilo/auth.json` (CLI) + добавляет `kilocode.*` в `settings.json` VS Code, если он существует                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Оба варианта          |
| `omniroute setup-continue` | Continue / CLI `cn`             | `~/.continue/config.yaml` — модели с `provider: openai`, ключ через `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Оба варианта          |
| `omniroute setup-cursor`   | Cursor                          | Ничего — выводит шаги, выполняемые в приложении (конфигурация Cursor хранится в закрытой базе SQLite)                                                                                           | `--remote` `--api-key` `--only` `--port`                                                                                                   | Оба варианта          |
| `omniroute setup-roo`      | Roo Code                        | `~/.omniroute/roo-settings.json` (документ для импорта) + задаёт `roo-cline.autoImportSettingsPath`, если существует `settings.json` VS Code                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Оба варианта          |
| `omniroute setup-crush`    | Crush                           | `~/.config/crush/crush.json` — провайдер `openai-compat`, ключ через `$OMNIROUTE_API_KEY`                                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Оба варианта          |
| `omniroute setup-goose`    | Goose                           | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + выводит пример настройки переменных окружения                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Оба варианта          |
| `omniroute setup-aider`    | Aider                           | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + выводит пример настройки переменных окружения                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Оба варианта          |
| `omniroute setup-qwen`     | Qwen Code                       | `~/.qwen/settings.json` — массив V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` в `~/.qwen/.env`                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Оба варианта          |
| `omniroute setup-5dive`    | 5dive (парк агентов)            | Ничего в `$HOME` — записывает **профиль аутентификации** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) через `5dive agent auth set`; только для root, выполняется на хосте парка               | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Оба варианта          |
| `omniroute run <target>`   | Запуск среды выполнения (общий) | Ничего — запускает `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` с нужными переменными окружения и аргументами; Qwen и Gemini используют временный изолированный домашний каталог | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Оба варианта          |
| `omniroute launch`         | Claude Code                     | Ничего — запускает `claude` с внедрёнными `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                           | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Оба варианта          |
| `omniroute launch-codex`   | OpenAI Codex CLI                | Ничего — запускает `codex` с провайдером `omniroute`, внедрённым через флаги `-c`                                                                                                               | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Оба варианта          |

Примечания о флагах (проверено по исходному коду команд):

- `--remote <url>` — получить каталог с удалённого сервера OmniRoute (переопределяет `--port`
  и активный контекст). `--api-key <key>` передаёт учётные данные для этого
  сервера (по умолчанию используется переменная окружения `OMNIROUTE_API_KEY` или токен активного контекста).
- `--only <patterns>` — подстроки, разделённые запятыми; сохраняются только совпадающие
  с ними идентификаторы моделей (например, `--only glm,kimi`). Доступно для `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — вывести в точности то, что было бы записано, не изменяя
  файловую систему. Доступно для каждой команды `setup-*`, **кроме** `setup-cursor`
  (она никогда не записывает файл).
- `--model <id>` — обязателен (либо выбирается интерактивно) для инструментов без
  автоматического обнаружения моделей: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Эти инструменты
  также принимают `--yes` для неинтерактивного запуска (в этом случае требуется `--model`).
  `setup-opencode` принимает `--model`, чтобы задать модель верхнего уровня по умолчанию.
- `--model <id>` в `omniroute run` обрабатывается согласно настройке каждой цели в манифесте
  (`bin/cli/cli-manifest.mjs`): **aider** получает `--model openai/<id>`, а
  **opencode** — `--model omniroute/<id>` (префикс добавляется, только если он
  ещё не указан в идентификаторе); **qwen** и **gemini** получают идентификатор без изменений;
  **claude** получает его через `ANTHROPIC_MODEL`, **goose** — через `GOOSE_MODEL`, а
  **codex** — через аргументы `-c model_providers.omniroute.*`. **Qwen — единственная цель запуска,
  для которой `--model` строго обязателен**: `omniroute run qwen` без него завершается
  с кодом `2` и явным сообщением об ошибке.
- `--port <port>` — порт локального OmniRoute (по умолчанию `20128`; игнорируется, если задан
  `--remote`). Присутствует во всех командах `setup-*` и в обоих средствах запуска.
- Коды завершения `omniroute run`: собственный код завершения дочернего CLI передаётся
  без изменений; `2` = недопустимые аргументы (неподдерживаемая цель, отсутствие обязательного
  `--model`, ограничение контейнера); `127` = исполняемый файл цели отсутствует в `PATH`;
  `130`/`143`/`129` — запуск завершён сигналом `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = другая ошибка запуска во время выполнения.
- Оба средства запуска (`launch`, `launch-codex`) принимают `--profile <name>` для выбора
  профиля, записанного `setup-claude` / `setup-codex`, а также сквозные аргументы для
  соответствующего исполняемого файла `claude` / `codex`.

Интерактивное средство выбора также используется рецептами настройки:

```bash
# Выберите модель из активного локального или удалённого каталога и настройте целевой инструмент.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

В настоящее время `configure` делегирует работу протестированным рецептам для `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` и `5dive`.
Записи каталога, предназначенные только для IDE,
MITM и руководств, по-прежнему требуют явного использования `setup-*`/ручных процедур и
не представлены как доступные для запуска цели.

> `setup-opencode` — это **облегчённая openai-совместимая** интеграция OpenCode.
> Также существует более функциональная интеграция с помощью плагина — `omniroute setup opencode`, —
> которая устанавливает `@omniroute/opencode-plugin`. Это разные команды; в таблице
> выше описана `setup-opencode`.
>
> Плагин поставляется в двух пакетах — по одному для каждой основной версии OpenCode, поскольку два
> загрузчика ожидают разные точки входа:
> `@omniroute/opencode-plugin` для OpenCode v1 и
> `@omniroute/opencode-plugin-v2` для OpenCode v2. Пакет v2 является новым
> (`0.1.0`) и следует всё ещё изменяющемуся контракту хоста, поэтому он считывает
> структуру, которую OpenCode добавляет в черновик каталога, а не предполагает конкретный формат. Установите
> его, добавив запись `plugins` в `opencode.json`; `omniroute setup opencode`
> по-прежнему устанавливает пакет v1. Параметры и порядок поиска учётных данных описаны
> в README пакета.

---

## Локальное использование

Когда OmniRoute запущен на `localhost:20128`, просто выполните команду настройки для вашего инструмента. Каталог загружается с локального сервера.

```bash
# Codex: записать профиль для каждой сопоставленной модели в ~/.codex/
omniroute setup-codex
codex --profile glm52            # использовать сгенерированный профиль

# Claude Code: записать профили для каждой модели, затем запустить один из них
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: записать OpenAI-совместимый провайдер со всеми моделями каталога
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # используется через {env:OMNIROUTE_API_KEY}, никогда не сохраняется на диск
opencode -m omniroute/glm/glm-5.2 "..."

# Для инструментов без автоматического обнаружения модель необходимо указать явно:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Предварительный просмотр без записи каких-либо данных:
omniroute setup-continue --dry-run
```

Запуск без записи какой-либо конфигурации (только внедрение переменных окружения):

```bash
omniroute launch                 # Claude Code → локальный OmniRoute
omniroute launch-codex           # Codex CLI → локальный OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Явный путь к команде: всё после -- передаётся без изменений
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Удалённое использование

Направьте любую команду настройки на удалённый OmniRoute с помощью `--remote` и `--api-key`. Каталог загружается с удалённого сервера, а конфигурация записывается на локальном компьютере.

```bash
# OpenCode с удалённым VPS, оставить только модели glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # сначала экспортируйте OMNIROUTE_API_KEY

# Профили Codex из удалённого каталога
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Запустить CLI непосредственно с подключением к удалённому серверу
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Вместо того чтобы каждый раз передавать `--remote`/`--api-key`, войдите один раз, и **активный контекст** будет автоматически предоставлять эти параметры:

```bash
omniroute connect 192.168.0.15        # выпускает токен с ограниченной областью действия и сохраняет контекст
omniroute setup-codex                 # ← теперь использует удалённый каталог
omniroute setup-opencode              # ← аналогично
omniroute launch                      # ← Claude Code с подключением к удалённому серверу
```

Сведения о контекстах, областях действия и управлении токенами см. в разделе [Удалённый режим](./REMOTE-MODE.md).

---

## Парки агентов 5dive

[5dive](https://5dive.ai) запускает парк длительно работающих агентов для программирования, каждый из которых является юнитом systemd под отдельным пользователем Unix. Сам по себе он не является CLI для программирования, поэтому `omniroute run` нечего запускать — `5dive` является целью **только для настройки**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Обе формы записывают один **профиль аутентификации** 5dive, после чего каждое место `claude`, привязанное к этому профилю, взаимодействует с OmniRoute. Для этой цели характерны три особенности:

- **Команда выполняется на хосте парка от имени root.** Команды 5dive работают с локальными юнитами systemd и принадлежащим root каталогом состояния; удалённый режим отсутствует. Если команда ещё не выполняется от имени root, рецепт повторно запускает её через `sudo` (`--no-sudo` отключает это поведение и вместо выполнения выводит команду).
- **Конечная точка должна использовать `https://`, если только это не loopback-адрес.** API-ключ агента передаётся через этот URL с каждым запросом, и 5dive отклоняет незашифрованную конечную точку за пределами хоста. Адрес частной локальной сети не является исключением.
- **Закреплённая за каждым местом модель имеет приоритет над профилем.** Профиль содержит `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, однако место, всё ещё закреплённое за стандартным идентификатором модели, завершит первый запрос ошибкой _«Возникла проблема с выбранной моделью»_. Передайте `--agent <name>` (можно указывать несколько раз), чтобы также закрепить модели за местами; если этого не сделать, рецепт выведет соответствующую команду.

API-ключ передаётся 5dive через **stdin** (`--api-key=-`), поэтому он никогда не отображается в выводе `ps`.

Чтобы обеспечить переключение провайдера для парка при сбое, профиль следует направить на **комбинацию** OmniRoute, а не на отдельную модель: когда основной сервер стал полностью недоступен в середине запроса во время запуска, зафиксированного в [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), агент завершил оставшиеся шаги с помощью резервного сервера, не показывая пользователю сбой.

---

## Соглашения о базовом URL (каким инструментам нужен `/v1`)

OmniRoute предоставляет интерфейс OpenAI по пути `/v1`, интерфейс Anthropic — в корне,
а нативный интерфейс Gemini — по пути `/v1beta`. Каждая интеграция настроена в соответствии с форматом,
который ожидает её инструмент (проверено по исходному коду команд):

| Интеграция                                                                 | Записываемый базовый URL | `/v1`?                                         |
| -------------------------------------------------------------------------- | ------------------------ | ---------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | корень                   | Нет — Cline добавляет `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | корень                   | Нет — Goose добавляет путь                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | корень                   | Нет — LiteLLM добавляет `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | с `/v1`                  | Да                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | корень                   | Нет — Claude Code добавляет `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | с `/v1`                  | Да                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | с `/v1`                  | Да                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | корень                   | Нет — SDK добавляет `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` в профиле аутентификации)              | корень                   | Нет — Claude Code добавляет `/v1/messages`     |

---

## Сохранение нативных зависимостей при обновлении: `--include=optional`

При обновлении с помощью `omniroute update` (после подтверждения или с флагом `--apply`)
OmniRoute запускает установку со встроенным флагом `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Это **не** флаг, который нужно передавать в `omniroute update`, — средство обновления
всегда применяет его автоматически. Это гарантирует, что `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, стек SLM LLMLingua) сохранятся после
обновления, даже если в конфигурации npm задано `omit=optional`, из-за чего в противном
случае нативный драйвер SQLite и привязка к хранилищу ключей ОС были бы незаметно
удалены. Чтобы просмотреть точную команду без её выполнения:

```bash
omniroute update --dry-run
# [ПРОБНЫЙ ЗАПУСК] Будет выполнено: npm install -g omniroute@latest --include=optional
```

Другие флаги `omniroute update` (проверено по исходному коду): `--check` (завершиться с кодом 1,
если версия устарела), `--apply` (установить без запроса подтверждения), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI через `omniroute run gemini`

Контракт проверен с `@google/gemini-cli` 0.50.0: CLI учитывает
`GOOGLE_GEMINI_BASE_URL` и отправляет `POST /v1beta/models/<model>:generateContent`
(а также `:streamGenerateContent?alt=sse`) по этому адресу — в точности на нативный
интерфейс Gemini OmniRoute (`/v1beta`). `omniroute run gemini` настраивает это автоматически:

- `GOOGLE_GEMINI_BASE_URL` → активный базовый URL OmniRoute (корень, без `/v1`);
- `GEMINI_API_KEY` → определённые учётные данные OmniRoute (параметр/переменная окружения/контекст);
- **временный изолированный `GEMINI_CLI_HOME`**, в котором `.gemini/settings.json`
  выбирает аутентификацию `gemini-api-key`, поэтому сохранённый сеанс Google OAuth (Code Assist)
  никогда не переопределяет запуск, направленный через OmniRoute; каталог удаляется после завершения;
- **гигиена переменных окружения**: из окружения дочернего процесса удаляются
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` и `GOOGLE_GENAI_USE_GCA` (которые перенаправили бы
  аутентификацию на Vertex/Code Assist), а `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  задаётся как дополнительная страховка; другие цели `run` подвергаются такой же
  обработке собственных конфликтующих переменных;
- добавление `--model <id>` на основе `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Проверка доверия к рабочей области Gemini по-прежнему действует в безголовом режиме — передайте
`--skip-trust` (или подтвердите доверие к каталогу интерактивно) самостоятельно; средство запуска
намеренно не обходит эту проверку. Это средство запуска отличается от **регистрации ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), которая остаётся интеграцией
агентского протокола для `/dashboard/acp-agents`.

---

## Реальная smoke-проверка (по запросу)

Детерминированные регрессионные тесты плана запуска выполняются в CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Для проверки РЕАЛЬНЫХ исполняемых файлов с РЕАЛЬНЫМ
сервером OmniRoute предусмотрен запускаемый по запросу тестовый стенд:
`tests/integration/upstream-cli-smoke.int.test.ts`. Он никогда не запускается автоматически
(каждый подтест пропускается, если не задано `RUN_CLI_SMOKE=1`), передаёт учётные данные по ИМЕНИ
переменной окружения (никогда не передавая само значение), скрывает строки, похожие на ключи, во всех записываемых выходных данных, пропускает
цели, исполняемые файлы которых не установлены, и классифицирует сбои как
auth / upstream / config вместо простого логического значения:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Необязательно: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ограничивает набор проверяемых целей;
`OMNIROUTE_SMOKE_TIMEOUT_MS` переопределяет 120-секундный тайм-аут для каждой цели.

---

## См. также

- [Настройка Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — подробное руководство по Claude Code
- [Настройка Codex CLI](./CODEX-CLI-CONFIGURATION.md) — первоначальная базовая настройка `[model_providers.omniroute]`
- [Удалённый режим](./REMOTE-MODE.md) — контексты, токены доступа с ограниченной областью действия и управление удалённым сервером
- [Справочник по инструментам CLI](../reference/CLI-TOOLS.md) — полный каталог поддерживаемых инструментов и страниц панели управления
- [Руководство по установке](./SETUP_GUIDE.md) — способы установки и первоначальная настройка при первом запуске
