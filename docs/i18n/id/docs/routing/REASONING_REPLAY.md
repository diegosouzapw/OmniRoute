# Reasoning Replay Cache (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **Sumber acuan:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute menangkap `reasoning_content` asisten yang dihasilkan oleh model mode berpikir dan memutarnya kembali secara transparan pada permintaan multi-giliran ketika penyedia upstream mengharuskannya. Hal ini menghilangkan kesalahan HTTP 400 yang ditampilkan oleh penyedia ketat ketika riwayat percakapan klien tidak menyertakan penalaran dari giliran sebelumnya.

## Alasan Fitur Ini Ada

Beberapa penyedia mode berpikir menolak giliran lanjutan kecuali **pesan asisten sebelumnya menyertakan `reasoning_content` asli**. Upstream mengembalikan 400 dengan pesan seperti:

```
Parameter Salah: reasoning_content dalam mode berpikir harus dikirimkan kembali ke API.
```

Namun, klien pada umumnya (Cursor, Cline, Roo Code, OpenAI SDK) menghapus `reasoning_content` dari riwayat yang mereka putar kembali. OmniRoute memulihkannya dari cache sisi server sehingga permintaan yang diterima upstream tetap konsisten. Issue #1628 memperkenalkan persistensi hibrida memori/SQLite agar cache tetap bertahan setelah proses dimulai ulang.

## Arsitektur

```
Turn N (asisten membuat):
  → respons berisi reasoning_content + tool_calls
  → jika requiresReasoningReplay(provider, model): cacheReasoningFromAssistantMessage()
      menulis (memory + DB), dengan kunci setiap tool_call.id
  → meneruskan respons ke klien (yang mungkin atau mungkin tidak menyimpan penalaran)

Turn N+1 (klien mengirim tindak lanjut):
  → translator mendeteksi: requiresReasoningReplay(provider, model) === true
  → untuk setiap pesan asisten dengan tool_calls dan tanpa reasoning_content:
      lookupReasoning(toolCalls[0].id) → memory → DB
      hit  → msg.reasoning_content = cached; recordReplay()
      miss → msg.reasoning_content = "" (fallback warisan untuk DeepSeek versi lama)
  → upstream melihat riwayat yang konsisten → tidak ada 400
```

Penangkapan terjadi di `open-sse/handlers/chatCore.ts` (dua lokasi, pada dua titik pemanggilan `cacheReasoningFromAssistantMessage`). Pemutaran ulang (replay) terjadi di `open-sse/translator/index.ts` setelah koersi skema tetapi sebelum pengiriman (dispatch).

Turn asisten biasa (non-tool-call) diberi kunci secara berbeda: `buildAssistantMessageCacheKey()` mencerna cakupan sesi ditambah transkrip format OpenAI yang dinormalisasi hingga turn tersebut, karena DeepSeek memerlukan penalaran dari _setiap_ turn sebelumnya setelah `tools` ada. Untuk target Responses-API (sebagai contoh `opencode-go/deepseek-v4-flash`, yang diarahkan ke `/responses`) badan upstream membawa `input`, bukan `messages`, sehingga `translateRequest()` (`open-sse/translator/index.ts`) melaporkan transkrip pivot yang dicernanya melalui opsi callback dan situs penangkapan mencerna transkrip yang sama. Pass pemutaran ulang Responses berjalan pada pivot OpenAI untuk setiap format sumber, sehingga klien Anthropic Messages (Claude → OpenAI → Responses) juga diputar ulang.

## Penyimpanan — Hibrida Memori + SQLite

Jalur utama menggunakan `Map` dalam memori (LRU berdasarkan waktu pembuatan) yang didukung oleh tabel SQLite untuk pemulihan setelah crash dan visibilitas dasbor.

| Lapisan | Implementasi                                   | Tujuan                                                       |
| ------- | ---------------------------------------------- | ------------------------------------------------------------ |
| Memori  | `Map` di `open-sse/services/reasoningCache.ts` | Pencarian cepat, mengeluarkan entri tertua saat mencapai 200 |
| DB      | Tabel `reasoning_cache` (`src/lib/db/`)        | Bertahan setelah mulai ulang, menyediakan statistik          |

Penulisan dilakukan ke keduanya. Pembacaan memeriksa memori terlebih dahulu, lalu beralih ke DB jika tidak ditemukan (hasil yang ditemukan di DB dimasukkan kembali ke memori). Kegagalan DB tidak bersifat fatal — cache dalam memori tetap melayani jalur utama.

**Nilai default:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- Entri memori maksimum: `200` (`MAX_MEMORY_ENTRIES`)
- Pengeluaran: `createdAt` paling lama terlebih dahulu

## Skema Basis Data

Migrasi: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

Indeks: `expires_at`, `provider`, `model`, `created_at`. `expires_at` disimpan sebagai detik epoch Unix; lapisan SELECT menormalisasi nilai teks lama melalui `EXPIRES_AT_EPOCH_SQL`.

## Deteksi Penyedia / Model

Replay diaktifkan ketika `requiresReasoningReplay(provider, model)` mengembalikan `true`. Fungsi tersebut memeriksa dua daftar di `open-sse/services/reasoningCache.ts`.

**ID penyedia (harus sama persis, tidak peka huruf besar-kecil):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**Pola regex model (tidak peka huruf besar-kecil):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` dan `/deepseek[-/]?v4[-.]pro/i` (V4 Flash / Pro, dengan akhiran opsional `-free`)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

Menambahkan penyedia/model ketat baru berarti menambahkannya ke salah satu daftar ini dan menulis pengujian unit yang memastikan injeksi replay. Deskripsi PR harus menyebutkan string 400 upstream persis yang menjadi alasan perubahan tersebut.

## REST API

Cache menyediakan dua endpoint di bawah `src/app/api/cache/reasoning/route.ts`. Keduanya memerlukan autentikasi manajemen (`isAuthenticated` dari `@/shared/utils/apiAuth`).

| Metode | Endpoint                                                  | Deskripsi                                                   |
| ------ | --------------------------------------------------------- | ----------------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | Statistik + entri dengan paginasi                           |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | Daftar terfilter (`limit` dibatasi ke `[1, 200]`)           |
| DELETE | `/api/cache/reasoning`                                    | Hapus semuanya (memori + DB) dan atur ulang jumlah hit/miss |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | Hapus hanya entri untuk satu penyedia                       |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | Hapus satu entri                                            |

**Bentuk respons GET:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## Catatan Operasional

- **Pembersihan:** `cleanupReasoningCache()` menghapus entri memori yang kedaluwarsa dan menjalankan `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`. Worker pemeriksaan kesehatan memanggilnya secara berkala.
- **Pemulihan setelah crash:** Setelah dimulai ulang, memori kosong, tetapi DB masih menyimpan entri yang belum kedaluwarsa. Pencarian pertama untuk `tool_call_id` tertentu merupakan hit DB; pencarian berikutnya merupakan hit memori.
- **Tanpa penalaran, tanpa cache:** `cacheReasoningFromAssistantMessage` mengembalikan `0` ketika pesan asisten tidak memiliki bidang `reasoning_content` / `reasoning`, sehingga respons tanpa proses berpikir tidak menimbulkan biaya apa pun.
- **Penulisan juga dibatasi:** kedua lokasi pemanggilan di `chatCore.ts` (non-streaming dan streaming) hanya memanggil `cacheReasoningFromAssistantMessage()` ketika `requiresReasoningReplay(provider, model)` bernilai `true` — predikat yang sama dengan yang diperiksa oleh sisi pembacaan. Instalasi yang tidak pernah menggunakan penyedia replay tidak lagi menanggung biaya penulisan, pembaruan indeks, dan try/catch pada setiap respons yang memuat penalaran.
- **Penyedia non-ketat:** Ketika `requiresReasoningReplay` bernilai `false` dan format target adalah OpenAI, penerjemah **menghapus** bidang `reasoning_content` dari pesan keluar — OpenAI Chat Completions tidak menerimanya.

## Lihat Juga

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — pemutus sirkuit, periode pendinginan, penguncian model
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — mendiagnosis error 400 dari upstream
- Sumber: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- Migrasi: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- Rute API: `src/app/api/cache/reasoning/route.ts`
- Isu awal: #1628
