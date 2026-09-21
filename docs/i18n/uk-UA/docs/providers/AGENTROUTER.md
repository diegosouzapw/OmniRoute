# AgentRouter Setup Guide (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) — це сумісний з Anthropic ретранслятор, який перепродає
доступ до Claude та інших моделей, часто за нижчими цінами, ніж безпосередній API Anthropic. Його
розроблено як безпосередню заміну `ANTHROPIC_BASE_URL` для офіційного клієнта Claude Code,
тому він приймає лише трафік, що відповідає мережевому формату Claude Code (певний
User-Agent, прапорці `anthropic-beta`, заголовки Stainless SDK тощо).

## Швидкий старт — використання вбудованого провайдера `agentrouter` (рекомендовано)

Для більшості користувачів **спеціальне налаштування не потрібне**. OmniRoute містить вбудований
провайдер `agentrouter`, у якому вже повністю реалізовано мережевий формат Claude Code (див.
`open-sse/config/providerRegistry.ts` → `agentrouter`). Щоб скористатися ним:

1. Відкрийте **Панель керування → Провайдери → Додати провайдера**.
2. Виберіть **AgentRouter** зі списку.
3. Вставте свій API-ключ `sk-...` і збережіть.

Ось і все — жодних змінних середовища чи спеціального типу провайдера. До вбудованих моделей
належать `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` і
`deepseek-v3.2`.

Решта цього посібника присвячена **розширеному способу**: використанню типу провайдера
`anthropic-compatible-cc-*`. Використовуйте його, коли потрібен більший контроль
над мережевим форматом — наприклад, під час підключення до інших ретрансляторів у стилі AgentRouter,
яких ще немає у вбудованому реєстрі провайдерів, або коли потрібно перевизначити
базову URL-адресу, шлях чату чи набір заголовків.

---

## Розширене налаштування: підключення через тип провайдера, сумісний із Claude Code

OmniRoute також підтримує AgentRouter (і подібні ретранслятори) через тип провайдера,
**сумісний із Claude Code** (`anthropic-compatible-cc-*`), який використовує
Anthropic Messages API із правильним мережевим форматом. Універсальний провайдер
`openai-compatible-chat`, що вказує на `https://agentrouter.org`,
**не** працюватиме — WAF на стороні сервісу відхиляє запити, які не схожі на запити Claude
Code.

---

## Передумови

- Обліковий запис AgentRouter та API-ключ. Нові користувачі отримують безкоштовні кредити за партнерським
  посиланням у файлі [README](../README.md) проєкту.
- Запущений OmniRoute з увімкненим прапорцем функції `ENABLE_CC_COMPATIBLE_PROVIDER`
  (див. нижче).

## 1. Увімкніть тип провайдера, сумісний із CC

Тип провайдера, сумісний із Claude Code, обмежено прапорцем функції, оскільки він
надсилає трафік, який точно імітує офіційний клієнт Claude Code. Увімкніть його,
встановивши змінну середовища перед запуском OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Приклад із Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Після перезапуску на панелі керування з’явиться пункт **Додати сумісний із Claude Code**
на додачу до наявних варіантів, сумісних з OpenAI та Anthropic.

## 2. Створіть провайдера на панелі керування

1. Відкрийте **Панель керування → Провайдери → Додати провайдера**.
2. Виберіть **Додати сумісний із Claude Code** (відображається лише тоді, коли встановлено наведений вище прапорець).
3. Заповніть поля:

| Поле              | Значення                                                                              |
| ----------------- | ------------------------------------------------------------------------------------- |
| Назва             | `AgentRouter` (або будь-яка інша мітка)                                               |
| Префікс           | `agentrouter` (зручний псевдонім, що відображається в журналах і на панелі керування) |
| Базова URL-адреса | `https://agentrouter.org`                                                             |
| Шлях чату         | `/v1/messages?beta=true` (за замовчуванням — залиште без змін)                        |

> Канонічний ідентифікатор моделі однаково використовує повний ідентифікатор вузла провайдера
> (`anthropic-compatible-cc-{uuid}/{model}`). **Префікс** — це лише псевдонім для відображення,
> який визначається через `src/lib/usage/callLogs.ts`, щоб зробити виведення журналів зручнішим.

4. (Необов’язково) Вставте свій API-ключ у поле **Перевірка** та натисніть **Перевірити**, щоб
   підтвердити можливість підключення перед збереженням.
5. Натисніть **Додати**.

Після створення відкрийте провайдера та додайте **Підключення** зі своїм API-ключем AgentRouter
(`sk-...`). Значення `test_status` підключення має змінитися на `active`.

## 3. Використовуйте через комбо або безпосередньо

Звертайтеся до моделі, використовуючи префікс вашого провайдера як простір імен:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Канонічний ідентифікатор моделі `anthropic-compatible-cc-{uuid}/claude-opus-4-6` також працює
і саме він відображається в базі даних та конфігурації комбо.

Або додайте модель до комбо для маршрутизації, резервного перемикання та керування квотами, як і для будь-якого іншого
провайдера.

---

## Деталі образу мережевих запитів

Для довідки: cc-сумісний міст надсилає наведені нижче дані з кожним запитом до вищого рівня
(див. `open-sse/services/claudeCodeCompatible.ts`):

| Заголовок                                                              | Значення                                                                                                       |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                                        | `Bearer <api-key>`                                                                                             |
| `User-Agent`                                                           | `claude-cli/2.1.258 (external, sdk-cli)`                                                                       |
| `anthropic-version`                                                    | `2023-06-01`                                                                                                   |
| `anthropic-beta`                                                       | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                       |
| Перемикач бета-функції приховування міркувань для окремого підключення | Додає `redact-thinking-2026-02-12` для вищих рівнів, які явно вимагають потоків із прихованими міркуваннями    |
| Перемикач узагальнених міркувань для окремого підключення              | Додає `display: "summarized"` до запитів CC Compatible із міркуваннями, у яких режим відображення ще не задано |
| `anthropic-dangerous-direct-browser-access`                            | `true`                                                                                                         |
| `x-app`                                                                | `cli`                                                                                                          |
| `X-Stainless-*`                                                        | Різні заголовки SDK Stainless (мова, версія пакета, ОС, архітектура тощо)                                      |

Саме це дає запитам змогу проходити WAF / білий список клієнтів вищого рівня.

---

## Усунення несправностей

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Ваш запит
не відповідає образу мережевих запитів Claude Code. Це трапляється, коли провайдер налаштований
як `openai-compatible-chat` замість `anthropic-compatible-cc` або коли
прапорець `ENABLE_CC_COMPATIBLE_PROVIDER=true` не було встановлено під час запуску.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
«Недійсний токен». Образ мережевих запитів правильний, але API-ключ відхилено. Створіть
новий ключ на панелі керування AgentRouter та оновіть підключення.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Механізм модерації AgentRouter відхилив вміст запиту або
тарифний план ключа не дозволяє використовувати запитану модель. Спробуйте інший запит або модель;
зверніться до служби підтримки AgentRouter, якщо безпечний запит постійно блокується.

**`[400]: content-blocked` лише для певних моделей** — Більшість тарифних планів AgentRouter
дозволяють лише підмножину моделей (наприклад, `claude-opus-4-6`). Інші ідентифікатори моделей повертають
`unauthorized_client_error`, навіть якщо ключ дійсний. Перевірте на панелі керування AgentRouter, які моделі
охоплює ваш тарифний план.

**`Invalid JSON response from provider (reset after Ns)` у журналах omniroute** —
Вищий рівень повернув відповідь не у форматі JSON (зазвичай це HTML-сторінка помилки від WAF).
Зазвичай це означає, що запит так і не дістався бекенду AgentRouter — ще раз перевірте, що
ідентифікатор провайдера починається з `anthropic-compatible-cc-` (зверніть увагу на дефіс у кінці —
див. `CLAUDE_CODE_COMPATIBLE_PREFIX` у `open-sse/services/claudeCodeCompatible.ts`)
і що прапорець функції ввімкнено.

**`unauthorized client detected` / HTML-сторінка помилки, навіть якщо провайдер AgentRouter
уже існує** — імовірно, у вас є **більше одного** провайдера AgentRouter,
і ваш запит потрапляє до неправильного. Якщо залишився створений вручну провайдер
`anthropic-compatible-*` (без `cc`) або `openai-compatible-chat-*`,
створений із префіксом `agentrouter`, він може володіти ідентифікаторами моделей `agentrouter/<model>`
(а комбо можуть посилатися на нього за ідентифікатором вузла), тому трафік спрямовується до цього провайдера —
який надсилає типовий User-Agent і отримує відмову — замість вбудованого
провайдера `agentrouter`, що вже постачається з правильним образом мережевих запитів. Перевірте в журналах
omniroute, на що фактично перетворюється модель (тег `ROUTING` показує
`agentrouter/<model> → <providerId>/<model>`); якщо `<providerId>` — не
`agentrouter`, перейдіть на використання нативного провайдера: спрямуйте комбо на
`agentrouter/<model>` (providerId `agentrouter`) і видаліть дублікати
сумісних провайдерів. Нативний провайдер не потребує налаштування образу мережевих запитів або
`customUserAgent`.

---

## Див. також

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — примітки щодо інтеграції провайдера Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — каталог провайдерів із
  безкоштовним рівнем
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — реалізація передавання зображень
