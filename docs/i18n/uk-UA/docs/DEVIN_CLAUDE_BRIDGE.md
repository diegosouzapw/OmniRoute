# Devin Claude Bridge (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../DEVIN_CLAUDE_BRIDGE.md) · 🇪🇹 [am](../../am/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇦 [ar](../../ar/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇿 [az](../../az/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇬 [bg](../../bg/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇩 [bn](../../bn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇿 [cs](../../cs/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇰 [da](../../da/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇩🇪 [de](../../de/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇷 [el](../../el/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇸 [es](../../es/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇪🇪 [et](../../et/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇷 [fa](../../fa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇮 [fi](../../fi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇫🇷 [fr](../../fr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇪 [ga](../../ga/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [gu](../../gu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ha](../../ha/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇱 [he](../../he/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [hi](../../hi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇷 [hr](../../hr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇭🇺 [hu](../../hu/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇦🇲 [hy](../../hy/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇩 [id](../../id/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [ig](../../ig/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇹 [it](../../it/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇯🇵 [ja](../../ja/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇬🇪 [ka](../../ka/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇭 [km](../../km/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [kn](../../kn/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇷 [ko](../../ko/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇹 [lt](../../lt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇻 [lv](../../lv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ml](../../ml/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [mr](../../mr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇾 [ms](../../ms/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇹 [mt](../../mt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇲🇲 [my](../../my/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇵 [ne](../../ne/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇱 [nl](../../nl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇴 [no](../../no/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [or](../../or/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [pa](../../pa/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇭 [phi](../../phi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇱 [pl](../../pl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇹 [pt](../../pt/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇴 [ro](../../ro/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇺 [ru](../../ru/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇱🇰 [si](../../si/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇰 [sk](../../sk/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇮 [sl](../../sl/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇷🇸 [sr](../../sr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇸🇪 [sv](../../sv/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇰🇪 [sw](../../sw/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [ta](../../ta/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇮🇳 [te](../../te/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇭 [th](../../th/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇷 [tr](../../tr/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇵🇰 [ur](../../ur/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇺🇿 [uz](../../uz/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇻🇳 [vi](../../vi/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇳🇬 [yo](../../yo/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVIN_CLAUDE_BRIDGE.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVIN_CLAUDE_BRIDGE.md)

---

`devin-cli-agentic` дає змогу реальному середовищу виконання Claude Code використовувати локальну
кінцеву точку Anthropic Messages від OmniRoute, тоді як офіційний Devin CLI надає відповіді
моделі через ACP stdio. Він не змінює наявні провайдери Anthropic, Claude OAuth, Claude Web
або `devin-cli`.

> **Поточний стан: зафіксовано Claude Code `2.1.258`; останню офлайн- і онлайн-перевірку
> зареєстровано для `2.1.220`.** Зафіксована версія `2.1.220` завершила три ізольовані сценарії
> через Devin CLI `3000.2.17` і модель `swe-1-7-lightning`; цей фінальний онлайн-запуск
> підтвердив виконання на боці клієнта операцій `Read`, `Edit` і `Bash`, успішні результати
> `npm test`, виявлення команд і навичок проєкту, маршрутизацію виключно через Devin та
> відсутність вихідного трафіку до Claude. Потім зафіксовану версію було підвищено до
> `2.1.258` (покоління CLI, за яке видає себе Claude-ідентичність OmniRoute, і першої гілки,
> що постачається з нативною підтримкою рівня Fable 5.1). Для нової зафіксованої версії на
> базовому образі було перевірено шар установлення та `claude --version`, а модульний набір
> тестів мосту, `compose config` і статична перевірка ізоляції проходять успішно — однак
> офлайн-сценарій із макетом і онлайн-набір із трьох сценаріїв ще не запускалися повторно.
> Запустіть їх повторно (див. «Оновлення зафіксованих інструментів»), перш ніж покладатися
> на міст із цією зафіксованою версією.

## Архітектура

```text
Claude Code 2.1.258 (ізольований Linux-контейнер без прав root)
  -> http://omniroute:20128/v1/messages
  -> devin-cli-agentic (провайдер у форматі Claude без автентифікації)
  -> devin acp --agent-type summarizer (офіційний ACP stdio без інструментів Devin)
  -> обліковий запис Devin у виділеному томі devin-auth
```

Стандартний ACP-агент офіційного CLI може виконувати власні інструменти, тому цей міст його
не використовує. Він запускає фіксованого ACP-агента `summarizer`, офіційний режим CLI якого
не має інструментів, і оформлює серіалізований запит Anthropic як трасу виконання. Коли
потрібна інша дія, що виконується Claude, відповідь повинна містити рівно одну клієнтську
обгортку інструмента. Будь-який `tool_call` або `tool_call_update` ACP відхиляється до того,
як відповідь може бути оголошена успішною.

Серіалізатор у `open-sse/executors/devin-agentic/serializer.ts` зберігає `system`, `text`,
`tool_use`, `tool_result`, `thinking`, `redacted_thinking`, `tool_choice` та інструменти,
надані Claude Code. Зображення й невідомі блоки спричиняють явну помилку. Для великих
результатів інструментів використовується видимий маркер усічення.

Парсер приймає одну самостійну обгортку `<tool>{...}</tool>` за один хід моделі. Він звіряє
назву зі списком інструментів запиту, перевіряє аргументи за JSON Schema цього інструмента,
відхиляє змішані описи й дії та дозволяє одну обмежену спробу виправлення. Потім Claude Code
локально виконує отриманий Anthropic `tool_use` і надсилає `tool_result` назад через
OmniRoute.

## Ізоляція та модель загроз

Установлення Claude, обліковий запис і конфігурація на хості не входять до сфери застосування
та вважаються забороненими. Сервіси Compose:

- працюють з UID/GID `10001:10001`, із файловою системою кореневого рівня лише для читання,
  скинутими привілеями та `no-new-privileges`;
- використовують приватний `/home/bridge`, виділений том конфігурації Claude, ізольовані дані
  OmniRoute та окремий том `devin-auth`;
- монтують лише одноразові робочі простори й докази `.sandbox`;
- не монтують домашній каталог хоста, Keychain, SSH, облікові дані хмарних сервісів або
  сокет Docker;
- формують явні середовища та видаляють змінні API/OAuth/маршрутизації Anthropic;
- спрямовують інференс Claude Code лише до `http://omniroute:20128` із ключем, призначеним
  тільки для локального використання.

Офлайн-профіль використовує внутрішню мережу. В онлайн-профілі OmniRoute звертається до
офіційних кінцевих точок Devin лише через `network-guard`; доступ до інших адрес заборонено.
Claude Code має окремий засіб блокування всього вихідного трафіку й може звертатися лише до
локального сервісу OmniRoute через `NO_PROXY`. Файли аудиту захисних засобів монтуються лише
їхніми процесами. Перед експортом доказів без токенів скрипти перевіряють власника файлів,
режим доступу, кількість посилань і кожне рішення.

Запустіть перевірку ізоляції окремо:

```bash
./scripts/devin-bridge/verify-anthropic-isolation
```

Вона перевіряє топологію, іменовані точки монтування, налаштування запуску без прав root і
лише для читання, явну локальну маршрутизацію, відсутність чутливих змінних середовища,
відсутність сокета Docker, блокування доступу до `api.anthropic.com` і `claude.ai`, вибір
провайдера виключно Devin та явну помилку, коли серверна частина ACP недоступна.

## Перше налаштування та звичайне використання

Зберіть образ із зафіксованими версіями:

```bash
./scripts/devin-bridge/build
```

Автентифікуйте лише ізольований том Devin:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/login-devin
```

Команда входу використовує офіційний процес із ручним введенням токена, призначений для віддалених/контейнерних середовищ. Значення вводиться безпосередньо в запит CLI; воно не передається як аргумент процесу, не записується в Git і не копіюється з хоста.

Запустіть ізольоване середовище виконання Claude Code:

```bash
./scripts/devin-bridge/launch
```

`launch` повторно перевіряє ізоляцію, автентифікацію Devin і виявлення моделей перед запуском контейнеризованого Claude Code. Він ніколи не запускає виконуваний файл Claude із хоста. Псевдоніми моделей можна налаштувати у `.env.devin-bridge`; кожне налаштоване значення має зберігати префікс `devin-cli-agentic/`.

## Команди перевірки

Відтворюваний офлайн-процес не потребує облікового запису Devin і не має доступу до Інтернету під час виконання:

```bash
./scripts/devin-bridge/test-unit
./scripts/devin-bridge/test-contract
./scripts/devin-bridge/test-e2e-mock
./scripts/devin-bridge/verify-anthropic-isolation
```

Автентифікований процес перевірки в реальному середовищі, який запускається за явною згодою:

```bash
ENABLE_LIVE_DEVIN_TESTS=1 ./scripts/devin-bridge/test-live-devin
```

Засіб запуску в реальному середовищі робить паузи між сценаріями, щоб уникнути одночасного відкриття багатьох сеансів ACP, і перевіряє структуровані потокові події Claude замість того, щоб покладатися на текстові твердження. Його три сценарії підтверджують:

1. безпосереднє читання проєкту й аналіз дефектів;
2. реальне виконання `Edit`, клієнтське виконання `Bash` `npm test` і отримання кінцевого результату;
3. виконання `/bridge-check`, виявлення `bridge-proof`, читання проєкту, ще одне успішне клієнтське виконання `npm test` і завершення без незавершеної роботи.

Фінальна контрольна перевірка також перевіряє аудит мережі Devin і вимагає, щоб аудит вихідного трафіку Claude залишався порожнім.

## Оновлення інструментів із зафіксованими версіями

В образі зафіксовано версії Node, Claude Code і Devin CLI у файлі `docker/devin-bridge/Dockerfile`. Для оновлення:

1. змініть явно вказані версії;
2. замініть контрольні суми архівів Devin для обох архітектур значеннями офіційного артефакту;
3. повторно зберіть образ і виконайте всі команди офлайн-перевірки;
4. підтвердьте версії всередині образу;
5. повторно запустіть автентифікований набір із трьох сценаріїв у реальному середовищі.

Не встановлюйте жоден із CLI глобально на хості та не замінюйте перевірку контрольних сум неперевіреним завантаженням.

## Діагностика й очищення

- `docker compose -f docker/devin-bridge/compose.yml --profile offline logs omniroute`
  показує локальну маршрутизацію та очищені від конфіденційних даних помилки виконавця.
- `.sandbox/evidence/mock-acp.jsonl` містить записи про детерміновані імітовані дії ACP.
- `.sandbox/evidence/claude-stream.jsonl` містить записи про фактичний офлайн-запуск Claude Code.
- `.sandbox/evidence/live-*.jsonl` містить записи про три перевірені потоки в реальному середовищі.
- `.sandbox/evidence/egress.jsonl` і `.sandbox/evidence/claude-egress.jsonl` є перевіреними копіями журналів аудиту захисних механізмів без токенів.

Зупиніть належні цьому середовищу контейнери й мережі, зберігши томи входу/конфігурації:

```bash
./scripts/devin-bridge/clean
```

Видаліть усе середовище, що належить мосту, включно з іменованими томами:

```bash
./scripts/devin-bridge/clean --all
```

## Обмеження

- Міст покладається на фіксовану роль `summarizer` без інструментів, оскільки Devin CLI `3000.2.17`
  не надає нейтрального ACP-агента без інструментів. Адаптер компенсує проміжні відповіді
  у формі підсумків, але одна обмежена спроба виправлення все одно може завершитися явною помилкою.
- Активні виклики ACP можуть повертати тимчасові відповіді `502`/`504`. Засіб тестування розносить сценарії
  в часі; за постійної помилки система залишається закритою в разі відмови й ніколи не вибирає іншого провайдера.
- Контекст ACP відтворюється з кожного запиту Anthropic; прив’язка
  до процесу/сеансу відсутня.
- Підтримується один виклик інструмента на кожну відповідь моделі; паралельні виклики відхиляються.
- Зображення явно не підтримуються. Можливості комп’ютерного зору, виведення міркувань, керування зусиллями та контекстне вікно
  на 1M не заявлені.
- SSE використовує коректні події життєвого циклу Anthropic, але надсилається після отримання
  обмеженого ходу ACP; фрагменти ACP не пересилаються поступово.
