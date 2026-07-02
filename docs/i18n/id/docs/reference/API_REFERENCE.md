# Referensi API (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/API_REFERENCE.md) · 🇸🇦 [ar](../../ar/docs/API_REFERENCE.md) · 🇧🇬 [bg](../../bg/docs/API_REFERENCE.md) · 🇧🇩 [bn](../../bn/docs/API_REFERENCE.md) · 🇨🇿 [cs](../../cs/docs/API_REFERENCE.md) · 🇩🇰 [da](../../da/docs/API_REFERENCE.md) · 🇩🇪 [de](../../de/docs/API_REFERENCE.md) · 🇪🇸 [es](../../es/docs/API_REFERENCE.md) · 🇮🇷 [fa](../../fa/docs/API_REFERENCE.md) · 🇫🇮 [fi](../../fi/docs/API_REFERENCE.md) · 🇫🇷 [fr](../../fr/docs/API_REFERENCE.md) · 🇮🇳 [gu](../../gu/docs/API_REFERENCE.md) · 🇮🇱 [he](../../he/docs/API_REFERENCE.md) · 🇮🇳 [hi](../../hi/docs/API_REFERENCE.md) · 🇭🇺 [hu](../../hu/docs/API_REFERENCE.md) · 🇮🇩 [id](../../id/docs/API_REFERENCE.md) · 🇮🇹 [it](../../it/docs/API_REFERENCE.md) · 🇯🇵 [ja](../../ja/docs/API_REFERENCE.md) · 🇰🇷 [ko](../../ko/docs/API_REFERENCE.md) · 🇮🇳 [mr](../../mr/docs/API_REFERENCE.md) · 🇲🇾 [ms](../../ms/docs/API_REFERENCE.md) · 🇳🇱 [nl](../../nl/docs/API_REFERENCE.md) · 🇳🇴 [no](../../no/docs/API_REFERENCE.md) · 🇵🇭 [phi](../../phi/docs/API_REFERENCE.md) · 🇵🇱 [pl](../../pl/docs/API_REFERENCE.md) · 🇵🇹 [pt](../../pt/docs/API_REFERENCE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/API_REFERENCE.md) · 🇷🇴 [ro](../../ro/docs/API_REFERENCE.md) · 🇷🇺 [ru](../../ru/docs/API_REFERENCE.md) · 🇸🇰 [sk](../../sk/docs/API_REFERENCE.md) · 🇸🇪 [sv](../../sv/docs/API_REFERENCE.md) · 🇰🇪 [sw](../../sw/docs/API_REFERENCE.md) · 🇮🇳 [ta](../../ta/docs/API_REFERENCE.md) · 🇮🇳 [te](../../te/docs/API_REFERENCE.md) · 🇹🇭 [th](../../th/docs/API_REFERENCE.md) · 🇹🇷 [tr](../../tr/docs/API_REFERENCE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/API_REFERENCE.md) · 🇵🇰 [ur](../../ur/docs/API_REFERENCE.md) · 🇻🇳 [vi](../../vi/docs/API_REFERENCE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/API_REFERENCE.md)

---

Referensi lengkap untuk semua titik akhir API OmniRoute.

---

## Daftar Isi

- [Chat Completions](#chat-completions)
- [Embeddings](#embeddings)
- [Pembuatan Gambar](#image-generation)
- [Daftar Model](#list-models)
- [Titik Akhir Kompatibilitas](#compatibility-endpoints)
- [Cache Semantik](#semantic-cache)
- [Dasbor & Manajemen](#dashboard--management)
- [Pemrosesan Permintaan](#request-processing)
- [Otentikasi](#authentication)

---

## Chat Completions

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

### Header Kustom

| Header                   | Arah      | Deskripsi                                                    |
| ------------------------ | --------- | ------------------------------------------------------------ |
| `X-OmniRoute-No-Cache`   | Permintaan | Atur ke `true` untuk melewati cache                          |
| `X-OmniRoute-Progress`   | Permintaan | Atur ke `true` untuk event progres                           |
| `X-Session-Id`           | Permintaan | Kunci sesi tetap untuk afinitas sesi eksternal               |
| `x_session_id`           | Permintaan | Varian garis bawah juga diterima (HTTP langsung)             |
| `Idempotency-Key`        | Permintaan | Kunci deduplikasi (jendela 5 detik)                          |
| `X-Request-Id`           | Permintaan | Kunci deduplikasi alternatif                                 |
| `X-OmniRoute-Cache`      | Respons   | `HIT` atau `MISS` (non-streaming)                            |
| `X-OmniRoute-Idempotent` | Respons   | `true` jika dideduplikasi                                    |
| `X-OmniRoute-Progress`   | Respons   | `enabled` jika pelacakan progres aktif                       |
| `X-OmniRoute-Session-Id` | Respons   | ID sesi efektif yang digunakan OmniRoute                     |

> Catatan Nginx: jika Anda mengandalkan header bergaris bawah (misalnya `x_session_id`), aktifkan `underscores_in_headers on;`.

---

## Embeddings

```bash
POST /v1/embeddings
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "nebius/Qwen/Qwen3-Embedding-8B",
  "input": "The food was delicious"
}
```

Penyedia yang tersedia: Nebius, OpenAI, Mistral, Together AI, Fireworks, NVIDIA, **OpenRouter**, **GitHub Models**.

```bash
# List all embedding models
GET /v1/embeddings
```

---

## Image Generation

```bash
POST /v1/images/generations
Authorization: Bearer your-api-key
Content-Type: application/json

{
  "model": "openai/gpt-image-2",
  "prompt": "A beautiful sunset over mountains",
  "size": "1024x1024"
}
```

Penyedia yang tersedia: OpenAI (GPT Image 2), xAI (Grok Image), Together AI (FLUX), Fireworks AI, Nebius (FLUX), Hyperbolic, NanoBanana, **OpenRouter**, SD WebUI (lokal), ComfyUI (lokal).

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

| Metode | Path                        | Format                 |
| ------ | --------------------------- | ---------------------- |
| POST   | `/v1/chat/completions`      | OpenAI                 |
| POST   | `/v1/messages`              | Anthropic              |
| POST   | `/v1/responses`             | OpenAI Responses       |
| POST   | `/v1/embeddings`            | OpenAI                 |
| POST   | `/v1/images/generations`    | OpenAI                 |
| GET    | `/v1/models`                | OpenAI                 |
| POST   | `/v1/messages/count_tokens` | Anthropic              |
| GET    | `/v1beta/models`            | Gemini                 |
| POST   | `/v1beta/models/{...path}`  | Gemini generateContent |
| POST   | `/v1/api/chat`              | Ollama                 |

### Rute Penyedia Khusus

```bash
POST /v1/providers/{provider}/chat/completions
POST /v1/providers/{provider}/embeddings
POST /v1/providers/{provider}/images/generations
```

Prefiks penyedia ditambahkan secara otomatis jika tidak ada. Model yang tidak cocok mengembalikan `400`.

---

## Cache Semantik

```bash
# Get cache stats
GET /api/cache/stats

# Clear all caches
DELETE /api/cache/stats
```

Contoh respons:

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

| Titik Akhir                   | Metode  | Deskripsi                          |
| ----------------------------- | ------- | ---------------------------------- |
| `/api/auth/login`             | POST    | Masuk                              |
| `/api/auth/logout`            | POST    | Keluar                             |
| `/api/settings/require-login` | GET/PUT | Aktifkan/nonaktifkan wajib login   |

### Manajemen Penyedia

| Titik Akhir                  | Metode                | Deskripsi                                                  |
| ---------------------------- | --------------------- | ---------------------------------------------------------- |
| `/api/providers`             | GET/POST              | Daftar / buat penyedia                                     |
| `/api/providers/[id]`        | GET/PUT/DELETE        | Kelola penyedia                                            |
| `/api/providers/[id]/test`   | POST                  | Uji koneksi penyedia                                       |
| `/api/providers/[id]/models` | GET                   | Daftar model penyedia                                      |
| `/api/providers/validate`    | POST                  | Validasi konfigurasi penyedia                              |
| `/api/provider-nodes*`       | Berbagai              | Manajemen simpul penyedia                                  |
| `/api/provider-models`       | GET/POST/PATCH/DELETE | Model kustom (tambah, perbarui, sembunyikan/tampilkan, hapus) |

### Alur OAuth

| Titik Akhir                      | Metode   | Deskripsi                     |
| -------------------------------- | -------- | ----------------------------- |
| `/api/oauth/[provider]/[action]` | Berbagai | OAuth khusus penyedia         |

### Perutean & Konfigurasi

| Titik Akhir           | Metode   | Deskripsi                           |
| --------------------- | -------- | ----------------------------------- |
| `/api/models/alias`   | GET/POST | Alias model                         |
| `/api/models/catalog` | GET      | Semua model berdasarkan penyedia + tipe |
| `/api/combos*`        | Berbagai | Manajemen combo                     |
| `/api/keys*`          | Berbagai | Manajemen kunci API                 |
| `/api/pricing`        | GET      | Harga model                         |

### Penggunaan & Analitik

| Titik Akhir                 | Metode | Deskripsi                      |
| --------------------------- | ------ | ------------------------------ |
| `/api/usage/history`        | GET    | Riwayat penggunaan             |
| `/api/usage/logs`           | GET    | Log penggunaan                 |
| `/api/usage/request-logs`   | GET    | Log tingkat permintaan         |
| `/api/usage/[connectionId]` | GET    | Penggunaan per koneksi         |

### Pengaturan

| Titik Akhir                     | Metode        | Deskripsi                       |
| ------------------------------- | ------------- | ------------------------------- |
| `/api/settings`                 | GET/PUT/PATCH | Pengaturan umum                 |
| `/api/settings/proxy`           | GET/PUT       | Konfigurasi proksi jaringan     |
| `/api/settings/proxy/test`      | POST          | Uji koneksi proksi              |
| `/api/settings/ip-filter`       | GET/PUT       | Daftar izin/blokir IP           |
| `/api/settings/thinking-budget` | GET/PUT       | Anggaran token penalaran        |
| `/api/settings/system-prompt`   | GET/PUT       | Prompt sistem global            |

### Pemantauan

| Titik Akhir              | Metode     | Deskripsi                                                                                                              |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| `/api/sessions`          | GET        | Pelacakan sesi aktif                                                                                                   |
| `/api/rate-limits`       | GET        | Batas laju per akun                                                                                                    |
| `/api/monitoring/health` | GET        | Pemeriksaan kesehatan + ringkasan penyedia (`catalogCount`, `configuredCount`, `activeCount`, `monitoredCount`)        |
| `/api/cache/stats`       | GET/DELETE | Statistik cache / hapus                                                                                                |

### Cadangan & Ekspor/Impor

| Titik Akhir                 | Metode | Deskripsi                                        |
| --------------------------- | ------ | ------------------------------------------------ |
| `/api/db-backups`           | GET    | Daftar cadangan yang tersedia                    |
| `/api/db-backups`           | PUT    | Buat cadangan manual                             |
| `/api/db-backups`           | POST   | Pulihkan dari cadangan tertentu                  |
| `/api/db-backups/export`    | GET    | Unduh database sebagai file .sqlite              |
| `/api/db-backups/import`    | POST   | Unggah file .sqlite untuk mengganti database     |
| `/api/db-backups/exportAll` | GET    | Unduh cadangan lengkap sebagai arsip .tar.gz     |

### Sinkronisasi Cloud

| Titik Akhir            | Metode   | Deskripsi                      |
| ---------------------- | -------- | ------------------------------ |
| `/api/sync/cloud`      | Berbagai | Operasi sinkronisasi cloud     |
| `/api/sync/initialize` | POST     | Inisialisasi sinkronisasi      |
| `/api/cloud/*`         | Berbagai | Manajemen cloud                |

### Terowongan

| Titik Akhir                | Metode | Deskripsi                                                                                       |
| -------------------------- | ------ | ----------------------------------------------------------------------------------------------- |
| `/api/tunnels/cloudflared` | GET    | Baca status instalasi/runtime Cloudflare Quick Tunnel untuk dasbor                              |
| `/api/tunnels/cloudflared` | POST   | Aktifkan atau nonaktifkan Cloudflare Quick Tunnel (`action=enable/disable`)                     |

### Alat CLI

| Titik Akhir                        | Metode | Deskripsi              |
| ---------------------------------- | ------ | ---------------------- |
| `/api/cli-tools/claude-settings`   | GET    | Status CLI Claude      |
| `/api/cli-tools/codex-settings`    | GET    | Status CLI Codex       |
| `/api/cli-tools/droid-settings`    | GET    | Status CLI Droid       |
| `/api/cli-tools/openclaw-settings` | GET    | Status CLI OpenClaw    |
| `/api/cli-tools/runtime/[toolId]`  | GET    | Runtime CLI generik    |

Respons CLI mencakup: `installed`, `runnable`, `command`, `commandPath`, `runtimeMode`, `reason`.

### Agen ACP

| Titik Akhir       | Metode | Deskripsi                                                          |
| ----------------- | ------ | ------------------------------------------------------------------ |
| `/api/acp/agents` | GET    | Daftar semua agen yang terdeteksi (bawaan + kustom) beserta status |
| `/api/acp/agents` | POST   | Tambah agen kustom atau segarkan cache deteksi                     |
| `/api/acp/agents` | DELETE | Hapus agen kustom berdasarkan parameter kueri `id`                 |

Respons GET mencakup `agents[]` (id, name, binary, version, installed, protocol, isCustom) dan `summary` (total, installed, notFound, builtIn, custom).

### Ketahanan & Batas Laju

| Titik Akhir             | Metode    | Deskripsi                                                                                          |
| ----------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `/api/resilience`       | GET/PATCH | Ambil/perbarui antrean permintaan, cooldown koneksi, pemutus sirkuit penyedia, dan pengaturan tunggu |
| `/api/resilience/reset` | POST      | Reset pemutus sirkuit penyedia                                                                     |
| `/api/rate-limits`      | GET       | Status batas laju per akun                                                                         |
| `/api/rate-limit`       | GET       | Konfigurasi batas laju global                                                                      |

### Eval

| Titik Akhir  | Metode   | Deskripsi                              |
| ------------ | -------- | -------------------------------------- |
| `/api/evals` | GET/POST | Daftar suite eval / jalankan evaluasi  |

### Kebijakan

| Titik Akhir     | Metode          | Deskripsi                      |
| --------------- | --------------- | ------------------------------ |
| `/api/policies` | GET/POST/DELETE | Kelola kebijakan perutean      |

### Kepatuhan

| Titik Akhir                 | Metode | Deskripsi                           |
| --------------------------- | ------ | ----------------------------------- |
| `/api/compliance/audit-log` | GET    | Log audit kepatuhan (N terakhir)    |

### v1beta (Kompatibel dengan Gemini)

| Titik Akhir                | Metode | Deskripsi                           |
| -------------------------- | ------ | ----------------------------------- |
| `/v1beta/models`           | GET    | Daftar model dalam format Gemini    |
| `/v1beta/models/{...path}` | POST   | Titik akhir `generateContent` Gemini |

Titik akhir ini mencerminkan format API Gemini untuk klien yang mengharapkan kompatibilitas SDK Gemini asli.

### API Internal / Sistem

| Titik Akhir              | Metode | Deskripsi                                                        |
| ------------------------ | ------ | ---------------------------------------------------------------- |
| `/api/init`              | GET    | Pemeriksaan inisialisasi aplikasi (digunakan saat pertama kali)  |
| `/api/tags`              | GET    | Tag model kompatibel Ollama (untuk klien Ollama)                 |
| `/api/restart`           | POST   | Picu restart server secara halus                                 |
| `/api/shutdown`          | POST   | Picu penghentian server secara halus                             |
| `/api/system/env/repair` | POST   | Perbaiki variabel lingkungan penyedia OAuth                      |
| `/api/system-info`       | GET    | Buat laporan diagnostik sistem                                   |

> **Catatan:** Titik akhir ini digunakan secara internal oleh sistem atau untuk kompatibilitas klien Ollama. Biasanya tidak dipanggil langsung oleh pengguna akhir.

### Perbaikan Lingkungan OAuth _(v3.6.1+)_

```bash
POST /api/system/env/repair
Content-Type: application/json

{
  "provider": "claude-code"
}
```

Memperbaiki variabel lingkungan OAuth yang hilang atau rusak untuk penyedia tertentu. Mengembalikan:

```json
{
  "success": true,
  "repaired": ["CLAUDE_CODE_OAUTH_CLIENT_ID", "CLAUDE_CODE_OAUTH_CLIENT_SECRET"],
  "backupPath": "/home/user/.omniroute/backups/env-repair-2026-04-11.bak"
}
```

---

## Transkripsi Audio

```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data
```

Transkripsi file audio menggunakan Deepgram atau AssemblyAI.

**Permintaan:**

```bash
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer your-api-key" \
  -F "file=@recording.mp3" \
  -F "model=deepgram/nova-3"
```

**Respons:**

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

Permintaan diterjemahkan secara otomatis antara format Ollama dan format internal.

---

## Telemetri

```bash
# Get latency telemetry summary (p50/p95/p99 per provider)
GET /api/telemetry/summary
```

**Respons:**

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

## Pemrosesan Permintaan

1. Klien mengirim permintaan ke `/v1/*`
2. Handler rute memanggil `handleChat`, `handleEmbedding`, `handleAudioTranscription`, atau `handleImageGeneration`
3. Model diselesaikan (penyedia/model langsung, alias, atau combo)
4. Kredensial dipilih dari DB lokal dengan penyaringan ketersediaan akun
5. Untuk chat: `handleChatCore` — deteksi format, translasi, pemeriksaan cache, pemeriksaan idempoten
6. Eksekutor penyedia mengirim permintaan upstream
7. Respons diterjemahkan kembali ke format klien (chat) atau dikembalikan apa adanya (embeddings/gambar/audio)
8. Penggunaan/logging dicatat
9. Fallback diterapkan pada error sesuai aturan combo

Referensi arsitektur lengkap: [`ARCHITECTURE.md`](ARCHITECTURE.md)

---

## Otentikasi

- Rute dasbor (`/dashboard/*`) menggunakan cookie `auth_token`
- Login menggunakan hash kata sandi yang tersimpan; fallback ke `INITIAL_PASSWORD`
- `requireLogin` dapat diaktifkan/nonaktifkan melalui `/api/settings/require-login`
- Rute `/v1/*` secara opsional memerlukan kunci API Bearer saat `REQUIRE_API_KEY=true`
