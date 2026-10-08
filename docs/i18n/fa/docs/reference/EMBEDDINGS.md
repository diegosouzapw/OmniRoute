# Embeddings client runbook (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

یادداشتهای اپراتوری برای `POST /v1/embeddings` هنگامی که OmniRoute در جلوی
Hindsight 0.9.1 (متد متنی `encode(list[str])`) و Memorix 1.6.0 (دروازهٔ رسانهای Jina)
قرار دارد. در تاریخ 2026-08-17 بهصورت زنده با OmniRoute 3.8.49 در
`https://omniroute.jaguar-fish.ts.net/v1` راستیآزمایی شده است. هیچ اطلاعات محرمانهای در ادامه وجود ندارد.

## شناسههای مدلِ فعال

| شناسهٔ کلاینت                                  | HTTP | بردارها     | بُعد    | یادداشتها                                           |
| ---------------------------------------------- | ---- | ----------- | ------- | --------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | دستهٔ 2 → 2 | 3072    | بدون کلید بومی Gemini کار میکند                     |
| `openrouter/google/gemini-embedding-2-preview` | 200  | دستهٔ 2 → 2 | 3072    | فضای برداری آن با شناسهٔ غیرپیشنمایش یکسان است      |
| `openrouter/google/gemini-embedding-001`       | 200  | دستهٔ 2 → 2 | 3072    | در `GET /v1/embeddings` فهرست شده است               |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | دستهٔ 2 → 2 | 1024    | شناسهٔ متعارف Jina omni                             |
| `jina/jina-embeddings-v5-omni-small`           | 200  | دستهٔ 2 → 2 | 1024    | نام مستعار؛ مقدار `model` در پاسخ `jina-ai/...` است |
| `jina-embeddings-v5-omni-small`                | 200  | دستهٔ 2 → 2 | 1024    | شناسهٔ بدون پیشوند نیز تفکیک میشود                  |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | فضای برداری متفاوتی نسبت به small دارد              |

`GET /v1/models` و `GET /v1/embeddings`،
`jina-ai/jina-embeddings-v5-omni-small` (1024) و
`jina-ai/jina-embeddings-v5-omni-nano` (768) و
`openrouter/google/gemini-embedding-001` را فهرست کردند. آنها
`openrouter/google/gemini-embedding-2` را فهرست **نکردند**، با اینکه این شناسه هماکنون پاسخگو است.

nano با بُعد 768 و small با بُعد 1024 را در یک ایندکس ترکیب نکنید. آنها
قابلمقایسه نیستند.

## شناسههای خراب / گمراهکننده

### Gemini Embedding 2 بومی

درخواست:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

نتیجهٔ واقعی (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` نیز همان 400 را برمیگرداند. `google/gemini-embedding-2`
نیز HTTP **400** با پیام `Unknown embedding provider: google` برمیگرداند، مگر اینکه یک
گرهٔ ارائهدهندهٔ سفارشی از پیشوند `google` استفاده کند.

انتظار میرود: یا embedding بومی Gemini با یک کلید Google AI Studio روی
ارائهدهندهٔ `gemini` انجام شود، یا خطای 400 شناسهٔ فعال OpenRouter را ذکر کند.

بازتولید (توکن bearer را حذف کنید):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

جایگزین فعال:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` بومی صرفاً از طریق GitOps نمیتواند موفق شود. یک کلید Google AI
Studio باید بهعنوان اتصال ارائهدهندهٔ `gemini` افزوده شود (از طریق داشبورد یا
وارد کردن `GEMINI_API_KEY` به OmniRoute). این اطلاعات محرمانه در این مخزن وجود ندارد.

### مسیر چندوجهی Jina

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

تا زمانی که نام مستعاری ایجاد نشده است، از `POST /v1/embeddings` استفاده کنید.

### شیء تصویر Jina / Memorix

آیتم تصویر متعارف OmniRoute (PNG با ابعاد 28×28، شامل 784 پیکسل — Jina تصاویر 1×1 را رد میکند):

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

نتیجهٔ واقعی: HTTP **200**، 1 بردار، 1024بُعدی.

ساختار بومی Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

نتیجهٔ واقعی: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

ترکیب `{ "text": "..." }` با `{ "image": "data:..." }` نیز همان خطای 400 را ایجاد میکند.

## یادداشتهای کلاینت

### Hindsight 0.9.1

embeddingهای Hindsight فقط متنی هستند (`encode(list[str])`). این کلاینت اشیای
تصویر را ارسال نمیکند. نشانی پایهٔ embeddingهای سازگار با OpenAI در Hindsight را روی
مسیر `/v1` از OmniRoute تنظیم کنید و یکی از شناسههای فعال جدول بالا را به کار ببرید
(`jina-ai/jina-embeddings-v5-omni-small` یا
`openrouter/google/gemini-embedding-2`). مدل را روی
`gemini-embedding-2` بدون پیشوند تنظیم نکنید، مگر اینکه یک کلید API برای `gemini` روی دروازه وجود داشته باشد.

### Memorix 1.6.0

Memorix فقط `baseUrl`هایی را که با `/jina\.ai/i` مطابقت دارند، رسانهٔ بومی در نظر میگیرد. یک
URL متعلق به OmniRoute حتی زمانی که مدل Jina omni باشد، در مسیر فقطمتنی باقی میماند.
این دروازه ناشی از مشکلی در کلاینت Memorix است. مستقل از آن، OmniRoute همچنان بدنهٔ
Jina بهشکل `{image: "data:..."}` را که Memorix در صورت باز شدن دروازه ارسال میکرد، رد میکند؛
بنابراین کلاینتهای سازگار با Jina بدون شِمای متعارف `{type,source}` نمیتوانند تصاویر را از طریق OmniRoute
به embedding تبدیل کنند.

برای متن از `jina-ai/jina-embeddings-v5-omni-small` استفاده کنید. مقدار
`base_url` در Memorix را روی `https://api.jina.ai` تنظیم نکنید — OmniRoute را بهعنوان تنها واسطه نگه دارید.
