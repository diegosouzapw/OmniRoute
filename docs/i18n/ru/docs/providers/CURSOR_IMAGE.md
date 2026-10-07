# Cursor Image Generation (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute предоставляет **генерацию изображений** по тарифу Cursor через `POST /v1/images/generations`, используя тот же идентификатор провайдера, что и для чата: `cursor` (псевдоним `cu`).

| Поле                            | Значение                                                                                         |
| ------------------------------- | ------------------------------------------------------------------------------------------------ |
| Идентификатор `IMAGE_PROVIDERS` | `cursor`                                                                                         |
| Формат                          | `cursor-agent-image`                                                                             |
| Аутентификация                  | То же подключение OAuth / API-ключа, что и для чата (`provider_connections.provider = "cursor"`) |
| Модели                          | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                        |

## Почему используется Agent CLI

Чат Cursor в OmniRoute использует `agent.v1.AgentService/Run` (protobuf). Этот путь **отклоняет** встроенные клиентские инструменты (shell, write, …). Генерация изображений — это нативный инструмент Cursor, выполняемый **CLI `agent`** с использованием пользовательской лицензии. Поэтому обработчик изображений запускает `agent` с фиксированным промптом и временным рабочим пространством для каждого запроса (по аналогии с общедоступными мостами для пользовательских лицензий), а затем возвращает совместимый с OpenAI результат `b64_json`.

## Ограничение доступа (жёсткие правила №15 и №17)

Это единственный формат `IMAGE_PROVIDERS`, который запускает дочерний процесс (бинарный
файл `agent`). Поскольку `POST /v1/images/generations` совместно используется примерно 40 другими
провайдерами изображений, не запускающими процессы и правомерно используемыми удалёнными клиентами,
весь маршрут **не** классифицируется как `LOCAL_ONLY` — вместо этого `handleCursorAgentImageGeneration`
применяет собственную проверку на основе доверенного результата `AUTHZ_HEADER_PEER_LOCALITY`, который
конвейер авторизации добавляет к каждому запросу (на основе реального TCP-узла, а не подделываемого
заголовка `Host`): только клиенты из `loopback` и `lan` могут инициировать запуск; все остальные
(включая использование утёкшего API-ключа через публичный туннель) получают `403` до выполнения
какого-либо поиска учётных данных или запуска процесса. Аналогичная политика, применяемая к
остальной части уровня `LOCAL_ONLY`, находится в `src/server/authz/policies/management.ts`.

## Ограничитель параллелизма действует на уровне модуля (ограничение одного экземпляра)

`CURSOR_IMG_MAX_CONCURRENT` контролируется счётчиком/очередью в памяти, область действия которых
ограничена экземпляром модуля Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Он корректно ограничивает количество параллельных запусков `agent` в рамках одного процесса OmniRoute,
но **не** координирует несколько процессов/экземпляров, совместно использующих одну пользовательскую
лицензию Cursor (например, при развёртывании с несколькими репликами) — каждый экземпляр применяет
собственное независимое ограничение. Для развёртывания с одним экземпляром (вариант по умолчанию)
ограничение соблюдается точно; в горизонтально масштабируемых развёртываниях следует задавать
консервативное значение `CURSOR_IMG_MAX_CONCURRENT` для каждого экземпляра либо направлять трафик
генерации изображений Cursor на один экземпляр.

## Требования

1. Подключённая в панели управления учётная запись Cursor (OAuth или API-ключ `crsr_…`).
2. Бинарный файл Cursor Agent, доступный процессу OmniRoute:
   - переменная окружения `CURSOR_AGENT_BIN=/path/to/agent`, или
   - `~/.local/bin/agent`, или
   - `providerSpecificData.agentBin` в подключении Cursor.

Необязательные настройки:

| Переменная окружения        | По умолчанию                 | Назначение                                                    |
| --------------------------- | ---------------------------- | ------------------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                     | Максимальное время выполнения для одного изображения          |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                          | Ограничитель параллелизма для общей пользовательской лицензии |
| `CURSOR_IMG_MODEL`          | (модель из запроса / `auto`) | Переопределение параметра CLI `--model`                       |

## Пример

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Генерация обычно занимает 1–2 минуты. Предпочтительно использовать внутренний сетевой маршрут; пограничные прокси с тайм-аутом около 100 секунд завершат запрос с ошибкой.

## LiteLLM

Зарегистрируйте модель генерации изображений с параметрами `mode: image_generation`, `api_base: http://omniroute:20128/v1` и `model: openai/cursor/auto` (либо просто `cursor/auto`, в зависимости от версии LiteLLM).
