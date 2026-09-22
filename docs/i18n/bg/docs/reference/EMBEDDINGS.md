# Embeddings client runbook (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Бележки за оператори относно `POST /v1/embeddings`, когато OmniRoute стои пред
Hindsight 0.9.1 (само текстов `encode(list[str])`) и Memorix 1.6.0 (Jina шлюз
за медия). Проверено в реална среда на 2026-08-17 с OmniRoute 3.8.49 на
`https://omniroute.jaguar-fish.ts.net/v1`. По-долу няма тайни данни.

## Работещи идентификатори на модели

| Идентификатор на клиента                       | HTTP | Вектори       | Размерност | Бележки                                                      |
| ---------------------------------------------- | ---- | ------------- | ---------- | ------------------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | партида 2 → 2 | 3072       | Работи без собствен Gemini ключ                              |
| `openrouter/google/gemini-embedding-2-preview` | 200  | партида 2 → 2 | 3072       | Същото векторно пространство като идентификатора без preview |
| `openrouter/google/gemini-embedding-001`       | 200  | партида 2 → 2 | 3072       | Посочен в `GET /v1/embeddings`                               |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | партида 2 → 2 | 1024       | Каноничен Jina omni идентификатор                            |
| `jina/jina-embeddings-v5-omni-small`           | 200  | партида 2 → 2 | 1024       | Псевдоним; `model` в отговора е `jina-ai/...`                |
| `jina-embeddings-v5-omni-small`                | 200  | партида 2 → 2 | 1024       | Идентификаторът без префикс също се разпознава               |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1         | **768**    | Различно векторно пространство от small                      |

`GET /v1/models` и `GET /v1/embeddings` посочиха
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) и
`openrouter/google/gemini-embedding-001`. Те **не** посочиха
`openrouter/google/gemini-embedding-2`, въпреки че този идентификатор вече обслужва заявки.

Не смесвайте nano (768-измерен) и small (1024-измерен) в един индекс. Те не са
съпоставими.

## Неработещи / подвеждащи идентификатори

### Собствен Gemini Embedding 2

Заявка:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Действителен резултат (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` връща същия отговор 400. `google/gemini-embedding-2`
връща HTTP **400** `Unknown embedding provider: google`, освен ако персонализиран
възел на доставчик не използва префикса `google`.

Очакван резултат: или собствено Gemini векторно представяне с ключ от Google AI Studio за
доставчика `gemini`, или отговор 400, който посочва работещия OpenRouter идентификатор.

Възпроизвеждане (заличете bearer токена):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Работещ заместител:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Собственият `gemini-embedding-2` не може да заработи само чрез GitOps. Трябва да бъде
добавен ключ от Google AI Studio като връзка към доставчика `gemini` (чрез таблото за управление или
чрез импортиране на `GEMINI_API_KEY` в OmniRoute). Тази тайна не е в това хранилище.

### Jina мултимодален маршрут

`POST /v1/multimodal-embeddings` → HTTP **404**

```json
{
  "error": {
    "message": "Unknown API route: /v1/multimodal-embeddings",
    "type": "not_found",
    "code": "unknown_route",
    "path": "/v1/multimodal-embeddings"
  }
}
```

Използвайте `POST /v1/embeddings`, докато не бъде добавен псевдоним.

### Обект за изображение на Jina / Memorix

Каноничен елемент за изображение на OmniRoute (28×28 PNG, 784 пиксела — Jina отхвърля 1×1):

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [
    {
      "type": "image",
      "source": {
        "type": "base64",
        "data": "<base64-png>",
        "media_type": "image/png"
      }
    }
  ]
}
```

Действителен резултат: HTTP **200**, 1 вектор, 1024-измерен.

Собствен формат на Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Действителен резултат: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Смесването на `{ "text": "..." }` с `{ "image": "data:..." }` води до същия отговор 400.

## Бележки за клиентите

### Hindsight 0.9.1

Векторните представяния на Hindsight са само за текст (`encode(list[str])`). Той не изпраща
обекти за изображения. Насочете основния URL адрес на съвместимите с OpenAI векторни представяния на Hindsight към
OmniRoute `/v1` и използвайте работещ идентификатор от таблицата по-горе
(`jina-ai/jina-embeddings-v5-omni-small` или
`openrouter/google/gemini-embedding-2`). Не задавайте като модел само
`gemini-embedding-2`, освен ако в шлюза няма API ключ за `gemini`.

### Memorix 1.6.0

Memorix третира само `baseUrl`, съответстващ на `/jina\.ai/i`, като собствена медия. URL адрес
на OmniRoute остава в маршрута само за текст дори когато моделът е Jina omni.
Този шлюз е проблем на клиента Memorix. Независимо от това OmniRoute продължава да отхвърля
тялото на Jina във формат `{image: "data:..."}`, което Memorix би изпратил, ако шлюзът
се отвори, така че съвместими с Jina клиенти не могат да вграждат изображения чрез OmniRoute
без каноничната схема `{type,source}`.

Използвайте `jina-ai/jina-embeddings-v5-omni-small` за текст. Не насочвайте
`base_url` на Memorix към `https://api.jina.ai` — запазете OmniRoute като единствен междинен възел.
