# Embeddings client runbook (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Напомене за оператере за `POST /v1/embeddings` када се OmniRoute налази испред
Hindsight 0.9.1 (само текстуални `encode(list[str])`) и Memorix 1.6.0 (Jina
контрола медија). Проверено уживо 2026-08-17 на OmniRoute 3.8.49, на адреси
`https://omniroute.jaguar-fish.ts.net/v1`. У наставку нема тајни.

## Функционални ID-ови модела

| ID клијента                                    | HTTP | Вектори     | Димензија | Напомене                                    |
| ---------------------------------------------- | ---- | ----------- | --------- | ------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | пакет 2 → 2 | 3072      | Ради без изворног Gemini кључа              |
| `openrouter/google/gemini-embedding-2-preview` | 200  | пакет 2 → 2 | 3072      | Исти простор као ID који није preview       |
| `openrouter/google/gemini-embedding-001`       | 200  | пакет 2 → 2 | 3072      | Наведен у `GET /v1/embeddings`              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | пакет 2 → 2 | 1024      | Канонски Jina omni ID                       |
| `jina/jina-embeddings-v5-omni-small`           | 200  | пакет 2 → 2 | 1024      | Алијас; `model` у одговору је `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | пакет 2 → 2 | 1024      | Разрешава се и голи ID                      |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768**   | Векторски простор различит од small         |

`GET /v1/models` и `GET /v1/embeddings` наводе
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) и
`openrouter/google/gemini-embedding-001`. Они **не** наводе
`openrouter/google/gemini-embedding-2`, иако тај ID већ опслужује захтеве.

Немојте мешати nano (768-d) и small (1024-d) у истом индексу. Они нису
упоредиви.

## Неисправни / обмањујући ID-ови

### Изворни Gemini Embedding 2

Захтев:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Стварни резултат (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` враћа исти 400. `google/gemini-embedding-2`
враћа HTTP **400** `Unknown embedding provider: google`, осим ако прилагођени
чвор добављача не користи префикс `google`.

Очекивано: или изворни Gemini embed са Google AI Studio кључем код
`gemini` добављача, или 400 који наводи функционални OpenRouter ID.

Репродукција (редигујте bearer токен):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Функционална замена:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Изворни `gemini-embedding-2` не може да ради само путем GitOps-а. Google AI
Studio кључ мора да се дода као веза са `gemini` добављачем (контролна табла или
`GEMINI_API_KEY` увезен у OmniRoute). Та тајна се не налази у овом репозиторијуму.

### Jina мултимодална путања

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

Користите `POST /v1/embeddings` док се не уведе алијас.

### Jina / Memorix објекат слике

OmniRoute канонска ставка слике (PNG од 28×28, 784 пиксела — Jina одбија 1×1):

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

Стварни резултат: HTTP **200**, 1 вектор, 1024-d.

Изворни формат за Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Стварни резултат: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Комбинација `{ "text": "..." }` са `{ "image": "data:..." }` враћа исти 400.

## Напомене за клијенте

### Hindsight 0.9.1

Hindsight embeddings су само текстуални (`encode(list[str])`). Он не шаље
објекте слика. Усмерите основни URL за embeddings, компатибилан са OpenAI-јем,
на OmniRoute `/v1` и користите функционални ID из горње табеле
(`jina-ai/jina-embeddings-v5-omni-small` или
`openrouter/google/gemini-embedding-2`). Немојте подешавати модел на голи
`gemini-embedding-2`, осим ако на мрежном пролазу постоји `gemini` API кључ.

### Memorix 1.6.0

Memorix третира само `baseUrl` који одговара изразу `/jina\.ai/i` као изворни
медијски режим. OmniRoute URL остаје на путањи само за текст, чак и када је модел
Jina omni. Та контрола представља проблем у Memorix клијенту. Независно од тога,
OmniRoute и даље одбија Jina тело `{image: "data:..."}` које би Memorix послао
када би контрола пропустила захтев, па клијенти компатибилни са Jina-ом не могу
да уграђују слике путем OmniRoute-а без канонске шеме `{type,source}`.

За текст користите `jina-ai/jina-embeddings-v5-omni-small`. Немојте усмеравати
Memorix `base_url` на `https://api.jina.ai` — задржите OmniRoute као једини
посредни корак.
