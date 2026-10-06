# AgentRouter Setup Guide (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇧🇦 [bs](../../../bs/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) — это совместимый с Anthropic ретранслятор, который перепродаёт доступ к
Claude и другим моделям, зачастую по более низким ценам, чем прямой API Anthropic. Он
предназначен для использования в качестве полноценной замены `ANTHROPIC_BASE_URL` для официального клиента Claude Code,
поэтому принимает только трафик, соответствующий сетевому формату Claude Code (определённый
User-Agent, флаги `anthropic-beta`, заголовки Stainless SDK и т. д.).

## Быстрый старт — используйте встроенный провайдер `agentrouter` (рекомендуется)

Для большинства пользователей **никакая специальная настройка не требуется**. OmniRoute поставляется со встроенным
провайдером `agentrouter`, в котором уже полностью реализован сетевой формат Claude Code (см.
`open-sse/config/providerRegistry.ts` → `agentrouter`). Чтобы использовать его:

1. Откройте **Панель управления → Провайдеры → Добавить провайдера**.
2. Выберите **AgentRouter** из списка.
3. Вставьте свой API-ключ `sk-...` и сохраните.

Готово — переменные окружения и пользовательский тип провайдера не требуются. Встроенные модели
включают `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` и
`deepseek-v3.2`.

Остальная часть этого руководства посвящена **расширенному варианту**: использованию типа провайдера
`anthropic-compatible-cc-*`. Используйте его, когда вам требуется больше контроля
над сетевым форматом — например, при подключении к другим ретрансляторам в стиле AgentRouter,
которые ещё не добавлены во встроенный реестр провайдеров, или при переопределении
базового URL, пути чата или набора заголовков.

---

## Расширенная настройка: подключение через тип провайдера, совместимый с Claude Code

OmniRoute также поддерживает AgentRouter (и аналогичные ретрансляторы) через тип провайдера,
**совместимый с Claude Code** (`anthropic-compatible-cc-*`), который использует
Anthropic Messages API с правильным сетевым форматом. Универсальный провайдер
`openai-compatible-chat`, направленный на `https://agentrouter.org`,
**не** будет работать — вышестоящий WAF отклоняет запросы, которые не похожи на запросы Claude
Code.

---

## Предварительные требования

- Учётная запись AgentRouter и API-ключ. Новые пользователи получают бесплатные кредиты по партнёрской
  ссылке в файле [README](../README.md).
- Запущенный OmniRoute с включённым флагом функции `ENABLE_CC_COMPATIBLE_PROVIDER`
  (см. ниже).

## 1. Включите тип провайдера, совместимый с CC

Тип провайдера, совместимый с Claude Code, защищён флагом функции, поскольку он
отправляет трафик, максимально похожий на трафик официального клиента Claude Code. Включите его,
задав переменную окружения перед запуском OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Пример для Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

После перезапуска на панели управления появится пункт **Добавить совместимый с Claude Code**
в дополнение к существующим вариантам, совместимым с OpenAI и Anthropic.

## 2. Создайте провайдера на панели управления

1. Откройте **Панель управления → Провайдеры → Добавить провайдера**.
2. Выберите **Добавить совместимый с Claude Code** (отображается только при включённом указанном выше флаге).
3. Заполните поля:

| Поле        | Значение                                                               |
| ----------- | ---------------------------------------------------------------------- |
| Имя         | `AgentRouter` (или любая другая метка)                                 |
| Префикс     | `agentrouter` (удобный псевдоним, отображаемый в журналах и на панели) |
| Базовый URL | `https://agentrouter.org`                                              |
| Путь чата   | `/v1/messages?beta=true` (по умолчанию — оставьте без изменений)       |

> Канонический идентификатор модели по-прежнему использует полный идентификатор узла провайдера
> (`anthropic-compatible-cc-{uuid}/{model}`). **Префикс** — это всего лишь отображаемый
> псевдоним, который разрешается файлом `src/lib/usage/callLogs.ts` для более удобного вывода в журналах.

4. (Необязательно) Вставьте свой API-ключ в поле **Проверка** и нажмите **Проверить**, чтобы
   подтвердить возможность подключения перед сохранением.
5. Нажмите **Добавить**.

После создания откройте провайдера и добавьте **Подключение** с вашим API-ключом AgentRouter
(`sk-...`). Значение `test_status` подключения должно измениться на `active`.

## 3. Использование через комбинацию или напрямую

Укажите модель, используя префикс вашего провайдера в качестве пространства имён:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Канонический идентификатор модели `anthropic-compatible-cc-{uuid}/claude-opus-4-6` также работает
и отображается в базе данных и конфигурации комбинации.

Кроме того, его можно добавить в комбинацию для маршрутизации, переключения на резервный вариант и управления квотами, как и любого другого
провайдера.

---

## Сведения о сетевом образе

Для справки: cc-совместимый мост отправляет следующие данные с каждым запросом
к вышестоящему сервису (см. `open-sse/services/claudeCodeCompatible.ts`):

| Заголовок                                                             | Значение                                                                                                                     |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                                       | `Bearer <api-key>`                                                                                                           |
| `User-Agent`                                                          | `claude-cli/2.1.258 (external, sdk-cli)`                                                                                     |
| `anthropic-version`                                                   | `2023-06-01`                                                                                                                 |
| `anthropic-beta`                                                      | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                                     |
| Переключатель бета-функции redact-thinking для отдельного подключения | Добавляет `redact-thinking-2026-02-12` для вышестоящих сервисов, которым явно требуются потоки рассуждений с редактированием |
| Переключатель суммаризованных рассуждений для отдельного подключения  | Добавляет `display: "summarized"` в CC Compatible-запросы рассуждений, если режим отображения ещё не задан                   |
| `anthropic-dangerous-direct-browser-access`                           | `true`                                                                                                                       |
| `x-app`                                                               | `cli`                                                                                                                        |
| `X-Stainless-*`                                                       | Различные заголовки SDK Stainless (язык, версия пакета, ОС, архитектура и т. д.)                                             |

Именно это позволяет запросам проходить через WAF / белый список клиентов вышестоящего сервиса.

---

## Устранение неполадок

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Ваш запрос не
соответствует сетевому образу Claude Code. Это происходит, когда провайдер настроен
как `openai-compatible-chat` вместо `anthropic-compatible-cc` или когда
флаг `ENABLE_CC_COMPATIBLE_PROVIDER=true` не был задан при запуске.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
«Недействительный токен». Сетевой образ корректен, но API-ключ отклонён. Создайте
новый ключ в панели управления AgentRouter и обновите подключение.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Механизм модерации AgentRouter отклонил содержимое запроса либо
тариф ключа не разрешает использовать запрошенную модель. Попробуйте другой промпт или модель;
если безобидный промпт блокируется постоянно, обратитесь в службу поддержки AgentRouter.

**`[400]: content-blocked` только для определённых моделей** — Большинство тарифов AgentRouter разрешают
использовать только подмножество моделей (например, `claude-opus-4-6`). Другие идентификаторы моделей возвращают
`unauthorized_client_error`, даже если ключ действителен. Проверьте в панели управления AgentRouter,
какие модели входят в ваш тариф.

**`Invalid JSON response from provider (reset after Ns)` в журналах omniroute** —
Вышестоящий сервис вернул тело ответа не в формате JSON (обычно HTML-страницу ошибки от WAF).
Как правило, это означает, что запрос так и не достиг серверной части AgentRouter — ещё раз проверьте, что
идентификатор провайдера начинается с `anthropic-compatible-cc-` (обратите внимание на завершающий дефис —
см. `CLAUDE_CODE_COMPATIBLE_PREFIX` в `open-sse/services/claudeCodeCompatible.ts`)
и что флаг функции включён.

**`unauthorized client detected` / HTML-страница ошибки, хотя провайдер AgentRouter
уже существует** — вероятно, у вас имеется **несколько** провайдеров AgentRouter,
и запрос попадает не к тому из них. Если ранее вручную был создан провайдер
`anthropic-compatible-*` (без `cc`) или `openai-compatible-chat-*` с префиксом
`agentrouter`, он может владеть идентификаторами моделей `agentrouter/<model>`
(а комбинации могут ссылаться на него по идентификатору узла), поэтому трафик направляется к этому провайдеру —
который отправляет стандартный User-Agent и получает отказ — вместо встроенного
провайдера `agentrouter`, уже использующего правильный сетевой образ. Проверьте, во что фактически
преобразуется модель, в журналах omniroute (тег `ROUTING` показывает
`agentrouter/<model> → <providerId>/<model>`); если `<providerId>` не равен
`agentrouter`, перейдите на использование нативного провайдера: укажите в комбинациях
`agentrouter/<model>` (providerId `agentrouter`) и удалите дублирующиеся
совместимые провайдеры. Нативному провайдеру не требуется конфигурация сетевого образа или
`customUserAgent`.

---

## См. также

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — примечания по интеграции провайдера Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — каталог провайдеров
  с бесплатным уровнем
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — реализация передачи изображений
