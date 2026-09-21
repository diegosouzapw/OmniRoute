# Embeddings client runbook (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Hindsight 0.9.1 (শুধু-টেক্সট `encode(list[str])`) এবং Memorix 1.6.0 (Jina মিডিয়া গেট)-এর সামনে OmniRoute থাকলে `POST /v1/embeddings`-এর জন্য অপারেটর নোট। `https://omniroute.jaguar-fish.ts.net/v1`-এ OmniRoute 3.8.49-এর বিপরীতে 2026-08-17 তারিখে সরাসরি যাচাই করা হয়েছে। নিচে কোনো গোপন তথ্য নেই।

## কার্যকর মডেল আইডি

| ক্লায়েন্ট আইডি                                | HTTP | ভেক্টর      | মাত্রা  | নোট                                        |
| ---------------------------------------------- | ---- | ----------- | ------- | ------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | ব্যাচ 2 → 2 | 3072    | নেটিভ Gemini কী ছাড়াই কাজ করে             |
| `openrouter/google/gemini-embedding-2-preview` | 200  | ব্যাচ 2 → 2 | 3072    | নন-প্রিভিউ আইডির মতো একই ভেক্টর স্পেস      |
| `openrouter/google/gemini-embedding-001`       | 200  | ব্যাচ 2 → 2 | 3072    | `GET /v1/embeddings`-এ তালিকাভুক্ত         |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | ব্যাচ 2 → 2 | 1024    | ক্যানোনিক্যাল Jina omni আইডি               |
| `jina/jina-embeddings-v5-omni-small`           | 200  | ব্যাচ 2 → 2 | 1024    | উপনাম; রেসপন্সের `model` হলো `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | ব্যাচ 2 → 2 | 1024    | উপসর্গবিহীন আইডিও সমাধান হয়               |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | small থেকে আলাদা ভেক্টর স্পেস              |

`GET /v1/models` এবং `GET /v1/embeddings`-এ
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) এবং
`openrouter/google/gemini-embedding-001` তালিকাভুক্ত ছিল। তবে
`openrouter/google/gemini-embedding-2` আইডিটি ইতিমধ্যেই কাজ করলেও তারা সেটি তালিকাভুক্ত করেনি।

একটি ইনডেক্সে nano (768-d) এবং small (1024-d) মেশাবেন না। এগুলো
তুলনাযোগ্য নয়।

## ত্রুটিপূর্ণ / বিভ্রান্তিকর আইডি

### নেটিভ Gemini Embedding 2

রিকোয়েস্ট:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

প্রকৃত ফলাফল (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` একই 400 ফেরত দেয়। কোনো কাস্টম প্রোভাইডার নোড
`google` উপসর্গ ব্যবহার না করলে `google/gemini-embedding-2` HTTP **400**
`Unknown embedding provider: google` ফেরত দেয়।

প্রত্যাশিত ফলাফল: হয় `gemini` প্রোভাইডারে Google AI Studio কী ব্যবহার করে
একটি নেটিভ Gemini এমবেড, অথবা কার্যকর OpenRouter আইডিটির নাম উল্লেখকারী 400।

পুনরুৎপাদন (bearer গোপন করুন):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

কার্যকর বিকল্প:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

নেটিভ `gemini-embedding-2` শুধু GitOps থেকে সফল হতে পারে না। একটি Google AI
Studio কী `gemini` প্রোভাইডার সংযোগ হিসেবে যোগ করতে হবে (ড্যাশবোর্ড অথবা
OmniRoute-এ ইমপোর্ট করা `GEMINI_API_KEY`)। সেই গোপন তথ্য এই রিপোজিটরিতে নেই।

### Jina মাল্টিমোডাল পাথ

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

কোনো উপনাম যোগ না হওয়া পর্যন্ত `POST /v1/embeddings` ব্যবহার করুন।

### Jina / Memorix ইমেজ অবজেক্ট

OmniRoute-এর ক্যানোনিক্যাল ইমেজ আইটেম (28×28 PNG, 784 পিক্সেল — Jina 1×1 প্রত্যাখ্যান করে):

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

প্রকৃত ফলাফল: HTTP **200**, 1টি ভেক্টর, 1024-d।

Memorix 1.6.0 / Jina-এর নেটিভ কাঠামো:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

প্রকৃত ফলাফল: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }`-এর সঙ্গে `{ "image": "data:..." }` মেশালেও একই 400 পাওয়া যায়।

## ক্লায়েন্ট নোট

### Hindsight 0.9.1

Hindsight এমবেডিং শুধু-টেক্সট (`encode(list[str])`)। এটি ইমেজ অবজেক্ট পাঠায় না।
Hindsight-এর OpenAI-সামঞ্জস্যপূর্ণ embeddings base URL-কে OmniRoute `/v1`-এ
নির্দেশ করুন এবং উপরের টেবিল থেকে একটি কার্যকর আইডি ব্যবহার করুন
(`jina-ai/jina-embeddings-v5-omni-small` অথবা
`openrouter/google/gemini-embedding-2`)। গেটওয়েতে `gemini` API কী না থাকলে
মডেলটিকে উপসর্গবিহীন `gemini-embedding-2` হিসেবে সেট করবেন না।

### Memorix 1.6.0

Memorix কেবল `/jina\.ai/i`-এর সঙ্গে মিলে যাওয়া `baseUrl`-কেই নেটিভ মিডিয়া
হিসেবে বিবেচনা করে। মডেলটি Jina omni হলেও একটি OmniRoute URL শুধু-টেক্সট
পাথেই থাকে। ওই গেটটি Memorix ক্লায়েন্টের সমস্যা। স্বাধীনভাবে, গেটটি খুললে
Memorix যে Jina `{image: "data:..."}` বডি পাঠাত, OmniRoute সেটিও প্রত্যাখ্যান
করে; ফলে ক্যানোনিক্যাল `{type,source}` স্কিমা ছাড়া Jina-সামঞ্জস্যপূর্ণ
ক্লায়েন্টগুলো OmniRoute-এর মাধ্যমে ইমেজ এমবেড করতে পারে না।

টেক্সটের জন্য `jina-ai/jina-embeddings-v5-omni-small` ব্যবহার করুন। Memorix-এর
`base_url`-কে `https://api.jina.ai`-এ নির্দেশ করবেন না — OmniRoute-কেই একমাত্র
হপ হিসেবে রাখুন।
