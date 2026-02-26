# Referensi API

🌐 **Languages:** 🇺🇸 [English](../../API_REFERENCE.md) | 🇧🇷 [Português (Brasil)](../pt-BR/API_REFERENCE.md) | 🇪🇸 [Español](../es/API_REFERENCE.md) | 🇫🇷 [Français](../fr/API_REFERENCE.md) | 🇮🇹 [Italiano](../it/API_REFERENCE.md) | 🇷🇺 [Русский](../ru/API_REFERENCE.md) | 🇨🇳 [中文 (简体)](../zh-CN/API_REFERENCE.md) | 🇩🇪 [Deutsch](../de/API_REFERENCE.md) | 🇮🇳 [हिन्दी](../in/API_REFERENCE.md) | 🇹🇭 [ไทย](../th/API_REFERENCE.md) | 🇺🇦 [Українська](../uk-UA/API_REFERENCE.md) | 🇸🇦 [العربية](../ar/API_REFERENCE.md) | 🇯🇵 [日本語](../ja/API_REFERENCE.md) | 🇻🇳 [Tiếng Việt](../vi/API_REFERENCE.md) | 🇧🇬 [Български](../bg/API_REFERENCE.md) | 🇩🇰 [Dansk](../da/API_REFERENCE.md) | 🇫🇮 [Suomi](../fi/API_REFERENCE.md) | 🇮🇱 [עברית](../he/API_REFERENCE.md) | 🇭🇺 [Magyar](../hu/API_REFERENCE.md) | 🇮🇩 [Bahasa Indonesia](../id/API_REFERENCE.md) | 🇰🇷 [한국어](../ko/API_REFERENCE.md) | 🇲🇾 [Bahasa Melayu](../ms/API_REFERENCE.md) | 🇳🇱 [Nederlands](../nl/API_REFERENCE.md) | 🇳🇴 [Norsk](../no/API_REFERENCE.md) | 🇵🇹 [Português (Portugal)](../pt/API_REFERENCE.md) | 🇷🇴 [Română](../ro/API_REFERENCE.md) | 🇵🇱 [Polski](../pl/API_REFERENCE.md) | 🇸🇰 [Slovenčina](../sk/API_REFERENCE.md) | 🇸🇪 [Svenska](../sv/API_REFERENCE.md) | 🇵🇭 [Filipino](../phi/API_REFERENCE.md)

Referensi lengkap untuk semua titik akhir OmniRoute API.

---

## Daftar Isi

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

## Penyelesaian Obrolan

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

### Header Khusus

| Tajuk                    | Arah       | Deskripsi                              |
| ------------------------ | ---------- | -------------------------------------- |
| `X-OmniRoute-No-Cache`   | Permintaan | Setel ke `true` untuk melewati cache   |
| `X-OmniRoute-Progress`   | Permintaan | Setel ke `true` untuk acara kemajuan   |
| `Idempotency-Key`        | Permintaan | Kunci Dedup (jendela 5 detik)          |
| `X-Request-Id`           | Permintaan | Kunci dedup alternatif                 |
| `X-OmniRoute-Cache`      | Tanggapan  | `HIT` atau `MISS` (non-streaming)      |
| `X-OmniRoute-Idempotent` | Tanggapan  | `true` jika duplikatnya                |
| `X-OmniRoute-Progress`   | Tanggapan  | `enabled` jika pelacakan kemajuan pada |

---

## Penyematan

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Penyedia yang tersedia: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Pembuatan Gambar

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

Penyedia yang tersedia: OpenAI (DALL-E), xAI (Grok Image), Together AI (FLUX), Fireworks AI.

```bash
# List all image models
GET /v1/images/generations
```

---

## Daftar Model

```bash
GET /v1/models
Authorization: Bearer your-api-key

→ Returns all chat, embedding, and image models + combos in OpenAI format
```

---

## Titik Akhir Kompatibilitas

| Metode   | Jalur                       | Format                     |
| -------- | --------------------------- | -------------------------- |
| POSTING  | `/v1/chat/completions`      | OpenAI                     |
| POSTING  | `/v1/messages`              | Antropik                   |
| POSTING  | `/v1/responses`             | Tanggapan OpenAI           |
| POSTING  | `/v1/embeddings`            | OpenAI                     |
| POSTING  | `/v1/images/generations`    | OpenAI                     |
| DAPATKAN | `/v1/models`                | OpenAI                     |
| POSTING  | `/v1/messages/count_tokens` | Antropik                   |
| DAPATKAN | `/v1beta/models`            | kembar                     |
| POSTING  | `/v1beta/models/{...path}`  | Gemini menghasilkan Konten |
| POSTING  | `/v1/api/chat`              | Ollama                     |

### Rute Penyedia Khusus

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Awalan penyedia ditambahkan secara otomatis jika tidak ada. Model yang tidak cocok menampilkan `400`.

---

## Cache Semantik

```bash
# Get cache stats
GET /api/cache

# Clear all caches
DELETE /api/cache
```

Contoh tanggapan:

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

## Dasbor & Manajemen

### Otentikasi

| Titik akhir                   | Metode            | Deskripsi                |
| ----------------------------- | ----------------- | ------------------------ |
| `/api/auth/login`             | POSTING           | Masuk                    |
| `/api/auth/logout`            | POSTING           | Keluar                   |
| `/api/settings/require-login` | DAPATKAN/MASUKKAN | Beralih login diperlukan |

### Manajemen Penyedia

| Titik akhir                  | Metode                  | Deskripsi                     |
| ---------------------------- | ----------------------- | ----------------------------- |
| `/api/providers`             | DAPATKAN/POSTING        | Daftar / buat penyedia        |
| `/api/providers/[id]`        | DAPATKAN/MASUKKAN/HAPUS | Kelola penyedia               |
| `/api/providers/[id]/test`   | POSTING                 | Koneksi penyedia tes          |
| `/api/providers/[id]/models` | DAPATKAN                | Daftar model penyedia         |
| `/api/providers/validate`    | POSTING                 | Validasi konfigurasi penyedia |
| `/api/provider-nodes*`       | Berbagai                | Manajemen node penyedia       |
| `/api/provider-models`       | DAPATKAN/POSTING/HAPUS  | Model khusus                  |

### Alur OAuth

| Titik akhir                      | Metode   | Deskripsi             |
| -------------------------------- | -------- | --------------------- |
| `/api/oauth/[provider]/[action]` | Berbagai | OAuth khusus penyedia |

### Perutean & Konfigurasi

| Titik akhir           | Metode           | Deskripsi                               |
| --------------------- | ---------------- | --------------------------------------- |
| `/api/models/alias`   | DAPATKAN/POSTING | Alias ​​model                           |
| `/api/models/catalog` | DAPATKAN         | Semua model berdasarkan penyedia + tipe |
| `/api/combos*`        | Berbagai         | Manajemen kombo                         |
| `/api/keys*`          | Berbagai         | Manajemen kunci API                     |
| `/api/pricing`        | DAPATKAN         | Penetapan harga model                   |

### Penggunaan & Analisis

| Titik akhir                 | Metode   | Deskripsi              |
| --------------------------- | -------- | ---------------------- |
| `/api/usage/history`        | DAPATKAN | Riwayat penggunaan     |
| `/api/usage/logs`           | DAPATKAN | Log penggunaan         |
| `/api/usage/request-logs`   | DAPATKAN | Log tingkat permintaan |
| `/api/usage/[connectionId]` | DAPATKAN | Penggunaan per koneksi |

### Pengaturan

| Titik akhir                     | Metode            | Deskripsi                              |
| ------------------------------- | ----------------- | -------------------------------------- |
| `/api/settings`                 | DAPATKAN/MASUKKAN | Pengaturan umum                        |
| `/api/settings/proxy`           | DAPATKAN/MASUKKAN | Konfigurasi proksi jaringan            |
| `/api/settings/proxy/test`      | POSTING           | Uji koneksi proxy                      |
| `/api/settings/ip-filter`       | DAPATKAN/MASUKKAN | Daftar IP yang diizinkan/daftar blokir |
| `/api/settings/thinking-budget` | DAPATKAN/MASUKKAN | Penalaran anggaran token               |
| `/api/settings/system-prompt`   | DAPATKAN/MASUKKAN | Perintah sistem global                 |

### Pemantauan

| Titik akhir              | Metode         | Deskripsi               |
| ------------------------ | -------------- | ----------------------- |
| `/api/sessions`          | DAPATKAN       | Pelacakan sesi aktif    |
| `/api/rate-limits`       | DAPATKAN       | Batas tarif per akun    |
| `/api/monitoring/health` | DAPATKAN       | Pemeriksaan kesehatan   |
| `/api/cache`             | DAPATKAN/HAPUS | Statistik cache / hapus |

### Cadangkan & Ekspor/Impor

| Titik akhir                 | Metode   | Deskripsi                                       |
| --------------------------- | -------- | ----------------------------------------------- |
| `/api/db-backups`           | DAPATKAN | Daftar cadangan yang tersedia                   |
| `/api/db-backups`           | TETAPKAN | Buat cadangan manual                            |
| `/api/db-backups`           | POSTING  | Pulihkan dari cadangan tertentu                 |
| `/api/db-backups/export`    | DAPATKAN | Unduh database sebagai file .sqlite             |
| `/api/db-backups/import`    | POSTING  | Unggah file .sqlite untuk menggantikan database |
| `/api/db-backups/exportAll` | DAPATKAN | Unduh cadangan lengkap sebagai arsip .tar.gz    |

### Sinkronisasi Awan

| Titik akhir            | Metode   | Deskripsi                  |
| ---------------------- | -------- | -------------------------- |
| `/api/sync/cloud`      | Berbagai | Operasi sinkronisasi cloud |
| `/api/sync/initialize` | POSTING  | Inisialisasi sinkronisasi  |
| `/api/cloud/*`         | Berbagai | Manajemen awan             |

### Alat CLI

| Titik akhir                        | Metode   | Deskripsi                |
| ---------------------------------- | -------- | ------------------------ |
| `/api/cli-tools/claude-settings`   | DAPATKAN | Status Claude CLI        |
| `/api/cli-tools/codex-settings`    | DAPATKAN | Status CLI Kodeks        |
| `/api/cli-tools/droid-settings`    | DAPATKAN | Status CLI Droid         |
| `/api/cli-tools/openclaw-settings` | DAPATKAN | Status CLI OpenClaw      |
| `/api/cli-tools/runtime/[toolId]`  | DAPATKAN | Waktu proses CLI generik |

Respons CLI meliputi: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Ketahanan & Batas Nilai

| Titik akhir             | Metode            | Deskripsi                          |
| ----------------------- | ----------------- | ---------------------------------- |
| `/api/resilience`       | DAPATKAN/MASUKKAN | Dapatkan/perbarui profil ketahanan |
| `/api/resilience/reset` | POSTING           | Setel ulang pemutus sirkuit        |
| `/api/rate-limits`      | DAPATKAN          | Status batas tarif per akun        |
| `/api/rate-limit`       | DAPATKAN          | Konfigurasi batas tarif global     |

### Evaluasi

| Titik akhir  | Metode           | Deskripsi                            |
| ------------ | ---------------- | ------------------------------------ |
| `/api/evals` | DAPATKAN/POSTING | Daftar eval suites/jalankan evaluasi |

### Kebijakan

| Titik akhir     | Metode                 | Deskripsi                 |
| --------------- | ---------------------- | ------------------------- |
| `/api/policies` | DAPATKAN/POSTING/HAPUS | Kelola kebijakan perutean |

### Kepatuhan

| Titik akhir                 | Metode   | Deskripsi                        |
| --------------------------- | -------- | -------------------------------- |
| `/api/compliance/audit-log` | DAPATKAN | Log audit kepatuhan (N terakhir) |

### v1beta (Kompatibel dengan Gemini)

| Titik akhir                | Metode   | Deskripsi                            |
| -------------------------- | -------- | ------------------------------------ |
| `/v1beta/models`           | DAPATKAN | Daftar model dalam format Gemini     |
| `/v1beta/models/{...path}` | POSTING  | Titik akhir Gemini `generateContent` |

Titik akhir ini mencerminkan format API Gemini untuk klien yang mengharapkan kompatibilitas asli Gemini SDK.

### API Internal/Sistem

| Titik akhir     | Metode   | Deskripsi                                                                  |
| --------------- | -------- | -------------------------------------------------------------------------- |
| `/api/init`     | DAPATKAN | Pemeriksaan inisialisasi aplikasi (digunakan saat pertama kali dijalankan) |
| `/api/tags`     | DAPATKAN | Tag model yang kompatibel dengan Ollama (untuk klien Ollama)               |
| `/api/restart`  | POSTING  | Memicu restart server dengan anggun                                        |
| `/api/shutdown` | POSTING  | Memicu penutupan server dengan baik                                        |

> **Catatan:** Titik akhir ini digunakan secara internal oleh sistem atau untuk kompatibilitas klien Ollama. Mereka biasanya tidak dipanggil oleh pengguna akhir.

---

## Transkripsi Audio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transkripsikan file audio menggunakan Deepgram atau AssemblyAI.

**Permintaan:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Respon:**

```json
{
  "text": "Hello, this is the transcribed audio content.",
  "task": "transcribe",
  "language": "en",
  "duration": 12.5
}
```

**Penyedia yang didukung:** `deepgram/nova-3`, `assemblyai/best`.

**Format yang didukung:** `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`.

---

## Kompatibilitas Ollama

Untuk klien yang menggunakan format API Ollama:

```bash
# Chat endpoint (Ollama format)
POST /v1/api/chat

# Model listing (Ollama format)
GET /api/tags
```

Permintaan secara otomatis diterjemahkan antara Ollama dan format internal.

---

## Telemetri

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Respon:**

```json
{
  "providers": {
    "claudeCode": { "p50": 245, "p95": 890, "p99": 1200, "count": 150 },
    "github": { "p50": 180, "p95": 620, "p99": 950, "count": 320 }
  }
}
```

---

## Anggaran

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

## Pemrosesan Permintaan

1. Klien mengirimkan permintaan ke `/v1/*`
2. Pengendali rute memanggil `handleChat`, `handleEmbedding`, `handleAudioTranscription`, atau `handleImageGeneration`
3. Model terselesaikan (penyedia/model langsung atau alias/kombo)
4. Kredensial dipilih dari DB lokal dengan pemfilteran ketersediaan akun
5. Untuk obrolan: `handleChatCore` — deteksi format, terjemahan, pemeriksaan cache, pemeriksaan idempotensi
6. Pelaksana penyedia mengirimkan permintaan upstream
7. Respons diterjemahkan kembali ke format klien (obrolan) atau dikembalikan apa adanya (embeddings/images/audio)
8. Penggunaan/logging dicatat
9. Fallback berlaku pada error sesuai dengan aturan kombo

Referensi arsitektur lengkap: [link](ARCHITECTURE.md)

---

## Otentikasi

- Rute dasbor (`/dashboard/*`) menggunakan cookie `auth_token`
- Login menggunakan hash kata sandi yang disimpan; mundur ke `INITIAL_PASSWORD`
- `requireLogin` dapat dialihkan melalui `/api/settings/require-login`
- Rute `/v1/*` secara opsional memerlukan kunci API Pembawa ketika `REQUIRE_API_KEY=true`
