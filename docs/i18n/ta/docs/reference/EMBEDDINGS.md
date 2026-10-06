# Embeddings client runbook (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute, Hindsight 0.9.1 (உரை மட்டும் ஆதரிக்கும் `encode(list[str])`) மற்றும் Memorix 1.6.0 (Jina ஊடக நுழைவாயில்) ஆகியவற்றுக்கு முன்னால் இருக்கும்போது `POST /v1/embeddings`-க்கான இயக்குநர் குறிப்புகள். OmniRoute 3.8.49-க்கு எதிராக `https://omniroute.jaguar-fish.ts.net/v1` முகவரியில் 2026-08-17 அன்று நேரடியாகச் சரிபார்க்கப்பட்டது. கீழே இரகசியங்கள் எதுவும் இல்லை.

## செயல்படும் மாதிரி id-கள்

| கிளையன்ட் id                                   | HTTP | வெக்டர்கள்   | பரிமாணம் | குறிப்புகள்                                          |
| ---------------------------------------------- | ---- | ------------ | -------- | ---------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | தொகுதி 2 → 2 | 3072     | சொந்த Gemini key இல்லாமலேயே செயல்படுகிறது            |
| `openrouter/google/gemini-embedding-2-preview` | 200  | தொகுதி 2 → 2 | 3072     | முன்னோட்டமற்ற id-இன் அதே வெக்டர் வெளி                |
| `openrouter/google/gemini-embedding-001`       | 200  | தொகுதி 2 → 2 | 3072     | `GET /v1/embeddings`-இல் பட்டியலிடப்பட்டுள்ளது       |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | தொகுதி 2 → 2 | 1024     | அதிகாரப்பூர்வ Jina omni id                           |
| `jina/jina-embeddings-v5-omni-small`           | 200  | தொகுதி 2 → 2 | 1024     | மாற்றுப்பெயர்; பதிலின் `model` மதிப்பு `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | தொகுதி 2 → 2 | 1024     | முன்னொட்டில்லாத id-யும் தீர்மானிக்கப்படுகிறது        |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1        | **768**  | small-இலிருந்து வேறுபட்ட வெக்டர் வெளி                |

`GET /v1/models` மற்றும் `GET /v1/embeddings` ஆகியவை
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768), மற்றும்
`openrouter/google/gemini-embedding-001` ஆகியவற்றைப் பட்டியலிட்டன. ஆனால்
`openrouter/google/gemini-embedding-2` ஏற்கெனவே சேவை வழங்கியபோதிலும், அந்த id-ஐ அவை பட்டியலிடவில்லை.

nano (768-d) மற்றும் small (1024-d) ஆகியவற்றை ஒரே குறியீட்டில் கலக்க வேண்டாம். அவற்றை ஒப்பிட முடியாது.

## செயலிழந்த / தவறாக வழிநடத்தும் id-கள்

### சொந்த Gemini Embedding 2

கோரிக்கை:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

உண்மையான முடிவு (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` அதே 400 பதிலை வழங்குகிறது. தனிப்பயன் வழங்குநர் முனை `google` முன்னொட்டைப் பயன்படுத்தாவிட்டால், `google/gemini-embedding-2` HTTP **400** `Unknown embedding provider: google` என்பதை வழங்குகிறது.

எதிர்பார்க்கப்படுவது: `gemini` வழங்குநரில் Google AI Studio key-ஐப் பயன்படுத்தும் சொந்த Gemini embed அல்லது செயல்படும் OpenRouter id-ஐக் குறிப்பிடும் 400 பதில்.

மீளுருவாக்கம் (bearer மதிப்பை மறைக்கவும்):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

செயல்படும் மாற்று:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

சொந்த `gemini-embedding-2`, GitOps மூலமாக மட்டும் வெற்றிபெற முடியாது. Google AI Studio key ஒன்று `gemini` வழங்குநர் இணைப்பாகச் சேர்க்கப்பட வேண்டும் (முகப்புப்பலகை அல்லது OmniRoute-க்குள் இறக்குமதி செய்யப்பட்ட `GEMINI_API_KEY`). அந்த இரகசியம் இந்த repo-வில் இல்லை.

### Jina பன்மாதிரி பாதை

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

மாற்றுப்பெயர் கிடைக்கும் வரை `POST /v1/embeddings`-ஐப் பயன்படுத்தவும்.

### Jina / Memorix படப் பொருள்

OmniRoute-இன் அதிகாரப்பூர்வ பட உருப்படி (28×28 PNG, 784 பிக்சல்கள் — 1×1 படத்தை Jina நிராகரிக்கிறது):

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

உண்மையான முடிவு: HTTP **200**, 1 வெக்டர், 1024-d.

Memorix 1.6.0 / Jina சொந்த வடிவம்:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

உண்மையான முடிவு: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }`-ஐ `{ "image": "data:..." }` உடன் கலப்பதும் இதே 400 பதிலை வழங்குகிறது.

## கிளையன்ட் குறிப்புகள்

### Hindsight 0.9.1

Hindsight embeddings உரையை மட்டுமே ஆதரிக்கின்றன (`encode(list[str])`). அது படப் பொருட்களை அனுப்புவதில்லை. Hindsight-இன் OpenAI-இணக்க embeddings அடிப்படை URL-ஐ OmniRoute `/v1`-க்கு அமைத்து, மேலுள்ள அட்டவணையிலிருந்து செயல்படும் ஓர் id-ஐப் பயன்படுத்தவும் (`jina-ai/jina-embeddings-v5-omni-small` அல்லது `openrouter/google/gemini-embedding-2`). நுழைவாயிலில் `gemini` API key இல்லாவிட்டால், மாதிரியை முன்னொட்டில்லாத `gemini-embedding-2` ஆக அமைக்க வேண்டாம்.

### Memorix 1.6.0

`baseUrl`, `/jina\.ai/i` உடன் பொருந்தினால் மட்டுமே Memorix அதைச் சொந்த ஊடகமாகக் கருதுகிறது. மாதிரி Jina omni ஆக இருந்தாலும், OmniRoute URL உரை-மட்டும் பாதையிலேயே தொடர்கிறது. அந்த நுழைவாயில் ஒரு Memorix கிளையன்ட் சிக்கல். தனியாகப் பார்க்கும்போது, நுழைவாயில் திறந்தால் Memorix அனுப்பக்கூடிய Jina `{image: "data:..."}` உடற்பகுதியை OmniRoute இன்னமும் நிராகரிக்கிறது. எனவே அதிகாரப்பூர்வ `{type,source}` திட்டவடிவம் இல்லாமல், Jina-இணக்க கிளையன்ட்களால் OmniRoute வழியாகப் படங்களை embed செய்ய முடியாது.

உரைக்கு `jina-ai/jina-embeddings-v5-omni-small`-ஐப் பயன்படுத்தவும். Memorix `base_url`-ஐ `https://api.jina.ai`-க்கு அமைக்க வேண்டாம் — OmniRoute-ஐ மட்டுமே ஒரே இடைநிலையாக வைத்திருக்கவும்.
