# Cursor Image Generation (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute предоставя **генериране на изображения** чрез плана Cursor на `POST /v1/images/generations`, използвайки същия идентификатор на доставчик като при чата: `cursor` (псевдоним `cu`).

| Поле                              | Стойност                                                                                             |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Идентификатор в `IMAGE_PROVIDERS` | `cursor`                                                                                             |
| Формат                            | `cursor-agent-image`                                                                                 |
| Удостоверяване                    | Същата OAuth връзка или връзка с API ключ като при чата (`provider_connections.provider = "cursor"`) |
| Модели                            | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                            |

## Защо се използва Agent CLI

Чатът на Cursor в OmniRoute използва `agent.v1.AgentService/Run` (protobuf). Този път **отхвърля** вградените клиентски инструменти (обвивка, записване, …). Генерирането на изображения е собствен инструмент на Cursor, изпълняван от **`agent` CLI** спрямо потребителското място. Затова обработчикът за изображения стартира `agent` със заключена подкана и временна работна директория за всяка заявка (по същия модел като общностните мостове за потребителски места), след което връща съвместим с OpenAI `b64_json`.

## Ограничение на достъпа (Строги правила №15 + №17)

Това е единственият формат в `IMAGE_PROVIDERS`, който стартира дъщерен процес (двоичния файл
`agent`). Тъй като `POST /v1/images/generations` се споделя от около 40 други доставчици
на изображения, които не стартират процеси и които отдалечени клиенти правомерно използват,
целият маршрут **не** е класифициран като `LOCAL_ONLY` — вместо това
`handleCursorAgentImageGeneration` прилага собствена проверка чрез доверената оценка
`AUTHZ_HEADER_PEER_LOCALITY`, която конвейерът за оторизация поставя върху всяка заявка
(въз основа на реалния TCP партньор, а не на подлежащата на подправяне заглавка `Host`):
само клиенти от `loopback` и `lan` могат да достигнат до стартирането на процеса; всички
останали (включително изтекъл API ключ, използван повторно през публичен тунел) получават
`403`, преди да се извърши каквото и да е търсене на идентификационни данни или
стартиране на процес. Вижте `src/server/authz/policies/management.ts` за същата
политика, приложена към останалата част от нивото `LOCAL_ONLY`.

## Ограничението за паралелност е на ниво модул (ограничение при единична инстанция)

`CURSOR_IMG_MAX_CONCURRENT` се прилага чрез брояч/опашка в паметта, ограничени до
инстанцията на Node модула (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
То правилно ограничава едновременните стартирания на `agent` в рамките на един процес
на OmniRoute, но **не** координира множество процеси/инстанции, които споделят едно и
също потребителско място в Cursor (например внедряване с множество реплики) — всяка
инстанция прилага собствено независимо ограничение. При внедряване с една инстанция
(по подразбиране) ограничението е точно; хоризонтално мащабираните внедрявания трябва
да зададат консервативна стойност на `CURSOR_IMG_MAX_CONCURRENT` за всяка инстанция или
да насочат трафика за изображения на Cursor към една инстанция.

## Изисквания

1. Свързан акаунт в Cursor в таблото за управление (OAuth или API ключ `crsr_…`).
2. Двоичният файл Cursor Agent да е достъпен за процеса на OmniRoute:
   - чрез променливата на средата `CURSOR_AGENT_BIN=/path/to/agent`, или
   - в `~/.local/bin/agent`, или
   - чрез `providerSpecificData.agentBin` във връзката с Cursor.

Незадължителни настройки:

| Променлива на средата       | По подразбиране                | Значение                                                        |
| --------------------------- | ------------------------------ | --------------------------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                       | Максимално време за генериране на изображение                   |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                            | Ограничение на паралелността за споделеното потребителско място |
| `CURSOR_IMG_MODEL`          | (моделът от заявката / `auto`) | Замяна на CLI параметъра `--model`                              |

## Пример

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Генерирането обикновено отнема 1–2 минути. За предпочитане е да използвате вътрешен мрежов път; гранични проксита с време на изчакване около 100 секунди ще доведат до неуспех.

## LiteLLM

Регистрирайте модел за изображения с `mode: image_generation`, `api_base: http://omniroute:20128/v1` и `model: openai/cursor/auto` (или само `cursor/auto` в зависимост от версията на LiteLLM).
