# Embeddings client runbook (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Примітки для операторів щодо `POST /v1/embeddings`, коли OmniRoute розташований перед
Hindsight 0.9.1 (лише текстовий `encode(list[str])`) і Memorix 1.6.0 (шлюз медіа
Jina). Перевірено наживо 2026-08-17 з OmniRoute 3.8.49 за адресою
`https://omniroute.jaguar-fish.ts.net/v1`. Нижче немає секретів.

## Робочі ідентифікатори моделей

| Ідентифікатор клієнта                          | HTTP | Вектори     | Розмірність | Примітки                                                |
| ---------------------------------------------- | ---- | ----------- | ----------- | ------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | пакет 2 → 2 | 3072        | Працює без нативного ключа Gemini                       |
| `openrouter/google/gemini-embedding-2-preview` | 200  | пакет 2 → 2 | 3072        | Той самий простір, що й для ідентифікатора без preview  |
| `openrouter/google/gemini-embedding-001`       | 200  | пакет 2 → 2 | 3072        | Відображається в `GET /v1/embeddings`                   |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | пакет 2 → 2 | 1024        | Канонічний omni-ідентифікатор Jina                      |
| `jina/jina-embeddings-v5-omni-small`           | 200  | пакет 2 → 2 | 1024        | Псевдонім; значення `model` у відповіді — `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | пакет 2 → 2 | 1024        | Ідентифікатор без префікса також розпізнається          |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768**     | Векторний простір відрізняється від small               |

`GET /v1/models` і `GET /v1/embeddings` містили
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) і
`openrouter/google/gemini-embedding-001`. Вони **не** містили
`openrouter/google/gemini-embedding-2`, хоча цей ідентифікатор уже обслуговується.

Не змішуйте nano (768-вимірний) і small (1024-вимірний) в одному індексі. Вони
непорівнянні.

## Несправні / оманливі ідентифікатори

### Нативний Gemini Embedding 2

Запит:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Фактичний результат (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` повертає ту саму помилку 400.
`google/gemini-embedding-2` повертає HTTP **400** `Unknown embedding provider: google`,
якщо користувацький вузол провайдера не використовує префікс `google`.

Очікуваний результат: або нативне векторне подання Gemini з ключем Google AI Studio
у провайдері `gemini`, або помилка 400 із зазначенням робочого ідентифікатора
OpenRouter.

Відтворення (приховайте bearer-токен):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Робоча заміна:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Нативний `gemini-embedding-2` не може запрацювати лише через GitOps. Ключ Google AI
Studio потрібно додати як підключення провайдера `gemini` (через панель керування або
імпортувавши `GEMINI_API_KEY` в OmniRoute). Цього секрету немає в цьому репозиторії.

### Мультимодальний шлях Jina

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

Використовуйте `POST /v1/embeddings`, доки не з’явиться псевдонім.

### Об’єкт зображення Jina / Memorix

Канонічний елемент зображення OmniRoute (PNG 28×28, 784 пікселі — Jina відхиляє 1×1):

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

Фактичний результат: HTTP **200**, 1 вектор, 1024-вимірний.

Нативний формат Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Фактичний результат: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

Поєднання `{ "text": "..." }` із `{ "image": "data:..." }` призводить до тієї самої
помилки 400.

## Примітки щодо клієнтів

### Hindsight 0.9.1

Векторні подання Hindsight підтримують лише текст (`encode(list[str])`). Він не
надсилає об’єкти зображень. Укажіть для базової URL-адреси OpenAI-сумісних векторних
подань Hindsight шлях OmniRoute `/v1` і використовуйте робочий ідентифікатор із
таблиці вище (`jina-ai/jina-embeddings-v5-omni-small` або
`openrouter/google/gemini-embedding-2`). Не встановлюйте для моделі ідентифікатор без
префікса `gemini-embedding-2`, якщо на шлюзі немає API-ключа `gemini`.

### Memorix 1.6.0

Memorix обробляє медіа як нативні, лише якщо `baseUrl` відповідає `/jina\.ai/i`.
URL-адреса OmniRoute залишається на шляху лише для тексту, навіть коли моделлю є Jina
omni. Ця перевірка є проблемою клієнта Memorix. Незалежно від цього OmniRoute усе одно
відхиляє тіло Jina `{image: "data:..."}`, яке Memorix надіслав би після проходження
перевірки, тому Jina-сумісні клієнти не можуть створювати векторні подання зображень
через OmniRoute без канонічної схеми `{type,source}`.

Для тексту використовуйте `jina-ai/jina-embeddings-v5-omni-small`. Не спрямовуйте
`base_url` Memorix на `https://api.jina.ai` — залиште OmniRoute єдиним проміжним
вузлом.
