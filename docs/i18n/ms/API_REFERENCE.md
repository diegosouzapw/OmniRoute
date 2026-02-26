# Rujukan API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Rujukan lengkap untuk semua titik akhir API OmniRoute.

---

## Jadual Kandungan

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Image Generation](#image-generation)
- [List Models](#list-models)
- [Compatibility Endpoints](#compatibility-endpoints)
- [Semantic Cache](#semantic-cache)
- [Dashboard & Management](#dashboard--management)
- [Request Processing](#request-processing)
- [Authentication](#authentication)

---

## Selesai Sembang

```bash
POST /v1/chat/completions
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "cc/claude-opus-4-6",
  "messages": [
    {"role": "user", "content": "Write a function to..."}
  ],
  "stream": true
}
```

### Pengepala Tersuai

| Pengepala                | Arah         | Penerangan                                  |
| ------------------------ | ------------ | ------------------------------------------- |
| `X-OmniRoute-No-Cache`   | Permintaan   | Tetapkan kepada `true` untuk memintas cache |
| `X-OmniRoute-Progress`   | Permintaan   | Tetapkan kepada `true` untuk acara kemajuan |
| `Idempotency-Key`        | Permintaan   | Kekunci dedup (tetingkap 5s)                |
| `X-Request-Id`           | Permintaan   | Kunci pelupusan alternatif                  |
| `X-OmniRoute-Cache`      | Maklum balas | `HIT` atau `MISS` (bukan penstriman)        |
| `X-OmniRoute-Idempotent` | Maklum balas | `true` jika dinyahduplikasi                 |
| `X-OmniRoute-Progress`   | Maklum balas | `enabled` jika penjejakan kemajuan pada     |

---

## Pembenaman

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Pembekal yang tersedia: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Penjanaan Imej

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/dall-e-3",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Pembekal tersedia: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Senaraikan Model

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Titik Akhir Keserasian

| Kaedah   | Laluan                      | Format                  |
| -------- | --------------------------- | ----------------------- |
| POS      | `/v1/chat/completions`      | OpenAI                  |
| POS      | `/v1/messages`              | Antroppik               |
| POS      | `/v1/responses`             | Respons OpenAI          |
| POS      | `/v1/embeddings`            | OpenAI                  |
| POS      | `/v1/images/generations`    | OpenAI                  |
| DAPATKAN | `/v1/models`                | OpenAI                  |
| POS      | `/v1/messages/count_tokens` | Antroppik               |
| DAPATKAN | `/v1beta/models`            | Gemini                  |
| POS      | `/v1beta/models/{...path}`  | Gemini menjanaKandungan |
| POS      | `/v1/api/chat`              | Ollama                  |

### Laluan Penyedia Khusus

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Awalan pembekal ditambah secara automatik jika tiada. Model tidak sepadan mengembalikan `400`.

---

## Cache Semantik

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Contoh jawapan:

```json
{
  "semanticCache": {
    "memorySize": 42,
    "memoryMaxSize": 500,
    "dbSize": 128,
    "hitRate": 0.65
  },
  "idempotency": {
    "activeKeys": 3,
    "windowMs": 5000
  }
}
```

---

## Papan Pemuka & Pengurusan

### Pengesahan

| Titik akhir                   | Kaedah         | Penerangan                 |
| ----------------------------- | -------------- | -------------------------- |
| `/api/auth/login`             | POS            | Log masuk                  |
| `/api/auth/logout`            | POS            | Log keluar                 |
| `/api/settings/require-login` | DAPATKAN/LETAK | Togol log masuk diperlukan |

### Pengurusan Pembekal

| Titik akhir                  | Kaedah               | Penerangan                  |
| ---------------------------- | -------------------- | --------------------------- |
| `/api/providers`             | DAPATKAN/POS         | Senaraikan / buat pembekal  |
| `/api/providers/[id]`        | DAPATKAN/LETAK/PADAM | Urus pembekal               |
| `/api/providers/[id]/test`   | POS                  | Sambungan pembekal ujian    |
| `/api/providers/[id]/models` | DAPATKAN             | Senaraikan model pembekal   |
| `/api/providers/validate`    | POS                  | Sahkan konfigurasi pembekal |
| `/api/provider-nodes*`       | Pelbagai             | Pengurusan nod pembekal     |
| `/api/provider-models`       | DAPATKAN/POST/PADAM  | Model tersuai               |

### Aliran OAuth

| Titik akhir                      | Kaedah   | Penerangan            |
| -------------------------------- | -------- | --------------------- |
| `/api/oauth/[provider]/[action]` | Pelbagai | OAuth khusus pembekal |

### Penghalaan & Konfigurasi

| Titik akhir           | Kaedah       | Penerangan                            |
| --------------------- | ------------ | ------------------------------------- |
| `/api/models/alias`   | DAPATKAN/POS | Alias ​​model                         |
| `/api/models/catalog` | DAPATKAN     | Semua model mengikut pembekal + jenis |
| `/api/combos*`        | Pelbagai     | Pengurusan kombo                      |
| `/api/keys*`          | Pelbagai     | Pengurusan kunci API                  |
| `/api/pricing`        | DAPATKAN     | Harga model                           |

### Penggunaan & Analitis

| Titik akhir                 | Kaedah   | Penerangan                  |
| --------------------------- | -------- | --------------------------- |
| `/api/usage/history`        | DAPATKAN | Sejarah penggunaan          |
| `/api/usage/logs`           | DAPATKAN | Log penggunaan              |
| `/api/usage/request-logs`   | DAPATKAN | Log peringkat permintaan    |
| `/api/usage/[connectionId]` | DAPATKAN | Penggunaan setiap sambungan |

### Tetapan

| Titik akhir                     | Kaedah         | Penerangan                            |
| ------------------------------- | -------------- | ------------------------------------- |
| `/api/settings`                 | DAPATKAN/LETAK | Tetapan umum                          |
| `/api/settings/proxy`           | DAPATKAN/LETAK | Konfigurasi proksi rangkaian          |
| `/api/settings/proxy/test`      | POS            | Uji sambungan proksi                  |
| `/api/settings/ip-filter`       | DAPATKAN/LETAK | Senarai dibenarkan/senarai sekatan IP |
| `/api/settings/thinking-budget` | DAPATKAN/LETAK | Belanjawan token penaakulan           |
| `/api/settings/system-prompt`   | DAPATKAN/LETAK | Gesaan sistem global                  |

### Pemantauan

| Titik akhir              | Kaedah         | Penerangan                  |
| ------------------------ | -------------- | --------------------------- |
| `/api/sessions`          | DAPATKAN       | Penjejakan sesi aktif       |
| `/api/rate-limits`       | DAPATKAN       | Had kadar setiap akaun      |
| `/api/monitoring/health` | DAPATKAN       | Pemeriksaan kesihatan       |
| `/api/cache`             | DAPATKAN/PADAM | Statistik cache / kosongkan |

### Sandaran & Eksport/Import

| Titik akhir                 | Kaedah   | Penerangan                                               |
| --------------------------- | -------- | -------------------------------------------------------- |
| `/api/db-backups`           | DAPATKAN | Senaraikan sandaran yang tersedia                        |
| `/api/db-backups`           | LETAK    | Buat sandaran manual                                     |
| `/api/db-backups`           | POS      | Pulihkan daripada sandaran khusus                        |
| `/api/db-backups/export`    | DAPATKAN | Muat turun pangkalan data sebagai fail .sqlite           |
| `/api/db-backups/import`    | POS      | Muat naik fail .sqlite untuk menggantikan pangkalan data |
| `/api/db-backups/exportAll` | DAPATKAN | Muat turun sandaran penuh sebagai arkib .tar.gz          |

### Penyegerakan Awan

| Titik akhir            | Kaedah   | Penerangan                |
| ---------------------- | -------- | ------------------------- |
| `/api/sync/cloud`      | Pelbagai | Operasi penyegerakan awan |
| `/api/sync/initialize` | POS      | Mulakan penyegerakan      |
| `/api/cloud/*`         | Pelbagai | Pengurusan awan           |

### Alat CLI

| Titik akhir                        | Kaedah   | Penerangan             |
| ---------------------------------- | -------- | ---------------------- |
| `/api/cli-tools/claude-settings`   | DAPATKAN | Status CLI Claude      |
| `/api/cli-tools/codex-settings`    | DAPATKAN | Status Codex CLI       |
| `/api/cli-tools/droid-settings`    | DAPATKAN | Status Droid CLI       |
| `/api/cli-tools/openclaw-settings` | DAPATKAN | Status OpenClaw CLI    |
| `/api/cli-tools/runtime/[toolId]`  | DAPATKAN | Masa jalan CLI generik |

Respons CLI termasuk: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Had Ketahanan & Kadar

| Titik akhir             | Kaedah         | Penerangan                           |
| ----------------------- | -------------- | ------------------------------------ |
| `/api/resilience`       | DAPATKAN/LETAK | Dapatkan/kemas kini profil ketahanan |
| `/api/resilience/reset` | POS            | Tetapkan semula pemutus litar        |
| `/api/rate-limits`      | DAPATKAN       | Status had kadar setiap akaun        |
| `/api/rate-limit`       | DAPATKAN       | Konfigurasi had kadar global         |

### Evals

| Titik akhir  | Kaedah       | Penerangan                                 |
| ------------ | ------------ | ------------------------------------------ |
| `/api/evals` | DAPATKAN/POS | Senaraikan suite eval / penilaian jalankan |

### Dasar

| Titik akhir     | Kaedah              | Penerangan            |
| --------------- | ------------------- | --------------------- |
| `/api/policies` | DAPATKAN/POST/PADAM | Urus dasar penghalaan |

### Pematuhan

| Titik akhir                 | Kaedah   | Penerangan                       |
| --------------------------- | -------- | -------------------------------- |
| `/api/compliance/audit-log` | DAPATKAN | Log audit pematuhan (N terakhir) |

### v1beta (Serasi Gemini)

| Titik akhir                | Kaedah   | Penerangan                           |
| -------------------------- | -------- | ------------------------------------ |
| `/v1beta/models`           | DAPATKAN | Senaraikan model dalam format Gemini |
| `/v1beta/models/{...path}` | POS      | Gemini `generateContent` titik akhir |

Titik akhir ini mencerminkan format API Gemini untuk pelanggan yang mengharapkan keserasian SDK Gemini asli.

### API Dalaman / Sistem

| Titik akhir     | Kaedah   | Penerangan                                                   |
| --------------- | -------- | ------------------------------------------------------------ |
| `/api/init`     | DAPATKAN | Semakan permulaan aplikasi (digunakan pada larian pertama)   |
| `/api/tags`     | DAPATKAN | Tag model yang serasi dengan Ollama (untuk pelanggan Ollama) |
| `/api/restart`  | POS      | Pencetus pelayan anggun mulakan semula                       |
| `/api/shutdown` | POS      | Cetuskan penutupan pelayan yang anggun                       |

> **Nota:** Titik akhir ini digunakan secara dalaman oleh sistem atau untuk keserasian pelanggan Ollama. Mereka biasanya tidak dipanggil oleh pengguna akhir.

---

## Transkripsi Audio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transkripsikan fail audio menggunakan Deepgram atau AssemblyAI.

**Permintaan:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Jawapan:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Pembekal yang disokong:** `deepgram/nova-3`, `assemblyai/best`.

**Format yang disokong:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Keserasian Ollama

Untuk pelanggan yang menggunakan format API Ollama:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Permintaan diterjemahkan secara automatik antara Ollama dan format dalaman.

---

## Telemetri

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Jawapan:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Belanjawan

```bash
# Get budget status for all API keys
GET /api/usage/budget

# Set or update a budget
POST /api/usage/budget
Content-Type: application/json

{
  "keyId": "key-123",
  "limit": 50.00,
  "period": "monthly"
}
```

---

## Ketersediaan Model

```bash
# Get real-time model availability across all providers
GET /api/models/availability

# Check availability for a specific model
POST /api/models/availability
Content-Type: application/json

{
  "model": "claude-sonnet-4-5-20250929"
}
```

---

## Pemprosesan Permintaan

1. Pelanggan menghantar permintaan kepada `/v1/*`
2. Pengendali laluan memanggil `handleChat`, `handleEmbedding`, `handleAudioTranscription` atau `handleImageGeneration`
3. Model telah diselesaikan (pembekal langsung/model atau alias/kombo)
4. Bukti kelayakan dipilih daripada DB tempatan dengan penapisan ketersediaan akaun
5. Untuk sembang: `handleChatCore` — pengesanan format, terjemahan, semakan cache, semakan idempotensi
6. Pelaksana pembekal menghantar permintaan huluan
7. Respons diterjemahkan kembali kepada format pelanggan (sembang) atau dikembalikan seperti sedia ada (benam/imej/audio)
8. Penggunaan / pembalakan direkodkan
9. Fallback terpakai pada ralat mengikut peraturan kombo

Rujukan seni bina penuh: [link](ARCHITECTURE.md)

---

## Pengesahan

- Laluan papan pemuka (`/dashboard/*`) gunakan kuki `auth_token`
- Log masuk menggunakan cincang kata laluan yang disimpan; sandar kepada `INITIAL_PASSWORD`
- `requireLogin` boleh togol melalui `/api/settings/require-login`
- `/v1/*` laluan secara pilihan memerlukan kunci API Pembawa apabila `REQUIRE_API_KEY=true`
