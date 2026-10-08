# Embeddings client runbook (العربية)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

ملاحظات للمشغّلين حول `POST /v1/embeddings` عندما يكون OmniRoute أمام
Hindsight 0.9.1 (واجهة `encode(list[str])` النصية فقط) وMemorix 1.6.0 (بوابة وسائط Jina).
تم التحقق مباشرةً بتاريخ 2026-08-17 مقابل OmniRoute 3.8.49 على
`https://omniroute.jaguar-fish.ts.net/v1`. لا توجد أسرار أدناه.

## معرّفات النماذج العاملة

| معرّف العميل                                   | HTTP | المتجهات   | البُعد  | ملاحظات                                                |
| ---------------------------------------------- | ---- | ---------- | ------- | ------------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | دفعة 2 → 2 | 3072    | يعمل من دون مفتاح Gemini أصلي                          |
| `openrouter/google/gemini-embedding-2-preview` | 200  | دفعة 2 → 2 | 3072    | مساحة المتجهات نفسها لمعرّف الإصدار غير التجريبي       |
| `openrouter/google/gemini-embedding-001`       | 200  | دفعة 2 → 2 | 3072    | مُدرج في `GET /v1/embeddings`                          |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | دفعة 2 → 2 | 1024    | معرّف Jina omni القياسي                                |
| `jina/jina-embeddings-v5-omni-small`           | 200  | دفعة 2 → 2 | 1024    | اسم مستعار؛ قيمة `model` في الاستجابة هي `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | دفعة 2 → 2 | 1024    | يُحلّ المعرّف المجرّد أيضًا                            |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1      | **768** | مساحة متجهات مختلفة عن small                           |

أدرج كل من `GET /v1/models` و`GET /v1/embeddings`
‏`jina-ai/jina-embeddings-v5-omni-small` ‏(1024) و
`jina-ai/jina-embeddings-v5-omni-nano` ‏(768) و
`openrouter/google/gemini-embedding-001`. ولم يُدرجا
`openrouter/google/gemini-embedding-2` رغم أن هذا المعرّف متاح بالفعل.

لا تخلط nano ‏(768 بُعدًا) وsmall ‏(1024 بُعدًا) في فهرس واحد. فهما غير
قابلين للمقارنة.

## معرّفات معطّلة / مضللة

### Gemini Embedding 2 الأصلي

الطلب:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

النتيجة الفعلية (2026-08-17): ‏HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

يعيد `gemini/gemini-embedding-2` الخطأ 400 نفسه. ويعيد
`google/gemini-embedding-2` استجابة HTTP **400** بالنص
`Unknown embedding provider: google` ما لم تستخدم عقدة موفّر مخصّصة البادئة
`google`.

المتوقع: إما تضمين Gemini أصلي باستخدام مفتاح Google AI Studio لدى موفّر
`gemini`، أو خطأ 400 يذكر معرّف OpenRouter العامل.

إعادة الإنتاج (احجب رمز حامل الصلاحية):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

البديل العامل:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

لا يمكن أن ينجح `gemini-embedding-2` الأصلي عبر GitOps وحده. يجب إضافة مفتاح
Google AI Studio بصفته اتصالًا لموفّر `gemini` (عبر لوحة المعلومات أو باستيراد
`GEMINI_API_KEY` إلى OmniRoute). هذا السر غير موجود في هذا المستودع.

### مسار Jina متعدد الوسائط

`POST /v1/multimodal-embeddings` ← ‏HTTP **404**

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

استخدم `POST /v1/embeddings` إلى أن يتوفر اسم مستعار.

### كائن صورة Jina / Memorix

عنصر الصورة القياسي في OmniRoute (صورة PNG بمقاس 28×28، أي 784 بكسل — يرفض Jina الصور بمقاس 1×1):

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

النتيجة الفعلية: ‏HTTP **200**، متجه واحد، 1024 بُعدًا.

بنية Memorix 1.6.0 / Jina الأصلية:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

النتيجة الفعلية: ‏HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

يؤدي مزج `{ "text": "..." }` مع `{ "image": "data:..." }` إلى الخطأ 400 نفسه.

## ملاحظات حول العملاء

### Hindsight 0.9.1

تضمينات Hindsight نصية فقط (`encode(list[str])`). وهو لا يرسل كائنات
صور. وجّه عنوان URL الأساسي للتضمينات المتوافقة مع OpenAI في Hindsight إلى
مسار OmniRoute ‏`/v1`، واستخدم معرّفًا عاملًا من الجدول أعلاه
(`jina-ai/jina-embeddings-v5-omni-small` أو
`openrouter/google/gemini-embedding-2`). لا تضبط النموذج على المعرّف المجرّد
`gemini-embedding-2` ما لم يكن مفتاح API لموفّر `gemini` موجودًا على البوابة.

### Memorix 1.6.0

لا يتعامل Memorix مع `baseUrl` كمسار وسائط أصلي إلا إذا طابق
`/jina\.ai/i`. يبقى عنوان URL الخاص بـOmniRoute على المسار النصي فقط حتى عندما
يكون النموذج Jina omni. هذه البوابة مشكلة في عميل Memorix. وبصرف النظر عن ذلك،
لا يزال OmniRoute يرفض بنية Jina ‏`{image: "data:..."}` التي سيرسلها Memorix
إذا فُتحت البوابة، ولذلك لا تستطيع العملاء المتوافقة مع Jina تضمين الصور عبر
OmniRoute من دون مخطط `{type,source}` القياسي.

استخدم `jina-ai/jina-embeddings-v5-omni-small` للنصوص. لا توجّه
`base_url` في Memorix إلى `https://api.jina.ai` — أبقِ OmniRoute المرحلة
الوسيطة الوحيدة.
