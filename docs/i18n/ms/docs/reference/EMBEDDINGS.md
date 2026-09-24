# Embeddings client runbook (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇮🇩 [id](../../../id/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Nota pengendali untuk `POST /v1/embeddings` apabila OmniRoute berada di hadapan
Hindsight 0.9.1 (`encode(list[str])` teks sahaja) dan Memorix 1.6.0 (gerbang media
Jina). Disahkan secara langsung pada 2026-08-17 terhadap OmniRoute 3.8.49 di
`https://omniroute.jaguar-fish.ts.net/v1`. Tiada rahsia di bawah.

## Id model yang berfungsi

| Id klien                                       | HTTP | Vektor         | Dimensi | Nota                                       |
| ---------------------------------------------- | ---- | -------------- | ------- | ------------------------------------------ |
| `openrouter/google/gemini-embedding-2`         | 200  | kelompok 2 → 2 | 3072    | Berfungsi tanpa kunci Gemini natif         |
| `openrouter/google/gemini-embedding-2-preview` | 200  | kelompok 2 → 2 | 3072    | Ruang yang sama seperti id bukan pratonton |
| `openrouter/google/gemini-embedding-001`       | 200  | kelompok 2 → 2 | 3072    | Disenaraikan dalam `GET /v1/embeddings`    |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | kelompok 2 → 2 | 1024    | Id omni Jina kanonik                       |
| `jina/jina-embeddings-v5-omni-small`           | 200  | kelompok 2 → 2 | 1024    | Alias; `model` respons ialah `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | kelompok 2 → 2 | 1024    | Id tanpa awalan turut dapat diselesaikan   |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1          | **768** | Ruang vektor yang berbeza daripada small   |

`GET /v1/models` dan `GET /v1/embeddings` menyenaraikan
`jina-ai/jina-embeddings-v5-omni-small` (1024) dan
`jina-ai/jina-embeddings-v5-omni-nano` (768) serta
`openrouter/google/gemini-embedding-001`. Kedua-duanya **tidak** menyenaraikan
`openrouter/google/gemini-embedding-2` walaupun id tersebut sudah dapat digunakan.

Jangan campurkan nano (768-d) dan small (1024-d) dalam satu indeks. Kedua-duanya
tidak boleh dibandingkan.

## Id yang rosak / mengelirukan

### Gemini Embedding 2 natif

Permintaan:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Keadaan sebenar (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` mengembalikan 400 yang sama. `google/gemini-embedding-2`
mengembalikan HTTP **400** `Unknown embedding provider: google` melainkan nod
penyedia tersuai menggunakan awalan `google`.

Jangkaan: sama ada pembenaman Gemini natif dengan kunci Google AI Studio pada
penyedia `gemini`, atau 400 yang menyatakan id OpenRouter yang berfungsi.

Penghasilan semula (padamkan token pembawa):

```bash
curl -sS -D- https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"gemini-embedding-2","input":["alpha","beta"]}'
```

Pengganti yang berfungsi:

```bash
curl -sS https://omniroute.example/v1/embeddings \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"openrouter/google/gemini-embedding-2","input":["alpha","beta"]}'
```

`gemini-embedding-2` natif tidak boleh berjaya melalui GitOps sahaja. Kunci Google AI
Studio mesti ditambahkan sebagai sambungan penyedia `gemini` (papan pemuka atau
`GEMINI_API_KEY` yang diimport ke dalam OmniRoute). Rahsia itu tiada dalam repo ini.

### Laluan multimodal Jina

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

Gunakan `POST /v1/embeddings` sehingga alias tersedia.

### Objek imej Jina / Memorix

Item imej kanonik OmniRoute (PNG 28×28, 784 piksel — Jina menolak 1×1):

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

Keadaan sebenar: HTTP **200**, 1 vektor, 1024-d.

Bentuk natif Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Keadaan sebenar: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` yang dicampurkan dengan `{ "image": "data:..." }` menghasilkan 400 yang sama.

## Nota klien

### Hindsight 0.9.1

Pembenaman Hindsight adalah untuk teks sahaja (`encode(list[str])`). Ia tidak menghantar
objek imej. Halakan URL asas pembenaman serasi OpenAI milik Hindsight ke
`/v1` OmniRoute dan gunakan id yang berfungsi daripada jadual di atas
(`jina-ai/jina-embeddings-v5-omni-small` atau
`openrouter/google/gemini-embedding-2`). Jangan tetapkan model kepada
`gemini-embedding-2` tanpa awalan melainkan kunci API `gemini` wujud pada get laluan.

### Memorix 1.6.0

Memorix hanya menganggap `baseUrl` yang sepadan dengan `/jina\.ai/i` sebagai media natif. URL
OmniRoute kekal pada laluan teks sahaja walaupun modelnya ialah Jina omni.
Gerbang tersebut ialah isu klien Memorix. Secara berasingan, OmniRoute masih menolak
badan Jina `{image: "data:..."}` yang akan dihantar oleh Memorix jika gerbang tersebut
dibuka, maka klien serasi Jina tidak boleh membenamkan imej melalui OmniRoute
tanpa skema kanonik `{type,source}`.

Gunakan `jina-ai/jina-embeddings-v5-omni-small` untuk teks. Jangan halakan `base_url`
Memorix ke `https://api.jina.ai` — kekalkan OmniRoute sebagai satu-satunya perantara.
