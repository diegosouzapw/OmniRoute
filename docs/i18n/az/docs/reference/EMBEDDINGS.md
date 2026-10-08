# Embeddings client runbook (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

OmniRoute Hindsight 0.9.1-in (yalnız mətn üçün `encode(list[str])`) və Memorix 1.6.0-ın (Jina media keçidi) qarşısında olduqda `POST /v1/embeddings` üçün operator qeydləri. 2026-08-17 tarixində OmniRoute 3.8.49 ilə `https://omniroute.jaguar-fish.ts.net/v1` ünvanında canlı şəkildə yoxlanılıb. Aşağıda heç bir məxfi məlumat yoxdur.

## İşlək model id-ləri

| Müştəri id-si                                  | HTTP | Vektorlar       | Ölçü    | Qeydlər                                            |
| ---------------------------------------------- | ---- | --------------- | ------- | -------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | 2-lik paket → 2 | 3072    | Doğma Gemini açarı olmadan işləyir                 |
| `openrouter/google/gemini-embedding-2-preview` | 200  | 2-lik paket → 2 | 3072    | Önizləmə olmayan id ilə eyni vektor fəzasındadır   |
| `openrouter/google/gemini-embedding-001`       | 200  | 2-lik paket → 2 | 3072    | `GET /v1/embeddings` siyahısında göstərilir        |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | 2-lik paket → 2 | 1024    | Kanonik Jina omni id-si                            |
| `jina/jina-embeddings-v5-omni-small`           | 200  | 2-lik paket → 2 | 1024    | Alias; cavabdakı `model` dəyəri `jina-ai/...` olur |
| `jina-embeddings-v5-omni-small`                | 200  | 2-lik paket → 2 | 1024    | Prefikssiz id də həll olunur                       |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1           | **768** | small modelindən fərqli vektor fəzasındadır        |

`GET /v1/models` və `GET /v1/embeddings` siyahılarında
`jina-ai/jina-embeddings-v5-omni-small` (1024),
`jina-ai/jina-embeddings-v5-omni-nano` (768) və
`openrouter/google/gemini-embedding-001` göstərilirdi. Həmin id artıq xidmət göstərsə də,
`openrouter/google/gemini-embedding-2` siyahıda **göstərilmirdi**.

nano (768 ölçülü) və small (1024 ölçülü) modellərini eyni indeksdə qarışdırmayın. Onlar
müqayisə edilə bilən deyil.

## İşləməyən / yanıltıcı id-lər

### Doğma Gemini Embedding 2

Sorğu:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Faktiki nəticə (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` eyni 400 cavabını qaytarır. Xüsusi provayder qovşağı
`google` prefiksindən istifadə etmədikdə `google/gemini-embedding-2`
HTTP **400** `Unknown embedding provider: google` cavabını qaytarır.

Gözlənilən: ya `gemini` provayderində Google AI Studio açarı ilə doğma Gemini
vektorlaşdırması, ya da işlək OpenRouter id-sini göstərən 400 cavabı.

Təkrarlamaq üçün (bearer dəyərini gizlədin):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

İşlək əvəzləyici:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

Doğma `gemini-embedding-2` yalnız GitOps vasitəsilə uğurla işləyə bilməz. Google AI
Studio açarı `gemini` provayder bağlantısı kimi əlavə edilməlidir (idarəetmə paneli
vasitəsilə və ya `GEMINI_API_KEY` OmniRoute-a idxal edilməklə). Həmin məxfi məlumat
bu repoda yoxdur.

### Jina multimodal yolu

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

Alias mövcud olana qədər `POST /v1/embeddings` istifadə edin.

### Jina / Memorix şəkil obyekti

OmniRoute-un kanonik şəkil elementi (28×28 PNG, 784 piksel — Jina 1×1 ölçüsünü rədd edir):

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

Faktiki nəticə: HTTP **200**, 1 vektor, 1024 ölçülü.

Memorix 1.6.0 / Jina-nın doğma formatı:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Faktiki nəticə: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` ilə `{ "image": "data:..." }` qarışığı da eyni 400 cavabını verir.

## Müştəri qeydləri

### Hindsight 0.9.1

Hindsight vektorlaşdırmaları yalnız mətn üçündür (`encode(list[str])`). O, şəkil
obyektləri göndərmir. Hindsight-ın OpenAI ilə uyğun vektorlaşdırma əsas URL-sini
OmniRoute `/v1` ünvanına yönəldin və yuxarıdakı cədvəldən işlək id istifadə edin
(`jina-ai/jina-embeddings-v5-omni-small` və ya
`openrouter/google/gemini-embedding-2`). Şlüzdə `gemini` API açarı mövcud deyilsə,
modeli prefikssiz `gemini-embedding-2` olaraq təyin etməyin.

### Memorix 1.6.0

Memorix yalnız `/jina\.ai/i` ilə uyğun gələn `baseUrl` dəyərini doğma media kimi
qəbul edir. Model Jina omni olsa belə, OmniRoute URL-si yalnız mətn yolunda qalır.
Bu keçid Memorix müştəri problemidir. Bundan asılı olmayaraq, keçid açılsa,
Memorix-in göndərəcəyi Jina `{image: "data:..."}` gövdəsi OmniRoute tərəfindən yenə
də rədd edilir. Buna görə Jina ilə uyğun müştərilər kanonik `{type,source}` sxemi
olmadan OmniRoute vasitəsilə şəkilləri vektorlaşdıra bilməz.

Mətn üçün `jina-ai/jina-embeddings-v5-omni-small` istifadə edin. Memorix
`base_url` dəyərini `https://api.jina.ai` ünvanına yönəltməyin — yeganə keçid kimi
OmniRoute-u saxlayın.
