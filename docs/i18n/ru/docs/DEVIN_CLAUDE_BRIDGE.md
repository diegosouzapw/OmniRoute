# Devin Claude Bridge (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` позволяет реальной среде выполнения Claude Code использовать локальную конечную точку Anthropic
Messages в OmniRoute, в то время как официальный Devin CLI предоставляет ответы модели через ACP stdio. Он
не изменяет существующие провайдеры Anthropic, Claude OAuth, Claude Web или `devin-cli`.

> **Текущее состояние: закреплена версия Claude Code `2.1.258`; последняя офлайн- и онлайн-проверка
> проводилась на версии `2.1.220`.** На закреплённой версии `2.1.220` были выполнены три изолированных сценария через Devin CLI
> `3000.2.17` и модель `swe-1-7-lightning`; последний онлайн-запуск подтвердил выполнение на стороне клиента
> операций `Read`, `Edit` и `Bash`, успешные результаты `npm test`, обнаружение проектных команд и навыков,
> маршрутизацию исключительно через Devin и отсутствие исходящего трафика к Claude. Затем закреплённая версия была повышена до `2.1.258`
> (поколение CLI, за которое выдаёт себя идентификатор Claude в OmniRoute, и первая линейка со встроенным
> уровнем Fable 5.1). На новой закреплённой версии были проверены слой установки и `claude --version`
> в закреплённом базовом образе, а набор модульных тестов моста, `compose config` и
> статическое доказательство изоляции проходят успешно — однако офлайн-сценарий с имитацией и онлайн-набор из трёх сценариев
> ещё не запускались повторно. Повторно запустите их (см. «Обновление закреплённых инструментов»), прежде чем полагаться на
> мост с этой закреплённой версией.

## Архитектура

```text
Claude Code 2.1.258 (изолированный Linux-контейнер без прав root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (провайдер в формате Claude без аутентификации)
  -> devin acp --agent-type summarizer (официальный ACP stdio, без инструментов Devin)
  -> учётная запись Devin в выделенном томе devin-auth
```

Стандартный ACP-агент официального CLI может выполнять собственные инструменты, поэтому этот мост его не использует.
Он запускает фиксированный ACP-агент `summarizer`, у которого в официальном режиме CLI нет инструментов, и
оформляет сериализованный запрос Anthropic как трассировку выполнения. Когда требуется другое действие,
выполняемое Claude, ответ должен содержать ровно одну клиентскую оболочку инструмента. Любой ACP-вызов
`tool_call` или `tool_call_update` отклоняется до того, как ответ может быть признан
успешным.

Сериализатор в `open-sse/executors/devin-agentic/serializer.ts` сохраняет `system`,
`text`, `tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` и
инструменты, предоставленные Claude Code. Изображения и неизвестные блоки приводят к явной ошибке. Большие результаты
инструментов снабжаются видимым маркером усечения.

Парсер принимает одну автономную оболочку `<tool>{...}</tool>` за один ход модели. Он сверяет
имя со списком инструментов из запроса, проверяет аргументы по JSON Schema этого инструмента,
отклоняет смешение повествования и действий и допускает одну ограниченную попытку исправления. Затем Claude Code
локально выполняет полученный Anthropic `tool_use` и отправляет `tool_result` обратно через
OmniRoute.

## Изоляция и модель угроз

Установка, учётная запись и конфигурация Claude на хосте не входят в область рассмотрения и считаются
запрещёнными. Сервисы Compose:

- работают с UID/GID `10001:10001`, корневой файловой системой только для чтения, сброшенными возможностями и
  `no-new-privileges`;
- используют приватный каталог `/home/bridge`, выделенный том конфигурации Claude, изолированные данные OmniRoute
  и отдельный том `devin-auth`;
- монтируют только одноразовые рабочие каталоги и свидетельства `.sandbox`;
- не монтируют домашний каталог хоста, Keychain, учётные данные SSH и облачных сервисов или сокет Docker;
- формируют явно заданное окружение и удаляют переменные API/OAuth/маршрутизации Anthropic;
- направляют инференс Claude Code только на `http://omniroute:20128`, используя исключительно локальный ключ.

Офлайн-профиль использует внутреннюю сеть. В онлайн-профиле OmniRoute обращается к
официальным конечным точкам Devin только через `network-guard`; доступ к посторонним адресам запрещён.
Claude Code использует отдельный механизм блокировки всего исходящего трафика и может обращаться только к локальному сервису OmniRoute
через `NO_PROXY`. Файлы аудита защитных механизмов монтируются только соответствующим процессом защиты.
Скрипты проверяют владельца файла, режим доступа, количество ссылок и каждое решение перед экспортом
свидетельств, не содержащих токенов.

Запустите проверку изоляции отдельно:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Она проверяет топологию, именованные монтирования, настройки запуска без прав root и только для чтения, явную локальную маршрутизацию,
отсутствие чувствительных переменных окружения, отсутствие сокета Docker, блокировку доступа к
`api.anthropic.com` и `claude.ai`, выбор исключительно провайдера Devin и явный сбой при
недоступности серверной части ACP.

## Первоначальная настройка и обычное использование

Соберите закреплённый образ:

```bash
./scripts/devin-bridge/build
```

Выполните аутентификацию только для изолированного тома Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Команда входа использует официальный процесс с ручным вводом токена, предназначенный для удалённых/контейнерных сред. Значение вводится непосредственно в приглашение CLI; оно не передаётся как аргумент процесса, не записывается в Git и не копируется с хоста.

Запустите изолированную среду выполнения Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` повторно проверяет изоляцию, аутентификацию Devin и обнаружение моделей перед запуском контейнеризированного Claude Code. Эта команда никогда не запускает исполняемый файл Claude на хосте. Псевдонимы моделей можно задать в `.env.devin-bridge`; каждое настроенное значение должно сохранять префикс `devin-cli-agentic/`.

## Команды проверки

Для воспроизводимого автономного процесса не требуется учётная запись Devin, и во время выполнения не используется Интернет:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Аутентифицированный интерактивно включаемый процесс проверки в реальной среде запускается так:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Средство запуска проверок в реальной среде делает паузы между сценариями, чтобы не открывать сеансы ACP массово, и проверяет структурированные события потока Claude вместо того, чтобы полагаться на текстовые утверждения. Три сценария подтверждают:

1. непосредственное чтение файлов проекта и анализ дефектов;
2. реальный вызов `Edit`, принадлежащий клиенту вызов `Bash` с командой `npm test` и итоговый результат;
3. обнаружение `/bridge-check` и `bridge-proof`, чтение файлов проекта, ещё один успешный принадлежащий клиенту вызов `npm test` и завершение без незаконченной работы.

Финальный этап также проверяет аудит сети Devin и требует, чтобы аудит исходящего трафика Claude оставался пустым.

## Обновление закреплённых инструментов

Версии Node, Claude Code и Devin CLI закреплены в образе в файле `docker/devin-bridge/Dockerfile`. Для обновления:

1. измените явно указанные версии;
2. замените контрольные суммы архива Devin для обеих архитектур значениями официального артефакта;
3. повторно соберите образ и выполните все команды автономной проверки;
4. подтвердите версии внутри образа;
5. повторно запустите аутентифицированный набор из трёх сценариев в реальной среде.

Не устанавливайте ни один из CLI глобально на хосте и не заменяйте проверку контрольных сумм загрузкой без проверки.

## Диагностика и очистка

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  отображает локальную маршрутизацию и очищенные от конфиденциальных данных ошибки исполнителя.
- `.sandbox/evidence/mock-acp.jsonl` содержит детерминированные действия имитации ACP.
- `.sandbox/evidence/claude-stream.jsonl` содержит данные реального автономного запуска Claude Code.
- `.sandbox/evidence/live-*.jsonl` содержит три проверенных потока из реальной среды.
- `.sandbox/evidence/egress.jsonl` и `.sandbox/evidence/claude-egress.jsonl` содержат проверенные копии аудитов защитных механизмов без токенов.

Остановите принадлежащие проекту контейнеры и сети, сохранив тома входа и конфигурации:

```bash
./scripts/devin-bridge/clean
```

Удалите всю принадлежащую мосту среду, включая именованные тома:

```bash
./scripts/devin-bridge/clean --all
```

## Ограничения

- Мост использует фиксированную роль `summarizer` без инструментов, поскольку Devin CLI `3000.2.17`
  не предоставляет нейтрального ACP-агента без инструментов. Адаптер компенсирует промежуточные
  ответы в формате сводки, однако единственная ограниченная попытка исправления всё же может завершиться явной ошибкой.
- Реальные вызовы ACP могут возвращать временные ответы `502`/`504`. Тестовая система разносит сценарии
  по времени; при постоянном сбое сохраняется отказобезопасное поведение и другой провайдер не выбирается.
- Контекст ACP восстанавливается из каждого запроса Anthropic; привязка к процессу или сеансу
  отсутствует.
- Для каждого ответа модели поддерживается один вызов инструмента; параллельные вызовы отклоняются.
- Изображения явно не поддерживаются. Возможности компьютерного зрения, вывод процесса рассуждения, управление
  вычислительными усилиями и контекстное окно размером 1M не заявлены.
- SSE использует корректные события жизненного цикла Anthropic, но они отправляются после завершения
  ограниченного хода ACP; фрагменты ACP не пересылаются по мере поступления.
