# Embeddings client runbook (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/EMBEDDINGS.md) · 🇪🇹 [am](../../../am/docs/reference/EMBEDDINGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/EMBEDDINGS.md) · 🇦🇿 [az](../../../az/docs/reference/EMBEDDINGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/EMBEDDINGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/EMBEDDINGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/EMBEDDINGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/EMBEDDINGS.md) · 🇩🇰 [da](../../../da/docs/reference/EMBEDDINGS.md) · 🇩🇪 [de](../../../de/docs/reference/EMBEDDINGS.md) · 🇬🇷 [el](../../../el/docs/reference/EMBEDDINGS.md) · 🇪🇸 [es](../../../es/docs/reference/EMBEDDINGS.md) · 🇪🇪 [et](../../../et/docs/reference/EMBEDDINGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/EMBEDDINGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/EMBEDDINGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/EMBEDDINGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/EMBEDDINGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/EMBEDDINGS.md) · 🇮🇱 [he](../../../he/docs/reference/EMBEDDINGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/EMBEDDINGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/EMBEDDINGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/EMBEDDINGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/EMBEDDINGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/EMBEDDINGS.md) · 🇮🇹 [it](../../../it/docs/reference/EMBEDDINGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/EMBEDDINGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/EMBEDDINGS.md) · 🇰🇭 [km](../../../km/docs/reference/EMBEDDINGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/EMBEDDINGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/EMBEDDINGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/EMBEDDINGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/EMBEDDINGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/EMBEDDINGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/EMBEDDINGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/EMBEDDINGS.md) · 🇲🇲 [my](../../../my/docs/reference/EMBEDDINGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/EMBEDDINGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/EMBEDDINGS.md) · 🇳🇴 [no](../../../no/docs/reference/EMBEDDINGS.md) · 🇮🇳 [or](../../../or/docs/reference/EMBEDDINGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/EMBEDDINGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/EMBEDDINGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/EMBEDDINGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/EMBEDDINGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/EMBEDDINGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/EMBEDDINGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/EMBEDDINGS.md) · 🇱🇰 [si](../../../si/docs/reference/EMBEDDINGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/EMBEDDINGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/EMBEDDINGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/EMBEDDINGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/EMBEDDINGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/EMBEDDINGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/EMBEDDINGS.md) · 🇮🇳 [te](../../../te/docs/reference/EMBEDDINGS.md) · 🇹🇭 [th](../../../th/docs/reference/EMBEDDINGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/EMBEDDINGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/EMBEDDINGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/EMBEDDINGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/EMBEDDINGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/EMBEDDINGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/EMBEDDINGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/EMBEDDINGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/EMBEDDINGS.md)

---

Catatan operator untuk `POST /v1/embeddings` ketika OmniRoute berada di depan
Hindsight 0.9.1 (`encode(list[str])` khusus teks) dan Memorix 1.6.0 (gerbang
media Jina). Diverifikasi langsung pada 2026-08-17 terhadap OmniRoute 3.8.49 di
`https://omniroute.jaguar-fish.ts.net/v1`. Tidak ada rahasia di bawah ini.

## ID model yang berfungsi

| ID klien                                       | HTTP | Vektor      | Dimensi | Catatan                                           |
| ---------------------------------------------- | ---- | ----------- | ------- | ------------------------------------------------- |
| `openrouter/google/gemini-embedding-2`         | 200  | batch 2 → 2 | 3072    | Berfungsi tanpa kunci Gemini native               |
| `openrouter/google/gemini-embedding-2-preview` | 200  | batch 2 → 2 | 3072    | Ruang yang sama dengan ID non-preview             |
| `openrouter/google/gemini-embedding-001`       | 200  | batch 2 → 2 | 3072    | Tercantum di `GET /v1/embeddings`                 |
| `jina-ai/jina-embeddings-v5-omni-small`        | 200  | batch 2 → 2 | 1024    | ID omni Jina kanonis                              |
| `jina/jina-embeddings-v5-omni-small`           | 200  | batch 2 → 2 | 1024    | Alias; `model` dalam respons adalah `jina-ai/...` |
| `jina-embeddings-v5-omni-small`                | 200  | batch 2 → 2 | 1024    | ID tanpa prefiks juga dapat diresolusikan         |
| `jina-ai/jina-embeddings-v5-omni-nano`         | 200  | 1 → 1       | **768** | Ruang vektor berbeda dari small                   |

`GET /v1/models` dan `GET /v1/embeddings` mencantumkan
`jina-ai/jina-embeddings-v5-omni-small` (1024) dan
`jina-ai/jina-embeddings-v5-omni-nano` (768), serta
`openrouter/google/gemini-embedding-001`. Keduanya **tidak** mencantumkan
`openrouter/google/gemini-embedding-2`, meskipun ID tersebut sudah dapat digunakan.

Jangan mencampur nano (768-d) dan small (1024-d) dalam satu indeks. Keduanya
tidak dapat dibandingkan.

## ID yang rusak / menyesatkan

### Gemini Embedding 2 native

Permintaan:

```json
{ "model": "gemini-embedding-2", "input": ["alpha", "beta"] }
```

Hasil aktual (2026-08-17): HTTP **400**

```json
{
  "error": {
    "message": "No credentials for embedding provider: gemini",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`gemini/gemini-embedding-2` mengembalikan 400 yang sama.
`google/gemini-embedding-2` mengembalikan HTTP **400**
`Unknown embedding provider: google`, kecuali node penyedia khusus menggunakan
prefiks `google`.

Hasil yang diharapkan: embedding Gemini native dengan kunci Google AI Studio
pada penyedia `gemini`, atau respons 400 yang menyebutkan ID OpenRouter yang
berfungsi.

Reproduksi (samarkan bearer):

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

`gemini-embedding-2` native tidak dapat berfungsi hanya melalui GitOps. Kunci
Google AI Studio harus ditambahkan sebagai koneksi penyedia `gemini` (melalui
dasbor atau `GEMINI_API_KEY` yang diimpor ke OmniRoute). Rahasia tersebut tidak
ada dalam repo ini.

### Jalur multimodal Jina

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

Gunakan `POST /v1/embeddings` hingga tersedia alias.

### Objek gambar Jina / Memorix

Item gambar kanonis OmniRoute (PNG 28×28, 784 piksel — Jina menolak 1×1):

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

Hasil aktual: HTTP **200**, 1 vektor, 1024-d.

Format native Memorix 1.6.0 / Jina:

```json
{
  "model": "jina-ai/jina-embeddings-v5-omni-small",
  "input": [{ "image": "data:image/png;base64,<base64-png>" }]
}
```

Hasil aktual: HTTP **400**

```json
{
  "error": {
    "message": "Invalid request",
    "type": "invalid_request_error",
    "code": "bad_request"
  }
}
```

`{ "text": "..." }` yang dicampur dengan `{ "image": "data:..." }` menghasilkan
400 yang sama.

## Catatan klien

### Hindsight 0.9.1

Embedding Hindsight hanya mendukung teks (`encode(list[str])`). Hindsight tidak
mengirim objek gambar. Arahkan URL dasar embedding yang kompatibel dengan OpenAI
milik Hindsight ke `/v1` OmniRoute dan gunakan ID yang berfungsi dari tabel di
atas (`jina-ai/jina-embeddings-v5-omni-small` atau
`openrouter/google/gemini-embedding-2`). Jangan atur model ke
`gemini-embedding-2` tanpa prefiks, kecuali tersedia kunci API `gemini` pada
gateway.

### Memorix 1.6.0

Memorix hanya memperlakukan `baseUrl` yang cocok dengan `/jina\.ai/i` sebagai
media native. URL OmniRoute tetap menggunakan jalur khusus teks, bahkan ketika
modelnya adalah Jina omni. Gerbang tersebut merupakan masalah pada klien
Memorix. Terlepas dari itu, OmniRoute tetap menolak isi permintaan Jina
`{image: "data:..."}` yang akan dikirim Memorix jika gerbang terbuka. Oleh karena
itu, klien yang kompatibel dengan Jina tidak dapat menghasilkan embedding
gambar melalui OmniRoute tanpa skema kanonis `{type,source}`.

Gunakan `jina-ai/jina-embeddings-v5-omni-small` untuk teks. Jangan arahkan
`base_url` Memorix ke `https://api.jina.ai` — pertahankan OmniRoute sebagai
satu-satunya perantara.
