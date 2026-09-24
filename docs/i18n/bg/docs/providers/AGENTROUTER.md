# AgentRouter Setup Guide (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) е съвместим с Anthropic посреднически сървър, който препродава
достъп до Claude и други модели, често на по-ниски цени от директния Anthropic API. Той е
проектиран като директен заместител чрез `ANTHROPIC_BASE_URL` за официалния клиент Claude Code,
поради което приема само трафик, който съответства на мрежовия профил на Claude Code (конкретен
User-Agent, флагове `anthropic-beta`, заглавки на Stainless SDK и др.).

## Бързо начало — използване на вградения доставчик `agentrouter` (препоръчително)

За повечето потребители **не е необходима специална конфигурация**. OmniRoute включва вграден
доставчик `agentrouter`, в който вече е интегриран пълният мрежов профил на Claude Code (вижте
`open-sse/config/providerRegistry.ts` → `agentrouter`). За да го използвате:

1. Отворете **Табло → Доставчици → Добавяне на доставчик**.
2. Изберете **AgentRouter** от списъка.
3. Поставете своя API ключ `sk-...` и запазете.

Това е всичко — не са необходими променливи на средата или персонализиран тип доставчик. Вградените модели
включват `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` и
`deepseek-v3.2`.

Останалата част от това ръководство разглежда **разширения подход**: използване на типа доставчик
`anthropic-compatible-cc-*`. Използвайте го, когато се нуждаете от повече контрол
върху мрежовия профил — например при свързване към други посреднически сървъри от типа на AgentRouter,
които все още не са включени във вградения регистър на доставчиците, или при промяна на
базовия URL адрес, пътя за чат или набора от заглавки.

---

## Разширена конфигурация: свързване чрез съвместимия с Claude Code тип доставчик

OmniRoute поддържа също AgentRouter (и подобни посреднически сървъри) чрез **съвместимия с Claude Code**
тип доставчик (`anthropic-compatible-cc-*`), който използва
Anthropic Messages API с правилния мрежов профил. Общ доставчик
`openai-compatible-chat`, насочен към `https://agentrouter.org`, **няма**
да работи — защитната стена за уеб приложения (WAF) на отсрещната страна отхвърля заявки, които не изглеждат като изпратени от Claude
Code.

---

## Предварителни изисквания

- Профил и API ключ за AgentRouter. Новите регистрации получават безплатни кредити чрез партньорската
  връзка в [README](../README.md) на проекта.
- OmniRoute трябва да работи с активиран функционален флаг `ENABLE_CC_COMPATIBLE_PROVIDER`
  (вижте по-долу).

## 1. Активиране на съвместимия с CC тип доставчик

Съвместимият с Claude Code тип доставчик е ограничен чрез функционален флаг, тъй като
изпраща трафик, който силно наподобява този на официалния клиент Claude Code. Активирайте го, като
зададете променлива на средата, преди да стартирате OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Пример с Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

След рестартиране в таблото се показва опция **Добавяне на съвместим с Claude Code доставчик**
в допълнение към съществуващите процедури за съвместими с OpenAI и Anthropic доставчици.

## 2. Създаване на доставчика в таблото

1. Отворете **Табло → Доставчици → Добавяне на доставчик**.
2. Изберете **Добавяне на съвместим с Claude Code доставчик** (вижда се само когато горният флаг е зададен).
3. Попълнете полетата:

| Поле       | Стойност                                                             |
| ---------- | -------------------------------------------------------------------- |
| Име        | `AgentRouter` (или друг етикет)                                      |
| Префикс    | `agentrouter` (удобен псевдоним, показван в дневниците и таблото)    |
| Базов URL  | `https://agentrouter.org`                                            |
| Път за чат | `/v1/messages?beta=true` (по подразбиране — оставете го без промяна) |

> Каноничният идентификатор на модела продължава да използва пълния идентификатор на възела на доставчика
> (`anthropic-compatible-cc-{uuid}/{model}`). **Префиксът** е само псевдоним за показване,
> който се разрешава от `src/lib/usage/callLogs.ts` за по-удобен изход в дневниците.

4. (Незадължително) Поставете своя API ключ в полето **Проверка** и щракнете върху **Провери**, за да
   потвърдите свързаността преди запазване.
5. Щракнете върху **Добавяне**.

След като го създадете, отворете доставчика и добавете **Връзка** със своя API
ключ за AgentRouter (`sk-...`). `test_status` на връзката трябва да стане `active`.

## 3. Използване чрез комбинация или директно

Посочете модела, като използвате префикса на доставчика като пространство от имена:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Каноничният идентификатор на модела `anthropic-compatible-cc-{uuid}/claude-opus-4-6` също работи
и именно той се показва в базата данни и конфигурацията на комбинацията.

Или го добавете към комбинация за маршрутизиране, резервно превключване и управление на квотите, както всеки друг
доставчик.

---

## Подробности за мрежовия профил

За справка, cc-съвместимият мост изпраща следното при всяка заявка към доставчика
(вижте `open-sse/services/claudeCodeCompatible.ts`):

| Заглавка                                                                 | Стойност                                                                                                               |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                                          | `Bearer <api-key>`                                                                                                     |
| `User-Agent`                                                             | `claude-cli/2.1.258 (external, sdk-cli)`                                                                               |
| `anthropic-version`                                                      | `2023-06-01`                                                                                                           |
| `anthropic-beta`                                                         | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                               |
| Превключвател за бета-режим на скриване на разсъжденията за всяка връзка | Добавя `redact-thinking-2026-02-12` за доставчици, които изрично изискват потоци със скрити разсъждения                |
| Превключвател за обобщено разсъждение за всяка връзка                    | Добавя `display: "summarized"` към CC Compatible заявки за разсъждение, които все още нямат зададен режим на показване |
| `anthropic-dangerous-direct-browser-access`                              | `true`                                                                                                                 |
| `x-app`                                                                  | `cli`                                                                                                                  |
| `X-Stainless-*`                                                          | Различни заглавки на Stainless SDK (език, версия на пакета, ОС, архитектура и др.)                                     |

Това позволява на заявките да преминават през WAF / белия списък с клиенти на доставчика.

---

## Отстраняване на неизправности

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Заявката ви не
съответства на мрежовия профил на Claude Code. Това се случва, когато доставчикът е конфигуриран
като `openai-compatible-chat` вместо `anthropic-compatible-cc` или когато флагът
`ENABLE_CC_COMPATIBLE_PROVIDER=true` не е бил зададен при стартиране.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Невалиден токен“. Мрежовият профил е правилен, но API ключът е отхвърлен. Генерирайте
нов ключ в таблото за управление на AgentRouter и актуализирайте връзката.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Механизмът за модериране на AgentRouter е отхвърлил съдържанието на заявката или
планът на ключа не позволява използването на заявения модел. Опитайте с друга подкана или модел;
свържете се с поддръжката на AgentRouter, ако безобидна подкана системно се блокира.

**`[400]: content-blocked` само при определени модели** — Повечето планове на AgentRouter
позволяват само подмножество от модели (например `claude-opus-4-6`). Други идентификатори на модели връщат
`unauthorized_client_error`, въпреки че ключът е валиден. Проверете кои модели
покрива вашият план в таблото за управление на AgentRouter.

**`Invalid JSON response from provider (reset after Ns)` в регистрационните файлове на omniroute** —
Доставчикът е върнал тяло, което не е JSON (обикновено HTML страница за грешка от WAF).
Това обикновено означава, че заявката изобщо не е достигнала до бекенда на AgentRouter — проверете отново дали
идентификаторът на доставчика започва с `anthropic-compatible-cc-` (обърнете внимание на завършващото тире —
вижте `CLAUDE_CODE_COMPATIBLE_PREFIX` в `open-sse/services/claudeCodeCompatible.ts`)
и дали функционалният флаг е активиран.

**`unauthorized client detected` / HTML страница за грешка, въпреки че вече съществува доставчик
на AgentRouter** — вероятно имате **повече от един** доставчик на AgentRouter
и заявката ви достига до грешния. Ако останал ръчно създаден
`anthropic-compatible-*` (без `cc`) или `openai-compatible-chat-*` доставчик е бил
създаден с префикса `agentrouter`, той може да притежава идентификаторите на модели `agentrouter/<model>`
(а комбинациите може да го посочват чрез идентификатор на възел), така че трафикът да се маршрутизира към този доставчик —
който изпраща общ User-Agent и бива отхвърлен — вместо към вградения
доставчик `agentrouter`, който вече включва правилния мрежов профил. Проверете към какво
всъщност се разрешава моделът в регистрационните файлове на omniroute (етикетът `ROUTING` показва
`agentrouter/<model> → <providerId>/<model>`); ако `<providerId>` не е
`agentrouter`, обединете конфигурацията около нативния доставчик: насочете комбинациите към
`agentrouter/<model>` (providerId `agentrouter`) и изтрийте дублиращите се
съвместими доставчици. Нативният доставчик не се нуждае от конфигурация на мрежовия профил, нито от
`customUserAgent`.

---

## Вижте също

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Бележки за интеграцията с доставчика Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Каталог на доставчиците
  с безплатен план
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Реализация на предаването на изображения
