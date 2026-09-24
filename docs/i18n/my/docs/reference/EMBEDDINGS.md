# Embeddings client runbook (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute သည် Hindsight 0.9.1 (စာသားသီးသန့် `encode(list[str])`) နှင့် Memorix 1.6.0 (Jina မီဒီယာဂိတ်) တို့၏ ရှေ့တွင်ရှိနေချိန် `POST /v1/embeddings` အတွက် အော်ပရေတာမှတ်စုများ။ `https://omniroute.jaguar-fish.ts.net/v1` ရှိ OmniRoute 3.8.49 နှင့် 2026-08-17 တွင် တိုက်ရိုက်စစ်ဆေးအတည်ပြုထားသည်။ အောက်တွင် လျှို့ဝှက်အချက်အလက်များ မပါဝင်ပါ။

## အလုပ်လုပ်သော မော်ဒယ် id များ

| ကလိုင်းယင့် id                                 | HTTP | ဗက်တာများ      | အတိုင်းအတာ | မှတ်ချက်များ                                               |
| ---------------------------------------------- | ---- | -------------- | ---------- | ---------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | အစုလိုက် 2 → 2 | 3072       | မူရင်း Gemini key မရှိဘဲ အလုပ်လုပ်သည်                      |
| `openrouter/google/gemini-embedding-2-preview` | 200  | အစုလိုက် 2 → 2 | 3072       | preview မဟုတ်သော id နှင့် vector space တူညီသည်             |
| `openrouter/google/gemini-embedding-001`       | 200  | အစုလိုက် 2 → 2 | 3072       | `GET /v1/embeddings` တွင် စာရင်းပြုစုထားသည်                |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | အစုလိုက် 2 → 2 | 1024       | စံသတ်မှတ်ထားသော Jina omni id                               |
| `jina/jina-embeddings-v5-omni-small`           | 200  | အစုလိုက် 2 → 2 | 1024       | အမည်ကွဲ; တုံ့ပြန်ချက်ရှိ `model` သည် `jina-ai/...` ဖြစ်သည် |
| `jina-embeddings-v5-omni-small`                | 200  | အစုလိုက် 2 → 2 | 1024       | prefix မပါသော id ကိုလည်း ဖြေရှင်းပေးနိုင်သည်               |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1          | **768**    | small နှင့် မတူညီသော vector space ဖြစ်သည်                  |

`GET /v1/models` နှင့် `GET /v1/embeddings` တို့တွင်
`jina-ai/jina-embeddings-v5-omni-small` (1024)၊
`jina-ai/jina-embeddings-v5-omni-nano` (768) နှင့်
`openrouter/google/gemini-embedding-001` တို့ကို စာရင်းပြုစုထားသည်။ သို့သော်
`openrouter/google/gemini-embedding-2` သည် ဝန်ဆောင်မှုပေးနေပြီးဖြစ်သော်လည်း ၎င်းတို့က ထို id ကို
စာရင်းမပြုစုထားပါ။

nano (768-d) နှင့် small (1024-d) ကို index တစ်ခုတည်းတွင် မရောနှောပါနှင့်။ ၎င်းတို့ကို
နှိုင်းယှဉ်၍မရပါ။

## ပျက်နေသော / အထင်အမြင်လွဲမှားစေသော id များ

### မူရင်း Gemini Embedding 2

တောင်းဆိုချက်-

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

အမှန်တကယ်ရလဒ် (2026-08-17)- HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` သည် အလားတူ 400 ကို ပြန်ပေးသည်။ `google` prefix ကို အသုံးပြုသော စိတ်ကြိုက်
provider node တစ်ခု မရှိပါက `google/gemini-embedding-2` သည် HTTP **400**
`Unknown embedding provider: google` ကို ပြန်ပေးသည်။

မျှော်လင့်ထားသည့်ရလဒ်- `gemini` provider ပေါ်ရှိ Google AI Studio key ဖြင့်
မူရင်း Gemini embedding တစ်ခုကို အသုံးပြုနိုင်ရမည်၊ သို့မဟုတ် အလုပ်လုပ်သော OpenRouter id ကို ဖော်ပြသည့် 400 ကို ပြန်ပေးရမည်။

ပြန်လည်စမ်းသပ်ရန် (bearer ကို ဖျောက်ပါ)-

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

အလုပ်လုပ်သော အစားထိုးနည်း-

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

မူရင်း `gemini-embedding-2` ကို GitOps တစ်ခုတည်းဖြင့် အောင်မြင်အောင် မလုပ်နိုင်ပါ။ Google AI
Studio key ကို `gemini` provider ချိတ်ဆက်မှုတစ်ခုအဖြစ် ထည့်သွင်းရမည် (dashboard သို့မဟုတ်
`GEMINI_API_KEY` ကို OmniRoute ထဲသို့ import လုပ်ခြင်း)။ ထိုလျှို့ဝှက် key သည် ဤ repo ထဲတွင် မရှိပါ။

### Jina multimodal လမ်းကြောင်း

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

alias တစ်ခု မရှိသေးသရွေ့ `POST /v1/embeddings` ကို အသုံးပြုပါ။

### Jina / Memorix ပုံ object

OmniRoute စံသတ်မှတ်ထားသော ပုံ item (28×28 PNG၊ 784 pixels — Jina သည် 1×1 ကို လက်မခံပါ)-

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

အမှန်တကယ်ရလဒ်- HTTP **200**၊ ဗက်တာ 1 ခု၊ 1024-d။

Memorix 1.6.0 / Jina မူရင်းပုံစံ-

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

အမှန်တကယ်ရလဒ်- HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` ကို `{ "image": "data:..." }` နှင့် ရောစပ်ခြင်းသည်လည်း အလားတူ 400 ကို ရရှိသည်။

## ကလိုင်းယင့်မှတ်စုများ

### Hindsight 0.9.1

Hindsight embedding များသည် စာသားသီးသန့် (`encode(list[str])`) ဖြစ်သည်။ ၎င်းသည်
ပုံ object များကို မပို့ပါ။ Hindsight ၏ OpenAI-compatible embeddings base URL ကို
OmniRoute `/v1` သို့ ညွှန်ပြီး အထက်ပါဇယားမှ အလုပ်လုပ်သော id တစ်ခု
(`jina-ai/jina-embeddings-v5-omni-small` သို့မဟုတ်
`openrouter/google/gemini-embedding-2`) ကို အသုံးပြုပါ။ gateway တွင် `gemini` API key
မရှိပါက မော်ဒယ်ကို prefix မပါသော `gemini-embedding-2` အဖြစ် မသတ်မှတ်ပါနှင့်။

### Memorix 1.6.0

Memorix သည် `/jina\.ai/i` နှင့် ကိုက်ညီသော `baseUrl` ကိုသာ မူရင်းမီဒီယာအဖြစ် သတ်မှတ်သည်။
မော်ဒယ်သည် Jina omni ဖြစ်နေသော်လည်း OmniRoute URL သည် စာသားသီးသန့်လမ်းကြောင်းပေါ်တွင်သာ ရှိနေသည်။
ထိုဂိတ်သည် Memorix ကလိုင်းယင့် ပြဿနာတစ်ခုဖြစ်သည်။ သီးခြားအနေဖြင့် OmniRoute သည် ဂိတ်
ပွင့်ခဲ့လျှင် Memorix ပို့မည့် Jina `{image: "data:..."}` body ကိုလည်း လက်မခံသေးသောကြောင့်
Jina-compatible ကလိုင်းယင့်များသည် စံသတ်မှတ်ထားသော `{type,source}` schema မရှိဘဲ
OmniRoute မှတစ်ဆင့် ပုံများကို embed မလုပ်နိုင်ပါ။

စာသားအတွက် `jina-ai/jina-embeddings-v5-omni-small` ကို အသုံးပြုပါ။ Memorix
`base_url` ကို `https://api.jina.ai` သို့ မညွှန်ပါနှင့် — OmniRoute ကိုသာ တစ်ခုတည်းသော ကြားခံအဆင့်အဖြစ် ထားပါ။
