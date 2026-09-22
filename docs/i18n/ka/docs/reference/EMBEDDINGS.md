# Embeddings client runbook (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

ოპერატორის შენიშვნები `POST /v1/embeddings`-ისთვის, როდესაც OmniRoute დგას
Hindsight 0.9.1-ის (მხოლოდ ტექსტური `encode(list[str])`) და Memorix 1.6.0-ის (Jina-ს მედიის
ფილტრი) წინ. რეალურ გარემოში გადამოწმებულია 2026-08-17-ს OmniRoute 3.8.49-ის წინააღმდეგ,
მისამართზე `https://omniroute.jaguar-fish.ts.net/v1`. ქვემოთ საიდუმლო მონაცემები არ არის.

## მოქმედი მოდელების id-ები

| კლიენტის id                                    | HTTP | ვექტორები    | განზომილება | შენიშვნები                                       |
| ---------------------------------------------- | ---- | ------------ | ----------- | ------------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | პაკეტი 2 → 2 | 3072        | მუშაობს Gemini-ს ნატიური გასაღების გარეშე        |
| `openrouter/google/gemini-embedding-2-preview` | 200  | პაკეტი 2 → 2 | 3072        | იგივე სივრცეა, რაც არა-preview id-ის შემთხვევაში |
| `openrouter/google/gemini-embedding-001`       | 200  | პაკეტი 2 → 2 | 3072        | ჩამოთვლილია `GET /v1/embeddings`-ში              |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | პაკეტი 2 → 2 | 1024        | Jina omni-ს კანონიკური id                        |
| `jina/jina-embeddings-v5-omni-small`           | 200  | პაკეტი 2 → 2 | 1024        | მეტსახელი; პასუხის `model` არის `jina-ai/...`    |
| `jina-embeddings-v5-omni-small`                | 200  | პაკეტი 2 → 2 | 1024        | პრეფიქსის გარეშე id-ც იძებნება                   |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768**     | small-ისგან განსხვავებული ვექტორული სივრცე       |

`GET /v1/models` და `GET /v1/embeddings` ჩამონათვალში შეიცავდა
`jina-ai/jina-embeddings-v5-omni-small`-ს (1024),
`jina-ai/jina-embeddings-v5-omni-nano`-ს (768) და
`openrouter/google/gemini-embedding-001`-ს. მათ ჩამონათვალში **არ** იყო
`openrouter/google/gemini-embedding-2`, მიუხედავად იმისა, რომ ეს id უკვე მუშაობს.

არ აურიოთ nano (768-d) და small (1024-d) ერთ ინდექსში. ისინი ერთმანეთთან
შედარებადი არ არის.

## გაუმართავი / შეცდომაში შემყვანი id-ები

### ნატიური Gemini Embedding 2

მოთხოვნა:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

ფაქტობრივი შედეგი (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` იმავე 400-ს აბრუნებს. `google/gemini-embedding-2`
აბრუნებს HTTP **400** `Unknown embedding provider: google`-ს, თუ მომწოდებლის
მორგებული კვანძი `google` პრეფიქსს არ იყენებს.

მოსალოდნელი შედეგი: ან ნატიური Gemini embed Google AI Studio-ს გასაღებით
`gemini` მომწოდებელზე, ან 400, რომელიც მოქმედ OpenRouter id-ს ასახელებს.

გამეორება (დამალეთ bearer):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

მოქმედი შემცვლელი:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

ნატიური `gemini-embedding-2` მხოლოდ GitOps-ის გამოყენებით ვერ იმუშავებს. Google AI
Studio-ს გასაღები უნდა დაემატოს, როგორც `gemini` მომწოდებლის კავშირი (მართვის პანელიდან ან
OmniRoute-ში იმპორტირებული `GEMINI_API_KEY`-ის სახით). ეს საიდუმლო მონაცემი ამ რეპოზიტორიაში არ არის.

### Jina-ს მულტიმოდალური მარშრუტი

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

მეტსახელის არსებობამდე გამოიყენეთ `POST /v1/embeddings`.

### Jina / Memorix-ის გამოსახულების ობიექტი

OmniRoute-ის კანონიკური გამოსახულების ელემენტი (28×28 PNG, 784 პიქსელი — Jina უარყოფს 1×1-ს):

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

ფაქტობრივი შედეგი: HTTP **200**, 1 ვექტორი, 1024-d.

Memorix 1.6.0 / Jina-ს ნატიური ფორმა:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

ფაქტობრივი შედეგი: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }`-ის შერევა `{ "image": "data:..." }`-თან იმავე 400-ს იწვევს.

## შენიშვნები კლიენტების შესახებ

### Hindsight 0.9.1

Hindsight-ის ემბედინგები მხოლოდ ტექსტურია (`encode(list[str])`). ის
გამოსახულების ობიექტებს არ აგზავნის. Hindsight-ის OpenAI-თან თავსებადი ემბედინგების საბაზო URL
მიუთითეთ OmniRoute-ის `/v1`-ზე და გამოიყენეთ ზემოთ მოცემული ცხრილიდან მოქმედი id
(`jina-ai/jina-embeddings-v5-omni-small` ან
`openrouter/google/gemini-embedding-2`). მოდელად პრეფიქსის გარეშე
`gemini-embedding-2` არ დააყენოთ, თუ კარიბჭეზე `gemini` API გასაღები არ არსებობს.

### Memorix 1.6.0

Memorix მხოლოდ იმ `baseUrl`-ს განიხილავს ნატიურ მედიად, რომელიც ემთხვევა `/jina\.ai/i`-ს.
OmniRoute-ის URL მხოლოდ ტექსტურ მარშრუტზე რჩება მაშინაც კი, როდესაც მოდელი Jina omni-ა.
ეს ფილტრი Memorix-ის კლიენტის პრობლემაა. ამისგან დამოუკიდებლად, OmniRoute მაინც უარყოფს
Jina-ს `{image: "data:..."}` სხეულს, რომელსაც Memorix ფილტრის გახსნის შემთხვევაში
გააგზავნიდა, ამიტომ Jina-თან თავსებადი კლიენტები OmniRoute-ის გავლით გამოსახულებების ემბედინგს
კანონიკური `{type,source}` სქემის გარეშე ვერ შეძლებენ.

ტექსტისთვის გამოიყენეთ `jina-ai/jina-embeddings-v5-omni-small`. Memorix-ის
`base_url` არ მიუთითოთ `https://api.jina.ai`-ზე — ერთადერთ შუალედურ რგოლად OmniRoute დატოვეთ.
