# Embeddings client runbook (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Օպերատորի նշումներ `POST /v1/embeddings`-ի համար, երբ OmniRoute-ը տեղակայված է
Hindsight 0.9.1-ի (միայն տեքստային `encode(list[str])`) և Memorix 1.6.0-ի (Jina մեդիա
դարպաս) առջևում։ Իրական միջավայրում ստուգվել է 2026-08-17-ին՝ OmniRoute 3.8.49-ի հետ,
`https://omniroute.jaguar-fish.ts.net/v1` հասցեում։ Ստորև գաղտնի տվյալներ չկան։

## Աշխատող մոդելների id-ներ

| Հաճախորդի id                                   | HTTP | Վեկտորներ   | Չափայնություն | Նշումներ                                                   |
| ---------------------------------------------- | ---- | ----------- | ------------- | ---------------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | փաթեթ 2 → 2 | 3072          | Աշխատում է առանց բնիկ Gemini բանալու                       |
| `openrouter/google/gemini-embedding-2-preview` | 200  | փաթեթ 2 → 2 | 3072          | Նույն վեկտորային տարածքն է, ինչ ոչ նախադիտման id-ի դեպքում |
| `openrouter/google/gemini-embedding-001`       | 200  | փաթեթ 2 → 2 | 3072          | Նշված է `GET /v1/embeddings`-ում                           |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | փաթեթ 2 → 2 | 1024          | Կանոնական Jina omni id                                     |
| `jina/jina-embeddings-v5-omni-small`           | 200  | փաթեթ 2 → 2 | 1024          | Այլանուն․ պատասխանի `model`-ը `jina-ai/...` է              |
| `jina-embeddings-v5-omni-small`                | 200  | փաթեթ 2 → 2 | 1024          | Առանց նախածանցի id-ն նույնպես լուծվում է                   |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768**       | Վեկտորային տարածքը տարբերվում է small-ից                   |

`GET /v1/models`-ը և `GET /v1/embeddings`-ը ցուցակագրել են
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) և
`openrouter/google/gemini-embedding-001`։ Դրանք **չեն** ցուցակագրել
`openrouter/google/gemini-embedding-2`-ը, թեև այդ id-ն արդեն սպասարկվում է։

Մի խառնեք nano-ն (768-չափանի) և small-ը (1024-չափանի) մեկ ինդեքսում։ Դրանք
համեմատելի չեն։

## Չաշխատող / մոլորեցնող id-ներ

### Բնիկ Gemini Embedding 2

Հարցում՝

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Փաստացի արդյունք (2026-08-17)՝ HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2`-ը վերադարձնում է նույն 400-ը։ `google/gemini-embedding-2`-ը
վերադարձնում է HTTP **400** `Unknown embedding provider: google`, եթե հատուկ
մատակարարի հանգույցը չի օգտագործում `google` նախածանցը։

Ակնկալվող արդյունք՝ կամ բնիկ Gemini ներդրում՝ Google AI Studio բանալիով
`gemini` մատակարարում, կամ աշխատող OpenRouter id-ն նշող 400 պատասխան։

Վերարտադրում (թաքցրեք bearer-ը)՝

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Աշխատող փոխարինիչ՝

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Բնիկ `gemini-embedding-2`-ը չի կարող աշխատել միայն GitOps-ի միջոցով։ Google AI
Studio-ի բանալին պետք է ավելացվի որպես `gemini` մատակարարի միացում (կառավարման վահանակից կամ
`GEMINI_API_KEY`-ն OmniRoute ներմուծելով)։ Այդ գաղտնիքը չկա այս պահոցում։

### Jina-ի բազմամոդալ ուղի

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

Օգտագործեք `POST /v1/embeddings`, քանի դեռ այլանուն գոյություն չունի։

### Jina / Memorix պատկերի օբյեկտ

OmniRoute-ի կանոնական պատկերի տարրը (28×28 PNG, 784 պիքսել — Jina-ն մերժում է 1×1-ը)՝

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

Փաստացի արդյունք՝ HTTP **200**, 1 վեկտոր, 1024-չափանի։

Memorix 1.6.0 / Jina-ի բնիկ կառուցվածք՝

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Փաստացի արդյունք՝ HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }`-ի և `{ "image": "data:..." }`-ի խառը օգտագործումը վերադարձնում է նույն 400-ը։

## Հաճախորդի վերաբերյալ նշումներ

### Hindsight 0.9.1

Hindsight-ի ներդրումները միայն տեքստային են (`encode(list[str])`)։ Այն պատկերի
օբյեկտներ չի ուղարկում։ Hindsight-ի՝ OpenAI-ի հետ համատեղելի ներդրումների բազային URL-ը
ուղղեք OmniRoute-ի `/v1` հասցեին և օգտագործեք վերևի աղյուսակից աշխատող id
(`jina-ai/jina-embeddings-v5-omni-small` կամ
`openrouter/google/gemini-embedding-2`)։ Մոդելը մի սահմանեք որպես առանց նախածանցի
`gemini-embedding-2`, եթե դարպասում `gemini` API բանալի չկա։

### Memorix 1.6.0

Memorix-ը միայն `/jina\.ai/i`-ին համապատասխանող `baseUrl`-ն է դիտարկում որպես բնիկ մեդիա։
OmniRoute URL-ը մնում է միայն տեքստային ուղու վրա, նույնիսկ երբ մոդելը Jina omni է։
Այդ դարպասը Memorix հաճախորդի խնդիր է։ Դրանից անկախ՝ OmniRoute-ը դեռ մերժում է
Jina-ի `{image: "data:..."}` մարմինը, որը Memorix-ը կուղարկեր, եթե դարպասը
բացվեր, ուստի Jina-ի հետ համատեղելի հաճախորդները չեն կարող OmniRoute-ի միջոցով
պատկերներ ներդրել առանց կանոնական `{type,source}` սխեմայի։

Տեքստի համար օգտագործեք `jina-ai/jina-embeddings-v5-omni-small`։ Memorix-ի
`base_url`-ը մի ուղղեք `https://api.jina.ai` հասցեին․ OmniRoute-ը պահեք որպես միակ միջանկյալ հանգույց։
