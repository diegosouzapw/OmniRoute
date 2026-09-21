# Embeddings client runbook (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute, Hindsight 0.9.1 (yalnızca metin destekleyen `encode(list[str])`) ve Memorix 1.6.0'ın (Jina medya geçidi) önünde yer aldığında `POST /v1/embeddings` için operatör notları. 2026-08-17 tarihinde OmniRoute 3.8.49 ve `https://omniroute.jaguar-fish.ts.net/v1` üzerinde canlı olarak doğrulanmıştır. Aşağıda hiçbir gizli bilgi yoktur.

## Çalışan model kimlikleri

| İstemci kimliği                                | HTTP | Vektörler            | Boyut   | Notlar                                          |
| ---------------------------------------------- | ---- | -------------------- | ------- | ----------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | 2'li toplu işlem → 2 | 3072    | Yerel Gemini anahtarı olmadan çalışır           |
| `openrouter/google/gemini-embedding-2-preview` | 200  | 2'li toplu işlem → 2 | 3072    | Önizleme olmayan kimlikle aynı vektör uzayı     |
| `openrouter/google/gemini-embedding-001`       | 200  | 2'li toplu işlem → 2 | 3072    | `GET /v1/embeddings` içinde listelenir          |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | 2'li toplu işlem → 2 | 1024    | Standart Jina omni kimliği                      |
| `jina/jina-embeddings-v5-omni-small`           | 200  | 2'li toplu işlem → 2 | 1024    | Takma ad; yanıttaki `model`, `jina-ai/...` olur |
| `jina-embeddings-v5-omni-small`                | 200  | 2'li toplu işlem → 2 | 1024    | Öneksiz kimlik de çözümlenir                    |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1                | **768** | Small'dan farklı bir vektör uzayı               |

`GET /v1/models` ve `GET /v1/embeddings`,
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) ve
`openrouter/google/gemini-embedding-001` kimliklerini listeledi. Ancak bu kimlik
hâlihazırda hizmet veriyor olmasına rağmen
`openrouter/google/gemini-embedding-2` kimliğini listelemediler.

Nano (768 boyutlu) ve small (1024 boyutlu) modellerini aynı indekste
karıştırmayın. Birbirleriyle karşılaştırılabilir değillerdir.

## Bozuk / yanıltıcı kimlikler

### Yerel Gemini Embedding 2

İstek:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Gerçek sonuç (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` aynı 400 yanıtını döndürür. Özel bir sağlayıcı
düğümü `google` önekini kullanmadığı sürece `google/gemini-embedding-2`,
HTTP **400** `Unknown embedding provider: google` yanıtını döndürür.

Beklenen: `gemini` sağlayıcısında bir Google AI Studio anahtarıyla yerel
Gemini gömme işlemi veya çalışan OpenRouter kimliğini belirten bir 400 yanıtı.

Yeniden oluşturma (bearer değerini gizleyin):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Çalışan alternatif:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Yerel `gemini-embedding-2`, yalnızca GitOps aracılığıyla çalıştırılamaz. Bir
Google AI Studio anahtarı, `gemini` sağlayıcı bağlantısı olarak eklenmelidir
(pano veya OmniRoute'a içe aktarılan `GEMINI_API_KEY`). Bu gizli bilgi bu
depoda bulunmamaktadır.

### Jina çok modlu yolu

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

Bir takma ad kullanıma sunulana kadar `POST /v1/embeddings` kullanın.

### Jina / Memorix görüntü nesnesi

OmniRoute standart görüntü öğesi (28×28 PNG, 784 piksel — Jina 1×1'i reddeder):

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

Gerçek sonuç: HTTP **200**, 1 vektör, 1024 boyutlu.

Memorix 1.6.0 / Jina yerel biçimi:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Gerçek sonuç: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` ile `{ "image": "data:..." }` öğelerinin birlikte
kullanılması da aynı 400 yanıtını verir.

## İstemci notları

### Hindsight 0.9.1

Hindsight gömme işlemleri yalnızca metin destekler (`encode(list[str])`).
Görüntü nesneleri göndermez. Hindsight'ın OpenAI uyumlu gömme temel URL'sini
OmniRoute `/v1` olarak ayarlayın ve yukarıdaki tablodan çalışan bir kimlik
kullanın (`jina-ai/jina-embeddings-v5-omni-small` veya
`openrouter/google/gemini-embedding-2`). Ağ geçidinde bir `gemini` API
anahtarı bulunmadığı sürece modeli öneksiz `gemini-embedding-2` olarak
ayarlamayın.

### Memorix 1.6.0

Memorix yalnızca `/jina\.ai/i` ile eşleşen `baseUrl` değerlerini yerel medya
olarak işler. Model Jina omni olsa bile bir OmniRoute URL'si yalnızca metin
yolunda kalır. Bu geçit, Memorix istemcisiyle ilgili bir sorundur. Bundan
bağımsız olarak OmniRoute, geçit açılsaydı Memorix'in göndereceği Jina
`{image: "data:..."}` gövdesini yine reddeder; dolayısıyla Jina uyumlu
istemciler, standart `{type,source}` şeması olmadan OmniRoute üzerinden
görüntü gömme işlemi yapamaz.

Metin için `jina-ai/jina-embeddings-v5-omni-small` kullanın. Memorix
`base_url` değerini `https://api.jina.ai` olarak ayarlamayın — tek geçiş
noktası olarak OmniRoute'u kullanmaya devam edin.
