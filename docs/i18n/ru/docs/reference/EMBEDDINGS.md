# Embeddings client runbook (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Примечания для операторов по `POST /v1/embeddings`, когда OmniRoute находится перед
Hindsight 0.9.1 (только текстовый `encode(list[str])`) и Memorix 1.6.0 (шлюз
для медиа Jina). Проверено в рабочей среде 2026-08-17 с OmniRoute 3.8.49 по адресу
`https://omniroute.jaguar-fish.ts.net/v1`. Секретные данные ниже отсутствуют.

## Рабочие идентификаторы моделей

| Идентификатор клиента                          | HTTP | Векторы     | Размерность | Примечания                                                       |
| ---------------------------------------------- | ---- | ----------- | ----------- | ---------------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | пакет 2 → 2 | 3072        | Работает без нативного ключа Gemini                              |
| `openrouter/google/gemini-embedding-2-preview` | 200  | пакет 2 → 2 | 3072        | То же векторное пространство, что и у идентификатора без preview |
| `openrouter/google/gemini-embedding-001`       | 200  | пакет 2 → 2 | 3072        | Указан в `GET /v1/embeddings`                                    |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | пакет 2 → 2 | 1024        | Канонический omni-идентификатор Jina                             |
| `jina/jina-embeddings-v5-omni-small`           | 200  | пакет 2 → 2 | 1024        | Псевдоним; поле `model` в ответе содержит `jina-ai/...`          |
| `jina-embeddings-v5-omni-small`                | 200  | пакет 2 → 2 | 1024        | Идентификатор без префикса также разрешается                     |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768**     | Векторное пространство отличается от small                       |

`GET /v1/models` и `GET /v1/embeddings` содержали
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) и
`openrouter/google/gemini-embedding-001`. Они **не** содержали
`openrouter/google/gemini-embedding-2`, хотя этот идентификатор уже обслуживает запросы.

Не смешивайте nano (768 измерений) и small (1024 измерения) в одном индексе. Они
несопоставимы.

## Неработающие / вводящие в заблуждение идентификаторы

### Нативная Gemini Embedding 2

Запрос:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Фактический результат (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` возвращает тот же ответ 400. `google/gemini-embedding-2`
возвращает HTTP **400** `Unknown embedding provider: google`, если только
пользовательский узел провайдера не использует префикс `google`.

Ожидаемое поведение: либо нативное построение эмбеддингов Gemini с ключом Google AI Studio у
провайдера `gemini`, либо ответ 400 с указанием рабочего идентификатора OpenRouter.

Воспроизведение (скройте bearer-токен):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Рабочая замена:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Нативная `gemini-embedding-2` не может заработать только за счёт GitOps. Ключ Google AI
Studio необходимо добавить как подключение к провайдеру `gemini` (через панель управления или
путём импорта `GEMINI_API_KEY` в OmniRoute). Этого секрета нет в данном репозитории.

### Мультимодальный маршрут Jina

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

Используйте `POST /v1/embeddings`, пока не появится псевдоним.

### Объект изображения Jina / Memorix

Канонический элемент изображения OmniRoute (PNG 28×28, 784 пикселя — Jina отклоняет 1×1):

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

Фактический результат: HTTP **200**, 1 вектор, 1024 измерения.

Нативный формат Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Фактический результат: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Смешение `{ "text": "..." }` с `{ "image": "data:..." }` приводит к тому же ответу 400.

## Примечания для клиентов

### Hindsight 0.9.1

Эмбеддинги Hindsight поддерживают только текст (`encode(list[str])`). Он не отправляет
объекты изображений. Укажите для базового URL OpenAI-совместимых эмбеддингов Hindsight
адрес OmniRoute `/v1` и используйте рабочий идентификатор из таблицы выше
(`jina-ai/jina-embeddings-v5-omni-small` или
`openrouter/google/gemini-embedding-2`). Не задавайте в качестве модели идентификатор без префикса
`gemini-embedding-2`, если на шлюзе отсутствует API-ключ `gemini`.

### Memorix 1.6.0

Memorix считает медиа нативными только в том случае, если `baseUrl` соответствует
`/jina\.ai/i`. URL OmniRoute остаётся на маршруте, поддерживающем только текст, даже если модель
является Jina omni. Это ограничение шлюза клиента Memorix. Независимо от этого OmniRoute
по-прежнему отклоняет тело Jina `{image: "data:..."}`, которое отправил бы Memorix при
срабатывании шлюза, поэтому Jina-совместимые клиенты не могут создавать эмбеддинги изображений
через OmniRoute без канонической схемы `{type,source}`.

Используйте `jina-ai/jina-embeddings-v5-omni-small` для текста. Не направляйте `base_url`
Memorix на `https://api.jina.ai` — OmniRoute должен оставаться единственным промежуточным узлом.
