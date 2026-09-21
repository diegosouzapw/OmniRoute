# Cursor Image Generation (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute надає доступ до **генерації зображень** за планом Cursor через `POST /v1/images/generations`, використовуючи той самий ідентифікатор провайдера, що й для чату: `cursor` (псевдонім `cu`).

| Поле                            | Значення                                                                                                      |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Ідентифікатор `IMAGE_PROVIDERS` | `cursor`                                                                                                      |
| Формат                          | `cursor-agent-image`                                                                                          |
| Автентифікація                  | Те саме OAuth-з’єднання / з’єднання за API-ключем, що й для чату (`provider_connections.provider = "cursor"`) |
| Моделі                          | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                                     |

## Чому Agent CLI

Чат Cursor в OmniRoute використовує `agent.v1.AgentService/Run` (protobuf). Цей шлях **відхиляє** вбудовані клієнтські інструменти (оболонку, запис тощо). Генерація зображень — це нативний інструмент Cursor, який виконується **`agent` CLI** для робочого місця. Тому обробник зображень запускає `agent` із фіксованим запитом і тимчасовим робочим простором для кожного запиту (за тією самою схемою, що й спільнотні мости робочих місць), а потім повертає сумісний з OpenAI `b64_json`.

## Обмеження доступу (жорсткі правила №15 і №17)

Це єдиний формат `IMAGE_PROVIDERS`, який запускає дочірній процес (бінарний файл
`agent`). Оскільки `POST /v1/images/generations` спільно використовується приблизно 40 іншими провайдерами
зображень, які не запускають процеси та якими правомірно користуються віддалені клієнти, весь маршрут **не**
класифікується як `LOCAL_ONLY` — натомість `handleCursorAgentImageGeneration` застосовує власну
перевірку, використовуючи довірений вердикт `AUTHZ_HEADER_PEER_LOCALITY`, яким конвеєр авторизації позначає
кожен запит (на основі реального TCP-вузла, а не заголовка `Host`, який можна підробити): лише
клієнти з `loopback` і `lan` можуть ініціювати запуск; усі інші (включно з випадком, коли викрадений
API-ключ повторно використовується через публічний тунель) отримують `403` до будь-якого пошуку облікових даних або
запуску процесу. Див. `src/server/authz/policies/management.ts`, де та сама
політика застосовується до решти рівня `LOCAL_ONLY`.

## Шлюз паралельності діє на рівні модуля (обмеження одного екземпляра)

`CURSOR_IMG_MAX_CONCURRENT` контролюється лічильником/чергою в пам’яті, область дії яких обмежена
екземпляром модуля Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
Це коректно обмежує кількість одночасних запусків `agent` у межах одного процесу OmniRoute, але
**не** забезпечує координацію між кількома процесами/екземплярами, які спільно використовують те саме робоче місце Cursor
(наприклад, у розгортанні з кількома репліками) — кожен екземпляр застосовує власне незалежне обмеження.
Для розгортання з одним екземпляром (типове налаштування) це обмеження є точним; у горизонтально масштабованих
розгортаннях слід установлювати консервативне значення `CURSOR_IMG_MAX_CONCURRENT` для кожного екземпляра або спрямовувати
трафік генерації зображень Cursor до одного екземпляра.

## Вимоги

1. Підключений обліковий запис Cursor у панелі керування (OAuth або API-ключ `crsr_…`).
2. Бінарний файл Cursor Agent, доступний процесу OmniRoute:
   - змінна середовища `CURSOR_AGENT_BIN=/path/to/agent`, або
   - `~/.local/bin/agent`, або
   - `providerSpecificData.agentBin` у з’єднанні Cursor.

Необов’язкове налаштування:

| Змінна середовища           | Типове значення             | Призначення                                      |
| --------------------------- | --------------------------- | ------------------------------------------------ |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                    | Максимальний час виконання для одного зображення |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                         | Шлюз паралельності для спільного робочого місця  |
| `CURSOR_IMG_MODEL`          | (модель із запиту / `auto`) | Перевизначення параметра CLI `--model`           |

## Приклад

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Генерація зазвичай триває 1–2 хвилини. Надавайте перевагу маршруту через внутрішню мережу; периферійні проксі з тайм-аутом близько 100 с завершуватимуться помилкою.

## LiteLLM

Зареєструйте модель зображень із `mode: image_generation`, `api_base: http://omniroute:20128/v1` і `model: openai/cursor/auto` (або просто `cursor/auto`, залежно від вашої версії LiteLLM).
