# Embeddings client runbook (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute کے Hindsight 0.9.1 (صرف متن `encode(list[str])`) اور Memorix 1.6.0 (Jina میڈیا گیٹ) کے سامنے موجود ہونے کی صورت میں `POST /v1/embeddings` کے لیے آپریٹر نوٹس۔ 2026-08-17 کو OmniRoute 3.8.49 کے خلاف `https://omniroute.jaguar-fish.ts.net/v1` پر براہِ راست تصدیق شدہ۔ ذیل میں کوئی راز موجود نہیں۔

## کام کرنے والے ماڈل ids

| کلائنٹ id                                      | HTTP | ویکٹرز    | جہت     | نوٹس                                         |
| ---------------------------------------------- | ---- | --------- | ------- | -------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | بیچ 2 → 2 | 3072    | مقامی Gemini کلید کے بغیر کام کرتا ہے        |
| `openrouter/google/gemini-embedding-2-preview` | 200  | بیچ 2 → 2 | 3072    | غیر پیش منظر id جیسی ہی ویکٹر اسپیس          |
| `openrouter/google/gemini-embedding-001`       | 200  | بیچ 2 → 2 | 3072    | `GET /v1/embeddings` میں درج ہے              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | بیچ 2 → 2 | 1024    | معیاری Jina omni id                          |
| `jina/jina-embeddings-v5-omni-small`           | 200  | بیچ 2 → 2 | 1024    | عرف؛ جواب میں `model`، `jina-ai/...` ہوتا ہے |
| `jina-embeddings-v5-omni-small`                | 200  | بیچ 2 → 2 | 1024    | سادہ id بھی حل ہو جاتا ہے                    |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1     | **768** | small سے مختلف ویکٹر اسپیس                   |

`GET /v1/models` اور `GET /v1/embeddings` میں
`jina-ai/jina-embeddings-v5-omni-small` (1024)،
`jina-ai/jina-embeddings-v5-omni-nano` (768)، اور
`openrouter/google/gemini-embedding-001` درج تھے۔ ان میں
`openrouter/google/gemini-embedding-2` درج **نہیں** تھا، حالانکہ یہ id پہلے ہی درخواستیں پوری کر رہا ہے۔

nano (768-d) اور small (1024-d) کو ایک ہی انڈیکس میں نہ ملائیں۔ ان کا
باہمی موازنہ نہیں کیا جا سکتا۔

## خراب / گمراہ کن ids

### مقامی Gemini Embedding 2

درخواست:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

اصل نتیجہ (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` بھی یہی 400 لوٹاتا ہے۔ جب تک کوئی حسبِ ضرورت
provider نوڈ `google` سابقہ استعمال نہ کرے، `google/gemini-embedding-2`
HTTP **400** `Unknown embedding provider: google` لوٹاتا ہے۔

متوقع نتیجہ: یا تو `gemini` provider پر Google AI Studio کلید کے ساتھ مقامی
Gemini embed، یا ایسا 400 جو کام کرنے والی OpenRouter id بتائے۔

دوبارہ پیدا کرنے کا طریقہ (bearer کو چھپا دیں):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

کام کرنے والا متبادل:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

مقامی `gemini-embedding-2` صرف GitOps کے ذریعے کامیاب نہیں ہو سکتا۔ Google AI
Studio کلید کو `gemini` provider کنکشن کے طور پر شامل کرنا ضروری ہے (ڈیش بورڈ
یا OmniRoute میں درآمد شدہ `GEMINI_API_KEY`)۔ یہ راز اس repo میں موجود نہیں۔

### Jina ملٹی موڈل راستہ

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

کوئی عرف دستیاب ہونے تک `POST /v1/embeddings` استعمال کریں۔

### Jina / Memorix تصویری آبجیکٹ

OmniRoute کا معیاری تصویری آئٹم (28×28 PNG، 784 پکسلز — Jina ‏1×1 مسترد کرتا ہے):

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

اصل نتیجہ: HTTP **200**، 1 ویکٹر، 1024-d۔

Memorix 1.6.0 / Jina کی مقامی ساخت:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

اصل نتیجہ: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` کو `{ "image": "data:..." }` کے ساتھ ملانے پر بھی یہی 400 آتا ہے۔

## کلائنٹ نوٹس

### Hindsight 0.9.1

Hindsight embeddings صرف متن کے لیے ہیں (`encode(list[str])`)۔ یہ تصویری
آبجیکٹس نہیں بھیجتا۔ Hindsight کے OpenAI سے ہم آہنگ embeddings بنیادی URL کو
OmniRoute کے `/v1` پر رکھیں اور اوپر دیے گئے جدول سے کوئی کام کرنے والی id
استعمال کریں (`jina-ai/jina-embeddings-v5-omni-small` یا
`openrouter/google/gemini-embedding-2`)۔ ماڈل کو سادہ
`gemini-embedding-2` پر متعین نہ کریں، جب تک گیٹ وے پر `gemini` API کلید
موجود نہ ہو۔

### Memorix 1.6.0

Memorix صرف `/jina\.ai/i` سے مماثل `baseUrl` کو مقامی میڈیا سمجھتا ہے۔
OmniRoute URL صرف متن والے راستے پر ہی رہتا ہے، چاہے ماڈل Jina omni ہو۔
یہ گیٹ Memorix کلائنٹ کا مسئلہ ہے۔ اس سے الگ، OmniRoute اب بھی Jina کا
`{image: "data:..."}` باڈی مسترد کرتا ہے، جسے گیٹ کھلنے کی صورت میں Memorix
بھیجتا؛ لہٰذا Jina سے ہم آہنگ کلائنٹس معیاری `{type,source}` اسکیما کے بغیر
OmniRoute کے ذریعے تصاویر embed نہیں کر سکتے۔

متن کے لیے `jina-ai/jina-embeddings-v5-omni-small` استعمال کریں۔ Memorix کے
`base_url` کو `https://api.jina.ai` کی جانب مت بھیجیں — OmniRoute کو واحد
درمیانی مرحلہ رکھیں۔
